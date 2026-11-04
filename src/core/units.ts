/**
 * Einheiten-Rechenkern: Datenmengen, Übertragungszeiten, Zahlensysteme, Energie.
 * Konventionen (wie in IHK-Prüfungen):
 *  - Dezimalpräfixe (k, M, G, T) = Faktor 1000
 *  - Binärpräfixe (Ki, Mi, Gi, Ti) = Faktor 1024
 *  - Datenraten (bit/s, kbit/s, …) sind IMMER dezimal
 *  - 1 Byte = 8 bit
 */

/* ------------------------------------------------------------------ */
/* Zahlen parsen & formatieren                                         */
/* ------------------------------------------------------------------ */

/** Parst eine Dezimalzahl mit Komma oder Punkt („1,5“, „1.5“, „ 2 “). Liefert null bei ungültiger Eingabe. */
export function parseDecimal(s: string): number | null {
  const str = s.trim().replace(/\s+/g, '').replace(',', '.');
  if (!/^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i.test(str)) return null;
  const n = Number(str);
  return Number.isFinite(n) ? n : null;
}

/** Formatiert eine Zahl deutsch (Tausenderpunkt, Dezimalkomma); sehr kleine/große Werte in Zehnerpotenz-Schreibweise. */
export function formatNumber(n: number, maxFrac = 6): string {
  if (!Number.isFinite(n)) return '–';
  if (n === 0) return '0';
  const abs = Math.abs(n);
  if (abs < 1e-6 || abs >= 1e21) {
    const [m, e] = n.toExponential(4).split('e');
    const mant = String(Number(m)).replace('.', ',');
    return `${mant} · 10^${Number(e)}`;
  }
  if (abs < 1) return n.toLocaleString('de-DE', { maximumSignificantDigits: 8 });
  return n.toLocaleString('de-DE', { maximumFractionDigits: maxFrac });
}

/* ------------------------------------------------------------------ */
/* Datenmengen                                                         */
/* ------------------------------------------------------------------ */

export type DataUnit = 'bit' | 'B' | 'kB' | 'MB' | 'GB' | 'TB' | 'KiB' | 'MiB' | 'GiB' | 'TiB';

export interface DataUnitInfo {
  unit: DataUnit;
  label: string;
  /** Anzahl Bit pro Einheit */
  bits: number;
  /** Rechenweg der Umrechnung in Byte, z. B. „1000³“ */
  factorText: string;
  kind: 'bit' | 'byte' | 'dezimal' | 'binär';
}

export const DATA_UNITS: DataUnitInfo[] = [
  { unit: 'bit', label: 'bit', bits: 1, factorText: '1/8 Byte', kind: 'bit' },
  { unit: 'B', label: 'Byte', bits: 8, factorText: '1 Byte = 8 bit', kind: 'byte' },
  { unit: 'kB', label: 'kB (Kilobyte)', bits: 8 * 1000, factorText: '1000 Byte', kind: 'dezimal' },
  { unit: 'MB', label: 'MB (Megabyte)', bits: 8 * 1000 ** 2, factorText: '1000² Byte', kind: 'dezimal' },
  { unit: 'GB', label: 'GB (Gigabyte)', bits: 8 * 1000 ** 3, factorText: '1000³ Byte', kind: 'dezimal' },
  { unit: 'TB', label: 'TB (Terabyte)', bits: 8 * 1000 ** 4, factorText: '1000⁴ Byte', kind: 'dezimal' },
  { unit: 'KiB', label: 'KiB (Kibibyte)', bits: 8 * 1024, factorText: '1024 Byte', kind: 'binär' },
  { unit: 'MiB', label: 'MiB (Mebibyte)', bits: 8 * 1024 ** 2, factorText: '1024² Byte', kind: 'binär' },
  { unit: 'GiB', label: 'GiB (Gibibyte)', bits: 8 * 1024 ** 3, factorText: '1024³ Byte', kind: 'binär' },
  { unit: 'TiB', label: 'TiB (Tebibyte)', bits: 8 * 1024 ** 4, factorText: '1024⁴ Byte', kind: 'binär' },
];

export function dataUnitInfo(u: DataUnit): DataUnitInfo {
  const info = DATA_UNITS.find((d) => d.unit === u);
  if (!info) throw new Error(`Unbekannte Einheit: ${u}`);
  return info;
}

export function toBits(value: number, unit: DataUnit): number {
  return value * dataUnitInfo(unit).bits;
}

