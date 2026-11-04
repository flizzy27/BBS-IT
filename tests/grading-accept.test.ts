import { expect, it } from 'vitest';
import { grade } from '../src/core/grading';
import { QUESTION_MAP } from '../src/content';

it('Nutzwert: Dezimalfaktor und Prozentpunkte werden beide akzeptiert', () => {
  const q = QUESTION_MAP.get('w02-q016')!;
  expect(grade(q, '7,2').correct).toBe(true);
  expect(grade(q, '720').correct).toBe(true);
  expect(grade(q, '23').correct).toBe(false);
});
