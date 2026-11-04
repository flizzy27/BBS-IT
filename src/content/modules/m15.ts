import type { Module, Question } from '../types';

/**
 * Modul 15 – Netzwerkberechnungen
 * Grundlagen: SI-Präfixe (Zehnerpotenzen), IEC 80000-13 / IEC 60027-2 (Binärpräfixe Ki, Mi, Gi, Ti).
 * Konvention: Datenraten (bit/s, Mbit/s, Gbit/s) sind IMMER dezimal. Bei Datenmengen entscheidet die Aufgabenstellung.
 */

const questions: Question[] = [
  /* ---------------------------------------------------------------- */
  /* calc.units / calc.prefixes                                        */
  /* ---------------------------------------------------------------- */
  {
    id: 'm15-q001',
    kind: 'single',
    skill: 'calc.units',
    difficulty: 1,
    prompt: 'Wie viele Bit hat ein Byte?',
    options: ['4', '8', '10', '16'],
    answer: 1,
    distractors: {
      '0': { why: '4 Bit sind ein Nibble (Halbbyte) – ein Hex-Zeichen.', error: 'nibble-byte' },
      '2': { why: '10 Bit entstehen z. B. bei 8b/10b-Leitungscodierung, aber 1 Byte bleibt 8 Bit.', error: 'leitungscode' },
      '3': { why: '16 Bit sind 2 Byte (z. B. ein IPv6-Block).', error: 'einheiten' },
    },
    explanation: '1 Byte (B) = **8 Bit** (b). Deshalb: Byte → Bit **mal 8**, Bit → Byte **durch 8**.',
  },
  {
    id: 'm15-q002',
    kind: 'number',
    skill: 'calc.units',
    difficulty: 1,
    prompt: 'Ein E-Mail-Anhang ist **3 MB** groß. Wie viele **kbit** sind das? (Dezimalpräfixe)',
    answer: 24000,
    unit: 'kbit',
    explanation:
      '1. MB → Byte: 3 MB = 3 · 10⁶ Byte = 3.000.000 Byte\n2. Byte → Bit: · 8 = 24.000.000 bit\n3. bit → kbit: ÷ 1000 = **24.000 kbit**\n\nKürzer: 3 MB = 3000 kB → · 8 = 24.000 kbit.',
    hints: ['Erst in kB umrechnen, dann · 8.'],
  },
  {
    id: 'm15-q003',
    kind: 'number',
    skill: 'calc.prefixes',
    difficulty: 1,
    prompt: 'Wie viele **Byte** sind **1 GiB**?',
    answer: 1073741824,
    unit: 'Byte',
    explanation: '1 GiB = 2³⁰ Byte = 1024 · 1024 · 1024 Byte = **1.073.741.824 Byte**.',
    hints: ['Gi = 2³⁰', '1024³'],
  },
  {
    id: 'm15-q004',
    kind: 'number',
    skill: 'calc.prefixes',
    difficulty: 2,
    prompt: 'Eine Festplatte hat laut Hersteller **2 TB**. Wie viele **TiB** sind das? (auf 3 Nachkommastellen)',
    answer: 1.819,
    tolerance: 0.005,
    unit: 'TiB',
    explanation:
      '2 TB = 2 · 10¹² Byte. 1 TiB = 2⁴⁰ Byte = 1.099.511.627.776 Byte.\n\n2.000.000.000.000 ÷ 1.099.511.627.776 ≈ **1,819 TiB**.\n\nDie Hersteller rechnen dezimal, Windows binär – daher „fehlen“ scheinbar ca. 9 %.',
    hints: ['TB = 10¹², TiB = 2⁴⁰'],
  },
  {
    id: 'm15-q005',
    kind: 'single',
    skill: 'calc.prefixes',
    difficulty: 2,
    prompt:
      'Ein Kunde von Elektro Krämer beschwert sich: Seine neue **1-TB-SSD** wird von Windows nur mit „**931 GB**“ angezeigt. Was ist die Ursache?',
    options: [
      'Die SSD ist defekt, 69 GB sind ausgefallen.',
      'Das Dateisystem belegt 69 GB für Verwaltungsdaten.',
      'Der Hersteller rechnet mit 10¹² Byte, Windows teilt durch 2³⁰ und zeigt eigentlich GiB an, beschriftet sie aber als „GB“.',
      'Windows reserviert 7 % für Updates.',
    ],
    answer: 2,
    distractors: {
      '0': { why: 'Die Abweichung ist bei jeder SSD gleich und rein rechnerisch – kein Defekt.', error: 'praefix-ursache' },
      '1': { why: 'Das Dateisystem braucht etwas Platz, aber nicht annähernd 7 %. Die Anzeige der Gesamtgröße erklärt sich durch die Präfixe.', error: 'praefix-ursache' },
      '3': { why: 'Eine solche Reserve gibt es in dieser Form nicht.', error: 'praefix-ursache' },
    },
    explanation:
      '1 TB = 10¹² Byte. Windows rechnet 10¹² ÷ 2³⁰ = **931,32** und schreibt dahinter „GB“, obwohl es **GiB** sind. Es fehlt kein einziges Byte.',
  },
  {
    id: 'm15-q006',
    kind: 'match',
    skill: 'calc.prefixes',
    difficulty: 1,
    prompt: 'Ordne jedem Präfix den richtigen Faktor zu.',
    left: ['kB', 'KiB', 'MB', 'MiB', 'GB', 'GiB'],
    right: ['10³ Byte', '2¹⁰ Byte', '10⁶ Byte', '2²⁰ Byte', '10⁹ Byte', '2³⁰ Byte'],
    answer: [0, 1, 2, 3, 4, 5],
    explanation:
      'Dezimal (SI): k = 10³, M = 10⁶, G = 10⁹, T = 10¹². Binär (IEC, mit „i“): Ki = 2¹⁰ = 1024, Mi = 2²⁰, Gi = 2³⁰, Ti = 2⁴⁰. Das „i“ steht für „binary“.',
  },
  {
    id: 'm15-q007',
    kind: 'number',
    skill: 'calc.prefixes',
    difficulty: 2,
    prompt: 'Ein Notebook hat **16 GiB** RAM. Wie viele **GB** sind das? (2 Nachkommastellen)',
    answer: 17.18,
    tolerance: 0.01,
    unit: 'GB',
    explanation: '16 GiB = 16 · 2³⁰ Byte = 17.179.869.184 Byte. ÷ 10⁹ = **17,18 GB**.',
    hints: ['Erst in Byte umrechnen.'],
  },
  {
    id: 'm15-q008',
    kind: 'number',
    skill: 'calc.units',
    difficulty: 1,
    prompt: 'Wie viele **Mbit** sind **0,5 GB**? (Dezimalpräfixe)',
    answer: 4000,
    unit: 'Mbit',
    explanation: '0,5 GB = 500 MB. 500 MB · 8 = **4.000 Mbit**.',
  },
  {
    id: 'm15-q009',
    kind: 'table',
    skill: 'calc.prefixes',
    difficulty: 2,
    prompt: 'Vervollständige die Umrechnungstabelle.',
    columns: [
      { key: 'unit', label: 'Einheit', type: 'text' },
      { key: 'byte', label: 'Byte', type: 'number' },
      { key: 'bit', label: 'Bit', type: 'number' },
    ],
    rows: [
      { cells: { unit: { given: '1 kB' }, byte: { answer: '1000' }, bit: { answer: '8000' } } },
      { cells: { unit: { given: '1 KiB' }, byte: { answer: '1024' }, bit: { answer: '8192' } } },
      { cells: { unit: { given: '1 MB' }, byte: { answer: '1000000' }, bit: { answer: '8000000' } } },
      { cells: { unit: { given: '1 MiB' }, byte: { answer: '1048576' }, bit: { answer: '8388608' } } },
    ],
    explanation:
      '| Einheit | Byte | Bit (· 8) |\n|---|---|---|\n| 1 kB | 1.000 | 8.000 |\n| 1 KiB | 1.024 | 8.192 |\n| 1 MB | 1.000.000 | 8.000.000 |\n| 1 MiB | 1.048.576 | 8.388.608 |',
    hints: ['1 MiB = 1024 · 1024 Byte'],
  },
  {
    id: 'm15-q010',
    kind: 'multi',
    skill: 'calc.units',
    difficulty: 2,
    prompt: 'Welche Aussagen zur Schreibweise sind richtig?',
    options: [
      'Kleines „b“ steht für Bit, großes „B“ für Byte.',
      '100 Mbit/s und 100 Mbps bedeuten dasselbe.',
      '100 MB/s und 100 Mbit/s sind gleich schnell.',
      'Das SI-Präfix für 1000 wird klein geschrieben: k.',
      'KiB ist das Binärpräfix für 1024 Byte.',
    ],
    answer: [0, 1, 3, 4],
    explanation:
      '100 MB/s = 800 Mbit/s – Faktor 8! Deshalb ist die Groß-/Kleinschreibung bei b/B so wichtig. Das SI-Präfix „k“ ist klein (kB), beim Binärpräfix schreibt man „Ki“ groß.',
  },
  {
    id: 'm15-q011',
    kind: 'number',
    skill: 'calc.storage',
    difficulty: 2,
    prompt:
      'Ein unkomprimiertes Foto hat **1920 × 1080 Pixel** und **24 Bit Farbtiefe**. Wie groß ist es in **MB**? (Dezimalpräfixe, 2 Nachkommastellen)',
    answer: 6.22,
    tolerance: 0.01,
    unit: 'MB',
    explanation:
      '1. Pixel: 1920 · 1080 = 2.073.600\n2. 24 Bit = 3 Byte pro Pixel → 2.073.600 · 3 = 6.220.800 Byte\n3. ÷ 10⁶ = **6,22 MB**',
    hints: ['24 Bit = 3 Byte.'],
  },

  /* ---------------------------------------------------------------- */
  /* calc.rate                                                         */
  /* ---------------------------------------------------------------- */
  {
    id: 'm15-q012',
    kind: 'number',
    skill: 'calc.rate',
    difficulty: 1,
    prompt: 'Wie viele **MB/s** entsprechen theoretisch **1 Gbit/s**?',
    answer: 125,
    unit: 'MB/s',
    explanation: '1 Gbit/s = 1000 Mbit/s. ÷ 8 = **125 MB/s**. (In der Praxis wegen Overhead etwas weniger, ca. 110–118 MB/s.)',
  },
  {
    id: 'm15-q013',
    kind: 'number',
    skill: 'calc.rate',
    difficulty: 1,
    prompt: 'Der Browser zeigt beim Download **12,5 MB/s**. Wie vielen **Mbit/s** entspricht das?',
    answer: 100,
    unit: 'Mbit/s',
    explanation: '12,5 MB/s · 8 = **100 Mbit/s**. Der Anschluss läuft also voll ausgelastet, wenn er „100 Mbit/s“ hat.',
  },
  {
    id: 'm15-q014',
    kind: 'number',
    skill: 'calc.rate',
    difficulty: 2,
    prompt: 'Eine Datei mit **750 MB** wurde in **60 Sekunden** übertragen. Wie hoch war die **Datenrate in Mbit/s**?',
    answer: 100,
    unit: 'Mbit/s',
    explanation:
      'Formel umstellen: Datenrate = Datenmenge ÷ Zeit\n\n1. 750 MB · 8 = 6.000 Mbit\n2. 6.000 Mbit ÷ 60 s = **100 Mbit/s**',
    hints: ['r = D ÷ t', 'Datenmenge zuerst in Mbit umrechnen.'],
  },
  {
    id: 'm15-q015',
    kind: 'number',
    skill: 'calc.rate',
    difficulty: 2,
    prompt:
      'Die nächtliche Datensicherung von Elektro Krämer (**30 GB**) soll in **maximal 1 Stunde** zum externen Rechenzentrum übertragen werden. Welche Datenrate (in **Mbit/s**, 2 Nachkommastellen) ist **mindestens** nötig? (Overhead vernachlässigen)',
    answer: 66.67,
    tolerance: 0.01,
    unit: 'Mbit/s',
    explanation:
      '1. 30 GB = 30.000 MB → · 8 = 240.000 Mbit\n2. 1 h = 3.600 s\n3. 240.000 Mbit ÷ 3.600 s = **66,67 Mbit/s**\n\nIn der Praxis plant man Reserve ein (Overhead, andere Nutzer) – z. B. eine 100-Mbit/s-Leitung.',
    hints: ['Stunde in Sekunden umrechnen.'],
  },
  {
    id: 'm15-q016',
    kind: 'single',
    skill: 'calc.rate',
    difficulty: 2,
    prompt: 'Wie ist „Mbit/s“ bei Datenraten (z. B. 100 Mbit/s Ethernet) zu verstehen?',
    options: [
      '100 · 1.000.000 bit/s (dezimal) – Datenraten sind immer dezimal.',
      '100 · 1.048.576 bit/s (binär).',
      'Das hängt vom Betriebssystem ab.',
      '100 · 1024 bit/s.',
    ],
    answer: 0,
    distractors: {
      '1': { why: 'Binärpräfixe gibt es bei Datenraten in Netzwerkstandards nicht. Ethernet, WLAN, DSL – alles dezimal.', error: 'datenrate-binaer' },
      '2': { why: 'Die Datenrate ist im Standard festgelegt (z. B. IEEE 802.3), nicht vom OS.', error: 'datenrate-binaer' },
      '3': { why: '100 · 1024 wären ~0,1 Mbit/s – falsche Größenordnung und falsches Präfix.', error: 'datenrate-binaer' },
    },
    explanation:
      'Datenraten in der Nachrichtentechnik werden **immer dezimal** angegeben: 1 kbit/s = 1000 bit/s, 1 Mbit/s = 10⁶ bit/s, 1 Gbit/s = 10⁹ bit/s. Die Frage „1000 oder 1024?“ stellt sich nur bei **Datenmengen**.',
  },
  {
    id: 'm15-q017',
    kind: 'number',
    skill: 'calc.rate',
    difficulty: 2,
    prompt: 'Wie viele **GB** können über eine voll ausgelastete **100-Mbit/s**-Leitung in **8 Stunden** maximal übertragen werden?',
    answer: 360,
    unit: 'GB',
    explanation:
      'D = r · t\n\n1. 8 h = 28.800 s\n2. 100 Mbit/s · 28.800 s = 2.880.000 Mbit\n3. ÷ 8 = 360.000 MB = **360 GB**',
    hints: ['Datenmenge = Datenrate · Zeit'],
  },

  /* ---------------------------------------------------------------- */
  /* calc.transfertime                                                 */
  /* ---------------------------------------------------------------- */
  {
    id: 'm15-q018',
    kind: 'number',
    skill: 'calc.transfertime',
    difficulty: 1,
    prompt: 'Wie viele **Sekunden** dauert die Übertragung von **2 GB** über eine **100-Mbit/s**-Verbindung? (Dezimalpräfixe, ohne Overhead)',
    answer: 160,
    unit: 's',
    explanation:
      't = Datenmenge ÷ Datenrate\n\n1. 2 GB = 2.000 MB\n2. · 8 = 16.000 Mbit\n3. 16.000 Mbit ÷ 100 Mbit/s = **160 s** (2 min 40 s)',
    hints: ['GB → MB → Mbit', 'Dann durch die Datenrate teilen.'],
  },
  {
    id: 'm15-q019',
    kind: 'number',
    skill: 'calc.transfertime',
    difficulty: 2,
    prompt: 'Ein Windows-ISO-Image (**4,7 GB**) wird über einen **50-Mbit/s**-DSL-Anschluss geladen. Wie viele **Sekunden** dauert das mindestens?',
    answer: 752,
    unit: 's',
    explanation: '4,7 GB = 4.700 MB · 8 = 37.600 Mbit. 37.600 ÷ 50 = **752 s** = 12 min 32 s.',
  },
  {
    id: 'm15-q020',
    kind: 'number',
    skill: 'calc.transfertime',
    difficulty: 2,
    prompt:
      'Elektro Krämer will **120 GB** Projektdaten in die Cloud hochladen. Der Anschluss hat **40 Mbit/s Upload**. Wie viele **Stunden** dauert das? (2 Nachkommastellen, ohne Overhead)',
    answer: 6.67,
    tolerance: 0.01,
    unit: 'h',
    explanation:
      '1. 120 GB = 120.000 MB · 8 = 960.000 Mbit\n2. 960.000 Mbit ÷ 40 Mbit/s = 24.000 s\n3. 24.000 s ÷ 3.600 = **6,67 h** (= 6 h 40 min)\n\nWichtig: Beim Hochladen zählt die **Upload**-Rate, die bei DSL/Kabel meist viel kleiner ist als der Download.',
    hints: ['Upload-Rate verwenden!', 'Sekunden ÷ 3600 = Stunden'],
  },
  {
    id: 'm15-q021',
    kind: 'number',
    skill: 'calc.transfertime',
    difficulty: 3,
    prompt: 'Eine Datei hat **700 MiB**. Wie viele **Sekunden** dauert die Übertragung bei **16 Mbit/s**? (ganze Sekunden)',
    answer: 367,
    tolerance: 0.5,
    unit: 's',
    explanation:
      'Achtung: Datenmenge binär, Datenrate dezimal!\n\n1. 700 MiB = 700 · 1.048.576 Byte = 734.003.200 Byte\n2. · 8 = 5.872.025.600 bit\n3. 16 Mbit/s = 16.000.000 bit/s\n4. 5.872.025.600 ÷ 16.000.000 ≈ **367 s**\n\nMit Dezimalpräfix (700 MB) wären es 350 s – ein Unterschied von ca. 5 %.',
    hints: ['MiB = 1.048.576 Byte', 'Die Datenrate ist trotzdem dezimal.'],
  },
  {
    id: 'm15-q022',
    kind: 'number',
    skill: 'calc.transfertime',
    difficulty: 1,
    prompt: 'Wie lange (in **Sekunden**) dauert das Senden eines **25-MB**-Anhangs bei **10 Mbit/s** Upload?',
    answer: 20,
    unit: 's',
    explanation: '25 MB · 8 = 200 Mbit. 200 Mbit ÷ 10 Mbit/s = **20 s**.',
  },
  {
    id: 'm15-q023',
    kind: 'single',
    skill: 'calc.transfertime',
    difficulty: 2,
    prompt:
      'Ein Azubi rechnet: „2 GB über 100 Mbit/s dauern 2.000 ÷ 100 = **20 Sekunden**.“ Welcher Fehler steckt darin?',
    options: [
      'Er hätte mit 1024 statt 1000 rechnen müssen.',
      'Er hat Byte und Bit nicht umgerechnet – es fehlt der Faktor 8.',
      'Er hätte multiplizieren statt dividieren müssen.',
      'Kein Fehler, das Ergebnis stimmt.',
    ],
    answer: 1,
    distractors: {
      '0': { why: 'Mit 1024 ändert sich das Ergebnis nur um wenige Prozent – der große Fehler (Faktor 8) bleibt.', error: 'byte-bit-vergessen' },
      '2': { why: 'Zeit = Menge ÷ Rate – die Division ist richtig.', error: 'formel' },
      '3': { why: '20 s wäre nur richtig bei 100 MB/s (Byte!), nicht bei 100 Mbit/s.', error: 'byte-bit-vergessen' },
    },
    explanation:
      '2.000 **MB** ÷ 100 **Mbit**/s – die Einheiten passen nicht zusammen! Richtig: 2.000 MB · 8 = 16.000 Mbit ÷ 100 Mbit/s = **160 s**. Tipp: Schreib immer die Einheiten mit, dann fällt so ein Fehler sofort auf.',
  },
  {
    id: 'm15-q024',
    kind: 'order',
    skill: 'calc.transfertime',
    difficulty: 1,
    prompt: 'Bringe die Schritte zur Berechnung einer Übertragungszeit in die richtige Reihenfolge.',
    items: [
      'Gegebene Werte notieren und klären: Dezimal- oder Binärpräfix laut Aufgabe?',
      'Datenmenge in Byte (oder passende Einheit wie MB) umrechnen',
      'Datenmenge mit 8 multiplizieren (Byte → Bit)',
      'Ggf. Overhead berücksichtigen: Nutzdatenrate bestimmen',
      'Datenmenge in Bit durch Datenrate in bit/s teilen',
      'Ergebnis in eine sinnvolle Zeiteinheit (min, h) umrechnen und Plausibilität prüfen',
    ],
    explanation:
      'Die Formel ist einfach (t = D ÷ r) – die Punkte gibt es für die **saubere Einheitenumrechnung**. Plausibilität: Ein Film in Sekunden über DSL? Eher unwahrscheinlich.',
  },
  {
    id: 'm15-q025',
    kind: 'number',
    skill: 'calc.transfertime',
    difficulty: 2,
    prompt: 'Laut Aufgabenstellung gilt **1 GB = 1024³ Byte**. Wie viele **Sekunden** dauert die Übertragung von **2 GB** über **100 Mbit/s**? (1 Nachkommastelle)',
    answer: 171.8,
    tolerance: 0.1,
    unit: 's',
    explanation:
      '1. 2 · 1024³ Byte = 2.147.483.648 Byte\n2. · 8 = 17.179.869.184 bit\n3. ÷ 100.000.000 bit/s = **171,8 s**\n\nDie Aufgabenstellung entscheidet, ob 1000 oder 1024 – die Datenrate bleibt aber dezimal.',
  },
  {
    id: 'm15-q026',
    kind: 'table',
    skill: 'calc.transfertime',
    difficulty: 2,
    prompt: 'Ein **10-GB**-Backup soll übertragen werden. Trage die Übertragungszeit in Sekunden ein (dezimal, ohne Overhead).',
    columns: [
      { key: 'link', label: 'Verbindung', type: 'text' },
      { key: 'rate', label: 'Datenrate (Mbit/s)', type: 'number' },
      { key: 'time', label: 'Zeit (s)', type: 'number' },
    ],
    rows: [
      { cells: { link: { given: 'Gigabit-Ethernet' }, rate: { given: '1000' }, time: { answer: '80' } } },
      { cells: { link: { given: 'Fast Ethernet' }, rate: { given: '100' }, time: { answer: '800' } } },
      { cells: { link: { given: 'DSL-Upload' }, rate: { given: '16' }, time: { answer: '5000' } } },
    ],
    explanation: '10 GB = 10.000 MB · 8 = 80.000 Mbit.\n\n- 80.000 ÷ 1.000 = **80 s**\n- 80.000 ÷ 100 = **800 s** (13 min 20 s)\n- 80.000 ÷ 16 = **5.000 s** (1 h 23 min 20 s)',
  },

  /* ---------------------------------------------------------------- */
  /* calc.overhead                                                     */
  /* ---------------------------------------------------------------- */
  {
    id: 'm15-q027',
    kind: 'number',
    skill: 'calc.overhead',
    difficulty: 1,
    prompt: 'Eine 100-Mbit/s-Verbindung hat **8 %** Protokoll-Overhead. Wie hoch ist die **Nutzdatenrate**?',
    answer: 92,
    unit: 'Mbit/s',
    explanation: 'Nutzdatenrate = Bruttorate · (1 − Overhead) = 100 Mbit/s · 0,92 = **92 Mbit/s**.',
  },
  {
    id: 'm15-q028',
    kind: 'number',
    skill: 'calc.overhead',
    difficulty: 2,
    prompt:
      'Das Vollbackup von Elektro Krämer (**500 GB**) läuft über eine **250-Mbit/s**-Leitung mit **10 %** Overhead. Wie viele **Stunden** dauert es? (2 Nachkommastellen)',
    answer: 4.94,
    tolerance: 0.01,
    unit: 'h',
    explanation:
      '1. Nutzdatenrate: 250 Mbit/s · 0,9 = 225 Mbit/s\n2. Datenmenge: 500 GB = 500.000 MB · 8 = 4.000.000 Mbit\n3. Zeit: 4.000.000 ÷ 225 = 17.777,8 s\n4. ÷ 3.600 = **4,94 h** (≈ 4 h 56 min)',
    hints: ['Erst die Nutzdatenrate bestimmen.', 'Dann t = D ÷ r'],
  },
  {
    id: 'm15-q029',
    kind: 'number',
    skill: 'calc.overhead',
    difficulty: 2,
    prompt:
      'Die tägliche Änderungsmenge von **45 GB** soll über **100 Mbit/s** Upload zur Filiale repliziert werden. Overhead inkl. VPN: **20 %**. Wie viele **Minuten** dauert das?',
    answer: 75,
    unit: 'min',
    explanation:
      '1. Nutzdatenrate: 100 · 0,8 = 80 Mbit/s\n2. 45 GB = 45.000 MB · 8 = 360.000 Mbit\n3. 360.000 ÷ 80 = 4.500 s\n4. ÷ 60 = **75 min**',
  },
  {
    id: 'm15-q030',
    kind: 'single',
    skill: 'calc.overhead',
    difficulty: 1,
    prompt: 'Was ist der Unterschied zwischen **Bandbreite** (Brutto-Datenrate) und **Durchsatz**?',
    options: [
      'Es gibt keinen Unterschied.',
      'Die Bandbreite ist die theoretisch maximale Datenrate des Mediums, der Durchsatz die tatsächlich erreichte Nutzdatenrate.',
      'Der Durchsatz ist immer höher als die Bandbreite.',
      'Die Bandbreite wird in Byte, der Durchsatz in Bit gemessen.',
    ],
    answer: 1,
    distractors: {
      '0': { why: 'Umgangssprachlich oft gleich verwendet, fachlich aber verschieden.', error: 'begriffe' },
      '2': { why: 'Der Durchsatz kann die Brutto-Datenrate nie übersteigen.', error: 'begriffe' },
      '3': { why: 'Beide können in bit/s oder Byte/s angegeben werden – das ist keine Definitionsfrage.', error: 'begriffe' },
    },
    explanation:
      '**Bandbreite/Bruttorate** = was die Leitung maximal kann (z. B. 1 Gbit/s). **Durchsatz** = was tatsächlich an Nutzdaten ankommt – abzüglich Overhead (Header, Bestätigungen, Pausen), Kollisionen/Funkstörungen (WLAN), Engpässen (Server, Festplatte) und geteilter Nutzung.',
  },
  {
    id: 'm15-q031',
    kind: 'number',
    skill: 'calc.overhead',
    difficulty: 3,
    prompt:
      'Ein Ethernet-Frame mit maximaler Größe belegt auf der Leitung **1.538 Byte** (inkl. Präambel, Header, FCS, Interframe Gap). Darin stecken **1.460 Byte** TCP-Nutzdaten. Wie groß ist der **Nutzdatenanteil in %**? (2 Nachkommastellen)',
    answer: 94.93,
    tolerance: 0.05,
    unit: '%',
    explanation:
      '1.460 ÷ 1.538 = 0,9493 → **94,93 %**. Overhead also ≈ 5,07 %.\n\nAufschlüsselung: 8 Präambel/SFD + 14 Ethernet-Header + 20 IPv4 + 20 TCP + 1.460 Daten + 4 FCS + 12 Interframe Gap = 1.538 Byte.\n\nFolge: Gigabit-Ethernet liefert maximal ca. 949 Mbit/s ≈ 118,7 MB/s TCP-Nutzdaten.',
    hints: ['Nutzdaten ÷ Gesamtgröße · 100'],
  },
  {
    id: 'm15-q032',
    kind: 'multi',
    skill: 'calc.overhead',
    difficulty: 2,
    prompt:
      'Ein Mitarbeiter kopiert über Gigabit-LAN eine Datei vom NAS und erreicht nur **40 MB/s**. Welche Ursachen kommen in Frage?',
    options: [
      'Die Festplatte im NAS liest nicht schneller (Engpass Speicher).',
      'Viele kleine Dateien statt einer großen erzeugen viel Verwaltungsaufwand.',
      'Ein Teilstück der Strecke ist nur mit 100 Mbit/s angebunden.',
      'Gigabit-Ethernet schafft wegen Binärpräfixen nur 40 MB/s.',
      'Andere Nutzer teilen sich gleichzeitig die Leitung zum NAS.',
    ],
    answer: [0, 1, 4],
    explanation:
      'Bei 100 Mbit/s wären max. **12,5 MB/s** möglich – 40 MB/s schließt das aus. Gigabit schafft theoretisch 125 MB/s, praktisch ~110–118 MB/s. 40 MB/s deuten auf einen **anderen Engpass** hin: langsamer Datenträger, viele kleine Dateien, geteilte Bandbreite, CPU des NAS usw. Der Durchsatz wird immer vom **schwächsten Glied** der Kette bestimmt.',
  },
  {
    id: 'm15-q033',
    kind: 'number',
    skill: 'calc.overhead',
    difficulty: 2,
    prompt:
      'Über einen Gigabit-Link wird **1 GB** in **10 Sekunden** übertragen. Wie hoch ist die **Auslastung** des Links (Durchsatz im Verhältnis zur Bruttorate) in %?',
    answer: 80,
    unit: '%',
    explanation:
      '1. Durchsatz: 1 GB = 8.000 Mbit ÷ 10 s = 800 Mbit/s\n2. Auslastung: 800 ÷ 1.000 · 100 = **80 %**',
  },

  /* ---------------------------------------------------------------- */
  /* calc.latency                                                      */
  /* ---------------------------------------------------------------- */
  {
    id: 'm15-q034',
    kind: 'number',
    skill: 'calc.latency',
    difficulty: 2,
    prompt:
      'Zwischen Zentrale und Filiale liegen **1.000 km** Glasfaser. Das Signal breitet sich mit ca. **200.000 km/s** aus. Wie groß ist die reine **Ausbreitungsverzögerung** (eine Richtung) in **ms**?',
    answer: 5,
    unit: 'ms',
    explanation:
      't = Strecke ÷ Geschwindigkeit = 1.000 km ÷ 200.000 km/s = 0,005 s = **5 ms**. Die Round-Trip-Time (hin und zurück) wäre mindestens 10 ms – plus Verarbeitung in Routern.',
    hints: ['Licht in Glasfaser: ca. 2/3 der Lichtgeschwindigkeit.'],
  },
  {
    id: 'm15-q035',
    kind: 'number',
    skill: 'calc.latency',
    difficulty: 3,
    prompt: 'Wie lange (in **µs**) dauert es, einen **1.500-Byte**-Frame bei **100 Mbit/s** auf die Leitung zu legen (Serialisierungsverzögerung)?',
    answer: 120,
    unit: 'µs',
    explanation: '1.500 Byte · 8 = 12.000 bit. 12.000 bit ÷ 100.000.000 bit/s = 0,00012 s = **120 µs**. Bei 1 Gbit/s wären es nur 12 µs.',
  },
  {
    id: 'm15-q036',
    kind: 'single',
    skill: 'calc.latency',
    difficulty: 2,
    prompt:
      'Elektro Krämer will **VoIP-Telefonie** einführen. Welche Kenngröße ist für die Sprachqualität am **kritischsten**?',
    options: [
      'Möglichst hohe Bandbreite (z. B. 1 Gbit/s)',
      'Geringe Latenz und geringer Jitter',
      'Große Festplatte im Telefonserver',
      'Hohe Anzahl an Switch-Ports',
    ],
    answer: 1,
    distractors: {
      '0': { why: 'Ein Sprachkanal braucht nur ca. 100 kbit/s (G.711 inkl. Overhead). Bandbreite ist selten der Engpass.', error: 'latenz-bandbreite' },
      '2': { why: 'Speicher betrifft z. B. Anrufaufzeichnung, nicht die Gesprächsqualität.', error: 'latenz-bandbreite' },
      '3': { why: 'Portanzahl beeinflusst die Qualität nicht.', error: 'latenz-bandbreite' },
    },
    explanation:
      'Sprache ist **echtzeitkritisch**: Hohe Verzögerung (> ca. 150 ms Ende-zu-Ende) stört das Gespräch, schwankende Laufzeit (**Jitter**) führt zu Aussetzern. Deshalb priorisiert man VoIP mit QoS.',
  },
  {
    id: 'm15-q037',
    kind: 'number',
    skill: 'calc.latency',
    difficulty: 3,
    prompt:
      'Ein Außenstandort ist per **geostationärem Satellit** angebunden (Höhe ca. **36.000 km**). Signale laufen mit ca. **300.000 km/s**. Wie groß ist die Verzögerung in **ms** für den Weg Bodenstation → Satellit → Bodenstation (eine Richtung)?',
    answer: 240,
    tolerance: 2,
    unit: 'ms',
    explanation:
      'Strecke: 2 · 36.000 km = 72.000 km. 72.000 ÷ 300.000 = 0,24 s = **240 ms**. Eine Anfrage mit Antwort (RTT) braucht damit schon rund 480 ms – unabhängig von der Bandbreite!',
  },
  {
    id: 'm15-q038',
    kind: 'match',
    skill: 'calc.latency',
    difficulty: 1,
    prompt: 'Ordne die Begriffe den Beschreibungen zu.',
    left: ['Latenz', 'Round Trip Time (RTT)', 'Jitter', 'Paketverlust', 'Durchsatz'],
    right: [
      'Schwankung der Laufzeit aufeinanderfolgender Pakete',
      'Verzögerung eines Pakets vom Sender zum Empfänger',
      'tatsächlich übertragene Nutzdaten pro Zeit',
      'Zeit für Hin- und Rückweg, z. B. von ping angezeigt',
      'Anteil der Pakete, die nicht ankommen',
    ],
    answer: [1, 3, 0, 4, 2],
    explanation:
      '`ping` zeigt die **RTT** (Hin + Rück). Latenz ist die einfache Verzögerung. Jitter = Schwankung der Latenz. Paketverlust in %. Durchsatz = Nutzdatenrate.',
  },
  {
    id: 'm15-q039',
    kind: 'number',
    skill: 'calc.latency',
    difficulty: 3,
    prompt:
      'Vertiefung: Das **Bandbreiten-Verzögerungs-Produkt** gibt an, wie viele Daten gleichzeitig „unterwegs“ sind. Berechne es für **100 Mbit/s** und eine RTT von **50 ms** in **kB**.',
    answer: 625,
    unit: 'kB',
    explanation:
      '100.000.000 bit/s · 0,05 s = 5.000.000 bit ÷ 8 = 625.000 Byte = **625 kB**. So viel muss ein Sender „auf Verdacht“ senden dürfen (TCP-Fenster), um die Leitung auszulasten.',
  },

  /* ---------------------------------------------------------------- */
  /* calc.storage                                                      */
  /* ---------------------------------------------------------------- */
  {
    id: 'm15-q040',
    kind: 'number',
    skill: 'calc.storage',
    difficulty: 2,
    prompt:
      'Elektro Krämer installiert **8 Überwachungskameras** mit je **4 Mbit/s**. Aufgezeichnet wird **rund um die Uhr**, die Aufnahmen werden **14 Tage** aufbewahrt. Wie viel Speicher (in **GB**, dezimal) ist nötig?',
    answer: 4838.4,
    tolerance: 0.5,
    unit: 'GB',
    explanation:
      '1. Gesamtrate: 8 · 4 Mbit/s = 32 Mbit/s\n2. Zeit: 14 · 24 · 3.600 s = 1.209.600 s\n3. Datenmenge: 32 Mbit/s · 1.209.600 s = 38.707.200 Mbit\n4. ÷ 8 = 4.838.400 MB = **4.838,4 GB** ≈ 4,84 TB',
    hints: ['Zuerst alle Kameras addieren.', 'Tage in Sekunden umrechnen.'],
  },
  {
    id: 'm15-q041',
    kind: 'number',
    skill: 'calc.storage',
    difficulty: 2,
    prompt:
      'In der Filiale zeichnen **4 Kameras** mit je **2 Mbit/s** nur während der Öffnungszeit (**10 h/Tag**) auf. Aufbewahrung: **30 Tage**. Wie viele **TB** (dezimal) werden benötigt?',
    answer: 1.08,
    tolerance: 0.005,
    unit: 'TB',
    explanation:
      '1. Gesamtrate: 4 · 2 = 8 Mbit/s\n2. Zeit: 30 · 10 · 3.600 s = 1.080.000 s\n3. 8 Mbit/s · 1.080.000 s = 8.640.000 Mbit ÷ 8 = 1.080.000 MB = **1,08 TB**',
  },
  {
    id: 'm15-q042',
    kind: 'number',
    skill: 'calc.storage',
    difficulty: 1,
    prompt: 'Wie viele **GB** erzeugt **eine** Kamera mit **4 Mbit/s** an **einem Tag** (24 h)?',
    answer: 43.2,
    tolerance: 0.05,
    unit: 'GB',
    explanation: '24 h = 86.400 s. 4 Mbit/s · 86.400 s = 345.600 Mbit ÷ 8 = 43.200 MB = **43,2 GB**.',
  },
  {
    id: 'm15-q043',
    kind: 'single',
    skill: 'calc.storage',
    difficulty: 2,
    prompt:
      'Für die Kameraanlage wurden **4,84 TB** Speicherbedarf berechnet. Welche Nettokapazität des NVR/NAS empfiehlst du?',
    options: ['4 TB', '5 TB – passt genau', '6 TB oder mehr, damit Reserve bleibt', '500 GB, weil komprimiert wird'],
    answer: 2,
    distractors: {
      '0': { why: '4 TB < 4,84 TB – die Aufbewahrungsfrist könnte nicht eingehalten werden.', error: 'speicher-zu-klein' },
      '1': { why: 'Ohne Reserve gibt es Probleme bei höherer Bitrate (Bewegung, Nacht/Rauschen), Dateisystem-Overhead und Anzeige in TiB (4,84 TB ≈ 4,4 TiB; ein „5-TB“-Laufwerk zeigt ~4,55 TiB).', error: 'keine-reserve' },
      '3': { why: 'Die angegebene Bitrate ist bereits die komprimierte Videorate.', error: 'kompression-doppelt' },
    },
    explanation:
      'Berechnete Werte sind Mindestwerte. Üblich ist eine Reserve von **20–30 %** (variable Bitrate, Dateisystem, Wachstum). 4,84 TB · 1,25 ≈ 6 TB.',
  },
  {
    id: 'm15-q044',
    kind: 'free',
    skill: 'calc.overhead',
    difficulty: 2,
    prompt:
      'Herr Krämer hat einen neuen **1-Gbit/s**-Glasfaseranschluss. Beim Download zeigt der Browser aber „nur“ **112 MB/s**. Er glaubt, der Provider betrüge ihn. Erkläre ihm nachvollziehbar (mit Rechnung), warum das ein sehr gutes Ergebnis ist.',
    modelAnswer:
      'Der Anschluss ist in Bit pro Sekunde angegeben, der Browser zeigt Byte pro Sekunde. 1 Gbit/s = 1.000 Mbit/s; geteilt durch 8 ergibt das theoretisch 125 MB/s. Davon geht Protokoll-Overhead ab (Ethernet-, IP- und TCP-Header, Präambel, Pausen zwischen Frames – zusammen rund 5–6 %), sodass maximal etwa 117–118 MB/s Nutzdaten möglich sind. 112 MB/s entsprechen 896 Mbit/s, also rund 90 % der Bruttorate. Das ist ein sehr guter Wert; zusätzlich können Server, WLAN oder andere Nutzer begrenzen. Der Provider hält seine Leistung also ein.',
    keywords: ['Bit', 'Byte', 'durch 8', '125 MB/s', 'Overhead', 'Header', '896 Mbit/s'],
    explanation:
      'Kern: Faktor 8 (Bit ↔ Byte) + Protokoll-Overhead. 112 MB/s · 8 = 896 Mbit/s ≈ 90 % Auslastung.',
  },
  {
    id: 'm15-q045',
    kind: 'free',
    skill: 'calc.transfertime',
    difficulty: 3,
    prompt:
      'Das nächtliche Backup (**500 GB**) soll künftig über das WAN (**250 Mbit/s**, **10 %** Overhead) ins Rechenzentrum laufen. Das Backup-Fenster ist **22:00–02:00 Uhr**. Prüfe rechnerisch, ob das reicht, und schlage zwei Maßnahmen vor, falls nicht.',
    modelAnswer:
      'Nutzdatenrate: 250 Mbit/s · 0,9 = 225 Mbit/s. Datenmenge: 500 GB · 8 = 4.000.000 Mbit. Zeit: 4.000.000 ÷ 225 ≈ 17.778 s ≈ 4,94 h. Das Fenster hat nur 4 h (14.400 s) – es reicht also nicht. Maßnahmen: inkrementelle oder differenzielle Sicherung statt täglichem Vollbackup (nur geänderte Daten), Deduplizierung/Kompression, Backup-Fenster verlängern, Erstsicherung lokal (Seeding per Datenträger) oder höhere WAN-Bandbreite buchen. Erforderliche Nutzrate für 4 h wäre 4.000.000 Mbit ÷ 14.400 s ≈ 278 Mbit/s netto, also mit 10 % Overhead ca. 309 Mbit/s brutto.',
    keywords: ['225 Mbit/s', '4,94 h', '4 h', 'reicht nicht', 'inkrementell', 'Kompression', 'Bandbreite erhöhen'],
    explanation:
      'Rechnung: 4,94 h > 4 h → reicht nicht. Gute Antworten nennen die Rechnung, das Ergebnis und realistische Maßnahmen (inkrementell/differenziell, Deduplizierung, mehr Bandbreite, Fenster verlängern).',
  },
];