export function fromBits(bits: number, unit: DataUnit): number {
  return bits / dataUnitInfo(unit).bits;
}

export function convertData(value: number, from: DataUnit, to: DataUnit): number {
  // Erst auf Bit, dann teilen – bei ganzzahligen Faktoren exakt bis 2^53.
  return fromBits(toBits(value, from), to);
}

/** Alle Einheiten für einen Wert (für die Umrechnungstabelle). */
export function convertToAll(value: number, from: DataUnit): { unit: DataUnit; value: number }[] {
  const bits = toBits(value, from);
  return DATA_UNITS.map((d) => ({ unit: d.unit, value: bits / d.bits }));
}

/* ------------------------------------------------------------------ */
/* Datenraten & Übertragungszeit                                       */
/* ------------------------------------------------------------------ */

export type RateUnit = 'bit/s' | 'kbit/s' | 'Mbit/s' | 'Gbit/s';

export const RATE_UNITS: { unit: RateUnit; factor: number; factorText: string }[] = [
  { unit: 'bit/s', factor: 1, factorText: '1' },
  { unit: 'kbit/s', factor: 1e3, factorText: '1000' },
  { unit: 'Mbit/s', factor: 1e6, factorText: '1000²' },
  { unit: 'Gbit/s', factor: 1e9, factorText: '1000³' },
];

export function rateToBps(value: number, unit: RateUnit): number {
  const r = RATE_UNITS.find((x) => x.unit === unit);
  if (!r) throw new Error(`Unbekannte Datenrate: ${unit}`);
  return value * r.factor;
}

/**
 * Overhead-Modell:
 *  - 'size': Overhead vergrößert die zu übertragende Datenmenge (Daten × (1 + o/100))
 *  - 'rate': Overhead verringert die nutzbare Datenrate (Rate × (1 − o/100))
 */
export type OverheadMode = 'size' | 'rate';

export interface TransferResult {
  /** Nutzdaten in bit */
  payloadBits: number;
  /** tatsächlich zu übertragende Bits (inkl. Overhead bei Modus 'size') */
  totalBits: number;
  /** Bruttodatenrate in bit/s */
  rateBps: number;
  /** effektive Datenrate in bit/s (bei Modus 'rate' reduziert) */
  effectiveBps: number;
  seconds: number;
}

export function transferTime(
  size: number,
  sizeUnit: DataUnit,
  rate: number,
  rateUnit: RateUnit,
  overheadPercent = 0,
  mode: OverheadMode = 'size',
): TransferResult {
  if (!(size >= 0)) throw new RangeError('Datenmenge muss ≥ 0 sein');
  if (!(rate > 0)) throw new RangeError('Datenrate muss > 0 sein');
  if (!(overheadPercent >= 0) || (mode === 'rate' && overheadPercent >= 100)) throw new RangeError('Ungültiger Overhead');
  const payloadBits = toBits(size, sizeUnit);
  const rateBps = rateToBps(rate, rateUnit);
  const totalBits = mode === 'size' ? payloadBits * (1 + overheadPercent / 100) : payloadBits;
  const effectiveBps = mode === 'rate' ? rateBps * (1 - overheadPercent / 100) : rateBps;
  return { payloadBits, totalBits, rateBps, effectiveBps, seconds: totalBits / effectiveBps };
}

/** Zerlegt Sekunden in Stunden, Minuten, Sekunden (Sekundenanteil kann Nachkommastellen haben). */
export function splitHms(seconds: number): { h: number; m: number; s: number } {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds - h * 3600) / 60);
  const s = seconds - h * 3600 - m * 60;
  return { h, m, s: Math.round(s * 1000) / 1000 };
}

export function formatHms(seconds: number): string {
  const { h, m, s } = splitHms(seconds);
  const parts: string[] = [];
  if (h) parts.push(`${h} h`);
  if (m || h) parts.push(`${m} min`);
  parts.push(`${formatNumber(s, 3)} s`);
  return parts.join(' ');
}

/* ------------------------------------------------------------------ */
/* Zahlensysteme                                                       */
/* ------------------------------------------------------------------ */

export type Base = 2 | 10 | 16;
export type BitWidth = 8 | 16 | 32;

