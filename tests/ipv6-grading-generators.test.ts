import { compressIpv6, expandIpv6, ipv6Equal, ipv6NthSubnet, ipv6Type, isValidIpv6, parseIpv6 } from '../src/core/ipv6';
import { grade, parseNumberInput } from '../src/core/grading';
import { GENERATORS, generate } from '../src/core/generators';
import type { Difficulty, Question } from '../src/content/types';
import { validateVlsm, allocateVlsm } from '../src/core/vlsm';
import { formatIp } from '../src/core/ipv4';

describe('IPv6', () => {
  it('kürzt nach RFC 5952', () => {
    expect(compressIpv6('2001:0db8:0000:0000:0000:0000:0000:0001')).toBe('2001:db8::1');
    expect(compressIpv6('2001:0db8:0000:0001:0000:0000:0000:0001')).toBe('2001:db8:0:1::1');
    expect(compressIpv6('2001:db8:0:0:1:0:0:1')).toBe('2001:db8::1:0:0:1'); // Gleichstand → erste
    expect(compressIpv6('2001:db8:0:1:1:1:1:1')).toBe('2001:db8:0:1:1:1:1:1'); // einzelner 0-Block kein ::
    expect(compressIpv6('0:0:0:0:0:0:0:0')).toBe('::');
    expect(compressIpv6('0:0:0:0:0:0:0:1')).toBe('::1');
    expect(compressIpv6('fe80:0:0:0:0:0:0:0')).toBe('fe80::');
    expect(compressIpv6('2001:DB8::A')).toBe('2001:db8::a');
  });
  it('expandiert', () => {
    expect(expandIpv6('2001:db8::1')).toBe('2001:0db8:0000:0000:0000:0000:0000:0001');
    expect(expandIpv6('::')).toBe('0000:0000:0000:0000:0000:0000:0000:0000');
    expect(expandIpv6('::ffff:192.168.1.1')).toBe('0000:0000:0000:0000:0000:ffff:c0a8:0101');
  });
  it('validiert', () => {
    expect(isValidIpv6('2001:db8::1::1')).toBe(false);
    expect(isValidIpv6('2001:db8:1:2:3:4:5:6:7')).toBe(false);
    expect(isValidIpv6('2001:db8:1:2:3:4:5:6')).toBe(true);
    expect(isValidIpv6('12345::1')).toBe(false);
    expect(isValidIpv6('1:2:3:4:5:6:7::')).toBe(true);
    expect(isValidIpv6('1:2:3:4:5:6:7:8::')).toBe(false);
    expect(ipv6Equal('2001:db8::1', '2001:0db8:0:0:0:0:0:1')).toBe(true);
  });
  it('Typen', () => {
    expect(ipv6Type('fe80::1')).toBe('Link-Local');
    expect(ipv6Type('fd12:3456::1')).toBe('Unique Local');
    expect(ipv6Type('ff02::1')).toBe('Multicast');
    expect(ipv6Type('2a00:1450::1')).toBe('Global Unicast');
    expect(ipv6Type('::1')).toBe('Loopback');
  });
  it('Subnetze', () => {
    expect(compressIpv6(ipv6NthSubnet(parseIpv6('2001:db8:abcd::')!, 48, 64, 1))).toBe('2001:db8:abcd:1::');
    expect(compressIpv6(ipv6NthSubnet(parseIpv6('2001:db8:abcd::')!, 48, 64, 255))).toBe('2001:db8:abcd:ff::');
    expect(compressIpv6(ipv6NthSubnet(parseIpv6('2001:db8:ab00::')!, 40, 48, 3))).toBe('2001:db8:ab03::');
  });
});

describe('Bewertung', () => {
  it('Zahlen in deutscher Schreibweise', () => {
    expect(parseNumberInput('1.024')).toBe(1024);
    expect(parseNumberInput('12,5')).toBe(12.5);
    expect(parseNumberInput('160 s')).toBe(160);
    expect(parseNumberInput('abc')).toBeNull();
  });
  it('IP-Antworten mit Fehlerdiagnose', () => {
    const q: Question = {
      id: 't', kind: 'ip', skill: 'ipv4.broadcast', difficulty: 1, prompt: '', explanation: '', answer: '192.168.10.223',
      misconceptions: [{ answer: '192.168.10.224', error: 'broadcast-naechstes-netz', why: 'x' }],
    };
    expect(grade(q, '192.168.10.223').correct).toBe(true);
    expect(grade(q, ' 192.168.10.223 ').correct).toBe(true);
    const r = grade(q, '192.168.10.224');
    expect(r.correct).toBe(false);
    expect(r.errorTags).toEqual(['broadcast-naechstes-netz']);
    expect(grade(q, '192.168.10').errorTags).toEqual(['eingabeformat']);
  });
  it('CIDR akzeptiert /26, 26 und Maske', () => {
    const q: Question = { id: 't', kind: 'cidr', skill: 's', difficulty: 1, prompt: '', explanation: '', answer: '/26' };
    expect(grade(q, '/26').correct).toBe(true);
    expect(grade(q, '26').correct).toBe(true);
    expect(grade(q, '255.255.255.192').correct).toBe(true);
    expect(grade(q, '/27').correct).toBe(false);
  });
  it('Mehrfachauswahl mit Teilpunkten', () => {
    const q: Question = { id: 't', kind: 'multi', skill: 's', difficulty: 1, prompt: '', explanation: '', options: ['a', 'b', 'c', 'd'], answer: [0, 2] };
    expect(grade(q, [0, 2]).correct).toBe(true);
    expect(grade(q, [0]).score).toBe(0.5);
    expect(grade(q, [0, 1]).score).toBe(0);
  });
  it('Zuordnung und Reihenfolge', () => {
    const m: Question = { id: 't', kind: 'match', skill: 's', difficulty: 1, prompt: '', explanation: '', left: ['a', 'b'], right: ['x', 'y'], answer: [1, 0] };
    expect(grade(m, [1, 0]).correct).toBe(true);
    expect(grade(m, [1, 1]).score).toBe(0.5);
    const o: Question = { id: 't', kind: 'order', skill: 's', difficulty: 1, prompt: '', explanation: '', items: ['1', '2', '3'] };
    expect(grade(o, [0, 1, 2]).correct).toBe(true);
    expect(grade(o, [1, 0, 2]).correct).toBe(false);
  });
});

