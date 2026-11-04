/**
 * Taschenrechner: wertet einen Ausdruck sicher aus (kein eval).
 * Erlaubt: Zahlen mit Komma oder Punkt, + − × ÷ (auch * / : x), ^, Klammern, %, √, Leerzeichen.
 * „50 + 10 %“ = 55 (wie beim Tischrechner); sonst ist „x %“ = x / 100.
 */
export function evaluate(input: string): number {
  const src = input
    .replace(/\s+/g, '')
    .replace(/[×xX*]/g, '*')
    .replace(/[÷:/]/g, '/')
    .replace(/[−–]/g, '-')
    .replace(/,/g, '.');
  let i = 0;
  const peek = () => src[i];
  const fail = (): never => { throw new Error('Ungültiger Ausdruck'); };

  // Summe: Prozent bezieht sich hier auf den bisherigen Wert (a + b % = a · (1 + b/100))
  function sum(): number {
    let v = product();
    while (peek() === '+' || peek() === '-') {
      const op = src[i++];
      const start = i;
      let r = product();
      if (isPlainPercent(start)) r = v * r; // r ist bereits b/100 → Anteil vom bisherigen Wert
      v = op === '+' ? v + r : v - r;
    }
    return v;
  }
  // true, wenn der rechte Operand nur „Zahl %“ ist (dann gilt Tischrechner-Logik)
  function isPlainPercent(start: number): boolean {
    return /^\d*\.?\d+%$/.test(src.slice(start, i));
  }
  function product(): number {
    let v = unary();
    while (peek() === '*' || peek() === '/') {
      const op = src[i++];
      const r = unary();
      if (op === '/' && r === 0) throw new Error('Division durch 0');
      v = op === '*' ? v * r : v / r;
    }
    return v;
  }
  // Vorzeichen bindet schwächer als die Potenz: −3² = −9
  function unary(): number {
    if (peek() === '-') { i++; return -unary(); }
    if (peek() === '+') { i++; return unary(); }
    if (peek() === '√') { i++; const v = unary(); if (v < 0) fail(); return Math.sqrt(v); }
    return power();
  }
  function power(): number {
    const b = postfix();
    if (peek() === '^') { i++; return b ** unary(); }
    return b;
  }
  function postfix(): number {
    let v = atom();
    while (peek() === '%' || peek() === '²') v = src[i++] === '%' ? v / 100 : v * v;
    return v;
  }
  function atom(): number {
    if (peek() === '(') {
      i++;
      const v = sum();
      if (peek() === ')') i++;
      return v; // fehlende schließende Klammer am Ende wird toleriert
    }
    const m = /^\d*\.?\d+(e[+-]?\d+)?|^\d+\./.exec(src.slice(i));
    if (!m) fail();
    i += m![0].length;
    return parseFloat(m![0]);
  }

  if (!src) return 0;
  const v = sum();
  if (i < src.length || !Number.isFinite(v)) fail();
  return v;
}

/** Deutsche Darstellung ohne Gleitkomma-Artefakte (0,1 + 0,2 = 0,3). */
export function formatResult(v: number): string {
  const r = Number.parseFloat(v.toPrecision(12));
  return r.toLocaleString('de-DE', { maximumFractionDigits: 10, useGrouping: true });
}
