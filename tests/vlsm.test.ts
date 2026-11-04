import { formatIp, overlaps, parseIp, blockSize } from '../src/core/ipv4';
import { allocateVlsm, validateVlsm, type VlsmDemand } from '../src/core/vlsm';

const demands: VlsmDemand[] = [
  { id: 'ny', name: 'New York', hosts: 115, kind: 'lan' },
  { id: 'sj1', name: 'San Jose', hosts: 48, kind: 'lan' },
  { id: 'fargo', name: 'Fargo', hosts: 23, kind: 'lan' },
  { id: 'sj2', name: 'San Jose 2', hosts: 12, kind: 'lan' },
  { id: 'w1', name: 'WAN 1', hosts: 2, kind: 'wan' },
  { id: 'w2', name: 'WAN 2', hosts: 2, kind: 'wan' },
];
const opts = { wanPrefix: 30 as const };

describe('VLSM-Musterlösung', () => {
  it('Beispiel 192.168.10.0/24 aus der Aufgabenstellung', () => {
    const r = allocateVlsm('192.168.10.0/24', demands, opts)!;
    const m = Object.fromEntries(r.map((x) => [x.id, `${formatIp(x.network)}/${x.prefix}`]));
    expect(m).toEqual({
      ny: '192.168.10.0/25',
      sj1: '192.168.10.128/26',
      fargo: '192.168.10.192/27',
      sj2: '192.168.10.224/28',
      w1: '192.168.10.240/30',
      w2: '192.168.10.244/30',
    });
  });
  it('keine Überlappungen, alles ausgerichtet, für viele Zufallsfälle', () => {
    for (let i = 0; i < 300; i++) {
      const ds: VlsmDemand[] = Array.from({ length: 1 + Math.floor(Math.random() * 6) }, (_, j) => ({
        id: 'd' + j, name: 'D' + j, hosts: 1 + Math.floor(Math.random() * 120), kind: Math.random() < 0.25 ? 'wan' : 'lan',
      }));
      const r = allocateVlsm('10.20.0.0/22', ds, opts);
      if (!r) continue;
      for (const a of r) expect(a.network % blockSize(a.prefix)).toBe(0);
      for (let x = 0; x < r.length; x++) for (let y = x + 1; y < r.length; y++) expect(overlaps(r[x], r[y])).toBe(false);
      const v = validateVlsm('10.20.0.0/22', ds, Object.fromEntries(r.map((a) => [a.id, { network: formatIp(a.network), prefix: '/' + a.prefix }])), opts);
      expect(v.ok).toBe(true);
    }
  });
  it('liefert null, wenn es nicht passt', () => {
    expect(allocateVlsm('192.168.0.0/24', [{ id: 'a', name: 'A', hosts: 200, kind: 'lan' }, { id: 'b', name: 'B', hosts: 100, kind: 'lan' }], opts)).toBeNull();
  });
});

describe('VLSM-Validierung akzeptiert alternative Pläne', () => {
  it('umgekehrte Anordnung ist korrekt', () => {
    const v = validateVlsm('192.168.10.0/24', demands, {
      ny: { network: '192.168.10.128', prefix: '/25' },
      sj1: { network: '192.168.10.0', prefix: '/26' },
      fargo: { network: '192.168.10.64', prefix: '27' },
      sj2: { network: '192.168.10.96', prefix: '255.255.255.240' },
      w1: { network: '192.168.10.112', prefix: '/30' },
      w2: { network: '192.168.10.116', prefix: '/30' },
    }, opts);
    expect(v.ok).toBe(true);
    expect(v.score).toBe(1);
  });
  it('erkennt alle Fehlerarten', () => {
    const v = validateVlsm('192.168.10.0/24', demands, {
      ny: { network: '192.168.10.0', prefix: '/26' }, // zu klein
      sj1: { network: '192.168.10.96', prefix: '/26' }, // nicht ausgerichtet
      fargo: { network: '192.168.10.0', prefix: '/27' }, // überlappt mit ny
      sj2: { network: '192.168.11.0', prefix: '/28' }, // außerhalb
      w1: { network: '192.168.10.240', prefix: '/29' }, // WAN-Konvention
      w2: { network: '192.168.10.244', prefix: '/30', broadcast: '192.168.10.248' }, // Broadcast falsch
    }, opts);
    const codes = (id: string) => v.entries.find((e) => e.id === id)!.issues.map((i) => i.code);
    expect(codes('ny')).toContain('too-small');
    expect(codes('sj1')).toContain('not-aligned');
    expect(codes('fargo')).toContain('overlap');
    expect(codes('sj2')).toContain('outside-base');
    expect(codes('w1')).toContain('wan-convention');
    expect(codes('w2')).toContain('broadcast');
    expect(codes('w2')).toContain('overlap'); // .244/30 liegt in .240/29
    expect(v.ok).toBe(false);
  });
  it('zu große Netze werden bemängelt (optimal verlangt)', () => {
    const v = validateVlsm('192.168.10.0/24', [{ id: 'a', name: 'A', hosts: 20, kind: 'lan' }], { a: { network: '192.168.10.0', prefix: '/26' } }, opts);
    expect(v.entries[0].issues[0].code).toBe('too-large');
    expect(v.ok).toBe(false);
    const v2 = validateVlsm('192.168.10.0/24', [{ id: 'a', name: 'A', hosts: 20, kind: 'lan' }], { a: { network: '192.168.10.0', prefix: '/26' } }, { ...opts, requireOptimal: false });
    expect(v2.ok).toBe(true);
  });
  it('Reihenfolge-Pflicht', () => {
    const v = validateVlsm('192.168.10.0/24', demands.slice(0, 2), {
      ny: { network: '192.168.10.128', prefix: '/25' },
      sj1: { network: '192.168.10.0', prefix: '/26' },
    }, { ...opts, requireOrdered: true });
    expect(v.ok).toBe(false);
    expect(v.entries[0].issues.some((i) => i.code === 'order')).toBe(true);
  });
  it('/31-Konvention', () => {
    const v = validateVlsm('10.0.0.0/24', [{ id: 'w', name: 'W', hosts: 2, kind: 'wan' }], { w: { network: '10.0.0.0', prefix: '/31' } }, { wanPrefix: 31 });
    expect(v.ok).toBe(true);
    expect(parseIp(v.entries[0].computed!.lastHost)).toBe(parseIp('10.0.0.1'));
  });
});
