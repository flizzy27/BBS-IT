import { GENERATORS_HARDWARE } from '../src/core/gen/hardware';
import { Rng } from '../src/core/rng';
import { grade } from '../src/core/grading';
describe('hw gens', () => {
  it('ok', () => {
    const bad: string[] = [];
    const samples: string[] = [];
    for (const g of GENERATORS_HARDWARE) for (const d of [1, 2, 3] as const) for (let s = 1; s <= 50; s++) {
      const q = g.make(new Rng(s * 7919 + d), d) as any;
      const r = grade(q, String(q.answer));
      if (!r.correct) bad.push(`${g.id} d${d} s${s}: ${q.answer}`);
      // German formatted answer too
      const de = Number(q.answer).toLocaleString('de-DE', { maximumFractionDigits: 6 });
      if (!grade(q, de).correct) bad.push(`${g.id} d${d} s${s} de: ${de}`);
      for (const m of q.misconceptions ?? []) if (grade(q, m.answer).correct) bad.push(`${g.id} d${d} s${s} mc=${m.answer}`);
      if (!Number.isFinite(q.answer) || /NaN|undefined|Infinity/.test(q.prompt + q.explanation)) bad.push(`${g.id} d${d} s${s} NaN`);
      if (s === 1) samples.push(`${g.id} d${d}: ${q.prompt.slice(0, 200).replace(/\n/g, ' ')} => ${q.answer} | mcs ${(q.misconceptions||[]).map((m:any)=>m.answer).join(',')}`);
    }
    console.log(samples.join('\n'));
    expect(bad).toEqual([]);
  });
});
