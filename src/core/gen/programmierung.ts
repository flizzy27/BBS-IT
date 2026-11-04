/**
 * Aufgaben-Generatoren für den Fachbereich „Programmierung & Softwareentwicklung“ (Module p01–p05).
 *
 * Jede Aufgabe enthält ein kleines Pseudocode-Programm im Stil der Module (deutsche Schlüsselwörter,
 * Zuweisung mit ←, Arrays 0-basiert). Das Ergebnis wird hier direkt in JavaScript simuliert;
 * der Lösungsweg zeigt einen vollständigen Schreibtischtest (Trace-Tabelle).
 */
import type { Difficulty, Question, TableQuestion } from '../../content/types';
import type { GeneratorMeta } from '../generators';
import { Rng } from '../rng';

let counter = 0;
const gid = (g: string) => `gen:${g}:${Date.now().toString(36)}${(counter++).toString(36)}`;

/** Zahl in deutscher Schreibweise (Komma), ohne Rundungsartefakte. */
const de = (n: number) => (Number.isInteger(n) ? String(n) : String(+n.toFixed(10)).replace('.', ','));
const wf = (b: boolean) => (b ? 'WAHR' : 'FALSCH');
const fence = (lines: string[]) => '```\n' + lines.join('\n') + '\n```';
const table = (head: string[], rows: (string | number)[][]) =>
  `| ${head.join(' | ')} |\n|${head.map(() => '---').join('|')}|\n` +
  rows.map((r) => `| ${r.map((c) => (typeof c === 'number' ? de(c) : c)).join(' | ')} |`).join('\n');

type Mc = { answer: string; error: string; why: string };
/** Fehlbilder ohne Duplikate und ohne die richtige Antwort. */
const mcFilter = (correct: string | number, mcs: Mc[]): Mc[] =>
  mcs.filter((m, i) => m.answer !== String(correct) && mcs.findIndex((x) => x.answer === m.answer) === i);

const arrStr = (a: number[]) => `[${a.join(', ')}]`;
/** verschiedene Schreibweisen einer Zahlenliste akzeptieren */
const listAccept = (a: number[]) => {
  const s = a.map(String);
  const forms = [s.join(', '), s.join(','), s.join(' '), s.join('; '), s.join(';'), s.join(' | ')];
  return [...forms, ...forms.map((f) => `[${f}]`)];
};

function distinctInts(rng: Rng, n: number, min: number, max: number): number[] {
  const set = new Set<number>();
  while (set.size < n) set.add(rng.int(min, max));
  return rng.shuffle([...set]);
}

/* ------------------------------------------------------------------ */
/* p01: MOD / DIV / Operator-Rangfolge                                  */
/* ------------------------------------------------------------------ */

const arith: GeneratorMeta = {
  id: 'p.arith',
  title: 'Ausdrücke mit MOD, DIV und Rangfolge auswerten',
  skill: 'prog.operators',
  module: 'p01',
  make(rng, d) {
    const conv = '*Konvention:* `DIV` = ganzzahlige Division (Nachkommastellen werden abgeschnitten), `MOD` = Rest der ganzzahligen Division. Punktrechnung (`*`, `/`, `DIV`, `MOD`) vor Strichrechnung, Gleichrangiges von links nach rechts.';
    if (d === 1) {
      const b = rng.int(2, 9);
      let a = rng.int(11, 99);
      while (a % b === 0) a = rng.int(11, 99);
      const q = Math.trunc(a / b);
      const r = a % b;
      const op = rng.pick(['MOD', 'DIV'] as const);
      const ans = op === 'MOD' ? r : q;
      const mcs: Mc[] =
        op === 'MOD'
          ? [{ answer: String(q), error: 'mod-div-verwechselt', why: `${q} ist der ganzzahlige Quotient (\`DIV\`). \`MOD\` liefert den **Rest**: ${a} − ${q} · ${b} = ${r}.` }]
          : [
              { answer: String(r), error: 'mod-div-verwechselt', why: `${r} ist der Rest (\`MOD\`). \`DIV\` liefert, **wie oft** ${b} ganz in ${a} passt: ${q}.` },
              { answer: String(Math.round(a / b)), error: 'div-gerundet', why: `\`DIV\` rundet nicht kaufmännisch, sondern schneidet die Nachkommastellen ab: ${a} / ${b} = ${de(+(a / b).toFixed(4))}… → ${q}.` },
            ];
      return {
        id: gid('p.arith'), generated: true, kind: 'number', skill: 'prog.operators', difficulty: d,
        prompt: `Welchen Wert hat \`x\` nach Ausführung der Anweisung?\n\n${fence([`x ← ${a} ${op} ${b}`])}\n\n${conv}`,
        answer: ans,
        hints: [`Wie oft passt ${b} vollständig in ${a}?`, op === 'MOD' ? 'Der Rest ist das, was danach übrig bleibt.' : 'Nur der ganzzahlige Anteil zählt.'],
        misconceptions: mcFilter(ans, mcs),
        explanation: `${a} : ${b} = **${q} Rest ${r}**, denn ${q} · ${b} = ${q * b} und ${a} − ${q * b} = ${r}.\n\n- \`${a} DIV ${b}\` = ${q}\n- \`${a} MOD ${b}\` = ${r}\n\n→ \`x\` = **${ans}**`,
      };
    }
    if (d === 2) {
      const t = rng.int(1, 4);
      const a = rng.int(2, 20);
      const b = rng.int(10, 60);
      const c = rng.int(3, 9);
      let expr: string, ans: number, wrong: number, way: string, wrongWhy: string;
      if (t === 1) {
        expr = `${a} + ${b} MOD ${c}`;
        ans = a + (b % c);
        wrong = (a + b) % c;
        way = `\`MOD\` ist Punktrechnung und wird zuerst ausgewertet: ${b} MOD ${c} = ${b % c}. Dann ${a} + ${b % c} = **${ans}**.`;
        wrongWhy = `Du hast zuerst addiert ((${a} + ${b}) MOD ${c}). \`MOD\` bindet aber stärker als \`+\`.`;
      } else if (t === 2) {
        expr = `(${a} + ${b}) DIV ${c}`;
        ans = Math.trunc((a + b) / c);
        wrong = a + Math.trunc(b / c);
        way = `Die Klammer zuerst: ${a} + ${b} = ${a + b}. Dann ${a + b} DIV ${c} = **${ans}** (${a + b} : ${c} = ${ans} Rest ${(a + b) % c}).`;
        wrongWhy = 'Du hast die Klammer ignoriert und nur b DIV c gerechnet. Klammern werden immer zuerst ausgewertet.';
      } else if (t === 3) {
        expr = `${a} * ${b} MOD ${c}`;
        ans = (a * b) % c;
        wrong = a * (b % c);
        way = `\`*\` und \`MOD\` sind gleichrangig → von links nach rechts: ${a} * ${b} = ${a * b}, dann ${a * b} MOD ${c} = **${ans}**.`;
        wrongWhy = `Du hast zuerst ${b} MOD ${c} gerechnet. Gleichrangige Operatoren werden aber von links nach rechts ausgewertet.`;
      } else {
        const aa = a + 40;
        expr = `${aa} - ${b} DIV ${c}`;
        ans = aa - Math.trunc(b / c);
        wrong = Math.trunc((aa - b) / c);
        way = `\`DIV\` ist Punktrechnung: ${b} DIV ${c} = ${Math.trunc(b / c)}. Dann ${aa} − ${Math.trunc(b / c)} = **${ans}**.`;
        wrongWhy = `Du hast zuerst subtrahiert ((${aa} − ${b}) DIV ${c}). \`DIV\` bindet stärker als \`-\`.`;
      }
      return {
        id: gid('p.arith'), generated: true, kind: 'number', skill: 'prog.operators', difficulty: d,
        prompt: `Welchen Wert hat \`x\`?\n\n${fence([`x ← ${expr}`])}\n\n${conv}`,
        answer: ans,
        hints: ['Prüfe zuerst, welcher Operator Vorrang hat.', 'Klammern > Punktrechnung (*, /, DIV, MOD) > Strichrechnung (+, −).'],
        misconceptions: mcFilter(ans, [{ answer: String(wrong), error: 'operator-rangfolge', why: wrongWhy }]),
        explanation: way,
      };
    }
    // d === 3: Anwendungsszenarien
    const s = rng.int(1, 3);
    if (s === 1) {
      const n = rng.int(3700, 86000);
      const h = Math.trunc(n / 3600);
      const rest = n % 3600;
      const min = Math.trunc(rest / 60);
      const sek = rest % 60;
      const askMin = rng.bool();
      const ans = askMin ? min : sek;
      const mcs: Mc[] = askMin
        ? [{ answer: String(Math.trunc(n / 60)), error: 'mod-rest-vergessen', why: `Das sind **alle** Minuten (${n} DIV 60). Die vollen Stunden wurden vorher schon abgezogen – gerechnet wird mit \`rest\` = ${rest}.` }]
        : [{ answer: String(rest), error: 'mod-rest-vergessen', why: `${rest} ist der Rest nach den Stunden. Davon müssen noch die vollen Minuten abgezogen werden: ${rest} MOD 60 = ${sek}.` }];
      return {
        id: gid('p.arith'), generated: true, kind: 'number', skill: 'prog.operators', difficulty: d,
        prompt: `Ein Zeiterfassungsprogramm der Elektro Krämer GmbH wandelt eine Dauer in Sekunden in Stunden, Minuten und Sekunden um. Welcher Wert wird für **${askMin ? 'minuten' : 'sek'}** ausgegeben?\n\n${fence([`sekunden ← ${n}`, 'stunden ← sekunden DIV 3600', 'rest ← sekunden MOD 3600', 'minuten ← rest DIV 60', 'sek ← rest MOD 60', 'AUSGABE stunden, minuten, sek'])}\n\n${conv}`,
        answer: ans,
        hints: ['Rechne Zeile für Zeile und notiere jeden Variablenwert.', '1 Stunde = 3600 Sekunden, 1 Minute = 60 Sekunden.'],
        misconceptions: mcFilter(ans, mcs),
        explanation: table(['Zeile', 'Rechnung', 'Wert'], [['sekunden', '–', n], ['stunden', `${n} DIV 3600`, h], ['rest', `${n} MOD 3600`, rest], ['minuten', `${rest} DIV 60`, min], ['sek', `${rest} MOD 60`, sek]]) + `\n\nAusgabe: ${h} ${min} ${sek} → gesucht **${ans}**.\n\nProbe: ${h} · 3600 + ${min} · 60 + ${sek} = ${h * 3600 + min * 60 + sek} ✔`,
      };
    }
    if (s === 2) {
      const p = rng.pick([6, 8, 12, 15, 20, 24]);
      let n = rng.int(40, 400);
      if (n % p === 0) n += rng.int(1, p - 1);
      const full = Math.trunc(n / p);
      const ans = full + 1;
      return {
        id: gid('p.arith'), generated: true, kind: 'number', skill: 'prog.operators', difficulty: d,
        prompt: `Das Lager der Elektro Krämer GmbH verschickt **${n} Kartons**, auf eine Palette passen **${p} Kartons**. Welchen Wert gibt das Programm aus?\n\n${fence([`kartons ← ${n}`, `proPalette ← ${p}`, 'paletten ← kartons DIV proPalette', 'WENN kartons MOD proPalette > 0 DANN', '  paletten ← paletten + 1', 'ENDE WENN', 'AUSGABE paletten'])}\n\n${conv}`,
        answer: ans,
        hints: ['Wie viele volle Paletten gibt es?', 'Bleibt ein Rest, braucht man eine weitere (angebrochene) Palette.'],
        misconceptions: mcFilter(ans, [
          { answer: String(full), error: 'mod-rest-vergessen', why: `${full} sind nur die **vollen** Paletten. Weil ${n} MOD ${p} = ${n % p} > 0 ist, kommt eine angebrochene Palette dazu.` },
          { answer: String(Math.round(n / p)), error: 'div-gerundet', why: '`DIV` rundet nicht – es schneidet ab. Danach entscheidet die WENN-Abfrage über die zusätzliche Palette.' },
        ]),
        explanation: `${table(['Variable', 'Rechnung', 'Wert'], [['paletten', `${n} DIV ${p}`, full], ['Rest', `${n} MOD ${p}`, n % p], ['Bedingung', `${n % p} > 0`, 'WAHR'], ['paletten', `${full} + 1`, ans]])}\n\nAusgabe: **${ans}** – das ist das Aufrunden mit DIV und MOD.`,
      };
    }
    const z = rng.int(1000, 9999);
    const pos = rng.pick([['zehner', 10], ['hunderter', 100]] as const);
    const ans = Math.trunc(z / pos[1]) % 10;
    return {
      id: gid('p.arith'), generated: true, kind: 'number', skill: 'prog.operators', difficulty: d,
      prompt: `Welchen Wert hat \`${pos[0]}\` nach Ausführung?\n\n${fence([`zahl ← ${z}`, `${pos[0]} ← (zahl DIV ${pos[1]}) MOD 10`])}\n\n${conv}`,
      answer: ans,
      hints: [`Rechne zuerst die Klammer: ${z} DIV ${pos[1]}.`, 'MOD 10 liefert immer die letzte Ziffer einer Zahl.'],
      misconceptions: mcFilter(ans, [{ answer: String(Math.trunc(z / pos[1])), error: 'mod-rest-vergessen', why: `Das ist nur ${z} DIV ${pos[1]}. Das anschließende MOD 10 schneidet davon die letzte Ziffer ab.` }]),
      explanation: `1. Klammer: ${z} DIV ${pos[1]} = ${Math.trunc(z / pos[1])} (die letzten ${pos[1] === 10 ? 'Ziffer fällt' : 'zwei Ziffern fallen'} weg).\n2. ${Math.trunc(z / pos[1])} MOD 10 = **${ans}** (letzte Ziffer).\n\n→ Die ${pos[0]}-Ziffer von ${z} ist **${ans}**.`,
    };
  },
};

