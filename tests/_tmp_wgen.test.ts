import { GENERATORS_WIRTSCHAFT } from '../src/core/gen/wirtschaft';
import { Rng } from '../src/core/rng';
import { grade } from '../src/core/grading';
import type { Question, Difficulty } from '../src/content/types';

function correctResponse(q: Question): unknown {
  switch (q.kind) {
    case 'single': return q.answer;
    case 'multi': return q.answer;
    case 'number': return String(q.answer);
    case 'text': return q.accept[0];
    case 'table': return q.rows.map((r) => Object.fromEntries(Object.entries(r.cells).map(([k, c]) => [k, c.answer ?? ''])));
    default: return null;
  }
}
describe('wirtschaft generators', () => {
  it('self-consistent', () => {
    const bad: string[] = [];
    const samples: string[] = [];
    for (const g of GENERATORS_WIRTSCHAFT) for (const d of [1, 2, 3] as Difficulty[]) for (let s = 1; s <= 50; s++) {
      const q = g.make(new Rng(s * 7919 + d), d);
      const txt = JSON.stringify(q);
      if (/NaN|undefined|Infinity/.test(txt)) bad.push(`${g.id} d${d} s${s}: NaN/undefined`);
      const r = grade(q, correctResponse(q) as never);
      if (!r.correct) bad.push(`${g.id} d${d} s${s}: not correct ${r.feedback.slice(0, 100)}`);
      if (q.kind !== 'table') for (const m of q.misconceptions ?? []) if (grade(q, m.answer as never).correct) bad.push(`${g.id} d${d} s${s}: mc correct ${m.answer}`);
      if (q.kind === 'table') {
        for (const m of q.misconceptions ?? []) {
          const [ri, key] = m.cell!.split(':');
          const cell = q.rows[+ri]?.cells[key];
          if (!cell) { bad.push(`${g.id} mc cell missing ${m.cell}`); continue; }
          if ([cell.answer, ...(cell.accept ?? [])].some((a) => Number(a) === Number(m.answer))) bad.push(`${g.id} d${d} s${s}: table mc equals answer ${m.cell}`);
        }
        // Ränge eindeutig
        const rk = q.columns.find((c) => c.key === 'r' || c.key === 'rang');
        if (rk) { const ranks = q.rows.map((r) => r.cells[rk.key]?.answer); if (new Set(ranks).size !== ranks.length) bad.push(`${g.id} d${d} s${s}: duplicate ranks`); }
        const rr = q.rows.find((r) => r.label === 'Rang');
        if (rr) { const ranks = Object.values(rr.cells).map((c) => c.answer); if (new Set(ranks).size !== ranks.length) bad.push(`${g.id} d${d} s${s}: duplicate ranks`); }
      }
      if (s === 1) samples.push(`### ${g.id} d${d}\n${q.prompt}\n---\n${q.explanation}\n${q.kind === 'number' ? 'ANSWER ' + q.answer + ' MC ' + JSON.stringify(q.misconceptions?.map(m=>m.answer)) : ''}`);
    }
    require('fs').writeFileSync(process.env.SAMPLES_OUT ?? 'samples.md', samples.join('\n\n'));
    expect(bad.slice(0, 40)).toEqual([]);
  });
});
