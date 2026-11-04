/**
 * Aufgaben-Generatoren für den Fachbereich „IT-Sicherheit, Datenschutz & Datensicherung“.
 * Alle Lösungen werden exakt berechnet; Rundungsregeln stehen im Aufgabentext.
 */
import type { Difficulty, Question, TableQuestion } from '../../content/types';
import type { GeneratorMeta } from '../generators';
import { Rng } from '../rng';
import { grade } from '../grading';

let counter = 0;
const gid = (g: string) => `gen:${g}:${Date.now().toString(36)}${(counter++).toString(36)}`;
const fmtN = (n: number, digits = 2) => n.toLocaleString('de-DE', { maximumFractionDigits: digits });
const r1 = (n: number) => Math.round(n * 10) / 10;
const r2 = (n: number) => Math.round(n * 100) / 100;

/** Fehlbilder entfernen, die zufällig als richtig bewertet würden (nicht für Tabellen). */
function clean<T extends Question>(q: T): T {
  if (q.misconceptions && q.kind !== 'table') {
    const seen = new Set<string>();
    q.misconceptions = q.misconceptions.filter((m) => {
      if (seen.has(m.answer)) return false;
      seen.add(m.answer);
      return !grade(q, m.answer).correct;
    });
  }
  return q;
}

/* ------------------------------------------------------------------ */
/* Datensicherung: Speicherbedarf                                      */
/* ------------------------------------------------------------------ */

const DAYS = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
const ASSUME =
  'Annahme: An jedem Tag werden **andere** Dateien geändert bzw. neu angelegt (keine Datei wird in dieser Woche zweimal geändert); Kompression und Deduplizierung bleiben unberücksichtigt.';

