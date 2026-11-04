/**
 * IPv6-Hilfsfunktionen: Expandieren, Kürzen nach RFC 5952, Typbestimmung, Subnetze.
 * Interne Darstellung: 8 Blöcke à 16 Bit (Zahlen 0..65535). Für Präfixrechnung BigInt.
 */

export function parseIpv6(input: string): number[] | null {
  let s = input.trim().toLowerCase();
  if (!s) return null;
  // Zonenindex (%eth0) und Präfix entfernen
  s = s.replace(/%.*$/, '');
  if (s.includes('/')) return null;
  if (!/^[0-9a-f:.]+$/.test(s)) return null;
  const dbl = s.split('::');
  if (dbl.length > 2) return null;

  const parseGroups = (part: string): number[] | null => {
    if (part === '') return [];
    const gs = part.split(':');
    const out: number[] = [];
    for (let i = 0; i < gs.length; i++) {
      const g = gs[i];
      if (g.includes('.')) {
        // eingebettete IPv4 nur am Ende
        if (i !== gs.length - 1) return null;
        const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(g);
        if (!m) return null;
        const o = m.slice(1).map(Number);
        if (o.some((x) => x > 255)) return null;
        out.push(o[0] * 256 + o[1], o[2] * 256 + o[3]);
        continue;
      }
      if (!/^[0-9a-f]{1,4}$/.test(g)) return null;
      out.push(parseInt(g, 16));
    }
    return out;
  };

  if (dbl.length === 2) {
    const head = parseGroups(dbl[0]);
    const tail = parseGroups(dbl[1]);
    if (!head || !tail) return null;
    const missing = 8 - head.length - tail.length;
    if (missing < 1) return null; // :: muss mindestens einen Block ersetzen
    return [...head, ...Array(missing).fill(0), ...tail];
  }
  const all = parseGroups(s);
  if (!all || all.length !== 8) return null;
  return all;
}

export function isValidIpv6(s: string): boolean {
  return parseIpv6(s) !== null;
}

/** Vollständige Schreibweise: 2001:0db8:0000:… */
export function expandIpv6(s: string | number[]): string {
  const g = typeof s === 'string' ? parseIpv6(s) : s;
  if (!g) throw new Error(`Ungültige IPv6-Adresse: ${s}`);
  return g.map((x) => x.toString(16).padStart(4, '0')).join(':');
}

/** Kanonische Kurzform nach RFC 5952. */
export function compressIpv6(s: string | number[]): string {
  const g = typeof s === 'string' ? parseIpv6(s) : s;
  if (!g) throw new Error(`Ungültige IPv6-Adresse: ${s}`);
  // längste Nullfolge (Länge ≥ 2) finden, bei Gleichstand die erste
  let bestStart = -1;
  let bestLen = 0;
  for (let i = 0; i < 8; ) {
    if (g[i] === 0) {
      let j = i;
      while (j < 8 && g[j] === 0) j++;
      if (j - i > bestLen) {
        bestLen = j - i;
        bestStart = i;
      }
      i = j;
    } else i++;
  }
  const hex = g.map((x) => x.toString(16));
  if (bestLen < 2) return hex.join(':');
  const head = hex.slice(0, bestStart).join(':');
  const tail = hex.slice(bestStart + bestLen).join(':');
  return `${head}::${tail}`;
}

/** Nur führende Nullen entfernen (ohne ::). */
export function stripLeadingZeros(s: string): string {
  const g = parseIpv6(s);
  if (!g) throw new Error('Ungültige IPv6-Adresse');
  return g.map((x) => x.toString(16)).join(':');
}

export function ipv6ToBigInt(g: number[]): bigint {
  return g.reduce((acc, x) => (acc << 16n) + BigInt(x), 0n);
}

export function bigIntToIpv6(v: bigint): number[] {
  const out: number[] = [];
  for (let i = 7; i >= 0; i--) out.push(Number((v >> BigInt(i * 16)) & 0xffffn));
  return out;
}

export function ipv6Network(g: number[], prefix: number): number[] {
  const v = ipv6ToBigInt(g);
  const mask = prefix === 0 ? 0n : ((1n << 128n) - 1n) ^ ((1n << BigInt(128 - prefix)) - 1n);
  return bigIntToIpv6(v & mask);
}

/** Anzahl Subnetze beim Aufteilen von /a in /b als BigInt. */
export function ipv6SubnetCount(fromPrefix: number, toPrefix: number): bigint {
  if (toPrefix < fromPrefix) throw new RangeError('toPrefix < fromPrefix');
  return 1n << BigInt(toPrefix - fromPrefix);
}

/** n-tes Subnetz (0-basiert). */
export function ipv6NthSubnet(base: number[], basePrefix: number, newPrefix: number, n: bigint | number): number[] {
  const start = ipv6ToBigInt(ipv6Network(base, basePrefix));
  const step = 1n << BigInt(128 - newPrefix);
  return bigIntToIpv6(start + BigInt(n) * step);
}

export type Ipv6Type =
  | 'Loopback'
  | 'Unspezifiziert'
  | 'Link-Local'
  | 'Unique Local'
  | 'Multicast'
  | 'Global Unicast'
  | 'Dokumentation'
  | 'IPv4-mapped'
  | 'Sonstige';

export function ipv6Type(s: string | number[]): Ipv6Type {
  const g = typeof s === 'string' ? parseIpv6(s) : s;
  if (!g) throw new Error('Ungültige IPv6-Adresse');
  const v = ipv6ToBigInt(g);
  if (v === 1n) return 'Loopback';
  if (v === 0n) return 'Unspezifiziert';
  if ((g[0] & 0xffc0) === 0xfe80) return 'Link-Local';
  if ((g[0] & 0xfe00) === 0xfc00) return 'Unique Local';
  if ((g[0] & 0xff00) === 0xff00) return 'Multicast';
  if (g[0] === 0x2001 && g[1] === 0x0db8) return 'Dokumentation';
  if (g.slice(0, 5).every((x) => x === 0) && g[5] === 0xffff) return 'IPv4-mapped';
  if ((g[0] & 0xe000) === 0x2000) return 'Global Unicast';
  return 'Sonstige';
}

/** Vergleicht zwei IPv6-Eingaben semantisch (gleiche Adresse, egal welche Schreibweise). */
export function ipv6Equal(a: string, b: string): boolean {
  const x = parseIpv6(a);
  const y = parseIpv6(b);
  return !!x && !!y && x.every((v, i) => v === y[i]);
}

/** Ist die Eingabe exakt in kanonischer RFC-5952-Form? */
export function isCanonicalIpv6(s: string): boolean {
  const g = parseIpv6(s);
  return !!g && compressIpv6(g) === s.trim();
}