/* ------------------------------------------------------------------ */
/* p01: Wahrheitstabellen                                              */
/* ------------------------------------------------------------------ */

type BoolFn = (A: boolean, B: boolean, C: boolean) => boolean;
interface LogicTpl {
  expr: string;
  vars: 2 | 3;
  f: BoolFn;
  steps: { label: string; f: BoolFn }[];
  alt?: { f: BoolFn; error: string; why: string };
}

const LOGIC: Record<Difficulty, LogicTpl[]> = {
  1: [
    { expr: 'A UND B', vars: 2, f: (A, B) => A && B, steps: [] },
    { expr: 'A ODER B', vars: 2, f: (A, B) => A || B, steps: [], alt: { f: (A, B) => A !== B, error: 'logik-oder-exklusiv', why: 'ODER ist **einschließend**: Es ist auch WAHR, wenn beide Operanden WAHR sind (kein Entweder-oder).' } },
    { expr: 'NICHT A ODER B', vars: 2, f: (A, B) => !A || B, steps: [{ label: 'NICHT A', f: (A) => !A }], alt: { f: (A, B) => !(A || B), error: 'logik-nicht-bereich', why: 'NICHT bezieht sich nur auf A, nicht auf den ganzen Ausdruck A ODER B.' } },
    { expr: 'A UND NICHT B', vars: 2, f: (A, B) => A && !B, steps: [{ label: 'NICHT B', f: (_A, B) => !B }] },
    { expr: 'NICHT (A UND B)', vars: 2, f: (A, B) => !(A && B), steps: [{ label: 'A UND B', f: (A, B) => A && B }], alt: { f: (A, B) => !A && !B, error: 'logik-demorgan', why: 'NICHT (A UND B) ist gleich NICHT A **ODER** NICHT B (De Morgan) – nicht NICHT A UND NICHT B.' } },
    { expr: 'NICHT (A ODER B)', vars: 2, f: (A, B) => !(A || B), steps: [{ label: 'A ODER B', f: (A, B) => A || B }], alt: { f: (A, B) => !A || !B, error: 'logik-demorgan', why: 'NICHT (A ODER B) ist gleich NICHT A **UND** NICHT B (De Morgan).' } },
  ],
  2: [
    { expr: '(A UND B) ODER C', vars: 3, f: (A, B, C) => (A && B) || C, steps: [{ label: 'A UND B', f: (A, B) => A && B }] },
    { expr: 'A UND (B ODER C)', vars: 3, f: (A, B, C) => A && (B || C), steps: [{ label: 'B ODER C', f: (_A, B, C) => B || C }], alt: { f: (A, B, C) => (A && B) || C, error: 'logik-rangfolge', why: 'Die Klammer erzwingt, dass zuerst B ODER C ausgewertet wird; A muss in jedem Fall WAHR sein.' } },
    { expr: '(A ODER B) UND NICHT C', vars: 3, f: (A, B, C) => (A || B) && !C, steps: [{ label: 'A ODER B', f: (A, B) => A || B }, { label: 'NICHT C', f: (_A, _B, C) => !C }] },
    { expr: 'NICHT A UND (B ODER C)', vars: 3, f: (A, B, C) => !A && (B || C), steps: [{ label: 'NICHT A', f: (A) => !A }, { label: 'B ODER C', f: (_A, B, C) => B || C }], alt: { f: (A, B, C) => !(A && (B || C)), error: 'logik-nicht-bereich', why: 'NICHT bezieht sich nur auf A (ohne Klammer um den ganzen Ausdruck).' } },
    { expr: '(A UND NICHT B) ODER (B UND C)', vars: 3, f: (A, B, C) => (A && !B) || (B && C), steps: [{ label: 'A UND NICHT B', f: (A, B) => A && !B }, { label: 'B UND C', f: (_A, B, C) => B && C }] },
  ],
  3: [
    { expr: 'A ODER B UND C', vars: 3, f: (A, B, C) => A || (B && C), steps: [{ label: 'B UND C', f: (_A, B, C) => B && C }], alt: { f: (A, B, C) => (A || B) && C, error: 'logik-rangfolge', why: 'UND bindet stärker als ODER (wie Punkt- vor Strichrechnung): A ODER (B UND C) – nicht (A ODER B) UND C.' } },
    { expr: 'NICHT A UND B ODER C', vars: 3, f: (A, B, C) => (!A && B) || C, steps: [{ label: 'NICHT A', f: (A) => !A }, { label: 'NICHT A UND B', f: (A, B) => !A && B }], alt: { f: (A, B, C) => !A && (B || C), error: 'logik-rangfolge', why: 'Rangfolge: NICHT vor UND vor ODER → (NICHT A UND B) ODER C.' } },
    { expr: 'NICHT (A UND B) ODER NICHT C', vars: 3, f: (A, B, C) => !(A && B) || !C, steps: [{ label: 'A UND B', f: (A, B) => A && B }, { label: 'NICHT (A UND B)', f: (A, B) => !(A && B) }, { label: 'NICHT C', f: (_A, _B, C) => !C }] },
    { expr: '(A ODER NICHT B) UND (NICHT A ODER C)', vars: 3, f: (A, B, C) => (A || !B) && (!A || C), steps: [{ label: 'A ODER NICHT B', f: (A, B) => A || !B }, { label: 'NICHT A ODER C', f: (A, _B, C) => !A || C }] },
    { expr: 'A UND B ODER NICHT A UND C', vars: 3, f: (A, B, C) => (A && B) || (!A && C), steps: [{ label: 'A UND B', f: (A, B) => A && B }, { label: 'NICHT A UND C', f: (A, _B, C) => !A && C }], alt: { f: (A, B, C) => ((A && B) || !A) && C, error: 'logik-rangfolge', why: 'UND bindet stärker als ODER: (A UND B) ODER ((NICHT A) UND C).' } },
  ],
};

const b01 = (b: boolean) => (b ? '1' : '0');
const accept01 = (b: boolean) => (b ? ['wahr', 'w', 'true', 'ja'] : ['falsch', 'f', 'false', 'nein']);

const logicGen: GeneratorMeta = {
  id: 'p.logic',
  title: 'Wahrheitstabelle ausfüllen',
  skill: 'prog.logic',
  module: 'p01',
  make(rng, d) {
    const t = rng.pick(LOGIC[d]);
    const names = t.vars === 2 ? ['A', 'B'] : ['A', 'B', 'C'];
    const n = 2 ** t.vars;
    const combos: boolean[][] = Array.from({ length: n }, (_, i) => names.map((_, j) => ((i >> (t.vars - 1 - j)) & 1) === 1));
    const ev = (c: boolean[], f: BoolFn) => f(c[0], c[1], c[2] ?? false);
    const misconceptions: { answer: string; error: string; why: string; cell: string }[] = [];
    combos.forEach((c, ri) => {
      if (t.alt && ev(c, t.alt.f) !== ev(c, t.f)) misconceptions.push({ cell: `${ri}:erg`, answer: b01(ev(c, t.alt.f)), error: t.alt.error, why: t.alt.why });
    });
    const q: TableQuestion = {
      id: gid('p.logic'), generated: true, kind: 'table', skill: 'prog.logic', difficulty: d,
      prompt: `Vervollständige die Wahrheitstabelle für den Ausdruck\n\n**\`${t.expr}\`**\n\nTrage **1** für WAHR und **0** für FALSCH ein. Rangfolge: Klammern vor NICHT vor UND vor ODER.`,
      columns: [...names.map((nm) => ({ key: nm, label: nm, type: 'text' as const })), { key: 'erg', label: t.expr, type: 'text' as const }],
      rows: combos.map((c) => ({
        cells: {
          ...Object.fromEntries(names.map((nm, j) => [nm, { given: b01(c[j]) }])),
          erg: { answer: b01(ev(c, t.f)), accept: accept01(ev(c, t.f)) },
        },
      })),
      misconceptions,
      hints: ['Bilde zuerst Hilfsspalten für die Teilausdrücke (z. B. NICHT A oder die Klammer).', 'UND ist nur WAHR, wenn beide Seiten WAHR sind; ODER ist WAHR, sobald mindestens eine Seite WAHR ist.'],
      explanation:
        `Mit Hilfsspalten Schritt für Schritt:\n\n` +
        table(
          [...names, ...t.steps.map((s) => s.label), `**${t.expr}**`],
          combos.map((c) => [...c.map(b01), ...t.steps.map((s) => b01(ev(c, s.f))), `**${b01(ev(c, t.f))}**`]),
        ) +
        `\n\nMerke: **UND** → nur 1, wenn beide 1 sind. **ODER** → 1, sobald mindestens einer 1 ist. **NICHT** dreht den Wert um.`,
    };
    return q;
  },
};

/* ------------------------------------------------------------------ */
/* p02: Schleifen – Schreibtischtest                                    */
/* ------------------------------------------------------------------ */

