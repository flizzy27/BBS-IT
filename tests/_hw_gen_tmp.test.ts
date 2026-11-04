import { writeFileSync, existsSync } from 'node:fs';
import { GENERATORS_HARDWARE } from '../src/core/gen/hardware';
import { Rng } from '../src/core/rng';
import { grade } from '../src/core/grading';
import { allocateVlsm } from '../src/core/vlsm';
import { formatIp } from '../src/core/ipv4';
import type { Module, Question } from '../src/content/types';

const OUT = 'C:/Users/MARCEL~1.HEU/AppData/Local/Temp/claude/0ca0c66170ebaaae/bb132572-5bde-4e15-b546-3b9e1be47ed4/scratchpad/';

function correctResponse(q: Question): unknown {
  switch (q.kind) {
    case 'single': return q.answer;
    case 'multi': return q.answer;
    case 'number': return String(q.answer);
    case 'text': return q.accept[0];
    case 'ip': return q.answer;
    case 'cidr': return q.answer;
    case 'match': return q.answer;
    case 'order': return q.items.map((_, i) => i);
    case 'table': return q.rows.map((r) => Object.fromEntries(Object.entries(r.cells).map(([k, c]) => [k, c.answer ?? ''])));
    case 'free': return { selfScore: 1, text: q.modelAnswer };
    case 'vlsm': return Object.fromEntries(allocateVlsm(q.base, q.demands, { wanPrefix: q.wanPrefix })!.map((a) => [a.id, { network: formatIp(a.network), prefix: '/' + a.prefix }]));
  }
}

describe('hw gens', () => {
  it('generators ok', () => {
    const bad: string[] = [];
    const samples: string[] = [];
    for (const g of GENERATORS_HARDWARE) for (const d of [1, 2, 3] as const) for (let s = 1; s <= 50; s++) {
      const q = g.make(new Rng(s * 7919 + d), d) as any;
      const r = grade(q, String(q.answer));
      if (!r.correct) bad.push(`${g.id} d${d} s${s}: ${q.answer}`);
      const de = Number(q.answer).toLocaleString('de-DE', { maximumFractionDigits: 6 });
      if (!grade(q, de).correct) bad.push(`${g.id} d${d} s${s} de: ${de}`);
      for (const m of q.misconceptions ?? []) if (grade(q, m.answer).correct) bad.push(`${g.id} d${d} s${s} mc=${m.answer}`);
      if (!Number.isFinite(q.answer) || /NaN|undefined|Infinity/.test(q.prompt + q.explanation)) bad.push(`${g.id} d${d} s${s} NaN`);
      if (s <= 2) samples.push(`${g.id} d${d}: ${q.prompt.replace(/\n/g, ' ')} => ${q.answer} | mcs ${(q.misconceptions || []).map((m: any) => m.answer).join(',')}\n   EXPL: ${q.explanation.replace(/\n/g, ' ')}`);
    }
    writeFileSync(OUT + 'gen_samples.txt', samples.join('\n'));
    expect(bad).toEqual([]);
  });

  it('modules ok', async () => {
    const mods: Module[] = [];
    for (const id of ['h01', 'h02', 'h03', 'h04', 'h05']) {
      const p = `../src/content/modules/${id}.ts`;
      if (!existsSync(new URL(p, import.meta.url))) continue;
      const m = await import(/* @vite-ignore */ p);
      mods.push(m[id]);
    }
    const bad: string[] = [];
    const report: string[] = [];
    const genIds = new Set(GENERATORS_HARDWARE.map((g) => g.id));
    const allSkills = new Set(mods.flatMap((m) => m.skills.map((s) => s.id)));
    const ids = new Set<string>();
    const dupe = (id: string) => { if (ids.has(id)) bad.push('dup ' + id); ids.add(id); };
    for (const g of GENERATORS_HARDWARE) if (!allSkills.has(g.skill)) bad.push(`gen ${g.id} skill ${g.skill} missing`);
    for (const m of mods) {
      if (m.area !== 'hardware') bad.push(m.id + ' area');
      for (const s of m.skills) { if (s.module !== m.id) bad.push(`${s.id} module`); for (const r of s.requires ?? []) if (!allSkills.has(r)) bad.push(`${s.id} req ${r}`); }
      for (const g of m.generators ?? []) if (!genIds.has(g)) bad.push(`${m.id} gen ${g}`);
      const qids = new Set(m.questions.map((q) => q.id));
      const checks: Question[] = [];
      for (const l of m.lessons) {
        dupe(l.id);
        if (!l.id.startsWith(m.id + '-l')) bad.push('lesson id ' + l.id);
        for (const s of l.skills) if (!allSkills.has(s)) bad.push(`${l.id} skill ${s}`);
        if (!l.steps.some((s) => s.type === 'explain')) bad.push(`${l.id} no explain`);
        if (l.steps[l.steps.length - 1].type !== 'summary') bad.push(`${l.id} no summary end`);
        for (const s of l.steps) {
          if (s.type === 'check') checks.push(s.question);
          if (s.type === 'practice') {
            if (s.generator && !genIds.has(s.generator)) bad.push(`${l.id} practice gen ${s.generator}`);
            for (const q of s.questionIds ?? []) if (!qids.has(q)) bad.push(`${l.id} practice q ${q}`);
            if (!s.generator && !s.questionIds?.length) bad.push(`${l.id} empty practice`);
          }
        }
      }
      const kinds: Record<string, number> = {};
      for (const q of [...m.questions, ...checks]) {
        dupe(q.id);
        if (!allSkills.has(q.skill)) bad.push(`${q.id} skill ${q.skill}`);
        if (!q.prompt?.trim() || !q.explanation?.trim()) bad.push(`${q.id} text`);
        if (q.kind === 'single') { if (!(q.answer >= 0 && q.answer < q.options.length)) bad.push(q.id + ' ans'); for (const k of Object.keys(q.distractors ?? {})) if (+k === q.answer || +k >= q.options.length) bad.push(`${q.id} distr ${k}`); }
        if (q.kind === 'multi' && (!q.answer.length || q.answer.some((a) => a < 0 || a >= q.options.length))) bad.push(q.id + ' multi');
        if (q.kind === 'match' && (q.answer.length !== q.left.length || q.answer.some((a) => a < 0 || a >= q.right.length))) bad.push(q.id + ' match');
        if (q.kind === 'table' && !q.rows.some((r) => Object.values(r.cells).some((c) => c.answer !== undefined))) bad.push(q.id + ' table');
        const r = grade(q, correctResponse(q) as never);
        if (!r.correct) bad.push(`${q.id} not correct: ${r.feedback.slice(0, 100)}`);
        if (q.kind !== 'table') for (const mc of q.misconceptions ?? []) if (grade(q, mc.answer as never).correct) bad.push(`${q.id} mc ${mc.answer}`);
      }
      for (const q of m.questions) kinds[q.kind] = (kinds[q.kind] ?? 0) + 1;
      const diffs = [1, 2, 3].map((d) => m.questions.filter((q) => q.difficulty === d).length);
      report.push(`${m.id}: lessons=${m.lessons.length} pool=${m.questions.length} checks=${checks.length} skills=${m.skills.length} gens=${(m.generators ?? []).length} kinds=${JSON.stringify(kinds)} diffs=${diffs}`);
      for (const s of m.skills) { const n = m.questions.filter((q) => q.skill === s.id).length; if (n < 2) report.push(`  skill ${s.id} only ${n} pool qs`); }
    }
    writeFileSync(OUT + 'mod_report.txt', report.join('\n') + '\n\nBAD:\n' + bad.join('\n'));
    expect(bad).toEqual([]);
  });
});
