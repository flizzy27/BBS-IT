import type { Module } from '../types';

export const w05: Module = {
  id: 'w05',
  nr: 5,
  area: 'wirtschaft',
  title: 'Projekt & Leistungsübergabe',
  short: 'Projekte planen (magisches Dreieck, Phasen, Gantt, Netzplan), Kunden einweisen, Leistungen abnehmen lassen, Rechnung stellen und Zufriedenheit sichern.',
  icon: 'ClipboardCheck',
  relevance: 'ap1-teilweise',
  prerequisites: ['w01'],
  generators: ['w.netzplan', 'w.gantt', 'w.projekttermin'],
  skills: [
    { id: 'w.projekt', module: 'w05', title: 'Projektbegriff und magisches Dreieck' },
    { id: 'w.phasen', module: 'w05', title: 'Projektphasen, Projektstrukturplan, Meilensteine', requires: ['w.projekt'] },
    { id: 'w.projektorga', module: 'w05', title: 'Projektorganisation: Machbarkeit, Stakeholder, RACI, Teamphasen', requires: ['w.projekt'] },
    { id: 'w.netzplan', module: 'w05', title: 'Gantt-Diagramm und Netzplan', requires: ['w.phasen'] },
    { id: 'w.gantt', module: 'w05', title: 'Gantt-Diagramm lesen, zeichnen und ergänzen', requires: ['w.netzplan'] },
    { id: 'w.projekttermin', module: 'w05', title: 'Termine im Kalender und Projektverkürzung', requires: ['w.netzplan'] },
    { id: 'w.abnahme', module: 'w05', title: 'Einweisung, Abnahme und Übergabe', requires: ['w.lastenheft'] },
    { id: 'w.rechnung', module: 'w05', title: 'Rechnung: Pflichtangaben und E-Rechnung', requires: ['w.umsatzsteuer'] },
    { id: 'w.zufriedenheit', module: 'w05', title: 'Nachkalkulation, Kundenzufriedenheit, Projektabschluss' },
  ],
  lessons: [
    /* ------------------------------------------------------------ */
    {
      id: 'w05-l01',
      title: 'Was ist ein Projekt? Das magische Dreieck',
      minutes: 15,
      relevance: 'ap1-teilweise',
      skills: ['w.projekt'],
      simple: `Ein Projekt ist wie eine Geburtstagsfeier planen: Es passiert **einmal**, hat einen **festen Termin**, ein **Ziel** (alle haben Spaß) und ein **begrenztes Budget**. Den Müll rausbringen ist dagegen Routine – das macht man jede Woche gleich. Bei jeder Feier ziehen drei Dinge aneinander: **wie schön** sie wird (Leistung), **wann** sie fertig vorbereitet ist (Zeit) und **was** sie kostet (Kosten). Willst du alles früher fertig haben, brauchst du mehr Helfer (teurer) oder lässt etwas weg. Dieses Dreieck heißt **magisches Dreieck**.

**Merke:** Projekt = einmalig, befristet, mit Ziel und begrenzten Mitteln; Leistung, Zeit und Kosten hängen immer zusammen.`,
      steps: [
        {
          type: 'explain',
          title: 'Projekt oder Routine?',
          body: `Nach **DIN 69901-5** ist ein Projekt ein Vorhaben, das im Wesentlichen durch die **Einmaligkeit der Bedingungen in ihrer Gesamtheit** gekennzeichnet ist. Typische Merkmale:

| Merkmal | Beispiel „Rollout von 40 neuen Arbeitsplätzen in Berlin“ |
|---|---|
| **einmalig** | Diese Kombination aus Standort, Hardware, Terminen und Team gibt es nur einmal |
| **zeitlich begrenzt** | Start 01.03., Ende 30.04. |
| **klares Ziel** | 40 einsatzbereite Arbeitsplätze, Altgeräte datenschutzgerecht entsorgt |
| **begrenzte Ressourcen** | Budget 60.000 €, 3 Techniker |
| **komplex / fachübergreifend** | IT, Einkauf, Fachabteilung, Datenschutz, Betriebsrat |
| **eigene Organisation** | Projektleitung, Projektteam, Auftraggeber |

**Kein Projekt** ist Routinearbeit: das tägliche Backup prüfen, ein Passwort zurücksetzen, den Toner wechseln.

**Das magische Dreieck** beschreibt die drei konkurrierenden Zielgrößen jedes Projekts:

- **Leistung / Qualität** (Was soll erreicht werden? Umfang und Güte)
- **Zeit** (Termine, Dauer)
- **Kosten** (Budget, Ressourcen)

„Magisch“, weil man nicht alle drei gleichzeitig optimieren kann: Verändert sich eine Größe, wirkt das auf die anderen. *Beispiel:* Der Kunde möchte den Rollout zwei Wochen früher → mehr Techniker (Kosten ↑) oder weniger Leistung (z. B. Datenübernahme später). Wird das Budget gekürzt → günstigere Geräte (Qualität ↓) oder längere Dauer (Zeit ↑).

**Stakeholder** sind alle Personen und Gruppen, die vom Projekt betroffen sind oder es beeinflussen: Auftraggeber, Anwender, Geschäftsführung, Betriebsrat, Datenschutzbeauftragte, Lieferanten.`,
        },
        {
          type: 'visual',
          title: 'Die drei Zielgrößen',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Leistung / Qualität', text: 'Umfang und Güte des Ergebnisses – was genau wird geliefert?', icon: 'Target' },
                { title: 'Zeit', text: 'Starttermin, Meilensteine, Endtermin.', icon: 'CalendarClock' },
                { title: 'Kosten', text: 'Budget für Personal, Material, Dienstleister.', icon: 'Euro' },
              ],
            },
          },
          caption: 'Ändert sich eine Ecke des Dreiecks, müssen die anderen angepasst werden.',
        },
        {
          type: 'check',
          question: {
            id: 'w05-c01', kind: 'multi', skill: 'w.projekt', difficulty: 1,
            prompt: 'Welche Vorhaben sind **Projekte**?',
            options: ['Umstellung aller 120 Arbeitsplätze auf Windows 11 bis Jahresende', 'Tägliche Kontrolle der Datensicherung', 'Einführung eines Ticketsystems', 'Zurücksetzen eines vergessenen Passworts', 'Aufbau des WLANs im neuen Lager Hamburg'],
            answer: [0, 2, 4],
            explanation: 'Projekte sind einmalig, zeitlich begrenzt und zielgerichtet. Backupkontrolle und Passwort-Reset sind Routinetätigkeiten.',
          },
        },
        { type: 'practice', title: 'Übung: Projektbegriff', questionIds: ['w05-q001', 'w05-q002', 'w05-q003'], count: 3, difficulty: 1 },
        { type: 'summary', points: ['Projekt: einmalig, zeitlich begrenzt, klares Ziel, begrenzte Ressourcen, eigene Organisation (DIN 69901-5).', 'Magisches Dreieck: Leistung/Qualität – Zeit – Kosten.', 'Änderungen an einer Größe wirken auf die anderen.', 'Stakeholder frühzeitig einbinden.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'w05-l02',
      title: 'Projektphasen, Projektstrukturplan, Meilensteine',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['w.phasen'],
      simple: `Ein Projekt läuft in Etappen ab, wie ein Umzug: erst die Idee (Wir ziehen um!), dann klären, was genau gebraucht wird, dann planen (Kisten, Helfer, Transporter), dann umziehen und aufpassen, dass alles klappt, und am Ende alles abhaken. Der **Projektstrukturplan** ist deine Liste mit **allen Aufgaben** – noch ohne Reihenfolge. Ein **Meilenstein** ist ein wichtiger Kontrollpunkt ohne eigene Dauer, z. B. „Transporter ist beladen“.

**Merke:** Initialisierung → Definition → Planung → Steuerung → Abschluss; der PSP sagt, **was** zu tun ist, ein Meilenstein ist ein Kontrollpunkt.`,
      steps: [
        {
          type: 'explain',
          title: 'Ein Projekt in Etappen',
          body: `**Projektphasen nach DIN 69901-2:**

| Phase | Inhalte | Ergebnisse |
|---|---|---|
| **1. Initialisierung** | Idee/Problem, Auftraggeber, grobe Ziele, Machbarkeit | Projektauftrag (Entwurf) |
| **2. Definition** | Ziele konkretisieren, Anforderungen, Rahmenbedingungen, Stakeholder | Projektauftrag, Lastenheft |
| **3. Planung** | Projektstrukturplan, Ablauf- und Terminplan, Ressourcen-, Kosten-, Risikoplanung | Pflichtenheft, Gantt-Diagramm/Netzplan, Budget |
| **4. Steuerung** (Durchführung) | Umsetzen, Fortschritt überwachen (Soll-Ist), gegensteuern, Änderungen managen | Statusberichte, Änderungsanträge |
| **5. Abschluss** | Abnahme, Übergabe, Dokumentation, Nachkalkulation, Lessons Learned | Abnahmeprotokoll, Abschlussbericht |

**Projektstrukturplan (PSP):** zerlegt das Projekt hierarchisch in **Teilprojekte** und **Arbeitspakete** (kleinste planbare Einheit mit Verantwortlichem, Dauer, Kosten). Er beantwortet: *Was ist alles zu tun?* – noch nicht *in welcher Reihenfolge*.

*Beispiel PSP „Rollout Berlin“:*
- 1 Planung: 1.1 Bedarfsanalyse · 1.2 Angebotsvergleich · 1.3 Bestellung
- 2 Vorbereitung: 2.1 Image erstellen · 2.2 Netzwerkports prüfen · 2.3 Benutzerkonten anlegen
- 3 Umsetzung: 3.1 Geräte aufstellen · 3.2 Datenübernahme · 3.3 Funktionstest
- 4 Abschluss: 4.1 Einweisung · 4.2 Abnahme · 4.3 Altgeräte datenschutzgerecht entsorgen · 4.4 Dokumentation

**Meilenstein:** ein **Ereignis ohne Dauer**, an dem ein wichtiges Zwischenergebnis überprüft wird (z. B. „Hardware geliefert“, „Pilotarbeitsplatz abgenommen“). Meilensteine sind Kontrollpunkte für Termin und Qualität.

**Klassisch vs. agil:** Das klassische **Wasserfallmodell** arbeitet die Phasen nacheinander ab – gut, wenn die Anforderungen feststehen (z. B. Hardware-Rollout). **Agile** Vorgehen wie **Scrum** liefern in kurzen Iterationen (Sprints, 1–4 Wochen) nutzbare Teilergebnisse und reagieren flexibel auf geänderte Anforderungen – typisch für Softwareentwicklung. **Kanban** visualisiert den Arbeitsfluss auf einer Tafel (To do – In Arbeit – Erledigt) und begrenzt die gleichzeitig laufenden Aufgaben. Rollen, Artefakte und Ablauf von Scrum und Kanban lernst du ausführlich im Bereich **Programmierung (Modul p05)**.`,
        },
        {
          type: 'visual',
          title: 'Phasen nach DIN 69901',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Initialisierung', text: 'Idee, Auftraggeber, Machbarkeit.', icon: 'Lightbulb' },
                { title: 'Definition', text: 'Ziele, Anforderungen, Projektauftrag, Lastenheft.', icon: 'FileText' },
                { title: 'Planung', text: 'PSP, Termine, Ressourcen, Kosten, Risiken.', icon: 'CalendarRange' },
                { title: 'Steuerung', text: 'Umsetzen, überwachen, gegensteuern.', icon: 'Gauge' },
                { title: 'Abschluss', text: 'Abnahme, Übergabe, Nachkalkulation, Lessons Learned.', icon: 'Flag' },
              ],
            },
          },
          caption: 'Die Phasen strukturieren das Projekt; Meilensteine markieren die Übergänge.',
        },
        {
          type: 'check',
          question: {
            id: 'w05-c02', kind: 'order', skill: 'w.phasen', difficulty: 1,
            prompt: 'Bringe die Projektphasen nach DIN 69901 in die richtige Reihenfolge.',
            items: ['Initialisierung', 'Definition', 'Planung', 'Steuerung', 'Abschluss'],
            explanation: 'Initialisierung → Definition → Planung → Steuerung → Abschluss.',
          },
        },
        { type: 'practice', title: 'Übung: Phasen und PSP', questionIds: ['w05-q004', 'w05-q005', 'w05-q006', 'w05-q007'], count: 4, difficulty: 2 },
        { type: 'summary', points: ['Phasen: Initialisierung, Definition, Planung, Steuerung, Abschluss.', 'PSP: Was ist zu tun? (Teilprojekte, Arbeitspakete).', 'Meilenstein = Ereignis ohne Dauer, Kontrollpunkt.', 'Wasserfall bei festen Anforderungen, agil (Scrum) bei sich ändernden Anforderungen.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'w05-l06',
      title: 'Projektorganisation: Machbarkeit, Stakeholder, RACI und Teamphasen',
      minutes: 25,
      relevance: 'ap1-teilweise',
      skills: ['w.projektorga'],
      simple: `Bevor eine Klassenfahrt startet, prüft die Lehrkraft: Ist sie überhaupt machbar (Geld, Zeit, Erlaubnis der Schule)? Dann überlegt sie, wer mitreden will: Schulleitung, Eltern, Schüler – das sind die **Stakeholder** (alle, die betroffen sind oder mitreden). Damit nichts liegen bleibt, wird für jede Aufgabe festgelegt, wer sie **erledigt**, wer am Ende **den Kopf hinhält**, wer **gefragt** und wer nur **informiert** wird – das ist die **RACI-Matrix**. Und eine neue Gruppe findet sich in Phasen zusammen: erst vorsichtiges Kennenlernen, dann Streit, dann Regeln, dann gute Zusammenarbeit.

**Merke:** Erst Machbarkeit prüfen, dann Stakeholder einbinden; RACI = Responsible (macht), Accountable (verantwortet, genau einer), Consulted (wird gefragt), Informed (wird informiert).`,
      steps: [
        {
          type: 'explain',
          title: 'Wer ist beteiligt – und wer entscheidet?',
          body: `**Machbarkeitsstudie (in der Initialisierung):** Bevor ein Projekt startet, wird geprüft, ob es sich umsetzen lässt und lohnt:

| Aspekt | Leitfrage | Beispiel „WLAN für das Lager Hamburg“ |
|---|---|---|
| **technisch** | Ist es mit verfügbarer Technik lösbar? | Reicht die Ausleuchtung zwischen Hochregalen aus Metall? |
| **wirtschaftlich** | Lohnt es sich? Passt es ins Budget? | Kosten 18.000 € gegen Zeitersparnis durch mobile Scanner |
| **rechtlich** | Gibt es Hindernisse durch Gesetze oder Verträge? | Datenschutz bei Ortung, Mitbestimmung des Betriebsrats |
| **organisatorisch / personell** | Haben wir die Leute und das Know-how? | Zwei Techniker mit WLAN-Erfahrung verfügbar? |
| **zeitlich** | Ist der Termin realistisch? | Installation nur am Wochenende, ohne Lagerbetrieb |

**Projektauftrag:** Ergebnis von Initialisierung und Definition – Ziel, Umfang (auch was **nicht** dazugehört), Termine, Budget, Projektleitung, Auftraggeber, Unterschrift. Ohne Auftrag kein Projekt.

**Projektrollen**
- **Auftraggeber:** will das Ergebnis, stellt das Budget, nimmt ab.
- **Projektleitung:** plant, steuert, berichtet – verantwortlich für das Erreichen von Leistung, Zeit und Kosten.
- **Projektteam:** erledigt die Arbeitspakete.
- **Lenkungsausschuss** (bei größeren Projekten): entscheidet bei Konflikten und Änderungen.

**Projektorganisationsformen** – wie wird das Projekt in die Firma eingebaut?

| Form | Merkmal | Vorteile | Nachteile |
|---|---|---|---|
| **Einfluss-Projektorganisation** (Stabs-PO) | Projektleitung hat nur **beratende** Funktion (Stabsstelle); Mitarbeitende bleiben in ihren Abteilungen, Linienvorgesetzte entscheiden | wenig organisatorischer Aufwand, gut für kleine Projekte | Projektleitung kann nichts anordnen, langsame Entscheidungen, Verantwortung unklar |
| **Reine Projektorganisation** | Mitarbeitende werden ganz aus der Linie herausgelöst und unterstehen nur der Projektleitung (volle Weisungsbefugnis) | klare Verantwortung, schnelle Entscheidungen, volle Konzentration aufs Projekt | teuer, Rückkehr der Mitarbeitenden in die Abteilung nach Projektende schwierig, Fachwissen fehlt in der Linie |
| **Matrix-Projektorganisation** | Mitarbeitende bleiben in der Abteilung, die Projektleitung entscheidet **was und wann**, die Linie **wer und wie** | flexibler Personaleinsatz, Fachwissen bleibt in der Abteilung | zwei Vorgesetzte → Konflikte um Ressourcen, hoher Abstimmungsaufwand |

*Faustregel:* kleines, kurzes Projekt → Einfluss-PO; großes, langes, kritisches Projekt → reine PO; viele parallele Projekte mit geteiltem Personal → Matrix-PO.

**Kick-off-Meeting:** offizieller Projektstart mit allen Beteiligten – Ziele und Auftrag vorstellen, Rollen und Zuständigkeiten klären, Termine und Meilensteine, Kommunikationswege (Statusmeetings, Berichte), Team lernt sich kennen.

**Stakeholderanalyse:** Stakeholder sammeln und nach **Einfluss** auf das Projekt und **Interesse** am Projekt einordnen:

| | geringes Interesse | hohes Interesse |
|---|---|---|
| **hoher Einfluss** | **zufriedenstellen** (z. B. Geschäftsführung bei kleinem Projekt) | **eng einbinden** (regelmäßig beteiligen, z. B. Auftraggeber) |
| **geringer Einfluss** | **beobachten** | **informieren** (z. B. betroffene Anwender) |

**RACI-Matrix:** legt für jede Aufgabe fest, wer welche Rolle hat.

| Buchstabe | Bedeutung | Merksatz |
|---|---|---|
| **R** – Responsible | führt die Aufgabe durch | „Wer macht's?“ |
| **A** – Accountable | trägt die Gesamtverantwortung, gibt frei | „Wer hält den Kopf hin?“ – **genau eine Person pro Aufgabe** |
| **C** – Consulted | wird **vorher** fachlich befragt | Zwei-Wege-Kommunikation |
| **I** – Informed | wird über Ergebnis **informiert** | Ein-Weg-Kommunikation |

Regeln: Jede Aufgabe hat **genau ein A** und **mindestens ein R**; A und R dürfen dieselbe Person sein.

**Teamphasen nach Tuckman** (wie ein neues Team zusammenwächst):
1. **Forming** – Orientierung: höflich, abwartend, Rollen unklar.
2. **Storming** – Konflikte: Meinungen prallen aufeinander, Machtfragen.
3. **Norming** – Regeln: Team einigt sich auf Arbeitsweise und Rollen.
4. **Performing** – Leistung: Team arbeitet eingespielt und zielorientiert.
5. **Adjourning** – Auflösung: Projektende, Abschied, Lessons Learned.

Die Projektleitung unterstützt je nach Phase: anfangs Orientierung geben, im Storming Konflikte moderieren, später Verantwortung abgeben.`,
        },
        {
          type: 'visual',
          title: 'RACI auf einen Blick',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'R – Responsible', text: 'Führt die Aufgabe aus. Mindestens einer pro Aufgabe.', icon: 'Wrench' },
                { title: 'A – Accountable', text: 'Verantwortet das Ergebnis und gibt frei. Genau einer pro Aufgabe.', icon: 'ShieldCheck' },
                { title: 'C – Consulted', text: 'Wird vorher um fachlichen Rat gefragt.', icon: 'MessagesSquare' },
                { title: 'I – Informed', text: 'Wird über Fortschritt oder Ergebnis informiert.', icon: 'Bell' },
              ],
            },
          },
          caption: 'Eine RACI-Matrix verhindert, dass Aufgaben liegen bleiben oder doppelt erledigt werden.',
        },
        {
          type: 'example',
          title: 'RACI-Matrix für den Notebook-Rollout',
          problem: 'Erstelle eine RACI-Matrix für vier Aufgaben des Rollouts bei der Elektro Krämer GmbH. Rollen: Projektleitung (PL), Techniker (T), Einkauf (EK), Vertriebsleitung als Auftraggeber (AG).',
          steps: [
            { label: 'Aufgaben und Rollen festlegen', body: 'Zeilen = Aufgaben, Spalten = Rollen.' },
            { label: 'Matrix füllen', body: `| Aufgabe | PL | T | EK | AG |
|---|---|---|---|---|
| Hardware bestellen | A | C | R | I |
| Image erstellen | A | R | – | C |
| Arbeitsplätze installieren | A | R | – | I |
| Abnahme | R | C | – | A |` },
            { label: 'Regeln prüfen', body: 'Jede Zeile hat **genau ein A** und mindestens ein R ✔. Bei der Abnahme ist der **Auftraggeber** A (er erklärt die Abnahme), die Projektleitung führt sie durch (R).' },
          ],
          result: 'Alle Zuständigkeiten sind eindeutig – niemand kann sagen „Ich dachte, das macht jemand anders“.',
        },
        {
          type: 'check',
          question: {
            id: 'w05-c06', kind: 'match', skill: 'w.projektorga', difficulty: 1,
            prompt: 'Ordne die Buchstaben der RACI-Matrix ihrer Bedeutung zu.',
            left: ['R', 'A', 'C', 'I'],
            right: ['führt die Aufgabe durch', 'trägt die Gesamtverantwortung (genau einer)', 'wird vorher fachlich befragt', 'wird über das Ergebnis informiert'],
            answer: [0, 1, 2, 3],
            explanation: 'Responsible – Accountable – Consulted – Informed. Merke: **genau ein A** pro Aufgabe.',
          },
        },
        { type: 'practice', title: 'Übung: Projektorganisation', questionIds: ['w05-q031', 'w05-q032', 'w05-q033', 'w05-q034', 'w05-q035', 'w05-q036', 'w05-q037', 'w05-q046', 'w05-q047', 'w05-q048'], count: 6, difficulty: 2 },
        { type: 'summary', points: ['Machbarkeit prüfen: technisch, wirtschaftlich, rechtlich, organisatorisch, zeitlich.', 'Projektauftrag mit Ziel, Umfang, Terminen, Budget und Verantwortlichen; Kick-off als offizieller Start.', 'Stakeholder nach Einfluss und Interesse einordnen: eng einbinden, zufriedenstellen, informieren, beobachten.', 'RACI: genau ein A, mindestens ein R pro Aufgabe.', 'Teamphasen: Forming, Storming, Norming, Performing (Adjourning).', 'Projektorganisation: Einfluss-PO (nur beratend), reine PO (volle Weisung), Matrix-PO (zwei Vorgesetzte).'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'w05-l03',
      title: 'Gantt-Diagramm und Netzplan',
      minutes: 30,
      relevance: 'ap1-teilweise',
      skills: ['w.netzplan'],
      simple: `Stell dir vor, du kochst Nudeln mit Soße. Wasser kochen und Soße machen kannst du **gleichzeitig**, aber abgießen geht erst, wenn die Nudeln gar sind. Der **Netzplan** zeigt, welche Arbeit auf welche warten muss. Der längste Weg durch alle Arbeiten bestimmt, wann das Essen fertig ist – das ist der **kritische Pfad**. Arbeiten außerhalb dieses Weges haben **Puffer** (Spielraum): Die Soße darf etwas später starten, ohne dass das Essen später fertig wird. Das **Gantt-Diagramm** zeigt dieselben Arbeiten als Balken auf einem Kalender.

**Merke:** Projektdauer = längster Weg; Vorgänge mit Puffer 0 bilden den kritischen Pfad – verzögert sich einer davon, wird das ganze Projekt später fertig.`,
      steps: [
        {
          type: 'explain',
          title: 'Wer macht was wann – und was ist kritisch?',
          body: `Aus dem Projektstrukturplan wird ein **Ablauf- und Terminplan**: Welche Vorgänge hängen voneinander ab, und wie lange dauern sie?

**Gantt-Diagramm (Balkenplan):** Jeder Vorgang ist ein Balken auf einer Zeitachse; Abhängigkeiten werden als Pfeile, Meilensteine als Rauten dargestellt. Vorteil: sehr anschaulich, gut für Statusberichte.

**Netzplan (Vorgangsknotennetz):** Jeder Vorgang ist ein Knoten mit diesen Werten:

| Abkürzung | Bedeutung | Berechnung |
|---|---|---|
| D | Dauer | gegeben |
| **FAZ** | frühester Anfangszeitpunkt | größter FEZ aller Vorgänger (Start: 0) |
| **FEZ** | frühester Endzeitpunkt | FAZ + D |
| **SEZ** | spätester Endzeitpunkt | kleinster SAZ aller Nachfolger (letzter Vorgang: Projektende) |
| **SAZ** | spätester Anfangszeitpunkt | SEZ − D |
| **GP** | Gesamtpuffer | SAZ − FAZ (= SEZ − FEZ) |
| FP | freier Puffer | kleinster FAZ der Nachfolger − FEZ |

**Vorgehen:** 1. **Vorwärtsrechnung** (FAZ/FEZ von links nach rechts) → Projektdauer. 2. **Rückwärtsrechnung** (SEZ/SAZ von rechts nach links). 3. Puffer berechnen.

**Kritischer Pfad:** alle Vorgänge mit **GP = 0**. Verzögert sich einer davon, verschiebt sich das Projektende. Hier lohnt sich besondere Aufmerksamkeit (z. B. Lieferzeiten absichern).

*Konvention:* Diese App beginnt bei Zeitpunkt **0** und rechnet FEZ = FAZ + D. Manche Lehrbücher starten bei 1 und rechnen FEZ = FAZ + D − 1 – die **Dauer** des Projekts und die **Puffer** sind in beiden Konventionen gleich. In der Prüfung gilt die Vorgabe der Aufgabe.`,
        },
        {
          type: 'example',
          title: 'Netzplan für den Rollout',
          problem: `Berechne den Netzplan (Dauer in Arbeitstagen):

| Vorgang | Beschreibung | D | Vorgänger |
|---|---|---|---|
| A | Bedarfsanalyse | 2 | – |
| B | Angebote einholen und bestellen | 3 | A |
| C | Lieferung der Hardware | 5 | B |
| D | Netzwerk vorbereiten | 4 | A |
| E | Image erstellen | 3 | A |
| F | Installation | 3 | C, D, E |
| G | Einweisung und Abnahme | 1 | F |`,
          steps: [
            { label: 'Vorwärtsrechnung', body: 'A: 0–2 · B: 2–5 · C: 5–10 · D: 2–6 · E: 2–5 · F: FAZ = max(10, 6, 5) = 10 → 10–13 · G: 13–14 → **Projektdauer 14 Tage**' },
            { label: 'Rückwärtsrechnung', body: 'G: SEZ 14, SAZ 13 · F: SEZ 13, SAZ 10 · C: SEZ 10, SAZ 5 · D: SEZ 10, SAZ 6 · E: SEZ 10, SAZ 7 · B: SEZ 5, SAZ 2 · A: SEZ = min(2, 6, 7) = 2, SAZ 0' },
            { label: 'Puffer', body: 'GP: A 0, B 0, C 0, **D 4**, **E 5**, F 0, G 0' },
            { label: 'Kritischer Pfad', body: '**A → B → C → F → G** (2 + 3 + 5 + 3 + 1 = 14 Tage)' },
          ],
          result: 'Projektdauer **14 Tage**; kritischer Pfad A–B–C–F–G. „Netzwerk vorbereiten“ darf sich um 4 Tage, „Image erstellen“ um 5 Tage verzögern, ohne das Projektende zu gefährden.',
        },
        {
          type: 'check',
          question: {
            id: 'w05-c03', kind: 'number', skill: 'w.netzplan', difficulty: 2,
            prompt: 'Im Beispiel-Netzplan verzögert sich die **Lieferung der Hardware (C)** um 2 Tage (Dauer 7 statt 5). Wie lange dauert das Projekt jetzt?',
            answer: 16, unit: 'Tage',
            misconceptions: [{ answer: '14', error: 'w-netzplan-kritisch', why: 'C liegt auf dem kritischen Pfad (GP = 0) – jede Verzögerung verlängert das Projekt.' }],
            explanation: 'C liegt auf dem kritischen Pfad → das Projektende verschiebt sich um 2 Tage auf **16 Tage**.',
          },
        },
        { type: 'practice', title: 'Übung: Projektdauer und Puffer', generator: 'w.netzplan', count: 3, difficulty: 2 },
        { type: 'practice', title: 'Prüfungsniveau: Netzplan vollständig berechnen', generator: 'w.netzplan', count: 1, difficulty: 3 },
        { type: 'summary', points: ['Gantt: Balken auf Zeitachse – anschaulich.', 'Netzplan: FAZ, FEZ, SAZ, SEZ, Puffer.', 'Vorwärtsrechnung → Projektdauer; Rückwärtsrechnung → späteste Zeitpunkte.', 'GP = SAZ − FAZ; kritischer Pfad = Vorgänge mit GP 0.', 'Verzögerung auf dem kritischen Pfad verschiebt das Projektende.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'w05-l07',
      title: 'Gantt-Diagramm zeichnen, Termine im Kalender, Projekt verkürzen',
      minutes: 35,
      relevance: 'ap1-teilweise',
      skills: ['w.gantt', 'w.projekttermin'],
      simple: `Ein **Gantt-Diagramm** ist wie ein Stundenplan für ein Projekt: Jede Aufgabe ist ein Balken, und du siehst sofort, was wann läuft. Um aus „12 Arbeitstagen“ ein echtes Datum zu machen, zählst du im Kalender nur die Tage, an denen gearbeitet wird – **Wochenenden und Feiertage überspringst du**, und der Starttag zählt schon mit. Soll das Projekt schneller fertig werden, musst du die Aufgaben auf dem **kritischen Pfad** beschleunigen (der Weg ohne Spielraum). Eine Aufgabe mit Puffer zu beschleunigen ist so, als würdest du beim Nudelkochen die Soße schneller machen – das Essen ist trotzdem erst fertig, wenn die Nudeln gar sind.

**Merke:** Balken von „Ende der Vorgänger + 1“ bis „Start + Dauer − 1“; im Kalender nur Arbeitstage zählen; verkürzen nur auf dem kritischen Pfad.`,
      steps: [
        {
          type: 'explain',
          title: 'Vom Netzplan zum Gantt-Diagramm und zum Kalender',
          body: `**Gantt-Diagramm lesen**

| Element | Darstellung | Bedeutung |
|---|---|---|
| Zeitachse | waagerecht oben (Tage, Wochen, Kalenderwochen) | Zeitraster des Projekts |
| Vorgang | waagerechter **Balken** | Länge = Dauer |
| Puffer | heller oder gestrichelter Balken hinter dem Vorgang | Spielraum bis zum spätesten Ende |
| Meilenstein | **Raute** ◆ | Ereignis ohne Dauer |
| Abhängigkeit | Pfeil vom Ende eines Balkens zum Anfang des nächsten | „Ende-Anfang-Beziehung“ |
| Fortschritt | ausgefüllter Teil des Balkens, Stichtagslinie | Soll-Ist-Vergleich |

**Gantt-Diagramm zeichnen (Tage durchnummeriert, erster Projekttag = Tag 1)**
1. Vorwärtsrechnung wie im Netzplan (FAZ, FEZ mit Start 0).
2. Balken beginnt an **Tag FAZ + 1** und endet an **Tag FEZ**. Ein Vorgang mit FAZ 2 und Dauer 3 belegt also Tag 3, 4 und 5.
3. Vorgänge mit Puffer: Puffer hinter dem Balken andeuten (GP = SAZ − FAZ).
4. Bei mehreren Vorgängern beginnt der Balken erst **nach dem zuletzt endenden** Vorgänger.

**Arbeitstage in Kalenderdaten umrechnen**
- Gezählt werden nur **Arbeitstage** (meist Mo–Fr). Samstage, Sonntage und **gesetzliche Feiertage** werden übersprungen.
- Der **Starttag zählt als Arbeitstag 1** mit. Ein Vorgang mit 5 Tagen, der am Montag beginnt, endet am Freitag derselben Woche.
- Bundesweite Feiertage 2026 zum Nachschlagen: 01.01. · 03.04. (Karfreitag) · 06.04. (Ostermontag) · 01.05. · 14.05. (Christi Himmelfahrt) · 25.05. (Pfingstmontag) · 03.10. · 25.12. · 26.12. Dazu kommen Feiertage einzelner Bundesländer – in der Prüfung gilt die Angabe der Aufgabe.

**Projekt verkürzen – was hilft wirklich?**
- Nur Vorgänge auf dem **kritischen Pfad** bestimmen das Projektende. Einen Vorgang mit Puffer zu verkürzen, bringt nichts.
- Wird ein kritischer Vorgang stark verkürzt, kann ein **anderer Weg** zum längsten werden – dann sinkt die Projektdauer weniger als erwartet. Immer **neu rechnen**!

| Maßnahme | Beispiel | Auswirkung (magisches Dreieck) |
|---|---|---|
| Mehr Ressourcen auf kritischen Vorgängen | zusätzlicher Techniker, Überstunden | Kosten ↑ |
| Ressourcen umschichten | Techniker von einem Vorgang **mit Puffer** abziehen | kostenneutral, Puffer sinkt |
| Parallelisieren | Installation in Teillieferungen, sobald erste Geräte da sind | Risiko ↑, Abstimmung nötig |
| Beschleunigte Beschaffung | Expresslieferung, Lagerware statt Bestellung | Kosten ↑ |
| Leistungsumfang reduzieren | Schulung erst nach Go-Live | Leistung ↓, mit Kunde abstimmen |`,
        },
        {
          type: 'example',
          title: 'Von Arbeitstagen zum Übergabetermin',
          problem: 'Die Installation der neuen Arbeitsplätze dauert laut Netzplan **8 Arbeitstage**. Start ist **Montag, 18.05.2026**. Gearbeitet wird Mo–Fr; am **Mo, 25.05.2026** ist Pfingstmontag. Wann ist der letzte Projekttag?',
          steps: [
            { label: 'Woche 1 zählen', body: 'Mo 18.05. (1) · Di 19.05. (2) · Mi 20.05. (3) · Do 21.05. (4) · Fr 22.05. (5)' },
            { label: 'Wochenende und Feiertag überspringen', body: 'Sa 23.05. und So 24.05. – kein Arbeitstag; Mo 25.05. Pfingstmontag – kein Arbeitstag.' },
            { label: 'Weiterzählen', body: 'Di 26.05. (6) · Mi 27.05. (7) · **Do 28.05. (8)**' },
          ],
          result: 'Letzter Projekttag ist **Donnerstag, 28.05.2026**. Wer den Feiertag vergisst, kommt auf den 27.05. – und verspricht dem Kunden einen Termin, der nicht zu halten ist.',
        },
        {
          type: 'check',
          question: {
            id: 'w05-c07', kind: 'text', skill: 'w.projekttermin', difficulty: 2,
            prompt: 'Ein Projekt dauert **6 Arbeitstage** und beginnt am **Montag, 11.05.2026**. Gearbeitet wird Mo–Fr; am **Do, 14.05.2026** ist Christi Himmelfahrt. Wann ist der letzte Projekttag? (Format TT.MM.JJJJ)',
            accept: ['19.05.2026', '19.5.2026', '19.05.26', '19.5.26', '2026-05-19', 'di, 19.05.2026', 'dienstag, 19.05.2026', 'di 19.05.2026', 'dienstag 19.05.2026'],
            placeholder: 'TT.MM.JJJJ',
            misconceptions: [
              { answer: '18.05.2026', error: 'w-termin-feiertag', why: 'Du hast den Feiertag (Christi Himmelfahrt) als Arbeitstag mitgezählt.' },
              { answer: '16.05.2026', error: 'w-termin-kalendertage', why: 'Du hast Kalendertage gezählt – Wochenenden und Feiertage zählen nicht.' },
              { answer: '20.05.2026', error: 'w-termin-plus-eins', why: 'Ein Tag zu weit: Der Starttag zählt als erster Arbeitstag mit.' },
            ],
            explanation: '**Ergebnis: Dienstag, 19.05.2026**\n\nMo 11.05. (1) · Di 12.05. (2) · Mi 13.05. (3) · Do 14.05. Feiertag · Fr 15.05. (4) · Wochenende · Mo 18.05. (5) · **Di 19.05. (6)**.\n\nHäufiger Fehler: den Feiertag mitzählen (ergäbe den 18.05.2026).',
          },
        },
        { type: 'practice', title: 'Übung: Gantt-Diagramm zeichnen', generator: 'w.gantt', count: 2, difficulty: 1 },
        { type: 'practice', title: 'Übung: Gantt mit mehreren Vorgängern', generator: 'w.gantt', count: 2, difficulty: 2 },
        { type: 'practice', title: 'Prüfungsniveau: Gantt mit Puffern', generator: 'w.gantt', count: 1, difficulty: 3 },
        { type: 'practice', title: 'Übung: Enddatum bestimmen', generator: 'w.projekttermin', count: 2, difficulty: 1 },
        { type: 'practice', title: 'Übung: Netzplan und Kalender mit Feiertagen', generator: 'w.projekttermin', count: 2, difficulty: 2 },
        { type: 'practice', title: 'Prüfungsniveau: Projekt verkürzen', generator: 'w.projekttermin', count: 2, difficulty: 3 },
        { type: 'practice', title: 'Übung: Gantt lesen und Verkürzungsmaßnahmen', questionIds: ['w05-q038', 'w05-q039', 'w05-q040', 'w05-q041', 'w05-q042', 'w05-q043', 'w05-q044', 'w05-q045'], count: 6, difficulty: 2 },
        { type: 'summary', points: ['Gantt: Balken von Tag FAZ + 1 bis Tag FEZ; Puffer als heller Balken, Meilenstein als Raute.', 'Bei mehreren Vorgängern auf den zuletzt endenden warten.', 'Kalender: nur Arbeitstage zählen, Wochenenden und Feiertage überspringen, Starttag zählt mit.', 'Verkürzen nur auf dem kritischen Pfad – danach neu rechnen, weil ein anderer Weg kritisch werden kann.', 'Jede Verkürzung kostet Geld, Leistung oder erhöht das Risiko (magisches Dreieck).'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'w05-l04',
      title: 'Einweisung, Abnahme und Übergabe',
      minutes: 25,
      relevance: 'ap1',
      skills: ['w.abnahme'],
      simple: `Wenn ein Handwerker deine neue Küche fertig hat, probierst du zuerst alles aus: Geht der Herd, schließen die Türen? Dann zeigt er dir, wie alles funktioniert. Erst dann unterschreibst du, dass die Arbeit in Ordnung ist – das ist die **Abnahme**. Kleine Macken (eine schiefe Griffleiste) schreibt man auf und lässt sie nachbessern; deswegen darf man die Abnahme nicht ablehnen. Bei uns heißt das: Arbeitsplätze testen, Anwender **einweisen**, **Abnahmeprotokoll** unterschreiben lassen und die Unterlagen übergeben.

**Merke:** Testen → einweisen → abnehmen lassen → dokumentieren; bekannte Mängel immer mit Frist und Vorbehalt ins Protokoll.`,
      steps: [
        {
          type: 'explain',
          title: 'Der letzte Eindruck zählt',
          body: `Laut Ausbildungsverordnung (§ 9 FIAusbV) gehört zur AP1, **Kunden in die Nutzung des Arbeitsplatzes einzuweisen** und die **Leistungserbringung zu kontrollieren und zu protokollieren**.

**1. Funktionstest (vor der Übergabe):** Alle Anforderungen aus dem Pflichtenheft anhand von **Testfällen** prüfen und dokumentieren (**Testprotokoll**): Anmeldung, Netzlaufwerke, Drucker, E-Mail, VPN, Fachanwendungen, Datenübernahme vollständig, Updates/Virenschutz aktiv, Verschlüsselung aktiv.

**2. Einweisung des Kunden:**
- **Zielgruppe** beachten (Vorkenntnisse, Fragen der Anwender), **Ziel** festlegen („Nach der Einweisung können Sie sich per VPN verbinden und Dokumente scannen.“).
- Methode, z. B. **Vier-Stufen-Methode**: vorbereiten → **vormachen** (und erklären) → **nachmachen** lassen → **üben** (selbstständig).
- **Kurzanleitung** und Ansprechpartner (Hotline, Ticketsystem) übergeben.
- Teilnahme dokumentieren (**Einweisungsnachweis** mit Unterschrift).

**3. Abnahme:** Beim **Werkvertrag** erklärt der Kunde mit der Abnahme, dass die Leistung im Wesentlichen vertragsgemäß ist (§ 640 BGB). Wegen **unwesentlicher** Mängel darf er die Abnahme nicht verweigern. Kennt er Mängel und nimmt trotzdem ab, muss er sich seine Rechte **vorbehalten**, sonst verliert er die Ansprüche auf Nacherfüllung, Selbstvornahme, Rücktritt und Minderung (§ 640 Abs. 3).

**Inhalte eines Abnahmeprotokolls:**

| Inhalt | Beispiel |
|---|---|
| Projekt / Auftrag, Vertragsgrundlage | „Rollout Berlin gemäß Pflichtenheft v1.2 vom 12.02.“ |
| Datum, Ort, Teilnehmende | Auftraggeber, Auftragnehmer |
| geprüfte Leistungen / Testergebnisse | Liste der Testfälle mit Ergebnis |
| festgestellte Mängel | Beschreibung, Einstufung (wesentlich/unwesentlich), **Frist zur Beseitigung** |
| Vorbehalte | „Abnahme unter Vorbehalt der Beseitigung von Mangel 3“ |
| Erklärung | Abnahme **erteilt** / **verweigert** |
| Unterschriften | beider Parteien |

**Rechtsfolgen der Abnahme:** Vergütung fällig, Gefahrübergang, Beginn der Verjährung der Mängelansprüche, Beweislast für Mängel geht auf den Kunden über.

**4. Übergabe – Dokumentation:** Netzplan und IP-Adressliste, Konfigurationen, Inventarliste mit Seriennummern, Lizenznachweise, Garantie-/Serviceunterlagen, Bedienungsanleitungen, Zugangsdaten (**nur sicher**, z. B. versiegelter Umschlag oder Passwortmanager – nicht per unverschlüsselter E-Mail).`,
        },
        {
          type: 'visual',
          title: 'Von der Fertigstellung zur Übergabe',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['IT-Systemhaus', 'Kunde'],
              messages: [
                { from: 0, to: 0, label: 'Funktionstest + Testprotokoll' },
                { from: 0, to: 1, label: 'Einweisung (vormachen – nachmachen – üben)' },
                { from: 1, to: 0, label: 'gemeinsame Abnahme anhand des Pflichtenhefts' },
                { from: 1, to: 0, label: 'Abnahmeprotokoll unterschrieben', note: 'Mängel mit Frist' },
                { from: 0, to: 1, label: 'Übergabe der Dokumentation' },
                { from: 0, to: 1, label: 'Rechnung' },
              ],
            },
          },
          caption: 'Erst testen, dann einweisen, dann abnehmen lassen – und alles dokumentieren.',
        },
        {
          type: 'example',
          title: 'Abnahme mit einem kleinen Mangel',
          problem: 'Bei der Abnahme von 40 Arbeitsplätzen funktioniert alles – nur auf **einem** Arbeitsplatz fehlt die Druckerzuordnung für den Etagendrucker. Der Kunde möchte die Abnahme deshalb komplett verweigern. Wie gehst du vor?',
          steps: [
            { label: 'Einstufen', body: 'Der Mangel ist **unwesentlich** (ein Drucker an einem von 40 Plätzen, in Minuten behebbar). Eine Abnahme darf wegen unwesentlicher Mängel nicht verweigert werden (§ 640 Abs. 1 BGB).' },
            { label: 'Protokollieren', body: 'Mangel im Abnahmeprotokoll festhalten: „AP-17: Etagendrucker fehlt. Beseitigung bis 15.04.“ Der Kunde erklärt die Abnahme **unter Vorbehalt** dieses Mangels.' },
            { label: 'Beseitigen und bestätigen', body: 'Mangel beheben, Beseitigung vom Kunden bestätigen lassen (Nachtrag zum Protokoll).' },
          ],
          result: 'Abnahme mit Vorbehalt erteilen lassen, Mangel mit Frist protokollieren und zügig beheben – so bleibt der Kunde abgesichert und das Projekt kann abgeschlossen werden.',
        },
        {
          type: 'check',
          question: {
            id: 'w05-c04', kind: 'multi', skill: 'w.abnahme', difficulty: 2,
            prompt: 'Welche Angaben gehören in ein **Abnahmeprotokoll**?',
            options: ['Datum und Teilnehmende', 'Geprüfte Leistungen und Testergebnisse', 'Festgestellte Mängel mit Frist zur Beseitigung', 'Unterschriften beider Parteien', 'Die privaten Passwörter der Anwender'],
            answer: [0, 1, 2, 3],
            explanation: 'Passwörter gehören nie in ein Protokoll. Alles andere macht die Abnahme nachvollziehbar.',
          },
        },
        { type: 'practice', title: 'Übung: Einweisung und Abnahme', questionIds: ['w05-q016', 'w05-q017', 'w05-q018', 'w05-q019', 'w05-q020', 'w05-q021'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Vor der Übergabe: Funktionstest mit Testprotokoll.', 'Einweisung zielgruppengerecht: vormachen – nachmachen – üben; Kurzanleitung, Nachweis.', 'Abnahmeprotokoll: Leistungen, Tests, Mängel mit Frist, Vorbehalte, Erklärung, Unterschriften.', 'Unwesentliche Mängel rechtfertigen keine Verweigerung der Abnahme.', 'Dokumentation vollständig und Zugangsdaten sicher übergeben.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'w05-l05',
      title: 'Rechnung, Nachkalkulation und Kundenzufriedenheit',
      minutes: 25,
      relevance: 'ap1-teilweise',
      skills: ['w.rechnung', 'w.zufriedenheit'],
      simple: `Nach dem Projekt schreibst du eine **Rechnung**. Sie ist wie ein Kassenbon, nur mit mehr Pflichtangaben (Pflicht = muss drauf stehen): z. B. Rechnungsnummer, Steuernummer und wann die Leistung erbracht wurde. Danach vergleichst du: Haben wir so viele Stunden gebraucht wie geplant? Das ist die **Nachkalkulation** – wie wenn du nach dem Einkauf prüfst, ob du im Budget geblieben bist. Zum Schluss fragst du den Kunden, wie zufrieden er war, damit das nächste Projekt noch besser läuft.

**Merke:** Rechnung mit allen Pflichtangaben (§ 14 UStG), Soll-Ist-Vergleich bei der Nachkalkulation, Kundenzufriedenheit abfragen und Lehren ziehen.`,
      steps: [
        {
          type: 'explain',
          title: 'Projekt sauber abschließen',
          body: `**Pflichtangaben einer Rechnung (§ 14 Abs. 4 UStG):**
1. vollständiger Name und Anschrift des **leistenden Unternehmers** und des **Leistungsempfängers**
2. **Steuernummer** oder **USt-Identifikationsnummer** des Leistenden
3. **Ausstellungsdatum**
4. fortlaufende, einmalige **Rechnungsnummer**
5. **Menge und Art** der gelieferten Gegenstände bzw. Umfang und Art der Leistung
6. **Zeitpunkt der Lieferung/Leistung** (Leistungsdatum oder -zeitraum)
7. **Entgelt** (netto), nach Steuersätzen aufgeschlüsselt, sowie im Voraus vereinbarte Entgeltminderungen (z. B. Skonto)
8. **Steuersatz** und **Steuerbetrag** (oder Hinweis auf eine Steuerbefreiung)

**Kleinbetragsrechnung** (bis **250 € brutto**, § 33 UStDV): Es genügen Name und Anschrift des Leistenden, Ausstellungsdatum, Menge/Art der Leistung, Bruttobetrag und Steuersatz.

**E-Rechnung im B2B (Stand 2026):** Seit dem **01.01.2025** müssen alle inländischen Unternehmen **E-Rechnungen empfangen** können. Eine E-Rechnung ist ein **strukturierter, maschinenlesbarer Datensatz** nach EN 16931 (z. B. **XRechnung** oder **ZUGFeRD** ab Version 2.0.1) – eine einfache PDF-Datei ist **keine** E-Rechnung. Für das **Ausstellen** gelten Übergangsfristen: Ab **2027** müssen Unternehmen mit mehr als 800.000 € Vorjahresumsatz E-Rechnungen ausstellen, ab **2028** alle.

**Aufbewahrung:** Rechnungen sind als Buchungsbelege aufzubewahren – seit 2025 **8 Jahre** (vorher 10 Jahre); E-Rechnungen im Originalformat.

**Nachkalkulation:** Soll-Ist-Vergleich von Kosten und Zeit (z. B. kalkuliert 120 Technikerstunden, tatsächlich 138 h → 15 % Mehraufwand). Ursachen analysieren → bessere Kalkulation beim nächsten Angebot.

**Kundenzufriedenheit messen und sichern:**
- Abschlussgespräch / Feedbackgespräch, kurze **Umfrage** (z. B. Skala 1–5 oder Weiterempfehlungsfrage)
- **Net Promoter Score (NPS):** „Wie wahrscheinlich ist es, dass Sie uns weiterempfehlen?“ (0–10). NPS = % Promotoren (9–10) − % Kritiker (0–6). Werte von −100 bis +100.
- Reklamationen ernst nehmen und schnell lösen (→ Reklamationsgespräch, Modul 1)
- **Lessons Learned** im Team: Was lief gut, was verbessern wir?
- **Projektabschlussbericht**: Ziele erreicht? Kosten/Termine? Offene Punkte, Empfehlungen.`,
        },
        {
          type: 'example',
          title: 'Eine Rechnung prüfen',
          problem: `Prüfe die Rechnung des Systemhauses auf fehlende Pflichtangaben:

> **IT-Systemhaus Nord GmbH**, Hafenstr. 5, 20457 Hamburg
> An: Elektro Krämer GmbH, Werkstr. 12, 10115 Berlin
> Rechnung, Datum: 30.04.
> 40 × Arbeitsplatz eingerichtet (inkl. Datenübernahme) – 16.800,00 €
> zzgl. 19 % USt – 3.192,00 €
> **Gesamt: 19.992,00 €**`,
          steps: [
            { label: 'Vorhanden', body: 'Name/Anschrift beider Parteien, Ausstellungsdatum, Menge und Art der Leistung, Nettoentgelt, Steuersatz und Steuerbetrag.' },
            { label: 'Fehlt', body: '**Rechnungsnummer**, **Steuernummer oder USt-IdNr.** des Systemhauses, **Leistungszeitpunkt/-zeitraum** (z. B. „Leistungszeitraum 01.04.–28.04.“).' },
            { label: 'Rechenprüfung', body: '16.800,00 € × 19 % = 3.192,00 € ✔; Summe 19.992,00 € ✔' },
          ],
          result: 'Die Rechnung ist rechnerisch korrekt, aber **unvollständig**: Rechnungsnummer, Steuernummer/USt-IdNr. und Leistungszeitpunkt fehlen. Ohne korrekte Rechnung ist der Vorsteuerabzug gefährdet → Rechnungskorrektur anfordern.',
        },
        {
          type: 'check',
          question: {
            id: 'w05-c05', kind: 'number', skill: 'w.zufriedenheit', difficulty: 2,
            prompt: 'Nach dem Projekt antworten **40 Kunden** auf die Weiterempfehlungsfrage: **22** geben 9–10 Punkte, **12** geben 7–8 Punkte, **6** geben 0–6 Punkte. Wie hoch ist der **Net Promoter Score**?',
            answer: 40, tolerance: 0.01,
            misconceptions: [{ answer: '16', error: 'w-nps-absolut', why: 'Der NPS rechnet mit **Prozentanteilen**, nicht mit Anzahlen: 55 % − 15 %.' }, { answer: '55', error: 'w-nps-kritiker', why: 'Die Kritiker (15 %) müssen abgezogen werden.' }],
            explanation: 'Promotoren: 22/40 = 55 % · Kritiker: 6/40 = 15 % · NPS = 55 − 15 = **40**.',
          },
        },
        { type: 'practice', title: 'Übung: Rechnung und Projektabschluss', questionIds: ['w05-q022', 'w05-q023', 'w05-q024', 'w05-q025', 'w05-q026', 'w05-q028'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Rechnungspflichtangaben nach § 14 Abs. 4 UStG – u. a. Rechnungsnummer, Steuernummer/USt-IdNr., Leistungszeitpunkt.', 'Kleinbetragsrechnung bis 250 € brutto mit vereinfachten Angaben.', 'E-Rechnung (XRechnung/ZUGFeRD) im B2B: Empfang seit 2025 Pflicht, Ausstellung gestaffelt ab 2027/2028.', 'Nachkalkulation: Soll-Ist-Vergleich.', 'Kundenzufriedenheit: Feedback, NPS, Lessons Learned, Abschlussbericht.'] },
      ],
    },
  ],
  /* ================================================================ */
  questions: [
    { id: 'w05-q001', kind: 'free', skill: 'w.projekt', difficulty: 1, prompt: 'Nenne **vier Merkmale** eines Projekts.', modelAnswer: 'Einmaligkeit der Bedingungen, zeitliche Begrenzung (fester Anfang und Ende), klare Zielvorgabe, begrenzte Ressourcen (Budget, Personal), Komplexität/fachübergreifende Zusammenarbeit, eigene Projektorganisation.', keywords: ['einmalig', 'zeitlich begrenzt', 'Ziel', 'Ressourcen', 'Organisation'], explanation: 'Projekte nach DIN 69901-5 unterscheiden sich von Routineaufgaben durch die Einmaligkeit der Bedingungen in ihrer Gesamtheit.' },
    { id: 'w05-q002', kind: 'free', skill: 'w.projekt', difficulty: 2, prompt: 'Der Kunde verlangt, dass der Rollout **zwei Wochen früher** fertig wird. Erläutere die Auswirkungen anhand des **magischen Dreiecks**.', modelAnswer: 'Die Zielgröße Zeit wird verkürzt. Damit die Leistung gleich bleibt, müssen mehr Ressourcen eingesetzt werden (zusätzliche Techniker, Überstunden, Expresslieferung) – die Kosten steigen. Alternativ bleibt das Budget gleich, dann muss der Leistungsumfang reduziert werden (z. B. Datenübernahme oder Schulungen später) oder die Qualität leidet (weniger Tests). Die Entscheidung muss mit dem Kunden abgestimmt und dokumentiert werden.', keywords: ['Zeit', 'Kosten', 'Leistung', 'Qualität', 'Ressourcen', 'abstimmen'], explanation: 'Die drei Größen hängen zusammen – man kann nicht eine ändern, ohne die anderen zu beeinflussen.' },
    { id: 'w05-q003', kind: 'text', skill: 'w.projekt', difficulty: 1, prompt: 'Wie nennt man alle Personen und Gruppen, die von einem Projekt betroffen sind oder es beeinflussen?', accept: ['stakeholder', 'die stakeholder', 'anspruchsgruppen', 'interessengruppen', 'projektbeteiligte'], explanation: '**Stakeholder** (Anspruchs- bzw. Interessengruppen).' },
    { id: 'w05-q004', kind: 'match', skill: 'w.phasen', difficulty: 2, prompt: 'Ordne die Ergebnisse den Projektphasen zu.', left: ['Projektauftrag und Lastenheft', 'Projektstrukturplan und Terminplan', 'Statusberichte und Änderungsanträge', 'Abnahmeprotokoll und Abschlussbericht'], right: ['Definition', 'Planung', 'Steuerung', 'Abschluss'], answer: [0, 1, 2, 3], explanation: 'Jede Phase hat typische Dokumente als Ergebnis.' },
    { id: 'w05-q005', kind: 'text', skill: 'w.phasen', difficulty: 1, prompt: 'Wie heißt ein **Ereignis ohne Dauer**, an dem im Projekt ein wichtiges Zwischenergebnis überprüft wird?', accept: ['meilenstein', 'der meilenstein', 'milestone'], explanation: 'Ein **Meilenstein**, z. B. „Hardware geliefert“.' },
    { id: 'w05-q006', kind: 'single', skill: 'w.phasen', difficulty: 2, prompt: 'Welche Frage beantwortet der **Projektstrukturplan** (PSP)?', options: ['Was ist im Projekt alles zu tun?', 'In welcher Reihenfolge und wann werden die Arbeiten erledigt?', 'Wie zufrieden ist der Kunde?', 'Welche Rechte hat der Kunde bei Mängeln?'], answer: 0, distractors: { '1': { why: 'Reihenfolge und Termine regeln Ablauf- und Terminplan (Gantt, Netzplan).', error: 'w-psp-terminplan' }, '2': { why: 'Das klärt eine Kundenbefragung nach Projektende.', error: 'w-psp-terminplan' }, '3': { why: 'Das ist eine Rechtsfrage (Werkvertrag/Kaufvertrag).', error: 'w-psp-terminplan' } }, explanation: 'Der PSP zerlegt das Projekt in Teilprojekte und Arbeitspakete – er zeigt den Umfang, nicht die zeitliche Abfolge.' },
    { id: 'w05-q007', kind: 'free', skill: 'w.phasen', difficulty: 3, prompt: 'Erläutere, wann ein **klassisches (Wasserfall-)Vorgehen** und wann ein **agiles Vorgehen** (z. B. Scrum) sinnvoller ist – mit je einem IT-Beispiel.', modelAnswer: 'Klassisch (Wasserfall) eignet sich, wenn Anforderungen zu Beginn klar und stabil sind und das Ergebnis gut planbar ist, z. B. der Rollout von 40 Arbeitsplätzen nach Pflichtenheft. Agile Vorgehen eignen sich, wenn Anforderungen unklar sind oder sich häufig ändern und früh nutzbare Teilergebnisse gewünscht sind, z. B. die Entwicklung eines internen Self-Service-Portals: In kurzen Sprints werden Funktionen geliefert, mit Anwendern getestet und das Backlog angepasst.', keywords: ['Anforderungen klar', 'stabil', 'Rollout', 'ändern', 'Sprints', 'Teilergebnisse', 'Software'], explanation: 'Keine Methode ist immer besser – sie muss zum Projekt passen.' },
    { id: 'w05-q008', kind: 'number', skill: 'w.netzplan', difficulty: 2, prompt: `Wie lange dauert das Projekt mindestens (in Tagen)?

| Vorgang | Dauer | Vorgänger |
|---|---|---|
| A | 3 | – |
| B | 4 | A |
| C | 6 | A |
| D | 2 | B |
| E | 3 | C, D |`, answer: 12, unit: 'Tage', misconceptions: [{ answer: '18', error: 'w-netzplan-summe', why: 'Nicht alle Dauern addieren – B/D und C laufen parallel. Entscheidend ist der längste Weg.' }], explanation: 'Wege: A–B–D–E = 3 + 4 + 2 + 3 = 12; A–C–E = 3 + 6 + 3 = 12. Beide sind gleich lang → Projektdauer **12 Tage**; beide Wege sind kritisch.' },
    { id: 'w05-q009', kind: 'table', skill: 'w.netzplan', difficulty: 3, prompt: `Berechne den Netzplan (Start bei 0, FEZ = FAZ + D, GP = SAZ − FAZ).

| Vorgang | D | Vorgänger |
|---|---|---|
| A | 2 | – |
| B | 5 | A |
| C | 3 | A |
| D | 4 | C |
| E | 2 | B, D |`, columns: [{ key: 'faz', label: 'FAZ', type: 'number' }, { key: 'fez', label: 'FEZ', type: 'number' }, { key: 'saz', label: 'SAZ', type: 'number' }, { key: 'sez', label: 'SEZ', type: 'number' }, { key: 'gp', label: 'GP', type: 'number' }], rows: [
      { label: 'A', cells: { faz: { answer: '0' }, fez: { answer: '2' }, saz: { answer: '0' }, sez: { answer: '2' }, gp: { answer: '0' } } },
      { label: 'B', cells: { faz: { answer: '2' }, fez: { answer: '7' }, saz: { answer: '4' }, sez: { answer: '9' }, gp: { answer: '2' } } },
      { label: 'C', cells: { faz: { answer: '2' }, fez: { answer: '5' }, saz: { answer: '2' }, sez: { answer: '5' }, gp: { answer: '0' } } },
      { label: 'D', cells: { faz: { answer: '5' }, fez: { answer: '9' }, saz: { answer: '5' }, sez: { answer: '9' }, gp: { answer: '0' } } },
      { label: 'E', cells: { faz: { answer: '9' }, fez: { answer: '11' }, saz: { answer: '9' }, sez: { answer: '11' }, gp: { answer: '0' } } },
    ], explanation: 'Vorwärts: A 0–2, B 2–7, C 2–5, D 5–9, E FAZ = max(7, 9) = 9 → 9–11. Rückwärts: E 9–11, D SEZ 9 → SAZ 5, B SEZ 9 → SAZ 4, C SEZ 5 → SAZ 2, A SEZ = min(4, 2) = 2 → SAZ 0. Puffer: nur B hat GP = 2. Kritischer Pfad: A–C–D–E (11 Tage).' },
    { id: 'w05-q010', kind: 'text', skill: 'w.netzplan', difficulty: 2, prompt: 'Gib den **kritischen Pfad** aus Aufgabe „Netzplan A–E“ (A 2, B 5 nach A, C 3 nach A, D 4 nach C, E 2 nach B und D) an. Schreibweise: Buchstaben mit Bindestrich, z. B. A-B-E.', accept: ['A-C-D-E', 'a-c-d-e', 'ACDE', 'A C D E', 'A–C–D–E', 'A → C → D → E', 'A->C->D->E', 'A, C, D, E'], explanation: 'A (2) + C (3) + D (4) + E (2) = 11 Tage ist der längste Weg; alle diese Vorgänge haben GP = 0.' },
    { id: 'w05-q011', kind: 'single', skill: 'w.netzplan', difficulty: 2, prompt: 'Ein Vorgang hat einen **Gesamtpuffer von 3 Tagen**. Was bedeutet das?', options: ['Er kann sich um bis zu 3 Tage verzögern, ohne dass sich das Projektende verschiebt.', 'Er dauert 3 Tage.', 'Er liegt auf dem kritischen Pfad.', 'Das Projekt endet 3 Tage zu spät.'], answer: 0, distractors: { '1': { why: 'Das wäre die Dauer, nicht der Puffer.', error: 'w-netzplan-puffer' }, '2': { why: 'Vorgänge auf dem kritischen Pfad haben GP = 0.', error: 'w-netzplan-puffer' }, '3': { why: 'Puffer ist Spielraum, keine Verspätung.', error: 'w-netzplan-puffer' } }, explanation: 'GP = zeitlicher Spielraum bis zum spätesten Zeitpunkt, ohne das Projektende zu gefährden.' },
    { id: 'w05-q012', kind: 'match', skill: 'w.netzplan', difficulty: 1, prompt: 'Ordne die Abkürzungen zu.', left: ['FAZ', 'FEZ', 'SAZ', 'SEZ'], right: ['frühester Anfangszeitpunkt', 'frühester Endzeitpunkt', 'spätester Anfangszeitpunkt', 'spätester Endzeitpunkt'], answer: [0, 1, 2, 3], explanation: 'F = frühester, S = spätester, A = Anfang, E = Ende, Z = Zeitpunkt.' },
    { id: 'w05-q013', kind: 'free', skill: 'w.netzplan', difficulty: 2, prompt: 'Nenne je **einen Vorteil** eines **Gantt-Diagramms** und eines **Netzplans**.', modelAnswer: 'Gantt-Diagramm: sehr anschaulich auf einer Zeitachse; man sieht sofort, was wann parallel läuft und wie weit das Projekt ist – gut für Kunden und Statusberichte. Netzplan: zeigt Abhängigkeiten exakt, ermöglicht die Berechnung von Puffern und des kritischen Pfads – man erkennt, welche Vorgänge das Projektende bestimmen.', keywords: ['Zeitachse', 'anschaulich', 'Abhängigkeiten', 'Puffer', 'kritischer Pfad'], explanation: 'In der Praxis erzeugen Projektmanagement-Tools beides aus denselben Daten.' },
    { id: 'w05-q014', kind: 'number', skill: 'w.netzplan', difficulty: 3, prompt: `Berechne den **Gesamtpuffer von Vorgang D** (Start 0, FEZ = FAZ + D).

| Vorgang | Dauer | Vorgänger |
|---|---|---|
| A | 2 | – |
| B | 3 | A |
| C | 5 | B |
| D | 4 | A |
| E | 3 | A |
| F | 3 | C, D, E |
| G | 1 | F |`, answer: 4, unit: 'Tage', misconceptions: [{ answer: '0', error: 'w-netzplan-puffer', why: 'D liegt nicht auf dem kritischen Pfad (A–B–C–F–G).' }, { answer: '5', error: 'w-netzplan-puffer', why: '5 Tage ist der Puffer von E (Dauer 3). D dauert 4 Tage → SAZ 6 − FAZ 2 = 4.' }], explanation: 'FAZ D = 2, FEZ = 6. F beginnt frühestens bei max(10, 6, 5) = 10 → SEZ D = 10, SAZ D = 6 → GP = 6 − 2 = **4 Tage**.' },
    { id: 'w05-q015', kind: 'free', skill: 'w.netzplan', difficulty: 3, prompt: 'Beim Rollout liegt die **Hardwarelieferung** auf dem kritischen Pfad. Der Lieferant kündigt 3 Tage Verspätung an. Nenne **drei Maßnahmen**, um den Endtermin trotzdem zu halten.', modelAnswer: '1. Nachfolgende kritische Vorgänge beschleunigen: zusätzliche Techniker oder Überstunden bei der Installation (Kosten ↑). 2. Vorgänge parallelisieren: z. B. Arbeitsplätze in Teillieferungen installieren, sobald die ersten Geräte da sind. 3. Teillieferung oder Expresslieferung vom Lieferanten verlangen bzw. Geräte bei einem anderen Lieferanten beschaffen. 4. Vorbereitende Arbeiten mit Puffer (Image, Netzwerk) vollständig vorziehen, damit nach Lieferung nichts mehr wartet. 5. Mit dem Kunden Prioritäten abstimmen (Leistungsumfang zunächst reduzieren).', keywords: ['beschleunigen', 'zusätzliche Ressourcen', 'parallelisieren', 'Teillieferung', 'Express', 'Kunde abstimmen'], explanation: 'Maßnahmen wirken auf das magische Dreieck: Zeit halten kostet meist Geld oder Leistungsumfang.' },
    { id: 'w05-q016', kind: 'order', skill: 'w.abnahme', difficulty: 1, prompt: 'Bringe die Schritte am Projektende in eine sinnvolle Reihenfolge.', items: ['Funktionstest mit Testprotokoll', 'Einweisung der Anwender', 'Gemeinsame Abnahme anhand des Pflichtenhefts', 'Abnahmeprotokoll unterschreiben', 'Dokumentation übergeben', 'Rechnung stellen'], explanation: 'Erst prüfen, dann einweisen, abnehmen lassen und protokollieren, dokumentieren – die Rechnung folgt nach der Abnahme (Fälligkeit der Vergütung beim Werkvertrag).' },
    { id: 'w05-q017', kind: 'order', skill: 'w.abnahme', difficulty: 1, prompt: 'Bringe die Stufen der **Vier-Stufen-Methode** für eine Einweisung in die richtige Reihenfolge.', items: ['Vorbereiten (Ziel nennen, Interesse wecken)', 'Vormachen und erklären', 'Nachmachen lassen', 'Selbstständig üben'], explanation: 'Die Vier-Stufen-Methode stammt aus der Arbeitsunterweisung und eignet sich gut für Software-Einweisungen.' },
    { id: 'w05-q018', kind: 'free', skill: 'w.abnahme', difficulty: 2, prompt: 'Nenne **sechs Inhalte** eines Abnahmeprotokolls.', modelAnswer: 'Projekt/Auftrag und Vertragsgrundlage (z. B. Pflichtenheft), Datum und Ort, Teilnehmende beider Seiten, geprüfte Leistungen und Testergebnisse, festgestellte Mängel mit Einstufung und Frist zur Beseitigung, Vorbehalte, Erklärung „Abnahme erteilt“ bzw. „verweigert“, Unterschriften beider Parteien.', keywords: ['Datum', 'Teilnehmende', 'Leistungen', 'Mängel', 'Frist', 'Vorbehalt', 'Unterschriften'], explanation: 'Das Protokoll dokumentiert den Zeitpunkt der Abnahme – wichtig für Fälligkeit und Verjährung.' },
    { id: 'w05-q019', kind: 'multi', skill: 'w.abnahme', difficulty: 2, prompt: 'Welche Rechtsfolgen hat die **Abnahme** beim Werkvertrag?', options: ['Die Vergütung wird fällig.', 'Die Verjährungsfrist für Mängelansprüche beginnt.', 'Der Kunde muss nun beweisen, dass ein Mangel vorliegt.', 'Der Auftragnehmer muss keine Mängel mehr beseitigen.', 'Die Gefahr des zufälligen Untergangs geht auf den Kunden über.'], answer: [0, 1, 2, 4], explanation: 'Mängelrechte bestehen auch nach der Abnahme (bis zur Verjährung).' },
    { id: 'w05-q020', kind: 'single', skill: 'w.abnahme', difficulty: 2, prompt: 'Der Kunde kennt bei der Abnahme einen Mangel, unterschreibt aber das Protokoll **ohne Vorbehalt**. Was ist die Folge?', options: ['Er verliert die Ansprüche auf Nacherfüllung, Selbstvornahme, Rücktritt und Minderung wegen dieses Mangels.', 'Nichts – er kann den Mangel jederzeit geltend machen.', 'Der Vertrag ist unwirksam.', 'Der Auftragnehmer muss den doppelten Preis zurückzahlen.'], answer: 0, distractors: { '1': { why: 'Bei Abnahme in Kenntnis des Mangels ohne Vorbehalt gehen diese Rechte verloren (§ 640 Abs. 3 BGB).', error: 'w-abnahme-vorbehalt' }, '2': { why: 'Der Vertrag bleibt wirksam.', error: 'w-abnahme-vorbehalt' }, '3': { why: 'Eine solche Regel gibt es nicht.', error: 'w-abnahme-vorbehalt' } }, explanation: 'Deshalb bekannte Mängel immer mit **Vorbehalt** ins Protokoll aufnehmen.' },
    { id: 'w05-q021', kind: 'free', skill: 'w.abnahme', difficulty: 2, prompt: 'Welche **Unterlagen** übergibst du dem Kunden nach der Einrichtung von 40 Arbeitsplätzen? Nenne fünf und beschreibe, wie du **Zugangsdaten** sicher übergibst.', modelAnswer: 'Unterlagen: Inventarliste mit Seriennummern und Standorten, IP-Adressliste/Netzplan, Konfigurationsdokumentation, Lizenznachweise, Garantie- und Serviceunterlagen, Bedienungsanleitungen/Kurzanleitung für Anwender, Testprotokoll und Abnahmeprotokoll. Zugangsdaten (z. B. Admin-Passwörter, Wiederherstellungsschlüssel) nur auf sicherem Weg übergeben: persönlich im versiegelten Umschlag, über einen Passwortmanager oder getrennte Kanäle – nie unverschlüsselt per E-Mail; Übergabe quittieren lassen und Kunden auffordern, Passwörter zu ändern.', keywords: ['Inventarliste', 'Netzplan', 'Lizenznachweise', 'Garantie', 'Anleitung', 'Passwortmanager', 'nicht per E-Mail'], explanation: 'Dokumentation ist Teil der Leistung – und Zugangsdaten sind besonders schützenswert.' },
    { id: 'w05-q022', kind: 'multi', skill: 'w.rechnung', difficulty: 2, prompt: 'Welche Angaben sind **Pflichtangaben** einer Rechnung über 19.992 € (§ 14 Abs. 4 UStG)?', options: ['Fortlaufende Rechnungsnummer', 'Steuernummer oder USt-IdNr. des leistenden Unternehmers', 'Zeitpunkt der Lieferung bzw. Leistung', 'Name des Technikers, der die Arbeit ausgeführt hat', 'Steuersatz und Steuerbetrag'], answer: [0, 1, 2, 4], explanation: 'Der Name des Technikers ist sinnvoll im Arbeitsbericht, aber keine Pflichtangabe der Rechnung.' },
    { id: 'w05-q023', kind: 'number', skill: 'w.rechnung', difficulty: 1, prompt: 'Bis zu welchem **Bruttobetrag** (in €) gilt eine Rechnung als **Kleinbetragsrechnung** mit vereinfachten Pflichtangaben?', answer: 250, unit: '€', misconceptions: [{ answer: '150', error: 'w-kleinbetrag', why: '150 € war die Grenze bis 2016. Seit 2017 sind es 250 € brutto (§ 33 UStDV).' }, { answer: '800', error: 'w-kleinbetrag', why: '800 € ist die GWG-Grenze (Abschreibung), nicht die Grenze der Kleinbetragsrechnung.' }], explanation: '**250 € brutto** (§ 33 UStDV).' },
    { id: 'w05-q024', kind: 'single', skill: 'w.rechnung', difficulty: 2, prompt: 'Welche Aussage zur **E-Rechnung** im B2B-Bereich ist richtig (Stand 2026)?', options: ['Eine E-Rechnung ist ein strukturierter Datensatz (z. B. XRechnung, ZUGFeRD); seit 2025 müssen Unternehmen sie empfangen können.', 'Jede per E-Mail verschickte PDF-Rechnung ist eine E-Rechnung.', 'E-Rechnungen sind erst ab 2030 vorgesehen.', 'E-Rechnungen gelten nur für Privatkunden.'], answer: 0, distractors: { '1': { why: 'Eine PDF ist ein „sonstiges“ elektronisches Format, keine E-Rechnung im Sinne des UStG.', error: 'w-erechnung' }, '2': { why: 'Die Empfangspflicht gilt seit 01.01.2025, die Ausstellungspflicht gestaffelt ab 2027/2028.', error: 'w-erechnung' }, '3': { why: 'Die E-Rechnungspflicht betrifft Umsätze zwischen inländischen Unternehmen (B2B).', error: 'w-erechnung' } }, explanation: 'E-Rechnung = strukturiert und maschinenlesbar nach EN 16931.' },
    { id: 'w05-q025', kind: 'free', skill: 'w.rechnung', difficulty: 3, prompt: `Prüfe die Rechnung und nenne **alle Fehler**:

> IT-Service Berg, Hauptstr. 1, 10115 Berlin · Steuernr. 27/123/45678
> An: Elektro Krämer GmbH, Werkstr. 12, 10115 Berlin
> Rechnung Nr. 2026-0412 vom 05.05.2026
> Installation Netzwerkdrucker
> Netto 480,00 € · zzgl. 7 % USt 33,60 € · **Gesamt 513,60 €**`, modelAnswer: '1. Falscher Steuersatz: IT-Dienstleistungen unterliegen dem Regelsteuersatz von 19 %, nicht 7 % (richtig: USt 91,20 €, Gesamt 571,20 €). 2. Leistungszeitpunkt bzw. -zeitraum fehlt. 3. Menge und Umfang der Leistung sind ungenau (Anzahl der Drucker, Arbeitszeit). Vorhanden sind Name/Anschrift, Steuernummer, Rechnungsnummer, Datum, Netto, Steuerbetrag.', keywords: ['19 %', '91,20', '571,20', 'Leistungszeitpunkt', 'Menge'], explanation: 'Rechnungen immer vor der Zahlung auf Pflichtangaben **und** Rechenrichtigkeit prüfen – sonst ist der Vorsteuerabzug gefährdet.' },
    { id: 'w05-q026', kind: 'number', skill: 'w.zufriedenheit', difficulty: 2, prompt: 'Für ein Projekt wurden **120 Technikerstunden** kalkuliert, tatsächlich wurden **138 Stunden** benötigt. Um wie viel **Prozent** wurde der Zeitansatz überschritten?', answer: 15, tolerance: 0.01, unit: '%', misconceptions: [{ answer: '18', error: 'w-prozent-absolut', why: '18 ist die Differenz in Stunden. In Prozent: 18 ÷ 120 × 100.' }, { answer: '13.04', error: 'w-prozent-basis', why: 'Basis ist der Soll-Wert (120 h), nicht der Ist-Wert (138 h).' }], explanation: '(138 − 120) ÷ 120 × 100 = **15 %** Mehraufwand.' },
    { id: 'w05-q027', kind: 'free', skill: 'w.zufriedenheit', difficulty: 2, prompt: 'Nenne **drei Methoden**, mit denen das Systemhaus nach dem Projekt die **Kundenzufriedenheit** ermitteln kann, und erkläre, wozu **Lessons Learned** dienen.', modelAnswer: 'Methoden: persönliches Abschlussgespräch, kurzer Online-Fragebogen (z. B. Skala 1–5 zu Termintreue, Kommunikation, Qualität), Weiterempfehlungsfrage (Net Promoter Score), Auswertung von Tickets und Reklamationen nach dem Go-Live. Lessons Learned: Das Projektteam hält fest, was gut lief und was künftig verbessert wird (z. B. Lieferzeiten früher absichern), damit Fehler nicht wiederholt und gute Vorgehensweisen übernommen werden.', keywords: ['Abschlussgespräch', 'Fragebogen', 'NPS', 'Tickets', 'Lessons Learned', 'verbessern'], explanation: 'Zufriedene Kunden empfehlen weiter – und Lessons Learned verbessern das nächste Projekt.' },
    { id: 'w05-q028', kind: 'number', skill: 'w.zufriedenheit', difficulty: 2, prompt: 'Von **50** befragten Kunden geben **30** eine 9 oder 10, **15** eine 7 oder 8 und **5** eine Bewertung von 0 bis 6. Berechne den **Net Promoter Score**.', answer: 50, tolerance: 0.01, misconceptions: [{ answer: '25', error: 'w-nps-absolut', why: 'Mit Prozentanteilen rechnen: 60 % − 10 %.' }, { answer: '60', error: 'w-nps-kritiker', why: 'Die Kritiker (10 %) müssen abgezogen werden.' }], explanation: 'Promotoren 30/50 = 60 % · Kritiker 5/50 = 10 % · NPS = **50**.' },
    { id: 'w05-q029', kind: 'text', skill: 'w.rechnung', difficulty: 2, prompt: 'Wie viele **Jahre** müssen Rechnungen (als Buchungsbelege) seit 2025 aufbewahrt werden? (Zahl)', accept: ['8', 'acht', '8 jahre', 'acht jahre'], misconceptions: [{ answer: '10', error: 'w-aufbewahrung', why: '10 Jahre galten bis Ende 2024. Seit 2025 beträgt die Frist für Buchungsbelege 8 Jahre.' }, { answer: '6', error: 'w-aufbewahrung', why: '6 Jahre gelten z. B. für Handels- und Geschäftsbriefe, nicht für Buchungsbelege.' }], explanation: '**8 Jahre** (Verkürzung durch das Bürokratieentlastungsgesetz IV; vorher 10 Jahre).' },
    { id: 'w05-q030', kind: 'free', skill: 'w.abnahme', difficulty: 3, prompt: 'Bei der Abnahme von 25 Arbeitsplätzen stellt der Kunde fest: (1) An einem Arbeitsplatz ist das Hintergrundbild falsch. (2) Das VPN funktioniert an **keinem** Notebook. Beurteile, ob der Kunde die Abnahme verweigern darf, und beschreibe dein Vorgehen.', modelAnswer: 'Mangel 1 ist unwesentlich – deswegen darf die Abnahme nicht verweigert werden; er wird mit Frist im Protokoll vermerkt. Mangel 2 ist wesentlich: Das VPN ist eine vereinbarte Kernfunktion (Homeoffice) und fehlt bei allen Geräten. Der Kunde darf die Abnahme verweigern. Vorgehen: beide Mängel im Protokoll dokumentieren, Ursache des VPN-Fehlers sofort analysieren und beheben (Nacherfüllung), Funktion testen und einen neuen Abnahmetermin vereinbaren; den Kunden über Ursache und Lösung informieren.', keywords: ['unwesentlich', 'wesentlich', 'verweigern', 'Protokoll', 'Frist', 'neuer Abnahmetermin', 'Nacherfüllung'], explanation: '§ 640 Abs. 1 BGB: Wegen unwesentlicher Mängel kann die Abnahme nicht verweigert werden – bei wesentlichen schon.' },
    /* ---- Projektorganisation (w05-l06) ---- */
    { id: 'w05-q031', kind: 'table', skill: 'w.projektorga', difficulty: 2, prompt: 'Ordne jedem Stakeholder des WLAN-Projekts eine Strategie zu: **eng einbinden**, **zufriedenstellen**, **informieren** oder **beobachten**.', columns: [{ key: 's', label: 'Strategie', type: 'text' }], rows: [
      { label: 'Lagerleitung (Auftraggeber) – Einfluss hoch, Interesse hoch', cells: { s: { answer: 'eng einbinden', accept: ['einbinden', 'aktiv einbinden', 'eng einbeziehen', 'einbeziehen', 'managen'] } } },
      { label: 'Geschäftsführung – Einfluss hoch, Interesse gering', cells: { s: { answer: 'zufriedenstellen', accept: ['zufrieden stellen', 'zufriedenhalten', 'zufrieden halten'] } } },
      { label: 'Lagermitarbeitende mit Handscannern – Einfluss gering, Interesse hoch', cells: { s: { answer: 'informieren', accept: ['informiert halten', 'auf dem laufenden halten'] } } },
      { label: 'Kantinenbetreiber im Nachbargebäude – Einfluss gering, Interesse gering', cells: { s: { answer: 'beobachten', accept: ['überwachen', 'monitoren'] } } },
    ], explanation: 'Einfluss hoch + Interesse hoch → **eng einbinden**; Einfluss hoch + Interesse gering → **zufriedenstellen**; Einfluss gering + Interesse hoch → **informieren**; beides gering → **beobachten**.\n\nHäufiger Fehler: die Anwender wegen ihres geringen Einflusses ganz vergessen – sie sind die Hauptnutzer und sollten informiert werden, sonst sinkt die Akzeptanz.', hints: ['Zeichne eine Vier-Felder-Matrix: Einfluss senkrecht, Interesse waagerecht.'] },
    { id: 'w05-q032', kind: 'single', skill: 'w.projektorga', difficulty: 2, prompt: `Welche Zeile der RACI-Matrix verstößt gegen die RACI-Regeln?

| Aufgabe | Projektleitung | Techniker | Einkauf | Auftraggeber |
|---|---|---|---|---|
| (1) Access Points bestellen | A | C | R | I |
| (2) Access Points montieren | A | R | – | A |
| (3) Controller konfigurieren | A | R | – | I |
| (4) Abnahme | R | C | – | A |`, options: ['Zeile 2', 'Zeile 1', 'Zeile 3', 'Zeile 4'], answer: 0, distractors: { '1': { why: 'Zeile 1 hat genau ein A und ein R – korrekt.', error: 'w-raci-regel' }, '2': { why: 'Zeile 3 hat genau ein A und ein R – korrekt.', error: 'w-raci-regel' }, '3': { why: 'Bei der Abnahme ist der Auftraggeber A und die Projektleitung R – das ist zulässig und üblich.', error: 'w-raci-regel' } }, explanation: 'Zeile 2 enthält **zwei A** (Projektleitung und Auftraggeber). Pro Aufgabe darf es nur **genau eine** verantwortliche Stelle geben, sonst ist unklar, wer entscheidet.\n\nHäufiger Fehler: denken, mehrere A seien „doppelt sicher“ – tatsächlich fühlt sich dann oft keiner verantwortlich.' },
    { id: 'w05-q033', kind: 'order', skill: 'w.projektorga', difficulty: 1, prompt: 'Bringe die Teamphasen nach **Tuckman** in die richtige Reihenfolge.', items: ['Forming', 'Storming', 'Norming', 'Performing', 'Adjourning'], explanation: 'Orientierung → Konflikte → Regeln → Leistung → Auflösung.\n\nHäufiger Fehler: Norming vor Storming – Regeln entstehen meist erst, nachdem Konflikte ausgetragen wurden.' },
    { id: 'w05-q034', kind: 'match', skill: 'w.projektorga', difficulty: 2, prompt: 'Ordne die Beobachtungen im Projektteam der Teamphase zu.', left: ['Die Teammitglieder sind höflich und warten ab, welche Rolle sie bekommen.', 'Zwei Techniker streiten, wessen Lösung für das WLAN-Konzept besser ist.', 'Das Team legt fest, dass Tickets täglich um 9 Uhr verteilt werden.', 'Das Team arbeitet eingespielt, Probleme werden selbstständig gelöst.'], right: ['Forming', 'Storming', 'Norming', 'Performing'], answer: [0, 1, 2, 3], explanation: 'Konflikte sind in der Storming-Phase normal; die Projektleitung moderiert sie, statt sie zu unterdrücken.' },
    { id: 'w05-q035', kind: 'free', skill: 'w.projektorga', difficulty: 2, prompt: 'Die Elektro Krämer GmbH überlegt, alle Server in ein Rechenzentrum (Cloud-Hosting) auszulagern. Nenne **vier Aspekte** einer **Machbarkeitsstudie** und formuliere zu jedem eine konkrete Prüffrage.', modelAnswer: '1. Technisch: Reicht die Internetanbindung (Bandbreite, Ausfallsicherheit) für den Zugriff auf die Server? Laufen die Fachanwendungen in der Cloud? 2. Wirtschaftlich: Sind die laufenden Kosten über fünf Jahre geringer als Betrieb und Ersatz der eigenen Server (TCO)? 3. Rechtlich: Werden die Daten DSGVO-konform verarbeitet (Auftragsverarbeitungsvertrag, Serverstandort), Aufbewahrungspflichten eingehalten? 4. Organisatorisch/personell: Haben die Mitarbeitenden das Wissen für Betrieb und Verwaltung? Wer ist Ansprechpartner? 5. Zeitlich: Ist die Migration bis zum Ende der Wartungsverträge der alten Server möglich?', keywords: ['technisch', 'wirtschaftlich', 'rechtlich', 'organisatorisch', 'zeitlich', 'Bandbreite', 'Kosten', 'DSGVO'], explanation: 'Die Machbarkeitsstudie verhindert, dass ein Projekt startet, das sich später als undurchführbar oder unwirtschaftlich herausstellt.' },
    { id: 'w05-q036', kind: 'multi', skill: 'w.projektorga', difficulty: 1, prompt: 'Was gehört typischerweise zu einem **Kick-off-Meeting**?', options: ['Projektziele und Projektauftrag vorstellen', 'Rollen und Zuständigkeiten klären', 'Termine und Meilensteine bekanntgeben', 'Kommunikationswege festlegen (Statusmeeting, Berichte)', 'Das Abnahmeprotokoll unterschreiben'], answer: [0, 1, 2, 3], explanation: 'Das Kick-off ist der offizielle Start. Die Abnahme kommt erst am Projektende.' },
    { id: 'w05-q037', kind: 'table', skill: 'w.projektorga', difficulty: 2, prompt: 'Welchem Aspekt der Machbarkeitsstudie gehört die Prüffrage an? **technisch**, **wirtschaftlich**, **rechtlich**, **organisatorisch** oder **zeitlich**.', columns: [{ key: 'a', label: 'Aspekt', type: 'text' }], rows: [
      { label: 'Muss der Betriebsrat der Einführung der Videoüberwachung zustimmen?', cells: { a: { answer: 'rechtlich' } } },
      { label: 'Amortisieren sich die Kosten der neuen Telefonanlage innerhalb von drei Jahren?', cells: { a: { answer: 'wirtschaftlich' } } },
      { label: 'Unterstützen die vorhandenen Switches PoE für die neuen Access Points?', cells: { a: { answer: 'technisch' } } },
      { label: 'Kann die Umstellung bis zum Start der Inventur im Januar abgeschlossen sein?', cells: { a: { answer: 'zeitlich' } } },
      { label: 'Gibt es im Team jemanden mit Erfahrung in der Firewall-Konfiguration?', cells: { a: { answer: 'organisatorisch', accept: ['personell', 'organisatorisch/personell'] } } },
    ], explanation: 'Gesetze und Mitbestimmung → rechtlich; Kosten und Nutzen → wirtschaftlich; Technik → technisch; Termine → zeitlich; Personal und Know-how → organisatorisch/personell.' },
    { id: 'w05-q046', kind: 'number', skill: 'w.projektorga', difficulty: 1, prompt: 'Wie viele Rollen dürfen in einer RACI-Matrix pro Aufgabe den Buchstaben **A** (Accountable) erhalten?', answer: 1, misconceptions: [{ answer: '2', error: 'w-raci-regel', why: 'Mehrere Verantwortliche führen zu Unklarheit. Es gibt genau ein A pro Aufgabe.' }, { answer: '0', error: 'w-raci-regel', why: 'Ohne A gibt es niemanden, der das Ergebnis verantwortet und freigibt.' }], explanation: '**Genau eine.** Responsible (R) dürfen dagegen mehrere sein; A und R können dieselbe Rolle sein.' },
    { id: 'w05-q047', kind: 'table', skill: 'w.projektorga', difficulty: 2, prompt: 'Welche **Projektorganisationsform** wird beschrieben? Antworte mit **Einfluss**, **rein** oder **Matrix**.', columns: [{ key: 'f', label: 'Form', type: 'text' }], rows: [
      { label: 'Die Projektleiterin darf den Technikern nichts anweisen; sie berät die Abteilungsleitungen, die entscheiden.', cells: { f: { answer: 'Einfluss', accept: ['einfluss-projektorganisation', 'einflussprojektorganisation', 'stab', 'stabs-projektorganisation', 'stabsprojektorganisation'] } } },
      { label: 'Für die Einführung des neuen ERP-Systems werden sechs Mitarbeitende für 18 Monate vollständig freigestellt und arbeiten nur für den Projektleiter.', cells: { f: { answer: 'rein', accept: ['reine', 'reine projektorganisation', 'autonome projektorganisation'] } } },
      { label: 'Ein Netzwerktechniker arbeitet zu 50 % im Projekt „Standort Berlin“; Urlaub und Weiterbildung genehmigt weiter sein Abteilungsleiter.', cells: { f: { answer: 'Matrix', accept: ['matrix-projektorganisation', 'matrixprojektorganisation', 'matrixorganisation'] } } },
    ], explanation: 'Nur beraten → **Einfluss-PO**; ganz aus der Linie herausgelöst → **reine PO**; zwei Vorgesetzte (Projekt und Linie) → **Matrix-PO**.\n\nHäufiger Fehler: Matrix und reine PO verwechseln – entscheidend ist, ob die Mitarbeitenden **noch in ihrer Abteilung** bleiben.' },
    { id: 'w05-q048', kind: 'free', skill: 'w.projektorga', difficulty: 2, prompt: 'Im Projektteam für den neuen Standort streiten zwei Techniker seit Tagen, ob Access Points von Hersteller X oder Y eingesetzt werden; das Team kommt nicht voran. Bestimme die **Teamphase** und nenne **zwei Maßnahmen** der Projektleitung.', modelAnswer: 'Das Team befindet sich in der Storming-Phase (Konflikte, Meinungsverschiedenheiten). Maßnahmen: 1. Konflikt offen ansprechen und moderieren, beide Seiten anhören. 2. Sachliche Entscheidungsgrundlage schaffen, z. B. Nutzwertanalyse mit gemeinsam festgelegten Kriterien (Kosten, Leistung, Management, Support). 3. Entscheidungsregeln und Zuständigkeiten klären (wer entscheidet – RACI), Ergebnis dokumentieren. 4. Gemeinsame Arbeitsregeln vereinbaren, um in die Norming-Phase zu kommen.', keywords: ['Storming', 'moderieren', 'Nutzwertanalyse', 'Kriterien', 'Entscheidung', 'Regeln', 'Norming'], explanation: 'Konflikte im Storming sind normal; sie sollten sachlich gelöst und nicht unterdrückt werden.' },
    /* ---- Gantt, Kalender, Verkürzung (w05-l07) ---- */
    { id: 'w05-q038', kind: 'table', skill: 'w.gantt', difficulty: 1, prompt: `Lies aus dem Gantt-Diagramm für jeden Vorgang die **Dauer** und den **Puffer** (in Arbeitstagen) ab. █ = Vorgang, ░ = Puffer, ◆ = Meilenstein „Übergabe“.

| Vorgang | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| A Planung | █ | █ |   |   |   |   |   |   |   |   |
| B Lieferung | | | █ | █ | █ | █ |   |   |   |   |
| C Image | | | █ | █ | ░ | ░ |   |   |   |   |
| D Installation | | | | | | | █ | █ |   |   |
| E Test und Einweisung | | | | | | | | | █ | █ ◆ |`, columns: [{ key: 'd', label: 'Dauer', type: 'number' }, { key: 'p', label: 'Puffer', type: 'number' }], rows: [
      { label: 'A Planung', cells: { d: { answer: '2' }, p: { answer: '0' } } },
      { label: 'B Lieferung', cells: { d: { answer: '4' }, p: { answer: '0' } } },
      { label: 'C Image', cells: { d: { answer: '2' }, p: { answer: '2' } } },
      { label: 'D Installation', cells: { d: { answer: '2' }, p: { answer: '0' } } },
      { label: 'E Test und Einweisung', cells: { d: { answer: '2' }, p: { answer: '0' } } },
    ], explanation: '**Lösung:** Dauer = Anzahl der █-Felder, Puffer = Anzahl der ░-Felder. Nur **C** hat Puffer (2 Tage). Kritischer Pfad: A → B → D → E (2 + 4 + 2 + 2 = 10 Tage).\n\nHäufiger Fehler: den Puffer zur Dauer zählen (C hätte dann 4 Tage).' },
    { id: 'w05-q039', kind: 'table', skill: 'w.gantt', difficulty: 2, prompt: `Ergänze das Gantt-Diagramm. Jeder Vorgang beginnt so früh wie möglich, der erste Projekttag ist Tag 1. A und B sind bereits eingetragen.

| Vorgang | Dauer (Tage) | Vorgänger |
|---|---|---|
| A Bestandsaufnahme | 3 | – |
| B Konzept | 2 | A |
| C Hardware beschaffen | 4 | A |
| D Konfiguration vorbereiten | 3 | B |
| E Installation und Test | 2 | C, D |`, columns: [{ key: 'von', label: 'von Tag', type: 'number' }, { key: 'bis', label: 'bis Tag', type: 'number' }], rows: [
      { label: 'A', cells: { von: { given: '1' }, bis: { given: '3' } } },
      { label: 'B', cells: { von: { given: '4' }, bis: { given: '5' } } },
      { label: 'C', cells: { von: { answer: '4' }, bis: { answer: '7' } } },
      { label: 'D', cells: { von: { answer: '6' }, bis: { answer: '8' } } },
      { label: 'E', cells: { von: { answer: '9' }, bis: { answer: '10' } } },
    ], hints: ['Start = spätestes Ende aller Vorgänger + 1.', 'Ende = Start + Dauer − 1.'], explanation: `**Lösung:** C 4–7 · D 6–8 · E 9–10 → Projektdauer 10 Tage.

| Vorgang | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| A | █ | █ | █ | | | | | | | |
| B | | | | █ | █ | | | | | |
| C | | | | █ | █ | █ | █ | ░ | | |
| D | | | | | | █ | █ | █ | | |
| E | | | | | | | | | █ | █ |

E muss auf **C (Ende Tag 7) und D (Ende Tag 8)** warten → Start Tag 9. C hat 1 Tag Puffer.

Häufiger Fehler: E schon an Tag 8 beginnen lassen, weil nur auf C geschaut wurde.` },
    { id: 'w05-q040', kind: 'text', skill: 'w.projekttermin', difficulty: 1, prompt: 'Die Einführung eines Ticketsystems dauert **12 Arbeitstage** und beginnt am **Mittwoch, 03.02.2027**. Gearbeitet wird Mo–Fr, im Zeitraum liegen keine Feiertage. Wann ist der letzte Projekttag? (Format TT.MM.JJJJ)', accept: ['18.02.2027', '18.2.2027', '18.02.27', '18.2.27', '2027-02-18', 'do, 18.02.2027', 'donnerstag, 18.02.2027', 'do 18.02.2027', 'donnerstag 18.02.2027'], placeholder: 'TT.MM.JJJJ', misconceptions: [{ answer: '14.02.2027', error: 'w-termin-kalendertage', why: 'Du hast Kalendertage gezählt. Am Wochenende wird nicht gearbeitet.' }, { answer: '19.02.2027', error: 'w-termin-plus-eins', why: 'Ein Tag zu weit: Der Starttag zählt als erster Arbeitstag mit.' }], explanation: '**Ergebnis: Donnerstag, 18.02.2027**\n\nMi 03.02. bis Fr 05.02. = 3 Tage · Mo 08.02. bis Fr 12.02. = 5 Tage (zusammen 8) · Mo 15.02. (9), Di 16.02. (10), Mi 17.02. (11), **Do 18.02. (12)**.\n\nHäufiger Fehler: einfach 12 Kalendertage addieren (ergäbe den 14.02.2027, einen Sonntag).' },
    { id: 'w05-q041', kind: 'order', skill: 'w.projekttermin', difficulty: 1, prompt: 'Bringe die Schritte vom Netzplan zum verbindlichen Übergabetermin in die richtige Reihenfolge.', items: ['Vorgänge mit Dauer und Vorgängern erfassen', 'Vorwärtsrechnung: Projektdauer in Arbeitstagen bestimmen', 'Starttermin und Arbeitskalender (Arbeitstage, Feiertage, Urlaub) festlegen', 'Arbeitstage im Kalender abzählen', 'Übergabetermin mit dem Kunden abstimmen'], explanation: 'Erst die Dauer in Arbeitstagen, dann der Kalender – sonst stimmen Wochenenden und Feiertage nicht.' },
    { id: 'w05-q042', kind: 'single', skill: 'w.projekttermin', difficulty: 2, prompt: `Der Rollout soll schneller fertig werden. Welchen Vorgang solltest du mit einem zusätzlichen Techniker beschleunigen?

| Vorgang | D | Vorgänger | Gesamtpuffer |
|---|---|---|---|
| A Bedarfsanalyse | 2 | – | 0 |
| B Bestellung | 3 | A | 0 |
| C Lieferung und Vorbereitung | 5 | B | 0 |
| D Netzwerk vorbereiten | 4 | A | 4 |
| E Image erstellen | 3 | A | 5 |
| F Installation | 3 | C, D, E | 0 |`, options: ['F Installation – er liegt auf dem kritischen Pfad und lässt sich mit mehr Personal beschleunigen.', 'E Image erstellen – er hat den größten Puffer.', 'D Netzwerk vorbereiten – er dauert am zweitlängsten.', 'Alle Vorgänge gleichmäßig ein bisschen.'], answer: 0, distractors: { '1': { why: 'Ein Vorgang mit Puffer bestimmt das Projektende nicht – ihn zu beschleunigen vergrößert nur seinen Puffer.', error: 'w-verkuerzung-pauschal' }, '2': { why: 'D hat 4 Tage Puffer – eine Verkürzung ändert das Projektende nicht.', error: 'w-verkuerzung-pauschal' }, '3': { why: 'Nur die Vorgänge auf dem kritischen Pfad wirken auf das Projektende; der Rest kostet nur Geld.', error: 'w-verkuerzung-pauschal' } }, explanation: 'Nur kritische Vorgänge (Puffer 0) bestimmen das Projektende. Die **Installation** liegt auf dem kritischen Pfad und lässt sich durch mehr Personal verkürzen. (Auch C ist kritisch – dort hilft eher eine Expresslieferung als ein Techniker.)\n\nHäufiger Fehler: den Vorgang mit dem größten Puffer beschleunigen – das bringt keinen einzigen Tag.' },
    { id: 'w05-q043', kind: 'free', skill: 'w.projekttermin', difficulty: 3, prompt: 'Der Kunde möchte das Projekt „Serverumzug“ **drei Arbeitstage früher** abschließen. Nenne **drei Maßnahmen** und beschreibe jeweils die Auswirkung auf das magische Dreieck. Erkläre außerdem, warum du nach jeder Maßnahme den Netzplan **neu berechnen** musst.', modelAnswer: '1. Zusätzlicher Techniker oder Überstunden beim Umzug der Server (kritischer Vorgang) – Zeit sinkt, Kosten steigen. 2. Techniker von einem Vorgang mit Puffer (z. B. Anwender informieren) auf einen kritischen Vorgang umsetzen – kostenneutral, der Puffer des anderen Vorgangs sinkt. 3. Rack und USV als Lagerware oder per Expresslieferung beschaffen – Kosten steigen. 4. Vorgänge parallelisieren (Backup-Konzept prüfen, während das Rack geliefert wird) – Risiko und Abstimmungsaufwand steigen. 5. Leistungsumfang reduzieren (Dokumentation nach Übergabe nachreichen) – Leistung sinkt, mit Kunde abstimmen. Neu berechnen, weil sich durch die Verkürzung ein anderer Weg zum längsten Weg entwickeln kann; dann verkürzt sich das Projekt weniger als geplant und es gibt einen neuen kritischen Pfad.', keywords: ['kritischer Pfad', 'zusätzliche Ressourcen', 'Kosten', 'Puffer', 'Expresslieferung', 'parallelisieren', 'Leistung', 'neuer kritischer Pfad'], explanation: 'Zeit gewinnt man fast nie umsonst – sie kostet Geld, Leistung oder erhöht das Risiko.' },
    { id: 'w05-q044', kind: 'number', skill: 'w.projekttermin', difficulty: 3, prompt: `Im folgenden Projekt wird **Vorgang C** durch einen zweiten Techniker um **2 Tage** verkürzt (neue Dauer 4). Wie lange dauert das Projekt danach?

| Vorgang | Dauer | Vorgänger |
|---|---|---|
| A | 3 | – |
| B | 4 | A |
| C | 6 | A |
| D | 2 | B |
| E | 3 | C, D |`, answer: 12, unit: 'Tage', misconceptions: [{ answer: '10', error: 'w-verkuerzung-pauschal', why: 'Es gibt **zwei** kritische Pfade (A–C–E und A–B–D–E, je 12 Tage). Verkürzt du nur einen, bleibt der andere mit 12 Tagen bestehen.' }], hints: ['Berechne zuerst alle Wege von A nach E – vor und nach der Verkürzung.'], explanation: '**Ergebnis: 12 Tage** (unverändert)\n\n1. Vorher: A–B–D–E = 3 + 4 + 2 + 3 = 12; A–C–E = 3 + 6 + 3 = 12 → zwei kritische Pfade.\n2. Nachher: A–C–E = 3 + 4 + 3 = 10; A–B–D–E = 12.\n3. Der längste Weg bestimmt die Dauer → weiterhin **12 Tage**. Der zweite Techniker kostet Geld, bringt aber keinen Zeitgewinn – sinnvoll wäre, beide Wege zu verkürzen.\n\nHäufiger Fehler: die Verkürzung einfach vom Projektende abziehen, ohne neu zu rechnen.' },
    { id: 'w05-q045', kind: 'multi', skill: 'w.gantt', difficulty: 2, prompt: 'Welche Aussagen zum **Gantt-Diagramm** sind richtig?', options: ['Die Länge eines Balkens entspricht der Dauer des Vorgangs.', 'Meilensteine werden als Raute ohne Länge dargestellt.', 'Man erkennt auf einen Blick, welche Vorgänge gleichzeitig laufen.', 'Puffer und kritischer Pfad lassen sich ohne Berechnung immer genauer bestimmen als im Netzplan.', 'Ein Balken darf beginnen, bevor alle seine Vorgänger beendet sind, wenn es eine Ende-Anfang-Beziehung gibt.'], answer: [0, 1, 2], explanation: 'Das Gantt-Diagramm ist anschaulich, aber für Puffer und kritischen Pfad braucht man die Berechnung (Netzplan). Bei einer Ende-Anfang-Beziehung beginnt der Nachfolger erst, wenn **alle** Vorgänger beendet sind.' },
  ],
};