const traceLoop: GeneratorMeta = {
  id: 'p.trace.loop',
  title: 'Schreibtischtest: Schleifen',
  skill: 'prog.trace',
  module: 'p02',
  make(rng, d) {
    const base = { generated: true as const, kind: 'number' as const, skill: 'prog.trace', difficulty: d };
    const hintsLoop = ['Lege eine Trace-Tabelle an: eine Spalte pro Variable, eine Zeile pro Schleifendurchlauf.', 'Prüfe die Schleifenbedingung vor (kopfgesteuert) bzw. nach (fußgesteuert) jedem Durchlauf.'];
    const pick = d === 1 ? rng.int(1, 3) : d === 2 ? rng.int(4, 6) : rng.int(7, 10);

    if (pick === 1) {
      const n = rng.int(4, 7);
      const k = rng.int(1, 3);
      const rows: (string | number)[][] = [['Start', '–', 0]];
      let summe = 0;
      for (let i = 1; i <= n; i++) {
        summe += i * k;
        rows.push([`${i}. Durchlauf`, i, summe]);
      }
      const prev = summe - n * k;
      const line = k === 1 ? '  summe ← summe + i' : `  summe ← summe + i * ${k}`;
      return {
        ...base, id: gid('p.trace.loop'),
        prompt: `Welchen Wert gibt der Algorithmus aus?\n\n${fence(['summe ← 0', `FÜR i VON 1 BIS ${n}`, line, 'ENDE FÜR', 'AUSGABE summe'])}`,
        answer: summe,
        hints: hintsLoop,
        misconceptions: mcFilter(summe, [
          { answer: String(prev), error: 'schleife-off-by-one', why: `Das ist der Wert nach ${n - 1} Durchläufen. „FÜR i VON 1 BIS ${n}“ schließt ${n} **mit ein**.` },
          { answer: String(summe + (n + 1) * k), error: 'schleife-off-by-one', why: `Die Schleife läuft nur bis einschließlich ${n}, nicht bis ${n + 1}.` },
          { answer: String(n * k), error: 'akkumulator-ueberschrieben', why: 'Das ist nur der Summand des letzten Durchlaufs. `summe ← summe + …` addiert zum **bisherigen** Wert.' },
        ]),
        explanation: `Trace-Tabelle:\n\n${table(['Schritt', 'i', 'summe'], rows)}\n\nAusgabe: **${summe}**`,
      };
    }
    if (pick === 2) {
      const von = rng.int(0, 5);
      const bis = von + rng.int(4, 12);
      const anz = bis - von + 1;
      return {
        ...base, id: gid('p.trace.loop'),
        prompt: `Wie oft wird der Schleifenrumpf ausgeführt, d. h. welchen Wert gibt der Algorithmus aus?\n\n${fence(['zaehler ← 0', `FÜR i VON ${von} BIS ${bis}`, '  zaehler ← zaehler + 1', 'ENDE FÜR', 'AUSGABE zaehler'])}`,
        answer: anz,
        hints: ['Start- **und** Endwert gehören bei FÜR … VON … BIS dazu.', 'Anzahl = Endwert − Startwert + 1.'],
        misconceptions: mcFilter(anz, [{ answer: String(bis - von), error: 'schleife-off-by-one', why: `${bis} − ${von} = ${bis - von} zählt einen Wert zu wenig: Start und Ende sind beide enthalten → + 1.` }, { answer: String(bis), error: 'schleife-off-by-one', why: `Die Schleife beginnt nicht bei 1, sondern bei ${von}.` }]),
        explanation: `i nimmt die Werte ${von}, ${von + 1}, …, ${bis} an. Anzahl: ${bis} − ${von} + 1 = **${anz}**.\n\n${table(['i', 'zaehler danach'], Array.from({ length: anz }, (_, j) => [von + j, j + 1]))}`,
      };
    }
    if (pick === 3) {
      const f = rng.int(2, 3);
      const n = rng.int(3, f === 2 ? 6 : 4);
      const rows: (string | number)[][] = [['Start', '–', 1]];
      let p = 1;
      for (let i = 1; i <= n; i++) {
        p *= f;
        rows.push([`${i}. Durchlauf`, i, p]);
      }
      return {
        ...base, id: gid('p.trace.loop'),
        prompt: `Welchen Wert hat \`produkt\` am Ende?\n\n${fence(['produkt ← 1', `FÜR i VON 1 BIS ${n}`, `  produkt ← produkt * ${f}`, 'ENDE FÜR'])}`,
        answer: p,
        hints: hintsLoop,
        misconceptions: mcFilter(p, [
          { answer: String(p / f), error: 'schleife-off-by-one', why: `Das ist der Wert nach ${n - 1} Durchläufen – es sind aber ${n}.` },
          { answer: String(f * n), error: 'produkt-als-summe', why: `Du hast ${f} · ${n} gerechnet. Die Schleife multipliziert ${n}-mal mit ${f} → ${f}^${n}.` },
        ]),
        explanation: `${table(['Schritt', 'i', 'produkt'], rows)}\n\nErgebnis: ${f}^${n} = **${p}**`,
      };
    }
    if (pick === 4) {
      const start = rng.int(1, 5);
      const limit = rng.int(20, 200);
      let x = start;
      let z = 0;
      const rows: (string | number)[][] = [['Start', x, z, wf(x < limit)]];
      while (x < limit) {
        x *= 2;
        z++;
        rows.push([`${z}. Durchlauf`, x, z, wf(x < limit)]);
      }
      const askX = rng.bool();
      const ans = askX ? x : z;
      return {
        ...base, id: gid('p.trace.loop'),
        prompt: `Welchen Wert hat **\`${askX ? 'x' : 'z'}\`** nach Ende der Schleife?\n\n${fence([`x ← ${start}`, 'z ← 0', `SOLANGE x < ${limit} TUE`, '  x ← x * 2', '  z ← z + 1', 'ENDE SOLANGE', 'AUSGABE x, z'])}`,
        answer: ans,
        hints: hintsLoop,
        misconceptions: mcFilter(
          ans,
          askX
            ? [{ answer: String(x / 2), error: 'schleife-abbruch', why: `${x / 2} ist noch < ${limit}, also läuft die Schleife noch einmal. Sie endet erst, wenn die Bedingung FALSCH ist.` }]
            : [
                { answer: String(z - 1), error: 'schleife-off-by-one', why: 'Ein Durchlauf fehlt – der letzte Durchlauf, der x über die Grenze hebt, zählt mit.' },
                { answer: String(z + 1), error: 'schleife-off-by-one', why: 'Nach dem letzten Durchlauf ist die Bedingung FALSCH; es folgt kein weiterer Durchlauf.' },
              ],
        ),
        explanation: `${table(['Schritt', 'x', 'z', `x < ${limit}?`], rows)}\n\nDie Bedingung wird **vor** jedem Durchlauf geprüft (kopfgesteuert). Ende bei x = ${x}, z = ${z} → gesucht **${ans}**.`,
      };
    }
    if (pick === 5) {
      const n = rng.int(6, 12);
      const m = rng.int(2, 4);
      let summe = 0;
      let anzahl = 0;
      const rows: (string | number)[][] = [];
      for (let i = 1; i <= n; i++) {
        if (i % m === 0) summe += i;
        else anzahl++;
        rows.push([i, i % m, wf(i % m === 0), summe, anzahl]);
      }
      const askSum = rng.bool();
      const ans = askSum ? summe : anzahl;
      return {
        ...base, id: gid('p.trace.loop'),
        prompt: `Welchen Wert hat **\`${askSum ? 'summe' : 'anzahl'}\`** nach Ausführung?\n\n${fence(['summe ← 0', 'anzahl ← 0', `FÜR i VON 1 BIS ${n}`, `  WENN i MOD ${m} = 0 DANN`, '    summe ← summe + i', '  SONST', '    anzahl ← anzahl + 1', '  ENDE WENN', 'ENDE FÜR', 'AUSGABE summe, anzahl'])}`,
        answer: ans,
        hints: [`i MOD ${m} = 0 bedeutet: i ist durch ${m} teilbar.`, ...hintsLoop],
        misconceptions: mcFilter(
          ans,
          askSum
            ? [{ answer: String((n * (n + 1)) / 2), error: 'bedingung-ignoriert', why: `Das ist die Summe aller Zahlen 1 bis ${n}. Addiert werden nur die Vielfachen von ${m}.` }, { answer: String(Math.trunc(n / m)), error: 'zaehlen-statt-summieren', why: 'Das ist die **Anzahl** der Vielfachen. Summiert werden die Werte von i.' }]
            : [{ answer: String(n - anzahl), error: 'zweig-verwechselt', why: `Das ist die Anzahl der Vielfachen von ${m}. \`anzahl\` wird im SONST-Zweig erhöht.` }],
        ),
        explanation: `${table(['i', `i MOD ${m}`, `= 0?`, 'summe', 'anzahl'], rows)}\n\n→ summe = ${summe}, anzahl = ${anzahl}. Gesucht: **${ans}**.`,
      };
    }
    if (pick === 6) {
      const a = rng.int(18, 30);
      const b = rng.int(0, 5);
      const k = rng.int(2, 4);
      let summe = 0;
      let z = 0;
      const rows: (string | number)[][] = [];
      for (let i = a; i >= b; i -= k) {
        summe += i;
        z++;
        rows.push([z, i, summe]);
      }
      const askSum = rng.bool();
      const ans = askSum ? summe : z;
      const last = a - (z - 1) * k;
      return {
        ...base, id: gid('p.trace.loop'),
        prompt: `Die Schleife zählt rückwärts. Welchen Wert hat **\`${askSum ? 'summe' : 'durchlaeufe'}\`** am Ende?\n\n${fence(['summe ← 0', 'durchlaeufe ← 0', `FÜR i VON ${a} BIS ${b} SCHRITT -${k}`, '  summe ← summe + i', '  durchlaeufe ← durchlaeufe + 1', 'ENDE FÜR'])}`,
        answer: ans,
        hints: [`i startet bei ${a} und wird jeweils um ${k} kleiner, solange i ≥ ${b} ist.`, ...hintsLoop],
        misconceptions: mcFilter(ans, askSum ? [{ answer: String(summe - last), error: 'schleife-off-by-one', why: `Der letzte Wert i = ${last} ist noch ≥ ${b} und wird mitgezählt.` }] : [{ answer: String(z - 1), error: 'schleife-off-by-one', why: `Auch i = ${last} (≥ ${b}) führt noch zu einem Durchlauf.` }, { answer: String(Math.trunc((a - b) / k)), error: 'schleife-off-by-one', why: 'Der erste Durchlauf mit i = Startwert zählt mit (+1).' }]),
        explanation: `${table(['Durchlauf', 'i', 'summe'], rows)}\n\nNächster Wert wäre i = ${last - k} < ${b} → Ende. durchlaeufe = ${z}, summe = ${summe}. Gesucht: **${ans}**.`,
      };
    }
    if (pick === 7) {
      const N = rng.int(d === 3 ? 100 : 10, 99999);
      let zahl = N;
      let q = 0;
      const rows: (string | number)[][] = [['Start', N, '–', 0]];
      const digits: number[] = [];
      while (zahl > 0) {
        const r = zahl % 10;
        digits.push(r);
        q += r;
        zahl = Math.trunc(zahl / 10);
        rows.push([`${digits.length}. Durchlauf`, zahl, r, q]);
      }
      return {
        ...base, id: gid('p.trace.loop'),
        prompt: `Welchen Wert gibt der Algorithmus aus?\n\n${fence([`zahl ← ${N}`, 'q ← 0', 'SOLANGE zahl > 0 TUE', '  q ← q + zahl MOD 10', '  zahl ← zahl DIV 10', 'ENDE SOLANGE', 'AUSGABE q'])}\n\n*\`DIV\` = ganzzahlige Division, \`MOD\` = Rest.*`,
        answer: q,
        hints: ['zahl MOD 10 liefert die letzte Ziffer, zahl DIV 10 streicht sie.', ...hintsLoop],
        misconceptions: mcFilter(q, [{ answer: String(q - digits[digits.length - 1]), error: 'schleife-abbruch', why: `Die Schleife läuft auch noch, wenn zahl einstellig ist (${digits[digits.length - 1]} > 0). Erst bei zahl = 0 ist Schluss.` }]),
        explanation: `${table(['Schritt', 'zahl (nachher)', 'zahl MOD 10', 'q'], rows)}\n\nDer Algorithmus berechnet die **Quersumme**: ${[...digits].reverse().join(' + ')} = **${q}**.`,
      };
    }
    if (pick === 8) {
      const g = rng.int(2, 12);
      let a0 = g * rng.int(2, 15);
      let b0 = g * rng.int(2, 15);
      while (a0 === b0) b0 = g * rng.int(2, 15);
      let a = a0;
      let b = b0;
      const rows: (string | number)[][] = [['Start', a, b, '–']];
      let k = 0;
      while (b !== 0) {
        const r = a % b;
        a = b;
        b = r;
        k++;
        rows.push([`${k}. Durchlauf`, a, b, r]);
      }
      return {
        ...base, id: gid('p.trace.loop'),
        prompt: `Welchen Wert gibt der Algorithmus aus?\n\n${fence([`a ← ${a0}`, `b ← ${b0}`, 'SOLANGE b ≠ 0 TUE', '  r ← a MOD b', '  a ← b', '  b ← r', 'ENDE SOLANGE', 'AUSGABE a'])}`,
        answer: a,
        hints: ['Notiere in jeder Zeile der Trace-Tabelle r, a und b.', ...hintsLoop],
        misconceptions: mcFilter(a, [{ answer: '0', error: 'variable-verwechselt', why: 'Am Ende ist b = 0 (Abbruchbedingung). Ausgegeben wird aber a.' }]),
        explanation: `${table(['Schritt', 'a', 'b', 'r'], rows)}\n\nb = 0 → Ende. Ausgabe a = **${a}**. (Das ist der **euklidische Algorithmus** für den größten gemeinsamen Teiler von ${a0} und ${b0}.)`,
      };
    }
    if (pick === 9) {
      const trap = rng.bool(0.5);
      const limit = rng.int(10, 30);
      const dd = rng.int(3, 7);
      const start = trap ? limit - rng.int(1, 5) : limit + rng.int(5, 30);
      let x = start;
      let z = 0;
      const rows: (string | number)[][] = [['Start', x, 0]];
      do {
        x -= dd;
        z++;
        rows.push([`${z}. Durchlauf`, x, z]);
      } while (!(x < limit));
      let wx = start;
      let wz = 0;
      while (wx >= limit) {
        wx -= dd;
        wz++;
      }
      return {
        ...base, id: gid('p.trace.loop'),
        prompt: `Welchen Wert hat \`z\` nach Ausführung?\n\n${fence([`x ← ${start}`, 'z ← 0', 'WIEDERHOLE', `  x ← x - ${dd}`, '  z ← z + 1', `BIS x < ${limit}`, 'AUSGABE z'])}`,
        answer: z,
        hints: ['WIEDERHOLE … BIS ist **fußgesteuert**: Der Rumpf läuft mindestens einmal, die Bedingung wird erst am Ende geprüft.', 'Die Schleife endet, sobald die BIS-Bedingung WAHR ist.'],
        misconceptions: mcFilter(z, [{ answer: String(wz), error: 'kopf-fuss-verwechselt', why: 'Du hast die Schleife wie eine kopfgesteuerte behandelt. Bei WIEDERHOLE … BIS wird der Rumpf **mindestens einmal** ausgeführt, bevor die Bedingung geprüft wird.' }, { answer: String(z - 1), error: 'schleife-off-by-one', why: 'Der Durchlauf, nach dem die Bedingung erstmals WAHR ist, wurde vollständig ausgeführt und zählt mit.' }]),
        explanation: `${table(['Schritt', 'x', 'z'], rows)}\n\n${trap ? `Achtung: x = ${start} ist schon zu Beginn < ${limit}. Trotzdem läuft der Rumpf **einmal**, weil die Bedingung erst am Ende geprüft wird (fußgesteuert). ` : ''}Nach dem ${z}. Durchlauf ist x = ${x} < ${limit} → Ende. Ausgabe **${z}**.`,
      };
    }
    // pick === 10: verschachtelte Schleifen
    const a = rng.int(3, 5);
    const b = rng.int(a + 1, 6);
    let z = 0;
    const rows: (string | number)[][] = [];
    for (let i = 1; i <= a; i++) {
      let inner = 0;
      for (let j = i; j <= b; j++) {
        z++;
        inner++;
      }
      rows.push([i, `${i} … ${b}`, inner, z]);
    }
    return {
      ...base, id: gid('p.trace.loop'),
      prompt: `Welchen Wert hat \`z\` nach Ausführung der verschachtelten Schleifen?\n\n${fence(['z ← 0', `FÜR i VON 1 BIS ${a}`, `  FÜR j VON i BIS ${b}`, '    z ← z + 1', '  ENDE FÜR', 'ENDE FÜR', 'AUSGABE z'])}`,
      answer: z,
      hints: ['Die innere Schleife beginnt bei j = i – sie wird mit jedem äußeren Durchlauf kürzer.', 'Zähle für jedes i, wie oft die innere Schleife läuft: b − i + 1.'],
      misconceptions: mcFilter(z, [{ answer: String(a * b), error: 'verschachtelte-schleife', why: `${a} · ${b} gälte nur, wenn die innere Schleife immer bei 1 beginnen würde. Sie beginnt aber bei j = i.` }]),
      explanation: `${table(['i', 'j läuft', 'innere Durchläufe', 'z danach'], rows)}\n\nSumme: ${rows.map((r) => r[2]).join(' + ')} = **${z}**`,
    };
  },
};

