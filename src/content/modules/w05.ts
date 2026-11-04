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
  generators: ['w.netzplan'],
  skills: [
    { id: 'w.projekt', module: 'w05', title: 'Projektbegriff und magisches Dreieck' },
    { id: 'w.phasen', module: 'w05', title: 'Projektphasen, Projektstrukturplan, Meilensteine', requires: ['w.projekt'] },
    { id: 'w.netzplan', module: 'w05', title: 'Gantt-Diagramm und Netzplan', requires: ['w.phasen'] },
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

**Klassisch vs. agil:** Das klassische **Wasserfallmodell** arbeitet die Phasen nacheinander ab – gut, wenn die Anforderungen feststehen (z. B. Hardware-Rollout). **Agile** Vorgehen wie **Scrum** liefern in kurzen Iterationen (Sprints, 1–4 Wochen) nutzbare Teilergebnisse und reagieren flexibel auf geänderte Anforderungen – typisch für Softwareentwicklung.`,
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
      id: 'w05-l03',
      title: 'Gantt-Diagramm und Netzplan',
      minutes: 30,
      relevance: 'ap1-teilweise',
      skills: ['w.netzplan'],
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
      id: 'w05-l04',
      title: 'Einweisung, Abnahme und Übergabe',
      minutes: 25,
      relevance: 'ap1',
      skills: ['w.abnahme'],
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
  ],
};
