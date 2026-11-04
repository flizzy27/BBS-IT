/**
 * Aufgabengeneratoren für „Unternehmen, Markt & Wirtschaftlichkeit“ (w06) und die Projektplanung (w05):
 * Kennzahlen, Gleichgewichtspreis, Marktanteil, ABC-Analyse, Gantt-Diagramm, Projekttermine im Kalender.
 * Rundungsregeln stehen immer im Aufgabentext; Werte nahe einer Rundungsgrenze werden neu gewürfelt.
 */
import type { TableQuestion } from '../../content/types';
import type { GeneratorMeta } from '../generators';
import { Rng } from '../rng';

let counter = 0;
const gid = (g: string) => `gen:${g}:${Date.now().toString(36)}${(counter++).toString(36)}`;

/** deutsche Zahl, max. n Nachkommastellen */
const deN = (x: number, n = 2) => x.toLocaleString('de-DE', { maximumFractionDigits: n });
/** deutsche Zahl mit genau n Nachkommastellen */
const deF = (x: number, n: number) => x.toLocaleString('de-DE', { minimumFractionDigits: n, maximumFractionDigits: n });
const roundN = (x: number, n: number) => Math.round(x * 10 ** n) / 10 ** n;
/** true, wenn x beim Runden auf n Stellen nahe an der ,5-Grenze liegt (dann neu würfeln) */
const nearHalf = (x: number, n: number) => {
  const f = Math.abs(x * 10 ** n) % 1;
  return Math.abs(f - 0.5) < 0.02;
};

type Mc = { answer: string; error: string; why: string };
/** Fehlbilder entfernen, die innerhalb der Toleranz der richtigen Lösung liegen oder doppelt sind. */
function cleanMc(answer: number, tol: number, list: Mc[]): Mc[] {
  const seen = new Set<string>();
  return list.filter((m) => {
    const v = Number(m.answer);
    if (!Number.isFinite(v) || Math.abs(v - answer) <= tol + 1e-9) return false;
    if (seen.has(m.answer)) return false;
    seen.add(m.answer);
    return true;
  });
}

/* ------------------------------------------------------------------ */
/* Kennzahlen: Wirtschaftlichkeit, Produktivität, Rentabilität          */
/* ------------------------------------------------------------------ */

