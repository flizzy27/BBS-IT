/**
 * Aufgaben-Generatoren für „Netzwerk Teil B“ (m09 Routing, m15 Netzwerkberechnungen).
 * Alle Lösungen werden exakt berechnet; Konventionen (GB/GiB, Rundung) stehen im Aufgabentext.
 */
import type { Question } from '../../content/types';
import type { GeneratorMeta } from '../generators';
import { Rng } from '../rng';
import { grade } from '../grading';
import { formatIp, networkAddress, toBinary8 } from '../ipv4';

let counter = 0;
const gid = (g: string) => `gen:${g}:${Date.now().toString(36)}${(counter++).toString(36)}`;
const de = (n: number, digits = 2) => n.toLocaleString('de-DE', { maximumFractionDigits: digits });
const r1 = (n: number) => Math.round(n * 10) / 10;
const r2 = (n: number) => Math.round(n * 100) / 100;
/** auf zwei Nachkommastellen aufrunden (Mindestwert), robust gegen Gleitkomma-Rauschen */
const ceil2 = (n: number) => Math.ceil(n * 100 - 1e-7) / 100;

/** Fehlbilder entfernen, die doppelt sind oder zufällig als richtig bewertet würden. */
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
/* m09: Routen zusammenfassen (Supernetting)                           */
/* ------------------------------------------------------------------ */

/** Zerlegt einen Block zufällig in ausgerichtete Teilnetze (für Stufe 3). */
function partition(rng: Rng, net: number, prefix: number, maxPrefix: number, depth = 0): { net: number; prefix: number }[] {
  const mustSplit = depth === 0;
  if (prefix < maxPrefix && (mustSplit || rng.bool(0.55))) {
    const half = 2 ** (32 - prefix - 1);
    return [...partition(rng, net, prefix + 1, maxPrefix, depth + 1), ...partition(rng, (net + half) >>> 0, prefix + 1, maxPrefix, depth + 1)];
  }
  return [{ net, prefix }];
}