describe('Generatoren', () => {
  const diffs: Difficulty[] = [1, 2, 3];
  it('jeder Generator erzeugt bewertbare Aufgaben, deren Musterlösung als korrekt bewertet wird', () => {
    for (const g of GENERATORS) {
      for (const d of diffs) {
        for (let s = 1; s <= 40; s++) {
          const q = generate(g.id, d, s * 7919 + d);
          expect(q.prompt.length).toBeGreaterThan(10);
          expect(q.explanation.length).toBeGreaterThan(5);
          let r;
          switch (q.kind) {
            case 'single': expect(q.answer).toBeGreaterThanOrEqual(0); expect(q.answer).toBeLessThan(q.options.length); r = grade(q, q.answer); break;
            case 'number': r = grade(q, String(q.answer)); break;
            case 'text': r = grade(q, q.accept[0]); break;
            case 'ip': r = grade(q, q.answer); break;
            case 'cidr': r = grade(q, q.answer); break;
            case 'table': r = grade(q, q.rows.map((row) => Object.fromEntries(Object.entries(row.cells).map(([k, c]) => [k, c.answer ?? ''])))); break;
            case 'vlsm': {
              const ref = allocateVlsm(q.base, q.demands, { wanPrefix: q.wanPrefix })!;
              expect(ref).not.toBeNull();
              r = grade(q, Object.fromEntries(ref.map((a) => [a.id, { network: formatIp(a.network), prefix: '/' + a.prefix }])));
              break;
            }
            default: throw new Error('unerwartet ' + q.kind);
          }
          if (!r.correct) throw new Error(`${g.id} d${d} s${s}: Musterlösung falsch bewertet: ${JSON.stringify(q).slice(0, 400)}`);
          // Fehlbilder dürfen nie der korrekten Antwort entsprechen
          for (const m of q.misconceptions ?? []) {
            if (q.kind === 'ip') expect(m.answer).not.toBe(q.answer);
            if (q.kind === 'number') expect(Number(m.answer)).not.toBe(q.answer);
            if (q.kind === 'cidr') expect(m.answer).not.toBe(q.answer);
            if (q.kind === 'text') expect(q.accept).not.toContain(m.answer);
          }
        }
      }
    }
  });
  it('keine Aufgabe verrät ihre Lösung im Text; Auswahloptionen sind eindeutig', () => {
    const bad: string[] = [];
    const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    for (const g of GENERATORS) for (const d of diffs) for (let s = 1; s <= 60; s++) {
      const q = generate(g.id, d, s * 104729 + d);
      if ((q.kind === 'ip' || (q.kind === 'cidr' && q.answer.includes('.'))) && new RegExp(`(?<![\\d.:])${esc(q.answer)}(?![\\d.:])`).test(q.prompt)) bad.push(`${g.id} d${d} s${s}: ${q.answer}`);
      if ((q.kind === 'single' || q.kind === 'multi') && new Set(q.options).size !== q.options.length) bad.push(`${g.id} d${d} s${s}: doppelte Option`);
    }
    expect([...new Set(bad.map((b) => b.split(' ')[0]))], bad.slice(0, 5).join('\n')).toEqual([]);
  });
  it('VLSM-Aufgaben sind lösbar und die Musterlösung ist überlappungsfrei', () => {
    for (let s = 0; s < 100; s++) {
      const q = generate('vlsm.plan', ((s % 3) + 1) as Difficulty, s);
      if (q.kind !== 'vlsm') throw new Error();
      const v = validateVlsm(q.base, q.demands, {}, { wanPrefix: 30 });
      expect(v.reference).not.toBeNull();
    }
  });
  it('Fehlbild „nächstes Netz statt Broadcast“ wird erkannt', () => {
    const q = generate('ipv4.broadcast', 1, 42);
    if (q.kind !== 'ip') throw new Error();
    const wrong = q.misconceptions!.find((m) => m.error === 'broadcast-naechstes-netz')!;
    expect(grade(q, wrong.answer).errorTags).toEqual(['broadcast-naechstes-netz']);
  });
});