/* ------------------------------------------------------------------ */
/* p02: Verzweigungen                                                  */
/* ------------------------------------------------------------------ */

const IHK_GRENZEN: [number, number][] = [[92, 1], [81, 2], [67, 3], [50, 4], [30, 5]];
const ihkNote = (p: number) => (IHK_GRENZEN.find(([g]) => p >= g) ?? [0, 6])[1];

const traceBranch: GeneratorMeta = {
  id: 'p.trace.branch',
  title: 'Schreibtischtest: Verzweigungen',
  skill: 'prog.branch',
  module: 'p02',
  make(rng, d) {
    const pick = d === 1 ? rng.int(1, 2) : d === 2 ? rng.int(2, 3) : rng.int(4, 5);
    const hints = ['Setze die Werte in jede Bedingung ein und entscheide WAHR oder FALSCH.', 'Achte bei Grenzwerten genau auf ≥ bzw. >.'];
    if (pick === 1) {
      const grenze = rng.pick([100, 200, 250, 500]);
      const p = rng.pick([5, 10, 20]);
      const betrag = rng.pick([grenze, grenze, grenze - 20, grenze + 60, grenze + 100, grenze - 60]);
      const ok = betrag >= grenze;
      const rabatt = ok ? p : 0;
      const preis = betrag - (betrag * rabatt) / 100;
      const mcs: Mc[] = [];
      if (betrag === grenze) mcs.push({ answer: String(betrag), error: 'grenzwert-vergleich', why: `≥ bedeutet „größer **oder gleich**“. ${betrag} ≥ ${grenze} ist WAHR – der Rabatt gilt also schon genau an der Grenze.` });
      if (ok) mcs.push({ answer: String((betrag * p) / 100), error: 'teilergebnis', why: `${(betrag * p) / 100} ist nur der Rabattbetrag. Ausgegeben wird der Preis **nach** Abzug.` });
      if (!ok) mcs.push({ answer: String(betrag - (betrag * p) / 100), error: 'grenzwert-vergleich', why: `${betrag} ≥ ${grenze} ist FALSCH – es gibt keinen Rabatt.` });
      return {
        id: gid('p.trace.branch'), generated: true, kind: 'number', skill: 'prog.branch', difficulty: d,
        prompt: `Der Webshop der Elektro Krämer GmbH berechnet den Rabatt so. Welcher Wert wird ausgegeben?\n\n${fence([`betrag ← ${betrag}`, `WENN betrag ≥ ${grenze} DANN`, `  rabatt ← ${p}`, 'SONST', '  rabatt ← 0', 'ENDE WENN', 'preis ← betrag - betrag * rabatt / 100', 'AUSGABE preis'])}`,
        answer: preis,
        unit: '€',
        hints,
        misconceptions: mcFilter(preis, mcs),
        explanation: `1. Bedingung: ${betrag} ≥ ${grenze} → **${wf(ok)}** → rabatt = ${rabatt}\n2. preis = ${betrag} − ${betrag} · ${rabatt} / 100 = ${betrag} − ${(betrag * rabatt) / 100} = **${de(preis)}**`,
      };
    }
    if (pick === 2) {
      const g = rng.pick(IHK_GRENZEN)[0];
      const pts = rng.pick([g, g, g - 1, rng.int(0, 100), g + 1]);
      const note = ihkNote(pts);
      const mcs: Mc[] = [];
      if (IHK_GRENZEN.some(([gg]) => gg === pts)) mcs.push({ answer: String(note + 1), error: 'grenzwert-vergleich', why: `${pts} ≥ ${pts} ist WAHR. Genau auf der Grenze gilt schon die bessere Note.` });
      const lines = ['punkte ← ' + pts, 'WENN punkte ≥ 92 DANN', '  note ← 1', 'SONST WENN punkte ≥ 81 DANN', '  note ← 2', 'SONST WENN punkte ≥ 67 DANN', '  note ← 3', 'SONST WENN punkte ≥ 50 DANN', '  note ← 4', 'SONST WENN punkte ≥ 30 DANN', '  note ← 5', 'SONST', '  note ← 6', 'ENDE WENN', 'AUSGABE note'];
      const checks: string[] = [];
      for (const [gg, nn] of IHK_GRENZEN) {
        checks.push(`${pts} ≥ ${gg}? ${pts >= gg ? '**WAHR** → note = ' + nn : 'FALSCH'}`);
        if (pts >= gg) break;
      }
      if (pts < 30) checks.push('alle FALSCH → SONST-Zweig → note = 6');
      return {
        id: gid('p.trace.branch'), generated: true, kind: 'number', skill: 'prog.branch', difficulty: d,
        prompt: `Ein Programm berechnet die Note nach dem IHK-Notenschlüssel. Welche Note wird ausgegeben?\n\n${fence(lines)}`,
        answer: note,
        hints: ['Eine SONST-WENN-Kette wird von oben nach unten geprüft – der **erste** WAHR-Zweig wird ausgeführt, der Rest übersprungen.', ...hints.slice(1)],
        misconceptions: mcFilter(note, mcs),
        explanation: checks.map((c, i) => `${i + 1}. ${c}`).join('\n') + `\n\nAusgabe: **${note}**. Alle weiteren Bedingungen werden nicht mehr geprüft.`,
      };
    }
    if (pick === 3) {
      const gewicht = rng.pick([1, 2, 3, 5, 6, 8]);
      const express = rng.bool(0.4);
      const wert = rng.pick([40, 80, 100, 150]);
      let kosten = gewicht > 5 || express ? 12 : gewicht > 2 ? 7 : 4;
      const vorher = kosten;
      const frei = wert >= 100 && !express;
      if (frei) kosten = 0;
      const steps = [
        `1. \`gewicht > 5 ODER express = WAHR\` → ${gewicht} > 5 = ${wf(gewicht > 5)}, express = ${wf(express)} → **${wf(gewicht > 5 || express)}**`,
        gewicht > 5 || express ? '   → kosten = 12 (die SONST-WENN-Zweige werden übersprungen)' : `2. \`gewicht > 2\` → ${gewicht} > 2 = **${wf(gewicht > 2)}** → kosten = ${vorher}`,
        `${gewicht > 5 || express ? 2 : 3}. \`bestellwert ≥ 100 UND NICHT express\` → ${wert} ≥ 100 = ${wf(wert >= 100)}, NICHT express = ${wf(!express)} → **${wf(frei)}**${frei ? ' → kosten = 0' : ' → kosten bleibt ' + vorher}`,
      ];
      return {
        id: gid('p.trace.branch'), generated: true, kind: 'number', skill: 'prog.branch', difficulty: d,
        prompt: `Versandkostenberechnung im Webshop. Welcher Wert wird ausgegeben?\n\n${fence([`gewicht ← ${gewicht}`, `express ← ${wf(express)}`, `bestellwert ← ${wert}`, 'WENN gewicht > 5 ODER express = WAHR DANN', '  kosten ← 12', 'SONST WENN gewicht > 2 DANN', '  kosten ← 7', 'SONST', '  kosten ← 4', 'ENDE WENN', 'WENN bestellwert ≥ 100 UND NICHT express DANN', '  kosten ← 0', 'ENDE WENN', 'AUSGABE kosten'])}`,
        answer: kosten,
        unit: '€',
        hints: ['ODER: WAHR, sobald eine Teilbedingung WAHR ist. UND: nur WAHR, wenn beide WAHR sind.', 'Vergiss die zweite (unabhängige) WENN-Abfrage nicht – sie kann den Wert überschreiben.'],
        misconceptions: mcFilter(kosten, [{ answer: String(vorher), error: 'zweite-verzweigung-uebersehen', why: 'Die zweite WENN-Abfrage wird **immer** zusätzlich geprüft und setzt die Kosten ggf. auf 0.' }, ...(frei ? [] : [{ answer: '0', error: 'logik-und', why: `Für den Gratisversand müssen **beide** Teilbedingungen WAHR sein (UND).` }])]),
        explanation: steps.join('\n') + `\n\nAusgabe: **${kosten}**`,
      };
    }
    if (pick === 4) {
      const j = rng.pick([1900, 2000, 2024, 2100, 2023, 2026, 2028, 2400, 1996, 2200, 1800, 2012]);
      const v4 = j % 4 === 0;
      const v100 = j % 100 !== 0;
      const v400 = j % 400 === 0;
      const sj = (v4 && v100) || v400;
      const ans = sj ? 'Schaltjahr' : 'kein Schaltjahr';
      const other = sj ? 'kein Schaltjahr' : 'Schaltjahr';
      const why = v4 && !v100 && !v400 ? `${j} ist zwar durch 4 teilbar, aber auch durch 100 (und nicht durch 400) → die UND-Bedingung ist FALSCH.` : v400 ? `${j} MOD 400 = 0 → die ODER-Bedingung ist WAHR, auch wenn ${j} durch 100 teilbar ist.` : `Prüfe beide Teile der ODER-Verknüpfung genau.`;
      return {
        id: gid('p.trace.branch'), generated: true, kind: 'text', skill: 'prog.branch', difficulty: d,
        prompt: `Was gibt der Algorithmus aus?\n\n${fence([`jahr ← ${j}`, 'WENN (jahr MOD 4 = 0 UND jahr MOD 100 ≠ 0) ODER jahr MOD 400 = 0 DANN', '  AUSGABE "Schaltjahr"', 'SONST', '  AUSGABE "kein Schaltjahr"', 'ENDE WENN'])}`,
        accept: [ans],
        placeholder: 'Ausgabetext',
        hints: ['Werte zuerst die Klammer aus, dann die ODER-Verknüpfung.', 'x MOD n = 0 heißt: x ist durch n teilbar.'],
        misconceptions: [{ answer: other, error: 'logik-verknuepfung', why }],
        explanation: `- ${j} MOD 4 = ${j % 4} → \`= 0\`: ${wf(v4)}\n- ${j} MOD 100 = ${j % 100} → \`≠ 0\`: ${wf(v100)}\n- Klammer (UND): ${wf(v4 && v100)}\n- ${j} MOD 400 = ${j % 400} → \`= 0\`: ${wf(v400)}\n- Gesamt (ODER): **${wf(sj)}**\n\nAusgabe: **${ans}**`,
      };
    }
    // pick === 5: verschachtelte Verzweigung
    const rolle = rng.pick(['admin', 'azubi', 'mitarbeiter', 'azubi', 'mitarbeiter']);
    const stunde = rng.pick([6, 7, 12, 17, 18, 18, 22]);
    const imZeitfenster = stunde >= 7 && stunde < 18;
    const zugriff = rolle === 'admin' ? 'voll' : imZeitfenster ? (rolle === 'azubi' ? 'lesen' : 'schreiben') : 'gesperrt';
    const mcs: Mc[] = [];
    if (stunde === 18 && rolle !== 'admin') mcs.push({ answer: rolle === 'azubi' ? 'lesen' : 'schreiben', error: 'grenzwert-vergleich', why: '18 < 18 ist FALSCH – um 18 Uhr ist das Zeitfenster bereits geschlossen.' });
    if (stunde === 7 && rolle !== 'admin') mcs.push({ answer: 'gesperrt', error: 'grenzwert-vergleich', why: '7 ≥ 7 ist WAHR – um 7 Uhr ist das Zeitfenster bereits offen.' });
    return {
      id: gid('p.trace.branch'), generated: true, kind: 'text', skill: 'prog.branch', difficulty: d,
      prompt: `Ein Zugriffssystem prüft Rolle und Uhrzeit. Welchen Wert gibt der Algorithmus aus?\n\n${fence([`rolle ← "${rolle}"`, `stunde ← ${stunde}`, 'WENN rolle = "admin" DANN', '  zugriff ← "voll"', 'SONST', '  WENN stunde ≥ 7 UND stunde < 18 DANN', '    WENN rolle = "azubi" DANN', '      zugriff ← "lesen"', '    SONST', '      zugriff ← "schreiben"', '    ENDE WENN', '  SONST', '    zugriff ← "gesperrt"', '  ENDE WENN', 'ENDE WENN', 'AUSGABE zugriff'])}`,
      accept: [zugriff],
      placeholder: 'Ausgabetext',
      hints: ['Verschachtelte WENN-Blöcke von außen nach innen abarbeiten.', 'Ordne jedes SONST dem passenden WENN zu (Einrückung beachten).'],
      misconceptions: mcFilter(zugriff, mcs),
      explanation: `1. rolle = "admin"? → ${wf(rolle === 'admin')}${rolle === 'admin' ? ' → zugriff = "voll"' : ''}\n${rolle === 'admin' ? '' : `2. stunde ≥ 7 UND stunde < 18 → ${stunde} ≥ 7 = ${wf(stunde >= 7)}, ${stunde} < 18 = ${wf(stunde < 18)} → **${wf(imZeitfenster)}**\n${imZeitfenster ? `3. rolle = "azubi"? → ${wf(rolle === 'azubi')}` : '3. → äußeres SONST: zugriff = "gesperrt"'}\n`}\nAusgabe: **${zugriff}**`,
    };
  },
};

