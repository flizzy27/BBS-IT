import type { Module } from '../types';

export const m10: Module = {
  id: 'm10',
  nr: 10,
  title: 'Netzwerkprotokolle',
  short: `TCP und UDP, Ports und die wichtigsten Dienste – ARP, ICMP, DHCP, DNS, HTTP(S), SSH, E-Mail & Co. – mit typischen Kommunikationsabläufen.`,
  icon: 'ArrowLeftRight',
  relevance: 'ap1',
  prerequisites: ['m02'],
  skills: [
    { id: 'proto.tcpudp', module: 'm10', title: 'TCP und UDP unterscheiden' },
    { id: 'proto.tcp', module: 'm10', title: 'TCP-Verbindungsauf- und -abbau, Sequenznummern', requires: ['proto.tcpudp'] },
    { id: 'proto.ports', module: 'm10', title: 'Ports, Portbereiche und Port-Zuordnung', requires: ['proto.tcpudp'] },
    { id: 'proto.arp', module: 'm10', title: 'ARP: IP- in MAC-Adressen auflösen' },
    { id: 'proto.icmp', module: 'm10', title: 'ICMP: Ping und Fehlermeldungen' },
    { id: 'proto.dhcp', module: 'm10', title: 'DHCP: automatische Adressvergabe (DORA)', requires: ['proto.ports'] },
    { id: 'proto.dns', module: 'm10', title: 'DNS: Namensauflösung', requires: ['proto.ports'] },
    { id: 'proto.web', module: 'm10', title: 'HTTP und HTTPS', requires: ['proto.tcp', 'proto.dns'] },
    { id: 'proto.remote', module: 'm10', title: 'Fernzugriff: SSH, Telnet, RDP', requires: ['proto.ports'] },
    { id: 'proto.files', module: 'm10', title: 'Dateiübertragung: FTP, SFTP, FTPS, SMB', requires: ['proto.ports'] },
    { id: 'proto.mail', module: 'm10', title: 'E-Mail: SMTP, IMAP, POP3', requires: ['proto.ports'] },
    { id: 'proto.services', module: 'm10', title: 'Infrastrukturdienste: NTP, SNMP, LDAP', requires: ['proto.ports'] },
  ],
  generators: [],
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'm10-l01',
      title: 'TCP und UDP – die Transportschicht',
      minutes: 25,
      relevance: 'ap1',
      skills: ['proto.tcpudp'],
      steps: [
        {
          type: 'explain',
          title: 'Wozu eine Transportschicht?',
          body: `IP (Schicht 3) bringt ein Paket von einem **Rechner** zu einem anderen Rechner. Auf dem Server der **Elektro Krämer GmbH** laufen aber gleichzeitig ein Webserver, ein Mailserver und ein Fernwartungsdienst. Woher weiß das Betriebssystem, welche **Anwendung** das Paket bekommen soll? Und wer kümmert sich darum, wenn unterwegs Pakete verloren gehen?

Das ist die Aufgabe der **Transportschicht (OSI-Schicht 4)**. Sie bietet zwei Protokolle an:

- **TCP** (*Transmission Control Protocol*) – **verbindungsorientiert** und **zuverlässig**.
- **UDP** (*User Datagram Protocol*) – **verbindungslos** und **schnell**, aber ohne Garantie.

Beide verwenden **Portnummern** (16 Bit, 0–65535), um Anwendungen zu adressieren. Die PDU heißt bei TCP **Segment**, bei UDP **Datagramm**.`,
        },
        {
          type: 'explain',
          title: 'TCP vs. UDP im Vergleich',
          body: `| Merkmal | TCP | UDP |
|---|---|---|
| Verbindung | **verbindungsorientiert** (3-Way-Handshake vor der Datenübertragung) | **verbindungslos** (sendet sofort) |
| Zuverlässigkeit | **Bestätigungen (ACK)**, verlorene Segmente werden **neu gesendet** | keine Bestätigung, kein erneutes Senden |
| Reihenfolge | **Sequenznummern** sorgen für richtige Reihenfolge | keine Garantie |
| Flusskontrolle | ja (**Window**: Empfänger bestimmt, wie viel er annehmen kann) | nein |
| Header | mind. **20 Byte** | **8 Byte** |
| Geschwindigkeit/Overhead | mehr Overhead, etwas langsamer | wenig Overhead, geringe Verzögerung |
| Typische Dienste | HTTP/HTTPS, SSH, FTP, SMTP, IMAP, POP3, RDP, SMB | DNS (Standardanfragen), DHCP, NTP, SNMP, TFTP, VoIP/RTP, Streaming, Online-Spiele |

**Bild zum Merken:** TCP ist ein **Einschreiben mit Rückschein** – du weißt sicher, dass es ankommt, aber es dauert länger. UDP ist eine **Postkarte** – schnell und billig, aber ob sie ankommt, erfährst du nicht.

**Wann nimmt man UDP?** Wenn **Geschwindigkeit wichtiger** ist als perfekte Zuverlässigkeit (VoIP: ein verlorenes Sprachpaket stört weniger als Verzögerung) oder wenn es nur um **kurze Frage-Antwort-Vorgänge** geht (DNS, DHCP, NTP) – da wäre ein Verbindungsaufbau mehr Aufwand als die eigentliche Nachricht. Muss die Anwendung zuverlässig sein, kann sie das selbst erledigen (z. B. DNS fragt einfach erneut).

**Hinweis Vertiefung:** Das moderne **HTTP/3** läuft über **QUIC**, das auf UDP aufsetzt und Zuverlässigkeit und Verschlüsselung selbst mitbringt.`,
        },
        {
          type: 'visual',
          title: 'TCP und UDP im Schichtenmodell',
          widget: { kind: 'layers', data: { mode: 'compare', highlight: [4], showPdu: true, showProtocols: true } },
          caption: `TCP und UDP liegen auf Schicht 4 (Transport), direkt über IP. Darüber liegen die Anwendungsprotokolle (Schicht 5–7 bzw. Anwendungsschicht im TCP/IP-Modell).`,
        },
        {
          type: 'example',
          title: 'TCP oder UDP? Entscheidungen bei der Elektro Krämer GmbH',
          problem: `Ordne den folgenden Anwendungen TCP oder UDP zu und begründe: (a) Download einer 2-GB-Datei vom Fileserver, (b) VoIP-Telefonat zwischen Hamburg und Berlin, (c) Zeitabgleich der PCs mit dem Zeitserver, (d) Zugriff auf das Webportal des ERP-Systems.`,
          steps: [
            { label: '(a) Datei-Download', body: `Jedes Bit muss stimmen, sonst ist die Datei kaputt → **TCP** (SMB über TCP 445).` },
            { label: '(b) VoIP', body: `Echtzeit: Verzögerung stört mehr als ein verlorenes Paket → **UDP** (RTP über UDP).` },
            { label: '(c) Zeitabgleich', body: `Kurze Frage/Antwort, Verzögerung würde die Zeit verfälschen → **UDP** (NTP, Port 123).` },
            { label: '(d) Webportal', body: `Webseiten müssen vollständig ankommen → **TCP** (HTTPS, Port 443).` },
          ],
          result: `TCP für zuverlässige Datenübertragung (a, d), UDP für Echtzeit und kurze Anfragen (b, c).`,
        },
        {
          type: 'check',
          question: {
            id: 'm10-l01-c1',
            kind: 'multi',
            skill: 'proto.tcpudp',
            difficulty: 1,
            prompt: `Welche Eigenschaften gehören zu **TCP**? (Mehrfachauswahl)`,
            options: ['verbindungsorientiert', 'Bestätigung empfangener Daten (ACK)', 'Header mit nur 8 Byte', 'Sequenznummern', 'keine Fehlerkorrektur durch Neusenden'],
            answer: [0, 1, 3],
            explanation: `TCP: verbindungsorientiert, ACKs, Sequenznummern, Neusenden. 8-Byte-Header und kein Neusenden sind Merkmale von **UDP**.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: TCP und UDP',
          questionIds: ['m10-q001', 'm10-q002', 'm10-q003', 'm10-q004'],
          count: 3,
          difficulty: 1,
        },
        {
          type: 'summary',
          points: [
            'Transportschicht (4) adressiert Anwendungen über Ports und regelt die Zuverlässigkeit.',
            'TCP: verbindungsorientiert, ACKs, Sequenznummern, Neusenden, Flusskontrolle, Header ≥ 20 Byte.',
            'UDP: verbindungslos, keine Garantie, schnell, Header 8 Byte.',
            'TCP für HTTP(S), SSH, Mail, SMB; UDP für DNS, DHCP, NTP, SNMP, VoIP, Streaming.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm10-l02',
      title: 'TCP im Detail: Handshake, Sequenznummern, Abbau',
      minutes: 20,
      relevance: 'ap1',
      skills: ['proto.tcp'],
      steps: [
        {
          type: 'explain',
          title: 'Der 3-Way-Handshake',
          body: `Bevor TCP Nutzdaten überträgt, bauen Client und Server eine **Verbindung** auf. Dafür werden drei Segmente ausgetauscht – der **3-Way-Handshake**:

1. **SYN**: Der Client schickt ein Segment mit gesetztem **SYN-Flag** (*synchronize*) und seiner Start-Sequenznummer (z. B. x).
2. **SYN-ACK**: Der Server antwortet mit **SYN** (eigene Start-Sequenznummer y) und **ACK** (Bestätigungsnummer x+1 = „ich erwarte als Nächstes x+1“).
3. **ACK**: Der Client bestätigt mit **ACK** (Bestätigungsnummer y+1). Die Verbindung steht.

Erst danach fließen die eigentlichen Daten (z. B. die HTTP-Anfrage).

Ist auf dem Zielport kein Dienst aktiv, antwortet der Server auf das SYN mit **RST** (*reset*) – „Verbindung abgelehnt“. Filtert eine Firewall den Port, kommt meist **gar keine** Antwort (Timeout).`,
        },
        {
          type: 'visual',
          title: '3-Way-Handshake',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['Client 192.168.10.20:50123', 'Webserver :443'],
              messages: [
                { from: 0, to: 1, label: 'SYN, Seq=1000', note: 'Ich möchte eine Verbindung.' },
                { from: 1, to: 0, label: 'SYN-ACK, Seq=5000, Ack=1001', note: 'Einverstanden, ich erwarte Byte 1001.' },
                { from: 0, to: 1, label: 'ACK, Ack=5001', note: 'Verbindung steht.' },
                { from: 0, to: 1, label: 'Daten (z. B. TLS ClientHello)' },
              ],
            },
          },
          caption: `Die Startsequenznummern werden zufällig gewählt. Die Bestätigungsnummer gibt immer an, welches Byte als nächstes erwartet wird.`,
        },
        {
          type: 'explain',
          title: 'Sequenznummern, Bestätigungen und Flusskontrolle',
          body: `**Sequenznummern** nummerieren die übertragenen **Bytes**. Der Empfänger kann damit
- Segmente in die **richtige Reihenfolge** bringen,
- **Duplikate** erkennen,
- **Lücken** feststellen.

Mit der **Bestätigungsnummer (ACK)** teilt der Empfänger mit, bis wohin er alles erhalten hat. Bleibt eine Bestätigung aus, sendet der Sender nach einem Timeout **erneut** (*Retransmission*).

**Flusskontrolle** (grob): Der Empfänger nennt im Feld **Window** (*Empfangsfenster*), wie viele Bytes er noch aufnehmen kann. Der Sender darf höchstens so viel unbestätigt „unterwegs“ haben. So wird ein langsamer Empfänger nicht überflutet. (Davon zu unterscheiden ist die **Überlastkontrolle**, mit der TCP auf ein verstopftes Netz reagiert – Vertiefung.)

**Verbindungsabbau:** Jede Seite beendet ihre Senderichtung mit **FIN**, die Gegenseite bestätigt mit **ACK**. Klassisch sind das **vier** Segmente (FIN → ACK, FIN → ACK); oft werden ACK und FIN der zweiten Seite in einem Segment kombiniert. Ein **RST** bricht eine Verbindung sofort ab.`,
        },
        {
          type: 'visual',
          title: 'Verbindungsabbau',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['Client', 'Server'],
              messages: [
                { from: 0, to: 1, label: 'FIN', note: 'Ich sende nichts mehr.' },
                { from: 1, to: 0, label: 'ACK' },
                { from: 1, to: 0, label: 'FIN', note: 'Ich auch nicht.' },
                { from: 0, to: 1, label: 'ACK', note: 'Verbindung geschlossen.' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Bestätigungsnummern berechnen',
          problem: `Nach dem Handshake schickt der Client (nächste Sequenznummer 1001) ein Segment mit 500 Byte Nutzdaten. Welche Sequenznummer trägt das Segment, und welche Bestätigungsnummer schickt der Server zurück?`,
          steps: [
            { label: 'Sequenznummer', body: `Das Segment beginnt mit Byte **1001** → Seq = 1001.` },
            { label: 'Umfang', body: `500 Byte → Bytes 1001 bis 1500.` },
            { label: 'Bestätigung', body: `Der Server erwartet als Nächstes Byte **1501** → Ack = 1501.` },
          ],
          result: `Seq = 1001, Ack = 1501.`,
        },
        {
          type: 'check',
          question: {
            id: 'm10-l02-c1',
            kind: 'order',
            skill: 'proto.tcp',
            difficulty: 1,
            prompt: `Bringe die Segmente des TCP-Verbindungsaufbaus in die richtige Reihenfolge.`,
            items: ['SYN (Client → Server)', 'SYN-ACK (Server → Client)', 'ACK (Client → Server)'],
            explanation: `SYN → SYN-ACK → ACK: der **3-Way-Handshake**.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: TCP',
          questionIds: ['m10-q005', 'm10-q006', 'm10-q007', 'm10-q008'],
          count: 3,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            '3-Way-Handshake: SYN → SYN-ACK → ACK.',
            'Sequenznummern zählen Bytes; Ack-Nummer = nächstes erwartetes Byte.',
            'Fehlende Bestätigung → Neusenden; Window-Feld → Flusskontrolle.',
            'Abbau mit FIN/ACK in beide Richtungen; RST bricht sofort ab bzw. lehnt ab.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm10-l03',
      title: 'Ports und die wichtigsten Dienste',
      minutes: 30,
      relevance: 'ap1',
      skills: ['proto.ports'],
      steps: [
        {
          type: 'explain',
          title: 'Ports und Sockets',
          body: `Eine **Portnummer** ist eine 16-Bit-Zahl (**0–65535**), die eine Anwendung auf einem Rechner adressiert. Ein Dienst „lauscht“ auf einem festen Port (z. B. Webserver auf 443). Der Client nutzt als **Quellport** einen zufälligen hohen Port.

Die Kombination **IP-Adresse + Port** (+ Protokoll TCP/UDP) heißt **Socket**, z. B. \`192.168.10.20:50123\`. Eine TCP-Verbindung ist eindeutig durch **Quell-IP, Quellport, Ziel-IP, Zielport und Protokoll** bestimmt. Deshalb kann ein PC gleichzeitig viele Browser-Tabs zum selben Server öffnen – jeder hat einen anderen Quellport.

**Portbereiche (IANA):**

| Bereich | Name | Verwendung |
|---|---|---|
| **0–1023** | **Well-known Ports** (System Ports) | Standarddienste (HTTP, SSH, DNS …) |
| **1024–49151** | **Registered Ports** (User Ports) | bei der IANA registrierte Anwendungen (z. B. RDP 3389) |
| **49152–65535** | **Dynamic/Private Ports** (ephemeral) | vom Client zufällig gewählte Quellports |

(Manche Betriebssysteme nutzen für Quellports einen etwas anderen Bereich, z. B. Linux standardmäßig 32768–60999.)`,
        },
        {
          type: 'explain',
          title: 'Die Port-Tabelle für die Prüfung',
          body: `Diese Ports solltest du sicher beherrschen:

| Port | Protokoll | Transport | Dienst |
|---|---|---|---|
| **20 / 21** | FTP | TCP | Datei-Übertragung: 21 = Steuerung, 20 = Daten (aktiver Modus) |
| **22** | SSH (auch SFTP, SCP) | TCP | verschlüsselter Fernzugriff / Dateiübertragung |
| **23** | Telnet | TCP | unverschlüsselter Fernzugriff (veraltet) |
| **25** | SMTP | TCP | Mailtransport zwischen Servern |
| **53** | DNS | **UDP** und TCP | Namensauflösung |
| **67 / 68** | DHCP | UDP | 67 = Server, 68 = Client |
| **69** | TFTP | UDP | einfacher Dateitransfer (z. B. Firmware, PXE) |
| **80** | HTTP | TCP | Web unverschlüsselt |
| **110** | POP3 | TCP | Mails abholen |
| **123** | NTP | UDP | Zeitsynchronisation |
| **143** | IMAP | TCP | Mails auf dem Server verwalten |
| **161 / 162** | SNMP | UDP | 161 = Abfragen an Agenten, 162 = Traps an Manager |
| **389** | LDAP | TCP (und UDP) | Verzeichnisdienst |
| **443** | HTTPS | TCP (HTTP/3: UDP) | Web verschlüsselt (TLS) |
| **445** | SMB | TCP | Windows-Dateifreigaben |
| **465** | SMTPS | TCP | SMTP mit implizitem TLS |
| **587** | SMTP Submission | TCP | Mailversand vom Client (mit STARTTLS) |
| **636** | LDAPS | TCP | LDAP über TLS |
| **993** | IMAPS | TCP | IMAP über TLS |
| **995** | POP3S | TCP | POP3 über TLS |
| **3389** | RDP | TCP (und UDP) | Windows-Remotedesktop |

**Lerntipp:** Bilde Paare „unverschlüsselt → verschlüsselt“: HTTP 80 → HTTPS 443, IMAP 143 → IMAPS 993, POP3 110 → POP3S 995, LDAP 389 → LDAPS 636, Telnet 23 → SSH 22.`,
        },
        {
          type: 'visual',
          title: 'Dienste nach Einsatzbereich',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Web', text: 'HTTP 80, HTTPS 443', icon: 'Globe' },
                { title: 'Fernzugriff', text: 'SSH 22, Telnet 23, RDP 3389', icon: 'Terminal' },
                { title: 'Dateien', text: 'FTP 20/21, SFTP 22, SMB 445, TFTP 69', icon: 'FolderOpen' },
                { title: 'E-Mail', text: 'SMTP 25/587/465, IMAP 143/993, POP3 110/995', icon: 'Mail' },
                { title: 'Namen & Adressen', text: 'DNS 53, DHCP 67/68', icon: 'Server' },
                { title: 'Zeit', text: 'NTP 123/UDP', icon: 'Clock' },
                { title: 'Überwachung', text: 'SNMP 161/162 UDP', icon: 'Activity' },
                { title: 'Verzeichnis', text: 'LDAP 389, LDAPS 636', icon: 'Key' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Firewall-Freigaben für die DMZ planen',
          problem: `Die Elektro Krämer GmbH betreibt in der DMZ einen Webserver (Website mit HTTPS) und einen Mailserver, der Mails aus dem Internet empfängt. Mitarbeitende im Außendienst rufen ihre Mails per IMAP verschlüsselt ab und versenden per Submission. Welche Ports müssen aus dem Internet erreichbar sein?`,
          steps: [
            { label: 'Webserver', body: `HTTPS → **TCP 443**. (Oft zusätzlich TCP 80 nur für die Weiterleitung auf HTTPS.)` },
            { label: 'Mailempfang aus dem Internet', body: `Andere Mailserver liefern per SMTP → **TCP 25**.` },
            { label: 'Mailabruf Außendienst', body: `IMAP verschlüsselt → **TCP 993**.` },
            { label: 'Mailversand Außendienst', body: `Submission → **TCP 587** (STARTTLS) bzw. **465** (SMTPS).` },
          ],
          result: `TCP 443 (Web), 25 (SMTP), 993 (IMAPS), 587 bzw. 465 (Submission). Alles andere bleibt geschlossen – Telnet, RDP oder SMB gehören **nie** offen ins Internet.`,
        },
        {
          type: 'check',
          question: {
            id: 'm10-l03-c1',
            kind: 'single',
            skill: 'proto.ports',
            difficulty: 1,
            prompt: `Welcher Portbereich umfasst die **Well-known Ports**?`,
            options: ['0–1023', '1024–49151', '49152–65535', '0–65535'],
            answer: 0,
            distractors: {
              '1': { why: 'Das sind die Registered Ports.', error: 'port-range' },
              '2': { why: 'Das sind die dynamischen/privaten Ports.', error: 'port-range' },
              '3': { why: 'Das ist der gesamte Portbereich.', error: 'port-range' },
            },
            explanation: `Well-known: **0–1023**, Registered: 1024–49151, Dynamic/Private: 49152–65535.`,
          },
        },
        {
          type: 'practice',
          title: 'Port-Training',
          questionIds: ['m10-q009', 'm10-q010', 'm10-q011', 'm10-q012', 'm10-q013', 'm10-q014', 'm10-q015', 'm10-q016', 'm10-q017', 'm10-q018', 'm10-q019', 'm10-q020', 'm10-q021', 'm10-q022'],
          count: 8,
          difficulty: 1,
        },
        {
          type: 'summary',
          points: [
            'Ports (0–65535) adressieren Anwendungen; Socket = IP + Port.',
            'Well-known 0–1023, Registered 1024–49151, Dynamic/Private 49152–65535.',
            'Wichtige Paare: HTTP 80/HTTPS 443, IMAP 143/993, POP3 110/995, LDAP 389/636, Telnet 23 → SSH 22.',
            'UDP-Dienste: DNS 53 (auch TCP), DHCP 67/68, NTP 123, SNMP 161/162, TFTP 69.',
            'Weitere: FTP 20/21, SMTP 25/587/465, SMB 445, RDP 3389.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm10-l04',
      title: 'ARP und ICMP',
      minutes: 25,
      relevance: 'ap1',
      skills: ['proto.arp', 'proto.icmp'],
      steps: [
        {
          type: 'explain',
          title: 'ARP – von der IP- zur MAC-Adresse',
          body: `Du weißt schon: Ein PC kennt die **IP-Adresse** des Ziels (bzw. des Gateways), braucht für den Ethernet-Frame aber die **MAC-Adresse**. Die Brücke schlägt das **ARP** (*Address Resolution Protocol*).

**Ablauf:**

1. Der PC schaut zuerst in seinen **ARP-Cache** (Tabelle IP ↔ MAC). Steht der Eintrag drin, ist er fertig.
2. Sonst sendet er einen **ARP-Request als Broadcast** (Ziel-MAC \`FF:FF:FF:FF:FF:FF\`): *„Wer hat 192.168.10.1? Sag es 192.168.10.20.“*
3. Alle Geräte im Netz empfangen den Request, aber nur das Gerät mit dieser IP antwortet: mit einem **ARP-Reply als Unicast** direkt an den Fragenden: *„192.168.10.1 ist bei 00:1A:2B:3C:4D:5E.“*
4. Der PC speichert die Zuordnung im **ARP-Cache** (Einträge verfallen nach einiger Zeit) und sendet den eigentlichen Frame.

Wichtige Punkte:

- ARP funktioniert **nur im lokalen Netz** (Broadcastdomäne). Für entfernte Ziele fragt der PC per ARP nach der MAC seines **Gateways**.
- ARP wird **direkt in Ethernet-Frames** transportiert (EtherType \`0x0806\`), nicht in IP-Paketen. Man ordnet es zwischen Schicht 2 und 3 ein.
- ARP-Cache anzeigen: \`arp -a\` (Windows/Linux), unter Linux auch \`ip neigh\`.
- **Gratuitous ARP**: Ein Gerät kündigt die eigene IP/MAC unaufgefordert an (z. B. nach dem Start, zur Erkennung doppelter IPs).
- **Sicherheit:** ARP hat keine Authentifizierung → **ARP-Spoofing** (gefälschte Replies, Man-in-the-Middle). Gegenmaßnahme z. B. Dynamic ARP Inspection auf Switches.
- **IPv6** verwendet kein ARP, sondern **NDP** (*Neighbor Discovery Protocol*) über ICMPv6.`,
        },
        {
          type: 'visual',
          title: 'ARP-Ablauf',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['PC 192.168.10.20', 'Switch', 'Gateway 192.168.10.1', 'Drucker 192.168.10.50'],
              messages: [
                { from: 0, to: 1, label: 'ARP-Request (Broadcast): Wer hat 192.168.10.1?' },
                { from: 1, to: 2, label: 'Flooding: Request' },
                { from: 1, to: 3, label: 'Flooding: Request', note: 'Drucker: nicht meine IP → ignorieren' },
                { from: 2, to: 1, label: 'ARP-Reply (Unicast): 192.168.10.1 ist 00:1A:2B:3C:4D:5E' },
                { from: 1, to: 0, label: 'Forwarding: Reply', note: 'PC speichert Eintrag im ARP-Cache' },
              ],
            },
          },
          caption: `Request = Broadcast an alle, Reply = Unicast nur an den Fragenden.`,
        },
        {
          type: 'explain',
          title: 'ICMP – das Melde- und Diagnoseprotokoll',
          body: `**ICMP** (*Internet Control Message Protocol*) gehört zur **Schicht 3**. Es transportiert **Status- und Fehlermeldungen** von IP und wird für Diagnose genutzt. ICMP läuft direkt in IP (Protokollnummer 1) und hat **keine Ports**.

| Typ | Name | Bedeutung / Einsatz |
|---|---|---|
| **8** | **Echo Request** | „Bist du da?“ – von \`ping\` gesendet |
| **0** | **Echo Reply** | „Ja, bin da.“ – Antwort auf ping |
| **3** | **Destination Unreachable** | Ziel nicht erreichbar (Netz/Host/Port unerreichbar, z. B. keine Route) |
| **11** | **Time Exceeded** | TTL ist 0 geworden – genutzt von \`tracert\`/\`traceroute\` |
| 5 | Redirect | Router teilt einem Host einen besseren Next Hop mit |

**Ping richtig deuten:**

| Ausgabe | Bedeutung |
|---|---|
| „Antwort von 192.168.20.50: Zeit=12ms TTL=126“ | Ziel erreichbar, 2 Router dazwischen (Windows-Start-TTL 128) |
| „Zeitüberschreitung der Anforderung“ | keine Antwort – Ziel aus, Firewall blockt ICMP, oder Rückweg fehlt |
| „Zielhost nicht erreichbar“ | Destination Unreachable, oft von einem Router auf dem Weg |

Achtung: Viele Firewalls (z. B. die Windows-Firewall) blocken **eingehende Echo Requests** standardmäßig. Ein fehlgeschlagener Ping heißt daher **nicht** zwingend, dass das Gerät aus ist.`,
        },
        {
          type: 'example',
          title: 'Fehlersuche mit Ping und ARP',
          problem: `Ein PC (192.168.10.20/24) erreicht den Server 192.168.10.80 nicht. Du pingst den Server: Zeitüberschreitung. Danach zeigt \`arp -a\` einen Eintrag für 192.168.10.80 mit gültiger MAC. Was schließt du daraus?`,
          steps: [
            { label: 'ARP-Eintrag vorhanden', body: `Der Server hat auf den ARP-Request geantwortet → er ist **eingeschaltet** und auf Schicht 2 erreichbar, die Verkabelung bis zu ihm funktioniert.` },
            { label: 'Ping scheitert', body: `Die Echo Requests werden nicht beantwortet → vermutlich **blockt die Host-Firewall** des Servers ICMP.` },
            { label: 'Nächster Schritt', body: `Den eigentlichen Dienst testen, z. B. \`Test-NetConnection 192.168.10.80 -Port 445\` (PowerShell), statt auf Ping zu vertrauen.` },
          ],
          result: `Gerät läuft (ARP ok), ICMP wird gefiltert. Ping allein ist kein Beweis für „Gerät aus“.`,
        },
        {
          type: 'check',
          question: {
            id: 'm10-l04-c1',
            kind: 'single',
            skill: 'proto.arp',
            difficulty: 1,
            prompt: `Wie wird ein **ARP-Request** versendet?`,
            options: ['Als Unicast an das Gateway', 'Als Broadcast an alle Geräte im lokalen Netz', 'Als Multicast an alle Router', 'Als ICMP-Nachricht'],
            answer: 1,
            distractors: {
              '0': { why: 'Die MAC des Gateways ist ja gerade unbekannt – Unicast ist unmöglich.', error: 'arp-unicast' },
              '2': { why: 'ARP nutzt Broadcast, nicht Multicast. (IPv6-NDP nutzt Multicast.)', error: 'arp-multicast' },
              '3': { why: 'ARP ist ein eigenes Protokoll direkt in Ethernet, kein ICMP.', error: 'arp-icmp' },
            },
            explanation: `Request = **Broadcast** (Ziel-MAC FF:FF:FF:FF:FF:FF), Reply = **Unicast**.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: ARP und ICMP',
          questionIds: ['m10-q023', 'm10-q024', 'm10-q025', 'm10-q026', 'm10-q027', 'm10-q028'],
          count: 4,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'ARP löst IPv4-Adressen in MAC-Adressen auf: Request per Broadcast, Reply per Unicast.',
            'Ergebnisse landen im ARP-Cache (arp -a); ARP funktioniert nur im lokalen Netz.',
            'ICMP (Schicht 3, ohne Ports): Echo Request 8 / Echo Reply 0 (ping), Destination Unreachable 3, Time Exceeded 11 (tracert).',
            'Ein fehlgeschlagener Ping kann auch an einer Firewall liegen.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm10-l05',
      title: 'DHCP und DNS',
      minutes: 30,
      relevance: 'ap1',
      skills: ['proto.dhcp', 'proto.dns'],
      steps: [
        {
          type: 'explain',
          title: 'DHCP – IP-Konfiguration automatisch',
          body: `Bei 120 PCs in Hamburg will niemand jede IP-Adresse von Hand eintragen. Das übernimmt **DHCP** (*Dynamic Host Configuration Protocol*, **UDP**, Server-Port **67**, Client-Port **68**).

Ein DHCP-Server vergibt aus einem **Adressbereich (Scope/Pool)** eine IP-Adresse für eine bestimmte Zeit (**Lease**) und liefert zusätzlich **Optionen**: Subnetzmaske, **Standardgateway** (Router, Option 3), **DNS-Server** (Option 6), Domänenname, Lease-Dauer u. a.

**Ablauf – DORA:**

| Schritt | Nachricht | Richtung / Art |
|---|---|---|
| **D** | **DHCPDISCOVER** – „Gibt es hier einen DHCP-Server?“ | Client → **Broadcast** (Quelle 0.0.0.0:68, Ziel 255.255.255.255:67) |
| **O** | **DHCPOFFER** – „Du kannst 192.168.10.57 haben.“ | Server → Client (Broadcast oder Unicast, je nach Client) |
| **R** | **DHCPREQUEST** – „Ich nehme das Angebot von Server X.“ | Client → **Broadcast** (damit alle Server erfahren, welches Angebot gewählt wurde) |
| **A** | **DHCPACK** – „Bestätigt, Lease gilt 8 Tage.“ | Server → Client |

Weitere Begriffe:
- **Lease-Verlängerung:** Nach **50 %** der Lease-Zeit fragt der Client per Unicast beim Server nach Verlängerung; klappt das nicht, ab **87,5 %** per Broadcast bei jedem Server.
- **DHCPNAK:** Der Server lehnt ab (z. B. Client wurde in ein anderes Netz umgesteckt).
- **Reservierung:** Fest zugeordnete IP für eine bestimmte **MAC-Adresse** (z. B. für Drucker).
- **DHCP-Relay** (*ip helper-address*): Broadcasts gehen nicht über Router. Steht der DHCP-Server in einem anderen Netz/VLAN, leitet ein Relay-Agent auf dem Router die Anfragen als Unicast an den Server weiter.
- **APIPA:** Findet ein Windows-Client keinen DHCP-Server, gibt er sich selbst eine Adresse aus **169.254.0.0/16** → typisches Fehlersymptom!
- Befehle: \`ipconfig /release\`, \`ipconfig /renew\`, \`ipconfig /all\`.`,
        },
        {
          type: 'visual',
          title: 'DHCP-Ablauf (DORA)',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['Client (noch ohne IP)', 'DHCP-Server 192.168.10.5'],
              messages: [
                { from: 0, to: 1, label: 'DHCPDISCOVER (Broadcast)', note: '0.0.0.0:68 → 255.255.255.255:67' },
                { from: 1, to: 0, label: 'DHCPOFFER: 192.168.10.57/24, GW .1, DNS .5' },
                { from: 0, to: 1, label: 'DHCPREQUEST (Broadcast)', note: 'Ich nehme das Angebot von 192.168.10.5' },
                { from: 1, to: 0, label: 'DHCPACK: Lease 8 Tage', note: 'Client konfiguriert IP, prüft sie oft per ARP' },
              ],
            },
          },
          caption: `Merkwort DORA: Discover, Offer, Request, Acknowledge.`,
        },
        {
          type: 'explain',
          title: 'DNS – das Telefonbuch des Netzes',
          body: `Menschen merken sich Namen (\`www.elektro-kraemer.de\`), Computer brauchen IP-Adressen. **DNS** (*Domain Name System*, Port **53**) übersetzt Namen in Adressen und umgekehrt.

**Transport:** Normale Anfragen über **UDP 53** (schnell, kurz). **TCP 53** für **Zonentransfers** zwischen DNS-Servern und für große Antworten.

**Aufbau – hierarchisch:** Wurzel „.“ (Root) → Top-Level-Domain (\`de\`, \`com\`) → Second-Level-Domain (\`elektro-kraemer\`) → Host/Subdomain (\`www\`). Ein vollständiger Name heißt **FQDN** (*Fully Qualified Domain Name*), z. B. \`www.elektro-kraemer.de.\`

**Ablauf einer Abfrage:**

1. Der PC prüft seinen **DNS-Cache** (und die \`hosts\`-Datei).
2. Er fragt seinen konfigurierten **DNS-Server (Resolver)** – **rekursiv**: „Liefere mir bitte die fertige Antwort.“
3. Kennt der Resolver die Antwort nicht aus seinem Cache, fragt er **iterativ** nach: **Root-Server** („frag die .de-Server“) → **TLD-Server** \`.de\` („frag den Server von elektro-kraemer.de“) → **autoritativer Server** der Domain → liefert die IP.
4. Der Resolver gibt die Antwort an den PC und **cacht** sie für die Dauer der **TTL** des Eintrags.

**Wichtige Record-Typen:**

| Typ | Inhalt |
|---|---|
| **A** | Name → **IPv4**-Adresse |
| **AAAA** | Name → **IPv6**-Adresse |
| **CNAME** | Alias → anderer Name |
| **MX** | Mailserver der Domain (mit Priorität) |
| **NS** | zuständige Nameserver der Zone |
| **PTR** | IP → Name (**Reverse Lookup**) |
| **SOA** | Verwaltungsangaben der Zone |
| **TXT** | freier Text, z. B. SPF für Mail |

Befehle: \`nslookup www.elektro-kraemer.de\`, \`ipconfig /displaydns\`, \`ipconfig /flushdns\`.`,
        },
        {
          type: 'visual',
          title: 'DNS-Abfrage',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['PC', 'DNS-Resolver (intern)', 'Root-Server', 'TLD-Server .de', 'Autoritativer DNS'],
              messages: [
                { from: 0, to: 1, label: 'Rekursive Anfrage: A-Record www.elektro-kraemer.de?' },
                { from: 1, to: 2, label: 'www.elektro-kraemer.de?' },
                { from: 2, to: 1, label: 'Verweis: frag die .de-Server' },
                { from: 1, to: 3, label: 'www.elektro-kraemer.de?' },
                { from: 3, to: 1, label: 'Verweis: frag ns1.elektro-kraemer.de' },
                { from: 1, to: 4, label: 'www.elektro-kraemer.de?' },
                { from: 4, to: 1, label: 'A 203.0.113.80 (TTL 3600)' },
                { from: 1, to: 0, label: 'Antwort: 203.0.113.80', note: 'Resolver cacht die Antwort' },
              ],
            },
          },
          caption: `PC → Resolver: rekursiv. Resolver → Root/TLD/autoritativ: iterativ (jeweils Verweise). Alles über UDP 53.`,
        },
        {
          type: 'example',
          title: 'Fehlersuche: „Das Internet geht nicht“',
          problem: `Ein PC in Berlin meldet: Keine Webseite lädt. \`ipconfig\` zeigt 169.254.23.17 / 255.255.0.0, kein Gateway. Ein Kollege hat dasselbe Problem nicht. Was ist los?`,
          steps: [
            { label: 'Adresse deuten', body: `169.254.x.x = **APIPA** → der PC hat **keine Antwort von einem DHCP-Server** bekommen.` },
            { label: 'Mögliche Ursachen', body: `Kabel/Port defekt, Switchport im falschen VLAN, DHCP-Server bzw. DHCP-Relay nicht erreichbar, Pool erschöpft.` },
            { label: 'Vorgehen', body: `Link-LED/Kabel prüfen, Switchport-VLAN prüfen, dann \`ipconfig /renew\`. Da der Kollege funktioniert, liegt das Problem eher am Port/Kabel/VLAN dieses PCs als am Server.` },
          ],
          result: `APIPA-Adresse = DHCP hat nicht geklappt. Ohne gültige IP, Gateway und DNS geht weder Namensauflösung noch Internet.`,
        },
        {
          type: 'check',
          question: {
            id: 'm10-l05-c1',
            kind: 'order',
            skill: 'proto.dhcp',
            difficulty: 1,
            prompt: `Bringe die DHCP-Nachrichten in die richtige Reihenfolge.`,
            items: ['DHCPDISCOVER', 'DHCPOFFER', 'DHCPREQUEST', 'DHCPACK'],
            explanation: `**DORA**: Discover → Offer → Request → Acknowledge.`,
          },
        },
        {
          type: 'check',
          question: {
            id: 'm10-l05-c2',
            kind: 'single',
            skill: 'proto.dns',
            difficulty: 2,
            prompt: `Welcher DNS-Record-Typ liefert zu einem Namen die **IPv6**-Adresse?`,
            options: ['A', 'AAAA', 'PTR', 'MX'],
            answer: 1,
            distractors: {
              '0': { why: 'A liefert eine IPv4-Adresse.', error: 'dns-record' },
              '2': { why: 'PTR ist für Reverse Lookup (IP → Name).', error: 'dns-record' },
              '3': { why: 'MX nennt den Mailserver einer Domain.', error: 'dns-record' },
            },
            explanation: `**AAAA** („Quad-A“) = IPv6 – viermal so lang wie IPv4 (128 statt 32 Bit).`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: DHCP und DNS',
          questionIds: ['m10-q029', 'm10-q030', 'm10-q031', 'm10-q032', 'm10-q033', 'm10-q034', 'm10-q035'],
          count: 5,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'DHCP (UDP 67 Server / 68 Client) vergibt IP, Maske, Gateway, DNS – Ablauf DORA.',
            'Discover und Request sind Broadcasts; Relay-Agent nötig, wenn der Server in einem anderen Netz steht.',
            'APIPA 169.254.x.x = kein DHCP-Server erreicht.',
            'DNS (Port 53, meist UDP, TCP für Zonentransfer/große Antworten) übersetzt Namen in IPs.',
            'Client → Resolver rekursiv, Resolver → Root/TLD/autoritativ iterativ; Records A, AAAA, CNAME, MX, NS, PTR.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm10-l06',
      title: 'Web, Fernzugriff und Dateiübertragung',
      minutes: 30,
      relevance: 'ap1',
      skills: ['proto.web', 'proto.remote', 'proto.files'],
      steps: [
        {
          type: 'explain',
          title: 'HTTP und HTTPS',
          body: `**HTTP** (*Hypertext Transfer Protocol*, **TCP 80**) überträgt Webseiten im Klartext nach dem Prinzip **Anfrage/Antwort**: Der Browser schickt eine Anfrage mit einer **Methode** (z. B. \`GET\` = abrufen, \`POST\` = Daten senden), der Server antwortet mit einem **Statuscode**:

| Code | Bedeutung |
|---|---|
| 200 | OK |
| 301 / 302 | Weiterleitung |
| 403 | Zugriff verboten |
| 404 | Nicht gefunden |
| 500 | Serverfehler |

**HTTPS** (**TCP 443**) ist HTTP über **TLS** (*Transport Layer Security*, Nachfolger von SSL). TLS sorgt für
- **Vertraulichkeit** (Verschlüsselung),
- **Integrität** (Manipulation wird erkannt),
- **Authentizität** des Servers (über ein **Zertifikat**, das von einer vertrauenswürdigen Zertifizierungsstelle signiert ist).

Beim Aufruf einer Webseite wirken **mehrere Protokolle** zusammen – das ist eine typische Prüfungsfrage.`,
        },
        {
          type: 'visual',
          title: 'Was passiert beim Aufruf von https://www.elektro-kraemer.de?',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['Browser', 'DNS-Server', 'Webserver'],
              messages: [
                { from: 0, to: 1, label: 'DNS-Anfrage A www.elektro-kraemer.de (UDP 53)' },
                { from: 1, to: 0, label: 'DNS-Antwort 203.0.113.80' },
                { from: 0, to: 2, label: 'TCP SYN → Port 443' },
                { from: 2, to: 0, label: 'TCP SYN-ACK' },
                { from: 0, to: 2, label: 'TCP ACK', note: 'TCP-Verbindung steht' },
                { from: 0, to: 2, label: 'TLS ClientHello', note: 'unterstützte Verfahren' },
                { from: 2, to: 0, label: 'TLS ServerHello + Zertifikat', note: 'Browser prüft Zertifikat' },
                { from: 0, to: 2, label: 'Schlüsselaustausch / Finished', note: 'ab jetzt verschlüsselt' },
                { from: 0, to: 2, label: 'HTTP GET / (verschlüsselt)' },
                { from: 2, to: 0, label: 'HTTP 200 OK + HTML (verschlüsselt)' },
              ],
            },
          },
          caption: `Reihenfolge: DNS (Name → IP) → TCP-Handshake → TLS-Handshake → HTTP-Anfrage/Antwort. Davor hat der PC ggf. per ARP die MAC seines Gateways ermittelt.`,
        },
        {
          type: 'explain',
          title: 'Fernzugriff: SSH, Telnet, RDP',
          body: `| Protokoll | Port | Verschlüsselt? | Einsatz |
|---|---|---|---|
| **Telnet** | TCP 23 | **nein** – alles inkl. Passwort im Klartext | veraltet, höchstens zum Testen |
| **SSH** (*Secure Shell*) | TCP 22 | **ja** | Kommandozeile auf Linux-Servern, Switches, Routern; Anmeldung per Passwort oder **Schlüsselpaar** |
| **RDP** (*Remote Desktop Protocol*) | TCP 3389 (auch UDP) | ja (TLS) | grafischer Fernzugriff auf Windows |

Für die Administration der Switches der Elektro Krämer GmbH gilt also: **Telnet deaktivieren, SSH aktivieren.** RDP sollte niemals direkt aus dem Internet erreichbar sein, sondern nur über **VPN**.`,
        },
        {
          type: 'explain',
          title: 'Dateiübertragung: FTP, SFTP, FTPS, SMB',
          body: `| Protokoll | Port | Beschreibung |
|---|---|---|
| **FTP** | TCP **21** (Steuerung), **20** (Daten im aktiven Modus) | klassischer Dateitransfer, **unverschlüsselt**. Im passiven Modus öffnet der Server einen hohen Port für die Daten. |
| **FTPS** | TCP 21 (explizit, \`AUTH TLS\`) oder 990 (implizit) | **FTP über TLS** – das alte FTP mit Verschlüsselung |
| **SFTP** | TCP **22** | **SSH File Transfer Protocol** – läuft **über SSH**, hat mit FTP technisch **nichts** zu tun! |
| **SCP** | TCP 22 | Kopieren über SSH |
| **TFTP** | UDP 69 | sehr einfach, ohne Anmeldung – z. B. für Firmware/Konfig-Sicherung, PXE-Boot |
| **SMB** | TCP **445** | Windows-Dateifreigaben und Drucker (\`\\\\server\\freigabe\`), in Linux über Samba |

**Prüfungsfalle:** **SFTP ≠ FTPS**. SFTP = über SSH (Port 22), FTPS = FTP mit TLS (Port 21/990).`,
        },
        {
          type: 'example',
          title: 'Sicheren Dateiaustausch mit einem Lieferanten einrichten',
          problem: `Ein Lieferant soll täglich CSV-Dateien auf einen Server der Elektro Krämer GmbH hochladen. Bisher nutzt er FTP. Was schlägst du vor, und welcher Port ist in der Firewall freizugeben?`,
          steps: [
            { label: 'Problem FTP', body: `FTP überträgt Benutzername, Passwort und Daten **im Klartext** – unsicher über das Internet.` },
            { label: 'Alternative', body: `**SFTP** über SSH: verschlüsselt, Anmeldung auch per Schlüssel möglich, nur **ein** Port nötig.` },
            { label: 'Firewall', body: `Eingehend **TCP 22** zum SFTP-Server (idealerweise nur von der IP des Lieferanten).` },
          ],
          result: `SFTP statt FTP, Freigabe TCP 22 – möglichst auf die Quell-IP des Lieferanten beschränkt.`,
        },
        {
          type: 'check',
          question: {
            id: 'm10-l06-c1',
            kind: 'order',
            skill: 'proto.web',
            difficulty: 2,
            prompt: `Ein Browser ruft zum ersten Mal \`https://www.elektro-kraemer.de\` auf. Bringe die Vorgänge in die richtige Reihenfolge.`,
            items: [
              'DNS-Abfrage nach der IP-Adresse',
              'TCP-3-Way-Handshake zu Port 443',
              'TLS-Handshake mit Zertifikatsprüfung',
              'HTTP-GET-Anfrage (verschlüsselt)',
              'HTTP-Antwort 200 OK mit der Seite',
            ],
            explanation: `Erst Name → IP (DNS), dann TCP-Verbindung, dann TLS, erst dann HTTP.`,
          },
        },
        {
          type: 'check',
          question: {
            id: 'm10-l06-c2',
            kind: 'single',
            skill: 'proto.files',
            difficulty: 2,
            prompt: `Worüber läuft **SFTP**?`,
            options: ['Über FTP mit TLS, Port 21', 'Über SSH, Port 22', 'Über HTTPS, Port 443', 'Über SMB, Port 445'],
            answer: 1,
            distractors: {
              '0': { why: 'Das ist FTPS.', error: 'sftp-ftps' },
              '2': { why: 'HTTPS ist für Webseiten.', error: 'sftp-https' },
              '3': { why: 'SMB ist für Windows-Freigaben.', error: 'sftp-smb' },
            },
            explanation: `**SFTP** = SSH File Transfer Protocol → läuft **über SSH**, **TCP 22**.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: Web, Fernzugriff, Dateien',
          questionIds: ['m10-q036', 'm10-q037', 'm10-q038', 'm10-q039', 'm10-q040', 'm10-q041'],
          count: 4,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'HTTP 80 (Klartext), HTTPS 443 = HTTP über TLS (Verschlüsselung, Integrität, Server-Authentizität per Zertifikat).',
            'Webseitenaufruf: DNS → TCP-Handshake → TLS-Handshake → HTTP.',
            'Telnet 23 unverschlüsselt → durch SSH 22 ersetzen; RDP 3389 nur über VPN.',
            'FTP 20/21 unverschlüsselt; FTPS = FTP + TLS; SFTP = über SSH (22); SMB 445 für Windows-Freigaben.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm10-l07',
      title: 'E-Mail, Zeit, Überwachung und Verzeichnisdienst',
      minutes: 25,
      relevance: 'ap1',
      skills: ['proto.mail', 'proto.services'],
      steps: [
        {
          type: 'explain',
          title: 'E-Mail: Senden mit SMTP, Abrufen mit IMAP oder POP3',
          body: `E-Mail braucht zwei Arten von Protokollen:

**Senden/Transportieren – SMTP** (*Simple Mail Transfer Protocol*):

| Port | Verwendung |
|---|---|
| **25** | Mailserver ↔ Mailserver (Transport im Internet) |
| **587** | **Submission**: Mailprogramm → eigener Mailserver, mit Anmeldung und **STARTTLS** (Verbindung startet unverschlüsselt und wird dann auf TLS hochgestuft) |
| **465** | **SMTPS**: Submission mit **implizitem TLS** (von Anfang an verschlüsselt) |

**Abrufen – IMAP oder POP3:**

| | **IMAP** (143 / IMAPS **993**) | **POP3** (110 / POP3S **995**) |
|---|---|---|
| Mails liegen | **auf dem Server** | werden **heruntergeladen**, meist auf dem Server gelöscht |
| Ordner | serverseitig, synchron auf allen Geräten | nur lokal |
| Mehrere Geräte | ideal (Smartphone, Laptop, Webmail sehen dasselbe) | ungeeignet |
| Offline | nur Zwischenspeicher | alles lokal verfügbar |

Für die Elektro Krämer GmbH mit Laptop **und** Firmen-Smartphone ist **IMAP** die richtige Wahl.

Ablauf: Frau Yilmaz schreibt eine Mail an einen Kunden → ihr Client sendet per **SMTP (587)** an den Firmen-Mailserver → der schaut per **DNS (MX-Record)** nach dem Mailserver des Kunden und liefert per **SMTP (25)** ein → der Kunde ruft per **IMAPS (993)** ab.`,
        },
        {
          type: 'explain',
          title: 'NTP, SNMP und LDAP',
          body: `**NTP** (*Network Time Protocol*, **UDP 123**) synchronisiert die Uhrzeit. Klingt banal, ist aber kritisch: **Kerberos** (Active-Directory-Anmeldung) scheitert bei zu großer Zeitabweichung (Standard 5 Minuten), Logdateien verschiedener Geräte lassen sich sonst nicht vergleichen, Zertifikate werden falsch geprüft. NTP-Server sind hierarchisch in **Stratum**-Ebenen organisiert (Stratum 0 = Referenzuhr, z. B. GPS/Atomuhr; Stratum 1 = direkt daran angeschlossener Server; usw.).

**SNMP** (*Simple Network Management Protocol*, **UDP**) dient der **Überwachung** und Verwaltung von Netzwerkgeräten (Switches, Router, Drucker, USV):
- **Port 161**: Der **Manager** (Monitoring-System) fragt den **Agenten** auf dem Gerät ab (\`GET\`) oder setzt Werte (\`SET\`).
- **Port 162**: Der Agent meldet von sich aus Ereignisse an den Manager (**Trap**), z. B. „Port 12 down“.
- Die abfragbaren Werte sind in der **MIB** (Management Information Base) beschrieben und über **OIDs** adressiert.
- **SNMPv1/v2c** nutzen eine **Community** als Klartext-Passwort; **SNMPv3** bietet **Authentifizierung und Verschlüsselung** → empfohlen.

**LDAP** (*Lightweight Directory Access Protocol*, **TCP 389**, verschlüsselt **LDAPS 636**) ist das Protokoll für den Zugriff auf **Verzeichnisdienste** wie **Active Directory**: Benutzer, Gruppen, Computer. Anwendungen (z. B. das ERP-System oder ein WLAN-Controller) prüfen per LDAP Benutzer und Gruppenzugehörigkeiten.`,
        },
        {
          type: 'visual',
          title: 'Infrastrukturdienste',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'NTP – UDP 123', text: 'Einheitliche Uhrzeit für Anmeldung (Kerberos), Logs und Zertifikate.', icon: 'Clock' },
                { title: 'SNMP – UDP 161/162', text: 'Überwachung: Manager fragt Agenten ab (161), Agent sendet Traps (162). SNMPv3 verschlüsselt.', icon: 'Activity' },
                { title: 'LDAP – 389 / LDAPS 636', text: 'Zugriff auf Verzeichnisdienste wie Active Directory.', icon: 'Key' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Monitoring für die Switches einrichten',
          problem: `Das Monitoring-System in Hamburg (10.10.30.20) soll die Switches in Berlin überwachen und sofort informiert werden, wenn ein Port ausfällt. Welche Ports und Richtungen musst du in der Firewall zwischen den Standorten freigeben? Welche SNMP-Version empfiehlst du?`,
          steps: [
            { label: 'Abfragen', body: `Monitoring → Switch: **UDP 161** (Manager fragt Agent).` },
            { label: 'Ereignismeldungen', body: `Switch → Monitoring: **UDP 162** (Traps).` },
            { label: 'Version', body: `**SNMPv3** mit Authentifizierung und Verschlüsselung – v1/v2c übertragen die Community im Klartext.` },
          ],
          result: `UDP 161 Hamburg → Berlin, UDP 162 Berlin → Hamburg, SNMPv3.`,
        },
        {
          type: 'check',
          question: {
            id: 'm10-l07-c1',
            kind: 'single',
            skill: 'proto.mail',
            difficulty: 2,
            prompt: `Ein Mitarbeiter liest seine Mails auf Laptop, Smartphone und im Webmailer und möchte überall denselben Stand inklusive Ordnern. Welches Protokoll ist geeignet?`,
            options: ['POP3', 'IMAP', 'SMTP', 'SNMP'],
            answer: 1,
            distractors: {
              '0': { why: 'POP3 lädt Mails herunter und löscht sie meist vom Server – kein Abgleich.', error: 'mail-pop3' },
              '2': { why: 'SMTP ist zum Senden/Transport, nicht zum Abrufen.', error: 'mail-smtp' },
              '3': { why: 'SNMP dient der Netzwerküberwachung.', error: 'mail-snmp' },
            },
            explanation: `**IMAP** lässt die Mails auf dem Server und synchronisiert Ordner und Status auf allen Geräten.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: Mail und Infrastrukturdienste',
          questionIds: ['m10-q042', 'm10-q043', 'm10-q044', 'm10-q045', 'm10-q046', 'm10-q047'],
          count: 4,
          difficulty: 2,
        },
        {
          type: 'practice',
          title: 'Abschluss-Mix: alle Protokolle und Ports',
          questionIds: ['m10-q048', 'm10-q049', 'm10-q050', 'm10-q051', 'm10-q052', 'm10-q053', 'm10-q054'],
          count: 6,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'SMTP sendet: 25 (Server↔Server), 587 (Submission mit STARTTLS), 465 (SMTPS).',
            'IMAP 143/993: Mails bleiben auf dem Server – ideal für mehrere Geräte. POP3 110/995: herunterladen.',
            'NTP UDP 123: einheitliche Zeit (wichtig für Kerberos, Logs, Zertifikate).',
            'SNMP UDP 161 (Abfrage) / 162 (Trap); SNMPv3 mit Verschlüsselung verwenden.',
            'LDAP 389 / LDAPS 636: Zugriff auf Verzeichnisdienste wie Active Directory.',
          ],
        },
      ],
    },
  ],

  /* ==================================================================== */
  /* Fragenpool                                                           */
  /* ==================================================================== */
  questions: [
    // ---------- TCP/UDP ----------
    {
      id: 'm10-q001',
      kind: 'table',
      skill: 'proto.tcpudp',
      difficulty: 1,
      prompt: `Trage für jeden Dienst das hauptsächlich genutzte Transportprotokoll ein (**TCP** oder **UDP**).`,
      columns: [
        { key: 'svc', label: 'Dienst', type: 'text' },
        { key: 'proto', label: 'TCP/UDP', type: 'text' },
      ],
      rows: [
        { cells: { svc: { given: 'HTTPS' }, proto: { answer: 'TCP' } } },
        { cells: { svc: { given: 'NTP' }, proto: { answer: 'UDP' } } },
        { cells: { svc: { given: 'SSH' }, proto: { answer: 'TCP' } } },
        { cells: { svc: { given: 'DHCP' }, proto: { answer: 'UDP' } } },
      ],
      explanation: `HTTPS und SSH brauchen zuverlässige Verbindungen → **TCP**. NTP und DHCP sind kurze Frage-Antwort-Vorgänge → **UDP**.`,
    },
    {
      id: 'm10-q002',
      kind: 'single',
      skill: 'proto.tcpudp',
      difficulty: 1,
      prompt: `Warum wird für VoIP-Sprachdaten typischerweise **UDP** statt TCP verwendet?`,
      options: [
        'Weil UDP verschlüsselt.',
        'Weil geringe Verzögerung wichtiger ist als das Neusenden verlorener Pakete.',
        'Weil UDP garantiert, dass alle Pakete ankommen.',
        'Weil TCP keine Ports kennt.',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'UDP verschlüsselt nicht.', error: 'udp-encrypt' },
        '2': { why: 'Genau das garantiert UDP nicht.', error: 'udp-garantie' },
        '3': { why: 'TCP nutzt selbstverständlich Ports.', error: 'tcp-ports' },
      },
      explanation: `Ein neu gesendetes Sprachpaket käme zu spät und wäre nutzlos. Bei Echtzeit zählt **geringe Verzögerung** → UDP.`,
    },
    {
      id: 'm10-q003',
      kind: 'number',
      skill: 'proto.tcpudp',
      difficulty: 2,
      prompt: `Wie groß ist der UDP-Header in Byte?`,
      answer: 8,
      unit: 'Byte',
      explanation: `UDP-Header: Quellport, Zielport, Länge, Prüfsumme – je 2 Byte = **8 Byte**. TCP hat mindestens 20 Byte.`,
    },
    {
      id: 'm10-q004',
      kind: 'free',
      skill: 'proto.tcpudp',
      difficulty: 2,
      prompt: `Erläutern Sie den Unterschied zwischen TCP und UDP und nennen Sie je ein typisches Anwendungsbeispiel.`,
      modelAnswer: `TCP ist ein verbindungsorientiertes Transportprotokoll: Vor der Datenübertragung wird per 3-Way-Handshake (SYN, SYN-ACK, ACK) eine Verbindung aufgebaut. Empfangene Daten werden bestätigt, verlorene Segmente neu gesendet, Sequenznummern sichern die richtige Reihenfolge, und es gibt Flusskontrolle. Dadurch ist TCP zuverlässig, aber mit mehr Overhead verbunden. Beispiel: HTTPS, SSH, E-Mail. UDP ist verbindungslos: Datagramme werden ohne Verbindungsaufbau und ohne Bestätigung gesendet, es gibt keine Garantie für Zustellung oder Reihenfolge. Dafür ist UDP schnell und hat wenig Overhead (8-Byte-Header). Beispiel: DNS-Anfragen, VoIP, NTP, Streaming.`,
      keywords: ['verbindungsorientiert', 'verbindungslos', 'Handshake', 'Bestätigung', 'Reihenfolge', 'Overhead', 'Beispiel'],
      explanation: `Erwartet: verbindungsorientiert/zuverlässig vs. verbindungslos/schnell, mit Begründung und je einem passenden Beispiel.`,
    },
    // ---------- TCP ----------
    {
      id: 'm10-q005',
      kind: 'single',
      skill: 'proto.tcp',
      difficulty: 1,
      prompt: `Mit welchem Segment beginnt ein Client den TCP-Verbindungsaufbau?`,
      options: ['ACK', 'FIN', 'SYN', 'RST'],
      answer: 2,
      distractors: {
        '0': { why: 'ACK bestätigt – es kommt als drittes Segment.', error: 'tcp-flags' },
        '1': { why: 'FIN beendet eine Verbindung.', error: 'tcp-flags' },
        '3': { why: 'RST bricht ab oder lehnt ab.', error: 'tcp-flags' },
      },
      explanation: `Der Client sendet **SYN**, Server antwortet SYN-ACK, Client ACK.`,
    },
    {
      id: 'm10-q006',
      kind: 'number',
      skill: 'proto.tcp',
      difficulty: 2,
      prompt: `Ein Client sendet ein TCP-Segment mit Sequenznummer 2001 und 400 Byte Nutzdaten. Welche Bestätigungsnummer sendet der Empfänger, wenn alles angekommen ist?`,
      answer: 2401,
      hints: ['Das Segment umfasst die Bytes 2001 bis 2400.', 'Die Ack-Nummer nennt das nächste erwartete Byte.'],
      explanation: `2001 + 400 = **2401** – das nächste erwartete Byte.`,
    },
    {
      id: 'm10-q007',
      kind: 'match',
      skill: 'proto.tcp',
      difficulty: 2,
      prompt: `Ordne die TCP-Flags ihrer Bedeutung zu.`,
      left: ['SYN', 'ACK', 'FIN', 'RST'],
      right: ['Verbindung sofort abbrechen/ablehnen', 'Verbindung ordnungsgemäß beenden', 'Verbindungsaufbau, Sequenznummern synchronisieren', 'Empfang bestätigen'],
      answer: [2, 3, 1, 0],
      explanation: `SYN = Aufbau, ACK = Bestätigung, FIN = geordnetes Ende, RST = Abbruch/Ablehnung.`,
    },
    {
      id: 'm10-q008',
      kind: 'single',
      skill: 'proto.tcp',
      difficulty: 3,
      prompt: `Ein Client sendet ein SYN an TCP-Port 8080 eines Servers, auf dem dort kein Dienst läuft und keine Firewall filtert. Was erhält der Client?`,
      options: ['SYN-ACK', 'Keine Antwort', 'RST', 'ICMP Echo Reply'],
      answer: 2,
      distractors: {
        '0': { why: 'SYN-ACK kommt nur, wenn ein Dienst auf dem Port lauscht.', error: 'tcp-closed-port' },
        '1': { why: 'Keine Antwort ist typisch, wenn eine Firewall das Paket verwirft.', error: 'tcp-filtered' },
        '3': { why: 'Echo Reply ist die Antwort auf einen Ping.', error: 'tcp-icmp' },
      },
      explanation: `Geschlossener Port → **RST** („Verbindung abgelehnt“). Gefiltert (Firewall drop) → keine Antwort/Timeout.`,
    },
    // ---------- Ports ----------
    {
      id: 'm10-q009',
      kind: 'number',
      skill: 'proto.ports',
      difficulty: 1,
      prompt: `Welchen Standardport nutzt **HTTPS**?`,
      answer: 443,
      explanation: `HTTPS = **TCP 443** (HTTP/3 nutzt UDP 443).`,
    },
    {
      id: 'm10-q010',
      kind: 'number',
      skill: 'proto.ports',
      difficulty: 1,
      prompt: `Welchen Standardport nutzt **SSH**?`,
      answer: 22,
      explanation: `SSH = **TCP 22** (auch SFTP und SCP).`,
    },
    {
      id: 'm10-q011',
      kind: 'number',
      skill: 'proto.ports',
      difficulty: 1,
      prompt: `Welchen Port nutzt **DNS**?`,
      answer: 53,
      explanation: `DNS = Port **53**, normalerweise UDP, TCP für Zonentransfers und große Antworten.`,
    },
    {
      id: 'm10-q012',
      kind: 'number',
      skill: 'proto.ports',
      difficulty: 1,
      prompt: `Welchen Standardport nutzt das **Remote Desktop Protocol (RDP)**?`,
      answer: 3389,
      explanation: `RDP = **3389** (TCP, zusätzlich UDP).`,
    },
    {
      id: 'm10-q013',
      kind: 'match',
      skill: 'proto.ports',
      difficulty: 1,
      prompt: `Ordne den Diensten ihre Standardports zu.`,
      left: ['HTTP', 'Telnet', 'SMTP', 'POP3', 'IMAP'],
      right: ['143', '25', '80', '110', '23'],
      answer: [2, 4, 1, 3, 0],
      explanation: `HTTP 80, Telnet 23, SMTP 25, POP3 110, IMAP 143.`,
    },
    {
      id: 'm10-q014',
      kind: 'match',
      skill: 'proto.ports',
      difficulty: 2,
      prompt: `Ordne die verschlüsselten Varianten ihren Ports zu.`,
      left: ['HTTPS', 'IMAPS', 'POP3S', 'LDAPS', 'SMTPS (implizites TLS)'],
      right: ['995', '465', '443', '636', '993'],
      answer: [2, 4, 0, 3, 1],
      explanation: `HTTPS 443, IMAPS 993, POP3S 995, LDAPS 636, SMTPS 465.`,
    },
    {
      id: 'm10-q015',
      kind: 'table',
      skill: 'proto.ports',
      difficulty: 2,
      prompt: `Vervollständige die Port-Tabelle (Port und Transportprotokoll TCP/UDP).`,
      columns: [
        { key: 'svc', label: 'Dienst', type: 'text' },
        { key: 'port', label: 'Port', type: 'number' },
        { key: 'proto', label: 'TCP/UDP', type: 'text' },
      ],
      rows: [
        { cells: { svc: { given: 'NTP' }, port: { answer: '123' }, proto: { answer: 'UDP' } } },
        { cells: { svc: { given: 'SMB' }, port: { answer: '445' }, proto: { answer: 'TCP' } } },
        { cells: { svc: { given: 'TFTP' }, port: { answer: '69' }, proto: { answer: 'UDP' } } },
        { cells: { svc: { given: 'LDAP' }, port: { answer: '389' }, proto: { answer: 'TCP', accept: ['TCP', 'TCP/UDP', 'UDP/TCP'] } } },
        { cells: { svc: { given: 'SSH' }, port: { answer: '22' }, proto: { answer: 'TCP' } } },
      ],
      explanation: `NTP 123/UDP, SMB 445/TCP, TFTP 69/UDP, LDAP 389/TCP (auch UDP möglich), SSH 22/TCP.`,
    },
    {
      id: 'm10-q016',
      kind: 'single',
      skill: 'proto.ports',
      difficulty: 2,
      prompt: `Ein Browser auf einem PC baut eine Verbindung zu einem Webserver auf. Welcher Quellport ist am wahrscheinlichsten?`,
      options: ['80', '443', '53124', '1023'],
      answer: 2,
      distractors: {
        '0': { why: '80 ist der Zielport eines HTTP-Servers, nicht der Quellport des Clients.', error: 'port-quelle-ziel' },
        '1': { why: '443 ist der Zielport bei HTTPS.', error: 'port-quelle-ziel' },
        '3': { why: 'Well-known Ports nutzt ein Client nicht als zufällige Quellports.', error: 'port-ephemeral' },
      },
      explanation: `Clients nutzen zufällige **dynamische Ports** (typisch 49152–65535) als Quellport. Der **Zielport** ist der des Dienstes (443).`,
    },
    {
      id: 'm10-q017',
      kind: 'text',
      skill: 'proto.ports',
      difficulty: 2,
      prompt: `Welche Ports verwendet **FTP**? (Daten und Steuerung, z. B. „x/y“)`,
      accept: ['20/21', '20 und 21', '21/20', '20,21', '21 und 20', '20, 21'],
      placeholder: 'x/y',
      explanation: `FTP: **21** = Steuerverbindung, **20** = Datenverbindung im aktiven Modus.`,
    },
    {
      id: 'm10-q018',
      kind: 'text',
      skill: 'proto.ports',
      difficulty: 2,
      prompt: `Welche UDP-Ports nutzt **DHCP**? (Server/Client, z. B. „x/y“)`,
      accept: ['67/68', '67 und 68', '67,68', '67, 68', '68/67'],
      placeholder: 'Server/Client',
      explanation: `DHCP-**Server** lauscht auf **UDP 67**, der **Client** auf **UDP 68**.`,
    },
    {
      id: 'm10-q019',
      kind: 'single',
      skill: 'proto.ports',
      difficulty: 2,
      prompt: `Zu welchem Bereich gehört Port **3389**?`,
      options: ['Well-known Ports', 'Registered Ports', 'Dynamic/Private Ports', 'Reservierte Ports, nicht nutzbar'],
      answer: 1,
      distractors: {
        '0': { why: 'Well-known reicht nur bis 1023.', error: 'port-range' },
        '2': { why: 'Dynamic beginnt erst bei 49152.', error: 'port-range' },
        '3': { why: '3389 wird von RDP genutzt.', error: 'port-range' },
      },
      explanation: `1024–49151 = **Registered Ports**; 3389 (RDP) liegt darin.`,
    },
    {
      id: 'm10-q020',
      kind: 'match',
      skill: 'proto.ports',
      difficulty: 2,
      prompt: `Ordne die Ports den Diensten zu.`,
      left: ['161', '162', '123', '445', '587'],
      right: ['SMB', 'SNMP-Trap', 'SMTP-Submission', 'NTP', 'SNMP-Abfrage'],
      answer: [4, 1, 3, 0, 2],
      explanation: `161 = SNMP-Abfrage (Agent), 162 = SNMP-Trap (Manager), 123 = NTP, 445 = SMB, 587 = SMTP-Submission.`,
    },
    {
      id: 'm10-q021',
      kind: 'multi',
      skill: 'proto.ports',
      difficulty: 2,
      prompt: `Welche der folgenden Dienste nutzen standardmäßig **UDP**? (Mehrfachauswahl)`,
      options: ['DHCP', 'SMTP', 'NTP', 'SNMP', 'RDP (Hauptverbindung TCP)', 'HTTP/1.1'],
      answer: [0, 2, 3],
      explanation: `DHCP, NTP und SNMP laufen über **UDP**. SMTP und HTTP/1.1 über TCP; RDP primär TCP (UDP optional zur Beschleunigung).`,
    },
    {
      id: 'm10-q022',
      kind: 'text',
      skill: 'proto.ports',
      difficulty: 1,
      prompt: `Wie nennt man die Kombination aus IP-Adresse und Portnummer, z. B. 192.168.10.20:50123?`,
      accept: ['Socket', 'Socketadresse', 'Socket-Adresse', 'Endpunkt'],
      explanation: `IP + Port (+ Protokoll) = **Socket**.`,
    },
    // ---------- ARP / ICMP ----------
    {
      id: 'm10-q023',
      kind: 'single',
      skill: 'proto.arp',
      difficulty: 1,
      prompt: `Welche Aufgabe hat ARP?`,
      options: [
        'Namen in IP-Adressen auflösen',
        'IPv4-Adressen in MAC-Adressen auflösen',
        'IP-Adressen automatisch vergeben',
        'Router-Routen austauschen',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'Das macht DNS.', error: 'arp-dns' },
        '2': { why: 'Das macht DHCP.', error: 'arp-dhcp' },
        '3': { why: 'Das machen Routingprotokolle.', error: 'arp-routing' },
      },
      explanation: `ARP ermittelt zu einer bekannten **IPv4-Adresse** im lokalen Netz die **MAC-Adresse**.`,
    },
    {
      id: 'm10-q024',
      kind: 'order',
      skill: 'proto.arp',
      difficulty: 2,
      prompt: `Ein PC will ein Paket an sein Gateway 192.168.10.1 schicken, kennt dessen MAC aber noch nicht. Bringe die Schritte in die richtige Reihenfolge.`,
      items: [
        'ARP-Cache prüfen – kein Eintrag gefunden',
        'ARP-Request als Broadcast senden',
        'Gateway erkennt seine IP und sendet ARP-Reply als Unicast',
        'PC speichert IP-MAC-Zuordnung im ARP-Cache',
        'PC sendet das Datenpaket an die MAC des Gateways',
      ],
      explanation: `Cache → Request (Broadcast) → Reply (Unicast) → Cache-Eintrag → Daten senden.`,
    },
    {
      id: 'm10-q025',
      kind: 'text',
      skill: 'proto.arp',
      difficulty: 1,
      prompt: `Mit welchem Befehl zeigst du unter Windows den ARP-Cache an?`,
      accept: ['arp -a', 'arp /a', 'arp -g'],
      placeholder: 'Befehl',
      explanation: `\`arp -a\` zeigt die gespeicherten IP-MAC-Zuordnungen.`,
    },
    {
      id: 'm10-q026',
      kind: 'match',
      skill: 'proto.icmp',
      difficulty: 2,
      prompt: `Ordne die ICMP-Typen ihren Nummern zu.`,
      left: ['Echo Request', 'Echo Reply', 'Destination Unreachable', 'Time Exceeded'],
      right: ['11', '3', '8', '0'],
      answer: [2, 3, 1, 0],
      explanation: `Echo Request = 8, Echo Reply = 0, Destination Unreachable = 3, Time Exceeded = 11.`,
    },
    {
      id: 'm10-q027',
      kind: 'single',
      skill: 'proto.icmp',
      difficulty: 2,
      prompt: `Auf welcher OSI-Schicht arbeitet ICMP, und welche Portnummer nutzt \`ping\`?`,
      options: ['Schicht 4, Port 7', 'Schicht 3, ICMP hat keine Ports', 'Schicht 7, Port 1', 'Schicht 2, Port 0'],
      answer: 1,
      distractors: {
        '0': { why: 'Port 7 ist der alte Echo-Dienst über TCP/UDP, nicht ICMP-Ping.', error: 'icmp-port' },
        '2': { why: 'ICMP ist kein Anwendungsprotokoll; 1 ist seine Protokollnummer im IP-Header, kein Port.', error: 'icmp-protonr' },
        '3': { why: 'ICMP wird in IP-Paketen transportiert, also Schicht 3.', error: 'icmp-layer' },
      },
      explanation: `ICMP gehört zu **Schicht 3** und wird direkt in IP transportiert (Protokollnummer 1). Ports gibt es erst auf Schicht 4 bei TCP/UDP.`,
    },
    {
      id: 'm10-q028',
      kind: 'single',
      skill: 'proto.icmp',
      difficulty: 3,
      prompt: `\`ping 192.168.20.50\` liefert „Zeitüberschreitung der Anforderung“, ein Zugriff auf die Dateifreigabe \`\\\\192.168.20.50\\daten\` funktioniert aber. Was ist die wahrscheinlichste Erklärung?`,
      options: [
        'Der Server ist ausgeschaltet.',
        'Die Firewall des Servers blockiert ICMP Echo Requests.',
        'Die Route zum Server fehlt.',
        'Der DNS-Server ist ausgefallen.',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'Dann ginge auch die Freigabe nicht.', error: 'ping-aus' },
        '2': { why: 'Dann ginge auch SMB nicht.', error: 'ping-route' },
        '3': { why: 'Es wird direkt per IP zugegriffen, DNS spielt keine Rolle.', error: 'ping-dns' },
      },
      explanation: `SMB (TCP 445) funktioniert → Server und Routing sind ok. ICMP wird **gefiltert** (z. B. Windows-Firewall-Standard).`,
    },
    // ---------- DHCP / DNS ----------
    {
      id: 'm10-q029',
      kind: 'multi',
      skill: 'proto.dhcp',
      difficulty: 2,
      prompt: `Welche Informationen kann ein DHCP-Server einem Client typischerweise mitteilen? (Mehrfachauswahl)`,
      options: ['IP-Adresse', 'Subnetzmaske', 'Standardgateway', 'DNS-Server', 'MAC-Adresse des Clients', 'Lease-Dauer'],
      answer: [0, 1, 2, 3, 5],
      explanation: `IP, Maske, Gateway, DNS-Server und Lease-Dauer (und weitere Optionen). Die **MAC** hat der Client selbst – der Server nutzt sie nur zur Identifikation.`,
    },
    {
      id: 'm10-q030',
      kind: 'single',
      skill: 'proto.dhcp',
      difficulty: 2,
      prompt: `Ein Windows-PC hat die Adresse 169.254.88.12. Was bedeutet das?`,
      options: [
        'Er hat eine öffentliche IP-Adresse.',
        'Er hat keinen DHCP-Server erreicht und sich per APIPA selbst eine Adresse gegeben.',
        'Er ist korrekt per DHCP konfiguriert.',
        'Es ist eine Loopback-Adresse.',
      ],
      answer: 1,
      distractors: {
        '0': { why: '169.254.0.0/16 ist link-lokal, nicht öffentlich routbar.', error: 'apipa-public' },
        '2': { why: 'DHCP-Pools vergeben normalerweise keine 169.254er-Adressen.', error: 'apipa-dhcp' },
        '3': { why: 'Loopback ist 127.0.0.0/8.', error: 'apipa-loopback' },
      },
      explanation: `**APIPA** (169.254.0.0/16): Der Client hat keinen DHCP-Server erreicht. Ursachen: Kabel, VLAN, Server, Relay.`,
    },
    {
      id: 'm10-q031',
      kind: 'single',
      skill: 'proto.dhcp',
      difficulty: 3,
      prompt: `**Handlungssituation:** Der DHCP-Server steht im Server-VLAN 30 (10.10.30.5). Clients im neuen VLAN 20 bekommen keine Adresse. Das Inter-VLAN-Routing funktioniert. Was fehlt?`,
      options: [
        'Ein zweiter DHCP-Server ist zwingend nötig.',
        'Ein DHCP-Relay-Agent (z. B. ip helper-address 10.10.30.5) auf dem Gateway-Interface von VLAN 20.',
        'Eine statische Route zum DHCP-Server auf jedem Client.',
        'DNS-Einträge für die Clients.',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'Ein Relay reicht – ein zentraler Server kann viele VLANs bedienen.', error: 'dhcp-zweiter-server' },
        '2': { why: 'Clients ohne IP können keine Routen nutzen; das Problem ist der Broadcast.', error: 'dhcp-route' },
        '3': { why: 'DNS hat mit der Adressvergabe nichts zu tun.', error: 'dhcp-dns' },
      },
      explanation: `DHCPDISCOVER ist ein **Broadcast** und wird vom Router nicht weitergeleitet. Ein **DHCP-Relay** am VLAN-20-Gateway leitet die Anfragen als Unicast an 10.10.30.5 weiter. Zusätzlich braucht der Server einen Scope für VLAN 20.`,
    },
    {
      id: 'm10-q032',
      kind: 'match',
      skill: 'proto.dns',
      difficulty: 2,
      prompt: `Ordne die DNS-Record-Typen ihrer Funktion zu.`,
      left: ['A', 'AAAA', 'MX', 'CNAME', 'PTR'],
      right: ['Alias auf einen anderen Namen', 'Name → IPv6', 'IP → Name (Reverse Lookup)', 'Name → IPv4', 'Mailserver der Domain'],
      answer: [3, 1, 4, 0, 2],
      explanation: `A = IPv4, AAAA = IPv6, MX = Mailserver, CNAME = Alias, PTR = Reverse Lookup.`,
    },
    {
      id: 'm10-q033',
      kind: 'single',
      skill: 'proto.dns',
      difficulty: 2,
      prompt: `Wann verwendet DNS **TCP** statt UDP?`,
      options: [
        'Bei jeder normalen Namensabfrage.',
        'Bei Zonentransfers zwischen DNS-Servern und bei großen Antworten.',
        'Nur bei IPv6-Adressen.',
        'Niemals, DNS nutzt ausschließlich UDP.',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'Normale Abfragen laufen über UDP 53.', error: 'dns-tcp' },
        '2': { why: 'AAAA-Abfragen laufen ebenfalls normalerweise über UDP.', error: 'dns-ipv6' },
        '3': { why: 'DNS nutzt auch TCP 53.', error: 'dns-nur-udp' },
      },
      explanation: `Standard: **UDP 53**. **TCP 53** für **Zonentransfers** und Antworten, die zu groß für UDP sind.`,
    },
    {
      id: 'm10-q034',
      kind: 'single',
      skill: 'proto.dns',
      difficulty: 3,
      prompt: `Ein PC fragt seinen internen DNS-Server nach www.beispiel.de. Der DNS-Server hat den Eintrag nicht im Cache. Welche Aussage beschreibt den Ablauf korrekt?`,
      options: [
        'Der PC fragt nacheinander selbst Root-, TLD- und autoritativen Server.',
        'Der PC stellt eine rekursive Anfrage an seinen DNS-Server; dieser fragt iterativ Root-, TLD- und autoritativen Server und liefert dem PC die fertige Antwort.',
        'Der DNS-Server sendet einen Broadcast ins Internet.',
        'Der DNS-Server fragt per ARP nach der IP.',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'Das übernimmt der Resolver für den Client.', error: 'dns-iterativ-client' },
        '2': { why: 'Broadcasts gibt es im Internet nicht.', error: 'dns-broadcast' },
        '3': { why: 'ARP löst IPs in MACs auf, nicht Namen in IPs.', error: 'dns-arp' },
      },
      explanation: `Client → Resolver: **rekursiv**. Resolver → Root → TLD → autoritativ: **iterativ**. Danach cacht der Resolver das Ergebnis.`,
    },
    {
      id: 'm10-q035',
      kind: 'free',
      skill: 'proto.dhcp',
      difficulty: 2,
      prompt: `Beschreiben Sie den Ablauf der IP-Adressvergabe per DHCP (DORA) und erläutern Sie, warum Discover und Request als Broadcast gesendet werden.`,
      modelAnswer: `1. DHCPDISCOVER: Der Client hat noch keine IP-Adresse und kennt den DHCP-Server nicht. Er sendet daher einen Broadcast (Quelle 0.0.0.0:68, Ziel 255.255.255.255:67). 2. DHCPOFFER: Ein oder mehrere DHCP-Server bieten eine IP-Adresse mit Optionen (Maske, Gateway, DNS, Lease) an. 3. DHCPREQUEST: Der Client wählt ein Angebot und fordert es an. Dies geschieht per Broadcast, damit alle DHCP-Server erfahren, welches Angebot angenommen wurde, und die anderen ihre angebotenen Adressen wieder freigeben. 4. DHCPACK: Der gewählte Server bestätigt die Vergabe; der Client konfiguriert die Adresse für die Lease-Dauer. Der Discover muss Broadcast sein, weil der Client noch keine Adresse und keine Serveradresse kennt.`,
      keywords: ['Discover', 'Offer', 'Request', 'Acknowledge', 'Broadcast', 'Lease', 'UDP 67', 'UDP 68'],
      explanation: `Vier Schritte korrekt benennen und die Broadcast-Begründung (keine eigene IP, Server unbekannt, alle Server informieren) liefern.`,
    },
    // ---------- Web / Remote / Dateien ----------
    {
      id: 'm10-q036',
      kind: 'multi',
      skill: 'proto.web',
      difficulty: 2,
      prompt: `Welche Schutzziele stellt TLS bei HTTPS sicher? (Mehrfachauswahl)`,
      options: ['Vertraulichkeit', 'Integrität', 'Authentizität des Servers', 'Verfügbarkeit des Servers', 'Anonymität des Nutzers'],
      answer: [0, 1, 2],
      explanation: `TLS verschlüsselt (**Vertraulichkeit**), erkennt Manipulationen (**Integrität**) und weist den Server per Zertifikat aus (**Authentizität**). Verfügbarkeit und Anonymität stellt TLS nicht sicher.`,
    },
    {
      id: 'm10-q037',
      kind: 'match',
      skill: 'proto.web',
      difficulty: 1,
      prompt: `Ordne die HTTP-Statuscodes zu.`,
      left: ['200', '301', '404', '500'],
      right: ['Nicht gefunden', 'Interner Serverfehler', 'OK', 'Dauerhaft verschoben (Weiterleitung)'],
      answer: [2, 3, 0, 1],
      explanation: `200 OK, 301 Moved Permanently, 404 Not Found, 500 Internal Server Error.`,
    },
    {
      id: 'm10-q038',
      kind: 'single',
      skill: 'proto.remote',
      difficulty: 1,
      prompt: `Warum soll Telnet zur Administration von Switches durch SSH ersetzt werden?`,
      options: [
        'Telnet ist langsamer.',
        'Telnet überträgt alles, auch Passwörter, im Klartext; SSH verschlüsselt.',
        'SSH benötigt keine Anmeldung.',
        'Telnet funktioniert nur mit IPv6.',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'Geschwindigkeit ist nicht das Problem.', error: 'telnet-speed' },
        '2': { why: 'SSH erfordert eine Anmeldung (Passwort oder Schlüssel).', error: 'ssh-login' },
        '3': { why: 'Telnet funktioniert mit IPv4 und IPv6.', error: 'telnet-ipv6' },
      },
      explanation: `Telnet (TCP 23) = **Klartext** – Zugangsdaten lassen sich mitschneiden. SSH (TCP 22) verschlüsselt.`,
    },
    {
      id: 'm10-q039',
      kind: 'table',
      skill: 'proto.files',
      difficulty: 2,
      prompt: `Vervollständige die Tabelle der Dateiübertragungsprotokolle. Bei „verschlüsselt“ **ja** oder **nein** eintragen.`,
      columns: [
        { key: 'p', label: 'Protokoll', type: 'text' },
        { key: 'port', label: 'Port', type: 'text' },
        { key: 'enc', label: 'verschlüsselt', type: 'text' },
      ],
      rows: [
        { cells: { p: { given: 'FTP' }, port: { answer: '20/21', accept: ['20/21', '21/20', '20,21', '20, 21', '21'] }, enc: { answer: 'nein' } } },
        { cells: { p: { given: 'SFTP' }, port: { answer: '22' }, enc: { answer: 'ja' } } },
        { cells: { p: { given: 'SMB' }, port: { answer: '445' }, enc: { answer: 'ja', accept: ['ja', 'optional', 'ab SMB3 ja', 'teilweise'] } } },
        { cells: { p: { given: 'TFTP' }, port: { answer: '69' }, enc: { answer: 'nein' } } },
      ],
      hints: ['SFTP läuft über SSH.'],
      explanation: `FTP 20/21 Klartext, SFTP 22 über SSH verschlüsselt, SMB 445 (ab SMB 3.0 Verschlüsselung möglich), TFTP 69/UDP Klartext ohne Anmeldung.`,
    },
    {
      id: 'm10-q040',
      kind: 'single',
      skill: 'proto.files',
      difficulty: 2,
      prompt: `Was ist der Unterschied zwischen **SFTP** und **FTPS**?`,
      options: [
        'Es gibt keinen, beides sind Namen für dasselbe.',
        'SFTP läuft über SSH (Port 22), FTPS ist FTP mit TLS-Verschlüsselung (Port 21 bzw. 990).',
        'SFTP ist unverschlüsselt, FTPS verschlüsselt.',
        'FTPS läuft über SSH, SFTP über TLS.',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'Die Namen ähneln sich, die Protokolle sind aber völlig verschieden.', error: 'sftp-ftps' },
        '2': { why: 'Beide sind verschlüsselt.', error: 'sftp-ftps' },
        '3': { why: 'Genau vertauscht.', error: 'sftp-ftps' },
      },
      explanation: `**SFTP** = SSH File Transfer Protocol (22). **FTPS** = FTP over TLS (21 explizit / 990 implizit).`,
    },
    {
      id: 'm10-q041',
      kind: 'single',
      skill: 'proto.remote',
      difficulty: 2,
      prompt: `**Handlungssituation:** Ein Außendienstmitarbeiter möchte von zu Hause per Remotedesktop auf seinen Büro-PC zugreifen. Der Geschäftsführer schlägt vor, Port 3389 in der Firewall nach außen zu öffnen. Wie bewertest du das?`,
      options: [
        'Gute Lösung, RDP ist verschlüsselt und damit sicher genug.',
        'Nicht empfehlenswert: Offenes RDP wird massiv angegriffen; besser per VPN ins Firmennetz und dann RDP.',
        'Nur sinnvoll, wenn Port 23 zusätzlich geöffnet wird.',
        'RDP funktioniert grundsätzlich nicht über das Internet.',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'Verschlüsselung schützt nicht vor Brute-Force-Angriffen und Sicherheitslücken im Dienst.', error: 'rdp-offen' },
        '2': { why: 'Port 23 ist Telnet und hat damit nichts zu tun.', error: 'rdp-telnet' },
        '3': { why: 'Technisch geht es, ist aber unsicher.', error: 'rdp-internet' },
      },
      explanation: `RDP direkt im Internet ist ein bekanntes Einfallstor (Brute Force, Exploits). Empfohlen: **VPN** (+ MFA), RDP nur intern.`,
    },
    // ---------- Mail / Services ----------
    {
      id: 'm10-q042',
      kind: 'match',
      skill: 'proto.mail',
      difficulty: 2,
      prompt: `Ordne die SMTP-Ports ihrer Verwendung zu.`,
      left: ['25', '587', '465'],
      right: ['Submission vom Client mit implizitem TLS (SMTPS)', 'Transport zwischen Mailservern', 'Submission vom Client mit STARTTLS'],
      answer: [1, 2, 0],
      explanation: `25 = Server↔Server, 587 = Submission mit STARTTLS, 465 = SMTPS (implizites TLS).`,
    },
    {
      id: 'm10-q043',
      kind: 'free',
      skill: 'proto.mail',
      difficulty: 2,
      prompt: `Die Geschäftsführung fragt, ob die Firmenhandys ihre Mails per POP3 oder IMAP abrufen sollen. Erläutern Sie den Unterschied und geben Sie eine Empfehlung.`,
      modelAnswer: `Bei POP3 (Port 110, verschlüsselt 995) werden die E-Mails vom Server heruntergeladen und meist dort gelöscht; Ordner und Gelesen-Status existieren nur lokal auf dem jeweiligen Gerät. Bei IMAP (Port 143, verschlüsselt 993) bleiben die E-Mails auf dem Server, Ordner und Status werden serverseitig verwaltet und auf allen Geräten synchronisiert. Da die Mitarbeitenden Smartphone und Laptop parallel nutzen, empfehle ich IMAP – und zwar verschlüsselt über IMAPS (Port 993). Zusätzlich liegen die Mails zentral auf dem Server und werden dort gesichert.`,
      keywords: ['IMAP', 'POP3', 'Server', 'synchronisiert', 'mehrere Geräte', '993', 'verschlüsselt'],
      explanation: `Unterschied (auf dem Server vs. herunterladen) + Empfehlung IMAP(S) mit Begründung.`,
    },
    {
      id: 'm10-q044',
      kind: 'single',
      skill: 'proto.services',
      difficulty: 2,
      prompt: `Warum ist eine korrekte Zeitsynchronisation per NTP in einer Active-Directory-Umgebung besonders wichtig?`,
      options: [
        'Weil sonst DHCP keine Adressen vergibt.',
        'Weil die Kerberos-Authentifizierung bei zu großer Zeitabweichung fehlschlägt.',
        'Weil Switches sonst keine MAC-Adressen lernen.',
        'Weil NTP die Lease-Zeiten verlängert.',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'DHCP funktioniert auch bei abweichender Uhrzeit.', error: 'ntp-dhcp' },
        '2': { why: 'MAC-Learning hängt nicht von der Uhrzeit ab.', error: 'ntp-switch' },
        '3': { why: 'NTP hat mit DHCP-Leases nichts zu tun.', error: 'ntp-lease' },
      },
      explanation: `**Kerberos** nutzt Zeitstempel gegen Replay-Angriffe; bei mehr als 5 Minuten Abweichung (Standard) scheitert die Anmeldung. Zudem: konsistente Logs, korrekte Zertifikatsprüfung.`,
    },
    {
      id: 'm10-q045',
      kind: 'single',
      skill: 'proto.services',
      difficulty: 2,
      prompt: `Ein Switch meldet dem Monitoring-Server selbstständig, dass ein Port ausgefallen ist. Wie heißt diese SNMP-Nachricht und welchen Port nutzt sie?`,
      options: ['GET, UDP 161', 'Trap, UDP 162', 'SET, TCP 161', 'Trap, TCP 25'],
      answer: 1,
      distractors: {
        '0': { why: 'GET ist eine Abfrage des Managers an den Agenten (161).', error: 'snmp-get' },
        '2': { why: 'SET ändert Werte; SNMP nutzt UDP.', error: 'snmp-set' },
        '3': { why: 'Port 25 ist SMTP.', error: 'snmp-port' },
      },
      explanation: `Ereignismeldung vom Agenten an den Manager = **Trap**, **UDP 162**.`,
    },
    {
      id: 'm10-q046',
      kind: 'single',
      skill: 'proto.services',
      difficulty: 2,
      prompt: `Wofür wird **LDAP** eingesetzt?`,
      options: [
        'Zum Abruf von E-Mails',
        'Zum Zugriff auf Verzeichnisdienste wie Active Directory (Benutzer, Gruppen)',
        'Zur Zeitsynchronisation',
        'Zur Überwachung von Netzwerkgeräten',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'Mails ruft man per IMAP oder POP3 ab.', error: 'ldap-mail' },
        '2': { why: 'Zeit synchronisiert NTP.', error: 'ldap-ntp' },
        '3': { why: 'Überwachung macht SNMP.', error: 'ldap-snmp' },
      },
      explanation: `**LDAP** (389, LDAPS 636) = Zugriffsprotokoll für **Verzeichnisdienste**, z. B. Active Directory.`,
    },
    {
      id: 'm10-q047',
      kind: 'multi',
      skill: 'proto.services',
      difficulty: 3,
      prompt: `Welche Aussagen zu SNMP sind richtig? (Mehrfachauswahl)`,
      options: [
        'SNMPv1 und v2c verwenden eine Community als Klartext-Passwort.',
        'SNMPv3 bietet Authentifizierung und Verschlüsselung.',
        'Der Manager fragt Agenten über UDP 161 ab.',
        'SNMP überträgt Webseiten.',
        'Die abfragbaren Werte sind in der MIB beschrieben.',
      ],
      answer: [0, 1, 2, 4],
      explanation: `Community im Klartext bei v1/v2c, Sicherheit bei v3, Abfrage über 161, Werte in der MIB. Webseiten überträgt HTTP.`,
    },
    // ---------- Abschluss-Mix ----------
    {
      id: 'm10-q048',
      kind: 'table',
      skill: 'proto.ports',
      difficulty: 3,
      prompt: `**Handlungssituation:** Für die Firewall zwischen Client-VLAN und Server-VLAN der Elektro Krämer GmbH sollen die nötigen Regeln dokumentiert werden. Trage Zielport und Protokoll ein.`,
      columns: [
        { key: 'need', label: 'Anforderung', type: 'text' },
        { key: 'port', label: 'Zielport', type: 'text' },
        { key: 'proto', label: 'TCP/UDP', type: 'text' },
      ],
      rows: [
        { cells: { need: { given: 'Namensauflösung über internen DNS-Server' }, port: { answer: '53' }, proto: { answer: 'UDP', accept: ['UDP', 'UDP/TCP', 'TCP/UDP', 'UDP und TCP'] } } },
        { cells: { need: { given: 'Zugriff auf Windows-Dateifreigaben' }, port: { answer: '445' }, proto: { answer: 'TCP' } } },
        { cells: { need: { given: 'Zeitabgleich mit dem internen Zeitserver' }, port: { answer: '123' }, proto: { answer: 'UDP' } } },
        { cells: { need: { given: 'Anmeldung von Anwendungen am Verzeichnisdienst, verschlüsselt' }, port: { answer: '636' }, proto: { answer: 'TCP' } } },
        { cells: { need: { given: 'Intranet-Webseite, verschlüsselt' }, port: { answer: '443' }, proto: { answer: 'TCP' } } },
      ],
      hints: ['Denk an DNS, SMB, NTP, LDAPS, HTTPS.'],
      explanation: `DNS 53/UDP (TCP zusätzlich sinnvoll), SMB 445/TCP, NTP 123/UDP, LDAPS 636/TCP, HTTPS 443/TCP.`,
    },
    {
      id: 'm10-q049',
      kind: 'number',
      skill: 'proto.ports',
      difficulty: 1,
      prompt: `Welchen Port nutzt **Telnet**?`,
      answer: 23,
      explanation: `Telnet = **TCP 23** (unverschlüsselt).`,
    },
    {
      id: 'm10-q050',
      kind: 'number',
      skill: 'proto.ports',
      difficulty: 2,
      prompt: `Welchen Port nutzt **IMAPS** (IMAP über TLS)?`,
      answer: 993,
      explanation: `IMAPS = **993** (unverschlüsselt: 143).`,
    },
    {
      id: 'm10-q051',
      kind: 'number',
      skill: 'proto.ports',
      difficulty: 2,
      prompt: `Welchen Port nutzt **POP3S** (POP3 über TLS)?`,
      answer: 995,
      explanation: `POP3S = **995** (unverschlüsselt: 110).`,
    },
    {
      id: 'm10-q052',
      kind: 'match',
      skill: 'proto.ports',
      difficulty: 3,
      prompt: `Ein Admin sieht im Firewall-Log folgende Zielports. Ordne den Dienst zu.`,
      left: ['UDP 67', 'TCP 636', 'UDP 69', 'TCP 3389', 'UDP 162'],
      right: ['TFTP', 'SNMP-Trap', 'LDAPS', 'DHCP-Server', 'RDP'],
      answer: [3, 2, 0, 4, 1],
      explanation: `UDP 67 = DHCP-Server, TCP 636 = LDAPS, UDP 69 = TFTP, TCP 3389 = RDP, UDP 162 = SNMP-Trap.`,
    },
    {
      id: 'm10-q053',
      kind: 'order',
      skill: 'proto.web',
      difficulty: 3,
      prompt: `Ein frisch gestarteter PC (DHCP-Client, leere Caches) ruft \`https://intranet.elektro-kraemer.local\` auf. Bringe die Protokollschritte in die richtige Reihenfolge.`,
      items: [
        'DHCP: DORA – PC erhält IP, Gateway und DNS-Server',
        'ARP: PC ermittelt die MAC des DNS-Servers (im selben Netz)',
        'DNS: Anfrage nach der IP von intranet.elektro-kraemer.local',
        'TCP: 3-Way-Handshake zum Webserver, Port 443',
        'TLS: Handshake mit Zertifikatsprüfung',
        'HTTP: GET-Anfrage und Antwort',
      ],
      hints: ['Ohne IP-Adresse geht gar nichts.', 'Bevor ein Frame an den DNS-Server gehen kann, braucht der PC dessen MAC.'],
      explanation: `Zuerst IP-Konfiguration per **DHCP**, dann **ARP** für die MAC des (lokalen) DNS-Servers, **DNS**-Auflösung, **TCP**-Verbindung, **TLS**, dann **HTTP**.`,
    },
    {
      id: 'm10-q054',
      kind: 'single',
      skill: 'proto.dns',
      difficulty: 1,
      prompt: `Mit welchem Befehl kannst du unter Windows prüfen, welche IP-Adresse ein DNS-Server für einen Namen liefert?`,
      options: ['ping -a', 'nslookup', 'arp -a', 'netstat -r'],
      answer: 1,
      distractors: {
        '0': { why: 'ping -a löst eine IP in einen Namen auf, fragt aber nicht gezielt einen DNS-Server ab.', error: 'cmd-dns' },
        '2': { why: 'arp -a zeigt den ARP-Cache.', error: 'cmd-arp' },
        '3': { why: 'netstat -r zeigt die Routingtabelle.', error: 'cmd-route' },
      },
      explanation: `\`nslookup <name>\` fragt den DNS-Server direkt ab und zeigt Antwort und antwortenden Server.`,
    },
    {
      id: 'm10-q055',
      kind: 'number',
      skill: 'proto.ports',
      difficulty: 1,
      prompt: `Welchen Port nutzt unverschlüsseltes **HTTP**?`,
      answer: 80,
      explanation: `HTTP = **TCP 80**.`,
    },
    {
      id: 'm10-q056',
      kind: 'number',
      skill: 'proto.ports',
      difficulty: 2,
      prompt: `Welchen Port nutzt **SMB** (Windows-Dateifreigaben)?`,
      answer: 445,
      explanation: `SMB = **TCP 445**.`,
    },
  ],
};