const backupStorage: GeneratorMeta = {
  id: 'sich.backupspeicher',
  title: 'Speicherbedarf von Voll-, inkrementeller und differenzieller Sicherung',
  skill: 'sich.bk.rechnen',
  module: 's03',
  make(rng: Rng, d: Difficulty): Question {
    const full = rng.pick([200, 250, 300, 400, 500, 600, 800]);
    if (d === 1) {
      const n = rng.pick([5, 6]);
      const c = rng.pick([4, 5, 8, 10, 12, 15, 20]);
      const type = rng.pick(['inkrementell', 'differenziell'] as const);
      const sumInk = n * c;
      const sumDiff = (c * n * (n + 1)) / 2;
      const ans = type === 'inkrementell' ? full + sumInk : full + sumDiff;
      const dayList = DAYS.slice(0, n);
      const lines = dayList.map((day, i) => `| ${day} | ${type === 'inkrementell' ? c : c * (i + 1)} GB |`).join('\n');
      return clean({
        id: gid('sich.backupspeicher'), generated: true, kind: 'number', skill: 'sich.bk.rechnen', difficulty: d,
        prompt: `Der Fileserver der Elektro Krämer GmbH wird am **Sonntag** voll gesichert (**${full} GB**). Von ${dayList[0]} bis ${dayList[n - 1]} folgt jeden Abend eine **${type}e** Sicherung. Pro Tag ändern sich **${c} GB** an Daten.\n\n${ASSUME}\n\nWie viel Speicherplatz belegen **alle Sicherungen dieser Woche zusammen** (Vollsicherung + ${n} Teilsicherungen) in **GB**?`,
        answer: ans, unit: 'GB',
        hints: [
          type === 'inkrementell'
            ? 'Inkrementell = nur die Änderungen seit der **letzten Sicherung** (egal welcher Art). Jede Teilsicherung ist also gleich groß.'
            : 'Differenziell = alle Änderungen seit der **letzten Vollsicherung**. Jede Teilsicherung wird größer als die vorige.',
          'Vergiss die Vollsicherung nicht.',
        ],
        misconceptions: [
          { answer: String(type === 'inkrementell' ? full + sumDiff : full + sumInk), error: 'backup-ink-diff-verwechselt', why: type === 'inkrementell' ? 'Du hast differenziell gerechnet (kumuliert). Inkrementell sichert nur die Änderungen seit der letzten Sicherung.' : 'Du hast inkrementell gerechnet. Differenziell sichert jeden Tag **alle** Änderungen seit der Vollsicherung – die Sicherungen wachsen.' },
          { answer: String(type === 'inkrementell' ? sumInk : sumDiff), error: 'backup-vollsicherung-vergessen', why: 'Die Vollsicherung vom Sonntag belegt ebenfalls Speicherplatz.' },
        ],
        explanation:
          `| Tag | Größe der ${type}en Sicherung |\n|---|---|\n${lines}\n\n` +
          (type === 'inkrementell'
            ? `Inkrementell: jeden Tag nur die neuen Änderungen → ${n} · ${c} GB = **${sumInk} GB**.\n\n`
            : `Differenziell: jeden Tag alle Änderungen seit Sonntag → ${dayList.map((_, i) => c * (i + 1)).join(' + ')} = **${sumDiff} GB**.\n\n`) +
          `Gesamt: ${full} GB (Voll) + ${type === 'inkrementell' ? sumInk : sumDiff} GB = **${fmtN(ans)} GB**.`,
      });
    }

    const n = 5;
    const ch = Array.from({ length: n }, () => rng.pick([4, 6, 7, 8, 9, 10, 12, 14, 15, 18]));
    const cum = ch.map((_, i) => ch.slice(0, i + 1).reduce((a, b) => a + b, 0));
    const sumInk = ch.reduce((a, b) => a + b, 0);
    const sumDiff = cum.reduce((a, b) => a + b, 0);
    const changeTable = `| Tag | ${DAYS.slice(0, n).join(' | ')} |\n|---|${'---|'.repeat(n)}\n| geänderte Daten | ${ch.map((x) => `${x} GB`).join(' | ')} |`;

    if (d === 2) {
      const mode = rng.pick(['dayDiff', 'weekDiff', 'weekInk'] as const);
      if (mode === 'dayDiff') {
        const k = rng.int(2, 4); // Index 2..4 → Mittwoch..Freitag
        const ans = cum[k];
        return clean({
          id: gid('sich.backupspeicher'), generated: true, kind: 'number', skill: 'sich.bk.rechnen', difficulty: d,
          prompt: `Sonntag: Vollsicherung (${full} GB). Montag bis Freitag: jeweils abends eine **differenzielle** Sicherung. Die täglich geänderten Datenmengen:\n\n${changeTable}\n\n${ASSUME}\n\nWie groß ist die differenzielle Sicherung am **${DAYS[k]}** in GB?`,
          answer: ans, unit: 'GB',
          hints: ['Differenziell = alle Änderungen seit der letzten **Vollsicherung**.', `Addiere die Änderungen von Montag bis ${DAYS[k]}.`],
          misconceptions: [
            { answer: String(ch[k]), error: 'backup-ink-diff-verwechselt', why: 'Das ist nur die Änderung dieses einen Tages – so groß wäre eine **inkrementelle** Sicherung.' },
            { answer: String(full + ans), error: 'backup-vollsicherung-mitgezaehlt', why: 'Gefragt ist nur die Größe der differenziellen Sicherung, nicht inklusive Vollsicherung.' },
          ],
          explanation: `Die differenzielle Sicherung am ${DAYS[k]} enthält alles, was seit Sonntag geändert wurde:\n\n${ch.slice(0, k + 1).join(' GB + ')} GB = **${ans} GB**`,
        });
      }
      const ink = mode === 'weekInk';
      const ans = full + (ink ? sumInk : sumDiff);
      return clean({
        id: gid('sich.backupspeicher'), generated: true, kind: 'number', skill: 'sich.bk.rechnen', difficulty: d,
        prompt: `Sonntag: Vollsicherung mit **${full} GB**. Montag bis Freitag: jeweils abends eine **${ink ? 'inkrementelle' : 'differenzielle'}** Sicherung. Die täglich geänderten Datenmengen:\n\n${changeTable}\n\n${ASSUME}\n\nWie viel Speicherplatz belegen alle Sicherungen der Woche (Voll + 5 Teilsicherungen) zusammen in GB?`,
        answer: ans, unit: 'GB',
        hints: [ink ? 'Inkrementell: jede Sicherung enthält nur die Änderungen des jeweiligen Tages.' : 'Differenziell: jede Sicherung enthält alle Änderungen seit Sonntag – rechne die kumulierten Werte aus.', 'Vollsicherung dazuzählen.'],
        misconceptions: [
          { answer: String(full + (ink ? sumDiff : sumInk)), error: 'backup-ink-diff-verwechselt', why: ink ? 'Du hast die Werte kumuliert – das wäre differenziell.' : 'Du hast nur die Tagesänderungen addiert – das wäre inkrementell. Differenzielle Sicherungen wachsen von Tag zu Tag.' },
          { answer: String(ink ? sumInk : sumDiff), error: 'backup-vollsicherung-vergessen', why: 'Die Vollsicherung vom Sonntag fehlt.' },
        ],
        explanation: ink
          ? `Inkrementell: ${ch.join(' + ')} = ${sumInk} GB\n\nGesamt: ${full} + ${sumInk} = **${ans} GB**`
          : `Differenzielle Größen (kumuliert): ${cum.map((x, i) => `${DAYS[i]} ${x} GB`).join(', ')}\n\nSumme: ${cum.join(' + ')} = ${sumDiff} GB\n\nGesamt: ${full} + ${sumDiff} = **${ans} GB**`,
      });
    }

    // d === 3: Tabelle beide Strategien
    const q: TableQuestion = {
      id: gid('sich.backupspeicher'), generated: true, kind: 'table', skill: 'sich.bk.rechnen', difficulty: d,
      prompt: `Die IT der Elektro Krämer GmbH vergleicht zwei Sicherungsstrategien für den Fileserver. Sonntag wird jeweils voll gesichert (**${full} GB**), Montag bis Freitag folgt entweder eine inkrementelle **oder** eine differenzielle Sicherung. Geänderte Daten:\n\n${changeTable}\n\n${ASSUME}\n\nTrage die Größe jeder Teilsicherung (in GB) und den Gesamtspeicherbedarf der Woche **inklusive Vollsicherung** ein.`,
      columns: [
        { key: 'ink', label: 'inkrementell (GB)', type: 'number' },
        { key: 'diff', label: 'differenziell (GB)', type: 'number' },
      ],
      rows: [
        ...DAYS.slice(0, n).map((day, i) => ({ label: day, cells: { ink: { answer: String(ch[i]) }, diff: { answer: String(cum[i]) } } })),
        { label: 'Gesamt inkl. Vollsicherung', cells: { ink: { answer: String(full + sumInk) }, diff: { answer: String(full + sumDiff) } } },
      ],
      misconceptions: [
        ...ch.slice(1).map((x, i) => ({ cell: `${i + 1}:diff`, answer: String(x), error: 'backup-ink-diff-verwechselt', why: 'Differenziell sichert alle Änderungen seit der **Vollsicherung** – die Werte müssen kumuliert werden.' })),
        { cell: `${n}:ink`, answer: String(sumInk), error: 'backup-vollsicherung-vergessen', why: 'Die Vollsicherung gehört zum Gesamtspeicherbedarf dazu.' },
        { cell: `${n}:diff`, answer: String(sumDiff), error: 'backup-vollsicherung-vergessen', why: 'Die Vollsicherung gehört zum Gesamtspeicherbedarf dazu.' },
      ],
      hints: ['Inkrementell = Tageswert. Differenziell = laufende Summe seit Sonntag.', 'Gesamt = Vollsicherung + Summe der Spalte.'],
      explanation:
        `| Tag | inkrementell | differenziell |\n|---|---|---|\n${DAYS.slice(0, n).map((day, i) => `| ${day} | ${ch[i]} GB | ${cum[i]} GB |`).join('\n')}\n| Summe Teilsicherungen | ${sumInk} GB | ${sumDiff} GB |\n| **+ Vollsicherung ${full} GB** | **${full + sumInk} GB** | **${full + sumDiff} GB** |\n\n` +
        `**Bewertung:** Inkrementell spart Speicher (${sumDiff - sumInk} GB weniger), aber für eine Wiederherstellung am Freitag brauchst du die Vollsicherung **und alle fünf** Inkremente in richtiger Reihenfolge. Differenziell braucht nur Vollsicherung + **letzte** differenzielle Sicherung.`,
    };
    return q;
  },
};

