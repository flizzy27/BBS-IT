import type { Module } from '../types';

export const m09: Module = {
  id: 'm09',
  nr: 9,
  title: 'Routing',
  short: `Wie Router Pakete zwischen Netzen weiterleiten: Routingtabelle, Standardgateway, Default Route, Longest Prefix Match, Paketwege über mehrere Standorte, Sammelrouten und Routerauswahl.`,
  icon: 'Route',
  relevance: 'ap1',
  prerequisites: ['m03', 'm05'],
  skills: [
    { id: 'routing.basics', module: 'm09', title: 'Aufgabe eines Routers (Schicht 3, Netze verbinden)' },
    { id: 'routing.gateway', module: 'm09', title: 'Standardgateway und Entscheidung am Client', requires: ['routing.basics'] },
    { id: 'routing.table', module: 'm09', title: 'Routingtabelle lesen und verstehen', requires: ['routing.basics'] },
    { id: 'routing.static', module: 'm09', title: 'Statische Routen festlegen', requires: ['routing.table'] },
    { id: 'routing.default', module: 'm09', title: 'Default Route 0.0.0.0/0', requires: ['routing.table'] },
    { id: 'routing.lpm', module: 'm09', title: 'Longest Prefix Match anwenden', requires: ['routing.table'] },
    { id: 'routing.forwarding', module: 'm09', title: 'Paketweiterleitung: MAC wechselt, IP bleibt', requires: ['routing.gateway'] },
    { id: 'routing.ttl', module: 'm09', title: 'TTL und Hop-Zählung', requires: ['routing.forwarding'] },
    { id: 'routing.multisite', module: 'm09', title: 'Routing für Mehrstandort-Netze planen', requires: ['routing.static', 'routing.default'] },
    { id: 'routing.dynamic', module: 'm09', title: 'Dynamisches Routing (RIP, OSPF, BGP – Grundidee)', requires: ['routing.table'] },
    { id: 'routing.aggregate', module: 'm09', title: 'Routen zusammenfassen (Supernetting)', requires: ['routing.static'] },
    { id: 'routing.select', module: 'm09', title: 'Router nach Datenblatt auswählen (SoHo, Business, Profi)', requires: ['routing.basics'] },
  ],
  generators: ['routing.lpm', 'routing.supernet'],
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'm09-l01',
      title: 'Was macht ein Router?',
      minutes: 20,
      relevance: 'ap1',
      skills: ['routing.basics', 'routing.forwarding'],
      simple: `Ein **Router** verbindet verschiedene Netze miteinander – so wie ein Postverteilzentrum Briefe zwischen Städten weiterleitet. Er schaut auf die **Ziel-IP-Adresse** (die Anschrift des Pakets) und entscheidet mit seiner **Routingtabelle** (Liste: welches Ziel über welchen Weg), wohin das Paket als Nächstes geht. Ein **Switch** verteilt dagegen nur innerhalb eines Netzes – wie die Briefträgerin in einer Straße. Kennt der Router kein passendes Ziel, wirft er das Paket weg; er verteilt es nie „an alle“.

**Merke:** Switch = innerhalb eines Netzes (MAC-Adressen, Schicht 2), Router = zwischen Netzen (IP-Adressen, Schicht 3).`,
      steps: [
        {
          type: 'explain',
          title: 'Netze verbinden',
          body: `Die **Elektro Krämer GmbH** hat zwei Standorte: die Zentrale in **Hamburg** (Netz 192.168.10.0/24) und eine Niederlassung in **Berlin** (Netz 192.168.20.0/24). Außerdem wollen alle ins **Internet**. Ein Switch kann dabei nicht helfen – er verbindet Geräte **innerhalb** eines Netzes. Um **verschiedene IP-Netze** miteinander zu verbinden, braucht man einen **Router**.

Ein **Router** arbeitet auf **OSI-Schicht 3 (Vermittlungsschicht)**. Er:

- verbindet **unterschiedliche IP-Netze** (jedes Interface liegt in einem anderen Netz),
- entscheidet anhand der **Ziel-IP-Adresse** und seiner **Routingtabelle**, wohin ein Paket weitergeleitet wird (**Routing** = Wegewahl),
- **trennt Broadcastdomänen**: Broadcasts leitet er nicht weiter,
- verringert bei jedem Paket die **TTL** um 1.

Zum Vergleich mit dem Switch:

| | Switch | Router |
|---|---|---|
| OSI-Schicht | 2 | 3 |
| Adressen | MAC-Adressen | IP-Adressen |
| Tabelle | MAC-Adresstabelle (lernt automatisch) | Routingtabelle (direkt verbunden, statisch, dynamisch) |
| Unbekanntes Ziel | flutet | nutzt Default Route – gibt es keine, wird das Paket **verworfen** |
| Broadcasts | leitet weiter (im VLAN) | leitet **nicht** weiter |
| Verbindet | Geräte in einem Netz | verschiedene Netze |

Wichtig: Ein Router **flutet nie**. Kennt er kein passendes Ziel, verwirft er das Paket und meldet dem Absender meist per **ICMP „Destination Unreachable“**.`,
        },
        {
          type: 'visual',
          title: 'Router in der OSI-Welt',
          widget: { kind: 'layers', data: { mode: 'osi', highlight: [3], showPdu: true, showProtocols: true } },
          caption: `Der Router arbeitet auf Schicht 3 (Pakete, IP). Er packt den Frame aus (Schicht 2), wertet die IP-Adresse aus und verpackt das Paket für die nächste Strecke in einen **neuen** Frame.`,
        },
        {
          type: 'visual',
          title: 'Die Standorte der Elektro Krämer GmbH',
          widget: {
            kind: 'topology',
            data: {
              nodes: [
                { id: 'inet', type: 'internet', label: 'Internet', x: 400, y: 50 },
                { id: 'pc1', type: 'pc', label: 'PC-HH', sub: '192.168.10.20', x: 80, y: 320 },
                { id: 'rhh', type: 'router', label: 'R-HH', sub: '.10.1 | 10.0.0.1', x: 250, y: 210 },
                { id: 'rb', type: 'router', label: 'R-B', sub: '10.0.0.2 | .20.1', x: 550, y: 210 },
                { id: 'srv', type: 'server', label: 'Srv-B', sub: '192.168.20.50', x: 720, y: 320 },
              ],
              links: [
                { from: 'pc1', to: 'rhh', label: '192.168.10.0/24' },
                { from: 'rhh', to: 'rb', label: '10.0.0.0/30', style: 'wan' },
                { from: 'rb', to: 'srv', label: '192.168.20.0/24' },
                { from: 'rhh', to: 'inet', label: '203.0.113.0/30', style: 'wan' },
              ],
              zones: [
                { label: 'Hamburg', x: 20, y: 140, w: 330, h: 270, color: 'blue' },
                { label: 'Berlin', x: 450, y: 140, w: 330, h: 270, color: 'green' },
              ],
            },
          },
          caption: `Drei Netze: LAN Hamburg, Transfernetz (WAN) zwischen den Routern und LAN Berlin – plus der Internetanschluss in Hamburg. Jedes Router-Interface hat eine IP-Adresse aus dem Netz, in dem es steckt.`,
        },
        {
          type: 'example',
          title: 'Welche Geräte braucht man wofür?',
          problem: `Der Azubi-Kollege fragt: „Warum reicht für Hamburg ↔ Berlin nicht einfach ein langes Kabel zwischen den Switches?“`,
          steps: [
            { label: 'Netze prüfen', body: `Hamburg nutzt 192.168.10.0/24, Berlin 192.168.20.0/24 – zwei **verschiedene** IP-Netze. Ein PC sendet Pakete an fremde Netze an sein **Standardgateway** – das muss ein Router sein.` },
            { label: 'Broadcasts', body: `Würde man beide Standorte zu einem großen Layer-2-Netz verbinden, liefen alle Broadcasts (ARP, DHCP) über die teure WAN-Strecke. Der Router trennt die Broadcastdomänen.` },
            { label: 'Kontrolle', body: `Am Router (oder der Firewall) kann man festlegen, welcher Verkehr zwischen den Standorten erlaubt ist.` },
          ],
          result: `Zwischen verschiedenen IP-Netzen braucht man einen Router (oder Layer-3-Switch/Firewall). Er trennt Broadcastdomänen und ermöglicht Kontrolle.`,
        },
        {
          type: 'check',
          question: {
            id: 'm09-l01-c1',
            kind: 'single',
            skill: 'routing.basics',
            difficulty: 1,
            prompt: `Anhand welcher Information entscheidet ein Router, wohin er ein Paket weiterleitet?`,
            options: ['Quell-MAC-Adresse', 'Ziel-MAC-Adresse', 'Ziel-IP-Adresse', 'Quell-Portnummer'],
            answer: 2,
            distractors: {
              '0': { why: 'MAC-Adressen sind Schicht 2 – damit arbeitet der Switch.', error: 'router-mac' },
              '1': { why: 'Die Ziel-MAC des eingehenden Frames ist die des Routers selbst; für die Wegewahl zählt die IP.', error: 'router-mac' },
              '3': { why: 'Ports sind Schicht 4; ein klassischer Router routet nach Ziel-IP.', error: 'router-port' },
            },
            explanation: `Router entscheiden nach der **Ziel-IP-Adresse** und vergleichen sie mit den Einträgen der **Routingtabelle**.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: Router-Grundlagen',
          questionIds: ['m09-q001', 'm09-q002', 'm09-q003', 'm09-q004'],
          count: 3,
          difficulty: 1,
        },
        {
          type: 'summary',
          points: [
            'Router = Schicht-3-Gerät, verbindet verschiedene IP-Netze.',
            'Entscheidung nach Ziel-IP-Adresse mithilfe der Routingtabelle.',
            'Router trennen Broadcastdomänen und fluten nie – unbekannte Ziele ohne Default Route werden verworfen.',
            'Jedes Router-Interface hat eine IP-Adresse im jeweils angeschlossenen Netz.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm09-l02',
      title: 'Standardgateway: die Entscheidung am Client',
      minutes: 20,
      relevance: 'ap1',
      skills: ['routing.gateway'],
      simple: `Bevor dein PC etwas verschickt, prüft er: Liegt das Ziel in meinem eigenen Netz? Dafür vergleicht er mit der **Subnetzmaske** den Netzanteil seiner eigenen Adresse und der Zieladresse. Gleich → er schickt direkt hin, wie einen Brief an die Nachbarin, den du selbst einwirfst. Verschieden → er gibt das Paket dem **Standardgateway** (dem Router seines Netzes), wie einen Brief an die Post. Deshalb muss das Gateway immer im **eigenen** Netz des PCs liegen.

**Merke:** Ziel im eigenen Netz → direkt zustellen; Ziel in einem fremden Netz → ans Standardgateway, und das muss im eigenen Subnetz liegen.`,
      steps: [
        {
          type: 'explain',
          title: 'Lokal oder entfernt?',
          body: `Bevor ein Router überhaupt etwas tut, entscheidet schon der **Client** selbst. Jeder PC hat drei wichtige IP-Einstellungen: **IP-Adresse**, **Subnetzmaske** und **Standardgateway** (*Default Gateway*).

Will der PC ein Paket senden, fragt er sich: **Liegt das Ziel in meinem eigenen Netz?**

1. Er verknüpft **seine eigene IP** mit seiner Maske (bitweises UND) → eigenes Netz.
2. Er verknüpft die **Ziel-IP** mit **seiner** Maske → Netz des Ziels (aus seiner Sicht).
3. **Gleich?** → Ziel ist **lokal**. Der PC ermittelt per **ARP** die MAC des Ziels und schickt den Frame direkt.
4. **Ungleich?** → Ziel ist **entfernt**. Der PC schickt das Paket an das **Standardgateway**: Er ermittelt per ARP die **MAC des Gateways** und setzt diese als Ziel-MAC. Die **Ziel-IP bleibt die des eigentlichen Ziels**!

Das Standardgateway ist also die IP-Adresse des **Router-Interfaces im eigenen Netz**. Es **muss im selben Subnetz** wie der Client liegen – sonst könnte der Client es gar nicht direkt erreichen.

Intern ist das Standardgateway nichts anderes als eine **Default Route** in der Routingtabelle des PCs. Unter Windows siehst du sie mit \`route print\` als Eintrag *Netzwerkziel 0.0.0.0, Netzwerkmaske 0.0.0.0, Gateway 192.168.10.1*. Unter Linux mit \`ip route\` als *default via 192.168.10.1*.

**Typische Fehler im Support:**

| Symptom | Ursache |
|---|---|
| Lokale Geräte erreichbar, aber nichts außerhalb | Standardgateway fehlt oder falsch |
| Gateway liegt nicht im eigenen Subnetz | Tippfehler bei IP/Maske/Gateway |
| Manche Geräte im eigenen Netz nicht erreichbar | falsche Subnetzmaske |`,
        },
        {
          type: 'example',
          title: 'Lokal oder über das Gateway?',
          problem: `PC-HH hat 192.168.10.20 / 255.255.255.0, Gateway 192.168.10.1. Wohin schickt er Pakete an (a) 192.168.10.80, (b) 192.168.20.50, (c) 8.8.8.8?`,
          steps: [
            { label: 'Eigenes Netz', body: `192.168.10.20 UND 255.255.255.0 = **192.168.10.0**.` },
            { label: '(a) 192.168.10.80', body: `UND Maske = 192.168.10.0 → **gleich** → lokal. ARP nach 192.168.10.80, Frame direkt an dessen MAC.` },
            { label: '(b) 192.168.20.50', body: `UND Maske = 192.168.20.0 → **ungleich** → ans Gateway. Ziel-MAC = MAC von 192.168.10.1, Ziel-IP bleibt 192.168.20.50.` },
            { label: '(c) 8.8.8.8', body: `UND Maske = 8.8.8.0 → ungleich → ebenfalls ans Gateway.` },
          ],
          result: `(a) direkt, (b) und (c) über das Standardgateway 192.168.10.1.`,
        },
        {
          type: 'check',
          question: {
            id: 'm09-l02-c1',
            kind: 'single',
            skill: 'routing.gateway',
            difficulty: 2,
            prompt: `PC-HH (192.168.10.20/24) sendet ein Paket an 192.168.20.50. Welche **Ziel-MAC** und welche **Ziel-IP** stehen im Frame, den der PC verschickt?`,
            options: [
              'Ziel-MAC des Servers, Ziel-IP des Servers',
              'Ziel-MAC des Gateways, Ziel-IP des Gateways',
              'Ziel-MAC des Gateways, Ziel-IP des Servers',
              'Ziel-MAC FF:FF:FF:FF:FF:FF, Ziel-IP des Servers',
            ],
            answer: 2,
            distractors: {
              '0': { why: 'Die MAC des Servers in Berlin kennt der PC nicht – sie ist in einem anderen Netz und per ARP nicht erreichbar.', error: 'gateway-ziel-mac' },
              '1': { why: 'Die Ziel-IP bleibt die des endgültigen Ziels – sonst wüsste der Router nicht, wohin.', error: 'gateway-ziel-ip' },
              '3': { why: 'Ein Broadcast wird nur für ARP genutzt, nicht für das Datenpaket selbst.', error: 'gateway-broadcast' },
            },
            explanation: `Das Ziel ist entfernt → **Ziel-MAC = Gateway**, **Ziel-IP = Server**. Die IP-Adresse beschreibt das Endziel, die MAC nur den nächsten Schritt.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: Standardgateway',
          questionIds: ['m09-q005', 'm09-q006', 'm09-q007', 'm09-q008'],
          count: 3,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Der Client prüft per UND-Verknüpfung mit seiner Maske, ob das Ziel im eigenen Netz liegt.',
            'Lokal → direkt per ARP an das Ziel; entfernt → an die MAC des Standardgateways.',
            'Die Ziel-IP bleibt immer die des Endziels.',
            'Das Standardgateway muss im selben Subnetz liegen; es entspricht einer Default Route am Client.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm09-l03',
      title: 'Die Routingtabelle: direkt, statisch, Default',
      minutes: 30,
      relevance: 'ap1',
      skills: ['routing.table', 'routing.static', 'routing.default'],
      simple: `Die **Routingtabelle** ist der Wegweiser des Routers. Jede Zeile sagt: „Für dieses Zielnetz geht es über diesen Nachbarrouter (**Next Hop**) bzw. diese Schnittstelle.“ Direkt angeschlossene Netze kennt der Router von selbst. Entfernte Netze trägt der Administrator als **statische Route** von Hand ein. Für alle übrigen Ziele gibt es die **Default Route 0.0.0.0/0** – wie das Schild „alle anderen Richtungen“ an einer Kreuzung.

**Merke:** Eintrag = Zielnetz + Next Hop bzw. Schnittstelle; 0.0.0.0/0 ist die Default Route für alle Ziele ohne eigenen Eintrag.`,
      steps: [
        {
          type: 'explain',
          title: 'Aufbau einer Routingtabelle',
          body: `Die **Routingtabelle** ist das „Navigationssystem“ des Routers. Jede Zeile (*Route*) sagt: „Pakete für **dieses Zielnetz** schicke ich **dorthin**.“

| Spalte | Bedeutung | Beispiel |
|---|---|---|
| **Zielnetz** | Netzadresse des Ziels | 192.168.20.0 |
| **Maske / Präfix** | Größe des Zielnetzes | 255.255.255.0 bzw. /24 |
| **Next Hop / Gateway** | IP des **nächsten Routers** auf dem Weg | 10.0.0.2 |
| **Interface** | Schnittstelle, über die das Paket rausgeht | Gi0/1 |
| **Metrik** | „Kosten“ des Wegs; bei mehreren Wegen gewinnt die **kleinere** Metrik | 1 |

Der **Next Hop** muss immer in einem **direkt angeschlossenen Netz** liegen – der Router muss ihn ja ohne weiteren Router erreichen können (per ARP).

**Woher kommen die Einträge?**

1. **Direkt verbundene Netze** (*connected*): Sobald ein Interface eine IP bekommt und aktiv ist, trägt der Router dessen Netz automatisch ein. Next Hop: keiner („direkt“) – das Ziel wird direkt per ARP gesucht.
2. **Statische Routen**: vom Administrator **manuell** eingetragen.
3. **Dynamische Routen**: per Routingprotokoll (RIP, OSPF, BGP) von anderen Routern gelernt.

Bei Cisco erkennst du die Herkunft am Kürzel in \`show ip route\`: **C** = connected, **L** = local (eigene Interface-Adresse), **S** = static, **R** = RIP, **O** = OSPF, **B** = BGP, ein **\\*** markiert die Default Route.`,
        },
        {
          type: 'explain',
          title: 'Statische Routen und die Default Route',
          body: `Ein Router kennt zunächst **nur seine direkt verbundenen Netze**. R-HH weiß also nichts von 192.168.20.0/24 in Berlin. Das bringst du ihm mit einer **statischen Route** bei:

| Plattform | Befehl |
|---|---|
| Cisco IOS | \`ip route 192.168.20.0 255.255.255.0 10.0.0.2\` |
| Linux | \`ip route add 192.168.20.0/24 via 10.0.0.2\` |
| Windows | \`route add 192.168.20.0 mask 255.255.255.0 10.0.0.2\` |

**Statisches Routing** – Vor- und Nachteile:

| Vorteile | Nachteile |
|---|---|
| einfach, vorhersehbar | bei vielen Netzen viel Pflegeaufwand |
| keine CPU-/Bandbreitenlast durch Protokolle | **keine automatische Anpassung** bei Ausfällen |
| sicher (nichts wird von außen gelernt) | Tippfehler führen zu Routing-Problemen |

Gut geeignet für **kleine Netze** und Filialen mit nur einem Weg nach draußen.

**Die Default Route \`0.0.0.0/0\`** (Maske 0.0.0.0) passt auf **jede** IP-Adresse, weil kein einziges Bit verglichen wird. Sie ist der Eintrag „**für alles andere**“ – typischerweise Richtung Internet. Man nennt den Next Hop dann *Gateway of last resort*. Weil sie das kürzeste Präfix (/0) hat, wird sie nur benutzt, wenn **keine spezifischere Route** passt.

Routingtabelle von **R-HH**:

| Zielnetz | Präfix | Next Hop | Interface | Herkunft |
|---|---|---|---|---|
| 192.168.10.0 | /24 | direkt | Gi0/0 | connected |
| 10.0.0.0 | /30 | direkt | Gi0/1 | connected |
| 203.0.113.0 | /30 | direkt | Gi0/2 | connected |
| 192.168.20.0 | /24 | 10.0.0.2 | Gi0/1 | statisch |
| 0.0.0.0 | /0 | 203.0.113.1 | Gi0/2 | statisch (Default) |

Routingtabelle von **R-B** (Berlin hat keinen eigenen Internetzugang, alles läuft über Hamburg):

| Zielnetz | Präfix | Next Hop | Interface |
|---|---|---|---|
| 192.168.20.0 | /24 | direkt | Gi0/0 |
| 10.0.0.0 | /30 | direkt | Gi0/1 |
| 0.0.0.0 | /0 | 10.0.0.1 | Gi0/1 |

Beachte: R-B braucht **keine** eigene Route für 192.168.10.0/24 – die Default Route nach Hamburg deckt das mit ab. Wichtig ist aber immer der **Rückweg**: Wenn R-HH keine Route nach 192.168.20.0/24 hätte, kämen Anfragen aus Berlin zwar an, die Antworten aber nicht zurück.`,
        },
        {
          type: 'visual',
          title: 'Einträge einer Routingtabelle',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Direkt verbunden', text: 'Automatisch, sobald ein Interface mit IP aktiv ist. Kein Next Hop.', icon: 'Cable' },
                { title: 'Statisch', text: 'Manuell eingetragen. Einfach und sicher, aber ohne automatische Anpassung.', icon: 'PenLine' },
                { title: 'Dynamisch', text: 'Per Routingprotokoll gelernt (RIP, OSPF, BGP). Passt sich bei Ausfällen an.', icon: 'RefreshCw' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Routingtabelle für Berlin mit eigenem Internet',
          problem: `Berlin bekommt einen eigenen Internetanschluss: R-B Interface Gi0/2 = 198.51.100.2/30, Provider-Router 198.51.100.1. Der Verkehr nach Hamburg soll weiterhin über das Transfernetz gehen. Erstelle die Routingtabelle von R-B.`,
          steps: [
            { label: 'Direkt verbundene Netze', body: `192.168.20.0/24 (Gi0/0), 10.0.0.0/30 (Gi0/1), 198.51.100.0/30 (Gi0/2) – trägt der Router selbst ein.` },
            { label: 'Hamburg', body: `Die Default Route zeigt jetzt ins Internet. Für Hamburg braucht R-B daher eine **statische Route**: 192.168.10.0/24 über Next Hop **10.0.0.1** (R-HH im Transfernetz).` },
            { label: 'Internet', body: `Default Route 0.0.0.0/0 über **198.51.100.1**.` },
            { label: 'Ergebnis', body: `| Zielnetz | Präfix | Next Hop | Interface |\n|---|---|---|---|\n| 192.168.20.0 | /24 | direkt | Gi0/0 |\n| 10.0.0.0 | /30 | direkt | Gi0/1 |\n| 198.51.100.0 | /30 | direkt | Gi0/2 |\n| 192.168.10.0 | /24 | 10.0.0.1 | Gi0/1 |\n| 0.0.0.0 | /0 | 198.51.100.1 | Gi0/2 |` },
          ],
          result: `Spezifische Route nach Hamburg + Default Route ins Internet. Ein Paket an 192.168.10.20 passt auf beide Einträge – gewählt wird die spezifischere /24-Route (Longest Prefix Match, nächste Lektion).`,
        },
        {
          type: 'check',
          question: {
            id: 'm09-l03-c1',
            kind: 'single',
            skill: 'routing.default',
            difficulty: 1,
            prompt: `Wie lautet die Default Route in CIDR-Schreibweise?`,
            options: ['255.255.255.255/32', '0.0.0.0/0', '127.0.0.0/8', '0.0.0.0/32'],
            answer: 1,
            distractors: {
              '0': { why: 'Das ist der eingeschränkte Broadcast als Host-Route.', error: 'default-broadcast' },
              '2': { why: 'Das ist das Loopback-Netz.', error: 'default-loopback' },
              '3': { why: 'Mit /32 würde nur genau die Adresse 0.0.0.0 passen.', error: 'default-praefix' },
            },
            explanation: `**0.0.0.0/0** – das Präfix /0 vergleicht kein einziges Bit, deshalb passt jede Adresse.`,
          },
        },
        {
          type: 'check',
          question: {
            id: 'm09-l03-c2',
            kind: 'single',
            skill: 'routing.static',
            difficulty: 2,
            prompt: `Ein Admin trägt auf R-HH ein: \`ip route 192.168.20.0 255.255.255.0 192.168.20.1\`. R-HH ist mit 192.168.20.0/24 **nicht** direkt verbunden. Was ist falsch?`,
            options: [
              'Die Maske muss 0.0.0.0 sein.',
              'Der Next Hop liegt nicht in einem direkt verbundenen Netz von R-HH – er muss die Transfernetz-Adresse 10.0.0.2 sein.',
              'Statische Routen sind auf Cisco-Routern nicht erlaubt.',
              'Nichts, die Route ist korrekt.',
            ],
            answer: 1,
            distractors: {
              '0': { why: 'Maske 0.0.0.0 wäre eine Default Route.', error: 'static-maske' },
              '2': { why: 'Statische Routen sind Standard.', error: 'static-erlaubt' },
              '3': { why: 'R-HH kann 192.168.20.1 nicht direkt erreichen – das ist das LAN-Interface von R-B.', error: 'static-nexthop' },
            },
            explanation: `Der **Next Hop** muss für den Router **direkt erreichbar** sein, also im Transfernetz liegen: **10.0.0.2**.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: Routingtabellen',
          questionIds: ['m09-q009', 'm09-q010', 'm09-q011', 'm09-q012', 'm09-q013', 'm09-q014', 'm09-q015'],
          count: 5,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Routingtabelle: Zielnetz, Maske/Präfix, Next Hop, Interface, Metrik.',
            'Direkt verbundene Netze trägt der Router selbst ein; andere Netze per statischer oder dynamischer Route.',
            'Der Next Hop muss in einem direkt verbundenen Netz liegen.',
            'Default Route 0.0.0.0/0 = „alles andere“, meist Richtung Internet.',
            'Immer an den Rückweg denken: Beide Seiten brauchen passende Routen.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm09-l04',
      title: 'Longest Prefix Match',
      minutes: 25,
      relevance: 'ap1',
      skills: ['routing.lpm'],
      simple: `Manchmal passen mehrere Zeilen der Routingtabelle zum selben Ziel. Dann nimmt der Router die **genaueste** – die mit dem **längsten Präfix** (der größten Zahl hinter dem Schrägstrich). Das ist wie bei einer Anschrift: „Hamburg, Hafenstraße 12“ ist genauer als „Hamburg“ und gewinnt deshalb. Die Default Route /0 passt immer, ist aber am ungenauesten und kommt nur zum Zug, wenn sonst nichts passt.

**Merke:** Passen mehrere Routen, gewinnt das längste Präfix (Longest Prefix Match).`,
      steps: [
        {
          type: 'explain',
          title: 'Wenn mehrere Routen passen',
          body: `Oft passen auf eine Ziel-IP **mehrere** Einträge – die Default Route passt ja z. B. immer. Dann gilt die wichtigste Regel des Routings:

> **Longest Prefix Match:** Gewählt wird die Route mit dem **längsten passenden Präfix** – also die **spezifischste** Route.

Warum? Ein längeres Präfix beschreibt ein **kleineres**, genaueres Netz. „Hamburg, Musterstraße 5“ ist genauer als „Hamburg“, und das ist genauer als „irgendwo auf der Welt“.

**So gehst du vor:**

1. Für **jeden** Eintrag prüfen: Ziel-IP UND Maske des Eintrags = Zielnetz des Eintrags? → Eintrag **passt**.
2. Unter allen passenden Einträgen den mit dem **größten Präfix** (/n) nehmen.
3. Passt nichts (und keine Default Route) → Paket **verwerfen**, ICMP „Destination Unreachable“ an den Absender.

Erst **danach** spielen Metrik (bei gleichem Präfix, gleiche Quelle) bzw. Administrative Distanz (bei gleichem Präfix aus verschiedenen Quellen) eine Rolle. Das Präfix schlägt immer die Metrik!

**Tipp für die Prüfung:** Bei Masken, die nicht auf Oktettgrenzen liegen (z. B. /20, /26), musst du das betroffene Oktett ausrechnen. Beispiel 172.16.16.0/20: Blockgröße im 3. Oktett = 2^(24−20) = 16 → Bereich 172.16.16.0 bis 172.16.31.255.`,
        },
        {
          type: 'example',
          title: 'Vier Ziele, eine Tabelle',
          problem: `Routingtabelle:

| Nr | Zielnetz | Next Hop |
|---|---|---|
| A | 10.0.0.0/8 | 172.16.0.1 |
| B | 10.1.0.0/16 | 172.16.0.2 |
| C | 10.1.2.0/24 | 172.16.0.3 |
| D | 0.0.0.0/0 | 172.16.0.254 |

Welcher Next Hop wird für (1) 10.1.2.77, (2) 10.1.5.5, (3) 10.200.1.1, (4) 8.8.8.8 genutzt?`,
          steps: [
            { label: '(1) 10.1.2.77', body: `Passt auf A (10.x.x.x), B (10.1.x.x), C (10.1.2.x) und D. Längstes Präfix: **/24 → C** → 172.16.0.3.` },
            { label: '(2) 10.1.5.5', body: `Passt auf A, B, D – nicht auf C (3. Oktett 5 ≠ 2). Längstes: **/16 → B** → 172.16.0.2.` },
            { label: '(3) 10.200.1.1', body: `Passt auf A und D. Längstes: **/8 → A** → 172.16.0.1.` },
            { label: '(4) 8.8.8.8', body: `Passt nur auf D → **Default Route** → 172.16.0.254.` },
          ],
          result: `C, B, A, D – jeweils die spezifischste passende Route.`,
        },
        {
          type: 'example',
          title: 'Präfix nicht auf Oktettgrenze',
          problem: `Routen: E = 172.16.0.0/16 → R1, F = 172.16.16.0/20 → R2. Wohin gehen 172.16.31.5 und 172.16.32.1?`,
          steps: [
            { label: 'Bereich von F', body: `/20 → im 3. Oktett Blockgröße 16. 172.16.16.0/20 umfasst 172.16.**16**.0 – 172.16.**31**.255.` },
            { label: '172.16.31.5', body: `31 liegt in 16–31 → passt auf F (/20) und E (/16) → längeres Präfix **F → R2**.` },
            { label: '172.16.32.1', body: `32 liegt außerhalb von 16–31 → passt nur auf E → **R1**.` },
          ],
          result: `172.16.31.5 → R2, 172.16.32.1 → R1.`,
        },
        {
          type: 'check',
          question: {
            id: 'm09-l04-c1',
            kind: 'single',
            skill: 'routing.lpm',
            difficulty: 2,
            prompt: `Ein Router hat die Routen 192.168.1.0/24 → R1 und 192.168.1.128/25 → R2 sowie 0.0.0.0/0 → R3. Wohin wird ein Paket an **192.168.1.200** geschickt?`,
            options: ['R1', 'R2', 'R3', 'Es wird verworfen'],
            answer: 1,
            distractors: {
              '0': { why: 'Die /24 passt zwar, aber die /25 ist spezifischer.', error: 'lpm-kuerzer' },
              '2': { why: 'Die Default Route wird nur genutzt, wenn nichts Spezifischeres passt.', error: 'lpm-default' },
              '3': { why: 'Es passen sogar drei Routen.', error: 'lpm-verwerfen' },
            },
            hints: ['192.168.1.128/25 umfasst .128 bis .255.'],
            explanation: `.200 liegt in 192.168.1.128/25 (.128–.255). /25 ist länger als /24 → **R2**.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: Longest Prefix Match (generiert)',
          generator: 'routing.lpm',
          count: 5,
          difficulty: 2,
        },
        {
          type: 'practice',
          title: 'Übung: LPM-Aufgaben aus dem Pool',
          questionIds: ['m09-q016', 'm09-q017', 'm09-q018', 'm09-q019', 'm09-q020'],
          count: 4,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Passen mehrere Routen, gewinnt die mit dem längsten Präfix (spezifischste Route).',
            'Die Default Route /0 passt immer, wird aber nur genutzt, wenn nichts anderes passt.',
            'Passt gar nichts → Paket verwerfen, ICMP Destination Unreachable.',
            'Präfixlänge geht vor Metrik.',
            'Bei krummen Präfixen Blockgröße im betroffenen Oktett ausrechnen.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm09-l05',
      title: 'Der Weg eines Pakets: MAC, IP und TTL',
      minutes: 25,
      relevance: 'ap1',
      skills: ['routing.forwarding', 'routing.ttl'],
      simple: `Ein Paket reist wie eine Sendung bei einer Spedition: Die **Endadresse** (Ziel-IP) bleibt die ganze Zeit gleich. Für jede Etappe bekommt es aber einen neuen Lieferschein mit der Adresse der **nächsten Station** (MAC-Adresse = Hardwareadresse des nächsten Geräts). Jeder Router zieht außerdem 1 von der **TTL** (Time to Live, „Lebensdauer“) ab. Ist sie bei 0, wird das Paket verworfen – so kreist kein Paket endlos im Netz.

**Merke:** IP-Adressen bleiben Ende-zu-Ende gleich (außer bei NAT), MAC-Adressen wechseln an jedem Router, die TTL sinkt pro Router um 1.`,
      steps: [
        {
          type: 'explain',
          title: 'Was ein Router mit jedem Paket tut',
          body: `Jetzt setzen wir alles zusammen. Ein Router, der einen Frame erhält, arbeitet so:

1. **Frame annehmen:** Ziel-MAC ist seine eigene Interface-MAC (sonst ignoriert er den Frame). FCS prüfen.
2. **Auspacken:** Ethernet-Header und -Trailer entfernen → das **IP-Paket** bleibt übrig.
3. **TTL prüfen und senken:** TTL um 1 verringern. Ist sie **0**, wird das Paket **verworfen** und der Absender bekommt ein **ICMP „Time Exceeded“** (Typ 11). Die IP-Header-Prüfsumme wird neu berechnet.
4. **Routing-Entscheidung:** Ziel-IP in der Routingtabelle nachschlagen (**Longest Prefix Match**) → Ausgangsinterface und Next Hop.
5. **Next-Hop-MAC ermitteln:** per **ARP** (oder aus dem ARP-Cache) die MAC des Next Hops – bzw. des Zielhosts, wenn das Zielnetz direkt verbunden ist.
6. **Neu einpacken:** **neuer Frame** mit **Quell-MAC = eigenes Ausgangsinterface**, **Ziel-MAC = Next Hop**, und absenden.

Daraus folgt die wichtigste Erkenntnis dieser Lektion:

| | ändert sich an jedem Router? |
|---|---|
| **Quell-/Ziel-MAC** | **Ja** – MAC-Adressen gelten nur für einen Abschnitt (Hop) |
| **Quell-/Ziel-IP** | **Nein** – bleiben Ende-zu-Ende gleich (**Ausnahme: NAT**, z. B. am Internetrouter) |
| **TTL** | **Ja** – sinkt pro Router um 1 |

**Die TTL** (*Time To Live*, bei IPv6 *Hop Limit*) ist ein 8-Bit-Feld im IP-Header. Startwerte sind betriebssystemabhängig, typisch **128** (Windows) und **64** (Linux/macOS). Sie verhindert, dass Pakete bei Routing-Schleifen ewig kreisen. \`tracert\` (Windows) bzw. \`traceroute\` (Linux) nutzt genau das: Es sendet Pakete mit TTL 1, 2, 3, … und jeder Router auf dem Weg verrät sich durch sein „Time Exceeded“.`,
        },
        {
          type: 'visual',
          title: 'Paketweg von Hamburg nach Berlin',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['PC-HH', 'R-HH', 'R-B', 'Srv-B'],
              messages: [
                { from: 0, to: 1, label: 'MAC: PC-HH → R-HH (Gi0/0)', note: 'IP: 192.168.10.20 → 192.168.20.50, TTL 128' },
                { from: 1, to: 2, label: 'MAC: R-HH (Gi0/1) → R-B (Gi0/1)', note: 'IP unverändert, TTL 127' },
                { from: 2, to: 3, label: 'MAC: R-B (Gi0/0) → Srv-B', note: 'IP unverändert, TTL 126' },
              ],
            },
          },
          caption: `Auf jedem Abschnitt neue MAC-Adressen – die IP-Adressen bleiben von Anfang bis Ende gleich. Die TTL sinkt an jedem Router um 1.`,
        },
        {
          type: 'example',
          title: 'Adressen auf jedem Abschnitt',
          problem: `PC-HH (192.168.10.20, MAC **A1**) schickt ein Paket an Srv-B (192.168.20.50, MAC **S1**). R-HH: Gi0/0-MAC **H0**, Gi0/1-MAC **H1**. R-B: Gi0/1-MAC **B1**, Gi0/0-MAC **B0**. Der PC startet mit TTL 128. Gib für jeden Abschnitt die Adressen an.`,
          steps: [
            { label: 'Abschnitt 1: PC-HH → R-HH', body: `Quell-MAC **A1**, Ziel-MAC **H0** (Gateway). Quell-IP 192.168.10.20, Ziel-IP 192.168.20.50. TTL **128**.` },
            { label: 'R-HH verarbeitet', body: `TTL → 127. Routingtabelle: 192.168.20.0/24 via 10.0.0.2 über Gi0/1. ARP für 10.0.0.2 → MAC B1.` },
            { label: 'Abschnitt 2: R-HH → R-B', body: `Quell-MAC **H1**, Ziel-MAC **B1**. IPs unverändert. TTL **127**.` },
            { label: 'R-B verarbeitet', body: `TTL → 126. 192.168.20.0/24 ist direkt verbunden (Gi0/0) → ARP für 192.168.20.50 → MAC S1.` },
            { label: 'Abschnitt 3: R-B → Srv-B', body: `Quell-MAC **B0**, Ziel-MAC **S1**. IPs unverändert. TTL **126**.` },
          ],
          result: `MACs: A1→H0, H1→B1, B0→S1. IPs immer 192.168.10.20 → 192.168.20.50. TTL beim Server: 126.`,
        },
        {
          type: 'check',
          question: {
            id: 'm09-l05-c1',
            kind: 'number',
            skill: 'routing.ttl',
            difficulty: 2,
            prompt: `Ein Linux-Server sendet ein Paket mit TTL 64. Auf dem Weg zum Ziel liegen 6 Router. Mit welcher TTL kommt das Paket beim Ziel an?`,
            answer: 58,
            hints: ['Jeder Router senkt die TTL um genau 1. Das Ziel selbst senkt nicht.'],
            explanation: `64 − 6 = **58**. Nur Router verringern die TTL.`,
          },
        },
        {
          type: 'check',
          question: {
            id: 'm09-l05-c2',
            kind: 'order',
            skill: 'routing.forwarding',
            difficulty: 2,
            prompt: `Bringe die Arbeitsschritte eines Routers in die richtige Reihenfolge.`,
            items: [
              'Frame empfangen, Ziel-MAC = eigene MAC, FCS prüfen',
              'Ethernet-Header entfernen',
              'TTL um 1 verringern (bei 0 verwerfen)',
              'Ziel-IP in der Routingtabelle nachschlagen (Longest Prefix Match)',
              'MAC des Next Hops per ARP ermitteln',
              'Neuen Frame mit neuer Quell- und Ziel-MAC bilden und senden',
            ],
            explanation: `Annehmen → auspacken → TTL → Routing-Entscheidung → ARP für Next Hop → neu verpacken und senden.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: Paketweg und TTL',
          questionIds: ['m09-q021', 'm09-q022', 'm09-q023', 'm09-q024', 'm09-q025', 'm09-q026'],
          count: 4,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'MAC-Adressen gelten nur pro Abschnitt und werden an jedem Router neu gesetzt.',
            'IP-Adressen bleiben Ende-zu-Ende gleich (Ausnahme NAT).',
            'Jeder Router senkt die TTL um 1; bei 0 → verwerfen + ICMP Time Exceeded.',
            'tracert/traceroute nutzt die TTL, um die Router auf dem Weg sichtbar zu machen.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm09-l06',
      title: 'Routing für mehrere Standorte planen',
      minutes: 30,
      relevance: 'ap1',
      skills: ['routing.multisite', 'routing.static', 'routing.default'],
      simple: `Bei mehreren Standorten muss jeder Router wissen, wie er zu **jedem** Netz kommt – und wie die Antwort zurückkommt. Stell dir eine Firma mit Zentrale und Filialen vor: Die Filialen schicken alles Unbekannte zur Zentrale (Default Route), die Zentrale braucht für jede Filiale einen eigenen Eintrag. Die Router sind über kleine **Transfernetze** verbunden (meist /30 mit genau zwei nutzbaren Adressen). Der **Next Hop** ist immer die Adresse des Nachbarrouters in diesem Transfernetz.

**Merke:** Netze sammeln → direkte Netze → statische Routen → Default Route → Rückweg prüfen.`,
      steps: [
        {
          type: 'explain',
          title: 'Vorgehen bei Routingaufgaben',
          body: `Die Elektro Krämer GmbH wächst: Zusätzlich zu Hamburg und Berlin kommt ein **Lager in Lübeck** dazu. Hamburg ist die Zentrale mit dem einzigen Internetanschluss (**Hub-and-Spoke**/Sternstruktur).

**Schema für jede Routingtabellen-Aufgabe:**

1. **Alle Netze auflisten** – LANs **und** Transfernetze.
2. Pro Router: **direkt verbundene Netze** eintragen (Next Hop „direkt“).
3. Für jedes **nicht** direkt verbundene Netz: Wer ist der **nächste Router** auf dem Weg? Dessen IP **im gemeinsamen Transfernetz** ist der Next Hop.
4. Prüfen, ob man Einträge durch eine **Default Route** ersetzen kann (Außenstellen: oft nur „alles zur Zentrale“).
5. **Rückweg prüfen:** Kommt die Antwort auch zurück?

**Transfernetze** zwischen zwei Routern sind typischerweise **/30** (2 nutzbare Adressen) oder **/31** (Punkt-zu-Punkt nach RFC 3021).`,
        },
        {
          type: 'visual',
          title: 'Drei Standorte im Stern',
          widget: {
            kind: 'topology',
            data: {
              nodes: [
                { id: 'inet', type: 'internet', label: 'Internet', x: 400, y: 40 },
                { id: 'rhh', type: 'router', label: 'R-HH', sub: 'Zentrale', x: 400, y: 170 },
                { id: 'lanhh', type: 'switch', label: 'LAN HH', sub: '192.168.10.0/24', x: 400, y: 330 },
                { id: 'rb', type: 'router', label: 'R-B', sub: 'Berlin', x: 140, y: 260 },
                { id: 'lanb', type: 'switch', label: 'LAN B', sub: '192.168.20.0/24', x: 140, y: 380 },
                { id: 'rl', type: 'router', label: 'R-HL', sub: 'Lübeck', x: 660, y: 260 },
                { id: 'lanl', type: 'switch', label: 'LAN HL', sub: '192.168.30.0/24', x: 660, y: 380 },
              ],
              links: [
                { from: 'rhh', to: 'inet', label: '203.0.113.0/30', style: 'wan' },
                { from: 'rhh', to: 'lanhh', label: 'Gi0/0 .1' },
                { from: 'rhh', to: 'rb', label: '10.0.0.0/30 (.1|.2)', style: 'wan' },
                { from: 'rhh', to: 'rl', label: '10.0.0.4/30 (.5|.6)', style: 'wan' },
                { from: 'rb', to: 'lanb', label: '.1' },
                { from: 'rl', to: 'lanl', label: '.1' },
              ],
              zones: [
                { label: 'Berlin', x: 60, y: 210, w: 170, h: 205, color: 'green' },
                { label: 'Hamburg', x: 290, y: 120, w: 220, h: 295, color: 'blue' },
                { label: 'Lübeck', x: 575, y: 210, w: 170, h: 205, color: 'orange' },
              ],
            },
          },
          caption: `R-HH: Gi0/0 = 192.168.10.1, Gi0/1 = 10.0.0.1 (zu Berlin), Gi0/2 = 10.0.0.5 (zu Lübeck), Gi0/3 = 203.0.113.2 (Provider 203.0.113.1). R-B: 10.0.0.2 / 192.168.20.1. R-HL: 10.0.0.6 / 192.168.30.1.`,
        },
        {
          type: 'example',
          title: 'Routingtabelle der Zentrale',
          problem: `Erstelle die vollständige Routingtabelle von R-HH und die von R-HL (Lübeck).`,
          steps: [
            { label: 'Netze sammeln', body: `LANs: 192.168.10.0/24, 192.168.20.0/24, 192.168.30.0/24. Transfernetze: 10.0.0.0/30, 10.0.0.4/30, 203.0.113.0/30.` },
            { label: 'R-HH direkt', body: `192.168.10.0/24 (Gi0/0), 10.0.0.0/30 (Gi0/1), 10.0.0.4/30 (Gi0/2), 203.0.113.0/30 (Gi0/3).` },
            { label: 'R-HH statisch', body: `192.168.20.0/24 via **10.0.0.2** (Gi0/1), 192.168.30.0/24 via **10.0.0.6** (Gi0/2), 0.0.0.0/0 via **203.0.113.1** (Gi0/3).` },
            { label: 'R-HL', body: `Direkt: 192.168.30.0/24 (Gi0/0), 10.0.0.4/30 (Gi0/1). Alles andere – Hamburg, Berlin, Internet – liegt hinter R-HH → eine einzige **Default Route 0.0.0.0/0 via 10.0.0.5**.` },
            { label: 'Kontrolle Berlin → Lübeck', body: `R-B: Default → R-HH. R-HH: 192.168.30.0/24 → 10.0.0.6. R-HL: direkt. Rückweg: R-HL Default → R-HH, R-HH: 192.168.20.0/24 → 10.0.0.2. ✔` },
          ],
          result: `R-HH braucht 4 direkte + 3 statische Einträge; die Außenstellen kommen mit ihren direkten Netzen plus einer Default Route aus.`,
        },
        {
          type: 'check',
          question: {
            id: 'm09-l06-c1',
            kind: 'single',
            skill: 'routing.multisite',
            difficulty: 2,
            prompt: `Ein PC in Berlin erreicht den Server in Lübeck nicht. R-B und R-HL haben korrekte Default Routes zu R-HH. Auf R-HH fehlt die Route nach 192.168.30.0/24. Was passiert mit dem Paket auf R-HH?`,
            options: [
              'Es wird nach Lübeck geflutet.',
              'Es wird über die Default Route von R-HH ins Internet geschickt (und dort verworfen).',
              'R-HH fragt per ARP nach 192.168.30.0.',
              'Es wird an R-B zurückgeschickt.',
            ],
            answer: 1,
            distractors: {
              '0': { why: 'Router fluten nie.', error: 'router-flood' },
              '2': { why: 'ARP funktioniert nur im direkt verbundenen Netz.', error: 'router-arp-fern' },
              '3': { why: 'R-HH hat dafür keine Route; die Default Route zeigt zum Provider.', error: 'router-zurueck' },
            },
            explanation: `Ohne spezifische Route greift bei R-HH die **Default Route** Richtung Internet. Private Adressen werden dort nicht geroutet → Paket geht verloren. Lösung: statische Route 192.168.30.0/24 via 10.0.0.6.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: Mehrstandort-Routing',
          questionIds: ['m09-q027', 'm09-q028', 'm09-q029', 'm09-q030', 'm09-q031'],
          count: 4,
          difficulty: 3,
        },
        {
          type: 'summary',
          points: [
            'Schema: Netze sammeln → direkte Netze → statische Routen über Transfernetz-Next-Hops → Default Route → Rückweg prüfen.',
            'Next Hop = IP des Nachbarrouters im gemeinsamen Transfernetz.',
            'Außenstellen in Sternnetzen: direkte Netze + Default Route zur Zentrale.',
            'Die Zentrale braucht Routen zu allen Außenstellen-LANs plus Default ins Internet.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm09-l07',
      title: 'Dynamisches Routing (Überblick)',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['routing.dynamic'],
      simple: `Bei vielen Routern wird das Eintragen von Hand mühsam und fehleranfällig. Dann tauschen die Router ihre Wege automatisch aus – mit **Routingprotokollen** wie RIP, OSPF oder BGP. Das ist wie ein Navi mit Stauinfo: Fällt eine Strecke aus, wird von selbst ein anderer Weg berechnet. **RIP** zählt nur die Router auf dem Weg (Hops), **OSPF** kennt die ganze Netzkarte und rechnet mit Kosten, **BGP** verbindet die großen Netze des Internets.

**Merke:** Statisch = von Hand und fest; dynamisch = Router lernen Wege automatisch und reagieren auf Ausfälle.`,
      steps: [
        {
          type: 'explain',
          title: 'Wenn statische Routen nicht mehr reichen',
          body: `Hat ein Unternehmen viele Standorte und **redundante Wege**, wird statisches Routing unübersichtlich – und bei einem Leitungsausfall passt sich nichts an. **Dynamische Routingprotokolle** lassen Router ihre Netze **untereinander austauschen** und bei Änderungen **automatisch neue Wege** berechnen.

| Protokoll | Typ | Metrik | Einsatz |
|---|---|---|---|
| **RIP** (v2) | Distanzvektor | **Hop-Anzahl** (max. 15, 16 = unerreichbar) | kleine Netze, heute veraltet |
| **OSPF** | Link-State | **Kosten** (aus der Bandbreite abgeleitet) | Unternehmensnetze (IGP) |
| **BGP** | Pfadvektor | Pfadattribute (u. a. AS-Pfad) | zwischen **autonomen Systemen**, Internet (EGP) |

- **IGP** (*Interior Gateway Protocol*): innerhalb einer Organisation (RIP, OSPF, EIGRP).
- **EGP** (*Exterior Gateway Protocol*): zwischen Organisationen/Providern – praktisch nur **BGP**.

Für AP1 genügt: *Statisch = manuell, dynamisch = automatisch per Protokoll; RIP zählt Hops, OSPF rechnet Kosten, BGP verbindet das Internet.*`,
        },
        {
          type: 'explain',
          title: 'Vertiefung: Distanzvektor vs. Link-State',
          body: `**Distanzvektor** (RIP): Jeder Router kennt nur **Entfernung (Distanz)** und **Richtung (Vektor)** zu einem Ziel – das, was ihm seine Nachbarn erzählen („Routing by rumor“). RIP schickt periodisch (alle 30 s) seine Tabelle an die Nachbarn. Nachteil: langsame Konvergenz, Gefahr von Routing-Schleifen (*Count to Infinity*), deshalb das Limit von 15 Hops.

**Link-State** (OSPF): Jeder Router lernt die **komplette Topologie** seines Bereichs (Link-State-Datenbank) und berechnet mit dem **Dijkstra-/SPF-Algorithmus** selbst den kürzesten Weg. Updates nur bei Änderungen. Schnelle Konvergenz; große Netze werden in **Areas** gegliedert (Area 0 = Backbone).

**Administrative Distanz** (Cisco-Begriff): Lernt ein Router dasselbe Präfix aus **verschiedenen Quellen**, entscheidet die Vertrauenswürdigkeit – je **kleiner**, desto besser:

| Quelle | AD (Cisco) |
|---|---|
| direkt verbunden | 0 |
| statisch | 1 |
| eBGP | 20 |
| OSPF | 110 |
| RIP | 120 |

Reihenfolge der Entscheidung: **1. längstes Präfix → 2. Administrative Distanz → 3. Metrik.**

Eine nützliche Praxistechnik ist die **Floating Static Route**: eine statische Backup-Route mit **höherer** AD als das dynamische Protokoll, die nur greift, wenn die dynamische Route verschwindet.`,
        },
        {
          type: 'check',
          question: {
            id: 'm09-l07-c1',
            kind: 'match',
            skill: 'routing.dynamic',
            difficulty: 2,
            prompt: `Ordne jedem Routingprotokoll seine Eigenschaft zu.`,
            left: ['RIP', 'OSPF', 'BGP'],
            right: ['Routing zwischen autonomen Systemen im Internet', 'Distanzvektor, Metrik = Hop-Anzahl', 'Link-State, Dijkstra-Algorithmus'],
            answer: [1, 2, 0],
            explanation: `RIP = Distanzvektor/Hops, OSPF = Link-State/SPF, BGP = Pfadvektor zwischen autonomen Systemen.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: Dynamisches Routing',
          questionIds: ['m09-q032', 'm09-q033', 'm09-q034', 'm09-q035', 'm09-q036'],
          count: 3,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Dynamische Protokolle tauschen Routen automatisch aus und reagieren auf Ausfälle.',
            'RIP: Distanzvektor, Hop-Count, max. 15 Hops.',
            'OSPF: Link-State, Kosten, Dijkstra/SPF, Areas.',
            'BGP: Pfadvektor zwischen autonomen Systemen – das Protokoll des Internets.',
            'Entscheidung: längstes Präfix → Administrative Distanz → Metrik.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm09-l08',
      title: 'Routen zusammenfassen (Supernetting)',
      minutes: 25,
      relevance: 'ap1-teilweise',
      skills: ['routing.aggregate'],
      simple: `Erreicht ein Router mehrere Netze über **denselben** Nachbarn, kann er sie zu **einer** Route zusammenfassen. Das ist wie bei Postleitzahlen: Statt 20095, 20097, 20099 … einzeln aufzuzählen, sagst du „alles mit 20… geht ins Verteilzentrum Hamburg“. Technisch nimmst du die Bits, die bei allen Netzen gleich sind, als neuen Netzanteil – das Präfix (die Zahl hinter dem Schrägstrich) wird kleiner. Das klappt nur, wenn die Netze lückenlos hintereinander liegen und das erste Netz am Anfang eines passenden Blocks beginnt.

**Merke:** 2 gleich große Netze = 1 Bit weniger, 4 Netze = 2 Bit weniger, 8 Netze = 3 Bit weniger – und das erste Netz muss auf der Blockgrenze liegen.`,
      steps: [
        {
          type: 'explain',
          title: 'Warum Routen zusammenfassen?',
          body: `Das Lager in Lübeck hat inzwischen vier VLANs bekommen: **192.168.32.0/24** (Büro), **192.168.33.0/24** (Scanner), **192.168.34.0/24** (Kameras) und **192.168.35.0/24** (Drucker). Alle vier erreicht die Zentrale über denselben Next Hop **10.0.0.6** (R-HL).

Ohne Zusammenfassung braucht R-HH dafür **vier** statische Routen. Mit einer **Sammelroute** (auch **Routenaggregation**, **Route Summarization** oder **Supernetting** genannt) reicht **eine**:

| Ohne Zusammenfassung | Mit Sammelroute |
|---|---|
| 192.168.32.0/24 via 10.0.0.6 | **192.168.32.0/22 via 10.0.0.6** |
| 192.168.33.0/24 via 10.0.0.6 | |
| 192.168.34.0/24 via 10.0.0.6 | |
| 192.168.35.0/24 via 10.0.0.6 | |

**Vorteile:**
- **Kleinere Routingtabellen** – weniger Einträge, weniger Tippfehler, schnellere Suche.
- **Weniger Änderungen:** Kommt in Lübeck ein Netz aus demselben Block dazu, muss in Hamburg nichts angepasst werden.
- Bei dynamischem Routing: weniger Updates zwischen den Routern.

**Voraussetzung:** Alle zusammengefassten Netze liegen hinter **demselben Next Hop**. Eine Sammelroute zu einem Router, hinter dem nur ein Teil der Netze liegt, schickt Pakete in die falsche Richtung.

**Begriff „Supernetting“:** Beim Subnetting machst du das Präfix **länger** (ein Netz wird in kleinere geteilt). Beim Supernetting machst du es **kürzer** (mehrere Netze werden zu einem größeren Block zusammengefasst) – also genau die Gegenrichtung.`,
        },
        {
          type: 'explain',
          title: 'So rechnest du – in drei Schritten',
          body: `**Schritt 1 – Größe bestimmen:** Zähle die Adressen aller Netze zusammen. Die Summe muss eine **Zweierpotenz** sein (512, 1024, 2048 …), sonst gibt es keine exakte Sammelroute.
- Vier /24-Netze = 4 · 256 = **1024 Adressen** = 2¹⁰ → Präfix 32 − 10 = **/22**.
- Kurzregel für gleich große Netze: 2 Netze → Präfix − 1, 4 Netze → Präfix − 2, 8 Netze → Präfix − 3.

**Schritt 2 – Ausrichtung prüfen:** Das **erste** Netz muss auf einer Blockgrenze des neuen Präfixes liegen. Ein /22 umfasst im 3. Oktett **4** Werte. Die Sammelroute kann also nur bei 0, 4, 8, 12 … 32 … beginnen. 32 ist durch 4 teilbar → passt.

**Schritt 3 – Probe binär:** Schreib das Oktett, in dem sich die Netze unterscheiden, binär untereinander:

| Netz | 3. Oktett binär |
|---|---|
| 192.168.32.0 | \`001000|00\` |
| 192.168.33.0 | \`001000|01\` |
| 192.168.34.0 | \`001000|10\` |
| 192.168.35.0 | \`001000|11\` |

Die ersten 6 Bit des 3. Oktetts sind bei allen gleich. Dazu kommen die 16 Bit der ersten beiden Oktette: 16 + 6 = **22** gemeinsame Bits → **192.168.32.0/22**.

**Wenn es nicht passt:** 192.168.1.0/24 und 192.168.2.0/24 lassen sich **nicht** zu einem /23 zusammenfassen. Ein /23 beginnt nur bei geraden Werten: 192.168.0.0/23 enthält .0 und .1, 192.168.2.0/23 enthält .2 und .3. Die kleinste gemeinsame Route wäre 192.168.0.0/22 – sie enthält aber zusätzlich die fremden Netze .0 und .3. Dann trägst du lieber **zwei** einzelne Routen ein.

**Häufiger Fehler:** pro Netz ein Bit abziehen (4 Netze → /20). Richtig ist: 4 = 2² → nur **2** Bit.`,
        },
        {
          type: 'visual',
          title: 'Vier Routen werden zu einer',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Vorher', text: '4 Einträge: 192.168.32.0/24 bis 192.168.35.0/24, alle via 10.0.0.6', icon: 'List' },
                { title: 'Rechnung', text: '4 Netze = 2² → 2 Bit weniger: /24 → /22. Start 32 ist durch 4 teilbar.', icon: 'Calculator' },
                { title: 'Nachher', text: '1 Eintrag: 192.168.32.0/22 via 10.0.0.6 (deckt .32 bis .35 ab)', icon: 'CheckCircle' },
              ],
            },
          },
          caption: 'Eine Sammelroute und spezifischere Einzelrouten dürfen gleichzeitig existieren – durch den Longest Prefix Match gewinnt dann immer der genauere Eintrag.',
        },
        {
          type: 'example',
          title: 'Nicht ausgerichtete Netze',
          problem: `In Lübeck kommen statt .32–.35 die Netze **192.168.34.0/24, 192.168.35.0/24, 192.168.36.0/24 und 192.168.37.0/24** zum Einsatz (alle via 10.0.0.6). Finde die kleinstmögliche Anzahl an Routen, die **genau** diese Netze abdeckt.`,
          steps: [
            { label: 'Größe', body: `4 · 256 = 1024 Adressen = 2¹⁰ → eine einzelne Route müsste ein **/22** sein.` },
            { label: 'Ausrichtung', body: `Ein /22 beginnt im 3. Oktett nur bei Vielfachen von 4: 32, 36, 40 … **34 ist nicht durch 4 teilbar** → kein exakter /22 möglich.` },
            { label: 'Binärprobe', body: `34 = \`00100010\`, 37 = \`00100101\`. Gemeinsam sind nur die ersten 5 Bit → kleinste gemeinsame Route 192.168.32.0/21. Die enthält aber auch .32, .33, .38 und .39 – fremde Netze.` },
            { label: 'Aufteilen', body: `34 und 35: 34 ist durch 2 teilbar → **192.168.34.0/23**. 36 und 37: 36 ist durch 2 teilbar → **192.168.36.0/23**.` },
          ],
          result: `Zwei Routen: **192.168.34.0/23** und **192.168.36.0/23**, beide via 10.0.0.6. Eine einzige Route geht nur, wenn man fremde Netze mit einschließt – das ist nur zulässig, wenn diese Netze nirgendwo anders verwendet werden.`,
        },
        {
          type: 'check',
          question: {
            id: 'm09-l08-c1',
            kind: 'cidr',
            skill: 'routing.aggregate',
            difficulty: 2,
            prompt: `Fasse die acht Netze **10.20.8.0/24 bis 10.20.15.0/24** (alle über denselben Next Hop) zu einer Sammelroute zusammen.`,
            answer: '10.20.8.0/21',
            misconceptions: [
              { answer: '10.20.8.0/16', error: 'bits-statt-anzahl', why: 'Du hast pro Netz ein Bit abgezogen. 8 Netze = 2³ → nur 3 Bit weniger: /21.' },
              { answer: '10.20.8.0/22', error: 'supernet-zu-klein', why: 'Ein /22 umfasst nur 4 der 8 Netze (.8 bis .11).' },
              { answer: '10.20.15.0/21', error: 'supernet-falsche-basis', why: 'Die Sammelroute beginnt beim ersten Netz (.8).' },
            ],
            hints: ['8 Netze = 2 hoch wie viel?', '8 = 2³ → /24 − 3.'],
            explanation: `**10.20.8.0/21**\n\n1. 8 Netze = 2³ → 3 Bit weniger als /24 → **/21**.\n2. Ein /21 umfasst im 3. Oktett 8 Werte. 8 ist durch 8 teilbar → ausgerichtet.\n3. Probe: 8 = \`00001|000\`, 15 = \`00001|111\` → die ersten 5 Bit gleich → 16 + 5 = 21.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: Sammelrouten (generiert)',
          generator: 'routing.supernet',
          count: 5,
          difficulty: 2,
        },
        {
          type: 'practice',
          title: 'Übung: Supernetting aus dem Pool',
          questionIds: ['m09-q038', 'm09-q039', 'm09-q040', 'm09-q041', 'm09-q042', 'm09-q043'],
          count: 5,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Sammelroute = mehrere Netze hinter demselben Next Hop mit einem kürzeren Präfix.',
            'Größe: Summe der Adressen muss eine Zweierpotenz sein; 2/4/8 gleich große Netze → Präfix −1/−2/−3.',
            'Ausrichtung: Das erste Netz muss durch die neue Blockgröße teilbar sein – sonst mehrere Routen.',
            'Probe: Oktett binär untereinander schreiben, gleiche Bits von links zählen.',
            'Sammelroute und genauere Einzelrouten dürfen nebeneinander stehen – Longest Prefix Match entscheidet.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm09-l09',
      title: 'Router auswählen: SoHo, Business, Profi – nach Datenblatt',
      minutes: 25,
      relevance: 'ap1',
      skills: ['routing.select'],
      simple: `Ein Router für Büro oder Zuhause (**SoHo** = Small Office/Home Office) ist ein Alleskönner: Modem, Router, kleiner Switch, WLAN, DHCP-Server und Firewall in einem Gerät – wie ein Schweizer Taschenmesser. Profi-Router im Rechenzentrum können weniger Zusatzfunktionen, leiten aber sehr viele Daten zuverlässig weiter und werden meist per Kommandozeile eingerichtet. Bei der Auswahl liest du das Datenblatt wie eine Checkliste: Passt der Internetanschluss? Reichen Ports, WLAN und VPN (verschlüsselter Tunnel ins Firmennetz)? Erst wenn alle Pflichtpunkte erfüllt sind, entscheidet der Preis.

**Merke:** Erst die Muss-Kriterien aus der Aufgabe prüfen, Geräte mit Lücken ausscheiden, dann unter den passenden das wirtschaftlichste wählen – und die Wahl begründen.`,
      steps: [
        {
          type: 'explain',
          title: 'Drei Router-Klassen',
          body: `| | **SoHo-Router** | **Business-/KMU-Router** | **Profi-Router (Edge/Core)** |
|---|---|---|---|
| Einsatz | Zuhause, kleines Büro (bis ca. 10–20 Personen) | Firmen mit mehreren Standorten, Filialen | Rechenzentrum, Provider, große Standorte |
| Internet-Anschluss | Modem oft eingebaut (DSL, Kabel/DOCSIS, Glasfaser-ONT) oder WAN-Ethernet | 1–2 WAN-Ports (Ethernet/SFP) für **Lastverteilung oder Ausfallsicherung**, oft Mobilfunk-Backup | viele Ports, modulare Einschübe (SFP/SFP+ für Glasfaser) |
| Zusatzfunktionen | WLAN, 4-Port-Switch, DHCP, DNS-Weiterleitung, Firewall/NAT, Gäste-WLAN, VPN für wenige Nutzer, DynDNS, oft Telefonanlage/DECT, USB-Speicher | VLANs, viele VPN-Tunnel, Firewall-Regeln, Monitoring, meist **ohne** WLAN | dynamisches Routing (OSPF, BGP), sehr hoher Durchsatz, redundante Netzteile; DHCP/WLAN übernehmen andere Geräte |
| Bedienung | Weboberfläche, App | Weboberfläche und Kommandozeile (CLI), zentrale Verwaltung | fast nur CLI per **SSH** (nie per unverschlüsseltem Telnet) |
| Bauform | Tischgerät | Tischgerät oder 19″-Rack | 19″-Rack |

**Merksatz:** Je professioneller der Router, desto **weniger Nebenfunktionen** und desto **mehr Leistung, Ports und Ausfallsicherheit**.`,
        },
        {
          type: 'explain',
          title: 'Ein Router-Datenblatt lesen',
          body: `In der Prüfung bekommst du oft zwei oder drei Datenblätter als Beleg und eine Anforderungsliste. Diese Punkte prüfst du der Reihe nach:

| Datenblatt-Angabe | Worauf du achtest |
|---|---|
| **WAN-Anschluss** | Passt er zum Anschluss des Kunden? VDSL2/Supervectoring (DSL), DOCSIS 3.1 (Kabelnetz), Glasfaser mit eingebautem ONT/SFP **oder** WAN-Ethernet für ein externes Glasfasermodem (ONT) des Providers. |
| **LAN-Ports** | Anzahl und Geschwindigkeit (1 GbE, 2,5 GbE). Reichen sie oder kommt ein Switch dazu? |
| **WLAN** | Standard (Wi-Fi 6/6E/7), Frequenzbänder, Gäste-WLAN. Business-Router haben oft gar kein WLAN – dann werden Access Points gebraucht. |
| **VPN** | Protokolle (IPsec, WireGuard, OpenVPN) und **Anzahl gleichzeitiger Tunnel** – wichtig für Homeoffice. |
| **Durchsatz** | NAT-/Firewall-Durchsatz und **VPN-Durchsatz** getrennt lesen: Verschlüsseln kostet Rechenleistung, der VPN-Durchsatz ist oft deutlich kleiner. |
| **Ausfallsicherheit** | zweiter WAN-Port, Mobilfunk-Backup (LTE/5G), redundantes Netzteil. |
| **Verwaltung & Updates** | Weboberfläche/CLI, VLAN-Unterstützung, Dauer der Sicherheitsupdates durch den Hersteller. |
| **Sonstiges** | Leistungsaufnahme (Stromkosten im Dauerbetrieb), Bauform, Preis, Garantie. |

**Vorgehen bei der Auswahl:**
1. Anforderungen in **Muss** (zwingend) und **Kann** (wünschenswert) trennen.
2. Jedes Gerät gegen die Muss-Kriterien prüfen. Fehlt eines → Gerät scheidet aus.
3. Unter den verbleibenden Geräten: Kann-Kriterien und Preis vergleichen (bei vielen Kriterien: Nutzwertanalyse).
4. Entscheidung **mit Begründung** aufschreiben – ohne Begründung gibt es in der Prüfung kaum Punkte.`,
        },
        {
          type: 'example',
          title: 'Belegaufgabe: Router für ein Steuerbüro',
          problem: `Ein Kunde des IT-Systemhauses (Steuerbüro, 8 Arbeitsplätze) bekommt einen Glasfaseranschluss. Der Provider liefert ein **Glasfasermodem (ONT) mit Ethernet-Ausgang**. Anforderungen:

- **Muss:** Anschluss an das ONT per Ethernet, **mindestens 5 gleichzeitige VPN-Verbindungen** für das Homeoffice, getrenntes **Gäste-WLAN** für Mandanten, mindestens 4 LAN-Ports.
- **Kann:** Mobilfunk-Backup bei Ausfall der Glasfaser.

| Merkmal | Router A | Router B | Router C |
|---|---|---|---|
| WAN | VDSL2-Modem eingebaut, **kein** Ethernet-WAN | 1 × 2,5-GbE-WAN (für externes ONT) | 2 × 1-GbE-WAN, 2 × SFP |
| LAN | 4 × 1 GbE | 4 × 1 GbE | 8 × 1 GbE |
| WLAN | Wi-Fi 6, Gäste-WLAN | Wi-Fi 6, Gäste-WLAN | kein WLAN |
| VPN | WireGuard, max. 4 Tunnel | WireGuard und IPsec, max. 10 Tunnel | IPsec und SSL-VPN, max. 50 Tunnel |
| Mobilfunk-Backup | nein | ja (LTE-Stick am USB-Port) | ja (Zusatzmodul) |
| Preis | 189 € | 259 € | 690 € (+ Access Point 140 €) |`,
          steps: [
            { label: 'Router A prüfen', body: `Kein Ethernet-WAN → kann nicht an das ONT angeschlossen werden. Außerdem nur 4 VPN-Tunnel < 5. **Scheidet aus.**` },
            { label: 'Router B prüfen', body: `Ethernet-WAN ✔, 10 Tunnel ≥ 5 ✔, Gäste-WLAN ✔, 4 LAN-Ports ✔. Kann-Kriterium Mobilfunk-Backup ✔.` },
            { label: 'Router C prüfen', body: `Alle Muss-Kriterien erfüllbar, aber **kein WLAN** → für das Gäste-WLAN ist ein zusätzlicher Access Point nötig. Gesamtpreis 830 €.` },
            { label: 'Entscheiden', body: `B und C erfüllen alle Muss-Kriterien. B kostet 259 €, C mit Access Point 830 €. Die Mehrleistung von C (50 Tunnel, zweiter WAN-Port) braucht ein Büro mit 8 Plätzen nicht.` },
          ],
          result: `**Router B**: Er erfüllt alle Muss-Kriterien und das Kann-Kriterium und ist mit 259 € die wirtschaftlichste Lösung. Router A scheidet wegen fehlendem Ethernet-WAN und zu wenigen VPN-Tunneln aus, Router C ist für die Bürogröße überdimensioniert und braucht einen zusätzlichen Access Point.`,
        },
        {
          type: 'check',
          question: {
            id: 'm09-l09-c1',
            kind: 'single',
            skill: 'routing.select',
            difficulty: 2,
            prompt: `Im Datenblatt eines Routers stehen: „Firewall-Durchsatz 940 Mbit/s“, „VPN-Durchsatz (IPsec) 180 Mbit/s“, „WLAN bis 2.400 Mbit/s“. Mit welcher Datenrate können die Homeoffice-Nutzer über VPN **höchstens** gemeinsam arbeiten?`,
            options: ['940 Mbit/s', '180 Mbit/s', '2.400 Mbit/s', '180 Mbit/s je Nutzer'],
            answer: 1,
            distractors: {
              '0': { why: 'Der Firewall-Durchsatz gilt für unverschlüsselten Verkehr. Verschlüsseln kostet Rechenleistung.', error: 'datenblatt-falscher-wert' },
              '2': { why: 'Die WLAN-Bruttorate betrifft nur die Funkstrecke im Büro, nicht den VPN-Tunnel.', error: 'datenblatt-falscher-wert' },
              '3': { why: 'Der VPN-Durchsatz ist die Gesamtleistung des Geräts und wird auf alle Tunnel aufgeteilt.', error: 'datenblatt-falscher-wert' },
            },
            explanation: `**180 Mbit/s** – der VPN-Durchsatz begrenzt alle Tunnel zusammen. Häufiger Fehler: den größten Wert im Datenblatt nehmen. Für jede Anforderung zählt der **passende** Wert.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: Router auswählen',
          questionIds: ['m09-q044', 'm09-q045', 'm09-q046', 'm09-q047', 'm09-q048'],
          count: 5,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'SoHo-Router = Alleskönner (Modem, WLAN, Switch, DHCP, Firewall, VPN für wenige Nutzer).',
            'Business-Router: mehrere WAN-Ports, viele VPN-Tunnel, VLANs, meist ohne WLAN; Profi-Router: hoher Durchsatz, dynamisches Routing, Bedienung per SSH/CLI.',
            'Datenblatt prüfen: WAN-Typ, LAN-Ports, WLAN, VPN-Protokolle und Tunnelzahl, VPN-Durchsatz, Ausfallsicherheit, Updates.',
            'Vorgehen: Muss-Kriterien → Ausschluss → Kann-Kriterien/Preis → Entscheidung mit Begründung.',
          ],
        },
      ],
    },
  ],

  /* ==================================================================== */
  /* Fragenpool                                                           */
  /* ==================================================================== */
  questions: [
    // ---------- Grundlagen ----------
    {
      id: 'm09-q001',
      kind: 'single',
      skill: 'routing.basics',
      difficulty: 1,
      prompt: `Auf welcher OSI-Schicht arbeitet ein Router?`,
      options: ['Schicht 1', 'Schicht 2', 'Schicht 3', 'Schicht 4'],
      answer: 2,
      distractors: {
        '0': { why: 'Schicht 1 = Bitübertragung (Hub, Repeater).', error: 'osi-router' },
        '1': { why: 'Schicht 2 = Sicherung (Switch, MAC).', error: 'osi-router' },
        '3': { why: 'Schicht 4 = Transport (TCP/UDP).', error: 'osi-router' },
      },
      explanation: `Router arbeiten auf **Schicht 3 (Vermittlungsschicht)** mit IP-Adressen.`,
    },
    {
      id: 'm09-q002',
      kind: 'multi',
      skill: 'routing.basics',
      difficulty: 2,
      prompt: `Welche Aussagen über Router sind richtig? (Mehrfachauswahl)`,
      options: [
        'Ein Router trennt Broadcastdomänen.',
        'Ein Router flutet Pakete mit unbekanntem Ziel an alle Interfaces.',
        'Jedes Router-Interface liegt in einem anderen IP-Netz.',
        'Ein Router verringert die TTL eines weitergeleiteten Pakets.',
        'Ein Router ändert die Ziel-IP-Adresse jedes Pakets auf die des Next Hops.',
      ],
      answer: [0, 2, 3],
      explanation: `Router trennen Broadcastdomänen, haben pro Interface ein eigenes Netz und senken die TTL. Sie fluten **nie** und ändern die Ziel-IP nicht (nur bei NAT).`,
    },
    {
      id: 'm09-q003',
      kind: 'match',
      skill: 'routing.basics',
      difficulty: 1,
      prompt: `Ordne jedem Gerät seine Arbeitsweise zu.`,
      left: ['Hub', 'Switch', 'Router'],
      right: [
        'Schicht 3, Routingtabelle, trennt Broadcastdomänen',
        'Schicht 1, verteilt Signale an alle Ports',
        'Schicht 2, MAC-Adresstabelle, flutet unbekannte Ziele',
      ],
      answer: [1, 2, 0],
      explanation: `Hub = Schicht 1 (verteilt alles). Switch = Schicht 2 (MAC-Tabelle, flutet unbekannte Ziele). Router = Schicht 3 (Routingtabelle, trennt Broadcastdomänen).`,
    },
    {
      id: 'm09-q004',
      kind: 'single',
      skill: 'routing.basics',
      difficulty: 2,
      prompt: `Ein Router empfängt ein Paket für 172.20.5.9. In seiner Routingtabelle passt kein Eintrag, und es gibt keine Default Route. Was passiert?`,
      options: [
        'Das Paket wird an alle Interfaces gesendet.',
        'Das Paket wird verworfen, der Absender erhält in der Regel ICMP „Destination Unreachable“.',
        'Das Paket wird zurück an den Absender geschickt.',
        'Der Router wartet, bis eine passende Route gelernt wurde.',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'Router fluten nie – das ist Switch-Verhalten.', error: 'router-flood' },
        '2': { why: 'Das Paket selbst wird nicht zurückgeschickt, nur eine ICMP-Fehlermeldung.', error: 'router-zurueck' },
        '3': { why: 'Router puffern keine Pakete für unbekannte Ziele.', error: 'router-warten' },
      },
      explanation: `Keine passende Route → **verwerfen** + meist **ICMP Destination Unreachable** (Typ 3) an den Absender.`,
    },
    // ---------- Gateway ----------
    {
      id: 'm09-q005',
      kind: 'single',
      skill: 'routing.gateway',
      difficulty: 1,
      prompt: `Welche Aussage zum Standardgateway eines Clients ist richtig?`,
      options: [
        'Es muss im selben Subnetz wie der Client liegen.',
        'Es muss die Adresse des DNS-Servers sein.',
        'Es wird nur für Pakete im eigenen Netz genutzt.',
        'Es muss immer die letzte Adresse des Netzes sein.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'DNS-Server und Gateway sind unterschiedliche Funktionen (können aber auf einem Gerät liegen).', error: 'gateway-dns' },
        '2': { why: 'Umgekehrt: Für das eigene Netz braucht man kein Gateway.', error: 'gateway-lokal' },
        '3': { why: 'Üblich ist die erste oder letzte nutzbare Adresse – vorgeschrieben ist das nicht.', error: 'gateway-adresse' },
      },
      explanation: `Der Client muss sein Gateway direkt (per ARP) erreichen können → es liegt **im selben Subnetz**.`,
    },
    {
      id: 'm09-q006',
      kind: 'single',
      skill: 'routing.gateway',
      difficulty: 2,
      prompt: `**Handlungssituation:** Eine Mitarbeiterin in Hamburg meldet: „Ich komme auf den Drucker im Büro, aber nicht ins Internet und nicht auf den Server in Berlin.“ \`ipconfig\` zeigt: IP 192.168.10.57, Maske 255.255.255.0, Standardgateway leer. Was ist die wahrscheinlichste Ursache?`,
      options: [
        'Falsche Subnetzmaske',
        'Fehlendes Standardgateway',
        'Defekte Netzwerkkarte',
        'Doppelte MAC-Adresse',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'Die Maske passt zum Netz 192.168.10.0/24, lokale Kommunikation funktioniert.', error: 'diag-maske' },
        '2': { why: 'Dann ginge auch der Drucker nicht.', error: 'diag-nic' },
        '3': { why: 'Dafür gibt es keinen Hinweis; lokal funktioniert alles.', error: 'diag-mac' },
      },
      explanation: `Lokal geht, fremde Netze nicht → **Standardgateway fehlt**. Ohne Gateway weiß der PC nicht, wohin er Pakete für andere Netze schicken soll.`,
    },
    {
      id: 'm09-q007',
      kind: 'single',
      skill: 'routing.gateway',
      difficulty: 3,
      prompt: `Ein PC hat 192.168.10.130/25 und Gateway 192.168.10.1. Was ist das Problem?`,
      options: [
        'Keines, .1 ist ein typisches Gateway.',
        'Das Gateway liegt nicht im Subnetz des PCs (192.168.10.128/25), er kann es nicht erreichen.',
        'Die IP .130 ist eine Broadcastadresse.',
        'Das Gateway muss .254 sein.',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'Mit /25 gehört .1 zu 192.168.10.0/25, der PC aber zu 192.168.10.128/25.', error: 'gateway-subnetz' },
        '2': { why: 'Broadcast von 192.168.10.128/25 ist .255.', error: 'broadcast-calc' },
        '3': { why: 'Die Adresse ist frei wählbar, muss aber im Subnetz liegen.', error: 'gateway-adresse' },
      },
      hints: ['/25 teilt das letzte Oktett in 0–127 und 128–255.'],
      explanation: `192.168.10.130/25 → Netz **192.168.10.128/25** (.129–.254 nutzbar). Das Gateway .1 liegt in 192.168.10.0/25 → nicht erreichbar. Ein passendes Gateway wäre z. B. .129.`,
    },
    {
      id: 'm09-q008',
      kind: 'text',
      skill: 'routing.gateway',
      difficulty: 1,
      prompt: `Mit welchem Windows-Befehl lässt du dir die Routingtabelle des PCs anzeigen? (Befehl mit Parameter)`,
      accept: ['route print', 'netstat -r', 'netstat -rn'],
      placeholder: 'Befehl',
      explanation: `\`route print\` (alternativ \`netstat -r\`). Unter Linux: \`ip route\`.`,
    },
    // ---------- Routingtabelle ----------
    {
      id: 'm09-q009',
      kind: 'match',
      skill: 'routing.table',
      difficulty: 1,
      prompt: `Ordne die Spalten einer Routingtabelle ihrer Bedeutung zu.`,
      left: ['Zielnetz', 'Präfix/Maske', 'Next Hop', 'Interface', 'Metrik'],
      right: [
        'Ausgangsschnittstelle des Routers',
        'IP-Adresse des nächsten Routers',
        'Kosten des Weges – kleiner ist besser',
        'Netzadresse, die erreicht werden soll',
        'Größe des Zielnetzes',
      ],
      answer: [3, 4, 1, 0, 2],
      explanation: `Zielnetz + Präfix beschreiben das Ziel, Next Hop und Interface den Weg, die Metrik die Kosten.`,
    },
    {
      id: 'm09-q010',
      kind: 'single',
      skill: 'routing.table',
      difficulty: 1,
      prompt: `Welche Routen kennt ein frisch konfigurierter Router ohne statische Routen und ohne Routingprotokoll?`,
      options: ['Keine', 'Nur die Default Route', 'Die direkt verbundenen Netze seiner aktiven Interfaces', 'Alle privaten Netze'],
      answer: 2,
      distractors: {
        '0': { why: 'Direkt verbundene Netze werden automatisch eingetragen.', error: 'table-connected' },
        '1': { why: 'Eine Default Route muss konfiguriert oder gelernt werden.', error: 'table-default-auto' },
        '3': { why: 'Private Netze sind nicht automatisch bekannt.', error: 'table-privat' },
      },
      explanation: `Sobald ein Interface eine IP hat und aktiv ist, steht sein Netz als **connected** in der Tabelle.`,
    },
    {
      id: 'm09-q011',
      kind: 'table',
      skill: 'routing.static',
      difficulty: 2,
      prompt: `Vervollständige die Routingtabelle von **R-HH** (Hamburg). R-HH: Gi0/0 = 192.168.10.1/24, Gi0/1 = 10.0.0.1/30 (zu R-B, 10.0.0.2), Gi0/2 = 203.0.113.2/30 (Provider 203.0.113.1). Berliner LAN: 192.168.20.0/24. Für direkt verbundene Netze trage beim Next Hop „direkt“ ein.`,
      columns: [
        { key: 'net', label: 'Zielnetz', type: 'ip' },
        { key: 'mask', label: 'Subnetzmaske', type: 'mask' },
        { key: 'hop', label: 'Next Hop', type: 'text' },
        { key: 'if', label: 'Interface', type: 'text' },
      ],
      rows: [
        { cells: { net: { given: '192.168.10.0' }, mask: { given: '255.255.255.0' }, hop: { answer: 'direkt', accept: ['direkt', 'direkt verbunden', '-', 'connected'] }, if: { answer: 'Gi0/0' } } },
        { cells: { net: { given: '10.0.0.0' }, mask: { answer: '255.255.255.252' }, hop: { answer: 'direkt', accept: ['direkt', 'direkt verbunden', '-', 'connected'] }, if: { answer: 'Gi0/1' } } },
        { cells: { net: { given: '203.0.113.0' }, mask: { answer: '255.255.255.252' }, hop: { answer: 'direkt', accept: ['direkt', 'direkt verbunden', '-', 'connected'] }, if: { answer: 'Gi0/2' } } },
        { cells: { net: { answer: '192.168.20.0' }, mask: { answer: '255.255.255.0' }, hop: { answer: '10.0.0.2' }, if: { answer: 'Gi0/1' } } },
        { cells: { net: { answer: '0.0.0.0' }, mask: { answer: '0.0.0.0' }, hop: { answer: '203.0.113.1' }, if: { answer: 'Gi0/2' } } },
      ],
      hints: ['/30 = 255.255.255.252.', 'Next Hop nach Berlin = R-B im Transfernetz.', 'Die letzte Zeile ist die Default Route.'],
      explanation: `Drei direkt verbundene Netze, eine statische Route nach Berlin über **10.0.0.2** und die Default Route **0.0.0.0/0.0.0.0** über den Provider **203.0.113.1**.`,
    },
    {
      id: 'm09-q012',
      kind: 'text',
      skill: 'routing.static',
      difficulty: 2,
      prompt: `Gib den Cisco-IOS-Befehl an, mit dem R-HH eine statische Route zum Netz 192.168.20.0/24 über den Next Hop 10.0.0.2 erhält.`,
      accept: [
        'ip route 192.168.20.0 255.255.255.0 10.0.0.2',
        'ip route 192.168.20.0 255.255.255.0 10.0.0.2 1',
      ],
      placeholder: 'ip route …',
      hints: ['Syntax: ip route <Netz> <Maske> <Next Hop>'],
      explanation: `\`ip route 192.168.20.0 255.255.255.0 10.0.0.2\` – Cisco erwartet die Maske in Punktschreibweise.`,
    },
    {
      id: 'm09-q013',
      kind: 'single',
      skill: 'routing.default',
      difficulty: 2,
      prompt: `Warum wird die Default Route nur genutzt, wenn keine andere Route passt?`,
      options: [
        'Weil sie die höchste Metrik hat.',
        'Weil sie mit /0 das kürzestmögliche Präfix hat und beim Longest Prefix Match immer verliert.',
        'Weil sie immer zuletzt in der Tabelle steht.',
        'Weil sie nur für Internetadressen gilt.',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'Die Metrik spielt erst bei gleichem Präfix eine Rolle.', error: 'default-metrik' },
        '2': { why: 'Die Reihenfolge in der Tabelle ist egal, es zählt die Präfixlänge.', error: 'default-reihenfolge' },
        '3': { why: 'Sie passt auf jede Adresse, auch private.', error: 'default-internet' },
      },
      explanation: `Die Default Route hat **/0** – jede andere passende Route ist spezifischer und gewinnt.`,
    },
    {
      id: 'm09-q014',
      kind: 'multi',
      skill: 'routing.static',
      difficulty: 2,
      prompt: `Welche Aussagen zu statischem Routing sind richtig? (Mehrfachauswahl)`,
      options: [
        'Statische Routen passen sich bei Leitungsausfall automatisch an.',
        'Statische Routen erzeugen keine Last durch Routingprotokolle.',
        'Statisches Routing eignet sich gut für kleine Netze mit wenigen Wegen.',
        'Bei vielen Netzen und Änderungen steigt der Pflegeaufwand stark.',
      ],
      answer: [1, 2, 3],
      explanation: `Statische Routen sind einfach und ressourcenschonend, passen sich aber **nicht** automatisch an – bei vielen Netzen wird der Aufwand groß.`,
    },
    {
      id: 'm09-q015',
      kind: 'single',
      skill: 'routing.table',
      difficulty: 2,
      prompt: `In \`show ip route\` auf einem Cisco-Router steht \`S* 0.0.0.0/0 [1/0] via 203.0.113.1\`. Was bedeutet dieser Eintrag?`,
      options: [
        'Eine per OSPF gelernte Route ins Netz 0.0.0.0',
        'Eine statische Default Route mit Next Hop 203.0.113.1',
        'Ein direkt verbundenes Netz',
        'Eine gesperrte Route',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'OSPF-Routen sind mit O gekennzeichnet.', error: 'cisco-codes' },
        '2': { why: 'Direkt verbundene Netze sind mit C gekennzeichnet.', error: 'cisco-codes' },
        '3': { why: 'Der Stern markiert den Kandidaten für die Default Route.', error: 'cisco-codes' },
      },
      explanation: `**S** = static, **\\*** = Default-Kandidat, 0.0.0.0/0 = Default Route, [1/0] = Administrative Distanz 1 / Metrik 0.`,
    },
    // ---------- LPM ----------
    {
      id: 'm09-q016',
      kind: 'table',
      skill: 'routing.lpm',
      difficulty: 2,
      prompt: `Routingtabelle: **A** 10.0.0.0/8 → R1, **B** 10.20.0.0/16 → R2, **C** 10.20.30.0/24 → R3, **D** 0.0.0.0/0 → R4. Trage für jede Ziel-IP den gewählten Router ein.`,
      columns: [
        { key: 'ip', label: 'Ziel-IP', type: 'ip' },
        { key: 'r', label: 'Next Hop', type: 'text' },
      ],
      rows: [
        { cells: { ip: { given: '10.20.30.40' }, r: { answer: 'R3' } } },
        { cells: { ip: { given: '10.20.31.40' }, r: { answer: 'R2' } } },
        { cells: { ip: { given: '10.21.30.40' }, r: { answer: 'R1' } } },
        { cells: { ip: { given: '11.20.30.40' }, r: { answer: 'R4' } } },
      ],
      hints: ['Prüfe für jede Zeile von der spezifischsten Route (/24) zur allgemeinsten (/0).'],
      explanation: `10.20.30.40 → /24 passt → R3. 10.20.31.40 → /24 nicht (31≠30), /16 passt → R2. 10.21.30.40 → nur /8 → R1. 11.20.30.40 → nur Default → R4.`,
    },
    {
      id: 'm09-q017',
      kind: 'single',
      skill: 'routing.lpm',
      difficulty: 3,
      prompt: `Routen: 172.16.0.0/16 → R1, 172.16.16.0/20 → R2, 172.16.20.0/22 → R3. Wohin geht ein Paket an **172.16.23.200**?`,
      options: ['R1', 'R2', 'R3', 'verworfen'],
      answer: 2,
      distractors: {
        '0': { why: '/16 passt, ist aber nicht die längste passende Route.', error: 'lpm-kuerzer' },
        '1': { why: '/20 (16–31) passt, aber /22 ist länger und passt auch.', error: 'lpm-kuerzer' },
        '3': { why: 'Es passen sogar drei Routen.', error: 'lpm-verwerfen' },
      },
      hints: ['/22 → Blockgröße 4 im 3. Oktett.', '172.16.20.0/22 umfasst 20, 21, 22, 23 im dritten Oktett.'],
      explanation: `172.16.20.0/22 umfasst 172.16.20.0–172.16.23.255 → 23 passt. /22 ist das längste passende Präfix → **R3**.`,
    },
    {
      id: 'm09-q018',
      kind: 'single',
      skill: 'routing.lpm',
      difficulty: 3,
      prompt: `Routen: 192.168.0.0/16 → R1, 192.168.8.0/21 → R2, 192.168.12.0/24 → R3. Wohin geht ein Paket an **192.168.16.5**?`,
      options: ['R1', 'R2', 'R3', 'verworfen'],
      answer: 0,
      distractors: {
        '1': { why: '192.168.8.0/21 umfasst im 3. Oktett nur 8–15; 16 liegt außerhalb.', error: 'lpm-bereich' },
        '2': { why: '192.168.12.0/24 umfasst nur 192.168.12.x.', error: 'lpm-bereich' },
        '3': { why: 'Die /16 passt.', error: 'lpm-verwerfen' },
      },
      hints: ['/21 → Blockgröße 8 im 3. Oktett.'],
      explanation: `/21 → 192.168.8.0–192.168.15.255; 16 liegt außerhalb. /24 passt auch nicht. Nur 192.168.0.0/16 passt → **R1**.`,
    },
    {
      id: 'm09-q019',
      kind: 'text',
      skill: 'routing.lpm',
      difficulty: 1,
      prompt: `Wie heißt das Prinzip, nach dem ein Router bei mehreren passenden Routen die mit dem längsten Präfix wählt? (englischer Fachbegriff)`,
      accept: ['Longest Prefix Match', 'Longest-Prefix-Match', 'Longest Match', 'LPM', 'longest prefix matching'],
      explanation: `**Longest Prefix Match** – die spezifischste Route gewinnt.`,
    },
    {
      id: 'm09-q020',
      kind: 'single',
      skill: 'routing.lpm',
      difficulty: 2,
      prompt: `Ein Router kennt 10.1.1.0/24 mit Metrik 50 über R1 und 10.1.0.0/16 mit Metrik 1 über R2 (beide aus demselben Routingprotokoll). Wohin geht ein Paket an 10.1.1.9?`,
      options: ['R1, weil das Präfix länger ist', 'R2, weil die Metrik kleiner ist', 'Lastverteilung auf beide', 'verworfen, weil die Routen sich widersprechen'],
      answer: 0,
      distractors: {
        '1': { why: 'Die Metrik vergleicht nur Routen mit gleichem Präfix. Das längere Präfix gewinnt immer.', error: 'lpm-metrik' },
        '2': { why: 'Lastverteilung gibt es nur bei gleichem Präfix und gleicher Metrik.', error: 'lpm-ecmp' },
        '3': { why: 'Überlappende Routen sind normal.', error: 'lpm-verwerfen' },
      },
      explanation: `**Präfixlänge vor Metrik:** /24 ist spezifischer als /16 → **R1**.`,
    },
    // ---------- Paketweg / TTL ----------
    {
      id: 'm09-q021',
      kind: 'table',
      skill: 'routing.forwarding',
      difficulty: 3,
      prompt: `PC-HH (IP 192.168.10.20, MAC **A1**) sendet an Srv-B (IP 192.168.20.50, MAC **S1**). R-HH hat LAN-MAC **H0** und WAN-MAC **H1**, R-B hat WAN-MAC **B1** und LAN-MAC **B0**. Trage die Adressen für jeden Abschnitt ein (MAC als Kürzel).`,
      columns: [
        { key: 'seg', label: 'Abschnitt', type: 'text' },
        { key: 'smac', label: 'Quell-MAC', type: 'text' },
        { key: 'dmac', label: 'Ziel-MAC', type: 'text' },
        { key: 'sip', label: 'Quell-IP', type: 'ip' },
        { key: 'dip', label: 'Ziel-IP', type: 'ip' },
      ],
      rows: [
        { cells: { seg: { given: 'PC-HH → R-HH' }, smac: { answer: 'A1' }, dmac: { answer: 'H0' }, sip: { answer: '192.168.10.20' }, dip: { answer: '192.168.20.50' } } },
        { cells: { seg: { given: 'R-HH → R-B' }, smac: { answer: 'H1' }, dmac: { answer: 'B1' }, sip: { answer: '192.168.10.20' }, dip: { answer: '192.168.20.50' } } },
        { cells: { seg: { given: 'R-B → Srv-B' }, smac: { answer: 'B0' }, dmac: { answer: 'S1' }, sip: { answer: '192.168.10.20' }, dip: { answer: '192.168.20.50' } } },
      ],
      hints: ['MAC-Adressen gelten nur pro Abschnitt.', 'IP-Adressen ändern sich ohne NAT nie.'],
      explanation: `Pro Abschnitt: Quell-MAC = sendendes Interface, Ziel-MAC = empfangendes Interface. Die IP-Adressen bleiben 192.168.10.20 → 192.168.20.50.`,
    },
    {
      id: 'm09-q022',
      kind: 'number',
      skill: 'routing.ttl',
      difficulty: 1,
      prompt: `Ein Windows-PC sendet ein Paket mit TTL 128. Es passiert 4 Router. Welche TTL hat es beim Empfänger?`,
      answer: 124,
      explanation: `128 − 4 = **124**.`,
    },
    {
      id: 'm09-q023',
      kind: 'single',
      skill: 'routing.ttl',
      difficulty: 2,
      prompt: `Was passiert, wenn ein Router die TTL eines Pakets auf 0 senkt?`,
      options: [
        'Er setzt die TTL wieder auf 64 und leitet weiter.',
        'Er verwirft das Paket und sendet ICMP „Time Exceeded“ an den Absender.',
        'Er leitet das Paket an die Default Route.',
        'Er sendet das Paket als Broadcast.',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'Die TTL wird nie zurückgesetzt – sonst könnten Pakete endlos kreisen.', error: 'ttl-reset' },
        '2': { why: 'Ein Paket mit TTL 0 wird nicht mehr weitergeleitet.', error: 'ttl-default' },
        '3': { why: 'Router erzeugen keine Broadcasts aus Paketen.', error: 'ttl-broadcast' },
      },
      explanation: `TTL 0 → **verwerfen** + **ICMP Time Exceeded** (Typ 11). Darauf basiert \`tracert\`/\`traceroute\`.`,
    },
    {
      id: 'm09-q024',
      kind: 'multi',
      skill: 'routing.forwarding',
      difficulty: 2,
      prompt: `Ein Paket wird von einem Router weitergeleitet (kein NAT). Was **ändert** sich? (Mehrfachauswahl)`,
      options: ['Quell-MAC', 'Ziel-MAC', 'Quell-IP', 'Ziel-IP', 'TTL', 'IP-Header-Prüfsumme'],
      answer: [0, 1, 4, 5],
      explanation: `MAC-Adressen werden neu gesetzt, die TTL sinkt, und deshalb wird die **IP-Header-Prüfsumme** neu berechnet. Die IP-Adressen bleiben gleich.`,
    },
    {
      id: 'm09-q025',
      kind: 'single',
      skill: 'routing.ttl',
      difficulty: 2,
      prompt: `Wie funktioniert \`tracert\` (Windows) grundsätzlich?`,
      options: [
        'Es fragt jeden Router nach seiner Routingtabelle.',
        'Es sendet Pakete mit steigender TTL (1, 2, 3, …) und wertet die ICMP-„Time Exceeded“-Antworten der Router aus.',
        'Es liest den ARP-Cache aller Router aus.',
        'Es sendet einen Broadcast in alle Netze.',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'Routingtabellen werden nicht abgefragt.', error: 'tracert-tabelle' },
        '2': { why: 'ARP-Caches sind von außen nicht lesbar und nur lokal.', error: 'tracert-arp' },
        '3': { why: 'Broadcasts überschreiten keine Router.', error: 'tracert-broadcast' },
      },
      explanation: `TTL 1 → erster Router antwortet mit Time Exceeded, TTL 2 → zweiter Router usw. So wird jeder Hop sichtbar.`,
    },
    {
      id: 'm09-q026',
      kind: 'single',
      skill: 'routing.forwarding',
      difficulty: 3,
      prompt: `Ein Paket vom PC 192.168.10.20 geht über den Internetrouter der Elektro Krämer GmbH (mit NAT, öffentliche IP 203.0.113.2) zu einem Webserver 93.184.216.34. Welche Quell-IP sieht der Webserver?`,
      options: ['192.168.10.20', '203.0.113.2', '192.168.10.1', 'Die MAC-Adresse des PCs'],
      answer: 1,
      distractors: {
        '0': { why: 'Private Adressen werden am NAT-Router durch die öffentliche ersetzt.', error: 'nat-privat' },
        '2': { why: 'Das ist die LAN-Adresse des Routers, nicht seine öffentliche.', error: 'nat-lan' },
        '3': { why: 'MAC-Adressen verlassen das lokale Segment nicht.', error: 'nat-mac' },
      },
      explanation: `**NAT** ist die Ausnahme von der Regel „IP bleibt gleich“: Der Router ersetzt die private Quell-IP durch seine öffentliche **203.0.113.2**.`,
    },
    // ---------- Mehrstandort ----------
    {
      id: 'm09-q027',
      kind: 'table',
      skill: 'routing.multisite',
      difficulty: 3,
      prompt: `**Handlungssituation:** Die Elektro Krämer GmbH hat Standorte Hamburg (LAN 192.168.10.0/24), Berlin (192.168.20.0/24) und Lübeck (192.168.30.0/24). R-HH ist über 10.0.0.0/30 mit R-B (R-HH .1, R-B .2) und über 10.0.0.4/30 mit R-HL (R-HH .5, R-HL .6) verbunden. Der Internetzugang von R-HH geht über 203.0.113.1. Ergänze die **statischen** Routen von R-HH.`,
      columns: [
        { key: 'net', label: 'Zielnetz', type: 'ip' },
        { key: 'prefix', label: 'Präfix', type: 'text' },
        { key: 'hop', label: 'Next Hop', type: 'ip' },
      ],
      rows: [
        { cells: { net: { given: '192.168.20.0' }, prefix: { given: '/24' }, hop: { answer: '10.0.0.2' } } },
        { cells: { net: { given: '192.168.30.0' }, prefix: { given: '/24' }, hop: { answer: '10.0.0.6' } } },
        { cells: { net: { answer: '0.0.0.0' }, prefix: { answer: '/0', accept: ['/0', '0'] }, hop: { answer: '203.0.113.1' } } },
      ],
      hints: ['Der Next Hop ist immer die Adresse des Nachbarrouters im gemeinsamen Transfernetz.'],
      explanation: `Berlin über **10.0.0.2**, Lübeck über **10.0.0.6**, alles andere (Default 0.0.0.0/0) über **203.0.113.1**.`,
    },
    {
      id: 'm09-q028',
      kind: 'table',
      skill: 'routing.multisite',
      difficulty: 2,
      prompt: `Gleiche Topologie wie bei den Standorten Hamburg/Berlin/Lübeck. Erstelle die minimale Routingtabelle von **R-HL** (Lübeck: Gi0/0 = 192.168.30.1/24, Gi0/1 = 10.0.0.6/30). Für direkte Netze beim Next Hop „direkt“ eintragen.`,
      columns: [
        { key: 'net', label: 'Zielnetz', type: 'ip' },
        { key: 'prefix', label: 'Präfix', type: 'text' },
        { key: 'hop', label: 'Next Hop', type: 'text' },
        { key: 'if', label: 'Interface', type: 'text' },
      ],
      rows: [
        { cells: { net: { given: '192.168.30.0' }, prefix: { given: '/24' }, hop: { answer: 'direkt', accept: ['direkt', 'direkt verbunden', '-', 'connected'] }, if: { answer: 'Gi0/0' } } },
        { cells: { net: { given: '10.0.0.4' }, prefix: { answer: '/30', accept: ['/30', '30'] }, hop: { answer: 'direkt', accept: ['direkt', 'direkt verbunden', '-', 'connected'] }, if: { answer: 'Gi0/1' } } },
        { cells: { net: { given: '0.0.0.0' }, prefix: { answer: '/0', accept: ['/0', '0'] }, hop: { answer: '10.0.0.5' }, if: { answer: 'Gi0/1' } } },
      ],
      explanation: `Lübeck hat nur einen Weg nach draußen → zwei direkte Netze + Default Route über **10.0.0.5** (R-HH).`,
    },
    {
      id: 'm09-q029',
      kind: 'single',
      skill: 'routing.multisite',
      difficulty: 3,
      prompt: `Ein PC in Berlin (192.168.20.10) pingt den Server in Hamburg (192.168.10.5) an. Auf R-B ist eine Route nach 192.168.10.0/24 via 10.0.0.1 eingetragen, auf R-HH fehlt die Route nach 192.168.20.0/24, die Default Route von R-HH zeigt ins Internet. Was passiert?`,
      options: [
        'Der Ping klappt, weil der Hinweg funktioniert.',
        'Der Echo Request erreicht den Server, aber die Echo Reply geht an R-HH über die Default Route ins Internet verloren – der Ping scheitert.',
        'Der Echo Request erreicht den Server nicht.',
        'R-HH lernt die Route automatisch aus dem Request.',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'Ein Ping braucht Hin- **und** Rückweg.', error: 'rueckweg' },
        '2': { why: 'Der Hinweg ist durch die Route auf R-B und das direkt verbundene LAN in Hamburg gegeben.', error: 'rueckweg-hinweg' },
        '3': { why: 'Router lernen keine Routen aus Datenpaketen.', error: 'router-lernt' },
      },
      explanation: `Klassischer **Rückweg-Fehler**: Der Hinweg klappt, aber R-HH schickt die Antwort an 192.168.20.10 über seine Default Route zum Provider. Lösung: Route 192.168.20.0/24 via 10.0.0.2 auf R-HH.`,
    },
    {
      id: 'm09-q030',
      kind: 'text',
      skill: 'routing.multisite',
      difficulty: 3,
      prompt: `Die Zentrale möchte Berlin-Netze 192.168.20.0/24 und 192.168.21.0/24 mit **einer** statischen Route zusammenfassen. Wie lautet das zusammengefasste Netz in CIDR-Schreibweise?`,
      accept: ['192.168.20.0/23'],
      placeholder: 'a.b.c.d/n',
      hints: ['20 = 0001 0100, 21 = 0001 0101 – wie viele Bits sind gleich?'],
      explanation: `Im 3. Oktett unterscheiden sich 20 und 21 nur im letzten Bit → 16 + 7 = 23 gemeinsame Bits → **192.168.20.0/23** (umfasst 192.168.20.0–192.168.21.255).`,
    },
    {
      id: 'm09-q031',
      kind: 'free',
      skill: 'routing.multisite',
      difficulty: 2,
      prompt: `Ein Kollege fragt, warum die Außenstelle Berlin mit einer einzigen Default Route auskommt, die Zentrale in Hamburg aber für jede Außenstelle eine eigene Route braucht. Erläutern Sie den Zusammenhang.`,
      modelAnswer: `Berlin hat nur einen einzigen Weg nach draußen: alle fremden Netze (Hamburg, Lübeck, Internet) liegen hinter dem Router in Hamburg. Deshalb genügt eine Default Route 0.0.0.0/0 mit Next Hop R-HH im Transfernetz. Hamburg dagegen hat mehrere Wege: zu Berlin, zu Lübeck und ins Internet. Die Default Route der Zentrale zeigt bereits ins Internet; für jedes Außenstellen-LAN braucht R-HH daher eine spezifische Route mit dem jeweiligen Nachbarrouter als Next Hop. Diese Routen sind spezifischer als die Default Route und werden per Longest Prefix Match bevorzugt.`,
      keywords: ['Default Route', 'Next Hop', 'Transfernetz', 'spezifisch', 'Longest Prefix Match', 'ein Weg'],
      explanation: `Kern: Außenstelle hat nur einen Ausgang → Default genügt. Zentrale hat mehrere Ausgänge → spezifische Routen + Default ins Internet.`,
    },
    // ---------- Dynamisches Routing ----------
    {
      id: 'm09-q032',
      kind: 'single',
      skill: 'routing.dynamic',
      difficulty: 1,
      prompt: `Was ist der wesentliche Vorteil dynamischen Routings gegenüber statischem Routing?`,
      options: [
        'Es benötigt keine Router.',
        'Router passen ihre Routen bei Änderungen und Ausfällen automatisch an.',
        'Es ist immer sicherer.',
        'Es benötigt keine IP-Adressen.',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'Routingprotokolle laufen auf Routern.', error: 'dyn-router' },
        '2': { why: 'Im Gegenteil: Gelerntes kann auch manipuliert werden; Authentifizierung ist nötig.', error: 'dyn-sicher' },
        '3': { why: 'Routing basiert auf IP-Adressen.', error: 'dyn-ip' },
      },
      explanation: `Dynamische Protokolle tauschen Routen aus und **konvergieren** bei Änderungen automatisch.`,
    },
    {
      id: 'm09-q033',
      kind: 'number',
      skill: 'routing.dynamic',
      difficulty: 2,
      prompt: `Ab welcher Hop-Anzahl gilt ein Ziel bei RIP als **unerreichbar**?`,
      answer: 16,
      hints: ['Die maximale gültige Entfernung ist 15.'],
      explanation: `RIP erlaubt maximal **15** Hops; **16** bedeutet „unendlich“ = unerreichbar.`,
    },
    {
      id: 'm09-q034',
      kind: 'single',
      skill: 'routing.dynamic',
      difficulty: 2,
      prompt: `Welches Routingprotokoll wird zwischen den autonomen Systemen der Internetprovider eingesetzt?`,
      options: ['RIP', 'OSPF', 'BGP', 'ARP'],
      answer: 2,
      distractors: {
        '0': { why: 'RIP ist ein IGP für kleine Netze.', error: 'dyn-protokoll' },
        '1': { why: 'OSPF ist ein IGP innerhalb einer Organisation.', error: 'dyn-protokoll' },
        '3': { why: 'ARP löst IP- in MAC-Adressen auf und ist kein Routingprotokoll.', error: 'arp-routing' },
      },
      explanation: `**BGP** (Border Gateway Protocol) ist das EGP des Internets.`,
    },
    {
      id: 'm09-q035',
      kind: 'order',
      skill: 'routing.dynamic',
      difficulty: 3,
      prompt: `Ein Router hat mehrere Routen zu einem Ziel. In welcher Reihenfolge prüft er die Kriterien? (Vertiefung, Cisco)`,
      items: ['Längstes passendes Präfix', 'Administrative Distanz (Vertrauenswürdigkeit der Quelle)', 'Metrik innerhalb desselben Protokolls'],
      explanation: `Zuerst gewinnt immer das **längste Präfix**. Gleiches Präfix aus verschiedenen Quellen → **Administrative Distanz**. Gleiche Quelle → **Metrik**.`,
    },
    {
      id: 'm09-q036',
      kind: 'match',
      skill: 'routing.dynamic',
      difficulty: 3,
      prompt: `Ordne die Administrative Distanz (Cisco-Standardwerte) zu.`,
      left: ['Direkt verbunden', 'Statische Route', 'OSPF', 'RIP'],
      right: ['110', '0', '120', '1'],
      answer: [1, 3, 0, 2],
      explanation: `Connected 0, statisch 1, OSPF 110, RIP 120 – je kleiner, desto vertrauenswürdiger.`,
    },
    {
      id: 'm09-q037',
      kind: 'free',
      skill: 'routing.forwarding',
      difficulty: 3,
      prompt: `Erläutern Sie den Unterschied zwischen Switching und Routing anhand der Frage, welche Adressen sich auf dem Weg eines Pakets vom PC in Hamburg zum Server in Berlin ändern.`,
      modelAnswer: `Switching findet auf Schicht 2 innerhalb eines Netzes statt: Der Switch leitet Frames anhand der Ziel-MAC weiter und verändert dabei weder MAC- noch IP-Adressen. Routing findet auf Schicht 3 zwischen Netzen statt: Der Router entscheidet anhand der Ziel-IP und seiner Routingtabelle. Auf jedem Abschnitt (Hop) wird ein neuer Frame gebildet: Die Quell-MAC ist die des ausgehenden Router-Interfaces, die Ziel-MAC die des Next Hops bzw. des Zielhosts. Die IP-Adressen von Quelle und Ziel bleiben Ende-zu-Ende gleich (außer bei NAT), nur die TTL wird an jedem Router um 1 verringert.`,
      keywords: ['Schicht 2', 'Schicht 3', 'MAC', 'IP', 'Next Hop', 'TTL', 'NAT'],
      explanation: `Wichtig: MAC wechselt pro Hop, IP bleibt (außer NAT), TTL sinkt. Switch ändert keine Adressen.`,
    },
    {
      id: 'm09-q038',
      kind: 'cidr',
      skill: 'routing.aggregate',
      difficulty: 1,
      prompt: `Die Netze **172.16.4.0/24, 172.16.5.0/24, 172.16.6.0/24 und 172.16.7.0/24** liegen alle hinter demselben Router. Wie lautet die Sammelroute in CIDR-Notation?`,
      answer: '172.16.4.0/22',
      misconceptions: [
        { answer: '172.16.4.0/20', error: 'bits-statt-anzahl', why: '4 Netze = 2² → nur 2 Bit weniger als /24, nicht 4.' },
        { answer: '172.16.4.0/23', error: 'supernet-zu-klein', why: 'Ein /23 umfasst nur 2 der 4 Netze.' },
        { answer: '172.16.7.0/22', error: 'supernet-falsche-basis', why: 'Die Sammelroute beginnt beim ersten Netz.' },
      ],
      hints: ['4 Netze = 2²', 'Ist 4 durch 4 teilbar?'],
      explanation: `**172.16.4.0/22**\n\n1. 4 Netze à 256 Adressen = 1024 = 2¹⁰ → 32 − 10 = **/22**.\n2. Ausrichtung: 4 ist durch 4 teilbar ✔.\n3. Probe: 4 = \`000001|00\`, 7 = \`000001|11\` → 16 + 6 = 22 gemeinsame Bits.\n\nHäufiger Fehler: pro Netz ein Bit abziehen (/20).`,
    },
    {
      id: 'm09-q039',
      kind: 'number',
      skill: 'routing.aggregate',
      difficulty: 1,
      prompt: `Wie viele **/24-Netze** fasst die Sammelroute **10.8.0.0/21** zusammen?`,
      answer: 8,
      unit: 'Netze',
      misconceptions: [{ answer: '3', error: 'bits-statt-anzahl', why: '3 ist die Anzahl der Bits (24 − 21). Diese 3 Bits ergeben 2³ = 8 Kombinationen.' }],
      hints: ['Differenz der Präfixe: 24 − 21.', '2 hoch Differenz.'],
      explanation: `24 − 21 = 3 Bit → 2³ = **8** /24-Netze (10.8.0.0 bis 10.8.7.0).\n\nHäufiger Fehler: die Bitzahl (3) statt der Anzahl (2³) angeben.`,
    },
    {
      id: 'm09-q040',
      kind: 'single',
      skill: 'routing.aggregate',
      difficulty: 2,
      prompt: `Welches Netzpaar lässt sich **exakt** zu **einem /23** zusammenfassen?`,
      options: [
        '192.168.1.0/24 und 192.168.2.0/24',
        '192.168.2.0/24 und 192.168.3.0/24',
        '192.168.3.0/24 und 192.168.4.0/24',
        '192.168.5.0/24 und 192.168.6.0/24',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'Ein /23 beginnt nur bei geraden Werten im 3. Oktett. .1 ist ungerade – .1 gehört zu 192.168.0.0/23, .2 zu 192.168.2.0/23.', error: 'supernet-nicht-ausgerichtet' },
        '2': { why: '.3 ist ungerade, .3 und .4 liegen in zwei verschiedenen /23-Blöcken.', error: 'supernet-nicht-ausgerichtet' },
        '3': { why: '.5 ist ungerade, .5 und .6 liegen in zwei verschiedenen /23-Blöcken.', error: 'supernet-nicht-ausgerichtet' },
      },
      hints: ['Ein /23 umfasst zwei /24-Netze. Bei welchen Werten kann er beginnen?'],
      explanation: `Ein /23-Block beginnt im 3. Oktett bei einer **geraden** Zahl (0, 2, 4 …). Nur **2 und 3** bilden so einen Block: 2 = \`0000001|0\`, 3 = \`0000001|1\` → 192.168.2.0/23.\n\nHäufiger Fehler: Nur auf „zwei aufeinanderfolgende Netze“ achten und die Ausrichtung vergessen.`,
    },
    {
      id: 'm09-q041',
      kind: 'free',
      skill: 'routing.aggregate',
      difficulty: 2,
      prompt: `Erläutern Sie zwei Vorteile einer **Routenzusammenfassung** und nennen Sie eine Bedingung, die erfüllt sein muss, damit sie korrekt funktioniert.`,
      modelAnswer: `Vorteile: (1) Die Routingtabelle wird kleiner und übersichtlicher; das senkt den Pflegeaufwand und das Risiko von Tippfehlern. (2) Neue Netze aus demselben Adressblock sind automatisch erreichbar, ohne dass auf jedem Router eine weitere Route eingetragen werden muss; bei dynamischem Routing werden außerdem weniger Updates ausgetauscht. Bedingungen: Alle zusammengefassten Netze müssen hinter demselben Next Hop liegen, und die Netze müssen lückenlos und an der Blockgrenze ausgerichtet sein (die Gesamtgröße ist eine Zweierpotenz und das erste Netz liegt auf einer passenden Grenze). Sonst würde die Sammelroute auch fremde Netze umfassen oder Pakete in die falsche Richtung schicken.`,
      keywords: ['kleinere Routingtabelle', 'weniger Pflegeaufwand', 'neue Netze automatisch', 'gleicher Next Hop', 'ausgerichtet', 'Zweierpotenz'],
      hints: ['Denk an die Größe der Tabelle und an spätere Erweiterungen.', 'Was passiert, wenn ein Netz hinter einem anderen Router liegt?'],
      explanation: `Eine gute Antwort nennt zwei Vorteile (kleinere Tabelle, weniger Pflege/Updates) und mindestens eine Bedingung (gleicher Next Hop **oder** zusammenhängender, ausgerichteter Block).`,
    },
    {
      id: 'm09-q042',
      kind: 'table',
      skill: 'routing.aggregate',
      difficulty: 2,
      prompt: `Gib für jede Sammelroute das **erste** und das **letzte** enthaltene /24-Netz an (Netzadresse).`,
      columns: [
        { key: 'r', label: 'Sammelroute', type: 'text' },
        { key: 'first', label: 'erstes /24-Netz', type: 'ip' },
        { key: 'last', label: 'letztes /24-Netz', type: 'ip' },
      ],
      rows: [
        { cells: { r: { given: '192.168.40.0/21' }, first: { answer: '192.168.40.0' }, last: { answer: '192.168.47.0' } } },
        { cells: { r: { given: '10.1.64.0/22' }, first: { answer: '10.1.64.0' }, last: { answer: '10.1.67.0' } } },
        { cells: { r: { given: '172.20.6.0/23' }, first: { answer: '172.20.6.0' }, last: { answer: '172.20.7.0' } } },
      ],
      hints: ['/21 = 2³ = 8 Netze, /22 = 4 Netze, /23 = 2 Netze.', 'Letztes Netz = erstes + Anzahl − 1 (im 3. Oktett).'],
      explanation: `- /21: 24 − 21 = 3 Bit → 8 Netze: 40 bis 40 + 7 = **47**.\n- /22: 4 Netze: 64 bis **67**.\n- /23: 2 Netze: 6 bis **7**.\n\nHäufiger Fehler: 40 + 8 = 48 rechnen – das wäre schon das erste Netz des nächsten Blocks.`,
    },
    {
      id: 'm09-q043',
      kind: 'cidr',
      skill: 'routing.aggregate',
      difficulty: 3,
      prompt: `Hinter dem Router der Niederlassung liegen die Netze **10.50.8.0/23**, **10.50.10.0/24** und **10.50.11.0/24**. Gib die Sammelroute an, die genau diese Netze abdeckt.`,
      answer: '10.50.8.0/22',
      misconceptions: [
        { answer: '10.50.8.0/21', error: 'supernet-zu-gross', why: 'Ein /21 umfasst 8 /24-Netze (8 bis 15) – doppelt so viele wie vorhanden.' },
        { answer: '10.50.8.0/23', error: 'supernet-zu-klein', why: 'Das ist nur das erste Netz; .10 und .11 fehlen.' },
        { answer: '10.50.10.0/22', error: 'supernet-falsche-basis', why: 'Die Sammelroute beginnt beim kleinsten Netz (10.50.8.0).' },
      ],
      hints: ['Ein /23 sind 512 Adressen, ein /24 sind 256.', 'Zusammen 1024 Adressen = 2¹⁰.'],
      explanation: `**10.50.8.0/22**\n\n1. Größe: 512 + 256 + 256 = **1024** Adressen = 2¹⁰ → /22.\n2. Ausrichtung: Ein /22 umfasst im 3. Oktett 4 Werte; 8 ist durch 4 teilbar ✔.\n3. Probe: 8 = \`000010|00\`, 11 = \`000010|11\` → 16 + 6 = 22 gemeinsame Bits.\n\nNetze unterschiedlicher Größe lassen sich zusammenfassen, solange sie zusammen einen lückenlosen, ausgerichteten Block bilden.`,
    },
    {
      id: 'm09-q044',
      kind: 'free',
      skill: 'routing.select',
      difficulty: 3,
      prompt: `Eine Arztpraxis (6 Arbeitsplätze) hat einen **VDSL-Anschluss** (Supervectoring). Anforderungen: Muss – VDSL-Modem im Router, WLAN für das Praxisteam, **zwei VPN-Zugänge** für Fernwartung und Homeoffice, Telefonie (zwei schnurlose DECT-Telefone). Kann – Gäste-WLAN im Wartezimmer.

| Merkmal | Router X | Router Y | Router Z |
|---|---|---|---|
| WAN | VDSL2 bis 300 Mbit/s (Supervectoring), zusätzlich WAN-Ethernet | nur WAN-Ethernet (externes Modem nötig) | VDSL2 bis 100 Mbit/s (ohne Supervectoring) |
| WLAN | Wi-Fi 6, Gäste-WLAN | Wi-Fi 6, Gäste-WLAN | Wi-Fi 5, kein Gäste-WLAN |
| VPN | WireGuard, max. 8 Tunnel | IPsec, max. 20 Tunnel | WireGuard, max. 2 Tunnel |
| Telefonie | DECT-Basis, 2 analoge Anschlüsse | keine | DECT-Basis |
| Preis | 279 € | 229 € (+ Modem 89 €) | 169 € |

Wählen Sie einen Router aus und begründen Sie Ihre Entscheidung anhand der Anforderungen.`,
      modelAnswer: `Empfehlung: Router X. Begründung: Router Y hat kein eingebautes VDSL-Modem und keine DECT-Basis – zwei Muss-Kriterien fehlen, er scheidet aus (auch mit Zusatzmodem fehlt die Telefonie). Router Z unterstützt kein Supervectoring; der Anschluss könnte nur mit bis zu 100 Mbit/s genutzt werden, und er bietet kein Gäste-WLAN. Seine 2 VPN-Tunnel reichen zwar knapp, lassen aber keine Reserve. Router X erfüllt alle Muss-Kriterien (VDSL2 mit Supervectoring, WLAN, 8 VPN-Tunnel, DECT-Basis) und zusätzlich das Kann-Kriterium Gäste-WLAN. Er ist zwar 110 € teurer als Z, nutzt aber die volle Anschlussleistung und hat Reserve – daher ist er die wirtschaftlich sinnvollste Wahl.`,
      keywords: ['Muss-Kriterien', 'Supervectoring', 'DECT', 'VPN-Tunnel', 'Gäste-WLAN', 'scheidet aus', 'Begründung'],
      hints: ['Prüfe zuerst jedes Gerät gegen die Muss-Kriterien.', 'Kann Router Z den Anschluss voll ausnutzen?'],
      explanation: `Erwartet wird das Vorgehen „Muss-Kriterien prüfen → ausscheiden → Rest vergleichen → begründen“. Router Y scheidet aus (kein Modem, keine DECT-Basis), Z nutzt den Anschluss nicht aus und hat kein Gäste-WLAN, **X** erfüllt alles.`,
    },
    {
      id: 'm09-q045',
      kind: 'match',
      skill: 'routing.select',
      difficulty: 1,
      prompt: `Ordne jedes Merkmal der Router-Klasse zu, für die es **typisch** ist.`,
      left: ['Eingebautes DSL-Modem, WLAN und DECT-Basis', 'Zwei WAN-Ports für Ausfallsicherheit, viele VPN-Tunnel, kein WLAN', 'Dynamisches Routing mit BGP, modulare SFP+-Einschübe, Bedienung per SSH'],
      right: ['Profi-Router (Edge/Core)', 'SoHo-Router', 'Business-/KMU-Router'],
      answer: [1, 2, 0],
      explanation: `SoHo = Alleskönner fürs kleine Büro, Business = Standortvernetzung mit Ausfallsicherheit, Profi = Durchsatz und dynamisches Routing im Rechenzentrum/beim Provider.`,
    },
    {
      id: 'm09-q046',
      kind: 'single',
      skill: 'routing.select',
      difficulty: 2,
      prompt: `Ein Kunde hat einen Glasfaseranschluss. Der Provider liefert ein Glasfasermodem (ONT) mit Ethernet-Buchse. Welche Angabe im Router-Datenblatt ist für den **Anschluss an das ONT** entscheidend?`,
      options: ['Ein WAN-Port mit Ethernet (z. B. 1 oder 2,5 GbE)', 'Ein eingebautes VDSL2-Modem', 'Wi-Fi 6E', 'Ein USB-3.0-Port'],
      answer: 0,
      distractors: {
        '1': { why: 'Ein VDSL2-Modem braucht man nur für DSL über die Telefonleitung.', error: 'wan-typ-verwechselt' },
        '2': { why: 'Wi-Fi 6E betrifft das WLAN im Büro, nicht den Internetanschluss.', error: 'datenblatt-falscher-wert' },
        '3': { why: 'USB dient für Speicher oder einen Mobilfunk-Stick, nicht für das ONT.', error: 'datenblatt-falscher-wert' },
      },
      explanation: `Das ONT wandelt das Lichtsignal in Ethernet um. Der Router braucht deshalb einen **WAN-Ethernet-Port**. Ein eingebautes DSL-Modem nützt an Glasfaser nichts.`,
    },
    {
      id: 'm09-q047',
      kind: 'multi',
      skill: 'routing.select',
      difficulty: 1,
      prompt: `Welche Funktionen bietet ein typischer **SoHo-Router** (Small Office/Home Office) in einem Gerät? (alle zutreffenden wählen)`,
      options: ['DHCP-Server', 'WLAN-Access-Point', 'NAT und einfache Firewall', 'Dynamisches Routing mit BGP zu mehreren Providern', 'Kleiner Switch mit 4 LAN-Ports', 'Redundante, im Betrieb tauschbare Netzteile'],
      answer: [0, 1, 2, 4],
      explanation: `SoHo-Router vereinen Modem/Router, DHCP, NAT/Firewall, WLAN und einen kleinen Switch. BGP mit mehreren Providern und tauschbare redundante Netzteile sind Merkmale von Profi-Routern.`,
    },
    {
      id: 'm09-q048',
      kind: 'table',
      skill: 'routing.select',
      difficulty: 2,
      prompt: `Prüfe die drei Router aus dem Beispiel „Steuerbüro“ gegen die Muss-Kriterien. Trage **ja** oder **nein** ein.

| Merkmal | Router A | Router B | Router C |
|---|---|---|---|
| WAN | VDSL2-Modem, kein Ethernet-WAN | 2,5-GbE-WAN | 2 × 1-GbE-WAN |
| VPN | max. 4 Tunnel | max. 10 Tunnel | max. 50 Tunnel |
| WLAN | Wi-Fi 6, Gäste-WLAN | Wi-Fi 6, Gäste-WLAN | kein WLAN |

Muss-Kriterien: Ethernet-WAN zum ONT, mindestens 5 VPN-Tunnel, Gäste-WLAN **im Gerät**.`,
      columns: [
        { key: 'wan', label: 'Ethernet-WAN', type: 'text' },
        { key: 'vpn', label: '≥ 5 VPN-Tunnel', type: 'text' },
        { key: 'wlan', label: 'Gäste-WLAN im Gerät', type: 'text' },
      ],
      rows: [
        { label: 'Router A', cells: { wan: { answer: 'nein' }, vpn: { answer: 'nein' }, wlan: { answer: 'ja' } } },
        { label: 'Router B', cells: { wan: { answer: 'ja' }, vpn: { answer: 'ja' }, wlan: { answer: 'ja' } } },
        { label: 'Router C', cells: { wan: { answer: 'ja' }, vpn: { answer: 'ja' }, wlan: { answer: 'nein' } } },
      ],
      explanation: `Nur **Router B** erfüllt alle drei Muss-Kriterien im Gerät. A hat kein Ethernet-WAN und zu wenige Tunnel, C hat kein WLAN (dafür wäre ein zusätzlicher Access Point nötig).`,
    },
  ],
};
