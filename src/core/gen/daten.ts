/**
 * Aufgaben-Generatoren für den Bereich „Datenbanken und Datendarstellung“ (Module d01–d04).
 *
 * Alle Ergebnisse werden in reinem TypeScript exakt berechnet (kein SQL im Browser).
 * Die Abfragen in den Aufgabentexten sind Standard-SQL; die Lösungen wurden zur
 * Qualitätssicherung zusätzlich mit SQLite gegengeprüft.
 */
import type { Difficulty, NumberQuestion, Question, SingleChoiceQuestion, TableQuestion } from '../../content/types';
import type { GeneratorMeta } from '../generators';
import { Rng } from '../rng';
import { grade } from '../grading';

let counter = 0;
const gid = (g: string) => `gen:${g}:${Date.now().toString(36)}${(counter++).toString(36)}`;
const fmt = (n: number, d = 2) => n.toLocaleString('de-DE', { maximumFractionDigits: d });
const round2 = (x: number) => Math.round((x + Number.EPSILON) * 100) / 100;
const sqlBlock = (s: string) => '```sql\n' + s + '\n```';

type Mc = { answer: number; error: string; why: string };

/** Zahlenaufgabe bauen; Fehlbilder, die (innerhalb der Toleranz) der Lösung entsprechen, entfernen. */
function numQ(
  genId: string,
  skill: string,
  d: Difficulty,
  o: { prompt: string; answer: number; tolerance?: number; accept?: number[]; unit?: string; hints: string[]; explanation: string; mcs?: Mc[] },
): NumberQuestion {
  const tol = o.tolerance ?? 0;
  const seen = new Set<string>();
  const misconceptions = (o.mcs ?? [])
    .filter((m) => Number.isFinite(m.answer) && Math.abs(m.answer - o.answer) > tol + 1e-9)
    .map((m) => ({ answer: String(m.answer), error: m.error, why: m.why }))
    .filter((m) => (seen.has(m.answer) ? false : (seen.add(m.answer), true)));
  const q: NumberQuestion = {
    id: gid(genId),
    generated: true,
    kind: 'number',
    skill,
    difficulty: d,
    prompt: o.prompt,
    answer: o.answer,
    hints: o.hints,
    misconceptions,
    explanation: o.explanation,
  };
  if (tol) q.tolerance = tol;
  const acc = (o.accept ?? []).filter((a) => Math.abs(a - o.answer) > tol + 1e-9);
  if (acc.length) q.accept = acc;
  if (o.unit) q.unit = o.unit;
  // Sicherheitsnetz wie in generate(): kein Fehlbild darf als richtig gelten
  q.misconceptions = q.misconceptions!.filter((m) => !grade(q, m.answer).correct);
  return q;
}

/* ------------------------------------------------------------------ */
/* Zufällige Inventartabelle                                           */
/* ------------------------------------------------------------------ */

interface GRow {
  InvNr: string;
  Typ: string;
  Hersteller: string;
  Preis: number | null;
  Kaufjahr: number;
  Standort: string;
  PersNr: number | null;
}

const TYPES: { typ: string; min: number; max: number; herst: string[] }[] = [
  { typ: 'Notebook', min: 75, max: 160, herst: ['Lenovo', 'Dell', 'HP'] },
  { typ: 'Monitor', min: 15, max: 45, herst: ['Dell', 'LG', 'Samsung'] },
  { typ: 'Desktop', min: 60, max: 120, herst: ['Lenovo', 'Dell', 'HP'] },
  { typ: 'Drucker', min: 25, max: 90, herst: ['HP', 'Brother', 'Kyocera'] },
  { typ: 'Smartphone', min: 30, max: 110, herst: ['Samsung', 'Apple'] },
];
const STANDORTE = ['Hamburg', 'Berlin'];

function makeGeraete(rng: Rng, n: number, withPersNr: boolean): GRow[] {
  // mindestens 2 Notebooks und 2 Monitore, damit Gruppen und Filter sinnvoll sind
  const typs = ['Notebook', 'Notebook', 'Monitor', 'Monitor'];
  while (typs.length < n) typs.push(rng.pick(['Notebook', 'Notebook', 'Monitor', 'Desktop', 'Drucker', 'Smartphone']));
  const order = rng.shuffle(typs);
  const rows: GRow[] = order.map((typ, i) => {
    const t = TYPES.find((x) => x.typ === typ)!;
    return {
      InvNr: `G${String(i + 1).padStart(2, '0')}`,
      Typ: typ,
      Hersteller: rng.pick(t.herst),
      Preis: rng.int(t.min, t.max) * 10,
      Kaufjahr: rng.int(2021, 2026),
      Standort: rng.pick(STANDORTE),
      PersNr: withPersNr ? (rng.bool(0.25) ? null : rng.int(101, 106)) : null,
    };
  });
  // beide Standorte vorhanden
  if (rows.every((r) => r.Standort === rows[0].Standort)) rows[rows.length - 1].Standort = STANDORTE.find((s) => s !== rows[0].Standort)!;
  if (withPersNr) {
    if (!rows.some((r) => r.PersNr === null)) rows[rng.int(0, rows.length - 1)].PersNr = null;
    if (rows.filter((r) => r.PersNr !== null).length < 2) rows.forEach((r, i) => i % 2 === 0 && (r.PersNr = 101 + (i % 6)));
  }
  return rows;
}

const cell = (v: string | number | null) => (v === null ? 'NULL' : String(v));

function geraetTable(rows: GRow[], withPersNr: boolean): string {
  const cols: (keyof GRow)[] = ['InvNr', 'Typ', 'Hersteller', 'Preis', 'Kaufjahr', 'Standort'];
  if (withPersNr) cols.push('PersNr');
  return (
    `Tabelle **Geraet**:\n\n| ${cols.join(' | ')} |\n|${cols.map(() => '---').join('|')}|\n` +
    rows.map((r) => `| ${cols.map((c) => cell(r[c])).join(' | ')} |`).join('\n')
  );
}

/** Lösungstabelle: InvNr + ausgewählte Spalten + ✔/✘ */
function checkTable(rows: GRow[], cols: (keyof GRow)[], test: (r: GRow) => boolean): string {
  return (
    `| InvNr | ${cols.join(' | ')} | erfüllt? |\n|---|${cols.map(() => '---|').join('')}---|\n` +
    rows.map((r) => `| ${r.InvNr} | ${cols.map((c) => cell(r[c])).join(' | ')} | ${test(r) ? '✔' : '✘'} |`).join('\n')
  );
}

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
const prices = (rows: GRow[]) => rows.map((r) => r.Preis).filter((p): p is number => p !== null);

/* ------------------------------------------------------------------ */
/* daten.zeilen – Wie viele Zeilen liefert die Abfrage?                */
/* ------------------------------------------------------------------ */

interface Cond {
  where: string;
  test: (r: GRow) => boolean;
  cols: (keyof GRow)[];
  hint: string;
  alts: { test: (r: GRow) => boolean; error: string; why: string }[];
}

function zeilenCond(rng: Rng, d: Difficulty, rows: GRow[]): Cond {
  const typ = rng.pick(['Notebook', 'Monitor']);
  const std = rng.pick(STANDORTE);
  const priceVals = [...new Set(prices(rows))].sort((a, b) => a - b);
  const pMid = priceVals[Math.min(priceVals.length - 1, rng.int(1, Math.max(1, priceVals.length - 2)))];
  const years = [...new Set(rows.map((r) => r.Kaufjahr))].sort();
  const year = years[rng.int(0, Math.max(0, years.length - 2))] ?? 2023;
  if (d === 1) {
    const v = rng.pick(['typ', 'preis', 'std', 'jahr'] as const);
    if (v === 'typ') return { where: `Typ = '${typ}'`, test: (r) => r.Typ === typ, cols: ['Typ'], hint: `Zähle alle Zeilen mit Typ ${typ}.`, alts: [] };
    if (v === 'std') return { where: `Standort = '${std}'`, test: (r) => r.Standort === std, cols: ['Standort'], hint: `Zähle alle Zeilen mit Standort ${std}.`, alts: [] };
    if (v === 'jahr')
      return {
        where: `Kaufjahr >= ${year}`, test: (r) => r.Kaufjahr >= year, cols: ['Kaufjahr'], hint: `>= schließt ${year} ein.`,
        alts: [{ test: (r) => r.Kaufjahr > year, error: 'sql-groesser-gleich', why: `>= schließt den Grenzwert ein: Geräte aus ${year} zählen mit.` }],
      };
    return {
      where: `Preis > ${pMid}`, test: (r) => (r.Preis ?? -1) > pMid, cols: ['Preis'], hint: `> bedeutet echt größer – ${pMid} selbst zählt nicht.`,
      alts: [{ test: (r) => (r.Preis ?? -1) >= pMid, error: 'sql-groesser-gleich', why: `> ist **echt** größer: Ein Gerät mit genau ${pMid} € erfüllt die Bedingung nicht.` }],
    };
  }
  if (d === 2) {
    const v = rng.pick(['and', 'or', 'between', 'in', 'ne'] as const);
    if (v === 'and')
      return {
        where: `Typ = '${typ}' AND Standort = '${std}'`, test: (r) => r.Typ === typ && r.Standort === std, cols: ['Typ', 'Standort'], hint: 'AND: beide Bedingungen müssen erfüllt sein.',
        alts: [
          { test: (r) => r.Typ === typ || r.Standort === std, error: 'sql-and-or-verwechselt', why: 'Du hast OR gerechnet. Bei AND müssen **beide** Bedingungen zutreffen.' },
          { test: (r) => r.Typ === typ, error: 'sql-and-ignoriert', why: `Du hast nur Typ = '${typ}' geprüft. Der Standort muss ebenfalls passen.` },
        ],
      };
    if (v === 'or')
      return {
        where: `Typ = '${typ}' OR Preis > ${pMid}`, test: (r) => r.Typ === typ || (r.Preis ?? -1) > pMid, cols: ['Typ', 'Preis'], hint: 'OR: Es genügt eine erfüllte Bedingung. Keine Zeile doppelt zählen.',
        alts: [
          { test: (r) => r.Typ === typ && (r.Preis ?? -1) > pMid, error: 'sql-and-or-verwechselt', why: 'Du hast AND gerechnet. Bei OR genügt **eine** erfüllte Bedingung.' },
          { test: (r) => r.Typ === typ || (r.Preis ?? -1) >= pMid, error: 'sql-groesser-gleich', why: `> ist echt größer: ${pMid} selbst zählt nicht.` },
        ],
      };
    if (v === 'between') {
      const lo = priceVals[rng.int(0, Math.max(0, Math.floor(priceVals.length / 2) - 1))];
      const hi = priceVals[rng.int(Math.min(priceVals.length - 1, Math.floor(priceVals.length / 2)), priceVals.length - 1)];
      return {
        where: `Preis BETWEEN ${lo} AND ${hi}`, test: (r) => r.Preis !== null && r.Preis >= lo && r.Preis <= hi, cols: ['Preis'], hint: 'BETWEEN schließt beide Grenzen ein.',
        alts: [{ test: (r) => r.Preis !== null && r.Preis > lo && r.Preis < hi, error: 'sql-between-grenzen', why: `BETWEEN schließt die Grenzen **ein**: ${lo} und ${hi} gehören dazu.` }],
      };
    }
    if (v === 'in') {
      const hs = [...new Set(rows.map((r) => r.Hersteller))];
      const pick2 = rng.shuffle(hs).slice(0, Math.min(2, hs.length));
      return {
        where: `Hersteller IN (${pick2.map((h) => `'${h}'`).join(', ')})`, test: (r) => pick2.includes(r.Hersteller), cols: ['Hersteller'], hint: 'IN (…) ist erfüllt, wenn der Wert in der Liste steht.',
        alts: [{ test: (r) => r.Hersteller === pick2[0], error: 'sql-in-liste', why: 'IN prüft **alle** Werte der Liste, nicht nur den ersten.' }],
      };
    }
    return {
      where: `Typ <> '${typ}'`, test: (r) => r.Typ !== typ, cols: ['Typ'], hint: '<> bedeutet ungleich.',
      alts: [{ test: (r) => r.Typ === typ, error: 'sql-ungleich', why: `<> bedeutet **ungleich**: gesucht sind alle Geräte, die **kein** ${typ} sind.` }],
    };
  }
  // d === 3
  const v = rng.pick(['prec', 'null', 'notnull', 'prec2'] as const);
  if (v === 'null' || v === 'notnull') {
    const isNull = v === 'null';
    return {
      where: isNull ? 'PersNr IS NULL' : 'PersNr IS NOT NULL',
      test: (r) => (isNull ? r.PersNr === null : r.PersNr !== null),
      cols: ['PersNr'],
      hint: 'NULL bedeutet „kein Wert“. IS NULL prüft genau das.',
      alts: isNull
        ? [{ test: () => false, error: 'sql-null-vergleich', why: '0 Zeilen käme bei `= NULL` heraus. `IS NULL` findet die Zeilen ohne Wert.' }]
        : [{ test: () => true, error: 'sql-null-vergleich', why: 'Zeilen mit PersNr NULL erfüllen IS NOT NULL nicht.' }],
    };
  }
  if (v === 'prec') {
    // Grenze = Preis eines Notebooks (nicht des billigsten): Dann gibt es Notebooks mit Preis >= Grenze,
    // und die falsche Klammerung führt garantiert zu einem anderen Ergebnis.
    const t1 = 'Notebook';
    const others = [...new Set(rows.filter((r) => r.Typ !== t1).map((r) => r.Typ))];
    const t2 = rng.pick(others);
    const nb = rows.filter((r) => r.Typ === t1).map((r) => r.Preis ?? 0).sort((a, b) => a - b);
    const p = nb[rng.int(1, nb.length - 1)];
    return {
      where: `Typ = '${t1}' OR Typ = '${t2}' AND Preis < ${p}`,
      test: (r) => r.Typ === t1 || (r.Typ === t2 && (r.Preis ?? 1e9) < p),
      cols: ['Typ', 'Preis'],
      hint: 'AND bindet stärker als OR – setze gedanklich Klammern.',
      alts: [{ test: (r) => (r.Typ === t1 || r.Typ === t2) && (r.Preis ?? 1e9) < p, error: 'sql-and-or-vorrang', why: `Du hast (… OR …) AND Preis < ${p} gerechnet. AND bindet stärker: Typ = '${t1}' OR (Typ = '${t2}' AND Preis < ${p}).` }],
    };
  }
  return {
    where: `Standort = '${std}' AND Typ = '${typ}' OR Kaufjahr >= ${year}`,
    test: (r) => (r.Standort === std && r.Typ === typ) || r.Kaufjahr >= year,
    cols: ['Standort', 'Typ', 'Kaufjahr'],
    hint: 'AND bindet stärker als OR: (Standort AND Typ) OR Kaufjahr.',
    alts: [{ test: (r) => r.Standort === std && (r.Typ === typ || r.Kaufjahr >= year), error: 'sql-and-or-vorrang', why: `Du hast Standort AND (Typ OR Kaufjahr) gerechnet. Richtig: (Standort = '${std}' AND Typ = '${typ}') OR Kaufjahr >= ${year}.` }],
  };
}