/* ------------------------------------------------------------------ */
/* p03: Arrays – Summe, Zählen, Maximum, Durchschnitt                   */
/* ------------------------------------------------------------------ */

const arrayAggregate: GeneratorMeta = {
  id: 'p.array.aggregate',
  title: 'Arrays: Summe, Zählen, Maximum, Durchschnitt',
  skill: 'prog.aggregate',
  module: 'p03',
  make(rng, d) {
    const len = d === 1 ? 5 : d === 2 ? rng.int(5, 7) : rng.int(6, 8);
    const zahlen = Array.from({ length: len }, () => rng.int(1, d === 1 ? 20 : 60));
    const arr = `zahlen ← ${arrStr(zahlen)}`;
    const loopAll = 'FÜR i VON 0 BIS LÄNGE(zahlen) - 1';
    const idxNote = '*Arrays sind 0-basiert: Das erste Element ist `zahlen[0]`; `LÄNGE(zahlen)` liefert die Anzahl der Elemente.*';
    const pick = d === 1 ? rng.int(1, 2) : d === 2 ? rng.int(2, 4) : rng.int(4, 6);
    const base = { generated: true as const, skill: 'prog.aggregate', difficulty: d };
    if (pick === 1) {
      const sum = zahlen.reduce((a, b) => a + b, 0);
      let run = 0;
      return {
        ...base, id: gid('p.array.aggregate'), kind: 'number',
        prompt: `Welchen Wert gibt der Algorithmus aus?\n\n${fence([arr, 'summe ← 0', loopAll, '  summe ← summe + zahlen[i]', 'ENDE FÜR', 'AUSGABE summe'])}\n\n${idxNote}`,
        answer: sum,
        hints: [`LÄNGE(zahlen) = ${len}, i läuft also von 0 bis ${len - 1}.`, 'Addiere jedes Element genau einmal.'],
        misconceptions: mcFilter(sum, [{ answer: String(sum - zahlen[len - 1]), error: 'array-off-by-one', why: `Das letzte Element zahlen[${len - 1}] = ${zahlen[len - 1]} fehlt. Die Schleife läuft bis LÄNGE − 1 = ${len - 1} **einschließlich**.` }, { answer: String(sum - zahlen[0]), error: 'array-index-1', why: 'zahlen[0] wurde vergessen – das erste Element hat den Index 0.' }]),
        explanation: `${table(['i', 'zahlen[i]', 'summe'], zahlen.map((z, i) => [i, z, (run += z)]))}\n\nAusgabe: **${sum}**`,
      };
    }
    if (pick === 2) {
      const grenze = rng.pick(zahlen);
      const cnt = zahlen.filter((z) => z > grenze).length;
      const cntGe = zahlen.filter((z) => z >= grenze).length;
      let c = 0;
      return {
        ...base, id: gid('p.array.aggregate'), kind: 'number',
        prompt: `Welchen Wert gibt der Algorithmus aus?\n\n${fence([arr, 'anzahl ← 0', loopAll, `  WENN zahlen[i] > ${grenze} DANN`, '    anzahl ← anzahl + 1', '  ENDE WENN', 'ENDE FÜR', 'AUSGABE anzahl'])}\n\n${idxNote}`,
        answer: cnt,
        hints: [`Gezählt werden nur Werte, die **echt größer** als ${grenze} sind.`],
        misconceptions: mcFilter(cnt, [{ answer: String(cntGe), error: 'grenzwert-vergleich', why: `${grenze} > ${grenze} ist FALSCH – Werte, die genau ${grenze} sind, zählen nicht mit.` }, { answer: String(len - cnt), error: 'bedingung-umgekehrt', why: 'Das ist die Anzahl der Werte, die die Bedingung **nicht** erfüllen.' }]),
        explanation: `${table(['i', 'zahlen[i]', `> ${grenze}?`, 'anzahl'], zahlen.map((z, i) => [i, z, wf(z > grenze), (c += z > grenze ? 1 : 0)]))}\n\nAusgabe: **${cnt}**`,
      };
    }
    if (pick === 3) {
      // Position des Maximums
      const vals = distinctInts(rng, len, 1, 80);
      const a2 = `zahlen ← ${arrStr(vals)}`;
      let max = vals[0];
      let pos = 0;
      const rows: (string | number)[][] = [['Start', '–', '–', max, pos]];
      for (let i = 1; i < len; i++) {
        const gt = vals[i] > max;
        if (gt) {
          max = vals[i];
          pos = i;
        }
        rows.push([i, vals[i], wf(gt), max, pos]);
      }
      return {
        ...base, id: gid('p.array.aggregate'), kind: 'number',
        prompt: `Welchen Wert hat \`pos\` am Ende?\n\n${fence([a2, 'max ← zahlen[0]', 'pos ← 0', 'FÜR i VON 1 BIS LÄNGE(zahlen) - 1', '  WENN zahlen[i] > max DANN', '    max ← zahlen[i]', '    pos ← i', '  ENDE WENN', 'ENDE FÜR', 'AUSGABE pos'])}\n\n${idxNote}`,
        answer: pos,
        hints: ['`pos` speichert den **Index** (die Position), nicht den Wert.', 'Zähle die Positionen ab 0.'],
        misconceptions: mcFilter(pos, [{ answer: String(pos + 1), error: 'array-index-1', why: `Du hast ab 1 gezählt. Das Maximum ${max} steht an Index ${pos} (0-basiert).` }, { answer: String(max), error: 'wert-statt-index', why: `${max} ist der Wert des Maximums. Gefragt ist \`pos\` – der Index.` }]),
        explanation: `${table(['i', 'zahlen[i]', '> max?', 'max', 'pos'], rows)}\n\nDas Maximum ${max} steht an Index **${pos}**.`,
      };
    }
    if (pick === 4) {
      const sum = zahlen.reduce((a, b) => a + b, 0);
      const avg = Math.round((sum / len) * 100) / 100;
      return {
        ...base, id: gid('p.array.aggregate'), kind: 'number',
        prompt: `Welchen Wert gibt der Algorithmus aus? Runde auf **zwei Nachkommastellen**.\n\n${fence([arr, 'summe ← 0', loopAll, '  summe ← summe + zahlen[i]', 'ENDE FÜR', 'durchschnitt ← summe / LÄNGE(zahlen)', 'AUSGABE durchschnitt'])}\n\n${idxNote} \`/\` ist die normale (reelle) Division.`,
        answer: avg,
        tolerance: 0.01,
        hints: ['Erst alle Elemente addieren, dann durch die Anzahl der Elemente teilen.', `LÄNGE(zahlen) = ${len}`],
        misconceptions: mcFilter(String(avg), [{ answer: String(sum), error: 'teilergebnis', why: 'Das ist die Summe. Sie muss noch durch die Anzahl der Elemente geteilt werden.' }, { answer: String(Math.round((sum / (len - 1)) * 100) / 100), error: 'array-off-by-one', why: `Die Länge ist ${len}, nicht ${len - 1} (der höchste Index ist ${len - 1}).` }]),
        explanation: `Summe: ${zahlen.join(' + ')} = ${sum}\n\nDurchschnitt: ${sum} / ${len} = ${de(+(sum / len).toFixed(6))} ≈ **${de(avg)}**`,
      };
    }
    if (pick === 5) {
      // Bug: Minimum mit 0 initialisiert
      const vals = zahlen.map((z) => z + 5);
      const realMin = Math.min(...vals);
      return {
        ...base, id: gid('p.array.aggregate'), kind: 'number',
        prompt: `Ein Kollege soll das **kleinste** Element bestimmen. Welchen Wert gibt sein Algorithmus tatsächlich aus?\n\n${fence([`zahlen ← ${arrStr(vals)}`, 'min ← 0', loopAll, '  WENN zahlen[i] < min DANN', '    min ← zahlen[i]', '  ENDE WENN', 'ENDE FÜR', 'AUSGABE min'])}`,
        answer: 0,
        hints: ['Führe den Code genau so aus, wie er dasteht – nicht so, wie er gemeint ist.', 'Ist irgendein Element kleiner als der Startwert von min?'],
        misconceptions: [{ answer: String(realMin), error: 'initialwert-fehler', why: `${realMin} wäre das gewünschte Ergebnis. Weil \`min\` mit 0 startet und alle Werte positiv sind, ist \`zahlen[i] < min\` nie WAHR – ausgegeben wird 0.` }],
        explanation: `Alle Elemente sind > 0, die Bedingung \`zahlen[i] < 0\` ist also in jedem Durchlauf FALSCH. \`min\` bleibt **0**.\n\n**Fehler:** falscher Startwert. **Korrektur:** \`min ← zahlen[0]\` und Schleife ab Index 1 – dann wäre das Ergebnis ${realMin}.`,
      };
    }
    // pick === 6: gerade Zahlen über Grenze summieren
    const g = rng.int(10, 40);
    let s = 0;
    const rows = zahlen.map((z, i) => {
      const ok = z % 2 === 0 && z > g;
      if (ok) s += z;
      return [i, z, wf(z % 2 === 0), wf(z > g), s] as (string | number)[];
    });
    const sOdr = zahlen.filter((z) => z % 2 === 0 || z > g).reduce((a, b) => a + b, 0);
    return {
      ...base, id: gid('p.array.aggregate'), kind: 'number',
      prompt: `Welchen Wert gibt der Algorithmus aus?\n\n${fence([arr, 'summe ← 0', loopAll, `  WENN zahlen[i] MOD 2 = 0 UND zahlen[i] > ${g} DANN`, '    summe ← summe + zahlen[i]', '  ENDE WENN', 'ENDE FÜR', 'AUSGABE summe'])}\n\n${idxNote}`,
      answer: s,
      hints: ['Beide Teilbedingungen müssen WAHR sein (UND).', 'x MOD 2 = 0 bedeutet: x ist gerade.'],
      misconceptions: mcFilter(s, [{ answer: String(sOdr), error: 'logik-und', why: 'Du hast die Bedingung wie ODER behandelt. Bei UND müssen **beide** Teile WAHR sein.' }]),
      explanation: `${table(['i', 'zahlen[i]', 'gerade?', `> ${g}?`, 'summe'], rows)}\n\nAusgabe: **${s}**`,
    };
  },
};

