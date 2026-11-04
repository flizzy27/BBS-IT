/**
 * IPv4-Rechenkern. Alle Berechnungen arbeiten mit vorzeichenlosen 32-Bit-Zahlen
 * (JavaScript-Number, Wertebereich 0 … 2^32-1). Keine Bit-Operatoren auf
 * Werten ≥ 2^31 ohne >>> 0, damit keine negativen Zahlen entstehen.
 */

export const MAX32 = 0xffffffff;

export class IpParseError extends Error {}

/** Normalisiert eine Benutzereingabe (Leerzeichen, Kommas als Punkte). */
export function normalizeIpInput(s: string): string {
  return s.trim().replace(/\s+/g, '').replace(/,/g, '.');
}

/** Prüft, ob ein String eine gültige IPv4-Adresse in Punktnotation ist (ohne führende Nullen außer "0"). */
export function isValidIp(s: string): boolean {
  return parseIpSafe(s) !== null;
}

export function parseIpSafe(s: string): number | null {
  const str = normalizeIpInput(s);
  const parts = str.split('.');
  if (parts.length !== 4) return null;
  let value = 0;
  for (const p of parts) {
    if (!/^\d{1,3}$/.test(p)) return null;
    if (p.length > 1 && p.startsWith('0')) return null; // 010 ist mehrdeutig (oktal) → ablehnen
    const n = Number(p);
    if (n > 255) return null;
    value = value * 256 + n;
  }
  return value;
}

export function parseIp(s: string): number {
  const v = parseIpSafe(s);
  if (v === null) throw new IpParseError(`Ungültige IPv4-Adresse: "${s}"`);
  return v;
}

export function formatIp(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n > MAX32) throw new RangeError(`Wert außerhalb 32 Bit: ${n}`);
  return [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');
}

export function octets(n: number): [number, number, number, number] {
  return [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255];
}

/** 2^k exakt (auch für k = 32). */
export function pow2(k: number): number {
  return 2 ** k;
}

export function isValidPrefix(p: number): boolean {
  return Number.isInteger(p) && p >= 0 && p <= 32;
}

/** Subnetzmaske als Zahl aus Präfixlänge. */
export function prefixToMaskNum(prefix: number): number {
  if (!isValidPrefix(prefix)) throw new RangeError(`Ungültiges Präfix: ${prefix}`);
  if (prefix === 0) return 0;
  return (MAX32 - (pow2(32 - prefix) - 1)) >>> 0;
}

export function prefixToMask(prefix: number): string {
  return formatIp(prefixToMaskNum(prefix));
}

/** Liefert das Präfix einer Maske oder null, wenn die Maske nicht zusammenhängend ist (z. B. 255.0.255.0). */
export function maskToPrefix(mask: string | number): number | null {
  const m = typeof mask === 'string' ? parseIpSafe(mask) : mask;
  if (m === null) return null;
  for (let p = 0; p <= 32; p++) if (prefixToMaskNum(p) === m) return p;
  return null;
}

export function wildcardMask(prefix: number): string {
  return formatIp((MAX32 - prefixToMaskNum(prefix)) >>> 0);
}

/** Bitweises UND (vorzeichenlos). */
export function and32(a: number, b: number): number {
  return (a & b) >>> 0;
}

export function blockSize(prefix: number): number {
  return pow2(32 - prefix);
}

export function networkAddress(ip: number, prefix: number): number {
  return and32(ip, prefixToMaskNum(prefix));
}

export function broadcastAddress(ip: number, prefix: number): number {
  return networkAddress(ip, prefix) + blockSize(prefix) - 1;
}

/** Anzahl nutzbarer Hostadressen nach klassischer Konvention (Netz- und Broadcastadresse reserviert). /31 und /32 Sonderfälle. */
export function usableHosts(prefix: number, opts: { rfc3021?: boolean } = {}): number {
  if (prefix === 32) return 1;
  if (prefix === 31) return opts.rfc3021 ? 2 : 0;
  return blockSize(prefix) - 2;
}

export interface SubnetInfo {
  network: number;
  broadcast: number;
  prefix: number;
  mask: number;
  size: number;
  firstHost: number | null;
  lastHost: number | null;
  usable: number;
}

export function subnetInfo(ip: number, prefix: number): SubnetInfo {
  const network = networkAddress(ip, prefix);
  const size = blockSize(prefix);
  const broadcast = network + size - 1;
  let firstHost: number | null = network + 1;
  let lastHost: number | null = broadcast - 1;
  if (prefix === 32) {
    firstHost = lastHost = network;
  } else if (prefix === 31) {
    firstHost = network;
    lastHost = broadcast;
  }
  return {
    network,
    broadcast,
    prefix,
    mask: prefixToMaskNum(prefix),
    size,
    firstHost,
    lastHost,
    usable: usableHosts(prefix, { rfc3021: true }),
  };
}