const kennzahlen: GeneratorMeta = {
  id: 'w.kennzahlen',
  title: 'Wirtschaftlichkeit, Produktivität und Rentabilität berechnen',
  skill: 'w.kennzahlen',
  module: 'w06',
  make(rng, d) {
    if (d === 1) {
      if (rng.bool()) {
        // Produktivität (mengenmäßig)
        for (;;) {
          const h = rng.int(24, 60);
          const n = rng.int(8, 30);
          const p = n / h;
          if (nearHalf(p, 2)) continue;
          const ans = roundN(p, 2);
          return {
            id: gid('w.kennzahlen'), generated: true, kind: 'number', skill: 'w.kennzahlen', difficulty: d,
            prompt: `Ein Techniker des IT-Systemhauses hat beim Rollout für die Elektro Krämer GmbH in **${h} Arbeitsstunden** insgesamt **${n} Arbeitsplätze** eingerichtet.\n\nBerechne die **Arbeitsproduktivität** in eingerichteten Arbeitsplätzen **pro Stunde** (auf zwei Nachkommastellen runden).\n\n*Formel: Produktivität = Ausbringungsmenge ÷ Einsatzmenge*`,
            answer: ans, tolerance: 0.005, unit: 'Arbeitsplätze/h',
            misconceptions: cleanMc(ans, 0.005, [
              { answer: String(roundN(h / n, 2)), error: 'w-kennzahl-kehrwert', why: 'Du hast Einsatz ÷ Ausbringung gerechnet (Stunden je Arbeitsplatz). Produktivität = **Ausbringung ÷ Einsatz**.' },
            ]),
            hints: ['Ausbringung = eingerichtete Arbeitsplätze, Einsatz = Arbeitsstunden.'],
            explanation: `**Ergebnis: ${deF(ans, 2)} Arbeitsplätze pro Stunde.**\n\n1. Ausbringungsmenge = ${n} Arbeitsplätze\n2. Einsatzmenge = ${h} h\n3. Produktivität = ${n} ÷ ${h} = ${deN(p, 4)} ≈ **${deF(ans, 2)} Arbeitsplätze/h**\n\nProduktivität ist eine **Mengen**-Kennzahl (ohne Geld). Häufiger Fehler: Zähler und Nenner vertauschen – dann erhältst du ${deN(h / n, 2)} Stunden je Arbeitsplatz.`,
          };
        }
      }
      for (;;) {
        const ertrag = rng.int(200, 2000) * 1000;
        const aufwand = Math.round((ertrag * rng.int(80, 104)) / 100 / 1000) * 1000;
        const w = ertrag / aufwand;
        if (nearHalf(w, 2) || aufwand === ertrag) continue;
        const ans = roundN(w, 2);
        const ok = w > 1;
        return {
          id: gid('w.kennzahlen'), generated: true, kind: 'number', skill: 'w.kennzahlen', difficulty: d,
          prompt: `Das IT-Systemhaus hat im letzten Geschäftsjahr folgende Werte:\n\n| Position | Betrag |\n|---|---|\n| Erträge (Umsatzerlöse u. a.) | ${deN(ertrag, 0)} € |\n| Aufwendungen (Personal, Material, Miete …) | ${deN(aufwand, 0)} € |\n\nBerechne die **Wirtschaftlichkeit** (auf zwei Nachkommastellen runden).\n\n*Formel: Wirtschaftlichkeit = Erträge ÷ Aufwendungen*`,
          answer: ans, tolerance: 0.005,
          misconceptions: cleanMc(ans, 0.005, [
            { answer: String(roundN(aufwand / ertrag, 2)), error: 'w-kennzahl-kehrwert', why: 'Du hast Aufwendungen ÷ Erträge gerechnet. Wirtschaftlichkeit = **Erträge ÷ Aufwendungen**.' },
            { answer: String(ertrag - aufwand), error: 'w-kennzahl-gewinn', why: 'Erträge − Aufwendungen ist der **Gewinn** (in €). Die Wirtschaftlichkeit ist ein **Verhältnis** (Division).' },
          ]),
          hints: ['Teile die Erträge durch die Aufwendungen.', 'Ein Wert über 1 bedeutet: wirtschaftlich gearbeitet.'],
          explanation: `**Ergebnis: ${deF(ans, 2)}**\n\nWirtschaftlichkeit = ${deN(ertrag, 0)} € ÷ ${deN(aufwand, 0)} € = ${deN(w, 4)} ≈ **${deF(ans, 2)}**\n\n${ok ? 'Der Wert ist **größer als 1** → das Systemhaus hat **wirtschaftlich** gearbeitet (die Erträge übersteigen die Aufwendungen).' : 'Der Wert ist **kleiner als 1** → das Systemhaus hat **unwirtschaftlich** gearbeitet (die Aufwendungen übersteigen die Erträge, es entsteht ein Verlust).'}\n\nHäufiger Fehler: Gewinn (Erträge − Aufwendungen) statt des Verhältnisses angeben.`,
        };
      }
    }
    if (d === 2) {
      for (;;) {
        const umsatz = rng.int(300, 3000) * 1000;
        const gewinn = Math.round((umsatz * rng.int(3, 15)) / 100 / 1000) * 1000;
        const ek = rng.int(2, 20) * 50_000;
        const ekr = (gewinn / ek) * 100;
        const ur = (gewinn / umsatz) * 100;
        if (nearHalf(ekr, 1) || nearHalf(ur, 1) || gewinn === 0) continue;
        const askEk = rng.bool();
        const ans = roundN(askEk ? ekr : ur, 1);
        const other = roundN(askEk ? ur : ekr, 1);
        return {
          id: gid('w.kennzahlen'), generated: true, kind: 'number', skill: 'w.kennzahlen', difficulty: d,
          prompt: `Auszug aus dem Jahresabschluss des IT-Systemhauses:\n\n| Position | Betrag |\n|---|---|\n| Umsatzerlöse | ${deN(umsatz, 0)} € |\n| Gewinn | ${deN(gewinn, 0)} € |\n| Eigenkapital | ${deN(ek, 0)} € |\n\nBerechne die **${askEk ? 'Eigenkapitalrentabilität' : 'Umsatzrentabilität'}** in Prozent (auf eine Nachkommastelle runden).\n\n*Formeln: Eigenkapitalrentabilität = Gewinn ÷ Eigenkapital × 100 · Umsatzrentabilität = Gewinn ÷ Umsatz × 100*`,
          answer: ans, tolerance: 0.05, unit: '%',
          misconceptions: cleanMc(ans, 0.05, [
            { answer: String(other), error: 'w-rentabilitaet-basis', why: askEk ? 'Das ist die **Umsatz**rentabilität. Gefragt ist die Eigenkapitalrentabilität: Gewinn ÷ **Eigenkapital**.' : 'Das ist die **Eigenkapital**rentabilität. Gefragt ist die Umsatzrentabilität: Gewinn ÷ **Umsatz**.' },
            { answer: String(roundN(ans / 100, 3)), error: 'w-prozent-faktor', why: 'Du hast vergessen, mit 100 zu multiplizieren. Rentabilität wird in **Prozent** angegeben.' },
          ]),
          hints: [askEk ? 'Gewinn im Verhältnis zum eingesetzten Eigenkapital.' : 'Gewinn im Verhältnis zum Umsatz.', 'Ergebnis × 100 → Prozent.'],
          explanation: `**Ergebnis: ${deF(ans, 1)} %**\n\n${askEk ? `Eigenkapitalrentabilität = ${deN(gewinn, 0)} € ÷ ${deN(ek, 0)} € × 100 = ${deN(ekr, 3)} % ≈ **${deF(ans, 1)} %**\n\nBedeutung: Jeder Euro Eigenkapital hat ${deN(ekr / 100, 3)} € Gewinn gebracht. Vergleich: Eine sichere Geldanlage mit z. B. 3 % Zinsen wäre ${ekr > 3 ? 'schlechter' : 'besser'} gewesen.` : `Umsatzrentabilität = ${deN(gewinn, 0)} € ÷ ${deN(umsatz, 0)} € × 100 = ${deN(ur, 3)} % ≈ **${deF(ans, 1)} %**\n\nBedeutung: Von jedem Euro Umsatz bleiben ${deN(ur, 1)} Cent als Gewinn übrig.`}\n\nHäufiger Fehler: die falsche Bezugsgröße (Umsatz statt Eigenkapital oder umgekehrt).`,
        };
      }
    }
    for (;;) {
      const gewinn = rng.int(20, 400) * 1000;
      const ek = rng.int(4, 40) * 25_000;
      const fk = rng.int(2, 40) * 25_000;
      const zins = Math.round((fk * rng.int(3, 8)) / 100 / 100) * 100;
      const gk = ek + fk;
      const gkr = ((gewinn + zins) / gk) * 100;
      const ekr = (gewinn / ek) * 100;
      if (nearHalf(gkr, 1) || nearHalf(ekr, 1) || nearHalf((gewinn / gk) * 100, 1)) continue;
      const ans = roundN(gkr, 1);
      return {
        id: gid('w.kennzahlen'), generated: true, kind: 'number', skill: 'w.kennzahlen', difficulty: d,
        prompt: `Die Geschäftsführung des IT-Systemhauses will wissen, wie rentabel das **gesamte** eingesetzte Kapital war:\n\n| Position | Betrag |\n|---|---|\n| Gewinn | ${deN(gewinn, 0)} € |\n| Eigenkapital | ${deN(ek, 0)} € |\n| Fremdkapital (Bankdarlehen) | ${deN(fk, 0)} € |\n| Zinsen für das Fremdkapital | ${deN(zins, 0)} € |\n\nBerechne die **Gesamtkapitalrentabilität** in Prozent (auf eine Nachkommastelle runden).\n\n*Formel: Gesamtkapitalrentabilität = (Gewinn + Fremdkapitalzinsen) ÷ (Eigenkapital + Fremdkapital) × 100*`,
        answer: ans, tolerance: 0.05, unit: '%',
        misconceptions: cleanMc(ans, 0.05, [
          { answer: String(roundN((gewinn / gk) * 100, 1)), error: 'w-rentabilitaet-zinsen', why: 'Die **Fremdkapitalzinsen** gehören in den Zähler: Sie sind der „Gewinn“ der Bank für das geliehene Kapital.' },
          { answer: String(roundN(ekr, 1)), error: 'w-rentabilitaet-basis', why: 'Das ist die **Eigenkapital**rentabilität. Gefragt ist die Rentabilität des **gesamten** Kapitals (EK + FK).' },
          { answer: String(roundN(((gewinn + zins) / ek) * 100, 1)), error: 'w-rentabilitaet-basis', why: 'Im Nenner steht das **Gesamtkapital** (Eigenkapital + Fremdkapital), nicht nur das Eigenkapital.' },
        ]),
        hints: ['Gesamtkapital = Eigenkapital + Fremdkapital.', 'Zähler = Gewinn + Fremdkapitalzinsen.'],
        explanation: `**Ergebnis: ${deF(ans, 1)} %**\n\n1. Gesamtkapital = ${deN(ek, 0)} € + ${deN(fk, 0)} € = ${deN(gk, 0)} €\n2. Gewinn + Zinsen = ${deN(gewinn, 0)} € + ${deN(zins, 0)} € = ${deN(gewinn + zins, 0)} €\n3. Gesamtkapitalrentabilität = ${deN(gewinn + zins, 0)} € ÷ ${deN(gk, 0)} € × 100 = ${deN(gkr, 3)} % ≈ **${deF(ans, 1)} %**\n\nZum Vergleich: Eigenkapitalrentabilität = ${deN(gewinn, 0)} ÷ ${deN(ek, 0)} × 100 ≈ ${deF(roundN(ekr, 1), 1)} %.\n\nHäufiger Fehler: die Fremdkapitalzinsen im Zähler vergessen.`,
      };
    }
  },
};

/* ------------------------------------------------------------------ */
/* Gleichgewichtspreis, Angebots- und Nachfrageüberhang                */
/* ------------------------------------------------------------------ */

const GUETER = [
  { n: 'Grafikkarten der Mittelklasse', u: 'Stück' },
  { n: '27-Zoll-Monitore', u: 'Stück' },
  { n: 'Business-Notebooks (gebraucht, aufbereitet)', u: 'Stück' },
  { n: 'Mesh-WLAN-Sets', u: 'Stück' },
] as const;

function marktTabelle(rng: Rng) {
  for (;;) {
    const n = 6;
    const step = rng.pick([10, 20, 25, 50]);
    const p0 = rng.int(6, 30) * 10;
    const k = rng.int(1, 4);
    const q = rng.int(20, 60) * 100;
    const D: number[] = Array(n).fill(0), S: number[] = Array(n).fill(0);
    D[k] = q; S[k] = q;
    for (let i = k - 1; i >= 0; i--) { D[i] = D[i + 1] + rng.int(3, 9) * 100; S[i] = S[i + 1] - rng.int(3, 9) * 100; }
    for (let i = k + 1; i < n; i++) { D[i] = D[i - 1] - rng.int(3, 9) * 100; S[i] = S[i - 1] + rng.int(3, 9) * 100; }
    if (Math.min(...D, ...S) < 300) continue;
    const P = Array.from({ length: n }, (_, i) => p0 + i * step);
    return { P, D, S, k, g: rng.pick(GUETER) };
  }
}

