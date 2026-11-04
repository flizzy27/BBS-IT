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
import { h01 } from './modules/h01';
import { h02 } from './modules/h02';
import { h03 } from './modules/h03';
import { h04 } from './modules/h04';
import { h05 } from './modules/h05';
import { w01 } from './modules/w01';
import { w02 } from './modules/w02';
import { w03 } from './modules/w03';
import { w04 } from './modules/w04';
import { w05 } from './modules/w05';
import { d01 } from './modules/d01';
import { d02 } from './modules/d02';
import { d03 } from './modules/d03';
import { s01 } from './modules/s01';
import { s02 } from './modules/s02';
import { s03 } from './modules/s03';
import { s04 } from './modules/s04';
import { s05 } from './modules/s05';
import { b01 } from './modules/b01';
import { b02 } from './modules/b02';
import { b03 } from './modules/b03';
import { b04 } from './modules/b04';
import { b05 } from './modules/b05';
import { b06 } from './modules/b06';
import { p01 } from './modules/p01';
import { p02 } from './modules/p02';
import { p03 } from './modules/p03';
import { p04 } from './modules/p04';
import { p05 } from './modules/p05';
import { e01 } from './modules/e01';
import { d04 } from './modules/d04';

/**
 * Fachbereiche. Neue Bereiche (z. B. IT-Sicherheit, Wirtschaft, Programmierung, AP2-Themen)
 * hier eintragen und Module mit `area: '<id>'` anlegen – siehe docs/INHALTE-ERWEITERN.md.
 */
export const AREAS: Area[] = [
  { id: 'netzwerk', title: 'Netzwerktechnik', short: 'Von Grundlagen bis Subnetting, VLSM, Protokolle und Diagnose.', icon: 'Network', color: '#5b8cff', exams: ['AP1', 'AP2'] },
  { id: 'hardware', title: 'IT-Systeme, Hardware & Energie', short: 'Komponenten, Speicher, Schnittstellen, Energieeffizienz, USV, Ergonomie.', icon: 'Cpu', color: '#3cc8e0', exams: ['AP1'] },
  { id: 'systeme', title: 'Betriebssysteme, Software & Cloud', short: 'Installation, Rechte, Lizenzen, Cloud, Virtualisierung, Qualität.', icon: 'MonitorCog', color: '#34c77b', exams: ['AP1', 'AP2'] },
  { id: 'sicherheit', title: 'IT-Sicherheit & Datenschutz', short: 'Schutzziele, BSI-Grundschutz, DSGVO, Datensicherung, Zugriffsschutz.', icon: 'ShieldCheck', color: '#ff6b9a', exams: ['AP1', 'AP2'] },
  { id: 'programmierung', title: 'Programmierung & Softwareentwicklung', short: 'Pseudocode, Kontrollstrukturen, Algorithmen, UML, Testen.', icon: 'Code', color: '#a77bff', exams: ['AP1'] },
  { id: 'daten', title: 'Datenbanken', short: 'Relationale Grundlagen, ER-Modell, Normalisierung, SQL.', icon: 'Database', color: '#ff9f43', exams: ['AP1', 'AP2'] },
  { id: 'englisch', title: 'Englisch im IT-Alltag', short: 'Datenblätter, Fehlermeldungen, Anleitungen und Support-E-Mails verstehen und übersetzen.', icon: 'Languages', color: '#4fc3a1', exams: ['AP1', 'AP2'] },
  { id: 'wirtschaft', title: 'Kundenberatung, Wirtschaft & Recht', short: 'Kundengespräch, Angebotsvergleich, Nutzwertanalyse, Kalkulation, Verträge, Projekt.', icon: 'Briefcase', color: '#f5b942', exams: ['AP1', 'AP2'] },
];

/** Empfohlene Lernreihenfolge (Binär vor IPv4, IPv4 vor Subnetting …). */
export const MODULES: Module[] = [m01, m02, m04, m03, m05, m06, m07, m08, m09, m10, m11, m12, m13, m14, m15, m16, h01, h02, h03, h04, h05, w01, w02, w03, w04, w05, d01, d02, d03, d04, s01, s02, s03, s04, s05, b01, b02, b03, b04, b05, b06, p01, p02, p03, p04, p05, e01].filter(Boolean);

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
