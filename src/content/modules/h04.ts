import type { Module } from '../types';

export const h04: Module = {
  id: 'h04',
  nr: 4,
  area: 'hardware',
  title: 'Energie, Elektrotechnik & Umwelt',
  short: `P = U · I, Drehstrom, W = P · t mit Betriebsprofil, Stromkosten, Wirkungsgrad und 80 PLUS (230 V EU), Energielabels, USV-Typen und -Dimensionierung, Green IT mit CO₂-Rechnung und Entsorgung nach ElektroG.`,
  icon: 'Zap',
  relevance: 'ap1',
  prerequisites: ['h01'],
  generators: ['hw.leistung', 'hw.stromkosten', 'hw.betriebsprofil', 'hw.wirkungsgrad', 'hw.80plus', 'hw.usv', 'hw.usvcheck', 'hw.co2'],
  skills: [
    { id: 'hw.energy.power', module: 'h04', title: 'Elektrische Grundgrößen: U, I, R, P' },
    { id: 'hw.energy.cost', module: 'h04', title: 'Energie (W = P · t) und Stromkosten berechnen', requires: ['hw.energy.power'] },
    { id: 'hw.energy.efficiency', module: 'h04', title: 'Wirkungsgrad, Verlustleistung, 80 PLUS', requires: ['hw.energy.power'] },
    { id: 'hw.energy.labels', module: 'h04', title: 'Energielabels, Umwelt- und Prüfzeichen' },
    { id: 'hw.ups.types', module: 'h04', title: 'Netzstörungen und USV-Typen (VFD, VI, VFI)' },
    { id: 'hw.ups.sizing', module: 'h04', title: 'USV dimensionieren (VA, W, cos φ, Überbrückungszeit)', requires: ['hw.energy.power', 'hw.ups.types'] },
    { id: 'hw.green.it', module: 'h04', title: 'Green IT und Energiesparmaßnahmen', requires: ['hw.energy.cost'] },
    { id: 'hw.green.disposal', module: 'h04', title: 'Entsorgung von IT-Geräten (ElektroG/WEEE)' },
  ],
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'h04-l01',
      title: 'Elektrische Grundgrößen: Spannung, Strom, Widerstand, Leistung',
      minutes: 15,
      relevance: 'ap1',
      skills: ['hw.energy.power'],
      simple: `Strom kannst du dir wie Wasser in einem Gartenschlauch vorstellen. Die **Spannung** (Volt, V) ist der Wasserdruck, die **Stromstärke** (Ampere, A) ist die Wassermenge pro Sekunde, und der **Widerstand** (Ohm, Ω) ist eine Engstelle im Schlauch. Die **Leistung** (Watt, W) sagt, wie viel Arbeit pro Sekunde erledigt wird: Druck mal Menge, also P = U · I. Eine Sicherung (z. B. 16 A) ist wie ein Ventil, das bei zu viel Durchfluss zumacht. Darum dürfen nicht beliebig viele Geräte an einem Stromkreis hängen.

**Merke:** P = U · I, umgestellt I = P ÷ U – an 230 V mit 16 A sind höchstens 3.680 W möglich.`,
      steps: [
        {
          type: 'explain',
          title: 'Die vier Größen, die du kennen musst',
          body: `Der AP1-Katalog nennt ausdrücklich **Energiekenngrößen**, **P = U · I** und **W = P · t**.

| Größe | Formelzeichen | Einheit | Bedeutung |
|---|---|---|---|
| **Spannung** | U | Volt (V) | „Druck“, der die Elektronen antreibt (Steckdose: 230 V) |
| **Stromstärke** | I | Ampere (A) | Menge der fließenden Ladung pro Sekunde |
| **Widerstand** | R | Ohm (Ω) | hemmt den Stromfluss |
| **Leistung** | P | Watt (W) | Energieumsatz pro Zeit |

**Ohmsches Gesetz:** U = R · I  →  I = U / R  →  R = U / I

**Elektrische Leistung:** **P = U · I**  →  I = P / U  →  U = P / I

**Merkdreieck:** Halte die gesuchte Größe zu – was übrig bleibt, ist die Formel. Für P: oben P, unten U und I. P zuhalten → U · I. I zuhalten → P / U.

**Praxiswerte:**
- Haushalts-/Büronetz in Deutschland: **230 V, 50 Hz** Wechselspannung; Drehstrom (Server, große USV): 400 V.
- Ein Stromkreis mit **16-A-Sicherung**: P_max = 230 V · 16 A = **3.680 W**. Mehrere Schulungs-PCs, ein Laserdrucker (Spitzen über 1.000 W beim Aufheizen) und eine Kaffeemaschine am selben Stromkreis können die Sicherung auslösen.
- Kleingeräte arbeiten mit **Gleichspannung** aus Netzteilen: Notebook 19–20 V, Router 12 V, USB 5–48 V.

**Wechselstrom-Hinweis:** Bei Wechselstrom gilt genau genommen P = U · I · cos φ (Leistungsfaktor, siehe USV-Lektion). PC-Netzteile mit aktiver PFC haben cos φ nahe 1 – in Prüfungsaufgaben wird ohne Angabe meist **cos φ = 1** angenommen.

**Wechselspannung genauer:** Die 230 V sind der **Effektivwert** – die Spannung wirkt so stark wie 230 V Gleichspannung. Tatsächlich schwankt sie sinusförmig zwischen etwa **+325 V und −325 V** (Scheitelwert = 230 V · √2 ≈ 325 V). Bei **50 Hz** wiederholt sich die Schwingung 50-mal pro Sekunde. Eine Schwingung dauert also **T = 1 ÷ f = 1 ÷ 50 Hz = 0,02 s = 20 ms** (Periodendauer).

**Drehstrom (Dreiphasenwechselstrom):** Ins Gebäude kommen drei **Außenleiter** (L1, L2, L3, umgangssprachlich „Phasen“), dazu Neutralleiter (N) und Schutzleiter (PE). Zwischen einem Außenleiter und N liegen **230 V**, zwischen zwei Außenleitern **400 V** (230 V · √3 ≈ 400 V). Eine normale Steckdose hängt an genau einem Außenleiter. Für Serverraum und Netzwerkschrank folgt daraus:
- Die Last **gleichmäßig auf die drei Phasen verteilen** – sonst ist eine Phase überlastet, während die anderen kaum genutzt werden.
- Server mit **zwei Netzteilen** an **zwei verschiedene Stromkreise** anschließen (ideal: getrennte A-/B-Versorgung, z. B. über zwei Phasen oder zwei USVs). Löst eine Sicherung aus, läuft der Server über das zweite Netzteil weiter.
- Große USVs (oft ab etwa 10 kVA) werden dreiphasig angeschlossen.
- Die Elektroinstallation selbst (Steckdosen, Verteiler, Drehstromanschlüsse) baut und ändert nur eine **Elektrofachkraft** – siehe Modul „Ergonomie, Arbeitsschutz & Barrierefreiheit“.

**Rechenbeispiel Phase:** 6 Server mit je 450 W an **einer** Phase: I = 2.700 W ÷ 230 V ≈ **11,74 A** → ein 16-A-Stromkreis reicht, aber mit wenig Reserve.`,
        },
        {
          type: 'visual',
          title: 'Die Formeln auf einen Blick',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'P = U · I', text: 'Leistung in Watt aus Spannung (V) und Strom (A). Umgestellt: I = P / U.', icon: 'Zap' },
                { title: 'U = R · I', text: 'Ohmsches Gesetz. Widerstand R = U / I in Ohm.', icon: 'CircuitBoard' },
                { title: 'W = P · t', text: 'Energie in Wh bzw. kWh aus Leistung und Zeit (nächste Lektion).', icon: 'Clock' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Beispiel: Strom eines Servers und Belastung des Stromkreises',
          problem: `Ein Server nimmt **690 W** auf (230 V, cos φ = 1). (a) Welcher Strom fließt? (b) Wie viele dieser Server dürfen höchstens an einem mit **16 A** abgesicherten Stromkreis betrieben werden?`,
          steps: [
            { label: '(a) Strom', body: 'I = P / U = 690 W / 230 V = **3 A**' },
            { label: '(b) Maximalleistung', body: 'P_max = 230 V · 16 A = 3.680 W' },
            { label: '(b) Anzahl', body: '3.680 W / 690 W = 5,33 → **abrunden: 5 Server** (bzw. 16 A / 3 A = 5,33 → 5)' },
          ],
          result: '3 A pro Server; höchstens 5 Server an einem 16-A-Stromkreis (ohne Reserve).',
        },
        {
          type: 'check',
          question: {
            id: 'h04-c01', kind: 'number', skill: 'hw.energy.power', difficulty: 1,
            prompt: `Ein Notebook-Netzteil liefert **20 V** bei **3,25 A**. Welche Leistung in **W**?`,
            answer: 65, unit: 'W',
            misconceptions: [{ answer: '6.15', error: 'leistung-formel', why: 'U / I ergibt einen Widerstand. Leistung: P = U · I.' }],
            explanation: 'P = 20 V · 3,25 A = **65 W**.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'h04-c02', kind: 'number', skill: 'hw.energy.power', difficulty: 2,
            prompt: `Ein Laserdrucker nimmt beim Aufheizen kurzzeitig **1.150 W** auf (230 V, cos φ = 1). Wie hoch ist der Strom in **A**?`,
            answer: 5, unit: 'A',
            misconceptions: [{ answer: '264500', error: 'leistung-formel', why: 'I = P / U – nicht multiplizieren.' }],
            explanation: 'I = 1.150 W / 230 V = **5 A**.',
          },
        },
        { type: 'practice', title: 'Übung: P = U · I', generator: 'hw.leistung', count: 4, difficulty: 2 },
        { type: 'practice', title: 'Übung: Wechselspannung und Drehstrom', questionIds: ['h04-q032', 'h04-q033', 'h04-q034'], count: 3, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'U (V), I (A), R (Ω), P (W).',
            'P = U · I; U = R · I.',
            '230 V, 16 A → max. 3.680 W pro Stromkreis.',
            'Ohne Angabe: cos φ = 1.',
            '230 V = Effektivwert (Scheitel ≈ 325 V); 50 Hz → T = 20 ms.',
            'Drehstrom: 230 V gegen N, 400 V zwischen zwei Außenleitern; Last auf die Phasen verteilen, redundante Netzteile an getrennte Stromkreise.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'h04-l02',
      title: 'Energie und Stromkosten berechnen',
      minutes: 25,
      relevance: 'ap1',
      skills: ['hw.energy.cost'],
      simple: `Die **Leistung** (Watt) sagt, wie viel ein Gerät **gerade** braucht – wie die Geschwindigkeit beim Autofahren. Die **Energie** (Kilowattstunden, kWh) ist das, was am Ende zusammenkommt – wie die gefahrenen Kilometer. Deshalb gilt: Energie = Leistung · Zeit (W = P · t). Der Stromanbieter rechnet pro kWh ab, also teilst du Wattstunden erst durch 1.000. Vergiss die Zeit im **Standby** (Bereitschaft) nicht: Ein paar Watt über tausende Stunden ergeben auch Geld.

**Merke:** Kosten = P · t ÷ 1.000 · Preis pro kWh – Betrieb und Standby getrennt rechnen und die Zeiten aus dem Betriebsprofil nehmen.`,
      steps: [
        {
          type: 'explain',
          title: 'W = P · t – und dann mal Strompreis',
          body: `**Energie (elektrische Arbeit):** **W = P · t**

- P in Watt, t in Stunden → W in **Wattstunden (Wh)**
- **1 kWh = 1.000 Wh** (1 kWh = 3,6 MJ)
- Strompreise werden in **€/kWh** oder **ct/kWh** angegeben → vorher **durch 1.000 teilen**!

**Kosten = Energie in kWh · Preis in €/kWh**

**Wichtige Zeiträume:**

| Zeitraum | Stunden |
|---|---|
| 1 Tag Dauerbetrieb | 24 h |
| 1 Jahr Dauerbetrieb | 24 · 365 = **8.760 h** |
| Arbeitsjahr (Beispiel 220 Tage · 8 h) | 1.760 h |
| Restzeit im Jahr (Standby) | 8.760 h − Betriebsstunden |

**Lösungsschema (in der Prüfung immer aufschreiben):**
1. Betriebszeiten bestimmen (Betrieb, Standby, Aus).
2. Energie je Zustand: P · t (Wh) → kWh.
3. Summe der kWh · Preis.
4. Bei mehreren Geräten: mit der Anzahl multiplizieren.

**Standby-Verbrauch** wird oft unterschätzt. Die EU-Ökodesign-Vorgaben begrenzen die Leistungsaufnahme neuer Geräte im Aus-/Standby-Zustand auf sehr kleine Werte (Größenordnung 0,5 W); ältere Geräte, Drucker im Bereitschaftsmodus oder vernetzte Geräte liegen oft deutlich darüber. Über 7.000 Stunden pro Jahr summiert sich das.

**Typische Fehler:** Wh nicht in kWh umgerechnet (Ergebnis 1.000-fach zu groß), ct statt € (100-fach zu groß), Standby vergessen, 24 h statt Betriebszeit verwendet.`,
        },
        {
          type: 'visual',
          title: 'Rechenweg Stromkosten',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: '1. Zeit', text: 'Betriebsstunden, Standbystunden (8.760 h − Betrieb).', icon: 'Clock' },
                { title: '2. Energie', text: 'W = P · t in Wh, dann / 1.000 → kWh.', icon: 'Zap' },
                { title: '3. Kosten', text: 'kWh · €/kWh (ct → € durch 100).', icon: 'Calculator' },
                { title: '4. Anzahl', text: 'Mit Anzahl der Geräte multiplizieren.', icon: 'Users' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Beispiel: Jährliche Stromkosten eines Arbeitsplatz-PCs',
          problem: `Ein PC nimmt im Betrieb **60 W** auf und läuft an **220 Arbeitstagen** je **8 Stunden**. In der übrigen Zeit des Jahres steht er im Standby mit **1,5 W**. Strompreis: **32 ct/kWh**. Wie hoch sind die jährlichen Stromkosten? Was kosten die Standby-Zeiten für **20** solcher PCs?`,
          steps: [
            { label: 'Betriebsstunden', body: '220 · 8 h = **1.760 h**; Standby: 8.760 h − 1.760 h = **7.000 h**' },
            { label: 'Energie Betrieb', body: '60 W · 1.760 h = 105.600 Wh = **105,6 kWh**' },
            { label: 'Energie Standby', body: '1,5 W · 7.000 h = 10.500 Wh = **10,5 kWh**' },
            { label: 'Kosten 1 PC', body: '(105,6 + 10,5) kWh · 0,32 €/kWh = 116,1 · 0,32 = **37,15 €**' },
            { label: 'Standby 20 PCs', body: '20 · 10,5 kWh · 0,32 €/kWh = **67,20 €** pro Jahr – nur für „nichts tun“.' },
          ],
          result: '37,15 € pro PC und Jahr; Standby von 20 PCs: 67,20 €/Jahr.',
        },
        {
          type: 'check',
          question: {
            id: 'h04-c03', kind: 'number', skill: 'hw.energy.cost', difficulty: 2,
            prompt: `Ein Switch läuft ganzjährig mit **45 W**. Strompreis **30 ct/kWh**. Stromkosten pro Jahr in **€**? (auf Cent)`,
            answer: 118.26, tolerance: 0.01, unit: '€',
            misconceptions: [{ answer: '118260', error: 'energie-wh-kwh', why: 'Wh nicht in kWh umgerechnet.' }, { answer: '11826', error: 'energie-cent-euro', why: 'Preis in Cent eingesetzt – Ergebnis wären Cent.' }],
            explanation: '45 W · 8.760 h = 394.200 Wh = 394,2 kWh · 0,30 € = **118,26 €**.',
          },
        },
        {
          type: 'explain',
          title: 'Betriebsprofil: Wann läuft das Gerät wirklich?',
          body: `In vielen Aufgaben steht nicht einfach „Dauerbetrieb“, sondern ein **Betriebsprofil**. Es sagt, wann ein Gerät in welchem Zustand ist:

| Zustand | Zeit | Leistung |
|---|---|---|
| Betrieb | Montag bis Freitag, je 12 h | 60 W |
| Standby | restliche Stunden der Woche | 2 W |

**Rechenweg mit Wochenprofil** (die Aufgabe gibt 52 Wochen pro Jahr vor):
1. **Stunden pro Woche:** Betrieb 5 · 12 h = **60 h**. Eine Woche hat 7 · 24 h = **168 h**, also Standby 168 h − 60 h = **108 h**.
2. **Stunden pro Jahr:** Betrieb 60 h · 52 = **3.120 h**; Standby 108 h · 52 = **5.616 h**.
3. **Energie Betrieb:** 60 W · 3.120 h = 187.200 Wh = **187,2 kWh**.
4. **Energie Standby:** 2 W · 5.616 h = 11.232 Wh = **11,232 kWh**.
5. **Summe:** 187,2 kWh + 11,232 kWh = **198,432 kWh** pro Jahr und Arbeitsplatz. Bei mehreren Arbeitsplätzen mit der Anzahl multiplizieren, dann mit dem Preis.

**Achtung:** 52 Wochen · 168 h = 8.736 h – das sind 24 h weniger als 365 Tage (8.760 h). Nimm immer die Vorgabe der Aufgabe (52 Wochen, 365 Tage oder z. B. 220 Arbeitstage) und schreib sie in deinen Rechenweg.

**Kurzaufgabe „viele Geräte an einem Tag“:** 60 PCs · 150 W · 10 h = 90.000 Wh = **90 kWh** pro Tag.`,
        },
        { type: 'practice', title: 'Übung: Stromkosten', generator: 'hw.stromkosten', count: 4, difficulty: 2 },
        { type: 'practice', title: 'Übung: Betriebsprofil', generator: 'hw.betriebsprofil', count: 3, difficulty: 2 },
        { type: 'practice', title: 'Übung: Stromkosten mit Belegen', questionIds: ['h04-q004', 'h04-q005', 'h04-q006', 'h04-q035'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'W = P · t; 1 kWh = 1.000 Wh.',
            'Jahr = 8.760 h; Standby = 8.760 h − Betriebszeit.',
            'Betriebsprofil: Woche = 168 h; Betrieb und Standby je Woche, dann · 52 (oder die Vorgabe der Aufgabe).',
            'Kosten = kWh · €/kWh (ct → € durch 100).',
            'Typische Fehler: Wh/kWh, ct/€, Standby vergessen.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'h04-l03',
      title: 'Wirkungsgrad, Verlustleistung und 80 PLUS',
      minutes: 20,
      relevance: 'ap1',
      skills: ['hw.energy.efficiency'],
      simple: `Ein Netzteil ist wie ein Übersetzer: Es macht aus den 230 V der Steckdose die kleinen Gleichspannungen für den PC. Dabei geht immer etwas als Wärme verloren – wie bei einem Übersetzer, der ein paar Wörter verschluckt. Der **Wirkungsgrad** η (sprich „eta“) sagt, welcher Anteil wirklich ankommt: η = abgegebene Leistung ÷ aufgenommene Leistung. Das Siegel **80 PLUS** (Bronze bis Titanium) garantiert Mindestwerte für diesen Anteil. Weil Verluste dazukommen, nimmt das Netzteil immer **mehr** aus der Steckdose auf, als es an den PC abgibt.

**Merke:** Aufgenommene Leistung = abgegebene Leistung ÷ η – niemals mal η.`,
      steps: [
        {
          type: 'explain',
          title: 'Nicht alles, was reingeht, kommt an',
          body: `Ein Netzteil wandelt 230 V Wechselspannung in Gleichspannung um. Dabei entsteht **Wärme** – das ist Verlust.

**Wirkungsgrad:** **η = P_ab / P_zu** (immer < 1 bzw. < 100 %)
- P_zu: aus dem Netz aufgenommene Leistung
- P_ab: an die Komponenten abgegebene Leistung

**Umgestellt:** P_zu = P_ab / η

**Verlustleistung:** P_V = P_zu − P_ab (wird als Wärme frei → muss per Lüfter/Klimaanlage abgeführt werden, kostet also doppelt).

**80 PLUS** – Zertifizierung für Netzteile. Sie garantiert **Mindestwirkungsgrade** bei bestimmten Auslastungen (Last = abgegebene Leistung ÷ Nennleistung des Netzteils). Es gibt **zwei Tabellen**, weil Netzteile an höherer Netzspannung etwas effizienter arbeiten.

**Tabelle 1 – 230 V EU, interne Netzteile (gilt für Deutschland):**

| Stufe | 10 % Last | 20 % Last | 50 % Last | 100 % Last |
|---|---|---|---|---|
| 80 PLUS (Standard) | – | 82 % | 85 % | 82 % |
| Bronze | – | 85 % | 88 % | 85 % |
| Silver | – | 87 % | 90 % | 87 % |
| **Gold** | – | 90 % | **92 %** | 89 % |
| Platinum | – | 92 % | 94 % | 90 % |
| Titanium | 90 % | 94 % | 96 % | 94 % |

**Tabelle 2 – 115 V (z. B. USA), interne Netzteile:**

| Stufe | 10 % Last | 20 % Last | 50 % Last | 100 % Last |
|---|---|---|---|---|
| 80 PLUS (Standard) | – | 80 % | 80 % | 80 % |
| Bronze | – | 82 % | 85 % | 82 % |
| Silver | – | 85 % | 88 % | 85 % |
| Gold | – | 87 % | 90 % | 87 % |
| Platinum | – | 90 % | 92 % | 89 % |
| Titanium | 90 % | 92 % | 94 % | 90 % |

**So liest du die Tabelle (3 Schritte):**
1. **Auslastung bestimmen:** abgegebene Leistung ÷ Nennleistung, z. B. 325 W ÷ 650 W = 0,5 = **50 %**.
2. **Mindestwirkungsgrad ablesen:** Zeile der Stufe, Spalte der Auslastung (Gold, 50 % → **92 %**).
3. **Aufgenommene Leistung:** P_zu = P_ab ÷ η = 325 W ÷ 0,92 ≈ **353,26 W**.

In der Prüfung gilt immer die Tabelle **im Beleg**. Steht keine dabei, nimm für Deutschland die 230-V-Tabelle. Wichtig fürs Verständnis:
- Der Wirkungsgrad hängt von der **Auslastung** ab – das Maximum liegt meist um **50 %**.
- Bei sehr geringer Last (Büro-PC mit 750-W-Netzteil im Leerlauf bei 40 W ≈ 5 % Last) ist der Wirkungsgrad deutlich schlechter.

**Rechenbeispiel:** Komponenten brauchen 400 W, η = 90 % → P_zu = 400 / 0,9 = **444,44 W**, Verlust = **44,44 W**. Im Dauerbetrieb: 44,44 W · 8.760 h ≈ **389,3 kWh** pro Jahr nur Verlust.`,
        },
        {
          type: 'example',
          title: 'Beispiel: Lohnt sich ein effizienteres Server-Netzteil?',
          problem: `Ein Server benötigt dauerhaft **300 W** (Gleichstromseite). Altes Netzteil η = **82 %**, neues Netzteil η = **94 %**. Strompreis **30 ct/kWh**. Wie viel spart der Tausch pro Jahr?`,
          steps: [
            { label: 'Alt', body: 'P_zu = 300 / 0,82 = **365,85 W**' },
            { label: 'Neu', body: 'P_zu = 300 / 0,94 = **319,15 W**' },
            { label: 'Differenz', body: '365,85 − 319,15 = **46,70 W**' },
            { label: 'Energie', body: '46,70 W · 8.760 h = 409.092 Wh ≈ **409,1 kWh**' },
            { label: 'Kosten', body: '409,1 kWh · 0,30 €/kWh ≈ **122,73 €** pro Jahr (zuzüglich weniger Kühlaufwand)' },
          ],
          result: '≈ 409 kWh bzw. ≈ 123 € Ersparnis pro Jahr.',
        },
        {
          type: 'check',
          question: {
            id: 'h04-c04', kind: 'number', skill: 'hw.energy.efficiency', difficulty: 2,
            prompt: `Ein Netzteil gibt **450 W** ab und nimmt **500 W** auf. Wirkungsgrad in **%**?`,
            answer: 90, unit: '%',
            misconceptions: [{ answer: '111.1', error: 'wirkungsgrad-kehrwert', why: 'Kehrwert gebildet – η ist immer kleiner als 100 %.' }],
            explanation: 'η = 450 / 500 = 0,9 = **90 %**.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'h04-c05', kind: 'number', skill: 'hw.energy.efficiency', difficulty: 2,
            prompt: `Die Komponenten eines PCs benötigen **180 W**, das Netzteil hat bei dieser Last **η = 87 %**. Wie viel Leistung nimmt es aus dem Netz auf? (W, eine Nachkommastelle)`,
            answer: 206.9, tolerance: 0.1, unit: 'W',
            misconceptions: [{ answer: '156.6', error: 'wirkungsgrad-multipliziert', why: 'Mit η multipliziert – das Netzteil nimmt mehr auf, als es abgibt: P_zu = P_ab / η.' }],
            explanation: 'P_zu = 180 W / 0,87 = **206,9 W** (Verlust ≈ 26,9 W).',
          },
        },
        {
          type: 'example',
          title: 'Beispiel 2: Aufgenommene Leistung aus der 80-PLUS-Tabelle',
          problem: `Ein Büro-PC hat ein **650-W-Netzteil, 80 PLUS Gold** (230 V EU). Unter Last brauchen die Komponenten **325 W**. Wie viel Leistung nimmt das Netzteil höchstens aus der Steckdose auf, und wie groß ist die Verlustleistung?`,
          steps: [
            { label: 'Auslastung', body: '325 W ÷ 650 W = 0,5 → **50 % Last**' },
            { label: 'Tabelle', body: '230-V-EU-Tabelle, Zeile Gold, Spalte 50 % → **η = 92 % = 0,92**' },
            { label: 'Aufnahme', body: 'P_zu = P_ab ÷ η = 325 W ÷ 0,92 = **353,26 W**' },
            { label: 'Verlust', body: 'P_V = 353,26 W − 325 W = **28,26 W** (wird zu Wärme)' },
          ],
          result: 'Höchstens ≈ 353,3 W aus dem Netz; ≈ 28,3 W Verlustleistung. Häufiger Fehler: 325 W · 0,92 = 299 W – dann käme weniger heraus, als abgegeben wird.',
        },
        { type: 'practice', title: 'Übung: Wirkungsgrad', generator: 'hw.wirkungsgrad', count: 4, difficulty: 2 },
        { type: 'practice', title: 'Übung: 80-PLUS-Tabelle anwenden', generator: 'hw.80plus', count: 3, difficulty: 2 },
        { type: 'practice', title: 'Übung: 80 PLUS mit Beleg', questionIds: ['h04-q036', 'h04-q037'], count: 2, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'η = P_ab / P_zu; P_zu = P_ab / η; Verlust = P_zu − P_ab.',
            '80 PLUS Bronze … Titanium: höhere Stufe = höherer Mindestwirkungsgrad; in Deutschland gilt die 230-V-EU-Tabelle (Gold bei 50 % Last: 92 %).',
            'Tabelle lesen: Auslastung = P_ab ÷ Nennleistung → η ablesen → P_zu = P_ab ÷ η.',
            'Effizienzmaximum meist um 50 % Last.',
            'Verlustwärme muss zusätzlich gekühlt werden.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'h04-l04',
      title: 'Energielabels, Umwelt- und Prüfzeichen',
      minutes: 15,
      relevance: 'ap1',
      skills: ['hw.energy.labels'],
      simple: `Prüf- und Umweltzeichen sind wie Siegel auf Lebensmitteln: Jedes verspricht etwas anderes. Das **EU-Energielabel** (Klassen A bis G) ist bei Monitoren Pflicht und zeigt den Verbrauch. Der **Blaue Engel** ist das deutsche Umweltzeichen, **TCO Certified** prüft zusätzlich Ergonomie und faire Arbeitsbedingungen in der Herstellung. Das **CE**-Zeichen ist dagegen nur ein Versprechen des Herstellers selbst – niemand Unabhängiges hat geprüft. Das **GS**-Zeichen („geprüfte Sicherheit“) vergibt eine unabhängige Prüfstelle wie der TÜV.

**Merke:** CE = Erklärung des Herstellers, kein Prüfzeichen; TCO Certified = auch soziale Kriterien; Blauer Engel = deutsches Umweltzeichen.`,
      steps: [
        {
          type: 'explain',
          title: 'Welches Zeichen sagt was?',
          body: `| Zeichen | Herausgeber | Aussage | Hinweise |
|---|---|---|---|
| **EU-Energielabel** | Europäische Union (Pflicht) | Energieeffizienzklasse **A–G**; bei **Monitoren/Displays** seit März 2021 neu skaliert, mit Verbrauch in **kWh/1.000 h** (SDR und HDR) und **QR-Code** zur EU-Produktdatenbank EPREL | Pflicht für Displays; PCs/Notebooks haben **kein** EU-Energielabel (für sie gelten Ökodesign-Mindestanforderungen) |
| **Energy Star** | US-Umweltbehörde EPA | Energieeffizienz von IT-Geräten | Abkommen mit der EU 2018 ausgelaufen – in der EU nur noch Herstellerangabe/Orientierung |
| **TCO Certified** | TCO Development (Schweden), unabhängig geprüft | Nachhaltigkeit über den Lebenszyklus: **soziale Verantwortung in der Produktion**, Schadstoffe, Ergonomie, Energie, Langlebigkeit/Kreislauf | für Monitore, Notebooks, Headsets u. a. |
| **Blauer Engel** | Deutsche Bundesregierung (Umweltbundesamt, RAL) | Umweltzeichen: geringer Verbrauch, Schadstoffarmut, Emissionen (z. B. Drucker: Feinstaub/Ozon), Recyclinggerechtigkeit, Geräuscharmut | gilt als besonders anspruchsvoll |
| **EU Ecolabel** („Euroblume“) | Europäische Union (freiwillig) | Umweltzeichen über den Lebenszyklus | |
| **EPEAT** | Global Electronics Council | Nachhaltigkeitsregister (Bronze/Silver/Gold) | v. a. öffentliche Beschaffung |
| **80 PLUS** | CLEAResult | Netzteil-Wirkungsgrad | siehe vorige Lektion |
| **CE** | Hersteller selbst | **Konformitätserklärung**: Produkt erfüllt die EU-Richtlinien (z. B. Sicherheit, EMV) | **kein** Qualitäts- oder Prüfzeichen – keine unabhängige Prüfung |
| **GS** („Geprüfte Sicherheit“) | unabhängige Prüfstelle (z. B. TÜV) | Produktsicherheit nach Produktsicherheitsgesetz geprüft | freiwillig |

**Prüfungstipp:** Wird nach einem Zeichen für „soziale Arbeitsbedingungen in der Herstellung“ gefragt → **TCO Certified**. „Deutsches staatliches Umweltzeichen“ → **Blauer Engel**. „Pflichtkennzeichnung mit Effizienzklasse bei Monitoren“ → **EU-Energielabel**. „Selbsterklärung des Herstellers“ → **CE**.`,
        },
        {
          type: 'visual',
          title: 'Labels nach Zweck',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Energie', text: 'EU-Energielabel (Pflicht, Displays), Energy Star, 80 PLUS (Netzteile).', icon: 'Zap' },
                { title: 'Umwelt & Soziales', text: 'Blauer Engel, TCO Certified, EU Ecolabel, EPEAT.', icon: 'Leaf' },
                { title: 'Sicherheit & Konformität', text: 'CE (Herstellererklärung), GS (unabhängig geprüft).', icon: 'Shield' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Beispiel: Energielabel lesen',
          problem: `Auf dem EU-Energielabel eines Monitors steht: Klasse **E**, **19 kWh/1000h** (SDR). Der Monitor läuft an 220 Tagen je 9 Stunden. Wie viel Energie verbraucht er pro Jahr im SDR-Betrieb und was kostet das bei 30 ct/kWh?`,
          steps: [
            { label: 'Leistung', body: '19 kWh pro 1.000 h → 19.000 Wh / 1.000 h = **19 W** mittlere Leistungsaufnahme' },
            { label: 'Betriebszeit', body: '220 · 9 h = **1.980 h**' },
            { label: 'Energie', body: '19 kWh / 1.000 h · 1.980 h = **37,62 kWh**' },
            { label: 'Kosten', body: '37,62 kWh · 0,30 €/kWh = **11,29 €**' },
          ],
          result: '37,62 kWh bzw. 11,29 € pro Jahr',
        },
        {
          type: 'check',
          question: {
            id: 'h04-c06', kind: 'single', skill: 'hw.energy.labels', difficulty: 2,
            prompt: `Was bescheinigt das **CE-Zeichen** auf einem Monitor?`,
            options: ['Eine unabhängige Prüfung durch den TÜV', 'Die Erklärung des Herstellers, dass das Produkt die einschlägigen EU-Vorschriften erfüllt', 'Besonders geringen Energieverbrauch', 'Faire Arbeitsbedingungen in der Produktion'],
            answer: 1,
            distractors: {
              '0': { why: 'Eine unabhängige Prüfung bescheinigt z. B. das GS-Zeichen. CE ist eine Selbsterklärung.', error: 'label-verwechselt' },
              '2': { why: 'Energieeffizienz zeigt das EU-Energielabel.', error: 'label-verwechselt' },
              '3': { why: 'Soziale Kriterien prüft z. B. TCO Certified.', error: 'label-verwechselt' },
            },
            explanation: 'CE = Konformitätserklärung des Herstellers; Voraussetzung für das Inverkehrbringen in der EU.',
          },
        },
        { type: 'practice', title: 'Übung: Labels', questionIds: ['h04-q010', 'h04-q011', 'h04-q012'], count: 3, difficulty: 1 },
        {
          type: 'summary',
          points: [
            'EU-Energielabel A–G (Displays, kWh/1000h, QR-Code/EPREL).',
            'TCO Certified: inkl. soziale Kriterien und Ergonomie.',
            'Blauer Engel: deutsches Umweltzeichen.',
            'CE = Herstellererklärung, kein Prüfzeichen; GS = unabhängig geprüft.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'h04-l05',
      title: 'USV: Netzstörungen und USV-Typen',
      minutes: 20,
      relevance: 'ap1',
      skills: ['hw.ups.types'],
      simple: `Eine **USV** (unterbrechungsfreie Stromversorgung) ist wie eine Powerbank für den Server: Fällt der Strom aus, liefern Akkus sofort weiter. So bleibt Zeit, die Server sauber herunterzufahren, damit keine Daten kaputtgehen. Die **Offline-USV** (VFD) springt erst bei einem Ausfall ein. Die **Line-interactive-USV** (VI) gleicht zusätzlich zu hohe oder zu niedrige Spannung aus. Die **Online-USV** (VFI) erzeugt den Strom ständig selbst neu – wie ein Fahrer, der immer am Steuer sitzt, statt erst im Notfall zu übernehmen.

**Merke:** VFD → VI → VFI = immer mehr Schutz; nur die Online-USV (VFI) arbeitet ohne Umschaltzeit (0 ms).`,
      steps: [
        {
          type: 'explain',
          title: 'Was eine USV leistet',
          body: `Eine **USV (Unterbrechungsfreie Stromversorgung, engl. UPS)** überbrückt Stromausfälle mit Akkus und schützt vor Netzstörungen. Ziel: Server und Netzwerk laufen weiter oder werden **kontrolliert heruntergefahren** – ohne Datenverlust und Dateisystemschäden.

**Typische Netzstörungen:** Stromausfall, kurze Spannungseinbrüche, Unter- und Überspannung, Spannungsspitzen (z. B. durch Schaltvorgänge, Blitz), Frequenzschwankungen (z. B. bei Notstromaggregaten), Oberschwingungen.

**USV-Typen nach EN/IEC 62040-3:**

| Typ | Klasse | Funktionsweise | Umschaltzeit | Schützt vor | Einsatz |
|---|---|---|---|---|---|
| **Offline / Standby** | **VFD** (Voltage and Frequency Dependent) | Last hängt normal **direkt am Netz** (gefiltert); bei Ausfall schaltet der Wechselrichter zu | einige ms (typ. 2–10 ms) | Ausfall, Spannungsspitzen (Filter) | Einzel-PCs, Arbeitsplätze |
| **Line-interactive** | **VI** (Voltage Independent) | wie Offline, zusätzlich **Spannungsregelung (AVR)** per Transformator – Unter-/Überspannung wird ohne Akku ausgeglichen | wenige ms | zusätzlich Unter-/Überspannung | kleine Server, Netzwerkschränke |
| **Online / Doppelwandler** | **VFI** (Voltage and Frequency Independent) | Strom wird **ständig** gleichgerichtet und per Wechselrichter neu erzeugt; Akku hängt dazwischen | **keine (0 ms)** | alle Netzstörungen inkl. Frequenz | Server, Rechenzentren, kritische Systeme |

Merkhilfe: **VFD → VI → VFI** = Schutz nimmt zu, Preis und Eigenverbrauch auch (Online-USVs haben durch die doppelte Wandlung mehr Verluste; viele bieten einen „Eco-Modus“).

**Weitere Merkmale:**
- **Ausgangsspannung**: reiner **Sinus** (Online, gute Line-interactive) oder angenäherter Sinus (günstige Offline-USVs) – Netzteile mit aktiver PFC vertragen Sinus am besten.
- **Kommunikation**: USB, seriell oder **Netzwerkkarte (SNMP)** → automatisches Herunterfahren von Servern/VMs.
- **Akkus**: meist Bleiakkus (VRLA), Lebensdauer typisch **3–5 Jahre** (temperaturabhängig) → regelmäßiger Selbsttest und Austausch; Lithium-Ionen hält länger.
- **Bypass**: Bei Wartung oder Überlast wird die Last direkt ans Netz geschaltet.
- **Überspannungsschutz** an Netzwerk-/Telefonleitungen.`,
        },
        {
          type: 'visual',
          title: 'Drei USV-Typen',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Offline (VFD)', text: 'Last direkt am Netz, Umschalten im Fehlerfall. Günstig, kurze Umschaltzeit.', icon: 'BatteryCharging' },
                { title: 'Line-interactive (VI)', text: 'Plus Spannungsregelung (AVR). Gleicht Unter-/Überspannung ohne Akku aus.', icon: 'Gauge' },
                { title: 'Online (VFI)', text: 'Doppelwandler: Ausgang wird ständig neu erzeugt. 0 ms, schützt vor allen Netzstörungen.', icon: 'ShieldCheck' },
              ],
            },
          },
          caption: 'Je kritischer das System, desto höher die Klasse: Arbeitsplatz → VFD, Netzwerkschrank → VI, Server → VFI.',
        },
        {
          type: 'check',
          question: {
            id: 'h04-c07', kind: 'match', skill: 'hw.ups.types', difficulty: 2,
            prompt: `Ordne die USV-Typen ihrer Klassifizierung nach EN/IEC 62040-3 zu.`,
            left: ['Offline/Standby', 'Line-interactive', 'Online/Doppelwandler'],
            right: ['VFD', 'VI', 'VFI'],
            answer: [0, 1, 2],
            explanation: 'Offline = VFD, Line-interactive = VI, Online = VFI.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'h04-c08', kind: 'free', skill: 'hw.ups.types', difficulty: 2,
            prompt: `Erläutere die Funktionsweise einer **Online-USV (VFI)** und nenne einen Vor- und einen Nachteil.`,
            modelAnswer: 'Bei einer Online-USV (Doppelwandler) wird die Netzspannung dauerhaft von einem Gleichrichter in Gleichspannung umgewandelt, die auch die Akkus lädt. Ein Wechselrichter erzeugt daraus ständig eine neue, saubere Sinusspannung für die Verbraucher. Fällt das Netz aus, versorgen die Akkus den Wechselrichter ohne jede Umschaltung. Vorteil: keine Umschaltzeit (0 ms) und Schutz vor allen Netzstörungen inkl. Frequenzschwankungen, da Ausgang unabhängig von Spannung und Frequenz des Netzes ist. Nachteil: höherer Preis und durch die doppelte Wandlung höhere Verluste (Eigenverbrauch, Abwärme).',
            keywords: ['Gleichrichter', 'Wechselrichter', 'dauerhaft', '0 ms', 'Frequenz', 'Verluste', 'teurer'],
            explanation: 'Doppelwandlung = ständig neu erzeugte Spannung.',
          },
        },
        { type: 'practice', title: 'Übung: USV-Typen', questionIds: ['h04-q013', 'h04-q014', 'h04-q015', 'h04-q016'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'USV überbrückt Ausfälle und ermöglicht kontrolliertes Herunterfahren.',
            'Offline = VFD, Line-interactive = VI (AVR), Online = VFI (Doppelwandler, 0 ms).',
            'Kommunikation (USB/SNMP) für automatischen Shutdown; Akkus alle 3–5 Jahre tauschen.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'h04-l06',
      title: 'USV dimensionieren: VA, Watt, Leistungsfaktor und Überbrückungszeit',
      minutes: 25,
      relevance: 'ap1',
      skills: ['hw.ups.sizing'],
      simple: `Bei Wechselstrom gibt es zwei Leistungsangaben. **Watt** (W, Wirkleistung) ist das, was die Geräte wirklich nutzen. **Voltampere** (VA, Scheinleistung) ist das, was Leitung und USV tatsächlich liefern müssen. Stell dir ein Glas Bier vor: Das Bier ist die Wirkleistung, Bier plus Schaum ist die Scheinleistung – das Glas muss für beides groß genug sein. Das Verhältnis heißt **Leistungsfaktor**: cos φ = W ÷ VA. Eine USV hat deshalb **zwei** Grenzen, und beide müssen passen.

**Merke:** S = P ÷ cos φ und P = S · cos φ – immer die W-Grenze **und** die VA-Grenze der USV prüfen.`,
      steps: [
        {
          type: 'explain',
          title: 'VA ist nicht gleich Watt',
          body: `Bei Wechselstrom unterscheidet man:

| Größe | Formelzeichen | Einheit | Bedeutung |
|---|---|---|---|
| **Wirkleistung** | P | **W** | tatsächlich nutzbare Leistung (wird in Wärme/Arbeit umgesetzt) |
| **Scheinleistung** | S | **VA** | Produkt aus Spannung und Strom (U · I) – darauf müssen Leitungen und Wechselrichter ausgelegt sein |
| Blindleistung | Q | var | pendelt zwischen Netz und Verbraucher, belastet die Leitungen |

**Leistungsfaktor:** **cos φ = P / S**  →  **P = S · cos φ**  →  **S = P / cos φ**

USV-Datenblätter nennen oft beide Werte, z. B. „1.500 VA / 900 W“ (cos φ = 0,6) oder „1.500 VA / 1.350 W“ (cos φ = 0,9). Moderne Online-USVs erreichen cos φ = 0,9–1,0. **Beide Grenzen** müssen eingehalten werden.

**Dimensionierung in 4 Schritten:**
1. **Wirkleistung aller Verbraucher addieren** (Datenblatt oder Messung).
2. **Reserve** aufschlagen (z. B. 20–30 %) für Erweiterungen, Lastspitzen und Alterung der Akkus.
3. **Scheinleistung berechnen:** S = P / cos φ → aufrunden und nächstgrößeres Modell wählen.
4. **Überbrückungszeit prüfen:** Reicht sie für das kontrollierte Herunterfahren (z. B. 10–15 min) oder bis zum Start eines Notstromaggregats? Bei Bedarf Zusatzakkus.

**Überbrückungszeit (idealisiert):**

> Akkuenergie in Wh = Spannung · Kapazität (V · Ah) · Anzahl Akkus
> t = (Akkuenergie · η_Wechselrichter) / Last in W  → Stunden (· 60 = Minuten)

In der Praxis ist die Zeit kürzer (bei hoher Last geben Bleiakkus weniger Energie ab, Alterung, Entladeschluss). Verbindlich sind die **Laufzeittabellen des Herstellers** – die Rechnung dient der groben Abschätzung.

**Eine vorhandene USV prüfen** (umgekehrte Richtung): Gegeben sind das USV-Datenblatt, z. B. **1.500 VA / 900 W**, und die Last, z. B. **700 W** bei einem Leistungsfaktor der Geräte von **cos φ = 0,9**.
1. **W-Grenze:** 700 W ÷ 900 W = 0,778 → **77,8 %** ausgelastet.
2. **VA-Grenze:** Scheinleistung der Last S = 700 W ÷ 0,9 = 777,8 VA → 777,8 VA ÷ 1.500 VA → **51,9 %** ausgelastet.
3. **Maßgeblich ist die stärker ausgelastete Grenze** (hier die W-Grenze mit 77,8 %). Liegen beide unter 100 %, reicht die USV. Ob genug **Reserve** bleibt (20–30 %), musst du zusätzlich bewerten.

Bei Geräten mit niedrigem cos φ (z. B. ältere Netzteile ohne PFC) kann umgekehrt zuerst die **VA-Grenze** erreicht sein. Deshalb immer **beide** prüfen.`,
        },
        {
          type: 'example',
          title: 'Beispiel: USV für den Serverschrank in Hamburg',
          problem: `Angeschlossen werden: Server **350 W**, NAS **65 W**, Switch **90 W**, Firewall **35 W**. Reserve **25 %**, cos φ der USV **0,9**. Angebote: USV A 750 VA / 675 W, USV B 1.000 VA / 900 W, USV C 1.500 VA / 1.350 W. Welche USV reicht mindestens? Die gewählte USV hat 2 Akkus à 12 V / 9 Ah, Wechselrichter-η = 90 %. Wie lange überbrückt sie die tatsächliche Last (ohne Reserve) rechnerisch?`,
          steps: [
            { label: 'Summe', body: '350 + 65 + 90 + 35 = **540 W**' },
            { label: 'Reserve', body: '540 W · 1,25 = **675 W**' },
            { label: 'Scheinleistung', body: 'S = 675 W / 0,9 = **750 VA**' },
            { label: 'Auswahl', body: 'USV A (750 VA / 675 W) wäre genau am Limit – keine Luft. **USV B (1.000 VA / 900 W)** ist die sinnvolle Wahl.' },
            { label: 'Akkuenergie', body: '2 · 12 V · 9 Ah = **216 Wh**; nutzbar: 216 · 0,9 = **194,4 Wh**' },
            { label: 'Zeit', body: '194,4 Wh / 540 W = 0,36 h · 60 = **21,6 min** (real eher weniger → Herstellertabelle prüfen; für sauberes Herunterfahren ausreichend)' },
          ],
          result: 'Mindestens 750 VA → USV B (1.000 VA / 900 W); rechnerisch ≈ 21,6 min Überbrückung.',
        },
        {
          type: 'check',
          question: {
            id: 'h04-c09', kind: 'number', skill: 'hw.ups.sizing', difficulty: 2,
            prompt: `Eine USV ist mit **2.200 VA** bei **cos φ = 0,9** angegeben. Welche Wirkleistung in **W** kann sie höchstens abgeben?`,
            answer: 1980, unit: 'W',
            misconceptions: [{ answer: '2200', error: 'usv-va-gleich-w', why: 'VA ≠ W. P = S · cos φ.' }, { answer: '2444.4', error: 'usv-pf-geteilt', why: 'Hier ist S gegeben – multiplizieren: P = S · cos φ.' }],
            explanation: 'P = 2.200 VA · 0,9 = **1.980 W**.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'h04-c10', kind: 'number', skill: 'hw.ups.sizing', difficulty: 2,
            prompt: `Die Verbraucher an einer USV benötigen zusammen **600 W**. Welche Scheinleistung in **VA** braucht die USV mindestens bei **cos φ = 0,6** (ohne Reserve)?`,
            answer: 1000, unit: 'VA',
            misconceptions: [{ answer: '360', error: 'usv-pf-multipliziert', why: 'Mit cos φ multipliziert. Für die Scheinleistung teilen: S = P / cos φ.' }, { answer: '600', error: 'usv-va-gleich-w', why: 'Bei cos φ < 1 ist S größer als P.' }],
            explanation: 'S = 600 W / 0,6 = **1.000 VA**.',
          },
        },
        { type: 'practice', title: 'Übung: USV dimensionieren', generator: 'hw.usv', count: 4, difficulty: 2 },
        { type: 'practice', title: 'Übung: USV prüfen (VA- und W-Grenze)', generator: 'hw.usvcheck', count: 3, difficulty: 2 },
        { type: 'practice', title: 'Übung: USV mit Belegen', questionIds: ['h04-q017', 'h04-q018', 'h04-q019', 'h04-q038', 'h04-q039'], count: 4, difficulty: 3 },
        {
          type: 'summary',
          points: [
            'P (W) = Wirkleistung, S (VA) = Scheinleistung; cos φ = P / S.',
            'S = P / cos φ – Reserve einplanen, aufrunden, nächstes Modell wählen.',
            'W- und VA-Grenze der USV beide einhalten – USV prüfen: Auslastung W = P ÷ W_USV, Auslastung VA = (P ÷ cos φ) ÷ VA_USV; der größere Wert zählt.',
            't ≈ (Wh · η) / W – Herstellertabellen sind verbindlich.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'h04-l07',
      title: 'Green IT und Entsorgung von IT-Geräten',
      minutes: 20,
      relevance: 'ap1',
      skills: ['hw.green.it', 'hw.green.disposal'],
      simple: `**Green IT** heißt: IT so planen und betreiben, dass möglichst wenig Strom und Rohstoffe verbraucht werden – vom Kauf bis zur Entsorgung. Wer Geräte ausschaltet, Server zusammenlegt (Virtualisierung) oder Geräte länger nutzt, spart Geld **und** CO₂ (das Klimagas aus der Stromerzeugung). Wie viel CO₂ eine kWh verursacht, steht als **Emissionsfaktor** in der Aufgabe, weil er sich jedes Jahr ändert. Alte Geräte gehören nicht in den Hausmüll: Wie bei einem Umzug erst ausräumen (Daten sicher löschen, Akkus raus), dann beim Entsorger abgeben.

**Merke:** Einsparung = ΔP · t; CO₂ = kWh · Faktor (g ÷ 1.000 = kg); vor der Entsorgung Daten löschen und Akkus entnehmen.`,
      steps: [
        {
          type: 'explain',
          title: 'IT nachhaltig betreiben – und richtig entsorgen',
          body: `**Green IT** = IT über den ganzen Lebenszyklus ressourcen- und energieschonend planen, betreiben und entsorgen.

**Maßnahmen am Arbeitsplatz:**
- **Energiesparpläne**: Bildschirm nach wenigen Minuten aus, Energiesparmodus/Standby (ACPI **S3** = Suspend to RAM, „Energie sparen“), Ruhezustand (**S4** = Suspend to Disk), Soft-Off (**S5**). Moderne Notebooks nutzen „Modern Standby“ (S0ix).
- Geräte **nach Feierabend ausschalten**, schaltbare Steckdosenleisten; Updates nachts per **Wake-on-LAN**.
- Sparsame Geräte (Mini-PCs, Thin Clients, Notebooks), effiziente Netzteile, Monitore mit gutem Energielabel; Helligkeit anpassen.
- **Drucken reduzieren**: Duplex als Standard, Follow-Me-Printing, digitale Prozesse.
- **Lebensdauer verlängern**: Aufrüsten (RAM, SSD) statt Neukauf, reparaturfreundliche Geräte, **Refurbished**-Geräte, Weitergabe.

**Maßnahmen im Serverraum/Rechenzentrum:**
- **Virtualisierung und Konsolidierung**: viele schwach ausgelastete Server → wenige gut ausgelastete Hosts.
- Effiziente Kühlung: Warm-/Kaltgang-Einhausung, höhere Zulufttemperatur, freie Kühlung; **Abwärmenutzung**.
- Kennzahl **PUE** (Power Usage Effectiveness) = Gesamtenergie des Rechenzentrums / Energie der IT-Geräte. Ideal = 1,0; je näher an 1, desto weniger Energie für Kühlung, USV-Verluste usw. (Das Energieeffizienzgesetz verpflichtet größere Rechenzentren in Deutschland u. a. zu PUE-Zielwerten und Abwärmenutzung.)

**Entsorgung – ElektroG (Umsetzung der EU-WEEE-Richtlinie 2012/19/EU):**
- Elektrogeräte gehören **nicht in den Hausmüll** – Kennzeichen: **durchgestrichene Mülltonne**.
- **Rückgabe** für private Haushalte kostenlos bei kommunalen Sammelstellen (Wertstoffhof) und beim Handel: Händler mit mind. **400 m²** Verkaufsfläche für Elektrogeräte (online: Lager-/Versandfläche) sowie Lebensmittelhändler ab 800 m², die regelmäßig Elektrogeräte anbieten, müssen zurücknehmen – **1:1** beim Kauf eines gleichartigen Neugeräts, **0:1** Kleingeräte (keine Kante > 25 cm, bis 3 Stück je Geräteart) auch ohne Kauf.
- **Gewerbliche Geräte (B2B)**: Rücknahme über den Hersteller bzw. zertifizierte **Entsorgungsfachbetriebe** mit Nachweis.
- **Vor der Abgabe**: **Batterien/Akkus entnehmen** (soweit ohne Zerstörung möglich, getrennt zurückgeben) und **personenbezogene Daten löschen** – das verlangt das ElektroG vom Besitzer; die DSGVO (Art. 32) fordert zusätzlich geeignete technische Maßnahmen. Sicher löschen (Secure Erase/Sanitize, Überschreiben bei HDDs) oder Datenträger nach **DIN 66399** vernichten lassen; **Löschprotokoll/Vernichtungsnachweis** dokumentieren.
- Hersteller müssen sich bei der **Stiftung EAR** registrieren (WEEE-Reg.-Nr.).`,
        },
        {
          type: 'visual',
          title: 'Lebenszyklus eines IT-Geräts',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['Beschaffung', 'Betrieb', 'Weiterverwendung', 'Entsorgung'],
              messages: [
                { from: 0, to: 0, label: 'Effizienz, Labels, Reparierbarkeit prüfen', note: 'TCO, Blauer Engel, Energielabel' },
                { from: 0, to: 1, label: 'Inbetriebnahme mit Energiesparplan' },
                { from: 1, to: 1, label: 'Aufrüsten statt ersetzen, Standby vermeiden' },
                { from: 1, to: 2, label: 'Daten sicher löschen, Weitergabe/Refurbishing' },
                { from: 2, to: 3, label: 'Akkus entnehmen, zertifizierter Entsorger, Nachweis', note: 'ElektroG/WEEE' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Beispiel: Einsparung durch Virtualisierung',
          problem: `Im Serverraum laufen **8 alte Server** mit je **250 W** rund um die Uhr. Sie sollen durch **2 Virtualisierungshosts** mit je **400 W** ersetzt werden. Strompreis **30 ct/kWh**. Wie viel Energie und Geld spart das pro Jahr (ohne Kühlung)?`,
          steps: [
            { label: 'Alt', body: '8 · 250 W = **2.000 W**' },
            { label: 'Neu', body: '2 · 400 W = **800 W**' },
            { label: 'Differenz', body: '2.000 W − 800 W = **1.200 W**' },
            { label: 'Energie', body: '1.200 W · 8.760 h = 10.512.000 Wh = **10.512 kWh**' },
            { label: 'Kosten', body: '10.512 kWh · 0,30 €/kWh = **3.153,60 €** pro Jahr – zusätzlich sinkt der Kühlbedarf.' },
          ],
          result: '10.512 kWh bzw. 3.153,60 € pro Jahr',
        },
        {
          type: 'check',
          question: {
            id: 'h04-c11', kind: 'number', skill: 'hw.green.it', difficulty: 2,
            prompt: `Ein Rechenzentrum verbraucht insgesamt **400 kW**, davon entfallen **250 kW** auf die IT-Geräte. Wie hoch ist der **PUE**-Wert? (zwei Nachkommastellen)`,
            answer: 1.6, tolerance: 0.005, unit: '',
            misconceptions: [{ answer: '0.63', error: 'pue-kehrwert', why: 'Kehrwert gebildet: PUE = Gesamtenergie / IT-Energie (≥ 1).' }],
            explanation: 'PUE = 400 kW / 250 kW = **1,60** – für jedes kW IT werden 0,6 kW zusätzlich (v. a. Kühlung) benötigt.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'h04-c12', kind: 'free', skill: 'hw.green.disposal', difficulty: 2,
            prompt: `Die Elektro Krämer GmbH sondert 30 alte PCs und 10 Notebooks aus. Beschreibe die notwendigen Schritte bis zur ordnungsgemäßen Entsorgung.`,
            modelAnswer: '1. Inventar austragen und prüfen, ob Geräte weiterverwendet/gespendet/refurbished werden können. 2. Personenbezogene und betriebliche Daten sicher löschen (Secure Erase/Sanitize bei SSDs, Überschreiben bei HDDs) oder Datenträger ausbauen und nach DIN 66399 vernichten lassen; Lösch-/Vernichtungsprotokoll erstellen (DSGVO, ElektroG). 3. Akkus/Batterien entnehmen, soweit zerstörungsfrei möglich, und getrennt zurückgeben. 4. Geräte als gewerbliche Altgeräte an einen zertifizierten Entsorgungsfachbetrieb bzw. die Rücknahme des Herstellers übergeben – nicht in den Restmüll (durchgestrichene Mülltonne, ElektroG/WEEE). 5. Entsorgungsnachweis aufbewahren und Lizenzen/Accounts (z. B. MDM, Garantie) bereinigen.',
            keywords: ['Daten löschen', 'DIN 66399', 'Protokoll', 'Akkus entnehmen', 'Entsorgungsfachbetrieb', 'ElektroG', 'Nachweis'],
            explanation: 'Weiterverwendung prüfen → Daten löschen → Akkus → zertifizierte Entsorgung → Nachweis.',
          },
        },
        {
          type: 'explain',
          title: 'Einsparung in Zahlen: kWh, Euro und CO₂',
          body: `Bei einer Energieberatung rechnest du meist drei Zahlen aus:

| Größe | Formel | Einheit |
|---|---|---|
| Eingesparte Energie | ΔE = ΔP · t (ΔP = alte Leistung − neue Leistung) | Wh → ÷ 1.000 → kWh |
| Eingesparte Kosten | ΔE · Strompreis | € |
| Eingespartes CO₂ | ΔE · **Emissionsfaktor** | g → ÷ 1.000 → kg → ÷ 1.000 → t |

**Emissionsfaktor:** So viel Gramm CO₂ entstehen im Mittel bei der Erzeugung einer Kilowattstunde Strom. Der Wert hängt vom Strommix ab (Kohle, Gas, Wind, Sonne) und **ändert sich jedes Jahr**. In Aufgaben steht er deshalb immer dabei, z. B. „angenommen 400 g CO₂/kWh“. Rechne mit genau diesem Wert.

**Zweistufige Maßnahmen – typische Falle:** Erst wird die Hardware getauscht (weniger Leistung), dann läuft die **neue** Hardware zusätzlich kürzer. Die zweite Einsparung rechnest du mit der **neuen** Leistung. Wer hier die alte Leistung nimmt, zählt einen Teil der Einsparung doppelt.

**PUE** (siehe oben) hilft beim Rechenzentrum: Bei PUE 1,5 kostet jede kWh IT-Energie insgesamt 1,5 kWh – spart die IT eine kWh, sinken auch Kühlung und Verluste mit.`,
        },
        {
          type: 'example',
          title: 'Beispiel: CO₂-Einsparung einer Testumgebung',
          problem: `Eine Testumgebung nimmt **2.000 W** auf und läuft 24/7 (8.760 h). (1) Neue Hardware braucht nur **900 W**. (2) Zusätzlich läuft die neue Umgebung nur noch **Mo–Fr je 10 h** (52 Wochen), sonst ist sie aus. Strompreis 30 ct/kWh, Emissionsfaktor **angenommen 400 g CO₂/kWh**. Wie viel Energie, Geld und CO₂ sparen beide Maßnahmen zusammen pro Jahr?`,
          steps: [
            { label: 'Maßnahme 1', body: 'ΔP = 2.000 W − 900 W = 1.100 W; 1.100 W · 8.760 h = 9.636.000 Wh = **9.636 kWh**' },
            { label: 'Laufzeit neu', body: '5 · 10 h · 52 = **2.600 h** Betrieb → ausgeschaltet: 8.760 h − 2.600 h = **6.160 h**' },
            { label: 'Maßnahme 2', body: 'Mit der **neuen** Leistung: 900 W · 6.160 h = 5.544.000 Wh = **5.544 kWh**' },
            { label: 'Summe Energie', body: '9.636 kWh + 5.544 kWh = **15.180 kWh**' },
            { label: 'Kosten', body: '15.180 kWh · 0,30 €/kWh = **4.554,00 €**' },
            { label: 'CO₂', body: '15.180 kWh · 400 g/kWh = 6.072.000 g = **6.072 kg ≈ 6,07 t CO₂**' },
          ],
          result: '15.180 kWh, 4.554 € und rund 6,07 t CO₂ pro Jahr. Häufiger Fehler: Maßnahme 2 mit 2.000 W rechnen.',
        },
        { type: 'practice', title: 'Übung: Einsparung und CO₂', generator: 'hw.co2', count: 3, difficulty: 2 },
        { type: 'practice', title: 'Übung: Green IT und Entsorgung', questionIds: ['h04-q021', 'h04-q022', 'h04-q023', 'h04-q024', 'h04-q025', 'h04-q040', 'h04-q041'], count: 5, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Energiesparpläne (S3/S4), Ausschalten, sparsame Geräte, Duplexdruck, längere Nutzung.',
            'Virtualisierung/Konsolidierung; PUE = Gesamtenergie / IT-Energie.',
            'CO₂ = eingesparte kWh · Emissionsfaktor aus der Aufgabe (g → kg ÷ 1.000); bei zwei Maßnahmen die zweite mit der neuen Leistung rechnen.',
            'ElektroG/WEEE: nicht in den Hausmüll; Rücknahme 1:1 / 0:1 im Handel; B2B über Entsorgungsfachbetrieb.',
            'Vor der Abgabe: Akkus entnehmen, Daten sicher löschen, Nachweis dokumentieren.',
          ],
        },
      ],
    },
  ],
  /* ==================================================================== */
  questions: [
    {
      id: 'h04-q001', kind: 'table', skill: 'hw.energy.power', difficulty: 1,
      prompt: `Ergänze die fehlenden Werte (P = U · I, cos φ = 1).`,
      columns: [{ key: 'u', label: 'U (V)', type: 'number' }, { key: 'i', label: 'I (A)', type: 'number' }, { key: 'p', label: 'P (W)', type: 'number' }],
      rows: [
        { label: 'Router-Netzteil', cells: { u: { given: '12' }, i: { given: '2' }, p: { answer: '24' } } },
        { label: 'Notebook-Netzteil', cells: { u: { given: '20' }, i: { answer: '4.5', accept: ['4,5'] }, p: { given: '90' } } },
        { label: 'Server am Netz', cells: { u: { given: '230' }, i: { answer: '2' }, p: { given: '460' } } },
        { label: 'USB-Port', cells: { u: { answer: '5' }, i: { given: '0,9' }, p: { given: '4,5' } } },
      ],
      explanation: '12 · 2 = 24 W; 90 / 20 = 4,5 A; 460 / 230 = 2 A; 4,5 / 0,9 = 5 V.',
    },
    {
      id: 'h04-q002', kind: 'number', skill: 'hw.energy.power', difficulty: 2,
      prompt: `Wie viele Schulungs-PCs mit je **450 W** Spitzenleistung dürfen höchstens gleichzeitig an einem **16-A-Stromkreis** (230 V) betrieben werden?`,
      answer: 8, unit: 'PCs',
      misconceptions: [{ answer: '9', error: 'runden-falsch', why: '3.680 / 450 = 8,18 – hier muss abgerundet werden.' }],
      explanation: '230 V · 16 A = 3.680 W; 3.680 / 450 = 8,18 → **8 PCs**.',
    },
    {
      id: 'h04-q003', kind: 'number', skill: 'hw.energy.power', difficulty: 2,
      prompt: `Durch einen Widerstand von **46 Ω** fließt bei **230 V** welcher Strom in **A**?`,
      answer: 5, unit: 'A',
      misconceptions: [{ answer: '10580', error: 'ohm-formel', why: 'I = U / R – nicht multiplizieren.' }],
      explanation: 'I = U / R = 230 V / 46 Ω = **5 A**.',
    },
    {
      id: 'h04-q004', kind: 'number', skill: 'hw.energy.cost', difficulty: 2,
      prompt: `Ein Multifunktionsdrucker steht ganzjährig im **Bereitschaftsmodus mit 9 W**. Strompreis **35 ct/kWh**. Wie hoch sind die jährlichen Kosten **allein für die Bereitschaft** in **€**, wenn man die Druckzeiten vernachlässigt? (auf Cent)`,
      answer: 27.59, tolerance: 0.01, unit: '€',
      misconceptions: [{ answer: '27594', error: 'energie-wh-kwh', why: 'Wh nicht in kWh umgerechnet.' }],
      explanation: '9 W · 8.760 h = 78.840 Wh = 78,84 kWh · 0,35 € = **27,59 €**.',
    },
    {
      id: 'h04-q005', kind: 'table', skill: 'hw.energy.cost', difficulty: 2,
      prompt: `Datenblatt-Auszug zweier Monitore (Betrieb 220 Tage · 8 h = 1.760 h; übrige 7.000 h im Standby). Strompreis 30 ct/kWh. Berechne die Energie pro Jahr (kWh, eine Nachkommastelle) und die Kosten (€, auf Cent).\n\n| | Monitor A | Monitor B |\n|---|---|---|\n| Leistung Betrieb | 28 W | 18 W |\n| Standby | 0,5 W | 0,3 W |`,
      columns: [{ key: 'kwh', label: 'Energie (kWh)', type: 'number' }, { key: 'eur', label: 'Kosten (€)', type: 'number' }],
      rows: [
        { label: 'Monitor A', cells: { kwh: { answer: '52.8', accept: ['52,8', '52.78', '52,78'] }, eur: { answer: '15.83', accept: ['15,83', '15.84', '15,84'] } } },
        { label: 'Monitor B', cells: { kwh: { answer: '33.8', accept: ['33,8', '33.78', '33,78'] }, eur: { answer: '10.13', accept: ['10,13', '10.14', '10,14'] } } },
      ],
      misconceptions: [{ cell: 'kwh', answer: '49.3', error: 'energie-standby-vergessen', why: 'Standby fehlt (49,28 kWh nur Betrieb bei A).' }],
      explanation: 'A: 28 · 1.760 = 49.280 Wh + 0,5 · 7.000 = 3.500 Wh → 52,78 kWh · 0,30 = 15,83 €. B: 18 · 1.760 = 31.680 Wh + 0,3 · 7.000 = 2.100 Wh → 33,78 kWh · 0,30 = 10,13 €.',
    },
    {
      id: 'h04-q006', kind: 'number', skill: 'hw.energy.cost', difficulty: 3,
      prompt: `20 Arbeitsplatz-PCs bleiben nachts und am Wochenende im **Standby mit je 3 W**. Pro Jahr sind das an **220 Arbeitstagen je 16 Stunden** und an **145 freien Tagen je 24 Stunden** Standby. Strompreis **30 ct/kWh**. Wie viel Euro kostet der Standby pro Jahr für alle PCs?`,
      answer: 126, tolerance: 0.01, unit: '€',
      misconceptions: [{ answer: '6.3', error: 'energie-anzahl-vergessen', why: 'Das ist ein PC. Es sind 20 PCs.' }],
      explanation: 'Standbystunden: 220 · 16 + 145 · 24 = 3.520 + 3.480 = 7.000 h. Energie: 20 · 3 W · 7.000 h = 420.000 Wh = 420 kWh · 0,30 € = **126,00 €**.',
    },
    {
      id: 'h04-q007', kind: 'free', skill: 'hw.energy.cost', difficulty: 2,
      prompt: `Bei einer Stromkostenberechnung kommt ein Azubi für einen 45-W-Switch auf **118.260 €** pro Jahr. Erkläre den Fehler und die richtige Rechnung (30 ct/kWh).`,
      modelAnswer: 'Der Azubi hat die Energie in Wattstunden mit dem Preis pro Kilowattstunde multipliziert: 45 W · 8.760 h = 394.200 Wh – ohne Umrechnung in kWh. Richtig: 394.200 Wh / 1.000 = 394,2 kWh; 394,2 kWh · 0,30 €/kWh = 118,26 €. Das Ergebnis war also um den Faktor 1.000 zu groß. Plausibilitätskontrolle: Ein kleines Netzwerkgerät kostet im Jahr typischerweise zweistellige bis niedrige dreistellige Eurobeträge.',
      keywords: ['Wh', 'kWh', '1.000', '394,2 kWh', '118,26 €', 'Plausibilität'],
      explanation: 'Wh → kWh vergessen.',
    },
    {
      id: 'h04-q008', kind: 'number', skill: 'hw.energy.efficiency', difficulty: 2,
      prompt: `Ein Netzteil versorgt Komponenten mit **400 W**; Wirkungsgrad **90 %**. Wie groß ist die **Verlustleistung** in W? (zwei Nachkommastellen)`,
      answer: 44.44, tolerance: 0.01, unit: 'W',
      misconceptions: [{ answer: '40', error: 'wirkungsgrad-prozent-aufschlag', why: '10 % von 400 W sind nicht die Verluste: P_zu = 400 / 0,9 = 444,44 W, Verlust = 44,44 W.' }, { answer: '444.44', error: 'wirkungsgrad-verlust', why: 'Das ist die aufgenommene Leistung, nicht der Verlust.' }],
      explanation: 'P_zu = 400 / 0,9 = 444,44 W; P_V = 444,44 − 400 = **44,44 W**.',
    },
    {
      id: 'h04-q009', kind: 'free', skill: 'hw.energy.efficiency', difficulty: 2,
      prompt: `Ein Kollege möchte für einen Büro-PC (Leistungsaufnahme meist 40–80 W) ein **1.000-W-Netzteil** mit 80 PLUS Gold einbauen, „damit genug Reserve da ist“. Nimm Stellung.`,
      modelAnswer: 'Das ist nicht sinnvoll. Der Wirkungsgrad eines Netzteils hängt von der Auslastung ab; das Optimum liegt meist bei etwa 50 % Last, die 80-PLUS-Werte gelten erst ab 20 % (bzw. 10 % bei Titanium). Bei 40–80 W läuft ein 1.000-W-Netzteil mit nur 4–8 % Last – dort ist der Wirkungsgrad deutlich schlechter, es entstehen mehr Verluste und Stromkosten. Zudem ist es teurer und größer. Besser: Bedarf berechnen, 20–30 % Reserve aufschlagen und ein passend dimensioniertes Netzteil (z. B. 300–400 W bzw. das vom Hersteller vorgesehene) mit hoher Effizienz wählen.',
      keywords: ['Auslastung', '50 %', 'Teillast', 'Wirkungsgrad', 'Verluste', 'passend dimensionieren'],
      explanation: 'Überdimensionierung → schlechter Wirkungsgrad im Teillastbereich.',
    },
    {
      id: 'h04-q010', kind: 'match', skill: 'hw.energy.labels', difficulty: 1,
      prompt: `Ordne die Zeichen ihrer Aussage zu.`,
      left: ['EU-Energielabel', 'TCO Certified', 'Blauer Engel', 'CE', '80 PLUS'],
      right: ['Pflichtangabe der Effizienzklasse (A–G) bei Displays', 'Nachhaltigkeit inkl. sozialer Kriterien in der Produktion', 'Umweltzeichen der deutschen Bundesregierung', 'Konformitätserklärung des Herstellers', 'Wirkungsgrad von Netzteilen'],
      answer: [0, 1, 2, 3, 4],
      explanation: 'Siehe Lektion „Energielabels, Umwelt- und Prüfzeichen“.',
    },
    {
      id: 'h04-q011', kind: 'single', skill: 'hw.energy.labels', difficulty: 2,
      prompt: `Die Elektro Krämer GmbH will bei der Monitorbeschaffung auch **faire Arbeitsbedingungen in der Lieferkette** und **Ergonomie** berücksichtigen. Auf welches Zeichen achtest du?`,
      options: ['CE', 'TCO Certified', '80 PLUS', 'GS'],
      answer: 1,
      distractors: {
        '0': { why: 'CE ist nur eine Konformitätserklärung des Herstellers.', error: 'label-verwechselt' },
        '2': { why: '80 PLUS bewertet nur Netzteil-Wirkungsgrade.', error: 'label-verwechselt' },
        '3': { why: 'GS betrifft die Produktsicherheit.', error: 'label-verwechselt' },
      },
      explanation: 'TCO Certified enthält soziale Kriterien (Lieferkette), Ergonomie, Schadstoffe, Energie und Langlebigkeit.',
    },
    {
      id: 'h04-q012', kind: 'number', skill: 'hw.energy.labels', difficulty: 2,
      prompt: `Auf dem EU-Energielabel eines Monitors steht **24 kWh/1000h**. Wie viele kWh verbraucht er bei **1.800 Betriebsstunden** pro Jahr? (eine Nachkommastelle)`,
      answer: 43.2, tolerance: 0.05, unit: 'kWh',
      misconceptions: [{ answer: '43200', error: 'energie-wh-kwh', why: 'Die Angabe ist bereits in kWh pro 1.000 h – nicht mit 1.000 multiplizieren.' }],
      explanation: '24 kWh / 1.000 h · 1.800 h = **43,2 kWh** (entspricht 24 W mittlerer Leistung).',
    },
    {
      id: 'h04-q013', kind: 'table', skill: 'hw.ups.types', difficulty: 2,
      prompt: `Vervollständige die Tabelle der USV-Typen.`,
      columns: [{ key: 'kl', label: 'Klasse (VFD/VI/VFI)', type: 'text' }, { key: 'u', label: 'Umschaltzeit (0 ms / > 0 ms)', type: 'text' }],
      rows: [
        { label: 'Offline/Standby', cells: { kl: { answer: 'VFD' }, u: { answer: '> 0 ms', accept: ['>0 ms', '>0', 'größer 0', 'ja', 'einige ms', 'mehrere ms'] } } },
        { label: 'Line-interactive', cells: { kl: { answer: 'VI' }, u: { answer: '> 0 ms', accept: ['>0 ms', '>0', 'größer 0', 'ja', 'einige ms', 'wenige ms'] } } },
        { label: 'Online (Doppelwandler)', cells: { kl: { answer: 'VFI' }, u: { answer: '0 ms', accept: ['0', 'keine', '0ms'] } } },
      ],
      explanation: 'Offline (VFD) und Line-interactive (VI) schalten um (wenige ms); Online (VFI) versorgt dauerhaft über den Wechselrichter (0 ms).',
    },
    {
      id: 'h04-q014', kind: 'single', skill: 'hw.ups.types', difficulty: 2,
      prompt: `Am Standort Berlin schwankt die Netzspannung häufig (Unterspannung), echte Ausfälle sind selten. Für den Netzwerkschrank soll eine kostengünstige USV gewählt werden, die Spannungsschwankungen **ohne Akkubetrieb** ausgleicht. Welcher Typ passt?`,
      options: ['Offline/Standby (VFD)', 'Line-interactive (VI)', 'Keine USV, nur eine Steckdosenleiste', 'Notstromaggregat ohne USV'],
      answer: 1,
      distractors: {
        '0': { why: 'Eine Offline-USV schaltet bei Unterspannung auf Akku um – häufige Schwankungen belasten die Akkus.', error: 'usv-typ-auswahl' },
        '2': { why: 'Eine Steckdosenleiste gleicht keine Spannungsschwankungen aus.', error: 'usv-typ-auswahl' },
        '3': { why: 'Ein Aggregat braucht Startzeit und gleicht Schwankungen nicht unterbrechungsfrei aus.', error: 'usv-typ-auswahl' },
      },
      explanation: 'Line-interactive regelt die Spannung per AVR, ohne die Akkus zu nutzen – günstiger als Online.',
    },
    {
      id: 'h04-q015', kind: 'multi', skill: 'hw.ups.types', difficulty: 2,
      prompt: `Welche Funktionen/Eigenschaften sind für eine **Server-USV** wichtig?`,
      options: ['Kommunikation per Netzwerkkarte/USB für automatisches Herunterfahren', 'Reine Sinus-Ausgangsspannung', 'Regelmäßiger Akku-Selbsttest und planbarer Akkutausch', 'Möglichst lange Umschaltzeit', 'Bypass für Wartung'],
      answer: [0, 1, 2, 4],
      explanation: 'Kommunikation, Sinus, Akkumanagement und Bypass sind wichtig. Umschaltzeiten sollen möglichst kurz (ideal 0 ms) sein.',
    },
    {
      id: 'h04-q016', kind: 'order', skill: 'hw.ups.types', difficulty: 2,
      prompt: `Ein Stromausfall tritt ein. Bringe die Abläufe bei einem Server mit Online-USV und Shutdown-Software in die richtige Reihenfolge.`,
      items: ['Netz fällt aus – der Wechselrichter wird ohne Unterbrechung aus den Akkus gespeist', 'USV meldet „Batteriebetrieb“ per SNMP/USB an die Shutdown-Software', 'Nach eingestellter Zeit bzw. Restkapazität startet das kontrollierte Herunterfahren der VMs und des Servers', 'Server ist ausgeschaltet, die USV schaltet ihren Ausgang ab', 'Netz kehrt zurück, Akkus werden geladen, Server startet (ggf. automatisch) neu'],
      explanation: 'Überbrücken → Melden → Herunterfahren → Abschalten → Wiederanlauf.',
    },
    {
      id: 'h04-q017', kind: 'number', skill: 'hw.ups.sizing', difficulty: 3,
      prompt: `Für einen Serverschrank werden benötigt: 2 Server à **320 W**, 1 Switch **75 W**, 1 Firewall **45 W**. Reserve **30 %**, cos φ der USV **0,8**. Welche Scheinleistung in **VA** ist mindestens erforderlich?`,
      answer: 1235, unit: 'VA',
      misconceptions: [{ answer: '950', error: 'usv-reserve-vergessen', why: 'Reserve fehlt: 760 W / 0,8 = 950 VA ohne Reserve.' }, { answer: '988', error: 'usv-va-gleich-w', why: 'Das ist die Wirkleistung mit Reserve (W). Noch durch cos φ teilen.' }],
      explanation: 'Summe: 2 · 320 + 75 + 45 = 760 W; mit Reserve: 760 · 1,3 = 988 W; S = 988 / 0,8 = **1.235 VA** → z. B. 1.500-VA-Modell.',
    },
    {
      id: 'h04-q018', kind: 'table', skill: 'hw.ups.sizing', difficulty: 3,
      prompt: `Benötigt werden **1.000 W Wirkleistung** (inkl. Reserve). Prüfe die angebotenen USVs: Reicht sie (ja/nein)?\n\n| Modell | Scheinleistung | Wirkleistung |\n|---|---|---|\n| USV 1 | 1.500 VA | 900 W |\n| USV 2 | 1.500 VA | 1.350 W |\n| USV 3 | 1.200 VA | 1.080 W |\n| USV 4 | 2.000 VA | 1.200 W |`,
      columns: [{ key: 'ok', label: 'reicht (ja/nein)', type: 'text' }],
      rows: [
        { label: 'USV 1', cells: { ok: { answer: 'nein' } } },
        { label: 'USV 2', cells: { ok: { answer: 'ja' } } },
        { label: 'USV 3', cells: { ok: { answer: 'ja' } } },
        { label: 'USV 4', cells: { ok: { answer: 'ja' } } },
      ],
      explanation: 'Entscheidend ist hier die **Wirkleistung** (W): USV 1 liefert trotz 1.500 VA nur 900 W < 1.000 W → reicht nicht. USV 2, 3 und 4 liefern ≥ 1.000 W. (Wenn auch die Scheinleistung der Last bekannt ist, muss diese zusätzlich passen.)',
    },
    {
      id: 'h04-q019', kind: 'number', skill: 'hw.ups.sizing', difficulty: 3,
      prompt: `Eine USV hat **4 Akkus à 12 V / 7 Ah**, Wechselrichter-Wirkungsgrad **90 %**. Last: **250 W**. Wie viele **Minuten** reicht die Energie rechnerisch (idealisiert)? (auf ganze Minuten runden)`,
      answer: 73, tolerance: 1, unit: 'min',
      misconceptions: [{ answer: '81', error: 'usv-wirkungsgrad-vergessen', why: 'Wirkungsgrad vergessen: 336 Wh · 0,9.' }, { answer: '18', error: 'usv-akkuanzahl', why: 'Nur ein Akku gerechnet – es sind 4.' }],
      explanation: '4 · 12 V · 7 Ah = 336 Wh; · 0,9 = 302,4 Wh; / 250 W = 1,2096 h · 60 ≈ **73 min** (real weniger – Herstellertabelle!).',
    },
    {
      id: 'h04-q020', kind: 'free', skill: 'hw.ups.sizing', difficulty: 2,
      prompt: `Erkläre einem Kollegen den Unterschied zwischen den Angaben **„VA“** und **„W“** im Datenblatt einer USV und warum beide wichtig sind.`,
      modelAnswer: 'VA (Voltampere) ist die Scheinleistung S = U · I, also das, was Wechselrichter und Leitungen an Strom liefern bzw. führen müssen. W (Watt) ist die Wirkleistung P, die tatsächlich in den Geräten umgesetzt wird. Sie hängen über den Leistungsfaktor zusammen: P = S · cos φ. Bei cos φ < 1 ist die Wirkleistung kleiner als die Scheinleistung (z. B. 1.500 VA bei cos φ 0,6 = 900 W). Die angeschlossene Last darf weder die VA- noch die W-Grenze der USV überschreiten; deshalb muss man beide Werte prüfen, sonst ist die USV überlastet und schaltet ab bzw. auf Bypass.',
      keywords: ['Scheinleistung', 'Wirkleistung', 'cos φ', 'P = S · cos φ', 'beide Grenzen', 'Überlast'],
      explanation: 'S (VA) ≥ P (W); P = S · cos φ.',
    },
    {
      id: 'h04-q021', kind: 'multi', skill: 'hw.green.it', difficulty: 1,
      prompt: `Welche Maßnahmen senken den Energieverbrauch an Büroarbeitsplätzen?`,
      options: ['Energiesparplan: Bildschirm nach 5 Minuten aus, Standby nach 15 Minuten', 'Bildschirmschoner mit 3D-Animation', 'Geräte nach Feierabend ausschalten bzw. schaltbare Steckdosenleiste', 'Duplexdruck als Standard', 'Ältere Desktop-PCs durch Mini-PCs oder Thin Clients ersetzen'],
      answer: [0, 2, 3, 4],
      explanation: 'Bildschirmschoner sparen keinen Strom (sie halten Bildschirm und GPU aktiv). Alle anderen Maßnahmen senken den Verbrauch.',
    },
    {
      id: 'h04-q022', kind: 'match', skill: 'hw.green.it', difficulty: 2,
      prompt: `Ordne die ACPI-Zustände ihrer Bedeutung zu.`,
      left: ['S0', 'S3', 'S4', 'S5'],
      right: ['Arbeitszustand (Betrieb)', 'Suspend to RAM (Energie sparen/Standby)', 'Suspend to Disk (Ruhezustand)', 'Soft Off (heruntergefahren, Netzteil in Bereitschaft)'],
      answer: [0, 1, 2, 3],
      explanation: 'S3: RAM bleibt versorgt – schnelles Aufwachen. S4: RAM-Inhalt auf Datenträger, Gerät fast aus. S5: aus, aber z. B. Wake-on-LAN möglich.',
    },
    {
      id: 'h04-q023', kind: 'number', skill: 'hw.green.it', difficulty: 3,
      prompt: `**10 alte Server** mit je **220 W** laufen 24/7. Sie werden auf **2 Hosts** mit je **450 W** virtualisiert. Strompreis **32 ct/kWh**. Wie viel Euro spart das pro Jahr (ohne Kühlung)? (auf Cent)`,
      answer: 3644.16, tolerance: 0.01, unit: '€',
      misconceptions: [{ answer: '6167.04', error: 'energie-differenz', why: 'Das sind die Kosten der alten Server. Gefragt ist die Ersparnis (alt − neu).' }],
      explanation: 'Alt: 10 · 220 = 2.200 W; neu: 2 · 450 = 900 W; Differenz 1.300 W · 8.760 h = 11.388 kWh · 0,32 € = **3.644,16 €**.',
    },
    {
      id: 'h04-q024', kind: 'single', skill: 'hw.green.disposal', difficulty: 1,
      prompt: `Was bedeutet das Symbol einer **durchgestrichenen Mülltonne** auf einem Notebook?`,
      options: ['Das Gerät ist aus recyceltem Material.', 'Das Gerät darf nicht über den Hausmüll entsorgt werden, sondern muss getrennt gesammelt werden (ElektroG/WEEE).', 'Das Gerät ist besonders energiesparend.', 'Das Gerät enthält keine Schadstoffe.'],
      answer: 1,
      distractors: {
        '0': { why: 'Recyclinganteile werden anders gekennzeichnet.', error: 'entsorgung-symbol' },
        '2': { why: 'Energieeffizienz zeigen Energielabels.', error: 'entsorgung-symbol' },
        '3': { why: 'Im Gegenteil – Elektrogeräte enthalten Schad- und Wertstoffe, deshalb die getrennte Sammlung.', error: 'entsorgung-symbol' },
      },
      explanation: 'Getrennte Sammlung nach ElektroG (Umsetzung der WEEE-Richtlinie).',
    },
    {
      id: 'h04-q025', kind: 'free', skill: 'hw.green.disposal', difficulty: 2,
      prompt: `Eine Privatkundin fragt im IT-Fachgeschäft (Verkaufsfläche für Elektrogeräte: 600 m²), ob sie ihren alten **USB-Stick und ihre alte Maus** abgeben kann, ohne etwas zu kaufen. Antworte mit Begründung.`,
      modelAnswer: 'Ja. Händler mit mindestens 400 m² Verkaufsfläche für Elektro- und Elektronikgeräte müssen nach dem ElektroG Altgeräte zurücknehmen. Kleingeräte, bei denen keine äußere Abmessung größer als 25 cm ist, müssen sie unentgeltlich auch ohne Neukauf annehmen (0:1-Rücknahme, bis zu drei Geräte je Geräteart). USB-Stick und Maus fallen darunter. Hinweis: Daten auf dem USB-Stick vorher selbst sicher löschen, Batterien aus der Maus entnehmen.',
      keywords: ['ElektroG', '400 m²', '0:1', '25 cm', 'unentgeltlich', 'Daten löschen', 'Batterien'],
      explanation: '0:1-Rücknahme für Kleingeräte ≤ 25 cm bei Händlern ab 400 m².',
    },
    {
      id: 'h04-q026', kind: 'text', skill: 'hw.green.disposal', difficulty: 2,
      prompt: `Nach welcher **DIN-Norm** werden Datenträger datenschutzgerecht vernichtet (Sicherheitsstufen)? (Form „DIN …“)`,
      accept: ['DIN 66399', 'DIN66399', '66399'],
      explanation: '**DIN 66399** – Vernichtung von Datenträgern mit Schutzklassen und Sicherheitsstufen.',
    },
    {
      id: 'h04-q027', kind: 'number', skill: 'hw.energy.efficiency', difficulty: 3,
      prompt: `Ein Server benötigt dauerhaft **300 W** (DC-Seite). Das alte Netzteil hat **82 %** Wirkungsgrad, das neue **94 %**. Wie viele **kWh** spart der Tausch pro Jahr (8.760 h)? (eine Nachkommastelle; Zwischenergebnisse nicht runden)`,
      answer: 409.1, tolerance: 0.2, unit: 'kWh',
      misconceptions: [{ answer: '315.4', error: 'wirkungsgrad-prozent-aufschlag', why: 'Die Wirkungsgraddifferenz (12 Prozentpunkte) darf man nicht einfach auf 300 W anwenden. P_zu = P_ab / η für beide Netzteile berechnen.' }],
      explanation: '300 / 0,82 = 365,854 W; 300 / 0,94 = 319,149 W; Differenz 46,705 W · 8.760 h = 409.136 Wh ≈ **409,1 kWh**.',
    },
    {
      id: 'h04-q028', kind: 'single', skill: 'hw.energy.efficiency', difficulty: 1,
      prompt: `Welche Aussage zum Wirkungsgrad η ist richtig?`,
      options: ['η kann über 100 % liegen.', 'η = abgegebene / aufgenommene Leistung; η liegt immer unter 100 %.', 'η = aufgenommene / abgegebene Leistung.', 'η hängt nicht von der Auslastung ab.'],
      answer: 1,
      distractors: {
        '0': { why: 'Dann würde Energie aus dem Nichts entstehen – unmöglich.', error: 'wirkungsgrad-kehrwert' },
        '2': { why: 'Das ist der Kehrwert (≥ 1).', error: 'wirkungsgrad-kehrwert' },
        '3': { why: 'Netzteile haben bei unterschiedlicher Last unterschiedliche Wirkungsgrade.', error: 'wirkungsgrad-last' },
      },
      explanation: 'η = P_ab / P_zu < 1; abhängig von der Last.',
    },
    {
      id: 'h04-q029', kind: 'free', skill: 'hw.green.it', difficulty: 2,
      prompt: `Erläutere die Kennzahl **PUE** und was ein Wert von **1,2** im Vergleich zu **2,0** bedeutet.`,
      modelAnswer: 'PUE (Power Usage Effectiveness) = Gesamtenergiebedarf des Rechenzentrums / Energiebedarf der IT-Geräte. Der ideale Wert ist 1,0 – dann würde jede kWh nur für IT genutzt. Bei PUE 1,2 werden pro kWh IT-Energie zusätzlich 0,2 kWh für Kühlung, USV-Verluste, Beleuchtung usw. benötigt; bei PUE 2,0 sind es 1,0 kWh zusätzlich – also fünfmal so viel Nebenaufwand. Ein niedriger PUE bedeutet ein energieeffizienteres Rechenzentrum (z. B. durch effiziente Kühlung, Warm-/Kaltgang-Einhausung, freie Kühlung).',
      keywords: ['Gesamtenergie', 'IT-Energie', 'ideal 1,0', 'Kühlung', 'Overhead'],
      explanation: 'PUE = Gesamt / IT.',
    },
    {
      id: 'h04-q030', kind: 'number', skill: 'hw.energy.cost', difficulty: 1,
      prompt: `Wie viele **kWh** verbraucht ein Gerät mit **20 W** in **30 Tagen** Dauerbetrieb?`,
      answer: 14.4, tolerance: 0.01, unit: 'kWh',
      misconceptions: [{ answer: '14400', error: 'energie-wh-kwh', why: 'Das sind Wh – durch 1.000 teilen.' }, { answer: '0.6', error: 'energie-zeitraum', why: 'Die 24 Stunden pro Tag fehlen.' }],
      explanation: '20 W · 24 h · 30 = 14.400 Wh = **14,4 kWh**.',
    },
    {
      id: 'h04-q031', kind: 'single', skill: 'hw.ups.types', difficulty: 1,
      prompt: `Was ist der **Hauptzweck** einer USV an einem Server?`,
      options: ['Stromkosten senken', 'Stromausfälle überbrücken und ein kontrolliertes Herunterfahren ermöglichen, Netzstörungen filtern', 'Die Rechenleistung erhöhen', 'Die Netzwerkverbindung absichern'],
      answer: 1,
      distractors: {
        '0': { why: 'Eine USV verbraucht selbst etwas Energie – sie senkt keine Kosten.', error: 'usv-zweck' },
        '2': { why: 'Mit Rechenleistung hat die USV nichts zu tun.', error: 'usv-zweck' },
        '3': { why: 'Netzwerksicherheit ist Aufgabe von Firewall & Co.', error: 'usv-zweck' },
      },
      explanation: 'USV = Verfügbarkeit und Schutz vor Datenverlust bei Stromproblemen.',
    },
    {
      id: 'h04-q032', kind: 'number', skill: 'hw.energy.power', difficulty: 1,
      prompt: `Das Stromnetz in Deutschland arbeitet mit **50 Hz**. Wie lange dauert **eine** Schwingung (Periodendauer T) in **Millisekunden**?`,
      answer: 20, unit: 'ms',
      hints: ['T = 1 ÷ f', '1 s = 1.000 ms'],
      misconceptions: [{ answer: '0.02', error: 'einheit-umrechnung', why: '0,02 s ist richtig gerechnet, gefragt sind aber **Millisekunden**: 0,02 s · 1.000 = 20 ms.' }, { answer: '50', error: 'periodendauer-frequenz', why: '50 ist die Frequenz (Schwingungen pro Sekunde). Die Dauer einer Schwingung ist der Kehrwert: T = 1 ÷ f.' }],
      explanation: '**20 ms.** T = 1 ÷ f = 1 ÷ 50 Hz = 0,02 s = **20 ms**. Häufiger Fehler: Frequenz und Periodendauer verwechseln – f sagt, wie oft pro Sekunde, T sagt, wie lange eine Schwingung dauert.',
    },
    {
      id: 'h04-q033', kind: 'number', skill: 'hw.energy.power', difficulty: 2,
      prompt: `Im Netzwerkraum in Berlin hängen **6 Server** mit je **450 W** an **einem** Außenleiter (230 V gegen N, cos φ = 1). Welcher Strom fließt in diesem Außenleiter? (in A, zwei Nachkommastellen)`,
      answer: 11.74, tolerance: 0.01, unit: 'A',
      hints: ['Erst die Gesamtleistung bilden.', 'I = P ÷ U'],
      misconceptions: [{ answer: '1.96', error: 'energie-anzahl-vergessen', why: 'Das ist der Strom **eines** Servers (450 W ÷ 230 V). Es hängen 6 Server an der Phase.' }, { answer: '6.75', error: 'drehstrom-400v', why: 'Mit 400 V gerechnet. Zwischen Außenleiter und N liegen 230 V – nur zwischen zwei Außenleitern sind es 400 V.' }],
      explanation: '**≈ 11,74 A.** Gesamtleistung 6 · 450 W = 2.700 W; I = P ÷ U = 2.700 W ÷ 230 V = 11,739 A ≈ **11,74 A**. Ein 16-A-Stromkreis reicht, die Reserve ist aber gering. Häufiger Fehler: 400 V einsetzen – die gelten nur zwischen zwei Außenleitern.',
    },
    {
      id: 'h04-q034', kind: 'free', skill: 'hw.energy.power', difficulty: 3,
      prompt: `Im Serverraum der Elektro Krämer GmbH sollen **9 Server mit je 450 W** betrieben werden. Es gibt einen Drehstromanschluss mit drei Außenleitern (L1, L2, L3); jeder Steckdosenstromkreis ist mit **16 A** abgesichert. Ein Kollege will alle Server über eine Steckdosenleiste an L1 anschließen. Prüfe das rechnerisch und schlage eine bessere Verteilung vor.`,
      modelAnswer: 'Alle 9 Server an L1: P = 9 · 450 W = 4.050 W; I = 4.050 W ÷ 230 V ≈ 17,61 A. Das ist mehr als 16 A – die Sicherung würde unter Volllast auslösen. Besser: die Last gleichmäßig auf die drei Außenleiter verteilen, je 3 Server pro Phase: 3 · 450 W = 1.350 W → I = 1.350 W ÷ 230 V ≈ 5,87 A je Phase. So bleibt genug Reserve. Server mit zwei Netzteilen an zwei verschiedene Stromkreise/Phasen anschließen (A/B-Versorgung), damit ein ausgelöster Stromkreis nicht alle Server abschaltet. Steckdosenleisten nicht hintereinanderstecken. Neue Stromkreise oder Änderungen am Verteiler plant und installiert eine Elektrofachkraft.',
      keywords: ['4.050 W', '17,61 A', '16 A', 'Phasen verteilen', '5,87 A', 'zwei Netzteile', 'Elektrofachkraft'],
      hints: ['Gesamtleistung bilden, dann I = P ÷ U mit 230 V.', 'Was passiert, wenn du die Server auf drei Außenleiter verteilst?'],
      explanation: 'An einer Phase: 4.050 W ÷ 230 V ≈ 17,61 A > 16 A → nicht zulässig. Auf drei Phasen verteilt: je 1.350 W ÷ 230 V ≈ 5,87 A. Häufiger Fehler: mit 400 V rechnen – eine Steckdose hat 230 V.',
    },
    {
      id: 'h04-q035', kind: 'table', skill: 'hw.energy.cost', difficulty: 3,
      prompt: `Für den Empfang sollen zwei Multifunktionsdrucker verglichen werden.\n\n**Beleg – Betriebsprofil und Datenblattwerte:**\n\n| | Drucker A | Drucker B |\n|---|---|---|\n| Betrieb (Montag bis Freitag, je 10 h) | 35 W | 28 W |\n| Bereitschaft (restliche Stunden der Woche) | 4 W | 1 W |\n\nRechne mit **52 Wochen** (1 Woche = 168 h) und **32 ct/kWh**. Trage die Energie pro Jahr (kWh, zwei Nachkommastellen) und die Kosten pro Jahr (€, auf Cent) ein.`,
      columns: [{ key: 'kwh', label: 'Energie (kWh/Jahr)', type: 'number' }, { key: 'eur', label: 'Kosten (€/Jahr)', type: 'number' }],
      rows: [
        { label: 'Drucker A', cells: { kwh: { answer: '115.54', accept: ['115,54', '115.544', '115,544', '115.5', '115,5'] }, eur: { answer: '36.97', accept: ['36,97'] } } },
        { label: 'Drucker B', cells: { kwh: { answer: '78.94', accept: ['78,94', '78.936', '78,936', '78.9', '78,9'] }, eur: { answer: '25.26', accept: ['25,26'] } } },
      ],
      misconceptions: [{ cell: 'kwh', answer: '91', error: 'energie-standby-vergessen', why: 'Das ist nur die Betriebsenergie von Drucker A. Die Bereitschaft (6.136 h · 4 W) fehlt.' }],
      hints: ['Betrieb pro Woche 5 · 10 h = 50 h, Bereitschaft 168 h − 50 h = 118 h.', 'Pro Jahr · 52: 2.600 h Betrieb, 6.136 h Bereitschaft.'],
      explanation: '**A: 115,54 kWh / 36,97 € · B: 78,94 kWh / 25,26 €.** Stunden: Betrieb 50 h · 52 = 2.600 h; Bereitschaft 118 h · 52 = 6.136 h. A: 35 W · 2.600 h = 91 kWh plus 4 W · 6.136 h = 24,544 kWh → 115,544 kWh · 0,32 € = 36,97 €. B: 28 W · 2.600 h = 72,8 kWh plus 1 W · 6.136 h = 6,136 kWh → 78,936 kWh · 0,32 € = 25,26 €. Häufiger Fehler: Bereitschaft vergessen – bei A ist das gut ein Fünftel des Verbrauchs.',
    },
    {
      id: 'h04-q036', kind: 'table', skill: 'hw.energy.efficiency', difficulty: 2,
      prompt: `**Beleg: 80 PLUS – Mindestwirkungsgrade (230 V EU, interne Netzteile)**\n\n| Stufe | 10 % Last | 20 % Last | 50 % Last | 100 % Last |\n|---|---|---|---|---|\n| Bronze | – | 85 % | 88 % | 85 % |\n| Gold | – | 90 % | 92 % | 89 % |\n| Platinum | – | 92 % | 94 % | 90 % |\n\nErgänze für drei Netzteile die Auslastung, den Mindestwirkungsgrad laut Tabelle und die höchstens aufgenommene Leistung (W, zwei Nachkommastellen).\n\n| Netzteil | Nennleistung | abgegebene Leistung |\n|---|---|---|\n| 1 – Bronze | 500 W | 250 W |\n| 2 – Gold | 650 W | 130 W |\n| 3 – Platinum | 400 W | 400 W |`,
      columns: [{ key: 'last', label: 'Auslastung (%)', type: 'number' }, { key: 'eta', label: 'η laut Tabelle (%)', type: 'number' }, { key: 'pzu', label: 'P_zu (W)', type: 'number' }],
      rows: [
        { label: 'Netzteil 1', cells: { last: { answer: '50' }, eta: { answer: '88' }, pzu: { answer: '284.09', accept: ['284,09', '284.1', '284,1'] } } },
        { label: 'Netzteil 2', cells: { last: { answer: '20' }, eta: { answer: '90' }, pzu: { answer: '144.44', accept: ['144,44', '144.4', '144,4'] } } },
        { label: 'Netzteil 3', cells: { last: { answer: '100' }, eta: { answer: '90' }, pzu: { answer: '444.44', accept: ['444,44', '444.4', '444,4'] } } },
      ],
      misconceptions: [{ cell: 'pzu', answer: '220', error: 'wirkungsgrad-multipliziert', why: '250 W · 0,88 = 220 W ist falsch: Das Netzteil nimmt mehr auf, als es abgibt – P_zu = P_ab ÷ η.' }],
      hints: ['Auslastung = abgegebene Leistung ÷ Nennleistung · 100 %.', 'P_zu = P_ab ÷ η (η als Dezimalzahl, z. B. 0,88).'],
      explanation: '**1: 50 % / 88 % / 284,09 W · 2: 20 % / 90 % / 144,44 W · 3: 100 % / 90 % / 444,44 W.** Netzteil 1: 250 ÷ 500 = 50 % → Bronze 88 % → 250 W ÷ 0,88 = 284,09 W. Netzteil 2: 130 ÷ 650 = 20 % → Gold 90 % → 130 W ÷ 0,90 = 144,44 W. Netzteil 3: 400 ÷ 400 = 100 % → Platinum 90 % → 400 W ÷ 0,90 = 444,44 W. Häufiger Fehler: immer die 50-%-Spalte nehmen – die Spalte hängt von der Auslastung ab.',
    },
    {
      id: 'h04-q037', kind: 'number', skill: 'hw.energy.efficiency', difficulty: 2,
      prompt: `Ein Server hat ein **1.000-W-Netzteil, 80 PLUS Titanium** (230 V EU). Nachts braucht der Server nur **100 W**. Laut Tabelle gilt bei **10 % Last** ein Mindestwirkungsgrad von **90 %**. Welche Leistung nimmt das Netzteil dabei höchstens auf? (W, eine Nachkommastelle)`,
      answer: 111.1, tolerance: 0.1, unit: 'W',
      misconceptions: [{ answer: '90', error: 'wirkungsgrad-multipliziert', why: 'Mit η multipliziert. Richtig: P_zu = P_ab ÷ η = 100 W ÷ 0,9.' }, { answer: '110', error: 'wirkungsgrad-prozent-aufschlag', why: '10 % Aufschlag ist nicht dasselbe wie ÷ 0,9 (das wären 11,1 %).' }],
      explanation: '**111,1 W.** Auslastung 100 W ÷ 1.000 W = 10 % → η = 90 %. P_zu = 100 W ÷ 0,90 = 111,11 W ≈ **111,1 W**. Nur Titanium garantiert überhaupt einen Wert bei 10 % Last – wichtig für Server, die oft wenig ausgelastet sind. Häufiger Fehler: 10 % aufschlagen (110 W).',
    },
    {
      id: 'h04-q038', kind: 'table', skill: 'hw.ups.sizing', difficulty: 3,
      prompt: `**Beleg – Datenblatt der vorhandenen USV im Netzwerkschrank:** Ausgangsleistung **1.000 VA / 600 W**.\n\nNach einer Erweiterung hängen an der USV Geräte mit zusammen **550 W** (Leistungsfaktor der Geräte **cos φ = 0,95**). Prüfe beide Grenzen der USV (eine Nachkommastelle).`,
      columns: [{ key: 'last', label: 'Last', type: 'number' }, { key: 'pct', label: 'Auslastung (%)', type: 'number' }],
      rows: [
        { label: 'Wirkleistung (W)', cells: { last: { given: '550' }, pct: { answer: '91.7', accept: ['91,7', '91.67', '91,67'] } } },
        { label: 'Scheinleistung (VA)', cells: { last: { answer: '578.9', accept: ['578,9', '578.95', '578,95'] }, pct: { answer: '57.9', accept: ['57,9', '57.89', '57,89'] } } },
      ],
      misconceptions: [{ cell: 'pct', answer: '55', error: 'usv-va-gleich-w', why: '550 W ÷ 1.000 VA vergleicht Watt mit VA. Erst S = P ÷ cos φ berechnen.' }],
      hints: ['Auslastung W = 550 W ÷ 600 W.', 'S = 550 W ÷ 0,95; dann ÷ 1.000 VA.'],
      explanation: '**W-Grenze 91,7 %, VA-Grenze 57,9 %.** Wirkleistung: 550 W ÷ 600 W = 0,9167 → 91,7 %. Scheinleistung der Last: 550 W ÷ 0,95 = 578,9 VA → ÷ 1.000 VA = 57,9 %. Maßgeblich ist die W-Grenze. Die USV reicht rechnerisch noch, hat aber kaum Reserve. Häufiger Fehler: nur die VA-Angabe ansehen („1.000 VA ist doch fast das Doppelte von 550 W“).',
    },
    {
      id: 'h04-q039', kind: 'free', skill: 'hw.ups.sizing', difficulty: 3,
      prompt: `Bezug: USV im Netzwerkschrank (1.000 VA / 600 W, Last 550 W, cos φ = 0,95). Der Kollege sagt: „Passt doch, 550 W ist viel weniger als 1.000 VA.“ Beurteile die Situation und gib eine begründete Empfehlung.`,
      modelAnswer: 'Die Aussage ist falsch begründet: VA und W darf man nicht direkt vergleichen. Die USV hat zwei Grenzen. Die Scheinleistung der Last beträgt 550 W ÷ 0,95 ≈ 579 VA (58 % von 1.000 VA). Entscheidend ist hier aber die Wirkleistungsgrenze: 550 W von 600 W sind ≈ 92 % Auslastung. Die USV reicht damit rechnerisch, es bleibt aber praktisch keine Reserve für Lastspitzen, Erweiterungen und alternde Akkus; außerdem wird die Überbrückungszeit bei hoher Last kurz. Empfehlung: eine größere USV (z. B. 1.500 VA / 1.350 W) beschaffen oder die Last aufteilen, 20–30 % Reserve einplanen und die Laufzeit in der Herstellertabelle prüfen, damit das Herunterfahren der Geräte sicher klappt.',
      keywords: ['VA ≠ W', 'zwei Grenzen', '92 %', 'Reserve', 'Überbrückungszeit', 'größere USV'],
      explanation: 'Maßgeblich ist die W-Grenze (≈ 92 %). Rechnerisch ok, aber ohne Reserve → größere USV empfehlen.',
    },
    {
      id: 'h04-q040', kind: 'number', skill: 'hw.green.it', difficulty: 2,
      prompt: `Am Standort Hamburg werden **5 Switches** ersetzt. Alt: je **120 W**, neu: je **65 W**. Alle laufen 24/7 (8.760 h im Jahr). Rechne mit einem **angenommenen Emissionsfaktor von 380 g CO₂/kWh**. Wie viel **kg CO₂** spart der Tausch pro Jahr? (eine Nachkommastelle)`,
      answer: 915.4, tolerance: 0.1, unit: 'kg',
      hints: ['ΔP = 5 · (120 W − 65 W).', 'ΔE in kWh · 380 g/kWh → g → ÷ 1.000 = kg.'],
      misconceptions: [{ answer: '915420', error: 'co2-g-kg', why: 'Das sind Gramm – durch 1.000 teilen.' }, { answer: '2409', error: 'co2-faktor-vergessen', why: 'Das ist die eingesparte Energie in kWh. Noch mit 380 g/kWh multiplizieren.' }, { answer: '183.1', error: 'energie-anzahl-vergessen', why: 'Das ist ein Switch. Es werden 5 getauscht.' }],
      explanation: '**915,4 kg CO₂.** ΔP = 5 · (120 W − 65 W) = 275 W; ΔE = 275 W · 8.760 h = 2.409.000 Wh = 2.409 kWh; CO₂ = 2.409 kWh · 380 g/kWh = 915.420 g ≈ **915,4 kg**. Häufiger Fehler: in Gramm stehen bleiben.',
    },
    {
      id: 'h04-q041', kind: 'free', skill: 'hw.green.it', difficulty: 2,
      prompt: `Die Geschäftsleitung möchte im Nachhaltigkeitsbericht angeben, wie viel CO₂ der Austausch der Server-Hardware einspart. Erläutere, wie du die Einsparung berechnest und warum das Ergebnis nur eine Abschätzung ist.`,
      modelAnswer: 'Rechenweg: 1. Leistungsdifferenz ΔP = alte minus neue Leistungsaufnahme (Messung oder Datenblatt). 2. Betriebszeit t aus dem Betriebsprofil (z. B. 8.760 h bei 24/7). 3. Eingesparte Energie ΔE = ΔP · t, umgerechnet in kWh. 4. CO₂-Einsparung = ΔE · Emissionsfaktor (g CO₂ pro kWh), Ergebnis in kg bzw. t. Bei Rechenzentren zusätzlich den PUE-Wert berücksichtigen, weil auch Kühlung und USV-Verluste sinken. Abschätzung, weil: der Emissionsfaktor ein Durchschnittswert des Strommixes ist und sich jedes Jahr ändert (bei Ökostrom anders bewertet), die Leistungsaufnahme mit der Auslastung schwankt, Datenblattwerte oft Maximalwerte sind und die Herstellung der neuen Geräte selbst CO₂ verursacht (graue Energie), die in dieser Rechnung fehlt.',
      keywords: ['ΔP', 'Betriebszeit', 'kWh', 'Emissionsfaktor', 'Strommix', 'ändert sich', 'Herstellung', 'PUE'],
      explanation: 'ΔE = ΔP · t; CO₂ = ΔE · Faktor. Faktor, Auslastung und Herstellung machen das Ergebnis zur Abschätzung.',
    },
  ],
};
