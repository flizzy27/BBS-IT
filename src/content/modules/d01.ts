import type { Module } from '../types';

/* Belege, die in mehreren Aufgaben verwendet werden */
const T_MA = `Tabelle **Mitarbeiter**:

| PersNr | Name | Abteilung | StandortID |
|---|---|---|---|
| 101 | Weber | IT | 1 |
| 102 | Yilmaz | Vertrieb | 2 |
| 103 | Schulz | Buchhaltung | 1 |
| 104 | Nowak | Vertrieb | 2 |`;

const T_GER = `Tabelle **Geraet**:

| InvNr | Typ | Hersteller | Preis | PersNr |
|---|---|---|---|---|
| G01 | Notebook | Lenovo | 1150 | 101 |
| G02 | Notebook | Dell | 980 | 102 |
| G03 | Monitor | Dell | 210 | 102 |
| G04 | Drucker | HP | 420 | NULL |
| G05 | Desktop | Lenovo | 760 | 103 |`;

const T_EXCEL = `Auszug aus der bisherigen Excel-Inventarliste:

| InvNr | Gerät | Mitarbeiter | Abteilung | Standort | Standortadresse |
|---|---|---|---|---|---|
| G01 | Notebook | Weber | IT | Hamburg | Lagerstraße 12, 20457 Hamburg |
| G02 | Notebook | Yilmaz | Vertrieb | Berlin | Friedrichstraße 88, 10117 Berlin |
| G03 | Monitor | Yilmaz | Vertrieb | Berlin | Friedrichstraße 88, 10117 Berlin |
| G05 | Desktop | Schulz | Buchhaltung | Hamburg | Lagerstraße 12, 20457 Hamburg |
| G06 | Monitor | Schulz | Buchhaltung | Hamburg | Lagerstraße 12, 20457 Hamburg |
| G07 | Notebook | Nowak | Vertrieb | Berlin | Friedrichstr. 88, 10117 Berlin |`;

