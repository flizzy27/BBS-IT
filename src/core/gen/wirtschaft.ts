/**
 * Aufgabengeneratoren für den Fachbereich „Kundenberatung, Wirtschaft & Recht“ (Module w01–w05).
 * Alle Geldbeträge werden intern in **Cent (Ganzzahlen)** gerechnet und nach jedem Rechenschritt
 * kaufmännisch auf Cent gerundet – genau so, wie es im Aufgabentext steht.
 */
import type { TableQuestion } from '../../content/types';
import type { GeneratorMeta } from '../generators';
import { Rng } from '../rng';

let counter = 0;
const gid = (g: string) => `gen:${g}:${Date.now().toString(36)}${(counter++).toString(36)}`;

/** deutsche Zahl mit genau zwei Nachkommastellen */
const de2 = (x: number) => x.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
/** Cent → „1.234,56 €“ */
const eur = (c: number) => `${de2(c / 100)} €`;
/** Prozentangabe deutsch */
const pctS = (p: number) => `${p.toLocaleString('de-DE')} %`;
/** deutsche Zahl, max. n Nachkommastellen */
const deN = (x: number, n = 2) => x.toLocaleString('de-DE', { maximumFractionDigits: n });
/** p % von c (Cent), kaufmännisch auf Cent gerundet. p nur ganzzahlig oder mit ,5 verwenden (exakt darstellbar). */
const pctOf = (c: number, p: number) => Math.round((c * p) / 100);
/** Cent → Antwortstring für number-Zellen/Fehlbilder */
const cs = (c: number) => String(c / 100);

type Mc = { answer: string; error: string; why: string; cell?: string };
/** Fehlbilder entfernen, die innerhalb der Toleranz der richtigen Lösung liegen oder doppelt sind. */
function cleanMc(answer: number, tol: number, list: Mc[]): Mc[] {
  const seen = new Set<string>();
  return list.filter((m) => {
    const v = Number(m.answer);
    if (!Number.isFinite(v) || Math.abs(v - answer) <= tol + 0.0051) return false;
    if (seen.has(m.answer)) return false;
    seen.add(m.answer);
    return true;
  });
}
/** Für Tabellenzellen mit verketteter Rundung: ±1 Cent zusätzlich akzeptieren. */
const acceptCent = (c: number) => [cs(c - 1), cs(c + 1)];

/* ------------------------------------------------------------------ */
/* w02: Bezugskalkulation                                              */
/* ------------------------------------------------------------------ */

const PRODUCTS = [
  { n: 'Business-Notebook', p: [74900, 89900, 104900, 119900] },
  { n: 'Monitor 27 Zoll', p: [21900, 24900, 28990, 32900] },
  { n: 'USB-C-Dockingstation', p: [14900, 17990, 19900, 22900] },
  { n: 'Thin Client', p: [32900, 38990, 42900] },
  { n: 'Managed Switch (24 Port, PoE)', p: [38900, 45900, 52990] },
  { n: 'Multifunktionsdrucker A4', p: [54900, 68900, 79900] },
] as const;

function bezugCalc(unit: number, qty: number, rabatt: number, skonto: number, bk: number) {
  const lep = unit * qty;
  const rab = pctOf(lep, rabatt);
  const zep = lep - rab;
  const sk = pctOf(zep, skonto);
  const bep = zep - sk;
  const bzp = bep + bk;
  return { lep, rab, zep, sk, bep, bzp };
}

function bezugSchema(r: ReturnType<typeof bezugCalc>, rabatt: number, skonto: number, bk: number, qty: number, unit: number) {
  return `| Schritt | Rechnung | Betrag |
|---|---|---:|
| Listeneinkaufspreis | ${qty} × ${eur(unit)} | ${eur(r.lep)} |
| − Liefererrabatt (${pctS(rabatt)}) | ${eur(r.lep)} · ${deN(rabatt)} / 100 | − ${eur(r.rab)} |
| **= Zieleinkaufspreis** | | **${eur(r.zep)}** |
| − Liefererskonto (${pctS(skonto)}) | ${skonto ? `${eur(r.zep)} · ${deN(skonto)} / 100` : 'kein Skonto'} | − ${eur(r.sk)} |
| **= Bareinkaufspreis** | | **${eur(r.bep)}** |
| + Bezugskosten | Versand/Fracht | + ${eur(bk)} |
| **= Bezugspreis (Einstandspreis)** | | **${eur(r.bzp)}** |`;
}

const bezugspreis: GeneratorMeta = {
  id: 'w.bezugspreis',
  title: 'Bezugspreis berechnen (Bezugskalkulation)',
  skill: 'w.bezugskalkulation',
  module: 'w02',
  make(rng, d) {
    const prod = rng.pick(PRODUCTS);
    const unit = rng.pick(prod.p);
    const qty = d === 1 ? rng.pick([1, 5, 10]) : rng.pick([5, 8, 10, 12, 15, 20, 25]);
    const rabatt = d === 1 ? rng.pick([5, 10, 15]) : rng.pick([5, 8, 10, 12, 12.5, 15, 20]);
    const skonto = d === 1 ? 0 : rng.pick([2, 2.5, 3]);
    const bk = rng.pick([1990, 2500, 3990, 4950, 5900, 7500, 9900]);

    if (d === 3) {
      // Zwei Angebote vergleichen: B ohne Versandkosten (frei Haus), dafür weniger Rabatt
      const unitB = unit + rng.pick([-2000, -1000, 0, 1000, 2000]);
      const rabattB = Math.max(0, rabatt - rng.pick([2, 5]));
      const skontoB = rng.pick([0, 2, 3]);
      const a = bezugCalc(unit, qty, rabatt, skonto, bk);
      const b = bezugCalc(unitB, qty, rabattB, skontoB, 0);
      const rowsDef: [string, number, number, boolean][] = [
        ['Listeneinkaufspreis', a.lep, b.lep, true],
        ['− Liefererrabatt', a.rab, b.rab, false],
        ['= Zieleinkaufspreis', a.zep, b.zep, false],
        ['− Liefererskonto', a.sk, b.sk, false],
        ['= Bareinkaufspreis', a.bep, b.bep, false],
        ['+ Bezugskosten', bk, 0, true],
        ['= Bezugspreis', a.bzp, b.bzp, false],
      ];
      const q: TableQuestion = {
        id: gid('w.bezugspreis'), generated: true, kind: 'table', skill: 'w.bezugskalkulation', difficulty: d,
        prompt: `Die Elektro Krämer GmbH benötigt **${qty} × ${prod.n}**. Zwei Angebote liegen vor (alle Preise netto):

| | Angebot A – Systemhaus Nord | Angebot B – IT-Direkt24 |
|---|---|---|
| Listenpreis je Stück | ${eur(unit)} | ${eur(unitB)} |
| Rabatt | ${pctS(rabatt)} | ${pctS(rabattB)} |
| Zahlungsbedingung | ${pctS(skonto)} Skonto innerhalb 10 Tagen, 30 Tage netto | ${skontoB ? `${pctS(skontoB)} Skonto innerhalb 14 Tagen, 30 Tage netto` : '30 Tage netto, kein Skonto'} |
| Lieferung | Versandpauschale ${eur(bk)} | frei Haus |

Führe für beide Angebote die **Bezugskalkulation** durch (Skonto wird genutzt). Runde jedes Zwischenergebnis kaufmännisch **auf Cent**. Abzüge als positive Beträge eintragen.`,
        columns: [
          { key: 'a', label: 'Angebot A (€)', type: 'number' },
          { key: 'b', label: 'Angebot B (€)', type: 'number' },
        ],
        rows: rowsDef.map(([label, va, vb, given]) => ({
          label,
          cells: given
            ? { a: { given: de2(va / 100) }, b: { given: de2(vb / 100) } }
            : { a: { answer: cs(va), accept: acceptCent(va) }, b: { answer: cs(vb), accept: acceptCent(vb) } },
        })),
        misconceptions: [
          { cell: '3:a', answer: cs(pctOf(a.lep, skonto)), error: 'w-skonto-basis', why: 'Skonto wird vom **Zieleinkaufspreis** (nach Rabatt) berechnet, nicht vom Listeneinkaufspreis.' },
          { cell: '6:a', answer: cs(a.bep), error: 'w-bezugskosten-vergessen', why: 'Die Versandpauschale (Bezugskosten) muss zum Bareinkaufspreis **addiert** werden.' },
        ],
        hints: ['Schema: Listeneinkaufspreis − Rabatt = Zieleinkaufspreis − Skonto = Bareinkaufspreis + Bezugskosten = Bezugspreis.', 'Skonto bezieht sich auf den Betrag **nach** Abzug des Rabatts.'],
        explanation: `**Angebot A**\n\n${bezugSchema(a, rabatt, skonto, bk, qty, unit)}\n\n**Angebot B**\n\n${bezugSchema(b, rabattB, skontoB, 0, qty, unitB)}\n\n` +
          `**Ergebnis:** ${a.bzp === b.bzp ? 'Beide Angebote kosten gleich viel.' : `Angebot ${a.bzp < b.bzp ? 'A' : 'B'} ist rein rechnerisch um **${eur(Math.abs(a.bzp - b.bzp))}** günstiger.`} Für die Entscheidung gehören noch qualitative Kriterien dazu (Lieferzeit, Service, Garantie …).`,
      };
      return q;
    }

    const r = bezugCalc(unit, qty, rabatt, skonto, bk);
    const answer = r.bzp / 100;
    const mcs: Mc[] = [
      { answer: cs(r.bep), error: 'w-bezugskosten-vergessen', why: 'Du hast die Bezugskosten (Versandpauschale) vergessen. Sie werden zum Bareinkaufspreis **addiert**.' },
      { answer: cs(r.lep - r.rab - pctOf(r.lep, skonto) + bk), error: 'w-skonto-basis', why: 'Skonto wird vom **Zieleinkaufspreis** (nach Rabatt) berechnet, nicht vom Listeneinkaufspreis.' },
      { answer: cs(r.lep - pctOf(r.lep, skonto) + bk), error: 'w-rabatt-vergessen', why: 'Der Liefererrabatt wurde nicht abgezogen.' },
      { answer: cs(r.zep + bk - pctOf(r.zep + bk, skonto)), error: 'w-skonto-auf-bezugskosten', why: 'Skonto gewährt der Lieferer nur auf den Warenwert – die Bezugskosten werden **nach** dem Skontoabzug addiert.' },
      { answer: cs(r.lep - r.rab + bk), error: 'w-skonto-vergessen', why: 'Laut Aufgabe wird das Skonto genutzt – es muss vom Zieleinkaufspreis abgezogen werden.' },
      { answer: cs(r.lep + bk), error: 'w-rabatt-vergessen', why: 'Rabatt (und ggf. Skonto) wurden nicht abgezogen.' },
    ];
    return {
      id: gid('w.bezugspreis'), generated: true, kind: 'number', skill: 'w.bezugskalkulation', difficulty: d,
      prompt: `Die Elektro Krämer GmbH bestellt **${qty} × ${prod.n}** zum Listenpreis von **${eur(unit)}** je Stück (netto). Der Lieferer gewährt **${pctS(rabatt)} Rabatt**${skonto ? ` und **${pctS(skonto)} Skonto** bei Zahlung innerhalb von 10 Tagen (das Skonto wird genutzt)` : ''}. Für den Versand berechnet er pauschal **${eur(bk)}** (netto).\n\nBerechne den **Bezugspreis** der gesamten Lieferung in Euro. Runde jedes Zwischenergebnis kaufmännisch **auf Cent**.`,
      answer, tolerance: 0.01, unit: '€',
      misconceptions: cleanMc(answer, 0.01, mcs),
      hints: ['Listeneinkaufspreis = Menge × Stückpreis.', skonto ? 'Rabatt vom Listenpreis, Skonto vom Zieleinkaufspreis, danach Bezugskosten addieren.' : 'Rabatt abziehen, dann Bezugskosten addieren.'],
      explanation: bezugSchema(r, rabatt, skonto, bk, qty, unit),
    };
  },
};

