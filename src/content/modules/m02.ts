import type { Module } from '../types';

/**
 * Modul 2 – OSI- und TCP/IP-Modell
 * Fiktives Praxisunternehmen: Elektro Krämer GmbH
 */
export const m02: Module = {
  id: 'm02',
  nr: 2,
  title: 'OSI- und TCP/IP-Modell',
  short: `Die sieben OSI-Schichten, PDUs, Kapselung und das TCP/IP-Modell – und was beim Aufruf einer Webseite wirklich passiert.`,
  icon: 'Layers',
  relevance: 'ap1',
  prerequisites: ['m01'],
  skills: [
    { id: 'osi.layers', module: 'm02', title: 'OSI-Schichten benennen und ordnen' },
    { id: 'osi.tasks', module: 'm02', title: 'Aufgaben der OSI-Schichten erklären', requires: ['osi.layers'] },
    { id: 'osi.devices', module: 'm02', title: 'Netzwerkgeräte OSI-Schichten zuordnen', requires: ['osi.tasks', 'basics.devices'] },
    { id: 'osi.protocols', module: 'm02', title: 'Protokolle und Ports den Schichten zuordnen', requires: ['osi.tasks'] },
    { id: 'osi.pdu', module: 'm02', title: 'PDUs der Schichten kennen (Bits, Frames, Pakete, Segmente)', requires: ['osi.layers'] },
    { id: 'osi.encapsulation', module: 'm02', title: 'Kapselung und Entkapselung erklären', requires: ['osi.pdu'] },
    { id: 'osi.addressing', module: 'm02', title: 'Adressierung je Schicht (MAC, IP, Port)', requires: ['osi.encapsulation'] },
    { id: 'tcpip.model', module: 'm02', title: 'TCP/IP-Modell und Vergleich mit OSI', requires: ['osi.layers'] },
    { id: 'osi.webrequest', module: 'm02', title: 'Ablauf eines Webseitenaufrufs über alle Schichten', requires: ['osi.encapsulation', 'osi.addressing', 'osi.protocols'] },
  ],
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'm02-l01',
      title: 'Warum Schichtenmodelle? – Die 7 OSI-Schichten im Überblick',
      minutes: 20,
      relevance: 'ap1',
      skills: ['osi.layers'],
      simple: `Das **OSI-Modell** zerlegt die Kommunikation in 7 Schichten – wie der Versand eines Pakets: Einer schreibt den Brief, einer verpackt, einer adressiert, einer fährt aus.
Jede Schicht hat genau eine Aufgabe und arbeitet nur mit der Schicht direkt darüber und darunter zusammen.
Schicht 1 überträgt die Bits über das Kabel, Schicht 7 ist die Schnittstelle zu den Netzwerkdiensten (z. B. HTTP für Webseiten).
Bei einer Störung kannst du so Schicht für Schicht von unten nach oben suchen.
Eselsbrücke von 7 nach 1: „Alle Deutschen Studenten Trinken Verschiedene Sorten Bier“.

**Merke:** 7 Schichten, unten Bitübertragung, oben Anwendung – jede Schicht hat ihre feste Aufgabe.`,
      steps: [
        {
          type: 'explain',
          title: 'Das Problem: Kommunikation ist kompliziert',
          body: `Wenn ein Vertriebsmitarbeiter der **Elektro Krämer GmbH** im Browser den Webshop eines Lieferanten öffnet, passiert unglaublich viel: Der Name muss in eine IP-Adresse übersetzt werden, eine Verbindung wird aufgebaut, Daten werden zerlegt, adressiert, über Kupfer, Glasfaser und Funk geschickt, unterwegs von Routern weitergeleitet und beim Empfänger wieder zusammengesetzt.

Würde man das als **ein einziges großes Programm** bauen, wäre es unwartbar: Jede neue Kabelart oder jede neue Anwendung würde alles betreffen. Die Lösung heißt **Schichtenmodell**:

- Die Gesamtaufgabe wird in **übereinanderliegende Schichten** zerlegt.
- Jede Schicht erledigt **eine klar abgegrenzte Teilaufgabe**.
- Jede Schicht **nutzt die Dienste der darunterliegenden** und **bietet der darüberliegenden** Schicht Dienste an.
- Jede Schicht kommuniziert **logisch mit derselben Schicht beim Gegenüber** (über ihr Protokoll), physisch aber nur über die Schichten darunter.

### Vorteile eines Schichtenmodells

| Vorteil | Bedeutung |
|---|---|
| **Austauschbarkeit** | WLAN statt Kabel? Nur Schicht 1/2 ändert sich – der Browser merkt nichts. |
| **Herstellerunabhängigkeit** | Geräte verschiedener Hersteller arbeiten zusammen, weil die Schnittstellen genormt sind. |
| **Reduzierte Komplexität** | Entwickler müssen nur „ihre“ Schicht verstehen. |
| **Strukturierte Fehlersuche** | Man prüft Schicht für Schicht: Kabel? Link? IP? Port? Anwendung? |
| **Gemeinsame Sprache** | „Das ist ein Layer-2-Problem“ versteht jeder Netzwerker. |

### Das OSI-Referenzmodell

Das **OSI-Modell** (Open Systems Interconnection) wurde von der **ISO** als **Referenzmodell** veröffentlicht. „Referenz“ heißt: Es ist ein **Denk- und Beschreibungsmodell**. Im Internet wird praktisch die TCP/IP-Protokollfamilie eingesetzt – aber zum Beschreiben, Lernen und Fehlersuchen verwendet jeder die OSI-Schichten.

| Nr. | Deutsch | Englisch | Kernfrage |
|---|---|---|---|
| 7 | **Anwendungsschicht** | Application | Welcher Dienst wird genutzt? (Web, Mail, DNS …) |
| 6 | **Darstellungsschicht** | Presentation | In welchem Format/welcher Kodierung? Verschlüsselt? Komprimiert? |
| 5 | **Sitzungsschicht** (Kommunikationssteuerung) | Session | Wie wird eine Sitzung auf-, abgebaut und gesteuert? |
| 4 | **Transportschicht** | Transport | Wie kommen Daten zuverlässig zur richtigen **Anwendung** (Port)? |
| 3 | **Vermittlungsschicht** (Netzwerkschicht) | Network | Welcher **Weg** durch die Netze? Logische Adresse (IP) |
| 2 | **Sicherungsschicht** | Data Link | Wie gelangt ein Frame zum **nächsten** Gerät? Physische Adresse (MAC), Fehlererkennung |
| 1 | **Bitübertragungsschicht** | Physical | Wie werden **Bits** als Signale übertragen? Kabel, Stecker, Pegel |

Die Schichten **1–4** heißen **transportorientiert** (sie sorgen dafür, dass die Daten ankommen), die Schichten **5–7** **anwendungsorientiert** (sie kümmern sich um die Bedeutung der Daten).

### Eselsbrücken

- **Von oben (7) nach unten (1), deutsch:** „**A**lle **D**eutschen **S**tudenten **T**rinken **V**erschiedene **S**orten **B**ier“ → Anwendung, Darstellung, Sitzung, Transport, Vermittlung, Sicherung, Bitübertragung.
- **Von unten (1) nach oben (7), englisch:** „**P**lease **D**o **N**ot **T**hrow **S**alami **P**izza **A**way“ → Physical, Data Link, Network, Transport, Session, Presentation, Application.

Präge dir zusätzlich die Zahlen zu den wichtigsten Schichten ein: **Schicht 2 = MAC/Switch, Schicht 3 = IP/Router, Schicht 4 = Port/TCP/UDP.** Diese drei kommen in fast jeder Prüfung vor.`,
        },
        {
          type: 'visual',
          title: 'Das OSI-Modell',
          widget: { kind: 'layers', data: { mode: 'osi', showPdu: false, showProtocols: false } },
          caption: `Lies das Modell von unten nach oben: Schicht 1 überträgt Bits, Schicht 7 ist die Schnittstelle zur Anwendung. Daten des Senders laufen von oben nach unten, beim Empfänger von unten nach oben.`,
        },
        {
          type: 'example',
          title: 'Fehlersuche Schicht für Schicht',
          problem: `Eine Mitarbeiterin in der Buchhaltung meldet: „Das Internet geht nicht.“ Wie gehst du strukturiert mithilfe des OSI-Modells vor (Bottom-up)?`,
          steps: [
            { label: 'Schicht 1', body: `Ist das Patchkabel eingesteckt? Leuchtet die **Link-LED** an Netzwerkkarte und Switchport?` },
            { label: 'Schicht 2', body: `Sieht der Switch die MAC-Adresse des PCs am richtigen Port? Richtiges VLAN?` },
            { label: 'Schicht 3', body: `Hat der PC eine gültige IP-Adresse (\`ipconfig\`)? Ist das Standardgateway per \`ping\` erreichbar? Ist eine externe IP-Adresse erreichbar?` },
            { label: 'Schicht 4', body: `Blockiert eine Firewall den Ziel-Port (z. B. 443)?` },
            { label: 'Schicht 7', body: `Funktioniert die Namensauflösung (\`nslookup\`)? Ist im Browser ein falscher Proxy eingetragen?` },
          ],
          result: `Mit dem Schichtenmodell grenzt du den Fehler systematisch ein, statt wahllos Dinge auszuprobieren.`,
        },
        {
          type: 'check',
          question: {
            id: 'm02-l01-c1',
            kind: 'order',
            skill: 'osi.layers',
            difficulty: 1,
            prompt: `Bringe die OSI-Schichten in die richtige Reihenfolge – **beginnend mit Schicht 1**.`,
            items: [
              'Bitübertragungsschicht',
              'Sicherungsschicht',
              'Vermittlungsschicht',
              'Transportschicht',
              'Sitzungsschicht',
              'Darstellungsschicht',
              'Anwendungsschicht',
            ],
            hints: ['Eselsbrücke rückwärts: Alle Deutschen Studenten Trinken Verschiedene Sorten Bier.'],
            explanation: `1 Bitübertragung – 2 Sicherung – 3 Vermittlung – 4 Transport – 5 Sitzung – 6 Darstellung – 7 Anwendung.`,
          },
        },
        {
          type: 'check',
          question: {
            id: 'm02-l01-c2',
            kind: 'single',
            skill: 'osi.layers',
            difficulty: 1,
            prompt: `Welche Schichten gelten als **transportorientiert**?`,
            options: ['Schichten 1–4', 'Schichten 5–7', 'Schichten 1–2', 'Nur Schicht 4'],
            answer: 0,
            distractors: {
              '1': { why: '5–7 sind die anwendungsorientierten Schichten.', error: 'osi-gruppen' },
              '2': { why: 'Auch Schicht 3 und 4 sorgen für den Transport (Wegwahl, Ende-zu-Ende).', error: 'osi-gruppen' },
              '3': { why: 'Die Transportschicht gehört dazu, ist aber nicht allein transportorientiert.', error: 'osi-gruppen' },
            },
            explanation: `Schichten **1–4** sorgen dafür, dass Daten vom Sender zum Empfänger kommen (transportorientiert). Schichten **5–7** behandeln Sitzung, Format und Anwendung (anwendungsorientiert).`,
          },
        },
        {
          type: 'summary',
          points: [
            'Schichtenmodelle zerlegen Kommunikation in klar abgegrenzte Teilaufgaben.',
            'Jede Schicht nutzt die Dienste der unteren und bietet der oberen Dienste an.',
            'OSI = ISO-Referenzmodell mit 7 Schichten: Bitübertragung, Sicherung, Vermittlung, Transport, Sitzung, Darstellung, Anwendung.',
            '1–4 transportorientiert, 5–7 anwendungsorientiert.',
            'Eselsbrücke: Alle Deutschen Studenten Trinken Verschiedene Sorten Bier (7 → 1).',
            'Merke: Schicht 2 = MAC/Switch, 3 = IP/Router, 4 = Port/TCP/UDP.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm02-l02',
      title: 'Die unteren Schichten 1–3: Bits, Frames und Pakete',
      minutes: 25,
      relevance: 'ap1',
      skills: ['osi.tasks', 'osi.devices'],
      simple: `Die unteren drei Schichten bringen die Daten ans Ziel – wie Straße, Klingelschild und Postleitzahl.
**Schicht 1** (Bitübertragung) schickt Nullen und Einsen als Strom, Licht oder Funk – das ist die Straße.
**Schicht 2** (Sicherung) packt die Bits in Frames (Datenrahmen) mit MAC-Adressen und stellt im lokalen Netz zu – wie der Name am Klingelschild.
**Schicht 3** (Vermittlung) bildet Pakete mit IP-Adressen und findet über Router den Weg in andere Netze – wie Postleitzahl und Ort.
Geräte: Hub = Schicht 1, Switch = Schicht 2, Router = Schicht 3.

**Merke:** Schicht 2 = MAC, Switch, Frame; Schicht 3 = IP, Router, Paket.`,
      steps: [
        {
          type: 'explain',
          title: 'Schicht 1 – Bitübertragungsschicht (Physical Layer)',
          body: `Schicht 1 kennt **keine Adressen und keine Bedeutung** – nur **Bits** (0 und 1), die als physikalische Signale übertragen werden:

- elektrische Spannungspegel im Kupferkabel,
- Lichtimpulse in der Glasfaser,
- Funkwellen beim WLAN.

Hier werden festgelegt: **Kabeltypen, Stecker (RJ45, LC), Pinbelegung, Spannungen, Frequenzen, Leitungscodierung, Übertragungsrate** und ob im Halb- oder Vollduplex gearbeitet wird.

**Geräte/Komponenten:** Kabel, Stecker, Patchpanel, Netzwerkdose, **Repeater**, **Hub**, **Medienkonverter**, **Modem**, Transceiver.
**Standards (Beispiele):** 1000BASE-T, 10GBASE-SR, die physikalischen Teile von IEEE 802.11.

### Schicht 2 – Sicherungsschicht (Data Link Layer)

Schicht 2 sorgt dafür, dass Daten **zum nächsten direkt verbundenen Gerät** (im selben Netzsegment) gelangen – **fehlerfrei erkannt**. Ihre Aufgaben:

1. **Rahmenbildung (Framing):** Bits werden zu **Frames (Rahmen)** mit Anfang und Ende zusammengefasst.
2. **Physische Adressierung:** jeder Netzwerkadapter hat eine **MAC-Adresse** (48 Bit, z. B. \`00:1A:2B:3C:4D:5E\`). Die ersten 24 Bit (OUI) kennzeichnen den Hersteller.
3. **Fehlererkennung:** Der Sender berechnet eine Prüfsumme (**CRC**) und hängt sie als **FCS** (Frame Check Sequence) im **Trailer** an. Der Empfänger rechnet nach – stimmt sie nicht, wird der Frame **verworfen** (Ethernet korrigiert nicht und fordert nicht neu an; das erledigen ggf. höhere Schichten wie TCP).
4. **Medienzugriffssteuerung:** Wer darf wann senden? (CSMA/CD bei Halbduplex-Ethernet, CSMA/CA bei WLAN).

Schicht 2 wird in der IEEE-Welt in zwei Teilschichten zerlegt: **LLC** (Logical Link Control, oben) und **MAC** (Media Access Control, unten).

**Geräte:** **Switch**, **Bridge**, **Access Point**, Netzwerkkarte (NIC, arbeitet auf Schicht 1 und 2).
**Protokolle/Standards:** **Ethernet (IEEE 802.3)**, **WLAN (IEEE 802.11)**, PPP, VLAN-Tagging (IEEE 802.1Q).

### Schicht 3 – Vermittlungsschicht (Network Layer)

Schicht 3 bringt Daten **über Netzgrenzen hinweg** vom Quell- zum Zielhost – durch beliebig viele Router.

1. **Logische Adressierung:** **IP-Adressen** (IPv4, IPv6) – unabhängig von der Hardware, hierarchisch in Netz- und Hostanteil gegliedert.
2. **Wegwahl (Routing):** Router entscheiden anhand der Ziel-IP und ihrer Routingtabelle, wohin ein Paket als Nächstes geht.
3. **Fragmentierung** (bei IPv4 möglich), **TTL** (Time to Live) gegen endlos kreisende Pakete.

**Geräte:** **Router**, **Layer-3-Switch**.
**Protokolle:** **IPv4, IPv6, ICMP** (z. B. \`ping\`), Routingprotokolle wie OSPF.

### Der entscheidende Unterschied zwischen Schicht 2 und 3

| | Schicht 2 (MAC) | Schicht 3 (IP) |
|---|---|---|
| Reichweite | nur bis zum **nächsten Gerät** im selben Netz („Hop“) | **Ende-zu-Ende** über alle Netze |
| Adresse | fest in der Hardware (Herstellerkennung) | logisch, vom Admin/DHCP vergeben |
| Struktur | flach, keine Netzinformation | hierarchisch (Netz + Host) |
| Gerät | Switch | Router |

**Vergleich mit der Post:** Die IP-Adresse ist die **Anschrift des Empfängers** auf dem Paket – sie bleibt während der ganzen Reise gleich. Die MAC-Adresse ist wie der Auftrag „bring das zum nächsten Verteilzentrum“ – sie ändert sich an jeder Station.

### Der Hinweis zu ARP

**ARP** (Address Resolution Protocol) ermittelt zu einer bekannten IP-Adresse die MAC-Adresse im lokalen Netz. Es verbindet Schicht 2 und 3 und wird deshalb in Tabellen mal Schicht 2, mal Schicht 3 (oft „2/3“ bzw. „2,5“) zugeordnet. Wichtig ist, dass du seine Funktion erklären kannst.`,
        },
        {
          type: 'visual',
          title: 'Die unteren Schichten mit PDUs und Protokollen',
          widget: { kind: 'layers', data: { mode: 'osi', highlight: [1, 2, 3], showPdu: true, showProtocols: true } },
          caption: `Schicht 1 überträgt Bits, Schicht 2 bildet Frames mit MAC-Adressen, Schicht 3 bildet Pakete mit IP-Adressen.`,
        },
        {
          type: 'visual',
          title: 'Geräte und ihre Schicht',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Schicht 1', icon: 'Cable', text: 'Kabel, Stecker, Patchpanel, Repeater, Hub, Medienkonverter, Modem' },
                { title: 'Schicht 2', icon: 'Network', text: 'Switch, Bridge, Access Point, Netzwerkkarte (1+2)' },
                { title: 'Schicht 3', icon: 'Router', text: 'Router, Layer-3-Switch' },
              ],
            },
          },
          caption: `Ein Gerät einer höheren Schicht beherrscht immer auch die darunterliegenden Schichten – ein Router hat natürlich auch Schicht-1- und Schicht-2-Schnittstellen.`,
        },
        {
          type: 'example',
          title: 'Welche Schicht ist betroffen?',
          problem: `Ordne die folgenden Störungen bei Elektro Krämer der wahrscheinlich betroffenen OSI-Schicht zu:
1. Ein Bagger hat die Glasfaser zum Lager durchtrennt.
2. Der Switch verwirft ständig Frames mit fehlerhafter Prüfsumme (FCS-Fehler).
3. Im Router fehlt die Route ins Netz des Lagers.`,
          steps: [
            { label: '1. Glasfaser durchtrennt', body: `Es kommen gar keine Signale mehr an → **Schicht 1**.` },
            { label: '2. FCS-Fehler', body: `Die Fehlererkennung per CRC/FCS ist Aufgabe der **Schicht 2**. (Ursache ist oft ein schlechtes Kabel – also indirekt Schicht 1, festgestellt wird der Fehler aber auf Schicht 2.)` },
            { label: '3. Route fehlt', body: `Wegwahl/Routing ist **Schicht 3**.` },
          ],
          result: `1 → Schicht 1, 2 → Schicht 2, 3 → Schicht 3.`,
        },
        {
          type: 'check',
          question: {
            id: 'm02-l02-c1',
            kind: 'single',
            skill: 'osi.tasks',
            difficulty: 2,
            prompt: `Welche Aufgabe gehört zur **Sicherungsschicht (Schicht 2)**?`,
            options: [
              'Fehlererkennung über eine Prüfsumme (FCS) im Frame',
              'Wegwahl zwischen verschiedenen Netzen',
              'Adressierung von Anwendungen über Ports',
              'Verschlüsselung und Kompression von Daten',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'Wegwahl (Routing) ist Aufgabe von Schicht 3.', error: 'osi-aufgaben-verwechslung' },
              '2': { why: 'Ports gehören zur Transportschicht (Schicht 4).', error: 'osi-aufgaben-verwechslung' },
              '3': { why: 'Format, Verschlüsselung und Kompression ordnet das OSI-Modell Schicht 6 zu.', error: 'osi-aufgaben-verwechslung' },
            },
            explanation: `Schicht 2 bildet Frames, adressiert per MAC, steuert den Medienzugriff und erkennt Übertragungsfehler mithilfe der **FCS** (CRC-Prüfsumme) im Trailer.`,
          },
        },
        {
          type: 'check',
          question: {
            id: 'm02-l02-c2',
            kind: 'match',
            skill: 'osi.devices',
            difficulty: 1,
            prompt: `Ordne jedes Gerät der OSI-Schicht zu, auf der es hauptsächlich arbeitet.`,
            left: ['Hub', 'Switch', 'Router', 'Medienkonverter'],
            right: ['Schicht 1', 'Schicht 2', 'Schicht 3'],
            answer: [0, 1, 2, 0],
            explanation: `Hub und Medienkonverter: Schicht 1 (nur Signale). Switch: Schicht 2 (MAC). Router: Schicht 3 (IP).`,
          },
        },
        {
          type: 'summary',
          points: [
            'Schicht 1: Bits als Signale – Kabel, Stecker, Pegel; Hub, Repeater, Medienkonverter.',
            'Schicht 2: Frames, MAC-Adressen, FCS-Fehlererkennung, Medienzugriff; Switch, Bridge, AP.',
            'Schicht 3: Pakete, IP-Adressen, Routing, TTL; Router.',
            'MAC = bis zum nächsten Gerät (Hop), IP = Ende-zu-Ende.',
            'ARP verbindet Schicht 2 und 3 (IP → MAC).',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm02-l03',
      title: 'Die oberen Schichten 4–7: Ports, Sitzungen, Formate, Anwendungen',
      minutes: 25,
      relevance: 'ap1',
      skills: ['osi.tasks', 'osi.protocols', 'osi.devices'],
      simple: `Die oberen Schichten sorgen dafür, dass die Daten beim richtigen Programm ankommen.
**Schicht 4** (Transport) arbeitet mit Portnummern – wie die Zimmernummer im Hotel: Die IP-Adresse findet das Haus, der Port das Zimmer (z. B. 443 für HTTPS).
**TCP** (verbindungsorientiert) ist wie ein Einschreiben mit Empfangsbestätigung, **UDP** (verbindungslos) wie eine Postkarte: schnell, aber ohne Rückmeldung.
Schicht 5 und 6 regeln Sitzung und Datenformat (z. B. Zeichensatz, Verschlüsselung).
**Schicht 7** stellt die Dienste bereit, etwa HTTP, DNS oder DHCP.

**Merke:** Schicht 4 = Ports, TCP zuverlässig, UDP schnell; Schicht 7 = Anwendungsprotokolle wie HTTP, DNS, DHCP.`,
      steps: [
        {
          type: 'explain',
          title: 'Schicht 4 – Transportschicht',
          body: `Schicht 3 bringt ein Paket zum richtigen **Rechner**. Auf diesem Rechner laufen aber viele Programme gleichzeitig – Browser, Mailprogramm, Teams. Schicht 4 sorgt dafür, dass die Daten bei der **richtigen Anwendung** ankommen – mit **Portnummern** (0–65535).

- **Zielport**: kennzeichnet den Dienst auf dem Server (z. B. 443 für HTTPS).
- **Quellport**: wird vom Client meist zufällig aus dem dynamischen Bereich gewählt (z. B. 51234), damit die Antwort beim richtigen Browser-Tab ankommt.

**IP-Adresse + Port = Socket** (z. B. \`203.0.113.80:443\`) – damit ist eine Anwendung eindeutig im Netz adressiert.

Die zwei wichtigsten Protokolle:

| | **TCP** (Transmission Control Protocol) | **UDP** (User Datagram Protocol) |
|---|---|---|
| Verbindung | **verbindungsorientiert** (Aufbau per **3-Wege-Handshake**: SYN, SYN-ACK, ACK) | **verbindungslos** |
| Zuverlässigkeit | Bestätigungen (ACK), Sequenznummern, Neuübertragung verlorener Segmente, richtige Reihenfolge | keine Garantie, keine Bestätigung |
| Flusskontrolle | ja (Fenstermechanismus) | nein |
| Overhead | höher (Header mind. 20 Byte) | gering (Header 8 Byte) |
| PDU | **Segment** | **Datagramm** |
| Einsatz | Web (HTTP/HTTPS), E-Mail, Dateiübertragung, SSH | DNS-Anfragen, DHCP, VoIP, Video-Streaming/Live, Online-Spiele |

**Warum nutzt VoIP UDP?** Ein verlorenes Sprachpaket neu zu senden, wäre sinnlos – es käme zu spät. Lieber kurz knacken als verzögern.

Die **Segmentierung** großer Datenmengen in passende Stücke ist ebenfalls Aufgabe von Schicht 4 (bei TCP).

### Schicht 5 – Sitzungsschicht (Kommunikationssteuerung)

Steuert den **Dialog** zwischen zwei Anwendungen: Aufbau, Aufrechterhaltung und Abbau von **Sitzungen**, Synchronisationspunkte (z. B. damit ein abgebrochener Transfer an einer Stelle fortgesetzt werden kann). Typische Beispiele aus Lehrbüchern: **RPC**, **NetBIOS**. In der TCP/IP-Praxis übernehmen meist die Anwendungen selbst diese Aufgaben.

### Schicht 6 – Darstellungsschicht

Sorgt dafür, dass Daten **in einem für beide Seiten verständlichen Format** vorliegen:
- **Zeichenkodierung** (ASCII, UTF-8),
- **Datenformate** (JPEG, PNG, MPEG, MP3),
- **Kompression**,
- **Verschlüsselung**. **TLS** wird in Lehrbüchern und Prüfungen meist hier (teils Schicht 5) eingeordnet – technisch liegt es zwischen TCP und der Anwendung.

### Schicht 7 – Anwendungsschicht

Die Schnittstelle zu den **Netzwerkdiensten**, die Anwendungen nutzen. **Achtung:** Gemeint ist nicht das Programm „Browser“ selbst, sondern das **Protokoll**, das er spricht (HTTP).

| Protokoll | Zweck | Transport | Port(s) |
|---|---|---|---|
| **HTTP** / **HTTPS** | Webseiten (HTTPS = HTTP über TLS) | TCP | 80 / 443 |
| **DNS** | Namensauflösung | UDP (und TCP) | 53 |
| **DHCP** | automatische IP-Konfiguration | UDP | 67 (Server) / 68 (Client) |
| **SMTP** | E-Mail versenden | TCP | 25 (587 Submission) |
| **POP3** / **IMAP** | E-Mail abrufen | TCP | 110 / 143 (verschlüsselt 995 / 993) |
| **FTP** | Dateiübertragung | TCP | 20 (Daten) / 21 (Steuerung) |
| **SSH** | verschlüsselte Fernwartung | TCP | 22 |
| **Telnet** | unverschlüsselte Fernwartung (veraltet) | TCP | 23 |
| **RDP** | Remotedesktop (Windows) | TCP (auch UDP) | 3389 |
| **SNMP** | Netzwerkmanagement | UDP | 161 (Traps 162) |
| **NTP** | Zeitsynchronisation | UDP | 123 |

> **Hinweis – DHCP und DNS gehören zur Anwendungsschicht:** Manche Lehrbücher ordnen DHCP oder DNS der **Schicht 3** zu, weil beide „mit IP-Adressen zu tun haben“. Entscheidend für die Einordnung ist aber, **wie** ein Protokoll arbeitet: DHCP und DNS sind **Dienste**, deren Nachrichten in **UDP** (Schicht 4) verpackt werden (DHCP: Ports 67/68, DNS: Port 53). Was über einem Transportprotokoll mit Ports läuft, liegt **darüber** – also in Schicht 7 (TCP/IP-Modell: Anwendungsschicht). Das ist auch die übliche Prüfungslösung. Steht in einer Aufgabe ausdrücklich eine andere Zuordnung, begründe deine Antwort kurz mit diesem Argument.

**Geräte bis Schicht 7:** **Proxy-Server**, **Application-Level-Gateway**, **Next-Generation-Firewall**, Load Balancer (je nach Typ Schicht 4 oder 7). Eine einfache **Paketfilter-Firewall** arbeitet auf **Schicht 3/4** (IP-Adressen und Ports).`,
        },
        {
          type: 'visual',
          title: 'Die oberen Schichten mit Protokollen',
          widget: { kind: 'layers', data: { mode: 'osi', highlight: [4, 5, 6, 7], showPdu: true, showProtocols: true } },
          caption: `Schicht 4 adressiert mit Ports die Anwendung, Schichten 5–7 kümmern sich um Sitzung, Format und den eigentlichen Dienst.`,
        },
        {
          type: 'visual',
          title: 'TCP-Verbindungsaufbau: 3-Wege-Handshake',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['Client 192.168.10.23', 'Webserver 203.0.113.80'],
              messages: [
                { from: 0, to: 1, label: 'SYN (Port 51234 → 443)', note: 'Ich möchte eine Verbindung' },
                { from: 1, to: 0, label: 'SYN-ACK', note: 'Einverstanden, ich auch' },
                { from: 0, to: 1, label: 'ACK', note: 'Verbindung steht' },
                { from: 0, to: 1, label: 'Daten (z. B. TLS + HTTP-Request)' },
                { from: 1, to: 0, label: 'ACK + Daten' },
              ],
            },
          },
          caption: `Erst nach dem 3-Wege-Handshake fließen Nutzdaten. Jedes Segment wird bestätigt – geht eines verloren, wird es erneut gesendet.`,
        },
        {
          type: 'example',
          title: 'Firewall-Regel für den Mailserver',
          problem: `Der Mailserver von Elektro Krämer soll E-Mails von anderen Mailservern aus dem Internet empfangen. Welche Angaben braucht die Firewall-Regel (Protokoll, Port), und auf welchen Schichten arbeitet dieser Paketfilter?`,
          steps: [
            { label: 'Dienst bestimmen', body: `Mailserver untereinander nutzen **SMTP** (Schicht 7).` },
            { label: 'Transport und Port', body: `SMTP läuft über **TCP**, Zielport **25**.` },
            { label: 'Regel', body: `Erlaube: Quelle beliebig → Ziel IP des Mailservers (bzw. Mail-Relay in der DMZ), TCP, Zielport 25.` },
            { label: 'Schichten', body: `Der Paketfilter prüft IP-Adressen (**Schicht 3**) und Protokoll/Port (**Schicht 4**). Den Inhalt der Mail (Schicht 7) sieht er nicht.` },
          ],
          result: `TCP/25 zum Mail-Relay freigeben – ein Paketfilter arbeitet auf Schicht 3 und 4.`,
        },
        {
          type: 'check',
          question: {
            id: 'm02-l03-c1',
            kind: 'single',
            skill: 'osi.protocols',
            difficulty: 2,
            prompt: `Warum verwendet **Internettelefonie (VoIP)** für die Sprachdaten typischerweise **UDP** statt TCP?`,
            options: [
              'Neu übertragene Pakete kämen zu spät – geringe Verzögerung ist wichtiger als Vollständigkeit.',
              'UDP ist sicherer, weil es verschlüsselt.',
              'TCP kann keine Audiodaten übertragen.',
              'UDP garantiert die richtige Reihenfolge der Pakete.',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'UDP verschlüsselt nicht – dafür gibt es z. B. SRTP oder TLS.', error: 'tcp-udp-merkmale' },
              '2': { why: 'TCP kann beliebige Daten übertragen; es ist nur für Echtzeit ungünstig.', error: 'tcp-udp-merkmale' },
              '3': { why: 'Das garantiert gerade TCP, nicht UDP.', error: 'tcp-udp-merkmale' },
            },
            explanation: `Bei Echtzeitanwendungen zählt **geringe Latenz**. TCP würde auf verlorene Segmente warten und sie neu senden – das erzeugt Verzögerung. Ein kurzes Knacken durch ein verlorenes UDP-Paket ist weniger störend.`,
          },
        },
        {
          type: 'check',
          question: {
            id: 'm02-l03-c2',
            kind: 'match',
            skill: 'osi.protocols',
            difficulty: 2,
            prompt: `Ordne dem Protokoll seinen Standard-Port zu.`,
            left: ['HTTPS', 'DNS', 'SSH', 'SMTP'],
            right: ['443', '53', '22', '25'],
            answer: [0, 1, 2, 3],
            explanation: `HTTPS 443, DNS 53, SSH 22, SMTP 25. Diese Ports solltest du für die Prüfung sicher kennen (dazu HTTP 80, DHCP 67/68, FTP 20/21, RDP 3389).`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: Protokolle und Ports',
          questionIds: ['m02-q012', 'm02-q013', 'm02-q014', 'm02-q015', 'm02-q016', 'm02-q017', 'm02-q018', 'm02-q041'],
          count: 5,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Schicht 4 adressiert Anwendungen über Ports; IP + Port = Socket.',
            'TCP: verbindungsorientiert, zuverlässig (Handshake, ACK, Sequenznummern) – PDU Segment.',
            'UDP: verbindungslos, schnell, wenig Overhead – PDU Datagramm (DNS, DHCP, VoIP).',
            'Schicht 5: Sitzungssteuerung; Schicht 6: Format, Kodierung, Kompression, Verschlüsselung.',
            'Schicht 7: Protokolle wie HTTP(S), DNS, DHCP, SMTP, IMAP, SSH, FTP.',
            'Paketfilter: Schicht 3/4; Proxy/Application Gateway: bis Schicht 7.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm02-l04',
      title: 'PDUs, Kapselung und Adressierung je Schicht',
      minutes: 25,
      relevance: 'ap1',
      skills: ['osi.pdu', 'osi.encapsulation', 'osi.addressing'],
      simple: `Beim Senden steckt jede Schicht die Daten in einen neuen Umschlag – wie bei russischen Puppen (Matroschkas). Das heißt **Kapselung**.
Die Transportschicht macht daraus ein **Segment** (mit Ports), die Vermittlungsschicht ein **Paket** (mit IP-Adressen), die Sicherungsschicht einen **Frame** (mit MAC-Adressen), Schicht 1 schickt **Bits**.
Diese Dateneinheiten heißen **PDUs** (Protocol Data Units).
Beim Empfänger werden die Umschläge in umgekehrter Reihenfolge wieder geöffnet (Entkapselung).
Die IP-Adressen bleiben auf dem Weg gleich (solange kein NAT übersetzt), die MAC-Adressen wechseln an jedem Router.

**Merke:** Segment (4) → Paket (3) → Frame (2) → Bits (1); IP bleibt, MAC wechselt je Abschnitt.`,
      steps: [
        {
          type: 'explain',
          title: 'Datenpakete wie russische Puppen',
          body: `Jede Schicht fügt den Daten von oben ihre eigenen **Steuerinformationen** hinzu – meist vorne als **Header**, bei Schicht 2 zusätzlich hinten als **Trailer**. Das nennt man **Kapselung (Encapsulation)**. Beim Empfänger entfernt jede Schicht „ihren“ Header wieder und gibt den Rest nach oben: **Entkapselung (Decapsulation)**.

Die Dateneinheit einer Schicht heißt **PDU (Protocol Data Unit)**:

| Schicht | PDU | Was wird hinzugefügt? | Wichtigste Adresse |
|---|---|---|---|
| 7–5 | **Daten** (Nachricht) | Anwendungsdaten, z. B. HTTP-Request | (z. B. URL, Hostname) |
| 4 | **Segment** (TCP) / **Datagramm** (UDP) | TCP/UDP-Header | **Portnummern** (Quell-/Zielport) |
| 3 | **Paket** | IP-Header | **IP-Adressen** (Quell-/Ziel-IP), TTL |
| 2 | **Frame / Rahmen** | Ethernet-Header **und Trailer (FCS)** | **MAC-Adressen** (Ziel-/Quell-MAC) |
| 1 | **Bits** | Präambel/Signal | – |

**Merksatz für die PDUs von oben nach unten:** „**D**aten **S**ind **P**rima **F**ür **B**its“ → Daten, Segment, Paket, Frame, Bits.

### Ein Ethernet-Frame genauer betrachtet

| Feld | Größe | Bedeutung |
|---|---|---|
| Präambel + SFD | 8 Byte | Taktsynchronisation (gehört technisch zu Schicht 1) |
| **Ziel-MAC** | 6 Byte | Empfänger im lokalen Netz |
| **Quell-MAC** | 6 Byte | Absender |
| **EtherType** | 2 Byte | Welches Protokoll steckt drin? (0x0800 = IPv4, 0x86DD = IPv6, 0x0806 = ARP) |
| **Nutzdaten (Payload)** | 46–1500 Byte | das IP-Paket; max. 1500 Byte = **MTU** |
| **FCS** | 4 Byte | CRC-Prüfsumme (Trailer) |

Der Ethernet-Header ist also **14 Byte** groß, dazu 4 Byte FCS. Ein Frame (ohne Präambel) ist **64 bis 1518 Byte** groß (ohne VLAN-Tag).

### Wie viele Nutzdaten passen in einen Frame?

Ein IPv4-Header ist ohne Optionen **20 Byte** groß, ein TCP-Header ohne Optionen ebenfalls **20 Byte**. Bei einer MTU von 1500 Byte bleiben für die eigentlichen Anwendungsdaten:
1500 − 20 − 20 = **1460 Byte** (die sogenannte **MSS**, Maximum Segment Size).

### Welche Adresse ändert sich unterwegs?

Das ist der wichtigste Gedanke dieser Lektion:

- **MAC-Adressen** gelten nur **im lokalen Netzsegment**. Jeder Router **entkapselt** den Frame bis Schicht 3, schaut sich die Ziel-IP an und baut für den nächsten Abschnitt einen **neuen Frame** mit neuen MAC-Adressen (Quelle = eigene Ausgangsschnittstelle, Ziel = nächster Router bzw. Zielhost).
- **IP-Adressen** bleiben **von Ende zu Ende gleich** (Ausnahme: NAT am Internet-Router/Firewall ändert die private Quell-IP in eine öffentliche).
- **Ports** bleiben ebenfalls gleich (Ausnahme: NAT mit Port-Übersetzung/PAT).
- Der Router verringert die **TTL** im IP-Header um 1 und berechnet deshalb die Header-Prüfsumme neu.

Ein **Switch** dagegen verändert den Frame nicht – er liest nur die Ziel-MAC und leitet weiter.`,
        },
        {
          type: 'visual',
          title: 'Kapselung und Entkapselung (Animation)',
          widget: { kind: 'encapsulation' },
          caption: `Beim Sender wandern die Daten von Schicht 7 nach unten, jede Schicht ergänzt ihren Header (Schicht 2 auch einen Trailer). Beim Empfänger wird in umgekehrter Reihenfolge entpackt.`,
        },
        {
          type: 'visual',
          title: 'Kapselung Schritt für Schritt',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['Anwendung (7–5)', 'Transport (4)', 'Vermittlung (3)', 'Sicherung (2)', 'Bitübertragung (1)'],
              messages: [
                { from: 0, to: 1, label: 'Daten: „GET /katalog“', note: 'HTTP-Request' },
                { from: 1, to: 2, label: 'Segment = TCP-Header + Daten', note: 'Quellport 51234, Zielport 443' },
                { from: 2, to: 3, label: 'Paket = IP-Header + Segment', note: 'Quell-IP 192.168.10.23, Ziel-IP 203.0.113.80' },
                { from: 3, to: 4, label: 'Frame = Eth-Header + Paket + FCS', note: 'Ziel-MAC = Gateway, Quell-MAC = PC' },
                { from: 4, to: 4, label: 'Bits auf dem Kabel', note: '0101 1100 …' },
              ],
            },
          },
          caption: `Jede Schicht „verpackt“ die PDU der darüberliegenden Schicht als ihre Nutzdaten (Payload).`,
        },
        {
          type: 'example',
          title: 'Adressen auf dem Weg ins Internet',
          problem: `PC-23 (IP 192.168.10.23, MAC AA:AA:AA:00:00:23) ruft einen Webserver (203.0.113.80) auf. Das Standardgateway ist die Firewall (192.168.10.1, MAC LAN-Seite BB:BB:BB:00:00:01). Welche Adressen stehen im Frame **zwischen PC und Firewall**? Was ändert sich **hinter** der Firewall?`,
          steps: [
            { label: 'Schicht 4', body: `Quellport z. B. 51234, Zielport **443** (HTTPS).` },
            { label: 'Schicht 3', body: `Quell-IP **192.168.10.23**, Ziel-IP **203.0.113.80** – das endgültige Ziel, nicht das Gateway!` },
            { label: 'Schicht 2', body: `Das Ziel liegt in einem fremden Netz → der PC schickt den Frame an sein Gateway: Ziel-MAC **BB:BB:BB:00:00:01** (per ARP ermittelt), Quell-MAC **AA:AA:AA:00:00:23**.` },
            { label: 'Hinter der Firewall', body: `Die Firewall baut einen **neuen Frame** mit ihrer WAN-MAC als Quelle und der MAC des Provider-Routers als Ziel. Wegen **NAT** ersetzt sie außerdem die private Quell-IP durch ihre öffentliche IP. Die Ziel-IP 203.0.113.80 und der Zielport 443 bleiben gleich.` },
          ],
          result: `Ziel-IP = Webserver (bleibt), Ziel-MAC = Gateway (ändert sich an jedem Router).`,
        },
        {
          type: 'check',
          question: {
            id: 'm02-l04-c1',
            kind: 'match',
            skill: 'osi.pdu',
            difficulty: 1,
            prompt: `Ordne jeder Schicht ihre PDU zu.`,
            left: ['Schicht 1', 'Schicht 2', 'Schicht 3', 'Schicht 4 (TCP)'],
            right: ['Bits', 'Frame', 'Paket', 'Segment'],
            answer: [0, 1, 2, 3],
            explanation: `Bits – Frame (Rahmen) – Paket – Segment (bei UDP: Datagramm). Darüber spricht man von Daten.`,
          },
        },
        {
          type: 'check',
          question: {
            id: 'm02-l04-c2',
            kind: 'single',
            skill: 'osi.addressing',
            difficulty: 2,
            prompt: `Ein Paket durchläuft auf dem Weg zum Ziel **drei Router**. Welche Adressen bleiben (ohne NAT) unverändert?`,
            options: [
              'Quell- und Ziel-IP-Adresse',
              'Quell- und Ziel-MAC-Adresse',
              'Nur die Ziel-MAC-Adresse',
              'Alle Adressen ändern sich an jedem Router',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'MAC-Adressen gelten nur im lokalen Segment; jeder Router erzeugt einen neuen Frame.', error: 'mac-ip-reichweite' },
              '2': { why: 'Die Ziel-MAC ist immer das nächste Gerät – sie ändert sich an jedem Hop.', error: 'mac-ip-reichweite' },
              '3': { why: 'IP-Adressen sind Ende-zu-Ende-Adressen und bleiben ohne NAT gleich.', error: 'mac-ip-reichweite' },
            },
            explanation: `IP-Adressen adressieren **Ende-zu-Ende**, MAC-Adressen nur den **nächsten Hop**. Jeder Router entkapselt bis Schicht 3 und baut einen neuen Frame mit neuen MAC-Adressen.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: PDUs und Kapselung',
          questionIds: ['m02-q019', 'm02-q020', 'm02-q021', 'm02-q022', 'm02-q023', 'm02-q024', 'm02-q025', 'm02-q027'],
          count: 5,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'PDUs: Daten → Segment/Datagramm (4) → Paket (3) → Frame (2) → Bits (1).',
            'Kapselung: jede Schicht fügt einen Header hinzu, Schicht 2 zusätzlich den Trailer (FCS).',
            'Entkapselung beim Empfänger in umgekehrter Reihenfolge.',
            'Adressen: Schicht 2 MAC, Schicht 3 IP, Schicht 4 Port.',
            'MAC ändert sich an jedem Router, IP und Port bleiben (außer bei NAT/PAT).',
            'Ethernet: Header 14 Byte + FCS 4 Byte, MTU 1500 Byte; MSS bei IPv4/TCP = 1460 Byte.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm02-l05',
      title: 'Das TCP/IP-Modell und der Vergleich mit OSI',
      minutes: 15,
      relevance: 'ap1',
      skills: ['tcpip.model', 'osi.protocols'],
      simple: `Das OSI-Modell ist das Lehrbuch, das **TCP/IP-Modell** die Praxis – so arbeitet das Internet wirklich.
Es fasst die 7 OSI-Schichten zu 4 Schichten zusammen, wie eine Kurzfassung eines langen Buchs.
**Netzzugang** = OSI 1 + 2, **Internet** = OSI 3, **Transport** = OSI 4, **Anwendung** = OSI 5 bis 7.
Die Protokolle bleiben dieselben: IP in der Internetschicht, TCP und UDP in der Transportschicht, HTTP oder DNS in der Anwendungsschicht.

**Merke:** TCP/IP hat 4 Schichten: Netzzugang, Internet, Transport, Anwendung.`,
      steps: [
        {
          type: 'explain',
          title: 'Das Modell, nach dem das Internet tatsächlich arbeitet',
          body: `Das **TCP/IP-Modell** (auch **DoD-Modell** oder Internetmodell, entstanden im Umfeld des US-Verteidigungsministeriums und des ARPANET) ist **älter als OSI** und beschreibt die Protokollfamilie, die im Internet und in jedem Firmennetz tatsächlich verwendet wird. Es hat **4 Schichten**:

| TCP/IP-Schicht | entspricht OSI | Typische Protokolle |
|---|---|---|
| **4 Anwendungsschicht** (Application) | 5, 6, 7 | HTTP(S), DNS, DHCP, SMTP, IMAP, FTP, SSH |
| **3 Transportschicht** (Transport / Host-to-Host) | 4 | TCP, UDP |
| **2 Internetschicht** (Internet) | 3 | IPv4, IPv6, ICMP |
| **1 Netzzugangsschicht** (Network Access / Link) | 1, 2 | Ethernet, WLAN (802.11), PPP |

### Unterschiede auf einen Blick

| | OSI | TCP/IP |
|---|---|---|
| Schichten | 7 | 4 |
| Charakter | **Referenzmodell** (theoretisch, protokollunabhängig) | **praxisorientiert**, aus realen Protokollen entstanden |
| Obere Schichten | getrennt in Sitzung, Darstellung, Anwendung | eine gemeinsame Anwendungsschicht |
| Untere Schichten | Bitübertragung und Sicherung getrennt | gemeinsame Netzzugangsschicht |
| Nutzung | Beschreibung, Lehre, Fehlersuche | tatsächliche Implementierung im Internet |

**Hinweis:** Manche Lehrbücher verwenden ein **hybrides 5-Schichten-Modell** (Netzzugang wird in Bitübertragung und Sicherung aufgeteilt). Wenn in einer Aufgabe nicht anders angegeben, meint „TCP/IP-Modell“ das 4-Schichten-Modell.

### Wie sagt man das in der Praxis?

Netzwerker sprechen trotz TCP/IP fast immer in **OSI-Nummern**: „Layer-3-Switch“, „Layer-7-Firewall“, „Das ist ein Layer-1-Problem“. Deshalb musst du **beide** Modelle beherrschen und ineinander übersetzen können.`,
        },
        {
          type: 'visual',
          title: 'OSI und TCP/IP im Vergleich',
          widget: { kind: 'layers', data: { mode: 'compare', showProtocols: true } },
          caption: `Die drei oberen OSI-Schichten bilden zusammen die TCP/IP-Anwendungsschicht, die beiden unteren die Netzzugangsschicht.`,
        },
        {
          type: 'example',
          title: 'Protokolle in beiden Modellen einordnen',
          problem: `Ordne für deinen Spickzettel die Protokolle **DHCP, UDP, ICMP und Ethernet** jeweils einer OSI-Schicht und einer TCP/IP-Schicht zu.`,
          steps: [
            { label: 'DHCP', body: `Dienst zur automatischen IP-Konfiguration → OSI **7**, TCP/IP **Anwendung**. (Es nutzt UDP – das macht es nicht zu einem Schicht-4-Protokoll!)` },
            { label: 'UDP', body: `Transportprotokoll mit Ports → OSI **4**, TCP/IP **Transport**.` },
            { label: 'ICMP', body: `Fehler- und Diagnosemeldungen von IP (z. B. ping) → OSI **3**, TCP/IP **Internet**.` },
            { label: 'Ethernet', body: `Frames, MAC-Adressen, Kabelstandards → OSI **1 und 2**, TCP/IP **Netzzugang**.` },
          ],
          result: `DHCP 7/Anwendung – UDP 4/Transport – ICMP 3/Internet – Ethernet 1+2/Netzzugang.`,
        },
        {
          type: 'check',
          question: {
            id: 'm02-l05-c1',
            kind: 'single',
            skill: 'tcpip.model',
            difficulty: 1,
            prompt: `Welche OSI-Schichten fasst die **Netzzugangsschicht** des TCP/IP-Modells zusammen?`,
            options: ['1 und 2', '2 und 3', '5, 6 und 7', 'nur 1'],
            answer: 0,
            distractors: {
              '1': { why: 'Schicht 3 entspricht der Internetschicht.', error: 'tcpip-zuordnung' },
              '2': { why: '5–7 entsprechen der Anwendungsschicht.', error: 'tcpip-zuordnung' },
              '3': { why: 'Die Netzzugangsschicht umfasst auch die Sicherungsschicht (MAC, Frames).', error: 'tcpip-zuordnung' },
            },
            explanation: `Netzzugang (Link) = OSI 1 (Bitübertragung) + OSI 2 (Sicherung). Hier liegen z. B. Ethernet und WLAN.`,
          },
        },
        {
          type: 'check',
          question: {
            id: 'm02-l05-c2',
            kind: 'match',
            skill: 'tcpip.model',
            difficulty: 2,
            prompt: `Ordne die Protokolle der passenden **TCP/IP-Schicht** zu.`,
            left: ['IPv6', 'TCP', 'IMAP', 'WLAN 802.11'],
            right: ['Internet', 'Transport', 'Anwendung', 'Netzzugang'],
            answer: [0, 1, 2, 3],
            explanation: `IPv6 → Internet, TCP → Transport, IMAP → Anwendung, WLAN → Netzzugang.`,
          },
        },
        {
          type: 'summary',
          points: [
            'TCP/IP-Modell: 4 Schichten – Anwendung, Transport, Internet, Netzzugang.',
            'Anwendung = OSI 5–7, Transport = OSI 4, Internet = OSI 3, Netzzugang = OSI 1–2.',
            'OSI ist Referenzmodell, TCP/IP ist die tatsächlich eingesetzte Protokollfamilie.',
            'Ein Protokoll gehört zu der Schicht, deren Aufgabe es erfüllt – nicht zu der, die es nutzt (DHCP nutzt UDP, ist aber Schicht 7).',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm02-l06',
      title: 'Praxis: Was passiert beim Aufruf einer Webseite?',
      minutes: 25,
      relevance: 'ap1',
      skills: ['osi.webrequest', 'osi.addressing', 'osi.encapsulation'],
      simple: `Ein Webseitenaufruf läuft in festen Schritten ab – wie ein Restaurantbesuch: Adresse suchen, hinfahren, Platz bekommen, bestellen.
Zuerst übersetzt **DNS** (Domain Name System, das „Telefonbuch“ des Internets) den Namen in eine IP-Adresse.
Dann klärt der PC per **ARP** (Address Resolution Protocol), welche Hardware-Adresse sein Gateway hat – den Router, der ihn nach draußen bringt.
Danach baut **TCP** die Verbindung auf (Drei-Wege-Handshake), **TLS** verschlüsselt sie, und erst dann fragt **HTTP** nach der Seite.
Bleibt die Seite leer, prüfst du genau diese Schritte der Reihe nach.

**Merke:** Reihenfolge: DNS → ARP (Gateway) → TCP-Handshake → TLS → HTTP-Anfrage.`,
      steps: [
        {
          type: 'explain',
          title: 'Von der Eingabe bis zur fertigen Seite',
          body: `Jetzt setzen wir alles zusammen. Ausgangslage bei Elektro Krämer:

| Gerät | IP | Rolle |
|---|---|---|
| PC-23 (Vertrieb) | 192.168.10.23/24 | Client |
| Firewall/Router | 192.168.10.1 (LAN) | Standardgateway, NAT |
| DC01 | 192.168.10.5 | interner DNS-Server |
| Webserver Lieferant | 203.0.113.80 | \`shop.lieferant.example\` |

Die Mitarbeiterin tippt \`https://shop.lieferant.example\` in den Browser.

### 1. Namensauflösung (DNS)
Der Browser kennt nur einen Namen, Pakete brauchen aber eine IP-Adresse. Der PC prüft seinen DNS-Cache; ist dort nichts, fragt er den konfigurierten DNS-Server **192.168.10.5** (UDP, Zielport 53). Dieser liefert – ggf. nach Rückfrage bei anderen DNS-Servern im Internet – die Antwort: **203.0.113.80**.

### 2. Lokal oder entfernt? – Entscheidung mit Subnetzmaske
Der PC vergleicht mit seiner Subnetzmaske: 203.0.113.80 liegt **nicht** im eigenen Netz 192.168.10.0/24 → das Paket muss zum **Standardgateway** 192.168.10.1.

### 3. ARP – die MAC-Adresse des Gateways
Für den Frame braucht der PC die **MAC-Adresse des Gateways**. Steht sie nicht im ARP-Cache, fragt er per **ARP-Broadcast**: „Wer hat 192.168.10.1?“ Die Firewall antwortet per Unicast mit ihrer MAC.

### 4. TCP-Verbindungsaufbau
Der Browser baut eine TCP-Verbindung zu 203.0.113.80, Zielport **443**, auf: **SYN → SYN-ACK → ACK**.

### 5. TLS-Handshake
Für HTTPS handeln Client und Server die Verschlüsselung aus; der Server weist sich mit seinem **Zertifikat** aus.

### 6. HTTP-Request und Kapselung
Der Browser sendet \`GET /\`. Diese Daten werden gekapselt:
- **Schicht 4:** TCP-Header, Quellport z. B. 51234, Zielport 443
- **Schicht 3:** IP-Header, Quelle 192.168.10.23, Ziel 203.0.113.80
- **Schicht 2:** Ethernet-Header, Quelle MAC PC-23, **Ziel MAC Gateway**, Trailer FCS
- **Schicht 1:** Bits über das Patchkabel zum Switch

### 7. Weg durchs Netz
- Der **Access-Switch** liest die Ziel-MAC und leitet an den Port Richtung Firewall weiter (Schicht 2).
- Die **Firewall** prüft die Regel (darf PC-23 auf TCP/443 ins Internet?), entkapselt bis Schicht 3, führt **NAT** durch (Quell-IP wird die öffentliche IP), baut einen **neuen Frame** für die WAN-Seite.
- Die **Router der Provider** leiten anhand der Ziel-IP Hop für Hop weiter – an jedem Hop neuer Frame, TTL − 1.

### 8. Beim Webserver: Entkapselung
Schicht 1 empfängt Bits → Schicht 2 prüft FCS und Ziel-MAC → Schicht 3 prüft Ziel-IP → Schicht 4 übergibt anhand von **Port 443** an den Webserver-Prozess → TLS entschlüsselt → HTTP verarbeitet \`GET /\`.

### 9. Antwort
Der Server sendet **HTTP 200 OK** mit der HTML-Seite zurück – jetzt mit vertauschten Adressen (Quellport 443, Zielport 51234). Die Firewall übersetzt per NAT zurück auf 192.168.10.23. Der Browser lädt anschließend weitere Elemente (Bilder, CSS) und stellt die Seite dar.`,
        },
        {
          type: 'visual',
          title: 'Ablauf als Sequenz',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['PC-23', 'DNS (DC01)', 'Firewall/Gateway', 'Webserver'],
              messages: [
                { from: 0, to: 1, label: 'DNS-Query: shop.lieferant.example? (UDP 53)' },
                { from: 1, to: 0, label: 'DNS-Antwort: 203.0.113.80' },
                { from: 0, to: 2, label: 'ARP-Request (Broadcast): Wer hat 192.168.10.1?' },
                { from: 2, to: 0, label: 'ARP-Reply: MAC des Gateways' },
                { from: 0, to: 3, label: 'TCP SYN → 443', note: 'über Firewall (NAT)' },
                { from: 3, to: 0, label: 'SYN-ACK' },
                { from: 0, to: 3, label: 'ACK' },
                { from: 0, to: 3, label: 'TLS-Handshake', note: 'Zertifikat des Servers' },
                { from: 0, to: 3, label: 'HTTP GET / (verschlüsselt)' },
                { from: 3, to: 0, label: 'HTTP 200 OK + HTML' },
              ],
            },
          },
          caption: `DNS und ARP laufen nur, wenn die Antwort nicht schon im Cache steht. Erst danach beginnt die eigentliche TCP-Verbindung.`,
        },
        {
          type: 'visual',
          title: 'Der Weg des Pakets',
          widget: {
            kind: 'topology',
            data: {
              zones: [
                { label: 'LAN 192.168.10.0/24', x: 10, y: 20, w: 450, h: 390, color: 'blue' },
                { label: 'Internet', x: 480, y: 20, w: 310, h: 390, color: 'gray' },
              ],
              nodes: [
                { id: 'pc', type: 'pc', label: 'PC-23', sub: '.23', x: 80, y: 300 },
                { id: 'dns', type: 'server', label: 'DC01 (DNS)', sub: '.5', x: 80, y: 110 },
                { id: 'sw', type: 'switch', label: 'Switch', sub: 'L2', x: 230, y: 210 },
                { id: 'fw', type: 'firewall', label: 'Firewall', sub: '.1 / NAT', x: 390, y: 210 },
                { id: 'isp', type: 'router', label: 'Provider', sub: 'L3', x: 560, y: 210 },
                { id: 'web', type: 'server', label: 'Webserver', sub: '203.0.113.80', x: 720, y: 210 },
              ],
              links: [
                { from: 'pc', to: 'sw' },
                { from: 'dns', to: 'sw' },
                { from: 'sw', to: 'fw' },
                { from: 'fw', to: 'isp', style: 'wan' },
                { from: 'isp', to: 'web', style: 'wan' },
              ],
            },
          },
          caption: `Der Switch arbeitet auf Schicht 2 (MAC), Firewall und Provider-Router auf Schicht 3 (und die Firewall zusätzlich auf 4 bis ggf. 7). Ziel-IP bleibt 203.0.113.80, die Ziel-MAC wechselt an jedem Router.`,
        },
        {
          type: 'example',
          title: 'Fehleranalyse: „Webseite geht nicht“',
          problem: `PC-23 kann \`ping 203.0.113.80\` erfolgreich ausführen, aber \`https://shop.lieferant.example\` lädt nicht („Server nicht gefunden“). Wo liegt der Fehler wahrscheinlich?`,
          steps: [
            { label: 'Was funktioniert?', body: `Ping per IP klappt → Schicht 1–3 einschließlich Gateway und Routing ins Internet sind in Ordnung.` },
            { label: 'Was funktioniert nicht?', body: `„Server nicht gefunden“ bedeutet: Der **Name** konnte nicht aufgelöst werden.` },
            { label: 'Prüfung', body: `\`nslookup shop.lieferant.example\` ausführen, DNS-Server-Eintrag in \`ipconfig /all\` prüfen, DC01 erreichbar? DNS-Dienst läuft?` },
          ],
          result: `Wahrscheinlich ein **DNS-Problem** (Anwendungsschicht/Schicht 7), nicht das Netz selbst.`,
        },
        {
          type: 'check',
          question: {
            id: 'm02-l06-c1',
            kind: 'order',
            skill: 'osi.webrequest',
            difficulty: 2,
            prompt: `Bringe die Schritte beim **erstmaligen** Aufruf einer HTTPS-Webseite in einem fremden Netz in die richtige Reihenfolge (leere Caches).`,
            items: [
              'DNS-Anfrage zur Auflösung des Namens',
              'ARP-Anfrage nach der MAC-Adresse des Standardgateways',
              'TCP-3-Wege-Handshake mit dem Webserver',
              'TLS-Handshake',
              'HTTP-GET-Request',
              'HTTP-Response mit Statuscode 200',
            ],
            hints: ['Bevor eine Verbindung zum Webserver aufgebaut werden kann, braucht der PC dessen IP-Adresse.', 'Streng genommen ist auch für die DNS-Anfrage schon ARP nötig – hier geht es um das Gateway für die Verbindung zum Webserver.'],
            explanation: `Erst den Namen auflösen (DNS), dann die Gateway-MAC (ARP), dann TCP-Verbindung, dann Verschlüsselung (TLS), dann Request und Response. (Liegt der DNS-Server im eigenen Netz, braucht der PC für die DNS-Anfrage dessen MAC – auch das läuft über ARP.)`,
          },
        },
        {
          type: 'check',
          question: {
            id: 'm02-l06-c2',
            kind: 'single',
            skill: 'osi.addressing',
            difficulty: 3,
            prompt: `PC-23 (192.168.10.23/24) sendet einen Frame an den Webserver 203.0.113.80. Welche **Ziel-MAC-Adresse** trägt der Frame, wenn er PC-23 verlässt?`,
            options: [
              'Die MAC-Adresse des Standardgateways (Firewall, LAN-Seite)',
              'Die MAC-Adresse des Webservers',
              'Die Broadcast-MAC FF:FF:FF:FF:FF:FF',
              'Die MAC-Adresse des Switches',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'Die MAC des Webservers ist im LAN unbekannt und nutzlos – MAC-Adressen gelten nur im lokalen Segment.', error: 'mac-ip-reichweite' },
              '2': { why: 'Broadcast wird nur für die ARP-Anfrage verwendet, nicht für Nutzdaten.', error: 'arp-broadcast' },
              '3': { why: 'Ein Switch ist für Frames transparent – er ist nicht Ziel, sondern leitet nur weiter.', error: 'switch-transparent' },
            },
            explanation: `Das Ziel liegt in einem fremden Netz. Daher adressiert der PC auf Schicht 3 den **Webserver** (Ziel-IP), auf Schicht 2 aber das **Gateway** (Ziel-MAC). Der Router/die Firewall leitet dann weiter.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: Gesamtablauf',
          questionIds: ['m02-q030', 'm02-q034', 'm02-q035', 'm02-q036', 'm02-q037'],
          count: 4,
          difficulty: 3,
        },
        {
          type: 'summary',
          points: [
            'Ablauf: DNS → (lokal/entfernt prüfen) → ARP fürs Gateway → TCP-Handshake → TLS → HTTP-Request → Response.',
            'Ziel-IP = endgültiges Ziel, Ziel-MAC = nächster Hop (Gateway).',
            'Switch liest nur MAC; Router/Firewall entkapselt bis Schicht 3, NAT ändert die Quell-IP.',
            'Beim Empfänger: Entkapselung von Schicht 1 bis 7; Port 443 bestimmt den Serverprozess.',
            'Fehlersuche: Ping per IP ok, Name nicht → DNS-Problem.',
          ],
        },
      ],
    },
  ],

  /* ==================================================================== */
  /* Fragenpool                                                            */
  /* ==================================================================== */
  questions: [
    // ---------- osi.layers ----------
    {
      id: 'm02-q001',
      kind: 'order',
      skill: 'osi.layers',
      difficulty: 1,
      prompt: `Bringe die OSI-Schichten in die Reihenfolge **von Schicht 7 nach Schicht 1**.`,
      items: [
        'Anwendungsschicht',
        'Darstellungsschicht',
        'Sitzungsschicht',
        'Transportschicht',
        'Vermittlungsschicht',
        'Sicherungsschicht',
        'Bitübertragungsschicht',
      ],
      hints: ['Alle Deutschen Studenten Trinken Verschiedene Sorten Bier.'],
      explanation: `7 Anwendung – 6 Darstellung – 5 Sitzung – 4 Transport – 3 Vermittlung – 2 Sicherung – 1 Bitübertragung.`,
    },
    {
      id: 'm02-q002',
      kind: 'text',
      skill: 'osi.layers',
      difficulty: 1,
      prompt: `Wie heißt **Schicht 3** des OSI-Modells (deutsche Bezeichnung)?`,
      accept: ['Vermittlungsschicht', 'Netzwerkschicht', 'Vermittlung', 'Network Layer', 'Netzwerk-Schicht', 'Vermittlungs-Schicht'],
      placeholder: 'z. B. Sicherungsschicht',
      explanation: `Schicht 3 heißt **Vermittlungsschicht** (auch Netzwerkschicht, engl. Network Layer). Hier arbeiten IP und Router.`,
    },
    {
      id: 'm02-q003',
      kind: 'number',
      skill: 'osi.layers',
      difficulty: 1,
      prompt: `Welche **Nummer** hat die **Transportschicht** im OSI-Modell?`,
      answer: 4,
      explanation: `Die Transportschicht ist **Schicht 4** – dort arbeiten TCP und UDP mit Portnummern.`,
    },
    {
      id: 'm02-q004',
      kind: 'single',
      skill: 'osi.layers',
      difficulty: 1,
      prompt: `Welche englische Bezeichnung hat die **Sicherungsschicht**?`,
      options: ['Data Link Layer', 'Physical Layer', 'Session Layer', 'Network Layer'],
      answer: 0,
      distractors: {
        '1': { why: 'Physical Layer = Bitübertragungsschicht (1).', error: 'osi-namen' },
        '2': { why: 'Session Layer = Sitzungsschicht (5).', error: 'osi-namen' },
        '3': { why: 'Network Layer = Vermittlungsschicht (3).', error: 'osi-namen' },
      },
      explanation: `Sicherungsschicht = **Data Link Layer** (Schicht 2). Daher auch der Begriff „Layer-2-Switch“.`,
    },
    // ---------- osi.tasks ----------
    {
      id: 'm02-q005',
      kind: 'match',
      skill: 'osi.tasks',
      difficulty: 2,
      prompt: `Ordne die Aufgabe der richtigen OSI-Schicht zu.`,
      left: [
        'Übertragung von Bits als elektrische/optische Signale',
        'Rahmenbildung und physische Adressierung (MAC)',
        'Logische Adressierung und Wegwahl',
        'Ende-zu-Ende-Verbindung, Adressierung von Anwendungen über Ports',
      ],
      right: ['Schicht 1', 'Schicht 2', 'Schicht 3', 'Schicht 4'],
      answer: [0, 1, 2, 3],
      explanation: `1 Bits/Signale, 2 Frames/MAC, 3 IP/Routing, 4 Ports/Ende-zu-Ende-Transport.`,
    },
    {
      id: 'm02-q006',
      kind: 'single',
      skill: 'osi.tasks',
      difficulty: 2,
      prompt: `Welche OSI-Schicht ist laut Modell für **Datenformat, Zeichenkodierung, Kompression und Verschlüsselung** zuständig?`,
      options: ['Schicht 6 – Darstellung', 'Schicht 5 – Sitzung', 'Schicht 7 – Anwendung', 'Schicht 4 – Transport'],
      answer: 0,
      distractors: {
        '1': { why: 'Schicht 5 steuert Sitzungen (Auf-/Abbau, Synchronisation).', error: 'osi-aufgaben-verwechslung' },
        '2': { why: 'Schicht 7 stellt Netzwerkdienste für Anwendungen bereit (HTTP, DNS …).', error: 'osi-aufgaben-verwechslung' },
        '3': { why: 'Schicht 4 sorgt für den Transport zu den Ports.', error: 'osi-aufgaben-verwechslung' },
      },
      hints: ['„Darstellung“ – wie werden Daten dargestellt/kodiert?'],
      explanation: `Die **Darstellungsschicht** (Presentation) sorgt für ein einheitliches Datenformat – Kodierung (ASCII/UTF-8), Formate (JPEG, MPEG), Kompression und Verschlüsselung.`,
    },
    {
      id: 'm02-q007',
      kind: 'single',
      skill: 'osi.tasks',
      difficulty: 2,
      prompt: `Was ist die Hauptaufgabe der **Sitzungsschicht (Schicht 5)**?`,
      options: [
        'Aufbau, Steuerung und Abbau von Sitzungen zwischen Anwendungen',
        'Weiterleitung von Paketen zwischen Netzen',
        'Fehlererkennung mithilfe der FCS',
        'Umwandlung von Bits in Lichtsignale',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Das ist Routing (Schicht 3).', error: 'osi-aufgaben-verwechslung' },
        '2': { why: 'FCS gehört zu Schicht 2.', error: 'osi-aufgaben-verwechslung' },
        '3': { why: 'Signalumsetzung ist Schicht 1.', error: 'osi-aufgaben-verwechslung' },
      },
      explanation: `Die Sitzungsschicht (Kommunikationssteuerungsschicht) organisiert den Dialog: Sitzung aufbauen, aufrechterhalten, Synchronisationspunkte setzen, beenden.`,
    },
    {
      id: 'm02-q008',
      kind: 'multi',
      skill: 'osi.tasks',
      difficulty: 2,
      prompt: `Welche Aufgaben gehören zur **Sicherungsschicht (Schicht 2)**? (Mehrere Antworten)`,
      options: [
        'Bildung von Frames',
        'Physische Adressierung mit MAC-Adressen',
        'Fehlererkennung per CRC/FCS',
        'Wegwahl über mehrere Router',
        'Adressierung von Diensten über Ports',
        'Steuerung des Medienzugriffs (z. B. CSMA/CD)',
      ],
      answer: [0, 1, 2, 5],
      hints: ['Zwei der Optionen gehören zu Schicht 3 bzw. 4.'],
      explanation: `Schicht 2: Framing, MAC-Adressierung, Fehlererkennung, Medienzugriff. Wegwahl ist Schicht 3, Ports sind Schicht 4.`,
    },
    // ---------- osi.devices ----------
    {
      id: 'm02-q009',
      kind: 'match',
      skill: 'osi.devices',
      difficulty: 2,
      prompt: `Ordne das Gerät der höchsten OSI-Schicht zu, auf der es typischerweise arbeitet.`,
      left: ['Repeater', 'Bridge', 'Router', 'Proxy-Server'],
      right: ['Schicht 1', 'Schicht 2', 'Schicht 3', 'Schicht 7'],
      answer: [0, 1, 2, 3],
      explanation: `Repeater (1) regeneriert Signale, Bridge (2) wertet MAC-Adressen aus, Router (3) IP-Adressen, ein Proxy (7) arbeitet auf Anwendungsebene (z. B. HTTP).`,
    },
    {
      id: 'm02-q010',
      kind: 'single',
      skill: 'osi.devices',
      difficulty: 1,
      prompt: `Auf welcher OSI-Schicht arbeitet ein **Access Point** (reiner AP, kein WLAN-Router)?`,
      options: ['Schicht 2', 'Schicht 1', 'Schicht 3', 'Schicht 7'],
      answer: 0,
      distractors: {
        '1': { why: 'Er setzt nicht nur Signale um, sondern bridgt Frames zwischen 802.11 und 802.3 anhand von MAC-Adressen.', error: 'geraet-schicht' },
        '2': { why: 'Ein reiner AP routet nicht.', error: 'verwechslung-ap-router' },
        '3': { why: 'Ein AP verarbeitet keine Anwendungsdaten.', error: 'geraet-schicht' },
      },
      explanation: `Ein Access Point verbindet WLAN- und LAN-Segmente wie eine **Bridge** – Schicht 2.`,
    },
    {
      id: 'm02-q011',
      kind: 'single',
      skill: 'osi.devices',
      difficulty: 2,
      prompt: `Ein **Layer-3-Switch** im Core von Elektro Krämer …`,
      options: [
        'vereint Switching (Schicht 2) und Routing (Schicht 3), z. B. zwischen VLANs.',
        'arbeitet ausschließlich auf Schicht 3 und hat keine MAC-Tabelle.',
        'ist ein Switch mit drei Ports.',
        'arbeitet auf Schicht 1 und 3, aber nicht auf Schicht 2.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Er switcht weiterhin auf Schicht 2 und braucht dafür eine MAC-Tabelle.', error: 'geraet-schicht' },
        '2': { why: '„Layer 3“ bezieht sich auf die OSI-Schicht, nicht auf die Portanzahl.', error: 'geraet-schicht' },
        '3': { why: 'Ein Gerät, das auf Schicht 3 arbeitet, beherrscht immer auch die Schichten darunter.', error: 'geraet-schicht' },
      },
      explanation: `Ein Layer-3-Switch leitet innerhalb eines VLANs per MAC weiter (Schicht 2) und routet zwischen VLANs/Subnetzen per IP (Schicht 3) – schnell in Hardware.`,
    },
    // ---------- osi.protocols ----------
    {
      id: 'm02-q012',
      kind: 'match',
      skill: 'osi.protocols',
      difficulty: 1,
      prompt: `Ordne das Protokoll der OSI-Schicht zu.`,
      left: ['HTTP', 'TCP', 'IPv4', 'Ethernet (MAC/Frames)'],
      right: ['Schicht 7', 'Schicht 4', 'Schicht 3', 'Schicht 2'],
      answer: [0, 1, 2, 3],
      explanation: `HTTP (Anwendung, 7), TCP (Transport, 4), IPv4 (Vermittlung, 3), Ethernet (Sicherung, 2 – mit seinen Kabelstandards auch 1).`,
    },
    {
      id: 'm02-q013',
      kind: 'multi',
      skill: 'osi.protocols',
      difficulty: 2,
      prompt: `Welche Protokolle gehören zur **Anwendungsschicht (Schicht 7)**? (Mehrere Antworten)`,
      options: ['DNS', 'DHCP', 'UDP', 'SMTP', 'ICMP', 'SSH'],
      answer: [0, 1, 3, 5],
      hints: ['Ein Protokoll gehört zu der Schicht, deren Aufgabe es erfüllt – nicht zu der, die es benutzt.'],
      explanation: `DNS, DHCP, SMTP und SSH sind Anwendungsprotokolle. UDP ist Schicht 4, ICMP Schicht 3. Dass DNS/DHCP UDP nutzen, macht sie nicht zu Schicht-4-Protokollen.`,
    },
    {
      id: 'm02-q014',
      kind: 'single',
      skill: 'osi.protocols',
      difficulty: 2,
      prompt: `Der Befehl \`ping\` nutzt **ICMP**. Auf welcher OSI-Schicht ist ICMP einzuordnen?`,
      options: ['Schicht 3', 'Schicht 4', 'Schicht 7', 'Schicht 2'],
      answer: 0,
      distractors: {
        '1': { why: 'ICMP nutzt weder TCP noch UDP und hat keine Ports.', error: 'protokoll-schicht' },
        '2': { why: 'ping ist zwar ein Programm, das zugrunde liegende ICMP ist aber ein Hilfsprotokoll von IP.', error: 'protokoll-schicht' },
        '3': { why: 'ICMP-Nachrichten werden in IP-Paketen transportiert und überqueren Router.', error: 'protokoll-schicht' },
      },
      explanation: `ICMP ist ein **Hilfsprotokoll von IP** für Fehler- und Diagnosemeldungen (Echo Request/Reply, „Destination unreachable“, „Time exceeded“). Es gehört zur **Vermittlungsschicht**.`,
    },
    {
      id: 'm02-q015',
      kind: 'text',
      skill: 'osi.protocols',
      difficulty: 1,
      prompt: `Welchen **Standard-Port** verwendet **HTTPS**?`,
      accept: ['443', 'TCP 443', 'TCP/443', '443/TCP'],
      placeholder: 'Portnummer',
      explanation: `HTTPS verwendet standardmäßig **TCP-Port 443** (HTTP unverschlüsselt: 80).`,
    },
    {
      id: 'm02-q016',
      kind: 'match',
      skill: 'osi.protocols',
      difficulty: 2,
      prompt: `Ordne dem Dienst seinen Standard-Port zu.`,
      left: ['HTTP', 'DNS', 'RDP', 'IMAP'],
      right: ['80', '53', '3389', '143'],
      answer: [0, 1, 2, 3],
      explanation: `HTTP 80, DNS 53, RDP 3389, IMAP 143 (IMAPS 993).`,
    },
    {
      id: 'm02-q017',
      kind: 'single',
      skill: 'osi.protocols',
      difficulty: 1,
      prompt: `Welches Transportprotokoll ist **verbindungsorientiert** und garantiert die zuverlässige Zustellung?`,
      options: ['TCP', 'UDP', 'IP', 'ICMP'],
      answer: 0,
      distractors: {
        '1': { why: 'UDP ist verbindungslos und ohne Zustellgarantie.', error: 'tcp-udp-merkmale' },
        '2': { why: 'IP ist ein Schicht-3-Protokoll und arbeitet verbindungslos („best effort“).', error: 'protokoll-schicht' },
        '3': { why: 'ICMP ist ein Hilfsprotokoll von IP für Fehlermeldungen.', error: 'protokoll-schicht' },
      },
      explanation: `**TCP** baut per 3-Wege-Handshake eine Verbindung auf, nummeriert Segmente, bestätigt Empfang (ACK) und sendet Verlorenes erneut.`,
    },
    {
      id: 'm02-q018',
      kind: 'multi',
      skill: 'osi.protocols',
      difficulty: 2,
      prompt: `Für welche Anwendungen wird typischerweise **UDP** eingesetzt? (Mehrere Antworten)`,
      options: ['DNS-Anfragen', 'VoIP-Sprachdaten', 'DHCP', 'Download einer ISO-Datei per HTTPS', 'E-Mail-Versand per SMTP'],
      answer: [0, 1, 2],
      explanation: `DNS-Anfragen (kurz, schnell), VoIP (Echtzeit) und DHCP (Client hat noch keine IP, Broadcast) nutzen UDP. HTTPS-Downloads und SMTP brauchen Zuverlässigkeit → TCP.`,
    },
    // ---------- osi.pdu ----------
    {
      id: 'm02-q019',
      kind: 'text',
      skill: 'osi.pdu',
      difficulty: 1,
      prompt: `Wie heißt die PDU der **Sicherungsschicht (Schicht 2)**?`,
      accept: ['Frame', 'Rahmen', 'Frames', 'Ethernet-Frame', 'Datenrahmen'],
      placeholder: 'Begriff',
      explanation: `Auf Schicht 2 spricht man von **Frames** (Rahmen). Ein Frame hat Header (MAC-Adressen, Typ) und Trailer (FCS).`,
    },
    {
      id: 'm02-q020',
      kind: 'single',
      skill: 'osi.pdu',
      difficulty: 2,
      prompt: `Wie heißt die PDU auf Schicht 4, wenn **UDP** verwendet wird?`,
      options: ['Datagramm', 'Segment', 'Frame', 'Paket'],
      answer: 0,
      distractors: {
        '1': { why: 'Segment ist die Bezeichnung bei TCP.', error: 'pdu-verwechslung' },
        '2': { why: 'Frame ist die PDU von Schicht 2.', error: 'pdu-verwechslung' },
        '3': { why: 'Paket ist die PDU von Schicht 3.', error: 'pdu-verwechslung' },
      },
      explanation: `TCP → **Segment**, UDP → **Datagramm**. (Manchmal wird auch ein IP-Paket „Datagramm“ genannt – im OSI-Kontext von Schicht 4 meint man aber UDP.)`,
    },
    {
      id: 'm02-q021',
      kind: 'order',
      skill: 'osi.pdu',
      difficulty: 1,
      prompt: `Ordne die PDUs in der Reihenfolge, in der sie beim **Sender** entstehen (Kapselung, von oben nach unten).`,
      items: ['Daten', 'Segment', 'Paket', 'Frame', 'Bits'],
      hints: ['Daten Sind Prima Für Bits.'],
      explanation: `Daten (7–5) → Segment (4) → Paket (3) → Frame (2) → Bits (1).`,
    },
    // ---------- osi.encapsulation ----------
    {
      id: 'm02-q022',
      kind: 'single',
      skill: 'osi.encapsulation',
      difficulty: 1,
      prompt: `Welche Schicht fügt den Daten neben einem Header auch einen **Trailer** hinzu?`,
      options: ['Schicht 2', 'Schicht 3', 'Schicht 4', 'Schicht 7'],
      answer: 0,
      distractors: {
        '1': { why: 'IP fügt nur einen Header hinzu.', error: 'kapselung-trailer' },
        '2': { why: 'TCP/UDP fügen nur einen Header hinzu.', error: 'kapselung-trailer' },
        '3': { why: 'Anwendungsprotokolle haben eigene Formate, aber der Trailer im Sinne der Kapselung ist die FCS auf Schicht 2.', error: 'kapselung-trailer' },
      },
      explanation: `Die Sicherungsschicht hängt die **FCS** (Frame Check Sequence) als Trailer an, damit der Empfänger Übertragungsfehler erkennen kann.`,
    },
    {
      id: 'm02-q023',
      kind: 'single',
      skill: 'osi.encapsulation',
      difficulty: 2,
      prompt: `Was versteht man unter **Entkapselung**?`,
      options: [
        'Der Empfänger entfernt Schicht für Schicht die Header und reicht die Nutzdaten nach oben weiter.',
        'Der Sender fügt jeder Schicht einen Header hinzu.',
        'Ein Router verschlüsselt die Daten.',
        'Ein Switch entfernt die IP-Adressen.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Das ist die Kapselung.', error: 'kapselung-richtung' },
        '2': { why: 'Verschlüsselung ist ein anderes Thema (z. B. TLS, VPN).', error: 'kapselung-richtung' },
        '3': { why: 'Ein Switch arbeitet nur auf Schicht 2 und verändert das IP-Paket nicht.', error: 'switch-transparent' },
      },
      explanation: `Beim Empfänger prüft jede Schicht „ihren“ Header, entfernt ihn und gibt die Nutzdaten an die nächsthöhere Schicht weiter – von Schicht 1 bis 7.`,
    },
    {
      id: 'm02-q024',
      kind: 'free',
      skill: 'osi.encapsulation',
      difficulty: 2,
      prompt: `Erläutern Sie das Prinzip der **Datenkapselung** beim Senden einer E-Mail und nennen Sie dabei die PDUs der Schichten 4, 3 und 2.`,
      modelAnswer: `Beim Senden durchlaufen die Daten die Schichten **von oben nach unten**. Jede Schicht übernimmt die PDU der darüberliegenden Schicht als Nutzdaten und fügt **eigene Steuerinformationen** als **Header** hinzu: Schicht 4 (TCP) erzeugt ein **Segment** mit Quell- und Zielport (z. B. 25/587 für SMTP), Schicht 3 (IP) ein **Paket** mit Quell- und Ziel-IP-Adresse, Schicht 2 (Ethernet) einen **Frame** mit Quell- und Ziel-MAC-Adresse sowie einem **Trailer** (FCS) zur Fehlererkennung. Schicht 1 überträgt den Frame als **Bits**. Beim Empfänger werden die Header in umgekehrter Reihenfolge wieder entfernt (**Entkapselung**).`,
      keywords: ['Header', 'Trailer', 'Segment', 'Paket', 'Frame', 'Bits', 'Port', 'IP-Adresse', 'MAC-Adresse', 'Entkapselung'],
      hints: ['Gehe von Schicht 7 nach unten.', 'Nenne pro Schicht: PDU + welche Adresse im Header steht.'],
      explanation: `Eine vollständige Antwort beschreibt das Prinzip (Header je Schicht, Trailer auf Schicht 2), ordnet die PDUs korrekt zu und erwähnt die Umkehrung beim Empfänger.`,
    },
    {
      id: 'm02-q025',
      kind: 'multi',
      skill: 'osi.encapsulation',
      difficulty: 2,
      prompt: `Welche Informationen stehen im **IPv4-Header**? (Mehrere Antworten)`,
      options: ['Quell-IP-Adresse', 'Ziel-IP-Adresse', 'TTL (Time to Live)', 'Zielport', 'Ziel-MAC-Adresse'],
      answer: [0, 1, 2],
      explanation: `Der IP-Header enthält u. a. Quell- und Ziel-IP, TTL und das transportierte Protokoll (z. B. 6 = TCP, 17 = UDP). Ports stehen im TCP/UDP-Header, MAC-Adressen im Ethernet-Header.`,
    },
    {
      id: 'm02-q026',
      kind: 'multi',
      skill: 'osi.encapsulation',
      difficulty: 2,
      prompt: `Welche Felder enthält ein **Ethernet-Frame** (IEEE 802.3/Ethernet II)? (Mehrere Antworten)`,
      options: ['Ziel-MAC-Adresse', 'Quell-MAC-Adresse', 'EtherType', 'FCS', 'Ziel-IP-Adresse', 'Portnummer'],
      answer: [0, 1, 2, 3],
      explanation: `Ethernet-Header: Ziel-MAC (6 Byte), Quell-MAC (6 Byte), EtherType (2 Byte); dann Nutzdaten; dann FCS (4 Byte). IP-Adressen und Ports stehen in den gekapselten Nutzdaten, nicht im Ethernet-Header.`,
    },
    {
      id: 'm02-q027',
      kind: 'number',
      skill: 'osi.encapsulation',
      difficulty: 3,
      prompt: `Die Ethernet-MTU beträgt 1500 Byte. IPv4-Header und TCP-Header sind jeweils **20 Byte** groß (ohne Optionen). Wie viele **Byte Anwendungsdaten** passen maximal in ein TCP-Segment, das in einem Frame übertragen wird?`,
      answer: 1460,
      unit: 'Byte',
      hints: ['Die MTU beschreibt die Nutzlast des Frames – also das gesamte IP-Paket.', '1500 − IP-Header − TCP-Header'],
      explanation: `1500 − 20 (IP) − 20 (TCP) = **1460 Byte**. Das ist die typische **MSS** (Maximum Segment Size). Ethernet-Header und FCS zählen nicht zur MTU.`,
    },
    // ---------- osi.addressing ----------
    {
      id: 'm02-q028',
      kind: 'match',
      skill: 'osi.addressing',
      difficulty: 1,
      prompt: `Ordne der Schicht die dort verwendete Adressart zu.`,
      left: ['Schicht 2', 'Schicht 3', 'Schicht 4'],
      right: ['MAC-Adresse', 'IP-Adresse', 'Portnummer'],
      answer: [0, 1, 2],
      explanation: `MAC (physisch, Schicht 2) → IP (logisch, Schicht 3) → Port (Anwendung/Dienst, Schicht 4).`,
    },
    {
      id: 'm02-q029',
      kind: 'single',
      skill: 'osi.addressing',
      difficulty: 2,
      prompt: `Wie groß ist eine **MAC-Adresse**?`,
      options: ['48 Bit', '32 Bit', '128 Bit', '16 Bit'],
      answer: 0,
      distractors: {
        '1': { why: '32 Bit ist die Länge einer IPv4-Adresse.', error: 'adresslaengen' },
        '2': { why: '128 Bit ist die Länge einer IPv6-Adresse.', error: 'adresslaengen' },
        '3': { why: '16 Bit ist die Länge einer Portnummer.', error: 'adresslaengen' },
      },
      explanation: `MAC-Adressen sind **48 Bit** (6 Byte) lang, geschrieben als 12 Hexziffern, z. B. 00:1A:2B:3C:4D:5E. Die ersten 24 Bit (OUI) kennzeichnen den Hersteller.`,
    },
    {
      id: 'm02-q030',
      kind: 'table',
      skill: 'osi.addressing',
      difficulty: 3,
      prompt: `PC-23 (192.168.10.23, MAC …:23) sendet eine HTTPS-Anfrage an 203.0.113.80. Das Gateway hat die IP 192.168.10.1 und die MAC …:01. Trage die Zieladressen des Frames ein, **wie er den PC verlässt**.`,
      columns: [
        { key: 'feld', label: 'Feld', type: 'text' },
        { key: 'wert', label: 'Wert', type: 'text' },
      ],
      rows: [
        { cells: { feld: { given: 'Ziel-MAC (Endung)' }, wert: { answer: '01', accept: ['01', ':01', '…:01', 'gateway', 'MAC Gateway'] } } },
        { cells: { feld: { given: 'Ziel-IP' }, wert: { answer: '203.0.113.80' } } },
        { cells: { feld: { given: 'Zielport' }, wert: { answer: '443', accept: ['443', 'TCP 443'] } } },
      ],
      hints: ['Die IP-Adresse ist das Endziel, die MAC-Adresse der nächste Hop.'],
      explanation: `Ziel-MAC = **Gateway** (…:01), weil das Ziel in einem fremden Netz liegt. Ziel-IP = **Webserver 203.0.113.80** (Ende-zu-Ende). Zielport = **443** (HTTPS).`,
    },
    // ---------- tcpip.model ----------
    {
      id: 'm02-q031',
      kind: 'match',
      skill: 'tcpip.model',
      difficulty: 2,
      prompt: `Ordne jede Schicht des **TCP/IP-Modells** den entsprechenden OSI-Schichten zu.`,
      left: ['Anwendungsschicht', 'Transportschicht', 'Internetschicht', 'Netzzugangsschicht'],
      right: ['OSI 5–7', 'OSI 4', 'OSI 3', 'OSI 1–2'],
      answer: [0, 1, 2, 3],
      explanation: `TCP/IP fasst OSI 5–7 zur Anwendungsschicht und OSI 1–2 zur Netzzugangsschicht zusammen; Transport und Internet entsprechen OSI 4 und 3.`,
    },
    {
      id: 'm02-q032',
      kind: 'single',
      skill: 'tcpip.model',
      difficulty: 1,
      prompt: `Wie viele Schichten hat das **TCP/IP-Modell** (klassisches DoD-Modell)?`,
      options: ['4', '5', '7', '3'],
      answer: 0,
      distractors: {
        '1': { why: '5 Schichten hat das hybride Lehrbuchmodell, nicht das klassische TCP/IP-Modell.', error: 'tcpip-schichtzahl' },
        '2': { why: '7 Schichten hat das OSI-Modell.', error: 'tcpip-schichtzahl' },
        '3': { why: 'Es sind vier: Anwendung, Transport, Internet, Netzzugang.', error: 'tcpip-schichtzahl' },
      },
      explanation: `Das TCP/IP-Modell hat **4 Schichten**: Anwendung, Transport, Internet, Netzzugang.`,
    },
    {
      id: 'm02-q033',
      kind: 'free',
      skill: 'tcpip.model',
      difficulty: 2,
      prompt: `Nennen Sie **zwei Unterschiede** zwischen dem OSI-Modell und dem TCP/IP-Modell.`,
      modelAnswer: `1. **Anzahl der Schichten:** OSI hat 7, TCP/IP 4 Schichten (Anwendung = OSI 5–7, Netzzugang = OSI 1–2).
2. **Charakter:** OSI ist ein theoretisches, protokollunabhängiges **Referenzmodell** (ISO), das vor allem zur Beschreibung, Lehre und Fehlersuche dient. Das TCP/IP-Modell beschreibt die **tatsächlich im Internet eingesetzte Protokollfamilie** und ist aus der Praxis entstanden.`,
      keywords: ['7 Schichten', '4 Schichten', 'Referenzmodell', 'Praxis', 'Internet', 'zusammengefasst'],
      hints: ['Zähle die Schichten.', 'Welches Modell ist theoretisch, welches praktisch?'],
      explanation: `Neben der Schichtzahl ist der wichtigste Unterschied, dass OSI ein Referenzmodell ist, während TCP/IP real implementiert ist.`,
    },
    // ---------- osi.webrequest ----------
    {
      id: 'm02-q034',
      kind: 'single',
      skill: 'osi.webrequest',
      difficulty: 2,
      prompt: `Ein PC kennt die IP-Adresse des Webservers. Wozu benötigt er vor dem Senden des ersten Pakets noch **ARP**, wenn der Webserver im Internet steht?`,
      options: [
        'Um die MAC-Adresse seines Standardgateways zu ermitteln',
        'Um die MAC-Adresse des Webservers im Internet zu ermitteln',
        'Um den Namen in eine IP-Adresse aufzulösen',
        'Um eine IP-Adresse vom DHCP-Server zu erhalten',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'ARP funktioniert nur im lokalen Netz (Broadcast); die MAC des Webservers ist irrelevant.', error: 'mac-ip-reichweite' },
        '2': { why: 'Namensauflösung ist Aufgabe von DNS.', error: 'verwechslung-arp-dns' },
        '3': { why: 'IP-Adressvergabe ist Aufgabe von DHCP.', error: 'verwechslung-arp-dhcp' },
      },
      explanation: `Für fremde Netze wird der Frame an das **Gateway** adressiert. ARP liefert zur bekannten Gateway-IP die zugehörige MAC-Adresse.`,
    },
    {
      id: 'm02-q035',
      kind: 'single',
      skill: 'osi.webrequest',
      difficulty: 2,
      prompt: `**Handlungssituation:** Ein Mitarbeiter meldet „Kein Netzwerk“. Am PC und am Switchport leuchtet **keine Link-LED**. Auf welcher OSI-Schicht beginnst du mit der Fehlersuche?`,
      options: ['Schicht 1', 'Schicht 3', 'Schicht 4', 'Schicht 7'],
      answer: 0,
      distractors: {
        '1': { why: 'Ohne Link gibt es überhaupt keine Signalübertragung – IP-Einstellungen sind noch gar nicht relevant.', error: 'fehlersuche-schicht' },
        '2': { why: 'Ports/Firewall spielen erst eine Rolle, wenn eine physische Verbindung besteht.', error: 'fehlersuche-schicht' },
        '3': { why: 'Anwendungsprobleme sind erst relevant, wenn die unteren Schichten funktionieren.', error: 'fehlersuche-schicht' },
      },
      explanation: `Fehlende Link-LED = keine physische Verbindung → **Schicht 1**: Kabel eingesteckt? Kabel defekt? Netzwerkdose richtig gepatcht? Port deaktiviert?`,
    },
    {
      id: 'm02-q036',
      kind: 'single',
      skill: 'osi.webrequest',
      difficulty: 3,
      prompt: `**Handlungssituation:** PC-23 erreicht \`ping 8.8.8.8\` problemlos, aber im Browser erscheint bei jeder Webseite „Server nicht gefunden“. Was ist die wahrscheinlichste Ursache?`,
      options: [
        'Die DNS-Namensauflösung funktioniert nicht.',
        'Das Netzwerkkabel ist defekt.',
        'Das Standardgateway ist falsch eingetragen.',
        'Die MAC-Adresse des PCs ist doppelt vergeben.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Mit defektem Kabel würde auch der Ping nicht funktionieren.', error: 'fehlersuche-schicht' },
        '2': { why: 'Ohne korrektes Gateway wäre 8.8.8.8 (ein fremdes Netz) nicht erreichbar.', error: 'fehlersuche-schicht' },
        '3': { why: 'Dann gäbe es Verbindungsprobleme auch beim Ping.', error: 'fehlersuche-schicht' },
      },
      hints: ['Ping per IP funktioniert – also sind Schicht 1–3 inkl. Routing in Ordnung.'],
      explanation: `Erreichbarkeit per IP beweist: Kabel, Switch, IP-Konfiguration und Gateway funktionieren. „Server nicht gefunden“ bedeutet, dass der **Name nicht aufgelöst** werden kann → **DNS** (Schicht 7) prüfen, z. B. mit \`nslookup\`.`,
    },
    {
      id: 'm02-q037',
      kind: 'free',
      skill: 'osi.webrequest',
      difficulty: 3,
      prompt: `**Handlungssituation:** Ein neuer Azubi bei Elektro Krämer fragt dich: „Was passiert eigentlich im Netzwerk, wenn ich \`https://www.example.com\` aufrufe?“

Beschreiben Sie den Ablauf von der Eingabe bis zum Empfang der Webseite in **mindestens fünf Schritten** und nennen Sie die beteiligten Protokolle.`,
      modelAnswer: `1. **DNS:** Der PC fragt den DNS-Server (UDP 53) nach der IP-Adresse von www.example.com.
2. **Lokal/entfernt:** Mit der Subnetzmaske stellt der PC fest, dass das Ziel in einem fremden Netz liegt → Weg über das **Standardgateway**.
3. **ARP:** Der PC ermittelt per ARP-Broadcast die MAC-Adresse des Gateways (falls nicht im Cache).
4. **TCP:** Aufbau einer TCP-Verbindung zum Webserver auf Port 443 (3-Wege-Handshake SYN, SYN-ACK, ACK).
5. **TLS:** Aushandeln der Verschlüsselung, der Server weist sich mit einem Zertifikat aus.
6. **HTTP:** Der Browser sendet einen HTTP-GET-Request; dieser wird gekapselt (TCP-Segment, IP-Paket mit Ziel-IP des Webservers, Ethernet-Frame mit Ziel-MAC des Gateways).
7. **Weiterleitung:** Switch leitet per MAC, Router/Firewall per IP (NAT), Provider-Router Hop für Hop.
8. **Antwort:** Der Server antwortet mit HTTP 200 OK und den HTML-Daten, der Browser stellt die Seite dar.`,
      keywords: ['DNS', 'Standardgateway', 'ARP', 'TCP', 'Handshake', 'Port 443', 'TLS', 'HTTP GET', 'Kapselung', 'Router'],
      hints: ['Beginne bei der Namensauflösung.', 'Denke an ARP, TCP-Handshake und TLS, bevor HTTP-Daten fließen.'],
      explanation: `Die Prüfer erwarten eine sinnvolle Reihenfolge und die korrekten Protokollnamen. Bonus: Hinweis auf Kapselung und darauf, dass sich die Ziel-MAC (Gateway) von der Ziel-IP (Webserver) unterscheidet.`,
    },
    {
      id: 'm02-q038',
      kind: 'table',
      skill: 'osi.pdu',
      difficulty: 2,
      prompt: `Vervollständige die Tabelle zu den OSI-Schichten.`,
      columns: [
        { key: 'nr', label: 'Schicht', type: 'number' },
        { key: 'name', label: 'Bezeichnung', type: 'text' },
        { key: 'pdu', label: 'PDU', type: 'text' },
        { key: 'geraet', label: 'typisches Gerät', type: 'text' },
      ],
      rows: [
        {
          cells: {
            nr: { given: '1' },
            name: { answer: 'Bitübertragungsschicht', accept: ['Bitübertragungsschicht', 'Bitübertragung', 'Physical', 'Physical Layer', 'Physikalische Schicht'] },
            pdu: { answer: 'Bits', accept: ['Bits', 'Bit'] },
            geraet: { answer: 'Hub', accept: ['Hub', 'Repeater', 'Medienkonverter', 'Modem'] },
          },
        },
        {
          cells: {
            nr: { given: '2' },
            name: { answer: 'Sicherungsschicht', accept: ['Sicherungsschicht', 'Sicherung', 'Data Link', 'Data Link Layer'] },
            pdu: { answer: 'Frame', accept: ['Frame', 'Frames', 'Rahmen'] },
            geraet: { answer: 'Switch', accept: ['Switch', 'Bridge', 'Access Point', 'AP'] },
          },
        },
        {
          cells: {
            nr: { given: '3' },
            name: { answer: 'Vermittlungsschicht', accept: ['Vermittlungsschicht', 'Vermittlung', 'Netzwerkschicht', 'Network', 'Network Layer'] },
            pdu: { answer: 'Paket', accept: ['Paket', 'Pakete', 'Packet'] },
            geraet: { answer: 'Router', accept: ['Router', 'Layer-3-Switch', 'L3-Switch'] },
          },
        },
      ],
      explanation: `1 Bitübertragung – Bits – Hub/Repeater; 2 Sicherung – Frame – Switch/Bridge/AP; 3 Vermittlung – Paket – Router.`,
    },
    {
      id: 'm02-q039',
      kind: 'free',
      skill: 'osi.layers',
      difficulty: 2,
      prompt: `Erläutern Sie **zwei Vorteile**, die die Aufteilung der Netzwerkkommunikation in Schichten (z. B. nach dem OSI-Modell) bietet.`,
      modelAnswer: `1. **Austauschbarkeit/Unabhängigkeit:** Eine Schicht kann geändert oder ausgetauscht werden, ohne die anderen zu beeinflussen – z. B. WLAN statt Kabel (Schicht 1/2), der Browser (Schicht 7) bleibt unverändert.
2. **Herstellerunabhängigkeit/Standardisierung:** Durch genormte Schnittstellen arbeiten Geräte und Software verschiedener Hersteller zusammen.
(Weitere: reduzierte Komplexität, da jede Schicht nur eine Teilaufgabe hat; **strukturierte Fehlersuche** Schicht für Schicht; gemeinsame Fachsprache.)`,
      keywords: ['austauschbar', 'unabhängig', 'Hersteller', 'Standard', 'Komplexität', 'Fehlersuche'],
      hints: ['Was passiert, wenn man vom Kabel auf WLAN wechselt?'],
      explanation: `Bei „Erläutern“ muss jeder Vorteil kurz begründet oder mit einem Beispiel belegt werden.`,
    },
    {
      id: 'm02-q040',
      kind: 'single',
      skill: 'osi.devices',
      difficulty: 2,
      prompt: `Auf welchen OSI-Schichten arbeitet eine **einfache Paketfilter-Firewall**, die Regeln nach IP-Adressen und Ports prüft?`,
      options: ['Schicht 3 und 4', 'Nur Schicht 2', 'Schicht 5 und 6', 'Nur Schicht 7'],
      answer: 0,
      distractors: {
        '1': { why: 'Auf Schicht 2 gibt es nur MAC-Adressen, keine IP-Adressen und Ports.', error: 'firewall-schicht' },
        '2': { why: 'Ports gehören zu Schicht 4, IP-Adressen zu Schicht 3.', error: 'firewall-schicht' },
        '3': { why: 'Inhalte auf Schicht 7 prüfen erst Application-Level-Gateways/Proxys bzw. NGFWs.', error: 'firewall-schicht' },
      },
      explanation: `IP-Adressen → Schicht 3, Ports → Schicht 4. Ein Paketfilter arbeitet daher auf **Schicht 3 und 4**. Proxys/Application-Gateways prüfen zusätzlich Inhalte (bis Schicht 7).`,
    },
    {
      id: 'm02-q041',
      kind: 'free',
      skill: 'osi.protocols',
      difficulty: 2,
      prompt: `In einem Lehrbuch steht: „DHCP arbeitet auf Schicht 3, weil es IP-Adressen vergibt.“ Nimm Stellung: Welcher OSI-Schicht ordnest du DHCP zu? Begründe deine Antwort.`,
      modelAnswer: `DHCP gehört zur **Anwendungsschicht (Schicht 7)**, im TCP/IP-Modell zur Anwendungsschicht. Begründung: DHCP ist ein **Dienst**, dessen Nachrichten in **UDP** (Schicht 4) verpackt werden – Server-Port 67, Client-Port 68. Alles, was ein Transportprotokoll mit Ports nutzt, liegt oberhalb von Schicht 4. Dass DHCP IP-Adressen **verteilt**, macht es nicht zu einem Schicht-3-Protokoll; es transportiert diese Information nur als Nutzdaten. (Gleiches gilt für DNS über UDP/TCP 53.)`,
      keywords: ['Anwendungsschicht', 'Schicht 7', 'UDP', 'Port 67', 'Port 68', 'Dienst'],
      hints: ['Welches Transportprotokoll und welche Ports nutzt DHCP?'],
      explanation: `Prüfungslösung: **Schicht 7**. Das stärkste Argument ist die Kapselung: DHCP-Nachrichten stecken in UDP-Segmenten (Ports 67/68), also liegt DHCP über der Transportschicht. Häufiger Fehler: Protokolle nach ihrem „Thema“ (IP-Adressen) statt nach ihrer Arbeitsweise einordnen.`,
    },
  ],
};
