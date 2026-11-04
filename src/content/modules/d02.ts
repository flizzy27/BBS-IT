import type { Module } from '../types';

/* Durchgehendes Normalisierungsbeispiel: Leihgeräte-Ausgabe der IT */
const T_UNF = `| PersNr | Name | Abteilung | StandortNr | Stadt | Geräte |
|---|---|---|---|---|---|
| 101 | Weber | IT | 1 | Hamburg | L01 Notebook Lenovo (12.01.2026), L03 Beamer Epson (02.02.2026) |
| 102 | Yilmaz | Vertrieb | 2 | Berlin | L02 Notebook Dell (05.01.2026) |
| 103 | Schulz | Buchhaltung | 1 | Hamburg | L01 Notebook Lenovo (20.02.2026), L04 Headset Jabra (20.02.2026) |`;

const T_1NF = `| PersNr | Name | Abteilung | StandortNr | Stadt | InvNr | Typ | Hersteller | Ausgabedatum |
|---|---|---|---|---|---|---|---|---|
| 101 | Weber | IT | 1 | Hamburg | L01 | Notebook | Lenovo | 2026-01-12 |
| 101 | Weber | IT | 1 | Hamburg | L03 | Beamer | Epson | 2026-02-02 |
| 102 | Yilmaz | Vertrieb | 2 | Berlin | L02 | Notebook | Dell | 2026-01-05 |
| 103 | Schulz | Buchhaltung | 1 | Hamburg | L01 | Notebook | Lenovo | 2026-02-20 |
| 103 | Schulz | Buchhaltung | 1 | Hamburg | L04 | Headset | Jabra | 2026-02-20 |`;

const ERM_INVENTAR = `\`\`\`
+----------+ 1             n +-------------+ 1         n +--------+
| Standort |--<arbeitet an>--| Mitarbeiter |--< nutzt >--| Geraet |
+----------+                 +-------------+             +--------+
                                                             | n
                                                      < installiert >
                                                             | m
                                                        +----------+
                                                        | Software |
                                                        +----------+
\`\`\`

Attribute (Schlüssel jeweils zuerst, im Diagramm als unterstrichene Ellipsen):
- **Standort**: StandortID, Stadt, Adresse
- **Mitarbeiter**: PersNr, Name, Abteilung
- **Geraet**: InvNr, Typ, Preis
- **Software**: SoftwareID, Bezeichnung, Hersteller`;