const gleichgewicht: GeneratorMeta = {
  id: 'w.gleichgewicht',
  title: 'Gleichgewichtspreis und Marktüberhang bestimmen',
  skill: 'w.preisbildung',
  module: 'w06',
  make(rng, d) {
    const { P, D, S, k, g } = marktTabelle(rng);
    const tbl = `| Preis je Stück | Nachfragemenge | Angebotsmenge |\n|---|---|---|\n${P.map((p, i) => `| ${deN(p, 0)} € | ${deN(D[i], 0)} | ${deN(S[i], 0)} |`).join('\n')}`;
    const intro = `Auf einem regionalen Markt für **${g.n}** ergeben sich bei verschiedenen Preisen folgende Mengen (je Monat, in ${g.u}):\n\n${tbl}`;
    const status = (i: number) => (S[i] > D[i] ? 'Angebotsüberhang' : S[i] < D[i] ? 'Nachfrageüberhang' : 'Gleichgewicht');
    const full = `| Preis | Nachfrage | Angebot | abgesetzte Menge (kleinere Zahl) | Situation |\n|---|---|---|---|---|\n${P.map((p, i) => `| ${p} € | ${deN(D[i], 0)} | ${deN(S[i], 0)} | ${deN(Math.min(D[i], S[i]), 0)} | ${status(i)}${S[i] !== D[i] ? ` von ${deN(Math.abs(S[i] - D[i]), 0)}` : ''} |`).join('\n')}`;
    const base = `Beim Preis von **${P[k]} €** sind Angebots- und Nachfragemenge gleich (${deN(D[k], 0)} ${g.u}) → das ist der **Gleichgewichtspreis**. Darüber wollen die Anbieter mehr verkaufen, als gekauft wird (**Angebotsüberhang** → Käufermarkt, Preise sinken). Darunter wollen die Käufer mehr kaufen, als angeboten wird (**Nachfrageüberhang** → Verkäufermarkt, Preise steigen).`;
    if (d === 1) {
      return {
        id: gid('w.gleichgewicht'), generated: true, kind: 'number', skill: 'w.preisbildung', difficulty: d,
        prompt: `${intro}\n\nWie hoch ist der **Gleichgewichtspreis** (in €)?`,
        answer: P[k], unit: '€',
        misconceptions: cleanMc(P[k], 0, [
          { answer: String(P[0]), error: 'w-gleichgewicht-extrem', why: 'Beim niedrigsten Preis ist die Nachfrage am größten – aber die Anbieter liefern viel weniger. Gleichgewicht heißt: **Angebot = Nachfrage**.' },
          { answer: String(P[P.length - 1]), error: 'w-gleichgewicht-extrem', why: 'Beim höchsten Preis wollen die Anbieter am meisten verkaufen, doch kaum jemand kauft. Gesucht ist der Preis mit **Angebot = Nachfrage**.' },
        ]),
        hints: ['Suche die Zeile, in der Angebots- und Nachfragemenge gleich groß sind.'],
        explanation: `**Ergebnis: ${P[k]} €**\n\n${full}\n\n${base}`,
      };
    }
    if (d === 2) {
      const cand = P.map((_, i) => i).filter((i) => i !== k);
      const j = rng.pick(cand);
      const over = S[j] > D[j];
      const q: TableQuestion = {
        id: gid('w.gleichgewicht'), generated: true, kind: 'table', skill: 'w.preisbildung', difficulty: d,
        prompt: `${intro}\n\nEin Händler verlangt **${P[j]} €**. Beschreibe die Marktsituation bei diesem Preis.\n\n- **Überhang:** „Angebotsüberhang“ oder „Nachfrageüberhang“\n- **Menge:** Größe des Überhangs in ${g.u}\n- **Markt:** „Käufermarkt“ oder „Verkäufermarkt“`,
        columns: [
          { key: 'art', label: 'Überhang', type: 'text' },
          { key: 'menge', label: 'Menge', type: 'number' },
          { key: 'markt', label: 'Markt', type: 'text' },
        ],
        rows: [{
          label: `${P[j]} €`,
          cells: {
            art: over ? { answer: 'Angebotsüberhang', accept: ['angebotsueberhang', 'angebot'] } : { answer: 'Nachfrageüberhang', accept: ['nachfrageueberhang', 'nachfrage'] },
            menge: { answer: String(Math.abs(S[j] - D[j])) },
            markt: over ? { answer: 'Käufermarkt', accept: ['kaeufermarkt'] } : { answer: 'Verkäufermarkt', accept: ['verkaeufermarkt'] },
          },
        }],
        hints: ['Vergleiche Angebots- und Nachfragemenge in der Zeile.', 'Wer die „knappe“ Seite ist, hat die Macht: Gibt es zu viel Ware, bestimmen die Käufer.'],
        explanation: `**Ergebnis: ${over ? 'Angebotsüberhang' : 'Nachfrageüberhang'} von ${deN(Math.abs(S[j] - D[j]), 0)} ${g.u} → ${over ? 'Käufermarkt' : 'Verkäufermarkt'}**\n\n1. Bei ${P[j]} € werden ${deN(D[j], 0)} nachgefragt und ${deN(S[j], 0)} angeboten.\n2. ${over ? `Angebot > Nachfrage → **Angebotsüberhang** = ${deN(S[j], 0)} − ${deN(D[j], 0)} = ${deN(S[j] - D[j], 0)}` : `Nachfrage > Angebot → **Nachfrageüberhang** = ${deN(D[j], 0)} − ${deN(S[j], 0)} = ${deN(D[j] - S[j], 0)}`}\n3. ${over ? 'Es gibt mehr Ware als Käufer → die **Käufer** sind in der stärkeren Position (**Käufermarkt**). Die Preise geraten unter Druck und sinken Richtung Gleichgewicht.' : 'Die Ware ist knapp → die **Verkäufer** sind in der stärkeren Position (**Verkäufermarkt**). Die Preise steigen Richtung Gleichgewicht.'}\n\n${full}\n\nHäufiger Fehler: Käufer- und Verkäufermarkt verwechseln. Merke: Der Markt ist nach der Seite benannt, die **im Vorteil** ist.`,
      };
      return q;
    }
    const q: TableQuestion = {
      id: gid('w.gleichgewicht'), generated: true, kind: 'table', skill: 'w.preisbildung', difficulty: d,
      prompt: `${intro}\n\nVervollständige die Tabelle:\n\n- **abgesetzt:** Menge, die bei diesem Preis tatsächlich verkauft wird (es wird nur so viel gehandelt, wie die kleinere Seite zulässt)\n- **Situation:** „A“ = Angebotsüberhang, „N“ = Nachfrageüberhang, „G“ = Gleichgewicht\n- **Umsatz:** abgesetzte Menge × Preis in €`,
      columns: [
        { key: 'abs', label: 'abgesetzt', type: 'number' },
        { key: 'sit', label: 'Situation', type: 'text' },
        { key: 'ums', label: 'Umsatz (€)', type: 'number' },
      ],
      rows: P.map((p, i) => ({
        label: `${p} €`,
        cells: {
          abs: { answer: String(Math.min(D[i], S[i])) },
          sit: S[i] > D[i] ? { answer: 'A', accept: ['angebotsüberhang', 'angebotsueberhang'] } : S[i] < D[i] ? { answer: 'N', accept: ['nachfrageüberhang', 'nachfrageueberhang'] } : { answer: 'G', accept: ['gleichgewicht'] },
          ums: { answer: String(Math.min(D[i], S[i]) * p) },
        },
      })),
      hints: ['Abgesetzt wird immer die kleinere der beiden Mengen.', 'Im Gleichgewicht wird die größte Menge gehandelt.'],
      explanation: `**Lösung:**\n\n| Preis | abgesetzt | Situation | Umsatz |\n|---|---|---|---|\n${P.map((p, i) => `| ${p} € | ${deN(Math.min(D[i], S[i]), 0)} | ${S[i] > D[i] ? 'A' : S[i] < D[i] ? 'N' : 'G'} | ${deN(Math.min(D[i], S[i]) * p, 0)} € |`).join('\n')}\n\n${base}\n\nIm Gleichgewicht wird die **größte Menge** gehandelt – oberhalb fehlen Käufer, unterhalb fehlt Ware. Häufiger Fehler: bei „abgesetzt“ die größere Menge eintragen – verkauft werden kann aber nur, was beide Seiten wollen.`,
    };
    return q;
  },
};

