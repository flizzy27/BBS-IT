import { describe, expect, it } from 'vitest';
import { buildQStat, countStatus, pushResult, readiness, roundQuestions, statusOf } from '../src/core/catalog';
import { save } from '../src/lib/localBackend';

describe('Fragenkatalog (Fahrschul-Prinzip)', () => {
  it('Status aus den letzten Antworten', () => {
    expect(statusOf(undefined)).toBe('neu');
    expect(statusOf('1')).toBe('einmal');
    expect(statusOf('0')).toBe('falsch');
    expect(statusOf('011')).toBe('sicher');
    expect(statusOf('110')).toBe('falsch');
    expect(statusOf('101')).toBe('einmal');
    expect(pushResult('111', false)).toBe('110');
  });

  it('baut Status chronologisch aus Versuchen', () => {
    const qs = buildQStat([
      { questionId: 'a', correct: true, ts: 3 },
      { questionId: 'a', correct: false, ts: 1 },
      { questionId: 'a', correct: true, ts: 2 },
      { questionId: 'b', correct: false, ts: 5 },
    ]);
    expect(qs).toEqual({ a: '011', b: '0' });
    expect(countStatus(['a', 'b', 'c'], qs)).toEqual({ neu: 1, falsch: 1, einmal: 0, sicher: 1 });
  });

  it('Lernrunde: falsche zuerst, dann neue, sichere nur bei „alle“', () => {
    const qs = { f: '0', e: '1', s: '11' };
    const ids = ['s', 'e', 'n', 'f'];
    expect(roundQuestions(ids, qs, 'offen', 10, () => 0.5)).toEqual(['f', 'n', 'e']);
    expect(roundQuestions(ids, qs, 'falsch', 10)).toEqual(['f']);
    expect(roundQuestions(ids, qs, 'neu', 10)).toEqual(['n']);
    expect(roundQuestions(ids, qs, 'alle', 10)).toHaveLength(4);
    expect(roundQuestions(ids, qs, 'offen', 2, () => 0.5)).toEqual(['f', 'n']);
  });

  it('Ampel', () => {
    expect(readiness(0.1).level).toBe('rot');
    expect(readiness(0.5).level).toBe('gelb');
    expect(readiness(0.8).level).toBe('gruen');
  });
});

describe('Browser-Speicher läuft nicht still voll', () => {
  it('kürzt alte Versuche, bis das Speichern klappt', async () => {
    const { localBackend } = await import('../src/lib/localBackend');
    for (let i = 0; i < 400; i++) await localBackend.addAttempt({ ts: i, questionId: 'q' + i, skill: 's', kind: 'number', mode: 'ueben', question: {} as never, response: 1, correct: true, score: 1, errorTags: [], hintsUsed: 0, durationMs: 1 }).catch(() => {});
    let stored = '';
    const quota = { setItem: (_k: string, v: string) => { if (v.length > 20_000) throw new Error('QuotaExceeded'); stored = v; } };
    save(quota);
    const d = JSON.parse(stored);
    expect(d.attempts.length).toBeGreaterThan(0);
    expect(d.attempts.length).toBeLessThan(400);
    expect(d.attempts[d.attempts.length - 1].questionId).toBe('q399'); // neueste bleiben
  });
});