/* ------------------------------------------------------------------ */
/* w02: Nutzwertanalyse                                                */
/* ------------------------------------------------------------------ */

const CRITERIA = ['Preis', 'Leistung (CPU/RAM)', 'Garantie & Service', 'Energieverbrauch', 'Lieferzeit', 'Ergonomie', 'Erweiterbarkeit', 'Akkulaufzeit', 'Gewicht'];
const WEIGHTS: Record<number, number[][]> = {
  3: [[50, 30, 20], [40, 35, 25], [40, 40, 20], [45, 35, 20], [60, 25, 15]],
  4: [[40, 30, 20, 10], [35, 25, 25, 15], [30, 30, 25, 15], [40, 25, 20, 15], [30, 25, 25, 20]],
  5: [[30, 25, 20, 15, 10], [25, 25, 20, 15, 15], [35, 20, 20, 15, 10], [30, 20, 20, 20, 10]],
};
const VENDORS = ['A – Systemhaus Nord', 'B – PC-Profi GmbH', 'C – TechDirect AG'];

const nutzwert: GeneratorMeta = {
  id: 'w.nutzwert',
  title: 'Nutzwertanalyse auswerten',
  skill: 'w.nutzwertanalyse',
  module: 'w02',
  make(rng, d) {
    const k = d === 1 ? 3 : d === 2 ? 4 : 5;
    const nOff = d === 1 ? 2 : 3;
    const crit = rng.shuffle(CRITERIA).slice(0, k);
    const w = rng.shuffle(rng.pick(WEIGHTS[k]));
    let pts: number[][] = [];
    let sums: number[] = [];
    for (let tries = 0; tries < 200; tries++) {
      pts = Array.from({ length: nOff }, () => crit.map(() => rng.int(2, 10)));
      sums = pts.map((p) => p.reduce((s, x, i) => s + x * w[i], 0)); // in Hundertstel
      const sorted = [...sums].sort((a, b) => b - a);
      const distinct = sorted.every((v, i) => i === 0 || sorted[i - 1] - v >= 10);
      const raw = pts.map((p) => p.reduce((s, x) => s + x, 0));
      const rawWinner = raw.indexOf(Math.max(...raw));
      // gelegentlich soll die ungewichtete Summe einen anderen Gewinner liefern (Lerneffekt)
      if (distinct && (d === 1 || tries > 60 || rawWinner !== sums.indexOf(sorted[0]))) break;
    }
    const nw = sums.map((s) => s / 100);
    const rank = sums.map((s) => sums.filter((t) => t > s).length + 1);
    const winner = rank.indexOf(1);
    const names = VENDORS.slice(0, nOff);
    const tbl = `| Kriterium | Gewichtung | ${names.map((n) => 'Angebot ' + n.split(' – ')[0]).join(' | ')} |\n|---|---|${names.map(() => '---').join('|')}|\n` +
      crit.map((c, i) => `| ${c} | ${w[i]} % | ${pts.map((p) => p[i]).join(' | ')} |`).join('\n');
    const rule = 'Punkte: 1 (schlecht) bis 10 (sehr gut). Rechne mit den Gewichten als Dezimalfaktor (z. B. 40 % = 0,40): Teilnutzwert = Gewicht · Punkte; Nutzwert = Summe der Teilnutzwerte.';
    const expl =
      names.map((n, o) => `**Angebot ${n}:** ${crit.map((_, i) => `${deN(w[i] / 100)} · ${pts[o][i]}`).join(' + ')} = ${crit.map((_, i) => deN((w[i] * pts[o][i]) / 100)).join(' + ')} = **${de2(nw[o])}**`).join('\n\n') +
      `\n\n**Rangfolge:** ${rank.map((r, o) => ({ r, o })).sort((x, y) => x.r - y.r).map(({ r, o }) => `${r}. Angebot ${names[o]} (${de2(nw[o])})`).join(' · ')}\n\nDas Angebot mit dem **höchsten** Nutzwert wird empfohlen: **Angebot ${names[winner]}**.`;
    const hints = ['Multipliziere für jedes Kriterium Gewicht (als Faktor) × Punkte.', 'Addiere die Teilnutzwerte je Angebot. Höchster Nutzwert = Rang 1.'];

    if (d === 1) {
      const o = rng.int(0, nOff - 1);
      const raw = pts[o].reduce((s, x) => s + x, 0);
      const answer = nw[o];
      return {
        id: gid('w.nutzwert'), generated: true, kind: 'number', skill: 'w.nutzwertanalyse', difficulty: d,
        prompt: `Für die Auswahl neuer Arbeitsplatzrechner wurde folgende Bewertung erstellt. ${rule}\n\n${tbl}\n\nBerechne den **Nutzwert von Angebot ${names[o].split(' – ')[0]}** (zwei Nachkommastellen).`,
        answer, tolerance: 0.005,
        misconceptions: cleanMc(answer, 0.005, [
          { answer: String(raw), error: 'w-nutzwert-ungewichtet', why: 'Du hast nur die Punkte addiert. Jede Punktzahl muss vorher mit dem **Gewicht** des Kriteriums multipliziert werden.' },
          { answer: String(sums[o]), error: 'w-nutzwert-prozent', why: 'Du hast mit den Prozentzahlen statt mit Dezimalfaktoren gerechnet (40 statt 0,40). Laut Aufgabe ist das Ergebnis durch 100 zu teilen.' },
          { answer: String(Math.round((raw / k) * 100) / 100), error: 'w-nutzwert-ungewichtet', why: 'Das ist der ungewichtete Durchschnitt der Punkte – die Gewichtung fehlt.' },
        ]),
        hints,
        explanation: expl,
      };
    }

    if (d === 2) {
      const raws = pts.map((p) => p.reduce((s, x) => s + x, 0));
      const q: TableQuestion = {
        id: gid('w.nutzwert'), generated: true, kind: 'table', skill: 'w.nutzwertanalyse', difficulty: d,
        prompt: `Die Elektro Krämer GmbH vergleicht drei Angebote für neue Notebooks. ${rule}\n\n${tbl}\n\nTrage für jedes Angebot den **Nutzwert** (zwei Nachkommastellen) und den **Rang** (1 = beste Wahl) ein.`,
        columns: [
          { key: 'nw', label: 'Nutzwert', type: 'number' },
          { key: 'rang', label: 'Rang', type: 'number' },
        ],
        rows: names.map((n, o) => ({ label: `Angebot ${n}`, cells: { nw: { answer: String(nw[o]) }, rang: { answer: String(rank[o]) } } })),
        misconceptions: names.flatMap((_, o) => [
          { cell: `${o}:nw`, answer: String(raws[o]), error: 'w-nutzwert-ungewichtet', why: 'Nur Punkte addiert – die Gewichtung fehlt.' },
          { cell: `${o}:nw`, answer: String(sums[o]), error: 'w-nutzwert-prozent', why: 'Mit Prozentzahlen statt Dezimalfaktoren gerechnet (Ergebnis 100-fach zu groß).' },
        ]).filter((m) => Number(m.answer) !== nw[Number(m.cell.split(':')[0])]),
        hints,
        explanation: expl,
      };
      return q;
    }

    // d === 3: vollständige Tabelle der Teilnutzwerte
    const q: TableQuestion = {
      id: gid('w.nutzwert'), generated: true, kind: 'table', skill: 'w.nutzwertanalyse', difficulty: d,
      prompt: `Für einen Kunden des IT-Systemhauses sollen drei Angebote für Arbeitsplatzrechner per **Nutzwertanalyse** verglichen werden. ${rule}\n\n${tbl}\n\nErgänze die **Teilnutzwerte**, die **Nutzwerte** (Summe) und den **Rang** (1 = beste Wahl).`,
      columns: names.map((n, o) => ({ key: `o${o}`, label: `Angebot ${n.split(' – ')[0]}`, type: 'number' as const })),
      rows: [
        ...crit.map((c, i) => ({ label: `${c} (${w[i]} %)`, cells: Object.fromEntries(names.map((_, o) => [`o${o}`, { answer: String((w[i] * pts[o][i]) / 100) }])) })),
        { label: 'Nutzwert (Summe)', cells: Object.fromEntries(names.map((_, o) => [`o${o}`, { answer: String(nw[o]) }])) },
        { label: 'Rang', cells: Object.fromEntries(names.map((_, o) => [`o${o}`, { answer: String(rank[o]) }])) },
      ],
      misconceptions: crit.flatMap((_, i) => names.map((__, o) => ({ cell: `${i}:o${o}`, answer: String(w[i] * pts[o][i]), error: 'w-nutzwert-prozent', why: 'Gewicht als Dezimalfaktor verwenden (z. B. 0,30 statt 30).' }))),
      hints,
      explanation: expl,
    };
    return q;
  },
};

