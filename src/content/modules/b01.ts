import type { Module } from '../types';

export const b01: Module = {
  id: 'b01',
  nr: 1,
  area: 'systeme',
  title: 'Betriebssysteme & Installation',
  short: 'Aufgaben eines Betriebssystems, Systemvoraussetzungen, UEFI/TPM, GPT/MBR, Dateisysteme, Installation, Deployment, Updates und Fernzugriff.',
  icon: 'MonitorCog',
  relevance: 'ap1',
  prerequisites: [],
  generators: ['sys.fs', 'sys.partition'],
  skills: [
    { id: 'os.tasks', module: 'b01', title: 'Aufgaben und Arten von Betriebssystemen' },
    { id: 'os.requirements', module: 'b01', title: 'Systemvoraussetzungen anhand eines Datenblatts prüfen', requires: ['os.tasks'] },
    { id: 'os.partition', module: 'b01', title: 'UEFI, Secure Boot, TPM und Partitionsstil (MBR/GPT)' },
    { id: 'os.filesystems', module: 'b01', title: 'Dateisysteme und ihre Grenzen', requires: ['os.partition'] },
    { id: 'os.install', module: 'b01', title: 'Installation planen und durchführen', requires: ['os.requirements', 'os.partition'] },
    { id: 'os.deploy', module: 'b01', title: 'Imaging und automatisierte Verteilung (Deployment)', requires: ['os.install'] },
    { id: 'os.maintain', module: 'b01', title: 'Treiber und Updates verwalten', requires: ['os.install'] },
    { id: 'os.remote', module: 'b01', title: 'Fernzugriff: RDP, SSH und Fernwartung' },
  ],
  lessons: [
    /* ------------------------------------------------------------ */
    {
      id: 'b01-l01',
      title: 'Was ein Betriebssystem leistet – Windows, Linux, macOS',
      minutes: 20,
      relevance: 'ap1',
      skills: ['os.tasks'],
      steps: [
        {
          type: 'explain',
          title: 'Das Betriebssystem als Vermittler',
          body: `Ein **Betriebssystem (OS, Operating System)** ist die Software, die zwischen der **Hardware** und den **Anwendungen** vermittelt. Ohne Betriebssystem müsste jedes Programm selbst wissen, wie man eine bestimmte SSD anspricht, wie der Bildschirm angesteuert wird oder wie man den Arbeitsspeicher aufteilt.

**Die Kernaufgaben eines Betriebssystems:**

| Aufgabe | Was passiert? | Beispiel |
|---|---|---|
| **Prozessverwaltung** | Programme (Prozesse/Threads) bekommen abwechselnd CPU-Zeit (Scheduling), Multitasking | Browser, Outlook und Teams laufen „gleichzeitig“ |
| **Speicherverwaltung** | Arbeitsspeicher zuteilen und schützen, virtueller Speicher (Auslagerungsdatei/Swap) | Ein abstürzendes Programm reißt die anderen nicht mit |
| **Dateiverwaltung** | Dateisystem: Ordner, Dateien, Rechte, Speicherorte | NTFS unter Windows, ext4 unter Linux |
| **Geräteverwaltung** | Hardware über **Treiber** einheitlich ansprechen | Drucker, Netzwerkkarte, USB-Stick |
| **Benutzer- und Rechteverwaltung** | Anmeldung, Benutzerkonten, Zugriffsrechte | Standardbenutzer darf keine Software installieren |
| **Benutzerschnittstelle** | grafische Oberfläche (GUI) oder Kommandozeile (CLI) | Explorer, PowerShell, Bash |
| **Schnittstellen für Programme (API)** | Anwendungen nutzen Funktionen des OS über Systemaufrufe | „Datei speichern“-Dialog |
| **Sicherheit & Netzwerk** | Firewall, Verschlüsselung, Netzwerk-Stack (TCP/IP) | Windows-Firewall, BitLocker |

Der innerste Teil heißt **Kernel** (Kern). Er läuft im privilegierten **Kernel-Modus** und hat vollen Hardwarezugriff. Anwendungen laufen im eingeschränkten **Benutzermodus** und müssen den Kernel um Erlaubnis bitten. So kann ein fehlerhaftes Programm nicht einfach das ganze System beschädigen.`,
        },
        {
          type: 'explain',
          title: 'Marktübliche Betriebssysteme im Vergleich',
          body: `| | **Windows** | **Linux** | **macOS** |
|---|---|---|---|
| Hersteller | Microsoft | Community + Firmen (Kernel seit 1991, Distributionen wie Ubuntu, Debian, Red Hat Enterprise Linux, SUSE) | Apple |
| Lizenz | proprietär, kostenpflichtig | Open Source (Kernel: GPLv2), meist kostenlos; Enterprise-Distributionen mit kostenpflichtigem Support | proprietär, an Apple-Hardware gebunden |
| Standard-Dateisystem | NTFS | ext4 (auch XFS, Btrfs) | APFS |
| Typischer Einsatz | Büro-Arbeitsplätze, Domänen mit Active Directory | Server, Netzwerkgeräte, Cloud, Container, Embedded | Grafik, Medien, Softwareentwicklung |
| Verwaltung | GUI, PowerShell, Gruppenrichtlinien, Intune | Shell (Bash), Paketmanager (apt, dnf) | GUI, Terminal, MDM |

**Client- vs. Server-Betriebssystem:**

| Client-OS | Server-OS |
|---|---|
| Windows 11 Home/Pro/Enterprise/Education, macOS, Ubuntu Desktop | Windows Server 2025 (Standard/Datacenter), Ubuntu Server, Debian, RHEL |
| optimiert für **einen** Benutzer am Gerät, grafische Oberfläche, Multimedia | optimiert für **viele** gleichzeitige Netzwerkzugriffe und Dienste (Datei-, Druck-, Web-, Verzeichnisdienst) |
| begrenzte gleichzeitige eingehende Verbindungen (z. B. Dateifreigaben) | Rollen und Dienste: AD DS, DNS, DHCP, Hyper-V; oft ohne GUI (Server Core) |
| Lizenz pro Gerät | Lizenz nach Prozessorkernen + Zugriffslizenzen (CALs) |

**64 Bit:** Windows 11 gibt es **nur noch als 64-Bit-Version**. Ein 32-Bit-System kann höchstens 2³² Byte = **4 GiB** Speicher adressieren – für heutige Arbeitsplätze zu wenig.

**Lebenszyklus beachten:** Für Windows 10 gibt es seit dem **14.10.2025** keine regulären Sicherheitsupdates mehr (nur noch kostenpflichtige Extended Security Updates). Ein Arbeitsplatz ohne Sicherheitsupdates ist ein Sicherheitsrisiko – deshalb gehört die Frage „Wie lange wird das System noch unterstützt?“ zu jeder Planung. Linux-Distributionen bieten dafür **LTS-Versionen** (Long Term Support, z. B. Ubuntu LTS mit 5 Jahren Standard-Support).`,
        },
        {
          type: 'visual',
          title: 'Schichtenmodell eines Rechners',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Anwendungen', text: 'Office, Browser, Warenwirtschaft – laufen im Benutzermodus und nutzen die API des Betriebssystems.', icon: 'AppWindow' },
                { title: 'Betriebssystem', text: 'Systemdienste, Benutzeroberfläche, Dateisystem, Rechteverwaltung.', icon: 'MonitorCog' },
                { title: 'Kernel + Treiber', text: 'Prozess-, Speicher- und Geräteverwaltung im Kernel-Modus. Treiber übersetzen zwischen OS und Hardware.', icon: 'Cpu' },
                { title: 'Hardware + Firmware', text: 'CPU, RAM, SSD, Netzwerkkarte; UEFI startet das System und übergibt an den Bootloader.', icon: 'HardDrive' },
              ],
            },
          },
          caption: 'Jede Schicht nutzt nur die Dienste der Schicht darunter – Anwendungen sprechen die Hardware nie direkt an.',
        },
        {
          type: 'example',
          title: 'Betriebssystem für drei Einsatzzwecke auswählen',
          problem: 'Die Elektro Krämer GmbH braucht (a) 15 neue Büro-PCs für den Vertrieb in der Active-Directory-Domäne, (b) einen neuen Webserver für das Kundenportal, (c) einen Rechner für die Marketing-Grafikerin, die ausschließlich mit Apple-Software arbeitet. Wähle jeweils ein Betriebssystem und begründe.',
          steps: [
            { label: '(a) Büro-PCs', body: '**Windows 11 Pro** (oder Enterprise über Volumenlizenz): Domänenbeitritt, Gruppenrichtlinien und BitLocker sind enthalten – **Home** kann keiner Domäne beitreten und scheidet aus.' },
            { label: '(b) Webserver', body: '**Linux-Server-Distribution mit LTS** (z. B. Ubuntu Server LTS oder Debian): stabil, lange Sicherheitsupdates, ressourcenschonend ohne GUI, keine Lizenzkosten für das OS. Alternativ Windows Server, falls die Webanwendung IIS/.NET-Framework braucht.' },
            { label: '(c) Grafik-Arbeitsplatz', body: '**macOS** – die benötigte Software läuft nur dort; macOS ist ohnehin an Apple-Hardware gebunden.' },
          ],
          result: 'Die Auswahl richtet sich nach **Anforderungen** (Domäne, Software, Dienste), **Lizenzkosten**, **Support-Zeitraum** und **Verwaltbarkeit** – nicht nach persönlicher Vorliebe.',
        },
        {
          type: 'check',
          question: {
            id: 'b01-c01', kind: 'single', skill: 'os.tasks', difficulty: 1,
            prompt: 'Welche Aufgabe übernimmt der **Kernel** eines Betriebssystems?',
            options: ['Er stellt die Office-Programme bereit.', 'Er verwaltet Prozesse, Speicher und Geräte im privilegierten Modus.', 'Er ist die grafische Oberfläche.', 'Er ersetzt die Firmware (UEFI).'],
            answer: 1,
            distractors: { '0': { why: 'Office ist Anwendungssoftware, sie läuft im Benutzermodus.', error: 'os-schichten' }, '2': { why: 'Die GUI ist ein Teil des Betriebssystems, aber nicht der Kernel.', error: 'os-schichten' }, '3': { why: 'Die Firmware startet den Rechner und übergibt dann an den Bootloader des OS.', error: 'os-schichten' } },
            explanation: 'Der Kernel ist der Kern des OS: Scheduling, Speicherverwaltung, Treiber/Geräte – mit vollem Hardwarezugriff im Kernel-Modus.',
          },
        },
        { type: 'practice', title: 'Übung: Aufgaben und Arten von Betriebssystemen', questionIds: ['b01-q001', 'b01-q002', 'b01-q003', 'b01-q004'], count: 4, difficulty: 1 },
        { type: 'summary', points: ['OS = Vermittler zwischen Hardware und Anwendungen.', 'Kernaufgaben: Prozesse, Speicher, Dateien, Geräte, Benutzer/Rechte, Schnittstellen.', 'Kernel-Modus (privilegiert) vs. Benutzermodus.', 'Client-OS für einen Benutzer, Server-OS für viele Netzwerkdienste.', 'Support-Zeitraum (Lebenszyklus, LTS) immer mitplanen.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b01-l02',
      title: 'Systemvoraussetzungen prüfen – Windows 11 und das Datenblatt',
      minutes: 20,
      relevance: 'ap1',
      skills: ['os.requirements'],
      steps: [
        {
          type: 'explain',
          title: 'Mindestanforderungen von Windows 11',
          body: `Eine typische AP1-Aufgabe: *„Prüfen Sie anhand des Datenblatts, ob das Notebook die Systemvoraussetzungen erfüllt.“* Dafür musst du die Anforderungen kennen und das Datenblatt **Zeile für Zeile** vergleichen.

**Mindestanforderungen Windows 11 (Microsoft):**

| Komponente | Mindestanforderung |
|---|---|
| Prozessor | **1 GHz** oder schneller, **mindestens 2 Kerne**, **64-Bit**, kompatibler Prozessor laut Microsoft-Liste |
| Arbeitsspeicher | **4 GB** |
| Speicher | **64 GB** oder mehr |
| Systemfirmware | **UEFI**, **Secure-Boot-fähig** |
| TPM | **Trusted Platform Module 2.0** |
| Grafikkarte | kompatibel mit **DirectX 12**, **WDDM-2.0**-Treiber |
| Bildschirm | HD (**720p**), größer als 9 Zoll Diagonale, 8 Bit pro Farbkanal |
| Internet/Konto | Für die Einrichtung von Windows 11 Home (und im Privatbereich zunehmend auch Pro) verlangt Microsoft Internet und ein Microsoft-Konto |

**Mindestens ≠ sinnvoll:** Mit 4 GB RAM startet Windows 11, aber mit Office, Browser und Teams wird es zäh. Für Büro-Arbeitsplätze plant man in der Praxis **mindestens 16 GB RAM** und eine **SSD mit 256–512 GB**.

**Editionen – was braucht ein Firmen-PC?**

| Funktion | Home | Pro / Enterprise / Education |
|---|---|---|
| Domänenbeitritt (Active Directory) / Entra-ID-Beitritt | ✗ | ✓ |
| Gruppenrichtlinien-Editor (gpedit.msc) | ✗ | ✓ |
| BitLocker-Laufwerkverschlüsselung (volle Verwaltung) | ✗ (nur vereinfachte Geräteverschlüsselung) | ✓ |
| Remotedesktop als **Host** (man kann sich auf den PC verbinden) | ✗ (nur als Client) | ✓ |
| Hyper-V | ✗ | ✓ |

**Prüfwerkzeuge:** Die App *PC-Integritätsprüfung* von Microsoft prüft die Kompatibilität automatisch. Manuell: \`tpm.msc\` (TPM-Version), \`msinfo32\` (BIOS-Modus „UEFI“, Sicherer Startzustand), Task-Manager (Kerne, RAM).`,
        },
        {
          type: 'visual',
          title: 'Prüfschema für ein Datenblatt',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: '1. Anforderungen notieren', text: 'Mindestwerte des Betriebssystems und Anforderungen des Kunden (Software, Domäne, Verschlüsselung).', icon: 'ClipboardList' },
                { title: '2. Datenblatt vergleichen', text: 'Zeile für Zeile: CPU (Kerne, 64 Bit), RAM, Speicher, Firmware/TPM, Grafik, Display, Edition.', icon: 'Table' },
                { title: '3. Bewerten & begründen', text: 'Erfüllt / nicht erfüllt – mit Begründung und Vorschlag (z. B. RAM aufrüsten, Pro statt Home).', icon: 'CheckCircle2' },
              ],
            },
          },
          caption: 'In der Prüfung zählt die Begründung: Nenne immer den Soll- und den Ist-Wert.',
        },
        {
          type: 'example',
          title: 'Notebook-Angebot prüfen',
          problem: `Für den Außendienst liegt folgendes Angebot vor. Der Rechner soll der Domäne beitreten und mit BitLocker verschlüsselt werden.

| Merkmal | Angebot „Notebook X14“ |
|---|---|
| Prozessor | 4 Kerne, 2,4 GHz, 64 Bit, von Microsoft unterstützt |
| Arbeitsspeicher | 8 GB DDR5 (1 Steckplatz frei) |
| SSD | 512 GB NVMe |
| Firmware/Sicherheit | UEFI mit Secure Boot, fTPM 2.0 |
| Grafik | integriert, DirectX 12 |
| Display | 14 Zoll, 1920 × 1080 |
| Betriebssystem | Windows 11 Home |`,
          steps: [
            { label: 'CPU', body: '4 Kerne ≥ 2, 2,4 GHz ≥ 1 GHz, 64 Bit, unterstützt → **erfüllt**.' },
            { label: 'RAM / Speicher', body: '8 GB ≥ 4 GB, 512 GB ≥ 64 GB → **erfüllt** (für die Praxis RAM auf 16 GB aufrüsten – ein Steckplatz ist frei).' },
            { label: 'Firmware / TPM / Grafik / Display', body: 'UEFI + Secure Boot, TPM 2.0 (fTPM = in der CPU-Firmware), DirectX 12, 14 Zoll Full HD → **erfüllt**.' },
            { label: 'Kundenanforderungen', body: '**Windows 11 Home** kann keiner Domäne beitreten und bietet keine vollwertige BitLocker-Verwaltung → **nicht erfüllt**.' },
          ],
          result: 'Die Hardware erfüllt die Mindestanforderungen von Windows 11. Das Angebot muss aber auf **Windows 11 Pro** (bzw. ein Upgrade auf Pro/Enterprise) geändert werden; zusätzlich empfiehlt sich eine Aufrüstung auf 16 GB RAM.',
        },
        {
          type: 'check',
          question: {
            id: 'b01-c02', kind: 'number', skill: 'os.requirements', difficulty: 1,
            prompt: 'Wie viele **GB Arbeitsspeicher** verlangt Windows 11 mindestens?',
            answer: 4, unit: 'GB',
            explanation: 'Mindestanforderung: **4 GB RAM** (praxisgerecht für Büro: 16 GB).',
          },
        },
        {
          type: 'check',
          question: {
            id: 'b01-c03', kind: 'text', skill: 'os.requirements', difficulty: 2,
            prompt: 'Welche Windows-11-**Edition** muss mindestens gewählt werden, wenn der PC einer Active-Directory-Domäne beitreten soll? (ein Wort)',
            accept: ['Pro', 'Windows 11 Pro', 'Professional'],
            hints: ['Home kann es nicht.'],
            explanation: 'Domänenbeitritt ist ab **Pro** möglich (auch Enterprise und Education).',
          },
        },
        { type: 'practice', title: 'Übung: Datenblätter prüfen', questionIds: ['b01-q005', 'b01-q006', 'b01-q007', 'b01-q008'], count: 4, difficulty: 2 },
        { type: 'summary', points: ['Windows 11: 1 GHz, 2 Kerne, 64 Bit, 4 GB RAM, 64 GB Speicher, UEFI + Secure Boot, TPM 2.0, DirectX 12.', 'Mindestwerte sind keine Praxiswerte: Büro-PC mit 16 GB RAM und SSD planen.', 'Firmen-PC: mindestens Pro (Domäne, BitLocker, RDP-Host, gpedit).', 'Immer Soll- und Ist-Wert nennen und begründen.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b01-l03',
      title: 'UEFI, Secure Boot, TPM und Partitionsstil (MBR/GPT)',
      minutes: 25,
      relevance: 'ap1',
      skills: ['os.partition'],
      steps: [
        {
          type: 'explain',
          title: 'Vom Einschalten bis zum Betriebssystem',
          body: `Beim Einschalten startet zuerst die **Firmware** auf der Hauptplatine. Sie prüft die Hardware und sucht einen **Bootloader**.

| | **BIOS (Legacy)** | **UEFI** |
|---|---|---|
| Alter | seit den 1980ern | Standard seit ca. 2012 |
| Bootet Windows von | MBR-Datenträgern | GPT-Datenträgern (Bootloader in der **EFI-Systempartition**, FAT32) |
| Secure Boot | nein | ja |
| Oberfläche | Text, Tastatur | oft grafisch, Maus |
| Sonstiges | 16-Bit-Modus, Kompatibilität | schnellerer Start, Netzwerk-Boot, Treiber in der Firmware |

Viele UEFI-Firmwares haben ein **CSM (Compatibility Support Module)**, das ein altes BIOS nachbildet. Für Windows 11 muss im **UEFI-Modus** gebootet werden.

**Secure Boot:** Die Firmware startet nur Bootloader, die mit einem vertrauenswürdigen Schlüssel **digital signiert** sind. Ein Bootkit (Schadsoftware, die sich vor das Betriebssystem setzt) kann so nicht unbemerkt starten. Linux-Distributionen wie Ubuntu oder Fedora booten über einen signierten Zwischen-Bootloader (shim) ebenfalls mit Secure Boot.

**TPM 2.0 (Trusted Platform Module):** ein Sicherheitschip – oder als Firmware-TPM in der CPU (Intel PTT, AMD fTPM). Er speichert **kryptografische Schlüssel** manipulationssicher und misst den Startvorgang. Genutzt von **BitLocker** (Schlüssel wird nur bei unverändertem Startvorgang freigegeben), **Windows Hello** und zur Geräteattestierung.`,
        },
        {
          type: 'explain',
          title: 'MBR oder GPT?',
          body: `Bevor ein Datenträger Daten aufnehmen kann, braucht er eine **Partitionstabelle** (Partitionsstil). Sie legt fest, welche Bereiche (Partitionen) es gibt.

| | **MBR** (Master Boot Record) | **GPT** (GUID Partition Table) |
|---|---|---|
| Speicherort | erster Sektor des Datenträgers | Anfang des Datenträgers **+ Sicherungskopie am Ende** |
| max. Datenträgergröße | 2³² Sektoren · 512 Byte = **2 TiB** (≈ 2,2 TB) | 2⁶⁴ Sektoren – praktisch unbegrenzt (8 ZiB) |
| Partitionen | **4 primäre** (oder 3 primäre + 1 erweiterte mit logischen Laufwerken) | **128** (Standard unter Windows) |
| Schutz | keine Prüfsumme, keine Kopie | CRC32-Prüfsummen, redundante Tabelle |
| Booten von Windows | mit BIOS/CSM | mit **UEFI** |

**Warum 2 TiB?** MBR speichert Sektoradressen in **32 Bit**. 2³² = 4.294.967.296 Sektoren · 512 Byte = **2.199.023.255.552 Byte**. Ein Plattenhersteller rechnet dezimal (1 TB = 10¹² Byte): Eine „2 TB“-Platte (2.000.000.000.000 Byte) passt also noch, eine „3 TB“-Platte nicht.

**Typische Windows-11-Partitionierung (GPT, UEFI):**

| Partition | Größe (typisch) | Dateisystem | Zweck |
|---|---|---|---|
| EFI-Systempartition (ESP) | 100–260 MB | FAT32 | Bootloader |
| MSR (Microsoft Reserved) | 16 MB | – | interne Verwaltung |
| Windows (C:) | Rest | NTFS | Betriebssystem, Programme |
| Wiederherstellung | ca. 0,5–1 GB | NTFS | Windows-Wiederherstellungsumgebung (WinRE) |

**Werkzeuge:** Datenträgerverwaltung (\`diskmgmt.msc\`), \`diskpart\`, das Kommandozeilenprogramm \`mbr2gpt\` (wandelt einen Windows-Systemdatenträger ohne Datenverlust von MBR in GPT um) – unter Linux \`lsblk\`, \`fdisk\`, \`gdisk\`, \`parted\`.`,
        },
        {
          type: 'visual',
          title: 'Bootablauf mit UEFI und Secure Boot',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['UEFI-Firmware', 'EFI-Systempartition', 'Windows-Bootmanager', 'Windows-Kernel'],
              messages: [
                { from: 0, to: 0, label: 'POST: Hardware prüfen, TPM misst Firmware' },
                { from: 0, to: 1, label: 'Bootloader laden (\\EFI\\Microsoft\\Boot\\bootmgfw.efi)', note: 'Secure Boot prüft die Signatur' },
                { from: 1, to: 2, label: 'Bootmanager startet' },
                { from: 2, to: 3, label: 'Windows-Lader startet Kernel und Treiber', note: 'BitLocker-Schlüssel aus dem TPM' },
                { from: 3, to: 3, label: 'Anmeldebildschirm' },
              ],
            },
          },
          caption: 'Secure Boot lässt nur signierte Bootloader zu, das TPM gibt den BitLocker-Schlüssel nur bei unverändertem Startvorgang frei.',
        },
        {
          type: 'example',
          title: '4-TB-Datenplatte mit MBR?',
          problem: 'Ein Kollege hat eine neue 4-TB-Festplatte (512-Byte-Sektoren) mit MBR initialisiert. Wie viel Kapazität kann er nutzen, und was rätst du ihm?',
          steps: [
            { label: 'MBR-Grenze', body: '2³² · 512 Byte = 2.199.023.255.552 Byte ≈ **2,2 TB** (= 2 TiB).' },
            { label: 'Kapazität der Platte', body: '4 TB = 4.000.000.000.000 Byte.' },
            { label: 'Nicht nutzbar', body: '4.000.000.000.000 − 2.199.023.255.552 = 1.800.976.744.448 Byte ≈ **1.801 GB** bleiben ungenutzt.' },
            { label: 'Empfehlung', body: 'Die (noch leere) Platte in der Datenträgerverwaltung in **GPT** konvertieren – bei vorhandenen Daten vorher sichern.' },
          ],
          result: 'Mit MBR sind nur ca. 2,2 TB nutzbar; für Datenträger über 2 TiB immer **GPT** verwenden.',
        },
        {
          type: 'check',
          question: {
            id: 'b01-c04', kind: 'number', skill: 'os.partition', difficulty: 1,
            prompt: 'Wie viele **primäre** Partitionen kann eine MBR-Partitionstabelle höchstens enthalten?',
            answer: 4,
            explanation: 'MBR: **4 primäre** Partitionen (oder 3 primäre + 1 erweiterte mit logischen Laufwerken). GPT: 128 unter Windows.',
          },
        },
        { type: 'practice', title: 'Übung: MBR oder GPT?', generator: 'sys.partition', count: 4, difficulty: 2 },
        { type: 'summary', points: ['Windows 11 bootet im UEFI-Modus von GPT.', 'Secure Boot: nur signierte Bootloader. TPM 2.0: Schlüsselspeicher (BitLocker, Windows Hello).', 'MBR: max. 4 primäre Partitionen, max. 2 TiB (≈ 2,2 TB).', 'GPT: 128 Partitionen, praktisch unbegrenzte Größe, redundante Tabelle mit Prüfsummen.', 'EFI-Systempartition ist FAT32-formatiert.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b01-l04',
      title: 'Dateisysteme und ihre Grenzen',
      minutes: 25,
      relevance: 'ap1',
      skills: ['os.filesystems'],
      steps: [
        {
          type: 'explain',
          title: 'NTFS, FAT32, exFAT, ext4 im Überblick',
          body: `Ein **Dateisystem** legt fest, wie Dateien und Ordner auf einer Partition organisiert werden: Namen, Größen, Speicherorte (Cluster/Blöcke), Zeitstempel und ggf. Berechtigungen. Das Anlegen eines Dateisystems nennt man **Formatieren**.

| | **FAT32** | **exFAT** | **NTFS** | **ext4** |
|---|---|---|---|---|
| max. Dateigröße | **4 GiB − 1 Byte** (4.294.967.295 Byte) | theoretisch 16 EiB – praktisch unbegrenzt | praktisch unbegrenzt (Terabyte-Bereich) | **16 TiB** (bei 4-KiB-Blöcken) |
| max. Partitionsgröße | 2 TiB (512-Byte-Sektoren); Windows formatiert FAT32 mit Bordmitteln klassisch nur bis 32 GB | sehr groß (empfohlen bis 128 PiB) | praktisch unbegrenzt | 1 EiB |
| Berechtigungen (ACL/Rechte) | ✗ | ✗ | ✓ NTFS-ACL | ✓ Unix-Rechte (rwx) |
| Journaling | ✗ | ✗ | ✓ | ✓ |
| Besonderheiten | sehr kompatibel (Autoradio, TV, Drucker, Kameras), **EFI-Systempartition** | für USB-Sticks/SD-Karten (SDXC-Standard), Windows, macOS und aktuelle Linux-Kernel | Windows-Standard: Komprimierung, EFS-Verschlüsselung, Kontingente, BitLocker | Linux-Standard |
| Unterstützung | überall | Windows, macOS, Linux | Windows voll; macOS nur lesen; Linux per Treiber | Linux; Windows/macOS nur mit Zusatzsoftware |

Weitere: **APFS** (macOS), **XFS** und **Btrfs** (Linux), **ReFS** (Windows Server, für große Datenvolumen).

**Journaling** heißt: Das Dateisystem protokolliert geplante Änderungen, bevor es sie ausführt. Fällt der Strom aus, kann es sich schnell in einen konsistenten Zustand bringen – ohne stundenlange Prüfung.

**Die FAT32-Falle:** FAT32 speichert die Dateigröße in einem **32-Bit-Feld**. Die größte Datei hat deshalb 2³² − 1 = **4.294.967.295 Byte**. Achtung beim Umrechnen:
- **4 GiB** = 4 · 2³⁰ Byte = 4.294.967.296 Byte → **1 Byte zu viel**!
- **4,2 GB** = 4.200.000.000 Byte → passt noch (GB ist dezimal).
- **4,3 GB** = 4.300.000.000 Byte → passt nicht.

Praxisbeispiel: Manche Windows-Installations-ISOs enthalten eine Datei \`install.wim\` mit über 4 GiB. Kopiert man sie auf einen FAT32-Stick, bricht der Kopiervorgang ab („Die Datei ist zu groß für das Zieldateisystem“). Lösung: das Media Creation Tool von Microsoft verwenden oder die Datei mit \`dism /Split-Image\` aufteilen.`,
        },
        {
          type: 'visual',
          title: 'Welches Dateisystem wofür?',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'FAT32', text: 'Maximale Kompatibilität, kleine Dateien < 4 GiB, ältere Geräte, EFI-Partition.', icon: 'Usb' },
                { title: 'exFAT', text: 'USB-Sticks und SD-Karten mit großen Dateien, Austausch Windows ↔ macOS.', icon: 'MemoryStick' },
                { title: 'NTFS', text: 'Windows-System- und Datenpartitionen, Berechtigungen, Journaling, BitLocker.', icon: 'HardDrive' },
                { title: 'ext4', text: 'Linux-System- und Datenpartitionen mit Unix-Rechten und Journaling.', icon: 'Terminal' },
              ],
            },
          },
          caption: 'Faustregel: intern NTFS (Windows) bzw. ext4 (Linux), extern exFAT – FAT32 nur, wenn ein Gerät nichts anderes kann.',
        },
        {
          type: 'example',
          title: 'Passt die Schulungsaufzeichnung auf den Stick?',
          problem: 'Eine Videodatei hat **4.150 MiB**. Der USB-Stick ist mit FAT32 formatiert. Passt die Datei?',
          steps: [
            { label: 'Grenze', body: 'FAT32: max. 4.294.967.295 Byte pro Datei.' },
            { label: 'Umrechnen', body: '4.150 MiB = 4.150 · 1.048.576 Byte = **4.351.590.400 Byte**.' },
            { label: 'Vergleichen', body: '4.351.590.400 > 4.294.967.295 → passt **nicht**.' },
            { label: 'Lösung', body: 'Stick (nach Sicherung) mit **exFAT** formatieren – exFAT wird von Windows und macOS gelesen und geschrieben.' },
          ],
          result: 'Die Datei ist ca. 54 MiB zu groß für FAT32 → exFAT verwenden.',
        },
        {
          type: 'check',
          question: {
            id: 'b01-c05', kind: 'number', skill: 'os.filesystems', difficulty: 2,
            prompt: 'Wie viele **Byte** darf eine einzelne Datei auf einem FAT32-Dateisystem höchstens groß sein?',
            answer: 4294967295, unit: 'Byte',
            hints: ['Die Dateigröße steht in einem 32-Bit-Feld.'],
            misconceptions: [{ answer: '4294967296', error: 'fs-fat32-grenze', why: 'Das sind genau 4 GiB = 2³² Byte – das größte darstellbare 32-Bit-Feld ist aber 2³² − 1.' }, { answer: '4000000000', error: 'einheit-gb-gib', why: 'Die Grenze ist binär (2³² − 1 Byte), nicht 4 · 10⁹ Byte.' }],
            explanation: '2³² − 1 = **4.294.967.295 Byte** = 4 GiB − 1 Byte (≈ 4,29 GB).',
          },
        },
        { type: 'practice', title: 'Übung: Passt die Datei? Welches Dateisystem?', generator: 'sys.fs', count: 5, difficulty: 2 },
        { type: 'summary', points: ['FAT32: max. 4 GiB − 1 Byte pro Datei, keine Rechte, sehr kompatibel.', 'exFAT: große Dateien auf Wechseldatenträgern, Windows + macOS.', 'NTFS: Windows-Standard mit ACL, Journaling, EFS, BitLocker.', 'ext4: Linux-Standard, max. Datei 16 TiB.', 'GB (10⁹) und GiB (2³⁰) sauber unterscheiden!'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b01-l05',
      title: 'Installation planen, Imaging und Deployment',
      minutes: 30,
      relevance: 'ap1',
      skills: ['os.install', 'os.deploy'],
      steps: [
        {
          type: 'explain',
          title: 'Eine Installation in Phasen',
          body: `Eine Betriebssysteminstallation beginnt nicht mit dem Einlegen des USB-Sticks, sondern mit **Planung**.

| Phase | Tätigkeiten |
|---|---|
| **1. Vorbereitung** | Anforderungen und Systemvoraussetzungen prüfen, Lizenz klären, Treiber des Herstellers bereitlegen, bei Neuinstallation eines bestehenden PCs: **Datensicherung** (Benutzerdaten, E-Mail-Archiv, Lizenzschlüssel, Browser-Favoriten) |
| **2. Installationsmedium** | ISO laden (Hersteller-Website), bootfähigen USB-Stick erstellen; Bootreihenfolge/Boot-Menü in UEFI wählen |
| **3. Partitionierung** | Partitionsstil (GPT), Partitionen anlegen, Dateisystem wählen |
| **4. Grundinstallation** | Dateien kopieren, Neustarts, Ersteinrichtung (**OOBE**: Region, Tastatur, Netzwerk, Konto) |
| **5. Nacharbeiten** | Treiber, **Updates**, Domänenbeitritt, Software, Drucker, Netzlaufwerke, Sicherheitseinstellungen (Virenschutz, BitLocker) |
| **6. Test & Abnahme** | Funktionstest mit Checkliste, Benutzer einweisen |
| **7. Dokumentation** | Installationsprotokoll: Seriennummer, OS-Version/Build, Lizenz, installierte Software, Netzwerkkonfiguration, Besonderheiten |

**Installationsarten:**

| Art | Beschreibung | Vor-/Nachteil |
|---|---|---|
| **Neuinstallation (Clean Install)** | Datenträger wird neu partitioniert, alles neu | sauberes System – Daten und Programme müssen neu eingerichtet werden |
| **Upgrade (In-Place)** | neue Version über die alte, Daten und Programme bleiben | schnell – alte Probleme werden mitgenommen |
| **Image-basiert** | vorbereitetes Abbild wird aufgespielt | sehr schnell und einheitlich bei vielen PCs |
| **Unbeaufsichtigt (unattended)** | Antwortdatei (\`unattend.xml\`) beantwortet alle Fragen automatisch | keine Eingaben nötig, reproduzierbar |`,
        },
        {
          type: 'explain',
          title: 'Imaging und Deployment für viele Arbeitsplätze',
          body: `Bei 20 neuen PCs installiert niemand 20-mal von Hand. Stattdessen wird **automatisiert verteilt (Deployment)**.

**Klassisches Imaging:**
1. **Referenz-/Musterrechner** einrichten (OS, Updates, Standardsoftware, Einstellungen).
2. Mit **Sysprep** generalisieren: \`sysprep /generalize /oobe /shutdown\` – entfernt rechnerspezifische Informationen (z. B. die Sicherheitskennung **SID**, Hardware-Zuordnungen), damit geklonte PCs nicht identisch sind.
3. **Abbild (Image)** erstellen (WIM-Datei, z. B. mit DISM) und zentral speichern.
4. Zielrechner booten über das Netzwerk (**PXE**) oder vom Stick und bekommen das Image.
5. Nach dem ersten Start: Rechnername, Domänenbeitritt, Benutzerkonto – automatisch über Antwortdatei.

**PXE-Boot (Preboot Execution Environment):** Die Netzwerkkarte holt sich per **DHCP** eine IP-Adresse und die Info, welcher Server die Bootdatei bereitstellt; diese wird per **TFTP** geladen und startet z. B. eine Installationsumgebung (WinPE).

**Werkzeuge:**

| Werkzeug | Einordnung |
|---|---|
| **WDS** (Windows Deployment Services) | klassische Serverrolle für PXE-Boot und Image-Verteilung; für Windows 11 unterstützt Microsoft den reinen WDS-Weg nur noch eingeschränkt |
| **Microsoft Configuration Manager (MECM/SCCM)** | umfangreiche Verteilung von OS, Software und Updates im Unternehmen |
| **Windows Autopilot + Intune** | cloudbasiert: Der PC kommt vom Händler mit vorinstalliertem Windows, meldet sich mit Firmenkonto an und konfiguriert sich selbst (kein eigenes Image nötig) |
| **Clonezilla, FOG Project** | Open-Source-Imaging |
| **Linux** | automatisierte Installation über Kickstart (RHEL), Preseed (Debian), autoinstall/cloud-init (Ubuntu) |

**Vorteile automatisierter Verteilung:** einheitliche, dokumentierte Konfiguration (**Qualität**), Zeitersparnis, weniger Fehler, schnelle Wiederherstellung nach Defekt.`,
        },
        {
          type: 'visual',
          title: 'PXE-Boot eines neuen Arbeitsplatzes',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['Neuer PC (PXE)', 'DHCP-Server', 'Deployment-Server'],
              messages: [
                { from: 0, to: 1, label: 'DHCPDISCOVER (mit PXE-Kennung)' },
                { from: 1, to: 0, label: 'DHCPOFFER: IP-Adresse + Bootserver/Bootdatei' },
                { from: 0, to: 2, label: 'Bootdatei per TFTP anfordern' },
                { from: 2, to: 0, label: 'Bootprogramm + WinPE' },
                { from: 0, to: 2, label: 'Image anfordern' },
                { from: 2, to: 0, label: 'Image + Antwortdatei', note: 'danach: Treiber, Domänenbeitritt, Software' },
              ],
            },
          },
          caption: 'Der PC braucht dafür nur eine PXE-fähige Netzwerkkarte und die passende Boot-Einstellung im UEFI.',
        },
        {
          type: 'example',
          title: 'Zeitvergleich: 20 PCs manuell vs. per Image',
          problem: 'Manuelle Installation inkl. Updates und Software: 3 h pro PC. Image-Verfahren: einmalig 6 h für Musterrechner + Image, danach 30 min pro PC. Wie viel Zeit spart das Image-Verfahren bei 20 PCs?',
          steps: [
            { label: 'Manuell', body: '20 · 3 h = **60 h**.' },
            { label: 'Image', body: '6 h + 20 · 0,5 h = 6 h + 10 h = **16 h**.' },
            { label: 'Ersparnis', body: '60 h − 16 h = **44 h**.' },
            { label: 'Ab wann lohnt es sich?', body: '3 n > 6 + 0,5 n ⇔ 2,5 n > 6 ⇔ n > 2,4 → bereits ab **3 PCs**.' },
          ],
          result: 'Das Image-Verfahren spart bei 20 PCs 44 Stunden und lohnt sich schon ab 3 Rechnern – zusätzlich sind alle PCs identisch konfiguriert.',
        },
        {
          type: 'check',
          question: {
            id: 'b01-c06', kind: 'order', skill: 'os.install', difficulty: 2,
            prompt: 'Bringe die Schritte einer Neuinstallation eines bestehenden Arbeitsplatzes in die richtige Reihenfolge.',
            items: ['Benutzerdaten sichern', 'Bootfähigen USB-Stick erstellen und davon starten', 'Datenträger partitionieren (GPT)', 'Windows installieren und Ersteinrichtung durchführen', 'Treiber und Updates installieren', 'Anwendungssoftware installieren und Daten zurückspielen', 'Funktionstest und Installationsprotokoll'],
            explanation: 'Erst sichern, dann installieren, dann Treiber/Updates, dann Software und Daten, am Ende Test und Dokumentation.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'b01-c07', kind: 'text', skill: 'os.deploy', difficulty: 2,
            prompt: 'Mit welchem Windows-Werkzeug wird ein Musterrechner vor dem Erstellen eines Images **generalisiert** (SID entfernen)?',
            accept: ['Sysprep', 'sysprep.exe', 'sysprep /generalize'],
            explanation: '**Sysprep** mit dem Parameter `/generalize`.',
          },
        },
        { type: 'practice', title: 'Übung: Installation und Deployment', questionIds: ['b01-q014', 'b01-q015', 'b01-q016', 'b01-q017', 'b01-q018'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Phasen: Vorbereitung (Sicherung!) → Medium → Partitionierung → Installation → Nacharbeiten → Test → Dokumentation.', 'Clean Install, In-Place-Upgrade, Image, unattended (unattend.xml).', 'Imaging: Musterrechner → Sysprep → Image → Verteilung (PXE).', 'PXE: DHCP liefert IP + Bootserver, Bootdatei per TFTP.', 'Moderne Alternative: Autopilot + Intune, MECM.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b01-l06',
      title: 'Treiber und Updates',
      minutes: 20,
      relevance: 'ap1',
      skills: ['os.maintain'],
      steps: [
        {
          type: 'explain',
          title: 'Treiber: die Übersetzer zur Hardware',
          body: `Ein **Treiber** ist Software, die dem Betriebssystem erklärt, wie es ein bestimmtes Gerät ansteuert. Viele Standardtreiber bringt Windows mit; für Grafik, Chipsatz, Netzwerk oder Spezialgeräte liefert der **Hersteller** aktuellere oder überhaupt erst passende Treiber.

| Thema | Praxis |
|---|---|
| Woher? | Hersteller-Website (Supportseite mit Modell- oder Seriennummer), Windows Update, Hersteller-Tools |
| Signatur | 64-Bit-Windows lädt Kernelmodus-Treiber nur mit gültiger **digitaler Signatur** – unsignierte Treiber aus dubiosen Quellen sind ein Sicherheitsrisiko |
| Prüfen | **Geräte-Manager** (\`devmgmt.msc\`): gelbes Ausrufezeichen = Problem, „Unbekanntes Gerät“ = Treiber fehlt |
| Probleme | Treiber zurücksetzen („Vorheriger Treiber“), deinstallieren, aktuelle Version installieren |
| Linux | Treiber sind meist **Kernelmodule** (\`lsmod\`, \`lspci -k\`, \`modprobe\`) |

**Firmware** (UEFI, SSD-Firmware, Druckerfirmware) ist die Software *im* Gerät. Auch sie bekommt Updates – z. B. für Sicherheitslücken oder neue CPU-Unterstützung.`,
        },
        {
          type: 'explain',
          title: 'Updates und Patchmanagement',
          body: `Software hat Fehler – manche davon sind **Sicherheitslücken**. Angreifer nutzen bekannte Lücken oft schon wenige Tage nach Veröffentlichung aus. Deshalb gehören Updates zu den wichtigsten Schutzmaßnahmen (auch im BSI-IT-Grundschutz).

**Update-Arten bei Windows:**

| Art | Inhalt | Rhythmus |
|---|---|---|
| **Qualitätsupdates** (kumulativ) | Sicherheits- und Fehlerkorrekturen | monatlich am **Patchday** („Patch Tuesday“, 2. Dienstag im Monat), dringende Lücken auch außerplanmäßig |
| **Funktionsupdates** | neue Windows-Version (z. B. 24H2 → 25H2) | Windows 11: jährlich; Support je Version 24 Monate (Home/Pro) bzw. 36 Monate (Enterprise/Education) |
| **Treiber-/Firmware-Updates** | Gerätesoftware | nach Bedarf |

**Patchmanagement im Unternehmen** – nicht jeder PC installiert einfach alles sofort:
1. Updates **erfassen** (welche gibt es?)
2. **Bewerten** (Kritikalität, betroffene Systeme)
3. In einer **Testgruppe** (Pilot-PCs) installieren und prüfen
4. **Verteilen** an alle Systeme (gestaffelt, in Wartungsfenstern)
5. **Kontrollieren** und dokumentieren (Erfolgsquote, fehlgeschlagene Installationen)

Werkzeuge: Windows Update for Business / **Intune**, **MECM**, **WSUS** (Windows Server Update Services – von Microsoft als veraltet eingestuft, aber weiterhin enthalten). Unter Linux: Paketmanager, z. B. \`sudo apt update && sudo apt upgrade\` (Debian/Ubuntu) oder \`sudo dnf upgrade\` (RHEL/Fedora).

**Vor größeren Updates:** Datensicherung bzw. Wiederherstellungspunkt/Snapshot – falls etwas schiefgeht.`,
        },
        {
          type: 'visual',
          title: 'Patchmanagement-Kreislauf',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Erfassen', text: 'Welche Updates und Lücken gibt es? Herstellerhinweise, CERT-Bund-Warnungen.', icon: 'Search' },
                { title: 'Testen', text: 'Pilotgruppe installiert zuerst – läuft die Fachanwendung noch?', icon: 'FlaskConical' },
                { title: 'Verteilen', text: 'Gestaffelt im Wartungsfenster per Intune, MECM oder WSUS.', icon: 'Send' },
                { title: 'Kontrollieren', text: 'Berichte prüfen, Fehlschläge nacharbeiten, dokumentieren.', icon: 'ClipboardCheck' },
              ],
            },
          },
          caption: 'Ein geregelter Ablauf verhindert, dass ein fehlerhaftes Update alle Arbeitsplätze gleichzeitig lahmlegt.',
        },
        {
          type: 'example',
          title: 'Nach dem Update startet der Drucker nicht mehr',
          problem: 'Nach einem Treiberupdate druckt der Abteilungsdrucker der Buchhaltung nicht mehr; im Geräte-Manager hat er ein gelbes Ausrufezeichen. Wie gehst du vor?',
          steps: [
            { label: '1. Eingrenzen', body: 'Betrifft es alle Nutzer oder nur einen PC? Seit wann? → seit dem Treiberupdate gestern.' },
            { label: '2. Sofortmaßnahme', body: 'Im Geräte-Manager: Eigenschaften → Treiber → **Vorheriger Treiber** (Rollback).' },
            { label: '3. Test', body: 'Testseite drucken, Benutzer bestätigt Funktion.' },
            { label: '4. Nachhaltige Lösung', body: 'Auf der Hersteller-Website eine korrigierte Version suchen; Update zuerst in der Testgruppe prüfen.' },
            { label: '5. Dokumentieren', body: 'Ticket mit Ursache, Lösung und Treiberversion aktualisieren.' },
          ],
          result: 'Rollback stellt den Betrieb schnell wieder her; die Ursache wird anschließend geprüft und dokumentiert.',
        },
        {
          type: 'check',
          question: {
            id: 'b01-c08', kind: 'text', skill: 'os.maintain', difficulty: 1,
            prompt: 'Wie heißt das Windows-Werkzeug, in dem du Geräte mit fehlendem oder fehlerhaftem Treiber erkennst? (Name oder Befehl)',
            accept: ['Geräte-Manager', 'Gerätemanager', 'devmgmt.msc', 'Geraetemanager', 'Device Manager'],
            explanation: '**Geräte-Manager** (`devmgmt.msc`).',
          },
        },
        { type: 'practice', title: 'Übung: Treiber und Updates', questionIds: ['b01-q019', 'b01-q020', 'b01-q021', 'b01-q022'], count: 4, difficulty: 2 },
        { type: 'summary', points: ['Treiber = Übersetzer zwischen OS und Gerät; nur signierte Treiber aus Herstellerquellen.', 'Geräte-Manager zeigt Treiberprobleme; Rollback bei fehlerhaftem Update.', 'Qualitätsupdates monatlich (Patchday), Funktionsupdates jährlich.', 'Patchmanagement: erfassen → testen → verteilen → kontrollieren.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b01-l07',
      title: 'Fernzugriff: Remotedesktop, SSH und Fernwartung',
      minutes: 20,
      relevance: 'ap1',
      skills: ['os.remote'],
      steps: [
        {
          type: 'explain',
          title: 'Drei Arten, aus der Ferne zu arbeiten',
          body: `| | **Remotedesktop (RDP)** | **SSH** | **Fernwartung/Remotehilfe** |
|---|---|---|---|
| Zweck | eigene **Sitzung** auf einem entfernten Windows-PC/-Server | verschlüsselte **Kommandozeile** (v. a. Linux, Netzwerkgeräte) | Support sieht/steuert den Bildschirm des **angemeldeten** Benutzers |
| Port | **TCP/UDP 3389** | **TCP 22** | herstellerabhängig (meist ausgehend über HTTPS 443) |
| Programme | \`mstsc\`, Windows App | \`ssh benutzer@host\`, PuTTY | Remotehilfe (Quick Assist), TeamViewer, AnyDesk u. a. |
| Voraussetzung | Host: Windows **Pro/Enterprise** oder Server; Remotedesktop aktiviert; Benutzer in der Gruppe „Remotedesktopbenutzer“ | SSH-Server (\`sshd\`) aktiv | Zustimmung des Benutzers, Sitzungscode |

**Sicherheit beim Fernzugriff:**
- **RDP niemals direkt ins Internet freigeben** (Port 3389 wird ständig gescannt und angegriffen). Zugriff von außen nur über **VPN** oder ein **Remotedesktop-Gateway** (HTTPS).
- **NLA (Network Level Authentication)** aktivieren: Anmeldung erfolgt, bevor eine Sitzung aufgebaut wird.
- Starke Passwörter bzw. **Mehr-Faktor-Authentifizierung**, Kontosperrung nach Fehlversuchen.
- SSH: **Schlüsselbasierte Anmeldung** statt Passwort, Root-Login verbieten (\`PermitRootLogin no\`).
- **Telnet** überträgt alles im Klartext – nicht mehr verwenden, stattdessen SSH.
- Fernwartung: nur mit **Einverständnis** des Benutzers, Sitzung protokollieren, keine Dauer-Freigaben; Datenschutz beachten (der Supporter sieht ggf. personenbezogene Daten).`,
        },
        {
          type: 'visual',
          title: 'Sicherer RDP-Zugriff aus dem Homeoffice',
          widget: {
            kind: 'topology',
            data: {
              nodes: [
                { id: 'ho', type: 'laptop', label: 'Notebook Homeoffice', sub: 'mstsc', x: 90, y: 200 },
                { id: 'inet', type: 'internet', label: 'Internet', x: 260, y: 200 },
                { id: 'fw', type: 'firewall', label: 'Firewall / VPN-Gateway', sub: 'nur VPN offen', x: 440, y: 200 },
                { id: 'sw', type: 'switch', label: 'Switch', x: 590, y: 200 },
                { id: 'pc', type: 'pc', label: 'Büro-PC', sub: 'RDP 3389 intern', x: 720, y: 110 },
                { id: 'srv', type: 'server', label: 'Server', sub: 'RDP 3389 intern', x: 720, y: 300 },
              ],
              links: [
                { from: 'ho', to: 'inet', style: 'wan' },
                { from: 'inet', to: 'fw', style: 'vpn', label: 'VPN-Tunnel' },
                { from: 'fw', to: 'sw' },
                { from: 'sw', to: 'pc', label: 'RDP' },
                { from: 'sw', to: 'srv', label: 'RDP' },
              ],
              zones: [{ label: 'Firmennetz Elektro Krämer', x: 380, y: 50, w: 410, h: 320, color: 'blue' }],
            },
          },
          caption: 'Port 3389 ist nur intern erreichbar; von außen geht es ausschließlich durch den VPN-Tunnel.',
        },
        {
          type: 'example',
          title: 'Remotedesktop auf einem neuen Arbeitsplatz einrichten',
          problem: 'Herr Becker (Vertrieb) möchte von seinem Firmen-Notebook aus dem Homeoffice auf seinen Büro-PC (Windows 11 Pro) zugreifen. Welche Schritte sind nötig?',
          steps: [
            { label: 'Edition prüfen', body: 'Büro-PC: Windows 11 **Pro** → kann RDP-Host sein (Home könnte es nicht).' },
            { label: 'RDP aktivieren', body: 'Einstellungen → System → Remotedesktop → Ein; **NLA** aktiviert lassen. Die Windows-Firewall-Regel wird dabei automatisch freigegeben.' },
            { label: 'Berechtigung', body: 'Herrn Beckers Domänenkonto der Gruppe *Remotedesktopbenutzer* hinzufügen (Administratoren dürfen ohnehin).' },
            { label: 'Netzweg', body: 'Zugriff nur über das Firmen-**VPN**; am Router/Firewall **keine** Portweiterleitung 3389.' },
            { label: 'Test & Doku', body: 'Verbindung mit `mstsc` testen, Rechnername/IP und Einstellungen dokumentieren.' },
          ],
          result: 'RDP auf Pro-Edition aktivieren, NLA an, Benutzer berechtigen, Zugriff von außen nur per VPN.',
        },
        {
          type: 'check',
          question: {
            id: 'b01-c09', kind: 'number', skill: 'os.remote', difficulty: 1,
            prompt: 'Welchen TCP-Port verwendet das Remote Desktop Protocol (RDP) standardmäßig?',
            answer: 3389,
            misconceptions: [{ answer: '22', error: 'port-verwechslung', why: '22 ist SSH.' }, { answer: '443', error: 'port-verwechslung', why: '443 ist HTTPS (z. B. RD-Gateway), RDP selbst nutzt 3389.' }],
            explanation: 'RDP: **3389** (TCP, zusätzlich UDP 3389 für bessere Performance).',
          },
        },
        { type: 'practice', title: 'Übung: Fernzugriff', questionIds: ['b01-q023', 'b01-q024', 'b01-q025', 'b01-q026'], count: 4, difficulty: 2 },
        { type: 'summary', points: ['RDP: TCP/UDP 3389, Host nur ab Windows Pro, NLA aktivieren.', 'RDP nie direkt ins Internet – VPN oder RD-Gateway.', 'SSH: TCP 22, verschlüsselt, Schlüsselanmeldung; Telnet ist Klartext.', 'Fernwartung nur mit Zustimmung und Protokoll.'] },
      ],
    },
  ],
  questions: [
    { id: 'b01-q001', kind: 'free', skill: 'os.tasks', difficulty: 1, prompt: 'Nenne vier Aufgaben eines Betriebssystems und erläutere eine davon an einem Beispiel.', modelAnswer: 'Prozessverwaltung, Speicherverwaltung, Dateiverwaltung, Geräteverwaltung (Treiber), Benutzer- und Rechteverwaltung, Benutzerschnittstelle. Beispiel Prozessverwaltung: Das Betriebssystem teilt die CPU-Zeit zwischen Programmen auf (Scheduling), sodass Browser, Outlook und Teams scheinbar gleichzeitig laufen.', keywords: ['Prozess', 'Speicher', 'Datei', 'Gerät', 'Treiber', 'Benutzer'], explanation: 'Jede der genannten Aufgaben zählt; die Erläuterung muss einen konkreten Ablauf beschreiben.' },
    { id: 'b01-q002', kind: 'match', skill: 'os.tasks', difficulty: 1, prompt: 'Ordne die Situation der zuständigen Betriebssystem-Aufgabe zu.', left: ['Ein neuer Drucker wird über einen Treiber angesprochen', 'Ein Programm darf nicht in den Speicherbereich eines anderen schreiben', 'Der Standardbenutzer darf keine Software installieren', 'Mehrere Programme teilen sich die CPU'], right: ['Geräteverwaltung', 'Speicherverwaltung', 'Benutzer- und Rechteverwaltung', 'Prozessverwaltung'], answer: [0, 1, 2, 3], explanation: 'Treiber → Geräte; Speicherschutz → Speicher; Rechte → Benutzerverwaltung; Scheduling → Prozesse.' },
    { id: 'b01-q003', kind: 'free', skill: 'os.tasks', difficulty: 2, prompt: 'Erläutere zwei Unterschiede zwischen einem Client- und einem Server-Betriebssystem.', modelAnswer: '1. Ein Server-OS ist auf viele gleichzeitige Netzwerkzugriffe und Dienste (Datei-, Druck-, Verzeichnis-, Webdienste) ausgelegt, ein Client-OS auf einen Benutzer, der direkt am Gerät arbeitet. 2. Server-Betriebssysteme bieten Serverrollen wie AD DS, DNS, DHCP oder Hyper-V und laufen oft ohne grafische Oberfläche (Server Core), Clients haben eine GUI mit Multimedia. 3. Lizenzierung: Server nach Kernen plus Zugriffslizenzen (CALs), Clients pro Gerät.', keywords: ['viele Zugriffe', 'Dienste', 'Rollen', 'Lizenz', 'CAL', 'GUI'], explanation: 'Zwei begründete Unterschiede genügen.' },
    { id: 'b01-q004', kind: 'single', skill: 'os.tasks', difficulty: 2, prompt: 'Ein Kunde möchte einen alten PC mit **32-Bit-Windows** und 8 GB eingebautem RAM weiter nutzen. Welches Problem besteht?', options: ['32-Bit-Systeme können höchstens 4 GiB Arbeitsspeicher adressieren.', '32-Bit-Systeme können keine Netzwerkkarte nutzen.', '32-Bit-Systeme unterstützen keine Benutzerkonten.', 'Es gibt kein Problem.'], answer: 0, distractors: { '1': { why: 'Netzwerkkarten funktionieren auch unter 32 Bit.', error: 'os-32bit' }, '2': { why: 'Benutzerkonten sind unabhängig von der Bitbreite.', error: 'os-32bit' }, '3': { why: '2³² Byte = 4 GiB – der Rest der 8 GB bleibt ungenutzt; außerdem gibt es Windows 11 nur als 64 Bit.', error: 'os-32bit' } }, explanation: '2³² Byte = **4 GiB** Adressraum. Windows 11 ist ausschließlich 64-Bit.' },
    { id: 'b01-q005', kind: 'table', skill: 'os.requirements', difficulty: 2, prompt: `Prüfe das Datenblatt eines gebrauchten PCs gegen die Mindestanforderungen von Windows 11. Trage **ja** (erfüllt) oder **nein** ein.

| Merkmal | Datenblatt |
|---|---|
| Prozessor | 2 Kerne, 3,1 GHz, 64 Bit, nicht in Microsofts Kompatibilitätsliste |
| RAM | 8 GB |
| SSD | 256 GB |
| Firmware | UEFI, Secure Boot |
| TPM | 1.2 |`, columns: [{ key: 'ok', label: 'erfüllt?', type: 'text' }], rows: [{ label: 'Prozessor', cells: { ok: { answer: 'nein', accept: ['n', 'no'] } } }, { label: 'RAM', cells: { ok: { answer: 'ja', accept: ['j', 'yes'] } } }, { label: 'Speicher', cells: { ok: { answer: 'ja', accept: ['j', 'yes'] } } }, { label: 'Firmware', cells: { ok: { answer: 'ja', accept: ['j', 'yes'] } } }, { label: 'TPM', cells: { ok: { answer: 'nein', accept: ['n', 'no'] } } }], hints: ['Achte bei der CPU nicht nur auf Kerne und Takt.', 'Windows 11 verlangt TPM in Version 2.0.'], explanation: 'CPU: Kerne/Takt/64 Bit reichen, aber der Prozessor muss **kompatibel** (auf der Liste) sein → nein. RAM 8 ≥ 4, SSD 256 ≥ 64, UEFI + Secure Boot → ja. **TPM 1.2 < 2.0** → nein. Ergebnis: offiziell nicht Windows-11-tauglich.' },
    { id: 'b01-q006', kind: 'free', skill: 'os.requirements', difficulty: 2, prompt: 'Ein Kunde fragt, warum er für seine neuen Büro-PCs nicht einfach **Windows 11 Home** nehmen kann – „das ist doch billiger“. Begründe in zwei bis drei Sätzen.', modelAnswer: 'Windows 11 Home kann keiner Active-Directory-Domäne (bzw. Entra ID) beitreten, hat keinen Gruppenrichtlinien-Editor und keine vollwertige BitLocker-Verwaltung; außerdem kann man sich nicht per Remotedesktop auf den PC verbinden. Für eine zentral verwaltete, sichere Firmenumgebung ist deshalb mindestens Windows 11 Pro nötig.', keywords: ['Domäne', 'Gruppenrichtlinien', 'BitLocker', 'Remotedesktop', 'Pro'], explanation: 'Domänenbeitritt ist das Hauptargument; BitLocker/GPO/RDP-Host ergänzen.' },
    { id: 'b01-q007', kind: 'multi', skill: 'os.requirements', difficulty: 2, prompt: 'Welche Funktionen fehlen in **Windows 11 Home** im Vergleich zu Pro?', options: ['Beitritt zu einer Active-Directory-Domäne', 'Remotedesktop als Host', 'Gruppenrichtlinien-Editor', 'Windows-Firewall', 'Microsoft Defender Antivirus'], answer: [0, 1, 2], explanation: 'Firewall und Defender sind in allen Editionen enthalten; Domäne, RDP-Host und gpedit gibt es erst ab Pro.' },
    { id: 'b01-q008', kind: 'text', skill: 'os.requirements', difficulty: 1, prompt: 'Welche Version des **Trusted Platform Module** setzt Windows 11 voraus? (z. B. 1.2)', accept: ['2.0', '2', 'TPM 2.0', '2,0'], explanation: '**TPM 2.0** – als Chip oder Firmware-TPM (Intel PTT, AMD fTPM).' },
    { id: 'b01-q009', kind: 'free', skill: 'os.partition', difficulty: 2, prompt: 'Erläutere die Aufgabe von **Secure Boot** und nenne eine Bedrohung, gegen die es schützt.', modelAnswer: 'Secure Boot ist eine UEFI-Funktion: Die Firmware startet nur Bootloader und Treiber, die mit einem hinterlegten, vertrauenswürdigen Schlüssel digital signiert sind. Dadurch können manipulierte Bootloader – z. B. Bootkits/Rootkits, die sich vor das Betriebssystem setzen – nicht unbemerkt geladen werden.', keywords: ['UEFI', 'Signatur', 'Bootloader', 'Bootkit', 'Rootkit'], explanation: 'Kern: Signaturprüfung beim Start → Schutz vor Bootkits.' },
    { id: 'b01-q010', kind: 'table', skill: 'os.partition', difficulty: 2, prompt: 'Vervollständige die Vergleichstabelle MBR – GPT (Zahlen ohne Einheit, außer bei der Größe: „2 TiB“ bzw. „unbegrenzt“).', columns: [{ key: 'mbr', label: 'MBR', type: 'text' }, { key: 'gpt', label: 'GPT', type: 'text' }], rows: [{ label: 'max. Anzahl (primärer) Partitionen unter Windows', cells: { mbr: { answer: '4', accept: ['vier'] }, gpt: { answer: '128' } } }, { label: 'max. Datenträgergröße (512-Byte-Sektoren)', cells: { mbr: { answer: '2 TiB', accept: ['2tib', '2 tib', '2', '2 tb', '2,2 tb', '2.2 tb'] }, gpt: { answer: 'unbegrenzt', accept: ['praktisch unbegrenzt', '8 zib', '8zib', '9,4 zb'] } } }, { label: 'benötigte Firmware zum Booten von Windows', cells: { mbr: { answer: 'BIOS', accept: ['bios/csm', 'csm', 'legacy', 'legacy bios', 'bios (csm)'] }, gpt: { answer: 'UEFI', accept: ['efi'] } } }], explanation: 'MBR: 4 primäre Partitionen, 2 TiB, BIOS/CSM. GPT: 128 Partitionen (Windows), 8 ZiB, UEFI.' },
    { id: 'b01-q011', kind: 'number', skill: 'os.partition', difficulty: 3, prompt: 'Eine **6-TB**-Festplatte (512-Byte-Sektoren) wurde mit MBR initialisiert. Wie viele **GB** (1 GB = 10⁹ Byte) bleiben ungenutzt? Runde auf ganze GB.', answer: 3801, unit: 'GB', hints: ['MBR-Grenze: 2³² · 512 Byte = 2.199.023.255.552 Byte.'], misconceptions: [{ answer: '4000', error: 'mbr-tib-tb', why: 'Die Grenze ist 2 TiB ≈ 2.199 GB, nicht 2.000 GB.' }], explanation: '6.000.000.000.000 − 2.199.023.255.552 = 3.800.976.744.448 Byte ≈ **3.801 GB**.' },
    { id: 'b01-q012', kind: 'free', skill: 'os.filesystems', difficulty: 2, prompt: 'Ein Mitarbeiter kann eine 6-GB-Videodatei nicht auf seinen neuen USB-Stick kopieren, obwohl 64 GB frei sind. Erkläre die Ursache und nenne eine Lösung, wenn der Stick an Windows- **und** Mac-Rechnern genutzt wird.', modelAnswer: 'Der Stick ist vermutlich mit FAT32 formatiert. FAT32 speichert die Dateigröße in 32 Bit und erlaubt höchstens 4 GiB − 1 Byte (ca. 4,29 GB) pro Datei. Lösung: Daten sichern und den Stick mit exFAT formatieren – exFAT unterstützt große Dateien und wird von Windows und macOS gelesen und geschrieben (NTFS kann macOS standardmäßig nur lesen).', keywords: ['FAT32', '4 GiB', 'exFAT', 'macOS'], explanation: 'Ursache: FAT32-Dateigrößengrenze. Lösung: exFAT.' },
    { id: 'b01-q013', kind: 'match', skill: 'os.filesystems', difficulty: 1, prompt: 'Ordne jedem Dateisystem die passende Eigenschaft zu.', left: ['FAT32', 'exFAT', 'NTFS', 'ext4'], right: ['max. 4 GiB − 1 Byte pro Datei, sehr kompatibel', 'für große Dateien auf Wechselmedien, Windows + macOS', 'Windows-Standard mit ACL-Berechtigungen und Journaling', 'Linux-Standard mit Unix-Rechten (rwx)'], answer: [0, 1, 2, 3], explanation: 'Siehe Dateisystem-Tabelle der Lektion.' },
    { id: 'b01-q014', kind: 'free', skill: 'os.install', difficulty: 2, prompt: 'Vor der Neuinstallation eines Arbeitsplatz-PCs der Buchhaltung: Nenne vier Dinge, die du **vorher** sichern bzw. notieren solltest.', modelAnswer: 'Benutzerdaten (Dokumente, Desktop, lokale Ablagen), E-Mail-Daten/Archive (z. B. PST-Dateien), Browser-Favoriten und Kennwörter (sofern nicht synchronisiert), Lizenzschlüssel und Zugangsdaten der Fachsoftware, Netzwerkeinstellungen (feste IP, Netzlaufwerke, Drucker), Liste der installierten Programme, ggf. BitLocker-Wiederherstellungsschlüssel.', keywords: ['Datensicherung', 'E-Mail', 'Lizenz', 'Drucker', 'Netzlaufwerk', 'Programme'], explanation: 'Alles, was nach der Neuinstallation verloren wäre, muss vorher gesichert werden.' },
    { id: 'b01-q015', kind: 'match', skill: 'os.install', difficulty: 2, prompt: 'Ordne die Installationsart der Beschreibung zu.', left: ['Clean Install', 'In-Place-Upgrade', 'Image-basierte Installation', 'Unbeaufsichtigte Installation'], right: ['Datenträger wird neu partitioniert, alles wird neu eingerichtet', 'neue Version über die alte, Programme und Daten bleiben', 'vorbereitetes Abbild eines Musterrechners wird aufgespielt', 'eine Antwortdatei beantwortet alle Fragen des Setups'], answer: [0, 1, 2, 3], explanation: 'Clean = neu; In-Place = darüber; Image = Abbild; unattended = Antwortdatei (unattend.xml).' },
    { id: 'b01-q016', kind: 'free', skill: 'os.deploy', difficulty: 2, prompt: 'Die Elektro Krämer GmbH tauscht 40 Arbeitsplätze aus. Erläutere zwei Vorteile einer Image-basierten Verteilung gegenüber Einzelinstallationen.', modelAnswer: '1. Zeitersparnis: Der Musterrechner wird einmal eingerichtet, die Verteilung pro PC dauert nur Minuten. 2. Einheitlichkeit und Qualität: Alle PCs haben dieselbe getestete Konfiguration (Software, Einstellungen, Sicherheitsrichtlinien), Fehler durch manuelle Abweichungen entfallen; die Konfiguration ist dokumentiert und reproduzierbar, z. B. für schnelle Wiederherstellung bei Defekten.', keywords: ['Zeit', 'einheitlich', 'Fehler', 'reproduzierbar', 'Wiederherstellung'], explanation: 'Zeit, Einheitlichkeit/Qualität, Reproduzierbarkeit.' },
    { id: 'b01-q017', kind: 'text', skill: 'os.deploy', difficulty: 2, prompt: 'Über welches Protokoll lädt ein PXE-Client seine Bootdatei vom Server? (Abkürzung)', accept: ['TFTP', 'Trivial File Transfer Protocol'], misconceptions: [{ answer: 'FTP', error: 'proto-verwechslung', why: 'PXE nutzt das einfache **TFTP** (UDP 69), nicht FTP.' }], explanation: 'DHCP liefert IP + Bootserver/Bootdatei, geladen wird per **TFTP**.' },
    { id: 'b01-q018', kind: 'number', skill: 'os.install', difficulty: 2, prompt: 'Manuelle Installation: 2,5 h pro PC. Image-Verfahren: einmalig 8 h Vorbereitung, dann 0,5 h pro PC. Wie viele Stunden spart das Image-Verfahren bei **25 PCs**?', answer: 42, unit: 'h', hints: ['Manuell: 25 · 2,5 h.', 'Image: 8 h + 25 · 0,5 h.'], explanation: 'Manuell 62,5 h; Image 8 + 12,5 = 20,5 h; Ersparnis **42 h**.' },
    { id: 'b01-q019', kind: 'order', skill: 'os.maintain', difficulty: 2, prompt: 'Bringe die Schritte des Patchmanagements in die richtige Reihenfolge.', items: ['Verfügbare Updates erfassen', 'Updates nach Kritikalität bewerten', 'Updates in einer Testgruppe installieren', 'Updates gestaffelt auf alle Systeme verteilen', 'Erfolg kontrollieren und dokumentieren'], explanation: 'Erfassen → Bewerten → Testen → Verteilen → Kontrollieren.' },
    { id: 'b01-q020', kind: 'free', skill: 'os.maintain', difficulty: 2, prompt: 'Warum werden Updates in Unternehmen nicht sofort auf allen Rechnern installiert, sondern zuerst in einer Testgruppe? Begründe.', modelAnswer: 'Ein Update kann Fehler enthalten oder mit Fachanwendungen bzw. Treibern unverträglich sein. Wird es zuerst auf wenigen Pilot-PCs getestet, fallen Probleme auf, bevor alle Arbeitsplätze betroffen sind; der Betrieb bleibt gesichert. Kritische Sicherheitsupdates werden trotzdem zügig verteilt, ggf. mit verkürzter Testphase.', keywords: ['Testgruppe', 'Fehler', 'Fachanwendung', 'Verfügbarkeit', 'zügig'], explanation: 'Risiko-Abwägung zwischen Sicherheitslücke und Betriebsstörung.' },
    { id: 'b01-q021', kind: 'text', skill: 'os.maintain', difficulty: 1, prompt: 'An welchem Wochentag im Monat veröffentlicht Microsoft regulär seine Sicherheitsupdates? (z. B. „1. Montag“)', accept: ['2. Dienstag', 'zweiter Dienstag', 'zweiten Dienstag', '2. dienstag im monat', 'patch tuesday', 'dienstag'], explanation: 'Am **2. Dienstag** im Monat („Patch Tuesday“/Patchday).' },
    { id: 'b01-q022', kind: 'text', skill: 'os.maintain', difficulty: 2, prompt: 'Mit welcher Befehlsfolge aktualisierst du unter **Ubuntu/Debian** die Paketlisten und installierst danach alle verfügbaren Updates? (zwei Befehle mit sudo, verbunden mit &&)', accept: ['sudo apt update && sudo apt upgrade', 'sudo apt update && sudo apt upgrade -y', 'sudo apt-get update && sudo apt-get upgrade', 'sudo apt update && sudo apt full-upgrade'], explanation: '`apt update` lädt die Paketlisten, `apt upgrade` installiert die Aktualisierungen.' },
    { id: 'b01-q023', kind: 'free', skill: 'os.remote', difficulty: 2, prompt: 'Der Geschäftsführer möchte, dass der Router Port 3389 auf seinen Büro-PC weiterleitet, damit er von zu Hause per Remotedesktop arbeiten kann. Nimm Stellung und schlage eine sichere Alternative vor.', modelAnswer: 'Davon ist abzuraten: Ein direkt aus dem Internet erreichbarer RDP-Port wird automatisiert gescannt und mit Passwort-Angriffen (Brute Force) oder Exploits angegriffen. Sicherer ist ein VPN-Zugang (Remote-Access-VPN mit Mehr-Faktor-Authentifizierung), über den er erst ins Firmennetz gelangt und dann intern RDP nutzt, oder ein Remotedesktop-Gateway über HTTPS. Zusätzlich NLA aktivieren und Kontosperrung konfigurieren.', keywords: ['Brute Force', 'VPN', 'MFA', 'Gateway', 'NLA'], explanation: 'Kein offener RDP-Port im Internet – VPN oder RD-Gateway.' },
    { id: 'b01-q024', kind: 'match', skill: 'os.remote', difficulty: 1, prompt: 'Ordne die Dienste ihren Standardports zu.', left: ['RDP', 'SSH', 'Telnet', 'HTTPS (z. B. RD-Gateway)'], right: ['3389', '22', '23', '443'], answer: [0, 1, 2, 3], explanation: 'RDP 3389, SSH 22, Telnet 23, HTTPS 443.' },
    { id: 'b01-q025', kind: 'single', skill: 'os.remote', difficulty: 2, prompt: 'Warum soll für die Administration eines Linux-Servers **SSH statt Telnet** verwendet werden?', options: ['SSH verschlüsselt die gesamte Sitzung inkl. Passwort, Telnet überträgt im Klartext.', 'SSH ist schneller, weil es UDP nutzt.', 'Telnet funktioniert nur unter Windows.', 'SSH braucht keine Authentifizierung.'], answer: 0, distractors: { '1': { why: 'SSH nutzt TCP (Port 22).', error: 'ssh-telnet' }, '2': { why: 'Telnet gibt es auf vielen Systemen – das Problem ist der Klartext.', error: 'ssh-telnet' }, '3': { why: 'SSH authentifiziert per Passwort oder Schlüssel.', error: 'ssh-telnet' } }, explanation: 'Telnet sendet Benutzername und Passwort im **Klartext**; SSH verschlüsselt alles.' },
    { id: 'b01-q026', kind: 'free', skill: 'os.remote', difficulty: 2, prompt: 'Du sollst einer Kollegin per Fernwartungssoftware (z. B. Remotehilfe) bei einem Outlook-Problem helfen. Nenne drei Regeln, die du dabei beachtest.', modelAnswer: '1. Nur mit ausdrücklicher Zustimmung der Kollegin verbinden; sie sieht, was ich tue, und kann die Sitzung beenden. 2. Vorher vertrauliche Fenster/Dokumente schließen lassen (Datenschutz). 3. Sitzung im Ticket dokumentieren (Zeit, Tätigkeit, Ergebnis). 4. Keine dauerhaften Freigaben, Sitzung nach Abschluss beenden. 5. Nur freigegebene Fernwartungswerkzeuge der Firma verwenden.', keywords: ['Zustimmung', 'Datenschutz', 'dokumentieren', 'beenden'], explanation: 'Einwilligung, Datenschutz, Dokumentation, Sitzungsende.' },
    { id: 'b01-q027', kind: 'single', skill: 'os.filesystems', difficulty: 2, prompt: 'Eine Datei von **4 GiB** soll auf einen FAT32-Stick. Was passiert?', options: ['Das Kopieren schlägt fehl, weil 4 GiB genau 1 Byte über der FAT32-Grenze liegt.', 'Es klappt, da die Grenze bei 4 GiB liegt.', 'Es klappt nur, wenn der Stick größer als 32 GB ist.', 'FAT32 kann gar keine Dateien über 2 GiB speichern.'], answer: 0, distractors: { '1': { why: 'Die Grenze ist 2³² − 1 Byte = 4 GiB − 1 Byte.', error: 'fs-fat32-grenze' }, '2': { why: 'Die Stickgröße spielt für die Dateigrößengrenze keine Rolle.', error: 'fs-fat32-grenze' }, '3': { why: 'Die 2-GiB-Grenze gab es bei FAT16, nicht bei FAT32.', error: 'fs-fat32-grenze' } }, explanation: '4 GiB = 4.294.967.296 Byte > 4.294.967.295 Byte.' },
    { id: 'b01-q028', kind: 'text', skill: 'os.partition', difficulty: 2, prompt: 'Mit welchem Dateisystem ist die **EFI-Systempartition** eines UEFI-Rechners formatiert?', accept: ['FAT32', 'FAT'], explanation: 'Die ESP ist **FAT32**-formatiert, weil jede UEFI-Firmware FAT lesen kann.' },
    { id: 'b01-q029', kind: 'free', skill: 'os.partition', difficulty: 2, prompt: 'Erläutere, wofür Windows das **TPM 2.0** nutzt (zwei Beispiele).', modelAnswer: 'Das TPM ist ein manipulationssicherer Schlüsselspeicher. 1. BitLocker: Der Schlüssel zur Laufwerkverschlüsselung wird im TPM versiegelt und nur freigegeben, wenn der Startvorgang unverändert ist (Messung beim Booten). 2. Windows Hello: Anmeldeschlüssel werden im TPM geschützt, sodass sie nicht vom Gerät kopiert werden können. Weitere: Geräteattestierung, Measured Boot.', keywords: ['Schlüssel', 'BitLocker', 'Windows Hello', 'Startvorgang'], explanation: 'BitLocker und Windows Hello sind die Standardbeispiele.' },
    { id: 'b01-q030', kind: 'single', skill: 'os.install', difficulty: 2, prompt: 'Ein Windows-11-Setup vom USB-Stick findet keine Festplatte, die SSD ist im UEFI aber sichtbar. Was ist die wahrscheinlichste Ursache?', options: ['Es fehlt ein Speichercontroller-Treiber (z. B. für Intel RST/VMD), der im Setup nachgeladen werden muss.', 'Die SSD ist zu groß für Windows.', 'Der USB-Stick ist mit FAT32 formatiert.', 'Secure Boot ist aktiviert.'], answer: 0, distractors: { '1': { why: 'GPT unterstützt praktisch beliebig große Datenträger.', error: 'install-treiber' }, '2': { why: 'Vom FAT32-Stick wird gebootet, die Ziel-SSD hat damit nichts zu tun.', error: 'install-treiber' }, '3': { why: 'Secure Boot verhindert nicht die Erkennung von Datenträgern.', error: 'install-treiber' } }, explanation: 'Bei RAID-/VMD-Controllern braucht das Setup oft einen Herstellertreiber („Treiber laden“).' },
    { id: 'b01-q031', kind: 'free', skill: 'os.install', difficulty: 2, prompt: 'Nenne fünf Angaben, die in ein **Installationsprotokoll** für einen neu eingerichteten Arbeitsplatz gehören.', modelAnswer: 'Gerät (Hersteller, Modell, Seriennummer/Inventarnummer), Betriebssystem mit Edition, Version/Build und Lizenz, installierte Treiber und Software mit Version und Lizenz, Netzwerkkonfiguration (Rechnername, IP/DHCP, Domäne), Benutzer/Standort, Datum und ausführende Person, durchgeführte Tests und Besonderheiten/offene Punkte.', keywords: ['Seriennummer', 'Version', 'Lizenz', 'Rechnername', 'Datum', 'Test'], explanation: 'Alles, was zur Nachvollziehbarkeit und Wiederherstellung nötig ist.' },
    { id: 'b01-q032', kind: 'text', skill: 'os.partition', difficulty: 2, prompt: 'Welches Windows-Kommandozeilenwerkzeug wandelt einen Systemdatenträger **ohne Datenverlust** von MBR in GPT um?', accept: ['mbr2gpt', 'mbr2gpt.exe', 'mbr2gpt /convert'], explanation: '`mbr2gpt /convert` (danach im UEFI den Bootmodus auf UEFI umstellen).' },
    { id: 'b01-q033', kind: 'single', skill: 'os.deploy', difficulty: 3, prompt: 'Warum muss ein Musterrechner vor dem Erstellen des Images mit **Sysprep** generalisiert werden?', options: ['Damit rechnerspezifische Merkmale wie die SID entfernt und auf jedem Zielrechner neu erzeugt werden.', 'Damit das Image kleiner wird.', 'Damit die Lizenz automatisch auf alle Rechner übertragen wird.', 'Damit Treiber dauerhaft entfernt werden.'], answer: 0, distractors: { '1': { why: 'Die Größe ändert sich kaum – es geht um eindeutige Systemkennungen.', error: 'sysprep' }, '2': { why: 'Lizenzen müssen trotzdem für jedes Gerät vorhanden sein.', error: 'sysprep' }, '3': { why: 'Treiber werden beim ersten Start neu erkannt; „entfernen“ ist nicht der Zweck.', error: 'sysprep' } }, explanation: 'Sysprep /generalize entfernt SID, Rechnername und Hardwarebindungen; beim ersten Start (OOBE) werden sie neu gesetzt.' },
  ],
};
