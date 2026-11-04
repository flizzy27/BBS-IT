/**
 * Aufgaben-Generatoren für Netzwerk Teil A (Module m01–m08): OUI aus Binär/Hex,
 * PoE-Budget (PSE vs. PD) und Switch-Auswahl nach Datenblatt.
 * Alle Lösungen werden exakt berechnet; Rundungsregeln stehen im Aufgabentext.
 */
import type { Difficulty, NumberQuestion, Question, SingleChoiceQuestion, TableQuestion } from '../../content/types';
import { blockSize, formatIp, prefixToMask, usableHosts } from '../ipv4';
import type { GeneratorMeta } from '../generators';
import { Rng } from '../rng';
import { grade } from '../grading';

let counter = 0;
const gid = (g: string) => `gen:${g}:${Date.now().toString(36)}${(counter++).toString(36)}`;

/** Zahl deutsch formatieren (max. 2 Nachkommastellen). */
const f = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 2 });
/** auf 2 Nachkommastellen runden (gegen Gleitkomma-Reste wie 162.79999). */
const r2 = (x: number) => Math.round((x + Number.EPSILON) * 100) / 100;

type Mc = { answer: number; error: string; why: string };

/** Zahlenaufgabe; Fehlbilder, die der Lösung entsprechen würden, werden entfernt. */
function numQ(genId: string, skill: string, d: Difficulty, o: { prompt: string; answer: number; unit: string; hints: string[]; explanation: string; mcs: Mc[] }): NumberQuestion {
  const tolerance = Number.isInteger(o.answer) ? 0 : 0.05;
  const seen = new Set<string>();
  const q: NumberQuestion = {
    id: gid(genId), generated: true, kind: 'number', skill, difficulty: d,
    prompt: o.prompt, answer: o.answer, tolerance, unit: o.unit, hints: o.hints, explanation: o.explanation,
    misconceptions: o.mcs
      .filter((m) => Number.isFinite(m.answer) && Math.abs(m.answer - o.answer) > tolerance + 1e-9)
      .map((m) => ({ answer: String(m.answer), error: m.error, why: m.why }))
      .filter((m) => (seen.has(m.answer) ? false : (seen.add(m.answer), true))),
  };
  q.misconceptions = q.misconceptions!.filter((m) => !grade(q, m.answer).correct);
  return q;
}

/* ------------------------------------------------------------------ */
/* m08 – OUI aus Binär- bzw. Hex-Darstellung                           */
/* ------------------------------------------------------------------ */

const hex2 = (b: number) => b.toString(16).toUpperCase().padStart(2, '0');
const bin8 = (b: number) => b.toString(2).padStart(8, '0');
/** 8 Bit als zwei Nibbles „0011 1100“. */
const nib = (b: number) => `${bin8(b).slice(0, 4)} ${bin8(b).slice(4)}`;

/** Zufällige OUI als Unicast + global (I/G-Bit = 0, U/L-Bit = 0 → erstes Byte durch 4 teilbar). */
function randomOui(rng: Rng): number[] {
  return [rng.int(0, 63) * 4, rng.int(0, 255), rng.int(0, 255)];
}

const ouiNames = ['Nordnetz', 'Elbtech', 'Hansa Devices', 'Kabelwerk Süd', 'Rheinlink', 'Alsterbyte'];

