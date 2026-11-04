import { describe, expect, it } from 'vitest';
import { fisiResult } from '../src/core/fisiNote';

describe('FISI-Gesamtergebnis (FIAusbV § 24)', () => {
  it('Gewichtung 20/50/10/10/10', () => {
    const r = fisiResult({ ap1: 80, projektarbeit: 90, praesentation: 70, ka: 60, nw: 70, wiso: 50 });
    expect(r.projekt).toBe(80);
    // 0,2·80 + 0,5·80 + 0,1·60 + 0,1·70 + 0,1·50 = 16 + 40 + 6 + 7 + 5 = 74
    expect(r.gesamt).toBe(74);
    expect(r.teil2).toBe(72.5); // (40 + 18) / 0,8
    expect(r.bestanden).toBe(true);
  });

  it('ein Teil-2-Bereich unter 30 → nicht bestanden, auch bei gutem Gesamtergebnis', () => {
    const r = fisiResult({ ap1: 90, projektarbeit: 95, praesentation: 95, ka: 90, nw: 25, wiso: 90 });
    expect(r.gesamt).toBeGreaterThan(80);
    expect(r.bestanden).toBe(false);
    expect(r.ergaenzung).toEqual(['nw']); // (2·25 + 100)/3 = 50 → reicht
  });

  it('zwei Bereiche unter 50 → weniger als drei ausreichend', () => {
    const r = fisiResult({ ap1: 70, projektarbeit: 80, praesentation: 80, ka: 45, nw: 40, wiso: 70 });
    expect(r.bestanden).toBe(false);
    expect(r.gruende.join()).toContain('drei');
  });
});
