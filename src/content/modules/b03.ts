import type { Module } from '../types';

export const b03: Module = {
  id: 'b03',
  nr: 3,
  area: 'systeme',
  title: 'Software & Lizenzen',
  short: 'Softwarearten und Anwendungssysteme (ERP, WWS, CRM), Anpassung von Standardsoftware und Datenmigration, Lizenzmodelle (Einzelplatz, Volumen, OEM, Subscription), Urheberrecht, Open Source (Copyleft vs. permissiv), Serverlizenzen, Lizenzmanagement, Softwareverteilung und Collaboration.',
  icon: 'FileKey',
  relevance: 'ap1',
  prerequisites: ['b01'],
  generators: ['sys.serverlic'],
  skills: [
    { id: 'lic.types', module: 'b03', title: 'Softwarearten unterscheiden' },
    { id: 'lic.models', module: 'b03', title: 'Lizenzmodelle und Urheberrecht', requires: ['lic.types'] },
    { id: 'lic.oss', module: 'b03', title: 'Open Source, Freeware und Shareware', requires: ['lic.models'] },
    { id: 'lic.server', module: 'b03', title: 'Serverlizenzen und CALs berechnen', requires: ['lic.models'] },
    { id: 'lic.sam', module: 'b03', title: 'Lizenzmanagement und Lizenzbilanz', requires: ['lic.models'] },
    { id: 'lic.deploy', module: 'b03', title: 'Softwareverteilung', requires: ['lic.types'] },
    { id: 'lic.office', module: 'b03', title: 'Office- und Collaboration-Software auswählen', requires: ['lic.models'] },
    { id: 'lic.customizing', module: 'b03', title: 'Standardsoftware anpassen (Konfiguration bis Neuentwicklung) und Daten migrieren', requires: ['lic.types'] },
  ],
  lessons: [
    /* ------------------------------------------------------------ */
    {
      id: 'b03-l01',
      title: 'Softwarearten: System, Anwendung, Standard, Individual',
      minutes: 15,
      relevance: 'ap1',
      skills: ['lic.types'],
      simple: `Software ist wie Kleidung: Standardsoftware ist Kleidung von der Stange (günstig, sofort da, passt ungefähr), Branchensoftware ist Berufskleidung für eine bestimmte Branche, Individualsoftware ist ein Maßanzug (passt genau, ist aber teuer und dauert). Systemsoftware wie Betriebssystem oder Treiber sorgt dafür, dass der Rechner überhaupt läuft. Anwendungssoftware erledigt die eigentliche Arbeit, z. B. Textverarbeitung oder Warenwirtschaft. Die Entscheidung „selbst entwickeln lassen oder kaufen“ heißt Make or Buy.

**Merke:** Systemsoftware betreibt die Hardware, Anwendungssoftware löst Fachaufgaben; Standard = günstig und sofort, Individual = passgenau, aber teuer.`,
      steps: [
        {
          type: 'explain',
          title: 'Software einordnen',
          body: `**Software** ist die Gesamtheit der Programme und zugehörigen Daten. Man unterscheidet grob:

| Art | Aufgabe | Beispiele |
|---|---|---|
| **Systemsoftware** | betreibt und verwaltet die Hardware, Grundlage für alles andere | Betriebssystem, Treiber, Firmware (UEFI) |
| **Dienstprogramme (Tools)** | unterstützen Betrieb und Wartung | Backup-Software, Virenschutz, Packprogramme, Partitionierungswerkzeuge |
| **Entwicklungssoftware** | Software erstellen | Compiler, IDE (z. B. Visual Studio Code), Versionsverwaltung (Git) |
| **Anwendungssoftware** | löst fachliche Aufgaben des Anwenders | Office, Browser, Warenwirtschaft, CAD, Buchhaltung |

**Anwendungssoftware nach Zielgruppe:**

| | **Standardsoftware** | **Branchensoftware** | **Individualsoftware** |
|---|---|---|---|
| Für wen? | viele Anwender, branchenübergreifend | eine bestimmte Branche (z. B. Elektrogroßhandel, Arztpraxis) | genau einen Auftraggeber |
| Beispiele | Microsoft 365, LibreOffice, Browser | Handwerker-/Praxissoftware, Warenwirtschaft für den Elektrohandel | Eigenentwicklung „Kundenportal Krämer“ |
| Kosten | niedrig (auf viele Kunden verteilt) | mittel | hoch (Entwicklung, Pflege) |
| Verfügbarkeit | sofort | sofort, oft Anpassung (Customizing) | erst nach Entwicklung |
| Passgenauigkeit | Prozesse müssen sich anpassen | gut für die Branche | exakt nach Anforderung |
| Support/Weiterentwicklung | durch Hersteller, große Community | Hersteller | abhängig vom Entwickler (Risiko!) |

**Make or Buy:** Lohnt sich die Eigenentwicklung (Individualsoftware) oder kauft man Standardsoftware und passt sie an? Kriterien: Anforderungen, Kosten (Anschaffung und Betrieb), Zeit bis zur Nutzung, Abhängigkeit, Wettbewerbsvorteil.`,
        },
        {
          type: 'visual',
          title: 'Von der Hardware zur Fachanwendung',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Firmware & Treiber', text: 'UEFI, Gerätetreiber – nah an der Hardware.', icon: 'Cpu' },
                { title: 'Betriebssystem', text: 'Windows, Linux, macOS – verwaltet Ressourcen.', icon: 'MonitorCog' },
                { title: 'Dienstprogramme', text: 'Backup, Virenschutz, Archivierung.', icon: 'Wrench' },
                { title: 'Anwendungen', text: 'Standard-, Branchen-, Individualsoftware.', icon: 'AppWindow' },
              ],
            },
          },
          caption: 'Systemsoftware ermöglicht den Betrieb, Anwendungssoftware erledigt die fachliche Arbeit.',
        },
        {
          type: 'example',
          title: 'Warenwirtschaft für die Elektro Krämer GmbH',
          problem: 'Die Elektro Krämer GmbH will ihre veraltete Warenwirtschaft ersetzen. Zur Wahl: (A) Branchensoftware für den Elektrogroßhandel mit Anpassungen, (B) Individualentwicklung durch ein Softwarehaus. Bewerte beide Varianten kurz.',
          steps: [
            { label: 'Branchensoftware', body: 'Schnell verfügbar, bewährt, Hersteller pflegt Updates und gesetzliche Änderungen (z. B. E-Rechnung). Prozesse müssen teils angepasst werden; laufende Lizenz-/Wartungskosten.' },
            { label: 'Individualsoftware', body: 'Passt exakt zu den Abläufen, kann Wettbewerbsvorteil sein. Aber: hohe Entwicklungskosten, lange Projektdauer, Abhängigkeit vom Entwickler, Wartung und Aktualisierung müssen selbst finanziert werden.' },
            { label: 'Empfehlung', body: 'Für Standardprozesse wie Warenwirtschaft ist Branchensoftware meist wirtschaftlicher; Individualentwicklung nur für echte Besonderheiten (z. B. Schnittstelle zum Kundenportal).' },
          ],
          result: 'Branchensoftware mit Customizing ist hier die wirtschaftlichere und risikoärmere Lösung.',
        },
        {
          type: 'check',
          question: {
            id: 'b03-c01', kind: 'match', skill: 'lic.types', difficulty: 1,
            prompt: 'Ordne die Software der passenden Kategorie zu.',
            left: ['Gerätetreiber für den Drucker', 'Microsoft 365', 'Praxisverwaltung für Zahnärzte', 'Eigenentwickeltes Kundenportal'],
            right: ['Systemsoftware', 'Standardsoftware', 'Branchensoftware', 'Individualsoftware'],
            answer: [0, 1, 2, 3],
            explanation: 'Treiber = System; Office = Standard; Praxissoftware = Branche; Eigenentwicklung = Individual.',
          },
        },
        { type: 'practice', title: 'Übung: Softwarearten', questionIds: ['b03-q001', 'b03-q002', 'b03-q003'], count: 3, difficulty: 1 },
        { type: 'summary', points: ['Systemsoftware (OS, Treiber, Firmware) vs. Anwendungssoftware.', 'Standard- vs. Branchen- vs. Individualsoftware.', 'Individual: passgenau, aber teuer und abhängig vom Entwickler.', 'Make or Buy anhand von Kosten, Zeit, Anforderungen, Risiko entscheiden.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b03-l01b',
      title: 'Standardsoftware anpassen, Anwendungssysteme und Datenmigration',
      minutes: 25,
      relevance: 'ap1',
      skills: ['lic.customizing'],
      simple: `Standardsoftware anzupassen ist wie eine neue Küche einzurichten: Zuerst wählst du aus, welche Schränke du überhaupt brauchst (Konfiguration). Dann stellst du die Regalböden auf die passende Höhe (Parametrisierung – Einstellwerte ändern, ohne zu programmieren). Reicht das nicht, baust du über vorgesehene Anschlüsse ein Zusatzgerät ein (Erweiterungsprogrammierung). Erst wenn gar nichts passt, lässt du eine ganz neue Küche schreinern (Neuentwicklung). Beim Umzug ins neue System müssen die alten Daten mit: Das heißt Datenmigration – vorher aufräumen, testen und danach nachzählen.

**Merke:** Reihenfolge: Konfiguration → Parametrisierung → Erweiterungsprogrammierung → Neuentwicklung – so wenig Eingriff wie möglich, damit die Software updatefähig bleibt.`,
      steps: [
        {
          type: 'explain',
          title: 'Typische Anwendungssysteme im Unternehmen',
          body: `In Firmen begegnen dir immer wieder dieselben großen **Anwendungssysteme** (Software für betriebliche Aufgaben). Die Abkürzungen solltest du kennen:

| Abkürzung | Name | Aufgabe | Beispiel bei der Elektro Krämer GmbH |
|---|---|---|---|
| **ERP** | Enterprise Resource Planning | **integrierte Unternehmenssoftware**: Einkauf, Lager, Vertrieb, Finanzbuchhaltung, Personal in **einer** gemeinsamen Datenbank | Auftrag anlegen → Lager bucht ab → Rechnung → Buchhaltung |
| **WWS** | Warenwirtschaftssystem | Warenfluss steuern: Wareneingang, Bestand, Bestellung, Verkauf (oft Teil eines ERP) | Meldebestand für Kabeltrommeln erreicht → Bestellvorschlag |
| **CRM** | Customer Relationship Management | Kundenbeziehungen pflegen: Kontakte, Gesprächsnotizen, Angebote, Verkaufschancen | Außendienst sieht alle Kontakte zum Kunden |
| **SCM** | Supply Chain Management | Lieferkette mit Lieferanten und Logistik planen und abstimmen | Liefertermine des Großhändlers einplanen |
| **DMS** | Dokumentenmanagementsystem | Dokumente digital ablegen, versionieren, finden, revisionssicher archivieren | eingehende Rechnungen scannen und ablegen |

Fast alle diese Systeme werden als **Standard- oder Branchensoftware** gekauft und dann an das Unternehmen **angepasst**.`,
        },
        {
          type: 'explain',
          title: 'Vier Stufen der Anpassung – und Datenmigration',
          body: `Standardsoftware passt nie zu 100 % zu den Abläufen eines Unternehmens. Deshalb wird sie angepasst – und zwar **so wenig wie möglich und so viel wie nötig**. Die Stufen steigen in Aufwand und Risiko:

| Stufe | Was passiert? | Quellcode des Herstellers geändert? | Beispiel |
|---|---|---|---|
| **1. Konfiguration** | vorhandene **Module/Funktionen auswählen** und zusammenstellen | nein | Module „Lager“ und „Einkauf“ aktivieren, „Produktion“ weglassen |
| **2. Parametrisierung** | Verhalten über **Einstellwerte (Parameter)** festlegen | nein | Nummernkreise, Zahlungsfristen, Mahnstufen, Steuersätze, Pflichtfelder, Druckvorlagen |
| **3. Erweiterungsprogrammierung** | **Zusatzfunktionen** über vom Hersteller vorgesehene **Schnittstellen** (API, Add-ins, Skripte) programmieren | nein – eigener Zusatzcode, der Kern bleibt unverändert | Anbindung des Online-Shops, eigener Auswertungsbericht |
| **4. Neuentwicklung** | Software wird **eigens programmiert** (Individualsoftware), weil Standard plus Erweiterung nicht reicht | – (eigener Code) | einzigartige Fertigungssteuerung |

Stufe 1 und 2 nennt man **Customizing** (Anpassung ohne Programmierung). Manche Hersteller und Bücher verwenden „Customizing“ auch als Oberbegriff für jede Anpassung.

**Warum so wenig wie möglich?** Jede Erweiterung muss bei **Updates** geprüft und ggf. angepasst werden, verursacht Kosten und kann den Herstellersupport erschweren. Änderungen direkt im Quellcode des Herstellers (Modifikation) sind besonders riskant und sollten vermieden werden.

**Datenmigration** heißt: Daten aus dem **Altsystem** in das **neue System** übertragen. Typischer Ablauf:

1. **Analysieren:** Welche Daten (Kunden, Artikel, offene Posten …), welche Formate, welche Qualität?
2. **Bereinigen:** Dubletten, veraltete und fehlerhafte Datensätze entfernen oder korrigieren.
3. **Zuordnen (Mapping):** Welches alte Feld kommt in welches neue Feld? Formate umwandeln (Datum, Zeichensatz, Einheiten).
4. **Testmigration** mit einer Kopie und **Kontrolle:** Anzahl der Datensätze, Stichproben, Summen (z. B. Lagerwert) vergleichen.
5. **Altsystem sichern**, Stichtag festlegen (Änderungen im Altsystem einfrieren).
6. **Produktive Migration** durchführen.
7. **Prüfen und abnehmen**; Altsystem bzw. Daten so lange lesbar aufbewahren, wie es Aufbewahrungsfristen verlangen.

**Datenschutz:** Nur die personenbezogenen Daten übernehmen, die noch gebraucht werden (Datenminimierung).`,
        },
        {
          type: 'visual',
          title: 'Anpassungsstufen von Standardsoftware',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: '1. Konfiguration', text: 'Module auswählen – ohne Programmierung.', icon: 'ToggleRight' },
                { title: '2. Parametrisierung', text: 'Einstellwerte festlegen – ohne Programmierung.', icon: 'SlidersHorizontal' },
                { title: '3. Erweiterungsprogrammierung', text: 'Zusatzcode über Schnittstellen, Kern bleibt unverändert.', icon: 'Puzzle' },
                { title: '4. Neuentwicklung', text: 'Eigene Software, wenn nichts Passendes existiert.', icon: 'Code' },
              ],
            },
          },
          caption: 'Von links nach rechts steigen Kosten, Dauer und Risiko bei Updates.',
        },
        {
          type: 'example',
          title: 'Neues Warenwirtschaftssystem bei der Elektro Krämer GmbH',
          problem: 'Die Elektro Krämer GmbH führt eine Branchen-Warenwirtschaft ein. Ordne die Anforderungen ein: (a) Die Kassenfunktion wird nicht gebraucht. (b) Kundennummern sollen mit „K-“ beginnen. (c) Bestellungen aus dem Online-Shop sollen automatisch übernommen werden; der Hersteller bietet dafür eine API. (d) 12.480 Artikel aus dem Altsystem sollen übernommen werden – 312 davon sind Dubletten.',
          steps: [
            { label: '(a)', body: 'Modul nicht aktivieren → **Konfiguration**.' },
            { label: '(b)', body: 'Nummernkreis in den Einstellungen festlegen → **Parametrisierung**.' },
            { label: '(c)', body: 'Eigenes Zusatzprogramm über die Hersteller-Schnittstelle → **Erweiterungsprogrammierung**.' },
            { label: '(d)', body: '**Datenmigration**: zuerst die 312 Dubletten bereinigen, Felder zuordnen, Testmigration; danach kontrollieren, dass 12.480 − 312 = **12.168** Artikel im neuen System sind.' },
          ],
          result: 'Drei der vier Anforderungen lassen sich ohne Eingriff in den Kern der Software lösen – nur die Shop-Anbindung braucht Zusatzcode.',
        },
        {
          type: 'check',
          question: {
            id: 'b03-c09', kind: 'match', skill: 'lic.customizing', difficulty: 1,
            prompt: 'Ordne die Anpassung der passenden Stufe zu.',
            left: ['Modul „Personal“ wird freigeschaltet.', 'Die Mahnfrist wird in den Einstellungen von 14 auf 10 Tage geändert.', 'Über die API wird ein Zusatzprogramm für den Etikettendruck angebunden.', 'Ein Softwarehaus programmiert eine komplett eigene Anwendung.'],
            right: ['Konfiguration', 'Parametrisierung', 'Erweiterungsprogrammierung', 'Neuentwicklung'],
            answer: [0, 1, 2, 3],
            explanation: 'Module wählen = Konfiguration; Einstellwert ändern = Parametrisierung; Zusatzcode über Schnittstelle = Erweiterungsprogrammierung; alles neu = Neuentwicklung.',
          },
        },
        { type: 'practice', title: 'Übung: Anpassung und Datenmigration', questionIds: ['b03-q031', 'b03-q032', 'b03-q033', 'b03-q034', 'b03-q035', 'b03-q036'], count: 6, difficulty: 2 },
        { type: 'summary', points: ['ERP = integrierte Unternehmenssoftware; WWS = Warenwirtschaft; CRM = Kundenbeziehungen; SCM = Lieferkette; DMS = Dokumente.', 'Anpassungsstufen: Konfiguration → Parametrisierung → Erweiterungsprogrammierung → Neuentwicklung.', 'Konfiguration und Parametrisierung = Customizing ohne Programmierung.', 'So wenig Eingriff wie möglich: Updates, Kosten, Support.', 'Datenmigration: analysieren, bereinigen, zuordnen (Mapping), testen, sichern, migrieren, prüfen.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b03-l02',
      title: 'Lizenzmodelle und Urheberrecht',
      minutes: 25,
      relevance: 'ap1',
      skills: ['lic.models'],
      simple: `Eine Lizenz ist wie eine Kinokarte: Du kaufst nicht das Kino, sondern nur das Recht, den Film zu sehen. Software ist durch das Urheberrecht geschützt; wer sie ohne passende Lizenz nutzt, verstößt gegen das Gesetz, und die Firma haftet für ihre Mitarbeitenden. Lizenzen gibt es pro Gerät, pro Benutzer, für gleichzeitige Nutzer, als Mengenpaket (Volumenlizenz), als OEM-Lizenz (fest an einen PC gebunden) oder als Abo. Beim Abo zahlst du laufend – hörst du auf zu zahlen, endet das Nutzungsrecht.

**Merke:** Kauf oder Abo? Der Kauf lohnt sich ab dem Break-even: Kaufpreis / Monatsrate = Anzahl Monate.`,
      steps: [
        {
          type: 'explain',
          title: 'Man kauft nicht die Software – sondern ein Nutzungsrecht',
          body: `Software ist in Deutschland urheberrechtlich geschützt (**§§ 69a ff. UrhG**). Wer Software „kauft“, erwirbt eine **Lizenz** – ein **Nutzungsrecht** zu bestimmten Bedingungen (Lizenzvertrag, **EULA**). Die Rechte am Programm selbst bleiben beim Hersteller.

Wichtige Punkte aus dem UrhG:
- Der Rechteinhaber entscheidet über Vervielfältigung, Bearbeitung und Verbreitung (§ 69c).
- Wer die Software rechtmäßig nutzen darf, darf eine **Sicherungskopie** anlegen, wenn sie für die Nutzung nötig ist – das kann vertraglich nicht verboten werden (§ 69d Abs. 2).
- Wird in einem Unternehmen von Mitarbeitern unlizenziert Software genutzt, haftet auch der **Unternehmensinhaber** (§ 99 UrhG): Unterlassung, Schadensersatz; vorsätzliche unerlaubte Vervielfältigung ist strafbar (§ 106 UrhG).
- **Gebrauchtsoftware:** Dauerhaft erworbene Lizenzen dürfen in der EU grundsätzlich weiterverkauft werden, wenn der Verkäufer seine Kopie unbrauchbar macht (EuGH „UsedSoft“, 2012). Abonnements sind nicht weiterverkaufbar.

**Lizenzmodelle:**

| Modell | Beschreibung | Typisch |
|---|---|---|
| **Einzelplatzlizenz** (pro Gerät) | Installation auf **einem** Gerät | Box-/Retail-Version |
| **Benutzerlizenz** (Named User) | ein **benannter Benutzer** darf auf mehreren Geräten nutzen | Microsoft 365: je Benutzer auf bis zu 5 PCs/Macs, 5 Tablets und 5 Smartphones |
| **Concurrent / Floating** | Anzahl **gleichzeitiger** Nutzer; ein Lizenzserver zählt mit | CAD-Software, Fachanwendungen im Schichtbetrieb |
| **Volumenlizenz** | viele Lizenzen eines Produkts zu Staffelpreisen, zentraler Schlüssel und Verwaltungsportal | Microsoft Enterprise Agreement, CSP |
| **Standort-/Unternehmenslizenz** (Site) | unbegrenzt an einem Standort bzw. im Unternehmen | Hochschulen, Konzerne |
| **OEM-Lizenz** | mit neuer Hardware vorinstalliert, an **dieses Gerät** gebunden, Support über den Gerätehersteller | Windows auf neuen Notebooks |
| **Kauflizenz (dauerhaft, perpetual)** | einmal zahlen, unbegrenzt nutzen (Updates ggf. extra) | Office 2024, Branchensoftware mit Wartungsvertrag |
| **Abonnement (Subscription)** | regelmäßige Zahlung (monatlich/jährlich), immer aktuelle Version, Nutzung endet mit dem Abo | Microsoft 365, Adobe Creative Cloud, SaaS |
| **Test-/Demoversion** | zeitlich oder funktional beschränkt | Trial 30 Tage |

**Kauf vs. Abo – Kostenvergleich:** Ein Abo verursacht keine hohe Einmalinvestition und bringt laufend neue Funktionen; über lange Laufzeiten kann es aber teurer werden als eine Kauflizenz. Deshalb rechnet man den **Break-even** aus (siehe Beispiel).`,
        },
        {
          type: 'visual',
          title: 'Lizenzmodelle im Überblick',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Pro Gerät', text: 'Einzelplatz, OEM, Device-CAL – zählt Installationen bzw. Geräte.', icon: 'MonitorSmartphone' },
                { title: 'Pro Benutzer', text: 'Named User, User-CAL, Microsoft 365 – zählt Personen.', icon: 'Users' },
                { title: 'Gleichzeitig / Volumen / Abo', text: 'Floating (gleichzeitige Nutzung), Volumenverträge, monatliche Miete.', icon: 'Repeat' },
              ],
            },
          },
          caption: 'Vor dem Kauf klären: Was wird gezählt – Geräte, Personen oder gleichzeitige Nutzungen?',
        },
        {
          type: 'example',
          title: 'Kauflizenz oder Abonnement?',
          problem: 'Für einen Arbeitsplatz gibt es ein Office-Paket als Kauflizenz für **420 €** (einmalig) oder als Abo für **12,50 € pro Monat**. Ab welchem Monat ist das Abo teurer? Was spricht trotzdem für das Abo?',
          steps: [
            { label: 'Break-even', body: '420 € / 12,50 € pro Monat = **33,6 Monate**.' },
            { label: 'Interpretation', body: 'Nach 33 Monaten hat das Abo 412,50 € gekostet (günstiger), nach 34 Monaten 425 € (teurer). → Ab dem **34. Monat** ist das Abo teurer.' },
            { label: 'Qualitative Gründe', body: 'Abo: immer aktuelle Version mit Sicherheitsupdates und neuen Funktionen, Cloud-Dienste (Postfach, OneDrive, Teams) inklusive, Nutzung auf mehreren Geräten, monatlich kündbar/skalierbar. Kauf: Version veraltet, Support endet nach einigen Jahren.' },
          ],
          result: 'Rein rechnerisch lohnt sich die Kauflizenz bei mehr als 33 Monaten Nutzung; Zusatzleistungen und Flexibilität des Abos können das ausgleichen.',
        },
        {
          type: 'check',
          question: {
            id: 'b03-c02', kind: 'single', skill: 'lic.models', difficulty: 2,
            prompt: 'Ein neues Notebook wurde mit vorinstalliertem Windows 11 Pro (**OEM**) gekauft. Nach drei Jahren wird das Notebook verschrottet. Darf die Windows-Lizenz auf einen neuen Selbstbau-PC übertragen werden?',
            options: ['Nein, die OEM-Lizenz ist an das ursprüngliche Gerät gebunden.', 'Ja, OEM-Lizenzen sind beliebig übertragbar.', 'Ja, aber nur innerhalb von 30 Tagen.', 'Nur, wenn der neue PC vom selben Hersteller ist.'],
            answer: 0,
            distractors: { '1': { why: 'Übertragbar sind Retail-/Box-Lizenzen; vorinstallierte OEM-Lizenzen gehören zum Gerät.', error: 'lizenz-oem' }, '2': { why: 'Eine solche Frist gibt es nicht.', error: 'lizenz-oem' }, '3': { why: 'Entscheidend ist das konkrete Gerät, nicht der Hersteller.', error: 'lizenz-oem' } },
            explanation: 'Vorinstallierte OEM-Lizenzen sind an die Hardware gebunden, mit der sie ausgeliefert wurden.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'b03-c03', kind: 'number', skill: 'lic.models', difficulty: 2,
            prompt: 'Kauflizenz 600 € einmalig oder Abo 20 € pro Monat. Nach wie vielen Monaten sind die Kosten **genau gleich**?',
            answer: 30, unit: 'Monate',
            explanation: '600 € / 20 € = **30 Monate**.',
          },
        },
        { type: 'practice', title: 'Übung: Lizenzmodelle', questionIds: ['b03-q004', 'b03-q005', 'b03-q006', 'b03-q007', 'b03-q008'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Lizenz = Nutzungsrecht; Software ist nach §§ 69a ff. UrhG geschützt.', 'Unternehmen haften für unlizenzierte Nutzung ihrer Mitarbeiter (§ 99 UrhG).', 'Modelle: pro Gerät, pro Benutzer, gleichzeitig, Volumen, Site, OEM, Kauf, Abo.', 'OEM ist an das Gerät gebunden; Abos enden mit der Zahlung.', 'Kauf vs. Abo: Break-even = Kaufpreis / Monatsrate.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b03-l03',
      title: 'Open Source, Freeware und Shareware',
      minutes: 25,
      relevance: 'ap1',
      skills: ['lic.oss'],
      simple: `Open Source ist wie ein Kochrezept, das jeder lesen, nachkochen, verändern und weitergeben darf. Freeware ist ein fertiges Gericht zum Mitnehmen: kostenlos, aber das Rezept bleibt geheim – und oft nur für private Nutzung erlaubt. Shareware darfst du erst testen und musst danach bezahlen. Bei Open-Source-Lizenzen gibt es zwei Familien: Copyleft (z. B. GPL) verlangt, dass veränderte Versionen bei Weitergabe wieder offen sind; permissive Lizenzen (z. B. MIT) erlauben auch geschlossene Weiterverwendung.

**Merke:** Open Source = Quellcode offen (nutzen, untersuchen, verändern, weitergeben); kostenlos heißt nicht automatisch Open Source.`,
      steps: [
        {
          type: 'explain',
          title: '„Kostenlos“ heißt nicht „frei“',
          body: `| Begriff | Kosten | Quellcode | Was ist erlaubt? |
|---|---|---|---|
| **Open Source** | meist kostenlos (Support/Enterprise-Versionen kosten) | **offen** | nutzen, untersuchen, verändern, weitergeben – nach den Bedingungen der jeweiligen Lizenz |
| **Freeware** | kostenlos | in der Regel **geschlossen** | nutzen – oft nur **privat**; Ändern verboten; gewerbliche Nutzung manchmal ausgeschlossen |
| **Shareware** | erst kostenlos testen, danach zahlen | geschlossen | Testzeitraum oder eingeschränkte Funktionen |
| **Proprietär / kommerziell** | kostenpflichtig | geschlossen | nur gemäß EULA |
| **Public Domain / CC0** | kostenlos | ggf. offen | alles; im deutschen Recht kann man auf das Urheberrecht nicht vollständig verzichten – CC0 kommt dem so nahe wie möglich |

**Open Source** im Sinne der Open Source Initiative (OSI) bzw. **Freie Software** (Free Software Foundation) gewährt vier Freiheiten: Programm für jeden Zweck **nutzen**, **untersuchen** (Quellcode), **verändern** und **weitergeben** (auch verändert).

**Die beiden großen Lizenzfamilien:**

| | **Copyleft** | **Permissiv (freizügig)** |
|---|---|---|
| Kernidee | Wer veränderte Software **weitergibt**, muss sie unter **derselben Lizenz** inkl. Quellcode weitergeben („Freiheit vererbt sich“) | Fast alles erlaubt, auch Einbau in proprietäre (geschlossene) Produkte – nur Lizenz- und Urheberhinweis beibehalten |
| Lizenzen | **GPL** (stark), **AGPL** (auch bei Nutzung über das Netzwerk), **LGPL** und **MPL** (schwach: nur die Bibliothek bzw. geänderte Dateien) | **MIT**, **BSD**, **Apache 2.0** (zusätzlich ausdrückliche Patentlizenz) |
| Beispiele | Linux-Kernel (GPLv2), Nextcloud (AGPLv3), LibreOffice und Firefox (MPL 2.0) | React (MIT), Apache HTTP Server und Kubernetes (Apache 2.0) |

**Wichtig für die Praxis:**
- Die Copyleft-Pflicht greift bei der **Weitergabe** (Verbreitung). Wer GPL-Software intern nutzt und verändert, ohne sie weiterzugeben, muss nichts veröffentlichen. Bei der **AGPL** reicht schon das Anbieten über das Netzwerk (z. B. als Webdienst).
- Auch bei Open Source gelten Lizenzpflichten: Lizenztext beilegen, Urhebervermerke erhalten.
- Open Source heißt nicht „ohne Support“: Für Unternehmen gibt es kostenpflichtige Wartungsverträge (z. B. Red Hat Enterprise Linux, Ubuntu Pro, Nextcloud Enterprise).

**Vorteile Open Source:** keine Lizenzkosten, kein Herstellerzwang (Vendor-Lock-in), offene Formate, Quellcode prüfbar (Sicherheit/Transparenz), große Community. **Nachteile:** Support muss organisiert werden, manchmal weniger Komfort/Kompatibilität (z. B. Makros in Office-Dokumenten), Schulungsaufwand.`,
        },
        {
          type: 'visual',
          title: 'Wie frei ist die Lizenz?',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Proprietär', text: 'Geschlossener Code, Nutzung nur nach EULA, meist kostenpflichtig.', icon: 'Lock' },
                { title: 'Freeware / Shareware', text: 'Kostenlos bzw. erst testen – aber Code geschlossen und oft Einschränkungen.', icon: 'Package' },
                { title: 'Copyleft (GPL)', text: 'Offen; bei Weitergabe müssen Änderungen unter GPL mit Quellcode weitergegeben werden.', icon: 'GitBranch' },
                { title: 'Permissiv (MIT, Apache)', text: 'Offen; darf auch in geschlossene Produkte – Lizenzhinweis behalten.', icon: 'PackageOpen' },
              ],
            },
          },
          caption: 'Kostenlos und frei sind zwei verschiedene Eigenschaften.',
        },
        {
          type: 'example',
          title: 'Darf das Softwarehaus die Bibliothek verwenden?',
          problem: 'Ein Softwarehaus entwickelt für die Elektro Krämer GmbH eine Lagerverwaltung, die als geschlossene Software auch an andere Kunden **verkauft** werden soll. Es möchte (a) eine MIT-lizenzierte Bibliothek und (b) eine GPL-lizenzierte Bibliothek fest in das Programm einbauen. Was ist zu beachten?',
          steps: [
            { label: '(a) MIT', body: 'Permissiv: Einbau in geschlossene Software erlaubt. Pflicht: Copyright- und Lizenzhinweis der Bibliothek beilegen (z. B. in „Info/Lizenzen“).' },
            { label: '(b) GPL', body: 'Starkes Copyleft: Wird das Gesamtprogramm mit der eingebauten GPL-Bibliothek **weitergegeben/verkauft**, muss es als abgeleitetes Werk unter der GPL stehen und der Quellcode muss den Empfängern zur Verfügung gestellt werden – das widerspricht dem geschlossenen Geschäftsmodell.' },
            { label: 'Lösung', body: 'GPL-Bibliothek durch eine permissiv lizenzierte Alternative ersetzen, eine kommerzielle Lizenz des Rechteinhabers erwerben (manche Projekte bieten Doppellizenzen an) oder das Produkt selbst unter GPL veröffentlichen.' },
          ],
          result: 'MIT: unproblematisch mit Hinweis. GPL: bei Weitergabe Copyleft-Pflicht → Alternative oder kommerzielle Lizenz nötig.',
        },
        {
          type: 'check',
          question: {
            id: 'b03-c04', kind: 'single', skill: 'lic.oss', difficulty: 2,
            prompt: 'Was bedeutet **Copyleft**?',
            options: ['Wer eine veränderte Version weitergibt, muss sie unter derselben freien Lizenz inkl. Quellcode weitergeben.', 'Die Software darf nicht kopiert werden.', 'Die Software ist kostenlos, der Quellcode geheim.', 'Der Hersteller behält sich alle Rechte vor.'],
            answer: 0,
            distractors: { '1': { why: 'Copyleft erlaubt gerade das Kopieren und Weitergeben.', error: 'lizenz-copyleft' }, '2': { why: 'Das beschreibt Freeware.', error: 'lizenz-copyleft' }, '3': { why: '„Alle Rechte vorbehalten“ ist das Gegenteil (Copyright ohne Freigabe).', error: 'lizenz-copyleft' } },
            explanation: 'Copyleft „vererbt“ die Freiheiten an abgeleitete Werke – typisch: GPL.',
          },
        },
        { type: 'practice', title: 'Übung: Open Source & Co.', questionIds: ['b03-q009', 'b03-q010', 'b03-q011', 'b03-q012', 'b03-q013'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Open Source: nutzen, untersuchen, verändern, weitergeben.', 'Freeware: kostenlos, aber Code geschlossen, oft nur privat.', 'Shareware: testen, dann bezahlen.', 'Copyleft (GPL, AGPL; schwach: LGPL, MPL) vs. permissiv (MIT, BSD, Apache 2.0).', 'Copyleft-Pflichten greifen bei Weitergabe (AGPL schon bei Netzwerknutzung).'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b03-l04',
      title: 'Serverlizenzen und Zugriffslizenzen (CALs)',
      minutes: 25,
      relevance: 'ap1-teilweise',
      skills: ['lic.server'],
      simple: `Bei Windows Server zahlst du zweimal – wie im Schwimmbad Eintritt und Spind: Einmal lizenzierst du den Server selbst nach Prozessorkernen, zusätzlich braucht jeder Benutzer oder jedes Gerät, das zugreift, eine Zugriffslizenz (CAL, Client Access License). Lizenziert werden alle physischen Kerne, mindestens 8 pro Prozessor und 16 pro Server, verkauft in 2-Kern-Paketen. Eine User-CAL gilt für eine Person an beliebig vielen Geräten, eine Device-CAL für ein Gerät, an dem viele Personen arbeiten.

**Merke:** Alle Kerne lizenzieren (mindestens 8 je CPU, 16 je Server); dazu CALs – User-CAL bei mehreren Geräten pro Person, Device-CAL bei Schichtbetrieb.`,
      steps: [
        {
          type: 'explain',
          title: 'Windows Server richtig lizenzieren',
          body: `Server-Betriebssysteme werden anders lizenziert als Clients. Bei **Windows Server (2022/2025) Standard und Datacenter** gilt das **Core-Modell**:

| Regel | Inhalt |
|---|---|
| Alle Kerne | Alle **physischen Prozessorkerne** des Servers müssen lizenziert werden |
| Mindestmengen | mindestens **8 Core-Lizenzen pro Prozessor** und **16 pro Server** |
| Pakete | verkauft in **2-Core-Paketen** (auch 16er-Pakete) |
| Standard | deckt bei vollständiger Lizenzierung **2 VMs** (Betriebssystemumgebungen) ab; für je 2 weitere VMs müssen **alle Kerne erneut** lizenziert werden |
| Datacenter | **unbegrenzt viele** Windows-Server-VMs auf dem lizenzierten Host |

Zusätzlich braucht **jeder Benutzer oder jedes Gerät**, das auf den Server zugreift (Anmeldung, Dateifreigabe, Druck), eine **Zugriffslizenz (CAL, Client Access License)**:

| | **User-CAL** | **Device-CAL** |
|---|---|---|
| zählt | Personen | Geräte |
| lohnt sich, wenn | jede Person **mehrere Geräte** nutzt (PC, Notebook, Smartphone) | sich **mehrere Personen ein Gerät teilen** (Schichtbetrieb, Empfang, Lager-Terminal) |

Für Remotedesktop-Sitzungen auf einem Server (Remote Desktop Services, Terminalserver) sind zusätzlich **RDS-CALs** nötig. Linux-Server haben keine Lizenzkosten fürs OS; für Enterprise-Distributionen bezahlt man **Subscriptions** (Support, Updates).

Lizenzbedingungen ändern sich – vor einem Kauf immer die aktuellen Produktbedingungen des Herstellers bzw. die Beratung des Händlers heranziehen.`,
        },
        {
          type: 'visual',
          title: 'Core-Lizenzierung auf einen Blick',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: '1 CPU · 6 Kerne', text: 'pro CPU mindestens 8 → 8; pro Server mindestens 16 → 16 Core-Lizenzen = 8 Pakete.', icon: 'Cpu' },
                { title: '2 CPUs · 12 Kerne', text: '2 · 12 = 24 Kerne → 24 Core-Lizenzen = 12 Pakete.', icon: 'Server' },
                { title: 'Standard + 4 VMs', text: 'alle Kerne 2-mal lizenzieren: 2 · 24 = 48 Core-Lizenzen = 24 Pakete.', icon: 'Layers' },
              ],
            },
          },
          caption: 'Zuerst Mindestmengen anwenden, dann mit der VM-Stufe multiplizieren, zuletzt durch 2 teilen.',
        },
        {
          type: 'example',
          title: 'Virtualisierungshost lizenzieren',
          problem: 'Der neue Host der Elektro Krämer GmbH hat **2 Prozessoren mit je 10 Kernen** und soll **5 Windows-Server-VMs** tragen. Wie viele 2-Core-Pakete Windows Server **Standard** sind nötig? Wie viele bei **Datacenter**?',
          steps: [
            { label: 'Kerne', body: 'pro CPU max(8, 10) = 10 → 2 · 10 = 20; Mindestmenge 16 erfüllt → **20 Core-Lizenzen**.' },
            { label: 'Standard', body: '5 VMs → ⌈5 / 2⌉ = 3 Stufen → 3 · 20 = 60 Core-Lizenzen = **30 Pakete**.' },
            { label: 'Datacenter', body: 'unbegrenzte VMs → 20 Core-Lizenzen = **10 Pakete** (Datacenter-Pakete sind aber deutlich teurer).' },
            { label: 'Entscheidung', body: 'Preise vergleichen: Ist 3 · Preis(Standard) > 1 · Preis(Datacenter)? Bei vielen VMs lohnt sich Datacenter.' },
          ],
          result: 'Standard: 30 Pakete; Datacenter: 10 Pakete – entscheidend ist der Preisvergleich.',
        },
        {
          type: 'check',
          question: {
            id: 'b03-c05', kind: 'number', skill: 'lic.server', difficulty: 2,
            prompt: 'Ein Server hat **1 Prozessor mit 6 Kernen**. Wie viele **Core-Lizenzen** Windows Server werden mindestens benötigt?',
            answer: 16, unit: 'Core-Lizenzen',
            misconceptions: [{ answer: '6', error: 'lizenz-mindestmenge', why: 'Mindestens 16 Core-Lizenzen pro Server.' }, { answer: '8', error: 'lizenz-mindestmenge', why: '8 ist die Mindestmenge pro Prozessor – pro Server sind es mindestens 16.' }],
            explanation: 'pro CPU max(8, 6) = 8; pro Server max(16, 8) = **16**.',
          },
        },
        { type: 'practice', title: 'Übung: Core-Lizenzen berechnen', generator: 'sys.serverlic', count: 4, difficulty: 2 },
        { type: 'summary', points: ['Windows Server: alle physischen Kerne, min. 8 je CPU und 16 je Server, 2-Core-Pakete.', 'Standard: 2 VMs je vollständiger Lizenzierung; Datacenter: unbegrenzt.', 'Zusätzlich CALs: User-CAL (Person, mehrere Geräte) oder Device-CAL (Gerät, mehrere Personen).', 'RDS-CALs für Remotedesktop-Sitzungen am Server.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b03-l05',
      title: 'Lizenzmanagement: Lizenzbilanz und Audit',
      minutes: 20,
      relevance: 'ap1',
      skills: ['lic.sam'],
      simple: `Lizenzmanagement ist wie eine Inventur im Getränkelager: Du zählst, was da ist (gekaufte Lizenzen), und vergleichst mit dem, was verbraucht wird (Installationen bzw. Nutzer). Hast du weniger Lizenzen als nötig (Unterlizenzierung), verstößt die Firma gegen das Urheberrecht und riskiert Nachzahlungen bei einer Prüfung (Audit). Hast du mehr Lizenzen als nötig (Überlizenzierung), verschwendest du Geld. Wichtig ist, wonach eine Lizenz zählt: Gerät, Benutzer oder Prozessorkerne.

**Merke:** Lizenzbilanz = vorhandene minus benötigte Lizenzen; negativ heißt nachkaufen, positiv heißt Kosten sparen.`,
      steps: [
        {
          type: 'explain',
          title: 'Wissen, was man hat – und was man braucht',
          body: `**Lizenzmanagement** (Software Asset Management, SAM; Normenreihe ISO/IEC 19770) sorgt dafür, dass ein Unternehmen **rechtssicher** und **wirtschaftlich** lizenziert ist.

**Bausteine:**
1. **Lizenzbestand erfassen:** Lizenznachweise (Rechnungen, Lizenzzertifikate, Verträge, Volumenlizenzportal), Laufzeiten von Abos und Wartungsverträgen.
2. **Installationen/Nutzung erfassen:** Inventarisierung per Software (z. B. Intune, MECM, Open-Source-Tools wie OCS Inventory/GLPI), Benutzer- und Gerätezahlen.
3. **Lizenzbilanz:** Soll (benötigte Lizenzen) gegen Ist (vorhandene Lizenzen) – unter Beachtung der Lizenzmetrik (Gerät, Benutzer, Kerne …).
4. **Maßnahmen:** nachkaufen, deinstallieren, umverteilen, Verträge kündigen.
5. **Prozesse:** Software nur über die IT beschaffen und installieren, Austritte/Gerätetausch melden, regelmäßige Überprüfung.

| Ergebnis der Bilanz | Bedeutung | Risiko |
|---|---|---|
| **Unterlizenzierung** (mehr Nutzung als Lizenzen) | Urheberrechtsverletzung | Nachzahlung, Schadensersatz, Imageschaden; bei Hersteller-**Audit** oft teurer als regulärer Kauf |
| **Überlizenzierung** (mehr Lizenzen als Nutzung) | rechtlich unkritisch | unnötige Kosten |
| ausgeglichen | Ziel | – |

Typische Fehlerquellen: Testversionen, die weiterlaufen; ausgeschiedene Mitarbeiter, deren Abo weiterläuft; private Software auf Firmenrechnern; falsche Edition (z. B. Home statt Pro); virtualisierte Server ohne passende Core-Lizenzen.`,
        },
        {
          type: 'visual',
          title: 'Lizenzbilanz als Kreislauf',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Bestand', text: 'Welche Lizenzen besitzen wir (Nachweise, Verträge, Laufzeiten)?', icon: 'Archive' },
                { title: 'Bedarf', text: 'Was ist installiert / wer nutzt was (Inventarisierung)?', icon: 'Search' },
                { title: 'Bilanz', text: 'Soll gegen Ist: Unter-, Über- oder ausgeglichene Lizenzierung.', icon: 'Scale' },
                { title: 'Maßnahmen', text: 'Nachkaufen, deinstallieren, kündigen, umverteilen – dokumentieren.', icon: 'ListChecks' },
              ],
            },
          },
          caption: 'Lizenzmanagement ist kein einmaliges Projekt, sondern ein regelmäßiger Prozess.',
        },
        {
          type: 'example',
          title: 'Lizenzbilanz der Elektro Krämer GmbH',
          problem: `Inventarisierung und Lizenzbestand:

| Produkt | Lizenzmetrik | Bedarf laut Inventar | vorhandene Lizenzen |
|---|---|---|---|
| CAD-Programm | Einzelplatz (Gerät) | 14 Installationen | 12 |
| PDF-Editor | pro Benutzer | 38 Benutzer | 45 |
| Microsoft 365 Business Standard | pro Benutzer | 118 aktive Benutzer | 125 Abos (davon 9 für ausgeschiedene Mitarbeitende) |

Erstelle die Bilanz.`,
          steps: [
            { label: 'CAD', body: '12 − 14 = **−2** → Unterlizenzierung: 2 Lizenzen nachkaufen oder 2 Installationen entfernen.' },
            { label: 'PDF-Editor', body: '45 − 38 = **+7** → Überlizenzierung: bei Vertragsverlängerung reduzieren.' },
            { label: 'Microsoft 365', body: '125 − 118 = **+7**. Aber: 9 Abos gehören ausgeschiedenen Mitarbeitenden → diese freigeben/neu zuweisen; tatsächlich zugewiesen an Aktive: 125 − 9 = 116 < 118 → 2 aktive Benutzer haben **keine** Lizenz! Lösung: 2 der 9 frei werdenden Abos zuweisen, die übrigen 7 kündigen.' },
          ],
          result: 'CAD unterlizenziert (−2), PDF-Editor überlizenziert (+7), Microsoft 365: Zuweisung korrigieren, 7 Abos kündigen.',
        },
        {
          type: 'check',
          question: {
            id: 'b03-c06', kind: 'number', skill: 'lic.sam', difficulty: 1,
            prompt: 'Eine Software ist auf **57** PCs installiert (Lizenzmetrik: pro Gerät), es sind **50** Lizenzen vorhanden. Wie viele Lizenzen fehlen?',
            answer: 7, unit: 'Lizenzen',
            explanation: '57 − 50 = **7** → Unterlizenzierung.',
          },
        },
        { type: 'practice', title: 'Übung: Lizenzmanagement', questionIds: ['b03-q017', 'b03-q018', 'b03-q019', 'b03-q020'], count: 4, difficulty: 2 },
        { type: 'summary', points: ['SAM = Bestand + Nutzung erfassen, Bilanz ziehen, Maßnahmen ableiten.', 'Unterlizenzierung = Rechtsverstoß und Audit-Risiko.', 'Überlizenzierung = unnötige Kosten.', 'Lizenzmetrik beachten (Gerät, Benutzer, Kerne).', 'Abos ausgeschiedener Mitarbeitender freigeben.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b03-l06',
      title: 'Softwareverteilung',
      minutes: 20,
      relevance: 'ap1',
      skills: ['lic.deploy'],
      simple: `Softwareverteilung ist wie ein Lieferdienst für Programme: Statt an jeden PC zu laufen und von Hand zu installieren, schickt die IT die Software zentral an alle Geräte. Das geht über Images, Gruppenrichtlinien, Verteilsysteme wie Intune oder Paketmanager wie winget. Die Installation läuft „silent“, also ohne Rückfragen an den Benutzer – und der Benutzer braucht keine Admin-Rechte. Bevor alle das Paket bekommen, testet man es an einer kleinen Pilotgruppe.

**Merke:** Ablauf: Paketieren → Testen → Pilot → Rollout → Kontrolle → Dokumentation.`,
      steps: [
        {
          type: 'explain',
          title: 'Software auf 120 Arbeitsplätze bringen',
          body: `Software wird im Unternehmen nicht per USB-Stick von Platz zu Platz getragen. Ziele der **Softwareverteilung**: einheitliche Versionen, Zeitersparnis, Kontrolle über Lizenzen, schnelle Updates, Benutzer brauchen **keine Admin-Rechte**.

| Methode | Funktionsweise | Einsatz |
|---|---|---|
| **Manuell** | Admin installiert vor Ort/per Fernwartung | Einzelfälle |
| **Im Image** | Software ist Teil des Installationsabbilds | Standardsoftware für alle |
| **Gruppenrichtlinie** | MSI-Paket wird per GPO zugewiesen | einfache Domänenumgebungen |
| **Softwareverteilungssystem** | zentrale Konsole: Pakete, Zielgruppen, Zeitpläne, Berichte | Microsoft Intune, Configuration Manager (MECM), opsi (Open Source), Baramundi, Matrix42 |
| **Paketmanager** | Installation per Befehl aus einer Paketquelle | Windows: \`winget\`; Linux: \`apt\`, \`dnf\` |
| **Self-Service-Portal** | Benutzer wählt freigegebene Software selbst aus (Unternehmensportal) | optionale Software |

**Push vs. Pull:** Beim *Push* schickt die Zentrale die Software aktiv auf die Geräte (Pflichtsoftware), beim *Pull* holt der Client/Benutzer sie bei Bedarf ab (Self-Service).

**Unbeaufsichtigte (silent) Installation** – ohne Rückfragen:
- MSI: \`msiexec /i paket.msi /qn\` (/qn = keine Oberfläche)
- winget: \`winget install --id Mozilla.Firefox -e --silent\`
- Linux: \`sudo apt install -y libreoffice\`

**Ablauf einer professionellen Verteilung:** Anforderung/Genehmigung (inkl. Lizenzprüfung) → **Paketieren** (Installation mit festen Parametern, Konfiguration) → **Testen** auf Testgeräten → **Pilotgruppe** → Rollout an alle → Erfolgskontrolle (Berichte) → Dokumentation. Gleiches gilt für die **Deinstallation** (z. B. wenn Lizenzen auslaufen).`,
        },
        {
          type: 'visual',
          title: 'Verteilung mit einem Softwareverteilungssystem',
          widget: {
            kind: 'topology',
            data: {
              nodes: [
                { id: 'adm', type: 'laptop', label: 'Admin-Konsole', sub: 'Paket + Zielgruppe', x: 100, y: 80 },
                { id: 'srv', type: 'server', label: 'Verteilungsserver', sub: 'Paketquelle', x: 360, y: 80 },
                { id: 'cloud', type: 'cloud', label: 'Intune (Cloud)', sub: 'für mobile Geräte', x: 620, y: 80 },
                { id: 'sw', type: 'switch', label: 'Switch', x: 360, y: 220 },
                { id: 'pc1', type: 'pc', label: 'Vertrieb', sub: 'Pilotgruppe', x: 160, y: 350 },
                { id: 'pc2', type: 'pc', label: 'Buchhaltung', x: 360, y: 350 },
                { id: 'nb', type: 'laptop', label: 'Außendienst', sub: 'Homeoffice', x: 620, y: 300 },
              ],
              links: [
                { from: 'adm', to: 'srv', label: 'Auftrag' },
                { from: 'srv', to: 'sw' },
                { from: 'sw', to: 'pc1', label: 'Push' },
                { from: 'sw', to: 'pc2', label: 'Push' },
                { from: 'cloud', to: 'nb', style: 'wan', label: 'Internet' },
                { from: 'adm', to: 'cloud', style: 'wan' },
              ],
            },
          },
          caption: 'Interne PCs erhalten Pakete vom Verteilungsserver, mobile Geräte über einen Clouddienst – gesteuert von einer zentralen Konsole.',
        },
        {
          type: 'example',
          title: 'Neue PDF-Software für alle Arbeitsplätze',
          problem: 'Alle 120 Arbeitsplätze sollen eine neue PDF-Software erhalten; die alte soll entfernt werden. Beschreibe das Vorgehen.',
          steps: [
            { label: 'Lizenz', body: 'Volumenlizenz für 120 Geräte bzw. Benutzer beschaffen, Nachweis ablegen.' },
            { label: 'Paket', body: 'Installationspaket erstellen: Silent-Installation, Lizenzschlüssel, Standardeinstellungen (z. B. als Standard-PDF-Anzeige), Deinstallationsbefehl der Altsoftware.' },
            { label: 'Test & Pilot', body: 'Auf Testgeräten prüfen, dann 10 Pilot-PCs im Vertrieb; Rückmeldungen einholen.' },
            { label: 'Rollout', body: 'Gestaffelt an alle Abteilungen über das Verteilungssystem, außerhalb der Hauptarbeitszeit.' },
            { label: 'Kontrolle & Doku', body: 'Bericht: 117 erfolgreich, 3 fehlgeschlagen → nacharbeiten; Lizenzbestand und Softwareliste aktualisieren, Benutzer informieren.' },
          ],
          result: 'Paketieren → Testen → Pilot → Rollout → Kontrolle → Dokumentation; Alt-Software zeitgleich sauber entfernen.',
        },
        {
          type: 'check',
          question: {
            id: 'b03-c07', kind: 'text', skill: 'lic.deploy', difficulty: 2,
            prompt: 'Wie lautet der Befehl, um `setup.msi` unter Windows **ohne Benutzeroberfläche** zu installieren?',
            accept: ['msiexec /i setup.msi /qn', 'msiexec /i setup.msi /quiet', 'msiexec.exe /i setup.msi /qn', 'msiexec /qn /i setup.msi'],
            explanation: '`msiexec /i setup.msi /qn` – /i installiert, /qn ohne Oberfläche.',
          },
        },
        { type: 'practice', title: 'Übung: Softwareverteilung', questionIds: ['b03-q021', 'b03-q022', 'b03-q023', 'b03-q024'], count: 4, difficulty: 2 },
        { type: 'summary', points: ['Ziele: einheitlich, schnell, kontrolliert, ohne Admin-Rechte der Benutzer.', 'Methoden: Image, GPO (MSI), Verteilungssysteme (Intune, MECM, opsi), Paketmanager, Self-Service.', 'Silent-Installation: msiexec /i … /qn, winget, apt -y.', 'Ablauf: Paketieren → Testen → Pilot → Rollout → Kontrolle → Doku.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b03-l07',
      title: 'Office- und Collaboration-Software',
      minutes: 15,
      relevance: 'ap1-teilweise',
      skills: ['lic.office'],
      simple: `Office-Software auszuwählen ist wie ein Auto zu wählen: Kaufen, leasen oder Carsharing – jedes Modell passt zu anderen Bedürfnissen. Microsoft 365 ist ein Abo mit Cloud-Diensten wie Teams und OneDrive, Office 2024 kaufst du einmal und nutzt es lokal, LibreOffice und Nextcloud sind Open Source und können im eigenen Haus laufen. Entscheide nach Funktionen, Kompatibilität, Kosten, Datenschutz und wie gut es zu den übrigen Systemen passt. Statt Dateien per E-Mail hin und her zu schicken, bearbeiten mehrere Personen ein Dokument gleichzeitig (Co-Authoring).

**Merke:** Abo (Cloud) vs. Kauf (lokal) vs. Open Source – die Auswahl immer mit Funktion, Kompatibilität, Kosten und Datenschutz begründen.`,
      steps: [
        {
          type: 'explain',
          title: 'Zusammenarbeiten statt Dateien mailen',
          body: `Ein moderner Arbeitsplatz besteht nicht nur aus Textverarbeitung und Tabellenkalkulation, sondern aus **Collaboration**: gemeinsames Bearbeiten, Chat, Video, Dateiablage.

| Lösung | Bestandteile | Betrieb | Lizenz |
|---|---|---|---|
| **Microsoft 365** | Word, Excel, PowerPoint, Outlook; Exchange Online, SharePoint, OneDrive, Teams | Cloud (SaaS), Apps lokal | Abo pro Benutzer (Business-Pläne bis 300 Benutzer, darüber Enterprise) |
| **Office 2024 / Office LTSC** | klassische Desktop-Programme ohne Cloud-Dienste | lokal | Kauflizenz (perpetual) |
| **Google Workspace** | Docs, Sheets, Gmail, Drive, Meet | Cloud | Abo pro Benutzer |
| **LibreOffice** | Writer, Calc, Impress | lokal | Open Source (MPL 2.0), kostenlos |
| **Nextcloud** (+ Collabora/ONLYOFFICE) | Dateiablage, Kalender, Talk, Online-Bearbeitung | **selbst betrieben** (eigener Server) oder gehostet | Open Source (AGPLv3), Enterprise-Support kostenpflichtig |

**Auswahlkriterien:** Funktionsumfang, Kompatibilität (Dateiformate: OOXML *.docx/.xlsx* vs. ODF *.odt/.ods*, Makros), Kosten (Lizenz, Betrieb, Schulung), **Datenschutz** (Speicherort, Auftragsverarbeitungsvertrag nach Art. 28 DSGVO), Integration (AD/Entra ID, Telefonie), Verfügbarkeit, Administrierbarkeit, Abhängigkeit vom Anbieter.

**Collaboration-Funktionen sinnvoll nutzen:**
- **Gemeinsames Bearbeiten (Co-Authoring)** statt Dateiversionen per E-Mail („Angebot_final_v3_neu.docx“)
- **Versionsverlauf** – frühere Stände wiederherstellen
- **Freigabelinks** mit Bedacht: „Jeder mit dem Link“ ist bequem, aber riskant – besser „Nur Personen in der Organisation“ bzw. bestimmte Personen, ggf. mit Ablaufdatum
- Teams/Kanäle nach Projekten statt endloser E-Mail-Verteiler`,
        },
        {
          type: 'visual',
          title: 'Drei Betriebsmodelle für Office & Collaboration',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Cloud-Abo (SaaS)', text: 'Microsoft 365, Google Workspace: immer aktuell, Collaboration inklusive, monatliche Kosten, Daten beim Anbieter.', icon: 'Cloud' },
                { title: 'Kauflizenz lokal', text: 'Office 2024/LTSC: einmalige Kosten, keine Cloud-Dienste, Version altert, eigener Mail-/Dateiserver nötig.', icon: 'MonitorCog' },
                { title: 'Open Source selbst betrieben', text: 'LibreOffice + Nextcloud: keine Lizenzkosten, Daten im Haus, aber eigener Betriebs- und Supportaufwand.', icon: 'PackageOpen' },
              ],
            },
          },
          caption: 'Es gibt keine pauschal beste Lösung – sie muss zu Anforderungen, Budget und Datenschutzvorgaben passen.',
        },
        {
          type: 'example',
          title: 'Kostenvergleich für 20 Arbeitsplätze über 3 Jahre',
          problem: `Der Berliner Standort (20 Benutzer) braucht Office-Programme, E-Mail und Dateiablage. Angebot (fiktive Preise, netto):

| Variante | Kosten |
|---|---|
| A: Microsoft 365 Business Standard | 11,70 € pro Benutzer und Monat |
| B: Office 2024 Kauflizenz + bestehender Mail-/Dateiserver | 280 € pro Arbeitsplatz einmalig, Serverbetrieb 900 € pro Jahr |

Vergleiche die Kosten für 3 Jahre.`,
          steps: [
            { label: 'Variante A', body: '20 · 11,70 € · 36 Monate = **8.424 €**.' },
            { label: 'Variante B', body: '20 · 280 € + 3 · 900 € = 5.600 € + 2.700 € = **8.300 €**.' },
            { label: 'Vergleich', body: 'B ist rechnerisch 124 € günstiger – praktisch gleichauf.' },
            { label: 'Qualitativ', body: 'A: Teams, gemeinsames Bearbeiten, immer aktuell, kein eigener Serverbetrieb, aber Cloud/Datenschutz prüfen. B: Daten im Haus, aber Server muss gewartet werden, keine Collaboration-Funktionen, Office-Version altert.' },
          ],
          result: 'Die Kosten sind nahezu gleich – die Entscheidung fällt über Collaboration-Bedarf, Datenschutzanforderungen und Betriebsaufwand.',
        },
        {
          type: 'check',
          question: {
            id: 'b03-c08', kind: 'single', skill: 'lic.office', difficulty: 2,
            prompt: 'Eine Mitarbeiterin teilt ein Angebot aus OneDrive mit einem **„Jeder mit dem Link“**-Freigabelink. Was ist das Hauptrisiko?',
            options: ['Jeder, der den Link erhält oder weiterleitet, kann ohne Anmeldung zugreifen.', 'Die Datei wird automatisch gelöscht.', 'Der Empfänger kann die Datei nur lesen.', 'Die Datei verliert ihren Versionsverlauf.'],
            answer: 0,
            distractors: { '1': { why: 'Freigabelinks löschen nichts.', error: 'collab-freigabe' }, '2': { why: 'Das wäre eher eine Schutzmaßnahme – das Risiko ist der unkontrollierte Zugriff.', error: 'collab-freigabe' }, '3': { why: 'Der Versionsverlauf bleibt erhalten.', error: 'collab-freigabe' } },
            explanation: 'Anonyme Links sind nicht an Personen gebunden – besser auf bestimmte Personen beschränken, ggf. mit Ablaufdatum.',
          },
        },
        { type: 'practice', title: 'Übung: Office und Collaboration', questionIds: ['b03-q025', 'b03-q026', 'b03-q027'], count: 3, difficulty: 2 },
        { type: 'summary', points: ['Microsoft 365 (Abo, Cloud) vs. Office 2024 (Kauf, lokal) vs. Open Source (LibreOffice, Nextcloud).', 'Kriterien: Funktionen, Kompatibilität, Kosten, Datenschutz, Integration, Betrieb.', 'Co-Authoring und Versionsverlauf statt Dateien per E-Mail.', 'Freigabelinks auf Personen beschränken.'] },
      ],
    },
  ],
  questions: [
    { id: 'b03-q001', kind: 'free', skill: 'lic.types', difficulty: 2, prompt: 'Nenne je zwei Vor- und Nachteile von **Individualsoftware** gegenüber Standardsoftware.', modelAnswer: 'Vorteile: exakt auf die Anforderungen und Prozesse des Unternehmens zugeschnitten; kann Wettbewerbsvorteil bieten; keine unnötigen Funktionen; Rechte am Quellcode ggf. beim Auftraggeber. Nachteile: hohe Entwicklungskosten; lange Zeit bis zur Nutzung; Abhängigkeit vom Entwickler bei Wartung und Weiterentwicklung; weniger erprobt (mehr Fehler am Anfang); Schulung und Dokumentation müssen selbst erstellt werden.', keywords: ['passgenau', 'Kosten', 'Zeit', 'Abhängigkeit', 'Wartung'], explanation: 'Je zwei begründete Punkte.' },
    { id: 'b03-q002', kind: 'multi', skill: 'lic.types', difficulty: 1, prompt: 'Welche der folgenden Programme gehören zur **Systemsoftware**?', options: ['Windows 11', 'Netzwerkkartentreiber', 'UEFI-Firmware', 'Microsoft Excel', 'Warenwirtschaftssystem'], answer: [0, 1, 2], explanation: 'Betriebssystem, Treiber und Firmware sind Systemsoftware; Excel und Warenwirtschaft sind Anwendungssoftware.' },
    { id: 'b03-q003', kind: 'text', skill: 'lic.types', difficulty: 1, prompt: 'Wie nennt man Anwendungssoftware, die speziell für die Bedürfnisse **einer bestimmten Branche** (z. B. Handwerksbetriebe) entwickelt wurde?', accept: ['Branchensoftware', 'Branchenlösung', 'Branchen-Software', 'vertikale Software'], explanation: '**Branchensoftware** liegt zwischen Standard- und Individualsoftware.' },
    { id: 'b03-q004', kind: 'match', skill: 'lic.models', difficulty: 2, prompt: 'Ordne das Lizenzmodell der Beschreibung zu.', left: ['OEM-Lizenz', 'Subscription', 'Floating-Lizenz', 'Volumenlizenz', 'Named-User-Lizenz'], right: ['mit neuer Hardware ausgeliefert und an das Gerät gebunden', 'regelmäßige Zahlung, Nutzung endet mit Kündigung', 'begrenzt die Zahl gleichzeitiger Nutzer über einen Lizenzserver', 'viele Lizenzen zu Staffelpreisen mit zentraler Verwaltung', 'ein bestimmter Benutzer darf auf mehreren Geräten nutzen'], answer: [0, 1, 2, 3, 4], explanation: 'Siehe Tabelle der Lizenzmodelle.' },
    { id: 'b03-q005', kind: 'number', skill: 'lic.models', difficulty: 2, prompt: 'Ein CAD-Programm kostet als Kauflizenz **3.240 €** (einmalig) oder im Abo **90 € pro Monat**. Nach wie vielen Monaten hat das Abo **genau so viel** gekostet wie die Kauflizenz?', answer: 36, unit: 'Monate', explanation: '3.240 € / 90 € = **36 Monate** (3 Jahre).' },
    { id: 'b03-q006', kind: 'free', skill: 'lic.models', difficulty: 3, prompt: 'Ein Kollege installiert sich privat gekaufte Software auf seinem Firmen-PC, „weil die Firma sie nicht bezahlen will“. Erläutere die rechtlichen Folgen für das Unternehmen.', modelAnswer: 'Die Lizenz des Kollegen ist in der Regel nur für private Nutzung bzw. sein privates Gerät gültig; die Nutzung im Unternehmen ist dann nicht lizenziert und verletzt das Urheberrecht des Herstellers. Nach § 99 UrhG haftet auch der Inhaber des Unternehmens für Rechtsverletzungen seiner Mitarbeiter (Unterlassung, Schadensersatz nach § 97 UrhG). Bei einem Audit drohen Nachlizenzierung zu ungünstigen Konditionen und Imageschaden. Deshalb darf Software nur über die IT beschafft und installiert werden (Softwarerichtlinie, keine Admin-Rechte für Benutzer).', keywords: ['Urheberrecht', '§ 99', 'Unternehmensinhaber', 'Schadensersatz', 'Audit', 'Richtlinie'], explanation: 'Unternehmenshaftung nach § 99 UrhG ist der Kernpunkt.' },
    { id: 'b03-q007', kind: 'single', skill: 'lic.models', difficulty: 2, prompt: 'Darf ein Unternehmen dauerhaft gekaufte, nicht mehr benötigte Softwarelizenzen an ein anderes Unternehmen **weiterverkaufen**?', options: ['Ja, grundsätzlich – sofern die eigenen Kopien unbrauchbar gemacht werden (EuGH „UsedSoft“).', 'Nein, Softwarelizenzen sind nie übertragbar.', 'Ja, auch Abonnements dürfen weiterverkauft werden.', 'Nur mit notarieller Beglaubigung.'], answer: 0, distractors: { '1': { why: 'Für dauerhaft erworbene Lizenzen hat der EuGH 2012 den Weiterverkauf grundsätzlich erlaubt.', error: 'lizenz-gebraucht' }, '2': { why: 'Ein Abo ist ein Mietverhältnis und kann nicht als „gebraucht“ verkauft werden.', error: 'lizenz-gebraucht' }, '3': { why: 'Eine notarielle Beglaubigung ist nicht vorgeschrieben.', error: 'lizenz-gebraucht' } }, explanation: 'Erschöpfungsgrundsatz: Kauflizenzen sind weiterverkaufbar, der Verkäufer darf die Software dann nicht mehr nutzen.' },
    { id: 'b03-q008', kind: 'free', skill: 'lic.models', difficulty: 2, prompt: 'Erläutere zwei Vorteile und einen Nachteil eines **Abonnement-Modells** (z. B. Microsoft 365) für ein mittelständisches Unternehmen.', modelAnswer: 'Vorteile: keine hohe Anfangsinvestition, Kosten sind planbar und als laufende Betriebskosten verbuchbar; immer aktuelle Version mit Sicherheitsupdates und neuen Funktionen; Lizenzen lassen sich monatlich an die Mitarbeiterzahl anpassen; Cloud-Dienste sind enthalten. Nachteil: über lange Zeit teurer als eine Kauflizenz; Nutzung endet bei Kündigung/Zahlungsausfall; Abhängigkeit vom Anbieter und dessen Preisgestaltung.', keywords: ['Investition', 'aktuell', 'skalierbar', 'teurer', 'Abhängigkeit'], explanation: 'Zwei Vorteile + ein Nachteil, jeweils begründet.' },
    { id: 'b03-q009', kind: 'table', skill: 'lic.oss', difficulty: 2, prompt: 'Fülle die Tabelle aus (**ja**/**nein**).', columns: [{ key: 'k', label: 'kostenlos nutzbar?', type: 'text' }, { key: 'q', label: 'Quellcode offen?', type: 'text' }], rows: [{ label: 'Freeware', cells: { k: { answer: 'ja', accept: ['j'] }, q: { answer: 'nein', accept: ['n'] } } }, { label: 'Open Source (z. B. LibreOffice)', cells: { k: { answer: 'ja', accept: ['j'] }, q: { answer: 'ja', accept: ['j'] } } }, { label: 'Shareware nach der Testphase', cells: { k: { answer: 'nein', accept: ['n'] }, q: { answer: 'nein', accept: ['n'] } } }, { label: 'Proprietäre Kaufsoftware', cells: { k: { answer: 'nein', accept: ['n'] }, q: { answer: 'nein', accept: ['n'] } } }], explanation: 'Freeware: kostenlos, Code geschlossen. Open Source: Code offen (meist kostenlos). Shareware: nach Testphase kostenpflichtig. Proprietär: kostenpflichtig, geschlossen.' },
    { id: 'b03-q010', kind: 'free', skill: 'lic.oss', difficulty: 2, prompt: 'Erkläre den Unterschied zwischen einer **Copyleft-Lizenz** (z. B. GPL) und einer **permissiven Lizenz** (z. B. MIT).', modelAnswer: 'Bei einer Copyleft-Lizenz wie der GPL müssen veränderte oder darauf aufbauende Programme bei der Weitergabe wieder unter derselben Lizenz und mit Quellcode weitergegeben werden – die Freiheiten bleiben erhalten. Eine permissive Lizenz wie MIT erlaubt dagegen fast alles, auch den Einbau in geschlossene, kommerzielle Software; verlangt wird im Wesentlichen nur, den Lizenz- und Urhebervermerk beizubehalten.', keywords: ['Weitergabe', 'gleiche Lizenz', 'Quellcode', 'proprietär', 'Lizenzhinweis'], explanation: 'Copyleft vererbt die Lizenz, permissiv nicht.' },
    { id: 'b03-q011', kind: 'match', skill: 'lic.oss', difficulty: 2, prompt: 'Ordne die Lizenz ihrem Typ zu.', left: ['GPLv3', 'MIT', 'Apache 2.0', 'AGPLv3', 'LGPL'], right: ['starkes Copyleft', 'permissiv', 'permissiv mit ausdrücklicher Patentlizenz', 'Copyleft auch bei Nutzung über das Netzwerk', 'schwaches Copyleft (für Bibliotheken)'], answer: [0, 1, 2, 3, 4], explanation: 'GPL stark, AGPL netzwerkweit, LGPL schwach; MIT und Apache permissiv.' },
    { id: 'b03-q012', kind: 'single', skill: 'lic.oss', difficulty: 3, prompt: 'Die Elektro Krämer GmbH verändert eine GPL-lizenzierte Software und nutzt sie **nur intern**, ohne sie an Dritte weiterzugeben. Muss sie den veränderten Quellcode veröffentlichen?', options: ['Nein, die GPL-Pflichten greifen bei der Weitergabe (Verbreitung).', 'Ja, jede Änderung an GPL-Software muss sofort veröffentlicht werden.', 'Ja, aber nur an den ursprünglichen Autor.', 'Nein, weil GPL-Software nicht verändert werden darf.'], answer: 0, distractors: { '1': { why: 'Die GPL verlangt den Quellcode nur von dem, der die Software weitergibt.', error: 'lizenz-copyleft' }, '2': { why: 'Eine solche Pflicht kennt die GPL nicht.', error: 'lizenz-copyleft' }, '3': { why: 'Verändern ist ausdrücklich erlaubt.', error: 'lizenz-copyleft' } }, explanation: 'Interne Nutzung ohne Weitergabe löst bei der GPL keine Veröffentlichungspflicht aus (anders bei der AGPL, wenn die Software Nutzern über das Netzwerk angeboten wird).' },
    { id: 'b03-q013', kind: 'free', skill: 'lic.oss', difficulty: 2, prompt: 'Die Geschäftsleitung überlegt, von Microsoft Office auf **LibreOffice** umzusteigen, „weil es nichts kostet“. Nenne zwei Vorteile und zwei Risiken.', modelAnswer: 'Vorteile: keine Lizenzkosten; keine Abhängigkeit von einem Hersteller; offenes Standardformat ODF; Quellcode prüfbar, aktive Community; läuft auf Windows, Linux und macOS. Risiken: Kompatibilitätsprobleme mit komplexen Word-/Excel-Dateien und Makros (VBA) von Kunden/Lieferanten; Schulungs- und Umstellungsaufwand; fehlende Integration in vorhandene Systeme (z. B. Teams/SharePoint); Support muss eingekauft oder selbst geleistet werden – kostenlos heißt nicht ohne Gesamtkosten (TCO).', keywords: ['Lizenzkosten', 'ODF', 'Kompatibilität', 'Makros', 'Schulung', 'Support'], explanation: 'Gesamtkosten (TCO) statt nur Lizenzkosten betrachten.' },
    { id: 'b03-q014', kind: 'number', skill: 'lic.server', difficulty: 2, prompt: 'Ein Server mit **2 Prozessoren zu je 6 Kernen** erhält Windows Server Standard (max. 2 VMs). Wie viele **2-Core-Pakete** werden benötigt? (Regeln: alle Kerne, min. 8 je CPU, min. 16 je Server)', answer: 8, unit: 'Pakete', misconceptions: [{ answer: '6', error: 'lizenz-mindestmenge', why: 'Physisch 12 Kerne – aber mindestens 8 pro CPU → 16 Core-Lizenzen = 8 Pakete.' }, { answer: '16', error: 'lizenz-pakete', why: '16 sind die Core-Lizenzen, gefragt sind Pakete (durch 2).' }], explanation: 'pro CPU max(8, 6) = 8 → 16 Core-Lizenzen → **8 Pakete**.' },
    { id: 'b03-q015', kind: 'free', skill: 'lic.server', difficulty: 2, prompt: 'Im Lager teilen sich 3 Schichten mit insgesamt 45 Mitarbeitenden **15 PCs**, die auf einen Windows-Server zugreifen. In der Verwaltung nutzen 30 Personen jeweils PC, Notebook und Smartphone. Welche CAL-Art wählst du jeweils und wie viele? Begründe.', modelAnswer: 'Lager: Device-CALs, weil viele Personen dieselben Geräte nutzen – 15 Device-CALs statt 45 User-CALs. Verwaltung: User-CALs, weil jede Person mehrere Geräte nutzt – 30 User-CALs statt 90 Device-CALs. Insgesamt also 15 Device-CALs + 30 User-CALs.', keywords: ['Device-CAL', '15', 'User-CAL', '30', 'mehrere Geräte'], explanation: 'Gezählt wird jeweils das, was weniger ist: Geräte im Schichtbetrieb, Personen bei Mehrgerätenutzung.' },
    { id: 'b03-q016', kind: 'number', skill: 'lic.server', difficulty: 3, prompt: 'Ein Host (**1 CPU, 16 Kerne**) soll **7 Windows-Server-VMs** mit Windows Server **Standard** betreiben. Wie viele **Core-Lizenzen** sind nötig?', answer: 64, unit: 'Core-Lizenzen', hints: ['⌈7 / 2⌉ Stufen.'], misconceptions: [{ answer: '56', error: 'lizenz-vm-stufen', why: '7 VMs brauchen 4 Stufen (je 2 VMs), nicht 3,5.' }, { answer: '16', error: 'lizenz-vm-stufen', why: 'Eine Lizenzierung deckt nur 2 VMs ab.' }], explanation: '16 Kerne · ⌈7/2⌉ = 16 · 4 = **64 Core-Lizenzen** (32 Pakete).' },
    { id: 'b03-q017', kind: 'table', skill: 'lic.sam', difficulty: 2, prompt: 'Erstelle die Lizenzbilanz. Trage die Differenz (Lizenzen − Bedarf, mit Vorzeichen) und die Bewertung (**unter**, **über** oder **ausgeglichen**) ein.\n\n| Produkt | Bedarf | Lizenzen |\n|---|---|---|\n| Bildbearbeitung | 9 | 6 |\n| Virenschutz | 120 | 125 |\n| Projektsoftware | 15 | 15 |', columns: [{ key: 'd', label: 'Differenz', type: 'number' }, { key: 'b', label: 'Bewertung', type: 'text' }], rows: [{ label: 'Bildbearbeitung', cells: { d: { answer: '-3' }, b: { answer: 'unter', accept: ['unterlizenzierung', 'unterlizenziert'] } } }, { label: 'Virenschutz', cells: { d: { answer: '5', accept: ['+5'] }, b: { answer: 'über', accept: ['ueber', 'überlizenzierung', 'überlizenziert', 'uber'] } } }, { label: 'Projektsoftware', cells: { d: { answer: '0' }, b: { answer: 'ausgeglichen', accept: ['ok', 'passt'] } } }], explanation: '6 − 9 = −3 (unter), 125 − 120 = +5 (über), 15 − 15 = 0 (ausgeglichen).' },
    { id: 'b03-q018', kind: 'free', skill: 'lic.sam', difficulty: 2, prompt: 'Erläutere, warum sowohl **Unter-** als auch **Überlizenzierung** für ein Unternehmen nachteilig ist.', modelAnswer: 'Unterlizenzierung bedeutet, dass mehr Software genutzt wird als lizenziert ist – das ist eine Urheberrechtsverletzung. Es drohen Schadensersatz, Nachlizenzierung zu ungünstigen Konditionen (z. B. nach einem Hersteller-Audit) und Imageschäden; der Unternehmensinhaber haftet. Überlizenzierung ist rechtlich unproblematisch, verursacht aber unnötige Kosten (z. B. ungenutzte Abos), die das Budget belasten.', keywords: ['Urheberrecht', 'Audit', 'Schadensersatz', 'unnötige Kosten'], explanation: 'Unter = Rechtsrisiko; Über = Geldverschwendung.' },
    { id: 'b03-q019', kind: 'order', skill: 'lic.sam', difficulty: 2, prompt: 'Bringe die Schritte des Lizenzmanagements in eine sinnvolle Reihenfolge.', items: ['Lizenznachweise und Verträge sammeln', 'Installationen und Nutzer per Inventarisierung erfassen', 'Lizenzbilanz (Soll/Ist) erstellen', 'Maßnahmen umsetzen (nachkaufen, deinstallieren, kündigen)', 'Ergebnis dokumentieren und regelmäßig wiederholen'], explanation: 'Bestand → Nutzung → Bilanz → Maßnahmen → Dokumentation/Wiederholung.' },
    { id: 'b03-q020', kind: 'number', skill: 'lic.sam', difficulty: 3, prompt: 'Für 125 Microsoft-365-Abos zahlt die Firma **12,50 € pro Benutzer und Monat**. 9 Abos sind ausgeschiedenen Mitarbeitenden zugewiesen und werden nicht mehr gebraucht. Wie viel Euro spart die Firma **pro Jahr**, wenn diese 9 Abos gekündigt werden?', answer: 1350, unit: '€', explanation: '9 · 12,50 € · 12 = **1.350 €** pro Jahr.' },
    { id: 'b03-q021', kind: 'order', skill: 'lic.deploy', difficulty: 2, prompt: 'Bringe die Schritte einer professionellen Softwareverteilung in die richtige Reihenfolge.', items: ['Anforderung prüfen und Lizenz beschaffen', 'Installationspaket erstellen (silent, vorkonfiguriert)', 'Paket auf Testgeräten prüfen', 'Pilotgruppe ausrollen', 'Rollout an alle Zielgeräte', 'Erfolg kontrollieren und dokumentieren'], explanation: 'Lizenz → Paket → Test → Pilot → Rollout → Kontrolle.' },
    { id: 'b03-q022', kind: 'free', skill: 'lic.deploy', difficulty: 2, prompt: 'Nenne drei Vorteile einer zentralen Softwareverteilung gegenüber manuellen Installationen.', modelAnswer: 'Einheitliche Softwarestände auf allen Geräten; Zeitersparnis bei vielen Arbeitsplätzen; Benutzer brauchen keine Administratorrechte (Sicherheit, Least Privilege); schnelle Verteilung von Sicherheitsupdates; Überblick über installierte Software für das Lizenzmanagement; Berichte über Erfolg/Fehler; saubere Deinstallation.', keywords: ['einheitlich', 'Zeit', 'Admin-Rechte', 'Updates', 'Lizenz', 'Bericht'], explanation: 'Drei begründete Vorteile genügen.' },
    { id: 'b03-q023', kind: 'match', skill: 'lic.deploy', difficulty: 2, prompt: 'Ordne das Werkzeug der passenden Beschreibung zu.', left: ['winget', 'msiexec /qn', 'Microsoft Intune', 'opsi', 'apt'], right: ['Paketmanager von Windows (Kommandozeile)', 'stille Installation eines MSI-Pakets', 'cloudbasierte Geräte- und Softwareverwaltung', 'Open-Source-Softwareverteilung', 'Paketmanager unter Debian/Ubuntu'], answer: [0, 1, 2, 3, 4], explanation: 'winget/apt = Paketmanager; msiexec = MSI; Intune = Cloud-MDM; opsi = Open-Source-Verteilung.' },
    { id: 'b03-q024', kind: 'single', skill: 'lic.deploy', difficulty: 2, prompt: 'Was unterscheidet eine **Pull**- von einer **Push**-Verteilung?', options: ['Beim Pull holt sich der Client/Benutzer die Software bei Bedarf, beim Push wird sie zentral aktiv verteilt.', 'Pull installiert nur Updates, Push nur Neuinstallationen.', 'Pull funktioniert nur unter Linux.', 'Push braucht keine Netzwerkverbindung.'], answer: 0, distractors: { '1': { why: 'Beide Verfahren können Neuinstallationen und Updates verteilen.', error: 'verteilung-push-pull' }, '2': { why: 'Self-Service-Portale (Pull) gibt es auch unter Windows.', error: 'verteilung-push-pull' }, '3': { why: 'Beide brauchen eine Verbindung zur Paketquelle.', error: 'verteilung-push-pull' } }, explanation: 'Push = zentral angestoßen (Pflichtsoftware), Pull = vom Client angefordert (Self-Service).' },
    { id: 'b03-q025', kind: 'free', skill: 'lic.office', difficulty: 2, prompt: 'Nenne vier Kriterien, nach denen du eine Office-/Collaboration-Lösung für die Elektro Krämer GmbH auswählst.', modelAnswer: 'Funktionsumfang (Office, E-Mail, Chat, Video, gemeinsames Bearbeiten), Kompatibilität mit Dateiformaten von Kunden/Lieferanten und Makros, Kosten (Lizenzmodell, Betrieb, Schulung – TCO), Datenschutz und Speicherort (DSGVO, Auftragsverarbeitungsvertrag), Integration in vorhandene Systeme (Active Directory/Entra ID, Telefonie), Administrierbarkeit, Verfügbarkeit/SLA, Abhängigkeit vom Anbieter.', keywords: ['Funktion', 'Kompatibilität', 'Kosten', 'Datenschutz', 'Integration', 'Verfügbarkeit'], explanation: 'Vier sinnvolle, begründbare Kriterien.' },
    { id: 'b03-q026', kind: 'number', skill: 'lic.office', difficulty: 2, prompt: '25 Benutzer erhalten ein Office-Abo für **11,70 € pro Benutzer und Monat** (netto). Wie hoch sind die Nettokosten für **ein Jahr**?', answer: 3510, unit: '€', explanation: '25 · 11,70 € · 12 = **3.510 €**.' },
    { id: 'b03-q027', kind: 'single', skill: 'lic.office', difficulty: 2, prompt: 'Welche Lösung erlaubt es, Dateiablage und gemeinsame Dokumentbearbeitung auf einem **eigenen Server** im Unternehmen zu betreiben?', options: ['Nextcloud mit Collabora oder ONLYOFFICE', 'Google Workspace', 'Microsoft 365 Business Standard', 'Office 2024'], answer: 0, distractors: { '1': { why: 'Google Workspace ist ein reiner Clouddienst von Google.', error: 'collab-betrieb' }, '2': { why: 'Microsoft 365 wird in der Microsoft-Cloud betrieben.', error: 'collab-betrieb' }, '3': { why: 'Office 2024 sind lokale Desktop-Programme ohne Dateiablage-/Collaboration-Server.', error: 'collab-betrieb' } }, explanation: 'Nextcloud kann selbst gehostet werden (On-Premises) – Daten bleiben im eigenen Rechenzentrum.' },
    { id: 'b03-q028', kind: 'text', skill: 'lic.models', difficulty: 1, prompt: 'Wie heißt der Lizenzvertrag zwischen Softwarehersteller und Endnutzer, dem man bei der Installation zustimmt? (Abkürzung)', accept: ['EULA', 'End User License Agreement', 'Endbenutzer-Lizenzvertrag', 'Endbenutzerlizenzvertrag'], explanation: '**EULA** – End User License Agreement.' },
    { id: 'b03-q029', kind: 'single', skill: 'lic.models', difficulty: 2, prompt: 'Darf ein Unternehmen von seiner rechtmäßig erworbenen Software eine **Sicherungskopie** anlegen, obwohl die EULA das verbietet?', options: ['Ja, wenn sie für die Sicherung der künftigen Benutzung erforderlich ist – das kann vertraglich nicht untersagt werden (§ 69d Abs. 2 UrhG).', 'Nein, die EULA geht immer vor.', 'Ja, und es darf beliebig viele Kopien weitergeben.', 'Nur mit Genehmigung des Gerichts.'], answer: 0, distractors: { '1': { why: '§ 69d Abs. 2 UrhG lässt sich vertraglich nicht ausschließen.', error: 'urhg-sicherungskopie' }, '2': { why: 'Erlaubt ist nur eine Sicherungskopie, keine Weitergabe.', error: 'urhg-sicherungskopie' }, '3': { why: 'Ein Gericht muss nicht zustimmen.', error: 'urhg-sicherungskopie' } }, explanation: 'Sicherungskopie zur Sicherung der Nutzung ist gesetzlich erlaubt.' },
    { id: 'b03-q030', kind: 'free', skill: 'lic.types', difficulty: 2, prompt: 'Erkläre den Begriff **„Make or Buy“** im Zusammenhang mit Software und nenne zwei Entscheidungskriterien.', modelAnswer: 'Make or Buy ist die Entscheidung, ob ein Unternehmen eine Softwarelösung selbst entwickelt bzw. entwickeln lässt (Make, Individualsoftware) oder fertige Standard-/Branchensoftware kauft und ggf. anpasst (Buy). Kriterien: Kosten (Entwicklung vs. Lizenz und Anpassung, laufende Wartung), Zeit bis zur Einsatzbereitschaft, Erfüllung der Anforderungen, strategische Bedeutung/Wettbewerbsvorteil, Know-how und Abhängigkeit, Risiko.', keywords: ['selbst entwickeln', 'kaufen', 'Kosten', 'Zeit', 'Anforderungen', 'Abhängigkeit'], explanation: 'Definition + zwei Kriterien.' },
    /* ---------- Anpassung, Anwendungssysteme, Datenmigration ---------- */
    {
      id: 'b03-q031', kind: 'table', skill: 'lic.customizing', difficulty: 2,
      prompt: 'Die Elektro Krämer GmbH führt ein ERP-System ein. Welche Anpassungsstufe liegt jeweils vor? Trage **Konfiguration**, **Parametrisierung**, **Erweiterungsprogrammierung** oder **Neuentwicklung** ein.',
      columns: [{ key: 's', label: 'Stufe', type: 'text' }],
      rows: [
        { label: 'Das Modul „Produktion“ wird nicht benötigt und deshalb nicht aktiviert.', cells: { s: { answer: 'Konfiguration' } } },
        { label: 'Rechnungsnummern sollen mit „RE-2027-“ beginnen; dafür gibt es ein Einstellfeld.', cells: { s: { answer: 'Parametrisierung' } } },
        { label: 'Über die vom Hersteller angebotene Schnittstelle (API) wird ein eigenes Programm angebunden, das Bestellungen aus dem Online-Shop überträgt.', cells: { s: { answer: 'Erweiterungsprogrammierung', accept: ['erweiterung'] } } },
        { label: 'Kein Produkt am Markt bildet die eigene Fertigungssteuerung ab; ein Softwarehaus programmiert eine eigene Anwendung.', cells: { s: { answer: 'Neuentwicklung', accept: ['individualsoftware', 'individualentwicklung'] } } },
        { label: 'Die Zahlungsfrist auf Rechnungen wird in den Einstellungen von 30 auf 14 Tage geändert.', cells: { s: { answer: 'Parametrisierung' } } },
      ],
      hints: ['Ohne Programmierung: Module wählen (Konfiguration) oder Werte einstellen (Parametrisierung).', 'Mit Programmierung: Zusatzcode über Schnittstelle oder komplett neu.'],
      explanation: 'Modul an/aus = **Konfiguration**. Nummernkreis und Zahlungsfrist sind Einstellwerte = **Parametrisierung**. Zusatzprogramm über die API = **Erweiterungsprogrammierung** (der Kern bleibt unverändert). Eigene Anwendung = **Neuentwicklung**.\n\nHäufiger Fehler: Konfiguration und Parametrisierung verwechseln. Merkhilfe: Konfiguration = *welche* Teile, Parametrisierung = *wie* sie sich verhalten.',
    },
    {
      id: 'b03-q032', kind: 'order', skill: 'lic.customizing', difficulty: 2,
      prompt: 'Bringe die Schritte einer **Datenmigration** vom alten in das neue Warenwirtschaftssystem in eine sinnvolle Reihenfolge.',
      items: ['Datenbestand des Altsystems analysieren', 'Daten bereinigen (Dubletten, veraltete Sätze)', 'Felder alt → neu zuordnen (Mapping)', 'Testmigration mit einer Kopie durchführen und kontrollieren', 'Altsystem sichern und Stichtag festlegen', 'Produktive Migration durchführen', 'Ergebnis prüfen (Anzahl, Stichproben, Summen) und abnehmen'],
      explanation: 'Erst verstehen und aufräumen, dann zuordnen und testen – und erst nach Sicherung produktiv migrieren und kontrollieren. Fehler in der Testmigration kosten wenig, Fehler im Echtbetrieb viel.',
    },
    {
      id: 'b03-q033', kind: 'free', skill: 'lic.customizing', difficulty: 3,
      prompt: 'Die Vertriebsleitung möchte, dass das neue CRM-System „genau wie die alte Excel-Liste“ aussieht und funktioniert, und schlägt vor, dafür den Quellcode des Herstellers ändern zu lassen. Berate die Vertriebsleitung: Welche Anpassungsstufe empfiehlst du und warum?',
      modelAnswer: 'Ich empfehle, zuerst die Möglichkeiten ohne Programmierung auszuschöpfen: per Konfiguration benötigte Module und Ansichten auswählen und per Parametrisierung Felder, Pflichtfelder, Listenansichten und Vorlagen einstellen. Nur wenn wichtige Anforderungen dann noch fehlen, sollte eine Erweiterung über die vorgesehenen Schnittstellen programmiert werden. Eine Änderung des Hersteller-Quellcodes rate ich ab: Sie verursacht hohe Kosten, muss bei jedem Update neu geprüft und angepasst werden, kann den Herstellersupport bzw. die Gewährleistung gefährden und macht das Unternehmen von einem Entwickler abhängig. Oft ist es wirtschaftlicher, den Ablauf im Vertrieb etwas an den bewährten Standardprozess anzupassen; dazu gehören Schulung der Anwender und eine Datenmigration der Excel-Liste.',
      keywords: ['Konfiguration', 'Parametrisierung', 'Schnittstelle', 'Updates', 'Kosten', 'Support', 'Prozess anpassen'],
      explanation: 'So wenig Eingriff wie möglich: Standard ist updatefähig und günstiger; Quellcodeänderungen sind teuer und riskant.',
    },
    {
      id: 'b03-q034', kind: 'match', skill: 'lic.customizing', difficulty: 1,
      prompt: 'Ordne das Anwendungssystem seiner Hauptaufgabe zu.',
      left: ['ERP', 'WWS', 'CRM', 'SCM', 'DMS'],
      right: ['integrierte Unternehmenssoftware für Einkauf, Lager, Vertrieb, Finanzen und Personal', 'Warenfluss steuern: Wareneingang, Bestand, Bestellung, Verkauf', 'Kundenkontakte, Angebote und Verkaufschancen pflegen', 'Lieferkette mit Lieferanten und Logistik planen', 'Dokumente digital ablegen, versionieren und archivieren'],
      answer: [0, 1, 2, 3, 4],
      explanation: 'ERP = alles integriert; WWS = Waren; CRM = Kunden; SCM = Lieferkette; DMS = Dokumente.',
    },
    {
      id: 'b03-q035', kind: 'free', skill: 'lic.customizing', difficulty: 2,
      prompt: 'Nenne drei **Risiken** einer Datenmigration und jeweils eine Maßnahme dagegen.',
      modelAnswer: 'Datenverlust oder unvollständige Übernahme → vorher vollständige Sicherung des Altsystems, nach der Migration Anzahl der Datensätze und Summen vergleichen. Fehlerhafte oder doppelte Daten werden mitgeschleppt → Daten vor der Migration bereinigen (Dubletten, veraltete Sätze). Falsche Feldzuordnung oder Formatfehler (Datum, Umlaute, Dezimaltrennzeichen) → sorgfältiges Mapping und Testmigration mit Stichproben. Längerer Stillstand → Stichtag außerhalb der Geschäftszeit, Ablauf vorher testen, Rückfallplan. Datenschutzverstoß → nur benötigte personenbezogene Daten übernehmen, Zugriff auf Exportdateien beschränken und sie danach sicher löschen.',
      keywords: ['Sicherung', 'Bereinigung', 'Mapping', 'Testmigration', 'Kontrolle', 'Stichtag', 'Datenschutz'],
      explanation: 'Gute Antworten koppeln jedes Risiko an eine konkrete Gegenmaßnahme.',
    },
    {
      id: 'b03-q036', kind: 'number', skill: 'lic.customizing', difficulty: 2,
      prompt: 'Im alten Warenwirtschaftssystem stehen **12.480** Artikel. Bei der Bereinigung werden **312** Dubletten entfernt und **168** seit Jahren nicht mehr geführte Artikel bewusst nicht übernommen. Wie viele Artikel müssen nach der Migration im neuen System stehen?',
      answer: 12000, unit: 'Artikel',
      misconceptions: [{ answer: '12168', error: 'migration-nur-dubletten', why: 'Du hast nur die Dubletten abgezogen. Auch die 168 bewusst nicht übernommenen Artikel fehlen im neuen System.' }, { answer: '12480', error: 'migration-bereinigung-vergessen', why: 'Die bereinigten Datensätze dürfen im neuen System nicht auftauchen.' }],
      explanation: '**12.000 Artikel.**\n\n12.480 − 312 − 168 = **12.000**.\n\nDiese Zahl ist der Sollwert für die Kontrolle nach der Migration: Stehen mehr oder weniger Artikel im neuen System, ist bei der Übernahme etwas schiefgelaufen.',
    },
  ],
};
