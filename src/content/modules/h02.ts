import type { Module } from '../types';

export const h02: Module = {
  id: 'h02',
  nr: 2,
  area: 'hardware',
  title: 'Speicher & Speichertechnik',
  short: `HDD und SSD, SATA/NVMe/M.2, Kenngrößen wie IOPS, TBW und MTBF, Kapazitäten richtig umrechnen sowie DAS, NAS und SAN.`,
  icon: 'HardDrive',
  relevance: 'ap1',
  prerequisites: ['h01'],
  generators: ['hw.kapazitaet', 'hw.tbw'],
  skills: [
    { id: 'hw.storage.hddssd', module: 'h02', title: 'HDD und SSD: Aufbau und Unterschiede' },
    { id: 'hw.storage.interfaces', module: 'h02', title: 'SATA, SAS, NVMe und M.2', requires: ['hw.storage.hddssd'] },
    { id: 'hw.storage.metrics', module: 'h02', title: 'Kenngrößen: Datenrate, IOPS, TBW, MTBF', requires: ['hw.storage.hddssd'] },
    { id: 'hw.storage.capacity', module: 'h02', title: 'Kapazität: Herstellerangabe vs. Anzeige im OS' },
    { id: 'hw.storage.media', module: 'h02', title: 'Speichermedien für Transport und Archiv' },
    { id: 'hw.storage.networked', module: 'h02', title: 'DAS, NAS und SAN unterscheiden' },
  ],
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'h02-l01',
      title: 'HDD und SSD – Aufbau und Unterschiede',
      minutes: 15,
      relevance: 'ap1',
      skills: ['hw.storage.hddssd'],
      steps: [
        {
          type: 'explain',
          title: 'Mechanik gegen Flash',
          body: `Massenspeicher behalten Daten auch **ohne Strom** (nichtflüchtig) – im Gegensatz zum RAM.

**HDD (Hard Disk Drive)** – magnetisch beschichtete Scheiben (Platter) drehen sich mit **5.400 oder 7.200 U/min** (Server-SAS-Platten auch 10.000/15.000). Schreib-/Leseköpfe schweben auf einem Luftpolster darüber und werden von einem Aktuator positioniert.
- Für jeden Zugriff muss der Kopf zur Spur fahren (**Suchzeit**) und warten, bis der Sektor vorbeikommt (**Latenz**) → Zugriffszeit einige Millisekunden.
- Stoß- und erschütterungsempfindlich, Geräusche, mehr Abwärme.
- Vorteil: **sehr günstig pro TB**, große Kapazitäten (über 20 TB pro Laufwerk).
- Aufzeichnungsverfahren: CMR (konventionell) und **SMR** (überlappende Spuren, mehr Kapazität, aber langsam beim Überschreiben – für NAS/RAID oft ungeeignet).

**SSD (Solid State Drive)** – speichert in **NAND-Flash-Zellen**, ein **Controller** verwaltet die Zellen.
- Keine beweglichen Teile → Zugriffszeit unter 0,1 ms, lautlos, stoßfest, sparsam.
- Flash-Zellen vertragen nur begrenzt viele Schreibzyklen → der Controller verteilt Schreibvorgänge (**Wear Leveling**), das Betriebssystem meldet gelöschte Blöcke per **TRIM**.
- Zelltypen: **SLC** (1 Bit/Zelle), **MLC** (2), **TLC** (3), **QLC** (4). Mehr Bits pro Zelle = billiger und mehr Kapazität, aber weniger Schreibzyklen und langsamer beim Dauerschreiben.

| Merkmal | HDD | SSD |
|---|---|---|
| Zugriffszeit | ca. 5–15 ms | < 0,1 ms |
| Zufällige Zugriffe (IOPS) | ca. 75–200 | zehntausende bis über 1 Mio. |
| Sequenziell | ca. 150–280 MB/s | SATA ≈ 550 MB/s, NVMe mehrere GB/s |
| Preis pro TB | niedrig | höher |
| Empfindlichkeit | Stöße, Vibration | Schreibzyklen begrenzt |
| Einsatz | Archiv, Backup, NAS-Datengrab | Systemlaufwerk, Datenbanken, Notebooks |

**Datenlöschung beachten:** Wegen Wear Leveling löscht ein einfaches Überschreiben bei SSDs nicht zuverlässig alle Daten. Richtig: Herstellerfunktion **Secure Erase / Sanitize** oder Verschlüsselung von Anfang an (dann Schlüssel vernichten) – bzw. physische Vernichtung nach DIN 66399.`,
        },
        {
          type: 'visual',
          title: 'HDD vs. SSD',
          widget: {
            kind: 'cards',
            data: {
              columns: 2,
              items: [
                { title: 'HDD – magnetisch, mechanisch', text: 'Drehende Scheiben, Schreib-/Leseköpfe. Günstig pro TB, große Kapazität, aber langsame Zugriffe und stoßempfindlich.', icon: 'HardDrive' },
                { title: 'SSD – Flash, elektronisch', text: 'NAND-Flash + Controller. Extrem kurze Zugriffszeit, lautlos, robust. Schreibzyklen begrenzt (TBW).', icon: 'MemoryStick' },
              ],
            },
          },
          caption: 'Faustregel: System und Programme auf SSD, große Datenmengen und Backups auf HDD (oder Band).',
        },
        {
          type: 'example',
          title: 'Beispiel: Laufwerke für zwei Einsatzzwecke',
          problem: `Die Elektro Krämer GmbH braucht (1) ein neues **Systemlaufwerk** für die Notebooks im Außendienst und (2) Speicher für **wöchentliche Vollbackups** von 8 TB im NAS. Welche Laufwerksart wählst du jeweils?`,
          steps: [
            { label: 'Notebook', body: '**SSD (NVMe)**: stoßfest (mobil!), schneller Start, geringer Verbrauch → längere Akkulaufzeit.' },
            { label: 'Backup im NAS', body: '**HDD (CMR, NAS-geeignet, 24/7-zertifiziert)**: günstig pro TB; Backups werden überwiegend sequenziell geschrieben, da reicht die HDD-Geschwindigkeit.' },
          ],
          result: 'Notebook → NVMe-SSD · Backup-NAS → NAS-HDDs (CMR)',
        },
        {
          type: 'check',
          question: {
            id: 'h02-c01', kind: 'multi', skill: 'hw.storage.hddssd', difficulty: 1,
            prompt: `Welche Aussagen treffen auf **SSDs** zu?`,
            options: ['Keine beweglichen Teile', 'Zugriffszeit deutlich kürzer als bei HDDs', 'Unbegrenzt viele Schreibzyklen', 'Daten in NAND-Flash-Zellen', 'Günstiger pro TB als HDDs'],
            answer: [0, 1, 3],
            explanation: 'SSDs speichern in NAND-Flash, haben keine Mechanik und sehr kurze Zugriffszeiten. Schreibzyklen sind begrenzt (TBW), und pro TB sind HDDs günstiger.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'h02-c02', kind: 'free', skill: 'hw.storage.hddssd', difficulty: 2,
            prompt: `Ein ausgemusterter Firmen-PC mit **SSD** soll verkauft werden. Ein Kollege will die Daten durch einmaliges Überschreiben mit Nullen löschen. Bewerte das.`,
            modelAnswer: 'Bei SSDs ist das nicht zuverlässig: Der Controller verteilt Schreibvorgänge per Wear Leveling auf andere physische Zellen und hält Reserveblöcke vor (Over-Provisioning). Beim Überschreiben landen die Nullen daher evtl. in anderen Zellen, alte Daten können erhalten bleiben. Besser: die Secure-Erase-/Sanitize-Funktion der SSD (Herstellertool, NVMe Format/Sanitize) nutzen oder – wenn die SSD von Anfang an verschlüsselt war – den Schlüssel vernichten (Crypto Erase). Bei hohem Schutzbedarf physische Vernichtung nach DIN 66399 und Löschprotokoll erstellen.',
            keywords: ['Wear Leveling', 'Secure Erase', 'Sanitize', 'Verschlüsselung', 'DIN 66399', 'Protokoll'],
            explanation: 'SSD-Löschung = Secure Erase/Sanitize oder Crypto Erase, nicht einfaches Überschreiben.',
          },
        },
        { type: 'practice', title: 'Übung: HDD und SSD', questionIds: ['h02-q001', 'h02-q002', 'h02-q003', 'h02-q004'], count: 4, difficulty: 1 },
        {
          type: 'summary',
          points: [
            'HDD: magnetisch, mechanisch, günstig pro TB, langsame Zugriffe.',
            'SSD: NAND-Flash, keine Mechanik, sehr schnell, Schreibzyklen begrenzt.',
            'SLC/MLC/TLC/QLC = 1/2/3/4 Bit pro Zelle.',
            'Wear Leveling + TRIM; Löschen per Secure Erase/Sanitize.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'h02-l02',
      title: 'Schnittstellen und Bauformen: SATA, SAS, NVMe, M.2',
      minutes: 20,
      relevance: 'ap1',
      skills: ['hw.storage.interfaces'],
      steps: [
        {
          type: 'explain',
          title: 'Schnittstelle, Protokoll und Bauform sind drei verschiedene Dinge',
          body: `Ein häufiger Prüfungsfehler: *„M.2 ist schneller als SATA.“* – **M.2 ist eine Bauform**, keine Geschwindigkeit! Unterscheide:

| Ebene | Beispiele |
|---|---|
| **Bauform / Formfaktor** | 3,5 Zoll, 2,5 Zoll, **M.2** (z. B. 2280 = 22 mm breit, 80 mm lang), U.2/U.3, EDSFF (Server) |
| **Schnittstelle / Bus** | **SATA**, **SAS**, **PCIe** |
| **Protokoll** | AHCI (für SATA), **NVMe** (für PCIe-SSDs) |

**SATA (Serial ATA)** – Standard für 2,5"/3,5"-Laufwerke. SATA III: **6 Gbit/s** brutto. Wegen der 8b/10b-Leitungscodierung bleiben 6 Gbit/s · 8/10 = 4,8 Gbit/s = **600 MB/s** – real erreichen SATA-SSDs ca. **550 MB/s**. Das ist das Limit, egal wie schnell der Flash ist.

**SAS (Serial Attached SCSI)** – Server-Schnittstelle: 12 Gbit/s (SAS-3) bzw. 24G (SAS-4), Dual-Port für Ausfallsicherheit, robuste Laufwerke. SAS-Controller können auch SATA-Laufwerke betreiben, umgekehrt nicht.

**NVMe (Non-Volatile Memory Express)** – Protokoll für SSDs direkt am **PCIe**-Bus. Sehr viele parallele Befehlswarteschlangen, geringe Latenz. Typisch **PCIe x4**:

| Anbindung | typ. sequenzielles Lesen |
|---|---|
| SATA III | ≈ 550 MB/s |
| NVMe PCIe 3.0 x4 | ≈ 3.500 MB/s |
| NVMe PCIe 4.0 x4 | ≈ 7.000 MB/s |
| NVMe PCIe 5.0 x4 | ≈ 12.000–14.000 MB/s |

**M.2-Steckplätze** haben Kerben (**Keys**): **M-Key** (PCIe x4 – NVMe; manche Slots auch SATA), **B-Key**/**B+M** (häufig SATA-M.2-SSDs), **E-Key** (WLAN-/Bluetooth-Module). Ob ein M.2-Slot NVMe, SATA oder beides kann, steht **im Handbuch des Mainboards**. Auch die Länge (2230, 2242, 2280, 22110) muss passen.

**Extern:** USB-Gehäuse und externe SSDs werden durch die USB-Schnittstelle begrenzt (z. B. USB 10Gbps ≈ 1 GB/s) – siehe Modul „Schnittstellen & Peripherie“.`,
        },
        {
          type: 'visual',
          title: 'Drei Ebenen eines Laufwerks',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Bauform', text: '2,5", 3,5", M.2 2280, U.2 … sagt nur, wie das Laufwerk aussieht und wo es passt.', icon: 'Ruler' },
                { title: 'Schnittstelle', text: 'SATA (max. 6 Gbit/s), SAS (Server), PCIe (Lanes, Generationen).', icon: 'Cable' },
                { title: 'Protokoll', text: 'AHCI (für SATA, aus HDD-Zeiten) oder NVMe (für Flash optimiert, viele Warteschlangen).', icon: 'FileText' },
              ],
            },
          },
          caption: 'Eine M.2-SSD kann SATA (≈ 550 MB/s) oder NVMe (mehrere GB/s) sein – das Datenblatt verrät es.',
        },
        {
          type: 'example',
          title: 'Beispiel: Die maximale Rate einer SATA-Verbindung',
          problem: `Ein Kunde fragt, warum seine neue SATA-SSD nie mehr als ca. 550 MB/s erreicht, obwohl SATA III „6 Gbit/s“ hat. Erkläre mit Rechnung.`,
          steps: [
            { label: 'Leitungscodierung', body: 'SATA nutzt 8b/10b-Codierung: Für 8 Nutzbits werden 10 Bits übertragen → 80 % Nutzanteil.' },
            { label: 'Rechnung', body: '6 Gbit/s · 0,8 = 4,8 Gbit/s; 4,8 Gbit/s / 8 = **0,6 GB/s = 600 MB/s** (theoretisch).' },
            { label: 'Praxis', body: 'Protokoll-Overhead (Befehle, AHCI) kostet weitere Prozent → real ≈ 550 MB/s. Mehr geht nur mit NVMe über PCIe.' },
          ],
          result: 'SATA III: max. 600 MB/s nutzbar, real ca. 550 MB/s.',
        },
        {
          type: 'check',
          question: {
            id: 'h02-c03', kind: 'single', skill: 'hw.storage.interfaces', difficulty: 2,
            prompt: `Eine Aussage im Verkaufsgespräch lautet: „**M.2-SSDs sind immer schneller als SATA-SSDs.**“ Wie bewertest du sie?`,
            options: ['Richtig, M.2 ist der Nachfolger von SATA.', 'Falsch – M.2 ist eine Bauform; eine M.2-SSD kann über SATA oder über PCIe/NVMe angebunden sein.', 'Richtig, weil M.2 kleiner ist.', 'Falsch, M.2 ist immer langsamer.'],
            answer: 1,
            distractors: {
              '0': { why: 'M.2 ist ein Formfaktor (Steckkarte), kein Nachfolger der SATA-Schnittstelle.', error: 'm2-bauform' },
              '2': { why: 'Die Größe sagt nichts über die Geschwindigkeit aus.', error: 'm2-bauform' },
              '3': { why: 'M.2-NVMe-SSDs sind meist deutlich schneller; M.2-SATA gleich schnell wie 2,5"-SATA.', error: 'm2-bauform' },
            },
            explanation: 'Entscheidend ist die Schnittstelle: M.2-SATA ≈ 550 MB/s, M.2-NVMe (PCIe 4.0 x4) ≈ 7.000 MB/s.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'h02-c04', kind: 'number', skill: 'hw.storage.interfaces', difficulty: 2,
            prompt: `SATA II arbeitet mit **3 Gbit/s** und 8b/10b-Codierung. Welche maximale Nutzdatenrate ergibt sich in **MB/s**? (1 MB = 10⁶ Byte)`,
            answer: 300, unit: 'MB/s',
            misconceptions: [{ answer: '375', error: 'leitungscodierung-vergessen', why: 'Die 8b/10b-Codierung fehlt: Nur 8 von 10 Bits sind Nutzdaten.' }],
            explanation: '3 Gbit/s · 0,8 = 2,4 Gbit/s; / 8 = **300 MB/s**.',
          },
        },
        { type: 'practice', title: 'Übung: Schnittstellen', questionIds: ['h02-q005', 'h02-q006', 'h02-q007', 'h02-q008'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Bauform (M.2, 2,5") ≠ Schnittstelle (SATA, PCIe) ≠ Protokoll (AHCI, NVMe).',
            'SATA III: 6 Gbit/s brutto → max. 600 MB/s, real ≈ 550 MB/s.',
            'NVMe über PCIe x4: 3,5 / 7 / 14 GB/s bei PCIe 3.0 / 4.0 / 5.0.',
            'M.2-Keys und Längen beachten, Handbuch prüfen.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'h02-l03',
      title: 'Kenngrößen lesen: Datenrate, IOPS, Zugriffszeit, TBW und MTBF',
      minutes: 20,
      relevance: 'ap1',
      skills: ['hw.storage.metrics'],
      steps: [
        {
          type: 'explain',
          title: 'Was die Zahlen im Datenblatt bedeuten',
          body: `| Kenngröße | Bedeutung | Typische Werte |
|---|---|---|
| **Sequenzielle Lese-/Schreibrate** (MB/s) | Durchsatz bei großen, zusammenhängenden Dateien (Videos, Backups) | HDD 250, SATA-SSD 550, NVMe 3.500–14.000 |
| **IOPS** (Input/Output Operations per Second) | Anzahl kleiner, zufälliger Zugriffe pro Sekunde – meist mit 4-KiB-Blöcken gemessen | HDD 75–200, SSD 50.000–1.000.000+ |
| **Zugriffszeit / Latenz** | Wartezeit bis zum ersten Datum | HDD 5–15 ms, SSD < 0,1 ms |
| **TBW** (Terabytes Written) | garantierte Gesamtschreibmenge über die Lebensdauer | 1-TB-Consumer-SSD: ca. 300–700 TBW |
| **DWPD** (Drive Writes Per Day) | wie oft die volle Kapazität pro Tag beschrieben werden darf (während der Garantiezeit) | Client 0,3; Enterprise 1–3 und mehr |
| **MTBF** (Mean Time Between Failures) | statistische mittlere Betriebszeit zwischen Ausfällen in Stunden | 1–2,5 Mio. h |
| **AFR** (Annualized Failure Rate) | erwartete jährliche Ausfallrate | AFR ≈ 8.760 h / MTBF |

**IOPS und Durchsatz hängen zusammen:** Durchsatz = IOPS · Blockgröße.
Beispiel: 100.000 IOPS · 4.096 Byte = 409.600.000 Byte/s = **409,6 MB/s**.

**Für welchen Einsatz zählt was?**
- **Datenbank-, Mail-, Virtualisierungsserver**: viele kleine zufällige Zugriffe → **IOPS und Latenz**.
- **Videoschnitt, Backup**: große Dateien → **sequenzielle Datenrate**.
- **Viel Schreiblast** (Logging, Datenbanken): **TBW/DWPD** beachten.

**MTBF richtig verstehen:** 1,5 Mio. Stunden heißt **nicht**, dass eine Platte 171 Jahre hält! Es ist ein statistischer Wert für eine große Anzahl Laufwerke während ihrer normalen Nutzungsdauer. Aussagekräftiger ist die AFR:
AFR ≈ 8.760 h / 1.500.000 h ≈ **0,58 %** → von 1.000 Laufwerken fallen pro Jahr etwa 6 aus.

**Lebensdauer aus TBW:** Jahre = TBW / (geschriebene Datenmenge pro Tag · 365). Beispiel: 600 TBW, 50 GB/Tag → 600.000 GB / 50 GB = 12.000 Tage ≈ **32,9 Jahre** – für Büro-PCs praktisch nie das Limit.`,
        },
        {
          type: 'visual',
          title: 'Welche Kenngröße für welchen Zweck?',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'IOPS & Latenz', text: 'Datenbanken, VMs, Mailserver: viele kleine Zugriffe.', icon: 'Database' },
                { title: 'Sequenzielle Rate', text: 'Video, Backup, große Dateien kopieren.', icon: 'Gauge' },
                { title: 'TBW / DWPD / MTBF', text: 'Haltbarkeit und Zuverlässigkeit – wichtig bei Dauer- und Schreiblast.', icon: 'Clock' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Beispiel: SSD für einen Datenbankserver',
          problem: `Auf dem Datenbankserver der Elektro Krämer GmbH werden täglich ca. **400 GB** geschrieben. Zur Wahl:\n\n| | SSD A (Client) | SSD B (Enterprise) |\n|---|---|---|\n| Kapazität | 1,92 TB | 1,92 TB |\n| Random 4K Lesen | 600.000 IOPS | 800.000 IOPS |\n| TBW | 1.200 TBW | 3.500 TBW (1 DWPD, 5 J.) |\n| MTBF | 1,5 Mio. h | 2,0 Mio. h |\n\nWie lange hält die TBW-Angabe jeweils, und welche SSD empfiehlst du?`,
          steps: [
            { label: 'SSD A', body: '1.200 TB = 1.200.000 GB / 400 GB pro Tag = 3.000 Tage / 365 ≈ **8,2 Jahre**' },
            { label: 'SSD B', body: '3.500.000 GB / 400 GB = 8.750 Tage / 365 ≈ **24 Jahre**' },
            { label: 'Bewertung', body: 'Beide überstehen eine übliche Nutzungsdauer von 5 Jahren rechnerisch. B bietet aber mehr Reserve, mehr IOPS, höhere Zuverlässigkeit (MTBF) und ist für Serverbetrieb (Dauerlast, Stromausfallschutz) ausgelegt.' },
          ],
          result: 'Empfehlung SSD B (Enterprise): mehr Reserve bei TBW, IOPS und MTBF.',
        },
        {
          type: 'check',
          question: {
            id: 'h02-c05', kind: 'number', skill: 'hw.storage.metrics', difficulty: 2,
            prompt: `Eine SSD schafft **50.000 IOPS** bei einer Blockgröße von **4 KiB (4.096 Byte)**. Welcher Durchsatz ergibt sich in **MB/s**? (1 MB = 10⁶ Byte, eine Nachkommastelle)`,
            answer: 204.8, tolerance: 0.05, unit: 'MB/s',
            misconceptions: [{ answer: '200', error: 'einheit-1000-1024', why: '4 KiB sind 4.096 Byte, nicht 4.000.' }],
            explanation: '50.000 · 4.096 Byte = 204.800.000 Byte/s = **204,8 MB/s**.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'h02-c06', kind: 'number', skill: 'hw.storage.metrics', difficulty: 2,
            prompt: `Eine Festplatte hat eine **MTBF von 1.000.000 Stunden**. Wie hoch ist die näherungsweise jährliche Ausfallrate **AFR in Prozent**? (8.760 h pro Jahr, auf zwei Nachkommastellen)`,
            answer: 0.88, tolerance: 0.01, unit: '%',
            hints: ['AFR ≈ Betriebsstunden pro Jahr / MTBF'],
            explanation: '8.760 / 1.000.000 = 0,00876 = **0,88 %**. Von 1.000 Platten fallen also rund 9 pro Jahr aus.',
          },
        },
        { type: 'practice', title: 'Übung: SSD-Lebensdauer (TBW)', generator: 'hw.tbw', count: 3, difficulty: 2 },
        { type: 'practice', title: 'Übung: Kenngrößen', questionIds: ['h02-q009', 'h02-q010', 'h02-q011', 'h02-q012'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Sequenziell (MB/s) für große Dateien; IOPS/Latenz für viele kleine Zugriffe.',
            'Durchsatz = IOPS · Blockgröße.',
            'TBW/DWPD = Schreibhaltbarkeit; Jahre = TBW / (Tagesmenge · 365).',
            'MTBF ist statistisch; AFR ≈ 8.760 h / MTBF.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'h02-l04',
      title: 'Kapazität richtig rechnen: Herstellerangabe vs. Anzeige im Betriebssystem',
      minutes: 20,
      relevance: 'ap1',
      skills: ['hw.storage.capacity'],
      steps: [
        {
          type: 'explain',
          title: 'Warum aus 1 TB „931 GB“ werden',
          body: `Klassische Kundenbeschwerde: *„Ich habe eine 1-TB-SSD gekauft, aber Windows zeigt nur 931 GB!“* – Es fehlt nichts. Hersteller und Windows rechnen mit **verschiedenen Präfixen**:

| Präfix | Faktor | Wer nutzt es? |
|---|---|---|
| **k, M, G, T** (dezimal, SI) | 10³, 10⁶, 10⁹, 10¹² | Laufwerkshersteller, Datenraten, macOS |
| **Ki, Mi, Gi, Ti** (binär, IEC) | 2¹⁰, 2²⁰, 2³⁰, 2⁴⁰ | RAM, Windows-Anzeige (beschriftet dort aber „GB“/„TB“!) |

**Rechenweg:** Herstellerangabe → **Byte** → durch die Binärpotenz teilen.

1 TB = 1.000.000.000.000 Byte
1.000.000.000.000 / 1.073.741.824 (2³⁰) = **931,32 GiB** → Windows zeigt „931 GB“.

| Herstellerangabe | in Byte | Anzeige in GiB | in TiB |
|---|---|---|---|
| 256 GB | 256 · 10⁹ | 238,42 | – |
| 500 GB | 500 · 10⁹ | 465,66 | – |
| 1 TB | 10¹² | 931,32 | 0,91 |
| 2 TB | 2 · 10¹² | 1.862,65 | 1,82 |
| 4 TB | 4 · 10¹² | 3.725,29 | 3,64 |

Die Abweichung wächst mit der Präfixstufe: bei GB ca. 7 %, bei TB ca. **9 %**.

**Weitere Gründe für „weniger Platz“:**
- **Partitionen**: EFI-Systempartition, Wiederherstellungspartition (einige hundert MB bis wenige GB).
- **Dateisystem-Verwaltung** (z. B. NTFS-Metadaten).
- **Over-Provisioning** bei SSDs: Eine „480-GB“-SSD hat oft 512 GiB Flash; die Differenz nutzt der Controller als Reserve für Wear Leveling.

**Merke für die Prüfung:** Steht nichts anderes da, sind GB/TB **dezimal**. Wird in GiB/TiB gefragt (oder ist „Anzeige im Betriebssystem“ gemeint), über Byte umrechnen und den Weg aufschreiben.`,
        },
        {
          type: 'visual',
          title: 'Zwei Präfix-Welten',
          widget: {
            kind: 'cards',
            data: {
              columns: 2,
              items: [
                { title: 'Hersteller: 1 TB', text: '= 10¹² Byte = 1.000.000.000.000 Byte', icon: 'HardDrive' },
                { title: 'Windows: „931 GB“', text: '= 931,32 GiB = 10¹² / 2³⁰. Gleiche Bytes, andere Einheit.', icon: 'Monitor' },
              ],
            },
          },
          caption: 'Siehe auch Modul 15 (Netzwerkberechnungen): Dezimal- und Binärpräfixe.',
        },
        {
          type: 'example',
          title: 'Beispiel: Passt das Image auf die SSD?',
          problem: `Ein Windows-Image für die Vertriebs-PCs ist laut Explorer **230 GiB** groß (Windows-Anzeige „230 GB“). Die neuen PCs haben eine **256-GB-SSD** (Herstellerangabe). Reicht das, wenn zusätzlich etwa **1 GiB** für EFI- und Wiederherstellungspartition benötigt wird und mindestens **10 % der Kapazität** frei bleiben sollen?`,
          steps: [
            { label: 'Kapazität in GiB', body: '256 · 10⁹ Byte / 2³⁰ = **238,42 GiB**' },
            { label: 'Abzug Partitionen', body: '238,42 − 1 = **237,42 GiB** nutzbar' },
            { label: 'Freiraum 10 %', body: '10 % von 238,42 ≈ 23,84 GiB → maximal 237,42 − 23,84 = **213,58 GiB** für Daten' },
            { label: 'Vergleich', body: '230 GiB > 213,58 GiB → **reicht nicht**. Empfehlung: 512-GB-SSD (476,84 GiB).' },
          ],
          result: 'Nein – die 256-GB-SSD ist zu klein; 512 GB wählen.',
        },
        {
          type: 'check',
          question: {
            id: 'h02-c07', kind: 'number', skill: 'hw.storage.capacity', difficulty: 2,
            prompt: `Eine Festplatte ist mit **4 TB** angegeben. Wie viele **TiB** zeigt das Betriebssystem an? (auf zwei Nachkommastellen)`,
            answer: 3.64, tolerance: 0.01, unit: 'TiB',
            misconceptions: [{ answer: '4.1', error: 'einheit-1000-1024', why: 'Falsche Richtung: Binäreinheiten sind größer – die Zahl wird kleiner.' }, { answer: '4', error: 'einheit-1000-1024', why: 'TB und TiB sind nicht gleich groß. 1 TiB = 2⁴⁰ Byte.' }],
            explanation: '4 · 10¹² / 2⁴⁰ = 4.000.000.000.000 / 1.099.511.627.776 = **3,64 TiB**.',
          },
        },
        { type: 'practice', title: 'Übung: Herstellerangabe umrechnen', generator: 'hw.kapazitaet', count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Hersteller: dezimal (1 TB = 10¹² Byte). Windows: binär (GiB), beschriftet aber „GB“.',
            'Umrechnung immer über Byte.',
            '1 TB = 931,32 GiB = 0,91 TiB (ca. 9 % Unterschied).',
            'Partitionen, Dateisystem und Over-Provisioning kosten zusätzlich Platz.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'h02-l05',
      title: 'Speichermedien für Transport, Austausch und Archiv',
      minutes: 15,
      relevance: 'ap1-teilweise',
      skills: ['hw.storage.media'],
      steps: [
        {
          type: 'explain',
          title: 'USB-Stick, SD-Karte, optische Medien und Band',
          body: `| Medium | Kapazität (typisch) | Stärken | Schwächen / Einsatz |
|---|---|---|---|
| **USB-Stick** | 32 GB – 1 TB | klein, überall lesbar | leicht verloren → **verschlüsseln**; Malware-Risiko (BadUSB, unbekannte Sticks nie anschließen) |
| **Externe SSD/HDD** | 500 GB – 20+ TB | große Datenmengen, schnell (SSD) | für Backups: nach der Sicherung **trennen** (Offline-Kopie) |
| **SD-Karte** | SDHC bis 32 GB, **SDXC bis 2 TB**, SDUC bis 128 TB | Kameras, Embedded-Geräte | Geschwindigkeitsklassen beachten (z. B. V30 für 4K-Video) |
| **Optische Medien** | CD 700 MB, DVD 4,7 GB (Dual Layer 8,5 GB), Blu-ray 25 GB pro Schicht | billig, schreibgeschützt nach Brennen (R) | kaum noch Laufwerke; Archiv-Spezialmedien |
| **Magnetband (LTO)** | LTO-9: **18 TB nativ** pro Kassette | sehr günstig pro TB, lange haltbar, offline → Schutz vor Ransomware | sequenzieller Zugriff (langsam beim Wiederherstellen einzelner Dateien), Laufwerk teuer |
| **Cloud-Speicher** | praktisch unbegrenzt | standortunabhängig, Offsite | Internetabhängigkeit, Datenschutz (Serverstandort, Auftragsverarbeitung nach DSGVO) |

**Backup-Grundregel 3-2-1:** **3** Kopien der Daten, auf **2** unterschiedlichen Medien, davon **1** außer Haus (offsite). Erweiterungen fordern zusätzlich eine offline/unveränderbare Kopie. Wichtig: **Ein RAID ist kein Backup** (RAID ist AP2-Thema).

**Kapazität bei Bändern:** Hersteller geben oft „komprimiert“ an (LTO-9: 45 TB bei 2,5 : 1). Für die Planung zählt die **native** Kapazität, weil sich bereits komprimierte Daten (Videos, ZIP, verschlüsselte Daten) kaum weiter verkleinern lassen.`,
        },
        {
          type: 'example',
          title: 'Beispiel: Wie viele Bänder für das Monatsbackup?',
          problem: `Das Monatsvollbackup der Elektro Krämer GmbH umfasst **52 TB**, überwiegend bereits komprimierte Dateien (PDFs, Bilder, verschlüsselte Archive). Es soll auf **LTO-9-Bänder** (18 TB nativ / 45 TB komprimiert) geschrieben werden. Wie viele Bänder werden benötigt?`,
          steps: [
            { label: 'Welche Kapazität?', body: 'Die Daten sind schon komprimiert → mit der **nativen** Kapazität rechnen: 18 TB.' },
            { label: 'Rechnung', body: '52 TB / 18 TB = 2,89 → **aufrunden auf 3 Bänder**.' },
            { label: 'Falsch wäre', body: '52 / 45 = 1,16 → 2 Bänder – würde vermutlich nicht reichen.' },
          ],
          result: '3 LTO-9-Bänder',
        },
        {
          type: 'check',
          question: {
            id: 'h02-c08', kind: 'free', skill: 'hw.storage.media', difficulty: 2,
            prompt: `Erkläre die **3-2-1-Regel** für Datensicherungen.`,
            modelAnswer: 'Es sollen mindestens 3 Kopien der Daten existieren (das Original plus zwei Sicherungen), auf 2 unterschiedlichen Speichermedien bzw. Speichertypen (z. B. NAS-Festplatten und Band/Cloud), und 1 Kopie muss außer Haus (offsite) gelagert werden, damit Brand, Diebstahl oder Ransomware am Standort nicht alle Kopien zerstören. Zusätzlich sinnvoll: eine Offline- bzw. unveränderbare Kopie und regelmäßige Wiederherstellungstests.',
            keywords: ['3 Kopien', '2 Medien', '1 außer Haus', 'offsite', 'offline', 'Wiederherstellungstest'],
            explanation: '3 Kopien – 2 Medientypen – 1 extern.',
          },
        },
        { type: 'practice', title: 'Übung: Speichermedien', questionIds: ['h02-q017', 'h02-q018', 'h02-q019', 'h02-q020'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'USB-Sticks verschlüsseln, unbekannte Sticks nie anschließen.',
            'SDHC ≤ 32 GB, SDXC ≤ 2 TB; DVD 4,7 GB, BD 25 GB pro Schicht.',
            'LTO-9: 18 TB nativ – mit nativer Kapazität planen.',
            '3-2-1-Regel; RAID ist kein Backup.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'h02-l06',
      title: 'DAS, NAS und SAN – Speicher im Netzwerk',
      minutes: 20,
      relevance: 'ap1',
      skills: ['hw.storage.networked'],
      steps: [
        {
          type: 'explain',
          title: 'Wo liegt der Speicher – und wie greift man zu?',
          body: `| | **DAS** (Direct Attached Storage) | **NAS** (Network Attached Storage) | **SAN** (Storage Area Network) |
|---|---|---|---|
| Anbindung | direkt am Rechner (intern, USB, SAS) | über das normale **LAN** (Ethernet, TCP/IP) | eigenes **Speichernetz** (Fibre Channel oder iSCSI über Ethernet) |
| Zugriff | Blockebene, nur dieser eine Rechner | **Dateiebene** – Freigaben per **SMB** (Windows) oder **NFS** (Linux) | **Blockebene** – Server sehen **LUNs** wie lokale Festplatten |
| Wer verwaltet das Dateisystem? | der Rechner | das NAS (eigenes Betriebssystem) | der Server, dem die LUN zugewiesen ist |
| Typisch | externe Backup-Platte, Server mit internen Platten | Abteilungsfreigaben, Backupziel, kleine Firmen | Virtualisierungscluster, Datenbanken, hohe Verfügbarkeit |
| Kosten/Aufwand | gering | mittel | hoch (Switches, HBAs, Know-how) |

**Merkhilfe:** NAS = **Dateien** übers Netz (wie ein Fileserver in einer Box). SAN = **Blöcke** übers Speichernetz (wie eine „ferne Festplatte“).

**Typische Protokolle:**
- **SMB** (TCP 445) und **NFS** (TCP/UDP 2049) → NAS-Freigaben
- **iSCSI** (TCP 3260) → Blockspeicher über normales Ethernet (günstigeres SAN)
- **Fibre Channel** (z. B. 16/32/64 Gbit/s) → klassisches SAN mit eigener Infrastruktur

**Verfügbarkeit:** Im SAN sind Controller, Netzteile und Pfade (Multipathing) meist redundant. Die Laufwerke selbst werden per **RAID** gegen den Ausfall einzelner Platten abgesichert. RAID-Level (0, 1, 5, 6, 10) gehören seit dem Prüfungskatalog 2025 zur **AP2** – für die AP1 reicht: *RAID erhöht die Verfügbarkeit, ersetzt aber kein Backup*.`,
        },
        {
          type: 'visual',
          title: 'DAS, NAS und SAN im Netzplan',
          widget: {
            kind: 'topology',
            data: {
              nodes: [
                { id: 'pc', type: 'pc', label: 'PC', sub: 'USB-Platte (DAS)', x: 90, y: 90 },
                { id: 'sw', type: 'switch', label: 'LAN-Switch', x: 330, y: 90 },
                { id: 'pc2', type: 'laptop', label: 'Clients', sub: 'SMB/NFS', x: 330, y: 230 },
                { id: 'nas', type: 'nas', label: 'NAS', sub: 'Dateifreigaben', x: 600, y: 90 },
                { id: 'srv1', type: 'server', label: 'Hypervisor 1', x: 470, y: 230 },
                { id: 'srv2', type: 'server', label: 'Hypervisor 2', x: 700, y: 230 },
                { id: 'fc', type: 'switch', label: 'SAN-Switch', sub: 'FC / iSCSI', x: 585, y: 320 },
                { id: 'san', type: 'nas', label: 'Storage-System', sub: 'LUNs (Block)', x: 585, y: 400 },
              ],
              links: [
                { from: 'pc', to: 'sw', style: 'lan' },
                { from: 'pc2', to: 'sw', style: 'lan' },
                { from: 'sw', to: 'nas', style: 'lan', label: 'SMB/NFS' },
                { from: 'sw', to: 'srv1', style: 'lan' },
                { from: 'srv1', to: 'fc', style: 'fiber' },
                { from: 'srv2', to: 'fc', style: 'fiber' },
                { from: 'fc', to: 'san', style: 'fiber', label: 'Block' },
              ],
              zones: [
                { label: 'LAN (Dateiebene)', x: 20, y: 30, w: 760, h: 150, color: 'blue' },
                { label: 'SAN (Blockebene)', x: 420, y: 190, w: 360, h: 230, color: 'purple' },
              ],
            },
          },
          caption: 'Das NAS hängt im normalen LAN; das SAN ist ein separates Netz nur zwischen Servern und Speichersystem.',
        },
        {
          type: 'example',
          title: 'Beispiel: Speicherlösung für zwei Standorte',
          problem: `(1) Die Abteilung Vertrieb in Berlin (12 Personen) braucht gemeinsame Ordner mit Rechteverwaltung. (2) In Hamburg sollen zwei Virtualisierungshosts auf einen gemeinsamen Speicher zugreifen, damit VMs bei Ausfall eines Hosts auf dem anderen weiterlaufen. Welche Lösung passt jeweils?`,
          steps: [
            { label: 'Berlin', body: '**NAS** mit SMB-Freigaben: Zugriff auf Dateiebene, Berechtigungen über Benutzer/Gruppen (z. B. Active Directory), einfach zu betreiben.' },
            { label: 'Hamburg', body: '**SAN** (z. B. iSCSI oder Fibre Channel): Beide Hosts greifen auf Blockebene auf dieselben LUNs zu, das Cluster-Dateisystem des Hypervisors koordiniert den Zugriff → Hochverfügbarkeit möglich.' },
          ],
          result: 'Berlin → NAS (SMB) · Hamburg → SAN (Blockspeicher für den Cluster)',
        },
        {
          type: 'check',
          question: {
            id: 'h02-c09', kind: 'single', skill: 'hw.storage.networked', difficulty: 2,
            prompt: `Worin unterscheiden sich NAS und SAN grundlegend?`,
            options: ['NAS ist immer schneller als SAN.', 'NAS stellt Speicher auf Dateiebene (SMB/NFS) bereit, SAN auf Blockebene (LUNs) über ein eigenes Speichernetz.', 'SAN funktioniert nur mit USB.', 'NAS kann keine Berechtigungen verwalten.'],
            answer: 1,
            distractors: {
              '0': { why: 'Geschwindigkeit ist nicht das Unterscheidungsmerkmal – SANs sind meist sogar leistungsfähiger.', error: 'nas-san-verwechselt' },
              '2': { why: 'USB ist DAS. SAN nutzt Fibre Channel oder iSCSI.', error: 'nas-san-verwechselt' },
              '3': { why: 'NAS-Freigaben werden über Benutzer- und Gruppenrechte gesteuert.', error: 'nas-san-verwechselt' },
            },
            explanation: 'Datei- vs. Blockebene ist der Kernunterschied.',
          },
        },
        { type: 'practice', title: 'Übung: DAS, NAS, SAN', questionIds: ['h02-q021', 'h02-q022', 'h02-q023', 'h02-q024', 'h02-q025'], count: 5, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'DAS: direkt am Rechner. NAS: Dateiebene übers LAN (SMB/NFS). SAN: Blockebene im Speichernetz (FC/iSCSI).',
            'SAN → gemeinsamer Speicher für Cluster/Virtualisierung.',
            'RAID erhöht die Verfügbarkeit, ist aber kein Backup (Details: AP2).',
          ],
        },
      ],
    },
  ],
  /* ==================================================================== */
  questions: [
    {
      id: 'h02-q001', kind: 'table', skill: 'hw.storage.hddssd', difficulty: 1,
      prompt: `Vergleiche HDD und SSD. Trage jeweils **HDD** oder **SSD** ein: Welches Laufwerk ist im genannten Kriterium **besser**?`,
      columns: [{ key: 'b', label: 'besser', type: 'text' }],
      rows: [
        { label: 'Zugriffszeit', cells: { b: { answer: 'SSD' } } },
        { label: 'Preis pro TB', cells: { b: { answer: 'HDD' } } },
        { label: 'Stoßfestigkeit', cells: { b: { answer: 'SSD' } } },
        { label: 'Geräuschentwicklung', cells: { b: { answer: 'SSD' } } },
        { label: 'größte verfügbare Kapazität pro Euro für Archive', cells: { b: { answer: 'HDD' } } },
      ],
      explanation: 'SSD: schnell, robust, leise. HDD: günstig pro TB – deshalb für Archive und Backups.',
    },
    {
      id: 'h02-q002', kind: 'match', skill: 'hw.storage.hddssd', difficulty: 2,
      prompt: `Ordne die Flash-Zelltypen der Anzahl Bits pro Zelle zu.`,
      left: ['SLC', 'MLC', 'TLC', 'QLC'],
      right: ['1 Bit', '2 Bit', '3 Bit', '4 Bit'],
      answer: [0, 1, 2, 3],
      explanation: 'Single/Multi/Triple/Quad Level Cell. Mehr Bits = mehr Kapazität, aber weniger Schreibzyklen.',
    },
    {
      id: 'h02-q003', kind: 'single', skill: 'hw.storage.hddssd', difficulty: 2,
      prompt: `Wozu dient **Wear Leveling** in einer SSD?`,
      options: ['Es erhöht die Drehzahl der Scheiben.', 'Es verteilt Schreibvorgänge gleichmäßig auf alle Flash-Zellen, damit keine Zellen vorzeitig verschleißen.', 'Es komprimiert die Daten.', 'Es verschlüsselt die SSD automatisch.'],
      answer: 1,
      distractors: {
        '0': { why: 'SSDs haben keine drehenden Scheiben.', error: 'ssd-grundlagen' },
        '2': { why: 'Komprimierung ist nicht die Aufgabe des Wear Leveling.', error: 'ssd-grundlagen' },
        '3': { why: 'Verschlüsselung ist eine eigene Funktion (z. B. SED/Opal oder BitLocker).', error: 'ssd-grundlagen' },
      },
      explanation: 'Flash-Zellen vertragen begrenzt viele Schreibzyklen; Wear Leveling verlängert so die Lebensdauer.',
    },
    {
      id: 'h02-q004', kind: 'free', skill: 'hw.storage.hddssd', difficulty: 2,
      prompt: `Für ein NAS mit 4 Laufwerken (Backupziel) bietet ein Händler günstige **SMR-Festplatten** an. Erläutere, warum das problematisch sein kann.`,
      modelAnswer: 'Bei SMR (Shingled Magnetic Recording) überlappen sich die Spuren wie Dachschindeln. Das erhöht die Kapazität, aber beim Überschreiben müssen benachbarte Spuren mit umgeschrieben werden. Bei längeren Schreibvorgängen oder beim Wiederaufbau (Rebuild) eines RAID-Verbunds bricht die Schreibrate stark ein; Rebuilds dauern sehr lange oder Laufwerke werden vom Controller als fehlerhaft erkannt. Für NAS/RAID sollten daher CMR-Festplatten verwendet werden, die für 24/7-Betrieb ausgelegt sind.',
      keywords: ['SMR', 'überlappende Spuren', 'Schreibrate', 'Rebuild', 'CMR', 'NAS'],
      explanation: 'SMR = günstige Kapazität, aber schlecht für Dauerschreiben/RAID.',
    },
    {
      id: 'h02-q005', kind: 'number', skill: 'hw.storage.interfaces', difficulty: 2,
      prompt: `SATA III überträgt **6 Gbit/s** mit 8b/10b-Codierung. Wie hoch ist die maximale Nutzdatenrate in **MB/s**? (1 MB = 10⁶ Byte)`,
      answer: 600, unit: 'MB/s',
      misconceptions: [{ answer: '750', error: 'leitungscodierung-vergessen', why: '6 Gbit/s / 8 = 750 MB/s ohne Codierung. Mit 8b/10b sind nur 80 % Nutzdaten: 600 MB/s.' }],
      explanation: '6 Gbit/s · 8/10 = 4,8 Gbit/s; / 8 = **600 MB/s** (real ca. 550 MB/s).',
    },
    {
      id: 'h02-q006', kind: 'match', skill: 'hw.storage.interfaces', difficulty: 2,
      prompt: `Ordne die Begriffe der richtigen **Ebene** zu.`,
      left: ['M.2 2280', 'SATA', 'NVMe', '2,5 Zoll', 'AHCI'],
      right: ['Bauform', 'Schnittstelle', 'Protokoll'],
      answer: [0, 1, 2, 0, 2],
      explanation: 'Bauformen: M.2, 2,5". Schnittstelle: SATA (bzw. PCIe, SAS). Protokolle: NVMe, AHCI.',
    },
    {
      id: 'h02-q007', kind: 'single', skill: 'hw.storage.interfaces', difficulty: 2,
      prompt: `Datenblatt-Auszug Mainboard: „M2_1: PCIe 4.0 x4 (NVMe) · M2_2: SATA only · Key M, 2242/2260/2280“. Eine **M.2-NVMe-SSD 2280** soll mit voller Geschwindigkeit laufen. In welchen Slot gehört sie?`,
      options: ['M2_1', 'M2_2', 'beide gleich gut', 'keiner, 2280 passt nicht'],
      answer: 0,
      distractors: {
        '1': { why: 'M2_2 unterstützt nur SATA – eine NVMe-SSD funktioniert dort nicht (bzw. wird nicht erkannt).', error: 'm2-slot' },
        '2': { why: 'Die Slots sind unterschiedlich angebunden: nur M2_1 kann NVMe.', error: 'm2-slot' },
        '3': { why: 'Laut Datenblatt werden 2242, 2260 und 2280 unterstützt.', error: 'm2-slot' },
      },
      explanation: 'NVMe braucht einen PCIe-angebundenen M.2-Slot → **M2_1** (PCIe 4.0 x4).',
    },
    {
      id: 'h02-q008', kind: 'text', skill: 'hw.storage.interfaces', difficulty: 1,
      prompt: `Wie heißt das für Flash-Speicher optimierte Protokoll, mit dem SSDs direkt über **PCIe** angesprochen werden (Abkürzung)?`,
      accept: ['NVMe', 'NVM Express', 'Non-Volatile Memory Express'],
      explanation: '**NVMe** – Non-Volatile Memory Express.',
    },
    {
      id: 'h02-q009', kind: 'match', skill: 'hw.storage.metrics', difficulty: 1,
      prompt: `Ordne die Kenngrößen ihrer Bedeutung zu.`,
      left: ['IOPS', 'TBW', 'MTBF', 'sequenzielle Leserate', 'DWPD'],
      right: ['Anzahl Ein-/Ausgabeoperationen pro Sekunde', 'garantierte Gesamtschreibmenge in TB', 'statistische mittlere Betriebszeit zwischen Ausfällen', 'Durchsatz bei großen zusammenhängenden Dateien', 'Komplettbeschreibungen der Kapazität pro Tag'],
      answer: [0, 1, 2, 3, 4],
      explanation: 'Siehe Lektion „Kenngrößen lesen“.',
    },
    {
      id: 'h02-q010', kind: 'number', skill: 'hw.storage.metrics', difficulty: 2,
      prompt: `Eine NVMe-SSD erreicht **100.000 IOPS** bei **4 KiB** Blockgröße. Welcher Durchsatz ergibt sich in **MB/s**? (1 KiB = 1.024 Byte, 1 MB = 10⁶ Byte, eine Nachkommastelle)`,
      answer: 409.6, tolerance: 0.05, unit: 'MB/s',
      misconceptions: [{ answer: '400', error: 'einheit-1000-1024', why: '4 KiB = 4.096 Byte, nicht 4.000 Byte.' }, { answer: '390.6', error: 'einheit-1000-1024', why: 'Das wäre MiB/s. Gefragt sind MB/s (10⁶ Byte).' }],
      explanation: '100.000 · 4.096 Byte = 409.600.000 Byte/s = **409,6 MB/s**.',
    },
    {
      id: 'h02-q011', kind: 'number', skill: 'hw.storage.metrics', difficulty: 2,
      prompt: `Eine SSD hat **600 TBW**. Pro Tag werden **120 GB** geschrieben. Nach wie vielen **Jahren** ist die TBW-Angabe erreicht? (1 TB = 1000 GB, 365 Tage, eine Nachkommastelle)`,
      answer: 13.7, tolerance: 0.1, unit: 'Jahre',
      misconceptions: [{ answer: '5000', error: 'tbw-tage-jahre', why: 'Das sind Tage – durch 365 teilen.' }],
      explanation: '600.000 GB / 120 GB = 5.000 Tage / 365 = **13,7 Jahre**.',
    },
    {
      id: 'h02-q012', kind: 'free', skill: 'hw.storage.metrics', difficulty: 2,
      prompt: `Ein Hersteller wirbt mit „**MTBF 2.000.000 Stunden**“. Ein Kunde folgert: „Die Platte hält also über 200 Jahre.“ Nimm Stellung.`,
      modelAnswer: 'Die Folgerung ist falsch. Die MTBF ist ein statistischer Mittelwert, der aus dem Ausfallverhalten einer großen Anzahl von Laufwerken während ihrer normalen Nutzungsdauer berechnet wird – keine Lebensdauerangabe für ein einzelnes Laufwerk. Mechanischer Verschleiß und Alterung nach einigen Jahren sind darin nicht abgebildet. Aussagekräftiger ist die jährliche Ausfallrate: AFR ≈ 8.760 h / 2.000.000 h ≈ 0,44 %, d. h. von 1.000 Laufwerken fallen pro Jahr etwa 4 aus. Ein einzelnes Laufwerk kann jederzeit ausfallen – daher Backup und ggf. Redundanz.',
      keywords: ['statistisch', 'Mittelwert', 'viele Laufwerke', 'AFR', '0,44 %', 'Backup'],
      explanation: 'MTBF ≠ Lebensdauer; AFR ≈ 8.760 / MTBF.',
    },
    {
      id: 'h02-q013', kind: 'number', skill: 'hw.storage.capacity', difficulty: 1,
      prompt: `Eine SSD hat laut Hersteller **500 GB**. Wie viele **GiB** zeigt Windows an? (auf zwei Nachkommastellen)`,
      answer: 465.66, tolerance: 0.01, unit: 'GiB',
      misconceptions: [{ answer: '536.87', error: 'einheit-1000-1024', why: 'Falsche Richtung: durch 2³⁰ teilen, nicht damit multiplizieren.' }, { answer: '488.28', error: 'einheit-1000-1024', why: 'Nur einmal durch 1024 geteilt (MB → MiB-Mischung). Über Byte rechnen: 500 · 10⁹ / 2³⁰.' }],
      explanation: '500 · 10⁹ / 1.073.741.824 = **465,66 GiB**.',
    },
    {
      id: 'h02-q014', kind: 'table', skill: 'hw.storage.capacity', difficulty: 2,
      prompt: `Rechne die Herstellerangaben in die Anzeige des Betriebssystems um (auf zwei Nachkommastellen).`,
      columns: [{ key: 'gib', label: 'GiB', type: 'number' }],
      rows: [
        { label: '256 GB', cells: { gib: { answer: '238.42', accept: ['238,42'] } } },
        { label: '1 TB', cells: { gib: { answer: '931.32', accept: ['931,32'] } } },
        { label: '2 TB', cells: { gib: { answer: '1862.65', accept: ['1.862,65', '1862,65'] } } },
      ],
      misconceptions: [{ cell: 'gib', answer: '1000', error: 'einheit-1000-1024', why: '1 TB = 10¹² Byte = 931,32 GiB, nicht 1000 GiB.' }],
      explanation: 'Herstellerangabe in Byte, dann / 2³⁰: 256 → 238,42; 1.000 → 931,32; 2.000 → 1.862,65 GiB.',
    },
    {
      id: 'h02-q015', kind: 'free', skill: 'hw.storage.capacity', difficulty: 1,
      prompt: `Ein Kunde beschwert sich: „Meine neue **2-TB-Festplatte** zeigt in Windows nur **1,81 TB** an – ich will sie umtauschen.“ Erkläre ihm kundengerecht, woran das liegt.`,
      modelAnswer: 'Es fehlt kein Speicher. Der Hersteller rechnet mit Dezimalpräfixen: 2 TB = 2.000.000.000.000 Byte. Windows rechnet intern binär (1 TiB = 1.099.511.627.776 Byte), beschriftet die Einheit aber als „TB“. 2.000.000.000.000 Byte / 1.099.511.627.776 = 1,82 TiB – das sind exakt dieselben Bytes, nur in einer anderen Einheit. Ein paar weitere MB benötigen Partitionstabelle und Dateisystem. Ein Umtausch würde nichts ändern.',
      keywords: ['dezimal', 'binär', 'TiB', 'gleiche Bytes', 'Dateisystem'],
      explanation: 'Dezimal (Hersteller) vs. binär (Windows-Anzeige).',
    },
    {
      id: 'h02-q016', kind: 'single', skill: 'hw.storage.capacity', difficulty: 2,
      prompt: `Warum werden manche SSDs mit **480 GB** statt **512 GB** verkauft?`,
      options: ['Weil 480 durch 16 teilbar ist.', 'Ein Teil des verbauten Flashs ist als Reserve (Over-Provisioning) für Wear Leveling und defekte Blöcke reserviert.', 'Weil 32 GB für das Betriebssystem fest vorinstalliert sind.', 'Weil der Hersteller binär rechnet.'],
      answer: 1,
      distractors: {
        '0': { why: '512 ist ebenfalls durch 16 teilbar – das ist kein Grund.', error: 'overprovisioning' },
        '2': { why: 'Auf SSDs ist kein Betriebssystem vorinstalliert.', error: 'overprovisioning' },
        '3': { why: 'SSD-Hersteller geben die Kapazität dezimal an.', error: 'overprovisioning' },
      },
      explanation: 'Over-Provisioning: Reserveblöcke verbessern Leistung und Haltbarkeit.',
    },
    {
      id: 'h02-q017', kind: 'match', skill: 'hw.storage.media', difficulty: 1,
      prompt: `Ordne den Speichermedien ihre typische (native) Kapazität zu.`,
      left: ['CD', 'DVD (Single Layer)', 'Blu-ray (1 Schicht)', 'LTO-9-Band'],
      right: ['700 MB', '4,7 GB', '25 GB', '18 TB'],
      answer: [0, 1, 2, 3],
      explanation: 'CD 700 MB, DVD 4,7 GB, BD 25 GB pro Schicht, LTO-9 18 TB nativ.',
    },
    {
      id: 'h02-q018', kind: 'number', skill: 'hw.storage.media', difficulty: 2,
      prompt: `Ein Vollbackup umfasst **40 TB** (bereits komprimierte Daten). Wie viele **LTO-9-Bänder** (18 TB nativ, 45 TB komprimiert) werden mindestens benötigt?`,
      answer: 3, unit: 'Bänder',
      misconceptions: [{ answer: '1', error: 'lto-komprimiert', why: 'Bereits komprimierte Daten lassen sich nicht weiter verdichten – mit der nativen Kapazität (18 TB) rechnen.' }, { answer: '2', error: 'runden-falsch', why: '40 / 18 = 2,22 → es muss **aufgerundet** werden.' }],
      explanation: '40 TB / 18 TB = 2,22 → **3 Bänder**.',
    },
    {
      id: 'h02-q019', kind: 'free', skill: 'hw.storage.media', difficulty: 2,
      prompt: `Ein Mitarbeiter findet auf dem Firmenparkplatz einen USB-Stick mit der Aufschrift „Gehälter 2026“ und will ihn an seinem PC anschließen. Wie reagierst du? Begründe.`,
      modelAnswer: 'Den Stick nicht anschließen. Gefundene USB-Sticks sind ein bekannter Angriffsweg (Social Engineering, „USB-Drop“): Sie können Schadsoftware enthalten oder sich als Tastatur ausgeben (BadUSB) und Befehle ausführen. Der Stick wird an die IT bzw. den IT-Sicherheitsbeauftragten übergeben, der ihn ggf. in einer isolierten Umgebung untersucht. Zusätzlich sinnvoll: Mitarbeitende sensibilisieren und USB-Ports per Richtlinie/Device Control einschränken.',
      keywords: ['nicht anschließen', 'Schadsoftware', 'BadUSB', 'Social Engineering', 'IT-Sicherheit melden'],
      explanation: 'Unbekannte Datenträger sind ein Sicherheitsrisiko.',
    },
    {
      id: 'h02-q020', kind: 'single', skill: 'hw.storage.media', difficulty: 2,
      prompt: `Welcher Vorteil spricht besonders für **Bandsicherungen (LTO)** als Teil der Backupstrategie?`,
      options: ['Sehr schneller Zugriff auf einzelne Dateien', 'Günstig pro TB und offline lagerbar – Schutz vor Ransomware', 'Keine Laufwerke nötig', 'Unbegrenzte Kapazität pro Band'],
      answer: 1,
      distractors: {
        '0': { why: 'Bänder arbeiten sequenziell – einzelne Dateien wiederherzustellen dauert vergleichsweise lange.', error: 'band-eigenschaften' },
        '2': { why: 'Man braucht ein (teures) LTO-Laufwerk oder eine Library.', error: 'band-eigenschaften' },
        '3': { why: 'LTO-9 fasst 18 TB nativ – begrenzt.', error: 'band-eigenschaften' },
      },
      explanation: 'Herausgenommene Bänder sind vom Netz getrennt (Air Gap) – Ransomware kann sie nicht verschlüsseln.',
    },
    {
      id: 'h02-q021', kind: 'table', skill: 'hw.storage.networked', difficulty: 2,
      prompt: `Trage für jede Lösung ein, ob der Zugriff auf **Datei**- oder **Block**-Ebene erfolgt.`,
      columns: [{ key: 'e', label: 'Ebene (Datei/Block)', type: 'text' }],
      rows: [
        { label: 'NAS mit SMB-Freigabe', cells: { e: { answer: 'Datei', accept: ['dateiebene', 'file'] } } },
        { label: 'SAN mit Fibre Channel', cells: { e: { answer: 'Block', accept: ['blockebene'] } } },
        { label: 'iSCSI-LUN', cells: { e: { answer: 'Block', accept: ['blockebene'] } } },
        { label: 'NFS-Export', cells: { e: { answer: 'Datei', accept: ['dateiebene', 'file'] } } },
      ],
      explanation: 'SMB/NFS → Dateiebene (NAS). FC/iSCSI → Blockebene (SAN).',
    },
    {
      id: 'h02-q022', kind: 'match', skill: 'hw.storage.networked', difficulty: 2,
      prompt: `Ordne die Protokolle ihrem Standardport bzw. ihrer Anbindung zu.`,
      left: ['SMB', 'NFS', 'iSCSI', 'Fibre Channel'],
      right: ['TCP 445', 'Port 2049', 'TCP 3260', 'eigenes Speichernetz, nicht TCP/IP'],
      answer: [0, 1, 2, 3],
      explanation: 'SMB 445, NFS 2049, iSCSI 3260; Fibre Channel nutzt einen eigenen Protokollstack.',
    },
    {
      id: 'h02-q023', kind: 'free', skill: 'hw.storage.networked', difficulty: 3,
      prompt: `Die Elektro Krämer GmbH betreibt zwei Hypervisor-Hosts mit lokalen Festplatten (DAS). Die Geschäftsleitung möchte, dass virtuelle Maschinen bei Ausfall eines Hosts automatisch auf dem anderen weiterlaufen. Erläutere, warum dafür ein **SAN** (oder vergleichbarer gemeinsamer Speicher) benötigt wird.`,
      modelAnswer: 'Bei DAS liegen die VM-Festplatten nur auf dem lokalen Speicher eines Hosts. Fällt dieser Host aus, sind die Daten für den zweiten Host nicht erreichbar – die VMs können dort nicht gestartet werden. Ein SAN stellt beiden Hosts dieselben LUNs auf Blockebene zur Verfügung. Die VM-Dateien liegen zentral; fällt ein Host aus, startet der Cluster (Hochverfügbarkeitsfunktion) die VMs auf dem anderen Host neu, da dieser auf denselben Speicher zugreift. Das SAN selbst sollte redundant aufgebaut sein (doppelte Controller, Netzteile, Pfade/Multipathing, RAID), damit es nicht zum Single Point of Failure wird.',
      keywords: ['gemeinsamer Speicher', 'LUN', 'Blockebene', 'Cluster', 'Hochverfügbarkeit', 'Single Point of Failure', 'redundant'],
      explanation: 'Hochverfügbarkeit braucht Speicher, den alle Hosts erreichen.',
    },
    {
      id: 'h02-q024', kind: 'single', skill: 'hw.storage.networked', difficulty: 1,
      prompt: `Eine externe USB-Festplatte, die direkt an einem Server hängt, ist ein Beispiel für …`,
      options: ['DAS', 'NAS', 'SAN', 'Cloud-Speicher'],
      answer: 0,
      distractors: {
        '1': { why: 'Ein NAS ist ein eigenständiges Gerät im Netzwerk.', error: 'nas-san-verwechselt' },
        '2': { why: 'Ein SAN ist ein eigenes Speichernetz.', error: 'nas-san-verwechselt' },
        '3': { why: 'Cloud-Speicher liegt beim Anbieter im Internet.', error: 'nas-san-verwechselt' },
      },
      explanation: 'Direkt angeschlossen = **D**irect **A**ttached **S**torage.',
    },
    {
      id: 'h02-q025', kind: 'single', skill: 'hw.storage.networked', difficulty: 2,
      prompt: `Ein Kollege sagt: „Unser NAS hat ein RAID 1 – damit brauchen wir kein Backup mehr.“ Was stimmt?`,
      options: ['Richtig, RAID 1 spiegelt alle Daten.', 'Falsch – RAID schützt nur vor dem Ausfall einzelner Laufwerke, nicht vor Löschen, Ransomware, Brand oder Defekt des ganzen Geräts.', 'Richtig, wenn die Festplatten neu sind.', 'Falsch, weil RAID 1 die Daten verschlüsselt.'],
      answer: 1,
      distractors: {
        '0': { why: 'Gespiegelt wird auch jede Löschung oder Verschlüsselung durch Ransomware – sofort auf beiden Platten.', error: 'raid-kein-backup' },
        '2': { why: 'Das Alter der Platten ändert nichts am Grundprinzip.', error: 'raid-kein-backup' },
        '3': { why: 'RAID 1 verschlüsselt nicht.', error: 'raid-kein-backup' },
      },
      explanation: 'RAID = Verfügbarkeit. Backup = getrennte, versionierte Kopien (3-2-1).',
    },
    {
      id: 'h02-q026', kind: 'number', skill: 'hw.storage.capacity', difficulty: 3,
      prompt: `Ein Fileserver hat eine **8-TB-Festplatte** (Herstellerangabe). Laut Explorer sind bereits **5,2 TiB** belegt. Wie viel Speicher ist (vereinfacht, ohne Dateisystem-Overhead) noch frei – in **TiB**? (auf zwei Nachkommastellen)`,
      answer: 2.08, tolerance: 0.01, unit: 'TiB',
      misconceptions: [{ answer: '2.8', error: 'einheit-1000-1024', why: '8 TB sind nicht 8 TiB. Erst umrechnen: 8 · 10¹² / 2⁴⁰ = 7,28 TiB.' }],
      explanation: '8 · 10¹² / 2⁴⁰ = **7,28 TiB**; 7,28 − 5,2 = **2,08 TiB**.',
    },
    {
      id: 'h02-q027', kind: 'order', skill: 'hw.storage.interfaces', difficulty: 2,
      prompt: `Sortiere die Anbindungen nach ihrer typischen maximalen sequenziellen Leserate – **langsamste zuerst**.`,
      items: ['HDD 7.200 U/min (SATA)', 'SATA-SSD', 'NVMe-SSD PCIe 3.0 x4', 'NVMe-SSD PCIe 4.0 x4', 'NVMe-SSD PCIe 5.0 x4'],
      explanation: '≈ 250 MB/s → 550 MB/s → 3.500 MB/s → 7.000 MB/s → 12.000–14.000 MB/s.',
    },
    {
      id: 'h02-q028', kind: 'single', skill: 'hw.storage.metrics', difficulty: 2,
      prompt: `Für einen **Datenbankserver** mit vielen kleinen, zufälligen Lese- und Schreibzugriffen: Welche Kenngröße ist am wichtigsten?`,
      options: ['Sequenzielle Leserate', 'IOPS (Random 4K) und Latenz', 'Drehzahl', 'Gewicht des Laufwerks'],
      answer: 1,
      distractors: {
        '0': { why: 'Die sequenzielle Rate zählt bei großen zusammenhängenden Dateien, nicht bei vielen kleinen Zugriffen.', error: 'kenngroesse-einsatz' },
        '2': { why: 'Die Drehzahl betrifft nur HDDs – für Datenbanken nimmt man ohnehin SSDs.', error: 'kenngroesse-einsatz' },
        '3': { why: 'Das Gewicht ist für die Leistung irrelevant.', error: 'kenngroesse-einsatz' },
      },
      explanation: 'Datenbanken = viele kleine zufällige Zugriffe → IOPS und Latenz.',
    },
    {
      id: 'h02-q029', kind: 'number', skill: 'hw.storage.metrics', difficulty: 3,
      prompt: `Eine Enterprise-SSD hat **3,84 TB** Kapazität und ist für **1 DWPD** über **5 Jahre** spezifiziert. Wie viele **TBW** entspricht das? (365 Tage/Jahr, auf ganze TB runden)`,
      answer: 7008, tolerance: 1, unit: 'TBW',
      misconceptions: [{ answer: '1402', error: 'tbw-garantiezeit', why: 'Das ist nur ein Jahr. Die Spezifikation gilt über 5 Jahre.' }],
      explanation: 'TBW = DWPD · Kapazität · Tage = 1 · 3,84 TB · 365 · 5 = **7.008 TBW**.',
    },
    {
      id: 'h02-q030', kind: 'multi', skill: 'hw.storage.media', difficulty: 2,
      prompt: `Welche Maßnahmen sind sinnvoll, wenn Mitarbeitende Kundendaten auf **USB-Sticks** transportieren müssen?`,
      options: ['Hardwareverschlüsselte oder per BitLocker To Go verschlüsselte Sticks verwenden', 'Nur von der IT ausgegebene, inventarisierte Sticks zulassen', 'Daten nach dem Transport auf dem Stick lassen, als Backup', 'Device-Control-Richtlinie für USB-Massenspeicher einsetzen', 'Private Sticks zulassen, wenn sie neu sind'],
      answer: [0, 1, 3],
      explanation: 'Verschlüsselung, kontrollierte Geräte und technische Richtlinien. Daten nicht unnötig auf mobilen Medien lassen; private Sticks sind ein Risiko.',
    },
    {
      id: 'h02-q031', kind: 'text', skill: 'hw.storage.hddssd', difficulty: 1,
      prompt: `Wie heißt der Befehl, mit dem das Betriebssystem einer SSD mitteilt, welche Blöcke nicht mehr benötigt werden (damit der Controller sie vorab löschen kann)?`,
      accept: ['TRIM', 'Trim-Befehl', 'trim command'],
      explanation: '**TRIM** (bei NVMe: Deallocate). Windows führt ihn automatisch aus („Laufwerke optimieren“).',
    },
    {
      id: 'h02-q032', kind: 'free', skill: 'hw.storage.networked', difficulty: 2,
      prompt: `Nenne je zwei Vorteile eines **NAS** gegenüber einer externen USB-Festplatte (DAS) für die Datenablage einer Abteilung.`,
      modelAnswer: 'Ein NAS ist über das Netzwerk für viele Benutzer gleichzeitig erreichbar (SMB/NFS-Freigaben), während eine USB-Platte nur an einem Rechner hängt. Es bietet eine zentrale Rechteverwaltung (Benutzer/Gruppen, AD-Anbindung), meist Redundanz durch mehrere Laufwerke (RAID), Snapshots/Versionierung und integrierte Backupfunktionen. Außerdem läuft es dauerhaft und unabhängig vom Arbeitsplatz-PC.',
      keywords: ['mehrere Benutzer', 'Netzwerk', 'Rechteverwaltung', 'RAID', 'Snapshots', 'zentral'],
      explanation: 'NAS = zentraler, gemeinsam nutzbarer Dateispeicher.',
    },
    {
      id: 'h02-q033', kind: 'number', skill: 'hw.storage.media', difficulty: 2,
      prompt: `Ein Projektarchiv von **20 GB** soll auf **DVDs (4,7 GB)** übergeben werden. Wie viele DVDs werden mindestens benötigt?`,
      answer: 5, unit: 'DVDs',
      misconceptions: [{ answer: '4', error: 'runden-falsch', why: '20 / 4,7 = 4,26 → aufrunden auf 5.' }],
      explanation: '20 / 4,7 = 4,26 → **5 DVDs** (sinnvoller wäre heute ein verschlüsselter USB-Datenträger oder eine sichere Dateiübertragung).',
    },
  ],
};
