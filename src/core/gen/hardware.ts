/**
 * Aufgaben-Generatoren für den Bereich „IT-Systeme, Hardware & Energie“ (Module h01–h05).
 * Alle Lösungen werden exakt berechnet; die Rundungsregel steht immer im Aufgabentext.
 */
import type { Difficulty, NumberQuestion } from '../../content/types';
import type { GeneratorMeta } from '../generators';
import { Rng } from '../rng';
import { grade } from '../grading';

let counter = 0;
const gid = (g: string) => `gen:${g}:${Date.now().toString(36)}${(counter++).toString(36)}`;

/** Zahl deutsch formatieren (max. d Nachkommastellen). */
const f = (n: number, d = 2) => n.toLocaleString('de-DE', { maximumFractionDigits: d });
/** Zahl deutsch mit fester Anzahl Nachkommastellen. */
const fx = (n: number, d = 2) => n.toLocaleString('de-DE', { minimumFractionDigits: d, maximumFractionDigits: d });
const round = (x: number, d: number) => {
  const p = 10 ** d;
  return Math.round((x + Number.EPSILON * Math.sign(x)) * p) / p;
};

type Mc = { answer: number; error: string; why: string };

/** Baut eine Zahlenaufgabe und entfernt Fehlbilder, die (innerhalb der Toleranz) der Lösung entsprechen. */
function numQ(
  genId: string,
  skill: string,
  d: Difficulty,
  o: { prompt: string; answer: number; tolerance: number; unit: string; hints: string[]; explanation: string; mcs?: Mc[] },
): NumberQuestion {
  const seen = new Set<string>();
  const misconceptions = (o.mcs ?? [])
    .filter((m) => Number.isFinite(m.answer) && Math.abs(m.answer - o.answer) > o.tolerance + 1e-9)
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
    tolerance: o.tolerance,
    unit: o.unit,
    hints: o.hints,
    misconceptions,
    explanation: o.explanation,
  };
  // Fehlbilder entfernen, die der Bewertungskern (z. B. wegen 1.234 = 1234) als richtig werten würde
  q.misconceptions = misconceptions.filter((m) => !grade(q, m.answer).correct);
  return q;
}

/* ------------------------------------------------------------------ */
/* h04 – Energie                                                       */
/* ------------------------------------------------------------------ */

const stromkosten: GeneratorMeta = {
  id: 'hw.stromkosten',
  title: 'Stromkosten pro Jahr berechnen',
  skill: 'hw.energy.cost',
  module: 'h04',
  make(rng, d) {
    const priceCt = rng.pick([28, 30, 32, 34, 35, 36, 38, 40]);
    const price = priceCt / 100;
    if (d === 1) {
      const dev = rng.pick([
        { name: 'ein Switch', w: rng.pick([25, 30, 40, 45, 60]) },
        { name: 'ein NAS', w: rng.pick([20, 24, 32, 36]) },
        { name: 'ein Router', w: rng.pick([12, 15, 18]) },
        { name: 'ein Server', w: rng.pick([150, 180, 220, 250]) },
      ]);
      const kwh = (dev.w * 24 * 365) / 1000;
      const cost = round(kwh * price, 2);
      return numQ('hw.stromkosten', 'hw.energy.cost', d, {
        prompt: `In der Elektro Krämer GmbH läuft ${dev.name} mit einer durchschnittlichen Leistungsaufnahme von **${dev.w} W** rund um die Uhr (24 h, 365 Tage). Der Strompreis beträgt **${priceCt} ct/kWh**.\n\nWie hoch sind die Stromkosten pro Jahr in **Euro**? (Endergebnis auf Cent runden)`,
        answer: cost,
        tolerance: 0.01,
        unit: '€',
        hints: ['Energie W = P · t. Ein Jahr Dauerbetrieb = 24 h · 365 = 8.760 h.', 'Wh durch 1000 teilen → kWh. Dann mit dem Preis in €/kWh multiplizieren.'],
        mcs: [
          { answer: round(dev.w * 8760 * price, 2), error: 'energie-wh-kwh', why: 'Du hast mit **Wh** statt kWh gerechnet. Der Strompreis gilt pro **kWh** – also erst durch 1000 teilen.' },
          { answer: round(kwh * priceCt, 2), error: 'energie-cent-euro', why: 'Du hast den Preis in **Cent** eingesetzt. Das Ergebnis wären Cent, nicht Euro (durch 100 teilen).' },
          { answer: round(((dev.w * 24) / 1000) * price, 2), error: 'energie-zeitraum', why: 'Das sind die Kosten für **einen Tag**. Gefragt ist das ganze Jahr (· 365).' },
        ],
        explanation:
          `**1. Betriebsstunden:** 24 h · 365 = **8.760 h**\n\n` +
          `**2. Energie:** W = P · t = ${dev.w} W · 8.760 h = ${f(dev.w * 8760)} Wh = **${f(kwh)} kWh**\n\n` +
          `**3. Kosten:** ${f(kwh)} kWh · ${fx(price)} €/kWh = **${fx(cost)} €**`,
      });
    }
    if (d === 2) {
      const dev = rng.pick([
        { name: 'Arbeitsplatz-PC', on: rng.pick([45, 55, 60, 65, 80]), sb: rng.pick([1, 1.5, 2, 3]) },
        { name: 'Multifunktionsdrucker', on: rng.pick([30, 40, 50]), sb: rng.pick([2, 3, 5]) },
        { name: 'Monitor (27 Zoll)', on: rng.pick([22, 25, 28, 30]), sb: rng.pick([0.3, 0.5]) },
      ]);
      const days = rng.pick([200, 210, 220, 230]);
      const h = rng.pick([8, 9, 10]);
      const onH = days * h;
      const sbH = 8760 - onH;
      const kwhOn = (dev.on * onH) / 1000;
      const kwhSb = (dev.sb * sbH) / 1000;
      const cost = round((kwhOn + kwhSb) * price, 2);
      return numQ('hw.stromkosten', 'hw.energy.cost', d, {
        prompt: `Ein **${dev.name}** ist an **${days} Arbeitstagen** je **${h} Stunden** in Betrieb und nimmt dabei **${f(dev.on)} W** auf. In der **übrigen Zeit des Jahres** (365 Tage) bleibt er im Standby mit **${f(dev.sb)} W**. Strompreis: **${priceCt} ct/kWh**.\n\nWie hoch sind die jährlichen Stromkosten in **Euro**? (nur das Endergebnis auf Cent runden)`,
        answer: cost,
        tolerance: 0.02,
        unit: '€',
        hints: [`Betriebsstunden: ${days} · ${h} h. Standbystunden: 8.760 h minus Betriebsstunden.`, 'Beide Energiemengen getrennt berechnen, addieren, mit dem Preis multiplizieren.'],
        mcs: [
          { answer: round(kwhOn * price, 2), error: 'energie-standby-vergessen', why: 'Du hast den **Standby-Verbrauch** vergessen. Auch kleine Standby-Leistungen summieren sich über viele Stunden.' },
          { answer: round((kwhOn + (dev.sb * (365 - days) * 24) / 1000) * price, 2), error: 'energie-zeitraum', why: 'Standby gilt auch an Arbeitstagen außerhalb der Betriebszeit. Standbystunden = 8.760 h − Betriebsstunden.' },
          { answer: round((kwhOn + kwhSb) * 1000 * price, 2), error: 'energie-wh-kwh', why: 'Wh und kWh verwechselt – vor der Multiplikation mit dem Preis durch 1000 teilen.' },
        ],
        explanation:
          `**1. Betriebszeit:** ${days} · ${h} h = **${f(onH)} h** → Standbyzeit: 8.760 h − ${f(onH)} h = **${f(sbH)} h**\n\n` +
          `**2. Energie Betrieb:** ${f(dev.on)} W · ${f(onH)} h = ${f(dev.on * onH)} Wh = **${f(kwhOn, 3)} kWh**\n\n` +
          `**3. Energie Standby:** ${f(dev.sb)} W · ${f(sbH)} h = ${f(dev.sb * sbH)} Wh = **${f(kwhSb, 3)} kWh**\n\n` +
          `**4. Summe:** ${f(kwhOn + kwhSb, 3)} kWh · ${fx(price)} €/kWh = **${fx(cost)} €**`,
      });
    }
    // d === 3: Einsparung durch Gerätetausch für n Arbeitsplätze
    const n = rng.pick([20, 25, 30, 40, 50, 60]);
    const oldW = rng.pick([90, 100, 110, 120]);
    const newW = rng.pick([25, 30, 35, 40]);
    const days = rng.pick([210, 220, 230]);
    const h = rng.pick([8, 9]);
    const hours = days * h;
    const kwhSave = (n * (oldW - newW) * hours) / 1000;
    const save = round(kwhSave * price, 2);
    return numQ('hw.stromkosten', 'hw.energy.cost', d, {
      prompt: `Die Elektro Krämer GmbH ersetzt am Standort Berlin **${n} alte Desktop-PCs** (je **${oldW} W** im Betrieb) durch **Mini-PCs** (je **${newW} W**). Die Geräte laufen an **${days} Tagen** je **${h} Stunden**; außerhalb der Arbeitszeit werden alle Geräte vollständig ausgeschaltet (0 W). Strompreis: **${priceCt} ct/kWh**.\n\nWie viel Euro spart das Unternehmen dadurch **pro Jahr**? (Endergebnis auf Cent runden)`,
      answer: save,
      tolerance: 0.02,
      unit: '€',
      hints: ['Rechne mit der Leistungsdifferenz pro Gerät: alt − neu.', 'Ersparnis = Anzahl · ΔP · Betriebsstunden / 1000 · Preis.'],
      mcs: [
        { answer: round(((oldW - newW) * hours * price) / 1000, 2), error: 'energie-anzahl-vergessen', why: `Das ist die Ersparnis für **ein** Gerät. Es werden ${n} Geräte getauscht.` },
        { answer: round((n * newW * hours * price) / 1000, 2), error: 'energie-differenz', why: 'Das sind die Kosten der **neuen** Geräte, nicht die Ersparnis. Gefragt ist die Differenz alt − neu.' },
        { answer: round((n * (oldW - newW) * 8760 * price) / 1000, 2), error: 'energie-zeitraum', why: 'Die Geräte laufen nicht rund um die Uhr, sondern nur zu den angegebenen Betriebszeiten.' },
      ],
      explanation:
        `**1. Leistungsdifferenz je Gerät:** ${oldW} W − ${newW} W = **${oldW - newW} W**\n\n` +
        `**2. Betriebsstunden:** ${days} · ${h} h = **${f(hours)} h**\n\n` +
        `**3. Eingesparte Energie:** ${n} · ${oldW - newW} W · ${f(hours)} h = ${f(n * (oldW - newW) * hours)} Wh = **${f(kwhSave, 3)} kWh**\n\n` +
        `**4. Ersparnis:** ${f(kwhSave, 3)} kWh · ${fx(price)} €/kWh = **${fx(save)} €** pro Jahr`,
    });
  },
};