/* ------------------------------------------------------------------ */
/* p03: Lineare Suche                                                  */
/* ------------------------------------------------------------------ */

const SUCHE_FN = ['FUNKTION suche(liste, ziel)', '  FÜR i VON 0 BIS LÄNGE(liste) - 1', '    WENN liste[i] = ziel DANN', '      RÜCKGABE i', '    ENDE WENN', '  ENDE FÜR', '  RÜCKGABE -1', 'ENDE FUNKTION'];

const arraySearch: GeneratorMeta = {
  id: 'p.array.search',
  title: 'Lineare Suche',
  skill: 'prog.search',
  module: 'p03',
  make(rng, d) {
    const len = d === 1 ? 6 : rng.int(7, 9);
    const liste = distinctInts(rng, len, 1, 99);
    const variant = d === 1 ? 'first' : d === 2 ? rng.pick(['first', 'dup', 'count'] as const) : rng.pick(['missing', 'last', 'dup'] as const);
    const base = { generated: true as const, kind: 'number' as const, skill: 'prog.search', difficulty: d };
    if (variant === 'last') {
      const ziel = liste[rng.int(0, 2)];
      const second = rng.int(4, len - 1);
      liste[second] = ziel;
      const first = liste.indexOf(ziel);
      const last = liste.lastIndexOf(ziel);
      return {
        ...base, id: gid('p.array.search'),
        prompt: `Welchen Wert gibt der Algorithmus aus?\n\n${fence([`liste ← ${arrStr(liste)}`, `ziel ← ${ziel}`, 'pos ← -1', 'FÜR i VON 0 BIS LÄNGE(liste) - 1', '  WENN liste[i] = ziel DANN', '    pos ← i', '  ENDE WENN', 'ENDE FÜR', 'AUSGABE pos'])}\n\n*Index 0-basiert.*`,
        answer: last,
        hints: ['Die Schleife bricht nach einem Treffer **nicht** ab.', 'Jeder weitere Treffer überschreibt pos.'],
        misconceptions: mcFilter(last, [{ answer: String(first), error: 'suche-vorkommen', why: 'Ohne vorzeitige Rückgabe läuft die Schleife bis zum Ende weiter – ein späterer Treffer überschreibt pos.' }, { answer: String(last + 1), error: 'array-index-1', why: 'Index-Zählung beginnt bei 0.' }]),
        explanation: `Treffer bei Index ${first} und ${last}. Da \`pos\` bei jedem Treffer überschrieben wird, bleibt der **letzte** Treffer: **${last}**.`,
      };
    }
    let ziel: number;
    if (variant === 'missing') {
      ziel = rng.int(1, 99);
      while (liste.includes(ziel)) ziel = rng.int(1, 99);
    } else {
      const idx = rng.int(1, len - 2);
      ziel = liste[idx];
      if (variant === 'dup') liste[rng.int(idx + 1, len - 1)] = ziel;
    }
    const idx = liste.indexOf(ziel);
    const count = variant === 'count';
    const ans = count ? (idx === -1 ? len : idx + 1) : idx;
    const lastIdx = liste.lastIndexOf(ziel);
    const mcs: Mc[] = count
      ? [{ answer: String(idx), error: 'array-index-1', why: `Der Treffer liegt an Index ${idx}; bis dahin wurden die Indizes 0 bis ${idx} verglichen, also ${idx + 1} Vergleiche.` }]
      : idx === -1
        ? [{ answer: '0', error: 'suche-nicht-gefunden', why: '0 wäre ein gültiger Index (erstes Element). Bei erfolgloser Suche liefert die Funktion −1.' }, { answer: String(len), error: 'suche-nicht-gefunden', why: 'Die Funktion gibt nicht die Länge zurück, sondern −1.' }]
        : [{ answer: String(idx + 1), error: 'array-index-1', why: `Du hast ab 1 gezählt. ${ziel} steht an Index ${idx} (0-basiert).` }, ...(lastIdx !== idx ? [{ answer: String(lastIdx), error: 'suche-vorkommen', why: `RÜCKGABE beendet die Funktion beim **ersten** Treffer (Index ${idx}); das zweite Vorkommen wird nie erreicht.` }] : [])];
    return {
      ...base, id: gid('p.array.search'),
      prompt: `${count ? `Wie viele Vergleiche \`liste[i] = ziel\` führt die Funktion beim Aufruf aus?` : 'Welchen Wert liefert der Aufruf zurück?'}\n\n${fence([...SUCHE_FN, '', `liste ← ${arrStr(liste)}`, `ergebnis ← suche(liste, ${ziel})`])}\n\n*Index 0-basiert. RÜCKGABE beendet die Funktion sofort.*`,
      answer: ans,
      hints: ['Gehe die Liste von Index 0 an durch und vergleiche jedes Element mit dem Ziel.', 'RÜCKGABE verlässt die Funktion sofort – auch mitten in der Schleife.'],
      misconceptions: mcFilter(ans, mcs),
      explanation:
        table(['i', 'liste[i]', `= ${ziel}?`], liste.slice(0, idx === -1 ? len : idx + 1).map((v, i) => [i, v, wf(v === ziel)])) +
        `\n\n${idx === -1 ? `Kein Treffer in ${len} Vergleichen → RÜCKGABE **−1**.` : `Erster Treffer bei Index ${idx} → ${count ? `${idx + 1} Vergleiche` : `RÜCKGABE **${idx}**`}.`}${count ? ` Antwort: **${ans}**.` : ''}`,
    };
  },
};

/* ------------------------------------------------------------------ */
/* p03: Bubble Sort                                                    */
/* ------------------------------------------------------------------ */

const arraySort: GeneratorMeta = {
  id: 'p.array.sort',
  title: 'Bubble Sort: Durchläufe nachvollziehen',
  skill: 'prog.sort',
  module: 'p03',
  make(rng, d) {
    const len = d === 1 ? 5 : d === 2 ? 6 : rng.int(6, 7);
    let start = distinctInts(rng, len, 1, 50);
    while (start.every((v, i) => i === 0 || start[i - 1] < v)) start = distinctInts(rng, len, 1, 50);
    const passes = d === 3 ? 2 : 1;
    const a = [...start];
    const rows: (string | number)[][] = [];
    let swaps = 0;
    for (let p = 1; p <= passes; p++) {
      for (let i = 0; i <= len - 2; i++) {
        const sw = a[i] > a[i + 1];
        if (sw) {
          [a[i], a[i + 1]] = [a[i + 1], a[i]];
          if (p === 1) swaps++;
        }
        rows.push([p, i, `${sw ? a[i + 1] : a[i]} > ${sw ? a[i] : a[i + 1]}?`, sw ? 'ja – tauschen' : 'nein', arrStr(a)]);
      }
    }
    const code = [`zahlen ← ${arrStr(start)}`, `FÜR durchlauf VON 1 BIS ${passes}`, '  FÜR i VON 0 BIS LÄNGE(zahlen) - 2', '    WENN zahlen[i] > zahlen[i + 1] DANN', '      hilf ← zahlen[i]', '      zahlen[i] ← zahlen[i + 1]', '      zahlen[i + 1] ← hilf', '    ENDE WENN', '  ENDE FÜR', 'ENDE FÜR'];
    const sorted = [...start].sort((x, y) => x - y);
    const expl = `${table(['Durchlauf', 'i', 'Vergleich', 'Tausch?', 'zahlen danach'], rows)}`;
    if (d === 2 && rng.bool()) {
      return {
        id: gid('p.array.sort'), generated: true, kind: 'number', skill: 'prog.sort', difficulty: d,
        prompt: `Wie viele **Vertauschungen** finden im ersten Durchlauf statt?\n\n${fence(code)}`,
        answer: swaps,
        hints: ['Vergleiche immer zwei benachbarte Elemente – das größere wandert nach rechts.', 'Arbeite mit dem **aktuellen** Array weiter, nicht mit dem Ausgangsarray.'],
        misconceptions: [],
        explanation: `${expl}\n\nVertauschungen im 1. Durchlauf: **${swaps}**`,
      };
    }
    return {
      id: gid('p.array.sort'), generated: true, kind: 'text', skill: 'prog.sort', difficulty: d,
      prompt: `Wie sieht das Array \`zahlen\` nach ${passes === 1 ? 'dem **ersten Durchlauf**' : '**zwei Durchläufen**'} aus? Gib die Werte mit Komma getrennt an.\n\n${fence(code)}`,
      accept: listAccept(a),
      placeholder: 'z. B. 3, 8, 1, …',
      hints: ['Vergleiche immer zwei benachbarte Elemente – das größere wandert nach rechts.', 'Arbeite mit dem **aktuellen** Array weiter, nicht mit dem Ausgangsarray.'],
      misconceptions: sorted.join(', ') !== a.join(', ') ? [{ answer: sorted.join(', '), error: 'bubblesort-komplett', why: `Das ist das vollständig sortierte Array. Nach ${passes === 1 ? 'einem Durchlauf ist nur sicher, dass der größte Wert' : 'zwei Durchläufen ist nur sicher, dass die zwei größten Werte'} ganz rechts ${passes === 1 ? 'steht' : 'stehen'}.` }] : [],
      explanation: `${expl}\n\nNach ${passes === 1 ? 'dem 1. Durchlauf' : '2 Durchläufen'}: **${a.join(', ')}** – das größte Element ist ganz nach rechts „aufgestiegen“ (wie eine Blase).`,
    };
  },
};