/** Parst eine Eingabe im gegebenen Zahlensystem und prüft den Wertebereich der Bitbreite. */
export function parseInBase(text: string, base: Base, width: BitWidth): { value: number } | { error: string } {
  let s = text.trim().replace(/[\s_]/g, '');
  if (s === '') return { error: 'Bitte einen Wert eingeben.' };
  const max = 2 ** width - 1;
  let value: number;
  if (base === 2) {
    s = s.replace(/^0b/i, '').replace(/\./g, '');
    if (!/^[01]+$/.test(s)) return { error: 'Binärzahlen bestehen nur aus 0 und 1.' };
    if (s.replace(/^0+/, '').length > width) return { error: `Mehr als ${width} Bit – Wert passt nicht in ${width} Bit.` };
    value = 0;
    for (const ch of s) value = value * 2 + (ch === '1' ? 1 : 0);
  } else if (base === 16) {
    s = s.replace(/^0x/i, '');
    if (!/^[0-9a-f]+$/i.test(s)) return { error: 'Hexadezimal erlaubt nur 0–9 und A–F.' };
    if (s.replace(/^0+/, '').length > width / 4) return { error: `Mehr als ${width / 4} Hex-Stellen (${width} Bit).` };
    value = parseInt(s, 16);
  } else {
    if (width === 32 && s.includes('.')) {
      const parts = s.split('.');
      if (parts.length !== 4 || parts.some((p) => !/^\d{1,3}$/.test(p) || Number(p) > 255))
        return { error: 'Punktnotation: vier Oktette 0–255, z. B. 192.168.1.1.' };
      value = parts.reduce((acc, p) => acc * 256 + Number(p), 0);
    } else {
      if (!/^\d+$/.test(s)) return { error: 'Dezimalzahlen bestehen nur aus 0–9.' };
      value = Number(s);
    }
  }
  if (value > max) return { error: `Wert zu groß – mit ${width} Bit sind maximal ${max.toLocaleString('de-DE')} darstellbar.` };
  return { value };
}

export function formatInBase(value: number, base: Base, width: BitWidth): string {
  if (base === 2) return value.toString(2).padStart(width, '0');
  if (base === 16) return value.toString(16).toUpperCase().padStart(width / 4, '0');
  return String(value);
}

/** Gruppiert eine Ziffernfolge von links in Blöcke (z. B. 4er-Gruppen für Nibbles). */
export function groupDigits(s: string, size: number, sep = ' '): string {
  const out: string[] = [];
  for (let i = 0; i < s.length; i += size) out.push(s.slice(i, i + size));
  return out.join(sep);
}

/** Stellenwerte der gesetzten Bits (höchstwertiges zuerst), z. B. 200 → [128, 64, 8]. */
export function setBitWeights(value: number, width: BitWidth): number[] {
  const res: number[] = [];
  for (let k = width - 1; k >= 0; k--) if (Math.floor(value / 2 ** k) % 2 === 1) res.push(2 ** k);
  return res;
}

/** Zerlegung in Hex-Ziffern mit Stellenwert 16^k. */
export function hexBreakdown(value: number, width: BitWidth): { digit: string; digitValue: number; power: number; weight: number; nibble: string }[] {
  const hex = formatInBase(value, 16, width);
  return hex.split('').map((d, i) => {
    const power = hex.length - 1 - i;
    const dv = parseInt(d, 16);
    return { digit: d, digitValue: dv, power, weight: 16 ** power, nibble: dv.toString(2).padStart(4, '0') };
  });
}

/* ------------------------------------------------------------------ */
/* Energie                                                             */
/* ------------------------------------------------------------------ */

/** Leistung P = U · I in Watt. */
export function powerWatts(volts: number, amps: number): number {
  return volts * amps;
}

/** Energie in kWh = P[W] · t[h] / 1000. */
export function energyKWh(watts: number, hours: number): number {
  return (watts * hours) / 1000;
}

export interface EnergyCost {
  watts: number;
  hoursTotal: number;
  kWh: number;
  cost: number;
  kWhPerDay: number;
  costPerDay: number;
}

/** Energiekosten für `devices` Geräte mit je `watts` W, `hoursPerDay` h/Tag über `days` Tage. */
export function energyCost(watts: number, hoursPerDay: number, days: number, pricePerKWh: number, devices = 1): EnergyCost {
  const totalW = watts * devices;
  const hoursTotal = hoursPerDay * days;
  const kWhPerDay = energyKWh(totalW, hoursPerDay);
  const kWh = energyKWh(totalW, hoursTotal);
  return { watts: totalW, hoursTotal, kWh, cost: kWh * pricePerKWh, kWhPerDay, costPerDay: kWhPerDay * pricePerKWh };
}
