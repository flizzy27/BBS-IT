import type { Module } from '../types';

export const b06: Module = {
  id: 'b06',
  nr: 6,
  area: 'systeme',
  title: 'Serviceanfragen & Support',
  short: 'Service Desk und Ticket-Lebenszyklus, Servicearten und IMAC/R/D, Support-Level und Eskalation, RACI, Priorisierung nach Auswirkung × Dringlichkeit, SLA, Verfügbarkeit, MTBF/MTTR und Kennzahlen, Incident/Problem/Change, Problemanalyse (5-Why, Ishikawa, Pareto, Kepner-Tregoe), Wartung und Monitoring sowie Kundenkommunikation mit Deeskalation.',
  icon: 'Headset',
  relevance: 'ap1',
  prerequisites: ['b05'],
  generators: ['sys.prio', 'sys.sla', 'sys.pareto', 'sys.mtbf', 'sys.mttr', 'sys.ping'],
  skills: [
    { id: 'itsm.service', module: 'b06', title: 'IT-Services, Service Desk und Ticket-Lebenszyklus' },
    { id: 'itsm.levels', module: 'b06', title: 'Support-Level, Eskalation und RACI', requires: ['itsm.service'] },
    { id: 'itsm.priority', module: 'b06', title: 'Störungen priorisieren (Auswirkung × Dringlichkeit)', requires: ['itsm.service'] },
    { id: 'itsm.sla', module: 'b06', title: 'SLA: Reaktionszeit, Lösungszeit, Verfügbarkeit berechnen', requires: ['itsm.priority'] },
    { id: 'itsm.itil', module: 'b06', title: 'Incident, Problem, Change, Service Request', requires: ['itsm.service'] },
    { id: 'itsm.analysis', module: 'b06', title: 'Problemanalyse: 5-Why, Ishikawa, Pareto, DMAIC', requires: ['itsm.itil'] },
    { id: 'itsm.comm', module: 'b06', title: 'Kundenkommunikation am Telefon und per E-Mail' },
    { id: 'itsm.imac', module: 'b06', title: 'Servicearten und IMAC/R/D-Lebenszyklus', requires: ['itsm.service'] },
    { id: 'itsm.maintenance', module: 'b06', title: 'Wartungsarten und Wartungsplan', requires: ['itsm.service'] },
    { id: 'itsm.monitor', module: 'b06', title: 'Monitoring: Kennzahlen, ping-Ausgaben und Logs auswerten', requires: ['itsm.maintenance'] },
  ],
  lessons: [
    /* ------------------------------------------------------------ */
    {
      id: 'b06-l01',
      title: 'IT-Services, Service Desk und Ticket-Lebenszyklus',
      minutes: 25,
      relevance: 'ap1',
      skills: ['itsm.service'],
      simple: `Stell dir den Service Desk wie die Rezeption eines Hotels vor: Egal ob das Licht kaputt ist oder du ein Handtuch brauchst – du gehst immer zur selben Stelle. Diese eine Anlaufstelle heißt SPOC (Single Point of Contact). Dort wird jede Anfrage als Ticket (ein digitaler Auftragszettel) aufgeschrieben, damit nichts verloren geht. Das Ticket wandert durch feste Stationen: erfasst, eingestuft, zugewiesen, in Bearbeitung, gelöst, geschlossen. „Gelöst“ heißt: Die IT hat etwas repariert; „geschlossen“ heißt: Der Kunde hat bestätigt, dass es wieder geht.

**Merke:** Eine Anlaufstelle für alles – jede Anfrage wird ein Ticket, das erst nach Bestätigung des Kunden geschlossen wird.`,
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
      id: 'b06-l08',
      title: 'Servicearten und der IMAC/R/D-Lebenszyklus',
      minutes: 25,
      relevance: 'ap1',
      skills: ['itsm.imac'],
      simple: `Ein Arbeitsplatz-PC hat ein Leben wie ein Auto: Er wird angeschafft, aufgebaut, benutzt, mal umgezogen, aufgerüstet und am Ende verschrottet. Für jede dieser Stationen gibt es einen Buchstaben: **I**nstall (aufbauen), **M**ove (umziehen), **A**dd (etwas dazu), **C**hange (etwas ändern), **R**emove (abbauen) und **D**ispose (entsorgen). Wie die Hilfe ankommt, beschreibt die Serviceart: Ein Techniker kommt vorbei (vor Ort), hilft über das Netz (remote) oder bringt einfach ein Ersatzgerät (Swap). Beim Break/Fix-Modell rufst du erst an, wenn etwas kaputt ist, und zahlst nach Aufwand – wie bei einer Autowerkstatt ohne Inspektionsvertrag.

**Merke:** IMAC/R/D = Install, Move, Add, Change, Remove, Dispose – und bei Remove/Dispose immer an Datenlöschung, Lizenzen und Inventar denken.`,
      steps: [
        {
          type: 'explain',
          title: 'Wie kommt der Service zum Kunden? – Servicearten',
          body: `Ein IT-Systemhaus bietet seine Hilfe auf unterschiedliche Arten an. Man kann sie nach **Ort** und nach **Vertragsmodell** einteilen:

| Serviceart | Was passiert? | Typischer Einsatz |
|---|---|---|
| **Vor-Ort-Service** | Ein Techniker fährt zum Kunden. | Server startet nicht, Verkabelung prüfen |
| **Bring-in-Service** | Der Kunde bringt das Gerät in die Werkstatt. | Notebook mit gebrochenem Scharnier |
| **Remote-Service** (Fernwartung) | Hilfe über eine verschlüsselte Verbindung, ohne Anfahrt. | Softwarefehler, Einstellungen ändern |
| **Swap-Service** (Austauschservice) | Das defekte Gerät wird sofort gegen ein Ersatzgerät **getauscht**, repariert wird später. | Drucker, Notebook aus einem Gerätepool |
| **DIY** (Do it yourself) | Der Kunde tauscht ein einfaches Teil **selbst** (z. B. Akku, Netzteil, Tastatur) nach Anleitung – ohne dass die Garantie verfällt. | Ersatzteil wird zugeschickt |
| **Self-Service** | Der Anwender hilft sich selbst über Portal oder FAQ. | Passwort zurücksetzen |

| Vertragsmodell | Bedeutung |
|---|---|
| **Break/Fix** (auf Abruf) | Hilfe erst, wenn etwas **kaputt** ist („break“) – dann wird repariert („fix“). Abgerechnet wird **nach Aufwand** (Arbeitszeit, Anfahrt, Material). Kein Vertrag, aber auch keine zugesagte Reaktionszeit. |
| **Wartungs-/Servicevertrag** | feste Leistungen (z. B. Inspektion, Hotline, Reaktionszeit) gegen Pauschale, oft mit Stundenkontingent |
| **Managed Service** | Der Dienstleister **betreibt und überwacht** ein System **dauerhaft** (z. B. Managed Backup, Managed Firewall). Leistungen und Kennzahlen stehen vorab im SLA. |

**Servicezeit:** „24/7“ heißt 24 Stunden an 7 Tagen, „12/5“ heißt 12 Stunden an 5 Werktagen.

**Garantie, Gewährleistung, Kulanz** – drei Begriffe, die Kunden oft verwechseln:

| Begriff | Wer? | Grundlage |
|---|---|---|
| **Gewährleistung** (Mängelhaftung) | der **Verkäufer** | **Gesetz** (§§ 434 ff. BGB): Die Ware muss bei Übergabe mangelfrei sein; Frist bei neuen Sachen 2 Jahre (§ 438 BGB) |
| **Garantie** | meist der **Hersteller** (oder Händler) | **freiwilliges Versprechen** (§ 443 BGB), Umfang und Dauer laut Garantieerklärung |
| **Kulanz** | Händler oder Hersteller | **freiwillig ohne Rechtspflicht**, z. B. aus Kundenfreundlichkeit |`,
        },
        {
          type: 'explain',
          title: 'IMAC/R/D – der Lebenszyklus eines Arbeitsplatzes',
          body: `Fast jede Serviceanfrage rund um einen Arbeitsplatz passt in eines von sechs Feldern. Die Abkürzung **IMAC** stammt aus dem Englischen; später kamen **R** und **D** dazu. Deshalb liest du auch **IMACD** oder **IMAC/R/D**.

| Buchstabe | Englisch | Bedeutung | Beispiel | Daran denken |
|---|---|---|---|---|
| **I** | Install | neuen Arbeitsplatz oder neues Gerät **aufbauen** und in Betrieb nehmen | neue Mitarbeiterin bekommt PC, Monitor, Telefon | Image/Installation, Benutzerkonto, Software, Inventar, Übergabeprotokoll |
| **M** | Move | Arbeitsplatz **umziehen** (anderer Raum, anderes Gebäude) | Vertrieb zieht vom 1. ins 2. OG | Daten sichern, abbauen, transportieren, Netzwerkdose/VLAN und Drucker anpassen, testen, Standort im Inventar ändern |
| **A** | Add | etwas **hinzufügen** | zweiter Monitor, zusätzliche Software, Dockingstation | Lizenz vorhanden? Treiber, Kompatibilität |
| **C** | Change | etwas am Arbeitsplatz **ändern** | RAM-Aufrüstung, Rechte ändern, Windows-Upgrade | vorher sichern, Änderung dokumentieren |
| **R** | Remove | Arbeitsplatz oder Gerät **abbauen** | Mitarbeiter scheidet aus | Konto sperren, Daten übergeben, **Lizenzen freigeben**, Gerät zurück ins Lager |
| **D** | Dispose | Gerät **entsorgen** | Alt-PC nach 5 Jahren | Datenträger **sicher löschen oder vernichten** (mit Nachweis, z. B. nach DIN 66399), aus dem Inventar austragen, Elektroschrott fachgerecht nach ElektroG |

**Einordnung:** IMAC/R/D-Aufgaben sind meist **geplant** – sie kommen als **Service Request** oder **Standard-Change** ins Ticketsystem, nicht als Störung (Incident). „Change“ im IMAC-Sinn meint die Änderung **am Arbeitsplatz**; das ITIL-Change-Management (Lektion „Incident, Problem, Change“) ist der Prozess, der größere Änderungen kontrolliert.

**Lebenszyklus im Überblick:** Beschaffung → Bereitstellung (Install) → Betrieb mit Support und Wartung (Move, Add, Change) → Aussonderung (Remove) → Entsorgung (Dispose).`,
        },
        {
          type: 'visual',
          title: 'Sechs Stationen eines Arbeitsplatzes',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'I – Install', text: 'Aufbauen, installieren, Konto anlegen, übergeben.', icon: 'PackagePlus' },
                { title: 'M – Move', text: 'Umziehen: sichern, abbauen, neu anschließen, testen.', icon: 'Truck' },
                { title: 'A – Add', text: 'Etwas hinzufügen: Monitor, Software, Zubehör.', icon: 'Plus' },
                { title: 'C – Change', text: 'Etwas ändern: Aufrüsten, Rechte, Upgrade.', icon: 'Settings' },
                { title: 'R – Remove', text: 'Abbauen: Konto sperren, Lizenzen freigeben.', icon: 'Minus' },
                { title: 'D – Dispose', text: 'Entsorgen: Daten sicher löschen, Nachweis, Recycling.', icon: 'Trash2' },
              ],
            },
          },
          caption: 'Wer eine Anfrage einer Station zuordnet, weiß sofort, welche Checkliste gilt.',
        },
        {
          type: 'example',
          title: 'Move: Ein Arbeitsplatz zieht um',
          problem: 'Frau Aksoy (Einkauf) wechselt am Standort Hamburg vom Raum 1.12 in den Raum 2.04. Ihr PC, zwei Monitore und das IP-Telefon sollen mit. Welche Schritte planst du?',
          steps: [
            { label: '1. Vorbereiten', body: 'Termin mit Frau Aksoy abstimmen. Prüfen: Ist im Raum 2.04 eine freie, gepatchte Netzwerkdose vorhanden? Liegt sie im richtigen VLAN (Daten und Sprache)? Welcher Drucker steht dort?' },
            { label: '2. Sichern', body: 'Lokale Daten prüfen und sichern (die meisten Daten liegen ohnehin auf dem Server).' },
            { label: '3. Abbauen und transportieren', body: 'Geräte herunterfahren, Kabel beschriften, sicher transportieren.' },
            { label: '4. Aufbauen und anpassen', body: 'Anschließen, Netzwerkverbindung und Telefon testen, Standarddrucker auf den Drucker im 2. OG umstellen.' },
            { label: '5. Testen und übergeben', body: 'Anmeldung, Netzlaufwerke, E-Mail, Telefon gemeinsam mit Frau Aksoy prüfen.' },
            { label: '6. Dokumentieren', body: 'Inventar/CMDB (neuer Raum, neuer Switchport), Telefonliste und Ticket aktualisieren, Ticket nach Bestätigung schließen.' },
          ],
          result: 'Ein Move ist mehr als „Kabel umstecken“: Netzwerkanschluss, Drucker, Telefon und Dokumentation müssen mitziehen.',
        },
        {
          type: 'check',
          question: {
            id: 'b06-c09', kind: 'match', skill: 'itsm.imac', difficulty: 1,
            prompt: 'Ordne jeder Anfrage die passende IMAC/R/D-Phase zu.',
            left: ['Neuer Azubi bekommt einen Arbeitsplatz', 'Buchhaltung zieht in ein anderes Gebäude', 'Zusätzlicher Monitor für den Vertrieb', 'Arbeitsspeicher eines PCs wird von 8 auf 16 GB aufgerüstet', 'Arbeitsplatz eines ausgeschiedenen Mitarbeiters abbauen', 'Alte Notebooks verschrotten'],
            right: ['Install', 'Move', 'Add', 'Change', 'Remove', 'Dispose'],
            answer: [0, 1, 2, 3, 4, 5],
            explanation: 'I = aufbauen, M = umziehen, A = hinzufügen, C = ändern, R = abbauen, D = entsorgen.',
          },
        },
        { type: 'practice', title: 'Übung: Servicearten und IMAC/R/D', questionIds: ['b06-q033', 'b06-q034', 'b06-q035', 'b06-q036', 'b06-q037'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Servicearten nach Ort: vor Ort, Bring-in, Remote, Swap (Austausch), DIY, Self-Service.', 'Break/Fix = Hilfe erst bei Defekt, Abrechnung nach Aufwand; Managed Service = dauerhafter Betrieb gegen Pauschale mit SLA.', 'Gewährleistung = gesetzlich (Verkäufer), Garantie = freiwilliges Versprechen, Kulanz = freiwillig ohne Pflicht.', 'IMAC/R/D: Install, Move, Add, Change, Remove, Dispose.', 'Remove/Dispose: Konto sperren, Lizenzen freigeben, Daten sicher löschen mit Nachweis, Inventar pflegen.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b06-l02',
      title: 'Support-Level, Eskalation und RACI',
      minutes: 25,
      relevance: 'ap1',
      skills: ['itsm.levels'],
      simple: `Support-Level funktionieren wie im Krankenhaus: Zuerst kommst du zur Aufnahme (1st Level), die einfache Dinge sofort erledigt. Ist es komplizierter, geht es zum Facharzt (2nd Level), bei sehr seltenen Fällen zum Spezialisten beim Hersteller (3rd Level). Gibst du ein Ticket an jemanden mit mehr Fachwissen weiter, heißt das funktionale Eskalation; schaltest du die Chefin ein, weil eine Frist zu platzen droht, heißt das hierarchische Eskalation. Die RACI-Matrix klärt, wer eine Aufgabe ausführt (R), wer dafür geradesteht (A), wer gefragt (C) und wer informiert wird (I).

**Merke:** Funktional = mehr Fachwissen, hierarchisch = mehr Entscheidungsbefugnis; pro Aufgabe genau ein A.`,
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

Regeln: pro Aufgabe **genau ein A** und **mindestens ein R**. A und R dürfen dieselbe Rolle sein (geschrieben „R/A“); manche Schulbücher empfehlen, das möglichst zu vermeiden. In der Prüfung gilt, was die Aufgabe vorgibt.`,
        },
        {
          type: 'explain',
          title: 'Eskalationsstufen im SLA – nach der Uhr',
          body: `Viele Serviceverträge legen fest, **nach welcher Zeit** ohne Lösung automatisch eskaliert wird. Das ist eine **hierarchische** Eskalation: Je länger eine Störung dauert, desto höher wird sie in der Organisation „gemeldet“. Ein typischer Vertragsauszug (Beispielwerte, Zeiten ab Meldung, nur innerhalb der Servicezeit Mo–Fr 08:00–17:00 Uhr):

| Schweregrad | Beschreibung | Reaktionszeit | Eskalationsstufe 1 (Teamleitung Support) | Eskalationsstufe 2 (Leitung IT-Service + Kunde informieren) |
|---|---|---|---|---|
| **1 – kritisch** | Kerndienst für viele Anwender ausgefallen | 30 min | nach 1 h ohne Lösung | nach 2 h ohne Lösung |
| **2 – hoch** | Dienst für eine Abteilung gestört | 2 h | nach 4 h | nach 8 h |
| **3 – normal** | Einzelarbeitsplatz, Workaround vorhanden | 4 h | nach 8 h | nach 16 h |

**So liest du die Tabelle:**
1. Schweregrad des Tickets bestimmen (aus Auswirkung und Dringlichkeit).
2. Vergangene Zeit seit der Meldung ausrechnen (nur Servicezeit zählt).
3. Mit den Schwellen vergleichen: Ist die Zeit **erreicht oder überschritten**, gilt die Stufe.

**Beispiel:** Ticket mit Schweregrad 2, gemeldet um 08:30 Uhr, um 13:00 Uhr noch offen → 4 h 30 min vergangen → Schwelle Stufe 1 (4 h) erreicht, Stufe 2 (8 h) noch nicht → **Eskalationsstufe 1**: Die Teamleitung muss informiert sein.`,
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
        { type: 'practice', title: 'Übung: Level, Eskalation, RACI', questionIds: ['b06-q005', 'b06-q006', 'b06-q007', 'b06-q008', 'b06-q009', 'b06-q045'], count: 6, difficulty: 2 },
        { type: 'summary', points: ['1st Level: annehmen, erfassen, Standardlösungen; 2nd: Spezialisten; 3rd: Hersteller/Entwickler.', 'Funktionale Eskalation = an mehr Fachwissen; hierarchische = an Vorgesetzte.', 'Eskalationsstufen im SLA: nach festen Zeiten ohne Lösung wird die nächste Ebene eingeschaltet.', 'Erstlösungsquote möglichst hoch.', 'RACI: Responsible, Accountable (genau einer), Consulted, Informed.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b06-l03',
      title: 'Priorisierung: Auswirkung × Dringlichkeit',
      minutes: 20,
      relevance: 'ap1',
      skills: ['itsm.priority'],
      simple: `Priorisieren ist wie in der Notaufnahme: Nicht wer zuerst oder am lautesten kommt, wird zuerst behandelt, sondern wer es am nötigsten hat. Dafür schaust du auf zwei Dinge: die Auswirkung (Wie viele Personen oder wie wichtige Dienste sind betroffen?) und die Dringlichkeit (Wie schnell muss es gehen, gibt es eine Umgehungslösung?). Beides suchst du in einer Tabelle (Prioritätsmatrix) und liest die Priorität im Kreuzungsfeld ab. Zu jeder Priorität legt der Vertrag fest, wie schnell reagiert und gelöst werden muss.

**Merke:** Priorität = Auswirkung × Dringlichkeit laut Matrix; ein Workaround senkt die Dringlichkeit, nicht die Auswirkung.`,
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

**So liest du die Matrix:** Suche die **Zeile** der Auswirkung und die **Spalte** der Dringlichkeit. Im Kreuzungsfeld steht die Priorität. Beispiel: Auswirkung *mittel*, Dringlichkeit *hoch* → Zeile „mittel“, Spalte „hoch“ → **Priorität 2**.

**Typische Fehler:** Die Geschäftsführerin ruft an → automatisch Priorität 1? Nein – entscheidend sind Auswirkung und Dringlichkeit (viele Unternehmen sehen allerdings für VIPs eine erhöhte Dringlichkeit vor; das muss dann **im SLA geregelt** sein). Ein Workaround (Umgehungslösung, mit der man vorerst weiterarbeiten kann) senkt die Dringlichkeit, nicht die Auswirkung.

**Achtung bei Belegen:** Die Matrix und die Zeiten sind **Beispielwerte**. Manche Verträge haben 4 statt 5 Stufen, manche Schulbücher setzen die Priorität sogar nur aus der Dringlichkeit fest. In der Prüfung rechnest du immer mit der Tabelle aus der Aufgabe.`,
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
        { type: 'practice', title: 'Übung: Ticket aus einer Meldung ausfüllen', questionIds: ['b06-q010', 'b06-q011', 'b06-q046'], count: 3, difficulty: 2 },
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
      simple: `Ein SLA (Service Level Agreement) ist wie das Versprechen eines Lieferdienstes: „In 30 Minuten bei dir, sonst gibt es Rabatt.“ Es legt messbar fest, wann der Service erreichbar ist (Servicezeit), wie schnell sich jemand meldet (Reaktionszeit), bis wann das Problem gelöst ist (Lösungszeit) und wie viel Prozent der Zeit der Dienst laufen muss (Verfügbarkeit). Aus der Verfügbarkeit rechnest du die erlaubte Ausfallzeit: Bei 99,9 % im Monat (43.200 Minuten) sind 0,1 % erlaubt, also 43,2 Minuten. Die Uhr läuft dabei nur innerhalb der vereinbarten Servicezeit.

**Merke:** Erlaubter Ausfall = Zeitraum · (100 % − Verfügbarkeit); MTTR = Gesamtausfall / Anzahl Ausfälle.`,
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

**Verfügbarkeit aus MTBF und MTTR:** MTBF (Mean Time Between Failures, mittlere Betriebszeit zwischen Ausfällen) und MTTR (Mean Time To Repair, mittlere Reparaturzeit): Verfügbarkeit = MTBF / (MTBF + MTTR). Mehr dazu im nächsten Abschnitt.`,
        },
        {
          type: 'explain',
          title: 'MTBF und MTTR bei mehreren Ausfällen, MTTR-Soll/Ist und Service-Kennzahlen',
          body: `**MTBF und MTTR sind Mittelwerte.** Fällt ein System im Betrachtungszeitraum **k-mal** aus, gilt:

| Kennzahl | Formel | Bedeutung |
|---|---|---|
| Gesamtausfall | Summe aller Ausfallzeiten | wie lange war der Dienst insgesamt weg? |
| **MTTR** | Gesamtausfall / k | wie lange dauert ein Ausfall **im Mittel**? |
| **MTBF** | (Gesamtzeit − Gesamtausfall) / k | wie lange läuft das System **im Mittel** zwischen zwei Ausfällen? |
| **Verfügbarkeit** | MTBF / (MTBF + MTTR) · 100 % | ergibt dasselbe wie (Gesamtzeit − Ausfall) / Gesamtzeit · 100 % |

**Beispiel:** Ein Server läuft ein Jahr (8.760 h) und fällt **4-mal** aus, insgesamt **6 h**.
1. MTTR = 6 h / 4 = **1,5 h** (= 90 min).
2. MTBF = (8.760 h − 6 h) / 4 = 8.754 h / 4 = **2.188,5 h**.
3. Verfügbarkeit = 2.188,5 / (2.188,5 + 1,5) = 2.188,5 / 2.190 = 0,99932 → **99,93 %**.
   Probe: (8.760 − 6) / 8.760 = 0,99932 ✔ – die Zahl der Ausfälle kürzt sich heraus.

**Häufiger Fehler:** MTBF = 8.760 h / 4 = 2.190 h. Die Ausfallzeit gehört aber **nicht** zur Betriebszeit und muss vorher abgezogen werden.

**Was zählt zur MTTR?** Je nach Vertrag nur die Reparatur – oder (häufiger in Schulbüchern) **alle Phasen** von der Störung bis zur Wiederherstellung: **Erkennen → Reagieren → Beheben → Testen/Wiederherstellen**. Lies in der Aufgabe genau nach, welche Zeiten gemeint sind.

**MTTR-Soll/Ist-Vergleich:** Die Vorgabe (Soll) steht im SLA. Die Abweichung in Prozent bezieht sich immer auf die **Vorgabe**:

**Abweichung in % = (Ist − Soll) / Soll · 100 %**

Beispiel: Soll 60 min; Ist = 10 + 15 + 45 + 10 = 80 min → (80 − 60) / 60 · 100 % = **+33,3 %** (Vorgabe um ein Drittel überschritten).

**Weitere Kennzahlen (KPI, Key Performance Indicator = Schlüsselkennzahl) im Service:**

| KPI | Berechnung | Beispiel |
|---|---|---|
| Erstlösungsquote | im ersten Kontakt gelöste Tickets / alle Tickets | 416 / 640 = 65 % |
| SLA-Erfüllungsquote | Tickets innerhalb der Frist / alle Tickets | 380 / 400 = 95 % |
| Wiedereröffnungsquote | wiedereröffnete / gelöste Tickets | niedrig = gut |
| Veränderung zum Vorjahr | (dieses Jahr − Vorjahr) / Vorjahr · 100 % | 720 → 810 Tickets: +12,5 % |

**Achtung bei Noten:** Wird die Kundenzufriedenheit als Schulnote gemessen, ist eine **kleinere** Zahl **besser**. Sinkt die Note von 2,8 auf 2,4, ist die Veränderung (2,4 − 2,8) / 2,8 = −14,3 % – das ist eine **Verbesserung**.`,
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
        { type: 'practice', title: 'Übung: MTBF und MTTR bei mehreren Ausfällen', generator: 'sys.mtbf', count: 4, difficulty: 2 },
        { type: 'practice', title: 'Übung: MTTR-Soll/Ist-Abweichung', generator: 'sys.mttr', count: 3, difficulty: 2 },
        { type: 'practice', title: 'Übung: Service-Kennzahlen', questionIds: ['b06-q013', 'b06-q047', 'b06-q048', 'b06-q049', 'b06-q050', 'b06-q051'], count: 6, difficulty: 2 },
        { type: 'summary', points: ['SLA: messbare Vereinbarung (Servicezeit, Reaktions-, Lösungszeit, Verfügbarkeit, Eskalation, Mitwirkungspflichten).', 'OLA = intern, UC = mit externem Zulieferer.', 'Ausfall erlaubt = Zeitraum · (100 % − Verfügbarkeit); Bezugszeitraum immer nennen.', 'Jahr = 525.600 min, Monat (30 d) = 43.200 min.', 'Uhr läuft nur in der Servicezeit.', 'MTTR = Gesamtausfall / k; MTBF = (Gesamtzeit − Gesamtausfall) / k.', 'Prozentabweichung immer auf die Vorgabe (Soll) beziehen.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b06-l05',
      title: 'Incident, Problem, Change, Service Request',
      minutes: 25,
      relevance: 'ap1',
      skills: ['itsm.itil'],
      simple: `Stell dir eine Autowerkstatt vor: Ein Incident ist die Panne – das Auto muss schnell wieder fahren, notfalls mit Notrad (Workaround). Ein Problem ist die Frage, warum bei diesem Modell immer wieder der Reifen platzt – also die Suche nach der Ursache. Ein Change ist die geplante Umrüstung auf bessere Reifen, vorher geprüft und genehmigt. Ein Service Request ist ein normaler Kundenwunsch, bei dem nichts kaputt ist, etwa ein neues Passwort oder zusätzliche Software.

**Merke:** Incident = schnell wiederherstellen, Problem = Ursache dauerhaft beseitigen, Change = kontrolliert ändern, Service Request = Standardanfrage.`,
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

**Andere Einteilung im Schulbuch:** Manche Bücher unterscheiden neben dem Standard-Change **Level-1-, Level-2- und Level-3-Changes** nach der Größe der Auswirkung (Level 1 = geringe, Level 3 = große Auswirkung, entsprechend höhere Genehmigungsstufe). Das ist nur ein anderes Raster – entscheidend bleibt: Je größer Risiko und Auswirkung, desto gründlicher werden Change-Anträge (RFC, Request for Change) bewertet und genehmigt.

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
      simple: `Ursachenanalyse ist Detektivarbeit: Statt nur den Schaden zu beheben, suchst du den „Täter“, damit es nicht wieder passiert. Bei 5-Why fragst du immer wieder „Warum?“, bis du bei der eigentlichen Ursache bist. Das Ishikawa-Diagramm sieht aus wie eine Fischgräte und sammelt mögliche Ursachen nach Bereichen (Mensch, Hardware, Software …). Die Pareto-Analyse zeigt, dass wenige Ursachen die meisten Tickets erzeugen (etwa 20 % → 80 %). Kepner-Tregoe vergleicht, wo der Fehler auftritt und wo nicht – der Unterschied verrät die Ursache.

**Merke:** 5-Why = Kette in die Tiefe, Ishikawa = Ursachen nach Kategorien, Pareto = Häufigstes zuerst, Kepner-Tregoe = Ist und Ist nicht vergleichen.`,
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
          type: 'explain',
          title: 'Ist / Ist-nicht-Analyse (Kepner-Tregoe)',
          body: `Die Methode nach **Kepner und Tregoe** passt gut, wenn ein Fehler **manche** Geräte oder Nutzer trifft und **andere nicht**. Du vergleichst gezielt: Wo tritt der Fehler auf – und wo **nicht**, obwohl er dort auch auftreten **könnte**? Der **Unterschied** zwischen beiden Gruppen führt zur Ursache.

| Dimension | Leitfrage | **Ist** (betroffen) | **Ist nicht** (nicht betroffen, aber vergleichbar) |
|---|---|---|---|
| **Was?** | Welches Gerät, welcher Fehler? | Was genau ist gestört? | Was funktioniert, obwohl es ähnlich ist? |
| **Wo?** | An welchem Ort, an welchem System? | Wo tritt es auf? | Wo tritt es nicht auf? |
| **Wann?** | Seit wann, wie oft, in welcher Situation? | Wann tritt es auf? | Wann nicht? |
| **Ausmaß** | Wie viele, wie stark, Tendenz? | Wie viele sind betroffen? | Wie viele nicht? |

**Vorgehen:**
1. Problem genau beschreiben und die Tabelle **Ist / Ist nicht** ausfüllen.
2. **Unterschiede** und **Veränderungen** suchen: Was ist bei den betroffenen Geräten anders oder neu?
3. Daraus **mögliche Ursachen** ableiten.
4. Jede Ursache gegen die Tabelle prüfen: Erklärt sie **alle** Ist- **und** Ist-nicht-Angaben?
5. Die wahrscheinlichste Ursache **testen** (z. B. an einem Gerät rückgängig machen), erst dann breit beheben.

**Vergleich der Methoden:** 5-Why geht einer Kette in die Tiefe, Ishikawa sammelt Ursachen in die Breite, Pareto zeigt, **welches** Problem sich am meisten lohnt, und Kepner-Tregoe grenzt durch Vergleich ein, **wo** die Ursache liegen muss.`,
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
          type: 'example',
          title: 'Ist / Ist nicht: Outlook stürzt ab',
          problem: 'Seit Dienstag stürzt Outlook bei mehreren Anwendern ab. Du sammelst Fakten: Betroffen sind 14 Notebooks im Vertrieb, immer beim Öffnen von PDF-Anhängen. Die Desktop-PCs der Buchhaltung haben dieselbe Outlook-Version und laufen stabil. Word-Anhänge lassen sich überall öffnen. Am Dienstag hat die Softwareverteilung einer Pilotgruppe (= Vertriebs-Notebooks) ein Update des PDF-Readers eingespielt.',
          steps: [
            { label: 'Was?', body: '**Ist:** Outlook-Absturz beim Öffnen von PDF-Anhängen. **Ist nicht:** Word-Anhänge, Outlook ohne Anhänge.' },
            { label: 'Wo?', body: '**Ist:** 14 Notebooks im Vertrieb. **Ist nicht:** Desktop-PCs der Buchhaltung (gleiche Outlook-Version).' },
            { label: 'Wann?', body: '**Ist:** seit Dienstag, bei jedem PDF-Anhang. **Ist nicht:** vor Dienstag.' },
            { label: 'Ausmaß', body: '**Ist:** alle 14 Vertriebs-Notebooks. **Ist nicht:** übrige rund 100 Geräte.' },
            { label: 'Unterschied / Veränderung', body: 'Nur die Vertriebs-Notebooks haben am Dienstag das neue PDF-Reader-Update erhalten (Pilotgruppe).' },
            { label: 'Prüfen und testen', body: 'Die Ursache „PDF-Reader-Update“ erklärt alle Angaben (nur PDF, nur Pilotgruppe, erst seit Dienstag). Test: auf einem Notebook das Update zurücknehmen → Absturz weg → Change für alle 14 Geräte, Update für die übrigen Geräte stoppen.' },
          ],
          result: 'Der Vergleich „betroffen / nicht betroffen“ führt schnell zur Veränderung, die den Fehler erklärt: dem PDF-Reader-Update der Pilotgruppe.',
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
        { type: 'practice', title: 'Übung: Analysemethoden anwenden', questionIds: ['b06-q019', 'b06-q020', 'b06-q052', 'b06-q053', 'b06-q054'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['5-Why: Ursachenkette durch wiederholtes Fragen.', 'Ishikawa: Ursachen nach Kategorien (6 M bzw. IT-Kategorien) sammeln.', 'Pareto: sortieren, kumulieren, die ca. 80 % verursachenden Kategorien angehen.', 'DMAIC: Define, Measure, Analyze, Improve, Control.', 'Kepner-Tregoe: Ist / Ist nicht nach Was, Wo, Wann, Ausmaß – der Unterschied führt zur Ursache.', 'Logdateien, Fehlercodes und Monitoring liefern die Fakten.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b06-l09',
      title: 'Wartung und Monitoring: vorbeugen statt reparieren',
      minutes: 30,
      relevance: 'ap1',
      skills: ['itsm.maintenance', 'itsm.monitor'],
      simple: `Beim Auto wartest du auch nicht, bis der Motor kaputt ist: Es gibt feste Inspektionen, und Warnlampen melden Probleme früh. Genauso in der IT. **Reaktiv** heißt: erst reparieren, wenn etwas ausgefallen ist. **Periodisch** heißt: nach festem Plan warten, etwa jeden Monat Updates einspielen. **Präventiv** heißt: Messwerte beobachten und eingreifen, bevor etwas ausfällt. **Prädiktiv** heißt: aus dem Verlauf der Messwerte vorhersagen, wann es kritisch wird. Das Beobachten heißt Monitoring: Ein Programm prüft ständig, ob Geräte antworten (ping), wie lange die Antwort braucht (RTT, Round-Trip-Time) und wie viele Pakete verloren gehen.

**Merke:** Paketverlust in % = verlorene Pakete / gesendete Pakete · 100 – und in Logdateien zeigt der Schweregrad (Kritisch, Fehler, Warnung, Information), wie eilig etwas ist.`,
      steps: [
        {
          type: 'explain',
          title: 'Vier Wartungsarten und der Wartungsplan',
          body: `**Wartung** (genauer: Instandhaltung) soll Systeme betriebsbereit halten. Schulbücher unterscheiden meist vier Stufen – von „warten, bis es knallt“ bis „vorhersagen, wann es knallt“:

| Wartungsart | Auslöser | Beispiel | Vorteil | Nachteil |
|---|---|---|---|---|
| **reaktiv** (auch korrektiv) | erst **nach** dem Ausfall | Netzteil tauschen, nachdem der Server ausgegangen ist | kein Planungsaufwand | ungeplanter Ausfall, Stress, oft teurer |
| **periodisch** (zeitgesteuert) | fester **Zeitplan** | Patches monatlich, Lüfter halbjährlich reinigen, USV-Batterien nach Herstellerintervall tauschen | gut planbar | Teile werden evtl. zu früh getauscht |
| **präventiv** (zustandsorientiert) | **Messwerte** aus dem Monitoring | Festplatte meldet SMART-Warnung (Selbstdiagnose) → tauschen, bevor sie ausfällt; Alarm bei 85 % Speicherbelegung | Ausfälle werden verhindert | Monitoring muss eingerichtet und beobachtet werden |
| **prädiktiv** (vorausschauend) | **Prognose** aus dem Verlauf vieler Messwerte (Statistik, KI) | „Laut Trend ist das Datenlaufwerk in 3 Wochen voll“ | bester Zeitpunkt für Maßnahmen | braucht viele Daten und passende Werkzeuge |

Hinweis zu den Begriffen: Fachlich ist „präventiv“ (vorbeugend) eigentlich der **Oberbegriff** für alles, was vor einem Ausfall geschieht – zeitgesteuert, zustandsorientiert und vorausschauend. Im Unterricht wird aber meist die Vier-Stufen-Einteilung oben verwendet.

**Wartungsplan:** Periodische Aufgaben schreibt man in einen Plan – mit Aufgabe, Intervall, Verantwortlichem und Nachweis (Wer hat wann was erledigt?).

| Aufgabe | Intervall | Nachweis |
|---|---|---|
| Datensicherung auf Erfolg prüfen | täglich | Backup-Bericht abgehakt |
| Ereignisprotokolle und Monitoring-Warnungen sichten | wöchentlich | Ticket bei Auffälligkeiten |
| Sicherheitsupdates (Patchday) einspielen | monatlich | Patch-Bericht |
| Festplatten-/RAID-Status, Virenschutz, Firewall-Updates prüfen | monatlich | Checkliste |
| USV-Selbsttest | monatlich; Batterietausch nach Herstellerangabe | Testprotokoll |
| Wiederherstellung testen (Restore-Test) | vierteljährlich | Restore-Protokoll |
| Lüfter und Filter reinigen | halbjährlich | Wartungsbuch |`,
        },
        {
          type: 'explain',
          title: 'Monitoring: Kennzahlen, ping-Ausgaben und Logdateien lesen',
          body: `**Monitoring** heißt: Systeme werden **automatisch und ständig** überwacht. Überschreitet ein Messwert einen **Schwellwert**, gibt es eine Warnung oder einen Alarm (Mail, SMS, Ticket).

**Wichtige Kennzahlen:**

| Kennzahl | Bedeutung | Einheit | gut ist … |
|---|---|---|---|
| Erreichbarkeit | Antwortet das Gerät, läuft der Dienst? | ja/nein | erreichbar |
| **Latenz / RTT** (Round-Trip-Time) | Zeit für Hin- und Rückweg eines Pakets | ms | **niedrig** (im LAN meist unter 1–2 ms) |
| **Paketverlust** | Anteil der Pakete, die nicht ankommen | % | 0 % |
| Jitter | Schwankung der Laufzeit | ms | niedrig (wichtig für Telefonie/Video) |
| Durchsatz / Auslastung | tatsächlich übertragene Datenmenge pro Zeit | Mbit/s, % | ausreichend Reserve |
| CPU, RAM, Datenträger | Auslastung der Ressourcen | % | unter dem Schwellwert, z. B. Speicher < 85 % |

**Werkzeuge und Protokolle:** \`ping\` (Erreichbarkeit und RTT), **SNMP** (Simple Network Management Protocol: Werte von Geräten abfragen über UDP 161; ein **Trap** ist eine Meldung, die das Gerät **von sich aus** schickt, UDP 162), **Syslog** (Logmeldungen zentral sammeln, klassisch UDP 514), die **Windows-Ereignisanzeige** (\`eventvwr.msc\`) und Monitoring-Software wie Zabbix, Checkmk oder PRTG.

**ping-Ausgabe lesen (Windows):**

\`\`\`
Antwort von 192.168.10.10: Bytes=32 Zeit=3ms TTL=64
Zeitüberschreitung der Anforderung.
Antwort von 192.168.10.10: Bytes=32 Zeit=5ms TTL=64
Antwort von 192.168.10.10: Bytes=32 Zeit=4ms TTL=64
Ping-Statistik für 192.168.10.10:
    Pakete: Gesendet = 4, Empfangen = 3, Verloren = 1
\`\`\`

- **Zeit=** ist die RTT in Millisekunden.
- **TTL** (Time To Live) ist **keine** Zeit, sondern ein Zähler für Router-Sprünge.
- **Zeitüberschreitung** = keine Antwort, das Paket gilt als verloren.
- Paketverlust = 1 / 4 · 100 % = **25 %**; mittlere RTT der Antworten = (3 + 5 + 4) / 3 = **4 ms**.

**Logeinträge** haben feste Felder: **Zeitstempel**, **Quelle** (Gerät/Dienst), **Schweregrad**, Ereignis-ID und **Meldungstext**. Die Schweregrade:

| Windows-Ereignisanzeige | Syslog (Nummer: kleiner = schlimmer) | Bedeutung |
|---|---|---|
| **Kritisch** | 0 Emergency, 1 Alert, 2 Critical | System oder Dienst ausgefallen – sofort handeln |
| **Fehler** | 3 Error | Funktion fehlgeschlagen (z. B. Dienst beendet) |
| **Warnung** | 4 Warning | noch kein Ausfall, aber bald Handlungsbedarf (Speicher fast voll) |
| **Informationen** | 5 Notice, 6 Informational | normaler (ggf. bemerkenswerter) Vorgang (Dienst gestartet, Update installiert) |
| Ausführlich | 7 Debug | sehr detaillierte Meldungen zur Fehlersuche |`,
        },
        {
          type: 'visual',
          title: 'Vier Wartungsarten',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Reaktiv', text: 'Nach dem Ausfall reparieren.', icon: 'Wrench' },
                { title: 'Periodisch', text: 'Nach festem Zeitplan warten.', icon: 'CalendarClock' },
                { title: 'Präventiv', text: 'Messwerte beobachten, vor dem Ausfall handeln.', icon: 'Activity' },
                { title: 'Prädiktiv', text: 'Aus Trends vorhersagen, wann es kritisch wird.', icon: 'TrendingUp' },
              ],
            },
          },
          caption: 'Von links nach rechts: weniger ungeplante Ausfälle, aber mehr Aufwand für Messung und Auswertung.',
        },
        {
          type: 'example',
          title: 'Videokonferenzen ruckeln am Standort Berlin',
          problem: `Berlin meldet: „Teams-Konferenzen ruckeln, Dateien öffnen geht.“ Du lässt vom Berliner Notebook aus \`ping -n 10\` zum VPN-Gateway in Hamburg laufen:

\`\`\`
Zeit=38ms, Zeit=41ms, Zeitüberschreitung, Zeit=95ms, Zeit=40ms,
Zeit=39ms, Zeitüberschreitung, Zeit=120ms, Zeit=42ms, Zeit=44ms
Pakete: Gesendet = 10, Empfangen = 8, Verloren = 2
\`\`\`

Werte die Ausgabe aus.`,
          steps: [
            { label: 'Paketverlust', body: '2 von 10 Paketen verloren → 2 / 10 · 100 % = **20 %**. Für Sprache und Video ist das viel zu hoch (schon wenige Prozent stören).' },
            { label: 'Mittlere RTT', body: 'Summe der 8 Antworten: 38 + 41 + 95 + 40 + 39 + 120 + 42 + 44 = 459 ms → 459 / 8 = **57,4 ms** (gerundet).' },
            { label: 'Schwankung (Jitter)', body: 'Die Werte springen zwischen 38 und 120 ms – starke Schwankung. Das erklärt das Ruckeln, während Dateien (TCP mit Wiederholungen) noch funktionieren.' },
            { label: 'Nächste Schritte', body: 'Auslastung der Internetleitung in Berlin prüfen (Monitoring/Router), ping zum Berliner Router (liegt es am LAN oder am WAN?), ggf. Provider kontaktieren; Ergebnis im Ticket dokumentieren.' },
          ],
          result: 'Hoher Paketverlust und stark schwankende RTT zeigen ein Leitungs- oder Auslastungsproblem auf dem WAN-Weg – nicht ein Problem von Teams selbst.',
        },
        {
          type: 'check',
          question: {
            id: 'b06-c10', kind: 'match', skill: 'itsm.maintenance', difficulty: 1,
            prompt: 'Ordne jede Maßnahme der passenden Wartungsart zu.',
            left: ['Der ausgefallene Switch wird ersetzt.', 'Jeden 2. Dienstag im Monat werden Updates eingespielt.', 'Eine SSD meldet steigende Fehlerzähler und wird vorsorglich getauscht.', 'Eine Auswertung des Speicherverlaufs sagt voraus, dass das Laufwerk in 20 Tagen voll ist.'],
            right: ['reaktiv', 'periodisch', 'präventiv (zustandsorientiert)', 'prädiktiv'],
            answer: [0, 1, 2, 3],
            explanation: 'Nach dem Ausfall = reaktiv; fester Termin = periodisch; Messwert löst Maßnahme aus = präventiv; Vorhersage aus dem Trend = prädiktiv.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'b06-c11', kind: 'number', skill: 'itsm.monitor', difficulty: 1,
            prompt: '`ping -n 20` zum Fileserver ergibt: **Gesendet = 20, Empfangen = 17**. Wie hoch ist der Paketverlust in Prozent?',
            answer: 15, unit: '%',
            misconceptions: [{ answer: '85', error: 'monitor-empfangen-statt-verlust', why: 'Das ist der Anteil der angekommenen Pakete – gefragt ist der Verlust.' }, { answer: '3', error: 'prozent-statt-absolut', why: 'Das ist die Anzahl verlorener Pakete, nicht der Anteil in Prozent.' }],
            explanation: '**15 %.** Verloren: 20 − 17 = 3 Pakete → 3 / 20 · 100 % = 15 %.\n\nHäufiger Fehler: 17 / 20 = 85 % ausrechnen – das ist der Anteil, der **angekommen** ist.',
          },
        },
        { type: 'practice', title: 'Übung: ping-Ausgaben auswerten', generator: 'sys.ping', count: 4, difficulty: 2 },
        { type: 'practice', title: 'Übung: Wartung, Monitoring und Logs', questionIds: ['b06-q038', 'b06-q039', 'b06-q040', 'b06-q041', 'b06-q042', 'b06-q043', 'b06-q044'], count: 7, difficulty: 2 },
        { type: 'summary', points: ['Wartungsarten: reaktiv (nach Ausfall), periodisch (Zeitplan), präventiv (Messwerte), prädiktiv (Prognose).', 'Wartungsplan: Aufgabe, Intervall, Verantwortlicher, Nachweis.', 'Monitoring-Kennzahlen: Erreichbarkeit, RTT/Latenz, Paketverlust, Jitter, Auslastung, Schwellwerte.', 'ping: „Zeit=“ ist die RTT; TTL ist keine Zeit; Verlust = verloren / gesendet · 100 %.', 'SNMP (UDP 161, Trap 162), Syslog (UDP 514), Ereignisanzeige.', 'Log-Schweregrade: Kritisch – Fehler – Warnung – Information; Syslog 0 (Emergency) bis 7 (Debug).'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b06-l07',
      title: 'Kundenkommunikation am Telefon und per E-Mail',
      minutes: 25,
      relevance: 'ap1',
      skills: ['itsm.comm'],
      simple: `Ein Support-Gespräch läuft ab wie ein guter Arztbesuch: begrüßen, zuhören, gezielt nachfragen, zusammenfassen und zum Schluss klar sagen, wie es weitergeht. Offene Fragen (mit W-Wort, z. B. „Welche Meldung erscheint?“) sammeln Informationen, geschlossene Fragen (Antwort Ja oder Nein) grenzen ein. Ist jemand verärgert, nimmst du es nicht persönlich: Ärger anerkennen, auf die Sache lenken, eine konkrete Lösung anbieten. Nach dem Vier-Ohren-Modell hat jede Nachricht vier Seiten: Sache, Selbstkundgabe, Beziehung und Appell.

**Merke:** Begrüßung – Anliegen – Fragen – Zusammenfassen – nächste Schritte mit Ticketnummer – Verabschiedung; nie nach Passwörtern fragen.`,
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
          type: 'explain',
          title: 'Deeskalation und die eigene Arbeit ordnen (Eisenhower)',
          body: `**Deeskalation** heißt: ein aufgeheiztes Gespräch wieder auf eine ruhige, sachliche Ebene bringen. Das klappt mit festen Schritten:

| Schritt | Was du tust | Beispielsatz |
|---|---|---|
| **1. Ruhe bewahren** | ausreden lassen, nicht unterbrechen, nicht zurückschießen | – (zuhören, notieren) |
| **2. Gefühl anerkennen** | Ärger spiegeln, ohne Schuld zuzuweisen | „Ich höre, dass Sie das sehr ärgert – gerade heute.“ |
| **3. Sache klären** | zusammenfassen, gezielt nachfragen | „Habe ich richtig verstanden, dass seit 9 Uhr …?“ |
| **4. Lösung anbieten** | Sofortmaßnahme oder Workaround, wenn möglich Wahlmöglichkeit | „Ich kann Ihnen sofort ein Ersatzgerät bringen oder es per Fernwartung versuchen.“ |
| **5. Verbindlich vereinbaren** | wer macht was bis wann, Ticketnummer | „Ich rufe Sie bis 11:30 Uhr zurück. Ihre Ticketnummer ist …“ |
| **6. Bestätigen und nachhalten** | Zusage schriftlich bestätigen, Termin einhalten | kurze E-Mail mit Vereinbarung |

**Wörter, die Öl ins Feuer gießen** – und bessere Formulierungen:

| ungünstig | besser |
|---|---|
| „Das kann gar nicht sein.“ | „Lassen Sie uns das gemeinsam prüfen.“ |
| „Dafür bin ich nicht zuständig.“ | „Ich kläre das mit dem Kollegen und melde mich bis 14 Uhr.“ |
| „Da müssen Sie …“ | „Am schnellsten geht es, wenn Sie …“ |
| „Problem“ | „Anliegen“, „Situation“ |

**Grenzen:** Bei Beleidigungen freundlich, aber klar eine Grenze setzen („So kann ich Ihnen nicht helfen. Lassen Sie uns sachlich bleiben.“) und notfalls die Vorgesetzte einbinden (hierarchische Eskalation).

**Eisenhower-Matrix – was mache ich zuerst?** Auch deine eigenen Aufgaben brauchen eine Reihenfolge. Die Matrix sortiert nach **wichtig** (hat Folgen für Ziele, Kunden, Sicherheit) und **dringend** (muss sofort passieren):

| | **dringend** | **nicht dringend** |
|---|---|---|
| **wichtig** | **A – sofort selbst erledigen** | **B – terminieren** (fest einplanen) |
| **nicht wichtig** | **C – delegieren** (abgeben) | **D – nicht erledigen** (Papierkorb) |

Achtung: Die Eisenhower-Matrix ordnet **deine Aufgaben**. Die Priorität von **Störungen** bestimmst du dagegen mit der Prioritätsmatrix aus Auswirkung und Dringlichkeit.`,
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
        { type: 'practice', title: 'Übung: Deeskalation und Eisenhower', questionIds: ['b06-q055', 'b06-q056', 'b06-q057', 'b06-q058'], count: 4, difficulty: 2 },
        { type: 'summary', points: ['Leitfaden: Begrüßung – Anliegen – Fragen – Zusammenfassen – nächste Schritte/Ticketnummer – Verabschiedung.', 'Offene Fragen sammeln, geschlossene Fragen grenzen ein.', 'Verständlich, aktiv zuhören, Ich-Botschaften, Zusagen einhalten.', 'Vier-Ohren-Modell: Sache, Selbstkundgabe, Beziehung, Appell.', 'Deeskalation: ruhig bleiben, Gefühl anerkennen, Sache klären, Lösung anbieten, verbindlich vereinbaren, schriftlich bestätigen.', 'Eisenhower: A sofort, B terminieren, C delegieren, D weglassen.', 'Identität prüfen, nie nach Passwörtern fragen (Social Engineering).'] },
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
    /* ---------- Servicearten, IMAC/R/D ---------- */
    {
      id: 'b06-q033', kind: 'table', skill: 'itsm.imac', difficulty: 1,
      prompt: 'Ordne jede Anfrage einer IMAC/R/D-Phase zu. Trage den Buchstaben (**I**, **M**, **A**, **C**, **R** oder **D**) ein.',
      columns: [{ key: 'p', label: 'Phase', type: 'text' }],
      rows: [
        { label: 'Für die neue Kollegin im Einkauf einen kompletten Arbeitsplatz aufbauen', cells: { p: { answer: 'I', accept: ['install', 'installation', 'installieren'] } } },
        { label: 'Den Etikettendrucker des Lagers in die neue Halle umziehen', cells: { p: { answer: 'M', accept: ['move', 'umzug', 'umziehen'] } } },
        { label: 'Visio auf dem PC von Herrn Becker zusätzlich installieren', cells: { p: { answer: 'A', accept: ['add', 'hinzufügen', 'erweitern'] } } },
        { label: 'Ausgemusterte Festplatten vernichten lassen und das Vernichtungsprotokoll ablegen', cells: { p: { answer: 'D', accept: ['dispose', 'entsorgen', 'entsorgung'] } } },
        { label: 'Das Notebook eines Praktikanten nach Praktikumsende abbauen und sein Konto sperren', cells: { p: { answer: 'R', accept: ['remove', 'abbauen', 'entfernen'] } } },
        { label: 'Einen PC per Upgrade von Windows 10 auf Windows 11 umstellen', cells: { p: { answer: 'C', accept: ['change', 'ändern', 'änderung'] } } },
      ],
      hints: ['I = aufbauen, M = umziehen, A = hinzufügen, C = ändern, R = abbauen, D = entsorgen.'],
      explanation: 'Aufbau = **I**nstall; Umzug = **M**ove; zusätzliche Software = **A**dd; Vernichtung/Entsorgung = **D**ispose; Abbau = **R**emove; Upgrade = **C**hange.\n\nHäufiger Fehler: Die Installation **zusätzlicher** Software für „Install“ halten. Install meint den **ganzen** neuen Arbeitsplatz; etwas dazu ist „Add“.',
    },
    {
      id: 'b06-q034', kind: 'free', skill: 'itsm.imac', difficulty: 2,
      prompt: 'Die Buchhaltung (6 Arbeitsplätze) zieht am Standort Hamburg vom Erdgeschoss in das 3. OG. Beschreibe die Schritte, die du als IT für diesen **Move** planst – einschließlich der Dokumentation.',
      modelAnswer: 'Vorbereitung: Termin mit der Abteilung abstimmen (möglichst außerhalb der Arbeitszeit), Raumplan prüfen; im 3. OG genügend gepatchte Netzwerkdosen im richtigen VLAN bereitstellen, Stromanschlüsse und Drucker klären. Vor dem Umzug lokale Daten sichern, Geräte herunterfahren, Kabel und Geräte beschriften. Transport sicher durchführen. Im 3. OG anschließen, Netzwerk, Anmeldung, Netzlaufwerke, Drucker, Telefon und Fachanwendungen testen, gemeinsam mit den Anwendern abnehmen. Dokumentation: Inventar bzw. CMDB (neuer Raum, neuer Switchport/Dose), Netzwerkdokumentation und Telefonliste aktualisieren, Ticket mit Arbeitsschritten und Zeitaufwand abschließen.',
      keywords: ['Termin', 'Netzwerkdose', 'VLAN', 'Daten sichern', 'beschriften', 'testen', 'Inventar', 'Dokumentation'],
      hints: ['Gliedere in: vorher – Umzugstag – nachher.', 'Was muss im neuen Raum schon vorhanden sein?'],
      explanation: 'Eine gute Antwort deckt Vorbereitung (Anschlüsse, VLAN, Termin), Sicherung, Abbau/Transport, Aufbau mit Test und die Aktualisierung von Inventar/Netzwerkdokumentation ab.',
    },
    {
      id: 'b06-q035', kind: 'match', skill: 'itsm.imac', difficulty: 2,
      prompt: 'Ordne jede Serviceart ihrer Beschreibung zu.',
      left: ['Break/Fix', 'Swap-Service', 'DIY', 'Managed Service', 'Bring-in-Service', 'Remote-Service'],
      right: ['Hilfe erst bei einem Defekt, Abrechnung nach Aufwand', 'defektes Gerät wird sofort gegen ein Ersatzgerät getauscht', 'Kunde tauscht ein einfaches Ersatzteil selbst, ohne Garantieverlust', 'Dienstleister betreibt und überwacht ein System dauerhaft gegen Pauschale', 'Kunde bringt das Gerät in die Werkstatt', 'Hilfe über eine Fernwartungsverbindung'],
      answer: [0, 1, 2, 3, 4, 5],
      explanation: 'Break/Fix = auf Abruf nach Aufwand; Swap = Austausch; DIY = selbst tauschen; Managed = dauerhafter Betrieb mit SLA; Bring-in = in die Werkstatt; Remote = über das Netz.',
    },
    {
      id: 'b06-q036', kind: 'free', skill: 'itsm.imac', difficulty: 3,
      prompt: 'Ein Kunde mit 15 Arbeitsplätzen fragt, ob er beim **Break/Fix-Modell** bleiben oder einen **Managed Service** für seine Server und Arbeitsplätze abschließen soll. Nenne je zwei Vor- und Nachteile beider Modelle aus Sicht des Kunden.',
      modelAnswer: 'Break/Fix – Vorteile: keine laufenden Fixkosten, man zahlt nur bei tatsächlichem Bedarf; keine Vertragsbindung. Nachteile: keine zugesagte Reaktionszeit, Kosten schwer planbar (teure Einsätze bei großen Störungen), Probleme werden erst nach dem Ausfall bemerkt, keine vorbeugende Wartung. Managed Service – Vorteile: planbare monatliche Kosten, vereinbarte Reaktions- und Lösungszeiten im SLA, laufendes Monitoring und Patchen verhindern viele Ausfälle, Know-how des Dienstleisters dauerhaft verfügbar. Nachteile: laufende Kosten auch in ruhigen Monaten, Vertragsbindung und Abhängigkeit vom Dienstleister, Kunde muss Zugriff (z. B. Fernwartung, Monitoring-Agent) erlauben und Daten schützen (Auftragsverarbeitung).',
      keywords: ['nach Aufwand', 'keine Fixkosten', 'keine Reaktionszeit', 'planbare Kosten', 'SLA', 'Monitoring', 'Vertragsbindung', 'Abhängigkeit'],
      explanation: 'Break/Fix spart Fixkosten, bietet aber keine Zusagen und kein Vorbeugen. Managed Service kostet regelmäßig, bringt aber planbare Kosten, SLA und Prävention.',
    },
    {
      id: 'b06-q037', kind: 'table', skill: 'itsm.imac', difficulty: 2,
      prompt: 'Welcher Begriff passt? Trage **Gewährleistung**, **Garantie** oder **Kulanz** ein.',
      columns: [{ key: 'x', label: 'Begriff', type: 'text' }],
      rows: [
        { label: 'Ein Notebook wurde vor 3 Monaten gekauft, der Akku war von Anfang an defekt. Der Kunde verlangt vom Händler Nacherfüllung. Eine Herstellergarantie gibt es nicht.', cells: { x: { answer: 'Gewährleistung', accept: ['gewaehrleistung', 'mängelhaftung', 'sachmängelhaftung'] } } },
        { label: 'Ein Monitor ist 30 Monate alt und defekt. Laut Garantiekarte des Herstellers gilt 3 Jahre Vor-Ort-Austausch.', cells: { x: { answer: 'Garantie', accept: ['herstellergarantie'] } } },
        { label: 'Eine Maus fällt nach 27 Monaten aus. Es gibt keine Garantie; der Händler tauscht sie trotzdem kostenlos, weil der Kunde Stammkunde ist.', cells: { x: { answer: 'Kulanz' } } },
      ],
      hints: ['Gesetzlich (Verkäufer) – freiwilliges Versprechen (meist Hersteller) – freiwillig ohne Pflicht.'],
      explanation: '1. Mangel bei Übergabe, innerhalb von 2 Jahren, gegenüber dem Verkäufer → **Gewährleistung** (§§ 434 ff. BGB).\n2. Die gesetzliche Frist ist abgelaufen, aber der Hersteller hat 3 Jahre versprochen → **Garantie** (§ 443 BGB).\n3. Kein Anspruch mehr, der Händler hilft freiwillig → **Kulanz**.\n\nHäufiger Fehler: „Garantie“ als Sammelwort für alles verwenden. Die Gewährleistung gilt per Gesetz, auch ohne Garantie.',
    },
    /* ---------- Wartung und Monitoring ---------- */
    {
      id: 'b06-q038', kind: 'free', skill: 'itsm.maintenance', difficulty: 2,
      prompt: 'Erstelle für den Dateiserver der Elektro Krämer GmbH einen kurzen **Wartungsplan** mit mindestens fünf Aufgaben. Gib zu jeder Aufgabe das Intervall an.',
      modelAnswer: 'Täglich: Erfolg der Datensicherung prüfen. Wöchentlich: Ereignisprotokolle und Monitoring-Warnungen sichten (Speicherplatz, Dienste). Monatlich: Sicherheitsupdates nach dem Patchday einspielen (vorher testen, Wartungsfenster), Festplatten-/RAID-Status und Virenschutz prüfen, USV-Selbsttest. Vierteljährlich: Wiederherstellung testen (Restore-Test). Halbjährlich: Lüfter und Filter reinigen, Berechtigungen prüfen. Nach Herstellerangabe: USV-Batterien tauschen. Jede Aufgabe mit Verantwortlichem und Nachweis (Checkliste, Protokoll) dokumentieren.',
      keywords: ['Datensicherung', 'täglich', 'Updates', 'monatlich', 'Restore-Test', 'Ereignisprotokoll', 'USV', 'Nachweis'],
      explanation: 'Wichtig sind sinnvolle Intervalle und ein Nachweis. Ohne Restore-Test weiß niemand, ob die Sicherung im Ernstfall funktioniert.',
    },
    {
      id: 'b06-q039', kind: 'table', skill: 'itsm.monitor', difficulty: 2,
      prompt: 'Auszug aus der Windows-Ereignisanzeige. Trage den passenden Schweregrad ein: **Kritisch**, **Fehler**, **Warnung** oder **Informationen**.',
      columns: [{ key: 's', label: 'Schweregrad', type: 'text' }],
      rows: [
        { label: 'Kernel-Power, ID 41: Das System wurde neu gestartet, ohne dass es zuvor ordnungsgemäß heruntergefahren wurde.', cells: { s: { answer: 'Kritisch', accept: ['critical'] } } },
        { label: 'Service Control Manager, ID 7034: Der Dienst „Druckwarteschlange“ wurde unerwartet beendet.', cells: { s: { answer: 'Fehler', accept: ['error'] } } },
        { label: 'Datenträger D: hat nur noch 8 % freien Speicherplatz.', cells: { s: { answer: 'Warnung', accept: ['warning'] } } },
        { label: 'Windows Update: Ein Sicherheitsupdate wurde erfolgreich installiert.', cells: { s: { answer: 'Informationen', accept: ['information', 'info', 'informational'] } } },
      ],
      hints: ['Kritisch = System/Dienst weg; Fehler = Funktion fehlgeschlagen; Warnung = droht; Information = normaler Vorgang.'],
      explanation: 'Unerwarteter Neustart (Stromverlust/Absturz) = **Kritisch**. Ein abgestürzter Dienst = **Fehler**. Fast voller Datenträger = **Warnung** (noch kein Ausfall). Erfolgreiches Update = **Informationen**.',
    },
    {
      id: 'b06-q040', kind: 'free', skill: 'itsm.monitor', difficulty: 2,
      prompt: 'Eine Kundin beschwert sich: „Unsere Videokonferenzen ruckeln ständig, E-Mail und Dateien gehen aber normal.“ Welche **Kennzahlen** prüfst du, und warum gerade diese?',
      modelAnswer: 'Videokonferenzen sind Echtzeitanwendungen und reagieren empfindlich auf Laufzeitprobleme. Ich prüfe: Paketverlust in Prozent (verlorene Pakete werden bei Echtzeit nicht nachgeschickt), Latenz bzw. RTT in Millisekunden (Verzögerung), Jitter (Schwankung der Laufzeit, führt zu Rucklern), Auslastung bzw. Durchsatz der Internetleitung (vor allem Upload) und ggf. WLAN-Signalstärke. E-Mail und Dateiübertragung nutzen TCP und wiederholen verlorene Pakete; sie werden nur langsamer, deshalb fallen die Probleme dort kaum auf. Werkzeuge: ping/Monitoring, Router-Statistik, Messung zu verschiedenen Zeiten.',
      keywords: ['Paketverlust', 'Latenz', 'RTT', 'Jitter', 'Auslastung', 'Upload', 'Echtzeit'],
      explanation: 'Echtzeitverkehr braucht geringe, gleichmäßige Laufzeiten ohne Verluste. Darum: Paketverlust, RTT, Jitter, Auslastung.',
    },
    {
      id: 'b06-q041', kind: 'number', skill: 'itsm.monitor', difficulty: 2,
      prompt: `Ausgabe von \`ping -n 5 192.168.10.10\`:

\`\`\`
Antwort von 192.168.10.10: Bytes=32 Zeit=12ms TTL=64
Antwort von 192.168.10.10: Bytes=32 Zeit=15ms TTL=64
Zeitüberschreitung der Anforderung.
Antwort von 192.168.10.10: Bytes=32 Zeit=11ms TTL=64
Antwort von 192.168.10.10: Bytes=32 Zeit=18ms TTL=64
\`\`\`

Wie groß ist die **mittlere RTT der empfangenen Antworten** in ms?`,
      answer: 14, tolerance: 0.05, unit: 'ms',
      hints: ['Die Zeitüberschreitung hat keine RTT – sie zählt nur beim Paketverlust.', 'Mittelwert über die 4 Antworten.'],
      misconceptions: [{ answer: '11.2', error: 'monitor-verlust-mitgemittelt', why: 'Du hast durch 5 geteilt. Die Zeitüberschreitung liefert keine Zeit – nur 4 Antworten zählen.' }, { answer: '56', error: 'mittelwert-nicht-geteilt', why: 'Das ist die Summe. Für den Mittelwert durch die Anzahl der Antworten (4) teilen.' }],
      explanation: '**14 ms.**\n\n1. Antwortzeiten: 12 + 15 + 11 + 18 = 56 ms.\n2. Anzahl Antworten: 4 (eine Zeitüberschreitung).\n3. Mittelwert: 56 ms / 4 = **14 ms**.\n\nZusätzlich: Paketverlust = 1 / 5 · 100 % = 20 %.\n\nHäufiger Fehler: durch 5 teilen – die Zeitüberschreitung hat keine Laufzeit.',
    },
    {
      id: 'b06-q042', kind: 'free', skill: 'itsm.maintenance', difficulty: 2,
      prompt: 'Erläutere am Beispiel einer **USV** (unterbrechungsfreie Stromversorgung) den Unterschied zwischen reaktiver, periodischer, präventiver und prädiktiver Wartung.',
      modelAnswer: 'Reaktiv: Die USV-Batterie wird erst getauscht, nachdem die USV bei einem Stromausfall versagt hat und der Server ausgegangen ist. Periodisch: Die Batterien werden nach festem Plan getauscht (z. B. nach dem vom Hersteller empfohlenen Intervall), dazu monatlicher Selbsttest. Präventiv (zustandsorientiert): Die USV ist ins Monitoring eingebunden; meldet sie beim Selbsttest eine zu geringe Kapazität oder eine Batteriewarnung, wird die Batterie getauscht, bevor sie ausfällt. Prädiktiv: Aus dem Verlauf der Messwerte (Kapazität, Innenwiderstand, Temperatur) wird vorhergesagt, wann die Batterie die Mindestlaufzeit nicht mehr schafft, und der Tausch rechtzeitig geplant.',
      keywords: ['nach dem Ausfall', 'fester Plan', 'Monitoring', 'Messwert', 'Vorhersage', 'Verlauf'],
      explanation: 'Unterschied ist der **Auslöser**: Ausfall – Kalender – Messwert – Prognose.',
    },
    {
      id: 'b06-q043', kind: 'text', skill: 'itsm.monitor', difficulty: 2,
      prompt: 'Syslog nummeriert die Schweregrade von 0 bis 7. Wie heißt der Schweregrad mit der Nummer **0** (englischer Name)?',
      accept: ['Emergency', 'emerg', 'Notfall'],
      hints: ['Je kleiner die Nummer, desto schlimmer.'],
      explanation: '0 = **Emergency** (System unbrauchbar), 1 Alert, 2 Critical, 3 Error, 4 Warning, 5 Notice, 6 Informational, 7 Debug.\n\nHäufiger Fehler: „Debug“ – das ist 7, die unwichtigste Stufe.',
    },
    {
      id: 'b06-q044', kind: 'single', skill: 'itsm.monitor', difficulty: 2,
      prompt: 'Was ist ein **SNMP-Trap**?',
      options: ['Eine Meldung, die ein Gerät von sich aus an die Managementstation schickt, z. B. „Lüfter ausgefallen“', 'Eine Abfrage, mit der die Managementstation regelmäßig einen Messwert abholt', 'Ein absichtlich verwundbares System, das Angreifer anlocken soll', 'Ein Protokoll zur Zeitsynchronisation der Geräte'],
      answer: 0,
      distractors: { '1': { why: 'Das ist eine normale SNMP-Abfrage (Get) über UDP 161 – die Initiative geht von der Managementstation aus.', error: 'snmp-trap-get' }, '2': { why: 'Das ist ein Honeypot – hat mit SNMP nichts zu tun.', error: 'snmp-trap-get' }, '3': { why: 'Zeitsynchronisation macht NTP (UDP 123).', error: 'snmp-trap-get' } },
      explanation: 'Ein **Trap** ist eine ungefragte Meldung des Geräts (UDP 162). So erfährt das Monitoring sofort von einem Ereignis, statt erst bei der nächsten Abfrage.',
    },
    /* ---------- Eskalation, Ticket, Kennzahlen ---------- */
    {
      id: 'b06-q045', kind: 'table', skill: 'itsm.levels', difficulty: 3,
      prompt: `Es ist Mittwoch, **13:00 Uhr**. Servicezeit Mo–Fr 08:00–17:00 Uhr. Auszug aus dem Servicevertrag:

| Schweregrad | Reaktionszeit | Eskalationsstufe 1 (Teamleitung) | Eskalationsstufe 2 (Leitung IT-Service) |
|---|---|---|---|
| 1 – kritisch | 30 min | nach 1 h ohne Lösung | nach 2 h ohne Lösung |
| 2 – hoch | 2 h | nach 4 h | nach 8 h |
| 3 – normal | 4 h | nach 8 h | nach 16 h |

Alle Tickets wurden **heute** gemeldet und sind noch **ungelöst**. Welche Eskalationsstufe gilt jetzt? Trage **0** (keine), **1** oder **2** ein.`,
      columns: [{ key: 'e', label: 'Stufe', type: 'number' }],
      rows: [
        { label: 'A: Schweregrad 1, gemeldet 11:30 Uhr', cells: { e: { answer: '1' } } },
        { label: 'B: Schweregrad 2, gemeldet 08:30 Uhr', cells: { e: { answer: '1' } } },
        { label: 'C: Schweregrad 1, gemeldet 10:45 Uhr', cells: { e: { answer: '2' } } },
        { label: 'D: Schweregrad 3, gemeldet 09:00 Uhr', cells: { e: { answer: '0' } } },
        { label: 'E: Schweregrad 2, gemeldet 12:15 Uhr', cells: { e: { answer: '0' } } },
      ],
      hints: ['Vergangene Zeit = 13:00 − Meldezeit.', 'Erreicht oder überschritten → diese Stufe gilt; die höchste erreichte Stufe zählt.'],
      explanation: '| Ticket | vergangen | Schwellen | Stufe |\n|---|---|---|---|\n| A | 1 h 30 min | 1 h / 2 h | **1** |\n| B | 4 h 30 min | 4 h / 8 h | **1** |\n| C | 2 h 15 min | 1 h / 2 h | **2** |\n| D | 4 h | 8 h / 16 h | **0** |\n| E | 45 min | 4 h / 8 h | **0** |\n\nHäufiger Fehler: bei D die **Reaktionszeit** (4 h) mit einer Eskalationsschwelle verwechseln. Die Reaktionszeit ist erreicht – hier muss der Kunde längst eine Rückmeldung haben –, eskaliert wird aber erst nach 8 h.',
    },
    {
      id: 'b06-q046', kind: 'table', skill: 'itsm.priority', difficulty: 2,
      prompt: `Um **10:20 Uhr** ruft Frau Nowak aus dem Einkauf an: „Seit 10 Uhr kann bei uns im Einkauf niemand mehr auf das Netzlaufwerk E: zugreifen. Wir sind 8 Leute. Bestellungen können wir zum Glück über die Weboberfläche des Dokumentenmanagements weiter anlegen, das ist nur umständlicher.“

**Einstufung laut SLA:** Auswirkung *hoch* = Standort/über 20 Personen, *mittel* = Abteilung/2–20 Personen, *gering* = eine Person. Dringlichkeit *hoch* = Arbeit unmöglich, *mittel* = eingeschränkt mit Workaround, *gering* = kann warten.

| Auswirkung ↓ / Dringlichkeit → | hoch | mittel | gering |
|---|---|---|---|
| **hoch** | 1 | 2 | 3 |
| **mittel** | 2 | 3 | 4 |
| **gering** | 3 | 4 | 5 |

| Priorität | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Reaktionszeit | 15 min | 30 min | 2 h | 4 h | 8 h |

Fülle die Ticketfelder aus.`,
      columns: [{ key: 'v', label: 'Eintrag', type: 'text' }],
      rows: [
        { label: 'Klassifizierung (Incident, Service Request oder Change)', cells: { v: { answer: 'Incident', accept: ['störung'] } } },
        { label: 'Auswirkung (hoch/mittel/gering)', cells: { v: { answer: 'mittel', accept: ['m'] } } },
        { label: 'Dringlichkeit (hoch/mittel/gering)', cells: { v: { answer: 'mittel', accept: ['m'] } } },
        { label: 'Priorität (Zahl)', cells: { v: { answer: '3', accept: ['p3', 'prio 3', 'priorität 3'] } } },
        { label: 'Reaktion spätestens um (hh:mm)', cells: { v: { answer: '12:20', accept: ['12.20', '12:20 uhr', '12.20 uhr'] } } },
      ],
      hints: ['Etwas funktioniert nicht mehr, das vorher ging → welche Ticketart?', 'Workaround vorhanden → Dringlichkeit sinkt.'],
      misconceptions: [{ cell: '2:v', answer: 'hoch', error: 'prio-workaround-ignoriert', why: 'Es gibt einen Workaround (Weboberfläche). Damit ist die Dringlichkeit nur **mittel**.' }],
      explanation: '1. Ein Dienst, der vorher lief, ist gestört → **Incident**.\n2. 8 Personen einer Abteilung → Auswirkung **mittel**.\n3. Arbeiten geht über die Weboberfläche weiter → Dringlichkeit **mittel**.\n4. Matrix: Zeile mittel, Spalte mittel → **Priorität 3**.\n5. Reaktionszeit 2 h: 10:20 Uhr + 2 h = **12:20 Uhr**.\n\nHäufiger Fehler: Dringlichkeit „hoch“, weil „niemand zugreifen kann“ – der Workaround senkt die Dringlichkeit.',
    },
    {
      id: 'b06-q047', kind: 'number', skill: 'itsm.sla', difficulty: 2,
      prompt: 'Der Firewall-Cluster lief ein Jahr lang (365 Tage, 24/7 = 8.760 h) und fiel **3-mal** aus: 2 h, 1,5 h und 0,5 h. Berechne die **MTBF** in Stunden (auf 2 Nachkommastellen).',
      answer: 2918.67, tolerance: 0.01, unit: 'h',
      hints: ['Gesamtausfall = 2 + 1,5 + 0,5 h.', 'MTBF = (8.760 h − Gesamtausfall) / Anzahl Ausfälle.'],
      misconceptions: [{ answer: '2920', error: 'mtbf-ausfall-nicht-abgezogen', why: 'Die Ausfallzeit gehört nicht zur Betriebszeit. Erst 8.760 h − 4 h, dann durch 3 teilen.' }, { answer: '1.33', error: 'mtbf-mttr-verwechselt', why: 'Das ist die MTTR (mittlere Ausfalldauer), nicht die MTBF.' }],
      explanation: '**2.918,67 h.**\n\n1. Gesamtausfall: 2 + 1,5 + 0,5 = 4 h.\n2. Betriebszeit: 8.760 − 4 = 8.756 h.\n3. MTBF = 8.756 h / 3 = 2.918,666… h ≈ **2.918,67 h**.\n\nHäufiger Fehler: 8.760 / 3 = 2.920 h – dabei fehlt der Abzug der Ausfallzeit.',
    },
    {
      id: 'b06-q048', kind: 'number', skill: 'itsm.sla', difficulty: 2,
      prompt: 'Für Störungen der Priorität 2 gilt eine MTTR-Vorgabe von **45 min** (gezählt werden alle Phasen). Eine Störung dauerte: Erkennen 5 min, Reagieren 10 min, Beheben 30 min, Testen 15 min. Um wie viel **Prozent** wurde die Vorgabe überschritten? (eine Nachkommastelle)',
      answer: 33.3, tolerance: 0.05, unit: '%',
      hints: ['Ist = Summe aller Phasen.', 'Abweichung in % = (Ist − Soll) / Soll · 100.'],
      misconceptions: [{ answer: '25', error: 'prozent-falsche-basis', why: 'Du hast durch die Ist-Zeit (60 min) geteilt. Bezugsgröße ist die Vorgabe (45 min).' }, { answer: '15', error: 'prozent-statt-absolut', why: 'Das sind 15 **Minuten** Überschreitung – gefragt sind Prozent.' }],
      explanation: '**33,3 %.**\n\n1. Ist: 5 + 10 + 30 + 15 = 60 min.\n2. Differenz: 60 − 45 = 15 min.\n3. 15 / 45 · 100 % = 33,33 % ≈ **33,3 %**.\n\nHäufiger Fehler: 15 / 60 = 25 % – Bezugsgröße ist aber die Vorgabe.',
    },
    {
      id: 'b06-q049', kind: 'number', skill: 'itsm.sla', difficulty: 1,
      prompt: 'Im Vorjahr gingen beim Service Desk **720** Tickets ein, in diesem Jahr **810**. Um wie viel Prozent ist die Ticketzahl gestiegen? (eine Nachkommastelle)',
      answer: 12.5, tolerance: 0.05, unit: '%',
      hints: ['Bezugsgröße (100 %) ist das Vorjahr.'],
      misconceptions: [{ answer: '90', error: 'prozent-statt-absolut', why: 'Das ist der Anstieg in Tickets, nicht in Prozent.' }, { answer: '11.1', error: 'prozent-falsche-basis', why: 'Du hast durch den neuen Wert geteilt. Bezugsgröße ist das Vorjahr (720).' }],
      explanation: '**+12,5 %.**\n\n1. Differenz: 810 − 720 = 90 Tickets.\n2. 90 / 720 · 100 % = **12,5 %**.\n\nHäufiger Fehler: 90 / 810 = 11,1 % – das Vorjahr ist die Basis.',
    },
    {
      id: 'b06-q050', kind: 'number', skill: 'itsm.sla', difficulty: 1,
      prompt: 'Von **400** Störungstickets im Quartal wurden **20** nicht innerhalb der vereinbarten Lösungszeit erledigt. Wie hoch ist die **SLA-Erfüllungsquote** in Prozent?',
      answer: 95, unit: '%',
      misconceptions: [{ answer: '5', error: 'quote-gegenteil', why: 'Das ist der Anteil der **verfehlten** Tickets. Gefragt ist der Anteil, der in der Frist erledigt wurde.' }],
      explanation: '**95 %.**\n\n1. In der Frist erledigt: 400 − 20 = 380 Tickets.\n2. 380 / 400 · 100 % = **95 %**.',
    },
    {
      id: 'b06-q051', kind: 'number', skill: 'itsm.sla', difficulty: 3,
      prompt: 'Die Kundenzufriedenheit wird als Schulnote erhoben (1 = sehr gut … 6 = ungenügend). Im Vorjahr lag der Durchschnitt bei **2,5**, in diesem Jahr bei **2,2**. Um wie viel Prozent hat sich die Note verändert? (Vorzeichen angeben)',
      answer: -12, tolerance: 0.05, unit: '%',
      hints: ['Veränderung = (neu − alt) / alt · 100.', 'Bei Schulnoten ist eine kleinere Zahl besser.'],
      misconceptions: [{ answer: '12', error: 'vorzeichen-vergessen', why: 'Die Note ist gesunken – die Veränderung ist negativ (−12 %). Bei Noten bedeutet das eine Verbesserung.' }, { answer: '-13.6', error: 'prozent-falsche-basis', why: 'Du hast durch den neuen Wert geteilt. Basis ist das Vorjahr (2,5).' }],
      explanation: '**−12 %.**\n\n1. Differenz: 2,2 − 2,5 = −0,3.\n2. −0,3 / 2,5 · 100 % = **−12 %**.\n\nDeutung: Die Note ist um 12 % **gesunken** – bei Schulnoten ist das eine **Verbesserung** der Kundenzufriedenheit.',
    },
    /* ---------- Analyse: Kepner-Tregoe ---------- */
    {
      id: 'b06-q052', kind: 'match', skill: 'itsm.analysis', difficulty: 2,
      prompt: 'Welche Analysemethode passt am besten zur Situation?',
      left: ['Ein Fehler tritt nur bei einigen von vielen gleichartigen PCs auf.', 'Das Team will in einem Brainstorming mögliche Ursachen nach Kategorien sammeln.', 'Aus 500 Tickets soll ermittelt werden, welche Kategorien die meisten Fälle verursachen.', 'Einer einzelnen Ursachenkette soll man bis zum Kern nachgehen.'],
      right: ['Kepner-Tregoe (Ist / Ist nicht)', 'Ishikawa-Diagramm', 'Pareto-Analyse', '5-Why'],
      answer: [0, 1, 2, 3],
      explanation: 'Vergleich betroffen/nicht betroffen = Kepner-Tregoe; Ursachen in die Breite = Ishikawa; Häufigkeiten = Pareto; Ursachenkette in die Tiefe = 5-Why.',
    },
    {
      id: 'b06-q053', kind: 'table', skill: 'itsm.analysis', difficulty: 2,
      prompt: 'Für die Ist / Ist-nicht-Analyse zur Störung „WLAN bricht ab“ hast du Fakten gesammelt. Zu welcher Dimension gehört jede Angabe? Trage **Was**, **Wo**, **Wann** oder **Ausmaß** ein.',
      columns: [{ key: 'd', label: 'Dimension', type: 'text' }],
      rows: [
        { label: 'Betroffen ist das WLAN „EK-Mitarbeiter“, das Gäste-WLAN läuft stabil.', cells: { d: { answer: 'Was' } } },
        { label: 'Abbrüche nur im 2. OG, nicht im 1. OG.', cells: { d: { answer: 'Wo' } } },
        { label: 'Erst seit dem Firmware-Update der Access Points am Montag.', cells: { d: { answer: 'Wann' } } },
        { label: '12 von 40 Notebooks sind betroffen.', cells: { d: { answer: 'Ausmaß', accept: ['ausmass', 'umfang', 'wie viel', 'wieviel'] } } },
      ],
      explanation: 'Was = welcher Dienst/Fehler; Wo = Ort/System; Wann = Zeitpunkt/Situation; Ausmaß = wie viele/wie stark. Der Unterschied (z. B. nur im 2. OG seit Montag) führt zur Ursache – etwa zum Firmware-Update der Access Points im 2. OG.',
    },
    {
      id: 'b06-q054', kind: 'free', skill: 'itsm.analysis', difficulty: 3,
      prompt: 'Seit Donnerstag druckt der Etagendrucker im 1. OG bei manchen Kollegen nur noch Zeichensalat. Betroffen sind 9 PCs mit Windows 11; die 6 PCs mit Windows 10 und alle Notebooks drucken richtig. Am Mittwoch wurde per Softwareverteilung ein neuer Druckertreiber an die Windows-11-Geräte verteilt. Wende die **Ist / Ist-nicht-Analyse** an und leite die wahrscheinliche Ursache und das weitere Vorgehen ab.',
      modelAnswer: 'Was: Ist – Zeichensalat beim Druck auf dem Etagendrucker 1. OG; Ist nicht – andere Druckfehler oder andere Drucker (soweit bekannt). Wo: Ist – 9 Windows-11-PCs; Ist nicht – 6 Windows-10-PCs und die Notebooks am selben Drucker. Wann: Ist – seit Donnerstag; Ist nicht – vor Donnerstag. Ausmaß: 9 von 15 PCs plus Notebooks nicht betroffen. Unterschied/Veränderung: Nur die Windows-11-PCs haben am Mittwoch den neuen Druckertreiber erhalten. Wahrscheinliche Ursache: der neue Treiber (falsche Treiberversion oder falsche Druckersprache). Prüfung: Die Ursache erklärt alle Ist- und Ist-nicht-Angaben. Vorgehen: an einem PC den alten Treiber wiederherstellen (Rollback) und testen; wenn behoben, Rollback bzw. korrigierten Treiber für alle 9 PCs als Change ausrollen, Verteilung stoppen, Problem und Lösung dokumentieren.',
      keywords: ['Was', 'Wo', 'Wann', 'Ausmaß', 'Ist nicht', 'Unterschied', 'Druckertreiber', 'testen', 'Rollback'],
      explanation: 'Die Tabelle Ist / Ist nicht zeigt den einzigen Unterschied: den neuen Treiber auf den Windows-11-PCs. Erst an einem Gerät testen, dann breit beheben.',
    },
    /* ---------- Deeskalation, Eisenhower ---------- */
    {
      id: 'b06-q055', kind: 'table', skill: 'itsm.comm', difficulty: 2,
      prompt: 'Sortiere deine Aufgaben am Montagmorgen in die **Eisenhower-Matrix** ein. Trage **A** (sofort selbst), **B** (terminieren), **C** (delegieren) oder **D** (nicht erledigen) ein.',
      columns: [{ key: 'q', label: 'Feld', type: 'text' }],
      rows: [
        { label: 'Das TLS-Zertifikat des Webshops läuft heute um 18 Uhr ab.', cells: { q: { answer: 'A', accept: ['sofort', 'sofort erledigen'] } } },
        { label: 'Die Netzwerkdokumentation aktualisieren (keine Frist, aber im Notfall wichtig).', cells: { q: { answer: 'B', accept: ['terminieren', 'planen', 'einplanen'] } } },
        { label: 'Ein Kollege bittet sofort um Hilfe beim Formatieren einer Serienbrief-Vorlage; das kann auch das 1st-Level-Team übernehmen.', cells: { q: { answer: 'C', accept: ['delegieren', 'abgeben'] } } },
        { label: 'Den Werbe-Newsletter eines Hardwarehändlers lesen.', cells: { q: { answer: 'D', accept: ['nicht erledigen', 'papierkorb', 'weglassen'] } } },
        { label: 'Den vierteljährlichen Restore-Test der Datensicherung planen.', cells: { q: { answer: 'B', accept: ['terminieren', 'planen', 'einplanen'] } } },
      ],
      hints: ['Wichtig = hat Folgen für Kunden, Sicherheit, Ziele. Dringend = muss jetzt passieren.'],
      explanation: 'Zertifikat läuft heute ab: wichtig + dringend → **A**. Doku und Restore-Test: wichtig, nicht dringend → **B** (fest einplanen, sonst passiert es nie). Serienbrief: dringend für den Kollegen, für deine Aufgaben nicht wichtig, andere können es → **C**. Newsletter: weder noch → **D**.',
    },
    {
      id: 'b06-q056', kind: 'order', skill: 'itsm.comm', difficulty: 1,
      prompt: 'Bringe die Schritte zur **Deeskalation** eines verärgerten Anrufers in eine sinnvolle Reihenfolge.',
      items: ['Ruhig bleiben und ausreden lassen', 'Ärger anerkennen und Verständnis zeigen', 'Sache klären: zusammenfassen und gezielt nachfragen', 'Lösung oder Sofortmaßnahme anbieten', 'Verbindlich vereinbaren: wer macht was bis wann, Ticketnummer', 'Vereinbarung schriftlich bestätigen und einhalten'],
      explanation: 'Erst die Gefühlsebene beruhigen, dann auf die Sachebene wechseln, dann Lösung und verbindliche Absprache.',
    },
    {
      id: 'b06-q057', kind: 'free', skill: 'itsm.comm', difficulty: 2,
      prompt: 'Herr Hansen (Vertriebsleiter) ruft an und schimpft: „Das ist jetzt das dritte Mal diese Woche, dass mein Notebook keine Verbindung zum VPN bekommt! Ihr seid echt unfähig!“ Beschreibe, wie du das Gespräch deeskalierst, und formuliere zwei Beispielsätze.',
      modelAnswer: 'Ich bleibe ruhig, lasse ihn ausreden und nehme den Vorwurf nicht persönlich. Dann erkenne ich seinen Ärger an: „Ich verstehe, dass Sie das ärgert – dreimal in einer Woche ist wirklich zu oft.“ Danach wechsle ich auf die Sachebene, fasse zusammen und frage gezielt (Fehlermeldung, Ort, Internetzugang, seit wann). Ich biete eine Sofortlösung an, z. B. Fernwartung oder ein Ersatzgerät, und vereinbare verbindlich: „Ich verbinde mich jetzt per Fernwartung mit Ihrem Notebook. Falls das nicht hilft, bringt Ihnen ein Kollege bis 11 Uhr ein Ersatzgerät. Ihre Ticketnummer ist 0518.“ Weil der Fehler wiederholt auftritt, lege ich zusätzlich ein Problem-Ticket an und bestätige die Vereinbarung per E-Mail. Bei Beleidigungen setze ich freundlich eine Grenze.',
      keywords: ['ruhig', 'ausreden', 'Verständnis', 'Sachebene', 'Lösung', 'verbindlich', 'Ticketnummer', 'Problem-Ticket'],
      explanation: 'Gefühl anerkennen, Sache klären, konkrete Lösung mit Zeitpunkt anbieten, schriftlich bestätigen – und die wiederkehrende Ursache als Problem untersuchen.',
    },
    {
      id: 'b06-q058', kind: 'match', skill: 'itsm.comm', difficulty: 1,
      prompt: 'Ordne jeder ungünstigen Formulierung eine kundenfreundliche Alternative zu.',
      left: ['„Das kann gar nicht sein.“', '„Dafür bin ich nicht zuständig.“', '„Da müssen Sie erst mal …“', '„Das haben Sie falsch gemacht.“'],
      right: ['„Lassen Sie uns das gemeinsam prüfen.“', '„Ich kläre das mit dem zuständigen Kollegen und melde mich bis 14 Uhr.“', '„Am schnellsten geht es, wenn Sie …“', '„Ich zeige Ihnen, wie es beim nächsten Mal sicher klappt.“'],
      answer: [0, 1, 2, 3],
      explanation: 'Gute Formulierungen zeigen Hilfsbereitschaft, nennen nächste Schritte und vermeiden Vorwürfe.',
    },
  ],
};