/* ------------------------------------------------------------------ */
/* p03: Funktionen                                                     */
/* ------------------------------------------------------------------ */

const funcGen: GeneratorMeta = {
  id: 'p.funktion',
  title: 'Funktionen mit Parametern und Rückgabewert',
  skill: 'prog.functions',
  module: 'p03',
  make(rng, d) {
    const pick = d === 1 ? 1 : d === 2 ? rng.int(2, 3) : rng.int(4, 5);
    const base = { generated: true as const, kind: 'number' as const, skill: 'prog.functions', difficulty: d };
    const hints = ['Setze die Argumente des Aufrufs für die Parameter ein (in der Reihenfolge!).', 'Der Aufruf wird durch den Rückgabewert ersetzt.'];
    if (pick === 1) {
      const [a, b, c, e] = [rng.int(1, 30), rng.int(1, 30), rng.int(1, 30), rng.int(1, 30)];
      const ans = Math.max(a, b) + Math.max(c, e);
      return {
        ...base, id: gid('p.funktion'),
        prompt: `Welchen Wert hat \`ergebnis\`?\n\n${fence(['FUNKTION maxVon(a, b)', '  WENN a > b DANN', '    RÜCKGABE a', '  SONST', '    RÜCKGABE b', '  ENDE WENN', 'ENDE FUNKTION', '', `ergebnis ← maxVon(${a}, ${b}) + maxVon(${c}, ${e})`])}`,
        answer: ans,
        hints,
        misconceptions: mcFilter(ans, [{ answer: String(Math.min(a, b) + Math.min(c, e)), error: 'bedingung-umgekehrt', why: 'Die Funktion liefert den **größeren** der beiden Werte.' }]),
        explanation: `- maxVon(${a}, ${b}) → ${a} > ${b}? ${wf(a > b)} → ${Math.max(a, b)}\n- maxVon(${c}, ${e}) → ${c} > ${e}? ${wf(c > e)} → ${Math.max(c, e)}\n\nergebnis = ${Math.max(a, b)} + ${Math.max(c, e)} = **${ans}**`,
      };
    }
    if (pick === 2) {
      const b1 = rng.int(2, 3);
      const e1 = rng.int(2, 4);
      const b2 = rng.int(2, 5);
      const e2 = 2;
      const p1 = b1 ** e1;
      const p2 = b2 ** e2;
      const ans = p1 + p2;
      return {
        ...base, id: gid('p.funktion'),
        prompt: `Welchen Wert gibt das Programm aus?\n\n${fence(['FUNKTION potenz(basis, exponent)', '  erg ← 1', '  FÜR i VON 1 BIS exponent', '    erg ← erg * basis', '  ENDE FÜR', '  RÜCKGABE erg', 'ENDE FUNKTION', '', `AUSGABE potenz(${b1}, ${e1}) + potenz(${b2}, ${e2})`])}`,
        answer: ans,
        hints,
        misconceptions: mcFilter(ans, [{ answer: String(b1 * e1 + b2 * e2), error: 'potenz-als-produkt', why: 'Die Schleife multipliziert `exponent`-mal mit `basis` – das ist eine Potenz, kein Produkt basis · exponent.' }, { answer: String(e1 ** b1 + e2 ** b2), error: 'parameter-reihenfolge', why: 'Die Argumente werden in der **Reihenfolge** der Parameter zugeordnet: erstes Argument → basis, zweites → exponent.' }]),
        explanation: `- potenz(${b1}, ${e1}): basis = ${b1}, exponent = ${e1} → ${Array(e1).fill(b1).join(' · ')} = ${p1}\n- potenz(${b2}, ${e2}): ${b2} · ${b2} = ${p2}\n\nAusgabe: ${p1} + ${p2} = **${ans}**`,
      };
    }
    if (pick === 3) {
      const liste = Array.from({ length: rng.int(6, 8) }, () => rng.int(1, 40));
      const ans = liste.filter((z) => z % 2 === 0).length;
      return {
        ...base, id: gid('p.funktion'),
        prompt: `Welchen Wert gibt das Programm aus?\n\n${fence(['FUNKTION istGerade(zahl)', '  RÜCKGABE zahl MOD 2 = 0', 'ENDE FUNKTION', '', `werte ← ${arrStr(liste)}`, 'anzahl ← 0', 'FÜR i VON 0 BIS LÄNGE(werte) - 1', '  WENN istGerade(werte[i]) DANN', '    anzahl ← anzahl + 1', '  ENDE WENN', 'ENDE FÜR', 'AUSGABE anzahl'])}`,
        answer: ans,
        hints: ['Die Funktion gibt einen Wahrheitswert (WAHR/FALSCH) zurück.', 'zahl MOD 2 = 0 ist WAHR für gerade Zahlen.'],
        misconceptions: mcFilter(ans, [{ answer: String(liste.length - ans), error: 'bedingung-umgekehrt', why: 'Das ist die Anzahl der **ungeraden** Werte.' }]),
        explanation: `${table(['Wert', 'MOD 2', 'istGerade'], liste.map((z) => [z, z % 2, wf(z % 2 === 0)]))}\n\nAnzahl WAHR: **${ans}**`,
      };
    }
    if (pick === 4) {
      const x = rng.int(3, 25);
      const ans = x + 2 * x;
      return {
        ...base, id: gid('p.funktion'),
        prompt: `Parameter werden **als Wert** übergeben (call by value). Welchen Wert gibt das Programm aus?\n\n${fence(['FUNKTION verdopple(n)', '  n ← n * 2', '  RÜCKGABE n', 'ENDE FUNKTION', '', `x ← ${x}`, 'y ← verdopple(x)', 'AUSGABE x + y'])}`,
        answer: ans,
        hints: ['Bei call by value bekommt die Funktion eine **Kopie** des Werts.', 'Ändert sich x im Hauptprogramm?'],
        misconceptions: mcFilter(ans, [{ answer: String(4 * x), error: 'call-by-reference-angenommen', why: `\`n\` ist eine lokale Kopie. Die Änderung \`n ← n * 2\` wirkt nicht auf \`x\` – x bleibt ${x}.` }]),
        explanation: `- Aufruf verdopple(${x}): n = ${x} (Kopie), n ← ${2 * x}, Rückgabe ${2 * x} → y = ${2 * x}\n- x bleibt **${x}** (call by value)\n\nAusgabe: ${x} + ${2 * x} = **${ans}**`,
      };
    }
    const k = rng.int(2, 4);
    const m = rng.int(1, 5);
    const a = rng.int(2, 9);
    const f = (v: number) => v * k - m;
    const ans = f(f(a));
    return {
      ...base, id: gid('p.funktion'),
      prompt: `Welchen Wert gibt das Programm aus?\n\n${fence(['FUNKTION f(x)', `  RÜCKGABE x * ${k} - ${m}`, 'ENDE FUNKTION', '', `AUSGABE f(f(${a}))`])}`,
      answer: ans,
      hints: ['Verschachtelte Aufrufe von innen nach außen auswerten.', `Berechne zuerst f(${a}).`],
      misconceptions: mcFilter(ans, [{ answer: String(f(a)), error: 'verschachtelter-aufruf', why: `Das ist nur der innere Aufruf f(${a}). Das Ergebnis wird erneut an f übergeben.` }]),
      explanation: `1. Innen: f(${a}) = ${a} · ${k} − ${m} = ${f(a)}\n2. Außen: f(${f(a)}) = ${f(a)} · ${k} − ${m} = **${ans}**`,
    };
  },
};

/* ------------------------------------------------------------------ */
/* p05: Äquivalenzklassen & Grenzwertanalyse                            */
/* ------------------------------------------------------------------ */

