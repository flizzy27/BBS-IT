import type { Module } from '../types';

export const m11: Module = {
  id: 'm11',
  nr: 11,
  title: 'Netzwerkdienste',
  short:
    'DHCP, DNS, NAT/PAT, VPN, Proxy und Firewall von Grund auf verstehen, planen und typische Fehlerbilder sicher erkennen.',
  icon: 'Server',
  relevance: 'ap1',
  prerequisites: ['m03', 'm10'],
  skills: [
    { id: 'svc.dhcp.dora', module: 'm11', title: 'DHCP-Ablauf (DORA) erklären' },
    { id: 'svc.dhcp.lease', module: 'm11', title: 'Lease-Dauer, T1 und T2 berechnen', requires: ['svc.dhcp.dora'] },
    {
      id: 'svc.dhcp.config',
      module: 'm11',
      title: 'DHCP-Bereich, Ausschlüsse, Reservierungen und Optionen planen',
      requires: ['svc.dhcp.dora'],
    },
    { id: 'svc.dhcp.relay', module: 'm11', title: 'DHCP-Relay und APIPA einordnen', requires: ['svc.dhcp.dora'] },
    { id: 'svc.dns.resolve', module: 'm11', title: 'DNS-Namensauflösung (rekursiv/iterativ, Cache, TTL) erklären' },
    { id: 'svc.dns.records', module: 'm11', title: 'DNS-Record-Typen, Zonen und hosts-Datei zuordnen', requires: ['svc.dns.resolve'] },
    { id: 'svc.nat', module: 'm11', title: 'NAT, PAT und Portweiterleitung erklären und Tabellen ausfüllen' },
    { id: 'svc.vpn', module: 'm11', title: 'VPN-Arten und -Protokolle unterscheiden' },
    { id: 'svc.proxy', module: 'm11', title: 'Forward- und Reverse-Proxy unterscheiden' },
    { id: 'svc.firewall', module: 'm11', title: 'Firewall-Grundlagen und DMZ einordnen' },
    {
      id: 'svc.troubleshoot',
      module: 'm11',
      title: 'Fehlerbilder bei DHCP, Gateway und DNS diagnostizieren',
      requires: ['svc.dhcp.relay', 'svc.dns.resolve'],
    },
  ],

  /* ================================================================== */
  /* Lektionen                                                           */
  /* ================================================================== */
  lessons: [
    /* ---------------------------------------------------------------- */
    {
      id: 'm11-l01',
      title: 'DHCP: Wie ein PC automatisch zu seiner IP-Adresse kommt',
      minutes: 25,
      relevance: 'ap1',
      skills: ['svc.dhcp.dora', 'svc.dhcp.lease'],
      steps: [
        {
          type: 'explain',
          title: 'Warum es DHCP gibt',
          body: `Stell dir vor, du bist Azubi bei der **Elektro Krämer GmbH** in Hamburg. Im Büro stehen 80 PCs, dazu Laptops, Drucker, Telefone und jeden Tag Besucher im Gäste-WLAN. Jedes dieser Geräte braucht mindestens vier Angaben, um im Netz arbeiten zu können:

| Angabe | Beispiel | Wofür? |
|---|---|---|
| IP-Adresse | \`192.168.10.57\` | eindeutige Adresse des Geräts |
| Subnetzmaske | \`255.255.255.0\` (/24) | Was ist „mein Netz“, was ist fremd? |
| Standardgateway | \`192.168.10.1\` | Router, an den alle Pakete in fremde Netze gehen |
| DNS-Server | \`192.168.10.5\` | übersetzt Namen wie \`www.elektro-kraemer.de\` in IP-Adressen |

Das alles von Hand an 150 Geräten einzutragen, wäre fehleranfällig (Tippfehler, doppelte Adressen) und unflexibel (Laptops wechseln zwischen Büro und Homeoffice). Genau dafür gibt es **DHCP – Dynamic Host Configuration Protocol**. Ein **DHCP-Server** verwaltet einen Vorrat an Adressen und „verleiht“ sie samt allen Zusatzinfos an die Clients.

**Wichtig – das Wort „verleihen“:** Der Client bekommt die Adresse nicht für immer, sondern für eine bestimmte Zeit, die **Lease-Dauer** (engl. *lease* = Miete/Pacht). Danach muss er verlängern oder die Adresse wieder hergeben. So kommen Adressen von Geräten, die nicht mehr da sind (z. B. ein Besucher-Handy), automatisch zurück in den Pool.

**Technische Eckdaten:**
- DHCP arbeitet mit **UDP**. Der **Server lauscht auf Port 67**, der **Client auf Port 68**.
- DHCP ist ein Anwendungsprotokoll (Schicht 7), nutzt aber Broadcasts der Schicht 2/3 – das wird gleich wichtig.`,
        },
        {
          type: 'explain',
          title: 'Der DORA-Ablauf Schritt für Schritt',
          body: `Ein frisch eingeschalteter PC hat ein Problem: Er hat **noch keine IP-Adresse** und kennt den DHCP-Server nicht. Er kann also niemanden gezielt ansprechen. Deshalb **ruft er per Broadcast in den Raum**. Der Ablauf hat vier Nachrichten, deren Anfangsbuchstaben man sich als **DORA** merkt:

| # | Nachricht | Von → An | Was passiert? |
|---|---|---|---|
| 1 | **D**HCPDISCOVER | Client → alle (Broadcast) | „Gibt es hier einen DHCP-Server? Ich brauche eine Adresse.“ Quell-IP \`0.0.0.0\`, Ziel-IP \`255.255.255.255\`, Ziel-MAC \`FF-FF-FF-FF-FF-FF\`. |
| 2 | **O**FFER | Server → Client | „Ich biete dir \`192.168.10.57\` an, Maske /24, Gateway .1, DNS .5, Lease 8 Tage.“ |
| 3 | **R**EQUEST | Client → alle (Broadcast) | „Ich nehme das Angebot von Server 192.168.10.5 an.“ Broadcast, damit **alle** Server erfahren, welches Angebot gewählt wurde – die anderen ziehen ihr Angebot zurück. |
| 4 | **A**CK | Server → Client | „Bestätigt – die Adresse gehört dir für 8 Tage.“ Erst **jetzt** darf der Client die Adresse benutzen. |

Merke dir die Logik statt der Tabelle:
- Der Client **sucht** (Discover), weil er niemanden kennt.
- Der Server **bietet an** (Offer).
- Der Client **fordert an** (Request) – öffentlich, weil es mehrere Server geben könnte.
- Der Server **bestätigt** (Acknowledge).

Lehnt der Server die Anfrage ab (z. B. weil der Client eine Adresse aus einem fremden Netz anfordert), schickt er ein **DHCPNAK** – der Client beginnt dann von vorne mit DISCOVER.

> **Prüfungstipp:** Viele AP1-Aufgaben fragen nach der Reihenfolge oder danach, welche Nachrichten Broadcasts sind. DISCOVER und REQUEST (beim ersten Bezug) sind immer Broadcasts.`,
        },
        {
          type: 'visual',
          title: 'DORA und Verlängerung als Sequenzdiagramm',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['PC (Client)', 'DHCP-Server 192.168.10.5'],
              messages: [
                { from: 0, to: 1, label: 'DHCPDISCOVER', note: 'Broadcast, Quelle 0.0.0.0:68 → 255.255.255.255:67' },
                { from: 1, to: 0, label: 'DHCPOFFER', note: 'Angebot: 192.168.10.57/24, GW .1, DNS .5, Lease 8 Tage' },
                { from: 0, to: 1, label: 'DHCPREQUEST', note: 'Broadcast: „Ich nehme das Angebot von .5“' },
                { from: 1, to: 0, label: 'DHCPACK', note: 'Bestätigung – Adresse ab jetzt nutzbar' },
                { from: 0, to: 1, label: 'DHCPREQUEST (T1 = 50 %)', note: 'Unicast an den eigenen Server: Verlängerung (Renewing)' },
                { from: 1, to: 0, label: 'DHCPACK', note: 'Lease beginnt von vorn' },
              ],
            },
          },
          caption:
            'Die ersten vier Nachrichten sind DORA. Nach der Hälfte der Lease-Dauer (T1) fragt der Client direkt (Unicast) beim bekannten Server nach einer Verlängerung.',
        },
        {
          type: 'explain',
          title: 'Lease, T1 und T2 – wie die Verlängerung funktioniert',
          body: `Der Client wartet nicht bis zur letzten Sekunde. Er hat zwei Zeitpunkte, die sich aus der Lease-Dauer ergeben:

| Zeitpunkt | Anteil der Lease | Phase | Was macht der Client? |
|---|---|---|---|
| **T1** | **50 %** | *Renewing* | Er schickt ein DHCPREQUEST per **Unicast direkt an „seinen“ Server**. Antwortet dieser mit ACK, startet die Lease neu. |
| **T2** | **87,5 %** (= 7/8) | *Rebinding* | Hat „sein“ Server bis jetzt nicht geantwortet (z. B. ausgefallen), fragt der Client per **Broadcast irgendeinen** DHCP-Server. |
| Lease-Ende | 100 % | – | Hat niemand verlängert, **muss der Client die Adresse aufgeben** und beginnt wieder bei DISCOVER. |

**Warum das schlau ist:** Bei T1 ist noch die halbe Zeit übrig – fällt der Server kurz aus, bleibt genug Puffer. Erst bei T2 wird es „ernst“ und der Client akzeptiert auch einen anderen Server (z. B. einen Failover-Server).

**Wie lang sollte eine Lease sein?**
- **Büro-LAN** mit festen PCs: lang, z. B. 8 Tage (Standardwert beim Windows-Server-DHCP).
- **Gäste-WLAN** mit vielen wechselnden Geräten: kurz, z. B. 1–4 Stunden – sonst ist der Pool schnell mit Adressen von Handys belegt, die längst weg sind.

Übrigens: Beim Neustart versucht ein Windows-Client zuerst, seine **bisherige** Adresse wieder anzufordern (REQUEST mit der alten Adresse). Darum hat ein PC oft „immer dieselbe“ Adresse, obwohl er dynamisch konfiguriert ist – garantiert ist das aber nur mit einer **Reservierung** (nächste Lektion).`,
        },
        {
          type: 'example',
          title: 'T1 und T2 für das Büro-LAN berechnen',
          problem: `Der DHCP-Server der Elektro Krämer GmbH vergibt Adressen mit einer Lease-Dauer von **8 Tagen**. Ein PC erhält seine Adresse am **Montag, 08:00 Uhr**.

Wann versucht der PC zum ersten Mal zu verlängern (T1), wann beginnt das Rebinding (T2), und wann läuft die Lease ab, wenn niemand antwortet?`,
          steps: [
            { label: 'Lease in Stunden umrechnen', body: '8 Tage × 24 h = **192 h**. In Stunden rechnet es sich bei krummen Werten leichter.' },
            { label: 'T1 = 50 %', body: '192 h × 0,5 = **96 h = 4 Tage** → Montag 08:00 + 4 Tage = **Freitag, 08:00 Uhr**. Der PC sendet ein DHCPREQUEST per Unicast an den Server, der ihm die Adresse gegeben hat.' },
            { label: 'T2 = 87,5 %', body: '192 h × 0,875 = **168 h = 7 Tage** → **nächster Montag, 08:00 Uhr**. Hat der eigene Server bis dahin nicht geantwortet, fragt der PC per Broadcast jeden erreichbaren DHCP-Server.' },
            { label: 'Lease-Ende', body: '192 h = 8 Tage → **nächster Dienstag, 08:00 Uhr**. Ohne Verlängerung muss der PC die Adresse aufgeben und mit DHCPDISCOVER neu beginnen.' },
          ],
          result: 'T1: Freitag 08:00 (nach 4 Tagen) · T2: nächster Montag 08:00 (nach 7 Tagen) · Ablauf: nächster Dienstag 08:00 (nach 8 Tagen).',
        },
        {
          type: 'check',
          question: {
            id: 'm11-l01-c1',
            kind: 'single',
            skill: 'svc.dhcp.dora',
            difficulty: 1,
            prompt: 'Warum sendet ein Client das **DHCPREQUEST** beim ersten Adressbezug als **Broadcast**, obwohl er den Server aus dem OFFER schon kennt?',
            options: [
              'Damit alle DHCP-Server erfahren, welches Angebot angenommen wurde',
              'Weil der Client noch keine MAC-Adresse hat',
              'Weil Router Broadcasts bevorzugt weiterleiten',
              'Weil DHCP nur über TCP funktioniert',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'Die MAC-Adresse ist fest in der Netzwerkkarte hinterlegt – die hat der Client immer.', error: 'mac-ip-verwechselt' },
              '2': { why: 'Router leiten Broadcasts gerade **nicht** weiter – deshalb braucht man später DHCP-Relay.', error: 'broadcast-routing' },
              '3': { why: 'DHCP nutzt UDP (Ports 67/68), nicht TCP.', error: 'protokoll-verwechselt' },
            },
            explanation:
              'Im Netz können mehrere DHCP-Server Angebote gemacht haben. Durch den Broadcast erfahren alle, welches Angebot der Client angenommen hat. Die übrigen Server geben ihre angebotenen Adressen wieder frei. Außerdem hat der Client zu diesem Zeitpunkt noch keine gültige eigene IP-Adresse.',
            hints: ['Denk daran: Es kann mehr als einen DHCP-Server geben.'],
          },
        },
        {
          type: 'check',
          question: {
            id: 'm11-l01-c2',
            kind: 'number',
            skill: 'svc.dhcp.lease',
            difficulty: 2,
            prompt: 'Im Gäste-WLAN beträgt die Lease-Dauer **4 Stunden**. Nach wie vielen **Minuten** beginnt die Rebinding-Phase (T2)?',
            answer: 210,
            unit: 'min',
            explanation: '4 h = 240 min. T2 liegt bei 87,5 % → 240 × 0,875 = **210 min** (3 h 30 min). T1 läge bei 120 min.',
            hints: ['T2 = 87,5 % der Lease-Dauer.', 'Rechne zuerst 4 h in Minuten um.'],
          },
        },
        {
          type: 'practice',
          title: 'Übung: DHCP-Ablauf und Lease',
          questionIds: ['m11-q001', 'm11-q002', 'm11-q003', 'm11-q004', 'm11-q005', 'm11-q006', 'm11-q007', 'm11-q008'],
          count: 5,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'DHCP verteilt IP-Adresse, Subnetzmaske, Gateway, DNS-Server u. v. m. automatisch – per UDP, Server-Port 67, Client-Port 68.',
            'DORA: DISCOVER (Broadcast) → OFFER → REQUEST (Broadcast) → ACK. Erst nach dem ACK nutzt der Client die Adresse.',
            'T1 = 50 % der Lease: Verlängerung per Unicast beim eigenen Server (Renewing).',
            'T2 = 87,5 % der Lease: Verlängerung per Broadcast bei irgendeinem Server (Rebinding).',
            'Läuft die Lease ab, muss der Client die Adresse aufgeben und neu mit DISCOVER beginnen.',
            'Lange Leases für feste Arbeitsplätze, kurze Leases für Gäste-WLANs.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'm11-l02',
      title: 'DHCP planen: Bereich, Ausschlüsse, Reservierungen, Optionen, Relay und APIPA',
      minutes: 30,
      relevance: 'ap1',
      skills: ['svc.dhcp.config', 'svc.dhcp.relay'],
      steps: [
        {
          type: 'explain',
          title: 'Bereich (Scope), Ausschlüsse und Reservierungen',
          body: `Auf einem DHCP-Server legst du für jedes Subnetz einen **Bereich** (engl. *Scope*) an. Ein Bereich enthält:

1. **Adressbereich** – von welcher bis zu welcher Adresse verteilt werden darf, z. B. \`192.168.10.1\` bis \`192.168.10.254\`, plus die Subnetzmaske.
2. **Ausschlüsse** (*Exclusions*) – Adressen **innerhalb** des Bereichs, die der Server **nie** verteilt. Dort liegen Geräte mit **statisch eingetragener** IP: Router, Server, Switches, Access Points. Sonst könnte DHCP eine Adresse doppelt vergeben → **IP-Adresskonflikt**.
3. **Reservierungen** (*Reservations*) – eine bestimmte IP wird fest an eine bestimmte **MAC-Adresse** (genauer: Client-ID) gebunden. Das Gerät bekommt seine Adresse weiterhin **per DHCP**, aber immer dieselbe. Typisch für Netzwerkdrucker, IP-Kameras oder Zeiterfassungsterminals.
4. **Optionen** – Zusatzinfos wie Gateway und DNS-Server (siehe unten).
5. **Lease-Dauer**.

**Ausschluss oder Reservierung – der entscheidende Unterschied:**

| | Ausschluss | Reservierung |
|---|---|---|
| Wer konfiguriert die IP am Gerät? | Admin **statisch** am Gerät | **DHCP-Server** |
| Bekommt das Gerät DHCP-Optionen (Gateway, DNS)? | Nein, alles von Hand | **Ja**, automatisch |
| Typische Geräte | Router, DHCP-/DNS-Server selbst, Switches | Drucker, Kameras, Spezialgeräte |
| Was braucht der Server? | nur den Adressbereich | **MAC-Adresse** des Geräts + gewünschte IP |

> **Merksatz:** Ausschluss = „Finger weg, die vergebe ich nicht.“ Reservierung = „Die vergebe ich – aber nur an genau dieses Gerät.“

Der DHCP-Server selbst hat übrigens **immer eine statische IP** – sonst könnte er sich ja nicht selbst eine Adresse geben.`,
        },
        {
          type: 'explain',
          title: 'Wichtige DHCP-Optionen',
          body: `Neben der IP-Adresse überträgt der Server **Optionen**. Jede hat eine Nummer. Für die Prüfung und die Praxis sind diese wichtig:

| Option | Name | Inhalt / Beispiel |
|---|---|---|
| 1 | Subnet Mask | \`255.255.255.0\` |
| **3** | **Router** | **Standardgateway**, z. B. \`192.168.10.1\` |
| **6** | **DNS Server** | z. B. \`192.168.10.5\` (auch mehrere) |
| **15** | **Domain Name** | DNS-Suffix, z. B. \`elektro-kraemer.local\` |
| **51** | **IP Address Lease Time** | Lease-Dauer in Sekunden, z. B. 691200 (= 8 Tage) |
| 53 | DHCP Message Type | kennzeichnet DISCOVER, OFFER, REQUEST, ACK … |
| 54 | Server Identifier | IP des DHCP-Servers |

Optionen kann man auf verschiedenen Ebenen setzen (beim Windows-Server: **Server-, Bereichs- und Reservierungsoptionen**). Die spezifischere Ebene gewinnt: Eine Reservierungsoption überschreibt die Bereichsoption, diese die Serveroption. So kann z. B. der DNS-Server für alle Bereiche gleich (Serveroption) sein, das Gateway aber je Bereich unterschiedlich (Bereichsoption).

> **Eselsbrücke:** „**3** Router, **6** DNS“ – Gateway kommt vor DNS, und 6 ist das Doppelte von 3.`,
        },
        {
          type: 'explain',
          title: 'DHCP-Relay: Wenn der Server in einem anderen Netz steht',
          body: `Die Elektro Krämer GmbH hat einen zweiten Standort in **Berlin** (Netz \`192.168.20.0/24\`). Der DHCP-Server steht aber nur in **Hamburg** (\`192.168.10.5\`). Problem: DISCOVER ist ein **Broadcast** – und **Router leiten Broadcasts nicht weiter**. Der Hilferuf des Berliner PCs endet am Berliner Router.

Die Lösung ist ein **DHCP-Relay-Agent** (bei Cisco-Routern per \`ip helper-address\` konfiguriert):

1. Der Berliner PC sendet DHCPDISCOVER als Broadcast.
2. Der Router in Berlin (Relay-Agent) nimmt den Broadcast an und schickt ihn als **Unicast** an die eingetragene Server-Adresse \`192.168.10.5\`.
3. Dabei trägt er seine **eigene Schnittstellenadresse im Berliner Netz** (\`192.168.20.1\`) in das Feld **giaddr** (*Gateway IP Address*) ein.
4. Der DHCP-Server sieht am giaddr, aus welchem Netz die Anfrage kommt, und wählt den **passenden Bereich** \`192.168.20.0/24\`.
5. Die Antworten gehen an den Relay-Agent zurück, der sie an den Client weiterreicht.

Ohne Relay bräuchte jeder Standort und jedes VLAN einen eigenen DHCP-Server. Mit Relay reicht ein zentraler Server (meist plus ein Failover-Partner).`,
        },
        {
          type: 'visual',
          title: 'Zentraler DHCP-Server mit Relay am Standort Berlin',
          widget: {
            kind: 'topology',
            data: {
              nodes: [
                { id: 'dhcp', type: 'server', label: 'DHCP/DNS', sub: '192.168.10.5', x: 90, y: 110 },
                { id: 'swh', type: 'switch', label: 'Switch HH', x: 220, y: 210 },
                { id: 'pch', type: 'pc', label: 'PC HH', sub: '192.168.10.x', x: 90, y: 320 },
                { id: 'rh', type: 'router', label: 'Router HH', sub: '.10.1', x: 350, y: 210 },
                { id: 'rb', type: 'router', label: 'Router BER', sub: 'Relay .20.1', x: 520, y: 210 },
                { id: 'swb', type: 'switch', label: 'Switch BER', x: 650, y: 210 },
                { id: 'pcb', type: 'pc', label: 'PC BER', sub: '192.168.20.x', x: 720, y: 330 },
              ],
              links: [
                { from: 'dhcp', to: 'swh' },
                { from: 'pch', to: 'swh' },
                { from: 'swh', to: 'rh' },
                { from: 'rh', to: 'rb', label: 'VPN', style: 'vpn' },
                { from: 'rb', to: 'swb' },
                { from: 'swb', to: 'pcb' },
              ],
              zones: [
                { label: 'Hamburg 192.168.10.0/24', x: 30, y: 40, w: 370, h: 350, color: 'blue' },
                { label: 'Berlin 192.168.20.0/24', x: 470, y: 40, w: 310, h: 350, color: 'green' },
              ],
            },
          },
          caption:
            'Der Berliner Router wandelt den DHCP-Broadcast in einen Unicast an 192.168.10.5 um und setzt giaddr = 192.168.20.1. So weiß der Server, dass er aus dem Bereich 192.168.20.0/24 vergeben muss.',
        },
        {
          type: 'explain',
          title: 'APIPA: Was passiert, wenn kein DHCP-Server antwortet?',
          body: `Bekommt ein Windows-Client auf sein DISCOVER **keine Antwort**, gibt er sich selbst eine Adresse aus dem Bereich **169.254.0.0/16**. Das nennt Microsoft **APIPA** (*Automatic Private IP Addressing*), allgemein heißt es **IPv4-Link-Local-Adresse** (RFC 3927).

- Genutzt werden \`169.254.1.0\` bis \`169.254.254.255\`, Maske \`255.255.0.0\`.
- Der Client prüft per ARP, ob die zufällig gewählte Adresse frei ist.
- Es gibt **kein Gateway und keinen DNS-Server**. Kommunikation ist nur mit anderen APIPA-Geräten im selben Segment möglich.
- Im Hintergrund versucht Windows weiter, einen DHCP-Server zu finden (etwa alle 5 Minuten).

**Für dich als Admin ist 169.254.x.x ein Warnsignal:** „Dieser Client hat keinen DHCP-Server erreicht.“ Mögliche Ursachen:

| Ursache | Typisches Indiz |
|---|---|
| Kabel defekt / Port deaktiviert | oft auch „Medium getrennt“ – dann gibt es aber gar keine Adresse |
| Falsches VLAN am Switchport | andere Geräte am selben Switch funktionieren |
| DHCP-Server bzw. Dienst ausgefallen | **alle** Clients betroffen, die neu eine Adresse brauchen |
| Bereich erschöpft (keine freien Adressen) | betrifft nur neue Geräte, z. B. morgens im Gäste-WLAN |
| Relay-Agent fehlt / falsch konfiguriert | nur ein bestimmtes Subnetz/VLAN betroffen |
| Firewall blockiert UDP 67/68 | selten, aber möglich zwischen Netzsegmenten |`,
        },
        {
          type: 'example',
          title: 'Bereich für den Standort Hamburg planen',
          problem: `Netz Hamburg: \`192.168.10.0/24\`. Vorgaben der IT-Leitung:
- Router (Gateway): \`192.168.10.1\`
- Server und Netzwerkgeräte mit statischer IP: \`192.168.10.2\` bis \`192.168.10.49\`
- Der Etagendrucker (MAC \`00-1B-A9-4C-22-10\`) soll immer \`192.168.10.60\` bekommen.
- DNS-Server: \`192.168.10.5\`, Domäne: \`elektro-kraemer.local\`, Lease: 8 Tage.

Plane den Bereich und berechne, wie viele Adressen für die dynamische Vergabe übrig bleiben (Drucker-Reservierung zählt als vergeben).`,
          steps: [
            { label: 'Adressbereich', body: 'Nutzbare Hosts in /24: `192.168.10.1` bis `192.168.10.254` = **254 Adressen**. Der Bereich wird über diesen ganzen Raum angelegt, Maske `255.255.255.0`.' },
            { label: 'Ausschluss', body: 'Ausschluss `192.168.10.1` – `192.168.10.49` (Router + statische Geräte) = **49 Adressen**. So vergibt DHCP diese nie.' },
            { label: 'Reservierung', body: 'Reservierung: `192.168.10.60` ↔ MAC `00-1B-A9-4C-22-10`. Die Adresse liegt im Bereich, wird aber nur dem Drucker gegeben – er erhält trotzdem Gateway und DNS per DHCP.' },
            { label: 'Optionen', body: 'Option 3 (Router) = `192.168.10.1`, Option 6 (DNS) = `192.168.10.5`, Option 15 (Domänenname) = `elektro-kraemer.local`, Lease (Option 51) = 8 Tage = 691200 s.' },
            { label: 'Freie Adressen zählen', body: '254 − 49 (Ausschluss) − 1 (Reservierung) = **204** Adressen für die dynamische Vergabe.' },
          ],
          result: 'Bereich 192.168.10.1–254 /24, Ausschluss .1–.49, Reservierung .60 für den Drucker, Optionen 3/6/15/51 gesetzt – 204 Adressen bleiben dynamisch verfügbar.',
        },
        {
          type: 'check',
          question: {
            id: 'm11-l02-c1',
            kind: 'single',
            skill: 'svc.dhcp.config',
            difficulty: 1,
            prompt: 'Welche DHCP-Option überträgt das **Standardgateway** an den Client?',
            options: ['Option 3', 'Option 6', 'Option 15', 'Option 51'],
            answer: 0,
            distractors: {
              '1': { why: 'Option 6 enthält die DNS-Server.', error: 'dhcp-option-verwechselt' },
              '2': { why: 'Option 15 enthält den Domänennamen (DNS-Suffix).', error: 'dhcp-option-verwechselt' },
              '3': { why: 'Option 51 enthält die Lease-Dauer.', error: 'dhcp-option-verwechselt' },
            },
            explanation: 'Option 3 heißt „Router“ und enthält das Standardgateway. Merke: 3 Router, 6 DNS, 15 Domänenname, 51 Lease-Dauer.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'm11-l02-c2',
            kind: 'single',
            skill: 'svc.dhcp.relay',
            difficulty: 2,
            prompt: 'Neue PCs im VLAN 30 (Lager) erhalten alle eine Adresse **169.254.x.x**, PCs in den anderen VLANs funktionieren. Der DHCP-Server steht im VLAN 10. Was ist die **wahrscheinlichste** Ursache?',
            options: [
              'Für VLAN 30 ist auf dem Router/Layer-3-Switch kein DHCP-Relay (IP-Helper) eingerichtet',
              'Der DHCP-Server ist ausgefallen',
              'Der DNS-Server ist falsch eingetragen',
              'Die PCs im Lager haben eine falsche MAC-Adresse',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'Dann wären auch die anderen VLANs betroffen.', error: 'eingrenzung-fehlt' },
              '2': { why: 'Ein falscher DNS-Server führt nicht zu 169.254-Adressen; die Adressvergabe ist unabhängig von DNS.', error: 'dns-dhcp-verwechselt' },
              '3': { why: 'MAC-Adressen sind ab Werk eindeutig und spielen hier keine Rolle.', error: 'mac-ip-verwechselt' },
            },
            explanation:
              'Nur ein einziges VLAN ist betroffen, und der Server steht in einem anderen VLAN. Der DISCOVER-Broadcast aus VLAN 30 erreicht den Server nur, wenn der Router dort als Relay-Agent arbeitet. Fehlt der Relay, bekommt der Client keine Antwort und vergibt sich eine APIPA-Adresse.',
            hints: ['Welche VLANs sind betroffen, welche nicht?', 'Wie gelangt ein Broadcast über einen Router?'],
          },
        },
        {
          type: 'practice',
          title: 'Übung: DHCP-Bereich, Optionen, Relay',
          questionIds: ['m11-q009', 'm11-q010', 'm11-q011', 'm11-q012', 'm11-q013', 'm11-q014', 'm11-q015', 'm11-q016'],
          count: 6,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Ein Bereich (Scope) umfasst Adressbereich, Maske, Ausschlüsse, Reservierungen, Optionen und Lease-Dauer.',
            'Ausschluss: Adresse wird nie vergeben (für statisch konfigurierte Geräte). Reservierung: feste IP per DHCP an eine bestimmte MAC.',
            'Wichtige Optionen: 3 = Router/Gateway, 6 = DNS-Server, 15 = Domänenname, 51 = Lease-Dauer.',
            'Router leiten keine Broadcasts weiter → DHCP-Relay (IP-Helper) wandelt sie in Unicast um und setzt giaddr.',
            'APIPA 169.254.0.0/16 = Client hat keinen DHCP-Server erreicht: kein Gateway, kein DNS, nur lokale Kommunikation.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'm11-l03',
      title: 'DNS: Wie aus einem Namen eine IP-Adresse wird',
      minutes: 30,
      relevance: 'ap1',
      skills: ['svc.dns.resolve'],
      steps: [
        {
          type: 'explain',
          title: 'Das Telefonbuch des Internets – hierarchisch organisiert',
          body: `Computer kommunizieren mit IP-Adressen, Menschen merken sich Namen. Das **Domain Name System (DNS)** übersetzt zwischen beiden. Statt eines riesigen zentralen Telefonbuchs ist DNS ein **verteiltes, hierarchisches** System – wie ein umgedrehter Baum:

\`\`\`
                    . (Root)
          ┌─────────┼──────────┐
         de        com        org          ← Top-Level-Domains (TLD)
          │
   elektro-kraemer                         ← Second-Level-Domain
     ┌────┴─────┐
    www        mail                        ← Hostnamen / Subdomains
\`\`\`

Der vollständige Name \`www.elektro-kraemer.de.\` heißt **FQDN** (*Fully Qualified Domain Name*). Gelesen wird von rechts nach links: Der unsichtbare Punkt am Ende ist die **Root**, dann \`de\`, dann \`elektro-kraemer\`, dann \`www\`.

**Wer weiß was?**
- **Root-Server** kennen nur die Server der TLDs (\`.de\`, \`.com\` …). Es gibt 13 Root-Server-Namen (a bis m.root-servers.net), dahinter stehen weltweit hunderte Instanzen (Anycast).
- **TLD-Server** (für \`.de\` betrieben von der DENIC) kennen die zuständigen Server jeder \`.de\`-Domain.
- **Autoritative Server** einer Domain kennen die tatsächlichen Einträge, z. B. die IP von \`www.elektro-kraemer.de\`. Nur ihre Antwort ist „amtlich“ (*autoritativ*).

**Technik:** DNS nutzt **Port 53**, für normale Anfragen **UDP**; **TCP** wird für Zonentransfers zwischen DNS-Servern und für große Antworten genutzt.`,
        },
        {
          type: 'explain',
          title: 'Rekursiv und iterativ – zwei Arten zu fragen',
          body: `Der PC (genauer: der eingebaute **Stub-Resolver** im Betriebssystem) fragt nicht selbst die Root-Server. Er fragt **einen** DNS-Server – den, der per DHCP-Option 6 eingetragen ist. Diesen nennt man **rekursiven Resolver** (in Firmen oft der Domain Controller, zu Hause der Router oder der Provider).

| | **Rekursive Anfrage** | **Iterative Anfrage** |
|---|---|---|
| Wer stellt sie? | Client → sein DNS-Resolver | Resolver → Root, TLD, autoritative Server |
| Bedeutung | „Besorg mir **die endgültige Antwort**, egal wie.“ | „Sag mir, was **du** weißt – oder wen ich als Nächstes fragen soll.“ |
| Antwort | die IP-Adresse (oder „gibt es nicht“) | entweder die Antwort oder ein **Verweis** (*Referral*) auf den nächsten Server |

**Analogie:** Du (Client) bittest die Auskunft (Resolver): „Finde die Nummer von Elektro Krämer in Hamburg.“ Das ist rekursiv – du willst nur das Ergebnis. Die Auskunft telefoniert sich dann iterativ durch: Zentrale → „frag die Vermittlung Hamburg“ → „frag die Firma direkt“ → Nummer.

**Der Cache und die TTL:** Jede Antwort enthält eine **TTL** (*Time to Live*) in Sekunden. So lange darf der Resolver (und auch der Client) die Antwort **zwischenspeichern**. Fragt ein zweiter Kollege fünf Minuten später nach derselben Adresse, antwortet der Resolver sofort aus dem Cache – ohne Root, TLD & Co. Das macht DNS schnell und entlastet die Server.

Kehrseite: Ändert der Admin einen Eintrag, sehen manche Clients **bis zum Ablauf der TTL noch die alte IP**. Vor einem geplanten Serverumzug senkt man die TTL deshalb vorher (z. B. von 86400 s auf 300 s).

Unter Windows kannst du den lokalen Cache mit \`ipconfig /displaydns\` ansehen und mit \`ipconfig /flushdns\` leeren (mehr in Modul 13).`,
        },
        {
          type: 'visual',
          title: 'Auflösung von www.elektro-kraemer.de (leerer Cache)',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['PC', 'DNS-Resolver (Firma)', 'Root-Server', 'TLD-Server .de', 'Autoritativer DNS'],
              messages: [
                { from: 0, to: 1, label: 'www.elektro-kraemer.de?', note: 'rekursive Anfrage' },
                { from: 1, to: 2, label: 'www.elektro-kraemer.de?', note: 'iterativ' },
                { from: 2, to: 1, label: 'Verweis: frag die .de-Server', note: 'Referral' },
                { from: 1, to: 3, label: 'www.elektro-kraemer.de?', note: 'iterativ' },
                { from: 3, to: 1, label: 'Verweis: ns1.elektro-kraemer.de', note: 'NS-Einträge der Domain' },
                { from: 1, to: 4, label: 'www.elektro-kraemer.de?', note: 'iterativ' },
                { from: 4, to: 1, label: 'A 203.0.113.10, TTL 3600', note: 'autoritative Antwort' },
                { from: 1, to: 0, label: 'A 203.0.113.10', note: 'Resolver speichert 3600 s im Cache' },
              ],
            },
          },
          caption:
            'Der PC stellt genau eine rekursive Anfrage. Der Resolver arbeitet sich iterativ von der Root über die TLD bis zum autoritativen Server durch und cacht das Ergebnis für die Dauer der TTL.',
        },
        {
          type: 'example',
          title: 'Zwei Kollegen rufen nacheinander die Firmenwebsite auf',
          problem: `Um 09:00 Uhr ruft Frau Yilmaz im Hamburger Büro \`www.elektro-kraemer.de\` auf. Der Firmen-DNS-Server (\`192.168.10.5\`) hat den Namen noch nicht im Cache. Der autoritative Server liefert den A-Record mit **TTL 3600**. Um 09:20 Uhr ruft Herr Becker dieselbe Seite auf, um 10:05 Uhr Frau Koch.

Beschreibe für jeden Aufruf, welche Server gefragt werden.`,
          steps: [
            { label: '09:00 – Frau Yilmaz', body: 'Ihr PC prüft zuerst seinen eigenen Cache und die hosts-Datei – nichts. Dann rekursive Anfrage an `192.168.10.5`. Der Resolver fragt iterativ Root → `.de`-TLD-Server → autoritativen Server von elektro-kraemer.de und erhält `203.0.113.10`, TTL 3600 s. Er speichert die Antwort bis **10:00 Uhr**.' },
            { label: '09:20 – Herr Becker', body: 'Rekursive Anfrage an `192.168.10.5`. Der Eintrag ist noch 40 Minuten gültig → **Antwort sofort aus dem Cache**, keine Anfrage ins Internet. Die Antwort gilt als „nicht autoritativ“, weil sie aus dem Cache und nicht vom zuständigen Server stammt.' },
            { label: '10:05 – Frau Koch', body: 'Die TTL ist um 10:00 Uhr abgelaufen, der Eintrag wurde verworfen. Der Resolver muss wieder iterativ fragen. Root- und TLD-Verweise hat er aber meist noch im Cache (deren TTL ist sehr lang), also fragt er oft direkt den autoritativen Server.' },
          ],
          result: 'Nur die erste Anfrage nach Ablauf der TTL verursacht die iterative Kette. Alle anderen werden innerhalb der TTL aus dem Cache des Resolvers beantwortet.',
        },
        {
          type: 'check',
          question: {
            id: 'm11-l03-c1',
            kind: 'single',
            skill: 'svc.dns.resolve',
            difficulty: 1,
            prompt: 'Welche Art von Anfrage stellt ein Windows-PC normalerweise an den in seiner IP-Konfiguration eingetragenen DNS-Server?',
            options: ['Eine rekursive Anfrage', 'Eine iterative Anfrage', 'Einen Zonentransfer', 'Eine Reverse-Anfrage an den Root-Server'],
            answer: 0,
            distractors: {
              '1': { why: 'Iterativ fragt der Resolver bei Root, TLD und autoritativen Servern – nicht der Client.', error: 'rekursiv-iterativ-verwechselt' },
              '2': { why: 'Zonentransfers finden nur zwischen DNS-Servern statt (Primär → Sekundär).', error: 'begriff-verwechselt' },
              '3': { why: 'Clients fragen nie direkt die Root-Server. Reverse-Anfragen (PTR) sind eine andere Sache.', error: 'begriff-verwechselt' },
            },
            explanation: 'Der Client will die endgültige Antwort und überlässt die ganze Arbeit seinem Resolver – das ist eine rekursive Anfrage. Der Resolver arbeitet dann iterativ.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'm11-l03-c2',
            kind: 'single',
            skill: 'svc.dns.resolve',
            difficulty: 2,
            prompt: 'Der Webserver wurde auf eine neue IP umgezogen und der A-Record geändert. Einige Mitarbeiter landen noch eine Stunde lang auf dem alten Server. Was ist die Ursache?',
            options: [
              'Die alte Antwort liegt noch bis zum Ablauf der TTL in DNS-Caches',
              'Der Root-Server muss den neuen Eintrag erst freigeben',
              'DHCP hat den Clients die alte IP des Webservers zugewiesen',
              'Der Browser verwendet grundsätzlich keine DNS-Abfragen',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'Root-Server kennen nur die TLD-Server, keine einzelnen Hosts.', error: 'dns-hierarchie' },
              '2': { why: 'DHCP verteilt Client-Konfigurationen, keine Webserver-Adressen.', error: 'dns-dhcp-verwechselt' },
              '3': { why: 'Browser nutzen DNS (und haben zusätzlich einen eigenen kurzen Cache).', error: 'fakt-falsch' },
            },
            explanation: 'Resolver und Clients dürfen eine Antwort so lange zwischenspeichern, wie die TTL angibt. Vor einem Umzug senkt man die TTL deshalb rechtzeitig.',
            hints: ['Wie lange darf eine DNS-Antwort zwischengespeichert werden?'],
          },
        },
        {
          type: 'practice',
          title: 'Übung: DNS-Auflösung',
          questionIds: ['m11-q017', 'm11-q018', 'm11-q019', 'm11-q020', 'm11-q026'],
          count: 4,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'DNS ist hierarchisch: Root → TLD (.de) → autoritative Server der Domain. FQDN wird von rechts nach links gelesen.',
            'Client → Resolver: rekursiv („gib mir das Endergebnis“). Resolver → Root/TLD/autoritativ: iterativ (Antwort oder Verweis).',
            'Nur der zuständige (autoritative) Server liefert „amtliche“ Antworten; Cache-Antworten sind nicht autoritativ.',
            'Die TTL bestimmt, wie lange eine Antwort gecacht wird – Änderungen werden erst nach Ablauf überall sichtbar.',
            'DNS nutzt Port 53, normalerweise UDP; TCP für Zonentransfers und große Antworten.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'm11-l04',
      title: 'DNS-Einträge, Zonen und die hosts-Datei',
      minutes: 25,
      relevance: 'ap1',
      skills: ['svc.dns.records'],
      steps: [
        {
          type: 'explain',
          title: 'Resource Records – die Zeilen im Telefonbuch',
          body: `Ein DNS-Server speichert seine Informationen in **Zonen** (z. B. die Zone \`elektro-kraemer.de\`). Eine Zone besteht aus **Resource Records (RR)** – jeder Eintrag hat einen Typ:

| Typ | Bedeutung | Beispiel |
|---|---|---|
| **A** | Name → **IPv4**-Adresse | \`www → 203.0.113.10\` |
| **AAAA** | Name → **IPv6**-Adresse („Quad-A“, weil IPv6 viermal so lang ist) | \`www → 2001:db8::10\` |
| **CNAME** | **Alias**: Name verweist auf einen anderen Namen | \`shop → www.elektro-kraemer.de.\` |
| **MX** | **Mailserver** der Domain, mit **Priorität** (kleinere Zahl = bevorzugt) | \`10 mail.elektro-kraemer.de.\` |
| **NS** | **Nameserver**, die für die Zone autoritativ sind | \`ns1.elektro-kraemer.de.\` |
| **PTR** | **Reverse**: IP-Adresse → Name | \`10.113.0.203.in-addr.arpa → www…\` |
| **TXT** | beliebiger **Text**, z. B. SPF (welche Server dürfen Mails der Domain senden) oder Domain-Verifizierung | \`"v=spf1 mx -all"\` |
| **SOA** | **Start of Authority**: Verwaltungsdaten der Zone – primärer Nameserver, Admin-Mailadresse, **Seriennummer**, Refresh-, Retry-, Expire-Zeiten und die TTL für negative Antworten | genau **einer** pro Zone |

**Typische Stolperfallen:**
- Ein **MX** zeigt auf einen **Hostnamen**, nicht direkt auf eine IP. Zu diesem Namen braucht es dann einen A/AAAA-Record.
- Ein **CNAME** darf nicht neben anderen Einträgen mit demselben Namen stehen. Deshalb kann die nackte Domain \`elektro-kraemer.de\` (dort liegen SOA und NS) kein CNAME sein.
- Die **Seriennummer im SOA** muss bei jeder Änderung erhöht werden, sonst übernehmen sekundäre Server die Änderung nicht.`,
        },
        {
          type: 'visual',
          title: 'Die wichtigsten Record-Typen auf einen Blick',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'A / AAAA', text: 'Name → IPv4 (A) bzw. IPv6 (AAAA). Der häufigste Eintrag überhaupt.', icon: 'Globe' },
                { title: 'CNAME', text: 'Alias auf einen anderen Namen. Ziel wird anschließend weiter aufgelöst.', icon: 'Link' },
                { title: 'MX', text: 'Wer nimmt E-Mails für die Domain an? Kleinste Priorität zuerst.', icon: 'Mail' },
                { title: 'NS', text: 'Welche Nameserver sind für die Zone zuständig (autoritativ)?', icon: 'Server' },
                { title: 'PTR', text: 'Rückwärtsauflösung: IP → Name, in der Reverse-Zone (in-addr.arpa).', icon: 'Undo2' },
                { title: 'TXT', text: 'Freitext, z. B. SPF-Regeln oder Domain-Bestätigungen.', icon: 'FileText' },
                { title: 'SOA', text: 'Kopf der Zone: Primärserver, Seriennummer, Timer. Genau einer pro Zone.', icon: 'Crown' },
                { title: 'hosts-Datei', text: 'Lokale Liste Name → IP auf dem PC selbst – wird vor dem DNS-Server berücksichtigt.', icon: 'FileCode' },
              ],
            },
          },
        },
        {
          type: 'explain',
          title: 'Forward- und Reverse-Zonen, hosts-Datei',
          body: `**Forward-Lookup-Zone:** Name → IP. Das ist der Normalfall (A, AAAA, CNAME, MX …).

**Reverse-Lookup-Zone:** IP → Name, mit **PTR**-Records. Gebraucht wird das z. B. von Mailservern (Spam-Prüfung), in Logdateien oder von \`tracert\`, um Router-Namen anzuzeigen.

Der Trick bei Reverse-Zonen: DNS liest Namen von **rechts nach links** (allgemein → speziell), IP-Adressen werden aber von **links nach rechts** genauer. Deshalb werden die Oktette **umgedreht** und die Spezialdomain \`in-addr.arpa\` angehängt:

| Netz | Name der Reverse-Zone |
|---|---|
| \`192.168.10.0/24\` | \`10.168.192.in-addr.arpa\` |
| \`10.0.0.0/8\` | \`10.in-addr.arpa\` |
| Host \`192.168.10.25\` | PTR-Name \`25.10.168.192.in-addr.arpa\` |

Für IPv6 heißt die Spezialdomain \`ip6.arpa\` (dort wird Nibble für Nibble umgedreht).

**Die hosts-Datei:** Jedes Betriebssystem hat eine kleine lokale Namensliste. Unter Windows liegt sie unter \`C:\\Windows\\System32\\drivers\\etc\\hosts\`, unter Linux unter \`/etc/hosts\`. Ein Eintrag sieht so aus:

\`\`\`
192.168.10.80    testshop.elektro-kraemer.local
\`\`\`

Die Einträge werden **vor** der Anfrage an den DNS-Server berücksichtigt (Windows lädt sie in seinen DNS-Cache). Das ist praktisch zum Testen – aber auch ein Angriffsziel: Schadsoftware kann z. B. \`www.meine-bank.de\` auf eine falsche IP umbiegen. Wenn „nur ein PC“ einen Namen falsch auflöst, lohnt immer ein Blick in die hosts-Datei.`,
        },
        {
          type: 'example',
          title: 'Zone elektro-kraemer.de lesen und verstehen',
          problem: `Ein Auszug aus der Zonendatei der Elektro Krämer GmbH:

\`\`\`
elektro-kraemer.de.   3600  IN  SOA   ns1.elektro-kraemer.de. hostmaster.elektro-kraemer.de. (
                                      2026110401 ; Seriennummer
                                      3600       ; Refresh
                                      900        ; Retry
                                      1209600    ; Expire
                                      300 )      ; Negative TTL
elektro-kraemer.de.   3600  IN  NS    ns1.elektro-kraemer.de.
elektro-kraemer.de.   3600  IN  MX    10 mail.elektro-kraemer.de.
elektro-kraemer.de.   3600  IN  MX    20 mail2.provider.example.
ns1                   3600  IN  A     203.0.113.2
www                   3600  IN  A     203.0.113.10
www                   3600  IN  AAAA  2001:db8:10::10
shop                  3600  IN  CNAME www.elektro-kraemer.de.
mail                  3600  IN  A     203.0.113.25
elektro-kraemer.de.   3600  IN  TXT   "v=spf1 mx -all"
\`\`\`

a) Welche IP erhält ein Client für \`shop.elektro-kraemer.de\`?
b) An welchen Server schickt ein fremder Mailserver eine Mail an \`info@elektro-kraemer.de\` zuerst?
c) Was muss der Admin tun, wenn er den A-Record von \`www\` ändert?`,
          steps: [
            { label: 'a) CNAME auflösen', body: '`shop` ist ein **Alias** (CNAME) für `www.elektro-kraemer.de.` Der Resolver löst danach `www` auf: A-Record → **203.0.113.10** (über IPv6: AAAA → 2001:db8:10::10).' },
            { label: 'b) MX-Prioritäten', body: 'Zwei MX-Records: Priorität **10** → `mail.elektro-kraemer.de`, Priorität 20 → Backup beim Provider. **Kleinere Zahl = bevorzugt**, also zuerst `mail.elektro-kraemer.de` → A-Record **203.0.113.25**. Nur wenn der nicht erreichbar ist, wird `mail2` versucht.' },
            { label: 'c) Seriennummer', body: 'Die **Seriennummer im SOA** erhöhen (z. B. `2026110401` → `2026110402`). Sekundäre Nameserver vergleichen sie und holen nur bei höherer Nummer per Zonentransfer die neue Version. Clients sehen die neue IP spätestens nach Ablauf der TTL (hier 3600 s).' },
          ],
          result: 'shop → CNAME → www → 203.0.113.10 · Mail zuerst an mail.elektro-kraemer.de (MX 10) · nach Änderung SOA-Seriennummer erhöhen.',
        },
        {
          type: 'check',
          question: {
            id: 'm11-l04-c1',
            kind: 'single',
            skill: 'svc.dns.records',
            difficulty: 1,
            prompt: 'Ein Mailserver möchte zur IP-Adresse eines einliefernden Servers den Hostnamen ermitteln. Welcher Record-Typ wird abgefragt?',
            options: ['PTR', 'A', 'MX', 'CNAME'],
            answer: 0,
            distractors: {
              '1': { why: 'A-Records lösen Name → IPv4 auf, also die andere Richtung.', error: 'forward-reverse-verwechselt' },
              '2': { why: 'MX nennt die Mailserver einer Domain, nicht den Namen zu einer IP.', error: 'record-verwechselt' },
              '3': { why: 'CNAME ist ein Alias von Name auf Name.', error: 'record-verwechselt' },
            },
            explanation: 'IP → Name ist eine Reverse-Auflösung. Die Einträge dafür sind PTR-Records in der Reverse-Lookup-Zone (in-addr.arpa).',
          },
        },
        {
          type: 'check',
          question: {
            id: 'm11-l04-c2',
            kind: 'text',
            skill: 'svc.dns.records',
            difficulty: 2,
            prompt: 'Wie lautet der Name der **Reverse-Lookup-Zone** für das Netz `192.168.20.0/24` (Standort Berlin)?',
            accept: ['20.168.192.in-addr.arpa', '20.168.192.in-addr.arpa.'],
            placeholder: 'z. B. x.y.z.in-addr.arpa',
            explanation: 'Die ersten drei Oktette (Netzanteil) werden umgedreht – 192.168.20 → 20.168.192 – und `.in-addr.arpa` wird angehängt.',
            hints: ['Nur der Netzanteil (3 Oktette bei /24) gehört in den Zonennamen.', 'Reihenfolge umdrehen!'],
          },
        },
        {
          type: 'practice',
          title: 'Übung: Records, Zonen, hosts',
          questionIds: ['m11-q021', 'm11-q022', 'm11-q023', 'm11-q024', 'm11-q025', 'm11-q045'],
          count: 5,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'A = Name→IPv4, AAAA = Name→IPv6, CNAME = Alias, MX = Mailserver (kleinste Priorität zuerst), NS = zuständige Nameserver.',
            'PTR = IP→Name in der Reverse-Zone; TXT = Freitext (z. B. SPF); SOA = Verwaltungsdaten, genau einer pro Zone.',
            'Reverse-Zone: Netz-Oktette umdrehen + in-addr.arpa, z. B. 10.168.192.in-addr.arpa.',
            'Bei Zonenänderungen die SOA-Seriennummer erhöhen.',
            'hosts-Datei (Windows: C:\\Windows\\System32\\drivers\\etc\\hosts) wird vor dem DNS-Server berücksichtigt – praktisch zum Testen, beliebt bei Malware.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'm11-l05',
      title: 'NAT und PAT: Viele private Geräte, eine öffentliche Adresse',
      minutes: 30,
      relevance: 'ap1',
      skills: ['svc.nat'],
      steps: [
        {
          type: 'explain',
          title: 'Das Problem: private Adressen sind im Internet „unsichtbar“',
          body: `IPv4 hat nur rund 4,3 Milliarden Adressen – viel zu wenig für alle Geräte der Welt. Deshalb wurden in **RFC 1918** drei **private Adressbereiche** festgelegt, die jede Firma und jeder Haushalt intern frei nutzen darf:

| Bereich | CIDR | typischer Einsatz |
|---|---|---|
| \`10.0.0.0\` – \`10.255.255.255\` | \`10.0.0.0/8\` | große Firmennetze |
| \`172.16.0.0\` – \`172.31.255.255\` | \`172.16.0.0/12\` | mittlere Netze, Docker |
| \`192.168.0.0\` – \`192.168.255.255\` | \`192.168.0.0/16\` | kleine Firmen, Heimnetze |

**Warum werden private Adressen im Internet nicht geroutet?** Weil sie **nicht eindeutig** sind: \`192.168.10.57\` gibt es in Hamburg bei Elektro Krämer, aber auch in Millionen anderer Netze. Ein Router im Internet wüsste nicht, wohin er ein Paket an diese Adresse schicken soll. Provider **filtern** solche Adressen daher und haben **keine Routen** für sie.

Also muss am Übergang ins Internet jemand die privaten Adressen gegen eine **öffentliche** austauschen. Genau das macht **NAT – Network Address Translation** auf dem Router bzw. der Firewall.`,
        },
        {
          type: 'explain',
          title: 'SNAT, PAT und DNAT – die drei Spielarten',
          body: `**1. Source NAT (SNAT)** – die **Quell**adresse wird ersetzt. Ausgehende Pakete eines internen PCs bekommen als Absender die öffentliche IP des Routers. Die Antwort kommt an diese öffentliche IP zurück, und der Router übersetzt sie wieder zurück an den PC.

**2. PAT – Port Address Translation** (auch *NAT Overload*, *Masquerading*, *NAPT*). Die Firma hat nur **eine** öffentliche IP, aber 80 PCs surfen gleichzeitig. Wie weiß der Router, welche Antwort zu welchem PC gehört? Über die **Portnummer**: Der Router merkt sich jede Verbindung in einer **Übersetzungstabelle** und vergibt bei Bedarf einen eigenen Quellport.

| Intern (Quelle) | Öffentlich nach NAT | Ziel |
|---|---|---|
| \`192.168.10.21:50123\` | \`203.0.113.5:61001\` | \`198.51.100.80:443\` |
| \`192.168.10.22:50123\` | \`203.0.113.5:61002\` | \`198.51.100.80:443\` |
| \`192.168.10.35:49800\` | \`203.0.113.5:61003\` | \`192.0.2.44:80\` |

Kommt ein Antwortpaket an \`203.0.113.5:61002\`, schaut der Router in die Tabelle und schickt es an \`192.168.10.22:50123\`. Kommt ein Paket an einen Port **ohne Eintrag**, wird es **verworfen** – deshalb sind interne Geräte hinter PAT von außen nicht direkt erreichbar. (Das ist ein Nebeneffekt, **keine** echte Firewall!)

**3. Destination NAT (DNAT) / Portweiterleitung** – die **Ziel**adresse wird ersetzt. So macht man einen internen Server von außen erreichbar: „Alles, was an \`203.0.113.5:443\` kommt, leite an den Webserver \`172.16.1.10:443\` in der DMZ weiter.“ Diese Regel trägt der Admin **fest** ein, sie entsteht nicht automatisch.

| Begriff | Was wird verändert? | Richtung | Typischer Zweck |
|---|---|---|---|
| SNAT | Quell-IP | von innen nach außen | Internetzugang für Clients |
| PAT | Quell-IP **und** Quellport | von innen nach außen | viele Clients teilen sich eine öffentliche IP |
| DNAT / Portweiterleitung | Ziel-IP (ggf. Zielport) | von außen nach innen | interne Server veröffentlichen |

**Nebenwirkungen von NAT:** Die Ende-zu-Ende-Erreichbarkeit geht verloren. Manche Protokolle (z. B. IPsec ohne NAT-Traversal, VoIP/SIP) brauchen Sonderbehandlung. Mit IPv6 gibt es genügend Adressen – dort ist NAT normalerweise nicht nötig.`,
        },
        {
          type: 'visual',
          title: 'PAT am Internetzugang der Elektro Krämer GmbH',
          widget: {
            kind: 'topology',
            data: {
              nodes: [
                { id: 'pc1', type: 'pc', label: 'PC 1', sub: '192.168.10.21', x: 80, y: 90 },
                { id: 'pc2', type: 'pc', label: 'PC 2', sub: '192.168.10.22', x: 80, y: 210 },
                { id: 'pc3', type: 'laptop', label: 'Laptop', sub: '192.168.10.35', x: 80, y: 330 },
                { id: 'sw', type: 'switch', label: 'Switch', x: 230, y: 210 },
                { id: 'fw', type: 'firewall', label: 'NAT-Router', sub: 'innen .10.1 | außen 203.0.113.5', x: 400, y: 210 },
                { id: 'inet', type: 'internet', label: 'Internet', x: 570, y: 210 },
                { id: 'web', type: 'server', label: 'Webserver', sub: '198.51.100.80', x: 720, y: 120 },
                { id: 'web2', type: 'server', label: 'Server', sub: '192.0.2.44', x: 720, y: 300 },
              ],
              links: [
                { from: 'pc1', to: 'sw' },
                { from: 'pc2', to: 'sw' },
                { from: 'pc3', to: 'sw' },
                { from: 'sw', to: 'fw' },
                { from: 'fw', to: 'inet', style: 'wan' },
                { from: 'inet', to: 'web', style: 'wan' },
                { from: 'inet', to: 'web2', style: 'wan' },
              ],
              zones: [
                { label: 'privat (RFC 1918)', x: 20, y: 30, w: 300, h: 370, color: 'blue' },
                { label: 'öffentlich', x: 500, y: 30, w: 290, h: 370, color: 'orange' },
              ],
            },
          },
          caption:
            'Alle drei Geräte erscheinen im Internet mit derselben Absender-IP 203.0.113.5. Unterschieden werden die Verbindungen über die Ports in der PAT-Tabelle.',
        },
        {
          type: 'visual',
          title: 'Ein Paket auf dem Hin- und Rückweg',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['PC 192.168.10.22', 'NAT-Router', 'Webserver 198.51.100.80'],
              messages: [
                { from: 0, to: 1, label: 'Q 192.168.10.22:50123 → Z 198.51.100.80:443', note: 'privater Absender' },
                { from: 1, to: 2, label: 'Q 203.0.113.5:61002 → Z 198.51.100.80:443', note: 'Quelle ersetzt, Eintrag in PAT-Tabelle' },
                { from: 2, to: 1, label: 'Q 198.51.100.80:443 → Z 203.0.113.5:61002', note: 'Antwort an öffentliche IP' },
                { from: 1, to: 0, label: 'Q 198.51.100.80:443 → Z 192.168.10.22:50123', note: 'Ziel laut Tabelle zurückübersetzt' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Webserver in der DMZ per Portweiterleitung veröffentlichen',
          problem: `Der Online-Shop der Elektro Krämer GmbH läuft auf einem Webserver in der DMZ mit der Adresse \`172.16.1.10\` (HTTPS, Port 443). Die Firma hat die öffentliche IP \`203.0.113.5\`. Ein Kunde mit der IP \`198.51.100.77\` ruft den Shop auf (Quellport 52000).

Welche NAT-Regel ist nötig, und wie sehen die Adressen des ersten Pakets vor und nach der Firewall aus?`,
          steps: [
            { label: 'Regeltyp bestimmen', body: 'Von außen nach innen, das **Ziel** muss geändert werden → **DNAT / Portweiterleitung**: `203.0.113.5:443` → `172.16.1.10:443`.' },
            { label: 'Paket vom Kunden (vor NAT)', body: 'Quelle `198.51.100.77:52000` → Ziel `203.0.113.5:443`. Der Kunde kennt nur die öffentliche Adresse (über DNS: A-Record von www).' },
            { label: 'Nach DNAT', body: 'Quelle `198.51.100.77:52000` → Ziel **`172.16.1.10:443`**. Nur die Zieladresse wurde ersetzt.' },
            { label: 'Antwort des Servers', body: 'Der Webserver antwortet an `198.51.100.77:52000` mit Quelle `172.16.1.10:443`. Die Firewall erkennt die Verbindung und setzt die Quelle zurück auf `203.0.113.5:443` – sonst würde der Kunde die Antwort nicht zuordnen können.' },
            { label: 'Firewall-Regel nicht vergessen', body: 'NAT allein erlaubt nichts: Zusätzlich braucht es eine Firewall-Regel „any → 172.16.1.10, TCP 443, erlauben“.' },
          ],
          result: 'DNAT/Portweiterleitung 203.0.113.5:443 → 172.16.1.10:443 plus passende Firewall-Freigabe. Die Antworten werden automatisch zurückübersetzt.',
        },
        {
          type: 'check',
          question: {
            id: 'm11-l05-c1',
            kind: 'single',
            skill: 'svc.nat',
            difficulty: 2,
            prompt: 'Am NAT-Router kommt ein Paket aus dem Internet an `203.0.113.5:61004` an. In der PAT-Tabelle gibt es **keinen** Eintrag für Port 61004 und keine Portweiterleitung. Was passiert?',
            options: [
              'Das Paket wird verworfen',
              'Das Paket wird an alle internen Hosts per Broadcast verteilt',
              'Das Paket geht an den ersten PC in der Tabelle',
              'Der Router erstellt automatisch einen neuen Eintrag',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'Ein NAT-Router verteilt keine eingehenden Pakete per Broadcast.', error: 'nat-funktion' },
              '2': { why: 'Ohne passenden Eintrag gibt es kein Ziel – geraten wird nicht.', error: 'nat-funktion' },
              '3': { why: 'Einträge entstehen nur durch ausgehende Verbindungen oder durch vom Admin eingetragene Portweiterleitungen.', error: 'nat-funktion' },
            },
            explanation: 'Ohne Eintrag weiß der Router nicht, zu welchem internen Gerät das Paket gehört – es wird verworfen. Deshalb sind Geräte hinter PAT von außen nicht ohne Portweiterleitung erreichbar.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'm11-l05-c2',
            kind: 'single',
            skill: 'svc.nat',
            difficulty: 1,
            prompt: 'Was unterscheidet **PAT** von einfachem **1:1-NAT**?',
            options: [
              'PAT übersetzt zusätzlich die Portnummern, sodass viele interne Geräte eine öffentliche IP teilen können',
              'PAT verschlüsselt die Pakete zusätzlich',
              'PAT funktioniert nur mit IPv6',
              'PAT ändert die Zieladresse statt der Quelladresse',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'NAT/PAT verschlüsselt nichts – das macht z. B. ein VPN oder TLS.', error: 'nat-vpn-verwechselt' },
              '2': { why: 'PAT ist vor allem wegen der IPv4-Knappheit entstanden; bei IPv6 braucht man es normalerweise nicht.', error: 'fakt-falsch' },
              '3': { why: 'Das Ändern der Zieladresse ist DNAT (Portweiterleitung).', error: 'snat-dnat-verwechselt' },
            },
            explanation: 'Bei 1:1-NAT bekommt jedes interne Gerät eine eigene öffentliche IP. PAT nutzt zusätzlich die Ports, um viele Verbindungen über eine einzige öffentliche IP zu unterscheiden.',
          },
        },
        {
          type: 'practice',
          title: 'Übung: NAT und PAT',
          questionIds: ['m11-q027', 'm11-q028', 'm11-q029', 'm11-q030', 'm11-q031', 'm11-q032', 'm11-q044'],
          count: 5,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Private Bereiche (RFC 1918): 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 – nicht eindeutig, daher im Internet nicht geroutet.',
            'SNAT ersetzt die Quell-IP (innen → außen), DNAT/Portweiterleitung ersetzt die Ziel-IP (außen → innen).',
            'PAT (NAT Overload) übersetzt zusätzlich Ports: viele Clients teilen sich eine öffentliche IP; Zuordnung über die Übersetzungstabelle.',
            'Pakete ohne Tabelleneintrag oder Portweiterleitung werden verworfen – das ersetzt aber keine Firewall.',
            'Eine Portweiterleitung braucht zusätzlich eine passende Firewall-Regel.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'm11-l06',
      title: 'VPN, Proxy und Firewall – Dienste am Netzübergang',
      minutes: 35,
      relevance: 'ap1',
      skills: ['svc.vpn', 'svc.proxy', 'svc.firewall'],
      steps: [
        {
          type: 'explain',
          title: 'VPN: Ein privater Tunnel durch das öffentliche Internet',
          body: `Hamburg und Berlin sollen so zusammenarbeiten, als wären sie ein Netz – und Mitarbeiter im Homeoffice sollen auf den Dateiserver zugreifen. Eine eigene Leitung zwischen den Städten wäre teuer. Stattdessen nutzt man das Internet und baut einen **VPN-Tunnel** (*Virtual Private Network*).

**Was ist ein Tunnel?** Das ursprüngliche Paket (z. B. von \`192.168.20.15\` an \`192.168.10.5\`) wird **komplett verschlüsselt** und in ein **neues Paket mit öffentlichen Adressen** verpackt (Router Berlin → Router Hamburg). Unterwegs sieht niemand, was drin ist. Am anderen Ende wird ausgepackt, entschlüsselt und das Originalpaket ins LAN weitergeleitet. Ein VPN sichert dabei:
- **Vertraulichkeit** (Verschlüsselung),
- **Integrität** (Manipulationen fallen auf),
- **Authentizität** (beide Seiten weisen sich aus – per Pre-Shared Key, Zertifikat oder Benutzer + MFA).

**Zwei Grundformen:**

| | **Site-to-Site** | **Remote Access (End-to-Site)** |
|---|---|---|
| Verbindet | zwei **Netze** (Standorte) | ein **einzelnes Gerät** mit dem Firmennetz |
| Endpunkte | VPN-Gateways (Router/Firewalls) | VPN-**Client**-Software auf dem Laptop ↔ VPN-Gateway |
| Für die Nutzer | unsichtbar, dauerhaft aktiv | Nutzer startet die Verbindung, meldet sich an |
| Beispiel | Hamburg ↔ Berlin | Homeoffice-Laptop ↔ Hamburg |

**Protokolle im Überblick:**
- **IPsec** – arbeitet auf **Schicht 3**. Schlüsselaustausch per **IKE** (UDP 500, bei NAT dazwischen **NAT-Traversal** über UDP 4500), Daten im **ESP** (verschlüsselt). Klassiker für Site-to-Site.
- **SSL/TLS-VPN** – nutzt TLS wie HTTPS, oft über **TCP 443**. Kommt daher fast durch jede Firewall, beliebt für Remote Access (z. B. OpenVPN, viele Hersteller-Clients).
- **WireGuard** – modern, schlank, schnell; feste moderne Kryptoverfahren, arbeitet über **UDP** (Standardport 51820). Authentifizierung über Schlüsselpaare.

**Split Tunneling** (*vertiefend*): Nur der Firmenverkehr geht durch den Tunnel, Internetverkehr direkt raus. Gegenteil: **Full Tunnel** – alles läuft über die Firma (mehr Kontrolle, mehr Last).`,
        },
        {
          type: 'visual',
          title: 'Site-to-Site und Remote-Access-VPN bei Elektro Krämer',
          widget: {
            kind: 'topology',
            data: {
              nodes: [
                { id: 'srv', type: 'server', label: 'Dateiserver', sub: '192.168.10.5', x: 80, y: 120 },
                { id: 'fwh', type: 'firewall', label: 'FW Hamburg', sub: 'VPN-Gateway', x: 230, y: 210 },
                { id: 'inet', type: 'internet', label: 'Internet', x: 400, y: 210 },
                { id: 'fwb', type: 'firewall', label: 'FW Berlin', sub: 'VPN-Gateway', x: 580, y: 120 },
                { id: 'pcb', type: 'pc', label: 'PC Berlin', sub: '192.168.20.15', x: 720, y: 120 },
                { id: 'ho', type: 'laptop', label: 'Homeoffice', sub: 'VPN-Client', x: 580, y: 330 },
                { id: 'pch', type: 'pc', label: 'PC HH', x: 80, y: 300 },
              ],
              links: [
                { from: 'srv', to: 'fwh' },
                { from: 'pch', to: 'fwh' },
                { from: 'fwh', to: 'inet', style: 'wan' },
                { from: 'inet', to: 'fwb', style: 'wan' },
                { from: 'fwb', to: 'pcb' },
                { from: 'inet', to: 'ho', style: 'wan' },
                { from: 'fwh', to: 'fwb', label: 'Site-to-Site (IPsec)', style: 'vpn' },
                { from: 'fwh', to: 'ho', label: 'Remote Access', style: 'vpn' },
              ],
              zones: [
                { label: 'Hamburg', x: 20, y: 40, w: 280, h: 340, color: 'blue' },
                { label: 'Berlin', x: 520, y: 40, w: 270, h: 160, color: 'green' },
                { label: 'Homeoffice', x: 520, y: 260, w: 170, h: 130, color: 'purple' },
              ],
            },
          },
          caption: 'Die gestrichelten Tunnel laufen physisch durch das Internet, logisch verbinden sie die Netze bzw. den Laptop direkt mit Hamburg.',
        },
        {
          type: 'explain',
          title: 'Proxy: Ein Stellvertreter in der Mitte',
          body: `Ein **Proxy** (engl. „Stellvertreter“) nimmt Anfragen entgegen und stellt sie **in eigenem Namen** weiter. Es gibt zwei Richtungen:

**Forward-Proxy** – steht vor den **Clients**. Die PCs der Firma schicken ihre Web-Anfragen an den Proxy (z. B. \`proxy.elektro-kraemer.local:8080\`), der Proxy holt die Seite aus dem Internet. Vorteile:
- **Caching**: Häufig geladene Inhalte werden zwischengespeichert → schneller, weniger Bandbreite.
- **Inhaltsfilter**: gefährliche oder unerwünschte Seiten sperren, Malware-Scan.
- **Protokollierung und Authentifizierung**: Wer hat wann was aufgerufen (Datenschutz und Betriebsrat beachten!).
- Die Server im Internet sehen nur die Adresse des Proxys.

Ein Forward-Proxy kann im Browser eingetragen (explizit) oder **transparent** sein (der Router leitet Webverkehr unbemerkt über den Proxy).

**Reverse-Proxy** – steht vor den **Servern**. Kunden im Internet sprechen den Reverse-Proxy an, der die Anfrage an einen oder mehrere interne Webserver weitergibt. Vorteile:
- **Lastverteilung** (Load Balancing) auf mehrere Server,
- **TLS-Terminierung** (Zertifikate zentral an einer Stelle),
- **Schutz**: Die echten Server sind nicht direkt erreichbar; oft mit Web Application Firewall (WAF).

> **Merke:** Forward-Proxy = schützt/vertritt die **Clients**. Reverse-Proxy = schützt/vertritt die **Server**.

| | Forward-Proxy | Reverse-Proxy |
|---|---|---|
| Steht vor | Clients (Mitarbeiter) | Servern (Webshop) |
| Wer spricht ihn an? | interne Clients | externe Besucher |
| Typische Aufgaben | Caching, Filter, Logging | Lastverteilung, TLS-Terminierung, Schutz |`,
        },
        {
          type: 'explain',
          title: 'Firewall-Grundlagen und DMZ',
          body: `Eine **Firewall** entscheidet anhand von **Regeln**, welcher Verkehr zwischen Netzbereichen erlaubt ist. (Tiefer geht es in Modul 14 – hier die Grundlagen.)

**Arten:**
- **Paketfilter (stateless):** prüft jedes Paket einzeln nach Quell-/Ziel-IP, Protokoll und Port (Schicht 3/4). Er „erinnert“ sich nicht an Verbindungen – für Antworten braucht es eigene Regeln.
- **Stateful Inspection:** merkt sich aufgebaute Verbindungen in einer **Zustandstabelle**. Antwortpakete zu einer erlaubten Verbindung werden **automatisch** durchgelassen. Heute Standard.
- **Application-Layer-Firewall / Next-Generation-Firewall (NGFW):** schaut bis in Schicht 7 (welche Anwendung, welcher Inhalt), oft mit IPS und Virenscanner.

**Regeln** werden **von oben nach unten** geprüft; die **erste passende Regel** entscheidet. Am Ende steht immer: **Default deny** („alles, was nicht ausdrücklich erlaubt ist, ist verboten“).

**DMZ (Demilitarisierte Zone):** Server, die aus dem Internet erreichbar sein müssen (Webshop, Mail-Relay), stehen in einem **eigenen Netzsegment** zwischen Internet und LAN. Wird der Webserver gehackt, steht der Angreifer in der DMZ – und **nicht** im internen LAN, denn die Firewall erlaubt von der DMZ ins LAN nur das Nötigste (meist gar nichts).

| Von → Nach | Typische Regel |
|---|---|
| Internet → DMZ | nur benötigte Dienste (z. B. TCP 443 zum Webserver) |
| Internet → LAN | **verboten** |
| LAN → Internet | erlaubt (ggf. über Proxy), Antworten dank Stateful automatisch |
| LAN → DMZ | Administration und Pflege, gezielt |
| DMZ → LAN | **verboten** bzw. nur einzelne, eng begrenzte Ausnahmen |`,
        },
        {
          type: 'visual',
          title: 'Netzübergang mit DMZ',
          widget: {
            kind: 'topology',
            data: {
              nodes: [
                { id: 'inet', type: 'internet', label: 'Internet', x: 80, y: 210 },
                { id: 'fw', type: 'firewall', label: 'Firewall', sub: 'NAT + Regeln', x: 280, y: 210 },
                { id: 'rp', type: 'server', label: 'Reverse-Proxy', sub: '172.16.1.5', x: 430, y: 90 },
                { id: 'web', type: 'server', label: 'Webshop', sub: '172.16.1.10', x: 600, y: 90 },
                { id: 'sw', type: 'switch', label: 'Switch LAN', x: 450, y: 310 },
                { id: 'px', type: 'server', label: 'Proxy', sub: '192.168.10.8', x: 600, y: 240 },
                { id: 'pc', type: 'pc', label: 'Clients', sub: '192.168.10.0/24', x: 600, y: 360 },
              ],
              links: [
                { from: 'inet', to: 'fw', style: 'wan' },
                { from: 'fw', to: 'rp' },
                { from: 'rp', to: 'web' },
                { from: 'fw', to: 'sw' },
                { from: 'sw', to: 'px' },
                { from: 'sw', to: 'pc' },
              ],
              zones: [
                { label: 'Internet', x: 20, y: 140, w: 140, h: 140, color: 'red' },
                { label: 'DMZ 172.16.1.0/24', x: 380, y: 30, w: 400, h: 130, color: 'orange' },
                { label: 'LAN 192.168.10.0/24', x: 380, y: 190, w: 400, h: 220, color: 'blue' },
              ],
            },
          },
          caption: 'Eine Firewall mit drei Schnittstellen („Three-Legged“): Internet, DMZ und LAN sind getrennte Zonen mit eigenen Regeln.',
        },
        {
          type: 'example',
          title: 'Regelwerk für den Webshop formulieren',
          problem: `Für die Firewall der Elektro Krämer GmbH sollen folgende Anforderungen umgesetzt werden (Firewall arbeitet stateful):
1. Kunden aus dem Internet erreichen den Webshop \`172.16.1.10\` per HTTPS.
2. Der Webshop darf nicht ins LAN.
3. Die Clients im LAN dürfen über den Proxy \`192.168.10.8\` im Internet surfen (HTTP/HTTPS) – nur der Proxy selbst darf direkt raus.
4. Alles andere ist verboten.

Erstelle ein Regelwerk in der richtigen Reihenfolge.`,
          steps: [
            { label: 'Regel 1', body: 'Quelle **any** (Internet) → Ziel **172.16.1.10**, TCP **443** → **erlauben** (zusammen mit DNAT 203.0.113.5:443 → 172.16.1.10:443).' },
            { label: 'Regel 2', body: 'Quelle **172.16.1.0/24** (DMZ) → Ziel **192.168.10.0/24** (LAN), any → **verweigern**. Steht explizit da, damit spätere Regeln das nicht versehentlich öffnen und Verstöße protokolliert werden.' },
            { label: 'Regel 3', body: 'Quelle **192.168.10.8** (Proxy) → Ziel **any**, TCP **80, 443** → **erlauben**.' },
            { label: 'Regel 4', body: 'Quelle **192.168.10.0/24** → Ziel **192.168.10.8**, TCP **8080** – nur nötig, wenn die Firewall zwischen Clients und Proxy liegt. Hier stehen beide im selben LAN, also **entfällt** die Regel.' },
            { label: 'Letzte Regel', body: '**any → any → verweigern** (Default deny). Viele Firewalls haben diese Regel implizit; sie trotzdem sichtbar zu machen (mit Logging) ist gute Praxis.' },
            { label: 'Antworten', body: 'Keine Rückregeln nötig: Die Stateful Firewall lässt Antworten zu erlaubten Verbindungen automatisch zu.' },
          ],
          result: '1) any→172.16.1.10:443 erlauben · 2) DMZ→LAN verweigern · 3) Proxy→any:80/443 erlauben · Ende: any→any verweigern.',
        },
        {
          type: 'check',
          question: {
            id: 'm11-l06-c1',
            kind: 'single',
            skill: 'svc.vpn',
            difficulty: 1,
            prompt: 'Eine Vertriebsmitarbeiterin soll vom Hotel aus mit ihrem Laptop auf das Firmennetz in Hamburg zugreifen. Welche VPN-Form ist passend?',
            options: ['Remote-Access-VPN', 'Site-to-Site-VPN', 'Reverse-Proxy', 'DMZ'],
            answer: 0,
            distractors: {
              '1': { why: 'Site-to-Site verbindet zwei Netze über feste Gateways, nicht ein einzelnes mobiles Gerät.', error: 'vpn-art-verwechselt' },
              '2': { why: 'Ein Reverse-Proxy veröffentlicht Server, er baut keinen verschlüsselten Tunnel für Clients auf.', error: 'proxy-vpn-verwechselt' },
              '3': { why: 'Die DMZ ist ein Netzsegment, keine Zugriffstechnik.', error: 'begriff-verwechselt' },
            },
            explanation: 'Ein einzelnes Endgerät mit VPN-Client verbindet sich mit dem VPN-Gateway der Firma – das ist Remote Access (End-to-Site).',
          },
        },
        {
          type: 'check',
          question: {
            id: 'm11-l06-c2',
            kind: 'single',
            skill: 'svc.proxy',
            difficulty: 2,
            prompt: 'Vor drei Webservern des Shops soll ein System Anfragen aus dem Internet annehmen, auf die Server verteilen und die TLS-Zertifikate zentral verwalten. Was wird eingesetzt?',
            options: ['Reverse-Proxy', 'Forward-Proxy', 'DHCP-Relay', 'Paketfilter ohne Zustandstabelle'],
            answer: 0,
            distractors: {
              '1': { why: 'Ein Forward-Proxy vertritt die internen Clients beim Zugriff nach außen.', error: 'proxy-richtung' },
              '2': { why: 'Ein DHCP-Relay leitet DHCP-Broadcasts weiter – mit Webservern hat es nichts zu tun.', error: 'begriff-verwechselt' },
              '3': { why: 'Ein Paketfilter verteilt keine Last und terminiert kein TLS.', error: 'firewall-funktion' },
            },
            explanation: 'Lastverteilung, TLS-Terminierung und Schutz von Servern sind die typischen Aufgaben eines Reverse-Proxys.',
          },
        },
        {
          type: 'practice',
          title: 'Übung: VPN, Proxy, Firewall',
          questionIds: ['m11-q033', 'm11-q034', 'm11-q035', 'm11-q036', 'm11-q037', 'm11-q038', 'm11-q043', 'm11-q046'],
          count: 6,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'VPN = verschlüsselter Tunnel über ein unsicheres Netz: Vertraulichkeit, Integrität, Authentizität.',
            'Site-to-Site verbindet Netze (Gateways), Remote Access verbindet einzelne Geräte (VPN-Client).',
            'IPsec (Schicht 3, IKE UDP 500/4500), SSL/TLS-VPN (oft TCP 443), WireGuard (UDP, schlank, modern).',
            'Forward-Proxy vertritt Clients (Caching, Filter, Logging); Reverse-Proxy vertritt Server (Lastverteilung, TLS-Terminierung, Schutz).',
            'Firewall: Paketfilter (stateless), Stateful Inspection (Zustandstabelle), NGFW (bis Schicht 7). Regeln von oben nach unten, erste Übereinstimmung zählt, am Ende Default deny.',
            'DMZ: öffentlich erreichbare Server in eigenem Segment; DMZ → LAN ist gesperrt.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'm11-l07',
      title: 'Praxis: Typische Fehler bei DHCP, Gateway und DNS erkennen',
      minutes: 25,
      relevance: 'ap1',
      skills: ['svc.troubleshoot'],
      steps: [
        {
          type: 'explain',
          title: 'Drei Fehlerbilder, die du sofort erkennen solltest',
          body: `Wenn ein Kollege sagt „Das Internet geht nicht“, steckt dahinter oft einer von drei Klassikern. Du erkennst sie an der IP-Konfiguration (\`ipconfig /all\`) und an ein paar Pings:

| Symptom | Was du siehst | Ursache (wahrscheinlich) |
|---|---|---|
| **1. Keine gültige Adresse** | IPv4-Adresse **169.254.x.x**, kein Gateway | DHCP-Server nicht erreicht (Kabel/VLAN/Dienst/Relay/Bereich voll) |
| **2. Nur das eigene Netz geht** | Ping auf Kollegen-PC ok, Ping auf **Gateway** oder ins Internet scheitert | **Gateway falsch** eingetragen oder fehlt, Router defekt |
| **3. IPs gehen, Namen nicht** | \`ping 8.8.8.8\` ok, \`ping www.elektro-kraemer.de\` → „Host nicht gefunden“ | **DNS** falsch eingetragen oder DNS-Server ausgefallen |

**Warum ist das so?**
- Ohne Antwort vom DHCP-Server vergibt sich Windows eine APIPA-Adresse – damit gibt es kein Gateway und keinen DNS.
- Pakete an fremde Netze gehen **immer** an das Standardgateway. Ist es falsch, kommt nichts über das eigene Subnetz hinaus – das lokale Netz funktioniert aber weiter (dort wird direkt per ARP zugestellt).
- Wenn IP-Verbindungen funktionieren, Namen aber nicht aufgelöst werden, liegt das Problem eine Ebene höher: bei der Namensauflösung.

**Vorgehen (Kurzform, ausführlich in Modul 13):**
1. \`ipconfig /all\` – Adresse, Maske, Gateway, DNS-Server plausibel? 169.254?
2. \`ping\` auf das **Gateway**.
3. \`ping\` auf eine **externe IP** (z. B. \`8.8.8.8\`).
4. \`ping\` bzw. \`nslookup\` auf einen **Namen**.

Der erste Schritt, der fehlschlägt, zeigt dir die Ebene des Problems.`,
        },
        {
          type: 'visual',
          title: 'Fehlerbilder im Überblick',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: '169.254.x.x', text: 'DHCP nicht erreicht. Prüfen: Link-LED, VLAN am Port, DHCP-Dienst, freie Adressen im Bereich, Relay.', icon: 'AlertTriangle' },
                { title: 'Falsches Gateway', text: 'Lokale Ziele erreichbar, alles außerhalb des Subnetzes nicht. Prüfen: Gateway im eigenen Subnetz? Option 3 korrekt?', icon: 'Router' },
                { title: 'DNS-Fehler', text: 'Ping auf IP klappt, auf Namen nicht. Prüfen: DNS-Server-Eintrag (Option 6), nslookup, hosts-Datei.', icon: 'Globe' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Fehlersuche am Arbeitsplatz im Lager',
          problem: `Ein neuer PC im Lager (VLAN 30, Netz \`192.168.30.0/24\`, Gateway \`192.168.30.1\`) kommt nicht ins Netz. \`ipconfig /all\` zeigt (Auszug):

\`\`\`
Ethernet-Adapter Ethernet:

   Verbindungsspezifisches DNS-Suffix:
   Beschreibung. . . . . . . . . . . : Intel(R) Ethernet Connection I219-LM
   Physische Adresse . . . . . . . . : 3C-52-82-1A-7F-04
   DHCP aktiviert. . . . . . . . . . : Ja
   Autokonfiguration aktiviert . . . : Ja
   Verbindungslokale IPv6-Adresse  . : fe80::8d4c:2b1e:5a7f:9c31%7(Bevorzugt)
   Autokonfiguration IPv4-Adresse  . : 169.254.88.17(Bevorzugt)
   Subnetzmaske  . . . . . . . . . . : 255.255.0.0
   Standardgateway . . . . . . . . . :
   DNS-Server  . . . . . . . . . . . : fec0:0:0:ffff::1%1
                                       fec0:0:0:ffff::2%1
                                       fec0:0:0:ffff::3%1
\`\`\`

Die anderen Lager-PCs am selben Switch funktionieren. Was ist los, und wie gehst du vor?`,
          steps: [
            { label: 'Ausgabe lesen', body: '„DHCP aktiviert: Ja“, aber **Autokonfiguration IPv4-Adresse 169.254.88.17**, Maske /16, **kein Gateway**. Die fec0-DNS-Einträge sind Windows-Platzhalter, wenn kein DNS-Server bekannt ist. → Der PC hat **keinen DHCP-Server erreicht** (APIPA).' },
            { label: 'Eingrenzen', body: 'Die anderen Lager-PCs am **selben Switch** funktionieren → DHCP-Server, Relay für VLAN 30 und der Bereich arbeiten grundsätzlich. Das Problem liegt beim **Port** dieses PCs oder beim PC selbst.' },
            { label: 'Hypothese', body: 'Wahrscheinlich ist der Switchport einem **falschen VLAN** zugeordnet (z. B. einem ungenutzten VLAN ohne DHCP) oder durch Port Security gesperrt. Ein Link besteht ja (sonst stünde „Medium getrennt“).' },
            { label: 'Prüfen und beheben', body: 'Am Switch die Portkonfiguration prüfen → Port liegt in VLAN 99 (ungenutzt). Port auf **Access-VLAN 30** setzen. Am PC `ipconfig /renew` ausführen.' },
            { label: 'Kontrolle', body: '`ipconfig` zeigt jetzt z. B. `192.168.30.112`, Gateway `192.168.30.1`. Danach `ping 192.168.30.1`, `ping 8.8.8.8`, `nslookup www.elektro-kraemer.de` – alles erfolgreich.' },
          ],
          result: 'APIPA-Adresse → DHCP nicht erreicht. Da nur dieser Port betroffen war: falsches VLAN am Switchport korrigiert, Adresse erneuert, Verbindung getestet.',
        },
        {
          type: 'check',
          question: {
            id: 'm11-l07-c1',
            kind: 'single',
            skill: 'svc.troubleshoot',
            difficulty: 2,
            prompt: `Ein PC zeigt folgende Konfiguration. Kollegen-PCs im selben Netz kann er anpingen, aber keine Internetadressen (auch nicht per IP).

\`\`\`
   IPv4-Adresse  . . . . . . . . . . : 192.168.10.57
   Subnetzmaske  . . . . . . . . . . : 255.255.255.0
   Standardgateway . . . . . . . . . : 192.168.1.1
   DNS-Server  . . . . . . . . . . . : 192.168.10.5
\`\`\`

Was ist die Ursache?`,
            options: [
              'Das Standardgateway liegt nicht im eigenen Subnetz und ist damit falsch',
              'Der DNS-Server ist falsch',
              'Die Subnetzmaske ist für eine private Adresse ungültig',
              'Der PC hat eine APIPA-Adresse',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'Ein DNS-Fehler würde Pings auf IP-Adressen im Internet nicht verhindern.', error: 'dns-gateway-verwechselt' },
              '2': { why: '/24 ist für 192.168.x.x völlig üblich.', error: 'maske-falsch-eingeschaetzt' },
              '3': { why: '192.168.10.57 ist keine APIPA-Adresse (die beginnen mit 169.254).', error: 'apipa-verwechselt' },
            },
            explanation: 'Das Netz des PCs ist 192.168.10.0/24. Das Gateway 192.168.1.1 liegt in einem anderen Netz und ist daher nicht direkt erreichbar. Alles außerhalb des eigenen Subnetzes scheitert, das lokale Netz funktioniert weiter. Richtig wäre z. B. 192.168.10.1.',
            hints: ['Berechne das Netz des PCs und das des Gateways.'],
          },
        },
        {
          type: 'practice',
          title: 'Übung: Fehlerszenarien',
          questionIds: ['m11-q039', 'm11-q040', 'm11-q041', 'm11-q042'],
          count: 4,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            '169.254.x.x = APIPA = kein DHCP-Server erreicht. Eingrenzen: Ein Gerät, ein VLAN oder alle betroffen?',
            'Lokal geht, Internet nicht (auch per IP) → Gateway prüfen: Liegt es im eigenen Subnetz? Ist es erreichbar?',
            'Ping per IP geht, per Name nicht → DNS-Server-Eintrag und DNS-Server prüfen (nslookup), ggf. hosts-Datei.',
            'Reihenfolge: Konfiguration ansehen → Gateway → externe IP → Name. Der erste Fehlschlag zeigt die Problemebene.',
          ],
        },
      ],
    },
  ],

  /* ================================================================== */
  /* Fragenpool                                                          */
  /* ================================================================== */
  questions: [
    /* ---------- DHCP: DORA ---------- */
    {
      id: 'm11-q001',
      kind: 'single',
      skill: 'svc.dhcp.dora',
      difficulty: 1,
      prompt: 'Welche Nachricht sendet ein DHCP-Client **als erste**, wenn er neu ins Netz kommt?',
      options: ['DHCPDISCOVER', 'DHCPREQUEST', 'DHCPOFFER', 'DHCPACK'],
      answer: 0,
      distractors: {
        '1': { why: 'REQUEST folgt erst, nachdem ein Angebot (OFFER) eingegangen ist.', error: 'dora-reihenfolge' },
        '2': { why: 'OFFER sendet der Server, nicht der Client.', error: 'dora-richtung' },
        '3': { why: 'ACK ist die abschließende Bestätigung des Servers.', error: 'dora-richtung' },
      },
      explanation: 'Der Client kennt noch keinen Server und hat keine Adresse – er sucht per Broadcast mit DHCPDISCOVER (das D in DORA).',
      hints: ['DORA – wofür steht das D?'],
    },
    {
      id: 'm11-q002',
      kind: 'order',
      skill: 'svc.dhcp.dora',
      difficulty: 1,
      prompt: 'Bringe die Nachrichten der erstmaligen DHCP-Adressvergabe in die richtige Reihenfolge.',
      items: [
        'Client sendet DHCPDISCOVER (Broadcast)',
        'Server sendet DHCPOFFER',
        'Client sendet DHCPREQUEST (Broadcast)',
        'Server sendet DHCPACK',
        'Client nutzt die Adresse und prüft bei T1 die Verlängerung',
      ],
      explanation: 'DORA: Discover → Offer → Request → Acknowledge. Erst nach dem ACK darf die Adresse genutzt werden; bei 50 % der Lease (T1) beginnt die Verlängerung.',
    },
    {
      id: 'm11-q003',
      kind: 'number',
      skill: 'svc.dhcp.dora',
      difficulty: 1,
      prompt: 'Auf welchem **UDP-Port** lauscht ein DHCP-**Server**?',
      answer: 67,
      explanation: 'DHCP-Server: UDP 67, DHCP-Client: UDP 68. (Diese Ports stammen vom Vorgänger BOOTP.)',
      hints: ['Der Client-Port ist um eins höher.'],
    },
    {
      id: 'm11-q004',
      kind: 'multi',
      skill: 'svc.dhcp.dora',
      difficulty: 2,
      prompt: 'Welche Aussagen zum DHCPDISCOVER sind richtig? (Mehrere Antworten)',
      options: [
        'Die Quell-IP ist 0.0.0.0',
        'Die Ziel-IP ist 255.255.255.255',
        'Es wird von Routern standardmäßig in andere Netze weitergeleitet',
        'Die Ziel-MAC ist FF-FF-FF-FF-FF-FF',
        'Es wird per TCP übertragen',
      ],
      answer: [0, 1, 3],
      explanation: 'Der Client hat noch keine Adresse (Quelle 0.0.0.0) und kennt den Server nicht (Broadcast auf IP- und MAC-Ebene). Router leiten Broadcasts nicht weiter – dafür braucht man einen Relay-Agent. DHCP nutzt UDP.',
      hints: ['Was weiß der Client zu diesem Zeitpunkt – und was nicht?'],
    },
    /* ---------- DHCP: Lease ---------- */
    {
      id: 'm11-q005',
      kind: 'number',
      skill: 'svc.dhcp.lease',
      difficulty: 1,
      prompt: 'Die Lease-Dauer beträgt **8 Tage**. Nach wie vielen **Stunden** versucht der Client erstmals, die Lease zu verlängern (T1)?',
      answer: 96,
      unit: 'h',
      explanation: '8 Tage = 192 h. T1 = 50 % → 96 h (= 4 Tage).',
      hints: ['T1 liegt bei der Hälfte der Lease-Dauer.'],
    },
    {
      id: 'm11-q006',
      kind: 'number',
      skill: 'svc.dhcp.lease',
      difficulty: 2,
      prompt: 'Die Lease-Dauer beträgt **24 Stunden**. Nach wie vielen **Stunden** beginnt die Rebinding-Phase (T2)?',
      answer: 21,
      unit: 'h',
      explanation: 'T2 = 87,5 % der Lease: 24 h × 0,875 = 21 h. (T1 läge bei 12 h.)',
      hints: ['87,5 % = 7/8.'],
    },
    {
      id: 'm11-q007',
      kind: 'single',
      skill: 'svc.dhcp.lease',
      difficulty: 2,
      prompt: 'Was macht ein DHCP-Client zum Zeitpunkt **T2**, wenn sein ursprünglicher Server bisher nicht geantwortet hat?',
      options: [
        'Er sendet ein DHCPREQUEST per Broadcast an jeden erreichbaren DHCP-Server',
        'Er sendet ein DHCPREQUEST per Unicast an seinen ursprünglichen Server',
        'Er gibt die Adresse sofort auf und vergibt sich eine APIPA-Adresse',
        'Er sendet ein DHCPDISCOVER an den DNS-Server',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Das ist das Verhalten bei T1 (Renewing).', error: 't1-t2-verwechselt' },
        '2': { why: 'Die Adresse ist bis zum Lease-Ende gültig; aufgegeben wird sie erst beim Ablauf.', error: 'lease-ablauf' },
        '3': { why: 'DNS hat mit der Adressvergabe nichts zu tun.', error: 'dns-dhcp-verwechselt' },
      },
      explanation: 'Bei T2 (87,5 %) geht der Client in die Rebinding-Phase und versucht per Broadcast, irgendeinen DHCP-Server zur Verlängerung zu bewegen.',
    },
    {
      id: 'm11-q008',
      kind: 'single',
      skill: 'svc.dhcp.lease',
      difficulty: 2,
      prompt: 'Warum wählt man im **Gäste-WLAN** typischerweise eine **kurze** Lease-Dauer (z. B. 2 Stunden)?',
      options: [
        'Weil viele Geräte nur kurz da sind und ihre Adressen sonst den Bereich lange blockieren',
        'Weil kurze Leases die WLAN-Verschlüsselung verbessern',
        'Weil Smartphones keine langen Leases unterstützen',
        'Weil DHCP-Server sonst keine DNS-Option senden können',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Die Lease-Dauer hat nichts mit der Verschlüsselung zu tun.', error: 'begriff-verwechselt' },
        '2': { why: 'Smartphones unterstützen beliebige Lease-Dauern.', error: 'fakt-falsch' },
        '3': { why: 'Optionen werden unabhängig von der Lease-Dauer übertragen.', error: 'fakt-falsch' },
      },
      explanation: 'Bei hoher Fluktuation würden lange Leases Adressen von längst verschwundenen Geräten reservieren – der Bereich wäre schnell erschöpft und neue Gäste bekämen keine Adresse (APIPA).',
    },
    /* ---------- DHCP: Konfiguration ---------- */
    {
      id: 'm11-q009',
      kind: 'match',
      skill: 'svc.dhcp.config',
      difficulty: 2,
      prompt: 'Ordne die DHCP-Optionsnummern ihrem Inhalt zu.',
      left: ['Option 3', 'Option 6', 'Option 15', 'Option 51'],
      right: ['DNS-Server', 'Lease-Dauer', 'Router (Standardgateway)', 'Domänenname (DNS-Suffix)'],
      answer: [2, 0, 3, 1],
      explanation: '3 = Router/Gateway, 6 = DNS-Server, 15 = Domänenname, 51 = IP Address Lease Time (in Sekunden).',
      hints: ['Eselsbrücke: „3 Router, 6 DNS“.'],
    },
    {
      id: 'm11-q010',
      kind: 'single',
      skill: 'svc.dhcp.config',
      difficulty: 1,
      prompt: 'Der Netzwerkdrucker im Vertrieb soll **immer dieselbe IP** erhalten, aber Gateway und DNS-Server weiterhin automatisch per DHCP bekommen. Was richtest du ein?',
      options: ['Eine Reservierung', 'Einen Ausschluss', 'Einen zweiten Bereich', 'Eine kürzere Lease-Dauer'],
      answer: 0,
      distractors: {
        '1': { why: 'Ein Ausschluss verhindert die Vergabe – der Drucker müsste dann statisch konfiguriert werden und bekäme keine Optionen per DHCP.', error: 'ausschluss-reservierung-verwechselt' },
        '2': { why: 'Ein Bereich gilt für ein ganzes Subnetz, nicht für ein einzelnes Gerät.', error: 'scope-begriff' },
        '3': { why: 'Die Lease-Dauer garantiert keine feste Adresse.', error: 'lease-begriff' },
      },
      explanation: 'Eine Reservierung bindet eine IP an die MAC-Adresse des Druckers. Er erhält sie per DHCP – inklusive aller Optionen.',
    },
    {
      id: 'm11-q011',
      kind: 'number',
      skill: 'svc.dhcp.config',
      difficulty: 2,
      prompt: 'Ein Bereich umfasst `192.168.10.1` bis `192.168.10.254`. Ausgeschlossen sind `192.168.10.1`–`192.168.10.30` und `192.168.10.200`–`192.168.10.254`. Wie viele Adressen kann der Server **dynamisch** vergeben?',
      answer: 169,
      explanation: 'Gesamt: 254 Adressen. Ausschluss 1: .1–.30 = 30 Adressen. Ausschluss 2: .200–.254 = 254 − 200 + 1 = 55 Adressen. 254 − 30 − 55 = **169** (das ist genau .31 bis .199).',
      hints: ['Anzahl in einem Bereich von a bis b = b − a + 1.', 'Alternativ: Welche Adressen bleiben übrig – von wo bis wo?'],
    },
    {
      id: 'm11-q012',
      kind: 'multi',
      skill: 'svc.dhcp.config',
      difficulty: 2,
      prompt: 'Welche Angaben benötigst du, um auf einem DHCP-Server eine **Reservierung** anzulegen? (Mehrere Antworten)',
      options: [
        'MAC-Adresse (Client-ID) des Geräts',
        'Gewünschte IP-Adresse aus dem Subnetz des Bereichs',
        'Seriennummer des Geräts',
        'Das Administratorpasswort des Geräts',
      ],
      answer: [0, 1],
      explanation: 'Der Server erkennt das Gerät an der MAC-Adresse bzw. Client-ID und gibt ihm immer die reservierte IP. Seriennummer und Passwörter spielen für DHCP keine Rolle. (Ein Name/Beschreibung ist nur zur Dokumentation.)',
    },
    /* ---------- DHCP: Relay/APIPA ---------- */
    {
      id: 'm11-q013',
      kind: 'single',
      skill: 'svc.dhcp.relay',
      difficulty: 1,
      prompt: 'Warum benötigt der Standort Berlin einen **DHCP-Relay-Agent**, wenn der DHCP-Server in Hamburg steht?',
      options: [
        'Weil Router Broadcasts wie DHCPDISCOVER nicht in andere Netze weiterleiten',
        'Weil DHCP-Pakete im Internet verschlüsselt werden müssen',
        'Weil der DHCP-Server nur IPv6 unterstützt',
        'Weil jeder Standort eine eigene Lease-Dauer braucht',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Die Verschlüsselung übernimmt das VPN – das ist nicht die Aufgabe des Relays.', error: 'relay-vpn-verwechselt' },
        '2': { why: 'Dafür gibt es keinen Hinweis; das Problem besteht genauso bei IPv4.', error: 'fakt-falsch' },
        '3': { why: 'Lease-Dauern werden pro Bereich auf dem Server eingestellt, unabhängig vom Relay.', error: 'lease-begriff' },
      },
      explanation: 'Broadcasts bleiben im eigenen Netz (Broadcast-Domäne). Der Relay-Agent nimmt den Broadcast entgegen und schickt ihn als Unicast an den DHCP-Server weiter.',
    },
    {
      id: 'm11-q014',
      kind: 'free',
      skill: 'svc.dhcp.relay',
      difficulty: 2,
      prompt: 'Erläutern Sie die Funktion eines **DHCP-Relay-Agents** und wie der DHCP-Server erkennt, aus welchem Bereich er eine Adresse vergeben muss.',
      modelAnswer:
        'Ein DHCP-Relay-Agent (meist auf dem Router/Layer-3-Switch des Client-Netzes, z. B. „ip helper-address“) empfängt die DHCP-Broadcasts der Clients, die sonst nicht über den Router hinauskämen, und leitet sie als Unicast an einen in einem anderen Netz stehenden DHCP-Server weiter. Dabei trägt er seine eigene IP-Adresse der Schnittstelle im Client-Netz in das Feld „giaddr“ (Gateway IP Address) ein. Der DHCP-Server erkennt am giaddr das Subnetz des Clients und wählt den passenden Bereich. Die Antworten des Servers gehen an den Relay-Agent, der sie an den Client weitergibt. So genügt ein zentraler DHCP-Server für mehrere Subnetze bzw. VLANs.',
      keywords: ['Broadcast', 'Router', 'Unicast', 'giaddr', 'Bereich', 'zentraler Server', 'ip helper-address'],
      explanation: 'Wichtig sind drei Punkte: Problem (Broadcasts werden nicht geroutet), Lösung (Weiterleitung als Unicast) und Bereichswahl (giaddr).',
      hints: ['Gehe auf das Problem mit Broadcasts ein.', 'Welches Feld setzt der Relay-Agent?'],
    },
    {
      id: 'm11-q015',
      kind: 'single',
      skill: 'svc.dhcp.relay',
      difficulty: 1,
      prompt: 'Ein Windows-PC hat die Adresse `169.254.37.201`. Was sagt das aus?',
      options: [
        'Der PC hat keinen DHCP-Server erreicht und sich selbst eine APIPA-Adresse gegeben',
        'Der PC hat eine gültige Adresse vom DHCP-Server bekommen',
        'Der PC ist per VPN mit dem Firmennetz verbunden',
        'Der PC hat eine öffentliche Internetadresse',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Ein DHCP-Server vergibt Adressen aus seinem konfigurierten Bereich, nicht aus 169.254.0.0/16.', error: 'apipa-verwechselt' },
        '2': { why: 'VPN-Adressen kommen aus einem konfigurierten Pool, nicht aus dem Link-Local-Bereich.', error: 'apipa-verwechselt' },
        '3': { why: '169.254.0.0/16 ist ein Link-Local-Bereich und wird im Internet nicht geroutet.', error: 'apipa-verwechselt' },
      },
      explanation: '169.254.0.0/16 ist der APIPA- bzw. IPv4-Link-Local-Bereich. Windows nutzt ihn, wenn auf DHCPDISCOVER keine Antwort kommt. Es gibt dann kein Gateway und keinen DNS-Server.',
    },
    {
      id: 'm11-q016',
      kind: 'cidr',
      skill: 'svc.dhcp.relay',
      difficulty: 1,
      prompt: 'Gib den APIPA-Adressbereich in **CIDR-Notation** an (Netzadresse/Präfix).',
      answer: '169.254.0.0/16',
      explanation: 'APIPA/Link-Local: 169.254.0.0/16 (Maske 255.255.0.0). Genutzt werden 169.254.1.0 bis 169.254.254.255.',
    },
    /* ---------- DNS: Auflösung ---------- */
    {
      id: 'm11-q017',
      kind: 'single',
      skill: 'svc.dns.resolve',
      difficulty: 2,
      prompt: 'Der Firmen-DNS-Server fragt einen Root-Server nach `www.elektro-kraemer.de`. Was antwortet der Root-Server?',
      options: [
        'Einen Verweis auf die zuständigen Server der TLD .de',
        'Die IP-Adresse von www.elektro-kraemer.de',
        'Einen Verweis auf den DHCP-Server der Firma',
        'Eine Fehlermeldung, weil Root-Server nur rekursive Anfragen beantworten',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Root-Server kennen keine einzelnen Hosts, nur die Server der Top-Level-Domains.', error: 'dns-hierarchie' },
        '2': { why: 'DNS und DHCP sind getrennte Dienste.', error: 'dns-dhcp-verwechselt' },
        '3': { why: 'Root-Server beantworten gerade iterative Anfragen – mit Verweisen.', error: 'rekursiv-iterativ-verwechselt' },
      },
      explanation: 'Bei iterativen Anfragen liefert jeder Server, was er weiß: Der Root-Server verweist auf die .de-Server, diese auf die autoritativen Server von elektro-kraemer.de.',
    },
    {
      id: 'm11-q018',
      kind: 'order',
      skill: 'svc.dns.resolve',
      difficulty: 2,
      prompt: 'Ein PC löst `www.elektro-kraemer.de` auf; nichts ist gecacht. Bringe die Schritte in die richtige Reihenfolge.',
      items: [
        'PC prüft lokalen DNS-Cache und hosts-Datei',
        'PC sendet rekursive Anfrage an seinen DNS-Resolver',
        'Resolver fragt einen Root-Server und erhält einen Verweis auf die .de-Server',
        'Resolver fragt einen .de-TLD-Server und erhält einen Verweis auf die Nameserver von elektro-kraemer.de',
        'Resolver fragt den autoritativen Server und erhält den A-Record',
        'Resolver speichert die Antwort für die Dauer der TTL und antwortet dem PC',
      ],
      explanation: 'Erst lokal (Cache/hosts), dann rekursiv an den Resolver, der die Hierarchie iterativ von oben nach unten abfragt und das Ergebnis cacht.',
    },
    {
      id: 'm11-q019',
      kind: 'single',
      skill: 'svc.dns.resolve',
      difficulty: 1,
      prompt: 'Welcher DNS-Server liefert eine **autoritative** Antwort für `www.elektro-kraemer.de`?',
      options: [
        'Der Nameserver, der die Zone elektro-kraemer.de verwaltet',
        'Der Root-Server',
        'Der DNS-Resolver des Providers aus seinem Cache',
        'Jeder DNS-Server, der die Antwort kennt',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Der Root-Server ist nur für die Root-Zone autoritativ, nicht für einzelne Domains.', error: 'dns-hierarchie' },
        '2': { why: 'Antworten aus dem Cache sind „nicht autoritativ“.', error: 'cache-autoritativ' },
        '3': { why: 'Wissen allein reicht nicht – autoritativ ist nur der für die Zone zuständige Server.', error: 'cache-autoritativ' },
      },
      explanation: 'Autoritativ ist nur ein Server, der die Zone selbst hält (Primär- oder Sekundärserver der Zone). Antworten aus Caches sind nicht autoritativ.',
    },
    {
      id: 'm11-q020',
      kind: 'number',
      skill: 'svc.dns.resolve',
      difficulty: 1,
      prompt: 'Ein A-Record hat eine **TTL von 3600**. Wie viele **Minuten** darf ein Resolver die Antwort maximal zwischenspeichern?',
      answer: 60,
      unit: 'min',
      explanation: 'Die TTL wird in Sekunden angegeben: 3600 s = 60 min.',
    },
    /* ---------- DNS: Records ---------- */
    {
      id: 'm11-q021',
      kind: 'match',
      skill: 'svc.dns.records',
      difficulty: 2,
      prompt: 'Ordne die DNS-Record-Typen ihrer Bedeutung zu.',
      left: ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'PTR', 'TXT', 'SOA'],
      right: [
        'Alias auf einen anderen Namen',
        'Name → IPv6-Adresse',
        'Zuständige Nameserver der Zone',
        'Verwaltungsdaten der Zone (Seriennummer, Timer)',
        'Name → IPv4-Adresse',
        'Mailserver der Domain mit Priorität',
        'Freitext, z. B. SPF',
        'IP-Adresse → Name (Reverse)',
      ],
      answer: [4, 1, 0, 5, 2, 7, 6, 3],
      explanation: 'A/AAAA: Forward für IPv4/IPv6. CNAME: Alias. MX: Mail. NS: Nameserver. PTR: Reverse. TXT: Text (SPF, Verifizierung). SOA: Start of Authority mit Seriennummer und Timern.',
    },
    {
      id: 'm11-q022',
      kind: 'single',
      skill: 'svc.dns.records',
      difficulty: 1,
      prompt: 'Welcher Record-Typ legt fest, welcher Server E-Mails für `@elektro-kraemer.de` annimmt?',
      options: ['MX', 'A', 'NS', 'SOA'],
      answer: 0,
      distractors: {
        '1': { why: 'Ein A-Record ordnet nur einem Namen eine IPv4-Adresse zu.', error: 'record-verwechselt' },
        '2': { why: 'NS nennt die Nameserver, nicht die Mailserver.', error: 'record-verwechselt' },
        '3': { why: 'SOA enthält Verwaltungsdaten der Zone.', error: 'record-verwechselt' },
      },
      explanation: 'MX = Mail Exchanger. Bei mehreren MX-Records wird der mit der kleinsten Prioritätszahl bevorzugt.',
    },
    {
      id: 'm11-q023',
      kind: 'text',
      skill: 'svc.dns.records',
      difficulty: 2,
      prompt: 'Wie lautet der Name der Reverse-Lookup-Zone für das Netz `192.168.10.0/24`?',
      accept: ['10.168.192.in-addr.arpa', '10.168.192.in-addr.arpa.'],
      placeholder: 'x.y.z.in-addr.arpa',
      explanation: 'Netzanteil 192.168.10 umdrehen → 10.168.192, dann `.in-addr.arpa` anhängen.',
      hints: ['Oktette des Netzanteils in umgekehrter Reihenfolge.'],
    },
    {
      id: 'm11-q024',
      kind: 'single',
      skill: 'svc.dns.records',
      difficulty: 2,
      prompt: 'Zwei MX-Records existieren: `10 mail.elektro-kraemer.de.` und `20 mail2.provider.example.`. Was gilt?',
      options: [
        'Mails gehen zuerst an mail.elektro-kraemer.de; mail2 ist Ausweichserver',
        'Mails gehen zuerst an mail2, weil 20 die höhere Priorität ist',
        'Die Mails werden immer an beide Server gleichzeitig zugestellt',
        'MX-Records dürfen keine Prioritäten haben',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Bei MX gilt: kleinere Zahl = höhere Präferenz.', error: 'mx-prioritaet' },
        '2': { why: 'Eine Mail wird nur einmal zugestellt – an den erreichbaren Server mit der kleinsten Zahl.', error: 'mx-prioritaet' },
        '3': { why: 'Die Präferenzzahl ist fester Bestandteil jedes MX-Records.', error: 'fakt-falsch' },
      },
      explanation: 'Absender-Mailserver versuchen zuerst den MX mit dem kleinsten Präferenzwert. Ist er nicht erreichbar, wird der nächsthöhere Wert versucht.',
    },
    {
      id: 'm11-q025',
      kind: 'text',
      skill: 'svc.dns.records',
      difficulty: 2,
      prompt: 'Unter welchem Pfad liegt die **hosts-Datei** unter Windows?',
      accept: [
        'C:\\Windows\\System32\\drivers\\etc\\hosts',
        '%SystemRoot%\\System32\\drivers\\etc\\hosts',
        '%windir%\\System32\\drivers\\etc\\hosts',
        'C:/Windows/System32/drivers/etc/hosts',
      ],
      placeholder: 'C:\\…',
      explanation: 'Die hosts-Datei liegt unter `C:\\Windows\\System32\\drivers\\etc\\hosts` (ohne Dateiendung). Zum Bearbeiten braucht man Administratorrechte.',
      hints: ['Der Ordner heißt „etc“ – wie unter Linux.'],
    },
    {
      id: 'm11-q045',
      kind: 'single',
      skill: 'svc.dns.records',
      difficulty: 3,
      prompt: 'Nur auf **einem** Laptop wird `www.elektro-kraemer.de` zu `185.12.0.99` aufgelöst, alle anderen Geräte erhalten `203.0.113.10`. `nslookup www.elektro-kraemer.de` auf dem Laptop liefert korrekt `203.0.113.10`. Wo suchst du zuerst?',
      options: [
        'In der hosts-Datei des Laptops',
        'In der Reverse-Lookup-Zone',
        'Im SOA-Record der Zone',
        'In den DHCP-Optionen des Bereichs',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Die Reverse-Zone löst IP → Name auf, nicht Name → IP.', error: 'forward-reverse-verwechselt' },
        '2': { why: 'Ein Fehler in der Zone würde alle Geräte betreffen.', error: 'eingrenzung-fehlt' },
        '3': { why: 'Die DNS-Server-Option ist offenbar korrekt, denn nslookup liefert das richtige Ergebnis.', error: 'eingrenzung-fehlt' },
      },
      explanation: 'nslookup fragt direkt den DNS-Server und ignoriert die hosts-Datei. Andere Programme nutzen den Windows-Resolver, der die hosts-Einträge zuerst berücksichtigt. Weicht also nur ein Gerät ab und nslookup ist korrekt, ist ein (evtl. von Malware gesetzter) hosts-Eintrag der Hauptverdacht.',
      hints: ['nslookup fragt direkt den DNS-Server. Was übergeht es dabei?'],
    },
    {
      id: 'm11-q026',
      kind: 'free',
      skill: 'svc.dns.resolve',
      difficulty: 2,
      prompt: 'Erläutern Sie den Unterschied zwischen einer **rekursiven** und einer **iterativen** DNS-Anfrage und nennen Sie, wer typischerweise welche Art stellt.',
      modelAnswer:
        'Bei einer rekursiven Anfrage erwartet der Fragende eine endgültige Antwort (IP-Adresse oder Fehlermeldung); der befragte Server muss sich selbst um die vollständige Auflösung kümmern. Diese Art stellt typischerweise der Client (Stub-Resolver des Betriebssystems) an seinen konfigurierten DNS-Server/Resolver. Bei einer iterativen Anfrage antwortet der befragte Server nur mit dem, was er selbst weiß: entweder mit der Antwort oder mit einem Verweis (Referral) auf einen Server, der näher an der Antwort ist. Iterative Anfragen stellt der Resolver an Root-Server, TLD-Server und schließlich an den autoritativen Nameserver der Domain. Ergebnisse werden für die Dauer der TTL gecacht.',
      keywords: ['endgültige Antwort', 'Verweis', 'Referral', 'Client', 'Resolver', 'Root', 'TLD', 'autoritativ', 'Cache'],
      explanation: 'Wichtig: Rekursiv = „Erledige alles für mich“, iterativ = „Sag mir, was du weißt oder wen ich fragen soll“. Plus die Rollenverteilung Client → Resolver (rekursiv), Resolver → Hierarchie (iterativ).',
      hints: ['Wer bekommt am Ende die fertige Antwort, wer nur Verweise?'],
    },
    /* ---------- NAT ---------- */
    {
      id: 'm11-q027',
      kind: 'single',
      skill: 'svc.nat',
      difficulty: 1,
      prompt: 'Warum werden private IPv4-Adressen (RFC 1918) im Internet **nicht geroutet**?',
      options: [
        'Weil sie nicht eindeutig sind – jede Organisation darf sie intern verwenden',
        'Weil sie zu lang für Internet-Router sind',
        'Weil sie nur mit IPv6 funktionieren',
        'Weil sie grundsätzlich verschlüsselt sind',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Alle IPv4-Adressen sind 32 Bit lang – private wie öffentliche.', error: 'fakt-falsch' },
        '2': { why: 'Private Adressen sind IPv4-Adressen.', error: 'fakt-falsch' },
        '3': { why: 'Adressen sind nie „verschlüsselt“ – Verschlüsselung betrifft Inhalte.', error: 'begriff-verwechselt' },
      },
      explanation: 'Dieselbe private Adresse existiert in unzähligen Netzen. Ein Internet-Router könnte nicht entscheiden, wohin ein Paket gehört. Darum werden diese Bereiche im Internet gefiltert und am Übergang per NAT ersetzt.',
    },
    {
      id: 'm11-q028',
      kind: 'multi',
      skill: 'svc.nat',
      difficulty: 2,
      prompt: 'Welche Bereiche sind **private Adressbereiche nach RFC 1918**? (Mehrere Antworten)',
      options: ['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16', '172.32.0.0/16', '169.254.0.0/16', '100.64.0.0/10'],
      answer: [0, 1, 2],
      explanation: 'RFC 1918: 10.0.0.0/8, 172.16.0.0/12 (172.16.0.0–172.31.255.255) und 192.168.0.0/16. 172.32.x.x liegt außerhalb und ist öffentlich. 169.254.0.0/16 ist Link-Local (APIPA), 100.64.0.0/10 ist der Shared Address Space für Carrier-Grade-NAT bei Providern – beide sind nicht RFC 1918.',
      hints: ['/12 bei 172.16 reicht bis 172.31.'],
    },
    {
      id: 'm11-q029',
      kind: 'table',
      skill: 'svc.nat',
      difficulty: 3,
      prompt: `Der NAT-Router der Elektro Krämer GmbH (öffentliche IP \`203.0.113.5\`) hat folgende PAT-Übersetzungstabelle:

| Intern (inside local) | Öffentlich (inside global) | Gegenstelle |
|---|---|---|
| 192.168.10.21:50123 | 203.0.113.5:61001 | 198.51.100.80:443 |
| 192.168.10.22:50123 | 203.0.113.5:61002 | 198.51.100.80:443 |
| 192.168.10.35:49800 | 203.0.113.5:61003 | 192.0.2.44:80 |

Trage für jedes Paket ein, auf welche **Adresse:Port** der Router die veränderte Angabe übersetzt (bei ausgehenden Paketen die neue Quelle, bei eingehenden das neue Ziel).`,
      columns: [
        { key: 'dir', label: 'Richtung', type: 'text' },
        { key: 'src', label: 'Quelle (vor NAT)', type: 'text' },
        { key: 'dst', label: 'Ziel (vor NAT)', type: 'text' },
        { key: 'new', label: 'Übersetzt zu (Adresse:Port)', type: 'text' },
      ],
      rows: [
        {
          cells: {
            dir: { given: 'eingehend' },
            src: { given: '198.51.100.80:443' },
            dst: { given: '203.0.113.5:61002' },
            new: { answer: '192.168.10.22:50123' },
          },
        },
        {
          cells: {
            dir: { given: 'eingehend' },
            src: { given: '192.0.2.44:80' },
            dst: { given: '203.0.113.5:61003' },
            new: { answer: '192.168.10.35:49800' },
          },
        },
        {
          cells: {
            dir: { given: 'ausgehend' },
            src: { given: '192.168.10.21:50123' },
            dst: { given: '198.51.100.80:443' },
            new: { answer: '203.0.113.5:61001' },
          },
        },
      ],
      explanation: 'Eingehende Antworten werden anhand des öffentlichen Ports (61002, 61003) dem internen Socket zugeordnet. Ausgehende Pakete einer bestehenden Verbindung bekommen die schon vergebene öffentliche Quelle (61001). Beachte: Zwei PCs nutzen intern denselben Port 50123 – erst die unterschiedlichen öffentlichen Ports machen sie unterscheidbar.',
      hints: ['Suche in der Tabelle die Zeile mit dem passenden öffentlichen Port.'],
    },
    {
      id: 'm11-q030',
      kind: 'single',
      skill: 'svc.nat',
      difficulty: 2,
      prompt: 'Der Webserver `172.16.1.10` in der DMZ soll aus dem Internet unter `203.0.113.5:443` erreichbar sein. Welche Technik setzt du ein?',
      options: [
        'Destination NAT (Portweiterleitung)',
        'Source NAT mit PAT',
        'DHCP-Reservierung',
        'APIPA',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'SNAT/PAT ersetzt die Quelladresse ausgehender Verbindungen – eingehende Verbindungen werden dadurch nicht ermöglicht.', error: 'snat-dnat-verwechselt' },
        '2': { why: 'Eine Reservierung sorgt für eine feste interne IP, macht den Server aber nicht von außen erreichbar.', error: 'begriff-verwechselt' },
        '3': { why: 'APIPA ist eine Notfall-Adressierung ohne DHCP.', error: 'apipa-verwechselt' },
      },
      explanation: 'Für eingehende Verbindungen muss die Zieladresse (öffentliche IP:Port) auf die interne Adresse umgeschrieben werden: DNAT bzw. Portweiterleitung – plus passende Firewall-Freigabe.',
    },
    {
      id: 'm11-q031',
      kind: 'match',
      skill: 'svc.nat',
      difficulty: 2,
      prompt: 'Ordne die NAT-Varianten ihrer Beschreibung zu.',
      left: ['SNAT', 'DNAT / Portweiterleitung', 'PAT (NAT Overload)', '1:1-NAT (statisch)'],
      right: [
        'Ersetzt Quell-IP und Quellport, viele Hosts teilen sich eine öffentliche IP',
        'Ersetzt die Zieladresse eingehender Pakete, um interne Server zu veröffentlichen',
        'Jeder interne Host ist fest genau einer eigenen öffentlichen IP zugeordnet',
        'Ersetzt die Quelladresse ausgehender Pakete',
      ],
      answer: [3, 1, 0, 2],
      explanation: 'SNAT ändert die Quelle, DNAT das Ziel. PAT ist SNAT mit zusätzlicher Portübersetzung (viele zu eins). Statisches 1:1-NAT ordnet je einen internen Host einer eigenen öffentlichen IP zu.',
    },
    {
      id: 'm11-q032',
      kind: 'free',
      skill: 'svc.nat',
      difficulty: 2,
      prompt: 'Die Geschäftsführung fragt, wie 80 Mitarbeiter gleichzeitig mit nur **einer** öffentlichen IP-Adresse im Internet surfen können. Erklären Sie die Funktionsweise von **PAT**.',
      modelAnswer:
        'Bei PAT (Port Address Translation, auch NAT Overload) ersetzt der Router bei ausgehenden Paketen die private Quell-IP-Adresse durch seine öffentliche IP-Adresse und vergibt – falls nötig – einen eigenen Quellport. Jede Verbindung wird in einer Übersetzungstabelle gespeichert (interne IP:Port ↔ öffentliche IP:Port, ggf. mit Ziel). Kommt eine Antwort an die öffentliche IP an, erkennt der Router am Zielport, zu welchem internen Gerät und welcher Verbindung sie gehört, setzt die ursprüngliche private Adresse und den Port wieder ein und leitet das Paket weiter. Da es rund 65.000 Ports gibt, können viele Verbindungen gleichzeitig über eine öffentliche Adresse laufen. Pakete ohne passenden Tabelleneintrag werden verworfen.',
      keywords: ['private Adresse', 'öffentliche IP', 'Port', 'Übersetzungstabelle', 'Antwort', 'zurückübersetzen'],
      explanation: 'Kern: Quell-IP + Port werden ersetzt, die Zuordnung steht in der Tabelle, Antworten werden über den Port zurückübersetzt.',
      hints: ['Woran unterscheidet der Router die Antworten, wenn die IP für alle gleich ist?'],
    },
    {
      id: 'm11-q044',
      kind: 'single',
      skill: 'svc.nat',
      difficulty: 3,
      prompt: 'Ein Kollege meint: „Wir haben ja NAT, also brauchen wir keine Firewall.“ Was antwortest du fachlich korrekt?',
      options: [
        'NAT verwirft zwar unaufgeforderte eingehende Pakete ohne Tabelleneintrag, kontrolliert aber weder ausgehenden Verkehr noch Portweiterleitungen und ersetzt keine Firewall',
        'Stimmt, NAT verschlüsselt alle Verbindungen und ersetzt damit die Firewall',
        'Stimmt, NAT prüft Inhalte bis Schicht 7',
        'NAT und Firewall sind dasselbe, nur unterschiedlich benannt',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'NAT verschlüsselt nichts.', error: 'nat-vpn-verwechselt' },
        '2': { why: 'NAT arbeitet nur mit Adressen und Ports (Schicht 3/4), Inhalte prüft es nicht.', error: 'nat-funktion' },
        '3': { why: 'NAT übersetzt Adressen, eine Firewall setzt Sicherheitsregeln um – zwei verschiedene Funktionen, auch wenn sie oft im selben Gerät stecken.', error: 'nat-funktion' },
      },
      explanation: 'Der „Schutz“ durch PAT ist ein Nebeneffekt. Er hilft nicht gegen Malware, die von innen Verbindungen aufbaut, nicht gegen Angriffe auf weitergeleitete Ports und nicht bei IPv6 ohne NAT. Dafür braucht es Firewall-Regeln.',
    },
    /* ---------- VPN ---------- */
    {
      id: 'm11-q033',
      kind: 'single',
      skill: 'svc.vpn',
      difficulty: 1,
      prompt: 'Die Standorte Hamburg und Berlin sollen dauerhaft über das Internet verbunden werden, ohne dass die Mitarbeiter etwas starten müssen. Welche VPN-Form passt?',
      options: ['Site-to-Site-VPN', 'Remote-Access-VPN', 'Forward-Proxy', 'Portweiterleitung'],
      answer: 0,
      distractors: {
        '1': { why: 'Remote Access verbindet einzelne Geräte, die der Nutzer selbst verbindet.', error: 'vpn-art-verwechselt' },
        '2': { why: 'Ein Proxy verbindet keine Netze und verschlüsselt nicht.', error: 'proxy-vpn-verwechselt' },
        '3': { why: 'Eine Portweiterleitung veröffentlicht einen einzelnen Dienst unverschlüsselt.', error: 'nat-vpn-verwechselt' },
      },
      explanation: 'Zwei VPN-Gateways bauen einen dauerhaften Tunnel zwischen den Netzen auf – für die Nutzer unsichtbar. Das ist Site-to-Site.',
    },
    {
      id: 'm11-q034',
      kind: 'match',
      skill: 'svc.vpn',
      difficulty: 2,
      prompt: 'Ordne die VPN-Technik ihrer typischen Eigenschaft zu.',
      left: ['IPsec', 'SSL/TLS-VPN', 'WireGuard'],
      right: [
        'Schlankes, modernes Protokoll über UDP mit festen Kryptoverfahren',
        'Arbeitet auf Schicht 3, Schlüsselaustausch über IKE (UDP 500/4500)',
        'Nutzt TLS, oft über TCP 443, kommt durch fast jede Firewall',
      ],
      answer: [1, 2, 0],
      explanation: 'IPsec: Schicht 3, IKE + ESP, klassisch für Site-to-Site. SSL/TLS-VPN: TLS wie bei HTTPS, häufig Port 443, beliebt für Remote Access. WireGuard: modern, wenig Code, UDP (Standard 51820).',
    },
    {
      id: 'm11-q035',
      kind: 'multi',
      skill: 'svc.vpn',
      difficulty: 2,
      prompt: 'Welche Schutzziele stellt ein korrekt konfiguriertes VPN für die übertragenen Daten sicher? (Mehrere Antworten)',
      options: ['Vertraulichkeit', 'Integrität', 'Authentizität der Gegenstelle', 'Verfügbarkeit der Internetleitung', 'Virenfreiheit der übertragenen Dateien'],
      answer: [0, 1, 2],
      explanation: 'Verschlüsselung (Vertraulichkeit), Prüfsummen/MACs (Integrität) und gegenseitige Authentifizierung der Endpunkte. Gegen Leitungsausfälle oder Schadsoftware in den Dateien hilft ein VPN nicht.',
    },
    /* ---------- Proxy ---------- */
    {
      id: 'm11-q036',
      kind: 'multi',
      skill: 'svc.proxy',
      difficulty: 2,
      prompt: 'Welche Aufgaben übernimmt typischerweise ein **Forward-Proxy** im Firmennetz? (Mehrere Antworten)',
      options: [
        'Zwischenspeichern (Caching) häufig abgerufener Webinhalte',
        'Filtern bzw. Sperren unerwünschter Webseiten',
        'Protokollieren der Webzugriffe',
        'Verteilen eingehender Kundenanfragen auf mehrere Webserver',
        'IP-Adressen an Clients vergeben',
      ],
      answer: [0, 1, 2],
      explanation: 'Ein Forward-Proxy vertritt die internen Clients: Caching, Inhaltsfilter, Logging/Authentifizierung. Lastverteilung für eingehende Anfragen macht ein Reverse-Proxy, IP-Adressen vergibt DHCP.',
    },
    {
      id: 'm11-q046',
      kind: 'single',
      skill: 'svc.proxy',
      difficulty: 1,
      prompt: 'Wer spricht einen **Reverse-Proxy** typischerweise an?',
      options: [
        'Externe Clients, die einen Dienst der Firma nutzen wollen (z. B. Shop-Kunden)',
        'Interne Mitarbeiter, die im Internet surfen',
        'Der DHCP-Server bei der Adressvergabe',
        'Ausschließlich andere Proxys',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Das beschreibt den Forward-Proxy.', error: 'proxy-richtung' },
        '2': { why: 'DHCP hat mit Proxys nichts zu tun.', error: 'begriff-verwechselt' },
        '3': { why: 'Reverse-Proxys werden von normalen Clients angesprochen.', error: 'fakt-falsch' },
      },
      explanation: 'Der Reverse-Proxy steht vor den Servern und nimmt deren Anfragen von außen entgegen. Die Clients merken nicht, welcher interne Server tatsächlich antwortet.',
    },
    /* ---------- Firewall ---------- */
    {
      id: 'm11-q037',
      kind: 'single',
      skill: 'svc.firewall',
      difficulty: 2,
      prompt: 'Was zeichnet eine **Stateful-Inspection-Firewall** gegenüber einem einfachen Paketfilter aus?',
      options: [
        'Sie merkt sich aufgebaute Verbindungen und lässt passende Antwortpakete automatisch zu',
        'Sie prüft ausschließlich MAC-Adressen',
        'Sie verschlüsselt alle Verbindungen',
        'Sie benötigt keine Regeln mehr',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Firewalls arbeiten mit IP-Adressen, Ports und Zuständen, nicht nur mit MAC-Adressen.', error: 'firewall-funktion' },
        '2': { why: 'Verschlüsselung ist Aufgabe von VPN oder TLS.', error: 'firewall-vpn-verwechselt' },
        '3': { why: 'Auch eine Stateful Firewall braucht ein Regelwerk; sie vereinfacht nur die Rückregeln.', error: 'firewall-funktion' },
      },
      explanation: 'Die Zustandstabelle (Connection Tracking) macht separate Rückregeln überflüssig und verhindert, dass Pakete durchkommen, die nur so tun, als wären sie Antworten.',
    },
    {
      id: 'm11-q038',
      kind: 'single',
      skill: 'svc.firewall',
      difficulty: 2,
      prompt: `Regelwerk einer Firewall (Prüfung von oben nach unten, erste passende Regel gilt):

| Nr. | Quelle | Ziel | Port | Aktion |
|---|---|---|---|---|
| 1 | 192.168.10.0/24 | any | TCP 443 | erlauben |
| 2 | 192.168.10.66 | any | any | verweigern |
| 3 | any | any | any | verweigern |

Der PC \`192.168.10.66\` baut eine HTTPS-Verbindung (TCP 443) ins Internet auf. Was passiert?`,
      options: [
        'Die Verbindung wird erlaubt, weil Regel 1 zuerst passt',
        'Die Verbindung wird verweigert, weil Regel 2 spezieller ist',
        'Die Verbindung wird verweigert, weil Regel 3 immer gilt',
        'Die Firewall fragt den Administrator',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Firewalls werten in der Regel nicht nach „Spezifität“ aus, sondern nach Reihenfolge. Regel 1 trifft bereits zu.', error: 'first-match' },
        '2': { why: 'Die Default-deny-Regel greift nur, wenn vorher keine Regel gepasst hat.', error: 'first-match' },
        '3': { why: 'Firewalls entscheiden automatisch anhand der Regeln.', error: 'fakt-falsch' },
      },
      explanation: 'First Match: 192.168.10.66 liegt in 192.168.10.0/24, Port 443 passt → Regel 1 erlaubt. Soll der PC gesperrt werden, muss die spezielle Regel 2 **vor** Regel 1 stehen. Merke: spezielle Regeln nach oben!',
      hints: ['Die erste passende Regel entscheidet.'],
    },
    {
      id: 'm11-q043',
      kind: 'free',
      skill: 'svc.firewall',
      difficulty: 2,
      prompt: 'Die Elektro Krämer GmbH möchte ihren Webshop selbst betreiben. Erläutern Sie, warum der Webserver in einer **DMZ** und nicht im internen LAN platziert werden sollte, und nennen Sie die grundlegenden Firewall-Regeln.',
      modelAnswer:
        'Ein aus dem Internet erreichbarer Server ist besonders angreifbar. Steht er in einer DMZ – einem eigenen, durch die Firewall abgetrennten Netzsegment –, gelangt ein Angreifer bei einer erfolgreichen Kompromittierung nur in die DMZ und nicht ins interne LAN, weil die Firewall Verbindungen von der DMZ ins LAN verbietet. Grundregeln: Internet → DMZ nur die benötigten Dienste (z. B. TCP 443 zum Webserver, per DNAT/Portweiterleitung), Internet → LAN verboten, DMZ → LAN verboten (höchstens eng begrenzte Ausnahmen), LAN → DMZ nur für Administration/Pflege, LAN → Internet nach Bedarf. Am Ende steht eine Default-deny-Regel; die Firewall arbeitet stateful.',
      keywords: ['eigenes Segment', 'Angreifer', 'kompromittiert', 'Internet → DMZ', 'DMZ → LAN verboten', '443', 'Default deny'],
      explanation: 'Kerngedanke: Schadensbegrenzung durch Segmentierung. Dazu gehören die Verkehrsrichtungen und das Prinzip „nur das Nötigste erlauben“.',
    },
    /* ---------- Troubleshooting ---------- */
    {
      id: 'm11-q039',
      kind: 'single',
      skill: 'svc.troubleshoot',
      difficulty: 2,
      prompt: 'Montagmorgen: Im **Gäste-WLAN** bekommen die ersten 20 Besucher eine Adresse, alle weiteren Geräte erhalten `169.254.x.x`. Was ist die wahrscheinlichste Ursache?',
      options: [
        'Der DHCP-Bereich des Gäste-WLANs ist erschöpft (zu klein und/oder zu lange Leases)',
        'Der DNS-Server ist ausgefallen',
        'Das Standardgateway ist falsch eingetragen',
        'Die WLAN-Verschlüsselung ist zu schwach',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Ein DNS-Ausfall verhindert keine Adressvergabe.', error: 'dns-dhcp-verwechselt' },
        '2': { why: 'Ein falsches Gateway führt nicht zu APIPA-Adressen – die Adressvergabe würde trotzdem klappen.', error: 'gateway-dhcp-verwechselt' },
        '3': { why: 'Die Verschlüsselung beeinflusst nicht, ob DHCP Adressen frei hat.', error: 'begriff-verwechselt' },
      },
      explanation: 'Die ersten Geräte bekommen Adressen, danach keine mehr – typisches Zeichen eines vollen Bereichs. Lösung: Bereich vergrößern (z. B. /23) und/oder Lease-Dauer verkürzen.',
      hints: ['Warum funktionieren die ersten 20 Geräte?'],
    },
    {
      id: 'm11-q040',
      kind: 'single',
      skill: 'svc.troubleshoot',
      difficulty: 1,
      prompt: '`ping 8.8.8.8` ist erfolgreich, `ping www.elektro-kraemer.de` meldet „Host nicht gefunden“. Wo liegt das Problem?',
      options: ['Bei der DNS-Namensauflösung', 'Beim Standardgateway', 'Beim DHCP-Server', 'Am Netzwerkkabel'],
      answer: 0,
      distractors: {
        '1': { why: 'Das Gateway funktioniert, sonst wäre 8.8.8.8 nicht erreichbar.', error: 'dns-gateway-verwechselt' },
        '2': { why: 'Der PC hat offensichtlich eine funktionierende IP-Konfiguration.', error: 'eingrenzung-fehlt' },
        '3': { why: 'Mit defektem Kabel wäre auch 8.8.8.8 nicht erreichbar.', error: 'eingrenzung-fehlt' },
      },
      explanation: 'IP-Verbindungen ins Internet funktionieren, nur Namen werden nicht aufgelöst → DNS-Server-Eintrag oder DNS-Server prüfen (z. B. mit nslookup).',
    },
    {
      id: 'm11-q041',
      kind: 'single',
      skill: 'svc.troubleshoot',
      difficulty: 3,
      prompt: `Ein Berliner PC zeigt:

\`\`\`
   IPv4-Adresse  . . . . . . . . . . : 192.168.20.44
   Subnetzmaske  . . . . . . . . . . : 255.255.255.0
   Standardgateway . . . . . . . . . : 192.168.20.1
   DNS-Server  . . . . . . . . . . . : 192.168.10.5
\`\`\`

Lokale Ziele und Internetadressen per IP funktionieren. Namen werden **nicht** aufgelöst. Ein Kollege in Hamburg kann Namen problemlos auflösen. Was ist die wahrscheinlichste Ursache?`,
      options: [
        'Der DNS-Server in Hamburg ist von Berlin aus nicht erreichbar, z. B. weil der VPN-Tunnel oder eine Firewall-Regel für DNS (Port 53) fehlt',
        'Das Gateway 192.168.20.1 liegt im falschen Netz',
        'Der PC hat eine APIPA-Adresse',
        'Der DNS-Server darf nur in Hamburg mit Namen arbeiten, das ist so vorgesehen',
      ],
      answer: 0,
      distractors: {
        '1': { why: '192.168.20.1 liegt im Netz 192.168.20.0/24 – passt.', error: 'gateway-falsch-eingeschaetzt' },
        '2': { why: 'Die Adresse ist eine reguläre DHCP-/statische Adresse, keine 169.254.x.x.', error: 'apipa-verwechselt' },
        '3': { why: 'Ein DNS-Server bedient alle Clients, die ihn erreichen dürfen.', error: 'fakt-falsch' },
      },
      explanation: 'Der DNS-Server liegt in einem anderen Standort. Funktioniert er in Hamburg, ist er selbst in Ordnung – also scheitert der Weg von Berlin dorthin (VPN-Tunnel, Routing oder Firewall blockiert UDP/TCP 53). Test: `ping 192.168.10.5` und `nslookup www.elektro-kraemer.de 192.168.10.5`.',
      hints: ['Wo steht der DNS-Server?', 'Funktioniert der DNS-Server grundsätzlich?'],
    },
    {
      id: 'm11-q042',
      kind: 'free',
      skill: 'svc.troubleshoot',
      difficulty: 2,
      prompt: 'Ein Mitarbeiter meldet: „Ich komme nicht ins Internet.“ `ipconfig` zeigt eine Adresse `169.254.12.34`. Beschreiben Sie die Bedeutung dieser Adresse, mögliche Ursachen und Ihr weiteres Vorgehen.',
      modelAnswer:
        'Die Adresse stammt aus dem APIPA-/Link-Local-Bereich 169.254.0.0/16. Windows vergibt sie sich selbst, wenn auf DHCPDISCOVER kein DHCP-Server antwortet. Es gibt kein Gateway und keinen DNS-Server, daher ist kein Internetzugriff möglich. Mögliche Ursachen: Kabel/Netzwerkdose/Switchport defekt oder deaktiviert, Port im falschen VLAN, DHCP-Server oder -Dienst ausgefallen, DHCP-Bereich erschöpft, fehlender oder falsch konfigurierter DHCP-Relay, Firewall blockiert UDP 67/68. Vorgehen: Eingrenzen, ob nur dieser PC, ein VLAN oder alle betroffen sind; Link-Status und Switchport/VLAN prüfen; DHCP-Server (Dienst, freie Adressen im Bereich, Relay) prüfen; anschließend mit ipconfig /release und ipconfig /renew eine neue Adresse anfordern und mit ping (Gateway, externe IP, Name) die Verbindung testen.',
      keywords: ['APIPA', '169.254', 'kein DHCP-Server', 'kein Gateway', 'VLAN', 'Bereich erschöpft', 'Relay', 'ipconfig /renew', 'eingrenzen'],
      explanation: 'Eine gute Antwort erklärt die Adresse, nennt mehrere plausible Ursachen und beschreibt ein strukturiertes Vorgehen mit Kontrolle am Ende.',
    },
  ],
};
