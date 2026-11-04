import type { Module } from '../types';

export const m04: Module = {
  id: 'm04',
  nr: 4,
  title: 'Binärsystem',
  short: 'Stellenwerte, Umrechnung und bitweises UND – das Fundament für Subnetting.',
  icon: 'Binary',
  relevance: 'ap1-teilweise',
  prerequisites: [],
  generators: ['bin.dec2bin', 'bin.bin2dec'],
  skills: [
    { id: 'bin.placevalue', module: 'm04', title: 'Stellenwerte im Binärsystem' },
    { id: 'bin.dec2bin', module: 'm04', title: 'Dezimal → Binär umrechnen', requires: ['bin.placevalue'] },
    { id: 'bin.bin2dec', module: 'm04', title: 'Binär → Dezimal umrechnen', requires: ['bin.placevalue'] },
    { id: 'bin.powers', module: 'm04', title: 'Zweierpotenzen sicher kennen' },
    { id: 'bin.and', module: 'm04', title: 'Bitweises UND', requires: ['bin.dec2bin'] },
  ],
  lessons: [
    {
      id: 'm04-l01',
      title: 'Warum Computer in Bits denken – Stellenwerte',
      minutes: 15,
      relevance: 'ap1',
      skills: ['bin.placevalue', 'bin.bin2dec'],
      steps: [
        {
          type: 'explain',
          title: 'Zwei Zustände genügen',
          body: `Ein Computer arbeitet mit elektrischen Zuständen: **Spannung an** oder **Spannung aus**. Diese beiden Zustände schreiben wir als **1** und **0**. Eine einzelne Stelle mit 0 oder 1 heißt **Bit** (binary digit).

Im Dezimalsystem, das du aus dem Alltag kennst, hat jede Stelle einen **Stellenwert**, der eine Zehnerpotenz ist:

| Tausender | Hunderter | Zehner | Einer |
|---|---|---|---|
| 10³ = 1000 | 10² = 100 | 10¹ = 10 | 10⁰ = 1 |

Die Zahl **254** bedeutet also 2·100 + 5·10 + 4·1.

Das **Binärsystem** funktioniert genauso – nur mit der Basis **2** statt 10. Jede Stelle ist doppelt so viel wert wie die Stelle rechts daneben:

| 2⁷ | 2⁶ | 2⁵ | 2⁴ | 2³ | 2² | 2¹ | 2⁰ |
|---|---|---|---|---|---|---|---|
| **128** | **64** | **32** | **16** | **8** | **4** | **2** | **1** |

Acht Bits bilden ein **Byte** bzw. – bei IP-Adressen – ein **Oktett**. Diese acht Stellenwerte solltest du auswendig können, denn sie begegnen dir bei jeder Subnetzmaske.`,
        },
        {
          type: 'visual',
          title: 'Probier es aus: Bits umschalten',
          widget: { kind: 'binary-octet', data: { value: 192, editable: true } },
          caption: 'Klicke auf einzelne Bits. Der Dezimalwert ist die Summe der Stellenwerte, an denen eine 1 steht. Beobachte: Das linke Bit allein ist schon 128 – mehr als alle anderen sieben zusammen (127).',
        },
        {
          type: 'example',
          title: 'Binär → Dezimal: 11000000',
          problem: 'Welchen Dezimalwert hat das Oktett `11000000`?',
          steps: [
            { label: 'Stellenwerte darüberschreiben', body: '| 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |\n|---|---|---|---|---|---|---|---|\n| 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |' },
            { label: 'Einsen addieren', body: '128 + 64 = **192**' },
          ],
          result: '`11000000` = **192** – genau dieser Wert steht in der Maske `255.255.255.192` (/26).',
        },
        {
          type: 'check',
          question: {
            id: 'm04-c01', kind: 'number', skill: 'bin.bin2dec', difficulty: 1,
            prompt: 'Welchen Dezimalwert hat `11100000`?',
            answer: 224,
            hints: ['128 + 64 + …'],
            explanation: '128 + 64 + 32 = **224**. Diesen Wert findest du in der Maske 255.255.255.224 (/27).',
          },
        },
        {
          type: 'check',
          question: {
            id: 'm04-c02', kind: 'single', skill: 'bin.placevalue', difficulty: 1,
            prompt: 'Welchen Wert hat das **höchstwertige** Bit eines Oktetts?',
            options: ['1', '8', '128', '255'],
            answer: 2,
            distractors: {
              '0': { why: '1 ist das niederwertigste Bit (ganz rechts).', error: 'bin-reihenfolge' },
              '3': { why: '255 ist der Wert, wenn **alle** acht Bits 1 sind.', error: 'bin-stellenwert' },
              '1': { why: '8 = 2³ ist das vierte Bit von rechts.', error: 'bin-stellenwert' },
            },
            explanation: 'Das linke Bit hat den Stellenwert 2⁷ = **128**.',
          },
        },
        { type: 'practice', title: 'Übung: Binär → Dezimal', generator: 'bin.bin2dec', count: 4, difficulty: 1 },
        {
          type: 'summary',
          points: [
            'Ein Bit hat zwei Zustände (0/1), 8 Bit = 1 Byte = 1 Oktett.',
            'Stellenwerte eines Oktetts: 128 · 64 · 32 · 16 · 8 · 4 · 2 · 1.',
            'Binär → Dezimal: Stellenwerte aller Einsen addieren.',
            'Größter Oktettwert: 11111111 = 255.',
          ],
        },
      ],
    },
    {
      id: 'm04-l02',
      title: 'Dezimal → Binär: die Subtraktionsmethode',
      minutes: 15,
      relevance: 'ap1',
      skills: ['bin.dec2bin'],
      steps: [
        {
          type: 'explain',
          title: 'Vom größten Stellenwert abwärts',
          body: `Um eine Dezimalzahl (0–255) in 8 Bit umzuwandeln, gehst du die Stellenwerte **von links nach rechts** durch und fragst jedes Mal:

> „Passt dieser Stellenwert noch in meinen Rest?“

- **Ja** → schreibe eine **1** und ziehe den Stellenwert vom Rest ab.
- **Nein** → schreibe eine **0** und gehe weiter.

Das ist die **Subtraktionsmethode**. Sie ist für IP-Adressen meist schneller als die Divisionsmethode (fortlaufend durch 2 teilen, Reste von unten lesen), weil du die Stellenwerte ohnehin im Kopf hast.

**Tipp für die Prüfung:** Schreibe dir als Erstes die Zeile \`128 64 32 16 8 4 2 1\` auf dein Konzeptpapier. Damit löst du jede Umrechnung in Sekunden.`,
        },
        {
          type: 'example',
          title: 'Beispiel: 172 in Binär',
          problem: 'Wandle **172** in eine 8-stellige Binärzahl um.',
          steps: [
            { label: '128 passt in 172', body: '1 → Rest 172 − 128 = **44**' },
            { label: '64 passt nicht in 44', body: '0' },
            { label: '32 passt in 44', body: '1 → Rest 44 − 32 = **12**' },
            { label: '16 passt nicht in 12', body: '0' },
            { label: '8 passt in 12', body: '1 → Rest 12 − 8 = **4**' },
            { label: '4 passt in 4', body: '1 → Rest **0**' },
            { label: '2 und 1', body: 'Rest ist 0 → beide 0' },
          ],
          result: '172 = **10101100**  (Probe: 128 + 32 + 8 + 4 = 172 ✔)',
        },
        {
          type: 'check',
          question: {
            id: 'm04-c03', kind: 'text', skill: 'bin.dec2bin', difficulty: 1,
            prompt: 'Wandle **240** in eine 8-stellige Binärzahl um.',
            accept: ['11110000'],
            hints: ['128 + 64 + 32 + 16 = ?'],
            explanation: '240 = 128 + 64 + 32 + 16 → **11110000**. Das ist das Maskenoktett von /28.',
          },
        },
        { type: 'practice', title: 'Übung: Dezimal → Binär', generator: 'bin.dec2bin', count: 5, difficulty: 2 },
        {
          type: 'summary',
          points: ['Subtraktionsmethode: Stellenwerte von links prüfen, passend → 1 und abziehen.', 'Immer auf 8 Stellen auffüllen (führende Nullen).', 'Probe: Stellenwerte der Einsen addieren.'],
        },
      ],
    },
    {
      id: 'm04-l03',
      title: 'Zweierpotenzen & Maskenwerte',
      minutes: 12,
      relevance: 'ap1',
      skills: ['bin.powers'],
      steps: [
        {
          type: 'explain',
          title: 'Die wichtigsten Zahlen der Netzwerktechnik',
          body: `Mit **n Bits** lassen sich **2ⁿ** verschiedene Kombinationen bilden. Jedes zusätzliche Bit **verdoppelt** die Anzahl. Diese Regel steckt hinter fast jeder Subnetting-Rechnung:

| n | 2ⁿ | Bedeutung im Netzwerk |
|---|---|---|
| 1 | 2 | 1 ausgeliehenes Bit → 2 Subnetze |
| 2 | 4 | /30: 4 Adressen (2 nutzbar) |
| 3 | 8 | /29: 8 Adressen |
| 4 | 16 | /28 |
| 5 | 32 | /27 |
| 6 | 64 | /26 |
| 7 | 128 | /25 |
| 8 | 256 | /24: ein ganzes Oktett |
| 10 | 1.024 | /22 |
| 12 | 4.096 | /20 |
| 16 | 65.536 | /16 |

**Maskenwerte**: Ein Oktett einer Subnetzmaske besteht immer aus Einsen **von links** und dann Nullen. Deshalb gibt es nur neun mögliche Werte:

| Einsen | Binär | Dezimal |
|---|---|---|
| 0 | 00000000 | 0 |
| 1 | 10000000 | 128 |
| 2 | 11000000 | 192 |
| 3 | 11100000 | 224 |
| 4 | 11110000 | 240 |
| 5 | 11111000 | 248 |
| 6 | 11111100 | 252 |
| 7 | 11111110 | 254 |
| 8 | 11111111 | 255 |

Wenn du diese Tabelle kennst, kannst du jede Maske sofort in ein Präfix umrechnen.`,
        },
        {
          type: 'check',
          question: {
            id: 'm04-c04', kind: 'match', skill: 'bin.powers', difficulty: 1,
            prompt: 'Ordne die Maskenwerte der Anzahl Einsen zu.',
            left: ['128', '192', '224', '248', '252'],
            right: ['1', '2', '3', '5', '6'],
            answer: [0, 1, 2, 3, 4],
            explanation: '128 = 1 Eins, 192 = 2, 224 = 3, 240 = 4, 248 = 5, 252 = 6, 254 = 7, 255 = 8.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'm04-c05', kind: 'number', skill: 'bin.powers', difficulty: 1,
            prompt: 'Wie viele verschiedene Werte lassen sich mit **5 Bits** darstellen?',
            answer: 32,
            explanation: '2⁵ = **32** (Werte 0 bis 31).',
          },
        },
        { type: 'summary', points: ['n Bits → 2ⁿ Kombinationen; jedes Bit verdoppelt.', 'Maskenoktette: 0, 128, 192, 224, 240, 248, 252, 254, 255.'] },
      ],
    },
    {
      id: 'm04-l04',
      title: 'Bitweises UND – so findet der Rechner sein Netz',
      minutes: 15,
      relevance: 'ap1',
      skills: ['bin.and'],
      steps: [
        {
          type: 'explain',
          title: 'Die UND-Verknüpfung',
          body: `Beim **bitweisen UND** (AND) werden zwei Bitfolgen Stelle für Stelle verglichen. Das Ergebnis ist nur dann **1**, wenn **beide** Bits 1 sind:

| A | B | A UND B |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

**Warum ist das für Netzwerke wichtig?** Jeder Rechner verknüpft seine IP-Adresse per UND mit der Subnetzmaske. Die Einsen der Maske „lassen die Netzbits durch“, die Nullen „löschen“ die Hostbits. Übrig bleibt die **Netzadresse**.

Mit dem gleichen Verfahren prüft ein PC vor jedem Senden: *Liegt das Ziel in meinem Netz?* Wenn ja, schickt er direkt (per ARP ermittelte MAC-Adresse). Wenn nein, schickt er das Paket an sein **Standardgateway**.`,
        },
        {
          type: 'visual',
          title: 'IP UND Maske',
          widget: { kind: 'ip-binary', data: { ip: '192.168.10.77', prefix: 26, editable: true } },
          caption: 'Die blauen Bits sind Netzbits (Maske = 1), die orangefarbenen Hostbits (Maske = 0). Setzt man alle Hostbits auf 0, erhält man die Netzadresse; setzt man alle auf 1, die Broadcastadresse. Ändere IP oder Präfix und beobachte das Ergebnis.',
        },
        {
          type: 'example',
          title: 'Beispiel: 192.168.10.77/26',
          problem: 'Bestimme die Netzadresse per UND-Verknüpfung.',
          steps: [
            { label: 'Nur das 4. Oktett ist interessant', body: 'Die ersten drei Maskenoktette sind 255 → die IP-Oktette bleiben unverändert: 192.168.10' },
            { label: '77 und 192 binär', body: '```\n77  = 01001101\n192 = 11000000\nUND = 01000000 = 64\n```' },
          ],
          result: 'Netzadresse: **192.168.10.64**',
        },
        {
          type: 'check',
          question: {
            id: 'm04-c06', kind: 'number', skill: 'bin.and', difficulty: 2,
            prompt: 'Berechne **200 UND 224** (dezimal).',
            answer: 192,
            hints: ['200 = 11001000, 224 = 11100000'],
            explanation: '```\n200 = 11001000\n224 = 11100000\nUND = 11000000 = 192\n```',
          },
        },
        { type: 'summary', points: ['UND ergibt nur 1, wenn beide Bits 1 sind.', 'IP UND Maske = Netzadresse (Hostbits werden 0).', 'So entscheidet ein Host: lokal zustellen oder ans Gateway senden.'] },
      ],
    },
  ],
  questions: [
    { id: 'm04-q001', kind: 'number', skill: 'bin.bin2dec', difficulty: 1, prompt: 'Welchen Dezimalwert hat `10000000`?', answer: 128, explanation: 'Nur das höchstwertige Bit ist gesetzt: **128**.' },
    { id: 'm04-q002', kind: 'number', skill: 'bin.bin2dec', difficulty: 1, prompt: 'Welchen Dezimalwert hat `11111100`?', answer: 252, explanation: '128+64+32+16+8+4 = **252** (Maskenoktett von /30).' },
    { id: 'm04-q003', kind: 'text', skill: 'bin.dec2bin', difficulty: 1, prompt: 'Wandle **255** in Binär um (8 Stellen).', accept: ['11111111'], explanation: 'Alle Bits gesetzt: 128+64+32+16+8+4+2+1 = 255.' },
    { id: 'm04-q004', kind: 'text', skill: 'bin.dec2bin', difficulty: 2, prompt: 'Wandle **10** in eine 8-stellige Binärzahl um.', accept: ['00001010'], misconceptions: [{ answer: '1010', error: 'bin-fuehrende-nullen', why: 'Der Wert ist richtig, aber ein Oktett hat immer 8 Stellen: 00001010.' }], explanation: '10 = 8 + 2 → **00001010**' },
    { id: 'm04-q005', kind: 'single', skill: 'bin.powers', difficulty: 1, prompt: 'Wie viele Adressen umfasst ein Bereich mit **7 Hostbits**?', options: ['64', '126', '128', '256'], answer: 2, distractors: { '1': { why: '126 ist die Zahl der **nutzbaren** Hosts (128 − 2). Gefragt war die Anzahl Adressen.', error: 'reservierte-verwechselt' }, '0': { why: '64 = 2⁶.', error: 'bin-potenz' }, '3': { why: '256 = 2⁸.', error: 'bin-potenz' } }, explanation: '2⁷ = **128** Adressen.' },
    { id: 'm04-q006', kind: 'multi', skill: 'bin.powers', difficulty: 2, prompt: 'Welche Werte können in einer gültigen Subnetzmaske als Oktett vorkommen?', options: ['192', '200', '248', '254', '127', '0'], answer: [0, 2, 3, 5], explanation: 'Gültig sind nur 0, 128, 192, 224, 240, 248, 252, 254, 255 – Einsen müssen links zusammenhängend stehen. 200 = 11001000 und 127 = 01111111 sind ungültig.' },
    { id: 'm04-q007', kind: 'number', skill: 'bin.and', difficulty: 2, prompt: 'Berechne **173 UND 240** (dezimal).', answer: 160, hints: ['173 = 10101101'], explanation: '```\n173 = 10101101\n240 = 11110000\nUND = 10100000 = 160\n```' },
    { id: 'm04-q008', kind: 'ip', skill: 'bin.bin2dec', difficulty: 2, prompt: 'Wandle in Punktnotation um: `11000000.10101000.00000001.00001010`', answer: '192.168.1.10', explanation: '11000000 = 192, 10101000 = 168, 00000001 = 1, 00001010 = 10 → **192.168.1.10**' },
    { id: 'm04-q009', kind: 'number', skill: 'bin.powers', difficulty: 2, prompt: 'Wie viele Bits benötigt man mindestens, um **50** verschiedene Werte darzustellen?', answer: 6, explanation: '2⁵ = 32 < 50 ≤ 64 = 2⁶ → **6 Bits**.' },
    { id: 'm04-q010', kind: 'free', skill: 'bin.and', difficulty: 2, prompt: 'Erläutere, wie ein PC mit Hilfe seiner Subnetzmaske entscheidet, ob er ein Paket direkt zustellt oder an das Standardgateway schickt.', modelAnswer: 'Der PC verknüpft seine eigene IP-Adresse und die Ziel-IP jeweils bitweise per UND mit seiner Subnetzmaske. Sind beide Ergebnisse (Netzadressen) gleich, liegt das Ziel im eigenen Netz und wird direkt (MAC per ARP) zugestellt. Sind sie verschieden, wird das Paket an die MAC-Adresse des Standardgateways gesendet, das es weiterleitet.', keywords: ['UND', 'Netzadresse', 'gleich', 'Standardgateway', 'ARP'], explanation: 'Kern: UND-Verknüpfung beider Adressen mit der eigenen Maske → Vergleich der Netzanteile.' },
    { id: 'm04-q011', kind: 'order', skill: 'bin.placevalue', difficulty: 1, prompt: 'Ordne die Stellenwerte eines Oktetts von **links nach rechts**.', items: ['128', '64', '32', '16', '8', '4', '2', '1'], explanation: 'Höchstwertiges Bit links (2⁷ = 128), niederwertigstes rechts (2⁰ = 1).' },
    { id: 'm04-q012', kind: 'table', skill: 'bin.dec2bin', difficulty: 2, prompt: 'Fülle die Tabelle aus.', columns: [{ key: 'bin', label: 'Binär', type: 'text' }], rows: [{ label: '192', cells: { bin: { answer: '11000000' } } }, { label: '224', cells: { bin: { answer: '11100000' } } }, { label: '127', cells: { bin: { answer: '01111111' } } }, { label: '64', cells: { bin: { answer: '01000000' } } }], explanation: '192 = 128+64, 224 = 128+64+32, 127 = 64+32+16+8+4+2+1, 64 = 64.' },
  ],
};