const supernetGen: GeneratorMeta = {
  id: 'routing.supernet',
  title: 'Routen zusammenfassen (Supernetting)',
  skill: 'routing.aggregate',
  module: 'm09',
  make(rng, d) {
    let nets: { net: number; prefix: number }[] = [];
    let sumNet = 0;
    let sumPrefix = 0;
    for (let tries = 0; tries < 50; tries++) {
      if (d === 1) {
        const count = rng.pick([2, 4]);
        const third = count * rng.int(0, 256 / count - 1);
        sumNet = (192 * 2 ** 24 + 168 * 2 ** 16 + third * 256) >>> 0;
        sumPrefix = 24 - Math.log2(count);
        nets = Array.from({ length: count }, (_, i) => ({ net: sumNet + i * 256, prefix: 24 }));
      } else if (d === 2) {
        const count = rng.pick([4, 8]);
        const third = count * rng.int(0, 256 / count - 1);
        const first = rng.bool() ? 10 * 2 ** 24 + rng.int(1, 254) * 2 ** 16 : 172 * 2 ** 24 + rng.int(16, 31) * 2 ** 16;
        sumNet = (first + third * 256) >>> 0;
        sumPrefix = 24 - Math.log2(count);
        nets = Array.from({ length: count }, (_, i) => ({ net: sumNet + i * 256, prefix: 24 }));
      } else {
        sumPrefix = rng.pick([21, 22, 23, 24, 25]);
        const size = 2 ** (32 - sumPrefix);
        const base = rng.bool() ? 10 * 2 ** 24 + rng.int(1, 254) * 2 ** 16 : 172 * 2 ** 24 + rng.int(16, 31) * 2 ** 16;
        sumNet = (base + size * rng.int(0, 2 ** 16 / size - 1)) >>> 0;
        // bis /23: Teilnetze höchstens /24 (Unterschied im 3. Oktett), ab /24: Teilnetze bis /28 (4. Oktett)
        nets = partition(rng, sumNet, sumPrefix, sumPrefix <= 23 ? 24 : Math.min(sumPrefix + 3, 28));
      }
      if (nets.length >= 2 && nets.length <= 8) break;
    }
    const sum = `${formatIp(sumNet)}/${sumPrefix}`;
    const total = nets.reduce((s, n) => s + 2 ** (32 - n.prefix), 0);
    const last = nets[nets.length - 1];
    // interessantes Oktett: dort, wo sich die Netze unterscheiden
    const oct = nets.some((n) => n.prefix > 24) ? 4 : 3;
    const octVal = (n: number) => Math.floor(n / 2 ** (8 * (4 - oct))) % 256;
    const fixedBits = sumPrefix - 8 * (oct - 1);
    const bin = (n: number) => {
      const b = toBinary8(octVal(n));
      return `${b.slice(0, fixedBits)}|${b.slice(fixedBits)}`;
    };
    const show = d === 3 ? rng.shuffle(nets) : nets;
    const wrongBase = `${formatIp(last.net)}/${sumPrefix}`;
    const misconceptions = [
      { answer: `${formatIp(sumNet)}/${sumPrefix + 1}`, error: 'supernet-zu-klein', why: `Mit /${sumPrefix + 1} deckst du nur die Hälfte der Adressen ab (${de(total / 2, 0)} statt ${de(total, 0)}). Ein Teil der Netze fehlt in der Sammelroute.` },
      { answer: `${formatIp(networkAddress(sumNet, sumPrefix - 1))}/${sumPrefix - 1}`, error: 'supernet-zu-gross', why: `/${sumPrefix - 1} fasst doppelt so viele Adressen zusammen, wie die Netze haben. Die Route würde auch fremde Netze an diesen Next Hop schicken.` },
      { answer: wrongBase, error: 'supernet-falsche-basis', why: `Die Sammelroute beginnt immer beim **ersten** (kleinsten) Netz, nicht beim letzten.` },
    ];
    if (d !== 3 && nets.length > 1) {
      misconceptions.push({ answer: `${formatIp(networkAddress(sumNet, 24 - nets.length))}/${24 - nets.length}`, error: 'bits-statt-anzahl', why: `Du hast pro Netz ein Bit abgezogen. Richtig: ${nets.length} Netze = 2^${Math.log2(nets.length)} → nur **${Math.log2(nets.length)}** Bit weniger als /24.` });
    }
    return clean({
      id: gid('routing.supernet'), generated: true, kind: 'cidr', skill: 'routing.aggregate', difficulty: d,
      prompt: `Der Router der Zentrale erreicht die folgenden Netze alle über **denselben Next Hop** (Standortrouter Berlin). Fasse sie zu **einer Sammelroute** zusammen, die **genau** diese Netze abdeckt (nicht mehr und nicht weniger). Gib die Route in CIDR-Notation an, z. B. \`10.0.0.0/22\`.\n\n| Zielnetz |\n|---|\n${show.map((n) => `| ${formatIp(n.net)}/${n.prefix} |`).join('\n')}`,
      answer: sum,
      misconceptions,
      hints: [
        'Zähle zuerst alle Adressen zusammen. Die Summe muss eine Zweierpotenz sein – daraus folgt das Präfix.',
        `Schreibe das ${oct}. Oktett der Netze binär. Gemeinsame Bits von links = Netzanteil der Sammelroute.`,
      ],
      explanation:
        `**Ergebnis: ${sum}**\n\n` +
        `**Schritt 1 – Adressen zählen:** ${nets.map((n) => `/${n.prefix} = ${de(2 ** (32 - n.prefix), 0)}`).join(', ')} → zusammen **${de(total, 0)} Adressen** = 2^${Math.log2(total)}.\n` +
        `Präfix der Sammelroute = 32 − ${Math.log2(total)} = **/${sumPrefix}**.\n\n` +
        `**Schritt 2 – Ausrichtung prüfen:** Ein /${sumPrefix} umfasst ${de(total, 0)} Adressen. Das erste Netz ${formatIp(sumNet)} muss auf einer solchen Blockgrenze liegen – das tut es. Damit deckt ${sum} genau die Netze ab.\n\n` +
        `**Schritt 3 – Probe binär (${oct}. Oktett, | = Grenze nach ${sumPrefix} Bit):**\n\n| Netz | ${oct}. Oktett binär |\n|---|---|\n${nets.map((n) => `| ${formatIp(n.net)}/${n.prefix} | \`${bin(n.net)}\` |`).join('\n')}\n\n` +
        `Links vom Strich sind alle Bits gleich → gemeinsamer Netzanteil, rechts davon kommen alle Kombinationen vor.\n\n` +
        `Häufiger Fehler: pro Netz ein Bit abziehen. Richtig ist: Anzahl der Netze bzw. Adressen als Zweierpotenz – 4 gleich große Netze = 2 Bit, 8 Netze = 3 Bit.`,
    });
  },
};

/* ------------------------------------------------------------------ */
/* m15: Datenmenge mit Konvention                                      */
/* ------------------------------------------------------------------ */

interface Amount {
  value: number;
  unit: 'GB' | 'GiB' | 'TB' | 'TiB';
  /** Byte gemäß der in der Aufgabe genannten Konvention */
  bytes: number;
  /** Byte, wenn man die andere Konvention benutzt (Fehlbild) */
  otherBytes: number;
  rule: string;
  calc: string;
  otherWhy: string;
}

function amount(value: number, unit: Amount['unit']): Amount {
  const exp = unit.startsWith('G') ? 3 : 4;
  const bin = unit.includes('i');
  const dec = 1000 ** exp;
  const b2 = 1024 ** exp;
  const v = de(value);
  return {
    value, unit,
    bytes: value * (bin ? b2 : dec),
    otherBytes: value * (bin ? dec : b2),
    rule: bin
      ? `Konvention: Die Datenmenge ist **binär** angegeben (1 ${unit} = 1024${exp === 3 ? '³' : '⁴'} Byte), die Datenrate **dezimal** (1 Mbit/s = 10⁶ bit/s).`
      : `Konvention: Die Datenmenge ist **dezimal** angegeben (1 ${unit} = 10${exp === 3 ? '⁹' : '¹²'} Byte, Herstellerangabe), die Datenrate ebenfalls dezimal (1 Mbit/s = 10⁶ bit/s).`,
    calc: bin
      ? `${v} ${unit} · 1024${exp === 3 ? '³' : '⁴'} = ${de(value * b2, 0)} Byte`
      : `${v} ${unit} · 10${exp === 3 ? '⁹' : '¹²'} = ${de(value * dec, 0)} Byte`,
    otherWhy: bin
      ? `Du hast dezimal gerechnet (1 ${unit.replace('i', '')} = 10${exp === 3 ? '⁹' : '¹²'} Byte). Laut Aufgabe ist die Menge aber in **${unit}** angegeben: 1 ${unit} = 1024${exp === 3 ? '³' : '⁴'} Byte – das sind ${exp === 3 ? '7,4' : '10'} % mehr.`
      : `Du hast binär gerechnet (1024${exp === 3 ? '³' : '⁴'}). Laut Aufgabe gilt die Herstellerangabe in **${unit}** (dezimal, 10${exp === 3 ? '⁹' : '¹²'} Byte).`,
  };
}

/* ---------- benötigte Datenrate ---------- */

const sollrateGen: GeneratorMeta = {
  id: 'calc.sollrate',
  title: 'Benötigte Datenrate aus Datenmenge und Zeitfenster',
  skill: 'calc.rate',
  module: 'm15',
  make(rng, d) {
    const a = d === 1 ? amount(rng.pick([5, 9, 12, 18, 25, 36, 45]), 'GB') : amount(rng.pick([4, 6, 8, 12, 15, 20, 30, 40]), rng.bool(0.75) ? 'GiB' : 'GB');
    const hours = rng.pick([1, 1.5, 2, 3, 4]);
    const share = d === 3 ? rng.pick([70, 80, 90]) : 100;
    const sec = hours * 3600;
    const net = (a.bytes * 8) / sec / 1e6; // Mbit/s Nutzdaten
    const gross = net / (share / 100);
    const ans = ceil2(gross);
    const other = ceil2((a.otherBytes * 8) / sec / 1e6 / (share / 100));
    const misconceptions = [
      { answer: String(ceil2(gross / 8)), error: 'einheit-bit-byte', why: 'Das ist der Wert in **MB/s** (Megabyte pro Sekunde). Datenraten von Leitungen werden in **Mbit/s** angegeben – also noch · 8.' },
      { answer: String(other), error: 'einheit-1000-1024', why: a.otherWhy },
      { answer: String(ceil2(gross * 3600 / 60)), error: 'zeit-umrechnung', why: `Du hast die Zeit in Minuten statt in Sekunden eingesetzt. ${de(hours)} h = ${de(sec, 0)} s.` },
    ];
    if (share < 100) {
      misconceptions.push({ answer: String(ceil2(net)), error: 'nutzanteil-ignoriert', why: `Das ist nur die Nutzdatenrate. Weil nur ${share} % der Leitungsrate für Nutzdaten bleiben, muss die Leitung schneller sein: Nutzrate ÷ ${de(share / 100)}.` });
      misconceptions.push({ answer: String(ceil2(net * (share / 100))), error: 'nutzanteil-falsch', why: `Du hast mit ${de(share / 100)} multipliziert. Die Leitung muss aber **mehr** liefern als die Nutzrate – also durch ${de(share / 100)} teilen.` });
    }
    return clean({
      id: gid('calc.sollrate'), generated: true, kind: 'number', skill: 'calc.rate', difficulty: d,
      prompt: `Die nächtliche Sicherung der Elektro Krämer GmbH umfasst **${de(a.value)} ${a.unit}**. Sie soll innerhalb von **${de(hours)} ${hours === 1 ? 'Stunde' : 'Stunden'}** vollständig in das Cloud-Rechenzentrum hochgeladen werden.${share < 100 ? ` Wegen Protokoll-Overhead stehen nur **${share} %** der Leitungsrate für Nutzdaten zur Verfügung.` : ''}\n\nWelche ${share < 100 ? '**Leitungsrate (Upload)**' : '**Upload-Datenrate**'} wird **mindestens** benötigt? Angabe in **Mbit/s**, auf zwei Nachkommastellen **aufrunden**.\n\n${a.rule}`,
      answer: ans, tolerance: 0.01, unit: 'Mbit/s',
      misconceptions,
      hints: ['Datenrate = Datenmenge (in Bit) ÷ Zeit (in Sekunden).', `${a.calc}; · 8 ergibt Bit. ${de(hours)} h = ${de(sec, 0)} s.`],
      explanation:
        `**Ergebnis: ${de(ans)} Mbit/s**\n\n` +
        `1. Datenmenge in Byte: ${a.calc}\n` +
        `2. In Bit: · 8 = ${de(a.bytes * 8, 0)} bit\n` +
        `3. Zeit in Sekunden: ${de(hours)} h · 3600 = ${de(sec, 0)} s\n` +
        `4. Nutzrate: ${de(a.bytes * 8, 0)} bit ÷ ${de(sec, 0)} s = ${de(net * 1e6, 0)} bit/s = **${de(net, 4)} Mbit/s**\n` +
        (share < 100 ? `5. Overhead: Nur ${share} % sind Nutzdaten → Leitungsrate = ${de(net, 4)} ÷ ${de(share / 100)} = **${de(gross, 4)} Mbit/s**\n` : '') +
        `\nAufgerundet: **${de(ans)} Mbit/s** – aufrunden, weil die Rate *mindestens* erreicht werden muss.\n\n` +
        `Häufiger Fehler: die andere Präfix-Konvention benutzen. Mit ${a.unit.includes('i') ? 'dezimalen' : 'binären'} Einheiten käme ${de(other)} Mbit/s heraus. Maßgeblich ist immer, was die Aufgabe angibt (${a.unit}).`,
    });
  },
};

/* ---------- Tarif auswählen ---------- */

const TARIFE = [
  { name: 'Business S', down: 50, up: 10, price: '39,90 €' },
  { name: 'Business M', down: 100, up: 20, price: '49,90 €' },
  { name: 'Business L', down: 250, up: 40, price: '69,90 €' },
  { name: 'Business XL', down: 500, up: 100, price: '99,90 €' },
  { name: 'Business Fiber', down: 1000, up: 200, price: '149,90 €' },
];

const tarifGen: GeneratorMeta = {
  id: 'calc.tarif',
  title: 'Internettarif nach benötigter Upload-Rate wählen',
  skill: 'calc.rate',
  module: 'm15',
  make(rng, d) {
    const pickTarif = (rate: number) => TARIFE.findIndex((t) => t.up >= rate);
    let a = amount(10, 'GiB');
    let hours = 2;
    let share = 100;
    let gross = 0;
    for (let tries = 0; tries < 200; tries++) {
      a = d === 1 ? amount(rng.pick([10, 20, 30, 40, 60, 80, 120]), 'GB') : amount(rng.pick([8, 12, 16, 24, 32, 48, 64, 100]), 'GiB');
      hours = rng.pick([1, 2, 3, 4, 6]);
      share = d === 3 ? rng.pick([80, 90]) : 100;
      gross = (a.bytes * 8) / (hours * 3600) / 1e6 / (share / 100);
      const idx = pickTarif(gross);
      if (idx < 0) continue;
      // Abstand zu jeder Tarifgrenze ≥ 4 %, damit die Wahl eindeutig ist
      if (TARIFE.every((t) => Math.abs(t.up - gross) / t.up > 0.04)) break;
    }
    const idx = pickTarif(gross);
    const net = gross * (share / 100);
    const other = (a.otherBytes * 8) / (hours * 3600) / 1e6 / (share / 100);
    const why: Record<string, { why: string; error?: string }> = {};
    const mcIdx = [
      { i: pickTarif(other), w: a.otherWhy, e: 'einheit-1000-1024' },
      { i: pickTarif(gross / 8), w: 'Du hast MB/s mit Mbit/s verwechselt: Die Leitungsrate ist in **Bit** pro Sekunde angegeben (· 8).', e: 'einheit-bit-byte' },
      { i: pickTarif(net), w: `Du hast den Overhead nicht berücksichtigt: Nur ${share} % der Leitungsrate sind Nutzdaten.`, e: 'nutzanteil-ignoriert' },
    ];
    TARIFE.forEach((t, i) => {
      if (i === idx) return;
      const mc = mcIdx.find((m) => m.i === i && m.i !== idx);
      if (mc) why[String(i)] = { why: mc.w, error: mc.e };
      else if (t.up < gross) why[String(i)] = { why: `${t.up} Mbit/s Upload sind weniger als die benötigten ${de(gross)} Mbit/s – das Backup würde nicht rechtzeitig fertig.`, error: 'tarif-zu-klein' };
      else why[String(i)] = { why: `Reicht zwar, ist aber größer und teurer als nötig. Gesucht ist der **kleinste** passende Tarif.`, error: 'tarif-ueberdimensioniert' };
    });
    return {
      id: gid('calc.tarif'), generated: true, kind: 'single', skill: 'calc.rate', difficulty: d,
      prompt: `Ein Kunde des IT-Systemhauses will seine Datensicherung von **${de(a.value)} ${a.unit}** jede Nacht innerhalb von **${hours} ${hours === 1 ? 'Stunde' : 'Stunden'}** in die Cloud hochladen.${share < 100 ? ` Für Nutzdaten stehen nur **${share} %** der Leitungsrate zur Verfügung (Overhead).` : ''} ${a.rule}\n\nWelchen Tarif empfiehlst du? Gesucht ist der **günstigste** Tarif, dessen **Upload** reicht.\n\n| Tarif | Download | Upload | Preis/Monat |\n|---|---|---|---|\n${TARIFE.map((t) => `| ${t.name} | ${t.down} Mbit/s | ${t.up} Mbit/s | ${t.price} |`).join('\n')}`,
      options: TARIFE.map((t) => `${t.name} (${t.up} Mbit/s Upload)`),
      answer: idx,
      distractors: why,
      hints: ['Zuerst die benötigte Upload-Rate in Mbit/s berechnen, dann in der Tabelle nur die Upload-Spalte vergleichen.', 'Rate = Datenmenge · 8 ÷ Zeit in Sekunden' + (share < 100 ? ` ÷ ${de(share / 100)}` : '') + '.'],
      explanation:
        `**Ergebnis: ${TARIFE[idx].name}** (${TARIFE[idx].up} Mbit/s Upload)\n\n` +
        `1. ${a.calc} · 8 = ${de(a.bytes * 8, 0)} bit\n` +
        `2. Zeit: ${hours} h · 3600 = ${de(hours * 3600, 0)} s\n` +
        `3. Nutzrate: ${de(a.bytes * 8, 0)} bit ÷ ${de(hours * 3600, 0)} s = ${de(net)} Mbit/s\n` +
        (share < 100 ? `4. Leitungsrate: ${de(net)} ÷ ${de(share / 100)} = **${de(gross)} Mbit/s**\n` : '') +
        `\nKleinster Tarif mit Upload ≥ ${de(gross)} Mbit/s: **${TARIFE[idx].name}**. Der Download spielt für das Hochladen keine Rolle.\n\n` +
        `Häufiger Fehler: in die Download-Spalte schauen oder MB/s und Mbit/s verwechseln.`,
    };
  },
};

/* ---------- Übertragungszeit mit GiB/TiB ---------- */

const transferBinGen: GeneratorMeta = {
  id: 'calc.transfertime.bin',
  title: 'Übertragungs-/Backupzeit mit GiB/TiB und Nutzanteil',
  skill: 'calc.transfertime',
  module: 'm15',
  make(rng, d) {
    const binary = d === 1 ? true : rng.bool(0.7);
    let a: Amount;
    let rate: number;
    let share: number;
    let unitOut: 's' | 'min' | 'h';
    if (d === 1) {
      a = amount(rng.pick([1, 2, 3, 4, 6, 8]), 'GiB');
      rate = rng.pick([50, 100, 250, 1000]);
      share = 100;
      unitOut = 's';
    } else if (d === 2) {
      a = amount(rng.pick([2, 3, 5, 8, 12, 20, 40]), binary ? 'GiB' : 'GB');
      rate = rng.pick([16, 25, 50, 100, 250]);
      share = rng.pick([70, 80, 90]);
      unitOut = 'min';
    } else {
      a = amount(rng.pick([0.5, 1, 1.5, 2, 3, 4]), binary ? 'TiB' : 'TB');
      rate = rng.pick([40, 50, 100, 250, 400, 1000]);
      share = rng.pick([80, 90]);
      unitOut = 'h';
    }
    const div = unitOut === 's' ? 1 : unitOut === 'min' ? 60 : 3600;
    const eff = rate * 1e6 * (share / 100);
    const tSec = (a.bytes * 8) / eff;
    const ans = r1(tSec / div);
    const conv = (bytes: number, r: number) => r1((bytes * 8) / r / div);
    const misconceptions = [
      { answer: String(conv(a.otherBytes, eff)), error: 'einheit-1000-1024', why: a.otherWhy },
      { answer: String(conv(a.bytes / 8, eff)), error: 'einheit-bit-byte', why: 'Du hast vergessen, Byte in Bit umzurechnen (· 8). Die Leitungsrate wird in **Bit** pro Sekunde angegeben.' },
    ];
    if (share < 100) {
      misconceptions.push({ answer: String(conv(a.bytes, rate * 1e6)), error: 'nutzanteil-ignoriert', why: `Du hast mit der vollen Leitungsrate gerechnet. Für Nutzdaten stehen nur ${share} % zur Verfügung: ${rate} · ${de(share / 100)} = ${de((rate * share) / 100)} Mbit/s.` });
      misconceptions.push({ answer: String(r1((tSec * (share / 100) * (share / 100)) / div)), error: 'nutzanteil-falsch', why: `Du hast die Zeit mit ${de(share / 100)} multipliziert. Weniger Nutzrate heißt **längere** Zeit: durch die Nutzrate teilen.` });
    }
    if (unitOut !== 's') misconceptions.push({ answer: String(r1(tSec / (unitOut === 'min' ? 3600 : 60))), error: 'zeit-umrechnung', why: `Falsch umgerechnet: ${unitOut === 'min' ? 'Minuten = Sekunden ÷ 60' : 'Stunden = Sekunden ÷ 3600'}.` });
    const outName = unitOut === 's' ? 'Sekunden' : unitOut === 'min' ? 'Minuten' : 'Stunden';
    const scenario =
      d === 3
        ? `Die Vollsicherung des Dateiservers (**${de(a.value)} ${a.unit}**) soll zum Cloud-Speicher übertragen werden. Der Anschluss liefert **${rate} Mbit/s** Upload, davon sind **${share} %** für Nutzdaten nutzbar.`
        : `Ein Image mit **${de(a.value)} ${a.unit}** wird vom Deployment-Server über eine Verbindung mit **${rate} Mbit/s** auf einen Client übertragen.${share < 100 ? ` Wegen Overhead kommen nur **${share} %** der Datenrate als Nutzdaten an.` : ''}`;
    return clean({
      id: gid('calc.transfertime.bin'), generated: true, kind: 'number', skill: 'calc.transfertime', difficulty: d,
      prompt: `${scenario}\n\nWie lange dauert die Übertragung in **${outName}**? (auf eine Nachkommastelle runden)\n\n${a.rule}`,
      answer: ans, tolerance: Math.max(0.1, ans * 0.005), unit: unitOut,
      misconceptions,
      hints: [
        `Zuerst die Datenmenge in Bit: ${a.calc}, dann · 8.`,
        `Nutzrate = ${rate} Mbit/s${share < 100 ? ` · ${de(share / 100)}` : ''} = ${de(eff / 1e6)} Mbit/s = ${de(eff, 0)} bit/s. Zeit = Bit ÷ bit/s.`,
      ],
      explanation:
        `**Ergebnis: ≈ ${de(ans, 1)} ${unitOut}**\n\n` +
        `1. Datenmenge: ${a.calc}\n` +
        `2. In Bit: · 8 = ${de(a.bytes * 8, 0)} bit\n` +
        `3. Nutzrate: ${share < 100 ? `${rate} Mbit/s · ${de(share / 100)} = ` : ''}${de(eff / 1e6)} Mbit/s = ${de(eff, 0)} bit/s\n` +
        `4. Zeit: ${de(a.bytes * 8, 0)} bit ÷ ${de(eff, 0)} bit/s = ${de(tSec, 1)} s` +
        (unitOut === 's' ? '' : ` ÷ ${div} = **${de(tSec / div, 2)} ${unitOut}**`) +
        `\n\nHäufiger Fehler: die Präfix-Konvention vertauschen. ${a.unit.includes('i') ? 'Binär' : 'Dezimal'} ist hier vorgegeben; mit der anderen Konvention käme ${de(conv(a.otherBytes, eff), 1)} ${unitOut} heraus. Steht in einer Aufgabe keine Konvention, schreib deine Annahme dazu.`,
    });
  },
};

/* ---------- Videokonferenz ---------- */

const conferenceGen: GeneratorMeta = {
  id: 'calc.conference',
  title: 'Datenrate einer Videokonferenz (Server vs. Peer-to-Peer)',
  skill: 'calc.conference',
  module: 'm15',
  make(rng, d) {
    const n = d === 1 ? rng.int(3, 5) : rng.int(4, 12);
    const b = rng.pick([0.5, 1, 1.5, 2, 2.5, 3, 4]);
    type Task = { q: string; a: number; way: string; mc: { answer: string; error: string; why: string }[] };
    const peerUp: Task = {
      q: `Die Teilnehmenden sind **direkt miteinander** verbunden (**Peer-to-Peer**, jeder sendet seinen Stream an jeden anderen). Welche **Upload-Datenrate** braucht **ein** Teilnehmer?`,
      a: (n - 1) * b,
      way: `Jeder schickt seinen Stream an alle anderen: (n − 1) · b = (${n} − 1) · ${de(b)} Mbit/s = **${de((n - 1) * b)} Mbit/s**`,
      mc: [
        { answer: String(n * b), error: 'konferenz-n-statt-n-1', why: 'Sich selbst schickt niemand seinen Stream: Es sind **n − 1** Empfänger.' },
        { answer: String(b), error: 'konferenz-modell-verwechselt', why: 'Nur ein Stream nach oben gilt beim **Server-Modell**. Bei Peer-to-Peer sendet jeder an jeden.' },
      ],
    };
    const serverUp: Task = {
      q: `Alle Teilnehmenden sind über einen **Konferenzserver** verbunden, der die Streams **einzeln weiterleitet** (kein Mischen). Welche **Upload-Datenrate** braucht **ein** Teilnehmer?`,
      a: b,
      way: `Jeder schickt seinen Stream nur **einmal** an den Server: **${de(b)} Mbit/s**`,
      mc: [{ answer: String((n - 1) * b), error: 'konferenz-modell-verwechselt', why: '(n − 1) Streams nach oben gelten bei **Peer-to-Peer**. Beim Server-Modell sendet jeder nur einmal an den Server.' }],
    };
    const serverDown: Task = {
      q: `Alle Teilnehmenden sind über einen **Konferenzserver** verbunden, der die Streams **einzeln weiterleitet** (kein Mischen). Welche **Download-Datenrate** braucht **ein** Teilnehmer?`,
      a: (n - 1) * b,
      way: `Jeder empfängt die Streams aller anderen: (n − 1) · b = ${n - 1} · ${de(b)} = **${de((n - 1) * b)} Mbit/s**`,
      mc: [{ answer: String(n * b), error: 'konferenz-n-statt-n-1', why: 'Den eigenen Stream bekommt man nicht zurück: **n − 1** Streams.' }],
    };
    const serverOut: Task = {
      q: `Alle Teilnehmenden sind über einen **Konferenzserver** im Rechenzentrum verbunden, der die Streams **einzeln weiterleitet** (kein Mischen). Welche **ausgehende** Datenrate muss die Anbindung des **Servers** liefern?`,
      a: n * (n - 1) * b,
      way: `Der Server schickt jedem der n Teilnehmenden n − 1 Streams: n · (n − 1) · b = ${n} · ${n - 1} · ${de(b)} = **${de(n * (n - 1) * b)} Mbit/s** (eingehend nur n · b = ${de(n * b)} Mbit/s)`,
      mc: [
        { answer: String(n * b), error: 'konferenz-server-eingang', why: `n · b ist der **eingehende** Verkehr des Servers (jeder sendet einmal). Ausgehend schickt er jedem n − 1 Streams.` },
        { answer: String(n * n * b), error: 'konferenz-n-statt-n-1', why: 'Jeder bekommt nur die **anderen** Streams: n · (n − 1) · b.' },
      ],
    };
    const k = rng.int(2, Math.max(2, n - 2));
    const siteDown: Task = {
      q: `Alle Teilnehmenden sind über einen **Konferenzserver in der Cloud** verbunden, der die Streams **einzeln weiterleitet** (kein Mischen). **${k}** der ${n} Teilnehmenden sitzen in der Zentrale Hamburg hinter **einem** gemeinsamen Internetanschluss. Welche **Download-Datenrate** braucht dieser Anschluss für die Konferenz?`,
      a: k * (n - 1) * b,
      way: `Jede der ${k} Personen empfängt n − 1 Streams vom Server: ${k} · (${n} − 1) · ${de(b)} = **${de(k * (n - 1) * b)} Mbit/s** (Upload des Anschlusses: ${k} · ${de(b)} = ${de(k * b)} Mbit/s)`,
      mc: [
        { answer: String((n - 1) * b), error: 'konferenz-anschluss', why: `Das ist der Bedarf **einer** Person. Am gemeinsamen Anschluss addiert sich der Bedarf aller ${k} Personen.` },
        { answer: String(k * b), error: 'konferenz-up-down', why: 'Das ist der **Upload** des Anschlusses. Nach unten kommen für jede Person n − 1 Streams.' },
        { answer: String(k * n * b), error: 'konferenz-n-statt-n-1', why: 'Jede Person bekommt nur die **anderen** Streams: n − 1.' },
      ],
    };
    const diff: Task = {
      q: `Vergleiche zwei Varianten: **Peer-to-Peer** (jeder sendet an jeden) und **Konferenzserver**, der Streams einzeln weiterleitet. Um wie viel Mbit/s ist der **Upload eines Teilnehmers** bei Peer-to-Peer **höher** als beim Server-Modell?`,
      a: (n - 2) * b,
      way: `Peer-to-Peer: (n − 1) · b = ${de((n - 1) * b)} Mbit/s; Server: b = ${de(b)} Mbit/s → Differenz (n − 2) · b = **${de((n - 2) * b)} Mbit/s**`,
      mc: [{ answer: String((n - 1) * b), error: 'konferenz-modell-verwechselt', why: 'Das ist der gesamte Upload bei Peer-to-Peer, nicht die Differenz zum Server-Modell.' }],
    };
    const pool = d === 1 ? [peerUp, serverUp, serverDown] : d === 2 ? [peerUp, serverDown, serverOut] : [serverOut, siteDown, diff];
    const t = rng.pick(pool);
    return clean({
      id: gid('calc.conference'), generated: true, kind: 'number', skill: 'calc.conference', difficulty: d,
      prompt: `Bei der Elektro Krämer GmbH findet eine Videokonferenz mit **${n} Teilnehmenden** statt. Jede Kamera erzeugt einen Stream mit **${de(b)} Mbit/s**, und jeder sieht alle anderen in dieser Qualität.\n\n${t.q} (Angabe in Mbit/s; Overhead bleibt unberücksichtigt)`,
      answer: t.a, tolerance: 0.01, unit: 'Mbit/s',
      misconceptions: t.mc,
      hints: ['Zeichne dir auf, wer an wen sendet. Den eigenen Stream bekommt niemand zurück.', 'Peer-to-Peer: (n − 1) Streams hoch und runter. Server: 1 Stream hoch, (n − 1) runter.'],
      explanation: `**Ergebnis: ${de(t.a)} Mbit/s**\n\n${t.way}\n\n| Modell | Upload je Teilnehmer | Download je Teilnehmer |\n|---|---|---|\n| Peer-to-Peer | (n − 1) · b | (n − 1) · b |\n| Server (Weiterleitung) | b | (n − 1) · b |\n\nHäufiger Fehler: n statt n − 1 rechnen – den eigenen Stream empfängt man nicht.`,
    });
  },
};

/* ---------- Signallaufzeit mit NVP ---------- */

const nvpGen: GeneratorMeta = {
  id: 'calc.nvp',
  title: 'Signallaufzeit mit NVP bzw. Brechungsindex',
  skill: 'calc.latency',
  module: 'm15',
  make(rng, d) {
    const C = 3e8;
    if (d === 1) {
      const l = rng.pick([20, 35, 50, 60, 75, 90, 100]);
      const nvp = rng.pick([0.65, 0.66, 0.69, 0.7, 0.72, 0.75, 0.78]);
      const t = (l / (C * nvp)) * 1e9;
      const ans = r1(t);
      return clean({
        id: gid('calc.nvp'), generated: true, kind: 'number', skill: 'calc.latency', difficulty: d,
        prompt: `Im Datenblatt eines Cat-6A-Verlegekabels steht **NVP ${Math.round(nvp * 100)} %** (*Nominal Velocity of Propagation*: Signalgeschwindigkeit im Verhältnis zur Lichtgeschwindigkeit). Wie lange braucht ein Signal für eine Kabelstrecke von **${l} m**? Angabe in **Nanosekunden**, auf eine Nachkommastelle. (Lichtgeschwindigkeit c = 3 · 10⁸ m/s)`,
        answer: ans, tolerance: Math.max(0.1, ans * 0.005), unit: 'ns',
        misconceptions: [
          { answer: String(r1((l / C) * 1e9)), error: 'nvp-vergessen', why: `Das wäre die Laufzeit mit Lichtgeschwindigkeit im Vakuum. Im Kabel ist das Signal nur ${Math.round(nvp * 100)} % so schnell.` },
          { answer: String(r1(((l * nvp) / C) * 1e9)), error: 'nvp-multipliziert', why: 'Langsameres Signal → **längere** Zeit. Durch v = c · NVP teilen, nicht mit NVP multiplizieren.' },
        ],
        hints: ['Geschwindigkeit im Kabel: v = c · NVP.', 'Zeit = Strecke ÷ Geschwindigkeit; 1 s = 10⁹ ns.'],
        explanation: `**Ergebnis: ≈ ${de(ans, 1)} ns**\n\n1. v = c · NVP = 3 · 10⁸ m/s · ${de(nvp)} = ${de(C * nvp, 0)} m/s\n2. t = l ÷ v = ${l} m ÷ ${de(C * nvp, 0)} m/s = ${de(t / 1e9, 12)} s\n3. In ns: · 10⁹ = **${de(t, 1)} ns**\n\nZum Vergleich: Das Signal schafft im Kabel etwa ${de(C * nvp / 1e9, 2)} m pro Nanosekunde. Kupfer und Glasfaser sind ungefähr gleich schnell (rund ⅔ c) – Glasfaser ist nicht „schneller“, sondern erlaubt höhere Datenraten und längere Strecken.`,
      });
    }
    const n = rng.pick([1.46, 1.465, 1.47, 1.48, 1.5]);
    const v = C / n;
    if (d === 2) {
      const km = rng.pick([2, 5, 10, 15, 20, 40, 60]);
      const t = ((km * 1000) / v) * 1e6;
      const ans = r2(t);
      return clean({
        id: gid('calc.nvp'), generated: true, kind: 'number', skill: 'calc.latency', difficulty: d,
        prompt: `Die Standorte eines Kunden sind über eine angemietete Glasfaser (**${km} km**) verbunden. Laut Datenblatt hat die Faser einen **Brechungsindex n = ${de(n, 3)}**. Wie lange braucht das Licht für den **einfachen Weg**? Angabe in **Mikrosekunden (µs)**, auf zwei Nachkommastellen. (c = 3 · 10⁸ m/s; Geschwindigkeit in der Faser v = c ÷ n)`,
        answer: ans, tolerance: Math.max(0.01, ans * 0.002), unit: 'µs',
        misconceptions: [
          { answer: String(r2(((km * 1000) / C) * 1e6)), error: 'nvp-vergessen', why: 'Das ist die Laufzeit im Vakuum. In Glas ist Licht um den Faktor n langsamer.' },
          { answer: String(r2(((km * 1000) / (C * n)) * 1e6)), error: 'nvp-multipliziert', why: 'v = c **÷** n (Licht wird im Glas langsamer), nicht c · n.' },
          { answer: String(r2(2 * t)), error: 'rtt-statt-einfach', why: 'Gefragt ist der **einfache** Weg, nicht Hin- und Rückweg.' },
        ],
        hints: ['v = c ÷ n.', 'Zeit = Strecke ÷ Geschwindigkeit; 1 s = 10⁶ µs. Kilometer in Meter umrechnen.'],
        explanation: `**Ergebnis: ≈ ${de(ans)} µs**\n\n1. v = c ÷ n = 3 · 10⁸ m/s ÷ ${de(n, 3)} = ${de(v, 0)} m/s\n2. t = ${de(km * 1000, 0)} m ÷ ${de(v, 0)} m/s = ${de(t / 1e6, 9)} s\n3. In µs: · 10⁶ = **${de(t)} µs**\n\nFaustwert: rund **5 µs pro Kilometer** Glasfaser (einfache Strecke).`,
      });
    }
    const km = rng.pick([80, 120, 250, 290, 400, 600, 800]);
    const rtt = ((2 * km * 1000) / v) * 1e3;
    const ans = r2(rtt);
    return clean({
      id: gid('calc.nvp'), generated: true, kind: 'number', skill: 'calc.latency', difficulty: d,
      prompt: `Zwischen Hamburg und einem Rechenzentrum verläuft die Glasfaserstrecke über **${km} km**. Brechungsindex der Faser **n = ${de(n, 3)}**. Wie groß ist die **Round Trip Time (Hin- und Rückweg)**, die allein durch die Signallaufzeit entsteht (ohne Verarbeitung in Routern)? Angabe in **Millisekunden**, auf zwei Nachkommastellen. (c = 3 · 10⁸ m/s)`,
      answer: ans, tolerance: Math.max(0.01, ans * 0.002), unit: 'ms',
      misconceptions: [
        { answer: String(r2(rtt / 2)), error: 'rtt-einfach', why: 'Das ist nur der **Hinweg**. Die Round Trip Time umfasst Hin- und Rückweg (· 2).' },
        { answer: String(r2(((2 * km * 1000) / C) * 1e3)), error: 'nvp-vergessen', why: 'Mit Vakuum-Lichtgeschwindigkeit gerechnet. In der Faser gilt v = c ÷ n.' },
        { answer: String(r2(((2 * km * 1000) / (C * n)) * 1e3)), error: 'nvp-multipliziert', why: 'v = c **÷** n, nicht c · n.' },
      ],
      hints: ['RTT = 2 · Strecke ÷ v.', 'v = c ÷ n; 1 s = 1000 ms.'],
      explanation: `**Ergebnis: ≈ ${de(ans)} ms**\n\n1. v = c ÷ n = 3 · 10⁸ ÷ ${de(n, 3)} = ${de(v, 0)} m/s\n2. Strecke hin und zurück: 2 · ${km} km = ${de(2 * km * 1000, 0)} m\n3. RTT = ${de(2 * km * 1000, 0)} m ÷ ${de(v, 0)} m/s = ${de(rtt / 1e3, 6)} s = **${de(rtt)} ms**\n\nIn der Praxis zeigt \`ping\` mehr, weil Router, Switches und Warteschlangen zusätzliche Zeit kosten.`,
    });
  },
};

export const GENERATORS_NETZWERK_DIENSTE: GeneratorMeta[] = [supernetGen, sollrateGen, tarifGen, transferBinGen, conferenceGen, nvpGen];
