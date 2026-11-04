import type { Module } from '../types';

/** Codeblock-Begrenzer */
const F = '```';

export const p03: Module = {
  id: 'p03',
  nr: 3,
  area: 'programmierung',
  title: 'Arrays, Standardalgorithmen & Funktionen',
  short: 'Arrays mit 0-basiertem Index, Summe/Durchschnitt/Zählen, Maximum/Minimum, lineare Suche, Bubble Sort sowie Funktionen und Prozeduren.',
  icon: 'ListOrdered',
  relevance: 'ap1',
  prerequisites: ['p02'],
  generators: ['p.array.aggregate', 'p.array.search', 'p.array.sort', 'p.funktion'],
  skills: [
    { id: 'prog.array', module: 'p03', title: 'Arrays: Aufbau und Indexierung', requires: ['prog.loops'] },
    { id: 'prog.aggregate', module: 'p03', title: 'Summe, Durchschnitt, Zählen, Maximum/Minimum', requires: ['prog.array'] },
    { id: 'prog.search', module: 'p03', title: 'Lineare (und binäre) Suche', requires: ['prog.array'] },
    { id: 'prog.sort', module: 'p03', title: 'Sortieren mit Bubble Sort', requires: ['prog.array'] },
    { id: 'prog.functions', module: 'p03', title: 'Funktionen und Prozeduren (Parameter, Rückgabewert)', requires: ['prog.loops'] },
  ],
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'p03-l01',
      title: 'Arrays: viele Werte unter einem Namen',
      minutes: 20,
      relevance: 'ap1',
      skills: ['prog.array'],
      simple: `Ein Array (Feld) ist wie ein Tablettenspender mit nummerierten Fächern: Viele Werte gleicher Art liegen unter einem Namen, und jedes Fach hat eine Nummer (Index). Die Zählung beginnt bei 0 – das erste Element ist werte[0]. Ein Array mit 7 Fächern hat also die Indizes 0 bis 6. Willst du alle Werte bearbeiten, läufst du mit einer Zählschleife von 0 bis Länge − 1 durch.

**Merke:** Erster Index 0, letzter Index Länge − 1.`,
      steps: [
        {
          type: 'explain',
          title: 'Ein Regal mit nummerierten Fächern',
          body: `Ein **Array** (Feld, in Python: Liste) speichert **mehrere Werte desselben Typs** unter **einem** Namen. Jedes Element wird über seinen **Index** (Position) angesprochen.

${F}
temperaturen ← [21, 23, 22, 25, 24]
AUSGABE temperaturen[0]      // 21 – das ERSTE Element
AUSGABE temperaturen[4]      // 24 – das LETZTE Element
temperaturen[2] ← 20         // drittes Element überschreiben
AUSGABE LÄNGE(temperaturen)  // 5
${F}

| Index | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| Wert | 21 | 23 | 22 → 20 | 25 | 24 |

**Die wichtigste Regel:** Der Index beginnt bei **0** (in Java, C#, C, Python, JavaScript und in unserem Pseudocode). Daraus folgt:
- Das **erste** Element hat den Index **0**, das **letzte** den Index **LÄNGE − 1**.
- Ein Array mit 5 Elementen hat die Indizes 0 bis 4. Ein Zugriff auf \`temperaturen[5]\` ist ein **Fehler** (Index außerhalb des gültigen Bereichs → in Java \`ArrayIndexOutOfBoundsException\`, in Python \`IndexError\`).
- Alle Elemente durchlaufen: \`FÜR i VON 0 BIS LÄNGE(array) - 1\`.

⚠️ Manche Prüfungsaufgaben oder ältere Sprachen (z. B. Pascal, VBA-Option) zählen ab 1. **Lies die Aufgabenstellung genau** und gib an, mit welcher Zählweise du arbeitest.

**Statisch vs. dynamisch:** Klassische Arrays (Java \`int[]\`, C) haben eine **feste Länge**, die beim Anlegen festgelegt wird. Dynamische Listen (Java \`ArrayList\`, C# \`List<T>\`, Python \`list\`) können wachsen und schrumpfen.

**Mehrdimensionale Arrays:** Eine Tabelle lässt sich als Array von Arrays darstellen: \`raster[zeile][spalte]\` – z. B. ein Sitzplan oder ein Monatsplan.

**Zeichenketten** sind intern ebenfalls Folgen von Zeichen: Bei \`wort ← "SERVER"\` ist \`wort[0]\` das Zeichen \`S\`.`,
        },
        {
          type: 'visual',
          title: 'Index und Wert',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Index 0 → 21', text: 'Erstes Element: temperaturen[0]', icon: 'Square' },
                { title: 'Index 1 → 23', text: 'Zweites Element: temperaturen[1]', icon: 'Square' },
                { title: '…', text: 'Index steigt um 1 je Element.', icon: 'MoreHorizontal' },
                { title: 'Index 4 → 24', text: 'Letztes Element: temperaturen[LÄNGE − 1]', icon: 'Square' },
              ],
            },
          },
          caption: 'Position im Alltag („das 3. Element“) = Index + 1. Index 2 ist das dritte Element.',
        },
        {
          type: 'example',
          title: 'Array mit einer Schleife füllen und lesen',
          problem: `Welche Werte stehen nach Ausführung in \`quadrate\`, und was wird ausgegeben?\n\n${F}\nquadrate ← [0, 0, 0, 0, 0]\nFÜR i VON 0 BIS LÄNGE(quadrate) - 1\n  quadrate[i] ← i * i\nENDE FÜR\nAUSGABE quadrate[3] + quadrate[LÄNGE(quadrate) - 1]\n${F}`,
          steps: [
            { label: 'Länge bestimmen', body: 'LÄNGE(quadrate) = 5 → i läuft von 0 bis 4.' },
            { label: 'Schleife', body: '| i | quadrate[i] |\n|---|---|\n| 0 | 0 |\n| 1 | 1 |\n| 2 | 4 |\n| 3 | 9 |\n| 4 | 16 |' },
            { label: 'Ausgabe', body: 'quadrate[3] = 9, quadrate[5 − 1] = quadrate[4] = 16 → 9 + 16 = **25**' },
          ],
          result: 'quadrate = [0, 1, 4, 9, 16], Ausgabe 25',
        },
        {
          type: 'check',
          question: {
            id: 'p03-c01', kind: 'number', skill: 'prog.array', difficulty: 1,
            prompt: `Was wird ausgegeben?\n\n${F}\nports ← [22, 80, 443, 3389, 445]\nAUSGABE ports[3]\n${F}`,
            answer: 3389,
            misconceptions: [{ answer: '443', error: 'array-index-1', why: 'Du hast ab 1 gezählt. Index 3 ist das **vierte** Element.' }],
            explanation: 'Index 0 = 22, 1 = 80, 2 = 443, **3 = 3389** (RDP), 4 = 445.',
          },
        },
        { type: 'practice', title: 'Übung: Arrays & Index', questionIds: ['p03-q001', 'p03-q002', 'p03-q003', 'p03-q004', 'p03-q005', 'p03-q033'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Array = viele Werte unter einem Namen, Zugriff über den Index.', 'Index von 0 bis LÄNGE − 1.', 'Durchlaufen: FÜR i VON 0 BIS LÄNGE(a) − 1.', 'Index außerhalb des Bereichs = Laufzeitfehler.'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p03-l02',
      title: 'Summe, Durchschnitt und Zählen',
      minutes: 20,
      relevance: 'ap1',
      skills: ['prog.aggregate'],
      simple: `Eine Summe bildest du wie eine Supermarktkasse: Die Kasse startet bei 0, und jeder Artikel wird zum Zwischenstand dazugezählt. Diese „mitlaufende“ Variable heißt Akkumulator (Sammelvariable). Den Durchschnitt erhältst du, wenn du am Ende die Summe durch die Anzahl teilst. Beim Zählen machst du es ähnlich, nur erhöhst du den Zähler um 1, wenn eine Bedingung zutrifft.

**Merke:** summe ← 0 vor der Schleife, summe ← summe + wert in der Schleife, Durchschnitt erst nach der Schleife.`,
      steps: [
        {
          type: 'explain',
          title: 'Die drei Klassiker der Array-Verarbeitung',
          body: `**Summe** – Akkumulator mit 0 starten, jedes Element addieren:

${F}
summe ← 0
FÜR i VON 0 BIS LÄNGE(werte) - 1
  summe ← summe + werte[i]
ENDE FÜR
${F}

**Durchschnitt (arithmetisches Mittel)** – Summe durch Anzahl:

${F}
durchschnitt ← summe / LÄNGE(werte)
${F}

⚠️ Bei einem **leeren** Array wäre das eine Division durch 0 → vorher \`WENN LÄNGE(werte) > 0\` prüfen. In Java/C# auf **Ganzzahldivision** achten (int / int)!

**Zählen mit Bedingung** – Zähler mit 0 starten, nur bei Treffer erhöhen:

${F}
anzahl ← 0
FÜR i VON 0 BIS LÄNGE(werte) - 1
  WENN werte[i] > grenzwert DANN
    anzahl ← anzahl + 1
  ENDE WENN
ENDE FÜR
${F}

**Typische Fehler (und wie sie sich zeigen):**

| Fehler | Folge |
|---|---|
| Schleife \`BIS LÄNGE(werte)\` statt \`LÄNGE − 1\` | Zugriff auf nicht existierendes Element → Laufzeitfehler |
| Schleife \`VON 1\` statt \`VON 0\` | erstes Element fehlt |
| Schleife \`BIS LÄNGE − 2\` | letztes Element fehlt |
| Akkumulator **in** der Schleife auf 0 setzen | am Ende steht nur der letzte Wert |
| \`>\` statt \`≥\` | Werte genau auf der Grenze werden nicht gezählt |`,
        },
        {
          type: 'visual',
          title: 'Akkumulator-Muster',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Summe', text: 'summe ← 0 · in der Schleife: summe ← summe + werte[i]', icon: 'Plus' },
                { title: 'Zählen', text: 'anzahl ← 0 · in der Schleife: WENN Bedingung DANN anzahl ← anzahl + 1', icon: 'Hash' },
                { title: 'Durchschnitt', text: 'nach der Schleife: summe / LÄNGE(werte) – leeres Array abfangen!', icon: 'Divide' },
              ],
            },
          },
          caption: 'Initialisierung VOR der Schleife, Aktualisierung IN der Schleife, Auswertung NACH der Schleife.',
        },
        {
          type: 'example',
          title: 'Auswertung von Messwerten aus dem Serverraum',
          problem: `Der Temperatursensor im Serverraum Hamburg liefert stündlich Werte (°C). Ab **27 °C** soll ein Warnzähler hochgezählt werden. Welche Werte haben \`durchschnitt\` und \`warnungen\`?\n\n${F}\nwerte ← [24, 26, 27, 29, 25, 27]\nsumme ← 0\nwarnungen ← 0\nFÜR i VON 0 BIS LÄNGE(werte) - 1\n  summe ← summe + werte[i]\n  WENN werte[i] ≥ 27 DANN\n    warnungen ← warnungen + 1\n  ENDE WENN\nENDE FÜR\ndurchschnitt ← summe / LÄNGE(werte)\n${F}`,
          steps: [
            { label: 'Trace-Tabelle', body: '| i | werte[i] | summe | ≥ 27? | warnungen |\n|---|---|---|---|---|\n| 0 | 24 | 24 | FALSCH | 0 |\n| 1 | 26 | 50 | FALSCH | 0 |\n| 2 | 27 | 77 | WAHR | 1 |\n| 3 | 29 | 106 | WAHR | 2 |\n| 4 | 25 | 131 | FALSCH | 2 |\n| 5 | 27 | 158 | WAHR | 3 |' },
            { label: 'Durchschnitt', body: '158 / 6 = 26,333… ≈ **26,33 °C**' },
            { label: 'Grenzwert beachten', body: '„ab 27 °C“ → `≥ 27`. Mit `> 27` wären es nur 1 Warnung – die zwei Werte genau 27 würden fehlen.' },
          ],
          result: 'durchschnitt ≈ 26,33 °C, warnungen = 3',
        },
        {
          type: 'check',
          question: {
            id: 'p03-c02', kind: 'number', skill: 'prog.aggregate', difficulty: 1,
            prompt: `Welchen Wert hat \`durchschnitt\`?\n\n${F}\nwerte ← [4, 7, 9, 10]\nsumme ← 0\nFÜR i VON 0 BIS LÄNGE(werte) - 1\n  summe ← summe + werte[i]\nENDE FÜR\ndurchschnitt ← summe / LÄNGE(werte)\n${F}`,
            answer: 7.5,
            tolerance: 0.001,
            misconceptions: [{ answer: '30', error: 'teilergebnis', why: '30 ist die Summe – sie muss noch durch 4 geteilt werden.' }, { answer: '10', error: 'array-off-by-one', why: 'Durch 3 geteilt? Die Länge ist 4.' }],
            explanation: 'summe = 4 + 7 + 9 + 10 = 30 → 30 / 4 = **7,5**',
          },
        },
        { type: 'practice', title: 'Übung: Summe, Zählen, Durchschnitt (Generator)', generator: 'p.array.aggregate', count: 5, difficulty: 1 },
        { type: 'practice', title: 'Übung: Aggregation aus dem Pool', questionIds: ['p03-q006', 'p03-q007', 'p03-q008', 'p03-q030', 'p03-q034'], count: 4, difficulty: 2 },
        { type: 'summary', points: ['Summe/Zähler vor der Schleife mit 0 initialisieren.', 'Durchschnitt = Summe / Anzahl, leeres Array abfangen.', 'Grenzwerte (≥ / >) genau aus der Anforderung übernehmen.'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p03-l03',
      title: 'Maximum und Minimum bestimmen',
      minutes: 15,
      relevance: 'ap1',
      skills: ['prog.aggregate'],
      simple: `Das Maximum findest du wie beim Hochsprung-Rekord: Der erste Sprung ist automatisch der Rekord, und jeder bessere Sprung ersetzt ihn. Im Programm startest du deshalb mit dem ersten Element des Arrays als bisherigem Maximum. Dann vergleichst du jedes weitere Element damit und tauschst den Rekord aus, wenn ein größeres kommt. Starte nicht mit 0 – bei lauter negativen Werten (z. B. Temperaturen im Winter) wäre das Ergebnis sonst falsch.

**Merke:** max ← werte[0], dann WENN werte[i] > max DANN max ← werte[i].`,
      steps: [
        {
          type: 'explain',
          title: 'Der bisher Beste merkt sich seinen Platz',
          body: `Idee: Man merkt sich den **bisher größten** Wert (und ggf. seine **Position**) und vergleicht jedes weitere Element damit.

${F}
max ← werte[0]           // mit dem ERSTEN Element starten
pos ← 0
FÜR i VON 1 BIS LÄNGE(werte) - 1
  WENN werte[i] > max DANN
    max ← werte[i]
    pos ← i
  ENDE WENN
ENDE FÜR
AUSGABE "Maximum ", max, " an Index ", pos
${F}

**Warum mit \`werte[0]\` starten und nicht mit 0?**
- Bei lauter **negativen** Werten (z. B. Temperaturen −5, −3, −8) würde \`max ← 0\` fälschlich 0 liefern – ein Wert, der gar nicht im Array steht.
- Beim **Minimum** ist der Fehler noch häufiger: \`min ← 0\` liefert bei lauter positiven Werten immer 0.
- Alternative: mit dem kleinstmöglichen bzw. größtmöglichen Wert des Datentyps starten (z. B. \`Integer.MIN_VALUE\`) – \`werte[0]\` ist aber einfacher und sicher (bei nicht-leerem Array).

**> oder ≥?** Kommt das Maximum mehrfach vor, liefert \`>\` die **erste** Position, \`≥\` die **letzte**.

**Minimum:** genauso, nur mit \`<\`.

**Spannweite:** max − min (z. B. Temperaturschwankung an einem Tag).`,
        },
        {
          type: 'visual',
          title: 'Maximumsuche Schritt für Schritt',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Start', text: 'max = erstes Element, pos = 0', icon: 'Flag' },
                { title: 'Vergleichen', text: 'Ist das aktuelle Element größer als max?', icon: 'Scale' },
                { title: 'Merken', text: 'Ja → max und pos aktualisieren. Nein → weiter.', icon: 'Bookmark' },
                { title: 'Ende', text: 'Nach dem letzten Element steht das Maximum fest.', icon: 'Trophy' },
              ],
            },
          },
          caption: 'Ein Durchlauf genügt: n Elemente → n − 1 Vergleiche.',
        },
        {
          type: 'example',
          title: 'Kältester Messwert mit negativen Zahlen',
          problem: `Ein Außensensor am Standort Berlin liefert die Werte **[−2, −7, 1, −7, 3]**. Bestimme Minimum und Index des **ersten** Minimums.\n\n${F}\nwerte ← [-2, -7, 1, -7, 3]\nmin ← werte[0]\npos ← 0\nFÜR i VON 1 BIS LÄNGE(werte) - 1\n  WENN werte[i] < min DANN\n    min ← werte[i]\n    pos ← i\n  ENDE WENN\nENDE FÜR\n${F}`,
          steps: [
            { label: 'Trace-Tabelle', body: '| i | werte[i] | < min? | min | pos |\n|---|---|---|---|---|\n| Start | – | – | −2 | 0 |\n| 1 | −7 | WAHR | −7 | 1 |\n| 2 | 1 | FALSCH | −7 | 1 |\n| 3 | −7 | FALSCH (−7 < −7 ist FALSCH) | −7 | 1 |\n| 4 | 3 | FALSCH | −7 | 1 |' },
            { label: 'Ergebnis', body: 'min = −7 an Index **1**. Wegen `<` (nicht `≤`) bleibt das erste Vorkommen gespeichert.' },
            { label: 'Gegenprobe Fehlerfall', body: 'Mit `min ← 0` würde das Ergebnis hier zufällig stimmen – bei Werten [4, 7, 2] aber 0 liefern. Darum immer mit dem ersten Element starten.' },
          ],
          result: 'Minimum −7 an Index 1',
        },
        {
          type: 'check',
          question: {
            id: 'p03-c03', kind: 'number', skill: 'prog.aggregate', difficulty: 2,
            prompt: `Welchen Wert gibt der Algorithmus aus?\n\n${F}\nwerte ← [-4, -9, -1, -6]\nmax ← 0\nFÜR i VON 0 BIS LÄNGE(werte) - 1\n  WENN werte[i] > max DANN\n    max ← werte[i]\n  ENDE WENN\nENDE FÜR\nAUSGABE max\n${F}`,
            answer: 0,
            hints: ['Ist irgendein Wert größer als 0?'],
            misconceptions: [{ answer: '-1', error: 'initialwert-fehler', why: '−1 wäre das richtige Maximum. Wegen des Startwerts 0 ist die Bedingung aber nie WAHR – ausgegeben wird 0.' }],
            explanation: 'Alle Werte sind negativ, `werte[i] > 0` ist nie WAHR → Ausgabe **0**. Fehler: falsche Initialisierung; richtig wäre `max ← werte[0]` (Ergebnis −1).',
          },
        },
        { type: 'practice', title: 'Übung: Maximum/Minimum (Generator)', generator: 'p.array.aggregate', count: 4, difficulty: 2 },
        { type: 'practice', title: 'Übung: Extremwerte aus dem Pool', questionIds: ['p03-q009', 'p03-q010', 'p03-q011'], count: 3, difficulty: 2 },
        { type: 'summary', points: ['max/min mit dem ersten Element initialisieren, nicht mit 0.', 'Position (Index) separat in pos merken.', '> liefert das erste, ≥ das letzte Vorkommen.'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p03-l04',
      title: 'Suchen: lineare und binäre Suche',
      minutes: 20,
      relevance: 'ap1',
      skills: ['prog.search'],
      simple: `Die lineare Suche ist wie das Durchgehen einer Gästeliste von oben nach unten, bis du den Namen findest – das klappt immer, dauert aber bei langen Listen. Die binäre Suche ist wie das Aufschlagen eines Wörterbuchs: Du öffnest in der Mitte und weißt sofort, in welcher Hälfte du weitersuchen musst. Sie funktioniert nur, wenn die Daten sortiert sind. Weil sich der Suchbereich jedes Mal halbiert, reichen bei 1000 Einträgen höchstens 10 Vergleiche.

**Merke:** Linear = Schritt für Schritt, beliebige Daten; binär = halbieren, nur sortierte Daten.`,
      steps: [
        {
          type: 'explain',
          title: 'Element für Element – oder clever halbieren',
          body: `**Lineare (sequenzielle) Suche:** Das Array wird **von vorne nach hinten** durchlaufen, bis das gesuchte Element gefunden ist. Funktioniert **immer**, auch bei unsortierten Daten.

${F}
FUNKTION suche(liste, ziel)
  FÜR i VON 0 BIS LÄNGE(liste) - 1
    WENN liste[i] = ziel DANN
      RÜCKGABE i          // gefunden: Index zurückgeben, Funktion endet sofort
    ENDE WENN
  ENDE FÜR
  RÜCKGABE -1             // nicht gefunden
ENDE FUNKTION
${F}

- Rückgabe **−1** ist die übliche Kennung für „nicht gefunden“ (0 wäre ja ein gültiger Index!).
- Durch \`RÜCKGABE\` endet die Suche beim **ersten** Treffer.
- **Aufwand:** im besten Fall 1 Vergleich, im schlechtesten Fall (letztes Element oder nicht vorhanden) **n Vergleiche**, im Mittel etwa n/2. Man sagt: Laufzeit **O(n)** (linear).

**Binäre Suche** (nur bei **sortierten** Daten!): Man vergleicht mit dem **mittleren** Element. Ist das Ziel kleiner, sucht man in der linken Hälfte weiter, sonst in der rechten. Jeder Schritt halbiert den Suchbereich.

| Anzahl Elemente | lineare Suche (schlechtester Fall) | binäre Suche (schlechtester Fall) |
|---|---|---|
| 16 | 16 Vergleiche | 5 |
| 1.000 | 1.000 | 10 |
| 1.000.000 | 1.000.000 | 20 |

(binär: Anzahl der Halbierungen ≈ log₂ n, aufgerundet, plus ggf. ein letzter Vergleich)

**Wann welche?** Unsortierte oder kleine Datenmengen → linear. Große, sortierte Datenmengen, in denen oft gesucht wird → binär (oder Index/Hashtabelle, z. B. in Datenbanken).`,
        },
        {
          type: 'visual',
          title: 'Zwei Suchstrategien',
          widget: {
            kind: 'cards',
            data: {
              columns: 2,
              items: [
                { title: 'Lineare Suche', text: 'Wie das Durchblättern eines unsortierten Aktenstapels: Blatt für Blatt, bis der Treffer kommt. Keine Vorbedingung, Aufwand bis n.', icon: 'ArrowRight' },
                { title: 'Binäre Suche', text: 'Wie im Telefonbuch: in der Mitte aufschlagen, dann vorne oder hinten weitersuchen. Nur bei sortierten Daten, Aufwand ≈ log₂ n.', icon: 'SplitSquareHorizontal' },
              ],
            },
          },
          caption: 'Je größer die Datenmenge, desto mehr lohnt sich das Sortieren für eine schnellere Suche.',
        },
        {
          type: 'example',
          title: 'Seriennummer im Inventar suchen',
          problem: `Im Inventar-Array stehen die letzten vier Ziffern von Seriennummern. Was liefert \`suche(inventar, 3310)\`, und wie viele Vergleiche sind nötig?\n\n${F}\ninventar ← [4471, 1802, 3310, 9050, 3310]\nergebnis ← suche(inventar, 3310)\n${F}`,
          steps: [
            { label: 'Durchlaufen', body: '| i | inventar[i] | = 3310? |\n|---|---|---|\n| 0 | 4471 | FALSCH |\n| 1 | 1802 | FALSCH |\n| 2 | 3310 | **WAHR** → RÜCKGABE 2 |' },
            { label: 'Zweites Vorkommen', body: 'Index 4 enthält ebenfalls 3310, wird aber nie erreicht – die Funktion endet beim ersten Treffer.' },
            { label: 'Vergleiche', body: 'Indizes 0, 1, 2 → **3 Vergleiche**.' },
          ],
          result: 'ergebnis = 2 nach 3 Vergleichen',
        },
        {
          type: 'check',
          question: {
            id: 'p03-c04', kind: 'number', skill: 'prog.search', difficulty: 2,
            prompt: `Welchen Wert hat \`ergebnis\`? (Die Funktion \`suche\` ist wie in der Lektion definiert.)\n\n${F}\nFUNKTION suche(liste, ziel)\n  FÜR i VON 0 BIS LÄNGE(liste) - 1\n    WENN liste[i] = ziel DANN\n      RÜCKGABE i\n    ENDE WENN\n  ENDE FÜR\n  RÜCKGABE -1\nENDE FUNKTION\n\nliste ← [8, 15, 4, 23, 42]\nergebnis ← suche(liste, 16)\n${F}`,
            answer: -1,
            misconceptions: [{ answer: '0', error: 'suche-nicht-gefunden', why: '0 ist ein gültiger Index (erstes Element). „Nicht gefunden“ wird mit −1 gemeldet.' }, { answer: '5', error: 'suche-nicht-gefunden', why: 'Nach der Schleife wird −1 zurückgegeben, nicht die Länge.' }],
            explanation: '16 kommt nicht vor → alle 5 Vergleiche FALSCH → nach der Schleife **RÜCKGABE −1**.',
          },
        },
        { type: 'practice', title: 'Übung: Lineare Suche (Generator)', generator: 'p.array.search', count: 4, difficulty: 2 },
        { type: 'practice', title: 'Übung: Suchen aus dem Pool', questionIds: ['p03-q012', 'p03-q013', 'p03-q014', 'p03-q015', 'p03-q016'], count: 4, difficulty: 2 },
        { type: 'summary', points: ['Lineare Suche: von vorn bis zum ersten Treffer, Rückgabe −1 bei Misserfolg.', 'Aufwand linear: bis zu n Vergleiche.', 'Binäre Suche: nur sortiert, halbiert den Bereich, ≈ log₂ n Schritte.'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p03-l05',
      title: 'Sortieren mit Bubble Sort',
      minutes: 25,
      relevance: 'ap1',
      skills: ['prog.sort'],
      simple: `Bubble Sort ist wie Kinder, die sich in einer Reihe nach Größe ordnen: Immer zwei Nachbarn vergleichen sich und tauschen, wenn der linke größer ist. Nach dem ersten Durchgang steht der Größte ganz hinten – er ist wie eine Blase nach oben gestiegen. Zum Tauschen brauchst du eine Hilfsvariable (Zwischenspeicher), so wie du ein drittes Glas brauchst, um den Inhalt zweier Gläser zu tauschen. Bei n Elementen genügen höchstens n − 1 Durchgänge.

**Merke:** Nachbarn vergleichen, bei Bedarf über eine Hilfsvariable tauschen, so oft wiederholen, bis nichts mehr getauscht wird.`,
      steps: [
        {
          type: 'explain',
          title: 'Große Werte steigen auf wie Blasen',
          body: `**Bubble Sort** ist der einfachste Sortieralgorithmus – ideal, um Sortieren zu verstehen und in Prüfungen nachzuvollziehen.

**Prinzip:** Gehe das Array von links nach rechts durch und vergleiche immer **zwei benachbarte** Elemente. Steht das linke größer als das rechte, werden sie **getauscht**. Nach dem **ersten Durchlauf** steht das **größte** Element ganz rechts – es ist „aufgestiegen“ wie eine Blase. Nach dem zweiten Durchlauf steht das zweitgrößte an vorletzter Stelle usw.

${F}
FÜR durchlauf VON 1 BIS LÄNGE(zahlen) - 1
  FÜR i VON 0 BIS LÄNGE(zahlen) - 2
    WENN zahlen[i] > zahlen[i + 1] DANN
      hilf ← zahlen[i]               // Tausch mit Hilfsvariable
      zahlen[i] ← zahlen[i + 1]
      zahlen[i + 1] ← hilf
    ENDE WENN
  ENDE FÜR
ENDE FÜR
${F}

**Wichtige Fakten:**
- Die innere Schleife läuft nur bis **LÄNGE − 2**, weil immer \`zahlen[i + 1]\` mitverglichen wird.
- Ein Durchlauf bei n Elementen = **n − 1 Vergleiche**.
- Spätestens nach **n − 1 Durchläufen** ist das Array sortiert.
- **Optimierungen:** (1) Die innere Schleife kann bei jedem Durchlauf um eins kürzer werden (\`BIS LÄNGE − 1 − durchlauf\`), weil rechts schon sortierte Elemente stehen. (2) Gab es in einem Durchlauf **keinen Tausch**, ist das Array sortiert → vorzeitig abbrechen (Variable \`getauscht\`).
- **Aufwand:** im schlechtesten Fall etwa n²/2 Vergleiche → **O(n²)**. Für große Datenmengen nutzt man schnellere Verfahren wie Quicksort oder Mergesort (O(n · log n)) bzw. die eingebauten Sortierfunktionen der Sprache.
- **Absteigend sortieren:** Vergleich umdrehen (\`<\` statt \`>\`).
- Bubble Sort ist **stabil**: Gleiche Werte behalten ihre Reihenfolge (getauscht wird nur bei echtem \`>\`).`,
        },
        {
          type: 'visual',
          title: 'Ein Durchlauf in vier Bildern',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Start', text: '[5, 3, 8, 1]', icon: 'Circle' },
                { title: 'i = 0: 5 > 3 → tauschen', text: '[3, 5, 8, 1]', icon: 'ArrowLeftRight' },
                { title: 'i = 1: 5 > 8? nein', text: '[3, 5, 8, 1]', icon: 'Minus' },
                { title: 'i = 2: 8 > 1 → tauschen', text: '[3, 5, 1, 8] – die 8 ist ganz rechts', icon: 'ArrowLeftRight' },
              ],
            },
          },
          caption: 'Nach einem Durchlauf ist nur das Maximum sicher an seinem Platz – der Rest ist noch unsortiert.',
        },
        {
          type: 'example',
          title: 'Zwei Durchläufe mit Trace-Tabelle',
          problem: 'Sortiere **[6, 2, 9, 4, 1]** aufsteigend mit Bubble Sort. Gib den Zustand nach dem 1. und 2. Durchlauf an.',
          steps: [
            { label: '1. Durchlauf', body: '| i | Vergleich | Tausch? | Array danach |\n|---|---|---|---|\n| 0 | 6 > 2 | ja | [2, 6, 9, 4, 1] |\n| 1 | 6 > 9 | nein | [2, 6, 9, 4, 1] |\n| 2 | 9 > 4 | ja | [2, 6, 4, 9, 1] |\n| 3 | 9 > 1 | ja | [2, 6, 4, 1, 9] |' },
            { label: '2. Durchlauf', body: '| i | Vergleich | Tausch? | Array danach |\n|---|---|---|---|\n| 0 | 2 > 6 | nein | [2, 6, 4, 1, 9] |\n| 1 | 6 > 4 | ja | [2, 4, 6, 1, 9] |\n| 2 | 6 > 1 | ja | [2, 4, 1, 6, 9] |\n| 3 | 6 > 9 | nein | [2, 4, 1, 6, 9] |' },
            { label: 'Weiter', body: 'Nach dem 3. Durchlauf: [2, 1, 4, 6, 9], nach dem 4.: [1, 2, 4, 6, 9] – sortiert nach n − 1 = 4 Durchläufen.' },
          ],
          result: 'nach 1. Durchlauf [2, 6, 4, 1, 9] · nach 2. Durchlauf [2, 4, 1, 6, 9]',
        },
        {
          type: 'check',
          question: {
            id: 'p03-c05', kind: 'text', skill: 'prog.sort', difficulty: 2,
            prompt: `Wie sieht das Array nach dem **ersten Durchlauf** aus? Gib die Werte mit Komma getrennt an.\n\n${F}\nzahlen ← [7, 3, 9, 2, 5]\nFÜR i VON 0 BIS LÄNGE(zahlen) - 2\n  WENN zahlen[i] > zahlen[i + 1] DANN\n    hilf ← zahlen[i]\n    zahlen[i] ← zahlen[i + 1]\n    zahlen[i + 1] ← hilf\n  ENDE WENN\nENDE FÜR\n${F}`,
            accept: ['3, 7, 2, 5, 9', '3,7,2,5,9', '3 7 2 5 9', '[3, 7, 2, 5, 9]', '3; 7; 2; 5; 9'],
            misconceptions: [{ answer: '2, 3, 5, 7, 9', error: 'bubblesort-komplett', why: 'Das ist das vollständig sortierte Array. Nach einem Durchlauf steht nur die 9 sicher am Ende.' }],
            explanation: '7 > 3 → [3, 7, 9, 2, 5] · 7 > 9 nein · 9 > 2 → [3, 7, 2, 9, 5] · 9 > 5 → **[3, 7, 2, 5, 9]**',
          },
        },
        { type: 'practice', title: 'Übung: Bubble Sort (Generator)', generator: 'p.array.sort', count: 4, difficulty: 2 },
        { type: 'practice', title: 'Übung: Sortieren aus dem Pool', questionIds: ['p03-q017', 'p03-q018', 'p03-q019', 'p03-q020', 'p03-q021', 'p03-q022'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Benachbarte Elemente vergleichen, bei > tauschen (mit Hilfsvariable).', 'Ein Durchlauf: n − 1 Vergleiche, größtes Element wandert nach rechts.', 'Höchstens n − 1 Durchläufe; Abbruch, wenn kein Tausch mehr.', 'Aufwand O(n²) – für große Datenmengen ungeeignet.'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p03-l06',
      title: 'Funktionen und Prozeduren',
      minutes: 25,
      relevance: 'ap1',
      skills: ['prog.functions'],
      simple: `Eine Funktion ist wie eine Kaffeemaschine: Du gibst etwas hinein (Parameter, z. B. Bohnen und Wasser), sie arbeitet, und es kommt etwas heraus (Rückgabewert, der Kaffee). Du kannst sie immer wieder benutzen, ohne zu wissen, wie sie innen genau funktioniert. Eine Prozedur erledigt ebenfalls eine Aufgabe, gibt aber keinen Wert zurück – wie ein Drucker, der nur druckt. Mit Funktionen vermeidest du doppelten Code und machst Programme übersichtlicher.

**Merke:** Funktion = Parameter rein, RÜCKGABE raus; Prozedur = erledigt etwas ohne Rückgabewert.`,
      steps: [
        {
          type: 'explain',
          title: 'Teile und herrsche: Unterprogramme',
          body: `Eine **Funktion** ist ein benanntes Unterprogramm, das Eingabewerte (**Parameter**) erhält und einen **Rückgabewert** liefert. Eine **Prozedur** (in Java/C#: Methode mit \`void\`) führt Anweisungen aus, liefert aber **keinen** Rückgabewert.

${F}
FUNKTION brutto(netto, steuersatz)
  RÜCKGABE netto + netto * steuersatz / 100
ENDE FUNKTION

PROZEDUR zeigeRechnung(betrag)
  AUSGABE "Rechnungsbetrag: ", betrag, " €"
ENDE PROZEDUR

ergebnis ← brutto(200, 19)      // Aufruf → 238
zeigeRechnung(ergebnis)
${F}

**Begriffe:**

| Begriff | Bedeutung | im Beispiel |
|---|---|---|
| **Parameter** (formaler Parameter) | Platzhalter in der Definition | \`netto\`, \`steuersatz\` |
| **Argument** (aktueller Parameter) | konkreter Wert beim Aufruf | \`200\`, \`19\` |
| **Rückgabewert** | Ergebnis, das an die Aufrufstelle zurückgeht | 238 |
| **Signatur** | Name + Parameterliste (+ Typen) | \`brutto(netto, steuersatz)\` |
| **lokale Variable** | existiert nur innerhalb der Funktion | – |

**Wichtig beim Nachvollziehen:**
- Argumente werden den Parametern in der **Reihenfolge** zugeordnet.
- \`RÜCKGABE\` beendet die Funktion **sofort**.
- Der Aufruf wird im Ausdruck durch den Rückgabewert **ersetzt**: \`x ← brutto(100, 19) * 2\` → \`x ← 119 * 2\`.
- Verschachtelte Aufrufe \`f(g(3))\` werden **von innen nach außen** ausgewertet.

**Parameterübergabe:**
- **Call by Value** (Wertübergabe): Die Funktion erhält eine **Kopie**. Änderungen am Parameter wirken nicht nach außen. Standard für einfache Typen (int, double, bool) in Java, C#, Python.
- **Call by Reference** (Referenzübergabe): Die Funktion arbeitet auf dem **Original**. In Java/C#/Python werden Objekte und Arrays über Referenzen übergeben – ändert die Funktion ein **Element** des Arrays, ist das außerhalb sichtbar. (C# kennt zusätzlich \`ref\`.)

**Vorteile von Funktionen:** Wiederverwendbarkeit (kein doppelter Code), Übersichtlichkeit, einzeln testbar (Unit-Tests), leichter wartbar, Arbeitsteilung im Team.`,
        },
        {
          type: 'visual',
          title: 'Funktion als Blackbox',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Argumente rein', text: 'brutto(200, 19): Die Werte 200 und 19 werden in netto und steuersatz kopiert.', icon: 'ArrowRightToLine' },
                { title: 'Verarbeitung', text: 'Lokale Berechnung innerhalb der Funktion – unsichtbar für den Aufrufer.', icon: 'Box' },
                { title: 'Rückgabewert raus', text: 'RÜCKGABE 238 – der Aufruf wird durch diesen Wert ersetzt.', icon: 'ArrowLeftFromLine' },
              ],
            },
          },
          caption: 'Wer eine Funktion benutzt, muss nur ihre Schnittstelle (Signatur) kennen – nicht ihr Innenleben (Abstraktion).',
        },
        {
          type: 'example',
          title: 'Funktion mit Schleife und Mehrfachaufruf',
          problem: `Welchen Wert gibt das Programm aus?\n\n${F}\nFUNKTION fakultaet(n)\n  erg ← 1\n  FÜR i VON 2 BIS n\n    erg ← erg * i\n  ENDE FÜR\n  RÜCKGABE erg\nENDE FUNKTION\n\nAUSGABE fakultaet(4) + fakultaet(3)\n${F}`,
          steps: [
            { label: 'fakultaet(4)', body: 'n = 4: erg = 1 → ·2 = 2 → ·3 = 6 → ·4 = **24**' },
            { label: 'fakultaet(3)', body: 'n = 3: erg = 1 → ·2 = 2 → ·3 = **6**' },
            { label: 'Ausdruck', body: '24 + 6 = **30**' },
            { label: 'Hinweis', body: 'Die Variablen `erg` und `i` sind **lokal** – jeder Aufruf hat seine eigenen. Der zweite Aufruf beginnt wieder mit erg = 1.' },
          ],
          result: '30',
        },
        {
          type: 'check',
          question: {
            id: 'p03-c06', kind: 'number', skill: 'prog.functions', difficulty: 2,
            prompt: `Welchen Wert gibt das Programm aus?\n\n${F}\nFUNKTION rabattpreis(preis, prozent)\n  RÜCKGABE preis - preis * prozent / 100\nENDE FUNKTION\n\nAUSGABE rabattpreis(200, 10) + rabattpreis(10, 200)\n${F}`,
            answer: 170,
            hints: ['Achte bei jedem Aufruf genau darauf, welches Argument zu welchem Parameter gehört.'],
            misconceptions: [{ answer: '360', error: 'parameter-reihenfolge', why: 'Beim zweiten Aufruf ist preis = 10 und prozent = 200 (Reihenfolge der Argumente!) – das ergibt 10 − 20 = −10, nicht 180.' }],
            explanation: `rabattpreis(200, 10) = 200 − 200 · 10 / 100 = 200 − 20 = 180

rabattpreis(10, 200) = 10 − 10 · 200 / 100 = 10 − 20 = −10

Summe: 180 + (−10) = **170**. (Ein „Rabatt“ von 200 % ist fachlich unsinnig – eine gute Funktion würde solche Argumente abweisen.)`,
          },
        },
        { type: 'practice', title: 'Übung: Funktionen (Generator)', generator: 'p.funktion', count: 4, difficulty: 2 },
        { type: 'practice', title: 'Übung: Funktionen aus dem Pool', questionIds: ['p03-q023', 'p03-q024', 'p03-q025', 'p03-q026', 'p03-q027', 'p03-q028', 'p03-q029', 'p03-q031', 'p03-q032'], count: 6, difficulty: 2 },
        { type: 'summary', points: ['Funktion = Parameter rein, Rückgabewert raus; Prozedur ohne Rückgabewert.', 'Argumente in der Reihenfolge der Parameter zuordnen.', 'RÜCKGABE beendet die Funktion sofort.', 'Call by Value: Kopie · Arrays/Objekte: Änderungen an Elementen wirken nach außen.'] },
      ],
    },
  ],

  /* ==================================================================== */
  questions: [
    {
      id: 'p03-q001', kind: 'number', skill: 'prog.array', difficulty: 1,
      prompt: `Was wird ausgegeben?\n\n${F}\nzahlen ← [12, 7, 33, 5, 18]\nAUSGABE zahlen[2]\n${F}`,
      answer: 33,
      misconceptions: [{ answer: '7', error: 'array-index-1', why: 'Index 2 ist das **dritte** Element (Zählung ab 0).' }],
      explanation: 'zahlen[0] = 12, zahlen[1] = 7, **zahlen[2] = 33**.',
    },
    {
      id: 'p03-q002', kind: 'number', skill: 'prog.array', difficulty: 1,
      prompt: 'Ein Array enthält **8 Elemente**. Welches ist der **größte gültige Index**?',
      answer: 7,
      misconceptions: [{ answer: '8', error: 'array-index-1', why: 'Bei 0-basierter Zählung reichen die Indizes von 0 bis LÄNGE − 1 = 7.' }],
      explanation: 'Indizes 0, 1, …, 7 → größter Index = 8 − 1 = **7**.',
    },
    {
      id: 'p03-q003', kind: 'single', skill: 'prog.array', difficulty: 2,
      prompt: 'Was passiert in Java bei folgendem Code?\n\n```java\nint[] werte = {4, 8, 15, 16, 23};\nSystem.out.println(werte[5]);\n```',
      options: ['Es tritt ein Laufzeitfehler auf (ArrayIndexOutOfBoundsException).', 'Es wird 23 ausgegeben.', 'Es wird 0 ausgegeben.', 'Es wird 16 ausgegeben.'],
      answer: 0,
      distractors: {
        '1': { why: '23 steht an Index 4 – dem letzten gültigen Index.', error: 'array-index-1' },
        '2': { why: 'Java liefert keinen Standardwert für ungültige Indizes, sondern wirft eine Ausnahme.', error: 'array-grenzen' },
        '3': { why: '16 steht an Index 3.', error: 'array-index-1' },
      },
      explanation: 'Das Array hat 5 Elemente, gültige Indizes 0–4. Index 5 liegt außerhalb → **ArrayIndexOutOfBoundsException** zur Laufzeit (kein Syntaxfehler, der Compiler bemerkt es nicht).',
    },
    {
      id: 'p03-q004', kind: 'number', skill: 'prog.array', difficulty: 2,
      prompt: `Welchen Wert gibt der Algorithmus aus?\n\n${F}\na ← [3, 1, 4, 1, 5]\na[1] ← a[0] + a[4]\na[3] ← a[1] * 2\nAUSGABE a[3]\n${F}`,
      answer: 16,
      misconceptions: [{ answer: '2', error: 'zuweisung-reihenfolge', why: 'a[1] wurde in Zeile 2 bereits auf 8 geändert.' }],
      explanation: 'a[1] = a[0] + a[4] = 3 + 5 = 8 → a[3] = 8 · 2 = **16**. Array: [3, 8, 4, 16, 5].',
    },
    {
      id: 'p03-q005', kind: 'text', skill: 'prog.array', difficulty: 2,
      prompt: `Welchen Inhalt hat das Array \`a\` nach Ausführung? Gib die Werte mit Komma getrennt an.\n\n${F}\na ← [0, 0, 0, 0, 0]\nFÜR i VON 0 BIS 4\n  a[i] ← i * 3 + 1\nENDE FÜR\n${F}`,
      accept: ['1, 4, 7, 10, 13', '1,4,7,10,13', '1 4 7 10 13', '[1, 4, 7, 10, 13]', '1; 4; 7; 10; 13'],
      misconceptions: [{ answer: '4, 7, 10, 13, 16', error: 'array-index-1', why: 'i beginnt bei 0: a[0] = 0 · 3 + 1 = 1.' }],
      explanation: 'i = 0 → 1 · i = 1 → 4 · i = 2 → 7 · i = 3 → 10 · i = 4 → 13 → **[1, 4, 7, 10, 13]**',
    },
    {
      id: 'p03-q006', kind: 'number', skill: 'prog.aggregate', difficulty: 1,
      prompt: `Welchen Wert gibt der Algorithmus aus?\n\n${F}\nlizenzen ← [25, 10, 40, 15]\nsumme ← 0\nFÜR i VON 0 BIS LÄNGE(lizenzen) - 1\n  summe ← summe + lizenzen[i]\nENDE FÜR\nAUSGABE summe\n${F}`,
      answer: 90,
      misconceptions: [{ answer: '75', error: 'array-off-by-one', why: 'Das letzte Element (15) fehlt – die Schleife läuft bis einschließlich LÄNGE − 1.' }, { answer: '65', error: 'array-index-1', why: 'Das erste Element (25) mit Index 0 fehlt.' }],
      explanation: '25 + 10 + 40 + 15 = **90**',
    },
    {
      id: 'p03-q007', kind: 'number', skill: 'prog.aggregate', difficulty: 1,
      prompt: `Welchen Wert gibt der Algorithmus aus?\n\n${F}\nnoten ← [2, 3, 1, 2, 4, 3]\nsumme ← 0\nFÜR i VON 0 BIS LÄNGE(noten) - 1\n  summe ← summe + noten[i]\nENDE FÜR\nAUSGABE summe / LÄNGE(noten)\n${F}`,
      answer: 2.5,
      tolerance: 0.001,
      misconceptions: [{ answer: '15', error: 'teilergebnis', why: 'Das ist die Summe; der Durchschnitt ist 15 / 6.' }, { answer: '3', error: 'array-off-by-one', why: '15 / 5 = 3 – es sind aber 6 Noten.' }],
      explanation: 'Summe = 2 + 3 + 1 + 2 + 4 + 3 = 15 · 15 / 6 = **2,5**',
    },
    {
      id: 'p03-q008', kind: 'number', skill: 'prog.aggregate', difficulty: 3,
      prompt: `Welchen Wert gibt der Algorithmus aus?\n\n${F}\nwerte ← [3, 8, 5, 12, 2]\nsumme ← 0\nFÜR i VON 0 BIS LÄNGE(werte) - 1\n  summe ← summe + werte[i]\nENDE FÜR\nschnitt ← summe / LÄNGE(werte)\nanzahl ← 0\nFÜR i VON 0 BIS LÄNGE(werte) - 1\n  WENN werte[i] > schnitt DANN\n    anzahl ← anzahl + 1\n  ENDE WENN\nENDE FÜR\nAUSGABE anzahl\n${F}`,
      answer: 2,
      hints: ['Zuerst den Durchschnitt berechnen, dann zählen, wie viele Werte darüber liegen.'],
      explanation: 'summe = 30, schnitt = 30 / 5 = 6 · Werte > 6: 8 und 12 → **2**',
    },
    {
      id: 'p03-q009', kind: 'free', skill: 'prog.aggregate', difficulty: 2,
      prompt: 'Ein Kollege initialisiert bei der Suche nach dem **Maximum** eines Arrays die Variable mit `max ← 0`. Erläutern Sie, in welchem Fall das zu einem falschen Ergebnis führt, und wie man es richtig macht.',
      modelAnswer: 'Enthält das Array ausschließlich negative Werte (z. B. Temperaturen −5, −3, −8), ist keiner größer als 0, die Bedingung werte[i] > max wird nie WAHR und als Maximum wird 0 ausgegeben – ein Wert, der gar nicht im Array vorkommt. Richtig ist, max mit dem ersten Element zu initialisieren (max ← werte[0]) und den Vergleich ab Index 1 zu beginnen (alternativ mit dem kleinstmöglichen Wert des Datentyps).',
      keywords: ['negative Werte', 'werte[0]', 'erstes Element', 'kommt nicht vor'],
      explanation: 'Grundregel: Extremwerte immer mit einem tatsächlich vorhandenen Element starten.',
    },
    {
      id: 'p03-q010', kind: 'number', skill: 'prog.aggregate', difficulty: 2,
      prompt: `Welchen Wert hat \`pos\` am Ende?\n\n${F}\npreise ← [19, 12, 25, 12, 30]\nmin ← preise[0]\npos ← 0\nFÜR i VON 1 BIS LÄNGE(preise) - 1\n  WENN preise[i] < min DANN\n    min ← preise[i]\n    pos ← i\n  ENDE WENN\nENDE FÜR\n${F}`,
      answer: 1,
      misconceptions: [{ answer: '3', error: 'vergleich-gleich', why: 'Bei Index 3 ist 12 < 12 FALSCH – das erste Vorkommen bleibt gespeichert.' }, { answer: '2', error: 'array-index-1', why: 'Index-Zählung beginnt bei 0: Das erste Minimum steht an Index 1.' }, { answer: '12', error: 'wert-statt-index', why: '12 ist der Wert. Gefragt ist die Position pos.' }],
      explanation: 'i = 1: 12 < 19 → min = 12, pos = 1 · i = 2: 25 < 12 nein · i = 3: 12 < 12 **nein** · i = 4: 30 < 12 nein → pos = **1**',
    },
    {
      id: 'p03-q011', kind: 'number', skill: 'prog.aggregate', difficulty: 2,
      prompt: `Berechne die **Spannweite** (größter minus kleinster Wert). Was wird ausgegeben?\n\n${F}\nlatenz ← [14, 9, 31, 22, 17]\nmax ← latenz[0]\nmin ← latenz[0]\nFÜR i VON 1 BIS LÄNGE(latenz) - 1\n  WENN latenz[i] > max DANN\n    max ← latenz[i]\n  ENDE WENN\n  WENN latenz[i] < min DANN\n    min ← latenz[i]\n  ENDE WENN\nENDE FÜR\nAUSGABE max - min\n${F}`,
      answer: 22,
      explanation: 'max = 31, min = 9 → 31 − 9 = **22** (ms Schwankung der Latenz).',
    },
    {
      id: 'p03-q012', kind: 'number', skill: 'prog.search', difficulty: 1,
      prompt: `Welchen Wert hat \`ergebnis\`?\n\n${F}\nFUNKTION suche(liste, ziel)\n  FÜR i VON 0 BIS LÄNGE(liste) - 1\n    WENN liste[i] = ziel DANN\n      RÜCKGABE i\n    ENDE WENN\n  ENDE FÜR\n  RÜCKGABE -1\nENDE FUNKTION\n\nraeume ← [101, 104, 210, 215, 302]\nergebnis ← suche(raeume, 215)\n${F}`,
      answer: 3,
      misconceptions: [{ answer: '4', error: 'array-index-1', why: '215 ist das vierte Element und hat daher den Index 3.' }],
      explanation: 'Vergleiche bei Index 0, 1, 2 FALSCH, bei **Index 3** WAHR → RÜCKGABE 3.',
    },
    {
      id: 'p03-q013', kind: 'free', skill: 'prog.search', difficulty: 2,
      prompt: 'Warum gibt eine Suchfunktion bei „nicht gefunden“ üblicherweise **−1** zurück und nicht 0?',
      modelAnswer: '0 ist ein gültiger Index – er bezeichnet das erste Element. Würde die Funktion bei „nicht gefunden“ 0 liefern, könnte der Aufrufer nicht unterscheiden, ob das Element an erster Stelle steht oder fehlt. −1 kann nie ein gültiger Index sein und eignet sich deshalb als eindeutige Kennung.',
      keywords: ['gültiger Index', 'erstes Element', 'unterscheiden', 'eindeutig'],
      explanation: 'Rückgabewerte, die „Fehler“ oder „nicht vorhanden“ bedeuten, dürfen nicht mit gültigen Ergebnissen kollidieren.',
    },
    {
      id: 'p03-q014', kind: 'number', skill: 'prog.search', difficulty: 2,
      prompt: 'Eine lineare Suche durchsucht ein unsortiertes Array mit **2.000 Elementen**. Wie viele Vergleiche sind im **schlechtesten Fall** nötig?',
      answer: 2000,
      misconceptions: [{ answer: '1000', error: 'suche-aufwand', why: 'n/2 ist der **durchschnittliche** Aufwand. Im schlechtesten Fall (letztes Element oder nicht vorhanden) wird jedes Element geprüft.' }, { answer: '11', error: 'suche-aufwand', why: '≈ log₂ 2000 gilt für die binäre Suche – und die setzt sortierte Daten voraus.' }],
      explanation: 'Schlechtester Fall: Element steht ganz hinten oder fehlt → **2.000** Vergleiche.',
    },
    {
      id: 'p03-q015', kind: 'single', skill: 'prog.search', difficulty: 2,
      prompt: 'Welche **Voraussetzung** muss erfüllt sein, damit die **binäre Suche** eingesetzt werden kann?',
      options: ['Die Daten müssen sortiert sein.', 'Das Array muss eine gerade Anzahl Elemente haben.', 'Die Daten müssen Zahlen sein.', 'Das gesuchte Element muss vorhanden sein.'],
      answer: 0,
      distractors: {
        '1': { why: 'Bei ungerader Anzahl gibt es ein eindeutiges mittleres Element, bei gerader wählt man eines der beiden.', error: 'binaere-suche' },
        '2': { why: 'Auch Texte lassen sich (alphabetisch) sortiert binär durchsuchen.', error: 'binaere-suche' },
        '3': { why: 'Auch eine erfolglose Suche funktioniert – sie endet, wenn der Bereich leer ist.', error: 'binaere-suche' },
      },
      explanation: 'Nur bei **sortierten** Daten weiß man nach dem Vergleich mit der Mitte, in welcher Hälfte das Ziel liegen muss.',
    },
    {
      id: 'p03-q016', kind: 'free', skill: 'prog.search', difficulty: 3,
      prompt: 'Die Elektro Krämer GmbH durchsucht eine Artikelliste mit **1 Mio. Einträgen** mehrmals pro Sekunde. Vergleichen Sie lineare und binäre Suche hinsichtlich **Voraussetzung** und **Aufwand** und geben Sie eine Empfehlung.',
      modelAnswer: 'Lineare Suche: keine Voraussetzung (funktioniert auch unsortiert), Aufwand im schlechtesten Fall n = 1.000.000 Vergleiche, im Mittel ca. 500.000. Binäre Suche: setzt sortierte Daten voraus, halbiert bei jedem Schritt den Suchbereich, Aufwand ca. log₂(1.000.000) ≈ 20 Vergleiche. Empfehlung: Da sehr häufig gesucht wird, lohnt es sich, die Liste einmal zu sortieren (bzw. sortiert zu halten) und binär zu suchen – oder einen Index/eine Hashtabelle bzw. eine Datenbank mit Index zu nutzen.',
      keywords: ['sortiert', 'n Vergleiche', 'log₂', '≈ 20', 'Empfehlung', 'Index'],
      explanation: 'Entscheidend: Voraussetzung (Sortierung) gegen Aufwand abwägen; bei vielen Suchen amortisiert sich das Sortieren.',
    },
    {
      id: 'p03-q017', kind: 'text', skill: 'prog.sort', difficulty: 2,
      prompt: 'Wie sieht das Array **[4, 9, 1, 7, 3]** nach dem **ersten Durchlauf** von Bubble Sort (aufsteigend) aus? Gib die Werte mit Komma getrennt an.',
      accept: ['4, 1, 7, 3, 9', '4,1,7,3,9', '4 1 7 3 9', '[4, 1, 7, 3, 9]', '4; 1; 7; 3; 9'],
      misconceptions: [{ answer: '1, 3, 4, 7, 9', error: 'bubblesort-komplett', why: 'Das ist das vollständig sortierte Array. Nach einem Durchlauf steht nur die 9 sicher am Ende.' }],
      explanation: '4 > 9 nein · 9 > 1 → [4, 1, 9, 7, 3] · 9 > 7 → [4, 1, 7, 9, 3] · 9 > 3 → **[4, 1, 7, 3, 9]**',
    },
    {
      id: 'p03-q018', kind: 'number', skill: 'prog.sort', difficulty: 1,
      prompt: 'Wie viele **Vergleiche** benötigt **ein** Durchlauf von Bubble Sort (ohne Optimierung) bei einem Array mit **6 Elementen**?',
      answer: 5,
      misconceptions: [{ answer: '6', error: 'bubblesort-vergleiche', why: 'Es werden Nachbarpaare verglichen: (0,1), (1,2), …, (4,5) – das sind n − 1 = 5.' }],
      explanation: 'Paare (0,1), (1,2), (2,3), (3,4), (4,5) → **5** Vergleiche.',
    },
    {
      id: 'p03-q019', kind: 'number', skill: 'prog.sort', difficulty: 2,
      prompt: 'Wie viele Durchläufe benötigt Bubble Sort bei einem Array mit **8 Elementen** im **schlechtesten Fall** höchstens, bis das Array garantiert sortiert ist?',
      answer: 7,
      misconceptions: [{ answer: '8', error: 'bubblesort-durchlaeufe', why: 'Nach n − 1 Durchläufen stehen die n − 1 größten Elemente korrekt – das letzte (kleinste) dann automatisch auch.' }],
      explanation: 'Jeder Durchlauf bringt mindestens ein weiteres Element an seinen Platz → n − 1 = **7** Durchläufe.',
    },
    {
      id: 'p03-q020', kind: 'order', skill: 'prog.sort', difficulty: 2,
      prompt: 'Bringe die Zwischenstände des **ersten Durchlaufs** von Bubble Sort für das Array **[4, 2, 3, 1]** in die richtige Reihenfolge.',
      items: ['[4, 2, 3, 1] (Start)', '[2, 4, 3, 1] (nach i = 0)', '[2, 3, 4, 1] (nach i = 1)', '[2, 3, 1, 4] (nach i = 2)'],
      explanation: '4 > 2 tauschen → 4 > 3 tauschen → 4 > 1 tauschen. Die 4 ist nach rechts „aufgestiegen“.',
    },
    {
      id: 'p03-q021', kind: 'free', skill: 'prog.sort', difficulty: 3,
      prompt: 'Erläutern Sie zwei Möglichkeiten, **Bubble Sort zu optimieren**, und begründen Sie, warum sie funktionieren.',
      modelAnswer: '1. Die innere Schleife wird mit jedem Durchlauf um ein Element kürzer (bis LÄNGE − 1 − durchlauf), weil nach k Durchläufen die k größten Elemente bereits am Ende an ihrem endgültigen Platz stehen; Vergleiche dort sind überflüssig. 2. Eine Variable „getauscht“ merkt sich, ob im aktuellen Durchlauf mindestens ein Tausch stattfand. Gab es keinen Tausch, ist das Array sortiert und der Algorithmus kann vorzeitig abbrechen – bei (fast) sortierten Daten spart das sehr viele Durchläufe.',
      keywords: ['innere Schleife kürzer', 'größte Elemente am Ende', 'getauscht', 'vorzeitig abbrechen'],
      explanation: 'Beide Optimierungen ändern nichts am Ergebnis, nur an der Anzahl der Vergleiche. Der schlechteste Fall bleibt O(n²).',
    },
    {
      id: 'p03-q022', kind: 'table', skill: 'prog.sort', difficulty: 2,
      prompt: 'Führe den **ersten Durchlauf** von Bubble Sort für **[7, 3, 9, 2]** durch. Trage ein, ob getauscht wird (**ja**/**nein**), und den Array-Zustand danach (Werte mit Komma).',
      columns: [{ key: 'tausch', label: 'Tausch?', type: 'text' }, { key: 'arr', label: 'Array danach', type: 'text' }],
      rows: [
        { label: 'i = 0: 7 > 3?', cells: { tausch: { answer: 'ja' }, arr: { answer: '3, 7, 9, 2', accept: ['3,7,9,2', '[3, 7, 9, 2]', '3 7 9 2'] } } },
        { label: 'i = 1: 7 > 9?', cells: { tausch: { answer: 'nein' }, arr: { answer: '3, 7, 9, 2', accept: ['3,7,9,2', '[3, 7, 9, 2]', '3 7 9 2'] } } },
        { label: 'i = 2: 9 > 2?', cells: { tausch: { answer: 'ja' }, arr: { answer: '3, 7, 2, 9', accept: ['3,7,2,9', '[3, 7, 2, 9]', '3 7 2 9'] } } },
      ],
      explanation: '| i | Vergleich | Tausch | Array |\n|---|---|---|---|\n| 0 | 7 > 3 | ja | [3, 7, 9, 2] |\n| 1 | 7 > 9 | nein | [3, 7, 9, 2] |\n| 2 | 9 > 2 | ja | [3, 7, 2, 9] |',
    },
    {
      id: 'p03-q023', kind: 'number', skill: 'prog.functions', difficulty: 1,
      prompt: `Welchen Wert hat \`x\`?\n\n${F}\nFUNKTION quadrat(n)\n  RÜCKGABE n * n\nENDE FUNKTION\n\nx ← quadrat(3) + quadrat(4)\n${F}`,
      answer: 25,
      misconceptions: [{ answer: '49', error: 'funktion-aufruf', why: 'quadrat(3 + 4) wäre 49. Hier werden zwei getrennte Aufrufe addiert: 9 + 16.' }],
      explanation: 'quadrat(3) = 9, quadrat(4) = 16 → x = **25**',
    },
    {
      id: 'p03-q024', kind: 'free', skill: 'prog.functions', difficulty: 1,
      prompt: 'Erläutern Sie den Unterschied zwischen einer **Funktion** und einer **Prozedur** und geben Sie je ein Beispiel.',
      modelAnswer: 'Eine Funktion liefert nach ihrer Ausführung einen Rückgabewert an die Aufrufstelle zurück, z. B. berechneBrutto(netto) gibt den Bruttobetrag zurück. Eine Prozedur führt nur Anweisungen aus und liefert keinen Rückgabewert, z. B. druckeRechnung(rechnung) oder speichereLog(text). In Java/C# entspricht eine Prozedur einer Methode mit Rückgabetyp void.',
      keywords: ['Rückgabewert', 'kein Rückgabewert', 'void', 'Beispiel'],
      explanation: 'Kern: Rückgabewert ja/nein.',
    },
    {
      id: 'p03-q025', kind: 'match', skill: 'prog.functions', difficulty: 1,
      prompt: 'Ordne die Begriffe zum Beispiel `ergebnis ← brutto(200, 19)` mit der Definition `FUNKTION brutto(netto, steuersatz)` zu.',
      left: ['netto, steuersatz', '200, 19', 'brutto(netto, steuersatz)', 'der Wert, der in ergebnis gespeichert wird'],
      right: ['formale Parameter', 'Argumente (aktuelle Parameter)', 'Signatur', 'Rückgabewert'],
      answer: [0, 1, 2, 3],
      explanation: 'Parameter stehen in der Definition, Argumente beim Aufruf; Name + Parameterliste = Signatur; RÜCKGABE liefert den Rückgabewert.',
    },
    {
      id: 'p03-q026', kind: 'number', skill: 'prog.functions', difficulty: 2,
      prompt: `Parameter werden als **Wert** übergeben (call by value). Was wird ausgegeben?\n\n${F}\nFUNKTION erhoehe(z)\n  z ← z + 10\n  RÜCKGABE z\nENDE FUNKTION\n\na ← 5\nb ← erhoehe(a)\nAUSGABE a\n${F}`,
      answer: 5,
      misconceptions: [{ answer: '15', error: 'call-by-reference-angenommen', why: 'z ist eine Kopie von a. Die Änderung wirkt nur lokal – a bleibt 5. (15 steht in b.)' }],
      explanation: 'Beim Aufruf wird der **Wert** 5 in z kopiert. z wird 15 und zurückgegeben (b = 15), a bleibt **5**.',
    },
    {
      id: 'p03-q027', kind: 'number', skill: 'prog.functions', difficulty: 3,
      prompt: `Arrays werden – wie in Java, C# und Python – als **Referenz** übergeben. Was wird ausgegeben?\n\n${F}\nPROZEDUR verdoppleAlle(liste)\n  FÜR i VON 0 BIS LÄNGE(liste) - 1\n    liste[i] ← liste[i] * 2\n  ENDE FÜR\nENDE PROZEDUR\n\nzahlen ← [3, 5, 8]\nverdoppleAlle(zahlen)\nAUSGABE zahlen[0] + zahlen[2]\n${F}`,
      answer: 22,
      hints: ['Die Prozedur arbeitet auf demselben Array wie das Hauptprogramm.'],
      misconceptions: [{ answer: '11', error: 'referenz-uebergabe', why: 'Das Array wird nicht kopiert – die Prozedur ändert die Elemente des Originals.' }],
      explanation: 'Die Prozedur verändert das Original: zahlen = [6, 10, 16] → 6 + 16 = **22**.',
    },
    {
      id: 'p03-q028', kind: 'free', skill: 'prog.functions', difficulty: 2,
      prompt: 'Nennen und erläutern Sie **drei Vorteile**, die die Zerlegung eines Programms in Funktionen bietet.',
      modelAnswer: '1. Wiederverwendbarkeit: Einmal geschriebener Code (z. B. berechneBrutto) kann an vielen Stellen aufgerufen werden, ohne ihn zu kopieren. 2. Übersichtlichkeit/Lesbarkeit: Das Hauptprogramm wird kürzer und beschreibt den Ablauf auf hoher Ebene. 3. Testbarkeit: Jede Funktion kann einzeln mit Unit-Tests geprüft werden. Weitere: Wartbarkeit (Änderungen nur an einer Stelle), Arbeitsteilung im Team, Kapselung von Details.',
      keywords: ['Wiederverwendbarkeit', 'Übersichtlichkeit', 'Testbarkeit', 'Wartbarkeit', 'Arbeitsteilung'],
      explanation: 'Drei Vorteile mit kurzer Erläuterung ergeben die volle Punktzahl.',
    },
    {
      id: 'p03-q029', kind: 'free', skill: 'prog.functions', difficulty: 3,
      prompt: 'Schreiben Sie in Pseudocode eine Funktion `zaehleUeber(liste, grenze)`, die zurückgibt, **wie viele Elemente** des Arrays `liste` **größer als** `grenze` sind. Zeigen Sie außerdem einen Beispielaufruf.',
      modelAnswer: `FUNKTION zaehleUeber(liste, grenze)\n  anzahl ← 0\n  FÜR i VON 0 BIS LÄNGE(liste) - 1\n    WENN liste[i] > grenze DANN\n      anzahl ← anzahl + 1\n    ENDE WENN\n  ENDE FÜR\n  RÜCKGABE anzahl\nENDE FUNKTION\n\ntemperaturen ← [24, 28, 26, 30]\nAUSGABE zaehleUeber(temperaturen, 27)   // 2`,
      keywords: ['FUNKTION', 'anzahl ← 0', 'FÜR i VON 0 BIS LÄNGE − 1', '> grenze', 'RÜCKGABE anzahl', 'Aufruf'],
      explanation: 'Wichtig: lokaler Zähler mit 0, Schleife über alle Indizes, Vergleich mit dem Parameter (nicht mit einer festen Zahl), RÜCKGABE **nach** der Schleife.',
    },
    {
      id: 'p03-q030', kind: 'number', skill: 'prog.aggregate', difficulty: 2,
      prompt: `**Beleg – Auslastung der Server (CPU in %) um 10 Uhr:**\n\n| Server | SRV-DC01 | SRV-FS01 | SRV-SQL01 | SRV-WEB01 | SRV-MAIL01 | SRV-APP01 |\n|---|---|---|---|---|---|---|\n| CPU % | 35 | 82 | 91 | 80 | 47 | 85 |\n\nEin Überwachungsskript arbeitet so. Welchen Wert gibt es aus?\n\n${F}\ncpu ← [35, 82, 91, 80, 47, 85]\nkritisch ← 0\nFÜR i VON 0 BIS LÄNGE(cpu) - 1\n  WENN cpu[i] > 80 DANN\n    kritisch ← kritisch + 1\n  ENDE WENN\nENDE FÜR\nAUSGABE kritisch\n${F}`,
      answer: 3,
      misconceptions: [{ answer: '4', error: 'grenzwert-vergleich', why: '80 > 80 ist FALSCH – SRV-WEB01 zählt nicht als kritisch.' }],
      explanation: 'Werte > 80: 82, 91, 85 → **3** (80 ist nicht größer als 80).',
    },
    {
      id: 'p03-q031', kind: 'number', skill: 'prog.functions', difficulty: 2,
      prompt: `Welchen Wert gibt das Programm aus?\n\n${F}\nFUNKTION g(x)\n  RÜCKGABE x + 3\nENDE FUNKTION\n\nFUNKTION f(x)\n  RÜCKGABE 2 * x\nENDE FUNKTION\n\nAUSGABE f(g(4)) - g(f(4))\n${F}`,
      answer: 3,
      hints: ['Innere Aufrufe zuerst auswerten.'],
      explanation: 'f(g(4)) = f(7) = 14 · g(f(4)) = g(8) = 11 · 14 − 11 = **3**. Die Reihenfolge der Verschachtelung macht einen Unterschied!',
    },
    {
      id: 'p03-q032', kind: 'number', skill: 'prog.functions', difficulty: 2,
      prompt: `Welchen Wert gibt das Programm aus?\n\n${F}\nFUNKTION fakultaet(n)\n  erg ← 1\n  FÜR i VON 2 BIS n\n    erg ← erg * i\n  ENDE FÜR\n  RÜCKGABE erg\nENDE FUNKTION\n\nAUSGABE fakultaet(5)\n${F}`,
      answer: 120,
      misconceptions: [{ answer: '24', error: 'schleife-off-by-one', why: '5 gehört zur Schleife dazu: 2 · 3 · 4 · 5.' }, { answer: '0', error: 'initialwert-fehler', why: 'erg startet bei 1, nicht bei 0.' }],
      explanation: '1 · 2 · 3 · 4 · 5 = **120**',
    },
    {
      id: 'p03-q033', kind: 'text', skill: 'prog.array', difficulty: 2,
      prompt: `Zeichenketten lassen sich wie Arrays indizieren. Was wird ausgegeben?\n\n${F}\nhost ← "SRVHAM01"\nAUSGABE host[3] + host[LÄNGE(host) - 1]\n${F}`,
      accept: ['H1'],
      hints: ['Index 0 = S, 1 = R, 2 = V, …', 'LÄNGE("SRVHAM01") = 8 → letzter Index 7.'],
      misconceptions: [{ answer: 'V0', error: 'array-index-1', why: 'Du hast ab 1 gezählt. host[3] ist das vierte Zeichen (H) und der letzte Index ist 7 (Zeichen 1).' }],
      explanation: 'host[3] = **H**, host[7] = **1** → Verkettung „**H1**“.',
    },
    {
      id: 'p03-q034', kind: 'number', skill: 'prog.aggregate', difficulty: 3,
      prompt: `**Beleg – Monatsumsätze Webshop 2026 (in Tsd. €), gespeichert in einem Array (Januar = Index 0):**\n\n| Jan | Feb | Mär | Apr | Mai | Jun | Jul | Aug | Sep | Okt | Nov | Dez |\n|---|---|---|---|---|---|---|---|---|---|---|---|\n| 40 | 38 | 45 | 52 | 49 | 61 | 58 | 50 | 47 | 55 | 63 | 70 |\n\nDas folgende Skript soll den Umsatz des **2. Quartals** (April–Juni) berechnen. Welchen Wert gibt es aus?\n\n${F}\numsatz ← [40, 38, 45, 52, 49, 61, 58, 50, 47, 55, 63, 70]\nsumme ← 0\nFÜR i VON 3 BIS 5\n  summe ← summe + umsatz[i]\nENDE FÜR\nAUSGABE summe\n${F}`,
      answer: 162,
      hints: ['April ist der 4. Monat – welchen Index hat er?'],
      misconceptions: [{ answer: '168', error: 'array-index-1', why: 'Index 4–6 wären Mai–Juli. Index 3 = April, 4 = Mai, 5 = Juni.' }],
      explanation: 'Index 3 = April (52), 4 = Mai (49), 5 = Juni (61) → 52 + 49 + 61 = **162** Tsd. € – das Skript ist korrekt.',
    },
  ],
};