/* ------------------------------------------------------------------ */
/* Marktanteil                                                          */
/* ------------------------------------------------------------------ */

const FIRMEN = ['IT-Systemhaus Nord GmbH', 'NetPro Service KG', 'Digitalwerk AG', 'Bürotechnik Lange e. K.', 'Cloudhafen GmbH'];

const marktanteil: GeneratorMeta = {
  id: 'w.marktanteil',
  title: 'Marktanteil berechnen und beurteilen',
  skill: 'w.marktanteil',
  module: 'w06',
  make(rng, d) {
    if (d === 1) {
      for (;;) {
        const vol = rng.int(20, 500) * 100;
        const own = Math.round((vol * rng.int(4, 45)) / 100 / 10) * 10;
        const a = (own / vol) * 100;
        if (nearHalf(a, 1) || own === 0) continue;
        const ans = roundN(a, 1);
        return {
          id: gid('w.marktanteil'), generated: true, kind: 'number', skill: 'w.marktanteil', difficulty: d,
          prompt: `Im Raum Hamburg wurden im letzten Jahr insgesamt **${deN(vol, 0)} Business-Notebooks** an Unternehmen verkauft (Marktvolumen). Das IT-Systemhaus Nord hat davon **${deN(own, 0)} Stück** verkauft.\n\nBerechne den **Marktanteil** des Systemhauses in Prozent (auf eine Nachkommastelle runden).\n\n*Formel: Marktanteil = eigener Absatz ÷ Marktvolumen × 100*`,
          answer: ans, tolerance: 0.05, unit: '%',
          misconceptions: cleanMc(ans, 0.05, [
            { answer: String(roundN(a / 100, 3)), error: 'w-prozent-faktor', why: 'Du hast vergessen, mit 100 zu multiplizieren – der Marktanteil wird in **Prozent** angegeben.' },
            { answer: String(roundN((vol / own) * 100, 1)), error: 'w-kennzahl-kehrwert', why: 'Zähler und Nenner vertauscht: Marktanteil = **eigener Absatz ÷ Marktvolumen**.' },
          ]),
          hints: ['Marktvolumen = alle Verkäufe aller Anbieter auf diesem Markt.'],
          explanation: `**Ergebnis: ${deF(ans, 1)} %**\n\nMarktanteil = ${deN(own, 0)} ÷ ${deN(vol, 0)} × 100 = ${deN(a, 3)} % ≈ **${deF(ans, 1)} %**\n\nHäufiger Fehler: das ×100 vergessen oder Zähler und Nenner vertauschen.`,
        };
      }
    }
    const k = d === 2 ? 4 : 5;
    for (;;) {
      const firms = rng.shuffle(FIRMEN).slice(0, k);
      const sales = firms.map(() => rng.int(8, 120) * 50);
      if (d === 2 && rng.bool(0.4)) sales[0] = Math.max(...sales) * rng.int(2, 3);
      const vol = sales.reduce((s, x) => s + x, 0);
      const shares = sales.map((x) => (x / vol) * 100);
      if (shares.some((s) => nearHalf(s, 1) || Math.abs(s - 40) < 0.3)) continue;
      const tbl = `| Anbieter | Absatz (Stück) |\n|---|---|\n${firms.map((f, i) => `| ${f} | ${deN(sales[i], 0)} |`).join('\n')}`;
      if (d === 2) {
        const ans = roundN(shares[0], 1);
        const dom = shares[0] >= 40;
        const q: TableQuestion = {
          id: gid('w.marktanteil'), generated: true, kind: 'table', skill: 'w.marktanteil', difficulty: d,
          prompt: `Auf dem regionalen Markt für **Wartungsverträge für Netzwerkdrucker** gibt es nur diese Anbieter:\n\n${tbl}\n\nNach § 18 Abs. 4 GWB wird vermutet, dass ein Unternehmen **marktbeherrschend** ist, wenn es einen Marktanteil von **mindestens 40 %** hat.\n\nVervollständige (Marktanteil auf eine Nachkommastelle runden; letzte Spalte „ja“ oder „nein“).`,
          columns: [
            { key: 'vol', label: 'Marktvolumen (Stück)', type: 'number' },
            { key: 'ma', label: `Marktanteil ${firms[0]} (%)`, type: 'number' },
            { key: 'dom', label: 'marktbeherrschend vermutet?', type: 'text' },
          ],
          rows: [{
            cells: {
              vol: { answer: String(vol) },
              ma: { answer: String(ans) },
              dom: dom ? { answer: 'ja', accept: ['j', 'yes'] } : { answer: 'nein', accept: ['n', 'no'] },
            },
          }],
          hints: ['Marktvolumen = Summe aller Absätze.', 'Marktanteil = eigener Absatz ÷ Marktvolumen × 100.'],
          explanation: `**Ergebnis: Marktvolumen ${deN(vol, 0)} Stück, Marktanteil ${deF(ans, 1)} % → ${dom ? 'ja' : 'nein'}**\n\n1. Marktvolumen = ${sales.map((s) => deN(s, 0)).join(' + ')} = **${deN(vol, 0)} Stück**\n2. Marktanteil ${firms[0]} = ${deN(sales[0], 0)} ÷ ${deN(vol, 0)} × 100 = ${deN(shares[0], 3)} % ≈ **${deF(ans, 1)} %**\n3. ${dom ? `${deF(ans, 1)} % ≥ 40 % → nach § 18 GWB wird eine **marktbeherrschende Stellung vermutet** (das Kartellamt schaut genauer hin, z. B. bei Übernahmen).` : `${deF(ans, 1)} % < 40 % → **keine** Vermutung der Marktbeherrschung.`}\n\nAlle Anteile: ${firms.map((f, i) => `${f} ${deF(roundN(shares[i], 1), 1)} %`).join(' · ')}`,
        };
        return q;
      }
      // d3: Veränderung in Prozentpunkten
      const sales2 = sales.map((x) => Math.max(200, x + rng.int(-30, 30) * 50));
      const vol2 = sales2.reduce((s, x) => s + x, 0);
      const s1 = shares[0], s2 = (sales2[0] / vol2) * 100;
      if (nearHalf(s2, 1) || Math.abs(roundN(s2, 1) - roundN(s1, 1)) < 0.5) continue;
      const r1 = roundN(s1, 1), r2 = roundN(s2, 1);
      const pp = roundN(r2 - r1, 1);
      const ppExact = roundN(s2 - s1, 1);
      const rel = roundN(((r2 - r1) / r1) * 100, 1);
      const tbl2 = `| Anbieter | Absatz Jahr 1 | Absatz Jahr 2 |\n|---|---|---|\n${firms.map((f, i) => `| ${f} | ${deN(sales[i], 0)} | ${deN(sales2[i], 0)} |`).join('\n')}`;
      const q: TableQuestion = {
        id: gid('w.marktanteil'), generated: true, kind: 'table', skill: 'w.marktanteil', difficulty: d,
        prompt: `Absatz von Firewall-Appliances (Stück) auf einem regionalen Markt:\n\n${tbl2}\n\nBerechne für **${firms[0]}** die Marktanteile (in %, auf eine Nachkommastelle runden) und die Veränderung des Marktanteils in **Prozentpunkten** (aus den gerundeten Anteilen; ein Rückgang mit Minuszeichen).`,
        columns: [
          { key: 'a1', label: 'Marktanteil Jahr 1 (%)', type: 'number' },
          { key: 'a2', label: 'Marktanteil Jahr 2 (%)', type: 'number' },
          { key: 'pp', label: 'Veränderung (Prozentpunkte)', type: 'number' },
        ],
        rows: [{
          cells: {
            a1: { answer: String(r1) },
            a2: { answer: String(r2) },
            pp: { answer: String(pp), accept: ppExact !== pp ? [String(ppExact)] : [] },
          },
        }],
        hints: ['Für jedes Jahr zuerst das Marktvolumen (Summe) bilden.', 'Prozentpunkte = Anteil Jahr 2 − Anteil Jahr 1 (einfache Differenz).'],
        explanation: `**Ergebnis: ${deF(r1, 1)} % → ${deF(r2, 1)} %, Veränderung ${pp > 0 ? '+' : ''}${deF(pp, 1)} Prozentpunkte**\n\n1. Marktvolumen Jahr 1 = ${deN(vol, 0)} Stück → Anteil = ${deN(sales[0], 0)} ÷ ${deN(vol, 0)} × 100 ≈ **${deF(r1, 1)} %**\n2. Marktvolumen Jahr 2 = ${deN(vol2, 0)} Stück → Anteil = ${deN(sales2[0], 0)} ÷ ${deN(vol2, 0)} × 100 ≈ **${deF(r2, 1)} %**\n3. Veränderung = ${deF(r2, 1)} − ${deF(r1, 1)} = **${pp > 0 ? '+' : ''}${deF(pp, 1)} Prozentpunkte**\n\nHäufiger Fehler: Prozentpunkte und Prozent verwechseln. Die **relative** Veränderung wäre (${deF(r2, 1)} − ${deF(r1, 1)}) ÷ ${deF(r1, 1)} × 100 ≈ ${deF(rel, 1)} % – das ist eine andere Aussage („der Anteil ist um ${deF(Math.abs(rel), 1)} % ${rel > 0 ? 'gewachsen' : 'geschrumpft'}“).${sales2[0] > sales[0] && r2 < r1 ? '\n\nBeachte: Der Absatz ist gestiegen, der Marktanteil aber gesunken – der Gesamtmarkt ist stärker gewachsen.' : ''}${sales2[0] < sales[0] && r2 > r1 ? '\n\nBeachte: Der Absatz ist gesunken, der Marktanteil aber gestiegen – der Gesamtmarkt ist noch stärker geschrumpft.' : ''}`,
      };
      return q;
    }
  },
};

