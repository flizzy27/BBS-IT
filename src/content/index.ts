/**
 * Zentrale Registrierung aller Lerninhalte.
 * Neue Module: Datei in ./modules anlegen und hier eintragen.
 */
import type { Area, Lesson, Module, Question, Skill } from './types';
import { m01 } from './modules/m01';
import { m02 } from './modules/m02';
import { m03 } from './modules/m03';
import { m04 } from './modules/m04';
import { m05 } from './modules/m05';
import { m06 } from './modules/m06';
import { m07 } from './modules/m07';
import { m08 } from './modules/m08';
import { m09 } from './modules/m09';
import { m10 } from './modules/m10';
import { m11 } from './modules/m11';
import { m12 } from './modules/m12';
import { m13 } from './modules/m13';
import { m14 } from './modules/m14';
import { m15 } from './modules/m15';
import { m16 } from './modules/m16';

/**
 * Fachbereiche. Neue Bereiche (z. B. IT-Sicherheit, Wirtschaft, Programmierung, AP2-Themen)
 * hier eintragen und Module mit `area: '<id>'` anlegen – siehe docs/INHALTE-ERWEITERN.md.
 */
export const AREAS: Area[] = [
  { id: 'netzwerk', title: 'Netzwerktechnik', short: 'Von Grundlagen bis Subnetting, VLSM, Protokolle und Diagnose.', icon: 'Network', exams: ['AP1', 'AP2'] },
];

/** Empfohlene Lernreihenfolge (Binär vor IPv4, IPv4 vor Subnetting …). */
export const MODULES: Module[] = [m01, m02, m04, m03, m05, m06, m07, m08, m09, m10, m11, m12, m13, m14, m15, m16].filter(Boolean);

export const moduleArea = (m: Module) => m.area ?? 'netzwerk';

export const MODULE_MAP = new Map(MODULES.map((m) => [m.id, m]));

export const SKILLS: Skill[] = MODULES.flatMap((m) => m.skills);
export const SKILL_MAP = new Map(SKILLS.map((s) => [s.id, s]));

export const LESSONS: (Lesson & { module: string })[] = MODULES.flatMap((m) => m.lessons.map((l) => ({ ...l, module: m.id })));
export const LESSON_MAP = new Map(LESSONS.map((l) => [l.id, l]));

export const QUESTIONS: (Question & { module: string })[] = MODULES.flatMap((m) => m.questions.map((q) => ({ ...q, module: m.id })));
export const QUESTION_MAP = new Map(QUESTIONS.map((q) => [q.id, q]));

/** Inline-Verständnisfragen aus Lektionen (für Statistik/Nachschlagen). */
export const CHECK_QUESTIONS: Question[] = LESSONS.flatMap((l) => l.steps.flatMap((s) => (s.type === 'check' ? [s.question] : [])));

export function skillTitle(id: string): string {
  return SKILL_MAP.get(id)?.title ?? id;
}

export function moduleOfSkill(id: string): Module | undefined {
  const s = SKILL_MAP.get(id);
  return s ? MODULE_MAP.get(s.module) : MODULE_MAP.get(id.split('.')[0]);
}

/** Erste Lektion, die einen Skill vermittelt. */
export function lessonForSkill(id: string): (Lesson & { module: string }) | undefined {
  return LESSONS.find((l) => l.skills.includes(id));
}

export function questionsForSkill(id: string): Question[] {
  return QUESTIONS.filter((q) => q.skill === id);
}