/* ------------------------------------------------------------------ */
/* w03: Handelskalkulation / Angebotspreis                             */
/* ------------------------------------------------------------------ */

const angebotspreis: GeneratorMeta = {
  id: 'w.angebotspreis',
  title: 'Angebotspreis kalkulieren (inkl. USt)',
  skill: 'w.handelskalkulation',
  module: 'w03',
  make(rng, d) {
    const prod = rng.pick(PRODUCTS);
    const bzp = rng.pick(prod.p) - rng.pick([0, 1000, 2500, 4000]);
    const hk = d === 1 ? 0 : rng.pick([15, 20, 25, 30]);
    const g = rng.pick([5, 8, 10, 12, 15, 20]);
    const sk = d === 3 ? rng.pick([2, 3]) : 0;
    const ra = d === 3 ? rng.pick([5, 10, 15]) : 0;
    const hkB = pctOf(bzp, hk);
    const skost = bzp + hkB;
    const gB = pctOf(skost, g);
    const bvp = skost + gB;
    const zvp = sk ? Math.round((bvp * 100) / (100 - sk)) : bvp;
    const skB = zvp - bvp;
    const lvp = ra ? Math.round((zvp * 100) / (100 - ra)) : zvp;
    const raB = lvp - zvp;
    const ust = pctOf(lvp, 19);
    const brutto = lvp + ust;
    const answer = brutto / 100;
    const tol = d === 3 ? 0.02 : 0.01;

    const rows: string[] = [];
    if (hk) {
      rows.push(`| Bezugspreis | | ${eur(bzp)} |`, `| + Handlungskosten (${pctS(hk)} vom Bezugspreis) | ${eur(bzp)} · ${hk} / 100 | + ${eur(hkB)} |`);
    }
    rows.push(`| **= Selbstkosten** | | **${eur(skost)}** |`, `| + Gewinn (${pctS(g)} von den Selbstkosten) | ${eur(skost)} · ${g} / 100 | + ${eur(gB)} |`, `| **= Barverkaufspreis** | | **${eur(bvp)}** |`);
    if (sk) rows.push(`| + Kundenskonto (${pctS(sk)} **im Hundert**) | ${eur(bvp)} / ${100 - sk} · ${sk} | + ${eur(skB)} |`, `| **= Zielverkaufspreis** | | **${eur(zvp)}** |`);
    if (ra) rows.push(`| + Kundenrabatt (${pctS(ra)} **im Hundert**) | ${eur(zvp)} / ${100 - ra} · ${ra} | + ${eur(raB)} |`);
    rows.push(`| **= Listenverkaufspreis netto** | | **${eur(lvp)}** |`, `| + Umsatzsteuer 19 % | ${eur(lvp)} · 0,19 | + ${eur(ust)} |`, `| **= Listenverkaufspreis brutto** | | **${eur(brutto)}** |`);

    const naive = (() => {
      // Skonto/Rabatt fälschlich „vom Hundert“ aufgeschlagen
      const z = bvp + pctOf(bvp, sk);
      const l = z + pctOf(z, ra);
      return l + pctOf(l, 19);
    })();
    const mcs: Mc[] = [
      { answer: cs(lvp), error: 'w-ust-vergessen', why: 'Das ist der **Nettopreis**. Gefragt ist der Bruttopreis – es fehlen 19 % Umsatzsteuer.' },
      { answer: cs(lvp + pctOf(lvp, 7)), error: 'w-ust-satz', why: 'IT-Hardware unterliegt dem Regelsteuersatz von **19 %**, nicht dem ermäßigten Satz von 7 %.' },
      { answer: cs(bzp + gB + pctOf(bzp + gB, 19)), error: 'w-handlungskosten-vergessen', why: 'Die Handlungskosten (Gemeinkosten) wurden nicht zugeschlagen – erst Bezugspreis + Handlungskosten = Selbstkosten.' },
      { answer: cs((() => { const s = bzp + pctOf(bzp, hk + g); const z = sk ? Math.round((s * 100) / (100 - sk)) : s; const l = ra ? Math.round((z * 100) / (100 - ra)) : z; return l + pctOf(l, 19); })()), error: 'w-zuschlaege-addiert', why: 'Handlungskosten- und Gewinnzuschlag dürfen nicht addiert werden: Der Gewinn wird auf die **Selbstkosten** (inkl. Handlungskosten) aufgeschlagen.' },
    ];
    if (sk || ra) mcs.push({ answer: cs(naive), error: 'w-im-hundert', why: 'Kundenskonto und Kundenrabatt werden **im Hundert** gerechnet (der Barverkaufspreis entspricht 100 % − Skonto), nicht als Aufschlag vom Hundert.' });

    const steps = hk
      ? `Bezugspreis ${eur(bzp)}, Handlungskostenzuschlag ${pctS(hk)}, Gewinnzuschlag ${pctS(g)}${sk ? `, Kundenskonto ${pctS(sk)}, Kundenrabatt ${pctS(ra)}` : ''}`
      : `Selbstkosten ${eur(skost)}, Gewinnzuschlag ${pctS(g)}`;
    return {
      id: gid('w.angebotspreis'), generated: true, kind: 'number', skill: 'w.handelskalkulation', difficulty: d,
      prompt: `Das IT-Systemhaus kalkuliert den Verkaufspreis für **1 × ${prod.n}**. Gegeben: ${steps}. Es gilt der Umsatzsteuersatz von 19 %.\n\nBerechne den **Listenverkaufspreis brutto** in Euro. Runde jedes Zwischenergebnis kaufmännisch **auf Cent**.${sk ? ' Kundenskonto und Kundenrabatt werden im Hundert gerechnet.' : ''}`,
      answer, tolerance: tol, unit: '€',
      misconceptions: cleanMc(answer, tol, mcs),
      hints: [
        hk ? 'Bezugspreis + Handlungskosten = Selbstkosten; Selbstkosten + Gewinn = Barverkaufspreis.' : 'Selbstkosten + Gewinn = Barverkaufspreis (= Nettoverkaufspreis).',
        ...(sk ? ['Im Hundert: Zielverkaufspreis = Barverkaufspreis / (100 − Skontosatz) · 100.'] : []),
        'Zum Schluss 19 % Umsatzsteuer auf den Nettopreis aufschlagen.',
      ],
      explanation: `| Schritt | Rechnung | Betrag |\n|---|---|---:|\n${rows.join('\n')}`,
    };
  },
};