/* ------------------------------------------------------------------ */
/* Datensicherung: Dauer                                               */
/* ------------------------------------------------------------------ */

const backupDuration: GeneratorMeta = {
  id: 'sich.backupdauer',
  title: 'Dauer einer Datensicherung berechnen',
  skill: 'sich.bk.rechnen',
  module: 's03',
  make(rng: Rng, d: Difficulty): Question {
    if (d === 1) {
      const gb = rng.pick([150, 240, 300, 450, 600, 720, 900]);
      const rate = rng.pick([100, 120, 150, 200, 250, 300]);
      const sec = (gb * 1000) / rate;
      const min = sec / 60;
      const ans = Math.round(min);
      return clean({
        id: gid('sich.backupdauer'), generated: true, kind: 'number', skill: 'sich.bk.rechnen', difficulty: d,
        prompt: `Eine Vollsicherung von **${gb} GB** wird auf eine USB-Festplatte geschrieben, die dauerhaft **${rate} MB/s** schafft. Wie lange dauert die Sicherung in **Minuten**? (1 GB = 1000 MB; auf ganze Minuten runden)`,
        answer: ans, tolerance: 1, unit: 'min',
        hints: ['t = Datenmenge / Datenrate (beide in MB bzw. MB/s).', 'Sekunden durch 60 teilen.'],
        misconceptions: [
          { answer: String(Math.round(sec)), error: 'einheit-sekunden-minuten', why: 'Das ist die Zeit in Sekunden – teile noch durch 60.' },
          { answer: String(Math.round((gb * 1024) / rate / 60)), error: 'einheit-1000-1024', why: 'Laut Aufgabe gilt 1 GB = 1000 MB.' },
          { answer: String(Math.round((gb * 1000 * 8) / rate / 60)), error: 'einheit-bit-byte', why: 'Die Rate ist bereits in **MB/s** (Byte) angegeben – hier nicht mit 8 multiplizieren.' },
        ],
        explanation: `${gb} GB = ${fmtN(gb * 1000)} MB\n\nt = ${fmtN(gb * 1000)} MB / ${rate} MB/s = ${fmtN(sec)} s\n\n${fmtN(sec)} s / 60 = ${fmtN(min)} min ≈ **${ans} min**`,
      });
    }
    const tb = rng.pick([0.8, 1.2, 1.5, 2, 2.4, 3, 4.5]);
    const rate = d === 2 ? rng.pick([1000, 2500, 10000]) : rng.pick([1000, 2500]);
    const eff = d === 3 ? rng.pick([70, 75, 80]) : 100;
    const effRate = (rate * eff) / 100;
    const mbit = tb * 1e6 * 8;
    const sec = mbit / effRate;
    const min = sec / 60;
    const ans = Math.round(min);
    const window = rng.pick([4, 6, 8]);
    const tbS = String(tb).replace('.', ',');
    const rateS = rate >= 1000 ? `${String(rate / 1000).replace('.', ',')} Gbit/s` : `${rate} Mbit/s`;
    return clean({
      id: gid('sich.backupdauer'), generated: true, kind: 'number', skill: 'sich.bk.rechnen', difficulty: d,
      prompt:
        `Die Elektro Krämer GmbH sichert nachts **${tbS} TB** vom Fileserver über das Netzwerk (**${rateS}**) auf ein NAS am anderen Brandabschnitt.` +
        (d === 3 ? ` Durch Protokoll-Overhead und Last stehen erfahrungsgemäß nur **${eff} %** der Bandbreite für Nutzdaten zur Verfügung. Das Backupfenster beträgt ${window} Stunden.` : '') +
        ` Wie lange dauert die Übertragung in **Minuten**? (Dezimalpräfixe: 1 TB = 1000 GB = 1.000.000 MB; 1 Gbit/s = 1000 Mbit/s; auf ganze Minuten runden)`,
      answer: ans, tolerance: 1, unit: 'min',
      hints: ['Datenmenge in Mbit umrechnen: TB → MB (· 1.000.000) → Mbit (· 8).', d === 3 ? `Nutzbare Rate = ${fmtN(rate)} Mbit/s · ${fmtN(eff / 100)}.` : 't = Mbit / (Mbit/s) → Sekunden → durch 60.'],
      misconceptions: [
        { answer: String(Math.round((tb * 1e6) / effRate / 60)), error: 'einheit-bit-byte', why: 'Byte → Bit vergessen (· 8). Netzwerk-Datenraten werden in **Bit** pro Sekunde angegeben.' },
        { answer: String(Math.round(sec)), error: 'einheit-sekunden-minuten', why: 'Das ist die Zeit in Sekunden – teile noch durch 60.' },
        ...(d === 3 ? [{ answer: String(Math.round(mbit / rate / 60)), error: 'overhead-vergessen', why: `Die nutzbare Datenrate beträgt nur ${eff} % der Nennrate.` }] : []),
        { answer: String(Math.round((tb * 1024 * 1024 * 8) / effRate / 60)), error: 'einheit-1000-1024', why: 'Laut Aufgabe gelten Dezimalpräfixe (Faktor 1000).' },
      ],
      explanation:
        `Datenmenge: ${tbS} TB = ${fmtN(tb * 1e6)} MB · 8 = **${fmtN(mbit)} Mbit**\n\n` +
        (d === 3 ? `Nutzbare Rate: ${fmtN(rate)} Mbit/s · ${fmtN(eff / 100)} = **${fmtN(effRate)} Mbit/s**\n\n` : '') +
        `t = ${fmtN(mbit)} Mbit / ${fmtN(effRate)} Mbit/s = ${fmtN(sec)} s = ${fmtN(min)} min ≈ **${ans} min** (≈ ${fmtN(min / 60)} h)` +
        (d === 3 ? `\n\n**Backupfenster:** ${window} h = ${window * 60} min → die Sicherung ${min <= window * 60 ? '**passt** hinein' : '**passt nicht** hinein – Lösung: inkrementelle/differenzielle Sicherung unter der Woche, schnellere Anbindung oder Sicherung über das Wochenende'}.` : ''),
    });
  },
};

