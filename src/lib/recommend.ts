/**
 * Empfehlungslogik: nächste Lerneinheit, fällige Wiederholungen, Förderschleifen und
 * Aufgabenauswahl (Generatoren bevorzugt → leicht veränderte Aufgaben statt Auswendiglernen).
 */
import { LESSONS, MODULES, QUESTIONS, SKILL_MAP, lessonForSkill } from '../content';
import type { Difficulty, Question } from '../content/types';
import { GENERATORS, generate } from '../core/generators';
import { isDue, knowledge, needsRemediation, nextDifficulty, recurringErrors, type SkillState } from '../core/learning';
import type { LessonProgress } from './store';
import { Rng } from '../core/rng';

export interface Recommendation {
  kind: 'remediation' | 'review' | 'lesson' | 'practice' | 'placement';
  title: string;
  reason: string;
  route: string;
  skill?: string;
}

export function recommend(skills: Record<string, SkillState>, lp: LessonProgress, placementDone: boolean, now = Date.now()): Recommendation[] {
  const out: Recommendation[] = [];
  if (!placementDone) out.push({ kind: 'placement', title: 'Einstufungstest', reason: 'Damit die App weiß, wo du wirklich stehst (ca. 15 Minuten).', route: '/einstufung' });

  // 1. Förderschleifen bei wiederholten Fehlern
  for (const s of Object.values(skills)) {
    if (needsRemediation(s)) {
      const rec = recurringErrors(s)[0];
      out.push({ kind: 'remediation', title: `Gezielt üben: ${SKILL_MAP.get(s.skill)?.title ?? s.skill}`, reason: rec ? `Wiederkehrender Fehler erkannt (${rec.count}×). Kurze Wiederholung, neue Erklärung, dann leichte Aufgaben.` : 'Mehrere Fehler in Folge – zurück zu den Grundlagen.', route: `/schwaechen/${s.skill}`, skill: s.skill });
    }
  }
  // 2. fällige Wiederholungen
  const due = Object.values(skills).filter((s) => isDue(s, now) && !needsRemediation(s)).sort((a, b) => a.due - b.due);
  if (due.length) out.push({ kind: 'review', title: `${due.length} Wiederholung${due.length > 1 ? 'en' : ''} fällig`, reason: due.slice(0, 3).map((s) => SKILL_MAP.get(s.skill)?.title ?? s.skill).join(', '), route: '/schwaechen' });

  // 3. nächste Lektion (Lernreihenfolge, unvollständig)
  const next = LESSONS.find((l) => !lp[l.id]?.done);
  if (next) {
    const started = lp[next.id] && lp[next.id].step > 0;
    out.push({ kind: 'lesson', title: `${started ? 'Weiter mit' : 'Nächste Lektion'}: ${next.title}`, reason: `${MODULES.find((m) => m.id === next.module)?.title} · ca. ${next.minutes} min`, route: `/lektion/${next.id}` });
  }
  // 4. schwächster begonnener Skill
  const weakest = Object.values(skills).filter((s) => s.attempts > 0 && !needsRemediation(s)).sort((a, b) => knowledge(a, now) - knowledge(b, now))[0];
  if (weakest && knowledge(weakest, now) < 0.7) out.push({ kind: 'practice', title: `Üben: ${SKILL_MAP.get(weakest.skill)?.title ?? weakest.skill}`, reason: `Kenntnisstand ${Math.round(knowledge(weakest, now) * 100)} %`, route: `/ueben/skill/${weakest.skill}` });
  return out;
}

/** Erzeugt eine Aufgabe für einen Skill: Generator bevorzugt, sonst aus dem Fragenpool (zufällig, möglichst ungesehen). */
export function questionForSkill(skill: string, difficulty: Difficulty, seen: Set<string> = new Set(), rng = new Rng((Math.random() * 2 ** 32) >>> 0)): Question | null {
  const gens = GENERATORS.filter((g) => g.skill === skill);
  const pool = QUESTIONS.filter((q) => q.skill === skill);
  const useGen = gens.length > 0 && (pool.length === 0 || rng.bool(0.7));
  if (useGen) return generate(rng.pick(gens).id, difficulty, (rng.next() * 2 ** 32) >>> 0);
  if (!pool.length) return null;
  const fitting = pool.filter((q) => Math.abs(q.difficulty - difficulty) <= 1);
  const unseen = (fitting.length ? fitting : pool).filter((q) => !seen.has(q.id));
  return rng.pick(unseen.length ? unseen : fitting.length ? fitting : pool);
}

/** Alle Skills, für die es Aufgaben gibt (Pool oder Generator). */
export function practicableSkills(moduleId?: string): string[] {
  const ids = new Set<string>();
  for (const q of QUESTIONS) if (!moduleId || q.module === moduleId) ids.add(q.skill);
  for (const g of GENERATORS) if (!moduleId || SKILL_MAP.get(g.skill)?.module === moduleId) ids.add(g.skill);
  return [...ids].filter((id) => SKILL_MAP.has(id));
}

/** Gewichtete Auswahl von Skills für Schwachstellen-Training. */
export function weakSkills(skills: Record<string, SkillState>, now = Date.now(), n = 6): string[] {
  const practicable = new Set(practicableSkills());
  return Object.values(skills)
    .filter((s) => practicable.has(s.skill) && (s.attempts > 0 || s.lessonDone))
    .map((s) => ({ s, w: (needsRemediation(s) ? 2 : 0) + (isDue(s, now) ? 1 : 0) + (1 - knowledge(s, now)) }))
    .sort((a, b) => b.w - a.w)
    .slice(0, n)
    .map((x) => x.s.skill);
}

export function lessonFor(skill: string) {
  return lessonForSkill(skill);
}

export { nextDifficulty };
