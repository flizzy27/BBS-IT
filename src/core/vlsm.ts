/**
 * VLSM: Referenzplanung und Validierung beliebiger (auch alternativer) Adresspläne.
 * Die Validierung akzeptiert JEDEN korrekten Plan – nicht nur die Musterlösung.
 */
import {
  blockSize,
  broadcastAddress,
  contains,
  formatIp,
  isNetworkAligned,
  networkAddress,
  overlaps,
  parseCidr,
  parseIpSafe,
  parsePrefixInput,
  prefixForHosts,
  usableHosts,
} from './ipv4';

export interface VlsmDemand {
  id: string;
  name: string;
  hosts: number;
  kind: 'lan' | 'wan';
}

export interface VlsmOptions {
  /** Präfix für Punkt-zu-Punkt-WAN-Netze laut Aufgabenkonvention */
  wanPrefix: 30 | 31;
  /** Verlangt, dass jedes Netz die kleinstmögliche passende Größe hat (Standard: true) */
  requireOptimal?: boolean;
  /** Verlangt die Vergabe „größte zuerst, lückenlos ab Netzanfang“ */
  requireOrdered?: boolean;
}

/** Benötigtes Präfix für einen Bedarf nach Aufgabenkonvention. */
export function requiredPrefix(d: VlsmDemand, opts: Pick<VlsmOptions, 'wanPrefix'>): number {
  if (d.kind === 'wan') return opts.wanPrefix;
  return prefixForHosts(d.hosts);
}

export interface AllocatedNet {
  id: string;
  name: string;
  hosts: number;
  kind: 'lan' | 'wan';
  network: number;
  prefix: number;
}

/** Sortierreihenfolge: größter Block zuerst; bei Gleichstand mehr Hosts zuerst, dann Eingabereihenfolge. */
export function sortDemands(demands: VlsmDemand[], opts: Pick<VlsmOptions, 'wanPrefix'>): VlsmDemand[] {
  return demands
    .map((d, i) => ({ d, i, p: requiredPrefix(d, opts) }))
    .sort((a, b) => a.p - b.p || b.d.hosts - a.d.hosts || a.i - b.i)
    .map((x) => x.d);
}

/**
 * Musterlösung: größte Netze zuerst, lückenlos ab Netzanfang.
 * Liefert null, wenn der Bedarf nicht in das Ausgangsnetz passt.
 */
export function allocateVlsm(base: string, demands: VlsmDemand[], opts: Pick<VlsmOptions, 'wanPrefix'>): AllocatedNet[] | null {
  const b = parseCidr(base);
  if (!b) throw new Error(`Ungültiges Ausgangsnetz: ${base}`);
  const start = networkAddress(b.ip, b.prefix);
  const end = start + blockSize(b.prefix);
  let cursor = start;
  const out: AllocatedNet[] = [];
  for (const d of sortDemands(demands, opts)) {
    const p = requiredPrefix(d, opts);
    if (p < b.prefix) return null;
    // Bei absteigend sortierten Blockgrößen ist cursor immer ausgerichtet; zur Sicherheit trotzdem ausrichten.
    const size = blockSize(p);
    if (cursor % size !== 0) cursor = Math.ceil(cursor / size) * size;
    if (cursor + size > end) return null;
    out.push({ id: d.id, name: d.name, hosts: d.hosts, kind: d.kind, network: cursor, prefix: p });
    cursor += size;
  }
  return out;
}

export function totalRequired(demands: VlsmDemand[], opts: Pick<VlsmOptions, 'wanPrefix'>): number {
  return demands.reduce((s, d) => s + blockSize(requiredPrefix(d, opts)), 0);
}

/* ------------------------------------------------------------------ */
/* Validierung                                                         */
/* ------------------------------------------------------------------ */

export interface VlsmEntryInput {
  network: string;
  prefix: string;
  /** optionale Zusatzfelder, die geprüft werden, wenn ausgefüllt */
  firstHost?: string;
  lastHost?: string;
  broadcast?: string;
}

export type VlsmErrorCode =
  | 'missing'
  | 'invalid-ip'
  | 'invalid-prefix'
  | 'not-aligned'
  | 'too-small'
  | 'too-large'
  | 'wan-convention'
  | 'outside-base'
  | 'overlap'
  | 'order'
  | 'first-host'
  | 'last-host'
  | 'broadcast';

