import type { Module } from '../types';

/** Codeblock-Begrenzer (vermeidet maskierte Backticks im Fließtext) */
const F = '```';

export const p01: Module = {
  id: 'p01',
  nr: 1,
  area: 'programmierung',
  title: 'Grundlagen der Programmierung',
  short: 'Algorithmus, EVA-Prinzip, Pseudocode-Konventionen, Variablen, Datentypen, Operatoren inkl. MOD/DIV und Wahrheitstabellen.',
  icon: 'Code',
  relevance: 'ap1',
  prerequisites: [],
  generators: ['p.arith', 'p.logic'],
  skills: [
    { id: 'prog.algorithm', module: 'p01', title: 'Algorithmus & EVA-Prinzip' },
    { id: 'prog.pseudocode', module: 'p01', title: 'Pseudocode lesen und schreiben', requires: ['prog.algorithm'] },
    { id: 'prog.variables', module: 'p01', title: 'Variablen, Konstanten & Zuweisung', requires: ['prog.pseudocode'] },
    { id: 'prog.datatypes', module: 'p01', title: 'Datentypen auswählen', requires: ['prog.variables'] },
    { id: 'prog.operators', module: 'p01', title: 'Arithmetische Operatoren, MOD & DIV', requires: ['prog.variables'] },
    { id: 'prog.logic', module: 'p01', title: 'Vergleiche, logische Operatoren & Wahrheitstabellen', requires: ['prog.operators'] },
  ],
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'p01-l01',
      title: 'Was ist ein Algorithmus? – Das EVA-Prinzip',
      minutes: 15,
      relevance: 'ap1',
      skills: ['prog.algorithm'],
      simple: `Ein Algorithmus ist wie ein Kochrezept: eine genaue Schritt-für-Schritt-Anleitung, die bei gleichen Zutaten immer zum gleichen Ergebnis führt. Jeder Schritt muss eindeutig sein, und irgendwann muss das Rezept fertig sein (endlich). Fast jedes Programm folgt dabei dem EVA-Prinzip: Es nimmt Daten auf (Eingabe), rechnet damit (Verarbeitung) und zeigt das Ergebnis (Ausgabe). Beim Kochen sind das Zutaten, Kochen und fertiges Gericht.

**Merke:** Algorithmus = eindeutige, endliche Schrittfolge; EVA = Eingabe → Verarbeitung → Ausgabe.`,
      steps: [
        {
          type: 'explain',
          title: 'Eine Handlungsvorschrift, die ein Computer abarbeiten kann',
          body: `Ein **Algorithmus** ist eine **eindeutige, endliche Folge von Anweisungen**, mit der ein Problem schrittweise gelöst wird. Ein Kochrezept oder eine Aufbauanleitung sind Alltags-Algorithmen – ein Computer braucht allerdings Anweisungen, die **absolut eindeutig** sind. „Etwas Salz“ versteht er nicht.

**Eigenschaften eines Algorithmus** (werden in Prüfungen gern abgefragt):

| Eigenschaft | Bedeutung | Gegenbeispiel |
|---|---|---|
| **Eindeutigkeit** | Jeder Schritt ist klar formuliert, es gibt keinen Interpretationsspielraum. | „Rechne ungefähr den Preis aus.“ |
| **Ausführbarkeit** | Jeder Schritt ist tatsächlich durchführbar. | „Teile durch 0.“ |
| **Endlichkeit (Finitheit)** | Die Beschreibung hat eine endliche Länge. | eine unendlich lange Anweisungsliste |
| **Terminierung** | Der Algorithmus kommt nach endlich vielen Schritten zu einem Ende. | eine Schleife, deren Bedingung nie FALSCH wird (Endlosschleife) |
| **Determiniertheit** | Gleiche Eingaben liefern immer das gleiche Ergebnis. | Ergebnis hängt vom Zufall ab |
| **Allgemeingültigkeit** | Er löst eine ganze Klasse von Problemen, nicht nur einen Einzelfall. | Funktioniert nur für genau den Betrag 100 € |

**Das EVA-Prinzip:** Fast jedes Programm lässt sich in drei Teile gliedern:

1. **E**ingabe – Daten kommen ins Programm (Tastatur, Formular, Datei, Sensor, Barcode-Scanner).
2. **V**erarbeitung – die Daten werden berechnet, geprüft, sortiert …
3. **A**usgabe – das Ergebnis wird angezeigt, gedruckt, gespeichert oder gesendet.

**Beispiel aus der Elektro Krämer GmbH:** Ein Programm berechnet für die Buchhaltung den Bruttopreis.
- **E:** Nettopreis eingeben (z. B. 250 €)
- **V:** Bruttopreis = Nettopreis · 1,19
- **A:** Bruttopreis anzeigen (297,50 €)

In der AP1 sollst du einfache Algorithmen **lesen, nachvollziehen, ergänzen und selbst formulieren** – seit der 2. Auflage des Prüfungskatalogs (ab 2025) in **Pseudocode** oder als **UML-Aktivitätsdiagramm**. Struktogramm und Programmablaufplan (PAP) sind entfallen; sie sind aber weiterhin gut zum Verständnis (du findest sie z. B. noch in Schulbüchern).`,
        },
        {
          type: 'visual',
          title: 'EVA – Eingabe, Verarbeitung, Ausgabe',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Eingabe', text: 'Daten gelangen ins Programm: Tastatur, Maus, Formularfeld, Datei, Datenbank, Sensor, Scanner.', icon: 'Keyboard' },
                { title: 'Verarbeitung', text: 'Rechnen, Vergleichen, Entscheiden, Wiederholen, Sortieren, Suchen – der eigentliche Algorithmus.', icon: 'Cpu' },
                { title: 'Ausgabe', text: 'Ergebnis wird angezeigt, gedruckt, gespeichert oder an ein anderes System gesendet.', icon: 'Monitor' },
              ],
            },
          },
          caption: 'Das EVA-Prinzip gilt im Kleinen (eine Funktion) wie im Großen (ein ganzes IT-System).',
        },
        {
          type: 'example',
          title: 'Ein Alltagsproblem als Algorithmus',
          problem: 'Die Elektro Krämer GmbH möchte die **jährlichen Stromkosten eines Arbeitsplatz-PCs** berechnen lassen. Gegeben sind die Leistungsaufnahme in Watt, die Betriebsstunden pro Jahr und der Strompreis je kWh. Formuliere den Algorithmus nach dem EVA-Prinzip.',
          steps: [
            { label: 'Eingabe festlegen', body: 'Benötigt werden: `leistungWatt` (z. B. 120), `stundenProJahr` (z. B. 2000) und `preisProKWh` (z. B. 0,30 €).' },
            { label: 'Verarbeitung formulieren', body: '1. Energie in kWh = leistungWatt · stundenProJahr / 1000 → 120 · 2000 / 1000 = **240 kWh**\n2. Kosten = Energie · preisProKWh → 240 · 0,30 = **72,00 €**' },
            { label: 'Ausgabe festlegen', body: 'Die Kosten werden mit zwei Nachkommastellen angezeigt: „Jährliche Stromkosten: 72,00 €“.' },
            { label: 'Eigenschaften prüfen', body: 'Jeder Schritt ist eindeutig und ausführbar, der Ablauf endet nach drei Schritten (Terminierung), gleiche Eingaben ergeben immer dasselbe Ergebnis (Determiniertheit) und er funktioniert für **jeden** PC (allgemeingültig).' },
          ],
          result: 'E: Leistung, Stunden, Preis → V: kWh = W · h / 1000, Kosten = kWh · Preis → A: 72,00 €',
        },
        {
          type: 'check',
          question: {
            id: 'p01-c01', kind: 'single', skill: 'prog.algorithm', difficulty: 1,
            prompt: 'Ein Programm soll so lange Zahlen addieren, „bis es genug ist“. Welche Eigenschaft eines Algorithmus ist **verletzt**?',
            options: ['Eindeutigkeit – „genug“ ist nicht klar definiert', 'Allgemeingültigkeit', 'Ausgabe fehlt', 'Keine – das ist ein korrekter Algorithmus'],
            answer: 0,
            distractors: {
              '1': { why: 'Allgemeingültigkeit betrifft, ob eine ganze Klasse von Problemen gelöst wird. Hier ist das Problem die unklare Abbruchbedingung.', error: 'algorithmus-eigenschaften' },
              '2': { why: 'Über die Ausgabe wird nichts gesagt – das Kernproblem ist das unklare Abbruchkriterium.', error: 'algorithmus-eigenschaften' },
              '3': { why: '„genug“ kann ein Computer nicht auswerten – es fehlt eine eindeutige Bedingung wie „bis die Summe > 1000 ist“.', error: 'algorithmus-eigenschaften' },
            },
            explanation: '„bis es genug ist“ ist **nicht eindeutig**. Ein Computer braucht eine prüfbare Bedingung, z. B. `BIS summe > 1000`. Ohne sie ist auch die **Terminierung** nicht gesichert.',
          },
        },
        { type: 'practice', title: 'Übung: Algorithmus & EVA', questionIds: ['p01-q001', 'p01-q002', 'p01-q003', 'p01-q004'], count: 4, difficulty: 1 },
        { type: 'summary', points: ['Algorithmus = eindeutige, endliche, ausführbare Anweisungsfolge, die terminiert.', 'EVA: Eingabe → Verarbeitung → Ausgabe.', 'AP1 (ab 2025): Algorithmen in Pseudocode oder als UML-Aktivitätsdiagramm.'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p01-l02',
      title: 'Pseudocode – die Schreibweise in dieser App',
      minutes: 20,
      relevance: 'ap1',
      skills: ['prog.pseudocode'],
      simple: `Pseudocode ist eine Mischung aus Deutsch und Programmiersprache – wie eine Wegbeschreibung, die jeder versteht, egal ob er Auto oder Fahrrad fährt. Du schreibst damit einen Ablauf auf, ohne dich um die genauen Regeln einer echten Sprache (Syntax) zu kümmern. Weil Pseudocode nicht genormt ist, sieht er in jedem Buch etwas anders aus: Mal steht für die Zuweisung (einen Wert in eine Variable legen) ein Pfeil ←, mal :=. Wichtig ist, dass du eindeutig schreibst und sauber einrückst.

**Merke:** Lies die Schreibweise der Aufgabe genau – „WIEDERHOLE … BIS“ endet bei WAHR, „Wiederhole … solange“ läuft bei WAHR weiter.`,
      steps: [
        {
          type: 'explain',
          title: 'Programmieren ohne Programmiersprache',
          body: `**Pseudocode** beschreibt einen Algorithmus in strukturierter, natürlich-sprachlicher Form – unabhängig von einer konkreten Programmiersprache. Er ist **nicht genormt**: In der Prüfung zählt, dass dein Pseudocode **eindeutig, vollständig und nachvollziehbar** ist. Halte dich innerhalb einer Lösung an **eine** Schreibweise und **rücke Blöcke ein**.

In dieser App verwenden wir durchgängig folgende **Konventionen**:

| Element | Schreibweise | Bedeutung |
|---|---|---|
| Zuweisung | \`x ← 5\` | x erhält den Wert 5 (gelesen: „x wird 5“) |
| Eingabe | \`EINGABE netto\` | Wert vom Benutzer einlesen |
| Ausgabe | \`AUSGABE brutto\` / \`AUSGABE "Text", x\` | Wert(e) ausgeben |
| Verzweigung | \`WENN … DANN\` · \`SONST WENN … DANN\` · \`SONST\` · \`ENDE WENN\` | ein- oder mehrseitige Auswahl |
| Mehrfachauswahl | \`FALLS x\` · \`FALL 1:\` · \`SONST:\` · \`ENDE FALLS\` | Auswahl nach Wert (wie switch) |
| kopfgesteuerte Schleife | \`SOLANGE … TUE\` · \`ENDE SOLANGE\` | prüft die Bedingung **vor** jedem Durchlauf |
| fußgesteuerte Schleife | \`WIEDERHOLE\` · \`BIS …\` | prüft **nach** dem Durchlauf, läuft mindestens einmal |
| Zählschleife | \`FÜR i VON 1 BIS n\` · \`ENDE FÜR\` (optional \`SCHRITT -1\`) | Start- und Endwert **einschließlich** |
| Vergleich | \`=  ≠  <  >  ≤  ≥\` | liefert WAHR oder FALSCH |
| Logik | \`UND  ODER  NICHT\` | Verknüpfung von Bedingungen |
| Rechnen | \`+  -  *  /\` · \`DIV\` · \`MOD\` | \`/\` = genaue Division, \`DIV\` = ganzzahlige Division, \`MOD\` = Rest |
| Arrays | \`zahlen[0]\`, \`LÄNGE(zahlen)\` | Index beginnt bei **0** |
| Funktion | \`FUNKTION name(p1, p2)\` · \`RÜCKGABE x\` · \`ENDE FUNKTION\` | Unterprogramm mit Rückgabewert |
| Kommentar | \`// Erklärung\` | wird nicht ausgeführt |

**Warum ← und nicht = ?** In der Mathematik bedeutet \`x = x + 1\` einen Widerspruch. In Programmen heißt es aber „nimm den alten Wert von x, addiere 1 und speichere das Ergebnis wieder in x“. Der Pfeil macht diese Richtung (**rechts wird berechnet, links gespeichert**) deutlich – und \`=\` bleibt frei für den Vergleich.

**Vergleich mit echten Sprachen:**

| Pseudocode | Python | Java / C# |
|---|---|---|
| \`x ← 5\` | \`x = 5\` | \`int x = 5;\` |
| \`WENN x > 3 DANN\` | \`if x > 3:\` | \`if (x > 3) {\` |
| \`a = b\` (Vergleich) | \`a == b\` | \`a == b\` |
| \`a MOD b\` | \`a % b\` | \`a % b\` |
| \`a DIV b\` | \`a // b\` | \`a / b\` (bei zwei int-Werten!) |
| \`UND / ODER / NICHT\` | \`and / or / not\` | \`&&\` / \`\\|\\|\` / \`!\` |`,
        },
        {
          type: 'explain',
          title: 'Andere Schreibweisen in Büchern und Prüfungen',
          body: `Weil Pseudocode **nicht genormt** ist, verwenden Schulbücher, Prüfungsbücher und IHK-Aufgaben unterschiedliche Schlüsselwörter. Für die AP1 gilt: **Lies die Schreibweise, die die Aufgabe vorgibt**, und bleib in deiner eigenen Lösung bei **einer** eindeutigen Schreibweise.

| Bedeutung | diese App | andere übliche Schreibweisen |
|---|---|---|
| Zuweisung | \`x ← 5\` | \`x := 5\`, \`SETZE x AUF 5\` |
| Verzweigung | \`WENN … DANN … SONST … ENDE WENN\` | \`Wenn … dann … sonst … Ende Verzweigung\`; in manchen Prüfungsbüchern \`FALLS … DANN … SONST … ENDE FALLS\` |
| Mehrfachauswahl | \`FALLS x\` · \`FALL 1:\` · \`ENDE FALLS\` | \`Fallunterscheidung\`, \`AUSWAHL x\`, \`switch\` |
| kopfgesteuerte Schleife | \`SOLANGE b TUE … ENDE SOLANGE\` | \`Wiederhole solange b … Ende Schleife\` |
| fußgesteuerte Schleife | \`WIEDERHOLE … BIS b\` (b = **Abbruch**bedingung) | \`Wiederhole … solange b\` (b = **Lauf**bedingung!) |
| Zählschleife | \`FÜR i VON 1 BIS 10\` | \`Von i := 1 Bis 10 … Ende Schleife\`, \`FÜR i := 1 BIS 10 MIT SCHRITTWEITE 1\` |
| Rest | \`a MOD b\` | \`a modulo b\`, \`a % b\` |

⚠️ **Zwei Fallen:**
1. **FALLS** ist in dieser App die **Mehrfachauswahl** (wie switch). Manche Prüfungsbücher schreiben \`FALLS … DANN … SONST\` für eine **einfache Verzweigung** – das ist unser WENN. Erkennbar am **DANN**.
2. Bei fußgesteuerten Schleifen entscheidet das Wort vor der Bedingung: **BIS** = Schluss, sobald die Bedingung WAHR ist; **solange** = weiter, solange sie WAHR ist.

**Beispiel – zwei Schreibweisen, gleicher Ablauf:**

Schulbuch:
${F}
zahl := 0
Wiederhole
  zahl := zahl + 25
solange zahl < 100
${F}

Diese App:
${F}
zahl ← 0
WIEDERHOLE
  zahl ← zahl + 25
BIS zahl ≥ 100
${F}

Beide laufen viermal (zahl = 25, 50, 75, 100) und enden mit **zahl = 100**. Beim Umschreiben wird die Bedingung **verneint**: Aus „solange zahl < 100“ wird „BIS zahl ≥ 100“ – das Gegenteil von \`<\` ist \`≥\`, nicht \`>\`.

**Grenzen genau übersetzen:** \`for (i = 0; i < 10; i++)\` heißt \`FÜR i VON 0 BIS 9\` – „< 10“ ist **nicht** „bis 10“.`,
        },
        {
          type: 'visual',
          title: 'Die drei Grundbausteine jedes Algorithmus',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Sequenz', text: 'Anweisungen werden der Reihe nach ausgeführt – von oben nach unten.', icon: 'ListOrdered' },
                { title: 'Verzweigung (Selektion)', text: 'WENN … DANN … SONST: Abhängig von einer Bedingung wird ein Zweig ausgeführt.', icon: 'GitBranch' },
                { title: 'Schleife (Iteration)', text: 'SOLANGE / WIEDERHOLE / FÜR: Anweisungen werden wiederholt.', icon: 'Repeat' },
              ],
            },
          },
          caption: 'Mit Sequenz, Verzweigung und Schleife lässt sich jeder Algorithmus aufbauen (strukturierte Programmierung).',
        },
        {
          type: 'example',
          title: 'Vom Auftrag zum Pseudocode',
          problem: `Das Lager der Elektro Krämer GmbH möchte ein kleines Programm: Nach Eingabe des aktuellen **Bestands** und des **Mindestbestands** soll „Nachbestellen!“ ausgegeben werden, wenn der Bestand **unter** dem Mindestbestand liegt, sonst „Bestand ok“. Schreibe den Pseudocode.`,
          steps: [
            { label: 'EVA klären', body: 'Eingabe: bestand, mindestbestand · Verarbeitung: Vergleich bestand < mindestbestand · Ausgabe: einer von zwei Texten.' },
            { label: 'Kontrollstruktur wählen', body: 'Zwei Fälle, die sich ausschließen → **zweiseitige Verzweigung** WENN … SONST.' },
            { label: 'Pseudocode notieren', body: `${F}\nEINGABE bestand\nEINGABE mindestbestand\nWENN bestand < mindestbestand DANN\n  AUSGABE "Nachbestellen!"\nSONST\n  AUSGABE "Bestand ok"\nENDE WENN\n${F}` },
            { label: 'Mit Testwerten prüfen', body: 'bestand = 12, mindestbestand = 20 → 12 < 20 WAHR → „Nachbestellen!“.\nbestand = 20, mindestbestand = 20 → 20 < 20 FALSCH → „Bestand ok“ (genau an der Grenze wird **nicht** nachbestellt – so verlangt es „unter“).' },
          ],
          result: 'Eine zweiseitige Verzweigung mit der Bedingung bestand < mindestbestand.',
        },
        {
          type: 'check',
          question: {
            id: 'p01-c02', kind: 'text', skill: 'prog.pseudocode', difficulty: 1,
            prompt: 'Mit welchem Schlüsselwort wird in unserem Pseudocode ein **WENN-Block abgeschlossen**? (zwei Wörter)',
            accept: ['ENDE WENN', 'ENDEWENN', 'ENDE-WENN'],
            hints: ['Alle Blöcke enden mit ENDE + Schlüsselwort.'],
            explanation: 'Blöcke werden mit **ENDE WENN**, **ENDE SOLANGE**, **ENDE FÜR**, **ENDE FALLS** bzw. **ENDE FUNKTION** abgeschlossen. So ist immer klar, wo ein Block aufhört – auch ohne Einrückung.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'p01-c03', kind: 'number', skill: 'prog.pseudocode', difficulty: 1,
            prompt: `Welchen Wert hat \`x\` nach Ausführung?\n\n${F}\nx ← 4\nx ← x + 3\nx ← x * 2\n${F}`,
            answer: 14,
            hints: ['Rechts vom Pfeil wird mit dem **alten** Wert gerechnet, links wird das Ergebnis gespeichert.'],
            misconceptions: [{ answer: '11', error: 'zuweisung-reihenfolge', why: 'Die Zeilen werden von oben nach unten ausgeführt: erst +3 (→ 7), dann ·2 (→ 14).' }],
            explanation: 'Zeile 1: x = 4 · Zeile 2: x = 4 + 3 = 7 · Zeile 3: x = 7 · 2 = **14**.',
          },
        },
        { type: 'practice', title: 'Übung: Pseudocode', questionIds: ['p01-q005', 'p01-q027', 'p01-q029', 'p01-q035', 'p01-q036', 'p01-q037', 'p01-q038'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Pseudocode ist nicht genormt – eindeutig, vollständig und eingerückt schreiben.', 'Zuweisung mit ← (in Büchern oft :=), Vergleich mit =.', 'WIEDERHOLE … BIS = Abbruchbedingung, Wiederhole … solange = Laufbedingung.', 'Blöcke mit ENDE WENN / ENDE SOLANGE / ENDE FÜR schließen.', 'Arrays beginnen bei Index 0.'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p01-l03',
      title: 'Variablen, Konstanten und Zuweisung',
      minutes: 15,
      relevance: 'ap1',
      skills: ['prog.variables'],
      simple: `Eine Variable ist wie eine beschriftete Schublade: Auf dem Etikett steht der Name, drinnen liegt ein Wert, und den kannst du jederzeit austauschen. Mit der Zuweisung (summe ← 5) legst du einen neuen Wert hinein; der alte ist dann weg. Eine Konstante ist eine Schublade mit Schloss: Ihr Wert wird einmal festgelegt und ändert sich nie, zum Beispiel der Mehrwertsteuersatz im Programm. Bei summe ← summe + 1 wird zuerst rechts gerechnet und dann das Ergebnis in die Schublade gelegt.

**Merke:** ← heißt „bekommt den Wert“, = heißt „ist gleich?“ (Vergleich).`,
      steps: [
        {
          type: 'explain',
          title: 'Benannte Speicherplätze',
          body: `Eine **Variable** ist ein **benannter Speicherplatz** im Arbeitsspeicher, dessen Wert sich während des Programmlaufs ändern kann. Sie hat:

| Merkmal | Beispiel |
|---|---|
| **Bezeichner** (Name) | \`anzahlLizenzen\` |
| **Datentyp** | Ganzzahl (int) |
| **Wert** | 25 |
| **Gültigkeitsbereich** | z. B. nur innerhalb einer Funktion (lokal) oder im ganzen Programm (global) |

**Regeln für Bezeichner** (in fast allen Sprachen): Beginn mit Buchstabe oder Unterstrich, keine Leerzeichen, keine reservierten Wörter (z. B. \`if\`, \`while\`), Groß-/Kleinschreibung wird meist unterschieden. Umlaute sind zwar in manchen Sprachen erlaubt, sollten aber vermieden werden. Üblich ist **camelCase** (\`nettoPreis\`) oder **snake_case** (\`netto_preis\`). Wähle **sprechende Namen** – \`mwstSatz\` statt \`x\`.

Eine **Konstante** hat einen festen Wert, der sich nicht ändern darf, z. B. \`MWST_SATZ ← 0.19\` (Konvention: GROSSBUCHSTABEN). Vorteil: Ändert sich der Steuersatz, muss nur **eine** Stelle angepasst werden.

**Die Zuweisung** \`ziel ← ausdruck\` läuft immer in zwei Schritten:
1. Der Ausdruck **rechts** wird mit den **aktuellen** Werten berechnet.
2. Das Ergebnis wird in der Variablen **links** gespeichert – der alte Wert ist danach weg.

Darum ist \`zaehler ← zaehler + 1\` sinnvoll: „Erhöhe den Zähler um 1.“

**Klassiker: Werte tauschen.** Ohne Hilfsvariable geht ein Wert verloren:

${F}
a ← b      // a hat jetzt den Wert von b – der alte Wert von a ist weg!
b ← a      // b bekommt ... den Wert von b
${F}

Richtig mit **Hilfsvariable**:

${F}
hilf ← a
a ← b
b ← hilf
${F}`,
        },
        {
          type: 'visual',
          title: 'Variable = beschriftete Schublade',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Name', text: 'Unter diesem Bezeichner sprichst du den Speicherplatz an, z. B. nettoPreis.', icon: 'Tag' },
                { title: 'Typ', text: 'Legt fest, was hineinpasst und wie viel Speicher nötig ist (int, double, String …).', icon: 'Shapes' },
                { title: 'Wert', text: 'Der aktuelle Inhalt. Eine Zuweisung ersetzt ihn vollständig.', icon: 'Box' },
                { title: 'Gültigkeit', text: 'Lokal (nur in einer Funktion) oder global (im ganzen Programm).', icon: 'Scan' },
              ],
            },
          },
          caption: 'Eine Zuweisung legt einen neuen Inhalt in die Schublade – der alte wird dabei entfernt.',
        },
        {
          type: 'example',
          title: 'Schreibtischtest einer Sequenz',
          problem: `Bestimme die Werte von \`a\` und \`b\` nach jeder Zeile:\n\n${F}\na ← 7\nb ← 2\na ← a + b\nb ← a - b\na ← a - b\n${F}`,
          steps: [
            { label: 'Trace-Tabelle anlegen', body: 'Eine Spalte pro Variable, eine Zeile pro Anweisung. Noch nicht belegte Variablen bekommen „–“.' },
            { label: 'Zeile für Zeile rechnen', body: '| Zeile | a | b |\n|---|---|---|\n| a ← 7 | 7 | – |\n| b ← 2 | 7 | 2 |\n| a ← a + b | 9 | 2 |\n| b ← a − b | 9 | 7 |\n| a ← a − b | 2 | 7 |' },
            { label: 'Ergebnis deuten', body: 'Am Ende ist a = 2 und b = 7 – die Werte wurden **getauscht**, ganz ohne Hilfsvariable (Trick mit Summe und Differenz).' },
          ],
          result: 'a = 2, b = 7',
        },
        {
          type: 'check',
          question: {
            id: 'p01-c04', kind: 'number', skill: 'prog.variables', difficulty: 2,
            prompt: `Welchen Wert hat \`b\` nach Ausführung?\n\n${F}\na ← 3\nb ← 8\na ← b\nb ← a\n${F}`,
            answer: 8,
            hints: ['Nach Zeile 3 ist der alte Wert von a (3) verloren.'],
            misconceptions: [{ answer: '3', error: 'tausch-ohne-hilfsvariable', why: 'Nach `a ← b` hat a bereits den Wert 8. `b ← a` schreibt also wieder 8 in b – der Wert 3 ist verloren.' }],
            explanation: '| Zeile | a | b |\n|---|---|---|\n| a ← 3 | 3 | – |\n| b ← 8 | 3 | 8 |\n| a ← b | 8 | 8 |\n| b ← a | 8 | **8** |\n\nDer Tausch ist misslungen – dafür braucht man eine Hilfsvariable.',
          },
        },
        { type: 'practice', title: 'Übung: Variablen & Zuweisung', questionIds: ['p01-q006', 'p01-q007', 'p01-q009', 'p01-q032', 'p01-q033'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Variable = Name + Typ + Wert (+ Gültigkeitsbereich).', 'Zuweisung: erst rechts rechnen, dann links speichern.', 'Konstanten in GROSSBUCHSTABEN, nur eine Änderungsstelle.', 'Tauschen nur mit Hilfsvariable.'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p01-l04',
      title: 'Datentypen richtig wählen',
      minutes: 20,
      relevance: 'ap1',
      skills: ['prog.datatypes'],
      simple: `Ein Datentyp ist wie die passende Verpackung: Eier kommen in den Eierkarton, Milch in die Flasche. Ganze Zahlen zum Zählen kommen in int (Ganzzahl), Kommazahlen für Messwerte in double (Gleitkommazahl), Ja/Nein in bool (Wahrheitswert) und Texte in String (Zeichenkette). Eine Postleitzahl ist ein String, weil man mit ihr nicht rechnet und die führende Null erhalten bleiben muss. Geldbeträge gehören nicht in double, weil Gleitkommazahlen kleine Rundungsfehler haben – dafür gibt es einen Dezimaltyp (decimal) oder du rechnest in Cent als Ganzzahl.

**Merke:** Zählen → int, Messwert → double, ja/nein → bool, Text/PLZ → String, Geld → decimal oder Cent als int.`,
      steps: [
        {
          type: 'explain',
          title: 'Welcher Wert passt in welche Schublade?',
          body: `Der **Datentyp** legt fest, **welche Werte** eine Variable aufnehmen kann, **wie viel Speicher** sie belegt und **welche Operationen** möglich sind.

| Datentyp | Inhalt | Speicher (typisch, Java/C#) | Wertebereich / Beispiel |
|---|---|---|---|
| **byte** | kleine Ganzzahl | 8 Bit | −128 … 127 |
| **short** | Ganzzahl | 16 Bit | −32.768 … 32.767 |
| **int** (Integer) | Ganzzahl | 32 Bit | −2.147.483.648 … 2.147.483.647 |
| **long** | große Ganzzahl | 64 Bit | ca. ±9,2 · 10¹⁸ |
| **float** | Gleitkommazahl | 32 Bit | ca. 7 signifikante Dezimalstellen |
| **double** | Gleitkommazahl doppelter Genauigkeit | 64 Bit | ca. 15–16 signifikante Dezimalstellen |
| **bool / boolean** | Wahrheitswert | (meist 1 Byte) | WAHR / FALSCH (true / false) |
| **char** | **ein** einzelnes Zeichen | 16 Bit in Java/C# (UTF-16) | \`'A'\`, \`'7'\`, \`'#'\` |
| **String** | Zeichenkette | variabel | \`"Elektro Krämer GmbH"\` |

**Faustregeln für die Prüfung:**
- **Zählen** (Stückzahl, Anzahl Lizenzen, Alter in Jahren) → **int**
- **Messwerte / Kommazahlen** (Gewicht, Temperatur, Spannung) → **double** (oder float)
- **Ja/Nein-Information** (Garantie aktiv?, bezahlt?) → **bool**
- **Ein Kennbuchstabe** (Steuerklasse „A“) → **char**
- **Texte und „Nummern“, mit denen man nicht rechnet** (Postleitzahl, Telefonnummer, Inventarnummer, IBAN) → **String** – sonst gehen z. B. **führende Nullen** verloren (PLZ 01067 Dresden würde als Zahl zu 1067).
- **Geldbeträge:** Gleitkommazahlen sind **binär nicht exakt** (0,1 lässt sich im Zweiersystem nicht exakt darstellen; \`0.1 + 0.2\` ergibt in vielen Sprachen \`0.30000000000000004\`). Für Beträge nutzt man daher einen **Dezimaltyp** (\`decimal\` in C#, \`BigDecimal\` in Java) oder rechnet intern in **Cent als Ganzzahl**.

**Wertebereich berechnen:** Mit n Bit lassen sich **2ⁿ** verschiedene Werte darstellen. Bei vorzeichenbehafteten Ganzzahlen (Zweierkomplement) reicht der Bereich von **−2ⁿ⁻¹ bis 2ⁿ⁻¹ − 1** (z. B. 8 Bit: −128 … 127). Ohne Vorzeichen: 0 … 2ⁿ − 1 (8 Bit: 0 … 255).

**Überlauf:** Wird der größte Wert überschritten, „springt“ der Wert bei vielen Sprachen in den negativen Bereich (int: 2.147.483.647 + 1 → −2.147.483.648). Solche Fehler treten oft ohne Fehlermeldung auf!

**Typumwandlung (Casting):** Von „klein“ nach „groß“ (int → double) geht automatisch (implizit). Von double nach int muss man explizit umwandeln – die Nachkommastellen werden dabei **abgeschnitten** (\`(int) 7.9\` → 7).`,
        },
        {
          type: 'visual',
          title: 'Die wichtigsten Datentypen auf einen Blick',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'int', text: 'Ganze Zahlen zum Zählen und Rechnen: 0, 42, −7.', icon: 'Hash' },
                { title: 'double / float', text: 'Kommazahlen für Messwerte: 3,75 · 230,0 · −12,5. Nicht exakt!', icon: 'Percent' },
                { title: 'bool', text: 'Nur WAHR oder FALSCH – ideal für Zustände und Bedingungen.', icon: 'ToggleLeft' },
                { title: 'char', text: 'Genau ein Zeichen in einfachen Anführungszeichen: \'A\'.', icon: 'Type' },
                { title: 'String', text: 'Zeichenkette in doppelten Anführungszeichen: "01067", "Hamburg".', icon: 'Text' },
                { title: 'decimal / Cent als int', text: 'Für Geldbeträge – exakt, ohne Rundungsfehler im Binärsystem.', icon: 'Euro' },
              ],
            },
          },
          caption: 'Frage dich immer: Will ich damit rechnen? Brauche ich Nachkommastellen? Muss es exakt sein?',
        },
        {
          type: 'example',
          title: 'Datentypen für einen Inventar-Datensatz',
          problem: `Für die Inventarverwaltung der Elektro Krämer GmbH soll ein Datensatz je Gerät gespeichert werden:\n\n| Feld | Beispielwert |\n|---|---|\n| Inventarnummer | INV-2025-0042 |\n| Anzahl Monitore am Platz | 2 |\n| Anschaffungspreis | 1.249,90 € |\n| Gewicht in kg | 1,85 |\n| Garantie aktiv | ja |\n| Standort-PLZ | 20095 |\n\nWähle passende Datentypen und begründe.`,
          steps: [
            { label: 'Inventarnummer', body: 'enthält Buchstaben und Bindestriche → **String**.' },
            { label: 'Anzahl Monitore', body: 'ganzzahlige Anzahl → **int**.' },
            { label: 'Anschaffungspreis', body: 'Geldbetrag, muss exakt sein → **decimal** (C#) / **BigDecimal** (Java) oder Cent als **int** (124990). double wäre nur eine Notlösung.' },
            { label: 'Gewicht', body: 'Messwert mit Nachkommastellen → **double**.' },
            { label: 'Garantie aktiv', body: 'nur ja/nein → **bool**.' },
            { label: 'Standort-PLZ', body: 'man rechnet nicht damit, führende Nullen möglich (01067) → **String**.' },
          ],
          result: 'String · int · decimal (bzw. Cent als int) · double · bool · String',
        },
        {
          type: 'check',
          question: {
            id: 'p01-c05', kind: 'match', skill: 'prog.datatypes', difficulty: 1,
            prompt: 'Ordne jedem Wert den **passendsten** Datentyp zu.',
            left: ['Anzahl verkaufter Lizenzen', 'Durchschnittstemperatur im Serverraum', 'Telefonnummer 040 1234567', 'Rechnung bezahlt?', 'Kennbuchstabe der Brandschutzklasse'],
            right: ['int', 'double', 'String', 'bool', 'char'],
            answer: [0, 1, 2, 3, 4],
            explanation: 'Zählen → int · Messwert mit Komma → double · Nummer ohne Rechnen (führende 0, Leerzeichen) → String · ja/nein → bool · genau ein Zeichen → char.',
          },
        },
        { type: 'practice', title: 'Übung: Datentypen', questionIds: ['p01-q010', 'p01-q011', 'p01-q012', 'p01-q013', 'p01-q014', 'p01-q015', 'p01-q028', 'p01-q030'], count: 6, difficulty: 2 },
        { type: 'summary', points: ['Zählen → int, Messwert → double, ja/nein → bool, ein Zeichen → char, Text/PLZ → String.', 'n Bit → 2ⁿ Werte; vorzeichenbehaftet −2ⁿ⁻¹ … 2ⁿ⁻¹ − 1.', 'Gleitkomma ist nicht exakt → Geld als decimal oder Cent-int.', 'double → int schneidet Nachkommastellen ab.'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p01-l05',
      title: 'Rechnen im Programm: Operatoren, MOD und DIV',
      minutes: 20,
      relevance: 'ap1',
      skills: ['prog.operators'],
      simple: `Rechnen im Programm funktioniert fast wie im Matheunterricht: Punkt vor Strich, Klammern zuerst. Neu sind DIV und MOD – stell dir 23 Eier vor, die in Kartons zu je 5 Stück kommen. 23 DIV 5 = 4 sagt dir, wie viele Kartons voll werden (ganzzahlige Division), 23 MOD 5 = 3 sagt dir, wie viele Eier übrig bleiben (Rest). Mit MOD prüfst du zum Beispiel, ob eine Zahl gerade ist: zahl MOD 2 = 0.

**Merke:** DIV = wie oft passt es ganz hinein, MOD = was bleibt übrig.`,
      steps: [
        {
          type: 'explain',
          title: 'Ganzzahldivision und Rest – unscheinbar, aber prüfungsbeliebt',
          body: `**Arithmetische Operatoren:**

| Operator | Bedeutung | Beispiel | Ergebnis |
|---|---|---|---|
| \`+\` | Addition | \`7 + 2\` | 9 |
| \`-\` | Subtraktion | \`7 - 2\` | 5 |
| \`*\` | Multiplikation | \`7 * 2\` | 14 |
| \`/\` | Division (genau) | \`7 / 2\` | 3,5 |
| \`DIV\` | **ganzzahlige Division** | \`7 DIV 2\` | **3** |
| \`MOD\` | **Rest** der ganzzahligen Division (Modulo) | \`7 MOD 2\` | **1** |

Merksatz: **7 : 2 = 3 Rest 1** → DIV liefert die 3, MOD die 1. Es gilt immer: \`a = (a DIV b) · b + (a MOD b)\`.

**Typische Anwendungen von MOD:**
- **gerade/ungerade:** \`n MOD 2 = 0\` ⇔ n ist gerade
- **Teilbarkeit:** \`jahr MOD 4 = 0\` ⇔ jahr ist durch 4 teilbar
- **letzte Ziffer:** \`n MOD 10\` (z. B. 4711 MOD 10 = 1)
- **Umrechnen:** 135 Minuten → 135 DIV 60 = 2 Stunden, 135 MOD 60 = 15 Minuten
- **jedes n-te Element:** \`WENN i MOD 3 = 0 DANN …\`

**Rangfolge (Priorität):**
1. Klammern
2. Punktrechnung: \`*\`, \`/\`, \`DIV\`, \`MOD\`
3. Strichrechnung: \`+\`, \`-\`
4. Gleichrangige Operatoren **von links nach rechts**

Beispiel: \`2 + 3 * 4 MOD 5\` → 3 · 4 = 12 → 12 MOD 5 = 2 → 2 + 2 = **4**.

**Achtung – Falle in echten Sprachen:** In Java, C# und C ist \`/\` bei **zwei Ganzzahlen** automatisch eine Ganzzahldivision: \`int a = 7; int b = 2; double c = a / b;\` ergibt **3.0**, nicht 3,5 – die Division passiert, *bevor* das Ergebnis in double umgewandelt wird. Abhilfe: \`(double) a / b\`. In Python 3 liefert \`7 / 2\` dagegen 3.5; die Ganzzahldivision schreibt man dort \`7 // 2\`.`,
        },
        {
          type: 'visual',
          title: 'DIV und MOD an der Uhr',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: '200 Minuten', text: 'Eine Dauer, die in Stunden und Minuten angezeigt werden soll.', icon: 'Clock' },
                { title: '200 DIV 60 = 3', text: 'So oft passen 60 Minuten vollständig hinein → 3 volle Stunden.', icon: 'Divide' },
                { title: '200 MOD 60 = 20', text: 'Was übrig bleibt → 20 Minuten. Anzeige: 3:20 h.', icon: 'Percent' },
              ],
            },
          },
          caption: 'DIV = „wie oft passt es ganz hinein?“, MOD = „was bleibt übrig?“',
        },
        {
          type: 'example',
          title: 'Kartons auf Paletten verteilen (Aufrunden mit DIV und MOD)',
          problem: `Das Lager verschickt **250 Kartons**. Auf eine Palette passen **24 Kartons**. Wie viele Paletten werden benötigt? Ergänze den Algorithmus und führe ihn aus.\n\n${F}\nkartons ← 250\nproPalette ← 24\npaletten ← kartons DIV proPalette\nWENN kartons MOD proPalette > 0 DANN\n  paletten ← paletten + 1\nENDE WENN\nAUSGABE paletten\n${F}`,
          steps: [
            { label: 'Volle Paletten', body: '250 DIV 24 = **10** (10 · 24 = 240).' },
            { label: 'Rest prüfen', body: '250 MOD 24 = 250 − 240 = **10** Kartons bleiben übrig → 10 > 0 ist WAHR.' },
            { label: 'Angebrochene Palette', body: 'paletten ← 10 + 1 = **11**.' },
          ],
          result: '11 Paletten (10 volle + 1 angebrochene mit 10 Kartons)',
        },
        {
          type: 'check',
          question: {
            id: 'p01-c06', kind: 'number', skill: 'prog.operators', difficulty: 2,
            prompt: `Welchen Wert hat \`x\`?\n\n${F}\nx ← 20 - 17 MOD 5 * 2\n${F}`,
            answer: 16,
            hints: ['MOD und * sind gleichrangig und werden von links nach rechts ausgewertet – und zwar vor der Subtraktion.'],
            misconceptions: [
              { answer: '6', error: 'operator-rangfolge', why: 'Du hast von links nach rechts ohne Punkt-vor-Strich gerechnet. MOD und * werden zuerst ausgewertet.' },
              { answer: '13', error: 'operator-rangfolge', why: 'Du hast zuerst 5 * 2 gerechnet. MOD und * sind gleichrangig und werden von links nach rechts ausgewertet: erst 17 MOD 5 = 2, dann 2 * 2 = 4.' },
            ],
            explanation: '1. 17 MOD 5 = 2 (17 = 3 · 5 + 2)\n2. 2 * 2 = 4\n3. 20 − 4 = **16**',
          },
        },
        { type: 'practice', title: 'Übung: MOD, DIV und Rangfolge (Generator)', generator: 'p.arith', count: 5, difficulty: 2 },
        { type: 'practice', title: 'Übung: Operatoren aus dem Fragenpool', questionIds: ['p01-q008', 'p01-q016', 'p01-q017', 'p01-q018', 'p01-q019', 'p01-q020', 'p01-q031'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['7 DIV 2 = 3, 7 MOD 2 = 1.', 'n MOD 2 = 0 ⇔ gerade; n MOD 10 = letzte Ziffer.', 'Punkt (*, /, DIV, MOD) vor Strich; Gleichrangiges von links nach rechts.', 'Java/C#: int / int ist eine Ganzzahldivision!'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p01-l06',
      title: 'Vergleiche, UND/ODER/NICHT und Wahrheitstabellen',
      minutes: 25,
      relevance: 'ap1',
      skills: ['prog.logic'],
      simple: `Ein Vergleich (z. B. alter ≥ 18) liefert immer WAHR oder FALSCH. Mehrere Vergleiche verknüpfst du mit UND, ODER und NICHT (logische Operatoren). UND ist wie eine Haustür mit Schlüssel UND Zahlencode – nur wenn beides passt, geht sie auf. ODER ist wie die Kasse, an der du mit Karte ODER bar zahlen darfst – eins reicht, beides geht auch. NICHT dreht WAHR und FALSCH einfach um.

**Merke:** UND ist nur WAHR, wenn alles WAHR ist; ODER ist nur FALSCH, wenn alles FALSCH ist.`,
      steps: [
        {
          type: 'explain',
          title: 'Bedingungen formulieren und auswerten',
          body: `Verzweigungen und Schleifen brauchen **Bedingungen** – Ausdrücke, die **WAHR** oder **FALSCH** ergeben (Datentyp bool).

**Vergleichsoperatoren:** \`=\` gleich · \`≠\` ungleich · \`<\` · \`>\` · \`≤\` · \`≥\`
Achte genau auf die Grenze: „ab 18“ heißt \`alter ≥ 18\`, „über 18“ heißt \`alter > 18\`, „unter 18“ heißt \`alter < 18\`.

**Logische Operatoren** verknüpfen Bedingungen:

| A | B | A UND B | A ODER B | NICHT A |
|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 1 |
| 0 | 1 | 0 | 1 | 1 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 1 | **1** | 1 | 0 |

(1 = WAHR, 0 = FALSCH)

- **UND** ist nur WAHR, wenn **beide** Teile WAHR sind.
- **ODER** ist WAHR, wenn **mindestens einer** WAHR ist – also auch, wenn beide WAHR sind (kein „Entweder-oder“; das wäre XOR).
- **NICHT** kehrt den Wert um.

**Rangfolge:** Klammern → NICHT → UND → ODER. UND bindet also stärker als ODER (wie Punkt- vor Strichrechnung): \`A ODER B UND C\` bedeutet \`A ODER (B UND C)\`. Im Zweifel: **Klammern setzen!**

**Wahrheitstabelle aufstellen:** Bei n Eingangsvariablen gibt es **2ⁿ Zeilen** (2 Variablen → 4, 3 Variablen → 8). Ordne die Zeilen wie beim Binärzählen (000, 001, 010, …) und bilde für Teilausdrücke **Hilfsspalten**.

**Regeln von De Morgan** (helfen beim Umformen von Bedingungen):
- \`NICHT (A UND B)\` = \`NICHT A ODER NICHT B\`
- \`NICHT (A ODER B)\` = \`NICHT A UND NICHT B\`

Beispiel: „Nicht (zwischen 18 und 65)“ = \`NICHT (alter ≥ 18 UND alter ≤ 65)\` = \`alter < 18 ODER alter > 65\`.

**Bereichsprüfung:** „alter liegt zwischen 18 und 65 (einschließlich)“ schreibt man \`alter ≥ 18 UND alter ≤ 65\`. Die mathematische Kurzform \`18 ≤ alter ≤ 65\` funktioniert in den meisten Programmiersprachen **nicht** (Python ist eine Ausnahme).`,
        },
        {
          type: 'visual',
          title: 'Logische Operatoren als Schaltung gedacht',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'UND (AND, &&)', text: 'Reihenschaltung: Strom fließt nur, wenn beide Schalter geschlossen sind.', icon: 'Link' },
                { title: 'ODER (OR, ||)', text: 'Parallelschaltung: Strom fließt, sobald mindestens ein Schalter geschlossen ist.', icon: 'GitMerge' },
                { title: 'NICHT (NOT, !)', text: 'Umkehrung: aus WAHR wird FALSCH und umgekehrt.', icon: 'RefreshCcw' },
              ],
            },
          },
          caption: 'In Python schreibt man and / or / not, in Java und C# && / || / !.',
        },
        {
          type: 'example',
          title: 'Zugangsregel als Wahrheitstabelle',
          problem: 'Ein Mitarbeiter darf den Serverraum betreten, wenn er **berechtigt** ist (A) **und** entweder einen **Ausweis** (B) **oder** eine **Begleitung** (C) hat: `A UND (B ODER C)`. Stelle die Wahrheitstabelle auf.',
          steps: [
            { label: 'Zeilenzahl', body: '3 Variablen → 2³ = **8 Zeilen**, Kombinationen wie beim Binärzählen von 000 bis 111.' },
            { label: 'Hilfsspalte B ODER C', body: 'Zuerst die Klammer auswerten.' },
            { label: 'Tabelle', body: '| A | B | C | B ODER C | A UND (B ODER C) |\n|---|---|---|---|---|\n| 0 | 0 | 0 | 0 | 0 |\n| 0 | 0 | 1 | 1 | 0 |\n| 0 | 1 | 0 | 1 | 0 |\n| 0 | 1 | 1 | 1 | 0 |\n| 1 | 0 | 0 | 0 | 0 |\n| 1 | 0 | 1 | 1 | **1** |\n| 1 | 1 | 0 | 1 | **1** |\n| 1 | 1 | 1 | 1 | **1** |' },
            { label: 'Deuten', body: 'Zutritt nur, wenn A = 1 und mindestens B oder C = 1 → 3 von 8 Fällen.' },
          ],
          result: 'WAHR in den Zeilen 101, 110 und 111.',
        },
        {
          type: 'check',
          question: {
            id: 'p01-c07', kind: 'text', skill: 'prog.logic', difficulty: 2,
            prompt: `Welchen Wahrheitswert hat \`ok\`? (WAHR oder FALSCH)\n\n${F}\nalter ← 17\nbegleitung ← WAHR\nok ← alter ≥ 18 ODER begleitung = WAHR UND alter ≥ 16\n${F}`,
            accept: ['WAHR', 'true', '1', 'w'],
            hints: ['UND bindet stärker als ODER.', 'Werte zuerst `begleitung = WAHR UND alter ≥ 16` aus.'],
            misconceptions: [{ answer: 'FALSCH', error: 'logik-rangfolge', why: 'alter ≥ 18 ist zwar FALSCH, aber der UND-Teil (begleitung = WAHR UND 17 ≥ 16) ist WAHR – und FALSCH ODER WAHR ergibt WAHR.' }],
            explanation: '1. alter ≥ 18 → 17 ≥ 18 = FALSCH\n2. begleitung = WAHR → WAHR; alter ≥ 16 → WAHR; UND → WAHR\n3. FALSCH ODER WAHR = **WAHR**',
          },
        },
        { type: 'practice', title: 'Übung: Wahrheitstabellen (Generator)', generator: 'p.logic', count: 3, difficulty: 2 },
        { type: 'practice', title: 'Übung: Bedingungen aus dem Fragenpool', questionIds: ['p01-q021', 'p01-q022', 'p01-q023', 'p01-q024', 'p01-q025', 'p01-q026', 'p01-q034'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['UND: beide WAHR · ODER: mindestens einer WAHR · NICHT: umkehren.', 'Rangfolge: Klammern → NICHT → UND → ODER.', 'n Variablen → 2ⁿ Zeilen in der Wahrheitstabelle.', 'De Morgan: NICHT (A UND B) = NICHT A ODER NICHT B.', 'Bereich: x ≥ a UND x ≤ b.'] },
      ],
    },
  ],

  /* ==================================================================== */
  questions: [
    {
      id: 'p01-q001', kind: 'free', skill: 'prog.algorithm', difficulty: 1,
      prompt: 'Erläutern Sie den Begriff **Algorithmus** und nennen Sie **drei Eigenschaften**, die ein Algorithmus erfüllen muss.',
      modelAnswer: 'Ein Algorithmus ist eine eindeutige, endliche Folge von ausführbaren Anweisungen zur schrittweisen Lösung eines Problems bzw. einer Klasse von Problemen. Eigenschaften: Eindeutigkeit (jeder Schritt ist klar festgelegt), Ausführbarkeit (jeder Schritt ist durchführbar), Endlichkeit/Finitheit (endliche Beschreibung), Terminierung (endet nach endlich vielen Schritten), Determiniertheit (gleiche Eingabe → gleiches Ergebnis), Allgemeingültigkeit.',
      keywords: ['eindeutig', 'endlich', 'ausführbar', 'terminiert', 'determiniert', 'allgemein'],
      hints: ['Denke an ein Kochrezept, das ein Computer ausführen soll.'],
      explanation: 'Für die volle Punktzahl: Definition (Anweisungsfolge zur Problemlösung) + drei korrekt benannte und kurz erklärte Eigenschaften.',
    },
    {
      id: 'p01-q002', kind: 'multi', skill: 'prog.algorithm', difficulty: 1,
      prompt: 'Welche Aussagen beschreiben Eigenschaften eines Algorithmus **korrekt**?',
      options: ['Er besteht aus endlich vielen Anweisungen.', 'Jede Anweisung ist eindeutig.', 'Er muss in Java geschrieben sein.', 'Er endet nach endlich vielen Schritten.', 'Er darf bei gleicher Eingabe zufällig unterschiedliche Ergebnisse liefern.'],
      answer: [0, 1, 3],
      explanation: 'Endlichkeit, Eindeutigkeit und Terminierung sind Kerneigenschaften. Ein Algorithmus ist **sprachunabhängig** (Pseudocode, Diagramm, beliebige Sprache). Klassische Algorithmen sind **determiniert** – gleiche Eingabe, gleiches Ergebnis.',
    },
    {
      id: 'p01-q003', kind: 'order', skill: 'prog.algorithm', difficulty: 1,
      prompt: 'Bringe die Schritte eines Programms zur **Berechnung des Bruttopreises** in die richtige Reihenfolge (EVA).',
      items: ['Nettopreis über die Tastatur einlesen', 'Prüfen, ob die Eingabe eine gültige Zahl ≥ 0 ist', 'Bruttopreis = Nettopreis · 1,19 berechnen', 'Bruttopreis mit zwei Nachkommastellen anzeigen'],
      explanation: 'Eingabe → (Eingabe prüfen, Teil der Verarbeitung) → Berechnung → Ausgabe. Eine Plausibilitätsprüfung direkt nach der Eingabe verhindert Folgefehler.',
    },
    {
      id: 'p01-q004', kind: 'match', skill: 'prog.algorithm', difficulty: 1,
      prompt: 'Ordne die Vorgänge an einer **Kasse** dem EVA-Prinzip zu.',
      left: ['Barcode eines Artikels scannen', 'Summe aller Artikel berechnen', 'Kassenbon drucken', 'Rabattcode eintippen', 'Rückgeld ermitteln', 'Betrag auf dem Kundendisplay anzeigen'],
      right: ['Eingabe', 'Verarbeitung', 'Ausgabe'],
      answer: [0, 1, 2, 0, 1, 2],
      explanation: 'Scannen und Tippen = Eingabe; Rechnen = Verarbeitung; Drucken und Anzeigen = Ausgabe.',
    },
    {
      id: 'p01-q005', kind: 'text', skill: 'prog.pseudocode', difficulty: 1,
      prompt: 'Mit welchem Zeichen wird in unserem Pseudocode eine **Zuweisung** geschrieben? (Tipp: Auf der Tastatur kannst du auch `<-` eingeben.)',
      accept: ['←', '<-'],
      placeholder: 'Zeichen',
      hints: ['Ein Pfeil, der nach links zeigt.'],
      misconceptions: [{ answer: '=', error: 'zuweisung-vergleich', why: 'In unserem Pseudocode ist `=` der **Vergleich**. Für die Zuweisung nutzen wir ← (in Python/Java steht dafür zwar `=`, der Vergleich ist dort aber `==`).' }],
      explanation: '`x ← 5` bedeutet „x erhält den Wert 5“. Der Pfeil zeigt die Richtung: Der Wert rechts wird in der Variablen links gespeichert.',
    },
    {
      id: 'p01-q006', kind: 'number', skill: 'prog.variables', difficulty: 2,
      prompt: `Welchen Wert hat \`a\` nach Ausführung?\n\n${F}\na ← 5\nb ← 3\na ← a + b\nb ← a - b\na ← a - b\n${F}`,
      answer: 3,
      hints: ['Lege eine Trace-Tabelle mit den Spalten a und b an.'],
      misconceptions: [{ answer: '5', error: 'zuweisung-reihenfolge', why: 'Nach Zeile 4 ist b = 5. In Zeile 5 wird a = 8 − 5 = 3.' }, { answer: '8', error: 'zuweisung-reihenfolge', why: 'Die letzte Zeile ändert a noch einmal: 8 − 5 = 3.' }],
      explanation: '| Zeile | a | b |\n|---|---|---|\n| a ← 5 | 5 | – |\n| b ← 3 | 5 | 3 |\n| a ← a + b | 8 | 3 |\n| b ← a − b | 8 | 5 |\n| a ← a − b | **3** | 5 |\n\nDie Werte wurden getauscht (a = 3, b = 5).',
    },
    {
      id: 'p01-q007', kind: 'table', skill: 'prog.variables', difficulty: 2,
      prompt: `Führe einen **Schreibtischtest** durch und trage die Werte von \`x\` und \`y\` **nach** jeder Zeile ein.\n\n${F}\nx ← 4\ny ← x * 3\nx ← y - x\ny ← y + x\nx ← x MOD 5\n${F}`,
      columns: [{ key: 'x', label: 'x', type: 'number' }, { key: 'y', label: 'y', type: 'number' }],
      rows: [
        { label: 'x ← 4', cells: { x: { given: '4' }, y: { given: '–' } } },
        { label: 'y ← x * 3', cells: { x: { answer: '4' }, y: { answer: '12' } } },
        { label: 'x ← y - x', cells: { x: { answer: '8' }, y: { answer: '12' } } },
        { label: 'y ← y + x', cells: { x: { answer: '8' }, y: { answer: '20' } } },
        { label: 'x ← x MOD 5', cells: { x: { answer: '3' }, y: { answer: '20' } } },
      ],
      hints: ['Unveränderte Variablen behalten ihren Wert – trage ihn trotzdem ein.', 'MOD = Rest der ganzzahligen Division.'],
      misconceptions: [{ cell: '3:y', answer: '16', error: 'zuweisung-reihenfolge', why: 'In Zeile 4 hat x bereits den neuen Wert 8: 12 + 8 = 20.' }, { cell: '4:x', answer: '1', error: 'mod-div-verwechselt', why: '8 MOD 5 ist der Rest: 8 = 1 · 5 + 3 → 3 (1 wäre 8 DIV 5).' }],
      explanation: '| Zeile | x | y |\n|---|---|---|\n| x ← 4 | 4 | – |\n| y ← x * 3 | 4 | 12 |\n| x ← y − x | 8 | 12 |\n| y ← y + x | 8 | 20 |\n| x ← x MOD 5 | 3 | 20 |',
    },
    {
      id: 'p01-q008', kind: 'number', skill: 'prog.operators', difficulty: 2,
      prompt: `Welchen Wert hat \`x\` am Ende?\n\n${F}\nx ← 10\nx ← x * 2 + 3\nx ← x MOD 7\n${F}`,
      answer: 2,
      hints: ['Zeile 2: Punkt vor Strich.', '23 : 7 = 3 Rest ?'],
      misconceptions: [{ answer: '3', error: 'mod-div-verwechselt', why: '3 ist 23 DIV 7. MOD liefert den Rest: 23 − 21 = 2.' }, { answer: '1', error: 'operator-rangfolge', why: 'Punkt vor Strich: x * 2 + 3 = 20 + 3 = 23 – nicht 10 · (2 + 3) = 50.' }],
      explanation: 'Zeile 2: 10 · 2 + 3 = 23 · Zeile 3: 23 MOD 7 = 23 − 3 · 7 = **2**.',
    },
    {
      id: 'p01-q009', kind: 'single', skill: 'prog.variables', difficulty: 2,
      prompt: 'Welche Anweisungsfolge **tauscht** die Werte von `a` und `b` korrekt?',
      options: ['a ← b · b ← a', 'hilf ← a · a ← b · b ← hilf', 'hilf ← a · b ← a · a ← hilf', 'b ← a · hilf ← b · a ← hilf'],
      answer: 1,
      distractors: {
        '0': { why: 'Nach `a ← b` ist der alte Wert von a verloren; beide haben danach den Wert von b.', error: 'tausch-ohne-hilfsvariable' },
        '2': { why: 'Hier bekommt b den Wert von a und a wieder seinen eigenen Wert – der Wert von b geht verloren.', error: 'tausch-ohne-hilfsvariable' },
        '3': { why: 'Nach `b ← a` ist der alte Wert von b verloren.', error: 'tausch-ohne-hilfsvariable' },
      },
      explanation: 'Der alte Wert von a wird in `hilf` gesichert, dann bekommt a den Wert von b und b den gesicherten Wert.',
    },
    {
      id: 'p01-q010', kind: 'match', skill: 'prog.datatypes', difficulty: 1,
      prompt: 'Ordne jedem Feld eines Kundendatensatzes den passendsten Datentyp zu.',
      left: ['Postleitzahl', 'Anzahl bestellter Artikel', 'Gewicht der Lieferung in kg', 'Newsletter abonniert', 'Anrede-Kürzel (H/F/D)'],
      right: ['String', 'int', 'double', 'bool', 'char'],
      answer: [0, 1, 2, 3, 4],
      explanation: 'PLZ als String (führende Null, keine Rechnung) · Anzahl int · Gewicht double · ja/nein bool · ein Buchstabe char.',
    },
    {
      id: 'p01-q011', kind: 'free', skill: 'prog.datatypes', difficulty: 2,
      prompt: 'Ein Kollege möchte Postleitzahlen als Ganzzahl (int) speichern. Begründen Sie, warum **String** besser geeignet ist (zwei Gründe).',
      modelAnswer: '1. Führende Nullen gehen bei Zahlen verloren (01067 würde zu 1067). 2. Mit Postleitzahlen wird nicht gerechnet – sie sind Kennzeichen, keine Mengen. Außerdem gibt es internationale PLZ mit Buchstaben/Leerzeichen (z. B. Großbritannien, Niederlande), die in int nicht passen.',
      keywords: ['führende Null', 'nicht rechnen', 'Buchstaben', 'Kennzeichen'],
      explanation: 'Faustregel: Alles, womit man nicht rechnet (PLZ, Telefonnummer, Artikelnummer, IBAN), als String speichern.',
    },
    {
      id: 'p01-q012', kind: 'number', skill: 'prog.datatypes', difficulty: 1,
      prompt: 'Wie viele **verschiedene Werte** kann ein Datentyp mit **8 Bit** darstellen?',
      answer: 256,
      hints: ['Jedes Bit hat 2 Zustände.'],
      misconceptions: [{ answer: '255', error: 'wertebereich', why: '255 ist der **größte** Wert (ohne Vorzeichen). Zusammen mit der 0 sind es 256 Werte.' }, { answer: '128', error: 'wertebereich', why: '2⁷ = 128. Bei 8 Bit sind es 2⁸ = 256.' }],
      explanation: '2⁸ = **256** Werte – z. B. 0 … 255 (ohne Vorzeichen) oder −128 … 127 (mit Vorzeichen).',
    },
    {
      id: 'p01-q013', kind: 'number', skill: 'prog.datatypes', difficulty: 2,
      prompt: 'Welches ist der **größte** Wert, den eine **vorzeichenbehaftete 16-Bit-Ganzzahl** (short, Zweierkomplement) annehmen kann?',
      answer: 32767,
      hints: ['Ein Bit „kostet“ das Vorzeichen.', 'Größter Wert: 2ⁿ⁻¹ − 1.'],
      misconceptions: [{ answer: '65535', error: 'wertebereich-vorzeichen', why: '65.535 = 2¹⁶ − 1 gilt für **vorzeichenlose** 16-Bit-Zahlen.' }, { answer: '32768', error: 'wertebereich', why: '−32.768 ist der kleinste Wert. Der größte ist 2¹⁵ − 1 = 32.767 (die 0 zählt zu den nicht-negativen Werten).' }],
      explanation: 'Bereich: −2¹⁵ … 2¹⁵ − 1 = −32.768 … **32.767**.',
    },
    {
      id: 'p01-q014', kind: 'single', skill: 'prog.datatypes', difficulty: 2,
      prompt: 'In vielen Programmiersprachen liefert `0.1 + 0.2 == 0.3` den Wert **false**. Warum?',
      options: ['Weil 0,1 und 0,2 im Binärsystem nicht exakt darstellbar sind (Gleitkomma-Rundungsfehler)', 'Weil der Compiler einen Fehler hat', 'Weil == bei Kommazahlen immer false liefert', 'Weil 0.1 als String interpretiert wird'],
      answer: 0,
      distractors: {
        '1': { why: 'Das Verhalten ist korrekt nach dem Gleitkommastandard IEEE 754 – kein Compilerfehler.', error: 'gleitkomma' },
        '2': { why: '`1.5 == 1.5` ist true. Das Problem sind Werte, die binär nur näherungsweise darstellbar sind.', error: 'gleitkomma' },
        '3': { why: 'Ohne Anführungszeichen ist 0.1 eine Zahl (double).', error: 'gleitkomma' },
      },
      explanation: '0,1 ist im Zweiersystem ein periodischer Bruch und wird gerundet gespeichert. Die Summe ist z. B. 0,30000000000000004. Darum: Kommazahlen nie mit `=` vergleichen, sondern mit Toleranz (|a − b| < 0,000001), und Geld mit Dezimaltyp oder in Cent rechnen.',
    },
    {
      id: 'p01-q015', kind: 'free', skill: 'prog.datatypes', difficulty: 3,
      prompt: 'Für ein Abrechnungsprogramm sollen Rechnungsbeträge gespeichert werden. Erläutern Sie, warum `double` dafür **ungeeignet** ist, und nennen Sie **zwei Alternativen**.',
      modelAnswer: 'double ist ein binärer Gleitkommatyp: Viele Dezimalbrüche (z. B. 0,10 €) lassen sich nicht exakt darstellen, es entstehen kleine Rundungsfehler, die sich bei Summen aufaddieren und zu Cent-Abweichungen führen. Alternativen: ein dezimaler Festkomma-/Dezimaltyp (decimal in C#, BigDecimal in Java, decimal in Python) oder intern in Cent als Ganzzahl (int/long) rechnen und nur für die Anzeige durch 100 teilen.',
      keywords: ['Rundungsfehler', 'binär', 'decimal', 'BigDecimal', 'Cent', 'Ganzzahl'],
      explanation: 'Im kaufmännischen Bereich müssen Beträge auf den Cent genau stimmen – deshalb exakte Dezimaltypen oder Ganzzahlen.',
    },
    {
      id: 'p01-q016', kind: 'number', skill: 'prog.operators', difficulty: 1,
      prompt: `Welchen Wert hat \`r\`?\n\n${F}\nr ← 17 MOD 5\n${F}`,
      answer: 2,
      misconceptions: [{ answer: '3', error: 'mod-div-verwechselt', why: '3 ist 17 DIV 5. MOD liefert den Rest: 17 − 15 = 2.' }],
      explanation: '17 : 5 = 3 Rest **2** (3 · 5 = 15, 17 − 15 = 2).',
    },
    {
      id: 'p01-q017', kind: 'number', skill: 'prog.operators', difficulty: 1,
      prompt: `Welchen Wert hat \`q\`?\n\n${F}\nq ← 17 DIV 5\n${F}`,
      answer: 3,
      misconceptions: [{ answer: '2', error: 'mod-div-verwechselt', why: '2 ist der Rest (MOD). DIV liefert, wie oft 5 ganz in 17 passt.' }, { answer: '3.4', error: 'div-genau', why: 'DIV ist die **ganzzahlige** Division – Nachkommastellen fallen weg.' }],
      explanation: '17 / 5 = 3,4 → ganzzahliger Anteil **3**.',
    },
    {
      id: 'p01-q018', kind: 'number', skill: 'prog.operators', difficulty: 3,
      prompt: 'Welchen Wert hat `c` nach Ausführung dieses **Java**-Codes? (Gib nur die Zahl an.)\n\n```java\nint a = 7;\nint b = 2;\ndouble c = a / b;\n```',
      answer: 3,
      hints: ['Welchen Typ haben a und b?', 'Die Division wird ausgeführt, bevor das Ergebnis in double umgewandelt wird.'],
      misconceptions: [{ answer: '3.5', error: 'int-division', why: 'a und b sind int → `a / b` ist eine **Ganzzahldivision** (= 3). Erst danach wird 3 zu 3.0 umgewandelt.' }, { answer: '3,5', error: 'int-division', why: 'a und b sind int → `a / b` ist eine **Ganzzahldivision** (= 3). Erst danach wird 3 zu 3.0 umgewandelt.' }],
      explanation: '`a / b` mit zwei int-Werten ergibt in Java **3** (Nachkommastellen abgeschnitten). Die Zuweisung an double macht daraus 3.0. Richtig wäre `double c = (double) a / b;` → 3.5.',
    },
    {
      id: 'p01-q019', kind: 'number', skill: 'prog.operators', difficulty: 2,
      prompt: `Welchen Wert hat \`x\`?\n\n${F}\nx ← 2 + 3 * 4 - 10 DIV 3\n${F}`,
      answer: 11,
      hints: ['Erst alle Punktrechnungen (*, DIV), dann Strichrechnung von links nach rechts.'],
      misconceptions: [{ answer: '3', error: 'operator-rangfolge', why: 'Du hast von links nach rechts ohne Punkt-vor-Strich gerechnet: (2 + 3) · 4 = 20, 20 − 10 = 10, 10 DIV 3 = 3. Punktrechnung kommt aber zuerst.' }],
      explanation: '3 · 4 = 12 · 10 DIV 3 = 3 · 2 + 12 − 3 = **11**',
    },
    {
      id: 'p01-q020', kind: 'single', skill: 'prog.operators', difficulty: 1,
      prompt: 'Mit welcher Bedingung prüfst du, ob eine Ganzzahl `n` **ungerade** ist?',
      options: ['n MOD 2 = 1', 'n DIV 2 = 1', 'n MOD 2 = 0', 'n / 2 = 0'],
      answer: 0,
      distractors: {
        '1': { why: 'n DIV 2 = 1 gilt nur für n = 2 und n = 3.', error: 'mod-div-verwechselt' },
        '2': { why: 'Das prüft auf **gerade** Zahlen.', error: 'bedingung-umgekehrt' },
        '3': { why: 'n / 2 = 0 gilt nur für n = 0.', error: 'mod-div-verwechselt' },
      },
      explanation: 'Bei ungeraden (positiven) Zahlen bleibt beim Teilen durch 2 der Rest 1. (Bei negativen Zahlen kann MOD je nach Sprache −1 liefern – sicherer ist daher `n MOD 2 ≠ 0`.)',
    },
    {
      id: 'p01-q021', kind: 'table', skill: 'prog.logic', difficulty: 1,
      prompt: 'Vervollständige die Wahrheitstabelle (1 = WAHR, 0 = FALSCH).',
      columns: [
        { key: 'a', label: 'A', type: 'text' },
        { key: 'b', label: 'B', type: 'text' },
        { key: 'und', label: 'A UND B', type: 'text' },
        { key: 'oder', label: 'A ODER B', type: 'text' },
        { key: 'nicht', label: 'NICHT A', type: 'text' },
      ],
      rows: [
        { cells: { a: { given: '0' }, b: { given: '0' }, und: { answer: '0', accept: ['falsch', 'f'] }, oder: { answer: '0', accept: ['falsch', 'f'] }, nicht: { answer: '1', accept: ['wahr', 'w'] } } },
        { cells: { a: { given: '0' }, b: { given: '1' }, und: { answer: '0', accept: ['falsch', 'f'] }, oder: { answer: '1', accept: ['wahr', 'w'] }, nicht: { answer: '1', accept: ['wahr', 'w'] } } },
        { cells: { a: { given: '1' }, b: { given: '0' }, und: { answer: '0', accept: ['falsch', 'f'] }, oder: { answer: '1', accept: ['wahr', 'w'] }, nicht: { answer: '0', accept: ['falsch', 'f'] } } },
        { cells: { a: { given: '1' }, b: { given: '1' }, und: { answer: '1', accept: ['wahr', 'w'] }, oder: { answer: '1', accept: ['wahr', 'w'] }, nicht: { answer: '0', accept: ['falsch', 'f'] } } },
      ],
      misconceptions: [{ cell: '3:oder', answer: '0', error: 'logik-oder-exklusiv', why: 'ODER ist einschließend: Auch wenn beide WAHR sind, ist das Ergebnis WAHR.' }],
      explanation: 'UND nur in der letzten Zeile 1; ODER überall 1 außer bei 0/0; NICHT A kehrt A um.',
    },
    {
      id: 'p01-q022', kind: 'single', skill: 'prog.logic', difficulty: 2,
      prompt: 'Eine Software soll prüfen, ob das Alter einer Person **zwischen 18 und 65 Jahren (jeweils einschließlich)** liegt. Welche Bedingung ist korrekt?',
      options: ['alter ≥ 18 UND alter ≤ 65', 'alter ≥ 18 ODER alter ≤ 65', 'alter > 18 UND alter < 65', 'alter ≤ 18 UND alter ≥ 65'],
      answer: 0,
      distractors: {
        '1': { why: 'Mit ODER ist die Bedingung für **jedes** Alter WAHR (jede Zahl ist ≥ 18 oder ≤ 65).', error: 'logik-und-oder' },
        '2': { why: '„einschließlich“ verlangt ≥ und ≤; 18 und 65 würden hier ausgeschlossen.', error: 'grenzwert-vergleich' },
        '3': { why: 'Diese Bedingung ist nie erfüllbar (niemand ist gleichzeitig ≤ 18 und ≥ 65).', error: 'bedingung-umgekehrt' },
      },
      explanation: 'Bereichsprüfung: untere Grenze UND obere Grenze. „einschließlich“ → ≥ bzw. ≤.',
    },
    {
      id: 'p01-q023', kind: 'text', skill: 'prog.logic', difficulty: 2,
      prompt: `Welchen Wert hat \`erg\`? (WAHR oder FALSCH)\n\n${F}\nerg ← NICHT (5 > 3 UND 2 = 2)\n${F}`,
      accept: ['FALSCH', 'false', '0', 'f'],
      hints: ['Klammer zuerst auswerten.'],
      misconceptions: [{ answer: 'WAHR', error: 'logik-nicht-bereich', why: 'Die Klammer ist WAHR (beide Teile WAHR). NICHT kehrt das zu FALSCH um.' }],
      explanation: '5 > 3 → WAHR · 2 = 2 → WAHR · WAHR UND WAHR = WAHR · NICHT WAHR = **FALSCH**',
    },
    {
      id: 'p01-q024', kind: 'text', skill: 'prog.logic', difficulty: 1,
      prompt: `Welchen Wert hat \`zugriff\`? (WAHR oder FALSCH)\n\n${F}\nx ← 7\ny ← 4\nzugriff ← x > 10 ODER y < 5\n${F}`,
      accept: ['WAHR', 'true', '1', 'w'],
      misconceptions: [{ answer: 'FALSCH', error: 'logik-und-oder', why: 'Bei ODER reicht ein WAHR-Teil: y < 5 ist WAHR.' }],
      explanation: 'x > 10 → 7 > 10 = FALSCH · y < 5 → 4 < 5 = WAHR · FALSCH ODER WAHR = **WAHR**',
    },
    {
      id: 'p01-q025', kind: 'text', skill: 'prog.logic', difficulty: 3,
      prompt: 'Forme den Ausdruck `NICHT (A ODER B)` mit den Regeln von **De Morgan** so um, dass NICHT nur noch direkt vor den einzelnen Variablen steht. (Schreibweise: NICHT, UND, ODER)',
      accept: ['NICHT A UND NICHT B', '(NICHT A) UND (NICHT B)', 'NICHT B UND NICHT A', '!A && !B', 'not a and not b'],
      hints: ['Beim „Hineinziehen“ des NICHT wird aus ODER ein UND (und umgekehrt).'],
      misconceptions: [{ answer: 'NICHT A ODER NICHT B', error: 'logik-demorgan', why: 'Beim Auflösen der Klammer wechselt der Operator: ODER wird zu UND.' }],
      explanation: 'De Morgan: NICHT (A ODER B) = **NICHT A UND NICHT B**. Probe mit A = 1, B = 0: links NICHT(1) = 0, rechts 0 UND 1 = 0 ✔',
    },
    {
      id: 'p01-q026', kind: 'order', skill: 'prog.logic', difficulty: 3,
      prompt: 'Ordne die Operatoren nach ihrer **Priorität** – der zuerst ausgewertete steht oben.',
      items: ['Klammern ( )', 'Punktrechnung: *, /, DIV, MOD', 'Strichrechnung: +, −', 'Vergleiche: <, ≤, =, ≠, ≥, >', 'UND', 'ODER'],
      explanation: 'Erst wird gerechnet (Klammer → Punkt → Strich), dann verglichen, dann logisch verknüpft – UND vor ODER. Beispiel: `a + 1 > 5 ODER b = 2 UND c < 3` = `((a + 1) > 5) ODER ((b = 2) UND (c < 3))`.',
    },
    {
      id: 'p01-q027', kind: 'free', skill: 'prog.pseudocode', difficulty: 2,
      prompt: 'Die Buchhaltung der Elektro Krämer GmbH benötigt ein kleines Programm: Nach Eingabe eines **Nettobetrags** soll der **Bruttobetrag (19 % USt.)** ausgegeben werden. Liegt der Bruttobetrag **über 1.000 €**, soll zusätzlich „Freigabe durch Abteilungsleitung erforderlich“ ausgegeben werden. Formulieren Sie den Algorithmus in **Pseudocode**.',
      modelAnswer: `MWST_SATZ ← 0.19\nEINGABE netto\nbrutto ← netto + netto * MWST_SATZ\nAUSGABE "Bruttobetrag: ", brutto\nWENN brutto > 1000 DANN\n  AUSGABE "Freigabe durch Abteilungsleitung erforderlich"\nENDE WENN`,
      keywords: ['EINGABE', 'brutto ←', '1,19 bzw. 0,19', 'WENN brutto > 1000', 'AUSGABE', 'ENDE WENN'],
      hints: ['EVA: Was wird eingegeben, berechnet, ausgegeben?', 'Für den Zusatzhinweis genügt eine einseitige Verzweigung (ohne SONST).'],
      explanation: 'Bewertet werden: Eingabe, korrekte Berechnung (· 1,19 oder netto + netto · 0,19), Ausgabe, einseitige Verzweigung mit „über 1.000“ = `> 1000` und sauber abgeschlossener Block. Eine Konstante für den Steuersatz ist guter Stil.',
    },
    {
      id: 'p01-q028', kind: 'table', skill: 'prog.datatypes', difficulty: 2,
      prompt: 'Für eine Inventarliste sollen folgende Felder angelegt werden. Trage jeweils den passendsten Datentyp ein (**int, double, bool, char** oder **String**).',
      columns: [{ key: 'typ', label: 'Datentyp', type: 'text' }],
      rows: [
        { label: 'Inventarnummer „INV-2025-0042“', cells: { typ: { answer: 'String', accept: ['zeichenkette', 'str', 'text'] } } },
        { label: 'Anzahl Netzwerkports (z. B. 24)', cells: { typ: { answer: 'int', accept: ['integer', 'ganzzahl'] } } },
        { label: 'Leistungsaufnahme in Watt (z. B. 17,5)', cells: { typ: { answer: 'double', accept: ['float', 'gleitkommazahl', 'decimal'] } } },
        { label: 'PoE-fähig (ja/nein)', cells: { typ: { answer: 'bool', accept: ['boolean', 'wahrheitswert'] } } },
        { label: 'Energieeffizienzklasse (ein Buchstabe, z. B. „B“)', cells: { typ: { answer: 'char', accept: ['character', 'zeichen'] } } },
      ],
      explanation: 'Text mit Buchstaben → String · Anzahl → int · Messwert mit Komma → double · ja/nein → bool · genau ein Zeichen → char.',
    },
    {
      id: 'p01-q029', kind: 'number', skill: 'prog.pseudocode', difficulty: 2,
      prompt: `Die Benutzerin gibt nacheinander **120** und **2000** ein. Welchen Wert gibt das Programm aus? (in €)\n\n${F}\nPREIS_KWH ← 0.30\nEINGABE leistungWatt\nEINGABE stunden\nkwh ← leistungWatt * stunden / 1000\nkosten ← kwh * PREIS_KWH\nAUSGABE kosten\n${F}`,
      answer: 72,
      tolerance: 0.001,
      unit: '€',
      hints: ['Die Eingaben werden in der Reihenfolge der EINGABE-Anweisungen zugewiesen.'],
      misconceptions: [{ answer: '240', error: 'teilergebnis', why: '240 ist die Energie in kWh. Ausgegeben werden die Kosten: 240 · 0,30.' }, { answer: '72000', error: 'einheit-kwh', why: 'Die Division durch 1000 (Wh → kWh) fehlt.' }],
      explanation: 'leistungWatt = 120, stunden = 2000 · kwh = 120 · 2000 / 1000 = 240 · kosten = 240 · 0,30 = **72**',
    },
    {
      id: 'p01-q030', kind: 'text', skill: 'prog.datatypes', difficulty: 2,
      prompt: `Was gibt das Programm aus? Achte auf die Anführungszeichen.\n\n${F}\na ← "5"\nb ← "3"\nAUSGABE a + b\n${F}`,
      accept: ['53'],
      hints: ['In Anführungszeichen stehen Zeichenketten, keine Zahlen.'],
      misconceptions: [{ answer: '8', error: 'string-verkettung', why: 'a und b sind Strings. `+` **verkettet** Zeichenketten: "5" + "3" = "53".' }],
      explanation: 'Bei Strings bedeutet `+` **Verkettung** (Konkatenation): "5" + "3" = **"53"**. Um zu rechnen, müssten die Strings erst in Zahlen umgewandelt werden (z. B. `int("5")` in Python, `Integer.parseInt("5")` in Java).',
    },
    {
      id: 'p01-q031', kind: 'number', skill: 'prog.operators', difficulty: 2,
      prompt: `Welchen Wert hat \`z\`?\n\n${F}\nz ← 23 MOD 4 + 23 DIV 4\n${F}`,
      answer: 8,
      misconceptions: [{ answer: '3', error: 'operator-rangfolge', why: 'MOD und DIV werden **vor** dem + ausgewertet – nicht 23 MOD (4 + 23).' }],
      explanation: '23 : 4 = 5 Rest 3 → 23 MOD 4 = 3, 23 DIV 4 = 5 → 3 + 5 = **8**',
    },
    {
      id: 'p01-q032', kind: 'free', skill: 'prog.variables', difficulty: 1,
      prompt: 'Erläutern Sie den Unterschied zwischen einer **Variablen** und einer **Konstanten** und nennen Sie je ein Beispiel aus einem Kassenprogramm.',
      modelAnswer: 'Eine Variable ist ein benannter Speicherplatz, dessen Wert sich während des Programmlaufs ändern kann (z. B. summe, die mit jedem gescannten Artikel steigt). Eine Konstante hat einen festen Wert, der nach der Festlegung nicht mehr geändert werden darf (z. B. MWST_SATZ = 0,19). Konstanten erhöhen Lesbarkeit und Wartbarkeit: Ändert sich der Wert, muss nur eine Stelle angepasst werden.',
      keywords: ['änderbar', 'fester Wert', 'Speicherplatz', 'MWST', 'Wartbarkeit'],
      explanation: 'Kern: änderbar vs. unveränderlich, jeweils mit passendem Beispiel.',
    },
    {
      id: 'p01-q033', kind: 'multi', skill: 'prog.variables', difficulty: 1,
      prompt: 'Welche Bezeichner sind in gängigen Programmiersprachen (Java, C#, Python) **gültig**?',
      options: ['anzahlKunden', '2teAdresse', 'netto preis', '_temp', 'MAX_USERS', 'while'],
      answer: [0, 3, 4],
      explanation: 'Bezeichner beginnen mit Buchstabe oder Unterstrich (nicht mit Ziffer), enthalten keine Leerzeichen und dürfen keine reservierten Wörter wie `while` sein.',
    },
    {
      id: 'p01-q034', kind: 'number', skill: 'prog.logic', difficulty: 1,
      prompt: 'Wie viele **Zeilen** (ohne Kopfzeile) hat eine vollständige Wahrheitstabelle mit **4 Eingangsvariablen**?',
      answer: 16,
      misconceptions: [{ answer: '8', error: 'wahrheitstabelle-zeilen', why: '8 = 2³ gilt für drei Variablen.' }, { answer: '4', error: 'wahrheitstabelle-zeilen', why: 'Jede Variable verdoppelt die Anzahl der Kombinationen: 2⁴.' }],
      explanation: 'Jede Variable kann 0 oder 1 sein → 2⁴ = **16** Kombinationen.',
    },
    {
      id: 'p01-q035', kind: 'text', skill: 'prog.pseudocode', difficulty: 2,
      prompt: `Was gibt der Algorithmus aus, wenn der Benutzer **3** eingibt?\n\n${F}\nEINGABE tag\nFALLS tag\n  FALL 1, 2, 3, 4, 5:\n    AUSGABE "Werktag"\n  FALL 6:\n    AUSGABE "Samstag"\n  SONST:\n    AUSGABE "Sonntag oder ungültig"\nENDE FALLS\n${F}`,
      accept: ['Werktag'],
      hints: ['Bei FALLS wird der Wert mit jedem FALL verglichen; mehrere Werte durch Komma.'],
      explanation: 'tag = 3 passt zu `FALL 1, 2, 3, 4, 5:` → Ausgabe **Werktag**. Die übrigen Fälle werden nicht mehr betrachtet.',
    },
    {
      id: 'p01-q036', kind: 'match', skill: 'prog.pseudocode', difficulty: 2,
      prompt: 'Schulbücher und Prüfungen verwenden unterschiedliche Pseudocode-Schreibweisen. Ordne jeder Schreibweise ihre Bedeutung zu.',
      left: ['x := 5', 'FALLS umsatz > 1000 DANN … SONST … ENDE FALLS', 'Wiederhole … solange b', 'WIEDERHOLE … BIS b', 'Von i := 1 Bis 10 … Ende Schleife', 'a modulo b'],
      right: ['Zuweisung (wie x ← 5)', 'einfache Verzweigung (wie WENN … DANN … SONST)', 'fußgesteuerte Schleife mit Laufbedingung', 'fußgesteuerte Schleife mit Abbruchbedingung', 'Zählschleife (wie FÜR i VON 1 BIS 10)', 'Rest der ganzzahligen Division (MOD)'],
      answer: [0, 1, 2, 3, 4, 5],
      hints: ['Ein DANN verrät eine Verzweigung mit Bedingung.', 'Achte bei Schleifen auf das Wort vor der Bedingung: BIS oder solange?'],
      explanation: ':= ist eine Zuweisung · FALLS … DANN ist in manchen Büchern eine einfache Verzweigung (in dieser App: WENN) · „solange“ = Laufbedingung, „BIS“ = Abbruchbedingung · „Von … Bis“ = Zählschleife · modulo = MOD.',
    },
    {
      id: 'p01-q037', kind: 'text', skill: 'prog.pseudocode', difficulty: 2,
      prompt: 'Ein Prüfungsbuch schreibt `Wiederhole … solange versuche < 3`. Übertrage die Schleife in die Schreibweise dieser App: `WIEDERHOLE … BIS ___`. Was steht hinter BIS?',
      accept: ['versuche ≥ 3', 'versuche >= 3', 'versuche>=3', 'versuche≥3', 'versuche => 3', 'NICHT versuche < 3', 'NICHT (versuche < 3)', 'NICHT(versuche < 3)', 'NICHT(versuche<3)'],
      placeholder: 'Bedingung',
      hints: ['„solange“ ist eine Laufbedingung, „BIS“ eine Abbruchbedingung – du brauchst das Gegenteil.', 'Das Gegenteil von < ist ≥.'],
      misconceptions: [
        { answer: 'versuche < 3', error: 'pseudocode-lauf-abbruch', why: 'Dann würde die Schleife schon nach dem ersten Durchlauf enden. BIS braucht die **verneinte** Bedingung.' },
        { answer: 'versuche > 3', error: 'negation-falsch', why: 'Das Gegenteil von „< 3“ ist „≥ 3“. Mit „> 3“ liefe die Schleife einmal zu oft.' },
      ],
      explanation: 'Laufbedingung „versuche < 3“ → Abbruchbedingung ist ihr Gegenteil: **versuche ≥ 3**. Merke: Gegenteil von < ist ≥, von > ist ≤, von = ist ≠.',
    },
    {
      id: 'p01-q038', kind: 'free', skill: 'prog.pseudocode', difficulty: 2,
      prompt: 'In einem Lösungsbuch wird die Java-Schleife `for (int i = 0; i < 10; i++) { … }` als `FÜR i := 0 BIS 10` übersetzt. Beurteilen Sie die Übersetzung und geben Sie eine korrekte Fassung an.',
      modelAnswer: 'Die Übersetzung ist ungenau bzw. falsch: Die Java-Schleife läuft, solange i < 10 gilt, also mit i = 0 bis 9 – das sind 10 Durchläufe. „FÜR i := 0 BIS 10“ schließt den Endwert 10 ein und ergibt 11 Durchläufe. Korrekt ist „FÜR i VON 0 BIS 9“ (bzw. „FÜR i := 0 BIS 9“) oder als kopfgesteuerte Schleife: i ← 0, SOLANGE i < 10 TUE … i ← i + 1 … ENDE SOLANGE.',
      keywords: ['i < 10', '0 bis 9', '10 Durchläufe', '11 Durchläufe', 'BIS 9'],
      hints: ['Zähle die Durchläufe beider Varianten.'],
      explanation: 'Kern: „< 10“ schließt 10 aus, „BIS 10“ schließt 10 ein → ein Durchlauf zu viel. Häufiger Fehler in Prüfungen: Off-by-one beim Übersetzen von Schleifengrenzen.',
    },
  ],
};
