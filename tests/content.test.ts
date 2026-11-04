/**
 * Qualitätssicherung der Lerninhalte: Struktur, Verweise und Selbstkonsistenz jeder Frage.
 * Jede gespeicherte Musterlösung muss vom Bewertungskern als korrekt erkannt werden.
 */
import { CHECK_QUESTIONS, LESSONS, MODULES, QUESTIONS, SKILL_MAP } from '../src/content';
import type { Question } from '../src/content/types';
import { grade } from '../src/core/grading';
import { GENERATOR_MAP } from '../src/core/generators';
import { ERROR_CATALOG } from '../src/core/errors';
import { LESSON_MAP } from '../src/content';
import { parseIpSafe, parseCidr, parsePrefixInput } from '../src/core/ipv4';
import { allocateVlsm } from '../src/core/vlsm';
import { formatIp } from '../src/core/ipv4';

const ALL: Question[] = [...QUESTIONS, ...CHECK_QUESTIONS];

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

describe('Inhalte', () => {
  it('Module, Lektionen und Fragen sind vorhanden', () => {
    expect(MODULES.length).toBeGreaterThanOrEqual(16);
    expect(LESSONS.length).toBeGreaterThan(80);
    expect(QUESTIONS.length).toBeGreaterThan(400);
  });

  it('IDs sind eindeutig', () => {
    const ids = [...MODULES.map((m) => m.id), ...LESSONS.map((l) => l.id)];
    expect(new Set(ids).size).toBe(ids.length);
    const qids = ALL.map((q) => q.id);
    const dup = qids.filter((x, i) => qids.indexOf(x) !== i);
    expect(dup).toEqual([]);
    const sk = MODULES.flatMap((m) => m.skills.map((s) => s.id));
    expect(sk.filter((x, i) => sk.indexOf(x) !== i)).toEqual([]);
  });

  it('alle Skill-Verweise existieren', () => {
    const missing: string[] = [];
    for (const l of LESSONS) for (const s of l.skills) if (!SKILL_MAP.has(s)) missing.push(`${l.id}:${s}`);
    for (const q of ALL) if (!SKILL_MAP.has(q.skill)) missing.push(`${q.id}:${q.skill}`);
    for (const s of SKILL_MAP.values()) for (const r of s.requires ?? []) if (!SKILL_MAP.has(r)) missing.push(`${s.id} requires ${r}`);
    expect(missing).toEqual([]);
  });

  it('Generatoren und Übungsverweise existieren', () => {
    const bad: string[] = [];
    for (const m of MODULES) for (const g of m.generators ?? []) if (!GENERATOR_MAP.has(g)) bad.push(`${m.id}:${g}`);
    const qids = new Set(QUESTIONS.map((q) => q.id));
    for (const l of LESSONS) for (const s of l.steps) if (s.type === 'practice') {
      if (s.generator && !GENERATOR_MAP.has(s.generator)) bad.push(`${l.id}:${s.generator}`);
      for (const id of s.questionIds ?? []) if (!qids.has(id)) bad.push(`${l.id}:${id}`);
      if (!s.generator && !(s.questionIds?.length)) bad.push(`${l.id}: leere Übung`);
    }
    for (const g of GENERATOR_MAP.values()) if (!SKILL_MAP.has(g.skill)) bad.push(`Generator ${g.id} → Skill ${g.skill} fehlt`);
    expect(bad).toEqual([]);
  });

  it('Lektionsverweise im Fehlerkatalog existieren', () => {
    const bad = Object.entries(ERROR_CATALOG).filter(([, e]) => (e.lesson && !LESSON_MAP.has(e.lesson)) || (e.skill && !SKILL_MAP.has(e.skill))).map(([k]) => k);
    expect(bad).toEqual([]);
  });

  it('Antwortindizes und Strukturen sind gültig', () => {
    const bad: string[] = [];
    for (const q of ALL) {
      if (q.kind === 'single' && !(q.answer >= 0 && q.answer < q.options.length)) bad.push(q.id);
      if (q.kind === 'single' && q.distractors) for (const k of Object.keys(q.distractors)) if (+k === q.answer || +k >= q.options.length) bad.push(`${q.id} distractor ${k}`);
      if (q.kind === 'multi' && (!q.answer.length || q.answer.some((a) => a < 0 || a >= q.options.length))) bad.push(q.id);
      if (q.kind === 'match' && (q.answer.length !== q.left.length || q.answer.some((a) => a < 0 || a >= q.right.length))) bad.push(q.id);
      if (q.kind === 'order' && q.items.length < 2) bad.push(q.id);
      if (q.kind === 'table' && !q.rows.some((r) => Object.values(r.cells).some((c) => c.answer !== undefined))) bad.push(`${q.id} ohne Eingabezellen`);
      if (q.kind === 'ip' && parseIpSafe(q.answer) === null) bad.push(`${q.id} ungültige IP-Lösung`);
      if (q.kind === 'cidr' && !(parseCidr(q.answer) || parsePrefixInput(q.answer) !== null)) bad.push(`${q.id} ungültige CIDR-Lösung`);
      if (!q.prompt?.trim() || !q.explanation?.trim()) bad.push(`${q.id} ohne Text/Erklärung`);
      if (q.kind === 'free' && !q.modelAnswer.trim()) bad.push(`${q.id} ohne Musterlösung`);
    }
    expect(bad).toEqual([]);
  });

  it('jede gespeicherte Musterlösung wird als korrekt bewertet', () => {
    const bad: string[] = [];
    for (const q of ALL) {
      const r = grade(q, correctResponse(q) as never);
      if (!r.correct) bad.push(`${q.id} (${q.kind}): ${r.feedback.slice(0, 120)}`);
    }
    expect(bad).toEqual([]);
  });

  it('Fehlbilder entsprechen nie der richtigen Antwort', () => {
    const bad: string[] = [];
    for (const q of ALL) {
      if (q.kind === 'table') continue;
      for (const m of q.misconceptions ?? []) if (grade(q, m.answer as never).correct) bad.push(`${q.id}: ${m.answer}`);
    }
    expect(bad).toEqual([]);
  });

  it('Lektionen folgen dem didaktischen Aufbau', () => {
    const bad: string[] = [];
    for (const l of LESSONS) {
      if (!l.steps.some((s) => s.type === 'explain')) bad.push(`${l.id} ohne Erklärung`);
      if (!l.steps.some((s) => s.type === 'check' || s.type === 'practice')) bad.push(`${l.id} ohne Verständnisprüfung`);
      if (l.steps[l.steps.length - 1].type !== 'summary') bad.push(`${l.id} endet nicht mit Zusammenfassung`);
    }
    expect(bad).toEqual([]);
  });
});
