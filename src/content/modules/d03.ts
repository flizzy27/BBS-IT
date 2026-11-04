import type { Module } from '../types';

/** SQL-Codeblock für Markdown */
const sql = (s: string) => '```sql\n' + s + '\n```';

/* Belegtabellen der Inventar-Datenbank (alle Ergebnisse mit SQLite nachgerechnet) */
const T_GER = `Tabelle **Geraet**:

| InvNr | Typ | Hersteller | Preis | Kaufjahr | PersNr |
|---|---|---|---|---|---|
| G01 | Notebook | Lenovo | 1150 | 2023 | 101 |
| G02 | Notebook | Dell | 980 | 2022 | 102 |
| G03 | Monitor | Dell | 210 | 2022 | 102 |
| G04 | Drucker | HP | 420 | 2021 | NULL |
| G05 | Desktop | Lenovo | 760 | 2024 | 103 |
| G06 | Monitor | LG | 185 | 2024 | 103 |
| G07 | Notebook | Lenovo | 1290 | 2025 | 104 |
| G08 | Smartphone | Samsung | 540 | 2024 | 101 |
| G09 | Monitor | Dell | 210 | 2023 | NULL |
| G10 | Notebook | HP | 1040 | 2024 | 106 |`;

const T_MA = `Tabelle **Mitarbeiter**:

| PersNr | Name | Abteilung | StandortID |
|---|---|---|---|
| 101 | Weber | IT | 1 |
| 102 | Yilmaz | Vertrieb | 2 |
| 103 | Schulz | Buchhaltung | 1 |
| 104 | Nowak | Vertrieb | 2 |
| 105 | Becker | Lager | 3 |
| 106 | Krüger | IT | 1 |`;

const T_ST = `Tabelle **Standort**:

| StandortID | Stadt | Bezeichnung |
|---|---|---|
| 1 | Hamburg | Zentrale |
| 2 | Berlin | Vertriebsbüro |
| 3 | Hamburg | Lager |`;

