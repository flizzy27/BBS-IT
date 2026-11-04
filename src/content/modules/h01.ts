import type { Module } from '../types';

export const h01: Module = {
  id: 'h01',
  nr: 1,
  area: 'hardware',
  title: 'IT-Arbeitsplatz & PC-Komponenten',
  short: `Geräteklassen, Mainboard, CPU, RAM, Grafik, Netzteil und UEFI verstehen – und Systeme anhand von Datenblättern passend zu Anforderungen auswählen.`,
  icon: 'Cpu',
  relevance: 'ap1',
  prerequisites: [],
  generators: ['hw.ram'],
  skills: [
    { id: 'hw.pc.devices', module: 'h01', title: 'Geräteklassen unterscheiden und zuordnen' },
    { id: 'hw.pc.mainboard', module: 'h01', title: 'Mainboard, Formfaktoren, Chipsatz und PCIe' },
    { id: 'hw.pc.cpu', module: 'h01', title: 'Prozessor-Kenngrößen (Kerne, Takt, Cache, TDP)' },
    { id: 'hw.pc.ram', module: 'h01', title: 'Arbeitsspeicher (DDR4/DDR5, Kanäle, ECC)', requires: ['hw.pc.mainboard'] },
    { id: 'hw.pc.gpu', module: 'h01', title: 'Grafik: integriert oder dediziert' },
    { id: 'hw.pc.psu', module: 'h01', title: 'Netzteil dimensionieren' },
    { id: 'hw.pc.firmware', module: 'h01', title: 'BIOS/UEFI, Secure Boot, TPM und Bootvorgang' },
    { id: 'hw.pc.select', module: 'h01', title: 'Datenblätter lesen und Systeme auswählen', requires: ['hw.pc.cpu', 'hw.pc.ram', 'hw.pc.devices'] },
  ],
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'h01-l01',
      title: 'Geräteklassen – welcher Rechner für welchen Arbeitsplatz?',
      minutes: 15,
      relevance: 'ap1',
      skills: ['hw.pc.devices'],
      steps: [
        {
          type: 'explain',
          title: 'Vom Smartphone bis zum Server',
          body: `In der AP1 lautet die Handlungssituation fast immer: *„Ein Arbeitsplatz soll eingerichtet werden – wähle passende Hardware aus.“* Dafür musst du zuerst wissen, **welche Geräteklasse** überhaupt infrage kommt.

| Geräteklasse | Typische Merkmale | Typischer Einsatz |
|---|---|---|
| **Desktop-PC (Tower / Small Form Factor)** | erweiterbar, günstig pro Leistung, stationär | Büro, Buchhaltung, Entwicklung |
| **Mini-PC** | sehr klein, geringer Verbrauch (oft 10–35 W), kaum erweiterbar | Büro, Empfang, Digital Signage |
| **All-in-One (AiO)** | Rechner im Monitorgehäuse, wenig Kabel | Empfang, Beratungsplätze |
| **Notebook / Ultrabook** | Akku, mobil, Display + Tastatur integriert | Außendienst, Homeoffice, Meetings |
| **Convertible / 2-in-1** | Notebook mit Touch, Display umklappbar | Präsentation, Notizen mit Stift |
| **Tablet** | Touch, sehr mobil, Apps | Lager, Kundendienst, Unterschriften |
| **Smartphone** | Telefonie, mobile Daten (LTE/5G), MDM-verwaltet | Erreichbarkeit, 2. Faktor (MFA) |
| **Thin Client** | wenig eigene Leistung, kein/geringer lokaler Speicher, Programme laufen auf dem **Terminalserver / in der VDI** | Callcenter, Schulungsräume, Produktion |
| **Workstation** | starke CPU, viel RAM (oft **ECC**), zertifizierte Profi-Grafik (ISV-Zertifizierung) | CAD, Videoschnitt, Simulation |
| **Server** | 24/7-Betrieb, ECC-RAM, redundante Netzteile, Hot-Swap, Fernwartung (BMC, z. B. iDRAC/iLO), oft im **19-Zoll-Rack** | Datei-, Datenbank-, Virtualisierungsserver |

**Rack-Einheiten:** Server-Gehäuse werden in **Höheneinheiten (HE, engl. U)** angegeben: **1 HE = 1,75 Zoll = 44,45 mm**. Ein typischer Serverschrank hat 42 HE; die Einbaubreite beträgt **19 Zoll** (482,6 mm Frontplatte).

**Thin Client vs. Fat Client:** Ein „Fat Client“ ist ein normaler PC, der Programme lokal ausführt. Ein Thin Client zeigt nur die Sitzung eines Servers an. Vorteile: zentrale Verwaltung, geringer Stromverbrauch, Daten bleiben im Rechenzentrum, lange Lebensdauer. Nachteile: ohne Netzwerk/Server kein Arbeiten, Serverseite muss leistungsfähig sein, Multimedia und Spezialsoftware sind schwieriger.`,
        },
        {
          type: 'visual',
          title: 'Geräteklassen auf einen Blick',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Desktop-PC', text: 'Stationär, erweiterbar, gutes Preis-Leistungs-Verhältnis. Standard im Büro.', icon: 'Monitor' },
                { title: 'Notebook', text: 'Mobil mit Akku. Für Außendienst und Homeoffice – am festen Platz mit Dockingstation.', icon: 'Laptop' },
                { title: 'Thin Client', text: 'Zeigt nur eine Server-/VDI-Sitzung. Zentral verwaltet, sparsam, netzabhängig.', icon: 'Server' },
                { title: 'Workstation', text: 'Viel Rechen- und Grafikleistung, ECC-RAM, ISV-zertifiziert. Für CAD und Video.', icon: 'Cpu' },
                { title: 'Tablet / Smartphone', text: 'Touch, mobil, per MDM verwaltet. Für Lager, Kundendienst, MFA.', icon: 'Smartphone' },
                { title: 'Server', text: '24/7, redundant, ECC, Fernwartung, 19-Zoll-Rack (1 HE = 44,45 mm).', icon: 'Database' },
              ],
            },
          },
          caption: 'Erst die Anforderungen klären (mobil? Rechenleistung? zentral verwaltet?), dann die Geräteklasse wählen.',
        },
        {
          type: 'example',
          title: 'Beispiel: Geräteklassen für die Elektro Krämer GmbH',
          problem: `Die Elektro Krämer GmbH stattet drei Bereiche neu aus:\n\n1. **Callcenter** in Berlin mit 20 Plätzen, nur Browser und CRM-Software, Daten sollen zentral bleiben.\n2. **Konstruktion** in Hamburg: 3D-CAD für Schaltschränke.\n3. **Servicetechniker** im Außendienst: Auftragsdaten beim Kunden erfassen, Kunden unterschreiben digital.\n\nWähle jeweils eine Geräteklasse und begründe.`,
          steps: [
            { label: 'Callcenter', body: '**Thin Clients** mit Terminalserver/VDI: identische Standardanwendungen, zentrale Datenhaltung und Verwaltung, geringer Energieverbrauch. Ein Ausfall eines Clients ist schnell durch Tausch behoben.' },
            { label: 'Konstruktion', body: '**Workstation**: CAD braucht hohe Single-Thread-Leistung, viel RAM (z. B. 64 GB, ECC gegen Bitfehler in langen Berechnungen) und eine **ISV-zertifizierte** Grafikkarte, für die der CAD-Hersteller Treiber und Support garantiert.' },
            { label: 'Außendienst', body: '**Robustes Tablet oder Convertible** mit LTE/5G-Modem und Stifteingabe: mobil, Unterschrift per Stift, Internetzugang ohne WLAN beim Kunden. Verwaltung per MDM, Daten verschlüsselt.' },
          ],
          result: 'Callcenter → Thin Client · Konstruktion → Workstation · Außendienst → Tablet/Convertible mit Mobilfunk',
        },
        {
          type: 'check',
          question: {
            id: 'h01-c01', kind: 'single', skill: 'hw.pc.devices', difficulty: 1,
            prompt: `Welches Merkmal beschreibt einen **Thin Client** am besten?`,
            options: ['Er hat eine besonders leistungsstarke Grafikkarte.', 'Anwendungen laufen auf einem Server; der Client zeigt die Sitzung nur an.', 'Er wird ausschließlich im 19-Zoll-Rack verbaut.', 'Er funktioniert vollständig ohne Netzwerk.'],
            answer: 1,
            distractors: {
              '0': { why: 'Leistungsstarke Grafik ist ein Merkmal von Workstations. Thin Clients haben bewusst wenig eigene Leistung.', error: 'geraeteklasse-verwechselt' },
              '2': { why: 'Im Rack stehen Server. Thin Clients stehen am Arbeitsplatz.', error: 'geraeteklasse-verwechselt' },
              '3': { why: 'Im Gegenteil: Ohne Netzwerk und Server kann man mit einem Thin Client nicht arbeiten.', error: 'geraeteklasse-verwechselt' },
            },
            explanation: 'Thin Clients verbinden sich mit einem Terminalserver oder einer VDI-Umgebung. Rechenleistung und Daten liegen zentral.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'h01-c02', kind: 'number', skill: 'hw.pc.devices', difficulty: 2,
            prompt: `Ein Server-Gehäuse hat eine Bauhöhe von **2 HE**. Wie hoch ist es in **Millimetern**?`,
            answer: 88.9, tolerance: 0.05, unit: 'mm',
            hints: ['1 HE = 1,75 Zoll = 44,45 mm'],
            explanation: '2 · 44,45 mm = **88,9 mm**.',
          },
        },
        { type: 'practice', title: 'Übung: Geräteklassen', questionIds: ['h01-q001', 'h01-q003', 'h01-q004'], count: 3, difficulty: 1 },
        {
          type: 'summary',
          points: [
            'Anforderungen zuerst: Mobilität, Leistung, Verwaltung, Datenhaltung.',
            'Thin Client = Sitzung läuft auf dem Server; zentral, sparsam, netzabhängig.',
            'Workstation = viel Leistung, ECC, ISV-zertifizierte Grafik.',
            'Server = 24/7, Redundanz, ECC, Fernwartung, 19-Zoll-Rack, 1 HE = 44,45 mm.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'h01-l02',
      title: 'Das Mainboard: Formfaktoren, Chipsatz, Steckplätze und PCIe',
      minutes: 20,
      relevance: 'ap1',
      skills: ['hw.pc.mainboard'],
      steps: [
        {
          type: 'explain',
          title: 'Die Hauptplatine verbindet alles',
          body: `Das **Mainboard** (Hauptplatine) verbindet alle Komponenten. Beim Auswählen achtest du auf:

**1. Formfaktor** – bestimmt Größe, Befestigungslöcher und passendes Gehäuse:

| Formfaktor | Maße (ca.) | Steckplätze | Einsatz |
|---|---|---|---|
| **ATX** | 305 × 244 mm | bis 7 Erweiterungsslots | Tower-PCs, Workstations |
| **Micro-ATX (µATX)** | 244 × 244 mm | bis 4 Slots | kompakte Büro-PCs |
| **Mini-ITX** | 170 × 170 mm | 1 Slot | Mini-PCs, kleine Gehäuse |

Kleinere Boards passen meist auch in größere Gehäuse – umgekehrt nicht.

**2. Sockel** – muss exakt zur CPU passen (z. B. AMD **AM5**, Intel **LGA 1700** oder **LGA 1851**). Ein falscher Sockel = CPU passt mechanisch nicht.

**3. Chipsatz** – steuert, welche Funktionen das Board bietet (Anzahl USB-Ports, SATA-Ports, zusätzliche PCIe-Lanes, Übertakten). Viele Lanes (Grafik, erste M.2-SSD) hängen heute direkt an der CPU.

**4. Steckplätze und Anschlüsse:**

| Steckplatz | Wofür? |
|---|---|
| **DIMM-Slots** | Arbeitsspeicher (Desktop); Notebooks: SO-DIMM oder verlöteter RAM |
| **PCIe x16** | Grafikkarte |
| **PCIe x1/x4** | Netzwerkkarten, Controller |
| **M.2** | SSDs (NVMe über PCIe oder SATA), auch WLAN-Module (anderer Key) |
| **SATA** | 2,5"-/3,5"-Laufwerke |
| **24-pin ATX + 8-pin EPS** | Stromversorgung Board und CPU |
| **Front-Header** | USB, Audio, Power-Taster |

**5. PCI Express (PCIe)** – der zentrale Erweiterungsbus. Er arbeitet **seriell** und **Punkt-zu-Punkt** in **Lanes** (x1, x4, x8, x16). Jede Generation verdoppelt ungefähr die Datenrate:

| Generation | Transferrate pro Lane | ≈ Datenrate pro Lane und Richtung | ≈ x4 | ≈ x16 |
|---|---|---|---|---|
| PCIe 3.0 | 8 GT/s | ≈ 1 GB/s | ≈ 3,9 GB/s | ≈ 15,8 GB/s |
| PCIe 4.0 | 16 GT/s | ≈ 2 GB/s | ≈ 7,9 GB/s | ≈ 31,5 GB/s |
| PCIe 5.0 | 32 GT/s | ≈ 4 GB/s | ≈ 15,8 GB/s | ≈ 63 GB/s |
| PCIe 6.0 | 64 GT/s | ≈ 8 GB/s | ≈ 30 GB/s | ≈ 121 GB/s |

PCIe ist **abwärtskompatibel**: Eine PCIe-4.0-Karte läuft im 3.0-Slot – dann aber nur mit 3.0-Geschwindigkeit. Es gilt immer die **langsamere** Seite (Generation und Lane-Anzahl).`,
        },
        {
          type: 'visual',
          title: 'Was steckt wo?',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'CPU-Sockel', text: 'AM5, LGA 1700, LGA 1851 … muss exakt zur CPU passen.', icon: 'Cpu' },
                { title: 'DIMM', text: 'RAM-Steckplätze. DDR4 und DDR5 sind mechanisch verschieden kodiert.', icon: 'MemoryStick' },
                { title: 'PCIe x16', text: 'Grafikkarte. Lanes und Generation bestimmen die Bandbreite.', icon: 'CircuitBoard' },
                { title: 'M.2', text: 'SSD-Steckplatz – NVMe (PCIe) oder SATA, je nach Board und SSD.', icon: 'HardDrive' },
              ],
            },
          },
          caption: 'Vor dem Kauf im Handbuch prüfen: Welche Slots teilen sich Lanes? (z. B. „M.2_2 deaktiviert SATA 5/6“).',
        },
        {
          type: 'example',
          title: 'Beispiel: Reicht der Steckplatz für die NVMe-SSD?',
          problem: `Ein Kunde will eine **PCIe-4.0-x4-NVMe-SSD** (bis 7.000 MB/s lesen) in einen älteren PC einbauen. Dessen M.2-Slot ist laut Handbuch an **PCIe 3.0 x4** angebunden. Funktioniert das, und welche Datenrate ist höchstens möglich?`,
          steps: [
            { label: 'Kompatibilität', body: 'PCIe ist abwärtskompatibel, die SSD funktioniert also (gleicher M.2-Key M und passende Länge, z. B. 2280, vorausgesetzt).' },
            { label: 'Begrenzung', body: 'Es gilt die langsamere Seite: PCIe 3.0 mit ca. 1 GB/s pro Lane → x4 ≈ **3,9 GB/s** brutto.' },
            { label: 'Praxis', body: 'Real erreichen PCIe-3.0-x4-SSDs etwa 3.500 MB/s. Die SSD wird also deutlich schneller als SATA (≈ 550 MB/s), aber nicht mit ihren 7.000 MB/s laufen.' },
          ],
          result: 'Funktioniert – aber begrenzt auf PCIe-3.0-x4-Niveau (ca. 3,5 GB/s statt 7 GB/s).',
        },
        {
          type: 'check',
          question: {
            id: 'h01-c03', kind: 'text', skill: 'hw.pc.mainboard', difficulty: 1,
            prompt: `Wie heißt der Mainboard-Formfaktor mit den Maßen **170 × 170 mm**?`,
            accept: ['Mini-ITX', 'mini itx', 'miniitx', 'mITX'],
            explanation: 'Mini-ITX: 170 × 170 mm, ein Erweiterungssteckplatz – typisch für kompakte PCs.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'h01-c04', kind: 'single', skill: 'hw.pc.mainboard', difficulty: 2,
            prompt: `Eine PCIe-5.0-Grafikkarte wird in einen PCIe-4.0-x16-Steckplatz gesteckt. Was passiert?`,
            options: ['Sie passt mechanisch nicht.', 'Sie funktioniert, die Verbindung läuft mit PCIe 4.0.', 'Sie läuft mit PCIe-5.0-Geschwindigkeit.', 'Sie funktioniert nur mit einem Adapter.'],
            answer: 1,
            distractors: {
              '0': { why: 'Die Stecker sind über die Generationen gleich – PCIe ist auf- und abwärtskompatibel.', error: 'pcie-kompatibilitaet' },
              '2': { why: 'Es gilt immer die langsamere Seite – hier der Steckplatz mit PCIe 4.0.', error: 'pcie-kompatibilitaet' },
              '3': { why: 'Ein Adapter ist nicht nötig, der Slot ist mechanisch identisch.', error: 'pcie-kompatibilitaet' },
            },
            explanation: 'PCIe-Geräte und -Slots handeln die höchste gemeinsame Generation aus – hier PCIe 4.0.',
          },
        },
        { type: 'practice', title: 'Übung: Mainboard und Steckplätze', questionIds: ['h01-q006', 'h01-q007', 'h01-q008', 'h01-q035'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Formfaktoren: ATX 305 × 244, Micro-ATX 244 × 244, Mini-ITX 170 × 170 mm.',
            'Sockel muss zur CPU passen; Chipsatz bestimmt Ausstattung.',
            'PCIe: seriell, Lanes x1–x16, jede Generation ≈ doppelte Rate (4.0 ≈ 2 GB/s pro Lane).',
            'Abwärtskompatibel – die langsamere Seite bestimmt die Geschwindigkeit.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'h01-l03',
      title: 'Der Prozessor: Kerne, Takt, Cache und TDP',
      minutes: 20,
      relevance: 'ap1',
      skills: ['hw.pc.cpu'],
      steps: [
        {
          type: 'explain',
          title: 'CPU-Datenblatt lesen',
          body: `Die **CPU** (Central Processing Unit) führt die Befehle der Programme aus. Im Datenblatt findest du diese Kenngrößen:

| Kenngröße | Bedeutung | Worauf achten? |
|---|---|---|
| **Kerne (Cores)** | eigenständige Recheneinheiten | Viele Kerne helfen bei parallelen Aufgaben (Virtualisierung, Rendern, Kompilieren) |
| **Threads** | Befehlsstränge, die gleichzeitig bearbeitet werden können | Mit **SMT** (Intel: *Hyper-Threading*) bearbeitet ein Kern 2 Threads |
| **P-/E-Cores** | Hybrid-Architektur: **Performance-Kerne** für hohe Leistung, **Efficient-Kerne** für Hintergrundlast | Thread-Zahl = P-Kerne · 2 (bei SMT) + E-Kerne |
| **Taktfrequenz** | Arbeitstakte pro Sekunde in GHz: **Basistakt** und **Boost/Turbo** | Nur innerhalb derselben Architektur vergleichbar! |
| **Cache (L1/L2/L3)** | sehr schneller Zwischenspeicher auf dem Chip | Größerer L3-Cache hilft z. B. bei Datenbanken und Spielen |
| **TDP / Base Power** | Wärmeleistung, die der Kühler dauerhaft abführen muss (Intel: *Processor Base Power* und *Maximum Turbo Power*) | Kühler und Gehäuse danach auswählen; Hinweis auf Energiebedarf |
| **Sockel** | mechanische/elektrische Schnittstelle zum Board | muss zum Mainboard passen |
| **iGPU** | integrierte Grafikeinheit | Reicht für Büroarbeit, spart eine Grafikkarte |
| **NPU** | Neural Processing Unit für KI-Funktionen | Für „Copilot+ PCs“ verlangt Microsoft eine NPU mit mind. 40 TOPS |
| **Befehlssatz** | x86-64 (Intel, AMD) oder **ARM** (z. B. Apple M-Serie, Snapdragon X) | Software muss für die Architektur verfügbar sein bzw. emuliert werden |

**Wichtiger Prüfungsgedanke:** *Mehr GHz* heißt nicht automatisch *schneller*. Eine neue CPU mit 4,5 GHz kann deutlich schneller sein als eine alte mit 4,8 GHz, weil sie pro Takt mehr Befehle schafft (IPC – Instructions per Cycle). Vergleiche deshalb Benchmarks oder gleiche Generationen.

**Beispiel für Threads:** Eine CPU mit **6 P-Kernen (mit SMT)** und **8 E-Kernen (ohne SMT)** hat 6 · 2 + 8 = **20 Threads**.`,
        },
        {
          type: 'visual',
          title: 'Kenngrößen und ihre Wirkung',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Kerne & Threads', text: 'Parallelität: viele Programme, VMs, Rendern.', icon: 'Cpu' },
                { title: 'Takt (GHz)', text: 'Arbeitstakte pro Sekunde – nur bei gleicher Architektur vergleichbar.', icon: 'Gauge' },
                { title: 'Cache', text: 'Schneller Speicher auf dem Chip, verringert Wartezeit auf den RAM.', icon: 'MemoryStick' },
                { title: 'TDP', text: 'Abwärme in Watt → Kühlung, Gehäuse, Energiebedarf.', icon: 'Thermometer' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Beispiel: Zwei CPUs im Angebot vergleichen',
          problem: `Für einen Entwickler-PC stehen zur Auswahl:\n\n| | CPU A | CPU B |\n|---|---|---|\n| Kerne | 6 (alle mit SMT) | 8 P (mit SMT) + 16 E (ohne SMT) |\n| Takt Basis/Boost | 3,9 / 5,0 GHz | 2,5 / 5,6 GHz |\n| L3-Cache | 32 MB | 36 MB |\n| TDP (Basis) | 65 W | 125 W |\n\nDer Entwickler kompiliert große Projekte und betreibt mehrere virtuelle Maschinen. Welche CPU passt besser? Wie viele Threads hat jede?`,
          steps: [
            { label: 'Threads A', body: '6 Kerne · 2 = **12 Threads**' },
            { label: 'Threads B', body: '8 · 2 + 16 = **32 Threads**' },
            { label: 'Anforderung', body: 'Kompilieren und VMs profitieren stark von vielen Kernen/Threads → B ist klar im Vorteil. Der niedrigere Basistakt von B ist kein Gegenargument, da unter Last der Boost und die Kernzahl entscheiden.' },
            { label: 'Folgen', body: 'B hat 125 W TDP → leistungsfähiger Kühler, gut belüftetes Gehäuse und ein ausreichend dimensioniertes Netzteil einplanen.' },
          ],
          result: 'CPU B (32 Threads) – mit passender Kühlung und Netzteil.',
        },
        {
          type: 'check',
          question: {
            id: 'h01-c05', kind: 'number', skill: 'hw.pc.cpu', difficulty: 2,
            prompt: `Eine CPU hat **8 Performance-Kerne mit SMT** und **4 Efficient-Kerne ohne SMT**. Wie viele **Threads** kann sie gleichzeitig bearbeiten?`,
            answer: 20, unit: 'Threads',
            misconceptions: [{ answer: '24', error: 'cpu-threads', why: 'Nur die P-Kerne haben SMT. E-Kerne bearbeiten je 1 Thread: 8 · 2 + 4 = 20.' }, { answer: '12', error: 'cpu-threads', why: 'Das ist die Zahl der Kerne. Mit SMT bearbeitet jeder P-Kern 2 Threads.' }],
            explanation: '8 · 2 + 4 · 1 = **20 Threads**.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'h01-c06', kind: 'single', skill: 'hw.pc.cpu', difficulty: 2,
            prompt: `Wofür ist die Angabe **TDP** (bzw. Processor Base Power) bei der Planung eines PCs vor allem wichtig?`,
            options: ['Für die Auswahl des Arbeitsspeichers', 'Für die Dimensionierung von Kühlung (und Netzteil)', 'Für die Anzahl der USB-Ports', 'Für die maximale Bildschirmauflösung'],
            answer: 1,
            distractors: {
              '0': { why: 'Welcher RAM passt, hängt vom Speichercontroller (DDR4/DDR5) und Mainboard ab, nicht von der TDP.', error: 'cpu-tdp' },
              '2': { why: 'USB-Ports stellt vor allem der Chipsatz/das Mainboard bereit.', error: 'cpu-tdp' },
              '3': { why: 'Die Auflösung hängt von Grafikeinheit und Monitoranschluss ab.', error: 'cpu-tdp' },
            },
            explanation: 'Die TDP gibt die Wärmeleistung an, die der Kühler abführen muss. Sie ist zugleich ein Anhaltspunkt für den Strombedarf.',
          },
        },
        { type: 'practice', title: 'Übung: CPU-Kenngrößen', questionIds: ['h01-q010', 'h01-q011', 'h01-q012', 'h01-q031'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Kerne/Threads = Parallelität; SMT verdoppelt die Threads je Kern.',
            'Takt nur innerhalb gleicher Architektur vergleichen (IPC!).',
            'Cache = schneller Zwischenspeicher auf dem Chip.',
            'TDP → Kühlung und Netzteil; Sockel → Mainboard.',
            'x86-64 vs. ARM: Software-Kompatibilität prüfen.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'h01-l04',
      title: 'Arbeitsspeicher: DDR4, DDR5, Kanäle und ECC',
      minutes: 20,
      relevance: 'ap1',
      skills: ['hw.pc.ram'],
      steps: [
        {
          type: 'explain',
          title: 'RAM – der schnelle Arbeitsbereich',
          body: `Der **Arbeitsspeicher (RAM)** hält Programme und Daten, mit denen die CPU gerade arbeitet. Er ist **flüchtig**: Ohne Strom sind die Inhalte weg. Zu wenig RAM → das Betriebssystem lagert auf die SSD aus → das System wird träge.

**Generationen:**

| | DDR4 | DDR5 |
|---|---|---|
| Spannung (Standard) | 1,2 V | 1,1 V |
| Typische Geschwindigkeit | 2133–3200 MT/s | 4800–6400 MT/s (und mehr) |
| Modulbezeichnung | PC4-… | PC5-… |
| Besonderheit | – | zwei unabhängige 32-Bit-Subkanäle pro Modul, Spannungsregler auf dem Modul, **On-Die-ECC** |

DDR4 und DDR5 sind **nicht kompatibel** – die Kerbe sitzt an einer anderen Stelle. Das Mainboard bestimmt, welcher Typ passt. Bauformen: **DIMM** (Desktop), **SO-DIMM** (Notebook, Mini-PC), **LPDDR** (meist fest verlötet – nicht aufrüstbar!).

**Bezeichnung entschlüsseln:** „DDR4-3200“ = 3200 Millionen Transfers pro Sekunde (MT/s). Pro Transfer werden 64 Bit = **8 Byte** übertragen:

> 3200 MT/s · 8 Byte = 25.600 MB/s → Modulname **PC4-25600**

**Mehrkanalbetrieb (Dual Channel):** Der Speichercontroller kann mehrere Kanäle parallel nutzen. Mit 2 Modulen in den richtigen Steckplätzen (laut Handbuch, oft farblich markiert) verdoppelt sich die theoretische Bandbreite. Deshalb sind **2 × 8 GB** meist besser als **1 × 16 GB**. Workstations/Server haben 4, 8 oder mehr Kanäle.

**ECC (Error Correcting Code):** Zusätzliche Prüfbits erkennen und korrigieren Einzelbitfehler, die z. B. durch kosmische Strahlung entstehen. Pflicht für **Server**, sinnvoll für **Workstations** – CPU und Mainboard müssen ECC unterstützen. Achtung: Das **On-Die-ECC** von DDR5 schützt nur intern im Chip und ersetzt **kein** echtes ECC-Modul (das zusätzliche Datenleitungen hat). Server verwenden außerdem oft **Registered DIMMs (RDIMM)**.

**Wie viel RAM?** (Richtwerte 2026) Büro mit Windows 11: **16 GB**; Entwicklung, viele VMs, CAD: **32–64 GB** und mehr. Windows 11 setzt formal mindestens 4 GB voraus – praktisch viel zu wenig.`,
        },
        {
          type: 'visual',
          title: 'Single- vs. Dual-Channel',
          widget: {
            kind: 'cards',
            data: {
              columns: 2,
              items: [
                { title: 'Single Channel: 1 × 16 GB', text: 'Ein Kanal aktiv. DDR4-3200 → 25,6 GB/s theoretische Bandbreite.', icon: 'MemoryStick' },
                { title: 'Dual Channel: 2 × 8 GB', text: 'Zwei Kanäle parallel. DDR4-3200 → 2 · 25,6 = 51,2 GB/s. Gleiche Kapazität, doppelte Bandbreite.', icon: 'MemoryStick' },
              ],
            },
          },
          caption: 'Besonders integrierte Grafik (iGPU) profitiert von Dual Channel, weil sie den Arbeitsspeicher als Grafikspeicher mitbenutzt.',
        },
        {
          type: 'example',
          title: 'Beispiel: Bandbreite berechnen',
          problem: `Ein Büro-PC soll mit **2 Modulen DDR5-5600** im Dual-Channel betrieben werden. Wie heißen die Module nach PC-Bezeichnung und welche theoretische Bandbreite ergibt sich?`,
          steps: [
            { label: 'Pro Modul/Kanal', body: '5600 MT/s · 8 Byte = **44.800 MB/s** → Bezeichnung **PC5-44800**' },
            { label: 'Dual Channel', body: '44.800 MB/s · 2 = 89.600 MB/s = **89,6 GB/s** (1 GB = 1000 MB)' },
          ],
          result: 'PC5-44800, theoretisch 89,6 GB/s im Dual-Channel-Betrieb.',
        },
        {
          type: 'check',
          question: {
            id: 'h01-c07', kind: 'text', skill: 'hw.pc.ram', difficulty: 2,
            prompt: `Ein Händler bietet **PC4-25600**-Module an. Welche DDR-Bezeichnung (Form „DDR4-…“) haben diese Module?`,
            accept: ['DDR4-3200', 'DDR4 3200', 'ddr43200', '3200'],
            explanation: '25.600 MB/s / 8 Byte = 3200 MT/s → **DDR4-3200**.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'h01-c08', kind: 'free', skill: 'hw.pc.ram', difficulty: 2,
            prompt: `Erläutere, warum ein Kollege für den neuen Büro-PC lieber **2 × 8 GB** statt **1 × 16 GB** RAM bestellen sollte.`,
            modelAnswer: 'Mit zwei Modulen kann der Speichercontroller im Dual-Channel-Modus arbeiten: Beide Kanäle werden parallel genutzt, die theoretische Speicherbandbreite verdoppelt sich bei gleicher Gesamtkapazität. Davon profitiert vor allem die integrierte Grafik, die den Arbeitsspeicher mitbenutzt. (Nachteil: Für spätere Aufrüstung sind ggf. keine Slots mehr frei.)',
            keywords: ['Dual-Channel', 'Bandbreite', 'parallel', 'integrierte Grafik'],
            explanation: 'Gleiche Kapazität, aber doppelte Bandbreite durch zwei Kanäle.',
          },
        },
        { type: 'practice', title: 'Übung: Speicherbandbreite berechnen', generator: 'hw.ram', count: 3, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'RAM ist flüchtig; zu wenig RAM → Auslagerung → langsam.',
            'DDR4 ≠ DDR5 (nicht kompatibel). DIMM, SO-DIMM, LPDDR (verlötet).',
            'MT/s · 8 Byte = MB/s pro Kanal (DDR4-3200 = PC4-25600).',
            'Dual Channel verdoppelt die theoretische Bandbreite.',
            'ECC korrigiert Bitfehler – Server/Workstation; DDR5-On-Die-ECC ersetzt kein ECC-Modul.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'h01-l05',
      title: 'Grafik und Netzteil',
      minutes: 15,
      relevance: 'ap1',
      skills: ['hw.pc.gpu', 'hw.pc.psu'],
      steps: [
        {
          type: 'explain',
          title: 'Integrierte oder dedizierte Grafik? Und wie groß muss das Netzteil sein?',
          body: `**Grafik:**

| | Integrierte Grafik (iGPU) | Dedizierte Grafikkarte |
|---|---|---|
| Ort | im Prozessor | eigene Karte im PCIe-x16-Slot |
| Speicher | nutzt den Arbeitsspeicher mit | eigener schneller Grafikspeicher (VRAM, z. B. GDDR6/GDDR7) |
| Verbrauch | gering | hoch (Mittelklasse ca. 150–250 W, High-End über 400 W) |
| Einsatz | Büro, Browser, 2–3 Monitore, Videos | CAD, 3D, Videoschnitt, KI-Berechnungen, Spiele |

Für die Anzahl der Monitore zählen die **Ausgänge** (HDMI, DisplayPort, USB-C mit DP Alt Mode) und die maximale Auflösung/Bildwiederholrate, die die Grafikeinheit unterstützt (siehe Modul „Schnittstellen & Peripherie“).

**Netzteil (PSU – Power Supply Unit):** Es wandelt 230 V Wechselspannung in die Gleichspannungen **12 V, 5 V und 3,3 V** um. Auswahlkriterien:

1. **Leistung:** Summe der Komponenten (CPU nach TDP/Turbo-Power, Grafikkarte nach Herstellerangabe, Rest ≈ 50–100 W) **plus Reserve** (häufig 20–30 %).
2. **Wirkungsgrad:** Zertifizierung **80 PLUS** (Bronze, Silver, Gold, Platinum, Titanium). Ein Netzteil arbeitet meist um **50 % Last** am effizientesten – stark überdimensionierte Netzteile laufen im Büroalltag ineffizient.
3. **Anschlüsse:** 24-pin ATX, 8-pin EPS (CPU), PCIe-Stromstecker bzw. **12V-2x6** (ATX 3.1, für moderne Grafikkarten bis 600 W).
4. **Formfaktor:** ATX, SFX (kleine Gehäuse); Server: redundante Hot-Swap-Netzteile.
5. **Schutzschaltungen:** z. B. OVP (Überspannung), OCP (Überstrom), SCP (Kurzschluss).

Die Berechnung von Wirkungsgrad und Verlustleistung übst du im Modul „Energie, Elektrotechnik & Umwelt“.`,
        },
        {
          type: 'example',
          title: 'Beispiel: Netzteil für eine CAD-Workstation',
          problem: `Komponenten einer Workstation (Herstellerangaben, maximale Leistungsaufnahme): CPU **125 W**, Grafikkarte **220 W**, Mainboard/RAM/SSDs/Lüfter zusammen **75 W**. Es sollen **30 % Reserve** eingeplant werden. Welche Netzteilleistung ist mindestens nötig, und welche Größe wählst du?`,
          steps: [
            { label: 'Summe', body: '125 W + 220 W + 75 W = **420 W**' },
            { label: 'Reserve', body: '420 W · 1,3 = **546 W**' },
            { label: 'Auswahl', body: 'Nächste übliche Größe: **550 W** (bzw. 650 W, wenn ein Grafik-Upgrade geplant ist), mit 80 PLUS Gold oder besser und passendem Grafikkarten-Stromanschluss.' },
          ],
          result: 'Mindestens 546 W → z. B. 550-W-Netzteil, 80 PLUS Gold.',
        },
        {
          type: 'check',
          question: {
            id: 'h01-c09', kind: 'number', skill: 'hw.pc.psu', difficulty: 2,
            prompt: `CPU 65 W, Grafikkarte 160 W, restliche Komponenten 60 W. Welche Netzteilleistung in **W** ist bei **25 % Reserve** mindestens erforderlich? (auf eine Nachkommastelle runden)`,
            answer: 356.3, tolerance: 0.1, unit: 'W',
            misconceptions: [{ answer: '285', error: 'netzteil-reserve', why: 'Die Reserve von 25 % fehlt: 285 W · 1,25.' }],
            explanation: '65 + 160 + 60 = 285 W; 285 W · 1,25 = **356,25 W ≈ 356,3 W** → z. B. ein 400-W-Netzteil.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'h01-c10', kind: 'single', skill: 'hw.pc.gpu', difficulty: 1,
            prompt: `Für einen Buchhaltungsarbeitsplatz mit zwei Full-HD-Monitoren, Office und ERP-Software ist welche Grafiklösung angemessen?`,
            options: ['Integrierte Grafik der CPU', 'High-End-Grafikkarte mit 24 GB VRAM', 'ISV-zertifizierte Workstation-Grafik', 'Zwei Grafikkarten im Verbund'],
            answer: 0,
            distractors: {
              '1': { why: 'Überdimensioniert: hohe Kosten, hoher Stromverbrauch, kein Nutzen für Office/ERP.', error: 'ueberdimensioniert' },
              '2': { why: 'ISV-Zertifizierung braucht man für CAD/3D-Profisoftware, nicht für Office.', error: 'ueberdimensioniert' },
              '3': { why: 'Völlig unnötig – die iGPU steuert zwei Full-HD-Monitore problemlos an.', error: 'ueberdimensioniert' },
            },
            explanation: 'Eine aktuelle iGPU steuert mehrere Monitore an und reicht für Office/ERP. Das spart Kosten und Energie.',
          },
        },
        { type: 'practice', title: 'Übung: Grafik und Netzteil', questionIds: ['h01-q020', 'h01-q021', 'h01-q022'], count: 3, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'iGPU genügt fürs Büro; dedizierte GPU für CAD, 3D, Video, KI.',
            'Netzteil: Summe der Komponenten + Reserve (20–30 %).',
            '80 PLUS = Effizienzklasse; bestes Effizienzfenster um 50 % Last.',
            'Anschlüsse prüfen: 24-pin, EPS, PCIe/12V-2x6.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'h01-l06',
      title: 'BIOS/UEFI, Secure Boot, TPM und der Bootvorgang',
      minutes: 15,
      relevance: 'ap1',
      skills: ['hw.pc.firmware'],
      steps: [
        {
          type: 'explain',
          title: 'Die Firmware startet den Rechner',
          body: `Beim Einschalten läuft zuerst die **Firmware** auf dem Mainboard. Früher war das das **BIOS** (Basic Input/Output System), heute ist es **UEFI** (Unified Extensible Firmware Interface).

| | Legacy-BIOS | UEFI |
|---|---|---|
| Partitionsschema | MBR (max. 2 TiB, 4 primäre Partitionen) | **GPT** (sehr große Datenträger, bis zu 128 Partitionen unter Windows) |
| Bootloader | im MBR (erste 512 Byte) | als Datei auf der **EFI-Systempartition (ESP)**, FAT32 |
| Oberfläche | Text, Tastatur | grafisch, Maus möglich |
| Sicherheit | – | **Secure Boot** |
| Kompatibilität | – | CSM (Compatibility Support Module) emuliert BIOS – bei vielen neuen Boards entfallen |

**Secure Boot** startet nur Bootloader, die mit einem in der Firmware hinterlegten Schlüssel **digital signiert** sind. So können Bootkits/Rootkits, die sich vor dem Betriebssystem einnisten, nicht unbemerkt starten.

**TPM 2.0** (Trusted Platform Module) ist ein Sicherheitschip (oder in der CPU integriert als fTPM/PTT). Er speichert Schlüssel geschützt, z. B. für **BitLocker**-Laufwerksverschlüsselung und Windows Hello, und misst den Bootvorgang.

**Windows 11** verlangt u. a.: UEFI mit Secure-Boot-Fähigkeit, **TPM 2.0**, mind. **4 GB RAM**, **64 GB Speicher**, eine kompatible 64-Bit-CPU mit mind. 2 Kernen und 1 GHz. Der reguläre Support für **Windows 10 endete am 14. Oktober 2025** – Altgeräte ohne TPM 2.0 sind daher ein typisches Austauschthema.

**Typische UEFI-Einstellungen:** Bootreihenfolge, Secure Boot an/aus, TPM aktivieren, Virtualisierung (Intel VT-x / AMD-V) für Hyper-V/VMs, Firmware-Passwort (Setup-Passwort), Wake-on-LAN, Lüftersteuerung, Datum/Uhrzeit (die Einstellungen werden gepuffert, Knopfzelle z. B. CR2032).

**POST** (Power-On Self-Test): Die Firmware prüft beim Start grundlegende Hardware (CPU, RAM, Grafik). Fehler werden per Piepton-Code, LED oder Meldung angezeigt.`,
        },
        {
          type: 'visual',
          title: 'Bootvorgang mit UEFI',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['Netzteil/Mainboard', 'UEFI-Firmware', 'EFI-Systempartition', 'Betriebssystem'],
              messages: [
                { from: 0, to: 1, label: 'Power Good – CPU startet Firmware' },
                { from: 1, to: 1, label: 'POST: Hardwaretest, Initialisierung', note: 'Fehler → Piepcode/LED' },
                { from: 1, to: 2, label: 'Booteintrag aus NVRAM lesen, Bootloader laden', note: 'Secure Boot prüft Signatur' },
                { from: 2, to: 3, label: 'Bootloader lädt Kernel und Treiber' },
                { from: 3, to: 3, label: 'Dienste starten, Anmeldung' },
              ],
            },
          },
          caption: 'Secure Boot greift beim Übergang von der Firmware zum Bootloader: Unsignierter Code wird nicht ausgeführt.',
        },
        {
          type: 'example',
          title: 'Beispiel: Altgerät für Windows 11 prüfen',
          problem: `Ein PC aus 2016 soll auf Windows 11 umgestellt werden. Laut Systeminformation: Legacy-BIOS-Modus, Datenträger MBR, TPM 1.2, 8 GB RAM, 256-GB-SSD. Was ist zu tun?`,
          steps: [
            { label: 'Firmware', body: 'Board unterstützt UEFI? Dann Umstellung von Legacy/CSM auf UEFI; Datenträger von MBR nach GPT konvertieren (unter Windows z. B. mit dem Werkzeug mbr2gpt) – vorher **Datensicherung**.' },
            { label: 'TPM', body: 'TPM 1.2 erfüllt die Anforderung nicht. Prüfen, ob ein Firmware-Update TPM 2.0 freischaltet; sonst ist das Gerät offiziell nicht Windows-11-fähig.' },
            { label: 'Weitere Punkte', body: 'RAM und SSD reichen. CPU muss in der Kompatibilitätsliste stehen (bei 2016er-CPUs oft nicht).' },
            { label: 'Empfehlung', body: 'Wirtschaftlichkeit prüfen: Austausch durch ein aktuelles Gerät ist meist sinnvoller als eine nicht unterstützte Installation.' },
          ],
          result: 'Ohne TPM 2.0 und unterstützte CPU kein offizielles Windows 11 → Austausch empfehlen.',
        },
        {
          type: 'check',
          question: {
            id: 'h01-c11', kind: 'free', skill: 'hw.pc.firmware', difficulty: 2,
            prompt: `Erläutere die Funktion von **Secure Boot**.`,
            modelAnswer: 'Secure Boot ist eine UEFI-Funktion: Beim Start prüft die Firmware die digitale Signatur von Bootloader (und Treibern) mit hinterlegten vertrauenswürdigen Schlüsseln. Nur korrekt signierter Code wird ausgeführt. Dadurch wird verhindert, dass manipulierte Bootloader oder Bootkits/Rootkits vor dem Betriebssystem geladen werden.',
            keywords: ['UEFI', 'Signatur', 'Bootloader', 'Schlüssel', 'Rootkit'],
            explanation: 'Kern: Signaturprüfung vor dem Start → Schutz vor Schadcode in der Bootphase.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'h01-c12', kind: 'text', skill: 'hw.pc.firmware', difficulty: 1,
            prompt: `Welches Partitionsschema verwendet ein mit UEFI startendes Windows-System (Abkürzung)?`,
            accept: ['GPT', 'GUID Partition Table', 'GUID-Partitionstabelle'],
            explanation: '**GPT** (GUID Partition Table). MBR gehört zum Legacy-BIOS-Start.',
          },
        },
        { type: 'practice', title: 'Übung: Firmware und Bootvorgang', questionIds: ['h01-q023', 'h01-q024', 'h01-q025', 'h01-q030'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'UEFI ersetzt das BIOS: GPT, EFI-Systempartition, Secure Boot.',
            'Secure Boot startet nur signierte Bootloader.',
            'TPM 2.0 speichert Schlüssel (BitLocker) – Pflicht für Windows 11.',
            'POST prüft die Hardware beim Start.',
            'Windows 10 ohne Support seit 14.10.2025 → Altgeräte prüfen.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'h01-l07',
      title: 'Datenblätter lesen und Angebote vergleichen',
      minutes: 25,
      relevance: 'ap1',
      skills: ['hw.pc.select'],
      steps: [
        {
          type: 'explain',
          title: 'Systematisch zur Kaufempfehlung',
          body: `Typische AP1-Aufgabe: *„Drei Angebote liegen als Beleg vor. Prüfe, welches die Anforderungen erfüllt, und begründe deine Empfehlung.“*

**Vorgehen in vier Schritten:**

1. **Anforderungen sammeln** und in **Muss-Kriterien** (K.-o.) und **Soll-/Kann-Kriterien** trennen. Beispiel: *muss* 16 GB RAM, *muss* TPM 2.0, *soll* geringer Verbrauch.
2. **Angebote zeilenweise prüfen** – jede Muss-Anforderung mit dem Datenblatt abgleichen. Ein einziges nicht erfülltes Muss-Kriterium scheidet das Angebot aus.
3. **Verbleibende Angebote bewerten** – nach Preis, Energieverbrauch, Garantie/Service (z. B. Vor-Ort-Service am nächsten Arbeitstag), Erweiterbarkeit, Lieferzeit. Bei mehreren Kriterien: **Nutzwertanalyse** (gewichtete Punktbewertung).
4. **Empfehlung begründen** – immer mit Bezug auf die Anforderungen.

**Fallstricke in Datenblättern:**
- „bis zu“-Angaben (Boost-Takt, Akkulaufzeit) sind Bestwerte.
- „16 GB (1 × 16 GB)“ → nur Single Channel. „8 GB verlötet + 1 Slot“ → eingeschränkt aufrüstbar.
- „SSD 512 GB“ – SATA oder NVMe? Das macht einen großen Unterschied.
- Fehlende Angaben (kein TPM erwähnt, kein Betriebssystem) gelten in der Prüfung als **nicht erfüllt**, sofern nicht anders erkennbar.
- Garantie: 1 Jahr Bring-in vs. 3 Jahre Vor-Ort-Service.`,
        },
        {
          type: 'visual',
          title: 'Vom Bedarf zur Empfehlung',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: '1. Anforderungen', text: 'Muss- und Soll-Kriterien aus der Situation ableiten.', icon: 'FileText' },
                { title: '2. K.-o.-Prüfung', text: 'Jedes Muss-Kriterium je Angebot prüfen.', icon: 'AlertTriangle' },
                { title: '3. Bewerten', text: 'Preis, Verbrauch, Service, Erweiterbarkeit – ggf. Nutzwertanalyse.', icon: 'Calculator' },
                { title: '4. Begründen', text: 'Empfehlung mit Bezug auf die Anforderungen formulieren.', icon: 'PenLine' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Beispiel: Drei Büro-PCs für die Buchhaltung',
          problem: `Anforderungen der Buchhaltung (Elektro Krämer GmbH): **Windows 11 Pro**, **mind. 16 GB RAM im Dual-Channel**, **NVMe-SSD mind. 512 GB**, **2 digitale Monitoranschlüsse**, möglichst sparsam, **3 Jahre Vor-Ort-Service** gewünscht.\n\n| | Angebot A | Angebot B | Angebot C |\n|---|---|---|---|\n| CPU | 6 Kerne, 65 W | 10 Kerne, 65 W | 6 Kerne, 35 W |\n| RAM | 16 GB (1 × 16 GB) | 16 GB (2 × 8 GB) DDR5 | 16 GB (2 × 8 GB) DDR5 |\n| Speicher | 512 GB SSD SATA | 512 GB NVMe | 1 TB NVMe |\n| Grafik/Anschlüsse | iGPU, 1 × HDMI, 1 × DP | iGPU, 1 × HDMI, 2 × DP | iGPU, 1 × HDMI, 1 × VGA |\n| OS | Windows 11 Pro | Windows 11 Pro | Windows 11 Pro |\n| Service | 3 J. Vor-Ort | 3 J. Vor-Ort | 1 J. Bring-in |\n| Preis | 649 € | 729 € | 689 € |`,
          steps: [
            { label: 'Angebot A', body: 'RAM **1 × 16 GB** → kein Dual-Channel ✗; SSD nur SATA ✗ → **ausgeschieden**.' },
            { label: 'Angebot B', body: 'Dual-Channel ✓, NVMe 512 GB ✓, 3 digitale Ausgänge ✓, Windows 11 Pro ✓, 3 J. Vor-Ort ✓ → **erfüllt alle Anforderungen**.' },
            { label: 'Angebot C', body: 'Nur **ein** digitaler Ausgang (HDMI), VGA ist analog ✗; nur 1 Jahr Bring-in-Service (Soll-Kriterium nicht erfüllt) → **ausgeschieden**.' },
            { label: 'Empfehlung', body: 'Angebot **B**: Es ist das einzige, das alle Muss-Kriterien erfüllt. Der höhere Preis ist durch Service und Ausstattung gerechtfertigt.' },
          ],
          result: 'Angebot B',
        },
        {
          type: 'check',
          question: {
            id: 'h01-c13', kind: 'single', skill: 'hw.pc.select', difficulty: 2,
            prompt: `Im Datenblatt eines Notebooks steht: „RAM: 8 GB LPDDR5 (onboard)“. Welche Aussage ist richtig?`,
            options: ['Der RAM lässt sich einfach auf 32 GB aufrüsten.', 'Der RAM ist fest verlötet; die Kapazität muss beim Kauf passend gewählt werden.', 'LPDDR5 ist mit DDR4-SO-DIMMs kompatibel.', '„onboard“ bedeutet, dass ECC aktiv ist.'],
            answer: 1,
            distractors: {
              '0': { why: 'LPDDR „onboard“ ist auf die Hauptplatine gelötet – es gibt keinen Steckplatz zum Aufrüsten.', error: 'ram-verloetet' },
              '2': { why: 'LPDDR5 ist kein steckbarer Modultyp und nicht mit DDR4 kompatibel.', error: 'ram-verloetet' },
              '3': { why: '„onboard“ beschreibt die Montage, nicht ECC.', error: 'ram-verloetet' },
            },
            explanation: 'Verlöteter Speicher kann nicht erweitert werden – deshalb beim Kauf ausreichend dimensionieren (z. B. 16 GB oder mehr).',
          },
        },
        { type: 'practice', title: 'Übung: Angebote prüfen', questionIds: ['h01-q027', 'h01-q028', 'h01-q033', 'h01-q036'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Muss-Kriterien zuerst prüfen (K.-o.), dann bewerten.',
            'Auf Details achten: Dual-Channel, SATA vs. NVMe, digitale Ausgänge, verlöteter RAM, Service.',
            'Empfehlung immer mit Bezug auf die Anforderungen begründen.',
          ],
        },
      ],
    },
  ],
  /* ==================================================================== */
  questions: [
    {
      id: 'h01-q001', kind: 'match', skill: 'hw.pc.devices', difficulty: 1,
      prompt: `Ordne die Einsatzszenarien der Elektro Krämer GmbH der passenden Geräteklasse zu.`,
      left: ['Callcenter mit zentraler VDI-Umgebung', 'Konstruktion mit 3D-CAD', 'Datenbank im Rechenzentrum, 24/7', 'Lagermitarbeiter scannt Ware per Touch-App'],
      right: ['Thin Client', 'Workstation', 'Server', 'Tablet'],
      answer: [0, 1, 2, 3],
      explanation: 'VDI → Thin Client; CAD → Workstation; 24/7-Dienst → Server; mobile Touch-App → Tablet.',
    },
    {
      id: 'h01-q002', kind: 'free', skill: 'hw.pc.devices', difficulty: 2,
      prompt: `Die Geschäftsleitung überlegt, im Callcenter (20 Plätze) **Thin Clients** statt normaler PCs einzusetzen. Nenne je **zwei Vorteile und zwei Nachteile**.`,
      modelAnswer: 'Vorteile: 1. Zentrale Verwaltung und Softwareverteilung auf dem Server (weniger Administrationsaufwand). 2. Daten bleiben im Rechenzentrum (Datensicherheit, kein Datenverlust bei Gerätediebstahl). Außerdem geringer Energieverbrauch, lange Nutzungsdauer, schneller Austausch. Nachteile: 1. Abhängigkeit von Netzwerk und Server – fällt einer aus, kann niemand arbeiten. 2. Höhere Anforderungen und Kosten auf der Serverseite (Terminalserver/VDI, Lizenzen). Außerdem eingeschränkte Leistung für Multimedia/Spezialhardware.',
      keywords: ['zentrale Verwaltung', 'Energieverbrauch', 'Datensicherheit', 'Netzwerkabhängigkeit', 'Serverlast', 'Lizenzen'],
      hints: ['Denke an Verwaltung, Sicherheit, Energie – und daran, was passiert, wenn das Netz ausfällt.'],
      explanation: 'Thin Clients verlagern Rechenleistung und Daten auf den Server – das bringt Zentralisierung, aber auch eine Abhängigkeit.',
    },
    {
      id: 'h01-q003', kind: 'single', skill: 'hw.pc.devices', difficulty: 1,
      prompt: `Welche Geräteklasse ist typischerweise mit **ECC-RAM, redundanten Netzteilen und Fernwartungs-Controller (BMC)** ausgestattet?`,
      options: ['Ultrabook', 'Server', 'Thin Client', 'All-in-One-PC'],
      answer: 1,
      distractors: {
        '0': { why: 'Ultrabooks sind auf Mobilität optimiert, nicht auf Ausfallsicherheit.', error: 'geraeteklasse-verwechselt' },
        '2': { why: 'Thin Clients sind einfache Endgeräte ohne Redundanz.', error: 'geraeteklasse-verwechselt' },
        '3': { why: 'AiO-PCs sind Arbeitsplatzrechner ohne Server-Redundanzmerkmale.', error: 'geraeteklasse-verwechselt' },
      },
      explanation: 'Server laufen rund um die Uhr; ECC, Redundanz und Fernwartung (z. B. iDRAC, iLO, IPMI) sichern die Verfügbarkeit.',
    },
    {
      id: 'h01-q004', kind: 'multi', skill: 'hw.pc.devices', difficulty: 2,
      prompt: `Welche Merkmale sprechen für den Einsatz einer **Workstation** statt eines Standard-Büro-PCs?`,
      options: ['ISV-zertifizierte Grafikkarte für CAD-Software', 'ECC-Arbeitsspeicher', 'Besonders geringer Stromverbrauch', 'Viel Arbeitsspeicher (z. B. 64–128 GB)', 'Passiv gekühlt ohne Lüfter'],
      answer: [0, 1, 3],
      explanation: 'Workstations bieten ISV-zertifizierte Grafik, ECC und viel RAM. Sie verbrauchen eher mehr Strom und sind aktiv gekühlt.',
    },
    {
      id: 'h01-q005', kind: 'number', skill: 'hw.pc.devices', difficulty: 2,
      prompt: `Ein Serverschrank hat **42 HE** nutzbare Einbauhöhe. Wie viel **mm** sind das? (1 HE = 44,45 mm, auf eine Nachkommastelle)`,
      answer: 1866.9, tolerance: 0.05, unit: 'mm',
      misconceptions: [{ answer: '73.5', error: 'he-zoll', why: '42 · 1,75 = 73,5 ist die Höhe in **Zoll**. Gefragt sind Millimeter (· 25,4).' }],
      explanation: '42 · 44,45 mm = **1.866,9 mm** (≈ 1,87 m).',
    },
    {
      id: 'h01-q006', kind: 'table', skill: 'hw.pc.mainboard', difficulty: 1,
      prompt: `Trage zu den Abmessungen den passenden **Mainboard-Formfaktor** ein.`,
      columns: [{ key: 'ff', label: 'Formfaktor', type: 'text' }],
      rows: [
        { label: '305 × 244 mm', cells: { ff: { answer: 'ATX', accept: ['standard-atx'] } } },
        { label: '244 × 244 mm', cells: { ff: { answer: 'Micro-ATX', accept: ['microatx', 'micro atx', 'µATX', 'matx', 'm-atx'] } } },
        { label: '170 × 170 mm', cells: { ff: { answer: 'Mini-ITX', accept: ['miniitx', 'mini itx', 'mitx'] } } },
      ],
      explanation: 'ATX 305 × 244 mm, Micro-ATX 244 × 244 mm, Mini-ITX 170 × 170 mm.',
    },
    {
      id: 'h01-q007', kind: 'number', skill: 'hw.pc.mainboard', difficulty: 2,
      prompt: `PCIe 4.0 überträgt **rund 2 GB/s pro Lane und Richtung**. Welche Datenrate (je Richtung) ergibt sich näherungsweise für eine NVMe-SSD mit **x4**-Anbindung in **GB/s**?`,
      answer: 8, tolerance: 0.2, unit: 'GB/s',
      misconceptions: [{ answer: '0.5', error: 'pcie-lanes', why: 'Die Lanes arbeiten parallel – die Datenrate wird **multipliziert**, nicht geteilt.' }],
      explanation: '4 Lanes · ≈ 2 GB/s = **≈ 8 GB/s** (genau ≈ 7,9 GB/s). Real erreichen PCIe-4.0-SSDs ca. 7 GB/s.',
    },
    {
      id: 'h01-q008', kind: 'single', skill: 'hw.pc.mainboard', difficulty: 2,
      prompt: `Welche Aussage zu **PCI Express** ist korrekt?`,
      options: ['PCIe ist ein paralleler Bus, alle Karten teilen sich die Bandbreite.', 'PCIe arbeitet seriell mit Punkt-zu-Punkt-Verbindungen (Lanes); jede Generation verdoppelt etwa die Rate pro Lane.', 'PCIe-Karten passen nur in Steckplätze derselben Generation.', 'PCIe wird nur für Grafikkarten verwendet.'],
      answer: 1,
      distractors: {
        '0': { why: 'Das beschreibt den alten PCI-Bus. PCIe nutzt serielle Punkt-zu-Punkt-Lanes.', error: 'pcie-grundlagen' },
        '2': { why: 'PCIe ist auf- und abwärtskompatibel; es gilt die gemeinsame (niedrigere) Generation.', error: 'pcie-kompatibilitaet' },
        '3': { why: 'Auch NVMe-SSDs, Netzwerkkarten, Controller u. v. m. nutzen PCIe.', error: 'pcie-grundlagen' },
      },
      explanation: 'PCIe = seriell, Lanes x1–x16, Punkt-zu-Punkt, ca. Verdopplung pro Generation, kompatibel zwischen Generationen.',
    },
    {
      id: 'h01-q009', kind: 'single', skill: 'hw.pc.mainboard', difficulty: 1,
      prompt: `Ein Kunde kauft eine CPU für **Sockel AM5** und ein Mainboard mit **Sockel LGA 1851**. Was ist das Problem?`,
      options: ['Kein Problem, ein BIOS-Update genügt.', 'CPU und Mainboard sind nicht kompatibel – der Sockel muss übereinstimmen.', 'Nur der Arbeitsspeicher muss getauscht werden.', 'Die CPU läuft mit halber Geschwindigkeit.'],
      answer: 1,
      distractors: {
        '0': { why: 'Ein BIOS-Update kann neue CPUs für **denselben** Sockel freischalten – einen anderen Sockel ersetzt es nie.', error: 'sockel-inkompatibel' },
        '2': { why: 'Der RAM ist hier nicht das Problem; die CPU passt mechanisch nicht.', error: 'sockel-inkompatibel' },
        '3': { why: 'Die CPU passt gar nicht in den Sockel.', error: 'sockel-inkompatibel' },
      },
      explanation: 'AM5 (AMD) und LGA 1851 (Intel) sind völlig verschiedene Sockel. CPU und Board müssen denselben Sockel haben (und der Chipsatz/BIOS muss die CPU unterstützen).',
    },
    {
      id: 'h01-q010', kind: 'free', skill: 'hw.pc.cpu', difficulty: 2,
      prompt: `Erläutere den Unterschied zwischen **Kernen** und **Threads** eines Prozessors.`,
      modelAnswer: 'Ein Kern ist eine eigenständige Recheneinheit der CPU mit eigenen Rechenwerken. Ein Thread ist ein Befehlsstrang, den das Betriebssystem einem (logischen) Prozessor zuweist. Mit SMT (Simultaneous Multithreading, bei Intel Hyper-Threading) kann ein physischer Kern zwei Threads gleichzeitig bearbeiten, indem er ungenutzte Rechenwerke besser auslastet. Daher hat z. B. eine 8-Kern-CPU mit SMT 16 Threads; der Leistungsgewinn durch SMT ist aber geringer als durch echte zusätzliche Kerne.',
      keywords: ['Recheneinheit', 'Befehlsstrang', 'SMT', 'Hyper-Threading', 'logische Prozessoren'],
      explanation: 'Kerne = Hardware; Threads = gleichzeitig bearbeitbare Befehlsstränge (logische Prozessoren).',
    },
    {
      id: 'h01-q011', kind: 'single', skill: 'hw.pc.cpu', difficulty: 2,
      prompt: `Warum ist ein Vergleich von CPUs **nur anhand der Taktfrequenz** problematisch?`,
      options: ['Weil die Taktfrequenz in MHz statt GHz angegeben wird.', 'Weil verschiedene Architekturen pro Takt unterschiedlich viele Befehle ausführen (IPC) und Kernzahl/Cache ebenfalls zählen.', 'Weil höherer Takt immer langsamer ist.', 'Weil die Taktfrequenz nur bei Servern angegeben wird.'],
      answer: 1,
      distractors: {
        '0': { why: 'Die Einheit lässt sich umrechnen – das ist nicht das Problem.', error: 'cpu-takt' },
        '2': { why: 'Bei gleicher Architektur ist höherer Takt schneller – nur architekturübergreifend ist der Vergleich unzuverlässig.', error: 'cpu-takt' },
        '3': { why: 'Die Taktfrequenz steht in jedem CPU-Datenblatt.', error: 'cpu-takt' },
      },
      explanation: 'Leistung ≈ Takt · IPC · (genutzte) Kerne. Für Vergleiche Benchmarks heranziehen.',
    },
    {
      id: 'h01-q012', kind: 'match', skill: 'hw.pc.cpu', difficulty: 1,
      prompt: `Ordne die CPU-Kenngrößen ihrer Bedeutung zu.`,
      left: ['Cache', 'TDP', 'Sockel', 'Boost-Takt', 'iGPU'],
      right: ['schneller Zwischenspeicher auf dem Chip', 'abzuführende Wärmeleistung in Watt', 'mechanische Schnittstelle zum Mainboard', 'maximale Taktfrequenz unter günstigen Bedingungen', 'in die CPU integrierte Grafikeinheit'],
      answer: [0, 1, 2, 3, 4],
      explanation: 'Siehe Lektion „Der Prozessor“.',
    },
    {
      id: 'h01-q013', kind: 'multi', skill: 'hw.pc.cpu', difficulty: 2,
      prompt: `Du rüstest einen PC mit einer neuen CPU auf. Was musst du **prüfen**?`,
      options: ['Passt der Sockel des Mainboards?', 'Unterstützt das Mainboard (Chipsatz/BIOS-Version) die CPU?', 'Reicht der CPU-Kühler für die TDP?', 'Hat der Monitor die passende Bildwiederholrate?', 'Ist die Tastatur USB 3.0-fähig?'],
      answer: [0, 1, 2],
      explanation: 'Sockel, BIOS-/Chipsatz-Unterstützung und Kühlung (und ggf. Netzteil) müssen passen. Monitor und Tastatur sind unabhängig.',
    },
    {
      id: 'h01-q014', kind: 'number', skill: 'hw.pc.ram', difficulty: 2,
      prompt: `Wie hoch ist die theoretische Speicherbandbreite in **GB/s** bei **DDR4-3200 im Dual-Channel-Betrieb**? (1 GB = 1000 MB)`,
      answer: 51.2, tolerance: 0.05, unit: 'GB/s',
      misconceptions: [{ answer: '25.6', error: 'ram-kanaele', why: 'Das ist ein Kanal. Im Dual-Channel verdoppelt sich die Bandbreite.' }, { answer: '409.6', error: 'ram-bit-byte', why: '64 Bit = 8 Byte – mit 8 multiplizieren, nicht mit 64.' }],
      explanation: '3200 MT/s · 8 Byte = 25.600 MB/s pro Kanal · 2 = 51.200 MB/s = **51,2 GB/s**.',
    },
    {
      id: 'h01-q015', kind: 'text', skill: 'hw.pc.ram', difficulty: 2,
      prompt: `Wie lautet die **PC-Modulbezeichnung** für DDR5-4800 (Form „PC5-…“)?`,
      accept: ['PC5-38400', 'PC5 38400', 'pc538400'],
      explanation: '4800 MT/s · 8 Byte = 38.400 MB/s → **PC5-38400**.',
    },
    {
      id: 'h01-q016', kind: 'single', skill: 'hw.pc.ram', difficulty: 1,
      prompt: `Ein Kollege will ein DDR5-Modul in ein Mainboard mit DDR4-Steckplätzen einsetzen. Was passiert?`,
      options: ['Es funktioniert mit DDR4-Geschwindigkeit.', 'Es passt nicht – die Kerbe ist anders positioniert; DDR4 und DDR5 sind nicht kompatibel.', 'Es funktioniert nach einem BIOS-Update.', 'Es funktioniert, aber nur im Single-Channel.'],
      answer: 1,
      distractors: {
        '0': { why: 'Anders als bei PCIe gibt es bei DDR-Generationen keine Abwärtskompatibilität.', error: 'ram-generation' },
        '2': { why: 'Ein BIOS-Update ändert nicht die mechanische Kodierung und den Speichercontroller.', error: 'ram-generation' },
        '3': { why: 'Das Modul passt mechanisch gar nicht.', error: 'ram-generation' },
      },
      explanation: 'Jede DDR-Generation hat eine andere Kerbenposition und andere elektrische Eigenschaften – das Mainboard legt den RAM-Typ fest.',
    },
    {
      id: 'h01-q017', kind: 'free', skill: 'hw.pc.ram', difficulty: 2,
      prompt: `Für den neuen Datenbankserver empfiehlt der Händler **ECC-RAM**. Erläutere, was ECC bewirkt und warum es dort sinnvoll ist.`,
      modelAnswer: 'ECC (Error Correcting Code) speichert zusätzliche Prüfbits zu den Daten. Damit können Einzelbitfehler im Arbeitsspeicher (z. B. durch Strahlung oder elektrische Störungen) erkannt und automatisch korrigiert sowie Mehrbitfehler erkannt werden. Ein Datenbankserver läuft rund um die Uhr und verarbeitet wichtige Daten – unerkannte Bitfehler könnten Daten verfälschen oder zu Abstürzen führen. ECC erhöht daher Datenintegrität und Verfügbarkeit. CPU und Mainboard müssen ECC unterstützen.',
      keywords: ['Prüfbits', 'Bitfehler', 'korrigieren', 'Datenintegrität', 'Verfügbarkeit', '24/7'],
      explanation: 'ECC = Fehlerkorrektur im RAM → Integrität und Stabilität im Dauerbetrieb.',
    },
    {
      id: 'h01-q018', kind: 'single', skill: 'hw.pc.ram', difficulty: 2,
      prompt: `Welche Aussage zum **On-Die-ECC von DDR5** ist richtig?`,
      options: ['Es ersetzt vollwertiges ECC; jeder DDR5-PC ist damit serverfähig.', 'Es korrigiert Fehler nur innerhalb des Speicherchips und ersetzt kein ECC-Modul mit zusätzlichen Prüfbits auf dem Übertragungsweg.', 'Es funktioniert nur mit ECC-fähigen CPUs.', 'Es verdoppelt die Speicherbandbreite.'],
      answer: 1,
      distractors: {
        '0': { why: 'On-Die-ECC verbessert die Zuverlässigkeit der dichten Chips, schützt aber nicht den Weg zum Speichercontroller.', error: 'ram-ecc' },
        '2': { why: 'On-Die-ECC arbeitet chipintern und ist immer aktiv – unabhängig von der CPU.', error: 'ram-ecc' },
        '3': { why: 'Mit Bandbreite hat ECC nichts zu tun.', error: 'ram-ecc' },
      },
      explanation: 'Für Server/Workstations braucht man weiterhin echte ECC-Module (z. B. ECC-UDIMM oder RDIMM) und ECC-fähige Plattformen.',
    },
    {
      id: 'h01-q019', kind: 'number', skill: 'hw.pc.ram', difficulty: 3,
      prompt: `Eine Workstation hat **4 Speicherkanäle** und ist mit **DDR5-5600** bestückt (je Kanal ein Modul). Welche theoretische Bandbreite ergibt sich in **GB/s**? (1 GB = 1000 MB, eine Nachkommastelle)`,
      answer: 179.2, tolerance: 0.05, unit: 'GB/s',
      misconceptions: [{ answer: '44.8', error: 'ram-kanaele', why: 'Das ist nur ein Kanal – mit 4 multiplizieren.' }, { answer: '89.6', error: 'ram-kanaele', why: 'Das wäre Dual-Channel. Hier sind es 4 Kanäle.' }],
      explanation: '5600 · 8 = 44.800 MB/s pro Kanal · 4 = 179.200 MB/s = **179,2 GB/s**.',
    },
    {
      id: 'h01-q020', kind: 'single', skill: 'hw.pc.gpu', difficulty: 2,
      prompt: `Ein Mitarbeiter der Konstruktion arbeitet mit einer professionellen 3D-CAD-Software. Der Softwarehersteller unterstützt nur **zertifizierte** Grafiklösungen. Was wählst du?`,
      options: ['Integrierte Grafik', 'Eine ISV-zertifizierte Workstation-Grafikkarte', 'Die günstigste Gaming-Grafikkarte', 'Einen zweiten Monitor statt einer Grafikkarte'],
      answer: 1,
      distractors: {
        '0': { why: 'Für 3D-CAD reicht die iGPU leistungsmäßig nicht und ist nicht zertifiziert.', error: 'grafik-auswahl' },
        '2': { why: 'Gaming-Karten sind oft nicht ISV-zertifiziert – bei Problemen gibt es keinen Support des CAD-Herstellers.', error: 'grafik-auswahl' },
        '3': { why: 'Ein Monitor ersetzt keine Grafikleistung.', error: 'grafik-auswahl' },
      },
      explanation: 'ISV-Zertifizierung = der Softwarehersteller hat Karte und Treiber getestet und unterstützt sie.',
    },
    {
      id: 'h01-q021', kind: 'free', skill: 'hw.pc.psu', difficulty: 2,
      prompt: `Beschreibe, wie du die **Leistung eines Netzteils** für einen neuen PC dimensionierst, und begründe, warum ein stark überdimensioniertes Netzteil nicht sinnvoll ist.`,
      modelAnswer: 'Zuerst die maximale Leistungsaufnahme aller Komponenten laut Datenblatt addieren (CPU, Grafikkarte, Mainboard, RAM, Laufwerke, Lüfter, USB-Geräte). Dann eine Reserve von etwa 20–30 % für Lastspitzen, Alterung und Erweiterungen aufschlagen und die nächstgrößere Netzteilgröße wählen. Ein stark überdimensioniertes Netzteil arbeitet im Alltag nur mit geringer Last; dort ist der Wirkungsgrad schlechter (Optimum meist um 50 % Last). Es verursacht also höhere Verluste, mehr Stromkosten und höhere Anschaffungskosten.',
      keywords: ['Summe', 'Reserve', 'Wirkungsgrad', 'Teillast', '50 %', 'Kosten'],
      explanation: 'Summe + Reserve; Überdimensionierung → schlechter Wirkungsgrad im Teillastbereich.',
    },
    {
      id: 'h01-q022', kind: 'number', skill: 'hw.pc.psu', difficulty: 2,
      prompt: `CPU 65 W, Grafikkarte 200 W, übrige Komponenten 50 W. Mit **30 % Reserve**: Welche Netzteilleistung in **W** ist mindestens nötig? (eine Nachkommastelle)`,
      answer: 409.5, tolerance: 0.05, unit: 'W',
      misconceptions: [{ answer: '315', error: 'netzteil-reserve', why: 'Die Reserve fehlt – 315 W · 1,3.' }, { answer: '345', error: 'netzteil-reserve', why: '30 % sind kein fester Zuschlag von 30 W: 315 W · 1,3.' }],
      explanation: '65 + 200 + 50 = 315 W; 315 W · 1,3 = **409,5 W** → z. B. 450-W-Netzteil.',
    },
    {
      id: 'h01-q023', kind: 'order', skill: 'hw.pc.firmware', difficulty: 2,
      prompt: `Bringe den Startvorgang eines UEFI-Systems in die richtige Reihenfolge.`,
      items: ['Netzteil liefert stabile Spannungen, CPU startet die Firmware', 'POST: Hardware wird geprüft und initialisiert', 'UEFI liest den Booteintrag und prüft per Secure Boot die Signatur des Bootloaders', 'Bootloader auf der EFI-Systempartition lädt den Betriebssystemkern', 'Betriebssystem startet Dienste und zeigt die Anmeldung'],
      explanation: 'Strom → Firmware → POST → Bootloader (signiert) → Kernel → Anmeldung.',
    },
    {
      id: 'h01-q024', kind: 'match', skill: 'hw.pc.firmware', difficulty: 2,
      prompt: `Ordne die Begriffe ihrer Beschreibung zu.`,
      left: ['GPT', 'MBR', 'TPM 2.0', 'Secure Boot', 'CSM'],
      right: ['Partitionsschema für UEFI-Systeme', 'Partitionsschema des Legacy-BIOS (max. 2 TiB)', 'Sicherheitschip zur geschützten Schlüsselspeicherung', 'startet nur signierte Bootloader', 'Kompatibilitätsmodus, der ein BIOS emuliert'],
      answer: [0, 1, 2, 3, 4],
      explanation: 'GPT/MBR = Partitionsschemata; TPM = Schlüsselspeicher; Secure Boot = Signaturprüfung; CSM = BIOS-Emulation.',
    },
    {
      id: 'h01-q025', kind: 'multi', skill: 'hw.pc.firmware', difficulty: 2,
      prompt: `Welche der folgenden Punkte gehören zu den **Mindestanforderungen von Windows 11**?`,
      options: ['TPM 2.0', 'UEFI mit Secure-Boot-Fähigkeit', 'mind. 4 GB RAM', 'mind. 64 GB Speicherplatz', 'Legacy-BIOS mit MBR', 'dedizierte Grafikkarte'],
      answer: [0, 1, 2, 3],
      explanation: 'TPM 2.0, UEFI/Secure Boot, 4 GB RAM, 64 GB Speicher, kompatible 64-Bit-CPU. Legacy-BIOS genügt nicht; eine dedizierte GPU ist nicht nötig (DirectX-12-fähige Grafik, das kann die iGPU).',
    },
    {
      id: 'h01-q026', kind: 'free', skill: 'hw.pc.firmware', difficulty: 2,
      prompt: `Wozu dient ein **TPM 2.0** in einem Firmen-Notebook? Nenne zwei Einsatzzwecke.`,
      modelAnswer: 'Das TPM (Trusted Platform Module) ist ein Sicherheitschip bzw. eine Firmware-Funktion der CPU, die kryptografische Schlüssel geschützt speichert und Kryptofunktionen bereitstellt. Einsatzzwecke: 1. BitLocker-Laufwerksverschlüsselung – der Schlüssel wird im TPM gespeichert und nur bei unverändertem Startvorgang freigegeben. 2. Windows Hello / Anmeldung mit PIN oder biometrisch, Speicherung von Zertifikaten. Außerdem Messung des Bootvorgangs (Measured Boot) und Voraussetzung für Windows 11.',
      keywords: ['Schlüssel', 'BitLocker', 'Verschlüsselung', 'Windows Hello', 'Measured Boot'],
      explanation: 'TPM = Hardware-Vertrauensanker für Schlüssel und Integritätsmessung.',
    },
    {
      id: 'h01-q027', kind: 'table', skill: 'hw.pc.select', difficulty: 2,
      prompt: `Für den Empfang in Hamburg wird ein PC gesucht. **Muss-Kriterien:** mind. 16 GB RAM, SSD mind. 256 GB, TPM 2.0, mind. 2 digitale Monitoranschlüsse.\n\n| Angebot | RAM | Speicher | TPM | Monitoranschlüsse |\n|---|---|---|---|---|\n| A | 16 GB | 512 GB SSD | 2.0 | 2 × DP |\n| B | 8 GB | 512 GB SSD | 2.0 | HDMI + DP |\n| C | 16 GB | 1 TB HDD | 2.0 | HDMI + DP |\n| D | 32 GB | 256 GB SSD | 2.0 | HDMI + VGA |\n\nTrage für jedes Angebot **ja** oder **nein** ein (alle Muss-Kriterien erfüllt?).`,
      columns: [{ key: 'ok', label: 'erfüllt (ja/nein)', type: 'text' }],
      rows: [
        { label: 'Angebot A', cells: { ok: { answer: 'ja' } } },
        { label: 'Angebot B', cells: { ok: { answer: 'nein' } } },
        { label: 'Angebot C', cells: { ok: { answer: 'nein' } } },
        { label: 'Angebot D', cells: { ok: { answer: 'nein' } } },
      ],
      explanation: 'B: nur 8 GB RAM. C: HDD statt SSD. D: VGA ist analog → nur ein digitaler Anschluss. Nur **A** erfüllt alle Muss-Kriterien.',
    },
    {
      id: 'h01-q028', kind: 'free', skill: 'hw.pc.select', difficulty: 3,
      prompt: `Die Elektro Krämer GmbH will 15 Arbeitsplätze im Vertrieb erneuern. Ein Kollege schlägt vor, einfach das **günstigste Angebot** zu nehmen. Erläutere, welche weiteren Kriterien bei der Auswahl berücksichtigt werden sollten, und wie man mehrere Kriterien sinnvoll gegeneinander abwägt.`,
      modelAnswer: 'Neben dem Anschaffungspreis zählen: Erfüllung der technischen Muss-Anforderungen (RAM, SSD, Anschlüsse, Betriebssystem, TPM), Energieverbrauch und damit Betriebskosten über die Nutzungsdauer (Total Cost of Ownership), Garantie und Service (z. B. 3 Jahre Vor-Ort am nächsten Arbeitstag), Erweiterbarkeit und Lebensdauer, Einheitlichkeit der Geräte (einfachere Administration/Images), Lieferzeit, Ergonomie/Lautstärke sowie Umweltzeichen. Zur Abwägung eignet sich eine Nutzwertanalyse: Kriterien festlegen, gewichten (Summe 100 %), jedes Angebot je Kriterium bepunkten, Punkte mit Gewichtung multiplizieren und summieren. Das Angebot mit dem höchsten Nutzwert wird empfohlen – vorher werden Angebote ausgeschieden, die Muss-Kriterien nicht erfüllen.',
      keywords: ['Muss-Kriterien', 'Betriebskosten', 'TCO', 'Garantie', 'Service', 'Nutzwertanalyse', 'Gewichtung'],
      explanation: 'Günstig in der Anschaffung ≠ wirtschaftlich. TCO und Nutzwertanalyse gehören zur Begründung.',
    },
    {
      id: 'h01-q029', kind: 'single', skill: 'hw.pc.cpu', difficulty: 2,
      prompt: `Was bedeutet die Angabe **„6 P-Cores + 8 E-Cores“** in einem CPU-Datenblatt?`,
      options: ['6 Kerne mit Prüfcode und 8 Kerne ohne', 'Hybrid-Architektur: 6 Performance-Kerne für hohe Last und 8 effiziente Kerne für Hintergrundaufgaben', '6 physische und 8 virtuelle Kerne', '6 Kerne für Windows und 8 für Linux'],
      answer: 1,
      distractors: {
        '0': { why: 'P/E steht für Performance/Efficient, nicht für Prüfcodes.', error: 'cpu-hybrid' },
        '2': { why: 'E-Cores sind echte physische Kerne, nur einfacher und sparsamer aufgebaut.', error: 'cpu-hybrid' },
        '3': { why: 'Die Kerne werden vom Betriebssystem-Scheduler beliebig genutzt.', error: 'cpu-hybrid' },
      },
      explanation: 'P-Cores: hohe Einzelleistung (oft mit SMT). E-Cores: sparsam, gut für parallele Hintergrundlast.',
    },
    {
      id: 'h01-q030', kind: 'text', skill: 'hw.pc.firmware', difficulty: 1,
      prompt: `Wie heißt der beim Einschalten durchgeführte **Selbsttest** der Hardware (Abkürzung)?`,
      accept: ['POST', 'Power-On Self-Test', 'Power On Self Test'],
      explanation: '**POST** – Power-On Self-Test. Fehler werden per Piepcode, LED oder Meldung signalisiert.',
    },
    {
      id: 'h01-q031', kind: 'number', skill: 'hw.pc.cpu', difficulty: 3,
      prompt: `Datenblatt-Auszug: „**8 P-Cores (Hyper-Threading), 16 E-Cores**, Base Power 125 W“. Wie viele **Threads** stellt die CPU bereit?`,
      answer: 32, unit: 'Threads',
      misconceptions: [{ answer: '48', error: 'cpu-threads', why: 'Nur die P-Cores haben Hyper-Threading: 8 · 2 + 16 = 32.' }, { answer: '24', error: 'cpu-threads', why: 'Das ist die Zahl der Kerne. P-Cores mit Hyper-Threading bearbeiten je 2 Threads.' }],
      explanation: '8 · 2 + 16 · 1 = **32 Threads**.',
    },
    {
      id: 'h01-q032', kind: 'single', skill: 'hw.pc.mainboard', difficulty: 1,
      prompt: `Über welches Bussystem sind **NVMe-SSDs** und **Grafikkarten** angebunden?`,
      options: ['SATA', 'PCI Express (PCIe)', 'USB', 'IDE/PATA'],
      answer: 1,
      distractors: {
        '0': { why: 'SATA nutzen 2,5"/3,5"-Laufwerke und M.2-SATA-SSDs – nicht NVMe.', error: 'bus-verwechselt' },
        '2': { why: 'USB ist eine externe Peripherieschnittstelle.', error: 'bus-verwechselt' },
        '3': { why: 'IDE/PATA ist veraltet.', error: 'bus-verwechselt' },
      },
      explanation: 'NVMe ist ein Protokoll für SSDs über **PCIe**; Grafikkarten stecken im PCIe-x16-Slot.',
    },
    {
      id: 'h01-q033', kind: 'free', skill: 'hw.pc.select', difficulty: 2,
      prompt: `Ein Kunde möchte für Empfang und Besprechungsraum möglichst platzsparende Geräte. Vergleiche **Mini-PC** und **All-in-One-PC** hinsichtlich Wartung/Aufrüstbarkeit und Flexibilität.`,
      modelAnswer: 'Ein Mini-PC ist ein sehr kleines separates Gehäuse, das z. B. per VESA-Halterung hinter den Monitor geschraubt wird. Monitor und Rechner sind getrennt: Fällt einer aus, wird nur dieser getauscht; der Monitor kann frei gewählt (Größe, Ergonomie) und weiterverwendet werden. RAM/SSD sind oft noch tauschbar. Ein All-in-One-PC integriert den Rechner im Monitorgehäuse: sehr aufgeräumt, wenige Kabel, aber bei einem Defekt fällt die gesamte Einheit aus; Aufrüstung ist schwierig, der Bildschirm kann nicht separat getauscht oder ergonomisch frei gewählt werden. Für flexible, wartungsfreundliche Lösungen spricht daher eher der Mini-PC.',
      keywords: ['getrennt', 'Austausch', 'Aufrüstbarkeit', 'VESA', 'integriert', 'Ausfall'],
      explanation: 'Getrennte Komponenten = einfachere Wartung und mehr Flexibilität.',
    },
    {
      id: 'h01-q034', kind: 'text', skill: 'hw.pc.cpu', difficulty: 1,
      prompt: `Wofür steht die Abkürzung **NPU** bei aktuellen Prozessoren?`,
      accept: ['Neural Processing Unit', 'neural processing unit', 'neuronale Verarbeitungseinheit'],
      explanation: '**Neural Processing Unit** – spezialisierte Recheneinheit für KI-Funktionen (Leistung in TOPS). Microsofts „Copilot+ PCs“ setzen eine NPU mit mindestens 40 TOPS voraus.',
    },
    {
      id: 'h01-q035', kind: 'match', skill: 'hw.pc.mainboard', difficulty: 1,
      prompt: `Ordne die Mainboard-Anschlüsse der passenden Komponente zu.`,
      left: ['DIMM-Slot', 'PCIe x16', 'M.2 (Key M)', 'SATA-Port', '24-pin ATX'],
      right: ['Arbeitsspeicher', 'Grafikkarte', 'NVMe-SSD', '2,5"-SSD oder Festplatte', 'Stromversorgung vom Netzteil'],
      answer: [0, 1, 2, 3, 4],
      explanation: 'DIMM → RAM; PCIe x16 → Grafik; M.2 → SSD; SATA → 2,5"/3,5"-Laufwerk; 24-pin → Netzteil.',
    },
    {
      id: 'h01-q036', kind: 'single', skill: 'hw.pc.select', difficulty: 2,
      prompt: `Im Angebot steht: „RAM: 16 GB DDR5 (1 × 16 GB), 2 Steckplätze“. Die Anforderung lautet „16 GB im Dual-Channel“. Wie bewertest du das?`,
      options: ['Erfüllt – 16 GB sind vorhanden.', 'Nicht erfüllt – mit nur einem Modul läuft der RAM im Single-Channel; man müsste 2 × 8 GB bestellen.', 'Erfüllt, weil DDR5 automatisch Dual-Channel ist.', 'Nicht prüfbar.'],
      answer: 1,
      distractors: {
        '0': { why: 'Die Kapazität stimmt, aber die Anforderung „Dual-Channel“ nicht.', error: 'ram-kanaele' },
        '2': { why: 'Die zwei 32-Bit-Subkanäle eines DDR5-Moduls ersetzen nicht den zweiten 64-Bit-Speicherkanal des Controllers.', error: 'ram-kanaele' },
        '3': { why: 'Aus „1 × 16 GB“ ist eindeutig ablesbar, dass nur ein Modul verbaut ist.', error: 'ram-kanaele' },
      },
      explanation: 'Dual-Channel braucht (mindestens) zwei Module in den richtigen Slots.',
    },
    {
      id: 'h01-q037', kind: 'free', skill: 'hw.pc.gpu', difficulty: 2,
      prompt: `Ein Controller möchte an seinem Büro-PC (nur integrierte Grafik) **drei Monitore** betreiben. Beschreibe, was du im Datenblatt von PC bzw. Mainboard prüfst, bevor du eine zusätzliche Grafikkarte bestellst.`,
      modelAnswer: 'Zuerst prüfen, wie viele Bildschirme die integrierte Grafik gleichzeitig unterstützt (z. B. „bis zu 3 bzw. 4 Displays“) und welche digitalen Ausgänge am Mainboard/PC tatsächlich vorhanden sind (HDMI, DisplayPort, USB-C mit DP Alt Mode). Dann die unterstützte Auflösung und Bildwiederholrate je Ausgang mit den Monitoren abgleichen; ggf. kann man über DisplayPort-MST (Daisy Chain) Monitore hintereinanderschalten. Reicht das nicht, wird eine dedizierte Grafikkarte benötigt – dann prüfen: freier PCIe-x16-Slot, Bauhöhe/Länge (z. B. Low-Profile im kleinen Gehäuse), Leistungsreserve und Anschlüsse des Netzteils.',
      keywords: ['Anzahl Displays', 'Ausgänge', 'DisplayPort', 'MST', 'PCIe-Slot', 'Low-Profile', 'Netzteil'],
      explanation: 'Oft reicht die iGPU mit passenden Ausgängen; sonst Slot, Bauform und Netzteil prüfen.',
    },
  ],
};
