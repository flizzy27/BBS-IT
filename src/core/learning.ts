/**
 * Nachvollziehbares Lernmodell
 * ============================
 * Pro Skill wird ein Zustand geführt. Grundlage ist nachgewiesenes Verständnis (Antworten),
 * nicht abgeschlossene Lektionen.
 *
 * 1. Beherrschungsgrad (mastery, 0..1): gleitender Mittelwert über Belege.
 *    - richtig ohne Hilfe  → Ziel 1.0 (Gewicht 0.25 + 0.05·Schwierigkeit)
 *    - richtig mit Tipps   → Ziel 0.6 (Gewicht 0.15)
 *    - falsch              → Ziel 0.0 (Gewicht 0.30)
 * 2. Wiederholungsintervall (Spaced Repetition, angelehnt an SM-2):
 *    - richtig ohne Hilfe: 1 → 3 → Intervall·Leichtigkeit (Leichtigkeit +0.1, max 3.0)
 *    - richtig mit Hilfe:  Intervall bleibt kurz (max 2 Tage), Leichtigkeit −0.05
 *    - falsch:             Intervall 0 (heute erneut), Leichtigkeit −0.2 (min 1.3), „lapse“
 * 3. Abrufwahrscheinlichkeit (retention) sinkt mit der Zeit seit der letzten richtigen Antwort:
 *    R = 0.5 ^ (Tage seit Fälligkeit / max(1, Intervall)) – nur wenn überfällig.
 * 4. Geschätzter Kenntnisstand = mastery · retention.
 * 5. Stufen:
 *    neu → eingeführt → mit Hilfe → ohne Hilfe → beherrscht; „vergessen“ bei Rückfall.
 */

export type Stage = 'neu' | 'eingefuehrt' | 'mit-hilfe' | 'ohne-hilfe' | 'beherrscht' | 'vergessen';

export const STAGE_LABEL: Record<Stage, string> = {
  neu: 'Noch nie gelernt',
  eingefuehrt: 'Gerade verstanden',
  'mit-hilfe': 'Löst mit Hilfestellung',
  'ohne-hilfe': 'Löst ohne Hilfe',
  beherrscht: 'Sicher beherrscht',
  vergessen: 'Wieder vergessen',
};

export const STAGE_ORDER: Stage[] = ['neu', 'vergessen', 'eingefuehrt', 'mit-hilfe', 'ohne-hilfe', 'beherrscht'];

export interface SkillState {
  skill: string;
  attempts: number;
  correct: number;
  /** richtige Antworten ohne Tipps in Folge */
  streak: number;
  mastery: number;
  ease: number;
  intervalDays: number;
  /** Zeitpunkt (ms), ab dem eine Wiederholung fällig ist */
  due: number;
  lastSeen: number;
  lastCorrect: number;
  lessonDone: boolean;
  lapses: number;
  /** Tage (yyyy-mm-dd), an denen ohne Hilfe richtig gelöst wurde */
  successDays: string[];
  /** letzte Ergebnisse: 1 = richtig ohne Hilfe, 0.5 = mit Hilfe, 0 = falsch */
  recent: number[];
  /** Fehlerkategorien der letzten Versuche */
  recentErrors: string[];
  everMastered: boolean;
  stage: Stage;
}

export const DAY = 86_400_000;

export function newSkillState(skill: string): SkillState {
  return {
    skill, attempts: 0, correct: 0, streak: 0, mastery: 0, ease: 2.3, intervalDays: 0, due: 0, lastSeen: 0,
    lastCorrect: 0, lessonDone: false, lapses: 0, successDays: [], recent: [], recentErrors: [], everMastered: false, stage: 'neu',
  };
}

export interface Evidence {
  correct: boolean;
  /** Teilpunkte 0..1 */
  score: number;
  hintsUsed: number;
  difficulty: 1 | 2 | 3;
  errorTags: string[];
  /** Prüfungsmodus/Einstufung zählt als „ohne Hilfe“ */
  at: number;
  /** z. B. Einstufungstest: stärkere Gewichtung */
  weight?: number;
}

const dayKey = (t: number) => new Date(t).toISOString().slice(0, 10);

export function retention(s: SkillState, now: number): number {
  if (!s.lastCorrect) return s.attempts ? 1 : 0;
  const overdue = now - s.due;
  if (overdue <= 0) return 1;
  return Math.pow(0.5, overdue / DAY / Math.max(1, s.intervalDays));
}

/** Geschätzter aktueller Kenntnisstand 0..1. */
export function knowledge(s: SkillState, now: number): number {
  return Math.max(0, Math.min(1, s.mastery * retention(s, now)));
}