export const m15: Module = {
  id: 'm15',
  nr: 15,
  title: 'Netzwerkberechnungen',
  short: 'Datenmengen, Präfixe (kB/KiB), Datenraten, Übertragungszeit, Overhead, Latenz und Speicherbedarf sicher berechnen.',
  icon: 'Calculator',
  relevance: 'ap1',
  prerequisites: ['m04'],
  generators: ['calc.units', 'calc.transfertime', 'calc.rate'],
  skills: [
    { id: 'calc.units', module: 'm15', title: 'Bit und Byte umrechnen' },
    { id: 'calc.prefixes', module: 'm15', title: 'Dezimal- und Binärpräfixe (kB/KiB …)', requires: ['calc.units'] },
    { id: 'calc.rate', module: 'm15', title: 'Datenraten umrechnen und berechnen', requires: ['calc.units'] },
    { id: 'calc.transfertime', module: 'm15', title: 'Übertragungszeit berechnen', requires: ['calc.units', 'calc.rate'] },
    { id: 'calc.overhead', module: 'm15', title: 'Bandbreite, Durchsatz und Overhead', requires: ['calc.transfertime'] },
    { id: 'calc.latency', module: 'm15', title: 'Latenz und Laufzeit', requires: ['calc.rate'] },
    { id: 'calc.storage', module: 'm15', title: 'Speicherbedarf berechnen', requires: ['calc.units', 'calc.rate'] },
  ],
  questions,
  lessons: [
    /* ============================================================== */
    {
      id: 'm15-l01',
      title: 'Bit, Byte und Präfixe',
      minutes: 20,
      relevance: 'ap1',
      skills: ['calc.units', 'calc.prefixes'],
      steps: [
        {
          type: 'explain',
          title: 'Bit und Byte',
          body: `Das **Bit** (Kurzzeichen **b** oder bit) ist die kleinste Informationseinheit: 0 oder 1. Acht Bit ergeben ein **Byte** (Kurzzeichen **B**).

| Umrechnung | Rechnung |
|---|---|
| Byte → Bit | **· 8** |
| Bit → Byte | **÷ 8** |

**Faustregel aus der Praxis:**
- **Datenmengen** (Dateien, Festplatten, RAM) werden in **Byte** angegeben: 4,7 GB, 16 GiB, 2 TB.
- **Datenraten** (Netzwerk, Internet) werden in **Bit pro Sekunde** angegeben: 100 Mbit/s, 1 Gbit/s.

Genau hier entstehen die meisten Prüfungsfehler: Wer 2 GB durch 100 Mbit/s teilt, ohne mit 8 zu multiplizieren, liegt um den Faktor 8 daneben.

**Schreibweise:** Klein-b = Bit, Groß-B = Byte. „Mbps“ = „Mbit/s“. „MB/s“ = Megabyte pro Sekunde = 8 · Mbit/s.`,
        },
        {
          type: 'explain',
          title: 'Dezimalpräfixe (SI) und Binärpräfixe (IEC)',
          body: `Für große Zahlen nutzt man Präfixe. Davon gibt es **zwei Familien**:

| Dezimal (SI) | Faktor | Binär (IEC) | Faktor | Abweichung |
|---|---|---|---|---|
| kB (Kilobyte) | 10³ = 1.000 | KiB (Kibibyte) | 2¹⁰ = 1.024 | 2,4 % |
| MB (Megabyte) | 10⁶ = 1.000.000 | MiB (Mebibyte) | 2²⁰ = 1.048.576 | 4,9 % |
| GB (Gigabyte) | 10⁹ | GiB (Gibibyte) | 2³⁰ = 1.073.741.824 | 7,4 % |
| TB (Terabyte) | 10¹² | TiB (Tebibyte) | 2⁴⁰ | 10,0 % |

Die **Binärpräfixe** (mit „i“) wurden 1998 von der IEC eingeführt (heute IEC 80000-13), weil „Kilo“ = 1000 im SI-System festgelegt ist und die frühere Doppelbedeutung (1 KB = 1024 Byte) zu Missverständnissen führte.

**Wer rechnet wie?**
- **Festplatten-/SSD-Hersteller:** dezimal (1 TB = 10¹² Byte)
- **Windows-Explorer:** binär, beschriftet aber mit „KB/MB/GB“ (daher zeigt eine 1-TB-SSD „931 GB“)
- **macOS, viele Linux-Tools:** dezimal bzw. korrekt mit KiB/MiB
- **RAM:** technisch immer binär (16 GB RAM = eigentlich 16 GiB)
- **Datenraten:** **immer dezimal** (1 Mbit/s = 1.000.000 bit/s)

**Prüfungskonvention:** Die **Aufgabenstellung entscheidet**. Steht dort „1 KB = 1024 Byte“ oder werden KiB/MiB verwendet → binär rechnen. Steht nichts dabei → nach SI **dezimal** rechnen und den gewählten Weg im Lösungsweg kurz dokumentieren („Annahme: 1 GB = 10⁹ Byte“). So bekommst du die Punkte in jedem Fall.`,
        },
        {
          type: 'visual',
          title: 'Die zwei Präfix-Welten',
          widget: {
            kind: 'cards',
            data: {
              columns: 2,
              items: [
                { title: 'Dezimal (SI): k, M, G, T', text: 'Faktor 1000 pro Stufe. Festplattenhersteller, Datenraten, macOS. 1 GB = 1.000.000.000 Byte.', icon: 'Hash' },
                { title: 'Binär (IEC): Ki, Mi, Gi, Ti', text: 'Faktor 1024 pro Stufe. RAM, Windows-Anzeige (als „GB“ beschriftet). 1 GiB = 1.073.741.824 Byte.', icon: 'Binary' },
                { title: 'Byte → Bit: · 8', text: 'Datenmengen in Byte, Datenraten in Bit/s. Vor dem Dividieren immer angleichen!', icon: 'ArrowRightLeft' },
                { title: 'Aufgabe entscheidet', text: 'Steht 1024 in der Aufgabe → binär. Sonst dezimal und Annahme notieren.', icon: 'FileText' },
              ],
            },
          },
          caption: 'Je größer die Einheit, desto größer die Abweichung: Bei TB/TiB sind es schon 10 %.',
        },
        {
          type: 'example',
          title: 'Herstellerangabe in Windows-Anzeige umrechnen',
          problem: 'Elektro Krämer kauft eine NAS-Festplatte mit **4 TB**. Welche Größe zeigt Windows an (in „GB“, also eigentlich GiB, und in TiB)?',
          steps: [
            { label: 'In Byte umrechnen', body: '4 TB = 4 · 10¹² Byte = 4.000.000.000.000 Byte' },
            { label: 'In GiB umrechnen', body: '÷ 2³⁰ (1.073.741.824) = 3.725,29 GiB → Windows zeigt „3.725 GB“' },
            { label: 'In TiB umrechnen', body: '÷ 2⁴⁰ (1.099.511.627.776) = 3,64 TiB → Windows zeigt „3,63 TB“ (abgerundet)' },
            { label: 'Ergebnis deuten', body: 'Es fehlt nichts – nur die Einheit ist anders. Unterschied: ca. 9 %.' },
          ],
          result: '4 TB ≈ **3.725 GiB** ≈ **3,64 TiB**.',
        },
        {
          type: 'example',
          title: 'Datenmengen umrechnen',
          problem: 'Rechne **3 MB** in kbit und **700 MiB** in Bit um.',
          steps: [
            { label: '3 MB → Byte', body: '3 · 1.000.000 = 3.000.000 Byte' },
            { label: '→ Bit', body: '3.000.000 · 8 = 24.000.000 bit' },
            { label: '→ kbit', body: '24.000.000 ÷ 1.000 = **24.000 kbit**' },
            { label: '700 MiB → Byte', body: '700 · 1.048.576 = 734.003.200 Byte' },
            { label: '→ Bit', body: '734.003.200 · 8 = **5.872.025.600 bit**' },
          ],
          result: '3 MB = 24.000 kbit; 700 MiB = 5.872.025.600 bit.',
        },
        {
          type: 'check',
          question: {
            id: 'm15-c01',
            kind: 'number',
            skill: 'calc.units',
            difficulty: 1,
            prompt: 'Wie viele **Mbit** sind **2 GB**? (dezimal)',
            answer: 16000,
            unit: 'Mbit',
            explanation: '2 GB = 2.000 MB · 8 = **16.000 Mbit**.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'm15-c02',
            kind: 'single',
            skill: 'calc.prefixes',
            difficulty: 1,
            prompt: 'Welche Angabe ist **größer**: 1 GB oder 1 GiB?',
            options: ['1 GB', '1 GiB', 'Beide sind gleich'],
            answer: 1,
            distractors: {
              '0': { why: '1 GB = 10⁹ = 1.000.000.000 Byte – weniger als 2³⁰.', error: 'praefix-vergleich' },
              '2': { why: 'Genau das ist der Unterschied zwischen SI- und IEC-Präfixen.', error: 'praefix-vergleich' },
            },
            explanation: '1 GiB = 1.073.741.824 Byte > 1 GB = 1.000.000.000 Byte (≈ 7,4 % mehr).',
          },
        },
        {
          type: 'practice',
          title: 'Einheiten umrechnen',
          generator: 'calc.units',
          count: 6,
          difficulty: 1,
        },
        {
          type: 'practice',
          title: 'Präfixe – Pool-Aufgaben',
          questionIds: ['m15-q001', 'm15-q002', 'm15-q003', 'm15-q004', 'm15-q005', 'm15-q006', 'm15-q007', 'm15-q009', 'm15-q010'],
          count: 7,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            '1 Byte = 8 Bit. Datenmengen in Byte (B), Datenraten in Bit pro Sekunde (bit/s).',
            'SI: k = 10³, M = 10⁶, G = 10⁹, T = 10¹². IEC: Ki = 2¹⁰, Mi = 2²⁰, Gi = 2³⁰, Ti = 2⁴⁰.',
            'Hersteller rechnen dezimal, Windows binär (mit „GB“ beschriftet) → 1 TB erscheint als 931 GB.',
            'Datenraten sind immer dezimal. Bei Datenmengen entscheidet die Aufgabenstellung; ohne Angabe dezimal rechnen und Annahme notieren.',
          ],
        },
      ],
    },

    /* ============================================================== */
    {
      id: 'm15-l02',
      title: 'Datenraten verstehen und umrechnen',
      minutes: 20,
      relevance: 'ap1',
      skills: ['calc.rate'],
      steps: [
        {
          type: 'explain',
          title: 'Was ist eine Datenrate?',
          body: `Die **Datenrate** (auch Übertragungsrate, Bitrate) gibt an, wie viele Bit pro Sekunde übertragen werden:

**r = D ÷ t** (Datenrate = Datenmenge ÷ Zeit)

| Einheit | Wert | Typisches Beispiel |
|---|---|---|
| kbit/s | 1.000 bit/s | ISDN-Kanal 64 kbit/s, VoIP-Gespräch ≈ 100 kbit/s |
| Mbit/s | 1.000.000 bit/s | Fast Ethernet 100 Mbit/s, DSL 50–250 Mbit/s |
| Gbit/s | 10⁹ bit/s | Gigabit-Ethernet 1 Gbit/s, Glasfaser-Internet |
| | | 2,5 / 5 / 10 Gbit/s (Multi-Gig, Server, Uplinks) |

**Merke:** Datenraten verwenden **nie** Binärpräfixe. 1 Gbit/s ist exakt 1.000.000.000 bit/s.

**Umrechnung Bit/s ↔ Byte/s:** Download-Programme zeigen meist **MB/s** an, Provider werben mit **Mbit/s**:

| Mbit/s (Leitung) | ÷ 8 | MB/s (Anzeige, theoretisch) |
|---|---|---|
| 16 | | 2 |
| 100 | | 12,5 |
| 250 | | 31,25 |
| 1.000 | | 125 |

Die **Formel umstellen** kannst du in alle Richtungen:
- Datenrate: r = D ÷ t
- Zeit: t = D ÷ r
- Datenmenge: D = r · t

Wichtig ist nur, dass die Einheiten zusammenpassen: **Bit mit bit/s, Sekunden mit Sekunden**.`,
        },
        {
          type: 'visual',
          title: 'Das Formeldreieck',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'D = r · t', text: 'Datenmenge: Wie viel passt in eine Zeitspanne? (z. B. Kamera pro Tag)', icon: 'Database' },
                { title: 'r = D ÷ t', text: 'Datenrate: Wie schnell war/muss die Übertragung sein? (z. B. Backup-Fenster)', icon: 'Gauge' },
                { title: 't = D ÷ r', text: 'Übertragungszeit: Wie lange dauert es? (z. B. ISO-Download)', icon: 'Timer' },
              ],
            },
          },
          caption: 'Wie beim Ohmschen Gesetz: Zwei Größen bekannt → die dritte berechnen. Einheiten vorher angleichen!',
        },
        {
          type: 'example',
          title: 'Benötigte Datenrate für ein Backup-Fenster',
          problem: 'Die Datensicherung von Elektro Krämer (**30 GB**) soll in **1 Stunde** ins Rechenzentrum übertragen werden. Welche Datenrate ist mindestens nötig?',
          steps: [
            { label: 'Gegeben', body: 'D = 30 GB, t = 1 h. Gesucht r in Mbit/s.' },
            { label: 'Datenmenge in Mbit', body: '30 GB = 30.000 MB; · 8 = 240.000 Mbit' },
            { label: 'Zeit in Sekunden', body: '1 h = 60 · 60 = 3.600 s' },
            { label: 'Dividieren', body: 'r = 240.000 Mbit ÷ 3.600 s = 66,67 Mbit/s' },
            { label: 'Plausibilität', body: 'Gängige Anschlüsse: 50, 100, 250 Mbit/s → mit Reserve mind. 100 Mbit/s Upload buchen.' },
          ],
          result: 'Mindestens **66,67 Mbit/s** netto, in der Praxis ein Anschluss mit ≥ 100 Mbit/s Upload.',
        },
        {
          type: 'check',
          question: {
            id: 'm15-c03',
            kind: 'number',
            skill: 'calc.rate',
            difficulty: 1,
            prompt: 'Wie viele **MB/s** entsprechen **250 Mbit/s** theoretisch? (2 Nachkommastellen)',
            answer: 31.25,
            tolerance: 0.01,
            unit: 'MB/s',
            explanation: '250 ÷ 8 = **31,25 MB/s**.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'm15-c04',
            kind: 'number',
            skill: 'calc.rate',
            difficulty: 2,
            prompt: 'Eine 1,2-GB-Datei wurde in 12 s kopiert. Welche Datenrate in **Mbit/s**?',
            answer: 800,
            unit: 'Mbit/s',
            explanation: '1,2 GB = 1.200 MB · 8 = 9.600 Mbit ÷ 12 s = **800 Mbit/s**.',
          },
        },
        {
          type: 'practice',
          title: 'Datenraten üben',
          generator: 'calc.rate',
          count: 6,
          difficulty: 2,
        },
        {
          type: 'practice',
          title: 'Datenraten – Pool-Aufgaben',
          questionIds: ['m15-q012', 'm15-q013', 'm15-q014', 'm15-q015', 'm15-q016', 'm15-q017'],
          count: 6,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Datenrate r = Datenmenge ÷ Zeit, angegeben in bit/s, kbit/s, Mbit/s, Gbit/s – immer dezimal.',
            'Mbit/s ÷ 8 = MB/s (z. B. 100 Mbit/s = 12,5 MB/s, 1 Gbit/s = 125 MB/s).',
            'Formel umstellen: D = r · t, t = D ÷ r. Einheiten vorher angleichen (Bit/Bit, Sekunden).',
            'Benötigte Datenraten immer mit Reserve auf reale Anschlussgrößen aufrunden.',
          ],
        },
      ],
    },

    /* ============================================================== */
    {
      id: 'm15-l03',
      title: 'Übertragungszeit berechnen',
      minutes: 25,
      relevance: 'ap1',
      skills: ['calc.transfertime'],
      steps: [
        {
          type: 'explain',
          title: 'Die Formel und das Schema',
          body: `Die Übertragungszeit ist der Prüfungsklassiker:

**t = Datenmenge ÷ Datenrate**

Die Formel ist trivial – die Punkte gibt es für die **Einheiten**. Arbeite deshalb immer nach demselben Schema:

1. **Gegeben/Gesucht** notieren. Dezimal oder binär? (Aufgabentext lesen!)
2. **Datenmenge** in **Bit** (oder Mbit) umrechnen: · 8 nicht vergessen.
3. **Datenrate** in dieselbe Einheit bringen (Mbit/s oder bit/s).
4. Ggf. **Overhead** abziehen → Nutzdatenrate (Lektion 4).
5. **Dividieren**: Ergebnis in Sekunden.
6. In **sinnvolle Einheit** umrechnen (min, h) und **Plausibilität** prüfen.

**Zeit umrechnen:**
| | |
|---|---|
| 1 min | 60 s |
| 1 h | 3.600 s |
| 1 Tag | 86.400 s |

Beispiel: 17.778 s ÷ 3.600 = 4,938 h → 4 h + 0,938 · 60 min = 4 h 56,3 min → **4 h 56 min 18 s**.

**Tipp:** Schreib bei jedem Zwischenschritt die **Einheit** dazu. „2.000 MB ÷ 100 Mbit/s“ – da sieht man sofort, dass B und bit nicht zusammenpassen.`,
        },
        {
          type: 'example',
          title: 'Klassiker: 2 GB über 100 Mbit/s',
          problem: 'Wie lange dauert die Übertragung von **2 GB** über eine **100-Mbit/s**-Verbindung (ohne Overhead)? Rechne (a) mit Dezimalpräfixen und (b) mit 1 GB = 1024³ Byte.',
          steps: [
            { label: '(a) Datenmenge in Mbit', body: '2 GB = 2.000 MB → · 8 = **16.000 Mbit**' },
            { label: '(a) Dividieren', body: '16.000 Mbit ÷ 100 Mbit/s = **160 s** = 2 min 40 s' },
            { label: '(b) Datenmenge in Byte', body: '2 · 1.073.741.824 = 2.147.483.648 Byte' },
            { label: '(b) In Bit', body: '2.147.483.648 · 8 = 17.179.869.184 bit' },
            { label: '(b) Datenrate in bit/s', body: '100 Mbit/s = 100.000.000 bit/s (dezimal!)' },
            { label: '(b) Dividieren', body: '17.179.869.184 ÷ 100.000.000 = **171,8 s** ≈ 2 min 52 s' },
          ],
          result: '(a) **160 s** (Standard, SI) – (b) **171,8 s**, wenn die Aufgabe 1024er-Präfixe vorgibt. Die Datenrate bleibt in beiden Fällen dezimal.',
        },
        {
          type: 'example',
          title: 'Cloud-Upload mit asymmetrischem Anschluss',
          problem: 'Elektro Krämer hat einen Kabelanschluss mit **250 Mbit/s Download / 40 Mbit/s Upload**. Wie lange dauert der Upload von **120 GB** Projektdaten in die Cloud?',
          steps: [
            { label: 'Richtige Rate wählen', body: 'Hochladen → **Upload**-Rate 40 Mbit/s (nicht 250!)' },
            { label: 'Datenmenge', body: '120 GB = 120.000 MB · 8 = 960.000 Mbit' },
            { label: 'Zeit', body: '960.000 Mbit ÷ 40 Mbit/s = 24.000 s' },
            { label: 'Umrechnen', body: '24.000 ÷ 3.600 = 6,67 h → 6 h + 0,67 · 60 = 6 h 40 min' },
          ],
          result: '**24.000 s = 6 h 40 min**. Empfehlung: Upload über Nacht oder am Wochenende einplanen.',
        },
        {
          type: 'check',
          question: {
            id: 'm15-c05',
            kind: 'number',
            skill: 'calc.transfertime',
            difficulty: 1,
            prompt: 'Wie viele Sekunden dauert die Übertragung von **500 MB** über **50 Mbit/s**?',
            answer: 80,
            unit: 's',
            explanation: '500 MB · 8 = 4.000 Mbit ÷ 50 Mbit/s = **80 s**.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'm15-c06',
            kind: 'number',
            skill: 'calc.transfertime',
            difficulty: 2,
            prompt: 'Wie viele **Minuten** dauert die Übertragung von **9 GB** über **100 Mbit/s**?',
            answer: 12,
            unit: 'min',
            explanation: '9 GB = 9.000 MB · 8 = 72.000 Mbit ÷ 100 = 720 s ÷ 60 = **12 min**.',
          },
        },
        {
          type: 'practice',
          title: 'Übertragungszeiten berechnen',
          generator: 'calc.transfertime',
          count: 6,
          difficulty: 2,
        },
        {
          type: 'practice',
          title: 'Übertragungszeit – Prüfungsaufgaben',
          questionIds: ['m15-q018', 'm15-q019', 'm15-q020', 'm15-q021', 'm15-q022', 'm15-q023', 'm15-q024', 'm15-q025', 'm15-q026'],
          count: 7,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            't = Datenmenge ÷ Datenrate. Vorher Datenmenge in Bit umrechnen (· 8).',
            'Schema: Gegeben/Gesucht → in Bit → Rate angleichen → ggf. Overhead → teilen → Zeit umrechnen → Plausibilität.',
            '2 GB über 100 Mbit/s = 160 s (SI); mit 1024er-Präfix 171,8 s – die Aufgabe entscheidet.',
            'Beim Hochladen zählt die Upload-Rate (bei DSL/Kabel oft viel kleiner).',
            'Einheiten bei jedem Zwischenschritt mitschreiben.',
          ],
        },
      ],
    },

    /* ============================================================== */
    {
      id: 'm15-l04',
      title: 'Bandbreite, Durchsatz und Overhead',
      minutes: 25,
      relevance: 'ap1',
      skills: ['calc.overhead'],
      steps: [
        {
          type: 'explain',
          title: 'Warum nie die volle Datenrate ankommt',
          body: `Die auf dem Datenblatt angegebene Rate (z. B. 1 Gbit/s) ist die **Brutto-Datenrate** (umgangssprachlich „Bandbreite“). Was beim Anwender an **Nutzdaten** ankommt, ist der **Durchsatz** (Nettodatenrate). Er ist immer kleiner, weil:

1. **Protokoll-Overhead:** Jede Schicht packt eigene Steuerinformationen dazu (Kapselung, siehe OSI-Modul): Ethernet-Header und FCS, IP-Header, TCP-Header, dazu Präambel und Pausen (Interframe Gap). Bei VPN kommt noch ein Tunnel-Header dazu.
2. **Protokollablauf:** TCP-Bestätigungen, Verbindungsaufbau, Wiederholungen bei Fehlern.
3. **Medium:** WLAN teilt sich den Funkkanal mit allen Geräten (Halbduplex) – real oft nur 50 % der Brutto-Rate oder weniger.
4. **Engpässe:** Das langsamste Glied bestimmt den Durchsatz – Festplatte, Server-CPU, Uplink, Internet-Anschluss.
5. **Geteilte Nutzung:** Mehrere Nutzer teilen sich eine Leitung.

**Overhead-Rechnung:**

**Nutzdatenrate = Bruttorate · (1 − Overhead-Anteil)**

| Bruttorate | Overhead | Nutzdatenrate |
|---|---|---|
| 100 Mbit/s | 8 % | 100 · 0,92 = 92 Mbit/s |
| 250 Mbit/s | 10 % | 250 · 0,90 = 225 Mbit/s |
| 1.000 Mbit/s | 5 % | 1.000 · 0,95 = 950 Mbit/s |

**Achtung Falle:** Der Overhead wird von der **Rate** abgezogen (die Leitung transportiert weniger Nutzdaten). Alternativ kann man die **Datenmenge** erhöhen: D_brutto = D_netto ÷ (1 − Overhead). Beides liefert dasselbe Ergebnis. **Falsch** wäre: Zeit berechnen und dann 10 % aufschlagen – das ergibt bei 10 % Overhead 1,10 statt 1/0,9 = 1,111 und ist damit leicht ungenau. Wenn die Aufgabe ausdrücklich „10 % Zeitaufschlag“ sagt, rechnet man natürlich so.

**Auslastung:** Durchsatz ÷ Bruttorate · 100 %. Beispiel: 800 Mbit/s auf Gigabit = 80 %.`,
        },
        {
          type: 'visual',
          title: 'Kapselung erzeugt Overhead',
          widget: { kind: 'encapsulation' },
          caption: 'Jede Schicht fügt Header hinzu. Bei einem vollen Ethernet-Frame tragen 1.460 von 1.538 Byte auf der Leitung echte Nutzdaten – ca. 95 %.',
        },
        {
          type: 'example',
          title: 'Vollbackup über WAN mit Overhead',
          problem: 'Das Vollbackup von Elektro Krämer (**500 GB**) soll über eine **250-Mbit/s**-Leitung laufen. Der Overhead (TCP/IP + VPN) wird mit **10 %** angenommen. Wie lange dauert es?',
          steps: [
            { label: 'Nutzdatenrate', body: '250 Mbit/s · (1 − 0,10) = 250 · 0,9 = **225 Mbit/s**' },
            { label: 'Datenmenge in Mbit', body: '500 GB = 500.000 MB · 8 = **4.000.000 Mbit**' },
            { label: 'Zeit in s', body: '4.000.000 Mbit ÷ 225 Mbit/s = **17.777,8 s**' },
            { label: 'In Stunden', body: '17.777,8 ÷ 3.600 = 4,938 h' },
            { label: 'In h/min/s', body: '0,938 h · 60 = 56,3 min → 0,3 min · 60 ≈ 18 s → **4 h 56 min 18 s**' },
          ],
          result: 'Ca. **4,94 h** (4 h 56 min). Ohne Overhead wären es 4,44 h – der Overhead kostet hier rund eine halbe Stunde.',
        },
        {
          type: 'example',
          title: 'Ethernet-Effizienz genau berechnet',
          problem: 'Wie viele Nutzdaten (TCP-Payload) transportiert Gigabit-Ethernet maximal, wenn volle Frames gesendet werden?',
          steps: [
            { label: 'Frame auf der Leitung', body: 'Präambel+SFD 8 B + Ethernet-Header 14 B + IP-Header 20 B + TCP-Header 20 B + Nutzdaten 1.460 B + FCS 4 B + Interframe Gap 12 B = **1.538 B**' },
            { label: 'Effizienz', body: '1.460 ÷ 1.538 = 0,9493 = **94,93 %**' },
            { label: 'Nutzdatenrate', body: '1.000 Mbit/s · 0,9493 = **949,3 Mbit/s**' },
            { label: 'In MB/s', body: '949,3 ÷ 8 = **118,7 MB/s**' },
          ],
          result: 'Maximal ca. **949 Mbit/s ≈ 118,7 MB/s** Nutzdaten – deshalb zeigt ein Kopiervorgang im Gigabit-LAN realistisch 110–118 MB/s.',
        },
        {
          type: 'check',
          question: {
            id: 'm15-c07',
            kind: 'number',
            skill: 'calc.overhead',
            difficulty: 1,
            prompt: 'Bruttorate **50 Mbit/s**, Overhead **6 %**. Wie hoch ist die Nutzdatenrate in Mbit/s?',
            answer: 47,
            unit: 'Mbit/s',
            explanation: '50 · 0,94 = **47 Mbit/s**.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'm15-c08',
            kind: 'single',
            skill: 'calc.overhead',
            difficulty: 2,
            prompt: 'Ein Notebook ist per WLAN (Brutto 867 Mbit/s) verbunden und erreicht beim Kopieren nur ca. 400 Mbit/s. Wie ist das einzuordnen?',
            options: [
              'Der Access Point ist defekt.',
              'Normal: WLAN ist ein geteiltes Halbduplex-Medium mit viel Protokoll-Overhead; 40–60 % der Bruttorate sind realistisch.',
              'Das Notebook rechnet mit Binärpräfixen.',
            ],
            answer: 1,
            distractors: {
              '0': { why: 'Ein Durchsatz von etwa der Hälfte der Bruttorate ist bei WLAN üblich – kein Hinweis auf einen Defekt.', error: 'wlan-durchsatz' },
              '2': { why: 'Binärpräfixe erklären höchstens ein paar Prozent, nicht 50 %.', error: 'praefix-ursache' },
            },
            explanation: 'Die WLAN-Bruttorate ist die maximale PHY-Rate. Durch Halbduplex, Bestätigungen, Kanalzugriff und Funkbedingungen liegt der Netto-Durchsatz typisch bei rund der Hälfte.',
          },
        },
        {
          type: 'practice',
          title: 'Overhead und Durchsatz – Prüfungsaufgaben',
          questionIds: ['m15-q027', 'm15-q028', 'm15-q029', 'm15-q030', 'm15-q031', 'm15-q032', 'm15-q033', 'm15-q044'],
          count: 7,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Bruttorate („Bandbreite“) = maximale Leitungsrate; Durchsatz = tatsächliche Nutzdatenrate.',
            'Nutzdatenrate = Bruttorate · (1 − Overhead). Erst Rate reduzieren, dann t = D ÷ r.',
            'Ursachen für geringeren Durchsatz: Protokoll-Overhead, Bestätigungen, WLAN-Halbduplex, Engpässe, geteilte Leitung.',
            'Gigabit-Ethernet: max. ca. 949 Mbit/s ≈ 118 MB/s TCP-Nutzdaten (≈ 95 % Effizienz).',
            'Auslastung = Durchsatz ÷ Bruttorate · 100 %.',
          ],
        },
      ],
    },

    /* ============================================================== */
    {
      id: 'm15-l05',
      title: 'Latenz und Laufzeit',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['calc.latency'],
      steps: [
        {
          type: 'explain',
          title: 'Datenrate ist nicht alles',
          body: `Stell dir eine Autobahn vor: Die **Datenrate** ist die Anzahl der Spuren (wie viele Autos pro Sekunde durchpassen). Die **Latenz** ist die Fahrzeit von A nach B. Eine breitere Autobahn bringt dich nicht schneller ans Ziel, wenn die Strecke lang ist.

**Bestandteile der Latenz (Verzögerung):**

| Anteil | Ursache | Formel / Größenordnung |
|---|---|---|
| **Ausbreitungsverzögerung** | Signal braucht Zeit für die Strecke | t = Strecke ÷ Ausbreitungsgeschwindigkeit; Glasfaser/Kupfer ≈ 200.000 km/s (≈ 2/3 Lichtgeschwindigkeit) → **5 µs pro km** |
| **Serialisierungsverzögerung** | Bits nacheinander auf die Leitung legen | t = Framegröße in Bit ÷ Datenrate; 1.500 B bei 100 Mbit/s = 120 µs |
| **Verarbeitung** | Router/Switch/Firewall prüfen und leiten weiter | µs bis ms |
| **Warteschlange** | Puffer bei Überlast | stark schwankend → **Jitter** |

**Wichtige Begriffe:**
- **Latenz:** Verzögerung in eine Richtung.
- **RTT (Round Trip Time):** Hin- und Rückweg – das zeigt \`ping\` an.
- **Jitter:** Schwankung der Latenz. Kritisch für VoIP und Video.
- **Paketverlust:** Anteil verlorener Pakete in %.

**Wer braucht was?**
| Anwendung | Wichtig |
|---|---|
| Backup, Download | hohe Datenrate |
| VoIP, Videokonferenz | niedrige Latenz (< 150 ms Ende-zu-Ende), wenig Jitter |
| Remotedesktop, Online-Spiele | niedrige Latenz |

Satellitenanbindungen (geostationär, ca. 36.000 km Höhe) haben allein durch die Strecke rund 240 ms pro Richtung – egal wie hoch die Datenrate ist. Erdnahe Satelliten (LEO, ca. 550 km) erreichen deutlich niedrigere Latenzen.`,
        },
        {
          type: 'example',
          title: 'Latenz einer Standortverbindung abschätzen',
          problem: 'Die Zentrale von Elektro Krämer und eine Filiale sind über **1.000 km** Glasfaser verbunden (Ausbreitung ≈ 200.000 km/s). Ein Paket von **1.500 Byte** wird mit **100 Mbit/s** gesendet. Wie groß sind Ausbreitungs- und Serialisierungsverzögerung, und welche RTT zeigt `ping` mindestens?',
          steps: [
            { label: 'Ausbreitung', body: '1.000 km ÷ 200.000 km/s = 0,005 s = **5 ms**' },
            { label: 'Serialisierung', body: '1.500 B · 8 = 12.000 bit ÷ 100.000.000 bit/s = 0,00012 s = **0,12 ms**' },
            { label: 'Eine Richtung', body: '5 ms + 0,12 ms ≈ 5,12 ms (plus Verarbeitung)' },
            { label: 'RTT', body: 'Hin und zurück: ≥ 2 · 5 ms = **≥ 10 ms**' },
          ],
          result: 'Die Ausbreitung dominiert: **≈ 5 ms** pro Richtung, `ping` zeigt mindestens ca. 10 ms. Eine schnellere Leitung würde nur die 0,12 ms verkleinern.',
        },
        {
          type: 'check',
          question: {
            id: 'm15-c09',
            kind: 'single',
            skill: 'calc.latency',
            difficulty: 1,
            prompt: 'Welchen Wert zeigt der Befehl `ping` als „Zeit“ an?',
            options: ['Die Datenrate der Verbindung', 'Die Round Trip Time (Hin- und Rückweg)', 'Die Latenz nur in eine Richtung', 'Den Jitter'],
            answer: 1,
            distractors: {
              '0': { why: 'ping misst Zeiten, keine Datenraten.', error: 'ping-wert' },
              '2': { why: 'ping wartet auf die Antwort (Echo Reply) – es misst also den Hin- und Rückweg.', error: 'ping-wert' },
              '3': { why: 'Jitter kann man aus mehreren ping-Werten ableiten, angezeigt wird aber die RTT je Paket.', error: 'ping-wert' },
            },
            explanation: '`ping` sendet ICMP Echo Request und misst die Zeit bis zum Echo Reply = **RTT**.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'm15-c10',
            kind: 'number',
            skill: 'calc.latency',
            difficulty: 2,
            prompt: 'Wie viele **µs** beträgt die Serialisierungsverzögerung für **1.500 Byte** bei **1 Gbit/s**?',
            answer: 12,
            unit: 'µs',
            explanation: '12.000 bit ÷ 1.000.000.000 bit/s = 0,000012 s = **12 µs**.',
          },
        },
        {
          type: 'practice',
          title: 'Latenz – Prüfungsaufgaben',
          questionIds: ['m15-q034', 'm15-q035', 'm15-q036', 'm15-q037', 'm15-q038', 'm15-q039'],
          count: 6,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Latenz = Verzögerung (Fahrzeit), Datenrate = Kapazität (Spuren) – zwei verschiedene Dinge.',
            'Ausbreitung ≈ 200.000 km/s in Kabel/Glasfaser → 5 µs pro km; t = Strecke ÷ Geschwindigkeit.',
            'Serialisierung = Bits ÷ Datenrate (1.500 B bei 100 Mbit/s = 120 µs).',
            'ping zeigt die RTT (hin + zurück). Jitter = Schwankung der Latenz.',
            'VoIP/Video brauchen niedrige Latenz und wenig Jitter, Backups brauchen Datenrate.',
          ],
        },
      ],
    },

    /* ============================================================== */
    {
      id: 'm15-l06',
      title: 'Speicherbedarf und Praxisaufgaben',
      minutes: 30,
      relevance: 'ap1',
      skills: ['calc.storage', 'calc.transfertime', 'calc.overhead'],
      steps: [
        {
          type: 'explain',
          title: 'Speicherbedarf aus Datenraten berechnen',
          body: `Viele Praxisaufgaben drehen die Übertragungsformel um: **Wie viel Speicher erzeugt ein Datenstrom?**

**D = r · t** (Datenmenge = Datenrate · Zeit)

**Typische Anwendungsfälle:**
- **Videoüberwachung:** Kameras senden einen Datenstrom mit fester (oder durchschnittlicher) Bitrate, z. B. 4 Mbit/s bei Full HD mit H.264. Der NVR/das NAS muss die Aufnahmen für die Aufbewahrungsfrist speichern.
- **Backups über WAN:** Wie viel passt in das Backup-Fenster? Wie lange dauert die Übertragung?
- **Bilder/Dateien:** Unkomprimiertes Bild = Breite · Höhe · Farbtiefe (in Byte).

**Vorgehen Videoüberwachung:**
1. Gesamtbitrate = Anzahl Kameras · Bitrate je Kamera
2. Aufnahmezeit in Sekunden = Tage · Stunden pro Tag · 3.600
3. Datenmenge in Bit = Gesamtbitrate · Zeit
4. ÷ 8 → Byte, dann in GB/TB umrechnen
5. **Reserve** (20–30 %) aufschlagen und auf handelsübliche Größe aufrunden

**Nützliche Werte:**
| Zeitraum | Sekunden |
|---|---|
| 1 h | 3.600 |
| 1 Tag | 86.400 |
| 1 Woche | 604.800 |
| 30 Tage | 2.592.000 |

**Faustwert:** 1 Mbit/s Dauerstrom = 0,45 GB pro Stunde = **10,8 GB pro Tag**.

**Datenschutz-Hinweis (Praxis):** Bei Videoüberwachung gilt die DSGVO – Aufbewahrungsfristen sind kurz zu halten (häufig wenige Tage, Einzelfallprüfung) und Bereiche müssen gekennzeichnet sein. Die Speicherberechnung folgt der festgelegten Frist.`,
        },
        {
          type: 'visual',
          title: 'Videoüberwachung bei Elektro Krämer',
          widget: {
            kind: 'topology',
            data: {
              nodes: [
                { id: 'c1', type: 'phone', label: 'Kamera 1–4', sub: 'je 4 Mbit/s', x: 110, y: 90 },
                { id: 'c2', type: 'phone', label: 'Kamera 5–8', sub: 'je 4 Mbit/s', x: 110, y: 310 },
                { id: 'sw', type: 'switch', label: 'PoE-Switch', sub: '8 × 4 = 32 Mbit/s', x: 330, y: 200 },
                { id: 'nvr', type: 'nas', label: 'NVR / NAS', sub: '14 Tage ≈ 4,84 TB', x: 560, y: 200 },
                { id: 'rt', type: 'router', label: 'Router', sub: 'Fernzugriff per VPN', x: 560, y: 60 },
                { id: 'inet', type: 'internet', label: 'Internet', x: 740, y: 60 },
                { id: 'pc', type: 'pc', label: 'Büro-PC', sub: 'Live-Ansicht', x: 560, y: 350 },
              ],
              links: [
                { from: 'c1', to: 'sw', style: 'lan', label: 'PoE' },
                { from: 'c2', to: 'sw', style: 'lan', label: 'PoE' },
                { from: 'sw', to: 'nvr', style: 'lan', label: '32 Mbit/s' },
                { from: 'sw', to: 'pc', style: 'lan' },
                { from: 'sw', to: 'rt', style: 'lan' },
                { from: 'rt', to: 'inet', style: 'wan' },
              ],
              zones: [{ label: 'Kamera-VLAN', x: 40, y: 30, w: 400, h: 360, color: 'orange' }],
            },
          },
          caption: '8 Kameras à 4 Mbit/s erzeugen 32 Mbit/s Dauerlast – für Gigabit kein Problem, aber über 14 Tage fast 5 TB Speicher.',
        },
        {
          type: 'example',
          title: 'Speicher für die Kameraanlage',
          problem: 'Elektro Krämer installiert **8 Kameras** mit je **4 Mbit/s**, Aufzeichnung **24/7**, Aufbewahrung **14 Tage**. Wie viel Speicher wird benötigt, und welche Größe empfiehlst du?',
          steps: [
            { label: 'Gesamtbitrate', body: '8 · 4 Mbit/s = **32 Mbit/s**' },
            { label: 'Zeit in Sekunden', body: '14 Tage · 86.400 s = **1.209.600 s**' },
            { label: 'Datenmenge in Mbit', body: '32 Mbit/s · 1.209.600 s = **38.707.200 Mbit**' },
            { label: 'In Byte', body: '÷ 8 = 4.838.400 MB = 4.838,4 GB = **4,84 TB**' },
            { label: 'Reserve', body: '4,84 TB · 1,25 ≈ 6,05 TB → **6 TB netto** (bzw. nächste verfügbare Größe)' },
          ],
          result: 'Rechnerisch **4,84 TB**, empfohlen **≥ 6 TB** Nettokapazität.',
        },
        {
          type: 'example',
          title: 'Passt das Backup ins Zeitfenster?',
          problem: 'Die tägliche Änderungsmenge (**45 GB**) wird inkrementell zur Filiale gesichert. Upload **100 Mbit/s**, Overhead inkl. VPN **20 %**. Das Backup-Fenster beträgt **2 Stunden**. Reicht das?',
          steps: [
            { label: 'Nutzdatenrate', body: '100 Mbit/s · 0,8 = **80 Mbit/s**' },
            { label: 'Datenmenge', body: '45 GB = 45.000 MB · 8 = **360.000 Mbit**' },
            { label: 'Zeit', body: '360.000 ÷ 80 = 4.500 s = **75 min**' },
            { label: 'Vergleich', body: '75 min < 120 min → passt, Reserve 45 min' },
          ],
          result: '**75 Minuten** – das Fenster von 2 h reicht. Ein tägliches Vollbackup (500 GB) würde dagegen über 13 h dauern.',
        },
        {
          type: 'check',
          question: {
            id: 'm15-c11',
            kind: 'number',
            skill: 'calc.storage',
            difficulty: 2,
            prompt: 'Wie viele **GB** erzeugt ein Datenstrom von **1 Mbit/s** an einem Tag (24 h)? (1 Nachkommastelle)',
            answer: 10.8,
            tolerance: 0.05,
            unit: 'GB',
            explanation: '1 Mbit/s · 86.400 s = 86.400 Mbit ÷ 8 = 10.800 MB = **10,8 GB**.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'm15-c12',
            kind: 'number',
            skill: 'calc.storage',
            difficulty: 2,
            prompt: '**2 Kameras** à **6 Mbit/s**, Aufnahme **24/7**, **7 Tage**. Speicherbedarf in **GB**? (1 Nachkommastelle)',
            answer: 907.2,
            tolerance: 0.5,
            unit: 'GB',
            explanation: '12 Mbit/s · 604.800 s = 7.257.600 Mbit ÷ 8 = 907.200 MB = **907,2 GB**.',
          },
        },
        {
          type: 'practice',
          title: 'Gemischte Praxisaufgaben',
          questionIds: ['m15-q011', 'm15-q040', 'm15-q041', 'm15-q042', 'm15-q043', 'm15-q028', 'm15-q045'],
          count: 7,
          difficulty: 2,
        },
        {
          type: 'practice',
          title: 'Zufallsaufgaben Übertragungszeit',
          generator: 'calc.transfertime',
          count: 5,
          difficulty: 3,
        },
        {
          type: 'summary',
          points: [
            'Speicherbedarf: D = r · t. Alle Ströme addieren, Zeit in Sekunden, ÷ 8 für Byte.',
            '1 Mbit/s Dauerstrom = 10,8 GB pro Tag – praktischer Faustwert.',
            'Immer Reserve einplanen (20–30 %) und auf handelsübliche Größen aufrunden.',
            'Backup-Fenster prüfen: Nutzdatenrate (mit Overhead) bestimmen, Zeit berechnen, mit Fenster vergleichen, Maßnahmen begründen.',
            'In Prüfungen: Lösungsweg mit Einheiten und Annahmen (dezimal/binär, Overhead) vollständig aufschreiben.',
          ],
        },
      ],
    },
  ],
};
