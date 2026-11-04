import type { Module } from '../types';

export const b05: Module = {
  id: 'b05',
  nr: 5,
  area: 'systeme',
  title: 'Qualitätsmanagement & Dokumentation',
  short: 'Qualitätsbegriff, ISO 9001, PDCA und KVP, Lasten- und Pflichtenheft, Checklisten, Tests und Abnahme, Installations- und Übergabeprotokoll, Benutzer- und Betriebsdokumentation.',
  icon: 'Award',
  relevance: 'ap1',
  prerequisites: ['b01'],
  skills: [
    { id: 'qm.basics', module: 'b05', title: 'Qualitätsbegriff und QM-Normen' },
    { id: 'qm.pdca', module: 'b05', title: 'PDCA-Zyklus und kontinuierliche Verbesserung', requires: ['qm.basics'] },
    { id: 'qm.requirements', module: 'b05', title: 'Lastenheft, Pflichtenheft und Checklisten', requires: ['qm.basics'] },
    { id: 'qm.testing', module: 'b05', title: 'Testen und Abnahme eines IT-Arbeitsplatzes', requires: ['qm.requirements'] },
    { id: 'qm.doc', module: 'b05', title: 'Installations-, Übergabe- und Benutzerdokumentation', requires: ['qm.testing'] },
  ],
  lessons: [
    /* ------------------------------------------------------------ */
    {
      id: 'b05-l01',
      title: 'Was ist Qualität? Begriff und Normen',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['qm.basics'],
      simple: `Qualität heißt nicht „teuer“ oder „Luxus“, sondern: Das Ergebnis erfüllt die vereinbarten Anforderungen. Ein günstiger Büro-PC, der alles kann, was im Pflichtenheft steht, hat also hohe Qualität. Qualitätsmanagement (QM) ist wie das Rezeptbuch einer Restaurantküche: Es legt fest, wie gearbeitet wird, damit jedes Gericht gleich gut gelingt. Normen helfen dabei: ISO 9001 für QM-Systeme, ISO/IEC 20000 für IT-Services, ISO/IEC 27001 für Informationssicherheit.

**Merke:** Qualität = Grad, in dem Merkmale die Anforderungen erfüllen (ISO 9000); Fehler vermeiden ist besser als Fehler finden.`,
      steps: [
        {
          type: 'explain',
          title: 'Qualität = Anforderungen erfüllen',
          body: `Im Alltag heißt „Qualität“ oft „hochwertig“ oder „teuer“. Fachlich ist Qualität etwas anderes. Nach **DIN EN ISO 9000** ist Qualität der **Grad, in dem ein Satz inhärenter Merkmale eines Objekts Anforderungen erfüllt**.

Auf Deutsch: Ein Produkt oder eine Dienstleistung hat hohe Qualität, wenn sie **die vereinbarten bzw. erwarteten Anforderungen** erfüllt – nicht, wenn sie möglichst viel kann. Ein Office-PC mit 64 GB RAM und Profi-Grafikkarte ist für einen Sachbearbeiter nicht „bessere Qualität“, sondern **an der Anforderung vorbei** (zu teuer, zu laut, zu stromhungrig).

**Qualitätsmanagement (QM)** umfasst alle Tätigkeiten, mit denen eine Organisation Qualität plant, lenkt, sichert und verbessert:

| Begriff | Bedeutung |
|---|---|
| **Qualitätsplanung** | Ziele und Anforderungen festlegen |
| **Qualitätslenkung** | Prozesse so steuern, dass die Anforderungen erfüllt werden |
| **Qualitätssicherung (QS)** | Vertrauen schaffen, dass Anforderungen erfüllt werden – **konstruktiv** (Fehler vermeiden: Standards, Checklisten, Schulungen, Vorlagen, Images) und **analytisch** (Fehler finden: Tests, Reviews, Audits, Messungen) |
| **Qualitätsverbesserung** | Prozesse fortlaufend besser machen (KVP) |

**Wichtige Normen:**

| Norm | Inhalt |
|---|---|
| **ISO 9000** | Grundlagen und Begriffe des QM |
| **ISO 9001** | **Anforderungen an ein QM-System** – zertifizierbar. Kernideen: Kundenorientierung, prozessorientierter Ansatz, risikobasiertes Denken, PDCA. Aktuelle Ausgabe: ISO 9001:2015 (eine Überarbeitung ist in Arbeit). Ein Zertifikat gilt 3 Jahre, mit jährlichen Überwachungsaudits |
| **ISO/IEC 20000-1** | Anforderungen an ein **IT-Service-Management**-System |
| **ISO/IEC 27001** | Anforderungen an ein **Informationssicherheits**-Managementsystem (ISMS) |
| **ITIL 4** | kein Normtext, sondern eine verbreitete **Sammlung bewährter Praktiken** für IT-Service-Management |

**Die sieben QM-Grundsätze (ISO 9000):** Kundenorientierung, Führung, Engagement von Personen, prozessorientierter Ansatz, Verbesserung, faktengestützte Entscheidungsfindung, Beziehungsmanagement.

Warum lassen sich Firmen zertifizieren? Kunden (z. B. Industrie, öffentliche Auftraggeber) verlangen es oft; Abläufe werden einheitlich und nachvollziehbar; Fehler und Nacharbeit sinken.`,
        },
        {
          type: 'visual',
          title: 'Konstruktive und analytische Qualitätssicherung',
          widget: {
            kind: 'cards',
            data: {
              columns: 2,
              items: [
                { title: 'Konstruktiv – Fehler vermeiden', text: 'Standard-Image, Installationscheckliste, Namenskonventionen, Schulung, Vorlagen für Protokolle, geprüfte Hardware-Standards.', icon: 'ShieldCheck' },
                { title: 'Analytisch – Fehler finden', text: 'Funktionstest, Abnahmetest mit dem Benutzer, Review der Konfiguration, internes Audit, Auswertung von Tickets.', icon: 'Search' },
              ],
            },
          },
          caption: 'Gute Qualitätssicherung kombiniert beides: Vorbeugen ist billiger als Nacharbeiten.',
        },
        {
          type: 'example',
          title: 'Qualität beim Arbeitsplatz-Rollout',
          problem: 'Die IT der Elektro Krämer GmbH richtet 20 neue Arbeitsplätze ein. Nenne je zwei konstruktive und analytische Maßnahmen der Qualitätssicherung.',
          steps: [
            { label: 'Konstruktiv', body: '1. Getestetes **Standard-Image** mit allen Programmen und Einstellungen. 2. **Installationscheckliste**, die jeder Techniker abarbeitet (Namenskonvention, Domäne, BitLocker, Drucker …).' },
            { label: 'Analytisch', body: '1. **Funktionstest** jedes PCs nach Checkliste (Anmeldung, Netzlaufwerke, Drucken, E-Mail, Fachanwendung). 2. **Abnahme** mit dem Benutzer und unterschriebenes Übergabeprotokoll.' },
          ],
          result: 'Einheitliche Vorgaben vermeiden Fehler, Tests und Abnahme decken die verbleibenden auf.',
        },
        {
          type: 'check',
          question: {
            id: 'b05-c01', kind: 'single', skill: 'qm.basics', difficulty: 1,
            prompt: 'Was bedeutet **Qualität** nach ISO 9000?',
            options: ['Grad, in dem Merkmale eines Produkts/einer Leistung die Anforderungen erfüllen', 'Möglichst hochwertige und teure Komponenten', 'Anzahl der Funktionen eines Produkts', 'Zertifizierung nach ISO 9001'],
            answer: 0,
            distractors: { '1': { why: 'Teuer ist nicht gleich passend – Qualität bemisst sich an den Anforderungen.', error: 'qm-begriff' }, '2': { why: 'Mehr Funktionen erfüllen nicht automatisch die Anforderungen.', error: 'qm-begriff' }, '3': { why: 'Ein Zertifikat bestätigt ein QM-System, es ist nicht die Definition von Qualität.', error: 'qm-begriff' } },
            explanation: 'Qualität = Erfüllung der Anforderungen.',
          },
        },
        { type: 'practice', title: 'Übung: Qualitätsbegriff und Normen', questionIds: ['b05-q001', 'b05-q002', 'b05-q003', 'b05-q004'], count: 4, difficulty: 1 },
        { type: 'summary', points: ['Qualität = Grad der Erfüllung von Anforderungen (ISO 9000).', 'QM: planen, lenken, sichern, verbessern.', 'QS konstruktiv (vermeiden) und analytisch (finden).', 'ISO 9001 (QM-System, zertifizierbar), ISO/IEC 20000 (IT-Services), ISO/IEC 27001 (ISMS), ITIL (Best Practice).'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b05-l02',
      title: 'PDCA-Zyklus und kontinuierliche Verbesserung',
      minutes: 20,
      relevance: 'ap1',
      skills: ['qm.pdca'],
      simple: `Der PDCA-Zyklus funktioniert wie das Verbessern eines Rezepts: Du planst (Plan), probierst es im Kleinen aus (Do), prüfst, ob es besser geschmeckt hat (Check), und machst die verbesserte Version zum festen Rezept (Act). Danach beginnt der Kreis von vorn, denn es gibt immer etwas zu verbessern. Diese Haltung heißt kontinuierlicher Verbesserungsprozess (KVP), auf Japanisch Kaizen: viele kleine Schritte statt eines großen Sprungs. Ob es wirklich besser geworden ist, misst du mit Kennzahlen.

**Merke:** Plan – Do – Check – Act: Do im Kleinen (Pilot), Act = als neuen Standard übernehmen.`,
      steps: [
        {
          type: 'explain',
          title: 'Plan – Do – Check – Act',
          body: `Der **PDCA-Zyklus** (Deming-Kreis) ist das Grundmodell für Verbesserungen – in ISO 9001, ISO 27001 und im IT-Alltag.

| Phase | Frage | Tätigkeiten |
|---|---|---|
| **Plan** (Planen) | Was wollen wir erreichen, wie? | Ist-Zustand analysieren, Ursachen finden, Ziele und Kennzahlen festlegen, Maßnahmen planen |
| **Do** (Umsetzen) | Umsetzen – zunächst im Kleinen | Maßnahme als Pilot/Test durchführen |
| **Check** (Überprüfen) | Hat es funktioniert? | Ergebnisse messen, mit dem Ziel vergleichen |
| **Act** (Handeln) | Was folgt daraus? | Bei Erfolg als **Standard** einführen und dokumentieren; sonst Ursachen analysieren und neuen Zyklus starten |

Danach beginnt der Kreis von vorn – das ist der **kontinuierliche Verbesserungsprozess (KVP)**, japanisch **Kaizen**: viele kleine, stetige Verbesserungen statt seltener großer Umbrüche. Ein erreichter Standard wirkt dabei wie ein **Keil**, der verhindert, dass man zurückrollt.

**Woran misst man Verbesserung im IT-Betrieb?** An **Kennzahlen (KPIs)**, z. B. Anzahl Tickets pro Woche, Erstlösungsquote im Service Desk, durchschnittliche Lösungszeit, Verfügbarkeit, Anteil fehlerfreier Arbeitsplatz-Übergaben.`,
        },
        {
          type: 'visual',
          title: 'Der Deming-Kreis',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Plan', text: 'Problem analysieren, Ziel + Kennzahl festlegen, Maßnahme planen.', icon: 'ClipboardList' },
                { title: 'Do', text: 'Maßnahme im kleinen Rahmen umsetzen (Pilot).', icon: 'Wrench' },
                { title: 'Check', text: 'Wirkung messen und mit dem Ziel vergleichen.', icon: 'Gauge' },
                { title: 'Act', text: 'Erfolg standardisieren – oder neuen Zyklus starten.', icon: 'RefreshCw' },
              ],
            },
          },
          caption: 'Nach „Act“ beginnt wieder „Plan“ – Verbesserung hört nie auf.',
        },
        {
          type: 'example',
          title: 'Weniger Nacharbeit bei neuen Arbeitsplätzen',
          problem: 'Bei den letzten 40 übergebenen Arbeitsplätzen gab es bei 6 Nacharbeiten (fehlender Drucker, falsches Netzlaufwerk). Wende den PDCA-Zyklus an.',
          steps: [
            { label: 'Plan', body: 'Ist: Fehlerquote 6 / 40 = **15 %**. Ursache laut Tickets: Drucker und Laufwerke werden von Hand eingerichtet und vergessen. Ziel: Fehlerquote unter 5 %. Maßnahme: Drucker und Laufwerke per Gruppenrichtlinie zuweisen, Checkliste um einen Funktionstest ergänzen.' },
            { label: 'Do', body: 'Pilot in der Abteilung Vertrieb mit den nächsten 10 Arbeitsplätzen.' },
            { label: 'Check', body: 'Ergebnis: 0 Nacharbeiten bei 10 Übergaben (0 %) → Ziel erreicht.' },
            { label: 'Act', body: 'GPO und neue Checkliste für alle Abteilungen als **Standard** einführen, Dokumentation aktualisieren. Nächster Zyklus: Dauer der Einrichtung verkürzen.' },
          ],
          result: 'Mit einer messbaren Kennzahl (Fehlerquote) lässt sich die Wirkung der Maßnahme belegen.',
        },
        {
          type: 'check',
          question: {
            id: 'b05-c02', kind: 'order', skill: 'qm.pdca', difficulty: 1,
            prompt: 'Bringe die Phasen des PDCA-Zyklus in die richtige Reihenfolge.',
            items: ['Plan – Ziel und Maßnahme planen', 'Do – Maßnahme (im Kleinen) umsetzen', 'Check – Ergebnis messen und bewerten', 'Act – standardisieren oder neu ansetzen'],
            explanation: 'Plan → Do → Check → Act.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'b05-c03', kind: 'number', skill: 'qm.pdca', difficulty: 2,
            prompt: 'Von **40** übergebenen Arbeitsplätzen mussten **6** nachgearbeitet werden. Wie hoch ist die Fehlerquote in Prozent?',
            answer: 15, unit: '%',
            explanation: '6 / 40 · 100 % = **15 %**.',
          },
        },
        { type: 'practice', title: 'Übung: PDCA und KVP', questionIds: ['b05-q005', 'b05-q006', 'b05-q007', 'b05-q008'], count: 4, difficulty: 2 },
        { type: 'summary', points: ['PDCA: Plan – Do – Check – Act, dann von vorn.', 'Do im Kleinen (Pilot), Act = standardisieren.', 'KVP/Kaizen: viele kleine, stetige Verbesserungen.', 'Verbesserung mit Kennzahlen messen.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b05-l03',
      title: 'Anforderungen festhalten: Lastenheft, Pflichtenheft, Checklisten',
      minutes: 20,
      relevance: 'ap1',
      skills: ['qm.requirements'],
      simple: `Das Lastenheft ist wie ein Wunschzettel: Der Auftraggeber schreibt auf, WAS er braucht und WOFÜR. Das Pflichtenheft ist die Antwort des Auftragnehmers: WIE und WOMIT er die Wünsche umsetzt. Funktionale Anforderungen beschreiben, was das System tun soll (z. B. „druckt doppelseitig“), nicht-funktionale, wie gut es das tun soll (z. B. „startet in unter 30 Sekunden“). Gute Anforderungen sind eindeutig und prüfbar, damit man bei der Abnahme klar sagen kann: erfüllt oder nicht erfüllt.

**Merke:** Lastenheft = Auftraggeber, was und wofür; Pflichtenheft = Auftragnehmer, wie und womit – Grundlage der Abnahme.`,
      steps: [
        {
          type: 'explain',
          title: 'Was soll geliefert werden – und wie?',
          body: `Qualität kann man nur prüfen, wenn die **Anforderungen** vorher klar festgelegt sind.

| | **Lastenheft** | **Pflichtenheft** |
|---|---|---|
| Wer schreibt? | **Auftraggeber** (Kunde) | **Auftragnehmer** (z. B. IT-Systemhaus) |
| Inhalt | **Was** wird gebraucht und **wofür**? Anforderungen aus Sicht des Kunden | **Wie** und **womit** werden die Anforderungen umgesetzt? Konkrete Lösung |
| Beispiel | „12 Arbeitsplätze für die Buchhaltung, Zugriff auf DATEV und die Warenwirtschaft, zwei Monitore, verschlüsselte Festplatten, Inbetriebnahme bis 30.03.“ | „12 × Business-PC Modell X (16 GB RAM, 512 GB SSD), Windows 11 Pro, 2 × 24-Zoll-Monitor, BitLocker mit TPM, Installation per Image am 26./27.03., Abnahme am 28.03.“ |
| Grundlage für | Angebotsanfrage, Ausschreibung | Angebot, Vertrag, **Abnahme** |

**Anforderungsarten:**
- **Funktionale** Anforderungen: *Was* soll das System tun? („Benutzer kann auf das Netzlaufwerk P: zugreifen“, „Scan-to-Mail funktioniert“).
- **Nicht-funktionale** Anforderungen: *Wie gut*? (Leistung, Verfügbarkeit, Sicherheit, Ergonomie, Geräuschpegel, Energieverbrauch, Barrierefreiheit).

Gute Anforderungen sind **eindeutig und prüfbar**. „Der PC soll schnell sein“ ist nicht prüfbar; „Anmeldung bis zur Arbeitsfähigkeit unter 60 Sekunden“ schon.

**Checklisten** sind das einfachste, aber wirksamste QS-Werkzeug:
- **Installationscheckliste:** jeder Schritt der Einrichtung zum Abhaken (Rechnername nach Konvention, Domäne, Updates, Virenschutz aktiv, BitLocker, Software, Drucker …).
- **Testcheckliste/Abnahmecheckliste:** welche Funktionen werden mit welchem erwarteten Ergebnis geprüft.
- Vorteile: nichts wird vergessen, unabhängig von der Person, Nachweis für die Dokumentation, Grundlage für Verbesserung (fehlende Punkte ergänzen).`,
        },
        {
          type: 'visual',
          title: 'Vom Bedarf zur Abnahme',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['Kunde (Auftraggeber)', 'IT-Systemhaus (Auftragnehmer)'],
              messages: [
                { from: 0, to: 1, label: 'Lastenheft: Was und wofür?' },
                { from: 1, to: 0, label: 'Pflichtenheft + Angebot: Wie und womit?' },
                { from: 0, to: 1, label: 'Auftrag (Vertrag)' },
                { from: 1, to: 1, label: 'Umsetzung nach Checkliste, Tests' },
                { from: 1, to: 0, label: 'Abnahmetest gegen das Pflichtenheft' },
                { from: 0, to: 1, label: 'Abnahmeprotokoll (unterschrieben)', note: 'ggf. mit Mängelliste' },
              ],
            },
          },
          caption: 'Das Pflichtenheft ist der Maßstab, an dem bei der Abnahme geprüft wird.',
        },
        {
          type: 'example',
          title: 'Anforderungen prüfbar formulieren',
          problem: 'Der Kunde schreibt: „Die neuen Rechner sollen leise, sicher und schnell sein.“ Formuliere daraus prüfbare Anforderungen.',
          steps: [
            { label: 'leise', body: '„Geräuschemission im Office-Betrieb höchstens 25 dB(A) laut Datenblatt.“' },
            { label: 'sicher', body: '„Systemlaufwerk mit BitLocker (TPM) verschlüsselt; Virenschutz aktiv; Benutzer arbeiten ohne lokale Administratorrechte.“' },
            { label: 'schnell', body: '„Start bis Anmeldebildschirm unter 30 s; Öffnen der Warenwirtschaft unter 5 s.“' },
          ],
          result: 'Mit Messgröße und Grenzwert lässt sich bei der Abnahme objektiv entscheiden: erfüllt oder nicht erfüllt.',
        },
        {
          type: 'check',
          question: {
            id: 'b05-c04', kind: 'single', skill: 'qm.requirements', difficulty: 1,
            prompt: 'Wer erstellt das **Pflichtenheft**?',
            options: ['Der Auftragnehmer', 'Der Auftraggeber', 'Eine Zertifizierungsstelle', 'Der Hardwarehersteller'],
            answer: 0,
            distractors: { '1': { why: 'Der Auftraggeber schreibt das Lastenheft.', error: 'lasten-pflichtenheft' }, '2': { why: 'Zertifizierungsstellen prüfen QM-Systeme, keine Projekte.', error: 'lasten-pflichtenheft' }, '3': { why: 'Der Hersteller liefert Datenblätter, kein projektbezogenes Pflichtenheft.', error: 'lasten-pflichtenheft' } },
            explanation: 'Lastenheft = Auftraggeber (Was/Wofür), Pflichtenheft = Auftragnehmer (Wie/Womit).',
          },
        },
        { type: 'practice', title: 'Übung: Anforderungen und Checklisten', questionIds: ['b05-q009', 'b05-q010', 'b05-q011', 'b05-q012'], count: 4, difficulty: 2 },
        { type: 'summary', points: ['Lastenheft (Auftraggeber): Was und wofür.', 'Pflichtenheft (Auftragnehmer): Wie und womit – Grundlage der Abnahme.', 'Funktionale vs. nicht-funktionale Anforderungen.', 'Anforderungen eindeutig und prüfbar formulieren.', 'Checklisten: nichts vergessen, personenunabhängig, Nachweis.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b05-l04',
      title: 'Testen und Abnahme eines IT-Arbeitsplatzes',
      minutes: 25,
      relevance: 'ap1',
      skills: ['qm.testing'],
      simple: `Testen ist wie die Probefahrt vor dem Autokauf: Du prüfst geplant, ob alles so funktioniert wie versprochen. Für jeden Testfall legst du vorher das erwartete Ergebnis fest – für den Normalfall, einen Ausnahmefall und einen Fehlerfall. Getestet wird in Stufen: einzelne Teile, ihr Zusammenspiel, das ganze System und zum Schluss die Abnahme durch den Kunden. Mit der Abnahme bestätigt der Kunde, dass die Leistung vertragsgemäß ist; ab dann ist die Bezahlung fällig, und die Verjährungsfrist für Mängel beginnt.

**Merke:** Teststufen: Komponente → Integration → System → Abnahme; die Abnahme wird im Protokoll mit Mängeln, Fristen und Unterschriften festgehalten.`,
      steps: [
        {
          type: 'explain',
          title: 'Vom Funktionstest zur Abnahme',
          body: `Bevor ein Arbeitsplatz übergeben wird, wird er **getestet** – nach einem Plan, nicht nach Gefühl.

**Teststufen** (aus der Softwareentwicklung, übertragbar auf IT-Systeme):

| Stufe | Was wird geprüft? | Arbeitsplatz-Beispiel |
|---|---|---|
| **Komponententest** | einzelne Bausteine | Monitor, Dockingstation, Netzwerkkarte funktionieren |
| **Integrationstest** | Zusammenspiel/Schnittstellen | PC in Domäne, Zugriff auf Fileserver, Drucker, E-Mail-Server |
| **Systemtest** | Gesamtsystem gegen die Anforderungen (beim Auftragnehmer) | alle Punkte des Pflichtenhefts im Testlauf |
| **Abnahmetest** | durch den **Kunden/Benutzer** im echten Umfeld | Benutzerin arbeitet ihre typischen Aufgaben durch und bestätigt |

**Testfälle** beschreiben Eingabe/Vorgehen und **erwartetes Ergebnis**. Gute Testfälle decken ab:
- **Normalfall:** „Benutzer meldet sich an, öffnet P:, speichert eine Datei“ → klappt.
- **Grenz-/Ausnahmefall:** „Notebook ohne Netzwerk (Homeoffice, VPN)“, „Datei > 4 GiB auf USB-Stick“.
- **Fehlerfall:** „falsches Passwort dreimal“ → Konto wird gesperrt wie vorgesehen; „Zugriff auf Ordner Buchhaltung als Vertriebsmitarbeiter“ → wird verweigert.

**Black-Box-Test:** nur Ein-/Ausgabe prüfen, ohne Blick ins Innere (typisch für Abnahme). **White-Box-Test:** mit Kenntnis der internen Struktur (z. B. Konfiguration, Code).

**Abnahme** ist die Erklärung des Auftraggebers, dass die Leistung **im Wesentlichen vertragsgemäß** ist. Beim Werkvertrag (§ 640 BGB) hat sie rechtliche Folgen: Die Vergütung wird fällig (§ 641 BGB), die Gefahr geht auf den Kunden über, und die Verjährungsfrist für Mängelansprüche beginnt. Wegen **unwesentlicher** Mängel darf die Abnahme nicht verweigert werden; die Mängel werden mit Frist im **Abnahmeprotokoll** festgehalten (Abnahme unter Vorbehalt).

**Inhalt eines Abnahmeprotokolls:** Projekt/Auftrag, Datum, Ort, Beteiligte; abgenommener Leistungsumfang (Bezug zum Pflichtenheft); durchgeführte Tests mit Ergebnis; festgestellte **Mängel** mit Frist zur Beseitigung; Vorbehalte; Ergebnis (abgenommen / abgenommen mit Mängeln / nicht abgenommen); **Unterschriften** beider Seiten.`,
        },
        {
          type: 'visual',
          title: 'Teststufen',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Komponente', text: 'Einzelteile funktionieren (Monitor, Dock, Headset).', icon: 'Cpu' },
                { title: 'Integration', text: 'Zusammenspiel: Domäne, Fileserver, Drucker, E-Mail.', icon: 'Network' },
                { title: 'System', text: 'Gesamtsystem gegen das Pflichtenheft (beim Auftragnehmer).', icon: 'ListChecks' },
                { title: 'Abnahme', text: 'Kunde prüft im Echtbetrieb und unterschreibt.', icon: 'ThumbsUp' },
              ],
            },
          },
          caption: 'Jede Stufe findet andere Fehler – am teuersten sind die, die erst der Kunde findet.',
        },
        {
          type: 'example',
          title: 'Testprotokoll für einen Buchhaltungsarbeitsplatz',
          problem: 'Erstelle Testfälle für den neuen Arbeitsplatz von Frau Nowak (Buchhaltung) mit erwarteten Ergebnissen – mindestens je einen Normal-, Ausnahme- und Fehlerfall.',
          steps: [
            { label: 'Normalfall 1', body: 'Anmeldung mit Domänenkonto → Desktop erscheint, Laufwerk P: und Drucker „PR-HH-BH“ sind verbunden. ✔' },
            { label: 'Normalfall 2', body: 'DATEV und Warenwirtschaft starten, Testbuchung wird gespeichert. ✔' },
            { label: 'Ausnahmefall', body: 'Netzwerkkabel ziehen → Anmeldung mit zwischengespeicherten Anmeldeinformationen möglich, Hinweis „Netzlaufwerk nicht verfügbar“. ✔' },
            { label: 'Fehlerfall', body: 'Zugriff auf `\\\\FS01\\Vertrieb` → **Zugriff verweigert** (gewünscht, Need-to-know). ✔' },
            { label: 'Sicherheit', body: 'BitLocker-Status „Schutz aktiviert“, Virenschutz aktuell, Benutzer ist kein lokaler Admin. ✔' },
          ],
          result: 'Alle Testfälle mit Ergebnis, Datum, Prüfer dokumentiert – Grundlage für die Abnahme mit Frau Nowak.',
        },
        {
          type: 'check',
          question: {
            id: 'b05-c05', kind: 'single', skill: 'qm.testing', difficulty: 2,
            prompt: 'Bei der Abnahme fällt auf, dass an einem von zwölf Arbeitsplätzen das Firmenlogo im Anmeldebildschirm fehlt. Wie gehst du vor?',
            options: ['Abnahme mit Vorbehalt: Mangel mit Frist im Abnahmeprotokoll festhalten.', 'Die Abnahme komplett verweigern.', 'Den Mangel verschweigen.', 'Alle Arbeitsplätze neu installieren.'],
            answer: 0,
            distractors: { '1': { why: 'Wegen unwesentlicher Mängel darf die Abnahme nicht verweigert werden (§ 640 BGB).', error: 'abnahme-mangel' }, '2': { why: 'Mängel werden immer dokumentiert – Transparenz und Qualität.', error: 'abnahme-mangel' }, '3': { why: 'Völlig unverhältnismäßig für einen kosmetischen Mangel.', error: 'abnahme-mangel' } },
            explanation: 'Unwesentlicher Mangel → Abnahme erklären, Mangel mit Frist protokollieren.',
          },
        },
        { type: 'practice', title: 'Übung: Testen und Abnahme', questionIds: ['b05-q013', 'b05-q014', 'b05-q015', 'b05-q016', 'b05-q017'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Teststufen: Komponente → Integration → System → Abnahme.', 'Testfälle mit erwartetem Ergebnis: Normal-, Ausnahme-, Fehlerfall.', 'Black-Box (von außen) vs. White-Box (mit Innensicht).', 'Abnahme (§ 640 BGB): Vergütung fällig, Gefahrübergang, Verjährungsbeginn.', 'Abnahmeprotokoll mit Mängeln, Fristen, Unterschriften.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b05-l05',
      title: 'Dokumentation: Installations- und Übergabeprotokoll, Handbuch',
      minutes: 20,
      relevance: 'ap1',
      skills: ['qm.doc'],
      simple: `Dokumentation ist das Gedächtnis der IT: Was nicht aufgeschrieben ist, weiß im Notfall niemand – vor allem nicht die Kollegin, die dich im Urlaub vertritt. Das Installationsprotokoll hält fest, was technisch eingerichtet wurde; das Übergabeprotokoll bestätigt mit Unterschrift, dass der Kunde alles erhalten hat; das Benutzerhandbuch erklärt den Anwendern die Bedienung. Gute Dokumentation ist für die Zielgruppe verständlich, aktuell, vollständig, versioniert und leicht zu finden. Passwörter gehören nie im Klartext in ein Dokument.

**Merke:** Installationsprotokoll (für die IT), Übergabeprotokoll (IT und Kunde), Benutzerhandbuch (für Anwender).`,
      steps: [
        {
          type: 'explain',
          title: 'Was nicht dokumentiert ist, ist nicht passiert',
          body: `Dokumentation macht IT **nachvollziehbar, wartbar und übergabefähig** – auch wenn der Kollege, der alles eingerichtet hat, im Urlaub ist oder die Firma verlässt.

| Dokument | Zielgruppe | Inhalt |
|---|---|---|
| **Installationsprotokoll** | IT (Technik) | Gerät (Hersteller, Modell, **Seriennummer**, Inventarnummer), Betriebssystem (Edition, Version/Build), Lizenzen, installierte Treiber/Software mit Version, Netzwerkkonfiguration (Rechnername, IP/DHCP, Domäne), Besonderheiten, Datum, Techniker |
| **Übergabe-/Abnahmeprotokoll** | Kunde + IT | übergebene Geräte und Zubehör, durchgeführte Tests, Einweisung erfolgt, offene Punkte/Mängel, Unterschriften |
| **Benutzerhandbuch / Kurzanleitung** | **Anwender** | Schritt-für-Schritt-Anleitungen in einfacher Sprache mit Screenshots (z. B. „VPN verbinden“, „Drucker auswählen“, „Passwort ändern“), Ansprechpartner/Hotline |
| **Administrator-/Betriebsdokumentation** | IT | Konfigurationen, Abhängigkeiten, Wiederherstellung, Wartungsaufgaben, Notfallhandbuch |
| **Netzwerkdokumentation** | IT | Netzplan, IP-Adressliste, Patchplan |
| **Inventar / CMDB** | IT, Buchhaltung | alle Geräte und Software (Configuration Items) mit Standort, Benutzer, Garantie, Beziehungen |
| **Änderungsprotokoll** | IT | wer hat wann was geändert und warum (mit Ticketnummer) |

**Anforderungen an gute Dokumentation:**
- **zielgruppengerecht** (Anwender brauchen keine Registry-Pfade, Admins schon)
- **vollständig, korrekt und aktuell** (veraltete Doku ist gefährlich)
- **eindeutig strukturiert und auffindbar** (zentrale Ablage, Vorlagen, Namenskonvention)
- **versioniert** (Datum, Version, Autor)
- **vertrauliche Daten geschützt** – Passwörter gehören in einen Passwort-Tresor, nicht in eine Word-Datei auf dem Fileserver`,
        },
        {
          type: 'visual',
          title: 'Dokumente rund um einen Arbeitsplatz',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Installationsprotokoll', text: 'Was wurde wie eingerichtet? Seriennummer, OS-Build, Software, Netzwerk.', icon: 'ScrollText' },
                { title: 'Übergabeprotokoll', text: 'Was wurde an wen übergeben, getestet, erklärt? Unterschriften.', icon: 'FileText' },
                { title: 'Kurzanleitung', text: 'Wie benutze ich es? Für Anwender, mit Screenshots.', icon: 'BookOpen' },
              ],
            },
          },
          caption: 'Drei Dokumente, drei Zielgruppen: Technik, Vertrag, Anwender.',
        },
        {
          type: 'example',
          title: 'Übergabeprotokoll ausfüllen',
          problem: 'Du übergibst Herrn Hansen (Vertrieb) ein neues Notebook mit Dockingstation und Headset. Was gehört in das Übergabeprotokoll?',
          steps: [
            { label: 'Kopf', body: 'Datum, Ort, übergebende Person (IT), empfangende Person (Herr Hansen, Abteilung, Personalnummer).' },
            { label: 'Geräte', body: 'Notebook Modell X14, Seriennr. 5CG4…, Inventarnr. EK-NB-0451; Dockingstation (Seriennr.); Headset; Netzteil.' },
            { label: 'Tests & Einweisung', body: 'Anmeldung, VPN, Teams-Anruf, Drucken getestet ✔; Einweisung in BitLocker-PIN und VPN erfolgt ✔.' },
            { label: 'Hinweise', body: 'Nutzungsrichtlinie ausgehändigt (private Nutzung, Verlustmeldung), offene Punkte: keine.' },
            { label: 'Unterschriften', body: 'Herr Hansen und IT-Mitarbeiter.' },
          ],
          result: 'Das Protokoll belegt Übergabe, Funktion und Einweisung – wichtig bei späteren Fragen zu Verlust, Defekt oder Rückgabe.',
        },
        {
          type: 'check',
          question: {
            id: 'b05-c06', kind: 'multi', skill: 'qm.doc', difficulty: 2,
            prompt: 'Welche Angaben gehören in ein **Installationsprotokoll** eines Arbeitsplatz-PCs?',
            options: ['Seriennummer des Geräts', 'Betriebssystem mit Version/Build', 'Rechnername und IP-Konfiguration', 'Domänen-Administratorpasswort im Klartext', 'installierte Software mit Version'],
            answer: [0, 1, 2, 4],
            explanation: 'Passwörter gehören in einen geschützten Passwort-Tresor, nie im Klartext in ein Protokoll.',
          },
        },
        { type: 'practice', title: 'Übung: Dokumentation', questionIds: ['b05-q018', 'b05-q019', 'b05-q020', 'b05-q021', 'b05-q022'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Installationsprotokoll (IT), Übergabeprotokoll (IT + Kunde), Benutzerhandbuch (Anwender).', 'Weitere: Betriebsdoku, Netzwerkdoku, Inventar/CMDB, Änderungsprotokoll.', 'Gute Doku: zielgruppengerecht, aktuell, vollständig, versioniert, auffindbar.', 'Passwörter nie im Klartext in Dokumente.'] },
      ],
    },
  ],
  questions: [
    { id: 'b05-q001', kind: 'free', skill: 'qm.basics', difficulty: 2, prompt: 'Ein Kunde sagt: „Für die Empfangsrechner nehmen wir die teuersten Workstations – dann haben wir die beste Qualität.“ Nimm aus Sicht des Qualitätsmanagements Stellung.', modelAnswer: 'Qualität bedeutet nach ISO 9000, dass die Merkmale eines Produkts die Anforderungen erfüllen – nicht, dass es möglichst teuer oder leistungsstark ist. Für Empfangsarbeitsplätze (Office, Telefonie, Besucherverwaltung) reichen Standard-Business-PCs. Teure Workstations erfüllen die Anforderungen nicht besser, verursachen aber höhere Kosten, Stromverbrauch und Geräusche. Man sollte die Anforderungen ermitteln und passende Geräte auswählen.', keywords: ['Anforderungen', 'ISO 9000', 'Kosten', 'passend'], explanation: 'Qualität = Anforderungserfüllung.' },
    { id: 'b05-q002', kind: 'match', skill: 'qm.basics', difficulty: 2, prompt: 'Ordne die Norm bzw. das Rahmenwerk dem Inhalt zu.', left: ['ISO 9001', 'ISO/IEC 27001', 'ISO/IEC 20000-1', 'ITIL 4', 'ISO 9000'], right: ['Anforderungen an ein Qualitätsmanagementsystem', 'Anforderungen an ein Informationssicherheits-Managementsystem', 'Anforderungen an ein IT-Service-Management-System', 'Sammlung bewährter Praktiken für IT-Service-Management', 'Grundlagen und Begriffe des Qualitätsmanagements'], answer: [0, 1, 2, 3, 4], explanation: '9001 = QM-System, 27001 = ISMS, 20000 = ITSM, ITIL = Best Practice, 9000 = Begriffe.' },
    { id: 'b05-q003', kind: 'table', skill: 'qm.basics', difficulty: 2, prompt: 'Ist die Maßnahme **konstruktive** oder **analytische** Qualitätssicherung?', columns: [{ key: 'x', label: 'konstruktiv / analytisch', type: 'text' }], rows: [{ label: 'Standard-Image für alle Arbeitsplätze', cells: { x: { answer: 'konstruktiv' } } }, { label: 'Funktionstest nach der Installation', cells: { x: { answer: 'analytisch' } } }, { label: 'Schulung der Techniker', cells: { x: { answer: 'konstruktiv' } } }, { label: 'Internes Audit der Abläufe', cells: { x: { answer: 'analytisch' } } }, { label: 'Vorlage für Installationsprotokolle', cells: { x: { answer: 'konstruktiv' } } }], explanation: 'Konstruktiv = Fehler vermeiden (Standards, Schulung, Vorlagen). Analytisch = Fehler finden (Tests, Audits).' },
    { id: 'b05-q004', kind: 'free', skill: 'qm.basics', difficulty: 2, prompt: 'Nenne zwei Gründe, warum sich ein IT-Systemhaus nach **ISO 9001** zertifizieren lassen könnte.', modelAnswer: 'Viele Kunden – etwa Industrieunternehmen oder öffentliche Auftraggeber – verlangen ein zertifiziertes QM-System als Voraussetzung für Aufträge (Wettbewerbsvorteil). Intern werden Abläufe einheitlich beschrieben und nachvollziehbar, Verantwortlichkeiten geklärt und Fehler bzw. Nacharbeit reduziert; regelmäßige Audits treiben die kontinuierliche Verbesserung voran.', keywords: ['Kundenanforderung', 'Wettbewerb', 'Abläufe', 'Fehler', 'Audit', 'Verbesserung'], explanation: 'Externe (Markt) und interne (Prozesse) Gründe.' },
    { id: 'b05-q005', kind: 'match', skill: 'qm.pdca', difficulty: 1, prompt: 'Ordne die Tätigkeit der PDCA-Phase zu.', left: ['Ursachen analysieren und Ziel festlegen', 'Neue Checkliste in einer Abteilung erproben', 'Fehlerquote vor und nach der Maßnahme vergleichen', 'Checkliste für alle Abteilungen verbindlich machen'], right: ['Plan', 'Do', 'Check', 'Act'], answer: [0, 1, 2, 3], explanation: 'Plan = analysieren/planen; Do = erproben; Check = messen; Act = standardisieren.' },
    { id: 'b05-q006', kind: 'free', skill: 'qm.pdca', difficulty: 2, prompt: 'Der Service Desk erhält auffällig viele Tickets zu gesperrten Benutzerkonten. Beschreibe, wie du mit dem **PDCA-Zyklus** vorgehst.', modelAnswer: 'Plan: Tickets auswerten (Anzahl, betroffene Benutzer, Ursache – z. B. abgelaufene Passwörter, alte Passwörter auf dem Smartphone), Ziel setzen (z. B. Halbierung der Tickets in drei Monaten) und Maßnahme planen (Self-Service-Passwortzurücksetzung, Info-Mail vor Ablauf, Anleitung zum Ändern auf dem Smartphone). Do: Maßnahme in einer Pilotabteilung umsetzen. Check: Ticketzahlen vor/nach vergleichen. Act: Bei Erfolg für alle einführen und dokumentieren, sonst Ursachen erneut analysieren und neuen Zyklus starten.', keywords: ['Plan', 'Do', 'Check', 'Act', 'Kennzahl', 'Pilot'], explanation: 'Alle vier Phasen mit konkreter Tätigkeit.' },
    { id: 'b05-q007', kind: 'text', skill: 'qm.pdca', difficulty: 1, prompt: 'Wie heißt der japanische Begriff für die kontinuierliche Verbesserung in kleinen Schritten?', accept: ['Kaizen'], explanation: '**Kaizen** – im Deutschen KVP (kontinuierlicher Verbesserungsprozess).' },
    { id: 'b05-q008', kind: 'number', skill: 'qm.pdca', difficulty: 2, prompt: 'Vor einer Maßnahme gab es **240** Tickets pro Monat zum Thema Drucken, danach **150**. Um wie viel Prozent ist die Ticketzahl gesunken?', answer: 37.5, tolerance: 0.05, unit: '%', explanation: '(240 − 150) / 240 · 100 % = 90 / 240 · 100 % = **37,5 %**.' },
    { id: 'b05-q009', kind: 'table', skill: 'qm.requirements', difficulty: 2, prompt: 'Gehört die Aussage eher ins **Lastenheft** oder ins **Pflichtenheft**?', columns: [{ key: 'x', label: 'Lastenheft / Pflichtenheft', type: 'text' }], rows: [{ label: '„Die Buchhaltung braucht zwei Bildschirme pro Arbeitsplatz.“', cells: { x: { answer: 'Lastenheft' } } }, { label: '„Geliefert werden 2 × 24-Zoll-Monitore Modell Y mit DisplayPort.“', cells: { x: { answer: 'Pflichtenheft' } } }, { label: '„Die Daten auf Notebooks müssen bei Verlust geschützt sein.“', cells: { x: { answer: 'Lastenheft' } } }, { label: '„Verschlüsselung per BitLocker mit TPM und PIN, Wiederherstellungsschlüssel im AD.“', cells: { x: { answer: 'Pflichtenheft' } } }], explanation: 'Lastenheft = Anforderung (was/wofür), Pflichtenheft = Umsetzung (wie/womit).' },
    { id: 'b05-q010', kind: 'free', skill: 'qm.requirements', difficulty: 2, prompt: 'Formuliere die Kundenaussage „Das WLAN im Besprechungsraum muss gut sein“ als **prüfbare** Anforderung (zwei Kriterien).', modelAnswer: 'Beispiel: Im gesamten Besprechungsraum beträgt die Signalstärke mindestens −65 dBm; ein Notebook erreicht gleichzeitig mit 10 weiteren Geräten mindestens 100 Mbit/s Durchsatz; das Netz ist mit WPA3 gesichert; Videokonferenzen laufen ohne Abbrüche (Paketverlust unter 1 %).', keywords: ['messbar', 'dBm', 'Mbit/s', 'Grenzwert'], explanation: 'Messgröße + Grenzwert machen die Anforderung prüfbar.' },
    { id: 'b05-q011', kind: 'free', skill: 'qm.requirements', difficulty: 1, prompt: 'Nenne drei Vorteile einer **Installationscheckliste**.', modelAnswer: 'Kein Arbeitsschritt wird vergessen; alle Techniker arbeiten einheitlich (personenunabhängig); die abgehakte Liste dient als Nachweis/Dokumentation; neue Mitarbeitende werden schneller eingearbeitet; Fehler lassen sich auswerten und die Liste verbessern.', keywords: ['vergessen', 'einheitlich', 'Nachweis', 'Einarbeitung', 'Verbesserung'], explanation: 'Drei sinnvolle Vorteile.' },
    { id: 'b05-q012', kind: 'table', skill: 'qm.requirements', difficulty: 2, prompt: 'Ist die Anforderung **funktional** oder **nicht-funktional**?', columns: [{ key: 'x', label: 'funktional / nicht-funktional', type: 'text' }], rows: [{ label: 'Der Benutzer kann Dokumente per Scan-to-Mail versenden.', cells: { x: { answer: 'funktional' } } }, { label: 'Der PC ist im Betrieb leiser als 25 dB(A).', cells: { x: { answer: 'nicht-funktional', accept: ['nichtfunktional', 'nicht funktional'] } } }, { label: 'Die Anmeldung dauert höchstens 60 Sekunden.', cells: { x: { answer: 'nicht-funktional', accept: ['nichtfunktional', 'nicht funktional'] } } }, { label: 'Der Benutzer kann sich per VPN mit dem Firmennetz verbinden.', cells: { x: { answer: 'funktional' } } }], explanation: 'Funktional = was das System tut; nicht-funktional = wie gut (Leistung, Geräusch, Sicherheit …).' },
    { id: 'b05-q013', kind: 'order', skill: 'qm.testing', difficulty: 2, prompt: 'Bringe die Teststufen in die übliche Reihenfolge.', items: ['Komponententest', 'Integrationstest', 'Systemtest', 'Abnahmetest'], explanation: 'Vom Einzelteil zum Gesamtsystem, zuletzt die Abnahme durch den Kunden.' },
    { id: 'b05-q014', kind: 'free', skill: 'qm.testing', difficulty: 2, prompt: 'Formuliere für einen neu eingerichteten Vertriebs-Arbeitsplatz je einen Testfall für den **Normalfall** und für den **Fehlerfall** mit erwartetem Ergebnis.', modelAnswer: 'Normalfall: Der Vertriebsmitarbeiter meldet sich mit seinem Domänenkonto an und speichert ein Angebot auf \\\\FS01\\Vertrieb – erwartet: Anmeldung erfolgreich, Datei gespeichert. Fehlerfall: Er versucht, den Ordner \\\\FS01\\Buchhaltung zu öffnen – erwartet: Zugriff verweigert. Alternativ: dreimal falsches Passwort – erwartet: Kontosperrung gemäß Richtlinie.', keywords: ['Testfall', 'erwartetes Ergebnis', 'Normalfall', 'Fehlerfall', 'Zugriff verweigert'], explanation: 'Testfall = Vorgehen + erwartetes Ergebnis.' },
    { id: 'b05-q015', kind: 'free', skill: 'qm.testing', difficulty: 3, prompt: 'Erläutere die **rechtliche Bedeutung der Abnahme** bei einem Werkvertrag über die Einrichtung von Arbeitsplätzen (zwei Folgen).', modelAnswer: 'Mit der Abnahme (§ 640 BGB) erklärt der Kunde, dass die Leistung im Wesentlichen vertragsgemäß ist. Folgen: Die Vergütung wird fällig (§ 641 BGB); die Gefahr des zufälligen Untergangs geht auf den Kunden über; die Verjährungsfrist für Mängelansprüche beginnt; bei bekannten, nicht vorbehaltenen Mängeln können Rechte verloren gehen – deshalb Mängel im Abnahmeprotokoll festhalten.', keywords: ['§ 640', 'Vergütung fällig', 'Gefahrübergang', 'Verjährung', 'Vorbehalt'], explanation: 'Keine Rechtsberatung – Grundbegriffe des Werkvertragsrechts.' },
    { id: 'b05-q016', kind: 'multi', skill: 'qm.testing', difficulty: 2, prompt: 'Welche Angaben gehören in ein **Abnahmeprotokoll**?', options: ['Datum und Beteiligte', 'abgenommener Leistungsumfang', 'festgestellte Mängel mit Frist', 'Unterschriften beider Parteien', 'private Telefonnummern der Techniker'], answer: [0, 1, 2, 3], explanation: 'Private Daten der Techniker gehören nicht hinein.' },
    { id: 'b05-q017', kind: 'single', skill: 'qm.testing', difficulty: 2, prompt: 'Was kennzeichnet einen **Black-Box-Test**?', options: ['Es wird nur das Verhalten (Ein-/Ausgabe) geprüft, ohne Kenntnis des inneren Aufbaus.', 'Es wird der Quellcode bzw. die interne Konfiguration geprüft.', 'Der Test findet ohne Strom statt.', 'Es wird nur die Hardware getestet.'], answer: 0, distractors: { '1': { why: 'Das ist ein White-Box-Test.', error: 'test-blackbox' }, '2': { why: '„Black Box“ bezieht sich auf das unbekannte Innere, nicht auf Strom.', error: 'test-blackbox' }, '3': { why: 'Black-Box-Tests prüfen Software wie Systeme.', error: 'test-blackbox' } }, explanation: 'Black Box = von außen, White Box = mit Innensicht.' },
    { id: 'b05-q018', kind: 'match', skill: 'qm.doc', difficulty: 1, prompt: 'Ordne das Dokument seiner Hauptzielgruppe zu.', left: ['Benutzerhandbuch / Kurzanleitung', 'Installationsprotokoll', 'Übergabeprotokoll', 'Notfallhandbuch'], right: ['Anwender', 'IT-Technik', 'Kunde und IT (beide unterschreiben)', 'IT-Betrieb und Verantwortliche im Notfall'], answer: [0, 1, 2, 3], explanation: 'Jede Dokumentart hat ihre Zielgruppe.' },
    { id: 'b05-q019', kind: 'free', skill: 'qm.doc', difficulty: 2, prompt: 'Nenne vier Anforderungen an eine gute IT-Dokumentation.', modelAnswer: 'Zielgruppengerecht (verständlich für die Leser), vollständig und korrekt, aktuell (bei jeder Änderung gepflegt), versioniert (Datum, Version, Autor), einheitlich strukturiert mit Vorlagen, zentral abgelegt und auffindbar, vertrauliche Informationen geschützt (Passwörter im Tresor).', keywords: ['zielgruppengerecht', 'aktuell', 'vollständig', 'versioniert', 'auffindbar', 'geschützt'], explanation: 'Vier sinnvolle Kriterien.' },
    { id: 'b05-q020', kind: 'free', skill: 'qm.doc', difficulty: 2, prompt: 'Schreibe für Anwender eine **Kurzanleitung** (max. 5 Schritte), wie sie unter Windows 11 einen Netzwerkdrucker hinzufügen. Achte auf Verständlichkeit.', modelAnswer: '1. Klicken Sie auf Start und öffnen Sie „Einstellungen“. 2. Wählen Sie „Bluetooth und Geräte“ → „Drucker und Scanner“. 3. Klicken Sie auf „Gerät hinzufügen“ und warten Sie, bis die Drucker angezeigt werden. 4. Wählen Sie Ihren Abteilungsdrucker (z. B. PR-HH-VT) und klicken Sie auf „Gerät hinzufügen“. 5. Drucken Sie zur Kontrolle eine Testseite. Bei Problemen: Service Desk, Durchwahl 200.', keywords: ['Einstellungen', 'Drucker und Scanner', 'Gerät hinzufügen', 'Testseite', 'Service Desk'], explanation: 'Kurze, nummerierte Schritte, Sie-Form, Bezeichnungen wie auf dem Bildschirm, Ansprechpartner.' },
    { id: 'b05-q021', kind: 'single', skill: 'qm.doc', difficulty: 2, prompt: 'Wo sollten die Zugangsdaten (Admin-Passwörter) der Netzwerkgeräte dokumentiert werden?', options: ['In einem geschützten Passwort-Tresor mit Zugriffsrechten und Protokollierung', 'In der Netzwerkdokumentation als Word-Datei auf dem Fileserver', 'Auf einem Zettel im Serverschrank', 'Gar nicht – man merkt sie sich'], answer: 0, distractors: { '1': { why: 'Klartext-Dateien sind für jeden mit Zugriff auf die Freigabe lesbar.', error: 'doku-passwort' }, '2': { why: 'Physisch frei zugänglich – unsicher.', error: 'doku-passwort' }, '3': { why: 'Fällt die Person aus, kommt niemand mehr an die Geräte.', error: 'doku-passwort' } }, explanation: 'Passwort-Tresor (z. B. KeePass/KeePassXC, Passbolt, Vault) – dokumentiert und geschützt.' },
    { id: 'b05-q022', kind: 'free', skill: 'qm.doc', difficulty: 2, prompt: 'Warum ist ein **Änderungsprotokoll** (wer hat wann was geändert) für den IT-Betrieb wichtig? Nenne zwei Gründe.', modelAnswer: 'Bei Störungen kann man schnell erkennen, welche Änderung kurz vorher gemacht wurde, und sie ggf. rückgängig machen (Fehlersuche). Änderungen sind nachvollziehbar und überprüfbar (Revision, Audit, Verantwortlichkeit). Die Dokumentation bleibt aktuell und neue Kollegen verstehen den Zustand des Systems.', keywords: ['Fehlersuche', 'nachvollziehbar', 'Audit', 'rückgängig'], explanation: 'Nachvollziehbarkeit und Fehlersuche.' },
    { id: 'b05-q023', kind: 'number', skill: 'qm.pdca', difficulty: 2, prompt: 'Im ersten Quartal wurden **80** Arbeitsplätze übergeben, **4** davon mit Mängeln. Wie hoch ist die **Erfolgsquote** (mängelfreie Übergaben) in Prozent?', answer: 95, unit: '%', misconceptions: [{ answer: '5', error: 'quote-verwechselt', why: '5 % ist die Fehlerquote – gefragt ist der Anteil mängelfreier Übergaben.' }], explanation: '(80 − 4) / 80 · 100 % = 76 / 80 · 100 % = **95 %**.' },
    { id: 'b05-q024', kind: 'free', skill: 'qm.requirements', difficulty: 2, prompt: 'Erkläre den Unterschied zwischen **Lastenheft** und **Pflichtenheft** in zwei Sätzen.', modelAnswer: 'Das Lastenheft wird vom Auftraggeber erstellt und beschreibt, was gebraucht wird und wofür (Anforderungen aus Kundensicht). Das Pflichtenheft erstellt der Auftragnehmer; es beschreibt, wie und womit diese Anforderungen umgesetzt werden, und ist Grundlage für Angebot und Abnahme.', keywords: ['Auftraggeber', 'was', 'wofür', 'Auftragnehmer', 'wie', 'womit'], explanation: 'Klassische Prüfungsfrage.' },
    { id: 'b05-q025', kind: 'text', skill: 'qm.basics', difficulty: 1, prompt: 'Wie heißt die Norm, nach der sich Qualitätsmanagementsysteme **zertifizieren** lassen? (z. B. „ISO 1234“)', accept: ['ISO 9001', 'DIN EN ISO 9001', 'ISO9001', '9001', 'ISO 9001:2015'], explanation: '**ISO 9001** (DIN EN ISO 9001).' },
    { id: 'b05-q026', kind: 'single', skill: 'qm.testing', difficulty: 2, prompt: 'Welcher Test prüft vor allem das **Zusammenspiel** von Komponenten, z. B. ob der PC in der Domäne auf Fileserver und Drucker zugreifen kann?', options: ['Integrationstest', 'Komponententest', 'Abnahmetest', 'Belastungstest des Netzteils'], answer: 0, distractors: { '1': { why: 'Komponententests prüfen Einzelteile isoliert.', error: 'teststufen' }, '2': { why: 'Der Abnahmetest erfolgt durch den Kunden am Ende.', error: 'teststufen' }, '3': { why: 'Das ist ein Hardwaretest einer Komponente.', error: 'teststufen' } }, explanation: 'Schnittstellen und Zusammenspiel → Integrationstest.' },
    { id: 'b05-q027', kind: 'text', skill: 'qm.doc', difficulty: 2, prompt: 'Wie heißt die Datenbank, in der im IT-Service-Management alle IT-Komponenten (Configuration Items) und ihre Beziehungen verwaltet werden? (Abkürzung)', accept: ['CMDB', 'Configuration Management Database'], explanation: '**CMDB** – Configuration Management Database.' },
    { id: 'b05-q028', kind: 'free', skill: 'qm.testing', difficulty: 2, prompt: 'Bei der Abnahme von zwölf Arbeitsplätzen stellt der Kunde fest, dass an **allen** Plätzen die Fachanwendung „Warenwirtschaft“ nicht startet. Wie ist mit der Abnahme umzugehen? Begründe.', modelAnswer: 'Das ist ein wesentlicher Mangel, weil eine zentrale, im Pflichtenheft vereinbarte Funktion fehlt und die Arbeitsplätze ihren Zweck nicht erfüllen. Der Kunde darf die Abnahme verweigern. Der Mangel wird im Protokoll festgehalten, die Ursache analysiert und behoben; danach wird ein neuer Abnahmetermin vereinbart.', keywords: ['wesentlicher Mangel', 'verweigern', 'Protokoll', 'Pflichtenheft', 'neuer Termin'], explanation: 'Wesentlich vs. unwesentlich entscheidet über Verweigerung oder Vorbehalt.' },
    { id: 'b05-q029', kind: 'number', skill: 'qm.pdca', difficulty: 3, prompt: 'Die durchschnittliche Einrichtungszeit pro Arbeitsplatz sank durch eine neue Checkliste von **2 h 30 min** auf **1 h 45 min**. Wie viele **Stunden** spart das bei **48** Arbeitsplätzen?', answer: 36, unit: 'h', hints: ['Ersparnis pro Platz: 45 min.'], explanation: '45 min · 48 = 2.160 min = **36 h**.' },
    { id: 'b05-q030', kind: 'free', skill: 'qm.doc', difficulty: 3, prompt: 'Die Elektro Krämer GmbH erhält 30 neue Notebooks. Beschreibe, wie die Inventarisierung organisiert werden sollte und welche Daten pro Gerät erfasst werden.', modelAnswer: 'Jedes Gerät erhält vor der Ausgabe eine Inventarnummer (Etikett/Barcode) und wird im Inventarsystem bzw. in der CMDB angelegt – idealerweise automatisch über das Verwaltungssystem ergänzt. Erfasst werden: Inventarnummer, Hersteller, Modell, Seriennummer, Kaufdatum, Lieferant, Rechnungsnummer/Anschaffungswert, Garantie-/Wartungsende, Standort, zugeordneter Benutzer/Kostenstelle, Betriebssystem/Lizenz, Status (Lager, im Einsatz, Reparatur, ausgemustert). Bei Übergabe, Umzug oder Rückgabe wird der Eintrag aktualisiert.', keywords: ['Inventarnummer', 'Seriennummer', 'Garantie', 'Benutzer', 'Standort', 'Status', 'CMDB'], explanation: 'Eindeutige Kennzeichnung + vollständige Stammdaten + Pflege im Lebenszyklus.' },
  ],
};