/** Parst "a.b.c.d/n". */
export function parseCidr(s: string): { ip: number; prefix: number } | null {
  const str = normalizeIpInput(s);
  const m = /^([^/]+)\/(\d{1,2})$/.exec(str);
  if (!m) return null;
  const ip = parseIpSafe(m[1]);
  const prefix = Number(m[2]);
  if (ip === null || !isValidPrefix(prefix)) return null;
  return { ip, prefix };
}

/** Parst ein Präfix in den Formen "/26", "26" oder "255.255.255.192". */
export function parsePrefixInput(s: string): number | null {
  const str = normalizeIpInput(s);
  const m = /^\/?(\d{1,2})$/.exec(str);
  if (m) {
    const p = Number(m[1]);
    return isValidPrefix(p) ? p : null;
  }
  if (str.includes('.')) return maskToPrefix(str);
  return null;
}

export function isNetworkAligned(ip: number, prefix: number): boolean {
  return networkAddress(ip, prefix) === ip;
}

export function sameSubnet(a: number, b: number, prefix: number): boolean {
  return networkAddress(a, prefix) === networkAddress(b, prefix);
}

/** Kleinstes Präfix (größtes Netz nicht nötig) – liefert das größte Präfix, dessen nutzbare Hosts ≥ hosts sind. */
export function prefixForHosts(hosts: number): number {
  if (!Number.isInteger(hosts) || hosts < 1) throw new RangeError('hosts muss ≥ 1 sein');
  for (let p = 30; p >= 0; p--) {
    if (pow2(32 - p) - 2 >= hosts) return p;
  }
  throw new RangeError('Zu viele Hosts für IPv4');
}

/** Anzahl der Hostbits, die für n Hosts (+2 reservierte Adressen) nötig sind. */
export function hostBitsForHosts(hosts: number): number {
  return 32 - prefixForHosts(hosts);
}

/** Wie viele Bits müssen ausgeliehen werden, um mindestens n Subnetze zu erhalten? */
export function bitsForSubnets(n: number): number {
  if (!Number.isInteger(n) || n < 1) throw new RangeError('n muss ≥ 1 sein');
  let b = 0;
  while (pow2(b) < n) b++;
  return b;
}

/** Alle Subnetze, die entstehen, wenn base/basePrefix in newPrefix aufgeteilt wird. */
export function splitNetwork(base: number, basePrefix: number, newPrefix: number): number[] {
  if (newPrefix < basePrefix) throw new RangeError('Neues Präfix muss ≥ Ausgangspräfix sein');
  const count = pow2(newPrefix - basePrefix);
  const size = blockSize(newPrefix);
  const start = networkAddress(base, basePrefix);
  const res: number[] = [];
  for (let i = 0; i < count; i++) res.push(start + i * size);
  return res;
}

/** n-tes Subnetz (0-basiert). */
export function nthSubnet(base: number, basePrefix: number, newPrefix: number, index: number): number {
  const count = pow2(newPrefix - basePrefix);
  if (index < 0 || index >= count) throw new RangeError('Index außerhalb');
  return networkAddress(base, basePrefix) + index * blockSize(newPrefix);
}

export type AddressClass = 'A' | 'B' | 'C' | 'D' | 'E';

export function addressClass(ip: number): AddressClass {
  const first = ip >>> 24;
  if (first < 128) return 'A';
  if (first < 192) return 'B';
  if (first < 224) return 'C';
  if (first < 240) return 'D';
  return 'E';
}

export interface SpecialRange {
  cidr: string;
  name: string;
  description: string;
}