const leistung: GeneratorMeta = {
  id: 'hw.leistung',
  title: 'Leistung, Strom und Spannung (P = U · I)',
  skill: 'hw.energy.power',
  module: 'h04',
  make(rng, d) {
    if (d === 1) {
      const dev = rng.pick([
        { name: 'Ein Notebook-Netzteil liefert', u: 19.5, i: rng.pick([2.31, 3.33, 4.62]) },
        { name: 'Ein Router-Steckernetzteil liefert', u: 12, i: rng.pick([1, 1.5, 2, 2.5]) },
        { name: 'Ein USB-C-Netzteil liefert', u: 20, i: rng.pick([1.5, 2.25, 3, 5]) },
        { name: 'Ein Monitor nimmt am Netz', u: 230, i: rng.pick([0.1, 0.12, 0.15, 0.2]) },
      ]);
      const p = round(dev.u * dev.i, 2);
      return numQ('hw.leistung', 'hw.energy.power', d, {
        prompt: `${dev.name} **${f(dev.u)} V** bei **${f(dev.i)} A**${dev.u === 230 ? ' auf (vereinfacht: Wechselstrom mit cos φ = 1)' : ''}. Welche **Leistung in Watt** ergibt sich? (auf zwei Nachkommastellen runden)`,
        answer: p,
        tolerance: 0.01,
        unit: 'W',
        hints: ['P = U · I'],
        mcs: [
          { answer: round(dev.u / dev.i, 4), error: 'leistung-formel', why: 'U / I ergibt den **Widerstand** (Ohm), nicht die Leistung. Leistung: P = U · I.' },
          { answer: round(dev.i / dev.u, 4), error: 'leistung-formel', why: 'Leistung: P = U · I (multiplizieren, nicht teilen).' },
        ],
        explanation: `P = U · I = ${f(dev.u)} V · ${f(dev.i)} A = **${f(p)} W**`,
      });
    }
    if (d === 2) {
      const pw = rng.pick([45, 65, 90, 100, 140, 230, 300, 460, 690]);
      const u = 230;
      const i = round(pw / u, 3);
      return numQ('hw.leistung', 'hw.energy.power', d, {
        prompt: `Ein Gerät mit einer Leistungsaufnahme von **${pw} W** wird an **${u} V** betrieben. Welche **Stromstärke in Ampere** fließt? (auf drei Nachkommastellen runden)`,
        answer: i,
        tolerance: 0.001,
        unit: 'A',
        hints: ['P = U · I nach I umstellen.', 'I = P / U'],
        mcs: [
          { answer: round(pw * u, 3), error: 'leistung-formel', why: 'Falsch umgestellt: aus P = U · I folgt I = P / U, nicht P · U.' },
          { answer: round(u / pw, 4), error: 'leistung-formel', why: 'Falsch umgestellt: I = P / U (Leistung durch Spannung).' },
        ],
        explanation: `I = P / U = ${pw} W / ${u} V = **${f(i, 3)} A**`,
      });
    }
    // d === 3: Wie viele Geräte an einem 16-A-Stromkreis?
    const pw = rng.pick([180, 250, 300, 350, 450, 550, 650]);
    const fuse = rng.pick([10, 16]);
    const pMax = 230 * fuse;
    const n = Math.floor(pMax / pw);
    return numQ('hw.leistung', 'hw.energy.power', d, {
      prompt: `Im Schulungsraum der Elektro Krämer GmbH hängen alle Steckdosen an **einem** Stromkreis (230 V), der mit **${fuse} A** abgesichert ist. Jeder Schulungs-PC (inkl. Monitor) nimmt unter Last maximal **${pw} W** auf.\n\nWie viele PCs dürfen **höchstens** gleichzeitig unter Volllast an diesem Stromkreis betrieben werden, ohne die Absicherung rechnerisch zu überschreiten? (ganze Zahl)`,
      answer: n,
      tolerance: 0,
      unit: 'PCs',
      hints: ['Maximale Leistung des Stromkreises: P = U · I.', 'Dann durch die Leistung pro PC teilen und **abrunden** (ein halber PC geht nicht).'],
      mcs: [
        { answer: Math.ceil(pMax / pw), error: 'runden-falsch', why: 'Hier muss **abgerundet** werden – sonst wird die Absicherung überschritten.' },
        { answer: Math.floor((fuse * 1000) / pw), error: 'leistung-formel', why: 'Die Stromstärke allein ist keine Leistung. Erst P_max = 230 V · I berechnen.' },
      ],
      explanation:
        `**1. Maximale Leistung des Stromkreises:** P = U · I = 230 V · ${fuse} A = **${f(pMax)} W**\n\n` +
        `**2. Anzahl PCs:** ${f(pMax)} W / ${pw} W = ${f(pMax / pw, 2)} → abrunden → **${n} PCs**\n\n` +
        `In der Praxis plant man zusätzlich Reserve ein (Einschaltströme, weitere Verbraucher wie Beamer, Drucker).`,
    });
  },
};

const wirkungsgrad: GeneratorMeta = {
  id: 'hw.wirkungsgrad',
  title: 'Wirkungsgrad und Verlustleistung',
  skill: 'hw.energy.efficiency',
  module: 'h04',
  make(rng, d) {
    const mode = d === 1 ? 'eta' : d === 2 ? rng.pick(['pin', 'loss'] as const) : 'year';
    if (mode === 'eta') {
      const pout = rng.pick([180, 240, 300, 360, 450, 540]);
      const etaPct = rng.pick([80, 82, 85, 87, 88, 90, 92, 94]);
      const pin = round(pout / (etaPct / 100), 1);
      const eta = round((pout / pin) * 100, 1);
      return numQ('hw.wirkungsgrad', 'hw.energy.efficiency', d, {
        prompt: `Ein PC-Netzteil gibt **${pout} W** an die Komponenten ab. Ein Messgerät an der Steckdose zeigt eine Leistungsaufnahme von **${f(pin, 1)} W**.\n\nWie hoch ist der **Wirkungsgrad η in Prozent**? (auf eine Nachkommastelle runden)`,
        answer: eta,
        tolerance: 0.1,
        unit: '%',
        hints: ['η = P_ab / P_zu', 'Abgegebene Leistung durch aufgenommene Leistung, dann · 100 %.'],
        mcs: [{ answer: round((pin / pout) * 100, 1), error: 'wirkungsgrad-kehrwert', why: 'Kehrwert gebildet. Der Wirkungsgrad ist immer **kleiner als 100 %**: η = P_ab / P_zu.' }],
        explanation: `η = P_ab / P_zu = ${pout} W / ${f(pin, 1)} W = ${f(pout / pin, 4)} → **${f(eta, 1)} %**`,
      });
    }
    if (mode === 'pin' || mode === 'loss') {
      const pout = rng.pick([150, 200, 250, 320, 400, 500, 650]);
      const etaPct = rng.pick([82, 85, 87, 88, 90, 92]);
      const pin = pout / (etaPct / 100);
      const loss = pin - pout;
      const ans = round(mode === 'pin' ? pin : loss, 1);
      return numQ('hw.wirkungsgrad', 'hw.energy.efficiency', d, {
        prompt:
          `Die Komponenten eines Servers benötigen zusammen **${pout} W** (Gleichstromseite). Das Netzteil hat bei dieser Last einen Wirkungsgrad von **${etaPct} %**.\n\n` +
          (mode === 'pin'
            ? 'Welche **Leistung nimmt das Netzteil aus dem Stromnetz** auf? (in W, auf eine Nachkommastelle runden)'
            : 'Wie groß ist die **Verlustleistung** des Netzteils (in W, auf eine Nachkommastelle runden), die als Wärme abgeführt werden muss?'),
        answer: ans,
        tolerance: 0.1,
        unit: 'W',
        hints: ['η = P_ab / P_zu → P_zu = P_ab / η', 'Verlustleistung P_V = P_zu − P_ab'],
        mcs: [
          { answer: round(mode === 'pin' ? pout * (etaPct / 100) : pout - pout * (etaPct / 100), 1), error: 'wirkungsgrad-multipliziert', why: 'Mit η **multipliziert** statt geteilt. Das Netzteil muss **mehr** aufnehmen, als es abgibt: P_zu = P_ab / η.' },
          { answer: round(mode === 'pin' ? pout * (1 + (100 - etaPct) / 100) : pout * ((100 - etaPct) / 100), 1), error: 'wirkungsgrad-prozent-aufschlag', why: 'Ein prozentualer Aufschlag auf P_ab ist nicht dasselbe wie die Division durch η. Rechne P_zu = P_ab / η.' },
          ...(mode === 'loss' ? [{ answer: round(pin, 1), error: 'wirkungsgrad-verlust', why: 'Das ist die aufgenommene Leistung. Die Verlustleistung ist die Differenz P_zu − P_ab.' }] : []),
        ],
        explanation:
          `**1. Aufgenommene Leistung:** P_zu = P_ab / η = ${pout} W / ${f(etaPct / 100)} = **${f(pin, 2)} W**\n\n` +
          `**2. Verlustleistung:** P_V = P_zu − P_ab = ${f(pin, 2)} W − ${pout} W = **${f(loss, 2)} W**\n\n` +
          `Gefragt: **${f(ans, 1)} W**`,
      });
    }
    // year: Verlustenergie eines Netzteils im Dauerbetrieb pro Jahr in kWh, Vergleich zweier Netzteile
    const pout = rng.pick([200, 250, 300, 400]);
    const e1 = rng.pick([82, 85]);
    const e2 = rng.pick([92, 94]);
    const pin1 = pout / (e1 / 100);
    const pin2 = pout / (e2 / 100);
    const kwh = round(((pin1 - pin2) * 8760) / 1000, 1);
    return numQ('hw.wirkungsgrad', 'hw.energy.efficiency', d, {
      prompt: `Ein Server im Dauerbetrieb (8.760 h/Jahr) benötigt konstant **${pout} W** auf der Gleichstromseite. Das alte Netzteil hat einen Wirkungsgrad von **${e1} %**, ein neues 80-PLUS-Netzteil bei dieser Last **${e2} %**.\n\nWie viele **kWh pro Jahr** spart der Tausch? (auf eine Nachkommastelle runden; Zwischenergebnisse nicht runden)`,
      answer: kwh,
      tolerance: 0.2,
      unit: 'kWh',
      hints: ['Für jedes Netzteil P_zu = P_ab / η berechnen.', 'Differenz der Aufnahmeleistungen · 8.760 h / 1000.'],
      mcs: [
        { answer: round((pout * ((e2 - e1) / 100) * 8760) / 1000, 1), error: 'wirkungsgrad-prozent-aufschlag', why: 'Die Differenz der Wirkungsgrade (Prozentpunkte) darf man nicht einfach auf P_ab anwenden. Berechne beide Aufnahmeleistungen mit P_zu = P_ab / η.' },
        { answer: round((pin1 - pin2) * 8760, 1), error: 'energie-wh-kwh', why: 'Das Ergebnis ist in Wh – durch 1000 teilen für kWh.' },
      ],
      explanation:
        `**1. Alt:** P_zu = ${pout} W / ${f(e1 / 100)} = ${f(pin1, 2)} W\n\n` +
        `**2. Neu:** P_zu = ${pout} W / ${f(e2 / 100)} = ${f(pin2, 2)} W\n\n` +
        `**3. Differenz:** ${f(pin1 - pin2, 2)} W · 8.760 h = ${f((pin1 - pin2) * 8760, 0)} Wh ≈ **${f(kwh, 1)} kWh** pro Jahr`,
    });
  },
};