export const d03: Module = {
  id: 'd03',
  nr: 3,
  area: 'daten',
  title: 'SQL-Grundlagen',
  short: 'Daten abfragen und ändern mit SQL: SELECT, WHERE, ORDER BY, Aggregatfunktionen, GROUP BY/HAVING, JOINs, INSERT/UPDATE/DELETE und CREATE TABLE.',
  icon: 'Terminal',
  relevance: 'vertiefung',
  prerequisites: ['d01', 'd02'],
  generators: ['daten.zeilen', 'daten.aggregat', 'daten.join'],
  skills: [
    { id: 'sql.select', module: 'd03', title: 'SELECT mit WHERE, ORDER BY und Filteroperatoren', requires: ['db.tabelle'] },
    { id: 'sql.aggregat', module: 'd03', title: 'Aggregatfunktionen, GROUP BY und HAVING', requires: ['sql.select'] },
    { id: 'sql.join', module: 'd03', title: 'Tabellen verknüpfen mit JOIN', requires: ['sql.select', 'db.schluessel'] },
    { id: 'sql.dml', module: 'd03', title: 'Daten ändern: INSERT, UPDATE, DELETE', requires: ['sql.select'] },
    { id: 'sql.ddl', module: 'd03', title: 'Tabellen anlegen: CREATE TABLE', requires: ['db.integritaet', 'dm.tabellenmodell'] },
  ],
  lessons: [
    /* ------------------------------------------------------------ */
    {
      id: 'd03-l01',
      title: 'SQL im Überblick und erste Abfragen',
      minutes: 25,
      relevance: 'vertiefung',
      skills: ['sql.select'],
      simple: `**SQL** (Structured Query Language) ist die Sprache, mit der du einer Datenbank Fragen stellst – wie eine Bestellung im Restaurant: Du sagst, **was** du willst, nicht **wie** die Küche es zubereitet. \`SELECT\` nennt die gewünschten Spalten, \`FROM\` die Tabelle und \`WHERE\` die Bedingung für die Zeilen. Laut Prüfungskatalog 2025 gehört SQL zur AP2 – für die AP1 ist dieses Modul Vertiefung.

**Merke:** Grundform: SELECT Spalten FROM Tabelle WHERE Bedingung;`,
      steps: [
        {
          type: 'explain',
          title: 'Was ist SQL – und ist das prüfungsrelevant?',
          body: `**SQL** (Structured Query Language) ist die Standardsprache für relationale Datenbanken. Sie ist international genormt (ISO/IEC 9075), jedes DBMS hat aber einen eigenen **Dialekt** mit kleinen Unterschieden (MySQL/MariaDB, PostgreSQL, Microsoft SQL Server, Oracle, SQLite). Die Grundbefehle in diesem Modul funktionieren überall gleich.

**Prüfungsrelevanz (ehrlich):** Laut IHK Hannover ist SQL mit dem Prüfungskatalog 2025 **in den Teil 2 (AP2)** gewandert. In Themenübersichten früherer AP1-Termine (alter Katalog, bis 2024) tauchten noch SELECT-Abfragen auf Basis eines ERM auf; diese Übersichten sind allerdings nicht amtlich. Dieses Modul ist deshalb **Vertiefung**: für die AP2, für den Betrieb (Datenbankserver administrieren, Daten aus Fachanwendungen prüfen) und als Absicherung, falls eine AP1-Aufgabe doch eine einfache Abfrage zum Lesen enthält.

**Befehlsgruppen**

| Gruppe | Bedeutung | Befehle |
|---|---|---|
| **DDL** – Data Definition Language | Struktur festlegen | \`CREATE\`, \`ALTER\`, \`DROP\` |
| **DML** – Data Manipulation Language | Daten ändern | \`INSERT\`, \`UPDATE\`, \`DELETE\` |
| **DQL** – Data Query Language | Daten abfragen | \`SELECT\` (wird oft auch zur DML gezählt) |
| **DCL** – Data Control Language | Rechte vergeben | \`GRANT\`, \`REVOKE\` |
| **TCL** – Transaction Control Language | Transaktionen steuern | \`COMMIT\`, \`ROLLBACK\` |

**Schreibregeln**
- Schlüsselwörter schreibt man üblicherweise GROSS (\`SELECT\`), nötig ist das nicht.
- **Texte** und Datumswerte stehen in **einfachen Anführungszeichen**: \`'Notebook'\`. Zahlen ohne: \`1000\`.
- Eine Anweisung endet mit einem **Semikolon**.
- Spalten- und Tabellennamen am besten ohne Umlaute und Leerzeichen (\`Geraet\` statt \`Gerät\`).

**Die Inventar-Datenbank für dieses Modul**

${T_GER}

${T_MA}

${T_ST}`,
        },
        {
          type: 'explain',
          title: 'SELECT … FROM … WHERE',
          body: `Die Grundform einer Abfrage:

${sql(`SELECT Spalte1, Spalte2   -- welche Spalten?
FROM Tabelle              -- aus welcher Tabelle?
WHERE Bedingung;          -- welche Zeilen?`)}

- \`SELECT *\` liefert **alle Spalten**.
- Ohne \`WHERE\` werden **alle Zeilen** geliefert.
- Das Ergebnis ist wieder eine Tabelle (Ergebnistabelle).

**Vergleichsoperatoren**

| Operator | Bedeutung | Beispiel |
|---|---|---|
| \`=\` | gleich | \`Typ = 'Monitor'\` |
| \`<>\` (auch \`!=\`) | ungleich | \`Abteilung <> 'IT'\` |
| \`<\`, \`>\` | kleiner, größer | \`Preis > 500\` |
| \`<=\`, \`>=\` | kleiner gleich, größer gleich | \`Kaufjahr >= 2024\` |

**Logische Operatoren:** \`AND\` (beide Bedingungen), \`OR\` (mindestens eine), \`NOT\` (Verneinung).

**Achtung Vorrang:** \`AND\` bindet **stärker** als \`OR\` (wie Punkt- vor Strichrechnung). Im Zweifel **Klammern** setzen:

${sql(`WHERE Typ = 'Notebook' OR Typ = 'Monitor' AND Preis < 200
-- wird gelesen als:
WHERE Typ = 'Notebook' OR (Typ = 'Monitor' AND Preis < 200)`)}

Die erste Abfrage liefert also **alle** Notebooks plus die billigen Monitore – meist nicht das, was gemeint war.`,
        },
        {
          type: 'visual',
          title: 'Die Bausteine einer Abfrage',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'SELECT', icon: 'Columns3', text: 'Welche Spalten sollen im Ergebnis stehen? * = alle.' },
                { title: 'FROM', icon: 'Table', text: 'Aus welcher Tabelle (oder welchen verknüpften Tabellen)?' },
                { title: 'WHERE', icon: 'Filter', text: 'Welche Zeilen? Bedingungen mit =, <>, <, >, AND, OR.' },
                { title: 'ORDER BY', icon: 'ArrowUpDown', text: 'Sortierung des Ergebnisses: ASC (aufsteigend) oder DESC.' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Eine Abfrage im Kopf ausführen',
          problem: `Welche Ergebnistabelle liefert diese Abfrage auf der Tabelle Geraet, und wie viele Zeilen hat sie?

${sql(`SELECT InvNr, Preis
FROM Geraet
WHERE Typ = 'Notebook' AND Preis > 1000;`)}`,
          steps: [
            { label: '1. FROM', body: 'Ausgangspunkt sind alle 10 Zeilen der Tabelle Geraet.' },
            { label: '2. WHERE Teil 1', body: 'Typ = \'Notebook\' → G01 (1150), G02 (980), G07 (1290), G10 (1040).' },
            { label: '3. WHERE Teil 2 (AND)', body: 'Davon Preis > 1000: G01, G07, G10. G02 fällt heraus (980 ist nicht größer als 1000).' },
            { label: '4. SELECT', body: 'Nur die Spalten InvNr und Preis werden ausgegeben.' },
          ],
          result: '3 Zeilen: G01 | 1150, G07 | 1290, G10 | 1040 (ohne ORDER BY ist die Reihenfolge nicht garantiert).',
        },
        {
          type: 'check',
          question: {
            id: 'd03-c01', kind: 'number', skill: 'sql.select', difficulty: 1,
            prompt: `${T_GER}\n\n${sql(`SELECT * FROM Geraet WHERE Preis > 500;`)}\n\nWie viele Zeilen liefert die Abfrage?`,
            answer: 6,
            unit: 'Zeilen',
            hints: ['Gehe die Spalte Preis durch und zähle alle Werte über 500.'],
            explanation: 'Preis > 500: G01 (1150), G02 (980), G05 (760), G07 (1290), G08 (540), G10 (1040) → **6 Zeilen**.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'd03-c02', kind: 'single', skill: 'sql.select', difficulty: 1,
            prompt: 'Welche WHERE-Bedingung ist **syntaktisch richtig**, um alle Monitore zu finden?',
            options: ["WHERE Typ = 'Monitor'", 'WHERE Typ = Monitor', 'WHERE Typ == "Monitor" AND', "WHERE 'Typ' = Monitor"],
            answer: 0,
            distractors: {
              '1': { why: 'Ohne Anführungszeichen hält das DBMS „Monitor“ für einen Spaltennamen.', error: 'sql-text-ohne-anfuehrungszeichen' },
              '2': { why: 'In SQL vergleicht man mit einem `=`; außerdem fehlt nach AND eine zweite Bedingung.', error: 'sql-syntax' },
              '3': { why: "Spaltennamen stehen nicht in einfachen Anführungszeichen – 'Typ' wäre ein Text.", error: 'sql-syntax' },
            },
            explanation: "Texte in **einfache** Anführungszeichen, Vergleich mit einem `=`: `WHERE Typ = 'Monitor'`.",
          },
        },
        { type: 'practice', title: 'Übung: Wie viele Zeilen?', generator: 'daten.zeilen', count: 4, difficulty: 1 },
        { type: 'practice', title: 'Übung: Abfragen lesen', questionIds: ['d03-q001', 'd03-q002', 'd03-q003', 'd03-q004', 'd03-q034'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'SQL ist seit dem Katalog 2025 AP2-Stoff; Grundlagen lohnen sich trotzdem.',
            'DDL (CREATE/ALTER/DROP), DML (INSERT/UPDATE/DELETE), DQL (SELECT), DCL (GRANT/REVOKE).',
            'SELECT Spalten FROM Tabelle WHERE Bedingung; – Texte in einfachen Anführungszeichen.',
            'AND bindet stärker als OR – im Zweifel Klammern setzen.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'd03-l02',
      title: 'Sortieren und gezielt filtern',
      minutes: 20,
      relevance: 'vertiefung',
      skills: ['sql.select'],
      simple: `Mit \`ORDER BY\` sortierst du das Ergebnis, z. B. nach Preis (\`ASC\` aufsteigend, \`DESC\` absteigend). \`DISTINCT\` entfernt doppelte Ergebniszeilen. Zum Filtern gibt es Werkzeuge wie Siebe mit verschiedenen Löchern: \`BETWEEN\` für Bereiche (beide Grenzen zählen mit), \`IN\` für Wertelisten, \`LIKE\` für Muster (\`%\` = beliebig viele Zeichen) und \`IS NULL\` für leere Felder.

**Merke:** Leere Felder (NULL) findest du nur mit IS NULL, nie mit = NULL.`,
      steps: [
        {
          type: 'explain',
          title: 'ORDER BY, DISTINCT, LIKE, BETWEEN, IN, IS NULL',
          body: `| Element | Wirkung | Beispiel |
|---|---|---|
| \`ORDER BY Spalte ASC\` | aufsteigend sortieren (Standard) | \`ORDER BY Preis\` |
| \`ORDER BY Spalte DESC\` | absteigend sortieren | \`ORDER BY Preis DESC\` |
| \`ORDER BY A, B\` | erst nach A, bei Gleichstand nach B | \`ORDER BY Typ, Preis DESC\` |
| \`DISTINCT\` | doppelte Ergebniszeilen entfernen | \`SELECT DISTINCT Hersteller\` |
| \`LIKE\` | Textmuster: \`%\` = beliebig viele Zeichen, \`_\` = genau ein Zeichen | \`Name LIKE 'B%'\` |
| \`BETWEEN a AND b\` | Bereich **einschließlich** der Grenzen | \`Preis BETWEEN 200 AND 500\` |
| \`IN (…)\` | Wert ist in einer Liste | \`Hersteller IN ('Dell', 'HP')\` |
| \`IS NULL\` / \`IS NOT NULL\` | Feld ist leer / nicht leer | \`PersNr IS NULL\` |
| \`AS\` | Alias (anderer Name) für eine Spalte im Ergebnis | \`Preis AS Euro\` |

**Die NULL-Falle:** \`WHERE PersNr = NULL\` liefert **nie** eine Zeile, denn ein Vergleich mit NULL ergibt weder wahr noch falsch, sondern „unbekannt“. Richtig ist \`WHERE PersNr IS NULL\`.

**Sortierung und Gleichstand:** Bei gleichen Werten (zwei Monitore zu 210 €) ist die Reihenfolge ohne zweites Sortierkriterium nicht festgelegt. Ohne \`ORDER BY\` ist die Reihenfolge des Ergebnisses überhaupt nicht garantiert.

**Nur die ersten Zeilen:** Das geht je nach DBMS unterschiedlich: \`LIMIT 3\` (MySQL, MariaDB, PostgreSQL, SQLite), \`SELECT TOP 3\` (SQL Server) oder standardkonform \`FETCH FIRST 3 ROWS ONLY\`.

**Groß-/Kleinschreibung bei LIKE** hängt vom DBMS bzw. der Sortierregel (Collation) ab. In MySQL/MariaDB mit Standard-Collation ist \`LIKE 'b%'\` meist unabhängig von der Schreibweise, in PostgreSQL nicht.`,
        },
        {
          type: 'visual',
          title: 'Filterwerkzeuge',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'BETWEEN', icon: 'ArrowUpDown', text: 'Grenzen gehören dazu: BETWEEN 210 AND 760 schließt 210 und 760 ein.' },
                { title: 'LIKE', icon: 'Search', text: "% = beliebig viele Zeichen, _ = genau eins. '%er' = endet auf er." },
                { title: 'IS NULL', icon: 'Circle', text: '= NULL ist nie wahr. Immer IS NULL bzw. IS NOT NULL verwenden.' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Bereich filtern und sortieren',
          problem: `Ermittle das Ergebnis:

${sql(`SELECT InvNr, Preis
FROM Geraet
WHERE Preis BETWEEN 210 AND 760
ORDER BY Preis DESC;`)}`,
          steps: [
            { label: '1. Bereich prüfen', body: 'Preise von 210 bis 760 **einschließlich**: G03 (210), G04 (420), G05 (760), G08 (540), G09 (210). G06 (185) liegt darunter.' },
            { label: '2. Absteigend sortieren', body: '760 → 540 → 420 → 210 → 210.' },
            { label: '3. Gleichstand', body: 'G03 und G09 kosten beide 210 €. Ihre Reihenfolge ist nicht festgelegt (kein zweites Sortierkriterium).' },
          ],
          result: '5 Zeilen: G05 760, G08 540, G04 420, dann G03 und G09 mit je 210 (in beliebiger Reihenfolge).',
        },
        {
          type: 'check',
          question: {
            id: 'd03-c03', kind: 'number', skill: 'sql.select', difficulty: 2,
            prompt: `${T_GER}\n\n${sql(`SELECT InvNr FROM Geraet WHERE PersNr IS NULL;`)}\n\nWie viele Zeilen liefert die Abfrage?`,
            answer: 2,
            unit: 'Zeilen',
            misconceptions: [{ answer: '0', error: 'sql-null-vergleich', why: 'Mit `= NULL` käme 0 heraus. `IS NULL` findet die beiden Geräte ohne Zuordnung.' }],
            explanation: 'PersNr ist NULL bei G04 und G09 → **2 Zeilen**.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'd03-c04', kind: 'text', skill: 'sql.select', difficulty: 1,
            prompt: `${T_GER}\n\n${sql(`SELECT InvNr, Preis FROM Geraet ORDER BY Preis ASC;`)}\n\nWelche **InvNr** steht in der **ersten Zeile** des Ergebnisses?`,
            accept: ['G06'],
            misconceptions: [{ answer: 'G07', error: 'sql-order-richtung', why: 'G07 ist das teuerste Gerät – das stünde bei DESC oben. ASC beginnt mit dem kleinsten Wert.' }],
            explanation: 'ASC = aufsteigend, der kleinste Preis zuerst: G06 mit 185 €.',
          },
        },
        { type: 'practice', title: 'Übung: Filtern', generator: 'daten.zeilen', count: 4, difficulty: 2 },
        { type: 'practice', title: 'Übung: Sortieren und Filtern', questionIds: ['d03-q005', 'd03-q006', 'd03-q007', 'd03-q008', 'd03-q035', 'd03-q036', 'd03-q040'], count: 5, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'ORDER BY … ASC/DESC sortiert; ohne ORDER BY keine garantierte Reihenfolge.',
            'DISTINCT entfernt doppelte Ergebniszeilen.',
            "LIKE mit % und _; BETWEEN schließt die Grenzen ein; IN ('a','b') für Listen.",
            'NULL nur mit IS NULL / IS NOT NULL prüfen.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'd03-l03',
      title: 'Aggregatfunktionen: zählen, summieren, Durchschnitt',
      minutes: 20,
      relevance: 'vertiefung',
      skills: ['sql.aggregat'],
      simple: `Aggregatfunktionen fassen viele Zeilen zu **einem** Wert zusammen – wie der Kassenbon, der am Ende nur die Summe zeigt. \`COUNT\` zählt, \`SUM\` addiert, \`AVG\` bildet den Durchschnitt, \`MIN\` und \`MAX\` finden den kleinsten und größten Wert. Leere Felder (NULL) werden dabei übersprungen – nur \`COUNT(*)\` zählt wirklich alle Zeilen.

**Merke:** COUNT(*) zählt alle Zeilen, COUNT(Spalte) nur die Zeilen, in denen diese Spalte einen Wert hat.`,
      steps: [
        {
          type: 'explain',
          title: 'COUNT, SUM, AVG, MIN, MAX',
          body: `Aggregatfunktionen fassen **viele Zeilen zu einem Wert** zusammen. Ohne \`GROUP BY\` liefert die Abfrage genau **eine Ergebniszeile**.

| Funktion | Ergebnis | NULL-Werte |
|---|---|---|
| \`COUNT(*)\` | Anzahl der Zeilen | werden **mitgezählt** |
| \`COUNT(Spalte)\` | Anzahl der Zeilen, in denen die Spalte **nicht NULL** ist | werden **nicht** gezählt |
| \`COUNT(DISTINCT Spalte)\` | Anzahl **verschiedener** Werte | nicht gezählt |
| \`SUM(Spalte)\` | Summe | ignoriert |
| \`AVG(Spalte)\` | Durchschnitt = Summe / Anzahl der Nicht-NULL-Werte | ignoriert |
| \`MIN(Spalte)\`, \`MAX(Spalte)\` | kleinster / größter Wert | ignoriert |

Mit \`WHERE\` filterst du **vorher**, welche Zeilen in die Berechnung eingehen:

${sql(`SELECT COUNT(*) AS Anzahl, SUM(Preis) AS Summe
FROM Geraet
WHERE Typ = 'Monitor';`)}

→ Monitore: G03 (210), G06 (185), G09 (210) → Anzahl **3**, Summe **605**.

**Rundung:** \`AVG\` kann Nachkommastellen liefern. Mit \`ROUND(AVG(Preis), 2)\` rundest du auf zwei Stellen. In Aufgaben steht, wie gerundet werden soll.

**Typische Fehler:**
- \`COUNT(PersNr)\` mit \`COUNT(*)\` verwechseln, wenn NULL-Werte vorkommen.
- Glauben, \`AVG\` teile durch alle Zeilen – NULL-Werte zählen beim Durchschnitt **nicht** mit.
- \`SUM\` statt \`COUNT\` verwenden („Wie viele …?“ ist immer COUNT).`,
        },
        {
          type: 'visual',
          title: 'Fünf Aggregatfunktionen',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'COUNT', icon: 'Hash', text: 'Wie viele? COUNT(*) zählt Zeilen, COUNT(Spalte) nur Nicht-NULL-Werte.' },
                { title: 'SUM / AVG', icon: 'Sigma', text: 'Summe bzw. Durchschnitt einer Zahlenspalte. NULL wird ignoriert.' },
                { title: 'MIN / MAX', icon: 'ArrowUpDown', text: 'Kleinster und größter Wert – geht auch mit Datum und Text.' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Kennzahlen der Inventar-Tabelle',
          problem: `Berechne für die Tabelle Geraet (10 Zeilen, PersNr bei G04 und G09 NULL):

${sql(`SELECT COUNT(*), COUNT(PersNr), SUM(Preis), AVG(Preis), MAX(Preis)
FROM Geraet;`)}`,
          steps: [
            { label: '1. COUNT(*)', body: 'Alle Zeilen: **10**.' },
            { label: '2. COUNT(PersNr)', body: 'Zeilen mit PersNr ungleich NULL: 10 − 2 = **8**.' },
            { label: '3. SUM(Preis)', body: '1150 + 980 + 210 + 420 + 760 + 185 + 1290 + 540 + 210 + 1040 = **6785**.' },
            { label: '4. AVG(Preis)', body: '6785 / 10 = **678,5**.' },
            { label: '5. MAX(Preis)', body: 'Größter Preis: **1290** (G07).' },
          ],
          result: 'Eine Ergebniszeile: 10 | 8 | 6785 | 678,5 | 1290.',
        },
        {
          type: 'check',
          question: {
            id: 'd03-c05', kind: 'number', skill: 'sql.aggregat', difficulty: 2,
            prompt: `${T_GER}\n\n${sql(`SELECT AVG(Preis) FROM Geraet WHERE Typ = 'Notebook';`)}\n\nWelchen Wert liefert die Abfrage?`,
            answer: 1115,
            unit: '€',
            hints: ['Zuerst die Notebooks bestimmen, dann deren Preise addieren und durch ihre Anzahl teilen.'],
            misconceptions: [
              { answer: '4460', error: 'sql-sum-statt-avg', why: 'Das ist die Summe. AVG teilt noch durch die Anzahl (4).' },
              { answer: '678.5', error: 'sql-where-ignoriert', why: 'Das ist der Durchschnitt aller Geräte. WHERE beschränkt auf die Notebooks.' },
            ],
            explanation: 'Notebooks: 1150 + 980 + 1290 + 1040 = 4460; 4460 / 4 = **1115**.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'd03-c06', kind: 'number', skill: 'sql.aggregat', difficulty: 2,
            prompt: `${T_GER}\n\n${sql(`SELECT COUNT(DISTINCT Typ) FROM Geraet;`)}\n\nWelchen Wert liefert die Abfrage?`,
            answer: 5,
            misconceptions: [{ answer: '10', error: 'sql-distinct-ignoriert', why: 'DISTINCT zählt jeden Typ nur einmal.' }],
            explanation: 'Verschiedene Typen: Notebook, Monitor, Drucker, Desktop, Smartphone → **5**.',
          },
        },
        { type: 'practice', title: 'Übung: Aggregatfunktionen', generator: 'daten.aggregat', count: 4, difficulty: 1 },
        { type: 'practice', title: 'Übung: Kennzahlen abfragen', questionIds: ['d03-q009', 'd03-q010', 'd03-q011', 'd03-q012', 'd03-q013', 'd03-q014'], count: 5, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'COUNT(*) zählt Zeilen, COUNT(Spalte) nur Nicht-NULL-Werte.',
            'SUM, AVG, MIN, MAX ignorieren NULL; AVG teilt durch die Anzahl der Nicht-NULL-Werte.',
            'WHERE filtert vor der Berechnung.',
            'Ohne GROUP BY: genau eine Ergebniszeile.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'd03-l04',
      title: 'Gruppieren mit GROUP BY und HAVING',
      minutes: 25,
      relevance: 'vertiefung',
      skills: ['sql.aggregat'],
      simple: `Mit \`GROUP BY\` bildest du Gruppen und rechnest je Gruppe – wie beim Sortieren von Münzen in Häufchen, bevor du jedes Häufchen zählst. \`WHERE\` filtert **einzelne Zeilen vor** dem Gruppieren, \`HAVING\` filtert **ganze Gruppen danach**, z. B. „nur Standorte mit mehr als 10 Geräten“.

**Merke:** WHERE wirkt vor der Gruppierung auf Zeilen, HAVING danach auf Gruppen (meist mit COUNT, SUM oder AVG).`,
      steps: [
        {
          type: 'explain',
          title: 'Kennzahlen je Gruppe',
          body: `\`GROUP BY\` bildet aus allen Zeilen mit **gleichem Wert** in einer Spalte eine **Gruppe**. Aggregatfunktionen werden dann **je Gruppe** berechnet – das Ergebnis hat **eine Zeile pro Gruppe**.

${sql(`SELECT Typ, COUNT(*) AS Anzahl
FROM Geraet
GROUP BY Typ;`)}

| Typ | Anzahl |
|---|---|
| Desktop | 1 |
| Drucker | 1 |
| Monitor | 3 |
| Notebook | 4 |
| Smartphone | 1 |

**Regel:** Jede Spalte im \`SELECT\`, die nicht in einer Aggregatfunktion steht, muss im \`GROUP BY\` stehen. \`SELECT Typ, Hersteller, COUNT(*) … GROUP BY Typ\` ist ein Fehler (welcher Hersteller sollte für die Gruppe „Monitor“ angezeigt werden?). Manche Systeme (MySQL mit gelockerten Einstellungen, SQLite) führen so etwas trotzdem aus und liefern einen zufälligen Wert – verlass dich nicht darauf.

**WHERE oder HAVING?**

| | WHERE | HAVING |
|---|---|---|
| filtert | einzelne **Zeilen** | ganze **Gruppen** |
| Zeitpunkt | **vor** dem Gruppieren | **nach** dem Gruppieren |
| Aggregatfunktionen erlaubt? | nein | ja, z. B. \`HAVING COUNT(*) >= 2\` |

**Logische Verarbeitungsreihenfolge** (nicht die Schreibreihenfolge!):

1. \`FROM\` (und JOINs) – Ausgangsdaten
2. \`WHERE\` – Zeilen filtern
3. \`GROUP BY\` – Gruppen bilden
4. \`HAVING\` – Gruppen filtern
5. \`SELECT\` – Spalten und Aggregate berechnen
6. \`ORDER BY\` – sortieren

Deshalb kann man in \`WHERE\` keinen Alias aus dem \`SELECT\` und keine Aggregatfunktion verwenden.`,
        },
        {
          type: 'visual',
          title: 'Von Zeilen zu Gruppen',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: '1. WHERE', icon: 'Filter', text: 'Unpassende Zeilen fliegen raus.' },
                { title: '2. GROUP BY', icon: 'Boxes', text: 'Gleiche Werte werden zu Gruppen zusammengefasst.' },
                { title: '3. HAVING', icon: 'Filter', text: 'Gruppen, die die Bedingung nicht erfüllen, fliegen raus.' },
                { title: '4. SELECT / ORDER BY', icon: 'Columns3', text: 'Eine Zeile je verbliebener Gruppe, dann sortiert.' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'WHERE, GROUP BY und HAVING Schritt für Schritt',
          problem: `Was liefert die Abfrage auf der Tabelle Geraet?

${sql(`SELECT Typ, COUNT(*) AS Anzahl
FROM Geraet
WHERE Kaufjahr >= 2023
GROUP BY Typ
HAVING COUNT(*) > 1;`)}`,
          steps: [
            { label: '1. WHERE Kaufjahr >= 2023', body: 'Es bleiben 7 Zeilen: G01, G05, G06, G07, G08, G09, G10. (G02, G03: 2022; G04: 2021 fallen weg.)' },
            { label: '2. GROUP BY Typ', body: 'Notebook: G01, G07, G10 → 3. Monitor: G06, G09 → 2. Desktop: G05 → 1. Smartphone: G08 → 1.' },
            { label: '3. HAVING COUNT(*) > 1', body: 'Nur Gruppen mit mehr als einem Gerät: Notebook (3) und Monitor (2).' },
            { label: '4. SELECT', body: 'Je Gruppe eine Zeile mit Typ und Anzahl.' },
          ],
          result: '2 Zeilen: Notebook | 3 und Monitor | 2.',
        },
        {
          type: 'check',
          question: {
            id: 'd03-c07', kind: 'number', skill: 'sql.aggregat', difficulty: 2,
            prompt: `${T_GER}\n\n${sql(`SELECT Typ, COUNT(*) FROM Geraet GROUP BY Typ HAVING COUNT(*) >= 2;`)}\n\nWie viele Zeilen liefert die Abfrage?`,
            answer: 2,
            unit: 'Zeilen',
            misconceptions: [{ answer: '5', error: 'sql-having-ignoriert', why: '5 Gruppen gibt es insgesamt; HAVING lässt nur die mit mindestens 2 Geräten übrig.' }],
            explanation: 'Gruppen: Notebook 4, Monitor 3, Desktop 1, Drucker 1, Smartphone 1 → mindestens 2: Notebook und Monitor → **2 Zeilen**.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'd03-c08', kind: 'single', skill: 'sql.aggregat', difficulty: 2,
            prompt: 'Du willst alle **Hersteller** finden, deren Geräte zusammen **mehr als 1.000 €** gekostet haben. Welche Abfrage ist richtig?',
            options: [
              'SELECT Hersteller, SUM(Preis) FROM Geraet GROUP BY Hersteller HAVING SUM(Preis) > 1000;',
              'SELECT Hersteller, SUM(Preis) FROM Geraet WHERE SUM(Preis) > 1000 GROUP BY Hersteller;',
              'SELECT Hersteller, SUM(Preis) FROM Geraet WHERE Preis > 1000 GROUP BY Hersteller;',
              'SELECT Hersteller FROM Geraet HAVING Preis > 1000;',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'In WHERE sind keine Aggregatfunktionen erlaubt – WHERE wird vor dem Gruppieren ausgewertet.', error: 'sql-where-statt-having' },
              '2': { why: 'Das filtert einzelne teure Geräte (> 1000 €), nicht die Summe je Hersteller.', error: 'sql-where-statt-having' },
              '3': { why: 'Ohne GROUP BY gibt es keine Herstellergruppen; die Summe wird gar nicht berechnet.', error: 'sql-groupby-fehlt' },
            },
            explanation: 'Bedingung auf eine **Gruppensumme** → HAVING nach GROUP BY. Ergebnis: Lenovo 3200, HP 1460, Dell 1400.',
          },
        },
        { type: 'practice', title: 'Übung: Gruppieren', generator: 'daten.aggregat', count: 4, difficulty: 3 },
        { type: 'practice', title: 'Übung: GROUP BY und HAVING', questionIds: ['d03-q015', 'd03-q016', 'd03-q017', 'd03-q018', 'd03-q019', 'd03-q031', 'd03-q033', 'd03-q038'], count: 5, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'GROUP BY: eine Ergebniszeile je Gruppe gleicher Werte.',
            'Nicht aggregierte SELECT-Spalten müssen im GROUP BY stehen.',
            'WHERE filtert Zeilen vor dem Gruppieren, HAVING filtert Gruppen danach.',
            'Logische Reihenfolge: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'd03-l05',
      title: 'Tabellen verknüpfen: JOIN',
      minutes: 30,
      relevance: 'vertiefung',
      skills: ['sql.join'],
      simple: `Ein \`JOIN\` setzt Daten aus zwei Tabellen wieder zusammen – wie ein Reißverschluss, dessen Zähne über den Schlüssel ineinandergreifen (Fremdschlüssel = Primärschlüssel). Der \`INNER JOIN\` zeigt nur Paare, die auf beiden Seiten einen Partner haben. Der \`LEFT JOIN\` zeigt alle Zeilen der linken Tabelle, auch ohne Partner; die fehlenden Werte der rechten Seite stehen dann als NULL da.

**Merke:** INNER JOIN = nur Treffer auf beiden Seiten; LEFT JOIN = alles von links, rechts notfalls NULL.`,
      steps: [
        {
          type: 'explain',
          title: 'Daten aus mehreren Tabellen zusammenführen',
          body: `Nach der Normalisierung stehen zusammengehörige Daten in verschiedenen Tabellen. Um z. B. **Gerät und Name** der Person gemeinsam anzuzeigen, verknüpfst du die Tabellen über **Fremdschlüssel = Primärschlüssel**.

**INNER JOIN** – nur Zeilen, die in **beiden** Tabellen einen Partner haben:

${sql(`SELECT g.InvNr, g.Typ, m.Name
FROM Geraet g
INNER JOIN Mitarbeiter m ON g.PersNr = m.PersNr;`)}

- \`g\` und \`m\` sind **Tabellenaliase** (Abkürzungen). \`g.PersNr\` heißt: Spalte PersNr der Tabelle Geraet.
- Geräte ohne Person (G04, G09: PersNr NULL) und Personen ohne Gerät (Becker, 105) erscheinen **nicht**.
- Ergebnis: **8 Zeilen** (jedes zugeordnete Gerät einmal).
- \`JOIN\` ohne Zusatz bedeutet \`INNER JOIN\`.

**LEFT JOIN** (LEFT OUTER JOIN) – **alle** Zeilen der **linken** Tabelle, auch ohne Partner; fehlende Werte der rechten Tabelle werden NULL:

${sql(`SELECT m.Name, g.InvNr
FROM Mitarbeiter m
LEFT JOIN Geraet g ON m.PersNr = g.PersNr;`)}

- Jede Person erscheint so oft, wie sie Geräte hat – **mindestens einmal**.
- Becker hat kein Gerät → eine Zeile „Becker | NULL“.
- Ergebnis: Weber 2 + Yilmaz 2 + Schulz 2 + Nowak 1 + Becker 1 + Krüger 1 = **9 Zeilen**.
- \`RIGHT JOIN\` funktioniert spiegelbildlich (alle Zeilen der rechten Tabelle).

**Wer hat kein Gerät?** LEFT JOIN + Filter auf NULL:

${sql(`SELECT m.Name
FROM Mitarbeiter m
LEFT JOIN Geraet g ON m.PersNr = g.PersNr
WHERE g.InvNr IS NULL;   -- Ergebnis: Becker`)}

**Drei Tabellen** verknüpfst du nacheinander:

${sql(`SELECT g.InvNr, m.Name, s.Stadt
FROM Geraet g
JOIN Mitarbeiter m ON g.PersNr = m.PersNr
JOIN Standort s ON m.StandortID = s.StandortID;`)}

**Ältere Schreibweise:** \`FROM Geraet g, Mitarbeiter m WHERE g.PersNr = m.PersNr\` ist gleichbedeutend mit dem INNER JOIN. **Fehlt** die Verknüpfungsbedingung, entsteht das **kartesische Produkt**: jede Zeile mit jeder kombiniert (10 Geräte · 6 Personen = 60 Zeilen) – fast immer ein Fehler.`,
        },
        {
          type: 'visual',
          title: 'INNER JOIN und LEFT JOIN',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'INNER JOIN', icon: 'Combine', text: 'Nur Paare mit Partner in beiden Tabellen. Geräte ohne Person und Personen ohne Gerät fehlen.' },
                { title: 'LEFT JOIN', icon: 'GitMerge', text: 'Alle Zeilen der linken Tabelle; ohne Partner stehen rechts NULL-Werte.' },
                { title: 'Ohne ON', icon: 'TriangleAlert', text: 'Kartesisches Produkt: Zeilen links · Zeilen rechts. Fast immer ein Fehler.' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Join mit Aggregat: Gerätewert je Abteilung',
          problem: `Welchen Gesamtwert haben die Geräte der Abteilung **Vertrieb**?

${sql(`SELECT SUM(g.Preis)
FROM Geraet g
INNER JOIN Mitarbeiter m ON g.PersNr = m.PersNr
WHERE m.Abteilung = 'Vertrieb';`)}`,
          steps: [
            { label: '1. Vertriebsleute bestimmen', body: 'In Mitarbeiter: Yilmaz (102) und Nowak (104).' },
            { label: '2. JOIN', body: 'Geräte mit PersNr 102: G02 (980), G03 (210); mit 104: G07 (1290).' },
            { label: '3. SUM', body: '980 + 210 + 1290 = **2480**.' },
          ],
          result: '2480 (€).',
        },
        {
          type: 'check',
          question: {
            id: 'd03-c09', kind: 'number', skill: 'sql.join', difficulty: 2,
            prompt: `${T_GER}\n\n${T_MA}\n\n${sql(`SELECT m.Name, g.InvNr
FROM Mitarbeiter m
INNER JOIN Geraet g ON m.PersNr = g.PersNr;`)}\n\nWie viele Zeilen liefert die Abfrage?`,
            answer: 8,
            unit: 'Zeilen',
            misconceptions: [
              { answer: '9', error: 'sql-inner-left-verwechselt', why: 'Das wäre der LEFT JOIN (Becker ohne Gerät mit NULL). INNER JOIN zeigt nur Paare.' },
              { answer: '10', error: 'sql-inner-left-verwechselt', why: 'G04 und G09 haben keine Person (NULL) und fallen beim INNER JOIN heraus.' },
              { answer: '60', error: 'sql-kartesisches-produkt', why: '60 = 10 · 6 wäre das kartesische Produkt ohne Verknüpfungsbedingung.' },
            ],
            explanation: 'Jedes Gerät mit gültiger PersNr ergibt eine Zeile: 10 Geräte − 2 ohne Person = **8 Zeilen**. Becker (ohne Gerät) erscheint nicht.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'd03-c10', kind: 'text', skill: 'sql.join', difficulty: 2,
            prompt: `${T_GER}\n\n${T_MA}\n\n${sql(`SELECT m.Name
FROM Mitarbeiter m
LEFT JOIN Geraet g ON m.PersNr = g.PersNr
WHERE g.InvNr IS NULL;`)}\n\nWelchen Namen liefert die Abfrage?`,
            accept: ['Becker'],
            explanation: 'Der LEFT JOIN liefert jede Person mindestens einmal. Nur bei Becker (105) gibt es kein passendes Gerät → g.InvNr ist NULL → **Becker**.',
          },
        },
        { type: 'practice', title: 'Übung: JOIN-Ergebnisse bestimmen', generator: 'daten.join', count: 4, difficulty: 2 },
        { type: 'practice', title: 'Übung: Verknüpfte Abfragen', questionIds: ['d03-q020', 'd03-q021', 'd03-q022', 'd03-q023', 'd03-q037', 'd03-q039'], count: 4, difficulty: 3 },
        {
          type: 'summary',
          points: [
            'JOIN-Bedingung: Fremdschlüssel = Primärschlüssel (ON g.PersNr = m.PersNr).',
            'INNER JOIN: nur Zeilen mit Partner in beiden Tabellen.',
            'LEFT JOIN: alle Zeilen links, fehlende Partner als NULL; mit IS NULL „wer hat keins?“.',
            'Ohne Verknüpfungsbedingung: kartesisches Produkt (m · n Zeilen).',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'd03-l06',
      title: 'Daten ändern: INSERT, UPDATE, DELETE',
      minutes: 20,
      relevance: 'vertiefung',
      skills: ['sql.dml'],
      simple: `Mit drei Befehlen änderst du Daten: \`INSERT\` fügt neue Zeilen ein, \`UPDATE\` ändert vorhandene, \`DELETE\` löscht sie. Bei \`UPDATE\` und \`DELETE\` ist die \`WHERE\`-Bedingung wie die Adresse auf einem Brief: Fehlt sie, trifft der Befehl **alle** Zeilen der Tabelle. Deshalb prüfst du die Bedingung vorher mit einem \`SELECT\`.

**Merke:** UPDATE oder DELETE ohne WHERE ändert bzw. löscht die ganze Tabelle.`,
      steps: [
        {
          type: 'explain',
          title: 'Datensätze einfügen, ändern und löschen',
          body: `**INSERT** – neue Zeilen einfügen:

${sql(`INSERT INTO Geraet (InvNr, Typ, Hersteller, Preis, Kaufjahr, PersNr)
VALUES ('G11', 'Headset', 'Jabra', 89, 2026, 105);`)}

- Die Spaltenliste ist optional, aber dringend empfohlen (sonst müssen alle Werte in der richtigen Reihenfolge stehen).
- Mehrere Zeilen: \`VALUES (…), (…), (…);\`

**UPDATE** – vorhandene Zeilen ändern:

${sql(`UPDATE Geraet
SET PersNr = 105
WHERE PersNr IS NULL;     -- Becker bekommt G04 und G09 → 2 Zeilen geändert`)}

**DELETE** – Zeilen löschen:

${sql(`DELETE FROM Geraet
WHERE Kaufjahr < 2023;    -- G02, G03, G04 → 3 Zeilen gelöscht`)}

**Die gefährlichste Zeile in SQL:** \`UPDATE\` oder \`DELETE\` **ohne WHERE** betrifft **alle** Zeilen der Tabelle! \`DELETE FROM Geraet;\` leert die komplette Inventartabelle.

**Profi-Gewohnheiten**
1. Erst mit \`SELECT … WHERE …\` (gleiche Bedingung) prüfen, welche Zeilen betroffen sind.
2. Änderungen in einer **Transaktion** ausführen und erst nach Kontrolle bestätigen:
${sql(`START TRANSACTION;   -- SQL Server: BEGIN TRANSACTION
DELETE FROM Geraet WHERE Kaufjahr < 2023;
-- Ergebnis prüfen ...
COMMIT;              -- oder ROLLBACK; zum Rückgängigmachen`)}
3. Vor größeren Änderungen ein **Backup**.

**Integrität:** Das DBMS prüft auch bei DML die Regeln: Ein \`INSERT\` mit unbekannter PersNr scheitert (referenzielle Integrität), ein \`DELETE\` einer Person mit Geräten scheitert bei RESTRICT/NO ACTION.

**Abgrenzung:** \`DELETE FROM Geraet;\` löscht alle **Zeilen**, die Tabelle bleibt. \`DROP TABLE Geraet;\` löscht die **ganze Tabelle** mit Struktur. \`TRUNCATE TABLE Geraet;\` leert die Tabelle besonders schnell (in vielen DBMS nicht per ROLLBACK rückgängig zu machen).`,
        },
        {
          type: 'visual',
          title: 'Drei DML-Befehle',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'INSERT INTO … VALUES', icon: 'PlusCircle', text: 'Neue Zeilen. Spaltenliste angeben.' },
                { title: 'UPDATE … SET … WHERE', icon: 'Pencil', text: 'Werte ändern. Ohne WHERE: alle Zeilen!' },
                { title: 'DELETE FROM … WHERE', icon: 'Trash2', text: 'Zeilen löschen. Ohne WHERE: Tabelle leer!' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Ein Gerät umbuchen',
          problem: 'Nowak (104) gibt das Notebook G07 an Krüger (106) ab. Gleichzeitig wird der Drucker G04 ausgesondert. Schreibe die Anweisungen und gib an, wie viele Zeilen die Tabelle Geraet danach hat.',
          steps: [
            { label: '1. Prüfen', body: "`SELECT * FROM Geraet WHERE InvNr = 'G07';` → genau eine Zeile, PersNr 104." },
            { label: '2. Umbuchen', body: "`UPDATE Geraet SET PersNr = 106 WHERE InvNr = 'G07';` → 1 Zeile geändert. Die Bedingung auf den Primärschlüssel trifft garantiert nur ein Gerät." },
            { label: '3. Aussondern', body: "`DELETE FROM Geraet WHERE InvNr = 'G04';` → 1 Zeile gelöscht." },
            { label: '4. Zeilen zählen', body: '10 − 1 = **9 Zeilen**. (In der Praxis würde man ausgesonderte Geräte oft nicht löschen, sondern mit einem Status „ausgesondert“ markieren – wegen Inventur und Nachweispflichten.)' },
          ],
          result: "UPDATE Geraet SET PersNr = 106 WHERE InvNr = 'G07'; DELETE FROM Geraet WHERE InvNr = 'G04'; → 9 Zeilen.",
        },
        {
          type: 'check',
          question: {
            id: 'd03-c11', kind: 'number', skill: 'sql.dml', difficulty: 2,
            prompt: `${T_GER}\n\n${sql(`DELETE FROM Geraet WHERE Typ = 'Monitor' OR Preis > 1200;`)}\n\nWie viele Zeilen werden **gelöscht**?`,
            answer: 4,
            unit: 'Zeilen',
            misconceptions: [{ answer: '6', error: 'sql-delete-zaehlung', why: '6 Zeilen **bleiben** übrig. Gefragt war, wie viele gelöscht werden.' }],
            explanation: 'Monitore: G03, G06, G09; Preis > 1200: G07 → **4 Zeilen** gelöscht, 6 bleiben.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'd03-c12', kind: 'text', skill: 'sql.dml', difficulty: 1,
            prompt: 'Mit welchem SQL-Befehl änderst du den Preis eines **vorhandenen** Geräts? (nur das Schlüsselwort)',
            accept: ['UPDATE'],
            misconceptions: [
              { answer: 'ALTER', error: 'sql-alter-update-verwechselt', why: 'ALTER TABLE ändert die **Struktur** einer Tabelle. Werte ändert man mit UPDATE.' },
              { answer: 'INSERT', error: 'sql-dml-befehl', why: 'INSERT fügt neue Zeilen ein.' },
            ],
            explanation: '**UPDATE** Geraet SET Preis = … WHERE InvNr = …;',
          },
        },
        { type: 'practice', title: 'Übung: Daten ändern', questionIds: ['d03-q025', 'd03-q026', 'd03-q027', 'd03-q028', 'd03-q032', 'd03-q041'], count: 5, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'INSERT INTO Tabelle (Spalten) VALUES (Werte);',
            'UPDATE Tabelle SET Spalte = Wert WHERE …;',
            'DELETE FROM Tabelle WHERE …; – ohne WHERE trifft es alle Zeilen.',
            'Vorher mit SELECT prüfen, in Transaktionen arbeiten, Backup haben.',
            'DELETE (Zeilen) ≠ DROP TABLE (ganze Tabelle).',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'd03-l07',
      title: 'Tabellen anlegen mit CREATE TABLE',
      minutes: 25,
      relevance: 'vertiefung',
      skills: ['sql.ddl'],
      simple: `Mit \`CREATE TABLE\` baust du aus dem Tabellenmodell eine echte Tabelle – wie ein Formular, bei dem du für jedes Feld Typ und Regeln festlegst. Zu jeder Spalte gehört ein Datentyp, dazu kommen **Constraints** (Regeln): \`PRIMARY KEY\` (eindeutige Kennung), \`FOREIGN KEY … REFERENCES\` (Verweis auf eine andere Tabelle), \`NOT NULL\` (Pflichtfeld), \`UNIQUE\` (kein Wert doppelt) und \`CHECK\` (Wertebereich, z. B. Preis ≥ 0).

**Merke:** Constraints sorgen dafür, dass die Datenbank selbst auf korrekte Daten achtet.`,
      steps: [
        {
          type: 'explain',
          title: 'Vom Tabellenmodell zur echten Tabelle',
          body: `Mit \`CREATE TABLE\` setzt du das Tabellenmodell aus Modul d02 um. Je Spalte gibst du **Name und Datentyp** an, dazu **Integritätsbedingungen** (Constraints):

| Constraint | Wirkung |
|---|---|
| \`PRIMARY KEY\` | Primärschlüssel (eindeutig, nicht NULL) |
| \`NOT NULL\` | Feld muss ausgefüllt sein |
| \`UNIQUE\` | Wert darf nicht doppelt vorkommen |
| \`CHECK (Bedingung)\` | Wertebereich prüfen |
| \`DEFAULT Wert\` | Standardwert, wenn nichts angegeben wird |
| \`FOREIGN KEY (Spalte) REFERENCES Tabelle(Spalte)\` | Fremdschlüssel mit referenzieller Integrität |
| \`ON DELETE RESTRICT / CASCADE / SET NULL\` | Verhalten beim Löschen des referenzierten Datensatzes |

${sql(`CREATE TABLE Standort (
  StandortID  INTEGER      PRIMARY KEY,
  Stadt       VARCHAR(40)  NOT NULL,
  Bezeichnung VARCHAR(60)
);

CREATE TABLE Mitarbeiter (
  PersNr      INTEGER      PRIMARY KEY,
  Name        VARCHAR(60)  NOT NULL,
  Abteilung   VARCHAR(40),
  StandortID  INTEGER      NOT NULL,
  FOREIGN KEY (StandortID) REFERENCES Standort(StandortID)
);

CREATE TABLE Geraet (
  InvNr       VARCHAR(10)   PRIMARY KEY,
  Typ         VARCHAR(30)   NOT NULL,
  Hersteller  VARCHAR(40),
  Preis       DECIMAL(8,2)  CHECK (Preis >= 0),
  Kaufjahr    INTEGER,
  PersNr      INTEGER,      -- NULL erlaubt: Gerät noch nicht ausgegeben
  FOREIGN KEY (PersNr) REFERENCES Mitarbeiter(PersNr) ON DELETE SET NULL
);`)}

**Reihenfolge beachten:** Eine Tabelle, auf die ein Fremdschlüssel verweist, muss **vorher** existieren: erst Standort, dann Mitarbeiter, dann Geraet. Beim Löschen (\`DROP TABLE\`) ist es umgekehrt.

**Zusammengesetzter Primärschlüssel** (Zwischentabelle):

${sql(`CREATE TABLE Installation (
  InvNr       VARCHAR(10),
  SoftwareID  INTEGER,
  InstalliertAm DATE,
  PRIMARY KEY (InvNr, SoftwareID),
  FOREIGN KEY (InvNr) REFERENCES Geraet(InvNr),
  FOREIGN KEY (SoftwareID) REFERENCES Software(SoftwareID)
);`)}

**Struktur ändern:** \`ALTER TABLE Geraet ADD Seriennummer VARCHAR(30);\` fügt eine Spalte hinzu. **Löschen:** \`DROP TABLE Geraet;\`.

**Automatische Schlüssel:** Fortlaufende künstliche Schlüssel heißen je nach DBMS \`AUTO_INCREMENT\` (MySQL/MariaDB), \`IDENTITY\` (SQL Server, Standard: \`GENERATED … AS IDENTITY\`) oder \`SERIAL\` (PostgreSQL, älter).`,
        },
        {
          type: 'visual',
          title: 'Constraints auf einen Blick',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'PRIMARY KEY', icon: 'KeyRound', text: 'Eindeutig + NOT NULL. Bei Zwischentabellen zusammengesetzt.' },
                { title: 'FOREIGN KEY … REFERENCES', icon: 'Link', text: 'Verweis auf vorhandenen PK. Referenzierte Tabelle zuerst anlegen.' },
                { title: 'NOT NULL · UNIQUE · CHECK', icon: 'ShieldCheck', text: 'Pflichtfeld, Eindeutigkeit, Wertebereich.' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Eine 1:1-Beziehung in SQL umsetzen',
          problem: 'Jeder Dienstwagen ist genau einer Person zugeordnet, jede Person hat höchstens einen Dienstwagen. Lege die Tabelle Dienstwagen an (Kennzeichen, Modell, Zuordnung zu Mitarbeiter).',
          steps: [
            { label: '1. Primärschlüssel', body: 'Das Kennzeichen ist eindeutig → `Kennzeichen VARCHAR(12) PRIMARY KEY`.' },
            { label: '2. Fremdschlüssel', body: 'Jeder Wagen gehört genau einer Person → `PersNr INTEGER NOT NULL` mit `FOREIGN KEY … REFERENCES Mitarbeiter(PersNr)`.' },
            { label: '3. 1:1 statt 1:n', body: 'Damit eine Person nicht zwei Wagen bekommt: `UNIQUE` auf PersNr.' },
            { label: '4. Anweisung', body: '`CREATE TABLE Dienstwagen (Kennzeichen VARCHAR(12) PRIMARY KEY, Modell VARCHAR(40), PersNr INTEGER NOT NULL UNIQUE, FOREIGN KEY (PersNr) REFERENCES Mitarbeiter(PersNr));`' },
          ],
          result: 'Fremdschlüssel PersNr mit NOT NULL und UNIQUE macht die Beziehung zu einer 1:1-Beziehung.',
        },
        {
          type: 'check',
          question: {
            id: 'd03-c13', kind: 'order', skill: 'sql.ddl', difficulty: 2,
            prompt: 'In welcher Reihenfolge müssen die Tabellen **angelegt** werden, damit alle Fremdschlüssel gültig sind? (Mitarbeiter verweist auf Standort, Geraet auf Mitarbeiter, Installation auf Geraet und Software.)',
            items: ['Standort', 'Mitarbeiter', 'Geraet', 'Installation'],
            explanation: 'Referenzierte Tabellen zuerst: Standort → Mitarbeiter → Geraet → Installation (Software muss ebenfalls vor Installation existieren).',
          },
        },
        {
          type: 'check',
          question: {
            id: 'd03-c14', kind: 'single', skill: 'sql.ddl', difficulty: 2,
            prompt: 'Welche Spaltendefinition stellt sicher, dass **kein negativer Preis** gespeichert werden kann?',
            options: ['Preis DECIMAL(8,2) CHECK (Preis >= 0)', 'Preis DECIMAL(8,2) NOT NULL', 'Preis DECIMAL(8,2) UNIQUE', 'Preis DECIMAL(8,2) DEFAULT 0'],
            answer: 0,
            distractors: {
              '1': { why: 'NOT NULL erzwingt nur, dass ein Wert vorhanden ist – auch −50 wäre erlaubt.', error: 'sql-constraint-wahl' },
              '2': { why: 'UNIQUE verhindert doppelte Preise, nicht negative.', error: 'sql-constraint-wahl' },
              '3': { why: 'DEFAULT setzt nur einen Standardwert, wenn nichts angegeben wird.', error: 'sql-constraint-wahl' },
            },
            explanation: 'Wertebereiche prüft man mit **CHECK**.',
          },
        },
        { type: 'practice', title: 'Übung: Tabellen anlegen', questionIds: ['d03-q029', 'd03-q030', 'd03-q041'], count: 3, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'CREATE TABLE: Spaltenname + Datentyp + Constraints.',
            'PRIMARY KEY, NOT NULL, UNIQUE, CHECK, DEFAULT, FOREIGN KEY … REFERENCES.',
            'Referenzierte Tabellen zuerst anlegen.',
            'Zusammengesetzter PK: PRIMARY KEY (A, B) am Tabellenende.',
            'ALTER TABLE ändert die Struktur, DROP TABLE löscht die Tabelle.',
          ],
        },
      ],
    },
  ],

  /* ================================================================ */
  questions: [
    {
      id: 'd03-q001', kind: 'number', skill: 'sql.select', difficulty: 1,
      prompt: `${T_GER}\n\n${sql(`SELECT * FROM Geraet WHERE Typ = 'Notebook';`)}\n\nWie viele Zeilen liefert die Abfrage?`,
      answer: 4, unit: 'Zeilen',
      explanation: 'Notebooks: G01, G02, G07, G10 → **4 Zeilen**.',
    },
    {
      id: 'd03-q002', kind: 'number', skill: 'sql.select', difficulty: 2,
      prompt: `${T_GER}\n\n${sql(`SELECT InvNr FROM Geraet WHERE Preis >= 210 AND Typ = 'Monitor';`)}\n\nWie viele Zeilen liefert die Abfrage?`,
      answer: 2, unit: 'Zeilen',
      misconceptions: [
        { answer: '0', error: 'sql-groesser-gleich', why: '>= schließt den Grenzwert ein: Die beiden Monitore zu genau 210 € gehören dazu.' },
        { answer: '3', error: 'sql-and-ignoriert', why: 'Der Monitor G06 kostet nur 185 € und erfüllt Preis >= 210 nicht.' },
      ],
      explanation: 'Monitore: G03 (210), G06 (185), G09 (210). Preis >= 210: G03, G09 → **2 Zeilen**.',
    },
    {
      id: 'd03-q003', kind: 'number', skill: 'sql.select', difficulty: 2,
      prompt: `${T_GER}\n\n${sql(`SELECT InvNr FROM Geraet WHERE Hersteller = 'Dell' OR Kaufjahr >= 2024;`)}\n\nWie viele Zeilen liefert die Abfrage?`,
      answer: 8, unit: 'Zeilen',
      hints: ['OR: Es genügt, wenn eine der beiden Bedingungen erfüllt ist.', 'Zähle keine Zeile doppelt.'],
      misconceptions: [{ answer: '0', error: 'sql-and-or-verwechselt', why: 'Du hast AND gerechnet (Dell **und** ab 2024). OR verlangt nur eine der Bedingungen.' }],
      explanation: 'Dell: G02, G03, G09. Kaufjahr >= 2024: G05, G06, G07, G08, G10. Zusammen (ohne Doppelte) **8 Zeilen**; nur G01 (2023, Lenovo) und G04 (2021, HP) fallen heraus.',
    },
    {
      id: 'd03-q004', kind: 'number', skill: 'sql.select', difficulty: 3,
      prompt: `${T_GER}\n\n${sql(`SELECT InvNr FROM Geraet WHERE Typ = 'Notebook' OR Typ = 'Monitor' AND Preis < 200;`)}\n\nWie viele Zeilen liefert die Abfrage?`,
      answer: 5, unit: 'Zeilen',
      hints: ['Welcher Operator bindet stärker: AND oder OR?'],
      misconceptions: [{ answer: '1', error: 'sql-and-or-vorrang', why: 'Du hast (Notebook OR Monitor) AND Preis < 200 gerechnet. AND bindet aber stärker als OR.' }],
      explanation: 'Gelesen wird: Typ = \'Notebook\' **OR** (Typ = \'Monitor\' AND Preis < 200). Alle 4 Notebooks + Monitor G06 (185) = **5 Zeilen**.',
    },
    {
      id: 'd03-q005', kind: 'number', skill: 'sql.select', difficulty: 2,
      prompt: `${T_GER}\n\n${sql(`SELECT InvNr FROM Geraet WHERE PersNr IS NOT NULL;`)}\n\nWie viele Zeilen liefert die Abfrage?`,
      answer: 8, unit: 'Zeilen',
      explanation: 'Alle Geräte außer G04 und G09 haben eine PersNr → 10 − 2 = **8 Zeilen**.',
    },
    {
      id: 'd03-q006', kind: 'number', skill: 'sql.select', difficulty: 2,
      prompt: `${T_GER}\n\n${sql(`SELECT InvNr FROM Geraet WHERE Preis BETWEEN 210 AND 760;`)}\n\nWie viele Zeilen liefert die Abfrage?`,
      answer: 5, unit: 'Zeilen',
      misconceptions: [{ answer: '2', error: 'sql-between-grenzen', why: 'BETWEEN schließt beide Grenzen **ein** (210 und 760 gehören dazu).' }],
      explanation: '210 ≤ Preis ≤ 760: G03 (210), G04 (420), G05 (760), G08 (540), G09 (210) → **5 Zeilen**.',
    },
    {
      id: 'd03-q007', kind: 'text', skill: 'sql.select', difficulty: 1,
      prompt: `${T_GER}\n\n${sql(`SELECT InvNr, Preis FROM Geraet ORDER BY Preis DESC;`)}\n\nWelche **InvNr** steht in der **ersten Zeile** des Ergebnisses?`,
      accept: ['G07'],
      misconceptions: [{ answer: 'G06', error: 'sql-order-richtung', why: 'G06 ist das billigste Gerät. DESC sortiert absteigend – der höchste Preis steht oben.' }],
      explanation: 'DESC = absteigend: G07 mit 1290 € steht oben.',
    },
    {
      id: 'd03-q008', kind: 'number', skill: 'sql.select', difficulty: 2,
      prompt: `${T_GER}\n\n${sql(`SELECT DISTINCT Hersteller FROM Geraet;`)}\n\nWie viele Zeilen liefert die Abfrage?`,
      answer: 5, unit: 'Zeilen',
      misconceptions: [{ answer: '10', error: 'sql-distinct-ignoriert', why: 'DISTINCT entfernt doppelte Ergebniszeilen – jeder Hersteller erscheint nur einmal.' }],
      explanation: 'Lenovo, Dell, HP, LG, Samsung → **5 Zeilen**.',
    },
    {
      id: 'd03-q009', kind: 'number', skill: 'sql.aggregat', difficulty: 1,
      prompt: `${T_GER}\n\n${sql(`SELECT COUNT(*) FROM Geraet;`)}\n\nWelchen Wert liefert die Abfrage?`,
      answer: 10,
      explanation: 'COUNT(*) zählt alle Zeilen: **10**.',
    },
    {
      id: 'd03-q010', kind: 'number', skill: 'sql.aggregat', difficulty: 3,
      prompt: `${T_GER}\n\n${sql(`SELECT COUNT(PersNr) FROM Geraet;`)}\n\nWelchen Wert liefert die Abfrage?`,
      answer: 8,
      misconceptions: [{ answer: '10', error: 'sql-count-null', why: 'COUNT(Spalte) zählt nur Zeilen, in denen die Spalte nicht NULL ist. G04 und G09 fehlen.' }],
      explanation: 'PersNr ist bei G04 und G09 NULL → 10 − 2 = **8**.',
    },
    {
      id: 'd03-q011', kind: 'number', skill: 'sql.aggregat', difficulty: 1,
      prompt: `${T_GER}\n\n${sql(`SELECT SUM(Preis) FROM Geraet WHERE Typ = 'Monitor';`)}\n\nWelchen Wert liefert die Abfrage?`,
      answer: 605, unit: '€',
      misconceptions: [{ answer: '3', error: 'sql-count-statt-sum', why: '3 ist die Anzahl der Monitore (COUNT). SUM addiert die Preise.' }],
      explanation: '210 + 185 + 210 = **605**.',
    },
    {
      id: 'd03-q012', kind: 'number', skill: 'sql.aggregat', difficulty: 2,
      prompt: `${T_GER}\n\n${sql(`SELECT ROUND(AVG(Preis), 2) FROM Geraet WHERE Hersteller = 'Lenovo';`)}\n\nWelchen Wert liefert die Abfrage (auf zwei Nachkommastellen gerundet)?`,
      answer: 1066.67, tolerance: 0.005, unit: '€',
      misconceptions: [
        { answer: '3200', error: 'sql-sum-statt-avg', why: 'Das ist die Summe. AVG teilt durch die Anzahl der Lenovo-Geräte (3).' },
        { answer: '678.5', error: 'sql-where-ignoriert', why: 'Das ist der Durchschnitt über alle Geräte.' },
      ],
      explanation: 'Lenovo: G01 (1150), G05 (760), G07 (1290) → 3200 / 3 = 1066,666… → gerundet **1066,67**.',
    },
    {
      id: 'd03-q013', kind: 'number', skill: 'sql.aggregat', difficulty: 1,
      prompt: `${T_GER}\n\n${sql(`SELECT MIN(Kaufjahr) FROM Geraet;`)}\n\nWelchen Wert liefert die Abfrage?`,
      answer: 2021,
      explanation: 'Das älteste Gerät ist der Drucker G04 von **2021**.',
    },
    {
      id: 'd03-q014', kind: 'number', skill: 'sql.aggregat', difficulty: 2,
      prompt: `${T_GER}\n\n${sql(`SELECT MAX(Preis) - MIN(Preis) FROM Geraet WHERE Typ = 'Notebook';`)}\n\nWelchen Wert liefert die Abfrage?`,
      answer: 310, unit: '€',
      misconceptions: [{ answer: '1105', error: 'sql-where-ignoriert', why: '1290 − 185 = 1105 wäre die Spanne über alle Geräte. WHERE beschränkt auf Notebooks.' }],
      explanation: 'Notebooks: höchster Preis 1290 (G07), niedrigster 980 (G02) → 1290 − 980 = **310**.',
    },
    {
      id: 'd03-q015', kind: 'number', skill: 'sql.aggregat', difficulty: 2,
      prompt: `${T_GER}\n\n${sql(`SELECT Typ, COUNT(*) FROM Geraet GROUP BY Typ;`)}\n\nWie viele Zeilen liefert die Abfrage?`,
      answer: 5, unit: 'Zeilen',
      misconceptions: [{ answer: '10', error: 'sql-groupby-zeilen', why: 'GROUP BY liefert eine Zeile **je Gruppe** (je Typ), nicht je Gerät.' }],
      explanation: 'Fünf verschiedene Typen (Notebook, Monitor, Drucker, Desktop, Smartphone) → **5 Zeilen**.',
    },
    {
      id: 'd03-q016', kind: 'text', skill: 'sql.aggregat', difficulty: 2,
      prompt: `${T_GER}\n\n${sql(`SELECT Hersteller, SUM(Preis) AS Summe
FROM Geraet
GROUP BY Hersteller
ORDER BY Summe DESC;`)}\n\nWelcher **Hersteller** steht in der ersten Zeile?`,
      accept: ['Lenovo'],
      hints: ['Bilde je Hersteller die Summe der Preise.'],
      misconceptions: [{ answer: 'Dell', error: 'sql-count-statt-sum', why: 'Dell hat zwar die meisten Geräte (3, wie Lenovo), aber die Summe ist entscheidend: Dell 1400, Lenovo 3200.' }],
      explanation: 'Lenovo 1150 + 760 + 1290 = 3200; HP 420 + 1040 = 1460; Dell 980 + 210 + 210 = 1400; Samsung 540; LG 185 → oben steht **Lenovo**.',
    },
    {
      id: 'd03-q017', kind: 'number', skill: 'sql.aggregat', difficulty: 2,
      prompt: `${T_GER}\n\n${sql(`SELECT Hersteller, SUM(Preis) FROM Geraet WHERE Hersteller = 'HP' GROUP BY Hersteller;`)}\n\nWelcher Wert steht in der Spalte SUM(Preis)?`,
      answer: 1460, unit: '€',
      explanation: 'HP: G04 (420) + G10 (1040) = **1460**.',
    },
    {
      id: 'd03-q018', kind: 'number', skill: 'sql.aggregat', difficulty: 3,
      prompt: `${T_GER}\n\n${sql(`SELECT Hersteller, AVG(Preis)
FROM Geraet
GROUP BY Hersteller
HAVING AVG(Preis) > 500;`)}\n\nWie viele Zeilen liefert die Abfrage?`,
      answer: 3, unit: 'Zeilen',
      hints: ['Berechne den Durchschnitt je Hersteller.', 'Samsung hat nur ein Gerät – sein Durchschnitt ist dessen Preis.'],
      explanation: 'Lenovo 1066,67 ✔; HP 730 ✔; Samsung 540 ✔; Dell 466,67 ✘; LG 185 ✘ → **3 Zeilen**.',
    },
    {
      id: 'd03-q019', kind: 'number', skill: 'sql.aggregat', difficulty: 3,
      prompt: `${T_GER}\n\n${sql(`SELECT Kaufjahr, COUNT(*)
FROM Geraet
WHERE Typ <> 'Smartphone'
GROUP BY Kaufjahr
HAVING COUNT(*) >= 2;`)}\n\nWie viele Zeilen liefert die Abfrage?`,
      answer: 3, unit: 'Zeilen',
      hints: ['WHERE wirkt vor dem Gruppieren: Das Smartphone G08 (2024) fällt vorher heraus.'],
      explanation: 'Ohne Smartphone: 2021: 1, 2022: 2, 2023: 2, 2024: 3 (G05, G06, G10), 2025: 1 → mindestens 2: 2022, 2023, 2024 → **3 Zeilen**.',
    },
    {
      id: 'd03-q020', kind: 'number', skill: 'sql.join', difficulty: 3,
      prompt: `${T_GER}\n\n${T_MA}\n\n${T_ST}\n\n${sql(`SELECT g.InvNr
FROM Geraet g
JOIN Mitarbeiter m ON g.PersNr = m.PersNr
JOIN Standort s ON m.StandortID = s.StandortID
WHERE s.Stadt = 'Hamburg';`)}\n\nWie viele Zeilen liefert die Abfrage?`,
      answer: 5, unit: 'Zeilen',
      hints: ['Welche Standorte liegen in Hamburg?', 'Welche Personen arbeiten dort, und welche Geräte haben sie?'],
      misconceptions: [{ answer: '4', error: 'sql-join-standort', why: 'In Hamburg gibt es zwei Standorte (1 und 3). Zähle die Geräte, nicht die Personen.' }],
      explanation: 'Hamburg: StandortID 1 und 3 → Personen 101, 103, 105, 106 → Geräte G01, G08 (101), G05, G06 (103), G10 (106); Becker (105) hat keins → **5 Zeilen**.',
    },
    {
      id: 'd03-q021', kind: 'number', skill: 'sql.join', difficulty: 3,
      prompt: `${T_GER}\n\n${T_MA}\n\n${sql(`SELECT m.Name, g.InvNr
FROM Mitarbeiter m
LEFT JOIN Geraet g ON m.PersNr = g.PersNr;`)}\n\nWie viele Zeilen liefert die Abfrage?`,
      answer: 9, unit: 'Zeilen',
      misconceptions: [
        { answer: '8', error: 'sql-inner-left-verwechselt', why: 'Das wäre der INNER JOIN. Beim LEFT JOIN erscheint auch Becker (ohne Gerät) mit NULL.' },
        { answer: '6', error: 'sql-left-join-zeilen', why: 'Eine Person mit zwei Geräten erscheint zweimal.' },
        { answer: '10', error: 'sql-left-join-seite', why: 'Links steht Mitarbeiter: Geräte ohne Person (G04, G09) erscheinen nicht.' },
        { answer: '60', error: 'sql-kartesisches-produkt', why: '60 = 6 · 10 wäre das kartesische Produkt.' },
      ],
      explanation: 'Weber 2, Yilmaz 2, Schulz 2, Nowak 1, Becker 1 (NULL), Krüger 1 → **9 Zeilen**.',
    },
    {
      id: 'd03-q022', kind: 'number', skill: 'sql.join', difficulty: 3,
      prompt: `${T_GER}\n\n${T_MA}\n\n${sql(`SELECT g.InvNr, m.Name
FROM Geraet g
LEFT JOIN Mitarbeiter m ON g.PersNr = m.PersNr;`)}\n\nWie viele Zeilen liefert die Abfrage?`,
      answer: 10, unit: 'Zeilen',
      misconceptions: [
        { answer: '8', error: 'sql-inner-left-verwechselt', why: 'Beim LEFT JOIN bleiben auch G04 und G09 (ohne Person) erhalten – mit Name = NULL.' },
        { answer: '9', error: 'sql-left-join-seite', why: 'Links steht hier Geraet, nicht Mitarbeiter. Jede Geräte-Zeile erscheint genau einmal.' },
      ],
      explanation: 'Links steht Geraet: Jedes der 10 Geräte erscheint (jedes hat höchstens eine Person) → **10 Zeilen**, bei G04 und G09 ist Name NULL.',
    },
    {
      id: 'd03-q023', kind: 'number', skill: 'sql.join', difficulty: 3,
      prompt: `${T_GER}\n\n${T_MA}\n\n${sql(`SELECT SUM(g.Preis)
FROM Geraet g
INNER JOIN Mitarbeiter m ON g.PersNr = m.PersNr
WHERE m.Abteilung = 'IT';`)}\n\nWelchen Wert liefert die Abfrage?`,
      answer: 2730, unit: '€',
      hints: ['IT: Weber (101) und Krüger (106).'],
      explanation: 'Weber: G01 (1150) + G08 (540); Krüger: G10 (1040) → 1150 + 540 + 1040 = **2730**.',
    },
    {
      id: 'd03-q024', kind: 'free', skill: 'sql.select', difficulty: 2,
      prompt: `${T_GER}\n\nSchreibe eine SQL-Abfrage, die **InvNr, Hersteller und Preis** aller **Notebooks mit einem Preis über 1.000 €** ausgibt, sortiert nach Preis **absteigend**.`,
      modelAnswer: "SELECT InvNr, Hersteller, Preis\nFROM Geraet\nWHERE Typ = 'Notebook' AND Preis > 1000\nORDER BY Preis DESC;\n\nErgebnis: G07 Lenovo 1290, G01 Lenovo 1150, G10 HP 1040.",
      keywords: ['SELECT', 'FROM Geraet', "Typ = 'Notebook'", 'AND', 'Preis > 1000', 'ORDER BY Preis DESC'],
      explanation: 'Spalten im SELECT, Bedingungen mit AND verknüpft, Text in einfachen Anführungszeichen, ORDER BY … DESC am Ende.',
    },
    {
      id: 'd03-q025', kind: 'text', skill: 'sql.dml', difficulty: 1,
      prompt: 'Mit welchem SQL-Befehl fügst du einen **neuen Datensatz** in eine Tabelle ein? (Schlüsselwort)',
      accept: ['INSERT', 'INSERT INTO'],
      misconceptions: [
        { answer: 'ADD', error: 'sql-dml-befehl', why: 'ADD gibt es nur bei ALTER TABLE (neue Spalte).' },
        { answer: 'CREATE', error: 'sql-ddl-dml-verwechselt', why: 'CREATE legt Strukturen (Tabellen) an, keine Datensätze.' },
      ],
      explanation: '**INSERT INTO** Tabelle (Spalten) VALUES (Werte);',
    },
    {
      id: 'd03-q026', kind: 'number', skill: 'sql.dml', difficulty: 2,
      prompt: `${T_GER}\n\n${sql(`UPDATE Geraet SET PersNr = 105 WHERE PersNr IS NULL;`)}\n\nWie viele Zeilen werden **geändert**?`,
      answer: 2, unit: 'Zeilen',
      misconceptions: [{ answer: '10', error: 'sql-update-where', why: 'Das WHERE beschränkt die Änderung auf die Zeilen mit PersNr NULL.' }],
      explanation: 'PersNr ist NULL bei G04 und G09 → **2 Zeilen** werden Becker (105) zugeordnet.',
    },
    {
      id: 'd03-q027', kind: 'number', skill: 'sql.dml', difficulty: 2,
      prompt: `${T_GER}\n\n${sql(`DELETE FROM Geraet WHERE Kaufjahr < 2023;`)}\n\nWie viele Zeilen enthält die Tabelle Geraet **danach**?`,
      answer: 7, unit: 'Zeilen',
      misconceptions: [
        { answer: '3', error: 'sql-delete-zaehlung', why: '3 Zeilen werden gelöscht – gefragt war, wie viele übrig bleiben.' },
        { answer: '5', error: 'sql-kleiner-gleich', why: '< 2023 schließt 2023 aus: G01 und G09 (2023) bleiben.' },
      ],
      explanation: 'Gelöscht: G02 (2022), G03 (2022), G04 (2021) → 10 − 3 = **7 Zeilen**.',
    },
    {
      id: 'd03-q028', kind: 'free', skill: 'sql.dml', difficulty: 1,
      prompt: 'Ein Kollege will den Preis von G05 korrigieren und tippt `UPDATE Geraet SET Preis = 799;`. Erläutere, was passiert, und wie er es richtig macht.',
      modelAnswer: 'Ohne WHERE-Bedingung ändert UPDATE alle Zeilen der Tabelle: Alle 10 Geräte hätten danach den Preis 799. Richtig: UPDATE Geraet SET Preis = 799 WHERE InvNr = \'G05\'; – die Bedingung auf den Primärschlüssel trifft genau ein Gerät. Vorher mit SELECT * FROM Geraet WHERE InvNr = \'G05\'; prüfen, in einer Transaktion arbeiten (ROLLBACK möglich) und ein Backup haben.',
      keywords: ['WHERE', 'alle Zeilen', 'Primärschlüssel', 'Transaktion', 'ROLLBACK', 'Backup'],
      explanation: 'UPDATE/DELETE ohne WHERE betreffen die gesamte Tabelle.',
    },
    {
      id: 'd03-q029', kind: 'match', skill: 'sql.ddl', difficulty: 1,
      prompt: 'Ordne die SQL-Befehle ihrer Befehlsgruppe zu.',
      left: ['CREATE TABLE', 'UPDATE', 'GRANT', 'COMMIT'],
      right: ['DDL (Data Definition Language)', 'DML (Data Manipulation Language)', 'DCL (Data Control Language)', 'TCL (Transaction Control Language)'],
      answer: [0, 1, 2, 3],
      explanation: 'CREATE/ALTER/DROP = DDL; INSERT/UPDATE/DELETE = DML; GRANT/REVOKE = DCL; COMMIT/ROLLBACK = TCL.',
    },
    {
      id: 'd03-q030', kind: 'free', skill: 'sql.ddl', difficulty: 3,
      prompt: 'Schreibe die `CREATE TABLE`-Anweisung für die Tabelle **Geraet** mit den Spalten InvNr (Primärschlüssel, Text bis 10 Zeichen), Typ (Pflichtfeld), Preis (Geldbetrag, nicht negativ), Kaufjahr und PersNr (Fremdschlüssel auf Mitarbeiter, darf leer sein).',
      modelAnswer: 'CREATE TABLE Geraet (\n  InvNr    VARCHAR(10)  PRIMARY KEY,\n  Typ      VARCHAR(30)  NOT NULL,\n  Preis    DECIMAL(8,2) CHECK (Preis >= 0),\n  Kaufjahr INTEGER,\n  PersNr   INTEGER,\n  FOREIGN KEY (PersNr) REFERENCES Mitarbeiter(PersNr)\n);',
      keywords: ['CREATE TABLE', 'PRIMARY KEY', 'NOT NULL', 'DECIMAL', 'CHECK', 'FOREIGN KEY', 'REFERENCES'],
      explanation: 'PK, NOT NULL, CHECK für den Wertebereich, FOREIGN KEY … REFERENCES für die Beziehung. PersNr ohne NOT NULL, damit nicht ausgegebene Geräte möglich sind.',
    },
    {
      id: 'd03-q031', kind: 'order', skill: 'sql.aggregat', difficulty: 3,
      prompt: 'In welcher **logischen Reihenfolge** wertet ein DBMS die Teile einer Abfrage aus?',
      items: ['FROM', 'WHERE', 'GROUP BY', 'HAVING', 'SELECT', 'ORDER BY'],
      explanation: 'FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. Deshalb sind Aggregatfunktionen in WHERE nicht erlaubt, in HAVING aber schon.',
    },
    {
      id: 'd03-q032', kind: 'single', skill: 'sql.dml', difficulty: 2,
      prompt: `${T_MA}\n\nGeraet.PersNr ist Fremdschlüssel auf Mitarbeiter.PersNr. Was passiert bei:\n\n${sql(`INSERT INTO Geraet (InvNr, Typ, Hersteller, Preis, Kaufjahr, PersNr)
VALUES ('G12', 'Tablet', 'Apple', 649, 2026, 999);`)}`,
      options: [
        'Fehler: Die PersNr 999 existiert nicht (Verstoß gegen die referenzielle Integrität).',
        'Die Zeile wird eingefügt, PersNr wird automatisch NULL.',
        'Die Zeile wird eingefügt, und eine Person 999 wird angelegt.',
        'Fehler: Ein Tablet ist kein zulässiger Typ.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Das DBMS verändert keine Werte stillschweigend – es lehnt die Anweisung ab.', error: 'db-referenzielle-integritaet' },
        '2': { why: 'Fehlende Datensätze in anderen Tabellen werden nie automatisch angelegt.', error: 'db-referenzielle-integritaet' },
        '3': { why: 'Für Typ gibt es hier keine Einschränkung (kein CHECK).', error: 'sql-constraint-wahl' },
      },
      explanation: 'Fremdschlüsselwert ohne passenden Primärschlüssel → die Anweisung wird abgewiesen.',
    },
    {
      id: 'd03-q033', kind: 'text', skill: 'sql.aggregat', difficulty: 1,
      prompt: 'Mit welcher SQL-Klausel filterst du **Gruppen** nach dem Gruppieren, z. B. „nur Typen mit mindestens 3 Geräten“?',
      accept: ['HAVING'],
      misconceptions: [{ answer: 'WHERE', error: 'sql-where-statt-having', why: 'WHERE filtert einzelne Zeilen **vor** dem Gruppieren und kennt keine Aggregatfunktionen.' }],
      explanation: '**HAVING**, z. B. `GROUP BY Typ HAVING COUNT(*) >= 3`.',
    },
    {
      id: 'd03-q034', kind: 'number', skill: 'sql.select', difficulty: 1,
      prompt: `${T_MA}\n\n${sql(`SELECT Name FROM Mitarbeiter WHERE Abteilung = 'IT' AND StandortID = 1;`)}\n\nWie viele Zeilen liefert die Abfrage?`,
      answer: 2, unit: 'Zeilen',
      explanation: 'IT am Standort 1: Weber (101) und Krüger (106) → **2 Zeilen**.',
    },
    {
      id: 'd03-q035', kind: 'number', skill: 'sql.select', difficulty: 2,
      prompt: `${T_MA}\n\n${sql(`SELECT Name FROM Mitarbeiter WHERE Name LIKE '%er';`)}\n\nWie viele Zeilen liefert die Abfrage?`,
      answer: 3, unit: 'Zeilen',
      hints: ["'%er' bedeutet: beliebige Zeichen, dann „er“ am Ende."],
      explanation: 'Namen, die auf „er“ enden: Weber, Becker, Krüger → **3 Zeilen**.',
    },
    {
      id: 'd03-q036', kind: 'number', skill: 'sql.select', difficulty: 1,
      prompt: `${T_GER}\n\n${sql(`SELECT InvNr FROM Geraet WHERE Hersteller IN ('Dell', 'HP');`)}\n\nWie viele Zeilen liefert die Abfrage?`,
      answer: 5, unit: 'Zeilen',
      explanation: "Dell: G02, G03, G09; HP: G04, G10 → **5 Zeilen**. IN ('Dell', 'HP') entspricht Hersteller = 'Dell' OR Hersteller = 'HP'.",
    },
    {
      id: 'd03-q037', kind: 'free', skill: 'sql.join', difficulty: 3,
      prompt: `${T_GER}\n\n${T_MA}\n\nSchreibe eine Abfrage, die für **jede Abteilung** die **Anzahl der zugeordneten Geräte** ausgibt – auch für Abteilungen, deren Mitarbeitende kein Gerät haben (Anzahl 0).`,
      modelAnswer: 'SELECT m.Abteilung, COUNT(g.InvNr) AS Anzahl\nFROM Mitarbeiter m\nLEFT JOIN Geraet g ON m.PersNr = g.PersNr\nGROUP BY m.Abteilung;\n\nErgebnis: Buchhaltung 2, IT 3, Lager 0, Vertrieb 3. Wichtig: LEFT JOIN (sonst fehlt das Lager) und COUNT(g.InvNr) statt COUNT(*) (sonst würde das Lager mit 1 gezählt).',
      keywords: ['LEFT JOIN', 'COUNT(g.InvNr)', 'GROUP BY', 'Abteilung'],
      explanation: 'LEFT JOIN behält Abteilungen ohne Geräte; COUNT(Spalte) zählt die NULL-Zeile nicht mit.',
    },
    {
      id: 'd03-q038', kind: 'single', skill: 'sql.aggregat', difficulty: 3,
      prompt: `Warum ist diese Abfrage nach SQL-Standard **fehlerhaft**?\n\n${sql(`SELECT Typ, Hersteller, COUNT(*)
FROM Geraet
GROUP BY Typ;`)}`,
      options: [
        'Hersteller steht im SELECT, aber weder im GROUP BY noch in einer Aggregatfunktion.',
        'COUNT(*) darf nicht zusammen mit GROUP BY verwendet werden.',
        'Es fehlt eine HAVING-Klausel.',
        'GROUP BY muss vor FROM stehen.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'COUNT(*) mit GROUP BY ist der Normalfall (Anzahl je Gruppe).', error: 'sql-groupby-regel' },
        '2': { why: 'HAVING ist optional.', error: 'sql-groupby-regel' },
        '3': { why: 'Die Schreibreihenfolge ist SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY.', error: 'sql-syntax' },
      },
      explanation: 'Für die Gruppe „Monitor“ gibt es zwei Hersteller (Dell, LG) – welcher soll angezeigt werden? Lösung: `GROUP BY Typ, Hersteller` oder Hersteller weglassen.',
    },
    {
      id: 'd03-q039', kind: 'number', skill: 'sql.join', difficulty: 3,
      prompt: `${T_MA}\n\n${T_ST}\n\n${sql(`SELECT * FROM Mitarbeiter, Standort;`)}\n\nDie Verknüpfungsbedingung wurde vergessen. Wie viele Zeilen liefert die Abfrage?`,
      answer: 18, unit: 'Zeilen',
      misconceptions: [{ answer: '6', error: 'sql-kartesisches-produkt', why: 'Mit der Bedingung WHERE Mitarbeiter.StandortID = Standort.StandortID wären es 6. Ohne Bedingung wird jede Zeile mit jeder kombiniert.' }],
      explanation: 'Kartesisches Produkt: 6 Mitarbeitende · 3 Standorte = **18 Zeilen**.',
    },
    {
      id: 'd03-q040', kind: 'text', skill: 'sql.select', difficulty: 1,
      prompt: 'Ergänze die Lücke, damit die Namen **alphabetisch sortiert** ausgegeben werden:\n\n`SELECT Name FROM Mitarbeiter ________ Name;`',
      accept: ['ORDER BY', 'ORDER BY Name ASC', 'ORDER BY ASC'],
      misconceptions: [
        { answer: 'SORT BY', error: 'sql-syntax', why: 'In SQL heißt es ORDER BY.' },
        { answer: 'GROUP BY', error: 'sql-groupby-orderby', why: 'GROUP BY bildet Gruppen, sortiert aber nicht zuverlässig.' },
      ],
      explanation: '`SELECT Name FROM Mitarbeiter ORDER BY Name;` – ASC (aufsteigend) ist Standard.',
    },
    {
      id: 'd03-q041', kind: 'single', skill: 'sql.ddl', difficulty: 2,
      prompt: 'Was ist der Unterschied zwischen `DELETE FROM Geraet;` und `DROP TABLE Geraet;`?',
      options: [
        'DELETE entfernt alle Zeilen, die Tabelle bleibt bestehen; DROP TABLE löscht die Tabelle samt Struktur.',
        'Beide tun dasselbe.',
        'DELETE löscht die Tabelle, DROP TABLE nur die Zeilen.',
        'DROP TABLE löscht nur die erste Zeile.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Nach DELETE kann man sofort wieder INSERT ausführen, nach DROP TABLE existiert die Tabelle nicht mehr.', error: 'sql-delete-drop' },
        '2': { why: 'Genau umgekehrt.', error: 'sql-delete-drop' },
        '3': { why: 'DROP TABLE entfernt die gesamte Tabelle.', error: 'sql-delete-drop' },
      },
      explanation: 'DELETE (DML) entfernt Daten, DROP (DDL) entfernt die Struktur.',
    },
  ],
};
