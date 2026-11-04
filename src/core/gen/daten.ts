/**
 * Aufgaben-Generatoren für den Bereich „Datenbanken“ (Module d01–d03).
 *
 * Alle Ergebnisse werden in reinem TypeScript exakt berechnet (kein SQL im Browser).
 * Die Abfragen in den Aufgabentexten sind Standard-SQL; die Lösungen wurden zur
 * Qualitätssicherung zusätzlich mit SQLite gegengeprüft.
 */
import type { Difficulty, NumberQuestion, Question, SingleChoiceQuestion } from '../../content/types';
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
  o: { prompt: string; answer: number; tolerance?: number; unit?: string; hints: string[]; explanation: string; mcs?: Mc[] },
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

/* ------------------------------------------------------------------ */

export const GENERATORS_DATEN: GeneratorMeta[] = [zeilenGen, aggregatGen, joinGen, kardinalitaetGen, fkplatzGen];
