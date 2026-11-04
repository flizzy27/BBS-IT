import type { Module } from '../types';

export const b06: Module = {
  id: 'b06',
  nr: 6,
  area: 'systeme',
  title: 'Serviceanfragen & Support',
  short: 'Service Desk und Ticket-Lebenszyklus, Support-Level und Eskalation, RACI, Priorisierung nach Auswirkung × Dringlichkeit, SLA und Verfügbarkeit, Incident/Problem/Change, Problemanalyse (5-Why, Ishikawa, Pareto) und Kundenkommunikation.',
  icon: 'Headset',
  relevance: 'ap1',
  prerequisites: ['b05'],
  generators: ['sys.prio', 'sys.sla', 'sys.pareto'],
  skills: [
    { id: 'itsm.service', module: 'b06', title: 'IT-Services, Service Desk und Ticket-Lebenszyklus' },
    { id: 'itsm.levels', module: 'b06', title: 'Support-Level, Eskalation und RACI', requires: ['itsm.service'] },
    { id: 'itsm.priority', module: 'b06', title: 'Störungen priorisieren (Auswirkung × Dringlichkeit)', requires: ['itsm.service'] },
    { id: 'itsm.sla', module: 'b06', title: 'SLA: Reaktionszeit, Lösungszeit, Verfügbarkeit berechnen', requires: ['itsm.priority'] },
    { id: 'itsm.itil', module: 'b06', title: 'Incident, Problem, Change, Service Request', requires: ['itsm.service'] },
    { id: 'itsm.analysis', module: 'b06', title: 'Problemanalyse: 5-Why, Ishikawa, Pareto, DMAIC', requires: ['itsm.itil'] },
    { id: 'itsm.comm', module: 'b06', title: 'Kundenkommunikation am Telefon und per E-Mail' },
  ],
  lessons: [
    /* ------------------------------------------------------------ */
    {
      id: 'b06-l01',
      title: 'IT-Services, Service Desk und Ticket-Lebenszyklus',
      minutes: 25,
      relevance: 'ap1',
      skills: ['itsm.service'],
      steps: [
        {
          type: 'explain',
          title: 'Vom Anruf zum geschlossenen Ticket',
          body: `Ein IT-Systemhaus oder eine interne IT-Abteilung erbringt **IT-Services**: Leistungen, die den Anwendern einen Nutzen bringen (z. B. „E-Mail“, „Arbeitsplatz-PC“, „Druckdienst“, „Managed Server“). Man unterscheidet:

| Art | Beispiel |
|---|---|
| **reaktive** Services | Störungsbehebung nach einem Anruf |
| **proaktive/präventive** Services | **Monitoring** (Überwachung von Diensten, Speicherplatz, Ereignisprotokollen, Leistungsdaten mit Schwellwerten und Alarm), Patchmanagement, Wartungsfenster, rechtzeitige Kapazitätserweiterung – Störungen werden **vermieden**, bevor Anwender sie bemerken |
| **Managed Services** | der Dienstleister betreibt Systeme dauerhaft gegen Pauschale (z. B. Managed Server, Managed Backup) |

**Service Desk** = **zentrale Anlaufstelle** (Single Point of Contact, **SPOC**) für alle Anfragen der Anwender – egal ob Störung, Frage oder Bestellung. Kanäle: Telefon, E-Mail, Self-Service-Portal, Chat, vor Ort.

**Jede Anfrage wird als Ticket erfasst.** Ein Ticket enthält:

| Feld | Beispiel |
|---|---|
| Ticketnummer | #2026-11-0412 |
| Melder + Kontakt | Jana Schulz, Vertrieb, Durchwahl 214 |
| Zeitpunkt, Kanal | 04.11., 08:47 Uhr, Telefon |
| Betroffenes System (CI) | Notebook EK-NB-0451, Outlook |
| Beschreibung | Symptom, genaue Fehlermeldung, seit wann, reproduzierbar?, was wurde schon versucht? |
| Kategorie | Software / E-Mail |
| Auswirkung, Dringlichkeit, **Priorität** | mittel, hoch → 2 |
| Status, zugewiesene Gruppe | in Bearbeitung, 1st Level |
| Lösung, Aufwand | „OST-Datei neu erstellt“, 20 min |

**Ticket-Lebenszyklus (Status):**

**Neu/Erfasst → Klassifiziert und priorisiert → Zugewiesen → In Bearbeitung → (Wartend: auf Kunde, Lieferant, Ersatzteil) → Gelöst → Geschlossen** – bei erneutem Auftreten **wiedereröffnet**.

„Gelöst“ und „Geschlossen“ sind nicht dasselbe: **Gelöst** heißt, der Support hat eine Lösung umgesetzt. **Geschlossen** wird erst nach **Bestätigung durch den Anwender** (oder automatisch nach einer Frist ohne Widerspruch).

Vor der Bearbeitung prüft der Service Desk außerdem die **Vertragslage**: Hat der Kunde einen Wartungs-/Servicevertrag? Welche Reaktionszeit gilt laut SLA? Ist die Leistung inklusive oder wird sie nach Aufwand abgerechnet?`,
        },
        {
          type: 'visual',
          title: 'Serviceprozess im Helpdesk',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['Anwenderin', 'Service Desk (1st Level)', 'Ticketsystem', '2nd Level'],
              messages: [
                { from: 0, to: 1, label: 'Anruf: „Outlook startet nicht“' },
                { from: 1, to: 2, label: 'Ticket anlegen, klassifizieren, priorisieren', note: 'Vertrag/SLA prüfen' },
                { from: 1, to: 0, label: 'Ticketnummer + erste Rückmeldung' },
                { from: 1, to: 1, label: 'Bekannte Lösungen prüfen (Wissensdatenbank)' },
                { from: 1, to: 3, label: 'Eskalation, wenn nicht lösbar', note: 'funktionale Eskalation' },
                { from: 3, to: 2, label: 'Lösung dokumentieren, Status „gelöst“' },
                { from: 2, to: 0, label: 'Info + Bitte um Bestätigung → „geschlossen“' },
              ],
            },
          },
          caption: 'Jede Station wird im Ticket dokumentiert – so ist der Bearbeitungsstand jederzeit nachvollziehbar.',
        },
        {
          type: 'example',
          title: 'Einen Anruf vollständig erfassen',
          problem: 'Herr Becker ruft an: „Mein Drucker geht nicht!“ Welche Informationen fragst du ab, bevor du das Ticket anlegst?',
          steps: [
            { label: 'Wer?', body: 'Name, Abteilung, Rückrufnummer, ggf. Gerätenummer/Inventarnummer des PCs.' },
            { label: 'Was genau?', body: 'Welcher Drucker (Name/Standort)? Fehlermeldung am PC oder Display? Druckt gar nichts oder schlecht?' },
            { label: 'Seit wann / wie oft?', body: 'Seit heute früh; bei jedem Druckauftrag.' },
            { label: 'Wer noch?', body: 'Betrifft es Kollegen am selben Drucker? (→ Auswirkung)' },
            { label: 'Was schon versucht?', body: 'Neu gestartet? Papier/Toner geprüft?' },
            { label: 'Dringlichkeit', body: 'Kann er auf einem anderen Drucker drucken? Gibt es eine Frist (Angebot muss heute raus)?' },
          ],
          result: 'Mit diesen Angaben kann das Ticket korrekt klassifiziert, priorisiert und ggf. ohne Rückfragen bearbeitet werden.',
        },
        {
          type: 'check',
          question: {
            id: 'b06-c01', kind: 'order', skill: 'itsm.service', difficulty: 1,
            prompt: 'Bringe die Status eines Tickets in die übliche Reihenfolge.',
            items: ['Erfasst', 'Klassifiziert und priorisiert', 'Zugewiesen', 'In Bearbeitung', 'Gelöst', 'Geschlossen'],
            explanation: 'Geschlossen wird erst nach Bestätigung durch den Anwender (oder nach Frist).',
          },
        },
        { type: 'practice', title: 'Übung: Service Desk und Tickets', questionIds: ['b06-q001', 'b06-q002', 'b06-q003', 'b06-q004'], count: 4, difficulty: 1 },
        { type: 'summary', points: ['Service Desk = Single Point of Contact für alle Anfragen.', 'Reaktiv (Störung beheben) vs. proaktiv (Monitoring, Wartung, Störungsvermeidung).', 'Jede Anfrage wird Ticket: Melder, Beschreibung, Kategorie, Priorität, Status, Lösung.', 'Lebenszyklus: erfasst → priorisiert → zugewiesen → in Bearbeitung → gelöst → geschlossen.', 'Gelöst ≠ geschlossen: Abschluss nach Bestätigung.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b06-l02',
      title: 'Support-Level, Eskalation und RACI',
      minutes: 25,
      relevance: 'ap1',
      skills: ['itsm.levels'],
      steps: [
        {
          type: 'explain',
          title: 'Wer löst was?',
          body: `Damit Experten nicht mit Passwort-Resets beschäftigt sind und einfache Fragen schnell gelöst werden, ist der Support in **Level** gestaffelt:

| Level | Wer? | Aufgaben |
|---|---|---|
| **(0. Level)** | Self-Service | FAQ, Wissensdatenbank, Passwort-Selbstrücksetzung im Portal |
| **1st Level** | Service Desk / Helpdesk | Anfragen annehmen und erfassen, klassifizieren, priorisieren; **Standardprobleme** mit bekannten Lösungen sofort lösen (Passwort zurücksetzen, Drucker verbinden, Bedienfragen); sonst weiterleiten; Kommunikation mit dem Anwender |
| **2nd Level** | Fachspezialisten (Server, Netzwerk, Anwendungen, Vor-Ort-Techniker) | tiefere Analyse, Einsatz vor Ort, Konfigurationsänderungen |
| **3rd Level** | Hersteller, Entwickler, externe Spezialisten | Fehler in Produkten (Bugs), Firmware, Hardwaretausch durch Hersteller |

Ziel ist eine hohe **Erstlösungsquote** (First Contact Resolution): möglichst viele Anfragen schon im ersten Kontakt lösen.

**Eskalation:**
- **Funktionale (horizontale) Eskalation:** Das Ticket wird an ein **höheres Support-Level** bzw. eine Fachgruppe mit mehr Know-how weitergegeben, weil die Lösung fachlich nicht möglich ist.
- **Hierarchische (vertikale) Eskalation:** **Vorgesetzte/Management** werden eingeschaltet, weil z. B. ein **SLA verletzt zu werden droht**, Entscheidungen über Kosten/Ressourcen nötig sind oder ein Kunde sich beschwert.

Die Verantwortung für das Ticket (**Ticket-Ownership**) und die Kommunikation mit dem Anwender bleiben dabei meist beim Service Desk.

**RACI-Matrix – Zuständigkeiten klären:** Für jede Aufgabe wird festgelegt, welche Rolle was tut.

| Buchstabe | Bedeutung | Merkhilfe |
|---|---|---|
| **R** – Responsible | **führt aus** (Durchführungsverantwortung) | „macht es“ |
| **A** – Accountable | **trägt die Gesamtverantwortung**, entscheidet/genehmigt – **genau eine** Rolle pro Aufgabe | „hält den Kopf hin“ |
| **C** – Consulted | wird **vorher befragt** (fachlicher Input, Zwei-Wege-Kommunikation) | „redet mit“ |
| **I** – Informed | wird über Ergebnis/Stand **informiert** (Ein-Weg-Kommunikation) | „erfährt es“ |

Regeln: pro Aufgabe **genau ein A** und **mindestens ein R** (A und R können dieselbe Rolle sein).`,
        },
        {
          type: 'visual',
          title: 'Support-Level als Trichter',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: '0. Level – Self-Service', text: 'Portal, FAQ, Passwort-Reset – rund um die Uhr.', icon: 'BookOpen' },
                { title: '1st Level – Service Desk', text: 'Annahme, Ticket, Standardlösungen, Kommunikation. Löst den Großteil.', icon: 'Headset' },
                { title: '2nd Level – Spezialisten', text: 'Server, Netzwerk, Anwendungen, Vor-Ort-Einsatz.', icon: 'Wrench' },
                { title: '3rd Level – Hersteller', text: 'Bugs, Firmware, Garantie/Hardwaretausch, Entwicklung.', icon: 'Building2' },
              ],
            },
          },
          caption: 'Je höher das Level, desto weniger Tickets – aber desto mehr Spezialwissen.',
        },
        {
          type: 'example',
          title: 'RACI für „Neuen Arbeitsplatz einrichten“',
          problem: 'Erstelle eine RACI-Zuordnung für die Aufgaben „Hardware bestellen“, „PC installieren“ und „Benutzerkonto anlegen“. Rollen: IT-Leitung, Techniker, Abteilungsleitung (fordert an), Einkauf, neue Mitarbeiterin.',
          steps: [
            { label: 'Hardware bestellen', body: 'Einkauf **R** (bestellt), IT-Leitung **A** (genehmigt Budget/Standard), Techniker **C** (Modellauswahl), Abteilungsleitung **I**.' },
            { label: 'PC installieren', body: 'Techniker **R**, IT-Leitung **A**, Abteilungsleitung **C** (benötigte Software), Mitarbeiterin **I** (Termin).' },
            { label: 'Benutzerkonto anlegen', body: 'Techniker **R**, IT-Leitung **A**, Abteilungsleitung **C** (Gruppen/Rechte nach Rolle), Mitarbeiterin **I** (Zugangsdaten auf sicherem Weg).' },
            { label: 'Kontrolle', body: 'Jede Zeile hat genau ein A und mindestens ein R ✔.' },
          ],
          result: 'Die RACI-Matrix macht sichtbar, wer handelt, wer entscheidet, wer gefragt und wer informiert wird – Rückfragen und Lücken werden vermieden.',
        },
        {
          type: 'check',
          question: {
            id: 'b06-c02', kind: 'single', skill: 'itsm.levels', difficulty: 2,
            prompt: 'Eine Störung mit Priorität 1 ist seit 90 Minuten ungelöst, die vereinbarte Lösungszeit beträgt 2 Stunden. Der Service Desk informiert die IT-Leitung, damit zusätzliche Ressourcen bereitgestellt werden. Welche Eskalation ist das?',
            options: ['Hierarchische Eskalation', 'Funktionale Eskalation', 'Eskalation an den 0. Level', 'Keine Eskalation'],
            answer: 0,
            distractors: { '1': { why: 'Funktional wäre die Weitergabe an Spezialisten mit mehr Fachwissen.', error: 'eskalation-art' }, '2': { why: 'Level 0 ist Self-Service.', error: 'eskalation-art' }, '3': { why: 'Das Einschalten der Leitung ist eine Eskalation.', error: 'eskalation-art' } },
            explanation: 'Drohende SLA-Verletzung → Management einschalten = **hierarchische** Eskalation.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'b06-c03', kind: 'text', skill: 'itsm.levels', difficulty: 1,
            prompt: 'Welcher Buchstabe der RACI-Matrix steht für die Rolle, die die **Gesamtverantwortung** trägt und genehmigt?',
            accept: ['A', 'Accountable'],
            explanation: '**A – Accountable**, genau eine Rolle pro Aufgabe.',
          },
        },
        { type: 'practice', title: 'Übung: Level, Eskalation, RACI', questionIds: ['b06-q005', 'b06-q006', 'b06-q007', 'b06-q008', 'b06-q009'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['1st Level: annehmen, erfassen, Standardlösungen; 2nd: Spezialisten; 3rd: Hersteller/Entwickler.', 'Funktionale Eskalation = an mehr Fachwissen; hierarchische = an Vorgesetzte.', 'Erstlösungsquote möglichst hoch.', 'RACI: Responsible, Accountable (genau einer), Consulted, Informed.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b06-l03',
      title: 'Priorisierung: Auswirkung × Dringlichkeit',
      minutes: 20,
      relevance: 'ap1',
      skills: ['itsm.priority'],
      steps: [
        {
          type: 'explain',
          title: 'Wer kommt zuerst dran?',
          body: `Der Service Desk hat immer mehr Tickets als Hände. Die Reihenfolge entscheidet nicht „wer am lautesten ruft“, sondern die **Priorität**. Sie ergibt sich aus zwei Größen:

| Größe | Frage | hoch | mittel | gering |
|---|---|---|---|---|
| **Auswirkung (Impact)** | **Wie groß** ist der Schaden? Wie viele Personen, wie wichtig ist der Dienst? | ganzer Standort, geschäftskritischer Dienst | Abteilung, Gruppe | einzelne Person |
| **Dringlichkeit (Urgency)** | **Wie schnell** muss es gehen? Gibt es einen Workaround? | Arbeit unmöglich, kein Workaround, Frist läuft | eingeschränkt, Workaround vorhanden | kann warten |

**Prioritätsmatrix** (Beispiel, wird im SLA festgelegt):

| Auswirkung ↓ / Dringlichkeit → | hoch | mittel | gering |
|---|---|---|---|
| **hoch** | 1 – kritisch | 2 – hoch | 3 – mittel |
| **mittel** | 2 – hoch | 3 – mittel | 4 – niedrig |
| **gering** | 3 – mittel | 4 – niedrig | 5 – planbar |

Zu jeder Priorität gehören im SLA **Reaktions- und Lösungszeiten**, z. B. Priorität 1: Reaktion 15 min, Lösung 2 h.

**Typische Fehler:** Die Geschäftsführerin ruft an → automatisch Priorität 1? Nein – entscheidend sind Auswirkung und Dringlichkeit (viele Unternehmen sehen allerdings für VIPs eine erhöhte Dringlichkeit vor; das muss dann **im SLA geregelt** sein). Ein Workaround senkt die Dringlichkeit, nicht die Auswirkung.`,
        },
        {
          type: 'visual',
          title: 'Prioritätsmatrix',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Priorität 1 – kritisch', text: 'Hohe Auswirkung + hohe Dringlichkeit: z. B. Warenwirtschaft für den ganzen Standort ausgefallen, kein Workaround.', icon: 'TriangleAlert' },
                { title: 'Priorität 3 – mittel', text: 'z. B. ganze Abteilung betroffen, aber Workaround vorhanden – oder eine Person kann gar nicht arbeiten.', icon: 'Timer' },
                { title: 'Priorität 5 – planbar', text: 'Einzelne Person, keine akute Beeinträchtigung: z. B. Wunsch nach anderem Desktophintergrund.', icon: 'Clock' },
              ],
            },
          },
          caption: 'Auswirkung = wie breit, Dringlichkeit = wie eilig. Beides zusammen ergibt die Priorität.',
        },
        {
          type: 'example',
          title: 'Drei Tickets sortieren',
          problem: 'Um 08:30 Uhr liegen drei Meldungen vor: (A) Der Notebook-Akku von Frau Aksoy hält nur noch 1 Stunde, sie arbeitet am Netzteil. (B) Im Vertrieb (12 Personen) startet die Angebotssoftware nicht; Angebote können nicht erstellt werden, ein wichtiges Angebot muss bis Mittag raus. (C) Am Standort Berlin (50 Personen) ist das Internet langsam, Arbeiten geht, Videokonferenzen ruckeln.',
          steps: [
            { label: 'A', body: 'Auswirkung gering (1 Person), Dringlichkeit gering (Workaround Netzteil) → **Priorität 5**.' },
            { label: 'B', body: 'Auswirkung mittel (Abteilung), Dringlichkeit hoch (keine Arbeit möglich, Frist) → **Priorität 2**.' },
            { label: 'C', body: 'Auswirkung hoch (ganzer Standort), Dringlichkeit mittel (eingeschränkt möglich) → **Priorität 2**.' },
            { label: 'Reihenfolge', body: 'B und C beide Priorität 2 – B zuerst bearbeiten, weil hier gar nicht gearbeitet werden kann und eine Frist läuft (parallel C an den Netzwerk-Spezialisten geben); A zuletzt.' },
          ],
          result: 'B (P2) und C (P2) vor A (P5) – bei gleicher Priorität entscheidet der konkrete Geschäftsschaden.',
        },
        {
          type: 'check',
          question: {
            id: 'b06-c04', kind: 'number', skill: 'itsm.priority', difficulty: 1,
            prompt: 'Laut Matrix der Lektion: Auswirkung **mittel**, Dringlichkeit **hoch**. Welche Priorität (Zahl) ergibt sich?',
            answer: 2,
            explanation: 'Zeile mittel, Spalte hoch → **2**.',
          },
        },
        { type: 'practice', title: 'Übung: Störungen priorisieren', generator: 'sys.prio', count: 4, difficulty: 2 },
        { type: 'summary', points: ['Priorität = f(Auswirkung, Dringlichkeit) laut Prioritätsmatrix im SLA.', 'Auswirkung: wie viele/wie wichtig. Dringlichkeit: wie eilig, gibt es einen Workaround?', 'Zu jeder Priorität gehören Reaktions- und Lösungszeiten.', 'Nicht nach Lautstärke oder Hierarchie priorisieren (außer SLA regelt es).'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b06-l04',
      title: 'Service Level Agreement: Zeiten und Verfügbarkeit',
      minutes: 30,
      relevance: 'ap1',
      skills: ['itsm.sla'],
      steps: [
        {
          type: 'explain',
          title: 'Was im SLA steht',
          body: `Ein **Service Level Agreement (SLA)** ist eine Vereinbarung zwischen IT-Dienstleister und Kunde über **Art und Güte** eines Services – mit **messbaren** Zielwerten.

**Typische Inhalte** (orientiert z. B. an ITIL oder dem schlanken Standard FitSM):

| Inhalt | Beispiel |
|---|---|
| Servicebeschreibung, Komponenten, Abhängigkeiten | „Betrieb des Dateiservers FS01 inkl. Datensicherung“ |
| **Servicezeiten** und Ausnahmen | Mo–Fr 07:00–18:00 Uhr, außer Feiertage; Wartungsfenster Di 20–22 Uhr |
| **Reaktionszeit** | Zeit bis zur ersten **qualifizierten Rückmeldung** bzw. zum Beginn der Bearbeitung |
| **Lösungszeit** (Wiederherstellungszeit) | Zeit, bis der Service wieder funktioniert (ggf. per Workaround) |
| **Verfügbarkeit** | z. B. 99,5 % pro Monat innerhalb der Servicezeit |
| Support-Kanäle, Ansprechpartner, **Eskalation** | Hotline, Portal; Eskalationsstufen mit Namen |
| **Mitwirkungspflichten** des Kunden | Fehler sofort melden, Ansprechpartner benennen, Fernzugriff ermöglichen |
| Informationssicherheit und Datenschutz | AVV, Verschlüsselung, Zugriffsregeln |
| Reporting und **Review** | monatlicher Bericht, jährliche Überprüfung des SLA |
| Folgen bei Nichteinhaltung | Gutschrift/Vertragsstrafe |

Verwandte Begriffe: **OLA** (Operational Level Agreement) – Vereinbarung **innerhalb** der IT-Organisation (z. B. Service Desk ↔ Netzwerkteam); **UC** (Underpinning Contract) – Vertrag mit einem **externen Zulieferer** (z. B. Hardware-Wartung des Herstellers), der das SLA absichert.

**Wichtig:** Die Uhr für Reaktions- und Lösungszeit läuft nur **innerhalb der Servicezeit**. Eine Meldung um 17:50 Uhr mit 30 min Reaktionszeit (Servicezeit bis 18:00 Uhr) muss am nächsten Servicetag bis 07:20 Uhr beantwortet sein.`,
        },
        {
          type: 'explain',
          title: 'Verfügbarkeit und erlaubte Ausfallzeit berechnen',
          body: `**Verfügbarkeit** = Anteil der vereinbarten Betriebszeit, in der der Service funktioniert:

**Verfügbarkeit = (vereinbarte Zeit − Ausfallzeit) / vereinbarte Zeit · 100 %**

Umgekehrt: **erlaubte Ausfallzeit = vereinbarte Zeit · (100 % − Verfügbarkeit)**

Wichtig ist immer der **Bezugszeitraum** – er muss in der Aufgabe bzw. im SLA stehen:

| Zeitraum (24/7) | Stunden | Minuten |
|---|---|---|
| Jahr (365 Tage) | 8.760 h | 525.600 min |
| Monat (30 Tage) | 720 h | 43.200 min |
| Woche | 168 h | 10.080 min |

| Verfügbarkeit | erlaubter Ausfall pro Jahr (365 Tage) | pro Monat (30 Tage) |
|---|---|---|
| 99 % | 87,6 h | 7,2 h (432 min) |
| 99,5 % | 43,8 h | 3,6 h (216 min) |
| 99,9 % | 8,76 h | 43,2 min |
| 99,95 % | 4,38 h | 21,6 min |
| 99,99 % | 52,56 min | 4,32 min |

Jede „9“ mehr verringert die erlaubte Ausfallzeit auf ein Zehntel – und macht den Betrieb deutlich teurer (Redundanz, Bereitschaft).

**Mit Servicezeit:** Gilt das SLA nur Mo–Fr 8–18 Uhr, zählt nur diese Zeit: 4 Wochen · 5 Tage · 10 h = 200 h = 12.000 min. Bei 99,5 % sind dann 12.000 · 0,005 = **60 min** Ausfall erlaubt.

**Verfügbarkeit aus MTBF und MTTR:** MTBF (Mean Time Between Failures, mittlere Betriebszeit zwischen Ausfällen) und MTTR (Mean Time To Repair, mittlere Reparaturzeit): Verfügbarkeit = MTBF / (MTBF + MTTR).`,
        },
        {
          type: 'visual',
          title: 'Zeiten im Störungsverlauf',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['Anwender', 'Service Desk', 'Techniker'],
              messages: [
                { from: 0, to: 1, label: '09:10 Störung gemeldet', note: 'Start Reaktions- und Lösungszeit' },
                { from: 1, to: 0, label: '09:25 qualifizierte Rückmeldung', note: 'Reaktionszeit = 15 min' },
                { from: 1, to: 2, label: 'Eskalation an 2nd Level' },
                { from: 2, to: 0, label: '10:40 Service wiederhergestellt', note: 'Lösungszeit = 1 h 30 min' },
                { from: 0, to: 1, label: 'Bestätigung → Ticket geschlossen' },
              ],
            },
          },
          caption: 'Reaktionszeit endet mit der ersten qualifizierten Rückmeldung, Lösungszeit mit der Wiederherstellung des Service.',
        },
        {
          type: 'example',
          title: 'SLA-Prüfung für den Dateiserver',
          problem: 'SLA: Verfügbarkeit **99,9 %** pro Monat (30 Tage, 24/7). Im Oktober fiel der Dateiserver zweimal aus: 25 min und 31 min. Wurde das SLA eingehalten? Welche Verfügbarkeit wurde erreicht?',
          steps: [
            { label: 'Erlaubter Ausfall', body: '43.200 min · (100 % − 99,9 %) = 43.200 · 0,001 = **43,2 min**.' },
            { label: 'Tatsächlicher Ausfall', body: '25 + 31 = **56 min**.' },
            { label: 'Vergleich', body: '56 min > 43,2 min → **SLA verletzt**.' },
            { label: 'Erreichte Verfügbarkeit', body: '(43.200 − 56) / 43.200 · 100 % = 43.144 / 43.200 · 100 % ≈ **99,87 %**.' },
          ],
          result: 'Mit 99,87 % wurde das Ziel von 99,9 % verfehlt; je nach Vertrag erhält der Kunde eine Gutschrift.',
        },
        {
          type: 'check',
          question: {
            id: 'b06-c05', kind: 'number', skill: 'itsm.sla', difficulty: 2,
            prompt: 'Wie viele **Stunden** Ausfall erlaubt eine Verfügbarkeit von **99,5 %** pro Jahr (365 Tage, 24/7)?',
            answer: 43.8, tolerance: 0.01, unit: 'h',
            misconceptions: [{ answer: '4380', error: 'sla-prozent', why: 'Prozent nicht durch 100 geteilt: 0,5 % = 0,005.' }, { answer: '2628', error: 'sla-einheit', why: 'Das sind Minuten – gefragt sind Stunden.' }],
            explanation: '8.760 h · 0,005 = **43,8 h**.',
          },
        },
        { type: 'practice', title: 'Übung: Verfügbarkeit ↔ Ausfallzeit', generator: 'sys.sla', count: 5, difficulty: 2 },
        { type: 'summary', points: ['SLA: messbare Vereinbarung (Servicezeit, Reaktions-, Lösungszeit, Verfügbarkeit, Eskalation, Mitwirkungspflichten).', 'OLA = intern, UC = mit externem Zulieferer.', 'Ausfall erlaubt = Zeitraum · (100 % − Verfügbarkeit); Bezugszeitraum immer nennen.', 'Jahr = 525.600 min, Monat (30 d) = 43.200 min.', 'Uhr läuft nur in der Servicezeit.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b06-l05',
      title: 'Incident, Problem, Change, Service Request',
      minutes: 25,
      relevance: 'ap1',
      skills: ['itsm.itil'],
      steps: [
        {
          type: 'explain',
          title: 'Die wichtigsten ITIL-Begriffe',
          body: `**ITIL** (aktuell ITIL 4) ist eine weltweit verbreitete Sammlung bewährter Praktiken für IT-Service-Management. Für den Alltag im Support muss man vor allem vier Begriffe sauber trennen:

| Begriff | Definition (sinngemäß ITIL) | Ziel | Beispiel |
|---|---|---|---|
| **Incident** (Störung) | **ungeplante Unterbrechung** oder Qualitätsminderung eines Services | Service **so schnell wie möglich wiederherstellen** – notfalls per Workaround | „Drucker im Vertrieb druckt nicht“ |
| **Problem** | **Ursache** (oder mögliche Ursache) eines oder mehrerer Incidents | Ursache finden und **dauerhaft beseitigen**, Wiederholung verhindern | „Warum fällt der Drucker jeden Montag aus?“ |
| **Change** (Änderung) | Hinzufügen, Ändern oder Entfernen von etwas, das Auswirkungen auf Services haben kann | Änderungen **kontrolliert** durchführen (Risiko bewerten, genehmigen, testen, Rückfallplan) | Firmware-Update aller Drucker |
| **Service Request** (Serviceanfrage) | **Anfrage** eines Anwenders nach einer vorgesehenen Standardleistung – nichts ist kaputt | standardisiert und effizient erfüllen | Passwort zurücksetzen, neue Software, Zugriff auf einen Ordner, Info-Frage |

Weitere Begriffe:
- **Workaround:** Umgehungslösung, die die Auswirkung verringert, ohne die Ursache zu beheben (z. B. auf anderem Drucker drucken).
- **Known Error** (bekannter Fehler): Problem, dessen Ursache analysiert, aber noch nicht beseitigt ist – mit dokumentiertem Workaround in der **Known Error Database**.
- **Major Incident:** Störung mit sehr hoher Auswirkung, eigener beschleunigter Ablauf.
- **Event:** jede für den Betrieb relevante Zustandsänderung (z. B. Monitoring-Alarm „Festplatte 90 % voll“) – kann einen Incident auslösen oder ihn verhindern.

**Change-Arten:**

| Art | Merkmal | Beispiel |
|---|---|---|
| **Standard-Change** | geringes Risiko, vorab genehmigtes Standardverfahren | Arbeitsplatz-PC nach Standard einrichten |
| **Normaler Change** | wird bewertet und genehmigt (ggf. durch ein Change Advisory Board, CAB), geplant, getestet | Umstellung des Mailservers |
| **Notfall-Change** (Emergency) | muss sofort umgesetzt werden, beschleunigte Genehmigung | Sicherheitslücke wird aktiv ausgenutzt – Patch sofort |

**Zusammenspiel:** Incident Management stellt schnell wieder her → Problem Management sucht die Ursache → die dauerhafte Lösung wird als **Change** umgesetzt.`,
        },
        {
          type: 'visual',
          title: 'Vom Incident über das Problem zum Change',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['Incident Management', 'Problem Management', 'Change Management'],
              messages: [
                { from: 0, to: 0, label: 'Incidents: VPN bricht ab (5 Tickets in 2 Wochen)', note: 'Workaround: neu verbinden' },
                { from: 0, to: 1, label: 'Problem anlegen: wiederkehrende Störung' },
                { from: 1, to: 1, label: 'Ursachenanalyse (5-Why) → Firmware-Fehler', note: 'Known Error + Workaround dokumentieren' },
                { from: 1, to: 2, label: 'Change beantragen: Firmware-Update' },
                { from: 2, to: 2, label: 'Risiko bewerten, genehmigen, testen, Rückfallplan, umsetzen' },
                { from: 2, to: 1, label: 'Ergebnis prüfen → Problem schließen' },
              ],
            },
          },
          caption: 'Incident = schnell wiederherstellen, Problem = Ursache finden, Change = Lösung kontrolliert einführen.',
        },
        {
          type: 'example',
          title: 'Tickets richtig einordnen',
          problem: 'Ordne ein: (1) „Ich habe mein Passwort vergessen.“ (2) „Seit heute früh kann niemand im Lager Etiketten drucken.“ (3) „Der Etikettendrucker fällt seit Wochen immer wieder aus – woran liegt das?“ (4) „Wir tauschen alle Etikettendrucker gegen ein neues Modell.“',
          steps: [
            { label: '(1)', body: 'Nichts ist kaputt, vorgesehene Standardleistung → **Service Request**.' },
            { label: '(2)', body: 'Ungeplante Unterbrechung → **Incident** (schnell wiederherstellen, z. B. Ersatzdrucker).' },
            { label: '(3)', body: 'Suche nach der Ursache wiederkehrender Störungen → **Problem**.' },
            { label: '(4)', body: 'Geplante Änderung der Infrastruktur → **Change** (normaler Change mit Planung, Test, Genehmigung).' },
          ],
          result: 'Service Request – Incident – Problem – Change: vier Prozesse mit unterschiedlichen Zielen.',
        },
        {
          type: 'check',
          question: {
            id: 'b06-c06', kind: 'single', skill: 'itsm.itil', difficulty: 2,
            prompt: 'Was ist das **Hauptziel des Incident Managements**?',
            options: ['Den normalen Servicebetrieb so schnell wie möglich wiederherstellen', 'Die Ursache jeder Störung dauerhaft beseitigen', 'Änderungen an der Infrastruktur genehmigen', 'Neue Software bestellen'],
            answer: 0,
            distractors: { '1': { why: 'Das ist Aufgabe des Problem Managements.', error: 'itil-incident-problem' }, '2': { why: 'Das ist Change Management.', error: 'itil-incident-problem' }, '3': { why: 'Das ist ein Service Request.', error: 'itil-incident-problem' } },
            explanation: 'Incident = schnell wiederherstellen (ggf. per Workaround), Problem = Ursache beseitigen.',
          },
        },
        { type: 'practice', title: 'Übung: ITIL-Grundbegriffe', questionIds: ['b06-q014', 'b06-q015', 'b06-q016', 'b06-q017', 'b06-q018'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Incident = ungeplante Störung → schnell wiederherstellen.', 'Problem = Ursache von Incidents → dauerhaft beseitigen.', 'Change = kontrollierte Änderung (Standard, normal, Notfall).', 'Service Request = Standardanfrage, nichts ist kaputt.', 'Workaround, Known Error, Major Incident, Event.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b06-l06',
      title: 'Problemanalyse: 5-Why, Ishikawa, Pareto, DMAIC',
      minutes: 30,
      relevance: 'ap1',
      skills: ['itsm.analysis'],
      steps: [
        {
          type: 'explain',
          title: 'Methoden, um der Ursache auf den Grund zu gehen',
          body: `Wer nur Symptome behandelt, bekommt dieselben Tickets immer wieder. Für die **Ursachenanalyse** (Root Cause Analysis) gibt es bewährte Methoden:

**1. 5-Why-Methode (5 × Warum):** Man fragt so lange „Warum?“, bis man bei der eigentlichen Ursache ankommt – meist nach etwa fünf Fragen. Jede Antwort ist die Grundlage der nächsten Frage. Einfach, schnell, gut für einzelne Ursachenketten; Gefahr: man folgt nur einem Strang.

**2. Ishikawa-Diagramm (Ursache-Wirkungs- oder Fischgräten-Diagramm):** Die **Wirkung** (das Problem) steht am „Kopf“ des Fisches, die möglichen Ursachen werden an „Gräten“ nach **Kategorien** gesammelt. Klassisch die **6 M**: Mensch, Maschine, Material, Methode, Milieu (Umwelt), Messung. In der IT oft angepasst: Mensch, Hardware, Software, Netzwerk, Prozess/Methode, Umgebung. Gut für Brainstorming im Team – man übersieht weniger Ursachen.

**3. Pareto-Analyse (80/20-Regel):** Oft verursachen **wenige Ursachen den Großteil der Fälle** (ungefähr 20 % der Ursachen → 80 % der Wirkung). Vorgehen:
1. Tickets nach Kategorien zählen,
2. **absteigend sortieren**,
3. Anteile in % und **kumulierte** Anteile berechnen,
4. die Kategorien angehen, die zusammen ca. 80 % ausmachen.
Das Ergebnis wird oft als **Pareto-Diagramm** (Balken absteigend + kumulierte Linie) dargestellt.

**4. DMAIC** (aus Six Sigma) – strukturierter Verbesserungszyklus: **D**efine (Problem und Ziel definieren) → **M**easure (Ist-Zustand messen) → **A**nalyze (Ursachen analysieren) → **I**mprove (Lösungen umsetzen) → **C**ontrol (Ergebnis absichern und überwachen). Ähnlich PDCA, aber stärker auf Messen und Daten ausgerichtet.

**Hilfsmittel bei der Analyse:** Logdateien (Windows-Ereignisanzeige, z. B. \`CBS.log\` bei Update-Fehlern; Linux \`journalctl\`, \`/var/log\`), Fehlercodes recherchieren (Herstellerdatenbanken), Monitoring-Daten (Latenz, Paketverlust, Auslastung), Befragung der Anwender, Reproduzieren des Fehlers.`,
        },
        {
          type: 'visual',
          title: 'Ishikawa-Diagramm: „VPN-Verbindung bricht ab“',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Mensch', text: 'Notebook geht in Energiesparmodus, falsche Bedienung, veraltete Anleitung.', icon: 'Users' },
                { title: 'Hardware', text: 'WLAN-Karte/Treiber fehlerhaft, Router zu Hause überlastet.', icon: 'Cpu' },
                { title: 'Software', text: 'VPN-Client-Version, Firmware der Firewall, Virenschutz blockiert.', icon: 'AppWindow' },
                { title: 'Netzwerk', text: 'Instabiler Heim-Internetzugang, Zwangstrennung, MTU-Probleme.', icon: 'Network' },
                { title: 'Methode/Prozess', text: 'Kein Standard für Homeoffice-Ausstattung, Updates nicht getestet.', icon: 'Workflow' },
                { title: 'Umgebung', text: 'Schlechter WLAN-Empfang, Störungen durch andere Netze.', icon: 'Globe' },
              ],
            },
          },
          caption: 'Wirkung (Fischkopf): „VPN bricht ab“. Jede Karte ist eine Gräte mit möglichen Ursachen – danach wird geprüft, welche zutrifft.',
        },
        {
          type: 'example',
          title: '5-Why: Der Server ist nachts ausgefallen',
          problem: 'Der Dateiserver war morgens nicht erreichbar. Finde mit der 5-Why-Methode die Ursache.',
          steps: [
            { label: 'Warum 1?', body: 'Warum war der Server nicht erreichbar? → Er war ausgeschaltet.' },
            { label: 'Warum 2?', body: 'Warum war er ausgeschaltet? → Die USV hat ihn bei einem Stromausfall heruntergefahren, weil der Akku leer war.' },
            { label: 'Warum 3?', body: 'Warum war der Akku so schnell leer? → Die USV-Batterien sind 6 Jahre alt und haben kaum noch Kapazität.' },
            { label: 'Warum 4?', body: 'Warum wurden sie nicht getauscht? → Niemand hat die Warnmeldung der USV bemerkt.' },
            { label: 'Warum 5?', body: 'Warum nicht? → Die USV ist nicht ins **Monitoring** eingebunden und es gibt keinen Wartungsplan für Batterien.' },
          ],
          result: 'Ursache: fehlende Überwachung und Wartungsplanung der USV. Maßnahmen: Batterien tauschen (Sofortmaßnahme), USV ins Monitoring aufnehmen, Batteriewechsel-Intervall in den Wartungsplan (präventive Wartung).',
        },
        {
          type: 'example',
          title: 'Pareto-Analyse der Tickets',
          problem: `Tickets im 3. Quartal (200 insgesamt):

| Kategorie | Anzahl |
|---|---|
| Passwort / Konto gesperrt | 84 |
| Drucker | 46 |
| E-Mail / Outlook | 30 |
| VPN | 18 |
| Hardwaredefekt | 12 |
| Sonstiges | 10 |

Welche Kategorien sollte das Team angehen, um mindestens 80 % der Tickets zu erfassen?`,
          steps: [
            { label: 'Anteile', body: 'Passwort 84/200 = 42 %, Drucker 23 %, E-Mail 15 %, VPN 9 %, Hardware 6 %, Sonstiges 5 %.' },
            { label: 'Kumuliert', body: '42 % → 65 % → **80 %** → 89 % → 95 % → 100 %.' },
            { label: 'Ergebnis', body: 'Die **drei** Kategorien Passwort, Drucker und E-Mail machen zusammen 80 % aus.' },
            { label: 'Maßnahme', body: 'z. B. Self-Service-Passwort-Reset und Info-Mail vor Passwortablauf; Druckertreiber per GPO standardisieren.' },
          ],
          result: 'Drei von sechs Kategorien verursachen 80 % der Tickets – hier lohnt sich die Verbesserung am meisten.',
        },
        {
          type: 'check',
          question: {
            id: 'b06-c07', kind: 'match', skill: 'itsm.analysis', difficulty: 2,
            prompt: 'Ordne die Methode ihrer Beschreibung zu.',
            left: ['5-Why', 'Ishikawa-Diagramm', 'Pareto-Analyse', 'DMAIC'],
            right: ['wiederholt nach dem Warum fragen, bis die Ursache sichtbar wird', 'Ursachen nach Kategorien an „Gräten“ sammeln', 'Häufigkeiten absteigend sortieren, die wenigen großen Ursachen finden', 'Define – Measure – Analyze – Improve – Control'],
            answer: [0, 1, 2, 3],
            explanation: 'Vier Methoden mit unterschiedlichen Stärken – oft kombiniert.',
          },
        },
        { type: 'practice', title: 'Übung: Pareto-Analyse', generator: 'sys.pareto', count: 4, difficulty: 2 },
        { type: 'summary', points: ['5-Why: Ursachenkette durch wiederholtes Fragen.', 'Ishikawa: Ursachen nach Kategorien (6 M bzw. IT-Kategorien) sammeln.', 'Pareto: sortieren, kumulieren, die ca. 80 % verursachenden Kategorien angehen.', 'DMAIC: Define, Measure, Analyze, Improve, Control.', 'Logdateien, Fehlercodes und Monitoring liefern die Fakten.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b06-l07',
      title: 'Kundenkommunikation am Telefon und per E-Mail',
      minutes: 25,
      relevance: 'ap1',
      skills: ['itsm.comm'],
      steps: [
        {
          type: 'explain',
          title: 'Freundlich, strukturiert, verständlich',
          body: `Im Support ist Technik nur die halbe Miete. Wie du kommunizierst, entscheidet, ob ein Kunde zufrieden ist – selbst wenn das Problem noch nicht gelöst ist.

**Gesprächsleitfaden am Telefon:**

| Phase | Inhalt | Beispiel |
|---|---|---|
| **1. Begrüßung** | Firma, Abteilung, Name, Angebot | „IT-Service Elektro Krämer, Sie sprechen mit Lena Wolf. Was kann ich für Sie tun?“ |
| **2. Anliegen aufnehmen** | ausreden lassen, **aktiv zuhören**, Notizen | „Ich verstehe, Outlook startet seit heute früh nicht.“ |
| **3. Fragen stellen** | **offene Fragen** (W-Fragen) zum Sammeln, **geschlossene Fragen** (Ja/Nein) zum Eingrenzen | „Welche Meldung erscheint?“ – „Haben Sie den PC heute schon neu gestartet?“ |
| **4. Zusammenfassen** | Verständnis sichern | „Habe ich Sie richtig verstanden, dass …?“ |
| **5. Lösung / nächste Schritte** | Lösung erklären oder vereinbaren, wer was bis wann tut; **Ticketnummer** nennen | „Ich gebe das an unseren Exchange-Spezialisten. Sie erhalten bis 11 Uhr eine Rückmeldung. Ihre Ticketnummer ist 0412.“ |
| **6. Verabschiedung** | Dank, ggf. Rückfrage | „Kann ich sonst noch etwas für Sie tun? Danke für Ihren Anruf.“ |

**Grundregeln:**
- **Verständliche Sprache**, Fachbegriffe erklären oder vermeiden („Ihr Rechner bekommt keine Netzwerkadresse“ statt „DHCP-Lease schlägt fehl“).
- **Aktives Zuhören:** nachfragen, paraphrasieren, Verständnis zeigen.
- **Ich-Botschaften** statt Vorwürfen („Ich habe das noch nicht verstanden“ statt „Sie erklären das falsch“).
- Nur versprechen, was du halten kannst; Rückrufe einhalten.
- **Sicherheit:** Identität prüfen, bevor du z. B. ein Passwort zurücksetzt (Rückruf an hinterlegte Nummer, Abfrage von Merkmalen) – Angreifer nutzen gefälschte Hilfeanrufe (**Social Engineering**). Niemals nach Passwörtern fragen.

**Vier-Ohren-Modell (Schulz von Thun):** Jede Nachricht hat vier Seiten – **Sachinhalt** (Information), **Selbstkundgabe** (was der Sender über sich verrät), **Beziehung** (wie er zum Empfänger steht), **Appell** (wozu er ihn bewegen will). „Das System ist SCHON WIEDER abgestürzt!“ → Sache: Absturz; Selbstkundgabe: Ich bin genervt; Beziehung: Ihr kriegt das nicht hin; Appell: Löst es jetzt endlich! Wer nur auf dem „Beziehungsohr“ hört, fühlt sich angegriffen – professionell ist, sachlich auf den Inhalt und den Appell einzugehen.

**Verärgerte Anrufer:** ausreden lassen, nicht persönlich nehmen, Verständnis zeigen („Ich verstehe, dass das ärgerlich ist, gerade vor Ihrem Termin“), sachlich bleiben, konkrete nächste Schritte nennen. Bei Bedarf hierarchisch eskalieren.

**E-Mail-Antworten:** aussagekräftiger Betreff mit Ticketnummer, korrekte Anrede, kurzer strukturierter Text (Anliegen – Lösung/Stand – nächster Schritt), verständliche Sprache, Signatur mit Kontakt; **keine Passwörter oder sensiblen Daten** per unverschlüsselter E-Mail.`,
        },
        {
          type: 'visual',
          title: 'Die vier Seiten einer Nachricht',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Sachinhalt', text: 'Worüber informiere ich? „Der Drucker druckt nicht.“', icon: 'FileText' },
                { title: 'Selbstkundgabe', text: 'Was gebe ich von mir preis? „Ich bin unter Zeitdruck.“', icon: 'MessageSquare' },
                { title: 'Beziehung', text: 'Was halte ich von dir? „Ihr seid doch die IT …“', icon: 'Users' },
                { title: 'Appell', text: 'Wozu will ich dich bewegen? „Kümmere dich sofort darum!“', icon: 'Target' },
              ],
            },
          },
          caption: 'Gute Support-Mitarbeitende hören auf allen Ohren – und antworten auf der Sachebene mit konkretem Angebot.',
        },
        {
          type: 'example',
          title: 'Ein verärgerter Anruf',
          problem: 'Frau Krämer (Geschäftsleitung) ruft an: „Schon wieder geht das WLAN im Besprechungsraum nicht! In 20 Minuten kommt ein wichtiger Kunde. Was macht ihr eigentlich den ganzen Tag?“ Wie reagierst du?',
          steps: [
            { label: 'Ruhig bleiben', body: 'Den Vorwurf nicht persönlich nehmen (Beziehungsebene), auf Sache und Appell eingehen.' },
            { label: 'Verständnis zeigen', body: '„Ich verstehe, dass das gerade vor dem Kundentermin sehr ärgerlich ist.“' },
            { label: 'Gezielt fragen', body: '„Sehen Sie das WLAN „EK-Meeting“ in der Liste? Erscheint eine Fehlermeldung?“' },
            { label: 'Sofortlösung anbieten', body: '„Ich schicke Ihnen sofort einen Kollegen mit einem LTE-Router und prüfe parallel den Access Point aus der Ferne.“' },
            { label: 'Verbindlich abschließen', body: '„Herr Hansen ist in 5 Minuten bei Ihnen. Ihre Ticketnummer ist 0433. Ich melde mich nach dem Termin zur Ursache.“ – danach Problem-Ticket für die wiederkehrende Störung anlegen.' },
          ],
          result: 'Sachlich, empathisch und mit konkretem Workaround reagieren; die wiederkehrende Ursache wird anschließend als Problem untersucht.',
        },
        {
          type: 'check',
          question: {
            id: 'b06-c08', kind: 'single', skill: 'itsm.comm', difficulty: 1,
            prompt: 'Welche Frage ist eine **offene** Frage?',
            options: ['„Welche Fehlermeldung erscheint auf dem Bildschirm?“', '„Haben Sie den PC neu gestartet?“', '„Ist das Netzwerkkabel eingesteckt?“', '„Betrifft es nur Sie?“'],
            answer: 0,
            distractors: { '1': { why: 'Darauf kann man mit Ja/Nein antworten – geschlossene Frage.', error: 'frage-offen-geschlossen' }, '2': { why: 'Ja/Nein – geschlossene Frage.', error: 'frage-offen-geschlossen' }, '3': { why: 'Ja/Nein – geschlossene Frage.', error: 'frage-offen-geschlossen' } },
            explanation: 'Offene Fragen beginnen meist mit einem W-Wort und laden zu ausführlichen Antworten ein.',
          },
        },
        { type: 'practice', title: 'Übung: Kommunikation', questionIds: ['b06-q025', 'b06-q026', 'b06-q027', 'b06-q028'], count: 4, difficulty: 2 },
        { type: 'summary', points: ['Leitfaden: Begrüßung – Anliegen – Fragen – Zusammenfassen – nächste Schritte/Ticketnummer – Verabschiedung.', 'Offene Fragen sammeln, geschlossene Fragen grenzen ein.', 'Verständlich, aktiv zuhören, Ich-Botschaften, Zusagen einhalten.', 'Vier-Ohren-Modell: Sache, Selbstkundgabe, Beziehung, Appell.', 'Identität prüfen, nie nach Passwörtern fragen (Social Engineering).'] },
      ],
    },
  ],
  questions: [
    { id: 'b06-q001', kind: 'free', skill: 'itsm.service', difficulty: 1, prompt: 'Erläutere den Begriff **Single Point of Contact (SPOC)** im Zusammenhang mit dem Service Desk.', modelAnswer: 'Der Service Desk ist die eine zentrale Anlaufstelle für alle Anfragen der Anwender (Störungen, Fragen, Bestellungen) – über alle Kanäle wie Telefon, E-Mail oder Portal. Anwender müssen nicht wissen, welcher Spezialist zuständig ist; der Service Desk erfasst, koordiniert und hält den Kontakt bis zum Abschluss.', keywords: ['zentrale Anlaufstelle', 'alle Anfragen', 'Kanäle', 'koordiniert'], explanation: 'SPOC = eine Stelle für alles.' },
    { id: 'b06-q002', kind: 'multi', skill: 'itsm.service', difficulty: 2, prompt: 'Welche Angaben gehören in ein vollständig erfasstes Störungsticket?', options: ['Name und Kontakt des Melders', 'genaue Fehlermeldung und seit wann sie auftritt', 'Priorität', 'Passwort des Anwenders', 'bereits durchgeführte Lösungsversuche'], answer: [0, 1, 2, 4], explanation: 'Passwörter werden nie erfragt oder notiert.' },
    { id: 'b06-q003', kind: 'single', skill: 'itsm.service', difficulty: 2, prompt: 'Der Techniker hat das Problem behoben, die Anwenderin ist aber im Urlaub und konnte noch nicht testen. Welchen Status erhält das Ticket?', options: ['Gelöst', 'Geschlossen', 'Neu', 'Wiedereröffnet'], answer: 0, distractors: { '1': { why: 'Geschlossen wird erst nach Bestätigung bzw. Ablauf der vereinbarten Frist.', error: 'ticket-status' }, '2': { why: 'Das Ticket ist längst in Bearbeitung gewesen.', error: 'ticket-status' }, '3': { why: 'Wiedereröffnet wird ein Ticket, wenn der Fehler erneut auftritt.', error: 'ticket-status' } }, explanation: 'Gelöst = Lösung umgesetzt; geschlossen = bestätigt.' },
    { id: 'b06-q004', kind: 'free', skill: 'itsm.service', difficulty: 2, prompt: 'Erläutere den Unterschied zwischen **reaktivem** Support und **präventiver Wartung** und nenne zwei präventive Maßnahmen.', modelAnswer: 'Reaktiver Support beginnt erst, wenn eine Störung gemeldet wird, und stellt den Betrieb wieder her. Präventive Wartung soll Störungen vermeiden, bevor sie auftreten. Maßnahmen: Monitoring mit Schwellwerten (z. B. Alarm bei 85 % Plattenbelegung, Dienst gestoppt, Fehlereinträge im Ereignisprotokoll), regelmäßiges Patchmanagement, geplante Wartungsfenster, Tausch von Verschleißteilen (USV-Batterien, Lüfter), rechtzeitige Kapazitätserweiterung, Prüfung der Datensicherung.', keywords: ['nach Meldung', 'vermeiden', 'Monitoring', 'Schwellwert', 'Patch', 'Wartung'], explanation: 'Reaktiv = nachher, präventiv = vorher.' },
    { id: 'b06-q005', kind: 'table', skill: 'itsm.levels', difficulty: 2, prompt: 'Welches Support-Level bearbeitet die Anfrage typischerweise? Trage **1**, **2** oder **3** ein.', columns: [{ key: 'l', label: 'Level', type: 'number' }], rows: [{ label: 'Passwort zurücksetzen', cells: { l: { answer: '1' } } }, { label: 'Fehlkonfiguration im Core-Switch analysieren', cells: { l: { answer: '2' } } }, { label: 'Fehler in der Firmware der Firewall beheben', cells: { l: { answer: '3' } } }, { label: 'Netzwerkdrucker beim Anwender verbinden', cells: { l: { answer: '1' } } }, { label: 'Exchange-Datenbank nach Absturz reparieren', cells: { l: { answer: '2' } } }], explanation: 'Standardaufgaben → 1st; Spezialisten → 2nd; Herstellerfehler → 3rd.' },
    { id: 'b06-q006', kind: 'free', skill: 'itsm.levels', difficulty: 2, prompt: 'Erkläre den Unterschied zwischen **funktionaler** und **hierarchischer** Eskalation mit je einem Beispiel.', modelAnswer: 'Funktionale Eskalation: Das Ticket wird an ein Team mit mehr Fachwissen weitergegeben, weil der 1st Level es fachlich nicht lösen kann – z. B. Serverfehler an den 2nd-Level-Serveradministrator. Hierarchische Eskalation: Vorgesetzte bzw. das Management werden eingeschaltet, weil z. B. eine SLA-Verletzung droht, zusätzliche Ressourcen oder Kostenentscheidungen nötig sind oder ein Kunde sich beschwert – z. B. IT-Leitung wird informiert, weil der Ausfall der Warenwirtschaft länger als die vereinbarte Lösungszeit dauert.', keywords: ['Fachwissen', 'höheres Level', 'Vorgesetzte', 'SLA', 'Entscheidung'], explanation: 'Funktional = Know-how; hierarchisch = Befugnis.' },
    { id: 'b06-q007', kind: 'match', skill: 'itsm.levels', difficulty: 1, prompt: 'Ordne die RACI-Rolle ihrer Bedeutung zu.', left: ['Responsible', 'Accountable', 'Consulted', 'Informed'], right: ['führt die Aufgabe durch', 'trägt die Gesamtverantwortung und genehmigt', 'wird vorher fachlich befragt', 'wird über das Ergebnis informiert'], answer: [0, 1, 2, 3], explanation: 'R macht, A verantwortet, C wird gefragt, I wird informiert.' },
    { id: 'b06-q008', kind: 'table', skill: 'itsm.levels', difficulty: 3, prompt: `Prüfe die RACI-Matrix für die Aufgabe „Firewall-Regel ändern“. Trage für jede Regel **ok** oder **verletzt** ein.

| Rolle | Netzwerk-Admin | IT-Leitung | Datenschutzbeauftragter | Fachabteilung | IT-Sicherheitsbeauftragter |
|---|---|---|---|---|---|
| Zuordnung | R | A | I | I | A |`, columns: [{ key: 'x', label: 'ok / verletzt', type: 'text' }], rows: [{ label: 'Es gibt mindestens ein R.', cells: { x: { answer: 'ok' } } }, { label: 'Es gibt genau ein A.', cells: { x: { answer: 'verletzt' } } }], explanation: 'Ein R (Netzwerk-Admin) ist vorhanden. Aber es gibt **zwei A** (IT-Leitung und IT-Sicherheitsbeauftragter) – pro Aufgabe darf nur eine Rolle accountable sein; der Sicherheitsbeauftragte sollte z. B. **C** sein.' },
    { id: 'b06-q009', kind: 'number', skill: 'itsm.levels', difficulty: 2, prompt: 'Der Service Desk hat im Monat **640** Tickets erhalten, davon wurden **416** direkt im ersten Kontakt gelöst. Wie hoch ist die **Erstlösungsquote** in Prozent?', answer: 65, unit: '%', explanation: '416 / 640 · 100 % = **65 %**.' },
    { id: 'b06-q010', kind: 'free', skill: 'itsm.priority', difficulty: 2, prompt: 'Erkläre, wie sich die **Priorität** eines Tickets ergibt, und warum ein vorhandener Workaround die Priorität senken kann.', modelAnswer: 'Die Priorität wird aus Auswirkung (wie viele Personen bzw. wie wichtige Geschäftsprozesse betroffen sind) und Dringlichkeit (wie schnell eine Lösung nötig ist) über eine im SLA festgelegte Prioritätsmatrix bestimmt. Ein Workaround ermöglicht es, eingeschränkt weiterzuarbeiten; damit sinkt die Dringlichkeit – und mit ihr die Priorität –, auch wenn die Auswirkung gleich bleibt.', keywords: ['Auswirkung', 'Dringlichkeit', 'Matrix', 'Workaround', 'senkt Dringlichkeit'], explanation: 'Priorität = Auswirkung × Dringlichkeit.' },
    { id: 'b06-q011', kind: 'table', skill: 'itsm.priority', difficulty: 2, prompt: 'Bestimme mit der Matrix (hoch/hoch = 1 … gering/gering = 5; Priorität = Stufe Auswirkung + Stufe Dringlichkeit − 1 mit hoch = 1, mittel = 2, gering = 3) die Priorität.', columns: [{ key: 'p', label: 'Priorität', type: 'number' }], rows: [{ label: 'Auswirkung hoch, Dringlichkeit gering', cells: { p: { answer: '3' } } }, { label: 'Auswirkung gering, Dringlichkeit hoch', cells: { p: { answer: '3' } } }, { label: 'Auswirkung mittel, Dringlichkeit mittel', cells: { p: { answer: '3' } } }, { label: 'Auswirkung hoch, Dringlichkeit mittel', cells: { p: { answer: '2' } } }, { label: 'Auswirkung gering, Dringlichkeit mittel', cells: { p: { answer: '4' } } }], explanation: '1 + 3 − 1 = 3; 3 + 1 − 1 = 3; 2 + 2 − 1 = 3; 1 + 2 − 1 = 2; 3 + 2 − 1 = 4.' },
    { id: 'b06-q012', kind: 'number', skill: 'itsm.sla', difficulty: 2, prompt: 'Ein Clouddienst garantiert **99,9 %** Verfügbarkeit pro Monat (30 Tage, 24/7). Wie viele **Minuten** Ausfall sind maximal erlaubt?', answer: 43.2, tolerance: 0.01, unit: 'min', misconceptions: [{ answer: '4320', error: 'sla-prozent', why: '0,1 % = 0,001 – nicht mit 0,1 multiplizieren.' }, { answer: '0.72', error: 'sla-einheit', why: 'Das sind Stunden.' }], explanation: '43.200 min · 0,001 = **43,2 min**.' },
    { id: 'b06-q013', kind: 'number', skill: 'itsm.sla', difficulty: 3, prompt: 'Ein Server hat eine **MTBF** von 500 Stunden und eine **MTTR** von 4 Stunden. Wie hoch ist die Verfügbarkeit in Prozent? (auf 2 Nachkommastellen runden)', answer: 99.21, tolerance: 0.01, unit: '%', hints: ['Verfügbarkeit = MTBF / (MTBF + MTTR).'], explanation: '500 / 504 = 0,99206… → **99,21 %**.' },
    { id: 'b06-q014', kind: 'table', skill: 'itsm.itil', difficulty: 2, prompt: 'Ordne die Meldungen ein: **Incident**, **Problem**, **Change** oder **Service Request**.', columns: [{ key: 'x', label: 'Kategorie', type: 'text' }], rows: [{ label: '„Bitte installieren Sie mir Visio.“', cells: { x: { answer: 'Service Request', accept: ['servicerequest', 'serviceanfrage', 'request'] } } }, { label: '„Der Mailserver ist seit 10 Minuten nicht erreichbar.“', cells: { x: { answer: 'Incident', accept: ['störung'] } } }, { label: 'Ursache der wöchentlichen Mailserver-Abstürze ermitteln', cells: { x: { answer: 'Problem' } } }, { label: 'Mailserver auf eine neue Version migrieren', cells: { x: { answer: 'Change', accept: ['änderung'] } } }, { label: '„Ich habe mein Passwort vergessen.“', cells: { x: { answer: 'Service Request', accept: ['servicerequest', 'serviceanfrage', 'request'] } } }], explanation: 'Anfrage nach Standardleistung = Service Request; Unterbrechung = Incident; Ursachensuche = Problem; geplante Änderung = Change.' },
    { id: 'b06-q015', kind: 'free', skill: 'itsm.itil', difficulty: 2, prompt: 'Erkläre den Unterschied zwischen **Incident** und **Problem** im Sinne von ITIL.', modelAnswer: 'Ein Incident ist eine ungeplante Unterbrechung oder Qualitätsminderung eines Services; Ziel ist, den Betrieb so schnell wie möglich wiederherzustellen, notfalls mit einem Workaround. Ein Problem ist die (mögliche) Ursache eines oder mehrerer Incidents; im Problem Management wird die Ursache analysiert und dauerhaft beseitigt, damit die Incidents nicht wieder auftreten.', keywords: ['Unterbrechung', 'schnell wiederherstellen', 'Workaround', 'Ursache', 'dauerhaft'], explanation: 'Incident = Symptom schnell beheben; Problem = Ursache beseitigen.' },
    { id: 'b06-q016', kind: 'match', skill: 'itsm.itil', difficulty: 2, prompt: 'Ordne die Change-Art dem Beispiel zu.', left: ['Standard-Change', 'Normaler Change', 'Notfall-Change'], right: ['neuen Arbeitsplatz nach freigegebenem Standard einrichten', 'Umstellung der Telefonanlage auf VoIP nach Planung und Genehmigung', 'aktiv ausgenutzte Sicherheitslücke sofort patchen'], answer: [0, 1, 2], explanation: 'Standard = vorab genehmigt; normal = bewerten/genehmigen; Notfall = sofort mit beschleunigter Genehmigung.' },
    { id: 'b06-q017', kind: 'text', skill: 'itsm.itil', difficulty: 1, prompt: 'Wie nennt man eine Umgehungslösung, die die Auswirkung einer Störung verringert, ohne die Ursache zu beheben?', accept: ['Workaround', 'Work-around', 'Umgehungslösung', 'Behelfslösung'], explanation: '**Workaround**.' },
    { id: 'b06-q018', kind: 'free', skill: 'itsm.itil', difficulty: 3, prompt: 'Beschreibe, welche Schritte ein **normaler Change** (z. B. Firmware-Update aller Switches) durchlaufen sollte, bevor er umgesetzt wird.', modelAnswer: 'Change-Antrag mit Beschreibung, Begründung und betroffenen Systemen erfassen; Risiko und Auswirkungen bewerten (Ausfallzeit, Abhängigkeiten); Genehmigung durch die zuständige Stelle bzw. das CAB; Planung mit Wartungsfenster, Verantwortlichen und Kommunikation an die Betroffenen; Test in einer Testumgebung bzw. an einem einzelnen Gerät; Rückfallplan (alte Firmware, Konfigurationssicherung); Umsetzung; Erfolgskontrolle; Dokumentation und Abschluss (Review).', keywords: ['Antrag', 'Risiko', 'Genehmigung', 'Wartungsfenster', 'Test', 'Rückfallplan', 'Dokumentation'], explanation: 'Kontrolliert ändern: bewerten, genehmigen, testen, zurückrollen können.' },
    { id: 'b06-q019', kind: 'free', skill: 'itsm.analysis', difficulty: 2, prompt: 'Wende die **5-Why-Methode** auf folgende Störung an: „Frau Schulz kann sich morgens nicht anmelden, ihr Konto ist gesperrt.“ (mindestens 4 Warum-Fragen, plausible Antworten, Maßnahme)', modelAnswer: 'Warum ist das Konto gesperrt? → Es gab zu viele Fehlanmeldungen. Warum? → Ein Gerät versucht sich ständig mit einem alten Passwort anzumelden. Warum? → Auf ihrem Smartphone ist im Mail-Konto noch das alte Passwort gespeichert. Warum? → Sie hat letzte Woche ihr Passwort geändert, das Smartphone aber nicht angepasst. Warum? → Es gibt keine Anleitung/Erinnerung, dass Mobilgeräte nach einer Passwortänderung angepasst werden müssen. Maßnahme: Passwort auf dem Smartphone aktualisieren, Konto entsperren; Kurzanleitung und Hinweis in der Passwortablauf-Mail ergänzen bzw. moderne Anmeldung (Token statt gespeichertem Passwort) einführen.', keywords: ['Warum', 'Fehlanmeldungen', 'Smartphone', 'altes Passwort', 'Maßnahme'], explanation: 'Die Kette muss logisch zusammenhängen und bei einer behebbaren Ursache enden.' },
    { id: 'b06-q020', kind: 'free', skill: 'itsm.analysis', difficulty: 2, prompt: 'Erläutere den Aufbau eines **Ishikawa-Diagramms** und nenne vier Kategorien, die du für die Störung „Arbeitsplatz-PCs sind morgens sehr langsam“ verwenden würdest.', modelAnswer: 'Das Ishikawa-Diagramm (Fischgräten-/Ursache-Wirkungs-Diagramm) stellt die Wirkung (das Problem) an den Kopf; an den Gräten werden mögliche Ursachen nach Kategorien gesammelt, z. B. im Team-Brainstorming. Kategorien: Hardware (HDD statt SSD, zu wenig RAM), Software (Updates/Virenscan beim Start, Autostart-Programme), Netzwerk (Anmeldeskripte, langsamer Fileserver, Gruppenrichtlinien), Mensch (alle melden sich um 8 Uhr gleichzeitig an), Methode/Prozess (Update-Zeitplan, Scan-Zeitpunkt), Umgebung.', keywords: ['Wirkung', 'Kopf', 'Gräten', 'Kategorien', 'Hardware', 'Software', 'Netzwerk'], explanation: 'Aufbau + vier sinnvolle Kategorien.' },
    { id: 'b06-q021', kind: 'number', skill: 'itsm.analysis', difficulty: 2, prompt: `Ticket-Auswertung (250 Tickets): Passwort 95, Drucker 60, E-Mail 45, VPN 25, Hardware 15, Sonstiges 10. Welchen Anteil in % haben die **zwei** häufigsten Kategorien zusammen?`, answer: 62, tolerance: 0.05, unit: '%', misconceptions: [{ answer: '155', error: 'pareto-anzahl-statt-anteil', why: 'Das ist die Anzahl – gefragt ist der Anteil in %.' }], explanation: '(95 + 60) / 250 · 100 % = 155 / 250 · 100 % = **62 %**.' },
    { id: 'b06-q022', kind: 'order', skill: 'itsm.analysis', difficulty: 1, prompt: 'Bringe die DMAIC-Phasen in die richtige Reihenfolge.', items: ['Define – Problem und Ziel definieren', 'Measure – Ist-Zustand messen', 'Analyze – Ursachen analysieren', 'Improve – Verbesserungen umsetzen', 'Control – Ergebnis absichern und überwachen'], explanation: 'D-M-A-I-C.' },
    { id: 'b06-q023', kind: 'single', skill: 'itsm.analysis', difficulty: 2, prompt: 'Was besagt das **Pareto-Prinzip** im Support?', options: ['Ein kleiner Teil der Ursachen erzeugt den Großteil der Tickets (etwa 20/80).', 'Jedes Ticket muss innerhalb von 80 Minuten gelöst werden.', '80 % der Tickets sind Service Requests.', 'Man sollte zuerst die kleinsten Kategorien bearbeiten.'], answer: 0, distractors: { '1': { why: 'Das Pareto-Prinzip ist keine Zeitvorgabe.', error: 'pareto-prinzip' }, '2': { why: 'Es sagt nichts über die Ticketart.', error: 'pareto-prinzip' }, '3': { why: 'Umgekehrt: die größten Kategorien zuerst angehen.', error: 'pareto-prinzip' } }, explanation: 'Wenige Ursachen, große Wirkung → dort ansetzen.' },
    { id: 'b06-q024', kind: 'free', skill: 'itsm.analysis', difficulty: 3, prompt: 'Nach einem fehlgeschlagenen Windows-Update zeigt ein PC den Fehlercode **0x800f0922**. Beschreibe ein systematisches Vorgehen zur Analyse und Lösung.', modelAnswer: 'Fehler reproduzieren und genaue Meldung/Fehlercode notieren; Ereignisanzeige und Update-Protokolle (z. B. C:\\Windows\\Logs\\CBS\\CBS.log, Windows-Update-Verlauf) auswerten; Fehlercode in der Herstellerdokumentation/Wissensdatenbank recherchieren (dieser Code deutet häufig auf zu wenig Platz in der System-/Wiederherstellungspartition oder Verbindungsprobleme hin); typische Ursachen prüfen: freier Speicherplatz, Größe der Wiederherstellungspartition, Netzwerk/Proxy/VPN, Treiberkonflikte; Lösung anwenden (Speicher freigeben, Update-Komponenten zurücksetzen, `sfc /scannow` bzw. `DISM /Online /Cleanup-Image /RestoreHealth`, Update erneut installieren); Ergebnis testen und im Ticket dokumentieren; bei mehreren betroffenen PCs ein Problem-Ticket anlegen.', keywords: ['reproduzieren', 'CBS.log', 'Ereignisanzeige', 'recherchieren', 'Speicherplatz', 'DISM', 'dokumentieren'], explanation: 'Methodisch: Fakten sammeln → recherchieren → Hypothesen prüfen → lösen → dokumentieren. Die Bedeutung eines Fehlercodes immer bei Microsoft nachschlagen.' },
    { id: 'b06-q025', kind: 'order', skill: 'itsm.comm', difficulty: 1, prompt: 'Bringe die Phasen eines Support-Telefonats in eine sinnvolle Reihenfolge.', items: ['Begrüßung mit Firma und Namen', 'Anliegen anhören und notieren', 'Gezielte Fragen stellen', 'Zusammenfassen und Verständnis sichern', 'Lösung bzw. nächste Schritte und Ticketnummer nennen', 'Verabschiedung'], explanation: 'Leitfaden aus der Lektion.' },
    { id: 'b06-q026', kind: 'table', skill: 'itsm.comm', difficulty: 2, prompt: 'Analysiere die Aussage eines Anwenders nach dem **Vier-Ohren-Modell**: „Mein Rechner ist schon wieder so langsam, ich schaffe meine Arbeit nicht!“ Ordne zu, indem du **Sache**, **Selbstkundgabe**, **Beziehung** oder **Appell** einträgst.', columns: [{ key: 'x', label: 'Seite der Nachricht', type: 'text' }], rows: [{ label: '„Der PC arbeitet langsam.“', cells: { x: { answer: 'Sache', accept: ['sachinhalt', 'sachebene'] } } }, { label: '„Ich bin gestresst und unter Druck.“', cells: { x: { answer: 'Selbstkundgabe', accept: ['selbstoffenbarung'] } } }, { label: '„Ihr habt das bisher nicht in den Griff bekommen.“', cells: { x: { answer: 'Beziehung', accept: ['beziehungsebene'] } } }, { label: '„Macht meinen PC endlich schneller!“', cells: { x: { answer: 'Appell' } } }], explanation: 'Jede Nachricht hat vier Seiten (Schulz von Thun).' },
    { id: 'b06-q027', kind: 'free', skill: 'itsm.comm', difficulty: 2, prompt: 'Ein Anrufer gibt sich als neuer Mitarbeiter der Buchhaltung aus und bittet dringend um ein neues Passwort, weil er „gleich eine Überweisung freigeben muss“. Wie reagierst du und warum?', modelAnswer: 'Ich setze das Passwort nicht sofort zurück, sondern prüfe zuerst die Identität nach dem festgelegten Verfahren: z. B. Rückruf an die im Verzeichnis hinterlegte Durchwahl, Bestätigung durch die Vorgesetzte, Abfrage von Merkmalen oder persönliches Erscheinen mit Ausweis. Zeitdruck und Berufung auf Wichtiges sind typische Merkmale von Social Engineering. Das neue Passwort übermittle ich nur auf einem sicheren Weg (nicht per Mail) mit Änderungszwang. Den Vorgang dokumentiere ich im Ticket; bei Verdacht informiere ich die IT-Sicherheit.', keywords: ['Identität prüfen', 'Rückruf', 'Social Engineering', 'Zeitdruck', 'sicherer Weg', 'dokumentieren'], explanation: 'Freundlich bleiben, aber Verfahren einhalten.' },
    { id: 'b06-q028', kind: 'free', skill: 'itsm.comm', difficulty: 2, prompt: 'Formuliere eine kurze, kundengerechte **E-Mail** an Herrn Becker: Sein Ticket 0412 (Outlook startet nicht) wurde an den Exchange-Spezialisten weitergegeben; Rückmeldung bis heute 14 Uhr; als Workaround kann er Outlook im Web nutzen.', modelAnswer: 'Betreff: Ihr Ticket 0412 – Outlook startet nicht. Sehr geehrter Herr Becker, vielen Dank für Ihre Meldung. Wir haben Ihr Anliegen an unseren Spezialisten für das E-Mail-System weitergegeben; Sie erhalten bis heute 14:00 Uhr eine Rückmeldung. Bis dahin können Sie Ihre E-Mails im Browser über Outlook im Web unter https://outlook.office.com mit Ihrem gewohnten Firmenkonto abrufen. Bei Fragen erreichen Sie uns unter der Durchwahl 200. Mit freundlichen Grüßen, Lena Wolf, IT-Service Elektro Krämer GmbH.', keywords: ['Betreff', 'Ticketnummer', 'Anrede', 'Workaround', 'Zeitpunkt', 'Signatur'], explanation: 'Betreff mit Ticketnummer, Stand, nächster Schritt mit Zeit, Workaround, Kontakt – ohne Fachjargon.' },
    { id: 'b06-q029', kind: 'free', skill: 'itsm.sla', difficulty: 2, prompt: 'Erkläre den Unterschied zwischen **Reaktionszeit** und **Lösungszeit** in einem SLA.', modelAnswer: 'Die Reaktionszeit ist die Zeit von der Meldung bis zur ersten qualifizierten Rückmeldung bzw. bis zum Beginn der Bearbeitung durch den Support. Die Lösungszeit (Wiederherstellungszeit) ist die Zeit von der Meldung, bis der Service wieder funktioniert – ggf. über einen Workaround. Beide Zeiten laufen in der Regel nur innerhalb der vereinbarten Servicezeit.', keywords: ['erste Rückmeldung', 'Beginn', 'wiederhergestellt', 'Servicezeit'], explanation: 'Reaktion = Start, Lösung = Ende der Störung.' },
    { id: 'b06-q030', kind: 'number', skill: 'itsm.sla', difficulty: 3, prompt: 'Servicezeit Mo–Fr 07:00–18:00 Uhr. Eine Störung mit **2 Stunden Reaktionszeit** wird am Freitag um **17:15 Uhr** gemeldet. Wie viele **Minuten nach 07:00 Uhr am Montag** endet die Reaktionsfrist?', answer: 75, unit: 'min', hints: ['Am Freitag zählen nur noch 45 min der Servicezeit.'], misconceptions: [{ answer: '0', error: 'sla-servicezeit', why: 'Die Uhr läuft nur in der Servicezeit – am Freitag sind nur 45 von 120 Minuten verstrichen.' }], explanation: 'Freitag 17:15–18:00 = 45 min verbraucht; Rest 120 − 45 = 75 min ab Montag 07:00 → Frist endet **Montag 08:15 Uhr** (75 min nach 7 Uhr).' },
    { id: 'b06-q031', kind: 'multi', skill: 'itsm.sla', difficulty: 2, prompt: 'Welche Inhalte gehören typischerweise in ein SLA?', options: ['Servicezeiten', 'Reaktions- und Lösungszeiten je Priorität', 'Verfügbarkeitsziel', 'Mitwirkungspflichten des Kunden', 'private Handynummern aller Techniker'], answer: [0, 1, 2, 3], explanation: 'Ansprechpartner und Eskalationswege ja – aber keine privaten Daten der Mitarbeitenden.' },
    { id: 'b06-q032', kind: 'match', skill: 'itsm.sla', difficulty: 2, prompt: 'Ordne die Vereinbarung zu.', left: ['SLA', 'OLA', 'UC'], right: ['Vereinbarung zwischen IT-Dienstleister und Kunde', 'Vereinbarung zwischen Teams innerhalb der IT-Organisation', 'Vertrag mit einem externen Zulieferer, der den Service absichert'], answer: [0, 1, 2], explanation: 'SLA extern zum Kunden, OLA intern, UC mit Lieferanten.' },
  ],
};
