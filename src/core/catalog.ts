/**
 * Fragenkatalog nach dem Fahrschul-Prinzip: Jede Katalogfrage hat einen Status, der sich aus den
 * letzten Antworten ergibt. „Sicher“ = die letzten zwei Antworten waren richtig.
 * Gespeichert wird je Frage nur ein kurzer String der letzten Ergebnisse ("1" = richtig, "0" = falsch).
 */

export type QStatus = 'neu' | 'falsch' | 'einmal' | 'sicher';
export type QStatMap = Record<string, string>;

export const QSTATUS_LABEL: Record<QStatus, string> = {
  neu: 'Noch nicht beantwortet',
  falsch: 'Zuletzt falsch',
  einmal: '1× richtig',
  sicher: 'Sicher (2× hintereinander richtig)',
};

/** Hängt ein Ergebnis an (nur die letzten 3 werden behalten). */
export function pushResult(prev: string | undefined, correct: boolean): string {
  return ((prev ?? '') + (correct ? '1' : '0')).slice(-3);
}

export function statusOf(s: string | undefined): QStatus {
  if (!s) return 'neu';
  if (s.endsWith('0')) return 'falsch';
  return s.endsWith('11') ? 'sicher' : 'einmal';
}

/** Baut die Statusliste aus vorhandenen Versuchen (beliebige Reihenfolge). */
export function buildQStat(attempts: { questionId: string; correct: boolean; ts: number }[]): QStatMap {
  const m: QStatMap = {};
  for (const a of [...attempts].sort((x, y) => x.ts - y.ts)) m[a.questionId] = pushResult(m[a.questionId], a.correct);
  return m;
}

export function countStatus(ids: string[], qs: QStatMap): Record<QStatus, number> {
  const c: Record<QStatus, number> = { neu: 0, falsch: 0, einmal: 0, sicher: 0 };
  for (const id of ids) c[statusOf(qs[id])]++;
  return c;
}

export type RoundFilter = 'offen' | 'falsch' | 'neu' | 'alle';

/**
 * Fragen für eine Lernrunde: zuerst falsche, dann neue, dann 1× richtige (bei „offen“);
 * innerhalb jeder Gruppe zufällig. `rand` ist für Tests austauschbar.
 */
export function roundQuestions(ids: string[], qs: QStatMap, filter: RoundFilter, size: number, rand: () => number = Math.random): string[] {
  const rank: Record<QStatus, number> = { falsch: 0, neu: 1, einmal: 2, sicher: 3 };
  const allowed = (st: QStatus) =>
    filter === 'alle' ? true : filter === 'offen' ? st !== 'sicher' : st === filter;
  return ids
    .map((id) => ({ id, st: statusOf(qs[id]), r: rand() }))
    .filter((x) => allowed(x.st))
    .sort((a, b) => (filter === 'alle' ? a.r - b.r : rank[a.st] - rank[b.st] || a.r - b.r))
    .slice(0, size)
    .map((x) => x.id);
}

/** Ampel für die Prüfungsreife (Anteil sicherer Fragen). */
export function readiness(sicherShare: number): { level: 'rot' | 'gelb' | 'gruen'; text: string } {
  if (sicherShare >= 0.8) return { level: 'gruen', text: 'Prüfungsreif – jetzt regelmäßig die AP1-Simulation schreiben.' };
  if (sicherShare >= 0.4) return { level: 'gelb', text: 'Auf gutem Weg – arbeite die offenen und falschen Fragen ab.' };
  return { level: 'rot', text: 'Noch nicht prüfungsreif – lerne Thema für Thema und beantworte die Fragen.' };
}
