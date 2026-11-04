import type { Module } from '../types';

/* Wiederverwendete Belege */
const ASCII_AUSZUG =
  '**Auszug aus der ASCII-Tabelle:** `0` = 48 (0x30) · `A` = 65 (0x41) · `a` = 97 (0x61) · Leerzeichen = 32 (0x20). Ziffern und Buchstaben sind lückenlos durchnummeriert.';

const CSV_GERAETE = `\`\`\`
InvNr;Typ;Standort;Preis
G01;Notebook;Hamburg;1249,00
G02;Monitor;Berlin;219,90
G03;"Drucker; Farbe";Hamburg;389,00
G04;Notebook;Berlin;1099,00
\`\`\``;

export const d04: Module = {
  id: 'd04',
  nr: 4,
  area: 'daten',
  title: 'Daten darstellen: Zeichencodes, Dateiformate & Datenmengen',
  short: 'Zahlensysteme im Datenkontext, ASCII und Unicode/UTF-8, Dateiformate beraten, CSV/XML/JSON lesen, Datenqualität und Speicherbedarf von Bild, Audio und Video.',
  icon: 'FileCode',
  relevance: 'ap1',
  prerequisites: ['m04'],
  generators: ['daten.numconv', 'daten.ascii', 'daten.utfbytes', 'daten.bildspeicher', 'daten.audio', 'daten.video'],
  skills: [
    { id: 'data.zahlensysteme', module: 'd04', title: 'Zahlen in Dual, Hex und Oktal darstellen', requires: ['bin.dec2bin'] },
    { id: 'data.zeichencodes', module: 'd04', title: 'ASCII-Codes lesen und umrechnen', requires: ['data.zahlensysteme'] },
    { id: 'data.unicode', module: 'd04', title: 'Unicode und UTF-8: Byte je Zeichen, Umlaut-Probleme', requires: ['data.zeichencodes'] },
    { id: 'data.dateiformate', module: 'd04', title: 'Dateiformate unterscheiden und beraten' },
    { id: 'data.austausch', module: 'd04', title: 'Austauschformate CSV, XML und JSON lesen' },
    { id: 'data.qualitaet', module: 'd04', title: 'Datenqualität bewerten und in Prozent angeben' },
    { id: 'data.bildspeicher', module: 'd04', title: 'Bildspeicher aus cm und ppi berechnen', requires: ['calc.units'] },
    { id: 'data.mediengroesse', module: 'd04', title: 'Speicherbedarf von Audio und Video berechnen', requires: ['calc.units'] },
  ],
  lessons: [
    /* ------------------------------------------------------------ */
    {
      id: 'd04-l01',
      title: 'Zahlensysteme im Datenkontext: Dual, Hex, Oktal',
      minutes: 20,
      relevance: 'ap1',
      skills: ['data.zahlensysteme'],
      simple: `Ein Computer kennt nur zwei Zustände: Strom an (1) oder aus (0). Jede Zahl, jeder Buchstabe und jedes Bild wird deshalb als Folge von Nullen und Einsen gespeichert. Damit Menschen diese langen Folgen lesen können, schreibt man sie kürzer auf: im **Hexadezimalsystem** (Basis 16) oder im **Oktalsystem** (Basis 8). Das ist wie eine Telefonnummer, die du in Zweiergruppen liest – die Nummer bleibt gleich, sie ist nur leichter zu merken. Eine Hexziffer steht immer für genau 4 Bit, eine Oktalziffer für genau 3 Bit.

**Merke:** Hex = 4 Bit je Ziffer, Oktal = 3 Bit je Ziffer – so rechnest du ohne Taschenrechner zwischen Dual, Hex und Oktal um.`,
      steps: [
        {
          type: 'explain',
          title: 'Gleiche Bits – andere Bedeutung',
          body: `Im Speicher steht nur eine Bitfolge, z. B. \`0100 0001\`. Was sie **bedeutet**, entscheidet das Programm, das sie liest (der **Datentyp**):

| Gelesen als … | Bedeutung von 0100 0001 |
|---|---|
| Ganzzahl ohne Vorzeichen | 65 |
| Hexadezimalzahl | 0x41 |
| ASCII-Zeichen | \`A\` |
| Teil eines Bildes | ein Helligkeitswert (65 von 255) |

Deshalb musst du bei Daten immer fragen: **Welches Format, welche Codierung?** Genau darum geht es in diesem Modul.

**Die vier Zahlensysteme**

| System | Basis | Ziffern | Kennzeichnung in der IT | Typischer Einsatz |
|---|---|---|---|---|
| Dual (binär) | 2 | 0, 1 | \`0b1010\` oder 1010₂ | Bits im Speicher, Subnetzmasken |
| Oktal | 8 | 0–7 | \`0o17\`, in manchen Sprachen führende Null \`017\` | Linux-Dateirechte (\`chmod 754\`) |
| Dezimal | 10 | 0–9 | ohne Kennzeichnung | Alltag |
| Hexadezimal | 16 | 0–9, A–F (A = 10 … F = 15) | \`0x1A\`, \`#FF8800\` (Farben), \`1Ah\` | MAC- und IPv6-Adressen, Farbcodes, Speicheradressen |

**Achtung Oktal-Falle:** In manchen Programmiersprachen (z. B. C, Java) bedeutet eine führende Null „Oktal“: \`017\` ist dort 15, nicht 17.

**Was du schon kennst:** Dual ↔ Dezimal (Stellenwerte 128, 64, 32 …, Subtraktionsmethode) steht im Modul **Binärsystem (m04)**, das Hexadezimalsystem im Modul **IPv6 (m07, Lektion 2)**. Hier kommt der Datenkontext dazu: Oktal, 16-Bit-Werte und negative Zahlen.`,
        },
        {
          type: 'explain',
          title: 'Umrechnen über Bitgruppen – und negative Zahlen',
          body: `**Dual ↔ Hex (Vierergruppen):** Teile die Dualzahl von rechts in Gruppen zu 4 Bit (ein **Nibble**). Jede Gruppe ist genau eine Hexziffer.

\`1011 0111\` → \`1011\` = 11 = B, \`0111\` = 7 → **0xB7**

**Dual ↔ Oktal (Dreiergruppen):** Teile die Dualzahl von rechts in Gruppen zu 3 Bit. Jede Gruppe ist eine Oktalziffer (0–7).

\`10 110 111\` → 2, 6, 7 → **267** (oktal)

**Dezimal → Hex (Restwertmethode):** Teile wiederholt durch 16 und lies die Reste von **unten nach oben**: 183 : 16 = 11 Rest 7, 11 : 16 = 0 Rest 11 (B) → **B7**.

**Hex → Dezimal (Stellenwerte):** 0xB7 = 11 · 16 + 7 · 1 = **183**.

**Wertebereiche:** Mit n Bit gibt es 2ⁿ Werte. Ohne Vorzeichen reicht das von 0 bis 2ⁿ − 1 (8 Bit: 0–255, 16 Bit: 0–65.535).

**Negative Zahlen – das Zweierkomplement (Grundidee):** Bei Ganzzahlen **mit** Vorzeichen zeigt das höchste Bit an, ob die Zahl negativ ist (1 = negativ). Gespeichert wird sie im **Zweierkomplement**: Betrag binär schreiben, alle Bits umdrehen (invertieren), 1 addieren.

| Schritt | Beispiel −5 in 8 Bit |
|---|---|
| Betrag 5 | 0000 0101 |
| invertieren | 1111 1010 |
| + 1 | **1111 1011** |

Wertebereich mit Vorzeichen in 8 Bit: **−128 bis +127**. Dieselbe Bitfolge \`1111 1011\` ist ohne Vorzeichen 251 – wieder entscheidet der Datentyp. Für die AP1 genügt diese Grundidee; Rechenaufgaben zum Zweierkomplement sind dort selten.`,
        },
        {
          type: 'visual',
          title: 'Eine Zahl – vier Schreibweisen',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Dual', text: '1011 0111 – so liegt die Zahl im Speicher (8 Bit).', icon: 'Binary' },
                { title: 'Oktal', text: '267 – je 3 Bit eine Ziffer: 10|110|111.', icon: 'Hash' },
                { title: 'Dezimal', text: '183 – für Menschen im Alltag.', icon: 'Calculator' },
                { title: 'Hexadezimal', text: '0xB7 – je 4 Bit eine Ziffer: 1011|0111.', icon: 'Code' },
              ],
            },
          },
          caption: 'Alle vier Karten beschreiben denselben Wert. Hex und Oktal sind nur kürzere Schreibweisen der Bitfolge.',
        },
        {
          type: 'example',
          title: 'Ein Byte aus einem Speicherauszug deuten',
          problem: 'Ein Diagnoseprogramm zeigt das Byte **0xB7**. Gib es dual, dezimal und oktal an.',
          steps: [
            { label: 'Hex → Dual', body: 'B = 11 = `1011`, 7 = `0111` → **1011 0111**' },
            { label: 'Hex → Dezimal', body: '11 · 16 + 7 · 1 = 176 + 7 = **183**' },
            { label: 'Dual → Oktal', body: 'Von rechts in Dreiergruppen: `10` `110` `111` → 2, 6, 7 → **267**' },
            { label: 'Probe', body: '2 · 64 + 6 · 8 + 7 · 1 = 128 + 48 + 7 = 183 ✔' },
          ],
          result: '0xB7 = 1011 0111₂ = 183 = 267₈',
        },
        {
          type: 'check',
          question: {
            id: 'd04-c01', kind: 'number', skill: 'data.zahlensysteme', difficulty: 1,
            prompt: 'Rechne **0x2F** in eine Dezimalzahl um.',
            answer: 47,
            hints: ['F = 15. Die linke Ziffer zählt 16-fach.'],
            misconceptions: [{ answer: '35', error: 'hex-stellenwert', why: 'Du hast die Hexziffern wie Dezimalziffern gelesen (2 · 10 + 15). Die linke Stelle zählt 16-fach: 2 · 16 + 15.' }],
            explanation: '**47.** 2 · 16 + 15 · 1 = 32 + 15 = 47.\n\nHäufiger Fehler: die linke Stelle mit 10 statt mit 16 multiplizieren.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'd04-c02', kind: 'text', skill: 'data.zahlensysteme', difficulty: 1,
            prompt: 'Schreibe die Dualzahl **1101 0110** hexadezimal (ohne Präfix).',
            accept: ['D6', '0xD6', 'D6h'],
            placeholder: 'z. B. 3F',
            hints: ['Jede Vierergruppe ist eine Hexziffer.'],
            explanation: '**D6.** `1101` = 13 = D, `0110` = 6 → D6.',
          },
        },
        { type: 'practice', title: 'Übung: Zahlensysteme (8 Bit)', generator: 'daten.numconv', count: 3, difficulty: 1 },
        { type: 'practice', title: 'Übung: Zahlensysteme mit Oktal', generator: 'daten.numconv', count: 2, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Dieselbe Bitfolge bedeutet je nach Datentyp etwas anderes (Zahl, Zeichen, Farbwert).',
            'Hex: 4 Bit je Ziffer, Kennzeichnung 0x…; Oktal: 3 Bit je Ziffer (Linux-Rechte).',
            'Dezimal → Hex: Restwertmethode, Reste von unten lesen.',
            'n Bit ohne Vorzeichen: 0 bis 2ⁿ − 1; mit Vorzeichen (8 Bit): −128 bis +127.',
            'Zweierkomplement: invertieren + 1.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'd04-l02',
      title: 'Zeichencodes: ASCII, ISO 8859 und Unicode/UTF-8',
      minutes: 25,
      relevance: 'ap1',
      skills: ['data.zeichencodes', 'data.unicode'],
      simple: `Ein Computer speichert Buchstaben als Zahlen. Welche Zahl zu welchem Buchstaben gehört, steht in einer **Code-Tabelle** – wie ein Geheimcode, bei dem A = 65 bedeutet. **ASCII** ist die alte Tabelle mit nur 128 Zeichen, ohne Umlaute. **Unicode** ist die große Tabelle für alle Schriften der Welt, und **UTF-8** legt fest, wie viele Byte jedes Zeichen bekommt (1 bis 4). Liest ein Programm eine Datei mit der falschen Tabelle, wird aus „Müller“ plötzlich „MÃ¼ller“.

**Merke:** UTF-8 braucht für ASCII-Zeichen 1 Byte, für Umlaute 2, für € 3 und für Emojis 4 Byte.`,
      steps: [
        {
          type: 'explain',
          title: 'ASCII – der Ursprung',
          body: `**ASCII** (American Standard Code for Information Interchange) ordnet jedem Zeichen eine Zahl zu. Er nutzt **7 Bit**, also 2⁷ = **128 Zeichen**.

| Bereich (dezimal) | Hex | Inhalt |
|---|---|---|
| 0–31 und 127 | 0x00–0x1F, 0x7F | **Steuerzeichen** (nicht druckbar), z. B. 9 = Tabulator, 10 = Zeilenvorschub (LF), 13 = Wagenrücklauf (CR), 127 = DEL |
| 32 | 0x20 | Leerzeichen |
| 48–57 | 0x30–0x39 | Ziffern \`0\` bis \`9\` |
| 65–90 | 0x41–0x5A | Großbuchstaben \`A\` bis \`Z\` |
| 97–122 | 0x61–0x7A | Kleinbuchstaben \`a\` bis \`z\` |

**Zwei Merkregeln:**
- Ein Kleinbuchstabe liegt immer **32 (0x20) über** dem Großbuchstaben: \`A\` = 65, \`a\` = 97. Binär unterscheiden sie sich nur in einem Bit (Bit 5).
- Die **Ziffer** \`7\` ist **nicht** der Wert 7, sondern das Zeichen mit dem Code 48 + 7 = **55** (0x37).

**Zeilenende:** Windows beendet Textzeilen mit CR LF (13 10), Linux und macOS nur mit LF (10). Deshalb sehen Textdateien zwischen Systemen manchmal „zusammengeklebt“ aus.

**ISO 8859 – 8 Bit für Europa:** Das achte Bit erweitert auf 256 Zeichen. **ISO 8859-1 (Latin-1)** enthält die westeuropäischen Zeichen wie ä, ö, ü, ß, é. **ISO 8859-15 (Latin-9)** ergänzt u. a. das **€-Zeichen**. Problem: Für andere Schriften (Griechisch, Kyrillisch, Chinesisch) gibt es eigene, untereinander unverträgliche Tabellen.`,
        },
        {
          type: 'explain',
          title: 'Unicode und UTF-8, UTF-16, UTF-32',
          body: `**Unicode** ist ein **Zeichensatz** für alle Schriften der Welt (dazu Symbole und Emojis). Jedes Zeichen hat eine Nummer, den **Codepoint**: \`A\` = U+0041, \`ä\` = U+00E4, \`€\` = U+20AC, 😀 = U+1F600. Die ersten 128 Codepoints sind identisch mit ASCII.

Unicode sagt nur **welche Nummer** ein Zeichen hat. **Wie** diese Nummer in Bytes gespeichert wird, legt die **Kodierung** fest:

| Kodierung | Byte je Zeichen | Eigenschaften |
|---|---|---|
| **UTF-8** | 1 bis 4 (variabel) | ASCII-kompatibel, platzsparend für europäische Texte, **Standard im Web, in JSON und unter Linux** |
| **UTF-16** | 2 oder 4 | intern in Windows und Java; Zeichen außerhalb der ersten 65.536 (z. B. Emojis) brauchen 4 Byte (Surrogatpaar) |
| **UTF-32** | immer 4 | einfach zu verarbeiten, aber speicherhungrig |

**Byte je Zeichen in UTF-8:**

| Zeichen | Codepoint-Bereich | Byte |
|---|---|---|
| ASCII: A–Z, a–z, 0–9, Leerzeichen, Satzzeichen | U+0000 bis U+007F | **1** |
| ä ö ü Ä Ö Ü ß é, griechische und kyrillische Buchstaben | U+0080 bis U+07FF | **2** |
| € und die meisten anderen Zeichen (auch Chinesisch) | U+0800 bis U+FFFF | **3** |
| Emojis und seltene Zeichen | ab U+10000 | **4** |

**Mojibake – wenn Umlaute „kaputt“ aussehen:** \`ü\` ist in UTF-8 die Bytefolge 0xC3 0xBC. Liest ein Programm die Datei als ISO 8859-1, zeigt es diese zwei Bytes als zwei Zeichen: **„MÃ¼ller“** statt „Müller“. Umgekehrt (Latin-1-Datei als UTF-8 gelesen) erscheinen Ersatzzeichen wie „M�ller“. Abhilfe: Beim Export und Import **dieselbe Kodierung** einstellen, am besten durchgängig UTF-8.

**BOM:** Manche Programme schreiben an den Dateianfang eine unsichtbare Markierung (Byte Order Mark, in UTF-8: 3 Byte EF BB BF). Sie zählt bei Größenberechnungen nur mit, wenn die Aufgabe es sagt.`,
        },
        {
          type: 'visual',
          title: 'Vom Zeichen zum Byte',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'A → 1 Byte', text: 'U+0041 → 0x41. In ASCII, Latin-1 und UTF-8 identisch.', icon: 'Type' },
                { title: 'ä → 2 Byte', text: 'U+00E4 → UTF-8: 0xC3 0xA4. In Latin-1 nur 1 Byte (0xE4).', icon: 'Languages' },
                { title: '€ → 3 Byte', text: 'U+20AC → UTF-8: 0xE2 0x82 0xAC. Nicht in Latin-1, aber in Latin-9.', icon: 'Euro' },
                { title: '😀 → 4 Byte', text: 'U+1F600 → UTF-8 und UTF-16: je 4 Byte.', icon: 'Smile' },
              ],
            },
          },
          caption: 'Je weiter hinten ein Zeichen in der Unicode-Tabelle steht, desto mehr Byte braucht es in UTF-8.',
        },
        {
          type: 'example',
          title: 'Speicherbedarf eines Preisschilds',
          problem: 'Das Kassensystem speichert den Text `Café 4 €` (8 Zeichen inkl. Leerzeichen). Wie viele Byte braucht er in UTF-8, ISO 8859-15, UTF-16 und UTF-32 (jeweils ohne BOM)?',
          steps: [
            { label: 'Zeichen sortieren', body: 'ASCII: C, a, f, Leerzeichen, 4, Leerzeichen = 6 Zeichen · é = 1 Zeichen · € = 1 Zeichen' },
            { label: 'UTF-8', body: '6 · 1 + 1 · 2 (é) + 1 · 3 (€) = 6 + 2 + 3 = **11 Byte**' },
            { label: 'ISO 8859-15', body: 'Jedes Zeichen 1 Byte (é und € sind enthalten): 8 · 1 = **8 Byte**' },
            { label: 'UTF-16', body: 'Alle Zeichen liegen unter U+FFFF: 8 · 2 = **16 Byte**' },
            { label: 'UTF-32', body: '8 · 4 = **32 Byte**' },
          ],
          result: 'UTF-8: 11 Byte · ISO 8859-15: 8 Byte · UTF-16: 16 Byte · UTF-32: 32 Byte',
        },
        {
          type: 'check',
          question: {
            id: 'd04-c03', kind: 'number', skill: 'data.zeichencodes', difficulty: 1,
            prompt: `${ASCII_AUSZUG}\n\nWelchen dezimalen ASCII-Code hat der Kleinbuchstabe \`d\`?`,
            answer: 100,
            misconceptions: [
              { answer: '68', error: 'ascii-gross-klein', why: '68 ist der Großbuchstabe `D`. Kleinbuchstaben liegen 32 höher.' },
              { answer: '101', error: 'ascii-abzaehlen', why: 'Eins zu viel gezählt: `a` hat den Abstand 0, `d` den Abstand 3.' },
            ],
            explanation: '**100.** `d` liegt 3 Stellen hinter `a`: 97 + 3 = 100.\n\nHäufiger Fehler: Groß- und Kleinbuchstaben verwechseln (D = 68).',
          },
        },
        {
          type: 'check',
          question: {
            id: 'd04-c04', kind: 'single', skill: 'data.unicode', difficulty: 2,
            prompt: 'Nach dem Import einer CSV-Datei steht im neuen System **„MÃ¼ller“** statt „Müller“. Was ist die wahrscheinlichste Ursache?',
            options: [
              'Die Datei ist UTF-8-kodiert, wurde aber als ISO 8859-1 (bzw. Windows-1252) gelesen.',
              'Die Datei ist ISO 8859-1-kodiert, wurde aber als UTF-8 gelesen.',
              'Die Datei ist beschädigt und muss neu exportiert werden.',
              'Das Trennzeichen der CSV-Datei ist falsch eingestellt.',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'Dann entstünde meist ein Ersatzzeichen („M�ller“). Zwei Zeichen „Ã¼“ statt „ü“ entstehen, wenn **zwei** UTF-8-Bytes als zwei Latin-1-Zeichen gelesen werden.', error: 'kodierung-richtung' },
              '2': { why: 'Die Bytes sind vollständig da – sie werden nur mit der falschen Tabelle gelesen.', error: 'kodierung-richtung' },
              '3': { why: 'Ein falsches Trennzeichen verschiebt Spalten, verändert aber keine Umlaute.', error: 'csv-trennzeichen' },
            },
            explanation: '`ü` ist in UTF-8 die Bytefolge 0xC3 0xBC. In ISO 8859-1 ist 0xC3 = „Ã“ und 0xBC = „¼“ → „MÃ¼ller“. Lösung: beim Import UTF-8 als Kodierung wählen.',
          },
        },
        { type: 'practice', title: 'Übung: ASCII-Codes', generator: 'daten.ascii', count: 3, difficulty: 1 },
        { type: 'practice', title: 'Übung: Byte je Codierung', generator: 'daten.utfbytes', count: 3, difficulty: 1 },
        {
          type: 'summary',
          points: [
            'ASCII: 7 Bit, 128 Zeichen, keine Umlaute; A = 65, a = 97, 0 = 48.',
            'ISO 8859-1 (Latin-1): 8 Bit, 256 Zeichen, mit Umlauten; € erst in Latin-9.',
            'Unicode = Zeichensatz (Codepoints), UTF-8/16/32 = Kodierungen.',
            'UTF-8: 1 Byte ASCII, 2 Byte Umlaute, 3 Byte €, 4 Byte Emoji.',
            '„MÃ¼ller“ = UTF-8 als Latin-1 gelesen → Kodierung beim Import angleichen.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'd04-l03',
      title: 'Dateiformate unterscheiden und beraten',
      minutes: 25,
      relevance: 'ap1',
      skills: ['data.dateiformate'],
      simple: `Ein Dateiformat ist die „Verpackung“ der Daten – wie bei Lebensmitteln: Konserve, Tiefkühlbeutel oder Vakuum. Bei **verlustfreier** Kompression bekommst du beim Auspacken genau das Original zurück (wie ein Koffer, den du nur ordentlicher packst). Bei **verlustbehafteter** Kompression werden Details weggelassen, die man kaum bemerkt (z. B. JPEG, MP3) – das spart viel Platz, ist aber nicht umkehrbar. **Rastergrafiken** bestehen aus Pixeln und werden beim Vergrößern pixelig, **Vektorgrafiken** (z. B. SVG) bestehen aus Formeln und bleiben scharf.

**Merke:** Foto → JPEG, Screenshot/Logo mit Transparenz → PNG, skalierbares Logo → SVG, Archiv → PDF/A; WAV ist unkomprimiert, FLAC verlustfrei, MP3 verlustbehaftet.`,
      steps: [
        {
          type: 'explain',
          title: 'Kriterien für die Formatwahl',
          body: `Eine **Datei** ist eine benannte Sammlung zusammengehöriger Daten. Das **Dateiformat** legt fest, wie die Bytes darin aufgebaut sind. Die **Dateiendung** (\`.png\`, \`.pdf\`) ist nur ein Hinweis für das Betriebssystem – eine umbenannte Datei ändert ihr Format nicht.

| Kriterium | Bedeutung | Beispiel |
|---|---|---|
| **Raster vs. Vektor** | Raster: Bild aus Pixeln, feste Auflösung, für Fotos. Vektor: Bild aus geometrischen Formen (Linien, Kurven, Flächen), beliebig skalierbar, für Logos, Pläne, Schriften. | JPEG/PNG vs. SVG |
| **unkomprimiert** | Daten werden 1:1 gespeichert, sehr groß | WAV/AIFF (PCM), BMP meist |
| **verlustfrei** komprimiert | kleiner, Original ist exakt wiederherstellbar | PNG, FLAC, ZIP |
| **verlustbehaftet** komprimiert | viel kleiner, Details gehen dauerhaft verloren; jedes erneute Speichern kann die Qualität weiter senken | JPEG, MP3, AAC |
| **Container vs. Codec** | Der **Container** ist die Hülle (enthält Video-, Ton-, Untertitelspuren), der **Codec** komprimiert den Inhalt | Container MP4/MKV, Codec H.264/H.265/AV1 |
| **offen vs. proprietär** | Offen: Spezifikation frei zugänglich, oft genormt, von vielen Programmen lesbar. Proprietär: vom Hersteller kontrolliert, Lesbarkeit hängt am Hersteller. | ODF, PDF, PNG vs. PSD |

**Hinweis zu Büchern:** Manche Lehrbücher führen **WAV und AIFF** unter „verlustbehaftet“. Das ist falsch: Beide speichern normalerweise **unkomprimierte PCM-Daten** und sind damit verlustfrei (nur sehr groß).`,
        },
        {
          type: 'explain',
          title: 'Die wichtigsten Formate im Überblick',
          body: `| Art | Format | Merkmal | Typischer Einsatz |
|---|---|---|---|
| Rastergrafik | **JPEG** (.jpg) | verlustbehaftet, 24 Bit Farbe, keine Transparenz | Fotos, Webshop-Bilder |
| Rastergrafik | **PNG** | verlustfrei, Transparenz (Alphakanal) | Screenshots, Grafiken mit Text, Logos fürs Web |
| Rastergrafik | **GIF** | verlustfrei, max. 256 Farben, Animation | einfache Animationen |
| Rastergrafik | **TIFF** | meist verlustfrei, hohe Farbtiefe, auch CMYK | Druckvorstufe, Scans fürs Archiv |
| Rastergrafik | **WebP** | verlustbehaftet oder verlustfrei, kleiner als JPEG/PNG | Webseiten |
| Vektorgrafik | **SVG** | XML-basiert, offen, skalierbar | Logos, Icons, Pläne im Web |
| Audio | **WAV / AIFF** | meist unkomprimiert (PCM) | Aufnahme, Schnitt, Master |
| Audio | **FLAC** | verlustfrei komprimiert (spart je nach Material etwa 30–60 %) | Archiv in voller Qualität |
| Audio | **MP3 / AAC / Ogg Vorbis** | verlustbehaftet (unhörbare Anteile werden entfernt) | Streaming, Telefonansagen, Podcasts |
| Video | **MP4 / MKV / MOV / AVI** | Container; Inhalt meist mit H.264, H.265 (HEVC) oder AV1 komprimiert | Videos, Schulungsfilme |
| Dokument | **TXT** | reiner Text, Kodierung beachten (UTF-8) | Konfigurationen, Logs |
| Dokument | **DOCX / XLSX / PPTX** | Office Open XML, genormt (ISO/IEC 29500), von Microsoft geprägt; intern ZIP mit XML-Dateien | Bürodokumente |
| Dokument | **ODT / ODS / ODP** | OpenDocument, offen genormt (ISO/IEC 26300) | LibreOffice, Behörden |
| Dokument | **PDF** | layouttreu auf jedem System, genormt (ISO 32000) | Versand von Angeboten, Handbüchern |
| Dokument | **PDF/A** | PDF für die **Langzeitarchivierung** (Schriften eingebettet, keine externen Abhängigkeiten) | Rechnungen, Verträge archivieren |
| Austausch | **CSV / XML / JSON** | strukturierte Daten als Text (nächste Lektion) | Import/Export, Schnittstellen |
| Archiv | **ZIP** | verlustfrei, mehrere Dateien in einem Paket | Versand, Sicherung |

**Beratungsregel:** Erst den **Zweck** klären (Bearbeiten, Weitergeben, Drucken, Archivieren, Web), dann Qualität gegen Dateigröße abwägen und auf **offene, verbreitete** Formate achten – damit der Kunde nicht von einem Hersteller abhängig wird.`,
        },
        {
          type: 'visual',
          title: 'Vier Grundfragen der Formatberatung',
          widget: {
            kind: 'cards',
            data: {
              columns: 2,
              items: [
                { title: 'Raster oder Vektor?', text: 'Foto → Raster (JPEG). Logo, Plan, Icon → Vektor (SVG), weil es skalierbar bleiben muss.', icon: 'Image' },
                { title: 'Darf Qualität verloren gehen?', text: 'Nein (Archiv, Master, Text im Bild) → verlustfrei: PNG, FLAC, TIFF. Ja (Web, Streaming) → JPEG, MP3, H.264.', icon: 'Shrink' },
                { title: 'Wer muss die Datei öffnen?', text: 'Externe Empfänger → verbreitete, offene Formate: PDF, PNG, MP4, ODF/DOCX.', icon: 'Users' },
                { title: 'Wie lange aufbewahren?', text: 'Jahre bis Jahrzehnte → genormte Archivformate: PDF/A, TIFF, FLAC, CSV/XML.', icon: 'Archive' },
              ],
            },
          },
          caption: 'Wer diese vier Fragen beantwortet, findet in fast jeder Prüfungsaufgabe das passende Format und kann es begründen.',
        },
        {
          type: 'example',
          title: 'Beratung für die Marketingabteilung',
          problem: 'Die Marketingabteilung der Elektro Krämer GmbH fragt: In welchen Formaten sollen (1) Produktfotos für den Webshop, (2) das Firmenlogo für Webseite und Messewand, (3) Screenshots für eine Bedienungsanleitung, (4) der Produktkatalog für Kunden und (5) die Masteraufnahme der neuen Telefonansage gespeichert werden?',
          steps: [
            { label: '(1) Produktfotos', body: 'Fotos mit vielen Farbverläufen, kleine Ladezeit wichtig → **JPEG** (oder WebP). Leichter Qualitätsverlust fällt nicht auf.' },
            { label: '(2) Logo', body: 'Muss von Visitenkarte bis Messewand scharf bleiben → **SVG** (Vektor). Für Programme ohne SVG zusätzlich ein PNG mit Transparenz.' },
            { label: '(3) Screenshots', body: 'Scharfe Kanten und Schrift, JPEG würde Artefakte erzeugen → **PNG** (verlustfrei).' },
            { label: '(4) Katalog', body: 'Soll bei allen Kunden gleich aussehen → **PDF**; für die Archivierung **PDF/A**.' },
            { label: '(5) Telefonansage', body: 'Master in voller Qualität → **WAV** (unkomprimiert) oder **FLAC** (verlustfrei, kleiner). Für die Telefonanlage später eine komprimierte Kopie, z. B. MP3.' },
          ],
          result: 'JPEG · SVG (+ PNG) · PNG · PDF bzw. PDF/A · WAV/FLAC als Master',
        },
        {
          type: 'check',
          question: {
            id: 'd04-c05', kind: 'match', skill: 'data.dateiformate', difficulty: 1,
            prompt: 'Ordne jedem Format die passende Eigenschaft zu.',
            left: ['JPEG', 'PNG', 'SVG', 'FLAC'],
            right: ['Vektorgrafik, beliebig skalierbar', 'verlustfrei komprimiertes Audio', 'verlustbehaftete Rastergrafik', 'verlustfreie Rastergrafik mit Transparenz'],
            answer: [2, 3, 0, 1],
            explanation: 'JPEG = verlustbehaftete Rastergrafik (Fotos) · PNG = verlustfrei mit Transparenz · SVG = Vektor · FLAC = verlustfreies Audio.',
          },
        },
        { type: 'practice', title: 'Übung: Dateiformate', questionIds: ['d04-q018', 'd04-q019', 'd04-q020', 'd04-q021', 'd04-q025'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Raster (Pixel, Fotos) vs. Vektor (Formen, skalierbar, Logos).',
            'Unkomprimiert (WAV, BMP) – verlustfrei (PNG, FLAC, ZIP) – verlustbehaftet (JPEG, MP3, AAC).',
            'Container (MP4, MKV) ≠ Codec (H.264, H.265, AV1).',
            'Offene, genormte Formate (PDF, ODF, PNG, SVG) machen unabhängig vom Hersteller.',
            'Langzeitarchiv: PDF/A.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'd04-l04',
      title: 'Austauschformate: CSV, XML und JSON',
      minutes: 25,
      relevance: 'ap1',
      skills: ['data.austausch'],
      simple: `Wenn zwei Programme Daten austauschen, brauchen sie eine gemeinsame „Sprache“ – wie zwei Firmen, die sich auf ein Formular einigen. **CSV** ist eine einfache Liste: jede Zeile ein Datensatz, die Felder durch Semikolon oder Komma getrennt. **XML** packt jeden Wert zwischen Anfangs- und End-Markierung (Tags), z. B. \`<ort>Berlin</ort>\`. **JSON** schreibt Schlüssel und Wert als Paar in geschweifte Klammern, z. B. \`{"ort": "Berlin"}\`, und ist heute Standard bei Web-Schnittstellen. Ein Datum schreibst du in Austauschdateien am besten nach **ISO 8601**: \`2026-11-04\`.

**Merke:** CSV = flache Tabelle, XML = Baum mit Tags, JSON = Schlüssel-Wert-Paare und Listen; ein einziger Syntaxfehler macht XML oder JSON unlesbar.`,
      steps: [
        {
          type: 'explain',
          title: 'Strukturierte Daten als Text',
          body: `**Wie stark sind Daten strukturiert?**

| Art | Merkmal | Beispiele |
|---|---|---|
| **strukturiert** | feste Felder, gleicher Aufbau je Datensatz | Datenbanktabelle, CSV |
| **semistrukturiert** | Struktur durch Markierungen, Aufbau darf je Datensatz abweichen | XML, JSON, E-Mail (Kopfzeilen + freier Text) |
| **unstrukturiert** | keine maschinenlesbare Struktur | Fotos, Videos, Freitext-Briefe |

**CSV (Comma-Separated Values)**
- Eine Zeile = ein Datensatz, meist mit **Kopfzeile** (Spaltennamen).
- Felder werden durch ein **Trennzeichen** getrennt: international Komma, in Deutschland oft **Semikolon**, weil das Komma als Dezimalzeichen dient (1249,00).
- Enthält ein Feld das Trennzeichen, steht es in **Anführungszeichen**: \`"Drucker; Farbe"\`.
- CSV ist nicht streng genormt (RFC 4180 beschreibt die übliche Form). Deshalb beim Austausch immer klären: **Trennzeichen, Dezimalzeichen, Kodierung (UTF-8), Kopfzeile ja/nein**.
- Vorteile: klein, von jeder Tabellenkalkulation lesbar. Nachteile: keine Verschachtelung, keine Datentypen (alles Text).

**XML (Extensible Markup Language)**
- Daten stehen in **Elementen** mit Start- und End-Tag: \`<typ>Notebook</typ>\`; Zusatzangaben als **Attribute**: \`<geraet invnr="G01">\`.
- **Wohlgeformt** heißt: genau **ein Wurzelelement**, jedes Tag wird geschlossen, Tags sind **korrekt verschachtelt**, Attributwerte stehen in Anführungszeichen, Groß-/Kleinschreibung wird unterschieden.
- **Gültig (valide)** heißt zusätzlich: Das Dokument passt zu einem **Schema** (DTD oder XSD), das erlaubte Elemente und Reihenfolge festlegt.
- Einsatz: E-Rechnung (XRechnung), Office-Dateien (intern), Konfigurationen, SOAP-Schnittstellen. Nachteil: viel „Verpackung“ (Overhead).

**HTML vs. XML:** HTML beschreibt die **Darstellung von Webseiten** mit festgelegten Tags (\`<p>\`, \`<table>\`). XML beschreibt **Daten** mit selbst definierten Tags und hat strengere Regeln.

**JSON (JavaScript Object Notation)**
- **Objekte** in \`{ }\` mit Schlüssel-Wert-Paaren, **Arrays** (Listen) in \`[ ]\`.
- Schlüssel und Zeichenketten in **doppelten** Anführungszeichen; Werte: Zeichenkette, Zahl (mit Punkt: 1249.0), \`true\`, \`false\`, \`null\`, Objekt, Array.
- **Kein Komma** nach dem letzten Element, **keine Kommentare**. Kodierung im Austausch: UTF-8.
- Einsatz: **REST-Schnittstellen** (Web-APIs), Konfigurationen, Datenexport nach DSGVO Art. 20 (Datenübertragbarkeit „in einem strukturierten, gängigen und maschinenlesbaren Format“).

**Datum und Zeit eindeutig schreiben (ISO 8601)**
- Datum \`JJJJ-MM-TT\`, z. B. \`2026-11-04\`; mit Uhrzeit und Zeitzone \`2026-11-04T14:30:00+01:00\` (\`Z\` = UTC).
- Vorteile: weltweit eindeutig (04.11. oder 11.04.?) und als Text **richtig sortierbar**.
- **Unix-Zeit:** Viele Systeme speichern Sekunden seit 1. Januar 1970, 00:00 UTC. Ein Tag hat 86.400 Sekunden. Als vorzeichenbehaftete 32-Bit-Zahl läuft der Zähler am 19.01.2038 über („Jahr-2038-Problem“) – heutige Systeme nutzen 64 Bit.`,
        },
        {
          type: 'visual',
          title: 'Derselbe Datensatz – drei Formate',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'CSV', text: 'InvNr;Typ;Preis\nG01;Notebook;1249,00', icon: 'Sheet' },
                { title: 'XML', text: '<geraet invnr="G01"><typ>Notebook</typ><preis>1249.00</preis></geraet>', icon: 'Code' },
                { title: 'JSON', text: '{ "invnr": "G01", "typ": "Notebook", "preis": 1249.00 }', icon: 'Braces' },
              ],
            },
          },
          caption: 'CSV ist am kürzesten, XML am ausführlichsten. JSON unterscheidet Zahl und Text ohne zusätzliches Schema.',
        },
        {
          type: 'example',
          title: 'Eine Geräteliste in CSV und JSON',
          problem: 'Zwei Geräte sollen exportiert werden: G01, Notebook, Standort Hamburg, 1.249,00 € und G02, Monitor, Standort Berlin, 219,90 €. Erstelle eine CSV-Datei (deutsches Format) und eine JSON-Datei.',
          steps: [
            { label: 'CSV (deutsch)', body: 'Semikolon als Trennzeichen, Komma als Dezimalzeichen, Kopfzeile:\n\n```\nInvNr;Typ;Standort;Preis\nG01;Notebook;Hamburg;1249,00\nG02;Monitor;Berlin;219,90\n```' },
            { label: 'JSON', body: 'Ein Array mit zwei Objekten; Zahlen mit Punkt, ohne Tausendertrennzeichen:\n\n```json\n[\n  { "invnr": "G01", "typ": "Notebook", "standort": "Hamburg", "preis": 1249.00 },\n  { "invnr": "G02", "typ": "Monitor", "standort": "Berlin", "preis": 219.90 }\n]\n```' },
            { label: 'Prüfen', body: 'CSV: 3 Zeilen (1 Kopfzeile + 2 Datensätze), je 4 Felder. JSON: Klammern paarweise geschlossen, kein Komma nach dem letzten Objekt, alle Schlüssel in doppelten Anführungszeichen.' },
          ],
          result: 'CSV mit Semikolon und Dezimalkomma; JSON als Array von Objekten mit Dezimalpunkt',
        },
        {
          type: 'check',
          question: {
            id: 'd04-c06', kind: 'text', skill: 'data.austausch', difficulty: 1,
            prompt: 'Schreibe den **4. November 2026** im Format nach ISO 8601 (nur Datum).',
            accept: ['2026-11-04'],
            placeholder: 'JJJJ-MM-TT',
            misconceptions: [
              { answer: '2026-04-11', error: 'iso8601-reihenfolge', why: 'ISO 8601 schreibt Jahr, **Monat**, Tag: 2026-11-04.' },
              { answer: '04.11.2026', error: 'iso8601-reihenfolge', why: 'Das ist die deutsche Schreibweise. ISO 8601: größte Einheit zuerst, mit Bindestrichen.' },
            ],
            explanation: '**2026-11-04.** ISO 8601: Jahr (4-stellig) – Monat – Tag, jeweils mit führender Null.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'd04-c07', kind: 'single', skill: 'data.austausch', difficulty: 2,
            prompt: 'Welcher XML-Ausschnitt ist **wohlgeformt**?',
            options: [
              '`<geraet><typ>Notebook</geraet></typ>`',
              '`<geraet invnr=G01><typ>Notebook</typ></geraet>`',
              '`<geraet invnr="G01"><typ>Notebook</typ></geraet>`',
              '`<Geraet><typ>Notebook</typ></geraet>`',
            ],
            answer: 2,
            distractors: {
              '0': { why: 'Die Tags sind über Kreuz geschlossen. Das zuletzt geöffnete Element (`typ`) muss zuerst geschlossen werden.', error: 'xml-verschachtelung' },
              '1': { why: 'Attributwerte müssen in Anführungszeichen stehen: `invnr="G01"`.', error: 'xml-attribut-anfuehrungszeichen' },
              '3': { why: 'XML unterscheidet Groß-/Kleinschreibung: `<Geraet>` passt nicht zu `</geraet>`.', error: 'xml-gross-klein' },
            },
            explanation: 'Nur Ausschnitt 3 erfüllt alle Regeln: korrekt verschachtelt, Attributwert in Anführungszeichen, Start- und End-Tag gleich geschrieben.',
          },
        },
        { type: 'practice', title: 'Übung: CSV, XML, JSON', questionIds: ['d04-q026', 'd04-q027', 'd04-q029', 'd04-q031', 'd04-q034'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'CSV: Zeile = Datensatz, Trennzeichen (DE meist Semikolon), Anführungszeichen schützen Trennzeichen im Feld.',
            'XML: Elemente mit Tags, Attribute in Anführungszeichen, ein Wurzelelement; wohlgeformt ≠ gültig (Schema).',
            'JSON: {Objekt}, [Array], Schlüssel in doppelten Anführungszeichen, kein Komma am Ende.',
            'Beim Austausch klären: Trennzeichen, Dezimalzeichen, Kodierung, Datumsformat.',
            'ISO 8601: 2026-11-04 – eindeutig und sortierbar.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'd04-l05',
      title: 'Datenqualität bewerten',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['data.qualitaet'],
      simple: `Daten sind nur so nützlich wie ihre Qualität – wie ein Adressbuch, in dem die Hälfte der Nummern veraltet ist. Man prüft Daten deshalb nach **Kriterien**: Sind sie vollständig? Korrekt? Aktuell? Gibt es doppelte Einträge (Dubletten)? Widersprechen sich zwei Systeme? Wie gut die Daten sind, gibt man oft in **Prozent** an: Anteil der guten Datensätze an allen Datensätzen.

**Merke:** Qualitätsquote = einwandfreie Datensätze ÷ alle Datensätze · 100 %.`,
      steps: [
        {
          type: 'explain',
          title: 'Kriterien der Datenqualität',
          body: `Schlechte Daten führen zu falschen Entscheidungen, Fehllieferungen, unzustellbaren Rechnungen und Ärger mit dem Datenschutz (die DSGVO verlangt **sachlich richtige** und aktuelle personenbezogene Daten, Art. 5 Abs. 1 lit. d).

| Kriterium | Frage | Schlechtes Beispiel |
|---|---|---|
| **Korrektheit** (Richtigkeit) | Stimmen die Werte mit der Wirklichkeit überein? | PLZ „2009“ (nur vier Stellen) |
| **Vollständigkeit** | Sind alle Pflichtfelder gefüllt? | Kunde ohne E-Mail-Adresse |
| **Aktualität** | Ist der Wert noch gültig? | Adresse vor dem Umzug |
| **Konsistenz** (Widerspruchsfreiheit) | Passen Werte zueinander und über Systeme hinweg? | CRM: PLZ 20095, Warenwirtschaft: 20097 für dieselbe Firma |
| **Eindeutigkeit** (Redundanz-/Dublettenfreiheit) | Gibt es jeden Datensatz nur einmal? | „Bauer GmbH“ und „Bauer G.m.b.H.“ doppelt |
| **Genauigkeit** | Ist der Wert fein genug erfasst? | Temperatur nur in ganzen Grad statt 0,1 °C |
| **Einheitlichkeit** | Ist das Format überall gleich? | Datum teils 04.11.2026, teils 2026-11-04 |
| **Verständlichkeit** | Sind Werte und Abkürzungen klar? | Statusfeld „X3“ ohne Erklärung |
| **Relevanz** | Werden die Daten für den Zweck gebraucht? | Hobbys im Lieferantenstamm |
| **Zuverlässigkeit** | Ist die Herkunft vertrauenswürdig? | ungeprüfte Liste aus dem Internet |

**Datenqualität in Prozent**

> Quote = einwandfreie Datensätze ÷ alle Datensätze · 100 %

**Beispiel Aktualität:** Von 1.600 Kundendatensätzen sind laut Prüfung 85 % aktuell. Zu aktualisieren sind 1.600 · (1 − 0,85) = 1.600 · 0,15 = **240 Datensätze**.

**Maßnahmen:** Pflichtfelder und Eingabeprüfungen (z. B. PLZ genau 5 Ziffern), Auswahllisten statt Freitext, Dublettenprüfung, regelmäßige Bereinigung, eine führende Quelle („Single Source of Truth“), einheitliche Formate (ISO 8601, UTF-8).`,
        },
        {
          type: 'visual',
          title: 'Typische Mängel auf einen Blick',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Lücke', text: 'Pflichtfeld leer → Vollständigkeit', icon: 'CircleDashed' },
                { title: 'Dublette', text: 'Kunde doppelt angelegt → Eindeutigkeit', icon: 'Copy' },
                { title: 'Veraltet', text: 'alte Adresse → Aktualität', icon: 'Clock' },
                { title: 'Widerspruch', text: 'zwei Systeme, zwei Werte → Konsistenz', icon: 'GitCompare' },
                { title: 'Formatmix', text: 'Datum mal so, mal so → Einheitlichkeit', icon: 'Shuffle' },
                { title: 'Unmöglicher Wert', text: 'PLZ mit 4 Stellen → Korrektheit', icon: 'XCircle' },
              ],
            },
          },
          caption: 'In Prüfungsaufgaben bekommst du oft eine Liste mit eingebauten Fehlern und sollst zu jedem Fehler das Kriterium nennen.',
        },
        {
          type: 'example',
          title: 'Vollständigkeit eines Kundenstamms berechnen',
          problem: 'Der Kundenstamm hat **2.400 Datensätze**. Bei **180** fehlt mindestens ein Pflichtfeld. Berechne die Vollständigkeit in Prozent.',
          steps: [
            { label: 'Einwandfreie Datensätze', body: '2.400 − 180 = 2.220' },
            { label: 'Quote', body: '2.220 ÷ 2.400 = 0,925' },
            { label: 'Prozent', body: '0,925 · 100 % = **92,5 %**' },
          ],
          result: 'Vollständigkeit: 92,5 %',
        },
        {
          type: 'check',
          question: {
            id: 'd04-c08', kind: 'number', skill: 'data.qualitaet', difficulty: 1,
            prompt: 'Eine Lieferantenliste hat **1.250 Datensätze**. Bei **75** fehlt die Pflichtangabe E-Mail-Adresse. Wie hoch ist die Vollständigkeit in Prozent?',
            answer: 94,
            unit: '%',
            misconceptions: [{ answer: '6', error: 'quote-fehleranteil', why: '6 % ist der Anteil der **unvollständigen** Datensätze. Gefragt ist der Anteil der vollständigen: 100 % − 6 % = 94 %.' }],
            explanation: '**94 %.** (1.250 − 75) ÷ 1.250 = 1.175 ÷ 1.250 = 0,94 → 94 %.\n\nHäufiger Fehler: den Fehleranteil (6 %) statt der Qualitätsquote angeben.',
          },
        },
        { type: 'practice', title: 'Übung: Datenqualität', questionIds: ['d04-q035', 'd04-q036', 'd04-q037', 'd04-q038'], count: 3, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Kernkriterien: Korrektheit, Vollständigkeit, Aktualität, Konsistenz, Eindeutigkeit, Genauigkeit, Einheitlichkeit.',
            'Quote = einwandfreie ÷ alle Datensätze · 100 %.',
            'Zu bereinigen = alle · (1 − Quote).',
            'Maßnahmen: Pflichtfelder, Eingabeprüfung, Dublettenabgleich, einheitliche Formate.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'd04-l06',
      title: 'Bildspeicher berechnen – aus Pixeln, cm und ppi',
      minutes: 20,
      relevance: 'ap1',
      skills: ['data.bildspeicher'],
      simple: `Ein digitales Bild ist wie ein Mosaik aus winzigen Steinchen, den **Pixeln**. Jedes Pixel braucht so viele Bit, wie die **Farbtiefe** angibt (z. B. 24 Bit = 8 Bit je Farbe Rot, Grün, Blau). Beim Scannen bestimmt **ppi** (Pixel pro Zoll), wie viele Steinchen auf 2,54 cm kommen. Darum rechnest du erst Zentimeter in Zoll um (÷ 2,54), dann in Pixel (· ppi). Am Ende teilst du durch 8 für Byte und durch 1000 oder 1024 für MB oder MiB – je nachdem, was die Aufgabe verlangt.

**Merke:** Byte = Pixel Breite · Pixel Höhe · Bit je Pixel ÷ 8, und Pixel je Seite = cm ÷ 2,54 · ppi.`,
      steps: [
        {
          type: 'explain',
          title: 'Von Zentimetern zu Byte',
          body: `**Grundformel (unkomprimierte Rastergrafik):**

> Speicher in Bit = Breite in Pixel · Höhe in Pixel · Farbtiefe in Bit je Pixel

Die Variante mit **Pixelmaßen** (z. B. Monitorauflösung 1920 × 1080) kennst du aus dem Modul **Ein- und Ausgabegeräte (h03, Lektion 5)**. In Aufgaben zu Scannern, Fotos und Druck stehen die Maße aber oft in **Zentimetern** mit einer Auflösung in **ppi** (pixels per inch, Pixel pro Zoll; bei Scannern und Druckern auch dpi):

> Pixel je Seite = Länge in cm ÷ 2,54 · ppi     (1 Zoll = 2,54 cm)

**Farbtiefe:** 1 Bit = Schwarz/Weiß, 8 Bit = 256 Graustufen, **24 Bit** = RGB mit 8 Bit je Kanal (≈ 16,7 Mio. Farben). Steht in der Aufgabe „**12 Bit je Farbkanal**“, rechnest du bei RGB 12 · 3 = **36 Bit je Pixel**.

**Rechenweg in fünf Schritten**
1. Breite und Höhe in Zoll umrechnen (÷ 2,54).
2. Mit ppi multiplizieren → Pixel je Seite (auf ganze Pixel runden, wenn die Aufgabe nichts anderes sagt).
3. Pixel gesamt = Breite · Höhe.
4. Bit = Pixel · Bit je Pixel (· Anzahl Bilder), Byte = Bit ÷ 8.
5. In die gefragte Einheit umrechnen.

**1000 oder 1024?** Lies die Einheit in der Aufgabe genau:

| Einheit | Faktor | Beispiel |
|---|---|---|
| kB, MB, GB, TB (Dezimalpräfixe, SI) | je Stufe 1000 | 1 MB = 1.000.000 Byte |
| KiB, MiB, GiB, TiB (Binärpräfixe, IEC) | je Stufe 1024 | 1 MiB = 1.048.576 Byte |

Windows zeigt Dateigrößen mit 1024er-Schritten, schreibt aber „MB“. In der Prüfung zählt die Einheit, die in der Aufgabe steht.

**Rundung:** Manche Bücher runden schon die Zoll-Werte auf zwei Stellen (z. B. 7,09 Zoll). Dadurch weicht das Ergebnis in der zweiten Nachkommastelle ab. Rechne mit ungerundeten Zwischenwerten und runde erst die Pixel bzw. das Endergebnis – oder halte dich an die Rundungsregel der Aufgabe.`,
        },
        {
          type: 'visual',
          title: 'Die Rechenkette',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: '1. cm → Zoll', text: '÷ 2,54', icon: 'Ruler' },
                { title: '2. Zoll → Pixel', text: '· ppi (dann runden)', icon: 'Grid3x3' },
                { title: '3. Pixel → Bit', text: 'Breite · Höhe · Bit je Pixel', icon: 'Binary' },
                { title: '4. Bit → MiB/MB', text: '÷ 8, dann ÷ 1024² bzw. ÷ 1000²', icon: 'HardDrive' },
              ],
            },
          },
          caption: 'Die häufigsten Fehler passieren an den Übergängen: cm nicht in Zoll umgerechnet, ÷ 8 vergessen oder 1000 und 1024 verwechselt.',
        },
        {
          type: 'example',
          title: 'Eine DIN-A4-Seite scannen',
          problem: 'Ein Vertrag im Format **DIN A4 (21,0 cm × 29,7 cm)** wird mit **300 ppi** und **24 Bit** Farbtiefe unkomprimiert gescannt. Wie groß ist die Datei in **MiB**? Pixel auf ganze Pixel runden, Ergebnis auf zwei Nachkommastellen.',
          steps: [
            { label: 'Breite', body: '21,0 cm ÷ 2,54 = 8,2677 Zoll · 300 = 2.480,31 → **2.480 px**' },
            { label: 'Höhe', body: '29,7 cm ÷ 2,54 = 11,6929 Zoll · 300 = 3.507,87 → **3.508 px**' },
            { label: 'Pixel gesamt', body: '2.480 · 3.508 = 8.699.840 Pixel' },
            { label: 'Byte', body: '8.699.840 · 24 Bit ÷ 8 = 8.699.840 · 3 Byte = 26.099.520 Byte' },
            { label: 'MiB', body: '26.099.520 ÷ 1.048.576 = **24,89 MiB** (zum Vergleich: 26,10 MB)' },
          ],
          result: '≈ 24,89 MiB',
        },
        {
          type: 'check',
          question: {
            id: 'd04-c09', kind: 'number', skill: 'data.bildspeicher', difficulty: 1,
            prompt: 'Ein Foto ist **15 cm** breit und wird mit **300 ppi** gescannt. Wie viele Pixel ist der Scan breit? (cm ÷ 2,54 · ppi, auf ganze Pixel runden)',
            answer: 1772,
            accept: [1773],
            unit: 'Pixel',
            misconceptions: [
              { answer: '4500', error: 'ppi-cm-als-zoll', why: 'Du hast cm direkt mit ppi multipliziert. ppi bezieht sich auf Zoll: erst ÷ 2,54.' },
              { answer: '11430', error: 'ppi-mal-254', why: 'Zentimeter in Zoll: durch 2,54 **teilen**, nicht multiplizieren.' },
            ],
            explanation: '**1.772 Pixel.** 15 ÷ 2,54 = 5,9055 Zoll; · 300 = 1.771,65 → 1.772 px. (Mit auf 5,91 Zoll gerundetem Zwischenwert ergibt sich 1.773 px – das wird auch akzeptiert.)\n\nHäufiger Fehler: cm direkt mit ppi multiplizieren.',
          },
        },
        { type: 'practice', title: 'Übung: Pixel aus cm und ppi', generator: 'daten.bildspeicher', count: 2, difficulty: 1 },
        { type: 'practice', title: 'Übung: Bildspeicher', generator: 'daten.bildspeicher', count: 3, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Pixel je Seite = cm ÷ 2,54 · ppi.',
            'Bit = Pixel Breite · Pixel Höhe · Bit je Pixel; RGB mit n Bit je Kanal = 3n Bit je Pixel.',
            'Byte = Bit ÷ 8.',
            'MB/GB: ÷ 1000 je Stufe; MiB/GiB: ÷ 1024 je Stufe – immer die Einheit der Aufgabe verwenden.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'd04-l07',
      title: 'Speicherbedarf von Audio und Video',
      minutes: 25,
      relevance: 'ap1',
      skills: ['data.mediengroesse'],
      simple: `Ton wird digital gespeichert, indem man ihn sehr oft pro Sekunde „misst“ – wie ein Daumenkino, nur für Schall. Die **Abtastrate** sagt, wie oft gemessen wird (CD: 44.100-mal pro Sekunde), die **Abtasttiefe**, wie genau jede Messung ist (CD: 16 Bit). Ein Video ist eine schnelle Folge von Bildern, z. B. 25 Bilder pro Sekunde. Damit Videos nicht riesig werden, komprimiert ein **Codec** sie, z. B. im Verhältnis 1 : 100 – dann ist die Datei hundertmal kleiner.

**Merke:** Audio-Bit = Abtastrate · Abtasttiefe · Kanäle · Sekunden; Video-Bit = Pixel · Bit je Pixel · Bilder/s · Sekunden ÷ Kompressionsfaktor.`,
      steps: [
        {
          type: 'explain',
          title: 'Audio: Abtastrate, Abtasttiefe, Kanäle',
          body: `Ein Mikrofon liefert ein **analoges** Signal (eine stufenlose Spannungskurve). Bei der Digitalisierung (**Sampling**, Abtasten) wird diese Kurve in festen Abständen gemessen:

| Kenngröße | Bedeutung | CD-Qualität |
|---|---|---|
| **Abtastrate** (Samplingrate) in Hz | Messungen pro Sekunde | 44.100 Hz = 44,1 kHz |
| **Abtasttiefe** (Bittiefe) in Bit | Genauigkeit je Messung (2ⁿ Stufen) | 16 Bit = 65.536 Stufen |
| **Kanäle** | Mono 1, Stereo 2, 5.1-Surround 6 | Stereo |

**Abtasttheorem (Nyquist-Shannon):** Die Abtastrate muss **mehr als doppelt so hoch** sein wie die höchste Frequenz, die erfasst werden soll. Menschen hören bis etwa 20 kHz → 44,1 kHz reicht. Telefon überträgt Sprache bis etwa 3,4 kHz → 8 kHz Abtastrate.

> Speicher in Bit = Abtastrate · Abtasttiefe · Kanäle · Dauer in Sekunden
> Datenrate in Bit/s = Abtastrate · Abtasttiefe · Kanäle

**CD-Datenrate:** 44.100 · 16 · 2 = 1.411.200 Bit/s = **1.411,2 kbit/s**. Eine Minute braucht 1.411.200 · 60 ÷ 8 = 10.584.000 Byte ≈ **10,58 MB** (≈ 10,09 MiB). MP3 mit 192 kbit/s braucht nur etwa ein Siebtel davon.

**Datenraten** (kbit/s, Mbit/s) werden **immer** mit Dezimalpräfixen (1000) angegeben.`,
        },
        {
          type: 'explain',
          title: 'Video: Bilder pro Sekunde und Kompression',
          body: `Ein Video ist eine Folge von Einzelbildern. Unkomprimiert gilt:

> Bit = Breite · Höhe · Bit je Pixel · Bilder pro Sekunde · Dauer in Sekunden

**Kompressionsfaktor:** „Kompression 1 : 100“ bedeutet: Die gespeicherte Datenmenge ist **ein Hundertstel** der unkomprimierten → **durch 100 teilen**. Codecs wie H.264, H.265 (HEVC) oder AV1 nutzen aus, dass sich aufeinanderfolgende Bilder kaum unterscheiden.

**Rechenweg:**
1. Bit pro Bild = Breite · Höhe · Bit je Pixel
2. · Bilder/s · Sekunden (Minuten · 60!)
3. ÷ 8 → Byte
4. ÷ Kompressionsfaktor
5. · Anzahl Videos (falls gefragt)
6. In die gefragte Einheit umrechnen (GB = 10⁹ Byte, GiB = 2³⁰ Byte)

**Mit Bitrate rechnen:** Ist die Datenrate des fertigen Videos angegeben (z. B. 8 Mbit/s), ist es einfacher: Byte = Bitrate · Sekunden ÷ 8. Beispiel: 8 Mbit/s · 90 min = 8.000.000 · 5.400 ÷ 8 = 5.400.000.000 Byte = **5,4 GB**.

**Ton** kommt bei Videos noch dazu; in Prüfungsaufgaben steht meist „Ton vernachlässigen“.`,
        },
        {
          type: 'visual',
          title: 'Die Stellschrauben der Dateigröße',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Audio', text: 'Abtastrate · Abtasttiefe · Kanäle · Sekunden. Doppelte Abtastrate = doppelte Größe.', icon: 'AudioLines' },
                { title: 'Video', text: 'Pixel · Bit je Pixel · Bilder/s · Sekunden. 4K hat viermal so viele Pixel wie Full HD.', icon: 'Film' },
                { title: 'Kompression', text: '1 : k → Datenmenge ÷ k. Verlustbehaftete Codecs erreichen bei Video oft 1 : 100 und mehr.', icon: 'Shrink' },
              ],
            },
          },
          caption: 'Jede Größe in der Formel wirkt linear: Verdoppelst du einen Faktor, verdoppelt sich der Speicherbedarf.',
        },
        {
          type: 'example',
          title: 'Ein Musikstück in CD-Qualität',
          problem: 'Ein Musikstück von **3 Minuten** liegt als WAV in CD-Qualität vor (44,1 kHz, 16 Bit, Stereo). Wie groß ist die Datei in MB und in MiB?',
          steps: [
            { label: 'Sekunden', body: '3 min · 60 = 180 s' },
            { label: 'Bit', body: '44.100 · 16 · 2 · 180 = 254.016.000 Bit' },
            { label: 'Byte', body: '254.016.000 ÷ 8 = 31.752.000 Byte' },
            { label: 'MB', body: '31.752.000 ÷ 1.000.000 = **31,75 MB**' },
            { label: 'MiB', body: '31.752.000 ÷ 1.048.576 = **30,28 MiB**' },
          ],
          result: '31,75 MB bzw. 30,28 MiB',
        },
        {
          type: 'example',
          title: 'Ein komprimiertes Schulungsvideo',
          problem: 'Ein Schulungsvideo: **1920 × 1080** Pixel, **24 Bit** je Pixel, **25 Bilder/s**, **45 Minuten**, Kompression **1 : 100**, Ton vernachlässigen. Speicherbedarf in **GiB**?',
          steps: [
            { label: 'Bit pro Bild', body: '1920 · 1080 · 24 = 49.766.400 Bit' },
            { label: 'Bit gesamt', body: '49.766.400 · 25 · 2.700 s (45 · 60) = 3.359.232.000.000 Bit' },
            { label: 'Byte', body: '÷ 8 = 419.904.000.000 Byte (unkomprimiert)' },
            { label: 'Kompression', body: '÷ 100 = 4.199.040.000 Byte' },
            { label: 'GiB', body: '4.199.040.000 ÷ 1.073.741.824 = **3,91 GiB** (= 4,20 GB)' },
          ],
          result: '≈ 3,91 GiB',
        },
        {
          type: 'check',
          question: {
            id: 'd04-c10', kind: 'number', skill: 'data.mediengroesse', difficulty: 2,
            prompt: 'Ein Podcast wird **30 Minuten** lang mit **48 kHz**, **16 Bit**, **Mono** unkomprimiert aufgenommen. Wie groß ist die Datei in **MB** (1 MB = 10⁶ Byte)?',
            answer: 172.8,
            tolerance: 0.01,
            unit: 'MB',
            misconceptions: [
              { answer: '1382.4', error: 'einheit-bit-byte', why: 'Das sind Megabit. Für Byte noch durch 8 teilen.' },
              { answer: '345.6', error: 'audio-kanaele-falsch', why: 'Mono heißt **1** Kanal – du hast mit 2 Kanälen (Stereo) gerechnet.' },
              { answer: '2.88', error: 'zeit-minuten-sekunden', why: 'Die Abtastrate gilt pro **Sekunde**: 30 min = 1.800 s.' },
            ],
            explanation: '**172,8 MB.** 48.000 · 16 · 1 · 1.800 s = 1.382.400.000 Bit; ÷ 8 = 172.800.000 Byte; ÷ 10⁶ = 172,8 MB.\n\nHäufiger Fehler: Minuten nicht in Sekunden umrechnen.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'd04-c11', kind: 'number', skill: 'data.mediengroesse', difficulty: 2,
            prompt: 'Ein Film wird mit einer Bitrate von **8 Mbit/s** gestreamt und dauert **90 Minuten**. Wie viele **GB** (10⁹ Byte) werden übertragen?',
            answer: 5.4,
            tolerance: 0.01,
            unit: 'GB',
            misconceptions: [
              { answer: '43.2', error: 'einheit-bit-byte', why: 'Das sind Gigabit. Für Byte durch 8 teilen.' },
              { answer: '0.09', error: 'zeit-minuten-sekunden', why: 'Bitrate gilt pro Sekunde: 90 min = 5.400 s.' },
            ],
            explanation: '**5,4 GB.** 8.000.000 Bit/s · 5.400 s = 43.200.000.000 Bit; ÷ 8 = 5.400.000.000 Byte = 5,4 GB.',
          },
        },
        { type: 'practice', title: 'Übung: Audio', generator: 'daten.audio', count: 3, difficulty: 2 },
        { type: 'practice', title: 'Übung: Video', generator: 'daten.video', count: 3, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Audio: Abtastrate · Abtasttiefe · Kanäle · Sekunden = Bit.',
            'CD: 44,1 kHz, 16 Bit, Stereo = 1.411,2 kbit/s ≈ 10,58 MB pro Minute.',
            'Abtastrate > 2 · höchste Frequenz (Abtasttheorem).',
            'Video: Breite · Höhe · Bit je Pixel · Bilder/s · Sekunden; Kompression 1 : k → ÷ k.',
            'Datenraten immer dezimal (1 Mbit = 10⁶ Bit); Speicher je nach Aufgabe MB oder MiB.',
          ],
        },
      ],
    },
  ],

  /* ================================================================ */
  questions: [
    /* ---------- Zahlensysteme ---------- */
    {
      id: 'd04-q001', kind: 'table', skill: 'data.zahlensysteme', difficulty: 1,
      prompt: 'Ergänze die Tabelle ohne Taschenrechner. Jede Zeile ist eine Zahl; Dualzahlen mit 8 Bit, Hex ohne Präfix.',
      columns: [
        { key: 'dez', label: 'Dezimal', type: 'number' },
        { key: 'bin', label: 'Dual', type: 'text' },
        { key: 'hex', label: 'Hexadezimal', type: 'text' },
      ],
      rows: [
        { label: 'a', cells: { dez: { given: '200' }, bin: { answer: '1100 1000', accept: ['11001000', '0b11001000'] }, hex: { answer: 'C8', accept: ['0xC8', 'C8h'] } } },
        { label: 'b', cells: { dez: { answer: '60' }, bin: { answer: '0011 1100', accept: ['00111100', '111100', '11 1100', '0b00111100', '0b111100'] }, hex: { given: '0x3C' } } },
        { label: 'c', cells: { dez: { answer: '150' }, bin: { given: '1001 0110' }, hex: { answer: '96', accept: ['0x96', '96h'] } } },
      ],
      misconceptions: [{ answer: '0001 0011', cell: '0:bin', error: 'bin-reihenfolge', why: 'Die Bits sind spiegelverkehrt. Bei der Divisionsmethode liest du die Reste von unten nach oben.' }],
      hints: ['200 = 128 + 64 + 8.', 'Hex ↔ Dual: je 4 Bit eine Hexziffer.'],
      explanation: '**a)** 200 = 128 + 64 + 8 → 1100 1000; 1100 = C, 1000 = 8 → **C8**.\n\n**b)** 0x3C: 3 = 0011, C = 1100 → **0011 1100**; 3 · 16 + 12 = **60**.\n\n**c)** 1001 0110: 1001 = 9, 0110 = 6 → **96**; 128 + 16 + 4 + 2 = **150**.',
    },
    {
      id: 'd04-q002', kind: 'number', skill: 'data.zahlensysteme', difficulty: 2,
      prompt: 'Ein Register zeigt den Wert **0x1F4**. Welche Dezimalzahl ist das?',
      answer: 500,
      hints: ['Stellenwerte: 256, 16, 1.', 'F = 15.'],
      misconceptions: [{ answer: '254', error: 'hex-stellenwert', why: 'Du hast mit den Stellenwerten 100 · 10 · 1 gerechnet. Stellenwerte im Hexsystem: 256 · 16 · 1.' }],
      explanation: '**500.** 1 · 256 + 15 · 16 + 4 · 1 = 256 + 240 + 4 = 500.',
    },
    {
      id: 'd04-q003', kind: 'text', skill: 'data.zahlensysteme', difficulty: 2,
      prompt: 'Unter Linux setzt der Befehl `chmod 754 bericht.sh` die Dateirechte im **Oktalsystem**. Schreibe 754₈ als **Dualzahl** (9 Bit, Leerzeichen zwischen den Dreiergruppen erlaubt).',
      accept: ['111 101 100', '111101100'],
      placeholder: 'z. B. 110 100 000',
      hints: ['Jede Oktalziffer entspricht genau 3 Bit.', '7 = 111, 5 = 101, 4 = 100.'],
      explanation: '**111 101 100.** 7 = 111 (rwx für den Besitzer), 5 = 101 (r-x für die Gruppe), 4 = 100 (r-- für alle anderen).\n\nDarum nutzt Linux Oktal: Jede Ziffer beschreibt genau die drei Rechte Lesen, Schreiben, Ausführen.',
    },
    {
      id: 'd04-q004', kind: 'match', skill: 'data.zahlensysteme', difficulty: 1,
      prompt: 'Ordne jeder Schreibweise das Zahlensystem bzw. die Bedeutung zu.',
      left: ['0b1010', '0x1A', '#FF8800', '0o17'],
      right: ['Oktalzahl', 'Dualzahl', 'RGB-Farbcode in Hex', 'Hexadezimalzahl'],
      answer: [1, 3, 2, 0],
      explanation: '`0b` = binär (dual) · `0x` = hexadezimal · `#RRGGBB` = Farbcode mit je zwei Hexziffern für Rot, Grün, Blau (FF = 255, 88 = 136, 00 = 0) · `0o` = oktal.',
    },
    {
      id: 'd04-q005', kind: 'number', skill: 'data.zahlensysteme', difficulty: 3,
      prompt: 'Eine 8-Bit-Ganzzahl **mit Vorzeichen** (Zweierkomplement) hat den Inhalt **1111 1011**. Welchen Dezimalwert hat sie?',
      answer: -5,
      hints: ['Höchstes Bit = 1 → die Zahl ist negativ.', 'Zurückrechnen: invertieren und 1 addieren ergibt den Betrag.'],
      misconceptions: [
        { answer: '251', error: 'zweierkomplement-ohne-vorzeichen', why: '251 wäre der Wert **ohne** Vorzeichen. Bei vorzeichenbehafteten Zahlen ist 1111 1011 negativ.' },
        { answer: '-123', error: 'zweierkomplement-vorzeichenbetrag', why: 'Das wäre Vorzeichen-Betrag-Darstellung (1 = minus, Rest = 123). Im Zweierkomplement rechnest du: invertieren + 1.' },
        { answer: '-4', error: 'zweierkomplement-plus-eins', why: 'Nach dem Invertieren (0000 0100 = 4) musst du noch 1 addieren: Betrag 5.' },
      ],
      explanation: '**−5.** Höchstes Bit 1 → negativ. Invertieren: 0000 0100 = 4; + 1 = 5 → Wert −5.\n\nProbe: 251 − 256 = −5.',
    },
    {
      id: 'd04-q006', kind: 'free', skill: 'data.zahlensysteme', difficulty: 2,
      prompt: 'Ein Hex-Editor zeigt an einer Stelle das Byte `0x41`. Ein Kollege sagt: „Das ist die Zahl 65.“ Ein anderer: „Das ist ein A.“ Erläutere, wer recht hat.',
      modelAnswer: 'Beide können recht haben. Im Speicher steht nur die Bitfolge 0100 0001. Was sie bedeutet, hängt vom Datentyp bzw. vom Programm ab, das sie liest: Als vorzeichenlose Ganzzahl ist es 65, als ASCII- oder UTF-8-Zeichen ist es der Buchstabe A, in einer Bilddatei z. B. ein Helligkeitswert. Ohne Information über Format und Kodierung lässt sich die Bedeutung nicht bestimmen.',
      keywords: ['Bitfolge', 'Datentyp', 'Interpretation', 'ASCII', '65'],
      explanation: 'Daten bekommen erst durch das Format bzw. den Datentyp eine Bedeutung – deshalb sind Kodierung und Dateiformat beim Datenaustausch so wichtig.',
    },
    {
      id: 'd04-q007', kind: 'number', skill: 'data.zahlensysteme', difficulty: 1,
      prompt: 'Welches ist die **größte** Zahl, die sich mit **16 Bit ohne Vorzeichen** darstellen lässt?',
      answer: 65535,
      misconceptions: [
        { answer: '65536', error: 'wertebereich-plus-eins', why: '2¹⁶ = 65.536 ist die **Anzahl** der Werte. Weil die Zählung bei 0 beginnt, ist der größte Wert 65.535.' },
        { answer: '32767', error: 'wertebereich-vorzeichen', why: '32.767 ist das Maximum **mit** Vorzeichen.' },
      ],
      explanation: '**65.535.** 2¹⁶ − 1 = 65.536 − 1. In Hex: 0xFFFF.',
    },

    /* ---------- ASCII ---------- */
    {
      id: 'd04-q008', kind: 'table', skill: 'data.zeichencodes', difficulty: 2,
      prompt: `${ASCII_AUSZUG}\n\nErgänze die ASCII-Codes (Hex mit zwei Ziffern, ohne Präfix).`,
      columns: [
        { key: 'dez', label: 'Dezimal', type: 'number' },
        { key: 'hex', label: 'Hex', type: 'text' },
      ],
      rows: [
        { label: 'K', cells: { dez: { answer: '75' }, hex: { answer: '4B', accept: ['0x4B', '4Bh'] } } },
        { label: 'k', cells: { dez: { answer: '107' }, hex: { answer: '6B', accept: ['0x6B', '6Bh'] } } },
        { label: '5 (Ziffer)', cells: { dez: { answer: '53' }, hex: { answer: '35', accept: ['0x35', '35h'] } } },
        { label: 'Leerzeichen', cells: { dez: { given: '32' }, hex: { answer: '20', accept: ['0x20', '20h'] } } },
      ],
      misconceptions: [
        { answer: '5', cell: '2:dez', error: 'ascii-ziffer-als-wert', why: 'Das Zeichen `5` hat nicht den Code 5. Ziffern beginnen bei 48: 48 + 5 = 53.' },
        { answer: '107', cell: '0:dez', error: 'ascii-gross-klein', why: '107 ist das kleine `k`. Großbuchstaben liegen 32 tiefer: 75.' },
      ],
      hints: ['K ist der 11. Buchstabe nach A (Abstand 10).', 'Kleinbuchstabe = Großbuchstabe + 32 (0x20).'],
      explanation: '`K` = 65 + 10 = **75** = 0x**4B** · `k` = 75 + 32 = **107** = 0x**6B** · `5` = 48 + 5 = **53** = 0x**35** · Leerzeichen = 32 = 0x**20**.',
    },
    {
      id: 'd04-q009', kind: 'single', skill: 'data.zeichencodes', difficulty: 2,
      prompt: `${ASCII_AUSZUG}\n\nEin Netzwerkmitschnitt enthält die ASCII-Bytes **4C 61 6E** (hexadezimal). Welcher Text ist das?`,
      options: ['`Lan`', '`LAN`', '`lan`', '`LaN`'],
      answer: 0,
      distractors: {
        '1': { why: '0x61 und 0x6E liegen im Bereich der **Klein**buchstaben (ab 0x61 = a).', error: 'ascii-gross-klein' },
        '2': { why: '0x4C liegt im Bereich der **Groß**buchstaben (0x41–0x5A).', error: 'ascii-gross-klein' },
        '3': { why: '0x6E ist ein Kleinbuchstabe (n), nicht N (0x4E).', error: 'ascii-gross-klein' },
      },
      explanation: '0x4C = 76 = 65 + 11 → `L` · 0x61 = 97 → `a` · 0x6E = 110 = 97 + 13 → `n`. Ergebnis: **Lan**.',
    },
    {
      id: 'd04-q010', kind: 'number', skill: 'data.zeichencodes', difficulty: 1,
      prompt: 'Um wie viel unterscheiden sich die dezimalen ASCII-Codes eines Großbuchstabens und des zugehörigen Kleinbuchstabens (z. B. `G` und `g`)?',
      answer: 32,
      explanation: '**32** (0x20). `A` = 65, `a` = 97. Binär unterscheiden sie sich nur in Bit 5 (Wert 32).',
    },
    {
      id: 'd04-q011', kind: 'multi', skill: 'data.zeichencodes', difficulty: 2,
      prompt: 'Welche Aussagen über ASCII sind richtig?',
      options: [
        'ASCII ist ein 7-Bit-Code mit 128 Zeichen.',
        'Die Codes 0 bis 31 sind Steuerzeichen, z. B. der Zeilenvorschub.',
        'Die deutschen Umlaute sind im ASCII-Standard enthalten.',
        'Ein Kleinbuchstabe hat einen um 32 höheren Code als der Großbuchstabe.',
        'Die Ziffer 7 hat den ASCII-Code 7.',
        'UTF-8 speichert ASCII-Zeichen mit denselben Bytes wie ASCII.',
      ],
      answer: [0, 1, 3, 5],
      explanation: 'Falsch sind: Umlaute (erst in ISO 8859 bzw. Unicode) und „Ziffer 7 = Code 7“ (richtig ist 55). Alle anderen Aussagen stimmen.',
    },

    /* ---------- Unicode ---------- */
    {
      id: 'd04-q012', kind: 'number', skill: 'data.unicode', difficulty: 2,
      prompt: 'Wie viele **Byte** belegt der Text `Grüße aus Köln` in **UTF-8** (ohne BOM, Leerzeichen zählen mit)?',
      answer: 17,
      unit: 'Byte',
      hints: ['Zähle zuerst alle Zeichen, dann die Zeichen außerhalb von ASCII.'],
      misconceptions: [
        { answer: '14', error: 'utf8-ein-byte-je-zeichen', why: '14 ist die Zeichenzahl. ü, ß und ö brauchen in UTF-8 je 2 Byte.' },
        { answer: '28', error: 'utf8-utf16-verwechselt', why: '28 Byte wären es in UTF-16 (2 Byte je Zeichen).' },
      ],
      explanation: '**17 Byte.** 14 Zeichen, davon 3 außerhalb ASCII (ü, ß, ö). 11 · 1 + 3 · 2 = 17 Byte.\n\nHäufiger Fehler: Zeichen statt Byte zählen.',
    },
    {
      id: 'd04-q013', kind: 'table', skill: 'data.unicode', difficulty: 2,
      prompt: 'Wie viele Byte belegt das Wort `Straße` in den folgenden Codierungen (jeweils ohne BOM)?',
      columns: [{ key: 'b', label: 'Byte', type: 'number' }],
      rows: [
        { label: 'ISO 8859-1 (Latin-1)', cells: { b: { answer: '6' } } },
        { label: 'UTF-8', cells: { b: { answer: '7' } } },
        { label: 'UTF-16', cells: { b: { answer: '12' } } },
        { label: 'UTF-32', cells: { b: { answer: '24' } } },
      ],
      misconceptions: [{ answer: '6', cell: '1:b', error: 'utf8-ein-byte-je-zeichen', why: 'In UTF-8 braucht ß 2 Byte: 5 + 2 = 7.' }],
      hints: ['Straße hat 6 Zeichen, eines davon ist kein ASCII-Zeichen.'],
      explanation: 'Latin-1: 6 · 1 = **6** · UTF-8: 5 · 1 + 1 · 2 (ß) = **7** · UTF-16: 6 · 2 = **12** · UTF-32: 6 · 4 = **24**.',
    },
    {
      id: 'd04-q014', kind: 'free', skill: 'data.unicode', difficulty: 3,
      prompt: `**Handlungssituation:** Die Elektro Krämer GmbH exportiert ihre Kundenliste aus einem 20 Jahre alten Warenwirtschaftssystem als CSV und importiert sie in ein neues CRM. Im CRM erscheinen Namen wie „M�ller“ und „Wei�“.

Erläutere die Ursache und beschreibe zwei Maßnahmen, mit denen du das Problem löst.`,
      modelAnswer: 'Ursache: Das Altsystem speichert Text in einer 8-Bit-Kodierung wie ISO 8859-1 bzw. Windows-1252 (ü = 1 Byte 0xFC, ß = 0xDF). Das CRM liest die Datei als UTF-8. Einzelne Bytes ab 0x80 sind in UTF-8 keine gültigen Zeichen und werden als Ersatzzeichen � angezeigt. Maßnahmen: (1) Beim Import die richtige Quellkodierung (ISO 8859-1/Windows-1252) einstellen oder (2) die Datei vorher in UTF-8 umwandeln (z. B. mit einem Editor oder iconv) und künftig durchgängig UTF-8 verwenden; danach Stichproben mit Umlauten prüfen.',
      keywords: ['ISO 8859-1', 'UTF-8', 'Kodierung', 'Import', 'umwandeln'],
      explanation: 'Ersatzzeichen � entstehen, wenn Latin-1-Bytes als UTF-8 gelesen werden. Zwei Zeichen wie „Ã¼“ entstehen umgekehrt, wenn UTF-8 als Latin-1 gelesen wird.',
    },
    {
      id: 'd04-q015', kind: 'single', skill: 'data.unicode', difficulty: 1,
      prompt: 'Welche Kodierung ist **ASCII-kompatibel** und nutzt **1 bis 4 Byte** je Zeichen?',
      options: ['UTF-8', 'UTF-16', 'UTF-32', 'ISO 8859-1'],
      answer: 0,
      distractors: {
        '1': { why: 'UTF-16 nutzt 2 oder 4 Byte und ist nicht ASCII-kompatibel (A = 00 41 bzw. 41 00).', error: 'utf8-utf16-verwechselt' },
        '2': { why: 'UTF-32 nutzt immer 4 Byte.', error: 'utf8-utf16-verwechselt' },
        '3': { why: 'ISO 8859-1 nutzt immer genau 1 Byte und kennt nur 256 Zeichen.', error: 'latin1-utf8-verwechselt' },
      },
      explanation: '**UTF-8** speichert ASCII-Zeichen unverändert in 1 Byte und alle anderen Unicode-Zeichen in 2 bis 4 Byte. Deshalb ist es der Standard im Web.',
    },
    {
      id: 'd04-q016', kind: 'match', skill: 'data.unicode', difficulty: 2,
      prompt: 'Ordne jeder Zeichenkodierung die passende Eigenschaft zu.',
      left: ['ASCII', 'ISO 8859-1 (Latin-1)', 'UTF-8', 'UTF-16', 'UTF-32'],
      right: ['immer 4 Byte je Zeichen', '7 Bit, 128 Zeichen', '1 bis 4 Byte, ASCII-kompatibel', '8 Bit, 256 Zeichen inkl. westeuropäischer Umlaute', '2 oder 4 Byte je Zeichen'],
      answer: [1, 3, 2, 4, 0],
      explanation: 'ASCII 7 Bit · Latin-1 8 Bit · UTF-8 variabel 1–4 Byte · UTF-16 2 oder 4 Byte · UTF-32 fest 4 Byte.',
    },
    {
      id: 'd04-q017', kind: 'number', skill: 'data.unicode', difficulty: 2,
      prompt: 'Ein Etikettendrucker erhält den Text `Preis: 5 €` in **UTF-8**. Wie viele Byte werden übertragen (ohne BOM)?',
      answer: 12,
      unit: 'Byte',
      misconceptions: [
        { answer: '10', error: 'utf8-ein-byte-je-zeichen', why: '10 ist die Zeichenzahl. Das €-Zeichen braucht in UTF-8 3 Byte.' },
        { answer: '11', error: 'utf8-sonderzeichen-bytes', why: 'Das €-Zeichen (U+20AC) braucht 3 Byte, nicht 2.' },
      ],
      explanation: '**12 Byte.** 9 ASCII-Zeichen (P, r, e, i, s, :, Leerzeichen, 5, Leerzeichen) = 9 Byte + € = 3 Byte.',
    },

    /* ---------- Dateiformate ---------- */
    {
      id: 'd04-q018', kind: 'match', skill: 'data.dateiformate', difficulty: 1,
      prompt: 'Ordne jeder Dateiendung die passende Beschreibung zu.',
      left: ['.png', '.jpg', '.svg', '.flac', '.mp3', '.mkv'],
      right: ['verlustbehaftet komprimiertes Audio', 'Video-Container (Matroska)', 'Vektorgrafik (XML-basiert)', 'Rastergrafik, verlustfrei komprimiert', 'verlustfrei komprimiertes Audio', 'Rastergrafik, verlustbehaftet (Fotos)'],
      answer: [3, 5, 2, 4, 0, 1],
      explanation: 'PNG verlustfrei · JPEG verlustbehaftet · SVG Vektor · FLAC verlustfreies Audio · MP3 verlustbehaftetes Audio · MKV Container für Video, Ton und Untertitel.',
    },
    {
      id: 'd04-q019', kind: 'table', skill: 'data.dateiformate', difficulty: 2,
      prompt: 'Empfiehl für jeden Einsatzzweck **ein** geeignetes Dateiformat (Formatname genügt).',
      columns: [{ key: 'f', label: 'Format', type: 'text' }],
      rows: [
        { label: 'Produktfotos für den Webshop (kurze Ladezeit)', cells: { f: { answer: 'JPEG', accept: ['JPG', '.jpg', '.jpeg', 'WebP', '.webp', 'AVIF'] } } },
        { label: 'Firmenlogo, das von der Visitenkarte bis zur Messewand scharf bleiben muss', cells: { f: { answer: 'SVG', accept: ['.svg', 'EPS', 'PDF', 'AI', 'Vektorgrafik'] } } },
        { label: 'Screenshot mit Text für eine Bedienungsanleitung', cells: { f: { answer: 'PNG', accept: ['.png', 'WebP'] } } },
        { label: 'Rechnungen revisionssicher über 10 Jahre archivieren', cells: { f: { answer: 'PDF/A', accept: ['PDFA', 'PDF-A', 'PDF A', 'PDF/A-1', 'PDF/A-2', 'PDF/A-3'] } } },
        { label: 'Masteraufnahme einer Telefonansage, verlustfrei, aber platzsparend', cells: { f: { answer: 'FLAC', accept: ['.flac', 'ALAC'] } } },
        { label: 'Artikelliste aus der Warenwirtschaft in eine Tabellenkalkulation übernehmen', cells: { f: { answer: 'CSV', accept: ['.csv', 'XLSX', '.xlsx', 'ODS'] } } },
      ],
      hints: ['Fotos vertragen verlustbehaftete Kompression, Text im Bild nicht.', 'Archiv braucht ein genormtes, langzeitstabiles Format.'],
      explanation: 'Foto → **JPEG**/WebP · Logo → **SVG** (Vektor) · Screenshot → **PNG** (verlustfrei, scharfe Kanten) · Archiv → **PDF/A** · Master verlustfrei klein → **FLAC** · Tabellenimport → **CSV**.',
    },
    {
      id: 'd04-q020', kind: 'multi', skill: 'data.dateiformate', difficulty: 1,
      prompt: 'Welche Formate komprimieren **verlustbehaftet**?',
      options: ['MP3', 'PNG', 'JPEG', 'FLAC', 'AAC', 'WAV (PCM)', 'ZIP'],
      answer: [0, 2, 4],
      explanation: 'Verlustbehaftet: **MP3, JPEG, AAC**. PNG, FLAC und ZIP sind verlustfrei; WAV (PCM) ist unkomprimiert.',
    },
    {
      id: 'd04-q021', kind: 'single', skill: 'data.dateiformate', difficulty: 2,
      prompt: 'Eine Kollegin sagt: „WAV ist genauso verlustbehaftet wie MP3, das steht so im Buch.“ Was antwortest du?',
      options: [
        'WAV speichert normalerweise unkomprimierte PCM-Daten und ist damit verlustfrei – nur viel größer als MP3.',
        'Stimmt, WAV entfernt wie MP3 unhörbare Frequenzen.',
        'WAV ist ein Vektorformat für Audio und deshalb verlustfrei skalierbar.',
        'WAV ist immer kleiner als MP3, weil es keine Metadaten speichert.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Das Entfernen unhörbarer Anteile (Psychoakustik) macht MP3, nicht WAV. Manche Bücher ordnen WAV hier falsch ein.', error: 'format-wav-verlustbehaftet' },
        '2': { why: '„Vektor“ gibt es nur bei Grafiken. Audio wird abgetastet (Sampling).', error: 'format-raster-vektor' },
        '3': { why: 'Unkomprimiertes WAV ist deutlich größer als MP3 (CD-Qualität etwa siebenmal so groß wie MP3 mit 192 kbit/s).', error: 'format-groesse' },
      },
      explanation: 'WAV und AIFF sind Container, die in der Regel **unkomprimiertes PCM** enthalten → kein Qualitätsverlust, aber große Dateien. Verlustbehaftet sind MP3, AAC, Ogg Vorbis.',
    },
    {
      id: 'd04-q022', kind: 'free', skill: 'data.dateiformate', difficulty: 2,
      prompt: 'Ein Kunde fragt: „Meine Videos sind alle MP4 – warum spielt der alte Fernseher manche ab und manche nicht?“ Erläutere den Unterschied zwischen **Container** und **Codec**.',
      modelAnswer: 'MP4 ist ein Containerformat: eine Hülle, die Video-, Ton- und Untertitelspuren sowie Metadaten zusammenfasst. Wie die Videospur komprimiert ist, bestimmt der Codec, z. B. H.264, H.265 (HEVC) oder AV1. Zwei MP4-Dateien können also unterschiedliche Codecs enthalten. Der alte Fernseher kann vermutlich nur H.264 dekodieren; Dateien mit H.265 oder AV1 spielt er nicht ab. Lösung: Videos in einen unterstützten Codec umwandeln (transkodieren).',
      keywords: ['Container', 'Codec', 'H.264', 'H.265', 'transkodieren'],
      explanation: 'Container = Verpackung (MP4, MKV, MOV), Codec = Komprimierungsverfahren für den Inhalt (H.264, H.265, AV1; beim Ton z. B. AAC).',
    },
    {
      id: 'd04-q023', kind: 'free', skill: 'data.dateiformate', difficulty: 2,
      prompt: 'Die Geschäftsleitung überlegt, alle Dokumente künftig in einem herstellereigenen (proprietären) Format eines Spezialprogramms zu speichern. Nenne und erläutere **zwei Vorteile offener, genormter Formate**.',
      modelAnswer: '1. Herstellerunabhängigkeit: Offene Formate (z. B. PDF, ODF, PNG, CSV) können von vielen Programmen gelesen werden; fällt der Hersteller weg oder steigen die Lizenzkosten, kommt man trotzdem an die Daten (kein Lock-in). 2. Langzeitlesbarkeit und Archivierung: Die Spezifikation ist öffentlich bzw. genormt, deshalb lassen sich die Dateien auch in vielen Jahren noch öffnen – wichtig für Aufbewahrungsfristen. Weitere Vorteile: einfacher Austausch mit Kunden und Behörden, oft keine Lizenzkosten.',
      keywords: ['Herstellerunabhängigkeit', 'Langzeitarchivierung', 'Austausch', 'Spezifikation'],
      explanation: 'Offen = Spezifikation frei zugänglich, oft genormt (ISO). Proprietär = Hersteller kontrolliert das Format.',
    },
    {
      id: 'd04-q024', kind: 'single', skill: 'data.dateiformate', difficulty: 1,
      prompt: 'Das Firmenlogo sieht auf der neuen Messewand pixelig aus. Was ist die wahrscheinlichste Ursache?',
      options: [
        'Das Logo liegt als Rastergrafik vor; beim starken Vergrößern werden die Pixel sichtbar. Eine Vektorgrafik (z. B. SVG) bliebe scharf.',
        'Die Farbtiefe des Logos ist zu hoch.',
        'JPEG ist ein Vektorformat und kann nicht vergrößert werden.',
        'Das Logo ist verlustfrei komprimiert.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Eine hohe Farbtiefe verbessert die Farbdarstellung, sie verursacht keine Pixel.', error: 'format-raster-vektor' },
        '2': { why: 'JPEG ist eine **Raster**grafik.', error: 'format-raster-vektor' },
        '3': { why: 'Verlustfreie Kompression verändert das Bild nicht.', error: 'format-raster-vektor' },
      },
      explanation: 'Rastergrafiken haben eine feste Pixelzahl. Vektorgrafiken speichern Formen und werden bei jeder Größe neu berechnet.',
    },
    {
      id: 'd04-q025', kind: 'table', skill: 'data.dateiformate', difficulty: 2,
      prompt: 'Ordne jedem Format die Art der Speicherung zu: **verlustfrei**, **verlustbehaftet** oder **unkomprimiert**.',
      columns: [{ key: 'k', label: 'Speicherung', type: 'text' }],
      rows: [
        { label: 'PNG', cells: { k: { answer: 'verlustfrei', accept: ['verlustfrei komprimiert', 'lossless'] } } },
        { label: 'JPEG', cells: { k: { answer: 'verlustbehaftet', accept: ['verlustbehaftet komprimiert', 'lossy'] } } },
        { label: 'WAV (PCM)', cells: { k: { answer: 'unkomprimiert', accept: ['keine Kompression', 'ohne Kompression', 'nicht komprimiert'] } } },
        { label: 'FLAC', cells: { k: { answer: 'verlustfrei', accept: ['verlustfrei komprimiert', 'lossless'] } } },
        { label: 'MP3', cells: { k: { answer: 'verlustbehaftet', accept: ['verlustbehaftet komprimiert', 'lossy'] } } },
        { label: 'ZIP', cells: { k: { answer: 'verlustfrei', accept: ['verlustfrei komprimiert', 'lossless'] } } },
      ],
      misconceptions: [{ answer: 'verlustbehaftet', cell: '2:k', error: 'format-wav-verlustbehaftet', why: 'WAV enthält normalerweise unkomprimiertes PCM – kein Verlust. (Manche Bücher irren hier.)' }],
      explanation: 'PNG, FLAC, ZIP: **verlustfrei** · JPEG, MP3: **verlustbehaftet** · WAV (PCM): **unkomprimiert**.',
    },

    /* ---------- Austauschformate ---------- */
    {
      id: 'd04-q026', kind: 'table', skill: 'data.austausch', difficulty: 2,
      prompt: `Die Warenwirtschaft liefert diese CSV-Datei:\n\n${CSV_GERAETE}\n\nWie viele **Datensätze** enthält sie, und wie viele **Felder** hat jeder Datensatz?`,
      columns: [{ key: 'n', label: 'Anzahl', type: 'number' }],
      rows: [
        { label: 'Datensätze', cells: { n: { answer: '4' } } },
        { label: 'Felder je Datensatz', cells: { n: { answer: '4' } } },
      ],
      misconceptions: [
        { answer: '5', cell: '0:n', error: 'csv-kopfzeile', why: 'Die erste Zeile ist die **Kopfzeile** mit den Spaltennamen, kein Datensatz.' },
        { answer: '5', cell: '1:n', error: 'csv-anfuehrungszeichen', why: 'Das Semikolon in `"Drucker; Farbe"` steht in Anführungszeichen und trennt deshalb kein Feld.' },
      ],
      hints: ['Ist die erste Zeile ein Datensatz?', 'Achte auf die Anführungszeichen in Zeile G03.'],
      explanation: '**4 Datensätze** (G01–G04; die erste Zeile ist die Kopfzeile). **4 Felder** (InvNr, Typ, Standort, Preis) – das Semikolon in `"Drucker; Farbe"` ist durch die Anführungszeichen geschützt.',
    },
    {
      id: 'd04-q027', kind: 'text', skill: 'data.austausch', difficulty: 2,
      prompt: `Eine Schnittstelle lehnt diese JSON-Datei mit „Syntax Error“ ab. In welcher **Zeile** steckt der Fehler? (nur die Zeilennummer)

\`\`\`
1  {
2    "kunde": "Elektro Krämer GmbH",
3    "standorte": ["Hamburg", "Berlin"],
4    "mitarbeitende": 120,
5  }
\`\`\``,
      accept: ['4', 'Zeile 4'],
      placeholder: 'Zeilennummer',
      hints: ['Prüfe, was nach dem letzten Schlüssel-Wert-Paar steht.'],
      explanation: '**Zeile 4.** Nach dem letzten Element eines Objekts darf in JSON **kein Komma** stehen. Richtig: `"mitarbeitende": 120` ohne Komma.',
    },
    {
      id: 'd04-q028', kind: 'free', skill: 'data.austausch', difficulty: 2,
      prompt: 'Eine CSV-Datei mit Preisen (z. B. `1249,00`) wird an einen Online-Dienst aus den USA geschickt. Dort erscheinen die Preise falsch und die Spalten verrutschen. Erläutere zwei mögliche Ursachen und was du vor dem Export klärst.',
      modelAnswer: 'Ursache 1: Das Dezimalzeichen. In Deutschland ist es das Komma (1249,00), in den USA der Punkt (1249.00); der Dienst liest „1249,00“ nicht als Zahl oder trennt am Komma. Ursache 2: Das Trennzeichen. Deutsche Programme nutzen oft das Semikolon, englischsprachige das Komma; passt es nicht, verrutschen die Spalten. Vor dem Export kläre ich: Trennzeichen, Dezimalzeichen, Textqualifizierer (Anführungszeichen), Kodierung (UTF-8), Datumsformat (am besten ISO 8601) und ob eine Kopfzeile erwartet wird.',
      keywords: ['Dezimalzeichen', 'Trennzeichen', 'Semikolon', 'Komma', 'UTF-8'],
      explanation: 'CSV ist nicht streng genormt. Deshalb müssen Sender und Empfänger Trennzeichen, Dezimalzeichen und Kodierung absprechen.',
    },
    {
      id: 'd04-q029', kind: 'match', skill: 'data.austausch', difficulty: 1,
      prompt: 'Ordne jede Beschreibung dem passenden Format zu.',
      left: [
        'Zeilen und Felder mit Trennzeichen, keine Verschachtelung',
        'Elemente mit Start- und End-Tags, Prüfung gegen ein Schema (DTD/XSD) möglich',
        'Objekte in geschweiften Klammern mit Schlüssel-Wert-Paaren, Listen in eckigen Klammern',
        'Festgelegte Tags zur Darstellung von Webseiten im Browser',
      ],
      right: ['JSON', 'HTML', 'CSV', 'XML'],
      answer: [2, 3, 0, 1],
      explanation: 'CSV = flache Tabelle · XML = Datenbaum mit eigenen Tags · JSON = Objekte und Arrays · HTML = Auszeichnungssprache für Webseiten.',
    },
    {
      id: 'd04-q030', kind: 'free', skill: 'data.austausch', difficulty: 3,
      prompt: 'Ein Kunde möchte Gerätedaten (mit mehreren Ansprechpartnern je Standort) täglich automatisch an eine Web-Anwendung übertragen. Vergleiche CSV und JSON für diesen Zweck und gib eine begründete Empfehlung.',
      modelAnswer: 'CSV ist klein und mit jeder Tabellenkalkulation lesbar, kann aber nur flache Tabellen abbilden; mehrere Ansprechpartner je Standort müssten in zusätzliche Spalten oder Dateien aufgeteilt werden. Außerdem kennt CSV keine Datentypen und ist nicht streng genormt (Trennzeichen, Dezimalzeichen). JSON bildet verschachtelte Daten direkt ab (Standort-Objekt mit Array von Ansprechpartnern), unterscheidet Zahl, Text, Wahrheitswert und null, ist im Web-Umfeld Standard (REST-Schnittstellen) und in UTF-8 festgelegt. Empfehlung: JSON, weil die Daten hierarchisch sind und automatisch an eine Web-Anwendung gehen.',
      keywords: ['verschachtelt', 'hierarchisch', 'Datentypen', 'REST', 'JSON'],
      explanation: 'Faustregel: flache Tabellen für Menschen/Tabellenkalkulation → CSV; verschachtelte Daten für Programme und Web-APIs → JSON; Belege mit Schema-Prüfung (z. B. E-Rechnung) → XML.',
    },
    {
      id: 'd04-q031', kind: 'text', skill: 'data.austausch', difficulty: 1,
      prompt: 'Ein Logeintrag soll den **24. Dezember 2026** nach ISO 8601 enthalten. Wie lautet das Datum?',
      accept: ['2026-12-24'],
      placeholder: 'JJJJ-MM-TT',
      misconceptions: [{ answer: '24.12.2026', error: 'iso8601-reihenfolge', why: 'Das ist die deutsche Schreibweise. ISO 8601: Jahr-Monat-Tag.' }],
      explanation: '**2026-12-24.** Größte Einheit zuerst, Bindestriche als Trenner.',
    },
    {
      id: 'd04-q032', kind: 'number', skill: 'data.austausch', difficulty: 3,
      prompt: 'Ein Server speichert Zeitpunkte als **Unix-Zeit** (Sekunden seit 01.01.1970 00:00 UTC). Der Zeitpunkt 2026-01-01T00:00:00Z hat den Wert **1767225600**. Welcher Unix-Zeitstempel gehört zu **2026-01-02T06:00:00Z**?',
      answer: 1767333600,
      hints: ['Ein Tag hat 86.400 Sekunden, eine Stunde 3.600.'],
      misconceptions: [{ answer: '1767247200', error: 'unixzeit-tag-vergessen', why: 'Du hast nur die 6 Stunden addiert. Es liegt zusätzlich ein ganzer Tag (86.400 s) dazwischen.' }],
      explanation: '**1767333600.** Abstand: 1 Tag + 6 Stunden = 86.400 + 21.600 = 108.000 s. 1.767.225.600 + 108.000 = 1.767.333.600.',
    },
    {
      id: 'd04-q033', kind: 'free', skill: 'data.austausch', difficulty: 2,
      prompt: 'Erläutere den Unterschied zwischen **HTML** und **XML** und erkläre, was ein **wohlgeformtes** XML-Dokument ist.',
      modelAnswer: 'HTML ist eine Auszeichnungssprache zur Darstellung von Webseiten mit fest vorgegebenen Tags (z. B. p, table, img); Browser sind fehlertolerant. XML dient zur Beschreibung und zum Austausch von Daten; die Tags (Elementnamen) legt man selbst fest, die Syntaxregeln sind streng. Wohlgeformt ist ein XML-Dokument, wenn es genau ein Wurzelelement hat, jedes Element geschlossen ist, die Elemente korrekt verschachtelt sind, Attributwerte in Anführungszeichen stehen und die Groß-/Kleinschreibung von Start- und End-Tag übereinstimmt. Gültig ist es erst, wenn es zusätzlich einem Schema (DTD oder XSD) entspricht.',
      keywords: ['Darstellung', 'Daten', 'eigene Tags', 'Wurzelelement', 'verschachtelt', 'Schema'],
      explanation: 'HTML = Darstellung, XML = Daten. Wohlgeformt = Syntax stimmt, gültig = passt zum Schema.',
    },
    {
      id: 'd04-q034', kind: 'multi', skill: 'data.austausch', difficulty: 2,
      prompt: 'Welche Regeln gelten für gültiges **JSON**?',
      options: [
        'Schlüssel stehen in doppelten Anführungszeichen.',
        'Nach dem letzten Element eines Objekts darf ein Komma stehen.',
        'Kommentare mit // sind erlaubt.',
        'true, false und null sind gültige Werte.',
        'Arrays stehen in eckigen Klammern.',
        'Zeichenketten dürfen in einfachen Anführungszeichen stehen.',
      ],
      answer: [0, 3, 4],
      explanation: 'Richtig: doppelte Anführungszeichen für Schlüssel, true/false/null, Arrays in [ ]. Nicht erlaubt: Komma am Ende, Kommentare, einfache Anführungszeichen.',
    },

    /* ---------- Datenqualität ---------- */
    {
      id: 'd04-q035', kind: 'match', skill: 'data.qualitaet', difficulty: 1,
      prompt: 'Ordne jedem Mangel das verletzte Qualitätskriterium zu.',
      left: [
        'Bei 40 Kunden fehlt die E-Mail-Adresse (Pflichtfeld).',
        'Ein Kunde steht zweimal mit unterschiedlicher Schreibweise in der Liste.',
        'Die Adresse eines Kunden stammt von vor seinem Umzug.',
        'Im CRM steht für dieselbe Firma PLZ 20095, in der Warenwirtschaft 20097.',
        'Datumsangaben stehen teils als 04.11.2026, teils als 2026-11-04.',
        'Temperaturwerte sind nur in ganzen Grad statt auf 0,1 °C erfasst.',
      ],
      right: ['Einheitlichkeit', 'Vollständigkeit', 'Genauigkeit', 'Eindeutigkeit (Dublettenfreiheit)', 'Konsistenz', 'Aktualität'],
      answer: [1, 3, 5, 4, 0, 2],
      explanation: 'Fehlendes Pflichtfeld → Vollständigkeit · Dublette → Eindeutigkeit · alte Adresse → Aktualität · Widerspruch zwischen Systemen → Konsistenz · Formatmix → Einheitlichkeit · zu grob erfasst → Genauigkeit.',
    },
    {
      id: 'd04-q036', kind: 'number', skill: 'data.qualitaet', difficulty: 2,
      prompt: 'Der Kundenstamm umfasst **2.400 Datensätze**. Bei **180** fehlt mindestens ein Pflichtfeld. Wie hoch ist die **Vollständigkeit** in Prozent? (eine Nachkommastelle)',
      answer: 92.5,
      tolerance: 0.05,
      unit: '%',
      misconceptions: [{ answer: '7.5', error: 'quote-fehleranteil', why: '7,5 % ist der Anteil der **unvollständigen** Datensätze. Gefragt ist der vollständige Anteil.' }],
      explanation: '**92,5 %.** (2.400 − 180) ÷ 2.400 = 2.220 ÷ 2.400 = 0,925 → 92,5 %.',
    },
    {
      id: 'd04-q037', kind: 'number', skill: 'data.qualitaet', difficulty: 2,
      prompt: 'Eine Prüfung ergibt: Von **1.600** Lieferantendatensätzen sind **85 %** aktuell. Wie viele Datensätze müssen aktualisiert werden?',
      answer: 240,
      unit: 'Datensätze',
      misconceptions: [{ answer: '1360', error: 'quote-fehleranteil', why: '1.360 Datensätze sind **aktuell**. Zu aktualisieren sind die übrigen 15 %.' }],
      explanation: '**240.** 1.600 · (1 − 0,85) = 1.600 · 0,15 = 240.',
    },
    {
      id: 'd04-q038', kind: 'table', skill: 'data.qualitaet', difficulty: 2,
      prompt: `**Beleg – Auszug aus der Kundenliste (Prüfdatum 04.11.2026):**

| Nr | KdNr | Name | E-Mail | PLZ | Ort | Letzte Bestätigung |
|---|---|---|---|---|---|---|
| 1 | K-1001 | Bauer GmbH | info@bauer.example | 20095 | Hamburg | 2026-09-01 |
| 2 | K-1002 | Meyer KG | – | 10115 | Berlin | 2026-08-12 |
| 3 | K-1003 | Schulz & Co. | kontakt@schulz.example | 2009 | Hamburg | 2026-10-02 |
| 4 | K-1004 | Bauer GmbH | info@bauer.example | 20095 | Hamburg | 2026-09-01 |
| 5 | K-1005 | Krause OHG | mail@krause.example | 22767 | Hamburg | 2019-02-11 |

Die E-Mail-Adresse ist ein Pflichtfeld. Nenne für die Zeilen 2 bis 5 jeweils das verletzte Qualitätskriterium.`,
      columns: [{ key: 'k', label: 'Kriterium', type: 'text' }],
      rows: [
        { label: 'Zeile 2', cells: { k: { answer: 'Vollständigkeit', accept: ['vollständig', 'unvollständig'] } } },
        { label: 'Zeile 3', cells: { k: { answer: 'Korrektheit', accept: ['Richtigkeit', 'korrekt', 'richtig', 'Gültigkeit', 'Plausibilität'] } } },
        { label: 'Zeile 4', cells: { k: { answer: 'Eindeutigkeit', accept: ['Dublettenfreiheit', 'Redundanzfreiheit', 'Dublette', 'Redundanz', 'eindeutig'] } } },
        { label: 'Zeile 5', cells: { k: { answer: 'Aktualität', accept: ['aktuell', 'veraltet', 'Aktualitaet'] } } },
      ],
      explanation: 'Zeile 2: E-Mail fehlt → **Vollständigkeit** · Zeile 3: PLZ hat nur 4 Stellen → **Korrektheit** · Zeile 4: identisch mit Zeile 1 → **Eindeutigkeit** (Dublette) · Zeile 5: seit über 7 Jahren nicht bestätigt → **Aktualität**.',
    },
    {
      id: 'd04-q039', kind: 'free', skill: 'data.qualitaet', difficulty: 2,
      prompt: 'Die Buchhaltung beschwert sich über zurückkommende Rechnungen und doppelte Mahnungen. Nenne zwei Folgen schlechter Datenqualität und drei technische oder organisatorische Maßnahmen zur Verbesserung.',
      modelAnswer: 'Folgen: Rechnungen und Waren gehen an falsche oder veraltete Adressen (Kosten, verspätete Zahlungen), Kunden erhalten doppelte Post oder Mahnungen (Imageschaden), Auswertungen sind falsch, Verstoß gegen die DSGVO-Pflicht zu richtigen Daten. Maßnahmen: Pflichtfelder und Eingabeprüfungen (z. B. PLZ genau 5 Ziffern, E-Mail-Format), Auswahllisten statt Freitext, automatische Dublettenprüfung beim Anlegen, regelmäßige Bereinigung und Bestätigung der Adressdaten, eine führende Datenquelle für Stammdaten, einheitliche Formate (ISO 8601, UTF-8), Schulung der Mitarbeitenden.',
      keywords: ['Pflichtfeld', 'Eingabeprüfung', 'Dublettenprüfung', 'Bereinigung', 'Aktualität'],
      explanation: 'Gute Antworten verbinden jede Maßnahme mit einem Kriterium (z. B. Dublettenprüfung → Eindeutigkeit).',
    },

    /* ---------- Bildspeicher ---------- */
    {
      id: 'd04-q040', kind: 'number', skill: 'data.bildspeicher', difficulty: 2,
      prompt: 'Ein Foto im Format **20 cm × 15 cm** wird mit **300 ppi** und **24 Bit** Farbtiefe unkomprimiert gescannt. Berechne den Speicherbedarf in **MiB** (1 MiB = 1.048.576 Byte). Pixel je Seite mit cm ÷ 2,54 · ppi auf ganze Pixel runden, Ergebnis auf zwei Nachkommastellen.',
      answer: 11.97,
      tolerance: 0.01,
      accept: [11.98],
      unit: 'MiB',
      hints: ['20 cm ÷ 2,54 · 300 = ? Pixel', 'Byte = Pixel · 24 ÷ 8 = Pixel · 3'],
      misconceptions: [
        { answer: '12.56', error: 'einheit-1000-1024', why: '12,56 wären MB (÷ 1.000.000). Gefragt ist MiB (÷ 1.048.576).' },
        { answer: '95.8', error: 'einheit-bit-byte', why: 'Das ist der Wert in Megabit (vergessen, durch 8 zu teilen).' },
        { answer: '77.25', error: 'ppi-cm-als-zoll', why: 'Du hast cm direkt mit ppi multipliziert. Erst ÷ 2,54.' },
      ],
      explanation: '**11,97 MiB.**\n\n1. Breite: 20 ÷ 2,54 · 300 = 2.362,20 → 2.362 px; Höhe: 15 ÷ 2,54 · 300 = 1.771,65 → 1.772 px\n\n2. Pixel: 2.362 · 1.772 = 4.185.464\n\n3. Byte: 4.185.464 · 3 = 12.556.392 Byte\n\n4. MiB: 12.556.392 ÷ 1.048.576 = **11,97 MiB**\n\n(Mit auf zwei Stellen gerundeten Zoll-Werten 7,87 und 5,91 ergeben sich 11,98 MiB – auch richtig.)',
    },
    {
      id: 'd04-q041', kind: 'number', skill: 'data.bildspeicher', difficulty: 2,
      prompt: 'Eine Digitalkamera liefert Bilder mit **3000 × 2000** Pixeln. Wie breit (in **cm**) wird der Ausdruck, wenn mit **300 ppi** gedruckt wird?',
      answer: 25.4,
      tolerance: 0.05,
      unit: 'cm',
      misconceptions: [
        { answer: '10', error: 'ppi-zoll-als-cm', why: '10 ist die Breite in **Zoll**. Umrechnen: · 2,54 = 25,4 cm.' },
        { answer: '3.94', error: 'ppi-mal-254', why: 'Zoll in cm: mit 2,54 **multiplizieren**, nicht teilen.' },
      ],
      explanation: '**25,4 cm.** 3000 px ÷ 300 ppi = 10 Zoll; 10 · 2,54 = 25,4 cm.',
    },
    {
      id: 'd04-q042', kind: 'free', skill: 'data.bildspeicher', difficulty: 2,
      prompt: 'Ein Kunde rechnet aus, dass seine Scans „12,56 MB“ groß sein müssten. Windows zeigt aber „11,97 MB“ an. Erkläre den Unterschied.',
      modelAnswer: 'Der Kunde rechnet mit Dezimalpräfixen (1 MB = 1.000.000 Byte, SI). Windows rechnet mit Binärpräfixen (1.048.576 Byte = 1 MiB), schreibt aber „MB“. Beide Angaben beschreiben dieselbe Dateigröße von etwa 12,56 Millionen Byte: 12.556.392 ÷ 1.000.000 = 12,56 MB bzw. ÷ 1.048.576 = 11,97 MiB. Korrekt wäre bei Windows die Bezeichnung MiB.',
      keywords: ['Dezimalpräfix', 'Binärpräfix', '1000', '1024', 'MiB'],
      explanation: 'MB = 10⁶ Byte, MiB = 2²⁰ Byte. Der Unterschied beträgt bei Mega etwa 4,9 %, bei Giga etwa 7,4 %, bei Tera etwa 10 %.',
    },

    /* ---------- Audio und Video ---------- */
    {
      id: 'd04-q043', kind: 'number', skill: 'data.mediengroesse', difficulty: 1,
      prompt: 'Welche **Datenrate in kbit/s** hat unkomprimiertes Audio in **CD-Qualität** (44,1 kHz, 16 Bit, Stereo)?',
      answer: 1411.2,
      tolerance: 0.05,
      unit: 'kbit/s',
      misconceptions: [
        { answer: '705.6', error: 'audio-kanaele-vergessen', why: 'Stereo hat 2 Kanäle – du hast nur einen gerechnet.' },
        { answer: '176.4', error: 'einheit-bit-byte', why: 'Das sind kByte/s. Datenraten werden in Bit angegeben.' },
      ],
      explanation: '**1.411,2 kbit/s.** 44.100 · 16 · 2 = 1.411.200 Bit/s = 1.411,2 kbit/s.',
    },
    {
      id: 'd04-q044', kind: 'number', skill: 'data.mediengroesse', difficulty: 2,
      prompt: 'Eine Telefonanlage zeichnet Gespräche mit **8 kHz**, **8 Bit**, **Mono** unkomprimiert auf. Wie viel Speicher braucht ein Gespräch von **12 Minuten** in **MB** (10⁶ Byte)? (zwei Nachkommastellen)',
      answer: 5.76,
      tolerance: 0.01,
      unit: 'MB',
      misconceptions: [
        { answer: '46.08', error: 'einheit-bit-byte', why: 'Das sind Megabit – noch durch 8 teilen.' },
        { answer: '0.1', error: 'zeit-minuten-sekunden', why: '12 Minuten = 720 Sekunden.' },
      ],
      explanation: '**5,76 MB.** 8.000 · 8 · 1 · 720 s = 46.080.000 Bit; ÷ 8 = 5.760.000 Byte = 5,76 MB.',
    },
    {
      id: 'd04-q045', kind: 'number', skill: 'data.mediengroesse', difficulty: 3,
      prompt: `**Handlungssituation:** Ein Kunde will **40 Schulungsvideos** auf einem NAS speichern. Datenblatt der Videos:

| Merkmal | Wert |
|---|---|
| Auflösung | 1920 × 1080 Pixel |
| Farbtiefe | 24 Bit je Pixel |
| Bildrate | 30 Bilder/s |
| Dauer je Video | 20 Minuten |
| Kompression | 1 : 150 |

Wie viel Speicher wird benötigt? Angabe in **GiB** (2³⁰ Byte), zwei Nachkommastellen, Ton vernachlässigen.`,
      answer: 55.62,
      tolerance: 0.01,
      unit: 'GiB',
      hints: ['Bit pro Bild = 1920 · 1080 · 24.', 'Dann · 30 · 1.200 s, ÷ 8, ÷ 150, · 40.'],
      misconceptions: [
        { answer: '59.72', error: 'einheit-1000-1024', why: '59,72 wären GB (÷ 10⁹). Gefragt ist GiB (÷ 2³⁰).' },
        { answer: '8342.74', error: 'video-kompression-vergessen', why: 'Der Kompressionsfaktor 1 : 150 fehlt (÷ 150).' },
        { answer: '444.95', error: 'einheit-bit-byte', why: 'Bit nicht durch 8 geteilt.' },
      ],
      explanation: '**55,62 GiB.**\n\n1. Bit pro Bild: 1920 · 1080 · 24 = 49.766.400 Bit\n\n2. Pro Video: · 30 · 1.200 s = 1.791.590.400.000 Bit; ÷ 8 = 223.948.800.000 Byte\n\n3. Kompression: ÷ 150 = 1.492.992.000 Byte je Video\n\n4. 40 Videos: · 40 = 59.719.680.000 Byte\n\n5. GiB: ÷ 1.073.741.824 = **55,62 GiB**',
    },
    {
      id: 'd04-q046', kind: 'free', skill: 'data.mediengroesse', difficulty: 2,
      prompt: 'Erläutere die Begriffe **Abtastrate** und **Abtasttiefe** und begründe, warum Audio-CDs mit 44,1 kHz abgetastet werden.',
      modelAnswer: 'Die Abtastrate (Samplingrate) gibt an, wie oft das analoge Signal pro Sekunde gemessen wird (Hz). Die Abtasttiefe (Bittiefe) gibt an, mit wie vielen Bit jeder Messwert gespeichert wird; n Bit ergeben 2ⁿ Stufen (16 Bit = 65.536). Nach dem Abtasttheorem (Nyquist-Shannon) muss die Abtastrate mehr als doppelt so hoch sein wie die höchste zu erfassende Frequenz. Menschen hören bis etwa 20 kHz; 44,1 kHz liegt knapp über 2 · 20 kHz und erfasst damit den hörbaren Bereich.',
      keywords: ['Messungen pro Sekunde', 'Bit je Messwert', 'Abtasttheorem', 'doppelt', '20 kHz'],
      explanation: 'Abtastrate = wie oft, Abtasttiefe = wie genau. Abtasttheorem: fₐ > 2 · f_max.',
    },
    {
      id: 'd04-q047', kind: 'order', skill: 'data.mediengroesse', difficulty: 1,
      prompt: 'Bringe die Rechenschritte für den Speicherbedarf eines komprimierten Videos in die richtige Reihenfolge.',
      items: [
        'Pixel pro Bild berechnen (Breite · Höhe)',
        'Bit pro Bild berechnen (· Bit je Pixel)',
        'Bit für die gesamte Dauer berechnen (· Bilder/s · Sekunden)',
        'In Byte umrechnen und Kompression anwenden (÷ 8, ÷ Kompressionsfaktor)',
        'In die gefragte Einheit umrechnen (MB/GB oder MiB/GiB)',
      ],
      explanation: 'Pixel → Bit pro Bild → Bit gesamt → Byte und Kompression → Zieleinheit. Die Einheit kommt immer zuletzt, damit keine Rundungsfehler entstehen.',
    },
  ],
};