/* ------------------------------------------------------------------ */
/* w03: Dienstleistungsangebot (Stundensatz)                           */
/* ------------------------------------------------------------------ */

const dienstleistung: GeneratorMeta = {
  id: 'w.dienstleistung',
  title: 'Angebot für eine IT-Dienstleistung',
  skill: 'w.dienstleistungsangebot',
  module: 'w03',
  make(rng, d) {
    const task = rng.pick([
      { t: 'Einrichtung von Arbeitsplätzen (Hardware aufbauen, Image installieren, Daten übernehmen)', unit: 'Arbeitsplatz', min: 45 },
      { t: 'Austausch der Switches im Verteilerraum inkl. Konfiguration', unit: 'Switch', min: 90 },
      { t: 'Installation von Netzwerkdruckern inkl. Treiberverteilung', unit: 'Drucker', min: 60 },
    ]);
    const n = d === 1 ? rng.pick([4, 6, 8]) : rng.pick([6, 8, 10, 12, 15]);
    const minutes = n * task.min; // Arbeitszeit
    const hours = minutes / 60;
    const rate = rng.pick([7500, 8500, 9500, 11000]);
    const labour = Math.round((hours * rate)); // hours ist ein Vielfaches von 0,25 → exakt
    const material = d === 1 ? rng.pick([12000, 18950, 24900]) : rng.pick([34900, 48990, 62950, 79900]);
    const anfahrt = rng.pick([4500, 5900, 6900]);
    const anfahrten = d === 1 ? 1 : rng.pick([1, 2]);
    const rab = d === 3 ? rng.pick([5, 10]) : 0; // Rabatt nur auf Arbeitsleistung
    const rabB = pctOf(labour, rab);
    const netto = labour - rabB + material + anfahrt * anfahrten;
    const ust = pctOf(netto, 19);
    const brutto = netto + ust;
    const answer = brutto / 100;
    return {
      id: gid('w.dienstleistung'), generated: true, kind: 'number', skill: 'w.dienstleistungsangebot', difficulty: d,
      prompt: `Ein Kunde des IT-Systemhauses beauftragt: **${task.t}** für **${n} × ${task.unit}**. Kalkuliert werden **${task.min} Minuten** Arbeitszeit je ${task.unit}.\n\n| Position | Wert (netto) |\n|---|---|\n| Stundenverrechnungssatz Techniker | ${eur(rate)} je Stunde |\n| Material (Kabel, Kleinteile, Lizenzen) | ${eur(material)} pauschal |\n| Anfahrtspauschale | ${eur(anfahrt)} je Anfahrt, ${anfahrten} Anfahrt${anfahrten > 1 ? 'en' : ''} |${rab ? `\n| Rabatt | ${pctS(rab)} **nur auf die Arbeitsleistung** |` : ''}\n\nBerechne den **Angebotspreis brutto** (19 % USt). Runde auf Cent.`,
      answer, tolerance: 0.01, unit: '€',
      misconceptions: cleanMc(answer, 0.01, [
        { answer: cs(netto), error: 'w-ust-vergessen', why: 'Das ist der Nettobetrag – es fehlen 19 % Umsatzsteuer.' },
        { answer: cs((() => { const l = minutes * rate; const nt = l - pctOf(l, rab) + material + anfahrt * anfahrten; return nt + pctOf(nt, 19); })()), error: 'w-minuten-stunden', why: 'Minuten müssen erst in Stunden umgerechnet werden (÷ 60), bevor mit dem Stundensatz multipliziert wird.' },
        { answer: cs((() => { const nt = labour - rabB + material + anfahrt; return nt + pctOf(nt, 19); })()), error: 'w-position-vergessen', why: 'Die Anfahrtspauschale fällt pro Anfahrt an – prüfe die Anzahl der Anfahrten.' },
        { answer: cs((() => { const base = labour + material + anfahrt * anfahrten; const nt = base - pctOf(base, rab); return nt + pctOf(nt, 19); })()), error: 'w-rabatt-basis', why: 'Der Rabatt gilt laut Angebot **nur auf die Arbeitsleistung**, nicht auf Material und Anfahrt.' },
      ]),
      hints: [`Arbeitszeit gesamt: ${n} × ${task.min} min = ${minutes} min = ${deN(hours)} h.`, 'Arbeitsleistung + Material + Anfahrt = Netto; dann 19 % USt.'],
      explanation: `| Position | Rechnung | Betrag |\n|---|---|---:|\n| Arbeitsleistung | ${n} × ${task.min} min = ${minutes} min = ${deN(hours)} h · ${eur(rate)} | ${eur(labour)} |\n${rab ? `| − Rabatt ${pctS(rab)} auf Arbeitsleistung | ${eur(labour)} · ${rab} / 100 | − ${eur(rabB)} |\n` : ''}| + Material | pauschal | ${eur(material)} |\n| + Anfahrt | ${anfahrten} × ${eur(anfahrt)} | ${eur(anfahrt * anfahrten)} |\n| **= Angebotspreis netto** | | **${eur(netto)}** |\n| + USt 19 % | ${eur(netto)} · 0,19 | ${eur(ust)} |\n| **= Angebotspreis brutto** | | **${eur(brutto)}** |`,
    };
  },
};

/* ------------------------------------------------------------------ */
/* w03: Kauf vs. Leasing vs. Miete                                     */
/* ------------------------------------------------------------------ */

