import type { Module } from '../types';

export const m08: Module = {
  id: 'm08',
  nr: 8,
  title: 'Switching und VLAN',
  short: `Wie ein Switch Frames anhand von MAC-Adressen zustellt und wie VLANs ein physisches Netz in getrennte logische Netze aufteilen.`,
  icon: 'Network',
  relevance: 'ap1',
  prerequisites: ['m01', 'm02'],
  skills: [
    { id: 'mac.address', module: 'm08', title: 'Aufbau von MAC-Adressen (48 Bit, OUI, Schreibweisen)' },
    { id: 'mac.casting', module: 'm08', title: 'Unicast, Broadcast, Multicast unterscheiden', requires: ['mac.address'] },
    { id: 'switch.function', module: 'm08', title: 'Arbeitsweise eines Switches (Learning, Flooding, Forwarding, Filtering, Aging)', requires: ['mac.address'] },
    { id: 'switch.mactable', module: 'm08', title: 'MAC-Adresstabelle lesen und ausfüllen', requires: ['switch.function'] },
    { id: 'switch.domains', module: 'm08', title: 'Kollisions- und Broadcastdomänen bestimmen', requires: ['switch.function'] },
    { id: 'vlan.basics', module: 'm08', title: 'VLAN-Grundlagen und Nutzen', requires: ['switch.domains'] },
    { id: 'vlan.access', module: 'm08', title: 'Portbasierte VLANs und Access-Ports', requires: ['vlan.basics'] },
    { id: 'vlan.trunk', module: 'm08', title: 'Trunk-Ports und IEEE 802.1Q-Tagging', requires: ['vlan.access'] },
    { id: 'vlan.routing', module: 'm08', title: 'Inter-VLAN-Routing (Router-on-a-Stick, Layer-3-Switch)', requires: ['vlan.trunk'] },
    { id: 'switch.stp', module: 'm08', title: 'Spanning Tree: Schleifen vermeiden', requires: ['switch.function'] },
    { id: 'switch.lacp', module: 'm08', title: 'Link Aggregation (LACP)', requires: ['switch.function'] },
    { id: 'mac.oui', module: 'm08', title: 'OUI aus Hex- und Binärdarstellung bestimmen', requires: ['mac.address', 'bin.bin2dec'] },
    { id: 'switch.select', module: 'm08', title: 'Switch nach Datenblatt auswählen (managed/unmanaged, Ports, PoE)', requires: ['switch.function'] },
    { id: 'switch.poebudget', module: 'm08', title: 'PoE-Budget berechnen (PSE vs. PD)', requires: ['switch.select'] },
  ],
  generators: ['mac.oui', 'switch.poebudget', 'switch.select'],
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'm08-l01',
      title: 'MAC-Adressen und Zustellarten',
      minutes: 20,
      relevance: 'ap1',
      skills: ['mac.address', 'mac.casting', 'mac.oui'],
      simple: `Die **MAC-Adresse** ist wie der Name am Klingelschild: Sie sagt, welches Gerät hier im Haus (im lokalen Netz) gemeint ist.
Die IP-Adresse ist dagegen die Postanschrift, die bis zum Ziel gilt.
Eine MAC-Adresse hat **48 Bit** und wird als 12 Hexadezimalziffern geschrieben, z. B. 00:1A:2B:3C:4D:5E.
Die ersten 3 Byte (**OUI**, Herstellerkennung) verraten den Hersteller, die letzten 3 Byte nummeriert der Hersteller selbst.
FF:FF:FF:FF:FF:FF ist der Broadcast – die Durchsage an alle.

**Merke:** MAC = 48 Bit, erste 24 Bit = OUI (Hersteller), Broadcast = FF:FF:FF:FF:FF:FF.`,
      steps: [
        {
          type: 'explain',
          title: 'Warum braucht man überhaupt MAC-Adressen?',
          body: `Stell dir ein Büro der **Elektro Krämer GmbH** in Hamburg vor: 30 PCs, zwei Drucker und ein Server hängen an einem Switch. Wenn der PC von Frau Yilmaz etwas zum Drucker schickt, muss *irgendwie* klar sein, welches Gerät im lokalen Netz gemeint ist. Genau dafür gibt es die **MAC-Adresse** (Media Access Control).

Die MAC-Adresse ist die **Hardware-Adresse einer Netzwerkschnittstelle** auf **Schicht 2 (Sicherungsschicht)** des OSI-Modells. Jede Netzwerkkarte, jeder WLAN-Adapter und jeder Router-Port hat eine eigene MAC-Adresse. Sie wird vom Hersteller vergeben („eingebrannt“, *Burned-In Address*), kann aber per Software überschrieben werden (z. B. MAC-Randomisierung bei Smartphones im WLAN).

Wichtig für das Verständnis:

- Die **MAC-Adresse** ist nur **im lokalen Netzsegment** (bis zum nächsten Router) von Bedeutung.
- Die **IP-Adresse** (Schicht 3) ist die **logische Adresse**, die Ende-zu-Ende über Router hinweg gilt.
- Ein Switch arbeitet **nur** mit MAC-Adressen – IP-Adressen interessieren einen klassischen Layer-2-Switch nicht.

Eine gute Eselsbrücke: Die IP-Adresse ist die Postanschrift („wohin soll das Paket am Ende?“), die MAC-Adresse ist der Name am Klingelschild im Hausflur („wem gebe ich es hier im Haus?“).`,
        },
        {
          type: 'explain',
          title: 'Aufbau einer MAC-Adresse',
          body: `Eine MAC-Adresse ist **48 Bit = 6 Byte** lang. Man schreibt sie als **12 Hexadezimalziffern** (jede Hex-Ziffer = 4 Bit, 12 × 4 = 48).

| Teil | Länge | Bedeutung |
|---|---|---|
| **OUI** (Organizationally Unique Identifier) | erste 24 Bit (3 Byte) | Herstellerkennung, von der IEEE vergeben |
| Gerätekennung | letzte 24 Bit (3 Byte) | vom Hersteller fortlaufend vergeben |

Beispiel: \`00:1A:2B:3C:4D:5E\` → OUI \`00:1A:2B\`, Geräteteil \`3C:4D:5E\`.

**Schreibweisen** – alle meinen dieselbe Adresse:

| Schreibweise | Typisch bei |
|---|---|
| \`00:1A:2B:3C:4D:5E\` | Linux, macOS, viele Switches |
| \`00-1A-2B-3C-4D-5E\` | Windows (\`ipconfig /all\`, \`getmac\`) |
| \`001A.2B3C.4D5E\` | Cisco (Dreiergruppen à 4 Hex-Ziffern) |

Groß- oder Kleinschreibung der Hex-Ziffern spielt keine Rolle.

**Zwei besondere Bits im ersten Byte:**

- **I/G-Bit** (Individual/Group) = das **niederwertigste Bit des ersten Bytes**. Ist es **0**, ist die Adresse **Unicast** (ein einzelnes Gerät). Ist es **1**, ist es eine **Gruppenadresse** (Multicast; der Broadcast ist der Spezialfall „alle Bits 1“).
- **U/L-Bit** (Universal/Local) = das zweitniedrigste Bit des ersten Bytes. **0** = weltweit eindeutig vom Hersteller vergeben, **1** = lokal administriert (z. B. zufällige WLAN-MAC, virtuelle Maschinen).

Praktischer Trick: Ist die **zweite Hex-Ziffer ungerade** (1, 3, 5, 7, 9, B, D, F), ist das I/G-Bit gesetzt → Gruppenadresse. Beispiel \`01:00:5E:…\` → zweite Ziffer 1 → Multicast.`,
        },
        {
          type: 'explain',
          title: 'Die OUI zwischen Hex und Binär umrechnen',
          body: `In Herstellerlisten oder Datenblättern steht die OUI manchmal **binär**, die MAC-Adresse im \`ipconfig /all\` aber **hexadezimal**. Um beides zu vergleichen, musst du umrechnen. Das ist einfacher, als es aussieht, denn:

> **Eine Hex-Ziffer = genau 4 Bit** (ein *Nibble*). Ein Byte = 2 Hex-Ziffern = 8 Bit. Die OUI (3 Byte) = 6 Hex-Ziffern = 24 Bit.

Du rechnest also **jede Hex-Ziffer einzeln** mit den Stellenwerten **8 – 4 – 2 – 1** um:

| Hex | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | A | B | C | D | E | F |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dezimal | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
| Binär | 0000 | 0001 | 0010 | 0011 | 0100 | 0101 | 0110 | 0111 | 1000 | 1001 | 1010 | 1011 | 1100 | 1101 | 1110 | 1111 |

**Hex → Binär**, Beispiel OUI \`3C-5A-B4\`:

| Hex-Ziffer | 3 | C | 5 | A | B | 4 |
|---|---|---|---|---|---|---|
| Wert | 3 = 2 + 1 | 12 = 8 + 4 | 5 = 4 + 1 | 10 = 8 + 2 | 11 = 8 + 2 + 1 | 4 |
| Binär | 0011 | 1100 | 0101 | 1010 | 1011 | 0100 |

→ \`00111100 01011010 10110100\`

**Binär → Hex:** Die 24 Bit von **links** in Vierergruppen teilen und jede Gruppe in eine Hex-Ziffer umwandeln. Beispiel \`1010 1100 | 0001 1111 | 0110 1011\` → A C | 1 F | 6 B → **AC-1F-6B**.

**Typische Fehler:**
- die **letzten** drei Bytes (Gerätekennung) statt der ersten nehmen,
- führende Nullen weglassen (\`0A\` ist \`00001010\`, nicht \`1010\`),
- Bytes oder Bits in **umgekehrter Reihenfolge** lesen.

Nebenbei siehst du im ersten Byte die beiden Sonderbits: \`3C\` = \`0011 1100\` → letztes Bit 0 (Unicast), vorletztes Bit 0 (weltweit eindeutig).`,
        },
        {
          type: 'explain',
          title: 'Zustellarten: Unicast, Broadcast, Multicast (und Anycast)',
          body: `Je nachdem, **an wen** ein Frame gehen soll, unterscheidet man:

| Zustellart | Empfänger | Ziel-MAC | Beispiel |
|---|---|---|---|
| **Unicast** | genau **ein** Gerät | MAC des Zielgeräts (I/G-Bit = 0) | PC schickt Druckauftrag an Drucker |
| **Broadcast** | **alle** Geräte im Netz (in der Broadcastdomäne) | \`FF:FF:FF:FF:FF:FF\` | ARP-Request, DHCP-Discover |
| **Multicast** | eine **Gruppe** interessierter Geräte | I/G-Bit = 1, z. B. \`01:00:5E:xx:xx:xx\` (IPv4-Multicast) | IPTV, Routingprotokolle wie OSPF |
| **Anycast** | der **nächstgelegene** von mehreren Empfängern | – (Konzept auf Schicht 3) | nur bei **IPv6** als eigener Adresstyp, z. B. DNS-Root-Server |

Zum **Broadcast**: \`FF:FF:FF:FF:FF:FF\` heißt binär 48 Einsen. Jedes Gerät im selben Netz nimmt diesen Frame an und verarbeitet ihn. Router leiten Broadcasts **nicht** weiter – deshalb endet ein Broadcast an der Grenze der **Broadcastdomäne**.

Zu **Anycast**: Das ist kein Ethernet-Begriff. In **IPv6** gibt es Anycast-Adressen als eigenen Adresstyp – mehrere Geräte tragen dieselbe Adresse, und das Routing liefert an das „nächste“. IPv6 kennt dafür **keinen Broadcast** mehr (dafür Multicast). Für AP1 reicht: *Anycast = an einen von mehreren, den nächstgelegenen; typisch IPv6.*`,
        },
        {
          type: 'visual',
          title: 'Die vier Zustellarten auf einen Blick',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Unicast', text: 'Einer an einen. Ziel-MAC ist die Adresse genau eines Geräts.', icon: 'ArrowRight' },
                { title: 'Broadcast', text: 'Einer an alle im Netz. Ziel-MAC FF:FF:FF:FF:FF:FF.', icon: 'Radio' },
                { title: 'Multicast', text: 'Einer an eine Gruppe. I/G-Bit = 1, z. B. 01:00:5E:…', icon: 'Users' },
                { title: 'Anycast', text: 'Einer an den nächsten von mehreren. Eigener Adresstyp bei IPv6.', icon: 'Target' },
              ],
            },
          },
          caption: `Merke: Broadcast gibt es nur bei IPv4/Ethernet. IPv6 ersetzt ihn durch Multicast und kennt zusätzlich Anycast.`,
        },
        {
          type: 'example',
          title: 'MAC-Adresse analysieren',
          problem: `Bei der Elektro Krämer GmbH findest du im Switch-Log die Adresse \`01-00-5E-00-00-FB\`. Ist das eine Unicast-, Multicast- oder Broadcast-Adresse? Welche OUI hat sie?`,
          steps: [
            { label: 'Schreibweise erkennen', body: `Bindestriche → Windows-Schreibweise. Sechs Byte: \`01\`, \`00\`, \`5E\`, \`00\`, \`00\`, \`FB\`.` },
            { label: 'Broadcast prüfen', body: `Broadcast wäre \`FF-FF-FF-FF-FF-FF\`. Ist es nicht.` },
            { label: 'I/G-Bit prüfen', body: `Erstes Byte \`01\` = binär \`0000 0001\`. Das niederwertigste Bit ist **1** → Gruppenadresse → **Multicast**. (Trick: zweite Hex-Ziffer \`1\` ist ungerade.)` },
            { label: 'OUI bestimmen', body: `Die ersten 3 Byte: \`01-00-5E\`. Dieser Bereich ist für **IPv4-Multicast** reserviert (hier: mDNS, 224.0.0.251).` },
          ],
          result: `Multicast-Adresse, OUI-Teil \`01-00-5E\` (IPv4-Multicast-Bereich).`,
        },
        {
          type: 'example',
          title: 'Hersteller aus einer binären OUI-Liste bestimmen',
          problem: `Bei der Inventur im Lager Hamburg liegen drei Netzwerkkarten ohne Aufkleber. \`getmac\` zeigt:

| Karte | MAC-Adresse |
|---|---|
| 1 | \`3C-5A-B4-10-22-01\` |
| 2 | \`AC-1F-6B-00-12-9F\` |
| 3 | \`00-1A-2B-3C-4D-5E\` |

Der Anhang des Lieferanten-Datenblatts nennt die OUIs binär (Herstellernamen frei erfunden):

| Hersteller | OUI (binär) |
|---|---|
| Nordnetz | \`0000 0000  0001 1010  0010 1011\` |
| Elbtech | \`1010 1100  0001 1111  0110 1011\` |
| Hansa Devices | \`0011 1100  0101 1010  1011 0100\` |

Ordne jeder Karte ihren Hersteller zu.`,
          steps: [
            { label: '1. Nur die OUI betrachten', body: `Von jeder MAC zählen nur die **ersten drei Bytes**: Karte 1 → \`3C-5A-B4\`, Karte 2 → \`AC-1F-6B\`, Karte 3 → \`00-1A-2B\`.` },
            { label: '2. Liste in Hex umrechnen', body: `Vierergruppen mit 8-4-2-1 lesen:\n- Nordnetz: 0000 0000 | 0001 1010 | 0010 1011 → 0 0 | 1 A | 2 B → **00-1A-2B**\n- Elbtech: 1010 1100 | 0001 1111 | 0110 1011 → A C | 1 F | 6 B → **AC-1F-6B**\n- Hansa Devices: 0011 1100 | 0101 1010 | 1011 0100 → 3 C | 5 A | B 4 → **3C-5A-B4**` },
            { label: '3. Vergleichen', body: `Karte 1 (3C-5A-B4) = Hansa Devices · Karte 2 (AC-1F-6B) = Elbtech · Karte 3 (00-1A-2B) = Nordnetz.` },
          ],
          result: `Karte 1 → **Hansa Devices**, Karte 2 → **Elbtech**, Karte 3 → **Nordnetz**. Tipp: Rechne immer die **kürzere** Seite um – meist ist Binär → Hex schneller, weil du nur sechs Vierergruppen lesen musst.`,
        },
        {
          type: 'check',
          question: {
            id: 'm08-l01-c1',
            kind: 'single',
            skill: 'mac.address',
            difficulty: 1,
            prompt: `Wie viele Bit umfasst eine MAC-Adresse?`,
            options: ['32 Bit', '48 Bit', '64 Bit', '128 Bit'],
            answer: 1,
            distractors: {
              '0': { why: '32 Bit ist die Länge einer IPv4-Adresse.', error: 'mac-ipv4-verwechselt' },
              '2': { why: '64 Bit ist z. B. die Länge des IPv6-Interface-Identifiers (EUI-64), nicht der MAC.', error: 'mac-eui64-verwechselt' },
              '3': { why: '128 Bit ist die Länge einer IPv6-Adresse.', error: 'mac-ipv6-verwechselt' },
            },
            explanation: `Eine MAC-Adresse hat **48 Bit = 6 Byte**, geschrieben als 12 Hex-Ziffern.`,
          },
        },
        {
          type: 'check',
          question: {
            id: 'm08-l01-c2',
            kind: 'single',
            skill: 'mac.casting',
            difficulty: 2,
            prompt: `Ein PC sendet einen Frame an die Ziel-MAC \`FF:FF:FF:FF:FF:FF\`. Wer verarbeitet diesen Frame?`,
            options: [
              'Nur der Switch',
              'Nur das Standardgateway',
              'Alle Geräte in derselben Broadcastdomäne',
              'Alle Geräte im Internet',
            ],
            answer: 2,
            distractors: {
              '0': { why: 'Der Switch leitet den Broadcast an alle Ports weiter, verarbeitet ihn aber nicht als Empfänger.', error: 'broadcast-switch' },
              '1': { why: 'Das Gateway bekommt den Broadcast zwar auch, aber nicht exklusiv.', error: 'broadcast-gateway' },
              '3': { why: 'Router leiten Broadcasts nicht weiter – ein Broadcast bleibt in der Broadcastdomäne.', error: 'broadcast-router' },
            },
            explanation: `\`FF:FF:FF:FF:FF:FF\` ist die **Broadcast-MAC**. Alle Geräte in der **Broadcastdomäne** (also bis zum nächsten Router bzw. innerhalb des VLANs) nehmen den Frame an.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: MAC-Adressen und Zustellarten',
          questionIds: ['m08-q001', 'm08-q002', 'm08-q003', 'm08-q004', 'm08-q005', 'm08-q006', 'm08-q040', 'm08-q041', 'm08-q042'],
          count: 4,
          difficulty: 1,
        },
        { type: 'practice', title: 'Übung: OUI umrechnen und Hersteller bestimmen', generator: 'mac.oui', count: 3, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'MAC-Adresse = 48 Bit Hardware-Adresse auf Schicht 2, gilt nur im lokalen Segment.',
            'Erste 24 Bit = OUI (Hersteller), letzte 24 Bit = Gerätekennung.',
            'Schreibweisen: 00:1A:2B:… (Linux), 00-1A-2B-… (Windows), 001A.2B3C.4D5E (Cisco).',
            'Broadcast-MAC = FF:FF:FF:FF:FF:FF; I/G-Bit = 1 → Gruppenadresse (Multicast).',
            'Anycast ist ein IPv6-Konzept (an den nächsten von mehreren); IPv6 kennt keinen Broadcast.',
            'OUI umrechnen: jede Hex-Ziffer = 4 Bit (8-4-2-1); immer die ersten drei Bytes vergleichen.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm08-l02',
      title: 'So arbeitet ein Switch',
      minutes: 25,
      relevance: 'ap1',
      skills: ['switch.function', 'switch.mactable'],
      simple: `Ein **Switch** ist wie ein Postbote, der sich merkt, wer in welcher Wohnung wohnt.
Bei jedem Frame (Datenrahmen) schaut er auf den Absender und notiert: „Dieses Gerät wohnt an Anschluss 3“ – das ist das **Lernen aus der Quell-MAC**.
Für die Zustellung schaut er auf den Empfänger: Kennt er ihn, gibt er den Frame nur an diesen Anschluss (**Forwarding**).
Kennt er ihn nicht, verteilt er den Frame an alle anderen Anschlüsse (**Flooding**).
Alte Einträge vergisst er nach einiger Zeit wieder (**Aging**).

**Merke:** Lernen aus der Quell-MAC, Weiterleiten nach der Ziel-MAC.`,
      steps: [
        {
          type: 'explain',
          title: 'Der Switch als „lernender Verteiler“',
          body: `Ein **Switch** ist ein **Layer-2-Gerät**: Er liest von jedem eingehenden Ethernet-Frame die **Quell-MAC** und die **Ziel-MAC** und entscheidet anhand seiner **MAC-Adresstabelle** (auch *CAM-Tabelle* oder *Source Address Table, SAT*), an welchen Port der Frame weitergeleitet wird.

Anders als ein **Hub**, der jedes Signal stumpf an alle Ports verteilt, stellt ein Switch Unicast-Frames **gezielt** zu. Dadurch:

- können mehrere Geräte **gleichzeitig** senden (jeder Port arbeitet unabhängig, **Vollduplex**),
- sieht ein PC nicht den Datenverkehr der anderen,
- steigt die nutzbare Bandbreite deutlich.

Ein neuer Switch kennt anfangs **keine einzige** MAC-Adresse. Er lernt sie automatisch – man muss nichts konfigurieren (*Plug and Play*).

> **Hinweis zu den Begriffen:** Die MAC-Adresstabelle heißt je nach Buch oder Hersteller auch *Forwarding Table*, *Switching Table*, *Bridge Table* oder *CAM-Tabelle*. Manche Arbeitsblätter nennen sie „ARP-Tabelle des Switches“ – das ist **falsch**. Die **ARP-Tabelle** (ARP-Cache) führt ein **PC oder Router**: Sie ordnet **IP-Adressen** MAC-Adressen zu. Die **MAC-Tabelle** des Switches ordnet **MAC-Adressen Ports** zu.`,
        },
        {
          type: 'explain',
          title: 'Die fünf Grundfunktionen',
          body: `Merke dir diese fünf Begriffe – sie sind der Kern jeder Switch-Aufgabe:

| Funktion | Was passiert? | Auslöser |
|---|---|---|
| **Learning** (Lernen) | Der Switch trägt die **Quell-MAC** des Frames mit dem **Eingangsport** in die MAC-Tabelle ein. | **jeder** eingehende Frame |
| **Flooding** (Fluten) | Der Frame wird an **alle Ports außer dem Eingangsport** geschickt. | Ziel-MAC **unbekannt** (*Unknown Unicast*) **oder** Broadcast (**oder** Multicast ohne besondere Konfiguration) |
| **Forwarding** (Weiterleiten) | Der Frame geht **nur an den einen Port**, der in der Tabelle steht. | Ziel-MAC bekannt, Port ≠ Eingangsport |
| **Filtering** (Filtern) | Der Frame wird **verworfen**, nicht weitergeleitet. | Ziel-MAC liegt am **selben** Port, über den der Frame kam (Ziel ist „schon da“) – außerdem fehlerhafte Frames (FCS-Fehler) |
| **Aging** (Altern) | Einträge, die eine bestimmte Zeit nicht mehr als Quelle aufgetaucht sind, werden gelöscht. | Timer, typisch **300 Sekunden** (Cisco-Standard) |

**Ganz wichtig:** Gelernt wird **immer aus der Quell-MAC**, entschieden wird **immer anhand der Ziel-MAC**. Diese Verwechslung ist der häufigste Prüfungsfehler.

Warum Aging? Geräte werden umgesteckt oder abgeschaltet. Ohne Aging würde der Switch Frames an Ports schicken, an denen das Gerät gar nicht mehr hängt, und die Tabelle würde volllaufen.`,
        },
        {
          type: 'visual',
          title: 'Simulation: Der Switch lernt',
          widget: { kind: 'mac-table' },
          caption: `Schicke nacheinander Frames zwischen den PCs und beobachte: Beim ersten Frame zu einem unbekannten Ziel wird geflutet; sobald das Ziel selbst etwas gesendet hat, kennt der Switch seinen Port und leitet gezielt weiter.`,
        },
        {
          type: 'example',
          title: 'Ein Switch lernt Schritt für Schritt',
          problem: `Ein frisch gestarteter Switch (leere MAC-Tabelle) hat vier Ports:

| Port | Gerät | MAC (gekürzt) |
|---|---|---|
| 1 | PC-A | AA |
| 2 | PC-B | BB |
| 3 | Drucker | CC |
| 4 | Server | DD |

Es werden nacheinander gesendet: **(1)** A → B, **(2)** B → A, **(3)** A → B, **(4)** C → Broadcast. Was macht der Switch jeweils, und wie sieht die Tabelle am Ende aus?`,
          steps: [
            { label: 'Frame 1: A → B', body: `**Learning:** Quell-MAC AA an Port 1 → Eintrag *AA – Port 1*. **Entscheidung:** Ziel BB ist unbekannt → **Flooding** an Port 2, 3, 4. B nimmt an, C und D verwerfen den Frame (nicht ihre MAC).` },
            { label: 'Frame 2: B → A', body: `**Learning:** BB an Port 2 → Eintrag *BB – Port 2*. **Entscheidung:** Ziel AA steht in der Tabelle (Port 1) → **Forwarding** nur an Port 1.` },
            { label: 'Frame 3: A → B', body: `**Learning:** AA – Port 1 ist schon bekannt, der Aging-Timer wird zurückgesetzt. **Entscheidung:** BB bekannt (Port 2) → **Forwarding** nur an Port 2. Kein Fluten mehr!` },
            { label: 'Frame 4: C → Broadcast', body: `**Learning:** CC an Port 3 → Eintrag *CC – Port 3*. **Entscheidung:** Ziel \`FF:FF:FF:FF:FF:FF\` → Broadcast wird **immer geflutet**: an Port 1, 2, 4.` },
            { label: 'Endstand der Tabelle', body: `| MAC | Port |\n|---|---|\n| AA | 1 |\n| BB | 2 |\n| CC | 3 |\n\nDD fehlt – der Server hat noch nichts gesendet, also konnte der Switch seine MAC nicht lernen.` },
          ],
          result: `Fluten bei Frame 1 und 4, gezieltes Weiterleiten bei Frame 2 und 3. Tabelle: AA→1, BB→2, CC→3.`,
        },
        {
          type: 'check',
          question: {
            id: 'm08-l02-c1',
            kind: 'single',
            skill: 'switch.function',
            difficulty: 1,
            prompt: `Welche Adresse eines eingehenden Frames verwendet ein Switch, um seine MAC-Tabelle zu **füllen**?`,
            options: ['Die Ziel-MAC', 'Die Quell-MAC', 'Die Ziel-IP', 'Die Quell-IP'],
            answer: 1,
            distractors: {
              '0': { why: 'Die Ziel-MAC nutzt der Switch zur Weiterleitungsentscheidung, nicht zum Lernen.', error: 'switch-lernen-ziel' },
              '2': { why: 'Ein Layer-2-Switch wertet keine IP-Adressen aus.', error: 'switch-layer3' },
              '3': { why: 'Ein Layer-2-Switch wertet keine IP-Adressen aus.', error: 'switch-layer3' },
            },
            explanation: `Gelernt wird aus der **Quell-MAC** (wer hat gesendet, an welchem Port?). Die **Ziel-MAC** bestimmt die Weiterleitung.`,
          },
        },
        {
          type: 'check',
          question: {
            id: 'm08-l02-c2',
            kind: 'match',
            skill: 'switch.function',
            difficulty: 2,
            prompt: `Ordne jeder Situation die Switch-Aktion zu.`,
            left: [
              'Ziel-MAC steht nicht in der Tabelle',
              'Ziel-MAC steht an einem anderen Port als dem Eingangsport',
              'Ziel-MAC steht am selben Port wie der Eingangsport',
              'Eintrag wurde 300 s nicht mehr als Quelle gesehen',
            ],
            right: ['Forwarding', 'Aging', 'Flooding', 'Filtering'],
            answer: [2, 0, 3, 1],
            explanation: `Unbekanntes Ziel → **Flooding**; bekanntes Ziel an anderem Port → **Forwarding**; Ziel am Eingangsport → **Filtering** (verwerfen); alter Eintrag → **Aging** (löschen).`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: Switch-Logik',
          questionIds: ['m08-q007', 'm08-q008', 'm08-q009', 'm08-q010', 'm08-q011', 'm08-q012', 'm08-q013', 'm08-q053'],
          count: 5,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Ein Switch arbeitet auf Schicht 2 mit MAC-Adressen und einer MAC-Adresstabelle.',
            'Learning: Quell-MAC + Eingangsport werden eingetragen.',
            'Flooding: unbekannte Ziel-MAC oder Broadcast → an alle Ports außer dem Eingangsport.',
            'Forwarding: bekannte Ziel-MAC → nur an den passenden Port; Filtering: Ziel am Eingangsport → verwerfen.',
            'Aging: unbenutzte Einträge verfallen (typisch 300 s).',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm08-l03',
      title: 'Kollisions- und Broadcastdomänen',
      minutes: 20,
      relevance: 'ap1',
      skills: ['switch.domains'],
      simple: `Eine **Kollisionsdomäne** ist ein Raum, in dem immer nur einer reden darf; ein Hub macht aus allen Anschlüssen einen einzigen Raum.
Ein Switch gibt jedem Anschluss seinen eigenen Raum – darum zählt jeder Switch-Port als eigene Kollisionsdomäne.
Eine **Broadcastdomäne** ist das ganze Gebäude, in dem eine Lautsprecherdurchsage (Broadcast) zu hören ist.
Erst ein Router oder ein eigenes VLAN (virtuelles, abgetrenntes Netz) beendet sie.

**Merke:** Switch trennt Kollisionsdomänen, Router (und VLANs) trennen Broadcastdomänen.`,
      steps: [
        {
          type: 'explain',
          title: 'Zwei Arten von „Bereichen“',
          body: `In Prüfungen taucht oft die Frage auf: *„Wie viele Kollisions- und Broadcastdomänen hat dieses Netz?“* Dafür musst du zwei Begriffe sauber trennen.

**Kollisionsdomäne:** Der Bereich, in dem sich zwei gleichzeitig gesendete Signale gegenseitig stören (kollidieren) können. Das war bei **Hubs** und altem Koax-Ethernet ein Problem: Alle teilen sich ein Medium, es darf immer nur einer senden (Halbduplex, Zugriffsverfahren **CSMA/CD**).

**Broadcastdomäne:** Der Bereich, in dem ein **Broadcast** (Ziel-MAC \`FF:FF:FF:FF:FF:FF\`) ankommt. Praktisch ist das **ein IP-Netz bzw. ein VLAN**. Die Grenze bildet der **Router** (bzw. eine Layer-3-Schnittstelle).

| Gerät | OSI-Schicht | Kollisionsdomänen | Broadcastdomänen |
|---|---|---|---|
| **Hub** (Repeater) | 1 | **alle Ports = 1** gemeinsame | trennt nicht |
| **Switch** (Bridge) | 2 | **jeder Port = eigene** | trennt nicht (eine pro VLAN) |
| **Router** | 3 | jeder Port = eigene | **jedes Interface = eigene** |

Merksatz: **Switch trennt Kollisionsdomänen, Router trennt Broadcastdomänen.** Ein Hub trennt gar nichts.

Mit modernen Switches im **Vollduplex**-Betrieb gibt es praktisch keine Kollisionen mehr – jede Verbindung Switchport ↔ Gerät ist ihre eigene Kollisionsdomäne, in der nie zwei gegeneinander kollidieren. Das Konzept musst du aber für Zählaufgaben beherrschen.`,
        },
        {
          type: 'visual',
          title: 'Beispielnetz zum Zählen',
          widget: {
            kind: 'topology',
            data: {
              nodes: [
                { id: 'r', type: 'router', label: 'Router', x: 400, y: 60 },
                { id: 'sw', type: 'switch', label: 'Switch', x: 220, y: 190 },
                { id: 'hub', type: 'switch', label: 'Hub', sub: 'Layer 1', x: 580, y: 190 },
                { id: 'pc1', type: 'pc', label: 'PC1', x: 100, y: 340 },
                { id: 'pc2', type: 'pc', label: 'PC2', x: 220, y: 340 },
                { id: 'pc3', type: 'pc', label: 'PC3', x: 340, y: 340 },
                { id: 'pc4', type: 'pc', label: 'PC4', x: 500, y: 340 },
                { id: 'pc5', type: 'pc', label: 'PC5', x: 660, y: 340 },
              ],
              links: [
                { from: 'r', to: 'sw' },
                { from: 'r', to: 'hub' },
                { from: 'sw', to: 'pc1' },
                { from: 'sw', to: 'pc2' },
                { from: 'sw', to: 'pc3' },
                { from: 'hub', to: 'pc4' },
                { from: 'hub', to: 'pc5' },
              ],
              zones: [
                { label: 'Broadcastdomäne 1', x: 50, y: 140, w: 350, h: 260, color: 'blue' },
                { label: 'Broadcastdomäne 2', x: 450, y: 140, w: 300, h: 260, color: 'green' },
              ],
            },
          },
          caption: `Links: Switch mit 3 PCs, rechts: Hub mit 2 PCs, beide am Router.`,
        },
        {
          type: 'example',
          title: 'Domänen zählen',
          problem: `Bestimme für das Netz oben die Anzahl der Kollisions- und Broadcastdomänen.`,
          steps: [
            { label: 'Broadcastdomänen', body: `Der Router hat zwei genutzte Interfaces → **2 Broadcastdomänen** (links alles am Switch, rechts alles am Hub).` },
            { label: 'Kollisionsdomänen links (Switch)', body: `Jeder genutzte Switchport ist eine eigene Kollisionsdomäne: PC1, PC2, PC3 und die Leitung zum Router → **4**.` },
            { label: 'Kollisionsdomänen rechts (Hub)', body: `Ein Hub bildet **eine einzige** Kollisionsdomäne – inklusive der Leitung zum Router → **1**.` },
            { label: 'Summe', body: `4 + 1 = **5 Kollisionsdomänen**.` },
          ],
          result: `5 Kollisionsdomänen, 2 Broadcastdomänen.`,
        },
        {
          type: 'check',
          question: {
            id: 'm08-l03-c1',
            kind: 'single',
            skill: 'switch.domains',
            difficulty: 1,
            prompt: `Welches Gerät begrenzt eine **Broadcastdomäne**?`,
            options: ['Hub', 'Repeater', 'Layer-2-Switch', 'Router'],
            answer: 3,
            distractors: {
              '0': { why: 'Ein Hub arbeitet auf Schicht 1 und trennt weder Kollisions- noch Broadcastdomänen.', error: 'domain-hub' },
              '1': { why: 'Ein Repeater verstärkt nur Signale (Schicht 1).', error: 'domain-repeater' },
              '2': { why: 'Ein Switch flutet Broadcasts an alle Ports – er trennt nur Kollisionsdomänen (ohne VLANs).', error: 'domain-switch-broadcast' },
            },
            explanation: `Ein **Router** leitet Broadcasts nicht weiter. Jedes Router-Interface ist eine eigene Broadcastdomäne. (Mit VLANs teilt auch ein Switch die Broadcastdomänen auf – dazu gleich mehr.)`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: Domänen',
          questionIds: ['m08-q014', 'm08-q015', 'm08-q016', 'm08-q017'],
          count: 3,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Kollisionsdomäne: Bereich, in dem Signale kollidieren können (Hub = 1 für alle Ports).',
            'Broadcastdomäne: Bereich, den ein Broadcast erreicht = ein IP-Netz bzw. ein VLAN.',
            'Switch: jeder Port eigene Kollisionsdomäne, aber eine Broadcastdomäne (pro VLAN).',
            'Router: jedes Interface eigene Broadcastdomäne.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm08-l04',
      title: 'VLAN-Grundlagen und Access-Ports',
      minutes: 25,
      relevance: 'ap1',
      skills: ['vlan.basics', 'vlan.access'],
      simple: `Ein **VLAN** (Virtual LAN) teilt einen Switch in mehrere getrennte Netze – wie Trennwände, die in einem Gebäude Abteilungen abtrennen, obwohl alle unter einem Dach sind.
Geräte in VLAN 10 hören weder die Durchsagen (Broadcasts) noch den Verkehr von VLAN 20.
Welches VLAN ein Gerät bekommt, legt der Switch-Port fest: Ein **Access-Port** gehört genau zu einem VLAN.
Das Endgerät merkt davon nichts.
Zwischen VLANs kommt man nur über einen Router oder Layer-3-Switch.

**Merke:** Ein VLAN = eine eigene Broadcastdomäne; Endgeräte hängen an Access-Ports.`,
      steps: [
        {
          type: 'explain',
          title: 'Das Problem: ein großes flaches Netz',
          body: `Die Elektro Krämer GmbH hat in Hamburg alles an einem einzigen Switch-Netz hängen: Verwaltung, Produktionsrechner, Server und das Gäste-WLAN. Das bringt Probleme:

- **Sicherheit:** Ein Gast-Laptop kann direkt den Dateiserver mit Personaldaten erreichen.
- **Broadcasts:** Jeder ARP- oder DHCP-Broadcast landet bei **allen** Geräten – je mehr Geräte, desto mehr Grundlast.
- **Ordnung:** Keine Trennung nach Abteilungen, Fehler (z. B. ein Rogue-DHCP-Server) betreffen alle.

Die naheliegende Lösung wäre: für jede Abteilung einen eigenen Switch kaufen. Das ist teuer und unflexibel. Die elegante Lösung heißt **VLAN**.`,
        },
        {
          type: 'explain',
          title: 'Was ist ein VLAN?',
          body: `Ein **VLAN** (Virtual Local Area Network) teilt einen physischen Switch **logisch** in mehrere voneinander getrennte Netze. Jedes VLAN verhält sich so, als wäre es ein **eigener Switch**:

- Jedes VLAN ist eine **eigene Broadcastdomäne**.
- Geräte in unterschiedlichen VLANs können sich auf Schicht 2 **nicht direkt erreichen** – dafür braucht man einen **Router** bzw. Layer-3-Switch (Inter-VLAN-Routing).
- Jedes VLAN bekommt in der Praxis **ein eigenes IP-Subnetz**.

Ein VLAN wird durch eine **VLAN-ID** (Nummer) bezeichnet. Bei der Elektro Krämer GmbH könnte das so aussehen:

| VLAN-ID | Name | IP-Netz |
|---|---|---|
| 10 | Verwaltung | 10.10.10.0/24 |
| 20 | Produktion | 10.10.20.0/24 |
| 30 | Server | 10.10.30.0/24 |
| 99 | Gäste | 10.10.99.0/24 |

**Nutzen von VLANs** (prüfungsrelevant!):

1. **Sicherheit** durch Trennung (Zugriffe zwischen VLANs nur über Router/Firewall mit Regeln).
2. **Weniger Broadcastlast**, da Broadcasts im VLAN bleiben.
3. **Flexibilität:** Ein Mitarbeiter zieht um – nur die Port-Zuordnung ändern, keine Verkabelung.
4. **Kosten:** Ein Switch ersetzt mehrere physische Switches.
5. **Übersicht/Verwaltung:** logische Gliederung nach Abteilung oder Funktion (z. B. eigenes VLAN für VoIP).

VLANs sind in **IEEE 802.1Q** standardisiert.`,
        },
        {
          type: 'explain',
          title: 'Portbasierte VLANs und Access-Ports',
          body: `Die häufigste Art ist das **portbasierte VLAN** (*statisches VLAN*): Der Administrator legt am Switch fest, welcher Port zu welchem VLAN gehört. Das Endgerät merkt davon **nichts** – es weiß nicht, in welchem VLAN es ist.

Ein solcher Port heißt **Access-Port** (bei manchen Herstellern „untagged Port“):

- gehört zu **genau einem** VLAN (Daten-VLAN),
- Frames gehen **ohne** VLAN-Markierung (untagged) zum Endgerät,
- typisch für PCs, Drucker, Server, Access Points mit nur einem Netz.

Beispiel Switch \`SW-EG\` in Hamburg:

| Port | Gerät | Modus | VLAN |
|---|---|---|---|
| 1–10 | Verwaltungs-PCs | Access | 10 |
| 11–20 | Produktions-PCs | Access | 20 |
| 21 | Gäste-AP | Access | 99 |
| 24 | Uplink zum Core | Trunk | 10, 20, 30, 99 |

Andere VLAN-Arten (nur zur Einordnung): **MAC-basierte** VLANs (Zuordnung nach MAC-Adresse) und **dynamische VLANs** per **IEEE 802.1X** + RADIUS – der Port bekommt das VLAN nach erfolgreicher Anmeldung zugewiesen.

Hinweis: Viele Switches haben ab Werk alle Ports im **VLAN 1** (Default-VLAN). Aus Sicherheitsgründen nutzt man VLAN 1 im Betrieb möglichst nicht für Nutzdaten.`,
        },
        {
          type: 'visual',
          title: 'VLANs bei der Elektro Krämer GmbH (Hamburg)',
          widget: {
            kind: 'topology',
            data: {
              nodes: [
                { id: 'fw', type: 'firewall', label: 'Firewall', x: 400, y: 40 },
                { id: 'core', type: 'switch', label: 'Core-SW', sub: 'Layer 3', x: 400, y: 150 },
                { id: 'sw1', type: 'switch', label: 'SW-EG', x: 220, y: 260 },
                { id: 'sw2', type: 'switch', label: 'SW-OG', x: 580, y: 260 },
                { id: 'pc1', type: 'pc', label: 'Verw.', sub: 'VLAN 10', x: 100, y: 370 },
                { id: 'pc2', type: 'pc', label: 'Prod.', sub: 'VLAN 20', x: 220, y: 370 },
                { id: 'ap', type: 'ap', label: 'Gast-AP', sub: 'VLAN 99', x: 340, y: 370 },
                { id: 'pc3', type: 'pc', label: 'Verw.', sub: 'VLAN 10', x: 480, y: 370 },
                { id: 'srv', type: 'server', label: 'Server', sub: 'VLAN 30', x: 680, y: 370 },
              ],
              links: [
                { from: 'fw', to: 'core' },
                { from: 'core', to: 'sw1', label: 'Trunk', style: 'trunk' },
                { from: 'core', to: 'sw2', label: 'Trunk', style: 'trunk' },
                { from: 'sw1', to: 'pc1' },
                { from: 'sw1', to: 'pc2' },
                { from: 'sw1', to: 'ap' },
                { from: 'sw2', to: 'pc3' },
                { from: 'sw2', to: 'srv' },
              ],
              zones: [
                { label: 'VLAN 10', x: 55, y: 330, w: 90, h: 85, color: 'blue' },
                { label: 'VLAN 20', x: 175, y: 330, w: 90, h: 85, color: 'orange' },
                { label: 'VLAN 99', x: 295, y: 330, w: 90, h: 85, color: 'red' },
                { label: 'VLAN 10', x: 435, y: 330, w: 90, h: 85, color: 'blue' },
                { label: 'VLAN 30', x: 635, y: 330, w: 90, h: 85, color: 'purple' },
              ],
            },
          },
          caption: `Endgeräte hängen an Access-Ports (je ein VLAN). Zwischen den Switches laufen Trunks, die mehrere VLANs transportieren. Die beiden Verwaltungs-PCs sind im selben VLAN, obwohl sie an unterschiedlichen Switches hängen.`,
        },
        {
          type: 'example',
          title: 'Wer kann wen erreichen?',
          problem: `Am Switch \`SW-EG\` sind Port 1–10 VLAN 10 (Verwaltung), Port 11–20 VLAN 20 (Produktion). Es gibt (noch) **keinen Router** zwischen den VLANs. PC-A (Port 3, 10.10.10.5/24) pingt PC-B (Port 7, 10.10.10.8/24) und PC-C (Port 12, 10.10.20.5/24). Was klappt?`,
          steps: [
            { label: 'PC-A → PC-B', body: `Beide in VLAN 10 und im selben IP-Netz. Der ARP-Broadcast erreicht PC-B, der Switch leitet innerhalb des VLANs weiter → **Ping erfolgreich**.` },
            { label: 'PC-A → PC-C', body: `PC-C liegt in einem anderen IP-Netz (10.10.20.0/24). PC-A müsste das Paket an sein **Standardgateway** schicken. Es gibt aber keinen Router für die VLANs → **Ping schlägt fehl**.` },
            { label: 'Und auf Schicht 2?', body: `Selbst wenn man PC-C eine Adresse aus 10.10.10.0/24 geben würde: Der ARP-Broadcast von PC-A bleibt in VLAN 10 und erreicht Port 12 (VLAN 20) **nie**. VLANs trennen also schon auf Schicht 2.` },
          ],
          result: `Kommunikation nur innerhalb eines VLANs. Zwischen VLANs braucht man Inter-VLAN-Routing.`,
        },
        {
          type: 'check',
          question: {
            id: 'm08-l04-c1',
            kind: 'multi',
            skill: 'vlan.basics',
            difficulty: 2,
            prompt: `Welche Aussagen zu VLANs sind richtig? (Mehrfachauswahl)`,
            options: [
              'Jedes VLAN bildet eine eigene Broadcastdomäne.',
              'Geräte in verschiedenen VLANs können ohne Router direkt miteinander kommunizieren.',
              'VLANs können die Sicherheit erhöhen, indem sie Abteilungen trennen.',
              'Ein Endgerät an einem Access-Port muss die VLAN-ID kennen.',
              'VLANs reduzieren die Broadcastlast in einem Netz.',
            ],
            answer: [0, 2, 4],
            explanation: `VLANs = getrennte Broadcastdomänen → weniger Broadcasts, mehr Sicherheit. Zwischen VLANs braucht man **Routing**. Am Access-Port arbeitet das Endgerät **untagged** und kennt die VLAN-ID nicht.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: VLAN-Grundlagen',
          questionIds: ['m08-q018', 'm08-q019', 'm08-q020', 'm08-q021', 'm08-q022'],
          count: 4,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'VLAN = logische Aufteilung eines physischen Switches in getrennte Netze (IEEE 802.1Q).',
            'Jedes VLAN = eigene Broadcastdomäne = in der Praxis eigenes IP-Subnetz.',
            'Nutzen: Sicherheit, weniger Broadcasts, Flexibilität, Kostenersparnis, Übersicht.',
            'Portbasiertes VLAN: Access-Port gehört zu genau einem VLAN, Frames untagged.',
            'Zwischen VLANs nur über Router/Layer-3-Switch.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm08-l05',
      title: 'Trunk-Ports und IEEE 802.1Q',
      minutes: 25,
      relevance: 'ap1',
      skills: ['vlan.trunk'],
      simple: `Ein **Trunk-Port** ist wie ein Lieferwagen, der Pakete für mehrere Abteilungen gleichzeitig transportiert: Auf jedem Paket klebt ein Zettel mit der Abteilungsnummer.
Dieser Zettel heißt **Tag** (Markierung nach IEEE 802.1Q, 4 Byte groß) und enthält die VLAN-ID.
So genügt ein einziges Kabel zwischen zwei Switches für alle VLANs.
Am Ziel-Switch wird der Zettel gelesen und vor der Zustellung ans Endgerät wieder entfernt.
Vorsicht: Manche Hersteller nennen das Bündeln mehrerer Kabel ebenfalls „Trunk“ oder „Trunking“ – das ist Link Aggregation, etwas ganz anderes.

**Merke:** Trunk = mehrere VLANs über ein Kabel mit 802.1Q-Tag; VLAN-ID 12 Bit, nutzbar 1–4094.`,
      steps: [
        {
          type: 'explain',
          title: 'Mehrere VLANs über ein Kabel',
          body: `Die Elektro Krämer GmbH hat Verwaltungs-PCs im Erdgeschoss **und** im Obergeschoss – an zwei verschiedenen Switches. Beide gehören zu VLAN 10. Wie kommen die Frames von einem Switch zum anderen?

Variante 1: Für jedes VLAN ein eigenes Kabel zwischen den Switches. Bei 4 VLANs = 4 Kabel, 4 Ports – verschwenderisch.

Variante 2 (Standard): **ein einziges Kabel**, über das **alle VLANs** laufen. Damit der Empfänger weiß, zu welchem VLAN ein Frame gehört, wird jeder Frame **markiert** (*getaggt*). Ein solcher Port heißt **Trunk-Port** (bei manchen Herstellern „tagged Port“).

| | Access-Port | Trunk-Port |
|---|---|---|
| Anzahl VLANs | genau **eins** | **mehrere** |
| Frames | **untagged** | **tagged** (802.1Q), außer Native VLAN |
| typisch für | PCs, Drucker, Server | Switch ↔ Switch, Switch ↔ Router, Switch ↔ Hypervisor, Multi-SSID-AP |

> **Achtung, Begriffsfalle „Trunk“ vs. „Trunking“:** In diesem Modul (und bei Cisco) ist ein **Trunk** ein Port, der **mehrere VLANs getaggt** über ein Kabel transportiert. Einige Hersteller (z. B. in Weboberflächen kleinerer Switches) und manche Lehrbücher nennen dagegen das **Bündeln mehrerer Leitungen** zu einer logischen Verbindung „Trunk“ oder „Trunking“ – fachlich ist das **Link Aggregation** (LACP, IEEE 802.1AX), siehe Lektion „Redundanz“. In der Prüfung entscheidet der Zusammenhang: Geht es um **VLANs und Tags**, ist der VLAN-Trunk gemeint; geht es um **mehr Bandbreite durch mehrere Kabel**, die Link Aggregation. Im Zweifel den Begriff in der Antwort kurz erklären.`,
        },
        {
          type: 'explain',
          title: 'Der 802.1Q-Tag im Detail',
          body: `Der Standard **IEEE 802.1Q** fügt in den Ethernet-Frame **4 Byte (32 Bit)** zwischen **Quell-MAC** und **Typ-/Längenfeld** ein:

| Feld | Länge | Inhalt |
|---|---|---|
| **TPID** (Tag Protocol Identifier) | 16 Bit | immer \`0x8100\` – „Achtung, hier kommt ein VLAN-Tag“ |
| **PCP** (Priority Code Point) | 3 Bit | Priorität 0–7 für QoS (IEEE 802.1p), z. B. für VoIP |
| **DEI** (Drop Eligible Indicator) | 1 Bit | darf bei Überlast bevorzugt verworfen werden |
| **VID** (VLAN Identifier) | **12 Bit** | die **VLAN-ID** |

**Rechnung VLAN-ID:** 12 Bit → 2¹² = **4096** Werte (0–4095). Davon sind **0** (nur Priorität, kein VLAN) und **4095** reserviert. **Nutzbar: 1–4094**.

Weil 4 Byte dazukommen, wächst die maximale Ethernet-Framegröße von 1518 auf **1522 Byte**. Da sich der Frame-Inhalt ändert, muss die **Prüfsumme (FCS)** neu berechnet werden.

**Native VLAN:** Auf einem Trunk gibt es genau ein VLAN, dessen Frames **ohne Tag** übertragen werden – das **Native VLAN** (standardmäßig meist VLAN 1). Kommt ein ungetaggter Frame am Trunk an, ordnet der Switch ihn dem Native VLAN zu. Auf beiden Seiten eines Trunks muss das Native VLAN **gleich** konfiguriert sein, sonst landen Frames im falschen VLAN (*Native VLAN Mismatch*). Aus Sicherheitsgründen setzt man das Native VLAN gern auf ein ungenutztes VLAN.

Das ältere Cisco-eigene Verfahren **ISL** ist veraltet; heute verwendet man ausschließlich **802.1Q**.`,
        },
        {
          type: 'visual',
          title: 'Trunk zwischen zwei Standort-Switches',
          widget: {
            kind: 'topology',
            data: {
              nodes: [
                { id: 'sw1', type: 'switch', label: 'SW-EG', x: 220, y: 120 },
                { id: 'sw2', type: 'switch', label: 'SW-OG', x: 580, y: 120 },
                { id: 'a', type: 'pc', label: 'PC-A', sub: 'VLAN 10', x: 120, y: 300 },
                { id: 'b', type: 'pc', label: 'PC-B', sub: 'VLAN 20', x: 300, y: 300 },
                { id: 'c', type: 'pc', label: 'PC-C', sub: 'VLAN 10', x: 500, y: 300 },
                { id: 'd', type: 'pc', label: 'PC-D', sub: 'VLAN 20', x: 680, y: 300 },
              ],
              links: [
                { from: 'sw1', to: 'sw2', label: '802.1Q Trunk (10, 20)', style: 'trunk' },
                { from: 'sw1', to: 'a', label: 'Access' },
                { from: 'sw1', to: 'b', label: 'Access' },
                { from: 'sw2', to: 'c', label: 'Access' },
                { from: 'sw2', to: 'd', label: 'Access' },
              ],
              zones: [
                { label: 'VLAN 10', x: 70, y: 250, w: 100, h: 110, color: 'blue' },
                { label: 'VLAN 20', x: 250, y: 250, w: 100, h: 110, color: 'orange' },
                { label: 'VLAN 10', x: 450, y: 250, w: 100, h: 110, color: 'blue' },
                { label: 'VLAN 20', x: 630, y: 250, w: 100, h: 110, color: 'orange' },
              ],
            },
          },
          caption: `PC-A schickt einen Frame an PC-C. SW-EG fügt am Trunk den Tag „VID 10“ ein, SW-OG liest ihn, entfernt den Tag und gibt den Frame untagged an den Access-Port von PC-C. PC-B und PC-D sehen davon nichts.`,
        },
        {
          type: 'example',
          title: 'Der Weg eines Frames über den Trunk',
          problem: `PC-A (VLAN 10, an SW-EG) sendet einen ARP-Broadcast. Verfolge den Frame. Native VLAN auf dem Trunk ist VLAN 1.`,
          steps: [
            { label: 'Am Access-Port von SW-EG', body: `Der Frame kommt **untagged**. SW-EG weiß aus der Portkonfiguration: Dieser Port ist VLAN 10.` },
            { label: 'Fluten innerhalb von VLAN 10', body: `Broadcast → Flooding, aber **nur** an Ports, die zu VLAN 10 gehören: weitere VLAN-10-Access-Ports und der Trunk (der VLAN 10 erlaubt). **Nicht** an PC-B (VLAN 20).` },
            { label: 'Auf dem Trunk', body: `Da VLAN 10 nicht das Native VLAN ist, setzt SW-EG einen **802.1Q-Tag** mit VID = 10 ein (und berechnet die FCS neu).` },
            { label: 'An SW-OG', body: `SW-OG liest den Tag VID 10, entfernt ihn und flutet den Frame **untagged** an alle VLAN-10-Access-Ports → PC-C erhält ihn, PC-D nicht.` },
          ],
          result: `Der Broadcast bleibt in VLAN 10, obwohl er über zwei Switches läuft. Der Tag existiert nur auf dem Trunk.`,
        },
        {
          type: 'check',
          question: {
            id: 'm08-l05-c1',
            kind: 'number',
            skill: 'vlan.trunk',
            difficulty: 1,
            prompt: `Wie viele Bit hat das Feld für die VLAN-ID (VID) im 802.1Q-Tag?`,
            answer: 12,
            unit: 'Bit',
            hints: ['Daraus ergeben sich 4096 mögliche Werte.'],
            explanation: `Die VID hat **12 Bit** → 2¹² = 4096 Werte, davon 1–4094 nutzbar (0 und 4095 reserviert).`,
          },
        },
        {
          type: 'check',
          question: {
            id: 'm08-l05-c2',
            kind: 'single',
            skill: 'vlan.trunk',
            difficulty: 2,
            prompt: `Was geschieht mit einem **ungetaggten** Frame, der an einem 802.1Q-Trunk-Port ankommt?`,
            options: [
              'Er wird immer verworfen.',
              'Er wird dem Native VLAN zugeordnet.',
              'Er wird in alle VLANs geflutet.',
              'Er wird VLAN 4095 zugeordnet.',
            ],
            answer: 1,
            distractors: {
              '0': { why: 'Ungetaggte Frames sind auf einem Trunk erlaubt – sie gehören zum Native VLAN.', error: 'native-vlan-verwerfen' },
              '2': { why: 'Ein Frame gehört immer genau einem VLAN, er wird nie in alle VLANs geflutet.', error: 'native-vlan-alle' },
              '3': { why: 'VLAN 4095 ist reserviert und nicht nutzbar.', error: 'vlan-4095' },
            },
            explanation: `Ungetaggte Frames auf einem Trunk gehören zum **Native VLAN** (Standard oft VLAN 1). Deshalb muss das Native VLAN auf beiden Seiten gleich sein.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: Trunks und 802.1Q',
          questionIds: ['m08-q023', 'm08-q024', 'm08-q025', 'm08-q026', 'm08-q027', 'm08-q028', 'm08-q051'],
          count: 4,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Trunk-Port transportiert mehrere VLANs über eine Leitung (Switch↔Switch, Switch↔Router).',
            'IEEE 802.1Q fügt einen 4-Byte-Tag zwischen Quell-MAC und Typfeld ein (TPID 0x8100).',
            'VLAN-ID = 12 Bit → 4096 Werte, nutzbar 1–4094.',
            'Native VLAN: wird auf dem Trunk untagged übertragen, muss auf beiden Seiten gleich sein.',
            'Access-Port: ein VLAN, untagged – Trunk-Port: mehrere VLANs, tagged.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm08-l06',
      title: 'Inter-VLAN-Routing',
      minutes: 20,
      relevance: 'ap1',
      skills: ['vlan.routing'],
      simple: `VLANs sind getrennte Netze – von einem ins andere kommst du nur über einen Router, wie durch eine Tür zwischen zwei abgeschlossenen Abteilungen.
Bei **Router-on-a-Stick** hängt ein Router mit nur einem Kabel (Trunk) am Switch und hat für jedes VLAN eine eigene virtuelle Schnittstelle (Subinterface).
Ein **Layer-3-Switch** (ein Switch, der auch routen kann) erledigt das direkt im Gerät und ist schneller.
Jedes VLAN hat ein eigenes IP-Netz; die Router-Adresse im VLAN ist das Gateway der Geräte dort.

**Merke:** Ohne Router oder Layer-3-Switch gibt es keine Verbindung zwischen VLANs.`,
      steps: [
        {
          type: 'explain',
          title: 'Warum braucht man Routing zwischen VLANs?',
          body: `VLANs trennen Netze – aber völlig getrennt sollen sie meistens nicht sein. Die Produktions-PCs der Elektro Krämer GmbH (VLAN 20) müssen auf den ERP-Server (VLAN 30) zugreifen, nur eben **kontrolliert**.

Da jedes VLAN ein **eigenes IP-Netz** ist, brauchen wir genau das, was Netze verbindet: einen **Router** (Schicht 3). Jedes VLAN bekommt dafür eine **Gateway-Adresse** – meist die erste nutzbare Adresse, z. B. 10.10.20.1 für VLAN 20. Diese Adresse tragen die Clients als **Standardgateway** ein.

Es gibt drei Varianten:

| Variante | Aufbau | Bewertung |
|---|---|---|
| **Ein Router-Port pro VLAN** | Router hat für jedes VLAN ein eigenes physisches Interface, das an einem Access-Port hängt | einfach, aber skaliert schlecht (viele Ports/Kabel) |
| **Router-on-a-Stick** | **ein** physisches Router-Interface als **Trunk**, darauf **Subinterfaces** (z. B. \`Gi0/0.10\`, \`Gi0/0.20\`) mit je einem VLAN-Tag und einer Gateway-IP | günstig, typisch für kleine Netze; die eine Leitung kann zum Engpass werden |
| **Layer-3-Switch mit SVIs** | Der Switch routet selbst. Pro VLAN eine virtuelle Schnittstelle (**SVI**, *Switch Virtual Interface*, z. B. \`interface vlan 10\`) mit Gateway-IP | sehr schnell (Routing in Hardware), Standard im Unternehmensnetz |

Oft wird zusätzlich eine **Firewall** als Gateway für bestimmte VLANs genutzt (z. B. das Gäste-VLAN), damit Zugriffe über **Regeln** gesteuert werden. Auch ein Layer-3-Switch kann mit **ACLs** (Access Control Lists) Verkehr zwischen VLANs einschränken.`,
        },
        {
          type: 'visual',
          title: 'Router-on-a-Stick',
          widget: {
            kind: 'topology',
            data: {
              nodes: [
                { id: 'r', type: 'router', label: 'Router', sub: 'Gi0/0.10 / .20 / .30', x: 400, y: 60 },
                { id: 'sw', type: 'switch', label: 'Switch', x: 400, y: 200 },
                { id: 'a', type: 'pc', label: 'Verw.', sub: '10.10.10.5', x: 200, y: 340 },
                { id: 'b', type: 'pc', label: 'Prod.', sub: '10.10.20.5', x: 400, y: 340 },
                { id: 'c', type: 'server', label: 'ERP', sub: '10.10.30.10', x: 600, y: 340 },
              ],
              links: [
                { from: 'r', to: 'sw', label: 'Trunk 10,20,30', style: 'trunk' },
                { from: 'sw', to: 'a', label: 'VLAN 10' },
                { from: 'sw', to: 'b', label: 'VLAN 20' },
                { from: 'sw', to: 'c', label: 'VLAN 30' },
              ],
              zones: [
                { label: 'VLAN 10', x: 140, y: 290, w: 120, h: 110, color: 'blue' },
                { label: 'VLAN 20', x: 340, y: 290, w: 120, h: 110, color: 'orange' },
                { label: 'VLAN 30', x: 540, y: 290, w: 120, h: 110, color: 'purple' },
              ],
            },
          },
          caption: `Ein einziges Kabel (Trunk) zum Router. Auf dem Router gibt es Subinterfaces: Gi0/0.10 = 10.10.10.1, Gi0/0.20 = 10.10.20.1, Gi0/0.30 = 10.10.30.1.`,
        },
        {
          type: 'example',
          title: 'Paket von VLAN 20 zum Server in VLAN 30 (Router-on-a-Stick)',
          problem: `Der Produktions-PC 10.10.20.5/24 (Gateway 10.10.20.1) greift auf den ERP-Server 10.10.30.10/24 zu. Verfolge den Weg.`,
          steps: [
            { label: 'PC entscheidet', body: `Ziel 10.10.30.10 liegt **nicht** im eigenen Netz 10.10.20.0/24 → Paket ans **Standardgateway** 10.10.20.1. Ziel-MAC = MAC des Router-Subinterfaces (per ARP ermittelt).` },
            { label: 'Switch → Router', body: `Frame kommt untagged an einem VLAN-20-Access-Port, geht über den Trunk mit **Tag VID 20** zum Router.` },
            { label: 'Router routet', body: `Subinterface Gi0/0.20 nimmt den Frame an. Der Router schaut in seine Routingtabelle: 10.10.30.0/24 ist direkt an Gi0/0.30 → neuer Frame mit Ziel-MAC des Servers, Quell-MAC des Routers, **Tag VID 30**. Die IP-Adressen bleiben gleich, die TTL sinkt um 1.` },
            { label: 'Switch → Server', body: `Switch entfernt den Tag und stellt den Frame untagged am VLAN-30-Access-Port zu.` },
          ],
          result: `Der Frame läuft zweimal über den Trunk (hin mit VID 20, zurück mit VID 30). Genau deshalb kann die Trunk-Leitung zum Engpass werden – ein Layer-3-Switch vermeidet das.`,
        },
        {
          type: 'check',
          question: {
            id: 'm08-l06-c1',
            kind: 'single',
            skill: 'vlan.routing',
            difficulty: 2,
            prompt: `Was ist eine **SVI** auf einem Layer-3-Switch?`,
            options: [
              'Ein physischer Port im Trunk-Modus',
              'Eine virtuelle Layer-3-Schnittstelle für ein VLAN, die als Gateway dient',
              'Ein Protokoll zur VLAN-Verteilung',
              'Ein Spanning-Tree-Port-Zustand',
            ],
            answer: 1,
            distractors: {
              '0': { why: 'Ein Trunk ist ein physischer Port, der mehrere VLANs transportiert; die SVI ist virtuell.', error: 'svi-trunk' },
              '2': { why: 'VLAN-Verteilung macht z. B. Cisco VTP – das ist keine SVI.', error: 'svi-vtp' },
              '3': { why: 'STP-Zustände heißen z. B. Blocking/Forwarding.', error: 'svi-stp' },
            },
            explanation: `Eine **SVI** (Switch Virtual Interface, z. B. \`interface vlan 20\`) ist eine virtuelle Schnittstelle mit IP-Adresse – das Gateway des VLANs auf einem Layer-3-Switch.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: Inter-VLAN-Routing',
          questionIds: ['m08-q029', 'm08-q030', 'm08-q031', 'm08-q032'],
          count: 3,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Zwischen VLANs (= verschiedenen IP-Netzen) braucht man Routing.',
            'Jedes VLAN hat eine Gateway-Adresse, die die Clients als Standardgateway nutzen.',
            'Router-on-a-Stick: ein Trunk zum Router, Subinterfaces pro VLAN.',
            'Layer-3-Switch: SVI pro VLAN, Routing in Hardware – Standard im Unternehmen.',
            'Zugriffe zwischen VLANs per Firewall-Regeln oder ACLs einschränken.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm08-l07',
      title: 'Redundanz: Spanning Tree und Link Aggregation',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['switch.stp', 'switch.lacp'],
      simple: `Eine zweite Leitung zwischen zwei Switches ist wie eine Umleitung: gut, wenn die Hauptstraße gesperrt ist.
Im Netz entsteht dadurch aber ein Kreis, in dem Broadcasts (Durchsagen an alle) endlos kreisen – ein Broadcast-Sturm legt das Netz lahm.
**Spanning Tree (STP)** sperrt deshalb die Umleitung, bis sie wirklich gebraucht wird.
**Link Aggregation (LACP)** macht es anders: Sie bündelt parallele Kabel zu einer breiteren Straße, alle Kabel werden gleichzeitig genutzt.
Fällt ein Kabel aus, läuft der Verkehr über die übrigen weiter.

**Merke:** STP verhindert Schleifen durch Blockieren, LACP bündelt Leitungen für mehr Bandbreite und Ausfallsicherheit.`,
      steps: [
        {
          type: 'explain',
          title: 'Redundanz erzeugt Schleifen',
          body: `Damit bei der Elektro Krämer GmbH nicht die ganze Produktion stillsteht, wenn ein Kabel defekt ist, verbindet der Admin die Switches **redundant** – also über mehrere Wege. Auf Schicht 2 entsteht dadurch eine **Schleife (Loop)**, und die ist gefährlich:

1. Ein Broadcast wird von jedem Switch an alle Ports geflutet – also auch in die Schleife zurück.
2. Ethernet-Frames haben **kein TTL-Feld** (anders als IP-Pakete). Nichts hält sie auf.
3. Die Frames kreisen endlos und vervielfältigen sich → **Broadcast-Sturm**: Netz und Switch-CPUs sind innerhalb von Sekunden ausgelastet.
4. Zusätzlich sieht ein Switch dieselbe Quell-MAC ständig an wechselnden Ports → **instabile MAC-Tabelle** (*MAC Flapping*).
5. Endgeräte erhalten denselben Frame mehrfach.

Die Lösung ist das **Spanning Tree Protocol (STP, IEEE 802.1D)**.`,
        },
        {
          type: 'explain',
          title: 'So funktioniert Spanning Tree (Grundidee)',
          body: `STP berechnet aus dem vermaschten Netz einen **schleifenfreien Baum** und **blockiert** redundante Ports. Fällt eine aktive Verbindung aus, gibt STP den blockierten Port frei.

Die Grundschritte:

1. **Root Bridge wählen:** Die Switches tauschen **BPDUs** (*Bridge Protocol Data Units*) aus. Root Bridge wird der Switch mit der **niedrigsten Bridge-ID**. Die Bridge-ID besteht aus **Priorität** (Standard **32768**) und **MAC-Adresse**. Bei gleicher Priorität gewinnt die niedrigere MAC. Admins setzen die Priorität des Core-Switches bewusst niedrig, damit er Root wird.
2. **Root Ports:** Jeder andere Switch wählt seinen Port mit den **geringsten Pfadkosten** zur Root Bridge als **Root Port**.
3. **Designated Ports:** Pro Leitungssegment wird ein Port bestimmt, der in Richtung „weg von der Root“ weiterleitet.
4. **Alle übrigen Ports werden blockiert** (*Blocking*): Sie leiten keine Nutzdaten weiter, empfangen aber weiter BPDUs.

**Problem des klassischen STP:** Nach einer Änderung dauert es **30–50 Sekunden**, bis wieder weitergeleitet wird (Zustände Blocking → Listening → Learning → Forwarding).

Deshalb nutzt man heute **RSTP** (*Rapid Spanning Tree*, ursprünglich IEEE 802.1w) mit Umschaltzeiten im Bereich von **wenigen Sekunden oder darunter**, oder **MSTP** (802.1s, mehrere Spanning-Tree-Instanzen für Gruppen von VLANs).

Praxis-Tipp: Ports zu Endgeräten werden als **Edge-Port/PortFast** konfiguriert, damit PCs sofort Netz haben; zusätzlich schützt **BPDU Guard** davor, dass dort jemand einen fremden Switch ansteckt.`,
        },
        {
          type: 'visual',
          title: 'Dreieck aus Switches mit blockiertem Port',
          widget: {
            kind: 'topology',
            data: {
              nodes: [
                { id: 's1', type: 'switch', label: 'SW1', sub: 'Root Bridge', x: 400, y: 70 },
                { id: 's2', type: 'switch', label: 'SW2', x: 200, y: 280 },
                { id: 's3', type: 'switch', label: 'SW3', x: 600, y: 280 },
              ],
              links: [
                { from: 's1', to: 's2', label: 'aktiv' },
                { from: 's1', to: 's3', label: 'aktiv' },
                { from: 's2', to: 's3', label: 'Port an SW3 blockiert' },
              ],
            },
          },
          caption: `SW1 hat die niedrigste Bridge-ID und ist Root. SW2 und SW3 erreichen die Root direkt (Root Ports). Auf der Verbindung SW2–SW3 wird ein Port blockiert – so entsteht ein Baum ohne Schleife. Fällt SW1–SW3 aus, wird der blockierte Port freigegeben.`,
        },
        {
          type: 'explain',
          title: 'Link Aggregation (LACP) – mehr Bandbreite statt Blockieren',
          body: `STP blockiert redundante Leitungen – die Bandbreite liegt brach. Will man **mehrere parallele Leitungen gleichzeitig nutzen**, bündelt man sie per **Link Aggregation** zu einer logischen Verbindung (Begriffe: *Link Aggregation Group (LAG)*, *EtherChannel* bei Cisco, *Port-Channel*, *Trunk* bei manchen Herstellern – Achtung, nicht mit dem VLAN-Trunk verwechseln).

- Standardprotokoll: **LACP** (*Link Aggregation Control Protocol*), ursprünglich **IEEE 802.3ad**, heute **IEEE 802.1AX**.
- Vorteile: **höhere Gesamtbandbreite** (z. B. 2 × 1 Gbit/s) und **Ausfallsicherheit** (fällt eine Leitung aus, läuft der Rest weiter).
- STP sieht die Bündelung als **eine** Verbindung – nichts wird blockiert.
- Wichtig: Eine **einzelne Verbindung** (ein Datenstrom) läuft in der Regel nur über **eine** physische Leitung, weil die Verteilung per Hash über MAC/IP/Ports erfolgt. Die Summe gilt also für viele parallele Ströme.
- Die gebündelten Ports müssen gleich konfiguriert sein (Geschwindigkeit, Duplex, VLANs).

Typisch: Core-Switch ↔ Etagenswitch oder Switch ↔ Server/NAS mit zwei NICs.`,
        },
        {
          type: 'check',
          question: {
            id: 'm08-l07-c1',
            kind: 'single',
            skill: 'switch.stp',
            difficulty: 2,
            prompt: `Warum können Frames in einer Layer-2-Schleife endlos kreisen, während IP-Pakete in einer Routing-Schleife irgendwann verworfen werden?`,
            options: [
              'Weil Switches schneller sind als Router.',
              'Weil der Ethernet-Header kein TTL-Feld besitzt.',
              'Weil Broadcasts eine höhere Priorität haben.',
              'Weil die MAC-Tabelle die Frames speichert.',
            ],
            answer: 1,
            distractors: {
              '0': { why: 'Geschwindigkeit ist nicht der Grund – es fehlt ein Mechanismus zum Begrenzen.', error: 'stp-speed' },
              '2': { why: 'Prioritäten verhindern keine Schleifen.', error: 'stp-prio' },
              '3': { why: 'Die MAC-Tabelle speichert nur MAC-Port-Zuordnungen, keine Frames.', error: 'stp-mactable' },
            },
            explanation: `IP-Pakete haben eine **TTL**, die jeder Router um 1 senkt – bei 0 wird das Paket verworfen. Ethernet-Frames haben so etwas nicht, daher braucht Schicht 2 **STP** gegen Schleifen.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: STP und LACP',
          questionIds: ['m08-q033', 'm08-q034', 'm08-q035', 'm08-q036', 'm08-q037'],
          count: 4,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Redundante Switch-Verbindungen erzeugen Schleifen → Broadcast-Sturm, MAC-Flapping, doppelte Frames.',
            'STP (IEEE 802.1D) wählt eine Root Bridge (niedrigste Bridge-ID = Priorität + MAC) und blockiert redundante Ports.',
            'Klassisches STP braucht 30–50 s zum Umschalten, RSTP (802.1w) nur wenige Sekunden.',
            'Link Aggregation/LACP (802.3ad, heute 802.1AX) bündelt Leitungen zu einer logischen Verbindung: mehr Bandbreite + Redundanz.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm08-l08',
      title: 'Switch nach Datenblatt auswählen: managed, unmanaged, PoE-Budget',
      minutes: 30,
      relevance: 'ap1',
      skills: ['switch.select', 'switch.poebudget'],
      simple: `Einen Switch auszuwählen ist wie eine Steckdosenleiste fürs Büro zu kaufen: Sie braucht genug Steckplätze für alle Geräte – plus Reserve.
Ein **unmanaged Switch** (nicht verwaltbar) läuft sofort, man kann aber nichts einstellen.
Ein **managed Switch** (verwaltbar, z. B. über Weboberfläche oder SSH) beherrscht VLANs, Spanning Tree und Überwachung – das brauchst du in fast jedem Firmennetz.
Sollen Telefone, Kameras oder Access Points ihren Strom über das Netzwerkkabel bekommen, braucht der Switch **PoE** (Power over Ethernet).
Dann zählt das **PoE-Budget**: die Gesamtleistung, die der Switch für alle Geräte zusammen liefern kann.

**Merke:** Ports + Reserve, managed für VLANs, PoE-Budget ≥ Summe der Leistungen am Switch-Port (PSE-Werte).`,
      steps: [
        {
          type: 'explain',
          title: 'Welche Switch-Klassen gibt es?',
          body: `In der AP1 bekommst du oft **Datenblatt-Auszüge** mehrerer Geräte und sollst begründet auswählen. Dafür musst du zuerst wissen, welche Arten von Switches es gibt:

| Klasse | Was kann er? | Konfiguration | typischer Einsatz |
|---|---|---|---|
| **Unmanaged** (nicht verwaltbar) | nur Grundfunktion: MAC-Adressen lernen und Frames weiterleiten | keine – Plug and Play | Homeoffice, kleiner Besprechungsraum, Erweiterung am Schreibtisch |
| **Smart / Web-managed** | Grundfunktionen plus einige Einstellungen, z. B. **VLANs**, QoS (Priorisierung), Port-Statistik | nur Weboberfläche | kleine Büros mit wenigen VLANs |
| **Managed** (verwaltbar, Layer 2) | alles Einstellbare: **VLANs (802.1Q)**, **Spanning Tree**, **Link Aggregation**, **Port-Mirroring** (Datenverkehr eines Ports zur Analyse kopieren), **SNMP** (Überwachung), Zugriffslisten, 802.1X | Web, **SSH**/Konsole (CLI), SNMP | Firmennetze, Access- und Distributionsebene |
| **Layer-3-Switch** (Multilayer) | wie managed, zusätzlich **Routing zwischen VLANs** | wie managed | Core/Distribution, Inter-VLAN-Routing |

Die Namen schwanken je Hersteller („Smart Switch“, „Easy Smart“, „Websmart“). Entscheidend ist, **welche Funktionen** im Datenblatt stehen.

**Faustregel für die Prüfung:** Sobald VLANs, Überwachung oder Fernwartung gefordert sind, reicht ein unmanaged Switch **nicht**.`,
        },
        {
          type: 'explain',
          title: 'Ein Switch-Datenblatt lesen',
          body: `Ein typischer Datenblatt-Auszug und was die Angaben bedeuten:

| Angabe im Datenblatt | Beispiel | Bedeutung / worauf achten |
|---|---|---|
| Ports | 24 × 10/100/1000BASE-T (RJ45) | Anzahl Anschlüsse für Endgeräte, Geschwindigkeit je Port (hier bis 1 Gbit/s) |
| Uplinks | 4 × SFP+ (10 Gbit/s) | schnelle Anschlüsse zum nächsten Switch, oft für **Glasfaser**-Module (SFP = steckbares Modul) |
| PoE | 24 × 802.3at (PoE+) | wie viele Ports Strom liefern können und nach welchem Standard |
| **PoE-Budget** | 370 W | **Gesamtleistung** für alle PoE-Geräte zusammen – nicht pro Port! |
| Switching-Kapazität | 128 Gbit/s | interne Leistung; gerechnet wird **Vollduplex**, also jede Richtung einzeln |
| MAC-Tabelle | 16.000 Einträge | wie viele Geräte der Switch sich merken kann |
| Management | Web, SSH, SNMP, 802.1Q, STP | managed oder nicht |
| Bauform | 19″, 1 HE / lüfterlos | Einbau im Serverschrank (HE = Höheneinheit); lüfterlos = leise, für Büros geeignet |

**Rechenbeispiel Switching-Kapazität:** 24 Ports × 1 Gbit/s × 2 (Vollduplex) = 48 Gbit/s, dazu 4 Uplinks × 10 Gbit/s × 2 = 80 Gbit/s → zusammen **128 Gbit/s**. Ist dieser Wert mindestens so groß wie die Summe aller Ports (in beiden Richtungen), arbeitet der Switch **blockierungsfrei** (*non-blocking*).

**Portzahl planen:** Alle Geräte zählen, die einen eigenen Port brauchen, Reserve aufschlagen (oft 20–25 %) und **aufrunden**. Dann die nächste Standardgröße wählen (8, 16, 24, 48 Ports). Beispiel: 19 Geräte × 1,2 = 22,8 → **23 Ports** → 24-Port-Switch.`,
        },
        {
          type: 'explain',
          title: 'PoE-Budget: PSE und PD nicht verwechseln',
          body: `Bei PoE gibt es zwei Seiten (Details im Modul Verkabelung, Lektion PoE):

- **PSE** (*Power Sourcing Equipment*) = die **Stromquelle**, also der PoE-Switch-Port (oder ein PoE-Injektor).
- **PD** (*Powered Device*) = das **versorgte Gerät**, z. B. Access Point, IP-Telefon, Kamera.

Auf dem Kabel geht Leistung als Wärme verloren. Deshalb muss der Switch-Port **mehr** liefern, als am Gerät ankommt:

| Standard | Klasse | max. am Switch-Port (**PSE**) | max. am Gerät (**PD**) |
|---|---|---|---|
| 802.3af (PoE) | 2 | 7 W | 6,49 W |
| 802.3af (PoE) | 3 | 15,4 W | 12,95 W |
| 802.3at (PoE+) | 4 | 30 W | 25,5 W |
| 802.3bt (Type 3) | 6 | 60 W | 51 W |
| 802.3bt (Type 4) | 8 | 90 W | 71,3 W |

**So planst du das Budget:**
1. Für jeden Gerätetyp: **Anzahl × Leistung am Switch-Port (PSE)** der jeweiligen Klasse.
2. Alles addieren.
3. Reserve aufschlagen, wenn gefordert.
4. Mit dem **PoE-Budget** im Datenblatt vergleichen. Zusätzlich prüfen: Gibt es genug **PoE-fähige Ports**, und unterstützen sie den nötigen **Standard** (ein PoE+-AP braucht einen at-Port)?

Warum mit PSE-Werten? Viele Switches **reservieren** pro Port die Leistung der erkannten Klasse – egal, wie viel das Gerät gerade tatsächlich zieht. Mit PSE-Werten bist du auf der sicheren Seite.

> **Achtung, Buchwerte:** Manche Lehrbücher nennen für PoE+ „25,5 W“ (das ist der **PD**-Wert) oder für 802.3bt „bis 100 W“ (Werbeangabe; genormt sind 90 W am Port). In der Prüfung gilt: **Beleg lesen**. Steht dort „Leistungsaufnahme des Geräts“, ist der PD-Wert gemeint; plane das Switch-Budget trotzdem mit der Port-Leistung, wenn sie angegeben ist, und schreibe deine Annahme dazu.

Ein 24-Port-PoE+-Switch kann übrigens fast nie alle Ports gleichzeitig voll versorgen: 24 × 30 W = 720 W, das Budget liegt oft nur bei 190–410 W.`,
        },
        {
          type: 'visual',
          title: 'Die Switch-Klassen im Überblick',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Unmanaged', text: 'Plug and Play, nichts einstellbar. Keine VLANs, keine Überwachung. Günstig.', icon: 'Plug' },
                { title: 'Smart / Web-managed', text: 'Einige Einstellungen per Weboberfläche: VLANs, QoS, Statistik.', icon: 'Globe' },
                { title: 'Managed (L2)', text: 'VLANs, STP, LACP, Mirroring, SNMP, SSH/CLI. Standard im Firmennetz.', icon: 'Settings' },
                { title: 'Layer-3-Switch', text: 'Wie managed, zusätzlich Routing zwischen VLANs.', icon: 'Router' },
              ],
            },
          },
          caption: 'Von links nach rechts: mehr Funktionen, mehr Konfigurationsaufwand, höherer Preis.',
        },
        {
          type: 'example',
          title: 'Switch für das Lager Hamburg auswählen',
          problem: `**Handlungssituation:** Im Lager der Elektro Krämer GmbH wird ein neuer Access-Switch gebraucht. Angeschlossen werden: **6 PCs, 2 Netzwerkdrucker, 6 IP-Telefone** (PoE-Klasse 2), **3 Access Points** (Wi-Fi 6, PoE+, Klasse 4) und **2 IP-Kameras** (Klasse 3). Telefone und Kameras sollen in **eigene VLANs**. Gefordert sind **20 % Reserve** bei Ports und PoE-Leistung. Jedes Gerät belegt einen eigenen Port; der Uplink läuft über einen separaten SFP-Port.

**Datenblatt-Auszüge:**

| | NS-24U | NS-24M-P | NS-48M-P |
|---|---|---|---|
| RJ45-Ports (1 Gbit/s) | 24 | 24 | 48 |
| davon PoE+ (802.3at) | 12 | 24 | 48 |
| PoE-Budget | 190 W | 250 W | 740 W |
| Uplinks | – | 2 × SFP (1 Gbit/s) | 4 × SFP+ (10 Gbit/s) |
| Management | unmanaged | managed (Web, SSH, SNMP, 802.1Q) | managed (Web, SSH, SNMP, 802.1Q) |
| Preis netto | 289 € | 469 € | 1.190 € |

Welches Modell empfiehlst du?`,
          steps: [
            { label: '1. Ports', body: `6 + 2 + 6 + 3 + 2 = **19 Geräte**. Mit 20 % Reserve: 19 × 1,2 = 22,8 → aufgerundet **23 Ports**. Alle drei Modelle haben mindestens 24 Ports.` },
            { label: '2. PoE-Ports', body: `PoE-Geräte: 6 Telefone + 3 APs + 2 Kameras = **11**. NS-24U hat 12 PoE-Ports – reicht knapp, die anderen beiden sowieso.` },
            { label: '3. PoE-Budget (PSE-Werte)', body: `Telefone: 6 × 7 W = 42 W\nAccess Points: 3 × 30 W = 90 W\nKameras: 2 × 15,4 W = 30,8 W\nSumme: 42 + 90 + 30,8 = **162,8 W**\nMit 20 % Reserve: 162,8 W × 1,2 = **195,36 W**` },
            { label: '4. Modelle prüfen', body: `- **NS-24U:** Budget 190 W < 195,36 W **und** unmanaged → keine VLANs möglich → scheidet aus.\n- **NS-24M-P:** 24 Ports ≥ 23, 24 PoE-Ports ≥ 11, 250 W ≥ 195,36 W, managed ✔\n- **NS-48M-P:** erfüllt alles, ist aber mit 1.190 € mehr als doppelt so teuer und für 23 Ports überdimensioniert.` },
            { label: '5. Entscheidung begründen', body: `Das günstigste Modell, das **alle** Anforderungen erfüllt, ist der NS-24M-P.` },
          ],
          result: `Empfehlung: **NS-24M-P** – erfüllt Portbedarf (23), PoE-Ports (11), PoE-Budget (195,36 W ≤ 250 W) und VLAN-Anforderung (managed) zum niedrigsten Preis der geeigneten Modelle (469 €).`,
        },
        {
          type: 'check',
          question: {
            id: 'm08-l08-c1',
            kind: 'single',
            skill: 'switch.poebudget',
            difficulty: 2,
            prompt: `Ein Access Point benötigt laut seinem Datenblatt **25,5 W** (PoE+, Klasse 4). Mit welcher Leistung belastet er bei der Planung das **PoE-Budget des Switches**?`,
            options: ['15,4 W', '25,5 W', '30 W', '90 W'],
            answer: 2,
            distractors: {
              '0': { why: '15,4 W ist die Port-Leistung von 802.3af (Klasse 3). Ein PoE+-Gerät braucht mehr.', error: 'poe-standard-verwechselt' },
              '1': { why: '25,5 W ist die Leistung **am Gerät (PD)**. Der Switch-Port (PSE) muss wegen der Kabelverluste mehr liefern.', error: 'poe-pd-statt-pse' },
              '3': { why: '90 W ist die Höchstleistung von 802.3bt Type 4, nicht von PoE+.', error: 'poe-standard-verwechselt' },
            },
            explanation: `**30 W.** 25,5 W kommen am Gerät (PD) an, der Switch-Port (PSE) muss bei PoE+ bis zu **30 W** bereitstellen – mit diesem Wert planst du das Budget.`,
          },
        },
        {
          type: 'check',
          question: {
            id: 'm08-l08-c2',
            kind: 'number',
            skill: 'switch.poebudget',
            difficulty: 1,
            prompt: `An einem PoE-Switch hängen **8 IP-Telefone** (Klasse 2, 7 W am Switch-Port) und **2 Access Points** (PoE+, 30 W am Switch-Port). Wie viel PoE-Leistung wird insgesamt benötigt?`,
            answer: 116,
            unit: 'W',
            misconceptions: [
              { answer: '37', error: 'poe-anzahl-vergessen', why: 'Du hast jeden Gerätetyp nur einmal gezählt (7 + 30). Multipliziere mit der Anzahl.' },
              { answer: '102.92', error: 'poe-pd-statt-pse', why: 'Das sind die Werte am Gerät (8 × 6,49 W + 2 × 25,5 W). Für das Budget zählt die Leistung am Switch-Port.' },
            ],
            explanation: `**116 W.** Telefone: 8 × 7 W = 56 W. APs: 2 × 30 W = 60 W. Summe: 56 W + 60 W = **116 W**.`,
          },
        },
        { type: 'practice', title: 'Übung: PoE-Budget berechnen', generator: 'switch.poebudget', count: 3, difficulty: 2 },
        { type: 'practice', title: 'Übung: Switch nach Datenblatt auswählen', generator: 'switch.select', count: 2, difficulty: 2 },
        {
          type: 'practice',
          title: 'Prüfungsaufgaben: Switch-Auswahl',
          questionIds: ['m08-q043', 'm08-q044', 'm08-q045', 'm08-q046', 'm08-q047', 'm08-q048', 'm08-q049', 'm08-q050'],
          count: 5,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Unmanaged = Plug and Play ohne Einstellungen; managed = VLANs, STP, LACP, Mirroring, SNMP, SSH; Layer-3-Switch routet zusätzlich.',
            'Portbedarf: Geräte zählen, Reserve aufschlagen, aufrunden, nächste Standardgröße (8/16/24/48) wählen.',
            'PoE-Budget = Gesamtleistung aller PoE-Ports; Planung mit der Leistung am Switch-Port (PSE), nicht am Gerät (PD).',
            'PoE+ (802.3at): 30 W am Port, 25,5 W am Gerät; 802.3af: 15,4 W / 12,95 W.',
            'Auswahl: erst jedes Modell gegen jede Anforderung prüfen, dann das günstigste geeignete wählen und begründen.',
          ],
        },
      ],
    },
  ],

  /* ==================================================================== */
  /* Fragenpool                                                           */
  /* ==================================================================== */
  questions: [
    // ---------- MAC-Adressen ----------
    {
      id: 'm08-q001',
      kind: 'single',
      skill: 'mac.address',
      difficulty: 1,
      prompt: `Welcher Teil einer MAC-Adresse identifiziert den **Hersteller**?`,
      options: ['Die letzten 24 Bit', 'Die ersten 24 Bit (OUI)', 'Das erste Bit', 'Die letzten 8 Bit'],
      answer: 1,
      distractors: {
        '0': { why: 'Die letzten 24 Bit vergibt der Hersteller selbst für jedes Gerät.', error: 'oui-position' },
        '2': { why: 'Einzelne Bits im ersten Byte kennzeichnen Unicast/Multicast und universal/lokal.', error: 'oui-bit' },
        '3': { why: 'Das letzte Byte ist Teil der Gerätekennung.', error: 'oui-position' },
      },
      hints: ['Die Abkürzung lautet OUI – Organizationally Unique Identifier.'],
      explanation: `Die ersten 3 Byte (24 Bit) bilden den **OUI**, den die IEEE an Hersteller vergibt. Die letzten 3 Byte vergibt der Hersteller.`,
    },
    {
      id: 'm08-q002',
      kind: 'text',
      skill: 'mac.casting',
      difficulty: 1,
      prompt: `Gib die **Broadcast-MAC-Adresse** an (Schreibweise mit Doppelpunkten).`,
      accept: ['FF:FF:FF:FF:FF:FF', 'ff:ff:ff:ff:ff:ff', 'FF-FF-FF-FF-FF-FF', 'FFFF.FFFF.FFFF', 'FFFFFFFFFFFF'],
      placeholder: 'xx:xx:xx:xx:xx:xx',
      hints: ['Alle 48 Bit sind auf 1 gesetzt.'],
      explanation: `Broadcast = alle 48 Bit auf 1 = \`FF:FF:FF:FF:FF:FF\`.`,
    },
    {
      id: 'm08-q003',
      kind: 'match',
      skill: 'mac.address',
      difficulty: 1,
      prompt: `Ordne die Schreibweise der MAC-Adresse dem typischen System zu.`,
      left: ['00-1A-2B-3C-4D-5E', '001a.2b3c.4d5e', '00:1a:2b:3c:4d:5e'],
      right: ['Linux/macOS', 'Windows', 'Cisco IOS'],
      answer: [1, 2, 0],
      explanation: `Windows nutzt Bindestriche, Cisco drei Vierergruppen mit Punkten, Linux/macOS Doppelpunkte. Es ist jeweils **dieselbe** Adresse.`,
    },
    {
      id: 'm08-q004',
      kind: 'single',
      skill: 'mac.casting',
      difficulty: 2,
      prompt: `Um welche Art von Adresse handelt es sich bei \`01:00:5E:7F:00:01\`?`,
      options: ['Unicast', 'Broadcast', 'Multicast', 'Anycast'],
      answer: 2,
      distractors: {
        '0': { why: 'Bei Unicast ist das I/G-Bit (niederwertigstes Bit des 1. Bytes) 0. Hier ist das erste Byte 01 → Bit = 1.', error: 'ig-bit' },
        '1': { why: 'Broadcast wäre FF:FF:FF:FF:FF:FF.', error: 'broadcast-mac' },
        '3': { why: 'Anycast ist ein Konzept von IPv6 (Schicht 3), keine MAC-Adressart.', error: 'anycast-mac' },
      },
      hints: ['Schau dir das erste Byte binär an.', 'Ist die zweite Hex-Ziffer ungerade?'],
      explanation: `Erstes Byte \`01\` → niederwertigstes Bit = 1 → **Gruppenadresse**. \`01:00:5E\` ist der Bereich für **IPv4-Multicast**.`,
    },
    {
      id: 'm08-q005',
      kind: 'number',
      skill: 'mac.address',
      difficulty: 1,
      prompt: `Aus wie vielen **Hexadezimalziffern** besteht eine MAC-Adresse?`,
      answer: 12,
      hints: ['48 Bit, eine Hex-Ziffer = 4 Bit.'],
      explanation: `48 Bit ÷ 4 Bit pro Hex-Ziffer = **12** Hex-Ziffern (6 Byte zu je 2 Ziffern).`,
    },
    {
      id: 'm08-q006',
      kind: 'match',
      skill: 'mac.casting',
      difficulty: 2,
      prompt: `Ordne jedem Beispiel die Zustellart zu.`,
      left: [
        'ARP-Request „Wer hat 10.10.10.1?“',
        'PC sendet Druckauftrag an den Drucker',
        'IPTV-Stream an alle Abonnenten eines Senders',
        'IPv6-Anfrage an den nächstgelegenen von mehreren DNS-Servern mit gleicher Adresse',
      ],
      right: ['Multicast', 'Anycast', 'Broadcast', 'Unicast'],
      answer: [2, 3, 0, 1],
      explanation: `ARP-Request = **Broadcast**; Druckauftrag = **Unicast**; IPTV = **Multicast** (Gruppe); gleiche Adresse auf mehreren Servern, Zustellung an den nächsten = **Anycast**.`,
    },
    // ---------- Switch-Funktion ----------
    {
      id: 'm08-q007',
      kind: 'order',
      skill: 'switch.function',
      difficulty: 2,
      prompt: `Bringe die Verarbeitungsschritte eines Switches für einen eingehenden Unicast-Frame in die richtige Reihenfolge.`,
      items: [
        'Frame am Port empfangen und FCS prüfen',
        'Quell-MAC mit Eingangsport in die MAC-Tabelle eintragen (Learning)',
        'Ziel-MAC in der MAC-Tabelle nachschlagen',
        'Je nach Ergebnis: Forwarding, Flooding oder Filtering',
      ],
      hints: ['Gelernt wird, bevor entschieden wird.'],
      explanation: `Erst empfangen und prüfen, dann **lernen** (Quell-MAC), dann **nachschlagen** (Ziel-MAC), dann **weiterleiten/fluten/filtern**.`,
    },
    {
      id: 'm08-q008',
      kind: 'single',
      skill: 'switch.function',
      difficulty: 1,
      prompt: `Ein Switch empfängt einen Unicast-Frame, dessen Ziel-MAC **nicht** in seiner MAC-Tabelle steht. Was macht er?`,
      options: [
        'Er verwirft den Frame.',
        'Er sendet den Frame an alle Ports außer dem Eingangsport.',
        'Er sendet einen ARP-Request.',
        'Er schickt den Frame an das Standardgateway.',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'Verwerfen wäre fatal – das Ziel könnte ja an einem Port hängen. Verworfen wird nur, wenn das Ziel am Eingangsport liegt.', error: 'unknown-unicast-drop' },
        '2': { why: 'ARP ist ein Protokoll der Endgeräte, um IP→MAC aufzulösen. Ein Layer-2-Switch macht das nicht.', error: 'switch-arp' },
        '3': { why: 'Ein Switch kennt kein Standardgateway für Frames; das ist ein Schicht-3-Konzept des Endgeräts.', error: 'switch-gateway' },
      },
      explanation: `Unbekanntes Ziel (*Unknown Unicast*) → **Flooding**: an alle Ports (im selben VLAN) außer dem Eingangsport.`,
    },
    {
      id: 'm08-q009',
      kind: 'table',
      skill: 'switch.mactable',
      difficulty: 2,
      prompt: `Ein Switch mit leerer MAC-Tabelle. Angeschlossen: PC-A (MAC AA) an Port 1, PC-B (BB) an Port 2, PC-C (CC) an Port 3, PC-D (DD) an Port 4. Es werden nacheinander diese Frames gesendet. Trage jeweils die Aktion (**Flooding**, **Forwarding** oder **Filtering**) und die Ausgangsport(s) ein (mehrere Ports durch Komma trennen, aufsteigend).`,
      columns: [
        { key: 'frame', label: 'Frame', type: 'text' },
        { key: 'action', label: 'Aktion', type: 'text' },
        { key: 'ports', label: 'Ausgangsport(s)', type: 'text' },
      ],
      rows: [
        { cells: { frame: { given: '1) A → D' }, action: { answer: 'Flooding', accept: ['Flooding', 'Fluten'] }, ports: { answer: '2,3,4', accept: ['2,3,4', '2, 3, 4', '2 3 4'] } } },
        { cells: { frame: { given: '2) D → A' }, action: { answer: 'Forwarding', accept: ['Forwarding', 'Weiterleiten'] }, ports: { answer: '1', accept: ['1'] } } },
        { cells: { frame: { given: '3) B → D' }, action: { answer: 'Forwarding', accept: ['Forwarding', 'Weiterleiten'] }, ports: { answer: '4', accept: ['4'] } } },
        { cells: { frame: { given: '4) C → B' }, action: { answer: 'Forwarding', accept: ['Forwarding', 'Weiterleiten'] }, ports: { answer: '2', accept: ['2'] } } },
        { cells: { frame: { given: '5) A → FF:FF:FF:FF:FF:FF' }, action: { answer: 'Flooding', accept: ['Flooding', 'Fluten'] }, ports: { answer: '2,3,4', accept: ['2,3,4', '2, 3, 4', '2 3 4'] } } },
      ],
      hints: ['Notiere nach jedem Frame, welche Quell-MAC der Switch gelernt hat.', 'Bei Frame 3: D hat in Frame 2 bereits gesendet.'],
      explanation: `1) AA→1 gelernt, DD unbekannt → Flooding an 2,3,4. 2) DD→4 gelernt, AA bekannt (Port 1) → Forwarding. 3) BB→2 gelernt, DD bekannt (Port 4) → Forwarding. 4) CC→3 gelernt, BB bekannt (Port 2) → Forwarding. 5) Broadcast wird **immer** geflutet → 2,3,4.`,
    },
    {
      id: 'm08-q010',
      kind: 'single',
      skill: 'switch.function',
      difficulty: 2,
      prompt: `An Port 5 eines Switches hängt ein alter Hub, an dem PC-X und PC-Y angeschlossen sind. PC-X sendet einen Frame an PC-Y; der Switch kennt beide MACs an Port 5. Was macht der Switch?`,
      options: ['Forwarding an Port 5', 'Flooding an alle Ports', 'Filtering – er verwirft den Frame', 'Er sendet den Frame an den Hub zurück und zusätzlich an alle anderen Ports'],
      answer: 2,
      distractors: {
        '0': { why: 'Der Frame kam über Port 5 – er wird nie an den Eingangsport zurückgeschickt.', error: 'filter-eingangsport' },
        '1': { why: 'Das Ziel ist bekannt, also kein Flooding.', error: 'filter-flooding' },
        '3': { why: 'Ein Switch sendet Frames nie über den Eingangsport zurück.', error: 'filter-eingangsport' },
      },
      hints: ['Der Hub hat den Frame bereits an PC-Y verteilt.'],
      explanation: `Ziel-MAC steht am **selben Port**, über den der Frame kam → **Filtering**. PC-Y hat den Frame über den Hub ohnehin schon erhalten.`,
    },
    {
      id: 'm08-q011',
      kind: 'single',
      skill: 'switch.function',
      difficulty: 1,
      prompt: `Wozu dient das **Aging** in der MAC-Adresstabelle?`,
      options: [
        'Es entfernt Einträge, die längere Zeit nicht mehr als Quelle aufgetaucht sind.',
        'Es sortiert die Tabelle nach Alter der Geräte.',
        'Es verlängert die Lease-Zeit von DHCP-Adressen.',
        'Es löscht die Tabelle bei jedem Broadcast.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Sortieren hat keinen Zweck für die Weiterleitung.', error: 'aging-sort' },
        '2': { why: 'DHCP-Leases verwaltet der DHCP-Server, nicht der Switch.', error: 'aging-dhcp' },
        '3': { why: 'Broadcasts löschen keine Einträge.', error: 'aging-broadcast' },
      },
      explanation: `Durch **Aging** (typisch 300 s) verschwinden veraltete Einträge, z. B. wenn ein Gerät umgesteckt oder abgeschaltet wurde. So bleibt die Tabelle aktuell und läuft nicht voll.`,
    },
    {
      id: 'm08-q012',
      kind: 'multi',
      skill: 'switch.function',
      difficulty: 2,
      prompt: `In welchen Fällen **flutet** ein Layer-2-Switch einen Frame? (Mehrfachauswahl)`,
      options: [
        'Ziel-MAC ist FF:FF:FF:FF:FF:FF',
        'Ziel-MAC ist unbekannt',
        'Ziel-MAC ist bekannt und an einem anderen Port',
        'Ziel-MAC ist eine Multicast-Adresse und der Switch hat kein IGMP-Snooping',
        'Ziel-MAC ist bekannt und am Eingangsport',
      ],
      answer: [0, 1, 3],
      explanation: `Geflutet werden **Broadcasts**, **unbekannte Unicasts** und (ohne IGMP-Snooping) **Multicasts**. Bekanntes Ziel → Forwarding bzw. Filtering.`,
    },
    {
      id: 'm08-q013',
      kind: 'free',
      skill: 'switch.function',
      difficulty: 2,
      prompt: `**Handlungssituation:** Dein Ausbilder fragt dich, warum nach dem Austausch eines alten Hubs gegen einen Switch die Netzwerkleistung im Produktionsbüro spürbar besser geworden ist. Erläutern Sie die Funktionsweise eines Switches im Vergleich zum Hub.`,
      modelAnswer: `Ein Hub arbeitet auf OSI-Schicht 1 und gibt jedes empfangene Signal an alle Ports weiter. Alle Geräte teilen sich eine Kollisionsdomäne, es kann immer nur einer senden (Halbduplex, CSMA/CD), und die Bandbreite wird geteilt. Ein Switch arbeitet auf Schicht 2: Er lernt aus der Quell-MAC eingehender Frames, an welchem Port welches Gerät hängt, und speichert dies in der MAC-Adresstabelle. Frames an bekannte Ziel-MACs leitet er nur an den passenden Port weiter (Forwarding), nur bei unbekannten Zielen und Broadcasts flutet er. Jeder Port ist eine eigene Kollisionsdomäne und kann vollduplex arbeiten, sodass mehrere Geräte gleichzeitig mit voller Bandbreite kommunizieren können. Zusätzlich sehen Geräte den Verkehr der anderen nicht mehr.`,
      keywords: ['MAC-Adresstabelle', 'Quell-MAC', 'Ziel-MAC', 'Kollisionsdomäne', 'Vollduplex', 'Flooding', 'Schicht 2'],
      hints: ['Gehe auf Schicht, MAC-Tabelle und Kollisionsdomänen ein.'],
      explanation: `Kernpunkte: Hub = Schicht 1, verteilt alles, eine Kollisionsdomäne. Switch = Schicht 2, MAC-Tabelle, gezielte Weiterleitung, Kollisionsdomäne pro Port, Vollduplex.`,
    },
    // ---------- Domänen ----------
    {
      id: 'm08-q014',
      kind: 'number',
      skill: 'switch.domains',
      difficulty: 2,
      prompt: `Ein 24-Port-Switch (ohne VLANs) hat 20 PCs und einen Uplink zum Router angeschlossen. Wie viele **Kollisionsdomänen** bildet der Switch (nur genutzte Ports zählen)?`,
      answer: 21,
      hints: ['Jeder genutzte Switchport ist eine eigene Kollisionsdomäne.'],
      explanation: `20 PC-Ports + 1 Uplink = **21** Kollisionsdomänen. Broadcastdomäne ist es nur **eine**.`,
    },
    {
      id: 'm08-q015',
      kind: 'number',
      skill: 'switch.domains',
      difficulty: 2,
      prompt: `Ein Switch hat drei VLANs konfiguriert (10, 20, 30), an jedem VLAN hängen mehrere PCs. Wie viele **Broadcastdomänen** gibt es auf diesem Switch?`,
      answer: 3,
      explanation: `Jedes VLAN ist eine eigene Broadcastdomäne → **3**.`,
    },
    {
      id: 'm08-q016',
      kind: 'table',
      skill: 'switch.domains',
      difficulty: 1,
      prompt: `Vervollständige die Tabelle. Antworte mit **ja** oder **nein**.`,
      columns: [
        { key: 'dev', label: 'Gerät', type: 'text' },
        { key: 'col', label: 'trennt Kollisionsdomänen?', type: 'text' },
        { key: 'bc', label: 'trennt Broadcastdomänen?', type: 'text' },
      ],
      rows: [
        { cells: { dev: { given: 'Hub' }, col: { answer: 'nein' }, bc: { answer: 'nein' } } },
        { cells: { dev: { given: 'Switch (ohne VLAN)' }, col: { answer: 'ja' }, bc: { answer: 'nein' } } },
        { cells: { dev: { given: 'Router' }, col: { answer: 'ja' }, bc: { answer: 'ja' } } },
      ],
      explanation: `Hub trennt nichts (Schicht 1). Switch trennt Kollisionsdomänen (Schicht 2). Router trennt beides (Schicht 3).`,
    },
    {
      id: 'm08-q017',
      kind: 'single',
      skill: 'switch.domains',
      difficulty: 3,
      prompt: `Ein Router hat zwei Interfaces. An Interface 1 hängt ein Switch mit 6 PCs, an Interface 2 ein Hub mit 4 PCs. Wie viele Kollisions- (KD) und Broadcastdomänen (BD) gibt es?`,
      options: ['KD 2, BD 2', 'KD 8, BD 2', 'KD 11, BD 2', 'KD 7, BD 1'],
      answer: 1,
      distractors: {
        '0': { why: 'Der Switch bildet pro Port eine eigene Kollisionsdomäne.', error: 'kd-switch' },
        '2': { why: 'Der Hub bildet nur eine einzige Kollisionsdomäne, nicht eine pro PC.', error: 'kd-hub' },
        '3': { why: 'Jedes Router-Interface bildet eine eigene Broadcastdomäne.', error: 'bd-router' },
      },
      hints: ['Switchseite: 6 PC-Ports + Uplink.', 'Hubseite: alles eine Kollisionsdomäne.'],
      explanation: `Switch: 6 + 1 (Uplink) = 7 KD. Hub inkl. Router-Leitung: 1 KD. Summe **8 KD**. Router-Interfaces: **2 BD**.`,
    },
    // ---------- VLAN-Grundlagen ----------
    {
      id: 'm08-q018',
      kind: 'multi',
      skill: 'vlan.basics',
      difficulty: 1,
      prompt: `Nenne Vorteile von VLANs. (Mehrfachauswahl)`,
      options: [
        'Erhöhte Sicherheit durch logische Trennung',
        'Verringerte Broadcastlast',
        'Höhere Übertragungsgeschwindigkeit der einzelnen Leitung',
        'Flexible Zuordnung von Geräten unabhängig vom Standort im Gebäude',
        'Kein Router mehr nötig',
      ],
      answer: [0, 1, 3],
      explanation: `VLANs bringen **Sicherheit**, **weniger Broadcasts** und **Flexibilität**. Die Leitungsgeschwindigkeit ändert sich nicht, und für Kommunikation zwischen VLANs braucht man **gerade** einen Router.`,
    },
    {
      id: 'm08-q019',
      kind: 'single',
      skill: 'vlan.access',
      difficulty: 1,
      prompt: `Wie werden Frames an einem **Access-Port** zum Endgerät übertragen?`,
      options: ['Mit 802.1Q-Tag', 'Ohne VLAN-Tag (untagged)', 'Mit doppeltem Tag (Q-in-Q)', 'Verschlüsselt'],
      answer: 1,
      distractors: {
        '0': { why: 'Getaggt wird auf Trunk-Ports, das Endgerät könnte den Tag meist nicht verarbeiten.', error: 'access-tagged' },
        '2': { why: 'Q-in-Q ist eine Provider-Technik, kein Access-Port-Verhalten.', error: 'access-qinq' },
        '3': { why: 'VLANs verschlüsseln nichts.', error: 'vlan-encrypt' },
      },
      explanation: `Ein Access-Port gehört zu genau einem VLAN und überträgt **untagged**. Das Endgerät bemerkt das VLAN nicht.`,
    },
    {
      id: 'm08-q020',
      kind: 'single',
      skill: 'vlan.basics',
      difficulty: 2,
      prompt: `PC1 (VLAN 10, 192.168.10.20/24) und PC2 (VLAN 20, 192.168.20.20/24) hängen am selben Switch. Es gibt kein Inter-VLAN-Routing. Was passiert bei einem Ping von PC1 zu PC2?`,
      options: [
        'Der Ping funktioniert, weil beide am selben Switch hängen.',
        'Der Ping funktioniert nur, wenn der Switch eingeschaltet ist.',
        'Der Ping scheitert, weil die VLANs getrennte Broadcastdomänen sind und kein Router vermittelt.',
        'Der Ping funktioniert, aber langsamer.',
      ],
      answer: 2,
      distractors: {
        '0': { why: 'Physisch am selben Switch heißt nicht logisch im selben Netz – VLANs trennen.', error: 'vlan-gleicher-switch' },
        '1': { why: 'Selbst bei eingeschaltetem Switch trennen die VLANs.', error: 'vlan-gleicher-switch' },
        '3': { why: 'Es gibt keinen Weg zwischen den VLANs, also gar keine Antwort.', error: 'vlan-langsam' },
      },
      explanation: `Unterschiedliche VLANs (und Subnetze) → ohne **Router/Layer-3-Switch** keine Kommunikation.`,
    },
    {
      id: 'm08-q021',
      kind: 'table',
      skill: 'vlan.access',
      difficulty: 2,
      prompt: `**Handlungssituation:** Am Switch SW-EG der Elektro Krämer GmbH sollen folgende Geräte angeschlossen werden. Trage den Portmodus (**Access** oder **Trunk**) und das VLAN bzw. die VLANs ein. VLANs: 10 Verwaltung, 20 Produktion, 30 Server, 99 Gäste.`,
      columns: [
        { key: 'dev', label: 'Gerät', type: 'text' },
        { key: 'mode', label: 'Modus', type: 'text' },
        { key: 'vlan', label: 'VLAN(s)', type: 'text' },
      ],
      rows: [
        { cells: { dev: { given: 'Buchhaltungs-PC' }, mode: { answer: 'Access' }, vlan: { answer: '10' } } },
        { cells: { dev: { given: 'CNC-Steuerungs-PC in der Fertigung' }, mode: { answer: 'Access' }, vlan: { answer: '20' } } },
        { cells: { dev: { given: 'WLAN-AP nur für Gäste (eine SSID)' }, mode: { answer: 'Access' }, vlan: { answer: '99' } } },
        { cells: { dev: { given: 'Uplink zum Core-Switch' }, mode: { answer: 'Trunk' }, vlan: { answer: '10,20,30,99', accept: ['10,20,30,99', '10, 20, 30, 99', 'alle', '10 20 30 99'] } } },
      ],
      hints: ['Ein Endgerät mit nur einem Netz → Access.', 'Zwischen Switches laufen alle VLANs.'],
      explanation: `Endgeräte mit einem Netz → **Access** mit ihrem VLAN. Der Uplink zum Core muss alle VLANs transportieren → **Trunk**.`,
    },
    {
      id: 'm08-q022',
      kind: 'free',
      skill: 'vlan.basics',
      difficulty: 2,
      prompt: `Die Geschäftsführung der Elektro Krämer GmbH möchte wissen, warum du die Einführung von VLANs vorschlägst, statt weiterhin ein einziges großes Netz zu betreiben. Erläutern Sie zwei Vorteile von VLANs.`,
      modelAnswer: `Mit VLANs wird ein physisches Netz logisch in mehrere getrennte Netze aufgeteilt. 1. Sicherheit: Abteilungen wie Verwaltung, Produktion und Gäste sind voneinander getrennt; Zugriffe zwischen ihnen sind nur über einen Router bzw. eine Firewall mit Regeln möglich, sodass z. B. Gäste nicht auf den Dateiserver zugreifen können. 2. Weniger Broadcastlast: Jedes VLAN ist eine eigene Broadcastdomäne, Broadcasts erreichen nur die Geräte des eigenen VLANs, was die Netzlast senkt. Weitere Vorteile: Flexibilität bei Umzügen (nur Portzuordnung ändern), Kostenersparnis, da weniger physische Switches nötig sind, bessere Übersicht.`,
      keywords: ['Sicherheit', 'Broadcastdomäne', 'Trennung', 'Flexibilität', 'Kosten'],
      explanation: `Zwei begründete Vorteile genügen, z. B. Sicherheit durch Trennung und weniger Broadcasts. Wichtig ist jeweils die Begründung, nicht nur das Schlagwort.`,
    },
    // ---------- Trunk / 802.1Q ----------
    {
      id: 'm08-q023',
      kind: 'number',
      skill: 'vlan.trunk',
      difficulty: 1,
      prompt: `Wie viele **Byte** fügt ein IEEE-802.1Q-Tag in einen Ethernet-Frame ein?`,
      answer: 4,
      unit: 'Byte',
      explanation: `Der 802.1Q-Tag ist **4 Byte** (32 Bit) lang: TPID (16 Bit), PCP (3), DEI (1), VID (12).`,
    },
    {
      id: 'm08-q024',
      kind: 'single',
      skill: 'vlan.trunk',
      difficulty: 2,
      prompt: `Welcher Bereich von VLAN-IDs ist nach IEEE 802.1Q **nutzbar**?`,
      options: ['0–4095', '1–4094', '1–1024', '1–4096'],
      answer: 1,
      distractors: {
        '0': { why: '0 und 4095 sind reserviert.', error: 'vlan-range-reserviert' },
        '2': { why: 'Bis 1005 reicht bei Cisco nur der „Normal Range“; 802.1Q erlaubt mehr.', error: 'vlan-range-normal' },
        '3': { why: '12 Bit ergeben 0–4095; 4096 gibt es nicht.', error: 'vlan-range-12bit' },
      },
      hints: ['12 Bit → 4096 Werte, von 0 an gezählt.', 'Der kleinste und der größte Wert sind reserviert.'],
      explanation: `12 Bit → 0–4095. **0** (nur Priorität) und **4095** sind reserviert → nutzbar **1–4094**.`,
    },
    {
      id: 'm08-q025',
      kind: 'match',
      skill: 'vlan.trunk',
      difficulty: 3,
      prompt: `Ordne die Felder des 802.1Q-Tags ihrer Bedeutung zu.`,
      left: ['TPID', 'PCP', 'DEI', 'VID'],
      right: ['VLAN-Nummer (12 Bit)', 'Kennung 0x8100 für „getaggter Frame“', 'Darf bei Überlast verworfen werden', 'Priorität 0–7 (QoS)'],
      answer: [1, 3, 2, 0],
      explanation: `TPID = 0x8100 (16 Bit), PCP = Priorität (3 Bit, 802.1p), DEI = Drop Eligible (1 Bit), VID = VLAN-ID (12 Bit).`,
    },
    {
      id: 'm08-q026',
      kind: 'single',
      skill: 'vlan.trunk',
      difficulty: 1,
      prompt: `Welche Verbindung wird typischerweise als **Trunk** konfiguriert?`,
      options: ['Switch ↔ Arbeitsplatz-PC', 'Switch ↔ Netzwerkdrucker', 'Switch ↔ Switch', 'Switch ↔ IP-Kamera'],
      answer: 2,
      distractors: {
        '0': { why: 'Ein PC hängt in einem VLAN → Access-Port.', error: 'trunk-endgeraet' },
        '1': { why: 'Ein Drucker hängt in einem VLAN → Access-Port.', error: 'trunk-endgeraet' },
        '3': { why: 'Eine Kamera hängt in einem VLAN → Access-Port.', error: 'trunk-endgeraet' },
      },
      explanation: `Zwischen Switches (und zu Routern, Hypervisoren, Multi-SSID-APs) müssen **mehrere VLANs** übertragen werden → **Trunk**.`,
    },
    {
      id: 'm08-q027',
      kind: 'text',
      skill: 'vlan.trunk',
      difficulty: 1,
      prompt: `Wie heißt der IEEE-Standard, der VLAN-Tagging beschreibt? (z. B. „IEEE 802.3“)`,
      accept: ['IEEE 802.1Q', '802.1Q', '802.1q', 'IEEE802.1Q', 'dot1q', 'IEEE 802.1 Q'],
      placeholder: 'IEEE …',
      explanation: `VLANs und das Tagging sind in **IEEE 802.1Q** standardisiert (Cisco-Kurzform: dot1q).`,
    },
    {
      id: 'm08-q028',
      kind: 'single',
      skill: 'vlan.trunk',
      difficulty: 3,
      prompt: `Auf einem Trunk zwischen SW1 und SW2 ist auf SW1 das Native VLAN 1, auf SW2 das Native VLAN 99 konfiguriert. Welches Problem entsteht?`,
      options: [
        'Keines, das Native VLAN ist nur lokal relevant.',
        'Ungetaggte Frames aus VLAN 1 von SW1 landen auf SW2 in VLAN 99 (und umgekehrt).',
        'Der Trunk überträgt dann gar keine VLANs mehr.',
        'Alle Frames werden doppelt getaggt.',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'Weil Native-VLAN-Frames untagged sind, interpretiert der Empfänger sie gemäß seinem eigenen Native VLAN – das muss übereinstimmen.', error: 'native-mismatch' },
        '2': { why: 'Getaggte VLANs funktionieren weiter; nur das Native VLAN ist betroffen.', error: 'native-mismatch-alles' },
        '3': { why: 'Doppeltes Tagging (Q-in-Q) entsteht so nicht.', error: 'native-qinq' },
      },
      explanation: `Native-VLAN-Frames sind **untagged**. SW2 ordnet ungetaggte Frames seinem Native VLAN (99) zu → Frames „springen“ zwischen VLAN 1 und 99 (*Native VLAN Mismatch*). Das ist ein Funktions- und Sicherheitsproblem.`,
    },
    // ---------- Inter-VLAN-Routing ----------
    {
      id: 'm08-q029',
      kind: 'single',
      skill: 'vlan.routing',
      difficulty: 1,
      prompt: `Was ist nötig, damit Geräte in VLAN 10 und VLAN 20 miteinander kommunizieren können?`,
      options: ['Ein Hub', 'Ein Router oder Layer-3-Switch', 'Ein zweiter Layer-2-Switch', 'Ein Repeater'],
      answer: 1,
      distractors: {
        '0': { why: 'Ein Hub arbeitet auf Schicht 1 und kann keine Netze verbinden.', error: 'intervlan-hub' },
        '2': { why: 'Ein weiterer Layer-2-Switch hebt die VLAN-Trennung nicht auf.', error: 'intervlan-l2' },
        '3': { why: 'Ein Repeater verstärkt nur Signale.', error: 'intervlan-repeater' },
      },
      explanation: `VLANs sind verschiedene IP-Netze → Verbindung über **Routing** (Router, Layer-3-Switch oder Firewall).`,
    },
    {
      id: 'm08-q030',
      kind: 'match',
      skill: 'vlan.routing',
      difficulty: 2,
      prompt: `Ordne die Begriffe zu.`,
      left: ['Router-on-a-Stick', 'SVI', 'Subinterface', 'Standardgateway'],
      right: [
        'Logische Unterschnittstelle eines Router-Ports, z. B. Gi0/0.20',
        'Virtuelle VLAN-Schnittstelle mit IP auf einem Layer-3-Switch',
        'Adresse, an die ein Client Pakete in fremde Netze schickt',
        'Ein Router-Port als Trunk routet zwischen mehreren VLANs',
      ],
      answer: [3, 1, 0, 2],
      explanation: `Router-on-a-Stick = ein Trunk zum Router mit Subinterfaces. SVI = virtuelles VLAN-Interface auf L3-Switch. Subinterface = logischer Teil eines physischen Ports. Standardgateway = Ziel für Pakete in fremde Netze.`,
    },
    {
      id: 'm08-q031',
      kind: 'single',
      skill: 'vlan.routing',
      difficulty: 3,
      prompt: `Bei Router-on-a-Stick fließen 300 Mbit/s Datenverkehr von VLAN 20 zum Server in VLAN 30. Der Trunk zum Router ist 1 Gbit/s (Vollduplex). Wie wird der Trunk belastet?`,
      options: [
        'Gar nicht, der Switch routet selbst.',
        'In jede Richtung mit 300 Mbit/s, weil der Verkehr zum Router hin und vom Router zurück über denselben Trunk läuft.',
        'Mit 600 Mbit/s nur in Richtung Router.',
        'Mit 150 Mbit/s, weil der Verkehr aufgeteilt wird.',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'Ein Layer-2-Switch routet nicht – deshalb ja Router-on-a-Stick.', error: 'rots-l2-routet' },
        '2': { why: 'Hin- und Rückweg nutzen verschiedene Richtungen der Vollduplex-Leitung.', error: 'rots-duplex' },
        '3': { why: 'Der Verkehr wird nicht halbiert, er läuft komplett zweimal über den Trunk.', error: 'rots-halbiert' },
      },
      explanation: `Der Verkehr läuft getaggt (VID 20) **zum** Router und getaggt (VID 30) **zurück**. Auf der Vollduplex-Leitung belastet das beide Richtungen mit je 300 Mbit/s. Das ist der typische Engpass von Router-on-a-Stick.`,
    },
    {
      id: 'm08-q032',
      kind: 'free',
      skill: 'vlan.routing',
      difficulty: 3,
      prompt: `Die Elektro Krämer GmbH setzt bisher Router-on-a-Stick ein, die Datenmengen zwischen Produktions- und Server-VLAN steigen jedoch stark. Erläutern Sie, welche Alternative Sie empfehlen und warum.`,
      modelAnswer: `Ich empfehle einen Layer-3-Switch als Core-Switch. Dort wird für jedes VLAN eine virtuelle Schnittstelle (SVI) mit der Gateway-IP angelegt. Der Switch routet zwischen den VLANs selbst, in Hardware und mit hoher Geschwindigkeit. Der Verkehr muss nicht mehr über eine einzelne Trunk-Leitung zum Router und zurück laufen, die bei Router-on-a-Stick zum Engpass wird. Zugriffe zwischen VLANs lassen sich mit ACLs einschränken; der Router bzw. die Firewall wird nur noch für Internet-/Standortverkehr benötigt.`,
      keywords: ['Layer-3-Switch', 'SVI', 'Engpass', 'Trunk', 'Hardware', 'ACL'],
      explanation: `Erwartet: Layer-3-Switch mit SVIs, Begründung Engpass/Performance, ggf. Sicherheit über ACLs.`,
    },
    // ---------- STP / LACP ----------
    {
      id: 'm08-q033',
      kind: 'single',
      skill: 'switch.stp',
      difficulty: 1,
      prompt: `Wozu dient das **Spanning Tree Protocol**?`,
      options: [
        'Zur Vergabe von IP-Adressen',
        'Zur Vermeidung von Schleifen in redundanten Layer-2-Netzen',
        'Zur Verschlüsselung von Frames',
        'Zur Bündelung mehrerer Leitungen',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'IP-Adressen vergibt DHCP.', error: 'stp-dhcp' },
        '2': { why: 'STP verschlüsselt nichts.', error: 'stp-encrypt' },
        '3': { why: 'Leitungsbündelung macht LACP.', error: 'stp-lacp' },
      },
      explanation: `STP verhindert **Layer-2-Schleifen**, indem es redundante Ports blockiert und erst bei Ausfall freigibt.`,
    },
    {
      id: 'm08-q034',
      kind: 'single',
      skill: 'switch.stp',
      difficulty: 2,
      prompt: `Drei Switches haben die gleiche Bridge-Priorität 32768. MACs: SW-A \`00:1A:…:10\`, SW-B \`00:0C:…:20\`, SW-C \`00:1A:…:05\`. Welcher wird Root Bridge?`,
      options: ['SW-A', 'SW-B', 'SW-C', 'Der mit den meisten Ports'],
      answer: 1,
      distractors: {
        '0': { why: '00:1A… ist größer als 00:0C…', error: 'stp-root-mac' },
        '2': { why: 'Die MAC wird von vorne verglichen; 00:0C… ist kleiner als 00:1A…, egal wie das Ende aussieht.', error: 'stp-root-mac-ende' },
        '3': { why: 'Die Portanzahl spielt keine Rolle.', error: 'stp-root-ports' },
      },
      hints: ['Niedrigste Bridge-ID gewinnt.', 'Bei gleicher Priorität entscheidet die MAC – von links verglichen.'],
      explanation: `Gleiche Priorität → kleinste MAC gewinnt. \`00:0C\` < \`00:1A\` → **SW-B** wird Root Bridge.`,
    },
    {
      id: 'm08-q035',
      kind: 'multi',
      skill: 'switch.stp',
      difficulty: 2,
      prompt: `Welche Folgen hat eine Layer-2-Schleife **ohne** Spanning Tree? (Mehrfachauswahl)`,
      options: [
        'Broadcast-Sturm',
        'Instabile MAC-Adresstabellen',
        'Endgeräte erhalten Frames mehrfach',
        'Frames werden nach Ablauf der TTL verworfen',
        'Automatische Lastverteilung über beide Wege',
      ],
      answer: [0, 1, 2],
      explanation: `Ohne STP: **Broadcast-Sturm**, **MAC-Flapping**, **doppelte Frames**. Ethernet-Frames haben keine TTL, und von Lastverteilung kann keine Rede sein.`,
    },
    {
      id: 'm08-q036',
      kind: 'single',
      skill: 'switch.lacp',
      difficulty: 2,
      prompt: `Ein NAS wird mit zwei 1-Gbit/s-Leitungen per LACP an den Switch angebunden. Welche Aussage stimmt?`,
      options: [
        'Jede einzelne Dateiübertragung eines Clients läuft garantiert mit 2 Gbit/s.',
        'Die Gesamtbandbreite für viele Clients steigt auf bis zu 2 Gbit/s, und bei Ausfall einer Leitung bleibt das NAS erreichbar.',
        'STP blockiert eine der beiden Leitungen.',
        'LACP benötigt zwingend unterschiedliche VLANs auf beiden Leitungen.',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'Ein einzelner Datenstrom wird per Hash auf eine Leitung verteilt und bleibt meist bei 1 Gbit/s.', error: 'lacp-einzelstrom' },
        '2': { why: 'STP sieht die Bündelung als eine logische Verbindung und blockiert nichts.', error: 'lacp-stp' },
        '3': { why: 'Im Gegenteil: Alle gebündelten Ports müssen gleich konfiguriert sein.', error: 'lacp-config' },
      },
      explanation: `LACP bündelt Leitungen: **mehr Gesamtbandbreite** (für viele Ströme) und **Redundanz**. Ein einzelner Strom nutzt meist nur eine Leitung.`,
    },
    {
      id: 'm08-q037',
      kind: 'match',
      skill: 'switch.stp',
      difficulty: 3,
      prompt: `Ordne die Standards zu.`,
      left: ['IEEE 802.1D', 'IEEE 802.1w', 'IEEE 802.3ad / 802.1AX', 'IEEE 802.1Q'],
      right: ['Link Aggregation (LACP)', 'VLAN-Tagging', 'Spanning Tree (STP)', 'Rapid Spanning Tree (RSTP)'],
      answer: [2, 3, 0, 1],
      explanation: `802.1D = STP, 802.1w = RSTP, 802.3ad/802.1AX = LACP, 802.1Q = VLANs.`,
    },
    // ---------- gemischt / Situationen ----------
    {
      id: 'm08-q038',
      kind: 'table',
      skill: 'switch.mactable',
      difficulty: 3,
      prompt: `Ein Switch hat VLAN 10 auf Port 1–2 und VLAN 20 auf Port 3–4, MAC-Tabelle leer. PC-A (AA) an Port 1, PC-B (BB) an Port 2, PC-C (CC) an Port 3, PC-D (DD) an Port 4. Gib die Ausgangsport(s) an (Komma-getrennt, aufsteigend; „keine“, wenn nichts weitergeleitet wird).`,
      columns: [
        { key: 'frame', label: 'Frame', type: 'text' },
        { key: 'ports', label: 'Ausgangsport(s)', type: 'text' },
      ],
      rows: [
        { cells: { frame: { given: '1) A → Broadcast' }, ports: { answer: '2' } } },
        { cells: { frame: { given: '2) C → Broadcast' }, ports: { answer: '4' } } },
        { cells: { frame: { given: '3) B → A' }, ports: { answer: '1' } } },
        { cells: { frame: { given: '4) D → BB (Unicast)' }, ports: { answer: '3' } } },
      ],
      hints: ['Geflutet wird nur innerhalb des VLANs des Eingangsports.', 'Die MAC-Tabelle ist pro VLAN getrennt: BB ist nur in VLAN 10 gelernt.'],
      explanation: `1) Broadcast in VLAN 10 → nur Port 2. 2) Broadcast in VLAN 20 → nur Port 4. 3) AA ist in VLAN 10 an Port 1 bekannt → Forwarding Port 1. 4) D ist in VLAN 20; BB ist dort **nicht** bekannt (nur in VLAN 10) → Flooding innerhalb VLAN 20 → Port 3. Der Frame erreicht PC-B nie.`,
    },
    {
      id: 'm08-q039',
      kind: 'single',
      skill: 'vlan.access',
      difficulty: 2,
      prompt: `**Handlungssituation:** Ein Mitarbeiter der Verwaltung zieht vom Erdgeschoss ins Obergeschoss. Er soll weiterhin im VLAN 10 arbeiten. Was ist zu tun?`,
      options: [
        'Neues Kabel vom Erdgeschoss-Switch ins Obergeschoss verlegen.',
        'Den Port am Obergeschoss-Switch, an dem sein PC angeschlossen wird, als Access-Port in VLAN 10 konfigurieren (VLAN 10 muss auf dem Trunk erlaubt sein).',
        'Dem PC eine neue MAC-Adresse geben.',
        'Den PC als Trunk-Port konfigurieren.',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'Genau das spart man sich mit VLANs – Trunks transportieren VLAN 10 bereits zwischen den Switches.', error: 'vlan-umzug-kabel' },
        '2': { why: 'Die MAC hat mit der VLAN-Zuordnung bei portbasierten VLANs nichts zu tun.', error: 'vlan-mac' },
        '3': { why: 'Endgeräte hängen an Access-Ports.', error: 'trunk-endgeraet' },
      },
      explanation: `Portbasiert: einfach den neuen Port in **VLAN 10** setzen. Das ist der Flexibilitätsvorteil von VLANs.`,
    },
    // ---------- OUI (Hex ↔ Binär) ----------
    {
      id: 'm08-q040',
      kind: 'text',
      skill: 'mac.oui',
      difficulty: 1,
      prompt: `\`ipconfig /all\` zeigt für eine Netzwerkkarte die physische Adresse **4C-E1-73-0A-1B-2C**. Gib die **OUI** in Binärdarstellung an (24 Bit, drei Bytes mit Leerzeichen getrennt).`,
      placeholder: 'xxxxxxxx xxxxxxxx xxxxxxxx',
      accept: ['01001100 11100001 01110011', '010011001110000101110011', '01001100.11100001.01110011', '01001100-11100001-01110011', '01001100:11100001:01110011', '0100 1100 1110 0001 0111 0011'],
      misconceptions: [
        { answer: '00001010 00011011 00101100', error: 'oui-position', why: 'Das sind die letzten drei Bytes (Gerätekennung). Die OUI sind die **ersten** drei Bytes: 4C-E1-73.' },
        { answer: '1001100 11100001 1110011', error: 'bin-fuehrende-nullen', why: 'Jedes Byte hat 8 Stellen – führende Nullen gehören dazu (4C = 01001100, 73 = 01110011).' },
      ],
      hints: ['OUI = die ersten drei Bytes: 4C-E1-73.', 'Jede Hex-Ziffer = 4 Bit: 4 = 0100, C = 1100, E = 1110, 1 = 0001, 7 = 0111, 3 = 0011.'],
      explanation: `**Ergebnis:** \`01001100 11100001 01110011\`

**Weg:**
1. OUI = erste drei Bytes: **4C-E1-73**.
2. Jede Hex-Ziffer einzeln in 4 Bit (8-4-2-1):

| Hex | 4 | C | E | 1 | 7 | 3 |
|---|---|---|---|---|---|---|
| Binär | 0100 | 1100 | 1110 | 0001 | 0111 | 0011 |

3. Zu Bytes zusammensetzen: 01001100 · 11100001 · 01110011.

Häufiger Fehler: die letzten drei Bytes nehmen oder führende Nullen weglassen.`,
    },
    {
      id: 'm08-q041',
      kind: 'text',
      skill: 'mac.oui',
      difficulty: 2,
      prompt: `Eine Herstellerliste nennt die OUI binär: \`1101 0000  0101 0111  1001 0100\`. Gib die OUI **hexadezimal** an (Schreibweise XX-XX-XX).`,
      placeholder: 'XX-XX-XX',
      accept: ['D0-57-94', 'D0:57:94', 'D05794', 'D0 57 94', 'D0.57.94'],
      misconceptions: [
        { answer: '94-57-D0', error: 'oui-byte-reihenfolge', why: 'Die Bytes stehen in umgekehrter Reihenfolge. Lies von links nach rechts.' },
        { answer: '0B-EA-29', error: 'bin-reihenfolge', why: 'Du hast die Bits jedes Bytes von rechts gelesen. Das linke Bit jeder Vierergruppe hat den Wert 8.' },
      ],
      hints: ['Vierergruppen: 1101 | 0000 | 0101 | 0111 | 1001 | 0100.', 'Jede Gruppe mit 8-4-2-1 addieren: 1101 = 8 + 4 + 1 = 13 = D.'],
      explanation: `**Ergebnis:** **D0-57-94**

**Weg:** jede Vierergruppe mit den Stellenwerten 8-4-2-1 umrechnen:
- 1101 = 8 + 4 + 1 = 13 = **D**
- 0000 = **0**
- 0101 = 4 + 1 = **5**
- 0111 = 4 + 2 + 1 = **7**
- 1001 = 8 + 1 = **9**
- 0100 = **4**

→ D0-57-94. Häufiger Fehler: Bits innerhalb der Gruppe rückwärts lesen.`,
    },
    {
      id: 'm08-q042',
      kind: 'table',
      skill: 'mac.oui',
      difficulty: 2,
      prompt: `Für die Inventarliste sollen die OUIs dreier Netzwerkkarten zusätzlich binär eingetragen werden. Ergänze die Tabelle (drei Bytes, mit Leerzeichen getrennt).`,
      columns: [{ key: 'bin', label: 'OUI binär', type: 'text' }],
      rows: [
        { label: '00-1A-2B', cells: { bin: { answer: '00000000 00011010 00101011', accept: ['000000000001101000101011'] } } },
        { label: 'F4-8E-38', cells: { bin: { answer: '11110100 10001110 00111000', accept: ['111101001000111000111000'] } } },
        { label: '08-00-27', cells: { bin: { answer: '00001000 00000000 00100111', accept: ['000010000000000000100111'] } } },
      ],
      hints: ['Jede Hex-Ziffer = 4 Bit. Führende Nullen nicht vergessen: 0 = 0000.'],
      explanation: `**Weg:** Hex-Ziffer für Hex-Ziffer in 4 Bit umwandeln:
- 00-1A-2B: 0000 0000 · 0001 1010 · 0010 1011
- F4-8E-38: 1111 0100 · 1000 1110 · 0011 1000
- 08-00-27: 0000 1000 · 0000 0000 · 0010 0111

Häufiger Fehler: ein Byte wie 08 als „1000“ statt „00001000“ schreiben.`,
    },
    // ---------- Switch-Auswahl und PoE-Budget ----------
    {
      id: 'm08-q043',
      kind: 'multi',
      skill: 'switch.select',
      difficulty: 1,
      prompt: `Welche Funktionen bietet ein **managed** Switch, ein **unmanaged** Switch aber **nicht**?`,
      options: [
        'VLANs nach IEEE 802.1Q konfigurieren',
        'Datenverkehr eines Ports auf einen Analyse-Port spiegeln (Port-Mirroring)',
        'Überwachung per SNMP',
        'MAC-Adressen lernen und Frames gezielt weiterleiten',
        'Geschwindigkeit automatisch aushandeln (Autonegotiation)',
        'Zugriff per SSH auf eine Konfigurationsoberfläche',
      ],
      answer: [0, 1, 2, 5],
      hints: ['Was davon ist eine **Einstellung**, die man vornehmen muss?'],
      explanation: `**Nur managed:** VLANs, Port-Mirroring, SNMP-Überwachung und Fernzugriff per SSH (bzw. Web) – das sind Funktionen, die man **konfigurieren** muss. **Jeder** Switch – auch unmanaged – lernt MAC-Adressen, leitet gezielt weiter und handelt die Geschwindigkeit automatisch aus.`,
    },
    {
      id: 'm08-q044',
      kind: 'number',
      skill: 'switch.select',
      difficulty: 2,
      prompt: `In einer Abteilung sollen **14 PCs, 3 Netzwerkdrucker und 1 Access Point** an einen neuen Switch. Die IT-Richtlinie verlangt **25 % Portreserve**. Wie viele Ports werden mindestens benötigt? (Jedes Gerät belegt einen Port; auf ganze Ports aufrunden.)`,
      answer: 23,
      unit: 'Ports',
      misconceptions: [
        { answer: '22', error: 'abrunden-aufrunden', why: '18 × 1,25 = 22,5. Ein halber Port reicht nicht – bei Ports wird **aufgerundet**.' },
        { answer: '18', error: 'reserve-vergessen', why: 'Das ist der Bedarf ohne die geforderte Reserve von 25 %.' },
        { answer: '24', error: 'standardgroesse-statt-bedarf', why: '24 ist die passende Standardgröße des Switches. Gefragt war aber der berechnete Mindestbedarf.' },
      ],
      hints: ['Geräte zählen: 14 + 3 + 1.', 'Mit 1,25 multiplizieren und aufrunden.'],
      explanation: `**23 Ports.** 14 + 3 + 1 = 18 Geräte. 18 × 1,25 = 22,5 → aufgerundet **23**. Passende Standardgröße: ein 24-Port-Switch.`,
    },
    {
      id: 'm08-q045',
      kind: 'table',
      skill: 'switch.poebudget',
      difficulty: 2,
      prompt: `Für einen PoE-Switch soll der Leistungsbedarf geplant werden. Rechne mit der Leistung am **Switch-Port (PSE)** und ergänze die Tabelle.

| Gerät | Anzahl | Klasse | Leistung am Switch-Port (PSE) | Leistung am Gerät (PD) |
|---|---|---|---|---|
| IP-Telefon | 10 | 2 | 7 W | 6,49 W |
| Access Point (PoE+) | 4 | 4 | 30 W | 25,5 W |
| IP-Kamera | 3 | 3 | 15,4 W | 12,95 W |`,
      columns: [{ key: 'w', label: 'Leistung gesamt (W)', type: 'number' }],
      rows: [
        { label: 'IP-Telefone', cells: { w: { answer: '70' } } },
        { label: 'Access Points', cells: { w: { answer: '120' } } },
        { label: 'IP-Kameras', cells: { w: { answer: '46,2' } } },
        { label: 'Summe', cells: { w: { answer: '236,2' } } },
      ],
      misconceptions: [
        { cell: 'w', answer: '102', error: 'poe-pd-statt-pse', why: 'Das ist der PD-Wert der Access Points (4 × 25,5 W). Für das Switch-Budget zählt die Leistung am Port (30 W).' },
      ],
      hints: ['Je Zeile: Anzahl × PSE-Leistung.', 'Summe = alle drei Zeilen addiert.'],
      explanation: `**Weg:**
- Telefone: 10 × 7 W = **70 W**
- Access Points: 4 × 30 W = **120 W**
- Kameras: 3 × 15,4 W = **46,2 W**
- Summe: 70 + 120 + 46,2 = **236,2 W**

Häufiger Fehler: die PD-Spalte verwenden (ergäbe 64,9 + 102 + 38,85 = 205,75 W) – dann wäre das Budget zu knapp geplant.`,
    },
    {
      id: 'm08-q046',
      kind: 'number',
      skill: 'switch.poebudget',
      difficulty: 3,
      prompt: `Ein PoE-Switch hat ein **PoE-Budget von 370 W**. Angeschlossen sind **12 IP-Telefone** (7 W am Port), **4 IP-Kameras** (15,4 W am Port) und **2 Access Points** (PoE+, 30 W am Port). Wie viele **weitere** PoE+-Access-Points (30 W am Port) können noch versorgt werden? Freie Ports sind genug vorhanden.`,
      answer: 5,
      unit: 'Access Points',
      misconceptions: [
        { answer: '6', error: 'abrunden-aufrunden', why: '164,4 W ÷ 30 W = 5,48. Für einen sechsten AP fehlen 15,6 W – bei Geräten wird **abgerundet**.' },
        { answer: '12', error: 'poe-bestand-vergessen', why: 'Du hast das ganze Budget durch 30 W geteilt. Die bereits angeschlossenen Geräte verbrauchen schon 205,6 W.' },
        { answer: '7', error: 'poe-pd-statt-pse', why: 'Du hast mit PD-Werten (Leistung am Gerät) gerechnet. Das Switch-Budget wird mit der Port-Leistung (PSE) belastet.' },
      ],
      hints: ['Erst die belegte Leistung: 12 × 7 + 4 × 15,4 + 2 × 30.', 'Restbudget ÷ 30 W, dann abrunden.'],
      explanation: `**5 Access Points.**
1. Belegt: 12 × 7 W = 84 W; 4 × 15,4 W = 61,6 W; 2 × 30 W = 60 W → **205,6 W**
2. Rest: 370 W − 205,6 W = **164,4 W**
3. 164,4 W ÷ 30 W = 5,48 → abgerundet **5**`,
    },
    {
      id: 'm08-q047',
      kind: 'single',
      skill: 'switch.select',
      difficulty: 2,
      prompt: `**Handlungssituation:** Das Büro Berlin der Elektro Krämer GmbH bekommt einen neuen Switch. Angeschlossen werden **10 PCs, 1 Netzwerkdrucker, 10 IP-Telefone** (7 W am Port) und **2 Access Points** (PoE+, 30 W am Port). Telefone sollen in ein eigenes VLAN. Gefordert sind **20 % Portreserve**. Jedes Gerät belegt einen eigenen Port, der Uplink läuft über SFP.

| | BX-24P | BX-48U | BX-48P |
|---|---|---|---|
| RJ45-Ports (1 Gbit/s) | 24 | 48 | 48 |
| davon PoE+ | 24 | 48 | 24 |
| PoE-Budget | 370 W | 600 W | 370 W |
| Management | managed (802.1Q, SSH, SNMP) | unmanaged | managed (802.1Q, SSH, SNMP) |
| Preis netto | 549 € | 699 € | 899 € |

Welches Modell ist das günstigste, das alle Anforderungen erfüllt?`,
      options: ['BX-24P', 'BX-48U', 'BX-48P'],
      answer: 2,
      distractors: {
        '0': { why: '23 Geräte × 1,2 = 27,6 → 28 Ports nötig. Der BX-24P hat nur 24.', error: 'switch-ports-zu-wenig' },
        '1': { why: 'Der BX-48U ist unmanaged – das geforderte Telefon-VLAN lässt sich nicht einrichten.', error: 'switch-unmanaged-vlan' },
      },
      hints: ['Ports: (10 + 1 + 10 + 2) × 1,2 = ? – aufrunden.', 'PoE: 10 × 7 W + 2 × 30 W = 130 W, 12 PoE-Ports.'],
      explanation: `**BX-48P.**
1. Ports: 10 + 1 + 10 + 2 = 23 Geräte × 1,2 = 27,6 → **28 Ports** → BX-24P scheidet aus.
2. VLAN gefordert → **managed** nötig → BX-48U scheidet aus.
3. BX-48P: 48 Ports ≥ 28, 24 PoE-Ports ≥ 12, Budget 370 W ≥ 10 × 7 W + 2 × 30 W = 130 W, managed ✔

Häufiger Fehler: nur auf den Preis oder nur auf das PoE-Budget schauen.`,
    },
    {
      id: 'm08-q048',
      kind: 'free',
      skill: 'switch.select',
      difficulty: 3,
      prompt: `Ein Kunde des IT-Systemhauses (Steuerbüro, **12 Arbeitsplätze**, kein VoIP, keine VLANs geplant) braucht einen Switch. Das Gerät steht **im Büroraum unter einem Schreibtisch**. Zwei Angebote liegen vor:

| | Modell X | Modell Y |
|---|---|---|
| Ports | 16 × 1 Gbit/s | 24 × 1 Gbit/s + 4 × SFP+ |
| Management | unmanaged | managed (VLAN, SNMP, SSH) |
| Bauform | Desktop, **lüfterlos** | 19″, 1 HE, **2 Lüfter** |
| PoE | nein | 24 × PoE+, 370 W |
| Preis netto | 89 € | 389 € |

Empfehle ein Modell und begründe deine Entscheidung mit **mindestens drei** Kriterien. Nenne auch einen möglichen Nachteil deiner Wahl.`,
      modelAnswer: `Empfehlung: **Modell X**.
- **Portbedarf:** 12 Arbeitsplätze, mit 20–25 % Reserve rund 15 Ports → 16 Ports reichen.
- **Funktionen:** Es sind keine VLANs, kein PoE (kein VoIP) und keine Überwachung gefordert → ein unmanaged Switch genügt.
- **Aufstellort:** Das Gerät steht im Büro → lüfterlos ist leise; ein 19″-Gerät mit Lüftern gehört in einen Serverschrank.
- **Wirtschaftlichkeit:** 89 € statt 389 € – die Zusatzfunktionen von Y würden bezahlt, aber nicht genutzt.
Nachteil: keine Erweiterungsreserve für VLANs, PoE oder Überwachung. Plant der Kunde später VoIP oder ein Gäste-WLAN mit eigenem VLAN, müsste der Switch getauscht werden.`,
      keywords: ['Portbedarf', 'Reserve', 'unmanaged', 'keine VLANs', 'lüfterlos', 'Preis', 'Nachteil'],
      explanation: `Eine gute Antwort prüft jede Anforderung (Ports + Reserve, Funktionen, Aufstellort, Preis) und begründet damit die Wahl. „Größer ist besser“ ist **keine** Begründung – überdimensionierte Geräte kosten mehr und passen hier nicht an den Aufstellort.`,
    },
    {
      id: 'm08-q049',
      kind: 'free',
      skill: 'switch.select',
      difficulty: 2,
      prompt: `Erläutere den Unterschied zwischen einem **managed** und einem **unmanaged** Switch und nenne **drei** Funktionen, die nur ein managed Switch bietet.`,
      modelAnswer: `Ein **unmanaged** Switch arbeitet ohne Konfiguration (Plug and Play): Er lernt MAC-Adressen und leitet Frames weiter, man kann aber nichts einstellen oder überwachen. Ein **managed** Switch lässt sich über Weboberfläche, SSH/CLI oder SNMP konfigurieren und überwachen.
Funktionen nur bei managed: VLANs nach IEEE 802.1Q (Access-/Trunk-Ports), Spanning Tree konfigurieren, Link Aggregation (LACP), Port-Mirroring, SNMP-Überwachung, QoS-Priorisierung, 802.1X-Portauthentifizierung, Zugriffslisten.`,
      keywords: ['Konfiguration', 'Plug and Play', 'VLAN', 'SNMP', 'Spanning Tree', 'Port-Mirroring', 'LACP'],
      explanation: `Kern: **unmanaged = nicht konfigurierbar**, **managed = konfigurier- und überwachbar**. Drei beliebige Funktionen aus der Liste genügen.`,
    },
    {
      id: 'm08-q050',
      kind: 'single',
      skill: 'switch.poebudget',
      difficulty: 1,
      prompt: `Im Datenblatt eines 24-Port-PoE+-Switches steht „**PoE-Budget: 370 W**“. Was bedeutet das?`,
      options: [
        'Jeder Port kann 370 W liefern.',
        'Alle PoE-Ports zusammen können höchstens 370 W liefern.',
        'Der Switch selbst verbraucht 370 W.',
        'Jedes angeschlossene Gerät darf 370 W ÷ 24 ≈ 15,4 W aufnehmen.',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'Ein PoE+-Port liefert höchstens 30 W. 370 W ist die Summe für alle Ports.', error: 'poe-budget-pro-port' },
        '2': { why: 'Die Leistungsaufnahme des Switches selbst steht separat im Datenblatt.', error: 'poe-budget-pro-port' },
        '3': { why: 'Das Budget wird nicht gleichmäßig verteilt – ein Port darf bis zu 30 W (PoE+) liefern, solange die Summe 370 W nicht übersteigt.', error: 'poe-budget-pro-port' },
      },
      explanation: `Das **PoE-Budget** ist die **Gesamtleistung**, die alle PoE-Ports zusammen liefern können. 24 × 30 W wären 720 W – deshalb muss man planen, welche Geräte angeschlossen werden.`,
    },
    {
      id: 'm08-q051',
      kind: 'single',
      skill: 'vlan.trunk',
      difficulty: 2,
      prompt: `In der Weboberfläche eines Switches findest du den Menüpunkt „**Trunking**“, in dem man mehrere Ports zu einer Gruppe zusammenfassen kann. Was ist hier gemeint?`,
      options: [
        'Ein 802.1Q-Trunk, der mehrere VLANs getaggt überträgt',
        'Link Aggregation: mehrere physische Leitungen zu einer logischen Verbindung bündeln',
        'Spanning Tree, das redundante Ports blockiert',
        'Port-Mirroring für die Fehlersuche',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'Ein VLAN-Trunk ist **ein** Port, der mehrere VLANs transportiert. Hier werden aber **mehrere Ports** zusammengefasst.', error: 'trunk-trunking' },
        '2': { why: 'STP bündelt keine Ports, sondern blockiert redundante Verbindungen.', error: 'stp-lacp' },
        '3': { why: 'Mirroring kopiert Datenverkehr auf einen Analyse-Port, es bündelt nichts.', error: 'trunk-trunking' },
      },
      explanation: `Manche Hersteller nennen **Link Aggregation** (LACP, IEEE 802.1AX) „Trunking“. Das Zusammenfassen mehrerer **Ports zu einer Gruppe** verrät es. Ein **VLAN-Trunk** (802.1Q) ist dagegen ein einzelner Port mit getaggten Frames mehrerer VLANs.`,
    },
    {
      id: 'm08-q052',
      kind: 'number',
      skill: 'switch.select',
      difficulty: 3,
      prompt: `Ein Switch hat **48 Ports mit 1 Gbit/s** und **4 Uplinks mit 10 Gbit/s**. Welche **Switching-Kapazität** (in Gbit/s) muss er mindestens haben, um alle Ports gleichzeitig im **Vollduplex** ohne Engpass (non-blocking) zu bedienen?`,
      answer: 176,
      unit: 'Gbit/s',
      misconceptions: [
        { answer: '88', error: 'vollduplex-vergessen', why: 'Das ist nur eine Richtung. Bei Vollduplex sendet und empfängt jeder Port gleichzeitig → × 2.' },
        { answer: '96', error: 'uplinks-vergessen', why: 'Das sind nur die 48 Gigabit-Ports im Vollduplex. Die vier 10-Gbit/s-Uplinks fehlen (+ 80 Gbit/s).' },
      ],
      hints: ['Summe aller Port-Geschwindigkeiten bilden.', 'Vollduplex: jede Richtung zählt → × 2.'],
      explanation: `**176 Gbit/s.**
1. Ports: 48 × 1 Gbit/s = 48 Gbit/s
2. Uplinks: 4 × 10 Gbit/s = 40 Gbit/s
3. Summe einer Richtung: 48 + 40 = 88 Gbit/s
4. Vollduplex: 88 Gbit/s × 2 = **176 Gbit/s**`,
    },
    {
      id: 'm08-q053',
      kind: 'single',
      skill: 'switch.mactable',
      difficulty: 1,
      prompt: `Ein Arbeitsblatt fragt nach der „ARP-Tabelle des Switches“. Welche Aussage ist fachlich richtig?`,
      options: [
        'Der Switch ordnet in seiner ARP-Tabelle IP-Adressen den Ports zu.',
        'Ein Layer-2-Switch führt eine MAC-Adresstabelle (MAC-Adresse → Port); die ARP-Tabelle gehört zu PCs und Routern (IP-Adresse → MAC-Adresse).',
        'ARP-Tabelle und MAC-Tabelle sind zwei Namen für dieselbe Tabelle.',
        'Der Switch speichert in der ARP-Tabelle die Frames, bis der Empfänger antwortet.',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'Ein Layer-2-Switch wertet keine IP-Adressen aus.', error: 'switch-layer3' },
        '2': { why: 'Die Tabellen haben verschiedene Inhalte: ARP ordnet IP → MAC zu, die Switch-Tabelle MAC → Port.', error: 'arp-mac-tabelle' },
        '3': { why: 'Weder die ARP- noch die MAC-Tabelle speichert Frames.', error: 'arp-mac-tabelle' },
      },
      explanation: `Der Switch lernt **MAC-Adresse → Port** (MAC-, CAM- oder Forwarding-Tabelle). Die **ARP-Tabelle** führen Hosts und Router: **IP-Adresse → MAC-Adresse**. Der Begriff „ARP-Tabelle des Switches“ ist deshalb falsch.`,
    },
  ],
};
