import {
  convertData, convertToAll, energyCost, energyKWh, formatHms, formatInBase, formatNumber, fromBits, groupDigits, hexBreakdown,
  parseDecimal, parseInBase, powerWatts, rateToBps, setBitWeights, splitHms, toBits, transferTime,
} from '../src/core/units';

describe('Zahlen parsen', () => {
  it('akzeptiert Komma und Punkt', () => {
    expect(parseDecimal('1,5')).toBe(1.5);
    expect(parseDecimal(' 2.25 ')).toBe(2.25);
    expect(parseDecimal('100')).toBe(100);
    expect(parseDecimal('0,3')).toBe(0.3);
  });
  it('lehnt Unsinn ab', () => {
    for (const s of ['', 'abc', '1,2,3', '1.2.3', '--1', '1e', 'NaN']) expect(parseDecimal(s)).toBeNull();
  });
  it('formatiert deutsch', () => {
    expect(formatNumber(1234.5)).toBe('1.234,5');
    expect(formatNumber(0)).toBe('0');
    expect(formatNumber(1.25e-13)).toBe('1,25 · 10^-13');
  });
});

describe('Datenmengen', () => {
  it('Byte/bit', () => {
    expect(toBits(1, 'B')).toBe(8);
    expect(fromBits(8, 'B')).toBe(1);
  });
  it('dezimale Präfixe = 1000', () => {
    expect(convertData(1, 'kB', 'B')).toBe(1000);
    expect(convertData(1, 'MB', 'kB')).toBe(1000);
    expect(convertData(1, 'GB', 'MB')).toBe(1000);
    expect(convertData(1, 'TB', 'GB')).toBe(1000);
    expect(convertData(2, 'GB', 'bit')).toBe(16e9);
  });
  it('binäre Präfixe = 1024', () => {
    expect(convertData(1, 'KiB', 'B')).toBe(1024);
    expect(convertData(1, 'MiB', 'KiB')).toBe(1024);
    expect(convertData(1, 'GiB', 'B')).toBe(1073741824);
    expect(convertData(1, 'TiB', 'GiB')).toBe(1024);
  });
  it('dezimal ↔ binär', () => {
    expect(convertData(1, 'GiB', 'GB')).toBeCloseTo(1.073741824, 12);
    expect(convertData(1, 'TB', 'TiB')).toBeCloseTo(0.9094947017729282, 12);
    expect(convertData(2, 'GB', 'MiB')).toBeCloseTo(1907.3486328125, 9);
  });
  it('Umrechnungstabelle enthält alle Einheiten', () => {
    const all = convertToAll(1, 'MB');
    expect(all).toHaveLength(10);
    expect(all.find((x) => x.unit === 'kB')!.value).toBe(1000);
    expect(all.find((x) => x.unit === 'bit')!.value).toBe(8e6);
  });
});

describe('Übertragungszeit', () => {
  it('Datenraten sind dezimal', () => {
    expect(rateToBps(1, 'kbit/s')).toBe(1000);
    expect(rateToBps(100, 'Mbit/s')).toBe(1e8);
    expect(rateToBps(1, 'Gbit/s')).toBe(1e9);
  });
  it('2 GB @ 100 Mbit/s = 160 s', () => {
    const r = transferTime(2, 'GB', 100, 'Mbit/s');
    expect(r.payloadBits).toBe(16e9);
    expect(r.seconds).toBe(160);
  });
  it('1 GiB @ 1 Gbit/s', () => {
    expect(transferTime(1, 'GiB', 1, 'Gbit/s').seconds).toBeCloseTo(8.589934592, 9);
  });
  it('Overhead vergrößert die Datenmenge', () => {
    const r = transferTime(2, 'GB', 100, 'Mbit/s', 10);
    expect(r.totalBits).toBeCloseTo(17.6e9, 0);
    expect(r.seconds).toBeCloseTo(176, 9);
  });
  it('Overhead verringert die Datenrate', () => {
    const r = transferTime(2, 'GB', 100, 'Mbit/s', 20, 'rate');
    expect(r.effectiveBps).toBeCloseTo(8e7, 3);
    expect(r.seconds).toBeCloseTo(200, 9);
  });
  it('ungültige Werte werfen', () => {
    expect(() => transferTime(1, 'GB', 0, 'Mbit/s')).toThrow();
    expect(() => transferTime(-1, 'GB', 1, 'Mbit/s')).toThrow();
    expect(() => transferTime(1, 'GB', 1, 'Mbit/s', 100, 'rate')).toThrow();
  });
  it('Zeit zerlegen', () => {
    expect(splitHms(160)).toEqual({ h: 0, m: 2, s: 40 });
    expect(splitHms(3725)).toEqual({ h: 1, m: 2, s: 5 });
    expect(formatHms(160)).toBe('2 min 40 s');
    expect(formatHms(3725)).toBe('1 h 2 min 5 s');
    expect(formatHms(12.5)).toBe('12,5 s');
  });
});

describe('Zahlensysteme', () => {
  it('parst Binär, Hex, Dezimal', () => {
    expect(parseInBase('1100 1000', 2, 8)).toEqual({ value: 200 });
    expect(parseInBase('0xC8', 16, 8)).toEqual({ value: 200 });
    expect(parseInBase('ff', 16, 8)).toEqual({ value: 255 });
    expect(parseInBase('65535', 10, 16)).toEqual({ value: 65535 });
    expect(parseInBase('192.168.1.1', 10, 32)).toEqual({ value: 3232235777 });
    expect(parseInBase('11111111.11111111.11111111.00000000', 2, 32)).toEqual({ value: 4294967040 });
  });
  it('erkennt Bereichsüberschreitung und ungültige Zeichen', () => {
    expect('error' in parseInBase('256', 10, 8)).toBe(true);
    expect('error' in parseInBase('100000000', 2, 8)).toBe(true);
    expect('error' in parseInBase('1FF', 16, 8)).toBe(true);
    expect('error' in parseInBase('102', 2, 8)).toBe(true);
    expect('error' in parseInBase('G1', 16, 16)).toBe(true);
    expect('error' in parseInBase('', 10, 8)).toBe(true);
    expect('error' in parseInBase('4294967296', 10, 32)).toBe(true);
  });
  it('formatiert mit Bitbreite', () => {
    expect(formatInBase(200, 2, 8)).toBe('11001000');
    expect(formatInBase(200, 16, 16)).toBe('00C8');
    expect(formatInBase(4294967295, 16, 32)).toBe('FFFFFFFF');
    expect(groupDigits('11001000', 4)).toBe('1100 1000');
  });
  it('Stellenwerte', () => {
    expect(setBitWeights(200, 8)).toEqual([128, 64, 8]);
    expect(setBitWeights(2 ** 31 + 1, 32)).toEqual([2147483648, 1]);
    expect(hexBreakdown(200, 8).map((h) => [h.digit, h.weight, h.nibble])).toEqual([
      ['C', 16, '1100'],
      ['8', 1, '1000'],
    ]);
  });
});

describe('Energie', () => {
  it('P = U · I', () => {
    expect(powerWatts(230, 0.5)).toBe(115);
  });
  it('kWh und Kosten', () => {
    expect(energyKWh(100, 10)).toBe(1);
    const c = energyCost(115, 24, 365, 0.3);
    expect(c.kWh).toBeCloseTo(1007.4, 9);
    expect(c.cost).toBeCloseTo(302.22, 9);
    expect(c.kWhPerDay).toBeCloseTo(2.76, 9);
    expect(energyCost(50, 8, 220, 0.25, 10).kWh).toBeCloseTo(880, 9);
  });
});
