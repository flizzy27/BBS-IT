import type { Module } from '../types';

/** Codeblock-Begrenzer */
const F = '```';

export const p02: Module = {
  id: 'p02',
  nr: 2,
  area: 'programmierung',
  title: 'Kontrollstrukturen & Schreibtischtest',
  short: 'Sequenz, Verzweigung, Mehrfachauswahl, Schleifen und Entscheidungstabellen in Pseudocode – mit Trace-Tabellen exakt nachvollziehen und selbst formulieren.',
  icon: 'Repeat',
  relevance: 'ap1',
  prerequisites: ['p01'],
  generators: ['p.trace.loop', 'p.trace.branch', 'p.dectable'],
  skills: [
    { id: 'prog.trace', module: 'p02', title: 'Schreibtischtest mit Trace-Tabelle', requires: ['prog.variables'] },
    { id: 'prog.branch', module: 'p02', title: 'Verzweigungen (WENN … SONST, verschachtelt)', requires: ['prog.logic'] },
    { id: 'prog.switch', module: 'p02', title: 'Mehrfachauswahl (SONST WENN, FALLS)', requires: ['prog.branch'] },
    { id: 'prog.loops', module: 'p02', title: 'Schleifen: kopf-, fußgesteuert, Zählschleife', requires: ['prog.branch'] },
    { id: 'prog.writecode', module: 'p02', title: 'Algorithmen selbst in Pseudocode formulieren', requires: ['prog.loops', 'prog.switch'] },
    { id: 'prog.dectable', module: 'p02', title: 'Entscheidungstabellen lesen und aufstellen', requires: ['prog.branch'] },
  ],
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'p02-l01',
      title: 'Sequenz und Schreibtischtest',
      minutes: 15,
      relevance: 'ap1',
      skills: ['prog.trace'],
      simple: `Eine Sequenz ist die einfachste Struktur: Die Anweisungen laufen einfach nacheinander von oben nach unten ab – wie die Schritte einer Bauanleitung. Beim Schreibtischtest spielst du selbst den Computer: Du gehst Zeile für Zeile durch und notierst in einer Tabelle, welchen Wert jede Variable gerade hat. So findest du Fehler, ohne das Programm laufen zu lassen. Wichtig: Jede neue Zuweisung überschreibt den alten Wert.

**Merke:** Schreibtischtest = Zeile für Zeile, jede Wertänderung in eine neue Tabellenzeile.`,
      steps: [
        {
          type: 'explain',
          title: 'Den Computer spielen',
          body: `Die einfachste Kontrollstruktur ist die **Sequenz**: Anweisungen werden **der Reihe nach von oben nach unten** ausgeführt – jede genau einmal.

In der Prüfung heißt es oft: *„Welchen Wert hat x nach Ausführung des Algorithmus?“* oder *„Führen Sie einen Schreibtischtest durch.“* Dafür nutzt du eine **Trace-Tabelle** (Ablaufverfolgung):

1. **Spalten anlegen:** eine Spalte pro Variable (bei Schleifen zusätzlich eine für die Bedingung), ggf. eine für die Ausgabe.
2. **Zeilen anlegen:** eine Zeile pro ausgeführter Anweisung bzw. pro Schleifendurchlauf.
3. **Exakt ausführen:** Rechne mit den **aktuellen** Werten. Nimm nichts „vorweg“, auch wenn du ahnst, was der Algorithmus soll.
4. **Nur Änderungen eintragen** oder jeden Zustand vollständig – Hauptsache, du verlierst nichts.

**Typische Fallen:**
- Mit einem **alten** Wert weiterrechnen, obwohl die Variable schon geändert wurde.
- Bei \`x ← x + 1\` die rechte Seite mit dem neuen statt dem alten Wert berechnen.
- Bei Schleifen einen Durchlauf zu viel oder zu wenig (**Off-by-one-Fehler**).
- \`DIV\` mit \`/\` verwechseln.

Ein Schreibtischtest ist auch in der Praxis ein wertvolles Werkzeug: Man findet Logikfehler, **ohne** das Programm auszuführen (statischer Test).`,
        },
        {
          type: 'visual',
          title: 'Aufbau einer Trace-Tabelle',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: '1. Spalten', text: 'Eine Spalte je Variable, plus Bedingung und Ausgabe, wenn vorhanden.', icon: 'Columns3' },
                { title: '2. Zeilen', text: 'Eine Zeile je Anweisung bzw. Schleifendurchlauf – Startwerte in die erste Zeile.', icon: 'Rows3' },
                { title: '3. Ausführen', text: 'Stur Zeile für Zeile rechnen, immer mit dem aktuellen Wert. Am Ende das Ergebnis ablesen.', icon: 'Play' },
              ],
            },
          },
          caption: 'Wer sauber Buch führt, macht keine Flüchtigkeitsfehler – und bekommt in der Prüfung Teilpunkte für den Weg.',
        },
        {
          type: 'example',
          title: 'Schreibtischtest einer Sequenz',
          problem: `Welche Werte haben \`preis\`, \`rabatt\` und \`zahlbetrag\` am Ende?\n\n${F}\npreis ← 80\nrabatt ← preis DIV 10\npreis ← preis - rabatt\nrabatt ← rabatt * 2\nzahlbetrag ← preis + rabatt MOD 3\n${F}`,
          steps: [
            { label: 'Zeilen 1–2', body: 'preis = 80 · rabatt = 80 DIV 10 = 8' },
            { label: 'Zeile 3', body: 'preis = 80 − 8 = 72 (ab jetzt gilt 72!)' },
            { label: 'Zeile 4', body: 'rabatt = 8 · 2 = 16' },
            { label: 'Zeile 5', body: 'MOD vor +: 16 MOD 3 = 1 → zahlbetrag = 72 + 1 = 73' },
            { label: 'Trace-Tabelle', body: '| Zeile | preis | rabatt | zahlbetrag |\n|---|---|---|---|\n| 1 | 80 | – | – |\n| 2 | 80 | 8 | – |\n| 3 | 72 | 8 | – |\n| 4 | 72 | 16 | – |\n| 5 | 72 | 16 | 73 |' },
          ],
          result: 'preis = 72, rabatt = 16, zahlbetrag = 73',
        },
        {
          type: 'check',
          question: {
            id: 'p02-c01', kind: 'number', skill: 'prog.trace', difficulty: 1,
            prompt: `Welchen Wert hat \`c\` am Ende?\n\n${F}\na ← 6\nb ← a + 4\nc ← b - a\na ← c * b\nc ← a - c\n${F}`,
            answer: 36,
            hints: ['Notiere nach jeder Zeile a, b und c.'],
            misconceptions: [{ answer: '4', error: 'zuweisung-reihenfolge', why: 'c wird in der letzten Zeile noch einmal überschrieben: a − c = 40 − 4.' }],
            explanation: '| Zeile | a | b | c |\n|---|---|---|---|\n| 1 | 6 | – | – |\n| 2 | 6 | 10 | – |\n| 3 | 6 | 10 | 4 |\n| 4 | 40 | 10 | 4 |\n| 5 | 40 | 10 | **36** |',
          },
        },
        { type: 'practice', title: 'Übung: Schreibtischtest', questionIds: ['p02-q001', 'p02-q026', 'p02-q019'], count: 3, difficulty: 2 },
        { type: 'summary', points: ['Sequenz: von oben nach unten, jede Anweisung einmal.', 'Trace-Tabelle: Spalte je Variable, Zeile je Schritt.', 'Immer mit dem aktuellen Wert rechnen.'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p02-l02',
      title: 'Verzweigungen: WENN … DANN … SONST',
      minutes: 20,
      relevance: 'ap1',
      skills: ['prog.branch'],
      simple: `Eine Verzweigung ist wie eine Ampel: Bei Grün fährst du los, sonst bleibst du stehen. Das Programm prüft eine Bedingung (eine Frage, die WAHR oder FALSCH ergibt) und wählt danach einen von zwei Wegen. Ist die Bedingung WAHR, läuft der DANN-Zweig, ist sie FALSCH, der SONST-Zweig. Der SONST-Zweig darf auch fehlen – dann passiert bei FALSCH einfach nichts.

**Merke:** WENN Bedingung DANN … SONST … ENDE WENN – es läuft immer höchstens ein Zweig.`,
      steps: [
        {
          type: 'explain',
          title: 'Entscheidungen im Programm',
          body: `Eine **Verzweigung (Selektion)** führt abhängig von einer **Bedingung** unterschiedliche Anweisungen aus.

**Einseitige Verzweigung** – nur etwas tun, wenn die Bedingung WAHR ist:

${F}
WENN lagerbestand < 10 DANN
  AUSGABE "Bitte nachbestellen"
ENDE WENN
${F}

**Zweiseitige Verzweigung** – genau einer von zwei Zweigen wird ausgeführt:

${F}
WENN zahl MOD 2 = 0 DANN
  AUSGABE "gerade"
SONST
  AUSGABE "ungerade"
ENDE WENN
${F}

**Verschachtelte Verzweigung** – innerhalb eines Zweiges wird erneut entschieden:

${F}
WENN istMitarbeiter = WAHR DANN
  WENN dienstjahre ≥ 5 DANN
    rabatt ← 15
  SONST
    rabatt ← 10
  ENDE WENN
SONST
  rabatt ← 0
ENDE WENN
${F}

**Worauf es ankommt:**
- **Grenzwerte genau übersetzen:** „ab 100 €“ → \`≥ 100\` · „über 100 €“ → \`> 100\` · „bis 100 €“ → \`≤ 100\` · „unter 100 €“ → \`< 100\`.
- **Einrückung** zeigt, welches SONST zu welchem WENN gehört.
- Nach einer Verzweigung geht es **nach ENDE WENN** weiter – egal welcher Zweig lief.
- Mehrere **unabhängige** WENN-Blöcke hintereinander werden **alle** geprüft (im Gegensatz zur SONST-WENN-Kette, nächste Lektion).

**In echten Sprachen:**

| Pseudocode | Python | Java / C# |
|---|---|---|
| \`WENN a > b DANN … SONST … ENDE WENN\` | \`if a > b:\` … \`else:\` … (Einrückung!) | \`if (a > b) { … } else { … }\` |`,
        },
        {
          type: 'visual',
          title: 'Formen der Verzweigung',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'einseitig', text: 'WENN … DANN … ENDE WENN – ist die Bedingung FALSCH, passiert nichts.', icon: 'CornerDownRight' },
                { title: 'zweiseitig', text: 'WENN … DANN … SONST … ENDE WENN – genau einer der beiden Zweige läuft.', icon: 'Split' },
                { title: 'verschachtelt', text: 'Ein WENN im Zweig eines anderen WENN – von außen nach innen auswerten.', icon: 'Layers' },
              ],
            },
          },
          caption: 'Im UML-Aktivitätsdiagramm entspricht eine Verzweigung einer Raute mit beschrifteten Kanten [Bedingung].',
        },
        {
          type: 'example',
          title: 'Verschachtelte Verzweigung durchspielen',
          problem: `Für eine Bestellung gilt der folgende Algorithmus. Welcher Wert wird für **bestellwert = 120** und **neukunde = WAHR** ausgegeben?\n\n${F}\nbestellwert ← 120\nneukunde ← WAHR\nversand ← 5\nWENN bestellwert ≥ 100 DANN\n  versand ← 0\nSONST\n  WENN neukunde = WAHR DANN\n    versand ← 2\n  ENDE WENN\nENDE WENN\nWENN neukunde = WAHR DANN\n  bestellwert ← bestellwert - 10\nENDE WENN\nAUSGABE bestellwert + versand\n${F}`,
          steps: [
            { label: 'Erste Verzweigung', body: '120 ≥ 100 → WAHR → versand = 0. Der SONST-Zweig (mit dem inneren WENN) wird **übersprungen**.' },
            { label: 'Zweite, unabhängige Verzweigung', body: 'neukunde = WAHR → WAHR → bestellwert = 120 − 10 = 110.' },
            { label: 'Ausgabe', body: '110 + 0 = **110**' },
          ],
          result: '110',
        },
        {
          type: 'check',
          question: {
            id: 'p02-c02', kind: 'number', skill: 'prog.branch', difficulty: 2,
            prompt: `Welchen Wert gibt der Algorithmus aus?\n\n${F}\nx ← 15\ny ← 4\nWENN x > 10 UND y > 5 DANN\n  z ← x - y\nSONST\n  WENN x > 10 DANN\n    z ← x + y\n  SONST\n    z ← 0\n  ENDE WENN\nENDE WENN\nAUSGABE z\n${F}`,
            answer: 19,
            hints: ['y > 5 ist FALSCH – damit ist die ganze UND-Bedingung FALSCH.'],
            misconceptions: [{ answer: '11', error: 'logik-und', why: 'Für den DANN-Zweig müssen **beide** Bedingungen WAHR sein; 4 > 5 ist FALSCH.' }],
            explanation: '1. x > 10 → WAHR, y > 5 → FALSCH → UND = FALSCH → äußeres SONST\n2. x > 10 → WAHR → z = 15 + 4 = **19**',
          },
        },
        { type: 'practice', title: 'Übung: Verzweigungen (Generator)', generator: 'p.trace.branch', count: 4, difficulty: 1 },
        { type: 'practice', title: 'Übung: Verzweigungen aus dem Pool', questionIds: ['p02-q002', 'p02-q003', 'p02-q005', 'p02-q006', 'p02-q027', 'p02-q029'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Einseitig: nur DANN · zweiseitig: DANN und SONST.', 'Grenzwerte: ab = ≥, über = >, bis = ≤, unter = <.', 'Verschachtelt: von außen nach innen, SONST gehört zum passenden WENN.', 'Unabhängige WENN-Blöcke werden alle geprüft.'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p02-l03',
      title: 'Mehrfachauswahl: SONST WENN und FALLS',
      minutes: 15,
      relevance: 'ap1',
      skills: ['prog.switch'],
      simple: `Bei mehr als zwei Möglichkeiten arbeitest du mit SONST WENN – wie mit einem Sieb aus mehreren Lagen: Die erste Bedingung, die passt, gewinnt, alle weiteren werden gar nicht mehr geprüft. Deshalb kommt es auf die Reihenfolge an: Prüfe zum Beispiel „≥ 1000“ vor „≥ 500“. FALLS (Mehrfachauswahl) ist wie die Tasten im Fahrstuhl: Jeder feste Wert führt direkt zu seinem Stockwerk, und SONST fängt alles andere ab.

**Merke:** SONST WENN für Bereiche (Reihenfolge beachten), FALLS für feste Einzelwerte.`,
      steps: [
        {
          type: 'explain',
          title: 'Mehr als zwei Fälle',
          body: `Gibt es **mehr als zwei** Möglichkeiten, hast du zwei Werkzeuge:

**1. SONST-WENN-Kette** – für **Bereiche** und beliebige Bedingungen:

${F}
WENN punkte ≥ 92 DANN
  note ← 1
SONST WENN punkte ≥ 81 DANN
  note ← 2
SONST WENN punkte ≥ 67 DANN
  note ← 3
SONST WENN punkte ≥ 50 DANN
  note ← 4
SONST WENN punkte ≥ 30 DANN
  note ← 5
SONST
  note ← 6
ENDE WENN
${F}

Die Bedingungen werden **von oben nach unten** geprüft. Der **erste** WAHR-Zweig wird ausgeführt, alle weiteren werden übersprungen. Darum reicht bei Note 2 die Bedingung \`punkte ≥ 81\` – dass die Punkte unter 92 liegen, ist durch die Reihenfolge schon sichergestellt. (Die Grenzen entsprechen dem IHK-Notenschlüssel: 100–92 = 1, unter 92–81 = 2, unter 81–67 = 3, unter 67–50 = 4, unter 50–30 = 5, unter 30 = 6.)

⚠️ Die **Reihenfolge** ist entscheidend: Stünde \`punkte ≥ 30\` ganz oben, bekäme jeder ab 30 Punkten die Note 5.

**2. Mehrfachauswahl FALLS** (switch/case) – für **einzelne, feste Werte** einer Variablen:

${F}
FALLS wochentag
  FALL 1, 2, 3, 4, 5:
    AUSGABE "Werktag"
  FALL 6:
    AUSGABE "Samstag"
  FALL 7:
    AUSGABE "Sonntag"
  SONST:
    AUSGABE "ungültige Eingabe"
ENDE FALLS
${F}

Der \`SONST:\`-Zweig (in Java/C# \`default\`) fängt alle übrigen Werte ab – wichtig für **ungültige Eingaben**.

| Kriterium | SONST-WENN-Kette | FALLS (switch) |
|---|---|---|
| Bedingungen | beliebig, auch Bereiche (\`≥ 81\`) und Verknüpfungen | Vergleich einer Variablen mit festen Werten |
| Lesbarkeit bei vielen Einzelwerten | unübersichtlich | sehr übersichtlich |
| typische Anwendung | Notenschlüssel, Rabattstaffel | Menüauswahl, Wochentag, Statuscode |

**Achtung in Java/C (klassisches switch):** Ohne \`break\` am Ende eines \`case\` läuft das Programm in den nächsten Fall weiter (**fall-through**). In C# ist das bei Fällen mit Anweisungen ein Compilerfehler; Python kennt seit Version 3.10 \`match … case\`.`,
        },
        {
          type: 'visual',
          title: 'Kette vs. Mehrfachauswahl',
          widget: {
            kind: 'cards',
            data: {
              columns: 2,
              items: [
                { title: 'SONST-WENN-Kette', text: 'Prüft nacheinander – der erste Treffer gewinnt. Ideal für Bereiche wie Rabatt- oder Notenstaffeln.', icon: 'ListOrdered' },
                { title: 'FALLS (switch/case)', text: 'Springt direkt zum passenden festen Wert. Ideal für Menüs, Codes, Wochentage. SONST: für alles andere.', icon: 'LayoutList' },
              ],
            },
          },
          caption: 'Faustregel: Bereiche → SONST WENN · feste Einzelwerte → FALLS.',
        },
        {
          type: 'example',
          title: 'Rabattstaffel aus einem Beleg umsetzen',
          problem: `Laut Preisliste der Elektro Krämer GmbH gilt für Netzwerkkabel:\n\n| Bestellmenge | Stückpreis |\n|---|---|\n| bis 49 Stück | 4,00 € |\n| 50 bis 199 Stück | 3,50 € |\n| ab 200 Stück | 3,00 € |\n\nFormuliere die Preisermittlung als SONST-WENN-Kette und berechne den Gesamtpreis für **200 Stück**.`,
          steps: [
            { label: 'Von der höchsten Stufe aus prüfen', body: `${F}\nWENN menge ≥ 200 DANN\n  stueckpreis ← 3.00\nSONST WENN menge ≥ 50 DANN\n  stueckpreis ← 3.50\nSONST\n  stueckpreis ← 4.00\nENDE WENN\ngesamt ← menge * stueckpreis\n${F}` },
            { label: 'Mit 200 durchspielen', body: '200 ≥ 200 → **WAHR** → stueckpreis = 3,00 → die weiteren Zweige werden übersprungen.' },
            { label: 'Gesamtpreis', body: '200 · 3,00 € = **600,00 €**' },
          ],
          result: '600,00 € (genau an der Grenze gilt schon der günstigere Preis)',
        },
        {
          type: 'check',
          question: {
            id: 'p02-c03', kind: 'number', skill: 'prog.switch', difficulty: 2,
            prompt: `Welchen Wert gibt der Algorithmus aus?\n\n${F}\nmonat ← 4\nFALLS monat\n  FALL 2:\n    tage ← 28\n  FALL 4, 6, 9, 11:\n    tage ← 30\n  SONST:\n    tage ← 31\nENDE FALLS\nAUSGABE tage\n${F}`,
            answer: 30,
            explanation: 'monat = 4 passt zu `FALL 4, 6, 9, 11:` → tage = **30**. (Schaltjahre werden hier vereinfacht nicht berücksichtigt.)',
          },
        },
        { type: 'practice', title: 'Übung: Mehrfachauswahl', questionIds: ['p02-q004', 'p02-q007', 'p02-q008', 'p02-q009', 'p02-q028', 'p02-q033'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['SONST-WENN-Kette: erster WAHR-Zweig gewinnt – Reihenfolge beachten.', 'FALLS: feste Einzelwerte, SONST: fängt den Rest ab.', 'Java/C: break nicht vergessen (fall-through).'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p02-l04',
      title: 'Die Zählschleife: FÜR … VON … BIS',
      minutes: 20,
      relevance: 'ap1',
      skills: ['prog.loops', 'prog.trace'],
      simple: `Die Zählschleife ist wie eine Treppe mit bekannter Stufenzahl: Du weißt vorher genau, wie oft du hochsteigst. FÜR i VON 1 BIS 5 läuft fünfmal, und die Zählvariable i (der Stufenzähler) zählt dabei automatisch mit. In dieser App ist der Endwert eingeschlossen – BIS 5 heißt also auch noch mit 5. Vorsicht beim Übersetzen: In Python schließt range(1, 6) die 6 aus, und eine Bedingung „i < 10“ bedeutet BIS 9, nicht BIS 10.

**Merke:** Anzahl Durchläufe = Endwert − Startwert + 1 (bei Schrittweite 1).`,
      steps: [
        {
          type: 'explain',
          title: 'Wenn die Anzahl der Durchläufe vorher feststeht',
          body: `Eine **Zählschleife** wiederholt einen Block für eine **vorher bekannte Anzahl** von Durchläufen. Eine **Laufvariable** (Zähler) wird automatisch hochgezählt:

${F}
summe ← 0
FÜR i VON 1 BIS 5
  summe ← summe + i
ENDE FÜR
AUSGABE summe          // 15
${F}

**Regeln in unserem Pseudocode:**
- Start- **und** Endwert gehören dazu: \`FÜR i VON 1 BIS 5\` läuft mit i = 1, 2, 3, 4, 5 → **5 Durchläufe**.
- Anzahl Durchläufe = **Endwert − Startwert + 1** (bei Schrittweite 1).
- Mit \`SCHRITT\` lässt sich die Schrittweite ändern: \`FÜR i VON 10 BIS 0 SCHRITT -2\` → 10, 8, 6, 4, 2, 0.
- Ist der Startwert schon größer als der Endwert (bei positiver Schrittweite), läuft die Schleife **gar nicht**.
- Die Laufvariable soll im Rumpf **nicht** verändert werden.

**Akkumulator-Muster** – das brauchst du ständig:

| Zweck | Startwert | Anweisung im Rumpf |
|---|---|---|
| Summe | \`summe ← 0\` | \`summe ← summe + wert\` |
| Produkt | \`produkt ← 1\` | \`produkt ← produkt * wert\` |
| Zähler | \`anzahl ← 0\` | \`anzahl ← anzahl + 1\` (ggf. in einem WENN) |

⚠️ Ein Produkt mit 0 zu starten ergibt immer 0 – typischer Fehler!

**In echten Sprachen:**

| Pseudocode | Python | Java / C# |
|---|---|---|
| \`FÜR i VON 1 BIS 5\` | \`for i in range(1, 6):\` (Ende **exklusiv**!) | \`for (int i = 1; i <= 5; i++)\` |
| \`FÜR i VON 0 BIS n - 1\` | \`for i in range(n):\` | \`for (int i = 0; i < n; i++)\` |

⚠️ **Grenze beim Übersetzen:** \`for (int i = 0; i < 10; i++)\` läuft mit i = 0 … 9, also **10-mal**. In unserem Pseudocode heißt das \`FÜR i VON 0 BIS 9\` – **nicht** „BIS 10“ (das wären 11 Durchläufe). Ebenso: \`range(0, 10)\` in Python endet bei 9. Merke: \`< 10\` → Endwert 9, \`≤ 10\` → Endwert 10. Manche Lösungsbücher übersetzen \`< 10\` ungenau mit „BIS 10“ – rechne die Durchläufe immer nach.

**Verschachtelte Schleifen:** Läuft eine Schleife mit a Durchläufen eine innere mit b Durchläufen, wird der innere Rumpf a · b-mal ausgeführt (sofern die innere Schleife nicht von der äußeren Laufvariable abhängt).`,
        },
        {
          type: 'visual',
          title: 'Ablauf einer Zählschleife',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: '1. Initialisieren', text: 'Die Laufvariable bekommt den Startwert (i ← 1).', icon: 'Play' },
                { title: '2. Prüfen', text: 'Ist i noch ≤ Endwert? Nein → Schleife verlassen.', icon: 'HelpCircle' },
                { title: '3. Rumpf', text: 'Die Anweisungen im Schleifenrumpf werden ausgeführt.', icon: 'Cog' },
                { title: '4. Weiterzählen', text: 'i ← i + Schrittweite, dann zurück zu Schritt 2.', icon: 'RotateCw' },
              ],
            },
          },
          caption: 'Eine Zählschleife ist eine kopfgesteuerte Schleife, bei der Initialisierung und Weiterzählen automatisch passieren.',
        },
        {
          type: 'example',
          title: 'Zählschleife mit Bedingung im Rumpf',
          problem: `Welche Werte haben \`summe\` und \`anzahl\` am Ende?\n\n${F}\nsumme ← 0\nanzahl ← 0\nFÜR i VON 1 BIS 7\n  WENN i MOD 3 = 0 DANN\n    summe ← summe + i\n  SONST\n    anzahl ← anzahl + 1\n  ENDE WENN\nENDE FÜR\n${F}`,
          steps: [
            { label: 'Trace-Tabelle', body: '| i | i MOD 3 | = 0? | summe | anzahl |\n|---|---|---|---|---|\n| 1 | 1 | FALSCH | 0 | 1 |\n| 2 | 2 | FALSCH | 0 | 2 |\n| 3 | 0 | WAHR | 3 | 2 |\n| 4 | 1 | FALSCH | 3 | 3 |\n| 5 | 2 | FALSCH | 3 | 4 |\n| 6 | 0 | WAHR | 9 | 4 |\n| 7 | 1 | FALSCH | 9 | 5 |' },
            { label: 'Deuten', body: 'summe addiert die durch 3 teilbaren Zahlen (3 + 6), anzahl zählt die übrigen (5 Stück). Zusammen sind es 7 Durchläufe.' },
          ],
          result: 'summe = 9, anzahl = 5',
        },
        {
          type: 'check',
          question: {
            id: 'p02-c04', kind: 'number', skill: 'prog.loops', difficulty: 1,
            prompt: `Wie oft wird \`AUSGABE i\` ausgeführt?\n\n${F}\nFÜR i VON 3 BIS 12\n  AUSGABE i\nENDE FÜR\n${F}`,
            answer: 10,
            misconceptions: [{ answer: '9', error: 'schleife-off-by-one', why: '12 − 3 = 9 vergisst einen Wert – Start und Ende zählen beide: 12 − 3 + 1 = 10.' }, { answer: '12', error: 'schleife-off-by-one', why: 'Die Schleife beginnt bei 3, nicht bei 1.' }],
            explanation: 'i = 3, 4, …, 12 → 12 − 3 + 1 = **10** Durchläufe.',
          },
        },
        { type: 'practice', title: 'Übung: Schleifen-Trace (Generator)', generator: 'p.trace.loop', count: 5, difficulty: 1 },
        { type: 'practice', title: 'Übung: Zählschleifen aus dem Pool', questionIds: ['p02-q010', 'p02-q011', 'p02-q019', 'p02-q020', 'p02-q021', 'p02-q032', 'p02-q039', 'p02-q040'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['FÜR i VON a BIS b: a und b inklusive → b − a + 1 Durchläufe.', 'Summe startet bei 0, Produkt bei 1.', 'SCHRITT -k zählt rückwärts.', 'Python range(a, b) schließt b aus!'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p02-l05',
      title: 'SOLANGE und WIEDERHOLE … BIS: kopf- und fußgesteuert',
      minutes: 20,
      relevance: 'ap1',
      skills: ['prog.loops', 'prog.trace'],
      simple: `Die kopfgesteuerte Schleife (SOLANGE) ist wie ein Türsteher: Er prüft vor dem Eintritt – passt die Bedingung nicht, kommst du gar nicht erst hinein (null Durchläufe möglich). Die fußgesteuerte Schleife (WIEDERHOLE … BIS) ist wie eine Kostprobe: Erst probierst du, dann entscheidest du – sie läuft also mindestens einmal. Bei SOLANGE steht eine Laufbedingung (weiter, solange WAHR), bei BIS eine Abbruchbedingung (Schluss, sobald WAHR). Achte darauf, dass sich in der Schleife etwas ändert, sonst läuft sie endlos (Endlosschleife).

**Merke:** SOLANGE prüft vorne (0-mal möglich), WIEDERHOLE … BIS prüft hinten (mindestens 1-mal).`,
      steps: [
        {
          type: 'explain',
          title: 'Wenn die Anzahl der Durchläufe vorher nicht feststeht',
          body: `**Kopfgesteuerte Schleife** (abweisende Schleife, *while*): Die Bedingung wird **vor** jedem Durchlauf geprüft. Ist sie gleich zu Beginn FALSCH, läuft der Rumpf **kein einziges Mal**.

${F}
SOLANGE kontostand < ziel TUE
  kontostand ← kontostand + sparrate
  monate ← monate + 1
ENDE SOLANGE
${F}

**Fußgesteuerte Schleife** (nicht abweisende Schleife, *do … while* / *repeat … until*): Der Rumpf läuft **mindestens einmal**, die Bedingung wird **danach** geprüft.

${F}
WIEDERHOLE
  EINGABE pin
BIS pin = 1234 ODER versuche = 3
${F}

⚠️ **Bedeutung der Bedingung beachten:**
- \`SOLANGE bedingung TUE\` → läuft, **solange** die Bedingung WAHR ist (Laufbedingung).
- \`WIEDERHOLE … BIS bedingung\` → läuft, **bis** die Bedingung WAHR ist (Abbruchbedingung).
- In Java/C# ist die fußgesteuerte Schleife \`do { … } while (bedingung);\` – dort ist die Bedingung wieder eine **Lauf**bedingung! Python hat keine eingebaute fußgesteuerte Schleife (man nutzt \`while True:\` mit \`break\`).

📘 **Andere Schreibweise in Schulbüchern und Prüfungen:** Manche Bücher schreiben die fußgesteuerte Schleife als \`Wiederhole … solange bedingung\`. Dann ist die Bedingung eine **Laufbedingung** (wie bei \`do … while\`): Die Schleife läuft weiter, **solange** sie WAHR ist. Beide Formen lassen sich ineinander umrechnen, indem man die Bedingung **verneint**:

| Schulbuch-Schreibweise | gleichbedeutend in dieser App |
|---|---|
| \`Wiederhole … solange versuche < 3\` | \`WIEDERHOLE … BIS versuche ≥ 3\` |
| \`Wiederhole … solange eingabe ≠ 0\` | \`WIEDERHOLE … BIS eingabe = 0\` |

Lies in der Prüfung immer genau, **welches Wort** vor der Bedingung steht: **BIS** = Abbruchbedingung, **SOLANGE** = Laufbedingung – egal, ob oben oder unten.

**Python-Entsprechung** (die Schule arbeitet mit Python):

${F}python
# kopfgesteuert: SOLANGE kontostand < ziel TUE
while kontostand < ziel:
    kontostand = kontostand + sparrate
    monate = monate + 1

# fußgesteuert: WIEDERHOLE … BIS pin = 1234 ODER versuche = 3
while True:
    pin = int(input("PIN: "))
    versuche = versuche + 1
    if pin == 1234 or versuche == 3:   # Abbruchbedingung → break
        break
${F}

| | kopfgesteuert (SOLANGE) | fußgesteuert (WIEDERHOLE … BIS) | Zählschleife (FÜR) |
|---|---|---|---|
| Prüfung | vor dem Durchlauf | nach dem Durchlauf | vor dem Durchlauf |
| Mindestanzahl Durchläufe | 0 | **1** | 0 |
| typisch für | unbekannte Anzahl, evtl. gar nicht nötig | Benutzereingabe, die geprüft werden muss | bekannte Anzahl, Arrays durchlaufen |

**Endlosschleife:** Wird die Bedingung nie FALSCH (bzw. bei BIS nie WAHR), endet die Schleife nicht – das Programm „hängt“. Häufigste Ursache: Die Variable aus der Bedingung wird im Rumpf **nicht verändert**.

${F}
i ← 1
SOLANGE i ≤ 10 TUE
  summe ← summe + i
  // FEHLER: i ← i + 1 fehlt → Endlosschleife
ENDE SOLANGE
${F}`,
        },
        {
          type: 'visual',
          title: 'Kopf- vs. fußgesteuert',
          widget: {
            kind: 'cards',
            data: {
              columns: 2,
              items: [
                { title: 'kopfgesteuert: erst prüfen, dann handeln', text: 'Wie ein Türsteher: Wer die Bedingung nicht erfüllt, kommt gar nicht erst hinein. 0 bis n Durchläufe.', icon: 'ShieldCheck' },
                { title: 'fußgesteuert: erst handeln, dann prüfen', text: 'Wie eine Kostprobe: Erst probieren, dann entscheiden, ob es weitergeht. 1 bis n Durchläufe.', icon: 'RotateCcw' },
              ],
            },
          },
          caption: 'In der Prüfung oft gefragt: „Wie oft wird der Rumpf mindestens ausgeführt?“ – kopfgesteuert 0-mal, fußgesteuert 1-mal.',
        },
        {
          type: 'example',
          title: 'Der Unterschied mit denselben Startwerten',
          problem: `Vergleiche beide Varianten mit x = 50:\n\n${F}\n// Variante A\nx ← 50\nSOLANGE x ≤ 20 TUE\n  x ← x + 10\nENDE SOLANGE\n\n// Variante B\nx ← 50\nWIEDERHOLE\n  x ← x + 10\nBIS x > 20\n${F}`,
          steps: [
            { label: 'Variante A (kopfgesteuert)', body: 'Prüfung vor dem 1. Durchlauf: 50 ≤ 20 → FALSCH → der Rumpf wird **nie** ausgeführt. x bleibt **50**.' },
            { label: 'Variante B (fußgesteuert)', body: '1. Durchlauf: x = 60. Prüfung danach: 60 > 20 → WAHR → Ende. x = **60**.' },
            { label: 'Fazit', body: 'Inhaltlich „gleiche“ Schleifen liefern unterschiedliche Ergebnisse, wenn die Bedingung schon zu Beginn nicht erfüllt ist.' },
          ],
          result: 'A: x = 50 · B: x = 60',
        },
        {
          type: 'check',
          question: {
            id: 'p02-c05', kind: 'number', skill: 'prog.loops', difficulty: 2,
            prompt: `Welchen Wert hat \`z\` am Ende?\n\n${F}\nx ← 100\nz ← 0\nSOLANGE x > 1 TUE\n  x ← x DIV 2\n  z ← z + 1\nENDE SOLANGE\n${F}`,
            answer: 6,
            hints: ['Notiere x nach jedem Durchlauf: 50, 25, …', 'DIV schneidet ab: 25 DIV 2 = 12.'],
            misconceptions: [{ answer: '7', error: 'schleife-off-by-one', why: 'Bei x = 1 ist x > 1 FALSCH – es folgt kein weiterer Durchlauf.' }, { answer: '5', error: 'schleife-off-by-one', why: 'Der Durchlauf von 3 auf 1 zählt noch mit.' }],
            explanation: '| Durchlauf | x | z |\n|---|---|---|\n| Start | 100 | 0 |\n| 1 | 50 | 1 |\n| 2 | 25 | 2 |\n| 3 | 12 | 3 |\n| 4 | 6 | 4 |\n| 5 | 3 | 5 |\n| 6 | 1 | **6** |\n\n1 > 1 ist FALSCH → Ende.',
          },
        },
        { type: 'practice', title: 'Übung: SOLANGE / WIEDERHOLE (Generator, anspruchsvoll)', generator: 'p.trace.loop', count: 4, difficulty: 3 },
        { type: 'practice', title: 'Übung: Schleifenarten aus dem Pool', questionIds: ['p02-q012', 'p02-q013', 'p02-q014', 'p02-q015', 'p02-q016', 'p02-q017', 'p02-q018', 'p02-q022', 'p02-q030', 'p02-q031', 'p02-q034', 'p02-q038', 'p02-q041'], count: 6, difficulty: 2 },
        { type: 'summary', points: ['SOLANGE: Bedingung vorher, 0 … n Durchläufe, Laufbedingung.', 'WIEDERHOLE … BIS: Bedingung nachher, mindestens 1 Durchlauf, Abbruchbedingung.', 'Endlosschleife: Bedingungsvariable wird im Rumpf nicht verändert.'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p02-l06',
      title: 'Prüfungsaufgabe: Algorithmen selbst formulieren',
      minutes: 25,
      relevance: 'ap1',
      skills: ['prog.writecode'],
      simple: `Einen Algorithmus selbst zu formulieren ist wie ein Rezept für jemanden schreiben, der noch nie gekocht hat. Kläre zuerst, was hineinkommt (Eingabe), was herauskommen soll (Ausgabe) und welche Regeln dazwischen gelten (Verarbeitung). Dann wählst du die passenden Bausteine: Verzweigung für Entscheidungen, Schleife für Wiederholungen. Zum Schluss spielst du deinen Pseudocode mit einem Beispiel durch (Schreibtischtest) – auch mit Grenzwerten wie genau 0 oder genau 100.

**Merke:** Erst EVA klären, dann Bausteine wählen, dann mit Beispielen testen.`,
      steps: [
        {
          type: 'explain',
          title: 'Vom Auftrag zum vollständigen Pseudocode',
          body: `In der AP1 kann es heißen: *„Erstellen Sie für den beschriebenen Ablauf einen Algorithmus in Pseudocode.“* So gehst du vor:

1. **Anforderung zerlegen:** Was wird eingegeben? Was soll herauskommen? Welche Sonderfälle gibt es (ungültige Eingaben, Grenzwerte)?
2. **Variablen festlegen** – mit sprechenden Namen und sinnvollen Startwerten (Summe 0, Zähler 0, Maximum = erstes Element).
3. **Kontrollstrukturen wählen:**
   - feste Anzahl → \`FÜR\`
   - „solange …“ / unbekannte Anzahl → \`SOLANGE\`
   - Eingabe, die mindestens einmal abgefragt und dann geprüft wird → \`WIEDERHOLE … BIS\`
   - Fälle unterscheiden → \`WENN\` / \`SONST WENN\` / \`FALLS\`
4. **Notieren** – eingerückt, jeden Block mit ENDE abschließen.
5. **Schreibtischtest** mit einem normalen Fall **und** einem Grenzfall.

**Bewertung in der Prüfung (typisch):** Punkte gibt es für korrekte Ein-/Ausgabe, richtige Schleifen-/Verzweigungslogik, korrekte Bedingungen (Grenzwerte!), Initialisierung der Variablen und Vollständigkeit. Syntax-Details einer bestimmten Sprache sind **nicht** gefordert – Eindeutigkeit schon.

**Muster „Eingabe validieren“:**

${F}
WIEDERHOLE
  EINGABE menge
  WENN menge < 1 ODER menge > 99 DANN
    AUSGABE "Bitte eine Menge von 1 bis 99 eingeben"
  ENDE WENN
BIS menge ≥ 1 UND menge ≤ 99
${F}

**Muster „Eingaben bis zu einem Endwert (Sentinel)“:**

${F}
summe ← 0
anzahl ← 0
EINGABE wert
SOLANGE wert ≠ 0 TUE
  summe ← summe + wert
  anzahl ← anzahl + 1
  EINGABE wert
ENDE SOLANGE
WENN anzahl > 0 DANN
  AUSGABE summe / anzahl
SONST
  AUSGABE "Keine Werte eingegeben"
ENDE WENN
${F}

Beachte die **Division durch 0**: Ohne die Prüfung \`anzahl > 0\` würde das Programm bei sofortiger Eingabe von 0 abstürzen.`,
        },
        {
          type: 'visual',
          title: 'Welche Struktur passt?',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: '„für jeden …“, „10-mal“', text: 'FÜR-Schleife (Anzahl bekannt).', icon: 'Repeat' },
                { title: '„solange …“', text: 'SOLANGE … TUE (evtl. 0 Durchläufe).', icon: 'RefreshCw' },
                { title: '„… bis die Eingabe gültig ist“', text: 'WIEDERHOLE … BIS (mindestens 1 Durchlauf).', icon: 'RotateCcw' },
                { title: '„falls …, sonst …“', text: 'WENN / SONST WENN / FALLS.', icon: 'GitBranch' },
              ],
            },
          },
          caption: 'Signalwörter im Aufgabentext verraten oft schon die passende Kontrollstruktur.',
        },
        {
          type: 'example',
          title: 'Login mit maximal drei Versuchen',
          problem: 'Für das Intranet der Elektro Krämer GmbH soll ein Login entworfen werden: Der Benutzer gibt seine PIN ein. Ist sie korrekt (gespeichert in `pinGespeichert`), wird „Anmeldung erfolgreich“ ausgegeben. Nach **drei** Fehlversuchen wird das Konto gesperrt und „Konto gesperrt“ ausgegeben. Formuliere den Algorithmus in Pseudocode.',
          steps: [
            { label: 'Analyse', body: 'Eingabe: PIN (mindestens einmal) → fußgesteuerte Schleife. Abbruch, wenn PIN korrekt **oder** 3 Versuche verbraucht. Danach unterscheiden, **warum** die Schleife endete.' },
            { label: 'Variablen', body: '`versuche ← 0`, `erfolgreich ← FALSCH`' },
            { label: 'Pseudocode', body: `${F}\nversuche ← 0\nerfolgreich ← FALSCH\nWIEDERHOLE\n  EINGABE pin\n  versuche ← versuche + 1\n  WENN pin = pinGespeichert DANN\n    erfolgreich ← WAHR\n  SONST\n    AUSGABE "PIN falsch"\n  ENDE WENN\nBIS erfolgreich = WAHR ODER versuche = 3\nWENN erfolgreich = WAHR DANN\n  AUSGABE "Anmeldung erfolgreich"\nSONST\n  AUSGABE "Konto gesperrt"\nENDE WENN\n${F}` },
            { label: 'Schreibtischtest', body: 'pinGespeichert = 4711, Eingaben 1111, 4711: Versuch 1 falsch, Versuch 2 richtig → erfolgreich = WAHR → Schleife endet → „Anmeldung erfolgreich“.\nEingaben 1, 2, 3: nach dem 3. Versuch versuche = 3 → Ende → „Konto gesperrt“.' },
          ],
          result: 'Fußgesteuerte Schleife mit ODER-Abbruchbedingung + anschließende Auswertung.',
        },
        {
          type: 'check',
          question: {
            id: 'p02-c06', kind: 'order', skill: 'prog.writecode', difficulty: 2,
            prompt: 'Bringe die Pseudocode-Zeilen in die richtige Reihenfolge, damit der Algorithmus die **Summe der Zahlen 1 bis n** berechnet und ausgibt.',
            items: ['EINGABE n', 'summe ← 0', 'FÜR i VON 1 BIS n', '  summe ← summe + i', 'ENDE FÜR', 'AUSGABE summe'],
            explanation: 'Erst Eingabe und Initialisierung, dann die Schleife mit dem Akkumulator, nach der Schleife die Ausgabe (sonst würde jede Zwischensumme ausgegeben).',
          },
        },
        { type: 'practice', title: 'Übung: Algorithmen formulieren', questionIds: ['p02-q023', 'p02-q024', 'p02-q025'], count: 3, difficulty: 2 },
        { type: 'summary', points: ['Erst analysieren (EVA, Sonderfälle), dann Struktur wählen, dann notieren.', 'Startwerte nicht vergessen, Grenzwerte exakt übersetzen.', 'Division durch 0 und ungültige Eingaben abfangen.', 'Zum Schluss Schreibtischtest mit Normal- und Grenzfall.'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p02-l07',
      title: 'Entscheidungstabellen: alle Fälle auf einen Blick',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['prog.dectable'],
      simple: `Eine Entscheidungstabelle ist wie eine Rabatt-Übersicht im Laden: Oben stehen die Fragen (Bedingungen, z. B. „Stammkunde?“, „über 100 €?“), in den Spalten alle möglichen J/N-Kombinationen (Regeln) und unten, was dann passiert (Aktionen, angekreuzt mit X). So vergisst du keinen Fall. Bei n Bedingungen mit Ja/Nein gibt es 2ⁿ Regeln – bei 3 Bedingungen also 8. Regeln mit gleicher Aktion kannst du später zusammenfassen (konsolidieren), indem du „–“ für „egal“ einträgst.

**Merke:** n Bedingungen → 2ⁿ Regeln; oben Bedingungen, unten Aktionen.`,
      steps: [
        {
          type: 'explain',
          title: 'Bedingungen oben, Aktionen unten, jede Spalte eine Regel',
          body: `Wenn mehrere Bedingungen zusammenspielen, verliert man in verschachtelten WENN-Blöcken schnell den Überblick. Eine **Entscheidungstabelle** (genormt in DIN 66241) schreibt **alle Kombinationen** systematisch auf – so wird kein Fall vergessen.

**Aufbau (vier Bereiche):**

| | Regel R1 | R2 | R3 | R4 |
|---|---|---|---|---|
| **Bedingungen** (B1, B2 …) – Fragen mit Ja/Nein | J / N | … | … | … |
| **Aktionen** (A1, A2 …) – was getan wird | X / – | … | … | … |

- Oben links stehen die **Bedingungen**, oben rechts je Regel ihr Wert: **J** (trifft zu) oder **N** (trifft nicht zu).
- Unten links stehen die **Aktionen**, unten rechts ein **X**, wenn die Aktion bei dieser Regel ausgeführt wird, sonst **–**.
- Jede **Spalte** ist eine **Regel** = eine bestimmte J/N-Kombination.

**Anzahl der Regeln:** Jede Bedingung hat 2 Werte, jede weitere Bedingung **verdoppelt** die Kombinationen. Bei **n Bedingungen** hat die vollständige Tabelle **2ⁿ Regeln**: 2 Bedingungen → 4, 3 → 8, 4 → 16.

**Übliche Reihenfolge der Spalten:** Die erste Bedingung wechselt am langsamsten (bei 3 Bedingungen: R1 = JJJ, R2 = JJN, R3 = JNJ, R4 = JNN, R5 = NJJ … R8 = NNN). So lässt sich leicht prüfen, ob alle Kombinationen da sind.

**Konsolidieren (zusammenfassen):** Haben zwei Regeln **dieselben Aktionen** und unterscheiden sich nur in **einer** Bedingung, ist diese Bedingung für sie egal. Man fasst sie zu einer Regel zusammen und schreibt bei der Bedingung **–** („egal“, irrelevant).

**Wofür?**
- **Anforderungen klären:** Lücken („Was passiert eigentlich, wenn …?“) und Widersprüche (zwei Regeln für denselben Fall) fallen sofort auf.
- **Testfälle ableiten:** Jede Regel ist ein Testfall (Black-Box-Test, siehe Modul p05).
- **Programmieren:** Die Tabelle lässt sich direkt in WENN-Blöcke übersetzen.`,
        },
        {
          type: 'visual',
          title: 'So liest du eine Entscheidungstabelle',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: '1. Bedingungen', text: 'Ja/Nein-Fragen links oben, z. B. „Bestellwert ≥ 100 €?“', icon: 'HelpCircle' },
                { title: '2. Regeln', text: 'Jede Spalte ist eine J/N-Kombination. n Bedingungen → 2ⁿ Spalten.', icon: 'Columns3' },
                { title: '3. Aktionen', text: 'X = wird ausgeführt, – = wird nicht ausgeführt.', icon: 'ListChecks' },
                { title: '4. Konsolidieren', text: 'Gleiche Aktionen, nur eine Bedingung verschieden → zusammenfassen, Bedingung „–“.', icon: 'Merge' },
              ],
            },
          },
          caption: 'Eine vollständige Entscheidungstabelle ist zugleich eine Checkliste für den Test: jede Regel ein Testfall.',
        },
        {
          type: 'example',
          title: 'Leih-Laptops: von der Regel zum Pseudocode',
          problem: 'Die IT der Elektro Krämer GmbH gibt Leih-Laptops aus. Regel: Ein Laptop wird nur ausgegeben, wenn der Leihvertrag unterschrieben ist. Wird er außer Haus genutzt, wird zusätzlich ein VPN-Zugang eingerichtet. Ohne Vertrag wird die Ausgabe abgelehnt. Stelle die vollständige Entscheidungstabelle auf, konsolidiere sie und übersetze sie in Pseudocode.',
          steps: [
            { label: 'Bedingungen und Aktionen', body: 'B1: Leihvertrag unterschrieben · B2: Nutzung außer Haus\nA1: Laptop ausgeben · A2: VPN-Zugang einrichten · A3: Ausgabe ablehnen\n2 Bedingungen → 2² = **4 Regeln**.' },
            { label: 'Vollständige Tabelle', body: '| | R1 | R2 | R3 | R4 |\n|---|---|---|---|---|\n| B1 Vertrag unterschrieben | J | J | N | N |\n| B2 außer Haus | J | N | J | N |\n| A1 Laptop ausgeben | X | X | – | – |\n| A2 VPN einrichten | X | – | – | – |\n| A3 Ausgabe ablehnen | – | – | X | X |' },
            { label: 'Konsolidieren', body: 'R3 und R4 haben dieselben Aktionen (nur A3) und unterscheiden sich nur in B2 → B2 ist dort egal. Zusammengefasst: R3/4 mit B1 = N, B2 = **–**. Es bleiben **3 Regeln**.' },
            { label: 'Pseudocode', body: `${F}\nWENN vertragUnterschrieben = WAHR DANN\n  AUSGABE "Laptop ausgeben"\n  WENN ausserHaus = WAHR DANN\n    AUSGABE "VPN-Zugang einrichten"\n  ENDE WENN\nSONST\n  AUSGABE "Ausgabe ablehnen"\nENDE WENN\n${F}` },
          ],
          result: '4 Regeln, konsolidiert 3; im Code wird B2 nur im Fall „Vertrag unterschrieben“ geprüft.',
        },
        {
          type: 'check',
          question: {
            id: 'p02-c07', kind: 'number', skill: 'prog.dectable', difficulty: 1,
            prompt: 'Eine Rabattregel hängt von drei Bedingungen ab: **Bestellwert ≥ 500 €**, **Stammkunde** und **Zahlung per Vorkasse**. Wie viele Regeln hat die **vollständige** Entscheidungstabelle?',
            answer: 8,
            unit: 'Regeln',
            hints: ['Jede Bedingung kann J oder N sein – jede weitere Bedingung verdoppelt die Kombinationen.'],
            misconceptions: [
              { answer: '6', error: 'dectable-regelanzahl', why: '2 · 3 = 6 ist falsch: Es sind 2 · 2 · 2 = 2³ Kombinationen.' },
              { answer: '9', error: 'dectable-regelanzahl', why: '3² = 9 ist falsch: Jede Bedingung hat 2 Werte → 2³.' },
            ],
            explanation: '3 Bedingungen mit je 2 Werten → 2³ = 2 · 2 · 2 = **8 Regeln** (JJJ, JJN, JNJ, JNN, NJJ, NJN, NNJ, NNN).',
          },
        },
        { type: 'practice', title: 'Übung: Entscheidungstabellen (Generator)', generator: 'p.dectable', count: 4, difficulty: 2 },
        { type: 'practice', title: 'Übung: Entscheidungstabellen aus dem Pool', questionIds: ['p02-q035', 'p02-q036', 'p02-q037', 'p02-q042'], count: 3, difficulty: 2 },
        { type: 'summary', points: ['Bedingungen (J/N) oben, Aktionen (X/–) unten, jede Spalte eine Regel.', 'n Bedingungen → 2ⁿ Regeln (2 → 4, 3 → 8, 4 → 16).', 'Konsolidieren: gleiche Aktionen, nur eine Bedingung verschieden → zusammenfassen, Bedingung „–“.', 'Jede Regel ist ein Testfall; die Tabelle lässt sich direkt in WENN-Blöcke übersetzen.'] },
      ],
    },
  ],

  /* ==================================================================== */
  questions: [
    {
      id: 'p02-q001', kind: 'number', skill: 'prog.trace', difficulty: 1,
      prompt: `Welchen Wert hat \`gesamt\` nach Ausführung?\n\n${F}\nmenge ← 12\nstueckpreis ← 15\ngesamt ← menge * stueckpreis\nrabatt ← gesamt DIV 10\ngesamt ← gesamt - rabatt\n${F}`,
      answer: 162,
      misconceptions: [{ answer: '180', error: 'zuweisung-reihenfolge', why: 'In der letzten Zeile wird gesamt um den Rabatt (18) verringert.' }],
      explanation: 'gesamt = 12 · 15 = 180 · rabatt = 180 DIV 10 = 18 · gesamt = 180 − 18 = **162**',
    },
    {
      id: 'p02-q002', kind: 'number', skill: 'prog.branch', difficulty: 1,
      prompt: `Welchen Wert hat \`y\`?\n\n${F}\nx ← 4\nWENN x > 10 DANN\n  y ← x - 10\nSONST\n  y ← 10 - x\nENDE WENN\n${F}`,
      answer: 6,
      misconceptions: [{ answer: '-6', error: 'zweig-verwechselt', why: '4 > 10 ist FALSCH → der SONST-Zweig: 10 − 4 = 6.' }],
      explanation: '4 > 10 → FALSCH → SONST-Zweig → y = 10 − 4 = **6**. (Der Algorithmus berechnet den Abstand von x zu 10.)',
    },
    {
      id: 'p02-q003', kind: 'free', skill: 'prog.branch', difficulty: 1,
      prompt: 'Erläutern Sie den Unterschied zwischen einer **einseitigen** und einer **zweiseitigen** Verzweigung und geben Sie je ein Beispiel aus der IT-Praxis.',
      modelAnswer: 'Bei der einseitigen Verzweigung wird ein Anweisungsblock nur ausgeführt, wenn die Bedingung WAHR ist; ist sie FALSCH, passiert nichts und das Programm läuft nach ENDE WENN weiter (z. B. WENN freierSpeicher < 10 % DANN Warnung ausgeben). Bei der zweiseitigen Verzweigung gibt es zusätzlich einen SONST-Zweig: Es wird immer genau einer der beiden Blöcke ausgeführt (z. B. WENN Passwort korrekt DANN anmelden SONST Fehlermeldung).',
      keywords: ['nur bei WAHR', 'SONST', 'genau einer', 'Beispiel'],
      explanation: 'Kern: einseitig = nur DANN-Zweig; zweiseitig = DANN- und SONST-Zweig, einer davon wird immer ausgeführt.',
    },
    {
      id: 'p02-q004', kind: 'number', skill: 'prog.switch', difficulty: 2,
      prompt: `Welche Note gibt der Algorithmus aus?\n\n${F}\npunkte ← 67\nWENN punkte ≥ 92 DANN\n  note ← 1\nSONST WENN punkte ≥ 81 DANN\n  note ← 2\nSONST WENN punkte ≥ 67 DANN\n  note ← 3\nSONST WENN punkte ≥ 50 DANN\n  note ← 4\nSONST\n  note ← 5\nENDE WENN\nAUSGABE note\n${F}`,
      answer: 3,
      misconceptions: [{ answer: '4', error: 'grenzwert-vergleich', why: '67 ≥ 67 ist WAHR – genau auf der Grenze gilt die Note 3.' }],
      explanation: '67 ≥ 92 FALSCH → 67 ≥ 81 FALSCH → 67 ≥ 67 **WAHR** → note = **3**. Die restlichen Bedingungen werden nicht mehr geprüft.',
    },
    {
      id: 'p02-q005', kind: 'text', skill: 'prog.branch', difficulty: 2,
      prompt: `Was gibt der Algorithmus aus?\n\n${F}\ngewicht ← 12\nzielland ← "AT"\nWENN zielland = "DE" DANN\n  WENN gewicht ≤ 10 DANN\n    AUSGABE "Paket national"\n  SONST\n    AUSGABE "Spedition national"\n  ENDE WENN\nSONST\n  WENN gewicht ≤ 10 DANN\n    AUSGABE "Paket international"\n  SONST\n    AUSGABE "Spedition international"\n  ENDE WENN\nENDE WENN\n${F}`,
      accept: ['Spedition international'],
      hints: ['Erst das äußere WENN (Zielland), dann das innere (Gewicht).'],
      misconceptions: [{ answer: 'Paket international', error: 'grenzwert-vergleich', why: '12 ≤ 10 ist FALSCH → innerer SONST-Zweig.' }],
      explanation: 'zielland = "DE"? → FALSCH → äußeres SONST · gewicht ≤ 10 → 12 ≤ 10 FALSCH → **Spedition international**',
    },
    {
      id: 'p02-q006', kind: 'single', skill: 'prog.branch', difficulty: 2,
      prompt: 'Laut Anforderung soll ein Kunde **ab 100 €** Bestellwert versandkostenfrei beliefert werden, sonst kostet der Versand 4,90 €. Welcher Pseudocode setzt das korrekt um?',
      options: [
        'WENN wert ≥ 100 DANN versand ← 0 SONST versand ← 4.90 ENDE WENN',
        'WENN wert > 100 DANN versand ← 0 SONST versand ← 4.90 ENDE WENN',
        'WENN wert ≥ 100 DANN versand ← 4.90 SONST versand ← 0 ENDE WENN',
        'WENN wert ≥ 100 DANN versand ← 0 ENDE WENN · versand ← 4.90',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Bei genau 100 € wäre der Versand nicht frei – „ab 100“ schließt 100 ein (≥).', error: 'grenzwert-vergleich' },
        '2': { why: 'Die Zweige sind vertauscht.', error: 'zweig-verwechselt' },
        '3': { why: 'Die Zuweisung nach ENDE WENN überschreibt den Wert immer mit 4,90 €.', error: 'zuweisung-reihenfolge' },
      },
      explanation: '„ab 100 €“ → `wert ≥ 100`; DANN versandkostenfrei, SONST 4,90 €.',
    },
    {
      id: 'p02-q007', kind: 'number', skill: 'prog.switch', difficulty: 1,
      prompt: `Welchen Wert gibt der Algorithmus aus?\n\n${F}\nstatus ← 404\nFALLS status\n  FALL 200:\n    code ← 1\n  FALL 301, 302:\n    code ← 2\n  FALL 403, 404:\n    code ← 3\n  SONST:\n    code ← 9\nENDE FALLS\nAUSGABE code\n${F}`,
      answer: 3,
      explanation: 'status = 404 passt zu `FALL 403, 404:` → code = **3**. (Die HTTP-Statuscodes 403 „Forbidden“ und 404 „Not Found“ sind Client-Fehler.)',
    },
    {
      id: 'p02-q008', kind: 'free', skill: 'prog.switch', difficulty: 2,
      prompt: 'Erläutern Sie, wann Sie eine **Mehrfachauswahl (FALLS / switch)** und wann eine **SONST-WENN-Kette** einsetzen. Nennen Sie je ein Beispiel.',
      modelAnswer: 'Die Mehrfachauswahl eignet sich, wenn eine einzelne Variable mit mehreren festen Einzelwerten verglichen wird, z. B. Menüauswahl 1–4, Wochentag, Statuscode. Sie ist dann übersichtlicher. Die SONST-WENN-Kette ist nötig, wenn Bereiche (≥, <) oder zusammengesetzte Bedingungen (UND/ODER) geprüft werden, z. B. Notenschlüssel nach Punkten oder Rabattstaffel nach Bestellwert. In beiden Fällen sollte ein SONST-Zweig unerwartete/ungültige Werte abfangen.',
      keywords: ['feste Werte', 'Bereiche', 'Menü', 'Notenschlüssel', 'SONST/default'],
      explanation: 'Faustregel: feste Einzelwerte → FALLS; Bereiche/komplexe Bedingungen → SONST WENN.',
    },
    {
      id: 'p02-q009', kind: 'single', skill: 'prog.switch', difficulty: 3,
      prompt: 'Was gibt dieser **Java**-Code aus?\n\n```java\nint stufe = 2;\nswitch (stufe) {\n  case 1: System.out.print("A");\n  case 2: System.out.print("B");\n  case 3: System.out.print("C");\n          break;\n  default: System.out.print("X");\n}\n```',
      options: ['B', 'BC', 'BCX', 'ABC'],
      answer: 1,
      distractors: {
        '0': { why: 'Nach case 2 fehlt ein break – die Ausführung „fällt“ in case 3 durch (fall-through).', error: 'switch-fallthrough' },
        '2': { why: 'Nach case 3 steht ein break – default wird nicht mehr erreicht.', error: 'switch-fallthrough' },
        '3': { why: 'Die Ausführung beginnt erst beim passenden case 2.', error: 'switch-fallthrough' },
      },
      explanation: 'Einstieg bei `case 2` → „B“; ohne break weiter in `case 3` → „C“; dort `break` → Ende. Ausgabe **BC**.',
    },
    {
      id: 'p02-q010', kind: 'number', skill: 'prog.loops', difficulty: 1,
      prompt: `Welchen Wert gibt der Algorithmus aus?\n\n${F}\nsumme ← 0\nFÜR i VON 1 BIS 10\n  summe ← summe + i\nENDE FÜR\nAUSGABE summe\n${F}`,
      answer: 55,
      misconceptions: [{ answer: '45', error: 'schleife-off-by-one', why: 'i = 10 gehört noch dazu.' }, { answer: '10', error: 'akkumulator-ueberschrieben', why: 'summe wird nicht überschrieben, sondern aufaddiert.' }],
      explanation: '1 + 2 + … + 10 = **55** (Gauß: n · (n + 1) / 2 = 10 · 11 / 2).',
    },
    {
      id: 'p02-q011', kind: 'number', skill: 'prog.loops', difficulty: 2,
      prompt: `Welchen Wert hat \`anzahl\` am Ende?\n\n${F}\nanzahl ← 0\nFÜR i VON 2 BIS 20 SCHRITT 3\n  anzahl ← anzahl + 1\nENDE FÜR\n${F}`,
      answer: 7,
      hints: ['Schreibe die Werte von i auf: 2, 5, 8, …'],
      misconceptions: [{ answer: '6', error: 'schleife-off-by-one', why: 'i = 20 liegt noch im Bereich (20 ≤ 20).' }],
      explanation: 'i = 2, 5, 8, 11, 14, 17, 20 → **7** Durchläufe. Der nächste Wert 23 > 20 beendet die Schleife.',
    },
    {
      id: 'p02-q012', kind: 'number', skill: 'prog.trace', difficulty: 2,
      prompt: `Welchen Wert hat \`jahre\` am Ende? (Die Firma legt 10 % pro Jahr zurück, abgerundet.)\n\n${F}\nkapital ← 1000\njahre ← 0\nSOLANGE kapital < 1300 TUE\n  kapital ← kapital + kapital DIV 10\n  jahre ← jahre + 1\nENDE SOLANGE\n${F}`,
      answer: 3,
      hints: ['DIV vor +: kapital DIV 10 ist der Zuwachs.'],
      misconceptions: [{ answer: '2', error: 'schleife-off-by-one', why: 'Nach 2 Jahren ist kapital = 1210 < 1300 – es folgt noch ein Durchlauf.' }],
      explanation: '| Jahr | kapital |\n|---|---|\n| 0 | 1000 |\n| 1 | 1000 + 100 = 1100 |\n| 2 | 1100 + 110 = 1210 |\n| 3 | 1210 + 121 = 1331 |\n\n1331 < 1300 → FALSCH → Ende. jahre = **3**.',
    },
    {
      id: 'p02-q013', kind: 'number', skill: 'prog.loops', difficulty: 2,
      prompt: `Welchen Wert hat \`x\` am Ende?\n\n${F}\nx ← 50\nWIEDERHOLE\n  x ← x + 10\nBIS x > 20\n${F}`,
      answer: 60,
      misconceptions: [{ answer: '50', error: 'kopf-fuss-verwechselt', why: 'WIEDERHOLE … BIS ist fußgesteuert: Der Rumpf läuft mindestens einmal.' }],
      explanation: 'Der Rumpf wird zuerst ausgeführt: x = 60. Dann Prüfung: 60 > 20 → WAHR → Ende. x = **60**.',
    },
    {
      id: 'p02-q014', kind: 'number', skill: 'prog.loops', difficulty: 2,
      prompt: `Welchen Wert hat \`x\` am Ende?\n\n${F}\nx ← 50\nSOLANGE x ≤ 20 TUE\n  x ← x + 10\nENDE SOLANGE\n${F}`,
      answer: 50,
      misconceptions: [{ answer: '60', error: 'kopf-fuss-verwechselt', why: 'SOLANGE ist kopfgesteuert: 50 ≤ 20 ist schon vor dem ersten Durchlauf FALSCH – der Rumpf läuft nie.' }],
      explanation: 'Bedingung vor dem 1. Durchlauf: 50 ≤ 20 → FALSCH → kein Durchlauf. x bleibt **50**.',
    },
    {
      id: 'p02-q015', kind: 'match', skill: 'prog.loops', difficulty: 1,
      prompt: 'Ordne die Schleifenarten ihrer Beschreibung zu.',
      left: ['FÜR i VON 1 BIS n', 'SOLANGE … TUE', 'WIEDERHOLE … BIS'],
      right: ['Zählschleife – Anzahl der Durchläufe steht vorher fest', 'kopfgesteuert – Prüfung vor dem Durchlauf, evtl. 0 Durchläufe', 'fußgesteuert – mindestens ein Durchlauf, Prüfung danach'],
      answer: [0, 1, 2],
      explanation: 'FÜR = Zählschleife · SOLANGE = abweisend/kopfgesteuert · WIEDERHOLE … BIS = nicht abweisend/fußgesteuert.',
    },
    {
      id: 'p02-q016', kind: 'free', skill: 'prog.loops', difficulty: 2,
      prompt: 'Erläutern Sie den Unterschied zwischen einer **kopfgesteuerten** und einer **fußgesteuerten** Schleife. Nennen Sie für die fußgesteuerte Schleife einen typischen Anwendungsfall.',
      modelAnswer: 'Bei der kopfgesteuerten Schleife (SOLANGE/while) wird die Bedingung vor jedem Durchlauf geprüft; ist sie zu Beginn nicht erfüllt, wird der Rumpf gar nicht ausgeführt (0 bis n Durchläufe). Bei der fußgesteuerten Schleife (WIEDERHOLE … BIS / do-while) wird der Rumpf zuerst ausgeführt und die Bedingung erst danach geprüft – sie läuft also mindestens einmal. Typischer Anwendungsfall: Benutzereingabe abfragen und so lange wiederholen, bis sie gültig ist (z. B. Menüauswahl oder PIN-Eingabe).',
      keywords: ['vor dem Durchlauf', 'nach dem Durchlauf', 'mindestens einmal', 'Eingabe prüfen'],
      explanation: 'Kernpunkt: Zeitpunkt der Prüfung → Mindestanzahl der Durchläufe (0 bzw. 1).',
    },
    {
      id: 'p02-q017', kind: 'single', skill: 'prog.loops', difficulty: 2,
      prompt: 'Welche Schleife ist eine **Endlosschleife**?',
      options: [
        'i ← 10 · SOLANGE i > 0 TUE · i ← i + 1 · ENDE SOLANGE',
        'i ← 10 · SOLANGE i > 0 TUE · i ← i - 1 · ENDE SOLANGE',
        'i ← 0 · SOLANGE i < 10 TUE · i ← i + 2 · ENDE SOLANGE',
        'FÜR i VON 1 BIS 1000 · AUSGABE i · ENDE FÜR',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'i wird kleiner und erreicht 0 → die Bedingung wird FALSCH.', error: 'endlosschleife' },
        '2': { why: 'i läuft 0, 2, 4, 6, 8, 10 → bei 10 ist i < 10 FALSCH.', error: 'endlosschleife' },
        '3': { why: 'Eine Zählschleife endet nach 1000 Durchläufen.', error: 'endlosschleife' },
      },
      explanation: 'i startet bei 10 und wird immer größer – `i > 0` bleibt für immer WAHR (in echten Sprachen erst durch einen Überlauf beendet).',
    },
    {
      id: 'p02-q018', kind: 'free', skill: 'prog.loops', difficulty: 2,
      prompt: `Ein Auszubildender hat folgenden Algorithmus geschrieben. Das Programm „hängt“. Erläutern Sie den Fehler und korrigieren Sie den Pseudocode.\n\n${F}\nsumme ← 0\ni ← 1\nSOLANGE i ≤ 10 TUE\n  summe ← summe + i\nENDE SOLANGE\nAUSGABE summe\n${F}`,
      modelAnswer: `Es handelt sich um eine Endlosschleife: Die Variable i aus der Schleifenbedingung wird im Rumpf nie verändert, i ≤ 10 bleibt immer WAHR. Korrektur: im Rumpf i erhöhen.\n\nsumme ← 0\ni ← 1\nSOLANGE i ≤ 10 TUE\n  summe ← summe + i\n  i ← i + 1\nENDE SOLANGE\nAUSGABE summe   // 55`,
      keywords: ['Endlosschleife', 'i wird nicht verändert', 'i ← i + 1'],
      explanation: 'Bei SOLANGE-Schleifen muss der Rumpf die Bedingung irgendwann FALSCH machen. Alternativ: `FÜR i VON 1 BIS 10`.',
    },
    {
      id: 'p02-q019', kind: 'table', skill: 'prog.trace', difficulty: 2,
      prompt: `Führe einen Schreibtischtest durch: Trage die Werte von \`a\` und \`b\` **am Ende jedes Durchlaufs** ein.\n\n${F}\na ← 1\nb ← 0\nFÜR i VON 1 BIS 4\n  a ← a * 2\n  b ← b + a\nENDE FÜR\n${F}`,
      columns: [{ key: 'a', label: 'a', type: 'number' }, { key: 'b', label: 'b', type: 'number' }],
      rows: [
        { label: 'i = 1', cells: { a: { answer: '2' }, b: { answer: '2' } } },
        { label: 'i = 2', cells: { a: { answer: '4' }, b: { answer: '6' } } },
        { label: 'i = 3', cells: { a: { answer: '8' }, b: { answer: '14' } } },
        { label: 'i = 4', cells: { a: { answer: '16' }, b: { answer: '30' } } },
      ],
      hints: ['Im Rumpf wird zuerst a verdoppelt, dann der **neue** Wert zu b addiert.'],
      misconceptions: [{ cell: '1:b', answer: '4', error: 'zuweisung-reihenfolge', why: 'b wird nicht überschrieben, sondern um a erhöht: 2 + 4 = 6.' }],
      explanation: '| i | a | b |\n|---|---|---|\n| Start | 1 | 0 |\n| 1 | 2 | 2 |\n| 2 | 4 | 6 |\n| 3 | 8 | 14 |\n| 4 | 16 | 30 |',
    },
    {
      id: 'p02-q020', kind: 'number', skill: 'prog.loops', difficulty: 3,
      prompt: `Welchen Wert hat \`z\` am Ende?\n\n${F}\nz ← 0\nFÜR i VON 1 BIS 3\n  FÜR j VON 1 BIS 3\n    WENN i ≠ j DANN\n      z ← z + 1\n    ENDE WENN\n  ENDE FÜR\nENDE FÜR\n${F}`,
      answer: 6,
      hints: ['Insgesamt gibt es 3 · 3 = 9 Kombinationen (i, j).', 'Bei wie vielen davon ist i = j?'],
      misconceptions: [{ answer: '9', error: 'verschachtelte-schleife', why: 'Die Bedingung i ≠ j schließt die drei Fälle (1,1), (2,2), (3,3) aus.' }, { answer: '3', error: 'bedingung-umgekehrt', why: 'Das ist die Anzahl der Fälle mit i = j.' }],
      explanation: '9 Kombinationen, davon 3 mit i = j → **6** Mal wird z erhöht.',
    },
    {
      id: 'p02-q021', kind: 'text', skill: 'prog.trace', difficulty: 1,
      prompt: `Welche Zahlen werden ausgegeben? Gib sie mit Komma getrennt an.\n\n${F}\nFÜR i VON 1 BIS 6\n  WENN i MOD 2 = 1 DANN\n    AUSGABE i\n  ENDE WENN\nENDE FÜR\n${F}`,
      accept: ['1, 3, 5', '1,3,5', '1 3 5', '1; 3; 5', '1;3;5'],
      misconceptions: [{ answer: '2, 4, 6', error: 'bedingung-umgekehrt', why: 'i MOD 2 = 1 ist bei **ungeraden** Zahlen WAHR.' }],
      explanation: 'i MOD 2 = 1 ⇔ i ungerade → Ausgabe **1, 3, 5**.',
    },
    {
      id: 'p02-q022', kind: 'number', skill: 'prog.trace', difficulty: 3,
      prompt: `Welchen Wert hat \`n\` am Ende?\n\n${F}\nn ← 0\nx ← 7\nSOLANGE x ≠ 1 TUE\n  WENN x MOD 2 = 0 DANN\n    x ← x DIV 2\n  SONST\n    x ← 3 * x + 1\n  ENDE WENN\n  n ← n + 1\nENDE SOLANGE\n${F}`,
      answer: 16,
      hints: ['Lege eine Tabelle mit x und n an – es sind einige Durchläufe.', 'Gerade: halbieren, ungerade: 3x + 1.'],
      misconceptions: [{ answer: '17', error: 'schleife-off-by-one', why: 'Bei x = 1 endet die Schleife, ohne n noch einmal zu erhöhen.' }],
      explanation: 'x-Folge: 7 → 22 → 11 → 34 → 17 → 52 → 26 → 13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1. Das sind **16** Schritte (Collatz-Folge).',
    },
    {
      id: 'p02-q023', kind: 'free', skill: 'prog.writecode', difficulty: 3,
      prompt: 'Für das Intranet der Elektro Krämer GmbH soll eine **PIN-Abfrage** entwickelt werden: Der Benutzer hat **höchstens drei Versuche**. Bei korrekter PIN wird „Willkommen“ ausgegeben, nach drei Fehlversuchen „Konto gesperrt“. Erstellen Sie den Algorithmus in **Pseudocode**. Die gültige PIN steht in der Variablen `pinGespeichert`.',
      modelAnswer: `versuche ← 0\nkorrekt ← FALSCH\nWIEDERHOLE\n  EINGABE pin\n  versuche ← versuche + 1\n  WENN pin = pinGespeichert DANN\n    korrekt ← WAHR\n  ENDE WENN\nBIS korrekt = WAHR ODER versuche = 3\nWENN korrekt = WAHR DANN\n  AUSGABE "Willkommen"\nSONST\n  AUSGABE "Konto gesperrt"\nENDE WENN`,
      keywords: ['WIEDERHOLE', 'versuche', 'ODER', '3', 'Konto gesperrt', 'Initialisierung'],
      hints: ['Die PIN muss mindestens einmal abgefragt werden.', 'Die Schleife endet aus zwei Gründen – unterscheide danach, welcher es war.'],
      explanation: 'Wichtige Bewertungspunkte: Zähler initialisieren und erhöhen, fußgesteuerte (oder korrekt formulierte kopfgesteuerte) Schleife, Abbruch bei Erfolg **oder** nach 3 Versuchen, nach der Schleife Unterscheidung Erfolg/Sperre.',
    },
    {
      id: 'p02-q024', kind: 'free', skill: 'prog.writecode', difficulty: 3,
      prompt: 'Ein Techniker erfasst **Temperaturmesswerte** im Serverraum. Er gibt Werte ein, bis er **999** als Endekennung eingibt. Anschließend sollen der **Durchschnitt** und der **höchste Wert** ausgegeben werden. Wurde kein Messwert eingegeben, erscheint „Keine Messwerte“. Erstellen Sie den Algorithmus in Pseudocode.',
      modelAnswer: `summe ← 0\nanzahl ← 0\nEINGABE wert\nmaximum ← wert\nSOLANGE wert ≠ 999 TUE\n  summe ← summe + wert\n  anzahl ← anzahl + 1\n  WENN wert > maximum DANN\n    maximum ← wert\n  ENDE WENN\n  EINGABE wert\nENDE SOLANGE\nWENN anzahl > 0 DANN\n  AUSGABE "Durchschnitt: ", summe / anzahl\n  AUSGABE "Maximum: ", maximum\nSONST\n  AUSGABE "Keine Messwerte"\nENDE WENN`,
      keywords: ['Endekennung 999', 'SOLANGE', 'summe', 'anzahl', 'maximum', 'Division durch 0'],
      hints: ['Endekennung (Sentinel): erste Eingabe vor der Schleife, nächste am Ende des Rumpfs.', 'Das Maximum mit dem ersten Messwert initialisieren (nicht mit 0 – Temperaturen könnten negativ sein).'],
      explanation: 'Bewertet: Sentinel-Muster (999 darf nicht mitgezählt werden), Akkumulator und Zähler, Maximumsbestimmung mit sinnvollem Startwert, Schutz vor Division durch 0.',
    },
    {
      id: 'p02-q025', kind: 'order', skill: 'prog.writecode', difficulty: 2,
      prompt: 'Bringe die Zeilen in die richtige Reihenfolge: Der Algorithmus fragt eine **Menge von 1 bis 99** so lange ab, bis die Eingabe gültig ist, und gibt sie dann aus.',
      items: ['WIEDERHOLE', '  EINGABE menge', 'BIS menge ≥ 1 UND menge ≤ 99', 'AUSGABE menge'],
      explanation: 'Die Eingabe muss mindestens einmal erfolgen → WIEDERHOLE … BIS. Die Abbruchbedingung ist die **Gültigkeit** der Eingabe.',
    },
    {
      id: 'p02-q026', kind: 'order', skill: 'prog.trace', difficulty: 1,
      prompt: 'Bringe die Arbeitsschritte eines **Schreibtischtests** in eine sinnvolle Reihenfolge.',
      items: ['Für jede Variable eine Spalte in der Trace-Tabelle anlegen', 'Startwerte der Variablen eintragen', 'Anweisungen Zeile für Zeile ausführen und neue Werte notieren', 'Bei Schleifen und Verzweigungen jeweils die Bedingung auswerten', 'Ergebnis ablesen und mit der erwarteten Lösung vergleichen'],
      explanation: 'Erst Struktur (Spalten), dann Startwerte, dann stur ausführen, Bedingungen auswerten und am Ende mit dem Soll vergleichen.',
    },
    {
      id: 'p02-q027', kind: 'single', skill: 'prog.branch', difficulty: 2,
      prompt: `Die Anforderung lautet: *„Kunden erhalten **ab 10 Bestellungen** pro Jahr den Status „Stammkunde“.“* Ein Kollege hat programmiert:\n\n${F}\n1  EINGABE bestellungen\n2  WENN bestellungen > 10 DANN\n3    status ← "Stammkunde"\n4  SONST\n5    status ← "Kunde"\n6  ENDE WENN\n7  AUSGABE status\n${F}\n\nIn welcher Zeile steckt der Fehler?`,
      options: ['Zeile 2', 'Zeile 3', 'Zeile 5', 'Zeile 7'],
      answer: 0,
      distractors: {
        '1': { why: 'Die Zuweisung ist korrekt – das Problem ist die Bedingung.', error: 'grenzwert-vergleich' },
        '2': { why: 'Der SONST-Zweig passt zur Anforderung.', error: 'grenzwert-vergleich' },
        '3': { why: 'Die Ausgabe ist korrekt.', error: 'grenzwert-vergleich' },
      },
      explanation: '„ab 10“ bedeutet **≥ 10**. Mit `> 10` würde ein Kunde mit genau 10 Bestellungen fälschlich nur „Kunde“. Korrektur Zeile 2: `WENN bestellungen ≥ 10 DANN`.',
    },
    {
      id: 'p02-q028', kind: 'number', skill: 'prog.switch', difficulty: 2,
      prompt: `**Beleg – Preisliste Patchkabel Cat 6A:**\n\n| Menge | Stückpreis |\n|---|---|\n| 1 – 49 | 12 € |\n| 50 – 99 | 10 € |\n| ab 100 | 8 € |\n\nDer Algorithmus wird mit **menge = 50** ausgeführt. Welcher Gesamtpreis wird ausgegeben (in €)?\n\n${F}\nmenge ← 50\nWENN menge ≥ 100 DANN\n  preis ← 8\nSONST WENN menge ≥ 50 DANN\n  preis ← 10\nSONST\n  preis ← 12\nENDE WENN\ngesamt ← menge * preis\nAUSGABE gesamt\n${F}`,
      answer: 500,
      unit: '€',
      misconceptions: [{ answer: '600', error: 'grenzwert-vergleich', why: '50 ≥ 50 ist WAHR – ab 50 Stück gilt bereits der Preis 10 €.' }, { answer: '400', error: 'grenzwert-vergleich', why: '50 ≥ 100 ist FALSCH – der 8-€-Preis gilt erst ab 100 Stück.' }],
      explanation: '50 ≥ 100 FALSCH → 50 ≥ 50 **WAHR** → preis = 10 → gesamt = 50 · 10 = **500 €**',
    },
    {
      id: 'p02-q029', kind: 'text', skill: 'prog.branch', difficulty: 3,
      prompt: `Was gibt der Algorithmus aus?\n\n${F}\nalter ← 16\nmitglied ← WAHR\nWENN alter < 18 UND NICHT mitglied DANN\n  tarif ← "Jugend"\nSONST WENN alter < 18 ODER mitglied = WAHR DANN\n  tarif ← "Ermäßigt"\nSONST\n  tarif ← "Normal"\nENDE WENN\nAUSGABE tarif\n${F}`,
      accept: ['Ermäßigt', 'Ermaessigt', 'Ermässigt'],
      hints: ['NICHT mitglied ist FALSCH, weil mitglied WAHR ist.'],
      misconceptions: [{ answer: 'Jugend', error: 'logik-und', why: 'Für „Jugend“ müssen beide Teile WAHR sein; NICHT mitglied ist aber FALSCH.' }],
      explanation: '1. alter < 18 → WAHR, NICHT mitglied → FALSCH → UND = FALSCH\n2. alter < 18 → WAHR → ODER = WAHR → tarif = **Ermäßigt**',
    },
    {
      id: 'p02-q030', kind: 'number', skill: 'prog.loops', difficulty: 2,
      prompt: `Der Benutzer gibt nacheinander **5, 8, 0, 3, −1** ein. Welchen Wert gibt das Programm aus?\n\n${F}\nsumme ← 0\nWIEDERHOLE\n  EINGABE z\n  WENN z > 0 DANN\n    summe ← summe + z\n  ENDE WENN\nBIS z < 0\nAUSGABE summe\n${F}`,
      answer: 16,
      hints: ['Die 0 beendet die Schleife nicht – nur ein negativer Wert.', 'Die 0 wird wegen z > 0 auch nicht addiert.'],
      misconceptions: [{ answer: '13', error: 'schleife-abbruch', why: 'Die 0 ist kein Abbruchkriterium (0 < 0 ist FALSCH) – danach folgt noch die 3.' }, { answer: '15', error: 'bedingung-ignoriert', why: 'Die −1 wird wegen `z > 0` nicht addiert: 5 + 8 + 3 = 16.' }],
      explanation: '| Eingabe | z > 0? | summe | z < 0? |\n|---|---|---|---|\n| 5 | WAHR | 5 | FALSCH |\n| 8 | WAHR | 13 | FALSCH |\n| 0 | FALSCH | 13 | FALSCH |\n| 3 | WAHR | 16 | FALSCH |\n| −1 | FALSCH | 16 | WAHR → Ende |\n\nAusgabe **16**.',
    },
    {
      id: 'p02-q031', kind: 'single', skill: 'prog.loops', difficulty: 1,
      prompt: 'Ein Menü soll angezeigt und die Auswahl des Benutzers so lange abgefragt werden, bis eine gültige Option (1–4) gewählt wurde. Welche Schleife ist **am besten** geeignet?',
      options: ['fußgesteuerte Schleife (WIEDERHOLE … BIS)', 'Zählschleife (FÜR)', 'kopfgesteuerte Schleife mit Bedingung, die zu Beginn immer FALSCH ist', 'gar keine Schleife'],
      answer: 0,
      distractors: {
        '1': { why: 'Die Anzahl der Versuche ist vorher nicht bekannt.', error: 'schleifenart-wahl' },
        '2': { why: 'Dann würde der Rumpf nie ausgeführt.', error: 'schleifenart-wahl' },
        '3': { why: 'Ohne Schleife kann eine ungültige Eingabe nicht wiederholt werden.', error: 'schleifenart-wahl' },
      },
      explanation: 'Das Menü muss **mindestens einmal** angezeigt werden; die Prüfung erfolgt danach → fußgesteuert.',
    },
    {
      id: 'p02-q032', kind: 'number', skill: 'prog.loops', difficulty: 2,
      prompt: `Welchen Wert hat \`summe\` am Ende?\n\n${F}\nsumme ← 0\nFÜR i VON 10 BIS 1 SCHRITT -3\n  summe ← summe + i\nENDE FÜR\n${F}`,
      answer: 22,
      misconceptions: [{ answer: '21', error: 'schleife-off-by-one', why: 'i = 1 wird noch erreicht (10, 7, 4, 1) und addiert.' }, { answer: '55', error: 'schrittweite-ignoriert', why: 'Die Schrittweite ist −3, nicht −1.' }],
      explanation: 'i = 10, 7, 4, 1 → 10 + 7 + 4 + 1 = **22**. Der nächste Wert −2 liegt unter dem Endwert 1.',
    },
    {
      id: 'p02-q033', kind: 'text', skill: 'prog.switch', difficulty: 1,
      prompt: `Was gibt der Algorithmus aus?\n\n${F}\nnote ← 3\nFALLS note\n  FALL 1:\n    AUSGABE "sehr gut"\n  FALL 2:\n    AUSGABE "gut"\n  FALL 3:\n    AUSGABE "befriedigend"\n  FALL 4:\n    AUSGABE "ausreichend"\n  SONST:\n    AUSGABE "nicht bestanden"\nENDE FALLS\n${F}`,
      accept: ['befriedigend'],
      explanation: 'note = 3 → `FALL 3:` → **befriedigend**.',
    },
    {
      id: 'p02-q034', kind: 'number', skill: 'prog.trace', difficulty: 3,
      prompt: `Welchen Wert hat \`i\` nach Ende der Schleife?\n\n${F}\ni ← 0\nsumme ← 0\nSOLANGE i < 10 UND summe < 20 TUE\n  i ← i + 1\n  summe ← summe + i\nENDE SOLANGE\n${F}`,
      answer: 6,
      hints: ['Die Schleife endet, sobald **eine** der beiden Teilbedingungen FALSCH wird.'],
      misconceptions: [{ answer: '10', error: 'logik-und', why: 'Bei UND reicht es, wenn eine Teilbedingung FALSCH wird: summe ≥ 20 beendet die Schleife schon bei i = 6.' }, { answer: '5', error: 'schleife-off-by-one', why: 'Bei i = 5 ist summe = 15 < 20 – es folgt noch ein Durchlauf.' }],
      explanation: '| i | summe | i < 10 UND summe < 20 |\n|---|---|---|\n| 0 | 0 | WAHR |\n| 1 | 1 | WAHR |\n| 2 | 3 | WAHR |\n| 3 | 6 | WAHR |\n| 4 | 10 | WAHR |\n| 5 | 15 | WAHR |\n| 6 | 21 | FALSCH → Ende |\n\ni = **6**',
    },
    /* ---------- Entscheidungstabellen, Schreibweisen, Python ---------- */
    {
      id: 'p02-q035', kind: 'free', skill: 'prog.dectable', difficulty: 1,
      prompt: 'Erläutern Sie Aufbau und Zweck einer **Entscheidungstabelle**.',
      modelAnswer: 'Eine Entscheidungstabelle besteht aus vier Bereichen: links oben die Bedingungen, rechts oben je Regel deren Werte (J/N), links unten die Aktionen, rechts unten die Markierung, welche Aktion bei welcher Regel ausgeführt wird (X oder –). Jede Spalte ist eine Regel, also eine Kombination der Bedingungswerte; bei n Bedingungen gibt es vollständig 2ⁿ Regeln. Zweck: Alle Fälle einer komplexen Entscheidung werden übersichtlich und vollständig dargestellt, Lücken und Widersprüche fallen auf. Sie dient als Grundlage für die Programmierung (WENN-Strukturen) und für Black-Box-Testfälle (jede Regel ein Testfall).',
      keywords: ['Bedingungen', 'Aktionen', 'Regeln/Spalten', '2^n', 'vollständig', 'Testfälle'],
      explanation: 'Wichtig: vier Bereiche, Regel = Spalte = Kombination, 2ⁿ, Nutzen (Vollständigkeit, Programmierung, Test).',
    },
    {
      id: 'p02-q036', kind: 'free', skill: 'prog.dectable', difficulty: 3,
      prompt: `Übersetze die Entscheidungstabelle in Pseudocode. Die Variablen \`ausweisGueltig\`, \`gruppeIT\` und \`ausserhalbArbeitszeit\` sind WAHR oder FALSCH.\n\n| | R1 | R2 | R3 | R4 | R5–R8 |\n|---|---|---|---|---|---|\n| B1 Ausweis gültig | J | J | J | J | N |\n| B2 Gruppe „IT“ | J | J | N | N | – |\n| B3 außerhalb der Arbeitszeit | J | N | J | N | – |\n| A1 Tür öffnen | X | X | – | – | – |\n| A2 IT-Leitung benachrichtigen | X | – | – | – | – |\n| A3 Zutritt verweigern | – | – | X | X | X |`,
      modelAnswer: `WENN ausweisGueltig = WAHR UND gruppeIT = WAHR DANN\n  AUSGABE "Tür öffnen"\n  WENN ausserhalbArbeitszeit = WAHR DANN\n    AUSGABE "IT-Leitung benachrichtigen"\n  ENDE WENN\nSONST\n  AUSGABE "Zutritt verweigern"\nENDE WENN`,
      keywords: ['UND', 'verschachteltes WENN', 'SONST', 'ausserhalbArbeitszeit nur im Öffnen-Zweig'],
      hints: ['Welche zwei Bedingungen entscheiden über „Tür öffnen“ oder „verweigern“?', 'B3 spielt nur eine Rolle, wenn die Tür geöffnet wird.'],
      explanation: 'A1 gilt genau bei B1 = J **und** B2 = J (R1, R2) – sonst immer A3. A2 kommt nur hinzu, wenn zusätzlich B3 = J (R1). Darum: äußeres WENN mit UND, inneres WENN für B3. Häufiger Fehler: drei unabhängige WENN-Blöcke ohne SONST – dann fehlt die Aktion „Zutritt verweigern“ oder sie wird doppelt ausgelöst.',
    },
    {
      id: 'p02-q037', kind: 'text', skill: 'prog.dectable', difficulty: 2,
      prompt: 'Mit welchem Zeichen kennzeichnet man in einer **konsolidierten** Entscheidungstabelle, dass eine Bedingung für eine Regel keine Rolle spielt?',
      accept: ['-', '–', '—', 'Strich', 'Bindestrich', 'Gedankenstrich'],
      misconceptions: [{ answer: 'X', error: 'dectable-zeichen', why: 'X markiert eine **ausgeführte Aktion**. Bei Bedingungen bedeutet „–“, dass der Wert egal ist.' }],
      explanation: 'Ein **Strich (–)** bei einer Bedingung heißt „egal / irrelevant“: Die Regel gilt für J und für N. So werden zwei Regeln mit gleichen Aktionen zu einer zusammengefasst.',
    },
    {
      id: 'p02-q038', kind: 'number', skill: 'prog.loops', difficulty: 2,
      prompt: `Der folgende Algorithmus stammt aus einem Schulbuch, das die fußgesteuerte Schleife als **„Wiederhole … solange“** schreibt (die Bedingung ist dort eine **Laufbedingung**). Welcher Wert wird ausgegeben?\n\n${F}\nx := 1\nWiederhole\n  x := x * 3\nsolange x < 50\nAusgabe x\n${F}`,
      answer: 81,
      hints: ['Laufbedingung: Die Schleife läuft weiter, solange x < 50 WAHR ist.', '„:=“ ist eine Zuweisung, wie unser ←.'],
      misconceptions: [
        { answer: '3', error: 'pseudocode-lauf-abbruch', why: 'Du hast „solange x < 50“ wie „BIS x < 50“ gelesen (Abbruchbedingung). Hier läuft die Schleife weiter, solange x < 50 gilt.' },
        { answer: '27', error: 'schleife-off-by-one', why: 'Nach x = 27 ist 27 < 50 noch WAHR → es folgt ein weiterer Durchlauf: x = 81.' },
      ],
      explanation: '| Durchlauf | x | x < 50? |\n|---|---|---|\n| 1 | 3 | WAHR → weiter |\n| 2 | 9 | WAHR → weiter |\n| 3 | 27 | WAHR → weiter |\n| 4 | 81 | FALSCH → Ende |\n\nAusgabe **81**. In der App-Schreibweise: `WIEDERHOLE … BIS x ≥ 50`.',
    },
    {
      id: 'p02-q039', kind: 'number', skill: 'prog.loops', difficulty: 1,
      prompt: 'Die Java-Schleife `for (int i = 0; i < 10; i++)` soll in Pseudocode übersetzt werden: `FÜR i VON 0 BIS ?`. Welcher Endwert ist richtig?',
      answer: 9,
      hints: ['Bei „< 10“ ist 10 selbst nicht mehr dabei.', 'In unserem Pseudocode ist der Endwert eingeschlossen.'],
      misconceptions: [{ answer: '10', error: 'schleife-grenze-kleiner', why: '„BIS 10“ schließt 10 ein → 11 Durchläufe. Die Java-Schleife endet bei i = 9 (10 Durchläufe).' }],
      explanation: '`i < 10` lässt i = 0 … 9 zu. Da `FÜR … BIS` den Endwert **einschließt**, lautet die Übersetzung `FÜR i VON 0 BIS 9` (10 Durchläufe). Häufiger Fehler: „< 10“ als „bis 10“ lesen.',
    },
    {
      id: 'p02-q040', kind: 'number', skill: 'prog.loops', difficulty: 2,
      prompt: `Welchen Wert gibt das Python-Programm aus?\n\n${F}python\nsumme = 0\nfor i in range(2, 8):\n    summe = summe + i\nprint(summe)\n${F}`,
      answer: 27,
      hints: ['range(2, 8) liefert 2, 3, 4, 5, 6, 7 – der Endwert 8 ist **nicht** dabei.'],
      misconceptions: [{ answer: '35', error: 'schleife-grenze-kleiner', why: 'Du hast 8 mitgezählt. In Python ist der Endwert von range() ausgeschlossen.' }],
      explanation: 'range(2, 8) = 2, 3, 4, 5, 6, 7 → 2 + 3 + 4 + 5 + 6 + 7 = **27**. In unserem Pseudocode wäre das `FÜR i VON 2 BIS 7`.',
    },
    {
      id: 'p02-q041', kind: 'match', skill: 'prog.loops', difficulty: 1,
      prompt: 'Ordne jedem Pseudocode die passende Python-Entsprechung zu.',
      left: ['WENN … / SONST WENN … / SONST', 'SOLANGE x < 10 TUE', 'FÜR i VON 1 BIS 5', 'WIEDERHOLE … BIS fertig', 'a MOD b', 'x ← 5'],
      right: ['if … / elif … / else', 'while x < 10:', 'for i in range(1, 6):', 'while True: … if fertig: break', 'a % b', 'x = 5'],
      answer: [0, 1, 2, 3, 4, 5],
      explanation: 'Achtung bei `range`: Der Endwert ist ausgeschlossen, darum `range(1, 6)` für 1 bis 5. Eine fußgesteuerte Schleife gibt es in Python nicht – man baut sie mit `while True` und `break`.',
    },
    {
      id: 'p02-q042', kind: 'number', skill: 'prog.dectable', difficulty: 1,
      prompt: 'Aus einer **vollständigen** Entscheidungstabelle mit **4 Bedingungen** sollen Testfälle abgeleitet werden – je Regel ein Testfall. Wie viele Testfälle ergeben sich?',
      answer: 16,
      unit: 'Testfälle',
      misconceptions: [{ answer: '8', error: 'dectable-regelanzahl', why: '2 · 4 = 8 ist falsch: 2⁴ = 16 Kombinationen.' }],
      explanation: '4 Bedingungen → 2⁴ = **16 Regeln** → 16 Testfälle. Nach dem Konsolidieren können es weniger werden.',
    },
  ],
};