const zeilenGen: GeneratorMeta = {
  id: 'daten.zeilen',
  title: 'SQL: Wie viele Zeilen liefert die Abfrage?',
  skill: 'sql.select',
  module: 'd03',
  make(rng, d) {
    const n = d === 1 ? 6 : d === 2 ? 8 : 10;
    const withP = d === 3;
    const rows = makeGeraete(rng, n, withP);
    const c = zeilenCond(rng, d, rows);
    const ans = rows.filter(c.test).length;
    const mcs: Mc[] = c.alts.map((a) => ({ answer: rows.filter(a.test).length, error: a.error, why: a.why }));
    mcs.push({ answer: n, error: 'sql-where-ignoriert', why: `${n} ist die Anzahl aller Zeilen. WHERE lässt nur die passenden übrig.` });
    return numQ('daten.zeilen', 'sql.select', d, {
      prompt: `${geraetTable(rows, withP)}\n\n${sqlBlock(`SELECT InvNr FROM Geraet\nWHERE ${c.where};`)}\n\nWie viele Zeilen liefert die Abfrage?`,
      answer: ans,
      unit: 'Zeilen',
      hints: ['Prüfe die Bedingung Zeile für Zeile und hake ab.', c.hint],
      mcs,
      explanation: `Bedingung: \`${c.where}\`\n\n${checkTable(rows, c.cols, c.test)}\n\nErfüllt: ${rows.filter(c.test).map((r) => r.InvNr).join(', ') || '–'} → **${ans} Zeile${ans === 1 ? '' : 'n'}**.`,
    });
  },
};

/* ------------------------------------------------------------------ */
/* daten.aggregat – Aggregatfunktionen, GROUP BY, HAVING               */
/* ------------------------------------------------------------------ */

const aggregatGen: GeneratorMeta = {
  id: 'daten.aggregat',
  title: 'SQL: Aggregatfunktionen und GROUP BY auswerten',
  skill: 'sql.aggregat',
  module: 'd03',
  make(rng, d): Question {
    const n = d === 1 ? 6 : d === 2 ? 8 : 10;
    const withP = d === 3;
    const rows = makeGeraete(rng, n, withP);
    const typ = rng.pick(['Notebook', 'Monitor']);
    const std = rng.pick(STANDORTE);
    const allP = prices(rows);
    const G = 'daten.aggregat';
    const S = 'sql.aggregat';

    if (d === 1) {
      const v = rng.pick(['count', 'sum', 'max', 'min'] as const);
      if (v === 'count') {
        const sel = rows.filter((r) => r.Typ === typ);
        return numQ(G, S, d, {
          prompt: `${geraetTable(rows, false)}\n\n${sqlBlock(`SELECT COUNT(*) FROM Geraet\nWHERE Typ = '${typ}';`)}\n\nWelchen Wert liefert die Abfrage?`,
          answer: sel.length,
          hints: ['COUNT(*) zählt die Zeilen, die die WHERE-Bedingung erfüllen.'],
          mcs: [
            { answer: n, error: 'sql-where-ignoriert', why: `${n} sind alle Zeilen. WHERE beschränkt auf Typ ${typ}.` },
            { answer: sum(prices(sel)), error: 'sql-sum-statt-count', why: 'Das ist die Summe der Preise. COUNT zählt Zeilen.' },
          ],
          explanation: `Zeilen mit Typ ${typ}: ${sel.map((r) => r.InvNr).join(', ')} → COUNT(*) = **${sel.length}**.`,
        });
      }
      if (v === 'sum') {
        const sel = rows.filter((r) => r.Standort === std);
        const s = sum(prices(sel));
        return numQ(G, S, d, {
          prompt: `${geraetTable(rows, false)}\n\n${sqlBlock(`SELECT SUM(Preis) FROM Geraet\nWHERE Standort = '${std}';`)}\n\nWelchen Wert liefert die Abfrage?`,
          answer: s,
          unit: '€',
          hints: [`Wähle alle Zeilen mit Standort ${std}.`, 'Addiere deren Preise.'],
          mcs: [
            { answer: sum(allP), error: 'sql-where-ignoriert', why: 'Das ist die Summe aller Geräte. WHERE beschränkt auf einen Standort.' },
            { answer: sel.length, error: 'sql-count-statt-sum', why: 'Das ist die Anzahl der Geräte (COUNT). SUM addiert die Preise.' },
          ],
          explanation: `Standort ${std}: ${sel.map((r) => `${r.InvNr} (${r.Preis})`).join(', ')}\n\nSUM(Preis) = ${prices(sel).join(' + ')} = **${s}**`,
        });
      }
      const isMax = v === 'max';
      const sel = rows.filter((r) => r.Typ === typ);
      const ps = prices(sel);
      const val = isMax ? Math.max(...ps) : Math.min(...ps);
      return numQ(G, S, d, {
        prompt: `${geraetTable(rows, false)}\n\n${sqlBlock(`SELECT ${isMax ? 'MAX' : 'MIN'}(Preis) FROM Geraet\nWHERE Typ = '${typ}';`)}\n\nWelchen Wert liefert die Abfrage?`,
        answer: val,
        unit: '€',
        hints: [`Betrachte nur die Zeilen mit Typ ${typ}.`, `${isMax ? 'MAX' : 'MIN'} liefert den ${isMax ? 'größten' : 'kleinsten'} Wert.`],
        mcs: [
          { answer: isMax ? Math.max(...allP) : Math.min(...allP), error: 'sql-where-ignoriert', why: `Das ist der ${isMax ? 'größte' : 'kleinste'} Preis aller Geräte. WHERE beschränkt auf ${typ}.` },
          { answer: isMax ? Math.min(...ps) : Math.max(...ps), error: 'sql-min-max-verwechselt', why: `Du hast ${isMax ? 'MIN' : 'MAX'} statt ${isMax ? 'MAX' : 'MIN'} bestimmt.` },
        ],
        explanation: `Preise der ${typ}s: ${ps.join(', ')} → ${isMax ? 'MAX' : 'MIN'} = **${val}**`,
      });
    }

    if (d === 2) {
      const v = rng.pick(['avg', 'countAnd', 'sumYear'] as const);
      if (v === 'avg') {
        const sel = rows.filter((r) => r.Typ === typ);
        const ps = prices(sel);
        const avg = round2(sum(ps) / ps.length);
        return numQ(G, S, d, {
          prompt: `${geraetTable(rows, false)}\n\n${sqlBlock(`SELECT AVG(Preis) FROM Geraet\nWHERE Typ = '${typ}';`)}\n\nWelchen Wert liefert die Abfrage? Runde auf **zwei Nachkommastellen**.`,
          answer: avg,
          tolerance: 0.005,
          unit: '€',
          hints: [`Summe der ${typ}-Preise bilden.`, `Durch die Anzahl der ${typ}s teilen.`],
          mcs: [
            { answer: sum(ps), error: 'sql-sum-statt-avg', why: 'Das ist die Summe. AVG teilt noch durch die Anzahl.' },
            { answer: round2(sum(allP) / allP.length), error: 'sql-where-ignoriert', why: 'Das ist der Durchschnitt über alle Geräte. WHERE beschränkt auf einen Typ.' },
            { answer: round2(sum(ps) / n), error: 'sql-avg-nenner', why: `Du hast durch alle ${n} Zeilen geteilt. AVG teilt nur durch die Zeilen, die WHERE übrig lässt (${ps.length}).` },
          ],
          explanation: `${typ}s: ${sel.map((r) => `${r.InvNr} (${r.Preis})`).join(', ')}\n\nSumme: ${ps.join(' + ')} = ${sum(ps)}\n\nAVG = ${sum(ps)} / ${ps.length} = ${fmt(sum(ps) / ps.length, 4)} ≈ **${fmt(avg)}**`,
        });
      }
      if (v === 'countAnd') {
        const pv = [...new Set(allP)].sort((a, b) => a - b);
        const p = pv[Math.min(pv.length - 1, rng.int(1, Math.max(1, pv.length - 2)))];
        const test = (r: GRow) => (r.Preis ?? -1) > p && r.Standort === std;
        const sel = rows.filter(test);
        return numQ(G, S, d, {
          prompt: `${geraetTable(rows, false)}\n\n${sqlBlock(`SELECT COUNT(*) FROM Geraet\nWHERE Preis > ${p} AND Standort = '${std}';`)}\n\nWelchen Wert liefert die Abfrage?`,
          answer: sel.length,
          hints: ['Beide Bedingungen müssen erfüllt sein.', `> ${p} bedeutet echt größer.`],
          mcs: [
            { answer: rows.filter((r) => (r.Preis ?? -1) >= p && r.Standort === std).length, error: 'sql-groesser-gleich', why: `> ist echt größer: Ein Preis von genau ${p} zählt nicht.` },
            { answer: rows.filter((r) => (r.Preis ?? -1) > p || r.Standort === std).length, error: 'sql-and-or-verwechselt', why: 'Du hast OR gerechnet. AND verlangt beide Bedingungen.' },
            { answer: rows.filter((r) => (r.Preis ?? -1) > p).length, error: 'sql-and-ignoriert', why: `Der Standort ${std} muss ebenfalls passen.` },
          ],
          explanation: `${checkTable(rows, ['Preis', 'Standort'], test)}\n\nCOUNT(*) = **${sel.length}**`,
        });
      }
      const years = [...new Set(rows.map((r) => r.Kaufjahr))].sort();
      const y = years[rng.int(1, Math.max(1, years.length - 1))] ?? years[0];
      const test = (r: GRow) => r.Kaufjahr >= y;
      const sel = rows.filter(test);
      const s = sum(prices(sel));
      return numQ(G, S, d, {
        prompt: `${geraetTable(rows, false)}\n\n${sqlBlock(`SELECT SUM(Preis) FROM Geraet\nWHERE Kaufjahr >= ${y};`)}\n\nWelchen Wert liefert die Abfrage?`,
        answer: s,
        unit: '€',
        hints: [`>= ${y} schließt das Jahr ${y} ein.`],
        mcs: [
          { answer: sum(prices(rows.filter((r) => r.Kaufjahr > y))), error: 'sql-groesser-gleich', why: `>= schließt ${y} ein – die Geräte aus ${y} zählen mit.` },
          { answer: sel.length, error: 'sql-count-statt-sum', why: 'Das ist die Anzahl. SUM addiert die Preise.' },
          { answer: sum(allP), error: 'sql-where-ignoriert', why: 'Das ist die Summe aller Geräte.' },
        ],
        explanation: `${checkTable(rows, ['Kaufjahr', 'Preis'], test)}\n\nSUM(Preis) = ${prices(sel).join(' + ') || '0'} = **${s}**`,
      });
    }

    // d === 3
    const v = rng.pick(['countCol', 'avgNull', 'having', 'havingSum'] as const);
    if (v === 'countCol') {
      const sel = rows.filter((r) => r.Standort === std);
      const cnt = sel.filter((r) => r.PersNr !== null).length;
      return numQ(G, S, d, {
        prompt: `${geraetTable(rows, true)}\n\n${sqlBlock(`SELECT COUNT(PersNr) FROM Geraet\nWHERE Standort = '${std}';`)}\n\nWelchen Wert liefert die Abfrage?`,
        answer: cnt,
        hints: ['COUNT(Spalte) zählt nur Zeilen, in denen die Spalte nicht NULL ist.'],
        mcs: [
          { answer: sel.length, error: 'sql-count-null', why: 'Das wäre COUNT(*). COUNT(PersNr) lässt Zeilen mit PersNr NULL aus.' },
          { answer: rows.filter((r) => r.PersNr !== null).length, error: 'sql-where-ignoriert', why: `Das ist COUNT(PersNr) über alle Standorte. WHERE beschränkt auf ${std}.` },
        ],
        explanation: `${checkTable(sel, ['Standort', 'PersNr'], (r) => r.PersNr !== null)}\n\n${sel.length} Zeilen in ${std}, davon ${sel.length - cnt} mit PersNr NULL → COUNT(PersNr) = **${cnt}**`,
      });
    }
    if (v === 'avgNull') {
      // ein bis zwei Preise unbekannt (NULL)
      const idx = rng.shuffle(rows.map((_, i) => i)).slice(0, rng.int(1, 2));
      idx.forEach((i) => (rows[i].Preis = null));
      const ps = prices(rows);
      const avg = round2(sum(ps) / ps.length);
      return numQ(G, S, d, {
        prompt: `Bei einigen Geräten wurde der Preis noch nicht erfasst (NULL).\n\n${geraetTable(rows, false)}\n\n${sqlBlock(`SELECT AVG(Preis) FROM Geraet;`)}\n\nWelchen Wert liefert die Abfrage? Runde auf **zwei Nachkommastellen**.`,
        answer: avg,
        tolerance: 0.005,
        unit: '€',
        hints: ['AVG ignoriert NULL-Werte – sowohl in der Summe als auch beim Zählen.'],
        mcs: [
          { answer: round2(sum(ps) / n), error: 'sql-avg-null', why: `Du hast durch alle ${n} Zeilen geteilt. AVG teilt nur durch die ${ps.length} Werte ungleich NULL.` },
          { answer: sum(ps), error: 'sql-sum-statt-avg', why: 'Das ist die Summe. AVG teilt noch durch die Anzahl.' },
        ],
        explanation: `Werte ungleich NULL: ${ps.length} von ${n}\n\nSumme: ${ps.join(' + ')} = ${sum(ps)}\n\nAVG = ${sum(ps)} / ${ps.length} = ${fmt(sum(ps) / ps.length, 4)} ≈ **${fmt(avg)}**\n\n(Teilt man fälschlich durch ${n}, erhält man ${fmt(round2(sum(ps) / n))}.)`,
      });
    }
    if (v === 'having') {
      const groups = new Map<string, number>();
      rows.forEach((r) => groups.set(r.Typ, (groups.get(r.Typ) ?? 0) + 1));
      const k = rng.pick([2, 3]);
      const ans = [...groups.values()].filter((c) => c >= k).length;
      return numQ(G, S, d, {
        prompt: `${geraetTable(rows, true)}\n\n${sqlBlock(`SELECT Typ, COUNT(*) FROM Geraet\nGROUP BY Typ\nHAVING COUNT(*) >= ${k};`)}\n\nWie viele Zeilen liefert die Abfrage?`,
        answer: ans,
        unit: 'Zeilen',
        hints: ['Bilde zuerst die Gruppen je Typ und zähle ihre Zeilen.', `HAVING behält nur Gruppen mit mindestens ${k} Zeilen.`],
        mcs: [
          { answer: groups.size, error: 'sql-having-ignoriert', why: `${groups.size} ist die Zahl aller Gruppen. HAVING filtert Gruppen heraus.` },
          { answer: [...groups.values()].filter((c) => c > k).length, error: 'sql-groesser-gleich', why: `>= ${k} schließt Gruppen mit genau ${k} Zeilen ein.` },
          { answer: sum([...groups.values()].filter((c) => c >= k)), error: 'sql-groupby-zeilen', why: 'Das ist die Zahl der Geräte in den Gruppen. Das Ergebnis hat aber eine Zeile **je Gruppe**.' },
        ],
        explanation: `| Typ | COUNT(*) | >= ${k}? |\n|---|---|---|\n${[...groups.entries()].map(([t, c]) => `| ${t} | ${c} | ${c >= k ? '✔' : '✘'} |`).join('\n')}\n\n→ **${ans} Zeile${ans === 1 ? '' : 'n'}**`,
      });
    }
    // havingSum: Summe je Standort, Grenze zwischen den beiden Summen
    const sums = STANDORTE.map((s) => sum(prices(rows.filter((r) => r.Standort === s))));
    const lo = Math.min(...sums);
    const hi = Math.max(...sums);
    const x = lo === hi ? lo - 100 : Math.floor((lo + (hi - lo) * rng.pick([0.3, 0.5, 0.7])) / 10) * 10;
    const ans = sums.filter((s) => s > x).length;
    return numQ(G, S, d, {
      prompt: `${geraetTable(rows, true)}\n\n${sqlBlock(`SELECT Standort, SUM(Preis) FROM Geraet\nGROUP BY Standort\nHAVING SUM(Preis) > ${x};`)}\n\nWie viele Zeilen liefert die Abfrage?`,
      answer: ans,
      unit: 'Zeilen',
      hints: ['Bilde je Standort die Summe der Preise.', `HAVING behält nur Standorte mit Summe über ${x}.`],
      mcs: [
        { answer: rows.filter((r) => (r.Preis ?? 0) > x).length, error: 'sql-where-statt-having', why: 'Du hast einzelne Geräte geprüft (wie WHERE Preis > …). HAVING prüft die **Summe je Gruppe**.' },
        { answer: STANDORTE.length, error: 'sql-having-ignoriert', why: 'Das ist die Zahl aller Gruppen. HAVING filtert Gruppen heraus.' },
      ],
      explanation: `| Standort | SUM(Preis) | > ${x}? |\n|---|---|---|\n${STANDORTE.map((s, i) => `| ${s} | ${sums[i]} | ${sums[i] > x ? '✔' : '✘'} |`).join('\n')}\n\n→ **${ans} Zeile${ans === 1 ? '' : 'n'}**`,
    });
  },
};