/* ------------------------------------------------------------------ */
/* ABC-Analyse                                                          */
/* ------------------------------------------------------------------ */

const ARTIKEL = [
  { n: 'Server (Rack, 1 HE)', p: [3000, 6000], m: [1, 4] },
  { n: 'Business-Notebook', p: [750, 1400], m: [15, 60] },
  { n: 'Firewall-Appliance', p: [1200, 2500], m: [1, 4] },
  { n: '27-Zoll-Monitor', p: [140, 260], m: [20, 80] },
  { n: 'Dockingstation', p: [150, 260], m: [10, 50] },
  { n: 'Switch 24 Port PoE', p: [250, 600], m: [2, 10] },
  { n: 'Headset', p: [40, 90], m: [20, 80] },
  { n: 'Toner (Laserdrucker)', p: [60, 120], m: [10, 40] },
  { n: 'Maus', p: [8, 20], m: [40, 150] },
  { n: 'Tastatur', p: [15, 35], m: [30, 120] },
  { n: 'Patchkabel 2 m', p: [2, 6], m: [100, 400] },
  { n: 'USB-Stick 64 GB', p: [5, 12], m: [50, 200] },
] as const;

const abc: GeneratorMeta = {
  id: 'w.abc',
  title: 'ABC-Analyse durchführen',
  skill: 'w.abc',
  module: 'w06',
  make(rng, d) {
    for (;;) {
      const items = rng.shuffle(ARTIKEL).slice(0, 8).map((a) => {
        const p = rng.int(a.p[0], a.p[1]);
        const m = rng.int(a.m[0], a.m[1]);
        return { n: a.n, p, m, w: p * m };
      });
      const total = items.reduce((s, x) => s + x.w, 0);
      const sorted = [...items].sort((a, b) => b.w - a.w);
      if (new Set(items.map((x) => x.w)).size !== items.length) continue;
      let cum = 0;
      const info = new Map<string, { rank: number; share: number; cum: number; cls: string }>();
      sorted.forEach((x, i) => {
        cum += x.w;
        const c = (cum / total) * 100;
        info.set(x.n, { rank: i + 1, share: (x.w / total) * 100, cum: c, cls: c <= 80 ? 'A' : c <= 95 ? 'B' : 'C' });
      });
      const vals = [...info.values()];
      if (vals.some((v) => Math.abs(v.cum - 80) < 0.15 || Math.abs(v.cum - 95) < 0.15 || nearHalf(v.cum, 1) || nearHalf(v.share, 1))) continue;
      const counts = ['A', 'B', 'C'].map((c) => vals.filter((v) => v.cls === c).length);
      if (counts.some((c) => c === 0)) continue;
      const rule = 'Regel: Artikel nach Verbrauchswert (Menge × Preis) absteigend sortieren und Wertanteile kumulieren. **A** = kumulierter Anteil bis einschließlich 80 %, **B** = über 80 % bis einschließlich 95 %, **C** = über 95 %.';
      const tbl = `| Artikel | Jahresmenge | Preis je Stück |\n|---|---|---|\n${items.map((x) => `| ${x.n} | ${x.m} | ${deN(x.p, 0)} € |`).join('\n')}`;
      const sol = `| Rang | Artikel | Verbrauchswert | Anteil | kumuliert | Klasse |\n|---|---|---|---|---|---|\n${sorted.map((x) => { const v = info.get(x.n)!; return `| ${v.rank} | ${x.n} | ${deN(x.w, 0)} € | ${deF(roundN(v.share, 1), 1)} % | ${deF(roundN(v.cum, 1), 1)} % | ${v.cls} |`; }).join('\n')}\n\nGesamtwert: **${deN(total, 0)} €**`;
      const intro = `Die IT-Abteilung der Elektro Krämer GmbH will ihre Beschaffung verbessern und analysiert den Jahresverbrauch an IT-Material:\n\n${tbl}`;
      if (d === 1) {
        const x = rng.pick(items);
        const v = info.get(x.n)!;
        const ans = roundN(v.share, 1);
        const totalM = items.reduce((s, y) => s + y.m, 0);
        return {
          id: gid('w.abc'), generated: true, kind: 'number', skill: 'w.abc', difficulty: d,
          prompt: `${intro}\n\nWie viel **Prozent des gesamten Verbrauchswerts** entfallen auf den Artikel **„${x.n}“**? (Verbrauchswert = Jahresmenge × Preis; auf eine Nachkommastelle runden)`,
          answer: ans, tolerance: 0.05, unit: '%',
          misconceptions: cleanMc(ans, 0.05, [
            { answer: String(roundN((x.m / totalM) * 100, 1)), error: 'w-abc-menge-statt-wert', why: 'Das ist der **Mengen**anteil. Die ABC-Analyse bewertet den **Wert** (Menge × Preis).' },
          ]),
          hints: ['Berechne für jeden Artikel Menge × Preis und addiere alle Werte.', `Anteil = Wert von „${x.n}“ ÷ Gesamtwert × 100.`],
          explanation: `**Ergebnis: ${deF(ans, 1)} %**\n\n1. Verbrauchswert „${x.n}“ = ${x.m} × ${deN(x.p, 0)} € = ${deN(x.w, 0)} €\n2. Gesamtwert aller Artikel = ${deN(total, 0)} €\n3. Anteil = ${deN(x.w, 0)} ÷ ${deN(total, 0)} × 100 ≈ **${deF(ans, 1)} %**\n\n${sol}\n\nHäufiger Fehler: mit der Stückzahl statt mit dem Wert rechnen.`,
        };
      }
      if (d === 2) {
        const q: TableQuestion = {
          id: gid('w.abc'), generated: true, kind: 'table', skill: 'w.abc', difficulty: d,
          prompt: `${intro}\n\n${rule}\n\nOrdne jedem Artikel seine Klasse zu (A, B oder C).`,
          columns: [{ key: 'k', label: 'Klasse', type: 'text' }],
          rows: items.map((x) => ({ label: x.n, cells: { k: { answer: info.get(x.n)!.cls } } })),
          hints: ['Verbrauchswert = Menge × Preis für jede Zeile.', 'Sortieren, Anteile berechnen, aufaddieren – dann die Grenzen 80 % und 95 % anwenden.'],
          explanation: `**Lösung:** ${counts[0]} A-, ${counts[1]} B- und ${counts[2]} C-Artikel.\n\n${sol}\n\nTypisch: Wenige teure Artikel (A) machen den Großteil des Werts aus – hier lohnen Preisverhandlungen und genaue Bedarfsplanung. Viele billige Artikel (C) bestellt man vereinfacht (z. B. Rahmenvertrag, Sammelbestellung). Häufiger Fehler: nach Stückzahl statt nach Wert sortieren – dann landen Patchkabel und Mäuse fälschlich in Klasse A.`,
        };
        return q;
      }
      const q: TableQuestion = {
        id: gid('w.abc'), generated: true, kind: 'table', skill: 'w.abc', difficulty: d,
        prompt: `${intro}\n\n${rule}\n\nVervollständige für jeden Artikel: **Rang** (1 = höchster Verbrauchswert), **kumulierter Wertanteil** in % (auf eine Nachkommastelle) und **Klasse**.`,
        columns: [
          { key: 'r', label: 'Rang', type: 'number' },
          { key: 'c', label: 'kumuliert (%)', type: 'number' },
          { key: 'k', label: 'Klasse', type: 'text' },
        ],
        rows: items.map((x) => {
          const v = info.get(x.n)!;
          const rc = roundN(v.cum, 1);
          // alternativ: aus gerundeten Einzelanteilen aufsummiert
          const alt = roundN(sorted.slice(0, v.rank).reduce((s, y) => s + roundN(info.get(y.n)!.share, 1), 0), 1);
          return { label: x.n, cells: { r: { answer: String(v.rank) }, c: { answer: String(rc), accept: alt !== rc ? [String(alt)] : [] }, k: { answer: v.cls } } };
        }),
        hints: ['Erst alle Verbrauchswerte berechnen und den Gesamtwert bilden.', 'Kumuliert = Summe der Anteile aller Artikel bis einschließlich dieses Rangs.'],
        explanation: `**Lösung:**\n\n${sol}\n\nAuswertung: A-Artikel (${sorted.filter((x) => info.get(x.n)!.cls === 'A').map((x) => x.n).join(', ')}) → genaue Bedarfsplanung, mehrere Angebote, Preisverhandlung. C-Artikel → vereinfachte Bestellung, größere Mengen auf Vorrat. Häufiger Fehler: den Anteil des einzelnen Artikels statt des **kumulierten** Anteils mit der Grenze vergleichen.`,
      };
      return q;
    }
  },
};

