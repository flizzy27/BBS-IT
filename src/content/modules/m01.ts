import type { Module } from '../types';

/**
 * Modul 1 – Netzwerkgrundlagen
 * Fiktives Praxisunternehmen: Elektro Krämer GmbH (Hauptsitz Hannover, Außenlager Hildesheim)
 */
export const m01: Module = {
  id: 'm01',
  nr: 1,
  title: 'Netzwerkgrundlagen',
  short: `Was ein Netzwerk ist, welche Netzarten, Topologien und Geräte es gibt und wie ein typisches Firmennetz aufgebaut ist.`,
  icon: 'Network',
  relevance: 'ap1',
  prerequisites: [],
  skills: [
    { id: 'basics.terms', module: 'm01', title: 'Grundbegriffe: Netzwerk, Host, Knoten, Protokoll, Bandbreite' },
    { id: 'basics.network-types', module: 'm01', title: 'Netzarten nach Ausdehnung (PAN, LAN, WLAN, MAN, WAN, GAN)', requires: ['basics.terms'] },
    { id: 'basics.architecture', module: 'm01', title: 'Client-Server und Peer-to-Peer unterscheiden', requires: ['basics.terms'] },
    { id: 'basics.topologies', module: 'm01', title: 'Topologien (Stern, Bus, Ring, Masche) – physisch und logisch', requires: ['basics.terms'] },
    { id: 'basics.devices', module: 'm01', title: 'Netzwerkgeräte und ihre Aufgaben', requires: ['basics.terms'] },
    { id: 'basics.domains', module: 'm01', title: 'Kollisions- und Broadcastdomänen bestimmen', requires: ['basics.devices'] },
    { id: 'basics.enterprise', module: 'm01', title: 'Firmennetz-Architektur (Core/Distribution/Access, DMZ)', requires: ['basics.devices', 'basics.topologies'] },
  ],
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'm01-l01',
      title: 'Was ist ein Netzwerk? – Die Grundbegriffe',
      minutes: 15,
      relevance: 'ap1',
      skills: ['basics.terms'],
      simple: `Ein Netzwerk ist wie das Straßennetz einer Stadt: Die Geräte sind die Häuser, Kabel und Funk sind die Straßen.
Jedes aktive Gerät im Netz heißt **Knoten** – also auch Switch und Router, die nur weiterleiten.
Ein **Host** (Endgerät) ist ein Knoten, der selbst Daten sendet oder empfängt, z. B. PC, Server oder Drucker.
Damit sich alle verstehen, gibt es **Protokolle** – feste Verkehrsregeln für Daten.
Die **Bandbreite** (Datenrate in Bit pro Sekunde) ist wie die Zahl der Fahrspuren: Sie sagt, wie viele Daten pro Sekunde durchpassen.

**Merke:** Knoten = jedes aktive Netzgerät, Host = Endgerät; Protokolle sind die Regeln, nach denen sie Daten austauschen.`,
      steps: [
        {
          type: 'explain',
          title: 'Warum vernetzen wir überhaupt Computer?',
          body: `Stell dir die **Elektro Krämer GmbH** vor: 60 Mitarbeitende in Hannover, ein Außenlager in Hildesheim. Ohne Netzwerk müsste jede Rechnung per USB-Stick zum Drucker getragen werden, jede Kundendatei läge auf genau einem PC, und E-Mail oder das Warenwirtschaftssystem (ERP) gäbe es gar nicht.

Ein **Rechnernetz (Netzwerk)** ist ein Verbund von mindestens zwei Geräten, die über ein **Übertragungsmedium** (Kupferkabel, Glasfaser, Funk) und nach gemeinsamen **Regeln (Protokollen)** Daten austauschen.

Die Ziele eines Netzwerks lassen sich gut merken:

| Ziel | Beispiel bei Elektro Krämer |
|---|---|
| **Datenverbund** – gemeinsame Daten | Alle greifen auf dieselbe Kundendatenbank im ERP zu |
| **Ressourcenverbund** – gemeinsame Geräte | Ein Multifunktionsdrucker pro Etage statt einer pro Platz |
| **Kommunikationsverbund** | E-Mail, Teams, VoIP-Telefonie |
| **Funktionsverbund / Lastverbund** | Ein zentraler Server erledigt rechenintensive Aufgaben für alle |
| **Sicherheits-/Verfügbarkeitsverbund** | Zentrale Datensicherung, redundante Server |

Wichtig für dein Verständnis: Ein Netzwerk ist **nicht nur Kabel**. Es besteht immer aus drei Zutaten: **Geräten** (wer spricht?), **Medium** (worüber?) und **Protokollen** (in welcher „Sprache“ und nach welchen Regeln?).`,
        },
        {
          type: 'explain',
          title: 'Host, Knoten, Protokoll, Bandbreite – sauber unterschieden',
          body: `Diese Begriffe werden im Alltag oft durcheinandergeworfen. In der Prüfung solltest du sie präzise verwenden:

| Begriff | Bedeutung | Beispiele |
|---|---|---|
| **Knoten (Node)** | *Jedes* aktive Gerät im Netz, das Daten senden, empfangen oder weiterleiten kann | PC, Server, Switch, Router, Access Point |
| **Host / Endgerät** | Ein Knoten, der selbst Kommunikationsendpunkt ist (hat i. d. R. eine IP-Adresse und nutzt/bietet Dienste) | PC, Notebook, Server, Netzwerkdrucker, IP-Telefon |
| **Zwischensystem / Netzkoppelelement** | Leitet Daten anderer weiter, ist nicht selbst Ziel der Nutzdaten | Switch, Router, Access Point |
| **Protokoll** | Festgelegte Regeln für die Kommunikation: Format, Reihenfolge, Bedeutung der Nachrichten, Fehlerverhalten | Ethernet, IP, TCP, HTTP, DNS |
| **Übertragungsmedium** | Der physische Weg der Signale | Twisted-Pair-Kabel, Glasfaser, Funk |

**Merksatz:** Jeder Host ist ein Knoten – aber nicht jeder Knoten ist ein Host. Ein Switch ist ein Knoten, aber kein Host im Sinne eines Kommunikationsendpunkts (auch wenn er für die Verwaltung eine eigene IP-Adresse haben kann).

### Bandbreite, Datenrate, Durchsatz, Latenz

- **Datenrate / Übertragungsrate**: Wie viele **Bit pro Sekunde** (bit/s) über eine Verbindung gehen können, z. B. 1 Gbit/s. Umgangssprachlich wird das oft „Bandbreite“ genannt.
- **Bandbreite** im technischen Sinn ist eigentlich ein **Frequenzbereich in Hertz** (z. B. „Cat 6A ist für 500 MHz spezifiziert“). In der Praxis und auch in Prüfungen wird „Bandbreite“ aber häufig als Synonym für die Datenrate verwendet – achte auf den Zusammenhang.
- **Durchsatz**: Die *tatsächlich* erreichte Nutzdatenrate. Sie ist immer kleiner als die Nenn-Datenrate, weil Protokoll-Header, Wartezeiten und Fehlerkorrekturen Kapazität kosten.
- **Latenz (Verzögerung)**: Die Zeit, die ein Datenpaket vom Sender zum Empfänger braucht, gemessen in Millisekunden (z. B. mit \`ping\`).

### Bit und Byte – die Falle mit dem Faktor 8

Datenraten werden in **Bit** pro Sekunde angegeben (kleines **b**: Mbit/s, Mb/s), Dateigrößen in **Byte** (großes **B**: MB, GB). **1 Byte = 8 Bit.** Bei Datenraten gelten dezimale Vorsätze: 1 Mbit/s = 1.000.000 bit/s.

Rechenweg für Übertragungszeiten: **Zeit = Datenmenge in Bit ÷ Datenrate in bit/s**.`,
        },
        {
          type: 'visual',
          title: 'Ein kleines Netzwerk im Überblick',
          widget: {
            kind: 'topology',
            data: {
              nodes: [
                { id: 'pc1', type: 'pc', label: 'PC Buchhaltung', x: 100, y: 90 },
                { id: 'pc2', type: 'laptop', label: 'Notebook Vertrieb', x: 100, y: 230 },
                { id: 'prn', type: 'printer', label: 'Drucker', x: 100, y: 360 },
                { id: 'sw', type: 'switch', label: 'Switch', sub: 'Knoten', x: 330, y: 230 },
                { id: 'srv', type: 'server', label: 'ERP-Server', sub: 'Host', x: 560, y: 120 },
                { id: 'rt', type: 'router', label: 'Router', sub: 'Knoten', x: 560, y: 330 },
                { id: 'inet', type: 'internet', label: 'Internet', x: 730, y: 330 },
              ],
              links: [
                { from: 'pc1', to: 'sw', style: 'lan' },
                { from: 'pc2', to: 'sw', style: 'lan' },
                { from: 'prn', to: 'sw', style: 'lan' },
                { from: 'sw', to: 'srv', style: 'lan', label: '1 Gbit/s' },
                { from: 'sw', to: 'rt', style: 'lan' },
                { from: 'rt', to: 'inet', style: 'wan' },
              ],
            },
          },
          caption: `PC, Notebook, Drucker und Server sind **Hosts** (Endgeräte). Switch und Router sind **Knoten**, die Daten anderer weiterleiten. Alle Geräte zusammen mit den Kabeln und den vereinbarten Protokollen bilden das Netzwerk.`,
        },
        {
          type: 'example',
          title: 'Wie lange dauert die Datensicherung?',
          problem: `Bei Elektro Krämer soll eine **750 MB** große Datenbank-Sicherung vom ERP-Server auf ein NAS kopiert werden. Die Verbindung hat **100 Mbit/s**. Wie lange dauert die Übertragung theoretisch (ohne Protokoll-Overhead, 1 MB = 1.000.000 Byte)?`,
          steps: [
            { label: 'Byte in Bit umrechnen', body: `750 MB × 8 = **6.000 Mbit**. Datenraten sind in Bit angegeben, also müssen wir die Dateigröße zuerst in Bit umrechnen.` },
            { label: 'Durch die Datenrate teilen', body: `6.000 Mbit ÷ 100 Mbit/s = **60 s**.` },
            { label: 'Realitätscheck', body: `In der Praxis dauert es etwas länger, weil Header (Ethernet, IP, TCP) und Bestätigungen Kapazität kosten – der **Durchsatz** liegt unter der Nenn-Datenrate.` },
          ],
          result: `Theoretisch **60 Sekunden** (1 Minute). Mit Gigabit-Ethernet (1.000 Mbit/s) wären es nur 6 Sekunden.`,
        },
        {
          type: 'check',
          question: {
            id: 'm01-l01-c1',
            kind: 'single',
            skill: 'basics.terms',
            difficulty: 1,
            prompt: `Welche Aussage über **Hosts** und **Knoten** ist richtig?`,
            options: [
              'Jeder Host ist ein Knoten, aber nicht jeder Knoten ist ein Host.',
              'Jeder Knoten ist ein Host, aber nicht jeder Host ist ein Knoten.',
              'Host und Knoten bedeuten exakt dasselbe.',
              'Nur Router und Switches sind Knoten.',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'Umgekehrt: Ein Switch ist ein Knoten, aber kein Kommunikationsendpunkt (Host).', error: 'verwechslung-host-knoten' },
              '2': { why: 'Knoten ist der Oberbegriff für alle aktiven Netzgeräte, Host nur für Endgeräte.', error: 'verwechslung-host-knoten' },
              '3': { why: 'Auch Endgeräte wie PCs und Server sind Knoten.', error: 'verwechslung-host-knoten' },
            },
            explanation: `**Knoten** ist der Oberbegriff für jedes aktive Gerät im Netz. **Hosts** sind die Teilmenge der Knoten, die selbst Endpunkt der Kommunikation sind (PC, Server, Drucker). Switches und Router sind Knoten, die Daten weiterleiten.`,
          },
        },
        {
          type: 'check',
          question: {
            id: 'm01-l01-c2',
            kind: 'number',
            skill: 'basics.terms',
            difficulty: 2,
            prompt: `Eine 2 GB große Datei (1 GB = 1.000.000.000 Byte) wird über eine Gigabit-Verbindung (1 Gbit/s) übertragen. Wie viele **Sekunden** dauert das theoretisch?`,
            answer: 16,
            unit: 's',
            hints: ['Datenraten sind in Bit, Dateigrößen in Byte.', '2 GB = 16 Gbit.'],
            explanation: `2 GB × 8 = 16 Gbit. 16 Gbit ÷ 1 Gbit/s = **16 s**. Wer den Faktor 8 vergisst, kommt fälschlich auf 2 s.`,
          },
        },
        {
          type: 'summary',
          points: [
            'Ein Netzwerk = Geräte + Übertragungsmedium + Protokolle.',
            'Ziele: Daten-, Ressourcen-, Kommunikations-, Funktions-/Last- und Sicherheitsverbund.',
            'Knoten = jedes aktive Netzgerät; Host = Endgerät/Kommunikationsendpunkt.',
            'Ein Protokoll legt Format, Reihenfolge und Bedeutung von Nachrichten fest.',
            'Datenrate in bit/s, Dateigröße in Byte – Faktor 8 beachten! Durchsatz < Nenn-Datenrate.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm01-l02',
      title: 'Netzarten nach Ausdehnung: PAN, LAN, MAN, WAN, GAN',
      minutes: 15,
      relevance: 'ap1',
      skills: ['basics.network-types'],
      simple: `Netze werden nach ihrer Reichweite benannt – vom Flur deiner Wohnung bis zur Weltreise.
**PAN** (Personal Area Network) reicht nur wenige Meter, z. B. Handy und Bluetooth-Kopfhörer.
**LAN** (Local Area Network) ist das Netz in einem Gebäude oder auf einem Firmengelände.
**MAN** (Metropolitan Area Network) verbindet Standorte in einer Stadt oder Region.
**WAN** (Wide Area Network) verbindet weit entfernte Standorte wie Hamburg und Berlin, **GAN** (Global Area Network) umspannt die ganze Welt.

**Merke:** Nach Größe sortiert: PAN < LAN < MAN < WAN < GAN.`,
      steps: [
        {
          type: 'explain',
          title: 'Netze nach ihrer räumlichen Ausdehnung einteilen',
          body: `Die häufigste Einteilung von Netzen erfolgt nach der **geografischen Ausdehnung**. Die Grenzen sind fließend – es gibt keine Norm, die „ab 5 km ist es ein MAN“ festlegt. Entscheidend sind typische Größenordnungen und vor allem: **Wem gehört die Infrastruktur?**

| Netzart | Ausgeschrieben | Typische Ausdehnung | Typische Technik | Beispiel |
|---|---|---|---|---|
| **PAN** | Personal Area Network | wenige Meter | Bluetooth, USB, NFC | Smartphone mit Headset und Smartwatch |
| **LAN** | Local Area Network | Raum, Gebäude, Firmengelände | Ethernet (Twisted Pair, Glasfaser) | Firmennetz im Hauptsitz Hannover |
| **WLAN** | Wireless LAN | wie LAN, per Funk | IEEE 802.11 (Wi-Fi) | Gäste- und Mitarbeiter-WLAN im Büro |
| **MAN** | Metropolitan Area Network | Stadt / Region (einige bis ca. 100 km) | Glasfaserringe, Metro-Ethernet | Netz der Stadtwerke, das Schulen und Rathaus verbindet |
| **WAN** | Wide Area Network | Länder, Kontinente | Provider-Leitungen, MPLS, Glasfaser, Mobilfunk | Verbindung Hannover ↔ Hildesheim über einen Provider |
| **GAN** | Global Area Network | weltweit | Satelliten, Seekabel | weltumspannende Netze, z. B. Satelliten-Internet |

### Der wichtigste Unterschied: LAN vs. WAN

- Ein **LAN** wird in der Regel **vom Unternehmen selbst betrieben** – Kabel, Switches und Access Points gehören dir. Hohe Datenraten (1–100 Gbit/s), geringe Latenz, keine laufenden Leitungskosten.
- Ein **WAN** nutzt **Infrastruktur eines Providers** (Telekom, Vodafone, regionale Carrier). Du mietest Bandbreite. Datenraten sind teurer und meist geringer, die Latenz höher.

**Das Internet** ist kein einzelnes WAN, sondern ein **Verbund vieler Netze** (ein „Netz der Netze“), der weltweit über das Protokoll IP zusammenarbeitet – deshalb wird es manchmal auch als GAN bezeichnet.

### WLAN – ein LAN per Funk

WLAN ist keine eigene „Größenklasse“, sondern ein **LAN mit Funk als Medium**. Die Reichweite liegt typischerweise bei einigen zehn Metern in Gebäuden. Details zu WLAN-Standards lernst du in Modul 12.

### Weitere Begriffe, die dir begegnen können

- **SAN (Storage Area Network)**: eigenes Hochgeschwindigkeitsnetz nur für Speichersysteme (z. B. Fibre Channel, iSCSI) – Thema für später.
- **VPN (Virtual Private Network)**: keine Größenklasse, sondern eine **verschlüsselte, virtuelle Verbindung** über ein fremdes Netz (meist das Internet). Damit verbindet z. B. Elektro Krämer das Lager in Hildesheim sicher mit dem Hauptsitz.`,
        },
        {
          type: 'visual',
          title: 'Elektro Krämer: LAN, WLAN und WAN',
          widget: {
            kind: 'topology',
            data: {
              zones: [
                { label: 'LAN Hauptsitz Hannover', x: 10, y: 20, w: 400, h: 380, color: 'blue' },
                { label: 'WAN / Internet (Provider)', x: 420, y: 120, w: 150, h: 180, color: 'gray' },
                { label: 'LAN Lager Hildesheim', x: 580, y: 20, w: 210, h: 380, color: 'green' },
              ],
              nodes: [
                { id: 'pc', type: 'pc', label: 'PC', x: 70, y: 100 },
                { id: 'lap', type: 'laptop', label: 'Notebook', x: 70, y: 330 },
                { id: 'ap', type: 'ap', label: 'Access Point', sub: 'WLAN', x: 180, y: 330 },
                { id: 'sw', type: 'switch', label: 'Switch', x: 200, y: 180 },
                { id: 'fw', type: 'firewall', label: 'Firewall', x: 340, y: 180 },
                { id: 'inet', type: 'internet', label: 'Internet', x: 495, y: 210 },
                { id: 'fw2', type: 'router', label: 'Router', x: 650, y: 180 },
                { id: 'pc2', type: 'pc', label: 'Lager-PC', x: 650, y: 330 },
                { id: 'phone', type: 'phone', label: 'Smartphone', sub: 'PAN', x: 70, y: 220 },
              ],
              links: [
                { from: 'pc', to: 'sw', style: 'lan' },
                { from: 'ap', to: 'sw', style: 'lan' },
                { from: 'lap', to: 'ap', style: 'wifi' },
                { from: 'sw', to: 'fw', style: 'lan' },
                { from: 'fw', to: 'inet', style: 'wan' },
                { from: 'inet', to: 'fw2', style: 'wan' },
                { from: 'fw', to: 'fw2', style: 'vpn', label: 'VPN' },
                { from: 'fw2', to: 'pc2', style: 'lan' },
              ],
            },
          },
          caption: `Beide Standorte haben jeweils ein eigenes **LAN** (inkl. **WLAN**). Verbunden sind sie über das **WAN/Internet** eines Providers – abgesichert durch einen **VPN-Tunnel**. Das Smartphone mit Bluetooth-Headset bildet ein **PAN**.`,
        },
        {
          type: 'example',
          title: 'Netzarten zuordnen – Handlungssituation',
          problem: `Dein Ausbilder bittet dich, für eine Präsentation die folgenden Verbindungen bei Elektro Krämer einer Netzart zuzuordnen:
1. Der Lagerleiter koppelt sein Diensthandy per Bluetooth mit dem Headset.
2. Alle Büro-PCs im Hauptsitz sind per Kabel mit den Switches im Serverraum verbunden.
3. Hauptsitz Hannover und Lager Hildesheim (ca. 35 km) sind über einen Provider verbunden.
4. Die Stadt Hannover betreibt ein Glasfasernetz, das Rathaus, Schulen und Bibliotheken verbindet.`,
          steps: [
            { label: '1. Bluetooth-Headset', body: `Reichweite wenige Meter, persönliche Geräte → **PAN**.` },
            { label: '2. Büro-PCs am Switch', body: `Ein Gebäude, eigene Infrastruktur → **LAN**.` },
            { label: '3. Hannover ↔ Hildesheim', body: `Standortverbindung über Provider-Infrastruktur → **WAN** (bei der Distanz und Nutzung der Provider-Leitung). Technisch meist als VPN über das Internet umgesetzt.` },
            { label: '4. Städtisches Glasfasernetz', body: `Ausdehnung über eine Stadt → **MAN**.` },
          ],
          result: `PAN – LAN – WAN – MAN. Entscheidend sind Ausdehnung **und** wer die Infrastruktur betreibt.`,
        },
        {
          type: 'check',
          question: {
            id: 'm01-l02-c1',
            kind: 'single',
            skill: 'basics.network-types',
            difficulty: 1,
            prompt: `Welches Merkmal unterscheidet ein **WAN** typischerweise von einem **LAN**?`,
            options: [
              'Das WAN nutzt meist Infrastruktur eines Providers.',
              'Im WAN werden keine Protokolle benötigt.',
              'Ein WAN arbeitet immer per Funk.',
              'Ein WAN hat immer eine höhere Datenrate als ein LAN.',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'Jedes Netz benötigt Protokolle – sonst könnten die Geräte sich nicht verstehen.', error: 'grundbegriff-protokoll' },
              '2': { why: 'WANs nutzen vor allem Glasfaser und Kupfer; Funk ist nur eine Möglichkeit.', error: 'verwechslung-wan-wlan' },
              '3': { why: 'Meist ist es umgekehrt: Im LAN sind hohe Datenraten günstig, WAN-Bandbreite ist teuer.', error: 'netzart-eigenschaften' },
            },
            explanation: `LANs betreibt das Unternehmen selbst; für WAN-Strecken mietet man Leitungen bzw. Dienste eines **Providers**. Daraus folgen auch die typischen Unterschiede bei Kosten, Datenrate und Latenz.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: Netzarten',
          questionIds: ['m01-q005', 'm01-q006', 'm01-q007', 'm01-q008'],
          count: 3,
          difficulty: 1,
        },
        {
          type: 'summary',
          points: [
            'PAN (Meter) < LAN (Gebäude/Gelände) < MAN (Stadt) < WAN (Länder) < GAN (global).',
            'WLAN ist ein LAN mit Funk als Medium.',
            'LAN: eigene Infrastruktur; WAN: Provider-Infrastruktur, gemietet.',
            'Das Internet ist ein weltweiter Verbund vieler Netze.',
            'VPN ist keine Netzgröße, sondern ein verschlüsselter Tunnel über ein fremdes Netz.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm01-l03',
      title: 'Client-Server und Peer-to-Peer',
      minutes: 15,
      relevance: 'ap1',
      skills: ['basics.architecture'],
      simple: `Das **Client-Server-Modell** funktioniert wie ein Restaurant: Du als Gast (Client, der anfragende Rechner) bestellst, die Küche (Server, der Rechner mit dem Dienst) liefert.
Der Server steht zentral, verwaltet die Daten und ist immer erreichbar.
Bei **Peer-to-Peer** (P2P, „unter Gleichen“) ist jeder Rechner Gast und Koch zugleich – jeder bietet an und fragt an.
Das reicht für zwei, drei Rechner, wird aber schnell unübersichtlich und unsicher.
Firmen nutzen deshalb Client-Server, weil Rechte, Datensicherung und Verwaltung an einer Stelle liegen.

**Merke:** Client fragt an, Server bietet an – in Firmen ist Client-Server Standard, P2P nur für sehr kleine Netze.`,
      steps: [
        {
          type: 'explain',
          title: 'Wer bietet an, wer fragt an?',
          body: `Neben der Größe kann man Netze danach unterscheiden, **wie die Rollen verteilt sind**.

### Client-Server-Modell

Ein **Server** stellt einen **Dienst** bereit (Dateien, E-Mail, Datenbank, Druck, Webseiten), ein **Client** nimmt diesen Dienst in Anspruch. Der Client stellt eine **Anfrage (Request)**, der Server liefert eine **Antwort (Response)**.

Wichtig: „Server“ und „Client“ sind zunächst **Rollen von Software**, nicht zwingend Hardware. Auf einem physischen Server-Rechner laufen oft mehrere Server-Dienste (z. B. DNS und DHCP), und ein Arbeitsplatz-PC kann gleichzeitig Client (Browser) und Server (freigegebener Ordner) sein. Im Alltag nennt man die leistungsstarken Rechner im Serverraum trotzdem „Server“.

### Peer-to-Peer (P2P)

Bei Peer-to-Peer sind alle Teilnehmer **gleichberechtigt** („peer“ = Ebenbürtiger). Jeder Rechner kann gleichzeitig Dienste anbieten *und* nutzen. Es gibt keine zentrale Instanz. Beispiel: In einer Windows-**Arbeitsgruppe** gibt jeder PC selbst Ordner frei und verwaltet seine eigenen Benutzerkonten.

### Vergleich

| Kriterium | Client-Server | Peer-to-Peer |
|---|---|---|
| Verwaltung | **zentral** (Benutzer, Rechte, Updates) | **dezentral**, jeder Rechner einzeln |
| Datensicherung | zentral auf dem Server – einfach | verteilt – aufwendig, fehleranfällig |
| Sicherheit | einheitliche Rechtevergabe, gut kontrollierbar | uneinheitlich, schwer kontrollierbar |
| Kosten | höher (Serverhardware, Lizenzen, Admin) | gering |
| Ausfallsicherheit | Server ist **Single Point of Failure** (wenn nicht redundant) | kein zentraler Ausfallpunkt |
| Skalierbarkeit | gut für viele Clients | nur für wenige Rechner sinnvoll (Faustregel: ca. bis 10) |
| Typischer Einsatz | Unternehmen, Domäne mit Active Directory | Kleinstbüro, Heimnetz, Filesharing, Blockchain |

### Was bedeutet das für Elektro Krämer?

Mit 60 Mitarbeitenden ist ein **Client-Server-Netz** mit Domäne (Active Directory) die einzig sinnvolle Wahl: Benutzerkonten zentral anlegen, Gruppenrichtlinien verteilen, Dateien zentral sichern. Das Lager mit drei PCs ist ebenfalls Teil der Domäne – P2P wäre dort zwar möglich, würde aber die zentrale Verwaltung unterlaufen.`,
        },
        {
          type: 'visual',
          title: 'Anfrage und Antwort im Client-Server-Modell',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['Client (PC Vertrieb)', 'Fileserver', 'ERP-Server'],
              messages: [
                { from: 0, to: 1, label: 'Request: Datei „Angebot.docx“ öffnen' },
                { from: 1, to: 0, label: 'Response: Dateiinhalt', note: 'Server prüft vorher Zugriffsrechte' },
                { from: 0, to: 2, label: 'Request: Kundendaten Nr. 4711' },
                { from: 2, to: 0, label: 'Response: Kundendatensatz' },
              ],
            },
          },
          caption: `Der Client stößt die Kommunikation immer an, der Server reagiert. Ein Client kann mehrere Server nutzen – und ein Server bedient viele Clients gleichzeitig.`,
        },
        {
          type: 'example',
          title: 'Beratung eines Kunden',
          problem: `Ein Kunde von Elektro Krämer – ein Steuerbüro mit **4 Arbeitsplätzen** – möchte wissen, ob es einen Server braucht. Es sollen Mandantendaten gemeinsam genutzt und täglich gesichert werden; die Daten sind sensibel (DSGVO).`,
          steps: [
            { label: 'Größe betrachten', body: `4 Rechner – technisch wäre Peer-to-Peer möglich.` },
            { label: 'Anforderungen prüfen', body: `Sensible Daten erfordern einheitliche Zugriffsrechte und eine **zuverlässige, zentrale Datensicherung**. Bei P2P lägen Daten verteilt, Rechte müssten auf jedem PC einzeln gepflegt werden.` },
            { label: 'Abwägung', body: `Ein kleiner Server (oder ein NAS mit Benutzerverwaltung) zentralisiert Daten und Backup. Mehrkosten stehen höherer Sicherheit und einfacherer Verwaltung gegenüber.` },
          ],
          result: `Empfehlung: **Client-Server** (kleiner Server oder NAS), weil zentrale Datensicherung und Rechteverwaltung wichtiger sind als die geringen Mehrkosten.`,
        },
        {
          type: 'check',
          question: {
            id: 'm01-l03-c1',
            kind: 'multi',
            skill: 'basics.architecture',
            difficulty: 2,
            prompt: `Welche Aussagen treffen auf ein **Peer-to-Peer-Netz** zu? (Mehrere Antworten möglich)`,
            options: [
              'Alle Rechner sind gleichberechtigt.',
              'Benutzerkonten werden zentral verwaltet.',
              'Jeder Rechner kann Dienste anbieten und nutzen.',
              'Die Datensicherung ist aufwendiger als im Client-Server-Netz.',
              'Es eignet sich besonders für große Unternehmen.',
            ],
            answer: [0, 2, 3],
            explanation: `P2P: gleichberechtigte Rechner, jeder ist Anbieter und Nutzer, Daten liegen verteilt (→ aufwendige Sicherung). Zentrale Benutzerverwaltung und Eignung für große Netze sind Merkmale des **Client-Server**-Modells.`,
          },
        },
        {
          type: 'summary',
          points: [
            'Client = fordert Dienst an, Server = stellt Dienst bereit (Request/Response).',
            'Client/Server sind Software-Rollen; ein Rechner kann beides sein.',
            'Client-Server: zentrale Verwaltung, Sicherung, Sicherheit – aber Kosten und Single Point of Failure.',
            'Peer-to-Peer: gleichberechtigt, günstig, dezentral – nur für sehr kleine Netze sinnvoll.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm01-l04',
      title: 'Topologien: Stern, Bus, Ring, Masche',
      minutes: 20,
      relevance: 'ap1',
      skills: ['basics.topologies'],
      simple: `Die **Topologie** ist der Bauplan, wie Geräte miteinander verkabelt sind.
Beim **Stern** hängen alle Geräte an einem Mittelpunkt (Switch) – wie Häuser an einem Kreisverkehr: Ein kaputtes Kabel trifft nur ein Gerät, ein kaputter Mittelpunkt trifft alle.
Beim **Bus** teilen sich alle eine einzige Leitung, beim **Ring** wird reihum weitergegeben.
Bei der **Masche** gibt es mehrere Wege zwischen den Knoten – teurer, aber ausfallsicher (redundant, also doppelt abgesichert).
Firmennetze sind heute meist ein erweiterter Stern (Baum).

**Merke:** Stern = Standard im LAN, Masche = Ausfallsicherheit durch mehrere Wege.`,
      steps: [
        {
          type: 'explain',
          title: 'Was ist eine Topologie?',
          body: `Die **Topologie** beschreibt die **Struktur der Verbindungen** zwischen den Knoten eines Netzes. Man unterscheidet zwei Sichtweisen:

- **Physische Topologie**: Wie sind die Kabel tatsächlich verlegt? (Was siehst du, wenn du im Serverraum stehst?)
- **Logische Topologie**: Wie fließen die Daten bzw. wie greifen die Geräte auf das Medium zu?

Beide können sich unterscheiden – das ist ein beliebtes Prüfungsthema (Beispiele unten).

### Die Grundtopologien

| Topologie | Aufbau | Vorteile | Nachteile | Heute |
|---|---|---|---|---|
| **Stern** | Alle Geräte hängen an einem zentralen Verteiler (Switch) | Ausfall eines Endgeräts/Kabels betrifft nur dieses; leicht erweiterbar; einfache Fehlersuche | Zentraler Verteiler ist Single Point of Failure; viel Kabel | **Standard im Ethernet-LAN** |
| **Erweiterter Stern / Baum** | Mehrere Sterne hierarchisch verbunden | gut strukturierbar, große Netze möglich | Ausfall eines oberen Verteilers trennt ganze Äste | Firmennetze (Etagenswitches am Core) |
| **Bus** | Alle Geräte an einem gemeinsamen Kabel, Enden mit **Abschlusswiderständen (Terminatoren)** | wenig Kabel, billig | Kabelbruch legt alles lahm; Kollisionen; schlecht erweiterbar | historisch (10BASE2/10BASE5 Koax); heute z. B. Feldbusse/CAN in Fahrzeugen |
| **Ring** | Jeder Knoten mit genau zwei Nachbarn, Daten laufen im Kreis | geordneter Zugriff (z. B. Token), keine Kollisionen | ein Ausfall unterbricht den Ring (außer Doppelring) | Token Ring, FDDI (historisch); Ringe in Provider-/Industrienetzen |
| **Vermascht (Masche)** | Knoten über mehrere Wege verbunden; **vollvermascht** = jeder mit jedem | sehr hohe Ausfallsicherheit (Redundanz), alternative Wege | hoher Kabel- und Konfigurationsaufwand | Internet, WAN-Kern, Rechenzentren (teilvermascht) |
| **Zelle** | Funkzellen um eine Basisstation | keine Kabel zu Endgeräten | Störanfällig, geteiltes Medium | WLAN, Mobilfunk |

### Wie viele Verbindungen braucht ein vollvermaschtes Netz?

Jeder der *n* Knoten wird mit jedem der *n − 1* anderen verbunden. Da jede Leitung zwei Knoten verbindet, teilt man durch 2:

**Anzahl Verbindungen = n · (n − 1) / 2**

Beispiel: 5 Standorte → 5 · 4 / 2 = **10** Leitungen. Bei 10 Standorten sind es schon 45 – deshalb wird in der Praxis meist nur **teilvermascht**.

### Physisch ≠ logisch – die zwei Klassiker

1. **Ethernet mit Hub**: Physisch ein **Stern** (alle Kabel zum Hub). Der Hub sendet aber jedes Signal an alle Ports weiter – logisch verhält sich das Netz wie ein **Bus** (gemeinsames Medium, Kollisionen möglich).
2. **Token Ring**: Physisch ein **Stern** (alle Geräte an einem Ringleitungsverteiler, MAU), logisch ein **Ring** (das Token wandert im Kreis von Station zu Station).

Und ein modernes **Ethernet mit Switch**? Physisch Stern – und da der Switch gezielt nur an den Zielport weiterleitet, wird jeder Port zur Punkt-zu-Punkt-Verbindung. Man spricht dann logisch ebenfalls von einem **Stern**.`,
        },
        {
          type: 'visual',
          title: 'Stern- und Maschentopologie im Vergleich',
          widget: {
            kind: 'topology',
            data: {
              zones: [
                { label: 'Stern (LAN)', x: 10, y: 20, w: 380, h: 390, color: 'blue' },
                { label: 'Vollvermascht (4 Router = 6 Links)', x: 410, y: 20, w: 380, h: 390, color: 'orange' },
              ],
              nodes: [
                { id: 'sw', type: 'switch', label: 'Switch', x: 200, y: 215 },
                { id: 'p1', type: 'pc', label: 'PC 1', x: 80, y: 90 },
                { id: 'p2', type: 'pc', label: 'PC 2', x: 320, y: 90 },
                { id: 'p3', type: 'pc', label: 'PC 3', x: 80, y: 340 },
                { id: 'p4', type: 'printer', label: 'Drucker', x: 320, y: 340 },
                { id: 'r1', type: 'router', label: 'R1', x: 490, y: 100 },
                { id: 'r2', type: 'router', label: 'R2', x: 710, y: 100 },
                { id: 'r3', type: 'router', label: 'R3', x: 490, y: 330 },
                { id: 'r4', type: 'router', label: 'R4', x: 710, y: 330 },
              ],
              links: [
                { from: 'p1', to: 'sw' },
                { from: 'p2', to: 'sw' },
                { from: 'p3', to: 'sw' },
                { from: 'p4', to: 'sw' },
                { from: 'r1', to: 'r2', style: 'wan' },
                { from: 'r1', to: 'r3', style: 'wan' },
                { from: 'r1', to: 'r4', style: 'wan' },
                { from: 'r2', to: 'r3', style: 'wan' },
                { from: 'r2', to: 'r4', style: 'wan' },
                { from: 'r3', to: 'r4', style: 'wan' },
              ],
            },
          },
          caption: `Links: Stern – fällt das Kabel zu PC 3 aus, arbeiten alle anderen weiter; fällt der Switch aus, steht alles. Rechts: Vollvermaschung mit 4 Knoten = 4 · 3 / 2 = **6** Verbindungen – jeder Router hat mehrere Wege zu jedem anderen.`,
        },
        {
          type: 'example',
          title: 'Standortvernetzung planen',
          problem: `Elektro Krämer übernimmt zwei weitere Filialen und hat dann **4 Standorte**. Die Geschäftsführung fragt: Wie viele Leitungen wären für eine **Vollvermaschung** nötig, und wie viele für einen **Stern** mit Hannover als Zentrale?`,
          steps: [
            { label: 'Vollvermascht', body: `n = 4 → 4 · 3 / 2 = **6 Verbindungen**.` },
            { label: 'Stern', body: `Jede der 3 Außenstellen wird nur mit Hannover verbunden → **3 Verbindungen** (allgemein n − 1).` },
            { label: 'Bewertung', body: `Der Stern ist günstiger, aber Hannover ist Single Point of Failure, und Verkehr zwischen zwei Filialen läuft immer über die Zentrale. Die Vermaschung ist ausfallsicherer, aber doppelt so viele Leitungen.` },
          ],
          result: `Vollvermascht: 6 Leitungen, Stern: 3 Leitungen. Häufiger Kompromiss: Stern mit redundanter zweiter Leitung (z. B. LTE-Backup) an der Zentrale.`,
        },
        {
          type: 'check',
          question: {
            id: 'm01-l04-c1',
            kind: 'single',
            skill: 'basics.topologies',
            difficulty: 2,
            prompt: `Mehrere PCs sind sternförmig an einen **Hub** angeschlossen. Welche **logische** Topologie liegt vor?`,
            options: ['Bus', 'Stern', 'Ring', 'Masche'],
            answer: 0,
            distractors: {
              '1': { why: 'Physisch ist es ein Stern – logisch verteilt der Hub aber jedes Signal an alle, wie ein gemeinsames Kabel.', error: 'verwechslung-physisch-logisch' },
              '2': { why: 'Ein Hub reicht nichts im Kreis weiter, er wiederholt das Signal an allen Ports gleichzeitig.', error: 'verwechslung-physisch-logisch' },
              '3': { why: 'Es gibt nur einen Weg zwischen zwei Geräten – keine Vermaschung.', error: 'topologie-merkmale' },
            },
            explanation: `Physisch Stern, **logisch Bus**: Der Hub gibt jedes eingehende Signal an alle Ports aus, alle Geräte teilen sich das Medium und es kann zu Kollisionen kommen – genau wie bei einem Buskabel.`,
          },
        },
        {
          type: 'check',
          question: {
            id: 'm01-l04-c2',
            kind: 'number',
            skill: 'basics.topologies',
            difficulty: 2,
            prompt: `Wie viele Verbindungen benötigt ein **vollvermaschtes** Netz mit **6** Knoten?`,
            answer: 15,
            hints: ['Formel: n · (n − 1) / 2'],
            explanation: `6 · 5 / 2 = **15**. Jeder der 6 Knoten hat 5 Partner, jede Verbindung wird dabei doppelt gezählt – daher die Division durch 2.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: Topologien',
          questionIds: ['m01-q013', 'm01-q014', 'm01-q015', 'm01-q016', 'm01-q017'],
          count: 4,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Physische Topologie = Kabelverlauf; logische Topologie = Datenfluss/Medienzugriff.',
            'Stern ist Standard im LAN: robust gegen Endgeräteausfall, zentraler Verteiler = Single Point of Failure.',
            'Bus: gemeinsames Kabel mit Terminatoren, ein Bruch legt alles lahm.',
            'Ring: Daten im Kreis (Token), ein Ausfall unterbricht ohne Doppelring alles.',
            'Vollvermascht: n·(n−1)/2 Verbindungen, maximal ausfallsicher, teuer.',
            'Hub-Netz: physisch Stern, logisch Bus. Token Ring: physisch Stern, logisch Ring.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm01-l05',
      title: 'Netzwerkgeräte und ihre Aufgaben',
      minutes: 25,
      relevance: 'ap1',
      skills: ['basics.devices'],
      simple: `Jedes Netzwerkgerät hat eine feste Aufgabe – wie die Mitarbeitenden in einem Postzentrum.
Der **Hub** (veraltet) ruft jede Nachricht einfach an alle weiter.
Der **Switch** kennt die Hardware-Adressen (MAC-Adressen) der Geräte und stellt im eigenen Netz gezielt zu – wie ein Postbote, der jeden Briefkasten im Haus kennt.
Der **Router** verbindet verschiedene Netze und wählt den Weg anhand der IP-Adresse – wie das Sortierzentrum, das Briefe in andere Städte schickt.
Der **Access Point** bringt WLAN-Geräte ins Kabelnetz, die **Firewall** prüft als Türsteher, welcher Verkehr durchdarf.

**Merke:** Switch = innerhalb eines Netzes (MAC, Schicht 2), Router = zwischen Netzen (IP, Schicht 3).`,
      steps: [
        {
          type: 'explain',
          title: 'Vom Verstärker bis zur Firewall',
          body: `Netzwerkgeräte unterscheiden sich vor allem darin, **wie „klug“ sie Daten weiterleiten** – also welche Information sie auswerten. Das lässt sich später exakt den OSI-Schichten zuordnen (Modul 2). Hier geht es zuerst um das **Was macht das Gerät?**

### Geräte, die nur Signale weitergeben (Schicht 1)

- **Repeater**: Verstärkt bzw. regeneriert ein Signal, um die Reichweite zu erhöhen. Er „versteht“ keine Daten, nur elektrische/optische/Funk-Signale.
- **Hub**: Ein **Multiport-Repeater**. Was an einem Port ankommt, gibt er an **alle anderen Ports** aus. Alle angeschlossenen Geräte teilen sich die Bandbreite und es entstehen Kollisionen. Heute veraltet.
- **Medienkonverter**: Setzt ein Medium in ein anderes um, z. B. **Kupfer (RJ45) ↔ Glasfaser**. Typisch, wenn eine Strecke länger als 100 m ist.
- **Modem** (Modulator/Demodulator): Wandelt digitale Signale in analoge/leitungsgerechte Signale für das Zugangsmedium um und zurück, z. B. DSL-, Kabel- oder Glasfasermodem (ONT). Die meisten „DSL-Router“ für zu Hause sind Kombigeräte aus Modem, Router, Switch, Access Point und Firewall.
- **Patchpanel (Patchfeld)**: **Passives** Bauteil im Netzwerkschrank. Die fest verlegten Kabel zu den Netzwerkdosen enden hier; mit kurzen **Patchkabeln** verbindet man die Ports mit dem Switch. Kein Strom, keine Logik – es sorgt für Ordnung und schont die Installationskabel.

### Geräte, die MAC-Adressen auswerten (Schicht 2)

- **Bridge**: Verbindet zwei Netzsegmente und leitet Frames nur weiter, wenn das Ziel im anderen Segment liegt. Dazu lernt sie die **MAC-Adressen** der Geräte. Trennt Kollisionsdomänen.
- **Switch**: Eine **Multiport-Bridge**. Er lernt, an welchem Port welche MAC-Adresse hängt (**MAC-Adresstabelle / CAM-Tabelle**), und leitet Frames **gezielt nur an den Zielport** weiter. Unbekannte Ziele und Broadcasts flutet er an alle Ports. Jeder Port ist eine eigene Kollisionsdomäne; im Vollduplex gibt es gar keine Kollisionen mehr.
- **Access Point (AP)**: Verbindet WLAN-Clients mit dem kabelgebundenen LAN – eine Art Bridge zwischen Funk und Kabel. Er ist **kein Router**: WLAN-Clients landen im selben IP-Netz wie das LAN, an das er angeschlossen ist.

### Geräte, die IP-Adressen auswerten (Schicht 3)

- **Router**: Verbindet **unterschiedliche IP-Netze** miteinander und entscheidet anhand der **Ziel-IP-Adresse** und seiner **Routingtabelle**, über welche Schnittstelle ein Paket weitergeleitet wird (**Wegwahl / Routing**). Er leitet **keine Broadcasts** weiter und trennt damit Broadcastdomänen. Der Router ist für die Clients das **Standardgateway**.
- **Layer-3-Switch**: Switch mit Routing-Funktion – routet zwischen VLANs in Hardware, typisch im Core eines Firmennetzes.

### Sicherheitsgeräte

- **Firewall**: Kontrolliert den Datenverkehr zwischen Netzen nach **Regeln** (erlauben/verbieten). Einfache **Paketfilter** prüfen IP-Adressen und Ports (Schicht 3/4), **Stateful-Inspection**-Firewalls merken sich Verbindungszustände, **Next-Generation-Firewalls** bzw. Application-Level-Gateways/Proxys prüfen auch Inhalte bis Schicht 7. Eine Firewall steht typischerweise zwischen LAN und Internet und ggf. vor einer DMZ.

### Überblick

| Gerät | Arbeitet mit | Leitet weiter an … | Typische OSI-Schicht |
|---|---|---|---|
| Repeater, Hub | Signalen/Bits | alle (Hub: alle Ports) | 1 |
| Medienkonverter, Modem | Signalen | die andere Seite | 1 |
| Patchpanel | – (passiv) | – | 1 (passive Komponente) |
| Bridge, Switch | MAC-Adressen | gezielt den Zielport | 2 |
| Access Point | MAC-Adressen | zwischen WLAN und LAN | 2 |
| Router | IP-Adressen | das passende Netz (Routing) | 3 |
| Firewall | IP, Ports, ggf. Inhalte | nur erlaubten Verkehr | 3–7 |`,
        },
        {
          type: 'visual',
          title: 'Die Geräte auf einen Blick',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Hub', icon: 'Share2', text: 'Gibt jedes Signal an alle Ports weiter. Eine Kollisionsdomäne. Veraltet.' },
                { title: 'Switch', icon: 'Network', text: 'Lernt MAC-Adressen, leitet gezielt an den Zielport. Jeder Port eigene Kollisionsdomäne.' },
                { title: 'Router', icon: 'Router', text: 'Verbindet IP-Netze, wählt den Weg per Routingtabelle, trennt Broadcastdomänen.' },
                { title: 'Firewall', icon: 'Shield', text: 'Filtert Verkehr nach Regeln (Adressen, Ports, Inhalte).' },
                { title: 'Access Point', icon: 'Wifi', text: 'Bindet WLAN-Clients ans kabelgebundene LAN an (Bridge Funk ↔ Kabel).' },
                { title: 'Modem', icon: 'RadioTower', text: 'Wandelt Signale für die Zugangsleitung um (DSL, Kabel, Glasfaser-ONT).' },
                { title: 'Repeater', icon: 'Repeat', text: 'Regeneriert/verstärkt Signale zur Reichweitenerhöhung.' },
                { title: 'Medienkonverter', icon: 'Cable', text: 'Kupfer ↔ Glasfaser, z. B. für Strecken > 100 m.' },
                { title: 'Patchpanel', icon: 'LayoutGrid', text: 'Passiver Abschluss der Installationskabel im Netzwerkschrank.' },
              ],
            },
          },
          caption: `Faustregel: Je höher die Schicht, desto mehr Informationen wertet das Gerät aus – und desto gezielter (aber auch aufwendiger) kann es entscheiden.`,
        },
        {
          type: 'visual',
          title: 'Wie lernt ein Switch? – MAC-Adresstabelle',
          widget: { kind: 'mac-table' },
          caption: `Der Switch trägt bei jedem eingehenden Frame die **Quell-MAC** mit dem Eingangsport in seine Tabelle ein. Ist die **Ziel-MAC** bekannt, wird gezielt weitergeleitet, sonst geflutet.`,
        },
        {
          type: 'example',
          title: 'Das richtige Gerät für jede Aufgabe',
          problem: `Bei Elektro Krämer stehen folgende Aufgaben an. Welches Gerät wählst du?
1. Die neue Lagerhalle liegt 280 m vom Gebäude entfernt; im Lager steht ein Switch mit Kupferports.
2. Im Besprechungsraum sollen Notebooks ohne Kabel ins Firmennetz.
3. Das Büro-Netz 192.168.10.0/24 und das Produktionsnetz 192.168.20.0/24 sollen kommunizieren können.
4. Im Netzwerkschrank enden 48 Installationskabel der Büros.`,
          steps: [
            { label: '1. 280 m Lagerhalle', body: `Twisted Pair schafft nur 100 m. Lösung: **Glasfaser** verlegen und an beiden Enden per **Medienkonverter** (oder direkt per SFP-Glasfasermodul im Switch) anschließen.` },
            { label: '2. Besprechungsraum', body: `**Access Point**, per Kabel am Switch angeschlossen. Die Notebooks landen im selben Netz wie der Switch-Port (bzw. im dafür vorgesehenen VLAN).` },
            { label: '3. Zwei IP-Netze', body: `Unterschiedliche Netze verbindet ein **Router** (oder Layer-3-Switch) – ein normaler Switch kann das nicht.` },
            { label: '4. 48 Installationskabel', body: `Die Kabel werden auf ein **Patchpanel** aufgelegt; von dort geht es mit Patchkabeln zum Switch.` },
          ],
          result: `Medienkonverter/Glasfaser – Access Point – Router – Patchpanel.`,
        },
        {
          type: 'check',
          question: {
            id: 'm01-l05-c1',
            kind: 'single',
            skill: 'basics.devices',
            difficulty: 1,
            prompt: `Welches Gerät verbindet **unterschiedliche IP-Netze** und trifft Weiterleitungsentscheidungen anhand einer Routingtabelle?`,
            options: ['Router', 'Switch', 'Hub', 'Access Point'],
            answer: 0,
            distractors: {
              '1': { why: 'Ein (Layer-2-)Switch arbeitet mit MAC-Adressen innerhalb eines Netzes.', error: 'verwechslung-switch-router' },
              '2': { why: 'Ein Hub wertet gar keine Adressen aus, er wiederholt nur Signale.', error: 'verwechslung-hub-router' },
              '3': { why: 'Ein Access Point verbindet WLAN mit LAN im selben Netz – er routet nicht.', error: 'verwechslung-ap-router' },
            },
            explanation: `Der **Router** wertet die Ziel-IP-Adresse aus und wählt per Routingtabelle die Schnittstelle. Damit verbindet er verschiedene IP-Netze (Schicht 3).`,
          },
        },
        {
          type: 'check',
          question: {
            id: 'm01-l05-c2',
            kind: 'match',
            skill: 'basics.devices',
            difficulty: 2,
            prompt: `Ordne jedem Gerät seine Hauptaufgabe zu.`,
            left: ['Switch', 'Medienkonverter', 'Firewall', 'Patchpanel'],
            right: [
              'Leitet Frames gezielt anhand der MAC-Adresse weiter',
              'Setzt Kupfer auf Glasfaser um',
              'Filtert Datenverkehr nach Regeln',
              'Passiver Abschluss fest verlegter Kabel',
            ],
            answer: [0, 1, 2, 3],
            explanation: `Switch = MAC-basierte Weiterleitung (Schicht 2). Medienkonverter = Medienwechsel (Schicht 1). Firewall = regelbasierte Filterung. Patchpanel = passiver Kabelabschluss im Schrank.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: Netzwerkgeräte',
          questionIds: ['m01-q018', 'm01-q019', 'm01-q020', 'm01-q021', 'm01-q022', 'm01-q023'],
          count: 5,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Repeater/Hub/Medienkonverter/Modem: reine Signalebene (Schicht 1). Hub = alle Ports.',
            'Bridge/Switch/Access Point: werten MAC-Adressen aus (Schicht 2). Switch = gezielt an den Zielport.',
            'Router: verbindet IP-Netze, Routingtabelle, Standardgateway, blockt Broadcasts (Schicht 3).',
            'Firewall: filtert nach Regeln – je nach Typ Schicht 3/4 bis 7.',
            'Patchpanel: passive Komponente für geordnete Verkabelung.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm01-l06',
      title: 'Kollisionsdomäne und Broadcastdomäne',
      minutes: 20,
      relevance: 'ap1',
      skills: ['basics.domains'],
      simple: `Eine **Kollisionsdomäne** ist wie ein Raum, in dem alle durcheinanderreden: Sprechen zwei gleichzeitig, versteht keiner etwas (Kollision).
Ein Switch gibt jedem Gerät seinen eigenen Raum – jeder Switch-Port ist eine eigene Kollisionsdomäne.
Eine **Broadcastdomäne** ist der Bereich, in dem eine Durchsage „an alle“ (Broadcast) ankommt – wie eine Lautsprecherdurchsage im ganzen Gebäude.
Erst ein Router begrenzt diese Durchsage. Ein Hub trennt gar nichts.

**Merke:** Switch trennt Kollisionsdomänen, Router trennt Broadcastdomänen.`,
      steps: [
        {
          type: 'explain',
          title: 'Zwei Arten von „Reichweite“ im Netz',
          body: `### Kollisionsdomäne

Eine **Kollisionsdomäne** ist der Bereich eines Netzes, in dem sich Geräte ein **gemeinsames Medium teilen** – senden dort zwei Geräte gleichzeitig, **kollidieren** ihre Signale und beide Übertragungen sind unbrauchbar. Klassisches Ethernet regelt das mit **CSMA/CD** (Carrier Sense Multiple Access / Collision Detection): erst lauschen, dann senden; bei Kollision abbrechen, zufällig lange warten, erneut versuchen.

- Ein **Hub** (und ein Repeater) verlängert die Kollisionsdomäne: **alle Ports eines Hubs bilden eine einzige Kollisionsdomäne**.
- Ein **Switch** (und eine Bridge) **trennt** Kollisionsdomänen: **Jeder Switchport ist eine eigene Kollisionsdomäne.** Im heute üblichen **Vollduplex**-Betrieb treten auf diesen Punkt-zu-Punkt-Verbindungen gar keine Kollisionen mehr auf.
- Ein **Router** trennt natürlich ebenfalls Kollisionsdomänen.

### Broadcastdomäne

Ein **Broadcast** ist eine Nachricht an **alle** Geräte eines Netzes (Ziel-MAC \`FF:FF:FF:FF:FF:FF\`). Broadcasts sind nötig, z. B. für **ARP** („Wer hat die IP 192.168.10.1?“) oder **DHCP** („Gibt es hier einen DHCP-Server?“).

Eine **Broadcastdomäne** ist der Bereich, den ein Broadcast erreicht.

- **Hubs und Switches leiten Broadcasts an alle Ports weiter** – sie trennen Broadcastdomänen **nicht**.
- **Router leiten Broadcasts nicht weiter** – **jede Router-Schnittstelle** bildet eine eigene Broadcastdomäne. Eine Broadcastdomäne entspricht in der Regel genau einem **IP-Netz (Subnetz)**.
- **VLANs** (Modul zu VLANs) teilen einen Switch logisch in mehrere Broadcastdomänen.

Warum ist das wichtig? Zu große Broadcastdomänen (hunderte Geräte) erzeugen viel unnötige Last, weil jedes Gerät jeden Broadcast verarbeiten muss – außerdem breiten sich Fehler (z. B. Broadcast-Stürme durch Schleifen) weit aus. Deshalb segmentiert man mit Routern bzw. VLANs.

### Zählregeln für die Prüfung

| Gerät | Kollisionsdomänen | Broadcastdomänen |
|---|---|---|
| Hub | alle Ports zusammen = **1** | trennt nicht |
| Switch (ohne VLAN) | **jeder Port** = 1 eigene | trennt nicht (ganzer Switch = 1) |
| Router | jede Schnittstelle = 1 eigene | **jede Schnittstelle** = 1 eigene |

**Vorgehen beim Zählen:**
1. **Broadcastdomänen**: Zähle die Router-Schnittstellen, an denen ein Netz hängt (bzw. die Zahl der IP-Netze/VLANs).
2. **Kollisionsdomänen**: Zähle jede Leitung, die an einem Switch- oder Routerport endet. Alles, was hinter einem Hub hängt, zählt zusammen mit der Leitung zum Hub als **eine** Domäne.`,
        },
        {
          type: 'visual',
          title: 'Zählbeispiel: Wie viele Domänen sind es?',
          widget: {
            kind: 'topology',
            data: {
              zones: [
                { label: 'Broadcastdomäne 1', x: 10, y: 20, w: 330, h: 390, color: 'blue' },
                { label: 'Broadcastdomäne 2', x: 460, y: 20, w: 330, h: 390, color: 'green' },
              ],
              nodes: [
                { id: 'r', type: 'router', label: 'Router', x: 400, y: 70 },
                { id: 's1', type: 'switch', label: 'Switch 1', x: 200, y: 160 },
                { id: 'a1', type: 'pc', label: 'PC A', x: 60, y: 330 },
                { id: 'a2', type: 'pc', label: 'PC B', x: 170, y: 330 },
                { id: 'a3', type: 'pc', label: 'PC C', x: 280, y: 330 },
                { id: 's2', type: 'switch', label: 'Switch 2', x: 600, y: 160 },
                { id: 'hub', type: 'switch', label: 'Hub', sub: '3 PCs', x: 520, y: 330 },
                { id: 'srv', type: 'server', label: 'Server', x: 700, y: 330 },
              ],
              links: [
                { from: 'r', to: 's1' },
                { from: 'r', to: 's2' },
                { from: 's1', to: 'a1' },
                { from: 's1', to: 'a2' },
                { from: 's1', to: 'a3' },
                { from: 's2', to: 'hub' },
                { from: 's2', to: 'srv' },
              ],
            },
          },
          caption: `Broadcastdomänen: 2 (zwei belegte Router-Schnittstellen). Kollisionsdomänen: R–S1, R–S2, 3 × S1–PC, S2–Hub (inkl. der 3 PCs am Hub), S2–Server = **7**.`,
        },
        {
          type: 'example',
          title: 'Domänen Schritt für Schritt zählen',
          problem: `Im Lager Hildesheim hängt ein **Router** mit einer Schnittstelle an einem **Switch** (8 Ports). Am Switch sind **5 PCs** direkt angeschlossen sowie ein alter **Hub**, an dem **4 Scanner-PCs** hängen. Wie viele Kollisions- und Broadcastdomänen gibt es?`,
          steps: [
            { label: 'Broadcastdomänen', body: `Nur eine Router-Schnittstelle führt in dieses Netz; Switch und Hub trennen Broadcasts nicht → **1 Broadcastdomäne**.` },
            { label: 'Kollisionsdomänen am Switch', body: `Router–Switch: 1. Fünf PCs direkt am Switch: 5. Switch–Hub inklusive der 4 Scanner-PCs: 1.` },
            { label: 'Summe', body: `1 + 5 + 1 = **7 Kollisionsdomänen**.` },
          ],
          result: `**7 Kollisionsdomänen, 1 Broadcastdomäne.** Empfehlung: Hub durch Switch ersetzen – dann wären es 10 Kollisionsdomänen und keine Kollisionen mehr im Vollduplex.`,
        },
        {
          type: 'check',
          question: {
            id: 'm01-l06-c1',
            kind: 'single',
            skill: 'basics.domains',
            difficulty: 2,
            prompt: `Welches Gerät **trennt Broadcastdomänen**?`,
            options: ['Router', 'Switch (ohne VLANs)', 'Hub', 'Repeater'],
            answer: 0,
            distractors: {
              '1': { why: 'Ein Switch leitet Broadcasts an alle Ports weiter; er trennt nur Kollisionsdomänen.', error: 'verwechslung-kollision-broadcast' },
              '2': { why: 'Ein Hub trennt weder Kollisions- noch Broadcastdomänen.', error: 'verwechslung-kollision-broadcast' },
              '3': { why: 'Ein Repeater verstärkt nur Signale und trennt gar nichts.', error: 'verwechslung-kollision-broadcast' },
            },
            explanation: `Router leiten Broadcasts nicht weiter – jede Router-Schnittstelle ist eine eigene Broadcastdomäne (= ein IP-Netz). Switches trennen nur Kollisionsdomänen (mit VLANs auch logisch Broadcastdomänen).`,
          },
        },
        {
          type: 'check',
          question: {
            id: 'm01-l06-c2',
            kind: 'number',
            skill: 'basics.domains',
            difficulty: 2,
            prompt: `Ein Switch mit 24 Ports, an dem **16 PCs** direkt angeschlossen sind (sonst nichts). Wie viele **Kollisionsdomänen** gibt es?`,
            answer: 16,
            hints: ['Jeder belegte Switchport ist eine eigene Kollisionsdomäne.'],
            explanation: `Jede belegte Port-Verbindung ist eine eigene Kollisionsdomäne → **16**. Unbelegte Ports zählen nicht, da dort kein Medium geteilt wird. Broadcastdomäne gibt es genau 1.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: Domänen zählen',
          questionIds: ['m01-q024', 'm01-q025', 'm01-q026', 'm01-q027', 'm01-q028'],
          count: 4,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Kollisionsdomäne: Bereich mit gemeinsam genutztem Medium (Hub = 1 Domäne für alle Ports).',
            'Switch/Bridge trennen Kollisionsdomänen: jeder Port eine eigene; Vollduplex = keine Kollisionen.',
            'Broadcastdomäne: Reichweite eines Broadcasts (FF:FF:FF:FF:FF:FF), entspricht meist einem IP-Netz.',
            'Nur Router (bzw. VLANs) trennen Broadcastdomänen.',
            'Zählen: Broadcastdomänen = Router-Schnittstellen mit Netz; Kollisionsdomänen = Leitungen an Switch-/Routerports.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm01-l07',
      title: 'Typische Firmennetz-Architektur: Core, Distribution, Access und DMZ',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['basics.enterprise'],
      simple: `Ein großes Firmennetz ist aufgebaut wie ein Straßennetz mit Autobahn, Bundesstraße und Wohnstraße.
Der **Core** (Kern) ist die Autobahn: schnelle, doppelt ausgelegte Verbindungen.
Die **Distribution** (Verteilung) ist die Bundesstraße: Sie fasst die Etagen zusammen und regelt den Verkehr zwischen den Netzen.
Der **Access** (Zugang) ist die Wohnstraße, an der PCs, Drucker und Telefone hängen.
Server, die aus dem Internet erreichbar sein müssen, stehen in der **DMZ** (eigenes, abgeschottetes Netzsegment) – wie ein Empfangsraum, in den Besucher dürfen, aber nicht ins Büro.

**Merke:** Endgeräte hängen am Access-Switch; öffentlich erreichbare Server gehören in die DMZ.`,
      steps: [
        {
          type: 'explain',
          title: 'Das hierarchische Drei-Schichten-Modell',
          body: `Größere Firmennetze werden nicht „wild“ verkabelt, sondern **hierarchisch** aufgebaut – ein erweiterter Stern mit klar verteilten Aufgaben:

| Ebene | Aufgabe | Typische Geräte | Bei Elektro Krämer |
|---|---|---|---|
| **Core (Kern)** | Hochgeschwindigkeits-Rückgrat (Backbone); verbindet die Verteilerebenen und Rechenzentrum schnell und **redundant** | leistungsstarke Layer-3-Switches, 10/40/100 Gbit/s, oft Glasfaser | zwei Core-Switches im Serverraum |
| **Distribution (Verteilung)** | fasst Access-Switches zusammen, **Routing zwischen VLANs**, Richtlinien (ACLs), Redundanz | Layer-3-Switches | entfällt (siehe Collapsed Core) |
| **Access (Zugang)** | Anschluss der **Endgeräte** (PCs, Drucker, Telefone, APs); oft PoE | Layer-2-Switches in den Etagenverteilern | ein Switch-Stack je Etage |

**Vorteile der Hierarchie:** übersichtlich, skalierbar (neue Etage = neuer Access-Switch), Fehler bleiben lokal, Redundanz gezielt da, wo sie wichtig ist.

In **kleinen und mittleren Unternehmen (KMU)** wie Elektro Krämer werden Core und Distribution oft in einem Gerät zusammengefasst – man spricht vom **Collapsed Core** (zweistufiges Modell).

### Die DMZ – eine Pufferzone

Eine **DMZ (Demilitarisierte Zone)** ist ein **eigenes Netzsegment** zwischen dem Internet und dem internen LAN. Dort stehen Server, die **aus dem Internet erreichbar** sein müssen – z. B. Webserver, Mail-Relay oder Reverse Proxy.

Die Idee: Wird ein solcher Server gehackt, hat der Angreifer **noch keinen direkten Zugriff aufs interne LAN**, denn auch zwischen DMZ und LAN filtert eine Firewall.

Zwei typische Bauformen:
1. **Eine Firewall mit drei Schnittstellen** („Three-Legged Firewall“): WAN – DMZ – LAN.
2. **Zwei hintereinander geschaltete Firewalls** (äußere und innere Firewall), idealerweise von verschiedenen Herstellern – die DMZ liegt dazwischen.

Typische Regeln (vereinfacht):
- Internet → DMZ: nur die nötigen Dienste (z. B. HTTPS zum Webserver) erlaubt.
- Internet → LAN: grundsätzlich verboten.
- DMZ → LAN: verboten bzw. nur eng begrenzte Ausnahmen.
- LAN → DMZ/Internet: erlaubt nach Bedarf.`,
        },
        {
          type: 'visual',
          title: 'Firmennetz der Elektro Krämer GmbH (Hauptsitz)',
          widget: {
            kind: 'topology',
            data: {
              zones: [
                { label: 'DMZ', x: 560, y: 220, w: 230, h: 190, color: 'orange' },
                { label: 'Core / Serverraum', x: 200, y: 110, w: 340, h: 120, color: 'purple' },
                { label: 'Access (Etagen)', x: 10, y: 250, w: 530, h: 160, color: 'blue' },
              ],
              nodes: [
                { id: 'inet', type: 'internet', label: 'Internet', x: 680, y: 50 },
                { id: 'fw', type: 'firewall', label: 'Firewall', x: 520, y: 50 },
                { id: 'core1', type: 'switch', label: 'Core 1', sub: 'L3', x: 280, y: 170 },
                { id: 'core2', type: 'switch', label: 'Core 2', sub: 'L3', x: 440, y: 170 },
                { id: 'srv', type: 'server', label: 'Server', sub: 'AD, ERP, Files', x: 90, y: 150 },
                { id: 'acc1', type: 'switch', label: 'Access EG', x: 160, y: 300 },
                { id: 'acc2', type: 'switch', label: 'Access OG', x: 400, y: 300 },
                { id: 'pc1', type: 'pc', label: 'PCs EG', x: 60, y: 380 },
                { id: 'ap1', type: 'ap', label: 'AP', x: 260, y: 380 },
                { id: 'pc2', type: 'pc', label: 'PCs OG', x: 480, y: 380 },
                { id: 'web', type: 'server', label: 'Webshop', x: 640, y: 330 },
              ],
              links: [
                { from: 'inet', to: 'fw', style: 'wan' },
                { from: 'fw', to: 'core1', style: 'lan' },
                { from: 'fw', to: 'web', style: 'lan' },
                { from: 'core1', to: 'core2', style: 'fiber', label: '10G' },
                { from: 'srv', to: 'core1', style: 'lan' },
                { from: 'acc1', to: 'core1', style: 'fiber' },
                { from: 'acc1', to: 'core2', style: 'fiber' },
                { from: 'acc2', to: 'core1', style: 'fiber' },
                { from: 'acc2', to: 'core2', style: 'fiber' },
                { from: 'acc1', to: 'pc1', style: 'lan' },
                { from: 'acc1', to: 'ap1', style: 'lan' },
                { from: 'acc2', to: 'pc2', style: 'lan' },
              ],
            },
          },
          caption: `Collapsed Core: Zwei redundante Core-Switches (L3) übernehmen Core- und Distributionsaufgaben. Jeder Access-Switch ist doppelt angebunden. Die Firewall hat drei Beine: Internet, LAN und **DMZ** mit dem Webshop-Server.`,
        },
        {
          type: 'example',
          title: 'Wohin mit dem neuen Webshop-Server?',
          problem: `Elektro Krämer möchte einen eigenen Webshop betreiben, der aus dem Internet erreichbar ist. Ein Kollege schlägt vor, ihn einfach ins Server-VLAN neben das ERP zu stellen und an der Firewall Port 443 freizugeben. Bewerte den Vorschlag.`,
          steps: [
            { label: 'Risiko erkennen', body: `Ein öffentlich erreichbarer Server ist besonders angriffsgefährdet. Steht er im internen LAN und wird kompromittiert, kann der Angreifer von dort direkt ERP, Fileserver und Domain Controller angreifen.` },
            { label: 'Lösung', body: `Webshop in eine **DMZ** stellen. Regeln: Internet → Webshop nur HTTPS (443); Webshop → LAN verboten, außer einer eng begrenzten, notwendigen Verbindung (z. B. zur Artikeldatenbank auf einem definierten Port).` },
            { label: 'Ergebnis', body: `Ein Einbruch in den Webshop bleibt auf die DMZ begrenzt; die Firewall zwischen DMZ und LAN ist eine zweite Verteidigungslinie.` },
          ],
          result: `Vorschlag ablehnen – öffentlich erreichbare Server gehören in eine **DMZ**, nicht ins interne LAN.`,
        },
        {
          type: 'check',
          question: {
            id: 'm01-l07-c1',
            kind: 'single',
            skill: 'basics.enterprise',
            difficulty: 2,
            prompt: `Auf welcher Ebene des hierarchischen Netzwerkmodells werden typischerweise die **Arbeitsplatz-PCs** angeschlossen?`,
            options: ['Access', 'Distribution', 'Core', 'DMZ'],
            answer: 0,
            distractors: {
              '1': { why: 'Die Distribution fasst Access-Switches zusammen und routet zwischen VLANs.', error: 'hierarchie-ebenen' },
              '2': { why: 'Der Core ist das schnelle Rückgrat – dort hängen keine Endgeräte.', error: 'hierarchie-ebenen' },
              '3': { why: 'Die DMZ ist für öffentlich erreichbare Server gedacht, nicht für Arbeitsplätze.', error: 'dmz-zweck' },
            },
            explanation: `Endgeräte (PCs, Drucker, Telefone, Access Points) werden an den **Access-Switches** angeschlossen, meist in den Etagenverteilern.`,
          },
        },
        {
          type: 'summary',
          points: [
            'Hierarchisches Modell: Core (Backbone), Distribution (Zusammenfassung, Inter-VLAN-Routing), Access (Endgeräte).',
            'In KMU oft Collapsed Core: Core und Distribution in einem Gerät.',
            'Redundanz: doppelte Core-Switches und doppelte Uplinks.',
            'DMZ: eigenes Segment für aus dem Internet erreichbare Server, durch Firewall(s) vom LAN getrennt.',
            'Bauformen: Firewall mit drei Schnittstellen oder zwei Firewalls hintereinander.',
          ],
        },
      ],
    },
  ],

  /* ==================================================================== */
  /* Fragenpool                                                            */
  /* ==================================================================== */
  questions: [
    // ---------- basics.terms ----------
    {
      id: 'm01-q001',
      kind: 'single',
      skill: 'basics.terms',
      difficulty: 1,
      prompt: `Was beschreibt ein **Protokoll** in der Netzwerktechnik?`,
      options: [
        'Festgelegte Regeln für Format und Ablauf der Kommunikation',
        'Eine Aufzeichnung aller Netzwerkfehler',
        'Das Kabel zwischen zwei Rechnern',
        'Die Liste aller Benutzer im Netz',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Das wäre eine Logdatei. Im Alltag heißt das zwar auch „Protokoll“, in der Netzwerktechnik meint man aber Kommunikationsregeln.', error: 'grundbegriff-protokoll' },
        '2': { why: 'Das Kabel ist das Übertragungsmedium.', error: 'grundbegriff-protokoll' },
        '3': { why: 'Benutzerlisten verwaltet z. B. ein Verzeichnisdienst – kein Protokoll.', error: 'grundbegriff-protokoll' },
      },
      hints: ['Denke an eine gemeinsame „Sprache“ mit Grammatik.'],
      explanation: `Ein Protokoll legt fest, **wie** Geräte kommunizieren: Aufbau der Nachrichten (Format), Reihenfolge, Bedeutung und das Verhalten bei Fehlern. Beispiele: Ethernet, IP, TCP, HTTP.`,
    },
    {
      id: 'm01-q002',
      kind: 'multi',
      skill: 'basics.terms',
      difficulty: 1,
      prompt: `Welche der folgenden Geräte sind **Hosts** (Endgeräte)? (Mehrere Antworten)`,
      options: ['Netzwerkdrucker', 'Switch', 'Fileserver', 'Notebook', 'Patchpanel'],
      answer: [0, 2, 3],
      hints: ['Ein Host ist Endpunkt der Kommunikation – Ziel oder Quelle von Nutzdaten.'],
      explanation: `Drucker, Server und Notebook sind Kommunikationsendpunkte → **Hosts**. Der Switch ist ein Knoten (Zwischensystem), das Patchpanel ist sogar nur eine passive Komponente.`,
    },
    {
      id: 'm01-q003',
      kind: 'number',
      skill: 'basics.terms',
      difficulty: 2,
      prompt: `Eine Videodatei mit **3 GB** (1 GB = 10⁹ Byte) wird über eine Leitung mit **200 Mbit/s** übertragen. Wie viele **Sekunden** dauert das theoretisch?`,
      answer: 120,
      unit: 's',
      hints: ['Zuerst Byte in Bit umrechnen.', '3 GB = 24 Gbit = 24.000 Mbit.'],
      explanation: `3 GB × 8 = 24 Gbit = 24.000 Mbit. 24.000 Mbit ÷ 200 Mbit/s = **120 s** (2 Minuten). Real dauert es wegen des Protokoll-Overheads etwas länger.`,
    },
    {
      id: 'm01-q004',
      kind: 'single',
      skill: 'basics.terms',
      difficulty: 2,
      prompt: `Ein Mitarbeiter beschwert sich: „Wir haben doch eine 1-Gbit/s-Leitung, warum kopiere ich nur mit ca. 110 MB/s?“ Was ist die beste Erklärung?`,
      options: [
        '110 MB/s entsprechen ca. 880 Mbit/s – das ist der normale Durchsatz nach Abzug des Overheads.',
        'Die Leitung ist defekt, 1 Gbit/s müssten 1.000 MB/s sein.',
        'Der Switch halbiert grundsätzlich die Datenrate.',
        'MB/s und Mbit/s sind dasselbe, also ist die Leitung zu 89 % ausgelastet von anderen.',
      ],
      answer: 0,
      distractors: {
        '1': { why: '1 Gbit/s entspricht maximal 125 MB/s, nicht 1.000 MB/s (Faktor 8!).', error: 'bit-byte-verwechslung' },
        '2': { why: 'Ein Switch halbiert nichts; jeder Port hat seine volle Datenrate.', error: 'switch-funktionsweise' },
        '3': { why: 'MB (Byte) und Mbit unterscheiden sich um Faktor 8.', error: 'bit-byte-verwechslung' },
      },
      hints: ['Rechne 1 Gbit/s in MB/s um.'],
      explanation: `1 Gbit/s ÷ 8 = 125 MB/s theoretisch. Header von Ethernet, IP und TCP sowie Pausen kosten Kapazität – ein **Durchsatz** von ca. 110–118 MB/s ist völlig normal. Die Leitung ist in Ordnung.`,
    },
    // ---------- basics.network-types ----------
    {
      id: 'm01-q005',
      kind: 'match',
      skill: 'basics.network-types',
      difficulty: 1,
      prompt: `Ordne die Netzart der passenden typischen Ausdehnung zu.`,
      left: ['PAN', 'LAN', 'MAN', 'WAN'],
      right: ['wenige Meter', 'Gebäude / Firmengelände', 'Stadt / Region', 'Länder / Kontinente'],
      answer: [0, 1, 2, 3],
      hints: ['P = Personal, L = Local, M = Metropolitan, W = Wide.'],
      explanation: `PAN (Personal) – wenige Meter um eine Person; LAN (Local) – Gebäude/Gelände; MAN (Metropolitan) – Stadtgebiet; WAN (Wide) – große Entfernungen über Provider-Netze.`,
    },
    {
      id: 'm01-q006',
      kind: 'single',
      skill: 'basics.network-types',
      difficulty: 1,
      prompt: `Ein Smartphone ist per **Bluetooth** mit einer Smartwatch verbunden. Um welche Netzart handelt es sich?`,
      options: ['PAN', 'LAN', 'WLAN', 'MAN'],
      answer: 0,
      distractors: {
        '1': { why: 'Ein LAN umfasst Gebäude/Gelände und nutzt meist Ethernet.', error: 'netzart-zuordnung' },
        '2': { why: 'WLAN ist ein Funk-LAN nach IEEE 802.11 – Bluetooth ist ein anderer Standard für sehr kurze Distanzen.', error: 'verwechslung-wlan-bluetooth' },
        '3': { why: 'Ein MAN erstreckt sich über eine Stadt.', error: 'netzart-zuordnung' },
      },
      explanation: `Bluetooth-Verbindungen zwischen persönlichen Geräten im Umkreis weniger Meter bilden ein **PAN** (Personal Area Network), genauer ein WPAN (Wireless PAN).`,
    },
    {
      id: 'm01-q007',
      kind: 'text',
      skill: 'basics.network-types',
      difficulty: 1,
      prompt: `Wofür steht die Abkürzung **WAN**? (ausgeschrieben, englisch)`,
      accept: ['Wide Area Network', 'WideAreaNetwork'],
      placeholder: 'z. B. Local Area Network',
      explanation: `**W**ide **A**rea **N**etwork – ein Weitverkehrsnetz, das große Entfernungen überbrückt, typischerweise über Infrastruktur von Providern.`,
    },
    {
      id: 'm01-q008',
      kind: 'single',
      skill: 'basics.network-types',
      difficulty: 2,
      prompt: `Welche Aussage über das **Internet** ist korrekt?`,
      options: [
        'Es ist ein weltweiter Verbund vieler eigenständiger Netze, die über IP zusammenarbeiten.',
        'Es ist ein einzelnes LAN, das einer Firma gehört.',
        'Es ist ein anderes Wort für WLAN.',
        'Es funktioniert ohne Router.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Das Internet gehört niemandem allein; es besteht aus tausenden Netzen verschiedener Betreiber.', error: 'netzart-zuordnung' },
        '2': { why: 'WLAN ist nur eine Funk-Zugangstechnik für lokale Netze.', error: 'verwechslung-wan-wlan' },
        '3': { why: 'Ohne Router gäbe es keine Verbindung zwischen den einzelnen Netzen.', error: 'grundbegriff-router' },
      },
      explanation: `Das Internet ist ein **Netz der Netze**: Tausende autonome Netze (Provider, Unternehmen, Hochschulen) sind über Router verbunden und verwenden gemeinsam das Internet Protocol (IP).`,
    },
    {
      id: 'm01-q009',
      kind: 'single',
      skill: 'basics.network-types',
      difficulty: 2,
      prompt: `Elektro Krämer möchte das Lager in Hildesheim **sicher über das Internet** an den Hauptsitz anbinden. Welche Technik ist dafür vorgesehen?`,
      options: ['VPN', 'PAN', 'Hub', 'Bus-Topologie'],
      answer: 0,
      distractors: {
        '1': { why: 'Ein PAN reicht nur wenige Meter.', error: 'netzart-zuordnung' },
        '2': { why: 'Ein Hub ist ein lokales Schicht-1-Gerät ohne Sicherheitsfunktion.', error: 'geraet-zweck' },
        '3': { why: 'Eine Topologie beschreibt die Verkabelungsstruktur, keine Absicherung.', error: 'topologie-merkmale' },
      },
      explanation: `Ein **VPN** (Virtual Private Network) baut einen **verschlüsselten Tunnel** über das öffentliche Internet auf. So werden beide Standort-LANs sicher verbunden, ohne eine teure Standleitung zu mieten.`,
    },
    // ---------- basics.architecture ----------
    {
      id: 'm01-q010',
      kind: 'single',
      skill: 'basics.architecture',
      difficulty: 1,
      prompt: `Was kennzeichnet das **Client-Server-Modell**?`,
      options: [
        'Ein Server stellt Dienste bereit, Clients fordern sie an.',
        'Alle Rechner sind gleichberechtigt.',
        'Es gibt keine zentrale Datenhaltung.',
        'Clients beantworten Anfragen des Servers.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Das beschreibt Peer-to-Peer.', error: 'verwechslung-clientserver-p2p' },
        '2': { why: 'Gerade die zentrale Datenhaltung auf dem Server ist typisch für Client-Server.', error: 'verwechslung-clientserver-p2p' },
        '3': { why: 'Umgekehrt: Der Client stellt die Anfrage, der Server antwortet.', error: 'request-response' },
      },
      explanation: `Im Client-Server-Modell gibt es eine klare Rollenverteilung: Der **Server** bietet einen Dienst an, der **Client** stellt Anfragen (Request) und erhält Antworten (Response).`,
    },
    {
      id: 'm01-q011',
      kind: 'free',
      skill: 'basics.architecture',
      difficulty: 2,
      prompt: `**Handlungssituation:** Ein Kunde (Handwerksbetrieb, 12 Arbeitsplätze) arbeitet bisher in einer Windows-Arbeitsgruppe (Peer-to-Peer). Er klagt über „Chaos bei den Freigaben“ und fehlende Datensicherungen.

Erläutern Sie dem Kunden **zwei Vorteile** und **einen Nachteil** eines Client-Server-Netzes gegenüber seiner jetzigen Lösung.`,
      modelAnswer: `Vorteile: (1) **Zentrale Verwaltung** von Benutzern und Zugriffsrechten – Freigaben und Rechte werden an einer Stelle gepflegt statt auf jedem PC einzeln, das beseitigt das Freigaben-Chaos. (2) **Zentrale Datenhaltung und Datensicherung** – alle wichtigen Daten liegen auf dem Server und können dort automatisiert gesichert werden. (Weitere: einheitliche Sicherheitsrichtlinien, bessere Skalierbarkeit.)
Nachteil: **Höhere Kosten** (Serverhardware, Lizenzen, Administration) bzw. der Server ist ein **Single Point of Failure**, wenn er ausfällt und nicht redundant ausgelegt ist.`,
      keywords: ['zentrale Verwaltung', 'Benutzer', 'Rechte', 'Datensicherung', 'Kosten', 'Single Point of Failure'],
      hints: ['Denke an Verwaltung, Datensicherung und Sicherheit.', 'Für den Nachteil: Was passiert, wenn der Server ausfällt? Was kostet er?'],
      explanation: `Die Prüfung erwartet bei „Erläutern“ immer **Aussage + Begründung**. Ein Stichwort wie „zentrale Verwaltung“ reicht nicht – erkläre, **warum** das dem Kunden hilft (Freigaben an einer Stelle statt auf 12 PCs).`,
    },
    {
      id: 'm01-q012',
      kind: 'multi',
      skill: 'basics.architecture',
      difficulty: 2,
      prompt: `Welche Aussagen zum Client-Server-Modell sind **richtig**?`,
      options: [
        'Client und Server sind Rollen von Software; ein Rechner kann beide Rollen haben.',
        'Ein Server kann viele Clients gleichzeitig bedienen.',
        'Ein nicht redundanter Server ist ein Single Point of Failure.',
        'Ein Client-Server-Netz kommt ohne Netzwerkprotokolle aus.',
      ],
      answer: [0, 1, 2],
      hints: ['Ein PC mit Browser und freigegebenem Ordner – welche Rollen hat er?'],
      explanation: `Client/Server sind Software-Rollen (ein PC kann Webbrowser = Client und Dateifreigabe = Server sein). Ein Server bedient viele Clients. Fällt ein einzelner Server aus, ist der Dienst weg (SPoF). Protokolle braucht jedes Netz.`,
    },
    // ---------- basics.topologies ----------
    {
      id: 'm01-q013',
      kind: 'single',
      skill: 'basics.topologies',
      difficulty: 1,
      prompt: `Welche Topologie ist in heutigen Ethernet-LANs **Standard**?`,
      options: ['Stern (bzw. erweiterter Stern)', 'Bus', 'Ring', 'Vollvermascht'],
      answer: 0,
      distractors: {
        '1': { why: 'Bus mit Koaxialkabel war bei frühem Ethernet (10BASE2/5) üblich, ist aber veraltet.', error: 'topologie-merkmale' },
        '2': { why: 'Ringe gibt es bei Token Ring/FDDI (historisch) oder in Provider-/Industrienetzen.', error: 'topologie-merkmale' },
        '3': { why: 'Vollvermaschung ist für Endgeräte viel zu aufwendig.', error: 'topologie-merkmale' },
      },
      explanation: `Twisted-Pair-Ethernet verbindet jedes Endgerät per eigenem Kabel mit einem Switch → **Stern**. Mehrere Switches hierarchisch verbunden ergeben einen erweiterten Stern (Baum).`,
    },
    {
      id: 'm01-q014',
      kind: 'match',
      skill: 'basics.topologies',
      difficulty: 2,
      prompt: `Ordne jeder Topologie den typischen **Nachteil** zu.`,
      left: ['Stern', 'Bus', 'Ring (einfach)', 'Vollvermascht'],
      right: [
        'Ausfall des zentralen Verteilers legt alles lahm',
        'Ein Kabelbruch am gemeinsamen Kabel legt alles lahm',
        'Ausfall eines Knotens unterbricht den Kreis',
        'Sehr hoher Verkabelungsaufwand',
      ],
      answer: [0, 1, 2, 3],
      hints: ['Überlege für jede Topologie: Was ist der „Engpass“?'],
      explanation: `Stern: zentraler Switch = Single Point of Failure. Bus: gemeinsames Medium, ein Bruch (oder fehlender Terminator) stört alle. Ring: ohne Doppelring unterbricht ein Ausfall die Weitergabe. Vollvermascht: n·(n−1)/2 Leitungen.`,
    },
    {
      id: 'm01-q015',
      kind: 'number',
      skill: 'basics.topologies',
      difficulty: 2,
      prompt: `Ein Unternehmen hat **8 Standorte** und möchte sie **vollvermascht** verbinden. Wie viele Leitungen sind nötig?`,
      answer: 28,
      hints: ['n · (n − 1) / 2'],
      explanation: `8 · 7 / 2 = **28** Leitungen. Zum Vergleich: Ein Stern mit Zentrale bräuchte nur 7 Leitungen.`,
    },
    {
      id: 'm01-q016',
      kind: 'single',
      skill: 'basics.topologies',
      difficulty: 2,
      prompt: `Welche Aussage zu **physischer** und **logischer** Topologie ist richtig?`,
      options: [
        'Token Ring ist physisch meist ein Stern, logisch ein Ring.',
        'Physische und logische Topologie sind immer identisch.',
        'Ein Hub-Netz ist logisch ein Ring.',
        'Die logische Topologie beschreibt die Kabelfarben.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Genau das ist ja der Prüfungsklassiker: Sie können sich unterscheiden.', error: 'verwechslung-physisch-logisch' },
        '2': { why: 'Ein Hub-Netz ist logisch ein Bus – alle teilen ein Medium.', error: 'verwechslung-physisch-logisch' },
        '3': { why: 'Die logische Topologie beschreibt den Datenfluss/Medienzugriff.', error: 'verwechslung-physisch-logisch' },
      },
      explanation: `Bei Token Ring werden alle Stationen sternförmig an einen Ringleitungsverteiler (MAU) angeschlossen – der Token läuft aber logisch von Station zu Station im **Ring**.`,
    },
    {
      id: 'm01-q017',
      kind: 'single',
      skill: 'basics.topologies',
      difficulty: 1,
      prompt: `Wozu dienen **Abschlusswiderstände (Terminatoren)** in einer Bus-Topologie?`,
      options: [
        'Sie verhindern Signalreflexionen an den Kabelenden.',
        'Sie verstärken das Signal.',
        'Sie verschlüsseln die Daten.',
        'Sie verbinden den Bus mit dem Internet.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Verstärken macht ein Repeater.', error: 'topologie-merkmale' },
        '2': { why: 'Ein Widerstand kann nicht verschlüsseln.', error: 'topologie-merkmale' },
        '3': { why: 'Dafür braucht man einen Router.', error: 'topologie-merkmale' },
      },
      explanation: `An einem offenen Kabelende würde das Signal **reflektiert** und mit nachfolgenden Signalen überlagert. Der Terminator „schluckt“ das Signal am Ende. Fehlt er, funktioniert der ganze Bus nicht.`,
    },
    // ---------- basics.devices ----------
    {
      id: 'm01-q018',
      kind: 'single',
      skill: 'basics.devices',
      difficulty: 1,
      prompt: `Woran entscheidet ein **Switch**, an welchen Port ein Frame weitergeleitet wird?`,
      options: ['Ziel-MAC-Adresse', 'Ziel-IP-Adresse', 'Portnummer (TCP/UDP)', 'Er sendet immer an alle Ports'],
      answer: 0,
      distractors: {
        '1': { why: 'Die IP-Adresse wertet ein Router aus (Schicht 3).', error: 'verwechslung-switch-router' },
        '2': { why: 'Portnummern sind Schicht 4 – die wertet z. B. eine Firewall aus.', error: 'verwechslung-switchport-tcpport' },
        '3': { why: 'Das macht ein Hub. Ein Switch flutet nur Broadcasts und unbekannte Ziele.', error: 'verwechslung-hub-switch' },
      },
      hints: ['Ein Switch arbeitet auf Schicht 2.'],
      explanation: `Der Switch schaut in seine **MAC-Adresstabelle**: Ist die Ziel-MAC bekannt, wird der Frame nur an den zugehörigen Port gesendet. Unbekannte Ziele und Broadcasts werden geflutet.`,
    },
    {
      id: 'm01-q019',
      kind: 'match',
      skill: 'basics.devices',
      difficulty: 2,
      prompt: `Ordne jedem Gerät die Information zu, die es zur Weiterleitung auswertet.`,
      left: ['Hub', 'Switch', 'Router', 'Paketfilter-Firewall'],
      right: ['nichts – reine Signalwiederholung', 'MAC-Adressen', 'IP-Adressen und Routingtabelle', 'IP-Adressen und Ports anhand von Regeln'],
      answer: [0, 1, 2, 3],
      explanation: `Hub: Schicht 1, keine Adressauswertung. Switch: Schicht 2, MAC. Router: Schicht 3, IP + Routingtabelle. Paketfilter: Schicht 3/4, IP-Adressen und Ports nach Regelwerk.`,
    },
    {
      id: 'm01-q020',
      kind: 'single',
      skill: 'basics.devices',
      difficulty: 2,
      prompt: `Ein Kollege möchte im Lager einen zusätzlichen **Access Point** anschließen und fragt, ob die WLAN-Clients dann in einem anderen IP-Netz landen. Was antwortest du?`,
      options: [
        'Nein, ein Access Point bridgt WLAN ins angeschlossene LAN – die Clients sind im selben Netz (bzw. VLAN).',
        'Ja, ein Access Point ist ein Router und bildet immer ein eigenes Netz.',
        'Ja, weil WLAN-Clients grundsätzlich keine IP-Adressen haben.',
        'Nein, weil WLAN-Clients gar nicht ins LAN kommen.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Ein reiner AP routet nicht. (Heim-„WLAN-Router“ sind Kombigeräte – das ist etwas anderes.)', error: 'verwechslung-ap-router' },
        '2': { why: 'WLAN-Clients haben selbstverständlich IP-Adressen.', error: 'grundbegriff-ip' },
        '3': { why: 'Genau dafür ist der AP da: Er verbindet WLAN-Clients mit dem LAN.', error: 'geraet-zweck' },
      },
      explanation: `Ein Access Point arbeitet wie eine **Bridge** zwischen Funk (802.11) und Kabel (802.3). Er leitet auf Schicht 2 weiter – die Clients erhalten Adressen aus dem Netz/VLAN, an das der AP angeschlossen ist.`,
    },
    {
      id: 'm01-q021',
      kind: 'single',
      skill: 'basics.devices',
      difficulty: 1,
      prompt: `Welches **passive** Bauteil im Netzwerkschrank dient als Abschluss der fest verlegten Installationskabel?`,
      options: ['Patchpanel', 'Switch', 'Medienkonverter', 'Repeater'],
      answer: 0,
      distractors: {
        '1': { why: 'Ein Switch ist aktiv (braucht Strom, wertet MAC-Adressen aus).', error: 'aktiv-passiv' },
        '2': { why: 'Ein Medienkonverter ist aktiv und wandelt Signale um.', error: 'aktiv-passiv' },
        '3': { why: 'Ein Repeater ist aktiv und regeneriert Signale.', error: 'aktiv-passiv' },
      },
      explanation: `Am **Patchpanel** enden die Installationskabel (Verlegekabel) aus den Büros. Mit Patchkabeln werden die Ports flexibel mit dem Switch verbunden. Das Patchpanel braucht keinen Strom → passiv.`,
    },
    {
      id: 'm01-q022',
      kind: 'single',
      skill: 'basics.devices',
      difficulty: 2,
      prompt: `Zwischen zwei Gebäuden liegen **400 m**. Der Switch im Nebengebäude hat nur RJ45-Kupferports. Welche Lösung ist fachlich richtig?`,
      options: [
        'Glasfaser verlegen und auf beiden Seiten Medienkonverter (oder SFP-Module) einsetzen',
        'Cat-6A-Kabel verlegen, das schafft 400 m',
        'Einen Hub in der Mitte des Kabels einsetzen',
        'Ein Patchpanel in der Mitte als Verstärker nutzen',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Twisted Pair (auch Cat 6A) ist auf 100 m Kanallänge begrenzt.', error: 'kupfer-reichweite' },
        '2': { why: 'Technisch zwar Signalregeneration, aber im Außenbereich ohne Strom/Schutz unpraktikabel und veraltet – Glasfaser ist die richtige Lösung.', error: 'geraet-zweck' },
        '3': { why: 'Ein Patchpanel ist passiv und verstärkt nichts.', error: 'aktiv-passiv' },
      },
      explanation: `Für Strecken über 100 m ist **Glasfaser** das Mittel der Wahl (außerdem unempfindlich gegen elektromagnetische Störungen und Potenzialunterschiede zwischen Gebäuden). Ein **Medienkonverter** setzt Glasfaser auf RJ45 um.`,
    },
    {
      id: 'm01-q023',
      kind: 'free',
      skill: 'basics.devices',
      difficulty: 2,
      prompt: `Erläutern Sie den Unterschied zwischen einem **Hub** und einem **Switch** im Hinblick auf die Weiterleitung von Daten und die Auswirkung auf die Netzleistung.`,
      modelAnswer: `Ein **Hub** arbeitet auf Schicht 1: Er wiederholt jedes eingehende Signal an **allen** anderen Ports. Alle Geräte teilen sich die Bandbreite und bilden eine gemeinsame **Kollisionsdomäne**, es kann nur im Halbduplex gearbeitet werden, Kollisionen bremsen das Netz.
Ein **Switch** arbeitet auf Schicht 2: Er lernt die **MAC-Adressen** der angeschlossenen Geräte (MAC-Adresstabelle) und leitet Frames **gezielt nur an den Zielport** weiter. Jeder Port ist eine eigene Kollisionsdomäne, Vollduplex ist möglich, mehrere Verbindungen laufen gleichzeitig mit voller Datenrate – die Netzleistung ist deutlich höher. Zudem ist es sicherer, weil andere Geräte die Frames nicht mitbekommen.`,
      keywords: ['alle Ports', 'MAC-Adresse', 'MAC-Adresstabelle', 'Kollisionsdomäne', 'Vollduplex', 'Zielport'],
      hints: ['Wohin sendet der Hub, wohin der Switch?', 'Welche Rolle spielen MAC-Adressen und Kollisionen?'],
      explanation: `Eine gute Antwort nennt für beide Geräte die **Weiterleitungsart** und leitet daraus die **Folgen** ab (Kollisionen, geteilte vs. dedizierte Bandbreite, Duplex).`,
    },
    // ---------- basics.domains ----------
    {
      id: 'm01-q024',
      kind: 'single',
      skill: 'basics.domains',
      difficulty: 1,
      prompt: `Wie viele **Kollisionsdomänen** bildet ein Hub mit 8 angeschlossenen PCs?`,
      options: ['1', '8', '9', '0'],
      answer: 0,
      distractors: {
        '1': { why: '8 wäre richtig bei einem Switch. Ein Hub verbindet alle Ports zu einem gemeinsamen Medium.', error: 'verwechslung-hub-switch' },
        '2': { why: 'Der Hub selbst ist keine zusätzliche Domäne.', error: 'domaenen-zaehlen' },
        '3': { why: 'Wo ein Medium geteilt wird, gibt es eine Kollisionsdomäne.', error: 'domaenen-zaehlen' },
      },
      explanation: `Ein Hub wiederholt alle Signale an allen Ports – alle 8 PCs teilen sich ein Medium → **1 Kollisionsdomäne**.`,
    },
    {
      id: 'm01-q025',
      kind: 'table',
      skill: 'basics.domains',
      difficulty: 2,
      prompt: `Vervollständige die Tabelle: Trennt das Gerät Kollisions- bzw. Broadcastdomänen? (ja/nein) und auf welcher OSI-Schicht arbeitet es hauptsächlich?`,
      columns: [
        { key: 'geraet', label: 'Gerät', type: 'text' },
        { key: 'schicht', label: 'OSI-Schicht', type: 'number' },
        { key: 'kd', label: 'trennt Kollisionsdomänen', type: 'text' },
        { key: 'bd', label: 'trennt Broadcastdomänen', type: 'text' },
      ],
      rows: [
        { cells: { geraet: { given: 'Hub' }, schicht: { answer: '1' }, kd: { answer: 'nein', accept: ['nein', 'n'] }, bd: { answer: 'nein', accept: ['nein', 'n'] } } },
        { cells: { geraet: { given: 'Switch (ohne VLAN)' }, schicht: { answer: '2' }, kd: { answer: 'ja', accept: ['ja', 'j'] }, bd: { answer: 'nein', accept: ['nein', 'n'] } } },
        { cells: { geraet: { given: 'Router' }, schicht: { answer: '3' }, kd: { answer: 'ja', accept: ['ja', 'j'] }, bd: { answer: 'ja', accept: ['ja', 'j'] } } },
      ],
      hints: ['Je höher die Schicht, desto mehr trennt das Gerät.'],
      explanation: `Hub (1): trennt nichts. Switch (2): jeder Port eigene Kollisionsdomäne, Broadcasts werden aber geflutet. Router (3): trennt beides – Broadcasts werden nicht weitergeleitet.`,
    },
    {
      id: 'm01-q026',
      kind: 'number',
      skill: 'basics.domains',
      difficulty: 3,
      prompt: `Ein Router hat **3 Schnittstellen**, an jeder hängt ein Switch. An Switch A hängen 4 PCs, an Switch B 6 PCs, an Switch C ein Hub mit 5 PCs. Wie viele **Kollisionsdomänen** gibt es insgesamt?`,
      answer: 14,
      hints: [
        'Zähle jede Verbindung, die an einem Switch- oder Routerport endet.',
        'Router–Switch-Verbindungen: 3. Alles hinter dem Hub zählt zusammen als eine Domäne.',
      ],
      explanation: `Router–Switches: 3. Switch A: 4. Switch B: 6. Switch C–Hub (inkl. 5 PCs): 1. Summe 3 + 4 + 6 + 1 = **14**. Broadcastdomänen wären es 3.`,
    },
    {
      id: 'm01-q027',
      kind: 'number',
      skill: 'basics.domains',
      difficulty: 2,
      prompt: `Gleiches Netz wie zuvor: Router mit 3 belegten Schnittstellen, dahinter je ein Switch (ohne VLANs). Wie viele **Broadcastdomänen** gibt es?`,
      answer: 3,
      hints: ['Nur Router trennen Broadcastdomänen.'],
      explanation: `Jede Router-Schnittstelle mit angeschlossenem Netz bildet eine eigene Broadcastdomäne → **3**. Switches und Hubs leiten Broadcasts weiter und trennen nicht.`,
    },
    {
      id: 'm01-q028',
      kind: 'single',
      skill: 'basics.domains',
      difficulty: 2,
      prompt: `Warum ist eine **sehr große Broadcastdomäne** (z. B. 800 Geräte in einem Netz) problematisch?`,
      options: [
        'Jeder Broadcast muss von allen Geräten verarbeitet werden – das erzeugt unnötige Last.',
        'Broadcasts werden vom Switch verworfen, daher funktioniert DHCP nicht.',
        'Es entstehen mehr Kollisionen am Router.',
        'Große Broadcastdomänen sind kein Problem, nur große Kollisionsdomänen.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Switches leiten Broadcasts an alle Ports weiter – genau das ist ja das Problem.', error: 'verwechslung-kollision-broadcast' },
        '2': { why: 'Kollisionen haben mit der Größe der Broadcastdomäne nichts zu tun.', error: 'verwechslung-kollision-broadcast' },
        '3': { why: 'Viele Broadcasts belasten Netz und Geräte; zudem breiten sich Störungen weit aus.', error: 'verwechslung-kollision-broadcast' },
      },
      explanation: `ARP, DHCP und andere Dienste erzeugen Broadcasts. In einer großen Broadcastdomäne erreicht jeder davon alle Geräte, die ihn verarbeiten müssen. Lösung: **Segmentierung** mit Routern bzw. VLANs.`,
    },
    {
      id: 'm01-q029',
      kind: 'text',
      skill: 'basics.domains',
      difficulty: 2,
      prompt: `Wie lautet die **MAC-Broadcastadresse** in hexadezimaler Schreibweise (mit Doppelpunkten)?`,
      accept: ['FF:FF:FF:FF:FF:FF', 'ff:ff:ff:ff:ff:ff', 'FF-FF-FF-FF-FF-FF', 'FFFF.FFFF.FFFF', 'FFFFFFFFFFFF'],
      placeholder: 'XX:XX:XX:XX:XX:XX',
      explanation: `Die Broadcast-MAC besteht aus 48 Einsen: **FF:FF:FF:FF:FF:FF**. Ein Frame mit diesem Ziel wird von Switches an alle Ports (der Broadcastdomäne) geflutet.`,
    },
    // ---------- basics.enterprise ----------
    {
      id: 'm01-q030',
      kind: 'order',
      skill: 'basics.enterprise',
      difficulty: 2,
      prompt: `Bringe die Ebenen des hierarchischen Netzwerkmodells in die Reihenfolge **vom Endgerät zum Backbone**.`,
      items: ['Access', 'Distribution', 'Core'],
      explanation: `Endgeräte hängen an **Access**-Switches, diese werden auf **Distribution**-Ebene zusammengefasst, und die Distribution-Switches sind über den **Core** (Backbone) verbunden.`,
    },
    {
      id: 'm01-q031',
      kind: 'single',
      skill: 'basics.enterprise',
      difficulty: 2,
      prompt: `Welche Server gehören typischerweise in eine **DMZ**?`,
      options: [
        'Server, die aus dem Internet erreichbar sein müssen (z. B. Webserver)',
        'Domain Controller mit allen Benutzerkonten',
        'Die interne ERP-Datenbank',
        'Die Arbeitsplatz-PCs der Geschäftsführung',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Der Domain Controller ist hochsensibel und gehört ins geschützte interne Netz.', error: 'dmz-zweck' },
        '2': { why: 'Interne Datenbanken gehören ins LAN/Server-VLAN, nicht in eine exponierte Zone.', error: 'dmz-zweck' },
        '3': { why: 'Arbeitsplätze sind im internen LAN (Access-Ebene).', error: 'dmz-zweck' },
      },
      explanation: `In die DMZ kommen **öffentlich erreichbare Dienste** (Webserver, Mail-Relay, Reverse Proxy). Wird einer davon kompromittiert, schützt die Firewall zwischen DMZ und LAN das interne Netz.`,
    },
    {
      id: 'm01-q032',
      kind: 'single',
      skill: 'basics.enterprise',
      difficulty: 2,
      prompt: `Was versteht man unter einem **Collapsed Core**?`,
      options: [
        'Core- und Distributionsebene werden in einem Gerät/einer Ebene zusammengefasst.',
        'Ein ausgefallener Core-Switch.',
        'Ein Netz ganz ohne Switches.',
        'Die Zusammenlegung von DMZ und LAN.',
      ],
      answer: 0,
      distractors: {
        '1': { why: '„Collapsed“ meint hier „zusammengelegt“, nicht „kaputt“.', error: 'hierarchie-ebenen' },
        '2': { why: 'Auch ein Collapsed Core besteht aus Switches.', error: 'hierarchie-ebenen' },
        '3': { why: 'DMZ und LAN sollen gerade getrennt bleiben.', error: 'dmz-zweck' },
      },
      explanation: `In kleineren Netzen lohnt sich keine eigene Distributionsebene. Leistungsstarke Layer-3-Switches übernehmen Core- und Distributionsaufgaben gemeinsam – ein **zweistufiges** Modell.`,
    },
    {
      id: 'm01-q033',
      kind: 'free',
      skill: 'basics.enterprise',
      difficulty: 3,
      prompt: `**Handlungssituation:** Elektro Krämer möchte einen Webserver für Kundenbestellungen betreiben. Die Geschäftsführung fragt, warum dafür eine „DMZ“ eingerichtet werden soll, obwohl doch schon eine Firewall vorhanden ist.

Erläutern Sie Zweck und Aufbau einer DMZ.`,
      modelAnswer: `Eine DMZ ist ein **eigenes, durch Firewall(s) abgetrenntes Netzsegment** zwischen Internet und internem LAN. Dort stehen Server, die **aus dem Internet erreichbar** sein müssen, z. B. der Webserver. Zweck: Öffentlich erreichbare Server sind besonders angriffsgefährdet. Wird der Webserver kompromittiert, hat der Angreifer **keinen direkten Zugriff auf das interne LAN**, weil auch der Verkehr von der DMZ ins LAN von der Firewall gefiltert bzw. verboten wird (zweite Verteidigungslinie).
Aufbau: entweder **eine Firewall mit drei Schnittstellen** (Internet, DMZ, LAN) oder **zwei Firewalls** hintereinander, zwischen denen die DMZ liegt. Regeln: Internet → DMZ nur benötigte Dienste (z. B. HTTPS), Internet → LAN verboten, DMZ → LAN verboten bzw. stark eingeschränkt.`,
      keywords: ['Netzsegment', 'Firewall', 'aus dem Internet erreichbar', 'kompromittiert', 'internes LAN geschützt', 'drei Schnittstellen', 'zwei Firewalls'],
      hints: ['Was passiert, wenn der Webserver im internen LAN stünde und gehackt würde?', 'Nenne die zwei üblichen Bauformen.'],
      explanation: `Bei „Erläutern“ gehören Zweck (Warum?) und Aufbau (Wie?) dazu. Der Kernpunkt: Eine Firewall allein schützt nicht, wenn der öffentlich erreichbare Server **im** internen Netz steht.`,
    },
    // ---------- gemischt / Handlungssituationen ----------
    {
      id: 'm01-q034',
      kind: 'single',
      skill: 'basics.devices',
      difficulty: 3,
      prompt: `**Handlungssituation:** Im Lager Hildesheim sind die PCs im Netz 192.168.20.0/24, im Hauptsitz im Netz 192.168.10.0/24. Ein Azubi verbindet beide Netze testweise mit einem zusätzlichen **Switch** – die Rechner erreichen sich trotzdem nicht. Warum?`,
      options: [
        'Ein Switch verbindet keine unterschiedlichen IP-Netze; dafür ist ein Router nötig.',
        'Der Switch hat zu wenige Ports.',
        'Switches können grundsätzlich keine Daten zwischen Gebäuden übertragen.',
        'Die MAC-Adressen sind in verschiedenen Netzen gleich.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Die Portanzahl hat mit der Netzzugehörigkeit nichts zu tun.', error: 'verwechslung-switch-router' },
        '2': { why: 'Entfernung ist eine Frage des Mediums, nicht des Switches.', error: 'verwechslung-switch-router' },
        '3': { why: 'MAC-Adressen sind (praktisch) weltweit eindeutig – das ist nicht das Problem.', error: 'grundbegriff-mac' },
      },
      hints: ['Welches Gerät verbindet unterschiedliche IP-Netze?'],
      explanation: `Ein Host sendet Pakete an ein **fremdes** Netz immer an sein **Standardgateway** (Router). Ein Switch arbeitet nur auf Schicht 2 innerhalb eines Netzes – zwischen 192.168.10.0/24 und 192.168.20.0/24 muss **geroutet** werden.`,
    },
    {
      id: 'm01-q035',
      kind: 'multi',
      skill: 'basics.topologies',
      difficulty: 2,
      prompt: `Welche Aussagen zur **Sterntopologie** sind richtig?`,
      options: [
        'Fällt ein Endgerät aus, arbeiten die anderen weiter.',
        'Der zentrale Verteiler ist ein Single Point of Failure.',
        'Neue Geräte lassen sich leicht ergänzen.',
        'Sie benötigt Abschlusswiderstände an den Enden.',
        'Sie benötigt weniger Kabel als ein Bus.',
      ],
      answer: [0, 1, 2],
      hints: ['Terminatoren gehören zu einer anderen Topologie.'],
      explanation: `Stern: robust gegenüber Endgeräteausfällen, leicht erweiterbar, aber zentraler Verteiler = SPoF. Terminatoren sind ein Bus-Merkmal, und der Stern braucht **mehr** Kabel als ein Bus (jedes Gerät eigene Leitung).`,
    },
    {
      id: 'm01-q036',
      kind: 'single',
      skill: 'basics.devices',
      difficulty: 1,
      prompt: `Wofür steht „Modem“?`,
      options: ['Modulator/Demodulator', 'Modular Device Manager', 'Mobile Data Emitter', 'Multi-Domain Exchange Module'],
      answer: 0,
      distractors: {
        '1': { why: 'Erfundene Bezeichnung.', error: 'abkuerzung' },
        '2': { why: 'Erfundene Bezeichnung.', error: 'abkuerzung' },
        '3': { why: 'Erfundene Bezeichnung.', error: 'abkuerzung' },
      },
      explanation: `Ein **Mo**dulator/**Dem**odulator wandelt digitale Daten in ein für die Zugangsleitung geeignetes Signal um (Modulation) und zurück (Demodulation), z. B. bei DSL oder Kabelanschluss.`,
    },
    {
      id: 'm01-q037',
      kind: 'order',
      skill: 'basics.network-types',
      difficulty: 1,
      prompt: `Ordne die Netzarten nach ihrer typischen Ausdehnung – **von klein nach groß**.`,
      items: ['PAN', 'LAN', 'MAN', 'WAN', 'GAN'],
      explanation: `PAN (Meter) → LAN (Gebäude) → MAN (Stadt) → WAN (Länder) → GAN (global).`,
    },
    {
      id: 'm01-q038',
      kind: 'single',
      skill: 'basics.domains',
      difficulty: 3,
      prompt: `An einem Switch arbeiten alle Ports im **Vollduplex**. Wie verhält es sich mit Kollisionen?`,
      options: [
        'Es treten keine Kollisionen auf, CSMA/CD wird nicht benötigt.',
        'Kollisionen sind doppelt so häufig wie im Halbduplex.',
        'Kollisionen werden vom Router aufgelöst.',
        'Vollduplex ist nur mit Hubs möglich.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Vollduplex hat getrennte Sende- und Empfangswege – Kollisionen sind physikalisch ausgeschlossen.', error: 'duplex-kollision' },
        '2': { why: 'Ein Router hat mit Kollisionen im LAN-Segment nichts zu tun.', error: 'verwechslung-kollision-broadcast' },
        '3': { why: 'Hubs arbeiten nur im Halbduplex.', error: 'verwechslung-hub-switch' },
      },
      explanation: `Im Vollduplex sendet und empfängt jedes Gerät gleichzeitig über getrennte Adernpaare zu einem dedizierten Switchport. Es gibt kein geteiltes Medium mehr → **keine Kollisionen**, CSMA/CD ist abgeschaltet.`,
    },
  ],
};