/* ------------------------------------------------------------------ */
/* daten.join – INNER JOIN / LEFT JOIN                                  */
/* ------------------------------------------------------------------ */

const NAMES = ['Weber', 'Yilmaz', 'Schulz', 'Nowak', 'Becker', 'Krüger', 'Hoffmann', 'Demir'];
const ABTEILUNGEN = ['IT', 'Vertrieb', 'Buchhaltung', 'Lager'];

const joinGen: GeneratorMeta = {
  id: 'daten.join',
  title: 'SQL: Ergebnis eines JOINs bestimmen',
  skill: 'sql.join',
  module: 'd03',
  make(rng, d) {
    const m = d === 1 ? 4 : d === 2 ? 5 : 6;
    const g = d === 1 ? 5 : d === 2 ? 7 : 8;
    const names = rng.shuffle(NAMES).slice(0, m);
    const ma = names.map((name, i) => ({ PersNr: 101 + i, Name: name, Abteilung: rng.pick(ABTEILUNGEN) }));
    const frei = rng.int(0, m - 1); // diese Person bekommt kein Gerät
    const others = ma.filter((_, i) => i !== frei);
    const ger = Array.from({ length: g }, (_, i) => {
      const t = rng.pick(TYPES);
      return {
        InvNr: `G${String(i + 1).padStart(2, '0')}`,
        Typ: t.typ,
        Preis: rng.int(t.min, t.max) * 10,
        PersNr: d >= 2 && rng.bool(0.2) ? null : (rng.pick(others).PersNr as number | null),
      };
    });
    if (d >= 2 && !ger.some((x) => x.PersNr === null)) ger[rng.int(0, g - 1)].PersNr = null;
    const cnt = (p: number) => ger.filter((x) => x.PersNr === p).length;
    const inner = ger.filter((x) => x.PersNr !== null).length;
    const leftMa = sum(ma.map((p) => Math.max(1, cnt(p.PersNr))));
    const noDev = ma.filter((p) => cnt(p.PersNr) === 0);

    const tMa = `Tabelle **Mitarbeiter**:\n\n| PersNr | Name | Abteilung |\n|---|---|---|\n${ma.map((p) => `| ${p.PersNr} | ${p.Name} | ${p.Abteilung} |`).join('\n')}`;
    const tGe = `Tabelle **Geraet**:\n\n| InvNr | Typ | Preis | PersNr |\n|---|---|---|---|\n${ger.map((x) => `| ${x.InvNr} | ${x.Typ} | ${x.Preis} | ${cell(x.PersNr)} |`).join('\n')}`;
    const perPerson = `| Person | Geräte | Zeilen im LEFT JOIN |\n|---|---|---|\n${ma.map((p) => `| ${p.PersNr} ${p.Name} | ${ger.filter((x) => x.PersNr === p.PersNr).map((x) => x.InvNr).join(', ') || '–'} | ${Math.max(1, cnt(p.PersNr))} |`).join('\n')}`;
    const baseMcs: Mc[] = [
      { answer: m * g, error: 'sql-kartesisches-produkt', why: `${m * g} = ${m} · ${g} wäre das kartesische Produkt (ohne ON-Bedingung).` },
    ];
    const G = 'daten.join';
    const S = 'sql.join';

    const variants = d === 1 ? (['inner', 'leftMa'] as const) : d === 2 ? (['inner', 'leftMa', 'leftGe'] as const) : (['leftMa', 'noDev', 'sumAbt', 'leftGe'] as const);
    const v = rng.pick(variants as readonly string[]);
    if (v === 'inner') {
      return numQ(G, S, d, {
        prompt: `${tMa}\n\n${tGe}\n\n${sqlBlock(`SELECT m.Name, g.InvNr\nFROM Mitarbeiter m\nINNER JOIN Geraet g ON m.PersNr = g.PersNr;`)}\n\nWie viele Zeilen liefert die Abfrage?`,
        answer: inner,
        unit: 'Zeilen',
        hints: ['INNER JOIN: nur Paare, bei denen PersNr in beiden Tabellen vorkommt.', 'Zähle die Geräte, deren PersNr zu einer Person gehört.'],
        mcs: [
          ...baseMcs,
          { answer: leftMa, error: 'sql-inner-left-verwechselt', why: 'Das wäre der LEFT JOIN (Personen ohne Gerät mit NULL). INNER JOIN zeigt nur Paare.' },
          { answer: g, error: 'sql-inner-left-verwechselt', why: 'Geräte ohne PersNr (NULL) haben keinen Partner und fallen beim INNER JOIN heraus.' },
          { answer: m, error: 'sql-join-zeilen', why: 'Eine Person mit mehreren Geräten erscheint mehrfach; eine ohne Gerät gar nicht.' },
        ],
        explanation: `Jedes Gerät mit gültiger PersNr ergibt genau eine Zeile:\n\n${ger.map((x) => `- ${x.InvNr}: ${x.PersNr === null ? 'PersNr NULL → kein Partner ✘' : `${x.PersNr} ${ma.find((p) => p.PersNr === x.PersNr)!.Name} ✔`}`).join('\n')}\n\n→ **${inner} Zeilen**. ${noDev.map((p) => p.Name).join(', ')} (ohne Gerät) erscheint nicht.`,
      });
    }
    if (v === 'leftMa') {
      return numQ(G, S, d, {
        prompt: `${tMa}\n\n${tGe}\n\n${sqlBlock(`SELECT m.Name, g.InvNr\nFROM Mitarbeiter m\nLEFT JOIN Geraet g ON m.PersNr = g.PersNr;`)}\n\nWie viele Zeilen liefert die Abfrage?`,
        answer: leftMa,
        unit: 'Zeilen',
        hints: ['LEFT JOIN: jede Person der linken Tabelle erscheint mindestens einmal.', 'Eine Person mit k Geräten erscheint k-mal.'],
        mcs: [
          ...baseMcs,
          { answer: inner, error: 'sql-inner-left-verwechselt', why: 'Das wäre der INNER JOIN. Beim LEFT JOIN erscheinen auch Personen ohne Gerät (mit NULL).' },
          { answer: m, error: 'sql-left-join-zeilen', why: 'Personen mit mehreren Geräten erscheinen mehrfach.' },
          { answer: g, error: 'sql-left-join-seite', why: 'Links steht Mitarbeiter, nicht Geraet. Geräte ohne Person erscheinen nicht.' },
        ],
        explanation: `${perPerson}\n\nSumme: **${leftMa} Zeilen**`,
      });
    }
    if (v === 'leftGe') {
      return numQ(G, S, d, {
        prompt: `${tMa}\n\n${tGe}\n\n${sqlBlock(`SELECT g.InvNr, m.Name\nFROM Geraet g\nLEFT JOIN Mitarbeiter m ON g.PersNr = m.PersNr;`)}\n\nWie viele Zeilen liefert die Abfrage?`,
        answer: g,
        unit: 'Zeilen',
        hints: ['Welche Tabelle steht links?', 'Jedes Gerät hat höchstens eine Person.'],
        mcs: [
          ...baseMcs,
          { answer: inner, error: 'sql-inner-left-verwechselt', why: 'Beim LEFT JOIN bleiben auch Geräte ohne Person erhalten (Name = NULL).' },
          { answer: leftMa, error: 'sql-left-join-seite', why: 'Links steht hier Geraet. Personen ohne Gerät erscheinen nicht.' },
        ],
        explanation: `Links steht **Geraet**: Jedes der ${g} Geräte erscheint genau einmal (jedes gehört höchstens einer Person). Geräte mit PersNr NULL erhalten Name = NULL → **${g} Zeilen**.`,
      });
    }
    if (v === 'noDev') {
      return numQ(G, S, d, {
        prompt: `${tMa}\n\n${tGe}\n\n${sqlBlock(`SELECT m.Name\nFROM Mitarbeiter m\nLEFT JOIN Geraet g ON m.PersNr = g.PersNr\nWHERE g.InvNr IS NULL;`)}\n\nWie viele Zeilen liefert die Abfrage?`,
        answer: noDev.length,
        unit: 'Zeilen',
        hints: ['Der LEFT JOIN liefert für Personen ohne Gerät eine Zeile mit g.InvNr = NULL.', 'WHERE behält genau diese Zeilen.'],
        mcs: [
          { answer: ger.filter((x) => x.PersNr === null).length, error: 'sql-left-join-seite', why: 'Das sind die Geräte ohne Person. Gefragt sind Personen ohne Gerät.' },
          { answer: 0, error: 'sql-inner-left-verwechselt', why: 'Beim LEFT JOIN entstehen für Personen ohne Gerät Zeilen mit NULL – die findet IS NULL.' },
        ],
        explanation: `${perPerson}\n\nOhne Gerät: ${noDev.map((p) => p.Name).join(', ')} → **${noDev.length} Zeile${noDev.length === 1 ? '' : 'n'}**`,
      });
    }
    // sumAbt
    const abtMitGeraet = [...new Set(ger.filter((x) => x.PersNr !== null).map((x) => ma.find((p) => p.PersNr === x.PersNr)!.Abteilung))];
    const abt = rng.pick(abtMitGeraet);
    const pers = ma.filter((p) => p.Abteilung === abt).map((p) => p.PersNr);
    const sel = ger.filter((x) => x.PersNr !== null && pers.includes(x.PersNr));
    const s = sum(sel.map((x) => x.Preis));
    return numQ(G, S, d, {
      prompt: `${tMa}\n\n${tGe}\n\n${sqlBlock(`SELECT SUM(g.Preis)\nFROM Geraet g\nINNER JOIN Mitarbeiter m ON g.PersNr = m.PersNr\nWHERE m.Abteilung = '${abt}';`)}\n\nWelchen Wert liefert die Abfrage?`,
      answer: s,
      unit: '€',
      hints: [`Welche Personen arbeiten in der Abteilung ${abt}?`, 'Addiere die Preise ihrer Geräte.'],
      mcs: [
        { answer: sel.length, error: 'sql-count-statt-sum', why: 'Das ist die Anzahl der Geräte. SUM addiert die Preise.' },
        { answer: sum(ger.map((x) => x.Preis)), error: 'sql-where-ignoriert', why: 'Das ist der Wert aller Geräte. WHERE beschränkt auf eine Abteilung.' },
      ],
      explanation: `${abt}: ${ma.filter((p) => p.Abteilung === abt).map((p) => `${p.PersNr} ${p.Name}`).join(', ')}\n\nGeräte: ${sel.map((x) => `${x.InvNr} (${x.Preis})`).join(', ')}\n\nSUM = ${sel.map((x) => x.Preis).join(' + ')} = **${s}**`,
    });
  },
};