const usv: GeneratorMeta = {
  id: 'hw.usv',
  title: 'USV dimensionieren (VA, W, Überbrückungszeit)',
  skill: 'hw.ups.sizing',
  module: 'h04',
  make(rng, d) {
    if (d === 1) {
      const va = rng.pick([500, 750, 1000, 1500, 2200, 3000]);
      const pf = rng.pick([0.6, 0.7, 0.8, 0.9]);
      const w = round(va * pf, 1);
      return numQ('hw.usv', 'hw.ups.sizing', d, {
        prompt: `Im Datenblatt einer USV steht: **Ausgangsleistung ${f(va)} VA**, **Leistungsfaktor cos φ = ${f(pf)}**.\n\nWelche **Wirkleistung in Watt** kann die USV höchstens liefern?`,
        answer: w,
        tolerance: 0.1,
        unit: 'W',
        hints: ['VA ist die Scheinleistung S, W ist die Wirkleistung P.', 'P = S · cos φ'],
        mcs: [
          { answer: va, error: 'usv-va-gleich-w', why: 'VA und W sind nicht dasselbe. Die Wirkleistung ist P = S · cos φ und damit (bei cos φ < 1) kleiner.' },
          { answer: round(va / pf, 1), error: 'usv-pf-geteilt', why: 'Durch cos φ teilen ergibt die Scheinleistung, wenn die Wirkleistung gegeben ist. Hier ist S gegeben: P = S · cos φ.' },
        ],
        explanation: `P = S · cos φ = ${f(va)} VA · ${f(pf)} = **${f(w, 1)} W**`,
      });
    }
    if (d === 2) {
      const devices = rng.shuffle([
        { n: 'Server', w: rng.pick([280, 320, 350, 400]) },
        { n: 'NAS', w: rng.pick([40, 55, 65]) },
        { n: 'Core-Switch', w: rng.pick([60, 75, 90]) },
        { n: 'Firewall', w: rng.pick([25, 35, 45]) },
        { n: 'Router', w: rng.pick([15, 20, 25]) },
      ]).slice(0, rng.pick([3, 4]));
      const sum = devices.reduce((a, b) => a + b.w, 0);
      const pf = rng.pick([0.8, 0.9]);
      const reserve = rng.pick([20, 25, 30]);
      const va = Math.ceil((sum * (1 + reserve / 100)) / pf - 1e-9);
      return numQ('hw.usv', 'hw.ups.sizing', d, {
        prompt:
          `Für den Serverschrank am Standort Hamburg soll eine USV beschafft werden. Angeschlossen werden:\n\n| Gerät | Leistungsaufnahme |\n|---|---|\n${devices.map((x) => `| ${x.n} | ${x.w} W |`).join('\n')}\n\n` +
          `Es soll eine **Leistungsreserve von ${reserve} %** eingeplant werden. Der Leistungsfaktor der USV beträgt **cos φ = ${f(pf)}**.\n\nWelche **Scheinleistung in VA** muss die USV mindestens haben? (auf ganze VA **aufrunden**)`,
        answer: va,
        tolerance: 0,
        unit: 'VA',
        hints: ['Summe der Wirkleistungen bilden, dann die Reserve aufschlagen (· (1 + Reserve)).', 'S = P / cos φ – das Ergebnis aufrunden.'],
        mcs: [
          { answer: Math.ceil(sum / pf - 1e-9), error: 'usv-reserve-vergessen', why: `Die geforderte Reserve von ${reserve} % fehlt.` },
          { answer: Math.ceil(sum * (1 + reserve / 100) - 1e-9), error: 'usv-va-gleich-w', why: 'Das ist die Wirkleistung in W. Für die Scheinleistung in VA noch durch cos φ teilen.' },
          { answer: Math.ceil(sum * (1 + reserve / 100) * pf - 1e-9), error: 'usv-pf-multipliziert', why: 'Mit cos φ multipliziert statt geteilt. Die Scheinleistung ist immer ≥ der Wirkleistung: S = P / cos φ.' },
        ],
        explanation:
          `**1. Summe Wirkleistung:** ${devices.map((x) => `${x.w} W`).join(' + ')} = **${sum} W**\n\n` +
          `**2. Mit Reserve:** ${sum} W · ${f(1 + reserve / 100)} = **${f(sum * (1 + reserve / 100), 2)} W**\n\n` +
          `**3. Scheinleistung:** S = P / cos φ = ${f(sum * (1 + reserve / 100), 2)} W / ${f(pf)} = ${f((sum * (1 + reserve / 100)) / pf, 2)} VA → aufgerundet **${va} VA**\n\n` +
          `Man wählt dann das nächstgrößere Modell (z. B. eine USV mit ${va <= 1000 ? '1.000' : va <= 1500 ? '1.500' : va <= 2200 ? '2.200' : '3.000'} VA) und prüft zusätzlich die **W-Angabe** im Datenblatt.`,
      });
    }
    // d === 3: idealisierte Überbrückungszeit
    const nBat = rng.pick([2, 4]);
    const ah = rng.pick([7, 9]);
    const wh = nBat * 12 * ah;
    const eta = rng.pick([0.85, 0.9]);
    const load = rng.pick([150, 200, 250, 300, 350, 400]);
    const minutes = round(((wh * eta) / load) * 60, 0);
    return numQ('hw.usv', 'hw.ups.sizing', d, {
      prompt: `Eine USV enthält **${nBat} Bleiakkus mit je 12 V und ${ah} Ah**. Der Wechselrichter arbeitet mit einem Wirkungsgrad von **${f(eta * 100)} %**. Die angeschlossene Last beträgt **${load} W**.\n\nWie lange kann die USV die Last **rechnerisch (idealisiert)** versorgen? Gib das Ergebnis in **Minuten** an (auf ganze Minuten runden).`,
      answer: minutes,
      tolerance: 1,
      unit: 'min',
      hints: ['Energie eines Akkus: W = U · Q = 12 V · Ah → Wh. Alle Akkus addieren.', 't = nutzbare Energie / Last = (Wh · η) / W → Stunden, dann · 60.'],
      mcs: [
        { answer: round((wh / load) * 60, 0), error: 'usv-wirkungsgrad-vergessen', why: 'Der Wirkungsgrad des Wechselrichters fehlt – nicht die gesamte Akkuenergie kommt bei der Last an.' },
        { answer: round(((12 * ah * eta) / load) * 60, 0), error: 'usv-akkuanzahl', why: `Es sind ${nBat} Akkus verbaut – deren Energie muss addiert werden.` },
        { answer: round((wh * eta) / load, 2), error: 'usv-stunden-minuten', why: 'Das Ergebnis ist in **Stunden**. Für Minuten mit 60 multiplizieren.' },
      ],
      explanation:
        `**1. Akkuenergie:** ${nBat} · 12 V · ${ah} Ah = **${wh} Wh**\n\n` +
        `**2. Nutzbare Energie:** ${wh} Wh · ${f(eta)} = **${f(wh * eta, 1)} Wh**\n\n` +
        `**3. Zeit:** ${f(wh * eta, 1)} Wh / ${load} W = ${f((wh * eta) / load, 3)} h · 60 = **≈ ${minutes} min**\n\n` +
        `*Achtung Praxis:* Bei hoher Last liefern Bleiakkus deutlich weniger als ihre Nennkapazität (Peukert-Effekt), außerdem altern sie. Verbindlich sind die **Laufzeittabellen des Herstellers**.`,
    });
  },
};

/** 80 PLUS, 230 V EU Internal: Mindestwirkungsgrad in % je Lastpunkt (10/20/50/100 %). */
const PLUS_EU: { n: string; e: Record<number, number> }[] = [
  { n: '80 PLUS', e: { 20: 82, 50: 85, 100: 82 } },
  { n: 'Bronze', e: { 20: 85, 50: 88, 100: 85 } },
  { n: 'Silver', e: { 20: 87, 50: 90, 100: 87 } },
  { n: 'Gold', e: { 20: 90, 50: 92, 100: 89 } },
  { n: 'Platinum', e: { 20: 92, 50: 94, 100: 90 } },
  { n: 'Titanium', e: { 10: 90, 20: 94, 50: 96, 100: 94 } },
];
/** dieselben Stufen für 115 V (nur für das Fehlbild „falsche Tabelle“) */
const PLUS_115: Record<string, Record<number, number>> = {
  '80 PLUS': { 20: 80, 50: 80, 100: 80 },
  Bronze: { 20: 82, 50: 85, 100: 82 },
  Silver: { 20: 85, 50: 88, 100: 85 },
  Gold: { 20: 87, 50: 90, 100: 87 },
  Platinum: { 20: 90, 50: 92, 100: 89 },
  Titanium: { 10: 90, 20: 92, 50: 94, 100: 90 },
};
const plusTable = () =>
  `**Beleg: 80 PLUS – Mindestwirkungsgrade (230 V EU, interne Netzteile)**\n\n| Stufe | 10 % Last | 20 % Last | 50 % Last | 100 % Last |\n|---|---|---|---|---|\n` +
  PLUS_EU.map((s) => `| ${s.n} | ${s.e[10] ? s.e[10] + ' %' : '–'} | ${s.e[20]} % | ${s.e[50]} % | ${s.e[100]} % |`).join('\n');

const achtzigPlus: GeneratorMeta = {
  id: 'hw.80plus',
  title: '80 PLUS (230 V EU): aufgenommene Leistung aus Tabelle',
  skill: 'hw.energy.efficiency',
  module: 'h04',
  make(rng, d) {
    const nenn = rng.pick([400, 500, 550, 650, 750, 850, 1000]);
    if (d === 1 || d === 2) {
      const lvl = rng.pick(PLUS_EU);
      const load = rng.pick([20, 50, 100]);
      const eta = lvl.e[load];
      const pab = (nenn * load) / 100;
      const pzu = round(pab / (eta / 100), 1);
      const eta115 = PLUS_115[lvl.n][load];
      return numQ('hw.80plus', 'hw.energy.efficiency', d, {
        prompt:
          `${plusTable()}\n\nEin PC-Netzteil mit **${f(nenn, 0)} W** Nennleistung ist nach **80 PLUS ${lvl.n}** (230 V EU) zertifiziert. ` +
          (d === 1
            ? `Es arbeitet bei **${load} % Last** und gibt dabei **${f(pab)} W** an die Komponenten ab.`
            : `Die Komponenten des PCs benötigen gerade **${f(pab)} W**.`) +
          `\n\nWelche Leistung nimmt das Netzteil **höchstens** aus dem Stromnetz auf, wenn es genau den Mindestwirkungsgrad der Tabelle erreicht? (in W, auf eine Nachkommastelle runden)`,
        answer: pzu,
        tolerance: 0.1,
        unit: 'W',
        hints: [
          ...(d === 2 ? [`Erst die Auslastung bestimmen: Abgabe ÷ Nennleistung = ${f(pab)} W ÷ ${f(nenn, 0)} W.`] : []),
          `In der Tabelle die Zeile „${lvl.n}“ und die Spalte „${load} % Last“ ablesen.`,
          'Aufgenommene Leistung = abgegebene Leistung ÷ Wirkungsgrad (η als Dezimalzahl).',
        ],
        mcs: [
          { answer: round(pab * (eta / 100), 1), error: 'wirkungsgrad-multipliziert', why: 'Mit η **multipliziert** statt geteilt. Das Netzteil nimmt **mehr** auf, als es abgibt: P_zu = P_ab ÷ η.' },
          { answer: round(pab * (1 + (100 - eta) / 100), 1), error: 'wirkungsgrad-prozent-aufschlag', why: `${100 - eta} % Aufschlag auf P_ab ist nicht dasselbe wie die Division durch η. Rechne P_zu = P_ab ÷ η.` },
          { answer: round(pab / (eta115 / 100), 1), error: '80plus-tabelle-115v', why: 'Du hast die Werte der **115-V-Tabelle** (USA) verwendet. Für Deutschland gilt die Tabelle „230 V EU“ aus dem Beleg.' },
          { answer: round(nenn / (eta / 100), 1), error: '80plus-nennleistung', why: 'Du hast mit der **Nennleistung** gerechnet. Entscheidend ist die tatsächlich abgegebene Leistung.' },
        ],
        explanation:
          (d === 2 ? `**1. Auslastung:** ${f(pab)} W ÷ ${f(nenn, 0)} W = ${f(load / 100)} = **${load} %**\n\n` : '') +
          `**${d === 2 ? 2 : 1}. Wirkungsgrad aus der Tabelle:** 80 PLUS ${lvl.n}, ${load} % Last → **η = ${eta} % = ${f(eta / 100)}**\n\n` +
          `**${d === 2 ? 3 : 2}. Aufgenommene Leistung:** P_zu = P_ab ÷ η = ${f(pab)} W ÷ ${f(eta / 100)} = **${f(pzu, 1)} W**\n\n` +
          `Verlustleistung (Wärme): ${f(pzu, 1)} W − ${f(pab)} W ≈ ${f(pzu - pab, 1)} W.\n\nHäufiger Fehler: mit η multiplizieren – dann käme weniger heraus, als das Netzteil abgibt. Das ist unmöglich.`,
      });
    }
    // d === 3: zwei Netzteile gleicher Nennleistung im Dauerbetrieb bei 50 % Last vergleichen
    const [a, b] = rng.pick([
      [PLUS_EU[1], PLUS_EU[3]],
      [PLUS_EU[1], PLUS_EU[4]],
      [PLUS_EU[0], PLUS_EU[3]],
      [PLUS_EU[3], PLUS_EU[5]],
      [PLUS_EU[2], PLUS_EU[4]],
    ]);
    const pab = nenn / 2;
    const pa = pab / (a.e[50] / 100);
    const pb = pab / (b.e[50] / 100);
    const kwh = round(((pa - pb) * 8760) / 1000, 1);
    return numQ('hw.80plus', 'hw.energy.efficiency', d, {
      prompt:
        `${plusTable()}\n\nFür einen Server im Dauerbetrieb (24/7, 8.760 h im Jahr) stehen zwei Netzteile mit je **${f(nenn, 0)} W** Nennleistung zur Auswahl: **80 PLUS ${a.n}** und **80 PLUS ${b.n}** (230 V EU). Der Server benötigt dauerhaft **${f(pab)} W**. Beide Netzteile erreichen genau ihren Mindestwirkungsgrad.\n\n` +
        `Wie viele **kWh pro Jahr** spart das ${b.n}-Netzteil gegenüber dem ${a.n}-Netzteil? (auf eine Nachkommastelle runden, Zwischenergebnisse nicht runden)`,
      answer: kwh,
      tolerance: 0.2,
      unit: 'kWh',
      hints: [`Auslastung: ${f(pab)} W ÷ ${f(nenn, 0)} W = 50 % → Spalte „50 % Last“.`, 'Für jedes Netzteil P_zu = P_ab ÷ η, dann die Differenz · 8.760 h ÷ 1.000.'],
      mcs: [
        { answer: round((pab * ((b.e[50] - a.e[50]) / 100) * 8760) / 1000, 1), error: 'wirkungsgrad-prozent-aufschlag', why: 'Die Differenz der Wirkungsgrade (Prozentpunkte) darf man nicht einfach auf P_ab anwenden. Berechne beide Aufnahmeleistungen mit P_zu = P_ab ÷ η.' },
        { answer: round((pa - pb) * 8760, 1), error: 'energie-wh-kwh', why: 'Das Ergebnis ist in **Wh**. Für kWh durch 1.000 teilen.' },
        { answer: round(((nenn / (a.e[50] / 100) - nenn / (b.e[50] / 100)) * 8760) / 1000, 1), error: '80plus-nennleistung', why: 'Du hast mit der **Nennleistung** gerechnet. Der Server braucht nur die Hälfte davon.' },
      ],
      explanation:
        `**1. Auslastung:** ${f(pab)} W ÷ ${f(nenn, 0)} W = 50 % → ${a.n}: η = ${a.e[50]} %, ${b.n}: η = ${b.e[50]} %\n\n` +
        `**2. ${a.n}:** ${f(pab)} W ÷ ${f(a.e[50] / 100)} = ${f(pa, 2)} W\n\n` +
        `**3. ${b.n}:** ${f(pab)} W ÷ ${f(b.e[50] / 100)} = ${f(pb, 2)} W\n\n` +
        `**4. Ersparnis:** (${f(pa, 2)} − ${f(pb, 2)}) W · 8.760 h = ${f((pa - pb) * 8760, 0)} Wh ≈ **${f(kwh, 1)} kWh** pro Jahr\n\n` +
        `Dazu kommt weniger Abwärme, die die Klimaanlage abführen muss.`,
    });
  },
};