export const d02: Module = {
  id: 'd02',
  nr: 2,
  area: 'daten',
  title: 'Datenmodellierung: ER-Modell und Normalisierung',
  short: 'Vom Szenario zum Entity-Relationship-Modell, Kardinalitäten (Chen, Krähenfuß), Überführung in Tabellen und Normalisierung bis zur 3. Normalform.',
  icon: 'Workflow',
  relevance: 'ap1-teilweise',
  prerequisites: ['d01'],
  generators: ['daten.fkplatz', 'daten.kardinalitaet'],
  skills: [
    { id: 'dm.erm', module: 'd02', title: 'Entity-Relationship-Modell (Chen-Notation)', requires: ['db.tabelle'] },
    { id: 'dm.kardinalitaet', module: 'd02', title: 'Kardinalitäten in Chen-, Krähenfuß- und (min,max)-Notation', requires: ['dm.erm', 'db.beziehungen'] },
    { id: 'dm.tabellenmodell', module: 'd02', title: 'ERM in ein Tabellenmodell überführen', requires: ['dm.kardinalitaet', 'db.schluessel'] },
    { id: 'dm.abhaengigkeit', module: 'd02', title: 'Funktionale Abhängigkeiten erkennen', requires: ['db.schluessel'] },
    { id: 'dm.nf1', module: 'd02', title: '1. Normalform', requires: ['db.anomalien'] },
    { id: 'dm.nf2', module: 'd02', title: '2. Normalform', requires: ['dm.nf1', 'dm.abhaengigkeit'] },
    { id: 'dm.nf3', module: 'd02', title: '3. Normalform', requires: ['dm.nf2'] },
  ],
  lessons: [
    /* ------------------------------------------------------------ */
    {
      id: 'd02-l01',
      title: 'Vom Szenario zum ER-Modell',
      minutes: 25,
      relevance: 'ap1-teilweise',
      skills: ['dm.erm'],
      steps: [
        {
          type: 'explain',
          title: 'Erst planen, dann Tabellen bauen',
          body: `Bevor eine Datenbank angelegt wird, entwirft man ein **Datenmodell**. Das bekannteste Werkzeug ist das **Entity-Relationship-Modell (ERM)** nach Peter Chen (1976). Es beschreibt, *welche Dinge* gespeichert werden und *wie sie zusammenhängen* – noch ohne an Tabellen oder ein bestimmtes DBMS zu denken. Ein ERM ist gut mit Kundinnen und Kunden besprechbar und wird danach in Tabellen überführt.

| Begriff | Bedeutung | Beispiel |
|---|---|---|
| **Entität** | ein einzelnes, unterscheidbares Objekt der realen Welt | das Notebook G07 |
| **Entitätstyp** (Entitätsmenge) | die Gesamtheit gleichartiger Entitäten → wird später eine Tabelle | Geraet |
| **Attribut** | Eigenschaft eines Entitätstyps | Typ, Hersteller, Preis |
| **Schlüsselattribut** | Attribut, das jede Entität eindeutig kennzeichnet (wird unterstrichen) | InvNr |
| **Beziehung** / **Beziehungstyp** | Zusammenhang zwischen Entitätstypen | Mitarbeiter *nutzt* Gerät |
| **Kardinalität** | wie viele Entitäten an einer Beziehung beteiligt sein können | 1:n |

**Symbole der Chen-Notation**

| Symbol | Bedeutung |
|---|---|
| Rechteck | Entitätstyp |
| Raute | Beziehungstyp (meist ein Verb: „nutzt“, „arbeitet an“) |
| Ellipse (Oval) | Attribut |
| unterstrichenes Attribut | Schlüsselattribut (Primärschlüssel) |
| Linie | verbindet Entitätstypen mit Beziehungen bzw. Attributen; an den Linien stehen die Kardinalitäten 1, n, m |

**Vorgehen bei einer Textaufgabe**
1. **Substantive** markieren → Kandidaten für Entitätstypen oder Attribute. Faustregel: Hat das „Ding“ eigene Eigenschaften und gibt es mehrere davon, ist es ein Entitätstyp (Standort mit Stadt und Adresse). Beschreibt es nur etwas anderes, ist es ein Attribut (Preis).
2. **Verben** markieren → Kandidaten für Beziehungen („nutzt“, „ist installiert auf“).
3. Je Entitätstyp einen **Schlüssel** festlegen.
4. Je Beziehung die **Kardinalität** bestimmen (nächste Lektion).
5. Konkrete **Werte** (Hamburg, Lenovo) sind keine Entitätstypen, sondern Attributwerte.`,
        },
        {
          type: 'explain',
          title: 'Das ERM der Inventar-Datenbank',
          body: `**Anforderung der IT-Leitung (Auszug):** „Wir wollen alle **Geräte** mit Inventarnummer, Typ und Preis erfassen. Jedes Gerät wird höchstens einem **Mitarbeitenden** zugeordnet; Mitarbeitende haben Personalnummer und Namen und arbeiten an genau einem **Standort** (Hamburg oder Berlin, mit Adresse). Außerdem soll erfasst werden, welche **Software** auf welchen Geräten installiert ist.“

Daraus ergibt sich (vereinfacht als Textgrafik):

${ERM_INVENTAR}

- Entitätstypen: **Standort**, **Mitarbeiter**, **Geraet**, **Software**
- Beziehungen: Standort 1 : n Mitarbeiter („arbeitet an“), Mitarbeiter 1 : n Geraet („nutzt“), Geraet n : m Software („installiert“)
- „Hamburg“ und „Berlin“ sind **Werte** des Attributs Stadt, keine eigenen Entitätstypen.

In der Prüfung zeichnest du das ERM von Hand: Rechtecke, Rauten, Ovale für Attribute, Schlüssel unterstrichen, Kardinalitäten an die Linien.`,
        },
        {
          type: 'visual',
          title: 'Bausteine der Chen-Notation',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Rechteck', icon: 'Square', text: 'Entitätstyp, z. B. Geraet. Wird später zur Tabelle.' },
                { title: 'Raute', icon: 'Diamond', text: 'Beziehungstyp, z. B. „nutzt“. Meist ein Verb.' },
                { title: 'Ellipse', icon: 'Circle', text: 'Attribut, z. B. Preis. Schlüsselattribut unterstrichen.' },
                { title: '1, n, m', icon: 'Hash', text: 'Kardinalitäten an den Linien: 1:1, 1:n, n:m.' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Entitätstypen aus einem Text bestimmen',
          problem: `Ein Kunde des IT-Systemhauses, eine Fahrschule, schreibt: „Wir haben mehrere **Filialen** in Hamburg. Jede Filiale hat **Fahrlehrer**. Jeder Fahrlehrer arbeitet in genau einer Filiale und hat eine Telefonnummer. **Fahrschüler** buchen **Fahrstunden** bei einem Fahrlehrer, jede Fahrstunde hat Datum und Uhrzeit.“ Bestimme Entitätstypen, Attribute und Beziehungen.`,
          steps: [
            { label: '1. Substantive', body: 'Filialen, Hamburg, Fahrlehrer, Telefonnummer, Fahrschüler, Fahrstunden, Datum, Uhrzeit.' },
            { label: '2. Entitätstyp oder Attribut?', body: 'Mehrere Exemplare mit eigenen Eigenschaften → **Filiale, Fahrlehrer, Fahrschüler, Fahrstunde** sind Entitätstypen. Telefonnummer, Datum, Uhrzeit beschreiben etwas → **Attribute**. „Hamburg“ ist ein **Wert** (Attribut Ort der Filiale).' },
            { label: '3. Verben → Beziehungen', body: 'Fahrlehrer *arbeitet in* Filiale; Fahrschüler *bucht* Fahrstunde; Fahrstunde *wird gegeben von* Fahrlehrer.' },
            { label: '4. Schlüssel', body: 'FilialNr, LehrerNr, SchuelerNr, StundenNr (künstliche Schlüssel).' },
          ],
          result: 'Entitätstypen: Filiale, Fahrlehrer, Fahrschüler, Fahrstunde. Beziehungen: arbeitet in (Filiale–Fahrlehrer), bucht (Fahrschüler–Fahrstunde), gibt (Fahrlehrer–Fahrstunde).',
        },
        {
          type: 'check',
          question: {
            id: 'd02-c01', kind: 'match', skill: 'dm.erm', difficulty: 1,
            prompt: 'Ordne die Symbole der **Chen-Notation** ihrer Bedeutung zu.',
            left: ['Rechteck', 'Raute', 'Ellipse', 'unterstrichener Attributname'],
            right: ['Entitätstyp', 'Beziehungstyp', 'Attribut', 'Schlüsselattribut'],
            answer: [0, 1, 2, 3],
            explanation: 'Rechteck = Entitätstyp, Raute = Beziehung, Ellipse = Attribut, unterstrichen = Schlüssel.',
          },
        },
        { type: 'practice', title: 'Übung: ER-Modell', questionIds: ['d02-q001', 'd02-q002', 'd02-q003', 'd02-q031'], count: 4, difficulty: 1 },
        {
          type: 'summary',
          points: [
            'ERM = Planungsmodell: Entitätstypen, Attribute, Beziehungen, Kardinalitäten.',
            'Chen: Rechteck = Entitätstyp, Raute = Beziehung, Ellipse = Attribut, Schlüssel unterstrichen.',
            'Substantive → Entitätstypen/Attribute, Verben → Beziehungen.',
            'Konkrete Werte (Hamburg) sind keine Entitätstypen.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'd02-l02',
      title: 'Kardinalitäten lesen: Chen, Krähenfuß und (min,max)',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['dm.kardinalitaet'],
      steps: [
        {
          type: 'explain',
          title: 'Drei Schreibweisen für dieselbe Aussage',
          body: `Die Kardinalität bestimmst du wie in Modul d01: **beide Richtungen** fragen. In Diagrammen gibt es dafür verschiedene Notationen. Für die Prüfung musst du vor allem **Chen** lesen und zeichnen können; die **Krähenfuß-Notation** begegnet dir in vielen Werkzeugen (z. B. MySQL Workbench, draw.io).

**1. Chen-Notation (1, n, m)**

\`\`\`
+----------+  1                  n  +-------------+
| Standort |-----< arbeitet an >-----| Mitarbeiter |
+----------+                        +-------------+
\`\`\`
Lies: **Ein** Standort hat **n** (viele) Mitarbeitende; jede Person arbeitet an **einem** Standort. Die Zahl steht jeweils auf der Seite, die „so viele“ ist.

**2. Krähenfuß-Notation (crow's foot)**

\`\`\`
Standort ||---------------o< Mitarbeiter
\`\`\`

| Symbol am Linienende | Bedeutung |
|---|---|
| \`||\` | genau eins (mindestens 1, höchstens 1) |
| \`o|\` | null oder eins (optional) |
| \`|<\` | eins oder viele |
| \`o<\` | null oder viele |

Das Symbol direkt an der Tabelle ist das **Maximum** (\`|\` = eins, \`<\` = Krähenfuß = viele), das weiter außen das **Minimum** (\`o\` = null, \`|\` = eins). Im Beispiel: Jede Person hat **genau einen** Standort (\`||\` an Standort), ein Standort hat **null bis viele** Mitarbeitende (\`o<\` an Mitarbeiter).

**3. (min,max)-Notation**

\`\`\`
Mitarbeiter (1,1) -----< arbeitet an >----- (0,*) Standort
\`\`\`
Hier steht an jedem Entitätstyp, **wie oft eine seiner Entitäten an der Beziehung teilnimmt**: Jede Person nimmt genau einmal teil (1,1), jeder Standort null- bis beliebig oft (0,*). Achtung: Die Leserichtung ist also **umgekehrt** zur Chen-Notation – lies immer die Legende der Aufgabe!

**Muss oder kann?** Die Minima (0 oder 1) sagen, ob eine Beziehung **optional** oder **verpflichtend** ist. Beispiel: Ein Gerät *kann* einer Person zugeordnet sein (Lagergerät: keine Person) → Minimum 0 → der Fremdschlüssel darf NULL sein.`,
        },
        {
          type: 'visual',
          title: 'Krähenfuß-Symbole',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: '||  genau eins', icon: 'Minus', text: 'Min 1, Max 1 – z. B. jede Person hat genau einen Standort.' },
                { title: 'o|  null oder eins', icon: 'CircleDot', text: 'Optional, höchstens eins – z. B. ein Gerät hat keine oder eine Person.' },
                { title: '|<  eins oder viele', icon: 'GitFork', text: 'Mindestens eins – z. B. jede Bestellung hat mindestens eine Position.' },
                { title: 'o<  null oder viele', icon: 'Boxes', text: 'Beliebig viele, auch keine – z. B. ein Standort hat 0..n Mitarbeitende.' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Ein Krähenfuß-Diagramm vollständig lesen',
          problem: `Lies das Diagramm in beide Richtungen und gib die Kardinalität in Chen-Schreibweise an:

\`\`\`
Mitarbeiter o|---------------o< Geraet
\`\`\``,
          steps: [
            { label: '1. Symbol an Geraet lesen', body: '`o<` an Geraet: Eine Person hat **null bis viele** Geräte.' },
            { label: '2. Symbol an Mitarbeiter lesen', body: '`o|` an Mitarbeiter: Ein Gerät gehört **keiner oder genau einer** Person (Lagergeräte sind niemandem zugeordnet).' },
            { label: '3. Maxima vergleichen', body: 'Maximum auf Mitarbeiter-Seite 1, auf Geraet-Seite viele → **1:n**.' },
            { label: '4. Folge für die Tabellen', body: 'Fremdschlüssel PersNr in Geraet; weil das Minimum 0 ist, darf PersNr **NULL** sein.' },
          ],
          result: 'Mitarbeiter 1 : n Geraet, beide Seiten optional; FK PersNr in Geraet, NULL erlaubt.',
        },
        {
          type: 'check',
          question: {
            id: 'd02-c02', kind: 'single', skill: 'dm.kardinalitaet', difficulty: 2,
            prompt: 'Was bedeutet das Diagramm `Abteilung ||-----|< Mitarbeiter`?',
            options: [
              'Jede Person gehört zu genau einer Abteilung; jede Abteilung hat mindestens eine Person.',
              'Jede Abteilung hat genau eine Person; jede Person gehört zu mehreren Abteilungen.',
              'Jede Person gehört zu keiner oder einer Abteilung; Abteilungen können leer sein.',
              'Es handelt sich um eine n:m-Beziehung.',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'Das Symbol an Mitarbeiter (`|<`) sagt: eine Abteilung hat **eine oder viele** Personen.', error: 'dm-kraehenfuss-lesen' },
              '2': { why: '`||` bedeutet genau eins (Minimum 1), nicht „keine oder eine“ (`o|`). Und `|<` bedeutet mindestens eine Person.', error: 'dm-kraehenfuss-lesen' },
              '3': { why: 'Ein Krähenfuß ist nur auf einer Seite – also 1:n.', error: 'dm-kraehenfuss-lesen' },
            },
            explanation: '`||` an Abteilung: jede Person hat genau eine Abteilung. `|<` an Mitarbeiter: jede Abteilung hat eine oder viele Personen → 1:n, beidseitig verpflichtend.',
          },
        },
        { type: 'practice', title: 'Übung: Kardinalitäten', generator: 'daten.kardinalitaet', count: 4, difficulty: 2 },
        { type: 'practice', title: 'Übung: Notationen lesen', questionIds: ['d02-q004', 'd02-q005', 'd02-q006', 'd02-q030'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Chen: 1, n, m an den Linien; Zahl steht bei der Seite, die so oft vorkommt.',
            'Krähenfuß: Symbol an der Tabelle = Maximum, außen = Minimum (o = 0, | = 1, < = viele).',
            '(min,max): Teilnahme je Entität, Leserichtung umgekehrt zu Chen.',
            'Minimum 0 = optional → Fremdschlüssel darf NULL sein.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'd02-l03',
      title: 'Vom ERM zum Tabellenmodell',
      minutes: 25,
      relevance: 'ap1-teilweise',
      skills: ['dm.tabellenmodell'],
      steps: [
        {
          type: 'explain',
          title: 'Überführungsregeln',
          body: `Aus dem ERM entsteht das **relationale Modell** (Tabellenmodell). Dafür gelten feste Regeln:

| Regel | Element im ERM | Ergebnis im Tabellenmodell |
|---|---|---|
| 1 | jeder **Entitätstyp** | eine eigene Tabelle; Schlüsselattribut → Primärschlüssel |
| 2 | **1:n-Beziehung** | Primärschlüssel der 1-Seite wird als **Fremdschlüssel** in die Tabelle der **n-Seite** aufgenommen |
| 3 | **n:m-Beziehung** | eigene **Zwischentabelle** mit den Primärschlüsseln beider Seiten als Fremdschlüssel; zusammen bilden sie den Primärschlüssel; Beziehungsattribute kommen dazu |
| 4 | **1:1-Beziehung** | Fremdschlüssel in **einer** der beiden Tabellen mit Eindeutigkeit (UNIQUE) – am besten auf der optionalen Seite; alternativ Tabellen zusammenlegen |

**Kurzschreibweise (relationales Schema)**

Primärschlüssel werden in der Prüfung unterstrichen. Hier in der App markieren wir sie **fett**; Fremdschlüssel bekommen ein \`#\`.

Aus dem Inventar-ERM (Lektion 1) wird:

- Standort(**StandortID**, Stadt, Adresse)
- Mitarbeiter(**PersNr**, Name, Abteilung, #StandortID)
- Geraet(**InvNr**, Typ, Preis, #PersNr)
- Software(**SoftwareID**, Bezeichnung, Hersteller)
- Installation(**#InvNr, #SoftwareID**, Installationsdatum)

**Zählregel für Prüfungsaufgaben:** Anzahl Tabellen = Anzahl Entitätstypen + Anzahl n:m-Beziehungen (1:1 und 1:n erzeugen keine eigene Tabelle). Im Beispiel: 4 + 1 = **5 Tabellen**.`,
        },
        {
          type: 'visual',
          title: 'Welche Beziehung – welche Umsetzung?',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: '1:n', icon: 'GitFork', text: 'PK der 1-Seite als FK auf die n-Seite. Keine neue Tabelle.' },
                { title: 'n:m', icon: 'Combine', text: 'Neue Zwischentabelle: beide FKs = zusammengesetzter PK, plus Beziehungsattribute.' },
                { title: '1:1', icon: 'Link', text: 'FK mit UNIQUE in einer Tabelle (meist der optionalen) oder zusammenlegen.' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Ein ERM vollständig überführen',
          problem: `Das Schulungs-ERM der Elektro Krämer GmbH: **Abteilung** 1 : n **Mitarbeiter** („gehört zu“); **Mitarbeiter** n : m **Schulung** („nimmt teil“, mit Attribut *Note*); **Mitarbeiter** 1 : 1 **Dienstwagen** („fährt“, nicht jede Person hat einen Dienstwagen, jeder Dienstwagen ist einer Person zugeordnet). Leite das Tabellenmodell ab und bestimme die Anzahl der Tabellen.`,
          steps: [
            { label: '1. Entitätstypen → Tabellen', body: 'Abteilung(**AbtNr**, Bezeichnung), Mitarbeiter(**PersNr**, Name), Schulung(**SchulungsNr**, Thema, Datum), Dienstwagen(**Kennzeichen**, Modell).' },
            { label: '2. 1:n Abteilung – Mitarbeiter', body: 'FK auf der n-Seite: Mitarbeiter(**PersNr**, Name, **#AbtNr**).' },
            { label: '3. n:m Mitarbeiter – Schulung', body: 'Zwischentabelle Teilnahme(**#PersNr, #SchulungsNr**, Note). Die Note hängt von Person **und** Schulung ab.' },
            { label: '4. 1:1 Mitarbeiter – Dienstwagen', body: 'Jeder Dienstwagen gehört zu genau einer Person, nicht jede Person hat einen → FK in Dienstwagen: Dienstwagen(**Kennzeichen**, Modell, #PersNr UNIQUE NOT NULL). So entstehen keine NULL-Werte bei Personen ohne Wagen.' },
            { label: '5. Tabellen zählen', body: '4 Entitätstypen + 1 n:m-Beziehung = **5 Tabellen**.' },
          ],
          result: 'Abteilung, Mitarbeiter (#AbtNr), Schulung, Teilnahme (#PersNr, #SchulungsNr, Note), Dienstwagen (#PersNr UNIQUE) – 5 Tabellen.',
        },
        {
          type: 'check',
          question: {
            id: 'd02-c03', kind: 'number', skill: 'dm.tabellenmodell', difficulty: 2,
            prompt: 'Ein ERM hat die Entitätstypen **Raum**, **Netzwerkdose**, **Switch** und **Switchport**. Beziehungen: Raum 1:n Netzwerkdose, Switch 1:n Switchport, Netzwerkdose 1:1 Switchport. Wie viele Tabellen entstehen im Tabellenmodell?',
            answer: 4,
            unit: 'Tabellen',
            hints: ['Jeder Entitätstyp wird eine Tabelle.', 'Nur n:m-Beziehungen erzeugen zusätzliche Tabellen.'],
            misconceptions: [
              { answer: '5', error: 'dm-tabelle-fuer-1-1', why: 'Eine 1:1-Beziehung braucht keine eigene Tabelle – ein Fremdschlüssel mit UNIQUE genügt.' },
              { answer: '7', error: 'dm-tabelle-fuer-jede-beziehung', why: 'Nur n:m-Beziehungen bekommen eine eigene Tabelle. 1:n und 1:1 werden über Fremdschlüssel gelöst.' },
            ],
            explanation: '4 Entitätstypen, keine n:m-Beziehung → **4 Tabellen**. Raum–Dose: FK RaumNr in Netzwerkdose; Switch–Port: FK SwitchID in Switchport; Dose–Port: FK mit UNIQUE in einer der beiden Tabellen.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'd02-c04', kind: 'single', skill: 'dm.tabellenmodell', difficulty: 2,
            prompt: 'Zwischen **Mitarbeiter** und **Projekt** besteht eine n:m-Beziehung mit dem Attribut *Stundenanteil*. Welches Tabellenmodell ist richtig?',
            options: [
              'Mitarbeiter(**PersNr**, Name), Projekt(**ProjNr**, Titel), Mitarbeit(**#PersNr, #ProjNr**, Stundenanteil)',
              'Mitarbeiter(**PersNr**, Name, #ProjNr, Stundenanteil), Projekt(**ProjNr**, Titel)',
              'Mitarbeiter(**PersNr**, Name), Projekt(**ProjNr**, Titel, #PersNr, Stundenanteil)',
              'Mitarbeiter(**PersNr**, Name, #ProjNr), Projekt(**ProjNr**, Titel, #PersNr), Stundenanteil in beiden',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'So könnte jede Person nur an **einem** Projekt mitarbeiten (1:n).', error: 'dm-nm-ohne-zwischentabelle' },
              '2': { why: 'So hätte jedes Projekt nur **eine** Person (1:n in der anderen Richtung).', error: 'dm-nm-ohne-zwischentabelle' },
              '3': { why: 'Gegenseitige Fremdschlüssel bilden kein n:m ab und erzeugen Redundanz.', error: 'dm-nm-ohne-zwischentabelle' },
            },
            explanation: 'n:m → Zwischentabelle mit beiden Fremdschlüsseln als zusammengesetztem PK; das Beziehungsattribut Stundenanteil gehört in die Zwischentabelle.',
          },
        },
        { type: 'practice', title: 'Übung: Fremdschlüssel richtig platzieren', generator: 'daten.fkplatz', count: 4, difficulty: 2 },
        { type: 'practice', title: 'Übung: Tabellenmodell', questionIds: ['d02-q007', 'd02-q008', 'd02-q009', 'd02-q010', 'd02-q011', 'd02-q012', 'd02-q013', 'd02-q014'], count: 5, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Jeder Entitätstyp → Tabelle, Schlüsselattribut → Primärschlüssel.',
            '1:n → FK auf der n-Seite. 1:1 → FK mit UNIQUE in einer Tabelle.',
            'n:m → Zwischentabelle, beide FKs bilden den PK, Beziehungsattribute hinein.',
            'Anzahl Tabellen = Entitätstypen + n:m-Beziehungen.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'd02-l04',
      title: 'Funktionale Abhängigkeit und 1. Normalform',
      minutes: 25,
      relevance: 'ap1-teilweise',
      skills: ['dm.abhaengigkeit', 'dm.nf1'],
      steps: [
        {
          type: 'explain',
          title: 'Normalisierung: Anomalien systematisch beseitigen',
          body: `Oft beginnt ein Datenbankprojekt nicht mit einem ERM, sondern mit einer vorhandenen Liste. Die **Normalisierung** zerlegt eine solche Tabelle schrittweise in mehrere Tabellen, bis keine Redundanz und keine Anomalien mehr auftreten. Für die Praxis reichen die **ersten drei Normalformen** (1NF bis 3NF). Jede Normalform setzt die vorherige voraus.

**Grundbegriff: funktionale Abhängigkeit**

B ist **funktional abhängig** von A (Schreibweise **A → B**), wenn zu jedem Wert von A **genau ein** Wert von B gehört.

| Abhängigkeit | Bedeutung |
|---|---|
| PersNr → Name | Zu einer Personalnummer gehört genau ein Name. |
| InvNr → Hersteller | Zu einer Inventarnummer gehört genau ein Hersteller. |
| (PersNr, InvNr) → Ausgabedatum | Erst Person **und** Gerät zusammen bestimmen das Datum. |
| Name → PersNr | **gilt nicht** – zwei Personen können gleich heißen. |

**Ausgangslage: die Leihgeräte-Liste der IT** (unnormalisiert, UNF)

${T_UNF}

**1. Normalform (1NF):** Eine Tabelle ist in 1NF, wenn
- jedes Attribut nur **atomare** (nicht weiter zerlegbare) Werte enthält,
- es **keine Wiederholungsgruppen** gibt (keine Listen von Werten in einer Zelle, keine Spalten Gerät1, Gerät2, Gerät3 …).

Die Spalte „Geräte“ verletzt das gleich doppelt: Sie enthält **mehrere** Geräte (Wiederholungsgruppe), und jeder Eintrag ist **zusammengesetzt** (InvNr, Typ, Hersteller, Datum).

**Vorgehen zur 1NF:** Mehrfachwerte auf **eigene Zeilen** verteilen, zusammengesetzte Werte auf **eigene Spalten**. Dann einen Primärschlüssel bestimmen.

${T_1NF}

Primärschlüssel: **(PersNr, InvNr)** – PersNr allein wiederholt sich, InvNr allein auch (L01 wurde zweimal verliehen). Vereinfachung: Eine Person leiht dasselbe Gerät höchstens einmal.

Die Tabelle ist jetzt in 1NF – aber die Redundanz ist sogar **größer** geworden (Weber steht zweimal, Hamburg dreimal). Das lösen die nächsten Normalformen.`,
        },
        {
          type: 'visual',
          title: 'Die drei Normalformen im Überblick',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: '1. NF', icon: 'Rows3', text: 'Nur atomare Werte, keine Wiederholungsgruppen. Ein Wert pro Zelle.' },
                { title: '2. NF', icon: 'KeyRound', text: '1NF + jedes Nichtschlüsselattribut hängt vom **ganzen** Primärschlüssel ab.' },
                { title: '3. NF', icon: 'Split', text: '2NF + kein Nichtschlüsselattribut hängt von einem anderen Nichtschlüsselattribut ab.' },
              ],
            },
          },
          caption: 'Merksatz: Jedes Nichtschlüsselattribut hängt vom Schlüssel ab (1NF), vom ganzen Schlüssel (2NF) und von nichts als dem Schlüssel (3NF).',
        },
        {
          type: 'example',
          title: 'Eine Liste in die 1NF überführen',
          problem: `Die Software-Liste eines Kunden:

| InvNr | Standort | Software |
|---|---|---|
| G01 | Hamburg | Office, VPN-Client |
| G02 | Berlin | Office |
| G05 | Hamburg | Office, VPN-Client, Buchhaltung |

Überführe sie in die 1NF, gib die Zeilenzahl und den Primärschlüssel an.`,
          steps: [
            { label: '1. Verstoß finden', body: 'Spalte Software enthält mehrere Werte je Zelle → nicht atomar.' },
            { label: '2. Mehrfachwerte aufteilen', body: 'Je Programm eine Zeile: G01 → 2 Zeilen, G02 → 1 Zeile, G05 → 3 Zeilen.' },
            { label: '3. Zeilen zählen', body: '2 + 1 + 3 = **6 Zeilen**.' },
            { label: '4. Primärschlüssel', body: 'InvNr wiederholt sich, Software auch → zusammengesetzter PK **(InvNr, Software)**.' },
          ],
          result: '6 Zeilen mit atomaren Werten; PK (InvNr, Software).',
        },
        {
          type: 'check',
          question: {
            id: 'd02-c05', kind: 'single', skill: 'dm.nf1', difficulty: 1,
            prompt: 'Welche Spalte verletzt die **1. Normalform**?\n\n| PersNr | Name | Telefon | Geräte |\n|---|---|---|---|\n| 101 | Weber | 040 123456-11 | G01, G08 |',
            options: ['PersNr', 'Name', 'Telefon', 'Geräte'],
            answer: 3,
            distractors: {
              '0': { why: 'Eine einzelne Nummer ist atomar.', error: 'dm-nf1-atomar' },
              '1': { why: 'Der Name ist hier ein einzelner Wert. (Ob man Vor- und Nachname trennt, hängt von der Nutzung ab.)', error: 'dm-nf1-atomar' },
              '2': { why: 'Die Telefonnummer ist ein einzelner Wert (Text).', error: 'dm-nf1-atomar' },
            },
            explanation: 'Die Zelle „G01, G08“ enthält **zwei** Werte → nicht atomar → Verstoß gegen die 1NF.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'd02-c06', kind: 'text', skill: 'dm.abhaengigkeit', difficulty: 2,
            prompt: `Leihgeräte-Tabelle in 1NF:\n\n${T_1NF}\n\nVon welchem Attribut ist **Hersteller** funktional abhängig? (ein Attributname)`,
            accept: ['InvNr', 'Inventarnummer'],
            misconceptions: [{ answer: 'PersNr', error: 'dm-abhaengigkeit-falsch', why: 'Weber hat Geräte von Lenovo und Epson – PersNr bestimmt den Hersteller also nicht eindeutig.' }],
            explanation: 'Zu jeder InvNr gehört genau ein Hersteller (L01 → Lenovo, auch in beiden Zeilen) → **InvNr → Hersteller**.',
          },
        },
        { type: 'practice', title: 'Übung: 1NF und Abhängigkeiten', questionIds: ['d02-q015', 'd02-q016', 'd02-q017', 'd02-q025', 'd02-q026', 'd02-q028'], count: 5, difficulty: 1 },
        {
          type: 'summary',
          points: [
            'A → B: zu jedem Wert von A gehört genau ein Wert von B.',
            '1NF: atomare Werte, keine Wiederholungsgruppen.',
            'Weg zur 1NF: Mehrfachwerte → Zeilen, zusammengesetzte Werte → Spalten, dann PK bestimmen.',
            'Nach der 1NF ist die Redundanz oft größer – 2NF und 3NF räumen auf.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'd02-l05',
      title: '2. Normalform: der ganze Schlüssel',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['dm.nf2'],
      steps: [
        {
          type: 'explain',
          title: 'Teilabhängigkeiten auflösen',
          body: `**2. Normalform (2NF):** Die Tabelle ist in 1NF, und jedes **Nichtschlüsselattribut** ist **voll funktional** vom **gesamten** Primärschlüssel abhängig – nicht nur von einem Teil davon.

- **Nichtschlüsselattribut:** gehört nicht zum Primärschlüssel (genauer: zu keinem Schlüsselkandidaten).
- **Voll funktional abhängig:** hängt vom ganzen zusammengesetzten Schlüssel ab, nicht schon von einem Teil.
- Daraus folgt: Eine Tabelle in 1NF mit einem **einspaltigen** Primärschlüssel ist automatisch in 2NF. Die 2NF ist nur bei zusammengesetzten Schlüsseln ein Thema.

**Abhängigkeiten in der Leihgeräte-Tabelle (1NF, PK = PersNr + InvNr)**

| Attribut | hängt ab von | voll vom ganzen PK? |
|---|---|---|
| Name, Abteilung, StandortNr, Stadt | PersNr | nein → Teilabhängigkeit |
| Typ, Hersteller | InvNr | nein → Teilabhängigkeit |
| Ausgabedatum | PersNr **und** InvNr | ja |

**Vorgehen zur 2NF:** Für jeden Schlüsselteil, von dem Attribute abhängen, eine **eigene Tabelle** bilden. Der Schlüsselteil wird dort Primärschlüssel. In der Ausgangstabelle bleiben der vollständige Schlüssel und die voll abhängigen Attribute.

**Ergebnis 2NF**

Mitarbeiter (PK PersNr):

| PersNr | Name | Abteilung | StandortNr | Stadt |
|---|---|---|---|---|
| 101 | Weber | IT | 1 | Hamburg |
| 102 | Yilmaz | Vertrieb | 2 | Berlin |
| 103 | Schulz | Buchhaltung | 1 | Hamburg |

Leihgeraet (PK InvNr):

| InvNr | Typ | Hersteller |
|---|---|---|
| L01 | Notebook | Lenovo |
| L02 | Notebook | Dell |
| L03 | Beamer | Epson |
| L04 | Headset | Jabra |

Ausleihe (PK PersNr + InvNr, beide zugleich Fremdschlüssel):

| PersNr | InvNr | Ausgabedatum |
|---|---|---|
| 101 | L01 | 2026-01-12 |
| 101 | L03 | 2026-02-02 |
| 102 | L02 | 2026-01-05 |
| 103 | L01 | 2026-02-20 |
| 103 | L04 | 2026-02-20 |

Weber steht nur noch **einmal** in der Datenbank, das Notebook L01 auch. In Mitarbeiter steht „Hamburg“ aber immer noch doppelt – das ist ein Fall für die 3NF.`,
        },
        {
          type: 'visual',
          title: 'Teilabhängigkeit erkennen',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'nur von PersNr', icon: 'Users', text: 'Name, Abteilung, StandortNr, Stadt → eigene Tabelle Mitarbeiter.' },
                { title: 'nur von InvNr', icon: 'Laptop', text: 'Typ, Hersteller → eigene Tabelle Leihgeraet.' },
                { title: 'vom ganzen Schlüssel', icon: 'KeyRound', text: 'Ausgabedatum bleibt in Ausleihe (PersNr + InvNr).' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: '2NF für eine Schulungsliste',
          problem: `Tabelle Teilnahme (PK: PersNr + SchulungsNr):

| PersNr | SchulungsNr | Name | Thema | Note |
|---|---|---|---|---|
| 101 | S7 | Weber | Firewall-Grundlagen | 2 |
| 101 | S9 | Weber | IPv6 in der Praxis | 1 |
| 104 | S7 | Nowak | Firewall-Grundlagen | 3 |

Prüfe die 2NF und zerlege die Tabelle, falls nötig.`,
          steps: [
            { label: '1. Abhängigkeiten bestimmen', body: 'PersNr → Name; SchulungsNr → Thema; (PersNr, SchulungsNr) → Note.' },
            { label: '2. Verstoß feststellen', body: 'Name und Thema hängen nur von einem **Teil** des Schlüssels ab → nicht in 2NF.' },
            { label: '3. Zerlegen', body: 'Mitarbeiter(**PersNr**, Name), Schulung(**SchulungsNr**, Thema), Teilnahme(**#PersNr, #SchulungsNr**, Note).' },
            { label: '4. Kontrolle', body: '„Firewall-Grundlagen“ steht jetzt nur noch einmal (in Schulung), „Weber“ nur einmal (in Mitarbeiter).' },
          ],
          result: 'Drei Tabellen: Mitarbeiter, Schulung, Teilnahme (mit Note).',
        },
        {
          type: 'check',
          question: {
            id: 'd02-c07', kind: 'single', skill: 'dm.nf2', difficulty: 2,
            prompt: 'Tabelle Ausleihe(**PersNr, InvNr**, Ausgabedatum, Typ) mit zusammengesetztem PK (PersNr, InvNr). Welche Aussage trifft zu?',
            options: [
              'Sie verletzt die 2NF, weil Typ nur von InvNr abhängt.',
              'Sie verletzt die 1NF, weil sie zwei Schlüsselattribute hat.',
              'Sie ist in 3NF, weil alle Werte atomar sind.',
              'Sie verletzt die 2NF, weil Ausgabedatum vom ganzen Schlüssel abhängt.',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'Ein zusammengesetzter Schlüssel ist erlaubt; die 1NF fordert atomare Werte.', error: 'dm-nf-verwechselt' },
              '2': { why: 'Atomare Werte sichern nur die 1NF. Typ hängt nur von einem Schlüsselteil ab → 2NF verletzt.', error: 'dm-nf-verwechselt' },
              '3': { why: 'Volle Abhängigkeit vom ganzen Schlüssel ist genau das, was die 2NF verlangt.', error: 'dm-nf2-teilabhaengigkeit' },
            },
            explanation: 'InvNr → Typ ist eine **Teilabhängigkeit** → Typ gehört in die Tabelle Geraet. Ausgabedatum darf bleiben.',
          },
        },
        { type: 'practice', title: 'Übung: 2NF', questionIds: ['d02-q018', 'd02-q019', 'd02-q021', 'd02-q024', 'd02-q033'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            '2NF = 1NF + jedes Nichtschlüsselattribut hängt vom **ganzen** PK ab.',
            'Nur bei zusammengesetztem PK relevant; einspaltiger PK + 1NF ⇒ automatisch 2NF.',
            'Teilabhängige Attribute mit ihrem Schlüsselteil in eine eigene Tabelle auslagern.',
            'Voll abhängige Attribute (z. B. Ausgabedatum) bleiben in der Verbindungstabelle.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'd02-l06',
      title: '3. Normalform und der komplette Durchlauf',
      minutes: 30,
      relevance: 'ap1-teilweise',
      skills: ['dm.nf3'],
      steps: [
        {
          type: 'explain',
          title: 'Transitive Abhängigkeiten auflösen',
          body: `**3. Normalform (3NF):** Die Tabelle ist in 2NF, und **kein Nichtschlüsselattribut** ist **transitiv** vom Primärschlüssel abhängig. Anders gesagt: Nichtschlüsselattribute dürfen nicht von **anderen Nichtschlüsselattributen** abhängen.

**Transitive Abhängigkeit:** A → B und B → C, wobei B kein Schlüssel ist. Dann hängt C nur „über den Umweg B“ von A ab.

Im Beispiel: Tabelle Mitarbeiter(**PersNr**, Name, Abteilung, StandortNr, Stadt)
- PersNr → StandortNr (jede Person hat genau einen Standort)
- StandortNr → Stadt (Standort 1 liegt immer in Hamburg)
- also PersNr → StandortNr → Stadt: **Stadt ist transitiv abhängig**.

Folge: „Hamburg“ steht bei jeder Hamburger Person. Ändert sich die Stadt eines Standorts (oder kommt eine Adresse hinzu), droht eine Änderungsanomalie.

**Vorgehen zur 3NF:** Das „vermittelnde“ Attribut (StandortNr) wird Primärschlüssel einer **neuen Tabelle**, die abhängigen Attribute (Stadt) wandern mit. In der Ausgangstabelle bleibt StandortNr als **Fremdschlüssel**.

**Endergebnis 3NF – vier Tabellen**

| Tabelle | Schema |
|---|---|
| Standort | Standort(**StandortNr**, Stadt) |
| Mitarbeiter | Mitarbeiter(**PersNr**, Name, Abteilung, #StandortNr) |
| Leihgeraet | Leihgeraet(**InvNr**, Typ, Hersteller) |
| Ausleihe | Ausleihe(**#PersNr, #InvNr**, Ausgabedatum) |

Standort:

| StandortNr | Stadt |
|---|---|
| 1 | Hamburg |
| 2 | Berlin |

**Kontrollfragen für jede Tabelle**
1. Sind alle Werte atomar? → 1NF
2. Hängt jedes Nichtschlüsselattribut vom **ganzen** Schlüssel ab? → 2NF
3. Hängt ein Nichtschlüsselattribut von einem **anderen Nichtschlüsselattribut** ab? Wenn nein → 3NF

**Denormalisierung:** In der Praxis wird manchmal bewusst auf eine Normalform verzichtet, z. B. für schnellere Auswertungen in einem Data Warehouse. Das ist eine bewusste Entscheidung mit Nachteilen (Redundanz), kein Entwurfsfehler aus Unwissen.

**Prüfungshinweis:** Die Aufgaben verlangen meist: Verstoß benennen (welche Normalform, welches Attribut, warum) und die Tabellen nach der Zerlegung als Schema angeben. Begründe immer mit der Abhängigkeit (z. B. „InvNr → Hersteller ist eine Teilabhängigkeit“).`,
        },
        {
          type: 'visual',
          title: 'Vom Chaos zu vier Tabellen',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'UNF', icon: 'FileSpreadsheet', text: '1 Tabelle, Gerätelisten in einer Zelle.' },
                { title: '1NF', icon: 'Rows3', text: '1 Tabelle, 5 Zeilen, PK (PersNr, InvNr). Atomar, aber redundant.' },
                { title: '2NF', icon: 'KeyRound', text: '3 Tabellen: Mitarbeiter, Leihgeraet, Ausleihe.' },
                { title: '3NF', icon: 'Database', text: '4 Tabellen: + Standort. Jede Information nur einmal.' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Komplett durchgerechnet: Inventarliste bis 3NF',
          problem: `Die Abteilung Einkauf führt diese Inventarliste (bereits in 1NF; jedes Gerät gehört genau einer Person):

| InvNr | Typ | HerstellerID | Herstellername | PersNr | Name | StandortNr | Stadt |
|---|---|---|---|---|---|---|---|
| G01 | Notebook | H1 | Lenovo | 101 | Weber | 1 | Hamburg |
| G02 | Notebook | H2 | Dell | 102 | Yilmaz | 2 | Berlin |
| G03 | Monitor | H2 | Dell | 102 | Yilmaz | 2 | Berlin |
| G05 | Desktop | H1 | Lenovo | 103 | Schulz | 1 | Hamburg |

Bringe die Tabelle in die 3NF und gib die Anzahl der Tabellen an.`,
          steps: [
            { label: '1. Primärschlüssel', body: 'InvNr ist eindeutig → PK **InvNr** (einspaltig).' },
            { label: '2. 2NF prüfen', body: 'Einspaltiger PK und 1NF → automatisch **2NF**.' },
            { label: '3. Abhängigkeiten bestimmen', body: 'InvNr → Typ, HerstellerID, PersNr. HerstellerID → Herstellername. PersNr → Name, StandortNr. StandortNr → Stadt.' },
            { label: '4. Transitive Abhängigkeiten finden', body: 'InvNr → HerstellerID → Herstellername; InvNr → PersNr → Name, StandortNr; PersNr → StandortNr → Stadt. Herstellername, Name, StandortNr und Stadt sind transitiv abhängig.' },
            { label: '5. Zerlegen', body: 'Hersteller(**HerstellerID**, Herstellername); Standort(**StandortNr**, Stadt); Mitarbeiter(**PersNr**, Name, #StandortNr); Geraet(**InvNr**, Typ, #HerstellerID, #PersNr).' },
            { label: '6. Kontrolle', body: 'Mitarbeiter: Name und StandortNr hängen nur von PersNr ab, kein Nichtschlüsselattribut bestimmt ein anderes → 3NF. Gleiches gilt für alle anderen Tabellen. „Dell“ und „Berlin“ stehen nur noch je einmal.' },
          ],
          result: '4 Tabellen in 3NF: Hersteller, Standort, Mitarbeiter (#StandortNr), Geraet (#HerstellerID, #PersNr).',
        },
        {
          type: 'check',
          question: {
            id: 'd02-c08', kind: 'single', skill: 'dm.nf3', difficulty: 2,
            prompt: 'Tabelle Mitarbeiter(**PersNr**, Name, AbteilungsNr, Abteilungsname). Jede Abteilungsnummer hat genau einen Namen. In welcher **höchsten** Normalform ist die Tabelle?',
            options: ['1NF', '2NF', '3NF', 'nicht einmal 1NF'],
            answer: 1,
            distractors: {
              '0': { why: 'Der PK ist einspaltig – bei 1NF ist die Tabelle damit automatisch in 2NF.', error: 'dm-nf2-einspaltiger-pk' },
              '2': { why: 'PersNr → AbteilungsNr → Abteilungsname ist eine transitive Abhängigkeit → 3NF verletzt.', error: 'dm-nf3-transitiv' },
              '3': { why: 'Alle Werte sind atomar.', error: 'dm-nf1-atomar' },
            },
            explanation: 'Atomar (1NF), einspaltiger PK (⇒ 2NF), aber Abteilungsname hängt transitiv über AbteilungsNr ab → **2NF**, nicht 3NF. Lösung: Tabelle Abteilung(**AbteilungsNr**, Abteilungsname).',
          },
        },
        {
          type: 'check',
          question: {
            id: 'd02-c09', kind: 'number', skill: 'dm.nf3', difficulty: 2,
            prompt: 'Wie viele Tabellen entstehen, wenn du die Leihgeräte-Liste der IT (PersNr, Name, Abteilung, StandortNr, Stadt, InvNr, Typ, Hersteller, Ausgabedatum) vollständig in die **3NF** überführst?',
            answer: 4,
            unit: 'Tabellen',
            misconceptions: [{ answer: '3', error: 'dm-nf3-transitiv', why: 'Das ist der Stand nach der 2NF. Für die 3NF muss noch StandortNr → Stadt ausgelagert werden.' }],
            explanation: 'Mitarbeiter, Leihgeraet, Ausleihe (2NF) + Standort (3NF) = **4 Tabellen**.',
          },
        },
        { type: 'practice', title: 'Übung: 3NF und Gesamtdurchlauf', questionIds: ['d02-q020', 'd02-q022', 'd02-q023', 'd02-q027', 'd02-q029', 'd02-q032'], count: 5, difficulty: 2 },
        {
          type: 'summary',
          points: [
            '3NF = 2NF + keine transitiven Abhängigkeiten (Nichtschlüssel → Nichtschlüssel).',
            'Vermittelndes Attribut wird PK einer neuen Tabelle und bleibt als FK zurück.',
            'Prüfschema: atomar? ganzer Schlüssel? nur der Schlüssel?',
            'Im Beispiel: UNF → 1NF (1 Tabelle) → 2NF (3 Tabellen) → 3NF (4 Tabellen).',
            'Denormalisierung ist eine bewusste Ausnahme (z. B. für Auswertungen), kein Freifahrtschein.',
          ],
        },
      ],
    },
  ],

  /* ================================================================ */
  questions: [
    {
      id: 'd02-q001', kind: 'match', skill: 'dm.erm', difficulty: 1,
      prompt: 'Ordne die ERM-Begriffe den Beispielen aus der Inventarverwaltung zu.',
      left: ['Entität', 'Entitätstyp', 'Attribut', 'Beziehungstyp'],
      right: ['das Notebook G07', 'Geraet', 'Hersteller', 'nutzt'],
      answer: [0, 1, 2, 3],
      explanation: 'Entität = ein konkretes Objekt (G07); Entitätstyp = Menge gleichartiger Objekte (Geraet); Attribut = Eigenschaft (Hersteller); Beziehungstyp = Zusammenhang (nutzt).',
    },
    {
      id: 'd02-q002', kind: 'text', skill: 'dm.erm', difficulty: 1,
      prompt: 'Wie nennt man im ER-Modell die **Gesamtheit gleichartiger Entitäten**, z. B. alle Geräte? (ein Begriff)',
      accept: ['Entitätstyp', 'Entitätsmenge', 'Entity-Typ', 'Entitytyp', 'Entity-Set', 'Entitätsklasse', 'Entitaetstyp', 'Entitaetsmenge'],
      misconceptions: [{ answer: 'Entität', error: 'dm-entitaet-entitaetstyp', why: 'Eine Entität ist ein einzelnes Objekt (z. B. G07). Die Gesamtheit heißt Entitätstyp bzw. Entitätsmenge.' }],
      explanation: '**Entitätstyp** (auch Entitätsmenge). Er wird später zur Tabelle.',
    },
    {
      id: 'd02-q003', kind: 'multi', skill: 'dm.erm', difficulty: 2,
      prompt: '„Die Elektro Krämer GmbH möchte ihre **Drucker** verwalten. Jeder Drucker steht in einem **Raum** und hat eine IP-Adresse. Für jeden Drucker werden **Wartungen** mit Datum und Techniker erfasst. Räume liegen in **Hamburg** oder Berlin.“ Welche Begriffe sind sinnvolle **Entitätstypen**?',
      options: ['Drucker', 'Raum', 'Wartung', 'IP-Adresse', 'Hamburg', 'Datum'],
      answer: [0, 1, 2],
      hints: ['Gibt es mehrere Exemplare mit eigenen Eigenschaften?', 'Werte wie „Hamburg“ sind keine Entitätstypen.'],
      explanation: 'Drucker, Raum und Wartung haben eigene Eigenschaften und kommen mehrfach vor → Entitätstypen. IP-Adresse und Datum sind Attribute, „Hamburg“ ist ein Attributwert (z. B. Standort des Raums).',
    },
    {
      id: 'd02-q004', kind: 'table', skill: 'dm.kardinalitaet', difficulty: 2,
      prompt: 'Bestimme die Kardinalität (Schreibweise **1:1**, **1:n** oder **n:m**, in der Reihenfolge der genannten Entitätstypen).',
      columns: [{ key: 'k', label: 'Kardinalität', type: 'text' }],
      rows: [
        { label: 'Raum – Netzwerkdose: In einem Raum gibt es mehrere Dosen, jede Dose liegt in genau einem Raum.', cells: { k: { answer: '1:n', accept: ['1:N', '1 : n', '1:m', '1:*', '1 zu n'] } } },
        { label: 'Ticket – Techniker: Ein Ticket kann von mehreren Technikern bearbeitet werden, ein Techniker bearbeitet viele Tickets.', cells: { k: { answer: 'n:m', accept: ['m:n', 'N:M', 'M:N', 'n : m', 'm : n', 'n zu m', '*:*'] } } },
        { label: 'Netzwerkdose – Switchport: Jede Dose ist mit höchstens einem Port gepatcht, jeder Port mit höchstens einer Dose.', cells: { k: { answer: '1:1', accept: ['1 : 1', '1 zu 1'] } } },
        { label: 'Kunde – Auftrag: Ein Kunde erteilt viele Aufträge, jeder Auftrag stammt von genau einem Kunden.', cells: { k: { answer: '1:n', accept: ['1:N', '1 : n', '1:m', '1:*', '1 zu n'] } } },
      ],
      hints: ['Immer in beide Richtungen fragen: höchstens eins oder viele?'],
      explanation: 'Raum–Dose **1:n**, Ticket–Techniker **n:m**, Dose–Switchport **1:1**, Kunde–Auftrag **1:n**.',
    },
    {
      id: 'd02-q005', kind: 'single', skill: 'dm.kardinalitaet', difficulty: 2,
      prompt: 'Was sagt das Diagramm `Standort ||-----------o< Mitarbeiter` aus?',
      options: [
        'Jede Person arbeitet an genau einem Standort; ein Standort kann keine, eine oder viele Personen haben.',
        'Jeder Standort hat genau eine Person; Personen können mehreren Standorten zugeordnet sein.',
        'Jede Person arbeitet an keinem oder einem Standort.',
        'Standort und Mitarbeiter stehen in einer n:m-Beziehung.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Der Krähenfuß (viele) steht an Mitarbeiter – also hat ein Standort viele Personen.', error: 'dm-kraehenfuss-lesen' },
        '2': { why: '`||` an Standort bedeutet genau eins (Minimum 1). „Keine oder eine“ wäre `o|`.', error: 'dm-kraehenfuss-lesen' },
        '3': { why: 'Nur auf einer Seite steht ein Krähenfuß → 1:n.', error: 'dm-kraehenfuss-lesen' },
      },
      explanation: '`||` an Standort: genau ein Standort je Person. `o<` an Mitarbeiter: null bis viele Personen je Standort. → 1:n.',
    },
    {
      id: 'd02-q006', kind: 'single', skill: 'dm.kardinalitaet', difficulty: 3,
      prompt: 'Ein Diagramm in **(min,max)-Notation** zeigt: `Geraet (0,1) ---< nutzt >--- (0,*) Mitarbeiter`. Was bedeutet das?',
      options: [
        'Ein Gerät wird von keiner oder einer Person genutzt; eine Person nutzt beliebig viele Geräte (auch keins).',
        'Ein Gerät wird von beliebig vielen Personen genutzt; eine Person nutzt höchstens ein Gerät.',
        'Jedes Gerät muss genau einer Person zugeordnet sein.',
        'Es handelt sich um eine n:m-Beziehung.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'In der (min,max)-Notation steht an jedem Entitätstyp, wie oft **seine** Entitäten teilnehmen – die Leserichtung ist umgekehrt zur Chen-Notation.', error: 'dm-minmax-lesen' },
        '2': { why: 'Minimum 0 bei Geraet: Ein Gerät kann auch niemandem zugeordnet sein.', error: 'dm-minmax-lesen' },
        '3': { why: 'Ein Gerät nimmt höchstens einmal teil (max 1) → 1:n, nicht n:m.', error: 'dm-minmax-lesen' },
      },
      explanation: '(0,1) an Geraet: Jedes Gerät nimmt 0- oder 1-mal teil (keine oder eine Person). (0,*) an Mitarbeiter: Jede Person nimmt beliebig oft teil. In Chen-Schreibweise: Mitarbeiter 1 : n Geraet, FK PersNr in Geraet (NULL erlaubt).',
    },
    {
      id: 'd02-q007', kind: 'free', skill: 'dm.erm', difficulty: 3,
      prompt: `Die IT der Elektro Krämer GmbH will die Verkabelung dokumentieren: „In jedem **Raum** gibt es mehrere **Netzwerkdosen**; jede Dose liegt in genau einem Raum. Jeder **Switch** hat viele **Ports**; jeder Port gehört zu genau einem Switch. Jede Dose ist mit höchstens einem Port gepatcht und jeder Port mit höchstens einer Dose.“

Beschreibe ein ERM in **Chen-Notation**: Entitätstypen mit Schlüsselattribut und je einem weiteren Attribut, Beziehungen mit Kardinalitäten. Leite anschließend das Tabellenmodell ab.`,
      modelAnswer: 'Entitätstypen: Raum (RaumNr, Bezeichnung), Netzwerkdose (DosenNr, Kategorie), Switch (SwitchID, Modell), Switchport (PortID, Portnummer). Beziehungen: Raum 1 : n Netzwerkdose („liegt in“), Switch 1 : n Switchport („hat“), Netzwerkdose 1 : 1 Switchport („ist gepatcht mit“). Tabellenmodell: Raum(RaumNr, Bezeichnung); Netzwerkdose(DosenNr, Kategorie, #RaumNr); Switch(SwitchID, Modell); Switchport(PortID, Portnummer, #SwitchID, #DosenNr UNIQUE, NULL erlaubt). Der 1:1-Fremdschlüssel kann alternativ als #PortID UNIQUE in Netzwerkdose stehen. Insgesamt 4 Tabellen.',
      keywords: ['Raum', 'Netzwerkdose', 'Switch', 'Switchport', '1:n', '1:1', 'Fremdschlüssel', 'UNIQUE'],
      explanation: 'Vier Entitätstypen, zwei 1:n- und eine 1:1-Beziehung → 4 Tabellen; FKs auf der n-Seite, 1:1 über FK mit UNIQUE.',
    },
    {
      id: 'd02-q008', kind: 'number', skill: 'dm.tabellenmodell', difficulty: 2,
      prompt: 'Ein ERM enthält die Entitätstypen **Standort**, **Mitarbeiter**, **Geraet** und **Software**. Beziehungen: Standort 1:n Mitarbeiter, Mitarbeiter 1:n Geraet, Geraet n:m Software. Wie viele Tabellen hat das Tabellenmodell?',
      answer: 5,
      unit: 'Tabellen',
      misconceptions: [
        { answer: '4', error: 'dm-zwischentabelle-vergessen', why: 'Die n:m-Beziehung Geraet–Software braucht eine eigene Zwischentabelle (z. B. Installation).' },
        { answer: '7', error: 'dm-tabelle-fuer-jede-beziehung', why: 'Nur n:m-Beziehungen bekommen eine eigene Tabelle.' },
      ],
      explanation: '4 Entitätstypen + 1 n:m-Beziehung = **5 Tabellen** (Standort, Mitarbeiter, Geraet, Software, Installation).',
    },
    {
      id: 'd02-q009', kind: 'number', skill: 'dm.tabellenmodell', difficulty: 3,
      prompt: 'ERM der Personalabteilung: Entitätstypen **Abteilung**, **Mitarbeiter**, **Dienstwagen**, **Schulung**, **Raum**. Beziehungen: Abteilung 1:n Mitarbeiter; Mitarbeiter 1:1 Dienstwagen; Mitarbeiter n:m Schulung; Schulung n:m Raum. Wie viele Tabellen entstehen?',
      answer: 7,
      unit: 'Tabellen',
      hints: ['Entitätstypen zählen.', 'Jede n:m-Beziehung bringt eine Tabelle dazu.'],
      misconceptions: [
        { answer: '5', error: 'dm-zwischentabelle-vergessen', why: 'Die beiden n:m-Beziehungen brauchen je eine Zwischentabelle.' },
        { answer: '8', error: 'dm-tabelle-fuer-1-1', why: 'Die 1:1-Beziehung wird über einen Fremdschlüssel mit UNIQUE gelöst, ohne eigene Tabelle.' },
        { answer: '6', error: 'dm-zwischentabelle-vergessen', why: 'Beide n:m-Beziehungen (Mitarbeiter–Schulung und Schulung–Raum) brauchen eine Zwischentabelle.' },
        { answer: '9', error: 'dm-tabelle-fuer-jede-beziehung', why: 'Nur n:m-Beziehungen erzeugen eigene Tabellen.' },
      ],
      explanation: '5 Entitätstypen + 2 n:m-Beziehungen = **7 Tabellen**. 1:n und 1:1 werden über Fremdschlüssel abgebildet.',
    },
    {
      id: 'd02-q010', kind: 'single', skill: 'dm.tabellenmodell', difficulty: 1,
      prompt: 'Raum 1:n Netzwerkdose. Wie wird die Beziehung im Tabellenmodell umgesetzt?',
      options: ['Netzwerkdose erhält den Fremdschlüssel #RaumNr.', 'Raum erhält den Fremdschlüssel #DosenNr.', 'Es wird eine Zwischentabelle Raum_Dose angelegt.', 'Beide Tabellen werden zusammengelegt.'],
      answer: 0,
      distractors: {
        '1': { why: 'Ein Raum hat viele Dosen – mehrere DosenNr passen nicht in eine Zelle.', error: 'db-fk-falsche-seite' },
        '2': { why: 'Zwischentabellen sind nur bei n:m nötig.', error: 'db-zwischentabelle-unnoetig' },
        '3': { why: 'Zusammenlegen erzeugt Redundanz (Raumdaten in jeder Dosen-Zeile).', error: 'dm-tabellenmodell' },
      },
      explanation: '1:n → FK auf der **n-Seite**: Netzwerkdose(**DosenNr**, Kategorie, #RaumNr).',
    },
    {
      id: 'd02-q011', kind: 'table', skill: 'dm.tabellenmodell', difficulty: 2,
      prompt: 'ERM: Standort 1:n Mitarbeiter, Mitarbeiter 1:n Geraet, Geraet n:m Software (Zwischentabelle **Installation**). Trage je Tabelle die **Fremdschlüssel** ein (Primärschlüssel: StandortID, PersNr, InvNr, SoftwareID). Hat eine Tabelle keinen Fremdschlüssel, schreibe **keiner**.',
      columns: [{ key: 'fk', label: 'Fremdschlüssel', type: 'text' }],
      rows: [
        { label: 'Standort', cells: { fk: { answer: 'keiner', accept: ['keine', 'kein', '-', '–', 'kein Fremdschlüssel', 'keinen'] } } },
        { label: 'Mitarbeiter', cells: { fk: { answer: 'StandortID', accept: ['#StandortID'] } } },
        { label: 'Geraet', cells: { fk: { answer: 'PersNr', accept: ['#PersNr'] } } },
        { label: 'Installation', cells: { fk: { answer: 'InvNr, SoftwareID', accept: ['SoftwareID, InvNr', 'InvNr und SoftwareID', 'SoftwareID und InvNr', 'InvNr,SoftwareID', 'SoftwareID,InvNr', '#InvNr, #SoftwareID', '#SoftwareID, #InvNr', 'InvNr + SoftwareID', 'SoftwareID + InvNr', 'InvNr; SoftwareID'] } } },
        { label: 'Software', cells: { fk: { answer: 'keiner', accept: ['keine', 'kein', '-', '–', 'kein Fremdschlüssel', 'keinen'] } } },
      ],
      explanation: 'FK immer auf der n-Seite: StandortID in Mitarbeiter, PersNr in Geraet. Die Zwischentabelle Installation hat zwei FKs (InvNr, SoftwareID), die zusammen ihr PK sind. Standort und Software verweisen auf nichts.',
    },
    {
      id: 'd02-q012', kind: 'multi', skill: 'dm.tabellenmodell', difficulty: 1,
      prompt: 'Zwischentabelle **Teilnahme**(PersNr, SchulungsNr, Note) für die n:m-Beziehung Mitarbeiter–Schulung. Welche Attribute bilden den Primärschlüssel?',
      options: ['PersNr', 'SchulungsNr', 'Note'],
      answer: [0, 1],
      explanation: 'Die beiden Fremdschlüssel bilden zusammen den Primärschlüssel. Die Note ist ein Beziehungsattribut.',
    },
    {
      id: 'd02-q013', kind: 'free', skill: 'dm.tabellenmodell', difficulty: 2,
      prompt: 'Begründe, warum eine **n:m-Beziehung** nicht einfach durch einen Fremdschlüssel in einer der beiden Tabellen abgebildet werden kann.',
      modelAnswer: 'Ein Fremdschlüssel kann pro Datensatz nur einen Wert aufnehmen, weil Attributwerte atomar sein müssen (1NF). Bei n:m gehören zu einem Datensatz aber viele Datensätze der anderen Tabelle – in beiden Richtungen. Ein FK in Tabelle A würde nur eine Verknüpfung je A zulassen (1:n). Mehrere Werte in einer Zelle oder Spalten wie Software1, Software2 würden die 1NF verletzen. Deshalb wird jede einzelne Verknüpfung als eigene Zeile in einer Zwischentabelle gespeichert; die n:m-Beziehung wird so in zwei 1:n-Beziehungen aufgelöst.',
      keywords: ['atomar', '1NF', 'ein Wert', 'Zwischentabelle', 'zwei 1:n'],
      explanation: 'Kernargument: Atomarität (ein Wert je Zelle) + „viele“ in beiden Richtungen.',
    },
    {
      id: 'd02-q014', kind: 'single', skill: 'dm.tabellenmodell', difficulty: 3,
      prompt: 'Mitarbeiter 1:1 Dienstwagen: Nur etwa 10 der 120 Mitarbeitenden haben einen Dienstwagen, jeder Dienstwagen ist genau einer Person zugeordnet. Welche Umsetzung ist am besten?',
      options: [
        'Dienstwagen(**Kennzeichen**, Modell, #PersNr) mit UNIQUE und NOT NULL auf PersNr',
        'Mitarbeiter(**PersNr**, Name, #Kennzeichen) ohne weitere Bedingung',
        'Zwischentabelle Mitarbeiter_Dienstwagen(#PersNr, #Kennzeichen)',
        'Dienstwagen(**Kennzeichen**, Modell, #PersNr) ohne UNIQUE',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Funktioniert grundsätzlich, erzeugt aber bei 110 Personen NULL-Werte, und ohne UNIQUE könnte ein Wagen mehreren Personen zugeordnet werden.', error: 'dm-1-1-umsetzung' },
        '2': { why: 'Eine Zwischentabelle ist für 1:1 unnötig.', error: 'db-zwischentabelle-unnoetig' },
        '3': { why: 'Ohne UNIQUE könnte eine Person mehrere Dienstwagen bekommen – das wäre 1:n.', error: 'dm-1-1-umsetzung' },
      },
      explanation: 'Der FK steht auf der Seite, die immer zugeordnet ist (Dienstwagen) → NOT NULL möglich, keine NULL-Werte bei Personen ohne Wagen. **UNIQUE** stellt sicher, dass jede Person höchstens einen Wagen hat (1:1 statt 1:n).',
    },
    {
      id: 'd02-q015', kind: 'text', skill: 'dm.abhaengigkeit', difficulty: 2,
      prompt: 'Wie heißt eine Abhängigkeit der Form **A → B → C**, bei der C nur über das Nichtschlüsselattribut B vom Schlüssel A abhängt? (ein Adjektiv oder Begriff)',
      accept: ['transitiv', 'transitive Abhängigkeit', 'transitive', 'transitiv abhängig', 'transitive funktionale Abhängigkeit'],
      explanation: '**Transitive Abhängigkeit** – sie verletzt die 3. Normalform.',
    },
    {
      id: 'd02-q016', kind: 'single', skill: 'dm.abhaengigkeit', difficulty: 1,
      prompt: 'Was bedeutet die funktionale Abhängigkeit **InvNr → Hersteller**?',
      options: [
        'Zu jeder Inventarnummer gehört genau ein Hersteller.',
        'Zu jedem Hersteller gehört genau eine Inventarnummer.',
        'Hersteller ist der Primärschlüssel.',
        'InvNr und Hersteller sind beide Fremdschlüssel.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Die Richtung ist umgekehrt: Ein Hersteller (z. B. Dell) hat viele Geräte.', error: 'dm-abhaengigkeit-richtung' },
        '2': { why: 'Eine funktionale Abhängigkeit sagt nichts darüber, welches Attribut PK ist.', error: 'dm-abhaengigkeit-falsch' },
        '3': { why: 'Die Abhängigkeit beschreibt, welcher Wert welchen bestimmt – nicht die Schlüsselrolle.', error: 'dm-abhaengigkeit-falsch' },
      },
      explanation: 'A → B: Jeder Wert von A bestimmt **genau einen** Wert von B. Umgekehrt muss das nicht gelten.',
    },
    {
      id: 'd02-q017', kind: 'multi', skill: 'dm.nf1', difficulty: 1,
      prompt: 'Welche Situationen verletzen die **1. Normalform**?',
      options: [
        'Zelle „Geräte“ enthält „G01, G08“.',
        'Spalten Telefon1, Telefon2, Telefon3 für mehrere Rufnummern einer Person.',
        'Eine Zelle „Adresse“ enthält „Lagerstraße 12, 20457 Hamburg“, obwohl nach PLZ gesucht werden soll.',
        'Zwei Personen haben denselben Nachnamen.',
        'Die Spalte PersNr ist Primärschlüssel.',
      ],
      answer: [0, 1, 2],
      explanation: 'Mehrfachwerte, Wiederholungsgruppen (Telefon1–3) und zusammengesetzte Werte, die getrennt gebraucht werden, verletzen die 1NF. Gleiche Namen und ein PK sind kein Problem.',
    },
    {
      id: 'd02-q018', kind: 'single', skill: 'dm.nf2', difficulty: 2,
      prompt: 'Eine Tabelle ist in 1NF und hat den **einspaltigen** Primärschlüssel InvNr. Was gilt sicher?',
      options: ['Sie ist auch in 2NF.', 'Sie ist auch in 3NF.', 'Sie verletzt die 2NF.', 'Über die 2NF lässt sich nichts sagen.'],
      answer: 0,
      distractors: {
        '1': { why: 'Transitive Abhängigkeiten sind trotzdem möglich (z. B. InvNr → HerstellerID → Herstellername).', error: 'dm-nf-verwechselt' },
        '2': { why: 'Teilabhängigkeiten gibt es nur bei zusammengesetzten Schlüsseln.', error: 'dm-nf2-einspaltiger-pk' },
        '3': { why: 'Doch: Ein einspaltiger Schlüssel hat keine Teile, also keine Teilabhängigkeit.', error: 'dm-nf2-einspaltiger-pk' },
      },
      explanation: 'Die 2NF verbietet Abhängigkeiten von einem **Teil** des Schlüssels. Ein einspaltiger PK hat keine Teile → 1NF ⇒ 2NF.',
    },
    {
      id: 'd02-q019', kind: 'free', skill: 'dm.nf2', difficulty: 2,
      prompt: 'Erläutere die **2. Normalform** und zeige an einem Beispiel aus der Inventarverwaltung, wie ein Verstoß beseitigt wird.',
      modelAnswer: 'Eine Tabelle ist in der 2NF, wenn sie in der 1NF ist und jedes Nichtschlüsselattribut voll funktional vom gesamten Primärschlüssel abhängt, also nicht nur von einem Teil eines zusammengesetzten Schlüssels. Beispiel: Ausleihe(PersNr, InvNr, Ausgabedatum, Name, Typ) mit PK (PersNr, InvNr). Name hängt nur von PersNr ab, Typ nur von InvNr – das sind Teilabhängigkeiten. Lösung: Mitarbeiter(PersNr, Name), Geraet(InvNr, Typ) und Ausleihe(#PersNr, #InvNr, Ausgabedatum). Das Ausgabedatum bleibt, weil es von beiden Schlüsselteilen abhängt.',
      keywords: ['1NF', 'voll funktional', 'gesamter Primärschlüssel', 'zusammengesetzt', 'Teilabhängigkeit', 'eigene Tabelle'],
      explanation: 'Definition + Teilabhängigkeit an einem Beispiel + Zerlegung mit Schlüsseln.',
    },
    {
      id: 'd02-q020', kind: 'free', skill: 'dm.nf3', difficulty: 2,
      prompt: 'Erläutere die **3. Normalform** und zeige an einem Beispiel, wie ein Verstoß beseitigt wird.',
      modelAnswer: 'Eine Tabelle ist in der 3NF, wenn sie in der 2NF ist und kein Nichtschlüsselattribut transitiv vom Primärschlüssel abhängt, d. h. kein Nichtschlüsselattribut hängt von einem anderen Nichtschlüsselattribut ab. Beispiel: Mitarbeiter(PersNr, Name, StandortNr, Stadt). Es gilt PersNr → StandortNr und StandortNr → Stadt, also hängt Stadt transitiv von PersNr ab. Lösung: Standort(StandortNr, Stadt) als eigene Tabelle; Mitarbeiter(PersNr, Name, #StandortNr) behält StandortNr als Fremdschlüssel.',
      keywords: ['2NF', 'transitiv', 'Nichtschlüsselattribut', 'neue Tabelle', 'Fremdschlüssel'],
      explanation: 'Definition + transitive Abhängigkeit am Beispiel + Zerlegung mit Fremdschlüssel.',
    },
    {
      id: 'd02-q021', kind: 'table', skill: 'dm.nf2', difficulty: 3,
      prompt: `Leihgeräte-Tabelle in 1NF, Primärschlüssel **(PersNr, InvNr)**:\n\n${T_1NF}\n\nGib für jedes Nichtschlüsselattribut an, von welchem Teil des Schlüssels es funktional abhängt: **PersNr**, **InvNr** oder **beide**.`,
      columns: [{ key: 'a', label: 'abhängig von', type: 'text' }],
      rows: [
        { label: 'Name', cells: { a: { answer: 'PersNr' } } },
        { label: 'Abteilung', cells: { a: { answer: 'PersNr' } } },
        { label: 'Typ', cells: { a: { answer: 'InvNr' } } },
        { label: 'Hersteller', cells: { a: { answer: 'InvNr' } } },
        { label: 'Ausgabedatum', cells: { a: { answer: 'beide', accept: ['PersNr, InvNr', 'PersNr und InvNr', 'PersNr + InvNr', 'InvNr, PersNr', 'InvNr und PersNr', 'beiden', 'gesamter Schlüssel', 'ganzer Schlüssel', '(PersNr, InvNr)', 'PersNr,InvNr'] } } },
      ],
      hints: ['Ändert sich der Name, wenn Weber ein anderes Gerät leiht?', 'Ändert sich das Datum, wenn eine andere Person dasselbe Gerät leiht?'],
      explanation: 'Name, Abteilung → PersNr; Typ, Hersteller → InvNr (Teilabhängigkeiten → 2NF verletzt). Ausgabedatum hängt von **beiden** ab (L01 hat zwei verschiedene Daten, Weber auch).',
    },
    {
      id: 'd02-q022', kind: 'number', skill: 'dm.nf3', difficulty: 2,
      prompt: `Die Leihgeräte-Liste wird normalisiert. Nach der 2NF gibt es die Tabelle Mitarbeiter(**PersNr**, Name, Abteilung, StandortNr, Stadt) mit 3 Zeilen sowie Leihgeraet und Ausleihe. Wie viele **Tabellen** gibt es nach Erreichen der **3NF** insgesamt?`,
      answer: 4,
      unit: 'Tabellen',
      misconceptions: [
        { answer: '3', error: 'dm-nf3-transitiv', why: 'StandortNr → Stadt ist noch transitiv; Standort wird eine eigene Tabelle.' },
        { answer: '5', error: 'dm-nf3-zu-viel', why: 'Abteilung hängt direkt von PersNr ab und bestimmt kein weiteres Attribut – keine weitere Tabelle nötig.' },
      ],
      explanation: 'Mitarbeiter, Leihgeraet, Ausleihe + Standort(**StandortNr**, Stadt) = **4 Tabellen**.',
    },
    {
      id: 'd02-q023', kind: 'single', skill: 'dm.nf3', difficulty: 2,
      prompt: 'Tabelle Geraet(**InvNr**, Typ, HerstellerID, Herstellername, Preis). Welche Normalform ist **verletzt** und warum?',
      options: [
        '3NF, weil Herstellername von HerstellerID abhängt (transitive Abhängigkeit).',
        '2NF, weil Herstellername nur von einem Teil des Schlüssels abhängt.',
        '1NF, weil Herstellername ein Text ist.',
        'Keine – die Tabelle ist in 3NF.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Der PK InvNr ist einspaltig – Teilabhängigkeiten sind nicht möglich.', error: 'dm-nf2-einspaltiger-pk' },
        '2': { why: 'Texte sind atomar, solange in jeder Zelle nur ein Wert steht.', error: 'dm-nf1-atomar' },
        '3': { why: 'InvNr → HerstellerID → Herstellername ist transitiv.', error: 'dm-nf3-transitiv' },
      },
      explanation: 'Lösung: Hersteller(**HerstellerID**, Herstellername) auslagern, in Geraet bleibt #HerstellerID.',
    },
    {
      id: 'd02-q024', kind: 'single', skill: 'dm.nf2', difficulty: 2,
      prompt: 'Tabelle Installation(**InvNr, SoftwareID**, Installationsdatum, Softwarename). Welches Attribut verletzt die 2NF?',
      options: ['Softwarename', 'Installationsdatum', 'InvNr', 'SoftwareID'],
      answer: 0,
      distractors: {
        '1': { why: 'Das Installationsdatum hängt von Gerät **und** Software ab – voll funktional.', error: 'dm-nf2-teilabhaengigkeit' },
        '2': { why: 'InvNr ist Teil des Schlüssels, kein Nichtschlüsselattribut.', error: 'dm-nf2-teilabhaengigkeit' },
        '3': { why: 'SoftwareID ist Teil des Schlüssels.', error: 'dm-nf2-teilabhaengigkeit' },
      },
      explanation: 'SoftwareID → Softwarename ist eine Teilabhängigkeit → Softwarename gehört in die Tabelle Software.',
    },
    {
      id: 'd02-q025', kind: 'order', skill: 'dm.nf1', difficulty: 1,
      prompt: 'Bringe die Schritte der Normalisierung in die richtige Reihenfolge.',
      items: [
        'Mehrfachwerte auf Zeilen und zusammengesetzte Werte auf Spalten verteilen (atomare Werte)',
        'Primärschlüssel bestimmen',
        'Teilabhängigkeiten vom zusammengesetzten Schlüssel in eigene Tabellen auslagern',
        'Transitive Abhängigkeiten zwischen Nichtschlüsselattributen in eigene Tabellen auslagern',
      ],
      explanation: '1NF herstellen (atomar, PK) → 2NF (Teilabhängigkeiten) → 3NF (transitive Abhängigkeiten).',
    },
    {
      id: 'd02-q026', kind: 'number', skill: 'dm.nf1', difficulty: 2,
      prompt: `Unnormalisierte Liste der Software-Installationen:

| InvNr | Standort | Software |
|---|---|---|
| G01 | Hamburg | Office, VPN-Client, PDF-Editor |
| G02 | Berlin | Office |
| G03 | Berlin | Office, VPN-Client |
| G05 | Hamburg | Office, Buchhaltung |

Wie viele **Zeilen** hat die Tabelle nach der Überführung in die **1NF** (ein Programm je Zeile)?`,
      answer: 8,
      unit: 'Zeilen',
      misconceptions: [{ answer: '4', error: 'dm-nf1-atomar', why: 'Je Programm entsteht eine eigene Zeile – Mehrfachwerte werden aufgeteilt.' }],
      explanation: 'G01: 3 + G02: 1 + G03: 2 + G05: 2 = **8 Zeilen**.',
    },
    {
      id: 'd02-q027', kind: 'free', skill: 'dm.nf3', difficulty: 3,
      prompt: `Ein Kunde des Systemhauses führt seine Lizenzen in dieser Liste (1NF, PK = InvNr + SoftwareID):

| InvNr | Geraetetyp | SoftwareID | Softwarename | HerstellerID | Herstellername | InstalliertAm |
|---|---|---|---|---|---|---|
| G01 | Notebook | S1 | Office-Paket | H7 | Microsoft | 2025-01-10 |
| G01 | Notebook | S4 | PDF-Editor | H9 | Adobe | 2025-01-12 |
| G02 | Desktop | S1 | Office-Paket | H7 | Microsoft | 2025-02-03 |

Normalisiere die Tabelle bis zur **3NF**. Nenne die Abhängigkeiten und gib das Ergebnis als Tabellenschema mit Primär- und Fremdschlüsseln an.`,
      modelAnswer: 'Abhängigkeiten: InvNr → Geraetetyp; SoftwareID → Softwarename, HerstellerID; HerstellerID → Herstellername; (InvNr, SoftwareID) → InstalliertAm. 2NF: Geraetetyp hängt nur von InvNr ab, Softwarename/HerstellerID/Herstellername nur von SoftwareID (Teilabhängigkeiten) → Geraet(InvNr, Geraetetyp), Software(SoftwareID, Softwarename, HerstellerID, Herstellername), Installation(#InvNr, #SoftwareID, InstalliertAm). 3NF: In Software gilt SoftwareID → HerstellerID → Herstellername (transitiv) → Hersteller(HerstellerID, Herstellername) auslagern. Ergebnis: Geraet(InvNr, Geraetetyp); Hersteller(HerstellerID, Herstellername); Software(SoftwareID, Softwarename, #HerstellerID); Installation(#InvNr, #SoftwareID, InstalliertAm) – 4 Tabellen.',
      keywords: ['Teilabhängigkeit', 'transitiv', 'Geraet', 'Software', 'Hersteller', 'Installation', '4 Tabellen'],
      explanation: '2NF trennt Geräte- und Softwaredaten von der Installation; 3NF trennt den Hersteller von der Software.',
    },
    {
      id: 'd02-q028', kind: 'match', skill: 'dm.nf1', difficulty: 1,
      prompt: 'Ordne jeder Normalform ihre zusätzliche Bedingung zu.',
      left: ['1. Normalform', '2. Normalform', '3. Normalform'],
      right: ['Alle Attributwerte sind atomar, keine Wiederholungsgruppen.', 'Jedes Nichtschlüsselattribut hängt vom gesamten Primärschlüssel ab.', 'Kein Nichtschlüsselattribut hängt transitiv vom Primärschlüssel ab.'],
      answer: [0, 1, 2],
      explanation: '„Der Schlüssel (1NF), der ganze Schlüssel (2NF) und nichts als der Schlüssel (3NF).“',
    },
    {
      id: 'd02-q029', kind: 'single', skill: 'dm.nf3', difficulty: 3,
      prompt: 'In einem Auswertungssystem (Data Warehouse) der Elektro Krämer GmbH werden Standortname und Gerätetyp bewusst redundant in einer großen Tabelle gespeichert. Wie nennt man das, und was ist der typische Grund?',
      options: [
        'Denormalisierung – schnellere Auswertungen, weil weniger Tabellen verknüpft werden müssen.',
        'Normalisierung – Vermeidung von Anomalien.',
        'Referenzielle Integrität – Sicherstellen gültiger Verweise.',
        'Denormalisierung – sie verhindert alle Anomalien.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Normalisierung beseitigt Redundanz, hier wird sie bewusst eingeführt.', error: 'dm-denormalisierung' },
        '2': { why: 'Referenzielle Integrität betrifft Fremdschlüssel, nicht bewusste Redundanz.', error: 'dm-denormalisierung' },
        '3': { why: 'Im Gegenteil: Denormalisierung nimmt Redundanz und damit Anomalierisiken in Kauf.', error: 'dm-denormalisierung' },
      },
      explanation: '**Denormalisierung**: bewusst Redundanz zulassen, um Abfragen (vor allem Auswertungen) zu beschleunigen. Nachteil: Pflegeaufwand und Anomalierisiko.',
    },
    {
      id: 'd02-q030', kind: 'single', skill: 'dm.kardinalitaet', difficulty: 2,
      prompt: 'In einem Krähenfuß-Diagramm steht am Linienende direkt vor der Tabelle **Mitarbeiter** das Symbol `o|`. Was bedeutet es?',
      options: ['keine oder genau eine Person', 'genau eine Person', 'eine oder viele Personen', 'keine oder viele Personen'],
      answer: 0,
      distractors: {
        '1': { why: '„Genau eins“ wäre `||`.', error: 'dm-kraehenfuss-lesen' },
        '2': { why: '„Eins oder viele“ wäre `|<`.', error: 'dm-kraehenfuss-lesen' },
        '3': { why: '„Null oder viele“ wäre `o<`.', error: 'dm-kraehenfuss-lesen' },
      },
      explanation: '`o` = Minimum 0 (optional), `|` = Maximum 1 → **null oder eins**.',
    },
    {
      id: 'd02-q031', kind: 'single', skill: 'dm.erm', difficulty: 1,
      prompt: 'Welches Element zeichnest du in der **Chen-Notation** als **Raute**?',
      options: ['den Beziehungstyp, z. B. „nutzt“', 'den Entitätstyp, z. B. Geraet', 'das Attribut, z. B. Preis', 'den Primärschlüssel, z. B. InvNr'],
      answer: 0,
      distractors: {
        '1': { why: 'Entitätstypen sind Rechtecke.', error: 'dm-chen-symbole' },
        '2': { why: 'Attribute sind Ellipsen.', error: 'dm-chen-symbole' },
        '3': { why: 'Schlüsselattribute sind unterstrichene Ellipsen.', error: 'dm-chen-symbole' },
      },
      explanation: 'Raute = Beziehungstyp (meist ein Verb).',
    },
    {
      id: 'd02-q032', kind: 'free', skill: 'dm.nf3', difficulty: 2,
      prompt: 'Ein Kollege hat die Tabelle Mitarbeiter(**PersNr**, Name, StandortNr, Standortadresse) angelegt. Beurteile den Entwurf: Welche Normalform ist verletzt, welche Anomalie droht, und wie korrigierst du ihn?',
      modelAnswer: 'Es gilt PersNr → StandortNr und StandortNr → Standortadresse. Die Adresse hängt also transitiv vom Primärschlüssel ab; die 3NF ist verletzt (1NF und 2NF sind erfüllt, der PK ist einspaltig). Folge: Die Adresse steht bei jeder Person des Standorts; zieht der Standort um, müssen viele Zeilen geändert werden (Änderungsanomalie). Ein neuer Standort ohne Personen kann nicht angelegt werden (Einfügeanomalie). Korrektur: Standort(StandortNr, Standortadresse) als eigene Tabelle, Mitarbeiter(PersNr, Name, #StandortNr).',
      keywords: ['3NF', 'transitiv', 'Änderungsanomalie', 'Standort', 'Fremdschlüssel'],
      explanation: 'Transitive Abhängigkeit → 3NF verletzt → eigene Tabelle Standort.',
    },
    {
      id: 'd02-q033', kind: 'number', skill: 'dm.nf2', difficulty: 2,
      prompt: `Die Leihgeräte-Tabelle in 1NF:\n\n${T_1NF}\n\nBei der Überführung in die 2NF entsteht die Tabelle Leihgeraet(**InvNr**, Typ, Hersteller). Wie viele **Zeilen** hat sie?`,
      answer: 4,
      unit: 'Zeilen',
      hints: ['Jedes Gerät steht in der neuen Tabelle nur einmal.'],
      misconceptions: [{ answer: '5', error: 'dm-nf2-zeilen', why: 'L01 kommt in der 1NF-Tabelle zweimal vor, in Leihgeraet aber nur einmal (InvNr ist dort Primärschlüssel).' }],
      explanation: 'Verschiedene InvNr: L01, L02, L03, L04 → **4 Zeilen**. Genau dadurch verschwindet die Redundanz.',
    },
  ],
};