const ouiGen: GeneratorMeta = {
  id: 'mac.oui',
  title: 'OUI aus Binär-/Hexdarstellung bestimmen',
  skill: 'mac.oui',
  module: 'm08',
  make(rng, d): Question {
    const oui = randomOui(rng);
    const dev = [rng.int(0, 255), rng.int(0, 255), rng.int(0, 255)];
    const macDash = [...oui, ...dev].map(hex2).join('-');
    const ouiHex = oui.map(hex2);
    const ouiBinSpaced = oui.map(bin8).join(' ');
    const nibbleTable = `| Hex | ${ouiHex.map((h) => `${h[0]} | ${h[1]}`).join(' | ')} |\n|---|---|---|---|---|---|---|\n| Binär | ${oui.map((b) => `${bin8(b).slice(0, 4)} | ${bin8(b).slice(4)}`).join(' | ')} |`;

    if (d === 1) {
      // MAC (hex) → OUI binär
      const devBin = dev.map(bin8).join(' ');
      return {
        id: gid('mac.oui'), generated: true, kind: 'text', skill: 'mac.oui', difficulty: d,
        prompt: `Eine Netzwerkkarte hat laut \`ipconfig /all\` die physische Adresse **${macDash}**.\n\nGib die **OUI** (Herstellerkennung) in **Binärdarstellung** an: 24 Bit, drei Bytes, durch Leerzeichen getrennt (z. B. \`00000000 11111111 01010101\`).`,
        placeholder: 'xxxxxxxx xxxxxxxx xxxxxxxx',
        accept: [ouiBinSpaced, oui.map(bin8).join(''), oui.map(bin8).join('.'), oui.map(bin8).join(':'), oui.map(bin8).join('-'), oui.map(nib).join(' ')],
        hints: ['Die OUI sind die **ersten drei Bytes** (die ersten 6 Hex-Ziffern).', 'Jede Hex-Ziffer wird zu genau 4 Bit: z. B. A = 1010, 3 = 0011.'],
        misconceptions: [
          { answer: devBin, error: 'oui-position', why: 'Das sind die **letzten** drei Bytes (Gerätekennung). Die OUI steht **vorne**.' },
          { answer: oui.map((b) => b.toString(2)).join(' '), error: 'bin-fuehrende-nullen', why: 'Jedes Byte hat **8** Stellen – führende Nullen gehören dazu (z. B. 0A = 00001010).' },
        ].filter((m) => m.answer !== ouiBinSpaced),
        explanation: `**Ergebnis:** \`${ouiBinSpaced}\`\n\n**Weg:**\n1. OUI = die ersten drei Bytes der MAC: **${ouiHex.join('-')}**.\n2. Jede Hex-Ziffer einzeln in 4 Bit umwandeln:\n\n${nibbleTable}\n\n3. Je zwei Nibbles (4-Bit-Gruppen) bilden ein Byte: ${oui.map((b, i) => `${ouiHex[i]} = ${bin8(b)}`).join(', ')}.\n\nHäufiger Fehler: die letzten drei Bytes (Gerätekennung) nehmen oder führende Nullen weglassen.`,
      };
    }

    if (d === 2) {
      // OUI binär → hex
      return {
        id: gid('mac.oui'), generated: true, kind: 'text', skill: 'mac.oui', difficulty: d,
        prompt: `In einer Herstellerliste ist eine OUI binär angegeben:\n\n\`${oui.map(nib).join('   ')}\`\n\nGib die OUI **hexadezimal** an (Schreibweise wie bei Windows, z. B. \`3C-5A-B4\`).`,
        placeholder: 'XX-XX-XX',
        accept: [ouiHex.join('-'), ouiHex.join(':'), ouiHex.join(''), ouiHex.join(' '), ouiHex.join('.')],
        hints: ['Teile die 24 Bit in Vierergruppen (Nibbles).', 'Jede Vierergruppe ergibt eine Hex-Ziffer: 8-4-2-1 addieren, 10–15 = A–F.'],
        misconceptions: [
          { answer: [...ouiHex].reverse().join('-'), error: 'oui-byte-reihenfolge', why: 'Die Bytes stehen in umgekehrter Reihenfolge. Das **erste** Byte der Liste ist auch das erste Byte der OUI.' },
          { answer: oui.map((b) => hex2(parseInt(bin8(b).split('').reverse().join(''), 2))).join('-'), error: 'bin-reihenfolge', why: 'Du hast die Bits von rechts nach links gelesen. In jeder Vierergruppe hat das **linke** Bit den Wert 8.' },
        ].filter((m) => m.answer !== ouiHex.join('-')),
        explanation: `**Ergebnis:** **${ouiHex.join('-')}**\n\n**Weg:** Vierergruppen bilden und jede Gruppe mit den Stellenwerten 8-4-2-1 in eine Hex-Ziffer umrechnen:\n\n${nibbleTable}\n\n${oui.map((b) => [bin8(b).slice(0, 4), bin8(b).slice(4)]).flat().map((g) => `\`${g}\` = ${parseInt(g, 2)} = ${parseInt(g, 2).toString(16).toUpperCase()}`).join(' · ')}\n\nHäufiger Fehler: Bytes oder Bits in umgekehrter Reihenfolge lesen.`,
      };
    }

    // d === 3: Hersteller aus binärer OUI-Liste zuordnen
    const names = rng.shuffle(ouiNames).slice(0, 4);
    const rev = [...oui].reverse();
    const sameAsDev = [...dev];
    let other = randomOui(rng);
    while (other.join() === oui.join()) other = randomOui(rng);
    const lists = [
      { oui, ok: true, why: '' },
      { oui: rev, ok: false, why: 'Diese OUI enthält dieselben Bytes, aber in **umgekehrter Reihenfolge**.', error: 'oui-byte-reihenfolge' },
      { oui: sameAsDev, ok: false, why: 'Diese Bitfolge entspricht den **letzten** drei Bytes der MAC – das ist die Gerätekennung, nicht die OUI.', error: 'oui-position' },
      { oui: other, ok: false, why: 'Diese OUI stimmt mit keinem Teil der MAC-Adresse überein.', error: 'oui-position' },
    ];
    // Doppelte Bitfolgen (z. B. Palindrom-OUI) würden die Aufgabe mehrdeutig machen → neu würfeln
    const uniq = new Set(lists.map((l) => l.oui.join()));
    if (uniq.size < lists.length) return ouiGen.make(new Rng(Math.floor(rng.next() * 2 ** 32)), d);
    const order = rng.shuffle([0, 1, 2, 3]);
    const rows = order.map((i, k) => `| ${names[k]} | \`${lists[i].oui.map(nib).join('  ')}\` |`).join('\n');
    const answer = order.indexOf(0);
    const distractors: SingleChoiceQuestion['distractors'] = {};
    order.forEach((i, k) => { if (i !== 0) distractors[String(k)] = { why: lists[i].why, error: lists[i].error }; });
    return {
      id: gid('mac.oui'), generated: true, kind: 'single', skill: 'mac.oui', difficulty: d,
      prompt: `Bei der Inventur der Elektro Krämer GmbH findest du eine Netzwerkkarte mit der MAC-Adresse **${macDash}**. Die Herstellerliste im Anhang des Datenblatts gibt die OUIs binär an:\n\n| Hersteller | OUI (binär) |\n|---|---|\n${rows}\n\nVon welchem Hersteller stammt die Karte?`,
      options: names,
      answer,
      distractors,
      hints: ['Nimm die ersten drei Bytes der MAC und wandle jede Hex-Ziffer in 4 Bit um.', 'Vergleiche Byte für Byte von links.'],
      explanation: `**Ergebnis:** **${names[answer]}**\n\n**Weg:**\n1. OUI = erste drei Bytes der MAC: **${ouiHex.join('-')}**.\n2. Hex → Binär (je Ziffer 4 Bit):\n\n${nibbleTable}\n\n3. Die Bitfolge \`${oui.map(nib).join('  ')}\` steht in der Liste bei **${names[answer]}**.\n\nHäufiger Fehler: die letzten drei Bytes (Gerätekennung) vergleichen oder die Bytes rückwärts lesen.`,
    };
  },
};