const RANGES: { feld: string; min: number; max: number; einheit: string }[] = [
  { feld: 'Bestellmenge', min: 1, max: 99, einheit: 'Stück' },
  { feld: 'Alter der Bewerberin / des Bewerbers', min: 16, max: 67, einheit: 'Jahre' },
  { feld: 'Anzahl Lizenzen', min: 5, max: 250, einheit: 'Lizenzen' },
  { feld: 'Raumnummer', min: 100, max: 499, einheit: '' },
  { feld: 'Urlaubstage je Antrag', min: 1, max: 30, einheit: 'Tage' },
  { feld: 'Passwortlänge', min: 12, max: 64, einheit: 'Zeichen' },
];

const testcaseGen: GeneratorMeta = {
  id: 'p.testcases',
  title: 'Grenzwertanalyse: Testwerte bestimmen',
  skill: 'qa.equivalence',
  module: 'p05',
  make(rng, d) {
    const hints = ['Grenzwerte liegen direkt **an** und direkt **neben** jeder Klassengrenze.', 'Bei ganzen Zahlen ist der Nachbarwert ±1, bei Beträgen mit Cent ±0,01.'];
    if (d === 1) {
      const r = rng.pick(RANGES);
      const q: TableQuestion = {
        id: gid('p.testcases'), generated: true, kind: 'table', skill: 'qa.equivalence', difficulty: d,
        prompt: `Für eine neue Eingabemaske der Elektro Krämer GmbH gilt im Feld **${r.feld}**${r.einheit ? ` (in ${r.einheit})` : ''}: zulässig sind **ganze Zahlen von ${r.min} bis ${r.max}** (jeweils einschließlich). Bestimme die vier Grenzwerte für den Test.`,
        columns: [{ key: 'wert', label: 'Testwert', type: 'number' }],
        rows: [
          { label: 'größter ungültiger Wert unterhalb', cells: { wert: { answer: String(r.min - 1) } } },
          { label: 'kleinster gültiger Wert', cells: { wert: { answer: String(r.min) } } },
          { label: 'größter gültiger Wert', cells: { wert: { answer: String(r.max) } } },
          { label: 'kleinster ungültiger Wert oberhalb', cells: { wert: { answer: String(r.max + 1) } } },
        ],
        misconceptions: [
          { cell: '0:wert', answer: String(r.min), error: 'grenzwert-gueltig-ungueltig', why: `${r.min} ist noch **gültig**. Der direkte ungültige Nachbar ist ${r.min - 1}.` },
          { cell: '3:wert', answer: String(r.max), error: 'grenzwert-gueltig-ungueltig', why: `${r.max} ist noch **gültig**. Der direkte ungültige Nachbar ist ${r.max + 1}.` },
          { cell: '1:wert', answer: String(r.min + 1), error: 'grenzwert-daneben', why: `Der kleinste gültige Wert ist die Grenze selbst: ${r.min}.` },
          { cell: '2:wert', answer: String(r.max - 1), error: 'grenzwert-daneben', why: `Der größte gültige Wert ist die Grenze selbst: ${r.max}.` },
        ],
        hints,
        explanation: `Äquivalenzklassen: ungültig (< ${r.min}) | **gültig (${r.min} … ${r.max})** | ungültig (> ${r.max})\n\n${table(['Grenze', 'Testwert', 'erwartet'], [['unten, ungültig', r.min - 1, 'Fehlermeldung'], ['unten, gültig', r.min, 'akzeptiert'], ['oben, gültig', r.max, 'akzeptiert'], ['oben, ungültig', r.max + 1, 'Fehlermeldung']])}\n\nFehler passieren besonders oft an Grenzen (z. B. \`>\` statt \`≥\` im Code) – deshalb testet man genau dort.`,
      };
      return q;
    }
    if (d === 2) {
      const g1 = rng.pick([5, 10, 20]);
      const g2 = g1 * rng.pick([3, 5]);
      const max = rng.pick([200, 250, 500]);
      const r1 = rng.pick([2, 3, 5]);
      const r2 = r1 * 2;
      const q: TableQuestion = {
        id: gid('p.testcases'), generated: true, kind: 'table', skill: 'qa.equivalence', difficulty: d,
        prompt: `Für eine Rabattfunktion gilt laut Anforderung (Bestellmenge, ganze Zahlen):\n\n| Bestellmenge | Rabatt |\n|---|---|\n| 1 bis unter ${g1} Stück | 0 % |\n| ab ${g1} bis unter ${g2} Stück | ${r1} % |\n| ab ${g2} Stück | ${r2} % |\n\nBestellungen über **${max} Stück** sind nicht zulässig, ebenso Mengen unter 1. Gib für jede Äquivalenzklasse den kleinsten und größten Wert an. (Für die unbeschränkte ungültige Klasse unten ist der größte Wert gefragt, oben der kleinste – die jeweils andere Grenze ist vorgegeben.)`,
        columns: [{ key: 'von', label: 'von', type: 'number' }, { key: 'bis', label: 'bis', type: 'number' }],
        rows: [
          { label: 'ÄK1: ungültig (zu klein)', cells: { von: { given: '−∞' }, bis: { answer: '0' } } },
          { label: 'ÄK2: gültig, 0 %', cells: { von: { answer: '1' }, bis: { answer: String(g1 - 1) } } },
          { label: `ÄK3: gültig, ${r1} %`, cells: { von: { answer: String(g1) }, bis: { answer: String(g2 - 1) } } },
          { label: `ÄK4: gültig, ${r2} %`, cells: { von: { answer: String(g2) }, bis: { answer: String(max) } } },
          { label: 'ÄK5: ungültig (zu groß)', cells: { von: { answer: String(max + 1) }, bis: { given: '+∞' } } },
        ],
        misconceptions: [
          { cell: '1:bis', answer: String(g1), error: 'grenzwert-unter', why: `„unter ${g1}“ schließt ${g1} **aus** → größter Wert ${g1 - 1}.` },
          { cell: '2:bis', answer: String(g2), error: 'grenzwert-unter', why: `„unter ${g2}“ schließt ${g2} **aus** → größter Wert ${g2 - 1}.` },
          { cell: '2:von', answer: String(g1 + 1), error: 'grenzwert-ab', why: `„ab ${g1}“ schließt ${g1} **ein**.` },
          { cell: '3:von', answer: String(g2 + 1), error: 'grenzwert-ab', why: `„ab ${g2}“ schließt ${g2} **ein**.` },
          { cell: '4:von', answer: String(max), error: 'grenzwert-gueltig-ungueltig', why: `${max} ist noch zulässig („über ${max}“ ist unzulässig).` },
        ],
        hints: ['„ab X“ = X gehört dazu (≥). „unter X“ = X gehört nicht dazu (<).', ...hints],
        explanation: `${table(['Klasse', 'Bereich', 'Grenzwerte zum Testen'], [['ÄK1 ungültig', '≤ 0', '0'], ['ÄK2 0 %', `1 … ${g1 - 1}`, `1 und ${g1 - 1}`], [`ÄK3 ${r1} %`, `${g1} … ${g2 - 1}`, `${g1} und ${g2 - 1}`], [`ÄK4 ${r2} %`, `${g2} … ${max}`, `${g2} und ${max}`], ['ÄK5 ungültig', `≥ ${max + 1}`, `${max + 1}`]])}\n\n5 Äquivalenzklassen (3 gültige, 2 ungültige). Aus jeder Klasse genügt für den Äquivalenzklassentest **ein** Repräsentant; die Grenzwertanalyse ergänzt die Werte an den Rändern.`,
      };
      return q;
    }
    // d === 3: Beträge mit Cent
    const maxEuro = rng.pick([500, 1000, 2500, 10000]);
    const minCent = rng.pick([1, 100, 1000]);
    const fmt = (c: number) => (c / 100).toFixed(2);
    const deEuro = (c: number) => (c / 100).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const maxCent = maxEuro * 100;
    const q: TableQuestion = {
      id: gid('p.testcases'), generated: true, kind: 'table', skill: 'qa.equivalence', difficulty: d,
      prompt: `Eine Funktion für Spesenerstattungen akzeptiert Beträge **von ${deEuro(minCent)} € bis ${deEuro(maxCent)} €** (einschließlich). Beträge werden **auf den Cent genau** (zwei Nachkommastellen) eingegeben. Bestimme die vier Grenzwerte (in Euro, z. B. 12,34).`,
      columns: [{ key: 'wert', label: 'Testwert in €', type: 'number' }],
      rows: [
        { label: 'größter ungültiger Betrag unterhalb', cells: { wert: { answer: fmt(minCent - 1) } } },
        { label: 'kleinster gültiger Betrag', cells: { wert: { answer: fmt(minCent) } } },
        { label: 'größter gültiger Betrag', cells: { wert: { answer: fmt(maxCent) } } },
        { label: 'kleinster ungültiger Betrag oberhalb', cells: { wert: { answer: fmt(maxCent + 1) } } },
      ],
      misconceptions: [
        ...(minCent >= 100 ? [fmt(minCent - 100), fmt(minCent - 100).replace('.', ','), String(minCent / 100 - 1)] : []).map((answer) => ({ cell: '0:wert', answer, error: 'grenzwert-schrittweite', why: 'Bei Cent-Beträgen ist der direkte Nachbar 0,01 € entfernt, nicht 1 €.' })),
        ...[fmt(maxCent + 100), fmt(maxCent + 100).replace('.', ','), String(maxEuro + 1)].map((answer) => ({ cell: '3:wert', answer, error: 'grenzwert-schrittweite', why: 'Bei Cent-Beträgen ist der direkte Nachbar 0,01 € entfernt, nicht 1 €.' })),
        ...[fmt(minCent), fmt(minCent).replace('.', ',')].map((answer) => ({ cell: '0:wert', answer, error: 'grenzwert-gueltig-ungueltig', why: `${deEuro(minCent)} € ist noch **gültig**. Gesucht ist der direkte ungültige Nachbar.` })),
        ...[fmt(maxCent), fmt(maxCent).replace('.', ',')].map((answer) => ({ cell: '3:wert', answer, error: 'grenzwert-gueltig-ungueltig', why: `${deEuro(maxCent)} € ist noch **gültig**. Gesucht ist der direkte ungültige Nachbar.` })),
      ],
      hints,
      explanation: `Die kleinste Schrittweite ist **0,01 €**. Grenzwerte:\n\n${table(['Grenze', 'Testwert', 'erwartet'], [['unten, ungültig', deEuro(minCent - 1) + ' €', 'abgelehnt'], ['unten, gültig', deEuro(minCent) + ' €', 'akzeptiert'], ['oben, gültig', deEuro(maxCent) + ' €', 'akzeptiert'], ['oben, ungültig', deEuro(maxCent + 1) + ' €', 'abgelehnt']])}\n\nZusätzlich sinnvoll (ungültige Äquivalenzklassen ohne Grenzwert): Text statt Zahl, drei Nachkommastellen, leeres Feld.`,
    };
    return q;
  },
};

/* ------------------------------------------------------------------ */

export const GENERATORS_PROGRAMMIERUNG: GeneratorMeta[] = [arith, logicGen, traceLoop, traceBranch, arrayAggregate, arraySearch, arraySort, funcGen, testcaseGen];

/** nur für Tests: erzeugt eine Aufgabe ohne Registrierung im zentralen Generator-Verzeichnis */
export function makeProgrammierung(id: string, d: Difficulty, seed: number): Question {
  const g = GENERATORS_PROGRAMMIERUNG.find((x) => x.id === id);
  if (!g) throw new Error(id);
  return g.make(new Rng(seed), d);
}
