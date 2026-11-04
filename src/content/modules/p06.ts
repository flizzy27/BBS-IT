import type { Module } from '../types';

/** Codeblock-Begrenzer (vermeidet maskierte Backticks im Fließtext) */
const F = '```';

export const p06: Module = {
  id: 'p06',
  nr: 6,
  area: 'programmierung',
  title: 'Softwareentwicklungsprozess: Vorgehensmodelle, Testprozess & Dokumentation',
  short: 'Phasen der Softwareentwicklung, Anpassung von Standardsoftware, Wasserfall, V-Modell, Spirale, Scrum und Kanban, Testprozess mit Testprotokoll (Soll/Ist), Alpha/Beta/RC, Dokumentation und gute Kommentare.',
  icon: 'Workflow',
  relevance: 'ap1',
  prerequisites: ['p05'],
  generators: ['p.testprotokoll'],
  skills: [
    { id: 'sw.lifecycle', module: 'p06', title: 'Phasen der Softwareentwicklung & Anpassung von Standardsoftware' },
    { id: 'sw.models', module: 'p06', title: 'Klassische Vorgehensmodelle: Wasserfall, V-Modell, Spirale', requires: ['sw.lifecycle'] },
    { id: 'sw.agile', module: 'p06', title: 'Agile Vorgehensmodelle: Scrum und Kanban', requires: ['sw.models'] },
    { id: 'qa.testprotocol', module: 'p06', title: 'Testprozess, Testdokumente & Testprotokoll (Soll/Ist)', requires: ['qa.testing'] },
    { id: 'sw.docs', module: 'p06', title: 'Software dokumentieren & sinnvoll kommentieren', requires: ['sw.lifecycle'] },
  ],
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'p06-l01',
      title: 'Vom Auftrag zur Software: Phasen und Anpassung von Standardsoftware',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['sw.lifecycle'],
      simple: `Software entsteht in Phasen – wie ein Hausbau. Erst wird geklärt, was der Kunde braucht (Analyse), dann wird der Bauplan gezeichnet (Entwurf), dann gebaut (Implementierung = Programmieren), geprüft (Test), übergeben (Einführung) und später repariert oder erweitert (Wartung). Oft muss man gar nicht neu bauen: Fertige Standardsoftware (für viele Kunden gemacht, z. B. ein Warenwirtschaftsprogramm) lässt sich anpassen. Dabei gilt: so wenig Eingriff wie möglich – erst die vorhandenen Einstellungen nutzen, erst dann zusätzlich programmieren.

**Merke:** Analyse → Entwurf → Implementierung → Test → Einführung → Wartung; Standardsoftware zuerst konfigurieren und parametrisieren, erst danach erweitern oder neu entwickeln.`,
      steps: [
        {
          type: 'explain',
          title: 'Die Phasen der Softwareentwicklung',
          body: `Jedes Softwareprojekt durchläuft dieselben **Tätigkeiten** – egal, ob streng nacheinander (Wasserfall) oder in vielen kleinen Runden (agil). Jede Phase hat ein **Ergebnis**, meist ein Dokument oder ein lauffähiger Stand:

| Phase | Was passiert? | typisches Ergebnis |
|---|---|---|
| **Analyse** (Anforderungsanalyse) | Ist-Zustand aufnehmen, Anforderungen erheben (funktional: *was* soll die Software tun; nicht funktional: *wie gut*, z. B. Antwortzeit, Sicherheit), Machbarkeit und Aufwand schätzen | **Lastenheft** (Auftraggeber: was und wofür), **Pflichtenheft** (Auftragnehmer: wie und womit) |
| **Entwurf** (Design) | Aufbau planen: Module, Schnittstellen, Datenmodell, Oberflächen; Modellierung mit UML | Architektur, Klassen-, Aktivitäts-, Anwendungsfalldiagramm, ER-Modell |
| **Implementierung** | programmieren, Komponententests schreiben, Versionsverwaltung nutzen | Quellcode, lauffähiges Programm |
| **Test** | Integrations-, System- und Abnahmetest | Testprotokolle, Abnahmeprotokoll |
| **Einführung** (Auslieferung, Inbetriebnahme) | installieren, Altdaten übernehmen (**Datenmigration**), Anwender schulen | produktives System, Übergabe-/Abnahmeprotokoll, Benutzerdokumentation |
| **Wartung und Pflege** | Fehler beheben, an neue Umgebungen anpassen (z. B. neues Betriebssystem), erweitern, Sicherheitsupdates | neue Versionen (Releases, Patches) |

Die **Dokumentation** ist keine eigene Phase am Ende, sondern läuft **begleitend** mit – sonst fehlt am Ende Wissen, das niemand mehr aufschreibt.

**Achtung, Begriffsdoppelung:** Das Projektmanagement nach DIN 69901 nennt andere Phasen (Initialisierung, Definition, Planung, Steuerung, Abschluss – siehe Modul w05). Das sind die Phasen der **Projektsteuerung**; die Tabelle oben zeigt die **fachlichen Tätigkeiten** der Softwareentwicklung. Schulbücher benennen die Phasen leicht unterschiedlich (z. B. „Umsetzung“ statt „Implementierung“, „Auslieferung“ statt „Einführung“) – gemeint ist dasselbe.`,
        },
        {
          type: 'explain',
          title: 'Kaufen und anpassen statt neu entwickeln',
          body: `**Standardsoftware** wird für viele Kunden entwickelt (z. B. ein ERP- oder Warenwirtschaftssystem), **Individualsoftware** für genau einen Auftraggeber (Details und Make-or-Buy: Modul b03). Standardsoftware passt nie zu 100 % – sie wird deshalb **angepasst**. Grundregel: **so viel Standard wie möglich**, denn jeder tiefere Eingriff kostet Geld und macht Updates schwieriger.

| Stufe | Was wird gemacht? | Beispiel Warenwirtschaft | Quellcode geändert? | Risiko bei Updates |
|---|---|---|---|---|
| 1. **Konfiguration** | benötigte Module und Funktionen **auswählen und aktivieren** | Modul „Lager“ einschalten, Modul „Produktion“ weglassen | nein | gering |
| 2. **Parametrisierung** | das Verhalten über **vorgesehene Einstellungen (Parameter)** festlegen | Nummernkreis „EK-2027-…“, Mahnstufen, Steuersätze, Rechnungslayout | nein | gering |
| 3. **Erweiterungsprogrammierung** (Add-on) | Zusatzfunktionen über **vom Hersteller vorgesehene Schnittstellen** programmieren (API, Skripte, Plug-ins); der Kern bleibt unverändert | Anbindung des Paketdienstes über die Programmierschnittstelle (API) | Kern: nein, eigener Zusatzcode: ja | mittel – Erweiterung nach jedem Update testen |
| 4. **Modifikation / Individualentwicklung** | Quellcode des Standards ändern oder Teile neu entwickeln | Kalkulationsschema im Kern umschreiben | ja | hoch – Updates überschreiben Änderungen, Herstellersupport kann entfallen |

**Customizing** ist der Oberbegriff für das Anpassen von Standardsoftware an ein Unternehmen. Im engeren Sinn meint man damit Konfiguration und Parametrisierung (ohne Programmierung); manche Quellen zählen die Erweiterungsprogrammierung dazu.

**Datenmigration** = vorhandene Daten aus dem Altsystem ins neue System übernehmen. Ablauf: Altbestand analysieren → Daten bereinigen (Dubletten, veraltete Sätze) → Felder zuordnen (**Mapping**: altes Feld „KdNr“ → neues Feld „Kundennummer“) → **Testmigration** und Prüfung (Anzahl Datensätze, Stichproben) → Echtmigration → Ergebnis prüfen, Altsystem archivieren. Personenbezogene Daten dürfen dabei nur im Rahmen der DSGVO übernommen werden (Zweckbindung, Löschfristen).`,
        },
        {
          type: 'visual',
          title: 'Sechs Phasen – ein Lebenszyklus',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Analyse', text: 'Was braucht der Kunde? Lastenheft und Pflichtenheft.', icon: 'Search' },
                { title: 'Entwurf', text: 'Wie wird es gebaut? Architektur, Schnittstellen, UML.', icon: 'PenTool' },
                { title: 'Implementierung', text: 'Programmieren und Komponententests.', icon: 'Code' },
                { title: 'Test', text: 'Integration, System, Abnahme – mit Protokoll.', icon: 'ClipboardCheck' },
                { title: 'Einführung', text: 'Installation, Datenmigration, Schulung.', icon: 'Rocket' },
                { title: 'Wartung', text: 'Fehler beheben, anpassen, erweitern – neue Versionen.', icon: 'Wrench' },
              ],
            },
          },
          caption: 'Die Dokumentation begleitet alle Phasen. Nach der Wartung beginnt für eine neue Version oft wieder die Analyse.',
        },
        {
          type: 'example',
          title: 'Eine neue Warenwirtschaft für die Elektro Krämer GmbH',
          problem: 'Die Elektro Krämer GmbH führt eine Standard-Warenwirtschaft ein. Ordne die geplanten Maßnahmen den Anpassungsstufen zu und gib eine Empfehlung:\n\n1. Das Kassenmodul wird nicht benötigt.\n2. Rechnungsnummern sollen mit „EK-2027-“ beginnen.\n3. Der Paketdienst soll über die vom Hersteller dokumentierte REST-Schnittstelle angebunden werden.\n4. Der Vertrieb wünscht, dass die Preisberechnung im Programmkern umgeschrieben wird.\n5. 18 000 Kundendatensätze aus der alten Access-Datenbank sollen übernommen werden.',
          steps: [
            { label: 'Maßnahme 1', body: 'Modul nicht aktivieren → **Konfiguration**.' },
            { label: 'Maßnahme 2', body: 'Nummernkreis über eine vorgesehene Einstellung → **Parametrisierung**.' },
            { label: 'Maßnahme 3', body: 'Zusatzcode über eine Herstellerschnittstelle, Kern bleibt unverändert → **Erweiterungsprogrammierung**.' },
            { label: 'Maßnahme 4', body: 'Eingriff in den Quellcode → **Modifikation**. Empfehlung: vermeiden. Erst prüfen, ob sich die gewünschte Preisberechnung über Parameter (z. B. Preisgruppen, Rabattstaffeln) abbilden lässt.' },
            { label: 'Maßnahme 5', body: 'Altdaten übernehmen → **Datenmigration**: erst bereinigen und Felder zuordnen, dann Testmigration mit Prüfung der Datensatzanzahl (18 000) und Stichproben.' },
          ],
          result: 'Konfiguration · Parametrisierung · Erweiterungsprogrammierung · Modifikation (vermeiden) · Datenmigration',
        },
        {
          type: 'check',
          question: {
            id: 'p06-c01', kind: 'single', skill: 'sw.lifecycle', difficulty: 1,
            prompt: 'In welcher Phase der Softwareentwicklung entstehen **Lastenheft** und **Pflichtenheft**?',
            options: ['Analyse', 'Entwurf', 'Test', 'Wartung'],
            answer: 0,
            distractors: {
              '1': { why: 'Im Entwurf wird bereits geplant, **wie** gebaut wird (Architektur, UML). Die Anforderungen müssen dafür schon feststehen.', error: 'sw-phasen' },
              '2': { why: 'Im Test werden Lasten- und Pflichtenheft **verwendet** (als Soll), aber nicht erstellt.', error: 'sw-phasen' },
              '3': { why: 'Die Wartung beginnt erst nach der Einführung.', error: 'sw-phasen' },
            },
            explanation: 'Die Anforderungen werden in der **Analyse** erhoben und im Lastenheft (Auftraggeber) und Pflichtenheft (Auftragnehmer) festgehalten. Sie sind später das Soll für Test und Abnahme.',
          },
        },
        { type: 'practice', title: 'Übung: Phasen und Anpassung', questionIds: ['p06-q001', 'p06-q002', 'p06-q003', 'p06-q004', 'p06-q005', 'p06-q006', 'p06-q007'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Phasen: Analyse → Entwurf → Implementierung → Test → Einführung → Wartung; Dokumentation begleitend.', 'Lasten- und Pflichtenheft entstehen in der Analyse und sind das Soll für Test und Abnahme.', 'Anpassung von Standardsoftware: Konfiguration → Parametrisierung → Erweiterungsprogrammierung → Modifikation (möglichst vermeiden).', 'Datenmigration: bereinigen, Felder zuordnen (Mapping), Testmigration, prüfen.'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p06-l02',
      title: 'Klassische Vorgehensmodelle: Wasserfall, V-Modell und Spirale',
      minutes: 25,
      relevance: 'ap1-teilweise',
      skills: ['sw.models'],
      simple: `Ein Vorgehensmodell ist der Fahrplan für ein Softwareprojekt: Es legt fest, in welcher Reihenfolge gearbeitet wird. Beim Wasserfallmodell fließt die Arbeit wie Wasser über Stufen nach unten – eine Phase muss fertig sein, bevor die nächste beginnt. Das V-Modell ist ein Wasserfall mit eingebautem Prüfplan: Zu jeder Planungsstufe gehört eine passende Teststufe. Das Spiralmodell arbeitet in Runden und fragt in jeder Runde zuerst: Was ist gerade das größte Risiko?

**Merke:** Wasserfall und V-Modell passen bei klaren, festen Anforderungen; bei unklaren Anforderungen und hohem Risiko sind Modelle mit Wiederholungen (Spirale, agil) besser.`,
      steps: [
        {
          type: 'explain',
          title: 'Drei klassische Fahrpläne',
          body: `Ein **Vorgehensmodell** legt fest, **in welcher Reihenfolge** die Phasen durchlaufen werden, welche Ergebnisse jede Phase liefert und wer wann beteiligt ist.

**Wasserfallmodell** – die Phasen laufen **streng nacheinander**. Jede Phase endet mit einem Ergebnis (Dokument, Meilenstein = Prüfpunkt), erst dann beginnt die nächste. Im erweiterten Modell ist ein Rücksprung in die **vorherige** Phase erlaubt.
- Vorteile: einfach zu verstehen und zu planen, klare Meilensteine und Dokumente, Termine und Kosten gut kalkulierbar (gut für Festpreisaufträge).
- Nachteile: Alle Anforderungen müssen am Anfang feststehen; der Kunde sieht lauffähige Software erst spät; Fehler aus der Analyse fallen oft erst im Test auf – dann ist ihre Behebung teuer; Änderungswünsche sind aufwendig.

**V-Modell** – eine Weiterentwicklung des Wasserfalls. Der linke Ast beschreibt die **Spezifikation** von grob nach fein, unten liegt die **Implementierung**, der rechte Ast enthält die **Teststufen** von fein nach grob. Jede Teststufe prüft gegen das Dokument, das ihr **gegenüber** steht:

| linker Ast (Spezifikation) | ↔ | rechter Ast (Test) |
|---|---|---|
| Anforderungsdefinition (Lasten-/Pflichtenheft) | ↔ | **Abnahmetest** |
| funktionaler Systementwurf | ↔ | **Systemtest** |
| technischer Systementwurf (Architektur) | ↔ | **Integrationstest** |
| Komponentenspezifikation (Feinentwurf) | ↔ | **Komponententest** |

- Vorteile: Qualitätssicherung von Anfang an – die Testfälle werden **gleichzeitig** mit der jeweiligen Spezifikation geplant; klare Verantwortlichkeiten und Nachweise.
- Nachteile: hoher Dokumentationsaufwand, für kleine Projekte zu schwerfällig, bei Änderungen ebenso unflexibel wie der Wasserfall.
- Das **V-Modell XT** („eXtreme Tailoring“ = stark zuschneidbar) ist die deutsche Weiterentwicklung und wird vor allem bei IT-Projekten der **öffentlichen Verwaltung** eingesetzt.

**Spiralmodell** (Barry Boehm, 1986) – **iterativ** (in Wiederholungen) und **risikogetrieben**. Jede Runde der Spirale hat vier Schritte:
1. Ziele, Alternativen und Rahmenbedingungen festlegen
2. Alternativen bewerten, **Risiken analysieren** und verringern (z. B. mit einem **Prototyp** = früher Testversion)
3. Entwickeln und testen (Ergebnis dieser Runde)
4. Nächste Runde planen (Review mit dem Kunden)

Mit jeder Runde wächst das Produkt – und die Kosten (die Spirale wird breiter).
- Vorteile: Risiken werden früh erkannt, Kunde regelmäßig eingebunden, flexibel bei Änderungen.
- Nachteile: hoher Steuerungsaufwand, Erfahrung in Risikoanalyse nötig, Gesamtdauer und -kosten schwer vorherzusagen.

**Iterativ vs. inkrementell:** *iterativ* = in Wiederholungen verbessern, *inkrementell* = in Ausbaustufen wachsen. Agile Verfahren (nächste Lektion) sind beides.

| | Wasserfall | V-Modell | Spirale |
|---|---|---|---|
| Ablauf | linear, Phasen einmal | linear, Entwicklung ↔ Test gespiegelt | Zyklen (iterativ) |
| Anforderungen | müssen früh feststehen | müssen früh feststehen | dürfen sich entwickeln |
| Kundeneinbindung | vor allem am Anfang und bei der Abnahme | Anfang und Abnahme | in jeder Runde |
| Stärke | einfache Planung | systematische Qualitätssicherung | Risikobeherrschung |
| typisch für | kleine, klar umrissene Projekte | große, sicherheitskritische und öffentliche Projekte | große, neuartige, riskante Projekte |`,
        },
        {
          type: 'visual',
          title: 'Drei klassische Modelle auf einen Blick',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Wasserfall', text: 'Analyse → Entwurf → Implementierung → Test → Einführung. Eine Phase nach der anderen, Rücksprung nur zur Vorphase.', icon: 'Waves' },
                { title: 'V-Modell', text: 'Links Spezifikation, unten Implementierung, rechts Tests. Jede Teststufe prüft gegen ihr Gegenstück.', icon: 'GitMerge' },
                { title: 'Spiralmodell', text: 'Runden aus Ziele → Risikoanalyse/Prototyp → Entwickeln/Testen → Planen. Risiko steuert den Ablauf.', icon: 'RefreshCw' },
              ],
            },
          },
          caption: 'Je unsicherer die Anforderungen, desto wichtiger sind Wiederholungen und frühes Feedback.',
        },
        {
          type: 'example',
          title: 'Welches Modell für welches Projekt?',
          problem: 'Das IT-Systemhaus hat drei Anfragen:\n\n| Projekt | Beschreibung |\n|---|---|\n| A | Schnittstelle Kasse → Warenwirtschaft für die Elektro Krämer GmbH; alle Felder und Formate stehen im Pflichtenheft fest, Festpreis |\n| B | Fachanwendung für eine Landesbehörde; Ausschreibung verlangt Nachweise zu jeder Entwicklungs- und Teststufe |\n| C | Neuartige Bilderkennung zur Qualitätskontrolle; ob die Erkennung zuverlässig genug funktioniert, ist unklar |\n\nEmpfiehl je ein klassisches Vorgehensmodell und begründe.',
          steps: [
            { label: 'Projekt A', body: 'Anforderungen vollständig bekannt, Umfang klein, Festpreis → **Wasserfall**: einfache Planung, klarer Abnahmezeitpunkt.' },
            { label: 'Projekt B', body: 'Nachweispflichten für jede Stufe, öffentlicher Auftraggeber → **V-Modell (XT)**: zu jeder Spezifikation ein Test mit Protokoll.' },
            { label: 'Projekt C', body: 'Hohes technisches Risiko, Machbarkeit unklar → **Spiralmodell**: zuerst Risiko mit Prototyp prüfen, dann Runde für Runde ausbauen (alternativ agil).' },
          ],
          result: 'A: Wasserfall · B: V-Modell · C: Spiralmodell (oder agil)',
        },
        {
          type: 'check',
          question: {
            id: 'p06-c02', kind: 'match', skill: 'sw.models', difficulty: 2,
            prompt: 'Im V-Modell steht jeder Spezifikationsstufe eine Teststufe gegenüber. Ordne zu.',
            left: ['Anforderungsdefinition (Lasten-/Pflichtenheft)', 'funktionaler Systementwurf', 'technischer Systementwurf (Architektur)', 'Komponentenspezifikation'],
            right: ['Abnahmetest', 'Systemtest', 'Integrationstest', 'Komponententest'],
            answer: [0, 1, 2, 3],
            explanation: 'Von außen nach innen: Anforderungen ↔ Abnahme, Systementwurf ↔ Systemtest, Architektur (Zusammenspiel der Teile) ↔ Integrationstest, Feinentwurf einer Komponente ↔ Komponententest.',
          },
        },
        { type: 'practice', title: 'Übung: Klassische Vorgehensmodelle', questionIds: ['p06-q008', 'p06-q009', 'p06-q010', 'p06-q011', 'p06-q012', 'p06-q013'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Wasserfall: Phasen nacheinander, einfach planbar, Fehler und Änderungen werden spät teuer.', 'V-Modell: Spezifikation links, Tests rechts, jede Teststufe prüft gegen ihr Gegenstück; viel Dokumentation.', 'Spirale: Runden mit Risikoanalyse und Prototypen; flexibel, aber aufwendig zu steuern.', 'Feste Anforderungen → Wasserfall/V-Modell; unklare Anforderungen, hohes Risiko → Spirale oder agil.'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p06-l03',
      title: 'Agil arbeiten: Scrum und Kanban',
      minutes: 30,
      relevance: 'ap1-teilweise',
      skills: ['sw.agile'],
      simple: `Agil heißt: in kurzen Etappen liefern und nach jeder Etappe nachsteuern – wie eine Wanderung, bei der man an jeder Hütte neu auf die Karte schaut, statt die ganze Route vorher festzulegen. Bei Scrum arbeitet ein kleines Team in Sprints (feste Etappen von höchstens einem Monat); am Ende jedes Sprints steht ein nutzbares Stück Software. Der Product Owner entscheidet, was am wichtigsten ist, der Scrum Master sorgt dafür, dass Scrum gut funktioniert, und die Entwickler setzen um. Kanban ist eine Pinnwand mit Spalten wie „Zu erledigen – In Arbeit – Erledigt“; es gibt keine Sprints, aber eine Obergrenze für gleichzeitig laufende Aufgaben (WIP-Limit, „Work in Progress“).

**Merke:** Scrum = Sprints mit 3 Verantwortlichkeiten, 5 Ereignissen und 3 Artefakten; Kanban = Board, WIP-Limit, ständiger Fluss ohne Sprints.`,
      steps: [
        {
          type: 'explain',
          title: 'Agiles Manifest und Scrum',
          body: `Das **Agile Manifest** (2001) stellt vier Werte auf. Die Dinge auf der rechten Seite sind nicht wertlos – die linken zählen aber **mehr**:

| wichtiger … | … als |
|---|---|
| Individuen und Interaktionen | Prozesse und Werkzeuge |
| funktionierende Software | umfassende Dokumentation |
| Zusammenarbeit mit dem Kunden | Vertragsverhandlung |
| Reagieren auf Veränderung | Befolgen eines Plans |

**Scrum** ist das bekannteste agile Rahmenwerk (Stand: Scrum Guide 2020). Grundlage sind drei Säulen: **Transparenz**, **Überprüfung**, **Anpassung**.

**Drei Verantwortlichkeiten (Rollen):**

| Rolle | Aufgabe | häufiger Irrtum |
|---|---|---|
| **Product Owner** (PO) | **eine** Person; verantwortet und **ordnet (priorisiert) das Product Backlog**, maximiert den Wert des Produkts, spricht mit den Stakeholdern (Beteiligten) | „Der PO ist der Kunde.“ – Nein, er vertritt die Interessen von Kunden und Stakeholdern im Team. |
| **Scrum Master** | sorgt dafür, dass Scrum verstanden und gelebt wird; Coach für Team und Organisation; beseitigt **Hindernisse** (Impediments); moderiert bei Bedarf | „Der Scrum Master ist der Projektleiter.“ – Nein, er verteilt keine Aufgaben und ist nicht weisungsbefugt. |
| **Developers** (Entwickler) | setzen die Backlog-Einträge um, planen ihren Sprint selbst, sorgen für Qualität (Definition of Done) | Sie organisieren sich **selbst** – niemand teilt ihnen Aufgaben zu. |

Das ganze Scrum Team ist klein: laut Scrum Guide 2020 in der Regel **höchstens 10 Personen**. Viele Schulbücher nennen noch die ältere Angabe „Entwicklungsteam 3 bis 9 Personen“.

**Fünf Ereignisse** (alle mit fester Höchstdauer, „Timebox“; Werte für einen Monats-Sprint):

| Ereignis | Zweck | Dauer |
|---|---|---|
| **Sprint** | Rahmen für alles andere; am Ende steht ein nutzbares **Inkrement**. Feste Länge, der nächste beginnt sofort. Abbrechen darf ihn nur der PO, wenn das Sprint-Ziel hinfällig wird. | **höchstens 1 Monat** (oft 2 Wochen) |
| **Sprint Planning** | Was wird in diesem Sprint geliefert und wie? Ergebnis: Sprint-Ziel und Sprint Backlog | max. 8 h |
| **Daily Scrum** | Developers prüfen täglich den Fortschritt zum Sprint-Ziel und passen ihren Plan an | **15 Minuten** |
| **Sprint Review** | Ergebnis den Stakeholdern **vorführen**, Feedback einholen, Product Backlog anpassen | max. 4 h |
| **Sprint Retrospektive** | Das Team verbessert seine **Zusammenarbeit und Arbeitsweise**; letztes Ereignis des Sprints | max. 3 h |

**Drei Artefakte:**

| Artefakt | Inhalt | Verpflichtung (Commitment) |
|---|---|---|
| **Product Backlog** | geordnete Liste **aller** Anforderungen an das Produkt, z. B. als User Stories | Produktziel |
| **Sprint Backlog** | Sprint-Ziel + die für den Sprint ausgewählten Einträge + Umsetzungsplan; gehört den Developers | Sprint-Ziel |
| **Inkrement** | nutzbares, geprüftes Ergebnis | **Definition of Done** (gemeinsame Vereinbarung, wann etwas „fertig“ ist) |

**Werkzeuge, die oft dazugehören:** **User Story** („Als *Rolle* möchte ich *Ziel*, damit *Nutzen*.“ plus Akzeptanzkriterien), **Story Points** (relatives Aufwandsmaß), **Velocity** (geschaffte Story Points je Sprint) und **Burn-down-Chart** (Restaufwand über die Zeit – die Linie soll bis Sprintende auf 0 fallen; liegt sie deutlich über der Ideallinie, ist das Sprint-Ziel gefährdet).`,
        },
        {
          type: 'explain',
          title: 'Kanban – und der Vergleich',
          body: `**Kanban** (japanisch „Karte, Signal“) stammt aus der Produktionssteuerung bei Toyota und wird heute für Wissensarbeit genutzt, besonders für **laufende Aufgaben** wie IT-Support oder Betrieb. Grundideen:
- **Arbeit sichtbar machen:** Board mit Spalten, z. B. *Zu erledigen – In Arbeit – Test – Erledigt*; jede Aufgabe ist eine Karte.
- **Laufende Arbeit begrenzen (WIP-Limit):** Pro Spalte ist nur eine Höchstzahl Karten erlaubt. Das verhindert, dass vieles angefangen und wenig fertig wird.
- **Pull-Prinzip:** Eine neue Karte wird erst „gezogen“, wenn in der Spalte Platz frei ist.
- **Fluss messen und verbessern:** z. B. **Durchlaufzeit** (wie lange braucht eine Karte von Start bis Erledigt?).
- Keine Sprints, keine vorgeschriebenen Rollen; Prioritäten dürfen sich jederzeit ändern.

| | Wasserfall | Scrum | Kanban |
|---|---|---|---|
| Planung | einmal am Anfang | je Sprint (Product Backlog laufend) | fortlaufend |
| Rhythmus | Phasen | feste Sprints ≤ 1 Monat | kontinuierlicher Fluss |
| Rollen | Projektleitung, Fachabteilung … | PO, Scrum Master, Developers | keine vorgeschrieben |
| Änderungen | aufwendig (Änderungsantrag) | zwischen Sprints über das Product Backlog | jederzeit |
| Begrenzung | Umfang laut Pflichtenheft | Umfang je Sprint | WIP-Limit je Spalte |
| typische Kennzahl | Meilenstein erreicht? | Velocity, Burn-down | Durchlaufzeit |
| passt zu | festen Anforderungen | Produktentwicklung mit wechselnden Anforderungen | Support, Betrieb, Wartung |

**Weitere Begriffe:** **Extreme Programming (XP)** – agile Praktiken wie Pair Programming (zwei Personen an einem Rechner), testgetriebene Entwicklung und sehr kurze Releases. **DevOps** – Entwicklung (Development) und Betrieb (Operations) arbeiten eng zusammen; Auslieferung mit automatisierten Pipelines (CI/CD).`,
        },
        {
          type: 'visual',
          title: 'Scrum in drei Dreiern … fast',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: '3 Verantwortlichkeiten', text: 'Product Owner (Was zuerst?), Scrum Master (Scrum funktioniert, Hindernisse weg), Developers (Umsetzung, selbstorganisiert).', icon: 'Users' },
                { title: '5 Ereignisse', text: 'Sprint (≤ 1 Monat) mit Sprint Planning, Daily Scrum (15 min), Sprint Review, Sprint Retrospektive.', icon: 'CalendarClock' },
                { title: '3 Artefakte', text: 'Product Backlog (Produktziel), Sprint Backlog (Sprint-Ziel), Inkrement (Definition of Done).', icon: 'ListChecks' },
              ],
            },
          },
          caption: 'Review = Produkt zeigen (Was haben wir gebaut?). Retrospektive = Zusammenarbeit verbessern (Wie haben wir gearbeitet?).',
        },
        {
          type: 'example',
          title: 'Wie viele Sprints brauchen wir noch?',
          problem: 'Im Product Backlog eines Kundenportals stehen noch Einträge mit insgesamt **210 Story Points**. Das Team hat in den letzten drei Sprints **28, 32 und 30** Story Points geschafft. Ein Sprint dauert **2 Wochen**. Schätze, wie viele Sprints und Wochen das Team noch braucht (angefangene Sprints zählen voll).',
          steps: [
            { label: 'Velocity bilden', body: 'Durchschnitt der letzten Sprints: (28 + 32 + 30) SP ÷ 3 = 90 SP ÷ 3 = **30 SP je Sprint**.' },
            { label: 'Sprints berechnen', body: '210 SP ÷ 30 SP je Sprint = **7 Sprints** (geht glatt auf).' },
            { label: 'In Wochen umrechnen', body: '7 Sprints · 2 Wochen = **14 Wochen**.' },
            { label: 'Einordnen', body: 'Das ist eine **Schätzung**: Neue oder geänderte Backlog-Einträge verschieben das Ergebnis. Deshalb rechnet man nach jedem Sprint neu.' },
          ],
          result: '7 Sprints ≈ 14 Wochen',
        },
        {
          type: 'check',
          question: {
            id: 'p06-c03', kind: 'match', skill: 'sw.agile', difficulty: 1,
            prompt: 'Ordne die Scrum-Begriffe der richtigen Kategorie zu.',
            left: ['Product Owner', 'Daily Scrum', 'Sprint Backlog', 'Scrum Master', 'Sprint Retrospektive', 'Inkrement'],
            right: ['Verantwortlichkeit (Rolle)', 'Ereignis', 'Artefakt'],
            answer: [0, 1, 2, 0, 1, 2],
            explanation: 'Rollen: Product Owner, Scrum Master, Developers. Ereignisse: Sprint, Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospektive. Artefakte: Product Backlog, Sprint Backlog, Inkrement.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'p06-c04', kind: 'number', skill: 'sw.agile', difficulty: 1,
            prompt: 'Das Product Backlog umfasst noch **180 Story Points**, die Velocity des Teams liegt bei **30 Story Points je Sprint**. Wie viele Sprints werden voraussichtlich noch benötigt?',
            answer: 6,
            unit: 'Sprints',
            hints: ['Restaufwand ÷ Velocity.'],
            misconceptions: [{ answer: '5400', error: 'velocity-rechnung', why: 'Du hast multipliziert. Gesucht ist, wie oft 30 SP in 180 SP passen → teilen.' }],
            explanation: '180 SP ÷ 30 SP je Sprint = **6 Sprints**.',
          },
        },
        { type: 'practice', title: 'Übung: Scrum und Kanban', questionIds: ['p06-q014', 'p06-q015', 'p06-q016', 'p06-q017', 'p06-q018', 'p06-q019', 'p06-q020', 'p06-q021', 'p06-q022', 'p06-q023'], count: 6, difficulty: 2 },
        { type: 'summary', points: ['Agiles Manifest: Menschen, funktionierende Software, Kundenzusammenarbeit und Reagieren auf Veränderung zählen mehr.', 'Scrum: Product Owner (ordnet das Backlog), Scrum Master (Scrum ermöglichen, Hindernisse beseitigen), Developers (selbstorganisiert).', 'Sprint ≤ 1 Monat; Daily 15 min; Review = Produkt zeigen; Retrospektive = Zusammenarbeit verbessern.', 'Artefakte: Product Backlog, Sprint Backlog, Inkrement (Definition of Done).', 'Kanban: Board, WIP-Limit, Pull-Prinzip, keine Sprints – ideal für Support und Betrieb.'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p06-l04',
      title: 'Testprozess, Testdokumente und Testprotokoll',
      minutes: 30,
      relevance: 'ap1',
      skills: ['qa.testprotocol'],
      simple: `Ein Test ist wie ein Probelauf mit Checkliste: Vorher schreibst du auf, was herauskommen soll (Soll), dann probierst du es aus und notierst, was wirklich herauskommt (Ist). Stimmen Soll und Ist überein, ist der Testfall bestanden – sonst hast du einen Fehler gefunden. All das steht im Testprotokoll (dem schriftlichen Nachweis, was wann von wem getestet wurde). Bevor ein Programm an alle geht, testen es erst die eigenen Leute (Alpha-Test), dann ausgewählte echte Nutzer bei sich (Beta-Test); die fast fertige Version heißt Release Candidate.

**Merke:** Das Soll kommt aus der Anforderung, das Ist aus dem Programm – nur wenn beide genau gleich sind, ist der Testfall bestanden.`,
      steps: [
        {
          type: 'explain',
          title: 'Der Testprozess und seine Dokumente',
          body: `Testen ist kein spontanes Ausprobieren, sondern ein geplanter **Prozess** in sechs Schritten:

| Schritt | Was passiert? | Dokument |
|---|---|---|
| 1. **Testplanung** | Testziele, Umfang, Teststufen, Verfahren, Personal, Termine, Testumgebung und **Endekriterien** (wann ist genug getestet?) festlegen | **Testkonzept** (Testplan) |
| 2. **Testanalyse und Testentwurf** | aus Anforderungen Testfälle ableiten (Äquivalenzklassen, Grenzwerte, Entscheidungstabellen); jeweils Vorbedingung, Eingabe und **erwartetes Ergebnis (Soll)** festlegen | **Testfallspezifikation** |
| 3. **Testvorbereitung** (Realisierung) | Testdaten erstellen, Testumgebung aufbauen, Abläufe festlegen, ggf. automatisieren | Testdaten, Testablauf |
| 4. **Testdurchführung** | Testfälle ausführen, **Ist** notieren | **Testprotokoll** |
| 5. **Testauswertung** | Soll und Ist vergleichen, Abweichungen bewerten und melden, Endekriterien prüfen | **Abweichungs-/Fehlerbericht** |
| 6. **Testabschluss** | Ergebnisse zusammenfassen, offene Fehler bewerten, Freigabe empfehlen, Erfahrungen sichern | **Testabschlussbericht** |

Die Dokumente sind in der Norm ISO/IEC/IEEE 29119-3 beschrieben (früher IEEE 829). Andere Bücher fassen die Schritte etwas anders zusammen (z. B. „Planung und Steuerung“) – die Reihenfolge bleibt gleich.

**Aufbau eines Testprotokolls** – typische Belegaufgabe in der AP1:

| Bereich | Inhalt |
|---|---|
| Kopf | Projekt, **Testobjekt mit Version**, Teststufe, Testumgebung, **Datum**, **Tester** |
| je Testfall | Nr., Beschreibung, Vorbedingung, **Testdaten (Eingabe)**, **erwartetes Ergebnis (Soll)**, **tatsächliches Ergebnis (Ist)**, **Bewertung** (bestanden / nicht bestanden), Bemerkung bzw. Fehlernummer |
| Abschluss | Gesamtergebnis, offene Punkte, **Unterschrift** |

**Wichtige Regeln:**
- Das **Soll** wird **vor** dem Test aus der Anforderung bestimmt – nie aus dem Programm abgelesen.
- Das **Ist** wird beim Ausführen beobachtet (oder per Schreibtischtest ermittelt).
- **Bestanden** nur, wenn Soll und Ist **exakt** übereinstimmen.
- Nach einer Fehlerkorrektur werden die Tests **wiederholt** (Fehlernachtest) und auch die übrigen Tests erneut ausgeführt (**Regressionstest**).

**Positiv- und Negativtests:** Ein **Positivtest** prüft mit **gültigen** Eingaben, ob die Software das Richtige tut (z. B. 15 Urlaubstage → Antrag wird angenommen). Ein **Negativtest** prüft mit **ungültigen** oder unerwarteten Eingaben, ob die Software sie **sauber abfängt** (z. B. 0, 31, „abc“, leeres Feld → verständliche Fehlermeldung, kein Absturz, nichts wird gespeichert). Die Testdaten wählst du über **Äquivalenzklassen** und **Grenzwerte** (Modul p05): aus jeder gültigen Klasse einen Positivtest, aus jeder ungültigen Klasse einen Negativtest, dazu die Werte an und direkt neben jeder Grenze. Auch beim Negativtest steht das Soll vorher fest – meist „Eingabe wird mit Fehlermeldung abgelehnt“.

**Testgetriebene Entwicklung (TDD):** Erst wird ein Test geschrieben, der fehlschlägt (rot), dann gerade so viel Code, dass er besteht (grün), dann wird der Code aufgeräumt (Refactoring) – im ständigen Wechsel.`,
        },
        {
          type: 'explain',
          title: 'Alpha, Beta, Release Candidate – und statische Prüfungen',
          body: `**Tests vor der Veröffentlichung:**

| Begriff | Wer testet wo? | Ziel |
|---|---|---|
| **Alpha-Test** | eigene Tester oder ausgewählte Anwender **beim Hersteller**, unter Aufsicht, in einer Testumgebung | grobe Fehler früh finden |
| **Beta-Test** | ausgewählte **externe Anwender in ihrer echten Umgebung** mit einer fast fertigen Version | Fehler unter Realbedingungen finden, Rückmeldungen sammeln |
| **Release Candidate (RC)** | Version, die **veröffentlicht werden soll**, wenn keine schweren Fehler mehr auftauchen | letzte Prüfung vor der finalen Version (Release) |

In Unternehmen entspricht dem oft ein **Pilotbetrieb**: Die neue Software läuft zuerst in einer Abteilung, bevor sie überall ausgerollt wird.

**Statische Prüfungen** – der Code bzw. das Dokument wird gelesen, **nicht ausgeführt**:

| Form | Merkmal |
|---|---|
| **Walkthrough** | Der **Autor** führt die Kollegen durch sein Ergebnis; wenig formal; Ziel: Verständnis, Wissen teilen, Fehler entdecken |
| **Technisches Review** | Fachkollegen prüfen auf Fehler und Einhaltung von Standards und kommen zu einer gemeinsamen Bewertung |
| **Inspektion** | **formalste** Form: geschulter Moderator, feste Rollen, Checklisten, Kennzahlen, Protokoll |
| **Audit** | **unabhängige**, oft externe Prüfung, ob Vorgaben, Normen oder Verträge eingehalten werden |
| **Statische Codeanalyse** | ein **Werkzeug** (Linter) sucht automatisch nach Auffälligkeiten (ungenutzte Variablen, unsichere Funktionen) |

**Testarten nach Qualitätsmerkmal** (Qualitätsmerkmale nach ISO 9126, heute ISO/IEC 25010):

| Testart | prüft vor allem … |
|---|---|
| Funktionstest | **Funktionalität** – tut die Software, was gefordert ist? |
| Last- und Performancetest | **Effizienz** – Antwortzeiten bei vielen Benutzern/Daten |
| Usability-Test | **Benutzbarkeit** – kommen echte Anwender zurecht? |
| Sicherheits-/Penetrationstest | **Sicherheit** – lässt sich das System angreifen? |
| Wiederherstellungs-/Ausfalltest | **Zuverlässigkeit** – läuft es nach einem Fehler wieder an? |
| Installations-/Kompatibilitätstest | **Übertragbarkeit** – läuft es auf anderen Systemen? |`,
        },
        {
          type: 'visual',
          title: 'Vom Test im Haus bis zur Veröffentlichung',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Alpha-Test', text: 'Beim Hersteller, eigene Tester, Testumgebung – frühe, grobe Fehler.', icon: 'FlaskConical' },
                { title: 'Beta-Test', text: 'Externe Anwender, echte Umgebung, fast fertige Version – Fehler unter Realbedingungen.', icon: 'Users' },
                { title: 'Release Candidate', text: 'Veröffentlichungskandidat – wird final, wenn keine schweren Fehler mehr auftauchen.', icon: 'Rocket' },
              ],
            },
          },
          caption: 'Danach folgt bei Auftragsentwicklungen der Abnahmetest durch den Kunden mit Abnahmeprotokoll.',
        },
        {
          type: 'example',
          title: 'Ein Testprotokoll ausfüllen und auswerten',
          problem: `**Anforderung (Pflichtenheft):** Ab einem Bestellwert von 100 € ist der Versand kostenlos, darunter kostet er 4,90 €.\n\n**Implementierung:**\n\n${F}\nFUNKTION versandkosten(bestellwert)\n  WENN bestellwert > 100 DANN\n    RÜCKGABE 0\n  SONST\n    RÜCKGABE 4.90\n  ENDE WENN\nENDE FUNKTION\n${F}\n\nTestfälle: 50,00 € · 99,99 € · 100,00 € · 100,01 € · 250,00 €. Fülle das Testprotokoll aus und werte es aus.`,
          steps: [
            { label: 'Soll aus der Anforderung', body: 'unter 100 € → 4,90 €; ab 100 € (also auch genau 100,00 €) → 0,00 €.' },
            { label: 'Ist per Schreibtischtest', body: 'Der Code prüft `bestellwert > 100`. Für 100,00 € ist 100 > 100 FALSCH → SONST-Zweig → 4,90 €.' },
            { label: 'Protokoll', body: '| TF | Eingabe | Soll | Ist | Bewertung |\n|---|---|---|---|---|\n| 1 | 50,00 € | 4,90 € | 4,90 € | bestanden |\n| 2 | 99,99 € | 4,90 € | 4,90 € | bestanden |\n| 3 | 100,00 € | 0,00 € | 4,90 € | **nicht bestanden** |\n| 4 | 100,01 € | 0,00 € | 0,00 € | bestanden |\n| 5 | 250,00 € | 0,00 € | 0,00 € | bestanden |' },
            { label: 'Auswertung', body: 'Fehler genau an der Grenze: „ab 100 €“ bedeutet **≥ 100**. Fehlerbericht anlegen, Korrektur `WENN bestellwert ≥ 100 DANN`, dann TF 3 erneut testen (Fehlernachtest) und alle anderen Testfälle wiederholen (Regressionstest).' },
          ],
          result: '4 von 5 Testfällen bestanden; TF 3 deckt den Grenzwertfehler (> statt ≥) auf.',
        },
        {
          type: 'check',
          question: {
            id: 'p06-c05', kind: 'order', skill: 'qa.testprotocol', difficulty: 1,
            prompt: 'Bringe die Schritte des Testprozesses in die richtige Reihenfolge.',
            items: ['Testplanung (Testkonzept erstellen)', 'Testanalyse und Testentwurf (Testfälle mit Soll festlegen)', 'Testvorbereitung (Testdaten und Testumgebung bereitstellen)', 'Testdurchführung (Ist im Testprotokoll notieren)', 'Testauswertung (Soll/Ist vergleichen, Abweichungen melden)', 'Testabschluss (Testabschlussbericht, Freigabeempfehlung)'],
            explanation: 'Planen → Testfälle entwerfen → vorbereiten → durchführen → auswerten → abschließen. Das Soll steht fest, **bevor** getestet wird.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'p06-c06', kind: 'number', skill: 'qa.testprotocol', difficulty: 1,
            prompt: 'Wie viele Testfälle des folgenden Protokolls sind **nicht bestanden**?\n\n| TF | Eingabe (Alter) | Soll | Ist |\n|---|---|---|---|\n| 1 | 15 | abgelehnt | abgelehnt |\n| 2 | 17 | abgelehnt | abgelehnt |\n| 3 | 18 | erlaubt | abgelehnt |\n| 4 | 19 | erlaubt | erlaubt |\n| 5 | -1 | Fehlermeldung | abgelehnt |',
            answer: 2,
            hints: ['Vergleiche in jeder Zeile Soll und Ist – jede Abweichung zählt.'],
            misconceptions: [{ answer: '1', error: 'testprotokoll-bewertung', why: 'Auch TF 5 weicht ab: Soll ist eine Fehlermeldung (ungültige Eingabe), Ist ist „abgelehnt“.' }],
            explanation: 'TF 3 (Soll erlaubt, Ist abgelehnt) und TF 5 (Soll Fehlermeldung, Ist abgelehnt) weichen ab → **2** nicht bestanden. TF 5 zeigt: Auch ungültige Eingaben brauchen ein festgelegtes Soll.',
          },
        },
        { type: 'practice', title: 'Übung: Testprotokoll auswerten (Generator)', generator: 'p.testprotokoll', count: 3, difficulty: 2 },
        { type: 'practice', title: 'Übung: Testprozess und Testdokumente', questionIds: ['p06-q024', 'p06-q025', 'p06-q026', 'p06-q027', 'p06-q028', 'p06-q029', 'p06-q030', 'p06-q031', 'p06-q032', 'p06-q039'], count: 6, difficulty: 2 },
        { type: 'summary', points: ['Testprozess: Planung → Analyse/Entwurf → Vorbereitung → Durchführung → Auswertung → Abschluss.', 'Positivtest = gültige Eingabe, richtiges Ergebnis? Negativtest = ungültige Eingabe, wird sie sauber abgelehnt?', 'Testprotokoll: Testobjekt/Version, Datum, Tester; je Testfall Eingabe, Soll, Ist, Bewertung; Unterschrift.', 'Soll aus der Anforderung (vorher), Ist aus dem Programm; bestanden nur bei exakter Übereinstimmung.', 'Alpha = intern beim Hersteller, Beta = externe Anwender in echter Umgebung, RC = Veröffentlichungskandidat.', 'Statisch: Walkthrough (Autor führt), Review, Inspektion (formalste), Audit (unabhängig).'] },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'p06-l05',
      title: 'Software dokumentieren und sinnvoll kommentieren',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['sw.docs'],
      simple: `Dokumentation ist Bedienungsanleitung und Bauplan einer Software – für zwei verschiedene Leser. Die Benutzerdokumentation (z. B. Handbuch, Installationsanleitung) erklärt Anwendern, wie sie das Programm bedienen. Die Entwicklerdokumentation (z. B. Aufbau, Schnittstellen, Testberichte) erklärt Fachleuten, wie es innen funktioniert, damit andere es später warten können. Gute Kommentare im Code sind wie Randnotizen im Kochbuch: Sie erklären, warum etwas so gemacht wird – nicht, was ohnehin dasteht.

**Merke:** Dokumentation muss zur Zielgruppe passen, aktuell und vollständig sein; Kommentare erklären das Warum, nicht das Was.`,
      steps: [
        {
          type: 'explain',
          title: 'Wer liest was?',
          body: `Software ohne Dokumentation ist schwer zu benutzen und kaum zu warten. Man unterscheidet nach **Zielgruppe**:

| | **Entwicklerdokumentation** (technische Dokumentation) | **Benutzerdokumentation** (Anwenderdokumentation) |
|---|---|---|
| Zielgruppe | Entwickler, Wartung, Tester, teils Administratoren | Anwender, Administratoren, Auftraggeber |
| Beispiele | **Projektdokumentation** (Lasten-/Pflichtenheft, Protokolle, Zeitplan), **Systemdokumentation** (Architektur, Datenmodell, Schnittstellen-/API-Beschreibung, Quellcode-Kommentare), **Testdokumentation** (Testkonzept, Testprotokolle) | **Benutzerhandbuch**, **Installations- bzw. Administratorhandbuch**, Kurzanleitung (Quickstart), Online-Hilfe/FAQ, Schulungsunterlagen |
| Sprache | Fachsprache erlaubt, präzise | verständlich, Schritt für Schritt, mit Bildschirmfotos |

**Qualitätskriterien guter Dokumentation:**
- **zielgruppengerecht und verständlich** – ein Anwender braucht keine Klassendiagramme
- **vollständig** – alle Funktionen, Voraussetzungen und Fehlermeldungen sind beschrieben
- **korrekt und widerspruchsfrei**
- **aktuell** – passt zur ausgelieferten Version (Versionsnummer, Änderungshistorie)
- **übersichtlich und auffindbar** – Gliederung, Inhaltsverzeichnis, Suche, Stichwortverzeichnis
- **relevant** – nur, was der Leser wirklich braucht; ggf. **barrierefrei**

**Quellcode kommentieren – Faustregel: Der Code zeigt das *Was*, der Kommentar erklärt das *Warum*.**

| sinnvoll | vermeiden |
|---|---|
| **Begründung** einer Entscheidung („≥ statt >, weil genau 100 € laut Pflichtenheft schon versandfrei ist“) | **redundante** Kommentare, die nur den Code wiederholen (\`i ← i + 1 // i um 1 erhöhen\`) |
| **Warnungen** („Funktion nicht parallel aufrufen – Datei wird gesperrt“) | **veraltete** Kommentare, die nicht mehr zum Code passen |
| **Funktionskommentar** (Zweck, Parameter, Rückgabe, mögliche Fehler) | **auskommentierter alter Code** – den bewahrt die Versionsverwaltung (Git) auf |
| **TODO** mit Ticketnummer | Frust- und Spaßkommentare |
| rechtliche Hinweise (Lizenz, Urheber) | Kommentare als Ersatz für verständliche Namen |

Noch besser als ein Kommentar ist oft **verständlicher Code**: sprechende Namen (\`versandkosten\` statt \`vk\`), kleine Funktionen, Konstanten statt „magischer Zahlen“ (\`GRENZE_VERSANDFREI\` statt \`100\`).

**In Python** steht die Funktionsbeschreibung als **Docstring** direkt unter \`def\`; einzeilige Kommentare beginnen mit \`#\`:

${F}python
def versandkosten(bestellwert: float) -> float:
    """Liefert die Versandkosten in Euro.

    Ab 100 € Bestellwert ist der Versand kostenlos (Vorgabe Vertrieb, Ticket #4711).
    """
    # >= statt >: genau 100 € gilt laut Pflichtenheft schon als versandfrei
    if bestellwert >= 100:
        return 0.0
    return 4.90
${F}`,
        },
        {
          type: 'visual',
          title: 'Zwei Leserschaften',
          widget: {
            kind: 'cards',
            data: {
              columns: 2,
              items: [
                { title: 'Entwicklerdokumentation', text: 'Projekt-, System- und Testdokumentation: Architektur, Datenmodell, Schnittstellen, Kommentare im Code. Ziel: Wartbarkeit.', icon: 'FileCode' },
                { title: 'Benutzerdokumentation', text: 'Handbuch, Installations-/Administratorhandbuch, Kurzanleitung, Online-Hilfe, Schulungsunterlagen. Ziel: richtige Bedienung.', icon: 'BookOpen' },
              ],
            },
          },
          caption: 'Prüffrage für jedes Dokument: Wer liest es – und was muss diese Person danach können?',
        },
        {
          type: 'example',
          title: 'Kommentare aufräumen',
          problem: `Ein Kollege übergibt dir diesen Code. Welche Kommentare behältst du, welche löschst du?\n\n${F}\n// (1) Copyright 2027 Elektro Krämer GmbH – nur interne Nutzung\nFUNKTION versandkosten(bestellwert)\n  // (2) ≥ statt >: genau 100 € ist laut Pflichtenheft versandfrei\n  WENN bestellwert ≥ 100 DANN\n    RÜCKGABE 0\n  ENDE WENN\n  // (3) gibt 4.90 zurück\n  RÜCKGABE 4.90\n  // (4) RÜCKGABE 5.90\nENDE FUNKTION\n// (5) TODO #812: Auslandsversand ergänzen\n${F}`,
          steps: [
            { label: '(1) behalten', body: 'Rechtlicher Hinweis – gehört in den Dateikopf.' },
            { label: '(2) behalten', body: 'Erklärt das **Warum** einer Entscheidung, die man sonst für einen Fehler halten könnte.' },
            { label: '(3) löschen', body: 'Wiederholt nur, was im Code steht (redundant).' },
            { label: '(4) löschen', body: 'Auskommentierter Alt-Code verwirrt; die alte Version liegt in der Versionsverwaltung.' },
            { label: '(5) behalten', body: 'Offene Aufgabe mit Ticketnummer – nachverfolgbar.' },
          ],
          result: 'Behalten: 1, 2, 5 · Löschen: 3, 4',
        },
        {
          type: 'check',
          question: {
            id: 'p06-c07', kind: 'single', skill: 'sw.docs', difficulty: 1,
            prompt: 'Welcher Kommentar ist **sinnvoll**?',
            options: [
              '`// Zeitlimit 30 s, weil der Webservice des Lieferanten sonst die Verbindung trennt`',
              '`// Schleife von 0 bis 9`',
              '`// summe ← summe + preis[i] * 2`',
              '`// keine Ahnung, warum das funktioniert`',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'Wiederholt nur den Code (redundant) – das sieht jeder an der Schleife selbst.', error: 'kommentar-redundant' },
              '2': { why: 'Auskommentierter Code gehört gelöscht; alte Stände bewahrt die Versionsverwaltung auf.', error: 'kommentar-redundant' },
              '3': { why: 'Ein Frustkommentar hilft niemandem – besser die Ursache klären und das Warum dokumentieren.', error: 'kommentar-redundant' },
            },
            explanation: 'Der erste Kommentar erklärt das **Warum** (Begründung für eine Zahl, die sonst „magisch“ wirkt). Genau das kann der Code selbst nicht zeigen.',
          },
        },
        { type: 'practice', title: 'Übung: Dokumentation und Kommentare', questionIds: ['p06-q033', 'p06-q034', 'p06-q035', 'p06-q036', 'p06-q037', 'p06-q038'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Entwicklerdokumentation: Projekt-, System-, Testdokumentation – für Wartung und Weiterentwicklung.', 'Benutzerdokumentation: Handbuch, Installations-/Administratorhandbuch, Kurzanleitung, Online-Hilfe, Schulung.', 'Qualität: zielgruppengerecht, vollständig, korrekt, aktuell, übersichtlich.', 'Kommentare erklären das Warum; redundante Kommentare und auskommentierten Code löschen (Git bewahrt alte Stände).'] },
      ],
    },
  ],

  /* ==================================================================== */
  questions: [
    /* ---------- l01: Phasen, Anpassung ---------- */
    {
      id: 'p06-q001', kind: 'order', skill: 'sw.lifecycle', difficulty: 1,
      prompt: 'Bringe die Phasen der Softwareentwicklung in die richtige Reihenfolge.',
      items: ['Analyse (Anforderungen, Lasten-/Pflichtenheft)', 'Entwurf (Architektur, UML)', 'Implementierung (Programmieren)', 'Test (Integration, System, Abnahme)', 'Einführung (Installation, Datenmigration, Schulung)', 'Wartung und Pflege'],
      hints: ['Erst klären, was gebraucht wird – dann planen, bauen, prüfen, übergeben.'],
      explanation: 'Analyse → Entwurf → Implementierung → Test → Einführung → Wartung. Die Dokumentation begleitet alle Phasen.',
    },
    {
      id: 'p06-q002', kind: 'match', skill: 'sw.lifecycle', difficulty: 2,
      prompt: 'Ordne die Tätigkeiten der jeweiligen Phase zu.',
      left: ['Anforderungen mit der Fachabteilung erheben', 'Klassendiagramm und Datenmodell erstellen', 'Funktionen programmieren und Unit-Tests schreiben', 'Gesamtsystem gegen das Pflichtenheft prüfen', 'Altdaten übernehmen und Anwender schulen', 'Sicherheitsupdate für eine entdeckte Lücke ausliefern'],
      right: ['Analyse', 'Entwurf', 'Implementierung', 'Test', 'Einführung', 'Wartung'],
      answer: [0, 1, 2, 3, 4, 5],
      hints: ['Unit-Tests (Komponententests) schreiben die Entwickler beim Programmieren.'],
      explanation: 'Erheben = Analyse · Modellieren = Entwurf · Programmieren inkl. Komponententests = Implementierung · Systemtest = Test · Datenmigration und Schulung = Einführung · Updates nach der Einführung = Wartung.',
    },
    {
      id: 'p06-q003', kind: 'match', skill: 'sw.lifecycle', difficulty: 2,
      prompt: 'Die Elektro Krämer GmbH passt eine neue Standard-Warenwirtschaft an. Ordne jede Maßnahme der passenden Art zu.',
      left: ['Das Modul „Produktion“ wird nicht freigeschaltet.', 'Die Mahnstufen werden auf 14 und 28 Tage eingestellt.', 'Über die Hersteller-API wird ein eigenes Zusatzprogramm für den Paketversand angebunden.', 'Ein Entwickler ändert die Preisberechnung direkt im Quellcode des Herstellers.', 'Kundendaten aus dem Altsystem werden übernommen.'],
      right: ['Konfiguration', 'Parametrisierung', 'Erweiterungsprogrammierung', 'Modifikation (Individualentwicklung)', 'Datenmigration'],
      answer: [0, 1, 2, 3, 4],
      hints: ['Module wählen = Konfiguration; vorgesehene Einstellungen = Parametrisierung; Zusatzcode über Schnittstellen = Erweiterung.'],
      explanation: 'Module auswählen → Konfiguration · Einstellwerte → Parametrisierung · eigener Code über vorgesehene Schnittstellen → Erweiterungsprogrammierung · Eingriff in den Herstellercode → Modifikation · Altdaten übernehmen → Datenmigration.',
    },
    {
      id: 'p06-q004', kind: 'free', skill: 'sw.lifecycle', difficulty: 2,
      prompt: 'Der Vertriebsleiter der Elektro Krämer GmbH möchte die neue Standard-Warenwirtschaft „an vielen Stellen im Programmcode umbauen lassen“. Erläutern Sie ihm drei Gründe, warum die Software möglichst nur **konfiguriert und parametrisiert** werden sollte.',
      modelAnswer: '1. Updatefähigkeit: Änderungen am Herstellercode werden bei Updates überschrieben oder müssen jedes Mal neu eingebaut werden; Konfiguration und Parameter bleiben erhalten. 2. Kosten und Zeit: Programmieranpassungen kosten Entwicklungs-, Test- und Wartungsaufwand, Einstellungen sind schnell erledigt. 3. Support und Gewährleistung: Bei Eingriffen in den Quellcode kann der Herstellersupport bzw. die Gewährleistung entfallen; Fehler lassen sich schwerer zuordnen. (Weitere: Stabilität/geringeres Fehlerrisiko, Abhängigkeit von einzelnen Entwicklern vermeiden, Standardprozesse sind oft bewährt.) Reichen Einstellungen nicht, ist eine Erweiterung über vorgesehene Schnittstellen der nächste Schritt.',
      keywords: ['Updates', 'Kosten', 'Support/Gewährleistung', 'Fehlerrisiko', 'Schnittstelle'],
      hints: ['Denke an das nächste Update des Herstellers.', 'Wer hilft bei Fehlern, wenn der Code verändert wurde?'],
      explanation: 'Kernargumente: Updatefähigkeit, geringere Kosten, Herstellersupport bleibt erhalten, weniger Fehlerrisiko. Häufiger Fehler: nur „ist billiger“ schreiben – die Prüfung erwartet je Grund eine kurze Erläuterung.',
    },
    {
      id: 'p06-q005', kind: 'order', skill: 'sw.lifecycle', difficulty: 2,
      prompt: 'Bringe die Schritte einer **Datenmigration** in eine sinnvolle Reihenfolge.',
      items: ['Altbestand analysieren (Felder, Formate, Datenmenge)', 'Daten bereinigen (Dubletten, veraltete Datensätze)', 'Felder zuordnen (Mapping alt → neu)', 'Testmigration durchführen und prüfen (Anzahl, Stichproben)', 'Echtmigration durchführen', 'Ergebnis abnehmen und Altsystem archivieren'],
      hints: ['Erst testen, dann echt migrieren.'],
      explanation: 'Analysieren → bereinigen → zuordnen → testweise migrieren und prüfen → echt migrieren → abnehmen/archivieren. Die Testmigration verhindert, dass Fehler erst im Echtbetrieb auffallen.',
    },
    {
      id: 'p06-q006', kind: 'text', skill: 'sw.lifecycle', difficulty: 1,
      prompt: 'Wie heißt der Oberbegriff für das Anpassen einer Standardsoftware an die Bedürfnisse eines Unternehmens, insbesondere durch Konfiguration und Parametrisierung? (ein Wort, englischer Fachbegriff)',
      accept: ['Customizing', 'Customising'],
      hints: ['Englisch „customer“ = Kunde.'],
      explanation: '**Customizing** = Anpassung von Standardsoftware an das Unternehmen, im engeren Sinn ohne Änderung des Quellcodes (Konfiguration, Parametrisierung).',
    },
    {
      id: 'p06-q007', kind: 'single', skill: 'sw.lifecycle', difficulty: 1,
      prompt: 'Welche Tätigkeit gehört zur Phase **Wartung und Pflege**?',
      options: ['Ein Programm an die neue Version des Betriebssystems anpassen', 'Die Anforderungen der Fachabteilung erheben', 'Das Klassendiagramm entwerfen', 'Den Abnahmetest mit dem Kunden durchführen'],
      answer: 0,
      distractors: {
        '1': { why: 'Anforderungen erheben gehört zur Analyse.', error: 'sw-phasen' },
        '2': { why: 'Modellieren gehört zum Entwurf.', error: 'sw-phasen' },
        '3': { why: 'Der Abnahmetest gehört zur Testphase vor der Einführung.', error: 'sw-phasen' },
      },
      explanation: 'Zur **Wartung** gehören Fehlerbehebung, Anpassung an neue Umgebungen (z. B. Betriebssystem), Erweiterungen und Sicherheitsupdates – alles nach der Einführung.',
    },
    /* ---------- l02: klassische Modelle ---------- */
    {
      id: 'p06-q008', kind: 'match', skill: 'sw.models', difficulty: 1,
      prompt: 'Ordne jedem Vorgehensmodell das passende Merkmal zu.',
      left: ['Wasserfallmodell', 'V-Modell', 'Spiralmodell', 'Scrum'],
      right: ['Phasen strikt nacheinander, Rücksprung nur zur vorherigen Phase', 'jeder Spezifikationsstufe ist eine Teststufe gegenübergestellt', 'Zyklen mit Risikoanalyse und Prototypen in jeder Runde', 'Sprints mit festem Rhythmus und nutzbarem Inkrement'],
      answer: [0, 1, 2, 3],
      explanation: 'Wasserfall = linear · V-Modell = Entwicklung und Test gespiegelt · Spirale = risikogetriebene Zyklen · Scrum = agile Sprints.',
    },
    {
      id: 'p06-q009', kind: 'table', skill: 'sw.models', difficulty: 2,
      prompt: 'Ergänze die Vergleichstabelle mit **ja** oder **nein**.',
      columns: [
        { key: 'einmal', label: 'Phasen werden nur einmal durchlaufen', type: 'text' },
        { key: 'testgegen', label: 'jeder Entwurfsstufe ist eine Teststufe fest zugeordnet', type: 'text' },
        { key: 'risiko', label: 'Risikoanalyse ist fester Schritt jeder Runde', type: 'text' },
        { key: 'timebox', label: 'feste Zeitfenster (≤ 1 Monat) je Iteration', type: 'text' },
      ],
      rows: [
        { label: 'Wasserfall', cells: { einmal: { answer: 'ja', accept: ['j'] }, testgegen: { answer: 'nein', accept: ['n'] }, risiko: { answer: 'nein', accept: ['n'] }, timebox: { answer: 'nein', accept: ['n'] } } },
        { label: 'V-Modell', cells: { einmal: { answer: 'ja', accept: ['j'] }, testgegen: { answer: 'ja', accept: ['j'] }, risiko: { answer: 'nein', accept: ['n'] }, timebox: { answer: 'nein', accept: ['n'] } } },
        { label: 'Spiralmodell', cells: { einmal: { answer: 'nein', accept: ['n'] }, testgegen: { answer: 'nein', accept: ['n'] }, risiko: { answer: 'ja', accept: ['j'] }, timebox: { answer: 'nein', accept: ['n'] } } },
        { label: 'Scrum', cells: { einmal: { answer: 'nein', accept: ['n'] }, testgegen: { answer: 'nein', accept: ['n'] }, risiko: { answer: 'nein', accept: ['n'] }, timebox: { answer: 'ja', accept: ['j'] } } },
      ],
      misconceptions: [
        { cell: '0:testgegen', answer: 'ja', error: 'vorgehensmodell-zuordnung', why: 'Die feste Zuordnung Entwurf ↔ Teststufe ist das Kennzeichen des **V-Modells**, nicht des einfachen Wasserfalls.' },
        { cell: '2:einmal', answer: 'ja', error: 'vorgehensmodell-zuordnung', why: 'Das Spiralmodell durchläuft die Tätigkeiten in **mehreren Runden**.' },
      ],
      hints: ['Wasserfall und V-Modell sind linear, Spirale und Scrum arbeiten in Wiederholungen.'],
      explanation: '| | einmal | Test fest zugeordnet | Risikoanalyse | Timebox |\n|---|---|---|---|---|\n| Wasserfall | ja | nein | nein | nein |\n| V-Modell | ja | **ja** | nein | nein |\n| Spirale | nein | nein | **ja** | nein |\n| Scrum | nein | nein | nein | **ja** |\n\nJedes Modell hat ein Alleinstellungsmerkmal: V-Modell = gespiegelte Teststufen, Spirale = Risikoanalyse, Scrum = Sprints mit Timebox.',
    },
    {
      id: 'p06-q010', kind: 'free', skill: 'sw.models', difficulty: 2,
      prompt: 'Vergleichen Sie das **Wasserfallmodell** mit dem **V-Modell**: Nennen Sie eine Gemeinsamkeit, den wesentlichen Unterschied und je einen Nachteil.',
      modelAnswer: 'Gemeinsamkeit: Beide sind klassische, lineare (sequenzielle) Modelle; die Phasen werden nacheinander durchlaufen, Anforderungen müssen früh feststehen. Unterschied: Im V-Modell ist jeder Spezifikationsstufe eine Teststufe gegenübergestellt (Anforderungen ↔ Abnahmetest, Systementwurf ↔ Systemtest, Architektur ↔ Integrationstest, Komponentenspezifikation ↔ Komponententest); Testfälle werden schon parallel zur Spezifikation geplant. Im Wasserfall ist der Test nur eine Phase gegen Ende. Nachteil Wasserfall: Fehler aus der Analyse fallen erst spät auf und sind dann teuer; Kunde sieht spät lauffähige Software. Nachteil V-Modell: hoher Dokumentationsaufwand, für kleine Projekte zu schwerfällig, ebenfalls unflexibel bei Änderungen.',
      keywords: ['linear', 'Teststufe gegenüber', 'früh planen', 'späte Fehler', 'Dokumentationsaufwand'],
      hints: ['Das „V“ entsteht durch Spezifikation links und Tests rechts.'],
      explanation: 'Wichtig ist der Kernunterschied: Das V-Modell koppelt jede Entwurfsstufe an eine Teststufe. Häufiger Fehler: das V-Modell für agil halten – es ist ebenfalls linear.',
    },
    {
      id: 'p06-q011', kind: 'order', skill: 'sw.models', difficulty: 2,
      prompt: 'Bringe die vier Schritte einer Runde im **Spiralmodell** in die richtige Reihenfolge.',
      items: ['Ziele, Alternativen und Rahmenbedingungen festlegen', 'Alternativen bewerten, Risiken analysieren (z. B. mit Prototyp)', 'Entwickeln und testen', 'Nächste Runde planen (Review mit dem Kunden)'],
      explanation: 'Ziele → Risikoanalyse → Entwicklung/Test → Planung der nächsten Runde. Die Risikoanalyse vor der Entwicklung ist das Kennzeichen des Spiralmodells.',
    },
    {
      id: 'p06-q012', kind: 'free', skill: 'sw.models', difficulty: 3,
      prompt: 'Das IT-Systemhaus erhält drei Anfragen:\n\n| Projekt | Beschreibung |\n|---|---|\n| 1 | Zeiterfassung für 15 Mitarbeitende einer Arztpraxis; Anforderungen in einem Workshop vollständig geklärt, Festpreis vereinbart |\n| 2 | Kundenportal für die Elektro Krämer GmbH; der Vertrieb will nach jeder Etappe neue Ideen einbringen |\n| 3 | Steuerungssoftware für eine Medizintechnik-Anlage mit strengen Nachweispflichten für jede Entwicklungs- und Teststufe |\n\nEmpfehlen Sie für jedes Projekt ein Vorgehensmodell und begründen Sie Ihre Wahl.',
      modelAnswer: 'Projekt 1: Wasserfallmodell – Anforderungen stehen fest, Projekt ist klein und klar, Festpreis verlangt gute Planbarkeit; die Phasen können nacheinander abgearbeitet werden. Projekt 2: agil, z. B. Scrum – Anforderungen ändern sich, der Kunde will regelmäßig Ergebnisse sehen und Prioritäten anpassen; nach jedem Sprint liegt ein nutzbares Inkrement vor, Änderungen fließen über das Product Backlog ein. Projekt 3: V-Modell – sicherheitskritisch, jede Spezifikationsstufe braucht eine nachweisbare Teststufe; das V-Modell plant Tests parallel zur Spezifikation und erzeugt die geforderten Nachweise.',
      keywords: ['Wasserfall feste Anforderungen', 'Scrum wechselnde Anforderungen', 'V-Modell Nachweise/Test', 'Begründung je Projekt'],
      hints: ['Entscheidend: Wie sicher sind die Anforderungen, und wie wichtig sind Nachweise?'],
      explanation: 'Begründung zählt mehr als der Name: feste Anforderungen → Wasserfall, wechselnde Anforderungen und Kundenbeteiligung → agil, Nachweispflicht und Sicherheit → V-Modell. Auch andere gut begründete Lösungen sind vertretbar (z. B. Spiralmodell bei Projekt 3, wenn technische Risiken betont werden).',
    },
    {
      id: 'p06-q013', kind: 'single', skill: 'sw.models', difficulty: 2,
      prompt: 'In der Analyse eines Wasserfallprojekts wurde eine wichtige Anforderung falsch verstanden. Wann fällt das **typischerweise** auf?',
      options: ['Erst spät, z. B. im System- oder Abnahmetest, wenn der Kunde das fertige Produkt sieht', 'Sofort im Daily Scrum am nächsten Morgen', 'In der Risikoanalyse der nächsten Spiralrunde', 'Gar nicht, weil das Pflichtenheft vom Kunden unterschrieben wurde'],
      answer: 0,
      distractors: {
        '1': { why: 'Das Daily Scrum gehört zu Scrum, nicht zum Wasserfall.', error: 'vorgehensmodell-zuordnung' },
        '2': { why: 'Runden mit Risikoanalyse gibt es im Spiralmodell, nicht im Wasserfall.', error: 'vorgehensmodell-zuordnung' },
        '3': { why: 'Eine Unterschrift verhindert keine Missverständnisse – sie fallen dann eben spät und teuer auf.', error: 'vorgehensmodell-zuordnung' },
      },
      explanation: 'Im Wasserfall sieht der Kunde lauffähige Software erst gegen Ende. Fehler aus der Analyse werden deshalb oft erst im System- oder Abnahmetest entdeckt – die Korrektur ist dann besonders teuer. Genau das wollen iterative und agile Modelle vermeiden.',
    },
    /* ---------- l03: Scrum, Kanban ---------- */
    {
      id: 'p06-q014', kind: 'match', skill: 'sw.agile', difficulty: 1,
      prompt: 'Ordne die Begriffe der richtigen Kategorie zu.',
      left: ['Developers', 'Sprint Planning', 'Product Backlog', 'Sprint Review', 'Product Owner', 'Sprint', 'Inkrement', 'Scrum Master'],
      right: ['Verantwortlichkeit (Rolle)', 'Ereignis', 'Artefakt'],
      answer: [0, 1, 2, 1, 0, 1, 2, 0],
      explanation: 'Rollen: Product Owner, Scrum Master, Developers · Ereignisse: Sprint, Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospektive · Artefakte: Product Backlog, Sprint Backlog, Inkrement. Häufiger Fehler: Den Sprint für ein Artefakt halten – er ist das Ereignis, das alle anderen enthält.',
    },
    {
      id: 'p06-q015', kind: 'match', skill: 'sw.agile', difficulty: 2,
      prompt: 'Ordne jedem Scrum-Ereignis seinen Zweck zu.',
      left: ['Sprint Planning', 'Daily Scrum', 'Sprint Review', 'Sprint Retrospektive'],
      right: ['Sprint-Ziel festlegen und Einträge für den Sprint auswählen', 'täglich 15 Minuten den Fortschritt zum Sprint-Ziel prüfen', 'das Ergebnis den Stakeholdern zeigen und Feedback einholen', 'die Zusammenarbeit und Arbeitsweise des Teams verbessern'],
      answer: [0, 1, 2, 3],
      explanation: 'Planning = planen · Daily = täglich abstimmen · Review = **Produkt** prüfen (Was?) · Retrospektive = **Arbeitsweise** prüfen (Wie?). Review und Retrospektive werden besonders oft verwechselt.',
    },
    {
      id: 'p06-q016', kind: 'table', skill: 'sw.agile', difficulty: 2,
      prompt: 'Ein Mitschüler hat Aussagen zu Scrum notiert. Prüfe jede Aussage mit **richtig** oder **falsch**.',
      columns: [{ key: 'rf', label: 'richtig / falsch', type: 'text' }],
      rows: [
        { label: '1. Ein Sprint dauert höchstens einen Monat.', cells: { rf: { answer: 'richtig', accept: ['r', 'wahr', 'stimmt'] } } },
        { label: '2. Der Product Owner ist immer der Kunde.', cells: { rf: { answer: 'falsch', accept: ['f', 'stimmt nicht'] } } },
        { label: '3. Der Scrum Master verteilt die Aufgaben an die Entwickler.', cells: { rf: { answer: 'falsch', accept: ['f', 'stimmt nicht'] } } },
        { label: '4. Das Daily Scrum dauert höchstens 15 Minuten.', cells: { rf: { answer: 'richtig', accept: ['r', 'wahr', 'stimmt'] } } },
        { label: '5. In der Sprint Retrospektive wird das Produkt den Stakeholdern vorgeführt.', cells: { rf: { answer: 'falsch', accept: ['f', 'stimmt nicht'] } } },
        { label: '6. Das Product Backlog ist eine geordnete Liste aller Anforderungen an das Produkt.', cells: { rf: { answer: 'richtig', accept: ['r', 'wahr', 'stimmt'] } } },
      ],
      misconceptions: [
        { cell: '1:rf', answer: 'richtig', error: 'scrum-rollen', why: 'Der Product Owner **vertritt** die Interessen von Kunden und Stakeholdern; er ist eine Rolle im Scrum Team, nicht automatisch der Kunde.' },
        { cell: '2:rf', answer: 'richtig', error: 'scrum-rollen', why: 'Die Developers organisieren sich selbst. Der Scrum Master ist Coach, kein Projektleiter.' },
        { cell: '4:rf', answer: 'richtig', error: 'scrum-ereignisse', why: 'Das Produkt wird im **Sprint Review** gezeigt. Die Retrospektive verbessert die Zusammenarbeit.' },
      ],
      hints: ['Achte auf absolute Wörter wie „immer“ – und auf die Verwechslung Review/Retrospektive.'],
      explanation: '1 richtig · 2 falsch (PO vertritt Kunden und Stakeholder) · 3 falsch (Developers organisieren sich selbst) · 4 richtig · 5 falsch (das ist das Sprint Review) · 6 richtig. In der Prüfung bei „falsch“ immer kurz begründen bzw. korrigieren.',
    },
    {
      id: 'p06-q017', kind: 'number', skill: 'sw.agile', difficulty: 2,
      prompt: 'Im Product Backlog stehen noch Einträge mit **264 Story Points**. Das Team hat in den letzten drei Sprints **31, 35 und 33** Story Points geschafft. Wie viele Sprints werden voraussichtlich noch benötigt (Velocity = Durchschnitt der drei Sprints)?',
      answer: 8,
      unit: 'Sprints',
      hints: ['Velocity = (31 + 35 + 33) ÷ 3.', 'Dann Restaufwand ÷ Velocity.'],
      misconceptions: [
        { answer: '2.67', error: 'velocity-rechnung', why: 'Du hast durch die Summe aller drei Sprints (99) geteilt. Erst den Durchschnitt bilden: 99 ÷ 3 = 33.' },
        { answer: '7.54', error: 'velocity-rechnung', why: 'Du hast mit dem besten Sprint (35) gerechnet. Die Velocity ist der Durchschnitt (33).' },
      ],
      explanation: 'Velocity: (31 + 35 + 33) SP ÷ 3 = 99 SP ÷ 3 = 33 SP je Sprint. Sprints: 264 SP ÷ 33 SP = **8 Sprints**.',
    },
    {
      id: 'p06-q018', kind: 'number', skill: 'sw.agile', difficulty: 3,
      prompt: 'Restaufwand im Product Backlog: **190 Story Points**. Velocity der letzten drei Sprints: **22, 26 und 24** Story Points. Ein Sprint dauert **2 Wochen**. Wie viele **Wochen** braucht das Team voraussichtlich noch? (Angefangene Sprints zählen als ganzer Sprint.)',
      answer: 16,
      unit: 'Wochen',
      hints: ['Velocity = Durchschnitt = 24 SP.', '190 ÷ 24 ergibt keine ganze Zahl – ein angefangener Sprint zählt voll.'],
      misconceptions: [
        { answer: '14', error: 'velocity-rundung', why: '190 ÷ 24 = 7,92 – du hast abgerundet. Der Rest von 22 SP braucht einen weiteren, vollen Sprint → 8 Sprints.' },
        { answer: '15.83', error: 'velocity-rundung', why: 'Sprints haben eine feste Länge; ein angefangener Sprint dauert trotzdem 2 Wochen → auf 8 Sprints aufrunden.' },
        { answer: '8', error: 'velocity-rechnung', why: 'Das ist die Zahl der Sprints. Gefragt sind Wochen: 8 · 2 = 16.' },
      ],
      explanation: '1. Velocity: (22 + 26 + 24) SP ÷ 3 = 72 SP ÷ 3 = 24 SP je Sprint\n2. Sprints: 190 SP ÷ 24 SP = 7,92 → aufrunden auf **8 Sprints** (7 Sprints schaffen nur 168 SP)\n3. Dauer: 8 Sprints · 2 Wochen = **16 Wochen**\n\nHäufiger Fehler: abrunden – dann bleiben 22 Story Points liegen.',
    },
    {
      id: 'p06-q019', kind: 'free', skill: 'sw.agile', difficulty: 2,
      prompt: 'Die Leiterin des IT-Supports der Elektro Krämer GmbH überlegt, Scrum einzuführen. Täglich gehen unvorhersehbar viele Störungsmeldungen ein, dringende Fälle müssen sofort bearbeitet werden. Erläutern Sie, warum **Kanban** hier besser passt als Scrum.',
      modelAnswer: 'Im Support kommt die Arbeit laufend und unplanbar herein; dringende Störungen können nicht bis zum nächsten Sprint warten. Scrum plant den Umfang für einen festen Sprint und soll das Sprint-Ziel während des Sprints nicht gefährden. Kanban arbeitet ohne Sprints im kontinuierlichen Fluss: Neue Tickets kommen jederzeit auf das Board, Prioritäten können sich jederzeit ändern. Das WIP-Limit verhindert, dass zu viele Tickets gleichzeitig angefangen werden, und das Board macht den Stand für alle sichtbar. Gemessen wird die Durchlaufzeit, die zu SLA-Reaktions- und Lösungszeiten passt. Kanban schreibt außerdem keine neuen Rollen vor und lässt sich in den bestehenden Support einführen.',
      keywords: ['kontinuierlicher Fluss', 'keine Sprints', 'Prioritäten jederzeit', 'WIP-Limit', 'Board/Transparenz', 'Durchlaufzeit'],
      hints: ['Können dringende Störungen bis zum Sprintende warten?'],
      explanation: 'Kern: Support = laufende, unplanbare Arbeit → Fluss statt Sprints; WIP-Limit und Board sorgen für Übersicht.',
    },
    {
      id: 'p06-q020', kind: 'number', skill: 'sw.agile', difficulty: 1,
      prompt: 'Auf dem Kanban-Board des IT-Supports gilt für die Spalte **„In Arbeit“ ein WIP-Limit von 4**. Aktuell hängen dort 4 Karten, in „Zu erledigen“ warten 6 Karten. Zwei Tickets werden fertig und nach „Erledigt“ verschoben. Wie viele Karten darf das Team jetzt nach „In Arbeit“ ziehen?',
      answer: 2,
      unit: 'Karten',
      hints: ['Nach dem Verschieben sind noch 2 Karten in „In Arbeit“.'],
      misconceptions: [
        { answer: '6', error: 'kanban-wip', why: 'Es dürfen nicht alle wartenden Karten gezogen werden – das WIP-Limit begrenzt „In Arbeit“ auf 4.' },
        { answer: '4', error: 'kanban-wip', why: 'In „In Arbeit“ sind noch 2 Karten. Bis zum Limit 4 sind also nur 2 Plätze frei.' },
      ],
      explanation: 'Nach dem Verschieben: 4 − 2 = 2 Karten in Arbeit. Freie Plätze bis zum Limit: 4 − 2 = **2**. Pull-Prinzip: Neue Arbeit wird nur gezogen, wenn Platz frei ist.',
    },
    {
      id: 'p06-q021', kind: 'free', skill: 'sw.agile', difficulty: 2,
      prompt: 'Beschreiben Sie, was ein **Burn-down-Chart** darstellt und woran man erkennt, dass das Sprint-Ziel gefährdet ist.',
      modelAnswer: 'Ein Burn-down-Chart zeigt den verbleibenden Aufwand (z. B. Story Points oder Stunden) über die Zeit des Sprints. Auf der x-Achse stehen die Tage, auf der y-Achse der Restaufwand. Eine Ideallinie fällt gleichmäßig vom Startwert bis auf 0 am letzten Sprinttag. Liegt die tatsächliche Linie dauerhaft deutlich über der Ideallinie (oder steigt sie, weil Arbeit hinzukommt), wird das Team bis Sprintende voraussichtlich nicht fertig – das Sprint-Ziel ist gefährdet. Dann bespricht das Team im Daily Scrum Gegenmaßnahmen, z. B. Umfang mit dem Product Owner klären.',
      keywords: ['Restaufwand', 'Zeitachse', 'Ideallinie', 'über der Ideallinie', 'Daily Scrum'],
      explanation: 'Burn-down = „herunterbrennen“ des Restaufwands. Gefährdung: Ist-Linie über Ideallinie oder steigend.',
    },
    {
      id: 'p06-q022', kind: 'text', skill: 'sw.agile', difficulty: 1,
      prompt: 'Wie heißt in Scrum die gemeinsame Vereinbarung, wann ein Backlog-Eintrag als **fertig** gilt (z. B. „getestet, dokumentiert, im Hauptzweig“)?',
      accept: ['Definition of Done', 'DoD', 'Definition-of-Done'],
      explanation: 'Die **Definition of Done (DoD)** legt fest, welche Qualitätskriterien ein Inkrement erfüllen muss. Sie sorgt dafür, dass alle unter „fertig“ dasselbe verstehen.',
    },
    {
      id: 'p06-q023', kind: 'single', skill: 'sw.agile', difficulty: 1,
      prompt: 'Welche Aussage entspricht einem Wert des **Agilen Manifests**?',
      options: ['Funktionierende Software ist wichtiger als umfassende Dokumentation.', 'Ein Plan ist wichtiger als das Reagieren auf Veränderung.', 'Verträge sind wichtiger als die Zusammenarbeit mit dem Kunden.', 'In agilen Projekten wird nichts dokumentiert.'],
      answer: 0,
      distractors: {
        '1': { why: 'Umgekehrt: Reagieren auf Veränderung zählt mehr als das Befolgen eines Plans.', error: 'agiles-manifest' },
        '2': { why: 'Umgekehrt: Zusammenarbeit mit dem Kunden zählt mehr als Vertragsverhandlung.', error: 'agiles-manifest' },
        '3': { why: 'Dokumentation ist nicht wertlos – sie zählt nur weniger als funktionierende Software.', error: 'agiles-manifest' },
      },
      explanation: 'Die vier Werte: Individuen und Interaktionen > Prozesse und Werkzeuge · funktionierende Software > umfassende Dokumentation · Zusammenarbeit mit dem Kunden > Vertragsverhandlung · Reagieren auf Veränderung > Befolgen eines Plans.',
    },
    /* ---------- l04: Testprozess, Testprotokoll ---------- */
    {
      id: 'p06-q024', kind: 'match', skill: 'qa.testprotocol', difficulty: 2,
      prompt: 'Ordne jedem Testdokument seinen Inhalt zu.',
      left: ['Testkonzept (Testplan)', 'Testfallspezifikation', 'Testprotokoll', 'Abweichungs-/Fehlerbericht', 'Testabschlussbericht'],
      right: ['Ziele, Umfang, Verfahren, Ressourcen, Termine und Endekriterien des Tests', 'Testfälle mit Vorbedingung, Eingabe und erwartetem Ergebnis', 'durchgeführte Tests mit Ist-Ergebnis, Bewertung, Datum und Tester', 'eine gefundene Abweichung mit Schritten zum Nachstellen und Schweregrad', 'Zusammenfassung der Ergebnisse, offene Fehler, Freigabeempfehlung'],
      answer: [0, 1, 2, 3, 4],
      explanation: 'Planung → Konzept · Entwurf → Testfallspezifikation · Durchführung → Protokoll · Auswertung → Fehlerbericht · Abschluss → Abschlussbericht.',
    },
    {
      id: 'p06-q025', kind: 'match', skill: 'qa.testprotocol', difficulty: 1,
      prompt: 'Ordne die Begriffe zu.',
      left: ['Alpha-Test', 'Beta-Test', 'Release Candidate', 'Abnahmetest'],
      right: ['interner Test beim Hersteller durch eigene Tester in einer Testumgebung', 'ausgewählte externe Anwender testen eine fast fertige Version in ihrer echten Umgebung', 'Version, die veröffentlicht wird, wenn keine schweren Fehler mehr auftauchen', 'der Auftraggeber prüft gegen seine Anforderungen und bestätigt die Übergabe im Protokoll'],
      answer: [0, 1, 2, 3],
      explanation: 'Alpha = intern · Beta = extern unter Realbedingungen · RC = Kandidat für die finale Version · Abnahme = Kunde prüft vertragsgemäß und unterschreibt.',
    },
    {
      id: 'p06-q026', kind: 'table', skill: 'qa.testprotocol', difficulty: 2,
      prompt: `Die Funktion \`pruefeDatum(tag, monat, jahr)\` soll gültige Kalenderdaten erkennen. **Anforderung:** Schaltjahre sind durch 4 teilbar, außer durch 100 teilbare Jahre; durch 400 teilbare Jahre sind wieder Schaltjahre. Das Ist wurde beim Test notiert. Ergänze das **Soll** (gültig/ungültig) und die **Bewertung** (ja = bestanden, nein = nicht bestanden).`,
      columns: [
        { key: 'soll', label: 'Soll', type: 'text' },
        { key: 'ist', label: 'Ist', type: 'text' },
        { key: 'ok', label: 'bestanden?', type: 'text' },
      ],
      rows: [
        { label: 'TF1: 29.02.2024', cells: { soll: { answer: 'gültig', accept: ['gueltig'] }, ist: { given: 'gültig' }, ok: { answer: 'ja', accept: ['j', 'bestanden'] } } },
        { label: 'TF2: 29.02.2023', cells: { soll: { answer: 'ungültig', accept: ['ungueltig'] }, ist: { given: 'ungültig' }, ok: { answer: 'ja', accept: ['j', 'bestanden'] } } },
        { label: 'TF3: 29.02.1900', cells: { soll: { answer: 'ungültig', accept: ['ungueltig'] }, ist: { given: 'gültig' }, ok: { answer: 'nein', accept: ['n', 'nicht bestanden'] } } },
        { label: 'TF4: 29.02.2000', cells: { soll: { answer: 'gültig', accept: ['gueltig'] }, ist: { given: 'gültig' }, ok: { answer: 'ja', accept: ['j', 'bestanden'] } } },
        { label: 'TF5: 31.04.2025', cells: { soll: { answer: 'ungültig', accept: ['ungueltig'] }, ist: { given: 'ungültig' }, ok: { answer: 'ja', accept: ['j', 'bestanden'] } } },
      ],
      misconceptions: [
        { cell: '2:soll', answer: 'gültig', error: 'testprotokoll-ist-statt-soll', why: '1900 ist durch 100, aber nicht durch 400 teilbar → **kein** Schaltjahr. Das Soll kommt aus der Anforderung, nicht aus dem Ist.' },
        { cell: '3:soll', answer: 'ungültig', error: 'schaltjahr-regel', why: '2000 ist durch 400 teilbar → Schaltjahr → 29.02.2000 ist gültig.' },
        { cell: '2:ok', answer: 'ja', error: 'testprotokoll-bewertung', why: 'Soll „ungültig“ ≠ Ist „gültig“ → nicht bestanden.' },
      ],
      hints: ['1900: durch 100 teilbar, nicht durch 400. 2000: durch 400 teilbar.', 'Der April hat nur 30 Tage.'],
      explanation: '| TF | Datum | Soll | Ist | Bewertung |\n|---|---|---|---|---|\n| 1 | 29.02.2024 | gültig | gültig | bestanden |\n| 2 | 29.02.2023 | ungültig | ungültig | bestanden |\n| 3 | 29.02.1900 | **ungültig** | gültig | **nicht bestanden** |\n| 4 | 29.02.2000 | gültig | gültig | bestanden |\n| 5 | 31.04.2025 | ungültig | ungültig | bestanden |\n\nTF 3 zeigt: Die Funktion prüft vermutlich nur „durch 4 teilbar“ und vergisst die Jahrhundert-Ausnahme. Gute Testfälle decken genau solche Sonderfälle ab.',
    },
    {
      id: 'p06-q027', kind: 'free', skill: 'qa.testprotocol', difficulty: 3,
      prompt: 'Ein Kollege legt dir sein Testprotokoll zur Funktion `versandkosten(bestellwert)` vor (Anforderung: **ab 100 €** versandkostenfrei, sonst 4,90 €):\n\n| TF | Eingabe | Soll | Ist | Bewertung |\n|---|---|---|---|---|\n| 1 | 80,00 € | 4,90 € | 4,90 € | bestanden |\n| 2 | 100,00 € | 0,00 € | 4,90 € | bestanden |\n| 3 | 150,00 € | 0,00 € | 0,00 € | bestanden |\n\nUnterschrift: –, Datum: –, getestete Version: –\n\nBeurteilen Sie das Protokoll und beschreiben Sie die nächsten Schritte.',
      modelAnswer: 'Fehler im Protokoll: TF 2 ist falsch bewertet – Soll 0,00 € und Ist 4,90 € weichen ab, der Testfall ist nicht bestanden. Es fehlen Kopf- und Abschlussangaben: Datum, Tester/Unterschrift, getestete Version und Testumgebung; ohne sie ist das Protokoll kein Nachweis. Testabdeckung: Es fehlen Grenzwerte direkt unterhalb der Grenze (99,99 €) und oberhalb (100,01 €) sowie ungültige Eingaben (negativer Betrag, Text). Nächste Schritte: Fehlerbericht für TF 2 anlegen (Ursache vermutlich Bedingung > statt ≥), Entwickler korrigiert, danach Fehlernachtest von TF 2 und Regressionstest aller Testfälle, neues vollständiges Protokoll mit Datum, Version und Unterschrift.',
      keywords: ['TF 2 nicht bestanden', 'Datum/Version/Unterschrift fehlen', 'Grenzwerte 99,99/100,01', 'Fehlerbericht', 'Regressionstest'],
      hints: ['Vergleiche in jeder Zeile Soll und Ist selbst.', 'Was macht ein Protokoll zu einem Nachweis?'],
      explanation: 'Drei Mängel: falsche Bewertung (TF 2), fehlende Pflichtangaben, lückenhafte Testfälle. Danach: Fehler melden, korrigieren, nachtesten, Regressionstest, sauber dokumentieren.',
    },
    {
      id: 'p06-q028', kind: 'match', skill: 'qa.testprotocol', difficulty: 2,
      prompt: 'Ordne jeder statischen Prüfform ihr Merkmal zu.',
      left: ['Walkthrough', 'Technisches Review', 'Inspektion', 'Audit', 'Statische Codeanalyse'],
      right: ['der Autor führt die Kollegen durch sein Ergebnis', 'Fachkollegen prüfen auf Fehler und Standards und einigen sich auf eine Bewertung', 'formalste Form mit Moderator, festen Rollen, Checklisten und Kennzahlen', 'unabhängige, oft externe Prüfung auf Einhaltung von Normen und Verträgen', 'ein Werkzeug sucht automatisch nach Auffälligkeiten im Quellcode'],
      answer: [0, 1, 2, 3, 4],
      explanation: 'Gemeinsam ist allen: Das Programm wird **nicht ausgeführt** (statisch). Formalität steigt vom Walkthrough über das Review zur Inspektion; das Audit prüft unabhängig gegen Vorgaben.',
    },
    {
      id: 'p06-q029', kind: 'match', skill: 'qa.testprotocol', difficulty: 2,
      prompt: 'Welches Qualitätsmerkmal prüft die jeweilige Testart vor allem?',
      left: ['Lasttest mit 500 gleichzeitigen Benutzern', 'Usability-Test mit Mitarbeitenden aus dem Lager', 'Penetrationstest durch einen externen Dienstleister', 'Neustart nach einem simulierten Stromausfall', 'Prüfung, ob die Rabattberechnung laut Pflichtenheft rechnet'],
      right: ['Effizienz (Leistung)', 'Benutzbarkeit', 'Sicherheit', 'Zuverlässigkeit', 'Funktionalität'],
      answer: [0, 1, 2, 3, 4],
      explanation: 'Last → Effizienz · Usability → Benutzbarkeit · Penetrationstest → Sicherheit · Wiederanlauf → Zuverlässigkeit · fachlich richtig rechnen → Funktionalität.',
    },
    {
      id: 'p06-q030', kind: 'free', skill: 'qa.testprotocol', difficulty: 1,
      prompt: 'Erläutern Sie den Unterschied zwischen einem **Alpha-Test** und einem **Beta-Test**.',
      modelAnswer: 'Der Alpha-Test findet beim Hersteller statt: Eigene Tester oder ausgewählte Anwender prüfen eine frühe Version unter Aufsicht in einer Testumgebung. Der Beta-Test findet später statt: Ausgewählte externe Anwender testen eine fast fertige Version in ihrer echten Arbeitsumgebung und melden Fehler und Verbesserungsvorschläge zurück. Der Beta-Test findet so Fehler unter realen Bedingungen (andere Hardware, echte Daten, echtes Nutzungsverhalten).',
      keywords: ['beim Hersteller', 'intern', 'externe Anwender', 'echte Umgebung', 'fast fertig'],
      explanation: 'Unterscheidungsmerkmale: wer (intern/extern), wo (Hersteller/Anwender), wann (früh/kurz vor Veröffentlichung).',
    },
    {
      id: 'p06-q031', kind: 'single', skill: 'qa.testprotocol', difficulty: 1,
      prompt: 'Was ist ein **Release Candidate (RC)**?',
      options: ['Eine Version, die als finale Version veröffentlicht wird, wenn bei den letzten Tests keine schweren Fehler mehr auftauchen', 'Die erste lauffähige Version, die nur intern getestet wird', 'Ein Mitarbeiter, der über die Freigabe entscheidet', 'Ein Sicherheitsupdate für eine bereits veröffentlichte Version'],
      answer: 0,
      distractors: {
        '1': { why: 'Frühe, interne Tests sind der Alpha-Test.', error: 'testbegriffe' },
        '2': { why: 'Release Candidate bezeichnet eine Softwareversion, keine Person.', error: 'testbegriffe' },
        '3': { why: 'Ein Update nach der Veröffentlichung ist ein Patch, kein Release Candidate.', error: 'testbegriffe' },
      },
      explanation: 'Ein **Release Candidate** ist der Kandidat für die Veröffentlichung. Werden keine schweren Fehler mehr gefunden, wird er unverändert zur finalen Version (Release).',
    },
    {
      id: 'p06-q032', kind: 'free', skill: 'qa.testprotocol', difficulty: 1,
      prompt: 'Nennen Sie sechs Angaben, die ein **Testprotokoll** enthalten sollte.',
      modelAnswer: 'Kopf: Testobjekt mit Versionsnummer, Datum, Name des Testers, Testumgebung/Teststufe. Je Testfall: Testfallnummer/Beschreibung, Vorbedingung, Testdaten (Eingabe), erwartetes Ergebnis (Soll), tatsächliches Ergebnis (Ist), Bewertung bestanden/nicht bestanden, Bemerkung bzw. Fehlernummer. Abschluss: Gesamtergebnis und Unterschrift.',
      keywords: ['Version', 'Datum', 'Tester', 'Eingabe', 'Soll', 'Ist', 'Bewertung', 'Unterschrift'],
      explanation: 'Ohne Version, Datum und Tester ist ein Protokoll kein Nachweis; ohne Soll und Ist lässt sich nichts bewerten.',
    },
    /* ---------- l05: Dokumentation ---------- */
    {
      id: 'p06-q033', kind: 'match', skill: 'sw.docs', difficulty: 1,
      prompt: 'Ordne jedem Dokument die wichtigste Zielgruppe zu.',
      left: ['Benutzerhandbuch', 'Installations- und Administratorhandbuch', 'Schnittstellenbeschreibung (API-Dokumentation)', 'Kurzanleitung für den ersten Start', 'Testprotokoll'],
      right: ['Anwender', 'Administratoren', 'Entwickler anderer Systeme', 'neue Anwender', 'Qualitätssicherung / Projektteam'],
      answer: [0, 1, 2, 3, 4],
      explanation: 'Benutzerdokumentation: Handbuch und Kurzanleitung für Anwender, Installations-/Administratorhandbuch für Admins. Entwicklerdokumentation: API-Beschreibung, Testprotokolle für Entwicklung und Qualitätssicherung.',
    },
    {
      id: 'p06-q034', kind: 'table', skill: 'sw.docs', difficulty: 2,
      prompt: `Entscheide für jeden Kommentar: **behalten** oder **löschen**.\n\n${F}\n// (1) Copyright 2027 Elektro Krämer GmbH – nur interne Nutzung\nzaehler ← zaehler + 1        // (2) zaehler um 1 erhöhen\n// (3) Timeout 30 s: der Lieferanten-Webservice trennt sonst die Verbindung\n// (4) alterPreis ← preis * 1.16\n// (5) TODO #812: Auslandsversand ergänzen\n// (6) das hier ist totaler Murks\n${F}`,
      columns: [{ key: 'e', label: 'behalten / löschen', type: 'text' }],
      rows: [
        { label: '(1) Copyright-Hinweis', cells: { e: { answer: 'behalten', accept: ['b', 'bleibt'] } } },
        { label: '(2) „zaehler um 1 erhöhen“', cells: { e: { answer: 'löschen', accept: ['l', 'loeschen', 'entfernen'] } } },
        { label: '(3) Begründung Timeout', cells: { e: { answer: 'behalten', accept: ['b', 'bleibt'] } } },
        { label: '(4) auskommentierter Code', cells: { e: { answer: 'löschen', accept: ['l', 'loeschen', 'entfernen'] } } },
        { label: '(5) TODO mit Ticket', cells: { e: { answer: 'behalten', accept: ['b', 'bleibt'] } } },
        { label: '(6) Frustkommentar', cells: { e: { answer: 'löschen', accept: ['l', 'loeschen', 'entfernen'] } } },
      ],
      misconceptions: [
        { cell: '1:e', answer: 'behalten', error: 'kommentar-redundant', why: 'Der Kommentar wiederholt nur, was im Code steht – er bringt keine Information.' },
        { cell: '3:e', answer: 'behalten', error: 'kommentar-redundant', why: 'Auskommentierten Code löscht man; frühere Stände bewahrt die Versionsverwaltung auf.' },
      ],
      explanation: 'Behalten: (1) rechtlicher Hinweis, (3) Begründung (Warum), (5) nachverfolgbares TODO. Löschen: (2) redundant, (4) auskommentierter Alt-Code, (6) Frustkommentar.',
    },
    {
      id: 'p06-q035', kind: 'free', skill: 'sw.docs', difficulty: 2,
      prompt: 'Nennen und erläutern Sie vier Qualitätskriterien einer guten **Benutzerdokumentation**.',
      modelAnswer: '1. Zielgruppengerecht/verständlich: Sprache und Detailtiefe passen zu den Anwendern, Fachbegriffe werden erklärt, Schritt-für-Schritt-Anleitungen mit Bildschirmfotos. 2. Vollständig: Alle Funktionen, Voraussetzungen und typischen Fehlermeldungen sind beschrieben. 3. Aktuell: Die Dokumentation passt zur ausgelieferten Version (Versionsnummer, Änderungshistorie). 4. Übersichtlich und auffindbar: klare Gliederung, Inhaltsverzeichnis, Stichwortverzeichnis bzw. Suchfunktion. (Weitere: korrekt und widerspruchsfrei, relevant – nur Nötiges –, barrierefrei.)',
      keywords: ['zielgruppengerecht', 'vollständig', 'aktuell', 'übersichtlich', 'korrekt'],
      explanation: 'Je Kriterium ein Satz Erklärung – „verständlich“ allein reicht in der Prüfung nicht für volle Punkte.',
    },
    {
      id: 'p06-q036', kind: 'free', skill: 'sw.docs', difficulty: 3,
      prompt: 'Für das neue Zeiterfassungsprogramm liegt folgende Gliederung einer **Installationsanleitung** für die Administratoren vor:\n\n1. Programm starten und Benutzer anlegen\n2. Setup-Datei ausführen\n3. Deinstallation\n4. Hintergrund: Architektur und Klassendiagramm\n\nBeurteilen Sie die Gliederung und schlagen Sie eine verbesserte Gliederung vor.',
      modelAnswer: 'Mängel: Es fehlen die Systemvoraussetzungen (Betriebssystem, Arbeitsspeicher, Datenbank, Netzwerkfreigaben/Ports, benötigte Rechte) und vorbereitende Schritte (Datensicherung, Download/Prüfsumme). Die Reihenfolge ist falsch (Programm starten vor der Installation). Konfiguration (Datenbankverbindung, Lizenz) und ein Funktionstest fehlen ebenso wie Fehlerbehebung und Ansprechpartner. Architektur und Klassendiagramm sind Entwicklerdokumentation und gehören nicht in eine Installationsanleitung. Verbesserte Gliederung: 1. Systemvoraussetzungen, 2. Vorbereitung (Sicherung, Download, Rechte), 3. Installation Schritt für Schritt, 4. Grundkonfiguration (Datenbank, Lizenz, Benutzer anlegen), 5. Funktionstest nach der Installation, 6. Häufige Fehler und Lösungen, 7. Deinstallation, 8. Support/Kontakt, Versionsangabe.',
      keywords: ['Systemvoraussetzungen', 'Reihenfolge', 'Konfiguration', 'Funktionstest', 'Klassendiagramm = Entwicklerdoku', 'Fehlerbehebung'],
      hints: ['Was muss ein Administrator wissen, bevor er überhaupt installiert?', 'Passt ein Klassendiagramm zur Zielgruppe?'],
      explanation: 'Bewertet werden fehlende Inhalte, falsche Reihenfolge und falsche Zielgruppe. Eine gute Antwort nennt die Mängel und liefert eine logisch geordnete Alternative.',
    },
    {
      id: 'p06-q037', kind: 'single', skill: 'sw.docs', difficulty: 1,
      prompt: 'Eine Entwicklerin möchte eine alte Berechnung „zur Sicherheit“ auskommentiert im Code lassen. Was ist die bessere Lösung?',
      options: ['Den alten Code löschen – die Versionsverwaltung (z. B. Git) bewahrt den alten Stand auf', 'Den Code in eine Textdatei auf dem Desktop kopieren', 'Den Code auskommentiert lassen und mit „NICHT LÖSCHEN“ markieren', 'Den alten Code in einer zweiten, nie aufgerufenen Funktion behalten'],
      answer: 0,
      distractors: {
        '1': { why: 'Lokale Kopien gehen verloren und sind für das Team nicht auffindbar.', error: 'kommentar-redundant' },
        '2': { why: 'Auskommentierter Code verwirrt Leser und veraltet – genau das soll vermieden werden.', error: 'kommentar-redundant' },
        '3': { why: 'Toter Code (nie aufgerufen) erschwert die Wartung genauso.', error: 'kommentar-redundant' },
      },
      explanation: 'Mit der Versionsverwaltung lässt sich jeder frühere Stand wiederherstellen. Im aktuellen Code hat alter, auskommentierter Code nichts zu suchen.',
    },
    {
      id: 'p06-q038', kind: 'text', skill: 'sw.docs', difficulty: 1,
      prompt: 'In Python steht direkt unter `def …:` eine Zeichenkette in dreifachen Anführungszeichen, die die Funktion beschreibt. Wie heißt sie? (ein Wort)',
      accept: ['Docstring', 'Doc-String', 'Dokumentationsstring'],
      hints: ['doc(umentation) + string'],
      explanation: 'Der **Docstring** beschreibt Zweck, Parameter und Rückgabe einer Funktion. Werkzeuge und die Python-Funktion `help()` lesen ihn aus. In Java heißt das Gegenstück Javadoc-Kommentar (`/** … */`).',
    },
    /* ---------- l04 (Nachtrag): Positiv- und Negativtests ---------- */
    {
      id: 'p06-q039', kind: 'table', skill: 'qa.testprotocol', difficulty: 2,
      prompt: 'Für das neue Urlaubsportal der Elektro Krämer GmbH liegt dieser Auszug aus dem Pflichtenheft vor:\n\n> **Feld „Urlaubstage“:** ganze Zahl von **1 bis 30** (einschließlich). Ungültige Eingaben werden mit einer Fehlermeldung abgelehnt und nicht gespeichert.\n\nDer Tester hat die folgenden Testdaten geplant. Ergänze für jeden Testfall die **Testart** (positiv/negativ), das **Soll** (akzeptiert/Fehlermeldung) und ob es ein **Grenzwert** ist (ja/nein).',
      columns: [
        { key: 'art', label: 'Testart', type: 'text' },
        { key: 'soll', label: 'Soll', type: 'text' },
        { key: 'grenz', label: 'Grenzwert?', type: 'text' },
      ],
      rows: [
        { label: 'TF1: 1', cells: { art: { answer: 'positiv', accept: ['p', 'pos', 'positivtest'] }, soll: { answer: 'akzeptiert', accept: ['akzeptieren', 'angenommen', 'ok', 'gültig', 'gueltig'] }, grenz: { answer: 'ja', accept: ['j'] } } },
        { label: 'TF2: 15', cells: { art: { answer: 'positiv', accept: ['p', 'pos', 'positivtest'] }, soll: { answer: 'akzeptiert', accept: ['akzeptieren', 'angenommen', 'ok', 'gültig', 'gueltig'] }, grenz: { answer: 'nein', accept: ['n'] } } },
        { label: 'TF3: 30', cells: { art: { answer: 'positiv', accept: ['p', 'pos', 'positivtest'] }, soll: { answer: 'akzeptiert', accept: ['akzeptieren', 'angenommen', 'ok', 'gültig', 'gueltig'] }, grenz: { answer: 'ja', accept: ['j'] } } },
        { label: 'TF4: 0', cells: { art: { answer: 'negativ', accept: ['n', 'neg', 'negativtest'] }, soll: { answer: 'Fehlermeldung', accept: ['fehler', 'abgelehnt', 'ablehnen', 'ungültig', 'ungueltig'] }, grenz: { answer: 'ja', accept: ['j'] } } },
        { label: 'TF5: 31', cells: { art: { answer: 'negativ', accept: ['n', 'neg', 'negativtest'] }, soll: { answer: 'Fehlermeldung', accept: ['fehler', 'abgelehnt', 'ablehnen', 'ungültig', 'ungueltig'] }, grenz: { answer: 'ja', accept: ['j'] } } },
        { label: 'TF6: abc', cells: { art: { answer: 'negativ', accept: ['n', 'neg', 'negativtest'] }, soll: { answer: 'Fehlermeldung', accept: ['fehler', 'abgelehnt', 'ablehnen', 'ungültig', 'ungueltig'] }, grenz: { answer: 'nein', accept: ['n'] } } },
        { label: 'TF7: (leeres Feld)', cells: { art: { answer: 'negativ', accept: ['n', 'neg', 'negativtest'] }, soll: { answer: 'Fehlermeldung', accept: ['fehler', 'abgelehnt', 'ablehnen', 'ungültig', 'ungueltig'] }, grenz: { answer: 'nein', accept: ['n'] } } },
      ],
      misconceptions: [
        { cell: '0:grenz', answer: 'nein', error: 'grenzwert-gueltig-ungueltig', why: '1 ist die untere Grenze selbst – ein Grenzwert der gültigen Klasse.' },
        { cell: '3:art', answer: 'positiv', error: 'positiv-negativtest', why: '0 liegt außerhalb von 1 bis 30 – eine ungültige Eingabe → Negativtest.' },
        { cell: '3:soll', answer: 'akzeptiert', error: 'grenzwert-gueltig-ungueltig', why: '0 ist kleiner als 1 und muss abgelehnt werden.' },
        { cell: '4:soll', answer: 'akzeptiert', error: 'grenzwert-gueltig-ungueltig', why: '31 ist größer als 30 und muss abgelehnt werden.' },
        { cell: '5:art', answer: 'positiv', error: 'positiv-negativtest', why: '„abc“ ist keine Zahl – ungültige Eingabe → Negativtest.' },
      ],
      hints: ['Positivtest = gültige Eingabe, Negativtest = ungültige Eingabe.', 'Grenzwerte liegen an und direkt neben den Grenzen 1 und 30: 0, 1, 30, 31.'],
      explanation: '| TF | Eingabe | Testart | Soll | Grenzwert |\n|---|---|---|---|---|\n| 1 | 1 | positiv | akzeptiert | ja |\n| 2 | 15 | positiv | akzeptiert | nein (Vertreter der gültigen Klasse) |\n| 3 | 30 | positiv | akzeptiert | ja |\n| 4 | 0 | negativ | Fehlermeldung | ja |\n| 5 | 31 | negativ | Fehlermeldung | ja |\n| 6 | abc | negativ | Fehlermeldung | nein (Klasse „keine Zahl“) |\n| 7 | leer | negativ | Fehlermeldung | nein (Klasse „keine Eingabe“) |\n\nÄquivalenzklassen: gültig 1–30 · ungültig < 1 · ungültig > 30 · keine Zahl · leer. Sinnvolle Ergänzung: 2,5 (keine ganze Zahl) als weiterer Negativtest.',
    },
  ],
};