/* ------------------------------------------------------------------ */
/* m08 – PoE-Budget                                                    */
/* ------------------------------------------------------------------ */

/** Leistungsklassen nach IEEE 802.3af/at/bt: max. Leistung am Switch-Port (PSE) und am Gerät (PD). */
const POE_CLASSES = {
  2: { pse: 7, pd: 6.49, std: '802.3af' },
  3: { pse: 15.4, pd: 12.95, std: '802.3af' },
  4: { pse: 30, pd: 25.5, std: '802.3at (PoE+)' },
  6: { pse: 60, pd: 51, std: '802.3bt (Type 3)' },
} as const;
type PoeClass = keyof typeof POE_CLASSES;

const POE_DEVICES: { name: string; cls: PoeClass; min: number; max: number }[] = [
  { name: 'IP-Telefon', cls: 2, min: 4, max: 16 },
  { name: 'IP-Kamera (fest)', cls: 3, min: 2, max: 8 },
  { name: 'Access Point (Wi-Fi 6)', cls: 4, min: 2, max: 6 },
  { name: 'PTZ-Kamera mit Heizung', cls: 6, min: 1, max: 2 },
];

const poeGen: GeneratorMeta = {
  id: 'switch.poebudget',
  title: 'PoE-Budget eines Switches berechnen',
  skill: 'switch.poebudget',
  module: 'm08',
  make(rng, d) {
    const types = d === 1 ? [POE_DEVICES[0], POE_DEVICES[2]] : d === 2 ? POE_DEVICES.slice(0, 3) : POE_DEVICES;
    const rows = types.map((t) => ({ ...t, n: rng.int(t.min, t.max), ...POE_CLASSES[t.cls] }));
    const sumPse = r2(rows.reduce((s, r) => s + r.n * r.pse, 0));
    const sumPd = r2(rows.reduce((s, r) => s + r.n * r.pd, 0));
    const sumNoCount = r2(rows.reduce((s, r) => s + r.pse, 0));
    const table = `| Gerät | Anzahl | PoE-Klasse | Standard | max. Leistung am Switch-Port (PSE) | max. Leistung am Gerät (PD) |\n|---|---|---|---|---|---|\n${rows.map((r) => `| ${r.name} | ${r.n} | ${r.cls} | ${r.std} | ${f(r.pse)} W | ${f(r.pd)} W |`).join('\n')}`;
    const sumLines = rows.map((r) => `${r.n} × ${f(r.pse)} W = ${f(r2(r.n * r.pse))} W`).join('\n- ');
    const rule = 'Plane – wie üblich – mit der **maximalen Leistung der PoE-Klasse am Switch-Port (PSE)**, weil der Switch diese Leistung je Port reserviert.';

    if (d === 1) {
      return numQ('switch.poebudget', 'switch.poebudget', d, {
        prompt: `Für den neuen Etagenswitch der Elektro Krämer GmbH sollen folgende Geräte per PoE versorgt werden:\n\n${table}\n\nWie viel PoE-Leistung muss der Switch **insgesamt** bereitstellen? ${rule}`,
        answer: sumPse, unit: 'W',
        hints: ['Je Gerätetyp: Anzahl × Leistung am Switch-Port (PSE).', 'Danach alle Zwischenergebnisse addieren.'],
        mcs: [
          { answer: sumPd, error: 'poe-pd-statt-pse', why: 'Du hast mit der Leistung **am Gerät (PD)** gerechnet. Der Switch muss die höhere Leistung **am Port (PSE)** liefern – die Differenz geht als Wärme im Kabel verloren.' },
          { answer: sumNoCount, error: 'poe-anzahl-vergessen', why: 'Du hast jeden Gerätetyp nur einmal gezählt. Multipliziere mit der **Anzahl** der Geräte.' },
        ],
        explanation: `**Ergebnis:** ${f(sumPse)} W\n\n**Weg:**\n- ${sumLines}\n\nSumme: **${f(sumPse)} W**\n\nHäufiger Fehler: mit der PD-Spalte rechnen (${f(sumPd)} W). Am Gerät kommt weniger an, als der Switch-Port liefern muss.`,
      });
    }

    const reserve = rng.pick([10, 15, 20, 25]);
    const need = r2(sumPse * (1 + reserve / 100));
    if (d === 2) {
      return numQ('switch.poebudget', 'switch.poebudget', d, {
        prompt: `Für den Access-Switch im Lager Berlin sollen folgende PoE-Geräte angeschlossen werden:\n\n${table}\n\nDie IT-Leitung verlangt **${reserve} % Reserve** auf die geplante PoE-Leistung. Welches **PoE-Budget** muss der Switch mindestens haben? ${rule} Runde auf zwei Nachkommastellen.`,
        answer: need, unit: 'W',
        hints: ['Erst die Summe aller Geräte (Anzahl × PSE-Leistung) bilden.', `Dann mit ${f(1 + reserve / 100)} multiplizieren (100 % + ${reserve} %).`],
        mcs: [
          { answer: sumPse, error: 'poe-reserve-vergessen', why: `Das ist die Summe **ohne** Reserve. Gefordert sind zusätzlich ${reserve} %.` },
          { answer: r2(sumPd * (1 + reserve / 100)), error: 'poe-pd-statt-pse', why: 'Du hast mit der Leistung am Gerät (PD) gerechnet. Für das Switch-Budget zählt die Leistung am Port (PSE).' },
          { answer: r2(sumPse * (reserve / 100)), error: 'prozent-nur-aufschlag', why: 'Das ist nur der Aufschlag. Das Budget ist Summe **plus** Aufschlag.' },
        ],
        explanation: `**Ergebnis:** ${f(need)} W\n\n**Weg:**\n1. Leistung je Gerätetyp (PSE):\n- ${sumLines}\n2. Summe: **${f(sumPse)} W**\n3. Reserve: ${f(sumPse)} W × ${f(1 + reserve / 100)} = **${f(need)} W**\n\nHäufiger Fehler: Reserve vergessen oder mit der PD-Leistung rechnen.`,
      });
    }

    // d === 3: Anzahl zusätzlicher Access Points im Restbudget
    const budget = rng.pick([370, 410, 480, 740]);
    if (sumPse >= budget - 30) return poeGen.make(new Rng(Math.floor(rng.next() * 2 ** 32)), d);
    const rest = r2(budget - sumPse);
    const ap = POE_CLASSES[4].pse;
    const extra = Math.floor(rest / ap + 1e-9);
    return numQ('switch.poebudget', 'switch.poebudget', d, {
      prompt: `Ein PoE-Switch hat laut Datenblatt ein **PoE-Budget von ${budget} W**. Angeschlossen sind bereits:\n\n${table}\n\nWie viele **zusätzliche Access Points** (Klasse 4, PoE+, ${f(ap)} W am Switch-Port) kann der Switch noch versorgen? ${rule} Freie Ports sind ausreichend vorhanden.`,
      answer: extra, unit: 'Access Points',
      hints: ['Restbudget = Budget − Summe der angeschlossenen Geräte (PSE).', 'Restbudget durch 30 W teilen und **abrunden** – ein halber AP lässt sich nicht versorgen.'],
      mcs: [
        { answer: Math.ceil(rest / ap - 1e-9), error: 'abrunden-aufrunden', why: 'Du hast aufgerundet. Für den letzten AP reicht die Leistung nicht mehr – bei Geräteanzahlen immer **abrunden**.' },
        { answer: Math.floor(r2(budget - sumPd) / POE_CLASSES[4].pd + 1e-9), error: 'poe-pd-statt-pse', why: 'Du hast mit PD-Werten (Leistung am Gerät) gerechnet. Das Switch-Budget wird mit den PSE-Werten belastet.' },
        { answer: Math.floor(budget / ap), error: 'poe-bestand-vergessen', why: 'Die bereits angeschlossenen Geräte verbrauchen schon einen Teil des Budgets. Erst das Restbudget berechnen.' },
      ],
      explanation: `**Ergebnis:** ${extra} Access Points\n\n**Weg:**\n1. Bereits belegt (PSE):\n- ${sumLines}\n   Summe: **${f(sumPse)} W**\n2. Restbudget: ${budget} W − ${f(sumPse)} W = **${f(rest)} W**\n3. ${f(rest)} W ÷ ${f(ap)} W = ${f(r2(rest / ap))} → abgerundet **${extra}**\n\nHäufiger Fehler: aufrunden oder die bereits angeschlossenen Geräte vergessen.`,
    });
  },
};