const kaufLeasing: GeneratorMeta = {
  id: 'w.kaufleasing',
  title: 'Kauf, Leasing oder Miete vergleichen',
  skill: 'w.kaufleasing',
  module: 'w03',
  make(rng, d) {
    const dev = rng.pick([
      { n: 'Notebooks', p: [89900, 109900, 129900], w: [6000, 8000, 9000] },
      { n: 'Multifunktionsdrucker', p: [149000, 189000, 229000], w: [18000, 24000, 30000] },
      { n: 'Thin Clients inkl. Monitor', p: [59900, 69900, 79900], w: [3000, 4500, 6000] },
    ]);
    let n = 0, months = 0, price = 0, wart = 0, sz = 0, rate = 0, miete = 0, rest = 0;
    let kauf = 0, leasing = 0, mieteT = 0;
    for (let tries = 0; tries < 100; tries++) {
      n = rng.pick([5, 8, 10, 12, 15, 20]);
      months = rng.pick([36, 48]);
      price = rng.pick(dev.p);
      wart = rng.pick(dev.w); // Wartung je Gerät und Jahr
      sz = d === 1 ? 0 : rng.pick([0, 50000, 100000]);
      const lf = rng.pick([2.6, 2.8, 3.0, 3.2]) / 100; // Leasingfaktor pro Monat
      rate = Math.round((price * lf) / 10) * 10 * n; // Rate gesamt pro Monat (auf 10 Cent)
      miete = Math.round(((price / months) * rng.pick([1.05, 1.15, 1.25, 1.35]) + wart / 12) / 10) * 10 * n; // inkl. Wartung
      rest = d === 3 ? rng.pick([5000, 8000, 10000, 15000]) * n : 0; // Verkaufserlös am Ende (gesamt)
      const years = months / 12;
      kauf = price * n + wart * n * years - rest;
      leasing = sz + rate * months + wart * n * years;
      mieteT = miete * months;
      const vals = [kauf, leasing, mieteT];
      if (new Set(vals).size === 3 && Math.min(...vals.map((v, i) => Math.min(...vals.filter((_, j) => j !== i).map((x) => Math.abs(x - v))))) >= 10000) break;
    }
    const years = months / 12;
    const tbl = `| | Kauf | Leasing | Miete |\n|---|---|---|---|\n| Einmalig | Kaufpreis ${eur(price)} je Gerät | ${sz ? `Sonderzahlung ${eur(sz)}` : 'keine Sonderzahlung'} | – |\n| Monatlich | – | Leasingrate ${eur(rate)} (für alle ${n} Geräte) | Miete ${eur(miete)} (für alle ${n} Geräte) **inkl. Wartung** |\n| Wartung | ${eur(wart)} je Gerät und Jahr | ${eur(wart)} je Gerät und Jahr | inklusive |${rest ? `\n| Am Laufzeitende | Verkauf der Altgeräte für insgesamt ${eur(rest)} | Rückgabe | Rückgabe |` : ''}`;
    const intro = `Die Elektro Krämer GmbH benötigt für **${months} Monate** **${n} ${dev.n}**. Es liegen drei Finanzierungsvarianten vor (alle Beträge netto):\n\n${tbl}\n\n`;
    const expl = `| Variante | Rechnung | Gesamtkosten |\n|---|---|---:|\n` +
      `| Kauf | ${n} × ${eur(price)} + ${n} × ${eur(wart)} × ${years} Jahre${rest ? ` − ${eur(rest)} Verkaufserlös` : ''} | **${eur(kauf)}** |\n` +
      `| Leasing | ${sz ? `${eur(sz)} + ` : ''}${months} × ${eur(rate)} + ${n} × ${eur(wart)} × ${years} Jahre | **${eur(leasing)}** |\n` +
      `| Miete | ${months} × ${eur(miete)} | **${eur(mieteT)}** |\n\n` +
      'Hinweis: Reine Kostenbetrachtung. In der Praxis zählen auch Liquidität (Kauf bindet Kapital), Bilanz, Flexibilität und Service.';
    const totals = [kauf, leasing, mieteT];
    const rank = totals.map((t) => totals.filter((x) => x < t).length + 1);

    if (d === 1) {
      const answer = leasing / 100;
      return {
        id: gid('w.kaufleasing'), generated: true, kind: 'number', skill: 'w.kaufleasing', difficulty: d,
        prompt: intro + 'Berechne die **Gesamtkosten der Leasingvariante** über die gesamte Laufzeit in Euro.',
        answer, tolerance: 0.01, unit: '€',
        misconceptions: cleanMc(answer, 0.01, [
          { answer: cs(rate * months), error: 'w-kosten-unvollstaendig', why: 'Beim Leasing kommen die Wartungskosten hinzu (sie sind laut Tabelle nicht in der Rate enthalten).' },
          { answer: cs(rate * 12 + wart * n), error: 'w-laufzeit', why: 'Das sind nur die Kosten für **ein** Jahr. Gefragt ist die gesamte Laufzeit.' },
          { answer: cs(rate * months + wart * years), error: 'w-stueckzahl', why: 'Die Wartung gilt **je Gerät** – mit der Anzahl der Geräte multiplizieren.' },
        ]),
        hints: ['Leasingrate × Anzahl Monate.', 'Wartung je Gerät und Jahr × Geräte × Jahre addieren.'],
        explanation: expl,
      };
    }
    const q: TableQuestion = {
      id: gid('w.kaufleasing'), generated: true, kind: 'table', skill: 'w.kaufleasing', difficulty: d,
      prompt: intro + `Berechne für jede Variante die **Gesamtkosten** über die Laufzeit${d === 3 ? ', die **durchschnittlichen Kosten je Monat** (auf Cent gerundet)' : ''} und den **Rang** (1 = günstigste Variante).`,
      columns: [
        { key: 'k', label: 'Gesamtkosten (€)', type: 'number' },
        ...(d === 3 ? [{ key: 'm', label: 'Ø je Monat (€)', type: 'number' as const }] : []),
        { key: 'r', label: 'Rang', type: 'number' },
      ],
      rows: (['Kauf', 'Leasing', 'Miete'] as const).map((label, i) => ({
        label,
        cells: {
          k: { answer: cs(totals[i]) },
          ...(d === 3 ? { m: { answer: cs(Math.round(totals[i] / months)), accept: acceptCent(Math.round(totals[i] / months)) } } : {}),
          r: { answer: String(rank[i]) },
        },
      })),
      misconceptions: [
        { cell: '0:k', answer: cs(price * n), error: 'w-kosten-unvollstaendig', why: 'Beim Kauf fallen zusätzlich Wartungskosten an' + (rest ? '; der Verkaufserlös am Ende wird abgezogen.' : '.') },
        { cell: '1:k', answer: cs(sz + rate * months), error: 'w-kosten-unvollstaendig', why: 'Beim Leasing ist die Wartung laut Tabelle **nicht** in der Rate enthalten.' },
      ].filter((m) => m.answer !== cs(totals[Number(m.cell[0])])),
      hints: ['Rechne jede Variante über die volle Laufzeit (Monate bzw. Jahre).', 'Wartung = je Gerät und Jahr × Geräte × Jahre.'],
      explanation: expl,
    };
    return q;
  },
};

/* ------------------------------------------------------------------ */
/* w03: Amortisationsdauer                                             */
/* ------------------------------------------------------------------ */

const amortisation: GeneratorMeta = {
  id: 'w.amortisation',
  title: 'Amortisationsdauer berechnen',
  skill: 'w.amortisation',
  module: 'w03',
  make(rng, d) {
    if (d === 1) {
      const e = rng.pick([450, 600, 750, 800, 1200, 1500]);
      const m = rng.pick([12, 15, 18, 20, 24, 30, 36]);
      const inv = e * m;
      const what = rng.pick(['ein Dokumentenmanagementsystem (weniger Papier, Porto und Suchzeit)', 'eine neue Telefonanlage (VoIP) mit günstigerem Tarif', 'ein Ticketsystem für den IT-Support (weniger Arbeitszeit)']);
      return {
        id: gid('w.amortisation'), generated: true, kind: 'number', skill: 'w.amortisation', difficulty: d,
        prompt: `Die Elektro Krämer GmbH investiert **${eur(inv * 100)}** in ${what}. Dadurch spart sie **${eur(e * 100)} pro Monat**. Nach wie vielen **Monaten** hat sich die Investition amortisiert?`,
        answer: m, unit: 'Monate',
        misconceptions: cleanMc(m, 0, [
          { answer: String(Math.round((m / 12) * 100) / 100), error: 'w-einheit-zeit', why: 'Das ist die Dauer in **Jahren**. Gefragt sind Monate.' },
          { answer: String(Math.round((e / inv) * 10000) / 10000), error: 'w-kehrwert', why: 'Kehrwert! Amortisationsdauer = Investition ÷ Einsparung pro Zeiteinheit.' },
        ]),
        hints: ['Amortisationsdauer = Investitionsbetrag ÷ Einsparung pro Monat.'],
        explanation: `Amortisationsdauer = Investition ÷ monatliche Einsparung = ${eur(inv * 100)} ÷ ${eur(e * 100)} = **${m} Monate** (= ${deN(m / 12)} Jahre).`,
      };
    }
    const n = rng.pick([20, 30, 40, 50, 60, 80]);
    const pOld = rng.pick([65, 80, 95, 110]);
    const pNew = rng.pick([12, 15, 18, 25]);
    const h = rng.pick([2000, 2200, 2400, 2600]);
    const price = rng.pick([28, 30, 32, 35]); // Cent/kWh
    const kwh = (n * (pOld - pNew) * h) / 1000; // exakt (h Vielfaches von 100)
    const energy = Math.round(kwh * price); // Cent pro Jahr
    const wartAlt = d === 3 ? rng.pick([150000, 200000, 250000]) : 0; // eingesparte Reparatur/Wartung pro Jahr
    const lizenz = d === 3 ? rng.pick([60000, 90000, 120000]) : 0; // neue laufende Kosten pro Jahr
    const save = energy + wartAlt - lizenz;
    const invPer = rng.pick([350, 420, 480, 550]) * 100;
    const inv = invPer * n;
    const years = Math.round((inv / save) * 100) / 100;
    const answer = years;
    return {
      id: gid('w.amortisation'), generated: true, kind: 'number', skill: 'w.amortisation', difficulty: d,
      prompt: `Die Elektro Krämer GmbH ersetzt **${n} alte Desktop-PCs** (je **${pOld} W**) durch **Thin Clients** (je **${pNew} W**). Die Geräte laufen **${h.toLocaleString('de-DE')} Stunden pro Jahr**; der Strompreis beträgt **${deN(price / 100)} €/kWh**. Die Anschaffung kostet **${eur(invPer)} je Thin Client**.${d === 3 ? ` Zusätzlich entfallen Reparatur- und Wartungskosten der Alt-PCs von **${eur(wartAlt)} pro Jahr**, dafür fallen neue Lizenz- und Supportkosten für die Terminalserver-Umgebung von **${eur(lizenz)} pro Jahr** an.` : ''}\n\nBerechne die **Amortisationsdauer in Jahren** (auf zwei Nachkommastellen runden; die jährliche Einsparung vorher auf Cent runden).`,
      answer, tolerance: 0.01, unit: 'Jahre',
      misconceptions: cleanMc(answer, 0.01, [
        { answer: String(Math.round((inv / (energy * 1000)) * 100) / 100), error: 'w-einheit-kwh', why: 'Watt → Kilowatt: durch **1000** teilen. Du hast die Einsparung 1000-fach zu groß gerechnet.' },
        { answer: String(Math.round((inv / energy) * 100) / 100), error: 'w-kosten-unvollstaendig', why: 'Du hast nur die Stromersparnis berücksichtigt. Eingesparte Wartung erhöht, neue Lizenzkosten verringern die jährliche Einsparung.' },
        { answer: String(Math.round((save / inv) * 100) / 100), error: 'w-kehrwert', why: 'Kehrwert! Amortisationsdauer = Investition ÷ jährliche Einsparung.' },
        { answer: String(Math.round((invPer / save) * 100) / 100), error: 'w-stueckzahl', why: 'Die Investition gilt für **alle** Geräte: Preis je Gerät × Anzahl.' },
        { answer: String(Math.round((inv / (n * pOld * h / 1000 * price)) * 100) / 100), error: 'w-differenz-vergessen', why: 'Eingespart wird nur die **Differenz** der Leistungsaufnahme (alt − neu), nicht der gesamte Verbrauch der alten Geräte.' },
      ]),
      hints: ['Einsparung Leistung: (alt − neu) × Anzahl Geräte, dann × Stunden ÷ 1000 = kWh.', 'Amortisationsdauer = Investition ÷ jährliche Einsparung.'],
      explanation:
        `1. Leistungsdifferenz: (${pOld} W − ${pNew} W) × ${n} = ${(pOld - pNew) * n} W\n\n` +
        `2. Energie pro Jahr: ${(pOld - pNew) * n} W × ${h.toLocaleString('de-DE')} h = ${((pOld - pNew) * n * h).toLocaleString('de-DE')} Wh = **${deN(kwh)} kWh**\n\n` +
        `3. Stromkosten-Ersparnis: ${deN(kwh)} kWh × ${deN(price / 100)} €/kWh = **${eur(energy)}** pro Jahr\n\n` +
        (d === 3 ? `4. Jährliche Gesamtersparnis: ${eur(energy)} + ${eur(wartAlt)} (Wartung alt) − ${eur(lizenz)} (Lizenzen neu) = **${eur(save)}**\n\n` : '') +
        `${d === 3 ? 5 : 4}. Investition: ${n} × ${eur(invPer)} = **${eur(inv)}**\n\n` +
        `${d === 3 ? 6 : 5}. Amortisationsdauer: ${eur(inv)} ÷ ${eur(save)} = **${de2(years)} Jahre** (≈ ${deN(years * 12, 1)} Monate)`,
    };
  },
};

