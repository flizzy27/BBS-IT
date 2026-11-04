import type { Module } from '../types';

export const m05: Module = {
  id: 'm05',
  nr: 5,
  title: 'Subnetting',
  short: 'Netze gezielt aufteilen: Bits ausleihen, Blockgrößen, Netz-, Host- und Broadcastadressen.',
  icon: 'SplitSquareHorizontal',
  relevance: 'ap1-teilweise',
  prerequisites: ['m03', 'm04'],
  generators: ['ipv4.network', 'ipv4.broadcast', 'ipv4.hostcount', 'ipv4.samesubnet', 'subnet.hosts2prefix', 'subnet.count', 'subnet.nth', 'subnet.blocksize', 'subnet.table', 'subnet.split'],
  skills: [
    { id: 'subnet.why', module: 'm05', title: 'Warum Subnetting?' },
    { id: 'subnet.borrow', module: 'm05', title: 'Hostbits ausleihen verstehen', requires: ['ipv4.mask', 'bin.powers'] },
    { id: 'subnet.count', module: 'm05', title: 'Anzahl Subnetze berechnen', requires: ['subnet.borrow'] },
    { id: 'ipv4.hostcount', module: 'm05', title: 'Anzahl nutzbarer Hosts berechnen', requires: ['subnet.borrow'] },
    { id: 'subnet.blocksize', module: 'm05', title: 'Blockgröße / Schrittweite bestimmen', requires: ['ipv4.mask'] },
    { id: 'ipv4.network', module: 'm05', title: 'Netzadresse zu einer IP bestimmen', requires: ['subnet.blocksize', 'bin.and'] },
    { id: 'ipv4.broadcast', module: 'm05', title: 'Broadcastadresse bestimmen', requires: ['ipv4.network'] },
    { id: 'subnet.hosts2prefix', module: 'm05', title: 'Präfix nach Hostbedarf wählen', requires: ['ipv4.hostcount'] },
    { id: 'subnet.nth', module: 'm05', title: 'n-tes Subnetz bestimmen', requires: ['subnet.blocksize'] },
    { id: 'subnet.split', module: 'm05', title: 'Netz gleichmäßig aufteilen', requires: ['subnet.count', 'subnet.blocksize'] },
    { id: 'subnet.table', module: 'm05', title: 'Vollständige Subnetztabelle', requires: ['ipv4.network', 'ipv4.broadcast'] },
  ],
  lessons: [
    {
      id: 'm05-l01',
      title: 'Warum Netze aufgeteilt werden',
      minutes: 12,
      relevance: 'ap1',
      skills: ['subnet.why'],
      steps: [
        {
          type: 'explain',
          title: 'Ein großes Netz ist ein schlechtes Netz',
          body: `Stell dir vor, die **Elektro Krämer GmbH** hat in Hamburg 180 Geräte: Verwaltung, Produktion, Server, Drucker, Gäste-WLAN. Alles hängt in **einem** Netz 192.168.10.0/24. Was spricht dagegen?

1. **Broadcasts:** Viele Protokolle (ARP, DHCP, …) senden Broadcasts an *alle* Geräte im Netz. Je größer das Netz, desto mehr unnötiger Verkehr erreicht jedes Gerät. Ein Netz = eine **Broadcastdomäne**.
2. **Sicherheit:** Gäste im WLAN wären im selben Netz wie die Lohnbuchhaltung. Zwischen getrennten Netzen kann ein Router/eine Firewall den Verkehr **filtern**.
3. **Ordnung & Fehlersuche:** Wenn die Produktion 192.168.10.64–127 hat, erkennt man an der Adresse sofort, wo ein Gerät steht.
4. **Adressen sparen:** Ein Standort mit 20 Geräten braucht kein Netz mit 254 Adressen.

**Subnetting** heißt: Ein vorhandenes Netz wird in mehrere kleinere **Subnetze** zerlegt. Technisch passiert dabei etwas sehr Einfaches: Man **verlängert die Subnetzmaske** – und genau das schauen wir uns in der nächsten Lektion Bit für Bit an.`,
        },
        {
          type: 'visual',
          title: 'Vorher: ein Netz – nachher: getrennte Subnetze',
          widget: {
            kind: 'topology',
            data: {
              nodes: [
                { id: 'fw', type: 'firewall', label: 'Router/Firewall', x: 400, y: 50 },
                { id: 's1', type: 'switch', label: 'Switch', x: 140, y: 190 },
                { id: 's2', type: 'switch', label: 'Switch', x: 400, y: 190 },
                { id: 's3', type: 'ap', label: 'Gäste-AP', x: 660, y: 190 },
                { id: 'a', type: 'pc', label: 'Verwaltung', sub: '.0/26', x: 140, y: 330 },
                { id: 'b', type: 'server', label: 'Produktion', sub: '.64/26', x: 400, y: 330 },
                { id: 'c', type: 'phone', label: 'Gäste', sub: '.128/26', x: 660, y: 330 },
              ],
              links: [{ from: 'fw', to: 's1' }, { from: 'fw', to: 's2' }, { from: 'fw', to: 's3' }, { from: 's1', to: 'a' }, { from: 's2', to: 'b' }, { from: 's3', to: 'c', style: 'wifi' }],
              zones: [
                { label: '192.168.10.0/26', x: 60, y: 150, w: 170, h: 240, color: 'blue' },
                { label: '192.168.10.64/26', x: 315, y: 150, w: 170, h: 240, color: 'green' },
                { label: '192.168.10.128/26', x: 575, y: 150, w: 170, h: 240, color: 'orange' },
              ],
            },
          },
          caption: 'Drei Subnetze = drei Broadcastdomänen. Der Router/die Firewall entscheidet, wer mit wem sprechen darf.',
        },
        {
          type: 'check',
          question: {
            id: 'm05-c01', kind: 'multi', skill: 'subnet.why', difficulty: 1,
            prompt: 'Welche Vorteile bringt Subnetting?',
            options: ['Kleinere Broadcastdomänen', 'Verkehr zwischen Abteilungen kann gefiltert werden', 'Mehr IP-Adressen insgesamt', 'Bessere Übersicht und Fehlersuche', 'Kein Router mehr nötig'],
            answer: [0, 1, 3],
            explanation: 'Subnetting schafft **keine** zusätzlichen Adressen (es kostet sogar je Subnetz 2 Adressen) und zwischen Subnetzen braucht man **immer** einen Router.',
          },
        },
        { type: 'summary', points: ['Ein Netz = eine Broadcastdomäne.', 'Subnetting = vorhandenes Netz in kleinere Netze teilen.', 'Vorteile: weniger Broadcasts, Sicherheit, Ordnung, effiziente Adressnutzung.', 'Zwischen Subnetzen vermittelt ein Router.'] },
      ],
    },
    {
      id: 'm05-l02',
      title: 'Was beim Ausleihen von Hostbits passiert',
      minutes: 25,
      relevance: 'ap1',
      skills: ['subnet.borrow', 'subnet.count', 'ipv4.hostcount'],
      steps: [
        {
          type: 'explain',
          title: 'Das ausgeliehene Bit verschwindet nicht – es wird zur Subnetz-ID',
          body: `Nimm das Netz **192.168.10.0/24**. Die ersten 24 Bits sind fest (Netzanteil), die letzten **8 Bits** sind Hostbits. Mit 8 Bits gibt es **2⁸ = 256** Adressen: von \`00000000\` (=0) bis \`11111111\` (=255).

Jetzt verlängern wir die Maske auf **/25**. Das erste Hostbit wird zum Netzbit – wir **leihen** es uns aus dem Hostanteil aus.

Entscheidend: Dieses Bit ist nicht weg. Es kann **zwei Werte** annehmen – **0 oder 1**. Jeder dieser Werte beschreibt ein eigenes Subnetz:

\`\`\`
Netzbits (24)                 | Subnetz-Bit | Hostbits (7)
192.168.10.                   |      0      | xxxxxxx   → 192.168.10.0   … 192.168.10.127
192.168.10.                   |      1      | xxxxxxx   → 192.168.10.128 … 192.168.10.255
\`\`\`

- Das Subnetz-Bit = **0** → letztes Oktett \`0xxxxxxx\` → Werte **0 bis 127**
- Das Subnetz-Bit = **1** → letztes Oktett \`1xxxxxxx\` → Werte **128 bis 255** (weil das Bit den Stellenwert 128 hat!)

Die 256 Adressen werden also nicht kleiner – sie werden **aufgeteilt**: 2 Subnetze × 128 Adressen = 256. Die übrigen **7 Hostbits** ergeben in jedem Subnetz 2⁷ = 128 Adressen.

Leihst du **2 Bits** aus (/26), gibt es vier Kombinationen: 00, 01, 10, 11 → **4 Subnetze** mit je 2⁶ = 64 Adressen. Bei **3 Bits** (/27): 8 Subnetze à 32 Adressen.

Daraus folgen die **drei Grundformeln**:

> **Anzahl Subnetze = 2^(ausgeliehene Bits)**
> **Adressen pro Subnetz = 2^(verbleibende Hostbits)**
> **Nutzbare Hosts pro Subnetz = 2^(Hostbits) − 2**

Und die Probe: Subnetze × Adressen pro Subnetz = Adressen des Ausgangsnetzes (z. B. 8 × 32 = 256).`,
        },
        {
          type: 'visual',
          title: 'Interaktiv: Präfix verändern',
          widget: { kind: 'subnet-bar', data: { network: '192.168.10.0', prefix: 25, minPrefix: 24, maxPrefix: 30 } },
          caption: 'Ändere das Präfix von /24 bis /30. Der Balken mit 256 Adressen wird in 2, 4, 8, … gleich große Blöcke geteilt. In der Bitzeile siehst du, welche Bits Netzbits (blau), ausgeliehene Subnetzbits (violett) und Hostbits (orange) sind. Klicke einen Block an, um seine Adressen zu sehen.',
        },
        {
          type: 'visual',
          title: 'Bitweise: Welches Subnetz-Bit gehört zu welchem Block?',
          widget: { kind: 'ip-binary', data: { ip: '192.168.10.130', prefix: 25, editable: true } },
          caption: 'Bei .130 ist das erste Hostbit (Stellenwert 128) gesetzt → Subnetz-Bit = 1 → zweites Subnetz 192.168.10.128/25. Probiere .127 und .128 aus: genau dort springt das Subnetz-Bit um.',
        },
        {
          type: 'example',
          title: 'Durchgerechnet: 192.168.10.0/24 → /27',
          problem: 'Wie viele Subnetze entstehen, wie groß ist jedes und wie viele Hosts sind je Subnetz nutzbar?',
          steps: [
            { label: 'Ausgeliehene Bits', body: '27 − 24 = **3**' },
            { label: 'Anzahl Subnetze', body: '2³ = **8**' },
            { label: 'Verbleibende Hostbits', body: '32 − 27 = **5**' },
            { label: 'Adressen je Subnetz', body: '2⁵ = **32**' },
            { label: 'Nutzbare Hosts', body: '32 − 2 = **30**' },
            { label: 'Probe', body: '8 × 32 = 256 ✔' },
          ],
          result: '8 Subnetze mit je 32 Adressen (30 nutzbar): .0, .32, .64, .96, .128, .160, .192, .224',
        },
        {
          type: 'check',
          question: {
            id: 'm05-c02', kind: 'single', skill: 'subnet.borrow', difficulty: 1,
            prompt: 'Warum entstehen aus 192.168.10.0/24 bei /25 genau **zwei** Subnetze?',
            options: ['Weil die Maske um 1 länger wird und /25 doppelt so groß ist.', 'Weil das ausgeliehene Bit zwei Werte (0 oder 1) annehmen kann – jeder Wert ist eine Subnetzkennung.', 'Weil man 256 immer durch 2 teilt.', 'Weil Netz- und Broadcastadresse zwei Netze ergeben.'],
            answer: 1,
            distractors: {
              '0': { why: 'Ein längeres Präfix macht ein Netz **kleiner**, nicht größer.', error: 'praefix-groesse-verwechselt' },
              '2': { why: 'Das stimmt nur zufällig für 1 Bit. Bei 2 Bits teilt man durch 4, bei 3 durch 8 – der Grund sind die Bitkombinationen.', error: 'subnetting-auswendig' },
              '3': { why: 'Netz- und Broadcastadresse sind reservierte Adressen **innerhalb** eines Subnetzes, keine eigenen Netze.', error: 'reservierte-verwechselt' },
            },
            explanation: 'Das ausgeliehene Bit gehört jetzt zum Netzanteil. Mit 0 ergibt sich 192.168.10.0/25, mit 1 (Stellenwert 128) 192.168.10.128/25.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'm05-c03', kind: 'number', skill: 'ipv4.hostcount', difficulty: 1,
            prompt: 'Wie viele **nutzbare** Hosts hat ein /26-Subnetz?',
            answer: 62,
            misconceptions: [{ answer: '64', error: 'reservierte-vergessen', why: '64 Adressen, davon 2 reserviert (Netz + Broadcast).' }],
            explanation: '6 Hostbits → 2⁶ = 64 Adressen − 2 = **62**.',
          },
        },
        { type: 'practice', title: 'Übung: Subnetze & Hosts zählen', generator: 'subnet.count', count: 3, difficulty: 1 },
        { type: 'practice', title: 'Übung: nutzbare Hosts', generator: 'ipv4.hostcount', count: 3, difficulty: 1 },
        {
          type: 'summary',
          points: [
            'Ausleihen = Maske verlängern; die ausgeliehenen Bits werden zur Subnetzkennung.',
            'b ausgeliehene Bits → 2^b Subnetze.',
            'h verbleibende Hostbits → 2^h Adressen, 2^h − 2 nutzbar.',
            'Subnetze × Adressen je Subnetz = Größe des Ausgangsnetzes.',
          ],
        },
      ],
    },
    {
      id: 'm05-l03',
      title: 'Blockgröße und Schrittweite',
      minutes: 20,
      relevance: 'ap1',
      skills: ['subnet.blocksize', 'subnet.nth'],
      steps: [
        {
          type: 'explain',
          title: 'Warum Netzadressen bestimmte Schrittweiten haben',
          body: `Alle Subnetze nach dem Ausleihen sind **gleich groß**. Die Größe eines Subnetzes nennt man **Blockgröße**. Deshalb liegen die Netzadressen in festen **Schritten** hintereinander – wie Hausnummern 0, 32, 64, 96, …

**Woher kommt die Schrittweite?** Sie ist der Stellenwert des **letzten Netzbits**. Bei /27 ist das letzte Netzbit im 4. Oktett das dritte Bit von links – Stellenwert **32**. Jede Erhöhung der Subnetzkennung um 1 erhöht die Adresse also um 32.

Zwei gleichwertige Rechenwege:

1. **Über die Hostbits:** Blockgröße = 2^(Hostbits im interessanten Oktett). /27 → 5 Hostbits → 2⁵ = 32.
2. **Über die Maske („magische Zahl“):** Schrittweite = **256 − Maskenwert** im interessanten Oktett. /27 → 255.255.255.**224** → 256 − 224 = 32.

Das **interessante Oktett** ist das Oktett, in dem die Grenze zwischen Netz- und Hostbits liegt (Maskenwert ≠ 255 und ≠ 0).

| Präfix | Maske | interessantes Oktett | Schrittweite |
|---|---|---|---|
| /25 | 255.255.255.128 | 4. | 128 |
| /26 | 255.255.255.192 | 4. | 64 |
| /27 | 255.255.255.224 | 4. | 32 |
| /28 | 255.255.255.240 | 4. | 16 |
| /29 | 255.255.255.248 | 4. | 8 |
| /30 | 255.255.255.252 | 4. | 4 |
| /20 | 255.255.240.0 | 3. | 16 |
| /22 | 255.255.252.0 | 3. | 4 |

Bei **/20** liegt die Grenze im **3. Oktett**: Die Netze beginnen bei x.x.**0**.0, x.x.**16**.0, x.x.**32**.0, … – die Schrittweite gilt also im dritten Oktett, und das vierte Oktett läuft innerhalb jedes Netzes einmal komplett von 0 bis 255 durch.`,
        },
        {
          type: 'visual',
          title: 'Schrittweite sehen',
          widget: { kind: 'subnet-bar', data: { network: '192.168.10.0', prefix: 27, minPrefix: 24, maxPrefix: 30 } },
          caption: 'Lies die Startadressen der Blöcke ab: Sie wachsen immer um die Blockgröße.',
        },
        {
          type: 'example',
          title: 'Das 5. Subnetz bei /28',
          problem: '192.168.1.0/24 wird in /28-Subnetze geteilt. Wie lautet das 5. Subnetz (Netz und Broadcast)?',
          steps: [
            { label: 'Schrittweite', body: '256 − 240 = **16**' },
            { label: 'Startadressen', body: '1.: .0 · 2.: .16 · 3.: .32 · 4.: .48 · **5.: .64**' },
            { label: 'Formel', body: '(5 − 1) · 16 = 64' },
            { label: 'Broadcast', body: 'nächstes Netz (.80) − 1 = **.79**' },
          ],
          result: '5. Subnetz: **192.168.1.64/28**, Broadcast **192.168.1.79**, Hosts .65 – .78',
        },
        {
          type: 'check',
          question: { id: 'm05-c04', kind: 'number', skill: 'subnet.blocksize', difficulty: 1, prompt: 'Welche Schrittweite haben /29-Subnetze im 4. Oktett?', answer: 8, explanation: '256 − 248 = **8** (bzw. 2³, weil 3 Hostbits).' },
        },
        {
          type: 'check',
          question: { id: 'm05-c05', kind: 'ip', skill: 'subnet.nth', difficulty: 2, prompt: '192.168.1.0/24 wird in /27-Netze geteilt. Wo beginnt das **zweite** Subnetz?', answer: '192.168.1.32', misconceptions: [{ answer: '192.168.1.64', error: 'subnetz-index', why: 'Das erste Subnetz beginnt bei .0 (Offset 0). Das zweite also bei 1 · 32 = .32.' }], explanation: 'Schrittweite 32 → .0, **.32**, .64, …' },
        },
        { type: 'practice', title: 'Übung: Schrittweite', generator: 'subnet.blocksize', count: 3, difficulty: 2 },
        { type: 'practice', title: 'Übung: n-tes Subnetz', generator: 'subnet.nth', count: 3, difficulty: 1 },
        { type: 'summary', points: ['Alle Subnetze sind gleich groß (Blockgröße).', 'Schrittweite = 256 − Maskenwert im interessanten Oktett = 2^(Hostbits dort).', 'n-tes Subnetz beginnt bei Basis + (n − 1) · Schrittweite.'] },
      ],
    },
    {
      id: 'm05-l04',
      title: 'Netzadresse zu beliebiger IP bestimmen',
      minutes: 20,
      relevance: 'ap1',
      skills: ['ipv4.network'],
      steps: [
        {
          type: 'explain',
          title: 'Zwei Methoden, ein Ergebnis',
          body: `Typische Prüfungsfrage: *„Ein Host hat 192.168.10.77/26. Zu welchem Netz gehört er?“*

**Methode A – Blockgrößen-Methode (schnell im Kopf):**
1. Interessantes Oktett und Schrittweite bestimmen: /26 → 4. Oktett, 256 − 192 = **64**.
2. Vielfache der Schrittweite aufschreiben: 0, 64, 128, 192.
3. Das **größte Vielfache ≤ dem Oktettwert** suchen: 77 → **64**.
4. Netzadresse: Oktette davor übernehmen, interessantes Oktett = 64, Oktette danach = 0 → **192.168.10.64**.

**Methode B – Binär (UND-Verknüpfung, zum Verstehen und Kontrollieren):**
\`\`\`
77   = 0100 1101
192  = 1100 0000
UND  = 0100 0000 = 64
\`\`\`

Beide Wege liefern dasselbe. Methode A ist in der Prüfung schneller; Methode B erklärt, **warum** sie funktioniert: Das Ausnullen der Hostbits rundet den Wert auf das nächstkleinere Vielfache der Blockgröße ab.

**Aufpassen bei Grenzen im 3. Oktett:** 172.16.45.200/20 → Schrittweite 16 im **3. Oktett**: 0, 16, 32, 48 → 45 liegt im Block ab **32** → Netzadresse **172.16.32.0** (das 4. Oktett wird 0, weil es komplett Hostanteil ist).`,
        },
        {
          type: 'visual',
          title: 'Selbst probieren',
          widget: { kind: 'ip-binary', data: { ip: '192.168.10.77', prefix: 26, editable: true } },
          caption: 'Gib verschiedene Adressen und Präfixe ein. Netzadresse = alle orangefarbenen Hostbits auf 0.',
        },
        {
          type: 'check',
          question: { id: 'm05-c06', kind: 'ip', skill: 'ipv4.network', difficulty: 2, prompt: 'Zu welchem Netz gehört **10.10.10.100/28**?', answer: '10.10.10.96', hints: ['Schrittweite 16: 0, 16, 32, 48, 64, 80, 96, 112, …'], explanation: '100 liegt zwischen 96 und 111 → Netz **10.10.10.96/28**.' },
        },
        { type: 'practice', title: 'Übung: Netzadresse bestimmen', generator: 'ipv4.network', count: 4, difficulty: 2 },
        { type: 'practice', title: 'Übung: gleiches Subnetz?', generator: 'ipv4.samesubnet', count: 3, difficulty: 2 },
        { type: 'summary', points: ['Netzadresse = größtes Vielfaches der Schrittweite ≤ Oktettwert.', 'Oktette nach dem interessanten Oktett werden 0.', 'Binärer Beweis: IP UND Maske.'] },
      ],
    },
    {
      id: 'm05-l05',
      title: 'Broadcastadresse und Hostbereich',
      minutes: 20,
      relevance: 'ap1',
      skills: ['ipv4.broadcast', 'subnet.table'],
      steps: [
        {
          type: 'explain',
          title: 'Broadcast = nächstes Netz minus 1',
          body: `Sobald die Netzadresse feststeht, ist der Rest einfach:

- **Broadcast** = Netzadresse + Blockgröße − 1 = **nächste Netzadresse − 1**
- **Erster Host** = Netzadresse + 1
- **Letzter Host** = Broadcast − 1

Beispiel **192.168.10.77/26**:

| | Wert | Herleitung |
|---|---|---|
| Netzadresse | 192.168.10.64 | 77 → Block ab 64 |
| Nächstes Netz | 192.168.10.128 | 64 + 64 |
| **Broadcast** | **192.168.10.127** | 128 − 1 |
| Erster Host | 192.168.10.65 | 64 + 1 |
| Letzter Host | 192.168.10.126 | 127 − 1 |
| Nutzbar | 62 | 2⁶ − 2 |

Binär: Beim Broadcast werden **alle Hostbits auf 1** gesetzt:
\`\`\`
64  = 01 000000   (Netz, Hostbits 0)
127 = 01 111111   (Broadcast, Hostbits 1)
\`\`\`

**Die häufigsten Fehler** (die das System bei dir automatisch erkennt):
- Die **nächste Netzadresse** als Broadcast angeben (z. B. .128 statt .127).
- Den **letzten Host** als Broadcast angeben.
- Bei Grenzen im 3. Oktett das 4. Oktett vergessen: Der Broadcast von 172.16.32.0/20 ist **172.16.47.255**, nicht 172.16.47.0.`,
        },
        {
          type: 'example',
          title: 'Grenze im 3. Oktett: 172.16.45.200/20',
          problem: 'Bestimme Netz, Broadcast und Hostbereich.',
          steps: [
            { label: 'Maske', body: '/20 = 255.255.240.0 → interessantes Oktett: 3., Schrittweite 256 − 240 = 16' },
            { label: 'Netz', body: '45 → Block ab 32 → **172.16.32.0**' },
            { label: 'Nächstes Netz', body: '172.16.48.0' },
            { label: 'Broadcast', body: '172.16.48.0 − 1 = **172.16.47.255**' },
            { label: 'Hosts', body: '172.16.32.1 – 172.16.47.254, 2¹² − 2 = **4.094**' },
          ],
          result: 'Netz 172.16.32.0/20 · Broadcast 172.16.47.255 · 4.094 Hosts',
        },
        {
          type: 'check',
          question: { id: 'm05-c07', kind: 'ip', skill: 'ipv4.broadcast', difficulty: 1, prompt: 'Das Subnetz **192.168.10.192/27** – wie lautet seine Broadcastadresse?', answer: '192.168.10.223', misconceptions: [{ answer: '192.168.10.224', error: 'broadcast-naechstes-netz', why: '.224 ist das nächste /27-Netz. Der Broadcast liegt eine Adresse davor: .223.' }, { answer: '192.168.10.255', error: 'netz-oktettgrenze', why: '.255 wäre der Broadcast bei /24. Ein /27-Netz umfasst nur 32 Adressen: .192 bis .223.' }], explanation: '192 + 32 − 1 = **223**.' },
        },
        { type: 'practice', title: 'Übung: Broadcast bestimmen', generator: 'ipv4.broadcast', count: 4, difficulty: 2 },
        { type: 'practice', title: 'Übung: vollständige Subnetztabelle', generator: 'subnet.table', count: 2, difficulty: 2 },
        { type: 'summary', points: ['Broadcast = nächstes Netz − 1 (alle Hostbits 1).', 'Hostbereich: Netz + 1 bis Broadcast − 1.', 'Bei Grenze im 3. Oktett endet der Broadcast auf .255.'] },
      ],
    },
    {
      id: 'm05-l06',
      title: 'Netze nach Hostbedarf dimensionieren',
      minutes: 15,
      relevance: 'ap1',
      skills: ['subnet.hosts2prefix'],
      steps: [
        {
          type: 'explain',
          title: 'Von der Anforderung zum Präfix',
          body: `In der Praxis lautet die Frage meist umgekehrt: *„Die Abteilung hat 48 Geräte – welches Subnetz brauche ich?“*

**Vorgehen:**
1. Suche die **kleinste** Anzahl Hostbits **h**, für die **2^h − 2 ≥ Hostbedarf** gilt.
2. Präfix = **32 − h**.

| Hostbits h | Adressen 2^h | nutzbar 2^h − 2 | Präfix |
|---|---|---|---|
| 2 | 4 | 2 | /30 |
| 3 | 8 | 6 | /29 |
| 4 | 16 | 14 | /28 |
| 5 | 32 | 30 | /27 |
| 6 | 64 | 62 | /26 |
| 7 | 128 | 126 | /25 |
| 8 | 256 | 254 | /24 |
| 9 | 512 | 510 | /23 |
| 10 | 1.024 | 1.022 | /22 |

**Beispiele:** 48 Hosts → 62 ≥ 48 → **/26** · 23 Hosts → 30 ≥ 23 → **/27**.

**Die Grenzfall-Falle:** 64 Hosts passen **nicht** in /26 (nur 62 nutzbar) → **/25**. Genauso 31 Hosts → /26, 15 Hosts → /27.

Ob der Router (Gateway) im Hostbedarf schon enthalten ist, steht in der Aufgabenstellung – im Zweifel **mitzählen**, denn die Router-Schnittstelle braucht ebenfalls eine Adresse.`,
        },
        {
          type: 'check',
          question: { id: 'm05-c08', kind: 'cidr', skill: 'subnet.hosts2prefix', difficulty: 2, prompt: 'Ein Netz soll **62 Clients plus 1 Router-Schnittstelle** aufnehmen. Welches Präfix ist nötig?', answer: '/25', misconceptions: [{ answer: '/26', error: 'reservierte-vergessen', why: '/26 hat 62 nutzbare Adressen, benötigt werden aber 63 (62 + Router).' }], explanation: '63 Hosts > 62 (/26) → nächstgrößeres Netz /25 mit 126 nutzbaren Adressen.' },
        },
        { type: 'practice', title: 'Übung: Präfix wählen', generator: 'subnet.hosts2prefix', count: 5, difficulty: 2 },
        { type: 'summary', points: ['Kleinstes h mit 2^h − 2 ≥ Bedarf, Präfix = 32 − h.', 'Grenzfälle: 63/64 Hosts → /25, 31/32 → /26.', 'Router-Schnittstelle mitzählen.'] },
      ],
    },
    {
      id: 'm05-l07',
      title: 'Gleichmäßig aufteilen & Prüfungsaufgaben',
      minutes: 25,
      relevance: 'ap1-teilweise',
      skills: ['subnet.split', 'subnet.table', 'subnet.count'],
      steps: [
        {
          type: 'explain',
          title: 'Zwei Fragestellungen – ein Werkzeugkasten',
          body: `Prüfungsaufgaben zum klassischen (gleichmäßigen) Subnetting fragen meist eine von zwei Varianten:

**Variante 1 – „Man braucht X Subnetze“:**
1. Kleinste Bitzahl b mit 2^b ≥ X → Präfix = altes Präfix + b.
2. Blockgröße bestimmen, Subnetze auflisten.
3. Prüfen, ob die Hosts pro Subnetz reichen.

**Variante 2 – „Jedes Subnetz braucht Y Hosts“:**
1. Kleinstes h mit 2^h − 2 ≥ Y → Präfix = 32 − h.
2. Anzahl Subnetze = 2^(neues Präfix − altes Präfix).

**Beispiel (Variante 1):** Die Elektro Krämer GmbH möchte 172.20.0.0/16 auf **12 Standorte** verteilen.
- 2³ = 8 < 12 ≤ 16 = 2⁴ → **4 Bits** → /20
- Schrittweite 16 im 3. Oktett → 172.20.0.0, 172.20.16.0, 172.20.32.0, …, 172.20.240.0 (16 Subnetze, 4 Reserve)
- Je Subnetz 2¹² − 2 = 4.094 Hosts

**Prüfungsstrategie:**
- Schreibe dir zu Beginn die Zeilen \`128 64 32 16 8 4 2 1\` und \`/25 /26 /27 /28 /29 /30\` mit den Maskenwerten \`128 192 224 240 248 252\` auf.
- Rechne Broadcasts immer als „nächstes Netz − 1“.
- Kontrolliere: Liegt jede Antwort im richtigen Block? Ist die Netzadresse ein Vielfaches der Schrittweite?`,
        },
        {
          type: 'visual',
          title: 'Aufteilen live',
          widget: { kind: 'subnet-bar', data: { network: '172.20.0.0', prefix: 20, minPrefix: 16, maxPrefix: 24 } },
          caption: 'Ein /16 mit 65.536 Adressen. Ändere das Präfix und beobachte, wie viele Subnetze entstehen und wie groß sie sind.',
        },
        { type: 'practice', title: 'Übung: Netz aufteilen (Tabelle)', generator: 'subnet.split', count: 2, difficulty: 2 },
        { type: 'practice', title: 'Übung: gemischt anspruchsvoll', generator: 'subnet.table', count: 2, difficulty: 3 },
        { type: 'summary', points: ['Subnetzbedarf → Bits ausleihen; Hostbedarf → Hostbits reservieren.', 'Ergebnis immer mit Probe kontrollieren (Vielfaches, Broadcast = nächstes Netz − 1).'] },
      ],
    },
  ],
  questions: [
    { id: 'm05-q001', kind: 'number', skill: 'subnet.count', difficulty: 1, prompt: 'Wie viele Subnetze entstehen, wenn man aus einem /24 **3 Bits** ausleiht?', answer: 8, explanation: '2³ = 8.' },
    { id: 'm05-q002', kind: 'single', skill: 'subnet.borrow', difficulty: 2, prompt: 'Beim Wechsel von /24 auf /26: Was passiert mit den 256 Adressen?', options: ['Es bleiben nur 64 Adressen übrig.', 'Sie werden auf 4 Subnetze mit je 64 Adressen aufgeteilt.', 'Es entstehen 4 Subnetze mit je 62 Adressen, 8 Adressen gehen verloren.', 'Das Netz wird größer.'], answer: 1, distractors: { '0': { why: 'Die übrigen Adressen gehören zu den anderen drei Subnetzen.', error: 'subnetting-adressen-verloren' }, '2': { why: 'Jedes Subnetz hat 64 Adressen; 62 davon nutzbar. Insgesamt 8 Adressen sind reserviert (4 × Netz + Broadcast), aber nicht „verloren“ – sie werden als Netz-/Broadcastadressen benötigt.', error: 'reservierte-verwechselt' }, '3': { why: 'Längeres Präfix = kleinere Netze.', error: 'praefix-groesse-verwechselt' } }, explanation: '2 Bits ausgeliehen → 4 Subnetze × 2⁶ = 64 Adressen = 256.' },
    { id: 'm05-q003', kind: 'table', skill: 'subnet.table', difficulty: 2, prompt: 'Das Netz 192.168.1.0/24 wird in /27-Subnetze geteilt. Ergänze die fehlenden Werte.', columns: [{ key: 'net', label: 'Netzadresse', type: 'ip' }, { key: 'bc', label: 'Broadcast', type: 'ip' }], rows: [{ label: '1.', cells: { net: { given: '192.168.1.0' }, bc: { answer: '192.168.1.31' } } }, { label: '2.', cells: { net: { answer: '192.168.1.32' }, bc: { answer: '192.168.1.63' } } }, { label: '3.', cells: { net: { answer: '192.168.1.64' }, bc: { answer: '192.168.1.95' } } }, { label: '7.', cells: { net: { answer: '192.168.1.192' }, bc: { answer: '192.168.1.223' } } }], misconceptions: [{ cell: 'bc', answer: '192.168.1.32', error: 'broadcast-naechstes-netz', why: 'Broadcast = nächstes Netz − 1.' }], explanation: 'Schrittweite 32: .0, .32, .64, .96, .128, .160, .192, .224. Broadcast jeweils nächstes Netz − 1.' },
    { id: 'm05-q004', kind: 'ip', skill: 'ipv4.broadcast', difficulty: 2, prompt: 'Broadcastadresse von **10.1.64.0/18**?', answer: '10.1.127.255', hints: ['/18: interessantes Oktett ist das 3., Schrittweite 64.'], misconceptions: [{ answer: '10.1.127.0', error: 'netz-oktettgrenze', why: 'Das 4. Oktett ist komplett Hostanteil → beim Broadcast 255.' }, { answer: '10.1.128.255', error: 'broadcast-naechstes-netz', why: 'Das nächste Netz beginnt bei 10.1.128.0 – der Broadcast liegt eine Adresse davor.' }], explanation: 'Netz 10.1.64.0, nächstes Netz 10.1.128.0 → Broadcast **10.1.127.255**.' },
    { id: 'm05-q005', kind: 'single', skill: 'ipv4.network', difficulty: 2, prompt: 'Welche Adresse ist im Netz **192.168.5.32/28** eine gültige Hostadresse?', options: ['192.168.5.32', '192.168.5.47', '192.168.5.40', '192.168.5.48'], answer: 2, distractors: { '0': { why: '.32 ist die Netzadresse.', error: 'erster-host-netz' }, '1': { why: '.47 ist der Broadcast (32 + 16 − 1).', error: 'broadcast-letzter-host' }, '3': { why: '.48 gehört schon zum nächsten /28-Netz.', error: 'broadcast-naechstes-netz' } }, explanation: 'Hostbereich .33 – .46.' },
    { id: 'm05-q006', kind: 'cidr', skill: 'subnet.hosts2prefix', difficulty: 1, prompt: '48 benötigte Hosts – kleinstes Präfix?', answer: '/26', explanation: '2⁶ − 2 = 62 ≥ 48, 2⁵ − 2 = 30 < 48 → /26.' },
    { id: 'm05-q007', kind: 'cidr', skill: 'subnet.hosts2prefix', difficulty: 1, prompt: '23 benötigte Hosts – kleinstes Präfix?', answer: '/27', explanation: '2⁵ − 2 = 30 ≥ 23 → /27.' },
    { id: 'm05-q008', kind: 'cidr', skill: 'subnet.hosts2prefix', difficulty: 2, prompt: '500 benötigte Hosts – kleinstes Präfix?', answer: '/23', explanation: '2⁹ − 2 = 510 ≥ 500 → 32 − 9 = /23.' },
    { id: 'm05-q009', kind: 'free', skill: 'subnet.borrow', difficulty: 2, prompt: 'Erkläre einem neuen Auszubildenden, warum beim Ausleihen eines Hostbits aus 192.168.10.0/24 zwei Subnetze mit jeweils 128 Adressen entstehen. Gehe dabei auf die Binärdarstellung ein.', modelAnswer: 'Bei /24 sind die letzten 8 Bits Hostbits (256 Kombinationen). Leiht man ein Bit aus, gehört das höchstwertige Hostbit (Stellenwert 128) zum Netzanteil. Dieses Bit kann 0 oder 1 sein: 0xxxxxxx ergibt die Adressen 0–127 (Subnetz 192.168.10.0/25), 1xxxxxxx ergibt 128–255 (Subnetz 192.168.10.128/25). Es bleiben 7 Hostbits je Subnetz → 2⁷ = 128 Adressen (126 nutzbar). Das Bit verschwindet nicht, es wird zur Subnetzkennung.', keywords: ['0 oder 1', 'Subnetzkennung', '128', '7 Hostbits', '/25'], explanation: 'Kernaussage: Das ausgeliehene Bit ist eine Subnetz-ID mit 2 möglichen Werten; der Rest sind 7 Hostbits.' },
    { id: 'm05-q010', kind: 'number', skill: 'subnet.count', difficulty: 2, prompt: '172.16.0.0/16 wird in /22-Netze geteilt. Wie viele Subnetze entstehen?', answer: 64, explanation: '22 − 16 = 6 Bits → 2⁶ = **64** Subnetze.' },
    { id: 'm05-q011', kind: 'ip', skill: 'subnet.nth', difficulty: 3, prompt: '172.16.0.0/16 wird in /22-Netze geteilt. Wie lautet die Netzadresse des **10. Subnetzes**?', answer: '172.16.36.0', hints: ['Schrittweite 4 im 3. Oktett.', '(10 − 1) · 4 = ?'], misconceptions: [{ answer: '172.16.40.0', error: 'subnetz-index', why: 'Das 1. Subnetz hat Offset 0 → das 10. hat (10 − 1) · 4 = 36.' }], explanation: '(10 − 1) · 4 = 36 → **172.16.36.0/22**.' },
    { id: 'm05-q012', kind: 'single', skill: 'ipv4.network', difficulty: 3, prompt: 'Liegen 10.0.15.200/20 und 10.0.16.5/20 im selben Netz?', options: ['Ja', 'Nein'], answer: 1, distractors: { '0': { why: '10.0.15.200 gehört zu 10.0.0.0/20 (0–15), 10.0.16.5 zu 10.0.16.0/20.', error: 'subnetz-zugehoerigkeit' } }, explanation: 'Schrittweite 16 im 3. Oktett: 15 → Block 0, 16 → Block 16. Verschiedene Netze.' },
    { id: 'm05-q013', kind: 'order', skill: 'subnet.table', difficulty: 1, prompt: 'Bringe die Rechenschritte für „Netz und Broadcast zu einer IP mit Präfix“ in eine sinnvolle Reihenfolge.', items: ['Präfix in Maske umrechnen', 'Interessantes Oktett und Schrittweite bestimmen', 'Netzadresse als größtes Vielfaches ≤ Oktettwert bestimmen', 'Broadcast = nächstes Netz − 1'], explanation: 'Maske → Schrittweite → Netz → Broadcast.' },
    { id: 'm05-q014', kind: 'match', skill: 'subnet.blocksize', difficulty: 1, prompt: 'Ordne die Präfixe ihrer Schrittweite im 4. Oktett zu.', left: ['/25', '/26', '/28', '/30'], right: ['128', '64', '16', '4'], answer: [0, 1, 2, 3], explanation: '256 − Maskenwert: 128, 64, 16, 4.' },
  ],
};