export interface VlsmIssue {
  code: VlsmErrorCode;
  message: string;
  /** Fehler (zählt als falsch) oder Hinweis */
  severity: 'error' | 'warning';
}

export interface VlsmEntryResult {
  id: string;
  ok: boolean;
  issues: VlsmIssue[];
  /** berechnete Werte auf Basis der Eingabe (wenn parsebar) */
  computed?: {
    network: string;
    prefix: number;
    firstHost: string;
    lastHost: string;
    broadcast: string;
    usable: number;
    size: number;
  };
}

export interface VlsmValidation {
  ok: boolean;
  score: number; // 0..1
  entries: VlsmEntryResult[];
  global: VlsmIssue[];
  reference: AllocatedNet[] | null;
}

function ipEq(input: string | undefined, expected: number): boolean | null {
  if (input === undefined || input.trim() === '') return null; // nicht ausgefüllt → nicht geprüft
  const v = parseIpSafe(input);
  return v === expected;
}

export function validateVlsm(
  base: string,
  demands: VlsmDemand[],
  inputs: Record<string, VlsmEntryInput>,
  options: VlsmOptions,
): VlsmValidation {
  const opts = { requireOptimal: true, requireOrdered: false, ...options };
  const b = parseCidr(base);
  if (!b) throw new Error(`Ungültiges Ausgangsnetz: ${base}`);
  const baseNet = { network: networkAddress(b.ip, b.prefix), prefix: b.prefix };

  const parsed: { id: string; network: number; prefix: number }[] = [];
  const entries: VlsmEntryResult[] = demands.map((d) => {
    const inp = inputs[d.id];
    const issues: VlsmIssue[] = [];
    if (!inp || (!inp.network?.trim() && !inp.prefix?.trim())) {
      return { id: d.id, ok: false, issues: [{ code: 'missing', message: 'Keine Eingabe.', severity: 'error' }] };
    }
    const ip = parseIpSafe(inp.network ?? '');
    const prefix = parsePrefixInput(inp.prefix ?? '');
    if (ip === null) issues.push({ code: 'invalid-ip', message: `„${inp.network}“ ist keine gültige IPv4-Adresse.`, severity: 'error' });
    if (prefix === null) issues.push({ code: 'invalid-prefix', message: `„${inp.prefix}“ ist kein gültiges Präfix (z. B. /26).`, severity: 'error' });
    if (ip === null || prefix === null) return { id: d.id, ok: false, issues };

    const need = requiredPrefix(d, opts);
    const usable = usableHosts(prefix, { rfc3021: d.kind === 'wan' && opts.wanPrefix === 31 });

    if (!isNetworkAligned(ip, prefix)) {
      const lower = networkAddress(ip, prefix);
      issues.push({
        code: 'not-aligned',
        message: `${formatIp(ip)} ist keine Netzadresse für /${prefix}. Ein /${prefix}-Netz umfasst ${blockSize(prefix)} Adressen und muss bei einem Vielfachen von ${blockSize(prefix)} beginnen – die Adresse liegt im Netz ${formatIp(lower)}/${prefix}.`,
        severity: 'error',
      });
    }

    if (d.kind === 'wan') {
      if (prefix !== opts.wanPrefix) {
        const sev = usable >= 2 ? 'error' : 'error';
        issues.push({
          code: 'wan-convention',
          message:
            usable < 2
              ? `/${prefix} bietet nicht die 2 benötigten Adressen für die Router-Schnittstellen.`
              : `Laut Aufgabe wird für Punkt-zu-Punkt-Verbindungen /${opts.wanPrefix} verwendet (${opts.wanPrefix === 30 ? '4 Adressen, 2 nutzbar' : '2 Adressen nach RFC 3021'}). /${prefix} verschwendet Adressen.`,
          severity: sev,
        });
      }
    } else {
      if (usable < d.hosts) {
        issues.push({
          code: 'too-small',
          message: `/${prefix} hat nur ${usable} nutzbare Hostadressen (2^${32 - prefix} − 2), benötigt werden ${d.hosts}. Kleinstes passendes Präfix: /${need}.`,
          severity: 'error',
        });
      } else if (prefix < need) {
        issues.push({
          code: 'too-large',
          message: `/${prefix} (${usable} Hosts) ist größer als nötig. /${need} mit ${usableHosts(need)} nutzbaren Adressen reicht für ${d.hosts} Hosts.`,
          severity: opts.requireOptimal ? 'error' : 'warning',
        });
      }
    }

    const net = networkAddress(ip, prefix);
    if (!contains(baseNet, { network: net, prefix })) {
      issues.push({
        code: 'outside-base',
        message: `${formatIp(net)}/${prefix} liegt nicht vollständig im Ausgangsnetz ${base}.`,
        severity: 'error',
      });
    }

    const bc = broadcastAddress(net, prefix);
    const first = prefix >= 31 ? net : net + 1;
    const last = prefix >= 31 ? bc : bc - 1;
    if (ipEq(inp.firstHost, first) === false)
      issues.push({ code: 'first-host', message: `Erste Hostadresse ist ${formatIp(first)} (Netzadresse + 1).`, severity: 'error' });
    if (ipEq(inp.lastHost, last) === false)
      issues.push({ code: 'last-host', message: `Letzte Hostadresse ist ${formatIp(last)} (Broadcast − 1).`, severity: 'error' });
    if (ipEq(inp.broadcast, bc) === false)
      issues.push({
        code: 'broadcast',
        message: `Broadcast ist ${formatIp(bc)} (Netzadresse + ${blockSize(prefix)} − 1).`,
        severity: 'error',
      });

    if (isNetworkAligned(ip, prefix)) parsed.push({ id: d.id, network: net, prefix });

    return {
      id: d.id,
      ok: !issues.some((i) => i.severity === 'error'),
      issues,
      computed: {
        network: formatIp(net),
        prefix,
        firstHost: formatIp(first),
        lastHost: formatIp(last),
        broadcast: formatIp(bc),
        usable,
        size: blockSize(prefix),
      },
    };
  });

  // Überlappungen
  const byId = new Map(entries.map((e) => [e.id, e]));
  const nameOf = (id: string) => demands.find((d) => d.id === id)?.name ?? id;
  for (let i = 0; i < parsed.length; i++) {
    for (let j = i + 1; j < parsed.length; j++) {
      if (overlaps(parsed[i], parsed[j])) {
        for (const [a, b2] of [
          [parsed[i], parsed[j]],
          [parsed[j], parsed[i]],
        ]) {
          const e = byId.get(a.id)!;
          e.issues.push({
            code: 'overlap',
            message: `Überschneidet sich mit „${nameOf(b2.id)}“ (${formatIp(b2.network)}/${b2.prefix}).`,
            severity: 'error',
          });
          e.ok = false;
        }
      }
    }
  }

  const global: VlsmIssue[] = [];
  const reference = allocateVlsm(base, demands, opts);

  if (opts.requireOrdered && reference) {
    for (const r of reference) {
      const e = byId.get(r.id)!;
      const c = e.computed;
      if (c && e.ok && (parseIpSafe(c.network) !== r.network || c.prefix !== r.prefix)) {
        e.issues.push({
          code: 'order',
          message: `Nach der Vorgabe „größte Netze zuerst, lückenlos“ gehört hier ${formatIp(r.network)}/${r.prefix} hin.`,
          severity: 'error',
        });
        e.ok = false;
      }
    }
  }

  const okCount = entries.filter((e) => e.ok).length;
  if (entries.every((e) => e.ok)) {
    // vollständiger Plan konsistent
  } else if (okCount > 0) {
    global.push({ code: 'missing', message: `${okCount} von ${entries.length} Netzen sind korrekt geplant.`, severity: 'warning' });
  }

  return {
    ok: okCount === entries.length,
    score: entries.length ? okCount / entries.length : 0,
    entries,
    global,
    reference,
  };
}

/** Freie Bereiche im Ausgangsnetz nach einem Plan (für die Box-Visualisierung). */
export function freeBlocks(base: string, used: { network: number; prefix: number }[]): { start: number; end: number }[] {
  const b = parseCidr(base)!;
  const start = networkAddress(b.ip, b.prefix);
  const end = start + blockSize(b.prefix);
  const sorted = [...used].sort((x, y) => x.network - y.network);
  const out: { start: number; end: number }[] = [];
  let cur = start;
  for (const u of sorted) {
    if (u.network > cur) out.push({ start: cur, end: u.network });
    cur = Math.max(cur, u.network + blockSize(u.prefix));
  }
  if (cur < end) out.push({ start: cur, end });
  return out;
}