export const d01: Module = {
  id: 'd01',
  nr: 1,
  area: 'daten',
  title: 'Grundlagen relationaler Datenbanken',
  short: 'Daten und Information, DBMS, Tabellen, Schlüssel, Beziehungen, Redundanz, Anomalien und Datenintegrität am Beispiel der Inventarverwaltung.',
  icon: 'Database',
  relevance: 'ap1-teilweise',
  prerequisites: [],
  generators: ['daten.kardinalitaet'],
  skills: [
    { id: 'db.grundbegriffe', module: 'd01', title: 'Daten, Information, Datenbank und DBMS' },
    { id: 'db.vergleich', module: 'd01', title: 'Datenbank vs. Tabellenkalkulation', requires: ['db.grundbegriffe'] },
    { id: 'db.tabelle', module: 'd01', title: 'Tabellen, Datensätze, Attribute und Datentypen', requires: ['db.grundbegriffe'] },
    { id: 'db.schluessel', module: 'd01', title: 'Primär- und Fremdschlüssel', requires: ['db.tabelle'] },
    { id: 'db.beziehungen', module: 'd01', title: 'Beziehungen 1:1, 1:n und n:m', requires: ['db.schluessel'] },
    { id: 'db.anomalien', module: 'd01', title: 'Redundanz und Anomalien', requires: ['db.tabelle'] },
    { id: 'db.integritaet', module: 'd01', title: 'Datenintegrität', requires: ['db.schluessel'] },
  ],
  lessons: [
    /* ------------------------------------------------------------ */
    {
      id: 'd01-l01',
      title: 'Daten, Information und Datenbanksysteme',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['db.grundbegriffe', 'db.vergleich'],
      simple: `**Daten** sind einzelne Werte wie „1290“ oder „G07“. Erst im Zusammenhang werden sie zur **Information**: „Notebook G07 hat 1.290 € gekostet.“ Eine **Datenbank** ist wie ein gut geführter Aktenschrank, und das **DBMS** (Datenbankmanagementsystem, z. B. MariaDB) ist der Archivar: Er sortiert ein, gibt heraus und passt auf, dass nur Berechtigte hineinschauen. Anders als bei einer Excel-Datei können viele Personen gleichzeitig arbeiten, ohne sich gegenseitig etwas zu überschreiben.

**Merke:** Datenbanksystem = Datenbank (die Daten) + DBMS (die Verwaltungssoftware); bei vielen Nutzern und verknüpften Daten ist es einer Tabellenkalkulation überlegen.`,
      steps: [
        {
          type: 'explain',
          title: 'Warum überhaupt eine Datenbank?',
          body: `**Handlungssituation:** Die IT-Abteilung der Elektro Krämer GmbH (Hamburg und Berlin, ca. 120 Mitarbeitende) verwaltet ihre Geräte bisher in einer Excel-Datei \`Inventar_final_v3.xlsx\`. Drei Kolleginnen und Kollegen pflegen sie parallel, es gibt mehrere Kopien, und niemand weiß genau, welche aktuell ist. Deine Ausbilderin möchte die Liste durch eine **Inventar-Datenbank** ersetzen. Bevor du mitplanst, brauchst du die Grundbegriffe.

**Daten und Information**

| Begriff | Bedeutung | Beispiel |
|---|---|---|
| **Daten** | Zeichen bzw. Werte, die nach festen Regeln (Syntax) dargestellt sind. Ohne Zusammenhang haben sie keine Aussage. | \`1290\`, \`G07\`, \`2025\` |
| **Information** | Daten, die in einem Zusammenhang (Kontext) eine Bedeutung bekommen und für jemanden nützlich sind. | „Das Notebook G07 wurde 2025 für 1.290 € angeschafft.“ |

Eine Datenbank speichert **Daten**. Zu **Informationen** werden sie, wenn du sie abfragst und interpretierst, z. B. „Welche Geräte sind älter als fünf Jahre und müssen ersetzt werden?“.

**Datenbank, DBMS und Datenbanksystem**

| Begriff | Abkürzung | Was ist das? |
|---|---|---|
| **Datenbank** | DB | Die strukturierte Sammlung zusammengehöriger Daten, z. B. alle Inventardaten. |
| **Datenbankmanagementsystem** | DBMS | Die **Software**, die die Datenbank verwaltet und den Zugriff regelt, z. B. MariaDB, MySQL, PostgreSQL, Microsoft SQL Server, Oracle Database, SQLite. |
| **Datenbanksystem** | DBS | Datenbank + DBMS zusammen. |

**Aufgaben eines DBMS**

| Aufgabe | Was heißt das? |
|---|---|
| Daten speichern und abrufen | Anwendungen fragen Daten über eine Sprache ab (meist **SQL**), nicht über Dateipfade. |
| Mehrbenutzerbetrieb | Viele Personen arbeiten gleichzeitig, das DBMS verhindert, dass sie sich gegenseitig Änderungen überschreiben (Sperren, Transaktionen). |
| Zugriffsrechte | Wer darf was lesen oder ändern? Rechte je Benutzer bzw. Rolle. |
| Integrität sichern | Regeln wie „Inventarnummer eindeutig“ oder „Preis nicht negativ“ werden technisch erzwungen. |
| Datensicherung und Wiederherstellung | Backups, Protokolle (Logs), Wiederherstellung nach Absturz. |
| Datenunabhängigkeit | Anwendungen müssen nicht wissen, wie die Daten physisch auf der Platte liegen. |

**Relationale Datenbank:** Die Daten liegen in **Tabellen** (Fachbegriff: Relationen), die über Schlüssel miteinander verknüpft sind. Das Modell geht auf Edgar F. Codd (1970) zurück und ist bis heute der Standard in Unternehmen.`,
        },
        {
          type: 'explain',
          title: 'Datenbank oder Tabellenkalkulation?',
          body: `Eine Tabellenkalkulation (Excel, LibreOffice Calc) ist für viele Aufgaben völlig ausreichend. Bei gemeinsam genutzten, wachsenden Datenbeständen stößt sie aber an Grenzen:

| Kriterium | Tabellenkalkulation | Relationale Datenbank (mit DBMS) |
|---|---|---|
| Mehrbenutzerbetrieb | eingeschränkt, Gefahr von Kopien und Konflikten | viele gleichzeitige Zugriffe, Sperren und Transaktionen |
| Redundanz | Daten werden oft mehrfach eingetragen (z. B. Standortadresse in jeder Zeile) | Daten werden einmal gespeichert und über Schlüssel verknüpft |
| Integrität | kaum erzwingbar (Tippfehler, doppelte Nummern möglich) | Primärschlüssel, Fremdschlüssel, Datentypen, Prüfregeln |
| Zugriffsrechte | meist nur „Datei lesen/schreiben“ | fein steuerbar je Tabelle, Spalte, Rolle |
| Datenmenge | für kleine bis mittlere Listen | sehr große Datenmengen, Indizes für schnelle Suche |
| Auswertung | Formeln, Diagramme, Pivot-Tabellen – gut für Einzelanalysen | Abfragen mit SQL, Anbindung an Anwendungen (Web, ERP, Ticketsystem) |
| Einstieg | sofort nutzbar, kaum Vorwissen | Planung (Datenmodell) und Betrieb (Server, Backup) nötig |

**Faustregel für die Beratung:** Kleine Einzelplatz-Liste, eine Person pflegt sie, kaum Verknüpfungen → Tabellenkalkulation genügt. Mehrere Nutzer, viele verknüpfte Daten (Geräte, Mitarbeitende, Standorte), Anbindung an Anwendungen, hohe Anforderungen an Korrektheit → Datenbank.

**Prüfungsrelevanz (ehrlich):** Seit dem Prüfungskatalog 2025 ist **SQL laut IHK Hannover nur noch Teil der AP2**. Die Verlagsstatistik zur AP1 (U-Form) führt aber weiterhin den Themenkreis „Grundlagen relationaler Datenbanken“. Für die AP1 solltest du deshalb die Grundbegriffe, Schlüssel, Beziehungen, Anomalien und das ER-Modell sicher beherrschen. SQL (Modul d03) ist Vertiefung für AP2 und Praxis.`,
        },
        {
          type: 'visual',
          title: 'So greift eine Anwendung auf die Datenbank zu',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['Inventar-App (Client)', 'DBMS (z. B. MariaDB)', 'Datenbankdateien'],
              messages: [
                { from: 0, to: 1, label: 'Anmeldung + SQL-Abfrage', note: 'z. B. alle Notebooks in Berlin' },
                { from: 1, to: 1, label: 'Rechte und Syntax prüfen' },
                { from: 1, to: 2, label: 'Datenseiten lesen' },
                { from: 2, to: 1, label: 'gespeicherte Datensätze' },
                { from: 1, to: 0, label: 'Ergebnistabelle' },
              ],
            },
          },
          caption: 'Die Anwendung spricht nie direkt mit den Dateien. Das DBMS prüft Rechte, führt die Abfrage aus und liefert nur das Ergebnis.',
        },
        {
          type: 'example',
          title: 'Beratung: Excel oder Datenbank für die Inventarverwaltung?',
          problem: `Die Geschäftsführung fragt: „Reicht unsere Excel-Liste nicht?“ Begründe eine Empfehlung für die Elektro Krämer GmbH mit drei Argumenten. Ausgangslage: ca. 450 Geräte, 120 Mitarbeitende, zwei Standorte, drei Personen pflegen die Liste, das Ticketsystem soll künftig auf die Gerätedaten zugreifen.`,
          steps: [
            { label: '1. Anforderungen sammeln', body: 'Mehrere Bearbeiter gleichzeitig, verknüpfte Daten (Gerät → Mitarbeitende → Standort), Zugriff durch eine weitere Anwendung (Ticketsystem), Daten müssen stimmen (Inventur, Bilanz).' },
            { label: '2. Kriterien vergleichen', body: '**Mehrbenutzerbetrieb:** Excel-Datei kann nur eingeschränkt gleichzeitig bearbeitet werden, es entstehen Kopien. **Redundanz:** In Excel steht die Standortadresse in jeder Zeile – Tippfehler führen zu Widersprüchen. **Integrität:** Eine DB verhindert doppelte Inventarnummern und Verweise auf nicht vorhandene Mitarbeitende. **Anbindung:** Das Ticketsystem kann per SQL auf eine Datenbank zugreifen.' },
            { label: '3. Gegenargumente prüfen', body: 'Die Datenbank muss geplant (Datenmodell), betrieben (Server, Updates) und gesichert (Backup) werden. Bei 450 Geräten und drei Bearbeitern ist dieser Aufwand gerechtfertigt.' },
            { label: '4. Empfehlung formulieren', body: 'Empfehlung: relationale Datenbank (z. B. MariaDB) mit einer Inventar-Anwendung. Begründung: gleichzeitiger Zugriff ohne Versionschaos, keine redundanten Adressdaten, technisch erzwungene Integrität und Anbindung des Ticketsystems.' },
          ],
          result: 'Empfehlung Datenbank – begründet mit Mehrbenutzerbetrieb, Redundanzvermeidung, Integrität und Anbindung an Anwendungen.',
        },
        {
          type: 'check',
          question: {
            id: 'd01-c01', kind: 'single', skill: 'db.grundbegriffe', difficulty: 1,
            prompt: 'Was ist ein **DBMS**?',
            options: [
              'Die Sammlung der gespeicherten Daten, z. B. alle Inventardaten',
              'Die Software, die eine Datenbank verwaltet und den Zugriff darauf regelt',
              'Eine Tabelle mit Primärschlüssel',
              'Eine Excel-Datei auf einem Netzlaufwerk',
            ],
            answer: 1,
            distractors: {
              '0': { why: 'Das ist die **Datenbank** (DB) selbst. Das DBMS ist die Verwaltungssoftware.', error: 'db-dbms-verwechselt' },
              '2': { why: 'Eine Tabelle ist ein Bestandteil einer relationalen Datenbank, keine Software.', error: 'db-grundbegriffe' },
              '3': { why: 'Eine Excel-Datei ist eine Tabellenkalkulation, kein Datenbankmanagementsystem.', error: 'db-grundbegriffe' },
            },
            explanation: 'DBMS = Datenbank**management**system, also die Software (z. B. MariaDB, PostgreSQL, Microsoft SQL Server). DB + DBMS = Datenbanksystem.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'd01-c02', kind: 'single', skill: 'db.grundbegriffe', difficulty: 1,
            prompt: 'Welche Aussage ist eine **Information** (und nicht nur ein Datum)?',
            options: ['`2021`', '`HP`', '„Der Drucker G04 von HP wurde 2021 angeschafft und ist keinem Mitarbeitenden zugeordnet.“', '`G04;HP;2021;NULL`'],
            answer: 2,
            distractors: {
              '0': { why: 'Eine einzelne Zahl ohne Zusammenhang ist ein Datum (Daten), keine Information.', error: 'db-daten-information' },
              '1': { why: 'Ein einzelner Wert ohne Kontext ist ein Datum.', error: 'db-daten-information' },
              '3': { why: 'Das sind Rohdaten in einem Format (CSV-Zeile). Erst die Interpretation macht daraus eine Information.', error: 'db-daten-information' },
            },
            explanation: 'Information = Daten + Kontext/Bedeutung. Erst der Satz sagt aus, was die Werte bedeuten.',
          },
        },
        { type: 'practice', title: 'Übung: Grundbegriffe', questionIds: ['d01-q001', 'd01-q002', 'd01-q027', 'd01-q028'], count: 4, difficulty: 1 },
        {
          type: 'summary',
          points: [
            'Daten = Werte nach Regeln; Information = Daten mit Bedeutung im Kontext.',
            'DB = Datensammlung, DBMS = Verwaltungssoftware, DBS = beides zusammen.',
            'DBMS-Aufgaben: speichern/abfragen, Mehrbenutzerbetrieb, Rechte, Integrität, Sicherung.',
            'Datenbank statt Tabellenkalkulation bei mehreren Nutzern, verknüpften Daten, hohen Anforderungen an Korrektheit.',
            'AP1: Grundbegriffe, Schlüssel, Beziehungen, ERM sicher können. SQL ist seit dem Katalog 2025 AP2-Stoff.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'd01-l02',
      title: 'Tabellen, Datensätze, Attribute und Datentypen',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['db.tabelle'],
      simple: `Eine Datenbanktabelle sieht aus wie eine Excel-Tabelle. Jede **Zeile** ist ein **Datensatz** (z. B. ein Gerät), jede **Spalte** ein **Attribut** (eine Eigenschaft, z. B. der Preis). Für jede Spalte legst du einen **Datentyp** fest – wie bei einem Formular, in dem ein Feld nur ein Datum oder nur eine Zahl annimmt. So kann niemand „zwölf Euro“ in das Preisfeld tippen.

**Merke:** Zeile = Datensatz, Spalte = Attribut; Geldbeträge als DECIMAL, Kennungen wie Telefonnummern als Text (VARCHAR).`,
      steps: [
        {
          type: 'explain',
          title: 'Der Aufbau einer Tabelle',
          body: `In einer relationalen Datenbank liegen die Daten in **Tabellen**. Jede Tabelle beschreibt eine Art von Objekten, z. B. Geräte.

${T_GER}

| Fachbegriff (Theorie) | Alltagsbegriff | Im Beispiel |
|---|---|---|
| **Relation** | Tabelle | die Tabelle Geraet |
| **Tupel** | Datensatz, Zeile | \`G03 | Monitor | Dell | 210 | 102\` |
| **Attribut** | Spalte, Feld(name) | Typ, Hersteller, Preis … |
| **Attributwert** | Feldinhalt, Zelle | \`Dell\` |
| **Domäne** (Wertebereich) | erlaubte Werte einer Spalte | Preis: Dezimalzahl ≥ 0 |
| **Grad** der Relation | Anzahl der Spalten | 5 |

Die Tabelle oben hat also **5 Datensätze** und **5 Attribute**.

**Regeln für Tabellen im relationalen Modell**
- Jede Spalte hat einen **eindeutigen Namen** und einen festen **Datentyp**.
- Jede Zelle enthält **genau einen Wert** (atomar), keine Listen wie „Notebook, Monitor“.
- Jede Zeile ist **eindeutig** identifizierbar (dafür sorgt der Primärschlüssel, nächste Lektion).
- Die **Reihenfolge** der Zeilen und Spalten hat keine Bedeutung. Wer eine Sortierung braucht, sortiert bei der Abfrage.

**NULL** bedeutet „kein Wert vorhanden / unbekannt“. NULL ist **nicht** dasselbe wie die Zahl 0 oder ein leerer Text. Im Beispiel ist der Drucker G04 keinem Mitarbeitenden zugeordnet (PersNr = NULL).`,
        },
        {
          type: 'explain',
          title: 'Datentypen sinnvoll wählen',
          body: `Für jede Spalte legst du einen **Datentyp** fest. Das DBMS lehnt dann unpassende Werte ab und kann richtig rechnen und sortieren. Die Namen unterscheiden sich je nach DBMS etwas; diese Typen sind im SQL-Standard bzw. in allen gängigen Systemen vorhanden:

| Datentyp | Inhalt | Beispiel im Inventar |
|---|---|---|
| \`INTEGER\` (INT) | ganze Zahlen | Anzahl Lizenzen, PersNr (wenn rein numerisch) |
| \`DECIMAL(p,s)\` | Festkommazahl: p Stellen insgesamt, davon s Nachkommastellen | Preis \`DECIMAL(8,2)\` → höchstens 999999,99 |
| \`VARCHAR(n)\` | Text variabler Länge, höchstens n Zeichen | Hersteller \`VARCHAR(40)\` |
| \`CHAR(n)\` | Text fester Länge n | Postleitzahl \`CHAR(5)\` |
| \`DATE\` | Datum | Anschaffungsdatum |
| \`TIME\`, \`TIMESTAMP\` (MySQL auch \`DATETIME\`) | Uhrzeit bzw. Datum mit Uhrzeit | Zeitpunkt der Geräteausgabe |
| \`BOOLEAN\` | wahr/falsch | Garantie aktiv? (MySQL/MariaDB speichern BOOLEAN intern als TINYINT(1)) |

**Typische Prüfungsfalle:** Postleitzahlen, Telefonnummern, Inventarnummern und IBANs sind **Texte**, keine Zahlen. Man rechnet nicht mit ihnen, sie können führende Nullen haben (PLZ \`01067\` Dresden) oder Zeichen wie \`+\`, \`-\` oder Buchstaben enthalten. Als INTEGER gespeichert würde aus \`01067\` die Zahl \`1067\`.

**Geldbeträge** speichert man als \`DECIMAL\`, nicht als Gleitkommazahl (\`FLOAT\`/\`DOUBLE\`), weil Gleitkommazahlen Rundungsfehler haben können (0,1 lässt sich binär nicht exakt darstellen).`,
        },
        {
          type: 'visual',
          title: 'Begriffe auf einen Blick',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Relation = Tabelle', icon: 'Table', text: 'Beschreibt eine Art von Objekten, z. B. alle Geräte.' },
                { title: 'Tupel = Datensatz', icon: 'Rows3', text: 'Eine Zeile, z. B. das Notebook G01 mit allen Angaben.' },
                { title: 'Attribut = Spalte', icon: 'Columns3', text: 'Eine Eigenschaft, z. B. Hersteller. Hat Namen und Datentyp.' },
                { title: 'Attributwert', icon: 'Pencil', text: 'Inhalt einer Zelle, z. B. „Lenovo“. Immer genau ein Wert.' },
                { title: 'Domäne', icon: 'Filter', text: 'Wertebereich einer Spalte, z. B. Preis ≥ 0 mit zwei Nachkommastellen.' },
                { title: 'NULL', icon: 'Circle', text: 'Kein Wert vorhanden. Nicht 0 und nicht leerer Text.' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Datentypen für die Tabelle Geraet festlegen',
          problem: `Lege für die Inventartabelle passende Datentypen fest. Die Inventarnummern haben das Format \`G-2026-0042\`, der teuerste denkbare Gegenstand (Server) kostet unter 100.000 €, Preise haben Cent-Beträge.`,
          steps: [
            { label: '1. InvNr', body: 'Enthält Buchstaben und Bindestriche, Länge 11 Zeichen → Text. Gewählt: `VARCHAR(12)` (etwas Reserve) oder `CHAR(11)`, wenn das Format fest ist.' },
            { label: '2. Typ, Hersteller', body: 'Freier Text, unterschiedlich lang → `VARCHAR(30)` bzw. `VARCHAR(40)`.' },
            { label: '3. Preis', body: 'Geldbetrag mit 2 Nachkommastellen, unter 100.000 € → höchstens 5 Stellen vor dem Komma. p = 5 + 2 = 7 → `DECIMAL(7,2)`, größter Wert 99999,99. Mit Reserve: `DECIMAL(8,2)` (bis 999999,99).' },
            { label: '4. Anschaffung', body: 'Datum → `DATE`. Damit kann das DBMS z. B. das Alter eines Geräts berechnen und korrekt sortieren.' },
            { label: '5. Garantie aktiv', body: 'Ja/Nein → `BOOLEAN`.' },
          ],
          result: 'InvNr VARCHAR(12), Typ VARCHAR(30), Hersteller VARCHAR(40), Preis DECIMAL(8,2), Anschaffung DATE, GarantieAktiv BOOLEAN.',
        },
        {
          type: 'check',
          question: {
            id: 'd01-c03', kind: 'number', skill: 'db.tabelle', difficulty: 2,
            prompt: 'Eine Spalte ist als `DECIMAL(6,2)` definiert. Welcher **größte positive Wert** kann gespeichert werden?',
            answer: 9999.99,
            tolerance: 0.001,
            hints: ['p = 6 Stellen insgesamt, davon s = 2 nach dem Komma.', 'Vor dem Komma bleiben 6 − 2 = 4 Stellen.'],
            misconceptions: [
              { answer: '999999.99', error: 'db-decimal-stellen', why: 'Bei DECIMAL(p,s) ist p die **Gesamtzahl** der Stellen. Vor dem Komma stehen nur p − s = 4 Stellen.' },
              { answer: '999999', error: 'db-decimal-stellen', why: 'p zählt die Nachkommastellen mit: 4 Stellen vor und 2 nach dem Komma.' },
            ],
            explanation: 'DECIMAL(6,2): 6 Stellen insgesamt, 2 davon Nachkommastellen → 4 Vorkommastellen → größter Wert **9999,99**.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'd01-c04', kind: 'text', skill: 'db.tabelle', difficulty: 1,
            prompt: 'Welchen Datentyp wählst du für die **Postleitzahl** eines Standorts (z. B. 01067)? Nenne einen SQL-Datentyp.',
            accept: ['CHAR(5)', 'VARCHAR(5)', 'CHAR', 'VARCHAR', 'VARCHAR(10)', 'Text', 'Zeichenkette', 'String', 'CHARACTER(5)', 'NCHAR(5)', 'NVARCHAR(5)'],
            hints: ['Rechnet man mit Postleitzahlen?', 'Was passiert mit der führenden 0, wenn man 01067 als Zahl speichert?'],
            misconceptions: [
              { answer: 'INTEGER', error: 'db-datentyp-zahl-statt-text', why: 'Als Zahl gespeichert wird aus 01067 die 1067 – die führende Null geht verloren. Mit PLZ rechnet man nicht → Text.' },
              { answer: 'INT', error: 'db-datentyp-zahl-statt-text', why: 'Als Zahl gespeichert wird aus 01067 die 1067. PLZ sind Texte.' },
            ],
            explanation: 'Postleitzahlen sind Kennungen, keine Rechengrößen, und haben teils führende Nullen → **CHAR(5)** (feste Länge in Deutschland) oder VARCHAR.',
          },
        },
        { type: 'practice', title: 'Übung: Tabellen und Datentypen', questionIds: ['d01-q003', 'd01-q004', 'd01-q005', 'd01-q006'], count: 4, difficulty: 1 },
        {
          type: 'summary',
          points: [
            'Relation = Tabelle, Tupel = Datensatz/Zeile, Attribut = Spalte, Domäne = Wertebereich.',
            'Jede Zelle enthält genau einen Wert; Reihenfolge der Zeilen ist bedeutungslos.',
            'NULL = kein Wert (nicht 0, nicht leerer Text).',
            'DECIMAL(p,s): p Stellen gesamt, s Nachkommastellen. Geld als DECIMAL, nicht FLOAT.',
            'PLZ, Telefonnummer, Inventarnummer → Text (CHAR/VARCHAR).',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'd01-l03',
      title: 'Primärschlüssel und Fremdschlüssel',
      minutes: 25,
      relevance: 'ap1-teilweise',
      skills: ['db.schluessel'],
      simple: `Der **Primärschlüssel** ist wie die Nummer im Personalausweis: Jeder Datensatz hat genau eine, und keine kommt doppelt vor. Ein **Fremdschlüssel** ist ein Verweis auf den Primärschlüssel einer anderen Tabelle – wie die Kundennummer auf einer Rechnung, über die du die Kundendaten findest. So musst du Daten nicht mehrfach abschreiben, sondern verweist nur darauf.

**Merke:** Primärschlüssel = eindeutig und nie leer; Fremdschlüssel = Verweis auf den Primärschlüssel einer anderen Tabelle.`,
      steps: [
        {
          type: 'explain',
          title: 'Jeder Datensatz braucht eine eindeutige Kennung',
          body: `Zwei Mitarbeitende können gleich heißen, zwei Monitore können vom selben Typ sein. Damit die Datenbank jeden Datensatz eindeutig findet, bekommt jede Tabelle einen **Primärschlüssel** (engl. primary key, PK).

**Anforderungen an einen Primärschlüssel**

| Anforderung | Bedeutung |
|---|---|
| **eindeutig** | Kein Wert darf in der Tabelle zweimal vorkommen. |
| **nicht NULL** | Jeder Datensatz muss einen Schlüsselwert haben. |
| **minimal** | Er enthält keine überflüssigen Attribute (bei zusammengesetzten Schlüsseln). |
| **stabil** (Empfehlung) | Der Wert sollte sich möglichst nie ändern, denn andere Tabellen verweisen darauf. |

**Begriffe rund um Schlüssel**

| Begriff | Erklärung | Beispiel |
|---|---|---|
| **Schlüsselkandidat** | jedes Attribut (oder jede Kombination), das die Anforderungen erfüllt | PersNr, aber auch E-Mail-Adresse |
| **Primärschlüssel** | der ausgewählte Schlüsselkandidat | PersNr |
| **natürlicher Schlüssel** | hat eine Bedeutung in der realen Welt | ISBN, Kfz-Kennzeichen, Seriennummer |
| **künstlicher Schlüssel** (Surrogatschlüssel) | wird nur für die DB vergeben, meist fortlaufende Nummer | GeraetID 1, 2, 3 … |
| **zusammengesetzter Schlüssel** | erst mehrere Attribute zusammen sind eindeutig | (PersNr, InvNr) in einer Ausgabe-Tabelle |

**Warum ist der Name kein guter Primärschlüssel?** Namen sind nicht eindeutig (zwei „Müller“) und ändern sich (Heirat). Auch die E-Mail-Adresse ändert sich bei Namensänderung. Deshalb verwendet man meist eine Personalnummer oder einen künstlichen Schlüssel.

**Fremdschlüssel** (engl. foreign key, FK): Ein Attribut, das auf den Primärschlüssel einer **anderen** (oder derselben) Tabelle verweist. So entstehen die Verknüpfungen.

${T_MA}

${T_GER}

- In **Mitarbeiter** ist **PersNr** der Primärschlüssel.
- In **Geraet** ist **InvNr** der Primärschlüssel und **PersNr** ein **Fremdschlüssel** auf Mitarbeiter.PersNr.
- Ein Fremdschlüsselwert darf **mehrfach** vorkommen (Yilmaz, 102, hat zwei Geräte) und darf **NULL** sein, wenn die Zuordnung optional ist (Drucker G04).

**Schreibweise in Prüfungen:** Primärschlüssel werden meist **unterstrichen**, Fremdschlüssel mit vorangestelltem **#** oder einem Pfeil ↑ markiert, z. B. Geraet(InvNr, Typ, Hersteller, Preis, #PersNr) mit unterstrichener InvNr. Hier in der App ist der Primärschlüssel **fett** gesetzt: Geraet(**InvNr**, Typ, Hersteller, Preis, #PersNr).`,
        },
        {
          type: 'visual',
          title: 'Primär- und Fremdschlüssel',
          widget: {
            kind: 'cards',
            data: {
              columns: 2,
              items: [
                { title: 'Primärschlüssel (PK)', icon: 'KeyRound', text: 'Identifiziert jeden Datensatz seiner eigenen Tabelle eindeutig. Eindeutig, nie NULL, möglichst stabil.' },
                { title: 'Fremdschlüssel (FK)', icon: 'Link', text: 'Verweist auf den PK einer anderen Tabelle. Darf mehrfach vorkommen, darf NULL sein (wenn erlaubt).' },
                { title: 'Natürlicher Schlüssel', icon: 'Key', text: 'Hat eine reale Bedeutung, z. B. Seriennummer. Risiko: kann sich ändern oder doppelt vorkommen.' },
                { title: 'Künstlicher Schlüssel', icon: 'Hash', text: 'Nur für die DB vergeben (fortlaufende ID). Stabil und kurz, aber ohne fachliche Bedeutung.' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Einem Fremdschlüssel folgen',
          problem: `Mit den Tabellen Mitarbeiter und Geraet oben: Wer nutzt das Gerät **G05**, in welcher Abteilung arbeitet die Person, und wie viele Geräte sind der Abteilung **Vertrieb** zugeordnet?`,
          steps: [
            { label: '1. Datensatz G05 suchen', body: 'In Geraet über den Primärschlüssel: G05 | Desktop | Lenovo | 760 | **PersNr 103**.' },
            { label: '2. Fremdschlüssel folgen', body: 'PersNr 103 ist Fremdschlüssel → in Mitarbeiter den Datensatz mit PK 103 suchen: **Schulz, Buchhaltung**.' },
            { label: '3. Vertrieb-Mitarbeitende bestimmen', body: 'In Mitarbeiter: Abteilung = Vertrieb → PersNr **102** (Yilmaz) und **104** (Nowak).' },
            { label: '4. Geräte zählen', body: 'In Geraet alle Zeilen mit PersNr 102 oder 104: G02, G03 (beide 102). 104 kommt in diesem Auszug nicht vor → **2 Geräte**.' },
          ],
          result: 'G05 nutzt Schulz (Buchhaltung). Dem Vertrieb sind im Auszug 2 Geräte zugeordnet (G02, G03).',
        },
        {
          type: 'check',
          question: {
            id: 'd01-c05', kind: 'single', skill: 'db.schluessel', difficulty: 1,
            prompt: 'Die Tabelle **Mitarbeiter** hat die Attribute Name, Vorname, E-Mail, Geburtsdatum und PersNr. Welches Attribut eignet sich **am besten** als Primärschlüssel?',
            options: ['Name', 'E-Mail', 'Geburtsdatum', 'PersNr'],
            answer: 3,
            distractors: {
              '0': { why: 'Namen sind nicht eindeutig (mehrere „Müller“) und ändern sich, z. B. bei Heirat.', error: 'db-pk-nicht-eindeutig' },
              '1': { why: 'E-Mail-Adressen sind zwar eindeutig, ändern sich aber z. B. bei Namensänderung. Ein PK sollte stabil sein.', error: 'db-pk-nicht-stabil' },
              '2': { why: 'Mehrere Personen können am selben Tag geboren sein.', error: 'db-pk-nicht-eindeutig' },
            },
            explanation: 'Die Personalnummer wird vom Unternehmen eindeutig vergeben und ändert sich nicht → idealer Primärschlüssel.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'd01-c06', kind: 'text', skill: 'db.schluessel', difficulty: 1,
            prompt: `${T_GER}\n\nWelches Attribut der Tabelle **Geraet** ist ein **Fremdschlüssel**?`,
            accept: ['PersNr', 'Personalnummer', 'Geraet.PersNr'],
            hints: ['Welche Spalte verweist auf eine andere Tabelle?'],
            misconceptions: [{ answer: 'InvNr', error: 'db-pk-fk-verwechselt', why: 'InvNr ist der **Primärschlüssel** von Geraet. Der Fremdschlüssel verweist auf eine andere Tabelle.' }],
            explanation: '**PersNr** verweist auf den Primärschlüssel der Tabelle Mitarbeiter. Sie darf mehrfach vorkommen und NULL sein (G04).',
          },
        },
        { type: 'practice', title: 'Übung: Schlüssel', questionIds: ['d01-q007', 'd01-q008', 'd01-q009', 'd01-q010', 'd01-q011', 'd01-q012'], count: 5, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Primärschlüssel: eindeutig, nie NULL, minimal, möglichst stabil.',
            'Natürlicher Schlüssel hat reale Bedeutung, künstlicher (Surrogat-)Schlüssel nur technische.',
            'Zusammengesetzter Schlüssel: erst mehrere Attribute gemeinsam sind eindeutig.',
            'Fremdschlüssel verweist auf einen PK, darf mehrfach vorkommen und (optional) NULL sein.',
            'Notation: PK unterstrichen, FK mit # oder ↑.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'd01-l04',
      title: 'Beziehungen: 1:1, 1:n und n:m',
      minutes: 25,
      relevance: 'ap1',
      skills: ['db.beziehungen'],
      simple: `Beziehungen beschreiben, wie viele Datensätze zueinander gehören. **1:1** ist wie Person und Personalausweis: Ein Ausweis gehört genau einer Person, und eine Person hat höchstens einen gültigen Personalausweis. **1:n** ist wie Abteilung und Mitarbeitende: Eine Abteilung hat viele Mitarbeitende, jede Person gehört aber nur zu einer Abteilung. **n:m** ist wie Schüler und Kurse: Ein Schüler besucht viele Kurse, ein Kurs hat viele Schüler. Frage immer in **beide** Richtungen: „Wie viele B hat ein A?“ und „Wie viele A hat ein B?“

**Merke:** Bei 1:n steht der Fremdschlüssel auf der n-Seite, n:m wird über eine Zwischentabelle aufgelöst.`,
      steps: [
        {
          type: 'explain',
          title: 'Wie viele gehören zu wie vielen?',
          body: `Tabellen stehen in **Beziehungen** zueinander. Die **Kardinalität** (auch Beziehungstyp oder Komplexität) gibt an, wie viele Datensätze der einen Tabelle mit wie vielen der anderen verknüpft sein können.

**So bestimmst du die Kardinalität – zwei Fragen, beide Richtungen:**
1. Mit wie vielen B kann **ein** A verknüpft sein? (eins oder viele)
2. Mit wie vielen A kann **ein** B verknüpft sein? (eins oder viele)

| Typ | Bedeutung | Beispiel bei Elektro Krämer | Umsetzung in Tabellen |
|---|---|---|---|
| **1:1** | Ein A gehört zu höchstens einem B und umgekehrt. | Mitarbeiter – Dienstwagen (jede Person fährt höchstens einen festen Dienstwagen, jeder Wagen ist genau einer Person zugeordnet) | Fremdschlüssel in **einer** der beiden Tabellen, zusätzlich **UNIQUE** (eindeutig). Oft kann man die Tabellen auch zusammenlegen. |
| **1:n** | Ein A hat viele B, aber jedes B gehört zu genau einem A. | Standort – Mitarbeiter (ein Standort hat viele Mitarbeitende, jede Person arbeitet an genau einem Standort) | Fremdschlüssel auf der **n-Seite** (in Mitarbeiter steht StandortID). |
| **n:m** | Ein A hat viele B **und** ein B hat viele A. | Gerät – Software (auf einem Gerät sind viele Programme installiert, ein Programm ist auf vielen Geräten installiert) | **Zwischentabelle** (Verbindungs- oder Zuordnungstabelle) mit zwei Fremdschlüsseln; diese bilden zusammen den Primärschlüssel. |

**Warum steht der Fremdschlüssel bei 1:n auf der n-Seite?** Jede Person hat genau **einen** Standort – also passt genau ein Wert in die Spalte StandortID. Umgekehrt hat ein Standort **viele** Mitarbeitende; die passen nicht in eine einzige Zelle (Zellen sind atomar).

**Warum braucht n:m eine Zwischentabelle?** Weder in Geraet noch in Software passt „viele“ in eine Zelle. Also bekommt jede einzelne Verknüpfung eine eigene Zeile in einer dritten Tabelle:

| Geraet (PK InvNr) | Installation (PK InvNr + SoftwareID) | Software (PK SoftwareID) |
|---|---|---|
| G01 Notebook | G01 – S1, G01 – S2 | S1 Office-Paket |
| G02 Notebook | G02 – S1 | S2 VPN-Client |
| G05 Desktop | G05 – S1, G05 – S2, G05 – S3 | S3 Buchhaltungssoftware |

Die Zwischentabelle kann zusätzlich **eigene Attribute** der Beziehung aufnehmen, z. B. das Installationsdatum oder die Version.

**Hinweis zur Schreibweise:** Statt 1:n liest du auch 1:N, 1:m oder 1:*. Statt n:m auch m:n oder M:N. Gemeint ist dasselbe.`,
        },
        {
          type: 'visual',
          title: 'Drei Beziehungstypen',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: '1:1', icon: 'Link', text: 'Mitarbeiter – Dienstwagen. FK in einer Tabelle + UNIQUE, oder Tabellen zusammenlegen.' },
                { title: '1:n', icon: 'GitFork', text: 'Standort – Mitarbeiter. FK StandortID auf der n-Seite (Mitarbeiter).' },
                { title: 'n:m', icon: 'Combine', text: 'Gerät – Software. Zwischentabelle Installation(InvNr, SoftwareID) mit zusammengesetztem PK.' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'n:m auflösen: Software-Installationen',
          problem: `Die IT will erfassen, welche Software auf welchem Gerät installiert ist. Bekannt: G01 hat Office und VPN-Client, G02 hat Office, G05 hat Office, VPN-Client und Buchhaltungssoftware. Bestimme die Kardinalität, entwirf die Tabellen und gib an, wie viele Zeilen die Zwischentabelle hat.`,
          steps: [
            { label: '1. Richtung Gerät → Software', body: 'Ein Gerät kann **viele** Programme haben (G05 hat drei).' },
            { label: '2. Richtung Software → Gerät', body: 'Ein Programm kann auf **vielen** Geräten installiert sein (Office auf drei Geräten). → **n:m**.' },
            { label: '3. Tabellen entwerfen', body: 'Geraet(**InvNr**, Typ, …), Software(**SoftwareID**, Bezeichnung, …), Installation(**#InvNr, #SoftwareID**, Installationsdatum).' },
            { label: '4. Zeilen der Zwischentabelle zählen', body: 'Eine Zeile je Verknüpfung: G01 → 2, G02 → 1, G05 → 3. Summe 2 + 1 + 3 = **6 Zeilen**.' },
          ],
          result: 'n:m → drei Tabellen; Zwischentabelle Installation mit 6 Zeilen und zusammengesetztem PK (InvNr, SoftwareID).',
        },
        {
          type: 'check',
          question: {
            id: 'd01-c07', kind: 'single', skill: 'db.beziehungen', difficulty: 1,
            prompt: 'Ein Standort hat viele Mitarbeitende, jede Person ist genau einem Standort zugeordnet. In welche Tabelle gehört der **Fremdschlüssel**?',
            options: ['StandortID in die Tabelle Mitarbeiter', 'PersNr in die Tabelle Standort', 'in eine Zwischentabelle Standort_Mitarbeiter', 'in beide Tabellen gegenseitig'],
            answer: 0,
            distractors: {
              '1': { why: 'Ein Standort hat viele Mitarbeitende – mehrere PersNr passen nicht in eine Zelle. Der FK gehört auf die n-Seite.', error: 'db-fk-falsche-seite' },
              '2': { why: 'Eine Zwischentabelle braucht man nur bei n:m. Hier liegt 1:n vor.', error: 'db-zwischentabelle-unnoetig' },
              '3': { why: 'Gegenseitige Fremdschlüssel erzeugen Redundanz und Widersprüche. Bei 1:n genügt ein FK auf der n-Seite.', error: 'db-fk-falsche-seite' },
            },
            explanation: '1:n → Fremdschlüssel auf der **n-Seite**: Mitarbeiter(**PersNr**, Name, …, #StandortID).',
          },
        },
        { type: 'practice', title: 'Übung: Kardinalitäten bestimmen', generator: 'daten.kardinalitaet', count: 4, difficulty: 1 },
        { type: 'practice', title: 'Übung: Beziehungen umsetzen', questionIds: ['d01-q013', 'd01-q014', 'd01-q015', 'd01-q016', 'd01-q017', 'd01-q018'], count: 5, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Kardinalität immer in beide Richtungen fragen: eins oder viele?',
            '1:1 → FK in einer Tabelle mit UNIQUE (oder zusammenlegen).',
            '1:n → FK auf der n-Seite.',
            'n:m → Zwischentabelle mit beiden FKs, die zusammen den PK bilden; Platz für Beziehungsattribute.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'd01-l05',
      title: 'Redundanz und Anomalien',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['db.anomalien'],
      simple: `**Redundanz** heißt: Dieselbe Angabe steht mehrfach in der Datenbank, z. B. die Adresse des Standorts in jeder Gerätezeile. Das ist wie ein Adressbuch, in dem deine Nummer zehnmal steht: Ziehst du um, musst du alle zehn Stellen ändern – vergisst du eine, stimmt das Buch nicht mehr. Solche Fehler heißen **Anomalien** und treten beim Ändern, Einfügen und Löschen auf.

**Merke:** Drei Anomalien – Änderungs-, Einfüge- und Löschanomalie; Ursache ist Redundanz, Abhilfe sind getrennte, über Schlüssel verknüpfte Tabellen.`,
      steps: [
        {
          type: 'explain',
          title: 'Warum die Excel-Liste Probleme macht',
          body: `**Redundanz** bedeutet: Dieselbe Information ist **mehrfach** gespeichert. Sieh dir die bisherige Liste der Elektro Krämer GmbH an:

${T_EXCEL}

Die Adresse des Standorts Berlin steht dreimal in der Liste, die Abteilung von Schulz zweimal. Diese Redundanz kostet nicht nur Speicherplatz – vor allem führt sie zu **Anomalien** (Unstimmigkeiten beim Ändern der Daten):

| Anomalie | Was passiert? | Beispiel aus der Liste |
|---|---|---|
| **Einfügeanomalie** | Man kann eine Information nicht speichern, ohne eine andere (noch nicht vorhandene) mit einzutragen. | Ein neuer Standort München soll angelegt werden, hat aber noch keine Geräte. In dieser Liste gibt es keine Zeile ohne InvNr – der Standort kann nicht erfasst werden. |
| **Änderungsanomalie** (Update-Anomalie) | Eine Änderung muss an mehreren Stellen erfolgen. Vergisst man eine, ist der Bestand widersprüchlich. | Der Standort Berlin zieht um. Alle drei Berlin-Zeilen müssen geändert werden. Schon jetzt steht bei G07 „Friedrichstr.“ statt „Friedrichstraße“ – eine Inkonsistenz. |
| **Löschanomalie** | Beim Löschen eines Datensatzes gehen ungewollt andere Informationen verloren. | Das einzige Gerät von Weber (G01) wird ausgesondert und die Zeile gelöscht. Damit ist auch die Information weg, dass Weber in der IT arbeitet. |

**Lösung:** Die Daten werden auf mehrere Tabellen verteilt (Standort, Mitarbeiter, Geraet), die über Schlüssel verknüpft sind. Jede Information steht dann nur **einmal** in der Datenbank. Das systematische Verfahren dafür heißt **Normalisierung** (Modul d02).

**Nicht jede Wiederholung ist schlecht:** Fremdschlüsselwerte (z. B. die StandortID 2 bei mehreren Mitarbeitenden) wiederholen sich zwangsläufig – das ist **kontrollierte Redundanz**, die das DBMS über die referenzielle Integrität absichert. Auch Backups sind gewollte Redundanz.`,
        },
        {
          type: 'visual',
          title: 'Drei Anomalien',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Einfügeanomalie', icon: 'PlusCircle', text: 'Neuer Standort ohne Gerät kann nicht erfasst werden.' },
                { title: 'Änderungsanomalie', icon: 'Pencil', text: 'Adresse steht mehrfach – eine Zeile vergessen = Widerspruch.' },
                { title: 'Löschanomalie', icon: 'Trash2', text: 'Letztes Gerät gelöscht – Abteilung der Person ist auch weg.' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Aufwand einer Änderung abschätzen',
          problem: `In der Excel-Liste oben zieht der Standort **Hamburg** in die „Hafenstraße 5, 20459 Hamburg“. Wie viele Zellen müssen geändert werden? Wie viele wären es in einer normalisierten Datenbank mit eigener Tabelle Standort?`,
          steps: [
            { label: '1. Betroffene Zeilen finden', body: 'Standort = Hamburg: G01, G05, G06 → **3 Zeilen**.' },
            { label: '2. Zellen je Zeile', body: 'Pro Zeile ändert sich nur die Zelle Standortadresse → 3 · 1 = **3 Zellen**.' },
            { label: '3. Normalisierte Datenbank', body: 'Die Adresse steht genau einmal in der Tabelle Standort. Mitarbeitende verweisen nur über StandortID darauf → **1 Zelle**.' },
            { label: '4. Bewertung', body: 'Mit 450 Geräten wären es in Excel ca. 300 Zeilen für Hamburg – eine vergessene Zeile erzeugt eine Inkonsistenz (Änderungsanomalie).' },
          ],
          result: 'Excel-Liste: 3 Zellen (im echten Bestand Hunderte), normalisierte Datenbank: 1 Zelle.',
        },
        {
          type: 'check',
          question: {
            id: 'd01-c08', kind: 'match', skill: 'db.anomalien', difficulty: 1,
            prompt: 'Ordne jedem Beispiel die passende Anomalie zu.',
            left: [
              'Eine neue Abteilung kann erst erfasst werden, wenn ihr ein Gerät zugeordnet ist.',
              'Nach einer Namensänderung steht in zwei Zeilen „Meyer“, in einer noch „Schmidt“.',
              'Mit dem letzten Gerät eines Standorts verschwindet auch dessen Adresse.',
            ],
            right: ['Einfügeanomalie', 'Änderungsanomalie', 'Löschanomalie'],
            answer: [0, 1, 2],
            explanation: 'Einfügen nicht ohne Fremdinformation möglich → Einfügeanomalie. Mehrfach gespeicherte Daten unvollständig geändert → Änderungsanomalie. Ungewollter Informationsverlust beim Löschen → Löschanomalie.',
          },
        },
        { type: 'practice', title: 'Übung: Redundanz und Anomalien', questionIds: ['d01-q019', 'd01-q020', 'd01-q021', 'd01-q022', 'd01-q023'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Redundanz = dieselbe Information mehrfach gespeichert.',
            'Einfügeanomalie: Information kann nicht ohne andere gespeichert werden.',
            'Änderungsanomalie: Änderung an mehreren Stellen nötig → Widersprüche.',
            'Löschanomalie: Löschen entfernt ungewollt weitere Informationen.',
            'Abhilfe: Daten auf verknüpfte Tabellen verteilen (Normalisierung). FK-Werte sind kontrollierte Redundanz.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'd01-l06',
      title: 'Datenintegrität',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['db.integritaet'],
      simple: `**Integrität** heißt: Die Daten sind korrekt, vollständig und widersprechen sich nicht. Die Datenbank prüft das mit Regeln, wie ein Türsteher mit Gästeliste: Ein Gerät darf nur einer Person zugeordnet werden, die es wirklich gibt (**referenzielle Integrität**), eine Inventarnummer darf nicht doppelt vorkommen (**Entitätsintegrität**), ein Preis darf nicht negativ sein. Verstößt eine Eingabe gegen eine Regel, lehnt das DBMS sie ab.

**Merke:** Referenzielle Integrität = jeder Fremdschlüsselwert verweist auf einen vorhandenen Primärschlüssel (oder ist NULL, wenn das erlaubt ist).`,
      steps: [
        {
          type: 'explain',
          title: 'Korrekte, vollständige und widerspruchsfreie Daten',
          body: `**Datenintegrität** bedeutet, dass die gespeicherten Daten **korrekt, vollständig und widerspruchsfrei** sind. Ein DBMS kann dafür Regeln (Integritätsbedingungen, engl. constraints) technisch erzwingen: Verstößt eine Änderung dagegen, wird sie abgelehnt.

| Art | Regel | Umsetzung im DBMS | Beispiel |
|---|---|---|---|
| **Entitätsintegrität** | Jeder Datensatz ist eindeutig identifizierbar. | PRIMARY KEY (eindeutig, nicht NULL) | Zwei Geräte mit InvNr G03 werden abgelehnt. |
| **Referenzielle Integrität** | Jeder Fremdschlüsselwert verweist auf einen **existierenden** Primärschlüssel (oder ist NULL, wenn erlaubt). | FOREIGN KEY … REFERENCES … | Ein Gerät mit PersNr 999 wird abgelehnt, wenn es keine Person 999 gibt. |
| **Domänenintegrität** (Wertebereich) | Werte passen zu Datentyp und Wertebereich. | Datentyp, NOT NULL, CHECK, DEFAULT | Preis = −50 wird durch CHECK (Preis >= 0) abgelehnt. |
| **Eindeutigkeit** weiterer Spalten | Werte dürfen nicht doppelt vorkommen. | UNIQUE | Seriennummer, E-Mail-Adresse |
| **Geschäftsregeln** (benutzerdefiniert) | fachliche Regeln des Unternehmens | CHECK, Trigger, Anwendungslogik | Notebooks dürfen nur an Mitarbeitende mit Vertrag ausgegeben werden. |

**Was passiert beim Löschen eines referenzierten Datensatzes?** Wird eine Person gelöscht, auf die noch Geräte verweisen, hängt das Verhalten von der **referenziellen Aktion** ab, die beim Fremdschlüssel festgelegt ist:

| Aktion | Wirkung beim Löschen der Person |
|---|---|
| \`RESTRICT\` / \`NO ACTION\` (üblicher Standard) | Löschen wird **abgelehnt**, solange noch Geräte auf sie verweisen. |
| \`CASCADE\` | Die verweisenden Geräte-Datensätze werden **mitgelöscht** (gefährlich!). |
| \`SET NULL\` | Der Fremdschlüssel der Geräte wird auf **NULL** gesetzt (Gerät ist danach niemandem zugeordnet). |

**Abgrenzung – drei ähnliche Begriffe:**
- **Datenintegrität:** Daten sind korrekt und widerspruchsfrei (dieses Kapitel).
- **Datensicherheit:** Schutz vor Verlust und Manipulation (Backup, Zugriffsschutz, USV).
- **Datenschutz:** Schutz personenbezogener Daten vor Missbrauch (DSGVO). Auch die Inventar-DB enthält personenbezogene Daten (wer hat welches Gerät)!

**Transaktionen:** Zusammengehörige Änderungen (z. B. „Gerät von Person A an Person B übergeben“) fasst das DBMS zu einer **Transaktion** zusammen: Entweder wird alles ausgeführt oder nichts. Die Eigenschaften heißen **ACID**: Atomarität (alles oder nichts), Konsistenz (Integritätsregeln gelten danach weiter), Isolation (parallele Transaktionen stören sich nicht), Dauerhaftigkeit (bestätigte Änderungen bleiben auch nach Absturz erhalten).`,
        },
        {
          type: 'visual',
          title: 'Integritätsbedingungen',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Entitätsintegrität', icon: 'KeyRound', text: 'PRIMARY KEY: eindeutig und nie NULL.' },
                { title: 'Referenzielle Integrität', icon: 'Link', text: 'FOREIGN KEY: Verweis nur auf vorhandene Datensätze.' },
                { title: 'Domänenintegrität', icon: 'ShieldCheck', text: 'Datentyp, NOT NULL, CHECK: nur gültige Werte.' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Verstöße in einem Datenimport finden',
          problem: `Aus der alten Excel-Liste sollen diese Geräte in die Datenbank importiert werden. In Mitarbeiter gibt es die PersNr 101, 102, 103 und 104. Die Tabelle Geraet hat PK InvNr, FK PersNr (NULL erlaubt) und CHECK (Preis >= 0).

| InvNr | Typ | Preis | PersNr |
|---|---|---|---|
| G11 | Notebook | 1090 | 104 |
| G12 | Monitor | 199 | 107 |
| G11 | Headset | 89 | 101 |
| G13 | Dockingstation | −240 | 103 |
| G14 | Drucker | 380 | NULL |

Welche Zeilen lehnt das DBMS ab und warum?`,
          steps: [
            { label: '1. Zeile G11 (Notebook)', body: 'PK neu, PersNr 104 existiert, Preis ≥ 0 → **ok**.' },
            { label: '2. Zeile G12', body: 'PersNr 107 gibt es in Mitarbeiter nicht → Verstoß gegen die **referenzielle Integrität** → abgelehnt.' },
            { label: '3. Zeile G11 (Headset)', body: 'InvNr G11 ist schon vergeben → Verstoß gegen die **Entitätsintegrität** (PK doppelt) → abgelehnt.' },
            { label: '4. Zeile G13', body: 'Preis −240 verletzt CHECK (Preis >= 0) → **Domänenintegrität** → abgelehnt.' },
            { label: '5. Zeile G14', body: 'PersNr NULL ist erlaubt (Gerät noch nicht ausgegeben) → **ok**.' },
          ],
          result: '3 von 5 Zeilen werden abgelehnt: G12 (referenzielle Integrität), zweites G11 (Entitätsintegrität), G13 (Domänenintegrität).',
        },
        {
          type: 'check',
          question: {
            id: 'd01-c09', kind: 'text', skill: 'db.integritaet', difficulty: 1,
            prompt: 'Wie heißt die Integritätsregel, nach der jeder Fremdschlüsselwert auf einen **vorhandenen** Primärschlüsselwert verweisen muss?',
            accept: ['referenzielle Integrität', 'referentielle Integrität', 'Referenzintegrität', 'referential integrity', 'referenzielle Integritaet', 'referentielle Integritaet'],
            explanation: '**Referenzielle Integrität**: Verweise (Fremdschlüssel) dürfen nur auf existierende Datensätze zeigen (oder NULL sein, wenn erlaubt).',
          },
        },
        {
          type: 'check',
          question: {
            id: 'd01-c10', kind: 'single', skill: 'db.integritaet', difficulty: 2,
            prompt: 'Der Fremdschlüssel Geraet.PersNr ist mit **ON DELETE SET NULL** definiert. Was passiert, wenn die Person 102 gelöscht wird, der zwei Geräte zugeordnet sind?',
            options: ['Das Löschen wird abgelehnt.', 'Die Person wird gelöscht, ihre zwei Geräte ebenfalls.', 'Die Person wird gelöscht, bei ihren zwei Geräten steht danach PersNr = NULL.', 'Die Person wird gelöscht, die Geräte behalten PersNr 102.'],
            answer: 2,
            distractors: {
              '0': { why: 'Das wäre RESTRICT bzw. NO ACTION.', error: 'db-referenzielle-aktion' },
              '1': { why: 'Das wäre ON DELETE CASCADE.', error: 'db-referenzielle-aktion' },
              '3': { why: 'Dann würden die Geräte auf eine nicht mehr existierende Person verweisen – das verhindert die referenzielle Integrität.', error: 'db-referenzielle-integritaet' },
            },
            explanation: 'SET NULL: Der Datensatz wird gelöscht, alle verweisenden Fremdschlüssel werden auf NULL gesetzt. Die Geräte bleiben erhalten, sind aber niemandem mehr zugeordnet.',
          },
        },
        { type: 'practice', title: 'Übung: Integrität', questionIds: ['d01-q024', 'd01-q025', 'd01-q026', 'd01-q029', 'd01-q030', 'd01-q031'], count: 5, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Integrität = Daten sind korrekt, vollständig, widerspruchsfrei.',
            'Entitätsintegrität (PK), referenzielle Integrität (FK), Domänenintegrität (Typ, NOT NULL, CHECK).',
            'Referenzielle Aktionen: RESTRICT/NO ACTION lehnt ab, CASCADE löscht mit, SET NULL setzt FK auf NULL.',
            'Nicht verwechseln: Datenintegrität ≠ Datensicherheit ≠ Datenschutz.',
            'Transaktionen nach ACID: alles oder nichts.',
          ],
        },
      ],
    },
  ],

  /* ================================================================ */
  questions: [
    {
      id: 'd01-q001', kind: 'text', skill: 'db.grundbegriffe', difficulty: 1,
      prompt: 'Wie nennt man die **Software**, die eine Datenbank verwaltet, Zugriffe regelt und Abfragen ausführt? (Begriff oder Abkürzung)',
      accept: ['DBMS', 'Datenbankmanagementsystem', 'Datenbank-Managementsystem', 'Datenbankmanagement-System', 'Database Management System', 'Datenbankverwaltungssystem', 'RDBMS'],
      misconceptions: [{ answer: 'DBS', error: 'db-dbms-verwechselt', why: 'DBS (Datenbanksystem) ist DB + DBMS zusammen. Die Verwaltungssoftware allein ist das DBMS.' }],
      explanation: 'Das **Datenbankmanagementsystem (DBMS)**, z. B. MariaDB, PostgreSQL oder Microsoft SQL Server. Bei relationalen Datenbanken spricht man auch von RDBMS.',
    },
    {
      id: 'd01-q002', kind: 'free', skill: 'db.grundbegriffe', difficulty: 1,
      prompt: 'Erläutere den Unterschied zwischen **Daten** und **Information** an einem Beispiel aus der Inventarverwaltung.',
      modelAnswer: 'Daten sind Zeichen oder Werte, die nach bestimmten Regeln dargestellt sind, z. B. „G07“, „1290“, „2025“. Für sich allein haben sie keine Aussage. Zu Informationen werden sie, wenn sie in einem Zusammenhang interpretiert werden und für jemanden einen Nutzen haben: „Das Notebook G07 wurde 2025 für 1.290 € angeschafft.“',
      keywords: ['Daten', 'Zeichen', 'Kontext', 'Bedeutung', 'Information'],
      explanation: 'Information = Daten + Bedeutung/Kontext. Eine Datenbank speichert Daten; durch Abfrage und Interpretation entstehen Informationen.',
    },
    {
      id: 'd01-q003', kind: 'match', skill: 'db.tabelle', difficulty: 1,
      prompt: 'Ordne die Fachbegriffe des relationalen Modells den Alltagsbegriffen zu.',
      left: ['Relation', 'Tupel', 'Attribut', 'Domäne'],
      right: ['Tabelle', 'Datensatz / Zeile', 'Spalte / Feld', 'Wertebereich einer Spalte'],
      answer: [0, 1, 2, 3],
      explanation: 'Relation = Tabelle, Tupel = Datensatz (Zeile), Attribut = Spalte, Domäne = Menge der erlaubten Werte eines Attributs.',
    },
    {
      id: 'd01-q004', kind: 'table', skill: 'db.tabelle', difficulty: 1,
      prompt: `${T_MA}\n\nBestimme für diese Tabelle die Anzahl der Datensätze und der Attribute.`,
      columns: [{ key: 'n', label: 'Anzahl', type: 'number' }],
      rows: [
        { label: 'Datensätze (Zeilen)', cells: { n: { answer: '4' } } },
        { label: 'Attribute (Spalten)', cells: { n: { answer: '4' } } },
      ],
      hints: ['Die Kopfzeile ist kein Datensatz.'],
      explanation: 'Datensätze = Zeilen ohne Kopfzeile: 101, 102, 103, 104 → **4**. Attribute = Spalten: PersNr, Name, Abteilung, StandortID → **4**.',
    },
    {
      id: 'd01-q005', kind: 'table', skill: 'db.tabelle', difficulty: 2,
      prompt: 'Wähle für jedes Attribut der Inventardatenbank einen passenden **SQL-Datentyp** (Typname genügt, z. B. INTEGER, DECIMAL, VARCHAR, CHAR, DATE, BOOLEAN).',
      columns: [{ key: 't', label: 'Datentyp', type: 'text' }],
      rows: [
        { label: 'Anschaffungspreis in Euro mit Cent', cells: { t: { answer: 'DECIMAL', accept: ['DECIMAL(8,2)', 'DECIMAL(10,2)', 'DECIMAL(7,2)', 'NUMERIC', 'NUMERIC(8,2)', 'NUMERIC(10,2)', 'DEC', 'Festkommazahl'] } } },
        { label: 'Anzahl der Lizenzen', cells: { t: { answer: 'INTEGER', accept: ['INT', 'SMALLINT', 'Ganzzahl'] } } },
        { label: 'Anschaffungsdatum', cells: { t: { answer: 'DATE', accept: ['Datum'] } } },
        { label: 'Seriennummer (z. B. PF3X9K2A)', cells: { t: { answer: 'VARCHAR', accept: ['VARCHAR(20)', 'VARCHAR(30)', 'VARCHAR(50)', 'CHAR', 'CHAR(8)', 'Text', 'Zeichenkette', 'String'] } } },
        { label: 'Garantie noch aktiv (ja/nein)', cells: { t: { answer: 'BOOLEAN', accept: ['BOOL', 'BIT', 'TINYINT(1)', 'Wahrheitswert'] } } },
      ],
      hints: ['Geldbeträge nie als FLOAT.', 'Seriennummern enthalten Buchstaben.'],
      explanation: 'Preis → **DECIMAL(8,2)** (exakt, keine Rundungsfehler). Anzahl → **INTEGER**. Datum → **DATE**. Seriennummer → **VARCHAR** (Buchstaben, keine Rechnung). Ja/Nein → **BOOLEAN** (in MySQL/MariaDB intern TINYINT(1)).',
    },
    {
      id: 'd01-q006', kind: 'free', skill: 'db.tabelle', difficulty: 2,
      prompt: 'Ein Kollege möchte die Telefonnummern der Standorte als **INTEGER** speichern, „weil es ja Zahlen sind“. Begründe, warum das ungeeignet ist, und nenne einen besseren Datentyp.',
      modelAnswer: 'Telefonnummern sind Kennungen, mit denen nicht gerechnet wird. Als INTEGER gehen führende Nullen verloren (040 … würde zu 40 …), Zeichen wie +, Leerzeichen, Klammern oder Bindestriche (+49 40 123456-0) sind nicht speicherbar, und lange Nummern können den Wertebereich überschreiten. Besser ist ein Texttyp wie VARCHAR(20).',
      keywords: ['führende Null', 'nicht rechnen', 'Sonderzeichen', 'VARCHAR'],
      explanation: 'Faustregel: Wenn man mit einem Wert nicht rechnet und er führende Nullen oder Sonderzeichen haben kann → Text.',
    },
    {
      id: 'd01-q007', kind: 'multi', skill: 'db.schluessel', difficulty: 1,
      prompt: 'Welche Aussagen über einen **Primärschlüssel** sind richtig?',
      options: ['Sein Wert ist in der Tabelle eindeutig.', 'Er darf nicht NULL sein.', 'Er sollte sich möglichst nie ändern.', 'Er muss immer eine Zahl sein.', 'Er darf in derselben Tabelle mehrfach vorkommen, wenn die Namen verschieden sind.'],
      answer: [0, 1, 2],
      explanation: 'Ein PK ist eindeutig, nie NULL und sollte stabil sein. Er kann auch Text sein (z. B. InvNr „G01“). Doppelte PK-Werte sind nie erlaubt.',
    },
    {
      id: 'd01-q008', kind: 'text', skill: 'db.schluessel', difficulty: 1,
      prompt: 'Wie heißt ein Attribut, das auf den **Primärschlüssel einer anderen Tabelle** verweist?',
      accept: ['Fremdschlüssel', 'Foreign Key', 'FK', 'Fremdschluessel'],
      misconceptions: [{ answer: 'Sekundärschlüssel', error: 'db-schluessel-begriffe', why: 'Sekundärschlüssel ist ein Begriff für Suchschlüssel/Indizes. Der Verweis auf eine andere Tabelle heißt Fremdschlüssel.' }],
      explanation: '**Fremdschlüssel** (foreign key, FK).',
    },
    {
      id: 'd01-q009', kind: 'multi', skill: 'db.schluessel', difficulty: 2,
      prompt: `Die Tabelle **Ausgabe** dokumentiert, welche Person welches Leihgerät erhalten hat:

| PersNr | InvNr | Ausgabedatum | Rueckgabedatum |
|---|---|---|---|
| 101 | L01 | 2026-01-12 | 2026-01-20 |
| 101 | L02 | 2026-03-02 | NULL |
| 103 | L01 | 2026-02-01 | 2026-02-03 |

Vereinfachung: Eine Person leiht dasselbe Gerät höchstens einmal. Welche Attribute bilden **zusammen** den Primärschlüssel?`,
      options: ['PersNr', 'InvNr', 'Ausgabedatum', 'Rueckgabedatum'],
      answer: [0, 1],
      hints: ['PersNr allein wiederholt sich (101), InvNr allein auch (L01).'],
      explanation: 'Weder PersNr noch InvNr ist allein eindeutig. Erst die Kombination **(PersNr, InvNr)** ist es → zusammengesetzter Primärschlüssel. Beide Attribute sind zugleich Fremdschlüssel.',
    },
    {
      id: 'd01-q010', kind: 'free', skill: 'db.schluessel', difficulty: 2,
      prompt: 'Erläutere den Unterschied zwischen einem **natürlichen** und einem **künstlichen** Schlüssel. Nenne je ein Beispiel aus der Inventarverwaltung und einen Vorteil des künstlichen Schlüssels.',
      modelAnswer: 'Ein natürlicher Schlüssel ist ein Attribut mit realer Bedeutung, das ohnehin eindeutig ist, z. B. die Seriennummer eines Geräts. Ein künstlicher Schlüssel (Surrogatschlüssel) wird nur für die Datenbank vergeben, meist als fortlaufende Nummer, z. B. GeraetID 1, 2, 3. Vorteil: Er ist garantiert eindeutig, kurz und ändert sich nie, auch wenn sich fachliche Daten ändern (z. B. Seriennummer falsch erfasst).',
      keywords: ['natürlich', 'reale Bedeutung', 'künstlich', 'Surrogat', 'stabil', 'eindeutig'],
      explanation: 'Künstliche Schlüssel sind stabil, kurz und eindeutig; natürliche Schlüssel können sich ändern oder sind nicht immer vorhanden.',
    },
    {
      id: 'd01-q011', kind: 'single', skill: 'db.schluessel', difficulty: 2,
      prompt: `${T_GER}\n\nWelche Aussage über die Spalte **PersNr** in Geraet ist richtig?`,
      options: [
        'Sie ist Primärschlüssel von Geraet und darf deshalb nicht doppelt vorkommen.',
        'Sie ist Fremdschlüssel; der Wert 102 darf mehrfach vorkommen und NULL ist erlaubt, wenn die Zuordnung optional ist.',
        'Sie ist ein Fehler, weil 102 doppelt vorkommt.',
        'Sie ist ein Schlüsselkandidat von Geraet.',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'Primärschlüssel von Geraet ist InvNr. PersNr verweist auf die Tabelle Mitarbeiter.', error: 'db-pk-fk-verwechselt' },
        '2': { why: 'Ein Fremdschlüssel darf mehrfach vorkommen – eine Person kann mehrere Geräte haben (1:n).', error: 'db-fk-eindeutig-geglaubt' },
        '3': { why: 'PersNr ist in Geraet nicht eindeutig (102 zweimal) und teils NULL – also kein Schlüsselkandidat.', error: 'db-pk-nicht-eindeutig' },
      },
      explanation: 'PersNr ist in Geraet **Fremdschlüssel**. Mehrfachwerte sind normal (eine Person, mehrere Geräte), NULL bedeutet „nicht zugeordnet“.',
    },
    {
      id: 'd01-q012', kind: 'number', skill: 'db.schluessel', difficulty: 2,
      prompt: `${T_MA}\n\n${T_GER}\n\nWie viele Geräte sind Mitarbeitenden der Abteilung **Vertrieb** zugeordnet?`,
      answer: 2,
      unit: 'Geräte',
      hints: ['Suche zuerst die PersNr der Vertriebsleute in Mitarbeiter.', 'Zähle dann in Geraet die Zeilen mit diesen PersNr.'],
      misconceptions: [{ answer: '3', error: 'db-fk-folgen', why: 'Du hast vermutlich auch Nowak (104) ein Gerät zugerechnet. In diesem Auszug hat 104 kein Gerät.' }],
      explanation: 'Vertrieb: PersNr 102 (Yilmaz) und 104 (Nowak). In Geraet: G02 (102), G03 (102); 104 kommt nicht vor → **2 Geräte**.',
    },
    {
      id: 'd01-q013', kind: 'single', skill: 'db.beziehungen', difficulty: 1,
      prompt: 'Jede Person bei Elektro Krämer hat höchstens einen **festen Parkplatz**, jeder Parkplatz ist höchstens einer Person fest zugeordnet. Welche Kardinalität liegt vor?',
      options: ['1:1', '1:n', 'n:m'],
      answer: 0,
      distractors: {
        '1': { why: 'Dann müsste eine Person mehrere Parkplätze haben können (oder umgekehrt).', error: 'db-kardinalitaet' },
        '2': { why: 'n:m hieße: Eine Person hat mehrere Parkplätze und ein Parkplatz mehrere Personen.', error: 'db-kardinalitaet' },
      },
      explanation: 'In beiden Richtungen „höchstens eins“ → **1:1**.',
    },
    {
      id: 'd01-q014', kind: 'table', skill: 'db.beziehungen', difficulty: 2,
      prompt: 'Bestimme für jede Beziehung die Kardinalität (Schreibweise **1:1**, **1:n** oder **n:m**, jeweils in der Reihenfolge der genannten Tabellen).',
      columns: [{ key: 'k', label: 'Kardinalität', type: 'text' }],
      rows: [
        { label: 'Abteilung – Mitarbeiter (jede Person gehört zu genau einer Abteilung)', cells: { k: { answer: '1:n', accept: ['1:N', '1 : n', '1:m', '1:*', '1 zu n'] } } },
        { label: 'Mitarbeiter – Schulung (Personen besuchen mehrere Schulungen, Schulungen haben mehrere Teilnehmende)', cells: { k: { answer: 'n:m', accept: ['m:n', 'N:M', 'M:N', 'n : m', 'm : n', 'n zu m', '*:*'] } } },
        { label: 'Server – Wartungsvertrag (je Server genau ein Vertrag, jeder Vertrag für genau einen Server)', cells: { k: { answer: '1:1', accept: ['1 : 1', '1 zu 1'] } } },
        { label: 'Lieferant – Bestellung (jede Bestellung geht an genau einen Lieferanten)', cells: { k: { answer: '1:n', accept: ['1:N', '1 : n', '1:m', '1:*', '1 zu n'] } } },
      ],
      hints: ['Frage in beide Richtungen: Wie viele B hat ein A? Wie viele A hat ein B?'],
      explanation: 'Abteilung–Mitarbeiter **1:n**; Mitarbeiter–Schulung **n:m** (Zwischentabelle Teilnahme); Server–Wartungsvertrag **1:1**; Lieferant–Bestellung **1:n**.',
    },
    {
      id: 'd01-q015', kind: 'free', skill: 'db.beziehungen', difficulty: 2,
      prompt: 'Auf jedem Gerät sind mehrere Programme installiert, und jedes Programm ist auf mehreren Geräten installiert. Erläutere, wie diese Beziehung in einer relationalen Datenbank umgesetzt wird. Gib die Tabellen mit Primär- und Fremdschlüsseln an.',
      modelAnswer: 'Es liegt eine n:m-Beziehung vor. Sie lässt sich nicht mit einem einzelnen Fremdschlüssel abbilden, weil „viele“ Werte nicht in eine Zelle passen. Man legt eine Zwischentabelle an: Geraet(InvNr [PK], Typ, …), Software(SoftwareID [PK], Bezeichnung, …), Installation(InvNr [FK → Geraet], SoftwareID [FK → Software], Installationsdatum). In Installation bilden InvNr und SoftwareID zusammen den Primärschlüssel. Die n:m-Beziehung wird so in zwei 1:n-Beziehungen aufgelöst.',
      keywords: ['n:m', 'Zwischentabelle', 'zwei Fremdschlüssel', 'zusammengesetzter Primärschlüssel', 'zwei 1:n'],
      explanation: 'n:m → Zwischentabelle mit beiden Fremdschlüsseln (zusammen PK). Aus einer n:m werden zwei 1:n-Beziehungen.',
    },
    {
      id: 'd01-q016', kind: 'number', skill: 'db.beziehungen', difficulty: 1,
      prompt: 'Zwischen **Mitarbeiter** und **Projekt** besteht eine n:m-Beziehung. Wie viele Tabellen benötigst du mindestens, um beide Entitäten und ihre Beziehung relational abzubilden?',
      answer: 3,
      unit: 'Tabellen',
      misconceptions: [{ answer: '2', error: 'db-zwischentabelle-vergessen', why: 'Eine n:m-Beziehung braucht eine eigene Zwischentabelle: Mitarbeiter, Projekt und z. B. Projektmitarbeit.' }],
      explanation: 'Mitarbeiter + Projekt + Zwischentabelle (z. B. Projektmitarbeit(PersNr, ProjektNr)) = **3 Tabellen**.',
    },
    {
      id: 'd01-q017', kind: 'number', skill: 'db.beziehungen', difficulty: 2,
      prompt: `Zwischentabelle **Installation**:

| InvNr | SoftwareID | Installationsdatum |
|---|---|---|
| G01 | S1 | 2025-01-10 |
| G01 | S2 | 2025-01-10 |
| G02 | S1 | 2025-02-03 |
| G05 | S1 | 2025-03-15 |
| G05 | S2 | 2025-03-15 |
| G05 | S3 | 2025-03-16 |
| G07 | S2 | 2025-06-01 |

Auf wie vielen Geräten ist die Software **S2** installiert?`,
      answer: 3,
      unit: 'Geräte',
      explanation: 'Zeilen mit SoftwareID S2: G01, G05, G07 → **3 Geräte**.',
    },
    {
      id: 'd01-q018', kind: 'single', skill: 'db.beziehungen', difficulty: 2,
      prompt: 'Bei der Beziehung Gerät – Software (n:m) soll zusätzlich gespeichert werden, **wann** ein Programm auf einem Gerät installiert wurde. Wohin gehört das Attribut Installationsdatum?',
      options: ['In die Tabelle Geraet', 'In die Tabelle Software', 'In die Zwischentabelle Installation', 'In eine eigene Tabelle Installationsdatum'],
      answer: 2,
      distractors: {
        '0': { why: 'Ein Gerät hat viele Programme mit verschiedenen Installationsdaten – das passt nicht in eine Zelle von Geraet.', error: 'db-beziehungsattribut' },
        '1': { why: 'Ein Programm wurde auf verschiedenen Geräten zu verschiedenen Zeiten installiert.', error: 'db-beziehungsattribut' },
        '3': { why: 'Das Datum beschreibt genau eine Verknüpfung Gerät–Software und gehört deshalb in die Zwischentabelle.', error: 'db-beziehungsattribut' },
      },
      explanation: 'Das Datum hängt von der **Kombination** Gerät + Software ab → Attribut der Beziehung → **Zwischentabelle**.',
    },
    {
      id: 'd01-q019', kind: 'single', skill: 'db.anomalien', difficulty: 1,
      prompt: 'Was versteht man unter **Redundanz** in einer Datenbank?',
      options: ['Dieselbe Information ist mehrfach gespeichert.', 'Eine Tabelle hat keinen Primärschlüssel.', 'Eine Datenbank wird auf zwei Server gespiegelt.', 'Ein Datensatz enthält NULL-Werte.'],
      answer: 0,
      distractors: {
        '1': { why: 'Das ist ein Entwurfsfehler (fehlende Entitätsintegrität), aber nicht die Definition von Redundanz.', error: 'db-redundanz-begriff' },
        '2': { why: 'Spiegelung ist gewollte Redundanz zur Ausfallsicherheit – im Datenbankentwurf meint Redundanz aber mehrfach gespeicherte Information in den Tabellen.', error: 'db-redundanz-begriff' },
        '3': { why: 'NULL bedeutet „kein Wert“, nicht mehrfach gespeichert.', error: 'db-redundanz-begriff' },
      },
      explanation: 'Redundanz = mehrfach gespeicherte gleiche Information, z. B. die Standortadresse in jeder Zeile einer Inventarliste.',
    },
    {
      id: 'd01-q020', kind: 'multi', skill: 'db.anomalien', difficulty: 1,
      prompt: 'Welche Folgen kann **unkontrollierte Redundanz** haben?',
      options: ['Widersprüchliche Daten (Inkonsistenz)', 'Höherer Pflegeaufwand bei Änderungen', 'Unnötig belegter Speicherplatz', 'Automatisch schnellere Datensicherung', 'Garantierte Datenintegrität'],
      answer: [0, 1, 2],
      explanation: 'Redundanz führt zu Inkonsistenzen (Änderungsanomalie), mehr Aufwand und mehr Speicherbedarf. Sie verbessert weder Sicherung noch Integrität.',
    },
    {
      id: 'd01-q021', kind: 'number', skill: 'db.anomalien', difficulty: 2,
      prompt: `${T_EXCEL}\n\nDer Standort **Berlin** zieht in die „Unter den Linden 10, 10117 Berlin“. Wie viele **Zellen** der Excel-Liste müssen geändert werden?`,
      answer: 3,
      unit: 'Zellen',
      hints: ['Wie viele Zeilen haben den Standort Berlin?', 'Welche Spalte ändert sich?'],
      explanation: 'Berlin-Zeilen: G02, G03, G07 → 3 Zeilen; je Zeile ändert sich nur die Standortadresse → **3 Zellen**. In einer normalisierten Datenbank wäre es genau 1 Zelle in der Tabelle Standort.',
    },
    {
      id: 'd01-q022', kind: 'free', skill: 'db.anomalien', difficulty: 3,
      prompt: `${T_EXCEL}\n\nDie Geschäftsführung fragt, warum die Liste „trotz Sorgfalt“ immer wieder Fehler enthält. Erläutere **zwei Anomalien** jeweils mit einem konkreten Beispiel aus dieser Liste und schlage eine Lösung vor.`,
      modelAnswer: 'Änderungsanomalie: Die Adresse des Standorts Berlin steht in drei Zeilen. Bei einer Änderung müssen alle drei angepasst werden; das ist schon einmal schiefgegangen (G07: „Friedrichstr.“ statt „Friedrichstraße“). Löschanomalie: Wird G01 als einziges Gerät von Weber ausgesondert und die Zeile gelöscht, geht auch die Information verloren, dass Weber in der IT arbeitet. (Alternativ Einfügeanomalie: Eine neue Mitarbeiterin ohne Gerät oder ein neuer Standort ohne Gerät kann nicht erfasst werden, weil jede Zeile eine InvNr braucht.) Lösung: Daten in verknüpfte Tabellen aufteilen (Standort, Mitarbeiter, Geraet) und über Primär- und Fremdschlüssel verbinden, also normalisieren. Dann steht jede Information nur einmal in der Datenbank.',
      keywords: ['Änderungsanomalie', 'Löschanomalie', 'Einfügeanomalie', 'Redundanz', 'Tabellen aufteilen', 'Normalisierung'],
      explanation: 'Gute Antworten nennen die Anomalie, verankern sie an konkreten Zeilen der Liste und begründen die Lösung (Normalisierung, Schlüssel).',
    },
    {
      id: 'd01-q023', kind: 'single', skill: 'db.anomalien', difficulty: 2,
      prompt: 'In der Excel-Inventarliste hat jede Zeile eine Inventarnummer. Eine neue Mitarbeiterin beginnt am Montag, ihr Notebook ist aber noch nicht geliefert. Ihre Daten können daher noch nicht erfasst werden. Welche Anomalie liegt vor?',
      options: ['Einfügeanomalie', 'Änderungsanomalie', 'Löschanomalie', 'Keine Anomalie, sondern ein Datenschutzproblem'],
      answer: 0,
      distractors: {
        '1': { why: 'Hier wird nichts geändert, sondern etwas neu eingetragen.', error: 'db-anomalie-art' },
        '2': { why: 'Es wird nichts gelöscht.', error: 'db-anomalie-art' },
        '3': { why: 'Datenschutz betrifft den Schutz personenbezogener Daten – hier geht es um die Struktur der Liste.', error: 'db-anomalie-art' },
      },
      explanation: 'Eine Information (neue Person) kann nicht ohne eine andere (Gerät) gespeichert werden → **Einfügeanomalie**.',
    },
    {
      id: 'd01-q024', kind: 'single', skill: 'db.integritaet', difficulty: 2,
      prompt: `${T_MA}\n\nDie Tabelle Geraet hat den Fremdschlüssel PersNr → Mitarbeiter.PersNr. Ein Kollege versucht, das Gerät **G20** mit **PersNr 109** einzutragen. Was passiert?`,
      options: [
        'Das DBMS lehnt den Datensatz ab (Verstoß gegen die referenzielle Integrität).',
        'Das DBMS legt automatisch eine Person 109 an.',
        'Der Datensatz wird gespeichert, PersNr wird auf NULL gesetzt.',
        'Der Datensatz wird gespeichert, weil G20 noch nicht existiert.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Ein DBMS legt keine fehlenden Datensätze in anderen Tabellen an.', error: 'db-referenzielle-integritaet' },
        '2': { why: 'Werte werden nicht stillschweigend verändert – das Einfügen schlägt fehl.', error: 'db-referenzielle-integritaet' },
        '3': { why: 'Der Primärschlüssel ist zwar neu, aber der Fremdschlüssel verweist auf eine nicht vorhandene Person.', error: 'db-referenzielle-integritaet' },
      },
      explanation: 'Es gibt keine Person 109 → der Verweis wäre ungültig → das DBMS verweigert das Einfügen (**referenzielle Integrität**).',
    },
    {
      id: 'd01-q025', kind: 'free', skill: 'db.integritaet', difficulty: 2,
      prompt: 'Erläutere den Begriff **Entitätsintegrität** und nenne, wie ein DBMS sie sicherstellt.',
      modelAnswer: 'Entitätsintegrität bedeutet, dass jeder Datensatz einer Tabelle eindeutig identifizierbar ist. Das DBMS stellt sie über den Primärschlüssel sicher: Der Primärschlüsselwert muss eindeutig sein und darf nicht NULL sein. Versucht man, einen doppelten oder leeren Schlüssel einzutragen, lehnt das DBMS den Datensatz ab.',
      keywords: ['eindeutig', 'Primärschlüssel', 'nicht NULL', 'ablehnen'],
      explanation: 'Entitätsintegrität = PK eindeutig + NOT NULL.',
    },
    {
      id: 'd01-q026', kind: 'multi', skill: 'db.integritaet', difficulty: 2,
      prompt: 'Welche der folgenden Regeln kann ein DBMS **technisch erzwingen**?',
      options: ['InvNr darf nicht doppelt vorkommen (PRIMARY KEY)', 'PersNr in Geraet muss in Mitarbeiter existieren (FOREIGN KEY)', 'Preis darf nicht negativ sein (CHECK)', 'Typ muss immer ausgefüllt sein (NOT NULL)', 'Der eingetragene Hersteller ist tatsächlich der richtige'],
      answer: [0, 1, 2, 3],
      explanation: 'PK, FK, CHECK und NOT NULL sind Integritätsbedingungen. Ob ein formal gültiger Wert inhaltlich stimmt (richtiger Hersteller), kann das DBMS nicht wissen – dafür braucht es organisatorische Kontrollen.',
    },
    {
      id: 'd01-q027', kind: 'free', skill: 'db.vergleich', difficulty: 2,
      prompt: 'Die Elektro Krämer GmbH pflegt ihr Inventar (ca. 450 Geräte) in einer Excel-Datei, die drei Personen bearbeiten. Nenne und erläutere **drei Vorteile**, die eine relationale Datenbank gegenüber dieser Tabellenkalkulation bietet.',
      modelAnswer: '1. Mehrbenutzerbetrieb: Mehrere Personen können gleichzeitig arbeiten, das DBMS verhindert über Sperren/Transaktionen, dass Änderungen überschrieben werden; keine konkurrierenden Dateikopien. 2. Weniger Redundanz: Standorte und Mitarbeitende werden einmal gespeichert und über Schlüssel verknüpft; Änderungen erfolgen an genau einer Stelle, Anomalien werden vermieden. 3. Datenintegrität: Primärschlüssel verhindern doppelte Inventarnummern, Fremdschlüssel verhindern Verweise auf nicht vorhandene Personen, Datentypen und CHECK-Regeln verhindern ungültige Werte. Weitere: feine Zugriffsrechte je Rolle, Abfragen mit SQL, Anbindung anderer Anwendungen (Ticketsystem), große Datenmengen.',
      keywords: ['Mehrbenutzer', 'Redundanz', 'Integrität', 'Zugriffsrechte', 'Schlüssel', 'Abfragen'],
      explanation: 'Gute Antworten nennen den Vorteil **und** erklären ihn am Szenario (Operator „erläutern“).',
    },
    {
      id: 'd01-q028', kind: 'single', skill: 'db.vergleich', difficulty: 2,
      prompt: 'In welchem Fall ist eine **Tabellenkalkulation** einer Datenbank am ehesten vorzuziehen?',
      options: [
        'Eine Azubine erstellt einmalig eine Kostenübersicht für 15 neue Monitore mit Diagramm.',
        'Das Ticketsystem und die Buchhaltung sollen gleichzeitig auf die Gerätedaten zugreifen.',
        'Zehn Personen an zwei Standorten pflegen das Inventar parallel.',
        'Es sollen 50.000 Lizenzschlüssel mit Zuordnung zu Geräten verwaltet werden.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Anbindung mehrerer Anwendungen spricht klar für eine Datenbank.', error: 'db-vergleich' },
        '2': { why: 'Paralleles Arbeiten vieler Personen ist eine Stärke von Datenbanken.', error: 'db-vergleich' },
        '3': { why: 'Große, verknüpfte Datenmengen sprechen für eine Datenbank.', error: 'db-vergleich' },
      },
      explanation: 'Kleine, einmalige Einzelauswertung mit Diagramm durch eine Person → Tabellenkalkulation ist schneller und ausreichend.',
    },
    {
      id: 'd01-q029', kind: 'order', skill: 'db.grundbegriffe', difficulty: 1,
      prompt: 'Bringe die Stationen einer Datenabfrage in die richtige Reihenfolge – vom Anwender bis zu den gespeicherten Daten.',
      items: ['Anwenderin klickt in der Inventar-App auf „Suchen“', 'Die Anwendung sendet eine SQL-Abfrage', 'Das DBMS prüft Rechte und führt die Abfrage aus', 'Die Datenbankdateien werden gelesen'],
      explanation: 'Anwender → Anwendung (Client) → DBMS → Datenbank (Dateien). Das Ergebnis läuft den Weg zurück.',
    },
    {
      id: 'd01-q030', kind: 'number', skill: 'db.integritaet', difficulty: 3,
      prompt: `In der Tabelle Mitarbeiter gibt es die PersNr **101, 102, 103, 104 und 105**. Ein Import in die Tabelle Geraet (PK InvNr, FK PersNr mit NULL erlaubt, CHECK Preis >= 0) enthält:

| InvNr | Typ | Preis | PersNr |
|---|---|---|---|
| G21 | Notebook | 1199 | 105 |
| G22 | Monitor | 189 | 110 |
| G23 | Headset | 79 | NULL |
| G21 | Maus | 25 | 101 |
| G24 | Dockingstation | −199 | 102 |
| G25 | Desktop | 849 | 106 |

Die Zeilen werden einzeln nacheinander eingefügt. Wie viele Zeilen werden **abgelehnt**?`,
      answer: 4,
      unit: 'Zeilen',
      hints: ['Prüfe je Zeile: PK neu? FK vorhanden oder NULL? CHECK erfüllt?'],
      misconceptions: [
        { answer: '3', error: 'db-integritaet-pruefen', why: 'Prüfe auch G25: Gibt es die PersNr 106?' },
        { answer: '5', error: 'db-integritaet-pruefen', why: 'G23 mit PersNr NULL ist erlaubt (NULL im FK zulässig).' },
      ],
      explanation: 'G21 (1199) ok. G22: PersNr 110 fehlt → abgelehnt. G23: NULL erlaubt → ok. G21 (Maus): PK doppelt → abgelehnt. G24: Preis negativ → abgelehnt. G25: PersNr 106 fehlt → abgelehnt. **4 Zeilen** abgelehnt.',
    },
    {
      id: 'd01-q031', kind: 'single', skill: 'db.integritaet', difficulty: 3,
      prompt: 'Der Fremdschlüssel Mitarbeiter.StandortID → Standort.StandortID wurde **ohne** Angabe einer referenziellen Aktion angelegt (Standardverhalten NO ACTION). Die IT versucht, den Standort 2 (Berlin) zu löschen, dem noch 38 Mitarbeitende zugeordnet sind. Was passiert?',
      options: ['Das Löschen wird abgelehnt.', 'Der Standort und alle 38 Mitarbeitenden werden gelöscht.', 'Der Standort wird gelöscht, die StandortID der 38 Personen wird NULL.', 'Der Standort wird gelöscht, die Personen behalten StandortID 2.'],
      answer: 0,
      distractors: {
        '1': { why: 'Das wäre ON DELETE CASCADE – muss ausdrücklich festgelegt werden.', error: 'db-referenzielle-aktion' },
        '2': { why: 'Das wäre ON DELETE SET NULL – muss ausdrücklich festgelegt werden.', error: 'db-referenzielle-aktion' },
        '3': { why: 'Dann gäbe es Verweise ins Leere; genau das verhindert die referenzielle Integrität.', error: 'db-referenzielle-integritaet' },
      },
      explanation: 'Standard (NO ACTION bzw. RESTRICT): Ein Datensatz, auf den noch verwiesen wird, darf nicht gelöscht werden. Erst Personen umziehen lassen (StandortID ändern), dann Standort löschen.',
    },
    {
      id: 'd01-q032', kind: 'free', skill: 'db.integritaet', difficulty: 2,
      prompt: 'Grenze die Begriffe **Datenintegrität**, **Datensicherheit** und **Datenschutz** am Beispiel der Inventar-Datenbank voneinander ab.',
      modelAnswer: 'Datenintegrität: Die Daten sind korrekt, vollständig und widerspruchsfrei, z. B. keine doppelte Inventarnummer, keine Geräte, die auf nicht vorhandene Personen verweisen (PK, FK, CHECK). Datensicherheit: Schutz der Daten vor Verlust, Zerstörung und unbefugter Veränderung, z. B. tägliches Backup der Datenbank, USV, Zugriffsrechte. Datenschutz: Schutz personenbezogener Daten vor Missbrauch nach DSGVO; die Inventar-DB enthält personenbezogene Daten (wer hat welches Gerät), daher nur berechtigte Personen mit Zweckbindung zugreifen lassen.',
      keywords: ['korrekt', 'widerspruchsfrei', 'Backup', 'Verlust', 'personenbezogen', 'DSGVO'],
      explanation: 'Integrität = Korrektheit der Daten; Sicherheit = Schutz vor Verlust/Manipulation; Datenschutz = Schutz der Personen, deren Daten verarbeitet werden.',
    },
    {
      id: 'd01-q033', kind: 'text', skill: 'db.beziehungen', difficulty: 1,
      prompt: 'Wie nennt man die zusätzliche Tabelle, mit der eine **n:m-Beziehung** aufgelöst wird? (ein Begriff)',
      accept: ['Zwischentabelle', 'Verbindungstabelle', 'Zuordnungstabelle', 'Koppeltabelle', 'Beziehungstabelle', 'Hilfstabelle', 'Assoziationstabelle', 'Verknüpfungstabelle', 'Junction Table', 'Link-Tabelle', 'Linktabelle'],
      explanation: '**Zwischentabelle** (auch Verbindungs-, Zuordnungs- oder Koppeltabelle). Sie enthält die Fremdschlüssel beider Tabellen.',
    },
  ],
};
