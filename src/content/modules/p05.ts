import type { Module } from '../types';

/** Codeblock-Begrenzer */
const F = '```';

export const p05: Module = {
  id: 'p05',
  nr: 5,
  area: 'programmierung',
  title: 'Werkzeuge, Softwarequalität, sichere Software & KI',
  short: 'Programmierparadigmen, Compiler/Interpreter, IDE und Debugger, Git, Testverfahren mit Äquivalenzklassen und Grenzwerten, Security/Privacy by Design und KI am Arbeitsplatz.',
  icon: 'TestTube',
  relevance: 'ap1',
  prerequisites: ['p02'],
  generators: ['p.testcases'],
  skills: [
    { id: 'prog.paradigms', module: 'p05', title: 'Programmierparadigmen unterscheiden' },
    { id: 'qa.tools', module: 'p05', title: 'Compiler, Interpreter und Entwicklungsumgebung (IDE)', requires: ['prog.paradigms'] },
    { id: 'qa.debugging', module: 'p05', title: 'Fehlerarten und Debugging', requires: ['qa.tools'] },
    { id: 'qa.git', module: 'p05', title: 'Versionsverwaltung mit Git' },
    { id: 'qa.testing', module: 'p05', title: 'Teststufen und Testverfahren (Black-/White-Box)', requires: ['qa.debugging'] },
    { id: 'qa.equivalence', module: 'p05', title: 'Äquivalenzklassen und Grenzwertanalyse', requires: ['qa.testing'] },
    { id: 'qa.secdesign', module: 'p05', title: 'Security by Design und Privacy by Design' },
    { id: 'ai.basics', module: 'p05', title: 'KI-Grundbegriffe (ML, LLM, Prompt, Halluzination)' },
    { id: 'ai.workplace', module: 'p05', title: 'KI am Arbeitsplatz: Chancen, Risiken, Datenschutz, AI Act', requires: ['ai.basics'] },
  ],
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'p05-l01',
      title: 'Programmierparadigmen: imperativ, objektorientiert, funktional',
      minutes: 15,
      relevance: 'ap1',
      skills: ['prog.paradigms'],
      simple: `Ein Programmierparadigma ist ein grundsätzlicher Programmierstil – so wie es verschiedene Arten gibt, jemandem den Weg zu erklären. Imperativ heißt: Du sagst Schritt für Schritt, wie etwas passiert, wie bei „zweimal links, dann geradeaus“. Objektorientiert heißt: Du baust das Programm aus Objekten, die ihre Daten und passenden Methoden selbst mitbringen. Funktional heißt: Das Programm besteht aus Funktionen, die aus Eingaben Ergebnisse berechnen, ohne nebenbei etwas zu verändern (keine Seiteneffekte) – wie ein Taschenrechner.

**Merke:** imperativ = Schritt-für-Schritt-Befehle, objektorientiert = Objekte mit Daten und Methoden, funktional = Funktionen ohne Seiteneffekte.`,
      steps: [
        {
          type: 'explain',
          title: 'Verschiedene Denkweisen beim Programmieren',
          body: `Ein **Programmierparadigma** ist ein grundlegender **Denk- und Programmierstil** – die Art, wie man ein Problem in einem Programm beschreibt. Man unterscheidet zwei große Familien:

**Imperativ** – *Wie* wird das Ergebnis berechnet? Das Programm ist eine Folge von **Anweisungen**, die den Zustand (Variablen) verändern.

| Paradigma | Idee | typische Sprachen |
|---|---|---|
| **strukturiert** | nur Sequenz, Verzweigung, Schleife – kein wildes Springen (\`goto\`) | Grundlage aller modernen Sprachen |
| **prozedural** | Programm wird in **Prozeduren/Funktionen** zerlegt | C, Pascal |
| **objektorientiert** | Daten und Methoden werden in **Objekten** gebündelt (Kapselung, Vererbung, Polymorphie) | Java, C#, C++ |

**Deklarativ** – *Was* soll herauskommen? Man beschreibt das gewünschte Ergebnis, der Weg dorthin ist Sache des Systems.

| Paradigma | Idee | typische Sprachen |
|---|---|---|
| **funktional** | Programme bestehen aus **Funktionen** im mathematischen Sinn, möglichst **ohne veränderliche Zustände**; Funktionen können an Funktionen übergeben werden | Haskell, F#, Elemente in Python/JavaScript/Java (Lambdas, map/filter) |
| **logisch** | Man formuliert **Fakten und Regeln**, das System leitet Antworten ab | Prolog |
| (Abfragesprachen) | Beschreibung **welche** Daten gewünscht sind | SQL |

**Beispiel – Summe der geraden Zahlen einer Liste:**

${F}
// imperativ (Pseudocode): Schritt für Schritt, Zustand ändert sich
summe ← 0
FÜR i VON 0 BIS LÄNGE(zahlen) - 1
  WENN zahlen[i] MOD 2 = 0 DANN
    summe ← summe + zahlen[i]
  ENDE WENN
ENDE FÜR
${F}

${F}
# funktional (Python): Was ist gesucht? – keine Schleifenvariable, kein Akkumulator
summe = sum(filter(lambda z: z % 2 == 0, zahlen))
${F}

${F}
-- deklarativ (SQL): welche Daten?
SELECT SUM(betrag) FROM rechnung WHERE jahr = 2026;
${F}

**Multiparadigmen-Sprachen:** Python, JavaScript, C# und Java unterstützen mehrere Paradigmen – man kann prozedural, objektorientiert und (teilweise) funktional programmieren.`,
        },
        {
          type: 'visual',
          title: 'Familien der Programmierparadigmen',
          widget: {
            kind: 'cards',
            data: {
              columns: 2,
              items: [
                { title: 'Imperativ: WIE?', text: 'Anweisungsfolgen, veränderliche Variablen. Strukturiert → prozedural (C) → objektorientiert (Java, C#, C++).', icon: 'ListOrdered' },
                { title: 'Deklarativ: WAS?', text: 'Ergebnis beschreiben. Funktional (Haskell), logisch (Prolog), Abfragen (SQL).', icon: 'Target' },
              ],
            },
          },
          caption: 'In der Praxis mischen moderne Sprachen die Paradigmen.',
        },
        {
          type: 'example',
          title: 'Code-Schnipsel einem Paradigma zuordnen',
          problem: 'Ordne die Schnipsel einem Paradigma zu:\n\n1. `class Drucker { private int seiten; public void drucken() { … } }`\n2. `vater(hans, peter). grossvater(X, Z) :- vater(X, Y), vater(Y, Z).`\n3. `SELECT name FROM mitarbeiter WHERE abteilung = \'IT\';`\n4. `void berechneLohn(int id) { … } int main() { berechneLohn(4711); }` (C)\n5. `map (\\x -> x * 2) [1, 2, 3]` (Haskell)',
          steps: [
            { label: '1', body: 'Klasse mit gekapseltem Attribut und Methode → **objektorientiert** (imperativ).' },
            { label: '2', body: 'Fakten und Regeln → **logisch** (deklarativ, Prolog).' },
            { label: '3', body: 'Beschreibt, **welche** Daten gewünscht sind → **deklarativ** (SQL).' },
            { label: '4', body: 'Zerlegung in Funktionen ohne Klassen → **prozedural** (imperativ, C).' },
            { label: '5', body: 'Funktion als Argument, keine Zustandsänderung → **funktional** (deklarativ).' },
          ],
          result: '1 OOP · 2 logisch · 3 deklarativ/SQL · 4 prozedural · 5 funktional',
        },
        {
          type: 'check',
          question: {
            id: 'p05-c01', kind: 'single', skill: 'prog.paradigms', difficulty: 1,
            prompt: 'Welche Aussage beschreibt den Unterschied zwischen **imperativer** und **deklarativer** Programmierung?',
            options: ['Imperativ beschreibt, WIE ein Ergebnis Schritt für Schritt berechnet wird; deklarativ beschreibt, WAS das Ergebnis sein soll.', 'Imperativ ist immer objektorientiert, deklarativ immer prozedural.', 'Deklarative Sprachen haben keine Funktionen.', 'Imperative Programme laufen nur auf Servern.'],
            answer: 0,
            distractors: {
              '1': { why: 'Prozedural und objektorientiert sind **beide** imperativ.', error: 'paradigmen' },
              '2': { why: 'Gerade die funktionale Programmierung (deklarativ) besteht aus Funktionen.', error: 'paradigmen' },
              '3': { why: 'Das Paradigma hat nichts mit der Plattform zu tun.', error: 'paradigmen' },
            },
            explanation: 'Imperativ = **Wie** (Anweisungen, Zustand), deklarativ = **Was** (gewünschtes Ergebnis).',
          },
        },
        { type: 'practice', title: 'Übung: Paradigmen', questionIds: ['p05-q001', 'p05-q002', 'p05-q003'], count: 3, difficulty: 1 },
        { type: 'summary', points: ['Imperativ (Wie?): strukturiert, prozedural, objektorientiert.', 'Deklarativ (Was?): funktional, logisch, SQL.', 'Moderne Sprachen sind meist Multiparadigmen-Sprachen.'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p05-l02',
      title: 'Werkzeuge: Compiler, Interpreter, IDE und Debugger',
      minutes: 25,
      relevance: 'ap1',
      skills: ['qa.tools', 'qa.debugging'],
      simple: `Ein Compiler ist wie ein Übersetzungsbüro: Er übersetzt das ganze Programm vorab in Maschinensprache, danach läuft es schnell und ohne Übersetzer. Ein Interpreter ist wie ein Dolmetscher: Er übersetzt Zeile für Zeile, während das Programm läuft. Eine IDE (Entwicklungsumgebung) ist die Werkstatt, in der Editor, Übersetzer und Debugger zusammen bereitliegen. Mit dem Debugger (Fehlersuchwerkzeug) hältst du das Programm an einem Haltepunkt an und schaust dir die Variablenwerte an.

**Merke:** Compiler = vorab alles übersetzen, Interpreter = beim Ausführen Zeile für Zeile; Debugger = anhalten und nachschauen.`,
      steps: [
        {
          type: 'explain',
          title: 'Vom Quellcode zum laufenden Programm – und Fehler finden',
          body: `Ein Prozessor versteht nur **Maschinencode**. Quellcode muss daher übersetzt werden:

| | **Compiler** | **Interpreter** |
|---|---|---|
| Arbeitsweise | übersetzt den **gesamten** Quellcode **vor** der Ausführung in Maschinencode (ausführbare Datei) | liest und führt den Quellcode **zur Laufzeit** Anweisung für Anweisung aus |
| Geschwindigkeit | Ausführung meist **schneller** | meist langsamer |
| Fehlererkennung | Syntax- und Typfehler **vor** dem Start (beim Kompilieren) | Fehler erst, wenn die betroffene Zeile **ausgeführt** wird |
| Weitergabe | ausführbare Datei, plattformabhängig (z. B. Windows x64) | Quellcode + Interpreter auf dem Zielsystem nötig, dafür plattformunabhängig |
| Beispiele | C, C++, Go, Rust | Python, PHP, Bash, PowerShell, JavaScript (moderne Engines nutzen JIT) |

**Mischform (Bytecode + virtuelle Maschine):** **Java** wird in **Bytecode** kompiliert, der von der **Java Virtual Machine (JVM)** ausgeführt wird; **C#** wird in eine Zwischensprache (IL) übersetzt und von der **.NET-Laufzeitumgebung** ausgeführt. Ein **JIT-Compiler** (Just-in-Time) übersetzt häufig genutzte Teile zur Laufzeit in Maschinencode. Vorteil: „write once, run anywhere“ bei guter Geschwindigkeit.

**IDE (Integrated Development Environment):** bündelt alle Werkzeuge in einer Oberfläche, z. B. Visual Studio, IntelliJ IDEA, Eclipse, PyCharm, Visual Studio Code (mit Erweiterungen):
Editor mit **Syntaxhervorhebung** und **Autovervollständigung**, Compiler/Interpreter-Anbindung, **Debugger**, Versionsverwaltung (Git), Refactoring-Werkzeuge, Testausführung, Build-Werkzeuge.

**Drei Fehlerarten:**

| Fehlerart | Wann bemerkt? | Beispiel |
|---|---|---|
| **Syntaxfehler** | beim Kompilieren / Starten | fehlendes Semikolon, Tippfehler im Schlüsselwort, Klammer nicht geschlossen |
| **Laufzeitfehler** | während der Ausführung, Programm bricht ab | Division durch 0, Array-Index außerhalb des Bereichs, Datei nicht gefunden, Null-Referenz |
| **Logikfehler** (semantischer Fehler) | gar nicht automatisch – das Programm läuft, liefert aber **falsche Ergebnisse** | \`>\` statt \`≥\`, falscher Startwert, Off-by-one |

**Debugger** – das wichtigste Werkzeug gegen Logik- und Laufzeitfehler:
- **Haltepunkt (Breakpoint):** Programm hält an einer bestimmten Zeile an; **bedingter Haltepunkt** nur, wenn eine Bedingung gilt (z. B. \`i = 99\`).
- **Einzelschritt:** *Step Over* (nächste Zeile, Funktionsaufrufe am Stück), *Step Into* (in die aufgerufene Funktion hinein), *Step Out* (bis zum Ende der aktuellen Funktion).
- **Variablen beobachten (Watch):** aktuelle Werte ansehen – wie ein automatischer Schreibtischtest.
- **Aufrufstapel (Call Stack):** Welche Funktion hat welche aufgerufen?

**Systematisches Debugging:** Fehler **reproduzieren** → **eingrenzen** (Breakpoints, Logausgaben) → **Ursache** finden → **beheben** → **erneut testen** (inkl. Regressionstest) → **dokumentieren**.`,
        },
        {
          type: 'explain',
          title: 'Vom Quellcode zum Programm – und weitere Debugging-Begriffe',
          body: `**Die Build-Kette bei kompilierten Sprachen** (z. B. C, C++):

1. **Quellcode** schreiben (Textdatei, z. B. \`main.c\`)
2. Der **Compiler** übersetzt jede Quelldatei in **Objektcode** (Maschinencode-Baustein, z. B. \`main.obj\` bzw. \`main.o\`) und meldet dabei Syntaxfehler.
3. Der **Linker** (Binder) verbindet alle Objektdateien und die benötigten **Bibliotheken** zu **einer ausführbaren Datei** (z. B. \`programm.exe\`). Fehlt eine Funktion, meldet er einen Linker-Fehler.
4. Beim Start lädt das Betriebssystem (Lader, *Loader*) das Programm in den Arbeitsspeicher; **dynamische Bibliotheken** (\`.dll\` unter Windows, \`.so\` unter Linux) werden erst jetzt eingebunden, **statische** sind schon in der .exe enthalten.

**Bibliothek oder Framework?** Eine **Bibliothek** ist eine Sammlung fertiger Funktionen, die **dein Programm aufruft** (z. B. eine Mathe- oder PDF-Bibliothek). Ein **Framework** gibt den **Rahmen** vor und ruft **deinen Code auf** (Umkehr der Steuerung, z. B. Web-Frameworks wie Django oder Spring, Test-Frameworks wie JUnit oder pytest). Ein **GUI-Editor** (Oberflächen-Designer) erzeugt Fenster und Formulare per Drag-and-Drop.

**Weitere Debugging-Begriffe:**

| Begriff | Bedeutung |
|---|---|
| **bedingter Haltepunkt** | hält nur an, wenn eine Bedingung WAHR ist (z. B. \`summe > 100\`) – spart tausende Einzelschritte |
| **Log- bzw. Print-Debugging** | Zwischenwerte gezielt ausgeben oder protokollieren; nützlich, wenn kein Debugger verfügbar ist (z. B. auf dem Server) |
| **Just-in-time-Debugging** | Stürzt ein Programm mit einem **unbehandelten Fehler** ab, bietet das System an, **nachträglich** einen Debugger an den laufenden Prozess anzuhängen – auch wenn das Programm nicht aus der IDE gestartet wurde |
| **Edit and Continue** (ähnlich *Hot Reload*) | Code **während einer angehaltenen Debug-Sitzung ändern** und ohne Neustart weiterlaufen lassen |
| **Speicherabbild (Crash-Dump)** | Zustand des Programms im Moment des Absturzes; wird später im Debugger untersucht (Post-mortem-Analyse) |

📘 **Achtung:** Manche Prüfungsbücher erklären Just-in-time-Debugging als „Anweisungen im laufenden Debuggen ändern“. Das ist **Edit and Continue**. Just-in-time-Debugging heißt: Der Debugger wird **im Moment des Absturzes** „gerade rechtzeitig“ angehängt.`,
        },
        {
          type: 'visual',
          title: 'Drei Wege vom Quellcode zur Ausführung',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Compiler (C, C++, Go)', text: 'Quellcode → Compiler → Maschinencode (.exe) → direkt auf der CPU.', icon: 'Cpu' },
                { title: 'Bytecode + VM (Java, C#)', text: 'Quellcode → Compiler → Bytecode/IL → JVM/.NET (mit JIT) → CPU.', icon: 'Layers' },
                { title: 'Interpreter (Python, PowerShell)', text: 'Quellcode → Interpreter liest und führt zur Laufzeit aus.', icon: 'Terminal' },
              ],
            },
          },
          caption: 'Für Administratoren besonders relevant: Skriptsprachen wie PowerShell, Bash und Python werden interpretiert.',
        },
        {
          type: 'example',
          title: 'Einen Logikfehler mit dem Debugger finden',
          problem: `Ein Skript soll zählen, wie viele Server eine CPU-Auslastung **ab 80 %** haben. Für [80, 95, 40, 80] gibt es **1** statt **3** aus.\n\n${F}\n1  last ← [80, 95, 40, 80]\n2  anzahl ← 0\n3  FÜR i VON 1 BIS LÄNGE(last) - 1\n4    WENN last[i] > 80 DANN\n5      anzahl ← anzahl + 1\n6    ENDE WENN\n7  ENDE FÜR\n8  AUSGABE anzahl\n${F}`,
          steps: [
            { label: 'Fehler reproduzieren', body: 'Mit den Testdaten [80, 95, 40, 80] kommt reproduzierbar 1 heraus. Erwartet: 3 (80, 95, 80).' },
            { label: 'Haltepunkt in Zeile 4, Watch auf i und last[i]', body: 'Der erste Halt erfolgt mit **i = 1** (last[1] = 95) – das Element mit Index 0 wird nie geprüft. **Fehler 1:** Schleife beginnt bei 1 statt 0.' },
            { label: 'Weiter im Einzelschritt', body: 'Bei i = 3 ist last[3] = 80, die Bedingung 80 > 80 ist FALSCH. **Fehler 2:** „ab 80 %“ erfordert `≥ 80`.' },
            { label: 'Beheben und erneut testen', body: 'Zeile 3: `FÜR i VON 0 BIS LÄNGE(last) - 1`, Zeile 4: `WENN last[i] ≥ 80 DANN` → Ausgabe 3 ✔. Danach weitere Testfälle (Grenzwerte 79/80) prüfen.' },
          ],
          result: 'Zwei Logikfehler: Startindex 1 statt 0 und > statt ≥.',
        },
        {
          type: 'check',
          question: {
            id: 'p05-c02', kind: 'match', skill: 'qa.debugging', difficulty: 1,
            prompt: 'Ordne die Fehler der richtigen Fehlerart zu.',
            left: ['In Java fehlt am Ende einer Anweisung das Semikolon.', 'Das Programm stürzt ab, weil durch eine Benutzereingabe 0 geteilt wird.', 'Der Durchschnitt wird durch (Anzahl − 1) statt durch Anzahl geteilt.'],
            right: ['Syntaxfehler', 'Laufzeitfehler', 'Logikfehler'],
            answer: [0, 1, 2],
            explanation: 'Syntax: Regelverstoß der Sprache (Compiler meldet). Laufzeit: Abbruch während der Ausführung. Logik: läuft, aber falsches Ergebnis.',
          },
        },
        { type: 'practice', title: 'Übung: Werkzeuge & Debugging', questionIds: ['p05-q004', 'p05-q005', 'p05-q006', 'p05-q007', 'p05-q008', 'p05-q009', 'p05-q010', 'p05-q011', 'p05-q039', 'p05-q040', 'p05-q041'], count: 6, difficulty: 2 },
        { type: 'summary', points: ['Build-Kette: Quellcode → Compiler → Objektcode → Linker (+ Bibliotheken) → ausführbare Datei.', 'Just-in-time-Debugging = Debugger beim Absturz nachträglich anhängen; Code im Lauf ändern = Edit and Continue.', 'Compiler: alles vorab übersetzen, schnell, plattformabhängig.', 'Interpreter: zur Laufzeit, flexibel, Fehler erst bei Ausführung.', 'Java/C#: Bytecode + VM + JIT.', 'Syntax-, Laufzeit-, Logikfehler; Debugger: Breakpoint, Einzelschritt, Watch, Call Stack.'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p05-l03',
      title: 'Versionsverwaltung mit Git',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['qa.git'],
      simple: `Git ist wie ein Speicherstand-System in einem Videospiel: Du kannst jederzeit einen Zwischenstand sichern und später dorthin zurückkehren. Mit git add legst du fest, welche Änderungen in den nächsten Speicherstand kommen, mit git commit sicherst du ihn mit einer kurzen Beschreibung. Mit git push lädst du deine Speicherstände auf den gemeinsamen Server (Remote-Repository), mit git pull holst du die Änderungen der anderen. Branches (Zweige) sind Nebenstränge, in denen du ausprobieren kannst, ohne den Hauptstand zu gefährden.

**Merke:** add → commit → push zum Hochladen, pull zum Holen; jeder Commit ist ein Zwischenstand mit Beschreibung.`,
      steps: [
        {
          type: 'explain',
          title: 'Jede Änderung nachvollziehbar – auch für Skripte und Konfigurationen',
          body: `Eine **Versionsverwaltung** speichert alle Änderungen an Dateien mit **Autor, Zeitpunkt und Beschreibung**. Man kann jederzeit nachvollziehen, *wer was wann warum* geändert hat, ältere Stände wiederherstellen und parallel im Team arbeiten. Das gilt nicht nur für Programmcode, sondern auch für **Admin-Skripte, Konfigurationsdateien** und Dokumentation („Infrastructure as Code“).

**Git** ist das verbreitetste System. Es ist **verteilt**: Jeder Entwickler hat eine **vollständige Kopie** des Repositorys (inklusive Historie) und kann auch offline Commits erstellen. Ein zentrales **Remote-Repository** (z. B. auf GitHub, GitLab, Azure DevOps oder einem eigenen Server) dient zum Austausch.

**Die drei Bereiche lokal:** Arbeitsverzeichnis (geänderte Dateien) → **Staging-Area** (\`git add\`: für den nächsten Commit vorgemerkt) → **lokales Repository** (\`git commit\`: dauerhaft gespeicherter Versionsstand).

| Befehl | Wirkung |
|---|---|
| \`git init\` | neues, leeres Repository im aktuellen Ordner anlegen |
| \`git clone <url>\` | entferntes Repository vollständig kopieren |
| \`git status\` | zeigt geänderte und vorgemerkte Dateien |
| \`git add <datei>\` | Änderung in die Staging-Area übernehmen |
| \`git commit -m "Text"\` | vorgemerkte Änderungen als neue Version **lokal** speichern |
| \`git push\` | lokale Commits ins **Remote-Repository** hochladen |
| \`git pull\` | Änderungen aus dem Remote holen **und** einarbeiten (= fetch + merge) |
| \`git log\` | Versionsgeschichte anzeigen |
| \`git diff\` | Unterschiede anzeigen |
| \`git branch <name>\` / \`git switch <name>\` | Zweig anlegen / wechseln (älter: \`git checkout\`) |
| \`git merge <zweig>\` | einen Zweig in den aktuellen einarbeiten |

**Branches (Zweige):** Neue Funktionen oder Experimente entwickelt man in einem eigenen Zweig, ohne den stabilen Hauptzweig (\`main\`) zu gefährden. Ist die Arbeit fertig und getestet, wird sie **gemergt** – oft über einen **Pull Request / Merge Request** mit Code-Review.

**Merge-Konflikt:** Haben zwei Personen **dieselbe Stelle** unterschiedlich geändert, kann Git nicht automatisch entscheiden – der Konflikt wird markiert und muss **manuell** gelöst werden.

**Gute Praxis:** kleine, thematisch zusammenhängende Commits mit aussagekräftiger Nachricht · regelmäßig pullen · **keine Passwörter, API-Schlüssel oder personenbezogenen Daten** committen (sie bleiben in der Historie!) · \`.gitignore\` für Dateien, die nicht versioniert werden sollen (z. B. Build-Ergebnisse, lokale Konfiguration mit Zugangsdaten).`,
        },
        {
          type: 'visual',
          title: 'Der Git-Arbeitsablauf',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['Arbeitsverzeichnis', 'Staging-Area', 'lokales Repo', 'Remote-Repo'],
              messages: [
                { from: 3, to: 2, label: 'git clone (einmalig) / git pull', note: 'aktuellen Stand holen' },
                { from: 0, to: 1, label: 'git add skript.ps1', note: 'Änderung vormerken' },
                { from: 1, to: 2, label: 'git commit -m "Backup-Pfad angepasst"', note: 'Version lokal speichern' },
                { from: 2, to: 3, label: 'git push', note: 'mit dem Team teilen' },
              ],
            },
          },
          caption: 'commit speichert lokal, push überträgt zum Server – zwei verschiedene Schritte.',
        },
        {
          type: 'example',
          title: 'Ein Admin-Skript sicher weiterentwickeln',
          problem: 'Du sollst das PowerShell-Skript `backup.ps1` der Elektro Krämer GmbH um eine Protokollierung erweitern, ohne die laufende Version zu gefährden. Das Skript liegt im Team-Repository. Welche Git-Schritte führst du aus?',
          steps: [
            { label: 'Aktuellen Stand holen', body: '`git pull` (bzw. einmalig `git clone <url>`).' },
            { label: 'Eigenen Zweig anlegen', body: '`git switch -c feature/protokollierung` – Änderungen betreffen nicht den Hauptzweig.' },
            { label: 'Ändern, vormerken, speichern', body: 'Skript anpassen → `git add backup.ps1` → `git commit -m "Protokollierung in backup.ps1 ergänzt"`.' },
            { label: 'Teilen und prüfen lassen', body: '`git push -u origin feature/protokollierung` → Pull Request stellen → Kollegin prüft (Code-Review) und testet.' },
            { label: 'Einarbeiten', body: 'Nach Freigabe wird der Zweig in `main` gemergt. Bei Problemen kann jederzeit zum vorherigen Stand zurückgekehrt werden.' },
          ],
          result: 'pull → branch → add → commit → push → Review → merge',
        },
        {
          type: 'check',
          question: {
            id: 'p05-c03', kind: 'single', skill: 'qa.git', difficulty: 1,
            prompt: 'Du hast mit `git commit` eine Änderung gespeichert. Dein Kollege sieht sie im zentralen Repository noch nicht. Warum?',
            options: ['Der Commit liegt nur im lokalen Repository; er muss erst mit git push übertragen werden.', 'Git überträgt Commits nur nachts.', 'Der Kollege muss git add ausführen.', 'Ein Commit wird nie übertragen.'],
            answer: 0,
            distractors: {
              '1': { why: 'Git überträgt nichts automatisch – push ist ein bewusster Schritt.', error: 'git-commit-push' },
              '2': { why: 'git add merkt eigene Änderungen vor; der Kollege braucht nach deinem push ein git pull.', error: 'git-commit-push' },
              '3': { why: 'Mit git push werden Commits ins Remote-Repository übertragen.', error: 'git-commit-push' },
            },
            explanation: '**commit** = lokal speichern, **push** = ins Remote-Repository hochladen, danach holt der Kollege die Änderung mit **pull**.',
          },
        },
        { type: 'practice', title: 'Übung: Git', questionIds: ['p05-q012', 'p05-q013', 'p05-q014', 'p05-q015'], count: 4, difficulty: 2 },
        { type: 'summary', points: ['Git ist verteilt: jeder hat das ganze Repository.', 'add (vormerken) → commit (lokal speichern) → push (hochladen); pull holt Änderungen.', 'Branches für neue Funktionen, Merge nach Review.', 'Keine Passwörter/Schlüssel committen – .gitignore nutzen.'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p05-l04',
      title: 'Testen: Teststufen und Testverfahren',
      minutes: 25,
      relevance: 'ap1',
      skills: ['qa.testing'],
      simple: `Testen ist wie die Probefahrt nach der Autoreparatur: Du prüfst, ob alles funktioniert, bevor der Kunde losfährt. Getestet wird in Stufen – erst einzelne Bauteile (Komponententest), dann ihr Zusammenspiel (Integrationstest), dann das ganze System (Systemtest) und zum Schluss durch den Kunden (Abnahmetest). Beim Black-Box-Test kennst du nur Eingaben und erwartete Ausgaben, beim White-Box-Test schaust du in den Code hinein. Ein Test kann Fehler finden, aber nie beweisen, dass es keine gibt.

**Merke:** Komponente → Integration → System → Abnahme; Black-Box ohne, White-Box mit Blick in den Code.`,
      steps: [
        {
          type: 'explain',
          title: 'Fehler finden, bevor es der Kunde tut',
          body: `**Ziel des Testens** ist es, Fehler zu finden und Vertrauen in die Qualität zu schaffen. Vollständig fehlerfrei beweisen kann ein Test nie – deshalb wählt man Testfälle **systematisch** aus.

**Teststufen** (nach dem V-Modell – jeder Entwicklungsstufe steht eine Teststufe gegenüber):

| Teststufe | Was wird getestet? | Wer / wie? | Gegenstück |
|---|---|---|---|
| **Komponententest** (Modul-, Unit-Test) | einzelne Funktion/Klasse isoliert | Entwickler, meist automatisiert (z. B. JUnit, NUnit, pytest) | Feinentwurf |
| **Integrationstest** | **Zusammenspiel** von Komponenten, **Schnittstellen** (z. B. Programm ↔ Datenbank ↔ Webservice) | Entwicklungs-/Testteam | Grobentwurf/Architektur |
| **Systemtest** | gesamtes System gegen die **Anforderungen** (Pflichtenheft), auch nicht-funktional: Last, Performance, Sicherheit, Bedienbarkeit | Testteam in einer produktionsnahen Testumgebung | Systemspezifikation |
| **Abnahmetest** | Erfüllt das System die Anforderungen des **Kunden** (Lastenheft)? | **Kunde/Fachabteilung**, Ergebnis im **Abnahmeprotokoll** | Anforderungen |

**Statische vs. dynamische Tests:**
- **Statisch** – das Programm wird **nicht ausgeführt**: Code-Review, Walkthrough, Schreibtischtest, statische Codeanalyse (Linter, z. B. für ungenutzte Variablen oder unsichere Funktionen).
- **Dynamisch** – das Programm wird mit **Testdaten ausgeführt** und das Ergebnis mit dem **Soll** verglichen.

**Black-Box vs. White-Box:**

| | **Black-Box-Test** | **White-Box-Test** |
|---|---|---|
| Grundlage | **Spezifikation** (Anforderungen), der Code ist unbekannt | **Quellcode**, die innere Struktur ist bekannt |
| Fragt | Liefert die Funktion zu jeder Eingabe die geforderte Ausgabe? | Werden alle Anweisungen / Zweige durchlaufen? |
| Verfahren | **Äquivalenzklassen**, **Grenzwertanalyse**, Entscheidungstabellen, anwendungsfallbasiert | **Anweisungsüberdeckung (C0)**, **Zweigüberdeckung (C1)**, Pfadüberdeckung |
| typisch für | System- und Abnahmetest | Komponententest |

**Überdeckungsmaße (White-Box):**
- **Anweisungsüberdeckung (C0):** Jede **Anweisung** wird mindestens einmal ausgeführt.
- **Zweigüberdeckung (C1):** Jeder **Zweig** jeder Verzweigung (auch der „leere“ SONST-Fall einer einseitigen Verzweigung) wird mindestens einmal durchlaufen. C1 schließt C0 ein.

**Weitere Begriffe:**
- **Regressionstest:** Nach einer Änderung werden bestehende Tests **erneut** ausgeführt, um sicherzustellen, dass nichts kaputtgegangen ist – ideal automatisiert.
- **Testfall:** Vorbedingung + Eingabe + **erwartetes Ergebnis** (vorher festgelegt!) + tatsächliches Ergebnis + Bewertung.
- **Testprotokoll:** dokumentiert durchgeführte Tests und Ergebnisse; **Abnahmeprotokoll:** bestätigt die Übergabe/Annahme durch den Kunden (ggf. mit Mängelliste).

➡️ Testprozess, Testprotokoll mit Soll/Ist, Alpha-/Beta-Test und Review-Formen vertieft das Modul **p06** (Softwareentwicklungsprozess).`,
        },
        {
          type: 'visual',
          title: 'Die vier Teststufen',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Komponententest', text: 'Eine Funktion isoliert: berechneBrutto(100) = 119?', icon: 'Puzzle' },
                { title: 'Integrationstest', text: 'Schnittstellen: Speichert der Webshop die Bestellung korrekt in der Datenbank?', icon: 'Plug' },
                { title: 'Systemtest', text: 'Das Gesamtsystem gegen das Pflichtenheft – inkl. Last und Sicherheit.', icon: 'Monitor' },
                { title: 'Abnahmetest', text: 'Der Kunde prüft gegen seine Anforderungen und unterschreibt das Abnahmeprotokoll.', icon: 'BadgeCheck' },
              ],
            },
          },
          caption: 'Je später ein Fehler gefunden wird, desto teurer ist seine Behebung.',
        },
        {
          type: 'example',
          title: 'Testfälle für Zweigüberdeckung',
          problem: `Wie viele Testfälle braucht man mindestens für **Anweisungsüberdeckung (C0)** bzw. **Zweigüberdeckung (C1)**?\n\n${F}\nEINGABE betrag\nrabatt ← 0\nWENN betrag ≥ 100 DANN\n  rabatt ← 10\nENDE WENN\nAUSGABE betrag - rabatt\n${F}`,
          steps: [
            { label: 'C0 – alle Anweisungen', body: 'Mit **einem** Testfall betrag = 150 werden alle Anweisungen ausgeführt (auch `rabatt ← 10`). → **1 Testfall**.' },
            { label: 'C1 – alle Zweige', body: 'Die Verzweigung hat zwei Zweige: Bedingung WAHR und FALSCH (der „leere“ Zweig). Nötig sind also betrag = 150 (WAHR) **und** z. B. betrag = 50 (FALSCH). → **2 Testfälle**.' },
            { label: 'Testfälle mit Soll', body: '| Nr. | Eingabe | erwartete Ausgabe |\n|---|---|---|\n| 1 | 150 | 140 |\n| 2 | 50 | 50 |\n\nSinnvoll ergänzt (Grenzwerte, Black-Box-Sicht): 99 → 99, 100 → 90.' },
          ],
          result: 'C0: 1 Testfall · C1: 2 Testfälle',
        },
        {
          type: 'check',
          question: {
            id: 'p05-c04', kind: 'match', skill: 'qa.testing', difficulty: 1,
            prompt: 'Ordne die Situationen der passenden Teststufe zu.',
            left: ['Die Entwicklerin prüft die Funktion pruefeIban() mit 20 automatisierten Testfällen.', 'Es wird getestet, ob das Warenwirtschaftssystem Bestellungen korrekt an den Webservice des Paketdienstes übergibt.', 'Das Testteam prüft das komplette System gegen das Pflichtenheft, inkl. Lasttest mit 500 Benutzern.', 'Die Fachabteilung prüft das System gegen ihre Anforderungen und unterschreibt das Protokoll.'],
            right: ['Komponententest', 'Integrationstest', 'Systemtest', 'Abnahmetest'],
            answer: [0, 1, 2, 3],
            explanation: 'Einzelne Funktion → Komponente · Schnittstelle zwischen Systemen → Integration · Gesamtsystem gegen Pflichtenheft → System · Kunde gegen Anforderungen → Abnahme.',
          },
        },
        { type: 'practice', title: 'Übung: Testen', questionIds: ['p05-q016', 'p05-q017', 'p05-q018', 'p05-q019', 'p05-q020', 'p05-q021', 'p05-q022'], count: 6, difficulty: 2 },
        { type: 'summary', points: ['Teststufen: Komponente → Integration → System → Abnahme.', 'Statisch (ohne Ausführung, z. B. Review) vs. dynamisch (mit Testdaten).', 'Black-Box: Spezifikation (Äquivalenzklassen, Grenzwerte) · White-Box: Code (C0, C1).', 'Regressionstest nach jeder Änderung.'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p05-l05',
      title: 'Testfälle klug wählen: Äquivalenzklassen und Grenzwertanalyse',
      minutes: 20,
      relevance: 'ap1',
      skills: ['qa.equivalence'],
      simple: `Du kannst nicht jede mögliche Eingabe testen – also wählst du klug aus. Stell dir den Kinderpreis im Kino vor (unter 14 Jahren): Alle Alter von 0 bis 13 verhalten sich gleich, sie bilden eine Äquivalenzklasse (Gruppe gleich behandelter Werte), und ein Vertreter daraus reicht. Fehler stecken aber oft an den Grenzen, darum testest du zusätzlich die Grenzwerte 13 und 14 (Grenzwertanalyse). Vergiss die ungültigen Klassen nicht, etwa negative Zahlen oder Buchstaben.

**Merke:** Je Äquivalenzklasse ein Vertreter, dazu die Werte an und direkt neben jeder Grenze.`,
      steps: [
        {
          type: 'explain',
          title: 'Wenige Tests, die viel abdecken',
          body: `Man kann nicht jede mögliche Eingabe testen. Darum teilt man die Eingaben in **Äquivalenzklassen** ein: Bereiche, für die sich das Programm **gleich verhält**. Aus jeder Klasse genügt **ein Repräsentant** – verhält er sich richtig, tun es (vermutlich) alle Werte der Klasse.

**Beispiel:** Eingabefeld „Bestellmenge“, zulässig sind ganze Zahlen **1 bis 99**.

| Äquivalenzklasse | Bereich | Repräsentant | erwartet |
|---|---|---|---|
| ÄK1 ungültig | ≤ 0 | −5 | Fehlermeldung |
| ÄK2 **gültig** | 1 … 99 | 42 | akzeptiert |
| ÄK3 ungültig | ≥ 100 | 250 | Fehlermeldung |
| ÄK4 ungültig | keine Zahl | „abc“, leer, 3,5 | Fehlermeldung |

**Grenzwertanalyse:** Fehler passieren besonders oft **an den Rändern** der Klassen (z. B. \`>\` statt \`≥\` im Code). Darum testet man zusätzlich die Werte **direkt an und neben jeder Grenze**:

| Grenze | Testwerte |
|---|---|
| untere Grenze | **0** (ungültig) · **1** (gültig) |
| obere Grenze | **99** (gültig) · **100** (ungültig) |

**Regeln für die Prüfung:**
- „von 1 bis 99“ / „einschließlich“ → Grenzen gehören dazu.
- „ab 10“ → 10 gehört dazu · „unter 50“ → 50 gehört **nicht** dazu · „über 200“ → 200 gehört **nicht** dazu.
- Die **Schrittweite** bestimmt den Nachbarwert: ganze Zahlen ±1, Geldbeträge ±0,01 €, halbe Urlaubstage ±0,5.
- Bei **mehreren gültigen Klassen** (z. B. Rabattstufen) gibt es auch **zwischen** den gültigen Klassen Grenzen – jede Grenze wird getestet.
- Nicht vergessen: **ungültige Klassen** ohne Zahlengrenze (Text, leer, Sonderzeichen, falsches Format).

Äquivalenzklassen und Grenzwertanalyse sind **Black-Box-Verfahren** – sie leiten Testfälle aus der Spezifikation ab, nicht aus dem Code.`,
        },
        {
          type: 'visual',
          title: 'Klassen und Grenzen auf dem Zahlenstrahl',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'ungültig: … −1, 0', text: 'Grenzwert 0 testen → muss abgelehnt werden.', icon: 'XCircle' },
                { title: 'gültig: 1 … 99', text: 'Grenzwerte 1 und 99 + ein Repräsentant aus der Mitte (z. B. 42).', icon: 'CheckCircle2' },
                { title: 'ungültig: 100, 101 …', text: 'Grenzwert 100 testen → muss abgelehnt werden.', icon: 'XCircle' },
              ],
            },
          },
          caption: 'Pro Grenze zwei Werte: der letzte auf der einen und der erste auf der anderen Seite.',
        },
        {
          type: 'example',
          title: 'Testfälle für eine Rabattstaffel',
          problem: 'Laut Pflichtenheft gilt für Netzwerkkabel: **1 bis 49 Stück** 0 % Rabatt, **50 bis 199 Stück** 5 %, **ab 200 Stück** 10 %. Mehr als **1.000 Stück** pro Bestellung sind nicht zulässig. Bestimme Äquivalenzklassen und Grenzwerte.',
          steps: [
            { label: 'Äquivalenzklassen', body: '| Klasse | Bereich |\n|---|---|\n| ÄK1 ungültig | ≤ 0 |\n| ÄK2 gültig, 0 % | 1 … 49 |\n| ÄK3 gültig, 5 % | 50 … 199 |\n| ÄK4 gültig, 10 % | 200 … 1.000 |\n| ÄK5 ungültig | ≥ 1.001 |\n| ÄK6 ungültig | keine ganze Zahl |' },
            { label: 'Grenzwerte', body: '0 | 1 · 49 | 50 · 199 | 200 · 1.000 | 1.001' },
            { label: 'Testfälle mit Soll', body: '| Eingabe | erwartet |\n|---|---|\n| 0 | Fehler |\n| 1 | 0 % |\n| 49 | 0 % |\n| 50 | 5 % |\n| 199 | 5 % |\n| 200 | 10 % |\n| 1.000 | 10 % |\n| 1.001 | Fehler |\n| „zehn“ | Fehler |' },
          ],
          result: '6 Äquivalenzklassen (3 gültig, 3 ungültig) und 8 Grenzwerte.',
        },
        {
          type: 'check',
          question: {
            id: 'p05-c05', kind: 'number', skill: 'qa.equivalence', difficulty: 2,
            prompt: 'Ein Formularfeld akzeptiert das **Alter** als ganze Zahl **ab 18 und unter 68**. Welches ist der **größte gültige** Wert, der bei der Grenzwertanalyse getestet werden muss?',
            answer: 67,
            misconceptions: [{ answer: '68', error: 'grenzwert-unter', why: '„unter 68“ schließt 68 aus – der größte gültige Wert ist 67.' }],
            explanation: '„unter 68“ → gültig bis **67**; Grenzwerte oben: 67 (gültig) und 68 (ungültig). Unten: 17 (ungültig) und 18 (gültig).',
          },
        },
        { type: 'practice', title: 'Übung: Grenzwerte bestimmen (Generator)', generator: 'p.testcases', count: 4, difficulty: 2 },
        { type: 'practice', title: 'Übung: Äquivalenzklassen aus dem Pool', questionIds: ['p05-q023', 'p05-q024', 'p05-q025'], count: 3, difficulty: 2 },
        { type: 'summary', points: ['Äquivalenzklasse = Eingaben mit gleichem Verhalten, ein Repräsentant genügt.', 'Gültige und ungültige Klassen (auch „keine Zahl“).', 'Grenzwerte: an und neben jeder Grenze, Schrittweite beachten.', 'Black-Box-Verfahren auf Basis der Spezifikation.'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p05-l06',
      title: 'Sichere Software planen: Security by Design und Privacy by Design',
      minutes: 25,
      relevance: 'ap1',
      skills: ['qa.secdesign'],
      simple: `Security by Design ist wie die Planung von Fluchtwegen beim Hausbau: Sicherheit wird von Anfang an mitgeplant, nicht nachträglich angeschraubt. Privacy by Design bedeutet dasselbe für den Datenschutz – nur so viele personenbezogene Daten wie nötig, und die Voreinstellungen sind datenschutzfreundlich (Art. 25 DSGVO). Jeder bekommt nur die Rechte, die er wirklich braucht (Least Privilege, minimale Rechte). Geht etwas schief, soll das System sicher reagieren und den Zugriff im Zweifel verweigern (sicherer Ausfall, fail secure).

**Merke:** Sicherheit und Datenschutz von Anfang an einplanen; minimale Rechte, im Fehlerfall verweigern.`,
      steps: [
        {
          type: 'explain',
          title: 'Sicherheit und Datenschutz von Anfang an einplanen',
          body: `Sicherheitslücken und Datenschutzprobleme lassen sich **früh** im Projekt viel günstiger vermeiden als später beheben („Shift Left“). Deshalb gehören beide Themen schon in Anforderungsanalyse, Planung und Modellierung.

**Security by Design** – Software wird von Grund auf so entworfen, dass sie Angriffen widersteht:

| Prinzip | Bedeutung / Beispiel |
|---|---|
| **Minimale Rechte (Least Privilege)** | Jede Komponente/jeder Benutzer erhält nur die Rechte, die er wirklich braucht (Datenbankkonto der Web-App darf nur lesen/schreiben, nicht Tabellen löschen). |
| **Sichere Voreinstellungen (Secure Defaults)** | Auslieferung im sicheren Zustand: keine Standardpasswörter, unnötige Dienste deaktiviert, HTTPS erzwungen. |
| **Eingaben validieren** | Alle Eingaben gelten als nicht vertrauenswürdig: Typ, Länge, Format prüfen (Whitelist). Gegen **SQL-Injection** helfen **Prepared Statements** (parametrisierte Abfragen), gegen **Cross-Site-Scripting** die Kodierung von Ausgaben. |
| **Tiefenverteidigung (Defense in Depth)** | Mehrere Schutzschichten: Firewall + Authentifizierung + Verschlüsselung + Protokollierung. |
| **Angriffsfläche minimieren** | Nur nötige Funktionen, Ports und Schnittstellen anbieten. |
| **Sicher scheitern (Fail Secure)** | Im Fehlerfall Zugriff verweigern; Fehlermeldungen ohne interne Details (kein Stacktrace für Nutzer). |
| **Sichere Speicherung von Passwörtern** | niemals im Klartext oder verschlüsselt (umkehrbar), sondern als **Hash mit Salt** mittels geeignetem Verfahren (z. B. Argon2, bcrypt, PBKDF2) – nicht mit schnellen Hashes wie MD5. |
| **Keine Sicherheit durch Verschleierung** | Geheimhaltung des Quellcodes ersetzt keine echten Schutzmaßnahmen. |
| **Abhängigkeiten pflegen** | eingesetzte Bibliotheken inventarisieren und aktualisieren (bekannte Schwachstellen). |

Orientierung geben z. B. die **OWASP Top 10** (häufigste Risiken von Webanwendungen) und das **BSI**. Für Produkte mit digitalen Elementen schreibt der EU **Cyber Resilience Act** (Verordnung (EU) 2024/2847) künftig gestaffelt Security by Design, Schwachstellenmanagement und Sicherheitsupdates verbindlich vor.

**Privacy by Design und Privacy by Default** – in der DSGVO als **„Datenschutz durch Technikgestaltung und durch datenschutzfreundliche Voreinstellungen“** verankert (**Art. 25 DSGVO**):
- **by Design:** Bereits bei der Planung technische und organisatorische Maßnahmen vorsehen, z. B. **Datenminimierung** (Art. 5 Abs. 1 lit. c DSGVO: nur erheben, was für den Zweck nötig ist), **Pseudonymisierung**, **Verschlüsselung**, Löschkonzepte, Rollen- und Berechtigungskonzept, Protokollierung von Zugriffen.
- **by Default:** Die **Voreinstellungen** sind datenschutzfreundlich – z. B. Profil standardmäßig nicht öffentlich, optionale Felder leer, Tracking erst nach Einwilligung, nur notwendige Cookies vorausgewählt.

**Im Projektalltag:** Sicherheits- und Datenschutzanforderungen ins Lastenheft/Pflichtenheft, Schutzbedarf festlegen, im Klassendiagramm sensible Attribute kennzeichnen und kapseln, Bedrohungen im Anwendungsfalldiagramm mitdenken („Was könnte ein Angreifer tun?“), Sicherheitstests und Code-Reviews einplanen.`,
        },
        {
          type: 'explain',
          title: 'Sicher ausfallen, Rechte trennen, sinnvoll protokollieren',
          body: `**Sicherer Ausfall (fail secure, sichere Standardwerte):** Geht etwas schief, fällt das System in den **sicheren Zustand** – im Zweifel wird der Zugriff **verweigert**. Beispiele: Ist der Berechtigungsserver nicht erreichbar, lehnt die Anwendung die Anmeldung ab, statt „vorsichtshalber“ alle durchzulassen. Neue Konten haben zunächst **keine** Rechte; erlaubt ist nur, was ausdrücklich freigegeben wurde (**Default Deny**, Whitelist).
*Abgrenzung:* In der Gebäudetechnik heißt „fail safe“ oft das Gegenteil – Fluchttüren entriegeln bei Stromausfall, weil Menschenleben vorgehen. Für Zugriffskontrolle in Software gilt: im Zweifel verweigern.

**Weitere Gestaltungsprinzipien:**

| Prinzip | Bedeutung / Beispiel |
|---|---|
| **Berechtigungstrennung** (Funktionstrennung, Vier-Augen-Prinzip) | kritische Aktionen brauchen zwei Personen oder zwei Rechte – wer eine Zahlung anlegt, darf sie nicht selbst freigeben |
| **Vollständige Zugriffsüberwachung** | **jeder** Zugriff wird geprüft, nicht nur der erste (Rechte können sich seit dem Login geändert haben) |
| **Mehrere Sicherheitsebenen** | siehe Defense in Depth |
| **Benutzerfreundliche Sicherheit** | Sicherheit, die lästig ist, wird umgangen (Passwortzettel am Monitor). Besser: Passwortmanager, Single Sign-on mit MFA, verständliche Meldungen |

**Protokollierung (Logging) sicherheitsrelevanter Ereignisse** – nur so lassen sich Angriffe erkennen und aufklären:
- **Protokollieren:** An- und Abmeldungen inklusive **Fehlversuchen**, Änderungen an Konten und Rechten, Zugriffe auf schützenswerte Daten, Konfigurationsänderungen, Aktionen von Administratoren, Fehler und Ausnahmen – jeweils mit **Zeitstempel** (synchronisierte Uhr, z. B. per NTP), Benutzerkennung, Quelle (IP-Adresse), Aktion und Ergebnis.
- **Nicht protokollieren:** **Passwörter** (auch keine falsch eingegebenen), Sitzungs-Token und Schlüssel, vollständige Zahlungsdaten, unnötige personenbezogene Daten (Datenminimierung).
- **Logs schützen:** nur lesend zugänglich, möglichst zentral speichern (z. B. Syslog-Server, SIEM), gegen Manipulation sichern, **Aufbewahrungs- und Löschfristen** festlegen und regelmäßig auswerten (Alarm bei vielen Fehlversuchen).
- Logs enthalten oft personenbezogene Daten: Zweck festlegen, Zugriff beschränken; wenn sie sich zur Leistungs- oder Verhaltenskontrolle eignen, hat ein vorhandener Betriebsrat ein Mitbestimmungsrecht (§ 87 Abs. 1 Nr. 6 BetrVG).`,
        },
        {
          type: 'visual',
          title: 'Zwei Seiten derselben Medaille',
          widget: {
            kind: 'cards',
            data: {
              columns: 2,
              items: [
                { title: 'Security by Design', text: 'Schutz vor Angriffen: Least Privilege, Secure Defaults, Eingabevalidierung, Defense in Depth, sichere Passwortspeicherung.', icon: 'ShieldCheck' },
                { title: 'Privacy by Design / by Default (Art. 25 DSGVO)', text: 'Schutz personenbezogener Daten: Datenminimierung, Pseudonymisierung, Verschlüsselung, datenschutzfreundliche Voreinstellungen.', icon: 'UserLock' },
              ],
            },
          },
          caption: 'Security schützt das System, Privacy schützt die Menschen, deren Daten verarbeitet werden.',
        },
        {
          type: 'example',
          title: 'Ein Bewerberportal datenschutz- und sicherheitsgerecht planen',
          problem: 'Die Elektro Krämer GmbH plant ein **Online-Bewerberportal**. Bewerber laden Lebenslauf und Zeugnisse hoch, die Personalabteilung sichtet die Unterlagen. Nenne je drei Maßnahmen für Security by Design und für Privacy by Design/Default.',
          steps: [
            { label: 'Security by Design', body: '1. Upload nur erlaubter Dateitypen (PDF) mit Größenlimit, Virenscan.\n2. Zugriff auf Bewerbungen nur für die Rolle „Personal“ (Least Privilege), Anmeldung mit MFA.\n3. Übertragung nur per HTTPS/TLS, Datenbankabfragen als Prepared Statements, Passwörter der Bewerberkonten als Argon2-/bcrypt-Hash.' },
            { label: 'Privacy by Design', body: '1. Nur Pflichtfelder, die für die Bewerbung nötig sind (kein Geburtsort, keine Religion – Datenminimierung).\n2. Automatische Löschung abgelehnter Bewerbungen nach einer festgelegten Frist (Löschkonzept; in der Praxis häufig etwa sechs Monate wegen möglicher AGG-Ansprüche – mit dem Datenschutzbeauftragten abstimmen).\n3. Verschlüsselte Speicherung der Dokumente.' },
            { label: 'Privacy by Default', body: 'Einwilligung in einen Talentpool ist **nicht** vorausgewählt; Newsletter-Haken leer; nur technisch notwendige Cookies aktiv.' },
          ],
          result: 'Sicherheit (Upload-Prüfung, Rollen, TLS, sichere Hashes) + Datenschutz (Minimierung, Löschfristen, Verschlüsselung, Opt-in).',
        },
        {
          type: 'check',
          question: {
            id: 'p05-c06', kind: 'single', skill: 'qa.secdesign', difficulty: 2,
            prompt: 'Welche Maßnahme ist ein Beispiel für **Privacy by Default**?',
            options: ['Das Benutzerprofil einer neuen App ist standardmäßig nur für den Nutzer selbst sichtbar.', 'Die Datenbank wird jede Nacht gesichert.', 'Der Quellcode wird geheim gehalten.', 'Das Administratorkonto heißt nicht „admin“.'],
            answer: 0,
            distractors: {
              '1': { why: 'Ein Backup dient der Verfügbarkeit, nicht datenschutzfreundlichen Voreinstellungen.', error: 'privacy-by-default' },
              '2': { why: 'Geheimhaltung des Codes ist „Security by Obscurity“ und kein Datenschutzprinzip.', error: 'privacy-by-default' },
              '3': { why: 'Das ist eine (schwache) Sicherheitsmaßnahme, keine datenschutzfreundliche Voreinstellung.', error: 'privacy-by-default' },
            },
            explanation: '**Privacy by Default** (Art. 25 Abs. 2 DSGVO): Ohne Zutun des Nutzers werden nur die für den Zweck nötigen Daten verarbeitet und nicht einer unbestimmten Zahl von Personen zugänglich gemacht.',
          },
        },
        { type: 'practice', title: 'Übung: Security & Privacy by Design', questionIds: ['p05-q026', 'p05-q027', 'p05-q028', 'p05-q029', 'p05-q038', 'p05-q042', 'p05-q043', 'p05-q044'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Security by Design: Least Privilege, Secure Defaults, Eingabevalidierung, Defense in Depth.', 'Sicher ausfallen: im Fehlerfall Zugriff verweigern (Default Deny); Vier-Augen-Prinzip für kritische Aktionen.', 'Protokollieren: Anmeldungen inkl. Fehlversuche, Rechteänderungen, Admin-Aktionen – nie Passwörter oder Tokens.', 'SQL-Injection → Prepared Statements; Passwörter → Hash mit Salt (Argon2/bcrypt).', 'Art. 25 DSGVO: Datenschutz durch Technikgestaltung und datenschutzfreundliche Voreinstellungen.', 'Datenminimierung, Pseudonymisierung, Verschlüsselung, Löschkonzept.'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p05-l07',
      title: 'Künstliche Intelligenz am Arbeitsplatz',
      minutes: 30,
      relevance: 'ap1',
      skills: ['ai.basics', 'ai.workplace'],
      simple: `Eine KI wie ein Chatbot ist wie ein sehr belesener Praktikant: Er weiß viel und schreibt schnell, erfindet aber manchmal überzeugend klingende Dinge (Halluzination). Deshalb prüfst du jedes Ergebnis selbst, bevor du es verwendest – vor allem Code, Fakten und Quellen. Personenbezogene oder vertrauliche Firmendaten gibst du nicht in einen öffentlichen KI-Dienst ein. Richtig eingesetzt spart KI Zeit, etwa beim Formulieren, Zusammenfassen oder Erklären von Fehlermeldungen.

**Merke:** KI-Ergebnisse immer prüfen, keine vertraulichen Daten eingeben, die Verantwortung bleibt bei dir.`,
      steps: [
        {
          type: 'explain',
          title: 'Begriffe, Chancen, Risiken und Regeln',
          body: `**Künstliche Intelligenz (KI)** bezeichnet Systeme, die Aufgaben lösen, für die man bisher menschliche Intelligenz brauchte – Sprache verstehen, Muster erkennen, Texte oder Bilder erzeugen, Entscheidungen vorbereiten. Alle heutigen Systeme sind **schwache KI**: spezialisiert, ohne eigenes Bewusstsein oder allgemeines Verständnis.

**Wichtige Begriffe:**

| Begriff | Erklärung |
|---|---|
| **Maschinelles Lernen (ML)** | Das System lernt Muster aus **Daten**, statt dass jede Regel programmiert wird. |
| überwachtes Lernen | Training mit **beschrifteten** Beispielen (E-Mail → „Spam“/„kein Spam“) |
| unüberwachtes Lernen | sucht selbst Strukturen in unbeschrifteten Daten (z. B. Kundengruppen, Anomalien im Netzwerkverkehr) |
| bestärkendes Lernen | lernt durch Belohnung/Bestrafung (z. B. Spiele, Robotik) |
| **Deep Learning** | ML mit vielschichtigen **künstlichen neuronalen Netzen** |
| **Generative KI** | erzeugt neue Inhalte: Text, Code, Bilder, Audio |
| **Großes Sprachmodell (LLM)** | auf riesigen Textmengen trainiertes Modell, das Text **Token für Token** fortsetzt (z. B. hinter Chat-Assistenten) |
| **Prompt** | die Eingabe/Anweisung an ein generatives KI-System |
| **Training / Inferenz** | Training = Modell lernt aus Daten · Inferenz = Nutzung des fertigen Modells |
| **Halluzination** | KI erzeugt **plausibel klingende, aber falsche** Aussagen (erfundene Quellen, Befehle, Paragraphen) |
| **Bias (Verzerrung)** | Vorurteile aus Trainingsdaten führen zu unfairen Ergebnissen |

**Chancen am IT-Arbeitsplatz:** Texte und E-Mails entwerfen, Dokumentation zusammenfassen, Skripte und Code-Vorschläge erstellen, Fehlermeldungen erklären, Logdateien auswerten, Übersetzungen, Ticket-Klassifizierung im Helpdesk, Anomalieerkennung in der IT-Sicherheit.

**Risiken:** Halluzinationen und veraltetes Wissen · **Datenschutz** und **Vertraulichkeit** (Eingaben können beim Anbieter gespeichert oder zum Training genutzt werden) · Urheber- und Lizenzfragen bei generierten Inhalten · Bias · Abhängigkeit vom Anbieter · Sicherheitslücken in generiertem Code · neue Angriffe (z. B. **Prompt Injection**, Deepfakes, besser formulierte Phishing-Mails).

**Regeln für den sicheren Einsatz:**
1. **Keine personenbezogenen Daten** (Kunden, Kollegen, Bewerber) und **keine vertraulichen Firmendaten** (Quellcode mit Zugangsdaten, Verträge, Netzpläne, Passwörter) in **öffentliche, nicht freigegebene** KI-Tools eingeben. Erlaubt ist das nur in vom Unternehmen **freigegebenen** Diensten mit Rechtsgrundlage, **Vertrag zur Auftragsverarbeitung** (Art. 28 DSGVO) und geklärter Datenübermittlung (Drittländer: Art. 44 ff. DSGVO).
2. **Ergebnisse immer prüfen** („Human in the Loop“) – besonders Befehle, Skripte und Fakten. Generierten Code vor dem Einsatz verstehen und in einer Testumgebung testen.
3. Wichtige Entscheidungen mit rechtlicher Wirkung für Personen dürfen nicht allein automatisiert getroffen werden (Art. 22 DSGVO).
4. **KI-Nutzungsrichtlinie** des Unternehmens beachten; KI-Einsatz bei Bedarf kennzeichnen.

**EU-KI-Verordnung (AI Act, Verordnung (EU) 2024/1689)** – risikobasierter Ansatz:

| Risikostufe | Beispiele | Folge |
|---|---|---|
| **unannehmbar** | Social Scoring durch Behörden, manipulative Techniken, Emotionserkennung am Arbeitsplatz (mit engen Ausnahmen) | **verboten** |
| **hoch** | KI in der Personalauswahl, Kreditwürdigkeit, kritische Infrastruktur | strenge Pflichten (Risikomanagement, Dokumentation, menschliche Aufsicht) |
| **begrenzt** | Chatbots, KI-generierte/manipulierte Inhalte (Deepfakes) | **Transparenzpflichten** (offenlegen, dass KI im Spiel ist) |
| **minimal** | Spamfilter, KI in Videospielen | keine besonderen Pflichten |

Die Verordnung gilt **gestaffelt**: Verbote und die Pflicht zur **KI-Kompetenz** (Art. 4 – Unternehmen müssen sicherstellen, dass Beschäftigte, die KI einsetzen, ausreichend geschult sind) gelten seit dem **2. Februar 2025**, Pflichten für KI-Modelle mit allgemeinem Verwendungszweck seit dem **2. August 2025**; weitere Pflichten folgen ab August 2026 bzw. 2027. Zu einzelnen Fristen (insbesondere für Hochrisiko-Systeme) wurden auf EU-Ebene Verschiebungen vorgeschlagen – den aktuellen Stand im Betrieb prüfen.`,
        },
        {
          type: 'visual',
          title: 'Ampel für die Nutzung öffentlicher KI-Chatbots',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Grün – in Ordnung', text: 'Allgemeine Fragen, Formulierungshilfe ohne Personenbezug, Erklärung öffentlicher Dokumentation, Übungsaufgaben.', icon: 'CircleCheck' },
                { title: 'Gelb – nur freigegebene Tools', text: 'Interne Dokumente, Quellcode ohne Geheimnisse, Logauszüge (vorher anonymisieren) – nur in vom Betrieb freigegebenen Diensten.', icon: 'CircleAlert' },
                { title: 'Rot – nie in öffentliche Tools', text: 'Personenbezogene Daten, Passwörter/API-Schlüssel, Kundenverträge, Netzpläne mit IP-Adressen, Gesundheitsdaten.', icon: 'CircleX' },
              ],
            },
          },
          caption: 'Im Zweifel: Datenschutzbeauftragten oder IT-Sicherheit fragen und die KI-Richtlinie des Betriebs beachten.',
        },
        {
          type: 'example',
          title: 'Ein KI-generiertes Skript prüfen',
          problem: 'Ein Kollege hat sich von einem KI-Chatbot ein PowerShell-Skript erzeugen lassen, das „alte Benutzerprofile löscht“. Er möchte es sofort auf allen 120 Clients ausrollen. Er hat dafür eine Liste mit Benutzernamen und Abteilungen in den öffentlichen Chatbot kopiert. Bewerte das Vorgehen.',
          steps: [
            { label: 'Datenschutzproblem', body: 'Benutzernamen mit Abteilung sind **personenbezogene Daten**. Ohne freigegebenes Tool, Auftragsverarbeitungsvertrag und Rechtsgrundlage ist die Weitergabe an einen externen Anbieter unzulässig → Vorfall dem Datenschutzbeauftragten melden, künftig nur anonymisierte Beispiele verwenden.' },
            { label: 'Fachliches Risiko', body: 'Das Skript kann **halluzinierte** oder falsche Befehle enthalten und löscht Daten (irreversibel!). Es muss **gelesen und verstanden** werden.' },
            { label: 'Sicheres Vorgehen', body: '1. Code-Review (Vier-Augen-Prinzip)\n2. Test in einer **Testumgebung** bzw. auf einem einzelnen Test-Client mit Backup\n3. Testlauf ohne Löschwirkung (PowerShell: Parameter `-WhatIf`)\n4. Versionsverwaltung (Git) und Dokumentation\n5. Schrittweiser Rollout' },
          ],
          result: 'Datenschutzverstoß + fehlende Prüfung. KI-Ergebnisse sind Vorschläge – Verantwortung bleibt beim Menschen.',
        },
        {
          type: 'check',
          question: {
            id: 'p05-c07', kind: 'text', skill: 'ai.basics', difficulty: 1,
            prompt: 'Wie nennt man es, wenn ein KI-Sprachmodell **überzeugend klingende, aber frei erfundene** Fakten oder Quellen ausgibt? (ein Wort)',
            accept: ['Halluzination', 'Halluzinationen', 'halluzinieren', 'Konfabulation'],
            explanation: '**Halluzination** – LLMs erzeugen wahrscheinliche Wortfolgen, keine geprüften Fakten. Darum: Ergebnisse immer verifizieren.',
          },
        },
        { type: 'practice', title: 'Übung: KI am Arbeitsplatz', questionIds: ['p05-q030', 'p05-q031', 'p05-q032', 'p05-q033', 'p05-q034', 'p05-q035', 'p05-q036', 'p05-q037'], count: 6, difficulty: 2 },
        { type: 'summary', points: ['ML lernt aus Daten; LLMs erzeugen Text Token für Token; Halluzinationen möglich.', 'Keine personenbezogenen oder vertraulichen Daten in nicht freigegebene KI-Tools.', 'Ergebnisse prüfen, Code testen – der Mensch bleibt verantwortlich.', 'AI Act: risikobasiert (verboten, hoch, begrenzt, minimal); KI-Kompetenzpflicht seit 2.2.2025.'] },
      ],
    },
  ],

  /* ==================================================================== */
  questions: [
    {
      id: 'p05-q001', kind: 'match', skill: 'prog.paradigms', difficulty: 1,
      prompt: 'Ordne die Paradigmen einer typischen Sprache zu.',
      left: ['prozedural', 'objektorientiert', 'funktional', 'logisch', 'deklarative Datenbankabfrage'],
      right: ['C', 'Java', 'Haskell', 'Prolog', 'SQL'],
      answer: [0, 1, 2, 3, 4],
      explanation: 'C (prozedural), Java (OOP), Haskell (funktional), Prolog (logisch), SQL (deklarativ).',
    },
    {
      id: 'p05-q002', kind: 'single', skill: 'prog.paradigms', difficulty: 1,
      prompt: 'Welche der folgenden Anweisungen ist **deklarativ** formuliert?',
      options: ['SELECT name FROM kunde WHERE ort = \'Hamburg\';', 'FÜR i VON 0 BIS n - 1 … ENDE FÜR', 'summe ← summe + wert', 'WENN x > 0 DANN … ENDE WENN'],
      answer: 0,
      distractors: {
        '1': { why: 'Eine Schleife beschreibt Schritt für Schritt das Wie → imperativ.', error: 'paradigmen' },
        '2': { why: 'Eine Zuweisung verändert den Zustand → imperativ.', error: 'paradigmen' },
        '3': { why: 'Eine Verzweigung steuert den Ablauf → imperativ.', error: 'paradigmen' },
      },
      explanation: 'SQL beschreibt, **welche** Daten gewünscht sind; wie die Datenbank sie findet, entscheidet das DBMS.',
    },
    {
      id: 'p05-q003', kind: 'free', skill: 'prog.paradigms', difficulty: 2,
      prompt: 'Erläutern Sie den Unterschied zwischen **prozeduraler** und **objektorientierter** Programmierung.',
      modelAnswer: 'Prozedural wird ein Programm in Prozeduren/Funktionen zerlegt, die auf getrennt davon gehaltenen Daten arbeiten (z. B. C). Objektorientiert werden Daten (Attribute) und die dazugehörigen Operationen (Methoden) in Objekten gebündelt; Klassen dienen als Baupläne. Hinzu kommen Kapselung (Daten nur über Methoden zugänglich), Vererbung und Polymorphie. Dadurch lassen sich reale Gegenstände natürlicher abbilden, Code besser wiederverwenden und große Systeme besser strukturieren. Beide gehören zu den imperativen Paradigmen.',
      keywords: ['Prozeduren/Funktionen', 'Daten getrennt', 'Objekte bündeln Daten und Methoden', 'Kapselung', 'Vererbung', 'imperativ'],
      explanation: 'Kern: Trennung von Daten und Funktionen (prozedural) vs. Bündelung in Objekten (OOP).',
    },
    {
      id: 'p05-q004', kind: 'table', skill: 'qa.tools', difficulty: 2,
      prompt: 'Ordne die Aussagen **Compiler** oder **Interpreter** zu.',
      columns: [{ key: 'w', label: 'Compiler / Interpreter', type: 'text' }],
      rows: [
        { label: 'übersetzt den gesamten Quellcode vor der Ausführung in Maschinencode', cells: { w: { answer: 'Compiler', accept: ['c'] } } },
        { label: 'führt den Quellcode Anweisung für Anweisung zur Laufzeit aus', cells: { w: { answer: 'Interpreter', accept: ['i'] } } },
        { label: 'erzeugt eine ausführbare Datei, die ohne Quellcode weitergegeben werden kann', cells: { w: { answer: 'Compiler', accept: ['c'] } } },
        { label: 'ein Syntaxfehler in einer selten genutzten Funktion fällt evtl. erst auf, wenn diese ausgeführt wird', cells: { w: { answer: 'Interpreter', accept: ['i'] } } },
        { label: 'typisch für PowerShell- und Bash-Skripte', cells: { w: { answer: 'Interpreter', accept: ['i'] } } },
      ],
      explanation: 'Compiler: vorab, komplett, ausführbare Datei, Fehler vor dem Start. Interpreter: zur Laufzeit, Zeile für Zeile, typisch für Skriptsprachen.',
    },
    {
      id: 'p05-q005', kind: 'single', skill: 'qa.tools', difficulty: 2,
      prompt: 'Wie wird ein **Java**-Programm üblicherweise ausgeführt?',
      options: ['Der Quellcode wird in Bytecode kompiliert, den die Java Virtual Machine (mit JIT-Compiler) ausführt.', 'Der Quellcode wird direkt von der CPU ausgeführt.', 'Java wird ausschließlich interpretiert, ohne Kompilierung.', 'Java wird direkt in Maschinencode für genau eine Plattform übersetzt.'],
      answer: 0,
      distractors: {
        '1': { why: 'Die CPU versteht nur Maschinencode.', error: 'compiler-interpreter' },
        '2': { why: 'javac kompiliert zunächst in Bytecode (.class-Dateien).', error: 'compiler-interpreter' },
        '3': { why: 'Der Bytecode ist plattformunabhängig – die JVM ist plattformspezifisch.', error: 'compiler-interpreter' },
      },
      explanation: 'Java ist eine Mischform: **javac** → Bytecode → **JVM** (interpretiert + JIT-Kompilierung). Ähnlich C# mit IL und .NET-Laufzeit.',
    },
    {
      id: 'p05-q006', kind: 'free', skill: 'qa.tools', difficulty: 2,
      prompt: 'Nennen Sie je **einen Vorteil und einen Nachteil** von kompilierten und interpretierten Sprachen.',
      modelAnswer: 'Kompiliert – Vorteil: hohe Ausführungsgeschwindigkeit; viele Fehler werden schon beim Kompilieren erkannt; Weitergabe ohne Quellcode möglich. Nachteil: Programm muss für jede Plattform neu übersetzt werden; nach jeder Änderung erneut kompilieren. Interpretiert – Vorteil: plattformunabhängig (wo ein Interpreter existiert), schnelle Änderungen ohne Übersetzungsschritt, gut für Skripte und Automatisierung. Nachteil: langsamere Ausführung; Fehler zeigen sich erst zur Laufzeit; Interpreter muss auf dem Zielsystem installiert sein.',
      keywords: ['Geschwindigkeit', 'Plattform', 'Fehler zur Laufzeit', 'Übersetzungsschritt', 'Interpreter installiert'],
      explanation: 'Je ein stichhaltiger Vor- und Nachteil pro Variante.',
    },
    {
      id: 'p05-q007', kind: 'multi', skill: 'qa.tools', difficulty: 1,
      prompt: 'Welche Funktionen bietet eine typische **IDE** (integrierte Entwicklungsumgebung)?',
      options: ['Syntaxhervorhebung und Autovervollständigung', 'Debugger mit Haltepunkten', 'Anbindung an Versionsverwaltung (Git)', 'Automatische Lizenzierung des Betriebssystems', 'Ausführen von Unit-Tests'],
      answer: [0, 1, 2, 4],
      explanation: 'Eine IDE vereint Editor, Compiler/Interpreter, Debugger, Git-Anbindung, Testausführung und Refactoring. Mit Betriebssystem-Lizenzierung hat sie nichts zu tun.',
    },
    {
      id: 'p05-q008', kind: 'match', skill: 'qa.debugging', difficulty: 2,
      prompt: 'Ordne die Debugger-Funktionen ihrer Beschreibung zu.',
      left: ['Breakpoint (Haltepunkt)', 'Step Into', 'Step Over', 'Watch (Überwachung)', 'Call Stack (Aufrufstapel)'],
      right: ['hält die Ausführung an einer bestimmten Zeile an', 'springt in die aufgerufene Funktion hinein', 'führt die nächste Zeile aus, Funktionsaufrufe am Stück', 'zeigt laufend den Wert ausgewählter Variablen', 'zeigt, welche Funktion welche aufgerufen hat'],
      answer: [0, 1, 2, 3, 4],
      explanation: 'Mit Breakpoints und Einzelschritten macht der Debugger einen „automatischen Schreibtischtest“.',
    },
    {
      id: 'p05-q009', kind: 'single', skill: 'qa.debugging', difficulty: 2,
      prompt: 'Ein Fehler tritt in einer Schleife mit 10.000 Durchläufen erst bei `i = 7312` auf. Welches Debugger-Werkzeug hilft am **schnellsten**?',
      options: ['ein bedingter Haltepunkt mit der Bedingung i = 7312', '10.000-mal Step Over', 'den Call Stack ansehen, ohne anzuhalten', 'den Quellcode ausdrucken'],
      answer: 0,
      distractors: {
        '1': { why: 'Das würde sehr lange dauern.', error: 'debugging' },
        '2': { why: 'Den Call Stack sieht man nur, wenn das Programm angehalten ist.', error: 'debugging' },
        '3': { why: 'Ein statischer Blick hilft bei so einem Laufzeitzustand kaum.', error: 'debugging' },
      },
      explanation: 'Ein **bedingter Breakpoint** hält nur an, wenn die Bedingung erfüllt ist – dann kann man Variablen und Zustand genau zum Fehlerzeitpunkt untersuchen.',
    },
    {
      id: 'p05-q010', kind: 'order', skill: 'qa.debugging', difficulty: 2,
      prompt: 'Bringe die Schritte eines **systematischen Debuggings** in eine sinnvolle Reihenfolge.',
      items: ['Fehler reproduzieren (Eingaben, Umgebung festhalten)', 'Fehler eingrenzen (Breakpoints, Logausgaben)', 'Ursache identifizieren', 'Fehler beheben', 'Erneut testen inkl. Regressionstests', 'Änderung dokumentieren und versionieren'],
      explanation: 'Ohne Reproduktion kein sicherer Nachweis, dass die Korrektur wirkt; ohne Regressionstest drohen neue Fehler.',
    },
    {
      id: 'p05-q011', kind: 'text', skill: 'qa.debugging', difficulty: 1,
      prompt: 'Ein Programm bricht ab, weil eine einzulesende Konfigurationsdatei nicht existiert. Um welche **Fehlerart** handelt es sich? (ein Wort)',
      accept: ['Laufzeitfehler', 'Laufzeit-Fehler', 'Runtime-Fehler', 'Runtime Error', 'Ausnahme', 'Exception'],
      misconceptions: [{ answer: 'Syntaxfehler', error: 'fehlerarten', why: 'Der Code ist syntaktisch korrekt – der Fehler entsteht erst während der Ausführung.' }, { answer: 'Logikfehler', error: 'fehlerarten', why: 'Ein Logikfehler liefert falsche Ergebnisse, ohne abzubrechen.' }],
      explanation: '**Laufzeitfehler** (Exception, z. B. FileNotFoundException) – abfangen mit Fehlerbehandlung (try/catch) und verständlicher Meldung.',
    },
    {
      id: 'p05-q012', kind: 'match', skill: 'qa.git', difficulty: 1,
      prompt: 'Ordne die Git-Befehle ihrer Wirkung zu.',
      left: ['git clone', 'git add', 'git commit', 'git push', 'git pull', 'git merge'],
      right: ['entferntes Repository vollständig kopieren', 'Änderung für den nächsten Commit vormerken', 'vorgemerkte Änderungen lokal als Version speichern', 'lokale Commits ins Remote-Repository übertragen', 'Änderungen aus dem Remote holen und einarbeiten', 'einen Zweig in den aktuellen Zweig einarbeiten'],
      answer: [0, 1, 2, 3, 4, 5],
      explanation: 'clone → (ändern) → add → commit → push; pull holt fremde Änderungen; merge führt Zweige zusammen.',
    },
    {
      id: 'p05-q013', kind: 'order', skill: 'qa.git', difficulty: 1,
      prompt: 'Bringe die Git-Schritte in die richtige Reihenfolge: Du willst ein bestehendes Team-Repository auf deinen Rechner holen, eine Datei ändern und die Änderung mit dem Team teilen.',
      items: ['git clone <url>', 'Datei bearbeiten', 'git add <datei>', 'git commit -m "Beschreibung"', 'git push'],
      explanation: 'Erst kopieren, dann ändern, vormerken, lokal speichern und hochladen.',
    },
    {
      id: 'p05-q014', kind: 'free', skill: 'qa.git', difficulty: 2,
      prompt: 'Der Teamleiter fragt, warum die Administrationsskripte der Elektro Krämer GmbH künftig in einem **Git-Repository** gepflegt werden sollen. Nennen und erläutern Sie **drei Vorteile**.',
      modelAnswer: '1. Nachvollziehbarkeit: Jede Änderung ist mit Autor, Zeitpunkt und Beschreibung dokumentiert (wer hat was wann warum geändert). 2. Wiederherstellbarkeit: Fehlerhafte Änderungen lassen sich auf einen früheren funktionierenden Stand zurücksetzen. 3. Teamarbeit: Mehrere Admins können parallel arbeiten (Branches), Änderungen werden zusammengeführt und können per Pull Request geprüft werden (Vier-Augen-Prinzip). Weitere: zentrale, gesicherte Ablage statt verstreuter Kopien; Grundlage für automatisierte Tests/Deployment.',
      keywords: ['Nachvollziehbarkeit', 'Historie', 'Wiederherstellen', 'Teamarbeit', 'Branches', 'Review'],
      explanation: 'Drei Vorteile mit kurzer Erläuterung.',
    },
    {
      id: 'p05-q015', kind: 'single', skill: 'qa.git', difficulty: 2,
      prompt: 'Ein Kollege hat versehentlich eine Datei mit einem **API-Schlüssel** committet und gepusht. Er löscht die Datei im nächsten Commit wieder. Ist das Problem damit gelöst?',
      options: ['Nein – der Schlüssel bleibt in der Historie abrufbar; er muss sofort ungültig gemacht (rotiert) werden.', 'Ja – gelöschte Dateien verschwinden aus Git vollständig.', 'Ja, sofern niemand die Datei geöffnet hat.', 'Nein, aber es reicht, das Repository umzubenennen.'],
      answer: 0,
      distractors: {
        '1': { why: 'Git speichert alle Versionen – auch die mit dem Schlüssel.', error: 'git-geheimnisse' },
        '2': { why: 'Man kann nicht nachweisen, dass niemand den Schlüssel kopiert hat.', error: 'git-geheimnisse' },
        '3': { why: 'Der Inhalt bleibt unverändert zugänglich.', error: 'git-geheimnisse' },
      },
      explanation: 'Die alte Version ist weiterhin in der Historie (und in allen Klonen). Richtig: Schlüssel **sofort widerrufen/erneuern**, ggf. Historie bereinigen, künftig Geheimnisse über einen Secret-Store bzw. `.gitignore` aus dem Repository fernhalten.',
    },
    {
      id: 'p05-q016', kind: 'order', skill: 'qa.testing', difficulty: 1,
      prompt: 'Bringe die Teststufen in die Reihenfolge, in der sie im Projekt üblicherweise durchlaufen werden.',
      items: ['Komponententest (Unit-Test)', 'Integrationstest', 'Systemtest', 'Abnahmetest'],
      explanation: 'Vom Kleinen zum Großen: einzelne Komponenten → Zusammenspiel → Gesamtsystem → Abnahme durch den Kunden.',
    },
    {
      id: 'p05-q017', kind: 'single', skill: 'qa.testing', difficulty: 1,
      prompt: 'Eine Testerin prüft eine Webanwendung **ausschließlich anhand des Pflichtenhefts**, ohne den Quellcode zu kennen. Welches Testverfahren wendet sie an?',
      options: ['Black-Box-Test', 'White-Box-Test', 'Code-Review', 'Anweisungsüberdeckung'],
      answer: 0,
      distractors: {
        '1': { why: 'White-Box-Tests setzen Kenntnis des Quellcodes voraus.', error: 'blackbox-whitebox' },
        '2': { why: 'Ein Code-Review ist ein statischer Test **am Quellcode**.', error: 'blackbox-whitebox' },
        '3': { why: 'Anweisungsüberdeckung ist ein White-Box-Maß.', error: 'blackbox-whitebox' },
      },
      explanation: 'Grundlage Spezifikation, Code unbekannt → **Black-Box-Test**.',
    },
    {
      id: 'p05-q018', kind: 'multi', skill: 'qa.testing', difficulty: 2,
      prompt: 'Welche Verfahren gehören zum **White-Box-Test**?',
      options: ['Anweisungsüberdeckung (C0)', 'Zweigüberdeckung (C1)', 'Äquivalenzklassenbildung', 'Grenzwertanalyse', 'Pfadüberdeckung'],
      answer: [0, 1, 4],
      explanation: 'Überdeckungsmaße beziehen sich auf die **Codestruktur** → White-Box. Äquivalenzklassen und Grenzwerte werden aus der Spezifikation abgeleitet → Black-Box.',
    },
    {
      id: 'p05-q019', kind: 'number', skill: 'qa.testing', difficulty: 2,
      prompt: `Wie viele Testfälle sind **mindestens** nötig, um für folgenden Code eine **Anweisungsüberdeckung (C0)** zu erreichen?\n\n${F}\nEINGABE menge\nversand ← 4.90\nWENN menge > 10 DANN\n  versand ← 0\nENDE WENN\nAUSGABE versand\n${F}`,
      answer: 1,
      misconceptions: [{ answer: '2', error: 'ueberdeckung-c0-c1', why: '2 Testfälle braucht man für die **Zweigüberdeckung (C1)**. Für C0 reicht ein Testfall mit menge > 10 – dabei werden alle Anweisungen ausgeführt.' }],
      explanation: 'Mit z. B. menge = 20 werden **alle** Anweisungen ausgeführt (auch `versand ← 0`) → **1** Testfall genügt für C0.',
    },
    {
      id: 'p05-q020', kind: 'number', skill: 'qa.testing', difficulty: 3,
      prompt: `Wie viele Testfälle sind **mindestens** nötig, um für folgenden Code eine **Zweigüberdeckung (C1)** zu erreichen?\n\n${F}\nEINGABE temperatur\nWENN temperatur > 30 DANN\n  AUSGABE "Alarm"\nENDE WENN\nWENN temperatur < 15 DANN\n  AUSGABE "Heizung prüfen"\nENDE WENN\n${F}`,
      answer: 2,
      hints: ['Jede Verzweigung hat einen WAHR- und einen FALSCH-Zweig.', 'Ein Testfall durchläuft beide Verzweigungen nacheinander.'],
      misconceptions: [{ answer: '4', error: 'ueberdeckung-c0-c1', why: 'Ein Testfall deckt in beiden Verzweigungen je einen Zweig ab. Z. B. 35 (WAHR, FALSCH) und 10 (FALSCH, WAHR) genügen.' }, { answer: '3', error: 'ueberdeckung-c0-c1', why: 'Zwei Testfälle reichen: 35 deckt „> 30 WAHR“ und „< 15 FALSCH“ ab, 10 deckt „> 30 FALSCH“ und „< 15 WAHR“ ab.' }],
      explanation: '4 Zweige: (>30 W), (>30 F), (<15 W), (<15 F). Testfall 35 → W, F; Testfall 10 → F, W → alle 4 Zweige mit **2** Testfällen.',
    },
    {
      id: 'p05-q021', kind: 'free', skill: 'qa.testing', difficulty: 2,
      prompt: 'Erläutern Sie den Unterschied zwischen **statischen** und **dynamischen** Tests und nennen Sie je ein Beispiel.',
      modelAnswer: 'Statische Tests prüfen ein Programm, ohne es auszuführen – z. B. Code-Review (Kollegen lesen den Code), Schreibtischtest oder statische Codeanalyse durch ein Werkzeug (Linter). Dynamische Tests führen das Programm mit Testdaten aus und vergleichen das tatsächliche mit dem erwarteten Ergebnis – z. B. Unit-Test einer Funktion, Systemtest, Lasttest.',
      keywords: ['ohne Ausführung', 'mit Ausführung', 'Code-Review', 'Schreibtischtest', 'Testdaten', 'Soll-Ist-Vergleich'],
      explanation: 'Kern: ausgeführt oder nicht – plus passende Beispiele.',
    },
    {
      id: 'p05-q022', kind: 'single', skill: 'qa.testing', difficulty: 1,
      prompt: 'Nach der Fehlerkorrektur in der Rechnungsfunktion lässt das Team **alle bisherigen automatisierten Tests erneut** laufen. Wie nennt man das?',
      options: ['Regressionstest', 'Abnahmetest', 'Lasttest', 'Code-Review'],
      answer: 0,
      distractors: {
        '1': { why: 'Der Abnahmetest erfolgt durch den Kunden gegen seine Anforderungen.', error: 'testbegriffe' },
        '2': { why: 'Ein Lasttest prüft das Verhalten unter hoher Belastung.', error: 'testbegriffe' },
        '3': { why: 'Ein Review ist ein statischer Test ohne Ausführung.', error: 'testbegriffe' },
      },
      explanation: '**Regressionstest:** Sicherstellen, dass eine Änderung keine bereits funktionierenden Teile beschädigt hat.',
    },
    {
      id: 'p05-q023', kind: 'table', skill: 'qa.equivalence', difficulty: 2,
      prompt: '**Beleg – Auszug Pflichtenheft Urlaubsantrag:** *„Im Feld Urlaubstage können Werte von 0,5 bis 30 Tage in Schritten von 0,5 Tagen eingegeben werden.“* Bestimme die vier Grenzwerte für den Test.',
      columns: [{ key: 'wert', label: 'Testwert (Tage)', type: 'number' }],
      rows: [
        { label: 'größter ungültiger Wert unterhalb', cells: { wert: { answer: '0' } } },
        { label: 'kleinster gültiger Wert', cells: { wert: { answer: '0.5' } } },
        { label: 'größter gültiger Wert', cells: { wert: { answer: '30' } } },
        { label: 'kleinster ungültiger Wert oberhalb', cells: { wert: { answer: '30.5' } } },
      ],
      misconceptions: [{ cell: '3:wert', answer: '31', error: 'grenzwert-schrittweite', why: 'Die Schrittweite ist 0,5 – der direkte ungültige Nachbar von 30 ist 30,5.' }, { cell: '0:wert', answer: '-0.5', error: 'grenzwert-schrittweite', why: 'Unterhalb von 0,5 ist der direkte Nachbar 0 (Schrittweite 0,5).' }],
      explanation: 'Schrittweite 0,5 → Grenzwerte **0** | **0,5** … **30** | **30,5**. Zusätzliche ungültige Klassen: 2,3 (kein Vielfaches von 0,5), Text, leer.',
    },
    {
      id: 'p05-q024', kind: 'number', skill: 'qa.equivalence', difficulty: 2,
      prompt: 'Für eine ganzzahlige **Bestellmenge** gilt: zulässig 1 bis 500; 1–9 Stück kein Rabatt, 10–99 Stück 3 % Rabatt, 100–500 Stück 6 % Rabatt. Wie viele **Äquivalenzklassen** ergeben sich, wenn nur **ganzzahlige** Eingaben betrachtet werden?',
      answer: 5,
      hints: ['Gültige Klassen: eine je Rabattstufe.', 'Ungültig: zu klein und zu groß.'],
      misconceptions: [{ answer: '3', error: 'aequivalenzklassen-ungueltig', why: 'Die ungültigen Klassen (≤ 0 und ≥ 501) gehören dazu.' }, { answer: '4', error: 'aequivalenzklassen-ungueltig', why: 'Es gibt zwei ungültige Klassen: unterhalb und oberhalb.' }],
      explanation: 'Gültig: 1–9, 10–99, 100–500 (3) + ungültig: ≤ 0, ≥ 501 (2) = **5**. (Mit nicht-ganzzahligen Eingaben käme eine weitere ungültige Klasse hinzu.)',
    },
    {
      id: 'p05-q025', kind: 'free', skill: 'qa.equivalence', difficulty: 2,
      prompt: 'Erläutern Sie die Testverfahren **Äquivalenzklassenbildung** und **Grenzwertanalyse** und begründen Sie, warum man sie kombiniert.',
      modelAnswer: 'Bei der Äquivalenzklassenbildung werden alle möglichen Eingaben in Klassen eingeteilt, für die sich das Programm laut Spezifikation gleich verhält (gültige und ungültige Klassen). Aus jeder Klasse wird mindestens ein Repräsentant getestet – so wird mit wenigen Testfällen der ganze Eingaberaum abgedeckt. Die Grenzwertanalyse ergänzt das, indem gezielt Werte an und direkt neben den Klassengrenzen getestet werden, weil dort besonders häufig Fehler entstehen (z. B. > statt ≥ oder Off-by-one). Die Kombination liefert wenige, aber sehr wirksame Testfälle. Beide sind Black-Box-Verfahren.',
      keywords: ['gleiches Verhalten', 'Repräsentant', 'gültig/ungültig', 'Grenzen', 'Off-by-one', 'Black-Box'],
      explanation: 'Definition beider Verfahren + Begründung (Effizienz und typische Fehler an Grenzen).',
    },
    {
      id: 'p05-q026', kind: 'multi', skill: 'qa.secdesign', difficulty: 2,
      prompt: 'Welche Maßnahmen entsprechen den Prinzipien von **Security by Design**?',
      options: ['Der Datenbankbenutzer der Web-App erhält nur die Rechte, die die Anwendung benötigt.', 'Alle Benutzereingaben werden auf Typ, Länge und Format geprüft.', 'Das System wird mit dem Standardpasswort „admin“ ausgeliefert, damit die Einrichtung einfacher ist.', 'Die Sicherheit beruht darauf, dass niemand den Quellcode kennt.', 'Fehlermeldungen zeigen dem Benutzer keine internen Details wie Stacktraces.'],
      answer: [0, 1, 4],
      explanation: 'Least Privilege, Eingabevalidierung und sicheres Fehlerverhalten sind Security-by-Design-Prinzipien. Standardpasswörter widersprechen „Secure Defaults“; „Security by Obscurity“ ist kein wirksamer Schutz.',
    },
    {
      id: 'p05-q027', kind: 'free', skill: 'qa.secdesign', difficulty: 2,
      prompt: 'Erläutern Sie **Privacy by Design** und **Privacy by Default** (Art. 25 DSGVO) und nennen Sie für eine geplante **Kundendatenbank** je zwei konkrete Maßnahmen.',
      modelAnswer: 'Privacy by Design (Datenschutz durch Technikgestaltung): Datenschutz wird schon bei Planung und Entwicklung durch technische und organisatorische Maßnahmen eingebaut. Beispiele: nur die für den Zweck nötigen Felder vorsehen (Datenminimierung), Verschlüsselung sensibler Daten, Pseudonymisierung für Auswertungen, Rollen- und Berechtigungskonzept, Löschkonzept mit Fristen. Privacy by Default (datenschutzfreundliche Voreinstellungen): Ohne Zutun der betroffenen Person werden nur die erforderlichen Daten verarbeitet. Beispiele: Newsletter-Einwilligung standardmäßig nicht angehakt, optionale Felder (z. B. Geburtsdatum) nicht als Pflichtfelder, Sichtbarkeit von Kundendaten standardmäßig nur für den zuständigen Vertrieb.',
      keywords: ['Art. 25 DSGVO', 'Technikgestaltung', 'Voreinstellungen', 'Datenminimierung', 'Verschlüsselung/Pseudonymisierung', 'Opt-in'],
      explanation: 'Unterscheidung: Gestaltung (by Design) vs. Voreinstellungen (by Default), jeweils mit konkreten Maßnahmen.',
    },
    {
      id: 'p05-q028', kind: 'single', skill: 'qa.secdesign', difficulty: 2,
      prompt: 'Wie sollten Passwörter von Benutzern in einer selbst entwickelten Anwendung gespeichert werden?',
      options: ['als Hash mit individuellem Salt über ein langsames Verfahren wie Argon2 oder bcrypt', 'im Klartext in einer gut geschützten Tabelle', 'mit AES verschlüsselt, damit der Support sie bei Bedarf entschlüsseln kann', 'als einfacher MD5-Hash ohne Salt'],
      answer: 0,
      distractors: {
        '1': { why: 'Bei einem Datenleck wären alle Passwörter sofort lesbar.', error: 'passwort-speicherung' },
        '2': { why: 'Verschlüsselung ist umkehrbar – wer den Schlüssel erbeutet, hat alle Passwörter. Passwörter muss niemand entschlüsseln können.', error: 'passwort-speicherung' },
        '3': { why: 'MD5 ist sehr schnell und ohne Salt anfällig für Rainbow-Tables und Brute Force.', error: 'passwort-speicherung' },
      },
      explanation: 'Passwörter werden **gehasht** (nicht umkehrbar) mit **Salt** (gegen vorberechnete Tabellen) und einem **absichtlich langsamen** Verfahren (Argon2, bcrypt, PBKDF2). Bei der Anmeldung wird das eingegebene Passwort genauso gehasht und verglichen.',
    },
    {
      id: 'p05-q029', kind: 'single', skill: 'qa.secdesign', difficulty: 2,
      prompt: 'Welche Maßnahme schützt am wirksamsten vor **SQL-Injection**?',
      options: ['Prepared Statements (parametrisierte Abfragen)', 'die Datenbank auf einem anderen Port betreiben', 'SQL-Befehle in Großbuchstaben schreiben', 'Benutzereingaben direkt in den SQL-String einfügen und anschließend loggen'],
      answer: 0,
      distractors: {
        '1': { why: 'Ein anderer Port ändert nichts an der eingeschleusten Abfrage.', error: 'sql-injection' },
        '2': { why: 'Die Schreibweise der Befehle ist für die Sicherheit irrelevant.', error: 'sql-injection' },
        '3': { why: 'Genau das ermöglicht SQL-Injection.', error: 'sql-injection' },
      },
      explanation: 'Bei **Prepared Statements** werden Befehl und Daten getrennt an die Datenbank übergeben – Eingaben können nie als SQL-Code interpretiert werden. Ergänzend: Eingabevalidierung und minimale Rechte des DB-Benutzers.',
    },
    {
      id: 'p05-q030', kind: 'match', skill: 'ai.basics', difficulty: 1,
      prompt: 'Ordne die KI-Begriffe ihrer Erklärung zu.',
      left: ['Maschinelles Lernen', 'Großes Sprachmodell (LLM)', 'Prompt', 'Halluzination', 'Bias', 'Inferenz'],
      right: ['System lernt Muster aus Daten statt fest programmierter Regeln', 'auf großen Textmengen trainiertes Modell, das Text Token für Token erzeugt', 'Eingabe bzw. Anweisung an ein generatives KI-System', 'plausibel klingende, aber falsche Ausgabe', 'systematische Verzerrung durch einseitige Trainingsdaten', 'Nutzung des fertig trainierten Modells zur Beantwortung einer Anfrage'],
      answer: [0, 1, 2, 3, 4, 5],
      explanation: 'Diese Grundbegriffe solltest du sicher erklären können.',
    },
    {
      id: 'p05-q031', kind: 'multi', skill: 'ai.workplace', difficulty: 2,
      prompt: 'Ein Auszubildender möchte einen **öffentlichen, vom Betrieb nicht freigegebenen** KI-Chatbot nutzen. Welche Eingaben sind **unbedenklich**?',
      options: ['„Erkläre mir den Unterschied zwischen TCP und UDP.“', 'eine Liste mit Namen, E-Mail-Adressen und Gehältern der Kollegen zum Formatieren', 'ein Skript mit eingetragenem Domänen-Admin-Passwort zur Fehlersuche', '„Formuliere eine höfliche Absage für einen Termin, ohne Namen zu nennen.“', 'der Netzplan des Standorts Hamburg mit allen IP-Adressen'],
      answer: [0, 3],
      explanation: 'Allgemeine Wissensfragen und Formulierungshilfen ohne Personen- oder Firmenbezug sind unproblematisch. Personenbezogene Daten, Zugangsdaten und interne Netzinformationen gehören **nie** in nicht freigegebene Dienste (Datenschutz, Geschäftsgeheimnisse, IT-Sicherheit).',
    },
    {
      id: 'p05-q032', kind: 'free', skill: 'ai.workplace', difficulty: 2,
      prompt: 'Die Geschäftsführung der Elektro Krämer GmbH überlegt, generative KI im IT-Support einzusetzen. Nennen und erläutern Sie **je zwei Chancen und zwei Risiken**.',
      modelAnswer: 'Chancen: 1. Zeitersparnis – Tickets werden automatisch klassifiziert und Lösungsvorschläge aus der Wissensdatenbank erstellt, sodass Mitarbeiter schneller antworten. 2. Bessere Dokumentation – KI fasst Lösungen zusammen und formuliert Anleitungen verständlich; auch Skriptvorschläge beschleunigen Routinearbeiten. Risiken: 1. Halluzinationen – falsche Lösungsvorschläge oder Befehle können Schäden verursachen, deshalb müssen Ergebnisse geprüft werden. 2. Datenschutz/Vertraulichkeit – Tickets enthalten personenbezogene und interne Daten; bei externen Diensten sind Auftragsverarbeitungsvertrag, Rechtsgrundlage und ggf. Drittlandtransfer zu klären. Weitere Risiken: Abhängigkeit vom Anbieter, Kosten, Akzeptanz, Pflicht zur Schulung (KI-Kompetenz nach Art. 4 AI Act).',
      keywords: ['Zeitersparnis', 'Dokumentation', 'Halluzination', 'Datenschutz', 'AV-Vertrag', 'prüfen'],
      explanation: 'Zwei konkrete Chancen und zwei Risiken, jeweils kurz erläutert und auf den IT-Support bezogen.',
    },
    {
      id: 'p05-q033', kind: 'single', skill: 'ai.workplace', difficulty: 2,
      prompt: 'Ein Online-Shop setzt einen **KI-Chatbot** für Kundenanfragen ein. Welche Pflicht ergibt sich nach der EU-KI-Verordnung (AI Act) typischerweise?',
      options: ['Transparenzpflicht: Kunden müssen erkennen können, dass sie mit einer KI kommunizieren.', 'Der Einsatz ist grundsätzlich verboten.', 'Es gelten keinerlei Pflichten.', 'Der Chatbot muss von einer Behörde vorab genehmigt werden.'],
      answer: 0,
      distractors: {
        '1': { why: 'Verboten sind nur Praktiken mit unannehmbarem Risiko (z. B. Social Scoring).', error: 'ai-act-risikostufen' },
        '2': { why: 'Chatbots fallen unter „begrenztes Risiko“ mit Transparenzpflichten.', error: 'ai-act-risikostufen' },
        '3': { why: 'Eine behördliche Vorabgenehmigung ist für Chatbots nicht vorgesehen.', error: 'ai-act-risikostufen' },
      },
      explanation: 'Chatbots haben ein **begrenztes Risiko** → **Transparenzpflicht** (Art. 50 AI Act): Nutzer müssen informiert werden, dass sie mit einem KI-System interagieren (sofern nicht offensichtlich).',
    },
    {
      id: 'p05-q034', kind: 'match', skill: 'ai.workplace', difficulty: 3,
      prompt: 'Ordne die KI-Anwendungen der jeweiligen **Risikostufe des AI Act** zu.',
      left: ['Bewertung von Bürgern durch eine Behörde nach ihrem Sozialverhalten (Social Scoring)', 'KI, die Bewerbungen vorsortiert und Kandidaten ablehnt', 'Chatbot auf der Firmenwebsite', 'Spamfilter im E-Mail-Programm'],
      right: ['unannehmbares Risiko (verboten)', 'hohes Risiko', 'begrenztes Risiko (Transparenzpflicht)', 'minimales Risiko'],
      answer: [0, 1, 2, 3],
      explanation: 'Social Scoring → verboten · Personalauswahl → Hochrisiko (Anhang III) · Chatbot → Transparenz · Spamfilter → minimal.',
    },
    {
      id: 'p05-q035', kind: 'free', skill: 'ai.workplace', difficulty: 3,
      prompt: 'Ein Kollege hat sich von einer KI ein PowerShell-Skript zum **Löschen alter Benutzerprofile** erstellen lassen und will es direkt auf allen Clients ausführen. Beschreiben Sie, wie Sie vorgehen, bevor das Skript produktiv eingesetzt wird (mindestens vier Schritte).',
      modelAnswer: '1. Skript lesen und verstehen (jede Zeile, besonders Lösch- und Filterbedingungen) – KI kann halluzinierte Parameter oder falsche Pfade erzeugen. 2. Code-Review durch eine zweite Person (Vier-Augen-Prinzip). 3. Testlauf ohne Wirkung, z. B. mit -WhatIf, und Test auf einem einzelnen Test-Client bzw. in einer Testumgebung mit Backup. 4. Grenzfälle testen (z. B. aktuell angemeldeter Benutzer, Administratorprofile, Profile knapp über/unter dem Altersgrenzwert). 5. Skript in der Versionsverwaltung ablegen und dokumentieren. 6. Freigabe einholen und schrittweise ausrollen, Ergebnis überwachen (Logging). Außerdem prüfen, ob beim Erstellen keine personenbezogenen oder internen Daten an den KI-Dienst gegeben wurden.',
      keywords: ['verstehen', 'Review', '-WhatIf', 'Testumgebung', 'Backup', 'Grenzfälle', 'Versionsverwaltung', 'schrittweise'],
      explanation: 'KI-Code wird behandelt wie Code eines unbekannten Dritten: prüfen, testen, dokumentieren, kontrolliert einführen.',
    },
    {
      id: 'p05-q036', kind: 'single', skill: 'ai.basics', difficulty: 2,
      prompt: 'Ein Spamfilter wird mit **10.000 E-Mails trainiert, die jeweils als „Spam“ oder „kein Spam“ markiert sind**. Um welche Art des maschinellen Lernens handelt es sich?',
      options: ['überwachtes Lernen', 'unüberwachtes Lernen', 'bestärkendes Lernen', 'regelbasierte Programmierung ohne Lernen'],
      answer: 0,
      distractors: {
        '1': { why: 'Beim unüberwachten Lernen gibt es keine vorgegebenen Beschriftungen.', error: 'ml-arten' },
        '2': { why: 'Bestärkendes Lernen arbeitet mit Belohnungen für Aktionen.', error: 'ml-arten' },
        '3': { why: 'Das Modell lernt aus Beispielen, statt feste Regeln zu erhalten.', error: 'ml-arten' },
      },
      explanation: 'Beschriftete Trainingsdaten (Eingabe + richtige Antwort) → **überwachtes Lernen** (Klassifikation).',
    },
    {
      id: 'p05-q037', kind: 'text', skill: 'ai.workplace', difficulty: 2,
      prompt: 'Seit dem 2. Februar 2025 müssen Unternehmen, die KI-Systeme einsetzen, nach Art. 4 AI Act sicherstellen, dass ihre Beschäftigten über ausreichende … verfügen. Ergänze den Begriff (ein Wort, Bindestrich erlaubt).',
      accept: ['KI-Kompetenz', 'KI Kompetenz', 'KI-Kompetenzen', 'AI Literacy', 'KI-Kenntnisse'],
      explanation: 'Art. 4 AI Act verlangt **KI-Kompetenz** (AI Literacy) – z. B. durch Schulungen zu Funktionsweise, Grenzen und Risiken der eingesetzten KI.',
    },
    {
      id: 'p05-q038', kind: 'free', skill: 'qa.secdesign', difficulty: 3,
      prompt: '**Handlungssituation:** Für die Elektro Krämer GmbH wird eine Web-App zur **Erfassung von Arbeitszeiten** entwickelt (Mitarbeiter buchen Kommen/Gehen, Vorgesetzte genehmigen Überstunden). Sie sollen im Planungsmeeting Anforderungen aus **Security by Design** und **Privacy by Design** einbringen. Nennen Sie insgesamt **sechs** konkrete Anforderungen.',
      modelAnswer: 'Security by Design: 1. Anmeldung über das zentrale Firmenkonto (SSO) mit MFA, keine eigenen Standardpasswörter. 2. Rollen- und Rechtekonzept nach Least Privilege: Mitarbeiter sehen nur eigene Zeiten, Vorgesetzte nur ihr Team, Personalabteilung alle. 3. Ausschließlich HTTPS/TLS, Prepared Statements für Datenbankzugriffe, Eingabevalidierung aller Zeitangaben. 4. Protokollierung sicherheitsrelevanter Ereignisse (Anmeldungen, Änderungen an Buchungen) und regelmäßige Updates der eingesetzten Bibliotheken. Privacy by Design/Default: 5. Datenminimierung: nur die für die Zeiterfassung nötigen Daten (keine Standortverfolgung per GPS, sofern nicht erforderlich). 6. Lösch- und Aufbewahrungskonzept nach gesetzlichen Fristen; Auswertungen für die Geschäftsführung nur aggregiert/pseudonymisiert; datenschutzfreundliche Voreinstellungen; Einbindung des Datenschutzbeauftragten und ggf. des Betriebsrats.',
      keywords: ['MFA', 'Least Privilege/Rollen', 'TLS', 'Prepared Statements', 'Protokollierung', 'Datenminimierung', 'Löschkonzept', 'Pseudonymisierung'],
      explanation: 'Gute Antworten sind konkret auf die App bezogen und decken beide Bereiche ab (je etwa drei Anforderungen).',
    },
    {
      id: 'p05-q039', kind: 'order', skill: 'qa.tools', difficulty: 1,
      prompt: 'Bringe die Schritte vom Quellcode zum laufenden Programm (kompilierte Sprache wie C) in die richtige Reihenfolge.',
      items: ['Quellcode schreiben', 'Compiler übersetzt in Objektcode', 'Linker bindet Objektdateien und Bibliotheken', 'ausführbare Datei (.exe) liegt vor', 'Betriebssystem lädt das Programm in den Arbeitsspeicher und führt es aus'],
      hints: ['Der Linker braucht die Ergebnisse des Compilers.'],
      explanation: 'Quellcode → **Compiler** (Objektcode) → **Linker** (verbindet mit Bibliotheken) → ausführbare Datei → Laden und Ausführen. Syntaxfehler meldet der Compiler, fehlende Funktionen der Linker.',
    },
    {
      id: 'p05-q040', kind: 'match', skill: 'qa.debugging', difficulty: 2,
      prompt: 'Ordne die Debugging-Begriffe ihrer Bedeutung zu.',
      left: ['bedingter Haltepunkt', 'Step Into', 'Watch (Überwachung)', 'Just-in-time-Debugging', 'Edit and Continue'],
      right: ['Programm hält nur an, wenn eine Bedingung erfüllt ist', 'in die aufgerufene Funktion hineinspringen', 'aktuelle Werte ausgewählter Variablen anzeigen', 'beim Absturz eines Programms nachträglich einen Debugger anhängen', 'Code während einer angehaltenen Debug-Sitzung ändern und ohne Neustart weiterlaufen'],
      answer: [0, 1, 2, 3, 4],
      explanation: 'Häufige Verwechslung: Just-in-time-Debugging ist **nicht** das Ändern von Code im laufenden Debuggen (das ist Edit and Continue), sondern das Anhängen eines Debuggers im Moment des Absturzes.',
    },
    {
      id: 'p05-q041', kind: 'number', skill: 'qa.debugging', difficulty: 2,
      prompt: `In Zeile 4 wird ein **bedingter Haltepunkt** mit der Bedingung \`summe > 100\` gesetzt. Welchen Wert hat \`i\`, wenn der Debugger **zum ersten Mal** anhält?\n\n${F}\n1  summe ← 0\n2  FÜR i VON 1 BIS 50\n3    summe ← summe + i\n4    AUSGABE summe\n5  ENDE FÜR\n${F}`,
      answer: 14,
      hints: ['summe ist nach i Durchläufen 1 + 2 + … + i.', 'Bei i = 13 ist summe = 91.'],
      misconceptions: [
        { answer: '13', error: 'debugging', why: 'Bei i = 13 ist summe = 91 – noch nicht > 100. Erst bei i = 14 ist summe = 105.' },
        { answer: '105', error: 'variable-verwechselt', why: '105 ist der Wert von summe. Gefragt ist i.' },
      ],
      explanation: 'summe nach Zeile 3: i = 12 → 78, i = 13 → 91, i = 14 → **105** > 100. Der Debugger hält also erstmals bei **i = 14** (summe = 105) in Zeile 4 an.',
    },
    {
      id: 'p05-q042', kind: 'free', skill: 'qa.secdesign', difficulty: 2,
      prompt: 'Die Zeiterfassung der Elektro Krämer GmbH prüft Berechtigungen über einen zentralen Server. Ein Entwickler schlägt vor: „Wenn der Berechtigungsserver nicht erreichbar ist, lassen wir alle Benutzer mit vollen Rechten weiterarbeiten.“ Beurteilen Sie den Vorschlag.',
      modelAnswer: 'Der Vorschlag widerspricht dem Prinzip des sicheren Ausfalls (fail secure, sichere Standardwerte). Fällt die Prüfung aus, muss das System in den sicheren Zustand gehen und den Zugriff verweigern bzw. höchstens auf ungefährliche Funktionen beschränken. Sonst könnte ein Angreifer den Berechtigungsserver gezielt stören (z. B. per DoS) und erhielte volle Rechte; auch normale Benutzer bekämen Rechte, die ihnen nicht zustehen (Verletzung von Vertraulichkeit und Integrität). Besser: Zugriff verweigern, verständliche Meldung anzeigen, Ausfall protokollieren und Administratoren alarmieren; für die Verfügbarkeit den Berechtigungsdienst redundant auslegen.',
      keywords: ['fail secure', 'Zugriff verweigern', 'Angreifer provoziert Ausfall', 'protokollieren/alarmieren', 'Redundanz'],
      hints: ['Was würde ein Angreifer tun, wenn er diese Regel kennt?'],
      explanation: 'Kern: Im Fehlerfall verweigern statt erlauben. Verfügbarkeit erreicht man durch Redundanz, nicht durch das Abschalten der Sicherheit.',
    },
    {
      id: 'p05-q043', kind: 'table', skill: 'qa.secdesign', difficulty: 2,
      prompt: 'Entscheide für jedes Datum, ob es im **Sicherheitsprotokoll** (Log) einer Webanwendung gespeichert werden soll: **ja** oder **nein**.',
      columns: [{ key: 'log', label: 'protokollieren?', type: 'text' }],
      rows: [
        { label: 'fehlgeschlagene Anmeldung mit Benutzername, Zeitstempel und IP-Adresse', cells: { log: { answer: 'ja', accept: ['j'] } } },
        { label: 'das falsch eingegebene Passwort', cells: { log: { answer: 'nein', accept: ['n'] } } },
        { label: 'Änderung der Rechte eines Benutzerkontos durch einen Administrator', cells: { log: { answer: 'ja', accept: ['j'] } } },
        { label: 'vollständige Kreditkartennummer einer Bestellung', cells: { log: { answer: 'nein', accept: ['n'] } } },
        { label: 'Sitzungs-Token (Session-ID) des angemeldeten Benutzers', cells: { log: { answer: 'nein', accept: ['n'] } } },
        { label: 'Änderung der Firewall-Konfiguration', cells: { log: { answer: 'ja', accept: ['j'] } } },
      ],
      misconceptions: [
        { cell: '1:log', answer: 'ja', error: 'protokollierung-daten', why: 'Passwörter – auch falsche – gehören nie ins Log: Oft ist es nur ein Tippfehler des echten Passworts.' },
        { cell: '4:log', answer: 'ja', error: 'protokollierung-daten', why: 'Mit einem Sitzungs-Token könnte jeder Log-Leser die Sitzung übernehmen.' },
      ],
      hints: ['Protokolliert wird, **wer was wann** getan hat – nicht die Geheimnisse selbst.'],
      explanation: 'ja: Fehlversuche, Rechteänderungen, Konfigurationsänderungen (sicherheitsrelevante Ereignisse mit Zeitstempel und Benutzer). nein: Passwörter, vollständige Zahlungsdaten, Sitzungs-Token – sie würden das Log selbst zu einem lohnenden Angriffsziel machen und widersprechen der Datenminimierung.',
    },
    {
      id: 'p05-q044', kind: 'match', skill: 'qa.secdesign', difficulty: 2,
      prompt: 'Ordne jedem Sicherheitsprinzip das passende Beispiel zu.',
      left: ['Sicherer Ausfall (fail secure)', 'Berechtigungstrennung (Vier-Augen-Prinzip)', 'Vollständige Zugriffsüberwachung', 'Benutzerfreundliche Sicherheit', 'Minimale Rechte (Least Privilege)'],
      right: ['bei einem Fehler in der Rechteprüfung wird der Zugriff verweigert', 'eine Überweisung über 10.000 € muss eine zweite Person freigeben', 'die Anwendung prüft die Berechtigung bei jedem Aufruf, nicht nur beim Login', 'Single Sign-on mit MFA statt fünf verschiedener Passwörter', 'das Datenbankkonto der Web-App darf nur lesen und schreiben, aber keine Tabellen löschen'],
      answer: [0, 1, 2, 3, 4],
      explanation: 'fail secure = im Fehlerfall verweigern · Berechtigungstrennung = kritische Aktion braucht zwei · vollständige Zugriffsüberwachung = jeder Zugriff wird geprüft · benutzerfreundlich = Sicherheit, die nicht umgangen wird · Least Privilege = nur nötige Rechte.',
    },
  ],
};