/** Spezielle IPv4-Bereiche (RFC 6890-Auszug, für die Ausbildung relevant). */
export const SPECIAL_RANGES: SpecialRange[] = [
  { cidr: '10.0.0.0/8', name: 'Privat (RFC 1918)', description: 'Privater Adressbereich, im Internet nicht geroutet.' },
  { cidr: '172.16.0.0/12', name: 'Privat (RFC 1918)', description: 'Privater Adressbereich 172.16.0.0 – 172.31.255.255.' },
  { cidr: '192.168.0.0/16', name: 'Privat (RFC 1918)', description: 'Privater Adressbereich 192.168.0.0 – 192.168.255.255.' },
  { cidr: '127.0.0.0/8', name: 'Loopback', description: 'Verweist auf den eigenen Rechner (localhost).' },
  { cidr: '169.254.0.0/16', name: 'Link-Local / APIPA', description: 'Automatisch vergeben, wenn kein DHCP-Server antwortet.' },
  { cidr: '100.64.0.0/10', name: 'Shared Address Space (CGNAT)', description: 'Für Carrier-Grade-NAT bei Providern (RFC 6598).' },
  { cidr: '0.0.0.0/8', name: '„Dieses Netz“', description: 'Unspezifizierte Adresse 0.0.0.0, z. B. vor DHCP.' },
  { cidr: '224.0.0.0/4', name: 'Multicast (Klasse D)', description: 'Gruppenkommunikation.' },
  { cidr: '240.0.0.0/4', name: 'Reserviert (Klasse E)', description: 'Für zukünftige Nutzung reserviert; 255.255.255.255 = limitierter Broadcast.' },
  { cidr: '192.0.2.0/24', name: 'Dokumentation (TEST-NET-1)', description: 'Nur für Beispiele in Dokumentationen.' },
  { cidr: '198.51.100.0/24', name: 'Dokumentation (TEST-NET-2)', description: 'Nur für Beispiele in Dokumentationen.' },
  { cidr: '203.0.113.0/24', name: 'Dokumentation (TEST-NET-3)', description: 'Nur für Beispiele in Dokumentationen.' },
];

export function inCidr(ip: number, cidr: string): boolean {
  const c = parseCidr(cidr);
  if (!c) return false;
  return networkAddress(ip, c.prefix) === networkAddress(c.ip, c.prefix);
}

export function isPrivate(ip: number): boolean {
  return inCidr(ip, '10.0.0.0/8') || inCidr(ip, '172.16.0.0/12') || inCidr(ip, '192.168.0.0/16');
}

export function classifyAddress(ip: number): SpecialRange | { cidr: string; name: string; description: string } {
  // spezifischste Übereinstimmung zuerst (längstes Präfix)
  const matches = SPECIAL_RANGES.filter((r) => inCidr(ip, r.cidr)).sort(
    (a, b) => parseCidr(b.cidr)!.prefix - parseCidr(a.cidr)!.prefix,
  );
  if (ip === MAX32) return { cidr: '255.255.255.255/32', name: 'Limitierter Broadcast', description: 'Broadcast an alle im lokalen Netz.' };
  if (matches.length) return matches[0];
  return { cidr: '', name: 'Öffentlich (Global Unicast)', description: 'Im Internet routbare öffentliche Adresse.' };
}

/* ------------------------------------------------------------------ */
/* Binärdarstellung                                                    */
/* ------------------------------------------------------------------ */

export function toBinary8(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n > 255) throw new RangeError('Oktett 0–255 erwartet');
  return n.toString(2).padStart(8, '0');
}

export function ipToBinary(ip: number, sep = '.'): string {
  return octets(ip).map(toBinary8).join(sep);
}

export function binaryToDecimal(bits: string): number | null {
  const b = bits.replace(/[\s.]/g, '');
  if (!/^[01]+$/.test(b) || b.length > 32) return null;
  let v = 0;
  for (const ch of b) v = v * 2 + (ch === '1' ? 1 : 0);
  return v;
}

/** Zerlegt eine Dezimalzahl in Stellenwerte (für Lösungswege): 200 → [128, 64, 8]. */
export function placeValues(n: number): number[] {
  const res: number[] = [];
  for (let w = 128; w >= 1; w /= 2) if (n & w) res.push(w);
  return res;
}

/** Interessantes Oktett: das Oktett, in dem die Netzgrenze liegt (0-basiert), oder -1 bei /0, /8, /16, /24, /32-Grenzen. */
export function interestingOctet(prefix: number): number {
  if (prefix % 8 === 0) return -1;
  return Math.floor(prefix / 8);
}

export function compareIp(a: number, b: number): number {
  return a - b;
}

/** Überlappen sich zwei Netze? */
export function overlaps(a: { network: number; prefix: number }, b: { network: number; prefix: number }): boolean {
  const aEnd = a.network + blockSize(a.prefix) - 1;
  const bEnd = b.network + blockSize(b.prefix) - 1;
  return a.network <= bEnd && b.network <= aEnd;
}

/** Liegt Netz `inner` vollständig in `outer`? */
export function contains(outer: { network: number; prefix: number }, inner: { network: number; prefix: number }): boolean {
  if (inner.prefix < outer.prefix) return false;
  return networkAddress(inner.network, outer.prefix) === outer.network;
}