/* ------------------------------------------------------------------ */
/* Risiko = Eintrittswahrscheinlichkeit × Schadenshöhe                 */
/* ------------------------------------------------------------------ */

const THREATS = [
  'Ransomware-Befall der Server',
  'Hardwareausfall des Fileservers',
  'Phishing mit Übernahme eines Mailkontos',
  'Wasserschaden im Serverraum',
  'Diebstahl eines Außendienst-Notebooks',
  'DDoS-Angriff auf den Webshop',
  'Versehentliches Löschen von Projektdaten',
  'Stromausfall länger als 1 Stunde',
  'Brand im Lager mit Netzwerkverteiler',
];
const PROBS = [2, 5, 10, 20, 25, 40, 50, 80];
const DAMAGES = [2000, 5000, 8000, 12000, 20000, 40000, 60000, 100000, 150000, 250000];

const riskGen: GeneratorMeta = {
  id: 'sich.risiko',
  title: 'Risikowert berechnen und Risiken priorisieren',
  skill: 'sich.risiko',
  module: 's01',
  make(rng: Rng, d: Difficulty): Question {
    const count = d === 1 ? 1 : d === 2 ? 3 : rng.pick([4, 5]);
    let items: { t: string; p: number; s: number; r: number }[] = [];
    for (let attempt = 0; attempt < 50; attempt++) {
      const names = rng.shuffle(THREATS).slice(0, count);
      items = names.map((t) => {
        const p = rng.pick(PROBS);
        const s = rng.pick(DAMAGES);
        return { t, p, s, r: (s * p) / 100 };
      });
      if (new Set(items.map((x) => x.r)).size === count) break;
    }
    const euro = (n: number) => `${n.toLocaleString('de-DE')} €`;
    if (d === 1) {
      const x = items[0];
      return clean({
        id: gid('sich.risiko'), generated: true, kind: 'number', skill: 'sich.risiko', difficulty: d,
        prompt: `Für die Bedrohung **„${x.t}“** schätzt die IT der Elektro Krämer GmbH eine Eintrittswahrscheinlichkeit von **${x.p} % pro Jahr** und eine Schadenshöhe von **${euro(x.s)}** pro Eintritt. Berechne den Risikowert (erwarteter Schaden pro Jahr) in **€**.`,
        answer: x.r, unit: '€', tolerance: 0.01,
        hints: ['Risiko = Eintrittswahrscheinlichkeit × Schadenshöhe.', `${x.p} % = ${x.p / 100}`],
        misconceptions: [
          { answer: String(x.s * x.p), error: 'risiko-prozent', why: 'Prozentwerte erst durch 100 teilen: ' + `${x.p} % = ${x.p / 100}.` },
          { answer: String(x.s + x.p), error: 'risiko-formel', why: 'Wahrscheinlichkeit und Schaden werden **multipliziert**, nicht addiert.' },
        ],
        explanation: `Risiko = Eintrittswahrscheinlichkeit × Schadenshöhe = ${fmtN(x.p / 100)} × ${euro(x.s)} = **${euro(x.r)} pro Jahr**.\n\nDer Wert ist ein Erwartungswert: Er zeigt, wie viel man pro Jahr für Schutzmaßnahmen gegen diese Bedrohung „vernünftigerweise“ ausgeben kann, und dient dem Vergleich mit anderen Risiken.`,
      });
    }
    const sorted = [...items].sort((a, b) => b.r - a.r);
    const rank = (x: (typeof items)[number]) => sorted.indexOf(x) + 1;
    const withRank = d === 3;
    const q: TableQuestion = {
      id: gid('sich.risiko'), generated: true, kind: 'table', skill: 'sich.risiko', difficulty: d,
      prompt:
        `Bei der Risikoanalyse der Elektro Krämer GmbH wurden folgende Bedrohungen bewertet:\n\n| Bedrohung | Eintrittswahrscheinlichkeit pro Jahr | Schadenshöhe je Eintritt |\n|---|---|---|\n${items.map((x) => `| ${x.t} | ${x.p} % | ${euro(x.s)} |`).join('\n')}\n\n` +
        `Berechne für jede Bedrohung den **Risikowert in € pro Jahr**${withRank ? ' und lege die **Rangfolge** fest (1 = höchstes Risiko, zuerst behandeln)' : ''}.`,
      columns: [
        { key: 'r', label: 'Risiko (€/Jahr)', type: 'number' },
        ...(withRank ? [{ key: 'rank', label: 'Rang', type: 'number' as const }] : []),
      ],
      rows: items.map((x) => ({ label: x.t, cells: { r: { answer: String(x.r) }, ...(withRank ? { rank: { answer: String(rank(x)) } } : {}) } })),
      misconceptions: items.map((x, i) => ({ cell: `${i}:r`, answer: String(x.s * x.p), error: 'risiko-prozent', why: 'Prozentwert durch 100 teilen, bevor du multiplizierst.' })),
      hints: ['Risiko = Wahrscheinlichkeit (als Dezimalzahl) × Schaden.', 'Für die Rangfolge die Risikowerte absteigend sortieren.'],
      explanation:
        `| Bedrohung | Rechnung | Risiko | Rang |\n|---|---|---|---|\n${items.map((x) => `| ${x.t} | ${fmtN(x.p / 100)} × ${euro(x.s)} | **${euro(x.r)}** | ${rank(x)} |`).join('\n')}\n\n` +
        `Am dringendsten ist **„${sorted[0].t}“**. Beachte: Ein seltenes Ereignis mit sehr hohem Schaden kann ein größeres Risiko sein als ein häufiges mit kleinem Schaden. Für jedes Risiko wird dann entschieden: **vermeiden, reduzieren, übertragen (z. B. Versicherung) oder bewusst akzeptieren**.`,
    };
    return q;
  },
};