export function computeStage(s: SkillState, now: number): Stage {
  if (s.attempts === 0) return s.lessonDone ? 'eingefuehrt' : 'neu';
  const r = retention(s, now);
  if (s.everMastered && (r < 0.5 || (s.recent.length && s.recent[s.recent.length - 1] === 0 && s.mastery < 0.6))) return 'vergessen';
  if (s.mastery >= 0.85 && s.successDays.length >= 2 && s.intervalDays >= 6 && s.streak >= 2) return 'beherrscht';
  if (s.streak >= 2 && s.mastery >= 0.6) return 'ohne-hilfe';
  if (s.correct > 0 && s.mastery >= 0.3) return 'mit-hilfe';
  return 'eingefuehrt';
}

export function applyEvidence(prev: SkillState, ev: Evidence): SkillState {
  const s: SkillState = { ...prev, successDays: [...prev.successDays], recent: [...prev.recent], recentErrors: [...prev.recentErrors] };
  const w = ev.weight ?? 1;
  s.attempts++;
  s.lastSeen = ev.at;
  const assisted = ev.hintsUsed > 0;
  let outcome: number;
  if (ev.correct && !assisted) {
    outcome = 1;
    const alpha = Math.min(0.6, (0.25 + 0.05 * ev.difficulty) * w);
    s.mastery += alpha * (1 - s.mastery);
    s.correct++;
    s.streak++;
    s.lastCorrect = ev.at;
    s.ease = Math.min(3.0, s.ease + 0.1);
    s.intervalDays = s.intervalDays < 1 ? 1 : s.intervalDays < 3 ? 3 : Math.round(s.intervalDays * s.ease);
    const k = dayKey(ev.at);
    if (!s.successDays.includes(k)) s.successDays.push(k);
    if (s.successDays.length > 30) s.successDays.shift();
  } else if (ev.correct && assisted) {
    outcome = 0.5;
    s.mastery += 0.15 * w * (0.6 - s.mastery);
    s.correct++;
    s.streak = 0;
    s.lastCorrect = ev.at;
    s.ease = Math.max(1.3, s.ease - 0.05);
    s.intervalDays = Math.min(2, Math.max(1, s.intervalDays));
  } else {
    // teilweise richtig (Tabellen etc.) mildert den Abzug
    outcome = 0;
    const partial = Math.max(0, Math.min(0.9, ev.score));
    s.mastery += Math.min(0.6, 0.3 * w) * (partial * 0.5 - s.mastery) * (s.mastery > partial * 0.5 ? 1 : 0);
    s.streak = 0;
    if (s.intervalDays >= 3) s.lapses++;
    s.ease = Math.max(1.3, s.ease - 0.2);
    s.intervalDays = 0;
    s.recentErrors.push(...ev.errorTags);
  }
  s.mastery = Math.max(0, Math.min(1, s.mastery));
  s.recent.push(outcome);
  if (s.recent.length > 12) s.recent.shift();
  if (s.recentErrors.length > 20) s.recentErrors.splice(0, s.recentErrors.length - 20);
  // Fälligkeit: falsch → in 10 Minuten erneut; sonst nach Intervall
  s.due = ev.at + (s.intervalDays === 0 ? 10 * 60_000 : s.intervalDays * DAY);
  s.stage = computeStage(s, ev.at);
  if (s.stage === 'beherrscht') s.everMastered = true;
  return s;
}

export function markLessonDone(prev: SkillState, at: number): SkillState {
  const s = { ...prev, lessonDone: true };
  if (s.attempts === 0) s.due = at + DAY;
  s.stage = computeStage(s, at);
  return s;
}

/** Häufige Fehlerkategorien eines Skills (mind. 2× in den letzten Versuchen) → Nachhilfe nötig. */
export function recurringErrors(s: SkillState): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const t of s.recentErrors.slice(-10)) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()].filter(([, c]) => c >= 2).map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count);
}

/** Braucht der Skill eine gezielte Förderschleife? (≥ 2 Fehler in den letzten 4 Versuchen) */
export function needsRemediation(s: SkillState): boolean {
  const last = s.recent.slice(-4);
  return last.filter((x) => x === 0).length >= 2;
}

export function isDue(s: SkillState, now: number): boolean {
  return s.attempts > 0 && s.due <= now;
}

/** Schwierigkeitsstufe, die als Nächstes passt (adaptive Steigerung). */
export function nextDifficulty(s: SkillState | undefined): 1 | 2 | 3 {
  if (!s || s.attempts < 2 || s.mastery < 0.4 || needsRemediation(s)) return 1;
  if (s.mastery < 0.75 || s.streak < 3) return 2;
  return 3;
}