/* ------------------------------------------------------------------ */
/* w03: Lineare Abschreibung                                           */
/* ------------------------------------------------------------------ */

const MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

const afa: GeneratorMeta = {
  id: 'w.afa',
  title: 'Lineare Abschreibung (AfA) berechnen',
  skill: 'w.abschreibung',
  module: 'w03',
  make(rng, d) {
    const asset = rng.pick(['Server mit Storage', 'Firewall-Cluster', 'Netzwerkschrank mit USV', 'Plotter für die Planungsabteilung', 'Videokonferenzanlage']);
    const nd = rng.pick([3, 4, 5, 6]);
    if (d === 1) {
      const ak = rng.pick([3600, 4800, 6000, 7200, 9000, 12000, 15000]) * 100 + rng.pick([0, 0, 4500, 9900]);
      const a = Math.round(ak / nd);
      return {
        id: gid('w.afa'), generated: true, kind: 'number', skill: 'w.abschreibung', difficulty: d,
        prompt: `Die Elektro Krämer GmbH hat einen **${asset}** mit Anschaffungskosten von **${eur(ak)}** (netto) angeschafft. Er wird **linear über ${nd} Jahre** abgeschrieben. Wie hoch ist der **jährliche Abschreibungsbetrag**? (auf Cent runden)`,
        answer: a / 100, tolerance: 0.01, unit: '€',
        misconceptions: cleanMc(a / 100, 0.01, [
          { answer: cs(ak - a), error: 'w-afa-restwert', why: 'Das ist der Restbuchwert nach einem Jahr, nicht der Abschreibungsbetrag.' },
          { answer: cs(Math.round(ak / (nd * 12))), error: 'w-afa-monat', why: 'Das ist der **monatliche** Betrag. Gefragt ist der jährliche.' },
        ]),
        hints: ['Lineare AfA = Anschaffungskosten ÷ Nutzungsdauer.'],
        explanation: `Lineare AfA = Anschaffungskosten ÷ Nutzungsdauer = ${eur(ak)} ÷ ${nd} = **${eur(a)}** pro Jahr.`,
      };
    }
    // Anschaffungskosten aus Rechnung ermitteln
    const listN = rng.pick([4800, 6400, 7900, 9600, 12500, 14900]) * 100;
    const rab = rng.pick([0, 5, 10]);
    const rabB = pctOf(listN, rab);
    const neben = rng.pick([15000, 24000, 39000]); // Lieferung & Installation netto
    const ak = listN - rabB + neben;
    const brutto = ak + pctOf(ak, 19);
    const a = Math.round(ak / nd);
    const invoice = `| Rechnungsposition | Betrag |\n|---|---:|\n| ${asset} (Listenpreis netto) | ${eur(listN)} |\n${rab ? `| − ${pctS(rab)} Rabatt | − ${eur(rabB)} |\n` : ''}| Lieferung und Installation (netto) | ${eur(neben)} |\n| **Summe netto** | **${eur(ak)}** |\n| + 19 % USt | ${eur(brutto - ak)} |\n| **Rechnungsbetrag brutto** | **${eur(brutto)}** |`;
    const akExpl = `**Anschaffungskosten** = Kaufpreis − Rabatt + Anschaffungsnebenkosten (Lieferung, Installation) = **${eur(ak)}** netto. Die Umsatzsteuer gehört **nicht** dazu, weil das Unternehmen vorsteuerabzugsberechtigt ist.`;
    if (d === 2) {
      const k = rng.int(1, nd - 1);
      const rbw = ak - a * k;
      return {
        id: gid('w.afa'), generated: true, kind: 'number', skill: 'w.abschreibung', difficulty: d,
        prompt: `Die Elektro Krämer GmbH (vorsteuerabzugsberechtigt) erhält am 2. Januar folgende Rechnung:\n\n${invoice}\n\nDas Wirtschaftsgut wird **linear über ${nd} Jahre** abgeschrieben. Wie hoch ist der **Restbuchwert nach ${k} vollen Jahr${k > 1 ? 'en' : ''}**? (AfA-Betrag auf Cent runden)`,
        answer: rbw / 100, tolerance: 0.01 * k + 0.001, unit: '€',
        misconceptions: cleanMc(rbw / 100, 0.01 * k + 0.001, [
          { answer: cs(brutto - Math.round(brutto / nd) * k), error: 'w-afa-brutto', why: 'Bei vorsteuerabzugsberechtigten Unternehmen wird vom **Nettobetrag** abgeschrieben – die USt ist keine Anschaffungskosten.' },
          { answer: cs(listN - rabB - Math.round((listN - rabB) / nd) * k), error: 'w-afa-nebenkosten', why: 'Lieferung und Installation sind **Anschaffungsnebenkosten** und gehören zu den Anschaffungskosten.' },
          { answer: cs(a * k), error: 'w-afa-restwert', why: 'Das ist die Summe der Abschreibungen, nicht der Restbuchwert.' },
        ]),
        hints: ['Anschaffungskosten = netto inkl. Nebenkosten, ohne USt.', 'Restbuchwert = Anschaffungskosten − Jahre × AfA-Betrag.'],
        explanation: `${akExpl}\n\nAfA pro Jahr: ${eur(ak)} ÷ ${nd} = **${eur(a)}**\n\nRestbuchwert nach ${k} Jahr${k > 1 ? 'en' : ''}: ${eur(ak)} − ${k} × ${eur(a)} = **${eur(rbw)}**`,
      };
    }
    // d3: zeitanteilig (pro rata temporis) im Anschaffungsjahr
    const m = rng.int(2, 11); // Monat der Anschaffung (1-basiert)
    const months = 13 - m;
    const first = Math.round((ak * months) / (nd * 12));
    const bw = ak - first;
    return {
      id: gid('w.afa'), generated: true, kind: 'number', skill: 'w.abschreibung', difficulty: d,
      prompt: `Die Elektro Krämer GmbH (vorsteuerabzugsberechtigt, Geschäftsjahr = Kalenderjahr) erhält im **${MONTHS[m - 1]}** folgende Rechnung; das Gerät wird im selben Monat geliefert und in Betrieb genommen:\n\n${invoice}\n\nDas Wirtschaftsgut wird **linear über ${nd} Jahre** abgeschrieben. Im Anschaffungsjahr wird **monatsgenau (zeitanteilig)** abgeschrieben; der Anschaffungsmonat zählt voll. Wie hoch ist der **Buchwert am 31.12. des Anschaffungsjahres**? (auf Cent runden)`,
      answer: bw / 100, tolerance: 0.01, unit: '€',
      misconceptions: cleanMc(bw / 100, 0.01, [
        { answer: cs(ak - a), error: 'w-afa-zeitanteilig', why: 'Im Anschaffungsjahr darf nur **zeitanteilig** (ab dem Anschaffungsmonat) abgeschrieben werden, nicht das volle Jahr.' },
        { answer: cs(ak - Math.round((ak * (12 - m)) / (nd * 12))), error: 'w-afa-monate-zaehlen', why: `Der Anschaffungsmonat (${MONTHS[m - 1]}) zählt mit: ${MONTHS[m - 1]} bis Dezember sind **${months} Monate**.` },
        { answer: cs(brutto - Math.round((brutto * months) / (nd * 12))), error: 'w-afa-brutto', why: 'Abgeschrieben wird vom **Nettobetrag** inkl. Nebenkosten, ohne USt.' },
        { answer: cs(first), error: 'w-afa-restwert', why: 'Das ist der Abschreibungsbetrag, nicht der Buchwert.' },
      ]),
      hints: [`Monate im Anschaffungsjahr: ${MONTHS[m - 1]} bis Dezember.`, 'AfA im 1. Jahr = Anschaffungskosten ÷ Nutzungsdauer × Monate ÷ 12.'],
      explanation: `${akExpl}\n\nVolle Jahres-AfA: ${eur(ak)} ÷ ${nd} = ${eur(a)}\n\nMonate im Anschaffungsjahr: ${MONTHS[m - 1]} bis Dezember = **${months} Monate**\n\nAfA im Anschaffungsjahr: ${eur(ak)} ÷ ${nd} × ${months}/12 = **${eur(first)}**\n\nBuchwert am 31.12.: ${eur(ak)} − ${eur(first)} = **${eur(bw)}**`,
    };
  },
};