/* ------------------------------------------------------------------ */
/* Schutzbedarf nach dem Maximumprinzip                                */
/* ------------------------------------------------------------------ */

const LV = ['normal', 'hoch', 'sehr hoch'] as const;
const accLv = (i: number) => (i === 2 ? ['sehr-hoch', 'sehrhoch', 'sh'] : i === 1 ? ['h'] : ['n']);
const APPS: { name: string; v: number; i: number; a: number }[] = [
  { name: 'Personalverwaltung', v: 2, i: 1, a: 0 },
  { name: 'Finanzbuchhaltung', v: 1, i: 2, a: 1 },
  { name: 'Warenwirtschaft (ERP)', v: 1, i: 1, a: 2 },
  { name: 'Webshop-Datenbank', v: 1, i: 1, a: 1 },
  { name: 'E-Mail-Server', v: 1, i: 0, a: 1 },
  { name: 'Intranet-Wiki', v: 0, i: 0, a: 0 },
  { name: 'Druckserver', v: 0, i: 0, a: 0 },
  { name: 'Zeiterfassung', v: 1, i: 1, a: 0 },
  { name: 'CAD-Projektablage', v: 1, i: 1, a: 0 },
  { name: 'Telefonanlage (VoIP)', v: 0, i: 0, a: 1 },
];