/* ------------------------------------------------------------------ */
/* Kardinalität und Fremdschlüssel-Platzierung                         */
/* ------------------------------------------------------------------ */

type Card = '1:1' | '1:n' | 'n:m';
interface Scn {
  a: string;
  b: string;
  pkA: string;
  pkB: string;
  card: Card;
  text: string;
  level: 1 | 2 | 3;
}

/** Bei 1:n ist a immer die 1-Seite; bei 1:1 ist b die Seite, die immer einen Partner hat (dort steht der FK). */
const SCENARIOS: Scn[] = [
  { a: 'Standort', b: 'Mitarbeiter', pkA: 'StandortID', pkB: 'PersNr', card: '1:n', level: 1, text: 'An einem Standort arbeiten viele Mitarbeitende. Jede Person ist genau einem Standort zugeordnet.' },
  { a: 'Abteilung', b: 'Mitarbeiter', pkA: 'AbtNr', pkB: 'PersNr', card: '1:n', level: 1, text: 'Eine Abteilung hat mehrere Mitarbeitende. Jede Person gehört zu genau einer Abteilung.' },
  { a: 'Kunde', b: 'Auftrag', pkA: 'KundenNr', pkB: 'AuftragsNr', card: '1:n', level: 1, text: 'Ein Kunde erteilt viele Aufträge. Jeder Auftrag stammt von genau einem Kunden.' },
  { a: 'Raum', b: 'Netzwerkdose', pkA: 'RaumNr', pkB: 'DosenNr', card: '1:n', level: 1, text: 'In einem Raum gibt es mehrere Netzwerkdosen. Jede Dose befindet sich in genau einem Raum.' },
  { a: 'Mitarbeiter', b: 'Geraet', pkA: 'PersNr', pkB: 'InvNr', card: '1:n', level: 2, text: 'Eine Person kann mehrere Geräte nutzen, manche nutzen keins. Ein Gerät ist höchstens einer Person fest zugeordnet; Lagergeräte gehören niemandem.' },
  { a: 'Switch', b: 'Switchport', pkA: 'SwitchID', pkB: 'PortID', card: '1:n', level: 2, text: 'Ein Switch hat 24 oder 48 Ports. Jeder Port gehört zu genau einem Switch.' },
  { a: 'Hersteller', b: 'Geraet', pkA: 'HerstellerID', pkB: 'InvNr', card: '1:n', level: 2, text: 'Von einem Hersteller besitzt die Firma viele Geräte. Jedes Gerät stammt von genau einem Hersteller.' },
  { a: 'Lieferant', b: 'Bestellung', pkA: 'LieferantNr', pkB: 'BestellNr', card: '1:n', level: 2, text: 'Bei einem Lieferanten wird regelmäßig bestellt. Jede Bestellung geht an genau einen Lieferanten.' },
  { a: 'Geraet', b: 'Software', pkA: 'InvNr', pkB: 'SoftwareID', card: 'n:m', level: 1, text: 'Auf einem Gerät sind mehrere Programme installiert. Ein Programm ist auf vielen Geräten installiert.' },
  { a: 'Mitarbeiter', b: 'Schulung', pkA: 'PersNr', pkB: 'SchulungsNr', card: 'n:m', level: 1, text: 'Eine Person besucht mehrere Schulungen. An einer Schulung nehmen mehrere Personen teil.' },
  { a: 'Ticket', b: 'Techniker', pkA: 'TicketNr', pkB: 'TechnikerNr', card: 'n:m', level: 2, text: 'Ein Ticket kann nacheinander von mehreren Technikern bearbeitet werden. Ein Techniker bearbeitet im Lauf der Zeit viele Tickets.' },
  { a: 'Mitarbeiter', b: 'Projekt', pkA: 'PersNr', pkB: 'ProjektNr', card: 'n:m', level: 2, text: 'Eine Person kann in mehreren Projekten mitarbeiten. In einem Projekt arbeiten mehrere Personen.' },
  { a: 'Mitarbeiter', b: 'Dienstwagen', pkA: 'PersNr', pkB: 'Kennzeichen', card: '1:1', level: 1, text: 'Eine Person fährt höchstens einen festen Dienstwagen. Jeder Dienstwagen ist genau einer Person fest zugeordnet.' },
  { a: 'Server', b: 'Wartungsvertrag', pkA: 'ServerID', pkB: 'VertragsNr', card: '1:1', level: 1, text: 'Jeder Server hat höchstens einen Wartungsvertrag. Jeder Wartungsvertrag gilt für genau einen Server.' },
  { a: 'Switchport', b: 'Netzwerkdose', pkA: 'PortID', pkB: 'DosenNr', card: '1:1', level: 2, text: 'Jeder Switchport ist mit höchstens einer Netzwerkdose gepatcht. Jede Dose ist mit höchstens einem Switchport verbunden.' },
  { a: 'Mitarbeiter', b: 'Parkplatz', pkA: 'PersNr', pkB: 'ParkplatzNr', card: '1:1', level: 2, text: 'Jede Person hat höchstens einen festen Parkplatz. Jeder Parkplatz ist höchstens einer Person fest zugeordnet.' },
  { a: 'Mitarbeiter', b: 'Geraet', pkA: 'PersNr', pkB: 'InvNr', card: 'n:m', level: 3, text: 'Bisher war jedes Gerät höchstens einer Person zugeordnet. Neu verleiht die IT Pool-Notebooks und will die gesamte **Ausleihhistorie** speichern: Eine Person leiht im Lauf der Zeit viele Geräte, ein Gerät wird nacheinander an viele Personen verliehen.' },
  { a: 'Mitarbeiter', b: 'Standort', pkA: 'PersNr', pkB: 'StandortID', card: 'n:m', level: 3, text: 'Neu: Außendienstmitarbeitende sind **mehreren** Standorten zugeordnet (Hamburg und Berlin). An jedem Standort arbeiten weiterhin viele Personen.' },
  { a: 'Auftrag', b: 'Auftragsposition', pkA: 'AuftragsNr', pkB: 'PositionsID', card: '1:n', level: 3, text: 'Ein Auftrag des Systemhauses besteht aus mindestens einer, meist mehreren Positionen (z. B. 5 Notebooks, 5 Dockingstationen). Jede Position gehört zu genau einem Auftrag.' },
  { a: 'Mitarbeiter', b: 'Zugangskarte', pkA: 'PersNr', pkB: 'KartenNr', card: '1:1', level: 3, text: 'Jede Person hat höchstens eine **aktive** Zugangskarte; jede aktive Karte gehört genau einer Person. Gesperrte Karten werden gelöscht, nicht archiviert.' },
  { a: 'Lieferant', b: 'Artikel', pkA: 'LieferantNr', pkB: 'ArtikelNr', card: 'n:m', level: 3, text: 'Ein Lieferant bietet viele Artikel an. Denselben Artikel (z. B. ein bestimmtes USB-C-Kabel) bieten mehrere Lieferanten an – mit jeweils eigenem Preis.' },
];