const PROFILE = [
  { n: 'Montag bis Freitag', days: 5 },
  { n: 'Montag bis Samstag', days: 6 },
];

const betriebsprofil: GeneratorMeta = {
  id: 'hw.betriebsprofil',
  title: 'Energie mit Betriebsprofil (Tage × Stunden × Leistung, Standby)',
  skill: 'hw.energy.cost',
  module: 'h04',
  make(rng, d) {
    if (d === 1) {
      const n = rng.pick([20, 30, 40, 50, 75, 80, 120]);
      const w = rng.pick([60, 80, 120, 150, 200, 250]);
      const h = rng.pick([8, 9, 10, 12]);
      const kwh = round((n * w * h) / 1000, 2);
      return numQ('hw.betriebsprofil', 'hw.energy.cost', d, {
        prompt: `In der Verwaltung der Elektro Krämer GmbH laufen **${n} PCs** mit je **${w} W** Leistungsaufnahme an einem Arbeitstag **${h} Stunden** lang.\n\nWie viel elektrische Energie verbrauchen alle PCs zusammen an **einem Tag**? (in kWh, auf zwei Nachkommastellen runden)`,
        answer: kwh,
        tolerance: 0.01,
        unit: 'kWh',
        hints: ['W = P · t · Anzahl der Geräte.', 'Ergebnis in Wh durch 1.000 teilen → kWh.'],
        mcs: [
          { answer: n * w * h, error: 'energie-wh-kwh', why: 'Das Ergebnis ist in **Wh**. Für kWh durch 1.000 teilen.' },
          { answer: round((w * h) / 1000, 2), error: 'energie-anzahl-vergessen', why: `Das ist **ein** PC. Es laufen ${n} PCs.` },
          { answer: round((n * w * 24) / 1000, 2), error: 'energie-zeitraum', why: `Die PCs laufen nicht 24 h, sondern ${h} h pro Tag.` },
        ],
        explanation: `W = Anzahl · P · t = ${n} · ${w} W · ${h} h = ${f(n * w * h, 0)} Wh = **${f(kwh)} kWh** pro Tag`,
      });
    }
    const prof = rng.pick(PROFILE);
    const h = rng.pick([8, 10, 12]);
    const on = d === 2 ? rng.pick([40, 55, 65, 80, 120]) : rng.pick([35, 45, 60, 90]);
    const sb = rng.pick([0.5, 1, 2, 3, 5]);
    const onWeek = prof.days * h;
    const sbWeek = 168 - onWeek;
    const onYear = onWeek * 52;
    const sbYear = sbWeek * 52;
    const kwhOn = (on * onYear) / 1000;
    const kwhSb = (sb * sbYear) / 1000;
    if (d === 2) {
      const kwh = round(kwhOn + kwhSb, 2);
      return numQ('hw.betriebsprofil', 'hw.energy.cost', d, {
        prompt:
          `**Betriebsprofil** eines Thin-Client-Arbeitsplatzes (Rechner + Monitor):\n\n| Zustand | Zeit | Leistung |\n|---|---|---|\n| Betrieb | ${prof.n}, je ${h} h | ${f(on)} W |\n| Standby | restliche Stunden der Woche | ${f(sb)} W |\n\n` +
          `Rechne mit **52 Wochen** pro Jahr (eine Woche = 168 h).\n\nWie viel Energie verbraucht der Arbeitsplatz **pro Jahr**? (in kWh, auf zwei Nachkommastellen runden)`,
        answer: kwh,
        tolerance: 0.02,
        unit: 'kWh',
        hints: [`Betrieb pro Woche: ${prof.days} · ${h} h. Standby pro Woche: 168 h minus Betriebsstunden.`, 'Beide Zustände getrennt rechnen (P · t), mit 52 Wochen multiplizieren, addieren, durch 1.000 teilen.'],
        mcs: [
          { answer: round(kwhOn, 2), error: 'energie-standby-vergessen', why: 'Der **Standby** fehlt. Auch wenige Watt summieren sich über viele Stunden.' },
          { answer: round((on * 8760) / 1000, 2), error: 'energie-zeitraum', why: 'Der Arbeitsplatz läuft nicht 8.760 h unter Last. Nutze das Betriebsprofil.' },
          { answer: round(kwhOn + kwhSb, 2) * 1000, error: 'energie-wh-kwh', why: 'Das sind Wh – für kWh durch 1.000 teilen.' },
        ],
        explanation:
          `**1. Stunden pro Woche:** Betrieb ${prof.days} · ${h} h = **${onWeek} h**; Standby 168 h − ${onWeek} h = **${sbWeek} h**\n\n` +
          `**2. Stunden pro Jahr (· 52):** Betrieb ${f(onYear, 0)} h; Standby ${f(sbYear, 0)} h\n\n` +
          `**3. Energie Betrieb:** ${f(on)} W · ${f(onYear, 0)} h = ${f(on * onYear, 0)} Wh = ${f(kwhOn, 3)} kWh\n\n` +
          `**4. Energie Standby:** ${f(sb)} W · ${f(sbYear, 0)} h = ${f(sb * sbYear, 0)} Wh = ${f(kwhSb, 3)} kWh\n\n` +
          `**5. Summe:** **${f(kwh)} kWh** pro Jahr\n\nHäufiger Fehler: Standby vergessen oder mit 8.760 h Volllast rechnen.`,
      });
    }
    // d === 3: Kosten für n Arbeitsplätze mit Profil und Standby
    const n = rng.pick([12, 15, 20, 25, 40]);
    const priceCt = rng.pick([28, 30, 32, 35, 38]);
    const cost = round((n * (kwhOn + kwhSb) * priceCt) / 100, 2);
    return numQ('hw.betriebsprofil', 'hw.energy.cost', d, {
      prompt:
        `Im Vertrieb in Berlin stehen **${n} gleiche Arbeitsplätze** mit diesem Betriebsprofil:\n\n| Zustand | Zeit | Leistung je Arbeitsplatz |\n|---|---|---|\n| Betrieb | ${prof.n}, je ${h} h | ${f(on)} W |\n| Standby | restliche Stunden der Woche | ${f(sb)} W |\n\n` +
        `Strompreis: **${priceCt} ct/kWh**, **52 Wochen** pro Jahr (1 Woche = 168 h).\n\nWie hoch sind die Stromkosten **aller Arbeitsplätze pro Jahr**? (in €, nur das Endergebnis auf Cent runden)`,
      answer: cost,
      tolerance: 0.05,
      unit: '€',
      hints: ['Erst die Jahresenergie **eines** Arbeitsplatzes (Betrieb + Standby) bestimmen.', `Dann · ${n} Arbeitsplätze · ${f(priceCt / 100)} €/kWh.`],
      mcs: [
        { answer: round((kwhOn + kwhSb) * priceCt / 100, 2), error: 'energie-anzahl-vergessen', why: `Das ist **ein** Arbeitsplatz. Es sind ${n}.` },
        { answer: round((n * kwhOn * priceCt) / 100, 2), error: 'energie-standby-vergessen', why: 'Der **Standby** fehlt in deiner Rechnung.' },
        { answer: round(n * (kwhOn + kwhSb) * priceCt, 2), error: 'energie-cent-euro', why: 'Der Preis ist in **Cent** – durch 100 teilen.' },
      ],
      explanation:
        `**1. Stunden pro Jahr:** Betrieb ${prof.days} · ${h} h · 52 = **${f(onYear, 0)} h**; Standby (168 h − ${onWeek} h) · 52 = **${f(sbYear, 0)} h**\n\n` +
        `**2. Energie je Arbeitsplatz:** ${f(on)} W · ${f(onYear, 0)} h + ${f(sb)} W · ${f(sbYear, 0)} h = ${f(on * onYear + sb * sbYear, 0)} Wh = **${f(kwhOn + kwhSb, 3)} kWh**\n\n` +
        `**3. Alle Arbeitsplätze:** ${f(kwhOn + kwhSb, 3)} kWh · ${n} = ${f(n * (kwhOn + kwhSb), 3)} kWh\n\n` +
        `**4. Kosten:** ${f(n * (kwhOn + kwhSb), 3)} kWh · ${fx(priceCt / 100)} €/kWh = **${fx(cost)} €** pro Jahr`,
    });
  },
};