/* ------------------------------------------------------------------ */
/* Netzplan-Hilfsfunktion (Start 0, FEZ = FAZ + D)                      */
/* ------------------------------------------------------------------ */

type Act = { id: string; n: string; pre: readonly string[] };
const PROJEKTE: { name: string; acts: Act[] }[] = [
  {
    name: 'Notebook-Rollout im Vertrieb',
    acts: [
      { id: 'A', n: 'Bedarf aufnehmen', pre: [] },
      { id: 'B', n: 'Bestellung und Lieferung', pre: ['A'] },
      { id: 'C', n: 'Image vorbereiten', pre: ['A'] },
      { id: 'D', n: 'Geräte einrichten', pre: ['B', 'C'] },
      { id: 'E', n: 'Einweisung und Übergabe', pre: ['D'] },
    ],
  },
  {
    name: 'WLAN für das Lager Hamburg',
    acts: [
      { id: 'A', n: 'Ausleuchtung (Site Survey)', pre: [] },
      { id: 'B', n: 'Access Points bestellen', pre: ['A'] },
      { id: 'C', n: 'Verkabelung und PoE-Switch', pre: ['A'] },
      { id: 'D', n: 'Access Points montieren', pre: ['B', 'C'] },
      { id: 'E', n: 'Controller konfigurieren', pre: ['B'] },
      { id: 'F', n: 'Messung, Test und Abnahme', pre: ['D', 'E'] },
    ],
  },
  {
    name: 'Serverumzug in den neuen Serverraum',
    acts: [
      { id: 'A', n: 'Planung und Zeitplan', pre: [] },
      { id: 'B', n: 'Rack und USV beschaffen', pre: ['A'] },
      { id: 'C', n: 'Backup-Konzept prüfen', pre: ['A'] },
      { id: 'D', n: 'Rack und USV installieren', pre: ['B'] },
      { id: 'E', n: 'Server umziehen und testen', pre: ['C', 'D'] },
      { id: 'F', n: 'Anwender informieren', pre: ['A'] },
      { id: 'G', n: 'Dokumentation und Abnahme', pre: ['E', 'F'] },
    ],
  },
];

