import type { Module } from '../types';

export const m03: Module = {
  id: 'm03',
  nr: 3,
  title: 'IPv4-Grundlagen',
  short: 'Aufbau von IPv4-Adressen, Netz- und Hostanteil, Masken, CIDR, Gateway.',
  icon: 'Hash',
  relevance: 'ap1',
  prerequisites: ['m04'],
  generators: ['ipv4.mask2prefix', 'ipv4.prefix2mask', 'ipv4.private'],
  skills: [
    { id: 'ipv4.structure', module: 'm03', title: 'Aufbau einer IPv4-Adresse' },
    { id: 'ipv4.netvshost', module: 'm03', title: 'Netzanteil und Hostanteil', requires: ['ipv4.structure'] },
    { id: 'ipv4.mask', module: 'm03', title: 'Subnetzmaske & CIDR-Notation', requires: ['ipv4.netvshost', 'bin.dec2bin'] },
    { id: 'ipv4.hostrange', module: 'm03', title: 'Hostbereich bestimmen', requires: ['ipv4.mask'] },
    { id: 'ipv4.private', module: 'm03', title: 'Private, öffentliche und spezielle Adressen' },
    { id: 'ipv4.gateway', module: 'm03', title: 'Standardgateway & Hostkonfiguration', requires: ['ipv4.netvshost'] },
    { id: 'ipv4.classes', module: 'm03', title: 'Historische Adressklassen' },
  ],
  lessons: [
    {
      id: 'm03-l01',
      title: 'Aufbau einer IPv4-Adresse',
      minutes: 12,
      relevance: 'ap1',
      skills: ['ipv4.structure'],
      simple: `Eine **IPv4-Adresse** ist wie eine Postanschrift für eine Netzwerkschnittstelle (den Netzwerkanschluss eines Geräts).
Sie besteht aus 32 Bit, also 32 Nullen und Einsen.
Damit man sie lesen kann, teilt man sie in vier Blöcke zu je 8 Bit, die **Oktette**, und schreibt jeden Block als Zahl von 0 bis 255 – getrennt durch Punkte, z. B. 192.168.10.21.
Eine Zahl über 255 gibt es in einem Oktett nicht, weil 8 Bit nur 256 Werte (0 bis 255) haben.

**Merke:** 4 Oktette × 8 Bit = 32 Bit, jedes Oktett liegt zwischen 0 und 255.`,
      steps: [
        {
          type: 'explain',
          title: '32 Bit in vier Oktetten',
          body: `Eine **IPv4-Adresse** ist eine **32 Bit** lange Zahl, die eine Netzwerkschnittstelle in einem IP-Netz eindeutig kennzeichnet – vergleichbar mit einer Postanschrift: Straße (Netz) und Hausnummer (Host).

Weil sich 32 Nullen und Einsen schlecht lesen lassen, teilt man sie in **vier Oktette à 8 Bit** und schreibt jedes Oktett als Dezimalzahl, getrennt durch Punkte – die **Punktnotation** (dotted decimal):

\`\`\`
11000000.10101000.00001010.00010101
   192  .   168  .   10   .   21
\`\`\`

Daraus folgt:

- Jedes Oktett liegt zwischen **0 und 255** (8 Bit → 2⁸ = 256 Werte).
- Insgesamt gibt es 2³² ≈ **4,29 Milliarden** IPv4-Adressen – zu wenige für das heutige Internet, deshalb gibt es NAT und IPv6.
- Eine Adresse wie \`192.168.1.300\` ist **ungültig** (300 > 255).

Wichtig: Die IP-Adresse gehört zur **Schnittstelle**, nicht zum Gerät. Ein Router mit drei Anschlüssen hat drei IP-Adressen – eine pro Netz, in das er reicht.`,
        },
        {
          type: 'visual',
          title: 'Eine Adresse – zwei Schreibweisen',
          widget: { kind: 'ip-binary', data: { ip: '192.168.10.21', editable: true } },
          caption: 'Ändere die Adresse und beobachte die Bits. Jedes Oktett ist genau ein Byte.',
        },
        {
          type: 'check',
          question: {
            id: 'm03-c01', kind: 'multi', skill: 'ipv4.structure', difficulty: 1,
            prompt: 'Welche der folgenden Angaben sind **gültige** IPv4-Adressen?',
            options: ['10.0.0.255', '192.168.1.256', '172.16.300.1', '8.8.4.4', '1.2.3'],
            answer: [0, 3],
            explanation: 'Jedes Oktett muss 0–255 sein und es müssen genau vier Oktette sein. 256 und 300 sind zu groß, „1.2.3“ hat nur drei Oktette.',
          },
        },
        { type: 'summary', points: ['IPv4: 32 Bit = 4 Oktette à 8 Bit.', 'Punktnotation: jedes Oktett 0–255.', 'Rund 4,3 Mrd. Adressen insgesamt.', 'Adresse gehört zur Schnittstelle.'] },
      ],
    },
    {
      id: 'm03-l02',
      title: 'Netzanteil und Hostanteil',
      minutes: 15,
      relevance: 'ap1',
      skills: ['ipv4.netvshost'],
      simple: `Eine IP-Adresse hat zwei Teile – wie eine Anschrift aus Straße und Hausnummer.
Der **Netzanteil** ist die Straße: Alle Geräte im selben Netz haben denselben.
Der **Hostanteil** ist die Hausnummer: Sie ist in dieser Straße einmalig.
Nachbarn in derselben Straße erreichst du direkt über den Switch, für eine andere Straße brauchst du einen Router.
Wo die Straße aufhört und die Hausnummer beginnt, verrät erst die Subnetzmaske.

**Merke:** Gleicher Netzanteil = gleiches Netz = direkte Verbindung ohne Router.`,
      steps: [
        {
          type: 'explain',
          title: 'Wer ist mein Nachbar?',
          body: `Jede IPv4-Adresse besteht aus zwei Teilen:

1. **Netzanteil** (vorne): kennzeichnet das Netz. Alle Geräte im selben Netz haben **denselben** Netzanteil.
2. **Hostanteil** (hinten): kennzeichnet das einzelne Gerät in diesem Netz. Er ist innerhalb eines Netzes **eindeutig**.

Wo die Grenze zwischen beiden Teilen liegt, steht **nicht** in der Adresse selbst. Dafür braucht man die **Subnetzmaske** (nächste Lektion).

**Praxisbeispiel – Elektro Krämer GmbH, Standort Hamburg:**

| Gerät | IP-Adresse | Netzanteil (/24) | Hostanteil |
|---|---|---|---|
| Router (Gateway) | 192.168.10.1 | 192.168.10 | 1 |
| Fileserver | 192.168.10.10 | 192.168.10 | 10 |
| PC Buchhaltung | 192.168.10.51 | 192.168.10 | 51 |
| Drucker | 192.168.10.200 | 192.168.10 | 200 |

Alle vier Geräte liegen im Netz **192.168.10.0/24** und können direkt (über den Switch) miteinander sprechen. Ein Gerät mit 192.168.**20**.5 läge in einem **anderen** Netz – dorthin geht es nur über einen **Router**.`,
        },
        {
          type: 'visual',
          title: 'Ein Netz – ein gemeinsamer Netzanteil',
          widget: {
            kind: 'topology',
            data: {
              nodes: [
                { id: 'r', type: 'router', label: 'Router', sub: '192.168.10.1', x: 400, y: 60 },
                { id: 's', type: 'switch', label: 'Switch', x: 400, y: 190 },
                { id: 'srv', type: 'server', label: 'Fileserver', sub: '192.168.10.10', x: 130, y: 330 },
                { id: 'pc', type: 'pc', label: 'PC', sub: '192.168.10.51', x: 330, y: 330 },
                { id: 'pr', type: 'printer', label: 'Drucker', sub: '192.168.10.200', x: 530, y: 330 },
                { id: 'lap', type: 'laptop', label: 'Laptop', sub: '192.168.10.52', x: 700, y: 330 },
              ],
              links: [
                { from: 'r', to: 's' }, { from: 's', to: 'srv' }, { from: 's', to: 'pc' }, { from: 's', to: 'pr' }, { from: 's', to: 'lap' },
              ],
              zones: [{ label: 'Netz 192.168.10.0/24', x: 40, y: 150, w: 740, h: 250, color: 'blue' }],
            },
          },
          caption: 'Alle Geräte teilen den Netzanteil 192.168.10 – nur der Hostanteil unterscheidet sie.',
        },
        {
          type: 'check',
          question: {
            id: 'm03-c02', kind: 'single', skill: 'ipv4.netvshost', difficulty: 1,
            prompt: 'PC A hat 192.168.10.51/24, PC B hat 192.168.11.51/24. Was gilt?',
            options: ['Beide sind im selben Netz, weil der Hostanteil gleich ist.', 'Sie liegen in verschiedenen Netzen; Kommunikation nur über einen Router.', 'Es gibt einen Adresskonflikt.', 'B ist die Broadcastadresse von A.'],
            answer: 1,
            distractors: { '0': { why: 'Entscheidend für die Netzzugehörigkeit ist der **Netzanteil** (192.168.10 vs. 192.168.11), nicht der Hostanteil.', error: 'netz-host-verwechselt' }, '2': { why: 'Ein Konflikt bestünde nur bei identischer Adresse im selben Netz.', error: 'adresskonflikt' }, '3': { why: 'Der Broadcast von 192.168.10.0/24 ist 192.168.10.255.', error: 'netz-broadcast-verwechselt' } },
            explanation: 'Bei /24 bilden die ersten drei Oktette den Netzanteil: 192.168.10 ≠ 192.168.11 → zwei Netze.',
          },
        },
        { type: 'summary', points: ['IP = Netzanteil + Hostanteil.', 'Gleicher Netzanteil = gleiches Netz = direkte Kommunikation.', 'Die Grenze bestimmt die Subnetzmaske.'] },
      ],
    },
    {
      id: 'm03-l02b',
      title: 'Was ist eine Subnetzmaske? 255.255.255.0 von Grund auf',
      minutes: 25,
      relevance: 'ap1',
      skills: ['ipv4.mask', 'ipv4.netvshost'],
      simple: `Die **Subnetzmaske** ist eine Schablone, die du über die IP-Adresse legst – wie bei einer Telefonnummer: Die Vorwahl nennt den Ort, der Rest den Anschluss.
Steht in der Maske **255**, gehört dieses Oktett zur „Vorwahl“, also zum Netz.
Steht dort **0**, gehört es zum Gerät (Host).
Bei 255.255.255.0 sind also die ersten drei Zahlen das Netz und die letzte das Gerät.
Binär ist 255 einfach 11111111 (acht Einsen) – deshalb schreibt man kurz **/24** für 24 Einsen.

**Merke:** 255 = Netz, 0 = Gerät; /24 = 255.255.255.0 = 254 nutzbare Geräteadressen.`,
      steps: [
        {
          type: 'explain',
          title: 'Die Frage, die jeder PC ständig beantworten muss',
          body: `Bevor ein PC ein Paket verschickt, muss er eine einzige Frage beantworten:

> **„Ist der Empfänger in meinem eigenen Netz – oder muss ich das Paket an den Router geben?“**

Die IP-Adresse allein beantwortet das nicht. \`192.168.10.51\` sagt nicht, wo „Netz“ aufhört und „Gerät“ anfängt. Genau dafür gibt es die **Subnetzmaske**.

**Eine Analogie – Telefonnummern:** \`0261 12345\` – die Vorwahl \`0261\` steht für Koblenz (das „Netz“), \`12345\` für den einzelnen Anschluss (das „Gerät“). Alle Anschlüsse in Koblenz haben dieselbe Vorwahl. Bei Telefonnummern erkennst du die Grenze am Leerzeichen. Bei IP-Adressen gibt es kein Leerzeichen – stattdessen gibt es die Maske, die sagt: **„Die ersten X Stellen sind die Vorwahl.“**

**Die Maske ist eine Schablone.** Sie hat dasselbe Format wie eine IP-Adresse (vier Zahlen mit Punkten), aber eine ganz andere Bedeutung. Lies sie Oktett für Oktett:

| Maskenoktett | Bedeutung |
|---|---|
| **255** | „Dieses Oktett gehört komplett zum **Netz** (Vorwahl).“ |
| **0** | „Dieses Oktett gehört komplett zum **Gerät** (Host).“ |

Also bei **255.255.255.0**:

| | 1. Oktett | 2. Oktett | 3. Oktett | 4. Oktett |
|---|---|---|---|---|
| IP-Adresse | 192 | 168 | 10 | 51 |
| Maske | **255** | **255** | **255** | **0** |
| bedeutet | Netz | Netz | Netz | Gerät |

→ Netz: **192.168.10**, Gerät Nummer **51**. Jeder PC, dessen Adresse mit 192.168.10 beginnt, ist ein direkter Nachbar.`,
        },
        {
          type: 'explain',
          title: 'Warum ausgerechnet 255?',
          body: `Hier kommt das Binärsystem ins Spiel (Modul „Binärsystem“). 255 ist die größte Zahl, die in ein Oktett passt – binär sind das **acht Einsen**:

\`\`\`
255 = 11111111
  0 = 00000000
\`\`\`

Die Maske 255.255.255.0 sieht binär so aus:

\`\`\`
11111111.11111111.11111111.00000000
|------- 24 Einsen = Netz -------||- 8 Nullen = Gerät -|
\`\`\`

Der Computer liest die Maske **Bit für Bit**: Eine **1** heißt „dieses Bit gehört zum Netz“, eine **0** heißt „dieses Bit gehört zum Gerät“. Die Einsen stehen immer **links und lückenlos**, danach kommen nur noch Nullen.

Weil nur die Anzahl der Einsen zählt, gibt es eine Kurzschreibweise: **/24** („Slash 24“) = 24 Einsen = 255.255.255.0. Das nennt man **CIDR-Notation**.

| Schreibweise | Maske | Einsen | Netz-Oktette |
|---|---|---|---|
| /8 | 255.0.0.0 | 8 | 1 |
| /16 | 255.255.0.0 | 16 | 2 |
| /24 | 255.255.255.0 | 24 | 3 |

**Wie viele Geräte passen in ein /24?** Für Geräte bleiben 8 Bit (die Nullen). 8 Bit ergeben 2⁸ = **256** Kombinationen (0 bis 255). Zwei davon sind reserviert: die **.0** (bezeichnet das Netz selbst) und die **.255** (Broadcast = „an alle“). Bleiben **254** Geräte.

**Und was ist mit Masken wie 255.255.255.192?** Dann ist auch das vierte Oktett *teilweise* Netz: 192 = \`11000000\` → zwei weitere Netz-Bits. Das ist der Kern von **Subnetting** – und genau dorthin führt dich der Weg Schritt für Schritt.`,
        },
        {
          type: 'visual',
          title: 'Sieh dir die Schablone an',
          widget: { kind: 'ip-binary', data: { ip: '192.168.10.51', prefix: 24, editable: true } },
          caption: 'Blau = Netzbits (Maske 1), Orange = Gerätebits (Maske 0). Stell den Regler auf /16 und auf /8: Die Grenze wandert jeweils um ein ganzes Oktett. Stell ihn danach auf /26 – jetzt liegt die Grenze mitten im letzten Oktett.',
        },
        {
          type: 'example',
          title: 'Sind diese zwei PCs Nachbarn?',
          problem: 'PC A: 192.168.10.51, PC B: 192.168.10.200 – beide mit Maske 255.255.255.0. Können sie direkt (ohne Router) miteinander sprechen?',
          steps: [
            { label: 'Maske lesen', body: '255.255.255.0 → die ersten **drei** Oktette sind Netz.' },
            { label: 'Netzteil von A', body: '192.168.10' },
            { label: 'Netzteil von B', body: '192.168.10' },
            { label: 'Vergleich', body: 'gleich → **dasselbe Netz**' },
          ],
          result: 'Ja – beide liegen im Netz 192.168.10.0/24 und erreichen sich direkt über den Switch. Wäre B 192.168.11.200, bräuchte es einen Router.',
        },
        {
          type: 'check',
          question: {
            id: 'm03-c10', kind: 'single', skill: 'ipv4.netvshost', difficulty: 1,
            prompt: 'Was sagt dir die Maske **255.255.0.0** bei der Adresse 172.16.5.20?',
            options: ['172 ist das Netz, 16.5.20 das Gerät', '172.16 ist das Netz, 5.20 kennzeichnet das Gerät', '172.16.5 ist das Netz, 20 das Gerät', 'Die Maske ist ungültig'],
            answer: 1,
            distractors: {
              '0': { why: 'Das wäre 255.0.0.0 (/8) – nur ein 255er-Oktett.', error: 'maske-lesen' },
              '2': { why: 'Das wäre 255.255.255.0 (/24) – drei 255er-Oktette.', error: 'maske-lesen' },
              '3': { why: '255.255.0.0 ist eine ganz normale Maske (/16).', error: 'maske-lesen' },
            },
            explanation: 'Zwei Oktette mit 255 → die ersten zwei Oktette (172.16) sind Netz, die letzten zwei (5.20) Gerät. Das ist /16.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'm03-c11', kind: 'number', skill: 'ipv4.mask', difficulty: 1,
            prompt: 'Wie viele **Einsen** hat die Maske 255.255.255.0 in Binärdarstellung?',
            answer: 24,
            hints: ['Jedes 255 = 8 Einsen.'],
            explanation: '3 × 8 = **24** → deshalb schreibt man /24.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'm03-c12', kind: 'number', skill: 'ipv4.hostrange', difficulty: 1,
            prompt: 'Wie viele Geräte kannst du im Netz 192.168.10.0 mit Maske 255.255.255.0 adressieren?',
            answer: 254,
            misconceptions: [{ answer: '256', error: 'reservierte-vergessen', why: '256 Adressen gibt es, aber .0 (Netz) und .255 (Broadcast) sind reserviert.' }, { answer: '255', error: 'reservierte-vergessen', why: 'Es sind zwei reservierte Adressen: .0 und .255.' }],
            explanation: '8 Gerätebits → 256 Adressen − 2 reservierte = **254**.',
          },
        },
        {
          type: 'summary',
          points: [
            'Die Subnetzmaske ist eine Schablone: sie trennt Netzanteil (Vorwahl) und Geräteanteil.',
            '255 = 11111111 = „ganzes Oktett ist Netz“, 0 = „ganzes Oktett ist Gerät“.',
            'Einsen stehen immer links und lückenlos; /24 = 24 Einsen = 255.255.255.0.',
            'Gleicher Netzanteil ⇒ direkte Nachbarn; sonst über den Router (Gateway).',
            '/24: 256 Adressen, davon 254 für Geräte (.0 = Netz, .255 = Broadcast).',
          ],
        },
      ],
    },
    {
      id: 'm03-l03',
      title: 'Subnetzmaske und CIDR-Notation',
      minutes: 20,
      relevance: 'ap1',
      skills: ['ipv4.mask'],
      simple: `Eine Maske besteht immer zuerst aus Einsen und dann aus Nullen – wie ein Lineal, auf dem ein Strich markiert, wo das Netz endet.
Die Einsen links sind der Netzanteil, die Nullen rechts der Hostanteil.
Weil nur die Anzahl der Einsen zählt, schreibt man kurz **/n** (CIDR-Schreibweise, gesprochen „Slash n“).
Zum Umrechnen zählst du: Jedes 255 bringt 8 Einsen, ein Teilwert wie 224 (= 11100000) bringt 3.
Beispiel: 255.255.255.224 = 8 + 8 + 8 + 3 = /27.

**Merke:** /n = Anzahl der Einsen in der Maske; Hostbits = 32 − n.`,
      steps: [
        {
          type: 'explain',
          title: 'Die Maske zieht die Grenze',
          body: `Die **Subnetzmaske** ist ebenfalls eine 32-Bit-Zahl. Sie besteht **von links** aus lauter **Einsen** (= Netzbits) und danach aus lauter **Nullen** (= Hostbits). Einsen und Nullen sind nie gemischt.

\`\`\`
IP:     11000000.10101000.00001010.00010101   192.168.10.21
Maske:  11111111.11111111.11111111.00000000   255.255.255.0
        |------- Netzanteil (24) --------|-Host(8)-|
\`\`\`

Weil nur die **Anzahl der Einsen** zählt, schreibt man die Maske kürzer in **CIDR-Notation** (Classless Inter-Domain Routing): \`/24\` bedeutet „24 Einsen“. Die vollständige Angabe lautet dann \`192.168.10.21/24\`.

**Umrechnung Maske → Präfix:** Einsen zählen. Jedes \`255\` bringt 8 Einsen, das Teiloktett liest du aus der Tabelle der Maskenwerte ab (128=1, 192=2, 224=3, 240=4, 248=5, 252=6, 254=7).

| Maske | Rechnung | Präfix |
|---|---|---|
| 255.0.0.0 | 8 | /8 |
| 255.255.0.0 | 8+8 | /16 |
| 255.255.255.0 | 8+8+8 | /24 |
| 255.255.255.192 | 24 + 2 | /26 |
| 255.255.240.0 | 16 + 4 | /20 |
| 255.255.255.252 | 24 + 6 | /30 |

**Hostbits** = 32 − Präfix. Daraus folgt die Netzgröße: 2^Hostbits Adressen.`,
        },
        {
          type: 'visual',
          title: 'Präfix verschieben – Grenze verschieben',
          widget: { kind: 'ip-binary', data: { ip: '192.168.10.21', prefix: 24, editable: true } },
          caption: 'Verändere das Präfix mit dem Schieberegler: Blau = Netzbits, Orange = Hostbits. Die Maske darunter ändert sich mit.',
        },
        {
          type: 'example',
          title: 'Maske 255.255.255.224 in CIDR',
          problem: 'Gib 255.255.255.224 als Präfix an und bestimme die Anzahl der Hostbits.',
          steps: [
            { label: 'Volle Oktette', body: '255.255.255 → 3 × 8 = 24 Einsen' },
            { label: 'Teiloktett', body: '224 = 11100000 → 3 Einsen' },
            { label: 'Summe', body: '24 + 3 = **27**' },
            { label: 'Hostbits', body: '32 − 27 = **5** → 2⁵ = 32 Adressen' },
          ],
          result: '255.255.255.224 = **/27**, 5 Hostbits, 32 Adressen (30 nutzbar).',
        },
        {
          type: 'check',
          question: { id: 'm03-c03', kind: 'cidr', skill: 'ipv4.mask', difficulty: 1, prompt: 'Welches Präfix entspricht **255.255.255.240**?', answer: '/28', hints: ['240 = 11110000'], explanation: '24 + 4 = **/28**.' },
        },
        {
          type: 'check',
          question: { id: 'm03-c04', kind: 'ip', skill: 'ipv4.mask', difficulty: 2, prompt: 'Wie lautet die Maske zu **/21**?', answer: '255.255.248.0', hints: ['16 Einsen in den ersten beiden Oktetten, 5 im dritten.'], explanation: '/21 = 8 + 8 + 5 → 255.255.**248**.0 (11111000 = 248).' },
        },
        { type: 'practice', title: 'Übung: Masken umrechnen', generator: 'ipv4.mask2prefix', count: 4, difficulty: 2 },
        { type: 'summary', points: ['Maske: Einsen = Netzbits (links), Nullen = Hostbits (rechts).', 'CIDR /n = Anzahl der Einsen.', 'Hostbits = 32 − n, Adressen = 2^Hostbits.'] },
      ],
    },
    {
      id: 'm03-l04',
      title: 'Netzadresse, Broadcast und Hostbereich',
      minutes: 20,
      relevance: 'ap1',
      skills: ['ipv4.hostrange'],
      simple: `In jedem Netz sind zwei Adressen für Sonderaufgaben reserviert – wie das Straßenschild und die Lautsprecherdurchsage einer Straße.
Die **erste** Adresse (alle Hostbits 0) ist die **Netzadresse**, der Name des Netzes selbst.
Die **letzte** Adresse (alle Hostbits 1) ist die **Broadcastadresse** – sie erreicht alle Geräte im Netz auf einmal.
Keine der beiden darfst du einem Gerät geben.
Darum ist die Zahl der nutzbaren Adressen immer 2 hoch Hostbits minus 2.

**Merke:** Nutzbare Hosts = 2^h − 2; erster Host = Netzadresse + 1, letzter Host = Broadcast − 1.`,
      steps: [
        {
          type: 'explain',
          title: 'Zwei Adressen sind reserviert',
          body: `In jedem klassischen IPv4-Subnetz haben die **erste** und die **letzte** Adresse eine Sonderrolle:

| Adresse | Hostbits | Bedeutung |
|---|---|---|
| **Netzadresse** | alle **0** | bezeichnet das Netz selbst (z. B. in Routingtabellen) – keinem Gerät zuweisbar |
| **Broadcastadresse** | alle **1** | „an alle“ im Netz – keinem Gerät zuweisbar |
| dazwischen | gemischt | **nutzbare Hostadressen** |

Deshalb gilt die wichtigste Formel der IPv4-Adressierung:

> **Nutzbare Hosts = 2^Hostbits − 2**

**Beispiel /24 (8 Hostbits):**

- Netzadresse: \`192.168.10.0\`
- Erster Host: \`192.168.10.1\`
- Letzter Host: \`192.168.10.254\`
- Broadcast: \`192.168.10.255\`
- Nutzbar: 2⁸ − 2 = **254**

**Beispiel /16 (16 Hostbits):** \`172.16.0.0\` bis \`172.16.255.255\`, nutzbar 2¹⁶ − 2 = **65.534**. Achtung: Hier ist z. B. \`172.16.1.0\` eine **ganz normale Hostadresse**, denn nur wenn **alle 16** Hostbits 0 sind, ist es die Netzadresse.

*Sonderfälle (für später):* /31 wird nach RFC 3021 für Punkt-zu-Punkt-Links ohne Netz-/Broadcastadresse genutzt (2 Adressen), /32 bezeichnet einen einzelnen Host.`,
        },
        {
          type: 'visual',
          title: 'Reservierte Adressen im Balken',
          widget: { kind: 'subnet-bar', data: { network: '192.168.10.0', prefix: 24, minPrefix: 24, maxPrefix: 24, locked: true } },
          caption: 'Die erste (Netz) und letzte (Broadcast) Adresse sind markiert; alles dazwischen kann an Geräte vergeben werden.',
        },
        {
          type: 'check',
          question: { id: 'm03-c05', kind: 'ip', skill: 'ipv4.hostrange', difficulty: 1, prompt: 'Wie lautet die **letzte nutzbare Hostadresse** im Netz 10.20.30.0/24?', answer: '10.20.30.254', misconceptions: [{ answer: '10.20.30.255', error: 'broadcast-letzter-host', why: '.255 ist der Broadcast. Der letzte Host ist eine Adresse kleiner.' }], explanation: 'Broadcast 10.20.30.255 − 1 = **10.20.30.254**.' },
        },
        {
          type: 'check',
          question: { id: 'm03-c06', kind: 'single', skill: 'ipv4.hostrange', difficulty: 2, prompt: 'Ist **172.16.4.0/16** als Adresse für einen Server verwendbar?', options: ['Nein, eine Adresse mit .0 am Ende ist immer eine Netzadresse.', 'Ja, denn bei /16 ist nur 172.16.0.0 die Netzadresse.', 'Nein, das ist die Broadcastadresse.'], answer: 1, distractors: { '0': { why: 'Netzadresse heißt: **alle Hostbits** sind 0. Bei /16 sind das die letzten 16 Bits – bei 172.16.4.0 ist das dritte Oktett 4, also nicht alle 0.', error: 'netz-oktettgrenze' }, '2': { why: 'Broadcast von 172.16.0.0/16 ist 172.16.255.255.', error: 'netz-broadcast-verwechselt' } }, explanation: 'Bei /16 umfasst das Netz 172.16.0.0 – 172.16.255.255. 172.16.4.0 ist eine normale Hostadresse.' },
        },
        { type: 'summary', points: ['Netzadresse: Hostbits alle 0. Broadcast: Hostbits alle 1.', 'Nutzbare Hosts = 2^h − 2.', 'Erster Host = Netz + 1, letzter Host = Broadcast − 1.'] },
      ],
    },
    {
      id: 'm03-l05',
      title: 'Private, öffentliche und spezielle Adressen',
      minutes: 15,
      relevance: 'ap1',
      skills: ['ipv4.private'],
      simple: `**Private Adressen** sind wie Zimmernummern im Hotel: Jedes Hotel hat ein Zimmer 101, aber von außen erreicht dich niemand unter „Zimmer 101“.
**Öffentliche Adressen** sind dagegen wie die Hotelanschrift – weltweit einmalig.
Private Bereiche: 10.0.0.0/8, 172.16.0.0/12 (bis 172.31.255.255) und 192.168.0.0/16.
Ins Internet kommen private Geräte nur über **NAT** (Network Address Translation, Adressübersetzung): Der Router setzt seine öffentliche Adresse ein – wie die Rezeption, die Post für alle Zimmer annimmt.
Sonderfälle: 127.0.0.1 ist der eigene Rechner (Loopback), 169.254.x.x heißt „kein DHCP-Server gefunden“.

**Merke:** Privat = 10/8, 172.16/12, 192.168/16; 169.254.x.x deutet auf ein DHCP-Problem.`,
      steps: [
        {
          type: 'explain',
          title: 'Nicht jede Adresse ist im Internet erreichbar',
          body: `**Öffentliche Adressen** sind weltweit eindeutig und werden von der IANA über regionale Registries (für Europa: RIPE NCC) an Provider vergeben. Sie werden im Internet geroutet.

**Private Adressen** (RFC 1918) darf jeder in seinem eigenen Netz verwenden. Internet-Router verwerfen sie. Für den Internetzugang übersetzt der Router sie per **NAT** in eine öffentliche Adresse.

| Bereich | CIDR | von – bis | typisch für |
|---|---|---|---|
| 10.0.0.0 | /8 | 10.0.0.0 – 10.255.255.255 | große Unternehmen |
| 172.16.0.0 | /12 | 172.16.0.0 – **172.31**.255.255 | mittlere Netze |
| 192.168.0.0 | /16 | 192.168.0.0 – 192.168.255.255 | kleine Netze, Heimnetz |

Achtung Prüfungsfalle: **172.32.0.1** ist **nicht** privat – der Bereich endet bei 172.31.255.255.

So kannst du dir die Größen merken: **172.16.0.0/12** sind **16 aufeinanderfolgende /16-Netze** (früher „Klasse-B-Netze“: 172.16 bis 172.31), **192.168.0.0/16** sind **256 /24-Netze** (früher „Klasse-C-Netze“: 192.168.0 bis 192.168.255).

**Weitere spezielle Bereiche:**

| Bereich | Bedeutung |
|---|---|
| 127.0.0.0/8 | **Loopback** – 127.0.0.1 = „ich selbst“ (localhost) |
| 169.254.0.0/16 | **APIPA / Link-Local** – Windows vergibt sich so eine Adresse, wenn kein DHCP-Server antwortet → typisches Fehlersymptom! |
| 0.0.0.0 | „unbekannt / dieses Netz“, als Route 0.0.0.0/0 = Default Route |
| 255.255.255.255 | limitierter Broadcast im lokalen Netz |
| 224.0.0.0/4 | Multicast |
| 100.64.0.0/10 | Carrier-Grade-NAT bei Providern |`,
        },
        {
          type: 'check',
          question: { id: 'm03-c07', kind: 'single', skill: 'ipv4.private', difficulty: 2, prompt: 'Ein Kollege meldet: „Mein PC hat die Adresse **169.254.23.7** und ich komme nicht ins Netz.“ Was ist die wahrscheinlichste Ursache?', options: ['Die Firewall blockiert das Internet.', 'Der PC hat keine Antwort von einem DHCP-Server erhalten.', 'Der DNS-Server ist ausgefallen.', 'Die Adresse ist öffentlich und wird geblockt.'], answer: 1, distractors: { '0': { why: 'Eine Firewall-Sperre ändert nicht die IP-Adresse des Clients.', error: 'apipa' }, '2': { why: 'DNS-Probleme führen nicht zu einer 169.254er-Adresse; die IP-Konfiguration wäre sonst korrekt.', error: 'apipa' }, '3': { why: '169.254.0.0/16 ist kein öffentlicher Bereich, sondern APIPA (Link-Local).', error: 'apipa' } }, explanation: '169.254.x.x (APIPA) vergibt sich Windows selbst, wenn kein DHCP-Server erreichbar ist. Prüfe Kabel/WLAN, VLAN-Zuordnung und DHCP-Server.' },
        },
        { type: 'practice', title: 'Übung: private Adressen erkennen', generator: 'ipv4.private', count: 3, difficulty: 2 },
        { type: 'summary', points: ['Privat (RFC 1918): 10/8, 172.16/12 (bis 172.31), 192.168/16.', '127.0.0.1 = Loopback.', '169.254.x.x = APIPA → DHCP-Problem.', 'Private Adressen brauchen NAT für das Internet.'] },
      ],
    },
    {
      id: 'm03-l06',
      title: 'Standardgateway und Hostkonfiguration',
      minutes: 15,
      relevance: 'ap1',
      skills: ['ipv4.gateway'],
      simple: `Ein PC braucht vier Angaben: IP-Adresse, Subnetzmaske, Standardgateway und DNS-Server.
Das **Standardgateway** ist der Router im eigenen Netz – wie die Poststelle im Ort, über die alle Briefe in andere Städte gehen.
Liegt das Ziel im eigenen Netz, schickt der PC direkt; liegt es woanders, gibt er das Paket ans Gateway.
Deshalb muss das Gateway im selben Netz liegen wie der PC.
Ist es falsch eingetragen, erreichst du nur noch die Nachbarn im eigenen Netz.

**Merke:** Gateway = Router-Adresse im eigenen Subnetz; falsches Gateway → nur das lokale Netz ist erreichbar.`,
      steps: [
        {
          type: 'explain',
          title: 'Vier Angaben für einen funktionierenden Client',
          body: `Damit ein PC im Netzwerk und im Internet arbeiten kann, braucht er vier Angaben – entweder **statisch** eingetragen oder per **DHCP** zugewiesen:

| Angabe | Wozu? | Beispiel |
|---|---|---|
| IP-Adresse | eigene Adresse | 192.168.10.51 |
| Subnetzmaske | Wo endet mein Netz? | 255.255.255.0 |
| **Standardgateway** | An wen schicke ich Pakete für **fremde** Netze? | 192.168.10.1 |
| DNS-Server | Wer übersetzt Namen in IP-Adressen? | 192.168.10.10 |

Das **Standardgateway** ist die IP-Adresse der Router-Schnittstelle **im eigenen Netz**. Es **muss** im selben Subnetz liegen wie der Client – sonst kann der Client es gar nicht direkt erreichen.

**Ablauf beim Senden:**
1. Ziel-IP UND eigene Maske vs. eigene IP UND eigene Maske.
2. Gleich → Ziel liegt lokal → ARP nach der Ziel-MAC → direkt senden.
3. Verschieden → ARP nach der MAC des **Gateways** → Paket an das Gateway, das weiterroutet.

**Typischer Fehler:** Gateway falsch eingetragen → lokale Geräte erreichbar, aber nichts außerhalb des eigenen Netzes.

Konvention in vielen Firmen: Gateway = erste nutzbare Adresse (.1) oder letzte (.254). Das ist **keine technische Pflicht**, nur eine Absprache.`,
        },
        {
          type: 'check',
          question: { id: 'm03-c08', kind: 'single', skill: 'ipv4.gateway', difficulty: 2, prompt: 'Ein PC ist konfiguriert mit 192.168.50.20/26 und Gateway 192.168.50.70. Was ist das Problem?', options: ['Kein Problem.', 'Das Gateway liegt nicht im Subnetz des PCs (192.168.50.0 – .63).', 'Das Gateway muss immer .1 sein.', 'Die Maske /26 ist für Clients unzulässig.'], answer: 1, distractors: { '0': { why: 'Bei /26 reicht das Netz des PCs nur bis .63. .70 liegt im nächsten Subnetz.', error: 'gateway-anderes-netz' }, '2': { why: '.1 ist nur eine verbreitete Konvention, keine Regel.', error: 'gateway-konvention' }, '3': { why: 'Jede passende Maske ist zulässig.', error: 'gateway-anderes-netz' } }, explanation: '192.168.50.20/26 → Netz .0, Broadcast .63. Das Gateway .70 ist so nicht direkt erreichbar → keine Verbindung in andere Netze.' },
        },
        { type: 'summary', points: ['IP, Maske, Gateway, DNS – statisch oder per DHCP.', 'Gateway = Router-IP im eigenen Subnetz.', 'Falsches Gateway → nur lokales Netz erreichbar.'] },
      ],
    },
    {
      id: 'm03-l07',
      title: 'Historische Adressklassen (A, B, C)',
      minutes: 8,
      relevance: 'ap1-teilweise',
      skills: ['ipv4.classes'],
      simple: `Früher gab es IP-Netze nur in festen Größen – wie Kleidung nur in S, M und L.
**Klasse A** (erstes Oktett 1–126) war riesig (/8), **Klasse B** (128–191) mittel (/16), **Klasse C** (192–223) klein (/24).
Wer 300 Geräte hatte, musste ein Klasse-B-Netz mit über 65.000 Adressen nehmen – eine riesige Verschwendung.
Seit 1993 gilt deshalb **CIDR** (Classless Inter-Domain Routing): Die Netzgrenze darf an jeder Bitstelle liegen – Kleidung nach Maß.

**Merke:** Klasse am ersten Oktett: A 1–126, B 128–191, C 192–223 – heute nur noch als Begriff gebräuchlich.`,
      steps: [
        {
          type: 'explain',
          title: 'Warum man heute CIDR nutzt',
          body: `Früher wurde der Adressraum **klassenbasiert** (classful) aufgeteilt. Die Klasse ergab sich aus dem ersten Oktett:

| Klasse | 1. Oktett | Standardmaske | Größe eines Netzes |
|---|---|---|---|
| A | 1 – 126 (127 = Loopback) | /8 | 2²⁴ = 16.777.216 Adressen (16.777.214 nutzbare Hosts) |
| B | 128 – 191 | /16 | 2¹⁶ = 65.536 Adressen (65.534 nutzbare Hosts) |
| C | 192 – 223 | /24 | 2⁸ = 256 Adressen (254 nutzbare Hosts) |
| D | 224 – 239 | – | Multicast |
| E | 240 – 255 | – | reserviert |

Problem: Eine Firma mit 300 Geräten brauchte ein Klasse-B-Netz mit 65.534 Adressen – riesige Verschwendung. Seit 1993 gilt daher **CIDR**: Die Netzgrenze kann an **jeder** Bitposition liegen. Die Klassen sind heute nur noch als Begriff („ein Klasse-C-Netz“ = /24) gebräuchlich und tauchen gelegentlich in Prüfungen auf.`,
        },
        {
          type: 'check',
          question: { id: 'm03-c09', kind: 'single', skill: 'ipv4.classes', difficulty: 1, prompt: 'Zu welcher historischen Klasse gehört 172.20.1.1?', options: ['A', 'B', 'C', 'D'], answer: 1, explanation: '1. Oktett 172 liegt in 128–191 → **Klasse B**.' },
        },
        { type: 'summary', points: ['Klassen A/B/C über das 1. Oktett.', 'Heute gilt CIDR – Grenzen an beliebiger Bitposition.'] },
      ],
    },
  ],
  questions: [
    { id: 'm03-q001', kind: 'number', skill: 'ipv4.structure', difficulty: 1, prompt: 'Aus wie vielen Bits besteht eine IPv4-Adresse?', answer: 32, explanation: '4 Oktette × 8 Bit = **32 Bit**.' },
    { id: 'm03-q002', kind: 'single', skill: 'ipv4.structure', difficulty: 1, prompt: 'Welcher Wertebereich gilt für ein Oktett?', options: ['0 – 128', '0 – 255', '1 – 256', '0 – 999'], answer: 1, explanation: '8 Bit → 2⁸ = 256 Werte → 0 bis 255.' },
    { id: 'm03-q003', kind: 'cidr', skill: 'ipv4.mask', difficulty: 1, prompt: 'Präfix zu 255.255.0.0?', answer: '/16', explanation: '2 × 8 = 16.' },
    { id: 'm03-q004', kind: 'cidr', skill: 'ipv4.mask', difficulty: 2, prompt: 'Präfix zu 255.255.255.248?', answer: '/29', explanation: '24 + 5 (248 = 11111000) = **/29**.' },
    { id: 'm03-q005', kind: 'ip', skill: 'ipv4.mask', difficulty: 2, prompt: 'Maske zu /19?', answer: '255.255.224.0', explanation: '16 + 3 → drittes Oktett 11100000 = 224.' },
    { id: 'm03-q006', kind: 'single', skill: 'ipv4.mask', difficulty: 2, prompt: 'Welche Maske ist **ungültig**?', options: ['255.255.255.128', '255.255.254.0', '255.255.255.100', '255.240.0.0'], answer: 2, distractors: { '0': { why: '128 = 10000000 ist gültig (/25).', error: 'maske-gueltig' }, '1': { why: '254 = 11111110 → /23, gültig.', error: 'maske-gueltig' }, '3': { why: '240 = 11110000 → /12, gültig.', error: 'maske-gueltig' } }, explanation: '100 = 01100100 – Einsen und Nullen gemischt → keine gültige Maske.' },
    { id: 'm03-q007', kind: 'multi', skill: 'ipv4.private', difficulty: 2, prompt: 'Welche Adressen sind privat nach RFC 1918?', options: ['10.250.3.4', '172.31.200.1', '172.32.0.5', '192.168.200.200', '169.254.1.1', '192.169.1.1'], answer: [0, 1, 3], explanation: '172.32.x.x liegt außerhalb von 172.16.0.0/12, 169.254.x.x ist APIPA (nicht RFC 1918), 192.169.x.x ist öffentlich.' },
    { id: 'm03-q008', kind: 'text', skill: 'ipv4.private', difficulty: 1, prompt: 'Welche IPv4-Adresse verwendet man typischerweise als Loopback-Adresse (localhost)?', accept: ['127.0.0.1'], explanation: '127.0.0.1 – der gesamte Bereich 127.0.0.0/8 ist für Loopback reserviert.' },
    { id: 'm03-q009', kind: 'match', skill: 'ipv4.private', difficulty: 2, prompt: 'Ordne die Bereiche ihrer Bedeutung zu.', left: ['127.0.0.0/8', '169.254.0.0/16', '224.0.0.0/4', '192.168.0.0/16'], right: ['Loopback', 'APIPA / Link-Local', 'Multicast', 'privat (RFC 1918)'], answer: [0, 1, 2, 3], explanation: 'Siehe Lektion „Private, öffentliche und spezielle Adressen“.' },
    { id: 'm03-q010', kind: 'table', skill: 'ipv4.hostrange', difficulty: 1, prompt: 'Fülle die Tabelle für das Netz **10.5.7.0/24** aus.', columns: [{ key: 'first', label: 'Erster Host', type: 'ip' }, { key: 'last', label: 'Letzter Host', type: 'ip' }, { key: 'bc', label: 'Broadcast', type: 'ip' }, { key: 'n', label: 'Nutzbare Hosts', type: 'number' }], rows: [{ label: '10.5.7.0/24', cells: { first: { answer: '10.5.7.1' }, last: { answer: '10.5.7.254' }, bc: { answer: '10.5.7.255' }, n: { answer: '254' } } }], misconceptions: [{ cell: 'n', answer: '256', error: 'reservierte-vergessen', why: '256 Adressen, davon 2 reserviert → 254.' }], explanation: '/24: 8 Hostbits, 256 Adressen, 254 nutzbar.' },
    { id: 'm03-q011', kind: 'number', skill: 'ipv4.hostrange', difficulty: 2, prompt: 'Wie viele Hosts sind im Netz 172.16.0.0/16 nutzbar?', answer: 65534, explanation: '2¹⁶ − 2 = **65.534**.' },
    { id: 'm03-q012', kind: 'single', skill: 'ipv4.gateway', difficulty: 1, prompt: 'Wofür benötigt ein Client das Standardgateway?', options: ['Für die Namensauflösung', 'Für die Kommunikation mit Geräten außerhalb des eigenen Subnetzes', 'Für die automatische Adressvergabe', 'Um Broadcasts zu senden'], answer: 1, distractors: { '0': { why: 'Namensauflösung übernimmt der DNS-Server.', error: 'gateway-dns-verwechselt' }, '2': { why: 'Adressvergabe macht DHCP.', error: 'gateway-dhcp-verwechselt' }, '3': { why: 'Broadcasts bleiben im lokalen Netz und brauchen kein Gateway.', error: 'gateway-broadcast' } }, explanation: 'Pakete an fremde Netze gehen an das Gateway (Router), das sie weiterleitet.' },
    { id: 'm03-q013', kind: 'free', skill: 'ipv4.gateway', difficulty: 2, prompt: 'Ein Mitarbeiter kann den Fileserver im eigenen Netz erreichen, aber keine Webseiten im Internet aufrufen und auch keinen Server am Standort Berlin anpingen. Nenne die wahrscheinlichste Fehlkonfiguration am Client und begründe.', modelAnswer: 'Das Standardgateway ist falsch oder gar nicht eingetragen. Lokale Ziele werden direkt zugestellt und funktionieren deshalb. Alle Ziele außerhalb des eigenen Subnetzes (Internet, Berlin) müssen über das Gateway gesendet werden – ist es falsch, gehen diese Pakete verloren. (Auch DNS kann für Webseiten eine Rolle spielen, aber der fehlgeschlagene Ping auf eine IP in Berlin deutet klar auf das Gateway.)', keywords: ['Standardgateway', 'lokal', 'fremdes Netz', 'Router'], explanation: 'Lokal ok + alles Externe nicht ok ⇒ Gateway prüfen (ipconfig).' },
    { id: 'm03-q014', kind: 'single', skill: 'ipv4.classes', difficulty: 1, prompt: 'Welcher Standardmaske entsprach ein Klasse-C-Netz?', options: ['/8', '/16', '/24', '/32'], answer: 2, explanation: 'Klasse C: 192–223, Standardmaske 255.255.255.0 (/24).' },
    { id: 'm03-q015', kind: 'single', skill: 'ipv4.netvshost', difficulty: 2, prompt: 'Bei 10.4.5.6/8: Welcher Teil ist der Netzanteil?', options: ['10', '10.4', '10.4.5', '6'], answer: 0, explanation: '/8 → nur das erste Oktett gehört zum Netzanteil: **10**.' },
    { id: 'm03-q016', kind: 'number', skill: 'ipv4.mask', difficulty: 1, prompt: 'Wie viele Hostbits hat ein /27-Netz?', answer: 5, explanation: '32 − 27 = 5.' },
    { id: 'm03-q017', kind: 'order', skill: 'ipv4.gateway', difficulty: 2, prompt: 'Bringe die Schritte eines PCs beim Senden an eine Adresse in einem **fremden** Netz in die richtige Reihenfolge.', items: ['Netzanteil von Ziel und eigener Adresse per Maske vergleichen', 'Feststellen: Ziel liegt in einem anderen Netz', 'MAC-Adresse des Standardgateways per ARP ermitteln', 'Frame an die Gateway-MAC mit Ziel-IP des fremden Hosts senden'], explanation: 'Vergleich → fremd → ARP nach Gateway-MAC → Frame an Gateway (IP-Ziel bleibt der eigentliche Zielhost).' },
    {
      id: 'm03-q018', kind: 'table', skill: 'ipv4.mask', difficulty: 2,
      prompt: 'Ergänze die Tabelle. Je Zeile ist entweder die Maske oder das Präfix vorgegeben.',
      columns: [
        { key: 'mask', label: 'Subnetzmaske', type: 'mask' },
        { key: 'prefix', label: 'Präfix', type: 'cidr' },
        { key: 'hb', label: 'Hostbits', type: 'number' },
        { key: 'hosts', label: 'Nutzbare Hosts', type: 'number' },
      ],
      rows: [
        { cells: { mask: { given: '255.255.240.0' }, prefix: { answer: '/20' }, hb: { answer: '12' }, hosts: { answer: '4094' } } },
        { cells: { mask: { answer: '255.255.255.192' }, prefix: { given: '/26' }, hb: { answer: '6' }, hosts: { answer: '62' } } },
        { cells: { mask: { given: '255.255.255.252' }, prefix: { answer: '/30' }, hb: { answer: '2' }, hosts: { answer: '2' } } },
        { cells: { mask: { answer: '255.255.254.0' }, prefix: { given: '/23' }, hb: { answer: '9' }, hosts: { answer: '510' } } },
      ],
      misconceptions: [
        { cell: '0:hosts', answer: '4096', error: 'reservierte-vergessen', why: '2¹² = 4096 Adressen, davon 2 reserviert → 4094.' },
        { cell: '1:hosts', answer: '64', error: 'reservierte-vergessen', why: '2⁶ = 64 Adressen, davon 2 reserviert → 62.' },
      ],
      hints: ['Jedes 255 = 8 Einsen; Teilwerte: 128=1, 192=2, 224=3, 240=4, 248=5, 252=6, 254=7.', 'Hostbits = 32 − Präfix, nutzbare Hosts = 2^Hostbits − 2.'],
      explanation: `**Weg je Zeile:**
- 255.255.240.0: 8 + 8 + 4 = **/20** → 32 − 20 = **12** Hostbits → 2¹² − 2 = **4094**
- /26: 24 Einsen + 2 im 4. Oktett (11000000 = 192) → **255.255.255.192**, **6** Hostbits → 64 − 2 = **62**
- 255.255.255.252: 24 + 6 = **/30** → **2** Hostbits → 4 − 2 = **2**
- /23: 16 + 7 (11111110 = 254) → **255.255.254.0**, **9** Hostbits → 512 − 2 = **510**

Häufiger Fehler: die zwei reservierten Adressen (Netz und Broadcast) nicht abziehen.`,
    },
    {
      id: 'm03-q019', kind: 'free', skill: 'ipv4.private', difficulty: 2,
      prompt: 'Erläutere den Unterschied zwischen **privaten** und **öffentlichen** IPv4-Adressen und beschreibe, warum ein PC mit der Adresse 192.168.10.51 trotzdem Webseiten im Internet aufrufen kann.',
      modelAnswer: `**Öffentliche** Adressen sind weltweit eindeutig, werden über die Registries (in Europa RIPE NCC) an Provider vergeben und im Internet geroutet. **Private** Adressen (RFC 1918: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) darf jeder intern frei verwenden; sie sind nicht eindeutig und werden von Internet-Routern verworfen.
Der PC mit 192.168.10.51 erreicht das Internet über **NAT** (Network Address Translation): Der Router ersetzt beim Senden die private Quelladresse durch seine öffentliche Adresse und merkt sich die Zuordnung (mit Portnummern). Antworten kommen an die öffentliche Adresse zurück und werden wieder an den PC weitergeleitet.`,
      keywords: ['weltweit eindeutig', 'RFC 1918', 'nicht geroutet', 'NAT', 'Router', 'öffentliche Adresse'],
      hints: ['Welche Funktion des Routers „übersetzt“ Adressen?'],
      explanation: 'Kernpunkte: privat = intern frei nutzbar, im Internet nicht geroutet; öffentlich = weltweit eindeutig; Internetzugang über NAT am Router.',
    },
    {
      id: 'm03-q020', kind: 'single', skill: 'ipv4.gateway', difficulty: 3,
      prompt: `**Beleg:** Ein Mitarbeiter meldet: „Ich kann den Netzwerkdrucker (10.8.4.150) nutzen, erreiche aber weder den Fileserver (10.8.4.10) noch das Internet.“ \`ipconfig\` zeigt:

\`\`\`
Ethernet-Adapter Ethernet:
   IPv4-Adresse . . . . . . . . . . : 10.8.4.200
   Subnetzmaske . . . . . . . . . . : 255.255.255.128
   Standardgateway  . . . . . . . . : 10.8.4.1
   DNS-Server . . . . . . . . . . . : 10.8.4.10
\`\`\`

Alle anderen PCs im Netz nutzen die Maske 255.255.255.0. Was ist die Ursache?`,
      options: [
        'Der DNS-Server ist ausgefallen.',
        'Die Subnetzmaske ist falsch: Mit /25 liegt der PC im Bereich 10.8.4.128–.255; Gateway (.1) und Fileserver (.10) hält er für fremde Netze.',
        'Der Drucker hat eine doppelte IP-Adresse.',
        'Die Maske 255.255.255.128 ist für Clients grundsätzlich unzulässig.',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'Dann wäre der Fileserver per IP-Adresse trotzdem erreichbar. Das Problem liegt in der IP-Konfiguration des PCs.', error: 'gateway-dns-verwechselt' },
        '2': { why: 'Der Drucker funktioniert ja – ein Adresskonflikt beim Drucker erklärt den Fehler nicht.', error: 'adresskonflikt' },
        '3': { why: '/25 ist eine normale Maske. Sie passt hier nur nicht zum Rest des Netzes.', error: 'maske-lesen' },
      },
      hints: ['Rechne mit der Maske des PCs aus, von wo bis wo sein Netz reicht.', '/25 → Schrittweite 128 → Netze .0 und .128.'],
      explanation: `**Ursache: falsche Subnetzmaske.**
1. Maske 255.255.255.128 = /25 → Schrittweite 256 − 128 = 128.
2. 200 liegt im Block ab 128 → Netz des PCs: **10.8.4.128 – 10.8.4.255**.
3. Drucker .150 liegt darin → direkt erreichbar ✔
4. Fileserver .10 und Gateway .1 liegen aus Sicht des PCs in einem **anderen** Netz. Pakete dorthin müsste er ans Gateway schicken – das liegt aber selbst nicht in seinem Netz → keine Verbindung.

Lösung: Maske auf 255.255.255.0 korrigieren (wie bei allen anderen PCs).`,
    },
    {
      id: 'm03-q021', kind: 'number', skill: 'ipv4.private', difficulty: 2,
      prompt: 'Wie viele IPv4-Adressen umfasst der private Bereich **172.16.0.0/12** insgesamt (einschließlich aller Netz- und Broadcastadressen)?',
      answer: 1048576,
      unit: 'Adressen',
      misconceptions: [{ answer: '1048574', error: 'reservierte-verwechselt', why: 'Gefragt war die Gesamtzahl der Adressen, nicht die nutzbaren Hosts. Außerdem wird der Bereich intern in viele Subnetze aufgeteilt.' }],
      hints: ['Hostbits = 32 − 12.', '2²⁰ = 2¹⁰ · 2¹⁰ = 1024 · 1024.'],
      explanation: `32 − 12 = 20 Hostbits → 2²⁰ = 1024 × 1024 = **1.048.576** Adressen. Das sind 16 aufeinanderfolgende /16-Netze (172.16.x.x bis 172.31.x.x).`,
    },
    {
      id: 'm03-q022', kind: 'ip', skill: 'ipv4.hostrange', difficulty: 2,
      prompt: 'Wie lautet die **letzte nutzbare Hostadresse** im Netz **192.168.0.0/16**?',
      answer: '192.168.255.254',
      misconceptions: [
        { answer: '192.168.0.254', error: 'netz-oktettgrenze', why: 'Bei /16 gehören die letzten **zwei** Oktette zum Hostanteil. Das Netz reicht bis 192.168.255.255.' },
        { answer: '192.168.255.255', error: 'broadcast-letzter-host', why: 'Das ist der Broadcast. Der letzte Host ist eine Adresse davor.' },
      ],
      hints: ['Bei /16 sind die letzten beiden Oktette Hostanteil.'],
      explanation: `/16 → Hostanteil = 3. und 4. Oktett. Broadcast: 192.168.**255.255** → letzter Host: **192.168.255.254**.`,
    },
    {
      id: 'm03-q023', kind: 'multi', skill: 'ipv4.gateway', difficulty: 1,
      prompt: 'Welche Angaben muss ein Client (statisch oder per DHCP) erhalten, damit er im lokalen Netz **und** im Internet **mit Namen** arbeiten kann?',
      options: ['IP-Adresse', 'Subnetzmaske', 'Standardgateway', 'DNS-Server', 'MAC-Adresse des Routers', 'Broadcastadresse'],
      answer: [0, 1, 2, 3],
      explanation: 'Die vier Angaben der IP-Konfiguration: **IP-Adresse, Subnetzmaske, Standardgateway, DNS-Server**. Die MAC des Routers ermittelt der Client selbst per ARP, die Broadcastadresse ergibt sich aus IP und Maske.',
    },
    {
      id: 'm03-q024', kind: 'free', skill: 'ipv4.private', difficulty: 2,
      prompt: 'Ein Notebook zeigt nach dem Start die IPv4-Adresse **169.254.112.9**. Erläutere, was diese Adresse bedeutet, und nenne **drei** sinnvolle Prüfschritte.',
      modelAnswer: `169.254.0.0/16 ist der **APIPA-/Link-Local-Bereich**. Windows vergibt sich eine solche Adresse selbst, wenn **kein DHCP-Server geantwortet** hat. Mit ihr ist nur Kommunikation mit Nachbarn möglich, die ebenfalls APIPA nutzen – kein Gateway, kein Internet.
Prüfschritte (drei davon):
1. Physische Verbindung prüfen: Kabel gesteckt, Link-LED an, richtiges WLAN verbunden?
2. Richtiges VLAN am Switch-Port bzw. richtige SSID?
3. DHCP-Server erreichbar/läuft der Dienst? Adressbereich (Scope) erschöpft?
4. Adresse neu anfordern: \`ipconfig /release\` und \`ipconfig /renew\`.`,
      keywords: ['APIPA', 'DHCP', 'keine Antwort', 'Kabel', 'VLAN', 'ipconfig /renew'],
      hints: ['Wer vergibt Adressen normalerweise automatisch?'],
      explanation: '169.254.x.x = Selbstzuweisung, weil DHCP nicht geantwortet hat. Prüfung von unten nach oben: Verbindung → VLAN/SSID → DHCP-Server → neu anfordern.',
    },
    {
      id: 'm03-q025', kind: 'table', skill: 'ipv4.gateway', difficulty: 2,
      prompt: `Im Netz der Werkstatt ist das Standardgateway **192.168.50.1/26**. Prüfe für jedes Gerät, ob es mit seiner Konfiguration das Gateway direkt erreichen kann (**ja**/**nein**).`,
      columns: [{ key: 'ok', label: 'Gateway direkt erreichbar?', type: 'text' }],
      rows: [
        { label: 'PC Meister: 192.168.50.20/26', cells: { ok: { answer: 'ja' } } },
        { label: 'PC Lager: 192.168.50.70/26', cells: { ok: { answer: 'nein' } } },
        { label: 'Drucker: 192.168.50.62/26', cells: { ok: { answer: 'ja' } } },
        { label: 'Notebook: 192.168.50.64/26', cells: { ok: { answer: 'nein' } } },
      ],
      hints: ['Bestimme das Netz des Gateways: /26 → Schrittweite 64.', 'Liegt das Gerät zwischen .1 und .62?'],
      explanation: `Gateway 192.168.50.1/26 → Netz **192.168.50.0 – .63** (Hosts .1 – .62).
- .20 → im Netz → **ja**
- .70 → Netz .64 – .127 → **nein**
- .62 → letzter Host im Netz → **ja**
- .64 → Netzadresse des nächsten Subnetzes → **nein**`,
    },
    {
      id: 'm03-q026', kind: 'number', skill: 'ipv4.mask', difficulty: 2,
      prompt: 'Wie viele **Hostbits** hat ein Netz mit der Maske **255.255.252.0**?',
      answer: 10,
      misconceptions: [{ answer: '22', error: 'netzbits-hostbits-verwechselt', why: '22 ist die Zahl der **Netzbits** (das Präfix). Hostbits = 32 − 22.' }],
      hints: ['252 = 11111100 → 6 Einsen.'],
      explanation: '8 + 8 + 6 = 22 Netzbits (/22) → 32 − 22 = **10 Hostbits** (2¹⁰ − 2 = 1022 Hosts).',
    },
    {
      id: 'm03-q027', kind: 'single', skill: 'ipv4.hostrange', difficulty: 1,
      prompt: 'Welche Adresse darfst du im Netz **192.168.1.0/24** keinem Gerät zuweisen?',
      options: ['192.168.1.1', '192.168.1.100', '192.168.1.254', '192.168.1.255'],
      answer: 3,
      distractors: {
        '0': { why: '.1 ist der erste nutzbare Host – oft das Gateway.', error: 'erster-host-netz' },
        '1': { why: '.100 ist eine normale Hostadresse.', error: 'maske-lesen' },
        '2': { why: '.254 ist der letzte nutzbare Host.', error: 'broadcast-letzter-host' },
      },
      explanation: '**192.168.1.255** ist die Broadcastadresse (alle Hostbits 1) und darf keinem Gerät zugewiesen werden. Ebenso wenig 192.168.1.0 (Netzadresse).',
    },
    {
      id: 'm03-q028', kind: 'match', skill: 'ipv4.mask', difficulty: 1,
      prompt: 'Ordne jedem Präfix die passende Subnetzmaske zu.',
      left: ['/8', '/16', '/24', '/30'],
      right: ['255.0.0.0', '255.255.0.0', '255.255.255.0', '255.255.255.252'],
      answer: [0, 1, 2, 3],
      explanation: '/8 = ein volles Oktett Einsen, /16 = zwei, /24 = drei; /30 = 24 + 6 Einsen → 252 (11111100).',
    },
    {
      id: 'm03-q029', kind: 'free', skill: 'ipv4.gateway', difficulty: 2,
      prompt: 'Ein neuer Netzwerkdrucker soll im Büro eingebunden werden. Nenne die vier Angaben der IP-Konfiguration und begründe, warum Drucker meist eine **feste Adresse** (statisch oder per DHCP-Reservierung) erhalten.',
      modelAnswer: `Angaben: **IP-Adresse**, **Subnetzmaske**, **Standardgateway**, **DNS-Server**.
Begründung: Die Clients sprechen den Drucker über seine Adresse (oder einen DNS-Namen, der auf die Adresse zeigt) an. Ändert sich die Adresse – etwa bei einer neuen DHCP-Zuweisung –, finden die Druckerwarteschlangen den Drucker nicht mehr. Eine feste Adresse erleichtert außerdem Dokumentation, Firewall-Regeln und Fehlersuche. Eine **DHCP-Reservierung** (feste Zuordnung MAC → IP am DHCP-Server) verbindet beides: feste Adresse, aber zentral verwaltet.`,
      keywords: ['IP-Adresse', 'Subnetzmaske', 'Standardgateway', 'DNS-Server', 'feste Adresse', 'Reservierung', 'MAC'],
      hints: ['Was passiert mit den Druckerverbindungen der Clients, wenn sich die Adresse ändert?'],
      explanation: 'Server, Drucker und Netzwerkgeräte bekommen feste Adressen, Clients meist dynamische. Die DHCP-Reservierung ist der Kompromiss.',
    },
    {
      id: 'm03-q030', kind: 'number', skill: 'ipv4.private', difficulty: 2,
      prompt: 'Der private Bereich 172.16.0.0/12 wird in /16-Netze („Klasse-B-Netze“) aufgeteilt. Wie viele /16-Netze entstehen?',
      answer: 16,
      unit: 'Netze',
      misconceptions: [{ answer: '4', error: 'bits-statt-anzahl', why: '16 − 12 = 4 Bits – daraus ergeben sich aber 2⁴ = 16 Netze.' }],
      hints: ['Differenz der Präfixe = geliehene Bits.'],
      explanation: '16 − 12 = 4 Bits → 2⁴ = **16** Netze: 172.16.0.0/16 bis 172.31.0.0/16. Deshalb endet der private Bereich bei 172.**31**.255.255.',
    },
  ],
};
