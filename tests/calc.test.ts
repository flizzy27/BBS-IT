import { describe, expect, it } from 'vitest';
import { evaluate, formatResult } from '../src/core/calc';

describe('Taschenrechner', () => {
  it('Punkt vor Strich, Klammern, Potenz', () => {
    expect(evaluate('2+3*4')).toBe(14);
    expect(evaluate('(2+3)*4')).toBe(20);
    expect(evaluate('2^10')).toBe(1024);
    expect(evaluate('2^3^2')).toBe(512);
    expect(evaluate('-3^2')).toBe(-9);
    expect(evaluate('√16+3²')).toBe(13);
  });
  it('deutsche Schreibweise und Operatorzeichen', () => {
    expect(evaluate('1,5 × 4')).toBe(6);
    expect(evaluate('10 ÷ 4')).toBe(2.5);
    expect(evaluate('7 − 2')).toBe(5);
    expect(formatResult(evaluate('0,1+0,2'))).toBe('0,3');
    expect(formatResult(1234567.5)).toBe('1.234.567,5');
  });
  it('Prozent wie am Tischrechner', () => {
    expect(evaluate('200+19%')).toBeCloseTo(238);
    expect(evaluate('200-10%')).toBeCloseTo(180);
    expect(evaluate('19%*200')).toBeCloseTo(38);
    expect(evaluate('50%')).toBe(0.5);
  });
  it('Fehler', () => {
    expect(() => evaluate('1/0')).toThrow();
    expect(() => evaluate('2+*3')).toThrow();
    expect(() => evaluate('abc')).toThrow();
    expect(evaluate('(1+2')).toBe(3);
    expect(evaluate('')).toBe(0);
  });
});
