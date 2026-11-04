import type { Module } from '../types';

export const m16: Module = {
  id: 'm16',
  nr: 16,
  title: 'Praxis & AP1-Prüfungssimulation',
  short: 'Szenarien wie in der Prüfung: IP-Konfiguration prüfen, Netzpläne lesen, Energie- und Leistungsdaten, gemischte Aufgaben.',
  icon: 'GraduationCap',
  relevance: 'ap1',
  prerequisites: ['m03', 'm10', 'm13'],
  generators: ['ipv4.samesubnet', 'subnet.table', 'calc.transfertime'],
  skills: [
    { id: 'practice.format', module: 'm16', title: 'AP1-Format & Prüfungsstrategie' },
    { id: 'practice.ipconfig', module: 'm16', title: 'IP-Konfiguration eines Arbeitsplatzes prüfen', requires: ['ipv4.gateway', 'ipv4.network'] },
    { id: 'practice.netdoc', module: 'm16', title: 'Netzpläne & Netzwerkdokumentation' },
    { id: 'practice.energy', module: 'm16', title: 'Energie- und Leistungsdaten (P = U · I, PoE)' },
    { id: 'practice.linux', module: 'm16', title: 'Linux-Netzwerkbefehle (iproute2)' },
    { id: 'practice.scenario', module: 'm16', title: 'Gemischte Handlungssituationen' },
  ],
  lessons: [
    {
      id: 'm16-l01',
      title: 'So ist die AP1 aufgebaut – und wie du sie angehst',
      minutes: 10,
      relevance: 'ap1',
      skills: ['practice.format'],
      steps: [
        {
          type: 'explain',
          title: 'Format nach IHK-Angaben',
          body: `Die **Abschlussprüfung Teil 1** („Einrichten eines IT-gestützten Arbeitsplatzes“) ist laut Ausbildungsverordnung (§ 9 FIAusbV) und IHK-Angaben:

| Merkmal | Wert |
|---|---|
| Dauer | **90 Minuten**, schriftlich |
| Gewichtung | **20 %** der Gesamtnote |
| Aufgaben | **offene, praxisbezogene Aufgaben** zu einer Handlungssituation – **kein Multiple Choice**, keine Wahlaufgaben |
| Für wen | identisch für alle IT-Berufe |
| Basis | Inhalte der ersten 18 Ausbildungsmonate; seit Frühjahr 2025 mit einheitlichen **Belegsätzen** (Datenblätter, Pläne, Ausgaben), die im Aufgabensatz enthalten sind |

Quellen und Details: \`docs/AP1-RELEVANZ.md\` im Programmordner. Die zugelassenen Hilfsmittel stehen in deiner Einladung der IHK – in der Regel ein nicht programmierbarer Taschenrechner.

**Was heißt das für dich?**
- Du musst Antworten **selbst formulieren und rechnen** – deshalb übt diese App bevorzugt mit Eingabefeldern, Tabellen und Freitext statt Ankreuzen.
- Rechenwege aufschreiben: Auch bei falschem Endergebnis gibt es oft Teilpunkte.
- Operatoren beachten: *nennen* (Stichwort), *beschreiben* (Ablauf in Sätzen), *erläutern* (mit Begründung/Beispiel), *berechnen* (mit Rechenweg).

**Zeitstrategie:** 90 Minuten für ca. 100 Punkte ⇒ knapp **1 Minute pro Punkt**. Bleib nicht an einer Teilaufgabe hängen – markiere sie und komm zurück.`,
        },
        {
          type: 'check',
          question: { id: 'm16-c01', kind: 'single', skill: 'practice.format', difficulty: 1, prompt: 'Was verlangt der Operator **„erläutern“**?', options: ['Nur ein Stichwort nennen', 'Einen Sachverhalt mit Begründung bzw. Beispiel nachvollziehbar darstellen', 'Eine Zahl berechnen', 'Etwas ankreuzen'], answer: 1, explanation: '„Erläutern“ = verständlich machen, mit Begründung oder Beispiel – mehr als nur „nennen“.' },
        },
        { type: 'summary', points: ['90 Min., 20 %, nur offene Aufgaben.', 'Rechenwege und Begründungen bringen Teilpunkte.', 'Ca. 1 Minute pro Punkt einplanen.'] },
      ],
    },
    {
      id: 'm16-l02',
      title: 'IP-Konfiguration eines Arbeitsplatzes prüfen',
      minutes: 20,
      relevance: 'ap1',
      skills: ['practice.ipconfig'],
      steps: [
        {
          type: 'explain',
          title: 'Systematisch eine ipconfig-Ausgabe lesen',
          body: `Klassische Prüfungssituation: *„Ein neu eingerichteter PC erreicht das Internet nicht. Die Ausgabe von \`ipconfig /all\` liegt bei.“*

\`\`\`
Ethernet-Adapter Ethernet:
   Verbindungsspezifisches DNS-Suffix: kraemer.local
   Physische Adresse . . . . . . . . : 3C-52-82-1A-7F-09
   DHCP aktiviert. . . . . . . . . . : Nein
   IPv4-Adresse  . . . . . . . . . . : 192.168.20.75(Bevorzugt)
   Subnetzmaske  . . . . . . . . . . : 255.255.255.192
   Standardgateway . . . . . . . . . : 192.168.20.129
   DNS-Server  . . . . . . . . . . . : 192.168.20.10
\`\`\`

**Prüfschema:**
1. **Adresse gültig?** Kein 169.254.x.x (APIPA), keine Netz- oder Broadcastadresse.
2. **Netz bestimmen:** /26 → Schrittweite 64 → 75 liegt im Block **64–127** → Netz 192.168.20.64/26.
3. **Gateway im selben Netz?** .129 liegt im Block 128–191 → **nein!** ❌
4. **DNS-Server:** .10 liegt außerhalb (Block 0–63) – das ist erlaubt, **sofern das Gateway funktioniert** (DNS wird dann geroutet).

**Diagnose:** Das Standardgateway liegt nicht im Subnetz des PCs. Lösung: korrektes Gateway des Netzes .64/26 eintragen (z. B. .65 bzw. das, was laut Netzplan konfiguriert ist) oder Maske/Adresse gemäß Netzplan korrigieren.`,
        },
        {
          type: 'check',
          question: { id: 'm16-c02', kind: 'ip', skill: 'practice.ipconfig', difficulty: 2, prompt: 'Ein PC hat 10.1.8.200/21. Wie lautet die Netzadresse seines Subnetzes (z. B. um die passende Gateway-Adresse im Netzplan zu finden)?', answer: '10.1.8.0', hints: ['/21: Schrittweite 8 im 3. Oktett.'], explanation: '8 liegt im Block 8–15 → **10.1.8.0/21** (Broadcast 10.1.15.255).' },
        },
        { type: 'practice', title: 'Übung: gleiches Subnetz?', generator: 'ipv4.samesubnet', count: 3, difficulty: 2 },
        { type: 'summary', points: ['APIPA? Netz/Broadcast als Hostadresse?', 'Netz per Maske bestimmen; Gateway muss darin liegen.', 'DNS darf in einem anderen Netz liegen – braucht dann aber ein funktionierendes Gateway.'] },
      ],
    },
    {
      id: 'm16-l03',
      title: 'Netzpläne lesen und dokumentieren',
      minutes: 15,
      relevance: 'ap1',
      skills: ['practice.netdoc'],
      steps: [
        {
          type: 'explain',
          title: 'Was gehört in eine Netzwerkdokumentation?',
          body: `Bei der Übergabe eines eingerichteten Arbeitsplatzes oder Netzes gehört eine **Netzwerkdokumentation** dazu. Typische Bestandteile:

| Dokument | Inhalt |
|---|---|
| **Logischer Netzplan** | Netze/VLANs mit Adressbereichen, Router, Firewalls, Server – wer ist mit wem verbunden? |
| **Physischer Netzplan** | Räume, Racks, Kabelwege, Switchports, Patchfelder |
| **IP-Adressliste** | Gerät, IP, Maske, Gateway, statisch/DHCP, MAC, Standort |
| **Patchplan / Portbelegung** | Patchfeld-Port ↔ Switchport ↔ Dose ↔ Gerät/VLAN |
| **Konfigurationen & Zugangsdaten** | Sicherungen der Gerätekonfigurationen (Zugangsdaten nur geschützt aufbewahren!) |
| **Änderungsprotokoll** | wer hat wann was geändert |

**Netzplan lesen** – achte auf: Symbole (Router, Switch, Firewall, AP), Beschriftungen der Links (Geschwindigkeit, Medium, VLAN), Netzadressen an den Segmenten und Gateway-Adressen an den Routerschnittstellen.`,
        },
        {
          type: 'visual',
          title: 'Beispiel-Netzplan Elektro Krämer GmbH',
          widget: {
            kind: 'topology',
            data: {
              nodes: [
                { id: 'inet', type: 'internet', label: 'Internet', x: 400, y: 40 },
                { id: 'fw', type: 'firewall', label: 'Firewall', sub: 'WAN 203.0.113.2', x: 400, y: 140 },
                { id: 'dmz', type: 'server', label: 'Webserver', sub: '172.16.0.10', x: 650, y: 140 },
                { id: 'sw', type: 'switch', label: 'Core-Switch', x: 400, y: 250 },
                { id: 'srv', type: 'server', label: 'DC/DNS/DHCP', sub: '192.168.10.10', x: 140, y: 360 },
                { id: 'pc', type: 'pc', label: 'Clients', sub: '192.168.20.0/24', x: 400, y: 360 },
                { id: 'ap', type: 'ap', label: 'Gäste-AP', sub: '192.168.99.0/24', x: 660, y: 360 },
              ],
              links: [
                { from: 'inet', to: 'fw', style: 'wan' }, { from: 'fw', to: 'dmz', label: 'DMZ' }, { from: 'fw', to: 'sw', label: 'Trunk', style: 'trunk' },
                { from: 'sw', to: 'srv', label: 'VLAN 10' }, { from: 'sw', to: 'pc', label: 'VLAN 20' }, { from: 'sw', to: 'ap', label: 'VLAN 99' },
              ],
            },
          },
          caption: 'Logischer Netzplan: Die Firewall trennt Internet, DMZ und internes Netz; der Switch verteilt die VLANs.',
        },
        {
          type: 'check',
          question: { id: 'm16-c03', kind: 'multi', skill: 'practice.netdoc', difficulty: 1, prompt: 'Welche Angaben gehören in eine IP-Adressliste?', options: ['IP-Adresse und Maske', 'Gerätename', 'Standardgateway', 'Lieblingsfarbe des Nutzers', 'statisch oder DHCP'], answer: [0, 1, 2, 4], explanation: 'Alles Technische zur Adressierung; persönliche Daten gehören nicht hinein.' },
        },
        { type: 'summary', points: ['Logischer vs. physischer Netzplan.', 'IP-Adressliste, Patchplan, Konfigurationssicherung, Änderungsprotokoll.'] },
      ],
    },
    {
      id: 'm16-l04',
      title: 'Leistung und Energie von Netzwerkkomponenten',
      minutes: 15,
      relevance: 'ap1',
      skills: ['practice.energy'],
      steps: [
        {
          type: 'explain',
          title: 'P = U · I und W = P · t',
          body: `Der AP1-Katalog verlangt, Leistungs- und **Energiekenngrößen** von Geräten zu bestimmen und zu beurteilen.

- **Leistung:** P = U · I (Watt = Volt · Ampere)
- **Energie (Arbeit):** W = P · t (kWh = kW · h)
- **Kosten:** Energie · Strompreis

**Beispiel:** Ein Switch nimmt im Dauerbetrieb 45 W auf. Strompreis 0,30 €/kWh.
- Pro Jahr: 45 W · 24 h · 365 = 394.200 Wh = **394,2 kWh**
- Kosten: 394,2 kWh · 0,30 €/kWh = **118,26 €**

**PoE-Budget:** Ein PoE-Switch hat ein Gesamtbudget, z. B. 370 W. Jedes Endgerät zieht Leistung: IP-Telefon ca. 6 W, Access Point (802.3at) bis 25,5 W am Gerät (30 W am Switchport). Die Summe der **am Port bereitgestellten** Leistungen darf das Budget nicht übersteigen.

*Beispiel:* 10 Access Points × 30 W + 20 Telefone × 7 W = 300 + 140 = 440 W > 370 W → Budget reicht nicht.`,
        },
        {
          type: 'check',
          question: { id: 'm16-c04', kind: 'number', skill: 'practice.energy', difficulty: 2, prompt: 'Ein Router nimmt 12 V bei 1,5 A auf. Welche Leistung in Watt?', answer: 18, unit: 'W', explanation: 'P = 12 V · 1,5 A = **18 W**.' },
        },
        {
          type: 'check',
          question: { id: 'm16-c05', kind: 'number', skill: 'practice.energy', difficulty: 2, prompt: 'Wie viele kWh verbraucht ein Gerät mit 20 W in 30 Tagen Dauerbetrieb?', answer: 14.4, tolerance: 0.01, unit: 'kWh', explanation: '20 W · 24 h · 30 = 14.400 Wh = **14,4 kWh**.' },
        },
        { type: 'summary', points: ['P = U · I, W = P · t.', 'Wh → kWh: durch 1000.', 'PoE: Summe der Port-Leistungen ≤ Budget.'] },
      ],
    },
    {
      id: 'm16-l05',
      title: 'Linux: Netzwerk mit iproute2',
      minutes: 10,
      relevance: 'ap1',
      skills: ['practice.linux'],
      steps: [
        {
          type: 'explain',
          title: 'Die Linux-Gegenstücke zu ipconfig & Co.',
          body: `Der Katalog nennt neben Windows-Befehlen ausdrücklich **ifconfig** und **iproute2**. Auf aktuellen Linux-Systemen ist \`ifconfig\` (Paket net-tools) oft nicht mehr installiert – Standard ist \`ip\`:

| Aufgabe | Windows | Linux (iproute2) | veraltet |
|---|---|---|---|
| Adressen anzeigen | \`ipconfig /all\` | \`ip a\` (ip address) | \`ifconfig\` |
| Routen / Gateway | \`route print\` | \`ip r\` (ip route) | \`route -n\` |
| ARP-/Nachbartabelle | \`arp -a\` | \`ip n\` (ip neigh) | \`arp -n\` |
| Schnittstelle an/aus | – | \`ip link set eth0 up\` | \`ifconfig eth0 up\` |
| Erreichbarkeit | \`ping\` | \`ping\` (läuft endlos, Abbruch mit Strg+C) | |
| Weg verfolgen | \`tracert\` | \`traceroute\` / \`tracepath\` | |
| DNS abfragen | \`nslookup\` | \`dig\`, \`nslookup\`, \`resolvectl query\` | |

Beispielausgabe \`ip r\`:
\`\`\`
default via 192.168.20.1 dev eth0
192.168.20.0/24 dev eth0 proto kernel scope link src 192.168.20.55
\`\`\`
→ Standardgateway 192.168.20.1, eigenes Netz 192.168.20.0/24.`,
        },
        {
          type: 'check',
          question: { id: 'm16-c06', kind: 'text', skill: 'practice.linux', difficulty: 1, prompt: 'Mit welchem iproute2-Befehl zeigst du unter Linux die Routingtabelle (inkl. Default-Gateway) an? (Kurzform)', accept: ['ip r', 'ip route', 'ip route show', 'ip r show'], explanation: '`ip r` bzw. `ip route`.' },
        },
        { type: 'summary', points: ['ip a = Adressen, ip r = Routen, ip n = ARP-Nachbarn.', 'ifconfig/route/arp sind veraltet (net-tools).'] },
      ],
    },
  ],
  questions: [
    { id: 'm16-q001', kind: 'free', skill: 'practice.ipconfig', difficulty: 2, prompt: 'Ein Client zeigt bei `ipconfig` die Adresse **169.254.88.12** mit Maske 255.255.0.0 und kein Gateway. Beschreibe die Ursache und drei Prüfschritte.', modelAnswer: 'Die Adresse ist eine APIPA-Adresse: Windows hat keine Antwort von einem DHCP-Server erhalten. Prüfschritte: 1. physische Verbindung/WLAN-Verbindung prüfen (Link-LED, Kabel, richtige SSID), 2. Switchport/VLAN-Zuordnung prüfen, 3. DHCP-Server bzw. DHCP-Relay prüfen (Dienst läuft, Bereich nicht erschöpft), danach `ipconfig /release` und `ipconfig /renew`.', keywords: ['APIPA', 'DHCP', 'Kabel', 'VLAN', 'ipconfig /renew'], explanation: '169.254.0.0/16 = automatische private Adressierung ohne DHCP.' },
    { id: 'm16-q002', kind: 'table', skill: 'practice.ipconfig', difficulty: 2, prompt: 'Prüfe die Konfigurationen. Trage für jede Zeile **ok** oder **fehler** ein.', columns: [{ key: 'r', label: 'ok / fehler', type: 'text' }], rows: [{ label: '192.168.1.10/24, GW 192.168.1.1', cells: { r: { answer: 'ok' } } }, { label: '192.168.1.130/25, GW 192.168.1.1', cells: { r: { answer: 'fehler' } } }, { label: '10.0.0.255/16, GW 10.0.0.1', cells: { r: { answer: 'ok' } } }, { label: '172.16.5.63/26, GW 172.16.5.1', cells: { r: { answer: 'fehler' } } }], explanation: 'Zeile 2: .130/25 liegt in .128–.255, Gateway .1 nicht. Zeile 3: Bei /16 ist 10.0.0.255 eine normale Hostadresse. Zeile 4: .63 ist bei /26 die Broadcastadresse von 172.16.5.0/26.' },
    { id: 'm16-q003', kind: 'number', skill: 'practice.energy', difficulty: 2, prompt: 'Ein PoE-Switch versorgt 8 Access Points mit je 25,5 W (am Gerät) bzw. 30 W (am Port). Wie viel Watt PoE-Budget wird am Switch mindestens benötigt?', answer: 240, unit: 'W', explanation: 'Das Budget bezieht sich auf die am Port bereitgestellte Leistung: 8 × 30 W = **240 W**.' },
    { id: 'm16-q004', kind: 'number', skill: 'practice.energy', difficulty: 3, prompt: 'Ein Serverschrank mit Switch (60 W), Router (25 W) und Firewall (40 W) läuft ganzjährig (365 Tage). Strompreis 0,32 €/kWh. Wie hoch sind die jährlichen Stromkosten in Euro? (auf Cent runden)', answer: 350.4, tolerance: 0.01, unit: '€', explanation: '125 W · 8.760 h = 1.095.000 Wh = 1.095 kWh · 0,32 €/kWh = **350,40 €**.' },
    { id: 'm16-q005', kind: 'match', skill: 'practice.linux', difficulty: 1, prompt: 'Ordne die Windows-Befehle ihren Linux-Entsprechungen (iproute2) zu.', left: ['ipconfig', 'route print', 'arp -a', 'tracert'], right: ['ip a', 'ip r', 'ip n', 'traceroute'], answer: [0, 1, 2, 3], explanation: 'ip address / ip route / ip neigh / traceroute.' },
    { id: 'm16-q006', kind: 'free', skill: 'practice.scenario', difficulty: 2, prompt: 'Die Elektro Krämer GmbH richtet ein Gäste-WLAN ein. Nenne drei Maßnahmen, damit Gäste nicht auf interne Systeme zugreifen können, und begründe kurz.', modelAnswer: '1. Eigenes Gäste-VLAN/Subnetz → eigene Broadcastdomäne, Trennung auf Layer 2/3. 2. Firewall-Regeln: Gästenetz darf nur ins Internet (HTTP/HTTPS, DNS), kein Zugriff auf interne Netze. 3. Client-Isolation am Access Point → Gäste untereinander getrennt. Zusätzlich: eigene SSID mit WPA2/WPA3-Verschlüsselung und wechselndem Passwort oder Captive Portal.', keywords: ['VLAN', 'Firewall', 'Client-Isolation', 'WPA'], explanation: 'Segmentierung + Filterung + Isolation.' },
    { id: 'm16-q007', kind: 'text', skill: 'practice.netdoc', difficulty: 1, prompt: 'Wie heißt die Dokumentation, die festhält, welcher Patchfeld-Port mit welchem Switchport verbunden ist?', accept: ['patchplan', 'patchliste', 'portbelegungsplan', 'portbelegung', 'patch-plan'], explanation: 'Patchplan / Portbelegungsplan.' },
    { id: 'm16-q008', kind: 'free', skill: 'practice.format', difficulty: 1, prompt: 'Warum solltest du in der Prüfung bei Rechenaufgaben immer den Rechenweg notieren?', modelAnswer: 'Weil die Aufgaben offen sind und Prüfer Teilpunkte für richtige Ansätze und Zwischenergebnisse vergeben können, auch wenn das Endergebnis falsch ist. Außerdem lässt sich der eigene Weg kontrollieren.', keywords: ['Teilpunkte', 'nachvollziehbar'], explanation: 'Offene Aufgaben → Teilpunkte für den Weg.' },
    { id: 'm16-q009', kind: 'ip', skill: 'practice.ipconfig', difficulty: 2, prompt: 'Ein Drucker soll im Netz 192.168.30.64/27 die **letzte nutzbare** Adresse erhalten. Welche?', answer: '192.168.30.94', misconceptions: [{ answer: '192.168.30.95', error: 'broadcast-letzter-host', why: '.95 ist der Broadcast.' }], explanation: 'Broadcast .64 + 32 − 1 = .95 → letzter Host **.94**.' },
  ],
};