function pickScenario(rng: Rng, d: Difficulty): Scn {
  if (d === 1) return rng.pick(SCENARIOS.filter((s) => s.level === 1));
  if (d === 2) return rng.pick(SCENARIOS.filter((s) => s.level <= 2));
  return rng.bool(0.6) ? rng.pick(SCENARIOS.filter((s) => s.level === 3)) : rng.pick(SCENARIOS);
}

function umsetzung(s: Scn): string {
  if (s.card === '1:n') return `Fremdschlüssel **${s.pkA}** in der Tabelle **${s.b}** (n-Seite).`;
  if (s.card === 'n:m') return `Zwischentabelle **${s.a}_${s.b}(${s.pkA}, ${s.pkB})**; beide Fremdschlüssel bilden zusammen den Primärschlüssel.`;
  return `Fremdschlüssel **${s.pkA}** mit **UNIQUE** in der Tabelle **${s.b}** (UNIQUE verhindert, dass daraus 1:n wird).`;
}

const CARD_WHY: Record<Card, string> = {
  '1:1': 'In **beiden** Richtungen höchstens eins → 1:1.',
  '1:n': 'In einer Richtung viele, in der anderen höchstens eins → 1:n.',
  'n:m': 'In **beiden** Richtungen viele → n:m.',
};

const kardinalitaetGen: GeneratorMeta = {
  id: 'daten.kardinalitaet',
  title: 'Kardinalität einer Beziehung bestimmen',
  skill: 'db.beziehungen',
  module: 'd01',
  make(rng, d): SingleChoiceQuestion {
    const s = pickScenario(rng, d);
    const options: Card[] = ['1:1', '1:n', 'n:m'];
    const answer = options.indexOf(s.card);
    const distractors: Record<string, { why: string; error: string }> = {};
    options.forEach((o, i) => {
      if (i === answer) return;
      const why =
        o === '1:1'
          ? `1:1 hieße: in **beiden** Richtungen höchstens eins. Hier gilt: ${s.text}`
          : o === '1:n'
            ? s.card === 'n:m'
              ? 'Lies beide Richtungen: Hier sind es auf **beiden** Seiten viele – also n:m.'
              : 'Hier ist in keiner Richtung „viele“ möglich – also 1:1.'
            : 'n:m hieße: in **beiden** Richtungen viele. Prüfe, ob eine Seite auf „höchstens eins“ beschränkt ist.';
      distractors[String(i)] = { why, error: 'db-kardinalitaet' };
    });
    return {
      id: gid('daten.kardinalitaet'),
      generated: true,
      kind: 'single',
      skill: 'db.beziehungen',
      difficulty: d,
      prompt: `**Situation bei der Elektro Krämer GmbH:** ${s.text}\n\nWelche Kardinalität hat die Beziehung **${s.a} : ${s.b}**?`,
      options,
      answer,
      distractors,
      hints: [`Mit wie vielen Datensätzen aus ${s.b} kann ein Datensatz aus ${s.a} verknüpft sein – höchstens einem oder vielen?`, `Und umgekehrt: mit wie vielen Datensätzen aus ${s.a} ein Datensatz aus ${s.b}?`],
      explanation: `${CARD_WHY[s.card]}\n\n**${s.a} : ${s.b} = ${s.card}**\n\nUmsetzung im Tabellenmodell: ${umsetzung(s)}`,
    };
  },
};

const fkplatzGen: GeneratorMeta = {
  id: 'daten.fkplatz',
  title: 'Fremdschlüssel richtig platzieren',
  skill: 'dm.tabellenmodell',
  module: 'd02',
  make(rng, d): SingleChoiceQuestion {
    let s = pickScenario(rng, d);
    if (d === 1) while (s.card === '1:1') s = pickScenario(rng, d);
    const oFkB = `Fremdschlüssel ${s.pkA} in der Tabelle ${s.b}`;
    const oFkA = `Fremdschlüssel ${s.pkB} in der Tabelle ${s.a}`;
    const oZw = `Zwischentabelle ${s.a}_${s.b}(${s.pkA}, ${s.pkB}) mit zusammengesetztem Primärschlüssel`;
    const oUq = `Fremdschlüssel ${s.pkA} mit UNIQUE-Bedingung in der Tabelle ${s.b}`;
    const correct = s.card === '1:n' ? oFkB : s.card === 'n:m' ? oZw : oUq;
    const options = rng.shuffle([oFkB, oFkA, oZw, oUq]);
    const answer = options.indexOf(correct);
    const why: Record<string, { why: string; error: string }> = {
      [oFkB]:
        s.card === 'n:m'
          ? { why: `So könnte jede Zeile in ${s.b} nur auf **einen** Datensatz aus ${s.a} verweisen – das bildet nur 1:n ab, nicht n:m.`, error: 'dm-nm-ohne-zwischentabelle' }
          : { why: `Ohne UNIQUE könnte derselbe Datensatz aus ${s.a} mit mehreren Datensätzen aus ${s.b} verknüpft werden – das wäre 1:n statt 1:1.`, error: 'dm-1-1-umsetzung' },
      [oFkA]:
        s.card === 'n:m'
          ? { why: `So könnte jede Zeile in ${s.a} nur auf **einen** Datensatz aus ${s.b} verweisen – das bildet nicht n:m ab.`, error: 'dm-nm-ohne-zwischentabelle' }
          : s.card === '1:n'
            ? { why: `Zu einem Datensatz aus ${s.a} gehören viele aus ${s.b} – mehrere Werte passen nicht in eine Zelle. Der FK gehört auf die n-Seite (${s.b}).`, error: 'db-fk-falsche-seite' }
            : { why: `Ohne UNIQUE könnte derselbe Datensatz aus ${s.b} mehreren Datensätzen aus ${s.a} zugeordnet werden – das wäre 1:n statt 1:1.`, error: 'dm-1-1-umsetzung' },
      [oZw]: { why: `Eine Zwischentabelle braucht man nur bei n:m. Hier liegt ${s.card} vor – ein Fremdschlüssel genügt.`, error: 'db-zwischentabelle-unnoetig' },
      [oUq]:
        s.card === '1:n'
          ? { why: `UNIQUE würde verhindern, dass zu einem Datensatz aus ${s.a} mehrere aus ${s.b} gehören – aus 1:n würde 1:1.`, error: 'dm-unique-bei-1-n' }
          : { why: 'Ein einzelner Fremdschlüssel (auch mit UNIQUE) kann keine n:m-Beziehung abbilden.', error: 'dm-nm-ohne-zwischentabelle' },
    };
    const distractors: Record<string, { why: string; error: string }> = {};
    options.forEach((o, i) => {
      if (i !== answer) distractors[String(i)] = why[o];
    });
    return {
      id: gid('daten.fkplatz'),
      generated: true,
      kind: 'single',
      skill: 'dm.tabellenmodell',
      difficulty: d,
      prompt: `**Situation:** ${s.text}\n\nDie Tabellen ${s.a} (Primärschlüssel ${s.pkA}) und ${s.b} (Primärschlüssel ${s.pkB}) existieren bereits. Wie wird die Beziehung im **Tabellenmodell** richtig umgesetzt?`,
      options,
      answer,
      distractors,
      hints: ['Bestimme zuerst die Kardinalität (beide Richtungen).', '1:n → FK auf der n-Seite; n:m → Zwischentabelle; 1:1 → FK mit UNIQUE.'],
      explanation: `Kardinalität **${s.a} : ${s.b} = ${s.card}**. ${CARD_WHY[s.card]}\n\nUmsetzung: ${umsetzung(s)}`,
    };
  },
};

/* ================================================================== */
/* Modul d04 – Daten darstellen: Zahlensysteme, Zeichencodes, Mengen   */
/* ================================================================== */

const group4 = (b: string) => b.replace(/\B(?=(\d{4})+(?!\d))/g, ' ');

/* ------------------------------------------------------------------ */
/* daten.numconv – Dezimal, Dual, Hex, Oktal                           */
/* ------------------------------------------------------------------ */

type Base = 'dez' | 'bin' | 'hex' | 'okt';
const BASE_COL: Record<Base, { label: string; type: 'number' | 'text' }> = {
  dez: { label: 'Dezimal', type: 'number' },
  bin: { label: 'Dual', type: 'text' },
  hex: { label: 'Hexadezimal', type: 'text' },
  okt: { label: 'Oktal', type: 'text' },
};

function repr(n: number, b: Base, bits: number): string {
  if (b === 'dez') return String(n);
  if (b === 'bin') return group4(n.toString(2).padStart(bits, '0'));
  if (b === 'hex') return n.toString(16).toUpperCase().padStart(bits / 4, '0');
  return n.toString(8);
}

/** Alle zulässigen Schreibweisen (Vergleich ist unabhängig von Groß-/Kleinschreibung). */
function reprAccept(n: number, b: Base, bits: number): string[] {
  const forms = new Set<string>();
  if (b === 'bin') {
    const raw = n.toString(2);
    for (const len of [raw.length, Math.ceil(raw.length / 4) * 4, bits]) {
      const x = raw.padStart(len, '0');
      forms.add(x);
      forms.add(group4(x));
      forms.add('0b' + x);
    }
  } else if (b === 'hex') {
    const raw = n.toString(16).toUpperCase();
    for (const x of [raw, raw.padStart(bits / 4, '0')]) {
      forms.add(x);
      forms.add('0x' + x);
      forms.add(x + 'h');
    }
  } else if (b === 'okt') {
    const o = n.toString(8);
    forms.add(o);
    forms.add('0' + o);
    forms.add('0o' + o);
  }
  return [...forms];
}

function explainNum(n: number, withOkt: boolean, fromDez: boolean): string {
  const hex = n.toString(16).toUpperCase();
  const steps: string[] = [];
  for (let x = n; x > 0; x = Math.floor(x / 16)) steps.push(`${fmt(x, 0)} : 16 = ${fmt(Math.floor(x / 16), 0)} Rest ${x % 16}`);
  const lines = [
    ...(fromDez ? [`Dezimal → Hex (Restwertmethode, Reste von unten lesen): ${steps.join(' · ')} → **${hex}**`] : []),
    `Hex → Dezimal (Stellenwerte): ${hex
      .split('')
      .map((c, i) => `${parseInt(c, 16)} · ${fmt(16 ** (hex.length - 1 - i), 0)}`)
      .join(' + ')} = **${fmt(n, 0)}**`,
    `Hex ↔ Dual (jede Hexziffer = 4 Bit): ${hex
      .split('')
      .map((c) => `${c} = ${parseInt(c, 16).toString(2).padStart(4, '0')}`)
      .join(' · ')}`,
  ];
  if (withOkt) {
    const raw = n.toString(2);
    const padded = raw.padStart(Math.ceil(raw.length / 3) * 3, '0');
    const groups = padded.match(/.{3}/g)!;
    lines.push(`Dual ↔ Oktal (von rechts je 3 Bit = 1 Oktalziffer): ${groups.map((g) => `${g} = ${parseInt(g, 2)}`).join(' · ')} → **${n.toString(8)}**`);
  }
  return lines.map((l) => `- ${l}`).join('\n');
}