/* ------------------------------------------------------------------ */
/* m08 – Switch nach Datenblatt auswählen                              */
/* ------------------------------------------------------------------ */

type SwitchModel = { name: string; ports: number; poePorts: number; budget: number; managed: boolean; price: number };

const selectGen: GeneratorMeta = {
  id: 'switch.select',
  title: 'Switch nach Datenblatt auswählen',
  skill: 'switch.select',
  module: 'm08',
  make(rng, d) {
    const pcs = rng.int(4, d === 1 ? 8 : 12);
    const printers = rng.int(1, 3);
    const phones = rng.int(2, d === 1 ? 6 : 10);
    const aps = rng.int(1, 3);
    const reserve = d === 1 ? 0 : rng.pick([20, 25]);
    const devices = pcs + printers + phones + aps;
    const needPorts = Math.ceil(devices * (1 + reserve / 100) - 1e-9);
    if (needPorts > 24) return selectGen.make(new Rng(Math.floor(rng.next() * 2 ** 32)), d);
    const poeDevices = phones + aps;
    const needPoe = r2(phones * 7 + aps * 30);
    const needVlan = d !== 1 || rng.bool();
    const portSize = needPorts <= 8 ? 8 : needPorts <= 16 ? 16 : 24;

    const fits = (m: SwitchModel) => m.ports >= needPorts && m.poePorts >= poeDevices && m.budget >= needPoe && (!needVlan || m.managed);
    const reasons = (m: SwitchModel) => {
      const r: string[] = [];
      if (m.ports < needPorts) r.push(`nur ${m.ports} Ports, benötigt werden ${needPorts}`);
      if (m.poePorts < poeDevices) r.push(`nur ${m.poePorts} PoE-Ports für ${poeDevices} PoE-Geräte`);
      if (m.budget < needPoe) r.push(`PoE-Budget ${m.budget} W < benötigte ${f(needPoe)} W`);
      if (needVlan && !m.managed) r.push('unmanaged – keine VLANs konfigurierbar');
      return r;
    };

    // passendes Modell (kleinste ausreichende Portgröße, Budget mit Puffer)
    const budgets = [65, 120, 190, 250, 370, 480];
    const okBudget = budgets.find((b) => b >= needPoe)!;
    const good: SwitchModel = { name: '', ports: portSize, poePorts: portSize, budget: okBudget, managed: true, price: 0 };
    // günstiges Modell mit genau einem Mangel
    const flaws = (['ports', 'budget', 'managed'] as const).filter((k) => (k === 'managed' ? needVlan : k === 'budget' ? budgets.indexOf(okBudget) > 0 : portSize > 8));
    if (!flaws.length) return selectGen.make(new Rng(Math.floor(rng.next() * 2 ** 32)), d);
    const flaw = rng.pick(flaws);
    const cheap: SwitchModel = { ...good, managed: flaw !== 'managed' };
    // nächstkleinere Standardgröße reicht nicht, weil portSize die kleinste passende ist
    if (flaw === 'ports') cheap.ports = cheap.poePorts = portSize === 24 ? 16 : 8;
    if (flaw === 'budget') cheap.budget = budgets[budgets.indexOf(okBudget) - 1];
    // überdimensioniertes Modell: passt, ist aber teurer
    const big: SwitchModel = { name: '', ports: 48, poePorts: 48, budget: 740, managed: true, price: 0 };
    const base = { 8: 180, 16: 320, 24: 460 }[portSize]!;
    good.price = base + rng.int(0, 8) * 10;
    cheap.price = good.price - rng.int(6, 15) * 10;
    big.price = good.price + rng.int(40, 70) * 10;
    if (fits(cheap) || !fits(good) || !fits(big)) return selectGen.make(new Rng(Math.floor(rng.next() * 2 ** 32)), d);

    const models = rng.shuffle([good, cheap, big]);
    const letters = ['A', 'B', 'C'];
    models.forEach((m, i) => (m.name = `Modell ${letters[i]}`));
    const answer = models.indexOf(good);
    const distractors: SingleChoiceQuestion['distractors'] = {};
    models.forEach((m, i) => {
      if (m === cheap) distractors[String(i)] = { why: `${m.name} ist zwar am günstigsten, erfüllt aber nicht alle Anforderungen: ${reasons(m).join('; ')}.`, error: flaw === 'managed' ? 'switch-unmanaged-vlan' : flaw === 'ports' ? 'switch-ports-zu-wenig' : 'switch-poe-budget' };
      if (m === big) distractors[String(i)] = { why: `${m.name} erfüllt alle Anforderungen, ist aber deutlich teurer (${f(m.price)} €) und überdimensioniert. Gesucht war das **günstigste** geeignete Modell.`, error: 'switch-ueberdimensioniert' };
    });
    const table = `| | ${models.map((m) => m.name).join(' | ')} |\n|---|---|---|---|\n| RJ45-Ports (1 Gbit/s) | ${models.map((m) => m.ports).join(' | ')} |\n| davon PoE+ (802.3at) | ${models.map((m) => m.poePorts).join(' | ')} |\n| PoE-Budget | ${models.map((m) => `${m.budget} W`).join(' | ')} |\n| Management | ${models.map((m) => (m.managed ? 'managed (Web, SSH, SNMP, 802.1Q-VLAN)' : 'unmanaged')).join(' | ')} |\n| Preis netto | ${models.map((m) => `${f(m.price)} €`).join(' | ')} |`;
    const req = [
      `${pcs} PCs, ${printers} Netzwerkdrucker, ${phones} IP-Telefone (PoE-Klasse 2, 7 W am Switch-Port) und ${aps} Access Points (PoE+, 30 W am Switch-Port)`,
      reserve ? `${reserve} % Portreserve für Erweiterungen (aufrunden)` : 'keine Portreserve nötig',
      needVlan ? 'Telefone und Access Points sollen in eigene VLANs' : 'VLANs werden nicht benötigt',
      'jedes Gerät belegt einen eigenen RJ45-Port; Uplink über einen separaten Port (nicht mitzählen)',
    ];
    return {
      id: gid('switch.select'), generated: true, kind: 'single', skill: 'switch.select', difficulty: d,
      prompt: `**Handlungssituation:** Für eine Außenstelle der Elektro Krämer GmbH soll ein Switch beschafft werden.\n\n**Anforderungen:**\n${req.map((r) => `- ${r}`).join('\n')}\n\n**Datenblatt-Auszüge:**\n\n${table}\n\nWelches Modell ist das **günstigste**, das alle Anforderungen erfüllt?`,
      options: models.map((m) => m.name),
      answer,
      distractors,
      hints: ['Prüfe jedes Modell gegen jede Anforderung: Ports, PoE-Ports, PoE-Budget, Management.', 'Erst aussortieren, dann unter den passenden das günstigste wählen.'],
      explanation: `**Ergebnis:** **${good.name}** (${f(good.price)} €)\n\n**Weg:**\n1. Ports: ${devices} Geräte${reserve ? ` × ${f(1 + reserve / 100)} = ${f(r2(devices * (1 + reserve / 100)))} → aufgerundet **${needPorts}**` : ` → **${needPorts}**`}\n2. PoE-Geräte: ${phones} + ${aps} = **${poeDevices}** PoE-Ports\n3. PoE-Budget: ${phones} × 7 W + ${aps} × 30 W = **${f(needPoe)} W**\n4. Management: ${needVlan ? '**managed** nötig (VLANs)' : 'egal (keine VLANs gefordert)'}\n\n${models.map((m) => `- ${m.name}: ${fits(m) ? `erfüllt alles, ${f(m.price)} €` : `scheidet aus (${reasons(m).join('; ')})`}`).join('\n')}\n\nUnter den geeigneten Modellen ist **${good.name}** am günstigsten.\n\nHäufiger Fehler: einfach das billigste oder das größte Modell nehmen, ohne jede Anforderung zu prüfen.`,
    };
  },
};