const co2: GeneratorMeta = {
  id: 'hw.co2',
  title: 'Energieeinsparung und CO₂-Einsparung berechnen',
  skill: 'hw.green.it',
  module: 'h04',
  make(rng, d) {
    const fac = rng.pick([350, 380, 400, 420, 450]);
    const facTxt = `Rechne mit einem **angenommenen Emissionsfaktor von ${fac} g CO₂ pro kWh** (der echte Wert des deutschen Strommixes ändert sich jedes Jahr).`;
    if (d === 1) {
      const kwh = rng.pick([850, 1200, 2400, 3650, 5200, 8760, 12500]);
      const kg = round((kwh * fac) / 1000, 1);
      return numQ('hw.co2', 'hw.green.it', d, {
        prompt: `Der Serverraum am Standort Hamburg hat im letzten Jahr **${f(kwh, 0)} kWh** Strom verbraucht. ${facTxt}\n\nWie viel **kg CO₂** entsprechen diesem Verbrauch? (auf eine Nachkommastelle runden)`,
        answer: kg,
        tolerance: 0.1,
        unit: 'kg',
        hints: ['CO₂ = Energie in kWh · Emissionsfaktor.', 'g durch 1.000 teilen → kg.'],
        mcs: [{ answer: kwh * fac, error: 'co2-g-kg', why: 'Das Ergebnis ist in **Gramm**. Für kg durch 1.000 teilen.' }],
        explanation: `${f(kwh, 0)} kWh · ${fac} g/kWh = ${f(kwh * fac, 0)} g = **${f(kg, 1)} kg CO₂**`,
      });
    }
    const pOld = rng.pick([1500, 2000, 2400, 3000]);
    const pNew = rng.pick([600, 800, 1000, 1200]);
    const prof = rng.pick([
      { n: 'Montag bis Freitag je 12 h', h: 5 * 12 * 52 },
      { n: 'Montag bis Freitag je 10 h', h: 5 * 10 * 52 },
      { n: 'Montag bis Samstag je 14 h', h: 6 * 14 * 52 },
    ]);
    const priceCt = rng.pick([30, 32, 35, 40]);
    if (d === 2) {
      const kwhSave = ((pOld - pNew) * 8760) / 1000;
      const kg = round((kwhSave * fac) / 1000, 1);
      return numQ('hw.co2', 'hw.green.it', d, {
        prompt: `Die Server im Rechnerraum der Elektro Krämer GmbH nehmen zusammen **${f(pOld, 0)} W** auf und laufen rund um die Uhr (8.760 h im Jahr). Nach der Virtualisierung sind es nur noch **${f(pNew, 0)} W**. ${facTxt}\n\nWie viel **kg CO₂** spart das Unternehmen dadurch **pro Jahr**? (auf eine Nachkommastelle runden)`,
        answer: kg,
        tolerance: 0.2,
        unit: 'kg',
        hints: ['Leistungsdifferenz ΔP = alt − neu.', 'ΔE = ΔP · 8.760 h → kWh; CO₂ = ΔE · Faktor → g → kg.'],
        mcs: [
          { answer: round((((pNew * 8760) / 1000) * fac) / 1000, 1), error: 'energie-differenz', why: 'Das ist der CO₂-Ausstoß der **neuen** Server, nicht die Einsparung (alt − neu).' },
          { answer: round(kwhSave * fac, 1), error: 'co2-g-kg', why: 'Das Ergebnis ist in **Gramm** – durch 1.000 teilen.' },
          { answer: round(kwhSave, 1), error: 'co2-faktor-vergessen', why: 'Das ist die eingesparte **Energie in kWh**. Gefragt ist CO₂: noch mit dem Emissionsfaktor multiplizieren.' },
        ],
        explanation:
          `**1. Leistungsdifferenz:** ${f(pOld, 0)} W − ${f(pNew, 0)} W = **${f(pOld - pNew, 0)} W**\n\n` +
          `**2. Eingesparte Energie:** ${f(pOld - pNew, 0)} W · 8.760 h = ${f((pOld - pNew) * 8760, 0)} Wh = **${f(kwhSave, 1)} kWh**\n\n` +
          `**3. CO₂:** ${f(kwhSave, 1)} kWh · ${fac} g/kWh = ${f(kwhSave * fac, 0)} g = **${f(kg, 1)} kg CO₂**\n\n` +
          `(In Euro bei ${priceCt} ct/kWh: ${fx((kwhSave * priceCt) / 100)} €.)`,
      });
    }
    // d === 3: zweistufig – erst weniger Leistung, dann zusätzlich kürzere Laufzeit
    const kwh1 = ((pOld - pNew) * 8760) / 1000;
    const kwh2 = (pNew * (8760 - prof.h)) / 1000;
    const kg = round(((kwh1 + kwh2) * fac) / 1000, 0);
    return numQ('hw.co2', 'hw.green.it', d, {
      prompt:
        `Eine Testumgebung (Server, Storage, Switches) nimmt bisher **${f(pOld, 0)} W** auf und läuft **24/7** (8.760 h). Zwei Maßnahmen sind geplant:\n\n` +
        `1. Austausch gegen sparsamere Hardware mit **${f(pNew, 0)} W**.\n2. Zusätzlich läuft die neue Umgebung nur noch **${prof.n}** (52 Wochen); in der übrigen Zeit ist sie ausgeschaltet (0 W).\n\n` +
        `${facTxt}\n\nWie viel **kg CO₂** sparen **beide Maßnahmen zusammen** pro Jahr gegenüber dem bisherigen Zustand? (auf ganze kg runden)`,
      answer: kg,
      tolerance: 1,
      unit: 'kg',
      hints: [
        'Maßnahme 1: (alt − neu) · 8.760 h.',
        `Maßnahme 2 bezieht sich auf die **neue** Leistung: ${f(pNew, 0)} W · (8.760 h − Betriebsstunden).`,
        'Beide kWh addieren, mit dem Faktor multiplizieren, g → kg.',
      ],
      mcs: [
        { answer: round(((kwh1 + (pOld * (8760 - prof.h)) / 1000) * fac) / 1000, 0), error: 'einsparung-bezugsgroesse', why: 'Die Laufzeitverkürzung musst du mit der **neuen** Leistung rechnen – die alte Hardware gibt es dann nicht mehr.' },
        { answer: round((kwh1 * fac) / 1000, 0), error: 'einsparung-stufe-vergessen', why: 'Du hast nur Maßnahme 1 gerechnet. Die kürzere Laufzeit spart zusätzlich.' },
        { answer: round((kwh1 + kwh2) * fac, 0), error: 'co2-g-kg', why: 'Das Ergebnis ist in **Gramm** – durch 1.000 teilen.' },
      ],
      explanation:
        `**1. Betriebsstunden neu:** ${prof.n} · 52 Wochen = **${f(prof.h, 0)} h** → aus: 8.760 h − ${f(prof.h, 0)} h = **${f(8760 - prof.h, 0)} h**\n\n` +
        `**2. Maßnahme 1:** (${f(pOld, 0)} W − ${f(pNew, 0)} W) · 8.760 h = ${f((pOld - pNew) * 8760, 0)} Wh = **${f(kwh1, 1)} kWh**\n\n` +
        `**3. Maßnahme 2:** ${f(pNew, 0)} W · ${f(8760 - prof.h, 0)} h = ${f(pNew * (8760 - prof.h), 0)} Wh = **${f(kwh2, 1)} kWh**\n\n` +
        `**4. Summe:** ${f(kwh1 + kwh2, 1)} kWh · ${fac} g/kWh = ${f((kwh1 + kwh2) * fac, 0)} g ≈ **${f(kg, 0)} kg CO₂** (≈ ${f(kg / 1000, 2)} t)\n\n` +
        `Häufiger Fehler: Maßnahme 2 mit der alten Leistung rechnen – dann würde die Einsparung doppelt gezählt.`,
    });
  },
};

const usvCheck: GeneratorMeta = {
  id: 'hw.usvcheck',
  title: 'USV prüfen: reichen VA- und W-Grenze?',
  skill: 'hw.ups.sizing',
  module: 'h04',
  make(rng, d) {
    const ups = rng.pick([
      { va: 1000, w: 600 },
      { va: 1500, w: 900 },
      { va: 1500, w: 1350 },
      { va: 2200, w: 1980 },
      { va: 3000, w: 2700 },
      { va: 2000, w: 1200 },
    ]);
    const pfLoad = rng.pick([0.7, 0.75, 0.8, 0.9, 0.95]);
    const share = rng.pick([0.4, 0.5, 0.6, 0.7]);
    const pLoad = Math.round((Math.min(ups.w, ups.va * pfLoad) * share) / 10) * 10;
    const sLoad = pLoad / pfLoad;
    const beleg = `**Beleg – Datenblatt USV:** Ausgangsleistung **${f(ups.va, 0)} VA / ${f(ups.w, 0)} W**\n\n**Last:** angeschlossene Geräte zusammen **${f(pLoad, 0)} W**, Leistungsfaktor der Last **cos φ = ${f(pfLoad)}**`;
    if (d === 1) {
      const ans = round(sLoad, 1);
      return numQ('hw.usvcheck', 'hw.ups.sizing', d, {
        prompt: `${beleg}\n\nWelche **Scheinleistung in VA** zieht die Last aus der USV? (auf eine Nachkommastelle runden)`,
        answer: ans,
        tolerance: 0.1,
        unit: 'VA',
        hints: ['cos φ = P ÷ S', 'S = P ÷ cos φ'],
        mcs: [
          { answer: round(pLoad * pfLoad, 1), error: 'usv-pf-multipliziert', why: 'Mit cos φ multipliziert. Die Scheinleistung ist immer **größer oder gleich** der Wirkleistung: S = P ÷ cos φ.' },
          { answer: pLoad, error: 'usv-va-gleich-w', why: 'VA und W sind nur bei cos φ = 1 gleich.' },
        ],
        explanation: `S = P ÷ cos φ = ${f(pLoad, 0)} W ÷ ${f(pfLoad)} = **${f(ans, 1)} VA**`,
      });
    }
    const loadW = (pLoad / ups.w) * 100;
    const loadVA = (sLoad / ups.va) * 100;
    if (d === 2) {
      const ans = round(Math.max(loadW, loadVA), 1);
      const wDecides = loadW >= loadVA;
      return numQ('hw.usvcheck', 'hw.ups.sizing', d, {
        prompt: `${beleg}\n\nPrüfe **beide** Grenzen der USV (W und VA). Wie hoch ist die Auslastung in **Prozent** bei der Grenze, die **stärker** ausgelastet ist (= maßgebliche Auslastung)? (auf eine Nachkommastelle runden)`,
        answer: ans,
        tolerance: 0.1,
        unit: '%',
        hints: ['Auslastung W = Last in W ÷ USV-Wattangabe · 100 %.', 'Auslastung VA: erst S = P ÷ cos φ, dann ÷ USV-VA-Angabe · 100 %. Der größere Wert zählt.'],
        mcs: [
          { answer: round(Math.min(loadW, loadVA), 1), error: 'usv-grenze-falsch', why: 'Das ist die **weniger** ausgelastete Grenze. Maßgeblich ist die Grenze, die zuerst erreicht wird – also der größere Prozentwert.' },
          { answer: round((pLoad / ups.va) * 100, 1), error: 'usv-va-gleich-w', why: 'Du hast Watt durch VA geteilt. Vergleiche W mit W und VA mit VA.' },
        ],
        explanation:
          `**1. Auslastung Wirkleistung:** ${f(pLoad, 0)} W ÷ ${f(ups.w, 0)} W = **${f(loadW, 1)} %**\n\n` +
          `**2. Scheinleistung der Last:** ${f(pLoad, 0)} W ÷ ${f(pfLoad)} = ${f(sLoad, 1)} VA → ÷ ${f(ups.va, 0)} VA = **${f(loadVA, 1)} %**\n\n` +
          `**3. Maßgeblich:** die ${wDecides ? 'W-Grenze' : 'VA-Grenze'} mit **${f(ans, 1)} %**. Beide Werte liegen unter 100 % → die USV reicht.`,
      });
    }
    // d === 3: maximal zusätzlich anschließbare Wirkleistung bei gleichem cos φ
    const maxP = Math.min(ups.w, ups.va * pfLoad);
    const ans = round(maxP - pLoad, 1);
    return numQ('hw.usvcheck', 'hw.ups.sizing', d, {
      prompt: `${beleg}\n\nWie viel **Wirkleistung in W** darfst du **zusätzlich** anschließen, wenn die neuen Geräte denselben Leistungsfaktor haben (ohne Reserve)? Beachte **beide** Grenzen der USV. (auf eine Nachkommastelle runden)`,
      answer: ans,
      tolerance: 0.1,
      unit: 'W',
      hints: ['Die VA-Grenze erlaubt höchstens P = S_USV · cos φ der Last.', 'Die W-Grenze erlaubt höchstens die Wattangabe. Die kleinere Grenze zählt – davon die vorhandene Last abziehen.'],
      mcs: [
        { answer: round(ups.w - pLoad, 1), error: 'usv-grenze-falsch', why: 'Du hast nur die **W-Grenze** geprüft. Bei diesem cos φ ist die VA-Grenze strenger.' },
        { answer: round(ups.va * pfLoad - pLoad, 1), error: 'usv-grenze-falsch', why: 'Du hast nur die **VA-Grenze** geprüft. Die Wattangabe der USV ist hier strenger.' },
        { answer: round(ups.va - pLoad, 1), error: 'usv-va-gleich-w', why: 'VA und W gleichgesetzt. Die VA-Grenze erlaubt nur S · cos φ Watt.' },
      ],
      explanation:
        `**1. Grenze aus VA:** ${f(ups.va, 0)} VA · ${f(pfLoad)} = **${f(ups.va * pfLoad, 1)} W**\n\n` +
        `**2. Grenze aus W:** **${f(ups.w, 0)} W**\n\n` +
        `**3. Maßgeblich ist die kleinere:** **${f(maxP, 1)} W** (${ups.w <= ups.va * pfLoad ? 'W-Grenze' : 'VA-Grenze'})\n\n` +
        `**4. Zusätzlich möglich:** ${f(maxP, 1)} W − ${f(pLoad, 0)} W = **${f(ans, 1)} W**\n\nIn der Praxis plant man davon noch 20–30 % Reserve ab.`,
    });
  },
};

/* ------------------------------------------------------------------ */
/* h03 – Monitore                                                      */
/* ------------------------------------------------------------------ */

const MONITORS = [
  { diag: 24, w: 1920, h: 1080 },
  { diag: 24, w: 1920, h: 1200 },
  { diag: 27, w: 1920, h: 1080 },
  { diag: 27, w: 2560, h: 1440 },
  { diag: 27, w: 3840, h: 2160 },
  { diag: 32, w: 3840, h: 2160 },
  { diag: 34, w: 3440, h: 1440 },
  { diag: 14, w: 1920, h: 1200 },
  { diag: 15.6, w: 1920, h: 1080 },
  { diag: 13.3, w: 2560, h: 1600 },
];