const numconvGen: GeneratorMeta = {
  id: 'daten.numconv',
  title: 'Zahlensysteme: Dezimal, Dual, Hexadezimal, Oktal',
  skill: 'data.zahlensysteme',
  module: 'd04',
  make(rng, d): TableQuestion {
    const bits = d === 3 ? 16 : 8;
    const bases: Base[] = d === 1 ? ['dez', 'bin', 'hex'] : ['dez', 'bin', 'hex', 'okt'];
    const givens = rng.shuffle(bases).slice(0, d === 1 ? 2 : 3);
    const used = new Set<number>();
    const misconceptions: NonNullable<TableQuestion['misconceptions']> = [];
    const meta: { n: number; g: Base }[] = [];
    const rows = givens.map((g, ri) => {
      let n: number;
      do n = d === 3 ? rng.int(256, 65535) : rng.int(d === 1 ? 10 : 16, 255);
      while (used.has(n));
      used.add(n);
      meta.push({ n, g });
      const cells: TableQuestion['rows'][number]['cells'] = {};
      for (const b of bases) {
        if (b === g) cells[b] = { given: b === 'hex' ? `0x${repr(n, b, bits)}` : repr(n, b, bits) };
        else cells[b] = { answer: repr(n, b, bits), accept: reprAccept(n, b, bits) };
      }
      if (g !== 'bin') {
        const rev = group4(n.toString(2).padStart(bits, '0').split('').reverse().join(''));
        const ok = reprAccept(n, 'bin', bits).some((a) => a.replace(/\s/g, '') === rev.replace(/\s/g, ''));
        if (!ok) misconceptions.push({ answer: rev, cell: `${ri}:bin`, error: 'bin-reihenfolge', why: 'Die Bits sind spiegelverkehrt: Das höchstwertige Bit steht links. Bei der Divisionsmethode liest du die Reste von **unten nach oben**.' });
      }
      return { label: `Zahl ${ri + 1}`, cells };
    });
    return {
      id: gid('daten.numconv'),
      generated: true,
      kind: 'table',
      skill: 'data.zahlensysteme',
      difficulty: d,
      prompt:
        `Ergänze die Tabelle ohne Taschenrechner. Jede Zeile ist **eine** Zahl in ${bases.length} Schreibweisen; ein Wert ist vorgegeben.\n\n` +
        `Schreibweise: Dualzahl mit ${bits} Bit (Leerzeichen nach je 4 Bit erlaubt), Hexadezimal ohne oder mit \`0x\`${d === 1 ? '' : ', Oktal ohne Präfix'}.`,
      columns: bases.map((b) => ({ key: b, label: BASE_COL[b].label, type: BASE_COL[b].type })),
      rows,
      misconceptions,
      hints: [
        'Hex ↔ Dual: Jede Hexziffer entspricht genau 4 Bit (Nibble).',
        ...(d === 1 ? [] : ['Oktal ↔ Dual: Jede Oktalziffer entspricht genau 3 Bit – von rechts gruppieren.']),
        'Dezimal → Hex: wiederholt durch 16 teilen, die Reste von unten nach oben lesen (A = 10 … F = 15).',
      ],
      explanation: meta
        .map(({ n, g }, i) => `**Zahl ${i + 1}** (gegeben: ${BASE_COL[g].label}) = ${fmt(n, 0)}\n\n${explainNum(n, d !== 1, g === 'dez')}`)
        .join('\n\n'),
    };
  },
};

/* ------------------------------------------------------------------ */
/* daten.ascii – Zeichen ↔ ASCII-Code                                  */
/* ------------------------------------------------------------------ */

const ASCII_AUSZUG =
  '**Auszug aus der ASCII-Tabelle:** `0` = 48 (0x30) · `A` = 65 (0x41) · `a` = 97 (0x61) · Leerzeichen = 32 (0x20). Ziffern und Buchstaben sind lückenlos durchnummeriert (`0`…`9`, `A`…`Z`, `a`…`z`).';
const hex2 = (n: number) => n.toString(16).toUpperCase().padStart(2, '0');

function asciiWay(ch: string): string {
  const c = ch.charCodeAt(0);
  const [start, code] = ch >= '0' && ch <= '9' ? ['0', 48] : ch >= 'A' && ch <= 'Z' ? ['A', 65] : ['a', 97];
  const k = c - (code as number);
  return `\`${ch}\` liegt ${k} ${k === 1 ? 'Stelle' : 'Stellen'} hinter \`${start}\`: ${code} + ${k} = **${c}**`;
}

const randChar = (rng: Rng, kind: 'upper' | 'lower' | 'digit') =>
  kind === 'digit' ? String(rng.int(0, 9)) : String.fromCharCode((kind === 'upper' ? 65 : 97) + rng.int(1, 25));

const ASCII_WORDS = ['Lan', 'Ping', 'Port', 'Byte', 'Hub', 'Cpu', 'Ram', 'Pc1', 'Net9', 'Dns2', 'Wlan', 'Ssd', 'Bios', 'Tcp6'];

const asciiGen: GeneratorMeta = {
  id: 'daten.ascii',
  title: 'ASCII: Zeichen in Codes umrechnen',
  skill: 'data.zeichencodes',
  module: 'd04',
  make(rng, d): Question {
    if (d === 3) {
      const w = rng.pick(ASCII_WORDS);
      const codes = [...w].map((c) => c.charCodeAt(0));
      const spaced = codes.map(hex2).join(' ');
      const upper = [...w.toUpperCase()].map((c) => hex2(c.charCodeAt(0))).join(' ');
      const misconceptions = [
        { answer: codes.join(' '), error: 'ascii-dez-statt-hex', why: 'Das sind die **Dezimal**codes. Gefragt sind die Hexadezimalwerte (z. B. 65 = 0x41).' },
      ];
      if (upper !== spaced) misconceptions.push({ answer: upper, error: 'ascii-gross-klein', why: 'Groß- und Kleinbuchstaben haben verschiedene Codes: Kleinbuchstaben liegen genau 32 (0x20) höher, z. B. `A` = 0x41, `a` = 0x61.' });
      return {
        id: gid('daten.ascii'),
        generated: true,
        kind: 'text',
        skill: 'data.zeichencodes',
        difficulty: d,
        prompt: `${ASCII_AUSZUG}\n\nEin Gerät soll den Text \`${w}\` als ASCII-Bytes senden. Gib die Bytes **hexadezimal** an, getrennt durch Leerzeichen (z. B. \`41 62\`). Groß-/Kleinschreibung des Textes beachten!`,
        accept: [spaced, codes.map(hex2).join(''), codes.map((c) => '0x' + hex2(c)).join(' ')],
        placeholder: 'z. B. 41 62',
        misconceptions,
        hints: ['Bestimme zuerst den Dezimalcode jedes Zeichens über den Abstand zu `0`, `A` oder `a`.', 'Dann jeden Code durch 16 teilen: Ergebnis = 1. Hexziffer, Rest = 2. Hexziffer.'],
        explanation:
          [...w].map((ch) => `- ${asciiWay(ch)} = 0x**${hex2(ch.charCodeAt(0))}**`).join('\n') +
          `\n\nErgebnis: **${spaced}**\n\nHäufiger Fehler: Groß- und Kleinbuchstaben gleich behandeln. Kleinbuchstaben liegen immer 32 (0x20) über dem Großbuchstaben.`,
      };
    }
    const kind = rng.pick(['upper', 'lower', 'digit'] as const);
    const ch = randChar(rng, kind);
    const c = ch.charCodeAt(0);
    const mcsText: { answer: string; error: string; why: string }[] = [];
    if (kind === 'digit') mcsText.push({ answer: d === 1 ? ch : hex2(Number(ch)), error: 'ascii-ziffer-als-wert', why: `Das Zeichen \`${ch}\` ist nicht die Zahl ${ch}: Ziffern beginnen in ASCII bei 48 (0x30).` });
    else mcsText.push({ answer: d === 1 ? String(c ^ 32) : hex2(c ^ 32), error: 'ascii-gross-klein', why: `Das ist der Code des ${kind === 'upper' ? 'Klein' : 'Groß'}buchstabens. Groß- und Kleinbuchstaben unterscheiden sich um 32 (0x20).` });
    if (d === 1) {
      return numQ('daten.ascii', 'data.zeichencodes', d, {
        prompt: `${ASCII_AUSZUG}\n\nWelchen **dezimalen** ASCII-Code hat das Zeichen \`${ch}\`?`,
        answer: c,
        hints: [`Zähle ab dem passenden Startzeichen (\`0\`, \`A\` oder \`a\`) weiter.`],
        mcs: [
          ...mcsText.map((m) => ({ answer: Number(m.answer), error: m.error, why: m.why })),
          { answer: c + 1, error: 'ascii-abzaehlen', why: 'Du hast eins zu viel gezählt: Das Startzeichen selbst hat den Abstand 0 (z. B. `B` = 65 + 1 = 66).' },
        ],
        explanation: `${asciiWay(ch)}\n\nHäufiger Fehler: Das Startzeichen mitzählen (dann landest du eins zu hoch).`,
      });
    }
    // d === 2: Zeichen → Hex
    mcsText.push({ answer: String(c), error: 'ascii-dez-statt-hex', why: `${c} ist der **Dezimal**code. Gefragt ist hexadezimal: ${c} = ${Math.floor(c / 16)} · 16 + ${c % 16} → 0x${hex2(c)}.` });
    return {
      id: gid('daten.ascii'),
      generated: true,
      kind: 'text',
      skill: 'data.zeichencodes',
      difficulty: d,
      prompt: `${ASCII_AUSZUG}\n\nWelchen **hexadezimalen** ASCII-Code hat das Zeichen \`${ch}\`? (zwei Hexziffern, mit oder ohne \`0x\`)`,
      accept: [hex2(c), '0x' + hex2(c), hex2(c) + 'h'],
      placeholder: 'z. B. 41',
      misconceptions: mcsText,
      hints: ['Erst den Dezimalcode bestimmen, dann in Hex umrechnen.', 'Einfacher: in Hex weiterzählen, z. B. 0x41 + 0x0A = 0x4B.'],
      explanation: `${asciiWay(ch)}\n\n${c} : 16 = ${Math.floor(c / 16)} Rest ${c % 16} → **0x${hex2(c)}**`,
    };
  },
};

/* ------------------------------------------------------------------ */
/* daten.utfbytes – Speicherbedarf von Text je Codierung               */
/* ------------------------------------------------------------------ */

type Enc = 'utf8' | 'utf16' | 'utf32' | 'latin1';
const ENC_NAME: Record<Enc, string> = { utf8: 'UTF-8', utf16: 'UTF-16 (ohne BOM)', utf32: 'UTF-32 (ohne BOM)', latin1: 'ISO 8859-1 (Latin-1)' };

function bytesOf(cp: number, enc: Enc): number {
  if (enc === 'utf32') return 4;
  if (enc === 'latin1') return 1;
  if (enc === 'utf16') return cp > 0xffff ? 4 : 2;
  return cp < 0x80 ? 1 : cp < 0x800 ? 2 : cp < 0x10000 ? 3 : 4;
}

const charClass = (cp: number) => (cp < 0x80 ? 'ASCII-Zeichen (inkl. Leerzeichen, Ziffern)' : cp < 0x800 ? 'Umlaute, ß, é' : cp < 0x10000 ? '€-Zeichen' : 'Emoji');

const UTF_WORDS = ['Größe', 'Grüße', 'Straße', 'Prüfung', 'Bäckerei', 'Übergröße', 'Lösung', 'Kühlschrank', 'Äpfel', 'Müllerstraße'];
const UTF_PHRASES = ['Preis: 49 €', 'Gebühr 5 €', 'Größe M: 12 €', 'Café 3,50 €', 'Süd: 99 €', 'Prüfung 20 €'];
const UTF_EMOJI = ['Danke 👍', 'Grüße 😀', 'Start 🚀', 'Top 👍 ok', 'Hallo 😀'];

