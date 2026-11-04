import type { Module } from '../types';

export const s03: Module = {
  id: 's03',
  nr: 3,
  area: 'sicherheit',
  title: 'Datensicherung und Wiederherstellung',
  short: 'Voll-, inkrementelle und differenzielle Sicherung, Speicherbedarf und Dauer berechnen, Generationenprinzip, 3-2-1-Regel, RPO/RTO, Wiederherstellungstests und Archivierung.',
  icon: 'HardDrive',
  relevance: 'ap1',
  prerequisites: ['s01'],
  generators: ['sich.backupspeicher', 'sich.backupdauer', 'sich.redundanz'],
  skills: [
    { id: 'sich.bk.grundlagen', module: 's03', title: 'Ursachen von Datenverlust; Backup, RAID, Synchronisation und Archiv unterscheiden', requires: ['sich.schutzziele'] },
    { id: 'sich.bk.arten', module: 's03', title: 'Voll-, inkrementelle und differenzielle Sicherung vergleichen', requires: ['sich.bk.grundlagen'] },
    { id: 'sich.bk.rechnen', module: 's03', title: 'Speicherbedarf und Dauer von Sicherungen berechnen', requires: ['sich.bk.arten'] },
    { id: 'sich.bk.strategie', module: 's03', title: 'Sicherungsstrategien: Generationenprinzip, 3-2-1-Regel, Medien, RPO/RTO', requires: ['sich.bk.arten'] },
    { id: 'sich.bk.restore', module: 's03', title: 'Wiederherstellung, Systemabbilder, Tests und Datensicherungskonzept', requires: ['sich.bk.strategie'] },
    { id: 'sich.bk.archiv', module: 's03', title: 'Archivierung und gesetzliche Aufbewahrungsfristen', requires: ['sich.bk.grundlagen'] },
    { id: 'sich.verfuegbarkeit', module: 's03', title: 'Verfügbarkeit bei Reihen- und Parallelschaltung (Redundanz) berechnen', requires: ['sich.schutzziele'] },
  ],
  lessons: [
    /* ---------------------------------------------------------------- */
    {
      id: 's03-l01',
      title: 'Warum Datensicherung? Backup ist nicht RAID',
      minutes: 15,
      relevance: 'ap1',
      skills: ['sich.bk.grundlagen'],
      simple: `Ein **Backup** (Datensicherung) ist wie ein Zweitschlüssel, den du bei deinen Eltern hinterlegst: Verlierst du deinen, kommst du trotzdem in die Wohnung. Wichtig ist, dass die Kopie **woanders** liegt.
**RAID** (mehrere Festplatten, die sich gegenseitig spiegeln) ist dagegen wie ein zweites Schloss an derselben Tür: Geht eine Platte kaputt, läuft alles weiter. Löschst du aber aus Versehen etwas, ist es auf allen Platten gleichzeitig weg.
Auch eine Synchronisation (z. B. ein Cloud-Ordner) überträgt Fehler und Verschlüsselungen sofort mit.

**Merke:** RAID schützt vor Plattenausfall, ein Backup schützt vor Datenverlust – RAID ersetzt kein Backup.`,
      steps: [
        {
          type: 'explain',
          title: 'Wie gehen Daten verloren?',
          body: `Eine **Datensicherung (Backup)** ist eine **Kopie** von Daten auf einem anderen Speicher, aus der man den Originalzustand **wiederherstellen** kann. Sie dient vor allem dem Schutzziel **Verfügbarkeit** – und indirekt der Integrität (man kann zu einem unverfälschten Stand zurück).

**Typische Ursachen für Datenverlust:**

| Ursache | Beispiel |
|---|---|
| **Hardwaredefekt** | Festplatte, SSD-Controller oder Netzteil fällt aus |
| **Menschliche Fehler** | versehentlich gelöscht oder überschrieben – in der Praxis eine der häufigsten Ursachen |
| **Schadsoftware** | Ransomware verschlüsselt Server **und** alle erreichbaren Freigaben |
| **Diebstahl, Verlust** | Notebook im Zug vergessen |
| **Elementarschäden** | Feuer, Wasser, Überspannung durch Blitz |
| **Softwarefehler** | fehlerhaftes Update beschädigt die Datenbank |

**Was ist KEIN Backup?**

| Technik | Was sie leistet | Warum sie kein Backup ersetzt |
|---|---|---|
| **RAID** (z. B. Spiegelung) | Ein Laufwerk darf ausfallen, das System läuft weiter (**Ausfallsicherheit**) | Löschen, Überschreiben und Ransomware werden **sofort auf alle Platten gespiegelt**. Brand oder Diebstahl trifft alle Platten. |
| **Synchronisation** (z. B. OneDrive-/Cloud-Sync) | Gleicher Datenstand auf mehreren Geräten | Eine Löschung oder Verschlüsselung wird ebenfalls **synchronisiert**. Versionierung/Papierkorb helfen nur begrenzt. |
| **Snapshot** (Momentaufnahme auf demselben Speichersystem) | Schnelles Zurückrollen, z. B. vor einem Update | Liegt auf **demselben** System – fällt das Speichersystem aus, ist der Snapshot mit weg. |
| **Archivierung** | Langfristige, unveränderbare Aufbewahrung **abgeschlossener** Daten (z. B. wegen Aufbewahrungsfristen) | Ziel ist Aufbewahrung, nicht schnelle Wiederherstellung des aktuellen Betriebs (siehe letzte Lektion). |

> **Merksatz:** *RAID schützt vor Plattenausfall, ein Backup schützt vor Datenverlust.*`,
        },
        {
          type: 'visual',
          title: 'Wovor schützt was?',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'RAID', text: 'Plattenausfall ✔ · Löschen ✘ · Ransomware ✘ · Brand ✘', icon: 'Layers' },
                { title: 'Sync / Cloud-Ordner', text: 'Geräteverlust ✔ · Löschen meist ✘ · Ransomware ✘', icon: 'RefreshCw' },
                { title: 'Snapshot', text: 'Fehlerhaftes Update ✔ · Ausfall des Speichersystems ✘', icon: 'Camera' },
                { title: 'Backup (offline/extern)', text: 'Plattenausfall ✔ · Löschen ✔ · Ransomware ✔ · Brand ✔', icon: 'ShieldCheck' },
              ],
            },
          },
          caption: 'Nur eine getrennt aufbewahrte, versionierte Sicherung schützt gegen alle Ursachen.',
        },
        {
          type: 'check',
          question: {
            id: 's03-c01', kind: 'single', skill: 'sich.bk.grundlagen', difficulty: 1,
            prompt: 'Der Fileserver der Elektro Krämer GmbH hat ein RAID 1 (Spiegelung). Ein Mitarbeiter löscht versehentlich einen Projektordner. Was passiert?',
            options: ['Der Ordner ist auf beiden Platten gelöscht – nur ein Backup hilft.', 'Der Ordner kann von der zweiten Platte wiederhergestellt werden.', 'Das RAID verhindert das Löschen automatisch.', 'Das RAID meldet einen Plattenfehler.'],
            answer: 0,
            distractors: {
              '1': { why: 'Die Spiegelung überträgt jede Änderung – auch das Löschen – sofort auf beide Platten.', error: 'raid-ist-kein-backup' },
              '2': { why: 'RAID kennt keine Berechtigungen oder „Löschschutz“; es verteilt nur Blöcke auf Platten.', error: 'raid-ist-kein-backup' },
              '3': { why: 'Für das RAID ist das Löschen ein ganz normaler Schreibvorgang.', error: 'raid-ist-kein-backup' },
            },
            explanation: 'RAID = Ausfallsicherheit gegen Plattendefekte, **kein Backup**.',
          },
        },
        { type: 'practice', title: 'Übung: Grundlagen', questionIds: ['s03-q001', 's03-q002', 's03-q003'], count: 3, difficulty: 1 },
        {
          type: 'summary',
          points: [
            'Backup = Kopie zur Wiederherstellung → Schutzziel Verfügbarkeit.',
            'Häufige Ursachen: Hardware, menschliche Fehler, Ransomware, Diebstahl, Elementarschäden.',
            'RAID, Synchronisation und Snapshots ersetzen kein Backup.',
            'Archivierung = langfristige unveränderbare Aufbewahrung, Backup = Wiederherstellung des Betriebs.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's03-l02',
      title: 'Voll, inkrementell, differenziell',
      minutes: 25,
      relevance: 'ap1',
      skills: ['sich.bk.arten'],
      simple: `Stell dir vor, du fotografierst dein Zimmer. Bei der **Vollsicherung** fotografierst du alles.
Bei der **inkrementellen** Sicherung fotografierst du nur, was sich seit dem **letzten Foto** verändert hat. Das geht schnell – aber zum Wiederherstellen brauchst du alle Fotos der Reihe nach.
Bei der **differenziellen** Sicherung fotografierst du alles, was sich seit dem **letzten Komplettfoto** verändert hat. Das wird jeden Tag mehr – dafür reichen zum Wiederherstellen zwei Fotos.

**Merke:** Inkrementell = seit der letzten Sicherung (wenig Speicher, lange Kette); differenziell = seit der letzten Vollsicherung (wächst, nur Voll + letzte Differenz nötig).`,
      steps: [
        {
          type: 'explain',
          title: 'Drei Sicherungsarten im Vergleich',
          body: `| | **Vollsicherung** | **Inkrementelle Sicherung** | **Differenzielle Sicherung** |
|---|---|---|---|
| Was wird gesichert? | **alle** ausgewählten Daten | nur Änderungen seit der **letzten Sicherung** (egal welcher Art) | alle Änderungen seit der **letzten Vollsicherung** |
| Größe / Dauer | groß, lange | **klein, schnell** | wächst von Tag zu Tag |
| Speicherbedarf gesamt | hoch | **am geringsten** | mittel |
| Wiederherstellung braucht | **nur die letzte Vollsicherung** | letzte Vollsicherung **+ alle** Inkremente danach (in richtiger Reihenfolge) | letzte Vollsicherung **+ nur die letzte** differenzielle |
| Wiederherstellungsaufwand / Risiko | gering | **hoch** – fehlt ein Inkrement, ist die Kette unterbrochen | mittel |

**Beispiel-Woche** (Sonntag Vollsicherung 500 GB, täglich ändern sich 10 GB, jeden Tag andere Dateien):

| Tag | inkrementell | differenziell |
|---|---|---|
| Mo | 10 GB | 10 GB |
| Di | 10 GB | 20 GB |
| Mi | 10 GB | 30 GB |
| Do | 10 GB | 40 GB |
| Fr | 10 GB | 50 GB |
| **Summe Teilsicherungen** | **50 GB** | **150 GB** |

Crash am Samstagmorgen – was brauchst du für die Wiederherstellung?
- **inkrementell:** Vollsicherung So + Mo + Di + Mi + Do + Fr = **6 Sicherungen**
- **differenziell:** Vollsicherung So + Fr = **2 Sicherungen**

**Das Archivbit (klassisches Prüfungswissen):** Windows markiert jede neue oder geänderte Datei mit dem Attribut **„A“ (Archiv)**. Sicherungsprogramme können daran erkennen, was sich geändert hat:

| Sicherungsart | sichert Dateien … | setzt Archivbit danach zurück? |
|---|---|---|
| Vollsicherung | alle | **ja** |
| inkrementell | nur mit gesetztem Archivbit | **ja** → nächstes Inkrement startet „bei null“ |
| differenziell | nur mit gesetztem Archivbit | **nein** → Änderungen sammeln sich bis zur nächsten Vollsicherung |

Moderne Software arbeitet meist mit Änderungsjournalen oder Blockvergleich (*Changed Block Tracking*), das Prinzip bleibt aber gleich.`,
        },
        {
          type: 'visual',
          title: 'Wer braucht was zur Wiederherstellung?',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['Vollsicherung So', 'Mo', 'Di', 'Mi', 'Do', 'Wiederherstellung Fr'],
              messages: [
                { from: 0, to: 5, label: 'immer: letzte Vollsicherung' },
                { from: 1, to: 5, label: 'inkrementell: Mo' },
                { from: 2, to: 5, label: 'inkrementell: Di' },
                { from: 3, to: 5, label: 'inkrementell: Mi' },
                { from: 4, to: 5, label: 'inkrementell: Do', note: 'alle 4 Inkremente in Reihenfolge' },
                { from: 4, to: 5, label: 'differenziell: nur Do', note: 'enthält Mo–Do' },
              ],
            },
          },
          caption: 'Inkrementell braucht die ganze Kette, differenziell nur Vollsicherung plus letzte Differenz.',
        },
        {
          type: 'example',
          title: 'Strategie für den Fileserver auswählen',
          problem: 'Der Fileserver in Hamburg hat 800 GB Daten. Das Backupfenster unter der Woche ist kurz (22–5 Uhr), am Wochenende ist viel Zeit. Wiederherstellungen sollen schnell und möglichst unkompliziert sein. Empfiehl eine Kombination.',
          steps: [
            { label: 'Wochenende', body: '**Vollsicherung** am Samstag – genug Zeit für die große Sicherung.' },
            { label: 'Werktage', body: '**Differenzielle** Sicherung Mo–Fr: kürzer als eine Vollsicherung, passt ins Fenster.' },
            { label: 'Begründung', body: 'Wiederherstellung braucht nur 2 Sicherungsstände (Voll + letzte Differenz) → schnell und weniger fehleranfällig als eine lange Inkrement-Kette.' },
            { label: 'Alternative', body: 'Ist der Speicherplatz knapp oder ändern sich täglich sehr viele Daten, wäre **inkrementell** sparsamer – mit dem Nachteil der längeren Wiederherstellungskette.' },
          ],
          result: 'Vollsicherung am Wochenende + differenziell an Werktagen – guter Kompromiss aus Speicherbedarf, Sicherungsdauer und Wiederherstellungsaufwand.',
        },
        {
          type: 'check',
          question: {
            id: 's03-c02', kind: 'number', skill: 'sich.bk.arten', difficulty: 2,
            prompt: 'Sonntag Vollsicherung, Montag bis Freitag **inkrementelle** Sicherung. Am Donnerstagmittag fällt der Server aus. Wie viele Sicherungen werden für die Wiederherstellung auf den Stand von Mittwochabend benötigt?',
            answer: 4,
            hints: ['Vollsicherung + jede inkrementelle Sicherung seither.'],
            misconceptions: [{ answer: '2', error: 'backup-ink-diff-verwechselt', why: 'Zwei Sicherungen (Voll + letzte) reichen nur bei differenzieller Sicherung.' }, { answer: '5', error: 'backup-tage-zaehlen', why: 'Die Donnerstag-Sicherung (abends) gibt es noch nicht – der Ausfall war mittags.' }],
            explanation: 'Vollsicherung So + Mo + Di + Mi = **4 Sicherungen**.',
          },
        },
        {
          type: 'check',
          question: {
            id: 's03-c03', kind: 'single', skill: 'sich.bk.arten', difficulty: 2,
            prompt: 'Welche Sicherungsart setzt das **Archivbit nicht** zurück?',
            options: ['Differenzielle Sicherung', 'Inkrementelle Sicherung', 'Vollsicherung', 'Alle setzen es zurück'],
            answer: 0,
            distractors: {
              '1': { why: 'Inkrementell setzt es zurück – deshalb enthält das nächste Inkrement nur neue Änderungen.', error: 'archivbit' },
              '2': { why: 'Die Vollsicherung setzt es zurück – sie ist der neue Ausgangspunkt.', error: 'archivbit' },
              '3': { why: 'Gerade die differenzielle Sicherung lässt es stehen, damit sich Änderungen seit der Vollsicherung ansammeln.', error: 'archivbit' },
            },
            explanation: 'Differenziell lässt das Archivbit gesetzt → jede differenzielle Sicherung enthält alle Änderungen seit der letzten Vollsicherung.',
          },
        },
        { type: 'practice', title: 'Übung: Speicherbedarf einer Woche', generator: 'sich.backupspeicher', count: 3, difficulty: 1 },
        {
          type: 'summary',
          points: [
            'Voll = alles; inkrementell = seit letzter Sicherung; differenziell = seit letzter Vollsicherung.',
            'Inkrementell: wenig Speicher, schnell – Wiederherstellung braucht die ganze Kette.',
            'Differenziell: wächst täglich – Wiederherstellung braucht nur Voll + letzte Differenz.',
            'Archivbit: Voll und inkrementell setzen es zurück, differenziell nicht.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's03-l03',
      title: 'Rechnen: Speicherbedarf und Sicherungsdauer',
      minutes: 25,
      relevance: 'ap1',
      skills: ['sich.bk.rechnen'],
      simple: `Die Dauer einer Sicherung rechnest du wie eine Autofahrt: Zeit = Strecke durch Geschwindigkeit – hier **Zeit = Datenmenge durch Datenrate**.
Achte auf die Einheiten wie auf km und m: Netzwerke rechnen in **Bit** pro Sekunde, Festplatten meist in **Byte** pro Sekunde (1 Byte = 8 Bit).
Es gibt außerdem zwei Arten von „Giga“: **GB** = 1 Milliarde Byte und **GiB** = 1.073.741.824 Byte (2³⁰). Welche gilt, steht in der Aufgabe.
Beim Speicherbedarf zählst du die Änderungen zusammen – bei differenziell immer alles seit der Vollsicherung.

**Merke:** t = Datenmenge / Datenrate – vorher Bit/Byte (· 8) und GB/GiB klären, am Ende in Minuten oder Stunden umrechnen.`,
      steps: [
        {
          type: 'explain',
          title: 'Die zwei Standardrechnungen',
          body: `**1. Speicherbedarf einer Sicherungswoche**

- **Inkrementell:** Summe der Tagesänderungen
- **Differenziell:** Summe der **kumulierten** Änderungen (Mo, Mo+Di, Mo+Di+Mi, …)
- **Gesamt:** + Größe der Vollsicherung(en)

Bei gleich großen täglichen Änderungen *c* über *n* Tage gilt:
- inkrementell: n · c
- differenziell: c · (1 + 2 + … + n) = c · n · (n + 1) / 2

*Annahme in Aufgaben:* An jedem Tag werden **andere** Dateien geändert. Wird dieselbe Datei an mehreren Tagen geändert, wächst die differenzielle Sicherung langsamer.

**2. Dauer einer Sicherung**

> **t = Datenmenge / Datenrate**

Stolperfallen (wie bei der Übertragungszeit im Netzwerkmodul):
- **Byte vs. Bit:** Laufwerke werden meist in **MB/s** angegeben, Netzwerke in **Mbit/s** → Datenmenge mal 8.
- **1000 vs. 1024:** Herstellerangaben und Datenraten sind **dezimal** (1 TB = 1000 GB, 1 Gbit/s = 1.000.000.000 bit/s). Betriebssysteme und viele Schulbücher geben Datenmengen dagegen **binär** an (GiB, TiB – siehe Kasten unten). Halte dich an die Aufgabenstellung.
- **Einheiten am Ende umrechnen:** Sekunden → Minuten (÷ 60) → Stunden (÷ 3600).
- **Nutzrate:** Protokoll-Overhead, Komprimierung oder Last können die effektive Rate verändern – nur rechnen, wenn angegeben.`,
        },
        {
          type: 'explain',
          title: 'GiB und TiB: wenn die Datenmenge binär angegeben ist',
          body: `Windows zeigt eine „2-TB-Festplatte“ nur mit etwa **1,8 TB** an (genauer: 2.000.000.000.000 Byte ÷ 1.099.511.627.776 ≈ 1,82). Der Grund: Windows rechnet intern **binär** (mit Zweierpotenzen), schreibt aber „TB“. Korrekt heißen die binären Einheiten **GiB** (Gibibyte) und **TiB** (Tebibyte):

| dezimal (SI, Hersteller, Datenraten) | binär (IEC, Betriebssystem, viele Schulbücher) |
|---|---|
| 1 GB = 10⁹ Byte = 1.000.000.000 Byte | 1 GiB = 2³⁰ Byte = 1.073.741.824 Byte |
| 1 TB = 10¹² Byte = 1.000.000.000.000 Byte | 1 TiB = 2⁴⁰ Byte = 1.099.511.627.776 Byte |

**Datenraten sind immer dezimal:** 1 Gbit/s = 1.000.000.000 bit/s, 1 MB/s = 1.000.000 Byte/s.

**Schulbuch-Konvention:** Viele Bücher geben die Datenmenge in GiB/TiB an, die Datenrate aber in Mbit/s oder MB/s. Dann rechnest du so:
1. Datenmenge in **Byte**: GiB · 1.073.741.824 bzw. TiB · 1.099.511.627.776
2. Bei Netzwerkraten in **Bit**: · 8
3. Rate in bit/s (bzw. Byte/s) umrechnen, ggf. mit dem Nutzanteil multiplizieren
4. t = Datenmenge / Rate → Sekunden → Minuten/Stunden

**Der Unterschied ist nicht klein:** 1 GiB ist rund **7,4 %** größer als 1 GB, 1 TiB rund **10 %** größer als 1 TB. Rechnest du TiB wie TB, ist dein Ergebnis um etwa 10 % zu klein.

**Steht nichts dabei?** Dann nimm die Einheit wörtlich (GB = dezimal, GiB = binär) und schreib deine Annahme kurz dazu: „Annahme: 1 GB = 10⁹ Byte“.`,
        },
        {
          type: 'example',
          title: 'Backup mit TiB-Angabe und Nutzanteil',
          problem: 'Der Explorer zeigt für die Projektablage **1,5 TiB** an. Sie wird über **1 Gbit/s** auf ein NAS gesichert; nutzbar sind **80 %** der Bandbreite. Wie lange dauert die Sicherung? (1 TiB = 2⁴⁰ Byte, Datenrate dezimal)',
          steps: [
            { label: '1. Datenmenge in Byte', body: '1,5 · 1.099.511.627.776 Byte = **1.649.267.441.664 Byte**' },
            { label: '2. In Bit', body: '1.649.267.441.664 Byte · 8 = **13.194.139.533.312 bit**' },
            { label: '3. Nutzbare Rate', body: '1.000.000.000 bit/s · 0,8 = **800.000.000 bit/s**' },
            { label: '4. Dauer', body: '13.194.139.533.312 bit / 800.000.000 bit/s = 16.492,7 s → / 60 = **274,9 min** → / 60 = **≈ 4,58 h**' },
            { label: 'Zum Vergleich: dezimal gerechnet', body: '1,5 · 10¹² Byte · 8 / 800.000.000 bit/s = 15.000 s = 250 min. Das wäre hier der **falsche Weg**, weil die Aufgabe TiB vorgibt – rund 25 Minuten zu wenig.' },
          ],
          result: 'Die Sicherung dauert rund 275 Minuten (≈ 4,6 h). Dezimal gerechnet käme man nur auf 250 Minuten.',
        },
        {
          type: 'check',
          question: {
            id: 's03-c11', kind: 'number', skill: 'sich.bk.rechnen', difficulty: 2,
            prompt: 'Das Betriebssystem zeigt für einen Ordner **500 GiB** an. Er wird auf eine USB-Festplatte mit **200 MB/s** gesichert. Wie viele **Minuten** dauert das? (1 GiB = 2³⁰ Byte = 1.073.741.824 Byte; 1 MB/s = 1.000.000 Byte/s; auf ganze Minuten runden)',
            answer: 45, tolerance: 1, unit: 'min',
            hints: ['Erst die Datenmenge in Byte: 500 · 1.073.741.824.', 'Dann durch 200.000.000 Byte/s teilen und durch 60.'],
            misconceptions: [
              { answer: '42', error: 'einheit-1000-1024', why: 'Du hast GiB wie GB gerechnet (500 · 10⁹ Byte). Laut Aufgabe ist 1 GiB = 1.073.741.824 Byte.' },
              { answer: '2684', error: 'einheit-sekunden-minuten', why: 'Das sind Sekunden – noch durch 60 teilen.' },
              { answer: '358', error: 'einheit-bit-byte', why: 'MB/s ist schon Byte pro Sekunde – hier nicht mit 8 multiplizieren.' },
            ],
            explanation: '**Ergebnis: ≈ 45 min**\n\n1. 500 GiB · 1.073.741.824 Byte = 536.870.912.000 Byte\n2. 536.870.912.000 Byte / 200.000.000 Byte/s = 2.684,35 s\n3. 2.684,35 s / 60 = 44,74 min ≈ **45 min**\n\nHäufiger Fehler: GiB wie GB rechnen → 500.000.000.000 / 200.000.000 = 2.500 s ≈ 42 min.',
          },
        },
        {
          type: 'example',
          title: 'Passt die Vollsicherung ins Backupfenster?',
          problem: 'Der Fileserver (1,8 TB Daten) wird über das Netzwerk mit **1 Gbit/s** auf ein NAS gesichert. Effektiv werden **80 %** der Bandbreite erreicht. Das Backupfenster ist von 22:00 bis 5:00 Uhr. Reicht das? (1 TB = 1000 GB)',
          steps: [
            { label: 'Datenmenge in Mbit', body: '1,8 TB = 1.800.000 MB · 8 = **14.400.000 Mbit**' },
            { label: 'Nutzbare Rate', body: '1000 Mbit/s · 0,8 = **800 Mbit/s**' },
            { label: 'Dauer', body: '14.400.000 Mbit / 800 Mbit/s = 18.000 s = 300 min = **5 h**' },
            { label: 'Fenster', body: '22:00 – 5:00 = **7 h** → 5 h passen hinein (2 h Reserve).' },
          ],
          result: 'Die Vollsicherung dauert 5 Stunden und passt in das 7-Stunden-Fenster.',
        },
        {
          type: 'example',
          title: 'Speicherbedarf: inkrementell oder differenziell?',
          problem: 'Sonntag Vollsicherung 400 GB, Mo–Sa (6 Tage) ändern sich jeden Tag 12 GB (jeweils andere Dateien). Berechne den Speicherbedarf der Woche für beide Strategien.',
          steps: [
            { label: 'Inkrementell', body: '6 · 12 GB = 72 GB → gesamt 400 + 72 = **472 GB**' },
            { label: 'Differenziell', body: '12 · (1+2+3+4+5+6) = 12 · 21 = 252 GB → gesamt 400 + 252 = **652 GB**' },
            { label: 'Vergleich', body: 'Differenziell braucht 180 GB mehr, dafür bei der Wiederherstellung am Samstag nur 2 statt 7 Sicherungsstände.' },
          ],
          result: 'Inkrementell 472 GB, differenziell 652 GB.',
        },
        {
          type: 'check',
          question: {
            id: 's03-c04', kind: 'number', skill: 'sich.bk.rechnen', difficulty: 2,
            prompt: 'Sonntag Vollsicherung (300 GB). Mo–Fr differenziell, täglich ändern sich **8 GB** (jeden Tag andere Dateien). Wie groß ist die differenzielle Sicherung am **Freitag** in GB?',
            answer: 40, unit: 'GB',
            misconceptions: [{ answer: '8', error: 'backup-ink-diff-verwechselt', why: 'So groß wäre die inkrementelle Sicherung. Differenziell enthält alles seit Sonntag.' }, { answer: '340', error: 'backup-vollsicherung-mitgezaehlt', why: 'Gefragt ist nur die differenzielle Sicherung selbst.' }],
            explanation: 'Fr = Änderungen Mo bis Fr = 5 · 8 GB = **40 GB**.',
          },
        },
        {
          type: 'check',
          question: {
            id: 's03-c05', kind: 'number', skill: 'sich.bk.rechnen', difficulty: 2,
            prompt: 'Eine Vollsicherung von **540 GB** wird auf ein LTO-Laufwerk mit **300 MB/s** geschrieben. Wie viele **Minuten** dauert das? (1 GB = 1000 MB)',
            answer: 30, unit: 'min',
            misconceptions: [{ answer: '1800', error: 'einheit-sekunden-minuten', why: 'Das sind Sekunden – noch durch 60 teilen.' }, { answer: '240', error: 'einheit-bit-byte', why: 'MB/s ist bereits Byte pro Sekunde – nicht mit 8 multiplizieren.' }],
            explanation: '540.000 MB / 300 MB/s = 1.800 s = **30 min**.',
          },
        },
        { type: 'practice', title: 'Übung: Sicherungsdauer', generator: 'sich.backupdauer', count: 3, difficulty: 2 },
        { type: 'practice', title: 'Übung: Strategien vergleichen (Tabelle)', generator: 'sich.backupspeicher', count: 2, difficulty: 3 },
        {
          type: 'summary',
          points: [
            'Inkrementell: Summe der Tagesänderungen; differenziell: Summe der kumulierten Änderungen; + Vollsicherung.',
            'Gleiche Änderung c an n Tagen: inkrementell n·c, differenziell c·n·(n+1)/2.',
            't = Datenmenge / Datenrate – Byte/Bit (· 8) und Einheiten beachten.',
            'GiB/TiB sind binär (2³⁰ bzw. 2⁴⁰ Byte), Datenraten immer dezimal; TiB wie TB zu rechnen macht das Ergebnis rund 10 % zu klein.',
            'Ergebnis mit dem Backupfenster vergleichen und bewerten.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's03-l04',
      title: 'Strategien: Generationenprinzip, 3-2-1, Medien, RPO/RTO',
      minutes: 30,
      relevance: 'ap1',
      skills: ['sich.bk.strategie'],
      simple: `Eine gute Sicherungsstrategie funktioniert wie bei wichtigen Dokumenten: Original zu Hause, Kopie im Bankschließfach – und die Kopien werden regelmäßig erneuert.
Die **3-2-1-Regel** sagt: **3** Kopien der Daten, auf **2** verschiedenen Speichermedien, **1** davon außer Haus.
Beim **Generationenprinzip** (Großvater – Vater – Sohn) hebst du mehrere ältere Stände auf, damit du auch zu einem Stand von vor einigen Wochen zurückkannst.
**RPO** sagt, wie viel Datenverlust höchstens erlaubt ist (z. B. die Arbeit von 4 Stunden). **RTO** sagt, wie schnell wieder alles laufen muss.

**Merke:** 3-2-1 plus eine Kopie offline oder unveränderbar – das schützt gegen Ransomware, Brand und Diebstahl.`,
      steps: [
        {
          type: 'explain',
          title: 'Generationenprinzip (Großvater-Vater-Sohn)',
          body: `Damit man nicht nur den gestrigen Stand, sondern auch ältere Stände wiederherstellen kann (z. B. eine Datei, die vor drei Wochen versehentlich geändert wurde), werden Sicherungsmedien nach dem **Generationenprinzip** rotiert. Die klassische Variante ist **Großvater-Vater-Sohn (GVS)**:

| Generation | Wann? | Medien (typische Variante) | wird überschrieben |
|---|---|---|---|
| **Sohn** | täglich (Mo–Do) | 4 | nach einer Woche |
| **Vater** | wöchentlich (Freitag, Vollsicherung) | 4 | nach einem Monat |
| **Großvater** | monatlich (Monatsende, Vollsicherung) | 12 | nach einem Jahr |

→ **20 Medien**; der älteste wiederherstellbare Stand ist etwa **ein Jahr** alt. In der Praxis gibt es Varianten (z. B. 5 Väter oder ein Jahresband zusätzlich) – in Prüfungsaufgaben steht das genaue Schema im Text.

Heute rotiert man selten noch physische Bänder von Hand; Backup-Software bildet das Prinzip als **Aufbewahrungsrichtlinie** ab („7 tägliche, 4 wöchentliche, 12 monatliche Stände“).

**Die 3-2-1-Regel:**
- **3** Kopien der Daten (Original + 2 Sicherungen)
- auf **2** unterschiedlichen Speichermedien bzw. -systemen
- davon **1** Kopie **außer Haus** (anderer Standort, Bankschließfach, Cloud)

Wegen Ransomware wird sie oft zu **3-2-1-1-0** erweitert: zusätzlich **1** Kopie **offline** oder **unveränderbar** (*immutable*, z. B. WORM-Speicher, Object Lock, ausgelagertes Band) und **0** Fehler bei regelmäßigen Wiederherstellungstests.`,
        },
        {
          type: 'explain',
          title: 'Sicherungsmedien und Kennzahlen',
          body: `| Medium | Vorteile | Nachteile | Einsatz |
|---|---|---|---|
| **Magnetband (LTO)** | sehr günstig pro TB, lange haltbar, **offline** lagerbar (Schutz vor Ransomware), hohe Kapazität (LTO-9: 18 TB unkomprimiert) | Laufwerk teuer, sequenzieller Zugriff (langsame Einzelwiederherstellung) | Vollsicherungen, Auslagerung, Langzeit |
| **Externe Festplatte / SSD** | günstig, einfach, schnell | Diebstahl/Verlust, Defekt, oft dauerhaft angeschlossen (Ransomware!) | kleine Firmen, Arbeitsplätze – nur im Wechsel und abgesteckt |
| **NAS / Backup-Server** | automatisierbar, schnell, Versionierung, Snapshots | im Netz erreichbar → braucht Schutz (eigenes Konto, Segment, unveränderbare Stände) | erste Sicherungsstufe |
| **Cloud-Backup** | automatisch **außer Haus**, skalierbar | abhängig von Internetbandbreite (Wiederherstellung großer Datenmengen dauert!), Datenschutz: **AV-Vertrag**, Verschlüsselung, Serverstandort | Offsite-Kopie |
| **USB-Stick** | klein | geht leicht verloren, wenig robust | nicht als Firmen-Backup |

**Zwei Kennzahlen bestimmen die Strategie:**

| Kennzahl | Frage | Bestimmt … | Beispiel |
|---|---|---|---|
| **RPO** – *Recovery Point Objective* | Wie viel **Datenverlust** (gemessen in Zeit) ist höchstens tolerierbar? | die **Sicherungshäufigkeit** | RPO = 4 h → mindestens alle 4 Stunden sichern |
| **RTO** – *Recovery Time Objective* | Wie lange darf die **Wiederherstellung** höchstens dauern (maximale Ausfallzeit)? | Wiederherstellungstechnik, Medium, Redundanz | RTO = 2 h → Systemabbild auf schnellem Speicher, Ersatzhardware bereit |

Wer täglich um 22 Uhr sichert, hat ein RPO von bis zu **24 Stunden**: Fällt der Server um 21:59 aus, ist die Arbeit eines ganzen Tages verloren.`,
        },
        {
          type: 'visual',
          title: 'Sicherungskonzept der Elektro Krämer GmbH',
          widget: {
            kind: 'topology',
            data: {
              nodes: [
                { id: 'srv', type: 'server', label: 'Fileserver HH', sub: 'Original', x: 110, y: 200 },
                { id: 'nas', type: 'nas', label: 'Backup-NAS', sub: 'Kopie 1 · anderer Brandabschnitt', x: 360, y: 90 },
                { id: 'tape', type: 'server', label: 'LTO-Bänder', sub: 'Kopie 2 · offline, Schließfach', x: 360, y: 320 },
                { id: 'be', type: 'nas', label: 'NAS Berlin', sub: 'Kopie 2b · außer Haus, unveränderbar', x: 650, y: 90 },
              ],
              links: [
                { from: 'srv', to: 'nas', label: 'täglich' },
                { from: 'srv', to: 'tape', label: 'wöchentlich voll' },
                { from: 'nas', to: 'be', label: 'nächtliche Replikation', style: 'vpn' },
              ],
              zones: [
                { label: 'Standort Hamburg', x: 20, y: 30, w: 470, h: 370, color: 'blue' },
                { label: 'Standort Berlin', x: 540, y: 30, w: 240, h: 170, color: 'green' },
              ],
            },
          },
          caption: '3 Kopien (Original, NAS, Band/Berlin), 2 Medientypen (Festplatte, Band), 1 außer Haus (Berlin bzw. Schließfach) – plus eine Offline-Kopie gegen Ransomware.',
        },
        {
          type: 'example',
          title: 'Ein bestehendes Konzept bewerten',
          problem: 'Ein Kunde des Systemhauses (Steuerbüro, 12 Arbeitsplätze) sichert seinen Server jede Nacht auf eine externe USB-Festplatte, die dauerhaft am Server angeschlossen ist. Bewerte das Konzept anhand der 3-2-1-Regel und schlage Verbesserungen vor.',
          steps: [
            { label: '3 Kopien?', body: 'Nein – nur Original + 1 Kopie = 2.' },
            { label: '2 Medien?', body: 'Formal ja (Server-SSD + USB-HDD), aber beide am selben Gerät.' },
            { label: '1 außer Haus?', body: 'Nein – Brand oder Diebstahl vernichten beides.' },
            { label: 'Ransomware', body: 'Dauerhaft angeschlossene Platte wird mitverschlüsselt → **kein Schutz**.' },
            { label: 'Verbesserung', body: 'Mindestens zwei USB-Platten im **Wechsel**, eine immer abgesteckt und außer Haus; besser: NAS mit unveränderbaren Snapshots + verschlüsseltes Cloud-Backup (mit AV-Vertrag) als Offsite-Kopie; Generationen festlegen; **Wiederherstellung regelmäßig testen**.' },
          ],
          result: 'Konzept erfüllt 3-2-1 nicht und schützt nicht vor Ransomware, Brand oder Diebstahl → Rotation, Offsite- und Offline-Kopie, Tests.',
        },
        {
          type: 'check',
          question: {
            id: 's03-c06', kind: 'number', skill: 'sich.bk.strategie', difficulty: 2,
            prompt: `Eine Firma setzt das Generationenprinzip so um:
- Söhne: Montag bis Donnerstag je ein eigenes Medium, wöchentlich überschrieben
- Väter: jeden Freitag eine Vollsicherung, 4 Medien im Wechsel
- Großväter: Monatsabschluss, 12 Medien (ein Jahr)

Wie viele Medien werden insgesamt benötigt?`,
            answer: 20, unit: 'Medien',
            misconceptions: [{ answer: '16', error: 'gvs-zaehlen', why: 'Die 4 Väter-Medien fehlen.' }, { answer: '17', error: 'gvs-zaehlen', why: 'Mo–Do sind 4 Söhne, nicht 1.' }],
            explanation: '4 (Söhne) + 4 (Väter) + 12 (Großväter) = **20 Medien**.',
          },
        },
        {
          type: 'check',
          question: {
            id: 's03-c07', kind: 'match', skill: 'sich.bk.strategie', difficulty: 2,
            prompt: 'Ordne die Begriffe zu.',
            left: ['RPO', 'RTO', '3-2-1-Regel', 'Immutable Backup'],
            right: ['maximal tolerierbarer Datenverlust (Zeitraum seit der letzten Sicherung)', 'maximal tolerierbare Dauer bis zur Wiederherstellung', '3 Kopien, 2 Medien, 1 außer Haus', 'Sicherungsstand, der für eine festgelegte Zeit nicht verändert oder gelöscht werden kann'],
            answer: [0, 1, 2, 3],
            explanation: 'RPO → wie oft sichern; RTO → wie schnell wiederherstellen; 3-2-1 → Verteilung der Kopien; immutable → Schutz vor Ransomware und Sabotage.',
          },
        },
        { type: 'practice', title: 'Übung: Strategien', questionIds: ['s03-q011', 's03-q012', 's03-q013', 's03-q014', 's03-q015', 's03-q016', 's03-q017', 's03-q018'], count: 5, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Generationenprinzip (GVS): Söhne täglich, Väter wöchentlich, Großväter monatlich – typisch 4 + 4 + 12 = 20 Medien.',
            '3-2-1: drei Kopien, zwei Medien, eine außer Haus; erweitert 3-2-1-1-0 (offline/immutable, 0 Fehler beim Test).',
            'Medien: Band (günstig, offline), HDD/NAS (schnell), Cloud (außer Haus, Bandbreite, AV-Vertrag).',
            'RPO = maximaler Datenverlust → Sicherungshäufigkeit; RTO = maximale Ausfallzeit → Wiederherstellungstechnik.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's03-l05',
      title: 'Wiederherstellung, Systemabbilder und Datensicherungskonzept',
      minutes: 20,
      relevance: 'ap1',
      skills: ['sich.bk.restore'],
      simple: `Ein Backup, das nie getestet wurde, ist wie ein Feuerlöscher, den nie jemand geprüft hat: Im Ernstfall weißt du nicht, ob er funktioniert.
Deshalb wird die **Wiederherstellung** (Restore) regelmäßig geprobt.
Ein **Systemabbild** (Image) ist eine Kopie der ganzen Festplatte samt Betriebssystem – damit läuft ein Rechner schnell wieder.
Im **Datensicherungskonzept** steht schriftlich, was, wann, wie und wohin gesichert wird, wer zuständig ist und wie getestet wird.

**Merke:** Nur ein getestetes Backup ist ein Backup – Wiederherstellung regelmäßig üben und dokumentieren.`,
      steps: [
        {
          type: 'explain',
          title: 'Ein Backup ist nur so gut wie seine Wiederherstellung',
          body: `**Dateibasierte Sicherung vs. Systemabbild (Image):**

| | dateibasiert | **Image** (Systemabbild) |
|---|---|---|
| Was wird gesichert? | ausgewählte Dateien und Ordner | das **komplette Laufwerk** bzw. die Partitionen blockweise – inkl. Betriebssystem, Programmen, Einstellungen, Bootbereich |
| Stärke | einzelne Dateien schnell wiederherstellen, geringer Speicherbedarf | **komplettes System** in kurzer Zeit wiederherstellen (*Bare-Metal-Recovery*), auch auf neue Hardware |
| Schwäche | System muss erst neu installiert werden | größer; Einzeldateien je nach Software umständlicher |

Viele Backup-Lösungen kombinieren beides (Image mit Einzeldateiwiederherstellung). **Imaging** wird außerdem beim **Rollout** genutzt: Ein vorbereitetes Referenz-Image wird auf viele gleiche Arbeitsplätze verteilt.

**Wiederherstellungstests** – die wichtigste und am häufigsten vergessene Regel:
- regelmäßig (z. B. monatlich Einzeldateien, jährlich ein komplettes System) **testweise wiederherstellen**,
- in eine **Testumgebung**, nicht über die Produktivdaten,
- Dauer messen (wird das **RTO** eingehalten?), Ergebnis **dokumentieren**.
- Auch prüfen: Ist das Backup lesbar (Prüfsummen), ist das Passwort/der Schlüssel der Backup-Verschlüsselung verfügbar?

**Datensicherungskonzept** (vgl. BSI-Baustein CON.3) – schriftlich festgelegt:

| Frage | Beispielantwort |
|---|---|
| **Was** wird gesichert? | Fileserver, Datenbanken, Mailserver, Konfigurationen von Firewall/Switches – Clients nicht (Daten liegen zentral) |
| **Wie oft / welche Art?** | täglich differenziell, Samstag voll; Datenbank stündlich Transaktionsprotokolle |
| **Wie lange** (Generationen)? | 14 Tages-, 8 Wochen-, 12 Monatsstände |
| **Wohin** (Medien, Orte)? | NAS (Brandabschnitt B), Replikation Berlin, wöchentlich Band ins Schließfach |
| **Sicherheit** | Backup verschlüsselt, eigenes Backup-Konto, unveränderbare Stände |
| **Wer** ist verantwortlich? | IT-Administrator + Vertretung; Kontrolle der Protokolle |
| **Tests** | monatlicher Wiederherstellungstest mit Protokoll |
| **Notfall** | Wiederanlaufplan mit Reihenfolge (erst AD/DNS, dann Fileserver, dann ERP) |`,
        },
        {
          type: 'example',
          title: 'RTO prüfen',
          problem: 'Der ERP-Server soll nach einem Ausfall innerhalb von **2 Stunden** wieder laufen (RTO). Das Systemabbild ist 1,5 TB groß und wird mit **400 MB/s** vom NAS zurückgespielt. Für Hardwaretausch und Start rechnet die IT mit 40 Minuten. Wird das RTO eingehalten? (1 TB = 1000 GB)',
          steps: [
            { label: 'Rückspielzeit', body: '1.500.000 MB / 400 MB/s = 3.750 s = **62,5 min**' },
            { label: 'Gesamt', body: '62,5 min + 40 min = **102,5 min**' },
            { label: 'Vergleich', body: '102,5 min < 120 min → RTO **eingehalten**, Reserve 17,5 min.' },
            { label: 'Hinweis', body: 'Nur ein **Test** beweist, dass die Werte in der Praxis stimmen.' },
          ],
          result: 'Ca. 1 h 43 min – das RTO von 2 h wird eingehalten (sollte durch einen Wiederherstellungstest bestätigt werden).',
        },
        {
          type: 'check',
          question: {
            id: 's03-c08', kind: 'single', skill: 'sich.bk.restore', difficulty: 1,
            prompt: 'Ein Notebook-SSD ist defekt. Der Mitarbeiter soll morgen früh mit **allen Programmen und Einstellungen** weiterarbeiten können. Welche Sicherung hilft am schnellsten?',
            options: ['Ein aktuelles Systemabbild (Image) des Notebooks', 'Eine Sicherung des Ordners „Dokumente“', 'Ein RAID 1 im Server', 'Die Synchronisation der Desktop-Dateien'],
            answer: 0,
            distractors: {
              '1': { why: 'Damit sind nur die Dateien gerettet – Betriebssystem und Programme müssten neu installiert werden.', error: 'image-dateisicherung' },
              '2': { why: 'Das RAID im Server betrifft das Notebook nicht.', error: 'raid-ist-kein-backup' },
              '3': { why: 'Synchronisierte Dateien enthalten keine Programme und Systemeinstellungen.', error: 'image-dateisicherung' },
            },
            explanation: 'Ein Image enthält das komplette System und kann auf eine neue SSD zurückgespielt werden (Bare-Metal-Recovery).',
          },
        },
        {
          type: 'check',
          question: {
            id: 's03-c09', kind: 'free', skill: 'sich.bk.restore', difficulty: 2,
            prompt: 'Erläutern Sie, warum regelmäßige **Wiederherstellungstests** Bestandteil jedes Datensicherungskonzepts sein müssen.',
            modelAnswer: 'Ein erfolgreiches Backup-Protokoll beweist nicht, dass die Daten im Ernstfall wirklich wiederherstellbar sind: Sicherungen können unvollständig oder beschädigt sein, wichtige Daten können in der Auswahl fehlen, Medien können unlesbar werden, Schlüssel oder Passwörter für verschlüsselte Backups können fehlen, und das Verfahren ist den Mitarbeitenden unbekannt. Nur ein Test zeigt, dass die Wiederherstellung funktioniert und wie lange sie dauert – also ob das RTO eingehalten wird. Die Tests werden dokumentiert (Nachweis z. B. gegenüber Prüfern, Art. 32 DSGVO verlangt Wiederherstellbarkeit und regelmäßige Überprüfung).',
            keywords: ['beschädigt', 'unvollständig', 'Dauer', 'RTO', 'dokumentieren', 'Schlüssel'],
            explanation: '„Ein ungetestetes Backup ist kein Backup.“',
          },
        },
        { type: 'practice', title: 'Übung: Wiederherstellung und Konzept', questionIds: ['s03-q019', 's03-q020', 's03-q021', 's03-q022', 's03-q023', 's03-q024'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Dateibasiert = einzelne Dateien; Image = komplettes System (Bare-Metal-Recovery, Rollout).',
            'Wiederherstellung regelmäßig testen, Dauer gegen das RTO prüfen, dokumentieren.',
            'Datensicherungskonzept: was, wie oft, wie lange, wohin, wie geschützt, wer, Tests, Wiederanlauf.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's03-l06',
      title: 'Archivierung und Aufbewahrungsfristen',
      minutes: 15,
      relevance: 'ap1-teilweise',
      skills: ['sich.bk.archiv'],
      simple: `Ein **Archiv** ist wie der Ordner mit alten Steuerunterlagen im Keller: Die Sachen sind abgeschlossen, du brauchst sie selten, musst sie aber viele Jahre unverändert aufheben.
Ein **Backup** ist dagegen für den Notfall da und wird regelmäßig überschrieben.
Das Gesetz schreibt Aufbewahrungsfristen vor: z. B. **8 Jahre** für Buchungsbelege wie Rechnungen und **10 Jahre** für Handelsbücher und Jahresabschlüsse. Die Frist beginnt erst am Ende des Kalenderjahres.
Archivierte Daten müssen **revisionssicher** sein: vollständig, unverändert und jederzeit auffindbar.

**Merke:** Backup = Betrieb wiederherstellen, Archiv = langfristig und unveränderbar aufbewahren – Frist ab Jahresende zählen.`,
      steps: [
        {
          type: 'explain',
          title: 'Archiv ist nicht Backup',
          body: `| | **Backup** | **Archiv** |
|---|---|---|
| Zweck | aktuellen Betrieb nach Datenverlust **wiederherstellen** | abgeschlossene Daten **langfristig aufbewahren** (Gesetz, Nachweis) |
| Daten | Kopie der aktuellen Daten, Original bleibt | oft wird das Original ins Archiv **verschoben** |
| Aufbewahrung | Tage bis Monate (Generationen), danach überschrieben | **Jahre**, nach gesetzlicher Frist |
| Anforderungen | schnell wiederherstellbar | **unveränderbar, vollständig, auffindbar, lesbar über Jahre** („revisionssicher“) |

Für Unternehmen gelten die **GoBD** (Grundsätze zur ordnungsmäßigen Führung und Aufbewahrung von Büchern … in elektronischer Form): Steuerlich relevante Daten müssen **unveränderbar**, vollständig, ordnungsgemäß und jederzeit **lesbar** aufbewahrt werden – oft mit einem Dokumentenmanagement- oder Archivsystem. Ein Backup-Band im Schrank erfüllt das nicht, weil man darin nicht gezielt suchen kann und es überschrieben wird.

**Gesetzliche Aufbewahrungsfristen** (§ 257 HGB, § 147 AO – Stand 2026):

| Unterlagen | Frist |
|---|---|
| Handelsbücher, Inventare, Jahresabschlüsse, Lageberichte, Eröffnungsbilanz | **10 Jahre** |
| **Buchungsbelege** (z. B. Rechnungen) | **8 Jahre** (seit 2025 durch das Vierte Bürokratieentlastungsgesetz; vorher 10 Jahre; Ausnahmen u. a. für Banken und Versicherungen) |
| empfangene Handels- und Geschäftsbriefe, Kopien abgesandter Geschäftsbriefe | **6 Jahre** |

Die Frist beginnt mit dem **Schluss des Kalenderjahres**, in dem die Unterlage entstanden ist. Eine Rechnung vom 15.03.2025 ist also ab dem 31.12.2025 acht Jahre aufzubewahren → bis **31.12.2033**, vernichtet werden darf sie ab **2034**. Steuerlich kann die Frist länger laufen, solange die Festsetzungsfrist noch nicht abgelaufen ist (Ablaufhemmung) – im Zweifel Steuerberater fragen.

**Datenschutz-Bezug:** Nach Ablauf der Frist **müssen** personenbezogene Daten gelöscht werden (Speicherbegrenzung). Ein **Löschkonzept** legt fest, wann was gelöscht wird.`,
        },
        {
          type: 'check',
          question: {
            id: 's03-c10', kind: 'text', skill: 'sich.bk.archiv', difficulty: 2,
            prompt: 'Ein empfangener Geschäftsbrief (Aufbewahrungsfrist **6 Jahre**) ist vom **10. Juni 2025**. Ab welchem **Jahr** darf er vernichtet werden? (Jahreszahl)',
            accept: ['2032', 'ab 2032', '01.01.2032', '1.1.2032'],
            hints: ['Die Frist beginnt mit dem Schluss des Kalenderjahres 2025.'],
            misconceptions: [{ answer: '2031', error: 'frist-jahresende', why: 'Die Frist beginnt erst am 31.12.2025 und endet am 31.12.2031 – vernichten darf man ab 2032.' }],
            explanation: 'Fristbeginn 31.12.2025 + 6 Jahre = Fristende 31.12.2031 → Vernichtung ab **2032**.',
          },
        },
        { type: 'practice', title: 'Übung: Archivierung', questionIds: ['s03-q025', 's03-q026', 's03-q027', 's03-q028'], count: 3, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Backup = Wiederherstellung des Betriebs; Archiv = langfristige, unveränderbare Aufbewahrung.',
            'GoBD: steuerlich relevante Daten unveränderbar, vollständig, auffindbar, lesbar.',
            'Fristen: 10 Jahre (Bücher, Abschlüsse), 8 Jahre (Buchungsbelege, seit 2025), 6 Jahre (Geschäftsbriefe).',
            'Fristbeginn: Ende des Kalenderjahres der Entstehung; danach personenbezogene Daten löschen.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's03-l07',
      title: 'Verfügbarkeit durch Redundanz berechnen',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['sich.verfuegbarkeit'],
      simple: `Stell dir eine Lichterkette vor, bei der alle Lämpchen hintereinander hängen: Geht eins kaputt, ist alles dunkel. Das ist eine **Reihenschaltung** – jedes zusätzliche Teil macht das Ganze **anfälliger**.
Hast du dagegen zwei Taschenlampen dabei, bleibt es hell, solange **eine** funktioniert. Das ist **Redundanz** (Parallelschaltung) – dunkel wird es nur, wenn **beide** gleichzeitig ausfallen.
Deshalb rechnet man: Reihe → Verfügbarkeiten malnehmen. Parallel → die **Ausfall**wahrscheinlichkeiten malnehmen und das Ergebnis von 1 abziehen.

**Merke:** Reihe: A = A₁ · A₂ · … – parallel: A = 1 − (1 − A₁) · (1 − A₂) · … (bei n gleichen Teilen: 1 − (1 − A)ⁿ).`,
      steps: [
        {
          type: 'explain',
          title: 'Reihe und Parallel – zwei Formeln',
          body: `**Verfügbarkeit** (A, von *availability*) ist der Anteil der Zeit, in der ein System funktioniert – z. B. 99,5 % = 0,995. Wie man aus einer Verfügbarkeit die erlaubte Ausfallzeit für ein SLA berechnet, lernst du im Modul zum IT-Service. Hier geht es darum, was passiert, wenn **mehrere Komponenten** zusammenspielen. Annahme dabei: Die Komponenten fallen **unabhängig** voneinander aus.

| Schaltung | Wann läuft der Dienst? | Formel | Wirkung |
|---|---|---|---|
| **Reihe** (Kette) | nur wenn **alle** Komponenten laufen | A = A₁ · A₂ · A₃ · … | Gesamt ist **schlechter** als die schwächste Komponente |
| **Parallel** (redundant) | wenn **mindestens eine** Komponente läuft | A = 1 − (1 − A₁) · (1 − A₂) · … | Gesamt ist **besser** als jede einzelne Komponente |
| n **gleiche** Komponenten parallel | mindestens eine läuft | A = 1 − (1 − A)ⁿ | jede weitere Komponente bringt eine „Neun“ oder mehr |

**Warum die Formel für parallel?** (1 − A) ist die **Ausfallwahrscheinlichkeit** einer Komponente. Der Dienst fällt nur aus, wenn **alle** gleichzeitig ausfallen – dafür multipliziert man die Ausfallwahrscheinlichkeiten. Die Verfügbarkeit ist der Rest bis 1.

**Ausfallzeit pro Jahr:** (1 − A) · 8.760 h bzw. (1 − A) · 525.600 min (365 Tage).

**Typische Redundanzen am Arbeitsplatz und im Serverraum:** zwei Netzteile im Server, USV neben dem Stromnetz, zwei Internetanschlüsse verschiedener Anbieter, zwei Server im Cluster, zwei Domänencontroller.

**Wichtig:** Redundanz hilft nur, wenn die Komponenten **nicht gemeinsam** ausfallen können. Zwei Server im selben Rack an derselben Steckdosenleiste haben eine gemeinsame Schwachstelle (**Single Point of Failure**) – die Formel gilt dann nicht mehr. Und: Redundanz schützt die **Verfügbarkeit**, sie ersetzt **kein Backup** (ein gelöschter Ordner ist auf beiden Servern weg).`,
        },
        {
          type: 'example',
          title: 'Serverraum: Stromnetz, USV und Server',
          problem: 'Das Stromnetz hat eine Verfügbarkeit von **99,98 %**, die USV von **95 %**; Strom fehlt nur, wenn beide gleichzeitig ausfallen. Der Server hat **99,5 %**. (a) Wie viele Minuten Ausfall pro Jahr sind zu erwarten? (b) Wie viele sind es, wenn ein zweiter, gleich guter Server im Cluster dazukommt (einer genügt)?',
          steps: [
            { label: '1. Strom (parallel)', body: '1 − (1 − 0,9998) · (1 − 0,95) = 1 − 0,0002 · 0,05 = 1 − 0,00001 = **0,99999**' },
            { label: '2a. Strom und Server in Reihe', body: '0,99999 · 0,995 = **0,99499005**' },
            { label: '3a. Ausfallzeit', body: '(1 − 0,99499005) · 525.600 min = 0,00500995 · 525.600 min ≈ **2.633,2 min** (≈ 43,9 h)' },
            { label: '2b. Zwei Server parallel', body: '1 − (1 − 0,995)² = 1 − 0,005² = 1 − 0,000025 = **0,999975**' },
            { label: '3b. Strom und Cluster in Reihe', body: '0,99999 · 0,999975 = 0,99996500025 → (1 − 0,99996500025) · 525.600 min ≈ **18,4 min**' },
          ],
          result: 'Ohne Cluster rund 2.633 Minuten (≈ 44 h) Ausfall pro Jahr, mit zweitem Server nur noch rund 18 Minuten – Redundanz beim schwächsten Glied bringt am meisten.',
        },
        {
          type: 'check',
          question: {
            id: 's03-c12', kind: 'number', skill: 'sich.verfuegbarkeit', difficulty: 1,
            prompt: 'Ein Server hat **zwei Netzteile** (Hot-Swap), jedes mit einer Verfügbarkeit von **99 %**. Der Server läuft, solange mindestens ein Netzteil funktioniert (Ausfälle unabhängig). Wie hoch ist die Verfügbarkeit der Stromversorgung in **%**?',
            answer: 99.99, tolerance: 0.0001, unit: '%',
            hints: ['Ausfallwahrscheinlichkeit eines Netzteils: 1 − 0,99 = 0,01.', 'Beide gleichzeitig: 0,01 · 0,01. Verfügbarkeit = 1 minus dieser Wert.'],
            misconceptions: [
              { answer: '98.01', error: 'redundanz-reihe-parallel', why: '0,99 · 0,99 ist die Formel für die **Reihe** (beide müssen laufen). Bei Redundanz reicht eines – multipliziert werden die Ausfallwahrscheinlichkeiten.' },
              { answer: '0.01', error: 'redundanz-ausfall-statt-verfuegbar', why: 'Das ist die Wahrscheinlichkeit, dass **beide** ausfallen (0,0001 = 0,01 %). Gefragt ist die Verfügbarkeit.' },
            ],
            explanation: '**Ergebnis: 99,99 %**\n\n1. Ausfall je Netzteil: 1 − 0,99 = 0,01\n2. Beide fallen gleichzeitig aus: 0,01 · 0,01 = 0,0001\n3. Verfügbarkeit: 1 − 0,0001 = 0,9999 = **99,99 %**\n\nHäufiger Fehler: 0,99 · 0,99 = 98,01 % – dann würde das zweite Netzteil die Verfügbarkeit verschlechtern.',
          },
        },
        {
          type: 'check',
          question: {
            id: 's03-c13', kind: 'number', skill: 'sich.verfuegbarkeit', difficulty: 2,
            prompt: 'Der Webshop braucht gleichzeitig Internetanschluss (**99,5 %**), Firewall (**99,9 %**) und Webserver (**99,8 %**) – Reihenschaltung, Ausfälle unabhängig. Wie hoch ist die Gesamtverfügbarkeit in **%**? (auf 4 Nachkommastellen runden)',
            answer: 99.2017, tolerance: 0.0001, unit: '%',
            hints: ['In der Reihe werden die Verfügbarkeiten multipliziert.', '0,995 · 0,999 · 0,998'],
            misconceptions: [{ answer: '99.5', error: 'redundanz-reihe-parallel', why: 'Die schwächste Komponente allein reicht nicht – in der Reihe muss **jede** laufen, das Ergebnis liegt darunter.' }],
            explanation: '**Ergebnis: 99,2017 %**\n\n0,995 · 0,999 · 0,998 = 0,992017 → **99,2017 %**\n\nAusfall pro Jahr: (1 − 0,992017) · 8.760 h ≈ 69,9 h. Häufiger Fehler: nur die schwächste Komponente (99,5 %) nehmen.',
          },
        },
        { type: 'practice', title: 'Übung: Reihe und Parallel', generator: 'sich.redundanz', count: 3, difficulty: 2 },
        { type: 'practice', title: 'Übung: Verfügbarkeit und Redundanz', questionIds: ['s03-q031', 's03-q032', 's03-q033', 's03-q034'], count: 3, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Reihe (alle müssen laufen): A = A₁ · A₂ · … – schlechter als das schwächste Glied.',
            'Parallel (eine genügt): A = 1 − (1 − A₁) · (1 − A₂) · …; n gleiche: 1 − (1 − A)ⁿ.',
            'Ausfallzeit pro Jahr = (1 − A) · 8.760 h bzw. · 525.600 min.',
            'Redundanz wirkt nur ohne gemeinsamen Single Point of Failure – und ersetzt kein Backup.',
          ],
        },
      ],
    },
  ],

  /* ================================================================== */
  questions: [
    {
      id: 's03-q001', kind: 'free', skill: 'sich.bk.grundlagen', difficulty: 2,
      prompt: 'Der Geschäftsführer eines Kunden meint: „Wir brauchen kein Backup, unser Server hat doch ein RAID 1.“ Nehmen Sie Stellung.',
      modelAnswer: 'Das ist falsch. RAID 1 spiegelt die Daten auf zwei Platten und schützt nur vor dem Ausfall einer Festplatte (Ausfallsicherheit/Verfügbarkeit). Löschungen, Überschreiben, Softwarefehler und Ransomware-Verschlüsselung werden sofort auf beide Platten übertragen. Bei Brand, Wasserschaden, Überspannung oder Diebstahl sind beide Platten betroffen. Ältere Datenstände gibt es im RAID nicht. Deshalb ist zusätzlich ein Backup mit mehreren Generationen nötig, das getrennt (idealerweise offline und außer Haus) aufbewahrt wird.',
      keywords: ['Plattenausfall', 'Löschen', 'Ransomware', 'gespiegelt', 'Generationen', 'außer Haus'],
      explanation: 'RAID schützt vor Plattenausfall, Backup vor Datenverlust.',
    },
    {
      id: 's03-q002', kind: 'multi', skill: 'sich.bk.grundlagen', difficulty: 1,
      prompt: 'Vor welchen Ereignissen schützt **nur** eine getrennt aufbewahrte Datensicherung, aber **nicht** ein RAID 1?',
      options: ['Versehentliches Löschen einer Datei', 'Verschlüsselung durch Ransomware', 'Ausfall einer einzelnen Festplatte', 'Brand im Serverraum', 'Beschädigung der Datenbank durch ein fehlerhaftes Update'],
      answer: [0, 1, 3, 4],
      explanation: 'Den Ausfall einer einzelnen Platte fängt das RAID ab – alles andere nur ein Backup.',
    },
    {
      id: 's03-q003', kind: 'single', skill: 'sich.bk.grundlagen', difficulty: 2,
      prompt: 'Alle Dokumente eines Mitarbeiters werden automatisch mit einem Cloud-Ordner synchronisiert. Ransomware verschlüsselt den Laptop. Was ist die Folge?',
      options: ['Die verschlüsselten Dateien werden in die Cloud synchronisiert; ohne Versionierung oder separates Backup sind die Daten verloren.', 'Die Cloud erkennt die Verschlüsselung immer und stoppt sie.', 'Die Cloud-Kopie bleibt grundsätzlich unverändert.', 'Synchronisation ist ein vollwertiges Backup nach 3-2-1.'],
      answer: 0,
      distractors: {
        '1': { why: 'Manche Anbieter haben Erkennungsfunktionen, verlassen kann man sich darauf nicht.', error: 'sync-ist-kein-backup' },
        '2': { why: 'Synchronisation überträgt jede Änderung – auch die Verschlüsselung.', error: 'sync-ist-kein-backup' },
        '3': { why: 'Synchronisation ist keine unabhängige Kopie mit Generationen.', error: 'sync-ist-kein-backup' },
      },
      explanation: 'Synchronisation ≠ Backup. Versionierung/Papierkorb kann helfen, ersetzt aber kein getrenntes Backup.',
    },
    {
      id: 's03-q004', kind: 'table', skill: 'sich.bk.arten', difficulty: 2,
      prompt: 'Vervollständige die Tabelle: Welche Sicherungen braucht man **mindestens**, um am Samstagmorgen den Stand von Freitagabend wiederherzustellen? (Sonntag Vollsicherung, Mo–Fr Teilsicherungen)',
      columns: [{ key: 'n', label: 'Anzahl Sicherungen', type: 'number' }],
      rows: [
        { label: 'Täglich Vollsicherung (Mo–Fr)', cells: { n: { answer: '1' } } },
        { label: 'Mo–Fr inkrementell', cells: { n: { answer: '6' } } },
        { label: 'Mo–Fr differenziell', cells: { n: { answer: '2' } } },
      ],
      misconceptions: [{ cell: '1:n', answer: '5', error: 'backup-vollsicherung-vergessen', why: 'Die Vollsicherung vom Sonntag gehört dazu: 1 + 5 Inkremente = 6.' }, { cell: '2:n', answer: '6', error: 'backup-ink-diff-verwechselt', why: 'Differenziell braucht nur die Vollsicherung und die letzte differenzielle Sicherung.' }],
      explanation: 'Voll: nur die Freitag-Vollsicherung (1). Inkrementell: So + Mo + Di + Mi + Do + Fr (6). Differenziell: So + Fr (2).',
    },
    {
      id: 's03-q005', kind: 'match', skill: 'sich.bk.arten', difficulty: 1,
      prompt: 'Ordne die Beschreibungen der Sicherungsart zu.',
      left: ['sichert alle ausgewählten Daten', 'sichert alle Änderungen seit der letzten Sicherung (egal welcher Art)', 'sichert alle Änderungen seit der letzten Vollsicherung'],
      right: ['Vollsicherung', 'inkrementelle Sicherung', 'differenzielle Sicherung'],
      answer: [0, 1, 2],
      explanation: 'Merke: inkrementell = „Schritt für Schritt“, differenziell = „Differenz zur Vollsicherung“.',
    },
    {
      id: 's03-q006', kind: 'table', skill: 'sich.bk.arten', difficulty: 3,
      prompt: 'Die Datei „Angebot.docx“ wurde am Montag geändert, ihr **Archivbit ist gesetzt**. Trage ein, ob das Archivbit **nach** der jeweiligen Sicherung noch **gesetzt** oder **gelöscht** ist (jeweils unabhängig betrachtet).',
      columns: [{ key: 'a', label: 'Archivbit danach', type: 'text' }],
      rows: [
        { label: 'nach einer Vollsicherung', cells: { a: { answer: 'gelöscht', accept: ['geloescht', 'zurückgesetzt', 'nicht gesetzt', '0'] } } },
        { label: 'nach einer inkrementellen Sicherung', cells: { a: { answer: 'gelöscht', accept: ['geloescht', 'zurückgesetzt', 'nicht gesetzt', '0'] } } },
        { label: 'nach einer differenziellen Sicherung', cells: { a: { answer: 'gesetzt', accept: ['bleibt gesetzt', '1'] } } },
      ],
      explanation: 'Voll und inkrementell setzen das Archivbit zurück; differenziell lässt es stehen – deshalb sammeln sich die Änderungen bis zur nächsten Vollsicherung.',
    },
    {
      id: 's03-q007', kind: 'free', skill: 'sich.bk.arten', difficulty: 2,
      prompt: 'Vergleichen Sie die **inkrementelle** und die **differenzielle** Sicherung hinsichtlich Speicherbedarf, Sicherungsdauer und Wiederherstellungsaufwand.',
      modelAnswer: 'Speicherbedarf: Inkrementelle Sicherungen sind am kleinsten, da sie nur die Änderungen seit der letzten Sicherung enthalten; differenzielle Sicherungen wachsen täglich, da sie alle Änderungen seit der letzten Vollsicherung enthalten – sie benötigen insgesamt mehr Speicher. Sicherungsdauer: inkrementell kurz und gleichbleibend, differenziell zunehmend länger. Wiederherstellung: Inkrementell benötigt die letzte Vollsicherung und alle Inkremente danach in der richtigen Reihenfolge – aufwendig und fehleranfällig, wenn ein Inkrement fehlt. Differenziell benötigt nur die letzte Vollsicherung und die letzte differenzielle Sicherung – schneller und einfacher.',
      keywords: ['seit letzter Sicherung', 'seit letzter Vollsicherung', 'Speicherbedarf', 'Kette', 'zwei Sicherungen'],
      explanation: 'Inkrementell spart beim Sichern, differenziell spart beim Wiederherstellen.',
    },
    {
      id: 's03-q008', kind: 'number', skill: 'sich.bk.rechnen', difficulty: 2,
      prompt: 'Sonntag Vollsicherung **350 GB**. Montag bis Samstag (6 Tage) jeweils inkrementelle Sicherung; täglich ändern sich **15 GB**. Wie viel Speicher belegen alle Sicherungen der Woche zusammen in GB?',
      answer: 440, unit: 'GB',
      misconceptions: [{ answer: '665', error: 'backup-ink-diff-verwechselt', why: 'Das wäre differenziell (15 · 21 = 315 GB + 350 GB). Inkrementell: 6 · 15 GB.' }, { answer: '90', error: 'backup-vollsicherung-vergessen', why: 'Die Vollsicherung fehlt.' }],
      explanation: '350 GB + 6 · 15 GB = 350 + 90 = **440 GB**.',
    },
    {
      id: 's03-q009', kind: 'number', skill: 'sich.bk.rechnen', difficulty: 3,
      prompt: `Beleg: Änderungsprotokoll des Fileservers (jeden Tag andere Dateien).

| Tag | Mo | Di | Mi | Do | Fr |
|---|---|---|---|---|---|
| geändert | 6 GB | 11 GB | 9 GB | 14 GB | 5 GB |

Sonntag wurde voll gesichert (420 GB), Mo–Fr **differenziell**. Wie viel Speicher belegen alle Sicherungen dieser Woche zusammen in GB?`,
      answer: 554, unit: 'GB',
      hints: ['Kumulierte Werte: Mo 6, Di 17, …', 'Summe der kumulierten Werte + Vollsicherung.'],
      misconceptions: [{ answer: '465', error: 'backup-ink-diff-verwechselt', why: 'Du hast nur die Tageswerte addiert (inkrementell). Differenziell müssen die Werte kumuliert werden.' }, { answer: '134', error: 'backup-vollsicherung-vergessen', why: 'Die Vollsicherung (420 GB) fehlt.' }],
      explanation: 'Differenzielle Größen (kumuliert): Mo 6, Di 6 + 11 = 17, Mi 17 + 9 = 26, Do 26 + 14 = 40, Fr 40 + 5 = 45 GB.\n\nSumme: 6 + 17 + 26 + 40 + 45 = 134 GB.\n\nGesamt: 420 GB + 134 GB = **554 GB**.',
    },
    {
      id: 's03-q010', kind: 'number', skill: 'sich.bk.rechnen', difficulty: 2,
      prompt: 'Ein NAS mit **2,4 TB** Daten wird über eine **1-Gbit/s**-Leitung (ohne Overhead) in die Cloud eines Rechenzentrums gesichert. Wie viele **Stunden** dauert die erste Vollsicherung? (1 TB = 1000 GB; auf eine Nachkommastelle runden)',
      answer: 5.3, tolerance: 0.1, unit: 'h',
      misconceptions: [{ answer: '0.7', error: 'einheit-bit-byte', why: 'Byte → Bit vergessen (· 8).' }],
      explanation: '2,4 TB = 2.400.000 MB · 8 = 19.200.000 Mbit; / 1000 Mbit/s = 19.200 s = 320 min ≈ **5,3 h**.',
    },
    {
      id: 's03-q011', kind: 'order', skill: 'sich.bk.strategie', difficulty: 1,
      prompt: 'Ordne die Generationen des Großvater-Vater-Sohn-Prinzips von der **kürzesten** zur **längsten** Aufbewahrung.',
      items: ['Sohn (täglich)', 'Vater (wöchentlich)', 'Großvater (monatlich)'],
      explanation: 'Söhne werden wöchentlich, Väter monatlich, Großväter jährlich überschrieben.',
    },
    {
      id: 's03-q012', kind: 'free', skill: 'sich.bk.strategie', difficulty: 2,
      prompt: 'Erklären Sie die **3-2-1-Regel** und begründen Sie, warum zusätzlich eine Offline- oder unveränderbare Kopie empfohlen wird.',
      modelAnswer: '3-2-1: Es gibt mindestens drei Kopien der Daten (Original und zwei Sicherungen), auf mindestens zwei unterschiedlichen Medien bzw. Speichersystemen, und mindestens eine Kopie liegt außer Haus (anderer Standort, Schließfach, Cloud). So führen ein Medienfehler oder ein lokales Ereignis wie Brand oder Diebstahl nicht zum Totalverlust. Zusätzlich offline/unveränderbar: Ransomware und Angreifer mit Admin-Rechten verschlüsseln oder löschen alle erreichbaren Sicherungen im Netz. Eine getrennte (offline, z. B. ausgelagertes Band) oder unveränderbare Kopie (immutable, WORM/Object Lock) kann nicht manipuliert werden und ermöglicht die Wiederherstellung (3-2-1-1-0).',
      keywords: ['drei Kopien', 'zwei Medien', 'außer Haus', 'Ransomware', 'offline', 'unveränderbar'],
      explanation: 'Die Regel schützt gegen Medienfehler, lokale Katastrophen und – mit Offline-Kopie – gegen Ransomware.',
    },
    {
      id: 's03-q013', kind: 'number', skill: 'sich.bk.strategie', difficulty: 1,
      prompt: 'Der Mailserver wird alle **4 Stunden** gesichert. Wie viele **Stunden** an E-Mails können bei einem Ausfall im ungünstigsten Fall verloren gehen (RPO)?',
      answer: 4, unit: 'h',
      explanation: 'Fällt der Server kurz vor der nächsten Sicherung aus, fehlen bis zu **4 Stunden**. Das Sicherungsintervall bestimmt das tatsächliche RPO.',
    },
    {
      id: 's03-q014', kind: 'match', skill: 'sich.bk.strategie', difficulty: 2,
      prompt: 'Ordne die Sicherungsmedien ihrer typischen Eigenschaft zu.',
      left: ['LTO-Magnetband', 'Cloud-Backup', 'NAS im lokalen Netz', 'Externe USB-Festplatte'],
      right: ['sehr günstig pro TB, offline lagerbar, sequenzieller Zugriff', 'automatisch außer Haus, Wiederherstellung abhängig von der Internetbandbreite, AV-Vertrag nötig', 'schnell und automatisierbar, aber im Netz für Angreifer erreichbar', 'einfach und günstig, aber leicht verlierbar und oft dauerhaft angeschlossen'],
      answer: [0, 1, 2, 3],
      explanation: 'Die Medien ergänzen sich: NAS für schnelle Wiederherstellung, Band/Cloud für Offline-/Offsite-Kopien.',
    },
    {
      id: 's03-q015', kind: 'number', skill: 'sich.bk.strategie', difficulty: 2,
      prompt: 'Eine Vollsicherung umfasst **50 TB** und soll auf **LTO-9-Bänder** (18 TB unkomprimiert) geschrieben werden. Mit Komprimierung wird nicht gerechnet. Wie viele Bänder werden mindestens benötigt?',
      answer: 3, unit: 'Bänder',
      misconceptions: [{ answer: '2', error: 'aufrunden-vergessen', why: '50 / 18 ≈ 2,78 – angebrochene Bänder werden auf ganze Bänder **aufgerundet**.' }, { answer: '2.78', error: 'aufrunden-vergessen', why: 'Es gibt nur ganze Bänder – aufrunden.' }],
      explanation: '50 TB / 18 TB ≈ 2,78 → aufgerundet **3 Bänder**.',
    },
    {
      id: 's03-q016', kind: 'single', skill: 'sich.bk.strategie', difficulty: 2,
      prompt: 'Die Geschäftsführung legt fest: „Im Webshop dürfen höchstens 15 Minuten an Bestellungen verloren gehen.“ Welche Kennzahl wird damit festgelegt?',
      options: ['RPO (Recovery Point Objective)', 'RTO (Recovery Time Objective)', 'MTBF', 'Backupfenster'],
      answer: 0,
      distractors: {
        '1': { why: 'Das RTO beschreibt die maximale Dauer bis zur Wiederherstellung, nicht die Menge verlorener Daten.', error: 'rpo-rto' },
        '2': { why: 'MTBF = mittlere Betriebsdauer zwischen Ausfällen (Hardwarekennzahl).', error: 'rpo-rto' },
        '3': { why: 'Das Backupfenster ist der Zeitraum, in dem gesichert werden kann.', error: 'rpo-rto' },
      },
      explanation: 'Maximaler Datenverlust → **RPO** → Sicherung bzw. Replikation mindestens alle 15 Minuten.',
    },
    {
      id: 's03-q017', kind: 'free', skill: 'sich.bk.strategie', difficulty: 3,
      prompt: `Beleg: Aktuelle Sicherung beim Kunden „Autohaus Petersen“ (25 Arbeitsplätze)

| Was | Wie | Wohin |
|---|---|---|
| Server (2 TB) | täglich 23 Uhr Vollsicherung | NAS im selben Serverschrank, per Freigabe für alle Domänen-Admins beschreibbar |
| Generationen | 7 Tage | |
| Tests | „bisher nicht nötig gewesen“ | |

Bewerten Sie das Konzept und nennen Sie vier konkrete Verbesserungen.`,
      modelAnswer: 'Bewertung: Es gibt nur eine Kopie am selben Ort (Brand, Diebstahl, Überspannung trifft Server und NAS), das NAS ist im Netz mit Admin-Rechten beschreibbar (Ransomware kann es verschlüsseln), nur 7 Tage Generationen (ältere Fehler nicht korrigierbar), keine Tests (Wiederherstellbarkeit unbekannt), RPO bis 24 h. Verbesserungen: 1. Zusätzliche Kopie außer Haus (Cloud mit Verschlüsselung und AV-Vertrag oder Wechselmedien/Band im Schließfach) → 3-2-1. 2. Offline- oder unveränderbare Kopie, NAS mit eigenem Backup-Konto statt Admin-Freigabe, Snapshots mit Sperrfrist. 3. Längere Aufbewahrung nach Generationenprinzip (z. B. 14 täglich, 4 wöchentlich, 12 monatlich). 4. Regelmäßige, dokumentierte Wiederherstellungstests. 5. NAS räumlich getrennt (anderer Brandabschnitt), ggf. inkrementelle/differenzielle Zwischen-Sicherungen tagsüber für kürzeres RPO.',
      keywords: ['außer Haus', 'Ransomware', 'offline', 'Generationen', 'Wiederherstellungstest', 'Brandabschnitt'],
      explanation: 'Belegaufgabe: Schwächen benennen und mit Fachbegriffen (3-2-1, immutable, GVS, Test) begründet verbessern.',
    },
    {
      id: 's03-q018', kind: 'text', skill: 'sich.bk.strategie', difficulty: 1,
      prompt: 'Wie heißt das Rotationsverfahren für Sicherungsmedien mit täglichen, wöchentlichen und monatlichen Generationen? (Name mit drei Generationen)',
      accept: ['Großvater-Vater-Sohn', 'Großvater-Vater-Sohn-Prinzip', 'Generationenprinzip', 'GVS', 'Grossvater-Vater-Sohn', 'Großvater Vater Sohn', 'Grandfather-Father-Son', 'GFS'],
      explanation: '**Großvater-Vater-Sohn-Prinzip** (Generationenprinzip).',
    },
    {
      id: 's03-q019', kind: 'single', skill: 'sich.bk.restore', difficulty: 1,
      prompt: 'Was enthält ein **Systemabbild (Image)**?',
      options: ['Das komplette Laufwerk inklusive Betriebssystem, Programmen, Einstellungen und Bootbereich', 'Nur die Benutzerdokumente', 'Nur die Registrierungsdatenbank', 'Nur die Installationsdateien der Programme'],
      answer: 0,
      distractors: {
        '1': { why: 'Das wäre eine dateibasierte Sicherung.', error: 'image-dateisicherung' },
        '2': { why: 'Die Registry ist nur ein kleiner Teil des Systems.', error: 'image-dateisicherung' },
        '3': { why: 'Ein Image sichert das installierte, konfigurierte System.', error: 'image-dateisicherung' },
      },
      explanation: 'Image = blockweise Kopie des gesamten Datenträgers → schnelle Komplettwiederherstellung.',
    },
    {
      id: 's03-q020', kind: 'number', skill: 'sich.bk.restore', difficulty: 3,
      prompt: 'Ein Datenbankserver soll nach einem Ausfall in höchstens **90 Minuten** wieder laufen (RTO). Das Image (900 GB) wird mit **250 MB/s** zurückgespielt, danach braucht die Datenbankprüfung **20 Minuten**. Wie viele **Minuten** Reserve bleiben bis zum RTO? (1 GB = 1000 MB; negativer Wert, falls das RTO überschritten wird)',
      answer: 10, unit: 'min',
      misconceptions: [{ answer: '30', error: 'rto-schritte-vergessen', why: 'Die 20 Minuten Datenbankprüfung gehören zur Wiederherstellungszeit.' }],
      explanation: '900.000 MB / 250 MB/s = 3.600 s = 60 min; + 20 min = 80 min; 90 − 80 = **10 min** Reserve.',
    },
    {
      id: 's03-q021', kind: 'multi', skill: 'sich.bk.restore', difficulty: 2,
      prompt: 'Welche Fragen beantwortet ein schriftliches **Datensicherungskonzept**?',
      options: ['Welche Systeme und Daten werden gesichert?', 'Wie oft und mit welcher Sicherungsart?', 'Wie lange werden die Stände aufbewahrt und wo liegen sie?', 'Wer ist verantwortlich und wie wird die Wiederherstellung getestet?', 'Welche Hintergrundbilder die Clients haben'],
      answer: [0, 1, 2, 3],
      explanation: 'Was, wie oft, wie lange, wohin, wer, Tests – vgl. BSI-Baustein CON.3 Datensicherungskonzept.',
    },
    {
      id: 's03-q022', kind: 'order', skill: 'sich.bk.restore', difficulty: 2,
      prompt: 'Nach einem Ransomware-Angriff sollen die Systeme wiederhergestellt werden. Bringe die Schritte in eine sinnvolle Reihenfolge.',
      items: ['Betroffene Systeme vom Netz trennen und Vorfall melden', 'Ursache und Einfallstor ermitteln und schließen', 'Sauberen, nicht infizierten Sicherungsstand auswählen (offline/unveränderbare Kopie)', 'Grunddienste wiederherstellen (Active Directory, DNS)', 'Fachanwendungen und Daten wiederherstellen, Funktion prüfen', 'Vorfall dokumentieren und Konzept verbessern'],
      explanation: 'Isolieren → Ursache beseitigen (sonst Neuinfektion) → sauberen Stand wählen → Basisdienste → Anwendungen → Lessons Learned.',
    },
    {
      id: 's03-q023', kind: 'free', skill: 'sich.bk.restore', difficulty: 2,
      prompt: 'Nennen Sie zwei Vorteile und einen Nachteil eines **Image-Backups** gegenüber einer **dateibasierten** Sicherung.',
      modelAnswer: 'Vorteile: 1. Das komplette System inklusive Betriebssystem, Programmen und Einstellungen kann in kurzer Zeit wiederhergestellt werden (Bare-Metal-Recovery), keine Neuinstallation nötig → kürzere Ausfallzeit (RTO). 2. Nichts wird vergessen, da das ganze Laufwerk gesichert wird; auch auf neue Hardware oder als virtuelle Maschine wiederherstellbar. Nachteil: Größerer Speicherbedarf und längere Sicherungsdauer; die Wiederherstellung einzelner Dateien ist je nach Software umständlicher.',
      keywords: ['komplettes System', 'schnell', 'Neuinstallation', 'Speicherbedarf'],
      explanation: 'Image = Geschwindigkeit bei Totalausfall; Dateisicherung = feingranular und sparsam.',
    },
    {
      id: 's03-q024', kind: 'single', skill: 'sich.bk.restore', difficulty: 2,
      prompt: 'Die Backup-Software meldet seit Monaten „Sicherung erfolgreich“. Was ist trotzdem erforderlich?',
      options: ['Regelmäßige Test-Wiederherstellungen mit Protokoll', 'Nichts – die Meldung beweist die Wiederherstellbarkeit.', 'Das Backup täglich manuell zu wiederholen', 'Die Sicherung abzuschalten, um Speicher zu sparen'],
      answer: 0,
      distractors: {
        '1': { why: 'Die Meldung beweist nur, dass ein Job lief – nicht, dass alle Daten vollständig und lesbar sind.', error: 'restore-test' },
        '2': { why: 'Eine Wiederholung prüft die Wiederherstellbarkeit nicht.', error: 'restore-test' },
        '3': { why: 'Dann gäbe es gar keine Sicherung.', error: 'restore-test' },
      },
      explanation: 'Nur ein Wiederherstellungstest beweist, dass das Backup im Ernstfall funktioniert.',
    },
    {
      id: 's03-q025', kind: 'match', skill: 'sich.bk.archiv', difficulty: 2,
      prompt: 'Ordne die Unterlagen ihrer Aufbewahrungsfrist nach HGB/AO (Stand 2026) zu.',
      left: ['Jahresabschluss', 'Eingangsrechnung (Buchungsbeleg)', 'Empfangener Geschäftsbrief'],
      right: ['10 Jahre', '8 Jahre', '6 Jahre'],
      answer: [0, 1, 2],
      explanation: 'Bücher/Abschlüsse 10 Jahre, Buchungsbelege seit 2025 8 Jahre, Handels- und Geschäftsbriefe 6 Jahre.',
    },
    {
      id: 's03-q026', kind: 'text', skill: 'sich.bk.archiv', difficulty: 2,
      prompt: 'Eine Rechnung (Buchungsbeleg, **8 Jahre** Aufbewahrung) stammt vom **20. November 2026**. Ab welchem Jahr darf sie vernichtet werden? (Jahreszahl)',
      accept: ['2035', 'ab 2035', '01.01.2035', '1.1.2035'],
      misconceptions: [{ answer: '2034', error: 'frist-jahresende', why: 'Fristbeginn ist der 31.12.2026, Fristende der 31.12.2034 – vernichten darf man erst ab 2035.' }],
      explanation: 'Beginn 31.12.2026 + 8 Jahre = Ende 31.12.2034 → ab **2035**.',
    },
    {
      id: 's03-q027', kind: 'free', skill: 'sich.bk.archiv', difficulty: 2,
      prompt: 'Grenzen Sie **Datensicherung** und **Archivierung** voneinander ab.',
      modelAnswer: 'Die Datensicherung (Backup) erstellt Kopien der aktuellen Daten, um den Betrieb nach einem Datenverlust schnell wiederherzustellen. Die Kopien werden in Generationen nur für Tage bis Monate aufbewahrt und dann überschrieben. Die Archivierung bewahrt abgeschlossene Daten langfristig (oft viele Jahre, wegen gesetzlicher Aufbewahrungsfristen) unveränderbar, vollständig, auffindbar und lesbar auf; die Daten werden häufig aus dem Produktivsystem in das Archiv verschoben. Ein Archiv dient der Nachweisführung (z. B. GoBD), ein Backup der Verfügbarkeit.',
      keywords: ['Wiederherstellung', 'kurzfristig', 'langfristig', 'unveränderbar', 'Aufbewahrungsfrist', 'GoBD'],
      explanation: 'Backup = Verfügbarkeit, Archiv = Aufbewahrung/Nachweis.',
    },
    {
      id: 's03-q028', kind: 'single', skill: 'sich.bk.archiv', difficulty: 2,
      prompt: 'Was muss mit personenbezogenen Daten in einem Archiv geschehen, wenn die gesetzliche Aufbewahrungsfrist abgelaufen ist und kein anderer Zweck mehr besteht?',
      options: ['Sie müssen gelöscht werden (Speicherbegrenzung).', 'Sie dürfen für immer aufbewahrt werden.', 'Sie müssen an die Aufsichtsbehörde übergeben werden.', 'Sie müssen zusätzlich in die Cloud kopiert werden.'],
      answer: 0,
      distractors: {
        '1': { why: 'Die DSGVO verlangt Speicherbegrenzung: nur so lange wie nötig.', error: 'loeschpflicht' },
        '2': { why: 'Die Aufsichtsbehörde sammelt keine Unternehmensdaten.', error: 'loeschpflicht' },
        '3': { why: 'Eine weitere Kopie wäre das Gegenteil von Löschen.', error: 'loeschpflicht' },
      },
      explanation: 'Nach Fristablauf greift die Löschpflicht (Art. 5 Abs. 1 e, Art. 17) – geregelt im Löschkonzept.',
    },
    {
      id: 's03-q029', kind: 'number', skill: 'sich.bk.rechnen', difficulty: 1,
      prompt: 'Eine Vollsicherung mit **120 GB** wird auf eine USB-Festplatte mit **100 MB/s** geschrieben. Wie viele **Minuten** dauert das? (1 GB = 1000 MB)',
      answer: 20, unit: 'min',
      misconceptions: [{ answer: '1200', error: 'einheit-sekunden-minuten', why: 'Das sind Sekunden – noch durch 60 teilen.' }],
      explanation: '120.000 MB / 100 MB/s = 1.200 s = **20 min**.',
    },
    {
      id: 's03-q030', kind: 'number', skill: 'sich.bk.rechnen', difficulty: 3,
      prompt: 'Sonntag Vollsicherung 600 GB. Montag bis Freitag **differenziell**, täglich 20 GB Änderungen (jeden Tag andere Dateien). Die Sicherungen einer Woche werden **4 Wochen** lang aufbewahrt (gleiches Schema jede Woche). Wie viel Speicher wird für die 4 Wochen insgesamt benötigt, in **GB**?',
      answer: 3600, unit: 'GB',
      hints: ['Erst eine Woche berechnen: Voll + 20 · (1+2+3+4+5).', 'Dann mal 4.'],
      misconceptions: [{ answer: '2800', error: 'backup-ink-diff-verwechselt', why: 'Das wäre inkrementell (600 + 100 GB je Woche). Differenziell wächst: 20 + 40 + 60 + 80 + 100 = 300 GB.' }, { answer: '900', error: 'wochen-vergessen', why: 'Das ist nur eine Woche – es werden 4 Wochen aufbewahrt.' }],
      explanation: 'Eine Woche: 600 + 20 · 15 = 600 + 300 = 900 GB. Vier Wochen: 4 · 900 = **3.600 GB** (3,6 TB).',
    },
    {
      id: 's03-q031', kind: 'number', skill: 'sich.verfuegbarkeit', difficulty: 2,
      prompt: 'Zwei **Firewalls** laufen als Cluster; der Internetzugang funktioniert, solange **mindestens eine** läuft. Jede hat eine Verfügbarkeit von **99,5 %** (Ausfälle unabhängig). Wie hoch ist die Verfügbarkeit des Clusters in **%**? (auf 4 Nachkommastellen)',
      answer: 99.9975, tolerance: 0.0001, unit: '%',
      hints: ['Ausfallwahrscheinlichkeit einer Firewall: 1 − 0,995 = 0,005.', 'Beide gleichzeitig: 0,005 · 0,005. Verfügbarkeit = 1 minus dieser Wert.'],
      misconceptions: [{ answer: '99.0025', error: 'redundanz-reihe-parallel', why: '0,995 · 0,995 ist die Formel für die **Reihe**. Im Cluster reicht eine Firewall.' }],
      explanation: '1 − (1 − 0,995)² = 1 − 0,005² = 1 − 0,000025 = 0,999975 = **99,9975 %**',
    },
    {
      id: 's03-q032', kind: 'single', skill: 'sich.verfuegbarkeit', difficulty: 1,
      prompt: 'Der Dateiserver hat zwei gespiegelte Festplatten (RAID 1) und zwei Netzteile. Der Chef meint: „Dann brauchen wir kein Backup mehr.“ Was antwortest du?',
      options: [
        'Doch: Redundanz schützt vor Hardwareausfall, aber nicht vor Löschen, Verschlüsselung durch Ransomware oder Brand – ein Backup bleibt nötig.',
        'Stimmt, RAID 1 ist ein vollwertiges Backup.',
        'Stimmt, wenn zusätzlich eine USV vorhanden ist.',
        'Ein Backup ist nur bei Servern ohne RAID vorgeschrieben.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'RAID 1 spiegelt auch versehentliches Löschen sofort auf die zweite Platte.', error: 'raid-ist-backup' },
        '2': { why: 'Die USV schützt vor Stromausfall, nicht vor Datenverlust durch Löschen oder Schadsoftware.', error: 'raid-ist-backup' },
        '3': { why: 'Backup und Redundanz haben verschiedene Aufgaben – beides wird gebraucht.', error: 'raid-ist-backup' },
      },
      explanation: 'Redundanz erhöht die **Verfügbarkeit**. Ein Backup schützt vor **Datenverlust**. Das eine ersetzt das andere nicht.',
    },
    {
      id: 's03-q033', kind: 'number', skill: 'sich.verfuegbarkeit', difficulty: 2,
      prompt: 'Ein Arbeitsplatz braucht gleichzeitig den **Switch (99,9 %)** und den **Server (99,5 %)** – Reihenschaltung, Ausfälle unabhängig. Wie viele **Stunden** Ausfall pro Jahr (8.760 h) sind zu erwarten? (auf eine Nachkommastelle)',
      answer: 52.5, tolerance: 0.05, unit: 'h',
      hints: ['Gesamtverfügbarkeit: 0,999 · 0,995.', 'Ausfallzeit = (1 − Gesamtverfügbarkeit) · 8.760 h.'],
      misconceptions: [{ answer: '43.8', error: 'redundanz-reihe-parallel', why: 'Das ist nur der Ausfall des Servers. In der Reihe kommt der Ausfall des Switches dazu.' }],
      explanation: '0,999 · 0,995 = 0,994005 → (1 − 0,994005) · 8.760 h = 0,005995 · 8.760 h ≈ **52,5 h**',
    },
    {
      id: 's03-q034', kind: 'single', skill: 'sich.verfuegbarkeit', difficulty: 2,
      prompt: 'Zwei Server laufen als Cluster, stehen aber im **selben Rack an derselben Steckdosenleiste**. Was ist das Problem?',
      options: [
        'Die Steckdosenleiste ist ein Single Point of Failure – fällt sie aus, sind beide Server weg; die Formel für Parallelschaltung gilt dann nicht.',
        'Es gibt kein Problem, zwei Server sind immer redundant.',
        'Cluster dürfen grundsätzlich nicht im selben Rack stehen.',
        'Die Verfügbarkeit wird dadurch doppelt so hoch.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Redundanz wirkt nur, wenn die Geräte nicht gemeinsam ausfallen können.', error: 'redundanz-spof' },
        '2': { why: 'Erlaubt ist das schon – problematisch ist die gemeinsame Stromversorgung.', error: 'redundanz-spof' },
        '3': { why: 'Verfügbarkeiten verdoppeln sich nie; mit gemeinsamer Schwachstelle bringt der zweite Server sogar wenig.', error: 'redundanz-spof' },
      },
      explanation: 'Redundanz hilft nur ohne gemeinsame Schwachstelle (**Single Point of Failure**). Besser: zwei Steckdosenleisten an verschiedenen Stromkreisen bzw. USVs.',
    },
  ],
};
