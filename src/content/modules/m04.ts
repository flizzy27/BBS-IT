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
      simple: `Ein **Bit** ist wie ein Lichtschalter: Es kennt nur aus (0) oder an (1).
Stell dir acht Schalter nebeneinander vor. Jeder Schalter steht für eine Zahl: 128, 64, 32, 16, 8, 4, 2, 1 – jeder ist doppelt so viel wert wie sein rechter Nachbar.
Um den Wert zu lesen, addierst du die Zahlen aller eingeschalteten Schalter.
Beispiel 11000000: Die Schalter 128 und 64 sind an, also 128 + 64 = 192.
Sind alle acht an, ergibt das 255 – die größte Zahl in einem Oktett (8 Bit).

**Merke:** Die Stellenwerte 128 · 64 · 32 · 16 · 8 · 4 · 2 · 1 auswendig können und die Werte der Einsen addieren.`,
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
      simple: `Dezimal in binär umrechnen ist wie Bezahlen mit Geldscheinen: Du nimmst immer zuerst den größten Schein, der noch passt.
Deine „Scheine“ sind 128, 64, 32, 16, 8, 4, 2 und 1.
Passt ein Schein in den Restbetrag, schreibst du eine 1 und ziehst ihn ab. Passt er nicht, schreibst du eine 0.
Beispiel 172: 128 passt (Rest 44), 64 nicht, 32 passt (Rest 12), 16 nicht, 8 passt (Rest 4), 4 passt (Rest 0), 2 und 1 nicht → 10101100.

**Merke:** Von links prüfen: passt → 1 und abziehen, passt nicht → 0; immer 8 Stellen schreiben.`,
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
      simple: `Jedes zusätzliche Bit verdoppelt die Möglichkeiten – wie eine Weggabelung, an der sich jeder Weg noch einmal in zwei teilt.
Mit 1 Bit gibt es 2 Werte, mit 2 Bit 4, mit 3 Bit 8 und mit 8 Bit schon 256. Man schreibt das 2 hoch n (2ⁿ).
Eine Subnetzmaske besteht immer zuerst aus Einsen und dann aus Nullen.
Deshalb gibt es in einem Oktett nur neun mögliche Maskenwerte: 0, 128, 192, 224, 240, 248, 252, 254, 255.

**Merke:** n Bits → 2ⁿ Möglichkeiten; die Maskenwerte 128 bis 255 auswendig lernen.`,
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
      simple: `Das **bitweise UND** ist wie eine Schablone mit Löchern: Nur wo die Schablone ein Loch hat (Maske = 1), scheint die IP-Adresse durch.
Wo die Schablone geschlossen ist (Maske = 0), bleibt eine 0 übrig.
Das Ergebnis ist also nur dann 1, wenn **beide** Bits 1 sind.
So rechnet jeder PC aus seiner IP-Adresse und der Maske die Netzadresse aus.
Vergleicht er sie mit der Netzadresse des Ziels, weiß er: gleich → direkt senden, verschieden → ans Gateway (Router) geben.

**Merke:** IP UND Maske = Netzadresse; 1 UND 1 = 1, alle anderen Kombinationen ergeben 0.`,
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
    { id: 'm04-q013', kind: 'number', skill: 'bin.bin2dec', difficulty: 1, prompt: 'Welchen Dezimalwert hat `10101010`?', answer: 170, misconceptions: [{ answer: '85', error: 'bin-reihenfolge', why: 'Du hast von rechts gelesen. Das linke Bit hat den Wert 128.' }], hints: ['Einsen stehen bei 128, 32, 8 und 2.'], explanation: '128 + 32 + 8 + 2 = **170**.' },
    { id: 'm04-q014', kind: 'number', skill: 'bin.bin2dec', difficulty: 1, prompt: 'Welchen Dezimalwert hat `01111111`?', answer: 127, misconceptions: [{ answer: '254', error: 'bin-reihenfolge', why: 'Das linke Bit (128) ist 0. Du hast die Reihenfolge vertauscht.' }], hints: ['Alle Bits außer dem 128er sind gesetzt.'], explanation: '64 + 32 + 16 + 8 + 4 + 2 + 1 = **127** (oder schneller: 255 − 128 = 127).' },
    { id: 'm04-q015', kind: 'text', skill: 'bin.dec2bin', difficulty: 1, prompt: 'Wandle **192** in eine 8-stellige Binärzahl um.', accept: ['11000000'], hints: ['192 = 128 + 64'], explanation: '192 − 128 = 64 → 64 − 64 = 0 → **11000000** (Maskenoktett von /26).' },
    { id: 'm04-q016', kind: 'text', skill: 'bin.dec2bin', difficulty: 2, prompt: 'Wandle **100** in eine 8-stellige Binärzahl um.', accept: ['01100100'], misconceptions: [{ answer: '1100100', error: 'bin-fuehrende-nullen', why: 'Wert richtig, aber ein Oktett hat 8 Stellen: 01100100.' }, { answer: '00100110', error: 'bin-reihenfolge', why: 'Die Bits stehen rückwärts. Das höchstwertige Bit (128) steht links.' }], hints: ['128 passt nicht in 100 → erste Stelle 0.', 'Rest-Kette: 100 − 64 = 36, 36 − 32 = 4.'], explanation: `**Subtraktionsmethode:**
- 128 passt nicht → 0
- 64 passt → 1, Rest 36
- 32 passt → 1, Rest 4
- 16 → 0, 8 → 0
- 4 passt → 1, Rest 0
- 2 → 0, 1 → 0

→ **01100100** (Probe: 64 + 32 + 4 = 100)` },
    { id: 'm04-q017', kind: 'text', skill: 'bin.dec2bin', difficulty: 2, prompt: 'Wandle **37** in eine 8-stellige Binärzahl um.', accept: ['00100101'], misconceptions: [{ answer: '100101', error: 'bin-fuehrende-nullen', why: 'Wert richtig, aber auf 8 Stellen auffüllen: 00100101.' }, { answer: '10100100', error: 'bin-reihenfolge', why: 'Die Bits stehen rückwärts. Das höchstwertige Bit steht links.' }], hints: ['37 = 32 + 4 + 1'], explanation: '37 − 32 = 5 → 5 − 4 = 1 → 1 − 1 = 0. Einsen bei 32, 4 und 1 → **00100101**.' },
    { id: 'm04-q018', kind: 'number', skill: 'bin.powers', difficulty: 1, prompt: 'Wie viel ist **2¹⁰**?', answer: 1024, misconceptions: [{ answer: '20', error: 'bin-potenz', why: '2¹⁰ heißt 2 zehnmal mit sich selbst multipliziert, nicht 2 · 10.' }, { answer: '1000', error: 'einheit-1000-1024', why: '1000 ist 10³. 2¹⁰ ist 1024 – deshalb ist 1 KiB = 1024 Byte.' }], hints: ['2⁸ = 256 → zweimal verdoppeln.'], explanation: '2⁸ = 256 → 2⁹ = 512 → 2¹⁰ = **1024**.' },
    { id: 'm04-q019', kind: 'number', skill: 'bin.powers', difficulty: 1, prompt: 'Welches ist die **größte Zahl**, die sich mit **6 Bit** darstellen lässt?', answer: 63, misconceptions: [{ answer: '64', error: 'bin-potenz', why: 'Mit 6 Bit gibt es 64 **Werte** – sie reichen aber von 0 bis 63.' }], hints: ['Alle sechs Bits auf 1: 32 + 16 + 8 + 4 + 2 + 1.'], explanation: '2⁶ = 64 Werte, gezählt ab 0 → größter Wert **63** (= 111111).' },
    { id: 'm04-q020', kind: 'ip', skill: 'bin.bin2dec', difficulty: 2, prompt: 'Welche Subnetzmaske steht hier in Punktnotation? `11111111.11111111.11111000.00000000`', answer: '255.255.248.0', hints: ['11111000 = 128 + 64 + 32 + 16 + 8'], explanation: 'Oktett 3: 11111000 = 248 → **255.255.248.0** (8 + 8 + 5 = /21).' },
    { id: 'm04-q021', kind: 'number', skill: 'bin.powers', difficulty: 2, prompt: 'Wie viele **Einsen** hat die Maske 255.255.255.240 in Binärdarstellung?', answer: 28, hints: ['240 = 11110000'], explanation: '3 × 8 + 4 = **28** → /28.' },
    {
      id: 'm04-q022', kind: 'table', skill: 'bin.and', difficulty: 2,
      prompt: 'Berechne jeweils das **bitweise UND** (Ergebnis dezimal).',
      columns: [{ key: 'r', label: 'Ergebnis', type: 'number' }],
      rows: [
        { label: '77 UND 224', cells: { r: { answer: '64' } } },
        { label: '200 UND 192', cells: { r: { answer: '192' } } },
        { label: '15 UND 240', cells: { r: { answer: '0' } } },
        { label: '255 UND 248', cells: { r: { answer: '248' } } },
      ],
      hints: ['Beide Zahlen binär untereinanderschreiben; 1 nur dort, wo beide 1 sind.'],
      explanation: `\`\`\`
 77 = 01001101    200 = 11001000    15 = 00001111    255 = 11111111
224 = 11100000    192 = 11000000   240 = 11110000    248 = 11111000
UND = 01000000    UND = 11000000   UND = 00000000    UND = 11111000
    = 64              = 192            = 0               = 248
\`\`\`
Merke: UND mit 255 lässt einen Wert unverändert, UND mit 0 macht ihn zu 0.`,
    },
    { id: 'm04-q023', kind: 'free', skill: 'bin.placevalue', difficulty: 1, prompt: 'Erkläre, warum ein Oktett einer IPv4-Adresse höchstens den Wert **255** haben kann.', modelAnswer: 'Ein Oktett besteht aus 8 Bit. Jedes Bit kann 0 oder 1 sein, das ergibt 2⁸ = 256 verschiedene Kombinationen. Weil man bei 0 zu zählen beginnt (00000000 = 0), ist der größte Wert 11111111 = 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255.', keywords: ['8 Bit', '256', 'ab 0', '11111111'], hints: ['Wie viele Kombinationen gibt es mit 8 Bit, und womit beginnt man zu zählen?'], explanation: '256 Werte, beginnend bei 0 → höchster Wert 255.' },
    { id: 'm04-q024', kind: 'single', skill: 'bin.and', difficulty: 1, prompt: 'Wann ist das Ergebnis eines bitweisen UND an einer Stelle **1**?', options: ['Wenn mindestens eines der beiden Bits 1 ist', 'Wenn beide Bits 1 sind', 'Wenn beide Bits gleich sind', 'Wenn genau eines der beiden Bits 1 ist'], answer: 1, distractors: { '0': { why: 'Das ist das ODER (OR).', error: 'logik-und-oder' }, '2': { why: 'Bei 0 und 0 ist das UND-Ergebnis 0.', error: 'logik-und-oder' }, '3': { why: 'Das ist das exklusive ODER (XOR).', error: 'logik-und-oder' } }, explanation: 'UND (AND): nur **1 und 1 ergibt 1**, alle anderen Kombinationen ergeben 0.' },
    { id: 'm04-q025', kind: 'text', skill: 'bin.dec2bin', difficulty: 2, prompt: 'Schreibe die IPv4-Adresse **10.1.2.3** in binärer Punktnotation (4 × 8 Bit, durch Punkte getrennt).', accept: ['00001010.00000001.00000010.00000011', '00001010 00000001 00000010 00000011', '00001010000000010000001000000011'], misconceptions: [{ answer: '1010.1.10.11', error: 'bin-fuehrende-nullen', why: 'Jedes Oktett hat 8 Stellen – fülle mit führenden Nullen auf.' }], hints: ['10 = 8 + 2, 3 = 2 + 1.'], explanation: '10 = 00001010, 1 = 00000001, 2 = 00000010, 3 = 00000011 → **00001010.00000001.00000010.00000011**.' },
    { id: 'm04-q026', kind: 'match', skill: 'bin.bin2dec', difficulty: 1, prompt: 'Ordne die Binärzahlen ihrem Dezimalwert zu.', left: ['00001111', '11110000', '10000001', '01000000'], right: ['15', '240', '129', '64'], answer: [0, 1, 2, 3], explanation: '00001111 = 8+4+2+1 = 15 · 11110000 = 128+64+32+16 = 240 · 10000001 = 128+1 = 129 · 01000000 = 64.' },
    { id: 'm04-q027', kind: 'number', skill: 'bin.powers', difficulty: 2, prompt: 'Wie viele Bits braucht man mindestens, um **1000** verschiedene Werte darzustellen?', answer: 10, misconceptions: [{ answer: '9', error: 'bin-potenz', why: '2⁹ = 512 < 1000 – das reicht nicht.' }], hints: ['Suche das kleinste n mit 2ⁿ ≥ 1000.'], explanation: '2⁹ = 512 < 1000 ≤ 1024 = 2¹⁰ → **10 Bits**.' },
    { id: 'm04-q028', kind: 'order', skill: 'bin.bin2dec', difficulty: 1, prompt: 'Sortiere die Binärzahlen **aufsteigend** nach ihrem Wert (kleinste zuerst).', items: ['00011111', '00100000', '01000001', '10000000'], hints: ['Rechne alle vier in Dezimal um.'], explanation: '00011111 = 31 < 00100000 = 32 < 01000001 = 65 < 10000000 = 128. Trick: Die Zahl mit der am weitesten links stehenden 1 ist die größte.' },
  ],
};