function netz(acts: Act[], dur: Record<string, number>) {
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

function projektMitDauern(rng: Rng, p: { acts: Act[] }, min: number, max: number) {
  for (let t = 0; ; t++) {
    const dur = Object.fromEntries(p.acts.map((a) => [a.id, rng.int(min, max)]));
    const r = netz(p.acts, dur);
    const gps = p.acts.map((a) => r.gp[a.id]);
    if (t > 200 || (gps.some((g) => g === 0) && gps.some((g) => g >= 2))) return { dur, r };
  }
}

const vorgangsTabelle = (acts: Act[], dur: Record<string, number>) =>
  `| Vorgang | Beschreibung | Dauer (Arbeitstage) | Vorgänger |\n|---|---|---|---|\n${acts.map((a) => `| ${a.id} | ${a.n} | ${dur[a.id]} | ${a.pre.length ? a.pre.join(', ') : '–'} |`).join('\n')}`;

/** Gantt-Diagramm als Markdown-Tabelle: █ = Vorgang, ░ = Puffer */
function ganttMd(acts: Act[], dur: Record<string, number>, r: ReturnType<typeof netz>, puffer: boolean) {
  const days = Array.from({ length: r.end }, (_, i) => i + 1);
  const head = `| Vorgang | ${days.join(' | ')} |\n|---|${days.map(() => ':-:').join('|')}|`;
  const rows = acts.map((a) => `| ${a.id} | ${days.map((t) => (t > r.faz[a.id] && t <= r.fez[a.id] ? '█' : puffer && t > r.fez[a.id] && t <= r.sez[a.id] ? '░' : ' ')).join(' | ')} |`);
  return `${head}\n${rows.join('\n')}`;
}

/* ------------------------------------------------------------------ */
/* Gantt-Diagramm ergänzen                                              */
/* ------------------------------------------------------------------ */

const gantt: GeneratorMeta = {
  id: 'w.gantt',
  title: 'Gantt-Diagramm aus einer Vorgangsliste ergänzen',
  skill: 'w.gantt',
  module: 'w05',
  make(rng, d) {
    const p = d === 1 ? PROJEKTE[0] : d === 2 ? PROJEKTE[1] : PROJEKTE[2];
    const { dur, r } = projektMitDauern(rng, p, 1, d === 3 ? 5 : 4);
    const acts = p.acts;
    const cols: TableQuestion['columns'] = [
      { key: 'von', label: 'Balken von Tag', type: 'number' },
      { key: 'bis', label: 'bis Tag', type: 'number' },
    ];
    if (d === 3) cols.push({ key: 'gp', label: 'Puffer (Tage)', type: 'number' });
    const crit = acts.filter((a) => r.gp[a.id] === 0).map((a) => a.id).join(' → ');
    const q: TableQuestion = {
      id: gid('w.gantt'), generated: true, kind: 'table', skill: 'w.gantt', difficulty: d,
      prompt: `Projekt **„${p.name}“** – Vorgangsliste:\n\n${vorgangsTabelle(acts, dur)}\n\nDu zeichnest das **Gantt-Diagramm**. Jeder Vorgang beginnt **so früh wie möglich**. Die Arbeitstage sind durchnummeriert: Der erste Projekttag ist **Tag 1**. Ein Vorgang mit 3 Tagen Dauer, der am Projektstart beginnt, belegt also Tag 1 bis Tag 3.\n\nTrage für jeden Vorgang ein, **von welchem bis zu welchem Tag** sein Balken reicht${d === 3 ? ' und wie viele Tage **Puffer** (Gesamtpuffer) er hat' : ''}.`,
      columns: cols,
      rows: acts.map((a) => ({
        label: `${a.id} (${dur[a.id]} T)`,
        cells: {
          von: { answer: String(r.faz[a.id] + 1) },
          bis: { answer: String(r.fez[a.id]) },
          ...(d === 3 ? { gp: { answer: String(r.gp[a.id]) } } : {}),
        },
      })),
      hints: ['Ein Vorgang kann erst beginnen, wenn **alle** Vorgänger fertig sind: Start = (spätestes Ende der Vorgänger) + 1.', 'Ende = Start + Dauer − 1.'],
      explanation: `**Lösung** (█ = Vorgang${d === 3 ? ', ░ = Puffer' : ''}):\n\n${ganttMd(acts, dur, r, d === 3)}\n\n| Vorgang | von Tag | bis Tag | Puffer |\n|---|---|---|---|\n${acts.map((a) => `| ${a.id} | ${r.faz[a.id] + 1} | ${r.fez[a.id]} | ${r.gp[a.id]} |`).join('\n')}\n\nRechenweg: Start = spätestes Ende aller Vorgänger + 1; Ende = Start + Dauer − 1. Das Projekt dauert **${r.end} Arbeitstage**. Kritischer Pfad (kein Puffer): **${crit}**.\n\nHäufiger Fehler: Bei mehreren Vorgängern nur auf einen schauen – der Nachfolger muss auf den **zuletzt** fertigen Vorgänger warten. Zweiter häufiger Fehler: „bis Tag“ = Start + Dauer (ein Tag zu viel).`,
    };
    return q;
  },
};

/* ------------------------------------------------------------------ */
/* Projekttermine im Kalender und Projektverkürzung                     */
/* ------------------------------------------------------------------ */

/** bundesweite gesetzliche Feiertage 2026/2027, die auf Mo–Fr fallen */
const FEIERTAGE: { d: string; n: string }[] = [
  { d: '2026-01-01', n: 'Neujahr' },
  { d: '2026-04-03', n: 'Karfreitag' },
  { d: '2026-04-06', n: 'Ostermontag' },
  { d: '2026-05-01', n: 'Tag der Arbeit' },
  { d: '2026-05-14', n: 'Christi Himmelfahrt' },
  { d: '2026-05-25', n: 'Pfingstmontag' },
  { d: '2026-12-25', n: '1. Weihnachtstag' },
  { d: '2027-01-01', n: 'Neujahr' },
  { d: '2027-03-26', n: 'Karfreitag' },
  { d: '2027-03-29', n: 'Ostermontag' },
  { d: '2027-05-06', n: 'Christi Himmelfahrt' },
  { d: '2027-05-17', n: 'Pfingstmontag' },
];
const FT = new Set(FEIERTAGE.map((f) => f.d));
const DAY = 86_400_000;
const WT = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
const iso = (t: number) => new Date(t).toISOString().slice(0, 10);
const isWork = (t: number) => { const w = new Date(t).getUTCDay(); return w !== 0 && w !== 6 && !FT.has(iso(t)); };
const fmt = (t: number) => { const x = new Date(t); return `${String(x.getUTCDate()).padStart(2, '0')}.${String(x.getUTCMonth() + 1).padStart(2, '0')}.${x.getUTCFullYear()}`; };
const fmtW = (t: number) => `${WT[new Date(t).getUTCDay()]}, ${fmt(t)}`;
const dateAccept = (t: number) => {
  const x = new Date(t);
  const dd = x.getUTCDate(), mm = x.getUTCMonth() + 1, yy = x.getUTCFullYear();
  const p = (n: number) => String(n).padStart(2, '0');
  return [...new Set([`${p(dd)}.${p(mm)}.${yy}`, `${dd}.${mm}.${yy}`, `${p(dd)}.${p(mm)}.${yy % 100}`, `${dd}.${mm}.${yy % 100}`, `${yy}-${p(mm)}-${p(dd)}`, `${WT[x.getUTCDay()]}, ${p(dd)}.${p(mm)}.${yy}`, `${WT[x.getUTCDay()]} ${p(dd)}.${p(mm)}.${yy}`])];
};
/** letzter Arbeitstag eines Projekts mit n Arbeitstagen, das an Arbeitstag `start` beginnt */
function endDate(start: number, n: number, holidays = true) {
  let t = start, c = 0;
  for (;;) {
    const w = new Date(t).getUTCDay();
    const work = w !== 0 && w !== 6 && (!holidays || !FT.has(iso(t)));
    if (work && ++c === n) return t;
    t += DAY;
  }
}
const nextWork = (t: number) => { let x = t + DAY; while (!isWork(x)) x += DAY; return x; };

const projekttermin: GeneratorMeta = {
  id: 'w.projekttermin',
  title: 'Projekttermine im Kalender bestimmen und Projekte verkürzen',
  skill: 'w.projekttermin',
  module: 'w05',
  make(rng, d) {
    if (d === 3) {
      for (;;) {
        const p = rng.pick(PROJEKTE.slice(1));
        const { dur, r } = projektMitDauern(rng, p, 2, 8);
        const crit = p.acts.filter((a) => r.gp[a.id] === 0 && dur[a.id] >= 3);
        const non = p.acts.filter((a) => r.gp[a.id] > 0 && dur[a.id] >= 3);
        const pool = rng.bool(0.65) ? crit : non;
        if (!pool.length) continue;
        const x = rng.pick(pool);
        const k = rng.int(1, Math.min(dur[x.id] - 1, 3));
        const r2 = netz(p.acts, { ...dur, [x.id]: dur[x.id] - k });
        const ans = r2.end;
        const isCrit = r.gp[x.id] === 0;
        const why = !isCrit
          ? `Vorgang ${x.id} liegt **nicht** auf dem kritischen Pfad (Puffer ${r.gp[x.id]} Tage). Ihn zu verkürzen vergrößert nur seinen Puffer – das Projektende bleibt bei **${r.end} Tagen**.`
          : ans === r.end - k
            ? `Vorgang ${x.id} liegt auf dem kritischen Pfad. Die Verkürzung um ${k} Tag${k > 1 ? 'e' : ''} wirkt voll: ${r.end} − ${k} = **${ans} Tage**.`
            : `Vorgang ${x.id} liegt auf dem kritischen Pfad, aber nach der Verkürzung wird ein **paralleler Weg** kritisch. Das Projekt verkürzt sich deshalb nur auf **${ans} Tage** (nicht auf ${r.end - k}).`;
        return {
          id: gid('w.projekttermin'), generated: true, kind: 'number', skill: 'w.projekttermin', difficulty: d,
          prompt: `Projekt **„${p.name}“**:\n\n${vorgangsTabelle(p.acts, dur)}\n\nDer Kunde wünscht einen früheren Fertigstellungstermin. Durch einen **zusätzlichen Techniker** kann **Vorgang ${x.id}** um **${k} Arbeitstag${k > 1 ? 'e' : ''}** verkürzt werden (neue Dauer ${dur[x.id] - k}).\n\nWie viele **Arbeitstage** dauert das Projekt nach dieser Maßnahme?`,
          answer: ans, unit: 'Tage',
          misconceptions: cleanMc(ans, 0, [
            { answer: String(r.end - k), error: 'w-verkuerzung-pauschal', why: isCrit ? 'Nach der Verkürzung ist ein anderer Weg länger geworden – rechne die Vorwärtsrechnung neu.' : `Vorgang ${x.id} liegt nicht auf dem kritischen Pfad – seine Verkürzung ändert das Projektende nicht.` },
            { answer: String(r.end), error: 'w-verkuerzung-pauschal', why: `Vorgang ${x.id} liegt auf dem kritischen Pfad – seine Verkürzung wirkt sich auf das Projektende aus.` },
          ]),
          hints: ['Bestimme zuerst die ursprüngliche Projektdauer und den kritischen Pfad.', 'Rechne die Vorwärtsrechnung mit der neuen Dauer noch einmal.'],
          explanation: `**Ergebnis: ${ans} Arbeitstage** (vorher ${r.end}).\n\nVorher: kritischer Pfad ${p.acts.filter((a) => r.gp[a.id] === 0).map((a) => a.id).join(' → ')}, Dauer ${r.end} Tage.\nNachher: kritischer Pfad ${p.acts.filter((a) => r2.gp[a.id] === 0).map((a) => a.id).join(' → ')}, Dauer ${ans} Tage.\n\n${why}\n\nMerke: Verkürzen lohnt sich **nur auf dem kritischen Pfad** – und nur so lange, bis ein anderer Weg zum längsten wird. Häufiger Fehler: die Verkürzung einfach vom Projektende abziehen.`,
        };
      }
    }
    if (d === 1) {
      for (;;) {
        // Zeitraum ohne Feiertage: Juni–Oktober 2026 oder Juni–November 2027
        const y = rng.pick([2026, 2027]);
        const s0 = Date.UTC(y, 5, 1) + rng.int(0, 120) * DAY;
        if (!isWork(s0)) continue;
        const n = rng.int(6, 22);
        const end = endDate(s0, n);
        if (FEIERTAGE.some((f) => { const t = Date.parse(f.d + 'T00:00:00Z'); return t >= s0 && t <= end; })) continue;
        const cal = s0 + (n - 1) * DAY;
        const mcs = [
          { answer: fmt(cal), error: 'w-termin-kalendertage', why: 'Du hast Kalendertage gezählt. Am **Wochenende** wird nicht gearbeitet – nur Mo–Fr zählen.' },
          { answer: fmt(nextWork(end)), error: 'w-termin-plus-eins', why: 'Ein Tag zu weit: Der **Starttag zählt als erster Arbeitstag** mit.' },
        ].filter((m) => m.answer !== fmt(end));
        return {
          id: gid('w.projekttermin'), generated: true, kind: 'text', skill: 'w.projekttermin', difficulty: d,
          prompt: `Die Einrichtung neuer Arbeitsplätze bei der Elektro Krämer GmbH dauert laut Netzplan **${n} Arbeitstage**. Das Projekt beginnt am **${fmtW(s0)}** morgens; dieser Tag ist der erste Arbeitstag.\n\nGearbeitet wird **montags bis freitags**; im Zeitraum liegen **keine Feiertage**.\n\nAn welchem **Datum** ist der letzte Projekttag (Übergabe am Abend)? (Format TT.MM.JJJJ)`,
          accept: dateAccept(end), placeholder: 'TT.MM.JJJJ',
          misconceptions: mcs,
          hints: ['Zähle nur Montag bis Freitag. Der Starttag ist Arbeitstag 1.', 'Eine volle Woche hat 5 Arbeitstage.'],
          explanation: `**Ergebnis: ${fmtW(end)}**\n\nVom ${fmtW(s0)} (Arbeitstag 1) an werden ${n} Arbeitstage gezählt, Samstage und Sonntage übersprungen. ${n} Arbeitstage = ${Math.floor(n / 5)} volle Woche${Math.floor(n / 5) === 1 ? '' : 'n'} (${Math.floor(n / 5) * 5} Tage) + ${n % 5} Tag${n % 5 === 1 ? '' : 'e'}.\n\nHäufiger Fehler: Kalendertage statt Arbeitstage zählen (ergäbe den ${fmt(cal)}) oder den Starttag nicht mitzählen (ergäbe den ${fmt(nextWork(end))}).`,
        };
      }
    }
    // d === 2: Netzplan-Dauer + Kalender mit Feiertagen
    for (;;) {
      const p = rng.pick(PROJEKTE);
      const { dur, r } = projektMitDauern(rng, p, 1, 6);
      const h = rng.pick(FEIERTAGE);
      const ht = Date.parse(h.d + 'T00:00:00Z');
      const s0 = ht - rng.int(2, Math.max(3, r.end)) * DAY;
      if (!isWork(s0)) continue;
      const end = endDate(s0, r.end);
      const inRange = FEIERTAGE.filter((f) => { const t = Date.parse(f.d + 'T00:00:00Z'); return t >= s0 && t <= end; });
      if (!inRange.length) continue;
      const noHol = endDate(s0, r.end, false);
      const mcs = [
        { answer: fmt(noHol), error: 'w-termin-feiertag', why: 'Du hast den Feiertag mitgezählt – an Feiertagen wird nicht gearbeitet.' },
        { answer: fmt(nextWork(end)), error: 'w-termin-plus-eins', why: 'Ein Tag zu weit: Der Starttag zählt als erster Arbeitstag mit.' },
        { answer: fmt(s0 + (r.end - 1) * DAY), error: 'w-termin-kalendertage', why: 'Du hast Kalendertage gezählt – Wochenenden und Feiertage zählen nicht.' },
      ].filter((m) => m.answer !== fmt(end));
      return {
        id: gid('w.projekttermin'), generated: true, kind: 'text', skill: 'w.projekttermin', difficulty: d,
        prompt: `Projekt **„${p.name}“**:\n\n${vorgangsTabelle(p.acts, dur)}\n\nDas Projekt startet am **${fmtW(s0)}** morgens (erster Arbeitstag). Gearbeitet wird **Mo–Fr**, nicht an Feiertagen. Feiertage im Projektzeitraum: ${inRange.map((f) => `**${fmtW(Date.parse(f.d + 'T00:00:00Z'))}** (${f.n})`).join(', ')}.\n\nBestimme zuerst die Projektdauer in Arbeitstagen und dann das **Datum des letzten Projekttags** (Übergabetermin). Format TT.MM.JJJJ.`,
        accept: dateAccept(end), placeholder: 'TT.MM.JJJJ',
        misconceptions: mcs,
        hints: ['Projektdauer = längster Weg durch den Netzplan (Vorwärtsrechnung).', 'Dann im Kalender Arbeitstage zählen: Starttag = Tag 1, Wochenenden und Feiertage überspringen.'],
        explanation: `**Ergebnis: ${fmtW(end)}**\n\n1. Vorwärtsrechnung: ${p.acts.map((a) => `${a.id} ${r.faz[a.id]}–${r.fez[a.id]}`).join(' · ')} → Projektdauer **${r.end} Arbeitstage** (kritischer Pfad ${p.acts.filter((a) => r.gp[a.id] === 0).map((a) => a.id).join(' → ')}).\n2. Ab ${fmtW(s0)} ${r.end} Arbeitstage zählen, Wochenenden und ${inRange.map((f) => f.n).join(' und ')} überspringen → **${fmtW(end)}**.\n\nHäufiger Fehler: den Feiertag mitzählen (ergäbe ${fmt(noHol)}).`,
      };
    }
  },
};

/* ------------------------------------------------------------------ */

export const GENERATORS_WIRTSCHAFT_MARKT: GeneratorMeta[] = [kennzahlen, gleichgewicht, marktanteil, abc, gantt, projekttermin];
