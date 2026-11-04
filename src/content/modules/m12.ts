import type { Module } from '../types';

/**
 * Modul 12 – Netzwerktechnik, Verkabelung und WLAN
 * Fiktives Praxisunternehmen: Elektro Krämer GmbH (Hauptsitz Hannover, Außenlager Hildesheim)
 */
export const m12: Module = {
  id: 'm12',
  nr: 12,
  title: 'Netzwerktechnik, Verkabelung und WLAN',
  short: `Kupfer und Glasfaser, Kabelkategorien, RJ45, Ethernet-Standards, PoE, strukturierte Verkabelung und WLAN-Grundlagen.`,
  icon: 'Cable',
  relevance: 'ap1',
  prerequisites: ['m01'],
  skills: [
    { id: 'cabling.media', module: 'm12', title: 'Kupfer und Glasfaser vergleichen und auswählen', requires: ['basics.devices'] },
    { id: 'cabling.fiber', module: 'm12', title: 'Glasfaser: Multimode/Singlemode, OM/OS, Stecker', requires: ['cabling.media'] },
    { id: 'cabling.shielding', module: 'm12', title: 'Twisted-Pair-Schirmung (XX/YTP nach ISO/IEC 11801)', requires: ['cabling.media'] },
    { id: 'cabling.categories', module: 'm12', title: 'Kabelkategorien Cat 5e bis Cat 8', requires: ['cabling.shielding'] },
    { id: 'cabling.rj45', module: 'm12', title: 'RJ45 und Belegung nach T568A/T568B', requires: ['cabling.categories'] },
    { id: 'ethernet.standards', module: 'm12', title: 'Ethernet-Standards und Benennungsschema', requires: ['cabling.categories', 'cabling.fiber'] },
    { id: 'ethernet.duplex', module: 'm12', title: 'Duplex, Autonegotiation, CSMA/CD', requires: ['ethernet.standards'] },
    { id: 'ethernet.poe', module: 'm12', title: 'Power over Ethernet (802.3af/at/bt) und Leistungsbudget', requires: ['ethernet.standards'] },
    { id: 'cabling.structured', module: 'm12', title: 'Strukturierte Verkabelung (Primär/Sekundär/Tertiär)', requires: ['cabling.media', 'cabling.categories'] },
    { id: 'wlan.standards', module: 'm12', title: 'WLAN-Standards 802.11 und Wi-Fi-Generationen' },
    { id: 'wlan.bands', module: 'm12', title: 'Frequenzbänder, Kanäle und Störungen', requires: ['wlan.standards'] },
    { id: 'wlan.operation', module: 'm12', title: 'WLAN-Betrieb: SSID, Modi, Roaming, CSMA/CA', requires: ['wlan.bands'] },
  ],
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'm12-l01',
      title: 'Übertragungsmedien: Kupfer oder Glasfaser?',
      minutes: 25,
      relevance: 'ap1',
      skills: ['cabling.media', 'cabling.fiber'],
      steps: [
        {
          type: 'explain',
          title: 'Zwei Welten: Elektrische Signale und Licht',
          body: `In jedem Firmennetz stellt sich bei jeder Leitung dieselbe Frage: **Kupfer oder Glasfaser?** Die Antwort hängt von **Entfernung, Datenrate, Umgebung, Stromversorgung der Endgeräte und Kosten** ab.

### Kupfer – Twisted Pair

Ein Netzwerkkabel für Ethernet besteht aus **vier verdrillten Adernpaaren** (Twisted Pair). Die Daten werden als **elektrische Spannungsänderungen** übertragen.

- **Vorteile:** günstig, einfach zu konfektionieren (RJ45), Netzwerkkarten haben fast immer einen RJ45-Port, und vor allem: **Strom kann mitübertragen werden (PoE)** – für Access Points, IP-Telefone, Kameras.
- **Nachteile:** Reichweite für Ethernet auf **100 m** begrenzt, anfällig für **elektromagnetische Störungen** (Motoren, Leuchtstofflampen, Starkstromleitungen), bei Verbindungen zwischen Gebäuden Gefahr durch **Potenzialunterschiede** (Ausgleichsströme, Blitzeinwirkung).

### Glasfaser (Lichtwellenleiter, LWL)

Die Daten werden als **Lichtimpulse** durch eine hauchdünne Glasfaser geschickt. Der **Kern** hat eine höhere Brechzahl als der umgebende **Mantel**, das Licht wird durch **Totalreflexion** im Kern geführt.

- **Vorteile:** **große Reichweiten** (hunderte Meter bis viele Kilometer), sehr hohe Datenraten, **unempfindlich gegen elektromagnetische Störungen**, **galvanische Trennung** (kein Strom → keine Potenzialprobleme zwischen Gebäuden), schwer abhörbar, leicht und dünn.
- **Nachteile:** teurere Komponenten (Transceiver, Spleißarbeiten), empfindlich gegen zu starkes Biegen (Mindestbiegeradius), Endgeräte-Anschluss nur mit Glasfaser-Port/SFP-Modul, **keine Stromversorgung** über die Faser.

### Vergleich

| Kriterium | Twisted Pair (Kupfer) | Glasfaser |
|---|---|---|
| Signal | elektrisch | optisch (Licht) |
| Reichweite Ethernet | max. **100 m** | Multimode einige 100 m, Singlemode bis viele km |
| EMV-Störungen | anfällig (Schirmung hilft) | **immun** |
| Potenzialtrennung | nein | **ja** (galvanisch getrennt) |
| PoE | **möglich** | nicht möglich |
| Kosten / Montage | günstig, einfach | teurer, Fachwissen/Werkzeug nötig |
| Typischer Einsatz | Etage: Dose → Etagenverteiler | Gebäude-/Etagenverbindungen, Rechenzentrum, WAN |

### Glasfaser genauer: Multimode und Singlemode

| | **Multimode (MM)** | **Singlemode (SM, Monomode)** |
|---|---|---|
| Kerndurchmesser | **50 µm** (OM2–OM5) oder **62,5 µm** (OM1) | ca. **9 µm** |
| Manteldurchmesser | 125 µm | 125 µm |
| Lichtausbreitung | viele Lichtwege (Moden) → **Modendispersion**: Impulse „verschmieren“ | nur ein Modus → kaum Dispersion |
| Lichtquelle / Wellenlänge | LED/VCSEL, meist **850 nm** (auch 1300 nm) | Laser, **1310 nm** / **1550 nm** |
| Reichweite (Beispiel) | 10GBASE-SR: **OM3 300 m, OM4 400 m** | 10GBASE-LR: **10 km**; andere Varianten deutlich mehr |
| Kosten | günstigere Transceiver | teurere Transceiver, Kabel selbst ähnlich |
| Einsatz | innerhalb von Gebäuden, Rechenzentrum | zwischen Gebäuden/Standorten, Provider, FTTH |

**Faserklassen und Mantelfarben** (übliche Kennzeichnung):

| Klasse | Typ | übliche Mantelfarbe |
|---|---|---|
| OM1, OM2 | Multimode | orange |
| OM3 | Multimode (laseroptimiert) | aqua/türkis |
| OM4 | Multimode (laseroptimiert) | aqua oder erikaviolett |
| OM5 | Multimode (Wideband) | limettengrün |
| OS1, OS2 | Singlemode | **gelb** |

### Steckverbinder

| Stecker | Merkmale |
|---|---|
| **LC** (Lucent Connector) | klein (Small Form Factor), Push-Pull mit Rastnase, meist als **Duplex** – Standard an **SFP-Modulen** und in modernen Patchfeldern |
| **SC** (Subscriber Connector) | quadratisch, größer, Push-Pull; verbreitet in älteren Installationen und bei FTTH |
| **ST** | Bajonettverschluss, rund – älter |
| **MPO/MTP** | Mehrfaserstecker (z. B. 12 oder 24 Fasern) für 40/100 Gbit/s im Rechenzentrum |

Zusätzlich gibt es unterschiedliche **Schliffe**: **PC/UPC** (gerade, bei SM oft blau) und **APC** (8° schräg, **grün**). APC und UPC dürfen **nicht** miteinander gesteckt werden.

**Sicherheitshinweis:** Niemals in eine aktive Faser oder einen Transceiver schauen – das Laserlicht ist meist **unsichtbares Infrarot** und kann die Netzhaut schädigen.

### SFP-Module (Transceiver)

Switches haben oft **SFP-Steckplätze** (SFP = 1 Gbit/s, SFP+ = 10 Gbit/s, SFP28 = 25 Gbit/s, QSFP+ = 40 Gbit/s). Das eingesteckte Modul bestimmt Medium und Reichweite. Das Modul muss zum **Fasertyp und zur Wellenlänge** passen – ein SR-Modul (Multimode, 850 nm) funktioniert nicht an einem LR-Modul (Singlemode, 1310 nm) auf der Gegenseite.`,
        },
        {
          type: 'explain',
          title: 'Wenn kein Netzwerkkabel liegt: PowerLAN – und Internet über das Kabelnetz (DOCSIS)',
          body: `**PowerLAN** (auch Powerline, dLAN) nutzt die **Stromleitungen** im Gebäude als Übertragungsmedium. Ein Adapter steckt an der Steckdose beim Router, ein zweiter an der Steckdose im entfernten Raum; dazwischen laufen die Daten über die 230-V-Leitung.

| Vorteile | Nachteile |
|---|---|
| keine neuen Kabel, sofort einsatzbereit | geteiltes Medium: alle Adapter im Stromnetz teilen sich die Datenrate |
| durchdringt Wände und Decken besser als WLAN | Werbeangaben („bis 2400 Mbit/s“) sind Bruttowerte; real oft nur ein Bruchteil |
| | störanfällig (Netzteile, Motoren, Mehrfachsteckdosen mit Filter), schlecht über verschiedene Stromkreise/Phasen |
| | funktioniert nicht über verschiedene Stromzähler hinweg; Verbindung muss **verschlüsselt** gekoppelt werden (sonst könnten Nachbarn mithören) |

**Einordnung:** PowerLAN ist eine Notlösung für Wohnung, Homeoffice oder Altbau. Für ein Firmengebäude bleibt die **strukturierte Verkabelung** der Standard.

**Internet über das Kabelnetz (DOCSIS):** Neben DSL (Telefonleitung, VDSL2 mit Vectoring bis 100 Mbit/s, Supervectoring bis 250 Mbit/s) und Glasfaser (FTTH mit Glasfasermodem/ONT) gibt es Internet über das **Kabelfernsehnetz**. Der Standard heißt **DOCSIS** (Data Over Cable Service Interface Specification); beim Kunden steht ein **Kabelmodem** am Koaxialanschluss. Mit **DOCSIS 3.1** sind rund **1 Gbit/s im Download** üblich, der Upload ist deutlich kleiner (asymmetrisch). Wichtig: Alle Haushalte eines Kabelsegments **teilen sich** die Kapazität – zu Stoßzeiten kann die Rate sinken.

| Zugang | Medium | Gerät beim Kunden |
|---|---|---|
| DSL (VDSL2) | Kupfer-Telefonleitung | DSL-Modem/-Router |
| Kabel (DOCSIS) | Koaxialkabel des TV-Kabelnetzes | Kabelmodem/-router |
| Glasfaser (FTTH) | Glasfaser bis in die Wohnung/das Gebäude | Glasfasermodem (ONT) bzw. Router mit Glasfaseranschluss |
| Mobilfunk (LTE/5G) | Funk | LTE-/5G-Router, oft als Backup |`,
        },
        {
          type: 'visual',
          title: 'Elektro Krämer: Wo welches Medium?',
          widget: {
            kind: 'topology',
            data: {
              zones: [
                { label: 'Verwaltungsgebäude', x: 10, y: 20, w: 470, h: 390, color: 'blue' },
                { label: 'Lagerhalle (250 m entfernt)', x: 520, y: 20, w: 270, h: 390, color: 'green' },
              ],
              nodes: [
                { id: 'core', type: 'switch', label: 'Core-Switch', sub: 'Serverraum', x: 120, y: 90 },
                { id: 'acc1', type: 'switch', label: 'Etage 1', x: 120, y: 240 },
                { id: 'acc2', type: 'switch', label: 'Etage 2', x: 330, y: 240 },
                { id: 'pc', type: 'pc', label: 'PC', x: 60, y: 370 },
                { id: 'ap', type: 'ap', label: 'AP (PoE)', x: 190, y: 370 },
                { id: 'ph', type: 'phone', label: 'IP-Telefon', x: 330, y: 370 },
                { id: 'lsw', type: 'switch', label: 'Lager-Switch', x: 650, y: 140 },
                { id: 'lpc', type: 'pc', label: 'Scanner-PC', x: 650, y: 320 },
              ],
              links: [
                { from: 'core', to: 'acc1', style: 'fiber', label: 'MM OM4' },
                { from: 'core', to: 'acc2', style: 'fiber', label: 'MM OM4' },
                { from: 'core', to: 'lsw', style: 'fiber', label: 'SM OS2' },
                { from: 'acc1', to: 'pc', style: 'lan', label: 'Cat 6A' },
                { from: 'acc1', to: 'ap', style: 'lan', label: 'PoE+' },
                { from: 'acc2', to: 'ph', style: 'lan', label: 'PoE' },
                { from: 'lsw', to: 'lpc', style: 'lan' },
              ],
            },
          },
          caption: `Glasfaser zwischen den Verteilern und zur 250 m entfernten Lagerhalle (dort Singlemode wegen Reserve und Gebäudetrennung), Kupfer (Cat 6A) zu den Endgeräten – dort wird auch PoE gebraucht.`,
        },
        {
          type: 'example',
          title: 'Anbindung der Lagerhalle',
          problem: `Die neue Lagerhalle von Elektro Krämer steht **250 m** vom Verwaltungsgebäude entfernt und hat einen eigenen Stromanschluss. In der Halle laufen große Elektromotoren (Förderbänder). Welches Medium wählst du für die Verbindung zwischen den Gebäuden, und warum?`,
          steps: [
            { label: 'Entfernung', body: `250 m > 100 m → Twisted Pair scheidet für Ethernet aus.` },
            { label: 'Umgebung', body: `Elektromotoren erzeugen starke elektromagnetische Felder; zwei Gebäude mit eigener Stromversorgung können unterschiedliche Erdpotenziale haben. Glasfaser ist **EMV-unempfindlich** und **galvanisch getrennt**.` },
            { label: 'Fasertyp', body: `250 m wären mit **Multimode OM3/OM4** für 10 Gbit/s machbar. Für Zukunftssicherheit (höhere Datenraten, Reserve) wird zwischen Gebäuden oft **Singlemode (OS2)** verlegt.` },
            { label: 'Anschluss', body: `An beiden Switches passende SFP+-Module (z. B. 10GBASE-LR bei Singlemode), Steckertyp **LC-Duplex**.` },
          ],
          result: `**Glasfaser** (z. B. Singlemode OS2 mit LC-Duplex und 10GBASE-LR-Transceivern): Reichweite, Störfestigkeit und Potenzialtrennung.`,
        },
        {
          type: 'check',
          question: {
            id: 'm12-l01-c1',
            kind: 'multi',
            skill: 'cabling.media',
            difficulty: 2,
            prompt: `Welche Vorteile hat **Glasfaser** gegenüber Twisted-Pair-Kupferkabel? (Mehrere Antworten)`,
            options: [
              'Unempfindlich gegen elektromagnetische Störungen',
              'Galvanische Trennung zwischen Gebäuden',
              'Größere Reichweite',
              'Endgeräte können darüber mit Strom versorgt werden (PoE)',
              'Einfachere und günstigere Konfektionierung',
            ],
            answer: [0, 1, 2],
            explanation: `Glasfaser überträgt Licht: keine EMV-Probleme, keine leitende Verbindung (galvanische Trennung), große Reichweiten. PoE geht nur über Kupfer, und die Konfektionierung (Spleißen, Stecker) ist aufwendiger.`,
          },
        },
        {
          type: 'check',
          question: {
            id: 'm12-l01-c2',
            kind: 'single',
            skill: 'cabling.fiber',
            difficulty: 2,
            prompt: `Welcher Kerndurchmesser ist typisch für **Singlemode-Fasern**?`,
            options: ['ca. 9 µm', '50 µm', '62,5 µm', '125 µm'],
            answer: 0,
            distractors: {
              '1': { why: '50 µm ist der Kern von Multimode OM2–OM5.', error: 'verwechslung-mm-sm' },
              '2': { why: '62,5 µm ist der Kern der älteren Multimode-Faser OM1.', error: 'verwechslung-mm-sm' },
              '3': { why: '125 µm ist der Manteldurchmesser – bei MM und SM gleich.', error: 'verwechslung-kern-mantel' },
            },
            explanation: `Singlemode: Kern ca. **9 µm** (Schreibweise 9/125 µm). Nur ein Lichtmodus passt hindurch → kaum Dispersion → große Reichweiten.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: Medien und Glasfaser',
          questionIds: ['m12-q001', 'm12-q002', 'm12-q003', 'm12-q004', 'm12-q005', 'm12-q006', 'm12-q007', 'm12-q049', 'm12-q050'],
          count: 5,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Kupfer (Twisted Pair): günstig, PoE-fähig, aber max. 100 m und EMV-anfällig.',
            'Glasfaser: Licht durch Totalreflexion, große Reichweite, EMV-immun, galvanisch getrennt, kein PoE.',
            'Multimode 50/62,5 µm Kern, 850 nm, einige 100 m (OM3 300 m, OM4 400 m bei 10GBASE-SR).',
            'Singlemode ca. 9 µm Kern, 1310/1550 nm, km-Bereich; Mantelfarbe gelb.',
            'Stecker: LC (klein, SFP), SC (quadratisch), ST (Bajonett), MPO (Mehrfaser).',
            'Nie in eine aktive Faser blicken – Laser im unsichtbaren Infrarotbereich.',
            'PowerLAN nutzt die Stromleitung (geteilt, störanfällig) – Notlösung, kein Ersatz für strukturierte Verkabelung.',
            'Internetzugänge: DSL (Telefonleitung), Kabel/DOCSIS (Koax, geteiltes Segment), Glasfaser/FTTH (ONT), Mobilfunk.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm12-l02',
      title: 'Twisted Pair: Schirmung, Kategorien und RJ45',
      minutes: 25,
      relevance: 'ap1',
      skills: ['cabling.shielding', 'cabling.categories', 'cabling.rj45'],
      steps: [
        {
          type: 'explain',
          title: 'Warum verdrillt? Und was bedeutet S/FTP?',
          body: `### Das Verdrillen

Jedes Adernpaar überträgt ein Signal **symmetrisch** (Differenzsignal): Auf einer Ader liegt das Signal, auf der anderen das gespiegelte Signal. Eine Störung von außen wirkt durch die **Verdrillung** auf beide Adern nahezu gleich und hebt sich beim Empfänger bei der Differenzbildung auf. Zusätzlich verringert das Verdrillen das **Nebensprechen** (engl. Crosstalk) zwischen den Paaren – deshalb haben die vier Paare unterschiedliche Schlaglängen.

### Schirmung nach ISO/IEC 11801: XX/YTP

Die Bezeichnung hat die Form **XX/YTP**:
- **XX (vor dem Schrägstrich): Gesamtschirm** um alle vier Paare
  - **U** = ungeschirmt (unshielded)
  - **F** = Folienschirm (foil)
  - **S** = Geflechtschirm (braided screen)
  - **SF** = Geflecht + Folie
- **Y (nach dem Schrägstrich): Schirmung der einzelnen Paare**
  - **U** = keine Paarschirmung
  - **F** = Folie um jedes Paar
- **TP** = Twisted Pair

| Bezeichnung | Gesamtschirm | Paarschirm | Bemerkung |
|---|---|---|---|
| **U/UTP** | keiner | keiner | günstig, dünn, flexibel; international (USA) sehr verbreitet |
| **F/UTP** | Folie | keiner | einfacher Schutz |
| **U/FTP** | keiner | Folie je Paar | gut gegen Nebensprechen |
| **S/FTP** | Geflecht | Folie je Paar | sehr guter Schutz; in Deutschland bei Verlegekabeln (Cat 7) üblich |
| **SF/UTP** | Geflecht + Folie | keiner | robuster Gesamtschirm |

Ein Schirm wirkt nur, wenn er **durchgängig** ist und **beidseitig korrekt geerdet** (an Patchpanel und Dose aufgelegt) wird. Alte Bezeichnungen wie „STP“ oder „S/STP“ sind uneindeutig und sollten nicht mehr verwendet werden.

### Kategorien (Category, Cat)

Die **Kategorie** beschreibt, bis zu welcher **Frequenz** eine Komponente (Kabel, Dose, Stecker) spezifiziert ist. Höhere Frequenz → höhere mögliche Datenrate.

| Kategorie | Frequenz | Typisches Ethernet | Max. Länge (Kanal) |
|---|---|---|---|
| Cat 5 | 100 MHz | 100BASE-TX | 100 m |
| **Cat 5e** | 100 MHz | **1000BASE-T** (auch 2,5GBASE-T) | 100 m |
| **Cat 6** | 250 MHz | 1000BASE-T; 10GBASE-T nur bis ca. **55 m** | 100 m |
| **Cat 6A** | 500 MHz | **10GBASE-T** | **100 m** |
| **Cat 7** | 600 MHz | 10GBASE-T | 100 m |
| Cat 7A | 1000 MHz | 10GBASE-T | 100 m |
| **Cat 8** (8.1/8.2) | **2000 MHz** | **25GBASE-T / 40GBASE-T** | **nur 30 m** |

Wichtige Praxispunkte:
- **Die schwächste Komponente bestimmt die Gesamtleistung.** Cat-7-Verlegekabel mit Cat-6A-Dosen ergibt eine Cat-6A-Strecke (Klasse EA). Genau diese Kombination ist in Deutschland sehr verbreitet, denn für Cat 7 gibt es offiziell keinen RJ45-Stecker (genormt sind dafür z. B. GG45 oder TERA).
- **Cat 8** ist für kurze Strecken im **Rechenzentrum** gedacht (Server ↔ Top-of-Rack-Switch), nicht für die Büroverkabelung.
- Die 100 m gelten für den **Kanal** (Channel): **90 m festes Verlegekabel + insgesamt 10 m Patch- und Geräteanschlusskabel**.
- Für Neuinstallationen im Büro gilt heute **Cat 6A** als Mindeststandard – auch weil moderne Access Points (Wi-Fi 6/7) mit 2,5 bzw. 5 Gbit/s angebunden werden und PoE mit höherer Leistung (Erwärmung des Kabelbündels) besser verträgt.

### Kategorie oder Klasse?

Zwei Begriffe, die oft verwechselt werden:

- Die **Kategorie** (Cat) gilt für **einzelne Bauteile**: Kabel, Dose, Patchfeld, Stecker. Sie steht im Datenblatt und auf dem Kabelmantel.
- Die **Klasse** gilt für die **fertig installierte Strecke** (Permanent Link bzw. Channel). Ob eine Strecke ihre Klasse erreicht, zeigt erst die **Messung nach der Verlegung**.

| Kategorie (Bauteil) | Klasse (Strecke) | Frequenz |
|---|---|---|
| Cat 5e | **D** | 100 MHz |
| Cat 6 | **E** | 250 MHz |
| Cat 6A | **EA** | 500 MHz |
| Cat 7 | **F** | 600 MHz |
| Cat 7A | **FA** | 1000 MHz |
| Cat 8.1 / 8.2 | **I / II** | 2000 MHz |

Eine Strecke erreicht ihre Klasse nur, wenn **alle** Bauteile mindestens die passende Kategorie haben **und** sauber verarbeitet sind. Zu weit aufgedrehte Paare an der Dose, zu enge Biegeradien oder ein nicht aufgelegter Schirm können dazu führen, dass eine Strecke aus lauter Cat-6A-Bauteilen die Klasse EA **nicht** besteht.

**Hinweis zu Lehrbüchern:** Manche Tabellen ordnen 2,5GBASE-T und 5GBASE-T erst Cat 6A oder 10GBASE-T Cat 7 zu. Diese Kategorien sind ebenfalls **geeignet** (sie können mehr als nötig). Fragt eine Aufgabe nach der **mindestens nötigen** Kategorie, gilt die Tabelle oben.

### RJ45 und Belegung T568A / T568B

Der **RJ45-Stecker** (genauer: 8P8C, 8 Positionen, 8 Kontakte) ist der Standardstecker für Twisted Pair. Für die Zuordnung der Adern zu den Pins gibt es zwei Normen (TIA-568):

| Pin | **T568A** | **T568B** |
|---|---|---|
| 1 | weiß-grün | **weiß-orange** |
| 2 | grün | **orange** |
| 3 | weiß-orange | **weiß-grün** |
| 4 | blau | blau |
| 5 | weiß-blau | weiß-blau |
| 6 | orange | **grün** |
| 7 | weiß-braun | weiß-braun |
| 8 | braun | braun |

**Der einzige Unterschied:** Das **orange** und das **grüne Paar** sind vertauscht. Blau (4/5) und Braun (7/8) bleiben gleich.

- **1:1-Kabel (Patchkabel, „straight-through“):** beide Enden nach derselben Norm – Standardfall.
- **Crossover-Kabel:** ein Ende A, das andere B – früher nötig, um zwei gleichartige Geräte (PC–PC, Switch–Switch) direkt zu verbinden. Heute erkennen Ports dank **Auto-MDI-X** selbst, ob gekreuzt werden muss.
- **100BASE-TX** nutzt nur **2 Paare (Pins 1, 2, 3, 6)**, **1000BASE-T und schneller** nutzen **alle 4 Paare**.
- Entscheidend in der Praxis: **innerhalb einer Installation einheitlich** nach einer Norm auflegen und dokumentieren.`,
        },
        {
          type: 'visual',
          title: 'Kategorien auf einen Blick',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Cat 5e', icon: 'Cable', text: '100 MHz · 1 Gbit/s · 100 m – Minimum für Gigabit' },
                { title: 'Cat 6', icon: 'Cable', text: '250 MHz · 1 Gbit/s (10 Gbit/s bis ca. 55 m) · 100 m' },
                { title: 'Cat 6A', icon: 'Cable', text: '500 MHz · 10 Gbit/s · 100 m – heutiger Standard im Büro' },
                { title: 'Cat 8', icon: 'Server', text: '2000 MHz · 25/40 Gbit/s · nur 30 m – Rechenzentrum' },
              ],
            },
          },
          caption: `Kategorie = spezifizierte Frequenz. Die Datenrate hängt zusätzlich vom Ethernet-Standard ab, und die schwächste Komponente der Strecke begrenzt alles.`,
        },
        {
          type: 'example',
          title: 'Kabel für das neue Bürogebäude',
          problem: `Elektro Krämer baut ein neues Bürogebäude. Der Elektroplaner schlägt Cat-5e-U/UTP vor, „weil das für Gigabit reicht“. In den Fluren sollen Wi-Fi-6E-Access-Points mit 2,5-Gbit/s-Port und PoE+ hängen, die längste Strecke beträgt 85 m. Was empfiehlst du?`,
          steps: [
            { label: 'Heutige Anforderung', body: `Gigabit zu den PCs funktioniert mit Cat 5e. Die Access Points mit 2,5 Gbit/s (2.5GBASE-T) würden ebenfalls noch laufen.` },
            { label: 'Zukunft', body: `Verkabelung bleibt typischerweise **15 Jahre und länger** im Gebäude. Spätere Access Points (Wi-Fi 7) brauchen 5 oder 10 Gbit/s. 10GBASE-T über 85 m erfordert **Cat 6A**.` },
            { label: 'Störfestigkeit und PoE', body: `Geschirmte Kabel (z. B. Cat-7-Verlegekabel S/FTP mit Cat-6A-Modulen) sind EMV-robuster; dickere Leiter erwärmen sich bei PoE im Bündel weniger.` },
          ],
          result: `**Cat 6A** (z. B. Verlegekabel S/FTP mit Cat-6A-RJ45-Modulen) statt Cat 5e – Mehrkosten gering im Vergleich zu einer späteren Neuverkabelung.`,
        },
        {
          type: 'check',
          question: {
            id: 'm12-l02-c1',
            kind: 'single',
            skill: 'cabling.shielding',
            difficulty: 2,
            prompt: `Was bedeutet die Bezeichnung **S/FTP**?`,
            options: [
              'Geflecht als Gesamtschirm, jedes Paar zusätzlich mit Folie geschirmt',
              'Folie als Gesamtschirm, Paare mit Geflecht geschirmt',
              'Ungeschirmtes Kabel mit Folie um jedes Paar',
              'Spezielles Kabel für FTP-Datenübertragungen',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'Reihenfolge vertauscht: Vor dem Schrägstrich steht der Gesamtschirm (S = Geflecht), danach die Paarschirmung (F = Folie).', error: 'schirmung-notation' },
              '2': { why: 'Das wäre U/FTP.', error: 'schirmung-notation' },
              '3': { why: 'FTP steht hier für Foiled Twisted Pair, nicht für das File Transfer Protocol.', error: 'verwechslung-ftp' },
            },
            explanation: `**S** (vor dem Schrägstrich) = Geflechtschirm um alle Paare; **F**TP = jedes Paar mit Folie geschirmt (Foiled Twisted Pair).`,
          },
        },
        {
          type: 'check',
          question: {
            id: 'm12-l02-c2',
            kind: 'single',
            skill: 'cabling.rj45',
            difficulty: 2,
            prompt: `Worin unterscheiden sich die Belegungen **T568A** und **T568B**?`,
            options: [
              'Das orange und das grüne Adernpaar sind vertauscht.',
              'Das blaue und das braune Paar sind vertauscht.',
              'T568B nutzt nur 4 Adern.',
              'T568A ist nur für Glasfaser.',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'Blau (Pins 4/5) und Braun (Pins 7/8) sind in beiden Normen gleich.', error: 't568-verwechslung' },
              '2': { why: 'Beide Normen beschreiben alle 8 Adern.', error: 't568-verwechslung' },
              '3': { why: 'T568A/B sind Belegungen für RJ45 bei Twisted Pair.', error: 't568-verwechslung' },
            },
            explanation: `In T568A liegt Grün auf Pins 1/2 und Orange auf 3/6, in T568B ist es umgekehrt. Blau und Braun bleiben gleich.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: Twisted Pair',
          questionIds: ['m12-q008', 'm12-q009', 'm12-q010', 'm12-q011', 'm12-q012', 'm12-q013', 'm12-q014', 'm12-q016', 'm12-q017', 'm12-q051', 'm12-q052', 'm12-q053'],
          count: 6,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Verdrillung + Differenzsignal reduzieren Störungen und Nebensprechen.',
            'XX/YTP: vor dem Schrägstrich Gesamtschirm (U, F, S, SF), danach Paarschirm (U, F).',
            'Cat 5e 100 MHz/1G, Cat 6 250 MHz, Cat 6A 500 MHz/10G/100 m, Cat 7 600 MHz, Cat 8 2000 MHz/40G/30 m.',
            '100 m Kanal = 90 m Verlegekabel + 10 m Patchkabel; schwächste Komponente bestimmt die Klasse.',
            'Kategorie = Bauteil (Cat 5e/6/6A/7), Klasse = installierte Strecke (D/E/EA/F) – nachgewiesen durch Messung.',
            'T568A vs. T568B: Orange und Grün vertauscht. 1:1-Kabel = beide Enden gleich; Auto-MDI-X macht Crossover überflüssig.',
            '100BASE-TX nutzt Pins 1, 2, 3, 6; Gigabit und mehr nutzen alle vier Paare.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm12-l03',
      title: 'Ethernet-Standards, Duplex und Autonegotiation',
      minutes: 25,
      relevance: 'ap1',
      skills: ['ethernet.standards', 'ethernet.duplex'],
      steps: [
        {
          type: 'explain',
          title: 'Das Benennungsschema: 1000BASE-T entschlüsselt',
          body: `Ethernet ist in der Normenfamilie **IEEE 802.3** festgelegt. Die Kurzbezeichnungen folgen einem Schema:

**[Datenrate] BASE - [Medium/Variante]**

- **Zahl vorn:** Datenrate in **Mbit/s** (oder mit „G“ in Gbit/s): 100 = 100 Mbit/s, 1000 = 1 Gbit/s, 10G = 10 Gbit/s.
- **BASE:** **Basisbandübertragung** – das Signal wird direkt (ohne Aufmodulation auf eine Trägerfrequenz) übertragen.
- **Suffix:** Medium bzw. Variante:
  - **T / TX** = Twisted Pair
  - **SX / SR** = Short (Wavelength / Range) – **Multimode**, 850 nm
  - **LX / LR** = Long (Wavelength / Range) – meist **Singlemode**, 1310 nm
  - **ER** = Extended Range (Singlemode, 1550 nm, ca. 40 km)

| Standard | Datenrate | Medium | Reichweite | IEEE |
|---|---|---|---|---|
| 10BASE-T | 10 Mbit/s | Twisted Pair (Cat 3) | 100 m | 802.3i |
| **100BASE-TX** | 100 Mbit/s | TP Cat 5, **2 Paare** | 100 m | 802.3u (Fast Ethernet) |
| **1000BASE-T** | 1 Gbit/s | TP **Cat 5e**, **4 Paare** | 100 m | 802.3ab |
| 2.5GBASE-T / 5GBASE-T | 2,5 / 5 Gbit/s | TP Cat 5e / Cat 6 | 100 m | 802.3bz (NBASE-T) |
| **10GBASE-T** | 10 Gbit/s | TP **Cat 6A** | 100 m | 802.3an |
| 25GBASE-T / 40GBASE-T | 25 / 40 Gbit/s | TP **Cat 8** | **30 m** | 802.3bq |
| 1000BASE-SX | 1 Gbit/s | Multimode 850 nm | bis 550 m (OM2) | 802.3z |
| 1000BASE-LX | 1 Gbit/s | Singlemode 1310 nm | 5 km (spezifiziert) | 802.3z |
| **10GBASE-SR** | 10 Gbit/s | Multimode 850 nm | OM3 300 m / OM4 400 m | 802.3ae |
| **10GBASE-LR** | 10 Gbit/s | Singlemode 1310 nm | 10 km | 802.3ae |

### Simplex, Halbduplex, Vollduplex

| Betriebsart | Bedeutung | Alltagsbeispiel |
|---|---|---|
| **Simplex** | Übertragung nur in **eine** Richtung | Radio, Fernsehen |
| **Halbduplex** | **beide** Richtungen, aber **abwechselnd** | Walkie-Talkie, Hub, WLAN |
| **Vollduplex** | **beide** Richtungen **gleichzeitig** | Telefon, Switchport |

Bei **Vollduplex** stehen die Daten in **beiden** Richtungen gleichzeitig zur Verfügung – ein Gigabit-Port kann 1 Gbit/s senden **und** 1 Gbit/s empfangen.

### CSMA/CD – das historische Zugriffsverfahren

Bei **Halbduplex** teilen sich mehrere Stationen das Medium (Bus, Hub). Ethernet regelt das mit **CSMA/CD** (Carrier Sense Multiple Access with Collision Detection):

1. **Carrier Sense:** Vor dem Senden lauschen, ob das Medium frei ist.
2. **Multiple Access:** Mehrere Stationen dürfen grundsätzlich senden.
3. **Collision Detection:** Während des Sendens prüfen, ob eine Kollision auftritt. Falls ja: **Jam-Signal** senden, abbrechen, eine **zufällige Zeit warten** (Backoff) und erneut versuchen.

Mit Switches im **Vollduplex** gibt es keine Kollisionen mehr – **CSMA/CD ist dann abgeschaltet** und spielt praktisch nur noch historisch und bei Fehlkonfigurationen eine Rolle.

### Autonegotiation und Auto-MDI-X

Bei der **Autonegotiation** tauschen zwei verbundene Ports beim Verbindungsaufbau ihre Fähigkeiten aus (Geschwindigkeit, Duplex) und wählen automatisch den **besten gemeinsamen Modus**. Für 1000BASE-T ist Autonegotiation **Pflicht**.

**Gefahr: Duplex-Mismatch.** Wird **ein** Port fest auf „100 Mbit/s Vollduplex“ eingestellt und der andere steht auf „Auto“, erhält der Auto-Port keine Aushandlungsantwort. Er erkennt zwar die Geschwindigkeit, fällt aber auf **Halbduplex** zurück. Folge: Die Verbindung „funktioniert“, ist aber **sehr langsam**, mit Kollisionen und Fehlern (z. B. Late Collisions, CRC-Fehler) – ein tückischer Fehler. **Regel:** Entweder beide Seiten auf Auto oder beide Seiten fest identisch einstellen.

**Auto-MDI-X** erkennt automatisch, ob Sende- und Empfangsadern gekreuzt werden müssen – damit funktioniert jedes 1:1-Patchkabel zwischen beliebigen Geräten.`,
        },
        {
          type: 'visual',
          title: 'Halbduplex am Hub vs. Vollduplex am Switch',
          widget: {
            kind: 'topology',
            data: {
              zones: [
                { label: 'Halbduplex – gemeinsames Medium', x: 10, y: 20, w: 380, h: 390, color: 'red' },
                { label: 'Vollduplex – je Port eigene Verbindung', x: 410, y: 20, w: 380, h: 390, color: 'green' },
              ],
              nodes: [
                { id: 'hub', type: 'switch', label: 'Hub', sub: 'CSMA/CD', x: 200, y: 200 },
                { id: 'h1', type: 'pc', label: 'PC A', x: 80, y: 90 },
                { id: 'h2', type: 'pc', label: 'PC B', x: 320, y: 90 },
                { id: 'h3', type: 'pc', label: 'PC C', x: 200, y: 350 },
                { id: 'sw', type: 'switch', label: 'Switch', sub: 'kein CSMA/CD', x: 600, y: 200 },
                { id: 's1', type: 'pc', label: 'PC D', x: 480, y: 90 },
                { id: 's2', type: 'pc', label: 'PC E', x: 720, y: 90 },
                { id: 's3', type: 'server', label: 'Server', x: 600, y: 350 },
              ],
              links: [
                { from: 'h1', to: 'hub', label: 'HDX' },
                { from: 'h2', to: 'hub', label: 'HDX' },
                { from: 'h3', to: 'hub', label: 'HDX' },
                { from: 's1', to: 'sw', label: 'FDX' },
                { from: 's2', to: 'sw', label: 'FDX' },
                { from: 's3', to: 'sw', label: '1G FDX' },
              ],
            },
          },
          caption: `Links teilen sich alle Stationen die Bandbreite und müssen per CSMA/CD Kollisionen behandeln. Rechts hat jede Station eine eigene Vollduplex-Verbindung – senden und empfangen gleichzeitig, ohne Kollisionen.`,
        },
        {
          type: 'example',
          title: 'Langsamer Server nach „Optimierung“',
          problem: `Ein Kollege hat am Fileserver die Netzwerkkarte fest auf **1000 Mbit/s Vollduplex** gestellt („damit nichts schiefgeht“). Der Switchport steht auf **Auto**. Seitdem ist der Server extrem langsam, das Switch-Log zeigt viele Late Collisions. Was ist passiert?`,
          steps: [
            { label: 'Ursache', body: `Mit der festen Einstellung nimmt die Server-NIC nicht mehr an der Autonegotiation teil. Der Switchport erkennt keine Aushandlung und fällt auf **Halbduplex** zurück → **Duplex-Mismatch**.` },
            { label: 'Symptom erklären', body: `Der Server sendet im Vollduplex „einfach drauflos“, während der Switch im Halbduplex auf ein freies Medium wartet und Kollisionen erkennt → Late Collisions, Neuübertragungen, schlechter Durchsatz.` },
            { label: 'Hinweis', body: `Bei 1000BASE-T ist Autonegotiation zudem vorgeschrieben; manche Karten setzen eine feste Einstellung gar nicht oder nur eingeschränkt um.` },
            { label: 'Lösung', body: `Beide Seiten auf **Auto** stellen (Empfehlung) – oder beide fest identisch konfigurieren.` },
          ],
          result: `Duplex-Mismatch durch einseitig feste Einstellung. Beide Seiten auf Autonegotiation setzen.`,
        },
        {
          type: 'check',
          question: {
            id: 'm12-l03-c1',
            kind: 'single',
            skill: 'ethernet.standards',
            difficulty: 1,
            prompt: `Wofür steht „**BASE**“ in der Bezeichnung 1000BASE-T?`,
            options: ['Basisbandübertragung', 'Basisstation', 'Base-Switch im Core', 'Grundgeschwindigkeit von 1 Mbit/s'],
            answer: 0,
            distractors: {
              '1': { why: 'Basisstationen gibt es im Mobilfunk – nicht gemeint.', error: 'ethernet-benennung' },
              '2': { why: 'Die Bezeichnung beschreibt das Übertragungsverfahren, nicht ein Gerät.', error: 'ethernet-benennung' },
              '3': { why: 'Die Datenrate steht in der Zahl davor (1000 Mbit/s).', error: 'ethernet-benennung' },
            },
            explanation: `**BASE** = Basisband: Das Signal wird direkt ohne Trägerfrequenz übertragen. 1000 = 1000 Mbit/s, T = Twisted Pair.`,
          },
        },
        {
          type: 'check',
          question: {
            id: 'm12-l03-c2',
            kind: 'single',
            skill: 'ethernet.duplex',
            difficulty: 2,
            prompt: `Ein Port steht auf **Auto**, die Gegenseite fest auf **100 Mbit/s Vollduplex**. Was ist das wahrscheinliche Ergebnis?`,
            options: [
              'Der Auto-Port fällt auf Halbduplex zurück – Duplex-Mismatch mit schlechter Leistung.',
              'Beide arbeiten problemlos mit 100 Mbit/s Vollduplex.',
              'Es kommt gar keine Verbindung zustande.',
              'Beide Ports schalten automatisch auf 1 Gbit/s.',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'Ohne Aushandlungsantwort kann der Auto-Port den Duplexmodus nicht erkennen und wählt Halbduplex.', error: 'duplex-mismatch' },
              '2': { why: 'Meist kommt ein Link zustande, die Geschwindigkeit wird erkannt – nur der Duplex passt nicht.', error: 'duplex-mismatch' },
              '3': { why: 'Die feste Seite ist auf 100 Mbit/s begrenzt.', error: 'duplex-mismatch' },
            },
            explanation: `Typischer **Duplex-Mismatch**: Geschwindigkeit wird erkannt (100 Mbit/s), Duplex nicht → Auto-Seite Halbduplex. Folge: Kollisionen, CRC-Fehler, sehr langsame Übertragung.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: Ethernet und Duplex',
          questionIds: ['m12-q018', 'm12-q019', 'm12-q020', 'm12-q021', 'm12-q022', 'm12-q023', 'm12-q024', 'm12-q025'],
          count: 6,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Schema: [Datenrate]BASE-[Medium]; T = Twisted Pair, SR/SX = Multimode, LR/LX = Singlemode.',
            '100BASE-TX: Cat 5, 2 Paare; 1000BASE-T: Cat 5e, 4 Paare; 10GBASE-T: Cat 6A, 100 m.',
            'Simplex = eine Richtung, Halbduplex = abwechselnd, Vollduplex = gleichzeitig.',
            'CSMA/CD: Lauschen, Senden, Kollision erkennen, Jam, Backoff – nur bei Halbduplex.',
            'Autonegotiation handelt Geschwindigkeit und Duplex aus; einseitig fest = Duplex-Mismatch.',
            'Auto-MDI-X macht Crossover-Kabel überflüssig.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm12-l04',
      title: 'Power over Ethernet (PoE)',
      minutes: 20,
      relevance: 'ap1',
      skills: ['ethernet.poe'],
      steps: [
        {
          type: 'explain',
          title: 'Daten und Strom über ein Kabel',
          body: `Mit **Power over Ethernet (PoE)** werden Endgeräte über das **Twisted-Pair-Netzwerkkabel** mit Strom versorgt. Ein zusätzliches Netzteil und eine Steckdose am Montageort entfallen – ideal für Access Points an der Decke, IP-Kameras an der Fassade oder IP-Telefone auf dem Schreibtisch.

### Begriffe

- **PSE (Power Sourcing Equipment):** liefert den Strom – ein **PoE-Switch** (*Endspan*) oder ein zwischengeschalteter **PoE-Injektor** (*Midspan*).
- **PD (Powered Device):** das versorgte Gerät, z. B. Access Point, IP-Telefon, Kamera.

Die Spannung liegt nominal bei etwa **48 V** (Gleichspannung; Bereich ca. 44–57 V). Bevor Strom fließt, führt das PSE eine **Erkennung (Detection)** durch: Nur wenn das Gerät eine bestimmte PoE-Signatur zeigt, wird Spannung angelegt. Deshalb nimmt ein normales Notebook an einem PoE-Port **keinen Schaden**. Anschließend wird die **Leistungsklasse (Classification)** ermittelt.

### Die Standards

| Standard | Bezeichnung | Typ | Leistung am **PSE** (Port) | Leistung am **PD** (Gerät) | genutzte Paare |
|---|---|---|---|---|---|
| **IEEE 802.3af** (2003) | PoE | Type 1 | **15,4 W** | 12,95 W | 2 |
| **IEEE 802.3at** (2009) | **PoE+** | Type 2 | **30 W** | 25,5 W | 2 |
| **IEEE 802.3bt** (2018) | PoE++ / 4PPoE | Type 3 | **60 W** | 51 W | 4 |
| **IEEE 802.3bt** (2018) | PoE++ / 4PPoE | Type 4 | **90 W** | 71,3 W | 4 |

**Warum kommt am Gerät weniger an?** Ein Teil der Leistung geht auf bis zu 100 m Kupferkabel als **Wärme** verloren (Leitungswiderstand). Die Norm rechnet mit dem ungünstigsten Fall (100 m).

### Leistungsklassen (Classes)

| Klasse | max. Leistung am PSE | Standard |
|---|---|---|
| 0 | 15,4 W (Standard, keine Angabe) | 802.3af |
| 1 | 4 W | 802.3af |
| 2 | 7 W | 802.3af |
| 3 | 15,4 W | 802.3af |
| 4 | 30 W | 802.3at |
| 5 / 6 | 45 W / 60 W | 802.3bt Type 3 |
| 7 / 8 | 75 W / 90 W | 802.3bt Type 4 |

### Das PoE-Budget

Ein PoE-Switch kann **nicht an allen Ports gleichzeitig** die Maximalleistung liefern. Er hat ein **Gesamt-PoE-Budget** (z. B. 370 W bei einem 24-Port-Switch). Viele Switches **reservieren** pro Port die Leistung der ausgehandelten Klasse. Bei der Planung musst du deshalb die Leistung aller PDs (nach Klasse am PSE) addieren und mit dem Budget vergleichen – plus Reserve.

### Typische Leistungsaufnahme

| Gerät | typisch |
|---|---|
| IP-Telefon | Klasse 1–2 (802.3af) |
| IP-Kamera ohne Heizung | Klasse 2–3 (802.3af) |
| Wi-Fi-6/6E-Access-Point | Klasse 4 (**PoE+**), teils mehr |
| PTZ-Kamera mit Heizung, Thin Clients, Digital Signage | 802.3bt |

**Hinweise:** PoE erfordert **alle Adern** korrekt aufgelegt (bei 802.3bt alle vier Paare). Bei hoher Leistung erwärmen sich **Kabelbündel** – ein Argument für Cat 6A und dickere Adern (AWG 23/22).`,
        },
        {
          type: 'visual',
          title: 'PoE bei Elektro Krämer',
          widget: {
            kind: 'topology',
            data: {
              zones: [{ label: 'PoE-Budget Switch: 370 W', x: 230, y: 30, w: 200, h: 140, color: 'orange' }],
              nodes: [
                { id: 'sw', type: 'switch', label: 'PoE-Switch', sub: 'PSE (Endspan)', x: 330, y: 100 },
                { id: 'ap', type: 'ap', label: 'Access Point', sub: 'PD, PoE+', x: 100, y: 310 },
                { id: 'ph', type: 'phone', label: 'IP-Telefon', sub: 'PD, Kl. 2', x: 260, y: 310 },
                { id: 'cam', type: 'pc', label: 'IP-Kamera', sub: 'PD, Kl. 3', x: 420, y: 310 },
                { id: 'inj', type: 'modem', label: 'PoE-Injektor', sub: 'PSE (Midspan)', x: 620, y: 100 },
                { id: 'ap2', type: 'ap', label: 'AP Lager', sub: 'PD', x: 620, y: 310 },
                { id: 'sw2', type: 'switch', label: 'Switch ohne PoE', x: 620, y: 220 },
              ],
              links: [
                { from: 'sw', to: 'ap', label: '30 W' },
                { from: 'sw', to: 'ph', label: '7 W' },
                { from: 'sw', to: 'cam', label: '15,4 W' },
                { from: 'sw2', to: 'inj' },
                { from: 'inj', to: 'ap2', label: 'Strom + Daten' },
              ],
            },
          },
          caption: `Links liefert der Switch selbst den Strom (Endspan). Rechts hat der Switch kein PoE – ein Injektor (Midspan) wird zwischen Switch und Access Point gesetzt.`,
        },
        {
          type: 'example',
          title: 'Reicht das PoE-Budget?',
          problem: `Für den neuen Gebäudeflügel soll ein 24-Port-Switch mit **370 W PoE-Budget** angeschafft werden. Angeschlossen werden: **6 Access Points** (Klasse 4), **10 IP-Telefone** (Klasse 2) und **4 IP-Kameras** (Klasse 3). Der Switch reserviert die Klassenleistung am PSE. Reicht das Budget?`,
          steps: [
            { label: 'Access Points', body: `6 × 30 W = **180 W**` },
            { label: 'IP-Telefone', body: `10 × 7 W = **70 W**` },
            { label: 'Kameras', body: `4 × 15,4 W = **61,6 W**` },
            { label: 'Summe und Reserve', body: `180 + 70 + 61,6 = **311,6 W**. Reserve: 370 − 311,6 = **58,4 W** (ca. 16 %).` },
          ],
          result: `Das Budget reicht (311,6 W von 370 W). Für spätere Erweiterungen bleiben 58,4 W – ein weiterer Klasse-4-AP würde noch passen, zwei nicht mehr.`,
        },
        {
          type: 'check',
          question: {
            id: 'm12-l04-c1',
            kind: 'single',
            skill: 'ethernet.poe',
            difficulty: 1,
            prompt: `Welcher Standard wird als **PoE+** bezeichnet und liefert bis zu **30 W** pro Port?`,
            options: ['IEEE 802.3at', 'IEEE 802.3af', 'IEEE 802.3bt', 'IEEE 802.11ax'],
            answer: 0,
            distractors: {
              '1': { why: '802.3af ist das ursprüngliche PoE mit 15,4 W.', error: 'poe-standards' },
              '2': { why: '802.3bt (PoE++) liefert 60 W bzw. 90 W über vier Paare.', error: 'poe-standards' },
              '3': { why: '802.11ax ist ein WLAN-Standard (Wi-Fi 6).', error: 'verwechslung-8023-80211' },
            },
            explanation: `**802.3at = PoE+**: 30 W am PSE, 25,5 W am Gerät.`,
          },
        },
        {
          type: 'check',
          question: {
            id: 'm12-l04-c2',
            kind: 'single',
            skill: 'ethernet.poe',
            difficulty: 2,
            prompt: `Ein Mitarbeiter steckt sein Notebook (ohne PoE-Unterstützung) in einen PoE-Port. Was passiert?`,
            options: [
              'Nichts Schädliches – das PSE erkennt keine PoE-Signatur und legt keine Spannung an.',
              'Das Notebook wird durch 48 V beschädigt.',
              'Das Notebook wird über das Netzwerkkabel geladen.',
              'Der Switch schaltet den Port dauerhaft ab.',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'Genau das verhindert die Erkennung (Detection) vor dem Einschalten.', error: 'poe-detection' },
              '2': { why: 'Ohne PoE-PD-Schaltung nimmt das Notebook keinen Strom über das Kabel auf.', error: 'poe-detection' },
              '3': { why: 'Der Port funktioniert ganz normal als Datenport.', error: 'poe-detection' },
            },
            explanation: `Vor dem Einschalten prüft das PSE über eine Signatur, ob ein PoE-fähiges Gerät angeschlossen ist. Ohne Signatur bleibt die Spannung aus, der Port arbeitet als normaler Datenport.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: PoE',
          questionIds: ['m12-q026', 'm12-q027', 'm12-q028', 'm12-q029', 'm12-q030'],
          count: 4,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'PSE liefert Strom (Switch = Endspan, Injektor = Midspan), PD ist das versorgte Gerät.',
            '802.3af PoE: 15,4 W (PD 12,95 W); 802.3at PoE+: 30 W (25,5 W).',
            '802.3bt Type 3: 60 W (51 W), Type 4: 90 W (71,3 W), über alle vier Paare.',
            'Differenz PSE ↔ PD = Leitungsverluste auf bis zu 100 m.',
            'Detection schützt Nicht-PoE-Geräte; Klassen 0–8 bestimmen die Leistung.',
            'PoE-Budget des Switches planen: Summe der Klassenleistungen + Reserve.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm12-l05',
      title: 'Strukturierte Verkabelung: Primär, Sekundär, Tertiär',
      minutes: 20,
      relevance: 'ap1',
      skills: ['cabling.structured'],
      steps: [
        {
          type: 'explain',
          title: 'Ordnung im Kabelsalat',
          body: `**Strukturierte Verkabelung** (nach **DIN EN 50173** bzw. **ISO/IEC 11801**) ist ein einheitliches, **anwendungsneutrales** Verkabelungskonzept: Die Kabel werden nach festen Regeln hierarchisch verlegt, unabhängig davon, welches Gerät später angeschlossen wird (PC, Telefon, Access Point, Kamera).

### Die drei Bereiche

| Bereich | Verbindet | Max. Länge | Typisches Medium |
|---|---|---|---|
| **Primärbereich** (Campus-/Geländeverkabelung) | **Standortverteiler (SV)** ↔ **Gebäudeverteiler (GV)** | **1500 m** | Glasfaser, meist **Singlemode** |
| **Sekundärbereich** (Gebäude-/Steigbereichsverkabelung) | **Gebäudeverteiler (GV)** ↔ **Etagenverteiler (EV)** | **500 m** | Glasfaser, meist **Multimode** (auch Kupfer bei kurzen Strecken) |
| **Tertiärbereich** (Etagen-/Horizontalverkabelung) | **Etagenverteiler (EV)** ↔ **Anschlussdose (TA)** | **90 m** fest verlegt + 10 m Patch-/Anschlusskabel = **100 m** | **Twisted Pair** (z. B. Cat 6A) |

Die Gesamtlänge Standortverteiler bis Anschlussdose soll **2000 m** nicht überschreiten.

**Merkhilfe:** Primär = **P**latz/Gelände (größte Entfernung), Sekundär = **S**teigbereich im Gebäude, Tertiär = **T**ür zum Arbeitsplatz (Etage).

### Permanent Link und Channel

- **Permanent Link:** die fest installierte Strecke vom Patchpanel bis zur Dose (max. 90 m).
- **Channel (Kanal):** die gesamte Übertragungsstrecke inkl. Patchkabel und Geräteanschlusskabel (max. 100 m).

### Komponenten im Etagenverteiler

Im Netzwerkschrank (19-Zoll-Rack) enden die Installationskabel am **Patchpanel**, von dort geht es mit kurzen **Patchkabeln** zum **Switch**. Glasfaser-Uplinks enden in einem **LWL-Spleißgehäuse/Patchfeld**.

### Vorteile

- **Anwendungsneutral:** jede Dose kann für PC, Telefon, AP genutzt werden.
- **Flexibel:** Umzüge per Umpatchen statt Neuverkabelung.
- **Übersichtlich und dokumentiert:** eindeutige **Beschriftung** von Dosen, Ports und Kabeln, Verkabelungspläne.
- **Fehlereingrenzung** durch klare Hierarchie.
- **Zukunftssicher und investitionssicher** – die passive Verkabelung überdauert mehrere Generationen aktiver Technik.

Nach der Installation wird jede Strecke mit einem **Zertifizierungsmessgerät** gemessen (Abnahmemessung) und das Protokoll dokumentiert.`,
        },
        {
          type: 'visual',
          title: 'Strukturierte Verkabelung am Campus Elektro Krämer',
          widget: {
            kind: 'topology',
            data: {
              zones: [
                { label: 'Primär (≤ 1500 m)', x: 10, y: 20, w: 780, h: 100, color: 'purple' },
                { label: 'Sekundär (≤ 500 m)', x: 10, y: 130, w: 780, h: 120, color: 'blue' },
                { label: 'Tertiär (90 m + 10 m)', x: 10, y: 260, w: 780, h: 150, color: 'green' },
              ],
              nodes: [
                { id: 'sv', type: 'switch', label: 'SV', sub: 'Standortverteiler', x: 400, y: 65 },
                { id: 'gv1', type: 'switch', label: 'GV Verwaltung', x: 200, y: 165 },
                { id: 'gv2', type: 'switch', label: 'GV Lager', x: 600, y: 165 },
                { id: 'ev1', type: 'switch', label: 'EV EG', x: 110, y: 290 },
                { id: 'ev2', type: 'switch', label: 'EV OG', x: 290, y: 290 },
                { id: 'ev3', type: 'switch', label: 'EV Halle', x: 600, y: 290 },
                { id: 'pc1', type: 'pc', label: 'TA/PC', x: 110, y: 380 },
                { id: 'ap1', type: 'ap', label: 'TA/AP', x: 290, y: 380 },
                { id: 'pc3', type: 'pc', label: 'TA/PC', x: 600, y: 380 },
              ],
              links: [
                { from: 'sv', to: 'gv1', style: 'fiber', label: 'SM' },
                { from: 'sv', to: 'gv2', style: 'fiber', label: 'SM' },
                { from: 'gv1', to: 'ev1', style: 'fiber', label: 'MM' },
                { from: 'gv1', to: 'ev2', style: 'fiber', label: 'MM' },
                { from: 'gv2', to: 'ev3', style: 'fiber', label: 'MM' },
                { from: 'ev1', to: 'pc1', style: 'lan', label: 'Cat 6A' },
                { from: 'ev2', to: 'ap1', style: 'lan', label: 'Cat 6A' },
                { from: 'ev3', to: 'pc3', style: 'lan', label: 'Cat 6A' },
              ],
            },
          },
          caption: `Hierarchie: SV → GV → EV → TA (Anschlussdose). Im Primär- und Sekundärbereich Glasfaser, im Tertiärbereich Twisted Pair. In kleinen Liegenschaften fallen SV und GV oft zusammen.`,
        },
        {
          type: 'example',
          title: 'Planung eines Etagenverteilers',
          problem: `Im Obergeschoss des Verwaltungsgebäudes sollen 40 Arbeitsplätze mit je 2 Dosen-Ports entstehen. Der am weitesten entfernte Arbeitsplatz liegt (Kabelweg) **96 m** vom geplanten Standort des Etagenverteilers entfernt. Ist das zulässig?`,
          steps: [
            { label: 'Grenzwert', body: `Im Tertiärbereich darf das fest verlegte Kabel (Permanent Link) maximal **90 m** lang sein.` },
            { label: 'Bewertung', body: `96 m > 90 m → **nicht normgerecht**. Mit Patchkabeln würde der Kanal über 100 m liegen – Übertragungsfehler oder fehlende Gigabit-/10G-Verbindung drohen.` },
            { label: 'Lösungen', body: `Etagenverteiler zentraler platzieren, oder einen **zweiten Etagenverteiler** für den entfernten Gebäudeteil vorsehen (per Glasfaser angebunden).` },
          ],
          result: `Nicht zulässig – Verteilerstandort anpassen oder einen zusätzlichen Etagenverteiler einplanen.`,
        },
        {
          type: 'check',
          question: {
            id: 'm12-l05-c1',
            kind: 'match',
            skill: 'cabling.structured',
            difficulty: 2,
            prompt: `Ordne den Verkabelungsbereich der Strecke zu, die er verbindet.`,
            left: ['Primärbereich', 'Sekundärbereich', 'Tertiärbereich'],
            right: [
              'Standortverteiler ↔ Gebäudeverteiler',
              'Gebäudeverteiler ↔ Etagenverteiler',
              'Etagenverteiler ↔ Anschlussdose',
            ],
            answer: [0, 1, 2],
            explanation: `Primär = Gelände (SV–GV), Sekundär = Gebäude/Steigbereich (GV–EV), Tertiär = Etage (EV–TA).`,
          },
        },
        {
          type: 'summary',
          points: [
            'Strukturierte Verkabelung nach DIN EN 50173 / ISO/IEC 11801: hierarchisch, anwendungsneutral.',
            'Primär: SV ↔ GV, ≤ 1500 m, meist Singlemode-LWL.',
            'Sekundär: GV ↔ EV, ≤ 500 m, meist Multimode-LWL.',
            'Tertiär: EV ↔ TA, 90 m Permanent Link + 10 m Patch = 100 m Channel, Twisted Pair.',
            'Dokumentation, Beschriftung und Abnahmemessung gehören dazu.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm12-l06',
      title: 'WLAN: Standards, Frequenzbänder und Kanäle',
      minutes: 25,
      relevance: 'ap1',
      skills: ['wlan.standards', 'wlan.bands'],
      steps: [
        {
          type: 'explain',
          title: 'Von 802.11b bis Wi-Fi 7',
          body: `WLAN ist in der Normenfamilie **IEEE 802.11** festgelegt. Die **Wi-Fi Alliance** zertifiziert Geräte und hat 2018 einfache Generationsnamen eingeführt (Wi-Fi 4, 5, 6 …).

| IEEE-Standard | Wi-Fi-Name | Jahr (ca.) | Frequenzband | max. Brutto-Datenrate (theoretisch) | Wichtige Neuerungen |
|---|---|---|---|---|---|
| 802.11b | – | 1999 | 2,4 GHz | 11 Mbit/s | erster Massenstandard |
| 802.11a | – | 1999 | 5 GHz | 54 Mbit/s | OFDM |
| 802.11g | – | 2003 | 2,4 GHz | 54 Mbit/s | OFDM im 2,4-GHz-Band |
| **802.11n** | **Wi-Fi 4** | 2009 | 2,4 **und** 5 GHz | 600 Mbit/s | **MIMO**, 40-MHz-Kanäle |
| **802.11ac** | **Wi-Fi 5** | 2013 | **nur 5 GHz** | ca. 6,9 Gbit/s | bis 160 MHz, MU-MIMO (Downlink) |
| **802.11ax** | **Wi-Fi 6** | 2019 | 2,4 und 5 GHz | ca. 9,6 Gbit/s | **OFDMA**, MU-MIMO up/down, 1024-QAM, BSS Coloring, Target Wake Time |
| **802.11ax** | **Wi-Fi 6E** | 2020 | **+ 6 GHz** | ca. 9,6 Gbit/s | Wi-Fi 6 im neuen 6-GHz-Band |
| **802.11be** | **Wi-Fi 7** | 2024 | 2,4, 5 und 6 GHz | ca. 46 Gbit/s | **320-MHz-Kanäle**, 4096-QAM, **Multi-Link Operation (MLO)** |

**Achtung bei den Zahlen:** Das sind **theoretische Bruttowerte** mit maximaler Kanalbreite und vielen Antennen (Spatial Streams). Ein Notebook mit 2 Antennen erreicht nur einen Bruchteil, und WLAN ist ein **geteiltes Halbduplex-Medium** – alle Clients einer Funkzelle teilen sich die Kapazität. Der reale Nettodurchsatz liegt oft bei der Hälfte des ausgehandelten Werts oder darunter.

### Die Frequenzbänder

| | **2,4 GHz** | **5 GHz** | **6 GHz** |
|---|---|---|---|
| Reichweite / Durchdringung von Wänden | **am größten** | mittel | am geringsten |
| Kanäle (Deutschland/EU) | 1–13, aber nur **3 überlappungsfreie** (1, 6, 11) | viele überlappungsfreie Kanäle (36–64, 100–140) | bis zu 24 Kanäle à 20 MHz (5945–6425 MHz) |
| Störungen | **viele**: Bluetooth, Mikrowellen, Funkkameras, Nachbar-WLANs | weniger | sehr wenige (nur Wi-Fi 6E/7-Geräte) |
| Besonderheiten | alle Geräte unterstützen es | ab Kanal 52 **DFS** (Radarerkennung) und TPC Pflicht | nur Wi-Fi 6E/7, **WPA3 Pflicht** |

### Warum nur drei überlappungsfreie Kanäle bei 2,4 GHz?

Die Kanalmitten liegen nur **5 MHz** auseinander (Kanal 1 = 2412 MHz, Kanal 6 = 2437 MHz, Kanal 11 = 2462 MHz, Kanal 13 = 2472 MHz), ein Kanal ist aber ca. **20–22 MHz** breit. Benachbarte Kanäle überlappen also stark. Erst Kanäle mit **mindestens 5 Nummern Abstand** stören sich nicht: **1, 6, 11**. (In Europa mit reinen 20-MHz-OFDM-Kanälen ist auch das Schema 1, 5, 9, 13 möglich – gelehrt und geprüft wird meist **1/6/11**.)

**Wichtig:** Überlappende Nachbarkanäle (z. B. 1 und 3) sind **schlimmer** als derselbe Kanal! Auf dem gleichen Kanal erkennen sich die Geräte und teilen sich per CSMA/CA geordnet das Medium. Bei Überlappung empfangen sie nur „Rauschen“ und stören sich gegenseitig unkoordiniert.

### Störquellen und Dämpfung

- **Bauliche Dämpfung:** Stahlbeton, Metall (Regale, Brandschutztüren), Aufzugsschächte, wärmedämmende (metallbedampfte) Fenster.
- **Wasser:** Menschen, Pflanzen, Aquarien dämpfen besonders das 2,4-GHz- und 5-GHz-Signal.
- **Andere Funksysteme** im 2,4-GHz-Band: Bluetooth, Mikrowellengeräte, Funkkameras, Babyphones, Nachbar-WLANs.
- **Ausleuchtung:** Vor der Installation wird eine **Funkausleuchtung (Site Survey)** durchgeführt, um AP-Standorte und Kanäle zu planen.`,
        },
        {
          type: 'visual',
          title: 'Kanalplanung im 2,4-GHz-Band',
          widget: {
            kind: 'topology',
            data: {
              zones: [
                { label: 'Büro West', x: 10, y: 20, w: 250, h: 390, color: 'blue' },
                { label: 'Flur / Mitte', x: 275, y: 20, w: 250, h: 390, color: 'green' },
                { label: 'Büro Ost', x: 540, y: 20, w: 250, h: 390, color: 'orange' },
              ],
              nodes: [
                { id: 'sw', type: 'switch', label: 'PoE-Switch', x: 400, y: 80 },
                { id: 'ap1', type: 'ap', label: 'AP 1', sub: 'Kanal 1', x: 135, y: 200 },
                { id: 'ap2', type: 'ap', label: 'AP 2', sub: 'Kanal 6', x: 400, y: 200 },
                { id: 'ap3', type: 'ap', label: 'AP 3', sub: 'Kanal 11', x: 665, y: 200 },
                { id: 'l1', type: 'laptop', label: 'Notebook', x: 135, y: 340 },
                { id: 'l2', type: 'phone', label: 'Smartphone', x: 400, y: 340 },
                { id: 'l3', type: 'laptop', label: 'Notebook', x: 665, y: 340 },
              ],
              links: [
                { from: 'sw', to: 'ap1' },
                { from: 'sw', to: 'ap2' },
                { from: 'sw', to: 'ap3' },
                { from: 'ap1', to: 'l1', style: 'wifi' },
                { from: 'ap2', to: 'l2', style: 'wifi' },
                { from: 'ap3', to: 'l3', style: 'wifi' },
              ],
            },
          },
          caption: `Benachbarte Funkzellen erhalten überlappungsfreie Kanäle (1, 6, 11). Im 5-GHz- und 6-GHz-Band stehen deutlich mehr überlappungsfreie Kanäle zur Verfügung.`,
        },
        {
          type: 'example',
          title: 'Langsames WLAN im Vertrieb',
          problem: `Im Vertriebsbüro von Elektro Krämer ist das WLAN langsam. Eine Analyse mit einer WLAN-App zeigt: Die drei eigenen APs senden im 2,4-GHz-Band auf den Kanälen **1, 3 und 6**, dazu kommen 8 Nachbar-WLANs. Die Clients sind Notebooks mit Wi-Fi 6. Was schlägst du vor?`,
          steps: [
            { label: 'Analyse Kanäle', body: `Kanal 3 überlappt sowohl mit Kanal 1 als auch mit Kanal 6 → unkoordinierte Störungen in allen drei Zellen.` },
            { label: 'Sofortmaßnahme', body: `Kanäle auf **1, 6, 11** umstellen.` },
            { label: 'Besser', body: `Die Wi-Fi-6-Clients bevorzugt ins **5-GHz-Band** lenken (Band Steering): mehr überlappungsfreie Kanäle, weniger Nachbarstörungen, höhere Datenraten. Bei Wi-Fi-6E-fähigen APs und Clients zusätzlich das **6-GHz-Band** nutzen.` },
            { label: 'Nachkontrolle', body: `Erneute Messung (Signalstärke, Kanalauslastung), ggf. Sendeleistung anpassen.` },
          ],
          result: `Überlappungsfreie Kanäle 1/6/11 im 2,4-GHz-Band und Clients bevorzugt auf 5 GHz (bzw. 6 GHz) verlagern.`,
        },
        {
          type: 'check',
          question: {
            id: 'm12-l06-c1',
            kind: 'match',
            skill: 'wlan.standards',
            difficulty: 1,
            prompt: `Ordne den IEEE-Standard dem Wi-Fi-Namen zu.`,
            left: ['802.11n', '802.11ac', '802.11ax', '802.11be'],
            right: ['Wi-Fi 4', 'Wi-Fi 5', 'Wi-Fi 6 / 6E', 'Wi-Fi 7'],
            answer: [0, 1, 2, 3],
            explanation: `n = Wi-Fi 4, ac = Wi-Fi 5, ax = Wi-Fi 6 (im 6-GHz-Band Wi-Fi 6E), be = Wi-Fi 7.`,
          },
        },
        {
          type: 'check',
          question: {
            id: 'm12-l06-c2',
            kind: 'multi',
            skill: 'wlan.bands',
            difficulty: 2,
            prompt: `Welche Kanäle im 2,4-GHz-Band werden üblicherweise als **überlappungsfreie** Kombination genutzt?`,
            options: ['1', '3', '6', '9', '11', '13'],
            answer: [0, 2, 4],
            explanation: `Die Kanalmitten liegen 5 MHz auseinander, ein Kanal ist ca. 20–22 MHz breit. Erst mit 5 Kanälen Abstand gibt es keine Überlappung → **1, 6, 11**.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: WLAN-Standards und Bänder',
          questionIds: ['m12-q036', 'm12-q037', 'm12-q038', 'm12-q039', 'm12-q040', 'm12-q041'],
          count: 5,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'IEEE 802.11: n = Wi-Fi 4, ac = Wi-Fi 5 (nur 5 GHz), ax = Wi-Fi 6, 6E = ax im 6-GHz-Band, be = Wi-Fi 7.',
            'Angegebene Datenraten sind theoretische Bruttowerte; WLAN ist geteiltes Halbduplex-Medium.',
            '2,4 GHz: große Reichweite, nur 3 überlappungsfreie Kanäle (1/6/11), viele Störer.',
            '5 GHz: viele Kanäle, weniger Störungen, geringere Reichweite, DFS ab Kanal 52.',
            '6 GHz: nur Wi-Fi 6E/7, WPA3 Pflicht, sehr wenig Störungen, geringste Reichweite.',
            'Überlappende Nachbarkanäle stören mehr als derselbe Kanal.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'm12-l07',
      title: 'WLAN-Betrieb: SSID, Betriebsmodi, Roaming und CSMA/CA',
      minutes: 20,
      relevance: 'ap1',
      skills: ['wlan.operation'],
      steps: [
        {
          type: 'explain',
          title: 'Wie ein WLAN organisiert ist',
          body: `### SSID, BSSID, BSS und ESS

- **SSID (Service Set Identifier):** der **Name des WLANs** (max. 32 Byte), z. B. „Kraemer-Mitarbeiter“ oder „Kraemer-Gast“. Ein AP kann mehrere SSIDs gleichzeitig aussenden – jede typischerweise einem eigenen **VLAN** zugeordnet.
- **BSSID:** die **MAC-Adresse** der Funkschnittstelle eines APs für eine SSID – sie identifiziert eine einzelne Funkzelle.
- **BSS (Basic Service Set):** ein AP mit seinen Clients (eine Funkzelle).
- **ESS (Extended Service Set):** mehrere APs mit **derselben SSID**, die über das kabelgebundene Netz verbunden sind – für den Nutzer ein einziges großes WLAN.

Eine **versteckte SSID** (Broadcast abgeschaltet) ist **kein Sicherheitsmerkmal** – sie lässt sich mit einfachen Tools trotzdem herausfinden. Sicherheit erreicht man mit **WPA2/WPA3** (Verschlüsselung und Authentifizierung, Details im Sicherheitsmodul).

### Betriebsmodi

| Modus | Beschreibung | Einsatz |
|---|---|---|
| **Infrastrukturmodus** | Alle Clients kommunizieren **über einen Access Point**; dieser verbindet das WLAN mit dem LAN | Standard in Firma und Zuhause |
| **Ad-hoc-Modus** (IBSS) | Clients verbinden sich **direkt miteinander**, ohne AP | spontaner Datenaustausch, heute selten (eher Wi-Fi Direct) |
| **Mesh** (z. B. 802.11s bzw. Herstellerlösungen) | APs verbinden sich untereinander per Funk; nicht jeder AP braucht ein Kabel | Hallen, Außenbereiche, Heimnetz |

### Roaming

**Roaming** ist der **Wechsel eines Clients von einer Funkzelle zur nächsten**, ohne dass die Verbindung abreißt – z. B. ein Lagermitarbeiter mit Handscanner, der durch die Halle läuft.

- Die **Entscheidung zum Wechsel trifft der Client** (abhängig von Signalstärke, Treiber).
- Voraussetzungen: **gleiche SSID** und **gleiche Sicherheitseinstellungen** auf allen APs, **überlappende Funkzellen** (Richtwert ca. 15–20 % Überlappung), damit der Client rechtzeitig wechseln kann, und idealerweise **dasselbe VLAN/IP-Netz**, damit der Client seine IP-Adresse behält.
- Benachbarte APs nutzen **unterschiedliche, überlappungsfreie Kanäle**.
- Verbesserungen: **802.11r** (Fast Roaming – schnellere Authentifizierung), **802.11k** (Nachbar-AP-Listen), **802.11v** (AP kann Wechsel empfehlen). In Firmen werden APs oft zentral über einen **WLAN-Controller** bzw. ein Cloud-Management gesteuert.

### CSMA/CA – Kollisionen vermeiden statt erkennen

Im WLAN teilen sich alle Stationen einer Funkzelle **dasselbe Medium** – es arbeitet im **Halbduplex**. Kollisionen **erkennen** wie bei CSMA/CD funktioniert hier nicht:
- Eine Funkstation kann nicht gleichzeitig senden und zuverlässig empfangen – das eigene starke Sendesignal überdeckt alles andere.
- **Hidden-Station-Problem:** Zwei Clients erreichen beide den AP, hören sich aber gegenseitig nicht (z. B. Wand dazwischen) – sie können eine Kollision gar nicht bemerken.

Deshalb verwendet WLAN **CSMA/CA** (Collision **Avoidance**):

1. **Carrier Sense:** Medium abhören.
2. Ist es frei, eine feste Wartezeit (**DIFS**) plus eine **zufällige Backoff-Zeit** abwarten – so beginnen nicht alle wartenden Stationen gleichzeitig.
3. Ist das Medium immer noch frei: **senden**.
4. Der Empfänger bestätigt jeden korrekt empfangenen Frame mit einem **ACK**. Bleibt das ACK aus, gilt der Frame als verloren und wird erneut gesendet.
5. Optional **RTS/CTS** (Request to Send / Clear to Send): Der Sender reserviert das Medium vorab; das CTS des APs hören auch „versteckte“ Stationen → Lösung für das Hidden-Station-Problem.

| | **CSMA/CD** | **CSMA/CA** |
|---|---|---|
| Medium | kabelgebundenes Ethernet im **Halbduplex** (Bus, Hub) | **WLAN** |
| Prinzip | Kollision **erkennen** und darauf reagieren | Kollision **vermeiden** (Warten, Backoff, ACK, RTS/CTS) |
| Bestätigung | keine auf Schicht 2 | **ACK** für jeden Unicast-Frame |
| Heute | praktisch bedeutungslos (Vollduplex-Switches) | aktiv in jedem WLAN |`,
        },
        {
          type: 'visual',
          title: 'CSMA/CA mit RTS/CTS',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['Client A', 'Access Point', 'Client B (versteckt)'],
              messages: [
                { from: 0, to: 0, label: 'Medium abhören, DIFS + Backoff warten' },
                { from: 0, to: 1, label: 'RTS (Request to Send)' },
                { from: 1, to: 0, label: 'CTS (Clear to Send)', note: 'auch B hört das CTS' },
                { from: 1, to: 2, label: 'CTS', note: 'B schweigt für die angekündigte Dauer' },
                { from: 0, to: 1, label: 'Daten-Frame' },
                { from: 1, to: 0, label: 'ACK', note: 'ohne ACK: erneut senden' },
              ],
            },
          },
          caption: `Client B kann Client A nicht hören, wohl aber den AP. Durch das CTS weiß B, dass das Medium belegt ist – eine Kollision wird vermieden.`,
        },
        {
          type: 'example',
          title: 'Handscanner verlieren im Lager die Verbindung',
          problem: `Die Lagermitarbeiter in Hildesheim beklagen, dass ihre Handscanner beim Gang durch die Halle die Verbindung verlieren und sich neu anmelden müssen. Es gibt 4 APs: AP 1 und 2 mit SSID „Lager“, AP 3 und 4 mit SSID „Lager-Halle2“, alle auf Kanal 6. AP 3 und 4 liegen in einem anderen VLAN.`,
          steps: [
            { label: 'SSID', body: `Unterschiedliche SSIDs → kein Roaming möglich, der Scanner muss sich mit einem „anderen“ WLAN verbinden. → **Einheitliche SSID** mit identischer Sicherheitseinstellung auf allen APs.` },
            { label: 'VLAN', body: `Unterschiedliche VLANs/IP-Netze → Scanner bekommt eine neue IP, laufende Verbindungen brechen ab. → **Dasselbe VLAN** für die SSID auf allen APs.` },
            { label: 'Kanäle', body: `Alle APs auf Kanal 6 → Zellen teilen sich das Medium, viel Konkurrenz. → Kanäle **1, 6, 11** verteilen bzw. 5 GHz nutzen.` },
            { label: 'Ausleuchtung', body: `Mit einer Ausleuchtung prüfen, ob sich die Zellen ausreichend überlappen (Richtwert 15–20 %).` },
          ],
          result: `Einheitliche SSID + gleiches VLAN + überlappungsfreie Kanäle + ausreichende Zellüberlappung ermöglichen unterbrechungsfreies Roaming.`,
        },
        {
          type: 'check',
          question: {
            id: 'm12-l07-c1',
            kind: 'single',
            skill: 'wlan.operation',
            difficulty: 2,
            prompt: `Warum verwendet WLAN **CSMA/CA** statt CSMA/CD?`,
            options: [
              'Funkstationen können Kollisionen beim Senden nicht zuverlässig erkennen (u. a. Hidden-Station-Problem).',
              'WLAN arbeitet im Vollduplex, daher gibt es keine Kollisionen.',
              'CSMA/CA ist schneller, weil es keine Bestätigungen verwendet.',
              'CSMA/CD ist nur für Glasfaser definiert.',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'WLAN ist ein geteiltes Halbduplex-Medium – gerade deshalb braucht es ein Zugriffsverfahren.', error: 'csma-ca-cd' },
              '2': { why: 'Im Gegenteil: CSMA/CA bestätigt jeden Unicast-Frame mit einem ACK.', error: 'csma-ca-cd' },
              '3': { why: 'CSMA/CD stammt aus dem kupferbasierten Halbduplex-Ethernet (Koax, Hub).', error: 'csma-ca-cd' },
            },
            explanation: `Beim Senden übertönt das eigene Signal alles andere, und versteckte Stationen hören sich gar nicht. Daher **vermeidet** WLAN Kollisionen (Warten, Backoff, ACK, optional RTS/CTS), statt sie zu erkennen.`,
          },
        },
        {
          type: 'check',
          question: {
            id: 'm12-l07-c2',
            kind: 'single',
            skill: 'wlan.operation',
            difficulty: 1,
            prompt: `In welchem Modus kommunizieren WLAN-Clients **über einen Access Point**?`,
            options: ['Infrastrukturmodus', 'Ad-hoc-Modus', 'Monitor-Modus', 'Simplex-Modus'],
            answer: 0,
            distractors: {
              '1': { why: 'Im Ad-hoc-Modus verbinden sich Clients direkt ohne AP.', error: 'wlan-modi' },
              '2': { why: 'Im Monitor-Modus wird nur mitgelesen (Analyse), nicht kommuniziert.', error: 'wlan-modi' },
              '3': { why: 'Simplex ist eine Übertragungsrichtung, kein WLAN-Betriebsmodus.', error: 'wlan-modi' },
            },
            explanation: `Im **Infrastrukturmodus** laufen alle Verbindungen über den AP, der das WLAN mit dem kabelgebundenen LAN verbindet – der Standard in Unternehmen.`,
          },
        },
        {
          type: 'practice',
          title: 'Übung: WLAN-Betrieb',
          questionIds: ['m12-q042', 'm12-q043', 'm12-q044', 'm12-q045', 'm12-q046', 'm12-q047'],
          count: 5,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'SSID = Name des WLANs; BSSID = MAC der AP-Funkzelle; ESS = mehrere APs mit gleicher SSID.',
            'Versteckte SSID ist kein Schutz – Sicherheit nur mit WPA2/WPA3.',
            'Infrastrukturmodus (über AP) ist Standard, Ad-hoc = direkt zwischen Clients.',
            'Roaming: Client entscheidet; gleiche SSID, gleiche Sicherheit, gleiches VLAN, überlappende Zellen, verschiedene Kanäle.',
            'CSMA/CA: abhören, DIFS + Backoff, senden, ACK; RTS/CTS gegen Hidden-Station-Problem.',
            'CSMA/CD (Kollision erkennen) gilt für Halbduplex-Ethernet und ist heute praktisch bedeutungslos.',
          ],
        },
      ],
    },
  ],

  /* ==================================================================== */
  /* Fragenpool                                                            */
  /* ==================================================================== */
  questions: [
    // ---------- cabling.media ----------
    {
      id: 'm12-q001',
      kind: 'single',
      skill: 'cabling.media',
      difficulty: 2,
      prompt: `**Handlungssituation:** Zwei Gebäude von Elektro Krämer (Abstand 80 m) haben getrennte Stromversorgungen. Ein Kollege möchte sie mit Cat-6A-Kabel verbinden, „weil 80 m ja unter 100 m liegen“. Was spricht trotzdem für Glasfaser?`,
      options: [
        'Galvanische Trennung – keine Ausgleichsströme durch Potenzialunterschiede, zudem EMV-Unempfindlichkeit',
        'Cat 6A ist nur bis 55 m zugelassen',
        'Glasfaser ist immer billiger als Kupfer',
        'Kupferkabel dürfen grundsätzlich nicht im Erdreich verlegt werden',
      ],
      answer: 0,
      distractors: {
        '1': { why: '55 m ist die Grenze für 10GBASE-T über Cat 6, nicht Cat 6A. Cat 6A schafft 100 m.', error: 'kategorie-laengen' },
        '2': { why: 'Glasfaser-Komponenten (Transceiver, Spleißen) sind meist teurer.', error: 'medien-kosten' },
        '3': { why: 'Es gibt erdverlegbare Kupferkabel – das Hauptproblem ist der Potenzialunterschied.', error: 'medien-vergleich' },
      },
      hints: ['Was passiert elektrisch, wenn zwei Gebäude unterschiedliche Erdpotenziale haben?'],
      explanation: `Zwischen Gebäuden mit eigener Einspeisung können **Potenzialunterschiede** auftreten (Ausgleichsströme über den Schirm, Überspannungen bei Blitzeinschlag). Glasfaser ist nicht leitend → **galvanische Trennung**. Deshalb verbindet man Gebäude grundsätzlich per LWL.`,
    },
    {
      id: 'm12-q002',
      kind: 'single',
      skill: 'cabling.media',
      difficulty: 1,
      prompt: `Welches Übertragungsmedium ermöglicht die **Stromversorgung von Endgeräten (PoE)**?`,
      options: ['Twisted-Pair-Kupferkabel', 'Multimode-Glasfaser', 'Singlemode-Glasfaser', 'WLAN'],
      answer: 0,
      distractors: {
        '1': { why: 'Glasfaser überträgt Licht und leitet keinen Strom.', error: 'poe-medium' },
        '2': { why: 'Glasfaser überträgt Licht und leitet keinen Strom.', error: 'poe-medium' },
        '3': { why: 'Über Funk werden keine Geräte mit Betriebsstrom versorgt.', error: 'poe-medium' },
      },
      explanation: `PoE nutzt die **Kupferadern** des Twisted-Pair-Kabels, um neben den Daten eine Gleichspannung (ca. 48 V) zu übertragen.`,
    },
    {
      id: 'm12-q003',
      kind: 'free',
      skill: 'cabling.media',
      difficulty: 2,
      prompt: `Nennen und erläutern Sie **je zwei Vorteile** von Twisted-Pair-Kupferkabeln und von Glasfaserkabeln.`,
      modelAnswer: `**Twisted Pair:** (1) **Günstig und einfach** zu verlegen und zu konfektionieren (RJ45), fast alle Endgeräte haben einen RJ45-Port. (2) **PoE möglich** – Access Points, Telefone, Kameras werden über das Datenkabel mit Strom versorgt.
**Glasfaser:** (1) **Große Reichweite** und hohe Datenraten (Multimode einige 100 m, Singlemode viele km), während Kupfer auf 100 m begrenzt ist. (2) **Unempfindlich gegen elektromagnetische Störungen** und **galvanisch getrennt** – ideal zwischen Gebäuden und in Industrieumgebungen; außerdem schwer abhörbar.`,
      keywords: ['günstig', 'RJ45', 'PoE', 'Reichweite', '100 m', 'EMV', 'galvanische Trennung', 'Datenrate'],
      hints: ['Denke bei Kupfer an Kosten und Strom.', 'Denke bei Glasfaser an Entfernung und Störungen.'],
      explanation: `„Erläutern“ heißt: Vorteil nennen **und** kurz begründen bzw. mit einem Einsatzbeispiel verbinden.`,
    },
    // ---------- cabling.fiber ----------
    {
      id: 'm12-q004',
      kind: 'match',
      skill: 'cabling.fiber',
      difficulty: 2,
      prompt: `Ordne jede Eigenschaft dem passenden Fasertyp zu.`,
      left: ['Kerndurchmesser 50 µm', 'Kerndurchmesser ca. 9 µm', 'typisch 850 nm, VCSEL/LED', 'Reichweiten von vielen Kilometern', 'Mantelfarbe gelb'],
      right: ['Multimode', 'Singlemode'],
      answer: [0, 1, 0, 1, 1],
      explanation: `Multimode: 50/62,5 µm Kern, 850 nm, einige 100 m. Singlemode: ca. 9 µm Kern, 1310/1550 nm Laser, km-Bereich, gelber Mantel (OS1/OS2).`,
    },
    {
      id: 'm12-q005',
      kind: 'single',
      skill: 'cabling.fiber',
      difficulty: 2,
      prompt: `Warum sind die Reichweiten von **Multimode**-Fasern kürzer als die von Singlemode-Fasern?`,
      options: [
        'Das Licht breitet sich auf vielen Wegen (Moden) aus, die Impulse verbreitern sich (Modendispersion).',
        'Multimode-Fasern bestehen aus Kunststoff.',
        'Multimode-Fasern haben einen dünneren Kern.',
        'Multimode-Fasern übertragen elektrische Signale.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Typische MM-Fasern im Netzwerk sind aus Glas (Kunststofffasern POF sind ein Sonderfall).', error: 'faser-physik' },
        '2': { why: 'Umgekehrt: Multimode hat den dickeren Kern (50 µm statt 9 µm).', error: 'verwechslung-mm-sm' },
        '3': { why: 'Alle Glasfasern übertragen Licht.', error: 'faser-physik' },
      },
      hints: ['„Multi-Mode“ – viele …?'],
      explanation: `Im dicken Multimode-Kern laufen viele Lichtstrahlen unterschiedlich lange Wege. Sie kommen zeitversetzt an, der Lichtimpuls „verschmiert“ (**Modendispersion**). Je länger die Strecke, desto stärker – das begrenzt Reichweite bzw. Datenrate.`,
    },
    {
      id: 'm12-q006',
      kind: 'single',
      skill: 'cabling.fiber',
      difficulty: 1,
      prompt: `Welcher Glasfaserstecker ist **klein, als Duplex üblich und Standard an SFP-Modulen**?`,
      options: ['LC', 'SC', 'ST', 'RJ45'],
      answer: 0,
      distractors: {
        '1': { why: 'SC ist quadratisch und größer – eher in älteren Installationen und bei FTTH.', error: 'lwl-stecker' },
        '2': { why: 'ST hat einen Bajonettverschluss und ist veraltet.', error: 'lwl-stecker' },
        '3': { why: 'RJ45 ist ein Kupferstecker.', error: 'lwl-stecker' },
      },
      explanation: `**LC** (Lucent Connector) ist ein Small-Form-Factor-Stecker mit Rastnase. Als LC-Duplex ist er an SFP/SFP+-Transceivern Standard.`,
    },
    {
      id: 'm12-q007',
      kind: 'text',
      skill: 'cabling.fiber',
      difficulty: 1,
      prompt: `Welche **Mantelfarbe** haben Singlemode-Patchkabel (OS1/OS2) üblicherweise?`,
      accept: ['gelb', 'yellow'],
      placeholder: 'Farbe',
      explanation: `Singlemode-Kabel sind üblicherweise **gelb**. Multimode: OM1/OM2 orange, OM3 aqua, OM4 aqua oder erikaviolett, OM5 limettengrün.`,
    },
    // ---------- cabling.shielding ----------
    {
      id: 'm12-q008',
      kind: 'match',
      skill: 'cabling.shielding',
      difficulty: 2,
      prompt: `Ordne die Kabelbezeichnung der richtigen Beschreibung zu.`,
      left: ['U/UTP', 'F/UTP', 'U/FTP', 'S/FTP'],
      right: [
        'kein Gesamtschirm, keine Paarschirmung',
        'Folie als Gesamtschirm, Paare ungeschirmt',
        'kein Gesamtschirm, jedes Paar mit Folie',
        'Geflecht als Gesamtschirm, jedes Paar mit Folie',
      ],
      answer: [0, 1, 2, 3],
      hints: ['Vor dem Schrägstrich: Gesamtschirm. Danach: Paarschirm.'],
      explanation: `Schema XX/YTP: XX = Gesamtschirm (U, F, S, SF), Y = Paarschirm (U, F), TP = Twisted Pair.`,
    },
    {
      id: 'm12-q009',
      kind: 'single',
      skill: 'cabling.shielding',
      difficulty: 1,
      prompt: `Warum sind die Adern in Netzwerkkabeln **paarweise verdrillt**?`,
      options: [
        'Um Störeinflüsse und Nebensprechen zu verringern',
        'Damit das Kabel flexibler ist',
        'Um mehr Strom übertragen zu können',
        'Damit man die Adern besser unterscheiden kann',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Flexibilität ist ein Nebeneffekt, aber nicht der Grund.', error: 'verdrillung' },
        '2': { why: 'Die Stromtragfähigkeit hängt vom Aderquerschnitt ab, nicht von der Verdrillung.', error: 'verdrillung' },
        '3': { why: 'Dazu dienen die Farben.', error: 'verdrillung' },
      },
      explanation: `Das Signal wird symmetrisch auf beiden Adern eines Paares übertragen. Durch die Verdrillung wirken Störungen auf beide Adern gleich und heben sich beim Empfänger auf; außerdem sinkt das Nebensprechen zwischen den Paaren.`,
    },
    {
      id: 'm12-q010',
      kind: 'text',
      skill: 'cabling.shielding',
      difficulty: 2,
      prompt: `Wie lautet die Bezeichnung nach ISO/IEC 11801 für ein Kabel mit **Geflechtschirm als Gesamtschirm** und **Folienschirm um jedes Paar**?`,
      accept: ['S/FTP', 'SFTP', 'S-FTP'],
      placeholder: 'XX/YTP',
      explanation: `**S/FTP**: S = Geflecht (Gesamtschirm), F = Folie je Paar, TP = Twisted Pair.`,
    },
    // ---------- cabling.categories ----------
    {
      id: 'm12-q011',
      kind: 'match',
      skill: 'cabling.categories',
      difficulty: 2,
      prompt: `Ordne der Kategorie die spezifizierte **Frequenz** zu.`,
      left: ['Cat 5e', 'Cat 6', 'Cat 6A', 'Cat 7', 'Cat 8'],
      right: ['100 MHz', '250 MHz', '500 MHz', '600 MHz', '2000 MHz'],
      answer: [0, 1, 2, 3, 4],
      explanation: `Cat 5e 100 MHz, Cat 6 250 MHz, Cat 6A 500 MHz, Cat 7 600 MHz (7A 1000 MHz), Cat 8 2000 MHz.`,
    },
    {
      id: 'm12-q012',
      kind: 'single',
      skill: 'cabling.categories',
      difficulty: 2,
      prompt: `Welche Kategorie ist **mindestens** erforderlich, um **10GBASE-T über die vollen 100 m** zu übertragen?`,
      options: ['Cat 6A', 'Cat 5e', 'Cat 6', 'Cat 8'],
      answer: 0,
      distractors: {
        '1': { why: 'Cat 5e ist für 1000BASE-T (und 2,5GBASE-T) ausgelegt.', error: 'kategorie-datenrate' },
        '2': { why: 'Cat 6 schafft 10GBASE-T nur auf kürzeren Strecken (ca. 55 m).', error: 'kategorie-laengen' },
        '3': { why: 'Cat 8 ist nur bis 30 m spezifiziert und für 25/40G gedacht – und nicht „mindestens“.', error: 'kategorie-laengen' },
      },
      explanation: `**Cat 6A** (500 MHz) ist für 10GBASE-T über 100 m spezifiziert. Cat 7/7A können es auch, sind aber nicht das Minimum.`,
    },
    {
      id: 'm12-q013',
      kind: 'number',
      skill: 'cabling.categories',
      difficulty: 2,
      prompt: `Wie viele **Meter** darf ein Cat-8-Kanal für 25GBASE-T/40GBASE-T maximal lang sein?`,
      answer: 30,
      unit: 'm',
      explanation: `Cat 8 ist für **30 m** spezifiziert – typisch für kurze Verbindungen im Rechenzentrum (Server ↔ Top-of-Rack-Switch).`,
    },
    {
      id: 'm12-q014',
      kind: 'single',
      skill: 'cabling.categories',
      difficulty: 3,
      prompt: `Ein Installateur hat **Cat-7-Verlegekabel** verlegt und auf **Cat-6A-RJ45-Dosen** aufgelegt; die Patchkabel sind Cat 6A. Welche Leistungsklasse hat die Strecke?`,
      options: [
        'Cat 6A (Klasse EA) – die schwächste Komponente bestimmt die Strecke',
        'Cat 7 – das Verlegekabel ist entscheidend',
        'Cat 8 – weil Cat 7 + Cat 6A addiert werden',
        'Die Kombination ist unzulässig und funktioniert nicht',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Dosen und Patchkabel begrenzen die Strecke auf ihre Kategorie.', error: 'schwaechstes-glied' },
        '2': { why: 'Kategorien werden nicht addiert.', error: 'schwaechstes-glied' },
        '3': { why: 'Im Gegenteil, diese Kombination ist in Deutschland weit verbreitet und normgerecht.', error: 'schwaechstes-glied' },
      },
      explanation: `Eine Strecke ist nur so gut wie ihre **schwächste Komponente**. Cat-7-Kabel mit Cat-6A-Komponenten ergibt eine Cat-6A-Strecke (Klasse EA, 10GBASE-T über 100 m) – eine sehr übliche Lösung.`,
    },
    {
      id: 'm12-q015',
      kind: 'single',
      skill: 'cabling.categories',
      difficulty: 2,
      prompt: `Wie setzt sich die maximale Kanallänge von **100 m** bei Twisted Pair zusammen?`,
      options: [
        '90 m fest verlegtes Kabel + insgesamt 10 m Patch-/Geräteanschlusskabel',
        '100 m fest verlegtes Kabel + beliebig lange Patchkabel',
        '50 m Verlegekabel + 50 m Patchkabel',
        '95 m Verlegekabel + 5 m Patchkabel je Seite',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Die 100 m sind die Gesamtlänge inklusive Patchkabel.', error: 'kanallaenge' },
        '2': { why: 'Patchkabel haben eine höhere Dämpfung; ihr Anteil ist auf 10 m begrenzt.', error: 'kanallaenge' },
        '3': { why: 'Der Permanent Link darf maximal 90 m lang sein.', error: 'kanallaenge' },
      },
      explanation: `**Channel (100 m) = Permanent Link (max. 90 m) + Patch- und Geräteanschlusskabel (zusammen max. 10 m).**`,
    },
    // ---------- cabling.rj45 ----------
    {
      id: 'm12-q016',
      kind: 'order',
      skill: 'cabling.rj45',
      difficulty: 3,
      prompt: `Bringe die Aderfarben in die Reihenfolge der Pins **1 bis 8** nach **T568B**.`,
      items: ['weiß-orange', 'orange', 'weiß-grün', 'blau', 'weiß-blau', 'grün', 'weiß-braun', 'braun'],
      hints: ['T568B beginnt mit dem orangen Paar.', 'Das grüne Paar liegt auf den Pins 3 und 6, das blaue in der Mitte.'],
      explanation: `T568B: 1 ws-or, 2 or, 3 ws-gn, 4 bl, 5 ws-bl, 6 gn, 7 ws-br, 8 br. Bei T568A sind Orange und Grün vertauscht.`,
    },
    {
      id: 'm12-q017',
      kind: 'multi',
      skill: 'cabling.rj45',
      difficulty: 2,
      prompt: `Welche Pins werden von **100BASE-TX** zur Datenübertragung genutzt?`,
      options: ['1', '2', '3', '4', '5', '6', '7', '8'],
      answer: [0, 1, 2, 5],
      hints: ['Fast Ethernet nutzt nur zwei Adernpaare.'],
      explanation: `100BASE-TX nutzt **2 Paare**: Pins **1/2** (Senden) und **3/6** (Empfangen). 1000BASE-T und schneller nutzen alle vier Paare.`,
    },
    {
      id: 'm12-q018',
      kind: 'single',
      skill: 'cabling.rj45',
      difficulty: 2,
      prompt: `Warum werden heute kaum noch **Crossover-Kabel** benötigt?`,
      options: [
        'Moderne Ports erkennen per Auto-MDI-X selbst, ob gekreuzt werden muss.',
        'Crossover-Kabel sind seit Cat 6 verboten.',
        'Switches haben keine RJ45-Ports mehr.',
        'Alle Geräte nutzen heute T568A.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Es gibt kein Verbot – sie sind nur überflüssig geworden.', error: 'auto-mdix' },
        '2': { why: 'RJ45 ist weiterhin der Standard für Kupferports.', error: 'auto-mdix' },
        '3': { why: 'Die Norm am Kabelende ändert nichts, solange beide Enden gleich sind.', error: 'auto-mdix' },
      },
      explanation: `**Auto-MDI-X** tauscht bei Bedarf Sende- und Empfangspaare intern. Damit funktioniert ein normales 1:1-Patchkabel zwischen beliebigen Geräten.`,
    },
    // ---------- ethernet.standards ----------
    {
      id: 'm12-q019',
      kind: 'match',
      skill: 'ethernet.standards',
      difficulty: 2,
      prompt: `Ordne den Ethernet-Standard dem passenden Medium zu.`,
      left: ['1000BASE-T', '10GBASE-SR', '10GBASE-LR', '10GBASE-T'],
      right: ['Twisted Pair Cat 5e', 'Multimode-Glasfaser', 'Singlemode-Glasfaser', 'Twisted Pair Cat 6A'],
      answer: [0, 1, 2, 3],
      explanation: `T = Twisted Pair; SR = Short Range (Multimode, 850 nm); LR = Long Range (Singlemode, 1310 nm, 10 km).`,
    },
    {
      id: 'm12-q020',
      kind: 'number',
      skill: 'ethernet.standards',
      difficulty: 1,
      prompt: `Wie viele **Adernpaare** nutzt **1000BASE-T**?`,
      answer: 4,
      explanation: `1000BASE-T nutzt **alle 4 Paare** gleichzeitig in beide Richtungen (je 250 Mbit/s pro Paar).`,
    },
    {
      id: 'm12-q021',
      kind: 'text',
      skill: 'ethernet.standards',
      difficulty: 2,
      prompt: `Wie lautet die Ethernet-Bezeichnung für **10 Gbit/s über Multimode-Glasfaser (Short Range)**?`,
      accept: ['10GBASE-SR', '10GBASESR', '10G BASE-SR', '10GBase-SR'],
      placeholder: 'z. B. 1000BASE-T',
      explanation: `**10GBASE-SR**: 10G = 10 Gbit/s, BASE = Basisband, SR = Short Range (Multimode, 850 nm; OM3 300 m, OM4 400 m).`,
    },
    {
      id: 'm12-q022',
      kind: 'number',
      skill: 'ethernet.standards',
      difficulty: 3,
      prompt: `Wie viele Meter erreicht **10GBASE-SR** laut Standard über **OM4**-Multimode-Faser?`,
      answer: 400,
      unit: 'm',
      hints: ['OM3 erreicht 300 m.'],
      explanation: `10GBASE-SR: OM3 **300 m**, OM4 **400 m**. Für längere Strecken nutzt man Singlemode (10GBASE-LR, 10 km).`,
    },
    // ---------- ethernet.duplex ----------
    {
      id: 'm12-q023',
      kind: 'match',
      skill: 'ethernet.duplex',
      difficulty: 1,
      prompt: `Ordne die Betriebsart dem passenden Beispiel zu.`,
      left: ['Simplex', 'Halbduplex', 'Vollduplex'],
      right: ['UKW-Radio', 'Walkie-Talkie / WLAN', 'Telefon / Switchport'],
      answer: [0, 1, 2],
      explanation: `Simplex: nur eine Richtung. Halbduplex: beide Richtungen, abwechselnd. Vollduplex: beide Richtungen gleichzeitig.`,
    },
    {
      id: 'm12-q024',
      kind: 'single',
      skill: 'ethernet.duplex',
      difficulty: 2,
      prompt: `In welchem Fall kommt **CSMA/CD** zum Einsatz?`,
      options: [
        'Bei kabelgebundenem Ethernet im Halbduplex (z. B. am Hub)',
        'Bei jeder Switch-Verbindung im Vollduplex',
        'Im WLAN',
        'Bei Glasfaserverbindungen zwischen Gebäuden',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Im Vollduplex gibt es keine Kollisionen – CSMA/CD ist abgeschaltet.', error: 'csma-ca-cd' },
        '2': { why: 'WLAN nutzt CSMA/CA.', error: 'csma-ca-cd' },
        '3': { why: 'Glasfaser-Ethernet arbeitet im Vollduplex.', error: 'csma-ca-cd' },
      },
      explanation: `CSMA/CD regelt den Zugriff auf ein **geteiltes** Medium (Bus, Hub) im **Halbduplex**. Mit Vollduplex-Switchports ist es überflüssig.`,
    },
    {
      id: 'm12-q025',
      kind: 'free',
      skill: 'ethernet.duplex',
      difficulty: 3,
      prompt: `**Handlungssituation:** Nach einem Serverumzug ist die Verbindung zum ERP-Server sehr langsam. Im Switch sehen Sie am Serverport „100 Mbit/s, Half Duplex“ und zahlreiche Late Collisions. An der Server-NIC wurde „100 Mbit/s Full Duplex“ fest eingestellt.

Erläutern Sie die Ursache und schlagen Sie eine Lösung vor.`,
      modelAnswer: `Ursache ist ein **Duplex-Mismatch**: Die Server-NIC ist fest auf 100 Mbit/s Vollduplex eingestellt und nimmt nicht an der **Autonegotiation** teil. Der Switchport (Auto) erhält keine Aushandlungsinformationen, erkennt nur die Geschwindigkeit und fällt auf **Halbduplex** zurück. Der Server sendet im Vollduplex ohne Rücksicht auf das Medium, der Switch arbeitet mit CSMA/CD und erkennt dabei Kollisionen (Late Collisions) – Frames gehen verloren, TCP muss neu übertragen, der Durchsatz bricht ein.
Lösung: Beide Seiten auf **Autonegotiation** stellen (empfohlen, bei Gigabit ohnehin vorgeschrieben) – dann wird die höchste gemeinsame Geschwindigkeit (z. B. 1 Gbit/s) mit Vollduplex ausgehandelt. Alternativ beide Seiten fest identisch konfigurieren.`,
      keywords: ['Duplex-Mismatch', 'Autonegotiation', 'Halbduplex', 'Vollduplex', 'Kollisionen', 'beide Seiten'],
      hints: ['Was passiert, wenn nur eine Seite an der Aushandlung teilnimmt?', 'Wie sollten beide Seiten eingestellt sein?'],
      explanation: `Erwartet werden: Fachbegriff Duplex-Mismatch, Erklärung des Rückfalls auf Halbduplex, Zusammenhang mit den Kollisionen und eine konkrete Lösung.`,
    },
    // ---------- ethernet.poe ----------
    {
      id: 'm12-q026',
      kind: 'match',
      skill: 'ethernet.poe',
      difficulty: 2,
      prompt: `Ordne dem PoE-Standard die maximale Leistung **am PSE (Switchport)** zu.`,
      left: ['802.3af', '802.3at', '802.3bt Type 3', '802.3bt Type 4'],
      right: ['15,4 W', '30 W', '60 W', '90 W'],
      answer: [0, 1, 2, 3],
      explanation: `af (PoE) 15,4 W, at (PoE+) 30 W, bt Type 3 60 W, bt Type 4 90 W. Am Gerät kommt wegen Leitungsverlusten weniger an (12,95 / 25,5 / 51 / 71,3 W).`,
    },
    {
      id: 'm12-q027',
      kind: 'number',
      skill: 'ethernet.poe',
      difficulty: 3,
      prompt: `Ein PoE-Switch hat ein Budget von **370 W** und reserviert je Port die Klassenleistung am PSE. Angeschlossen sind **8 Access Points (Klasse 4, 30 W)**, **12 IP-Telefone (Klasse 2, 7 W)** und **2 Kameras (Klasse 3, 15,4 W)**. Wie viele **Watt Reserve** bleiben?`,
      answer: 15.2,
      tolerance: 0.05,
      unit: 'W',
      hints: ['Rechne jede Gerätegruppe einzeln: Anzahl × Klassenleistung.', '8 × 30 + 12 × 7 + 2 × 15,4 = ?'],
      explanation: `8 × 30 W = 240 W; 12 × 7 W = 84 W; 2 × 15,4 W = 30,8 W. Summe **354,8 W**. Reserve: 370 − 354,8 = **15,2 W** – knapp, ein weiterer AP würde nicht mehr passen.`,
    },
    {
      id: 'm12-q028',
      kind: 'single',
      skill: 'ethernet.poe',
      difficulty: 2,
      prompt: `Warum stehen bei 802.3af am Endgerät nur **12,95 W** zur Verfügung, obwohl der Switchport **15,4 W** liefert?`,
      options: [
        'Leitungsverluste auf bis zu 100 m Kupferkabel',
        'Der Switch behält 2,45 W für sich selbst',
        'Das Endgerät gibt Leistung an den nächsten Switch weiter',
        'Die Differenz wird für die Datenübertragung benötigt',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Der Switch versorgt sich über sein eigenes Netzteil.', error: 'poe-verluste' },
        '2': { why: 'Ein PD gibt keine Leistung weiter (Pass-Through ist ein Sonderfall).', error: 'poe-verluste' },
        '3': { why: 'Die Datenübertragung ist unabhängig von der PoE-Leistung.', error: 'poe-verluste' },
      },
      explanation: `Der Widerstand der Kupferadern wandelt einen Teil der Leistung in **Wärme** um. Die Norm rechnet mit dem ungünstigsten Fall (100 m Kabel) – daher die Differenz zwischen PSE- und PD-Leistung.`,
    },
    {
      id: 'm12-q029',
      kind: 'match',
      skill: 'ethernet.poe',
      difficulty: 1,
      prompt: `Ordne die PoE-Begriffe zu.`,
      left: ['PSE', 'PD', 'Midspan', 'Endspan'],
      right: ['Stromliefernde Komponente', 'Versorgtes Endgerät', 'PoE-Injektor zwischen Switch und Gerät', 'PoE-Switch liefert den Strom selbst'],
      answer: [0, 1, 2, 3],
      explanation: `PSE = Power Sourcing Equipment, PD = Powered Device. Midspan = zwischengeschalteter Injektor, Endspan = PoE direkt aus dem Switch.`,
    },
    {
      id: 'm12-q030',
      kind: 'single',
      skill: 'ethernet.poe',
      difficulty: 2,
      prompt: `Ein neuer Wi-Fi-6E-Access-Point benötigt laut Datenblatt **22 W**. Welcher PoE-Standard muss der Switchport mindestens unterstützen?`,
      options: ['802.3at (PoE+)', '802.3af (PoE)', '802.3bt Type 4', 'Gar keiner – APs haben immer ein Netzteil'],
      answer: 0,
      distractors: {
        '1': { why: '802.3af liefert am Gerät nur 12,95 W.', error: 'poe-standards' },
        '2': { why: 'Type 4 (90 W) würde funktionieren, ist aber nicht das Minimum.', error: 'poe-standards' },
        '3': { why: 'Business-APs werden fast immer per PoE versorgt.', error: 'poe-standards' },
      },
      explanation: `22 W liegen über den 12,95 W von 802.3af, aber unter den **25,5 W am Gerät** von **802.3at (PoE+)**. PoE+ ist also das Minimum.`,
    },
    {
      id: 'm12-q031',
      kind: 'text',
      skill: 'ethernet.poe',
      difficulty: 1,
      prompt: `Welcher IEEE-Standard wird als **PoE+** bezeichnet? (Format: 802.3xx)`,
      accept: ['802.3at', 'IEEE 802.3at', '8023at'],
      placeholder: '802.3…',
      explanation: `PoE+ = **IEEE 802.3at** (30 W am PSE).`,
    },
    // ---------- cabling.structured ----------
    {
      id: 'm12-q032',
      kind: 'order',
      skill: 'cabling.structured',
      difficulty: 1,
      prompt: `Bringe die Verteiler der strukturierten Verkabelung in die hierarchische Reihenfolge – **vom Gelände bis zum Arbeitsplatz**.`,
      items: ['Standortverteiler (SV)', 'Gebäudeverteiler (GV)', 'Etagenverteiler (EV)', 'Anschlussdose (TA)'],
      explanation: `SV →(Primär) GV →(Sekundär) EV →(Tertiär) TA.`,
    },
    {
      id: 'm12-q033',
      kind: 'table',
      skill: 'cabling.structured',
      difficulty: 2,
      prompt: `Vervollständige die Tabelle zur strukturierten Verkabelung (maximale Länge in Metern, typisches Medium).`,
      columns: [
        { key: 'bereich', label: 'Bereich', type: 'text' },
        { key: 'laenge', label: 'max. Länge (m)', type: 'number' },
        { key: 'medium', label: 'typisches Medium', type: 'text' },
      ],
      rows: [
        { cells: { bereich: { given: 'Primärbereich' }, laenge: { answer: '1500' }, medium: { answer: 'Singlemode', accept: ['Singlemode', 'Glasfaser', 'LWL', 'Singlemode-Glasfaser', 'SM', 'Monomode'] } } },
        { cells: { bereich: { given: 'Sekundärbereich' }, laenge: { answer: '500' }, medium: { answer: 'Multimode', accept: ['Multimode', 'Glasfaser', 'LWL', 'Multimode-Glasfaser', 'MM'] } } },
        { cells: { bereich: { given: 'Tertiärbereich (fest verlegt)' }, laenge: { answer: '90' }, medium: { answer: 'Twisted Pair', accept: ['Twisted Pair', 'Kupfer', 'TP', 'Cat 6A', 'Cat6A', 'Cat 7', 'Twisted-Pair'] } } },
      ],
      hints: ['Primär = Gelände, Sekundär = Gebäude, Tertiär = Etage.'],
      explanation: `Primär: 1500 m, meist Singlemode-LWL. Sekundär: 500 m, meist Multimode-LWL. Tertiär: 90 m fest + 10 m Patch, Twisted Pair.`,
    },
    {
      id: 'm12-q034',
      kind: 'number',
      skill: 'cabling.structured',
      difficulty: 1,
      prompt: `Wie lang darf im **Tertiärbereich** das **fest verlegte** Kabel (Permanent Link) maximal sein? (in m)`,
      answer: 90,
      unit: 'm',
      explanation: `**90 m** Permanent Link + max. 10 m Patch-/Anschlusskabel = 100 m Channel.`,
    },
    {
      id: 'm12-q035',
      kind: 'free',
      skill: 'cabling.structured',
      difficulty: 3,
      prompt: `**Handlungssituation:** Elektro Krämer erweitert den Standort Hannover um ein zweites, dreigeschossiges Gebäude (Abstand zum Hauptgebäude 300 m). Sie sollen die Verkabelung nach dem Prinzip der strukturierten Verkabelung skizzieren.

Beschreiben Sie, welche Bereiche entstehen, welche Medien Sie jeweils einsetzen und begründen Sie Ihre Wahl.`,
      modelAnswer: `**Primärbereich** (Standortverteiler im Hauptgebäude ↔ Gebäudeverteiler im Neubau, 300 m): **Glasfaser, vorzugsweise Singlemode (OS2)** – Entfernung > 100 m, galvanische Trennung zwischen den Gebäuden, EMV-unempfindlich, Reserve für künftige Datenraten. Am besten mit redundanter Faserführung bzw. Faserreserve.
**Sekundärbereich** (Gebäudeverteiler ↔ Etagenverteiler in den drei Geschossen): **Glasfaser Multimode (OM4)** oder ebenfalls Singlemode – hohe Datenraten für Uplinks (10 Gbit/s und mehr), Steigbereich.
**Tertiärbereich** (Etagenverteiler ↔ Anschlussdosen): **Twisted Pair Cat 6A** (z. B. S/FTP-Verlegekabel), max. 90 m fest verlegt + 10 m Patchkabel – kostengünstig, RJ45 an allen Endgeräten, **PoE** für Access Points, Telefone, Kameras, 10GBASE-T möglich.
Zusätzlich: Patchpanels in den Verteilern, einheitliche Beschriftung, Dokumentation und Abnahmemessung.`,
      keywords: ['Primärbereich', 'Sekundärbereich', 'Tertiärbereich', 'Singlemode', 'Multimode', 'Cat 6A', '90 m', 'PoE', 'galvanische Trennung'],
      hints: ['Gehe von außen nach innen: Gelände – Gebäude – Etage.', 'Begründe die Medienwahl mit Entfernung, Störfestigkeit und PoE.'],
      explanation: `Eine gute Antwort benennt alle drei Bereiche, wählt passende Medien und begründet sie fachlich (Reichweite, galvanische Trennung, PoE, Kosten).`,
    },
    // ---------- wlan.standards ----------
    {
      id: 'm12-q036',
      kind: 'single',
      skill: 'wlan.standards',
      difficulty: 1,
      prompt: `Was kennzeichnet **Wi-Fi 6E** gegenüber Wi-Fi 6?`,
      options: [
        'Zusätzliche Nutzung des 6-GHz-Bands',
        'Doppelte Reichweite im 2,4-GHz-Band',
        'Ein neuer IEEE-Standard 802.11be',
        'Wegfall der Verschlüsselung',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Das „E“ steht für Extended – erweitert um ein neues Frequenzband.', error: 'wifi-generationen' },
        '2': { why: '802.11be ist Wi-Fi 7. Wi-Fi 6E basiert weiterhin auf 802.11ax.', error: 'wifi-generationen' },
        '3': { why: 'Im 6-GHz-Band ist WPA3 sogar Pflicht.', error: 'wifi-generationen' },
      },
      explanation: `Wi-Fi 6E = 802.11ax mit Zugang zum **6-GHz-Band** (in Europa 5945–6425 MHz): viele zusätzliche, störungsarme Kanäle.`,
    },
    {
      id: 'm12-q037',
      kind: 'single',
      skill: 'wlan.standards',
      difficulty: 2,
      prompt: `Welcher WLAN-Standard arbeitet **ausschließlich im 5-GHz-Band**?`,
      options: ['802.11ac (Wi-Fi 5)', '802.11n (Wi-Fi 4)', '802.11g', '802.11ax (Wi-Fi 6)'],
      answer: 0,
      distractors: {
        '1': { why: '802.11n nutzt 2,4 und 5 GHz.', error: 'wlan-standard-band' },
        '2': { why: '802.11g arbeitet im 2,4-GHz-Band.', error: 'wlan-standard-band' },
        '3': { why: 'Wi-Fi 6 nutzt 2,4 und 5 GHz (6E zusätzlich 6 GHz).', error: 'wlan-standard-band' },
      },
      explanation: `**802.11ac** ist nur für 5 GHz definiert. Dual-Band-Geräte mit „ac“ nutzen im 2,4-GHz-Band 802.11n.`,
    },
    {
      id: 'm12-q038',
      kind: 'multi',
      skill: 'wlan.standards',
      difficulty: 3,
      prompt: `Welche Technologien wurden mit **Wi-Fi 6 (802.11ax)** eingeführt bzw. maßgeblich erweitert? (Mehrere Antworten)`,
      options: ['OFDMA', 'BSS Coloring', 'Target Wake Time (TWT)', '320-MHz-Kanäle', 'Multi-Link Operation (MLO)'],
      answer: [0, 1, 2],
      hints: ['Zwei der Optionen gehören zu Wi-Fi 7.'],
      explanation: `Wi-Fi 6: **OFDMA** (mehrere Clients gleichzeitig in Teilkanälen), **BSS Coloring** (bessere Unterscheidung benachbarter Zellen), **TWT** (Energiesparen). 320-MHz-Kanäle und MLO kamen mit **Wi-Fi 7**.`,
    },
    {
      id: 'm12-q039',
      kind: 'single',
      skill: 'wlan.standards',
      difficulty: 2,
      prompt: `Ein Notebook zeigt eine WLAN-Verbindung mit **1200 Mbit/s** an. Der Nutzer misst beim Kopieren aber nur rund 400–500 Mbit/s. Was ist die beste Erklärung?`,
      options: [
        'Angezeigt wird die Brutto-Linkrate; WLAN ist ein geteiltes Halbduplex-Medium mit hohem Protokoll-Overhead.',
        'Das Notebook ist defekt.',
        'WLAN überträgt grundsätzlich nur in Byte statt in Bit.',
        'Der Access Point hat eine falsche IP-Adresse.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Ein Nettodurchsatz deutlich unter der Linkrate ist bei WLAN normal.', error: 'brutto-netto' },
        '2': { why: 'Die Einheiten sind korrekt angegeben.', error: 'bit-byte-verwechslung' },
        '3': { why: 'Eine falsche IP-Adresse würde gar keine Verbindung ins Netz ermöglichen.', error: 'brutto-netto' },
      },
      explanation: `Die Linkrate ist ein **Bruttowert**. Wartezeiten (CSMA/CA), Bestätigungen (ACK), Header und das geteilte Medium reduzieren den **Nettodurchsatz** oft auf die Hälfte oder weniger.`,
    },
    // ---------- wlan.bands ----------
    {
      id: 'm12-q040',
      kind: 'single',
      skill: 'wlan.bands',
      difficulty: 2,
      prompt: `**Handlungssituation:** Drei benachbarte Access Points im 2,4-GHz-Band senden auf den Kanälen **1, 3 und 6**. Was ist das Problem und wie lautet die bessere Kanalwahl?`,
      options: [
        'Kanal 3 überlappt mit 1 und 6 – besser 1, 6, 11',
        'Kein Problem – unterschiedliche Kanäle stören sich nie',
        'Alle APs sollten auf Kanal 6 senden',
        'Besser 1, 2, 3, weil benachbarte Kanäle schneller sind',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Im 2,4-GHz-Band überlappen Kanäle mit weniger als 5 Nummern Abstand.', error: 'kanalueberlappung' },
        '2': { why: 'Gleicher Kanal für alle bedeutet, dass sich alle Zellen ein Medium teilen – nicht optimal.', error: 'kanalueberlappung' },
        '3': { why: 'Direkt benachbarte Kanäle überlappen am stärksten.', error: 'kanalueberlappung' },
      },
      explanation: `Die Kanäle liegen 5 MHz auseinander, sind aber ca. 20 MHz breit. Kanal 3 überlappt mit 1 und 6 → unkoordinierte Störungen. Überlappungsfrei sind **1, 6, 11**.`,
    },
    {
      id: 'm12-q041',
      kind: 'multi',
      skill: 'wlan.bands',
      difficulty: 2,
      prompt: `Welche Aussagen zum **5-GHz-Band** im Vergleich zum 2,4-GHz-Band sind richtig? (Mehrere Antworten)`,
      options: [
        'Mehr überlappungsfreie Kanäle',
        'Weniger Störungen durch Bluetooth und Mikrowellen',
        'Geringere Reichweite und schlechtere Wanddurchdringung',
        'Für einige Kanäle ist DFS (Radarerkennung) vorgeschrieben',
        'Wird von 802.11b-Geräten unterstützt',
      ],
      answer: [0, 1, 2, 3],
      explanation: `5 GHz: viele überlappungsfreie Kanäle, weniger Störer, aber höhere Dämpfung (geringere Reichweite); ab Kanal 52 ist DFS Pflicht. 802.11b arbeitet nur mit 2,4 GHz.`,
    },
    {
      id: 'm12-q042',
      kind: 'multi',
      skill: 'wlan.bands',
      difficulty: 1,
      prompt: `Welche Einflüsse können ein WLAN im **2,4-GHz-Band** stören oder dämpfen? (Mehrere Antworten)`,
      options: ['Mikrowellengerät', 'Bluetooth-Geräte', 'Stahlbetonwände', 'Benachbarte WLANs', 'Glasfaserkabel in der Wand'],
      answer: [0, 1, 2, 3],
      explanation: `Mikrowellen und Bluetooth senden im selben Band, Nachbar-WLANs belegen Kanäle, Stahlbeton dämpft stark. Glasfaser erzeugt keine Funkstörungen.`,
    },
    // ---------- wlan.operation ----------
    {
      id: 'm12-q043',
      kind: 'single',
      skill: 'wlan.operation',
      difficulty: 1,
      prompt: `Was ist die **SSID**?`,
      options: [
        'Der Name eines WLANs',
        'Die MAC-Adresse des Access Points',
        'Das WLAN-Passwort',
        'Die Kanalnummer',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Die MAC-Adresse der AP-Funkzelle heißt BSSID.', error: 'ssid-bssid' },
        '2': { why: 'Das Passwort (Pre-Shared Key) ist etwas anderes.', error: 'ssid-bssid' },
        '3': { why: 'Der Kanal ist eine Funkeinstellung, keine Kennung.', error: 'ssid-bssid' },
      },
      explanation: `SSID = **Service Set Identifier**, der Netzwerkname (max. 32 Byte). Die BSSID ist die MAC-Adresse der jeweiligen Funkzelle.`,
    },
    {
      id: 'm12-q044',
      kind: 'match',
      skill: 'wlan.operation',
      difficulty: 2,
      prompt: `Ordne den Begriff der passenden Beschreibung zu.`,
      left: ['Infrastrukturmodus', 'Ad-hoc-Modus', 'ESS', 'Roaming'],
      right: [
        'Clients kommunizieren über einen Access Point',
        'Clients kommunizieren direkt ohne Access Point',
        'Mehrere APs mit derselben SSID bilden ein WLAN',
        'Wechsel eines Clients zwischen Funkzellen ohne Verbindungsabbruch',
      ],
      answer: [0, 1, 2, 3],
      explanation: `Infrastruktur = über AP, Ad-hoc = direkt, ESS = Verbund mehrerer APs mit gleicher SSID, Roaming = Zellwechsel im ESS.`,
    },
    {
      id: 'm12-q045',
      kind: 'multi',
      skill: 'wlan.operation',
      difficulty: 2,
      prompt: `Welche Voraussetzungen sind für **unterbrechungsfreies Roaming** zwischen Access Points wichtig? (Mehrere Antworten)`,
      options: [
        'Gleiche SSID auf allen APs',
        'Gleiche Sicherheitseinstellungen (z. B. WPA2-Enterprise)',
        'Überlappende Funkzellen',
        'Gleiches VLAN/IP-Netz für die SSID',
        'Alle APs auf demselben Kanal',
      ],
      answer: [0, 1, 2, 3],
      hints: ['Was passiert, wenn benachbarte APs denselben Kanal nutzen?'],
      explanation: `Für Roaming braucht es gleiche SSID, gleiche Sicherheit, überlappende Zellen und idealerweise dasselbe VLAN (Client behält seine IP). Benachbarte APs sollten **unterschiedliche**, überlappungsfreie Kanäle nutzen.`,
    },
    {
      id: 'm12-q046',
      kind: 'order',
      skill: 'wlan.operation',
      difficulty: 2,
      prompt: `Bringe den Ablauf von **CSMA/CA** (ohne RTS/CTS) in die richtige Reihenfolge.`,
      items: [
        'Medium abhören (Carrier Sense)',
        'Feste Wartezeit (DIFS) abwarten',
        'Zufällige Backoff-Zeit abwarten',
        'Frame senden',
        'Auf ACK des Empfängers warten',
      ],
      explanation: `Lauschen → DIFS → zufälliger Backoff → senden → ACK abwarten. Kommt kein ACK, wird der Frame erneut gesendet.`,
    },
    {
      id: 'm12-q047',
      kind: 'single',
      skill: 'wlan.operation',
      difficulty: 3,
      prompt: `Was beschreibt das **Hidden-Station-Problem** und womit wird es entschärft?`,
      options: [
        'Zwei Clients erreichen den AP, hören sich aber gegenseitig nicht – RTS/CTS',
        'Ein AP sendet keine SSID – SSID-Broadcast aktivieren',
        'Ein Client ist nicht im DHCP eingetragen – feste IP vergeben',
        'Ein AP ist hinter einer Firewall versteckt – Port 443 freigeben',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Eine versteckte SSID hat mit dem Medienzugriff nichts zu tun.', error: 'hidden-station' },
        '2': { why: 'IP-Vergabe ist Schicht 3 und hat nichts mit Funkkollisionen zu tun.', error: 'hidden-station' },
        '3': { why: 'Firewall-Regeln betreffen nicht den Funkzugriff.', error: 'hidden-station' },
      },
      explanation: `Zwei Clients können beide den AP erreichen, sich aber z. B. wegen einer Wand nicht hören – sie senden gleichzeitig und kollidieren am AP. Mit **RTS/CTS** reserviert ein Client das Medium; das CTS des APs hören alle Clients der Zelle.`,
    },
    {
      id: 'm12-q048',
      kind: 'free',
      skill: 'wlan.operation',
      difficulty: 2,
      prompt: `Erläutern Sie den Unterschied zwischen **CSMA/CD** und **CSMA/CA** und begründen Sie, warum im WLAN CSMA/CA eingesetzt wird.`,
      modelAnswer: `**CSMA/CD** (Collision Detection) wird bei kabelgebundenem Ethernet im **Halbduplex** (Bus, Hub) verwendet: Station hört das Medium ab, sendet, wenn es frei ist, und **erkennt Kollisionen während des Sendens**; bei einer Kollision sendet sie ein Jam-Signal, wartet eine zufällige Zeit und versucht es erneut.
**CSMA/CA** (Collision Avoidance) wird im **WLAN** verwendet: Kollisionen sollen **vermieden** werden. Die Station hört das Medium ab, wartet eine feste Zeit (DIFS) plus eine zufällige Backoff-Zeit, sendet dann, und der Empfänger bestätigt jeden Frame mit einem **ACK**. Optional reserviert **RTS/CTS** das Medium.
Begründung: Eine Funkstation kann beim Senden nicht gleichzeitig zuverlässig empfangen (eigenes Signal überdeckt andere), und durch das **Hidden-Station-Problem** hören sich manche Stationen gar nicht. Kollisionen lassen sich daher nicht erkennen – nur vermeiden.`,
      keywords: ['Collision Detection', 'Collision Avoidance', 'Halbduplex', 'Backoff', 'ACK', 'RTS/CTS', 'Hidden Station', 'nicht gleichzeitig senden und empfangen'],
      hints: ['D = Detection, A = Avoidance.', 'Warum kann eine Funkstation Kollisionen nicht erkennen?'],
      explanation: `Wichtig sind der Unterschied Erkennen vs. Vermeiden, die Mechanismen (Backoff, ACK, RTS/CTS) und die physikalische Begründung für WLAN.`,
    },
    {
      id: 'm12-q049', kind: 'single', skill: 'cabling.media', difficulty: 2,
      prompt: `Ein Kunde möchte sein Homeoffice im Dachgeschoss per **PowerLAN** anbinden. Der Adapter verspricht „bis 2400 Mbit/s“. Welche Aussage ist richtig?`,
      options: [
        'Die Angabe ist ein Bruttowert; alle Adapter im Stromnetz teilen sich die Datenrate, real ist oft nur ein Bruchteil erreichbar.',
        'PowerLAN ist der empfohlene Standard für die Verkabelung von Firmengebäuden.',
        'PowerLAN funktioniert problemlos auch über verschiedene Stromzähler hinweg zum Nachbarn.',
        'Eine Verschlüsselung ist nicht nötig, weil die Daten im Stromkabel nicht abgehört werden können.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Für Firmengebäude bleibt die strukturierte Verkabelung der Standard – PowerLAN ist eine Notlösung.', error: 'medien-auswahl' },
        '2': { why: 'Über verschiedene Stromzähler hinweg funktioniert PowerLAN in der Regel nicht.', error: 'medien-auswahl' },
        '3': { why: 'Andere Adapter im selben Stromnetz könnten mithören – die Adapter müssen verschlüsselt gekoppelt werden.', error: 'medien-auswahl' },
      },
      explanation: `PowerLAN nutzt die Stromleitung als **geteiltes Medium**. Werbeangaben sind Bruttowerte; Störungen (Netzteile, Motoren, Filter in Steckdosenleisten) senken die Rate weiter.`,
    },
    {
      id: 'm12-q050', kind: 'single', skill: 'cabling.media', difficulty: 1,
      prompt: `Ein Kunde bekommt Internet über den **Anschluss des Kabelfernsehens**. Welcher Standard und welches Gerät gehören dazu?`,
      options: ['DOCSIS mit Kabelmodem am Koaxialanschluss', 'VDSL2 mit DSL-Modem an der Telefonleitung', 'FTTH mit Glasfasermodem (ONT)', 'LTE mit Mobilfunkrouter'],
      answer: 0,
      distractors: {
        '1': { why: 'VDSL2 läuft über die Kupfer-Telefonleitung, nicht über das TV-Kabelnetz.', error: 'medien-auswahl' },
        '2': { why: 'FTTH nutzt eine Glasfaser bis ins Gebäude, nicht das Koaxialkabel.', error: 'medien-auswahl' },
        '3': { why: 'LTE ist Funk und braucht keinen Kabelanschluss.', error: 'medien-auswahl' },
      },
      explanation: `Internet über das TV-Kabelnetz nutzt **DOCSIS** (z. B. DOCSIS 3.1 mit rund 1 Gbit/s Download). Beim Kunden steht ein **Kabelmodem**. Alle Haushalte eines Segments teilen sich die Kapazität.`,
    },
    {
      id: 'm12-q051', kind: 'single', skill: 'cabling.categories', difficulty: 2,
      prompt: `Was ist der Unterschied zwischen **Kategorie** (Cat) und **Klasse** bei der Netzwerkverkabelung?`,
      options: [
        'Die Kategorie gilt für einzelne Bauteile (Kabel, Dose, Patchfeld), die Klasse für die fertig installierte Strecke.',
        'Die Klasse gilt für einzelne Bauteile, die Kategorie für die fertig installierte Strecke.',
        'Beide Begriffe bedeuten dasselbe.',
        'Die Kategorie gibt die Schirmung an, die Klasse die Länge des Kabels.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Genau andersherum: Bauteile haben eine Kategorie, die gemessene Strecke eine Klasse.', error: 'kategorie-klasse' },
        '2': { why: 'Die Begriffe werden oft verwechselt, meinen aber Verschiedenes.', error: 'kategorie-klasse' },
        '3': { why: 'Die Schirmung steht im Kürzel wie U/FTP, nicht in Kategorie oder Klasse.', error: 'kategorie-klasse' },
      },
      explanation: `**Kategorie** = Bauteil (steht im Datenblatt). **Klasse** = installierte Strecke; ob sie erreicht wird, zeigt erst die Messung nach der Verlegung.`,
    },
    {
      id: 'm12-q052', kind: 'single', skill: 'cabling.categories', difficulty: 2,
      prompt: `Eine Strecke wird komplett aus **Cat-6A-Bauteilen** aufgebaut und sauber verarbeitet. Welche **Klasse** soll sie bei der Abnahmemessung erreichen?`,
      options: ['Klasse EA (500 MHz)', 'Klasse D (100 MHz)', 'Klasse E (250 MHz)', 'Klasse F (600 MHz)'],
      answer: 0,
      distractors: {
        '1': { why: 'Klasse D gehört zu Cat 5e.', error: 'kategorie-klasse' },
        '2': { why: 'Klasse E gehört zu Cat 6 (250 MHz).', error: 'kategorie-klasse' },
        '3': { why: 'Klasse F gehört zu Cat 7 (600 MHz).', error: 'kategorie-klasse' },
      },
      explanation: `Cat 5e → D, Cat 6 → E, **Cat 6A → EA (500 MHz)**, Cat 7 → F, Cat 7A → FA.`,
    },
    {
      id: 'm12-q053', kind: 'single', skill: 'cabling.categories', difficulty: 3,
      prompt: `Eine neu verlegte Strecke aus lauter Cat-6A-Bauteilen **besteht die Messung für Klasse EA nicht**. Was ist die wahrscheinlichste Ursache?`,
      options: [
        'Verarbeitungsfehler, z. B. zu weit aufgedrehte Adernpaare an der Dose oder zu enge Biegeradien',
        'Cat-6A-Bauteile können grundsätzlich nur Klasse D erreichen',
        'Die Strecke ist kürzer als 90 m',
        'Das Messgerät misst nur Glasfaser',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Cat-6A-Bauteile sind für Klasse EA gebaut – wenn sie richtig verarbeitet werden.', error: 'kategorie-klasse' },
        '2': { why: 'Kürzer als 90 m ist erlaubt; problematisch wäre eine zu lange Strecke.', error: 'kategorie-laengen' },
        '3': { why: 'Für Kupferstrecken gibt es eigene Messgeräte (Zertifizierer).', error: 'kategorie-klasse' },
      },
      explanation: `Die Klasse erreicht eine Strecke nur, wenn **alle Bauteile passen und sauber verarbeitet** sind. Aufgedrehte Paare, Knicke oder ein nicht aufgelegter Schirm verschlechtern die Werte.`,
    },
  ],
};