const maxGen: GeneratorMeta = {
  id: 'sich.maximum',
  title: 'Schutzbedarf von IT-Systemen nach dem Maximumprinzip',
  skill: 'sich.schutzbedarf',
  module: 's01',
  make(rng: Rng, d: Difficulty): Question {
    const nServers = d === 1 ? 2 : 3;
    const nApps = d === 1 ? 3 : d === 2 ? 5 : 6;
    let apps: typeof APPS = [];
    let assign: number[][] = [];
    for (let attempt = 0; attempt < 50; attempt++) {
      apps = rng.shuffle(APPS).slice(0, nApps);
      assign = Array.from({ length: nServers }, () => [] as number[]);
      apps.forEach((_, ai) => assign[ai < nServers ? ai : rng.int(0, nServers - 1)].push(ai));
      // mindestens ein Server mit gemischten Stufen, damit das Maximumprinzip sichtbar wird
      const mixed = assign.some((list) => list.length > 1 && (['v', 'i', 'a'] as const).some((k) => new Set(list.map((ai) => apps[ai][k])).size > 1));
      if (mixed) break;
    }
    const serverNames = rng.shuffle(['SRV-HH-01', 'SRV-HH-02', 'SRV-HH-03', 'SRV-HH-04']).slice(0, nServers).sort();
    const levels = assign.map((list) => ({
      v: Math.max(...list.map((ai) => apps[ai].v)),
      i: Math.max(...list.map((ai) => apps[ai].i)),
      a: Math.max(...list.map((ai) => apps[ai].a)),
    }));
    const mins = assign.map((list) => ({
      v: Math.min(...list.map((ai) => apps[ai].v)),
      i: Math.min(...list.map((ai) => apps[ai].i)),
      a: Math.min(...list.map((ai) => apps[ai].a)),
    }));
    const room = { v: Math.max(...levels.map((l) => l.v)), i: Math.max(...levels.map((l) => l.i)), a: Math.max(...levels.map((l) => l.a)) };
    const cell = (x: number) => ({ answer: LV[x], accept: accLv(x) });
    const rows = levels.map((l, si) => ({ label: `${serverNames[si]} (${assign[si].map((ai) => apps[ai].name).join(', ')})`, cells: { v: cell(l.v), i: cell(l.i), a: cell(l.a) } }));
    if (d === 3) rows.push({ label: 'Serverraum Hamburg (enthält alle Server)', cells: { v: cell(room.v), i: cell(room.i), a: cell(room.a) } });
    const misc: NonNullable<Question['misconceptions']> = [];
    mins.forEach((m, si) => {
      (['v', 'i', 'a'] as const).forEach((k) => {
        if (m[k] !== levels[si][k]) misc.push({ cell: `${si}:${k}`, answer: LV[m[k]], error: 'maximumprinzip', why: 'Nach dem **Maximumprinzip** bestimmt die Anwendung mit dem **höchsten** Schutzbedarf den Schutzbedarf des Systems – nicht die niedrigste oder eine „mittlere“ Stufe.' });
      });
    });
    const q: TableQuestion = {
      id: gid('sich.maximum'), generated: true, kind: 'table', skill: 'sich.schutzbedarf', difficulty: d,
      prompt:
        `Für die Elektro Krämer GmbH wurde der Schutzbedarf der Anwendungen bereits festgestellt (V = Vertraulichkeit, I = Integrität, A = Verfügbarkeit):\n\n| Anwendung | V | I | A | läuft auf |\n|---|---|---|---|---|\n${apps.map((ap, ai) => `| ${ap.name} | ${LV[ap.v]} | ${LV[ap.i]} | ${LV[ap.a]} | ${serverNames[assign.findIndex((l) => l.includes(ai))]} |`).join('\n')}\n\n` +
        `Bestimme den Schutzbedarf ${d === 3 ? 'der Server und des Serverraums' : 'der Server'} je Grundwert nach dem **Maximumprinzip** (ohne Kumulations- oder Verteilungseffekte). Trage jeweils **normal**, **hoch** oder **sehr hoch** ein.`,
      columns: [
        { key: 'v', label: 'Vertraulichkeit', type: 'text' },
        { key: 'i', label: 'Integrität', type: 'text' },
        { key: 'a', label: 'Verfügbarkeit', type: 'text' },
      ],
      rows,
      misconceptions: misc,
      hints: ['Betrachte jeden Grundwert (V, I, A) **getrennt**.', 'Pro Server: höchste Stufe aller darauf laufenden Anwendungen übernehmen.'],
      explanation:
        `**Maximumprinzip:** Ein IT-System erbt je Grundwert den **höchsten** Schutzbedarf der Anwendungen, die es nutzt – denn ein Schaden am System trifft alle Anwendungen darauf.\n\n| System | V | I | A |\n|---|---|---|---|\n${levels.map((l, si) => `| ${serverNames[si]} | ${LV[l.v]} | ${LV[l.i]} | ${LV[l.a]} |`).join('\n')}` +
        (d === 3 ? `\n| Serverraum | ${LV[room.v]} | ${LV[room.i]} | ${LV[room.a]} |\n\nDer **Raum** erbt wiederum das Maximum aller Systeme, die darin stehen.` : '') +
        `\n\nIn der Praxis wird das Ergebnis anschließend noch auf **Kumulationseffekt** (viele kleine Schäden summieren sich → höher) und **Verteilungseffekt** (Anwendung redundant verteilt → evtl. niedriger) geprüft und begründet.`,
    };
    return q;
  },
};

/* ------------------------------------------------------------------ */
/* Brute Force: Kombinationen und Dauer                               */
/* ------------------------------------------------------------------ */

function timeUnit(sec: number): { v: number; u: string; f: string } {
  if (sec < 120) return { v: sec, u: 's', f: 'Sekunden' };
  if (sec < 7200) return { v: sec / 60, u: 'min', f: 'Minuten' };
  if (sec < 172800) return { v: sec / 3600, u: 'h', f: 'Stunden' };
  if (sec < 2 * 365 * 86400) return { v: sec / 86400, u: 'Tage', f: 'Tagen' };
  return { v: sec / (365 * 86400), u: 'Jahre', f: 'Jahren' };
}
/** Große Zahlen: exakt, solange sicher darstellbar, sonst wissenschaftliche Schreibweise. */
function big(n: number): string {
  if (Number.isSafeInteger(n)) return n.toLocaleString('de-DE');
  if (n < 1e12) return fmtN(n, 1);
  const e = Math.floor(Math.log10(n));
  return `≈ ${(n / 10 ** e).toLocaleString('de-DE', { maximumFractionDigits: 3 })} · 10^${e}`;
}
const unitDiv: Record<string, string> = { s: '', min: ' / 60', h: ' / 3.600', Tage: ' / 86.400', Jahre: ' / (86.400 · 365)' };