const ppiGen: GeneratorMeta = {
  id: 'hw.ppi',
  title: 'Pixeldichte (ppi) berechnen',
  skill: 'hw.display.ppi',
  module: 'h03',
  make(rng, d) {
    const m = d === 1 ? rng.pick(MONITORS.slice(0, 6)) : rng.pick(MONITORS);
    const diagPx = Math.sqrt(m.w * m.w + m.h * m.h);
    const ppi = diagPx / m.diag;
    if (d === 3) {
      const pitch = round(25.4 / ppi, 3);
      return numQ('hw.ppi', 'hw.display.ppi', d, {
        prompt: `Ein Monitor hat eine Bilddiagonale von **${f(m.diag, 1)} Zoll** und eine Auflösung von **${m.w} × ${m.h} Pixeln**.\n\nWie groß ist der **Pixelabstand (Pixel Pitch) in Millimetern**? (1 Zoll = 25,4 mm; auf drei Nachkommastellen runden, Zwischenergebnisse nicht runden)`,
        answer: pitch,
        tolerance: 0.001,
        unit: 'mm',
        hints: ['Erst die Pixeldichte berechnen: ppi = √(Breite² + Höhe²) / Diagonale.', 'Pixel Pitch = 25,4 mm / ppi'],
        mcs: [
          { answer: round(2.54 / ppi, 3), error: 'ppi-zoll-cm', why: '1 Zoll = 25,4 **mm** (2,54 cm). Für Millimeter mit 25,4 rechnen.' },
          { answer: round(ppi, 3), error: 'ppi-pitch-verwechselt', why: 'Das ist die Pixeldichte in ppi. Der Pixelabstand ist 25,4 mm / ppi.' },
        ],
        explanation:
          `**1. Diagonale in Pixeln:** √(${m.w}² + ${m.h}²) = √${f(m.w * m.w + m.h * m.h, 0)} = **${f(diagPx, 2)} px**\n\n` +
          `**2. Pixeldichte:** ${f(diagPx, 2)} px / ${f(m.diag, 1)} Zoll = **${f(ppi, 2)} ppi**\n\n` +
          `**3. Pixel Pitch:** 25,4 mm / ${f(ppi, 2)} = **${f(pitch, 3)} mm**`,
      });
    }
    const ans = round(ppi, 1);
    return numQ('hw.ppi', 'hw.display.ppi', d, {
      prompt: `${d === 2 ? 'Im Datenblatt-Auszug eines Angebots steht: ' : 'Ein Monitor hat '}**${f(m.diag, 1)} Zoll** Bilddiagonale und eine Auflösung von **${m.w} × ${m.h} Pixeln**.\n\nBerechne die **Pixeldichte in ppi** (pixels per inch). (auf eine Nachkommastelle runden)`,
      answer: ans,
      tolerance: 0.1,
      unit: 'ppi',
      hints: ['Satz des Pythagoras: Diagonale in Pixeln = √(Breite² + Höhe²).', 'ppi = Diagonale in Pixeln / Diagonale in Zoll'],
      mcs: [
        { answer: round(m.w / m.diag, 1), error: 'ppi-nur-breite', why: 'Du hast nur die **Breite** durch die Diagonale geteilt. Die Pixel der **Diagonale** erhältst du mit Pythagoras: √(B² + H²).' },
        { answer: round(diagPx / (m.diag * 2.54), 1), error: 'ppi-zoll-cm', why: 'ppi bezieht sich auf **Zoll**, nicht auf Zentimeter. Die Diagonale nicht in cm umrechnen.' },
        { answer: round((m.w + m.h) / m.diag, 1), error: 'ppi-summe', why: 'Breite + Höhe ist nicht die Diagonale. Rechne √(B² + H²).' },
      ],
      explanation:
        `**1. Diagonale in Pixeln:** √(${m.w}² + ${m.h}²) = √(${f(m.w * m.w, 0)} + ${f(m.h * m.h, 0)}) = **${f(diagPx, 2)} px**\n\n` +
        `**2. Pixeldichte:** ${f(diagPx, 2)} px / ${f(m.diag, 1)} Zoll = **${f(ans, 1)} ppi**`,
    });
  },
};

const RESOLUTIONS = [
  { n: 'Full HD', w: 1920, h: 1080 },
  { n: 'WUXGA', w: 1920, h: 1200 },
  { n: 'WQHD', w: 2560, h: 1440 },
  { n: '4K UHD', w: 3840, h: 2160 },
  { n: 'HD', w: 1280, h: 720 },
];

const bildspeicher: GeneratorMeta = {
  id: 'hw.bildspeicher',
  title: 'Speicherbedarf eines Bildes / Datenrate eines Videosignals',
  skill: 'hw.display.imagesize',
  module: 'h03',
  make(rng, d) {
    const r = rng.pick(RESOLUTIONS);
    const depth = d === 1 ? 24 : rng.pick([8, 16, 24, 30, 32]);
    const bits = r.w * r.h * depth;
    const bytes = bits / 8;
    if (d === 3) {
      const hz = rng.pick([30, 60, 120, 144]);
      const gbps = round((bits * hz) / 1e9, 2);
      return numQ('hw.bildspeicher', 'hw.display.imagesize', d, {
        prompt: `Ein Monitor soll mit **${r.w} × ${r.h} Pixeln** (${r.n}), **${depth} Bit Farbtiefe** und **${hz} Hz** angesteuert werden.\n\nWelche **unkomprimierte Datenrate** (nur Bildinhalt, ohne Austastlücken und Leitungscodierung) entsteht? Gib das Ergebnis in **Gbit/s** an (1 Gbit = 10⁹ Bit, auf zwei Nachkommastellen runden).`,
        answer: gbps,
        tolerance: 0.01,
        unit: 'Gbit/s',
        hints: ['Bit pro Bild = Breite · Höhe · Farbtiefe.', 'Datenrate = Bit pro Bild · Bilder pro Sekunde (Hz).'],
        mcs: [
          { answer: round((bytes * hz) / 1e9, 2), error: 'einheit-bit-byte', why: 'Du hast in **Byte** gerechnet. Datenraten werden in **Bit** pro Sekunde angegeben – nicht durch 8 teilen.' },
          { answer: round((bits * hz) / 2 ** 30, 2), error: 'einheit-1000-1024', why: 'Datenraten verwenden immer **Dezimalpräfixe**: 1 Gbit = 10⁹ Bit.' },
        ],
        explanation:
          `**1. Bit pro Bild:** ${r.w} · ${r.h} · ${depth} Bit = **${f(bits, 0)} Bit**\n\n` +
          `**2. Pro Sekunde:** ${f(bits, 0)} Bit · ${hz} = ${f(bits * hz, 0)} Bit/s\n\n` +
          `**3. In Gbit/s:** / 10⁹ = **${f(gbps, 2)} Gbit/s**\n\n` +
          `Real ist die Rate auf dem Kabel höher (Austastlücken, Leitungscodierung) – deshalb braucht man z. B. für 4K mit 120 Hz HDMI 2.1 oder DisplayPort 1.4 (mit DSC) bzw. DP 2.1.`,
      });
    }
    const useMiB = d === 2 && rng.bool(0.5);
    const ans = round(useMiB ? bytes / 2 ** 20 : bytes / 1e6, 2);
    return numQ('hw.bildspeicher', 'hw.display.imagesize', d, {
      prompt: `Ein unkomprimiertes Bild hat eine Auflösung von **${r.w} × ${r.h} Pixeln** (${r.n}) und eine Farbtiefe von **${depth} Bit** pro Pixel.\n\nWie groß ist der Speicherbedarf in **${useMiB ? 'MiB (1 MiB = 2²⁰ Byte = 1.048.576 Byte)' : 'MB (1 MB = 10⁶ Byte)'}**? (auf zwei Nachkommastellen runden)`,
      answer: ans,
      tolerance: 0.01,
      unit: useMiB ? 'MiB' : 'MB',
      hints: ['Pixelanzahl = Breite · Höhe.', 'Bit = Pixel · Farbtiefe; Byte = Bit / 8.', useMiB ? 'Byte / 1.048.576 = MiB' : 'Byte / 1.000.000 = MB'],
      mcs: [
        { answer: round(useMiB ? bits / 2 ** 20 : bits / 1e6, 2), error: 'einheit-bit-byte', why: 'Du hast vergessen, Bit in **Byte** umzurechnen (/ 8).' },
        { answer: round(useMiB ? bytes / 1e6 : bytes / 2 ** 20, 2), error: 'einheit-1000-1024', why: useMiB ? 'Gefragt ist MiB (Binärpräfix, 1.048.576 Byte), nicht MB.' : 'Gefragt ist MB (Dezimalpräfix, 1.000.000 Byte), nicht MiB.' },
      ],
      explanation:
        `**1. Pixel:** ${r.w} · ${r.h} = **${f(r.w * r.h, 0)} Pixel**\n\n` +
        `**2. Bit:** ${f(r.w * r.h, 0)} · ${depth} Bit = **${f(bits, 0)} Bit**\n\n` +
        `**3. Byte:** ${f(bits, 0)} / 8 = **${f(bytes, 0)} Byte**\n\n` +
        `**4. ${useMiB ? 'MiB' : 'MB'}:** ${f(bytes, 0)} / ${useMiB ? '1.048.576' : '1.000.000'} = **${f(ans, 2)} ${useMiB ? 'MiB' : 'MB'}**`,
    });
  },
};

const seitenkosten: GeneratorMeta = {
  id: 'hw.seitenkosten',
  title: 'Druckkosten pro Seite berechnen',
  skill: 'hw.io.printer',
  module: 'h03',
  make(rng, d) {
    const tonerPrice = rng.pick([59.9, 79.0, 89.9, 119.0, 149.0]);
    const yieldPages = rng.pick([2500, 3000, 6000, 9000, 12000]);
    const tonerCt = (tonerPrice / yieldPages) * 100;
    if (d === 1) {
      const ans = round(tonerCt, 2);
      return numQ('hw.seitenkosten', 'hw.io.printer', d, {
        prompt: `Eine Tonerkartusche kostet **${fx(tonerPrice)} €** und hat laut Hersteller (ISO/IEC 19752) eine Reichweite von **${f(yieldPages, 0)} Seiten**.\n\nWie hoch sind die **Tonerkosten pro Seite in Cent**? (auf zwei Nachkommastellen runden)`,
        answer: ans,
        tolerance: 0.01,
        unit: 'ct',
        hints: ['Kosten pro Seite = Preis / Reichweite.', 'Euro · 100 = Cent.'],
        mcs: [{ answer: round(tonerPrice / yieldPages, 5), error: 'energie-cent-euro', why: 'Das Ergebnis ist in **Euro**. Für Cent mit 100 multiplizieren.' }],
        explanation: `${fx(tonerPrice)} € / ${f(yieldPages, 0)} Seiten = ${f(tonerPrice / yieldPages, 5)} € = **${f(ans, 2)} ct** pro Seite`,
      });
    }
    const drumPrice = rng.pick([49.0, 69.0, 99.0]);
    const drumYield = rng.pick([30000, 50000]);
    const paperPack = rng.pick([4.5, 5.0, 6.0]);
    const drumCt = (drumPrice / drumYield) * 100;
    const paperCt = (paperPack / 500) * 100;
    const pageCt = tonerCt + drumCt + paperCt;
    const pageCtGiven = round(pageCt, 4);
    if (d === 2) {
      const ans = round(pageCt, 2);
      return numQ('hw.seitenkosten', 'hw.io.printer', d, {
        prompt:
          `Datenblatt-Auszug eines Laserdruckers (Verbrauchsmaterial):\n\n| Verbrauchsmaterial | Preis | Reichweite |\n|---|---|---|\n| Tonerkartusche | ${fx(tonerPrice)} € | ${f(yieldPages, 0)} Seiten |\n| Trommeleinheit | ${fx(drumPrice)} € | ${f(drumYield, 0)} Seiten |\n| Papier (Paket) | ${fx(paperPack)} € | 500 Blatt |\n\n` +
          `Berechne die **Gesamtkosten pro gedruckter Seite in Cent** (einseitiger Druck). (nur das Endergebnis auf zwei Nachkommastellen runden)`,
        answer: ans,
        tolerance: 0.02,
        unit: 'ct',
        hints: ['Für jede Zeile: Preis / Reichweite.', 'Alle Anteile addieren und in Cent umrechnen.'],
        mcs: [
          { answer: round(tonerCt, 2), error: 'druck-nur-toner', why: 'Nur der Toner reicht nicht: Auch Trommel und Papier verursachen Kosten pro Seite.' },
          { answer: round(tonerCt + drumCt, 2), error: 'druck-papier-vergessen', why: 'Die Papierkosten fehlen (Paketpreis / 500 Blatt).' },
        ],
        explanation:
          `- Toner: ${fx(tonerPrice)} € / ${f(yieldPages, 0)} = ${f(tonerCt, 4)} ct\n- Trommel: ${fx(drumPrice)} € / ${f(drumYield, 0)} = ${f(drumCt, 4)} ct\n- Papier: ${fx(paperPack)} € / 500 = ${f(paperCt, 4)} ct\n\n` +
          `Summe: **${f(ans, 2)} ct** pro Seite`,
      });
    }
    // d === 3: Gesamtkosten pro Jahr inkl. Abschreibung
    const devicePrice = rng.pick([450, 600, 780, 900]);
    const years = rng.pick([3, 4, 5]);
    const pagesPerMonth = rng.pick([1500, 2000, 2500, 3000]);
    const pagesYear = pagesPerMonth * 12;
    const total = round(devicePrice / years + (pagesYear * pageCtGiven) / 100, 2);
    return numQ('hw.seitenkosten', 'hw.io.printer', d, {
      prompt:
        `Für die Buchhaltung soll ein Laserdrucker angeschafft werden: Anschaffungspreis **${fx(devicePrice)} €**, geplante Nutzungsdauer **${years} Jahre** (lineare Verteilung). Pro Seite fallen **${fx(pageCtGiven, 4)} ct** Verbrauchskosten an (Toner, Trommel, Papier). Die Abteilung druckt **${f(pagesPerMonth, 0)} Seiten pro Monat**.\n\n` +
        `Wie hoch sind die **Gesamtkosten pro Jahr in Euro** (anteiliger Gerätepreis + Verbrauch)? (auf Cent runden)`,
      answer: total,
      tolerance: 0.02,
      unit: '€',
      hints: ['Anteiliger Gerätepreis pro Jahr = Preis / Nutzungsdauer.', 'Seiten pro Jahr = Seiten pro Monat · 12; Verbrauch = Seiten · Kosten pro Seite (ct → €).'],
      mcs: [
        { answer: round(devicePrice + (pagesYear * pageCtGiven) / 100, 2), error: 'druck-abschreibung', why: 'Der Gerätepreis verteilt sich auf die Nutzungsdauer – pro Jahr nur Preis / Jahre.' },
        { answer: round(devicePrice / years + pagesYear * pageCtGiven, 2), error: 'energie-cent-euro', why: 'Die Seitenkosten sind in **Cent** angegeben – durch 100 teilen.' },
        { answer: round(devicePrice / years + (pagesPerMonth * pageCtGiven) / 100, 2), error: 'energie-zeitraum', why: 'Monatsmenge statt Jahresmenge verwendet (· 12).' },
      ],
      explanation:
        `**1. Geräteanteil:** ${fx(devicePrice)} € / ${years} = **${fx(devicePrice / years)} €** pro Jahr\n\n` +
        `**2. Seiten pro Jahr:** ${f(pagesPerMonth, 0)} · 12 = **${f(pagesYear, 0)}**\n\n` +
        `**3. Verbrauch:** ${f(pagesYear, 0)} · ${fx(pageCtGiven, 4)} ct = ${f(pagesYear * pageCtGiven, 2)} ct = **${fx((pagesYear * pageCtGiven) / 100)} €**\n\n` +
        `**4. Summe:** **${fx(total)} €** pro Jahr`,
    });
  },
};

