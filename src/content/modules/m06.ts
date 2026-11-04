import type { Module } from '../types';

export const m06: Module = {
  id: 'm06',
  nr: 6,
  title: 'VLSM',
  short: 'Subnetze unterschiedlicher Größe planen – vollständige Adresspläne für mehrere Standorte.',
  icon: 'LayoutGrid',
  relevance: 'vertiefung',
  prerequisites: ['m05'],
  generators: ['vlsm.prefixes', 'vlsm.plan'],
  skills: [
    { id: 'vlsm.concept', module: 'm06', title: 'VLSM vs. klassisches Subnetting', requires: ['subnet.borrow'] },
    { id: 'vlsm.sizing', module: 'm06', title: 'Netze nach Hostbedarf dimensionieren', requires: ['subnet.hosts2prefix'] },
    { id: 'vlsm.plan', module: 'm06', title: 'Adressplan erstellen (größte zuerst)', requires: ['vlsm.sizing', 'subnet.blocksize'] },
    { id: 'vlsm.overlap', module: 'm06', title: 'Überlappungen erkennen', requires: ['ipv4.broadcast'] },
    { id: 'vlsm.wan', module: 'm06', title: 'WAN-Verbindungen einplanen' },
  ],
  lessons: [
    {
      id: 'm06-l01',
      title: 'Warum VLSM? Unterschied zu klassischem Subnetting',
      minutes: 12,
      relevance: 'ap1',
      skills: ['vlsm.concept'],
      simple: `Beim klassischen Subnetting sind alle Stücke gleich groß – wie eine Pizza mit gleichen Stücken für Gäste, die sehr unterschiedlich hungrig sind.
**VLSM** (Variable Length Subnet Mask, Masken unterschiedlicher Länge) schneidet jedem Netz ein passend großes Stück.
Ein großes LAN bekommt ein großes Stück, eine Verbindung zwischen zwei Routern ein winziges.
Dazu teilst du ein Stück so lange weiter, bis es passt.
So bleiben kaum Adressen ungenutzt.

**Merke:** VLSM = jedes Subnetz bekommt die Maske, die zu seinem Bedarf passt.`,
      steps: [
        {
          type: 'explain',
          title: 'Gleich große Netze verschwenden Adressen',
          body: `Beim klassischen Subnetting sind **alle Subnetze gleich groß**. Das passt selten zur Realität. Beispiel:

Ausgangsnetz **192.168.10.0/24**, Bedarf:
- New York: 115 Hosts
- San Jose: 48 Hosts
- Fargo: 23 Hosts
- San Jose 2: 12 Hosts
- 2 WAN-Verbindungen zwischen Routern: je 2 Adressen

Das größte Netz (115 Hosts) braucht /25 (126 nutzbar). Mit gleich großen /25-Netzen hätten wir aber nur **2 Subnetze** – wir brauchen 6! Mit /27 (6 × 30 Hosts) passt New York nicht hinein.

**VLSM (Variable Length Subnet Mask)** löst das Problem: Jedes Subnetz bekommt **seine eigene, passende Maske**. Man teilt einen Block, und einen der Teile teilt man **weiter**:

- 192.168.10.0/24 → zwei /25: das erste für New York, das zweite wird weiter geteilt
- 192.168.10.128/25 → zwei /26: das erste für San Jose (48), das zweite weiter geteilt
- 192.168.10.192/26 → zwei /27: eins für Fargo (23), das andere weiter geteilt …

So entsteht ein **hierarchischer** Adressplan ohne Verschwendung. Voraussetzung: Die Routingprotokolle/Router arbeiten **classless** (mit Präfixangabe) – das ist heute Standard.`,
        },
        {
          type: 'visual',
          title: 'Die Box-Methode',
          widget: { kind: 'vlsm-boxes', data: { network: '192.168.10.0', prefix: 24, demands: [{ name: 'New York', hosts: 115 }, { name: 'San Jose', hosts: 48 }, { name: 'Fargo', hosts: 23 }, { name: 'San Jose 2', hosts: 12 }, { name: 'WAN 1', hosts: 2 }, { name: 'WAN 2', hosts: 2 }] } },
          caption: 'Das /24 ist eine Box mit 256 Adressen. Jedes Netz belegt eine Teilbox passender Größe. Die größte Box zuerst, dann immer die nächstkleinere in den freien Platz – so liegt jede Box automatisch auf ihrer Netzgrenze.',
        },
        {
          type: 'check',
          question: { id: 'm06-c01', kind: 'single', skill: 'vlsm.concept', difficulty: 1, prompt: 'Was unterscheidet VLSM von klassischem Subnetting?', options: ['VLSM verwendet keine Subnetzmasken.', 'Bei VLSM können Subnetze unterschiedlich große Masken haben.', 'VLSM funktioniert nur mit IPv6.', 'Bei VLSM entfallen Netz- und Broadcastadresse.'], answer: 1, explanation: 'Variable Length Subnet Mask: unterschiedliche Präfixe je Subnetz, passend zum Bedarf.' },
        },
        { type: 'summary', points: ['Klassisch: alle Subnetze gleich groß → Verschwendung.', 'VLSM: jedes Netz mit passendem Präfix.', 'Blöcke werden hierarchisch weiter aufgeteilt.'] },
      ],
    },
    {
      id: 'm06-l02',
      title: 'Schritt 1: Netze dimensionieren',
      minutes: 15,
      relevance: 'ap1',
      skills: ['vlsm.sizing'],
      simple: `Bevor du verteilst, schreibst du eine Bedarfsliste: alle Netze mit ihrem Hostbedarf, vom größten zum kleinsten sortiert.
Für jedes Netz suchst du das kleinste Präfix, bei dem 2^h − 2 reicht, und notierst die Blockgröße (2^h Adressen).
Dann addierst du alle Blockgrößen.
Ist die Summe kleiner oder gleich der Größe des Ausgangsnetzes, passt alles hinein – wie Kartons in einen Umzugswagen.

**Merke:** Sortieren, je Netz Präfix und Blockgröße bestimmen, Summe ≤ Ausgangsnetz prüfen.`,
      steps: [
        {
          type: 'explain',
          title: 'Für jedes Netz das kleinste passende Präfix',
          body: `Erster Schritt jeder VLSM-Aufgabe: Eine **Bedarfstabelle**, **absteigend sortiert** nach Größe.

| Netz | Hosts | 2^h − 2 ≥ Hosts | Präfix | Blockgröße |
|---|---|---|---|---|
| New York | 115 | 126 (h = 7) | /25 | 128 |
| San Jose | 48 | 62 (h = 6) | /26 | 64 |
| Fargo | 23 | 30 (h = 5) | /27 | 32 |
| San Jose 2 | 12 | 14 (h = 4) | /28 | 16 |
| WAN 1 | 2 | 2 (h = 2) | /30 | 4 |
| WAN 2 | 2 | 2 (h = 2) | /30 | 4 |

**Machbarkeit prüfen:** Summe der Blockgrößen = 128 + 64 + 32 + 16 + 4 + 4 = **248 ≤ 256** ✔ – es bleiben 8 Adressen Reserve.

Ist die Summe größer als das Ausgangsnetz, ist die Aufgabe so nicht lösbar (oder ein Netz wurde zu groß dimensioniert).`,
        },
        {
          type: 'check',
          question: { id: 'm06-c02', kind: 'cidr', skill: 'vlsm.sizing', difficulty: 1, prompt: 'Ein LAN braucht **100 Hosts**. Welches Präfix?', answer: '/25', explanation: '2⁷ − 2 = 126 ≥ 100, 2⁶ − 2 = 62 < 100 → /25.' },
        },
        { type: 'practice', title: 'Übung: Präfixe dimensionieren', generator: 'vlsm.prefixes', count: 2, difficulty: 2 },
        { type: 'summary', points: ['Bedarfstabelle absteigend sortieren.', 'Präfix je Netz: kleinstes h mit 2^h − 2 ≥ Hosts.', 'Summe der Blockgrößen ≤ Größe des Ausgangsnetzes.'] },
      ],
    },
    {
      id: 'm06-l03',
      title: 'Schritt 2: Größte zuerst vergeben – Netzgrenzen',
      minutes: 20,
      relevance: 'ap1',
      skills: ['vlsm.plan'],
      simple: `Beim Beladen eines Umzugswagens stellst du die großen Möbel zuerst hinein und füllst danach mit Kartons auf.
Bei VLSM ist es genauso: das größte Netz zuerst, das nächstkleinere direkt dahinter.
Ein Netz mit 64 Adressen darf nur bei 0, 64, 128 oder 192 beginnen (einem Vielfachen seiner Blockgröße).
Vergibst du die größten zuerst, landet jedes Netz automatisch auf so einer erlaubten Grenze.
Die nächste Startadresse ist immer der Broadcast des vorherigen Netzes plus 1.

**Merke:** Größte zuerst und lückenlos; jedes Netz beginnt bei einem Vielfachen seiner Blockgröße.`,
      steps: [
        {
          type: 'explain',
          title: 'Warum die Reihenfolge entscheidend ist',
          body: `Ein Netz mit Blockgröße **2^h** darf nur bei einem **Vielfachen von 2^h** beginnen. Ein /26 (64 Adressen) also bei .0, .64, .128 oder .192 – **nicht** bei .32 oder .96.

Vergibst du die Netze **lückenlos, größte zuerst**, ist diese Bedingung automatisch erfüllt: Nach einem 128er-Block steht der Zeiger bei 128 – einem Vielfachen von 64, 32, 16, … Nach einem 64er-Block steht er bei einem Vielfachen von 64 usw.

**Was passiert bei falscher Reihenfolge?** Vergibst du zuerst Fargo (/27) bei .0, steht der Zeiger bei .32. New York (/25) darf aber erst bei .128 beginnen → Lücke von 96 Adressen, die nur noch mit kleineren Netzen gefüllt werden kann. Das ist nicht automatisch falsch, aber fehleranfällig und oft zu knapp.

**Ablauf:**
1. Startadresse = Netzadresse des Ausgangsnetzes.
2. Größtes Netz bekommt die Startadresse. Broadcast = Start + Blockgröße − 1.
3. Nächste Startadresse = Broadcast + 1.
4. Wiederholen bis alle Netze vergeben sind.

| Netz | Präfix | Netzadresse | Hostbereich | Broadcast |
|---|---|---|---|---|
| New York | /25 | 192.168.10.0 | .1 – .126 | .127 |
| San Jose | /26 | 192.168.10.128 | .129 – .190 | .191 |
| Fargo | /27 | 192.168.10.192 | .193 – .222 | .223 |
| San Jose 2 | /28 | 192.168.10.224 | .225 – .238 | .239 |
| WAN 1 | /30 | 192.168.10.240 | .241 – .242 | .243 |
| WAN 2 | /30 | 192.168.10.244 | .245 – .246 | .247 |
| frei | | 192.168.10.248 – .255 | | |

**Wichtig:** Der Trainer in dieser App akzeptiert **jeden korrekten Plan** – auch wenn du eine andere gültige Anordnung wählst (z. B. San Jose bei .0 und New York bei .128). Er prüft: passende Größe, gültige Netzgrenze, keine Überschneidungen, alles im Ausgangsnetz.`,
        },
        {
          type: 'visual',
          title: 'Box-Methode zum Ausprobieren',
          widget: { kind: 'vlsm-boxes', data: { network: '192.168.10.0', prefix: 24, demands: [{ name: 'New York', hosts: 115 }, { name: 'San Jose', hosts: 48 }, { name: 'Fargo', hosts: 23 }, { name: 'San Jose 2', hosts: 12 }, { name: 'WAN 1', hosts: 2 }, { name: 'WAN 2', hosts: 2 }] } },
          caption: 'Jede Box zeigt Netzadresse, Präfix und Broadcast. Fahre mit der Maus über eine Box für Details.',
        },
        {
          type: 'check',
          question: { id: 'm06-c03', kind: 'single', skill: 'vlsm.plan', difficulty: 2, prompt: 'Darf ein /26-Netz bei **192.168.10.96** beginnen?', options: ['Ja, jede Adresse ist als Start möglich.', 'Nein, /26-Netze beginnen nur bei Vielfachen von 64 (.0, .64, .128, .192).', 'Ja, wenn davor ein /27 liegt.', 'Nein, /26 beginnt immer bei .0.'], answer: 1, distractors: { '0': { why: 'Die Netzadresse muss alle Hostbits = 0 haben. 96 = 01100000 – das sechste Bit von rechts (Stellenwert 32) ist ein Hostbit bei /26 und ist 1.', error: 'vlsm-not-aligned' }, '2': { why: 'Was davor liegt, ändert nichts an der Ausrichtung.', error: 'vlsm-not-aligned' }, '3': { why: 'Vier mögliche Starts: .0, .64, .128, .192.', error: 'vlsm-not-aligned' } }, explanation: '96 ist kein Vielfaches von 64 → 192.168.10.96 liegt mitten im Netz 192.168.10.64/26.' },
        },
        { type: 'summary', points: ['Netz der Größe 2^h beginnt bei einem Vielfachen von 2^h.', 'Größte zuerst + lückenlos → Ausrichtung automatisch korrekt.', 'Nächste Startadresse = Broadcast + 1.'] },
      ],
    },
    {
      id: 'm06-l04',
      title: 'Überlappungen erkennen und vermeiden',
      minutes: 12,
      relevance: 'ap1',
      skills: ['vlsm.overlap'],
      simple: `Zwei Netze **überlappen**, wenn sie sich Adressen teilen – wie zwei Grundstücke, die auf dem Plan übereinander gezeichnet sind.
Dann weiß der Router nicht, wohin ein Paket gehört, und Geräte bekommen doppelte Adressen.
Zum Prüfen schreibst du für jedes Netz Anfang (Netzadresse) und Ende (Broadcast) auf und vergleichst die Bereiche.
Ein kleines, korrekt ausgerichtetes Netz liegt immer ganz in einem größeren oder ganz außerhalb – nie halb.

**Merke:** Für jedes Netz Anfang und Broadcast notieren – kein Bereich darf sich mit einem anderen schneiden.`,
      steps: [
        {
          type: 'explain',
          title: 'Jede Adresse gehört genau einem Netz',
          body: `Zwei Netze **überlappen**, wenn sich ihre Adressbereiche (Netzadresse bis Broadcast) schneiden. Dann wüsste ein Router nicht, wohin er ein Paket schicken soll, und Geräte bekämen doppelte Adressen.

**Prüfung:** Für jedes Netz Anfang und Ende (Broadcast) ausrechnen und vergleichen.

Beispiel eines fehlerhaften Plans:

| Netz | Plan | Bereich |
|---|---|---|
| Vertrieb | 10.0.0.0/25 | 10.0.0.0 – 10.0.0.127 |
| Lager | 10.0.0.96/27 | 10.0.0.96 – 10.0.0.127 ❌ |

Das Lager liegt komplett **im** Vertriebsnetz. Häufige Ursache: Die Blockgröße wurde falsch berechnet oder die Broadcastadresse des vorherigen Netzes übersehen.

**Merke:** Ein kleineres Netz liegt entweder **vollständig innerhalb** oder **vollständig außerhalb** eines größeren, korrekt ausgerichteten Netzes – „halb“ geht nicht.`,
        },
        {
          type: 'check',
          question: { id: 'm06-c04', kind: 'single', skill: 'vlsm.overlap', difficulty: 2, prompt: 'Welches Paar überlappt?', options: ['192.168.1.0/26 und 192.168.1.64/26', '192.168.1.128/25 und 192.168.1.192/27', '192.168.1.0/27 und 192.168.1.32/28', '10.0.0.0/30 und 10.0.0.4/30'], answer: 1, explanation: '192.168.1.128/25 reicht bis .255 und enthält damit 192.168.1.192/27 (.192 – .223).' },
        },
        { type: 'summary', points: ['Überlappung = Bereiche schneiden sich.', 'Anfang und Broadcast jedes Netzes vergleichen.', 'Kleineres Netz liegt ganz in oder ganz außerhalb eines größeren.'] },
      ],
    },
    {
      id: 'm06-l05',
      title: 'WAN-Verbindungen einplanen',
      minutes: 10,
      relevance: 'ap1',
      skills: ['vlsm.wan'],
      simple: `Eine Verbindung zwischen zwei Routern ist wie eine Telefonleitung zwischen genau zwei Anschlüssen.
Sie braucht nur zwei nutzbare Adressen, eine je Router.
Ein **/30**-Netz hat 4 Adressen: Netzadresse, Router A, Router B und Broadcast – passt genau.
**/31** (nur 2 Adressen, ohne Netz- und Broadcastadresse) nimmst du nur, wenn die Aufgabe es ausdrücklich vorgibt.
Weil diese Netze die kleinsten sind, vergibst du sie am Schluss.

**Merke:** Punkt-zu-Punkt-Verbindung (WAN-Link) = /30 mit 2 nutzbaren Adressen.`,
      steps: [
        {
          type: 'explain',
          title: 'Punkt-zu-Punkt braucht nur zwei Adressen',
          body: `Zwischen zwei Routern (z. B. Standort Hamburg ↔ Berlin über eine Standleitung) gibt es genau **zwei** Schnittstellen. Dafür reicht ein winziges Netz:

| Präfix | Adressen | nutzbar | Verwendung |
|---|---|---|---|
| **/30** | 4 | 2 | klassische Konvention, in Prüfungen üblich |
| /31 | 2 | 2 | nach RFC 3021 ohne Netz-/Broadcastadresse – nur wenn die Aufgabe es vorgibt |

**Beispiel /30:** 192.168.10.240/30 → Netz .240, Router A **.241**, Router B **.242**, Broadcast .243.

Halte dich immer an die **Konvention der Aufgabenstellung**. Steht dort „Punkt-zu-Punkt-Netze mit /30“, ist ein /29 zwar technisch funktionsfähig, aber als Verschwendung falsch.

WAN-Netze sind die kleinsten Blöcke und werden deshalb am Ende vergeben.`,
        },
        {
          type: 'visual',
          title: 'Zwei Standorte, ein Transfernetz',
          widget: {
            kind: 'topology',
            data: {
              nodes: [
                { id: 'a', type: 'router', label: 'R-Hamburg', sub: '.241', x: 200, y: 160 },
                { id: 'b', type: 'router', label: 'R-Berlin', sub: '.242', x: 600, y: 160 },
                { id: 'la', type: 'switch', label: 'LAN HH', x: 200, y: 320 },
                { id: 'lb', type: 'switch', label: 'LAN B', x: 600, y: 320 },
              ],
              links: [{ from: 'a', to: 'b', label: '192.168.10.240/30', style: 'wan' }, { from: 'a', to: 'la' }, { from: 'b', to: 'lb' }],
            },
          },
        },
        {
          type: 'check',
          question: { id: 'm06-c05', kind: 'ip', skill: 'vlsm.wan', difficulty: 1, prompt: 'Welche Adresse erhält Router B (zweite nutzbare Adresse) im Transfernetz **10.0.0.8/30**?', answer: '10.0.0.10', explanation: 'Netz .8, Router A .9, Router B **.10**, Broadcast .11.' },
        },
        { type: 'summary', points: ['P2P-Links: /30 (2 nutzbare Adressen) als Standardkonvention.', '/31 nur, wenn vorgegeben.', 'WAN-Netze zuletzt vergeben.'] },
      ],
    },
    {
      id: 'm06-l06',
      title: 'Vollständiger Adressplan: mehrere Standorte',
      minutes: 25,
      relevance: 'ap1',
      skills: ['vlsm.plan', 'vlsm.sizing', 'vlsm.wan'],
      simple: `Ein kompletter Adressplan ist wie ein Sitzplan für eine Feier: erst die Gästeliste, dann die Tische nach Größe vergeben, am Ende kontrollieren.
Die sechs Schritte: Bedarf erfassen, absteigend sortieren, Präfix je Netz bestimmen, prüfen ob alles passt, Netze lückenlos vergeben, auf Überschneidungen kontrollieren.
Zu jedem Netz notierst du Netzadresse, ersten und letzten Host und Broadcast.
Was am Ende übrig bleibt, ist Reserve für später.

**Merke:** Bedarf → sortieren → dimensionieren → Machbarkeit → vergeben → kontrollieren.`,
      steps: [
        {
          type: 'explain',
          title: 'Vorgehen in der Prüfung',
          body: `**Die 6-Schritte-Checkliste für jede VLSM-Aufgabe:**

1. **Bedarf erfassen** – alle LANs und WAN-Links mit Hostzahl (Router-Schnittstelle mitzählen, wenn nicht anders angegeben).
2. **Sortieren** – absteigend nach Hostbedarf.
3. **Dimensionieren** – Präfix und Blockgröße je Netz.
4. **Machbarkeit** – Summe der Blöcke ≤ Ausgangsnetz.
5. **Vergeben** – lückenlos ab Startadresse; jeweils Netzadresse, ersten/letzten Host und Broadcast notieren.
6. **Kontrollieren** – jede Netzadresse ein Vielfaches ihrer Blockgröße? Keine Überschneidung? Letzter Broadcast ≤ Ende des Ausgangsnetzes?

Im Bereich **VLSM-Trainer** kannst du solche Aufgaben mit automatisch generierten Netzwerkdiagrammen beliebig oft üben. Jede Eingabe wird algorithmisch geprüft – inklusive verständlicher Fehlermeldungen wie „liegt nicht auf einer Netzgrenze“ oder „überschneidet sich mit …“.`,
        },
        {
          type: 'example',
          title: 'Durchgerechnet: 172.16.4.0/22 für vier Standorte',
          problem: 'Ausgangsnetz 172.16.4.0/22 (1.024 Adressen). Bedarf: Zentrale 300 Hosts, Werk 120, Vertrieb 60, Außenlager 25, zwei WAN-Links (/30).',
          steps: [
            { label: 'Dimensionieren', body: '300 → /23 (510) · 120 → /25 (126) · 60 → /26 (62) · 25 → /27 (30) · WAN → /30' },
            { label: 'Machbarkeit', body: '512 + 128 + 64 + 32 + 4 + 4 = 744 ≤ 1.024 ✔' },
            { label: 'Zentrale /23', body: '172.16.4.0 – 172.16.5.255 (Broadcast 172.16.5.255)' },
            { label: 'Werk /25', body: '172.16.6.0 – 172.16.6.127' },
            { label: 'Vertrieb /26', body: '172.16.6.128 – 172.16.6.191' },
            { label: 'Außenlager /27', body: '172.16.6.192 – 172.16.6.223' },
            { label: 'WAN 1 /30', body: '172.16.6.224 – .227 (Router .225 / .226)' },
            { label: 'WAN 2 /30', body: '172.16.6.228 – .231 (Router .229 / .230)' },
          ],
          result: 'Frei bleiben 172.16.6.232 – 172.16.7.255 als Reserve. Achtung beim /23: Das Netz umfasst zwei „/24-Blöcke“ (4.x und 5.x); 172.16.4.255 und 172.16.5.0 sind darin **normale Hostadressen**.',
        },
        { type: 'practice', title: 'Übung: kompletter VLSM-Plan', generator: 'vlsm.plan', count: 1, difficulty: 2 },
        { type: 'summary', points: ['Bedarf → sortieren → dimensionieren → Machbarkeit → vergeben → kontrollieren.', 'Alternative korrekte Pläne sind gleichwertig.', 'Reserve am Ende für Wachstum.'] },
      ],
    },
  ],
  questions: [
    { id: 'm06-q001', kind: 'single', skill: 'vlsm.plan', difficulty: 1, prompt: 'In welcher Reihenfolge vergibt man Netze bei VLSM am sichersten?', options: ['Kleinste zuerst', 'Größte zuerst', 'Alphabetisch', 'WAN-Netze zuerst'], answer: 1, explanation: 'Größte zuerst – dann liegen alle folgenden Netze automatisch auf gültigen Grenzen.' },
    { id: 'm06-q002', kind: 'number', skill: 'vlsm.sizing', difficulty: 2, prompt: 'Bedarf: 60, 28, 12 Hosts und 2 WAN-Links (/30). Wie viele Adressen werden insgesamt benötigt (Summe der Blockgrößen)?', answer: 120, explanation: '60 → 64, 28 → 32, 12 → 16, 2 × 4 = 8 → 64 + 32 + 16 + 8 = **120**.' },
    { id: 'm06-q003', kind: 'table', skill: 'vlsm.plan', difficulty: 2, prompt: 'Ausgangsnetz **10.10.0.0/24**. Plane größte zuerst: Büro 100 Hosts, Labor 50 Hosts, Technik 20 Hosts, ein WAN-Link (/30).', columns: [{ key: 'net', label: 'Netzadresse', type: 'ip' }, { key: 'prefix', label: 'Präfix', type: 'cidr' }, { key: 'bc', label: 'Broadcast', type: 'ip' }], rows: [{ label: 'Büro (100)', cells: { net: { answer: '10.10.0.0' }, prefix: { answer: '/25' }, bc: { answer: '10.10.0.127' } } }, { label: 'Labor (50)', cells: { net: { answer: '10.10.0.128' }, prefix: { answer: '/26' }, bc: { answer: '10.10.0.191' } } }, { label: 'Technik (20)', cells: { net: { answer: '10.10.0.192' }, prefix: { answer: '/27' }, bc: { answer: '10.10.0.223' } } }, { label: 'WAN', cells: { net: { answer: '10.10.0.224' }, prefix: { answer: '/30' }, bc: { answer: '10.10.0.227' } } }], explanation: '128 + 64 + 32 + 4. Jedes Netz beginnt direkt nach dem Broadcast des vorherigen.' },
    { id: 'm06-q004', kind: 'single', skill: 'vlsm.overlap', difficulty: 2, prompt: 'Ein Kollege plant 192.168.0.0/26 für die Verwaltung und 192.168.0.48/28 für Drucker. Was ist das Problem?', options: ['Kein Problem', 'Das Druckernetz liegt innerhalb des Verwaltungsnetzes (.0 – .63).', '/28 ist für Drucker zu klein', 'Das Druckernetz beginnt nicht auf einer Netzgrenze'], answer: 1, distractors: { '3': { why: '48 ist ein Vielfaches von 16 – die Ausrichtung stimmt. Das Problem ist die Überschneidung.', error: 'vlsm-overlap' } }, explanation: '192.168.0.0/26 umfasst .0 bis .63, also auch .48 – .63 → Überlappung.' },
    { id: 'm06-q005', kind: 'cidr', skill: 'vlsm.wan', difficulty: 1, prompt: 'Welches Präfix verwendet man klassisch für eine Punkt-zu-Punkt-Verbindung zwischen zwei Routern?', answer: '/30', explanation: '/30: 4 Adressen, 2 nutzbar – genau eine pro Router.' },
    { id: 'm06-q006', kind: 'free', skill: 'vlsm.concept', difficulty: 2, prompt: 'Begründe, warum für das Netz einer Niederlassung mit 70 Hosts ein /25 und kein /26 gewählt werden muss, und nenne einen Nachteil von zu groß gewählten Subnetzen.', modelAnswer: 'Ein /26 bietet nur 2⁶ − 2 = 62 nutzbare Adressen, das reicht für 70 Hosts nicht. Das nächstgrößere Netz /25 bietet 126 nutzbare Adressen. Zu große Subnetze verschwenden Adressen, die dann für andere Netze fehlen, und vergrößern die Broadcastdomäne.', keywords: ['62', '126', 'Verschwendung', 'Broadcast'], explanation: '70 > 62 → /25.' },
    { id: 'm06-q007', kind: 'ip', skill: 'vlsm.plan', difficulty: 3, prompt: 'Im Netz 192.168.20.0/24 sind bereits vergeben: .0/25 und .128/27. Ab welcher Adresse kann ein neues **/26-Netz** frühestens beginnen?', answer: '192.168.20.192', hints: ['Nach .128/27 ist .160 frei – aber ist .160 ein Vielfaches von 64?'], misconceptions: [{ answer: '192.168.20.160', error: 'vlsm-not-aligned', why: '.160 ist zwar frei, aber kein Vielfaches von 64. Ein /26 muss bei .0, .64, .128 oder .192 beginnen.' }], explanation: '.160 ist nicht auf einer /26-Grenze; nächste Grenze: **.192**. (.160 – .191 kann später mit kleineren Netzen gefüllt werden.)' },
    { id: 'm06-q008', kind: 'order', skill: 'vlsm.plan', difficulty: 1, prompt: 'Bringe die Schritte einer VLSM-Planung in die richtige Reihenfolge.', items: ['Bedarf aller Netze erfassen', 'Nach Größe absteigend sortieren', 'Präfix je Netz bestimmen', 'Machbarkeit prüfen (Summe ≤ Ausgangsnetz)', 'Netze lückenlos vergeben', 'Auf Überschneidungen kontrollieren'], explanation: 'Siehe 6-Schritte-Checkliste.' },
    { id: 'm06-q009', kind: 'single', skill: 'vlsm.sizing', difficulty: 2, prompt: 'Passt folgender Bedarf in 192.168.1.0/24? LAN A 120, LAN B 60, LAN C 60, 1 WAN (/30)', options: ['Ja, es bleiben Adressen übrig', 'Nein, es fehlen 4 Adressen', 'Ja, exakt ohne Rest', 'Nein, es fehlen 64 Adressen'], answer: 1, explanation: '128 + 64 + 64 + 4 = 260 > 256 → es fehlen 4 Adressen. Lösung: z. B. ein größeres Ausgangsnetz.' },
  ],
};