const pwGen: GeneratorMeta = {
  id: 'sich.pwbrute',
  title: 'Passwortkombinationen und Brute-Force-Dauer berechnen',
  skill: 'sich.auth.passwort',
  module: 's04',
  make(rng: Rng, d: Difficulty): Question {
    if (d === 1) {
      const t = rng.pick([
        { desc: 'eine **PIN aus Ziffern** (0–9)', z: 10, l: rng.pick([4, 5, 6]) },
        { desc: 'ein Passwort nur aus **Kleinbuchstaben** a–z (26 Zeichen, ohne Umlaute)', z: 26, l: rng.pick([3, 4]) },
        { desc: 'ein Code aus **Kleinbuchstaben und Ziffern** (26 + 10 = 36 Zeichen)', z: 36, l: rng.pick([3, 4]) },
      ]);
      const ans = t.z ** t.l;
      return clean({
        id: gid('sich.pwbrute'), generated: true, kind: 'number', skill: 'sich.auth.passwort', difficulty: d,
        prompt: `Wie viele verschiedene Kombinationen gibt es für ${t.desc} mit genau **${t.l} Stellen**?`,
        answer: ans,
        hints: ['Kombinationen = Zeichenvorrat ^ Länge.', `Hier: ${t.z}^${t.l}`],
        misconceptions: [
          { answer: String(t.l ** t.z), error: 'pw-formel-vertauscht', why: 'Basis und Exponent vertauscht: Es heißt Zeichenvorrat **hoch** Länge.' },
          { answer: String(t.z * t.l), error: 'pw-multipliziert', why: 'Für jede Stelle gibt es alle Zeichen erneut – das ergibt eine Potenz, kein Produkt.' },
        ],
        explanation: `Jede der ${t.l} Stellen kann ${t.z} Werte annehmen: ${Array(t.l).fill(t.z).join(' · ')} = ${t.z}^${t.l} = **${ans.toLocaleString('de-DE')}** Kombinationen.`,
      });
    }
    const sets = [
      { desc: 'nur Kleinbuchstaben', z: 26, parts: [26] },
      { desc: 'Groß- und Kleinbuchstaben', z: 52, parts: [26, 26] },
      { desc: 'Groß- und Kleinbuchstaben sowie Ziffern', z: 62, parts: [26, 26, 10] },
      { desc: 'Groß- und Kleinbuchstaben, Ziffern und 32 Sonderzeichen', z: 94, parts: [26, 26, 10, 32] },
    ];
    let s = sets[0];
    let l = 6;
    let rate = 1e9;
    let sec = 0;
    for (let attempt = 0; attempt < 100; attempt++) {
      s = rng.pick(sets);
      l = rng.int(6, 10);
      rate = rng.pick([1e8, 1e9, 1e10, 1e11]);
      sec = s.z ** l / rate / (d === 3 ? 2 : 1);
      const tu = timeUnit(sec);
      if (sec >= 10 && !(tu.u === 'Jahre' && tu.v > 1e6)) break;
    }
    const tu = timeUnit(sec);
    const ans = r1(tu.v);
    const combos = s.z ** l;
    const rateS = rate.toLocaleString('de-DE');
    const worst = timeUnit(combos / rate);
    const avgNote = d === 3;
    return clean({
      id: gid('sich.pwbrute'), generated: true, kind: 'number', skill: 'sich.auth.passwort', difficulty: d,
      prompt:
        (avgNote
          ? `Ein Angreifer hat den Passwort-Hash eines Kontos erbeutet und probiert offline mit einer Grafikkarte **${rateS} Passwörter pro Sekunde**. Das Passwort ist **${l} Zeichen** lang und besteht aus **${s.desc}** (keine Umlaute, 26 Buchstaben je Alphabet). Wie lange dauert es **im Durchschnitt** (= nach der Hälfte aller Kombinationen), bis das Passwort gefunden ist?`
          : `Ein Angreifer probiert offline **${rateS} Passwörter pro Sekunde**. Das Passwort hat **${l} Zeichen** aus einem Zeichenvorrat von **${s.z} Zeichen** (${s.desc}). Wie lange dauert es **höchstens**, alle Kombinationen durchzuprobieren?`) +
        ` Gib das Ergebnis in **${tu.f}** an (1 Jahr = 365 Tage; auf eine Nachkommastelle runden).`,
      answer: ans, tolerance: Math.max(0.1, ans * 0.005), unit: tu.u,
      hints: [avgNote ? `Zeichenvorrat: ${s.parts.join(' + ')} = ${s.z}.` : 'Kombinationen = Zeichenvorrat ^ Länge.', `Zeit = Kombinationen / Versuche pro Sekunde${avgNote ? ' / 2' : ''}, danach in ${tu.f} umrechnen.`],
      misconceptions: avgNote
        ? [{ answer: String(r1(tu.v * 2)), error: 'pw-durchschnitt', why: 'Das ist die **maximale** Zeit. Im Durchschnitt ist das Passwort nach der Hälfte der Kombinationen gefunden.' }]
        : tu.u !== 's' ? [{ answer: String(r1(sec)), error: 'einheit-sekunden-minuten', why: `Das ist die Zeit in Sekunden – rechne noch in ${tu.f} um.` }] : [],
      explanation:
        (avgNote ? `Zeichenvorrat: ${s.parts.join(' + ')} = **${s.z}**\n\n` : '') +
        `Kombinationen: ${s.z}^${l} = ${big(combos)}\n\n` +
        `Maximale Dauer: ${big(combos)} / ${rateS} = ${big(combos / rate)} s (≈ ${fmtN(worst.v, 1)} ${worst.u})\n\n` +
        (avgNote ? `Durchschnitt: Hälfte davon = ${big(sec)} s\n\n` : '') +
        `Umrechnung: ${big(sec)} s${unitDiv[tu.u]} = **${fmtN(ans, 1)} ${tu.u}**\n\n` +
        `**Merke:** Jedes zusätzliche Zeichen vervielfacht die Dauer um den Faktor ${s.z}. Die **Länge** bringt mehr als komplizierte Regeln – deshalb empfiehlt das BSI lange Passwörter bzw. Passphrasen.`,
    });
  },
};