const utfbytesGen: GeneratorMeta = {
  id: 'daten.utfbytes',
  title: 'Speicherbedarf von Text in UTF-8, UTF-16, UTF-32',
  skill: 'data.unicode',
  module: 'd04',
  make(rng, d) {
    let text: string;
    let enc: Enc;
    if (d === 1) {
      text = rng.pick(UTF_WORDS);
      enc = rng.bool(0.75) ? 'utf8' : 'latin1';
    } else if (d === 2) {
      text = rng.pick(UTF_PHRASES);
      enc = 'utf8';
    } else {
      enc = rng.pick(['utf8', 'utf16', 'utf32'] as const);
      text = rng.pick(enc === 'utf8' ? UTF_EMOJI : [...UTF_EMOJI, ...UTF_PHRASES]);
    }
    const cps = [...text].map((c) => c.codePointAt(0)!);
    const total = sum(cps.map((cp) => bytesOf(cp, enc)));
    const groups = new Map<string, { chars: string[]; per: number }>();
    for (const cp of cps) {
      const k = charClass(cp);
      const g = groups.get(k) ?? { chars: [], per: bytesOf(cp, enc) };
      g.chars.push(String.fromCodePoint(cp) === ' ' ? '␣' : String.fromCodePoint(cp));
      groups.set(k, g);
    }
    const tbl =
      '| Zeichenart | Zeichen | Anzahl | Byte je Zeichen | Byte |\n|---|---|---|---|---|\n' +
      [...groups.entries()].map(([k, g]) => `| ${k} | ${g.chars.join(' ')} | ${g.chars.length} | ${g.per} | ${g.chars.length * g.per} |`).join('\n');
    const mcs: Mc[] = [];
    if (enc === 'utf8') {
      mcs.push({ answer: cps.length, error: 'utf8-ein-byte-je-zeichen', why: 'Du hast ein Byte je Zeichen gezählt. In UTF-8 gilt das nur für ASCII-Zeichen; Umlaute brauchen 2, € braucht 3 und Emojis 4 Byte.' });
      mcs.push({ answer: cps.length * 2, error: 'utf8-utf16-verwechselt', why: 'Zwei Byte je Zeichen wäre (grob) UTF-16. UTF-8 nutzt 1 bis 4 Byte, je nach Zeichen.' });
      mcs.push({ answer: sum(cps.map((cp) => Math.min(2, bytesOf(cp, 'utf8')))), error: 'utf8-sonderzeichen-bytes', why: 'Nicht jedes Sonderzeichen braucht 2 Byte: € (U+20AC) braucht in UTF-8 **3 Byte**, Emojis **4 Byte**.' });
    } else if (enc === 'latin1') {
      mcs.push({ answer: sum(cps.map((cp) => bytesOf(cp, 'utf8'))), error: 'latin1-utf8-verwechselt', why: 'So viel Byte bräuchte der Text in UTF-8. ISO 8859-1 speichert **jedes** Zeichen in genau 1 Byte – auch Umlaute.' });
    } else if (enc === 'utf16') {
      mcs.push({ answer: cps.length * 2, error: 'utf16-surrogat', why: 'Emojis liegen außerhalb der ersten 65.536 Zeichen und brauchen in UTF-16 **zwei** 16-Bit-Einheiten (Surrogatpaar) = 4 Byte.' });
      mcs.push({ answer: sum(cps.map((cp) => bytesOf(cp, 'utf8'))), error: 'utf8-utf16-verwechselt', why: 'Das ist die Größe in UTF-8. In UTF-16 braucht jedes normale Zeichen 2 Byte.' });
    } else {
      mcs.push({ answer: cps.length, error: 'utf8-ein-byte-je-zeichen', why: 'UTF-32 speichert **jedes** Zeichen in 4 Byte (32 Bit), nicht in 1 Byte.' });
    }
    return numQ('daten.utfbytes', 'data.unicode', d, {
      prompt: `Wie viele **Byte** belegt der Text \`${text}\` in der Codierung **${ENC_NAME[enc]}**?\n\nLeerzeichen zählen mit.${enc === 'utf8' ? ' Ohne BOM (Byte Order Mark, optionale Startmarkierung).' : ''}`,
      answer: total,
      unit: 'Byte',
      hints:
        enc === 'utf8'
          ? ['UTF-8: ASCII-Zeichen 1 Byte, Umlaute/ß/é 2 Byte, € 3 Byte, Emoji 4 Byte.', 'Zähle jede Zeichenart getrennt und addiere.']
          : enc === 'utf16'
            ? ['UTF-16: normale Zeichen 2 Byte, Emojis 4 Byte (Surrogatpaar).']
            : enc === 'utf32'
              ? ['UTF-32: jedes Zeichen genau 4 Byte.']
              : ['ISO 8859-1: jedes Zeichen genau 1 Byte (256 Zeichen, inkl. deutscher Umlaute).'],
      mcs,
      explanation: `${tbl}\n\nSumme: **${total} Byte** (${cps.length} Zeichen).${enc === 'utf8' ? '\n\nHäufiger Fehler: ein Byte je Zeichen rechnen. Das stimmt in UTF-8 nur, wenn der Text reines ASCII ist.' : ''}`,
    });
  },
};

/* ------------------------------------------------------------------ */
/* Einheiten-Hilfen für Datenmengen                                     */
/* ------------------------------------------------------------------ */

type UnitInfo = { name: string; f: number; def: string };
const DEC_UNITS: UnitInfo[] = [
  { name: 'MB', f: 1e6, def: '1 MB = 10⁶ Byte = 1.000.000 Byte' },
  { name: 'GB', f: 1e9, def: '1 GB = 10⁹ Byte = 1.000.000.000 Byte' },
  { name: 'TB', f: 1e12, def: '1 TB = 10¹² Byte' },
];
const BIN_UNITS: UnitInfo[] = [
  { name: 'MiB', f: 2 ** 20, def: '1 MiB = 2²⁰ Byte = 1.048.576 Byte' },
  { name: 'GiB', f: 2 ** 30, def: '1 GiB = 2³⁰ Byte = 1.073.741.824 Byte' },
  { name: 'TiB', f: 2 ** 40, def: '1 TiB = 2⁴⁰ Byte = 1.099.511.627.776 Byte' },
];

/** Größte Einheit, in der der Wert mindestens 1 ist (Ergebnis bleibt gut lesbar). */
function unitFor(bytes: number, binary: boolean): UnitInfo {
  const list = binary ? BIN_UNITS : DEC_UNITS;
  return [...list].reverse().find((u) => bytes / u.f >= 1) ?? list[0];
}
/** Gegenstück im anderen Präfixsystem (MB ↔ MiB …) für das Fehlbild 1000/1024. */
const otherUnit = (u: UnitInfo) => (u.name.includes('i') ? DEC_UNITS : BIN_UNITS)[(u.name.includes('i') ? BIN_UNITS : DEC_UNITS).indexOf(u)];

const mcUnitWhy = (u: UnitInfo) =>
  u.name.includes('i')
    ? `Gefragt ist **${u.name}** (Binärpräfix, Faktor 1024). Du hast mit 1000er-Schritten gerechnet.`
    : `Gefragt ist **${u.name}** (Dezimalpräfix, Faktor 1000). Du hast mit 1024er-Schritten gerechnet.`;

/* ------------------------------------------------------------------ */
/* daten.bildspeicher – Bildgröße aus cm und ppi                        */
/* ------------------------------------------------------------------ */

const FORMATE_CM: [number, number, string][] = [
  [15, 10, 'Foto 10 × 15'],
  [18, 13, 'Foto 13 × 18'],
  [20, 15, 'Foto 15 × 20'],
  [24, 18, 'Foto 18 × 24'],
  [29.7, 21, 'DIN A4'],
  [30, 20, 'Foto 20 × 30'],
  [30, 18, 'Panorama 18 × 30'],
  [40, 30, 'Poster 30 × 40'],
];
const cmF = (x: number) => fmt(x, 2);

const bildspeicherGen: GeneratorMeta = {
  id: 'daten.bildspeicher',
  title: 'Bildspeicher aus Maßen in cm und Auflösung in ppi',
  skill: 'data.bildspeicher',
  module: 'd04',
  make(rng, d) {
    const [wcm, hcm, name] = rng.pick(FORMATE_CM);
    const ppi = d === 1 ? rng.pick([150, 300]) : rng.pick([150, 200, 300, 600]);
    const px = (cm: number) => Math.round((cm / 2.54) * ppi);
    const pxBuch = (cm: number) => Math.round(round2(cm / 2.54) * ppi);
    const RULE = 'Rechne die Pixel je Seite mit cm ÷ 2,54 · ppi und runde sie auf ganze Pixel (1 Zoll = 2,54 cm).';
    if (d === 1) {
      const ans = px(wcm);
      return numQ('daten.bildspeicher', 'data.bildspeicher', d, {
        prompt: `Ein Papierfoto (${name}) ist **${cmF(wcm)} cm** breit. Es wird mit **${ppi} ppi** eingescannt.\n\nWie viele **Pixel** ist der Scan breit? ${RULE}`,
        answer: ans,
        accept: [pxBuch(wcm)],
        unit: 'Pixel',
        hints: ['ppi = Pixel pro Zoll. Rechne zuerst die Breite in Zoll um: cm ÷ 2,54.', 'Zoll · ppi = Pixel.'],
        mcs: [
          { answer: Math.round(wcm * ppi), error: 'ppi-cm-als-zoll', why: 'Du hast die Zentimeter direkt mit ppi multipliziert. ppi bezieht sich auf **Zoll**: erst cm ÷ 2,54.' },
          { answer: Math.round(wcm * 2.54 * ppi), error: 'ppi-mal-254', why: 'Zentimeter in Zoll heißt **teilen** durch 2,54 (ein Zoll ist länger als ein Zentimeter).' },
        ],
        explanation: `1. Breite in Zoll: ${cmF(wcm)} cm ÷ 2,54 = ${fmt(wcm / 2.54, 4)} Zoll\n\n2. Pixel: ${fmt(wcm / 2.54, 4)} · ${ppi} ppi = ${fmt((wcm / 2.54) * ppi, 2)} → gerundet **${fmt(ans, 0)} Pixel**\n\nHäufiger Fehler: cm direkt mit ppi multiplizieren. ppi heißt „pixels per inch“, also Pixel je Zoll.`,
      });
    }
    const count = d === 3 ? rng.pick([50, 100, 250, 500, 1000]) : 1;
    const perCh = d === 3 ? rng.pick([8, 12, 16]) : 8;
    const depth = d === 2 ? rng.pick([24, 24, 8, 48]) : perCh * 3;
    const binary = rng.bool(0.6);
    const pw = px(wcm), ph = px(hcm);
    const bytes = (pw * ph * depth * count) / 8;
    const u = unitFor(bytes, binary);
    const ans = round2(bytes / u.f);
    const bookBytes = (pxBuch(wcm) * pxBuch(hcm) * depth * count) / 8;
    const o = otherUnit(u);
    const depthText = d === 3 ? `RGB mit **${perCh} Bit je Farbkanal** (3 Kanäle)` : depth === 8 ? '**8 Bit** Graustufen' : `**${depth} Bit** Farbtiefe je Pixel`;
    const mcs: Mc[] = [
      { answer: round2((bytes * 8) / u.f), error: 'einheit-bit-byte', why: 'Du hast vergessen, Bit in Byte umzurechnen (÷ 8).' },
      { answer: round2(bytes / o.f), error: 'einheit-1000-1024', why: mcUnitWhy(u) },
      { answer: round2((Math.round(wcm * ppi) * Math.round(hcm * ppi) * depth * count) / 8 / u.f), error: 'ppi-cm-als-zoll', why: 'Du hast die Zentimeter direkt mit ppi multipliziert. Erst cm ÷ 2,54 = Zoll, dann · ppi.' },
    ];
    if (d === 3) mcs.push({ answer: round2((pw * ph * perCh * count) / 8 / u.f), error: 'farbtiefe-je-kanal', why: `${perCh} Bit gelten **je Farbkanal**. Ein RGB-Pixel hat 3 Kanäle: ${perCh} · 3 = ${depth} Bit.` });
    return numQ('daten.bildspeicher', 'data.bildspeicher', d, {
      prompt:
        `${count > 1 ? `Für das Archiv der Elektro Krämer GmbH werden **${count} Papierfotos** im Format ${name} (**${cmF(wcm)} cm × ${cmF(hcm)} cm**) eingescannt` : `Ein Papierfoto (${name}, **${cmF(wcm)} cm × ${cmF(hcm)} cm**) wird eingescannt`}: **${ppi} ppi**, ${depthText}, unkomprimiert.\n\n` +
        `Wie groß ist der Speicherbedarf${count > 1 ? ' aller Scans' : ''} in **${u.name}** (${u.def})? ${RULE} Endergebnis auf zwei Nachkommastellen runden.`,
      answer: ans,
      tolerance: 0.01,
      accept: [round2(bookBytes / u.f)],
      unit: u.name,
      hints: ['Pixel je Seite = cm ÷ 2,54 · ppi (auf ganze Pixel runden).', `Bit = Breite · Höhe · Bit je Pixel${count > 1 ? ' · Anzahl Bilder' : ''}; Byte = Bit ÷ 8.`, `Byte ÷ ${u.name.includes('i') ? '1024 je Stufe' : '1000 je Stufe'} = ${u.name}.`],
      mcs,
      explanation:
        `1. Breite: ${cmF(wcm)} ÷ 2,54 · ${ppi} = ${fmt((wcm / 2.54) * ppi, 2)} → **${fmt(pw, 0)} px**; Höhe: ${cmF(hcm)} ÷ 2,54 · ${ppi} = ${fmt((hcm / 2.54) * ppi, 2)} → **${fmt(ph, 0)} px**\n\n` +
        `2. Pixel: ${fmt(pw, 0)} · ${fmt(ph, 0)} = ${fmt(pw * ph, 0)} px\n\n` +
        `3. Bit je Pixel: ${d === 3 ? `${perCh} Bit · 3 Kanäle = ${depth} Bit` : `${depth} Bit`}\n\n` +
        `4. Byte: ${fmt(pw * ph, 0)} · ${depth} Bit${count > 1 ? ` · ${count} Bilder` : ''} ÷ 8 = ${fmt(bytes, 0)} Byte\n\n` +
        `5. ${u.name}: ${fmt(bytes, 0)} ÷ ${fmt(u.f, 0)} = **${fmt(ans, 2)} ${u.name}**` +
        (round2(bookBytes / u.f) !== ans ? `\n\nHinweis: Manche Bücher runden schon die Zoll-Werte auf zwei Stellen. Dann ändern sich die Pixel minimal und es kommen ${fmt(round2(bookBytes / u.f), 2)} ${u.name} heraus – das wird ebenfalls als richtig gewertet.` : '') +
        `\n\nHäufiger Fehler: cm direkt mit ppi multiplizieren oder Bit nicht durch 8 teilen.`,
    });
  },
};