/* ------------------------------------------------------------------ */
/* w04: SLA – Verfügbarkeit                                            */
/* ------------------------------------------------------------------ */

const sla: GeneratorMeta = {
  id: 'w.sla',
  title: 'SLA: Verfügbarkeit und Ausfallzeit',
  skill: 'w.sla',
  module: 'w04',
  make(rng, d) {
    const pc = rng.pick([9900, 9950, 9990, 9995, 9980, 9800]); // Verfügbarkeit in Hundertstel-Prozent
    const p = pc / 100;
    if (d === 3) {
      // erreichte Verfügbarkeit aus Ausfallminuten (Monat mit 30 Tagen, 24/7)
      const mins = rng.pick([18, 36, 45, 72, 90, 108, 144, 216, 288]);
      const total = 30 * 24 * 60;
      const v = Math.round((1 - mins / total) * 1e5) / 1e3; // Prozent, 2 Nachkommastellen → 3 zur Sicherheit
      const ans = Math.round((1 - mins / total) * 1e4) / 100;
      return {
        id: gid('w.sla'), generated: true, kind: 'number', skill: 'w.sla', difficulty: d,
        prompt: `Im SLA für den E-Mail-Dienst der Elektro Krämer GmbH ist eine Verfügbarkeit von **${deN(p)} %** pro Monat (Betrieb 24/7, Monat = 30 Tage) vereinbart. Im Juni fiel der Dienst insgesamt **${mins} Minuten** aus.\n\nBerechne die **tatsächlich erreichte Verfügbarkeit in Prozent** (auf zwei Nachkommastellen runden).`,
        answer: ans, tolerance: 0.005, unit: '%',
        misconceptions: cleanMc(ans, 0.005, [
          { answer: String(Math.round((mins / total) * 1e4) / 100), error: 'w-sla-ausfall-statt-verfuegbar', why: 'Das ist der **Ausfall**anteil. Verfügbarkeit = 100 % − Ausfallanteil.' },
          { answer: String(Math.round((1 - mins / (30 * 24)) * 1e4) / 100), error: 'w-einheit-zeit', why: 'Minuten und Stunden gemischt: Der Monat hat 30 × 24 × 60 = 43.200 **Minuten**.' },
        ]),
        hints: ['Gesamtzeit im Monat: 30 × 24 × 60 = 43.200 Minuten.', 'Verfügbarkeit = (Gesamtzeit − Ausfallzeit) ÷ Gesamtzeit × 100.'],
        explanation: `Gesamtzeit: 30 × 24 × 60 = 43.200 min\n\nVerfügbarkeit = (43.200 − ${mins}) ÷ 43.200 × 100 = ${deN(v, 3)} % ≈ **${de2(ans)} %**\n\nVereinbart waren ${deN(p)} % → das SLA wurde **${ans >= p ? 'eingehalten' : 'verfehlt'}**${ans >= p ? '' : ' (der Kunde kann ggf. die vereinbarte Vertragsstrafe/Gutschrift geltend machen)'}.`,
      };
    }
    const mode = d === 1 ? 'jahr' : rng.pick(['monat', 'woche', 'servicezeit'] as const);
    if (mode === 'jahr') {
      const h = (8760 * (10000 - pc)) / 10000;
      return {
        id: gid('w.sla'), generated: true, kind: 'number', skill: 'w.sla', difficulty: d,
        prompt: `Ein Rechenzentrumsbetreiber garantiert im SLA eine Verfügbarkeit von **${deN(p)} %** bei Betrieb 24/7 (365 Tage). Wie viele **Stunden** darf das System pro Jahr höchstens ausfallen? (auf zwei Nachkommastellen runden)`,
        answer: Math.round(h * 100) / 100, tolerance: 0.01, unit: 'h',
        misconceptions: cleanMc(Math.round(h * 100) / 100, 0.01, [
          { answer: String(Math.round(((8760 * pc) / 10000) * 100) / 100), error: 'w-sla-ausfall-statt-verfuegbar', why: 'Das ist die **verfügbare** Zeit. Gefragt ist die erlaubte Ausfallzeit = (100 % − Verfügbarkeit) × Gesamtzeit.' },
          { answer: String(Math.round(h * 60 * 100) / 100), error: 'w-einheit-zeit', why: 'Das Ergebnis ist in Minuten – gefragt sind Stunden.' },
        ]),
        hints: ['Ein Jahr hat 365 × 24 = 8.760 Stunden.', `Ausfallanteil: 100 % − ${deN(p)} % = ${deN(100 - p)} %.`],
        explanation: `Gesamtzeit: 365 × 24 h = 8.760 h\n\nErlaubter Ausfall: 8.760 h × ${deN(100 - p)} % = 8.760 × ${deN((10000 - pc) / 10000, 4)} = **${deN(h, 2)} h** (≈ ${deN(h * 60, 1)} Minuten)`,
      };
    }
    const base = mode === 'monat' ? { min: 30 * 24 * 60, txt: 'pro Monat (30 Tage, Betrieb 24/7)', calc: '30 × 24 × 60 = 43.200 min' }
      : mode === 'woche' ? { min: 7 * 24 * 60, txt: 'pro Woche (Betrieb 24/7)', calc: '7 × 24 × 60 = 10.080 min' }
      : { min: 5 * 10 * 60 * 4, txt: 'pro Monat innerhalb der Servicezeit Mo–Fr 8–18 Uhr (Monat = 4 Wochen)', calc: '4 Wochen × 5 Tage × 10 h × 60 = 12.000 min' };
    const minutes = Math.round(((base.min * (10000 - pc)) / 10000) * 10) / 10;
    return {
      id: gid('w.sla'), generated: true, kind: 'number', skill: 'w.sla', difficulty: d,
      prompt: `Im Service Level Agreement für den Dateiserver ist eine Verfügbarkeit von **${deN(p)} %** ${base.txt} vereinbart. Wie viele **Minuten** darf der Dienst in diesem Zeitraum höchstens ausfallen? (auf eine Nachkommastelle runden)`,
      answer: minutes, tolerance: 0.05, unit: 'min',
      misconceptions: cleanMc(minutes, 0.05, [
        { answer: String(Math.round((minutes / 60) * 10) / 10), error: 'w-einheit-zeit', why: 'Das Ergebnis ist in Stunden – gefragt sind Minuten.' },
        { answer: String(Math.round(((base.min * pc) / 10000) * 10) / 10), error: 'w-sla-ausfall-statt-verfuegbar', why: 'Das ist die verfügbare Zeit, nicht die erlaubte Ausfallzeit.' },
      ]),
      hints: [`Gesamtzeit: ${base.calc}.`, `Ausfallanteil = 100 % − ${deN(p)} %.`],
      explanation: `Gesamtzeit: ${base.calc}\n\nErlaubter Ausfall: ${base.min.toLocaleString('de-DE')} min × ${deN(100 - p)} % = **${deN(minutes, 1)} min**${mode === 'servicezeit' ? '\n\nWichtig: Die Verfügbarkeit bezieht sich hier nur auf die **vereinbarte Servicezeit** – Ausfälle nachts zählen nicht.' : ''}`,
    };
  },
};

/* ------------------------------------------------------------------ */
/* w05: Netzplan                                                       */
/* ------------------------------------------------------------------ */

