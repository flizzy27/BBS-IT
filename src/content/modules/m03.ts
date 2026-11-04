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
      steps: [
        {
          type: 'explain',
          title: 'Warum man heute CIDR nutzt',
          body: `Früher wurde der Adressraum **klassenbasiert** (classful) aufgeteilt. Die Klasse ergab sich aus dem ersten Oktett:

| Klasse | 1. Oktett | Standardmaske | Netze × Hosts |
|---|---|---|---|
| A | 1 – 126 (127 = Loopback) | /8 | wenige, riesige Netze |
| B | 128 – 191 | /16 | |
| C | 192 – 223 | /24 | viele kleine Netze |
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
  ],
};
