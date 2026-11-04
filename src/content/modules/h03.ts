import type { Module } from '../types';

export const h03: Module = {
  id: 'h03',
  nr: 3,
  area: 'hardware',
  title: 'Schnittstellen & Peripherie',
  short: `USB und Thunderbolt mit korrekten Namen und Datenraten, HDMI/DisplayPort, Monitore (Panel, Auflösung, ppi), Bildspeicher, Drucker, Scanner und Eingabegeräte.`,
  icon: 'Usb',
  relevance: 'ap1',
  prerequisites: ['h01'],
  generators: ['hw.ppi', 'hw.bildspeicher', 'hw.seitenkosten'],
  skills: [
    { id: 'hw.io.usb', module: 'h03', title: 'USB: Versionen, Namen, Datenraten, Stecker' },
    { id: 'hw.io.dock', module: 'h03', title: 'Thunderbolt, USB Power Delivery und Dockingstationen', requires: ['hw.io.usb'] },
    { id: 'hw.io.video', module: 'h03', title: 'Videoschnittstellen: HDMI, DisplayPort, DVI, VGA' },
    { id: 'hw.display.tech', module: 'h03', title: 'Monitore: Auflösung, Seitenverhältnis, Paneltechnik, Kenngrößen' },
    { id: 'hw.display.ppi', module: 'h03', title: 'Pixeldichte (ppi) berechnen', requires: ['hw.display.tech'] },
    { id: 'hw.display.imagesize', module: 'h03', title: 'Bildspeicher und Videodatenrate berechnen', requires: ['hw.display.tech'] },
    { id: 'hw.io.printer', module: 'h03', title: 'Drucker und Scanner auswählen, Druckkosten berechnen' },
    { id: 'hw.io.input', module: 'h03', title: 'Eingabegeräte und weitere Peripherie' },
  ],
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'h03-l01',
      title: 'USB: Versionen, Namen, Datenraten und Stecker',
      minutes: 20,
      relevance: 'ap1',
      skills: ['hw.io.usb'],
      steps: [
        {
          type: 'explain',
          title: 'Ordnung im USB-Namenschaos',
          body: `**USB (Universal Serial Bus)** ist die Standardschnittstelle für Peripherie. Die Namen wurden mehrfach umbenannt – in Datenblättern findest du alte und neue Bezeichnungen. Maßgeblich ist das **USB Implementers Forum (USB-IF)**:

| Spezifikation | frühere Namen | Bezeichnung für Verbraucher (USB-IF, aktuell) | Datenrate |
|---|---|---|---|
| USB 1.1 | – | Low Speed / Full Speed | 1,5 / 12 Mbit/s |
| USB 2.0 | – | **Hi-Speed USB** | 480 Mbit/s |
| **USB 3.2 Gen 1** | USB 3.0, USB 3.1 Gen 1 | **USB 5Gbps** (früher „SuperSpeed USB“) | 5 Gbit/s |
| **USB 3.2 Gen 2** | USB 3.1 Gen 2 | **USB 10Gbps** | 10 Gbit/s |
| **USB 3.2 Gen 2x2** | – | **USB 20Gbps** (nur mit USB-C) | 20 Gbit/s |
| **USB4** (Version 1.0) | – | **USB 20Gbps** / **USB 40Gbps** | 20 / 40 Gbit/s |
| **USB4 Version 2.0** | – | **USB 80Gbps** | 80 Gbit/s (asymmetrisch bis 120 Gbit/s in eine Richtung) |

**Wichtig – Stecker ≠ Geschwindigkeit!**
- **USB-A**: der klassische flache Stecker am PC.
- **USB-B / Micro-B**: Drucker, ältere Geräte, alte Smartphones.
- **USB-C (USB Type-C)**: 24-poliger, **verdrehsicherer Stecker**. Über USB-C kann USB 2.0 mit 480 Mbit/s genauso laufen wie USB4 mit 40 Gbit/s – oder DisplayPort, Thunderbolt und Laden mit bis zu 240 W. **USB-C ist ein Steckertyp, keine USB-Version.**

**Weitere Merkmale:**
- **Abwärtskompatibel**: Ein USB-10Gbps-Stick läuft am USB-2.0-Port – aber nur mit 480 Mbit/s. Es gilt das langsamste Glied: Port, Kabel oder Gerät.
- **Hot-Plug**: Geräte im laufenden Betrieb anschließen.
- **Strom**: USB 2.0 liefert 5 V / 500 mA (2,5 W), USB 3.x 5 V / 900 mA (4,5 W), USB-C bis 5 V / 3 A (15 W) – mehr nur mit **USB Power Delivery** (nächste Lektion).
- **Kabel**: Das Kabel muss die Rate unterstützen. Neue USB-IF-Logos auf Kabel und Verpackung nennen Datenrate und Ladeleistung, z. B. „USB 40Gbps · 240W“.
- **Netto-Datenrate**: Durch Leitungscodierung und Protokoll liegt die Nutzrate darunter. Faustwerte: USB 5Gbps ≈ 400–450 MB/s, USB 10Gbps ≈ 900–1.000 MB/s.`,
        },
        {
          type: 'visual',
          title: 'Stecker und Datenrate sind zwei Paar Schuhe',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'USB-A', text: 'Klassischer Stecker – kann USB 2.0 (480 Mbit/s) bis USB 10Gbps.', icon: 'Usb' },
                { title: 'USB-C', text: 'Verdrehsicherer Stecker – von USB 2.0 bis USB4/Thunderbolt, dazu DisplayPort und Laden bis 240 W.', icon: 'Cable' },
                { title: 'Langsamstes Glied', text: 'Port, Kabel und Gerät müssen die Rate können. Sonst gilt die kleinste gemeinsame Version.', icon: 'Gauge' },
              ],
            },
          },
          caption: 'Prüfungsfalle: „USB-C mit 10 Gbit/s“ beschreibt Stecker UND Datenrate – „USB-C“ allein sagt nichts über die Geschwindigkeit.',
        },
        {
          type: 'example',
          title: 'Beispiel: Wie lange dauert die Datensicherung auf die externe SSD?',
          problem: `Ein Mitarbeiter sichert **120 GB** auf eine externe SSD. Die SSD unterstützt **USB 10Gbps**, der Notebook-Port aber nur **USB 5Gbps**. Real werden etwa **80 %** der Bruttorate als Nutzdaten erreicht. Wie lange dauert die Sicherung mindestens (1 GB = 10⁹ Byte)?`,
          steps: [
            { label: 'Limit', body: 'Es gilt das langsamste Glied: **5 Gbit/s**.' },
            { label: 'Nutzrate', body: '5 Gbit/s · 0,8 = 4 Gbit/s = 4.000 Mbit/s = **500 MB/s**' },
            { label: 'Datenmenge', body: '120 GB = 120.000 MB' },
            { label: 'Zeit', body: '120.000 MB / 500 MB/s = **240 s = 4 Minuten**' },
          ],
          result: 'ca. 4 Minuten (am USB-10Gbps-Port wäre es etwa die Hälfte).',
        },
        {
          type: 'check',
          question: {
            id: 'h03-c01', kind: 'single', skill: 'hw.io.usb', difficulty: 1,
            prompt: `Was beschreibt die Angabe **„USB-C“**?`,
            options: ['Die Datenrate 10 Gbit/s', 'Einen verdrehsicheren Steckertyp – die Datenrate hängt von der unterstützten USB-Version ab', 'Die Version USB 3.0', 'Ausschließlich einen Ladeanschluss'],
            answer: 1,
            distractors: {
              '0': { why: 'USB-C kann von 480 Mbit/s bis 80 Gbit/s alles bedeuten.', error: 'usb-c-stecker' },
              '2': { why: 'USB-C ist ein Stecker, keine Version. USB 3.0 heißt heute USB 3.2 Gen 1 (USB 5Gbps).', error: 'usb-c-stecker' },
              '3': { why: 'USB-C überträgt Daten, Video und Strom.', error: 'usb-c-stecker' },
            },
            explanation: 'USB-C = Steckerform (USB Type-C). Geschwindigkeit und Funktionen stehen in der Spezifikation des Ports/Kabels.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'h03-c02', kind: 'text', skill: 'hw.io.usb', difficulty: 2,
            prompt: `Wie lautet die aktuelle **Spezifikationsbezeichnung** (Form „USB 3.2 Gen …“) für die frühere Version **USB 3.0** mit 5 Gbit/s?`,
            accept: ['USB 3.2 Gen 1', 'USB3.2 Gen1', 'USB 3.2 Gen1', 'Gen 1', 'Gen1'],
            explanation: 'USB 3.0 = USB 3.1 Gen 1 = **USB 3.2 Gen 1** = Marketingname „USB 5Gbps“.',
          },
        },
        { type: 'practice', title: 'Übung: USB', questionIds: ['h03-q001', 'h03-q002', 'h03-q003', 'h03-q004'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'USB 2.0 = 480 Mbit/s; USB 3.2 Gen 1/2/2x2 = 5/10/20 Gbit/s; USB4 = 20/40, USB4 v2 = 80 Gbit/s.',
            'Verbrauchernamen: USB 5Gbps, 10Gbps, 20Gbps, 40Gbps, 80Gbps.',
            'USB-C ist ein Stecker, keine Version.',
            'Langsamstes Glied (Port, Kabel, Gerät) bestimmt die Rate.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'h03-l02',
      title: 'Thunderbolt, USB Power Delivery und Dockingstationen',
      minutes: 15,
      relevance: 'ap1',
      skills: ['hw.io.dock'],
      steps: [
        {
          type: 'explain',
          title: 'Ein Kabel für alles',
          body: `Moderne Notebook-Arbeitsplätze nutzen **ein USB-C-Kabel** zur Dockingstation: Strom, Monitore, Netzwerk, Tastatur und Maus.

**Thunderbolt** (Intel, mit USB-C-Stecker):

| Version | Datenrate | Besonderheiten |
|---|---|---|
| Thunderbolt 3 | 40 Gbit/s | PCIe- und DisplayPort-Tunneling |
| **Thunderbolt 4** | 40 Gbit/s | auf Basis von USB4; garantierte Mindestanforderungen (z. B. zwei 4K-Monitore, PCIe-Tunnel mit 32 Gbit/s, Laden des Notebooks) |
| **Thunderbolt 5** | 80 Gbit/s (mit „Bandwidth Boost“ bis 120 Gbit/s in eine Richtung) | auf Basis von USB4 Version 2.0; höhere Ladeleistungen |

Thunderbolt-Ports sind mit einem **Blitzsymbol** gekennzeichnet und können auch normale USB-Geräte betreiben.

**USB Power Delivery (USB PD)** – Gerät und Netzteil handeln Spannung und Strom aus:

| Modus | Spannungen | max. Leistung |
|---|---|---|
| USB-C ohne PD | 5 V | bis 15 W (3 A) |
| USB PD (SPR, Standard Power Range) | 5, 9, 15, 20 V | **bis 100 W** (20 V · 5 A, dafür ist ein 5-A-Kabel mit E-Marker nötig) |
| USB PD 3.1 (EPR, Extended Power Range) | zusätzlich 28, 36, **48 V** | **bis 240 W** (48 V · 5 A) |

Rechnung wie immer: **P = U · I** → 20 V · 3 A = 60 W.

**DisplayPort Alternate Mode (DP Alt Mode)**: Über USB-C wird ein natives DisplayPort-Signal übertragen → Monitor per USB-C-Kabel oder Adapter anschließen. Nicht jeder USB-C-Port kann das (Datenblatt: DP-Symbol bzw. „DisplayPort 1.4 über USB-C“).

**Dockingstation auswählen – Checkliste:**
1. **Anschluss** passend zum Notebook (Thunderbolt 4/5, USB4 oder USB-C mit DP Alt Mode)?
2. **Ladeleistung** ≥ Bedarf des Notebooks (z. B. 90 W)?
3. **Monitore**: Anzahl, Auflösung, Bildwiederholrate (MST über DisplayPort; DisplayLink-Docks brauchen Treiber)?
4. **Anschlüsse**: LAN (z. B. 2,5 GbE), USB-A für Tastatur/Maus/Headset, Audio.
5. **Kompatibilität und Verwaltung** (Firmware-Updates, Hersteller-Docks mit MAC-Adress-Durchreichung für Netzwerkzugangskontrolle).`,
        },
        {
          type: 'visual',
          title: 'Notebook-Arbeitsplatz mit Dockingstation',
          widget: {
            kind: 'topology',
            data: {
              nodes: [
                { id: 'nb', type: 'laptop', label: 'Notebook', sub: 'Thunderbolt 4', x: 120, y: 200 },
                { id: 'dock', type: 'switch', label: 'Dockingstation', sub: '100 W PD', x: 360, y: 200 },
                { id: 'm1', type: 'pc', label: 'Monitor 1', sub: 'DP 1.4', x: 600, y: 70 },
                { id: 'm2', type: 'pc', label: 'Monitor 2', sub: 'HDMI 2.0', x: 650, y: 200 },
                { id: 'lan', type: 'switch', label: 'Netzwerkdose', sub: 'RJ45, 1 GbE', x: 600, y: 330 },
                { id: 'kb', type: 'phone', label: 'Tastatur/Maus/Headset', sub: 'USB-A', x: 360, y: 360 },
              ],
              links: [
                { from: 'nb', to: 'dock', label: '1 × USB-C-Kabel', style: 'trunk' },
                { from: 'dock', to: 'm1' },
                { from: 'dock', to: 'm2' },
                { from: 'dock', to: 'lan', style: 'lan' },
                { from: 'dock', to: 'kb' },
              ],
            },
          },
          caption: 'Ein Kabel überträgt Strom (Power Delivery), Bild (DisplayPort-Tunnel), USB-Daten und Netzwerk.',
        },
        {
          type: 'check',
          question: {
            id: 'h03-c03', kind: 'number', skill: 'hw.io.dock', difficulty: 1,
            prompt: `Ein USB-PD-Netzteil liefert **20 V** bei **4,5 A**. Welche Leistung in **Watt** stellt es bereit?`,
            answer: 90, unit: 'W',
            explanation: 'P = U · I = 20 V · 4,5 A = **90 W**.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'h03-c04', kind: 'free', skill: 'hw.io.dock', difficulty: 2,
            prompt: `Für die Vertriebs-Notebooks (Thunderbolt 4, Netzteil 90 W) sollen Dockingstationen beschafft werden. Nenne vier Kriterien, die du prüfst.`,
            modelAnswer: '1. Anschluss/Kompatibilität: Thunderbolt-4- oder USB4-Dock, vom Notebookhersteller unterstützt. 2. Ladeleistung über USB Power Delivery mindestens 90 W. 3. Anzahl und Art der Monitorausgänge (z. B. 2 × DisplayPort/HDMI) mit benötigter Auflösung und Bildwiederholrate. 4. Weitere Anschlüsse: RJ45-LAN, genügend USB-A-Ports für Tastatur, Maus, Headset, Audio. Zusätzlich: Firmware-Updates/Verwaltbarkeit, Preis, Garantie.',
            keywords: ['Thunderbolt', 'Power Delivery', '90 W', 'Monitorausgänge', 'LAN', 'USB-A'],
            explanation: 'Anschluss, Ladeleistung, Monitore, Ports.',
          },
        },
        { type: 'practice', title: 'Übung: Docking und Power Delivery', questionIds: ['h03-q005', 'h03-q006', 'h03-q007'], count: 3, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Thunderbolt 3/4: 40 Gbit/s, Thunderbolt 5: 80 Gbit/s – alle mit USB-C-Stecker.',
            'USB PD: bis 100 W (20 V · 5 A), PD 3.1 EPR bis 240 W (48 V · 5 A).',
            'DP Alt Mode: DisplayPort über USB-C.',
            'Dock: Anschluss, Ladeleistung, Monitore, Ports prüfen.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'h03-l03',
      title: 'Videoschnittstellen: VGA, DVI, HDMI und DisplayPort',
      minutes: 15,
      relevance: 'ap1',
      skills: ['hw.io.video'],
      steps: [
        {
          type: 'explain',
          title: 'Welcher Anschluss schafft welche Auflösung?',
          body: `| Schnittstelle | Signal | max. Datenrate (Version) | typisch möglich | Besonderheiten |
|---|---|---|---|---|
| **VGA** (D-Sub, 15-polig) | **analog** | – | Full HD (mit Qualitätsverlust) | veraltet, nur noch Beamer/Altgeräte |
| **DVI** | DVI-D digital, DVI-I digital + analog | Dual Link ≈ 7,9 Gbit/s | 2560 × 1600 @ 60 Hz | veraltet, kein Ton |
| **HDMI 1.4** | digital | 10,2 Gbit/s | 4K @ 30 Hz | Ton, CEC, HDCP |
| **HDMI 2.0** | digital | 18 Gbit/s | **4K @ 60 Hz** | |
| **HDMI 2.1** | digital | 48 Gbit/s | **4K @ 120 Hz**, 8K @ 60 Hz | VRR, eARC |
| **HDMI 2.2** (2025) | digital | 96 Gbit/s | höhere Auflösungen/Raten | neue Kabel nötig |
| **DisplayPort 1.2** | digital | 21,6 Gbit/s | 4K @ 60 Hz | **MST** (Daisy Chain) |
| **DisplayPort 1.4** | digital | 32,4 Gbit/s | 4K @ 120 Hz, 8K @ 60 Hz mit **DSC** | Standard im Büro/PC-Bereich |
| **DisplayPort 2.1** | digital | bis 80 Gbit/s (UHBR20) | 4K @ 240 Hz, 8K | auch per USB-C (DP Alt Mode) |

**Merke:**
- **HDMI** ist im TV- und Beamer-Bereich verbreitet, **DisplayPort** im PC-/Monitor-Bereich.
- **MST** (Multi-Stream Transport): Mehrere Monitore hintereinander („Daisy Chain“) an einem DisplayPort-Ausgang – der Monitor braucht dafür einen **DP-Ausgang**.
- **DSC** (Display Stream Compression): visuell verlustfreie Kompression, erlaubt höhere Auflösungen über ältere Schnittstellen.
- **HDCP**: Kopierschutz – bei Adaptern/Splittern eine häufige Ursache für schwarze Bildschirme bei Streaming-Inhalten.
- **Adapter**: DP → HDMI ist meist passiv möglich (DP++). Digital → VGA braucht einen **aktiven** Wandler.
- Die Version muss **auf beiden Seiten und beim Kabel** passen – sonst gilt die niedrigste.`,
        },
        {
          type: 'visual',
          title: 'Analog vs. digital',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'VGA', text: 'Analog, kein Ton, veraltet.', icon: 'Monitor' },
                { title: 'DVI', text: 'Digital (DVI-D) bzw. kombiniert (DVI-I), kein Ton, veraltet.', icon: 'Monitor' },
                { title: 'HDMI', text: 'Digital, mit Ton. 2.0: 4K60 · 2.1: 4K120.', icon: 'Monitor' },
                { title: 'DisplayPort', text: 'Digital, mit Ton, MST/Daisy Chain. 1.4: 4K120 · auch über USB-C.', icon: 'Monitor' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Beispiel: Reicht der Anschluss für den neuen Monitor?',
          problem: `Ein Grafiker bekommt einen **4K-Monitor mit 120 Hz**. Sein PC hat einen **HDMI-2.0-** und einen **DisplayPort-1.4**-Ausgang. Welcher Anschluss ist zu verwenden?`,
          steps: [
            { label: 'Anforderung', body: '3840 × 2160 bei 120 Hz.' },
            { label: 'HDMI 2.0', body: 'max. 18 Gbit/s → reicht für 4K @ 60 Hz, **nicht** für 120 Hz.' },
            { label: 'DisplayPort 1.4', body: '32,4 Gbit/s brutto → 4K @ 120 Hz möglich (bei hoher Farbtiefe mit DSC).' },
          ],
          result: 'DisplayPort 1.4 verwenden (mit DP-1.4-zertifiziertem Kabel).',
        },
        {
          type: 'check',
          question: {
            id: 'h03-c05', kind: 'single', skill: 'hw.io.video', difficulty: 1,
            prompt: `Welche Videoschnittstelle überträgt ein **analoges** Signal?`,
            options: ['HDMI', 'DisplayPort', 'VGA', 'DVI-D'],
            answer: 2,
            distractors: {
              '0': { why: 'HDMI ist digital.', error: 'video-analog-digital' },
              '1': { why: 'DisplayPort ist digital.', error: 'video-analog-digital' },
              '3': { why: 'Das „D“ in DVI-D steht für digital.', error: 'video-analog-digital' },
            },
            explanation: 'VGA (D-Sub) ist analog.',
          },
        },
        { type: 'practice', title: 'Übung: Videoschnittstellen', questionIds: ['h03-q008', 'h03-q009', 'h03-q010', 'h03-q011'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'VGA analog; DVI, HDMI, DisplayPort digital.',
            'HDMI 2.0 = 4K60, HDMI 2.1 = 4K120; DP 1.4 = 4K120 (DSC: bis 8K60), DP 2.1 bis 80 Gbit/s.',
            'DP-MST für Daisy Chain; DP Alt Mode über USB-C.',
            'Niedrigste Version (Ausgang, Kabel, Monitor) bestimmt das Maximum.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'h03-l04',
      title: 'Monitore: Auflösung, Seitenverhältnis, Paneltechnik und Kenngrößen',
      minutes: 20,
      relevance: 'ap1',
      skills: ['hw.display.tech'],
      steps: [
        {
          type: 'explain',
          title: 'Das Monitor-Datenblatt verstehen',
          body: `**Auflösungen und Seitenverhältnisse:**

| Bezeichnung | Pixel | Seitenverhältnis |
|---|---|---|
| HD | 1280 × 720 | 16:9 |
| **Full HD (FHD)** | 1920 × 1080 | 16:9 |
| **WUXGA** | 1920 × 1200 | 16:10 (mehr Höhe → gut für Office) |
| **WQHD** | 2560 × 1440 | 16:9 |
| UWQHD | 3440 × 1440 | „21:9“ (Ultrawide) |
| **4K UHD** | 3840 × 2160 | 16:9 (= 4 × Full HD) |

**Paneltechniken:**

| Panel | Stärken | Schwächen | Einsatz |
|---|---|---|---|
| **TN** (Twisted Nematic) | sehr schnelle Reaktionszeit, günstig | schlechte Blickwinkel, schwächere Farben | Gaming (veraltet), Billigmonitore |
| **IPS** (In-Plane Switching) | **farbtreu, blickwinkelstabil (178°)** | geringerer Kontrast (≈ 1000 : 1), „IPS-Glow“ | Büro, Bildbearbeitung – Standard |
| **VA** (Vertical Alignment) | **hoher Kontrast** (≈ 3000 : 1 und mehr), tiefes Schwarz | langsamer bei dunklen Übergängen | Video, Büro, gebogene Monitore |
| **OLED** | selbstleuchtende Pixel, perfektes Schwarz, sehr schnell | **Einbrenngefahr** bei statischen Inhalten (Taskleiste!), teurer | Multimedia, Gaming, Premium-Notebooks |

**Weitere Kenngrößen:**
- **Bildwiederholrate** (Hz): wie oft pro Sekunde das Bild neu aufgebaut wird. Büro 60–75 Hz, flüssiger 100–144 Hz, Gaming 144–240+ Hz. **Adaptive Sync** (FreeSync, G-SYNC) gleicht sie an die Grafikkarte an.
- **Reaktionszeit** (ms, meist Grau-zu-Grau): Schlierenbildung bei Bewegung.
- **Helligkeit** in cd/m² (Büro ≈ 250–350 cd/m²), **Kontrast**, **Farbraum** (sRGB für Büro, Adobe RGB/DCI-P3 für Grafik/Video), **HDR** (z. B. VESA DisplayHDR 400).
- **Pixelfehlerklasse** nach ISO 9241-307 (Klasse I = keine Pixelfehler erlaubt).
- **Ergonomie**: höhenverstellbar, neig-/drehbar, Pivot (Hochformat), **matte (entspiegelte) Oberfläche**, flimmerfrei, Blaulichtfilter, **VESA-Halterung** (z. B. 100 × 100 mm), USB-C mit Power Delivery und Hub (Monitor als „Dock“).
- **Energie**: EU-Energielabel (A–G) und Leistungsaufnahme im Betrieb/Standby (siehe Modul „Energie“).`,
        },
        {
          type: 'visual',
          title: 'Paneltechniken im Vergleich',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'TN', text: 'Schnell, günstig – aber blickwinkelabhängig und farbschwach.', icon: 'Monitor' },
                { title: 'IPS', text: 'Farbtreu, 178° Blickwinkel – der Büro-Standard.', icon: 'Eye' },
                { title: 'VA', text: 'Hoher Kontrast, tiefes Schwarz – etwas langsamer.', icon: 'Monitor' },
                { title: 'OLED', text: 'Selbstleuchtend, perfekter Kontrast – Einbrenngefahr bei statischen Inhalten.', icon: 'Sun' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Beispiel: Monitor für die Buchhaltung',
          problem: `Die Buchhaltung arbeitet täglich 8 Stunden mit Tabellen und ERP-Masken. Zur Wahl: (A) 24" Full HD TN, glänzend, 165 Hz; (B) 24" WUXGA IPS, matt, höhenverstellbar, 60 Hz; (C) 27" WQHD OLED, glänzend, 240 Hz. Welchen empfiehlst du?`,
          steps: [
            { label: 'Anforderungen', body: 'Viel Text, statische Inhalte (Tabellen, Taskleiste), lange Bildschirmarbeit → ergonomisch, blendfrei, farbstabil; hohe Hz unwichtig.' },
            { label: 'A', body: 'TN: schlechte Blickwinkel, glänzend → Spiegelungen. 165 Hz unnötig.' },
            { label: 'B', body: 'IPS: blickwinkelstabil; **matt** → wenig Reflexionen; **16:10** → mehr Zeilen sichtbar; höhenverstellbar → ergonomisch einstellbar.' },
            { label: 'C', body: 'OLED: Einbrenngefahr bei stundenlang statischen Inhalten, glänzend, teuer – nicht passend.' },
          ],
          result: 'Monitor B (24" WUXGA IPS, matt, höhenverstellbar).',
        },
        {
          type: 'check',
          question: {
            id: 'h03-c06', kind: 'match', skill: 'hw.display.tech', difficulty: 2,
            prompt: `Ordne jeder Paneltechnik ihre typische Eigenschaft zu.`,
            left: ['IPS', 'VA', 'TN', 'OLED'],
            right: ['farbtreu, blickwinkelstabil', 'sehr hoher statischer Kontrast', 'sehr schnell, aber blickwinkelabhängig', 'selbstleuchtende Pixel, Einbrenngefahr'],
            answer: [0, 1, 2, 3],
            explanation: 'IPS: Farben/Blickwinkel; VA: Kontrast; TN: Geschwindigkeit; OLED: selbstleuchtend.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'h03-c07', kind: 'text', skill: 'hw.display.tech', difficulty: 1,
            prompt: `Welches **Seitenverhältnis** hat die Auflösung **1920 × 1200**? (Form „x:y“)`,
            accept: ['16:10', '16 : 10', '8:5'],
            explanation: '1920 / 1200 = 1,6 = **16:10** (gekürzt 8:5).',
          },
        },
        { type: 'practice', title: 'Übung: Monitore', questionIds: ['h03-q012', 'h03-q013', 'h03-q014', 'h03-q015'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'FHD 1920 × 1080, WUXGA 1920 × 1200 (16:10), WQHD 2560 × 1440, 4K 3840 × 2160.',
            'IPS = Büro-Standard; VA = Kontrast; TN = schnell/billig; OLED = Kontrast, aber Einbrennen.',
            'Hz, Reaktionszeit, cd/m², Farbraum, Pixelfehlerklasse, Ergonomie, Energielabel.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'h03-l05',
      title: 'Rechnen am Monitor: Pixeldichte und Bildspeicher',
      minutes: 25,
      relevance: 'ap1',
      skills: ['hw.display.ppi', 'hw.display.imagesize'],
      steps: [
        {
          type: 'explain',
          title: 'ppi und Speicherbedarf berechnen',
          body: `**1. Pixeldichte (ppi, pixels per inch)** – wie viele Pixel auf einem Zoll (2,54 cm) liegen. Je höher, desto schärfer wirkt Schrift bei gleichem Abstand.

Die Bilddiagonale wird in **Zoll** angegeben. Deshalb brauchst du die Diagonale **in Pixeln** – mit dem **Satz des Pythagoras**:

> Diagonale in Pixeln = √(Breite² + Höhe²)
> **ppi = Diagonale in Pixeln / Diagonale in Zoll**

Richtwerte: 24" Full HD ≈ 92 ppi · 27" WQHD ≈ 109 ppi · 27" 4K ≈ 163 ppi. Ab etwa 140 ppi wird meist eine **Skalierung** (z. B. 150 %) eingestellt, damit Schrift nicht zu klein wird.

**Pixelabstand (Pixel Pitch)** = 25,4 mm / ppi.

**2. Bildspeicher (Speicherbedarf eines unkomprimierten Bildes):**

> **Speicher in Bit = Breite · Höhe · Farbtiefe (Bit pro Pixel)**
> Byte = Bit / 8

| Farbtiefe | Farben |
|---|---|
| 1 Bit | 2 (Schwarz/Weiß) |
| 8 Bit | 256 (Graustufen oder Palette) |
| 16 Bit | 65.536 (High Color) |
| **24 Bit** | **16,7 Mio.** (True Color, 3 × 8 Bit RGB) |
| 30 Bit | 1,07 Mrd. (3 × 10 Bit, HDR/Grafik) |
| 32 Bit | 24 Bit Farbe + 8 Bit Alphakanal (Transparenz) |

Anzahl Farben = 2^Farbtiefe.

**3. Videodatenrate (unkomprimiert):** Bit pro Bild · Bilder pro Sekunde. Diese Rate (plus Austastlücken und Codierung) muss die Videoschnittstelle schaffen.

**Einheiten:** Bei Speicher wird in der Aufgabe festgelegt, ob MB (10⁶) oder MiB (2²⁰) gemeint ist. Datenraten sind **immer dezimal** (1 Gbit/s = 10⁹ Bit/s).`,
        },
        {
          type: 'example',
          title: 'Beispiel 1: Pixeldichte eines 27-Zoll-WQHD-Monitors',
          problem: `Berechne die Pixeldichte eines **27"-Monitors** mit **2560 × 1440** Pixeln (auf eine Nachkommastelle).`,
          steps: [
            { label: 'Quadrate', body: '2560² = 6.553.600; 1440² = 2.073.600' },
            { label: 'Diagonale in Pixeln', body: '√(6.553.600 + 2.073.600) = √8.627.200 ≈ **2.937,21 px**' },
            { label: 'ppi', body: '2.937,21 px / 27 Zoll ≈ **108,8 ppi**' },
          ],
          result: '≈ 108,8 ppi',
        },
        {
          type: 'example',
          title: 'Beispiel 2: Speicherbedarf eines Full-HD-Bildes',
          problem: `Wie viel Speicher belegt ein unkomprimiertes Bild mit **1920 × 1080** Pixeln und **24 Bit** Farbtiefe – in MB (10⁶ Byte) und in MiB (2²⁰ Byte)?`,
          steps: [
            { label: 'Pixel', body: '1920 · 1080 = **2.073.600 Pixel**' },
            { label: 'Bit', body: '2.073.600 · 24 = **49.766.400 Bit**' },
            { label: 'Byte', body: '49.766.400 / 8 = **6.220.800 Byte**' },
            { label: 'MB', body: '6.220.800 / 1.000.000 = **6,22 MB**' },
            { label: 'MiB', body: '6.220.800 / 1.048.576 = **5,93 MiB**' },
          ],
          result: '6,22 MB bzw. 5,93 MiB',
        },
        {
          type: 'check',
          question: {
            id: 'h03-c08', kind: 'number', skill: 'hw.display.ppi', difficulty: 2,
            prompt: `Ein **24"-Monitor** hat **1920 × 1080** Pixel. Wie hoch ist die Pixeldichte in **ppi**? (eine Nachkommastelle)`,
            answer: 91.8, tolerance: 0.1, unit: 'ppi',
            misconceptions: [{ answer: '80', error: 'ppi-nur-breite', why: 'Nur die Breite durch die Diagonale geteilt – du brauchst die Pixel der **Diagonale** (Pythagoras).' }],
            explanation: '√(1920² + 1080²) = 2.202,91 px; / 24 = **91,8 ppi**.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'h03-c09', kind: 'number', skill: 'hw.display.imagesize', difficulty: 2,
            prompt: `Ein unkomprimiertes Bild hat **3840 × 2160** Pixel und **24 Bit** Farbtiefe. Wie groß ist es in **MB** (10⁶ Byte)? (zwei Nachkommastellen)`,
            answer: 24.88, tolerance: 0.01, unit: 'MB',
            misconceptions: [{ answer: '199.07', error: 'einheit-bit-byte', why: 'Bit nicht durch 8 geteilt.' }, { answer: '23.73', error: 'einheit-1000-1024', why: 'Das sind MiB. Gefragt ist MB (10⁶ Byte).' }],
            explanation: '3840 · 2160 · 24 / 8 = 24.883.200 Byte = **24,88 MB**.',
          },
        },
        { type: 'practice', title: 'Übung: Pixeldichte', generator: 'hw.ppi', count: 3, difficulty: 2 },
        { type: 'practice', title: 'Übung: Bildspeicher', generator: 'hw.bildspeicher', count: 3, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'ppi = √(B² + H²) / Diagonale in Zoll.',
            'Pixel Pitch = 25,4 mm / ppi.',
            'Bildspeicher = B · H · Farbtiefe / 8 (Byte).',
            'Farben = 2^Farbtiefe; 24 Bit = 16,7 Mio. Farben.',
            'Videodatenrate = Bit pro Bild · Hz (dezimal in Gbit/s).',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'h03-l06',
      title: 'Drucker und Scanner auswählen',
      minutes: 20,
      relevance: 'ap1',
      skills: ['hw.io.printer'],
      steps: [
        {
          type: 'explain',
          title: 'Drucktechniken und Kenngrößen',
          body: `| Druckertyp | Prinzip | Stärken | Schwächen | Einsatz |
|---|---|---|---|---|
| **Laserdrucker** | Toner wird über eine belichtete Trommel aufs Papier übertragen und eingebrannt (Fixierung) | schnell, günstige Seitenkosten, wischfest | Feinstaub-/Ozonemissionen, Aufwärmzeit, Fotos mittelmäßig | Büro, hohe Volumina |
| **Tintenstrahldrucker** | Tintentröpfchen (Piezo oder thermisch/Bubble Jet) | sehr gute Fotos, günstige Geräte; Tintentank-Systeme mit niedrigen Seitenkosten | Patronen oft teuer, Eintrocknen bei seltener Nutzung | Fotos, Homeoffice, geringe Volumina |
| **Thermodrucker** | Direktthermo: wärmeempfindliches Papier; Thermotransfer: Farbband | leise, wartungsarm, kompakt | Direktthermo verblasst | Kassenbons, Etiketten, Versandlabel |
| **Nadeldrucker** | Nadeln schlagen auf ein Farbband (Impact) | **Durchschläge** (mehrlagige Formulare), robust | laut, langsam, schlechte Qualität | Lager, Logistik, Formulare |

**Kenngrößen im Datenblatt:**
- **Druckgeschwindigkeit** in Seiten pro Minute (ppm, nach ISO/IEC 24734), **Erstseitenausgabe** (s)
- **Auflösung** in dpi (dots per inch), z. B. 1200 × 1200 dpi
- **Druckvolumen**: empfohlenes Monatsvolumen und maximales (**Duty Cycle**) – das Gerät soll im empfohlenen Bereich laufen
- **Duplexdruck** (automatisch beidseitig), Papierfächer, Formate (A4/A3)
- **Anschlüsse**: LAN, WLAN, USB; Netzwerkdrucker mit **Secure Print / Follow-Me** (Ausdruck erst nach Anmeldung am Gerät – Datenschutz!)
- **Reichweite der Verbrauchsmaterialien** nach ISO/IEC 19752 (Schwarzweiß-Toner), ISO/IEC 19798 (Farbtoner), ISO/IEC 24711 (Tinte)

**Seitenkosten:** Preis des Verbrauchsmaterials / Reichweite – für jedes Material (Toner, Trommel, ggf. Papier) einzeln und dann addieren. Für die Gesamtkosten pro Jahr kommen anteilige Anschaffungskosten (Preis / Nutzungsdauer), ggf. Wartung und Strom hinzu.

**Scanner:**
- **Flachbettscanner**: Bücher, empfindliche Vorlagen; **Dokumentenscanner mit ADF** (automatischer Einzug), oft **Duplex** – für Stapel/Digitalisierung.
- **Optische Auflösung** (dpi) zählt – „interpolierte“ Werte sind hochgerechnet. Für Text/OCR genügen meist **300 dpi**.
- **OCR** (Texterkennung) macht PDFs durchsuchbar; Scan-to-Mail, Scan-to-Folder (SMB), Scan-to-Cloud.
- **Multifunktionsgerät (MFP)**: Drucken, Scannen, Kopieren (Fax) in einem Gerät.`,
        },
        {
          type: 'example',
          title: 'Beispiel: Seitenkosten aus dem Datenblatt',
          problem: `Laserdrucker: Toner **89,90 €** für **6.000 Seiten**, Trommel **69,00 €** für **30.000 Seiten**, Papier **4,50 €** pro **500 Blatt**. Wie hoch sind die Kosten pro Seite in Cent?`,
          steps: [
            { label: 'Toner', body: '89,90 € / 6.000 = 0,014983 € = **1,4983 ct**' },
            { label: 'Trommel', body: '69,00 € / 30.000 = 0,0023 € = **0,23 ct**' },
            { label: 'Papier', body: '4,50 € / 500 = 0,009 € = **0,9 ct**' },
            { label: 'Summe', body: '1,4983 + 0,23 + 0,9 = **2,63 ct** pro Seite' },
          ],
          result: '≈ 2,63 ct pro Seite',
        },
        {
          type: 'check',
          question: {
            id: 'h03-c10', kind: 'single', skill: 'hw.io.printer', difficulty: 1,
            prompt: `Im Lager müssen **mehrlagige Lieferscheine mit Durchschlag** gedruckt werden. Welcher Druckertyp eignet sich?`,
            options: ['Laserdrucker', 'Tintenstrahldrucker', 'Nadeldrucker', 'Direktthermodrucker'],
            answer: 2,
            distractors: {
              '0': { why: 'Laserdrucker drucken berührungslos – ein Durchschlag entsteht nicht.', error: 'drucker-auswahl' },
              '1': { why: 'Auch Tintenstrahldrucker arbeiten ohne Anschlag.', error: 'drucker-auswahl' },
              '3': { why: 'Thermodrucker erzeugen keinen Durchschlag auf Formularsätzen.', error: 'drucker-auswahl' },
            },
            explanation: 'Nur ein **Anschlagdrucker** (Nadeldrucker) überträgt den Druck mechanisch auf die Durchschläge.',
          },
        },
        { type: 'practice', title: 'Übung: Druckkosten berechnen', generator: 'hw.seitenkosten', count: 3, difficulty: 2 },
        { type: 'practice', title: 'Übung: Drucker und Scanner', questionIds: ['h03-q018', 'h03-q019', 'h03-q020', 'h03-q021'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Laser: Büro, schnell, günstige Seiten. Tinte: Fotos, geringe Volumina. Thermo: Etiketten/Bons. Nadel: Durchschläge.',
            'Kenngrößen: ppm, dpi, Monatsvolumen/Duty Cycle, Duplex, Netzwerk, Secure Print.',
            'Seitenkosten = Σ (Materialpreis / Reichweite).',
            'Scanner: ADF + Duplex für Stapel, 300 dpi + OCR für Dokumente.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'h03-l07',
      title: 'Eingabegeräte und weitere Peripherie',
      minutes: 10,
      relevance: 'ap1-teilweise',
      skills: ['hw.io.input'],
      steps: [
        {
          type: 'explain',
          title: 'Was sonst noch an den Arbeitsplatz gehört',
          body: `| Gerät | Kenngrößen / Hinweise |
|---|---|
| **Tastatur** | Layout (Deutsch: QWERTZ), Anschluss USB oder Funk (2,4 GHz/Bluetooth), ergonomische Formen, getrennt vom Bildschirm (Pflicht für Bildschirmarbeitsplätze) |
| **Maus** | optisch/Laser, Auflösung in dpi, ergonomisch/vertikal, Links-/Rechtshänder |
| **Barcode-/QR-Scanner** | 1D (Strichcode) oder 2D (QR, DataMatrix); meldet sich meist als **USB-Tastatur (HID)** → kein Treiber nötig |
| **Kartenleser** | Smartcard für Anmeldung/Signatur, eGK-Terminals |
| **Signaturpad / Stifttablett** | digitale Unterschrift, Grafik |
| **Headset / Webcam** | Videokonferenzen: USB oder Bluetooth, Mikrofon mit Geräuschunterdrückung, Kamera mit Abdeckung (Privatsphäre) |
| **KVM-Switch** | ein Satz Tastatur/Video/Maus für mehrere Rechner |
| **Biometrie** | Fingerabdrucksensor, IR-Kamera für Windows Hello |

**Funk vs. Kabel:** Funkgeräte sind flexibel, brauchen aber Batterien/Akkus und können gestört oder (bei alten, unverschlüsselten Funkprotokollen) abgehört werden. Für sicherheitskritische Plätze verschlüsselte Funkverbindungen oder Kabel verwenden.

**HID (Human Interface Device)**: USB-Geräteklasse für Eingabegeräte – Tastaturen, Mäuse, Scanner im Tastaturmodus. Achtung: Auch präparierte USB-Sticks können sich als HID-Tastatur ausgeben (BadUSB).`,
        },
        {
          type: 'check',
          question: {
            id: 'h03-c11', kind: 'single', skill: 'hw.io.input', difficulty: 2,
            prompt: `Warum funktioniert ein typischer USB-Barcodescanner an fast jedem PC ohne Treiberinstallation?`,
            options: ['Er nutzt Bluetooth.', 'Er meldet sich als USB-Tastatur (HID-Klasse) und „tippt“ den gelesenen Code.', 'Er benötigt einen Netzwerkdrucker.', 'Er ist immer im BIOS integriert.'],
            answer: 1,
            distractors: {
              '0': { why: 'Die Frage betrifft USB-Scanner; Bluetooth würde Kopplung erfordern.', error: 'peripherie-hid' },
              '2': { why: 'Ein Drucker hat damit nichts zu tun.', error: 'peripherie-hid' },
              '3': { why: 'Im BIOS ist kein Scanner integriert; das Betriebssystem nutzt den generischen HID-Treiber.', error: 'peripherie-hid' },
            },
            explanation: 'HID-Geräte werden mit generischen Treibern des Betriebssystems unterstützt.',
          },
        },
        { type: 'practice', title: 'Übung: Peripherie', questionIds: ['h03-q022', 'h03-q023', 'h03-q024'], count: 3, difficulty: 1 },
        {
          type: 'summary',
          points: [
            'Tastatur/Maus ergonomisch und getrennt vom Bildschirm.',
            'Barcodescanner: oft HID-Tastatur → kein Treiber nötig.',
            'Headset/Webcam für Videokonferenzen, KVM-Switch für mehrere Rechner.',
          ],
        },
      ],
    },
  ],
  /* ==================================================================== */
  questions: [
    {
      id: 'h03-q001', kind: 'table', skill: 'hw.io.usb', difficulty: 2,
      prompt: `Ergänze die Tabelle zu den USB-Versionen (Datenrate in **Gbit/s**; USB 2.0 = 0,48).`,
      columns: [{ key: 'r', label: 'Datenrate (Gbit/s)', type: 'number' }],
      rows: [
        { label: 'USB 2.0 (Hi-Speed)', cells: { r: { given: '0,48' } } },
        { label: 'USB 3.2 Gen 1 (USB 5Gbps)', cells: { r: { answer: '5' } } },
        { label: 'USB 3.2 Gen 2 (USB 10Gbps)', cells: { r: { answer: '10' } } },
        { label: 'USB 3.2 Gen 2x2', cells: { r: { answer: '20' } } },
        { label: 'USB4 Version 2.0', cells: { r: { answer: '80' } } },
      ],
      explanation: 'Gen 1 = 5, Gen 2 = 10, Gen 2x2 = 20 Gbit/s; USB4 = 20/40 Gbit/s; USB4 Version 2.0 = 80 Gbit/s.',
    },
    {
      id: 'h03-q002', kind: 'match', skill: 'hw.io.usb', difficulty: 2,
      prompt: `Ordne die alten Bezeichnungen der aktuellen Spezifikation zu.`,
      left: ['USB 3.0', 'USB 3.1 Gen 2', 'USB 3.1 Gen 1', 'USB 3.2 Gen 2x2'],
      right: ['USB 3.2 Gen 1 (5 Gbit/s)', 'USB 3.2 Gen 2 (10 Gbit/s)', 'USB 20Gbps'],
      answer: [0, 1, 0, 2],
      explanation: 'USB 3.0 und USB 3.1 Gen 1 sind beide USB 3.2 Gen 1. USB 3.1 Gen 2 = USB 3.2 Gen 2. Gen 2x2 = USB 20Gbps.',
    },
    {
      id: 'h03-q003', kind: 'free', skill: 'hw.io.usb', difficulty: 2,
      prompt: `Ein Kunde kauft ein Kabel „USB-C auf USB-C“ und wundert sich, dass sein externer USB-40Gbps-Speicher damit nur sehr langsam arbeitet. Erkläre mögliche Ursachen.`,
      modelAnswer: 'USB-C ist nur der Steckertyp. Das Kabel kann für unterschiedliche Datenraten ausgelegt sein – viele günstige USB-C-Kabel (z. B. Ladekabel) unterstützen nur USB 2.0 mit 480 Mbit/s. Für 40 Gbit/s braucht man ein USB4-/Thunderbolt-zertifiziertes Kabel (Logo „USB 40Gbps“), das zudem nicht zu lang sein darf. Außerdem muss der Port am Rechner die Geschwindigkeit unterstützen; sonst gilt die kleinste gemeinsame Version (langsamstes Glied).',
      keywords: ['Steckertyp', 'Kabel', 'USB 2.0', 'zertifiziert', 'Port', 'langsamstes Glied'],
      explanation: 'Stecker ≠ Datenrate; Kabel und Port mitprüfen.',
    },
    {
      id: 'h03-q004', kind: 'number', skill: 'hw.io.usb', difficulty: 3,
      prompt: `Ein Image von **60 GB** wird auf einen USB-Stick kopiert. Port und Stick unterstützen **USB 5Gbps**, real stehen **80 %** der Bruttodatenrate zur Verfügung. Wie lange dauert der Kopiervorgang mindestens in **Sekunden**? (1 GB = 10⁹ Byte)`,
      answer: 120, tolerance: 0.5, unit: 's',
      misconceptions: [{ answer: '15', error: 'einheit-bit-byte', why: 'Byte und Bit nicht angeglichen: 60 GB = 480 Gbit.' }, { answer: '96', error: 'overhead-vergessen', why: 'Die 80 % Nutzrate fehlen: 480 Gbit / 4 Gbit/s.' }],
      explanation: '60 GB · 8 = 480 Gbit; Nutzrate 5 · 0,8 = 4 Gbit/s; 480 / 4 = **120 s** (2 Minuten). In der Praxis begrenzt oft der Flash-Speicher des Sticks zusätzlich.',
    },
    {
      id: 'h03-q005', kind: 'number', skill: 'hw.io.dock', difficulty: 2,
      prompt: `Welche **maximale Leistung in W** ist mit **USB PD 3.1 EPR** möglich (48 V, 5 A)?`,
      answer: 240, unit: 'W',
      explanation: 'P = 48 V · 5 A = **240 W**.',
    },
    {
      id: 'h03-q006', kind: 'single', skill: 'hw.io.dock', difficulty: 2,
      prompt: `Ein Notebook hat nur einen USB-C-Port ohne DisplayPort-Unterstützung (kein DP Alt Mode, kein Thunderbolt). Ein Monitor soll per USB-C-Adapter auf HDMI angeschlossen werden. Was ist zu erwarten?`,
      options: ['Es funktioniert immer, USB-C kann grundsätzlich Video.', 'Es funktioniert nicht mit einem einfachen Adapter – nur mit Docking-Lösungen, die das Bild per Treiber (z. B. DisplayLink) über USB übertragen.', 'Es funktioniert nur in 8K.', 'Der Monitor wird über USB-C geladen.'],
      answer: 1,
      distractors: {
        '0': { why: 'Video über USB-C setzt DP Alt Mode, Thunderbolt/USB4 oder eine treiberbasierte Lösung voraus.', error: 'usb-c-stecker' },
        '2': { why: 'Die Auflösung ist hier nicht das Problem.', error: 'usb-c-stecker' },
        '3': { why: 'Der Monitor wird nicht über das Notebook geladen.', error: 'usb-c-stecker' },
      },
      explanation: 'Einfache USB-C-zu-HDMI-Adapter nutzen den DP Alt Mode – den muss der Port unterstützen.',
    },
    {
      id: 'h03-q007', kind: 'table', skill: 'hw.io.dock', difficulty: 2,
      prompt: `Berechne die Leistung der USB-PD-Profile (P = U · I).`,
      columns: [{ key: 'p', label: 'Leistung (W)', type: 'number' }],
      rows: [
        { label: '5 V · 3 A', cells: { p: { answer: '15' } } },
        { label: '9 V · 3 A', cells: { p: { answer: '27' } } },
        { label: '15 V · 3 A', cells: { p: { answer: '45' } } },
        { label: '20 V · 5 A', cells: { p: { answer: '100' } } },
      ],
      explanation: 'P = U · I: 15 W, 27 W, 45 W, 100 W.',
    },
    {
      id: 'h03-q008', kind: 'match', skill: 'hw.io.video', difficulty: 2,
      prompt: `Ordne die Schnittstellen der maximal unterstützten Bildwiedergabe (typisch) zu.`,
      left: ['HDMI 1.4', 'HDMI 2.0', 'HDMI 2.1', 'VGA'],
      right: ['4K @ 30 Hz', '4K @ 60 Hz', '4K @ 120 Hz', 'analog, veraltet'],
      answer: [0, 1, 2, 3],
      explanation: 'HDMI 1.4: 10,2 Gbit/s; 2.0: 18 Gbit/s; 2.1: 48 Gbit/s; VGA analog.',
    },
    {
      id: 'h03-q009', kind: 'text', skill: 'hw.io.video', difficulty: 2,
      prompt: `Wie heißt die DisplayPort-Funktion, mit der mehrere Monitore **hintereinander** (Daisy Chain) an einem Ausgang betrieben werden können (Abkürzung)?`,
      accept: ['MST', 'Multi-Stream Transport', 'Multi Stream Transport'],
      explanation: '**MST** – Multi-Stream Transport. Der erste Monitor braucht dafür einen DP-Ausgang.',
    },
    {
      id: 'h03-q010', kind: 'free', skill: 'hw.io.video', difficulty: 2,
      prompt: `Ein Beamer im Besprechungsraum hat nur einen **VGA-Eingang**. Die neuen Notebooks haben nur **USB-C und HDMI**. Beschreibe eine Lösung und ihre Einschränkungen.`,
      modelAnswer: 'Da VGA analog ist und HDMI/USB-C digital, wird ein aktiver Wandler (Adapter HDMI→VGA bzw. USB-C→VGA mit eingebautem D/A-Wandler) benötigt. Einschränkungen: keine Tonübertragung über VGA (separates Audiokabel nötig), Bildqualität durch die analoge Übertragung schlechter, maximale Auflösung meist Full HD, ggf. Probleme mit HDCP-geschützten Inhalten. Langfristig sollte der Beamer durch ein Gerät mit HDMI/USB-C bzw. Funkpräsentationssystem ersetzt werden.',
      keywords: ['aktiver Adapter', 'analog', 'digital', 'kein Ton', 'Qualität', 'HDCP'],
      explanation: 'Digital → analog braucht einen aktiven Wandler.',
    },
    {
      id: 'h03-q011', kind: 'single', skill: 'hw.io.video', difficulty: 2,
      prompt: `Ein 4K-Monitor soll mit **120 Hz** betrieben werden. Der PC hat HDMI 2.0 und DisplayPort 1.4. Welche Aussage ist richtig?`,
      options: ['Beide Anschlüsse schaffen 4K @ 120 Hz.', 'Nur DisplayPort 1.4 schafft 4K @ 120 Hz; HDMI 2.0 ist auf 4K @ 60 Hz begrenzt.', 'Nur HDMI 2.0 schafft 4K @ 120 Hz.', 'Keiner von beiden, dafür braucht man VGA.'],
      answer: 1,
      distractors: {
        '0': { why: 'HDMI 2.0 hat 18 Gbit/s – das reicht für 4K nur bis 60 Hz.', error: 'video-bandbreite' },
        '2': { why: 'Umgekehrt: HDMI 2.0 ist das Limit, DP 1.4 schafft 4K120.', error: 'video-bandbreite' },
        '3': { why: 'VGA ist analog und veraltet.', error: 'video-analog-digital' },
      },
      explanation: 'DP 1.4 (32,4 Gbit/s, ggf. mit DSC) → 4K120. HDMI 2.0 → 4K60.',
    },
    {
      id: 'h03-q012', kind: 'table', skill: 'hw.display.tech', difficulty: 1,
      prompt: `Ergänze die Pixelauflösung der Bezeichnungen (Form „Breite x Höhe“).`,
      columns: [{ key: 'res', label: 'Auflösung', type: 'text' }],
      rows: [
        { label: 'Full HD', cells: { res: { answer: '1920x1080', accept: ['1920 x 1080', '1920×1080', '1920 × 1080'] } } },
        { label: 'WQHD', cells: { res: { answer: '2560x1440', accept: ['2560 x 1440', '2560×1440', '2560 × 1440'] } } },
        { label: '4K UHD', cells: { res: { answer: '3840x2160', accept: ['3840 x 2160', '3840×2160', '3840 × 2160'] } } },
      ],
      explanation: 'FHD 1920 × 1080, WQHD 2560 × 1440, 4K UHD 3840 × 2160.',
    },
    {
      id: 'h03-q013', kind: 'single', skill: 'hw.display.tech', difficulty: 2,
      prompt: `An einem Empfangsplatz wird stundenlang dieselbe Software-Oberfläche mit fester Taskleiste angezeigt. Warum ist ein **OLED-Monitor** hier ungünstig?`,
      options: ['OLED kann keine Farben darstellen.', 'Bei lange statischen Inhalten droht Einbrennen (Burn-in).', 'OLED hat zu wenig Kontrast.', 'OLED unterstützt kein HDMI.'],
      answer: 1,
      distractors: {
        '0': { why: 'OLED stellt Farben sehr gut dar.', error: 'panel-eigenschaften' },
        '2': { why: 'OLED hat den höchsten Kontrast (perfektes Schwarz).', error: 'panel-eigenschaften' },
        '3': { why: 'Die Schnittstelle hängt nicht von der Paneltechnik ab.', error: 'panel-eigenschaften' },
      },
      explanation: 'Organische Pixel altern ungleichmäßig – statische Elemente können sich einbrennen.',
    },
    {
      id: 'h03-q014', kind: 'free', skill: 'hw.display.tech', difficulty: 2,
      prompt: `Nenne fünf Merkmale aus dem Datenblatt, auf die du bei einem Monitor für einen Büro-Bildschirmarbeitsplatz achtest, und begründe kurz.`,
      modelAnswer: '1. Entspiegelte/matte Oberfläche – vermeidet Reflexionen und Blendung. 2. Ergonomische Verstellbarkeit (Höhe, Neigung, Drehung, ggf. Pivot) – Anpassung an Nutzer, Vorgabe der Arbeitsstättenverordnung. 3. Paneltyp IPS – blickwinkelstabil und farbtreu. 4. Auflösung/Größe passend (z. B. 24" WUXGA oder 27" WQHD) – scharfe Schrift ohne extreme Skalierung. 5. Flimmerfreiheit und Blaulichtfilter – Augenschonung. Außerdem: Anschlüsse passend zum PC (DisplayPort/HDMI/USB-C mit PD), Energieeffizienz (EU-Energielabel, geringer Standby), Pixelfehlerklasse, Garantie.',
      keywords: ['entspiegelt', 'höhenverstellbar', 'IPS', 'Auflösung', 'flimmerfrei', 'Anschlüsse', 'Energielabel'],
      explanation: 'Ergonomie + Bildqualität + Anschlüsse + Energie.',
    },
    {
      id: 'h03-q015', kind: 'number', skill: 'hw.display.tech', difficulty: 2,
      prompt: `Wie viele Farben lassen sich mit **30 Bit** Farbtiefe (3 × 10 Bit) darstellen? (exakte Zahl)`,
      answer: 1073741824, unit: 'Farben',
      misconceptions: [{ answer: '16777216', error: 'farbtiefe', why: 'Das sind 2²⁴ (24 Bit). Gefragt ist 2³⁰.' }],
      explanation: '2³⁰ = **1.073.741.824** Farben (≈ 1,07 Mrd.).',
    },
    {
      id: 'h03-q016', kind: 'number', skill: 'hw.display.ppi', difficulty: 3,
      prompt: `Ein Notebook hat ein **13,3"-Display** mit **2560 × 1600** Pixeln. Wie hoch ist die Pixeldichte in **ppi**? (eine Nachkommastelle)`,
      answer: 227, tolerance: 0.1, unit: 'ppi',
      misconceptions: [{ answer: '192.5', error: 'ppi-nur-breite', why: 'Nur die Breite verwendet – Pythagoras für die Diagonale nutzen.' }],
      explanation: '√(2560² + 1600²) = √(6.553.600 + 2.560.000) = √9.113.600 ≈ 3.018,87 px; / 13,3 ≈ **227,0 ppi**.',
    },
    {
      id: 'h03-q017', kind: 'number', skill: 'hw.display.imagesize', difficulty: 3,
      prompt: `Ein Foto im Format **8 × 10 Zoll** wird mit **300 dpi** und **24 Bit** Farbtiefe gescannt. Wie groß ist die unkomprimierte Datei in **MB** (10⁶ Byte)? (eine Nachkommastelle)`,
      answer: 21.6, tolerance: 0.05, unit: 'MB',
      misconceptions: [{ answer: '172.8', error: 'einheit-bit-byte', why: 'Bit nicht in Byte umgerechnet (/ 8).' }, { answer: '20.6', error: 'einheit-1000-1024', why: 'Das sind MiB. Gefragt sind MB (10⁶ Byte).' }],
      explanation: 'Pixel: (8 · 300) × (10 · 300) = 2400 × 3000 = 7.200.000 Pixel; · 24 Bit / 8 = 21.600.000 Byte = **21,6 MB**.',
    },
    {
      id: 'h03-q018', kind: 'match', skill: 'hw.io.printer', difficulty: 1,
      prompt: `Ordne jedem Einsatz den passenden Druckertyp zu.`,
      left: ['Versandetiketten im Lager', 'Abteilungsdrucker, 4.000 Seiten/Monat', 'Fotodruck in hoher Qualität', 'mehrlagige Formulare mit Durchschlag'],
      right: ['Thermo(transfer)drucker', 'Laserdrucker', 'Tintenstrahldrucker', 'Nadeldrucker'],
      answer: [0, 1, 2, 3],
      explanation: 'Etiketten → Thermo; hohes Bürovolumen → Laser; Fotos → Tinte; Durchschläge → Nadel.',
    },
    {
      id: 'h03-q019', kind: 'number', skill: 'hw.io.printer', difficulty: 2,
      prompt: `Datenblatt: Toner **119,00 €** für **9.000 Seiten**, Trommel **99,00 €** für **50.000 Seiten**. Wie hoch sind die **Verbrauchskosten pro Seite in Cent** (ohne Papier)? (zwei Nachkommastellen)`,
      answer: 1.52, tolerance: 0.01, unit: 'ct',
      misconceptions: [{ answer: '1.32', error: 'druck-nur-toner', why: 'Die Trommelkosten fehlen.' }, { answer: '0.02', error: 'energie-cent-euro', why: 'Das Ergebnis in Euro – für Cent mit 100 multiplizieren.' }],
      explanation: 'Toner: 119 / 9.000 = 1,3222 ct; Trommel: 99 / 50.000 = 0,198 ct; Summe **1,52 ct**.',
    },
    {
      id: 'h03-q020', kind: 'free', skill: 'hw.io.printer', difficulty: 2,
      prompt: `In der Personalabteilung werden vertrauliche Dokumente auf einem Etagendrucker ausgedruckt. Beschreibe eine technische Maßnahme, die verhindert, dass Unbefugte die Ausdrucke aus dem Ausgabefach nehmen.`,
      modelAnswer: 'Secure Print bzw. Follow-Me-Printing (Pull-Printing): Der Druckauftrag wird zunächst auf dem Druckserver oder Drucker zurückgehalten und erst ausgegeben, wenn sich die Person direkt am Gerät authentifiziert – z. B. mit PIN, Mitarbeiterausweis (RFID/Smartcard) oder Anmeldung. So liegen keine vertraulichen Ausdrucke unbeaufsichtigt im Fach; außerdem werden vergessene Ausdrucke vermieden (spart Papier). Ergänzend: verschlüsselte Übertragung des Druckauftrags.',
      keywords: ['Secure Print', 'Follow-Me', 'PIN', 'Ausweis', 'Authentifizierung', 'zurückgehalten'],
      explanation: 'Druck erst nach Anmeldung am Gerät → Vertraulichkeit (DSGVO).',
    },
    {
      id: 'h03-q021', kind: 'multi', skill: 'hw.io.printer', difficulty: 2,
      prompt: `Für die Digitalisierung von täglich ca. 500 Seiten Lieferscheinen wird ein Scanner gesucht. Welche Merkmale sind sinnvoll?`,
      options: ['Automatischer Dokumenteneinzug (ADF)', 'Duplex-Scan', 'OCR-Software für durchsuchbare PDFs', 'Möglichst hohe interpolierte Auflösung von 19.200 dpi', 'Scan-to-Folder ins Netzwerk (SMB)'],
      answer: [0, 1, 2, 4],
      explanation: 'Für Stapelverarbeitung: ADF, Duplex, OCR, Ablage im Netz. Interpolierte Auflösungen sind hochgerechnet und für Dokumente sinnlos – 300 dpi optisch reichen.',
    },
    {
      id: 'h03-q022', kind: 'match', skill: 'hw.io.input', difficulty: 1,
      prompt: `Ordne die Geräte ihrem Einsatzzweck zu.`,
      left: ['KVM-Switch', 'Signaturpad', 'Smartcard-Leser', 'Headset'],
      right: ['eine Tastatur/Maus/Monitor für mehrere Rechner', 'digitale Unterschrift erfassen', 'Anmeldung/Signatur mit Chipkarte', 'Telefonie und Videokonferenz'],
      answer: [0, 1, 2, 3],
      explanation: 'KVM = Keyboard, Video, Mouse.',
    },
    {
      id: 'h03-q023', kind: 'text', skill: 'hw.io.input', difficulty: 2,
      prompt: `Wie heißt die USB-Geräteklasse für Eingabegeräte wie Tastatur und Maus (Abkürzung)?`,
      accept: ['HID', 'Human Interface Device'],
      explanation: '**HID** – Human Interface Device.',
    },
    {
      id: 'h03-q024', kind: 'single', skill: 'hw.io.input', difficulty: 1,
      prompt: `Was beschreibt die dpi-Angabe bei einer **Maus**?`,
      options: ['Die Bildschirmauflösung', 'Die Abtastauflösung des Sensors – wie viele Bildpunkte der Zeiger pro Zoll Mausbewegung zurücklegt', 'Die Akkulaufzeit', 'Die Funkreichweite'],
      answer: 1,
      distractors: {
        '0': { why: 'Die Bildschirmauflösung ist eine Monitoreigenschaft.', error: 'peripherie-kenngroesse' },
        '2': { why: 'Akkulaufzeit wird in Stunden/Monaten angegeben.', error: 'peripherie-kenngroesse' },
        '3': { why: 'Reichweite wird in Metern angegeben.', error: 'peripherie-kenngroesse' },
      },
      explanation: 'Höhere dpi = Zeiger bewegt sich bei gleicher Handbewegung weiter.',
    },
    {
      id: 'h03-q025', kind: 'number', skill: 'hw.display.imagesize', difficulty: 2,
      prompt: `Welche **unkomprimierte Datenrate in Gbit/s** entsteht bei **1920 × 1080**, **24 Bit** und **60 Hz** (nur Bildinhalt; 1 Gbit = 10⁹ Bit; zwei Nachkommastellen)?`,
      answer: 2.99, tolerance: 0.01, unit: 'Gbit/s',
      misconceptions: [{ answer: '0.37', error: 'einheit-bit-byte', why: 'In Byte gerechnet – Datenraten in Bit angeben.' }],
      explanation: '1920 · 1080 · 24 · 60 = 2.985.984.000 Bit/s ≈ **2,99 Gbit/s**.',
    },
    {
      id: 'h03-q026', kind: 'free', skill: 'hw.display.ppi', difficulty: 2,
      prompt: `Ein Mitarbeiter bekommt einen **27"-Monitor mit 4K** (≈ 163 ppi) und beschwert sich über „winzige Schrift“. Erkläre die Ursache und eine Lösung.`,
      modelAnswer: 'Bei hoher Pixeldichte sind die einzelnen Pixel sehr klein. Wird ohne Skalierung (100 %) gearbeitet, werden Schrift und Bedienelemente, die in Pixeln definiert sind, physisch sehr klein dargestellt. Lösung: In den Anzeigeeinstellungen eine Skalierung (z. B. 150 %) einstellen. Dann werden Elemente größer dargestellt, aber mit mehr Pixeln gezeichnet – die Schrift ist gleich groß wie auf einem Monitor mit geringerer Dichte, aber deutlich schärfer.',
      keywords: ['Pixeldichte', 'Skalierung', '150 %', 'schärfer'],
      explanation: 'Hohe ppi → Skalierung nutzen.',
    },
    {
      id: 'h03-q027', kind: 'number', skill: 'hw.display.ppi', difficulty: 2,
      prompt: `Ein Monitor hat eine Pixeldichte von **108,8 ppi**. Wie groß ist der Pixelabstand (Pixel Pitch) in **mm**? (1 Zoll = 25,4 mm; drei Nachkommastellen)`,
      answer: 0.233, tolerance: 0.001, unit: 'mm',
      misconceptions: [{ answer: '0.023', error: 'ppi-zoll-cm', why: '1 Zoll = 25,4 mm (nicht 2,54).' }],
      explanation: '25,4 mm / 108,8 = **0,233 mm**.',
    },
    {
      id: 'h03-q028', kind: 'order', skill: 'hw.io.usb', difficulty: 2,
      prompt: `Sortiere nach maximaler Datenrate – **langsamste zuerst**.`,
      items: ['USB 2.0 (Hi-Speed)', 'USB 3.2 Gen 1', 'USB 3.2 Gen 2', 'USB 3.2 Gen 2x2', 'USB4 (40 Gbit/s) / Thunderbolt 4', 'USB4 Version 2.0 / Thunderbolt 5'],
      explanation: '480 Mbit/s → 5 → 10 → 20 → 40 → 80 Gbit/s.',
    },
    {
      id: 'h03-q029', kind: 'single', skill: 'hw.io.dock', difficulty: 1,
      prompt: `Woran erkennt man einen **Thunderbolt**-Anschluss am Notebook typischerweise?`,
      options: ['Am HDMI-Logo', 'Am Blitzsymbol neben dem USB-C-Port', 'An der blauen Farbe des USB-A-Ports', 'Am Kopfhörersymbol'],
      answer: 1,
      distractors: {
        '0': { why: 'Das HDMI-Logo kennzeichnet HDMI-Ports.', error: 'thunderbolt-erkennen' },
        '2': { why: 'Blaue USB-A-Ports kennzeichneten traditionell USB 3.x.', error: 'thunderbolt-erkennen' },
        '3': { why: 'Das ist der Audioanschluss.', error: 'thunderbolt-erkennen' },
      },
      explanation: 'Thunderbolt 3/4/5 nutzen USB-C-Buchsen mit Blitzsymbol (ggf. mit Versionsnummer).',
    },
    {
      id: 'h03-q030', kind: 'free', skill: 'hw.io.printer', difficulty: 3,
      prompt: `Die Elektro Krämer GmbH vergleicht für ein Büro mit ca. **2.000 Seiten pro Monat** einen Tintenstrahldrucker (Gerät 180 €, 6,5 ct/Seite) und einen Laserdrucker (Gerät 420 €, 2,2 ct/Seite). Berechne die Gesamtkosten für **3 Jahre** und gib eine Empfehlung.`,
      modelAnswer: 'Seiten in 3 Jahren: 2.000 · 36 = 72.000. Tinte: 180 € + 72.000 · 0,065 € = 180 € + 4.680 € = 4.860 €. Laser: 420 € + 72.000 · 0,022 € = 420 € + 1.584 € = 2.004 €. Der Laserdrucker ist trotz höherem Anschaffungspreis über 3 Jahre rund 2.856 € günstiger und für das Volumen (schnell, robust) besser geeignet → Empfehlung Laserdrucker. Weitere Kriterien: Duty Cycle passt zum Volumen, Netzwerk/Duplex, Emissionen (Aufstellort, Umweltzeichen).',
      keywords: ['72.000 Seiten', '4.860 €', '2.004 €', 'Laserdrucker', 'Gesamtkosten'],
      hints: ['Seiten in 3 Jahren = 2.000 · 36.', 'Gesamtkosten = Gerätepreis + Seiten · Seitenpreis.'],
      explanation: 'Tinte 4.860 € vs. Laser 2.004 € → Laser.',
    },
  ],
};