/* ------------------------------------------------------------------ */
/* DSGVO: Bußgeldrahmen                                                */
/* ------------------------------------------------------------------ */

const VIOLATIONS_5 = [
  'Kundendaten werden ohne Rechtsgrundlage (Art. 6) für Werbung weiterverkauft.',
  'Ein Auskunftsersuchen nach Art. 15 wird monatelang ignoriert.',
  'Gesundheitsdaten von Beschäftigten werden ohne Rechtsgrundlage (Art. 9) ausgewertet.',
  'Daten werden entgegen dem Grundsatz der Speicherbegrenzung (Art. 5) jahrelang grundlos aufbewahrt.',
];
const VIOLATIONS_4 = [
  'Mit dem externen Lohnabrechner wurde kein Auftragsverarbeitungsvertrag (Art. 28) geschlossen.',
  'Eine Datenpanne wurde der Aufsichtsbehörde nicht innerhalb von 72 Stunden gemeldet (Art. 33).',
  'Es fehlen angemessene technische und organisatorische Maßnahmen (Art. 32).',
  'Es wurde kein Verzeichnis von Verarbeitungstätigkeiten (Art. 30) geführt.',
];

const fineGen: GeneratorMeta = {
  id: 'sich.bussgeld',
  title: 'DSGVO-Bußgeldrahmen (Art. 83) berechnen',
  skill: 'sich.ds.organisation',
  module: 's02',
  make(rng: Rng, d: Difficulty): Question {
    const umsatz = rng.pick([30, 60, 120, 250, 400, 450, 600, 900, 1500, 2400]); // Mio €
    const high = d === 1 ? true : rng.bool();
    const pct = high ? 4 : 2;
    const fix = high ? 20 : 10;
    const p = r2((umsatz * pct) / 100);
    const ans = Math.max(fix, p);
    const viol = rng.pick(high ? VIOLATIONS_5 : VIOLATIONS_4);
    const rule = `bis zu **${fix} Mio. €** oder **${pct} %** des weltweiten Jahresumsatzes des vorangegangenen Geschäftsjahres – je nachdem, welcher Betrag **höher** ist`;
    const prompt =
      d === 3
        ? `Ein Unternehmen mit **${umsatz.toLocaleString('de-DE')} Mio. €** weltweitem Jahresumsatz im Vorjahr begeht folgenden Verstoß: *${viol}*\n\nOrdne den Verstoß der richtigen Bußgeldstufe von Art. 83 DSGVO zu (Abs. 4: 10 Mio. € / 2 % – Abs. 5: 20 Mio. € / 4 %) und berechne den **maximal möglichen Bußgeldrahmen in Mio. €**.`
        : `Gegen ein Unternehmen mit **${umsatz.toLocaleString('de-DE')} Mio. €** weltweitem Jahresumsatz im Vorjahr wird wegen eines Verstoßes nach **Art. 83 Abs. ${high ? 5 : 4} DSGVO** ermittelt. Der Rahmen beträgt ${rule}. Wie hoch ist der **maximal mögliche Bußgeldrahmen in Mio. €**?`;
    return clean({
      id: gid('sich.bussgeld'), generated: true, kind: 'number', skill: 'sich.ds.organisation', difficulty: d,
      prompt,
      answer: ans, tolerance: 0.01, unit: 'Mio. €',
      hints: [`${pct} % von ${umsatz} Mio. € berechnen.`, `Mit dem Festbetrag ${fix} Mio. € vergleichen – der **höhere** Wert ist die Obergrenze.`],
      misconceptions: [
        ...(p !== fix ? [{ answer: String(Math.min(fix, p)), error: 'bussgeld-niedriger-wert', why: 'Es gilt der **höhere** der beiden Beträge.' }] : []),
        ...(d === 3 ? [{ answer: String(Math.max(high ? 10 : 20, r2((umsatz * (high ? 2 : 4)) / 100))), error: 'bussgeld-stufe', why: high ? 'Verstöße gegen Grundsätze, Rechtsgrundlagen und Betroffenenrechte (Art. 5–7, 9, 12–22) fallen unter Abs. 5 (20 Mio. € / 4 %).' : 'Verstöße gegen Pflichten wie Art. 28, 30, 32, 33 fallen unter Abs. 4 (10 Mio. € / 2 %).' }] : []),
      ],
      explanation:
        (d === 3 ? `**Stufe:** ${high ? 'Verstoß gegen Grundsätze/Rechtsgrundlagen/Betroffenenrechte → Art. 83 **Abs. 5**' : 'Verstoß gegen Pflichten des Verantwortlichen (Art. 25–39) → Art. 83 **Abs. 4**'}.\n\n` : '') +
        `${pct} % von ${umsatz.toLocaleString('de-DE')} Mio. € = **${fmtN(p)} Mio. €**\n\nVergleich mit dem Festbetrag ${fix} Mio. € → der höhere Wert gilt: **${fmtN(ans)} Mio. €**.\n\n` +
        `Wichtig: Das ist nur die **Obergrenze**. Die tatsächliche Höhe legt die Aufsichtsbehörde nach den Kriterien von Art. 83 Abs. 2 fest (Schwere, Dauer, Vorsatz, Zusammenarbeit, getroffene Maßnahmen …). Bußgelder sollen „wirksam, verhältnismäßig und abschreckend“ sein.`,
    });
  },
};

export const GENERATORS_SICHERHEIT: GeneratorMeta[] = [riskGen, maxGen, fineGen, backupStorage, backupDuration, pwGen];