/* ------------------------------------------------------------------ */
/* h02 – Speicher                                                      */
/* ------------------------------------------------------------------ */

const kapazitaet: GeneratorMeta = {
  id: 'hw.kapazitaet',
  title: 'Herstellerangabe → GiB/TiB (Anzeige im Betriebssystem)',
  skill: 'hw.storage.capacity',
  module: 'h02',
  make(rng, d) {
    if (d === 1) {
      const gb = rng.pick([128, 240, 256, 480, 500, 512, 960]);
      const ans = round((gb * 1e9) / 2 ** 30, 2);
      return numQ('hw.kapazitaet', 'hw.storage.capacity', d, {
        prompt: `Eine SSD wird vom Hersteller mit **${gb} GB** angegeben (Dezimalpräfix, 1 GB = 10⁹ Byte). Windows rechnet intern mit Binärpräfixen.\n\nWie viele **GiB** (1 GiB = 2³⁰ Byte) hat die SSD? (auf zwei Nachkommastellen runden)`,
        answer: ans,
        tolerance: 0.01,
        unit: 'GiB',
        hints: ['Erst in Byte umrechnen: GB · 10⁹.', 'Dann durch 2³⁰ = 1.073.741.824 teilen.'],
        mcs: [
          { answer: round((gb * 2 ** 30) / 1e9, 2), error: 'einheit-1000-1024', why: 'Falsche Richtung: GiB sind **größer** als GB, also wird die Zahl **kleiner**. Teile durch 2³⁰.' },
          { answer: round((gb * 1e9) / 2 ** 20 / 1000, 2), error: 'einheit-1000-1024', why: 'Gemischte Umrechnung: Für GiB durchgehend durch 1024 teilen (oder einmal durch 2³⁰).' },
        ],
        explanation: `${gb} GB = ${f(gb * 1e9, 0)} Byte\n\n${f(gb * 1e9, 0)} Byte / 1.073.741.824 = **${f(ans, 2)} GiB**\n\nWindows zeigt das als „${f(ans, 2)} GB“ an – die Einheit ist dort irreführend beschriftet. Es fehlt nichts!`,
      });
    }
    if (d === 2) {
      const tb = rng.pick([1, 2, 4, 6, 8, 12, 16, 20]);
      const toTiB = rng.bool(0.5);
      const ans = round(toTiB ? (tb * 1e12) / 2 ** 40 : (tb * 1e12) / 2 ** 30, 2);
      return numQ('hw.kapazitaet', 'hw.storage.capacity', d, {
        prompt: `Eine Festplatte hat laut Datenblatt **${tb} TB** (1 TB = 10¹² Byte). Wie viele **${toTiB ? 'TiB (2⁴⁰ Byte)' : 'GiB (2³⁰ Byte)'}** sind das? (auf zwei Nachkommastellen runden)`,
        answer: ans,
        tolerance: 0.01,
        unit: toTiB ? 'TiB' : 'GiB',
        hints: ['TB → Byte: · 10¹².', toTiB ? '/ 2⁴⁰ = 1.099.511.627.776' : '/ 2³⁰ = 1.073.741.824'],
        mcs: [
          { answer: toTiB ? tb : tb * 1000, error: 'einheit-1000-1024', why: 'TB (dezimal) und TiB/GiB (binär) sind nicht gleich groß. Über Byte umrechnen.' },
          { answer: toTiB ? round(tb * 1.024, 2) : tb * 1024, error: 'einheit-1000-1024', why: 'Falsche Richtung bzw. falscher Faktor: Binäreinheiten sind größer, die Zahl wird also kleiner.' },
        ],
        explanation:
          `${tb} TB = ${f(tb * 1e12, 0)} Byte\n\n` +
          `${f(tb * 1e12, 0)} Byte / ${toTiB ? '1.099.511.627.776' : '1.073.741.824'} = **${f(ans, 2)} ${toTiB ? 'TiB' : 'GiB'}**\n\n` +
          `Merke: 1 TB ≈ 0,909 TiB ≈ 931,32 GiB – das sind rund **9 % „weniger“** in der Anzeige.`,
      });
    }
    const tb = rng.pick([1, 2, 4]);
    const used = rng.pick([180, 250, 320, 410, 600]);
    const capGiB = (tb * 1e12) / 2 ** 30;
    const free = round(capGiB - used, 2);
    return numQ('hw.kapazitaet', 'hw.storage.capacity', d, {
      prompt: `Ein Kunde hat eine **${tb}-TB-SSD** gekauft (Herstellerangabe, 1 TB = 10¹² Byte). Nach der Installation zeigt der Explorer, dass das Betriebssystem und die Programme **${used} GiB** belegen.\n\nWie viel **freier Speicher in GiB** wird (vereinfacht, ohne Partitionierungs- und Dateisystem-Overhead) angezeigt? (auf zwei Nachkommastellen runden)`,
      answer: free,
      tolerance: 0.01,
      unit: 'GiB',
      hints: ['Kapazität erst in GiB umrechnen: TB · 10¹² / 2³⁰.', 'Dann die belegten GiB abziehen.'],
      mcs: [
        { answer: tb * 1000 - used, error: 'einheit-1000-1024', why: 'Die Herstellerangabe ist dezimal, die Belegung binär (GiB). Erst die Kapazität in GiB umrechnen.' },
        { answer: tb * 1024 - used, error: 'einheit-1000-1024', why: '1 TB sind nicht 1024 GiB. 1 TB = 10¹² Byte = 931,32 GiB.' },
      ],
      explanation:
        `**1. Kapazität in GiB:** ${tb} · 10¹² Byte / 2³⁰ = **${f(capGiB, 2)} GiB**\n\n` +
        `**2. Frei:** ${f(capGiB, 2)} GiB − ${used} GiB = **${f(free, 2)} GiB**`,
    });
  },
};

const tbw: GeneratorMeta = {
  id: 'hw.tbw',
  title: 'SSD-Lebensdauer aus TBW / DWPD',
  skill: 'hw.storage.metrics',
  module: 'h02',
  make(rng, d) {
    const capTB = rng.pick([0.5, 1, 2, 4]);
    const tbwVal = capTB * rng.pick([300, 600, 700]);
    if (d === 3) {
      const years = rng.pick([3, 5]);
      const dwpd = round(tbwVal / (capTB * 365 * years), 2);
      return numQ('hw.tbw', 'hw.storage.metrics', d, {
        prompt: `Eine SSD mit **${f(capTB)} TB** Kapazität hat eine Schreibleistungsgarantie von **${f(tbwVal, 0)} TBW** über **${years} Jahre** Garantiezeit.\n\nWie viele **DWPD** (Drive Writes Per Day, komplette Laufwerksbeschreibungen pro Tag) entspricht das? (365 Tage/Jahr, auf zwei Nachkommastellen runden)`,
        answer: dwpd,
        tolerance: 0.01,
        unit: 'DWPD',
        hints: ['DWPD = TBW / (Kapazität · Tage der Garantiezeit).', `Tage: 365 · ${years}`],
        mcs: [{ answer: round(tbwVal / (capTB * 365), 2), error: 'tbw-garantiezeit', why: 'Die Garantiezeit umfasst mehrere Jahre – durch alle Tage der Garantiezeit teilen.' }],
        explanation: `DWPD = ${f(tbwVal, 0)} TB / (${f(capTB)} TB · 365 · ${years}) = ${f(tbwVal, 0)} / ${f(capTB * 365 * years, 1)} = **${f(dwpd, 2)} DWPD**`,
      });
    }
    const perDayGB = d === 1 ? rng.pick([20, 40, 50, 80, 100]) : rng.pick([60, 120, 150, 250, 400]);
    const years = round((tbwVal * 1000) / (perDayGB * 365), 1);
    return numQ('hw.tbw', 'hw.storage.metrics', d, {
      prompt: `Eine SSD hat laut Datenblatt eine Haltbarkeit von **${f(tbwVal, 0)} TBW** (Terabytes Written). Auf dem ${d === 1 ? 'Arbeitsplatz-PC' : 'Datenbankserver'} werden durchschnittlich **${perDayGB} GB pro Tag** geschrieben.\n\nNach wie vielen **Jahren** ist die TBW-Angabe rechnerisch erreicht? (1 TB = 1000 GB, 365 Tage/Jahr, auf eine Nachkommastelle runden)`,
      answer: years,
      tolerance: 0.1,
      unit: 'Jahre',
      hints: ['TBW in GB umrechnen: · 1000.', 'Tage = GB / (GB pro Tag); Jahre = Tage / 365.'],
      mcs: [
        { answer: round(tbwVal / (perDayGB * 365), 4), error: 'einheit-tb-gb', why: 'TB und GB nicht angeglichen: 1 TB = 1000 GB.' },
        { answer: round((tbwVal * 1000) / perDayGB, 1), error: 'tbw-tage-jahre', why: 'Das Ergebnis sind **Tage**. Durch 365 teilen für Jahre.' },
      ],
      explanation:
        `**1. TBW in GB:** ${f(tbwVal, 0)} TB · 1000 = **${f(tbwVal * 1000, 0)} GB**\n\n` +
        `**2. Tage:** ${f(tbwVal * 1000, 0)} GB / ${perDayGB} GB/Tag = **${f((tbwVal * 1000) / perDayGB, 1)} Tage**\n\n` +
        `**3. Jahre:** / 365 = **${fx(years, 1)} Jahre**\n\n` +
        (years > 10 ? 'Für einen normalen Büro-PC ist die TBW-Angabe also praktisch nie das begrenzende Kriterium.' : 'Bei dieser Schreiblast ist eine SSD mit höherer TBW/DWPD (z. B. Enterprise-SSD) sinnvoll.'),
    });
  },
};

/* ------------------------------------------------------------------ */
/* h01 – PC-Komponenten                                                */
/* ------------------------------------------------------------------ */

