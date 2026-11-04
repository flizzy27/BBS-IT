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
    const rule = 'Punkte: 1 (schlecht) bis 10 (sehr gut). Teilnutzwert = Gewicht · Punkte; Nutzwert = Summe der Teilnutzwerte. Du kannst das Gewicht als Dezimalfaktor (40 % = 0,40) oder als ganze Prozentzahl (40) einsetzen – beide Schreibweisen sind richtig.';
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
        answer, tolerance: 0.005, accept: [sums[o]],
        misconceptions: cleanMc(answer, 0.005, [
          { answer: String(raw), error: 'w-nutzwert-ungewichtet', why: 'Du hast nur die Punkte addiert. Jede Punktzahl muss vorher mit dem **Gewicht** des Kriteriums multipliziert werden.' },
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
        rows: names.map((n, o) => ({ label: `Angebot ${n}`, cells: { nw: { answer: String(nw[o]), accept: [String(sums[o])] }, rang: { answer: String(rank[o]) } } })),
        misconceptions: names.flatMap((_, o) => [
          { cell: `${o}:nw`, answer: String(raws[o]), error: 'w-nutzwert-ungewichtet', why: 'Nur Punkte addiert – die Gewichtung fehlt.' },
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
        ...crit.map((c, i) => ({ label: `${c} (${w[i]} %)`, cells: Object.fromEntries(names.map((_, o) => [`o${o}`, { answer: String((w[i] * pts[o][i]) / 100), accept: [String(w[i] * pts[o][i])] }])) })),
        { label: 'Nutzwert (Summe)', cells: Object.fromEntries(names.map((_, o) => [`o${o}`, { answer: String(nw[o]), accept: [String(sums[o])] }])) },
        { label: 'Rang', cells: Object.fromEntries(names.map((_, o) => [`o${o}`, { answer: String(rank[o]) }])) },
      ],
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
    const prov = d === 3 ? rng.pick([0, 5, 8, 10]) : 0; // Vertreterprovision, wie Skonto im Hundert vom Zielverkaufspreis
    const hkB = pctOf(bzp, hk);
    const skost = bzp + hkB;
    const gB = pctOf(skost, g);
    const bvp = skost + gB;
    const zvp = sk ? Math.round((bvp * 100) / (100 - sk - prov)) : bvp;
    const skB = prov ? pctOf(zvp, sk) : zvp - bvp;
    const provB = zvp - bvp - skB;
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
    if (sk && !prov) rows.push(`| + Kundenskonto (${pctS(sk)} **im Hundert**) | ${eur(bvp)} / ${100 - sk} · ${sk} | + ${eur(skB)} |`, `| **= Zielverkaufspreis** | | **${eur(zvp)}** |`);
    if (sk && prov) rows.push(
      `| Zielverkaufspreis (im Hundert) | ${eur(bvp)} ÷ (100 − ${sk} − ${prov}) · 100 = ${eur(bvp)} ÷ ${100 - sk - prov} · 100 | |`,
      `| + Kundenskonto (${pctS(sk)} vom Zielverkaufspreis) | ${eur(zvp)} · ${sk} / 100 | + ${eur(skB)} |`,
      `| + Vertreterprovision (${pctS(prov)} vom Zielverkaufspreis) | Rest bis zum Zielverkaufspreis | + ${eur(provB)} |`,
      `| **= Zielverkaufspreis** | | **${eur(zvp)}** |`,
    );
    if (ra) rows.push(`| + Kundenrabatt (${pctS(ra)} **im Hundert**) | ${eur(zvp)} / ${100 - ra} · ${ra} | + ${eur(raB)} |`);
    rows.push(`| **= Listenverkaufspreis netto** | | **${eur(lvp)}** |`, `| + Umsatzsteuer 19 % | ${eur(lvp)} · 0,19 | + ${eur(ust)} |`, `| **= Listenverkaufspreis brutto** | | **${eur(brutto)}** |`);

    const naive = (() => {
      // Skonto/Rabatt fälschlich „vom Hundert“ aufgeschlagen
      const z = bvp + pctOf(bvp, sk + prov);
      const l = z + pctOf(z, ra);
      return l + pctOf(l, 19);
    })();
    const mcs: Mc[] = [
      { answer: cs(lvp), error: 'w-ust-vergessen', why: 'Das ist der **Nettopreis**. Gefragt ist der Bruttopreis – es fehlen 19 % Umsatzsteuer.' },
      { answer: cs(lvp + pctOf(lvp, 7)), error: 'w-ust-satz', why: 'IT-Hardware unterliegt dem Regelsteuersatz von **19 %**, nicht dem ermäßigten Satz von 7 %.' },
      { answer: cs(bzp + gB + pctOf(bzp + gB, 19)), error: 'w-handlungskosten-vergessen', why: 'Die Handlungskosten (Gemeinkosten) wurden nicht zugeschlagen – erst Bezugspreis + Handlungskosten = Selbstkosten.' },
      { answer: cs((() => { const s = bzp + pctOf(bzp, hk + g); const z = sk ? Math.round((s * 100) / (100 - sk - prov)) : s; const l = ra ? Math.round((z * 100) / (100 - ra)) : z; return l + pctOf(l, 19); })()), error: 'w-zuschlaege-addiert', why: 'Handlungskosten- und Gewinnzuschlag dürfen nicht addiert werden: Der Gewinn wird auf die **Selbstkosten** (inkl. Handlungskosten) aufgeschlagen.' },
    ];
    if (sk || ra) mcs.push({ answer: cs(naive), error: 'w-im-hundert', why: 'Kundenskonto, Provision und Kundenrabatt werden **im Hundert** gerechnet (der Barverkaufspreis entspricht 100 % − Skonto − Provision), nicht als Aufschlag vom Hundert.' });
    if (prov) {
      const z = Math.round((bvp * 100) / (100 - sk)), l = Math.round((z * 100) / (100 - ra));
      mcs.push({ answer: cs(l + pctOf(l, 19)), error: 'w-provision-vergessen', why: 'Die Vertreterprovision fehlt. Sie wird zusammen mit dem Kundenskonto im Hundert vom Zielverkaufspreis gerechnet: Barverkaufspreis ÷ (100 − Skonto − Provision) · 100.' });
    }

    const steps = hk
      ? `Bezugspreis ${eur(bzp)}, Handlungskostenzuschlag ${pctS(hk)}, Gewinnzuschlag ${pctS(g)}${sk ? `, Kundenskonto ${pctS(sk)}${prov ? `, Vertreterprovision ${pctS(prov)}` : ''}, Kundenrabatt ${pctS(ra)}` : ''}`
      : `Selbstkosten ${eur(skost)}, Gewinnzuschlag ${pctS(g)}`;
    return {
      id: gid('w.angebotspreis'), generated: true, kind: 'number', skill: 'w.handelskalkulation', difficulty: d,
      prompt: `Das IT-Systemhaus kalkuliert den Verkaufspreis für **1 × ${prod.n}**. Gegeben: ${steps}. Es gilt der Umsatzsteuersatz von 19 %.\n\nBerechne den **Listenverkaufspreis brutto** in Euro. Runde jedes Zwischenergebnis kaufmännisch **auf Cent**.${sk ? (prov ? ' Kundenskonto und Vertreterprovision werden gemeinsam im Hundert vom Zielverkaufspreis gerechnet, der Kundenrabatt im Hundert vom Listenverkaufspreis.' : ' Kundenskonto und Kundenrabatt werden im Hundert gerechnet.') : ''}`,
      answer, tolerance: tol, unit: '€',
      misconceptions: cleanMc(answer, tol, mcs),
      hints: [
        hk ? 'Bezugspreis + Handlungskosten = Selbstkosten; Selbstkosten + Gewinn = Barverkaufspreis.' : 'Selbstkosten + Gewinn = Barverkaufspreis (= Nettoverkaufspreis).',
        ...(sk ? [prov ? 'Im Hundert: Zielverkaufspreis = Barverkaufspreis ÷ (100 − Skontosatz − Provisionssatz) · 100.' : 'Im Hundert: Zielverkaufspreis = Barverkaufspreis / (100 − Skontosatz) · 100.'] : []),
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
      hints: [`Arbeitszeit gesamt: ${n} × ${task.min} min = ${minutes.toLocaleString('de-DE')} min = ${deN(hours)} h.`, 'Arbeitsleistung + Material + Anfahrt = Netto; dann 19 % USt.'],
      explanation: `| Position | Rechnung | Betrag |\n|---|---|---:|\n| Arbeitsleistung | ${n} × ${task.min} min = ${minutes.toLocaleString('de-DE')} min = ${deN(hours)} h · ${eur(rate)} | ${eur(labour)} |\n${rab ? `| − Rabatt ${pctS(rab)} auf Arbeitsleistung | ${eur(labour)} · ${rab} / 100 | − ${eur(rabB)} |\n` : ''}| + Material | pauschal | ${eur(material)} |\n| + Anfahrt | ${anfahrten} × ${eur(anfahrt)} | ${eur(anfahrt * anfahrten)} |\n| **= Angebotspreis netto** | | **${eur(netto)}** |\n| + USt 19 % | ${eur(netto)} · 0,19 | ${eur(ust)} |\n| **= Angebotspreis brutto** | | **${eur(brutto)}** |`,
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
    const invPer = rng.pick([250, 300, 350, 420]) * 100;
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
        `1. Leistungsdifferenz: (${pOld} W − ${pNew} W) × ${n} = ${((pOld - pNew) * n).toLocaleString('de-DE')} W\n\n` +
        `2. Energie pro Jahr: ${((pOld - pNew) * n).toLocaleString('de-DE')} W × ${h.toLocaleString('de-DE')} h = ${((pOld - pNew) * n * h).toLocaleString('de-DE')} Wh = **${deN(kwh)} kWh**\n\n` +
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
/* Hilfen für Prozent-, Faktor- und Tabellenaufgaben                   */
/* ------------------------------------------------------------------ */

/** kaufmännisch runden (auch negative Werte: −2,5 → −3) */
const rk = (x: number) => Math.sign(x) * Math.round(Math.abs(x));
/** num ÷ den · 100 in Prozent, auf n Nachkommastellen (num/den ganzzahlig → exakte Rundung) */
const pq = (num: number, den: number, n = 2) => rk((num * 10 ** (n + 2)) / den) / 10 ** n;
/** num ÷ den auf n Nachkommastellen */
const qn = (num: number, den: number, n = 2) => rk((num * 10 ** n) / den) / 10 ** n;
/** Nachbarwerte (± eine Einheit der letzten Stelle) für Tabellenzellen mit exaktem Vergleich */
const near = (x: number, n = 2) => [String(rk((x - 10 ** -n) * 10 ** n) / 10 ** n), String(rk((x + 10 ** -n) * 10 ** n) / 10 ** n)];
/** deutsche Zahl mit genau einer Nachkommastelle */
const de1 = (x: number) => x.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
/** Prozent mit Vorzeichen, deutsch */
const sgn = (x: number, n = 1) => `${x > 0 ? '+' : x < 0 ? '−' : ''}${deN(Math.abs(x), n)}`;

/** Tabellen-Fehlbilder entfernen, die einer zulässigen Zellantwort entsprechen (generate() filtert Tabellen nicht). */
function finishTable(q: TableQuestion): TableQuestion {
  q.misconceptions = (q.misconceptions ?? []).filter((m) => {
    const [ri, key] = (m.cell ?? '').split(':');
    const c = q.rows[Number(ri)]?.cells[key];
    if (!c || c.answer === undefined) return false;
    const v = Number(m.answer);
    return ![c.answer, ...(c.accept ?? [])].some((a) => (Number.isFinite(v) ? Math.abs(Number(a) - v) < 1e-9 : a.toLowerCase() === m.answer.toLowerCase()));
  });
  return q;
}

type Row = { label: string; v: number; given?: boolean; n?: number };
/** Einspaltige Werttabelle aus Zeilen (v in Cent bzw. als Zahl mit n Nachkommastellen). */
function valueRows(rows: Row[], money = true) {
  return rows.map((r) => ({
    label: r.label,
    cells: {
      v: r.given
        ? { given: r.n !== undefined ? deN(r.v, r.n) : de2(r.v / 100) }
        : r.n !== undefined
          ? { answer: String(r.v), accept: r.n ? near(r.v, r.n) : [] }
          : money ? { answer: cs(r.v), accept: acceptCent(r.v) } : { answer: String(r.v) },
    },
  }));
}

/* ------------------------------------------------------------------ */
/* w02: Preis in Nutzwertpunkte umrechnen                              */
/* ------------------------------------------------------------------ */

const STUFEN_TXT = `| Mehrpreis gegenüber dem günstigsten Angebot | Preispunkte |
|---|---|
| 0 % (günstigstes Angebot) | 10 |
| über 0 % bis 5 % | 8 |
| über 5 % bis 10 % | 6 |
| über 10 % bis 15 % | 4 |
| über 15 % bis 20 % | 2 |
| über 20 % | 0 |`;

function stufenPunkte(p: number, pmin: number) {
  if (p === pmin) return 10;
  const m = ((p - pmin) * 100) / pmin;
  return m <= 5 ? 8 : m <= 10 ? 6 : m <= 15 ? 4 : m <= 20 ? 2 : 0;
}

/** Drei Bezugspreise in Cent (10-€-Schritte); Mehrpreise ≥ 1 % und mit Abstand zu den Stufengrenzen. */
function preisSet(rng: Rng): number[] {
  for (let t = 0; t < 500; t++) {
    const pmin = rng.int(600, 3000) * 1000;
    const others = [rng.int(15, 120), rng.int(15, 240)].map((pm) => Math.round((pmin * (1000 + pm)) / 1e6) * 1000);
    const ok = others[0] !== others[1] && others.every((p) => {
      const m = ((p - pmin) * 100) / pmin;
      return m >= 1 && [5, 10, 15, 20].every((g) => Math.abs(m - g) >= 0.1);
    });
    if (ok) return rng.shuffle([pmin, ...others]);
  }
  return [1250000, 1312000, 1420000];
}

const preispunkte: GeneratorMeta = {
  id: 'w.preispunkte',
  title: 'Preis in Nutzwertpunkte umrechnen',
  skill: 'w.nutzwertanalyse',
  module: 'w02',
  make(rng, d) {
    const prices = preisSet(rng);
    const pmin = Math.min(...prices);
    const iMin = prices.indexOf(pmin);
    const N = ['A', 'B', 'C'];
    const what = rng.pick(['14 Notebooks für den Außendienst', '25 Arbeitsplatz-PCs für die Buchhaltung', 'einen Server mit Storage für den Standort Berlin', 'drei Managed Switches für den Verteilerraum', '40 Monitore für das Großraumbüro']);
    const priceTbl = `| | Angebot A | Angebot B | Angebot C |\n|---|---|---|---|\n| Bezugspreis (netto, Ergebnis der Bezugskalkulation) | ${prices.map(eur).join(' | ')} |`;
    const mehr = prices.map((p) => pq(p - pmin, pmin));
    const propRule = '**Preispunkte = 10 × günstigster Bezugspreis ÷ eigener Bezugspreis**';
    const intro = `Die Elektro Krämer GmbH beschafft **${what}**. Drei Angebote erfüllen alle K.-o.-Kriterien:\n\n${priceTbl}\n\n`;

    if (d === 1) {
      const o = rng.pick([0, 1, 2].filter((i) => i !== iMin));
      const ans = Math.round((pmin * 100) / prices[o]) / 10;
      return {
        id: gid('w.preispunkte'), generated: true, kind: 'number', skill: 'w.nutzwertanalyse', difficulty: d,
        prompt: `${intro}Für die Nutzwertanalyse wird der Preis in Punkte (0 bis 10) übersetzt. Regel: Das günstigste Angebot erhält 10 Punkte, die anderen anteilig: ${propRule}.\n\nBerechne die **Preispunkte von Angebot ${N[o]}** (auf eine Nachkommastelle runden).`,
        answer: ans, tolerance: 0.05,
        misconceptions: cleanMc(ans, 0.05, [
          { answer: String(Math.round((prices[o] * 100) / pmin) / 10), error: 'w-preispunkte-kehrwert', why: 'Kehrwert: Der **günstigste** Preis steht im Zähler. Ein teureres Angebot bekommt weniger als 10 Punkte, nie mehr.' },
          { answer: '10', error: 'w-preispunkte-regel', why: 'Nur das günstigste Angebot erhält die vollen 10 Punkte.' },
          { answer: String(Math.round(100 - mehr[o]) / 10), error: 'w-preispunkte-regel', why: 'Du hast den Mehrpreis in Prozent abgezogen. Laut Aufgabe gilt die Verhältnisregel: 10 × günstigster Preis ÷ eigener Preis.' },
        ]),
        hints: ['Suche zuerst den günstigsten Bezugspreis.', 'Punkte = 10 × günstigster Preis ÷ Preis des Angebots.'],
        explanation: `**Ergebnis: ${deN(ans, 1)} Punkte.**\n\n1. Günstigster Bezugspreis: ${eur(pmin)} (Angebot ${N[iMin]}) → 10 Punkte\n2. Angebot ${N[o]}: 10 × ${eur(pmin)} ÷ ${eur(prices[o])} = ${deN((10 * pmin) / prices[o], 4)} ≈ **${deN(ans, 1)}**\n\nZum Vergleich alle Angebote: ${prices.map((p, i) => `${N[i]} = ${deN(Math.round((pmin * 100) / p) / 10, 1)}`).join(' · ')}\n\nHäufiger Fehler: Preis und günstigster Preis vertauschen – dann bekäme das teurere Angebot mehr als 10 Punkte.`,
      };
    }

    if (d === 2) {
      const pts = prices.map((p) => stufenPunkte(p, pmin));
      return finishTable({
        id: gid('w.preispunkte'), generated: true, kind: 'table', skill: 'w.nutzwertanalyse', difficulty: d,
        prompt: `${intro}Für die Nutzwertanalyse wird der Preis nach folgender **Stufenregel** in Punkte übersetzt. Der Mehrpreis wird in Prozent **bezogen auf das günstigste Angebot** berechnet:\n\n${STUFEN_TXT}\n\nTrage für jedes Angebot den **Mehrpreis in %** (zwei Nachkommastellen; günstigstes Angebot = 0) und die **Preispunkte** ein.`,
        columns: [
          { key: 'mehr', label: 'Mehrpreis (%)', type: 'number' },
          { key: 'pkt', label: 'Preispunkte', type: 'number' },
        ],
        rows: N.map((n, i) => ({ label: `Angebot ${n}`, cells: { mehr: { answer: String(mehr[i]), accept: near(mehr[i]) }, pkt: { answer: String(pts[i]) } } })),
        misconceptions: N.flatMap((_, i) => (i === iMin ? [] : [{ cell: `${i}:mehr`, answer: String(pq(prices[i] - pmin, prices[i])), error: 'w-prozent-bezugsgroesse', why: 'Falsche Bezugsgröße: Der Mehrpreis wird auf den **günstigsten** Preis bezogen (Grundwert = günstigstes Angebot), nicht auf den eigenen Preis.' }])),
        hints: ['Mehrpreis in % = (eigener Preis − günstigster Preis) ÷ günstigster Preis × 100.', 'Dann in der Stufentabelle nachsehen.'],
        explanation: `${prices.map((p, i) => i === iMin ? `**Angebot ${N[i]}** ist am günstigsten → Mehrpreis 0 % → **10 Punkte**` : `**Angebot ${N[i]}:** (${eur(p)} − ${eur(pmin)}) ÷ ${eur(pmin)} × 100 = **${deN(mehr[i], 2)} %** → **${pts[i]} Punkte**`).join('\n\n')}\n\nHäufiger Fehler: Den Mehrpreis auf den teureren Preis beziehen. Grundwert ist immer das günstigste Angebot, so steht es in der Regel.`,
      });
    }

    // d === 3: vollständige Nutzwertanalyse mit Preis-Umrechnung
    const stufe = rng.bool();
    const pp = prices.map((p) => (stufe ? stufenPunkte(p, pmin) : Math.round((pmin * 10) / p)));
    const others = rng.shuffle(CRITERIA.filter((c) => c !== 'Preis')).slice(0, 3);
    const wSet = [...rng.pick(WEIGHTS[4])].sort((a, b) => b - a);
    const w = [wSet[0], ...rng.shuffle(wSet.slice(1))];
    let pts: number[][] = [];
    let sums: number[] = [];
    for (let t = 0; t < 300; t++) {
      pts = N.map((_, o) => [pp[o], ...others.map(() => rng.int(2, 10))]);
      sums = pts.map((p) => p.reduce((s, x, i) => s + x * w[i], 0));
      const sorted = [...sums].sort((a, b) => b - a);
      if (sorted.every((v, i) => i === 0 || sorted[i - 1] - v >= 10)) break;
    }
    const rank = sums.map((s) => sums.filter((x) => x > s).length + 1);
    const crit = ['Preis', ...others];
    const tbl = `| Kriterium | Gewicht | Angebot A | Angebot B | Angebot C |\n|---|---|---|---|---|\n| Preis | ${w[0]} % | ? | ? | ? |\n${others.map((c, i) => `| ${c} | ${w[i + 1]} % | ${pts.map((p) => p[i + 1]).join(' | ')} |`).join('\n')}`;
    const rule = stufe ? `Preispunkte nach Stufenregel (Mehrpreis bezogen auf das günstigste Angebot):\n\n${STUFEN_TXT}` : `Preispunkte nach Verhältnisregel: ${propRule}, auf **ganze Punkte** runden.`;
    return finishTable({
      id: gid('w.preispunkte'), generated: true, kind: 'table', skill: 'w.nutzwertanalyse', difficulty: d,
      prompt: `${intro}${rule}\n\nBewertung der übrigen Kriterien (Punkte 0–10):\n\n${tbl}\n\nErmittle die **Preispunkte**, den **Nutzwert** (Summe Gewicht · Punkte, zwei Nachkommastellen; Gewicht als Dezimalfaktor oder als ganze Prozentzahl – beides wird akzeptiert) und den **Rang** (1 = beste Wahl).`,
      columns: N.map((n, o) => ({ key: `o${o}`, label: `Angebot ${n}`, type: 'number' as const })),
      rows: [
        { label: 'Preispunkte', cells: Object.fromEntries(N.map((_, o) => [`o${o}`, { answer: String(pp[o]) }])) },
        { label: 'Nutzwert', cells: Object.fromEntries(N.map((_, o) => [`o${o}`, { answer: String(sums[o] / 100), accept: [String(sums[o])] }])) },
        { label: 'Rang', cells: Object.fromEntries(N.map((_, o) => [`o${o}`, { answer: String(rank[o]) }])) },
      ],
      misconceptions: N.map((_, o) => ({ cell: `1:o${o}`, answer: String(pts[o].reduce((s, x) => s + x, 0)), error: 'w-nutzwert-ungewichtet', why: 'Nur Punkte addiert – jede Punktzahl muss mit dem Gewicht multipliziert werden.' })),
      hints: ['Erst die Preispunkte bestimmen, dann wie gewohnt Gewicht × Punkte rechnen.', 'Höchster Nutzwert = Rang 1.'],
      explanation:
        `**1. Preispunkte** (günstigstes Angebot: ${N[iMin]} mit ${eur(pmin)})\n\n` +
        prices.map((p, i) => stufe
          ? `- Angebot ${N[i]}: Mehrpreis ${deN(mehr[i], 2)} % → **${pp[i]} Punkte**`
          : `- Angebot ${N[i]}: 10 × ${eur(pmin)} ÷ ${eur(p)} = ${deN((10 * pmin) / p, 2)} → **${pp[i]} Punkte**`).join('\n') +
        `\n\n**2. Nutzwerte**\n\n` +
        N.map((n, o) => `- Angebot ${n}: ${crit.map((_, i) => `${deN(w[i] / 100)} · ${pts[o][i]}`).join(' + ')} = **${de2(sums[o] / 100)}** (in Prozent-Schreibweise ${sums[o]})`).join('\n') +
        `\n\n**3. Rangfolge:** ${rank.map((r, o) => ({ r, o })).sort((a, b) => a.r - b.r).map(({ r, o }) => `${r}. Angebot ${N[o]}`).join(' · ')} → Empfehlung **Angebot ${N[rank.indexOf(1)]}**.`,
    });
  },
};

/* ------------------------------------------------------------------ */
/* w03: Handelskalkulation vollständig (vorwärts, rückwärts, Differenz) */
/* ------------------------------------------------------------------ */

function kalkVor(bzp: number, hk: number, g: number, sk: number, prov: number, ra: number) {
  const hkB = pctOf(bzp, hk), sko = bzp + hkB, gB = pctOf(sko, g), bvp = sko + gB;
  const zvp = Math.round((bvp * 100) / (100 - sk - prov));
  const skB = prov ? pctOf(zvp, sk) : zvp - bvp;
  const provB = zvp - bvp - skB;
  const lvp = Math.round((zvp * 100) / (100 - ra)), raB = lvp - zvp;
  return { hkB, sko, gB, bvp, zvp, skB, provB, lvp, raB };
}

function kalkRueck(lvp: number, ra: number, sk: number, prov: number, g: number, hk: number) {
  const raB = pctOf(lvp, ra), zvp = lvp - raB;
  const spB = pctOf(zvp, sk + prov), bvp = zvp - spB;
  const sko = Math.round((bvp * 100) / (100 + g)), gB = bvp - sko;
  const bzp = Math.round((sko * 100) / (100 + hk)), hkB = sko - bzp;
  return { raB, zvp, spB, bvp, sko, gB, bzp, hkB };
}

const kalkulation: GeneratorMeta = {
  id: 'w.kalkulation',
  title: 'Handelskalkulation: vorwärts, rückwärts, Differenz',
  skill: 'w.handelskalkulation',
  module: 'w03',
  make(rng, d) {
    const prod = rng.pick(PRODUCTS);
    const hk = rng.pick([15, 20, 25, 30]);

    if (d === 1) {
      // Differenzkalkulation ohne Kundennachlässe
      const bzp = rng.pick(prod.p) - rng.pick([0, 1000, 2500]);
      const sko = bzp + pctOf(bzp, hk);
      const lvp = Math.round((sko * (100 + rng.int(30, 160) / 10)) / 10000) * 100 - rng.pick([0, 100]);
      const gB = lvp - sko;
      const ans = pq(gB, sko);
      return {
        id: gid('w.kalkulation'), generated: true, kind: 'number', skill: 'w.handelskalkulation', difficulty: d,
        prompt: `**Differenzkalkulation:** Ein Mitbewerber bietet **1 × ${prod.n}** für **${eur(lvp)} netto** an. Das IT-Systemhaus will denselben Nettopreis verlangen (ohne Kundenrabatt und ohne Kundenskonto). Der Bezugspreis beträgt **${eur(bzp)}**, der Handlungskostenzuschlag **${pctS(hk)}**.\n\nWie viel **Prozent Gewinn, bezogen auf die Selbstkosten**, bleiben? Runde die Handlungskosten auf Cent und das Ergebnis auf zwei Nachkommastellen.`,
        answer: ans, tolerance: 0.01, unit: '%',
        misconceptions: cleanMc(ans, 0.01, [
          { answer: String(pq(gB, lvp)), error: 'w-gewinn-basis', why: 'Der Gewinnsatz bezieht sich auf die **Selbstkosten** (Grundwert), nicht auf den Verkaufspreis.' },
          { answer: String(pq(lvp - bzp, bzp)), error: 'w-handlungskosten-vergessen', why: 'Die Handlungskosten fehlen. Erst Bezugspreis + Handlungskosten = Selbstkosten, dann Gewinn = Verkaufspreis − Selbstkosten.' },
          { answer: cs(gB), error: 'w-euro-statt-prozent', why: 'Das ist der Gewinn in Euro. Gefragt ist der Gewinn in Prozent der Selbstkosten.' },
        ]),
        hints: ['Selbstkosten = Bezugspreis + Handlungskosten.', 'Gewinn in % = Gewinn ÷ Selbstkosten × 100.'],
        explanation: `**Ergebnis: ${deN(ans, 2)} %.**\n\n| Schritt | Rechnung | Betrag |\n|---|---|---:|\n| Bezugspreis | | ${eur(bzp)} |\n| + Handlungskosten (${pctS(hk)}) | ${eur(bzp)} · ${hk} / 100 | + ${eur(sko - bzp)} |\n| **= Selbstkosten** | | **${eur(sko)}** |\n| Verkaufspreis netto (= Barverkaufspreis) | vom Markt vorgegeben | ${eur(lvp)} |\n| **Gewinn** | ${eur(lvp)} − ${eur(sko)} | **${eur(gB)}** |\n\nGewinn in % = ${eur(gB)} ÷ ${eur(sko)} × 100 = **${deN(ans, 2)} %**\n\nHäufiger Fehler: Den Gewinn durch den Verkaufspreis teilen. Der Gewinnzuschlag hat immer die Selbstkosten als Grundwert.`,
      };
    }

    if (d === 2) {
      // Rückwärtskalkulation: höchstens zulässiger Bezugspreis
      const ra = rng.pick([5, 10, 15, 20]), sk = rng.pick([2, 3]), prov = rng.pick([0, 0, 5, 8]);
      const g = rng.pick([5, 8, 10, 12.5, 15]);
      const lvp = Math.round((rng.pick(prod.p) * rng.pick([1.25, 1.35, 1.45, 1.6])) / 1000) * 1000 - 100;
      const brutto = rng.bool() ? lvp + pctOf(lvp, 19) : 0;
      const r = kalkRueck(lvp, ra, sk, prov, g, hk);
      const ans = r.bzp / 100;
      const wrongZ = (() => { const s2 = r.bvp - pctOf(r.bvp, g); return s2 - pctOf(s2, hk); })();
      const wrongN = (() => { const z = Math.round((lvp * 100) / (100 + ra)); const b = Math.round((z * 100) / (100 + sk + prov)); const s2 = Math.round((b * 100) / (100 + g)); return Math.round((s2 * 100) / (100 + hk)); })();
      const mcs: Mc[] = [
        { answer: cs(wrongZ), error: 'w-rueckwaerts-prozent', why: 'Gewinn und Handlungskosten sind **Zuschläge auf einen kleineren Grundwert**. Rückwärts musst du sie herausrechnen (÷ 1,xx), nicht als Prozent vom größeren Betrag abziehen.' },
        { answer: cs(wrongN), error: 'w-rueckwaerts-nachlass', why: 'Rabatt, Skonto und Provision sind Prozent vom **größeren** Preis (vom Hundert). Rückwärts ziehst du sie einfach ab: Listenpreis − Rabatt, Zielpreis − Skonto/Provision.' },
      ];
      if (brutto) mcs.push({ answer: cs(kalkRueck(brutto, ra, sk, prov, g, hk).bzp), error: 'w-ust-kosten', why: 'Zuerst die Umsatzsteuer herausrechnen: Bruttopreis ÷ 1,19 = Listenverkaufspreis netto. Die USt gehört dem Finanzamt, nicht dem Systemhaus.' });
      if (prov) mcs.push({ answer: cs(kalkRueck(lvp, ra, sk, 0, g, hk).bzp), error: 'w-provision-vergessen', why: 'Die Vertreterprovision fehlt. Sie wird zusammen mit dem Skonto vom Zielverkaufspreis abgezogen.' });
      return {
        id: gid('w.kalkulation'), generated: true, kind: 'number', skill: 'w.handelskalkulation', difficulty: d,
        prompt: `**Rückwärtskalkulation:** Ein Kunde ist bereit, für **1 × ${prod.n}** höchstens **${brutto ? `${eur(brutto)} brutto (inkl. 19 % USt)` : `${eur(lvp)} netto`}** zu zahlen (Listenverkaufspreis). Das Systemhaus gewährt **${pctS(ra)} Kundenrabatt** und **${pctS(sk)} Kundenskonto**${prov ? `; der Außendienst erhält **${pctS(prov)} Vertreterprovision** (wie das Skonto vom Zielverkaufspreis)` : ''}. Kalkuliert wird mit **${pctS(g)} Gewinn** und **${pctS(hk)} Handlungskosten**.\n\nWelchen **Bezugspreis** darf das Systemhaus höchstens bezahlen? Runde jedes Zwischenergebnis kaufmännisch auf Cent.`,
        answer: ans, tolerance: 0.02, unit: '€',
        misconceptions: cleanMc(ans, 0.02, mcs),
        hints: ['Rabatt und Skonto/Provision vom Hundert **abziehen**.', `Selbstkosten = Barverkaufspreis ÷ ${deN(1 + g / 100, 3)}; Bezugspreis = Selbstkosten ÷ ${deN(1 + hk / 100)}.`],
        explanation: `**Ergebnis: höchstens ${eur(r.bzp)}.**\n\n| Schritt | Rechnung | Betrag |\n|---|---|---:|\n${brutto ? `| Listenverkaufspreis brutto | | ${eur(brutto)} |\n| − Umsatzsteuer | ${eur(brutto)} ÷ 1,19 | → netto |\n` : ''}| Listenverkaufspreis netto | | ${eur(lvp)} |\n| − Kundenrabatt ${pctS(ra)} (vom Hundert) | ${eur(lvp)} · ${ra} / 100 | − ${eur(r.raB)} |\n| = Zielverkaufspreis | | ${eur(r.zvp)} |\n| − Kundenskonto ${pctS(sk)}${prov ? ` und Provision ${pctS(prov)}` : ''} (vom Hundert) | ${eur(r.zvp)} · ${sk + prov} / 100 | − ${eur(r.spB)} |\n| = Barverkaufspreis | | ${eur(r.bvp)} |\n| − Gewinn (herausrechnen) | ${eur(r.bvp)} ÷ ${deN(100 + g, 1)} · 100 = Selbstkosten | − ${eur(r.gB)} |\n| = Selbstkosten | | ${eur(r.sko)} |\n| − Handlungskosten (herausrechnen) | ${eur(r.sko)} ÷ ${100 + hk} · 100 = Bezugspreis | − ${eur(r.hkB)} |\n| **= Bezugspreis (Höchstwert)** | | **${eur(r.bzp)}** |\n\nMerke: Nachlässe (Rabatt, Skonto, Provision) rückwärts **abziehen**, Zuschläge (Gewinn, Handlungskosten) rückwärts **herausrechnen** (teilen).`,
      };
    }

    // d === 3: vollständige Tabelle vorwärts ab Listeneinkaufspreis oder Differenzkalkulation
    const unit = rng.pick(prod.p);
    const lr = rng.pick([5, 10, 15, 20, 25]), ls = rng.pick([2, 3]), bk = rng.pick([490, 990, 1490, 1990]);
    const g = rng.pick([5, 8, 10, 12, 15]), sk = rng.pick([2, 3]), prov = rng.pick([0, 5, 8, 10]), ra = rng.pick([5, 10, 15, 20]);
    const b = bezugCalc(unit, 1, lr, ls, bk);
    const bezugRows: Row[] = [
      { label: 'Listeneinkaufspreis', v: unit, given: true },
      { label: `− Liefererrabatt (${pctS(lr)})`, v: b.rab },
      { label: '= Zieleinkaufspreis', v: b.zep },
      { label: `− Liefererskonto (${pctS(ls)})`, v: b.sk },
      { label: '= Bareinkaufspreis', v: b.bep },
      { label: '+ Bezugskosten', v: bk, given: true },
      { label: '= Bezugspreis', v: b.bzp },
      { label: `+ Handlungskosten (${pctS(hk)})`, v: 0 },
      { label: '= Selbstkosten', v: 0 },
    ];
    if (rng.bool()) {
      // Vorwärts
      const v = kalkVor(b.bzp, hk, g, sk, prov, ra);
      bezugRows[7].v = v.hkB; bezugRows[8].v = v.sko;
      const rows: Row[] = [
        ...bezugRows,
        { label: `+ Gewinn (${pctS(g)})`, v: v.gB },
        { label: '= Barverkaufspreis', v: v.bvp },
        { label: `+ Kundenskonto (${pctS(sk)})`, v: v.skB },
        ...(prov ? [{ label: `+ Vertreterprovision (${pctS(prov)})`, v: v.provB }] : []),
        { label: '= Zielverkaufspreis', v: v.zvp },
        { label: `+ Kundenrabatt (${pctS(ra)})`, v: v.raB },
        { label: '= Listenverkaufspreis netto', v: v.lvp },
      ];
      const idx = (l: string) => rows.findIndex((r) => r.label.startsWith(l));
      const q: TableQuestion = {
        id: gid('w.kalkulation'), generated: true, kind: 'table', skill: 'w.handelskalkulation', difficulty: d,
        prompt: `Das IT-Systemhaus nimmt **1 × ${prod.n}** neu ins Sortiment. Kalkuliere den **Listenverkaufspreis netto** vollständig (Vorwärtskalkulation). Der Liefererskonto wird genutzt. Kundenskonto${prov ? ' und Vertreterprovision werden gemeinsam' : ' wird'} im Hundert vom Zielverkaufspreis gerechnet, der Kundenrabatt im Hundert vom Listenverkaufspreis. Runde jedes Zwischenergebnis kaufmännisch **auf Cent**; Abzüge und Zuschläge als positive Beträge eintragen.`,
        columns: [{ key: 'v', label: 'Betrag (€)', type: 'number' }],
        rows: valueRows(rows),
        misconceptions: [
          { cell: `${idx('− Liefererskonto')}:v`, answer: cs(pctOf(unit, ls)), error: 'w-skonto-basis', why: 'Liefererskonto vom **Zieleinkaufspreis** (nach Rabatt), nicht vom Listeneinkaufspreis.' },
          { cell: `${idx('+ Kundenskonto')}:v`, answer: cs(pctOf(v.bvp, sk)), error: 'w-im-hundert', why: 'Kundenskonto im Hundert: Der Barverkaufspreis entspricht 100 % − Skonto − Provision. Erst den Zielverkaufspreis berechnen, dann Skonto davon.' },
          { cell: `${idx('+ Kundenrabatt')}:v`, answer: cs(pctOf(v.zvp, ra)), error: 'w-im-hundert', why: 'Kundenrabatt im Hundert: Zielverkaufspreis ÷ (100 − Rabatt) · 100 = Listenverkaufspreis; Rabatt = Differenz.' },
        ],
        hints: ['Bezugskalkulation: Rabatt vom Listenpreis, Skonto vom Zieleinkaufspreis.', `Im Hundert: Zielverkaufspreis = Barverkaufspreis ÷ ${100 - sk - prov} · 100.`],
        explanation: `| Schritt | Rechnung | Betrag |\n|---|---|---:|\n` +
          `| Listeneinkaufspreis | | ${eur(unit)} |\n| − Liefererrabatt | ${eur(unit)} · ${lr} / 100 | − ${eur(b.rab)} |\n| = Zieleinkaufspreis | | ${eur(b.zep)} |\n| − Liefererskonto | ${eur(b.zep)} · ${ls} / 100 | − ${eur(b.sk)} |\n| = Bareinkaufspreis | | ${eur(b.bep)} |\n| + Bezugskosten | | + ${eur(bk)} |\n| **= Bezugspreis** | | **${eur(b.bzp)}** |\n` +
          `| + Handlungskosten | ${eur(b.bzp)} · ${hk} / 100 | + ${eur(v.hkB)} |\n| **= Selbstkosten** | | **${eur(v.sko)}** |\n| + Gewinn | ${eur(v.sko)} · ${g} / 100 | + ${eur(v.gB)} |\n| **= Barverkaufspreis** (= ${100 - sk - prov} %) | | **${eur(v.bvp)}** |\n` +
          `| Zielverkaufspreis (= 100 %) | ${eur(v.bvp)} ÷ ${100 - sk - prov} · 100 | ${eur(v.zvp)} |\n| davon Kundenskonto | ${eur(v.zvp)} · ${sk} / 100 | + ${eur(v.skB)} |\n${prov ? `| davon Vertreterprovision | Rest: ${eur(v.zvp)} − ${eur(v.bvp)} − ${eur(v.skB)} | + ${eur(v.provB)} |\n` : ''}` +
          `| **= Zielverkaufspreis** (= ${100 - ra} %) | | **${eur(v.zvp)}** |\n| + Kundenrabatt | ${eur(v.zvp)} ÷ ${100 - ra} · 100 − ${eur(v.zvp)} | + ${eur(v.raB)} |\n| **= Listenverkaufspreis netto** (= 100 %) | | **${eur(v.lvp)}** |\n\n` +
          `Probe: ${eur(v.lvp)} − ${ra} % Rabatt = ${eur(v.lvp - pctOf(v.lvp, ra))}; davon − ${sk + prov} % = ${eur(v.lvp - pctOf(v.lvp, ra) - pctOf(v.lvp - pctOf(v.lvp, ra), sk + prov))} ≈ Barverkaufspreis ✔`,
      };
      return finishTable(q);
    }
    // Differenzkalkulation
    const sko = b.bzp + pctOf(b.bzp, hk);
    bezugRows[7].v = sko - b.bzp; bezugRows[8].v = sko;
    const tv = kalkVor(b.bzp, hk, rng.int(3, 14), sk, prov, ra);
    const lvp = Math.round(tv.lvp / 100) * 100 - rng.pick([0, 100]);
    const raB = pctOf(lvp, ra), zvp = lvp - raB, spB = pctOf(zvp, sk + prov), bvp = zvp - spB, gB = bvp - sko;
    const gp = pq(gB, sko);
    const rows: Row[] = [
      ...bezugRows,
      { label: 'Listenverkaufspreis netto (Marktpreis)', v: lvp, given: true },
      { label: `− Kundenrabatt (${pctS(ra)})`, v: raB },
      { label: '= Zielverkaufspreis', v: zvp },
      { label: `− Kundenskonto (${pctS(sk)})${prov ? ` und Provision (${pctS(prov)})` : ''}`, v: spB },
      { label: '= Barverkaufspreis', v: bvp },
      { label: 'Gewinn in €', v: gB },
      { label: 'Gewinn in % der Selbstkosten (2 Nachkommastellen)', v: gp, n: 2 },
    ];
    return finishTable({
      id: gid('w.kalkulation'), generated: true, kind: 'table', skill: 'w.handelskalkulation', difficulty: d,
      prompt: `**Differenzkalkulation:** Für **1 × ${prod.n}** ist der Listenverkaufspreis vom Markt vorgegeben: **${eur(lvp)} netto**. Prüfe, ob sich der Verkauf lohnt: Berechne von oben den **Selbstkostenpreis** und von unten (ab dem Marktpreis) den **Barverkaufspreis**; die Differenz ist der Gewinn. Der Liefererskonto wird genutzt. Kundenrabatt, Kundenskonto${prov ? ' und Vertreterprovision' : ''} werden vom Hundert abgezogen. Runde jedes Zwischenergebnis kaufmännisch auf Cent; Abzüge als positive Beträge eintragen.`,
      columns: [{ key: 'v', label: 'Betrag (€) bzw. %', type: 'number' }],
      rows: valueRows(rows),
      misconceptions: [
        { cell: `${rows.length - 1}:v`, answer: String(pq(gB, bvp)), error: 'w-gewinn-basis', why: 'Der Gewinnsatz bezieht sich auf die **Selbstkosten**, nicht auf den Barverkaufspreis.' },
        { cell: `${rows.length - 1}:v`, answer: String(pq(gB, lvp)), error: 'w-gewinn-basis', why: 'Der Gewinnsatz bezieht sich auf die **Selbstkosten**, nicht auf den Listenverkaufspreis.' },
      ],
      hints: ['Oben: Bezugskalkulation + Handlungskosten = Selbstkosten.', 'Unten: Marktpreis − Rabatt − Skonto/Provision = Barverkaufspreis. Gewinn = Barverkaufspreis − Selbstkosten.'],
      explanation: `**Von oben:** ${eur(unit)} − ${eur(b.rab)} = ${eur(b.zep)} − ${eur(b.sk)} = ${eur(b.bep)} + ${eur(bk)} = Bezugspreis **${eur(b.bzp)}** + Handlungskosten ${eur(sko - b.bzp)} = Selbstkosten **${eur(sko)}**\n\n` +
        `**Von unten:** ${eur(lvp)} − ${ra} % (${eur(raB)}) = ${eur(zvp)} − ${sk + prov} % (${eur(spB)}) = Barverkaufspreis **${eur(bvp)}**\n\n` +
        `**Gewinn:** ${eur(bvp)} − ${eur(sko)} = **${eur(gB)}** → ${eur(gB)} ÷ ${eur(sko)} × 100 = **${deN(gp, 2)} %**${gB < 0 ? ' (Verlust! Zu diesem Marktpreis lohnt sich der Verkauf nicht.)' : ''}`,
    });
  },
};

/* ------------------------------------------------------------------ */
/* w03: Kalkulationszuschlag, Handelsspanne, Kalkulationsfaktor        */
/* ------------------------------------------------------------------ */

const SPANNE_PROD = ['USB-C-Dockingstation', 'Monitor 27 Zoll', 'Headset (kabellos)', 'Webcam 4K', 'Thin Client', 'Tastatur-Maus-Set', 'Netzwerkdrucker A4'];

function spanneVals(rng: Rng) {
  const bzp = rng.int(100, 500) * 100 + rng.pick([0, 50, 90]);
  const lvp = Math.round((bzp * rng.int(130, 220)) / 10000) * 100 - 10;
  return { bzp, lvp, kz: pq(lvp - bzp, bzp), hs: pq(lvp - bzp, lvp), fa: qn(lvp, bzp, 4) };
}
const SPANNE_DEF = '**Kalkulationszuschlag** = (Listenverkaufspreis netto − Bezugspreis) ÷ Bezugspreis × 100 · **Handelsspanne** = (Listenverkaufspreis netto − Bezugspreis) ÷ Listenverkaufspreis netto × 100 · **Kalkulationsfaktor** = Listenverkaufspreis netto ÷ Bezugspreis';

const handelsspanne: GeneratorMeta = {
  id: 'w.handelsspanne',
  title: 'Kalkulationszuschlag, Handelsspanne und Kalkulationsfaktor',
  skill: 'w.handelsspanne',
  module: 'w03',
  make(rng, d) {
    if (d === 1) {
      const p = rng.pick(SPANNE_PROD);
      const v = spanneVals(rng);
      const which = rng.pick(['kz', 'hs', 'fa'] as const);
      const name = { kz: 'Kalkulationszuschlag in %', hs: 'Handelsspanne in %', fa: 'Kalkulationsfaktor' }[which];
      const ans = v[which];
      const tol = which === 'fa' ? 0.0001 : 0.01;
      return {
        id: gid('w.handelsspanne'), generated: true, kind: 'number', skill: 'w.handelsspanne', difficulty: d,
        prompt: `Das IT-Systemhaus kauft eine **${p}** zum Bezugspreis von **${eur(v.bzp)}** ein und bietet sie für **${eur(v.lvp)} netto** (Listenverkaufspreis) an.\n\nBerechne den **${name}** (${which === 'fa' ? 'vier' : 'zwei'} Nachkommastellen).`,
        answer: ans, tolerance: tol, unit: which === 'fa' ? undefined : '%',
        misconceptions: cleanMc(ans, tol, which === 'kz'
          ? [{ answer: String(v.hs), error: 'w-zuschlag-spanne', why: 'Das ist die Handelsspanne (Grundwert = Verkaufspreis). Der Kalkulationszuschlag bezieht sich auf den **Bezugspreis**.' }, { answer: String(v.fa), error: 'w-zuschlag-spanne', why: 'Das ist der Kalkulationsfaktor. Zuschlag in % = (Faktor − 1) × 100.' }]
          : which === 'hs'
            ? [{ answer: String(v.kz), error: 'w-zuschlag-spanne', why: 'Das ist der Kalkulationszuschlag (Grundwert = Bezugspreis). Die Handelsspanne bezieht sich auf den **Verkaufspreis**.' }]
            : [{ answer: String(qn(v.lvp - v.bzp, v.bzp, 4)), error: 'w-faktor', why: 'Der Faktor ist Verkaufspreis ÷ Bezugspreis (immer größer als 1), nicht der Zuschlag als Dezimalzahl.' }, { answer: String(qn(v.bzp, v.lvp, 4)), error: 'w-kehrwert', why: 'Kehrwert: Faktor = Verkaufspreis ÷ Bezugspreis.' }]),
        hints: ['Rohgewinn = Verkaufspreis netto − Bezugspreis.', which === 'hs' ? 'Grundwert der Handelsspanne ist der Verkaufspreis.' : which === 'kz' ? 'Grundwert des Kalkulationszuschlags ist der Bezugspreis.' : 'Faktor = Verkaufspreis ÷ Bezugspreis.'],
        explanation: `**Ergebnis: ${deN(ans, which === 'fa' ? 4 : 2)}${which === 'fa' ? '' : ' %'}.**\n\nRohgewinn: ${eur(v.lvp)} − ${eur(v.bzp)} = ${eur(v.lvp - v.bzp)}\n\n- Kalkulationszuschlag = ${eur(v.lvp - v.bzp)} ÷ ${eur(v.bzp)} × 100 = **${deN(v.kz, 2)} %**\n- Handelsspanne = ${eur(v.lvp - v.bzp)} ÷ ${eur(v.lvp)} × 100 = **${deN(v.hs, 2)} %**\n- Kalkulationsfaktor = ${eur(v.lvp)} ÷ ${eur(v.bzp)} = **${deN(v.fa, 4)}**\n\nMerke: Zuschlag → Grundwert Bezugspreis (Einkauf), Spanne → Grundwert Verkaufspreis. Der Zuschlag ist deshalb immer größer als die Spanne.`,
      };
    }
    if (d === 2) {
      const ps = rng.shuffle(SPANNE_PROD).slice(0, 3);
      const vs = ps.map(() => spanneVals(rng));
      return finishTable({
        id: gid('w.handelsspanne'), generated: true, kind: 'table', skill: 'w.handelsspanne', difficulty: d,
        prompt: `Der Einkauf möchte die Preispolitik für drei Artikel prüfen (alle Preise netto):\n\n| Artikel | Bezugspreis | Listenverkaufspreis |\n|---|---|---|\n${ps.map((p, i) => `| ${p} | ${eur(vs[i].bzp)} | ${eur(vs[i].lvp)} |`).join('\n')}\n\n${SPANNE_DEF}\n\nBerechne für jeden Artikel Kalkulationszuschlag und Handelsspanne (in %, zwei Nachkommastellen) sowie den Kalkulationsfaktor (vier Nachkommastellen).`,
        columns: [
          { key: 'kz', label: 'Kalk.-zuschlag (%)', type: 'number' },
          { key: 'hs', label: 'Handelsspanne (%)', type: 'number' },
          { key: 'fa', label: 'Kalk.-faktor', type: 'number' },
        ],
        rows: ps.map((p, i) => ({ label: p, cells: { kz: { answer: String(vs[i].kz), accept: near(vs[i].kz) }, hs: { answer: String(vs[i].hs), accept: near(vs[i].hs) }, fa: { answer: vs[i].fa.toFixed(4), accept: near(vs[i].fa, 4).map((x) => Number(x).toFixed(4)) } } })), // 4 Stellen erzwingen: „1.429“ läse der Bewerter als 1.429 (Tausender)
        misconceptions: ps.flatMap((_, i) => [
          { cell: `${i}:kz`, answer: String(vs[i].hs), error: 'w-zuschlag-spanne', why: 'Zuschlag und Spanne vertauscht: Der Kalkulationszuschlag bezieht sich auf den Bezugspreis.' },
          { cell: `${i}:hs`, answer: String(vs[i].kz), error: 'w-zuschlag-spanne', why: 'Zuschlag und Spanne vertauscht: Die Handelsspanne bezieht sich auf den Verkaufspreis.' },
        ]),
        hints: ['Rohgewinn = Verkaufspreis − Bezugspreis.', 'Zuschlag ÷ Bezugspreis, Spanne ÷ Verkaufspreis, Faktor = Verkaufspreis ÷ Bezugspreis.'],
        explanation: ps.map((p, i) => `**${p}:** Rohgewinn ${eur(vs[i].lvp - vs[i].bzp)} → Zuschlag ${deN(vs[i].kz, 2)} % · Spanne ${deN(vs[i].hs, 2)} % · Faktor ${deN(vs[i].fa, 4)}`).join('\n\n') + '\n\nKontrolle: Faktor = 1 + Zuschlag ÷ 100.',
      });
    }
    // d === 3: Umrechnungen
    const b1 = rng.int(80, 400) * 100 + rng.pick([0, 50]);
    const fh = rng.int(125, 210);
    const l1 = Math.round((b1 * fh) / 100);
    const l2 = rng.int(150, 900) * 100;
    const h2 = rng.int(18, 45);
    const bz2 = (l2 * (100 - h2)) / 100;
    const h3 = rng.pick([20, 25, 30, 35, 37.5, 40, 45]);
    const k3 = pq(h3 * 100, (100 - h3) * 100);
    const k4 = rng.pick([25, 40, 50, 60, 75, 80]);
    const h4 = pq(k4 * 100, (100 + k4) * 100);
    const rows: Row[] = [
      { label: `Bezugspreis ${eur(b1)}, Kalkulationsfaktor ${deN(fh / 100, 2)} → Listenverkaufspreis netto (€)`, v: l1 },
      { label: `Listenverkaufspreis netto ${eur(l2)}, Handelsspanne ${pctS(h2)} → höchster Bezugspreis (€)`, v: bz2 },
      { label: `Handelsspanne ${pctS(h3)} → Kalkulationszuschlag (%)`, v: k3, n: 2 },
      { label: `Kalkulationszuschlag ${pctS(k4)} → Handelsspanne (%)`, v: h4, n: 2 },
    ];
    return finishTable({
      id: gid('w.handelsspanne'), generated: true, kind: 'table', skill: 'w.handelsspanne', difficulty: d,
      prompt: `Rechne die Kalkulationsgrößen ineinander um (alle Preise netto). ${SPANNE_DEF}\n\nEuro-Beträge auf Cent, Prozentwerte auf zwei Nachkommastellen runden.`,
      columns: [{ key: 'v', label: 'Ergebnis', type: 'number' }],
      rows: valueRows(rows),
      misconceptions: [
        { cell: '1:v', answer: cs(Math.round((l2 * 100) / (100 + h2))), error: 'w-zuschlag-spanne', why: 'Die Handelsspanne bezieht sich auf den Verkaufspreis: Bezugspreis = Verkaufspreis × (100 − Spanne) ÷ 100, nicht ÷ (1 + Spanne).' },
        { cell: '2:v', answer: String(h3), error: 'w-zuschlag-spanne', why: 'Spanne und Zuschlag sind nicht gleich groß, weil sie verschiedene Grundwerte haben: Zuschlag = Spanne ÷ (100 − Spanne) × 100.' },
        { cell: '3:v', answer: String(k4), error: 'w-zuschlag-spanne', why: 'Spanne = Zuschlag ÷ (100 + Zuschlag) × 100 – sie ist immer kleiner als der Zuschlag.' },
      ],
      hints: ['Mit einem Beispiel-Bezugspreis von 100 € rechnen hilft beim Umrechnen.', 'Zuschlag = Spanne ÷ (100 − Spanne) × 100; Spanne = Zuschlag ÷ (100 + Zuschlag) × 100.'],
      explanation: `1. ${eur(b1)} × ${deN(fh / 100, 2)} = **${eur(l1)}**\n\n2. Spanne ${h2} % vom Verkaufspreis = Rohgewinn → Bezugspreis = ${eur(l2)} × ${100 - h2} / 100 = **${eur(bz2)}**\n\n3. Annahme Verkaufspreis 100 € → Rohgewinn ${deN(h3)} €, Bezugspreis ${deN(100 - h3)} € → Zuschlag = ${deN(h3)} ÷ ${deN(100 - h3)} × 100 = **${deN(k3, 2)} %**\n\n4. Annahme Bezugspreis 100 € → Rohgewinn ${k4} €, Verkaufspreis ${100 + k4} € → Spanne = ${k4} ÷ ${100 + k4} × 100 = **${deN(h4, 2)} %**`,
    });
  },
};

/* ------------------------------------------------------------------ */
/* w03: Stundensatz und Minutensatz herleiten                          */
/* ------------------------------------------------------------------ */

function stdJahr(rng: Rng) {
  const f = rng.int(8, 12), u = rng.int(25, 30), k = rng.int(4, 12), fb = rng.int(3, 8), nv = rng.int(12, 30);
  const hd = rng.bool(0.8) ? 8 : 7.5;
  const tage = 365 - 104 - f - u - k - fb - nv;
  return { f, u, k, fb, nv, hd, tage, hMA: tage * hd };
}
const stdTageTbl = (s: ReturnType<typeof stdJahr>) => `| Position | Tage |\n|---|---:|\n| Kalendertage | 365 |\n| Wochenenden (Sa/So) | 104 |\n| Feiertage | ${s.f} |\n| Urlaub | ${s.u} |\n| Krankheit (Durchschnitt) | ${s.k} |\n| Fortbildung | ${s.fb} |\n| nicht abrechenbare Zeit (Akquise, Rüst-, Warte- und Verteilzeit) | ${s.nv} |`;

const stundensatz: GeneratorMeta = {
  id: 'w.stundensatz',
  title: 'Stundensatz und Minutensatz herleiten',
  skill: 'w.stundensatz',
  module: 'w03',
  make(rng, d) {
    if (d === 1) {
      const s = stdJahr(rng);
      return {
        id: gid('w.stundensatz'), generated: true, kind: 'number', skill: 'w.stundensatz', difficulty: d,
        prompt: `Das IT-Systemhaus will seinen Stundensatz neu kalkulieren. Zuerst braucht es die **produktiven (abrechenbaren) Stunden** eines Technikers pro Jahr. Ein Arbeitstag hat **${deN(s.hd, 1)} Stunden**.\n\n${stdTageTbl(s)}\n\nWie viele **produktive Stunden** leistet ein Techniker pro Jahr?`,
        answer: s.hMA, tolerance: 0, unit: 'h',
        misconceptions: cleanMc(s.hMA, 0, [
          { answer: String(s.tage), error: 'w-stunden-tage', why: 'Das sind die produktiven **Tage**. Mal Stunden pro Tag nehmen.' },
          { answer: String((s.tage + 104) * s.hd), error: 'w-abzuege-unvollstaendig', why: 'Die Wochenenden (104 Tage) müssen abgezogen werden.' },
          { answer: String(160 * 12), error: 'w-stundensatz-160', why: '160 h × 12 Monate sind **bezahlte** Sollstunden. Urlaub, Krankheit, Fortbildung und nicht abrechenbare Zeit kann man keinem Kunden berechnen.' },
          { answer: String((s.tage + s.k + s.fb + s.nv) * s.hd), error: 'w-abzuege-unvollstaendig', why: 'Auch Krankheit, Fortbildung und nicht abrechenbare Zeiten werden abgezogen – nur produktive Stunden kann man abrechnen.' },
        ]),
        hints: ['365 − alle Abzüge = produktive Tage.', 'Produktive Tage × Stunden pro Tag.'],
        explanation: `**Ergebnis: ${deN(s.hMA, 1)} h.**\n\nProduktive Tage = 365 − 104 − ${s.f} − ${s.u} − ${s.k} − ${s.fb} − ${s.nv} = **${s.tage} Tage**\n\nProduktive Stunden = ${s.tage} × ${deN(s.hd, 1)} h = **${deN(s.hMA, 1)} h**\n\nHäufiger Fehler: Mit 160 h im Monat (1.920 h im Jahr) rechnen. Bezahlt wird der Techniker zwar für diese Zeit, abrechnen kann das Systemhaus aber nur die produktiven Stunden.`,
      };
    }
    if (d === 2) {
      // Monatsmodell: verrechenbare Stunden, Gemeinkostenzuschlag, Gewinn
      const soll = rng.pick([160, 168]);
      const ab = [rng.int(18, 26), rng.int(4, 10), rng.int(12, 24), rng.int(10, 20)];
      const hv = soll - ab.reduce((a, b) => a + b, 0);
      const geh = rng.int(32, 44) * 10000;
      const ag = Math.round(geh * 0.21 / 100) * 100;
      const dir = rng.int(15, 40) * 1000;
      const gk = rng.pick([30, 40, 50, 60]);
      const g = rng.pick([8, 10, 12, 15]);
      const kost = geh + ag + dir;
      const mitGk = kost + pctOf(kost, gk);
      const sks = Math.round(mitGk / hv);
      const net = sks + pctOf(sks, g);
      const ans = net / 100;
      const n160 = (() => { const x = Math.round(mitGk / soll); return x + pctOf(x, g); })();
      const nAdd = Math.round((kost + pctOf(kost, gk + g)) / hv);
      const nGk = (() => { const x = Math.round(kost / hv); return x + pctOf(x, g); })();
      return {
        id: gid('w.stundensatz'), generated: true, kind: 'number', skill: 'w.stundensatz', difficulty: d,
        prompt: `Das IT-Systemhaus kalkuliert den Stundensatz, den es Kunden für einen Servicetechniker berechnet. Monatswerte:\n\n| Position | Wert |\n|---|---:|\n| Sollarbeitszeit | ${soll} h |\n| − Urlaub und Krankheit (anteilig) | ${ab[0]} h |\n| − Fortbildung | ${ab[1]} h |\n| − interne Aufgaben (Besprechungen, Dokumentation, Lager) | ${ab[2]} h |\n| − Fahr- und Wartezeiten | ${ab[3]} h |\n| Bruttogehalt | ${eur(geh)} |\n| Arbeitgeberanteil Sozialversicherung | ${eur(ag)} |\n| direkte Kosten (Diensthandy, Fahrzeuganteil) | ${eur(dir)} |\n| Gemeinkostenzuschlag (auf alle Personal- und direkten Kosten) | ${pctS(gk)} |\n| Gewinnzuschlag (auf den Selbstkostensatz) | ${pctS(g)} |\n\nBerechne den **Netto-Stundensatz**. Runde den Selbstkostensatz und den Netto-Stundensatz jeweils auf Cent.`,
        answer: ans, tolerance: 0.01, unit: '€/h',
        misconceptions: cleanMc(ans, 0.01, [
          { answer: cs(n160), error: 'w-stundensatz-160', why: `Teile durch die **verrechenbaren** Stunden (${hv} h), nicht durch die Sollarbeitszeit (${soll} h).` },
          { answer: cs(nAdd), error: 'w-zuschlaege-addiert', why: 'Die Zuschläge haben verschiedene Grundwerte: erst Gemeinkosten auf die Kosten, dann den Gewinn auf den Selbstkostensatz.' },
          { answer: cs(sks), error: 'w-gewinn-vergessen', why: 'Das ist der Selbstkostensatz – der Gewinnzuschlag fehlt noch.' },
          { answer: cs(nGk), error: 'w-gemeinkosten-vergessen', why: 'Der Gemeinkostenzuschlag fehlt (Büro, Verwaltung, Werkzeug …).' },
        ]),
        hints: [`Verrechenbare Stunden = ${soll} h − alle Abzüge.`, 'Kosten × (1 + Gemeinkostenzuschlag) ÷ verrechenbare Stunden = Selbstkostensatz; dann Gewinn aufschlagen.'],
        explanation: `**Ergebnis: ${eur(net)} pro Stunde (netto).**\n\n| Schritt | Rechnung | Ergebnis |\n|---|---|---:|\n| verrechenbare Stunden | ${soll} − ${ab.join(' − ')} | ${hv} h |\n| Kosten pro Monat | ${eur(geh)} + ${eur(ag)} + ${eur(dir)} | ${eur(kost)} |\n| + Gemeinkosten ${pctS(gk)} | ${eur(kost)} · ${gk} / 100 | ${eur(mitGk - kost)} |\n| = Selbstkosten pro Monat | | ${eur(mitGk)} |\n| Selbstkostensatz | ${eur(mitGk)} ÷ ${hv} h | ${eur(sks)} |\n| + Gewinn ${pctS(g)} | ${eur(sks)} · ${g} / 100 | ${eur(net - sks)} |\n| **= Netto-Stundensatz** | | **${eur(net)}** |\n\nHinweis: Für eine rein interne Verrechnung (z. B. IT-Abteilung an Fachabteilung) reicht oft der Selbstkostensatz. Externen Kunden berechnet man Selbstkosten + Gewinn, auf der Rechnung kommen 19 % USt dazu.`,
      };
    }
    // d === 3: Jahresmodell als Tabelle mit Minutensatz und Angebot
    const s = stdJahr(rng);
    const n = rng.int(3, 8);
    const jk = rng.int(38, 62) * 100000;
    const gk = rng.int(12, 52) * 500000;
    const sek = rng.int(6, 24) * 100000;
    const g = rng.pick([8, 10, 12, 14, 15, 18, 20]);
    const hGes = n * s.hMA;
    const sk = n * jk + gk;
    const sks = Math.round(sk / hGes);
    const net = sks + pctOf(sks, g);
    const br = net + pctOf(net, 19);
    const ms = Math.round(net / 60);
    const min = rng.pick([45, 75, 90, 105, 135, 150, 195]);
    const anf = rng.pick([3900, 4500, 4900, 5900]);
    const ang = min * ms + anf;
    const rows: Row[] = [
      { label: 'produktive Tage je Techniker', v: s.tage, n: 0 },
      { label: 'produktive Stunden je Techniker', v: s.hMA, n: 0 },
      { label: `produktive Stunden gesamt (${n} Techniker)`, v: hGes, n: 0 },
      { label: 'Selbstkosten gesamt pro Jahr (€)', v: sk },
      { label: 'Selbstkostensatz (€/h)', v: sks },
      { label: `Netto-Stundensatz mit ${pctS(g)} Gewinn (€/h)`, v: net },
      { label: 'Brutto-Stundensatz mit 19 % USt (€/h)', v: br },
      { label: 'Minutensatz netto (€/min)', v: ms },
      { label: `Angebotspreis netto: ${min} min Arbeit + Anfahrt (€)`, v: ang },
    ];
    return finishTable({
      id: gid('w.stundensatz'), generated: true, kind: 'table', skill: 'w.stundensatz', difficulty: d,
      prompt: `Das IT-Systemhaus beschäftigt **${n} Techniker** mit Kosten von je **${eur(jk)} pro Jahr** (Bruttolohn inkl. Sonderzahlungen und Arbeitgeberanteil). Die **Gemeinkosten** (Büro, Fahrzeuge, Verwaltung, Versicherungen) betragen **${eur(gk)}** pro Jahr. Für Reisen zu Kundenprojekten fielen außerdem **${eur(sek)} Reisekosten** an; sie werden den Kunden als Sondereinzelkosten direkt berechnet. Ein Arbeitstag hat **${deN(s.hd, 1)} Stunden**.\n\n${stdTageTbl(s)}\n\nVervollständige die Kalkulation. Gewinnzuschlag **${pctS(g)}**. Ein Kunde bucht einen Einsatz von **${min} Minuten**, dazu kommt eine Anfahrtspauschale von **${eur(anf)}** netto. Rundung: Sätze jeweils auf Cent; Minutensatz = Netto-Stundensatz ÷ 60, auf Cent gerundet; Arbeitskosten = Minuten × Minutensatz.`,
      columns: [{ key: 'v', label: 'Wert', type: 'number' }],
      rows: valueRows(rows),
      misconceptions: [
        { cell: '3:v', answer: cs(sk + sek), error: 'w-sondereinzelkosten', why: 'Reisekosten zu Kundenprojekten sind **Sondereinzelkosten**: Sie werden direkt dem jeweiligen Kunden berechnet und gehören nicht in den Stundensatz.' },
        { cell: '1:v', answer: String(160 * 12), error: 'w-stundensatz-160', why: 'Nicht mit 1.920 bezahlten Stunden rechnen – nur produktive Stunden kann man abrechnen.' },
        { cell: '7:v', answer: cs(Math.round(br / 60)), error: 'w-brutto-statt-netto', why: 'Der Minutensatz für das Angebot wird aus dem **Netto**-Stundensatz berechnet; die USt kommt erst auf die Rechnungssumme.' },
        { cell: '8:v', answer: cs(min * ms), error: 'w-position-vergessen', why: 'Die Anfahrtspauschale fehlt.' },
      ],
      hints: ['Selbstkosten = Techniker × Jahreskosten + Gemeinkosten (ohne Sondereinzelkosten).', 'Selbstkostensatz = Selbstkosten ÷ produktive Stunden gesamt.'],
      explanation: `| Schritt | Rechnung | Ergebnis |\n|---|---|---:|\n| produktive Tage | 365 − 104 − ${s.f} − ${s.u} − ${s.k} − ${s.fb} − ${s.nv} | ${s.tage} |\n| produktive Stunden je Techniker | ${s.tage} × ${deN(s.hd, 1)} h | ${deN(s.hMA, 1)} h |\n| produktive Stunden gesamt | ${n} × ${deN(s.hMA, 1)} h | ${deN(hGes, 1)} h |\n| Selbstkosten | ${n} × ${eur(jk)} + ${eur(gk)} | ${eur(sk)} |\n| Selbstkostensatz | ${eur(sk)} ÷ ${deN(hGes, 1)} h | ${eur(sks)} |\n| Netto-Stundensatz | ${eur(sks)} + ${g} % | ${eur(net)} |\n| Brutto-Stundensatz | ${eur(net)} × 1,19 | ${eur(br)} |\n| Minutensatz | ${eur(net)} ÷ 60 | ${eur(ms)} |\n| Angebot netto | ${min} × ${eur(ms)} + ${eur(anf)} | **${eur(ang)}** |\n\nDie Reisekosten (${eur(sek)}) bleiben außen vor: Sondereinzelkosten werden dem Kunden direkt in Rechnung gestellt.`,
    });
  },
};

/* ------------------------------------------------------------------ */
/* w03: Finanzierung – Darlehen (Tilgungsplan) und Leasing              */
/* ------------------------------------------------------------------ */

/** Abzahlungsdarlehen (Ratendarlehen): gleiche Tilgung, Zinsen vom Restschuldstand am Jahresanfang. */
function abzahlung(k: number, n: number, i: number) {
  const t = k / n;
  return Array.from({ length: n }, (_, j) => { const rs = k - j * t; const z = pctOf(rs, i); return { rs, z, t, r: z + t }; });
}
/** Annuitätendarlehen: gleichbleibende Annuität (auf Cent), letzte Rate gleicht Rundung aus. */
function annuitaet(k: number, n: number, i: number) {
  const q = 1 + i / 100;
  const a = Math.round((k * q ** n * (q - 1)) / (q ** n - 1));
  const plan: { rs: number; z: number; t: number; r: number }[] = [];
  let rs = k;
  for (let j = 0; j < n; j++) {
    const z = pctOf(rs, i);
    const t = j === n - 1 ? rs : a - z;
    plan.push({ rs, z, t, r: z + t });
    rs -= t;
  }
  return { a, plan };
}

const finanzierung: GeneratorMeta = {
  id: 'w.finanzierung',
  title: 'Darlehen (Tilgungsplan) und Leasing vergleichen',
  skill: 'w.finanzierung',
  module: 'w03',
  make(rng, d) {
    const n = rng.pick([3, 4, 5]);
    const i = rng.int(3, 8);
    const k = n * rng.int(20, 80) * 10000;
    const what = rng.pick(['einen Server-Cluster mit Storage', '30 neue Arbeitsplatzrechner', 'eine neue Firewall- und Switch-Infrastruktur', 'die Ausstattung des neuen Schulungsraums']);
    const cols = [
      { key: 'rs', label: 'Restschuld Jahresanfang (€)', type: 'number' as const },
      { key: 'z', label: 'Zinsen (€)', type: 'number' as const },
      { key: 't', label: 'Tilgung (€)', type: 'number' as const },
      { key: 'r', label: d === 2 ? 'Annuität (€)' : 'Jahresrate (€)', type: 'number' as const },
    ];
    if (d === 1 || d === 2) {
      const ann = d === 2 ? annuitaet(k, n, i) : null;
      const plan = ann ? ann.plan : abzahlung(k, n, i);
      const sz = plan.reduce((s, p) => s + p.z, 0);
      const rows = plan.map((p, j) => ({
        label: `Jahr ${j + 1}`,
        cells: {
          rs: j === 0 ? { given: de2(p.rs / 100) } : { answer: cs(p.rs), accept: ann ? acceptCent(p.rs) : [] },
          z: { answer: cs(p.z), accept: ann ? acceptCent(p.z) : [] },
          t: { answer: cs(p.t), accept: ann ? acceptCent(p.t) : [] },
          r: ann && j < n - 1 ? { given: de2(p.r / 100) } : { answer: cs(p.r), accept: ann ? acceptCent(p.r) : [] },
        },
      }));
      const sumRow = { label: 'Summe', cells: { rs: { given: '–' }, z: { answer: cs(sz), accept: ann ? [cs(sz - 2), ...acceptCent(sz), cs(sz + 2)] : [] }, t: { given: de2(k / 100) }, r: { answer: cs(k + sz), accept: ann ? [cs(k + sz - 2), ...acceptCent(k + sz), cs(k + sz + 2)] : [] } } };
      const q: TableQuestion = {
        id: gid('w.finanzierung'), generated: true, kind: 'table', skill: 'w.finanzierung', difficulty: d,
        prompt: ann
          ? `Die Elektro Krämer GmbH finanziert ${what} über ein **Annuitätendarlehen** von **${eur(k)}**, Laufzeit **${n} Jahre**, Zinssatz **${i} % p. a.** Die Bank nennt eine gleichbleibende jährliche **Annuität von ${eur(ann.a)}** (Zinsen + Tilgung). Zinsen werden am Jahresende vom Restschuldstand am Jahresanfang berechnet und auf Cent gerundet. Im letzten Jahr wird die Restschuld vollständig getilgt – die letzte Annuität weicht deshalb um einige Cent ab.\n\nVervollständige den **Tilgungsplan**.`
          : `Die Elektro Krämer GmbH finanziert ${what} über ein **Abzahlungsdarlehen (Ratendarlehen)** von **${eur(k)}**, Laufzeit **${n} Jahre**, Zinssatz **${i} % p. a.** Getilgt wird in gleichen Jahresbeträgen; die Zinsen werden am Jahresende vom Restschuldstand am Jahresanfang berechnet.\n\nVervollständige den **Tilgungsplan** (Jahresrate = Zinsen + Tilgung).`,
        columns: cols,
        rows: [...rows, sumRow],
        misconceptions: ann
          ? [{ cell: '0:t', answer: cs(k / n), error: 'w-darlehensart', why: 'Gleiche Tilgungsbeträge gibt es beim Abzahlungsdarlehen. Beim Annuitätendarlehen ist die **Annuität** gleich: Tilgung = Annuität − Zinsen.' }]
          : [
            { cell: '1:z', answer: cs(pctOf(k, i)), error: 'w-zins-anfangsschuld', why: 'Die Zinsen werden von der **Restschuld** am Jahresanfang berechnet, nicht jedes Jahr vom ursprünglichen Darlehensbetrag.' },
            { cell: `${n}:z`, answer: cs(pctOf(k, i) * n), error: 'w-zins-anfangsschuld', why: 'Weil die Restschuld sinkt, sinken auch die Zinsen. Nicht n × Zinsen vom Anfangsbetrag rechnen.' },
          ],
        hints: ann ? ['Zinsen = Restschuld × Zinssatz.', 'Tilgung = Annuität − Zinsen; neue Restschuld = alte Restschuld − Tilgung.'] : [`Tilgung pro Jahr = ${eur(k)} ÷ ${n}.`, 'Zinsen = Restschuld am Jahresanfang × Zinssatz.'],
        explanation: `| Jahr | Restschuld Anfang | Zinsen (${i} %) | Tilgung | ${ann ? 'Annuität' : 'Jahresrate'} | Restschuld Ende |\n|---|---:|---:|---:|---:|---:|\n${plan.map((p, j) => `| ${j + 1} | ${eur(p.rs)} | ${eur(p.z)} | ${eur(p.t)} | ${eur(p.r)} | ${eur(p.rs - p.t)} |`).join('\n')}\n| **Summe** | | **${eur(sz)}** | **${eur(k)}** | **${eur(k + sz)}** | |\n\n` +
          (ann ? 'Beim **Annuitätendarlehen** bleibt die Rate gleich; der Zinsanteil sinkt, der Tilgungsanteil steigt von Jahr zu Jahr.' : 'Beim **Abzahlungsdarlehen** ist die Tilgung gleich; weil die Restschuld sinkt, sinken Zinsen und Jahresrate.') +
          ` Die Finanzierungskosten (Zinsen) betragen insgesamt **${eur(sz)}**.`,
      };
      return finishTable(q);
    }
    // d === 3: Darlehen vs. Leasing mit Kaufoption, Preis brutto gegeben
    const netto = k;
    const brutto = netto + pctOf(netto, 19);
    const months = n * 12;
    const lf = rng.pick(n === 3 ? [2.8, 2.9, 3.0, 3.1] : n === 4 ? [2.2, 2.3, 2.4, 2.5] : [1.8, 1.9, 2.0, 2.1]); // realistische Leasingfaktoren je Laufzeit
    const rate = Math.round((netto * lf) / 100);
    const rwp = rng.pick([5, 10, 15]);
    const rw = pctOf(netto, rwp);
    const plan = abzahlung(netto, n, i);
    const zins = plan.reduce((s, p) => s + p.z, 0);
    const kD = netto + zins;
    const lRates = rate * months;
    const kL = lRates + rw;
    const better = kD < kL ? 'Darlehen' : 'Leasing';
    const rows = [
      ...valueRows([
        { label: 'Anschaffungspreis netto', v: netto },
        { label: 'Zinsen gesamt (Abzahlungsdarlehen)', v: zins },
        { label: 'Gesamtkosten Kauf mit Darlehen', v: kD },
        { label: 'Leasingraten gesamt', v: lRates },
        { label: 'Kaufpreis bei Ausübung der Kaufoption', v: rw },
        { label: 'Gesamtkosten Leasing inkl. Kaufoption', v: kL },
        { label: 'Kostenvorteil der günstigeren Variante', v: Math.abs(kD - kL) },
      ]),
      { label: 'günstigere Variante (Darlehen / Leasing)', cells: { t: { answer: better, accept: better === 'Darlehen' ? ['kauf mit darlehen', 'kredit', 'darlehen', 'kauf'] : ['leasing', 'leasing mit kaufoption'] } } },
    ];
    return finishTable({
      id: gid('w.finanzierung'), generated: true, kind: 'table', skill: 'w.finanzierung', difficulty: d,
      prompt: `Die Elektro Krämer GmbH (vorsteuerabzugsberechtigt) will ${what} anschaffen. Das Angebot des Systemhauses lautet über **${eur(brutto)} brutto** (inkl. 19 % USt). Zwei Finanzierungen stehen zur Wahl:\n\n| | Kauf mit Abzahlungsdarlehen | Leasing mit Kaufoption |\n|---|---|---|\n| Betrag / Grundlage | Darlehen über den **Nettopreis** | Leasingrate **${deN(lf, 1)} % des Nettopreises pro Monat** |\n| Laufzeit | ${n} Jahre, gleiche jährliche Tilgung | ${months} Monate |\n| Kosten | ${i} % Zinsen p. a. vom Restschuldstand am Jahresanfang | Kaufoption am Ende: **${rwp} % des Nettopreises** |\n| Eigentum | sofort beim Unternehmen | beim Leasinggeber, nach Ausübung der Kaufoption beim Unternehmen |\n\nVergleiche die Gesamtkosten (beide Varianten enden mit Eigentum an den Geräten). Beträge auf Cent.`,
      columns: [
        { key: 'v', label: 'Betrag (€)', type: 'number' },
        { key: 't', label: 'Antwort', type: 'text' },
      ],
      rows,
      misconceptions: [
        { cell: '0:v', answer: cs(brutto), error: 'w-ust-kosten', why: 'Die Umsatzsteuer ist für ein vorsteuerabzugsberechtigtes Unternehmen kein Kostenbestandteil: Netto = Brutto ÷ 1,19.' },
        { cell: '1:v', answer: cs(pctOf(netto, i) * n), error: 'w-zins-anfangsschuld', why: 'Zinsen nur vom Restschuldstand am Jahresanfang – die Restschuld sinkt jedes Jahr.' },
        { cell: '3:v', answer: cs(Math.round((brutto * lf) / 100) * months), error: 'w-leasing-brutto', why: 'Der Leasingsatz bezieht sich laut Angebot auf den **Nettopreis**.' },
        { cell: '5:v', answer: cs(lRates), error: 'w-kaufoption-vergessen', why: 'Für einen fairen Vergleich (am Ende Eigentum) gehört der Kaufpreis der Kaufoption dazu.' },
      ],
      hints: ['Netto = Brutto ÷ 1,19.', 'Darlehen: Tilgung = Netto ÷ Jahre; Zinsen jedes Jahr von der Restschuld. Leasing: Rate × Monate + Kaufoption.'],
      explanation: `**Nettopreis:** ${eur(brutto)} ÷ 1,19 = **${eur(netto)}**\n\n**Darlehen:**\n\n| Jahr | Restschuld Anfang | Zinsen ${i} % | Tilgung |\n|---|---:|---:|---:|\n${plan.map((p, j) => `| ${j + 1} | ${eur(p.rs)} | ${eur(p.z)} | ${eur(p.t)} |`).join('\n')}\n\nZinsen gesamt **${eur(zins)}** → Gesamtkosten ${eur(netto)} + ${eur(zins)} = **${eur(kD)}**\n\n**Leasing:** Rate ${eur(netto)} × ${deN(lf, 1)} % = ${eur(rate)} pro Monat × ${months} = ${eur(lRates)} + Kaufoption ${eur(rw)} = **${eur(kL)}**\n\n**Ergebnis:** ${better} ist um **${eur(Math.abs(kD - kL))}** günstiger. In der Begründung gehören auch Liquidität (Leasing bindet kein Kapital, Darlehen belastet die Kreditlinie), Bilanz (Leasinggut meist beim Leasinggeber bilanziert) und Flexibilität dazu.`,
    });
  },
};

/* ------------------------------------------------------------------ */
/* w03: Tarife vergleichen – Cloud-Blöcke, Servicevertrag, Break-even  */
/* ------------------------------------------------------------------ */

function serviceParams(rng: Rng) {
  for (let t = 0; t < 300; t++) {
    const G = rng.pick([19900, 29900, 39900, 49900, 55900, 69900]);
    const h0 = rng.pick([2, 3, 4, 6, 8]);
    const s = rng.pick([5500, 6000, 6500, 7000, 7500]);
    const a = rng.pick([8500, 8900, 9500, 9900, 11000]);
    const vert = (h: number) => G + Math.max(0, h - h0) * s;
    const einz = (h: number) => h * a;
    let hs = -1;
    for (let h = 0; h <= 60; h++) if (vert(h) < einz(h)) { hs = h; break; }
    if (hs >= 2 && hs <= 25) return { G, h0, s, a, vert, einz, hs };
  }
  throw new Error('serviceParams');
}

const tarif: GeneratorMeta = {
  id: 'w.tarif',
  title: 'Tarife vergleichen: Blockpreise und Break-even',
  skill: 'w.tarifvergleich',
  module: 'w03',
  make(rng, d) {
    const servicePrompt = (p: ReturnType<typeof serviceParams>) => `Ein Kunde des IT-Systemhauses (Steuerbüro, 12 Arbeitsplätze) überlegt, einen Servicevertrag abzuschließen. Preisliste (alle Preise netto):\n\n| | Servicevertrag „Basic“ | Einzelabrechnung |\n|---|---|---|\n| Grundgebühr | ${eur(p.G)} pro Monat, enthält **${p.h0} Technikerstunden** | – |\n| Stundensatz | ${eur(p.s)} je weitere Stunde | ${eur(p.a)} je Stunde |\n| nicht genutzte Inklusivstunden | verfallen am Monatsende | – |\n\n`;
    const cloud = (() => {
      const m = rng.int(4, 30), S = rng.int(12, 240) * 10 + rng.pick([0, 3, 7]), u = rng.int(5, 60);
      const A = { grund: rng.pick([4900, 7900, 9900, 14900, 19900]), vm: rng.pick([3900, 4500, 4900, 5500]), blk: rng.pick([450, 590, 690, 890]), user: rng.pick([300, 400, 500, 600]) };
      const B = { vm: A.vm + rng.pick([1000, 1500, 2000, 2500]), tb: rng.pick([2500, 3200, 3900, 4500]) };
      const bA = Math.ceil(S / 100), bB = Math.ceil(S / 1000);
      const cA = (mm: number) => A.grund + mm * A.vm + bA * A.blk + u * A.user;
      const cB = (mm: number) => mm * B.vm + bB * B.tb;
      return { m, S, u, A, B, bA, bB, cA, cB };
    })();
    const cloudTbl = (c: typeof cloud, withM = true) => `| | Anbieter A – CloudNord | Anbieter B – DataSky |\n|---|---|---|\n| Grundgebühr pro Monat | ${eur(c.A.grund)} | – |\n| je virtuelle Maschine (VM) pro Monat | ${eur(c.A.vm)} | ${eur(c.B.vm)} |\n| Speicher pro Monat | ${eur(c.A.blk)} je **angefangene 100 GB** | ${eur(c.B.tb)} je **angefangenes TB** (1 TB = 1.000 GB) |\n| Benutzerlizenz pro Monat | ${eur(c.A.user)} je Benutzer | inklusive |\n\nBedarf der Elektro Krämer GmbH: ${withM ? `**${c.m} VMs**, ` : ''}**${c.S.toLocaleString('de-DE')} GB** Speicher, **${c.u} Benutzer**.`;

    if (d === 1) {
      const p = serviceParams(rng);
      const h = rng.bool(0.3) ? rng.int(0, Math.max(0, p.h0 - 1)) : rng.int(p.h0 + 1, p.h0 + 14);
      const v = p.vert(h), e = p.einz(h);
      if (v === e) return tarif.make(rng, d);
      const better = v < e ? 'Servicevertrag' : 'Einzelabrechnung';
      return finishTable({
        id: gid('w.tarif'), generated: true, kind: 'table', skill: 'w.tarifvergleich', difficulty: d,
        prompt: servicePrompt(p) + `Im März fallen **${h} Technikerstunden** an. Berechne die Kosten beider Varianten für diesen Monat und gib die günstigere an.`,
        columns: [{ key: 'k', label: 'Kosten März (€)', type: 'number' }, { key: 't', label: 'Antwort', type: 'text' }],
        rows: [
          { label: 'Servicevertrag', cells: { k: { answer: cs(v) } } },
          { label: 'Einzelabrechnung', cells: { k: { answer: cs(e) } } },
          { label: 'günstigere Variante', cells: { t: { answer: better, accept: better === 'Servicevertrag' ? ['vertrag', 'servicevertrag basic', 'basic'] : ['einzel', 'einzelabrechnung', 'abrechnung nach aufwand'] } } },
        ],
        misconceptions: [
          { cell: '0:k', answer: cs(p.G + h * p.s), error: 'w-inklusivstunden', why: `Die ersten ${p.h0} Stunden sind in der Grundgebühr enthalten – nur die Stunden darüber kosten extra.` },
          ...(h < p.h0 ? [{ cell: '0:k', answer: cs(Math.round((p.G * h) / p.h0)), error: 'w-inklusivstunden-verfall', why: 'Nicht genutzte Inklusivstunden verfallen – die Grundgebühr ist trotzdem voll zu zahlen.' }] : []),
        ],
        hints: [`Vertrag: Grundgebühr + (Stunden − ${p.h0}) × Zusatzstundensatz, aber nie weniger als die Grundgebühr.`, 'Einzelabrechnung: Stunden × Stundensatz.'],
        explanation: `**Servicevertrag:** ${h <= p.h0 ? `${h} h ≤ ${p.h0} Inklusivstunden → nur die Grundgebühr: **${eur(v)}**` : `${eur(p.G)} + (${h} − ${p.h0}) × ${eur(p.s)} = **${eur(v)}**`}\n\n**Einzelabrechnung:** ${h} × ${eur(p.a)} = **${eur(e)}**\n\n→ In diesem Monat ist **${better}** um ${eur(Math.abs(v - e))} günstiger.${h < p.h0 ? ' Achtung: Die nicht genutzten Inklusivstunden verfallen – die Grundgebühr bleibt gleich.' : ''}`,
      });
    }
    if (d === 2) {
      const c = cloud;
      const kA = c.cA(c.m), kB = c.cB(c.m);
      if (kA === kB) return tarif.make(rng, d);
      const better = kA < kB ? 'A' : 'B';
      return finishTable({
        id: gid('w.tarif'), generated: true, kind: 'table', skill: 'w.tarifvergleich', difficulty: d,
        prompt: `Die Elektro Krämer GmbH will ihre Testserver in die Cloud verlagern. Zwei Angebote (alle Preise netto):\n\n${cloudTbl(c)}\n\nSpeicher wird je **angefangenem** Block abgerechnet (aufrunden!). Berechne die abgerechneten Speicherblöcke und die **monatlichen Kosten** beider Anbieter und gib den günstigeren Anbieter an (A oder B).`,
        columns: [{ key: 'b', label: 'Speicherblöcke (Anzahl)', type: 'number' }, { key: 'k', label: 'Kosten pro Monat (€)', type: 'number' }, { key: 't', label: 'Antwort', type: 'text' }],
        rows: [
          { label: 'Anbieter A (100-GB-Blöcke)', cells: { b: { answer: String(c.bA) }, k: { answer: cs(kA) } } },
          { label: 'Anbieter B (TB-Blöcke)', cells: { b: { answer: String(c.bB) }, k: { answer: cs(kB) } } },
          { label: 'günstigerer Anbieter', cells: { t: { answer: better, accept: [`anbieter ${better.toLowerCase()}`] } } },
        ],
        misconceptions: [
          { cell: '0:b', answer: String(c.S / 100), error: 'w-block-aufrunden', why: 'Abgerechnet wird je **angefangene** 100 GB – auf die nächste ganze Zahl aufrunden.' },
          { cell: '1:b', answer: String(c.S / 1000), error: 'w-block-aufrunden', why: 'Abgerechnet wird je **angefangenes** TB – auf die nächste ganze Zahl aufrunden.' },
          { cell: '1:b', answer: String(Math.floor(c.S / 1000)), error: 'w-block-aufrunden', why: 'Abgerundet: Auch ein angefangenes TB wird voll berechnet.' },
          { cell: '0:k', answer: cs(c.A.grund + c.m * c.A.vm + c.bA * c.A.blk), error: 'w-position-vergessen', why: 'Die Benutzerlizenzen bei Anbieter A fehlen.' },
        ],
        hints: [`Blöcke A: ${c.S.toLocaleString('de-DE')} GB ÷ 100 GB, aufrunden.`, 'Kosten = Grundgebühr + VMs × Preis + Blöcke × Preis + Benutzer × Preis.'],
        explanation: `**Anbieter A:** Blöcke: ${c.S.toLocaleString('de-DE')} ÷ 100 = ${deN(c.S / 100, 2)} → **${c.bA}** · Kosten: ${eur(c.A.grund)} + ${c.m} × ${eur(c.A.vm)} + ${c.bA} × ${eur(c.A.blk)} + ${c.u} × ${eur(c.A.user)} = **${eur(kA)}**\n\n**Anbieter B:** Blöcke: ${c.S.toLocaleString('de-DE')} ÷ 1.000 = ${deN(c.S / 1000, 3)} → **${c.bB}** · Kosten: ${c.m} × ${eur(c.B.vm)} + ${c.bB} × ${eur(c.B.tb)} = **${eur(kB)}**\n\n→ Anbieter **${better}** ist um ${eur(Math.abs(kA - kB))} pro Monat günstiger. Häufiger Fehler: angefangene Blöcke abrunden oder mit Kommazahlen rechnen.`,
      });
    }
    // d === 3: Break-even – Servicevertrag (Stunden) oder Cloud (VMs)
    if (rng.bool()) {
      const p = serviceParams(rng);
      const inside = p.G < p.h0 * p.a; // Break-even innerhalb der Inklusivstunden
      const x = inside ? p.G / p.a : (p.G - p.h0 * p.s) / (p.a - p.s);
      return {
        id: gid('w.tarif'), generated: true, kind: 'number', skill: 'w.tarifvergleich', difficulty: d,
        prompt: servicePrompt(p) + 'Ab wie vielen **ganzen Technikerstunden pro Monat** ist der Servicevertrag **günstiger** (nicht nur gleich teuer) als die Einzelabrechnung?',
        answer: p.hs, unit: 'h',
        misconceptions: cleanMc(p.hs, 0, [
          { answer: String(Math.floor(x)), error: 'w-break-even-runden', why: 'Beim Break-even sind beide gleich teuer bzw. der Vertrag noch teurer. Gefragt ist die erste ganze Stundenzahl, ab der der Vertrag **günstiger** ist.' },
          { answer: String(Math.ceil(p.G / p.a)), error: 'w-inklusivstunden', why: 'Nur Grundgebühr ÷ Stundensatz reicht nicht, wenn der Bedarf über den Inklusivstunden liegt – dann kosten die Zusatzstunden extra.' },
          { answer: String(p.h0), error: 'w-break-even', why: 'Die Zahl der Inklusivstunden ist nicht der Break-even. Setze beide Kostenfunktionen gleich.' },
        ]),
        hints: ['Stelle beide Kosten als Funktion der Stunden h auf.', inside ? 'Liegt der Schnittpunkt innerhalb der Inklusivstunden, gilt: Grundgebühr = h × Stundensatz Einzelabrechnung.' : 'Grundgebühr + (h − Inklusivstunden) × Zusatzsatz = h × Einzelsatz.'],
        explanation: `**Ergebnis: ab ${p.hs} Stunden.**\n\nKosten Vertrag K_V(h) = ${eur(p.G)} + (h − ${p.h0}) × ${eur(p.s)} (für h > ${p.h0}, sonst ${eur(p.G)})\n\nKosten Einzelabrechnung K_E(h) = h × ${eur(p.a)}\n\n` +
          (inside
            ? `Schon innerhalb der Inklusivstunden: ${eur(p.G)} = h × ${eur(p.a)} → h = ${deN(x, 2)}`
            : `${eur(p.G)} + (h − ${p.h0}) × ${eur(p.s)} = h × ${eur(p.a)} → h × (${eur(p.a)} − ${eur(p.s)}) = ${eur(p.G)} − ${p.h0} × ${eur(p.s)} → h = ${eur(p.G - p.h0 * p.s)} ÷ ${eur(p.a - p.s)} = ${deN(x, 2)}`) +
          `\n\nDie erste ganze Stundenzahl, ab der der Vertrag günstiger ist: **${p.hs} h** (Probe: K_V(${p.hs}) = ${eur(p.vert(p.hs))} < K_E(${p.hs}) = ${eur(p.einz(p.hs))}; bei ${p.hs - 1} h: ${eur(p.vert(p.hs - 1))} ≥ ${eur(p.einz(p.hs - 1))}).`,
      };
    }
    let c = cloud;
    let ms = -1;
    for (let t = 0; t < 300; t++) {
      if (t) {
        const S = rng.int(12, 240) * 10 + rng.pick([0, 3, 7]), u = rng.int(5, 60);
        const A = { grund: rng.pick([9900, 14900, 19900, 24900]), vm: rng.pick([3900, 4500, 4900, 5500]), blk: rng.pick([450, 590, 690, 890]), user: rng.pick([300, 400, 500, 600]) };
        const B = { vm: A.vm + rng.pick([1000, 1500, 2000, 2500]), tb: rng.pick([2500, 3200, 3900, 4500]) };
        const bA = Math.ceil(S / 100), bB = Math.ceil(S / 1000);
        c = { m: 0, S, u, A, B, bA, bB, cA: (mm: number) => A.grund + mm * A.vm + bA * A.blk + u * A.user, cB: (mm: number) => mm * B.vm + bB * B.tb };
      }
      ms = -1;
      for (let m = 1; m <= 200; m++) if (c.cA(m) < c.cB(m)) { ms = m; break; }
      if (ms >= 4 && ms <= 60) break;
    }
    const fA = c.cA(0), fB = c.cB(0), dv = c.B.vm - c.A.vm;
    const x = (fA - fB) / dv;
    return {
      id: gid('w.tarif'), generated: true, kind: 'number', skill: 'w.tarifvergleich', difficulty: d,
      prompt: `Die Elektro Krämer GmbH plant, Server schrittweise in die Cloud zu verlagern. Zwei Angebote (alle Preise netto):\n\n${cloudTbl(c, false)}\n\nSpeicher und Benutzer bleiben gleich, nur die Zahl der VMs wächst. Ab wie vielen **VMs** ist Anbieter A **günstiger** (nicht nur gleich teuer) als Anbieter B? (Speicherblöcke aufrunden)`,
      answer: ms, unit: 'VMs',
      misconceptions: cleanMc(ms, 0, [
        { answer: String(Math.floor(x)), error: 'w-break-even-runden', why: 'Bei dieser VM-Zahl ist A noch nicht günstiger. Gefragt ist die erste ganze Zahl **über** dem Schnittpunkt.' },
        { answer: String(Math.floor((fA - c.S / 1000 * c.B.tb) / dv) + 1), error: 'w-block-aufrunden', why: 'Speicher wird je **angefangenem** Block berechnet – vorher aufrunden.' },
      ]),
      hints: ['Fixkosten je Anbieter: alles außer den VMs (Grundgebühr, Speicherblöcke, Benutzer).', 'Break-even: Fixkosten A + x · VM-Preis A = Fixkosten B + x · VM-Preis B.'],
      explanation: `**Ergebnis: ab ${ms} VMs.**\n\nFixkosten pro Monat (ohne VMs):\n- A: ${eur(c.A.grund)} + ${c.bA} × ${eur(c.A.blk)} (${c.S.toLocaleString('de-DE')} GB → ${c.bA} angefangene 100-GB-Blöcke) + ${c.u} × ${eur(c.A.user)} = **${eur(fA)}**\n- B: ${c.bB} × ${eur(c.B.tb)} (${c.bB} angefangene${c.bB === 1 ? "s" : ""} TB) = **${eur(fB)}**\n\nBreak-even: ${eur(fA)} + x · ${eur(c.A.vm)} = ${eur(fB)} + x · ${eur(c.B.vm)} → x = (${eur(fA)} − ${eur(fB)}) ÷ (${eur(c.B.vm)} − ${eur(c.A.vm)}) = ${deN(x, 2)}\n\nAb **${ms} VMs** ist A günstiger (Probe: A ${eur(c.cA(ms))} < B ${eur(c.cB(ms))}; bei ${ms - 1} VMs: A ${eur(c.cA(ms - 1))} ≥ B ${eur(c.cB(ms - 1))}). Dahinter steckt: A hat höhere Fixkosten, aber den niedrigeren Preis je VM.`,
    };
  },
};

/* ------------------------------------------------------------------ */
/* w03: Return on Investment (ROI)                                     */
/* ------------------------------------------------------------------ */

const ROI_GEWINN = '**ROI = (Summe der Rückflüsse − Investition) ÷ Investition × 100 %**';
const ROI_BUCH = '**ROI = Summe der Rückflüsse ÷ Investition** (als Faktor; größer als 1 bedeutet: die Investition hat sich gelohnt)';

const roi: GeneratorMeta = {
  id: 'w.roi',
  title: 'ROI und Amortisation berechnen',
  skill: 'w.roi',
  module: 'w03',
  make(rng, d) {
    const what = rng.pick(['ein Ticketsystem mit Self-Service-Portal', 'ein Dokumentenmanagementsystem', 'eine Software-Verteilung für alle Clients', 'eine VoIP-Telefonanlage']);
    const nd = rng.pick([3, 4, 5]);
    if (d === 1) {
      const inv = rng.int(20, 200) * 100000;
      const e = Math.round((inv * rng.int(25, 60)) / 100 / 100000) * 100000 + rng.pick([0, 50000]);
      const R = e * nd;
      const ans = pq(R - inv, inv);
      return {
        id: gid('w.roi'), generated: true, kind: 'number', skill: 'w.roi', difficulty: d,
        prompt: `Die Elektro Krämer GmbH investiert **${eur(inv)}** in ${what}. Dadurch spart sie jedes Jahr **${eur(e)}** (Rückfluss). Die Nutzungsdauer beträgt **${nd} Jahre**.\n\nBerechne den ROI über die Nutzungsdauer mit der Formel ${ROI_GEWINN} (zwei Nachkommastellen).`,
        answer: ans, tolerance: 0.01, unit: '%',
        misconceptions: cleanMc(ans, 0.01, [
          { answer: String(pq(R, inv)), error: 'w-roi-definition', why: 'Du hast Rückflüsse ÷ Investition gerechnet. Laut vorgegebener Formel wird vorher die Investition abgezogen (Gewinn ÷ Investition).' },
          { answer: String(pq(e - inv, inv)), error: 'w-laufzeit', why: 'Die Rückflüsse fallen in **jedem** Jahr der Nutzungsdauer an: jährlicher Rückfluss × Jahre.' },
          { answer: String(pq(R - inv, R)), error: 'w-prozent-bezugsgroesse', why: 'Grundwert ist die **Investition**, nicht die Summe der Rückflüsse.' },
        ]),
        hints: ['Rückflüsse gesamt = jährliche Einsparung × Nutzungsdauer.', 'Gewinn = Rückflüsse − Investition; ROI = Gewinn ÷ Investition × 100.'],
        explanation: `**Ergebnis: ${deN(ans, 2)} %.**\n\n1. Rückflüsse gesamt: ${eur(e)} × ${nd} = ${eur(R)}\n2. Gewinn aus der Investition: ${eur(R)} − ${eur(inv)} = ${eur(R - inv)}\n3. ROI = ${eur(R - inv)} ÷ ${eur(inv)} × 100 = **${deN(ans, 2)} %**\n\nManche Schulbücher rechnen ROI = Rückflüsse ÷ Investition = ${deN(qn(R, inv), 2)} (Faktor). Beides beschreibt dasselbe; in der Prüfung gilt immer die Formel aus der Aufgabe.`,
      };
    }
    // d2/d3: Tabelle mit Rückflüssen, ROI (Faktor bzw. %) und Amortisation
    let inv: number, save: number, cost: number, invTxt: string, saveTxt: string;
    let invExpl = '', wrongNet = 0;
    if (d === 2) {
      inv = rng.int(30, 150) * 100000;
      save = rng.int(15, 60) * 100000;
      cost = rng.int(2, 10) * 100000;
      invTxt = `Investition: **${eur(inv)}**`;
      saveTxt = `jährliche Einsparungen **${eur(save)}**, neue laufende Kosten (Wartung, Lizenzen) **${eur(cost)} pro Jahr**`;
    } else {
      const hw = rng.int(20, 90) * 100000, hb = rng.int(20, 80), sb = rng.pick([9500, 11000, 12000]), sch = rng.int(2, 8) * 100000;
      const hS = rng.int(30, 120), sat = rng.pick([4500, 5200, 5800]), wart = rng.int(3, 12) * 100000, lic = rng.int(2, 9) * 100000;
      inv = hw + hb * sb + sch;
      save = hS * 12 * sat + wart;
      cost = lic;
      wrongNet = hS * sat + wart - lic;
      invExpl = `Investition: ${eur(hw)} + ${hb} h × ${eur(sb)} (${eur(hb * sb)}) + ${eur(sch)} = **${eur(inv)}**\n\nEinsparung pro Jahr: ${hS} h × 12 × ${eur(sat)} (${eur(hS * 12 * sat)}) + ${eur(wart)} = ${eur(save)}\n\n`;
      invTxt = `| Investition | Betrag |\n|---|---:|\n| Hard- und Software | ${eur(hw)} |\n| Einrichtung und Beratung durch das Systemhaus | ${hb} h × ${eur(sb)} |\n| Schulung der Mitarbeitenden | ${eur(sch)} |`;
      saveTxt = `| Jährliche Wirkung | Betrag |\n|---|---:|\n| eingesparte Arbeitszeit | ${hS} h pro Monat × ${eur(sat)} (interner Stundensatz) |\n| entfallender Wartungsvertrag der Altanlage | ${eur(wart)} pro Jahr |\n| neue Lizenz- und Supportkosten | − ${eur(lic)} pro Jahr |`;
    }
    const net = save - cost;
    if (net <= 0) return roi.make(rng, d);
    const R = net * nd;
    const fac = qn(R, inv);
    const rp = pq(R - inv, inv);
    const am = qn(inv * 12, net, 1);
    const rows: Row[] = [
      ...(d === 3 ? [{ label: 'Investition gesamt (€)', v: inv }] : []),
      { label: 'jährlicher Rückfluss netto (€)', v: net },
      { label: `Rückflüsse über ${nd} Jahre (€)`, v: R },
      d === 2 ? { label: 'ROI als Faktor (zwei Nachkommastellen)', v: fac, n: 2 } : { label: 'ROI in % (zwei Nachkommastellen)', v: rp, n: 2 },
      { label: 'Amortisationsdauer in Monaten (eine Nachkommastelle)', v: am, n: 1 },
    ];
    const iR = rows.length - 2, iA = rows.length - 1;
    return finishTable({
      id: gid('w.roi'), generated: true, kind: 'table', skill: 'w.roi', difficulty: d,
      prompt: `Die Elektro Krämer GmbH prüft eine Investition in ${what} (Nutzungsdauer **${nd} Jahre**, alle Beträge netto).\n\n${d === 3 ? `${invTxt}\n\n${saveTxt}` : `${invTxt}; ${saveTxt}.`}\n\nFormeln: ${d === 2 ? ROI_BUCH : ROI_GEWINN} · **Amortisationsdauer (Monate) = Investition ÷ monatlicher Rückfluss** (monatlicher Rückfluss = jährlicher Rückfluss ÷ 12).\n\nVervollständige die Tabelle.`,
      columns: [{ key: 'v', label: 'Wert', type: 'number' }],
      rows: valueRows(rows),
      misconceptions: [
        { cell: `${d === 3 ? 1 : 0}:v`, answer: cs(save), error: 'w-kosten-unvollstaendig', why: 'Neue laufende Kosten verringern den Rückfluss: Einsparungen − neue Kosten.' },
        ...(d === 3 ? [{ cell: '1:v', answer: cs(wrongNet), error: 'w-einheit-zeit', why: 'Die Arbeitszeitersparnis ist pro **Monat** angegeben – mal 12 für das Jahr.' }] : []),
        { cell: `${iR}:v`, answer: String(pq(R, inv)), error: 'w-roi-definition', why: d === 2 ? 'Laut Formel ist der ROI hier ein **Faktor** (z. B. 1,85), keine Prozentzahl.' : 'Laut Formel wird die Investition vorher von den Rückflüssen abgezogen.' },
        { cell: `${iA}:v`, answer: String(qn(inv, net, 1)), error: 'w-einheit-zeit', why: 'Das ist die Amortisationsdauer in **Jahren**. Gefragt sind Monate.' },
      ],
      hints: ['Rückfluss netto = Einsparungen − neue laufende Kosten.', 'Amortisationsdauer = Investition ÷ (jährlicher Rückfluss ÷ 12).'],
      explanation: `${invExpl}1. Jährlicher Rückfluss: ${eur(save)} − ${eur(cost)} = **${eur(net)}**\n2. Rückflüsse über ${nd} Jahre: ${eur(net)} × ${nd} = **${eur(R)}**\n3. ${d === 2 ? `ROI (Faktor) = ${eur(R)} ÷ ${eur(inv)} = **${deN(fac, 2)}**` : `ROI = (${eur(R)} − ${eur(inv)}) ÷ ${eur(inv)} × 100 = **${deN(rp, 2)} %**`}\n4. Amortisationsdauer: ${eur(inv)} ÷ (${eur(net)} ÷ 12) = **${deN(am, 1)} Monate** (≈ ${deN(am / 12, 1)} Jahre)\n\nBewertung: ${R > inv ? `Die Investition hat sich innerhalb der Nutzungsdauer amortisiert (${deN(am, 1)} Monate < ${nd * 12} Monate).` : 'Die Rückflüsse decken die Investition innerhalb der Nutzungsdauer nicht – rein wirtschaftlich lohnt sie sich nicht.'}`,
    });
  },
};

/* ------------------------------------------------------------------ */
/* w03: Prozentvergleiche und KPI-Veränderungen                        */
/* ------------------------------------------------------------------ */

const KPI1 = [
  { n: 'Anzahl der Störungstickets im Quartal', u: 'Tickets', f: 0, lo: 180, hi: 900 },
  { n: 'durchschnittliche Lösungszeit eines Tickets', u: 'h', f: 1, lo: 20, hi: 160 },
  { n: 'gedruckte Seiten pro Monat in der Verwaltung', u: 'Seiten', f: 0, lo: 8000, hi: 40000 },
  { n: 'Stromkosten des Serverraums pro Quartal', u: '€', f: 2, lo: 120000, hi: 600000 },
];

const veraenderung: GeneratorMeta = {
  id: 'w.veraenderung',
  title: 'Prozentuale Veränderung und Unterschiede (Bezugsgröße)',
  skill: 'w.prozentvergleich',
  module: 'w03',
  make(rng, d) {
    if (d === 1) {
      const k = rng.pick(KPI1);
      const v = rng.int(k.lo, k.hi);
      let a = v;
      while (a === v || Math.abs(a - v) < v * 0.03) a = Math.round(v * (1 + (rng.pick([-1, 1]) * rng.int(4, 45)) / 100));
      const sc = 10 ** k.f;
      const fmt = (x: number) => `${deN(x / sc, k.f)} ${k.u}`;
      const ans = pq(a - v, v, 1);
      return {
        id: gid('w.veraenderung'), generated: true, kind: 'number', skill: 'w.prozentvergleich', difficulty: d,
        prompt: `Kennzahl der IT-Abteilung der Elektro Krämer GmbH: **${k.n}**\n\n| Vorjahr | aktuelles Jahr |\n|---|---|\n| ${fmt(v)} | ${fmt(a)} |\n\nUm wie viel **Prozent** hat sich die Kennzahl gegenüber dem Vorjahr verändert? Gib das Ergebnis **mit Vorzeichen** (Zunahme +, Abnahme -) auf eine Nachkommastelle an. Bezugsgröße ist der Vorjahreswert.`,
        answer: ans, tolerance: 0.05, unit: '%',
        misconceptions: cleanMc(ans, 0.05, [
          { answer: String(pq(a - v, a, 1)), error: 'w-prozent-bezugsgroesse', why: 'Falsche Bezugsgröße: Die Veränderung wird auf den **Ausgangswert** (Vorjahr) bezogen, nicht auf den neuen Wert.' },
          { answer: String(-ans), error: 'w-vorzeichen', why: 'Vorzeichen prüfen: Ist der neue Wert kleiner als der alte, ist die Veränderung negativ (Abnahme).' },
          { answer: String(pq(a, v, 1)), error: 'w-prozent-veraenderung', why: 'Das ist der neue Wert in Prozent des alten. Die Veränderung ist dieser Wert minus 100 %.' },
        ]),
        hints: ['Veränderung = (neuer Wert − alter Wert) ÷ alter Wert × 100.', 'Wird der Wert kleiner, ist das Ergebnis negativ.'],
        explanation: `**Ergebnis: ${sgn(ans)} %.**\n\n(${fmt(a)} − ${fmt(v)}) ÷ ${fmt(v)} × 100 = ${sgn((a - v) / sc, k.f)} ÷ ${deN(v / sc, k.f)} × 100 = **${sgn(ans)} %**\n\nHäufiger Fehler: durch den neuen Wert teilen. Grundwert (100 %) ist immer der Ausgangswert.`,
      };
    }
    if (d === 2) {
      const pA = rng.int(80, 600) * 1000 + rng.pick([0, 500, 900]);
      const b = Math.round(pA - (rng.int(3, 25) * pA) / 100) - rng.pick([0, 300, 700]);
      const cheaper = rng.bool();
      const ans = cheaper ? pq(pA - b, pA) : pq(pA - b, b);
      return {
        id: gid('w.veraenderung'), generated: true, kind: 'number', skill: 'w.prozentvergleich', difficulty: d,
        prompt: `Für die neue WLAN-Ausleuchtung liegen zwei Angebote vor (Bezugspreise netto): **Angebot A ${eur(pA)}**, **Angebot B ${eur(b)}**.\n\n${cheaper ? '**Um wie viel Prozent ist Angebot B günstiger als Angebot A?**' : '**Um wie viel Prozent ist Angebot A teurer als Angebot B?**'} (zwei Nachkommastellen)`,
        answer: ans, tolerance: 0.01, unit: '%',
        misconceptions: cleanMc(ans, 0.01, [
          { answer: String(cheaper ? pq(pA - b, b) : pq(pA - b, pA)), error: 'w-prozent-bezugsgroesse', why: cheaper ? '„B ist günstiger **als A**“ – Bezugsgröße (100 %) ist das Vergleichsobjekt A, also der teurere Preis.' : '„A ist teurer **als B**“ – Bezugsgröße (100 %) ist das Vergleichsobjekt B, also der günstigere Preis.' },
          { answer: cs(pA - b), error: 'w-euro-statt-prozent', why: 'Das ist der Unterschied in Euro. Gefragt ist der Unterschied in Prozent.' },
        ]),
        hints: ['Was steht nach dem Wort „als“? Das ist die Bezugsgröße (100 %).', 'Unterschied in % = Differenz ÷ Bezugsgröße × 100.'],
        explanation: `**Ergebnis: ${deN(ans, 2)} %.**\n\nDifferenz: ${eur(pA)} − ${eur(b)} = ${eur(pA - b)}\n\n${cheaper ? `Bezugsgröße ist **A** (${eur(pA)}): ${eur(pA - b)} ÷ ${eur(pA)} × 100 = **${deN(ans, 2)} %**` : `Bezugsgröße ist **B** (${eur(b)}): ${eur(pA - b)} ÷ ${eur(b)} × 100 = **${deN(ans, 2)} %**`}\n\nDieselbe Differenz ergibt je nach Bezugsgröße zwei verschiedene Prozentwerte (${deN(pq(pA - b, pA), 2)} % bzw. ${deN(pq(pA - b, b), 2)} %). Deshalb in jeder Antwort die Bezugsgröße nennen.`,
      };
    }
    // d === 3: KPI-Tabelle mit Schulnote und Prozentpunkten (Werte in Zehnteln)
    const fl = rng.int(550, 850), fl2 = fl + rng.pick([-1, 1]) * rng.int(25, 120);
    const wo = rng.int(40, 140), wo2 = wo + rng.pick([-1, 1]) * rng.int(8, 40);
    const zn = rng.int(18, 34), zn2 = zn + rng.pick([-1, 1]) * rng.int(2, 7);
    const lz = rng.int(60, 240), lz2 = lz + rng.pick([-1, 1]) * rng.int(10, 60);
    const items = [
      { n: 'Erstlösungsquote (%)', v: fl, a: fl2, up: true },
      { n: 'Quote wieder geöffneter Tickets (%)', v: wo, a: wo2, up: false },
      { n: 'Kundenzufriedenheit (Schulnote 1–6)', v: zn, a: zn2, up: false },
      { n: 'mittlere Lösungszeit (h)', v: lz, a: lz2, up: false },
    ];
    const ch = items.map((it) => pq(it.a - it.v, it.v, 1));
    const ev = items.map((it) => ((it.a > it.v) === it.up ? 'besser' : 'schlechter'));
    const acc = (e: string) => (e === 'besser' ? ['verbessert', 'verbesserung', 'positiv'] : ['verschlechtert', 'verschlechterung', 'negativ']);
    const pp = (fl2 - fl) / 10;
    const rows = [
      ...items.map((it, i) => ({ label: it.n, cells: { v: { answer: String(ch[i]), accept: near(ch[i], 1) }, b: { answer: ev[i], accept: acc(ev[i]) } } })),
      { label: 'Erstlösungsquote: Veränderung in Prozentpunkten', cells: { v: { answer: String(pp) } } },
    ];
    return finishTable({
      id: gid('w.veraenderung'), generated: true, kind: 'table', skill: 'w.prozentvergleich', difficulty: d,
      prompt: `Auswertung des IT-Servicedesks der Elektro Krämer GmbH:\n\n| Kennzahl | Vorjahr | aktuelles Jahr |\n|---|---|---|\n${items.map((it) => `| ${it.n} | ${de1(it.v / 10)} | ${de1(it.a / 10)} |`).join('\n')}\n\nBerechne für jede Kennzahl die **relative Veränderung in %** gegenüber dem Vorjahr (mit Vorzeichen, Minus als - eingeben, eine Nachkommastelle) und bewerte sie mit **besser** oder **schlechter**. Gib zusätzlich die Veränderung der Erstlösungsquote in **Prozentpunkten** an.`,
      columns: [{ key: 'v', label: 'Veränderung', type: 'number' }, { key: 'b', label: 'Bewertung', type: 'text' }],
      rows,
      misconceptions: [
        { cell: '0:v', answer: String(pp), error: 'w-prozentpunkte', why: 'Das ist die Differenz in **Prozentpunkten**. Gefragt ist die relative Veränderung: Differenz ÷ Vorjahreswert × 100.' },
        { cell: '1:v', answer: String((wo2 - wo) / 10), error: 'w-prozentpunkte', why: 'Das ist die Differenz in **Prozentpunkten**. Gefragt ist die relative Veränderung in %.' },
        { cell: '4:v', answer: String(ch[0]), error: 'w-prozentpunkte', why: 'Prozentpunkte sind die einfache Differenz zweier Prozentwerte, keine relative Veränderung.' },
        { cell: '2:b', answer: ev[2] === 'besser' ? 'schlechter' : 'besser', error: 'w-schulnote', why: 'Bei Schulnoten ist ein **kleinerer** Wert besser: Sinkt die Note, hat sich die Zufriedenheit verbessert.' },
      ],
      hints: ['Relative Veränderung = (neu − alt) ÷ alt × 100.', 'Bei Schulnoten, Lösungszeit und Wiedereröffnungen gilt: weniger ist besser.'],
      explanation: items.map((it, i) => `**${it.n}:** (${de1(it.a / 10)} − ${de1(it.v / 10)}) ÷ ${de1(it.v / 10)} × 100 = **${sgn(ch[i])} %** → **${ev[i]}**`).join('\n\n') +
        `\n\n**Prozentpunkte:** ${de1(fl2 / 10)} % − ${de1(fl / 10)} % = **${sgn(pp)} Prozentpunkte** (die relative Veränderung beträgt ${sgn(ch[0])} %).\n\nHäufige Fehler: Prozentpunkte und Prozent verwechseln; bei der Schulnote „gesunken = schlechter“ annehmen.`,
    });
  },
};

/* ------------------------------------------------------------------ */
/* w03: Eigenerstellung oder Fremdbezug (Make or Buy)                  */
/* ------------------------------------------------------------------ */

/** p = Fremdbezugspreis, diff = p − variable Kosten (Cent), x = kritische Menge (ganzzahlig für d1) */
const MOB = [
  { n: 'Patchkabel (Cat 6A, 3 m)', u: 'Kabel', fixTxt: 'Crimpzange, Kabeltester und Einweisung', fixItems: ['Crimpzange und Abisolierwerkzeug', 'Kabeltester', 'Einweisung der Azubis'], p: () => 0, pr: [690, 1290], diffs: [150, 200, 250, 300, 350, 400], xr: [10, 60], xs: 20, mat: [180, 320], min: [4, 8] },
  { n: 'vorinstallierte Arbeitsplatz-PCs (Montage + Image)', u: 'PCs', fixTxt: 'Montagearbeitsplatz und Deployment-Server', fixItems: ['Montagearbeitsplatz mit ESD-Ausstattung', 'Deployment-Server für Images', 'Schulung Deployment-Software'], p: () => 0, pr: [749, 999], diffs: [2500, 3000, 4000, 5000, 6000], xr: [4, 30], xs: 5, mat: [62000, 78000], min: [45, 90] },
  { n: 'Wandhalterungen für Access Points (3D-Druck)', u: 'Halterungen', fixTxt: '3D-Drucker und Konstruktion', fixItems: ['3D-Drucker', 'Konstruktion der Halterung (CAD)', 'Probedrucke'], p: () => 0, pr: [149, 299], diffs: [400, 500, 600, 700, 800, 900], xr: [10, 60], xs: 10, mat: [250, 600], min: [3, 6] },
] as const;

const makeOrBuy: GeneratorMeta = {
  id: 'w.makeorbuy',
  title: 'Eigenerstellung oder Fremdbezug (kritische Menge)',
  skill: 'w.amortisation',
  module: 'w03',
  make(rng, d) {
    const pr = rng.pick([...MOB]);
    const intro = `Das IT-Systemhaus überlegt, **${pr.n}** künftig selbst herzustellen (Eigenerstellung), statt sie fertig beim Distributor zu kaufen (Fremdbezug).`;
    if (d === 1 || d === 2) {
      const diff = rng.pick([...pr.diffs]);
      const x = rng.int(pr.xr[0], pr.xr[1]) * pr.xs;
      const fix = x * diff;
      // Fremdpreis in Cent; für PCs/Halterungen ganze bzw. 10-Cent-Beträge
      const p = pr.u === 'PCs' ? rng.int(pr.pr[0], pr.pr[1]) * 100 : pr.u === 'Kabel' ? rng.int(pr.pr[0] / 10, pr.pr[1] / 10) * 10 : rng.int(pr.pr[0], pr.pr[1]) * 10;
      const v = p - diff;
      const tbl = `| | Eigenerstellung | Fremdbezug |\n|---|---|---|\n| Fixkosten (${pr.fixTxt}) | ${eur(fix)} | – |\n| Kosten je Stück | ${eur(v)} (Material und Arbeitszeit) | ${eur(p)} (Einkaufspreis) |`;
      if (d === 1) {
        return {
          id: gid('w.makeorbuy'), generated: true, kind: 'number', skill: 'w.amortisation', difficulty: d,
          prompt: `${intro}\n\n${tbl}\n\nBei welcher Menge (**kritische Menge**) sind beide Varianten **gleich teuer**? Gib die Stückzahl an.`,
          answer: x, unit: pr.u,
          misconceptions: cleanMc(x, 0, [
            { answer: String(qn(fix, p)), error: 'w-kritische-menge', why: 'Durch den Fremdbezugspreis allein geteilt. Jedes selbst hergestellte Stück spart nur die **Differenz** aus Fremdpreis und variablen Kosten.' },
            { answer: String(qn(fix, v)), error: 'w-kritische-menge', why: 'Durch die variablen Kosten geteilt. Die Fixkosten werden durch die **Ersparnis je Stück** (Fremdpreis − variable Kosten) gedeckt.' },
          ]),
          hints: ['Ansatz: Fixkosten + x · variable Kosten = x · Fremdpreis.', 'x = Fixkosten ÷ (Fremdpreis − variable Kosten).'],
          explanation: `**Ergebnis: ${x} ${pr.u}.**\n\nAnsatz: ${eur(fix)} + x · ${eur(v)} = x · ${eur(p)}\n\nx = ${eur(fix)} ÷ (${eur(p)} − ${eur(v)}) = ${eur(fix)} ÷ ${eur(diff)} = **${x}**\n\nProbe: Eigenerstellung ${eur(fix)} + ${x} × ${eur(v)} = ${eur(fix + x * v)}; Fremdbezug ${x} × ${eur(p)} = ${eur(x * p)} ✔\n\nUnterhalb dieser Menge ist der Fremdbezug günstiger, darüber die Eigenerstellung.\n\nHäufiger Fehler: die Fixkosten durch den Fremdpreis teilen statt durch die Ersparnis je Stück.`,
        };
      }
      let m = x;
      while (Math.abs(m - x) < x * 0.2) m = Math.max(1, Math.round(x * (rng.bool() ? rng.int(30, 75) : rng.int(130, 220)) / 100));
      const e = fix + m * v, f = m * p;
      const better = e < f ? 'Eigenerstellung' : 'Fremdbezug';
      return finishTable({
        id: gid('w.makeorbuy'), generated: true, kind: 'table', skill: 'w.amortisation', difficulty: d,
        prompt: `${intro}\n\n${tbl}\n\nIm nächsten Jahr werden **${m} ${pr.u}** benötigt. Berechne die Gesamtkosten beider Varianten (auf Cent) und entscheide.`,
        columns: [{ key: 'k', label: 'Gesamtkosten (€)', type: 'number' }, { key: 't', label: 'Antwort', type: 'text' }],
        rows: [
          { label: 'Eigenerstellung', cells: { k: { answer: cs(e) } } },
          { label: 'Fremdbezug', cells: { k: { answer: cs(f) } } },
          { label: 'günstigere Variante', cells: { t: { answer: better, accept: better === 'Eigenerstellung' ? ['eigenfertigung', 'selbst herstellen', 'make'] : ['fremdbezug', 'kauf', 'zukauf', 'buy'] } } },
        ],
        misconceptions: [
          { cell: '0:k', answer: cs(m * v), error: 'w-fixkosten-vergessen', why: `Die Fixkosten (${eur(fix)}) fallen bei der Eigenerstellung zusätzlich an.` },
        ],
        hints: ['Eigenerstellung = Fixkosten + Menge × variable Kosten.', 'Fremdbezug = Menge × Einkaufspreis.'],
        explanation: `**Ergebnis: ${better} ist um ${eur(Math.abs(e - f))} günstiger.**\n\nEigenerstellung: ${eur(fix)} + ${m} × ${eur(v)} = **${eur(e)}**\n\nFremdbezug: ${m} × ${eur(p)} = **${eur(f)}**\n\nKontrolle über die kritische Menge: ${eur(fix)} ÷ ${eur(diff)} = ${x} ${pr.u}. Der Bedarf von ${m} liegt ${m > x ? 'darüber → Eigenerstellung' : 'darunter → Fremdbezug'}.\n\nHäufiger Fehler: die Fixkosten der Eigenerstellung weglassen.`,
      });
    }
    // d === 3: Fixkosten aus Positionen, variable Kosten aus Material + Arbeitszeit, kritische Menge nicht ganzzahlig
    const rate = rng.pick([4200, 4800, 5400, 6000]);
    const mat = rng.int(pr.mat[0], pr.mat[1]) * (pr.u === 'PCs' ? 1 : 1);
    const mn = rng.int(pr.min[0], pr.min[1]);
    const lab = (mn * rate) / 60;
    const v = mat + lab;
    const diff = rng.pick([...pr.diffs]) + rng.int(1, 9) * (pr.u === 'PCs' ? 100 : 10);
    const p = v + diff;
    const target = rng.int(pr.xr[0], pr.xr[1]) * pr.xs;
    const parts = [0.5, 0.3, 0.2].map((s) => Math.round((target * diff * s) / 1000) * 1000);
    const fix = parts.reduce((a, b) => a + b, 0);
    const x = qn(fix, diff);
    const ms = Math.floor(fix / diff) + 1;
    let m = ms;
    while (Math.abs(m - ms) < ms * 0.2) m = Math.max(1, Math.round(ms * (rng.bool() ? rng.int(40, 75) : rng.int(130, 200)) / 100));
    const better = m >= ms ? 'Eigenerstellung' : 'Fremdbezug';
    return finishTable({
      id: gid('w.makeorbuy'), generated: true, kind: 'table', skill: 'w.amortisation', difficulty: d,
      prompt: `${intro}\n\n**Eigenerstellung – einmalige Fixkosten:**\n\n| Position | Betrag |\n|---|---|\n${pr.fixItems.map((t, i) => `| ${t} | ${eur(parts[i])} |`).join('\n')}\n\n**Eigenerstellung – je Stück:** Material ${eur(mat)}, Arbeitszeit **${mn} Minuten** zu einem Stundensatz von ${eur(rate)}.\n\n**Fremdbezug:** ${eur(p)} je Stück.\n\nBerechne die Fixkosten, die variablen Kosten je Stück und die kritische Menge (zwei Nachkommastellen). Gib an, ab welcher **ganzen Stückzahl** die Eigenerstellung **günstiger** (nicht nur gleich teuer) ist, und entscheide für einen Jahresbedarf von **${m} ${pr.u}**.`,
      columns: [{ key: 'v', label: 'Wert', type: 'number' }, { key: 't', label: 'Antwort', type: 'text' }],
      rows: [
        { label: 'Fixkosten gesamt (€)', cells: { v: { answer: cs(fix) } } },
        { label: 'variable Kosten je Stück (€)', cells: { v: { answer: cs(v), accept: acceptCent(v) } } },
        { label: 'kritische Menge (Stück)', cells: { v: { answer: String(x), accept: near(x) } } },
        { label: 'Eigenerstellung günstiger ab (Stück)', cells: { v: { answer: String(ms) } } },
        { label: `Entscheidung bei ${m} ${pr.u}`, cells: { t: { answer: better, accept: better === 'Eigenerstellung' ? ['eigenfertigung', 'selbst herstellen', 'make'] : ['fremdbezug', 'kauf', 'zukauf', 'buy'] } } },
      ],
      misconceptions: [
        { cell: '1:v', answer: cs(mat), error: 'w-variable-kosten-unvollstaendig', why: `Die Arbeitszeit gehört zu den variablen Kosten: ${mn} min × ${eur(rate)} ÷ 60 = ${eur(lab)} je Stück.` },
        { cell: '2:v', answer: String(qn(fix, p)), error: 'w-kritische-menge', why: 'Die Fixkosten werden durch die **Ersparnis je Stück** (Fremdpreis − variable Kosten) geteilt, nicht durch den Fremdpreis.' },
        ...(Number.isInteger(fix / diff) ? [] : [{ cell: '3:v', answer: String(Math.floor(fix / diff)), error: 'w-break-even-runden', why: 'Bei dieser Stückzahl ist die Eigenerstellung noch teurer. Die kritische Menge wird hier **aufgerundet**.' }]),
      ],
      hints: [`Arbeitskosten je Stück = ${mn} min × Stundensatz ÷ 60.`, 'Kritische Menge = Fixkosten ÷ (Fremdpreis − variable Kosten).'],
      explanation: `**Ergebnis: Eigenerstellung lohnt sich ab ${ms} ${pr.u}; bei ${m} ${pr.u} → ${better}.**\n\n1. Fixkosten: ${parts.map(eur).join(' + ')} = **${eur(fix)}**\n2. Variable Kosten: ${eur(mat)} Material + ${mn} min × ${eur(rate)} ÷ 60 (${eur(lab)}) = **${eur(v)}**\n3. Ersparnis je Stück: ${eur(p)} − ${eur(v)} = ${eur(diff)}\n4. Kritische Menge: ${eur(fix)} ÷ ${eur(diff)} = **${deN(x, 2)}** → ab **${ms}** Stück ist die Eigenerstellung günstiger\n5. Bedarf ${m}: Eigenerstellung ${eur(fix + m * v)}, Fremdbezug ${eur(m * p)} → **${better}**\n\nHäufige Fehler: die Arbeitszeit bei den variablen Kosten vergessen; die kritische Menge abrunden. Neben den Kosten zählen auch Qualität, Know-how und Abhängigkeit vom Lieferanten.`,
    });
  },
};

/* ------------------------------------------------------------------ */
/* w03: Soll-Ist-Vergleich (Kostenabweichung)                          */
/* ------------------------------------------------------------------ */

const SOLLIST = ['Hardware', 'Lizenzen', 'Dienstleistung extern', 'eigene Arbeitsstunden', 'Schulung', 'Verkabelung', 'Reisekosten'];

const sollIst: GeneratorMeta = {
  id: 'w.sollist',
  title: 'Soll-Ist-Vergleich: Kostenabweichung absolut und in Prozent',
  skill: 'w.prozentvergleich',
  module: 'w03',
  make(rng, d) {
    const n = d === 1 ? 1 : d === 2 ? 3 : 4;
    const names = rng.shuffle([...SOLLIST]).slice(0, n);
    const items = names.map((nm) => {
      const soll = rng.int(8, 160) * 10000;
      let ist = soll;
      while (ist === soll) ist = soll + rng.pick([-1, 1, 1]) * rng.int(2, 30) * soll / 100 + rng.pick([0, 2500, 4900]);
      ist = Math.round(ist / 100) * 100;
      return { nm, soll, ist, ab: ist - soll, pc: pq(ist - soll, soll) };
    }).filter((it) => it.ab !== 0);
    if (items.length < n) return sollIst.make(rng, d);
    const tbl = `| Kostenposition | Soll (Plan) | Ist |\n|---|---|---|\n${items.map((it) => `| ${it.nm} | ${eur(it.soll)} | ${eur(it.ist)} |`).join('\n')}`;
    const intro = 'Nach dem Projekt „Netzwerkerneuerung“ bei der Elektro Krämer GmbH vergleicht die Projektleitung die geplanten mit den tatsächlichen Kosten.';
    if (d === 1) {
      const it = items[0];
      return {
        id: gid('w.sollist'), generated: true, kind: 'number', skill: 'w.prozentvergleich', difficulty: d,
        prompt: `${intro}\n\n${tbl}\n\nBerechne die **Abweichung in Prozent vom Soll** (Überschreitung +, Unterschreitung −; zwei Nachkommastellen, Minus als „-“ eingeben).`,
        answer: it.pc, tolerance: 0.01, unit: '%',
        misconceptions: cleanMc(it.pc, 0.01, [
          { answer: String(pq(it.ab, it.ist)), error: 'w-prozent-bezugsgroesse', why: 'Bezugsgröße ist der **Sollwert** (Plan), nicht der Istwert.' },
          { answer: String(-it.pc), error: 'w-vorzeichen', why: 'Abweichung = Ist − Soll. Liegt das Ist über dem Soll, ist sie positiv (Überschreitung).' },
          { answer: cs(it.ab), error: 'w-euro-statt-prozent', why: 'Das ist die Abweichung in Euro – gefragt sind Prozent.' },
        ]),
        hints: ['Abweichung = Ist − Soll.', 'In Prozent: Abweichung ÷ Soll × 100.'],
        explanation: `**Ergebnis: ${sgn(it.pc, 2)} %.**\n\nAbweichung: ${eur(it.ist)} − ${eur(it.soll)} = ${it.ab < 0 ? '−' : ''}${eur(Math.abs(it.ab))}\n\nIn Prozent vom Soll: ${it.ab < 0 ? '−' : ''}${eur(Math.abs(it.ab))} ÷ ${eur(it.soll)} × 100 = **${sgn(it.pc, 2)} %** (${it.ab > 0 ? 'Überschreitung' : 'Unterschreitung'})\n\nHäufiger Fehler: durch den Istwert teilen. Der Plan (Soll) ist 100 %.`,
      };
    }
    const S = items.reduce((a, it) => a + it.soll, 0), I = items.reduce((a, it) => a + it.ist, 0);
    const tot = { nm: 'Summe', soll: S, ist: I, ab: I - S, pc: pq(I - S, S) };
    const all = d === 3 ? [...items, tot] : items;
    const worst = items.reduce((a, b) => (b.pc > a.pc ? b : a));
    return finishTable({
      id: gid('w.sollist'), generated: true, kind: 'table', skill: 'w.prozentvergleich', difficulty: d,
      prompt: `${intro}\n\n${tbl}\n\nBerechne für jede Position${d === 3 ? ' und für die Summe' : ''} die **Abweichung in Euro** (Ist − Soll) und die **Abweichung in Prozent vom Soll** (zwei Nachkommastellen, Minus als „-“).${d === 3 ? ' Nenne außerdem die Position mit der **größten prozentualen Überschreitung**.' : ''}`,
      columns: [{ key: 'a', label: 'Abweichung (€)', type: 'number' }, { key: 'p', label: 'Abweichung (%)', type: 'number' }, ...(d === 3 ? [{ key: 't', label: 'Antwort', type: 'text' as const }] : [])],
      rows: [
        ...all.map((it) => ({ label: it.nm, cells: { a: { answer: cs(it.ab) }, p: { answer: String(it.pc), accept: near(it.pc) } } })),
        ...(d === 3 ? [{ label: 'größte prozentuale Überschreitung', cells: { t: { answer: worst.nm, accept: [worst.nm.split(' ')[0]] } } }] : []),
      ],
      misconceptions: [
        { cell: '0:p', answer: String(pq(items[0].ab, items[0].ist)), error: 'w-prozent-bezugsgroesse', why: 'Bezugsgröße ist der **Sollwert** (Plan), nicht der Istwert.' },
        { cell: '0:a', answer: cs(-items[0].ab), error: 'w-vorzeichen', why: 'Abweichung = Ist − Soll. Eine Überschreitung ist positiv, eine Unterschreitung negativ.' },
        ...(d === 3 ? [{ cell: `${items.length}:p`, answer: String(rk(items.reduce((a, it) => a + it.pc, 0) * 100) / 100), error: 'w-prozent-summe', why: 'Prozentwerte dürfen nicht addiert werden – die Gesamtabweichung bezieht sich auf die Soll-Summe.' }] : []),
      ],
      hints: ['Abweichung € = Ist − Soll.', 'Abweichung % = Abweichung € ÷ Soll × 100.'],
      explanation: `**Ergebnis:**\n\n${all.map((it) => `**${it.nm}:** ${eur(it.ist)} − ${eur(it.soll)} = ${it.ab < 0 ? '−' : '+'}${eur(Math.abs(it.ab))} → ÷ ${eur(it.soll)} × 100 = **${sgn(it.pc, 2)} %**`).join('\n\n')}${d === 3 ? `\n\nGrößte prozentuale Überschreitung: **${worst.nm}** (${sgn(worst.pc, 2)} %).` : ''}\n\nHäufige Fehler: durch den Istwert teilen; Prozentwerte der Positionen addieren statt die Summe neu zu berechnen.`,
    });
  },
};

/* ------------------------------------------------------------------ */

export const GENERATORS_WIRTSCHAFT: GeneratorMeta[] = [
  bezugspreis, nutzwert, angebotspreis, dienstleistung, kaufLeasing, amortisation, afa, sla, netzplanGen,
  preispunkte, kalkulation, handelsspanne, stundensatz, finanzierung, tarif, roi, veraenderung, makeOrBuy, sollIst,
];
