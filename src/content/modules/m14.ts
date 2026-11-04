import type { Module } from '../types';

export const m14: Module = {
  id: 'm14',
  nr: 14,
  title: 'Netzwerksicherheit',
  short:
    'Schutzziele, Firewalls, Segmentierung, Verschlüsselung, Zertifikate/TLS, Authentifizierung, WLAN-Sicherheit und typische Angriffe mit passenden Gegenmaßnahmen.',
  icon: 'Shield',
  relevance: 'ap1',
  prerequisites: ['m08', 'm11'],
  skills: [
    { id: 'sec.goals', module: 'm14', title: 'Schutzziele (CIA + Authentizität) zuordnen' },
    { id: 'sec.firewall', module: 'm14', title: 'Firewall-Arten unterscheiden und Regelwerke auswerten', requires: ['sec.goals'] },
    { id: 'sec.segment', module: 'm14', title: 'Segmentierung, DMZ und Switch-/VLAN-Sicherheit planen', requires: ['sec.firewall'] },
    { id: 'sec.crypto', module: 'm14', title: 'Symmetrische, asymmetrische und hybride Verschlüsselung erklären' },
    { id: 'sec.hash', module: 'm14', title: 'Hashwerte und digitale Signaturen verstehen', requires: ['sec.crypto'] },
    { id: 'sec.pki', module: 'm14', title: 'Zertifikate, PKI und TLS/HTTPS erklären', requires: ['sec.crypto', 'sec.hash'] },
    { id: 'sec.vpn', module: 'm14', title: 'VPN-Sicherheit (Verschlüsselung, Authentifizierung) bewerten', requires: ['sec.crypto'] },
    { id: 'sec.auth', module: 'm14', title: 'Authentifizierungsfaktoren, MFA, RADIUS und 802.1X einordnen' },
    { id: 'sec.wlan', module: 'm14', title: 'WLAN-Sicherheitsstandards (WEP, WPA2, WPA3) bewerten', requires: ['sec.auth'] },
    { id: 'sec.threats', module: 'm14', title: 'Bedrohungen erkennen und Gegenmaßnahmen zuordnen', requires: ['sec.goals'] },
  ],

  /* ================================================================== */
  /* Lektionen                                                           */
  /* ================================================================== */
  lessons: [
    /* ---------------------------------------------------------------- */
    {
      id: 'm14-l01',
      title: 'Schutzziele: Was wollen wir eigentlich schützen?',
      minutes: 20,
      relevance: 'ap1',
      skills: ['sec.goals'],
      steps: [
        {
          type: 'explain',
          title: 'Die drei klassischen Schutzziele – und ein viertes',
          body: `Bevor man über Firewalls oder Verschlüsselung spricht, muss klar sein, **was** geschützt werden soll. Die IT-Sicherheit (auch das BSI im IT-Grundschutz) nennt drei **Grundwerte**, im Englischen das **CIA-Dreieck**:

| Schutzziel | Englisch | Bedeutung | Beispiel bei der Elektro Krämer GmbH |
|---|---|---|---|
| **Vertraulichkeit** | Confidentiality | Nur **Berechtigte** können Informationen lesen. | Gehaltsliste der Buchhaltung, Kundendaten, Angebotspreise |
| **Integrität** | Integrity | Daten sind **vollständig und unverändert** – Manipulationen werden zumindest **erkannt**. | Eine Überweisung darf unterwegs nicht von 500 € auf 5.000 € geändert werden. |
| **Verfügbarkeit** | Availability | Systeme und Daten sind **nutzbar, wenn sie gebraucht werden**. | Der Webshop muss erreichbar sein, sonst entgeht Umsatz. |

Dazu kommen häufig erweiterte Schutzziele:
- **Authentizität**: Ein Kommunikationspartner oder eine Information ist **echt** – „Die Mail kommt wirklich vom Chef“, „Das ist wirklich der Server der Bank“.
- **Verbindlichkeit / Nichtabstreitbarkeit**: Jemand kann später **nicht leugnen**, eine Handlung durchgeführt zu haben (z. B. durch digitale Signatur).

**Welche Maßnahme schützt welches Ziel?** Das ist eine Lieblingsfrage in Prüfungen:

| Maßnahme | Schützt vor allem |
|---|---|
| Verschlüsselung (AES, TLS, VPN) | Vertraulichkeit |
| Hashwerte, Prüfsummen, MAC | Integrität |
| Digitale Signatur | Integrität + Authentizität + Verbindlichkeit |
| Backups, Redundanz (RAID, zweite Leitung, USV), DDoS-Schutz | Verfügbarkeit |
| Passwörter, MFA, Zertifikate | Authentizität (und indirekt Vertraulichkeit) |

> **Merke:** RAID und USV schützen **nicht** die Vertraulichkeit, Verschlüsselung schützt **nicht** die Verfügbarkeit. Ordne immer genau zu.`,
        },
        {
          type: 'explain',
          title: 'Zwei Grundprinzipien der Netzwerksicherheit',
          body: `**1. Defense in Depth (gestaffelte Verteidigung)**
Es gibt keine einzelne Maßnahme, die alles abwehrt. Deshalb baut man mehrere Schichten: Firewall am Internetzugang, Segmentierung intern, aktuelle Software (Patches), Virenschutz, MFA, Backups, Schulung der Mitarbeiter. Fällt eine Schicht, hält die nächste.

**2. Least Privilege (minimale Rechte)** und **Default deny**
Jeder Benutzer, jedes Gerät und jede Firewall-Regel bekommt **nur das, was wirklich nötig ist**. Was nicht ausdrücklich erlaubt ist, ist verboten.

Und ein dritter Gedanke, der sich durchsetzt: **Zero Trust** – „Vertraue nichts und niemandem automatisch, nur weil es im internen Netz ist.“ Jeder Zugriff wird geprüft (Identität, Gerätezustand), auch intern. (*Vertiefung*)

Im Rest des Moduls siehst du, wie diese Prinzipien technisch umgesetzt werden: Firewalls und Segmente (Schichten), Verschlüsselung (Vertraulichkeit), Hashes und Signaturen (Integrität, Authentizität), MFA und 802.1X (Authentizität), Backups und DDoS-Schutz (Verfügbarkeit).`,
        },
        {
          type: 'visual',
          title: 'Schutzziele auf einen Blick',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Vertraulichkeit', text: 'Nur Berechtigte lesen. Mittel: Verschlüsselung, Zugriffsrechte.', icon: 'Lock' },
                { title: 'Integrität', text: 'Daten unverändert bzw. Änderung erkennbar. Mittel: Hash, Signatur.', icon: 'FileCheck' },
                { title: 'Verfügbarkeit', text: 'Nutzbar, wenn gebraucht. Mittel: Backup, Redundanz, USV, DDoS-Schutz.', icon: 'Activity' },
                { title: 'Authentizität', text: 'Echtheit von Partner/Daten. Mittel: MFA, Zertifikate, Signatur.', icon: 'BadgeCheck' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Vorfälle den Schutzzielen zuordnen',
          problem: `Ordne jedem Vorfall bei der Elektro Krämer GmbH das **hauptsächlich verletzte** Schutzziel zu:
1. Ein Praktikant liest im offenen Gäste-WLAN unverschlüsselte Login-Daten eines Kollegen mit.
2. Ein Angreifer verändert auf dem Webserver die Bankverbindung im Impressum.
3. Der Webshop ist wegen einer DDoS-Attacke vier Stunden nicht erreichbar.
4. Eine Phishing-Mail gibt sich als Geschäftsführer aus und fordert eine Überweisung.`,
          steps: [
            { label: 'Fall 1', body: 'Unberechtigte lesen Daten mit → **Vertraulichkeit**.' },
            { label: 'Fall 2', body: 'Daten wurden unbemerkt verändert → **Integrität**.' },
            { label: 'Fall 3', body: 'Dienst nicht nutzbar → **Verfügbarkeit**.' },
            { label: 'Fall 4', body: 'Die Mail täuscht einen falschen Absender vor → **Authentizität**.' },
          ],
          result: '1 Vertraulichkeit · 2 Integrität · 3 Verfügbarkeit · 4 Authentizität.',
        },
        {
          type: 'check',
          question: {
            id: 'm14-l01-c1',
            kind: 'single',
            skill: 'sec.goals',
            difficulty: 1,
            prompt: 'Die Elektro Krämer GmbH richtet für den Internetzugang eine **zweite Leitung** eines anderen Providers ein. Welches Schutzziel wird damit vor allem gestärkt?',
            options: ['Verfügbarkeit', 'Vertraulichkeit', 'Integrität', 'Verbindlichkeit'],
            answer: 0,
            distractors: {
              '1': { why: 'Eine zweite Leitung verschlüsselt nichts.', error: 'schutzziel-verwechselt' },
              '2': { why: 'Sie verhindert keine Manipulation von Daten.', error: 'schutzziel-verwechselt' },
              '3': { why: 'Verbindlichkeit betrifft die Nachweisbarkeit von Handlungen.', error: 'schutzziel-verwechselt' },
            },
            explanation: 'Redundanz sorgt dafür, dass der Internetzugang auch bei Ausfall einer Leitung weiter funktioniert – das ist Verfügbarkeit.',
          },
        },
        {
          type: 'practice',
          title: 'Übung: Schutzziele',
          questionIds: ['m14-q001', 'm14-q002', 'm14-q003', 'm14-q043'],
          count: 4,
          difficulty: 1,
        },
        {
          type: 'summary',
          points: [
            'CIA: Vertraulichkeit (nur Berechtigte lesen), Integrität (unverändert/Änderung erkennbar), Verfügbarkeit (nutzbar, wenn gebraucht).',
            'Erweitert: Authentizität (Echtheit) und Verbindlichkeit (Nichtabstreitbarkeit).',
            'Verschlüsselung → Vertraulichkeit; Hash → Integrität; Signatur → Integrität + Authentizität + Verbindlichkeit; Backup/Redundanz → Verfügbarkeit.',
            'Prinzipien: Defense in Depth, Least Privilege, Default deny.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'm14-l02',
      title: 'Firewalls: Arten, Regelwerk und Reihenfolge',
      minutes: 30,
      relevance: 'ap1',
      skills: ['sec.firewall'],
      steps: [
        {
          type: 'explain',
          title: 'Drei Generationen von Firewalls',
          body: `Eine Firewall kontrolliert den Verkehr **zwischen Netzbereichen** (z. B. Internet ↔ LAN) oder auf einem einzelnen Rechner (**Personal-/Host-Firewall**, z. B. Windows Defender Firewall).

| Art | Prüft | Arbeitet auf | Stärken | Schwächen |
|---|---|---|---|---|
| **Paketfilter (stateless)** | jedes Paket **einzeln**: Quell-/Ziel-IP, Protokoll, Quell-/Zielport, Richtung | Schicht 3/4 | sehr schnell, einfach (z. B. ACLs auf Routern) | kennt keine Verbindungen; für Antworten braucht es eigene, oft zu weite Regeln |
| **Stateful Inspection** | zusätzlich den **Verbindungszustand** (Zustandstabelle) | Schicht 3/4 | Antworten auf erlaubte Verbindungen automatisch erlaubt, gefälschte „Antworten“ werden verworfen | sieht nicht, **was** in der Verbindung passiert |
| **Application Layer Gateway / Proxy-Firewall** | den **Inhalt** eines bestimmten Protokolls (z. B. HTTP) | Schicht 7 | versteht das Protokoll, kann z. B. Befehle oder Dateitypen filtern | langsamer, je Protokoll eigener Proxy |
| **Next-Generation Firewall (NGFW)** | Anwendungen unabhängig vom Port erkennen, Benutzerbezug, IPS, Malware-Scan, ggf. TLS-Inspection | Schicht 3–7 | sehr feine Regeln („Teams ja, private Cloudspeicher nein“) | teuer, komplex, TLS-Inspection datenschutzrechtlich sensibel |

**Warum Stateful so wichtig ist – ein Beispiel:** Ein PC öffnet eine HTTPS-Verbindung zu einem Webserver: Quelle \`192.168.10.57:52230\` → Ziel \`198.51.100.80:443\`. Ein **stateless** Paketfilter braucht für die Antwort eine Regel „von Port 443 an alle hohen Ports im LAN erlauben“ – ein Angreifer könnte das ausnutzen, indem er Pakete mit Quellport 443 schickt. Die **Stateful** Firewall lässt nur Antworten durch, die zu einem Eintrag in ihrer Zustandstabelle passen.`,
        },
        {
          type: 'explain',
          title: 'Das Regelwerk: First Match und implizites Deny',
          body: `Eine Firewall-Regel besteht typischerweise aus: **Quelle**, **Ziel**, **Dienst/Port (Protokoll)**, **Aktion** (erlauben/verweigern bzw. *allow/accept*, *deny/drop/reject*) und oft **Logging**.

**Drei Grundregeln, die du sicher können musst:**
1. **Abarbeitung von oben nach unten.** Die **erste passende Regel** entscheidet (*First Match*), danach wird nicht weiter geprüft.
2. **Spezielle Regeln vor allgemeinen.** Sonst „verschluckt“ eine allgemeine Regel die spezielle Ausnahme.
3. **Implizites Deny am Ende:** Passt keine Regel, wird das Paket **verworfen**. Viele Admins schreiben die Regel „any → any → deny (log)“ trotzdem sichtbar hin, um Verstöße zu protokollieren.

**Deny oder Drop/Reject?** *Drop* verwirft stillschweigend (der Absender wartet bis zum Timeout), *Reject* schickt eine Ablehnung zurück (z. B. TCP-Reset oder ICMP „unreachable“). Nach außen ist *Drop* üblich – es verrät weniger.

**Typische Fehler in Regelwerken:**
- \`any any allow\` „nur kurz zum Testen“ – und dann vergessen.
- Eine Sperrregel steht **unterhalb** einer allgemeinen Erlaubnisregel und greift nie.
- Ganze Portbereiche freigegeben, obwohl ein Port reicht.
- Keine Dokumentation, wer welche Regel wofür angelegt hat (Regel-Leichen).`,
        },
        {
          type: 'visual',
          title: 'Wie ein Paket durch das Regelwerk läuft',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['Paket', 'Regel 1', 'Regel 2', 'Regel 3', 'Implizites Deny'],
              messages: [
                { from: 0, to: 1, label: 'passt?', note: 'nein → weiter' },
                { from: 0, to: 2, label: 'passt?', note: 'nein → weiter' },
                { from: 0, to: 3, label: 'passt?', note: 'ja → Aktion ausführen, ENDE' },
                { from: 0, to: 4, label: '(nur wenn keine Regel passt)', note: 'verwerfen' },
              ],
            },
          },
          caption: 'Die erste passende Regel entscheidet. Nur wenn keine Regel passt, greift das implizite Deny am Ende.',
        },
        {
          type: 'example',
          title: 'Ein fehlerhaftes Regelwerk reparieren',
          problem: `Regelwerk der Firewall zwischen LAN (\`192.168.10.0/24\`) und Internet:

| Nr. | Quelle | Ziel | Dienst | Aktion |
|---|---|---|---|---|
| 1 | 192.168.10.0/24 | any | TCP 80, 443 | erlauben |
| 2 | 192.168.10.0/24 | any | UDP 53 | erlauben |
| 3 | 192.168.10.99 | any | any | verweigern |
| 4 | any | any | any | verweigern |

Der PC \`192.168.10.99\` ist mit Schadsoftware infiziert und soll **gar nicht** mehr ins Internet. Trotzdem sieht man im Log weiter HTTPS-Verbindungen von ihm. Warum, und wie wird das Regelwerk korrigiert?`,
          steps: [
            { label: 'Paket prüfen', body: 'HTTPS von 192.168.10.99 → Regel 1: Quelle 192.168.10.0/24 enthält .99, Dienst TCP 443 passt → **erlauben**. Regel 3 wird nie erreicht.' },
            { label: 'Fehler benennen', body: 'Die **spezielle** Sperrregel steht **unter** der allgemeinen Erlaubnisregel (First Match).' },
            { label: 'Korrektur', body: 'Regel 3 an die **erste Position** verschieben: 1) 192.168.10.99 → any → any → verweigern (Log), 2) LAN → any TCP 80/443 erlauben, 3) LAN → any UDP 53 erlauben, 4) any → any verweigern.' },
            { label: 'Zusätzliche Verbesserung', body: 'DNS nur vom internen DNS-Server ins Internet erlauben (Quelle 192.168.10.5 statt ganzes LAN, UDP **und** TCP 53) – so können Clients DNS nicht an der Firmen-DNS-Infrastruktur vorbei nutzen.' },
          ],
          result: 'Sperrregel für 192.168.10.99 muss vor die allgemeine Erlaubnisregel. Spezielle Regeln immer nach oben.',
        },
        {
          type: 'check',
          question: {
            id: 'm14-l02-c1',
            kind: 'single',
            skill: 'sec.firewall',
            difficulty: 1,
            prompt: 'Was bedeutet „**implizites Deny**“ in einem Firewall-Regelwerk?',
            options: [
              'Verkehr, auf den keine Regel passt, wird verworfen',
              'Alle Regeln verweigern automatisch, wenn die Firewall neu startet',
              'Verweigerte Pakete werden immer mit einer Fehlermeldung beantwortet',
              'Jede Regel muss einmal bestätigt werden',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'Das hat mit Neustarts nichts zu tun.', error: 'begriff-missverstanden' },
              '2': { why: 'Ob geantwortet wird (Reject) oder nicht (Drop), ist eine separate Einstellung.', error: 'drop-reject' },
              '3': { why: 'Das ist kein Firewall-Konzept.', error: 'begriff-missverstanden' },
            },
            explanation: 'Am Ende jedes Regelwerks steht (unsichtbar) „alles andere verweigern“. Nur ausdrücklich Erlaubtes kommt durch – Default deny.',
          },
        },
        {
          type: 'practice',
          title: 'Übung: Firewalls',
          questionIds: ['m14-q004', 'm14-q005', 'm14-q006', 'm14-q007', 'm14-q038'],
          count: 4,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Paketfilter: einzelne Pakete nach IP/Port (Schicht 3/4), ohne Zustand.',
            'Stateful Inspection: Zustandstabelle, Antworten automatisch erlaubt – heute Standard.',
            'Application Layer Gateway / NGFW: prüft Inhalte und Anwendungen bis Schicht 7, oft mit IPS.',
            'Regeln von oben nach unten, erste passende Regel gilt; spezielle Regeln vor allgemeine; implizites Deny am Ende.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'm14-l03',
      title: 'Segmentierung, DMZ und Sicherheit am Switch',
      minutes: 30,
      relevance: 'ap1',
      skills: ['sec.segment', 'sec.auth'],
      steps: [
        {
          type: 'explain',
          title: 'Warum man Netze aufteilt',
          body: `Ein „flaches“ Netz, in dem alle Geräte im selben Segment hängen, ist bequem – aber gefährlich: Ein infizierter Gäste-Laptop könnte direkt den Buchhaltungsserver angreifen, Ransomware kann sich ungehindert ausbreiten.

**Segmentierung** heißt: Das Netz wird in **Zonen** aufgeteilt (meist per **VLAN** + eigenes IP-Subnetz). Der Verkehr **zwischen** den Zonen läuft über eine **Firewall** (oder einen Layer-3-Switch mit ACLs), die nur das Nötige erlaubt.

Typische Zonen bei der Elektro Krämer GmbH:

| VLAN | Zone | Netz | Darf … |
|---|---|---|---|
| 10 | Clients (Büro) | 192.168.10.0/24 | auf Server, Drucker, Internet (Proxy) |
| 20 | Server | 192.168.11.0/24 | nur angefragte Dienste beantworten |
| 30 | Produktion/Lager | 192.168.30.0/24 | nur Warenwirtschaftsserver |
| 50 | VoIP | 192.168.50.0/24 | Telefonanlage, mit QoS |
| 90 | **Gäste-WLAN** | 10.90.0.0/22 | **nur Internet**, nichts Internes |
| 99 | Management | 192.168.99.0/24 | Verwaltung von Switches/APs – nur Admins |
| – | **DMZ** | 172.16.1.0/24 | aus dem Internet erreichbar, aber **nicht ins LAN** |

**DMZ** (*Demilitarisierte Zone*): Server, die aus dem Internet erreichbar sein müssen (Webshop, Mail-Relay, Reverse-Proxy), stehen in einer eigenen Zone. Wird so ein Server gehackt, sitzt der Angreifer in der DMZ fest. Zwei Bauformen:
- **Ein-Firewall-Lösung** („Three-Legged“): eine Firewall mit drei Schnittstellen (Internet, DMZ, LAN).
- **Zwei-Firewall-Lösung**: äußere Firewall zwischen Internet und DMZ, innere zwischen DMZ und LAN – idealerweise von **zwei verschiedenen Herstellern**, damit eine Sicherheitslücke nicht beide betrifft.`,
        },
        {
          type: 'visual',
          title: 'Zwei-Firewall-DMZ und segmentiertes LAN',
          widget: {
            kind: 'topology',
            data: {
              nodes: [
                { id: 'inet', type: 'internet', label: 'Internet', x: 70, y: 210 },
                { id: 'fw1', type: 'firewall', label: 'FW außen', x: 200, y: 210 },
                { id: 'web', type: 'server', label: 'Webshop', sub: '172.16.1.10', x: 330, y: 80 },
                { id: 'sw-dmz', type: 'switch', label: 'DMZ-Switch', x: 330, y: 210 },
                { id: 'fw2', type: 'firewall', label: 'FW innen', x: 460, y: 210 },
                { id: 'core', type: 'switch', label: 'Core-Switch', x: 600, y: 210 },
                { id: 'srv', type: 'server', label: 'Server', sub: 'VLAN 20', x: 730, y: 80 },
                { id: 'pc', type: 'pc', label: 'Clients', sub: 'VLAN 10', x: 730, y: 210 },
                { id: 'ap', type: 'ap', label: 'Gäste-AP', sub: 'VLAN 90', x: 730, y: 340 },
              ],
              links: [
                { from: 'inet', to: 'fw1', style: 'wan' },
                { from: 'fw1', to: 'sw-dmz' },
                { from: 'sw-dmz', to: 'web' },
                { from: 'sw-dmz', to: 'fw2' },
                { from: 'fw2', to: 'core', style: 'trunk' },
                { from: 'core', to: 'srv' },
                { from: 'core', to: 'pc' },
                { from: 'core', to: 'ap', label: 'Trunk', style: 'trunk' },
              ],
              zones: [
                { label: 'Internet', x: 20, y: 150, w: 110, h: 120, color: 'red' },
                { label: 'DMZ', x: 270, y: 30, w: 130, h: 250, color: 'orange' },
                { label: 'internes LAN (VLANs)', x: 540, y: 30, w: 250, h: 370, color: 'blue' },
              ],
            },
          },
          caption: 'Die äußere Firewall lässt nur HTTPS zum Webshop durch, die innere Firewall verhindert Zugriffe aus der DMZ ins LAN. Intern trennen VLANs Clients, Server und Gäste.',
        },
        {
          type: 'explain',
          title: 'Switch- und VLAN-Sicherheit',
          body: `Auch der Switch ist eine Sicherheitskomponente. Die wichtigsten Maßnahmen:

**Ungenutzte Ports deaktivieren.** Jede freie Netzwerkdose im Besprechungsraum ist sonst ein offener Zugang ins Firmennetz. Ungenutzte Ports werden **abgeschaltet** und zusätzlich einem leeren „Parkplatz“-VLAN zugewiesen.

**Port Security (MAC-basiert).** Der Switch erlaubt an einem Port nur bestimmte oder eine begrenzte Anzahl von MAC-Adressen (z. B. maximal 1). Steckt jemand ein fremdes Gerät oder einen eigenen Switch an, wird der Port – je nach Einstellung – **gesperrt** (bei Cisco *shutdown*/err-disabled) oder der fremde Verkehr verworfen und gemeldet. Schwäche: MAC-Adressen lassen sich fälschen.

**IEEE 802.1X (portbasierte Zugangskontrolle).** Deutlich stärker: Ein Gerät darf erst ins Netz, nachdem es sich **authentifiziert** hat (Benutzer/Passwort oder besser **Zertifikat**). Drei Rollen:

| Rolle | Wer? | Aufgabe |
|---|---|---|
| **Supplicant** | Client (PC, Laptop, Telefon) | weist sich aus |
| **Authenticator** | **Switch** bzw. **Access Point** | blockiert den Port, bis die Prüfung erfolgreich ist, und reicht die Anmeldedaten (EAP) weiter |
| **Authentication Server** | **RADIUS**-Server (z. B. Windows NPS) | prüft die Anmeldedaten und kann dem Port ein VLAN zuweisen |

Bis zur erfolgreichen Anmeldung lässt der Port **nur** 802.1X-Verkehr (EAPOL) durch. Unbekannte Geräte können z. B. automatisch ins Gäste-VLAN gesteckt werden.

**VLAN-Hopping verhindern** (*grob*): Angreifer versuchen, aus ihrem VLAN in ein fremdes zu „springen“:
- *Switch Spoofing*: Der Angreifer gibt sich als Switch aus und handelt automatisch einen **Trunk** aus (z. B. über Ciscos DTP). → **Gegenmaßnahme:** Endgeräte-Ports fest als **Access-Port** konfigurieren, automatische Trunk-Aushandlung abschalten.
- *Double Tagging*: Ein Paket mit zwei VLAN-Tags nutzt das **Native VLAN** eines Trunks aus. → **Gegenmaßnahme:** Native VLAN auf ein **ungenutztes** VLAN setzen, **VLAN 1 nicht** für Nutzerdaten verwenden.

**Gäste-VLAN:** Gäste bekommen ein eigenes VLAN/SSID, das per Firewall **nur ins Internet** darf – mit **Client Isolation** am Access Point (Gäste sehen sich untereinander nicht).`,
        },
        {
          type: 'example',
          title: 'Besprechungsraum absichern',
          problem: `Im Besprechungsraum der Hamburger Zentrale gibt es 8 Netzwerkdosen. Dort sitzen mal Mitarbeiter mit Firmenlaptops, mal externe Berater. Bisher sind alle Ports im Client-VLAN 10. Was schlägst du vor?`,
          steps: [
            { label: 'Ist-Zustand bewerten', body: 'Jeder Externe, der ein Kabel einsteckt, landet direkt im Client-Netz – mit Zugriff auf Server und Drucker. Risiko für Vertraulichkeit und Integrität.' },
            { label: '802.1X einführen', body: 'Ports als Authenticator konfigurieren, RADIUS-Server (NPS) anbinden. **Firmenlaptops** authentifizieren sich per **Maschinenzertifikat** (EAP-TLS) → VLAN 10.' },
            { label: 'Fallback für Fremde', body: 'Geräte ohne gültige Anmeldung werden dynamisch ins **Gäste-VLAN 90** gesteckt (nur Internet).' },
            { label: 'Ergänzend', body: 'Selten genutzte Dosen deaktivieren, Trunk-Aushandlung abschalten, Logging der Anmeldungen. Alternativ, falls kein 802.1X möglich: alle Dosen ins Gäste-VLAN, Mitarbeiter nutzen VPN oder WLAN mit WPA2/3-Enterprise.' },
          ],
          result: '802.1X mit Zertifikaten für Firmengeräte, automatischer Fallback ins Gäste-VLAN, ungenutzte Ports aus.',
        },
        {
          type: 'check',
          question: {
            id: 'm14-l03-c1',
            kind: 'single',
            skill: 'sec.segment',
            difficulty: 2,
            prompt: 'Warum wird der Webshop-Server in einer **DMZ** betrieben statt im internen LAN?',
            options: [
              'Damit ein Angreifer bei einer Kompromittierung des Servers nicht direkt ins interne LAN gelangt',
              'Weil Server in einer DMZ keine Updates benötigen',
              'Weil Webserver nur in einer DMZ öffentliche IP-Adressen erhalten können',
              'Damit der Server schneller antwortet',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'Auch DMZ-Server müssen dringend gepatcht werden – sie sind besonders exponiert.', error: 'dmz-missverstanden' },
              '2': { why: 'Mit DNAT kann man auch interne Server veröffentlichen – das ist aber gerade unsicher.', error: 'dmz-missverstanden' },
              '3': { why: 'Die DMZ dient der Sicherheit, nicht der Geschwindigkeit.', error: 'dmz-missverstanden' },
            },
            explanation: 'Die DMZ ist eine Pufferzone: Öffentlich erreichbare Dienste sind vom LAN getrennt, die Firewall verhindert Verbindungen von der DMZ ins LAN.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'm14-l03-c2',
            kind: 'match',
            skill: 'sec.auth',
            difficulty: 2,
            prompt: 'Ordne die 802.1X-Rollen den Geräten zu.',
            left: ['Supplicant', 'Authenticator', 'Authentication Server'],
            right: ['RADIUS-Server', 'Client (z. B. Laptop)', 'Switch bzw. Access Point'],
            answer: [1, 2, 0],
            explanation: 'Der Client (Supplicant) meldet sich an, der Switch/AP (Authenticator) reicht die Daten weiter und öffnet den Port, der RADIUS-Server (Authentication Server) prüft.',
          },
        },
        {
          type: 'practice',
          title: 'Übung: Segmentierung und Switch-Sicherheit',
          questionIds: ['m14-q008', 'm14-q009', 'm14-q010', 'm14-q011', 'm14-q012', 'm14-q044'],
          count: 5,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Segmentierung (VLAN + Subnetz + Firewall dazwischen) begrenzt die Ausbreitung von Angriffen.',
            'DMZ: öffentlich erreichbare Server in eigener Zone; DMZ → LAN gesperrt. Ein- oder Zwei-Firewall-Lösung.',
            'Ungenutzte Ports abschalten, Port Security (MAC-Begrenzung), besser 802.1X (Supplicant – Authenticator – RADIUS).',
            'VLAN-Hopping: Access-Ports fest konfigurieren, keine automatische Trunk-Aushandlung, Native VLAN ungenutzt, VLAN 1 meiden.',
            'Gäste-VLAN: nur Internet, Client Isolation.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'm14-l04',
      title: 'Kryptografie: Symmetrisch, asymmetrisch, hybrid – und Hashwerte',
      minutes: 35,
      relevance: 'ap1',
      skills: ['sec.crypto', 'sec.hash'],
      steps: [
        {
          type: 'explain',
          title: 'Symmetrische Verschlüsselung: Ein Schlüssel für beide',
          body: `Bei der **symmetrischen** Verschlüsselung benutzen Sender und Empfänger **denselben geheimen Schlüssel** zum Ver- und Entschlüsseln – wie ein Tresor, für den beide den gleichen Schlüssel haben.

- **Standardverfahren heute: AES** (*Advanced Encryption Standard*), ein Blockverfahren mit 128-Bit-Blöcken und Schlüssellängen von **128, 192 oder 256 Bit**. Weitere: ChaCha20 (modern, z. B. in WireGuard und TLS). Veraltet/unsicher: DES, 3DES, RC4.
- **Vorteil:** sehr **schnell** – geeignet für große Datenmengen (Festplattenverschlüsselung mit BitLocker, VPN-Datenverkehr, TLS-Nutzdaten).
- **Nachteil – das Schlüsselverteilungsproblem:** Wie bekommt der Empfänger den Schlüssel **sicher**? Per Mail? Dann kann ihn jeder mitlesen.
- **Nachteil – Schlüsselanzahl:** Jedes Paar von Teilnehmern braucht einen eigenen Schlüssel. Bei **n** Teilnehmern sind das **n · (n − 1) / 2** Schlüssel. 10 Teilnehmer → 45 Schlüssel, 100 Teilnehmer → 4.950 Schlüssel.`,
        },
        {
          type: 'explain',
          title: 'Asymmetrische Verschlüsselung: Öffentlicher und privater Schlüssel',
          body: `Bei der **asymmetrischen** Verschlüsselung hat jeder Teilnehmer ein **Schlüsselpaar**:
- einen **öffentlichen Schlüssel** (*Public Key*) – darf jeder kennen, wird verteilt, steht z. B. im Zertifikat,
- einen **privaten Schlüssel** (*Private Key*) – bleibt **geheim** beim Besitzer.

Was mit dem einen Schlüssel bearbeitet wurde, kann nur mit dem **anderen** Schlüssel des Paares rückgängig gemacht bzw. geprüft werden. Daraus ergeben sich zwei Anwendungen:

| Ziel | Wer nutzt welchen Schlüssel? |
|---|---|
| **Verschlüsseln** (Vertraulichkeit) | Absender verschlüsselt mit dem **öffentlichen Schlüssel des Empfängers** → nur der Empfänger kann mit seinem **privaten** Schlüssel entschlüsseln. |
| **Signieren** (Integrität, Authentizität) | Absender signiert mit **seinem eigenen privaten Schlüssel** → jeder kann mit dem **öffentlichen Schlüssel des Absenders** prüfen. |

**Analogie Briefkasten:** Der Briefkastenschlitz (öffentlicher Schlüssel) ist für alle zugänglich – jeder kann etwas einwerfen. Nur der Besitzer hat den Schlüssel (privater Schlüssel) zum Öffnen.

- **Verfahren:** **RSA** (heute mindestens 2048 Bit, das BSI empfiehlt für neue Systeme 3000 Bit und mehr), **ECC** (elliptische Kurven, z. B. ECDSA, ECDH – gleiche Sicherheit mit deutlich kürzeren Schlüsseln), **Diffie-Hellman** (Schlüsselaustausch).
- **Vorteil:** **Kein** geheimer Schlüssel muss vorher ausgetauscht werden. Bei **n** Teilnehmern braucht man nur **n Schlüsselpaare** (= 2n Schlüssel).
- **Nachteil:** **sehr langsam** (um Größenordnungen langsamer als AES) – ungeeignet für große Datenmengen.`,
        },
        {
          type: 'explain',
          title: 'Hybride Verschlüsselung: Das Beste aus beiden Welten',
          body: `In der Praxis kombiniert man beide Verfahren – **hybride Verschlüsselung** (so arbeiten TLS/HTTPS, VPNs, verschlüsselte E-Mails mit S/MIME oder PGP):

1. Für die Sitzung wird ein zufälliger **symmetrischer Sitzungsschlüssel** (*Session Key*) erzeugt.
2. Dieser Sitzungsschlüssel wird **asymmetrisch** geschützt übertragen – klassisch mit dem öffentlichen Schlüssel des Empfängers verschlüsselt – oder beide Seiten **berechnen** ihn gemeinsam per **Diffie-Hellman**-Schlüsselaustausch.
3. Die eigentlichen **Daten** werden **symmetrisch** (z. B. AES) mit dem Sitzungsschlüssel verschlüsselt – schnell.

So löst die asymmetrische Technik das **Schlüsselverteilungsproblem**, und die symmetrische Technik sorgt für **Geschwindigkeit**.

| | Symmetrisch | Asymmetrisch | Hybrid |
|---|---|---|---|
| Schlüssel | 1 gemeinsamer geheimer | Schlüsselpaar (öffentlich/privat) | beides |
| Geschwindigkeit | schnell | langsam | schnell (Daten symmetrisch) |
| Schlüsselverteilung | problematisch | einfach | einfach |
| Beispiele | AES, ChaCha20 | RSA, ECC, Diffie-Hellman | TLS, IPsec, S/MIME |`,
        },
        {
          type: 'explain',
          title: 'Hashwerte und digitale Signatur',
          body: `Eine **Hashfunktion** berechnet aus beliebig vielen Daten einen **Fingerabdruck fester Länge** (z. B. SHA-256 → 256 Bit = 64 Hex-Zeichen).

**Eigenschaften einer kryptografischen Hashfunktion:**
- **Einwegfunktion:** Aus dem Hash kann man die Daten **nicht** zurückrechnen. **Hashing ist keine Verschlüsselung!**
- **Feste Länge**, egal ob die Eingabe 1 Byte oder 10 GB groß ist.
- **Lawineneffekt:** Ändert sich ein einziges Bit, ändert sich der Hash komplett.
- **Kollisionsresistenz:** Es ist praktisch unmöglich, zwei verschiedene Eingaben mit gleichem Hash zu finden.

Verfahren: **SHA-256, SHA-384, SHA-512 (SHA-2), SHA-3**. **MD5** und **SHA-1** gelten als gebrochen (Kollisionen gefunden) und dürfen für Sicherheitszwecke nicht mehr genutzt werden.

**Einsatz:** Integritätsprüfung von Downloads (Hash vergleichen), Speicherung von Passwörtern (gesalzene, absichtlich langsame Hashes wie bcrypt oder Argon2), Grundlage digitaler Signaturen.

**Digitale Signatur – Ablauf:**
1. Der Absender (z. B. die Geschäftsführerin) berechnet den **Hash** des Dokuments.
2. Er **signiert den Hash mit seinem privaten Schlüssel** → Signatur.
3. Dokument + Signatur werden verschickt.
4. Der Empfänger berechnet selbst den Hash des empfangenen Dokuments und prüft die Signatur mit dem **öffentlichen Schlüssel des Absenders**.
5. Stimmen beide Hashes überein → Dokument ist **unverändert (Integrität)** und stammt **vom Inhaber des privaten Schlüssels (Authentizität, Verbindlichkeit)**.

**Wichtig:** Eine Signatur **verschlüsselt das Dokument nicht** – jeder kann es lesen. Für Vertraulichkeit muss zusätzlich verschlüsselt werden.`,
        },
        {
          type: 'visual',
          title: 'Hybride Verschlüsselung Schritt für Schritt',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['Anna (Sender)', 'Bob (Empfänger)'],
              messages: [
                { from: 1, to: 0, label: 'Öffentlicher Schlüssel von Bob', note: 'darf jeder kennen' },
                { from: 0, to: 1, label: 'Sitzungsschlüssel, verschlüsselt mit Bobs Public Key', note: 'Anna hat zuvor einen zufälligen AES-Schlüssel erzeugt; nur Bob kann ihn mit seinem privaten Schlüssel auspacken' },
                { from: 0, to: 1, label: 'Daten, verschlüsselt mit AES', note: 'beide kennen jetzt den Sitzungsschlüssel – schnell, beliebig große Datenmengen' },
                { from: 1, to: 0, label: 'Antwort, verschlüsselt mit AES', note: 'derselbe Sitzungsschlüssel in beide Richtungen' },
              ],
            },
          },
          caption: 'Asymmetrisch wird nur der kleine Sitzungsschlüssel geschützt, die großen Datenmengen laufen symmetrisch. (Moderne Verfahren wie TLS 1.3 berechnen den Sitzungsschlüssel stattdessen per Diffie-Hellman.)',
        },
        {
          type: 'example',
          title: 'Wie viele Schlüssel braucht die Buchhaltung?',
          problem: `Die 6 Mitarbeiter der Buchhaltung sollen sich gegenseitig vertrauliche Dateien schicken können, und zwar jeder mit jedem, ohne dass ein Dritter (auch kein Kollege) mitlesen kann.

a) Wie viele Schlüssel sind bei rein **symmetrischer** Verschlüsselung nötig?
b) Wie viele bei **asymmetrischer**?
c) Wie ändert sich das, wenn die Abteilung auf 20 Personen wächst?`,
          steps: [
            { label: 'a) symmetrisch, n = 6', body: 'Jedes Paar braucht einen eigenen Schlüssel: n·(n−1)/2 = 6·5/2 = **15 Schlüssel**.' },
            { label: 'b) asymmetrisch, n = 6', body: 'Jeder hat ein Schlüsselpaar: **6 Schlüsselpaare = 12 Schlüssel** (6 öffentliche, 6 private).' },
            { label: 'c) n = 20', body: 'Symmetrisch: 20·19/2 = **190 Schlüssel**. Asymmetrisch: **20 Paare = 40 Schlüssel**. Die symmetrische Anzahl wächst quadratisch, die asymmetrische linear.' },
          ],
          result: '6 Personen: 15 (symmetrisch) vs. 12 Schlüssel (6 Paare). 20 Personen: 190 vs. 40 Schlüssel (20 Paare).',
        },
        {
          type: 'check',
          question: {
            id: 'm14-l04-c1',
            kind: 'single',
            skill: 'sec.crypto',
            difficulty: 1,
            prompt: 'Anna möchte Bob eine vertrauliche Datei asymmetrisch verschlüsselt schicken. Mit welchem Schlüssel verschlüsselt Anna?',
            options: ['Mit Bobs öffentlichem Schlüssel', 'Mit Bobs privatem Schlüssel', 'Mit Annas privatem Schlüssel', 'Mit Annas öffentlichem Schlüssel'],
            answer: 0,
            distractors: {
              '1': { why: 'Bobs privaten Schlüssel kennt nur Bob – Anna hat ihn nicht (und darf ihn nie haben).', error: 'schluessel-verwechselt' },
              '2': { why: 'Mit dem eigenen privaten Schlüssel wird signiert, nicht für einen Empfänger verschlüsselt – jeder könnte mit Annas öffentlichem Schlüssel „entschlüsseln“.', error: 'signieren-verschluesseln-verwechselt' },
              '3': { why: 'Dann könnte nur Anna selbst die Datei wieder entschlüsseln.', error: 'schluessel-verwechselt' },
            },
            explanation: 'Verschlüsseln immer mit dem öffentlichen Schlüssel des Empfängers – nur dessen privater Schlüssel kann entschlüsseln.',
            hints: ['Wer soll später entschlüsseln können?'],
          },
        },
        {
          type: 'check',
          question: {
            id: 'm14-l04-c2',
            kind: 'single',
            skill: 'sec.hash',
            difficulty: 2,
            prompt: 'Welches Schutzziel stellt eine **digitale Signatur** allein **nicht** sicher?',
            options: ['Vertraulichkeit', 'Integrität', 'Authentizität', 'Verbindlichkeit'],
            answer: 0,
            distractors: {
              '1': { why: 'Integrität wird durch den Hashvergleich gewährleistet.', error: 'signatur-missverstanden' },
              '2': { why: 'Die Prüfung mit dem öffentlichen Schlüssel belegt den Absender.', error: 'signatur-missverstanden' },
              '3': { why: 'Nur der Inhaber des privaten Schlüssels konnte signieren – das schafft Verbindlichkeit.', error: 'signatur-missverstanden' },
            },
            explanation: 'Eine Signatur verschlüsselt den Inhalt nicht. Jeder kann das Dokument lesen; für Vertraulichkeit muss zusätzlich verschlüsselt werden.',
          },
        },
        {
          type: 'practice',
          title: 'Übung: Kryptografie',
          questionIds: ['m14-q013', 'm14-q014', 'm14-q015', 'm14-q016', 'm14-q017', 'm14-q018', 'm14-q019', 'm14-q041'],
          count: 6,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Symmetrisch: ein gemeinsamer geheimer Schlüssel (AES), schnell, aber Schlüsselverteilung schwierig; n·(n−1)/2 Schlüssel.',
            'Asymmetrisch: Schlüsselpaar (RSA, ECC), langsam, kein vorheriger Geheimnisaustausch; n Paare.',
            'Verschlüsseln mit dem öffentlichen Schlüssel des Empfängers; signieren mit dem eigenen privaten Schlüssel.',
            'Hybrid: Sitzungsschlüssel asymmetrisch austauschen/aushandeln, Daten symmetrisch verschlüsseln (TLS, VPN).',
            'Hash: Einweg, feste Länge, Lawineneffekt – keine Verschlüsselung. SHA-256 ok, MD5/SHA-1 unsicher.',
            'Signatur = Hash mit privatem Schlüssel signiert → Integrität, Authentizität, Verbindlichkeit (keine Vertraulichkeit).',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'm14-l05',
      title: 'Zertifikate, PKI und TLS – woher weiß der Browser, wem er vertraut?',
      minutes: 30,
      relevance: 'ap1',
      skills: ['sec.pki', 'sec.vpn'],
      steps: [
        {
          type: 'explain',
          title: 'Das Problem: Gehört der öffentliche Schlüssel wirklich zur Bank?',
          body: `Asymmetrische Verfahren haben eine Schwachstelle: Wenn ein Angreifer dir **seinen** öffentlichen Schlüssel unterschiebt und behauptet, es sei der von \`www.elektro-kraemer.de\`, verschlüsselst du brav für den Angreifer (Man-in-the-Middle).

Die Lösung ist ein **digitales Zertifikat** (Standard **X.509**). Es ist wie ein Personalausweis für einen öffentlichen Schlüssel und enthält u. a.:
- den **Inhaber** (Subject) bzw. die **Domainnamen** (Subject Alternative Names), z. B. \`www.elektro-kraemer.de\`,
- den **öffentlichen Schlüssel** des Inhabers (**nicht** den privaten!),
- den **Aussteller** (Issuer), also die **Zertifizierungsstelle (CA)**,
- die **Gültigkeitsdauer** (gültig von … bis …),
- eine Seriennummer und den Verwendungszweck,
- die **digitale Signatur der CA** über all diese Daten.

**PKI – Public Key Infrastructure:** Das gesamte System aus Zertifizierungsstellen, Regeln, Sperrlisten und Verzeichnissen. Es ist hierarchisch:

\`\`\`
Root-CA (selbstsigniert, im Zertifikatsspeicher von Windows/Browser hinterlegt)
  └── Intermediate-CA (Zwischenzertifizierungsstelle)
        └── Serverzertifikat www.elektro-kraemer.de
\`\`\`

Dein Betriebssystem/Browser bringt eine Liste **vertrauenswürdiger Root-CAs** mit. Ein Serverzertifikat ist vertrauenswürdig, wenn sich eine **Zertifikatskette** bis zu einer dieser Roots lückenlos prüfen lässt.

**Sperrung:** Wird ein privater Schlüssel gestohlen, muss das Zertifikat vor Ablauf **widerrufen** werden. Prüfung über **Sperrlisten (CRL)** oder online per **OCSP**.

**Firmen-PKI:** Viele Firmen betreiben eine eigene interne CA (z. B. Active Directory Zertifikatdienste) für interne Server, 802.1X-Zertifikate und VPN-Clients. Deren Root-Zertifikat wird per Gruppenrichtlinie auf alle Firmen-PCs verteilt.`,
        },
        {
          type: 'explain',
          title: 'TLS und HTTPS – der Handshake vereinfacht',
          body: `**TLS** (*Transport Layer Security*, Nachfolger von SSL) sichert Verbindungen über TCP ab: HTTPS (**Port 443**), aber auch E-Mail (SMTPS, IMAPS), SSL-VPNs u. v. m. Aktuell sind **TLS 1.2 und TLS 1.3**; SSL 2.0/3.0, TLS 1.0 und 1.1 gelten als unsicher.

**Der Handshake vereinfacht:**
1. **ClientHello:** Der Browser nennt unterstützte TLS-Versionen und Verschlüsselungsverfahren (*Cipher Suites*) und eine Zufallszahl.
2. **ServerHello + Zertifikat:** Der Server wählt Version und Verfahren und schickt sein **Zertifikat** (mit öffentlichem Schlüssel).
3. **Zertifikatsprüfung durch den Client:**
   - Ist die **Signatur der CA** gültig und führt die **Kette** zu einer vertrauenswürdigen Root-CA?
   - Ist das Zertifikat **zeitlich gültig**?
   - Passt der **Domainname** zur aufgerufenen Adresse?
   - Ist es **nicht widerrufen** (CRL/OCSP)?
   Scheitert etwas → Browser-Warnung („Die Verbindung ist nicht sicher“).
4. **Schlüsselaustausch:** Beide Seiten einigen sich auf einen gemeinsamen **symmetrischen Sitzungsschlüssel**. Heute per **(EC)Diffie-Hellman** (in TLS 1.3 vorgeschrieben – liefert *Forward Secrecy*). Der Server beweist dabei mit seinem **privaten Schlüssel**, dass ihm das Zertifikat wirklich gehört. (Klassisch in älteren Versionen: Der Client verschlüsselt ein Geheimnis mit dem öffentlichen Schlüssel des Servers.)
5. **Finished:** Beide bestätigen, dass der Handshake unverändert ankam.
6. **Datenübertragung:** Alles Weitere läuft **symmetrisch verschlüsselt** (z. B. AES-GCM) mit Integritätsschutz.

→ TLS ist ein Paradebeispiel für **hybride Verschlüsselung**: asymmetrisch für Authentisierung und Schlüsselaustausch, symmetrisch für die Daten.`,
        },
        {
          type: 'visual',
          title: 'TLS-Handshake (vereinfacht)',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['Browser', 'Webserver www.elektro-kraemer.de'],
              messages: [
                { from: 0, to: 1, label: 'ClientHello', note: 'TLS-Versionen, Cipher Suites, Zufallswert' },
                { from: 1, to: 0, label: 'ServerHello + Zertifikat', note: 'gewählte Verfahren, öffentlicher Schlüssel, CA-Signatur' },
                { from: 0, to: 1, label: 'Schlüsselaustausch (ECDHE)', note: 'erst nach erfolgreicher Zertifikatsprüfung (Kette, Gültigkeit, Name, Sperrstatus); beide berechnen denselben Sitzungsschlüssel' },
                { from: 1, to: 0, label: 'Finished', note: 'Handshake bestätigt' },
                { from: 0, to: 1, label: 'HTTP-Daten (AES-verschlüsselt)', note: 'symmetrisch, schnell' },
              ],
            },
          },
        },
        {
          type: 'explain',
          title: 'VPN-Sicherheit: Worauf kommt es an?',
          body: `Ein VPN (siehe Modul 11) ist nur so sicher wie seine Konfiguration. Die Sicherheit beruht auf zwei Säulen:

**1. Authentifizierung der Gegenstelle bzw. des Benutzers**
- **Pre-Shared Key (PSK):** gemeinsames Passwort beider Gateways – einfach, aber nur mit langem, zufälligem Schlüssel sicher und schlecht skalierbar.
- **Zertifikate:** jedes Gateway/jeder Client hat ein Zertifikat aus der Firmen-PKI – Standard bei professionellen Lösungen; einzelne Geräte lassen sich gezielt sperren.
- **Benutzeranmeldung mit MFA** beim Remote-Access-VPN (z. B. Passwort + Authenticator-App) – Pflicht, da VPN-Zugänge ein beliebtes Angriffsziel sind.

**2. Verschlüsselung und Integrität**
- Moderne Verfahren: AES-GCM oder ChaCha20, Schlüsselaustausch per (EC)Diffie-Hellman, SHA-2 für Integrität.
- **Veraltet/unsicher:** PPTP, DES/3DES, MD5, SHA-1, IKEv1 im *Aggressive Mode* mit PSK.

**Außerdem:** VPN-Gateway **zeitnah patchen** (VPN-Appliances waren in den letzten Jahren häufig Einfallstor für Ransomware-Gruppen), Zugriffe der VPN-Nutzer per Firewall auf das Nötige beschränken, Anmeldungen protokollieren.`,
        },
        {
          type: 'example',
          title: 'Browser-Warnung beim neuen Intranet-Server',
          problem: `Der Admin hat den neuen Intranet-Server \`intranet.elektro-kraemer.local\` eingerichtet und dafür ein Zertifikat ausgestellt. Beim Aufruf von \`https://intranet\` zeigt der Browser: „Ihre Verbindung ist nicht privat – NET::ERR_CERT_COMMON_NAME_INVALID“. Mit \`https://intranet.elektro-kraemer.local\` erscheint keine Warnung. Erkläre.`,
          steps: [
            { label: 'Fehlermeldung lesen', body: '`COMMON_NAME_INVALID` heißt: Der aufgerufene **Name passt nicht** zu den Namen im Zertifikat.' },
            { label: 'Zertifikat ansehen', body: 'Im Zertifikat steht als Subject Alternative Name nur `intranet.elektro-kraemer.local`. Der Kurzname `intranet` ist nicht enthalten.' },
            { label: 'Bewertung', body: 'Kette und Gültigkeit sind in Ordnung (mit vollem Namen keine Warnung). Nur die **Namensprüfung** schlägt fehl – der Browser kann nicht sicher sein, dass er mit dem richtigen Server spricht.' },
            { label: 'Lösung', body: 'Entweder Nutzer konsequent auf den vollständigen Namen leiten (Link/Lesezeichen, Weiterleitung) oder ein neues Zertifikat mit **beiden** Namen im SAN ausstellen. Niemals Nutzer daran gewöhnen, Warnungen wegzuklicken!' },
          ],
          result: 'Namensprüfung fehlgeschlagen, weil der Kurzname nicht im Zertifikat steht. FQDN verwenden oder SAN ergänzen.',
        },
        {
          type: 'check',
          question: {
            id: 'm14-l05-c1',
            kind: 'multi',
            skill: 'sec.pki',
            difficulty: 2,
            prompt: 'Was prüft ein Browser beim Aufbau einer HTTPS-Verbindung am Serverzertifikat? (Mehrere Antworten)',
            options: [
              'Ob die Zertifikatskette zu einer vertrauenswürdigen Root-CA führt',
              'Ob das Zertifikat zeitlich gültig ist',
              'Ob der aufgerufene Domainname im Zertifikat steht',
              'Ob das Zertifikat widerrufen wurde',
              'Ob der private Schlüssel des Servers im Zertifikat enthalten ist',
            ],
            answer: [0, 1, 2, 3],
            explanation: 'Kette/Signatur, Gültigkeitszeitraum, Name und Sperrstatus werden geprüft. Der private Schlüssel ist nie im Zertifikat – er bleibt geheim auf dem Server.',
          },
        },
        {
          type: 'practice',
          title: 'Übung: Zertifikate, TLS, VPN',
          questionIds: ['m14-q020', 'm14-q021', 'm14-q022', 'm14-q035', 'm14-q039', 'm14-q042'],
          count: 5,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Ein X.509-Zertifikat bindet einen öffentlichen Schlüssel an eine Identität (Domain), signiert von einer CA.',
            'PKI: Root-CA → Intermediate-CA → Serverzertifikat; Vertrauen über Root-CAs im Zertifikatsspeicher; Sperrung per CRL/OCSP.',
            'TLS-Handshake: ClientHello → ServerHello + Zertifikat → Prüfung → Schlüsselaustausch (ECDHE) → Finished → symmetrisch verschlüsselte Daten.',
            'HTTPS = HTTP über TLS, Port 443. TLS 1.2/1.3 nutzen; SSL und TLS 1.0/1.1 sind veraltet.',
            'VPN-Sicherheit: starke Authentifizierung (Zertifikate, MFA), moderne Verfahren (AES-GCM, SHA-2, DH), Gateway patchen.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'm14-l06',
      title: 'Authentifizierung und WLAN-Sicherheit',
      minutes: 30,
      relevance: 'ap1',
      skills: ['sec.auth', 'sec.wlan'],
      steps: [
        {
          type: 'explain',
          title: 'Authentifizierungsfaktoren und MFA',
          body: `**Authentifizierung** heißt: nachweisen, dass man wirklich der ist, der man vorgibt zu sein. (Danach folgt die **Autorisierung**: Was darf ich?) Es gibt drei Kategorien von **Faktoren**:

| Faktor | Prinzip | Beispiele |
|---|---|---|
| **Wissen** | etwas, das ich **weiß** | Passwort, PIN, Sicherheitsfrage |
| **Besitz** | etwas, das ich **habe** | Smartphone mit Authenticator-App, Hardware-Token (FIDO2-Schlüssel), Smartcard |
| **Inhärenz** (Biometrie) | etwas, das ich **bin** | Fingerabdruck, Gesichtserkennung, Iris |

**Multi-Faktor-Authentifizierung (MFA)** bzw. **2FA** kombiniert **mindestens zwei verschiedene Kategorien**. Passwort + PIN ist **keine** MFA (zweimal Wissen)! Passwort + Code aus der Authenticator-App dagegen schon (Wissen + Besitz).

**Warum MFA so wichtig ist:** Die meisten Angriffe beginnen mit gestohlenen Passwörtern (Phishing, Datenlecks, Brute Force). Mit MFA reicht das Passwort allein nicht. Besonders phishing-resistent sind **FIDO2/Passkeys**, weil sie an die echte Domain gebunden sind.

**Zentrale Authentifizierung mit RADIUS:** Damit nicht jeder Switch, Access Point und jedes VPN-Gateway eigene Benutzerlisten braucht, fragen sie einen zentralen **RADIUS-Server** (*Remote Authentication Dial-In User Service*, Ports **UDP 1812** für Authentifizierung und **1813** für Accounting). Der RADIUS-Server prüft z. B. gegen das Active Directory. Eingesetzt bei **802.1X** (LAN und WLAN-Enterprise) und VPN-Anmeldung.`,
        },
        {
          type: 'explain',
          title: 'WLAN-Sicherheitsstandards: von WEP bis WPA3',
          body: `Funk geht durch Wände – jeder in Reichweite kann mithören. Deshalb ist die WLAN-Verschlüsselung Pflicht.

| Standard | Verschlüsselung | Bewertung |
|---|---|---|
| **Offen** (ohne Verschlüsselung) | keine | Jeder kann alles mitlesen. Höchstens mit Captive Portal für Gäste – besser **OWE** (*Enhanced Open*, verschlüsselt auch ohne Passwort). |
| **WEP** | RC4 mit kurzem Initialisierungsvektor | **Gebrochen**, in Minuten knackbar. **Nicht verwenden.** |
| **WPA** (TKIP) | RC4-basiert, Übergangslösung | **veraltet**, nicht mehr verwenden |
| **WPA2** | **AES-CCMP** | lange Standard und noch verbreitet. Personal: Offline-Wörterbuchangriff auf mitgeschnittenen Handshake möglich → langes Passwort nötig. |
| **WPA3** | AES (CCMP/GCMP), **SAE** bei Personal, **PMF** Pflicht | **aktueller Standard** – wo möglich einsetzen |

**Personal vs. Enterprise:**

| | **Personal (PSK / SAE)** | **Enterprise (802.1X)** |
|---|---|---|
| Anmeldung | ein **gemeinsames Passwort** für alle | **individuell** pro Benutzer/Gerät (Benutzerkonto oder Zertifikat) |
| Server nötig? | nein | ja, **RADIUS** |
| Mitarbeiter verlässt die Firma | Passwort auf **allen** Geräten ändern | nur **sein Konto** sperren |
| Einsatz | Heim, Kleinbetrieb, Gäste (mit Rotation) | **Firmen-WLAN** |

**Was bringt SAE (WPA3-Personal)?** WPA2-Personal nutzt einen **PSK** (Pre-Shared Key). Wer den 4-Way-Handshake mitschneidet, kann das Passwort anschließend **offline** mit Wörterbüchern raten – beliebig schnell. **SAE** (*Simultaneous Authentication of Equals*, ein Passwort-basierter Schlüsselaustausch auf Basis von Diffie-Hellman) verhindert solche Offline-Angriffe: Jeder Rateversuch erfordert eine echte Interaktion mit dem Access Point. Zudem bietet SAE **Forward Secrecy** – wer das Passwort später erfährt, kann früher aufgezeichneten Verkehr nicht entschlüsseln.

**Weitere WLAN-Maßnahmen:** **WPS abschalten** (PIN-Verfahren angreifbar), Standard-Admin-Passwörter der APs ändern, Management nur aus dem Management-VLAN, Firmware aktuell halten, **Rogue-AP-Erkennung** (WIPS). Das Verstecken der SSID oder MAC-Filter bringen **keine echte Sicherheit** – beides ist leicht zu umgehen.`,
        },
        {
          type: 'visual',
          title: 'WLAN-Konzept der Elektro Krämer GmbH',
          widget: {
            kind: 'topology',
            data: {
              nodes: [
                { id: 'lap', type: 'laptop', label: 'Firmenlaptop', sub: 'EAP-TLS', x: 80, y: 90 },
                { id: 'phone', type: 'phone', label: 'Gast-Handy', x: 80, y: 320 },
                { id: 'ap', type: 'ap', label: 'Access Point', sub: '2 SSIDs', x: 250, y: 210 },
                { id: 'sw', type: 'switch', label: 'Core-Switch', x: 420, y: 210 },
                { id: 'rad', type: 'server', label: 'RADIUS (NPS)', sub: 'VLAN 20', x: 560, y: 80 },
                { id: 'fw', type: 'firewall', label: 'Firewall', x: 580, y: 330 },
                { id: 'inet', type: 'internet', label: 'Internet', x: 730, y: 330 },
                { id: 'srv', type: 'server', label: 'Fileserver', sub: 'VLAN 20', x: 720, y: 150 },
              ],
              links: [
                { from: 'lap', to: 'ap', label: 'KRAEMER-CORP (WPA3-Ent.)', style: 'wifi' },
                { from: 'phone', to: 'ap', label: 'KRAEMER-GAST (WPA3-SAE)', style: 'wifi' },
                { from: 'ap', to: 'sw', label: 'Trunk VL10/90', style: 'trunk' },
                { from: 'sw', to: 'rad' },
                { from: 'sw', to: 'srv' },
                { from: 'sw', to: 'fw' },
                { from: 'fw', to: 'inet', style: 'wan' },
              ],
              zones: [
                { label: 'Gäste-VLAN 90: nur Internet', x: 20, y: 270, w: 200, h: 120, color: 'orange' },
                { label: 'Firmen-WLAN VLAN 10', x: 20, y: 30, w: 200, h: 120, color: 'blue' },
              ],
            },
          },
          caption: 'Ein Access Point strahlt zwei SSIDs aus. Firmengeräte melden sich per 802.1X über RADIUS an (VLAN 10), Gäste mit einem regelmäßig wechselnden Passwort (VLAN 90, nur Internet, Client Isolation).',
        },
        {
          type: 'example',
          title: 'Gäste-WLAN sicher planen',
          problem: `Die Elektro Krämer GmbH möchte ihren Besuchern WLAN anbieten. Bisher geben Mitarbeiter einfach das Passwort des Firmen-WLANs (WPA2-Personal) heraus. Entwickle ein sicheres Konzept.`,
          steps: [
            { label: 'Problem benennen', body: 'Gäste landen im **Firmennetz** und kennen das gemeinsame Passwort dauerhaft. Jeder Gast könnte Server angreifen oder Verkehr mitschneiden. Verletzt Vertraulichkeit und Integrität.' },
            { label: 'Trennung', body: 'Eigene SSID „KRAEMER-GAST“ im eigenen **VLAN 90** mit eigenem Subnetz; Firewall-Regel: VLAN 90 → **nur Internet** (TCP 80/443, DNS), alles Interne verweigern.' },
            { label: 'Verschlüsselung und Zugang', body: '**WPA3-Personal (SAE)** mit regelmäßig (z. B. wöchentlich) wechselndem Passwort oder Voucher-/Captive-Portal mit Nutzungsbedingungen; **Client Isolation** aktivieren.' },
            { label: 'Betrieb', body: 'Kurze DHCP-Lease (z. B. 2 h), Bandbreitenbegrenzung, Protokollierung gemäß Datenschutz.' },
            { label: 'Firmen-WLAN umstellen', body: 'Firmen-SSID auf **WPA2/WPA3-Enterprise** mit 802.1X/RADIUS umstellen – kein gemeinsames Passwort mehr, das weitergegeben werden kann.' },
          ],
          result: 'Eigene SSID + VLAN, nur Internetzugang, WPA3-SAE mit wechselndem Passwort, Client Isolation; Firmen-WLAN auf Enterprise umstellen.',
        },
        {
          type: 'check',
          question: {
            id: 'm14-l06-c1',
            kind: 'single',
            skill: 'sec.auth',
            difficulty: 1,
            prompt: 'Welche Kombination ist eine echte **Zwei-Faktor-Authentifizierung**?',
            options: [
              'Passwort und Einmalcode aus einer Authenticator-App auf dem Smartphone',
              'Passwort und PIN',
              'Benutzername und Passwort',
              'Passwort und Sicherheitsfrage',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'Passwort und PIN sind beide „Wissen“ – nur ein Faktor-Typ.', error: 'mfa-gleiche-kategorie' },
              '2': { why: 'Der Benutzername ist kein Geheimnis und kein Faktor.', error: 'mfa-missverstanden' },
              '3': { why: 'Auch die Sicherheitsfrage ist „Wissen“.', error: 'mfa-gleiche-kategorie' },
            },
            explanation: 'MFA verlangt Faktoren aus verschiedenen Kategorien: hier Wissen (Passwort) + Besitz (Smartphone mit App).',
          },
        },
        {
          type: 'check',
          question: {
            id: 'm14-l06-c2',
            kind: 'single',
            skill: 'sec.wlan',
            difficulty: 2,
            prompt: 'Welchen Vorteil bietet **SAE** (WPA3-Personal) gegenüber dem PSK-Verfahren von WPA2-Personal?',
            options: [
              'Ein mitgeschnittener Handshake ermöglicht keinen Offline-Wörterbuchangriff auf das Passwort mehr',
              'Es wird kein Passwort mehr benötigt',
              'Jeder Benutzer meldet sich mit einem eigenen Konto über RADIUS an',
              'Die Reichweite des WLANs wird erhöht',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'WPA3-Personal nutzt weiterhin ein gemeinsames Passwort.', error: 'wpa3-missverstanden' },
              '2': { why: 'Das beschreibt WPA2/WPA3-Enterprise mit 802.1X.', error: 'personal-enterprise-verwechselt' },
              '3': { why: 'Sicherheitsverfahren beeinflussen die Funkreichweite nicht.', error: 'wpa3-missverstanden' },
            },
            explanation: 'SAE ist ein Diffie-Hellman-basierter Schlüsselaustausch: Jeder Rateversuch erfordert eine Interaktion mit dem AP, Offline-Angriffe auf mitgeschnittene Handshakes sind nicht möglich. Dazu kommt Forward Secrecy.',
          },
        },
        {
          type: 'practice',
          title: 'Übung: Authentifizierung und WLAN',
          questionIds: ['m14-q023', 'm14-q024', 'm14-q025', 'm14-q026', 'm14-q027', 'm14-q028', 'm14-q037'],
          count: 5,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Faktoren: Wissen, Besitz, Inhärenz. MFA = mindestens zwei verschiedene Kategorien.',
            'RADIUS (UDP 1812/1813) = zentrale Authentifizierung für 802.1X, WLAN-Enterprise und VPN.',
            'WEP und WPA/TKIP sind unsicher. WPA2 nutzt AES-CCMP, WPA3 ist aktueller Standard (SAE, PMF).',
            'Personal = ein gemeinsames Passwort (PSK/SAE); Enterprise = individuelle Anmeldung per 802.1X/RADIUS – Standard für Firmen.',
            'SAE verhindert Offline-Wörterbuchangriffe und bietet Forward Secrecy.',
            'Gäste-WLAN: eigene SSID + VLAN, nur Internet, Client Isolation; WPS aus. SSID-Verstecken und MAC-Filter sind kein Schutz.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'm14-l07',
      title: 'Typische Angriffe und wirksame Gegenmaßnahmen',
      minutes: 35,
      relevance: 'ap1',
      skills: ['sec.threats'],
      steps: [
        {
          type: 'explain',
          title: 'Die wichtigsten Bedrohungen im Netzwerk',
          body: `| Bedrohung | Was passiert? | Verletztes Schutzziel | Wichtigste Gegenmaßnahmen |
|---|---|---|---|
| **Phishing** | Gefälschte Mails/Webseiten verleiten zur Eingabe von Zugangsdaten oder zum Öffnen von Anhängen. Gezielt: *Spear-Phishing*, gegen Chefs: *CEO-Fraud*. | Vertraulichkeit, Authentizität | **Schulung** (Awareness), **MFA**, Mailfilter, SPF/DKIM/DMARC, Rückruf bei Zahlungsanweisungen |
| **Man-in-the-Middle (MITM)** | Angreifer sitzt unbemerkt zwischen zwei Partnern, liest mit und manipuliert. | Vertraulichkeit, Integrität | **Ende-zu-Ende-Verschlüsselung** (TLS, VPN), Zertifikatsprüfung, keine Warnungen wegklicken |
| **ARP-Spoofing** | Gefälschte ARP-Antworten: „Die MAC des Gateways bin ich.“ Verkehr läuft über den Angreifer → MITM im LAN. | Vertraulichkeit, Integrität | **Dynamic ARP Inspection** (DAI) mit DHCP Snooping am Switch, Segmentierung, 802.1X, Verschlüsselung |
| **DoS / DDoS** | Ein Dienst wird mit Anfragen überflutet (bei DDoS von vielen Rechnern, z. B. Botnetz) und ist nicht mehr erreichbar. | **Verfügbarkeit** | DDoS-Schutz beim Provider/CDN, Rate Limiting, Redundanz, Notfallplan |
| **Sniffing** | Mitschneiden von Netzwerkverkehr (z. B. mit Wireshark). Kritisch bei unverschlüsselten Protokollen (HTTP, FTP, Telnet). | Vertraulichkeit | **Verschlüsselte Protokolle** (HTTPS, SFTP, SSH), Switches statt Hubs, Port-Mirroring nur für Admins |
| **Rogue Access Point** | Nicht genehmigter AP im Firmennetz (Mitarbeiter steckt eigenen Router an) oder gefälschter AP mit Firmen-SSID (*Evil Twin*). | Vertraulichkeit, Integrität | **802.1X** an Switchports, **WIPS**/Funküberwachung, WPA2/3-Enterprise mit Serverzertifikatsprüfung |
| **Malware / Ransomware** | Schadsoftware; Ransomware **verschlüsselt** Daten und erpresst Lösegeld, oft mit Datendiebstahl („Double Extortion“). | Verfügbarkeit (+ Vertraulichkeit) | **Backups** (3-2-1, eines **offline/unveränderlich**), **Patches**, Virenschutz/EDR, Segmentierung, Least Privilege, Makros sperren |
| **Brute Force** | Systematisches Durchprobieren von Passwörtern (auch *Credential Stuffing* mit geleakten Passwörtern). | Vertraulichkeit, Authentizität | **Lange Passwörter/Passphrasen**, **Kontosperre** bzw. Verzögerung nach Fehlversuchen, **MFA**, Rate Limiting, Monitoring |

**Die 3-2-1-Regel für Backups:** **3** Kopien der Daten, auf **2** verschiedenen Medientypen, davon **1** außer Haus (bzw. offline). Ein Backup, das ständig mit dem Netz verbunden ist, kann die Ransomware mitverschlüsseln! Und: **Wiederherstellung regelmäßig testen.**

**Social Engineering** steckt hinter vielen Angriffen: Der Mensch wird manipuliert (Zeitdruck, Autorität, Hilfsbereitschaft) – „Hier ist der IT-Support, ich brauche kurz Ihr Passwort.“ Die wichtigste Regel für alle Mitarbeiter: **Die IT fragt niemals nach deinem Passwort.**`,
        },
        {
          type: 'visual',
          title: 'Bedrohungen und Schutz auf einen Blick',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Phishing', text: 'Schulung, MFA, Mailfilter, bei Zahlungen Rückruf.', icon: 'Mail' },
                { title: 'MITM / ARP-Spoofing', text: 'TLS/VPN, Dynamic ARP Inspection, 802.1X.', icon: 'Users' },
                { title: 'DoS / DDoS', text: 'Provider-/CDN-Schutz, Rate Limiting, Redundanz.', icon: 'Zap' },
                { title: 'Sniffing', text: 'Nur verschlüsselte Protokolle: HTTPS, SSH, SFTP.', icon: 'Eye' },
                { title: 'Rogue AP', text: '802.1X an Ports, WIPS, Enterprise-WLAN.', icon: 'Wifi' },
                { title: 'Ransomware', text: '3-2-1-Backups (offline), Patches, Segmentierung.', icon: 'AlertTriangle' },
                { title: 'Brute Force', text: 'Lange Passwörter, Kontosperre, MFA.', icon: 'Key' },
                { title: 'Social Engineering', text: 'Awareness, klare Prozesse, nie Passwörter weitergeben.', icon: 'UserX' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Ein Angriff in Phasen – und wo man ihn hätte stoppen können',
          problem: `Ein (fiktiver) Vorfall bei einem Zulieferer der Elektro Krämer GmbH:
1. Eine Mitarbeiterin der Buchhaltung erhält eine Mail „Ihre Rechnung“ mit Office-Anhang und aktiviert die Makros.
2. Die Schadsoftware lädt weitere Werkzeuge nach und liest gespeicherte Passwörter aus.
3. Mit einem Admin-Passwort (das an mehreren Systemen gleich ist) breitet sich der Angreifer über das flache Netz auf alle Server aus.
4. Nach zwei Wochen werden alle Server **und das dauerhaft verbundene Backup-NAS** verschlüsselt. Lösegeldforderung.

Nenne für jede Phase mindestens eine Gegenmaßnahme.`,
          steps: [
            { label: 'Phase 1 – Phishing', body: 'Awareness-Schulung, Mailfilter mit Anhangsprüfung, **Makros aus dem Internet per Richtlinie blockieren**.' },
            { label: 'Phase 2 – Nachladen', body: 'EDR/Virenschutz, Proxy/NGFW mit Filter für bekannte Schadseiten, Least Privilege (keine lokalen Adminrechte).' },
            { label: 'Phase 3 – Ausbreitung', body: '**Segmentierung** (Firewall zwischen Client- und Server-VLAN), **unterschiedliche Admin-Passwörter** (z. B. Windows LAPS), **MFA für Admins**, Monitoring ungewöhnlicher Anmeldungen.' },
            { label: 'Phase 4 – Verschlüsselung', body: '**3-2-1-Backups** mit **Offline- oder unveränderlicher Kopie**, getestete Wiederherstellung, Notfallplan. Dann ist die Firma wieder arbeitsfähig, ohne zu zahlen.' },
          ],
          result: 'Kein einzelnes Mittel reicht – erst die Kombination (Defense in Depth) aus Schulung, Härtung, Segmentierung, MFA und Offline-Backups stoppt den Angriff bzw. begrenzt den Schaden.',
        },
        {
          type: 'check',
          question: {
            id: 'm14-l07-c1',
            kind: 'single',
            skill: 'sec.threats',
            difficulty: 2,
            prompt: 'Welche Maßnahme schützt am wirksamsten davor, dass eine Ransomware-Attacke zu dauerhaftem **Datenverlust** führt?',
            options: [
              'Regelmäßige Backups mit einer offline bzw. unveränderlich gespeicherten Kopie und getesteter Wiederherstellung',
              'Ein RAID 1 auf allen Servern',
              'Eine längere DHCP-Lease-Dauer',
              'Das Verstecken der WLAN-SSID',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'RAID spiegelt auch die verschlüsselten Daten sofort – es schützt nur vor Festplattenausfall.', error: 'raid-ist-kein-backup' },
              '2': { why: 'Die Lease-Dauer hat mit Ransomware nichts zu tun.', error: 'massnahme-unpassend' },
              '3': { why: 'Eine versteckte SSID bietet keine echte Sicherheit und hilft gegen Ransomware gar nicht.', error: 'massnahme-unpassend' },
            },
            explanation: 'Nur ein Backup, das die Ransomware nicht erreichen kann (offline, außer Haus oder unveränderlich), garantiert die Wiederherstellung. RAID ist kein Backup!',
          },
        },
        {
          type: 'check',
          question: {
            id: 'm14-l07-c2',
            kind: 'match',
            skill: 'sec.threats',
            difficulty: 2,
            prompt: 'Ordne jeder Bedrohung die wirksamste Gegenmaßnahme zu.',
            left: ['ARP-Spoofing', 'Brute-Force-Angriff auf Logins', 'Sniffing von Anmeldedaten', 'Rogue Access Point am LAN-Port'],
            right: [
              'Verschlüsselte Protokolle wie HTTPS und SSH',
              '802.1X an den Switchports',
              'Dynamic ARP Inspection am Switch',
              'Kontosperre nach Fehlversuchen und MFA',
            ],
            answer: [2, 3, 0, 1],
            explanation: 'DAI prüft ARP-Pakete gegen die DHCP-Snooping-Tabelle. Kontosperre/MFA bremst Brute Force. Verschlüsselung macht mitgeschnittene Daten wertlos. 802.1X verhindert, dass ein unbekanntes Gerät (z. B. privater AP) Zugang zum LAN bekommt.',
          },
        },
        {
          type: 'practice',
          title: 'Übung: Bedrohungen',
          questionIds: ['m14-q029', 'm14-q030', 'm14-q031', 'm14-q032', 'm14-q033', 'm14-q034', 'm14-q036', 'm14-q040'],
          count: 6,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Phishing/Social Engineering: Schulung + MFA + Mailfilter; die IT fragt nie nach Passwörtern.',
            'MITM/ARP-Spoofing: Verschlüsselung (TLS/VPN), Dynamic ARP Inspection, 802.1X.',
            'DoS/DDoS greift die Verfügbarkeit an: Provider-/CDN-Schutz, Rate Limiting, Redundanz.',
            'Sniffing: nur verschlüsselte Protokolle (HTTPS, SSH, SFTP).',
            'Rogue AP: 802.1X, WIPS, Enterprise-WLAN.',
            'Ransomware: 3-2-1-Backups mit Offline-Kopie, Patches, Segmentierung, Least Privilege. RAID ist kein Backup.',
            'Brute Force: lange Passwörter, Kontosperre, MFA.',
          ],
        },
      ],
    },
  ],

  /* ================================================================== */
  /* Fragenpool                                                          */
  /* ================================================================== */
  questions: [
    /* ---------- Schutzziele ---------- */
    {
      id: 'm14-q001',
      kind: 'match',
      skill: 'sec.goals',
      difficulty: 1,
      prompt: 'Ordne die Schutzziele ihrer Bedeutung zu.',
      left: ['Vertraulichkeit', 'Integrität', 'Verfügbarkeit', 'Authentizität'],
      right: [
        'Daten sind unverändert bzw. Änderungen werden erkannt',
        'Kommunikationspartner bzw. Daten sind echt',
        'Nur Berechtigte können Informationen einsehen',
        'Systeme und Daten sind nutzbar, wenn sie benötigt werden',
      ],
      answer: [2, 0, 3, 1],
      explanation: 'Vertraulichkeit = Schutz vor unbefugtem Lesen, Integrität = Schutz vor unbemerkter Veränderung, Verfügbarkeit = Nutzbarkeit, Authentizität = Echtheit.',
    },
    {
      id: 'm14-q002',
      kind: 'single',
      skill: 'sec.goals',
      difficulty: 1,
      prompt: 'Zum Download einer Installationsdatei wird auf der Herstellerseite ein **SHA-256-Wert** angegeben. Welches Schutzziel kannst du damit überprüfen?',
      options: ['Integrität', 'Vertraulichkeit', 'Verfügbarkeit', 'Anonymität'],
      answer: 0,
      distractors: {
        '1': { why: 'Ein Hash verschlüsselt nichts – die Datei bleibt lesbar.', error: 'hash-verschluesselung-verwechselt' },
        '2': { why: 'Ob der Server erreichbar ist, sagt der Hash nicht.', error: 'schutzziel-verwechselt' },
        '3': { why: 'Anonymität ist kein Ziel dieser Prüfung.', error: 'schutzziel-verwechselt' },
      },
      explanation: 'Stimmt der selbst berechnete Hash (z. B. mit `Get-FileHash`) mit dem angegebenen überein, wurde die Datei nicht verändert – Integrität.',
    },
    {
      id: 'm14-q003',
      kind: 'multi',
      skill: 'sec.goals',
      difficulty: 2,
      prompt: 'Welche Maßnahmen dienen **vorrangig der Verfügbarkeit**? (Mehrere Antworten)',
      options: [
        'Unterbrechungsfreie Stromversorgung (USV)',
        'Redundante Internetanbindung',
        'Regelmäßige Datensicherung',
        'Festplattenverschlüsselung mit BitLocker',
        'Digitale Signatur von E-Mails',
      ],
      answer: [0, 1, 2],
      explanation: 'USV, Redundanz und Backups sorgen dafür, dass Systeme und Daten nutzbar bleiben bzw. wiederhergestellt werden können. Verschlüsselung schützt die Vertraulichkeit, Signaturen Integrität und Authentizität.',
    },
    {
      id: 'm14-q043',
      kind: 'single',
      skill: 'sec.goals',
      difficulty: 2,
      prompt: 'Was beschreibt das Prinzip **„Least Privilege“**?',
      options: [
        'Benutzer und Dienste erhalten nur die Rechte, die sie für ihre Aufgabe unbedingt benötigen',
        'Administratoren haben grundsätzlich weniger Rechte als normale Benutzer',
        'Die Firewall erlaubt standardmäßig allen Verkehr',
        'Nur die Geschäftsführung darf Passwörter vergeben',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Es geht nicht darum, Admins weniger Rechte als Benutzern zu geben, sondern jedem nur das Nötige.', error: 'prinzip-missverstanden' },
        '2': { why: 'Das wäre das Gegenteil (Default allow).', error: 'prinzip-missverstanden' },
        '3': { why: 'Das hat mit dem Prinzip nichts zu tun.', error: 'prinzip-missverstanden' },
      },
      explanation: 'Minimale Rechte begrenzen den Schaden, wenn ein Konto oder Dienst kompromittiert wird – z. B. arbeiten Admins im Alltag mit einem normalen Konto.',
    },
    /* ---------- Firewall ---------- */
    {
      id: 'm14-q004',
      kind: 'single',
      skill: 'sec.firewall',
      difficulty: 1,
      prompt: 'Welche Information wertet ein einfacher **Paketfilter** typischerweise **nicht** aus?',
      options: ['Den Inhalt einer HTTP-Anfrage (z. B. aufgerufene URL)', 'Die Quell-IP-Adresse', 'Den Zielport', 'Das Protokoll (TCP/UDP/ICMP)'],
      answer: 0,
      distractors: {
        '1': { why: 'Die Quell-IP ist ein Kernkriterium jedes Paketfilters.', error: 'paketfilter-missverstanden' },
        '2': { why: 'Ports (Schicht 4) prüft ein Paketfilter ebenfalls.', error: 'paketfilter-missverstanden' },
        '3': { why: 'Das Protokoll gehört zu den Standardkriterien.', error: 'paketfilter-missverstanden' },
      },
      explanation: 'Ein Paketfilter arbeitet auf Schicht 3/4 (IP, Protokoll, Ports). Inhalte der Anwendungsschicht wie URLs prüfen nur Application-Layer-Firewalls bzw. NGFWs.',
    },
    {
      id: 'm14-q005',
      kind: 'table',
      skill: 'sec.firewall',
      difficulty: 3,
      prompt: `Regelwerk der Firewall (Prüfung von oben nach unten, erste passende Regel gilt, am Ende implizites Deny). LAN: \`192.168.10.0/24\`, DMZ-Webserver: \`172.16.1.10\`, Admin-PC: \`192.168.10.20\`.

| Nr. | Quelle | Ziel | Dienst | Aktion |
|---|---|---|---|---|
| 1 | any | 172.16.1.10 | TCP 443 | erlauben |
| 2 | 192.168.10.20 | 172.16.1.10 | TCP 22 | erlauben |
| 3 | 172.16.1.0/24 | 192.168.10.0/24 | any | verweigern |
| 4 | 192.168.10.0/24 | any | TCP 80, 443 | erlauben |

Trage für jede Verbindung ein, welche **Regel-Nr.** greift (0 = implizites Deny) und ob sie **erlaubt** oder **verweigert** wird.`,
      columns: [
        { key: 'conn', label: 'Verbindung', type: 'text' },
        { key: 'rule', label: 'Regel-Nr.', type: 'number' },
        { key: 'act', label: 'Aktion', type: 'text' },
      ],
      rows: [
        {
          cells: {
            conn: { given: 'Internet 198.51.100.7 → 172.16.1.10 TCP 443' },
            rule: { answer: '1' },
            act: { answer: 'erlauben', accept: ['erlaubt', 'allow', 'zulassen'] },
          },
        },
        {
          cells: {
            conn: { given: '192.168.10.55 → 172.16.1.10 TCP 22' },
            rule: { answer: '0' },
            act: { answer: 'verweigern', accept: ['verweigert', 'deny', 'blockiert', 'blockieren', 'drop'] },
          },
        },
        {
          cells: {
            conn: { given: '172.16.1.10 → 192.168.10.5 TCP 445' },
            rule: { answer: '3' },
            act: { answer: 'verweigern', accept: ['verweigert', 'deny', 'blockiert', 'blockieren', 'drop'] },
          },
        },
        {
          cells: {
            conn: { given: '192.168.10.55 → 198.51.100.80 TCP 443' },
            rule: { answer: '4' },
            act: { answer: 'erlauben', accept: ['erlaubt', 'allow', 'zulassen'] },
          },
        },
        {
          cells: {
            conn: { given: '192.168.10.20 → 172.16.1.10 TCP 22' },
            rule: { answer: '2' },
            act: { answer: 'erlauben', accept: ['erlaubt', 'allow', 'zulassen'] },
          },
        },
      ],
      explanation: 'Zeile 1: Regel 1 passt sofort. Zeile 2: SSH ist nur vom Admin-PC erlaubt (Regel 2 passt nicht, Regel 3/4 auch nicht – Port 22 ist nicht 80/443) → implizites Deny. Zeile 3: DMZ → LAN → Regel 3 verweigert. Zeile 4: LAN → Internet HTTPS → Regel 4. Zeile 5: Admin-PC → SSH → Regel 2.',
      hints: ['Gehe jede Regel von oben durch und prüfe Quelle, Ziel UND Dienst.'],
    },
    {
      id: 'm14-q006',
      kind: 'single',
      skill: 'sec.firewall',
      difficulty: 2,
      prompt: 'Warum benötigt eine **Stateful-Inspection-Firewall** für ausgehende HTTPS-Verbindungen keine eigene Regel für die Antwortpakete?',
      options: [
        'Weil sie aufgebaute Verbindungen in einer Zustandstabelle speichert und zugehörige Antworten automatisch zulässt',
        'Weil Antwortpakete grundsätzlich verschlüsselt sind',
        'Weil HTTPS keine Antwortpakete erzeugt',
        'Weil Antworten immer über einen anderen Port laufen, der standardmäßig offen ist',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Verschlüsselung entscheidet nicht über das Durchlassen von Paketen.', error: 'stateful-missverstanden' },
        '2': { why: 'Jede TCP-Verbindung hat Pakete in beide Richtungen.', error: 'fakt-falsch' },
        '3': { why: 'Kein Port ist bei einer sauberen Firewall „standardmäßig offen“.', error: 'stateful-missverstanden' },
      },
      explanation: 'Die Zustandstabelle (Connection Tracking) merkt sich Quelle/Ziel/Ports der erlaubten Verbindung. Nur dazu passende Antworten werden durchgelassen – ohne pauschale Rückregeln.',
    },
    {
      id: 'm14-q007',
      kind: 'single',
      skill: 'sec.firewall',
      difficulty: 2,
      prompt: 'Die Firewall soll verhindern, dass Mitarbeiter **private Cloudspeicher** nutzen, obwohl diese ebenfalls über HTTPS (Port 443) laufen. Welcher Firewall-Typ ist dafür nötig?',
      options: [
        'Next-Generation Firewall mit Anwendungserkennung',
        'Einfacher Paketfilter',
        'Stateful-Inspection-Firewall ohne Zusatzfunktionen',
        'Personal Firewall mit Standardregeln',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Ein Paketfilter sieht nur IP und Port 443 – er kann Anwendungen auf demselben Port nicht unterscheiden.', error: 'firewall-typ-verwechselt' },
        '2': { why: 'Auch Stateful arbeitet nur bis Schicht 4.', error: 'firewall-typ-verwechselt' },
        '3': { why: 'Standardregeln einer Host-Firewall unterscheiden keine Webanwendungen.', error: 'firewall-typ-verwechselt' },
      },
      explanation: 'Eine NGFW erkennt Anwendungen unabhängig vom Port (z. B. anhand von Servernamen, Signaturen, ggf. TLS-Inspection) und kann sie gezielt sperren.',
    },
    {
      id: 'm14-q038',
      kind: 'order',
      skill: 'sec.firewall',
      difficulty: 2,
      prompt: 'Bringe die Regeln in eine **sinnvolle Reihenfolge** (oben = zuerst geprüft), sodass der infizierte PC `192.168.10.99` komplett gesperrt ist, alle anderen LAN-PCs aber surfen dürfen.',
      items: [
        '192.168.10.99 → any → any → verweigern',
        '192.168.10.0/24 → any → TCP 80/443 → erlauben',
        '192.168.10.0/24 → any → any → verweigern (Log „LAN sonstiges“)',
        'any → any → any → verweigern (Log)',
      ],
      explanation: 'Die spezielle Sperrregel für .99 muss vor der allgemeinen Erlaubnisregel stehen (First Match), sonst dürfte .99 weiter surfen. Die LAN-Sperrregel mit eigenem Log muss nach der Erlaubnisregel stehen – davor würde sie das Surfen für alle blockieren. Die allgemeine Default-deny-Regel steht immer ganz unten; davor stehende Regeln würden sonst nie erreicht.',
      hints: ['Spezielle Regeln nach oben, Default deny nach unten.'],
    },
    /* ---------- Segmentierung ---------- */
    {
      id: 'm14-q008',
      kind: 'free',
      skill: 'sec.segment',
      difficulty: 2,
      prompt: 'Erläutern Sie den Begriff **DMZ** und beschreiben Sie den Unterschied zwischen einer Ein- und einer Zwei-Firewall-Lösung.',
      modelAnswer:
        'Eine DMZ (demilitarisierte Zone) ist ein eigenes, durch Firewalls abgegrenztes Netzsegment zwischen Internet und internem LAN. Dort werden Server betrieben, die aus dem Internet erreichbar sein müssen (z. B. Webserver, Mail-Relay, Reverse-Proxy). Aus dem Internet ist nur der Zugriff auf die benötigten Dienste in der DMZ erlaubt, Verbindungen aus der DMZ ins LAN sind verboten. Wird ein DMZ-Server kompromittiert, gelangt der Angreifer nicht direkt ins LAN. Bei der Ein-Firewall-Lösung (Three-Legged-Firewall) hat eine Firewall drei Schnittstellen (Internet, DMZ, LAN) und regelt den Verkehr zwischen allen Zonen. Bei der Zwei-Firewall-Lösung liegt die DMZ zwischen einer äußeren Firewall (Internet ↔ DMZ) und einer inneren Firewall (DMZ ↔ LAN). Werden zwei Firewalls unterschiedlicher Hersteller eingesetzt, betrifft eine Sicherheitslücke nicht beide, was die Sicherheit erhöht; die Lösung ist jedoch teurer und aufwendiger zu verwalten.',
      keywords: ['eigenes Netzsegment', 'öffentlich erreichbare Server', 'DMZ → LAN verboten', 'Three-Legged', 'äußere Firewall', 'innere Firewall', 'verschiedene Hersteller'],
      explanation: 'Zentrale Punkte: Zweck (Schadensbegrenzung), Platzierung öffentlicher Server, Verkehrsregeln und die beiden Bauformen mit Vor-/Nachteilen.',
    },
    {
      id: 'm14-q009',
      kind: 'multi',
      skill: 'sec.segment',
      difficulty: 2,
      prompt: 'Welche Maßnahmen erhöhen die Sicherheit an einem Access-Switch? (Mehrere Antworten)',
      options: [
        'Ungenutzte Ports deaktivieren',
        'Endgeräte-Ports fest als Access-Port konfigurieren und automatische Trunk-Aushandlung abschalten',
        'Port Security bzw. 802.1X aktivieren',
        'Native VLAN auf ein ungenutztes VLAN setzen',
        'Alle Ports im Standard-VLAN 1 belassen',
        'Telnet für die Switch-Verwaltung nutzen',
      ],
      answer: [0, 1, 2, 3],
      explanation: 'Abschalten, feste Access-Ports, Port Security/802.1X und ein ungenutztes Native VLAN sind Standardhärtungen. VLAN 1 für alles zu nutzen erleichtert VLAN-Hopping, Telnet überträgt Passwörter im Klartext – stattdessen SSH.',
    },
    {
      id: 'm14-q010',
      kind: 'single',
      skill: 'sec.segment',
      difficulty: 2,
      prompt: 'Port Security ist auf „maximal 1 MAC-Adresse“ eingestellt. Ein Mitarbeiter schließt einen kleinen privaten Switch an und verbindet darüber zwei Geräte. Was passiert typischerweise (Modus „shutdown“)?',
      options: [
        'Der Switchport wird wegen der Verletzung gesperrt',
        'Beide Geräte erhalten automatisch Zugang',
        'Der Switch vergibt eine neue MAC-Adresse',
        'Der DHCP-Server teilt den Geräten eine APIPA-Adresse zu',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Gerade das soll Port Security verhindern.', error: 'port-security-missverstanden' },
        '2': { why: 'Switches vergeben keine MAC-Adressen.', error: 'fakt-falsch' },
        '3': { why: 'APIPA-Adressen vergibt sich ein Client selbst, nicht der DHCP-Server.', error: 'apipa-missverstanden' },
      },
      explanation: 'Sobald eine zweite MAC-Adresse auftaucht, liegt eine Verletzung vor. Im Modus „shutdown“ wird der Port deaktiviert (bei Cisco: err-disabled) und muss vom Admin wieder freigegeben werden.',
    },
    {
      id: 'm14-q011',
      kind: 'single',
      skill: 'sec.auth',
      difficulty: 2,
      prompt: 'Welche Rolle übernimmt der **Switch** bei der portbasierten Authentifizierung nach **IEEE 802.1X**?',
      options: ['Authenticator', 'Supplicant', 'Authentication Server', 'Certificate Authority'],
      answer: 0,
      distractors: {
        '1': { why: 'Supplicant ist der Client, der sich anmeldet.', error: '8021x-rollen' },
        '2': { why: 'Das ist der RADIUS-Server, der die Daten prüft.', error: '8021x-rollen' },
        '3': { why: 'Eine CA stellt Zertifikate aus, ist aber keine 802.1X-Rolle.', error: '8021x-rollen' },
      },
      explanation: 'Der Switch (bzw. Access Point) ist der Authenticator: Er hält den Port geschlossen, leitet die EAP-Anmeldung an den RADIUS-Server weiter und öffnet den Port nach erfolgreicher Prüfung.',
    },
    {
      id: 'm14-q012',
      kind: 'single',
      skill: 'sec.segment',
      difficulty: 3,
      prompt: 'Wie verhinderst du das **Switch Spoofing** (eine Form des VLAN-Hoppings)?',
      options: [
        'Endgeräte-Ports fest als Access-Ports konfigurieren und die automatische Trunk-Aushandlung deaktivieren',
        'Die SSID des WLANs verstecken',
        'Die DHCP-Lease-Dauer verkürzen',
        'Alle VLANs auf VLAN 1 zusammenlegen',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Eine versteckte SSID hat mit Switch-Trunks nichts zu tun.', error: 'massnahme-unpassend' },
        '2': { why: 'Die Lease-Dauer beeinflusst keine Trunk-Aushandlung.', error: 'massnahme-unpassend' },
        '3': { why: 'Das hebt die Segmentierung komplett auf.', error: 'massnahme-unpassend' },
      },
      explanation: 'Beim Switch Spoofing gibt sich ein Angreifer als Switch aus und handelt einen Trunk aus, um Zugriff auf alle VLANs zu erhalten. Fest konfigurierte Access-Ports ohne Aushandlung (z. B. DTP aus) verhindern das.',
    },
    {
      id: 'm14-q044',
      kind: 'single',
      skill: 'sec.segment',
      difficulty: 1,
      prompt: 'Was ist das wichtigste Ziel eines **Gäste-VLANs**?',
      options: [
        'Gäste erhalten Internetzugang, aber keinen Zugriff auf interne Firmenressourcen',
        'Gäste bekommen schnelleres Internet als Mitarbeiter',
        'Gäste können Firmendrucker ohne Anmeldung nutzen',
        'Gäste-Geräte werden automatisch mit Firmensoftware ausgestattet',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Meist wird die Bandbreite für Gäste sogar begrenzt.', error: 'gaeste-vlan-missverstanden' },
        '2': { why: 'Genau solche internen Zugriffe soll das Gäste-VLAN verhindern.', error: 'gaeste-vlan-missverstanden' },
        '3': { why: 'Fremde Geräte werden nicht verwaltet.', error: 'gaeste-vlan-missverstanden' },
      },
      explanation: 'Das Gäste-VLAN trennt fremde, nicht vertrauenswürdige Geräte vom Firmennetz. Per Firewall wird nur der Weg ins Internet erlaubt, oft zusätzlich mit Client Isolation.',
    },
    /* ---------- Kryptografie ---------- */
    {
      id: 'm14-q013',
      kind: 'single',
      skill: 'sec.crypto',
      difficulty: 1,
      prompt: 'Welches Verfahren ist ein **symmetrisches** Verschlüsselungsverfahren?',
      options: ['AES', 'RSA', 'SHA-256', 'Diffie-Hellman'],
      answer: 0,
      distractors: {
        '1': { why: 'RSA ist asymmetrisch (Schlüsselpaar).', error: 'sym-asym-verwechselt' },
        '2': { why: 'SHA-256 ist eine Hashfunktion, keine Verschlüsselung.', error: 'hash-verschluesselung-verwechselt' },
        '3': { why: 'Diffie-Hellman ist ein (asymmetrisches) Schlüsselaustauschverfahren.', error: 'sym-asym-verwechselt' },
      },
      explanation: 'AES verwendet denselben geheimen Schlüssel zum Ver- und Entschlüsseln – symmetrisch, schnell, Standard für Datenverschlüsselung.',
    },
    {
      id: 'm14-q014',
      kind: 'number',
      skill: 'sec.crypto',
      difficulty: 2,
      prompt: '**10** Personen sollen paarweise vertraulich kommunizieren können. Wie viele Schlüssel werden bei **symmetrischer** Verschlüsselung benötigt?',
      answer: 45,
      explanation: 'n · (n − 1) / 2 = 10 · 9 / 2 = 45 Schlüssel.',
      hints: ['Jedes Paar braucht einen eigenen Schlüssel.', 'Formel: n · (n − 1) / 2'],
    },
    {
      id: 'm14-q015',
      kind: 'number',
      skill: 'sec.crypto',
      difficulty: 2,
      prompt: 'Dieselben **10** Personen nutzen **asymmetrische** Verschlüsselung. Wie viele Schlüssel (öffentliche und private zusammen) gibt es insgesamt?',
      answer: 20,
      explanation: 'Jede Person hat ein Schlüsselpaar: 10 Paare = 20 Schlüssel (10 öffentliche, 10 private).',
    },
    {
      id: 'm14-q016',
      kind: 'single',
      skill: 'sec.crypto',
      difficulty: 2,
      prompt: 'Warum verwendet man in der Praxis (z. B. bei TLS) **hybride Verschlüsselung**, statt die Daten komplett asymmetrisch zu verschlüsseln?',
      options: [
        'Asymmetrische Verfahren sind sehr langsam; man nutzt sie nur für den Schlüsselaustausch und verschlüsselt die Daten schnell symmetrisch',
        'Asymmetrische Verfahren sind unsicherer als symmetrische',
        'Symmetrische Verfahren benötigen keinen Schlüssel',
        'Hybride Verfahren kommen ohne Zertifikate aus',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Bei passender Schlüssellänge sind beide sicher – der Grund ist die Geschwindigkeit und die Schlüsselverteilung.', error: 'hybrid-missverstanden' },
        '2': { why: 'Natürlich brauchen sie einen (geheimen) Schlüssel.', error: 'fakt-falsch' },
        '3': { why: 'TLS nutzt gerade Zertifikate zur Authentifizierung des Servers.', error: 'hybrid-missverstanden' },
      },
      explanation: 'Hybrid = Vorteile kombinieren: asymmetrisch löst das Schlüsselverteilungsproblem, symmetrisch ist schnell genug für große Datenmengen.',
    },
    {
      id: 'm14-q017',
      kind: 'single',
      skill: 'sec.hash',
      difficulty: 2,
      prompt: 'Die Geschäftsführerin **signiert** einen Vertrag digital. Mit welchem Schlüssel wird die Signatur erzeugt, mit welchem geprüft?',
      options: [
        'Erzeugt mit ihrem privaten Schlüssel, geprüft mit ihrem öffentlichen Schlüssel',
        'Erzeugt mit ihrem öffentlichen Schlüssel, geprüft mit ihrem privaten Schlüssel',
        'Erzeugt mit dem öffentlichen Schlüssel des Empfängers, geprüft mit dessen privatem Schlüssel',
        'Erzeugt und geprüft mit demselben symmetrischen Schlüssel',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Dann könnte jeder signieren und nur sie prüfen – das ist genau verkehrt herum.', error: 'signieren-verschluesseln-verwechselt' },
        '2': { why: 'Das ist das Verschlüsseln für einen Empfänger, nicht das Signieren.', error: 'signieren-verschluesseln-verwechselt' },
        '3': { why: 'Mit einem gemeinsamen Schlüssel ließe sich nicht beweisen, wer signiert hat (keine Verbindlichkeit).', error: 'sym-asym-verwechselt' },
      },
      explanation: 'Nur sie besitzt den privaten Schlüssel – also kann nur sie signieren. Jeder kann mit dem öffentlichen Schlüssel (aus ihrem Zertifikat) prüfen.',
    },
    {
      id: 'm14-q018',
      kind: 'multi',
      skill: 'sec.hash',
      difficulty: 2,
      prompt: 'Welche Eigenschaften hat eine **kryptografische Hashfunktion** wie SHA-256? (Mehrere Antworten)',
      options: [
        'Die Ausgabe hat immer dieselbe Länge',
        'Aus dem Hashwert lassen sich die Ursprungsdaten nicht zurückberechnen',
        'Kleine Änderungen der Eingabe ändern den Hashwert stark',
        'Mit dem richtigen Schlüssel kann man den Hash entschlüsseln',
        'Gleiche Eingaben erzeugen jedes Mal unterschiedliche Hashwerte',
      ],
      answer: [0, 1, 2],
      explanation: 'Feste Länge, Einwegeigenschaft und Lawineneffekt. Ein Hash hat keinen Schlüssel und lässt sich nicht „entschlüsseln“. Gleiche Eingaben liefern immer denselben Hash – sonst könnte man nichts vergleichen.',
    },
    {
      id: 'm14-q019',
      kind: 'free',
      skill: 'sec.crypto',
      difficulty: 2,
      prompt: 'Beschreiben Sie das Prinzip der **hybriden Verschlüsselung** und nennen Sie ein Einsatzbeispiel.',
      modelAnswer:
        'Hybride Verschlüsselung kombiniert symmetrische und asymmetrische Verfahren. Für eine Sitzung wird ein zufälliger symmetrischer Sitzungsschlüssel verwendet. Dieser wird mithilfe eines asymmetrischen Verfahrens sicher übertragen – z. B. mit dem öffentlichen Schlüssel des Empfängers verschlüsselt, den nur dieser mit seinem privaten Schlüssel entschlüsseln kann – oder beide Seiten berechnen ihn per Diffie-Hellman-Schlüsselaustausch. Die eigentlichen Nutzdaten werden anschließend schnell symmetrisch (z. B. mit AES) verschlüsselt. So wird das Schlüsselverteilungsproblem der symmetrischen Verfahren gelöst und gleichzeitig der Geschwindigkeitsnachteil der asymmetrischen Verfahren vermieden. Beispiele: TLS/HTTPS, IPsec- oder SSL-VPN, S/MIME bzw. PGP.',
      keywords: ['Sitzungsschlüssel', 'symmetrisch', 'asymmetrisch', 'öffentlicher Schlüssel', 'Diffie-Hellman', 'AES', 'schnell', 'Schlüsselverteilung', 'TLS'],
      explanation: 'Wichtig ist, welcher Teil asymmetrisch (Schlüssel) und welcher symmetrisch (Daten) läuft – und warum.',
    },
    {
      id: 'm14-q041',
      kind: 'free',
      skill: 'sec.crypto',
      difficulty: 1,
      prompt: 'Nennen Sie je zwei Vor- und Nachteile der **symmetrischen** gegenüber der **asymmetrischen** Verschlüsselung.',
      modelAnswer:
        'Vorteile der symmetrischen Verschlüsselung: sehr hohe Geschwindigkeit, dadurch für große Datenmengen geeignet; geringer Rechenaufwand und kürzere Schlüssel bei vergleichbarer Sicherheit (z. B. AES-256). Nachteile: Der gemeinsame geheime Schlüssel muss vorher über einen sicheren Weg ausgetauscht werden (Schlüsselverteilungsproblem); bei vielen Teilnehmern steigt die Zahl der benötigten Schlüssel stark an (n·(n−1)/2); außerdem ist keine Zuordnung zu einer Person möglich, daher keine digitale Signatur/Verbindlichkeit.',
      keywords: ['schnell', 'große Datenmengen', 'Schlüsselaustausch', 'Schlüsselverteilung', 'n·(n−1)/2', 'keine Signatur'],
      explanation: 'Kernaussage: symmetrisch = schnell, aber Schlüsselverteilung und -anzahl problematisch; asymmetrisch = langsam, aber einfache Schlüsselverteilung und Signaturen möglich.',
    },
    /* ---------- PKI / TLS / VPN ---------- */
    {
      id: 'm14-q020',
      kind: 'order',
      skill: 'sec.pki',
      difficulty: 2,
      prompt: 'Bringe die Schritte eines vereinfachten **TLS-Handshakes** beim Aufruf einer HTTPS-Seite in die richtige Reihenfolge.',
      items: [
        'Browser sendet ClientHello mit unterstützten Versionen und Cipher Suites',
        'Server antwortet mit ServerHello und sendet sein Zertifikat',
        'Browser prüft das Zertifikat (Kette, Gültigkeit, Name, Sperrstatus)',
        'Beide handeln einen symmetrischen Sitzungsschlüssel aus (z. B. per ECDHE)',
        'Beide bestätigen den Handshake mit Finished',
        'Die HTTP-Daten werden symmetrisch verschlüsselt übertragen',
      ],
      explanation: 'Erst Fähigkeiten austauschen, dann Server-Identität per Zertifikat nachweisen und prüfen, dann den Sitzungsschlüssel festlegen, Handshake bestätigen und schließlich die Daten schnell symmetrisch übertragen.',
    },
    {
      id: 'm14-q021',
      kind: 'single',
      skill: 'sec.pki',
      difficulty: 1,
      prompt: 'Was ist in einem **Serverzertifikat** enthalten?',
      options: [
        'Der öffentliche Schlüssel des Servers und die Signatur der ausstellenden CA',
        'Der private Schlüssel des Servers',
        'Das Passwort des Administrators',
        'Der symmetrische Sitzungsschlüssel aller Verbindungen',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Der private Schlüssel ist geheim und gehört niemals ins (öffentliche) Zertifikat.', error: 'zertifikat-inhalt' },
        '2': { why: 'Zertifikate enthalten keine Passwörter.', error: 'zertifikat-inhalt' },
        '3': { why: 'Sitzungsschlüssel werden für jede Verbindung neu ausgehandelt.', error: 'zertifikat-inhalt' },
      },
      explanation: 'Ein X.509-Zertifikat enthält u. a. Inhaber/Domainnamen, öffentlichen Schlüssel, Aussteller, Gültigkeit und die Signatur der CA.',
    },
    {
      id: 'm14-q022',
      kind: 'single',
      skill: 'sec.pki',
      difficulty: 2,
      prompt: 'Der Browser zeigt bei einer Firmen-Webseite die Warnung „Zertifikat abgelaufen“. Was ist die richtige Reaktion des Administrators?',
      options: [
        'Ein neues Zertifikat ausstellen bzw. das Zertifikat erneuern und auf dem Server einbinden',
        'Die Mitarbeiter anweisen, die Warnung zu ignorieren',
        'HTTPS deaktivieren und auf HTTP umstellen',
        'Die Systemzeit aller Clients zurückstellen',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Wer Warnungen wegklickt, erkennt später auch echte Angriffe (MITM) nicht mehr.', error: 'warnung-ignorieren' },
        '2': { why: 'Damit fällt die Verschlüsselung komplett weg.', error: 'sicherheit-reduzieren' },
        '3': { why: 'Das ist ein Workaround, der andere Probleme verursacht (z. B. Kerberos, Logs).', error: 'sicherheit-reduzieren' },
      },
      explanation: 'Zertifikate haben eine begrenzte Laufzeit. Rechtzeitig erneuern (am besten automatisiert und mit Ablauf-Monitoring).',
    },
    {
      id: 'm14-q035',
      kind: 'number',
      skill: 'sec.pki',
      difficulty: 1,
      prompt: 'Welchen TCP-Port verwendet **HTTPS** standardmäßig?',
      answer: 443,
      explanation: 'HTTPS = HTTP über TLS, Standardport TCP 443 (HTTP ohne Verschlüsselung: Port 80).',
    },
    {
      id: 'm14-q039',
      kind: 'single',
      skill: 'sec.vpn',
      difficulty: 2,
      prompt: 'Welche Konfiguration macht ein **Remote-Access-VPN** für Homeoffice-Mitarbeiter am sichersten?',
      options: [
        'Anmeldung mit Benutzerkonto und zweitem Faktor (MFA), Gerätezertifikat, moderne Verschlüsselung (z. B. AES-GCM) und aktuell gepatchtes VPN-Gateway',
        'Ein gemeinsamer Pre-Shared Key für alle Mitarbeiter, der nie geändert wird',
        'PPTP, weil es auf allen Systemen ohne Zusatzsoftware läuft',
        'Kein VPN, stattdessen RDP-Port 3389 per Portweiterleitung freigeben',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Ein gemeinsamer, nie geänderter Schlüssel kann von jedem (Ex-)Mitarbeiter weitergegeben werden.', error: 'vpn-unsicher' },
        '2': { why: 'PPTP gilt seit Langem als unsicher.', error: 'vpn-unsicher' },
        '3': { why: 'Offen erreichbares RDP ist ein beliebtes Einfallstor für Brute-Force- und Ransomware-Angriffe.', error: 'vpn-unsicher' },
      },
      explanation: 'Starke, individuelle Authentifizierung (MFA, Zertifikate) plus moderne Kryptografie und ein gepatchtes Gateway sind die Grundpfeiler eines sicheren VPN-Zugangs.',
    },
    {
      id: 'm14-q042',
      kind: 'single',
      skill: 'sec.pki',
      difficulty: 3,
      prompt: 'Mit welchem Schlüssel werden bei einer bestehenden HTTPS-Verbindung die eigentlichen **Nutzdaten** verschlüsselt?',
      options: [
        'Mit dem im Handshake ausgehandelten symmetrischen Sitzungsschlüssel',
        'Mit dem privaten Schlüssel des Servers',
        'Mit dem öffentlichen Schlüssel der Root-CA',
        'Mit dem Hashwert des Zertifikats',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Der private Schlüssel dient im Handshake zur Authentifizierung des Servers, nicht zur Verschlüsselung der Nutzdaten.', error: 'tls-schluessel-verwechselt' },
        '2': { why: 'Der Root-CA-Schlüssel dient nur zur Prüfung der Zertifikatskette.', error: 'tls-schluessel-verwechselt' },
        '3': { why: 'Ein Hash ist kein Schlüssel.', error: 'hash-verschluesselung-verwechselt' },
      },
      explanation: 'TLS ist hybrid: Nach dem Handshake laufen alle Daten symmetrisch (z. B. AES-GCM) mit dem gemeinsamen Sitzungsschlüssel.',
    },
    /* ---------- Authentifizierung / WLAN ---------- */
    {
      id: 'm14-q023',
      kind: 'match',
      skill: 'sec.auth',
      difficulty: 1,
      prompt: 'Ordne die Beispiele dem passenden Authentifizierungsfaktor zu.',
      left: ['PIN der Smartcard', 'Hardware-Token (FIDO2-Schlüssel)', 'Fingerabdruck'],
      right: ['Inhärenz (Sein)', 'Besitz (Haben)', 'Wissen'],
      answer: [2, 1, 0],
      explanation: 'Die PIN ist Wissen (auch wenn sie zu einer Smartcard gehört – die Karte selbst wäre Besitz). Der Token ist Besitz, der Fingerabdruck Inhärenz (Biometrie).',
    },
    {
      id: 'm14-q024',
      kind: 'single',
      skill: 'sec.auth',
      difficulty: 2,
      prompt: 'Wozu dient ein **RADIUS-Server** im Firmennetz?',
      options: [
        'Zur zentralen Authentifizierung von Benutzern/Geräten für WLAN-Enterprise, 802.1X und VPN',
        'Zur Vergabe von IP-Adressen',
        'Zur Namensauflösung',
        'Zur Verschlüsselung von Festplatten',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Das ist die Aufgabe von DHCP.', error: 'dienst-verwechselt' },
        '2': { why: 'Das macht DNS.', error: 'dienst-verwechselt' },
        '3': { why: 'Das macht z. B. BitLocker.', error: 'dienst-verwechselt' },
      },
      explanation: 'Switches, Access Points und VPN-Gateways fragen den RADIUS-Server (UDP 1812/1813), ob ein Benutzer oder Gerät Zugang erhält – meist gegen das Active Directory.',
    },
    {
      id: 'm14-q025',
      kind: 'single',
      skill: 'sec.wlan',
      difficulty: 1,
      prompt: 'Warum darf **WEP** heute nicht mehr eingesetzt werden?',
      options: [
        'Die Verschlüsselung ist gebrochen und kann in kurzer Zeit geknackt werden',
        'WEP ist zu langsam für moderne WLANs',
        'WEP unterstützt nur 2,4 GHz',
        'WEP verlangt einen RADIUS-Server',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Das Problem ist nicht die Geschwindigkeit, sondern die Sicherheit.', error: 'wep-missverstanden' },
        '2': { why: 'Das Frequenzband ist nicht der Grund.', error: 'wep-missverstanden' },
        '3': { why: 'WEP arbeitet mit statischen Schlüsseln ohne RADIUS.', error: 'wep-missverstanden' },
      },
      explanation: 'WEP (RC4 mit kurzem Initialisierungsvektor) hat gravierende Designfehler; der Schlüssel lässt sich mit frei verfügbaren Tools in Minuten ermitteln.',
    },
    {
      id: 'm14-q026',
      kind: 'single',
      skill: 'sec.wlan',
      difficulty: 2,
      prompt: 'Ein Mitarbeiter verlässt im Streit die Firma. Das Firmen-WLAN läuft mit **WPA2-Personal**. Welches Problem entsteht, und was wäre die bessere Lösung?',
      options: [
        'Er kennt das gemeinsame Passwort; es muss auf allen Geräten geändert werden. Besser: WPA2/WPA3-Enterprise mit individueller Anmeldung per 802.1X/RADIUS',
        'Kein Problem, WPA2-Personal sperrt ausgeschiedene Mitarbeiter automatisch',
        'Man muss nur die SSID verstecken',
        'Man muss nur seine MAC-Adresse im DHCP-Server löschen',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'WPA2-Personal kennt keine Benutzerkonten – alle teilen ein Passwort.', error: 'personal-enterprise-verwechselt' },
        '2': { why: 'Versteckte SSIDs sind leicht auffindbar und schützen nicht.', error: 'scheinsicherheit' },
        '3': { why: 'Er könnte ein anderes Gerät nutzen oder seine MAC fälschen; das Passwort kennt er weiterhin.', error: 'scheinsicherheit' },
      },
      explanation: 'Bei Enterprise wird nur das Benutzerkonto bzw. Zertifikat des Mitarbeiters gesperrt – alle anderen arbeiten ungestört weiter.',
    },
    {
      id: 'm14-q027',
      kind: 'match',
      skill: 'sec.wlan',
      difficulty: 2,
      prompt: 'Ordne die WLAN-Standards ihrer Bewertung bzw. Eigenschaft zu.',
      left: ['WEP', 'WPA (TKIP)', 'WPA2', 'WPA3'],
      right: [
        'AES-CCMP; als Personal-Variante anfällig für Offline-Wörterbuchangriffe',
        'Gebrochen, in Minuten knackbar',
        'Aktueller Standard mit SAE und verpflichtendem PMF',
        'Veraltete Übergangslösung auf RC4-Basis',
      ],
      answer: [1, 3, 0, 2],
      explanation: 'WEP: gebrochen. WPA/TKIP: Übergangslösung, veraltet. WPA2: AES-CCMP, Personal mit PSK offline angreifbar (starkes Passwort nötig). WPA3: SAE, PMF Pflicht, aktueller Standard.',
    },
    {
      id: 'm14-q028',
      kind: 'multi',
      skill: 'sec.wlan',
      difficulty: 2,
      prompt: 'Welche Maßnahmen erhöhen die WLAN-Sicherheit **tatsächlich**? (Mehrere Antworten)',
      options: [
        'WPA3 bzw. WPA2/WPA3-Enterprise einsetzen',
        'WPS deaktivieren',
        'Firmware der Access Points aktuell halten',
        'Gäste in ein eigenes VLAN mit Client Isolation legen',
        'Die SSID verstecken',
        'Einen MAC-Adressfilter als einzige Schutzmaßnahme nutzen',
      ],
      answer: [0, 1, 2, 3],
      explanation: 'Starke Verschlüsselung/Authentifizierung, WPS aus, Updates und Trennung der Gäste sind wirksam. Versteckte SSIDs werden trotzdem in Probe-Anfragen sichtbar, MAC-Adressen lassen sich leicht fälschen – beides ist Scheinsicherheit.',
    },
    {
      id: 'm14-q037',
      kind: 'free',
      skill: 'sec.wlan',
      difficulty: 2,
      prompt: 'Die Elektro Krämer GmbH möchte Besuchern WLAN anbieten. Beschreiben Sie ein **sicheres Konzept für das Gäste-WLAN** mit mindestens vier Maßnahmen.',
      modelAnswer:
        'Für Gäste wird eine eigene SSID eingerichtet, die einem eigenen VLAN mit eigenem IP-Subnetz zugeordnet ist. Per Firewall wird aus diesem VLAN nur der Zugriff ins Internet erlaubt (z. B. HTTP/HTTPS und DNS), jeglicher Zugriff auf interne Netze und die DMZ wird verweigert. Am Access Point wird Client Isolation aktiviert, damit sich Gäste-Geräte nicht gegenseitig erreichen. Das WLAN wird verschlüsselt, z. B. mit WPA3-Personal (SAE) und einem regelmäßig wechselnden Passwort, oder über ein Captive Portal bzw. Voucher-System mit Nutzungsbedingungen (bei offenem Netz besser OWE). Weitere Maßnahmen: kurze DHCP-Lease-Dauer, Bandbreitenbegrenzung, ggf. Inhaltsfilter, Protokollierung im Rahmen des Datenschutzes und WPS deaktivieren.',
      keywords: ['eigene SSID', 'eigenes VLAN', 'nur Internet', 'Firewall', 'Client Isolation', 'WPA3', 'SAE', 'wechselndes Passwort', 'Captive Portal', 'Bandbreite'],
      explanation: 'Kern: Trennung (VLAN + Firewall), Isolation, Verschlüsselung, Zugangskontrolle – und organisatorische Punkte wie Passwortwechsel.',
    },
    /* ---------- Bedrohungen ---------- */
    {
      id: 'm14-q029',
      kind: 'match',
      skill: 'sec.threats',
      difficulty: 2,
      prompt: 'Ordne den Bedrohungen die jeweils wirksamste Gegenmaßnahme zu.',
      left: ['Phishing', 'DDoS-Angriff auf den Webshop', 'Ransomware', 'Man-in-the-Middle im öffentlichen WLAN', 'Brute-Force auf das VPN-Login'],
      right: [
        'VPN bzw. TLS mit korrekter Zertifikatsprüfung',
        'Offline-Backups nach 3-2-1-Regel',
        'DDoS-Schutzdienst des Providers bzw. CDN',
        'MFA und Kontosperre nach Fehlversuchen',
        'Awareness-Schulung und MFA',
      ],
      answer: [4, 2, 1, 0, 3],
      explanation: 'Phishing → Schulung + MFA; DDoS → Filterung vor der eigenen Leitung (Provider/CDN); Ransomware → Offline-Backups; MITM → Ende-zu-Ende-Verschlüsselung; Brute Force → MFA + Sperre.',
    },
    {
      id: 'm14-q030',
      kind: 'single',
      skill: 'sec.threats',
      difficulty: 2,
      prompt: 'Bei einem **ARP-Spoofing-Angriff** …',
      options: [
        '… sendet der Angreifer gefälschte ARP-Antworten, damit Verkehr (z. B. zum Gateway) über seinen Rechner läuft',
        '… überflutet der Angreifer einen Webserver mit HTTP-Anfragen',
        '… errät der Angreifer Passwörter durch systematisches Ausprobieren',
        '… verschickt der Angreifer gefälschte E-Mails im Namen der Bank',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Das beschreibt einen (D)DoS-Angriff.', error: 'angriff-verwechselt' },
        '2': { why: 'Das ist Brute Force.', error: 'angriff-verwechselt' },
        '3': { why: 'Das ist Phishing.', error: 'angriff-verwechselt' },
      },
      explanation: 'ARP hat keine Authentifizierung. Der Angreifer behauptet, die IP des Gateways gehöre zu seiner MAC – Opfer schicken ihm ihren Verkehr (MITM). Schutz: Dynamic ARP Inspection, Verschlüsselung.',
    },
    {
      id: 'm14-q031',
      kind: 'single',
      skill: 'sec.threats',
      difficulty: 1,
      prompt: 'Ein Mitarbeiter hat einen privaten WLAN-Router an eine Netzwerkdose im Lager angeschlossen, um besseres WLAN zu haben. Wie nennt man ein solches Gerät aus Sicherheitssicht?',
      options: ['Rogue Access Point', 'Reverse-Proxy', 'Honeypot', 'Bastion Host'],
      answer: 0,
      distractors: {
        '1': { why: 'Ein Reverse-Proxy steht vor Servern und vermittelt Anfragen.', error: 'begriff-verwechselt' },
        '2': { why: 'Ein Honeypot ist eine absichtlich aufgestellte Falle für Angreifer.', error: 'begriff-verwechselt' },
        '3': { why: 'Ein Bastion Host ist ein gehärteter Zugangsserver.', error: 'begriff-verwechselt' },
      },
      explanation: 'Ein nicht genehmigter Access Point umgeht alle Sicherheitsmaßnahmen und öffnet das Firmennetz ggf. für jeden in Funkreichweite. Gegenmaßnahmen: 802.1X an den Ports, WIPS, klare Richtlinien.',
    },
    {
      id: 'm14-q032',
      kind: 'single',
      skill: 'sec.threats',
      difficulty: 1,
      prompt: 'Was unterscheidet einen **DDoS**- von einem einfachen **DoS**-Angriff?',
      options: [
        'Beim DDoS greifen viele verteilte Systeme (z. B. ein Botnetz) gleichzeitig an',
        'DDoS richtet sich gegen die Vertraulichkeit, DoS gegen die Verfügbarkeit',
        'DDoS funktioniert nur im WLAN',
        'DDoS ist ein Phishing-Angriff per E-Mail',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Beide richten sich gegen die Verfügbarkeit.', error: 'schutzziel-verwechselt' },
        '2': { why: 'DDoS-Angriffe kommen typischerweise aus dem Internet.', error: 'fakt-falsch' },
        '3': { why: 'Phishing ist eine andere Angriffsart.', error: 'angriff-verwechselt' },
      },
      explanation: 'Distributed Denial of Service: Viele (oft gekaperte) Geräte überlasten ein Ziel gleichzeitig. Weil der Verkehr aus vielen Quellen kommt, hilft das Sperren einzelner IPs kaum – Schutz meist beim Provider/CDN.',
    },
    {
      id: 'm14-q033',
      kind: 'multi',
      skill: 'sec.threats',
      difficulty: 2,
      prompt: 'Welche Merkmale deuten auf eine **Phishing-Mail** hin? (Mehrere Antworten)',
      options: [
        'Absenderadresse mit leicht abweichender Domain (z. B. elektro-kraerner.de)',
        'Starker Zeitdruck („Ihr Konto wird in 2 Stunden gesperrt!“)',
        'Link, dessen Ziel beim Überfahren mit der Maus eine fremde Domain zeigt',
        'Aufforderung, Zugangsdaten über einen Link einzugeben',
        'Die Mail ist an die Abteilungsadresse statt an dich persönlich adressiert',
      ],
      answer: [0, 1, 2, 3],
      explanation: 'Ähnliche Domains, Druck, verschleierte Links und Abfrage von Zugangsdaten sind klassische Merkmale. Eine Mail an eine Abteilungsadresse ist für sich allein kein Hinweis.',
    },
    {
      id: 'm14-q034',
      kind: 'single',
      skill: 'sec.threats',
      difficulty: 2,
      prompt: 'Welche Maßnahme schützt am besten gegen **Sniffing** von Anmeldedaten im Netzwerk?',
      options: [
        'Verwendung verschlüsselter Protokolle wie HTTPS, SSH und SFTP statt HTTP, Telnet und FTP',
        'Einsatz eines Hubs statt eines Switches',
        'Längere DHCP-Lease-Dauer',
        'Deaktivieren von IPv6',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Ein Hub verteilt alle Pakete an alle Ports – das erleichtert Sniffing sogar.', error: 'hub-switch' },
        '2': { why: 'Die Lease-Dauer hat keinen Einfluss auf das Mitlesen.', error: 'massnahme-unpassend' },
        '3': { why: 'Das ändert nichts an unverschlüsselten Inhalten.', error: 'massnahme-unpassend' },
      },
      explanation: 'Mitgeschnittene, verschlüsselte Daten sind für den Angreifer wertlos. Telnet, FTP und HTTP übertragen Passwörter dagegen im Klartext.',
    },
    {
      id: 'm14-q036',
      kind: 'text',
      skill: 'sec.threats',
      difficulty: 1,
      prompt: 'Wie heißt die Backup-Regel „**3** Kopien, **2** verschiedene Medien, **1** Kopie außer Haus“? (Zahlenfolge mit Bindestrichen)',
      accept: ['3-2-1', '3-2-1-Regel', '321', '3 2 1', '3-2-1 Regel'],
      placeholder: 'x-y-z',
      explanation: 'Die 3-2-1-Regel. Oft ergänzt zu 3-2-1-1-0: eine Kopie offline/unveränderlich, 0 Fehler bei der Wiederherstellungsprüfung.',
    },
    {
      id: 'm14-q040',
      kind: 'free',
      skill: 'sec.threats',
      difficulty: 3,
      prompt: 'Erläutern Sie, wie ein **Man-in-the-Middle-Angriff** in einem lokalen Netz mithilfe von **ARP-Spoofing** abläuft, und nennen Sie technische Gegenmaßnahmen.',
      modelAnswer:
        'ARP ordnet im lokalen Netz IP-Adressen MAC-Adressen zu und hat keine Authentifizierung. Der Angreifer sendet gefälschte ARP-Antworten (Gratuitous ARP) an das Opfer, in denen er behauptet, die IP-Adresse des Standardgateways gehöre zu seiner MAC-Adresse; ebenso täuscht er dem Gateway vor, die IP des Opfers gehöre zu ihm. Beide aktualisieren ihren ARP-Cache, sodass der Verkehr über den Rechner des Angreifers läuft. Dieser leitet die Pakete weiter, damit nichts auffällt, kann sie aber mitlesen und manipulieren (Verletzung von Vertraulichkeit und Integrität). Gegenmaßnahmen: Dynamic ARP Inspection in Verbindung mit DHCP Snooping auf den Switches, Netzsegmentierung (kleine VLANs), 802.1X zur Zugangskontrolle, Ende-zu-Ende-Verschlüsselung (TLS, VPN) mit strikter Zertifikatsprüfung, Monitoring auf ARP-Anomalien (z. B. mehrere IPs mit derselben MAC), ggf. statische ARP-Einträge für kritische Systeme.',
      keywords: ['gefälschte ARP-Antworten', 'Gateway', 'MAC-Adresse', 'ARP-Cache', 'weiterleiten', 'mitlesen', 'Dynamic ARP Inspection', 'DHCP Snooping', 'Verschlüsselung', '802.1X'],
      explanation: 'Wichtig: fehlende Authentifizierung bei ARP, die Umleitung über den Angreifer und mehrere passende technische Gegenmaßnahmen.',
    },
  ],
};
