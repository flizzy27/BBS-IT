import type { Module } from '../types';

export const m13: Module = {
  id: 'm13',
  nr: 13,
  title: 'Netzwerkdiagnose',
  short:
    'Mit ping, tracert, ipconfig, nslookup, netstat, arp, route und PowerShell systematisch Fehler finden – und aus Konsolenausgaben die Ursache ablesen.',
  icon: 'Stethoscope',
  relevance: 'ap1',
  prerequisites: ['m03', 'm10'],
  skills: [
    { id: 'diag.method', module: 'm13', title: 'Systematisch nach Schichten Fehler eingrenzen' },
    { id: 'diag.ipconfig', module: 'm13', title: 'ipconfig, getmac und hostname nutzen und Ausgaben lesen' },
    { id: 'diag.ping', module: 'm13', title: 'ping mit Optionen einsetzen und Ausgaben interpretieren', requires: ['diag.method'] },
    { id: 'diag.tracert', module: 'm13', title: 'tracert und pathping verstehen und auswerten', requires: ['diag.ping'] },
    { id: 'diag.dns', module: 'm13', title: 'DNS-Probleme mit nslookup und DNS-Cache diagnostizieren' },
    { id: 'diag.netstat', module: 'm13', title: 'Verbindungen und offene Ports mit netstat analysieren' },
    { id: 'diag.arproute', module: 'm13', title: 'ARP-Cache und Routingtabelle auslesen und ändern' },
    { id: 'diag.powershell', module: 'm13', title: 'PowerShell-Cmdlets zur Netzwerkdiagnose einsetzen' },
    {
      id: 'diag.scenario',
      module: 'm13',
      title: 'Fehlerursachen aus Konsolenausgaben ableiten',
      requires: ['diag.method', 'diag.ping', 'diag.ipconfig', 'diag.dns'],
    },
  ],

  /* ================================================================== */
  /* Lektionen                                                           */
  /* ================================================================== */
  lessons: [
    /* ---------------------------------------------------------------- */
    {
      id: 'm13-l01',
      title: 'Systematische Fehlersuche: Erst denken, dann tippen',
      minutes: 20,
      relevance: 'ap1',
      skills: ['diag.method'],
      steps: [
        {
          type: 'explain',
          title: 'Warum „einfach mal probieren“ nicht reicht',
          body: `Ein Anruf am Montagmorgen bei der **Elektro Krämer GmbH**: „Das Netzwerk geht nicht!“ Hinter diesem Satz kann alles stecken – ein abgezogenes Kabel, ein ausgefallener DHCP-Server, ein falscher DNS-Eintrag oder ein gestörter Internetanschluss. Wer jetzt wahllos Einstellungen ändert, macht es oft schlimmer und weiß am Ende nicht, was eigentlich geholfen hat.

Profis gehen **systematisch** vor:
1. **Problem genau erfassen:** Was geht nicht? Seit wann? Wer ist betroffen (ein PC, ein Raum, ein Standort, alle)? Was wurde zuletzt geändert?
2. **Hypothese bilden:** Auf welcher Schicht liegt das Problem vermutlich?
3. **Gezielt testen** – mit einem Befehl, dessen Ergebnis die Hypothese bestätigt oder widerlegt.
4. **Beheben**, dann **erneut testen**.
5. **Dokumentieren** (Ticket): Ursache, Lösung, Dauer.

**Drei Strategien zur Eingrenzung:**

| Strategie | Vorgehen | Wann sinnvoll? |
|---|---|---|
| **Bottom-up** | Vom OSI-Modell unten nach oben: Kabel/Link → IP-Konfiguration → Erreichbarkeit → Namensauflösung → Anwendung | Ursache völlig unklar, Einsteiger-Standard, gründlich |
| **Top-down** | Bei der Anwendung beginnen und nach unten arbeiten | Andere Programme funktionieren, nur eine Anwendung macht Probleme |
| **Divide & Conquer** | In der Mitte (meist Schicht 3, ein \`ping\`) starten. Klappt es → Problem liegt darüber, sonst darunter | Erfahrung vorhanden, schnelle Eingrenzung |

Ergänzend hilft der **Vergleich** mit einem funktionierenden Gerät (*Spot the difference*): Was ist bei Kollegin Yilmaz anders als beim betroffenen PC?`,
        },
        {
          type: 'visual',
          title: 'Bottom-up entlang der Schichten',
          widget: { kind: 'layers', data: { mode: 'tcpip', highlight: [1, 2, 3, 4], showProtocols: true } },
          caption:
            'Bottom-up heißt: Erst muss die Netzzugangsschicht (Kabel, Link, WLAN) stimmen, dann die IP-Konfiguration und Erreichbarkeit (Internet-Schicht), dann Ports/Transport und zuletzt die Anwendung (z. B. DNS, HTTP).',
        },
        {
          type: 'explain',
          title: 'Die klassische Ping-Kette: Von innen nach außen',
          body: `Für die Praxis und die Prüfung solltest du eine feste Testreihenfolge im Kopf haben. Jeder Schritt prüft „ein Stück weiter weg“:

| # | Test | Befehl (Beispiel) | Was beweist ein Erfolg? |
|---|---|---|---|
| 0 | Konfiguration ansehen | \`ipconfig /all\` | Adresse, Maske, Gateway, DNS plausibel? Kein 169.254? |
| 1 | **Loopback** | \`ping 127.0.0.1\` | Der **TCP/IP-Stack** des PCs funktioniert. |
| 2 | **Eigene IP** | \`ping 192.168.10.57\` | Die Adresse ist an die Netzwerkkarte gebunden. (Das Paket verlässt den PC dabei nicht!) |
| 3 | **Standardgateway** | \`ping 192.168.10.1\` | Das **lokale Netz** funktioniert: Kabel, Switch, VLAN, ARP. |
| 4 | **Externe IP** | \`ping 8.8.8.8\` | **Routing** über das Gateway und der Internetzugang (inkl. NAT) funktionieren. |
| 5 | **DNS-Name** | \`ping www.example.com\` bzw. \`nslookup\` | Die **Namensauflösung** funktioniert. |

**Der erste Schritt, der fehlschlägt, zeigt dir die Problemzone.** Klappt 3, aber nicht 4, liegt das Problem hinter dem Gateway. Klappt 4, aber nicht 5, ist es DNS.

> **Achtung:** Ein fehlgeschlagener Ping beweist nicht immer einen Defekt. Viele Geräte (z. B. Windows-PCs mit aktiver Firewall) beantworten ICMP-Echo-Anfragen absichtlich nicht. Ein Gateway oder öffentlicher DNS-Server antwortet dagegen fast immer.`,
        },
        {
          type: 'example',
          title: 'Eingrenzung bei „Internet geht nicht“',
          problem: `Herr Becker (PC \`HH-PC-031\`) meldet, dass keine Webseite lädt. Du arbeitest die Ping-Kette ab:

- \`ipconfig\`: IPv4 \`192.168.10.31\`, Maske \`255.255.255.0\`, Gateway \`192.168.10.1\`, DNS \`192.168.10.5\`
- \`ping 127.0.0.1\` → 4 Antworten
- \`ping 192.168.10.1\` → 4 Antworten
- \`ping 8.8.8.8\` → 4 Antworten
- \`ping www.example.com\` → „Ping-Anforderung konnte Host "www.example.com" nicht finden.“

Wo liegt das Problem?`,
          steps: [
            { label: 'Konfiguration', body: 'Adresse und Gateway liegen im selben /24-Netz, keine APIPA-Adresse → DHCP und IP-Konfiguration sind plausibel.' },
            { label: 'Schritte 1–4', body: 'Loopback, Gateway und eine externe IP antworten. Damit sind Stack, LAN, Routing und Internetzugang in Ordnung.' },
            { label: 'Schritt 5', body: 'Erst die **Namensauflösung** scheitert. Problemzone: DNS (Anwendungsschicht).' },
            { label: 'Nächster Test', body: '`nslookup www.example.com` → klären, ob der DNS-Server `192.168.10.5` antwortet. Zum Vergleich `nslookup www.example.com 8.8.8.8`.' },
          ],
          result: 'Alles bis einschließlich Schicht 3 funktioniert – das Problem liegt bei DNS. Weiter mit nslookup.',
        },
        {
          type: 'check',
          question: {
            id: 'm13-l01-c1',
            kind: 'single',
            skill: 'diag.method',
            difficulty: 1,
            prompt: 'Was prüfst du mit `ping 127.0.0.1`?',
            options: [
              'Ob der TCP/IP-Stack des eigenen Rechners funktioniert',
              'Ob das Standardgateway erreichbar ist',
              'Ob der DNS-Server antwortet',
              'Ob das Netzwerkkabel korrekt steckt',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'Die Loopback-Adresse verlässt den Rechner nie – ein Gateway wird nicht angesprochen.', error: 'loopback-falsch' },
              '2': { why: 'Bei einer IP-Adresse wird kein DNS benötigt.', error: 'dns-falsch-zugeordnet' },
              '3': { why: 'Loopback funktioniert auch ohne Kabel, weil kein Paket hinausgeht.', error: 'loopback-falsch' },
            },
            explanation: '127.0.0.1 ist die Loopback-Adresse („localhost“). Antworten beweisen, dass der TCP/IP-Stack arbeitet – mehr nicht.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'm13-l01-c2',
            kind: 'single',
            skill: 'diag.method',
            difficulty: 2,
            prompt: 'Nur das Warenwirtschaftsprogramm meldet „Server nicht erreichbar“. E-Mail, Internet und Dateifreigaben funktionieren am selben PC. Welche Strategie ist hier am effizientesten?',
            options: ['Top-down', 'Bottom-up mit Kabeltest', 'Austausch der Netzwerkkarte', 'Neuinstallation des Betriebssystems'],
            answer: 0,
            distractors: {
              '1': { why: 'Die unteren Schichten funktionieren offensichtlich, sonst gingen E-Mail und Internet nicht.', error: 'strategie-ineffizient' },
              '2': { why: 'Die Netzwerkkarte arbeitet ja für andere Anwendungen.', error: 'strategie-ineffizient' },
              '3': { why: 'Massive Eingriffe ohne Diagnose sind keine Fehlersuche.', error: 'strategie-ineffizient' },
            },
            explanation: 'Weil andere Netzanwendungen laufen, sind die unteren Schichten intakt. Man beginnt oben: Anwendung, Servername/DNS, Port erreichbar (z. B. Test-NetConnection -Port), Firewall.',
          },
        },
        {
          type: 'practice',
          title: 'Übung: Vorgehensweise',
          questionIds: ['m13-q001', 'm13-q002', 'm13-q031', 'm13-q040'],
          count: 4,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Erst Problem erfassen (wer, was, seit wann, was geändert?), dann Hypothese, gezielter Test, Behebung, Kontrolle, Dokumentation.',
            'Bottom-up: vom Kabel zur Anwendung. Top-down: von der Anwendung nach unten. Divide & Conquer: in der Mitte (ping) beginnen.',
            'Ping-Kette: ipconfig → 127.0.0.1 → eigene IP → Gateway → externe IP → DNS-Name.',
            'Der erste fehlschlagende Schritt zeigt die Problemzone.',
            'Eine fehlende Ping-Antwort kann auch an einer Firewall liegen, die ICMP blockiert.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'm13-l02',
      title: 'ipconfig, getmac und hostname: Was weiß der PC über sich selbst?',
      minutes: 25,
      relevance: 'ap1',
      skills: ['diag.ipconfig'],
      steps: [
        {
          type: 'explain',
          title: 'ipconfig und seine wichtigsten Schalter',
          body: `\`ipconfig\` ist der erste Befehl bei fast jeder Fehlersuche unter Windows. Er zeigt die IP-Konfiguration aller Netzwerkadapter.

| Befehl | Wirkung |
|---|---|
| \`ipconfig\` | Kurzübersicht: IPv4/IPv6-Adresse, Subnetzmaske, Standardgateway |
| \`ipconfig /all\` | **Alles**: zusätzlich Hostname, MAC (Physische Adresse), DHCP aktiviert, DHCP-Server, Lease-Zeiten, DNS-Server |
| \`ipconfig /release\` | gibt die per DHCP bezogene IPv4-Adresse zurück (DHCPRELEASE) |
| \`ipconfig /renew\` | fordert neu eine Adresse an bzw. verlängert sie (DHCP) |
| \`ipconfig /flushdns\` | leert den lokalen **DNS-Cache** |
| \`ipconfig /displaydns\` | zeigt den Inhalt des DNS-Caches (inkl. Einträge aus der hosts-Datei) |
| \`ipconfig /registerdns\` | registriert den PC neu im DNS (bei dynamischem DNS) |

Für IPv6 gibt es \`/release6\` und \`/renew6\`.

**Typische Kombination:** Nach einer Änderung am DHCP-Server oder einem VLAN-Wechsel: \`ipconfig /release\` und danach \`ipconfig /renew\`.

**Zwei kleine Helfer:**
- \`hostname\` gibt nur den **Computernamen** aus, z. B. \`HH-PC-057\` – praktisch, wenn ein Anrufer seinen PC-Namen nicht kennt.
- \`getmac\` listet die **MAC-Adressen** (Physische Adressen) aller Adapter, z. B. für eine DHCP-Reservierung oder Port Security. \`getmac /v\` zeigt zusätzlich die Adapternamen.`,
        },
        {
          type: 'explain',
          title: 'Eine ipconfig-/all-Ausgabe lesen',
          body: `So sieht \`ipconfig /all\` auf einem PC der Elektro Krämer GmbH aus (gekürzt):

\`\`\`
C:\\>ipconfig /all

Windows-IP-Konfiguration

   Hostname  . . . . . . . . . . . . : HH-PC-057
   Primäres DNS-Suffix . . . . . . . : elektro-kraemer.local
   Knotentyp . . . . . . . . . . . . : Hybrid
   IP-Routing aktiviert  . . . . . . : Nein
   WINS-Proxy aktiviert  . . . . . . : Nein
   DNS-Suffixsuchliste . . . . . . . : elektro-kraemer.local

Ethernet-Adapter Ethernet:

   Verbindungsspezifisches DNS-Suffix: elektro-kraemer.local
   Beschreibung. . . . . . . . . . . : Intel(R) Ethernet Connection (17) I219-LM
   Physische Adresse . . . . . . . . : 3C-52-82-1A-7F-57
   DHCP aktiviert. . . . . . . . . . : Ja
   Autokonfiguration aktiviert . . . : Ja
   Verbindungslokale IPv6-Adresse  . : fe80::4a1c:9e2b:77d0:13f5%12(Bevorzugt)
   IPv4-Adresse  . . . . . . . . . . : 192.168.10.57(Bevorzugt)
   Subnetzmaske  . . . . . . . . . . : 255.255.255.0
   Lease erhalten. . . . . . . . . . : Montag, 2. November 2026 07:58:12
   Lease läuft ab. . . . . . . . . . : Dienstag, 10. November 2026 07:58:12
   Standardgateway . . . . . . . . . : 192.168.10.1
   DHCP-Server . . . . . . . . . . . : 192.168.10.5
   DNS-Server  . . . . . . . . . . . : 192.168.10.5
   NetBIOS über TCP/IP . . . . . . . : Aktiviert

Drahtlos-LAN-Adapter WLAN:

   Medienstatus. . . . . . . . . . . : Medium getrennt
   Verbindungsspezifisches DNS-Suffix:
   Beschreibung. . . . . . . . . . . : Intel(R) Wi-Fi 6E AX211 160MHz
   Physische Adresse . . . . . . . . : 4C-77-CB-12-9A-0E
   DHCP aktiviert. . . . . . . . . . : Ja
   Autokonfiguration aktiviert . . . : Ja
\`\`\`

**Worauf du achtest:**
- **Medienstatus „Medium getrennt“** → kein Link (Kabel ab, WLAN nicht verbunden, Port aus). Hier betrifft es nur den ungenutzten WLAN-Adapter – völlig normal.
- **„(Bevorzugt)“** hinter der Adresse → Adresse ist gültig und aktiv. Steht dort „(Duplikat)“, gibt es einen **IP-Adresskonflikt**.
- **„Autokonfiguration IPv4-Adresse“ mit 169.254.x.x** → kein DHCP-Server erreicht (APIPA).
- **Gateway und DNS-Server** im passenden Netz? Fehlt das Gateway?
- **DHCP-Server und Lease-Zeiten** → woher kommt die Adresse, wie lange gilt sie? (Die Lease hier: 8 Tage.)`,
        },
        {
          type: 'visual',
          title: 'Welcher Befehl liefert was?',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'ipconfig', text: 'Kurzübersicht: IP, Maske, Gateway je Adapter.', icon: 'Terminal' },
                { title: 'ipconfig /all', text: 'Zusätzlich MAC, DHCP-Server, Lease, DNS-Server, Hostname.', icon: 'ListTree' },
                { title: '/release + /renew', text: 'DHCP-Adresse zurückgeben und neu anfordern.', icon: 'RefreshCw' },
                { title: '/flushdns', text: 'Lokalen DNS-Cache leeren – nach DNS-Änderungen.', icon: 'Eraser' },
                { title: 'hostname', text: 'Gibt nur den Computernamen aus.', icon: 'Monitor' },
                { title: 'getmac', text: 'Listet die MAC-Adressen aller Adapter.', icon: 'Fingerprint' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Adresskonflikt nach Druckerinstallation',
          problem: `Nachdem ein Kollege einen neuen Drucker mit fester IP installiert hat, verliert ein PC immer wieder die Verbindung. \`ipconfig /all\` zeigt beim PC:

\`\`\`
   IPv4-Adresse  . . . . . . . . . . : 192.168.10.88(Duplikat)
   Subnetzmaske  . . . . . . . . . . : 255.255.255.0
   Standardgateway . . . . . . . . . : 192.168.10.1
\`\`\`

Was ist passiert, und wie behebst du es dauerhaft?`,
          steps: [
            { label: 'Ausgabe deuten', body: '„(Duplikat)“ statt „(Bevorzugt)“: Windows hat erkannt, dass ein anderes Gerät dieselbe IP benutzt (per ARP-Prüfung).' },
            { label: 'Ursache', body: 'Der Drucker wurde **statisch** mit `192.168.10.88` konfiguriert – einer Adresse, die im **dynamischen DHCP-Bereich** liegt. DHCP hat sie zusätzlich an den PC vergeben.' },
            { label: 'Sofortmaßnahme', body: 'Am PC `ipconfig /release` und `ipconfig /renew` → er bekommt eine andere Adresse (der Server bemerkt den Konflikt bzw. die Adresse wird markiert).' },
            { label: 'Dauerhafte Lösung', body: 'Entweder eine **Reservierung** für die MAC-Adresse des Druckers anlegen und den Drucker auf DHCP stellen – oder die Druckeradresse in den **Ausschlussbereich** legen. Dokumentation der statischen Adressen aktualisieren.' },
          ],
          result: 'IP-Adresskonflikt durch statische Adresse im DHCP-Bereich. Kurzfristig release/renew, dauerhaft Reservierung oder Ausschluss.',
        },
        {
          type: 'check',
          question: {
            id: 'm13-l02-c1',
            kind: 'text',
            skill: 'diag.ipconfig',
            difficulty: 1,
            prompt: 'Mit welchem Befehl (inkl. Schalter) zeigst du unter Windows **zusätzlich** zur IP-Adresse auch MAC-Adresse, DHCP-Server und DNS-Server an?',
            accept: ['ipconfig /all', 'ipconfig -all', 'ipconfig.exe /all'],
            placeholder: 'Befehl eingeben',
            explanation: '`ipconfig /all` zeigt die vollständige Konfiguration aller Adapter.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'm13-l02-c2',
            kind: 'single',
            skill: 'diag.ipconfig',
            difficulty: 1,
            prompt: '`ipconfig` zeigt beim Ethernet-Adapter: `Medienstatus. . . : Medium getrennt`. Was prüfst du zuerst?',
            options: ['Netzwerkkabel, Dose und Switchport (Link-LED)', 'DNS-Server-Eintrag', 'Die hosts-Datei', 'Die Lease-Dauer am DHCP-Server'],
            answer: 0,
            distractors: {
              '1': { why: 'DNS spielt erst eine Rolle, wenn überhaupt eine Verbindung besteht.', error: 'schicht-falsch' },
              '2': { why: 'Die hosts-Datei betrifft Namensauflösung, nicht den physischen Link.', error: 'schicht-falsch' },
              '3': { why: 'Ohne Link kommt keine DHCP-Kommunikation zustande – die Lease-Dauer ist irrelevant.', error: 'schicht-falsch' },
            },
            explanation: '„Medium getrennt“ bedeutet: Die Netzwerkkarte hat keinen Link. Das ist ein Problem der Schicht 1 – Kabel, Dose, Patchfeld, Switchport.',
          },
        },
        {
          type: 'practice',
          title: 'Übung: ipconfig & Co.',
          questionIds: ['m13-q003', 'm13-q012', 'm13-q026', 'm13-q027', 'm13-q028', 'm13-q038', 'm13-q039'],
          count: 5,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'ipconfig = Kurzübersicht, ipconfig /all = vollständig (MAC, DHCP-Server, Lease, DNS).',
            '/release + /renew = DHCP-Adresse zurückgeben und neu holen; /flushdns leert, /displaydns zeigt den DNS-Cache.',
            '„Medium getrennt“ = kein Link; „(Duplikat)“ = IP-Konflikt; „Autokonfiguration IPv4-Adresse 169.254.x.x“ = kein DHCP.',
            'hostname zeigt den Computernamen, getmac die MAC-Adressen.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'm13-l03',
      title: 'ping: Optionen und Ausgaben richtig deuten',
      minutes: 30,
      relevance: 'ap1',
      skills: ['diag.ping'],
      steps: [
        {
          type: 'explain',
          title: 'Was ping eigentlich macht',
          body: `\`ping\` sendet **ICMP Echo Request**-Pakete (ICMP-Typ 8) an ein Ziel und wartet auf **ICMP Echo Reply** (Typ 0). ICMP gehört zur Internetschicht (Schicht 3) – es gibt **keine Ports**. Ein erfolgreicher Ping zeigt also: Das Ziel ist auf IP-Ebene hin **und zurück** erreichbar.

**Wichtige Optionen (Windows):**

| Option | Bedeutung | Beispiel |
|---|---|---|
| \`-t\` | pingt **dauerhaft**, bis du mit **Strg+C** abbrichst (Strg+Untbr zeigt Zwischenstatistik) | \`ping -t 192.168.10.1\` |
| \`-n Anzahl\` | Anzahl der Echo-Anfragen (Standard: **4**) | \`ping -n 10 192.168.10.5\` |
| \`-l Größe\` | Größe der Nutzdaten in Byte (Standard: **32**) | \`ping -l 1400 192.168.10.5\` |
| \`-4\` / \`-6\` | IPv4 bzw. IPv6 erzwingen | \`ping -6 www.example.com\` |
| \`-a\` | IP-Adresse in Namen auflösen (Reverse-Lookup) | \`ping -a 192.168.10.5\` |
| \`-w ms\` | Zeitlimit pro Antwort in Millisekunden | \`ping -w 2000 …\` |
| \`-i TTL\` | TTL der gesendeten Pakete festlegen | \`ping -i 1 8.8.8.8\` |
| \`-f\` | „Don't Fragment“-Bit setzen (MTU-Tests) | \`ping -f -l 1472 …\` |

\`ping -t\` ist ideal, während du ein Kabel tauschst oder einen Switchport umkonfigurierst: Du siehst live, wann die Antworten wieder kommen.`,
        },
        {
          type: 'explain',
          title: 'Die Ausgaben – und was sie wirklich bedeuten',
          body: `**1. Erfolg**

\`\`\`
C:\\>ping 192.168.10.1

Ping wird ausgeführt für 192.168.10.1 mit 32 Bytes Daten:
Antwort von 192.168.10.1: Bytes=32 Zeit<1ms TTL=64
Antwort von 192.168.10.1: Bytes=32 Zeit<1ms TTL=64
Antwort von 192.168.10.1: Bytes=32 Zeit=1ms TTL=64
Antwort von 192.168.10.1: Bytes=32 Zeit<1ms TTL=64

Ping-Statistik für 192.168.10.1:
    Pakete: Gesendet = 4, Empfangen = 4, Verloren = 0
    (0% Verlust),
Ca. Zeitangaben in Millisek.:
    Minimum = 0ms, Maximum = 1ms, Mittelwert = 0ms
\`\`\`

**Zeit** = Round Trip Time (hin und zurück). Im LAN unter 1 ms, ins Internet typisch 5–50 ms.

**2. Zeitüberschreitung der Anforderung** – innerhalb des Zeitlimits (Standard 4 s) kam **keine** Antwort:

\`\`\`
Ping wird ausgeführt für 192.168.10.80 mit 32 Bytes Daten:
Zeitüberschreitung der Anforderung.
Zeitüberschreitung der Anforderung.
Zeitüberschreitung der Anforderung.
Zeitüberschreitung der Anforderung.

Ping-Statistik für 192.168.10.80:
    Pakete: Gesendet = 4, Empfangen = 0, Verloren = 4
    (100% Verlust),
\`\`\`
Mögliche Gründe: Ziel aus, Firewall blockiert ICMP, Rückweg fehlt (Ziel hat falsches Gateway), Paketverlust.

**3. Zielhost nicht erreichbar** – genau hinschauen, **wer** antwortet:

\`\`\`
Ping wird ausgeführt für 192.168.10.80 mit 32 Bytes Daten:
Antwort von 192.168.10.57: Zielhost nicht erreichbar.
Antwort von 192.168.10.57: Zielhost nicht erreichbar.
Antwort von 192.168.10.57: Zielhost nicht erreichbar.
Antwort von 192.168.10.57: Zielhost nicht erreichbar.

Ping-Statistik für 192.168.10.80:
    Pakete: Gesendet = 4, Empfangen = 4, Verloren = 0
    (0% Verlust),
\`\`\`
\`192.168.10.57\` ist der **eigene PC**. Das Ziel liegt im eigenen Netz, aber der PC bekommt auf seine **ARP-Anfrage keine Antwort** – es gibt dort (gerade) kein Gerät. **Falle:** Die Statistik zeigt „Empfangen = 4, 0 % Verlust“, weil Windows die Fehlermeldungen als Antworten zählt. Nie nur auf die Statistik schauen!

Antwortet dagegen ein **Router** (\`Antwort von 192.168.10.1: Zielhost nicht erreichbar.\` bzw. \`Zielnetz nicht erreichbar.\`), weiß dieser Router keinen Weg zum Ziel.

**4. Name nicht auflösbar**
\`\`\`
Ping-Anforderung konnte Host "www.elektro-kraemer.dee" nicht finden. Überprüfen Sie den Namen, und versuchen Sie es erneut.
\`\`\`
Es wurde **kein einziges Paket** gesendet – die DNS-Auflösung ist gescheitert (Tippfehler oder DNS-Problem).

**5. TTL beim Transport überschritten** – ein Router hat das Paket verworfen, weil die TTL auf 0 gefallen ist (Routing-Schleife oder absichtlich kleine TTL mit \`-i\`).`,
        },
        {
          type: 'explain',
          title: 'Was der TTL-Wert in der Antwort verrät',
          body: `Jedes IP-Paket hat ein **TTL**-Feld (*Time To Live*). Der Absender setzt einen Startwert, **jeder Router zieht 1 ab**. Erreicht die TTL 0, wird das Paket verworfen (Schutz vor Endlosschleifen).

Typische **Startwerte**:

| System | Start-TTL |
|---|---|
| Windows | **128** |
| Linux, macOS, viele Router/Firewalls auf Linux-Basis | **64** |
| viele Netzwerkgeräte (z. B. Cisco IOS) | **255** |

Die TTL in der Ping-Ausgabe ist die TTL des **Antwortpakets** beim Eintreffen. Daraus kannst du zwei Dinge schätzen:
- **Welches Betriebssystem** antwortet: Nimm den nächsthöheren typischen Startwert.
- **Wie viele Router** dazwischen liegen: Startwert − empfangene TTL.

Beispiel: \`TTL=118\` → Startwert vermutlich 128 (Windows) → **10 Hops** entfernt. \`TTL=57\` → Startwert 64 → **7 Hops**. \`TTL=64\` vom Gateway im eigenen Netz → 0 Hops, das Gateway läuft vermutlich auf Linux-Basis.

> Das ist eine **Schätzung** – Startwerte lassen sich ändern. In der Prüfung wird aber genau so gerechnet.`,
        },
        {
          type: 'example',
          title: 'Drei Ping-Ausgaben, drei Diagnosen',
          problem: `Am PC \`192.168.10.57\` (Gateway \`192.168.10.1\`) testest du drei Ziele. Diagnostiziere jeweils.

\`\`\`
C:\\>ping 192.168.10.20
Antwort von 192.168.10.20: Bytes=32 Zeit<1ms TTL=128
...
C:\\>ping 192.168.10.120
Antwort von 192.168.10.57: Zielhost nicht erreichbar.
...
C:\\>ping 192.0.2.80
Antwort von 192.0.2.80: Bytes=32 Zeit=14ms TTL=52
...
\`\`\``,
          steps: [
            { label: 'Ziel 192.168.10.20', body: 'Antwort mit **TTL=128**, Zeit <1 ms → Gerät im selben Netz (0 Hops), Startwert 128 → vermutlich ein **Windows**-System. Alles in Ordnung.' },
            { label: 'Ziel 192.168.10.120', body: 'Die Fehlermeldung kommt vom **eigenen PC** (.57). Das Ziel liegt im eigenen /24-Netz, aber niemand antwortet auf ARP → Gerät **aus**, nicht angeschlossen oder in einem anderen VLAN. Trotz „0 % Verlust“ in der Statistik ist das Ziel **nicht** erreichbar.' },
            { label: 'Ziel 192.0.2.80', body: 'Antwort mit **TTL=52**, 14 ms → Startwert vermutlich 64 (Linux) → **12 Hops** entfernt. Internetzugang und Routing funktionieren.' },
          ],
          result: '.20: Windows-Host lokal erreichbar · .120: lokal kein Gerät per ARP gefunden · 192.0.2.80: Linux-Server 12 Hops entfernt, erreichbar.',
        },
        {
          type: 'check',
          question: {
            id: 'm13-l03-c1',
            kind: 'number',
            skill: 'diag.ping',
            difficulty: 2,
            prompt: 'Ein Ping auf einen Server liefert `TTL=118`. Wie viele Router (Hops) liegen vermutlich zwischen dir und dem Server, wenn der Server ein Windows-System ist?',
            answer: 10,
            explanation: 'Windows startet mit TTL 128. Jeder Router zieht 1 ab: 128 − 118 = 10 Hops.',
            hints: ['Welchen Start-TTL nutzt Windows?'],
          },
        },
        {
          type: 'check',
          question: {
            id: 'm13-l03-c2',
            kind: 'text',
            skill: 'diag.ping',
            difficulty: 1,
            prompt: 'Du tauschst ein Patchkabel und willst dabei **dauerhaft** sehen, ab wann das Gateway `192.168.10.1` wieder antwortet. Gib den vollständigen Befehl an.',
            accept: ['ping -t 192.168.10.1', 'ping 192.168.10.1 -t', 'ping /t 192.168.10.1', 'ping 192.168.10.1 /t'],
            placeholder: 'ping …',
            explanation: '`ping -t` pingt endlos, bis du mit Strg+C abbrichst.',
          },
        },
        {
          type: 'practice',
          title: 'Übung: ping',
          questionIds: ['m13-q004', 'm13-q005', 'm13-q006', 'm13-q007', 'm13-q008', 'm13-q033', 'm13-q034', 'm13-q035', 'm13-q037', 'm13-q043', 'm13-q046'],
          count: 6,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'ping nutzt ICMP Echo Request/Reply (Schicht 3, keine Ports).',
            'Optionen: -t dauerhaft, -n Anzahl, -l Paketgröße, -4/-6 Protokoll, -a Namen auflösen, -i TTL.',
            '„Zeitüberschreitung der Anforderung“ = keine Antwort (Ziel aus, Firewall, Rückweg fehlt).',
            '„Antwort von <eigene IP>: Zielhost nicht erreichbar“ = im eigenen Netz kein ARP-Partner – die Statistik zählt das trotzdem als empfangen!',
            '„Host nicht finden“ = DNS-Auflösung gescheitert, es wurde gar nicht gepingt.',
            'TTL-Startwerte: Windows 128, Linux 64, Netzwerkgeräte oft 255 → Hops = Startwert − empfangene TTL.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'm13-l04',
      title: 'tracert und pathping: Den Weg eines Pakets verfolgen',
      minutes: 25,
      relevance: 'ap1',
      skills: ['diag.tracert'],
      steps: [
        {
          type: 'explain',
          title: 'Der TTL-Trick hinter tracert',
          body: `\`ping\` sagt dir nur „Ziel erreichbar oder nicht“. \`tracert\` (unter Linux \`traceroute\`) zeigt dir **jeden Router auf dem Weg** – damit findest du heraus, **wo** die Verbindung abbricht.

Das Prinzip nutzt die TTL geschickt aus:
1. tracert schickt Pakete mit **TTL = 1**. Der **erste Router** zieht 1 ab → TTL 0 → er verwirft das Paket und schickt eine **ICMP-Meldung „Time Exceeded“** (Typ 11) zurück. Damit kennt tracert die Adresse von Router 1 und die Laufzeit.
2. Dann **TTL = 2** → der zweite Router meldet sich.
3. … und so weiter, bis das **Ziel selbst** mit einem ICMP Echo Reply antwortet oder die maximale Hop-Zahl (Standard **30**) erreicht ist.

Pro Hop sendet Windows **drei** Pakete – daher drei Zeitangaben pro Zeile.

> Windows-\`tracert\` verwendet **ICMP Echo Requests**, Linux-\`traceroute\` standardmäßig **UDP**-Pakete an hohe Ports. Das Prinzip mit der TTL ist dasselbe.

**Nützliche Optionen:** \`-d\` (keine Namensauflösung der Router – deutlich schneller), \`-h 15\` (maximal 15 Hops), \`-4\`/\`-6\`.

**Sternchen \`*\`:** Für dieses Paket kam innerhalb des Zeitlimits keine Antwort. Ursachen:
- Der Router **beantwortet bzw. erzeugt keine ICMP-Time-Exceeded-Meldungen** oder sie werden gefiltert – sehr häufig bei Provider-Routern und Firewalls. **Geht es danach normal weiter, ist das kein Problem.**
- Kommen **ab einem Hop nur noch Sternchen** bis zum Ende, endet der Weg dort – das Problem liegt bei bzw. **hinter dem letzten antwortenden Router** (oder das Ziel blockiert ICMP).`,
        },
        {
          type: 'visual',
          title: 'So arbeitet tracert',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['PC', 'Router 1 (Gateway)', 'Router 2 (Provider)', 'Zielserver'],
              messages: [
                { from: 0, to: 1, label: 'Echo Request, TTL=1', note: 'Router 1 setzt TTL auf 0' },
                { from: 1, to: 0, label: 'ICMP Time Exceeded', note: 'Hop 1 bekannt' },
                { from: 0, to: 2, label: 'Echo Request, TTL=2', note: 'Router 1 → TTL 1, Router 2 → TTL 0' },
                { from: 2, to: 0, label: 'ICMP Time Exceeded', note: 'Hop 2 bekannt' },
                { from: 0, to: 3, label: 'Echo Request, TTL=3', note: 'erreicht das Ziel' },
                { from: 3, to: 0, label: 'ICMP Echo Reply', note: 'Ziel erreicht – Ablaufverfolgung beendet' },
              ],
            },
          },
          caption: 'Mit jeder Runde wird die TTL um 1 erhöht. Jeder Router „verrät“ sich durch seine Time-Exceeded-Meldung, das Ziel durch den Echo Reply.',
        },
        {
          type: 'explain',
          title: 'Eine tracert-Ausgabe lesen – und pathping',
          body: `\`\`\`
C:\\>tracert shop.lieferant.example

Routenverfolgung zu shop.lieferant.example [192.0.2.80]
über maximal 30 Hops:

  1    <1 ms    <1 ms    <1 ms  fw-hh.elektro-kraemer.local [192.168.10.1]
  2     7 ms     6 ms     7 ms  198.51.100.1
  3     *        *        *     Zeitüberschreitung der Anforderung.
  4    11 ms    12 ms    11 ms  198.51.100.254
  5    14 ms    13 ms    14 ms  shop.lieferant.example [192.0.2.80]

Ablaufverfolgung beendet.
\`\`\`

- **Hop 1** ist immer das **eigene Standardgateway**. Fehlt schon diese Zeile (nur Sternchen), stimmt etwas mit dem Gateway oder dem lokalen Netz nicht.
- **Hop 3** antwortet nicht – da Hop 4 und 5 aber antworten, leitet dieser Router durchaus weiter. Er schickt nur keine ICMP-Meldungen. **Kein Fehler.**
- Die Zeiten steigen mit der Entfernung. Ein **plötzlicher, bleibender** Sprung (z. B. von 10 auf 150 ms) deutet auf eine langsame oder überlastete Strecke hin (oder auf eine Interkontinentalverbindung).

**pathping** kombiniert tracert und ping: Erst ermittelt es den Weg, dann sendet es über einen längeren Zeitraum (standardmäßig 100 Anfragen pro Hop) Pakete an **jeden** Router und berechnet **Paketverlust pro Hop und pro Verbindung**. Das dauert pro Hop rund 25 Sekunden, zeigt aber zuverlässig, **an welcher Stelle** Pakete verloren gehen – ideal bei sporadischen Aussetzern (z. B. ruckelnde VoIP-Gespräche). Mit \`-n\` wird die Namensauflösung abgeschaltet.`,
        },
        {
          type: 'example',
          title: 'Berlin erreicht den Dateiserver in Hamburg nicht',
          problem: `Vom Berliner PC (\`192.168.20.15\`) ist der Dateiserver \`192.168.10.5\` in Hamburg plötzlich nicht mehr erreichbar. Internetseiten funktionieren. Ausgabe:

\`\`\`
C:\\>tracert -d 192.168.10.5

Routenverfolgung zu 192.168.10.5 über maximal 30 Hops

  1    <1 ms    <1 ms    <1 ms  192.168.20.1
  2     *        *        *     Zeitüberschreitung der Anforderung.
  3     *        *        *     Zeitüberschreitung der Anforderung.
  4     *        *        *     Zeitüberschreitung der Anforderung.
^C
\`\`\`

Was kannst du daraus schließen?`,
          steps: [
            { label: 'Hop 1', body: 'Das Berliner Gateway/Firewall `192.168.20.1` antwortet → lokales Netz und Gateway funktionieren.' },
            { label: 'Ab Hop 2 nur Sternchen', body: 'Hinter dem Berliner Gateway kommt nichts mehr an. Im Normalfall wäre Hop 2 bereits die Gegenstelle im VPN-Tunnel bzw. der Hamburger Router.' },
            { label: 'Zusammenhang mit dem Internet', body: 'Internet funktioniert, also ist der Internetanschluss in Berlin ok. Der Verkehr nach 192.168.10.0/24 wird in den **VPN-Tunnel** geleitet – der ist offenbar **ausgefallen** (oder die Gegenstelle in Hamburg ist down).' },
            { label: 'Nächste Schritte', body: 'VPN-Status auf der Berliner Firewall prüfen (Tunnel up? IKE-Fehler?), Erreichbarkeit der öffentlichen IP der Hamburger Firewall testen, ggf. Tunnel neu aufbauen.' },
          ],
          result: 'Gateway in Berlin erreichbar, danach kein Hop mehr → Problem beim Site-to-Site-VPN bzw. bei der Gegenstelle Hamburg.',
        },
        {
          type: 'check',
          question: {
            id: 'm13-l04-c1',
            kind: 'single',
            skill: 'diag.tracert',
            difficulty: 2,
            prompt: 'Welche ICMP-Meldung schicken die Router auf dem Weg an den PC zurück, damit tracert sie anzeigen kann?',
            options: ['Time Exceeded (TTL abgelaufen)', 'Echo Reply', 'Destination Unreachable', 'Redirect'],
            answer: 0,
            distractors: {
              '1': { why: 'Echo Reply sendet nur das Ziel selbst – dadurch erkennt tracert das Ende.', error: 'icmp-typ-verwechselt' },
              '2': { why: 'Destination Unreachable signalisiert, dass kein Weg zum Ziel bekannt ist – nicht das normale tracert-Verhalten.', error: 'icmp-typ-verwechselt' },
              '3': { why: 'Redirect empfiehlt einem Host ein besseres Gateway, hat mit tracert nichts zu tun.', error: 'icmp-typ-verwechselt' },
            },
            explanation: 'Jeder Router, bei dem die TTL auf 0 fällt, verwirft das Paket und meldet „Time Exceeded“ (ICMP-Typ 11). Dadurch erfährt tracert seine Adresse.',
          },
        },
        {
          type: 'practice',
          title: 'Übung: tracert & pathping',
          questionIds: ['m13-q009', 'm13-q010', 'm13-q011', 'm13-q030', 'm13-q032', 'm13-q036'],
          count: 5,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'tracert sendet Pakete mit TTL 1, 2, 3 …; jeder Router antwortet mit ICMP Time Exceeded, das Ziel mit Echo Reply.',
            'Hop 1 ist das eigene Standardgateway. Standard: max. 30 Hops, 3 Pakete pro Hop; -d verzichtet auf Namensauflösung.',
            'Einzelne Sternchen-Zeilen mit normal weiterlaufenden Hops sind harmlos (ICMP gefiltert).',
            'Nur noch Sternchen ab einem Hop → Problem bei/hinter dem letzten antwortenden Router.',
            'pathping misst zusätzlich Paketverlust pro Hop über längere Zeit – gut für sporadische Probleme.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'm13-l05',
      title: 'DNS-Diagnose mit nslookup und dem DNS-Cache',
      minutes: 25,
      relevance: 'ap1',
      skills: ['diag.dns'],
      steps: [
        {
          type: 'explain',
          title: 'nslookup – den DNS-Server direkt befragen',
          body: `\`nslookup\` stellt eine DNS-Anfrage und zeigt dir die **rohe Antwort** des DNS-Servers. Wichtig: nslookup fragt **direkt den DNS-Server** – es nutzt weder den lokalen DNS-Cache von Windows noch die hosts-Datei. Genau das macht es zum idealen Werkzeug, um den DNS-Server selbst zu testen.

**Grundaufrufe:**

| Befehl | Wirkung |
|---|---|
| \`nslookup www.example.com\` | A/AAAA-Abfrage beim eingestellten DNS-Server |
| \`nslookup www.example.com 8.8.8.8\` | dieselbe Abfrage, aber bei **8.8.8.8** (Server wählen) |
| \`nslookup -type=mx elektro-kraemer.de\` | nach **MX**-Records fragen (auch \`-type=ns\`, \`-type=txt\`, \`-type=soa\`, \`-type=aaaa\` …) |
| \`nslookup 192.168.10.5\` | **Reverse-Lookup** (PTR) |
| \`nslookup\` (ohne Argument) | **interaktiver Modus**: \`server 8.8.8.8\`, \`set type=mx\`, Name eingeben, \`exit\` |

**Typische Ausgabe:**

\`\`\`
C:\\>nslookup www.example.com
Server:  dc01.elektro-kraemer.local
Address:  192.168.10.5

Nicht autorisierende Antwort:
Name:    www.example.com
Addresses:  2606:2800:21f:cb07:6820:80da:af6b:8b2c
          93.184.215.14
\`\`\`

- Die ersten zwei Zeilen nennen den **befragten DNS-Server**. Steht dort \`Server:  UnKnown\`, hat der Server nur keinen PTR-Eintrag für seine eigene IP – meist harmlos.
- **„Nicht autorisierende Antwort“**: Die Antwort stammt **nicht vom zuständigen (autoritativen) Server**, sondern aus dem Cache bzw. über die Auflösung des Resolvers. Völlig normal für fremde Domains.

**Fehlerbilder:**

\`\`\`
*** www.elektro-kramer.de wurde von dc01.elektro-kraemer.local nicht gefunden: Non-existent domain
\`\`\`
→ Der DNS-Server **antwortet**, aber den Namen **gibt es nicht** (NXDOMAIN) – oft ein Tippfehler oder fehlender Record.

\`\`\`
DNS request timed out.
    timeout was 2 seconds.
Server:  UnKnown
Address:  192.168.10.9

*** Zeitüberschreitung bei Anforderung an UnKnown.
\`\`\`
→ Der eingetragene DNS-Server **antwortet gar nicht**: falsche Adresse, Server/Dienst aus oder Port 53 blockiert.`,
        },
        {
          type: 'explain',
          title: 'Der lokale DNS-Cache: /displaydns und /flushdns',
          body: `Windows merkt sich DNS-Antworten im **DNS-Client-Cache** für die Dauer der TTL. Ansehen kannst du ihn mit \`ipconfig /displaydns\`:

\`\`\`
    www.elektro-kraemer.de
    ----------------------------------------
    Eintragsname . . . . . : www.elektro-kraemer.de
    Eintragstyp. . . . . . : 1
    Gültigkeitsdauer . . . : 2741
    Datenlänge . . . . . . : 4
    Abschnitt. . . . . . . : Antwort
    A-Eintrag (Host) . . . : 203.0.113.10
\`\`\`

Eintragstyp 1 = A-Record, die „Gültigkeitsdauer“ ist die Rest-TTL in Sekunden.

**Wann /flushdns?** Wenn ein DNS-Eintrag geändert wurde (z. B. Server umgezogen) und der PC noch die **alte IP aus seinem Cache** verwendet. Auch **negative** Antworten („gibt es nicht“) werden eine Zeit lang gecacht – wurde ein Record gerade erst angelegt, hilft ebenfalls \`ipconfig /flushdns\`:

\`\`\`
C:\\>ipconfig /flushdns

Windows-IP-Konfiguration

Der DNS-Auflösungscache wurde geleert.
\`\`\`

PowerShell-Gegenstücke: \`Get-DnsClientCache\` und \`Clear-DnsClientCache\`. Beachte: Der **Cache des DNS-Servers** wird dadurch **nicht** geleert – der behält seine Einträge bis zum Ablauf der TTL (oder bis der Admin ihn leert).`,
        },
        {
          type: 'example',
          title: 'DNS-Problem einkreisen',
          problem: `Ein PC kann keine Webseiten per Namen öffnen. \`ping 8.8.8.8\` klappt. Du führst aus:

\`\`\`
C:\\>nslookup www.example.com
DNS request timed out.
    timeout was 2 seconds.
Server:  UnKnown
Address:  192.168.10.9

DNS request timed out.
    timeout was 2 seconds.
*** Zeitüberschreitung bei Anforderung an UnKnown.

C:\\>nslookup www.example.com 192.168.10.5
Server:  dc01.elektro-kraemer.local
Address:  192.168.10.5

Nicht autorisierende Antwort:
Name:    www.example.com
Addresses:  2606:2800:21f:cb07:6820:80da:af6b:8b2c
          93.184.215.14
\`\`\`

Was ist die Ursache, was die Lösung?`,
          steps: [
            { label: 'Erster Aufruf', body: 'Der PC nutzt als DNS-Server **192.168.10.9** – der antwortet nicht (Timeout).' },
            { label: 'Zweiter Aufruf', body: 'Gezielt beim richtigen Firmen-DNS **192.168.10.5** gefragt → sofortige, korrekte Antwort. Der DNS-Dienst an sich funktioniert also.' },
            { label: 'Ursache', body: 'Am PC ist ein **falscher DNS-Server** eingetragen (statisch von Hand, oder die DHCP-Option 6 ist falsch – dann wären mehrere PCs betroffen).' },
            { label: 'Lösung', body: 'Einstellung prüfen: Steht der DNS statisch im Adapter → auf „automatisch beziehen“ oder auf 192.168.10.5 korrigieren. Falls DHCP: Option 6 korrigieren, dann `ipconfig /renew`. Danach `ipconfig /flushdns` und Test mit `nslookup` ohne Serverangabe.' },
          ],
          result: 'Falscher DNS-Server 192.168.10.9 eingetragen; richtig ist 192.168.10.5. Konfiguration korrigieren, Cache leeren, erneut testen.',
        },
        {
          type: 'check',
          question: {
            id: 'm13-l05-c1',
            kind: 'single',
            skill: 'diag.dns',
            difficulty: 2,
            prompt: 'nslookup liefert für `www.example.com` den Hinweis **„Nicht autorisierende Antwort“**. Was bedeutet das?',
            options: [
              'Die Antwort stammt nicht vom für die Zone zuständigen Server, sondern z. B. aus dem Cache des Resolvers',
              'Der Benutzer hat keine Berechtigung für DNS-Abfragen',
              'Die Antwort ist gefälscht und darf nicht verwendet werden',
              'Der DNS-Server ist nicht erreichbar',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'DNS-Abfragen brauchen keine Benutzerberechtigung; „autorisierend“ meint „autoritativ“.', error: 'begriff-missverstanden' },
              '2': { why: 'Nicht autoritative Antworten sind völlig normal und korrekt.', error: 'begriff-missverstanden' },
              '3': { why: 'Dann gäbe es eine Zeitüberschreitung und gar keine Antwort.', error: 'begriff-missverstanden' },
            },
            explanation: 'Autoritativ ist nur der Server, der die Zone selbst verwaltet. Antworten des Firmen-Resolvers zu fremden Domains sind deshalb „nicht autorisierend“ – aber korrekt.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'm13-l05-c2',
            kind: 'text',
            skill: 'diag.dns',
            difficulty: 1,
            prompt: 'Der Webserver ist umgezogen, der DNS-Eintrag wurde schon geändert, aber dein PC nutzt noch die alte IP. Mit welchem Befehl leerst du den lokalen DNS-Cache?',
            accept: ['ipconfig /flushdns', 'ipconfig -flushdns', 'Clear-DnsClientCache'],
            placeholder: 'Befehl',
            explanation: '`ipconfig /flushdns` (PowerShell: `Clear-DnsClientCache`) löscht die zwischengespeicherten Einträge – die nächste Abfrage geht wieder an den DNS-Server.',
          },
        },
        {
          type: 'practice',
          title: 'Übung: DNS-Diagnose',
          questionIds: ['m13-q013', 'm13-q014', 'm13-q015', 'm13-q016', 'm13-q041', 'm13-q042'],
          count: 5,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'nslookup fragt direkt den DNS-Server (ohne lokalen Cache und hosts-Datei). Zweites Argument wählt den Server: nslookup name 8.8.8.8.',
            'Record-Typ wählen: nslookup -type=mx domain (auch ns, txt, soa, aaaa, ptr).',
            '„Nicht autorisierende Antwort“ = aus dem Cache des Resolvers, normal. „Non-existent domain“ = Name existiert nicht. „Timeout“ = DNS-Server antwortet nicht.',
            'ipconfig /displaydns zeigt, ipconfig /flushdns leert den lokalen DNS-Cache (PowerShell: Get-/Clear-DnsClientCache).',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'm13-l06',
      title: 'netstat, arp und route: Verbindungen, Nachbarn und Wege',
      minutes: 30,
      relevance: 'ap1-teilweise',
      skills: ['diag.netstat', 'diag.arproute'],
      steps: [
        {
          type: 'explain',
          title: 'netstat – Wer spricht mit wem, wer wartet auf wen?',
          body: `\`netstat\` zeigt **TCP- und UDP-Verbindungen** sowie **offene (lauschende) Ports** des eigenen Rechners – also die Transportschicht (Schicht 4).

| Option | Bedeutung |
|---|---|
| \`-a\` | **alle** Verbindungen **und** lauschenden Ports anzeigen |
| \`-n\` | Adressen und Ports **numerisch** anzeigen (keine Namensauflösung → schneller) |
| \`-o\` | die **Prozess-ID (PID)** des zugehörigen Programms anzeigen |
| \`-b\` | den **Programmnamen** (.exe) anzeigen – benötigt **Administratorrechte** |
| \`-r\` | die **Routingtabelle** anzeigen (wie \`route print\`) |
| \`-e\` / \`-s\` | Statistik für Ethernet bzw. pro Protokoll |

Die Klassiker-Kombination ist **\`netstat -ano\`**:

\`\`\`
C:\\>netstat -ano

Aktive Verbindungen

  Proto  Lokale Adresse         Remoteadresse          Status           PID
  TCP    0.0.0.0:135            0.0.0.0:0              ABHÖREN          1104
  TCP    0.0.0.0:445            0.0.0.0:0              ABHÖREN          4
  TCP    0.0.0.0:3389           0.0.0.0:0              ABHÖREN          1288
  TCP    192.168.10.57:52114    192.168.10.5:445       HERGESTELLT      4
  TCP    192.168.10.57:52230    198.51.100.80:443      HERGESTELLT      7720
  TCP    192.168.10.57:52201    198.51.100.80:443      WARTEND          0
  UDP    0.0.0.0:5353           *:*                                     2456
\`\`\`

**Zustände** (auf deutschem Windows übersetzt angezeigt):

| Englisch (Standardbegriff) | Deutsches Windows | Bedeutung |
|---|---|---|
| **LISTENING** | ABHÖREN | Ein Dienst **wartet** auf eingehende Verbindungen an diesem Port (Server-Rolle). |
| **ESTABLISHED** | HERGESTELLT | Eine Verbindung ist **aufgebaut**, Daten können fließen. |
| **TIME_WAIT** | WARTEND | Die Verbindung wurde **geschlossen**; das System wartet noch kurz, damit verspätete Pakete nicht in eine neue Verbindung geraten. |
| SYN_SENT | – | Verbindungsaufbau gesendet, aber noch keine Antwort – bleibt das so, ist das Ziel/der Port oft gesperrt. |
| CLOSE_WAIT | – | Die Gegenseite hat geschlossen, das lokale Programm aber noch nicht. |

**Lesen lernen:** \`0.0.0.0:3389 ABHÖREN\` heißt: Der PC lauscht auf **allen** Adressen auf Port 3389 (Remotedesktop). Mit der PID (1288) findest du im Task-Manager (Details) oder per \`tasklist /fi "PID eq 1288"\` das Programm. \`192.168.10.57:52114 → 192.168.10.5:445 HERGESTELLT\` ist eine aktive SMB-Verbindung zum Dateiserver.`,
        },
        {
          type: 'explain',
          title: 'arp und route – Nachbarn und Wegweiser',
          body: `**arp** zeigt und verwaltet den **ARP-Cache**: die Zuordnung IP-Adresse → MAC-Adresse für Geräte **im eigenen Netz**.

\`\`\`
C:\\>arp -a

Schnittstelle: 192.168.10.57 --- 0xc
  Internetadresse       Physische Adresse     Typ
  192.168.10.1          00-0c-29-4f-8a-11     dynamisch
  192.168.10.5          00-15-5d-0a-0b-05     dynamisch
  192.168.10.255        ff-ff-ff-ff-ff-ff     statisch
  224.0.0.22            01-00-5e-00-00-16     statisch
\`\`\`

- \`arp -a\` – Tabelle anzeigen. Nur **lokale** Ziele erscheinen (für Internetziele steht dort das Gateway).
- \`arp -d\` – Einträge löschen (\`arp -d *\` alle), benötigt **Adminrechte** – nützlich, nachdem ein Gerät getauscht wurde (neue MAC, gleiche IP).
- \`arp -s IP MAC\` – statischen Eintrag anlegen.
- **Verdächtig:** Haben **zwei verschiedene IPs dieselbe MAC** (z. B. das Gateway und ein beliebiger PC), kann **ARP-Spoofing** (Man-in-the-Middle) vorliegen.

**route** zeigt und ändert die **Routingtabelle** des PCs:

\`\`\`
C:\\>route print -4
...
IPv4-Routentabelle
===========================================================================
Aktive Routen:
     Netzwerkziel    Netzwerkmaske          Gateway    Schnittstelle Metrik
          0.0.0.0          0.0.0.0     192.168.10.1    192.168.10.57     25
        127.0.0.0        255.0.0.0   Auf Verbindung         127.0.0.1    331
     192.168.10.0    255.255.255.0   Auf Verbindung     192.168.10.57    281
    192.168.10.57  255.255.255.255   Auf Verbindung     192.168.10.57    281
   192.168.10.255  255.255.255.255   Auf Verbindung     192.168.10.57    281
===========================================================================
Ständige Routen:
  Keine
\`\`\`

- \`0.0.0.0 / 0.0.0.0\` ist die **Standardroute** (Default Route) → das Standardgateway. Fehlt sie, kommt der PC nicht aus seinem Netz heraus.
- **„Auf Verbindung“** heißt: direkt erreichbar, ohne Router (das eigene Subnetz).
- Bei mehreren passenden Routen gewinnt die **spezifischste** (längstes Präfix), bei Gleichstand die kleinere **Metrik**.

**Route hinzufügen** (Adminrechte): Ein Testnetz \`10.20.0.0/16\` ist über den Laborrouter \`192.168.10.254\` erreichbar:

\`\`\`
C:\\>route add 10.20.0.0 mask 255.255.0.0 192.168.10.254
 OK!
\`\`\`
Ohne \`-p\` ist die Route nach einem Neustart weg; mit \`route -p add …\` wird sie **dauerhaft** (erscheint dann unter „Ständige Routen“). Löschen: \`route delete 10.20.0.0\`.`,
        },
        {
          type: 'visual',
          title: 'Welche Schicht prüft welches Werkzeug?',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'arp / getmac', text: 'Schicht 2: MAC-Adressen und IP↔MAC-Zuordnung im lokalen Netz.', icon: 'Network' },
                { title: 'ping / tracert / route', text: 'Schicht 3: Erreichbarkeit, Weg und Routingtabelle.', icon: 'Route' },
                { title: 'netstat / Test-NetConnection -Port', text: 'Schicht 4: Ports, Verbindungen, Zustände.', icon: 'Cable' },
                { title: 'nslookup / Resolve-DnsName', text: 'Schicht 7: Namensauflösung über DNS.', icon: 'Globe' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Remotedesktop auf den Server klappt nicht',
          problem: `Ein Kollege kann sich nicht per Remotedesktop (TCP 3389) mit dem Server \`HH-APP01\` verbinden. Auf dem Server führst du aus:

\`\`\`
C:\\>netstat -ano | findstr :3389

C:\\>
\`\`\`

(keine Ausgabe). \`ping HH-APP01\` vom Kollegen-PC aus klappt. Was schließt du?`,
          steps: [
            { label: 'Ping klappt', body: 'Server ist auf Schicht 3 erreichbar, DNS funktioniert (Name wurde aufgelöst).' },
            { label: 'netstat zeigt nichts', body: 'Es gibt **keinen** Eintrag `0.0.0.0:3389 ABHÖREN` → **kein Dienst lauscht** auf Port 3389.' },
            { label: 'Ursache', body: 'Remotedesktop ist auf dem Server deaktiviert oder der Dienst „Remotedesktopdienste“ läuft nicht. Eine Firewall wäre es hier nicht – die würde netstat nicht beeinflussen.' },
            { label: 'Lösung und Kontrolle', body: 'Remotedesktop in den Systemeinstellungen aktivieren/Dienst starten. Danach erneut `netstat -ano | findstr :3389` → `TCP 0.0.0.0:3389 0.0.0.0:0 ABHÖREN 1288`. Vom Client aus `Test-NetConnection HH-APP01 -Port 3389`.' },
          ],
          result: 'Kein LISTENING-Eintrag auf 3389 → der RDP-Dienst läuft nicht. Dienst aktivieren, dann Port erneut prüfen.',
        },
        {
          type: 'check',
          question: {
            id: 'm13-l06-c1',
            kind: 'single',
            skill: 'diag.netstat',
            difficulty: 1,
            prompt: 'Was bedeutet in `netstat -an` der Eintrag `TCP 0.0.0.0:443 0.0.0.0:0 LISTENING` (dt. ABHÖREN)?',
            options: [
              'Ein Dienst wartet auf allen lokalen Adressen auf eingehende Verbindungen an Port 443',
              'Es besteht eine HTTPS-Verbindung zu 0.0.0.0',
              'Port 443 ist blockiert',
              'Die Verbindung wurde gerade geschlossen',
            ],
            answer: 0,
            distractors: {
              '1': { why: '0.0.0.0:0 als Remoteadresse heißt: noch keine Gegenstelle. Eine aufgebaute Verbindung hätte ESTABLISHED.', error: 'netstat-zustand' },
              '2': { why: 'LISTENING heißt das Gegenteil – der Port ist offen und wartet.', error: 'netstat-zustand' },
              '3': { why: 'Das wäre TIME_WAIT (WARTEND).', error: 'netstat-zustand' },
            },
            explanation: 'LISTENING = ein Serverdienst lauscht. 0.0.0.0 als lokale Adresse bedeutet „auf allen Schnittstellen“.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'm13-l06-c2',
            kind: 'single',
            skill: 'diag.arproute',
            difficulty: 2,
            prompt: 'In `route print` fehlt die Zeile mit Netzwerkziel `0.0.0.0` und Netzwerkmaske `0.0.0.0`. Welche Auswirkung hat das?',
            options: [
              'Der PC erreicht nur noch Ziele in direkt verbundenen Netzen – kein Standardgateway',
              'Der PC kann keine Namen mehr auflösen, aber alle IPs erreichen',
              'Der PC hat keine eigene IP-Adresse mehr',
              'Keine Auswirkung, die Zeile ist optional',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'Ohne Default Route sind auch externe IPs (und meist externe DNS-Server) nicht erreichbar.', error: 'route-falsch' },
              '2': { why: 'Die eigenen Adressen stehen als eigene Routen „Auf Verbindung“ – die IP bleibt.', error: 'route-falsch' },
              '3': { why: 'Ohne Standardroute kennt der PC keinen Weg in fremde Netze.', error: 'route-falsch' },
            },
            explanation: '0.0.0.0/0 ist die Standardroute zum Standardgateway. Fehlt sie (kein Gateway konfiguriert), bleiben nur die direkt verbundenen Netze erreichbar.',
          },
        },
        {
          type: 'practice',
          title: 'Übung: netstat, arp, route',
          questionIds: ['m13-q017', 'm13-q018', 'm13-q019', 'm13-q020', 'm13-q021', 'm13-q022', 'm13-q029'],
          count: 5,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'netstat -ano: alle Verbindungen und lauschenden Ports, numerisch, mit PID; -b zeigt Programmnamen (Admin), -r die Routingtabelle.',
            'LISTENING/ABHÖREN = wartet auf Verbindungen; ESTABLISHED/HERGESTELLT = verbunden; TIME_WAIT/WARTEND = gerade geschlossen.',
            'arp -a zeigt IP↔MAC im lokalen Netz, arp -d löscht (Admin). Gleiche MAC bei mehreren IPs → ARP-Spoofing-Verdacht.',
            'route print zeigt die Routingtabelle; 0.0.0.0/0 = Standardroute. route add … mask … gateway fügt Routen hinzu, -p macht sie dauerhaft.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'm13-l07',
      title: 'PowerShell-Diagnose und komplette Troubleshooting-Fälle',
      minutes: 35,
      relevance: 'ap1-teilweise',
      skills: ['diag.powershell', 'diag.scenario'],
      steps: [
        {
          type: 'explain',
          title: 'Die wichtigsten PowerShell-Cmdlets',
          body: `Moderne Windows-Systeme bringen PowerShell-Cmdlets mit, die die klassischen Befehle ersetzen oder ergänzen. Sie liefern **Objekte** statt Text – das lässt sich filtern und in Skripten weiterverarbeiten.

| Cmdlet | Klassisches Gegenstück | Zweck |
|---|---|---|
| \`Test-Connection\` | \`ping\` | ICMP-Echo; \`-Count 2\` statt \`-n 2\` |
| \`Test-NetConnection\` (Alias \`tnc\`) | ping + **Port-Test** + tracert | \`-Port 443\` testet eine **TCP-Verbindung**, \`-TraceRoute\` verfolgt den Weg, \`-CommonTCPPort RDP\` testet Standardports |
| \`Get-NetIPConfiguration\` (Alias \`gip\`) | \`ipconfig\` | IP, Gateway, DNS je Adapter |
| \`Get-NetIPAddress\` | \`ipconfig\` | alle IP-Adressen mit Präfixlänge und Herkunft (Dhcp/Manual/WellKnown) |
| \`Get-NetAdapter\` | (Netzwerkverbindungen, \`getmac\`) | Adapter mit **Status (Up/Disconnected)**, MAC-Adresse, Linkgeschwindigkeit |
| \`Resolve-DnsName\` | \`nslookup\` | DNS-Abfrage; \`-Type MX\`, \`-Server 8.8.8.8\` |
| \`Get-NetTCPConnection\` | \`netstat\` | TCP-Verbindungen; \`-State Listen\`, \`-LocalPort 3389\` |
| \`Clear-DnsClientCache\` | \`ipconfig /flushdns\` | lokalen DNS-Cache leeren |

**Der große Vorteil von Test-NetConnection:** \`ping\` kann nur ICMP. Ob ein **bestimmter Dienst** (Port) erreichbar ist, siehst du erst mit einem TCP-Test:

\`\`\`
PS C:\\> Test-NetConnection srv-web01 -Port 443

ComputerName     : srv-web01
RemoteAddress    : 172.16.1.10
RemotePort       : 443
InterfaceAlias   : Ethernet
SourceAddress    : 192.168.10.57
TcpTestSucceeded : True
\`\`\`

Schlägt der TCP-Test fehl, zeigt das Cmdlet zusätzlich eine Warnung, das Ping-Ergebnis (\`PingSucceeded\`) und \`TcpTestSucceeded : False\`. Kombiniert heißt das:

| PingSucceeded | TcpTestSucceeded | Deutung |
|---|---|---|
| True | True | alles erreichbar |
| True | **False** | Host erreichbar, aber **Dienst läuft nicht** oder **Port wird von einer Firewall blockiert** |
| False | True | Host blockiert nur ICMP – Dienst ist erreichbar |
| False | False | Host aus/nicht erreichbar oder alles gefiltert |`,
        },
        {
          type: 'explain',
          title: 'Weitere Beispielausgaben',
          body: `\`\`\`
PS C:\\> Get-NetIPConfiguration

InterfaceAlias       : Ethernet
InterfaceIndex       : 12
InterfaceDescription : Intel(R) Ethernet Connection (17) I219-LM
NetProfile.Name      : elektro-kraemer.local
IPv4Address          : 192.168.10.57
IPv6DefaultGateway   :
IPv4DefaultGateway   : 192.168.10.1
DNSServer            : 192.168.10.5
\`\`\`

\`\`\`
PS C:\\> Get-NetAdapter

Name     InterfaceDescription                      ifIndex Status       MacAddress         LinkSpeed
----     --------------------                      ------- ------       ----------         ---------
Ethernet Intel(R) Ethernet Connection (17) I219-LM      12 Up           3C-52-82-1A-7F-57     1 Gbps
WLAN     Intel(R) Wi-Fi 6E AX211 160MHz                  9 Disconnected 4C-77-CB-12-9A-0E       0 bps
\`\`\`

\`\`\`
PS C:\\> Resolve-DnsName elektro-kraemer.de -Type MX

Name                 Type TTL  Section NameExchange               Preference
----                 ---- ---  ------- ------------               ----------
elektro-kraemer.de   MX   3600 Answer  mail.elektro-kraemer.de    10
elektro-kraemer.de   MX   3600 Answer  mail2.provider.example     20
\`\`\`

\`\`\`
PS C:\\> Get-NetTCPConnection -State Listen -LocalPort 3389

LocalAddress LocalPort RemoteAddress RemotePort State  AppliedSetting OwningProcess
------------ --------- ------------- ---------- -----  -------------- -------------
0.0.0.0      3389      0.0.0.0       0          Listen                1288
\`\`\`

Beachte: PowerShell zeigt die Zustände englisch (\`Listen\`, \`Established\`, \`TimeWait\`), \`netstat\` auf deutschem Windows deutsch (ABHÖREN, HERGESTELLT, WARTEND). Eine 1-Gbit-Karte, die nur mit **100 Mbps** verbunden ist (LinkSpeed), deutet übrigens oft auf ein **defektes Kabel** (nur zwei Aderpaare in Ordnung) hin.`,
        },
        {
          type: 'example',
          title: 'Fall 1: Homeoffice-Mitarbeiter erreicht das Ticketsystem nicht',
          problem: `Ein Mitarbeiter im Homeoffice ist per VPN verbunden. Das Intranet geht, das Ticketsystem \`tickets.elektro-kraemer.local\` (Port 8443) nicht. Ausgaben:

\`\`\`
PS C:\\> Resolve-DnsName tickets.elektro-kraemer.local

Name                            Type TTL  Section IPAddress
----                            ---- ---  ------- ---------
tickets.elektro-kraemer.local   A    1200 Answer  192.168.10.40

PS C:\\> Test-NetConnection tickets.elektro-kraemer.local -Port 8443

ComputerName           : tickets.elektro-kraemer.local
RemoteAddress          : 192.168.10.40
RemotePort             : 8443
InterfaceAlias         : Elektro-Kraemer-VPN
SourceAddress          : 10.99.0.23
PingSucceeded          : True
PingReplyDetails (RTT) : 21 ms
TcpTestSucceeded       : False
\`\`\`

Kollegen im Büro können das Ticketsystem nutzen.`,
          steps: [
            { label: 'DNS', body: 'Name wird korrekt zu 192.168.10.40 aufgelöst → DNS ist ok.' },
            { label: 'Schicht 3', body: '`PingSucceeded : True` über den VPN-Adapter → Routing durch den Tunnel funktioniert.' },
            { label: 'Schicht 4', body: '`TcpTestSucceeded : False` → Port 8443 ist von hier aus **nicht** erreichbar.' },
            { label: 'Eingrenzen', body: 'Im Büro funktioniert der Dienst → er läuft. Unterschied: Quelle ist das **VPN-Netz 10.99.0.0/24**. Wahrscheinlich erlaubt die Firewall-Regel für VPN-Clients nur bestimmte Ports (z. B. 443), nicht aber 8443 – oder die Host-Firewall des Ticketservers lässt nur 192.168.10.0/24 zu.' },
            { label: 'Lösung', body: 'Firewall-Regel „VPN-Clients (10.99.0.0/24) → 192.168.10.40 TCP 8443 erlauben“ ergänzen und erneut mit `Test-NetConnection -Port 8443` prüfen.' },
          ],
          result: 'DNS und Routing ok, aber TCP 8443 blockiert für das VPN-Netz → Firewall-Regel ergänzen.',
        },
        {
          type: 'example',
          title: 'Fall 2: Kompletter Diagnose-Durchlauf',
          problem: `Neuer Arbeitsplatz im Vertrieb, „nichts geht“. Ausgaben:

\`\`\`
C:\\>ipconfig

Ethernet-Adapter Ethernet:

   Verbindungsspezifisches DNS-Suffix: elektro-kraemer.local
   IPv4-Adresse  . . . . . . . . . . : 192.168.10.142
   Subnetzmaske  . . . . . . . . . . : 255.255.255.0
   Standardgateway . . . . . . . . . : 192.168.10.1

C:\\>ping 192.168.10.1
Antwort von 192.168.10.1: Bytes=32 Zeit<1ms TTL=64
...
C:\\>ping 8.8.8.8
Antwort von 8.8.8.8: Bytes=32 Zeit=12ms TTL=115
...
C:\\>ping www.example.com
Ping-Anforderung konnte Host "www.example.com" nicht finden. Überprüfen Sie den Namen, und versuchen Sie es erneut.

C:\\>nslookup www.example.com
Server:  dc01.elektro-kraemer.local
Address:  192.168.10.5

Nicht autorisierende Antwort:
Name:    www.example.com
Addresses:  2606:2800:21f:cb07:6820:80da:af6b:8b2c
          93.184.215.14
\`\`\``,
          steps: [
            { label: 'Bis Schicht 3', body: 'Gültige Adresse, Gateway und Internet-IP erreichbar. TTL=115 von 8.8.8.8 ist unauffällig.' },
            { label: 'Widerspruch erkennen', body: '`ping` findet den Namen nicht, **`nslookup` aber schon**. nslookup fragt direkt den DNS-Server, ping nutzt den Windows-Resolver mit **Cache und hosts-Datei**.' },
            { label: 'Hypothese', body: 'Der Windows-Resolver hat ein Problem, das nslookup umgeht: z. B. ein **negativer Eintrag im DNS-Cache** (der Name war kurz vorher nicht auflösbar) oder ein fehlerhafter Eintrag in der **hosts-Datei**.' },
            { label: 'Test', body: '`ipconfig /displaydns | findstr example` → Eintrag mit „Name existiert nicht“. Dann `ipconfig /flushdns` und erneut `ping www.example.com` → klappt. Ggf. zusätzlich die hosts-Datei kontrollieren.' },
          ],
          result: 'DNS-Server ok (nslookup), aber lokaler Resolver-Cache enthielt eine negative Antwort → ipconfig /flushdns löst das Problem.',
        },
        {
          type: 'check',
          question: {
            id: 'm13-l07-c1',
            kind: 'single',
            skill: 'diag.powershell',
            difficulty: 2,
            prompt: '`Test-NetConnection srv-mail01 -Port 25` liefert `PingSucceeded : True` und `TcpTestSucceeded : False`. Was ist die wahrscheinlichste Deutung?',
            options: [
              'Der Server ist erreichbar, aber auf Port 25 lauscht kein Dienst oder eine Firewall blockiert den Port',
              'Der Server ist ausgeschaltet',
              'Die DNS-Auflösung ist fehlgeschlagen',
              'Das Netzwerkkabel des Clients ist defekt',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'Dann wäre auch der Ping fehlgeschlagen (es sei denn, ICMP ist gesperrt – hier kam aber eine Antwort).', error: 'ergebnis-fehlgedeutet' },
              '2': { why: 'Ohne Namensauflösung gäbe es keine RemoteAddress und keinen erfolgreichen Ping.', error: 'ergebnis-fehlgedeutet' },
              '3': { why: 'Mit defektem Kabel wäre gar nichts erreichbar.', error: 'ergebnis-fehlgedeutet' },
            },
            explanation: 'Schicht 3 funktioniert (Ping ok), Schicht 4 für Port 25 nicht. Ursache: Dienst gestoppt/hört nicht auf diesem Port oder Firewall filtert TCP 25.',
          },
        },
        {
          type: 'practice',
          title: 'Übung: PowerShell und Szenarien',
          questionIds: ['m13-q023', 'm13-q024', 'm13-q025', 'm13-q036', 'm13-q041', 'm13-q042', 'm13-q043', 'm13-q044', 'm13-q045'],
          count: 6,
          difficulty: 3,
        },
        {
          type: 'summary',
          points: [
            'Test-NetConnection (tnc): Ping, TCP-Port-Test (-Port), Routenverfolgung (-TraceRoute) in einem Werkzeug.',
            'Get-NetIPConfiguration/Get-NetIPAddress ≈ ipconfig, Get-NetAdapter = Adapterstatus und MAC, Resolve-DnsName ≈ nslookup, Get-NetTCPConnection ≈ netstat, Test-Connection ≈ ping.',
            'Ping ok + TCP-Test fehlgeschlagen → Dienst läuft nicht oder Port wird gefiltert.',
            'ping findet Namen nicht, nslookup aber schon → lokaler Resolver (Cache, hosts-Datei) prüfen, ipconfig /flushdns.',
            'Immer: Ausgabe genau lesen, Hypothese bilden, gezielt testen, nach der Lösung erneut prüfen.',
          ],
        },
      ],
    },
  ],

  /* ================================================================== */
  /* Fragenpool                                                          */
  /* ================================================================== */
  questions: [
    /* ---------- Methode ---------- */
    {
      id: 'm13-q001',
      kind: 'single',
      skill: 'diag.method',
      difficulty: 1,
      prompt: 'Welcher Test prüft als Erstes, ob das **lokale Netz** (Kabel, Switch, VLAN) funktioniert?',
      options: ['Ping auf das Standardgateway', 'Ping auf 127.0.0.1', 'nslookup auf einen Webserver', 'Ping auf 8.8.8.8'],
      answer: 0,
      distractors: {
        '1': { why: 'Die Loopback-Adresse verlässt den PC nicht.', error: 'loopback-falsch' },
        '2': { why: 'nslookup testet DNS, also eine viel höhere Ebene.', error: 'schicht-falsch' },
        '3': { why: '8.8.8.8 liegt hinter dem Gateway – ein Fehlschlag sagt nicht, ob das LAN oder das Internet das Problem ist.', error: 'eingrenzung-fehlt' },
      },
      explanation: 'Das Gateway ist das erste Gerät außerhalb des eigenen PCs, das zuverlässig antworten sollte. Antwortet es, sind Kabel, Switch, VLAN und ARP in Ordnung.',
    },
    {
      id: 'm13-q002',
      kind: 'order',
      skill: 'diag.method',
      difficulty: 1,
      prompt: 'Bringe die Tests der systematischen Fehlersuche (Bottom-up, „von innen nach außen“) in die richtige Reihenfolge.',
      items: [
        'ipconfig /all – Konfiguration prüfen',
        'ping 127.0.0.1 (Loopback)',
        'ping auf die eigene IP-Adresse',
        'ping auf das Standardgateway',
        'ping auf eine externe IP-Adresse (z. B. 8.8.8.8)',
        'ping bzw. nslookup auf einen DNS-Namen',
      ],
      explanation: 'Jeder Schritt testet ein Stück weiter entfernt: Stack → eigene Adresse → LAN/Gateway → Routing/Internet → Namensauflösung. Der erste Fehlschlag zeigt die Problemzone.',
    },
    {
      id: 'm13-q031',
      kind: 'free',
      skill: 'diag.method',
      difficulty: 2,
      prompt: 'Ein Anwender meldet: „Ich komme nicht ins Internet.“ Beschreiben Sie Ihr **systematisches Vorgehen** zur Fehlereingrenzung mit den passenden Windows-Befehlen.',
      modelAnswer:
        'Zunächst das Problem erfassen: Wer ist betroffen (nur dieser PC oder mehrere), seit wann, was wurde geändert? Dann bottom-up vorgehen: Link prüfen (LED, „Medium getrennt“?). Mit ipconfig /all die Konfiguration prüfen (gültige IP, keine 169.254-Adresse, passende Maske, Gateway im eigenen Netz, DNS-Server eingetragen). Danach ping 127.0.0.1 (TCP/IP-Stack), ping auf die eigene IP, ping auf das Standardgateway (lokales Netz), ping auf eine externe IP wie 8.8.8.8 (Routing/Internetzugang), dann ping bzw. nslookup auf einen Namen (DNS). Der erste fehlschlagende Test grenzt die Problemzone ein; dort weiter untersuchen (z. B. tracert bei Problemen hinter dem Gateway, nslookup mit alternativem Server bei DNS). Nach der Behebung erneut testen und die Lösung dokumentieren.',
      keywords: ['eingrenzen', 'ipconfig /all', '127.0.0.1', 'Gateway', 'externe IP', 'DNS', 'nslookup', 'tracert', 'dokumentieren'],
      explanation: 'Bewertet werden Struktur (Erfassung → Tests von innen nach außen → Behebung → Kontrolle/Doku) und passende Befehle mit Begründung.',
    },
    {
      id: 'm13-q040',
      kind: 'match',
      skill: 'diag.method',
      difficulty: 2,
      prompt: 'Ordne die Strategien der Fehlersuche ihrer Beschreibung zu.',
      left: ['Bottom-up', 'Top-down', 'Divide & Conquer', 'Vergleich (Spot the difference)'],
      right: [
        'Mit einem Test in der Mitte (z. B. ping, Schicht 3) beginnen und je nach Ergebnis nach oben oder unten gehen',
        'Konfiguration eines funktionierenden Geräts mit dem gestörten vergleichen',
        'Von der physischen Schicht aufwärts bis zur Anwendung prüfen',
        'Bei der Anwendung beginnen und schichtweise nach unten prüfen',
      ],
      answer: [2, 3, 0, 1],
      explanation: 'Bottom-up: Schicht 1 aufwärts. Top-down: Anwendung abwärts. Divide & Conquer: in der Mitte starten. Vergleich: Unterschiede zu einem funktionierenden System suchen.',
    },
    /* ---------- ipconfig ---------- */
    {
      id: 'm13-q003',
      kind: 'text',
      skill: 'diag.ipconfig',
      difficulty: 1,
      prompt: 'Mit welchem Befehl gibst du unter Windows eine per DHCP bezogene IPv4-Adresse **zurück**?',
      accept: ['ipconfig /release', 'ipconfig -release'],
      placeholder: 'ipconfig …',
      explanation: '`ipconfig /release` sendet ein DHCPRELEASE an den Server. Mit `ipconfig /renew` wird danach eine neue Adresse angefordert.',
    },
    {
      id: 'm13-q012',
      kind: 'match',
      skill: 'diag.ipconfig',
      difficulty: 1,
      prompt: 'Ordne die ipconfig-Schalter ihrer Wirkung zu.',
      left: ['/all', '/release', '/renew', '/flushdns', '/displaydns'],
      right: [
        'DNS-Cache anzeigen',
        'Vollständige Konfiguration inkl. MAC, DHCP- und DNS-Server',
        'DHCP-Adresse neu anfordern bzw. verlängern',
        'DHCP-Adresse zurückgeben',
        'DNS-Cache leeren',
      ],
      answer: [1, 3, 2, 4, 0],
      explanation: '/all = alles anzeigen, /release = zurückgeben, /renew = neu anfordern, /flushdns = Cache leeren, /displaydns = Cache anzeigen.',
    },
    {
      id: 'm13-q026',
      kind: 'single',
      skill: 'diag.scenario',
      difficulty: 1,
      prompt: `Ausgabe von \`ipconfig\`:

\`\`\`
Ethernet-Adapter Ethernet:

   Verbindungsspezifisches DNS-Suffix:
   Verbindungslokale IPv6-Adresse  . : fe80::8d4c:2b1e:5a7f:9c31%7
   Autokonfiguration IPv4-Adresse  . : 169.254.88.17
   Subnetzmaske  . . . . . . . . . . : 255.255.0.0
   Standardgateway . . . . . . . . . :
\`\`\`

Was ist die Ursache für die fehlende Netzwerkverbindung?`,
      options: [
        'Der PC hat keine Antwort von einem DHCP-Server erhalten',
        'Der DNS-Server ist falsch eingetragen',
        'Die Netzwerkkarte ist nicht angeschlossen',
        'Der PC hat eine statische IP-Adresse aus dem falschen Netz',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Es gibt gar keinen DNS-Server und kein Gateway – das Problem liegt vor DNS.', error: 'schicht-falsch' },
        '2': { why: 'Ohne Link stünde dort „Medium getrennt“ und keine Adresse.', error: 'apipa-medium-verwechselt' },
        '3': { why: '„Autokonfiguration“ zeigt eine von Windows selbst vergebene APIPA-Adresse, keine statische.', error: 'apipa-verwechselt' },
      },
      explanation: '169.254.x.x mit Maske /16 und ohne Gateway ist eine APIPA-Adresse: DHCPDISCOVER blieb unbeantwortet (DHCP-Server, VLAN, Relay, Bereich voll …).',
    },
    {
      id: 'm13-q027',
      kind: 'single',
      skill: 'diag.scenario',
      difficulty: 2,
      prompt: `\`ipconfig /all\` zeigt beim PC:

\`\`\`
   IPv4-Adresse  . . . . . . . . . . : 192.168.10.88(Duplikat)
   Subnetzmaske  . . . . . . . . . . : 255.255.255.0
\`\`\`

Was bedeutet „(Duplikat)“?`,
      options: [
        'Ein anderes Gerät im Netz verwendet dieselbe IP-Adresse',
        'Der PC hat zwei Netzwerkkarten',
        'Die Adresse wurde doppelt so lange geleast',
        'Der DNS-Server kennt den PC zweimal',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Mehrere Netzwerkkarten erscheinen als getrennte Adapter, nicht als Duplikat.', error: 'ausgabe-fehlgedeutet' },
        '2': { why: 'Die Lease-Dauer hat mit dieser Kennzeichnung nichts zu tun.', error: 'ausgabe-fehlgedeutet' },
        '3': { why: 'Die Markierung stammt aus der lokalen ARP-Konfliktprüfung, nicht vom DNS.', error: 'ausgabe-fehlgedeutet' },
      },
      explanation: 'Windows prüft per ARP, ob die Adresse schon verwendet wird. „(Duplikat)“ = IP-Adresskonflikt, die Adresse ist nicht nutzbar. Typische Ursache: statische Adresse im DHCP-Bereich.',
    },
    {
      id: 'm13-q028',
      kind: 'single',
      skill: 'diag.scenario',
      difficulty: 2,
      prompt: `Ein PC erreicht andere PCs im Büro, aber nichts im Internet (auch keine IP-Adressen). \`ipconfig\`:

\`\`\`
   IPv4-Adresse  . . . . . . . . . . : 192.168.10.142
   Subnetzmaske  . . . . . . . . . . : 255.255.255.0
   Standardgateway . . . . . . . . . : 192.168.10.254
\`\`\`

\`ping 192.168.10.254\` → „Antwort von 192.168.10.142: Zielhost nicht erreichbar.“ Das Firmengateway ist laut Dokumentation \`192.168.10.1\`. Was ist zu tun?`,
      options: [
        'Das Standardgateway auf 192.168.10.1 korrigieren (statische Einstellung bzw. DHCP-Option 3 prüfen)',
        'Den DNS-Cache mit ipconfig /flushdns leeren',
        'Die Subnetzmaske auf 255.255.0.0 ändern',
        'Die MAC-Adresse der Netzwerkkarte ändern',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Selbst IP-Adressen im Internet sind nicht erreichbar – DNS ist nicht die Ursache.', error: 'dns-gateway-verwechselt' },
        '2': { why: 'Die Maske passt; eine größere Maske würde das Gateway-Problem nicht lösen.', error: 'maske-falsch-eingeschaetzt' },
        '3': { why: 'Die MAC-Adresse hat mit dem falschen Gateway nichts zu tun.', error: 'mac-ip-verwechselt' },
      },
      explanation: 'Unter 192.168.10.254 existiert kein Gerät (ARP scheitert, Meldung vom eigenen PC). Pakete ins Internet gehen an dieses nicht existierende Gateway. Lösung: korrektes Gateway 192.168.10.1 eintragen bzw. DHCP-Option 3 korrigieren und ipconfig /renew.',
      hints: ['Wer antwortet mit „Zielhost nicht erreichbar“?'],
    },
    {
      id: 'm13-q038',
      kind: 'text',
      skill: 'diag.ipconfig',
      difficulty: 1,
      prompt: 'Ein Anrufer kennt seinen Computernamen nicht. Welcher kurze Befehl gibt **nur** den Computernamen aus?',
      accept: ['hostname', 'hostname.exe'],
      placeholder: 'Befehl',
      explanation: '`hostname` gibt ausschließlich den Namen des Rechners aus (z. B. HH-PC-057). Er steht auch in `ipconfig /all`.',
    },
    {
      id: 'm13-q039',
      kind: 'text',
      skill: 'diag.ipconfig',
      difficulty: 1,
      prompt: 'Welcher Windows-Befehl listet **ausschließlich die MAC-Adressen** (Physische Adressen) aller Netzwerkadapter auf?',
      accept: ['getmac', 'getmac.exe', 'getmac /v'],
      placeholder: 'Befehl',
      explanation: '`getmac` listet die MAC-Adressen aller Adapter mit Transportnamen. `ipconfig /all` zeigt sie ebenfalls, aber mit vielen weiteren Infos.',
    },
    /* ---------- ping ---------- */
    {
      id: 'm13-q004',
      kind: 'match',
      skill: 'diag.ping',
      difficulty: 1,
      prompt: 'Ordne die ping-Optionen (Windows) ihrer Bedeutung zu.',
      left: ['-t', '-n 10', '-l 1000', '-6', '-a'],
      right: [
        'IPv6 erzwingen',
        'Dauerhaft pingen bis Strg+C',
        'IP-Adresse in Hostnamen auflösen',
        'Nutzdatengröße 1000 Byte',
        'Genau 10 Echo-Anfragen senden',
      ],
      answer: [1, 4, 3, 0, 2],
      explanation: '-t endlos, -n Anzahl, -l Größe der Nutzdaten in Byte, -4/-6 Protokollversion, -a Reverse-Auflösung zum Namen.',
    },
    {
      id: 'm13-q005',
      kind: 'single',
      skill: 'diag.ping',
      difficulty: 2,
      prompt: `Dein PC hat die IP \`192.168.10.57/24\`. Ausgabe:

\`\`\`
C:\\>ping 192.168.10.120

Ping wird ausgeführt für 192.168.10.120 mit 32 Bytes Daten:
Antwort von 192.168.10.57: Zielhost nicht erreichbar.
Antwort von 192.168.10.57: Zielhost nicht erreichbar.
Antwort von 192.168.10.57: Zielhost nicht erreichbar.
Antwort von 192.168.10.57: Zielhost nicht erreichbar.
\`\`\`

Was bedeutet das?`,
      options: [
        'Der eigene PC erhält auf seine ARP-Anfrage für 192.168.10.120 keine Antwort – im lokalen Netz ist dort kein erreichbares Gerät',
        'Der Router 192.168.10.57 kennt keinen Weg ins Netz 192.168.10.0',
        'Das Ziel ist erreichbar, blockiert aber ICMP',
        'Die DNS-Auflösung ist fehlgeschlagen',
      ],
      answer: 0,
      distractors: {
        '1': { why: '192.168.10.57 ist der eigene PC, kein Router.', error: 'ausgabe-fehlgedeutet' },
        '2': { why: 'Ein Gerät, das ICMP blockiert, beantwortet trotzdem ARP – es käme zu einer Zeitüberschreitung, nicht zu dieser Meldung.', error: 'ausgabe-fehlgedeutet' },
        '3': { why: 'Es wurde eine IP-Adresse gepingt, DNS ist nicht beteiligt.', error: 'dns-falsch-zugeordnet' },
      },
      explanation: 'Die Meldung stammt vom eigenen PC: Das Ziel liegt im eigenen Subnetz, also wird per ARP nach der MAC gefragt. Ohne ARP-Antwort meldet Windows „Zielhost nicht erreichbar“. Gerät aus, falsches VLAN oder Kabel ab.',
    },
    {
      id: 'm13-q006',
      kind: 'single',
      skill: 'diag.ping',
      difficulty: 1,
      prompt: `Ausgabe:

\`\`\`
C:\\>ping intranet.elektro-kraemer.lokal
Ping-Anforderung konnte Host "intranet.elektro-kraemer.lokal" nicht finden. Überprüfen Sie den Namen, und versuchen Sie es erneut.
\`\`\`

Was ist passiert?`,
      options: [
        'Der Name konnte nicht in eine IP-Adresse aufgelöst werden, es wurde kein Ping gesendet',
        'Der Server hat auf alle vier Pings nicht geantwortet',
        'Das Gateway ist nicht erreichbar',
        'Die TTL ist abgelaufen',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Dann käme „Zeitüberschreitung der Anforderung“ – hier wurde gar nichts gesendet.', error: 'ausgabe-fehlgedeutet' },
        '2': { why: 'Die Meldung betrifft die Namensauflösung, nicht das Gateway.', error: 'ausgabe-fehlgedeutet' },
        '3': { why: 'Dafür gäbe es die Meldung „TTL beim Transport überschritten“.', error: 'ausgabe-fehlgedeutet' },
      },
      explanation: 'DNS-Auflösung gescheitert. Hier fällt zusätzlich ein Tippfehler auf: Die Domäne heißt „.local“, nicht „.lokal“. Immer zuerst den Namen kontrollieren, dann den DNS-Server.',
      hints: ['Lies den Hostnamen genau.'],
    },
    {
      id: 'm13-q007',
      kind: 'number',
      skill: 'diag.ping',
      difficulty: 2,
      prompt: 'Ein Linux-Webserver antwortet auf ping mit `TTL=57`. Wie viele Router (Hops) liegen vermutlich dazwischen?',
      answer: 7,
      explanation: 'Linux startet mit TTL 64. 64 − 57 = 7 Hops.',
      hints: ['Start-TTL bei Linux: 64.'],
    },
    {
      id: 'm13-q008',
      kind: 'single',
      skill: 'diag.ping',
      difficulty: 2,
      prompt: 'Ping auf einen Server liefert `TTL=128` bei einer Zeit `<1ms`. Was kannst du daraus schließen?',
      options: [
        'Vermutlich ein Windows-System im selben Netz (keine Router dazwischen)',
        'Ein Linux-System, 64 Hops entfernt',
        'Ein Cisco-Router im Internet',
        'Die Verbindung ist überlastet',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Linux startet bei 64 – eine empfangene TTL von 128 kann nicht von einem Linux-Standardsystem stammen.', error: 'ttl-fehlgedeutet' },
        '2': { why: 'Netzwerkgeräte starten oft bei 255; dann wären es 127 Hops – unrealistisch.', error: 'ttl-fehlgedeutet' },
        '3': { why: 'Unter 1 ms ist eine sehr gute Antwortzeit.', error: 'ttl-fehlgedeutet' },
      },
      explanation: 'TTL 128 = Windows-Startwert, nichts abgezogen → 0 Hops, also im selben Subnetz. Die Zeit <1 ms passt dazu.',
    },
    {
      id: 'm13-q033',
      kind: 'single',
      skill: 'diag.ping',
      difficulty: 1,
      prompt: 'Was bewirkt der Befehl `ping -n 10 -l 1000 192.168.10.5`?',
      options: [
        'Sendet 10 Echo-Anfragen mit je 1000 Byte Nutzdaten',
        'Sendet 1000 Echo-Anfragen mit je 10 Byte',
        'Pingt 10 Sekunden lang mit Zeitlimit 1000 ms',
        'Pingt dauerhaft mit TTL 10',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Vertauscht: -n ist die Anzahl, -l die Größe.', error: 'option-verwechselt' },
        '2': { why: 'Das Zeitlimit wäre -w, eine Dauer in Sekunden gibt es nicht.', error: 'option-verwechselt' },
        '3': { why: 'Dauerhaft wäre -t, die TTL setzt man mit -i.', error: 'option-verwechselt' },
      },
      explanation: '-n = number (Anzahl), -l = length (Größe der Nutzdaten). Größere Pakete helfen z. B., Probleme mit fehlerhaften Leitungen oder MTU sichtbar zu machen.',
    },
    {
      id: 'm13-q034',
      kind: 'number',
      skill: 'diag.ping',
      difficulty: 1,
      prompt: `Ping-Statistik:

\`\`\`
Ping-Statistik für 192.168.20.1:
    Pakete: Gesendet = 20, Empfangen = 17, Verloren = 3
\`\`\`

Wie viel Prozent Verlust werden angezeigt?`,
      answer: 15,
      unit: '%',
      explanation: '3 von 20 Paketen verloren: 3 / 20 = 0,15 = 15 %. Sporadischer Verlust deutet z. B. auf eine überlastete Leitung, schlechtes WLAN oder ein defektes Kabel hin – weiter mit pathping.',
    },
    {
      id: 'm13-q035',
      kind: 'single',
      skill: 'diag.ping',
      difficulty: 1,
      prompt: 'Welche Option erzwingt bei `ping` die Verwendung von **IPv6**?',
      options: ['-6', '-t', '-a', '-v6'],
      answer: 0,
      distractors: {
        '1': { why: '-t pingt dauerhaft.', error: 'option-verwechselt' },
        '2': { why: '-a löst die Adresse in einen Namen auf.', error: 'option-verwechselt' },
        '3': { why: 'Diese Option gibt es nicht.', error: 'option-erfunden' },
      },
      explanation: '`ping -6 ziel` erzwingt IPv6, `ping -4 ziel` IPv4 – nützlich, wenn ein Name A- und AAAA-Einträge hat.',
    },
    {
      id: 'm13-q037',
      kind: 'free',
      skill: 'diag.ping',
      difficulty: 3,
      prompt: 'Die Ping-Statistik eines Tests zeigt „Gesendet = 4, Empfangen = 4, Verloren = 0 (0% Verlust)“, trotzdem ist das Ziel `192.168.10.120` nicht erreichbar. Erläutern Sie, wie das sein kann und woran man es in der Ausgabe erkennt.',
      modelAnswer:
        'Windows zählt auch ICMP-Fehlermeldungen wie „Zielhost nicht erreichbar“ als empfangene Antworten. Liegt das Ziel im eigenen Subnetz und antwortet niemand auf die ARP-Anfrage, erzeugt der eigene PC diese Meldung („Antwort von <eigene IP>: Zielhost nicht erreichbar.“). In der Statistik erscheinen dann 4 empfangene Pakete und 0 % Verlust, obwohl keine echte Echo-Antwort vom Ziel kam. Man erkennt es daran, dass die Antwortzeilen nicht von der Zieladresse stammen und keine Werte für Bytes, Zeit und TTL enthalten. Deshalb immer die einzelnen Antwortzeilen lesen, nicht nur die Statistik.',
      keywords: ['Zielhost nicht erreichbar', 'zählt als empfangen', 'eigene IP', 'ARP', 'keine Bytes/Zeit/TTL', 'Antwortzeilen lesen'],
      explanation: 'Eine klassische Falle: Die Statistik ist nur dann aussagekräftig, wenn die Antworten wirklich vom Ziel kommen.',
    },
    {
      id: 'm13-q046',
      kind: 'table',
      skill: 'diag.ping',
      difficulty: 2,
      prompt: 'Ergänze für jede Ping-Antwort den vermutlichen **Start-TTL** (64, 128 oder 255) und die Anzahl der **Hops** (Router) bis zum Ziel. Nimm als Start-TTL jeweils den nächsthöheren typischen Startwert.',
      columns: [
        { key: 'reply', label: 'Ping-Antwort', type: 'text' },
        { key: 'start', label: 'Start-TTL', type: 'number' },
        { key: 'hops', label: 'Hops', type: 'number' },
      ],
      rows: [
        { cells: { reply: { given: 'Antwort von 192.168.10.20: Bytes=32 Zeit<1ms TTL=128' }, start: { answer: '128' }, hops: { answer: '0' } } },
        { cells: { reply: { given: 'Antwort von 192.0.2.80: Bytes=32 Zeit=14ms TTL=52' }, start: { answer: '64' }, hops: { answer: '12' } } },
        { cells: { reply: { given: 'Antwort von 198.51.100.30: Bytes=32 Zeit=21ms TTL=113' }, start: { answer: '128' }, hops: { answer: '15' } } },
        { cells: { reply: { given: 'Antwort von 198.51.100.1: Bytes=32 Zeit=7ms TTL=254' }, start: { answer: '255' }, hops: { answer: '1' } } },
      ],
      explanation: 'Typische Startwerte: Linux 64, Windows 128, viele Netzwerkgeräte 255. Hops = Startwert − empfangene TTL: 128−128 = 0, 64−52 = 12, 128−113 = 15, 255−254 = 1 (z. B. ein Provider-Router direkt hinter dem eigenen Gateway).',
      hints: ['Wähle den kleinsten typischen Startwert, der größer oder gleich der empfangenen TTL ist.'],
    },
    {
      id: 'm13-q043',
      kind: 'single',
      skill: 'diag.scenario',
      difficulty: 3,
      prompt: `Ping auf den Windows-PC eines Kollegen im selben Netz:

\`\`\`
C:\\>ping 192.168.10.77
Zeitüberschreitung der Anforderung.
Zeitüberschreitung der Anforderung.
...
C:\\>arp -a | findstr 192.168.10.77
  192.168.10.77         d4-5d-64-21-0a-77     dynamisch
\`\`\`

Der Kollege kann normal arbeiten. Was ist die wahrscheinlichste Erklärung?`,
      options: [
        'Der PC ist erreichbar, aber seine Windows-Firewall blockiert eingehende ICMP-Echo-Anfragen',
        'Der PC ist ausgeschaltet',
        'Der PC liegt in einem anderen VLAN',
        'Der eigene DNS-Server ist falsch',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Ein ausgeschalteter PC würde ARP nicht beantworten – der dynamische ARP-Eintrag beweist, dass er aktiv ist.', error: 'arp-ignoriert' },
        '2': { why: 'In einem anderen VLAN gäbe es keine ARP-Antwort von ihm.', error: 'arp-ignoriert' },
        '3': { why: 'Es wurde eine IP gepingt, DNS ist nicht beteiligt.', error: 'dns-falsch-zugeordnet' },
      },
      explanation: 'Der PC hat auf ARP geantwortet (dynamischer Eintrag mit MAC), ist also im Netz aktiv. Dass ICMP trotzdem nicht beantwortet wird, liegt typischerweise an der Windows Defender Firewall, die Echo-Anfragen je nach Profil blockiert.',
      hints: ['Was beweist ein dynamischer ARP-Eintrag?'],
    },
    /* ---------- tracert / pathping ---------- */
    {
      id: 'm13-q009',
      kind: 'free',
      skill: 'diag.tracert',
      difficulty: 2,
      prompt: 'Erläutern Sie die **Funktionsweise von tracert**.',
      modelAnswer:
        'tracert ermittelt die Router auf dem Weg zu einem Ziel, indem es Pakete (unter Windows ICMP Echo Requests) mit schrittweise steigender TTL sendet. Das erste Paket hat TTL 1: Der erste Router verringert die TTL auf 0, verwirft das Paket und sendet eine ICMP-Meldung „Time Exceeded“ zurück – dadurch kennt tracert seine Adresse und die Antwortzeit. Danach TTL 2 für den zweiten Router usw. Pro Hop werden drei Pakete gesendet (drei Zeitangaben). Das Verfahren endet, wenn das Ziel mit einem Echo Reply antwortet oder die maximale Hop-Zahl (Standard 30) erreicht ist. Sternchen bedeuten, dass innerhalb des Zeitlimits keine Antwort kam.',
      keywords: ['TTL', 'schrittweise erhöhen', 'Time Exceeded', 'ICMP', 'Router', 'Echo Reply', '30 Hops', 'Sternchen'],
      explanation: 'Kern: steigende TTL, Time-Exceeded-Antworten der Router, Echo Reply vom Ziel.',
    },
    {
      id: 'm13-q010',
      kind: 'single',
      skill: 'diag.tracert',
      difficulty: 2,
      prompt: `tracert-Ausgabe (gekürzt):

\`\`\`
  1    <1 ms    <1 ms    <1 ms  192.168.10.1
  2     7 ms     6 ms     7 ms  198.51.100.1
  3     *        *        *     Zeitüberschreitung der Anforderung.
  4    11 ms    12 ms    11 ms  198.51.100.254
  5    14 ms    13 ms    14 ms  192.0.2.80

Ablaufverfolgung beendet.
\`\`\`

Wie bewertest du Hop 3?`,
      options: [
        'Unkritisch: Der Router leitet weiter, sendet aber keine ICMP-Time-Exceeded-Meldungen',
        'Kritisch: Bei Hop 3 bricht die Verbindung ab',
        'Hop 3 ist das Ziel, das ICMP blockiert',
        'Hop 3 ist ein DNS-Server, der nicht antwortet',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Hop 4 und 5 antworten – die Pakete kommen also durch Hop 3 hindurch.', error: 'sternchen-fehlgedeutet' },
        '2': { why: 'Das Ziel (192.0.2.80) antwortet bei Hop 5.', error: 'sternchen-fehlgedeutet' },
        '3': { why: 'tracert zeigt Router, keine DNS-Server.', error: 'begriff-verwechselt' },
      },
      explanation: 'Viele Router (vor allem bei Providern) erzeugen keine ICMP-Meldungen oder filtern sie. Solange die folgenden Hops antworten, ist das kein Fehler.',
    },
    {
      id: 'm13-q011',
      kind: 'single',
      skill: 'diag.tracert',
      difficulty: 2,
      prompt: 'Bei `tracert 8.8.8.8` erscheinen **schon ab Hop 1** nur Sternchen. Ein Ping auf das eigene Gateway scheitert ebenfalls. Wo liegt das Problem am wahrscheinlichsten?',
      options: [
        'Im lokalen Netz bzw. beim Standardgateway (Kabel, VLAN, Gateway-Eintrag, Router)',
        'Beim Provider im Internet',
        'Beim Server 8.8.8.8',
        'Beim DNS-Server',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Bis zum Provider kommen die Pakete gar nicht – schon das eigene Gateway antwortet nicht.', error: 'eingrenzung-fehlt' },
        '2': { why: 'Es antwortet ja nicht einmal der erste Hop.', error: 'eingrenzung-fehlt' },
        '3': { why: 'Bei Angabe einer IP-Adresse spielt DNS keine Rolle.', error: 'dns-falsch-zugeordnet' },
      },
      explanation: 'Hop 1 ist immer das Standardgateway. Antwortet es nicht (und auch nicht auf ping), liegt das Problem lokal: Link, VLAN, falscher Gateway-Eintrag oder ausgefallener Router.',
    },
    {
      id: 'm13-q030',
      kind: 'single',
      skill: 'diag.tracert',
      difficulty: 2,
      prompt: 'Wann ist **pathping** gegenüber tracert die bessere Wahl?',
      options: [
        'Bei sporadischen Aussetzern, weil pathping über längere Zeit den Paketverlust pro Hop misst',
        'Wenn man schnell in wenigen Sekunden ein Ergebnis braucht',
        'Wenn man einen TCP-Port testen möchte',
        'Wenn man den DNS-Cache leeren will',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'pathping dauert länger als tracert (ca. 25 s pro Hop bei Standardeinstellung).', error: 'werkzeug-verwechselt' },
        '2': { why: 'Port-Tests macht z. B. Test-NetConnection -Port.', error: 'werkzeug-verwechselt' },
        '3': { why: 'Dafür gibt es ipconfig /flushdns.', error: 'werkzeug-verwechselt' },
      },
      explanation: 'pathping verbindet tracert (Weg) mit vielen Pings an jeden Hop und zeigt so, an welcher Stelle Pakete verloren gehen.',
    },
    {
      id: 'm13-q032',
      kind: 'order',
      skill: 'diag.tracert',
      difficulty: 2,
      prompt: 'Bringe die Abläufe bei `tracert` zu einem Ziel, das drei Hops entfernt ist, in die richtige Reihenfolge.',
      items: [
        'PC sendet Paket mit TTL 1',
        'Router 1 verwirft es und sendet ICMP Time Exceeded',
        'PC sendet Paket mit TTL 2',
        'Router 2 verwirft es und sendet ICMP Time Exceeded',
        'PC sendet Paket mit TTL 3',
        'Ziel antwortet mit ICMP Echo Reply – „Ablaufverfolgung beendet“',
      ],
      explanation: 'Die TTL steigt mit jeder Runde um 1. Jeder Router, bei dem die TTL 0 wird, verrät sich mit Time Exceeded, das Ziel mit Echo Reply.',
    },
    {
      id: 'm13-q036',
      kind: 'single',
      skill: 'diag.scenario',
      difficulty: 3,
      prompt: `Vom PC in Hamburg:

\`\`\`
C:\\>ping 192.168.10.1     → 4 Antworten, Zeit<1ms
C:\\>ping 8.8.8.8          → Zeitüberschreitung der Anforderung (4x)

C:\\>tracert -d 8.8.8.8
  1    <1 ms    <1 ms    <1 ms  192.168.10.1
  2     *        *        *     Zeitüberschreitung der Anforderung.
  3     *        *        *     Zeitüberschreitung der Anforderung.
\`\`\`

Alle Kollegen sind betroffen. Was ist die wahrscheinlichste Ursache?`,
      options: [
        'Störung des Internetzugangs hinter der Firewall/dem Router (z. B. Leitung des Providers, WAN-Port, NAT)',
        'Falscher DNS-Server an allen PCs',
        'Defektes Patchkabel am PC',
        'DHCP-Bereich erschöpft',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Es wurde mit IP-Adressen getestet – DNS ist nicht beteiligt.', error: 'dns-falsch-zugeordnet' },
        '2': { why: 'Das Gateway antwortet in <1 ms – das lokale Kabel ist in Ordnung. Außerdem sind alle betroffen.', error: 'eingrenzung-fehlt' },
        '3': { why: 'Die PCs haben gültige Adressen und erreichen das Gateway.', error: 'eingrenzung-fehlt' },
      },
      explanation: 'LAN und Gateway funktionieren (Hop 1), danach geht nichts mehr – und das für alle Nutzer. Das Problem liegt am Übergang ins Internet: WAN-Verbindung, Provider-Störung, Routing/NAT auf der Firewall.',
      hints: ['Bis wohin kommen die Pakete?', 'Wie viele Nutzer sind betroffen?'],
    },
    /* ---------- DNS ---------- */
    {
      id: 'm13-q013',
      kind: 'text',
      skill: 'diag.dns',
      difficulty: 1,
      prompt: 'Mit welchem Befehl lässt du dir den Inhalt des **lokalen DNS-Caches** unter Windows anzeigen?',
      accept: ['ipconfig /displaydns', 'ipconfig -displaydns', 'Get-DnsClientCache'],
      placeholder: 'Befehl',
      explanation: '`ipconfig /displaydns` zeigt alle gecachten Einträge mit Rest-TTL („Gültigkeitsdauer“). PowerShell: `Get-DnsClientCache`.',
    },
    {
      id: 'm13-q014',
      kind: 'text',
      skill: 'diag.dns',
      difficulty: 2,
      prompt: 'Gib den nslookup-Befehl an, mit dem du die **MX-Records** der Domain `elektro-kraemer.de` abfragst.',
      accept: [
        'nslookup -type=mx elektro-kraemer.de',
        'nslookup -type=MX elektro-kraemer.de',
        'nslookup -q=mx elektro-kraemer.de',
        'nslookup -querytype=mx elektro-kraemer.de',
        'nslookup -query=mx elektro-kraemer.de',
      ],
      placeholder: 'nslookup …',
      explanation: 'Mit `-type=` (auch `-q=` bzw. `-querytype=`) wählt man den Record-Typ. Alternativ interaktiv: `nslookup`, dann `set type=mx` und den Domainnamen eingeben.',
    },
    {
      id: 'm13-q015',
      kind: 'single',
      skill: 'diag.dns',
      difficulty: 2,
      prompt: '`nslookup www.example.com` liefert eine Zeitüberschreitung, `nslookup www.example.com 8.8.8.8` liefert sofort eine korrekte Antwort. Was folgerst du?',
      options: [
        'Der am PC eingestellte DNS-Server antwortet nicht oder ist falsch eingetragen',
        'Die Domain www.example.com existiert nicht',
        'Die Internetverbindung ist gestört',
        'Der lokale DNS-Cache ist voll',
      ],
      answer: 0,
      distractors: {
        '1': { why: '8.8.8.8 kennt den Namen – er existiert also.', error: 'ausgabe-fehlgedeutet' },
        '2': { why: '8.8.8.8 liegt im Internet und antwortet – die Verbindung funktioniert.', error: 'eingrenzung-fehlt' },
        '3': { why: 'nslookup verwendet den lokalen Cache gar nicht.', error: 'nslookup-cache' },
      },
      explanation: 'Mit dem zweiten Argument wird ein anderer DNS-Server befragt. Klappt das, ist das Problem der eingestellte DNS-Server (falsche Adresse, Dienst aus, Port 53 blockiert).',
    },
    {
      id: 'm13-q016',
      kind: 'single',
      skill: 'diag.dns',
      difficulty: 2,
      prompt: `Ausgabe:

\`\`\`
C:\\>nslookup www.elektro-kramer.de
Server:  dc01.elektro-kraemer.local
Address:  192.168.10.5

*** www.elektro-kramer.de wurde von dc01.elektro-kraemer.local nicht gefunden: Non-existent domain
\`\`\`

Wie ist das zu deuten?`,
      options: [
        'Der DNS-Server antwortet, aber den angefragten Namen gibt es nicht – hier wegen eines Tippfehlers (kramer statt kraemer)',
        'Der DNS-Server ist nicht erreichbar',
        'Der PC hat keine IP-Adresse',
        'Der Webserver ist ausgeschaltet',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Der Server hat geantwortet (mit „Non-existent domain“) – sonst käme eine Zeitüberschreitung.', error: 'ausgabe-fehlgedeutet' },
        '2': { why: 'Ohne IP-Adresse gäbe es keine Antwort vom DNS-Server.', error: 'ausgabe-fehlgedeutet' },
        '3': { why: 'DNS weiß nicht, ob ein Server eingeschaltet ist – es liefert nur Einträge.', error: 'dns-funktion' },
      },
      explanation: '„Non-existent domain“ (NXDOMAIN) heißt: Der DNS-Server funktioniert, kennt den Namen aber nicht. Erst Schreibweise prüfen, dann ob der Record existiert.',
    },
    {
      id: 'm13-q041',
      kind: 'free',
      skill: 'diag.scenario',
      difficulty: 3,
      prompt: `Analysieren Sie folgende Ausgaben eines Berliner PCs und nennen Sie Ursache und Lösung.

\`\`\`
C:\\>ipconfig /all
   ...
   IPv4-Adresse  . . . . . . . . . . : 192.168.20.44(Bevorzugt)
   Subnetzmaske  . . . . . . . . . . : 255.255.255.0
   Standardgateway . . . . . . . . . : 192.168.20.1
   DHCP-Server . . . . . . . . . . . : 192.168.10.5
   DNS-Server  . . . . . . . . . . . : 192.168.20.10
   ...
C:\\>ping 8.8.8.8
Antwort von 8.8.8.8: Bytes=32 Zeit=11ms TTL=115   (4x)

C:\\>ping www.example.com
Ping-Anforderung konnte Host "www.example.com" nicht finden. Überprüfen Sie den Namen, und versuchen Sie es erneut.

C:\\>ping 192.168.20.10
Antwort von 192.168.20.44: Zielhost nicht erreichbar.   (4x)

C:\\>nslookup www.example.com 192.168.10.5
Nicht autorisierende Antwort:
Name:    www.example.com
Addresses:  93.184.215.14
\`\`\``,
      modelAnswer:
        'Die IP-Konfiguration ist gültig (Adresse per DHCP vom Server 192.168.10.5 in Hamburg), das Gateway und das Internet sind per IP erreichbar (ping 8.8.8.8 erfolgreich). Die Namensauflösung schlägt fehl. Als DNS-Server ist 192.168.20.10 eingetragen; dieser ist im lokalen Netz nicht vorhanden (der eigene PC meldet „Zielhost nicht erreichbar“, d. h. keine ARP-Antwort). Der Hamburger DNS-Server 192.168.10.5 beantwortet die Anfrage korrekt. Ursache ist also ein falscher bzw. nicht existierender DNS-Server – da die Adresse per DHCP kommt, ist vermutlich die DHCP-Option 6 im Bereich 192.168.20.0/24 falsch konfiguriert (oder ein geplanter lokaler DNS-Server in Berlin ist ausgefallen). Lösung: Option 6 im Berliner Bereich auf einen funktionierenden DNS-Server (z. B. 192.168.10.5) setzen bzw. den Berliner DNS-Server wieder in Betrieb nehmen, an den Clients ipconfig /renew und ipconfig /flushdns ausführen und mit nslookup/ping erneut testen.',
      keywords: ['DNS-Server 192.168.20.10', 'nicht erreichbar', 'ARP', 'Option 6', 'DHCP-Bereich', 'nslookup', 'ipconfig /renew', 'flushdns'],
      explanation: 'Die Kunst ist, die Ausgaben zu kombinieren: Routing ok, DNS kaputt, eingetragener DNS-Server existiert nicht, anderer DNS funktioniert → falsche DHCP-Option bzw. ausgefallener Server.',
      hints: ['Wer antwortet auf den Ping an 192.168.20.10?', 'Woher bekommt der PC seinen DNS-Eintrag?'],
    },
    {
      id: 'm13-q042',
      kind: 'single',
      skill: 'diag.dns',
      difficulty: 3,
      prompt: '`ping server01` schlägt mit „Host nicht finden“ fehl, `nslookup server01` liefert dagegen die richtige IP. Welche Maßnahme ist als Nächstes am sinnvollsten?',
      options: [
        'Den lokalen DNS-Cache leeren (ipconfig /flushdns) und die hosts-Datei prüfen',
        'Den DNS-Server neu installieren',
        'Die IP-Adresse des PCs ändern',
        'Ein neues Netzwerkkabel stecken',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Der DNS-Server funktioniert – nslookup bekommt eine richtige Antwort.', error: 'eingrenzung-fehlt' },
        '2': { why: 'Die IP-Konfiguration ist nicht das Problem, nslookup erreicht den Server ja.', error: 'eingrenzung-fehlt' },
        '3': { why: 'Die Netzwerkverbindung funktioniert offensichtlich.', error: 'schicht-falsch' },
      },
      explanation: 'nslookup umgeht Cache und hosts-Datei, ping nutzt sie. Unterschiedliche Ergebnisse deuten auf einen (negativen) Cache-Eintrag oder einen hosts-Eintrag hin.',
    },
    /* ---------- netstat ---------- */
    {
      id: 'm13-q017',
      kind: 'single',
      skill: 'diag.netstat',
      difficulty: 2,
      prompt: `Auf einem Server liefert \`netstat -ano\` u. a.:

\`\`\`
  Proto  Lokale Adresse         Remoteadresse          Status           PID
  TCP    0.0.0.0:80             0.0.0.0:0              ABHÖREN          3324
  TCP    0.0.0.0:3389           0.0.0.0:0              ABHÖREN          1288
  TCP    192.168.10.40:3389     192.168.10.57:51522    HERGESTELLT      1288
\`\`\`

Welche Aussage ist richtig?`,
      options: [
        'Der PC 192.168.10.57 hat eine aktive Remotedesktop-Sitzung zum Server, Prozess 1288 bedient Port 3389',
        'Der Server baut selbst eine Webverbindung zu 192.168.10.57 auf',
        'Port 80 ist durch die Firewall blockiert',
        'Prozess 3324 hat eine bestehende Verbindung zu 192.168.10.57',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Der lokale Port ist 3389 (RDP) und der Remote-Port ein hoher Client-Port – der Client baut auf den Server auf, nicht umgekehrt.', error: 'netstat-richtung' },
        '2': { why: 'netstat zeigt nur, dass ein Dienst auf Port 80 lauscht – über Firewall-Regeln sagt es nichts.', error: 'netstat-firewall' },
        '3': { why: 'Prozess 3324 lauscht nur (ABHÖREN), eine HERGESTELLT-Verbindung gehört zu PID 1288.', error: 'netstat-zustand' },
      },
      explanation: 'Lokaler Port 3389 + HERGESTELLT + Remote 192.168.10.57:51522 = eingehende RDP-Sitzung vom PC .57. PID 1288 lauscht auf 3389 und bedient die Verbindung.',
    },
    {
      id: 'm13-q018',
      kind: 'match',
      skill: 'diag.netstat',
      difficulty: 2,
      prompt: 'Ordne die netstat-Optionen ihrer Bedeutung zu.',
      left: ['-a', '-n', '-o', '-b', '-r'],
      right: [
        'Routingtabelle anzeigen',
        'Prozess-ID (PID) anzeigen',
        'Alle Verbindungen und lauschenden Ports anzeigen',
        'Programmnamen anzeigen (Adminrechte nötig)',
        'Adressen und Ports numerisch, ohne Namensauflösung',
      ],
      answer: [2, 4, 1, 3, 0],
      explanation: '-a all, -n numerisch, -o owning process (PID), -b binary (Programmname, Admin), -r routing table.',
    },
    {
      id: 'm13-q019',
      kind: 'match',
      skill: 'diag.netstat',
      difficulty: 2,
      prompt: 'Ordne die TCP-Zustände (englisch / deutsches Windows) ihrer Bedeutung zu.',
      left: ['LISTENING / ABHÖREN', 'ESTABLISHED / HERGESTELLT', 'TIME_WAIT / WARTEND', 'SYN_SENT'],
      right: [
        'Verbindung wurde geschlossen, das System wartet noch kurz auf verspätete Pakete',
        'Verbindungsaufbau gesendet, aber noch keine Antwort erhalten',
        'Ein Dienst wartet auf eingehende Verbindungen',
        'Verbindung ist aufgebaut, Daten können fließen',
      ],
      answer: [2, 3, 0, 1],
      explanation: 'LISTENING = lauscht, ESTABLISHED = verbunden, TIME_WAIT = nach dem Schließen, SYN_SENT = Aufbau läuft (hängt er dort, wird der Port oft gefiltert).',
    },
    {
      id: 'm13-q029',
      kind: 'multi',
      skill: 'diag.netstat',
      difficulty: 2,
      prompt: 'Welche der folgenden Befehle benötigen unter Windows **Administratorrechte** (erhöhte Eingabeaufforderung)? (Mehrere Antworten)',
      options: [
        'netstat -b',
        'route add 10.20.0.0 mask 255.255.0.0 192.168.10.254',
        'arp -d *',
        'ping -t 192.168.10.1',
        'hostname',
        'ipconfig /all',
      ],
      answer: [0, 1, 2],
      explanation: 'netstat -b muss auf Prozessinformationen zugreifen, route add ändert die Routingtabelle, arp -d ändert den ARP-Cache – alles erfordert erhöhte Rechte. Reine Anzeige- und Testbefehle wie ping, hostname, ipconfig /all funktionieren als normaler Benutzer.',
    },
    /* ---------- arp / route ---------- */
    {
      id: 'm13-q020',
      kind: 'single',
      skill: 'diag.arproute',
      difficulty: 3,
      prompt: `Ausgabe von \`arp -a\` auf einem PC:

\`\`\`
Schnittstelle: 192.168.10.57 --- 0xc
  Internetadresse       Physische Adresse     Typ
  192.168.10.1          a4-bb-6d-10-3e-66     dynamisch
  192.168.10.5          00-15-5d-0a-0b-05     dynamisch
  192.168.10.66         a4-bb-6d-10-3e-66     dynamisch
\`\`\`

Laut Dokumentation hat das Gateway die MAC \`00-0c-29-4f-8a-11\`. Was ist zu vermuten?`,
      options: [
        'ARP-Spoofing: Der Host 192.168.10.66 gibt sich als Gateway aus (Man-in-the-Middle)',
        'Das ist normal, Gateways haben immer mehrere IPs',
        'Der DHCP-Server hat die Adressen doppelt vergeben',
        'Der ARP-Cache ist voll',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Die MAC passt nicht zur dokumentierten Gateway-MAC und ist identisch mit einem normalen Host.', error: 'arp-spoofing-uebersehen' },
        '2': { why: 'Ein IP-Konflikt würde nicht dazu führen, dass zwei IPs dieselbe MAC haben.', error: 'ausgabe-fehlgedeutet' },
        '3': { why: 'Ein „voller“ ARP-Cache erklärt keine falsche MAC.', error: 'ausgabe-fehlgedeutet' },
      },
      explanation: 'Das Gateway hat plötzlich die MAC von 192.168.10.66. Typisches Zeichen für ARP-Spoofing: Ein Angreifer schickt gefälschte ARP-Antworten, damit der Verkehr über ihn läuft. Sofort Sicherheitsvorfall melden; Gegenmaßnahmen z. B. Dynamic ARP Inspection am Switch.',
    },
    {
      id: 'm13-q021',
      kind: 'single',
      skill: 'diag.arproute',
      difficulty: 2,
      prompt: 'Das Labornetz `10.20.0.0/16` ist über den Router `192.168.10.254` erreichbar. Mit welchem Befehl legst du auf einem Windows-PC eine **dauerhafte** Route an?',
      options: [
        'route -p add 10.20.0.0 mask 255.255.0.0 192.168.10.254',
        'route add 10.20.0.0 mask 255.255.0.0 192.168.10.254',
        'route add 192.168.10.254 mask 255.255.0.0 10.20.0.0 -p',
        'arp -s 10.20.0.0 192.168.10.254',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Ohne -p ist die Route nach einem Neustart weg.', error: 'route-persistent' },
        '2': { why: 'Ziel und Gateway sind vertauscht: Erst kommt das Zielnetz, dann die Maske, dann das Gateway.', error: 'route-syntax' },
        '3': { why: 'arp -s legt eine IP-MAC-Zuordnung an, keine Route.', error: 'werkzeug-verwechselt' },
      },
      explanation: 'Syntax: route [-p] add Zielnetz mask Netzmaske Gateway. -p (persistent) speichert die Route dauerhaft; sie erscheint dann unter „Ständige Routen“.',
    },
    {
      id: 'm13-q022',
      kind: 'single',
      skill: 'diag.arproute',
      difficulty: 2,
      prompt: 'In der Routingtabelle steht bei `192.168.10.0  255.255.255.0` als Gateway **„Auf Verbindung“**. Was bedeutet das?',
      options: [
        'Das Netz ist direkt angeschlossen; Ziele darin werden ohne Router direkt (per ARP) erreicht',
        'Die Verbindung zum Gateway ist gerade aktiv',
        'Das Netz ist nur per VPN erreichbar',
        'Die Route ist fehlerhaft',
      ],
      answer: 0,
      distractors: {
        '1': { why: '„Auf Verbindung“ (on-link) beschreibt keinen Verbindungszustand, sondern direkte Erreichbarkeit.', error: 'route-falsch' },
        '2': { why: 'VPN-Routen würden über einen VPN-Adapter bzw. ein Gateway gehen.', error: 'route-falsch' },
        '3': { why: 'Das ist die normale Route für das eigene Subnetz.', error: 'route-falsch' },
      },
      explanation: '„Auf Verbindung“ (englisch On-link) heißt: Das Zielnetz ist direkt an der Schnittstelle angeschlossen, es wird kein Gateway benötigt.',
    },
    /* ---------- PowerShell ---------- */
    {
      id: 'm13-q023',
      kind: 'text',
      skill: 'diag.powershell',
      difficulty: 1,
      prompt: 'Welches PowerShell-Cmdlet prüft, ob ein bestimmter **TCP-Port** auf einem Zielsystem erreichbar ist (z. B. mit `-Port 443`)?',
      accept: ['Test-NetConnection', 'tnc'],
      placeholder: 'Cmdlet',
      explanation: '`Test-NetConnection ziel -Port 443` (Alias `tnc`) baut eine TCP-Verbindung auf und zeigt `TcpTestSucceeded : True/False`.',
    },
    {
      id: 'm13-q024',
      kind: 'single',
      skill: 'diag.powershell',
      difficulty: 1,
      prompt: 'Mit welchem Cmdlet fragst du die MX-Records einer Domain bei einem bestimmten DNS-Server ab?',
      options: [
        'Resolve-DnsName elektro-kraemer.de -Type MX -Server 8.8.8.8',
        'Get-NetIPConfiguration -Type MX',
        'Test-Connection elektro-kraemer.de -MX',
        'Get-NetAdapter -Dns',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Get-NetIPConfiguration zeigt die IP-Konfiguration, es fragt keine DNS-Records ab.', error: 'cmdlet-verwechselt' },
        '2': { why: 'Test-Connection ist ein ping-Ersatz und kennt keinen Parameter -MX.', error: 'cmdlet-verwechselt' },
        '3': { why: 'Get-NetAdapter zeigt Netzwerkadapter.', error: 'cmdlet-verwechselt' },
      },
      explanation: 'Resolve-DnsName ist das PowerShell-Gegenstück zu nslookup: -Type wählt den Record-Typ, -Server den befragten DNS-Server.',
    },
    {
      id: 'm13-q025',
      kind: 'match',
      skill: 'diag.powershell',
      difficulty: 2,
      prompt: 'Ordne die PowerShell-Cmdlets dem klassischen Befehl mit ähnlicher Funktion zu.',
      left: ['Test-Connection', 'Get-NetIPConfiguration', 'Resolve-DnsName', 'Get-NetTCPConnection', 'Clear-DnsClientCache'],
      right: ['ipconfig /flushdns', 'netstat', 'ping', 'nslookup', 'ipconfig'],
      answer: [2, 4, 3, 1, 0],
      explanation: 'Test-Connection ≈ ping, Get-NetIPConfiguration ≈ ipconfig, Resolve-DnsName ≈ nslookup, Get-NetTCPConnection ≈ netstat, Clear-DnsClientCache ≈ ipconfig /flushdns.',
    },
    {
      id: 'm13-q044',
      kind: 'single',
      skill: 'diag.powershell',
      difficulty: 2,
      prompt: `Ausgabe:

\`\`\`
PS C:\\> Get-NetAdapter

Name     InterfaceDescription                      ifIndex Status       MacAddress         LinkSpeed
----     --------------------                      ------- ------       ----------         ---------
Ethernet Intel(R) Ethernet Connection (17) I219-LM      12 Up           3C-52-82-1A-7F-57   100 Mbps
\`\`\`

Der Anwender beklagt sehr langsame Dateikopien vom Server. Netzwerkkarte, Switch und Verkabelung sind für 1 Gbit/s ausgelegt. Was prüfst du zuerst?`,
      options: [
        'Patchkabel und Netzwerkdose – ein Kabelfehler kann zur Aushandlung von nur 100 Mbit/s führen',
        'Den DNS-Server',
        'Die DHCP-Lease-Dauer',
        'Die hosts-Datei',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'DNS beeinflusst nicht die Übertragungsgeschwindigkeit einer bestehenden Verbindung.', error: 'schicht-falsch' },
        '2': { why: 'Die Lease-Dauer hat nichts mit der Linkgeschwindigkeit zu tun.', error: 'schicht-falsch' },
        '3': { why: 'Die hosts-Datei betrifft die Namensauflösung.', error: 'schicht-falsch' },
      },
      explanation: 'LinkSpeed 100 Mbps statt 1 Gbps: Gigabit-Ethernet braucht alle vier Aderpaare, Fast Ethernet nur zwei. Ein beschädigtes Kabel oder eine schlecht aufgelegte Dose führt oft zu einer Aushandlung auf 100 Mbit/s – ein Schicht-1-Problem.',
    },
    {
      id: 'm13-q045',
      kind: 'free',
      skill: 'diag.powershell',
      difficulty: 2,
      prompt: 'Erklären Sie, warum ein erfolgreicher `ping` noch nicht beweist, dass ein Webserver für Benutzer erreichbar ist, und wie Sie die Erreichbarkeit des Dienstes prüfen.',
      modelAnswer:
        'ping nutzt ICMP auf Schicht 3 und prüft nur, ob der Host auf IP-Ebene erreichbar ist und ICMP beantwortet. Ein Webdienst läuft aber über TCP auf einem bestimmten Port (z. B. 443). Der Dienst kann gestoppt sein, auf einem anderen Port lauschen oder eine Firewall kann den Port blockieren, obwohl ICMP erlaubt ist. Umgekehrt kann ein Server ICMP blockieren, obwohl der Webdienst erreichbar ist. Die Erreichbarkeit des Dienstes prüft man mit einem TCP-Verbindungstest, z. B. in PowerShell mit Test-NetConnection server -Port 443 (TcpTestSucceeded : True), und auf dem Server selbst mit netstat -ano bzw. Get-NetTCPConnection -State Listen, ob der Port im Zustand LISTENING ist. Abschließend kann man im Browser bzw. mit einem HTTP-Client die Anwendung selbst testen.',
      keywords: ['ICMP', 'Schicht 3', 'TCP', 'Port 443', 'Firewall', 'Test-NetConnection -Port', 'TcpTestSucceeded', 'netstat', 'LISTENING'],
      explanation: 'Wichtig ist die Unterscheidung Schicht 3 (Host erreichbar) vs. Schicht 4/7 (Dienst erreichbar) und das passende Werkzeug.',
    },
  ],
};