/* ------------------------------------------------------------------ */
/* daten.audio – Speicherbedarf unkomprimierter Audiodaten (PCM)        */
/* ------------------------------------------------------------------ */

const KANAL_NAME: Record<number, string> = { 1: 'Mono (1 Kanal)', 2: 'Stereo (2 Kanäle)', 6: '5.1-Surround (6 Kanäle)' };
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')} min`;

const audioGen: GeneratorMeta = {
  id: 'daten.audio',
  title: 'Speicherbedarf und Datenrate von Audio (PCM)',
  skill: 'data.mediengroesse',
  module: 'd04',
  make(rng, d) {
    const fs = d === 1 ? 44100 : rng.pick([22050, 32000, 44100, 48000, 96000]);
    const depth = d === 1 ? 16 : rng.pick([8, 16, 24]);
    const ch = d === 1 ? 2 : d === 2 ? rng.pick([1, 2]) : rng.pick([2, 6]);
    if (d === 3 && rng.bool(0.4)) {
      const kbit = (fs * depth * ch) / 1000;
      return numQ('daten.audio', 'data.mediengroesse', d, {
        prompt: `Ein Tonstudio nimmt mit **${fmt(fs / 1000, 2)} kHz** Abtastrate, **${depth} Bit** Abtasttiefe und ${KANAL_NAME[ch]} unkomprimiert (PCM) auf.\n\nWelche **Datenrate in kbit/s** entsteht (1 kbit = 1000 Bit)?`,
        answer: kbit,
        tolerance: 0.01,
        unit: 'kbit/s',
        hints: ['Datenrate = Abtastrate · Abtasttiefe · Kanäle (in Bit/s).', 'Bit/s ÷ 1000 = kbit/s.'],
        mcs: [
          { answer: round2(kbit / 8), error: 'einheit-bit-byte', why: 'Datenraten werden in **Bit** pro Sekunde angegeben – hier nicht durch 8 teilen.' },
          { answer: round2(kbit / ch), error: 'audio-kanaele-vergessen', why: `Du hast nur einen Kanal gerechnet. ${KANAL_NAME[ch]} heißt: · ${ch}.` },
          { answer: round2((fs * depth * ch) / 1024), error: 'einheit-1000-1024', why: 'Bei Datenraten gilt immer der Dezimalpräfix: 1 kbit = 1000 Bit.' },
        ],
        explanation: `${fmt(fs, 0)} Hz · ${depth} Bit · ${ch} = ${fmt(fs * depth * ch, 0)} Bit/s = **${fmt(kbit, 2)} kbit/s**\n\nZum Vergleich: Audio-CD (44,1 kHz, 16 Bit, Stereo) = 1.411,2 kbit/s.`,
      });
    }
    const secs = d === 1 ? rng.int(1, 5) * 60 : d === 2 ? rng.int(6, 60) * 5 : rng.int(20, 120) * 60;
    const bytes = (fs * depth * ch * secs) / 8;
    const u = unitFor(bytes, d === 1 ? false : rng.bool(0.5));
    const ans = round2(bytes / u.f);
    const durText = secs % 60 === 0 ? `${secs / 60} ${secs === 60 ? 'Minute' : 'Minuten'}` : mmss(secs);
    return numQ('daten.audio', 'data.mediengroesse', d, {
      prompt: `${d === 1 ? 'Ein Titel in **CD-Qualität**' : d === 3 ? 'Eine Schulungsaufnahme' : 'Eine Sprachaufnahme für die Schulungsplattform'} wird unkomprimiert (PCM, z. B. als WAV) gespeichert: **${fmt(fs / 1000, 2)} kHz** Abtastrate, **${depth} Bit** Abtasttiefe, ${KANAL_NAME[ch]}, Dauer **${durText}**.\n\nWie groß ist die Datei in **${u.name}** (${u.def})? Dateikopf vernachlässigen, auf zwei Nachkommastellen runden.`,
      answer: ans,
      tolerance: 0.01,
      unit: u.name,
      hints: ['Bit = Abtastrate · Abtasttiefe · Kanäle · Sekunden.', 'Byte = Bit ÷ 8, dann in die gefragte Einheit umrechnen.'],
      mcs: [
        { answer: round2((bytes * 8) / u.f), error: 'einheit-bit-byte', why: 'Du hast vergessen, Bit in Byte umzurechnen (÷ 8).' },
        { answer: round2(bytes / ch / u.f), error: 'audio-kanaele-vergessen', why: `Du hast nur einen Kanal gerechnet. ${KANAL_NAME[ch]} heißt: · ${ch}.` },
        { answer: round2(bytes / otherUnit(u).f), error: 'einheit-1000-1024', why: mcUnitWhy(u) },
        ...(secs % 60 === 0 ? [{ answer: round2(bytes / 60 / u.f), error: 'zeit-minuten-sekunden', why: 'Die Abtastrate gilt **pro Sekunde**: Minuten erst mit 60 multiplizieren.' }] : []),
      ],
      explanation:
        `1. Dauer: ${durText} = ${fmt(secs, 0)} s\n\n` +
        `2. Bit: ${fmt(fs, 0)} Hz · ${depth} Bit · ${ch} · ${fmt(secs, 0)} s = ${fmt(bytes * 8, 0)} Bit\n\n` +
        `3. Byte: ÷ 8 = ${fmt(bytes, 0)} Byte\n\n` +
        `4. ${u.name}: ${fmt(bytes, 0)} ÷ ${fmt(u.f, 0)} = **${fmt(ans, 2)} ${u.name}**\n\nHäufiger Fehler: Kanäle vergessen oder Minuten nicht in Sekunden umrechnen.`,
    });
  },
};

/* ------------------------------------------------------------------ */
/* daten.video – Speicherbedarf von Video mit Kompressionsfaktor        */
/* ------------------------------------------------------------------ */

const AUFL: { w: number; h: number; n: string }[] = [
  { w: 1280, h: 720, n: 'HD' },
  { w: 1920, h: 1080, n: 'Full HD' },
  { w: 2560, h: 1440, n: 'WQHD' },
  { w: 3840, h: 2160, n: '4K UHD' },
];

const videoGen: GeneratorMeta = {
  id: 'daten.video',
  title: 'Speicherbedarf von Video (mit Kompression)',
  skill: 'data.mediengroesse',
  module: 'd04',
  make(rng, d) {
    const r = rng.pick(d === 1 ? AUFL.slice(0, 2) : AUFL);
    const bpp = d === 3 ? rng.pick([24, 30]) : 24;
    const fps = rng.pick([24, 25, 30, 50, 60]);
    const secs = d === 1 ? rng.pick([10, 20, 30, 60]) : rng.int(1, 18) * 5 * 60;
    const k = d === 1 ? 1 : rng.pick([50, 100, 150, 200]);
    const n = d === 3 ? rng.pick([20, 40, 60, 120, 250]) : 1;
    const rawBytes = (r.w * r.h * bpp * fps * secs) / 8;
    const bytes = (rawBytes / k) * n;
    const u = unitFor(bytes, d === 1 ? false : rng.bool(0.6));
    const ans = round2(bytes / u.f);
    const durText = secs < 60 ? `${secs} Sekunden` : `${secs / 60} Minuten`;
    const mcs: Mc[] = [
      { answer: round2((bytes * 8) / u.f), error: 'einheit-bit-byte', why: 'Du hast vergessen, Bit in Byte umzurechnen (÷ 8).' },
      { answer: round2(bytes / otherUnit(u).f), error: 'einheit-1000-1024', why: mcUnitWhy(u) },
    ];
    if (k > 1) {
      mcs.push({ answer: round2((rawBytes * n) / u.f), error: 'video-kompression-vergessen', why: `Du hast den Kompressionsfaktor 1 : ${k} vergessen. Die komprimierte Datei ist ${k}-mal kleiner.` });
      mcs.push({ answer: round2((rawBytes * k * n) / u.f), error: 'video-kompression-falsch', why: `Kompression 1 : ${k} heißt: Die Datenmenge wird durch ${k} **geteilt**, nicht multipliziert.` });
    }
    if (secs >= 60) mcs.push({ answer: round2(bytes / 60 / u.f), error: 'zeit-minuten-sekunden', why: 'Die Bildrate gilt **pro Sekunde**: Minuten erst mit 60 multiplizieren.' });
    const situation =
      d === 1
        ? `Eine Überwachungskamera speichert einen Clip **unkomprimiert**`
        : d === 2
          ? `Ein Schulungsvideo für die Elektro Krämer GmbH wird mit einem Codec im Verhältnis **1 : ${k}** komprimiert gespeichert`
          : `Für die Mediathek eines Kunden sollen **${n} Lernvideos** auf einem NAS gespeichert werden; der Codec komprimiert im Verhältnis **1 : ${k}**`;
    return numQ('daten.video', 'data.mediengroesse', d, {
      prompt: `${situation}. ${n > 1 ? 'Jedes Video hat' : 'Daten'}: **${r.w} × ${r.h}** Pixel (${r.n}), **${bpp} Bit** je Pixel, **${fps} Bilder/s**, Dauer **${durText}**. Ton vernachlässigen.\n\nWie viel Speicher wird benötigt? Angabe in **${u.name}** (${u.def}), auf zwei Nachkommastellen runden.`,
      answer: ans,
      tolerance: 0.01,
      unit: u.name,
      hints: ['Bit pro Bild = Breite · Höhe · Bit je Pixel.', 'Bit gesamt = Bit pro Bild · Bilder/s · Sekunden.', k > 1 ? `Dann ÷ 8 (Byte) und ÷ ${k} (Kompression)${n > 1 ? `, · ${n} Videos` : ''}.` : 'Dann ÷ 8 (Byte) und in die gefragte Einheit umrechnen.'],
      mcs,
      explanation:
        [
          `Bit pro Bild: ${r.w} · ${r.h} · ${bpp} = ${fmt(r.w * r.h * bpp, 0)} Bit`,
          `Bit gesamt: · ${fps} Bilder/s · ${fmt(secs, 0)} s${secs >= 60 ? ` (${secs / 60} min · 60)` : ''} = ${fmt(rawBytes * 8, 0)} Bit`,
          `Byte: ÷ 8 = ${fmt(rawBytes, 0)} Byte${k > 1 ? ' (unkomprimiert)' : ''}`,
          ...(k > 1 ? [`Kompression 1 : ${k}: ${fmt(rawBytes, 0)} ÷ ${k} = ${fmt(rawBytes / k, 0)} Byte`] : []),
          ...(n > 1 ? [`${n} Videos: · ${n} = ${fmt(bytes, 0)} Byte`] : []),
          `${u.name}: ${fmt(bytes, 0)} ÷ ${fmt(u.f, 0)} = **${fmt(ans, 2)} ${u.name}**`,
        ]
          .map((t, i) => `${i + 1}. ${t}`)
          .join('\n\n') +
        `\n\nHäufiger Fehler: ${k > 1 ? 'Kompressionsfaktor vergessen oder ' : ''}Bit nicht durch 8 teilen${secs >= 60 ? ' oder Minuten nicht in Sekunden umrechnen' : ''}.`,
    });
  },
};

/* ------------------------------------------------------------------ */

export const GENERATORS_DATEN: GeneratorMeta[] = [
  zeilenGen, aggregatGen, joinGen, kardinalitaetGen, fkplatzGen,
  numconvGen, asciiGen, utfbytesGen, bildspeicherGen, audioGen, videoGen,
];