const STRUCTS = [
  {
    acts: [
      { id: 'A', n: 'Bedarfsanalyse beim Kunden', pre: [] },
      { id: 'B', n: 'Hardware bestellen und liefern lassen', pre: ['A'] },
      { id: 'C', n: 'Netzwerk und Verkabelung vorbereiten', pre: ['A'] },
      { id: 'D', n: 'Hardware vorinstallieren (Image)', pre: ['B'] },
      { id: 'E', n: 'Arbeitsplätze aufbauen', pre: ['C', 'D'] },
      { id: 'F', n: 'Test, Einweisung und Abnahme', pre: ['E'] },
    ],
  },
  {
    acts: [
      { id: 'A', n: 'Projektstart und Lastenheft', pre: [] },
      { id: 'B', n: 'Server beschaffen', pre: ['A'] },
      { id: 'C', n: 'Lizenzen beschaffen', pre: ['A'] },
      { id: 'D', n: 'Benutzerschulung vorbereiten', pre: ['A'] },
      { id: 'E', n: 'Server installieren und konfigurieren', pre: ['B', 'C'] },
      { id: 'F', n: 'Migration, Schulung und Abnahme', pre: ['D', 'E'] },
    ],
  },
  {
    acts: [
      { id: 'A', n: 'Ist-Analyse', pre: [] },
      { id: 'B', n: 'Angebote einholen und vergleichen', pre: ['A'] },
      { id: 'C', n: 'Bestellung und Lieferung', pre: ['B'] },
      { id: 'D', n: 'Räume und Verkabelung vorbereiten', pre: ['A'] },
      { id: 'E', n: 'Installation', pre: ['C', 'D'] },
      { id: 'F', n: 'Dokumentation erstellen', pre: ['D'] },
      { id: 'G', n: 'Abnahme und Übergabe', pre: ['E', 'F'] },
    ],
  },
] as const;

function netzplan(acts: readonly { id: string; pre: readonly string[] }[], dur: Record<string, number>) {
  const faz: Record<string, number> = {}, fez: Record<string, number> = {};
  for (const a of acts) {
    faz[a.id] = a.pre.length ? Math.max(...a.pre.map((p) => fez[p])) : 0;
    fez[a.id] = faz[a.id] + dur[a.id];
  }
  const end = Math.max(...acts.map((a) => fez[a.id]));
  const saz: Record<string, number> = {}, sez: Record<string, number> = {};
  for (const a of [...acts].reverse()) {
    const succ = acts.filter((s) => s.pre.includes(a.id));
    sez[a.id] = succ.length ? Math.min(...succ.map((s) => saz[s.id])) : end;
    saz[a.id] = sez[a.id] - dur[a.id];
  }
  const gp: Record<string, number> = Object.fromEntries(acts.map((a) => [a.id, saz[a.id] - faz[a.id]]));
  return { faz, fez, saz, sez, gp, end };
}

const netzplanGen: GeneratorMeta = {
  id: 'w.netzplan',
  title: 'Netzplan: Projektdauer und Puffer',
  skill: 'w.netzplan',
  module: 'w05',
  make(rng, d) {
    const st = d === 3 ? STRUCTS[2] : rng.pick(STRUCTS.slice(0, 2));
    const acts = st.acts;
    let dur: Record<string, number> = {};
    let r = netzplan(acts, {});
    for (let t = 0; t < 100; t++) {
      dur = Object.fromEntries(acts.map((a) => [a.id, rng.int(1, 10)]));
      r = netzplan(acts, dur);
      const crit = acts.filter((a) => r.gp[a.id] === 0).length;
      if (crit < acts.length && Math.max(...acts.map((a) => r.gp[a.id])) >= 2) break;
    }
    const tbl = `| Vorgang | Beschreibung | Dauer (Tage) | Vorgänger |\n|---|---|---|---|\n${acts.map((a) => `| ${a.id} | ${a.n} | ${dur[a.id]} | ${a.pre.length ? a.pre.join(', ') : '–'} |`).join('\n')}`;
    const conv = 'Konvention: Projektbeginn = Zeitpunkt 0; FEZ = FAZ + Dauer; FAZ eines Vorgangs = größter FEZ aller Vorgänger; SEZ = kleinster SAZ aller Nachfolger; SAZ = SEZ − Dauer; Gesamtpuffer GP = SAZ − FAZ.';
    const critPath = acts.filter((a) => r.gp[a.id] === 0).map((a) => a.id).join(' → ');
    const expl = `| Vorgang | Dauer | FAZ | FEZ | SAZ | SEZ | GP |\n|---|---|---|---|---|---|---|\n${acts.map((a) => `| ${a.id} | ${dur[a.id]} | ${r.faz[a.id]} | ${r.fez[a.id]} | ${r.saz[a.id]} | ${r.sez[a.id]} | ${r.gp[a.id]} |`).join('\n')}\n\n**Vorwärtsrechnung** liefert die Projektdauer: **${r.end} Tage**. **Rückwärtsrechnung** liefert die spätesten Zeitpunkte. Vorgänge mit GP = 0 bilden den **kritischen Pfad**: ${critPath}. Verzögert sich einer davon, verschiebt sich das Projektende.`;
    const sum = acts.reduce((s, a) => s + dur[a.id], 0);
    if (d === 1) {
      return {
        id: gid('w.netzplan'), generated: true, kind: 'number', skill: 'w.netzplan', difficulty: d,
        prompt: `Für ein Kundenprojekt wurde folgende Vorgangsliste erstellt:\n\n${tbl}\n\nVorgänge ohne Abhängigkeit voneinander können **parallel** laufen. Wie viele **Tage** dauert das Projekt mindestens?`,
        answer: r.end, unit: 'Tage',
        misconceptions: cleanMc(r.end, 0, [{ answer: String(sum), error: 'w-netzplan-summe', why: 'Du hast alle Dauern addiert. Parallele Vorgänge laufen gleichzeitig – entscheidend ist der **längste** Weg (kritischer Pfad).' }]),
        hints: ['Zeichne die Abhängigkeiten auf. Welche Wege führen vom Start zum Ende?', 'Die Projektdauer entspricht dem längsten Weg.'],
        explanation: expl,
      };
    }
    if (d === 2) {
      const cand = acts.filter((a) => r.gp[a.id] > 0);
      const x = rng.pick(cand);
      return {
        id: gid('w.netzplan'), generated: true, kind: 'number', skill: 'w.netzplan', difficulty: d,
        prompt: `Für ein Kundenprojekt wurde folgende Vorgangsliste erstellt:\n\n${tbl}\n\n${conv}\n\nWie groß ist der **Gesamtpuffer (GP) von Vorgang ${x.id}** in Tagen?`,
        answer: r.gp[x.id], unit: 'Tage',
        misconceptions: cleanMc(r.gp[x.id], 0, [
          { answer: '0', error: 'w-netzplan-puffer', why: `Vorgang ${x.id} liegt nicht auf dem kritischen Pfad – er hat Puffer.` },
          { answer: String(r.end - dur[x.id]), error: 'w-netzplan-puffer', why: 'Gesamtpuffer = SAZ − FAZ (bzw. SEZ − FEZ), nicht Projektdauer − Vorgangsdauer.' },
        ]),
        hints: ['Erst vorwärts rechnen (FAZ/FEZ), dann rückwärts (SEZ/SAZ).', 'GP = SAZ − FAZ.'],
        explanation: expl,
      };
    }
    const q: TableQuestion = {
      id: gid('w.netzplan'), generated: true, kind: 'table', skill: 'w.netzplan', difficulty: d,
      prompt: `Für ein Kundenprojekt wurde folgende Vorgangsliste erstellt:\n\n${tbl}\n\n${conv}\n\nVervollständige die Tabelle.`,
      columns: [
        { key: 'faz', label: 'FAZ', type: 'number' },
        { key: 'fez', label: 'FEZ', type: 'number' },
        { key: 'saz', label: 'SAZ', type: 'number' },
        { key: 'sez', label: 'SEZ', type: 'number' },
        { key: 'gp', label: 'GP', type: 'number' },
      ],
      rows: acts.map((a) => ({
        label: `${a.id} (${dur[a.id]} T)`,
        cells: { faz: { answer: String(r.faz[a.id]) }, fez: { answer: String(r.fez[a.id]) }, saz: { answer: String(r.saz[a.id]) }, sez: { answer: String(r.sez[a.id]) }, gp: { answer: String(r.gp[a.id]) } },
      })),
      hints: ['Vorwärtsrechnung: FAZ = max(FEZ der Vorgänger).', 'Rückwärtsrechnung: SEZ = min(SAZ der Nachfolger); beim letzten Vorgang SEZ = Projektende.'],
      explanation: expl,
    };
    return q;
  },
};

/* ------------------------------------------------------------------ */

export const GENERATORS_WIRTSCHAFT: GeneratorMeta[] = [
  bezugspreis, nutzwert, angebotspreis, dienstleistung, kaufLeasing, amortisation, afa, sla, netzplanGen,
];