/* ------------------------------------------------------------------ */
/* m05 – Subnetting-Szenario (AP1-typisch: Abteilungen, gleich große Subnetze) */
/* ------------------------------------------------------------------ */

const DEPTS = ['Verwaltung', 'Vertrieb', 'Lager', 'Produktion', 'Buchhaltung', 'Technik', 'Einkauf', 'Service'];
const COMPANIES = ['Elektro Krämer GmbH', 'Autohaus Brandt KG', 'Bäckerei Jansen GmbH', 'Steuerkanzlei Weber & Partner', 'Logistik Nord GmbH'];

const szenarioGen: GeneratorMeta = {
  id: 'subnet.szenario',
  title: 'Subnetting-Szenario: Netz auf Abteilungen aufteilen',
  skill: 'subnet.split',
  module: 'm05',
  make(rng, d) {
    const nDept = rng.int(3, 4);
    const reserve = d === 2 ? rng.pick([1, 2, 3]) : 0;
    const needed = nDept + reserve;
    const bits = Math.ceil(Math.log2(needed) - 1e-9);
    let baseStr: string;
    let basePrefix: number;
    if (d === 3) {
      basePrefix = rng.pick([22, 23]);
      const step = 2 ** (24 - basePrefix);
      baseStr = rng.bool() ? `10.${rng.int(0, 255)}.${rng.int(0, Math.floor(255 / step)) * step}.0` : `172.${rng.int(16, 31)}.${rng.int(0, Math.floor(255 / step)) * step}.0`;
    } else {
      basePrefix = 24;
      baseStr = d === 1 ? `192.168.${rng.int(0, 254)}.0` : `172.${rng.int(16, 31)}.${rng.int(0, 255)}.0`;
    }
    const base = baseStr.split('.').reduce((a, o) => a * 256 + Number(o), 0);
    const prefix = basePrefix + bits;
    const bs = blockSize(prefix);
    const hostsMax = usableHosts(prefix);
    // größte Abteilung braucht genau diese Subnetzgröße (eindeutig, egal ob man über Anzahl oder Hosts rechnet)
    const minBig = usableHosts(prefix + 1) + 1;
    const names = rng.shuffle(DEPTS).slice(0, nDept);
    const hosts = names.map((_, i) => (i === 0 ? rng.int(minBig, hostsMax) : rng.int(Math.max(3, Math.floor(hostsMax / 4)), hostsMax)));
    const order = rng.shuffle(names.map((_, i) => i));
    const depts = order.map((i) => ({ name: names[i], hosts: hosts[i] }));
    const company = rng.pick(COMPANIES);
    const ipf = (n: number) => formatIp(n >>> 0);
    const nets = depts.map((_, i) => base + i * bs);

    const rows: TableQuestion['rows'] = [
      { label: 'alle Subnetze', cells: { prefix: { answer: `/${prefix}` }, mask: { answer: prefixToMask(prefix) }, hosts: { answer: String(hostsMax) } } },
      ...depts.map((dp, i) => ({
        label: `${i + 1}. ${dp.name} (${dp.hosts} Geräte)`,
        cells: { net: { answer: ipf(nets[i]) }, first: { answer: ipf(nets[i] + 1) }, last: { answer: ipf(nets[i] + bs - 2) }, bc: { answer: ipf(nets[i] + bs - 1) } },
      })),
    ];
    const mcs: NonNullable<TableQuestion['misconceptions']> = [
      { cell: '0:prefix', answer: `/${basePrefix + nDept}`, error: 'bits-statt-anzahl', why: `Du hast ${nDept} Bits geliehen (eins pro Abteilung). Mit b Bits entstehen aber 2^b Subnetze – für ${needed} Subnetze reichen ${bits} Bits.` },
      { cell: '0:hosts', answer: String(bs), error: 'reservierte-vergessen', why: `${bs} ist die Zahl aller Adressen. Netz- und Broadcastadresse abziehen: ${bs} − 2 = ${hostsMax}.` },
      ...depts.flatMap((_, i) => [
        { cell: `${i + 1}:bc`, answer: ipf(nets[i] + bs), error: 'broadcast-naechstes-netz', why: `${ipf(nets[i] + bs)} ist schon die nächste Netzadresse. Der Broadcast liegt eine Adresse davor.` },
        { cell: `${i + 1}:last`, answer: ipf(nets[i] + bs - 1), error: 'broadcast-letzter-host', why: 'Das ist der Broadcast. Letzter Host = Broadcast − 1.' },
        { cell: `${i + 1}:first`, answer: ipf(nets[i]), error: 'erster-host-netz', why: 'Die Netzadresse ist nicht nutzbar. Erster Host = Netzadresse + 1.' },
      ]),
    ];
    if (basePrefix + nDept === prefix) mcs.shift();
    const req = reserve ? `${nDept} Abteilungen und **${reserve} weitere Subnetz${reserve > 1 ? 'e' : ''} als Reserve** für geplante Abteilungen` : `${nDept} Abteilungen`;
    return {
      id: gid('subnet.szenario'), generated: true, kind: 'table', skill: 'subnet.split', difficulty: d,
      prompt: `**Handlungssituation:** Die ${company} nutzt das Netz **${ipf(base)}/${basePrefix}**. Für ${req} sollen **gleich große Subnetze** gebildet werden. Leihe dafür **so wenige Bits wie möglich** aus. Die Abteilungen erhalten die Subnetze in der Reihenfolge der Tabelle (die 1. Abteilung das 1. Subnetz).\n\n| Abteilung | Geräte (inkl. Router-Schnittstelle) |\n|---|---|\n${depts.map((dp) => `| ${dp.name} | ${dp.hosts} |`).join('\n')}\n\nTrage das Präfix, die Subnetzmaske und die nutzbaren Hosts je Subnetz ein und ergänze für jede Abteilung Netzadresse, ersten und letzten Host sowie Broadcast.`,
      columns: [
        { key: 'prefix', label: 'Präfix', type: 'cidr' },
        { key: 'mask', label: 'Subnetzmaske', type: 'mask' },
        { key: 'hosts', label: 'Hosts je Subnetz', type: 'number' },
        { key: 'net', label: 'Netzadresse', type: 'ip' },
        { key: 'first', label: 'Erster Host', type: 'ip' },
        { key: 'last', label: 'Letzter Host', type: 'ip' },
        { key: 'bc', label: 'Broadcast', type: 'ip' },
      ],
      rows,
      misconceptions: mcs,
      hints: [
        `Benötigt werden ${needed} Subnetze. Welches 2^b ist mindestens ${needed}?`,
        `Neues Präfix = /${basePrefix} + geliehene Bits. Blockgröße = 2^(32 − Präfix).`,
        'Broadcast = nächste Netzadresse − 1; Hosts = Netzadresse + 1 bis Broadcast − 1.',
      ],
      explanation:
        `**1. Bits ausleihen:** ${needed} Subnetze nötig → 2^${bits} = ${2 ** bits} ≥ ${needed}${bits > 1 ? ` (2^${bits - 1} = ${2 ** (bits - 1)} reicht nicht)` : ''} → **${bits} Bit${bits > 1 ? 's' : ''}**.\n\n` +
        `**2. Präfix und Maske:** /${basePrefix} + ${bits} = **/${prefix}** = \`${prefixToMask(prefix)}\`.\n\n` +
        `**3. Größe:** 32 − ${prefix} = ${32 - prefix} Hostbits → 2^${32 - prefix} = ${f(bs)} Adressen je Subnetz, davon **${f(hostsMax)}** nutzbar (− Netz und Broadcast). Probe: Die größte Abteilung (${Math.max(...hosts)} Geräte) passt hinein.\n\n` +
        `**4. Subnetze auflisten** (Schrittweite ${bs >= 256 ? `${bs / 256} im 3. Oktett` : `${bs} im 4. Oktett`}):\n\n| Nr. | Abteilung | Netzadresse | Hostbereich | Broadcast |\n|---|---|---|---|---|\n` +
        Array.from({ length: 2 ** bits }, (_, i) => `| ${i + 1} | ${depts[i]?.name ?? 'frei (Reserve)'} | ${ipf(base + i * bs)} | ${ipf(base + i * bs + 1)} – ${ipf(base + (i + 1) * bs - 2)} | ${ipf(base + (i + 1) * bs - 1)} |`).join('\n') +
        `\n\nHäufige Fehler: so viele Bits leihen wie Abteilungen, Broadcast = nächstes Netz, Hostzahl ohne „− 2“.`,
    };
  },
};

export const GENERATORS_NETZWERK_LAN: GeneratorMeta[] = [ouiGen, poeGen, selectGen, szenarioGen];
