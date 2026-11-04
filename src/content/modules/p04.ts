import type { Module } from '../types';

/** Codeblock-Begrenzer */
const F = '```';

export const p04: Module = {
  id: 'p04',
  nr: 4,
  area: 'programmierung',
  title: 'Objektorientierung & Modellierung mit UML',
  short: 'Klasse, Objekt, Kapselung, Vererbung, Polymorphie – und die UML-Diagramme Aktivität, Anwendungsfall, Klasse und Sequenz lesen und erstellen.',
  icon: 'Workflow',
  relevance: 'ap1',
  prerequisites: ['p02', 'p03'],
  skills: [
    { id: 'oop.concepts', module: 'p04', title: 'Klasse, Objekt, Abstraktion, Kapselung, Sichtbarkeit', requires: ['prog.functions'] },
    { id: 'oop.inheritance', module: 'p04', title: 'Vererbung und Polymorphie', requires: ['oop.concepts'] },
    { id: 'uml.activity', module: 'p04', title: 'UML-Aktivitätsdiagramm: Elemente und Überblick', requires: ['prog.loops'] },
    { id: 'uml.activity2code', module: 'p04', title: 'Aktivitätsdiagramm erstellen und in Pseudocode übertragen', requires: ['uml.activity'] },
    { id: 'uml.usecase', module: 'p04', title: 'Anwendungsfalldiagramm', requires: ['uml.activity'] },
    { id: 'uml.class', module: 'p04', title: 'Klassendiagramm mit Beziehungen und Multiplizitäten', requires: ['oop.inheritance'] },
    { id: 'uml.sequence', module: 'p04', title: 'Sequenzdiagramm', requires: ['uml.class'] },
  ],
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'p04-l01',
      title: 'Objektorientierung: Klasse, Objekt, Abstraktion, Kapselung',
      minutes: 25,
      relevance: 'ap1',
      skills: ['oop.concepts'],
      steps: [
        {
          type: 'explain',
          title: 'Software als Modell der realen Welt',
          body: `In der **objektorientierten Programmierung (OOP)** bildet man Dinge der realen Welt als **Objekte** ab, die **Daten** (Attribute) und **Verhalten** (Methoden) bündeln. Sprachen wie **Java, C#, C++** und **Python** unterstützen OOP.

| Begriff | Bedeutung | Beispiel (Inventarsoftware) |
|---|---|---|
| **Klasse** | **Bauplan** für gleichartige Objekte; legt Attribute und Methoden fest | \`Drucker\` |
| **Objekt** (Instanz) | konkretes Exemplar einer Klasse mit eigenen Attributwerten | der Drucker „PR-HH-03“ im 2. OG |
| **Attribut** | Eigenschaft/Datenfeld eines Objekts | \`seriennummer\`, \`seitenzaehler\` |
| **Methode** | Operation/Funktion, die das Objekt ausführen kann | \`drucken()\`, \`tonerWechseln()\` |
| **Konstruktor** | spezielle Methode, die beim **Erzeugen** eines Objekts aufgerufen wird und es initialisiert | \`new Drucker("PR-HH-03")\` |

Aus **einer** Klasse können **beliebig viele** Objekte erzeugt werden – alle haben dieselben Attribute, aber jeweils **eigene Werte**.

**Die vier Grundprinzipien der OOP:**

1. **Abstraktion** – Man modelliert nur die Eigenschaften, die für den Zweck **relevant** sind. Für die Inventarsoftware zählen Seriennummer und Standort, nicht die Farbe des Gehäuses. Wer eine Klasse benutzt, kennt nur ihre Schnittstelle, nicht die Details.
2. **Kapselung** (Datenkapselung, *information hiding*) – Attribute werden **versteckt** (\`private\`) und nur über **Methoden** (z. B. Getter/Setter) zugänglich gemacht. So kann die Klasse **Werte prüfen** und verhindern, dass ein Objekt in einen ungültigen Zustand gerät (z. B. negativer Seitenzähler).
3. **Vererbung** – nächste Lektion.
4. **Polymorphie** – nächste Lektion.

**Sichtbarkeiten (Zugriffsmodifizierer) und ihre UML-Symbole:**

| UML | Schlüsselwort | Zugriff erlaubt für |
|---|---|---|
| **+** | public | alle Klassen |
| **−** | private | nur die Klasse selbst |
| **#** | protected | die Klasse selbst und ihre Unterklassen (in Java zusätzlich das Paket) |
| **~** | package | Klassen im selben Paket |

**Faustregel:** Attribute \`private\`, Methoden der öffentlichen Schnittstelle \`public\`.

${F}
// Java – Kapselung mit Prüfung im Setter
public class Drucker {
    private String seriennummer;
    private int seitenzaehler;

    public Drucker(String seriennummer) {      // Konstruktor
        this.seriennummer = seriennummer;
        this.seitenzaehler = 0;
    }
    public int getSeitenzaehler() { return seitenzaehler; }
    public void drucken(int seiten) {
        if (seiten > 0) { seitenzaehler += seiten; }   // ungültige Werte abweisen
    }
}
${F}`,
        },
        {
          type: 'visual',
          title: 'Die vier Säulen der Objektorientierung',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Abstraktion', text: 'Nur das Wesentliche modellieren – Details verbergen.', icon: 'Shapes' },
                { title: 'Kapselung', text: 'Daten private, Zugriff nur über geprüfte Methoden.', icon: 'Lock' },
                { title: 'Vererbung', text: 'Unterklassen übernehmen Attribute und Methoden der Oberklasse („ist ein“).', icon: 'GitBranch' },
                { title: 'Polymorphie', text: 'Gleicher Methodenaufruf, unterschiedliches Verhalten je nach Objekt.', icon: 'Shuffle' },
              ],
            },
          },
          caption: 'Merkhilfe „AKVP“: Abstraktion, Kapselung, Vererbung, Polymorphie.',
        },
        {
          type: 'example',
          title: 'Eine Klasse für die Inventarverwaltung entwerfen',
          problem: 'Die Elektro Krämer GmbH möchte ihre **Notebooks** in einer Inventarsoftware verwalten. Benötigt werden Inventarnummer, Modell, zugeordneter Mitarbeiter und Ausgabedatum. Ein Notebook kann einem Mitarbeiter zugewiesen und zurückgenommen werden. Entwirf die Klasse mit Sichtbarkeiten.',
          steps: [
            { label: 'Abstraktion: relevante Attribute', body: 'inventarnummer, modell, mitarbeiter, ausgabedatum – Gewicht oder Farbe sind für die Inventarisierung irrelevant.' },
            { label: 'Kapselung: Sichtbarkeit', body: 'Alle Attribute **private** (−), damit z. B. die Inventarnummer nicht versehentlich geändert wird.' },
            { label: 'Methoden (öffentliche Schnittstelle)', body: '+ zuweisen(mitarbeiter: String, datum: Date): void\n+ zuruecknehmen(): void\n+ getInventarnummer(): String\n+ istAusgegeben(): boolean' },
            { label: 'Als UML-Klasse', body: `${F}\n┌────────────────────────────────────────────┐\n│                 Notebook                   │\n├────────────────────────────────────────────┤\n│ - inventarnummer: String                   │\n│ - modell: String                           │\n│ - mitarbeiter: String                      │\n│ - ausgabedatum: Date                       │\n├────────────────────────────────────────────┤\n│ + Notebook(inventarnummer: String, modell: String) │\n│ + zuweisen(mitarbeiter: String, datum: Date): void │\n│ + zuruecknehmen(): void                    │\n│ + getInventarnummer(): String              │\n│ + istAusgegeben(): boolean                 │\n└────────────────────────────────────────────┘\n${F}` },
          ],
          result: 'Klasse Notebook: private Attribute, öffentliche Methoden – Abstraktion + Kapselung.',
        },
        {
          type: 'check',
          question: {
            id: 'p04-c01', kind: 'single', skill: 'oop.concepts', difficulty: 1,
            prompt: 'Was beschreibt den Unterschied zwischen **Klasse** und **Objekt** am besten?',
            options: ['Die Klasse ist der Bauplan, das Objekt ein konkretes Exemplar mit eigenen Attributwerten.', 'Ein Objekt ist der Bauplan, aus dem Klassen erzeugt werden.', 'Klasse und Objekt sind Synonyme.', 'Eine Klasse enthält nur Methoden, ein Objekt nur Attribute.'],
            answer: 0,
            distractors: {
              '1': { why: 'Umgekehrt: Aus einer Klasse werden Objekte (Instanzen) erzeugt.', error: 'oop-klasse-objekt' },
              '2': { why: 'Eine Klasse beschreibt viele mögliche Objekte – es sind verschiedene Ebenen.', error: 'oop-klasse-objekt' },
              '3': { why: 'Die Klasse definiert Attribute und Methoden; jedes Objekt hat eigene Attributwerte und nutzt die Methoden.', error: 'oop-klasse-objekt' },
            },
            explanation: 'Klasse = Bauplan (z. B. `Drucker`), Objekt = Instanz (z. B. der Drucker „PR-HH-03“).',
          },
        },
        { type: 'practice', title: 'Übung: OOP-Grundbegriffe', questionIds: ['p04-q001', 'p04-q002', 'p04-q003', 'p04-q004', 'p04-q005', 'p04-q034'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Klasse = Bauplan, Objekt = Instanz mit eigenen Werten.', 'Attribute = Daten, Methoden = Verhalten, Konstruktor = Initialisierung.', 'Abstraktion: nur Relevantes · Kapselung: private Daten, Zugriff über Methoden.', 'UML-Sichtbarkeit: + public, − private, # protected, ~ package.'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p04-l02',
      title: 'Vererbung und Polymorphie',
      minutes: 25,
      relevance: 'ap1',
      skills: ['oop.inheritance'],
      steps: [
        {
          type: 'explain',
          title: '„ist ein“ – gemeinsame Eigenschaften nur einmal definieren',
          body: `**Vererbung:** Eine **Unterklasse** (abgeleitete Klasse, Subklasse) übernimmt alle Attribute und Methoden einer **Oberklasse** (Basisklasse, Superklasse) und kann **eigene ergänzen** oder geerbte **verändern**. Test: Passt der Satz „Ein *Unterklasse* **ist ein** *Oberklasse*“? – „Ein Drucker ist ein Gerät“ ✔, „Ein Drucker ist ein Toner“ ✘.

${F}
             Geraet
        - inventarnummer
        - standort
        + info(): String
             ▲
     ┌───────┴────────┐
  Drucker            Switch
  - seitenzaehler    - portanzahl
  + info(): String   + info(): String
${F}

**Vorteile:** keine doppelte Implementierung, einheitliche Schnittstelle, leichte Erweiterbarkeit (neue Geräteklasse hinzufügen, ohne Bestehendes zu ändern).

**Einfach- und Mehrfachvererbung:**
- **Einfachvererbung:** eine Klasse hat genau **eine** direkte Oberklasse – so bei Klassen in **Java** und **C#**.
- **Mehrfachvererbung:** mehrere direkte Oberklassen – möglich in **C++** und **Python**. Problem: Konflikte, wenn zwei Oberklassen gleichnamige Methoden haben („Diamond-Problem“).
- Java und C# erlauben stattdessen, **mehrere Interfaces** zu implementieren.

**Abstrakte Klasse:** Kann **nicht** instanziiert werden, dient nur als gemeinsame Oberklasse und kann abstrakte Methoden (ohne Rumpf) vorgeben, die Unterklassen implementieren **müssen** (z. B. \`Geraet\` – es gibt nur konkrete Drucker, Switches …).
**Interface (Schnittstelle):** legt nur fest, **welche** Methoden eine Klasse anbieten muss (z. B. \`Wartbar\` mit \`warten()\`).

**Polymorphie** („Vielgestaltigkeit“): Derselbe Methodenaufruf führt je nach Objekt zu **unterschiedlichem Verhalten**.

| Art | Was passiert | Beispiel |
|---|---|---|
| **Überschreiben** (Overriding) | Unterklasse definiert eine geerbte Methode mit **gleicher Signatur** neu. Welche Version läuft, wird **zur Laufzeit** anhand des tatsächlichen Objekts entschieden (**dynamische Bindung**). | \`Drucker.info()\` überschreibt \`Geraet.info()\` |
| **Überladen** (Overloading) | **Gleicher Methodenname**, aber **unterschiedliche Parameterliste** (Anzahl/Typen) in derselben Klasse. Die Auswahl erfolgt **beim Kompilieren**. | \`drucken()\`, \`drucken(int kopien)\`, \`drucken(String datei, int kopien)\` |

${F}
// Java – dynamische Bindung
Geraet[] geraete = { new Drucker("PR-01"), new Switch("SW-01") };
for (Geraet g : geraete) {
    System.out.println(g.info());   // ruft jeweils Drucker.info() bzw. Switch.info() auf
}
${F}

Die Variable hat den Typ \`Geraet\`, aufgerufen wird aber die Methode des **tatsächlichen Objekts**. So kann ein Programm alle Geräte einheitlich behandeln.`,
        },
        {
          type: 'visual',
          title: 'Überschreiben vs. Überladen',
          widget: {
            kind: 'cards',
            data: {
              columns: 2,
              items: [
                { title: 'Überschreiben (Override)', text: 'Unterklasse ersetzt geerbte Methode – gleiche Signatur. Entscheidung zur Laufzeit (dynamische Bindung).', icon: 'Replace' },
                { title: 'Überladen (Overload)', text: 'Mehrere Methoden gleichen Namens mit verschiedenen Parametern. Entscheidung beim Kompilieren.', icon: 'Copy' },
              ],
            },
          },
          caption: 'Eselsbrücke: Überschreiben = „über die Vererbung hinweg neu schreiben“, Überladen = „den Namen mit mehreren Varianten beladen“.',
        },
        {
          type: 'example',
          title: 'Welche Methode wird aufgerufen?',
          problem: `Gegeben ist folgender Java-Code. Was wird ausgegeben?\n\n${F}java\nclass Geraet {\n    String info() { return "Gerät"; }\n}\nclass Drucker extends Geraet {\n    @Override\n    String info() { return "Drucker"; }\n}\nclass Laserdrucker extends Drucker { }\n\nGeraet a = new Geraet();\nGeraet b = new Drucker();\nGeraet c = new Laserdrucker();\nSystem.out.println(a.info() + ", " + b.info() + ", " + c.info());\n${F}`,
          steps: [
            { label: 'a', body: 'Objekt vom Typ Geraet → `Geraet.info()` → „Gerät“.' },
            { label: 'b', body: 'Variable vom Typ Geraet, **Objekt** vom Typ Drucker → dynamische Bindung → `Drucker.info()` → „Drucker“.' },
            { label: 'c', body: 'Laserdrucker überschreibt info() nicht → **geerbt** von Drucker → „Drucker“.' },
          ],
          result: 'Gerät, Drucker, Drucker',
        },
        {
          type: 'check',
          question: {
            id: 'p04-c02', kind: 'single', skill: 'oop.inheritance', difficulty: 2,
            prompt: 'Eine Klasse `Rechnung` besitzt die Methoden `berechne()`, `berechne(double rabatt)` und `berechne(double rabatt, boolean skonto)`. Wie nennt man das?',
            options: ['Überladen', 'Überschreiben', 'Vererbung', 'Kapselung'],
            answer: 0,
            distractors: {
              '1': { why: 'Überschreiben setzt Vererbung und **gleiche** Signatur voraus.', error: 'polymorphie-arten' },
              '2': { why: 'Es gibt hier keine Ober-/Unterklasse.', error: 'polymorphie-arten' },
              '3': { why: 'Kapselung betrifft das Verbergen von Daten.', error: 'polymorphie-arten' },
            },
            explanation: 'Gleicher Name, unterschiedliche Parameterlisten in derselben Klasse = **Überladen** (statische Polymorphie).',
          },
        },
        { type: 'practice', title: 'Übung: Vererbung & Polymorphie', questionIds: ['p04-q006', 'p04-q007', 'p04-q008', 'p04-q009', 'p04-q010'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Vererbung = „ist ein“-Beziehung; Unterklasse erbt und erweitert.', 'Java/C#: Einfachvererbung bei Klassen, mehrere Interfaces erlaubt.', 'Überschreiben: gleiche Signatur, Laufzeit (dynamische Bindung).', 'Überladen: gleicher Name, andere Parameter, Compilezeit.'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p04-l03',
      title: 'UML im Überblick und die Elemente des Aktivitätsdiagramms',
      minutes: 20,
      relevance: 'ap1',
      skills: ['uml.activity'],
      steps: [
        {
          type: 'explain',
          title: 'Eine gemeinsame Sprache für Softwaremodelle',
          body: `Die **UML (Unified Modeling Language)** ist eine **grafische Modellierungssprache** zur Spezifikation, Konstruktion und Dokumentation von Software. Sie wird von der **Object Management Group (OMG)** standardisiert (aktuelle Version **UML 2.5.1**) und ist unabhängig von einer Programmiersprache. UML 2.5 kennt **14 Diagrammarten**:

| Strukturdiagramme (Aufbau) | Verhaltensdiagramme (Abläufe) |
|---|---|
| **Klassendiagramm**, Objektdiagramm, Komponentendiagramm, Kompositionsstrukturdiagramm, Paketdiagramm, Verteilungsdiagramm, Profildiagramm | **Aktivitätsdiagramm**, **Anwendungsfalldiagramm**, Zustandsdiagramm sowie die Interaktionsdiagramme: **Sequenzdiagramm**, Kommunikationsdiagramm, Zeitverlaufsdiagramm, Interaktionsübersichtsdiagramm |

Für die AP1 sind vor allem **Aktivitäts-, Anwendungsfall-, Klassen- und Sequenzdiagramm** wichtig. Seit der 2. Auflage des AP1-Katalogs ersetzt das **Aktivitätsdiagramm** die früher üblichen Struktogramme und Programmablaufpläne.

**Das Aktivitätsdiagramm** stellt **Abläufe** dar – Geschäftsprozesse ebenso wie Algorithmen.

| Element | Darstellung | Bedeutung |
|---|---|---|
| **Startknoten** | ausgefüllter schwarzer Kreis ● | Beginn des Ablaufs |
| **Aktion** | Rechteck mit abgerundeten Ecken ( … ) | ein Arbeitsschritt, z. B. „Rechnung erstellen“ |
| **Kontrollfluss (Kante)** | Pfeil → | Reihenfolge der Schritte |
| **Verzweigung (Entscheidungsknoten)** | Raute ◇, **ein** Eingang, **mehrere** Ausgänge mit **Bedingungen in eckigen Klammern** (Guards) \`[betrag > 1000]\` / \`[sonst]\` | genau **ein** Weg wird genommen |
| **Zusammenführung (Merge)** | Raute ◇, **mehrere** Eingänge, **ein** Ausgang | alternative Wege laufen wieder zusammen |
| **Gabelung (Fork)** | dicker Balken ▬, ein Eingang, **mehrere** Ausgänge | Aufteilung in **parallele** Abläufe |
| **Vereinigung / Synchronisation (Join)** | dicker Balken ▬, mehrere Eingänge, ein Ausgang | wartet, bis **alle** parallelen Zweige fertig sind |
| **Aktivitätsende** | Kreis mit ausgefülltem Punkt ◉ | gesamte Aktivität endet |
| **Ablaufende (Flow Final)** | Kreis mit Kreuz ⊗ | nur **dieser** Ablaufzweig endet |
| **Partition (Swimlane)** | Bahnen mit Überschrift | zeigt, **wer** (Rolle/Abteilung/System) eine Aktion ausführt |
| **Objektknoten** | Rechteck (nicht abgerundet) | Daten/Dokument, das weitergegeben wird, z. B. „Rechnung“ |

**Wichtig:** Die Guards an einer Verzweigung müssen sich **gegenseitig ausschließen** und **alle Fälle abdecken** (z. B. \`[≥ 100]\` und \`[< 100]\`). Verzweigung ≠ Gabelung: Bei der Verzweigung wird **ein** Weg gewählt, bei der Gabelung laufen **alle** Wege **gleichzeitig**.`,
        },
        {
          type: 'visual',
          title: 'Notationselemente des Aktivitätsdiagramms',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: '● Startknoten', text: 'Hier beginnt der Ablauf (genau ein Ausgang).', icon: 'Circle' },
                { title: '( Aktion )', text: 'Abgerundetes Rechteck mit Verb + Objekt: „Bestellung prüfen“.', icon: 'RectangleHorizontal' },
                { title: '◇ Verzweigung / Merge', text: 'Raute mit Bedingungen [ ] an den Ausgängen bzw. Zusammenführung.', icon: 'Diamond' },
                { title: '▬ Gabelung / Join', text: 'Balken: parallele Abläufe starten bzw. synchronisieren.', icon: 'Minus' },
                { title: '◉ Aktivitätsende', text: 'Kreis mit Punkt: Die gesamte Aktivität ist beendet.', icon: 'CircleDot' },
                { title: '⊗ Ablaufende', text: 'Kreis mit Kreuz: Nur dieser Zweig endet, andere laufen weiter.', icon: 'CircleX' },
                { title: 'Partition', text: 'Swimlane: Wer führt die Aktion aus (Kunde, Vertrieb, Lager)?', icon: 'Columns3' },
                { title: '[Guard]', text: 'Bedingung in eckigen Klammern an einer Kante.', icon: 'Brackets' },
              ],
            },
          },
          caption: 'In der Prüfung zeichnest du von Hand – saubere Symbole und beschriftete Guards bringen die Punkte.',
        },
        {
          type: 'example',
          title: 'Einen Bestellablauf lesen',
          problem: `Lies das Aktivitätsdiagramm (als Textskizze) und beschreibe den Ablauf in Worten.\n\n${F}\n          ●\n          │\n          ▼\n  ( Bestellung erfassen )\n          │\n          ▼\n          ◇───[nicht lieferbar]───▶ ( Kunde informieren ) ──▶ ◉\n          │[lieferbar]\n          ▼\n          ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  (Gabelung)\n          │               │\n          ▼               ▼\n  ( Ware kommissionieren )  ( Rechnung erstellen )\n          │               │\n          ▼               ▼\n          ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  (Vereinigung)\n          │\n          ▼\n  ( Paket versenden )\n          │\n          ▼\n          ◉\n${F}`,
          steps: [
            { label: 'Start und erste Aktion', body: 'Nach dem Start wird die Bestellung erfasst.' },
            { label: 'Verzweigung', body: 'Ist die Ware **nicht lieferbar**, wird der Kunde informiert und der Ablauf endet. Ist sie **lieferbar**, geht es weiter (genau einer der beiden Wege).' },
            { label: 'Gabelung und Vereinigung', body: 'Kommissionieren und Rechnung erstellen laufen **parallel** (unabhängig voneinander). Erst wenn **beide** fertig sind (Join), wird das Paket versendet.' },
            { label: 'Ende', body: 'Nach dem Versand endet die Aktivität.' },
          ],
          result: 'Erfassen → [lieferbar?] → parallel Kommissionieren + Rechnung → Versand → Ende; sonst Kunde informieren → Ende.',
        },
        {
          type: 'check',
          question: {
            id: 'p04-c03', kind: 'match', skill: 'uml.activity', difficulty: 1,
            prompt: 'Ordne die Symbole des Aktivitätsdiagramms ihrer Bedeutung zu.',
            left: ['ausgefüllter Kreis ●', 'abgerundetes Rechteck', 'Raute mit [Bedingungen] an den Ausgängen', 'dicker Balken mit einem Eingang und mehreren Ausgängen', 'Kreis mit ausgefülltem Punkt ◉'],
            right: ['Startknoten', 'Aktion', 'Verzweigung (Entscheidung)', 'Gabelung (Fork)', 'Aktivitätsende'],
            answer: [0, 1, 2, 3, 4],
            explanation: 'Start ●, Aktion (abgerundet), Entscheidung ◇ mit Guards, Gabelung ▬ für Parallelität, Ende ◉.',
          },
        },
        { type: 'practice', title: 'Übung: Aktivitätsdiagramm & UML-Überblick', questionIds: ['p04-q011', 'p04-q012', 'p04-q017', 'p04-q031', 'p04-q032'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['UML (OMG, Version 2.5.1): 14 Diagrammarten, Struktur vs. Verhalten.', 'Aktivitätsdiagramm: Start ●, Aktion, Kante, Verzweigung/Merge ◇, Gabelung/Join ▬, Ende ◉ / ⊗.', 'Guards in [ ] – vollständig und sich gegenseitig ausschließend.', 'Verzweigung = ein Weg, Gabelung = alle Wege parallel.'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p04-l04',
      title: 'Aktivitätsdiagramme erstellen und in Pseudocode übertragen',
      minutes: 25,
      relevance: 'ap1',
      skills: ['uml.activity2code'],
      steps: [
        {
          type: 'explain',
          title: 'Kontrollstrukturen im Aktivitätsdiagramm',
          body: `Jede Kontrollstruktur aus dem Pseudocode hat eine Entsprechung im Aktivitätsdiagramm:

| Pseudocode | Aktivitätsdiagramm |
|---|---|
| Sequenz | Aktionen nacheinander, mit Pfeilen verbunden |
| \`WENN … DANN … SONST … ENDE WENN\` | **Verzweigung** ◇ mit zwei Guards, danach **Zusammenführung** ◇ |
| \`SOLANGE bedingung TUE … ENDE SOLANGE\` | **Merge** ◇ → **Verzweigung** ◇ mit \`[bedingung]\` in den Rumpf und \`[sonst]\` hinaus; vom Rumpfende Pfeil **zurück** zum Merge |
| \`WIEDERHOLE … BIS bedingung\` | Merge → Rumpf → Verzweigung: \`[NICHT bedingung]\` zurück zum Merge, \`[bedingung]\` weiter |
| parallele Tätigkeiten | Gabelung ▬ und Vereinigung ▬ |

**Kopfgesteuerte Schleife als Diagramm:**

${F}
        ( i ← 1 )
            │
            ▼
            ◇ ◀───────────────────┐   (Merge)
            │                     │
            ▼                     │
            ◇──[i > 10]──▶ ( Ergebnis ausgeben ) ──▶ ◉
            │[i ≤ 10]             │
            ▼                     │
   ( summe ← summe + i )          │
            │                     │
            ▼                     │
       ( i ← i + 1 ) ─────────────┘
${F}

**Vorgehen beim Erstellen (Prüfungsaufgabe):**
1. **Akteure/Rollen** klären → ggf. **Partitionen** (Swimlanes) anlegen.
2. **Aktionen** als Verb + Objekt formulieren („Ticket anlegen“, „Rechnung prüfen“).
3. **Entscheidungen** mit vollständigen Guards versehen (\`[ja]\`/\`[nein]\`, \`[≥ 1000 €]\`/\`[< 1000 €]\`).
4. Parallel ausführbare Schritte mit **Gabelung/Vereinigung** darstellen.
5. Jeder Weg muss bei einem **Endknoten** ankommen – keine „toten Enden“.

**Partitionen (Swimlanes)** zeigen Zuständigkeiten. Beispiel Störungsmeldung: Bahn „Mitarbeiter“ (Störung melden), Bahn „Helpdesk“ (Ticket anlegen, Lösung suchen), Bahn „Techniker“ (vor Ort beheben). Kanten dürfen die Bahnen kreuzen – genau dort wechselt die Zuständigkeit.`,
        },
        {
          type: 'visual',
          title: 'Partitionen eines Störungsprozesses',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Mitarbeiter', text: '● → Störung melden → … → Lösung bestätigen → ◉', icon: 'User' },
                { title: 'Helpdesk (1st Level)', text: 'Ticket anlegen → ◇ [lösbar] Lösung mitteilen / [nicht lösbar] an Techniker übergeben', icon: 'Headphones' },
                { title: 'Techniker (2nd Level)', text: 'Störung vor Ort analysieren → beheben → Ticket schließen', icon: 'Wrench' },
              ],
            },
          },
          caption: 'Jede Spalte ist eine Partition (Swimlane). Wechselt der Pfeil die Spalte, wechselt die Zuständigkeit.',
        },
        {
          type: 'example',
          title: 'Vom Diagramm zum Pseudocode',
          problem: `Übertrage das Aktivitätsdiagramm in Pseudocode und bestimme die Ausgabe für die Eingaben 3 und 50.\n\n${F}\n        ●\n        │\n        ▼\n ( menge einlesen )\n        │\n        ▼\n        ◇──[menge ≥ 10]──▶ ( preis ← menge * 4 ) ──┐\n        │[menge < 10]                               │\n        ▼                                           │\n ( preis ← menge * 5 )                              │\n        │                                           │\n        ▼                                           │\n        ◇ ◀─────────────────────────────────────────┘   (Merge)\n        │\n        ▼\n ( preis ausgeben )\n        │\n        ▼\n        ◉\n${F}`,
          steps: [
            { label: 'Struktur erkennen', body: 'Eine Verzweigung mit zwei sich ausschließenden Guards, danach eine Zusammenführung → zweiseitige Verzweigung.' },
            { label: 'Pseudocode', body: `${F}\nEINGABE menge\nWENN menge ≥ 10 DANN\n  preis ← menge * 4\nSONST\n  preis ← menge * 5\nENDE WENN\nAUSGABE preis\n${F}` },
            { label: 'Testläufe', body: 'menge = 3 → 3 ≥ 10 FALSCH → preis = 15 · menge = 50 → WAHR → preis = 200' },
          ],
          result: 'Ausgaben: 15 bzw. 200',
        },
        {
          type: 'check',
          question: {
            id: 'p04-c04', kind: 'number', skill: 'uml.activity2code', difficulty: 2,
            prompt: `Wie oft wird die Aktion **„Paket scannen“** ausgeführt, wenn zu Beginn \`anzahl = 0\` und \`pakete = 4\` gilt?\n\n${F}\n        ●\n        │\n        ▼\n        ◇ ◀───────────────────────────┐   (Merge)\n        │                             │\n        ▼                             │\n        ◇──[anzahl ≥ pakete]──▶ ◉     │\n        │[anzahl < pakete]            │\n        ▼                             │\n ( Paket scannen )                    │\n        │                             │\n        ▼                             │\n ( anzahl ← anzahl + 1 ) ─────────────┘\n${F}`,
            answer: 4,
            hints: ['Das Diagramm entspricht einer kopfgesteuerten Schleife SOLANGE anzahl < pakete.'],
            misconceptions: [{ answer: '5', error: 'schleife-off-by-one', why: 'Bei anzahl = 4 ist [anzahl ≥ pakete] erfüllt – der Ablauf endet, ohne erneut zu scannen.' }],
            explanation: 'Entspricht `SOLANGE anzahl < pakete TUE Paket scannen; anzahl ← anzahl + 1`. anzahl = 0, 1, 2, 3 → **4** Scans, bei anzahl = 4 Ende.',
          },
        },
        { type: 'practice', title: 'Übung: Aktivitätsdiagramme', questionIds: ['p04-q013', 'p04-q014', 'p04-q015', 'p04-q016', 'p04-q033'], count: 4, difficulty: 2 },
        { type: 'summary', points: ['WENN/SONST = Verzweigung + Merge; Schleife = Merge + Verzweigung + Rückkante.', 'Aktionen als Verb + Objekt, Guards vollständig.', 'Partitionen zeigen Zuständigkeiten.', 'Jeder Weg endet in einem Endknoten.'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p04-l05',
      title: 'Anwendungsfalldiagramm: Wer macht was mit dem System?',
      minutes: 20,
      relevance: 'ap1',
      skills: ['uml.usecase'],
      steps: [
        {
          type: 'explain',
          title: 'Die Außensicht auf ein System',
          body: `Das **Anwendungsfalldiagramm** (Use-Case-Diagramm) zeigt, **welche Funktionen** ein System **für welche Akteure** bietet – aus Sicht der Nutzer, ohne Details der Umsetzung. Es entsteht früh im Projekt (Anforderungsanalyse, Lastenheft).

| Element | Darstellung | Bedeutung |
|---|---|---|
| **Akteur** | Strichmännchen (oder Rechteck mit «actor») | Rolle **außerhalb** des Systems: Person **oder** externes System (z. B. Mailserver, Zahlungsdienst) |
| **Anwendungsfall** | **Ellipse** mit Verb + Objekt | Funktion mit Nutzen für einen Akteur: „Ticket anlegen“ |
| **Systemgrenze** | Rechteck mit Systemnamen | trennt System (innen) und Umwelt (außen) |
| **Assoziation** | durchgezogene Linie | Akteur ist am Anwendungsfall beteiligt |
| **«include»** | gestrichelter Pfeil **vom Basis-Anwendungsfall zum eingebundenen** | wird **immer** mit ausgeführt (Pflichtteil, oft wiederverwendet: „Anmelden“) |
| **«extend»** | gestrichelter Pfeil **vom erweiternden zum Basis-Anwendungsfall** | wird **optional** / unter einer Bedingung ausgeführt („Screenshot anhängen“) |
| **Generalisierung** | Linie mit hohlem Dreieck | Spezialisierung von Akteuren („Admin“ ist ein spezieller „Mitarbeiter“) oder Anwendungsfällen |

${F}
                 ┌──────────────── Ticketsystem ────────────────┐
    O            │                                              │
   /|\ ──────────┼──── ( Störung melden ) ···«include»···▶ ( Anmelden )
   / \           │             ▲                                │
Mitarbeiter      │             ┆ «extend»                      │
    △            │   ( Screenshot anhängen )                    │
    │            │                                              │
    O            │                                              │
   /|\ ──────────┼──── ( Benutzer verwalten ) ···«include»···▶ ( Anmelden )
   / \           │                                              │
  Admin          └──────────────────────────────────────────────┘
${F}

(„Admin“ erbt über die Generalisierung alle Anwendungsfälle des „Mitarbeiters“.)

**Merksätze:**
- Akteure stehen **außerhalb** der Systemgrenze.
- **include** = „muss immer“ · **extend** = „kann unter Bedingung“.
- Pfeilrichtung: **include** zeigt **zum Teil**, der eingebunden wird; **extend** zeigt **zum Basisfall**, der erweitert wird.
- Ein Anwendungsfalldiagramm zeigt **keine Reihenfolge** – dafür nimmt man Aktivitäts- oder Sequenzdiagramme.`,
        },
        {
          type: 'visual',
          title: 'include vs. extend',
          widget: {
            kind: 'cards',
            data: {
              columns: 2,
              items: [
                { title: '«include» – immer', text: '„Geld abheben“ ··▶ „PIN prüfen“: Ohne PIN-Prüfung kein Abheben. Pfeil zeigt zum eingebundenen Anwendungsfall.', icon: 'PlusCircle' },
                { title: '«extend» – optional', text: '„Beleg drucken“ ··▶ „Geld abheben“: nur wenn der Kunde es wünscht. Pfeil zeigt zum Basis-Anwendungsfall.', icon: 'PlusSquare' },
              ],
            },
          },
          caption: 'Prüfungsklassiker: Pflicht oder optional? Davon hängen Stereotyp und Pfeilrichtung ab.',
        },
        {
          type: 'example',
          title: 'Online-Hotelreservierung modellieren',
          problem: 'Ein Hotel lässt eine Reservierungsplattform entwickeln: **Gäste** können Zimmer suchen und buchen; zum Buchen müssen sie sich anmelden; optional können sie eine Reiseversicherung hinzubuchen. Die Zahlung erfolgt über einen externen **Zahlungsdienst**. **Rezeptionsmitarbeiter** können Buchungen stornieren. Bestimme Akteure, Anwendungsfälle und Beziehungen.',
          steps: [
            { label: 'Akteure (außerhalb)', body: 'Gast, Rezeptionsmitarbeiter, Zahlungsdienst (externes System).' },
            { label: 'Anwendungsfälle (innerhalb)', body: 'Zimmer suchen, Zimmer buchen, Anmelden, Reiseversicherung hinzubuchen, Zahlung durchführen, Buchung stornieren.' },
            { label: 'Beziehungen', body: '- Gast — Zimmer suchen, Gast — Zimmer buchen\n- Zimmer buchen ··«include»··▶ Anmelden (immer)\n- Zimmer buchen ··«include»··▶ Zahlung durchführen; Zahlungsdienst — Zahlung durchführen\n- Reiseversicherung hinzubuchen ··«extend»··▶ Zimmer buchen (optional)\n- Rezeptionsmitarbeiter — Buchung stornieren' },
          ],
          result: '3 Akteure, 6 Anwendungsfälle, 2× include, 1× extend.',
        },
        {
          type: 'check',
          question: {
            id: 'p04-c05', kind: 'single', skill: 'uml.usecase', difficulty: 2,
            prompt: 'Beim Anwendungsfall „Bestellung aufgeben“ **kann** der Kunde optional einen Gutscheincode einlösen. Wie wird „Gutschein einlösen“ modelliert?',
            options: ['«extend»-Beziehung von „Gutschein einlösen“ zu „Bestellung aufgeben“', '«include»-Beziehung von „Bestellung aufgeben“ zu „Gutschein einlösen“', 'als eigener Akteur', 'als Generalisierung von „Bestellung aufgeben“'],
            answer: 0,
            distractors: {
              '1': { why: '«include» bedeutet, der Teil wird **immer** ausgeführt – hier ist er optional.', error: 'usecase-include-extend' },
              '2': { why: 'Ein Gutschein ist keine Rolle außerhalb des Systems, sondern eine Funktion.', error: 'usecase-akteur' },
              '3': { why: 'Gutschein einlösen ist keine Spezialisierung, sondern eine optionale Ergänzung.', error: 'usecase-include-extend' },
            },
            explanation: 'Optional → **«extend»**, Pfeil vom erweiternden Anwendungsfall („Gutschein einlösen“) zum Basisfall („Bestellung aufgeben“).',
          },
        },
        { type: 'practice', title: 'Übung: Anwendungsfalldiagramm', questionIds: ['p04-q018', 'p04-q019', 'p04-q020', 'p04-q021', 'p04-q022'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Akteure außerhalb, Anwendungsfälle (Ellipsen) innerhalb der Systemgrenze.', 'Akteur = Rolle, auch ein externes System.', '«include»: immer, Pfeil zum eingebundenen Fall · «extend»: optional, Pfeil zum Basisfall.', 'Keine zeitliche Reihenfolge im Use-Case-Diagramm.'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p04-l06',
      title: 'Klassendiagramm: Klassen und ihre Beziehungen',
      minutes: 25,
      relevance: 'ap1',
      skills: ['uml.class'],
      steps: [
        {
          type: 'explain',
          title: 'Die statische Struktur eines Programms',
          body: `Das **Klassendiagramm** zeigt Klassen mit Attributen, Methoden und ihren **Beziehungen**. Eine Klasse ist ein Rechteck mit drei Abschnitten: **Name** · **Attribute** · **Methoden**.

${F}
┌─────────────────────────────────┐
│            Mitarbeiter          │   ← Klassenname (abstrakte Klassen kursiv)
├─────────────────────────────────┤
│ - personalnummer: int           │   ← Sichtbarkeit name: Typ
│ - name: String                  │
│ # abteilung: String             │
│ - anzahl: int  (unterstrichen = statisch, gehört zur Klasse) │
├─────────────────────────────────┤
│ + Mitarbeiter(name: String)     │   ← Konstruktor
│ + getName(): String             │   ← Sichtbarkeit name(Parameter): Rückgabetyp
│ + setAbteilung(a: String): void │
└─────────────────────────────────┘
${F}

**Beziehungen zwischen Klassen:**

| Beziehung | Notation | Bedeutung | Beispiel |
|---|---|---|---|
| **Assoziation** | durchgezogene Linie (optional mit Leserichtung/Name) | Objekte „kennen“ einander | Mitarbeiter — Abteilung |
| **Aggregation** | Linie mit **hohler** Raute ◇ am **Ganzen** | „hat“-Beziehung, Teile können **unabhängig** existieren | Abteilung ◇— Mitarbeiter |
| **Komposition** | Linie mit **gefüllter** Raute ◆ am **Ganzen** | „besteht aus“, Teile sind **existenzabhängig** – wird das Ganze gelöscht, verschwinden die Teile | Rechnung ◆— Rechnungsposition |
| **Vererbung (Generalisierung)** | Linie mit **hohlem Dreieck** △ an der **Oberklasse** | „ist ein“ | Drucker —▷ Geraet |
| **Realisierung** | **gestrichelte** Linie mit hohlem Dreieck | Klasse implementiert ein Interface | Drucker ··▷ «interface» Wartbar |
| **Abhängigkeit** | gestrichelter Pfeil | Klasse benutzt eine andere vorübergehend | Rechnung ··> PdfGenerator |

**Multiplizitäten** stehen an den Linienenden und geben an, **wie viele** Objekte beteiligt sind:

| Notation | Bedeutung |
|---|---|
| \`1\` | genau eins |
| \`0..1\` | keins oder eins |
| \`*\` bzw. \`0..*\` | beliebig viele (auch keins) |
| \`1..*\` | mindestens eins |
| \`2..4\` | zwei bis vier |

Lesen: **Kunde 1 ——— 0..* Bestellung** → „Ein Kunde hat **0 bis beliebig viele** Bestellungen; jede Bestellung gehört zu **genau einem** Kunden.“ Die Multiplizität steht immer am Ende der Klasse, deren **Anzahl** beschrieben wird.`,
        },
        {
          type: 'visual',
          title: 'Beziehungen im Klassendiagramm',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Assoziation ——', text: 'kennt: Mitarbeiter — Abteilung', icon: 'Link' },
                { title: 'Aggregation ◇——', text: 'hat (Teile leben weiter): Team ◇— Mitarbeiter', icon: 'Diamond' },
                { title: 'Komposition ◆——', text: 'besteht aus (Teile sterben mit): Rechnung ◆— Position', icon: 'Gem' },
                { title: 'Vererbung ——▷', text: 'ist ein: Notebook —▷ Geraet', icon: 'Triangle' },
              ],
            },
          },
          caption: 'Raute immer beim Ganzen, Dreieck immer bei der Oberklasse.',
        },
        {
          type: 'example',
          title: 'Klassendiagramm aus einer Beschreibung ableiten',
          problem: 'Für eine Zugverwaltung gilt: Ein **Zug** besteht aus **genau einem Triebwagen** und **0 bis 12 Waggons**. Waggons werden in einem Depot verwaltet und können verschiedenen Zügen zugeordnet werden. Triebwagen und Waggon sind spezielle **Schienenfahrzeuge** mit Fahrzeugnummer und Baujahr. Bestimme Beziehungen und Multiplizitäten.',
          steps: [
            { label: 'Vererbung', body: 'Triebwagen —▷ Schienenfahrzeug, Waggon —▷ Schienenfahrzeug (Attribute fahrzeugnummer, baujahr in der Oberklasse).' },
            { label: 'Zug – Waggon', body: 'Waggons existieren auch ohne Zug (Depot) → **Aggregation**: Zug ◇—— Waggon, Multiplizität am Waggon **0..12**, am Zug **0..1** (ein Waggon ist höchstens einem Zug zugeordnet).' },
            { label: 'Zug – Triebwagen', body: 'Ein Zug hat genau einen Triebwagen → Multiplizität **1** am Triebwagen. Da auch der Triebwagen unabhängig existiert: Aggregation (oder einfache Assoziation).' },
            { label: 'Skizze', body: `${F}\n                 Schienenfahrzeug\n               - fahrzeugnummer: String\n               - baujahr: int\n                       △\n            ┌──────────┴──────────┐\n        Triebwagen              Waggon\n            1                    0..12\n            │                      │\n            └───────◇ Zug ◇────────┘\n               0..1        0..1\n\n(Rauten direkt an „Zug“ = Zug ist das Ganze)\n${F}` },
          ],
          result: 'Vererbung zu Schienenfahrzeug; Zug aggregiert 1 Triebwagen und 0..12 Waggons.',
        },
        {
          type: 'check',
          question: {
            id: 'p04-c06', kind: 'single', skill: 'uml.class', difficulty: 2,
            prompt: 'Eine **Rechnung** besteht aus **Rechnungspositionen**. Wird die Rechnung gelöscht, sind auch die Positionen bedeutungslos und werden gelöscht. Welche Beziehung ist richtig?',
            options: ['Komposition (gefüllte Raute an der Rechnung)', 'Aggregation (hohle Raute an der Rechnung)', 'Vererbung (Dreieck an der Rechnung)', 'Komposition (gefüllte Raute an der Rechnungsposition)'],
            answer: 0,
            distractors: {
              '1': { why: 'Aggregation bedeutet, dass die Teile unabhängig weiterexistieren können.', error: 'uml-aggregation-komposition' },
              '2': { why: 'Eine Rechnungsposition „ist keine“ Rechnung.', error: 'uml-vererbung' },
              '3': { why: 'Die Raute steht immer am **Ganzen**, nicht am Teil.', error: 'uml-raute-position' },
            },
            explanation: 'Existenzabhängige Teile → **Komposition**, gefüllte Raute ◆ am Ganzen (Rechnung). Multiplizität z. B. Rechnung 1 ◆—— 1..* Rechnungsposition.',
          },
        },
        { type: 'practice', title: 'Übung: Klassendiagramm', questionIds: ['p04-q023', 'p04-q024', 'p04-q025', 'p04-q026', 'p04-q027', 'p04-q010'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Klasse: Name | Attribute (Sichtbarkeit name: Typ) | Methoden (… (Parameter): Rückgabetyp).', 'Assoziation —, Aggregation ◇ (unabhängige Teile), Komposition ◆ (existenzabhängig), Vererbung △.', 'Raute am Ganzen, Dreieck an der Oberklasse.', 'Multiplizitäten: 1, 0..1, *, 1..*.'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p04-l07',
      title: 'Sequenzdiagramm: Nachrichten in zeitlicher Reihenfolge',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['uml.sequence'],
      steps: [
        {
          type: 'explain',
          title: 'Wer schickt wem wann welche Nachricht?',
          body: `Das **Sequenzdiagramm** ist ein **Interaktionsdiagramm**: Es zeigt, wie Objekte oder Systeme in einem bestimmten Szenario **Nachrichten austauschen** – in **zeitlicher Reihenfolge von oben nach unten**.

| Element | Darstellung | Bedeutung |
|---|---|---|
| **Lebenslinie** | Kopf (Rechteck \`objekt:Klasse\` oder Akteur) mit **gestrichelter senkrechter Linie** | Teilnehmer der Interaktion über die Zeit |
| **Aktivierungsbalken** | schmales Rechteck auf der Lebenslinie | Teilnehmer ist gerade aktiv (bearbeitet eine Nachricht) |
| **synchrone Nachricht** | durchgezogener Pfeil mit **gefüllter** Spitze ──▶ | Sender **wartet** auf die Antwort (Methodenaufruf) |
| **asynchrone Nachricht** | durchgezogener Pfeil mit **offener** Spitze ──> | Sender wartet **nicht** (z. B. Benachrichtigung, Nachricht in Warteschlange) |
| **Antwort** | **gestrichelter** Pfeil mit offener Spitze - - -> | Rückgabe an den Aufrufer |
| **Objekterzeugung / -zerstörung** | Pfeil «create» auf den Kopf · ✕ am Ende der Lebenslinie | Objekt entsteht / endet |
| **kombinierte Fragmente** | Rahmen mit Operator **alt** (Alternative, wie WENN/SONST), **opt** (optional, wie WENN ohne SONST), **loop** (Schleife), **par** (parallel) | Kontrollstrukturen im Diagramm |

**Abgrenzung:** Das Aktivitätsdiagramm betont den **Ablauf** (was passiert in welcher Reihenfolge, wer ist zuständig), das Sequenzdiagramm die **Kommunikation zwischen Teilnehmern** (wer ruft wen auf). Das Anwendungsfalldiagramm zeigt **was** das System bietet, aber nicht **wie**.

Sequenzdiagramme eignen sich gut, um **Protokollabläufe** zu dokumentieren – z. B. eine Anmeldung an einer Webanwendung, einen DHCP-Ablauf oder einen TLS-Handshake.`,
        },
        {
          type: 'visual',
          title: 'Anmeldung an der Intranet-Webanwendung',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['Browser', 'Webserver', 'Auth-Dienst', 'Datenbank'],
              messages: [
                { from: 0, to: 1, label: 'POST /login (Benutzer, Passwort)', note: 'synchron, über HTTPS' },
                { from: 1, to: 2, label: 'pruefeAnmeldung(benutzer, passwort)' },
                { from: 2, to: 3, label: 'SELECT Passwort-Hash' },
                { from: 3, to: 2, label: 'Hash (Antwort)' },
                { from: 2, to: 1, label: 'ok + Token (Antwort)', note: 'alt: bei Fehler → „ungültig“' },
                { from: 1, to: 0, label: '302 Weiterleitung + Session-Cookie' },
              ],
            },
          },
          caption: 'Zeit läuft von oben nach unten. Antworten werden im UML-Diagramm gestrichelt gezeichnet.',
        },
        {
          type: 'example',
          title: 'Ein Sequenzdiagramm aus einer Beschreibung ableiten',
          problem: 'Ein Mitarbeiter meldet über das **Ticketportal** eine Störung. Das Portal ruft beim **Ticketsystem** `ticketAnlegen()` auf und wartet auf die Ticketnummer. Anschließend schickt das Ticketsystem **ohne zu warten** eine Benachrichtigung an den **Mailserver**. Das Portal zeigt dem Mitarbeiter die Ticketnummer an. Beschreibe die Nachrichten in der richtigen Reihenfolge mit Nachrichtenart.',
          steps: [
            { label: 'Lebenslinien', body: 'Mitarbeiter (Akteur), :Ticketportal, :Ticketsystem, :Mailserver' },
            { label: 'Nachrichten', body: '1. Mitarbeiter → Portal: störungMelden(text) – synchron\n2. Portal → Ticketsystem: ticketAnlegen(text) – **synchron** (wartet)\n3. Ticketsystem → Mailserver: benachrichtigen(ticketNr) – **asynchron** (offene Pfeilspitze)\n4. Ticketsystem - - → Portal: ticketNr – **Antwort** (gestrichelt)\n5. Portal - - → Mitarbeiter: Anzeige der Ticketnummer – Antwort' },
            { label: 'Hinweis', body: 'Ob Nachricht 3 vor oder nach der Antwort 4 gezeichnet wird, hängt von der Implementierung ab; wichtig ist die korrekte Pfeilart.' },
          ],
          result: 'Zwei synchrone Aufrufe, eine asynchrone Benachrichtigung, zwei Antworten.',
        },
        {
          type: 'check',
          question: {
            id: 'p04-c07', kind: 'single', skill: 'uml.sequence', difficulty: 2,
            prompt: 'Wie wird im UML-Sequenzdiagramm eine **Antwortnachricht** dargestellt?',
            options: ['gestrichelter Pfeil mit offener Spitze', 'durchgezogener Pfeil mit gefüllter Spitze', 'durchgezogener Pfeil mit offener Spitze', 'Raute auf der Lebenslinie'],
            answer: 0,
            distractors: {
              '1': { why: 'Das ist eine **synchrone** Nachricht (Aufruf).', error: 'uml-sequenz-pfeile' },
              '2': { why: 'Das ist eine **asynchrone** Nachricht.', error: 'uml-sequenz-pfeile' },
              '3': { why: 'Rauten gibt es im Aktivitätsdiagramm (Verzweigung), nicht als Nachricht.', error: 'uml-sequenz-pfeile' },
            },
            explanation: 'Antwort = **gestrichelt** mit offener Spitze; synchron = gefüllte Spitze; asynchron = offene Spitze, durchgezogen.',
          },
        },
        { type: 'practice', title: 'Übung: Sequenzdiagramm', questionIds: ['p04-q028', 'p04-q029', 'p04-q030', 'p04-q031'], count: 4, difficulty: 2 },
        { type: 'summary', points: ['Sequenzdiagramm: Lebenslinien, Zeit von oben nach unten.', 'synchron ──▶ (gefüllt), asynchron ──> (offen), Antwort - - -> (gestrichelt).', 'Fragmente: alt, opt, loop, par.', 'Aktivität = Ablauf · Sequenz = Kommunikation · Anwendungsfall = Funktionen für Akteure.'] },
      ],
    },
  ],

  /* ==================================================================== */
  questions: [
    {
      id: 'p04-q001', kind: 'match', skill: 'oop.concepts', difficulty: 1,
      prompt: 'Ordne die OOP-Begriffe ihrer Beschreibung zu.',
      left: ['Klasse', 'Objekt', 'Attribut', 'Methode', 'Konstruktor'],
      right: ['Bauplan für gleichartige Objekte', 'konkrete Instanz mit eigenen Werten', 'Eigenschaft / Datenfeld', 'Operation, die ein Objekt ausführen kann', 'wird beim Erzeugen eines Objekts aufgerufen und initialisiert es'],
      answer: [0, 1, 2, 3, 4],
      explanation: 'Klasse = Bauplan, Objekt = Instanz, Attribut = Daten, Methode = Verhalten, Konstruktor = Initialisierung beim Erzeugen.',
    },
    {
      id: 'p04-q002', kind: 'free', skill: 'oop.concepts', difficulty: 2,
      prompt: 'Erläutern Sie das Prinzip der **Kapselung** und nennen Sie **zwei Vorteile**. Gehen Sie auf die Rolle von Getter- und Setter-Methoden ein.',
      modelAnswer: 'Bei der Kapselung werden die Attribute einer Klasse vor direktem Zugriff von außen verborgen (Sichtbarkeit private). Zugriff ist nur über öffentliche Methoden möglich, z. B. Getter zum Lesen und Setter zum Ändern. Vorteile: 1. Der Setter kann Werte prüfen, sodass das Objekt nie einen ungültigen Zustand annimmt (z. B. kein negativer Preis). 2. Die interne Darstellung kann geändert werden, ohne dass andere Klassen angepasst werden müssen (lose Kopplung, bessere Wartbarkeit). Außerdem: nur lesender Zugriff möglich, wenn kein Setter angeboten wird.',
      keywords: ['private', 'Getter', 'Setter', 'Prüfung/Validierung', 'Wartbarkeit', 'ungültiger Zustand'],
      explanation: 'Kern: Daten verstecken + kontrollierter Zugriff über Methoden.',
    },
    {
      id: 'p04-q003', kind: 'match', skill: 'oop.concepts', difficulty: 1,
      prompt: 'Ordne die UML-Sichtbarkeitssymbole den Zugriffsmodifizierern zu.',
      left: ['+', '−', '#', '~'],
      right: ['public', 'private', 'protected', 'package'],
      answer: [0, 1, 2, 3],
      explanation: '+ public (alle), − private (nur die Klasse), # protected (Klasse und Unterklassen), ~ package (selbes Paket).',
    },
    {
      id: 'p04-q004', kind: 'number', skill: 'oop.concepts', difficulty: 1,
      prompt: 'In einem Programm wird die Klasse `Monitor` einmal definiert. Für die Inventur werden daraus **35** Monitore für Hamburg und **22** für Berlin erzeugt. Wie viele **Objekte** der Klasse `Monitor` existieren?',
      answer: 57,
      misconceptions: [{ answer: '1', error: 'oop-klasse-objekt', why: '1 ist die Anzahl der **Klassen**. Jeder erzeugte Monitor ist ein eigenes Objekt.' }],
      explanation: 'Eine Klasse, aber 35 + 22 = **57** Objekte (Instanzen), jedes mit eigenen Attributwerten.',
    },
    {
      id: 'p04-q005', kind: 'free', skill: 'oop.concepts', difficulty: 2,
      prompt: 'Erläutern Sie das Prinzip der **Abstraktion** am Beispiel einer Klasse `Mitarbeiter` für **(a)** eine Lohnbuchhaltungssoftware und **(b)** ein Zutrittskontrollsystem.',
      modelAnswer: 'Abstraktion heißt, nur die für den jeweiligen Zweck relevanten Eigenschaften und Methoden zu modellieren. (a) Lohnbuchhaltung: personalnummer, name, steuerklasse, bruttogehalt, bankverbindung; Methode berechneNettolohn(). (b) Zutrittskontrolle: personalnummer, name, ausweisnummer, zutrittsberechtigungen (Räume, Zeiten); Methode pruefeZutritt(raum, zeit). Dieselbe reale Person wird je nach System unterschiedlich abgebildet; irrelevante Details (z. B. Bankverbindung im Zutrittssystem) werden weggelassen – das ist auch im Sinne der Datenminimierung.',
      keywords: ['relevant', 'weglassen', 'Zweck', 'unterschiedliche Attribute', 'Datenminimierung'],
      explanation: 'Abstraktion ist zweckabhängig: gleiche reale Person, unterschiedliches Modell.',
    },
    {
      id: 'p04-q006', kind: 'multi', skill: 'oop.inheritance', difficulty: 2,
      prompt: 'Welche Aussagen zur **Vererbung** sind korrekt?',
      options: ['Eine Unterklasse erbt die Attribute und Methoden ihrer Oberklasse.', 'In Java kann eine Klasse von mehreren Klassen direkt erben.', 'Eine Java-Klasse kann mehrere Interfaces implementieren.', 'Vererbung beschreibt eine „ist ein“-Beziehung.', 'Eine abstrakte Klasse kann direkt instanziiert werden.'],
      answer: [0, 2, 3],
      explanation: 'Java/C#: Einfachvererbung bei Klassen, aber mehrere Interfaces. Abstrakte Klassen können **nicht** instanziiert werden. Vererbung = „ist ein“.',
    },
    {
      id: 'p04-q007', kind: 'single', skill: 'oop.inheritance', difficulty: 2,
      prompt: 'Die Klasse `Laptop` erbt von `Geraet` und definiert die geerbte Methode `info()` mit **gleicher Signatur** neu. Wie heißt das?',
      options: ['Überschreiben (Overriding)', 'Überladen (Overloading)', 'Kapselung', 'Komposition'],
      answer: 0,
      distractors: {
        '1': { why: 'Überladen = gleicher Name, **andere** Parameterliste.', error: 'polymorphie-arten' },
        '2': { why: 'Kapselung = Daten verbergen.', error: 'polymorphie-arten' },
        '3': { why: 'Komposition ist eine Beziehung zwischen Klassen („besteht aus“).', error: 'polymorphie-arten' },
      },
      explanation: 'Neudefinition einer geerbten Methode mit gleicher Signatur = **Überschreiben**; die Auswahl geschieht zur Laufzeit (dynamische Bindung).',
    },
    {
      id: 'p04-q008', kind: 'text', skill: 'oop.inheritance', difficulty: 3,
      prompt: `Was gibt der folgende Java-Code aus? (Gib die Ausgabe ohne Anführungszeichen an.)\n\n${F}java\nclass Geraet {\n    String typ() { return "G"; }\n    String info() { return "[" + typ() + "]"; }\n}\nclass Switch extends Geraet {\n    @Override\n    String typ() { return "S"; }\n}\n\nGeraet g = new Switch();\nSystem.out.println(g.info());\n${F}`,
      accept: ['[S]', 'S'],
      hints: ['info() wird geerbt – aber welches typ() ruft es auf?', 'Entscheidend ist das tatsächliche Objekt (Switch).'],
      misconceptions: [{ answer: '[G]', error: 'dynamische-bindung', why: 'Auch innerhalb der geerbten Methode info() wird typ() dynamisch gebunden – das Objekt ist ein Switch, also wird Switch.typ() aufgerufen.' }],
      explanation: 'g verweist auf ein **Switch**-Objekt. `info()` ist geerbt, ruft aber `typ()` auf – und dieser Aufruf wird zur Laufzeit an das tatsächliche Objekt gebunden → `Switch.typ()` = „S“ → Ausgabe **[S]**.',
    },
    {
      id: 'p04-q009', kind: 'free', skill: 'oop.inheritance', difficulty: 2,
      prompt: 'Erläutern Sie den Begriff **Polymorphie** anhand eines Beispiels aus der IT-Inventarverwaltung (Geräte wie Drucker, Switch, Notebook).',
      modelAnswer: 'Polymorphie bedeutet, dass derselbe Methodenaufruf je nach tatsächlichem Objekt unterschiedliches Verhalten auslöst. Beispiel: Die Oberklasse Geraet definiert eine Methode wartungsintervall(). Die Unterklassen Drucker, Switch und Notebook überschreiben sie (Drucker 6 Monate, Switch 12 Monate, Notebook 24 Monate). Ein Programm kann alle Geräte in einer Liste vom Typ Geraet verwalten und für jedes wartungsintervall() aufrufen – zur Laufzeit wird automatisch die passende Methode der Unterklasse ausgeführt (dynamische Bindung). Neue Gerätetypen lassen sich ergänzen, ohne den aufrufenden Code zu ändern. Eine weitere Form ist das Überladen (gleicher Methodenname, andere Parameter).',
      keywords: ['gleicher Aufruf', 'unterschiedliches Verhalten', 'überschreiben', 'dynamische Bindung', 'Oberklasse', 'Beispiel'],
      explanation: 'Definition + konkretes Beispiel mit Ober-/Unterklassen + Nutzen (einheitliche Behandlung, Erweiterbarkeit).',
    },
    {
      id: 'p04-q010', kind: 'match', skill: 'uml.class', difficulty: 2,
      prompt: 'Ordne jeder Aussage die passende Beziehung im Klassendiagramm zu.',
      left: ['Ein Notebook ist ein Gerät.', 'Eine Bestellung besteht aus Bestellpositionen, die ohne die Bestellung nicht existieren.', 'Eine Abteilung hat Mitarbeiter; Mitarbeiter bleiben bei Auflösung der Abteilung im Unternehmen.', 'Ein Mitarbeiter nutzt einen Firmenparkplatz.'],
      right: ['Vererbung', 'Komposition', 'Aggregation', 'Assoziation'],
      answer: [0, 1, 2, 3],
      explanation: '„ist ein“ → Vererbung · existenzabhängige Teile → Komposition · „hat“ mit unabhängigen Teilen → Aggregation · lose Beziehung „kennt/nutzt“ → Assoziation.',
    },
    {
      id: 'p04-q011', kind: 'match', skill: 'uml.activity', difficulty: 1,
      prompt: 'Ordne die Elemente des Aktivitätsdiagramms ihrer Funktion zu.',
      left: ['Kreis mit Kreuz ⊗', 'dicker Balken mit mehreren Eingängen und einem Ausgang', 'Raute mit mehreren Eingängen und einem Ausgang', 'Bahnen mit Überschriften (Swimlanes)'],
      right: ['Ablaufende – nur dieser Zweig endet', 'Vereinigung (Join) – wartet auf alle parallelen Zweige', 'Zusammenführung (Merge) – alternative Wege laufen zusammen', 'Partitionen – zeigen die Zuständigkeit'],
      answer: [0, 1, 2, 3],
      explanation: '⊗ beendet nur einen Zweig (◉ die ganze Aktivität). Join-Balken synchronisiert parallele Zweige, Merge-Raute führt alternative Wege zusammen.',
    },
    {
      id: 'p04-q012', kind: 'single', skill: 'uml.activity', difficulty: 2,
      prompt: 'Worin unterscheiden sich **Verzweigung** (Raute) und **Gabelung** (Balken) im Aktivitätsdiagramm?',
      options: ['Bei der Verzweigung wird genau ein Weg gewählt, bei der Gabelung werden alle Wege parallel durchlaufen.', 'Bei der Verzweigung laufen alle Wege parallel, bei der Gabelung wird einer gewählt.', 'Beide sind gleichbedeutend.', 'Die Gabelung beendet den Ablauf.'],
      answer: 0,
      distractors: {
        '1': { why: 'Genau umgekehrt: Raute = Entscheidung, Balken = Parallelität.', error: 'uml-verzweigung-gabelung' },
        '2': { why: 'Die Raute steht für eine Entscheidung mit Guards, der Balken für Nebenläufigkeit.', error: 'uml-verzweigung-gabelung' },
        '3': { why: 'Das Ende wird mit ◉ bzw. ⊗ dargestellt.', error: 'uml-verzweigung-gabelung' },
      },
      explanation: 'Raute ◇ + Guards = **Entscheidung** (ein Weg). Balken ▬ = **Gabelung** (alle Wege gleichzeitig), später Join-Balken zur Synchronisation.',
    },
    {
      id: 'p04-q013', kind: 'order', skill: 'uml.activity2code', difficulty: 1,
      prompt: 'Ein Aktivitätsdiagramm für die **Einrichtung eines neuen Arbeitsplatz-PCs** soll erstellt werden. Bringe die Aktionen in eine sinnvolle Reihenfolge.',
      items: ['Hardware auspacken und anschließen', 'Betriebssystem-Image installieren', 'Rechner in die Domäne aufnehmen', 'Benutzerkonto zuweisen und Software verteilen', 'Funktionstest durchführen', 'Übergabeprotokoll unterschreiben lassen'],
      explanation: 'Physisch anschließen → OS → Domänenbeitritt (benötigt Netzwerk + OS) → Benutzer/Software → Test → Übergabe/Dokumentation.',
    },
    {
      id: 'p04-q014', kind: 'number', skill: 'uml.activity2code', difficulty: 3,
      prompt: `Das Aktivitätsdiagramm beschreibt eine fußgesteuerte Schleife. Welcher Wert wird ausgegeben, wenn zu Beginn \`x = 3\` und \`z = 0\` gilt?\n\n${F}\n        ●\n        │\n        ▼\n        ◇ ◀────────────────────┐   (Merge)\n        │                      │\n        ▼                      │\n ( x ← x * 2 )                 │\n        │                      │\n        ▼                      │\n ( z ← z + 1 )                 │\n        │                      │\n        ▼                      │\n        ◇──[x < 40]────────────┘\n        │[x ≥ 40]\n        ▼\n ( z ausgeben )\n        │\n        ▼\n        ◉\n${F}`,
      answer: 4,
      hints: ['Der Rumpf läuft zuerst, danach wird geprüft (wie WIEDERHOLE … BIS x ≥ 40).'],
      misconceptions: [{ answer: '3', error: 'schleife-off-by-one', why: 'Nach 3 Durchläufen ist x = 24 < 40 → es geht noch einmal zurück.' }],
      explanation: '| Durchlauf | x | z |\n|---|---|---|\n| 1 | 6 | 1 |\n| 2 | 12 | 2 |\n| 3 | 24 | 3 |\n| 4 | 48 | 4 |\n\n48 ≥ 40 → Ausgabe **4**. Pseudocode: `WIEDERHOLE x ← x * 2; z ← z + 1 BIS x ≥ 40`.',
    },
    {
      id: 'p04-q015', kind: 'free', skill: 'uml.activity2code', difficulty: 3,
      prompt: 'Beschreiben Sie ein **Aktivitätsdiagramm** (alle Knoten und Kanten in Textform) für folgenden Ablauf: *Ein Mitarbeiter beantragt über das Self-Service-Portal ein Passwort-Reset. Das System prüft, ob die hinterlegte Mobilnummer existiert. Wenn ja, wird ein Einmalcode per SMS gesendet; der Mitarbeiter gibt ihn ein. Ist der Code korrekt, setzt er ein neues Passwort und der Ablauf endet. Ist keine Mobilnummer hinterlegt oder der Code dreimal falsch, wird an den Helpdesk verwiesen.* Verwenden Sie Partitionen.',
      modelAnswer: 'Partitionen: Mitarbeiter | Self-Service-Portal. Start ● (Mitarbeiter) → Aktion „Passwort-Reset anfordern“ (Mitarbeiter) → Aktion „Mobilnummer prüfen“ (Portal) → Verzweigung ◇: [keine Nummer] → Aktion „An Helpdesk verweisen“ (Portal) → Ende ◉; [Nummer vorhanden] → Aktion „Einmalcode per SMS senden“ (Portal) → Merge ◇ → Aktion „Code eingeben“ (Mitarbeiter) → Verzweigung ◇: [Code korrekt] → Aktion „Neues Passwort setzen“ (Mitarbeiter) → Ende ◉; [Code falsch UND Versuche < 3] → zurück zum Merge; [Code falsch UND 3 Versuche] → „An Helpdesk verweisen“ → Ende ◉.',
      keywords: ['Startknoten', 'Partitionen', 'Verzweigung mit Guards', 'Merge/Rückkante', '3 Versuche', 'Endknoten'],
      hints: ['Die Code-Eingabe ist eine Schleife mit maximal drei Durchläufen.'],
      explanation: 'Bewertet: Start/Ende, Aktionen als Verb + Objekt, vollständige Guards, Schleife über Merge + Rückkante, Zuordnung zu Partitionen.',
    },
    {
      id: 'p04-q016', kind: 'free', skill: 'uml.activity2code', difficulty: 2,
      prompt: `Übertragen Sie das Aktivitätsdiagramm in **Pseudocode**.\n\n${F}\n        ●\n        │\n        ▼\n ( temperatur einlesen )\n        │\n        ▼\n        ◇──[temperatur > 30]──▶ ( Alarm senden ) ──────┐\n        │[temperatur ≤ 30]                              │\n        ▼                                               │\n        ◇──[temperatur > 26]──▶ ( Warnung loggen ) ────┤\n        │[temperatur ≤ 26]                              │\n        ▼                                               │\n ( Status „ok“ loggen )                                 │\n        │                                               │\n        ▼                                               │\n        ◇ ◀─────────────────────────────────────────────┘  (Merge)\n        │\n        ▼\n        ◉\n${F}`,
      modelAnswer: `EINGABE temperatur\nWENN temperatur > 30 DANN\n  AUSGABE "Alarm"        // Alarm senden\nSONST WENN temperatur > 26 DANN\n  AUSGABE "Warnung"      // Warnung loggen\nSONST\n  AUSGABE "ok"           // Status ok loggen\nENDE WENN`,
      keywords: ['EINGABE', 'WENN temperatur > 30', 'SONST WENN temperatur > 26', 'SONST', 'ENDE WENN'],
      explanation: 'Zwei hintereinander geschaltete Verzweigungen = SONST-WENN-Kette; die gemeinsame Zusammenführung entspricht ENDE WENN.',
    },
    {
      id: 'p04-q017', kind: 'single', skill: 'uml.activity', difficulty: 1,
      prompt: 'Wozu dienen **Partitionen (Swimlanes)** in einem Aktivitätsdiagramm?',
      options: ['Sie zeigen, welche Rolle, Abteilung oder welches System eine Aktion ausführt.', 'Sie stellen parallele Abläufe dar.', 'Sie kennzeichnen Schleifen.', 'Sie enthalten die Attribute einer Klasse.'],
      answer: 0,
      distractors: {
        '1': { why: 'Parallelität wird mit Gabelung/Vereinigung (Balken) dargestellt.', error: 'uml-partition' },
        '2': { why: 'Schleifen entstehen durch Verzweigung + Rückkante.', error: 'uml-partition' },
        '3': { why: 'Attribute gehören ins Klassendiagramm.', error: 'uml-partition' },
      },
      explanation: 'Partitionen ordnen Aktionen Verantwortlichen zu (z. B. Kunde / Vertrieb / Lager).',
    },
    {
      id: 'p04-q018', kind: 'match', skill: 'uml.usecase', difficulty: 1,
      prompt: 'Ordne die Elemente des Anwendungsfalldiagramms zu.',
      left: ['Strichmännchen', 'Ellipse', 'Rechteck um die Ellipsen', 'gestrichelter Pfeil «include»', 'gestrichelter Pfeil «extend»'],
      right: ['Akteur (Rolle außerhalb des Systems)', 'Anwendungsfall', 'Systemgrenze', 'eingebundener Anwendungsfall wird immer ausgeführt', 'optionale Erweiterung unter einer Bedingung'],
      answer: [0, 1, 2, 3, 4],
      explanation: 'Akteur – Anwendungsfall – Systemgrenze; include = Pflicht, extend = optional.',
    },
    {
      id: 'p04-q019', kind: 'single', skill: 'uml.usecase', difficulty: 2,
      prompt: 'Am Geldautomaten muss sich der Kunde bei **jedem** Anwendungsfall („Geld abheben“, „Kontostand abfragen“) mit der PIN **authentifizieren**. Wie modelliert man „Authentifizieren“?',
      options: ['«include»-Beziehung von „Geld abheben“ bzw. „Kontostand abfragen“ zu „Authentifizieren“', '«extend»-Beziehung von „Authentifizieren“ zu „Geld abheben“', 'als Akteur „PIN“', 'Generalisierung zwischen „Geld abheben“ und „Authentifizieren“'],
      answer: 0,
      distractors: {
        '1': { why: 'extend ist für optionale Erweiterungen – die Authentifizierung ist Pflicht.', error: 'usecase-include-extend' },
        '2': { why: 'Die PIN ist keine Rolle außerhalb des Systems.', error: 'usecase-akteur' },
        '3': { why: 'Geld abheben ist keine Spezialform von Authentifizieren.', error: 'usecase-include-extend' },
      },
      explanation: 'Pflichtteil, der in mehreren Anwendungsfällen wiederverwendet wird → **«include»**, Pfeil vom Basisfall zum eingebundenen Fall.',
    },
    {
      id: 'p04-q020', kind: 'text', skill: 'uml.usecase', difficulty: 2,
      prompt: 'Beim Anwendungsfall „Störung melden“ **kann** der Mitarbeiter optional einen Screenshot anhängen. Welches **Stereotyp** steht an der Beziehung zwischen „Screenshot anhängen“ und „Störung melden“? (ein Wort)',
      accept: ['extend', '«extend»', '<<extend>>'],
      misconceptions: [{ answer: 'include', error: 'usecase-include-extend', why: 'include bedeutet „immer“. Der Screenshot ist optional.' }],
      explanation: 'Optional → **«extend»**, gestrichelter Pfeil von „Screenshot anhängen“ zu „Störung melden“.',
    },
    {
      id: 'p04-q021', kind: 'multi', skill: 'uml.usecase', difficulty: 2,
      prompt: 'Für ein **Ticketsystem** wird ein Anwendungsfalldiagramm erstellt. Welche der folgenden Elemente sind **Akteure**?',
      options: ['Mitarbeiter, der eine Störung meldet', 'Helpdesk-Mitarbeiter', 'externer Mailserver, der Benachrichtigungen versendet', 'Ticket anlegen', 'Datenbanktabelle „tickets“ des Ticketsystems'],
      answer: [0, 1, 2],
      explanation: 'Akteure sind **Rollen außerhalb** des Systems – Personen oder externe Systeme. „Ticket anlegen“ ist ein Anwendungsfall, die interne Datenbanktabelle gehört zum System selbst.',
    },
    {
      id: 'p04-q022', kind: 'free', skill: 'uml.usecase', difficulty: 3,
      prompt: '**Handlungssituation:** Die Elektro Krämer GmbH lässt eine App zur **Reservierung von Besprechungsräumen** (Standorte Hamburg und Berlin) entwickeln. Mitarbeiter können Räume suchen, reservieren und eigene Reservierungen stornieren; zum Reservieren und Stornieren ist eine Anmeldung nötig. Optional kann beim Reservieren Catering bestellt werden. Die Assistenz der Geschäftsführung kann zusätzlich alle Reservierungen verwalten. Der Kalender wird mit dem Exchange-Server synchronisiert. Beschreiben Sie das **Anwendungsfalldiagramm** (Akteure, Anwendungsfälle, Beziehungen).',
      modelAnswer: 'Systemgrenze: Raumreservierungs-App. Akteure: Mitarbeiter; Assistenz der Geschäftsführung (Generalisierung: ist ein spezieller Mitarbeiter, erbt dessen Anwendungsfälle); Exchange-Server (externes System). Anwendungsfälle: Raum suchen, Raum reservieren, Reservierung stornieren, Anmelden, Catering bestellen, Alle Reservierungen verwalten, Kalender synchronisieren. Beziehungen: Mitarbeiter — Raum suchen / Raum reservieren / Reservierung stornieren; Raum reservieren ··«include»··▶ Anmelden; Reservierung stornieren ··«include»··▶ Anmelden; Catering bestellen ··«extend»··▶ Raum reservieren; Assistenz — Alle Reservierungen verwalten; Exchange-Server — Kalender synchronisieren (ggf. Raum reservieren ··«include»··▶ Kalender synchronisieren).',
      keywords: ['Systemgrenze', 'Exchange-Server als Akteur', 'Generalisierung Assistenz', 'include Anmelden', 'extend Catering'],
      explanation: 'Typische Bewertungspunkte: Akteure außerhalb (inkl. externem System), sinnvolle Anwendungsfälle, include für Pflicht-Anmeldung, extend für optionales Catering, Generalisierung der Assistenz.',
    },
    {
      id: 'p04-q023', kind: 'text', skill: 'uml.class', difficulty: 1,
      prompt: 'Welches **Symbol** steht im UML-Klassendiagramm vor einem **privaten** Attribut?',
      accept: ['-', '−', '–'],
      misconceptions: [{ answer: '#', error: 'uml-sichtbarkeit', why: '# steht für protected.' }, { answer: '+', error: 'uml-sichtbarkeit', why: '+ steht für public.' }],
      explanation: '**−** private · + public · # protected · ~ package.',
    },
    {
      id: 'p04-q024', kind: 'table', skill: 'uml.class', difficulty: 2,
      prompt: `Für die Klasse \`Kundenkonto\` liegen folgende Anforderungen vor. Trage jeweils das **UML-Sichtbarkeitssymbol** ein (+, −, #, ~).\n\n- Das Passwort-Hash darf nur innerhalb der Klasse verwendet werden.\n- Die Methode \`anmelden()\` soll von allen Klassen aufgerufen werden können.\n- Das Attribut \`rabattstufe\` soll in Unterklassen (z. B. \`Firmenkundenkonto\`) direkt nutzbar sein.\n- Die Kundennummer wird nur über einen Getter gelesen.`,
      columns: [{ key: 's', label: 'Symbol', type: 'text' }],
      rows: [
        { label: 'passwortHash: String', cells: { s: { answer: '-', accept: ['−', '–', 'private'] } } },
        { label: 'anmelden(passwort: String): boolean', cells: { s: { answer: '+', accept: ['public'] } } },
        { label: 'rabattstufe: int', cells: { s: { answer: '#', accept: ['protected'] } } },
        { label: 'kundennummer: String', cells: { s: { answer: '-', accept: ['−', '–', 'private'] } } },
        { label: 'getKundennummer(): String', cells: { s: { answer: '+', accept: ['public'] } } },
      ],
      explanation: 'Interne Daten private (−), öffentliche Schnittstelle public (+), für Unterklassen protected (#). Kapselung: Kundennummer private, Zugriff über public Getter.',
    },
    {
      id: 'p04-q025', kind: 'single', skill: 'uml.class', difficulty: 2,
      prompt: 'Ein **Team** hat mehrere **Mitarbeiter**. Wird das Team aufgelöst, bleiben die Mitarbeiter im Unternehmen. Welche Beziehung passt am besten?',
      options: ['Aggregation (hohle Raute am Team)', 'Komposition (gefüllte Raute am Team)', 'Vererbung (Dreieck am Team)', 'Aggregation (hohle Raute am Mitarbeiter)'],
      answer: 0,
      distractors: {
        '1': { why: 'Komposition hieße: Mitarbeiter verschwinden mit dem Team.', error: 'uml-aggregation-komposition' },
        '2': { why: 'Ein Mitarbeiter „ist kein“ Team.', error: 'uml-vererbung' },
        '3': { why: 'Die Raute steht am Ganzen (Team).', error: 'uml-raute-position' },
      },
      explanation: '„hat“-Beziehung mit unabhängig existierenden Teilen → **Aggregation**, hohle Raute ◇ am Ganzen (Team).',
    },
    {
      id: 'p04-q026', kind: 'text', skill: 'uml.class', difficulty: 2,
      prompt: 'Zwischen `Kunde` und `Bestellung` besteht eine Assoziation: *Ein Kunde kann beliebig viele Bestellungen aufgeben (auch keine); jede Bestellung gehört zu genau einem Kunden.* Welche **Multiplizität** steht am Ende bei **Bestellung**?',
      accept: ['0..*', '*', '0..n', '0…*'],
      misconceptions: [{ answer: '1', error: 'uml-multiplizitaet', why: '1 steht am Ende bei **Kunde** (jede Bestellung hat genau einen Kunden).' }, { answer: '1..*', error: 'uml-multiplizitaet', why: '„auch keine“ → die Untergrenze ist 0.' }],
      explanation: 'Am Bestellungs-Ende: **0..*** (bzw. *), am Kunden-Ende: **1**. Die Multiplizität steht bei der Klasse, deren Anzahl beschrieben wird.',
    },
    {
      id: 'p04-q027', kind: 'free', skill: 'uml.class', difficulty: 3,
      prompt: 'Modellieren Sie eine Klasse **`Switch`** für eine Netzwerkdokumentation als UML-Klasse (Textform): mindestens **vier Attribute** mit Datentyp und Sichtbarkeit, einen **Konstruktor** und **drei Methoden** mit Parametern und Rückgabetyp. Begründen Sie kurz Ihre Wahl der Sichtbarkeiten.',
      modelAnswer: `Switch\n- hostname: String\n- managementIp: String\n- portanzahl: int\n- poeBudgetWatt: double\n- firmwareVersion: String\n+ Switch(hostname: String, portanzahl: int)\n+ getHostname(): String\n+ setManagementIp(ip: String): boolean   (prüft das Format, liefert false bei ungültiger Adresse)\n+ portStatus(port: int): String\n+ firmwareAktualisieren(version: String): void\n\nBegründung: Attribute private (Kapselung), damit z. B. eine ungültige IP-Adresse oder Portanzahl nicht direkt gesetzt werden kann; Methoden public als Schnittstelle für andere Klassen.`,
      keywords: ['- Attribute', 'Datentypen', '+ Methoden', 'Konstruktor', 'Rückgabetyp', 'Kapselung'],
      explanation: 'Bewertet: korrekte UML-Syntax (Sichtbarkeit name: Typ; name(param: Typ): Rückgabe), sinnvolle Attribute/Methoden, begründete Sichtbarkeiten.',
    },
    {
      id: 'p04-q028', kind: 'match', skill: 'uml.sequence', difficulty: 1,
      prompt: 'Ordne die Elemente des Sequenzdiagramms ihrer Bedeutung zu.',
      left: ['gestrichelte senkrechte Linie unter einem Objekt', 'schmales Rechteck auf dieser Linie', 'durchgezogener Pfeil mit gefüllter Spitze', 'gestrichelter Pfeil mit offener Spitze', 'Rahmen mit „loop“'],
      right: ['Lebenslinie', 'Aktivierungsbalken', 'synchrone Nachricht', 'Antwortnachricht', 'Schleife (kombiniertes Fragment)'],
      answer: [0, 1, 2, 3, 4],
      explanation: 'Lebenslinie, Aktivierung, synchroner Aufruf, Antwort, Fragment loop.',
    },
    {
      id: 'p04-q029', kind: 'order', skill: 'uml.sequence', difficulty: 2,
      prompt: 'Ein Sequenzdiagramm beschreibt den **Druckauftrag** eines Mitarbeiters über den Druckserver. Bringe die Nachrichten in die richtige zeitliche Reihenfolge.',
      items: ['Client → Druckserver: druckauftragSenden(dokument)', 'Druckserver → Druckserver: inWarteschlangeEinreihen()', 'Druckserver - - → Client: auftragsnummer (Antwort)', 'Druckserver → Drucker: drucken(daten)', 'Drucker - - → Druckserver: status „fertig“ (Antwort)'],
      explanation: 'Der Client übergibt den Auftrag, der Server reiht ihn ein und bestätigt sofort mit der Auftragsnummer; danach wird gedruckt und der Drucker meldet den Status zurück.',
    },
    {
      id: 'p04-q030', kind: 'single', skill: 'uml.sequence', difficulty: 2,
      prompt: 'Ein Webshop schickt nach einer Bestellung eine Nachricht an den Versanddienstleister und arbeitet **sofort weiter**, ohne auf eine Antwort zu warten. Wie wird diese Nachricht im Sequenzdiagramm dargestellt?',
      options: ['asynchrone Nachricht – durchgezogener Pfeil mit offener Spitze', 'synchrone Nachricht – durchgezogener Pfeil mit gefüllter Spitze', 'Antwortnachricht – gestrichelter Pfeil', 'als Lebenslinie'],
      answer: 0,
      distractors: {
        '1': { why: 'Synchron hieße: Der Sender wartet auf die Antwort.', error: 'uml-sequenz-pfeile' },
        '2': { why: 'Es ist keine Antwort auf einen vorherigen Aufruf.', error: 'uml-sequenz-pfeile' },
        '3': { why: 'Eine Lebenslinie stellt einen Teilnehmer dar, keine Nachricht.', error: 'uml-sequenz-pfeile' },
      },
      explanation: 'Ohne Warten → **asynchron**: durchgezogene Linie, offene Pfeilspitze.',
    },
    {
      id: 'p04-q031', kind: 'match', skill: 'uml.sequence', difficulty: 2,
      prompt: 'Welches UML-Diagramm eignet sich für welche Fragestellung?',
      left: ['Welche Funktionen bietet das System welchen Benutzergruppen?', 'Wie läuft der Genehmigungsprozess einer Bestellung ab und wer ist wofür zuständig?', 'Welche Klassen mit welchen Attributen und Beziehungen gibt es?', 'Welche Nachrichten tauschen Browser, Webserver und Datenbank beim Login in welcher Reihenfolge aus?'],
      right: ['Anwendungsfalldiagramm', 'Aktivitätsdiagramm', 'Klassendiagramm', 'Sequenzdiagramm'],
      answer: [0, 1, 2, 3],
      explanation: 'Funktionen für Akteure → Anwendungsfall · Ablauf + Zuständigkeit → Aktivität · Struktur → Klasse · Nachrichtenaustausch zeitlich → Sequenz.',
    },
    {
      id: 'p04-q032', kind: 'multi', skill: 'uml.activity', difficulty: 2,
      prompt: 'Welche der folgenden UML-Diagramme sind **Verhaltensdiagramme**?',
      options: ['Aktivitätsdiagramm', 'Klassendiagramm', 'Sequenzdiagramm', 'Anwendungsfalldiagramm', 'Verteilungsdiagramm', 'Zustandsdiagramm'],
      answer: [0, 2, 3, 5],
      explanation: 'Verhalten: Aktivität, Anwendungsfall, Zustand und die Interaktionsdiagramme (u. a. Sequenz). Klassen- und Verteilungsdiagramm sind **Strukturdiagramme**.',
    },
    {
      id: 'p04-q033', kind: 'free', skill: 'uml.activity2code', difficulty: 3,
      prompt: '**Handlungssituation:** Bei der Elektro Krämer GmbH läuft die **Beschaffung von IT-Hardware** so ab: Ein Mitarbeiter stellt eine Bestellanforderung. Die IT-Abteilung prüft die Anforderung technisch. Liegt der Betrag **über 1.000 €**, muss die Abteilungsleitung zusätzlich freigeben; lehnt sie ab, wird der Mitarbeiter informiert und der Prozess endet. Nach der Freigabe (bzw. direkt bei ≤ 1.000 €) bestellt der Einkauf die Ware; **gleichzeitig** bereitet die IT-Abteilung die Inventarisierung vor. Wenn beides erledigt ist, wird das Gerät ausgeliefert. Beschreiben Sie das **Aktivitätsdiagramm mit Partitionen**.',
      modelAnswer: 'Partitionen: Mitarbeiter | IT-Abteilung | Abteilungsleitung | Einkauf. Start ● (Mitarbeiter) → „Bestellanforderung stellen“ (Mitarbeiter) → „Anforderung technisch prüfen“ (IT) → Verzweigung ◇ [Betrag > 1.000 €] → „Freigabe prüfen“ (Abteilungsleitung) → Verzweigung ◇ [abgelehnt] → „Mitarbeiter informieren“ → Ende ◉; [freigegeben] → Merge ◇; [Betrag ≤ 1.000 €] → direkt zum Merge ◇. Nach dem Merge Gabelung ▬ → parallel „Ware bestellen“ (Einkauf) und „Inventarisierung vorbereiten“ (IT) → Vereinigung ▬ → „Gerät ausliefern“ (IT) → Ende ◉.',
      keywords: ['Partitionen', 'Guards > 1.000 € / ≤ 1.000 €', 'Merge', 'Gabelung', 'Vereinigung', 'Endknoten'],
      explanation: 'Wichtig: vollständige, sich ausschließende Guards; Zusammenführung der beiden Wege vor der Gabelung; Parallelität mit Gabelung **und** Vereinigung; Abbruchweg mit eigenem Endknoten.',
    },
    {
      id: 'p04-q034', kind: 'single', skill: 'oop.concepts', difficulty: 2,
      prompt: 'Die Klasse `Konto` hat das Attribut `private double saldo;`. In einer anderen Klasse steht `konto.saldo = 1000000;`. Was passiert in Java?',
      options: ['Der Compiler meldet einen Fehler, weil auf private Attribute von außen nicht zugegriffen werden darf.', 'Der Saldo wird auf 1.000.000 gesetzt.', 'Es tritt erst zur Laufzeit eine Exception auf.', 'Der Wert wird ignoriert, ohne Fehlermeldung.'],
      answer: 0,
      distractors: {
        '1': { why: 'private verhindert genau diesen direkten Zugriff (Kapselung).', error: 'oop-kapselung' },
        '2': { why: 'Zugriffsrechte prüft in Java bereits der Compiler.', error: 'oop-kapselung' },
        '3': { why: 'Java meldet den Verstoß ausdrücklich als Fehler.', error: 'oop-kapselung' },
      },
      explanation: 'Ein Verstoß gegen die Sichtbarkeit ist ein **Compilerfehler** („saldo has private access in Konto“). Änderungen nur über Methoden wie `einzahlen(betrag)`, die prüfen können.',
    },
  ],
};