const ramBandbreite: GeneratorMeta = {
  id: 'hw.ram',
  title: 'Speicherbandbreite von DDR-RAM berechnen',
  skill: 'hw.pc.ram',
  module: 'h01',
  make(rng, d) {
    const gen = rng.pick([
      { t: 'DDR4', pc: 'PC4', mts: rng.pick([2400, 3200]) } /* 2666/2933 haben krumme PC-Namen (PC4-21333/-23466) */,
      { t: 'DDR5', pc: 'PC5', mts: rng.pick([4800, 5200, 5600, 6000, 6400]) },
    ]);
    const perModule = gen.mts * 8; // MB/s
    const prefetch = gen.t === 'DDR4' ? 8 : 16;
    const takt = gen.mts / prefetch;
    if (d === 3 && Number.isInteger(takt) && rng.bool(0.5)) {
      // Rechenweg über Speichertakt × Prefetch × Busbreite (Schreibweise vieler Schulbücher)
      return numQ('hw.ram', 'hw.pc.ram', d, {
        prompt: `Datenblatt-Auszug eines Speichermoduls: **${gen.t}**, interner Speichertakt **${f(takt)} MHz**, Prefetch **${prefetch}n** (${prefetch} Datenwörter je Takt), Busbreite **64 Bit**.\n\nWie hoch ist die **theoretische Datenrate des Moduls in MB/s**? (1 MB = 10⁶ Byte; ganzzahlig)`,
        answer: perModule,
        tolerance: 0,
        unit: 'MB/s',
        hints: ['Transfers pro Sekunde = Speichertakt · Prefetch (Ergebnis in MT/s).', 'MB/s = MT/s · 64 Bit ÷ 8 = MT/s · 8 Byte.'],
        mcs: [
          { answer: gen.mts * 64, error: 'ram-bit-byte', why: '64 Bit sind 8 **Byte**. Für MB/s durch 8 teilen.' },
          { answer: takt * 8, error: 'ram-prefetch', why: 'Der Prefetch fehlt: Pro Takt werden mehrere Datenwörter übertragen (Takt · Prefetch = MT/s).' },
          { answer: gen.mts, error: 'ram-busbreite', why: 'Das sind die **Transfers** pro Sekunde (MT/s). Pro Transfer werden 8 Byte übertragen.' },
        ],
        explanation:
          `**1. Transfers:** ${f(takt)} MHz · ${prefetch} = **${gen.mts} MT/s** (deshalb heißt das Modul ${gen.t}-${gen.mts})\n\n` +
          `**2. Datenrate:** ${gen.mts} MT/s · 64 Bit ÷ 8 = ${gen.mts} · 8 Byte = **${f(perModule, 0)} MB/s** (= ${gen.pc}-${perModule})\n\n` +
          `Hinweis: „Double Data Rate“ heißt, dass auf der Datenleitung bei **beiden Taktflanken** übertragen wird. Datenblätter nennen deshalb meist direkt die MT/s.`,
      });
    }
    if (d === 3) {
      const pcName = `${gen.pc}-${perModule}`;
      return numQ('hw.ram', 'hw.pc.ram', d, {
        prompt: `In einem Angebot ist ein Speichermodul als **${pcName}** bezeichnet. Mit welcher **Datentransferrate in MT/s** arbeitet das Modul (also „${gen.t}-…“)?`,
        answer: gen.mts,
        tolerance: 0,
        unit: 'MT/s',
        hints: ['Die PC-Bezeichnung gibt die Bandbreite in MB/s an.', 'Ein Modul überträgt 64 Bit = 8 Byte pro Transfer → MB/s / 8 = MT/s.'],
        mcs: [{ answer: perModule / 64, error: 'ram-bit-byte', why: 'Die Busbreite ist 64 **Bit** = 8 **Byte**. Da die Bandbreite in MB/s angegeben ist, durch 8 teilen.' }],
        explanation: `${pcName}: ${f(perModule, 0)} MB/s / 8 Byte = **${gen.mts} MT/s** → ${gen.t}-${gen.mts}`,
      });
    }
    const ch = d === 1 ? 1 : rng.pick([2, 2, 4]);
    const gbs = round((perModule * ch) / 1000, 1);
    return numQ('hw.ram', 'hw.pc.ram', d, {
      prompt: `Ein System nutzt **${gen.t}-${gen.mts}**-Module ${ch === 1 ? 'im **Single-Channel**-Betrieb (1 Kanal)' : ch === 2 ? 'im **Dual-Channel**-Betrieb (2 Kanäle)' : 'im **Quad-Channel**-Betrieb (4 Kanäle, Workstation)'}. Jeder Kanal ist 64 Bit breit.\n\nWie hoch ist die **theoretische maximale Speicherbandbreite in GB/s**? (1 GB = 1000 MB, auf eine Nachkommastelle runden)`,
      answer: gbs,
      tolerance: 0.1,
      unit: 'GB/s',
      hints: ['Bandbreite pro Kanal = MT/s · 8 Byte (64 Bit).', 'Mit der Anzahl der Kanäle multiplizieren.'],
      mcs: [
        { answer: round((gen.mts * 64 * ch) / 1000, 1), error: 'ram-bit-byte', why: '64 Bit sind 8 **Byte**. Für GB/s mit 8 multiplizieren, nicht mit 64.' },
        { answer: round(perModule / 1000, 1), error: 'ram-kanaele', why: 'Die Anzahl der Kanäle fehlt – jeder Kanal liefert die volle Bandbreite zusätzlich.' },
        { answer: round((gen.mts * ch) / 1000, 1), error: 'ram-busbreite', why: 'MT/s sind Transfers pro Sekunde. Pro Transfer werden 8 Byte übertragen.' },
      ],
      explanation:
        `**1. Pro Kanal:** ${gen.mts} MT/s · 8 Byte = **${f(perModule, 0)} MB/s** (deshalb heißt das Modul ${gen.pc}-${perModule})\n\n` +
        `**2. ${ch} Kanal/Kanäle:** ${f(perModule, 0)} MB/s · ${ch} = ${f(perModule * ch, 0)} MB/s = **${f(gbs, 1)} GB/s**`,
    });
  },
};

/** Übliche Nennleistungen von PC-Netzteilen in W (Auswahlliste im Aufgabentext). */
const PSU_SIZES = [300, 350, 400, 450, 500, 550, 650, 750, 850, 1000, 1200];

const netzteil: GeneratorMeta = {
  id: 'hw.netzteil',
  title: 'Netzteil mit Reserve dimensionieren (Datenblatt)',
  skill: 'hw.pc.psu',
  module: 'h01',
  make(rng, d) {
    const cpu = rng.pick([65, 88, 125, 142, 170]);
    const gpu = rng.pick([0, 115, 165, 220, 285]);
    const board = rng.pick([35, 40, 50, 60]);
    const nRam = rng.pick([2, 4]);
    const wRam = rng.pick([4, 5, 6]);
    const nSsd = d === 1 ? 1 : rng.pick([1, 2, 3]);
    const wSsd = rng.pick([6, 7, 8]);
    const nFan = d === 1 ? 2 : rng.pick([2, 3, 4]);
    const wFan = rng.pick([2, 3]);
    const res = rng.pick([1.2, 1.25, 1.3]);
    const rows: [string, number, number][] = [
      ['Prozessor (max. Leistungsaufnahme)', 1, cpu],
      ...(gpu ? [['Grafikkarte (Total Board Power)', 1, gpu] as [string, number, number]] : []),
      ['Mainboard inkl. Chipsatz', 1, board],
      ['DDR5-Speichermodul', nRam, wRam],
      ['NVMe-SSD (PCIe 4.0)', nSsd, wSsd],
      ['Gehäuselüfter', nFan, wFan],
    ];
    const sum = rows.reduce((s, [, n, w]) => s + n * w, 0);
    const sumNoQty = rows.reduce((s, [, , w]) => s + w, 0);
    const need = sum * res;
    const pickSize = (p: number) => PSU_SIZES.find((s) => s >= p - 1e-9) ?? PSU_SIZES[PSU_SIZES.length - 1];
    const size = pickSize(need);
    const beleg =
      `**Datenblatt-Auszug: Komponenten eines PCs**\n\n| Komponente | Anzahl | Leistung je Stück |\n|---|---|---|\n` +
      rows.map(([n, a, w]) => `| ${n} | ${a} | ${w} W |`).join('\n') +
      `\n\nEs soll eine Leistungsreserve mit dem **Faktor ${f(res)}** eingeplant werden (Summe · ${f(res)}).`;
    const sizes = `Lieferbare Netzteile: ${PSU_SIZES.map((s) => f(s, 0)).join(' / ')} W.`;
    const weg =
      `**1. Summe:** ${rows.map(([, n, w]) => (n > 1 ? `${n} · ${w} W` : `${w} W`)).join(' + ')} = **${f(sum, 0)} W**\n\n` +
      `**2. Reserve:** ${f(sum, 0)} W · ${f(res)} = **${f(need, 1)} W**`;
    if (d === 1) {
      return numQ('hw.netzteil', 'hw.pc.psu', d, {
        prompt: `${beleg}\n\nWelche **Mindestleistung in W** muss das Netzteil haben? (auf eine Nachkommastelle runden)`,
        answer: round(need, 1),
        tolerance: 0.1,
        unit: 'W',
        hints: ['Erst alle Leistungen addieren – Anzahl beachten.', `Dann mit dem Reservefaktor ${f(res)} multiplizieren.`],
        mcs: [
          { answer: sum, error: 'netzteil-reserve', why: `Das ist nur die Summe der Komponenten. Die Reserve fehlt: · ${f(res)}.` },
          { answer: round(sumNoQty * res, 1), error: 'netzteil-anzahl', why: 'Die Anzahl der Module/Lüfter wurde nicht berücksichtigt (Anzahl · Leistung je Stück).' },
        ],
        explanation: `**${f(need, 1)} W.**\n\n${weg}\n\nHäufiger Fehler: Reserve vergessen oder nur einen Speicherriegel/Lüfter zählen.`,
      });
    }
    if (d === 2) {
      return numQ('hw.netzteil', 'hw.pc.psu', d, {
        prompt: `${beleg}\n\n${sizes}\n\nWelches **Netzteil (Nennleistung in W)** wählst du? Nimm das kleinste lieferbare Netzteil, das die Mindestleistung erreicht.`,
        answer: size,
        tolerance: 0,
        unit: 'W',
        hints: ['Summe aller Komponenten (Anzahl · Leistung) bilden.', `Mit ${f(res)} multiplizieren und das nächstgrößere lieferbare Netzteil wählen.`],
        mcs: [
          { answer: pickSize(sum), error: 'netzteil-reserve', why: `Ohne Reserve gewählt. Mindestleistung: ${f(sum, 0)} W · ${f(res)} = ${f(need, 1)} W.` },
          { answer: pickSize(sumNoQty * res), error: 'netzteil-anzahl', why: 'Die Anzahl der Module/SSDs/Lüfter fehlt in der Summe.' },
          { answer: [...PSU_SIZES].reverse().find((s) => s < need - 1e-9) ?? 0, error: 'netzteil-abgerundet', why: `Das Netzteil ist kleiner als die Mindestleistung von ${f(need, 1)} W – immer auf die nächste lieferbare Größe **aufrunden**.` },
        ],
        explanation: `**${f(size, 0)}-W-Netzteil.**\n\n${weg}\n\n**3. Auswahl:** kleinstes lieferbares Netzteil ≥ ${f(need, 1)} W → **${f(size, 0)} W**.\n\nHäufiger Fehler: auf die kleinere Größe abrunden – dann fehlt die Reserve für Lastspitzen.`,
      });
    }
    const load = (sum / size) * 100;
    return numQ('hw.netzteil', 'hw.pc.psu', d, {
      prompt: `${beleg}\n\n${sizes}\n\nDu wählst das kleinste lieferbare Netzteil, das die Mindestleistung erreicht. Zu wie viel **Prozent** ist dieses Netzteil ausgelastet, wenn alle Komponenten gleichzeitig ihre volle Leistung abrufen (ohne Reserve)? (auf eine Nachkommastelle runden)`,
      answer: round(load, 1),
      tolerance: 0.1,
      unit: '%',
      hints: ['Mindestleistung = Summe · Reservefaktor → Netzteilgröße wählen.', 'Auslastung = Summe der Komponenten ÷ Nennleistung des Netzteils · 100.'],
      mcs: [
        { answer: round((need / size) * 100, 1), error: 'netzteil-reserve', why: 'Mit der Leistung **inklusive** Reserve gerechnet. Die Komponenten ziehen aber nur die tatsächliche Summe.' },
        { answer: round((sum / need) * 100, 1), error: 'netzteil-abgerundet', why: 'Durch die Mindestleistung statt durch die Nennleistung des gewählten Netzteils geteilt.' },
      ],
      explanation:
        `**${f(load, 1)} %.**\n\n${weg}\n\n**3. Auswahl:** ${f(size, 0)} W\n\n**4. Auslastung:** ${f(sum, 0)} W ÷ ${f(size, 0)} W · 100 = **${f(load, 1)} %**\n\n` +
        `Bei Teillast (Büroalltag) liegt die Auslastung deutlich darunter; 80-PLUS-Netzteile sind um 50 % Last am effizientesten.`,
    });
  },
};

export const GENERATORS_HARDWARE: GeneratorMeta[] = [
  ramBandbreite,
  netzteil,
  kapazitaet,
  tbw,
  ppiGen,
  bildspeicher,
  seitenkosten,
  leistung,
  stromkosten,
  wirkungsgrad,
  usv,
  achtzigPlus,
  betriebsprofil,
  co2,
  usvCheck,
];

/** Typ-Hilfe: Generatorfunktionen erhalten einen deterministischen Rng (siehe ../rng). */
export type HardwareRng = Rng;
