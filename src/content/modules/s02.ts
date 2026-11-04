import type { Module } from '../types';

export const s02: Module = {
  id: 's02',
  nr: 2,
  area: 'sicherheit',
  title: 'Datenschutz nach DSGVO und BDSG',
  short: 'Personenbezogene Daten, Grundsätze und Rechtsgrundlagen, Betroffenenrechte, TOM, Datenschutzbeauftragter, Auftragsverarbeitung, Datenpannen und Bußgelder.',
  icon: 'Scale',
  relevance: 'ap1',
  prerequisites: ['s01'],
  generators: ['sich.bussgeld'],
  skills: [
    { id: 'sich.ds.begriffe', module: 's02', title: 'Personenbezogene Daten und Grundbegriffe der DSGVO erkennen', requires: ['sich.grundbegriffe'] },
    { id: 'sich.ds.grundsaetze', module: 's02', title: 'Grundsätze (Art. 5) und Rechtsgrundlagen (Art. 6, 7) anwenden', requires: ['sich.ds.begriffe'] },
    { id: 'sich.ds.rechte', module: 's02', title: 'Betroffenenrechte und Fristen kennen', requires: ['sich.ds.begriffe'] },
    { id: 'sich.ds.tom', module: 's02', title: 'Technische und organisatorische Maßnahmen (TOM) zuordnen', requires: ['sich.ds.begriffe', 'sich.schutzziele'] },
    { id: 'sich.ds.organisation', module: 's02', title: 'Datenschutzbeauftragter, Auftragsverarbeitung, Datenpanne und Bußgelder', requires: ['sich.ds.grundsaetze'] },
  ],
  lessons: [
    /* ---------------------------------------------------------------- */
    {
      id: 's02-l01',
      title: 'Was sind personenbezogene Daten?',
      minutes: 20,
      relevance: 'ap1',
      skills: ['sich.ds.begriffe'],
      simple: `Personenbezogene Daten sind alles, womit man auf einen bestimmten Menschen kommen kann – nicht nur der Name. Wie bei einem Steckbrief verraten auch Kfz-Kennzeichen, Personalnummer oder IP-Adresse (die Nummer eines Internetanschlusses), wer gemeint ist.
Die **DSGVO** (Datenschutz-Grundverordnung der EU) regelt, was Firmen damit tun dürfen; das **BDSG** (Bundesdatenschutzgesetz) ergänzt sie in Deutschland.
Besonders geschützt sind z. B. Gesundheitsdaten, Religion und Fingerabdrücke.
Ersetzt man den Namen nur durch eine Nummer (**pseudonymisiert**), bleibt es personenbezogen. Erst wenn niemand mehr zurückfinden kann (**anonym**), gilt die DSGVO nicht mehr.

**Merke:** Personenbezogen = ein Mensch ist identifiziert oder identifizierbar, auch indirekt – pseudonym ist noch personenbezogen, anonym nicht.`,
      steps: [
        {
          type: 'explain',
          title: 'DSGVO und BDSG – wer regelt was?',
          body: `Seit dem **25. Mai 2018** gilt in der ganzen EU die **Datenschutz-Grundverordnung (DSGVO)** unmittelbar. Das deutsche **Bundesdatenschutzgesetz (BDSG)** ergänzt sie dort, wo die DSGVO den Mitgliedstaaten Spielraum lässt (z. B. Pflicht zur Benennung eines Datenschutzbeauftragten, Beschäftigtendatenschutz).

**Ziel des Datenschutzes:** Jeder Mensch soll selbst bestimmen können, wer was über ihn weiß – das **Recht auf informationelle Selbstbestimmung**.

**Personenbezogene Daten** (Art. 4 Nr. 1 DSGVO) sind **alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen**. „Identifizierbar“ heißt: Die Person kann **direkt oder indirekt** – z. B. über eine Kennnummer oder durch Kombination mehrerer Merkmale – bestimmt werden.

| personenbezogen | **nicht** personenbezogen |
|---|---|
| Name, Anschrift, Geburtsdatum | Daten einer **juristischen Person** (Umsatz der Elektro Krämer GmbH) |
| E-Mail-Adresse *max.mueller@kraemer-elektro.de* | wirklich **anonyme** Statistik („42 % der Kunden kommen aus Hamburg“) |
| Personalnummer, Kundennummer, Kfz-Kennzeichen | technische Messwerte ohne Bezug zu einer Person |
| **IP-Adresse** (in der Regel, da über den Provider zuordenbar) | |
| Foto, Stimmaufnahme, Standortdaten | |
| Anmeldedaten und Protokolle („Benutzer mmueller hat um 7:58 Uhr …“) | |

**Besondere Kategorien** (Art. 9 DSGVO) – besonders sensibel, Verarbeitung **grundsätzlich verboten**, nur mit Ausnahmen (z. B. ausdrückliche Einwilligung, Arbeitsrecht):
- rassische und ethnische Herkunft
- politische Meinungen
- religiöse oder weltanschauliche Überzeugungen
- Gewerkschaftszugehörigkeit
- genetische Daten
- **biometrische Daten** zur eindeutigen Identifizierung (z. B. Fingerabdruck-Login!)
- **Gesundheitsdaten** (z. B. Krankmeldungen mit Diagnose)
- Sexualleben oder sexuelle Orientierung`,
        },
        {
          type: 'explain',
          title: 'Wichtige Begriffe aus Art. 4 DSGVO',
          body: `| Begriff | Bedeutung | Beispiel |
|---|---|---|
| **Verarbeitung** | **jeder** Vorgang mit personenbezogenen Daten: erheben, speichern, verändern, abfragen, übermitteln, löschen, vernichten … | Auch das bloße Speichern einer Visitenkarte im CRM oder das Löschen ist Verarbeitung. |
| **Verantwortlicher** | wer **über Zwecke und Mittel** der Verarbeitung entscheidet | die Elektro Krämer GmbH für ihre Kundendaten |
| **Auftragsverarbeiter** | verarbeitet Daten **im Auftrag und nach Weisung** des Verantwortlichen | Cloud-Anbieter, externes Rechenzentrum, Dienstleister für Lohnabrechnung |
| **Betroffene Person** | die Person, um deren Daten es geht | Kunde, Mitarbeiter, Bewerber |
| **Pseudonymisierung** | Daten werden so ersetzt, dass sie **nur mit Zusatzwissen** (getrennt aufbewahrt) zugeordnet werden können | Mitarbeiter-ID „M-0815“ statt Name in einer Auswertung |
| **Anonymisierung** | Personenbezug wird **endgültig** entfernt – niemand kann ihn wiederherstellen | Statistik ohne Einzeldaten |

**Prüfungsfalle:** **Pseudonymisierte** Daten sind **weiterhin personenbezogen** (die Zuordnung ist ja noch möglich) – die DSGVO gilt also. Nur echt **anonyme** Daten fallen nicht unter die DSGVO.

Die DSGVO gilt **nicht** für rein persönliche oder familiäre Tätigkeiten (das private Adressbuch), wohl aber für jedes Unternehmen, jeden Verein und jede Behörde – unabhängig von der Größe.`,
        },
        {
          type: 'example',
          title: 'Personenbezug prüfen',
          problem: `Welche Daten aus dem Alltag der Elektro Krämer GmbH sind personenbezogen?
1. Die Logdatei des Webservers mit IP-Adressen und Uhrzeiten
2. Der Jahresumsatz der Filiale Berlin
3. Eine Excel-Liste „Mitarbeiter-ID, Fehltage“ – die Zuordnungstabelle ID ↔ Name liegt in der Personalabteilung
4. Die Fingerabdruckvorlage für den Zutritt zum Serverraum`,
          steps: [
            { label: '1', body: '**Ja** – IP-Adressen sind in der Regel personenbezogen, da die Person über den Provider ermittelbar ist.' },
            { label: '2', body: '**Nein** – Umsatzzahlen einer Filiale betreffen das Unternehmen, keine natürliche Person (anders bei einem Einzelunternehmer!).' },
            { label: '3', body: '**Ja** – das ist eine **Pseudonymisierung**, keine Anonymisierung. Mit der Zuordnungstabelle ist der Bezug herstellbar. Fehltage können zudem Gesundheitsbezug haben.' },
            { label: '4', body: '**Ja, sogar besondere Kategorie** – biometrische Daten zur eindeutigen Identifizierung (Art. 9).' },
          ],
          result: '1, 3 und 4 sind personenbezogen (4 sogar besonders schutzwürdig); 2 nicht.',
        },
        {
          type: 'check',
          question: {
            id: 's02-c01', kind: 'multi', skill: 'sich.ds.begriffe', difficulty: 1,
            prompt: 'Welche Angaben sind **personenbezogene Daten** im Sinne der DSGVO?',
            options: ['Die private Handynummer eines Kunden', 'Die Personalnummer 4711 eines Mitarbeiters', 'Die Anzahl verkaufter Steckdosen im Mai', 'Das Kfz-Kennzeichen eines Firmenwagens, der einem Außendienstler fest zugeordnet ist', 'Der Firmenname „Elektro Krämer GmbH“'],
            answer: [0, 1, 3],
            explanation: 'Handynummer, Personalnummer und ein einer Person zugeordnetes Kennzeichen machen eine natürliche Person identifizierbar. Absatzzahlen und der Name einer GmbH (juristische Person) sind nicht personenbezogen.',
          },
        },
        {
          type: 'check',
          question: {
            id: 's02-c02', kind: 'single', skill: 'sich.ds.begriffe', difficulty: 2,
            prompt: 'In einer Auswertung werden Namen durch Kennungen ersetzt; die Zuordnungsliste liegt verschlossen in der Personalabteilung. Was gilt?',
            options: ['Die Daten sind pseudonymisiert und weiterhin personenbezogen – die DSGVO gilt.', 'Die Daten sind anonymisiert – die DSGVO gilt nicht mehr.', 'Die Daten sind verschlüsselt und dürfen frei weitergegeben werden.', 'Die Daten sind besondere Kategorien nach Art. 9.'],
            answer: 0,
            distractors: {
              '1': { why: 'Anonym wären die Daten nur, wenn der Personenbezug von niemandem wiederhergestellt werden kann. Hier existiert eine Zuordnungsliste.', error: 'pseudonym-anonym' },
              '2': { why: 'Pseudonymisierung ist keine Verschlüsselung, und auch verschlüsselte Daten bleiben personenbezogen.', error: 'pseudonym-anonym' },
              '3': { why: 'Ob besondere Kategorien vorliegen, hängt vom Inhalt (z. B. Gesundheit) ab, nicht von der Pseudonymisierung.', error: 'pseudonym-anonym' },
            },
            explanation: 'Pseudonymisierung (Art. 4 Nr. 5) ist eine gute Schutzmaßnahme, hebt den Personenbezug aber nicht auf.',
          },
        },
        { type: 'practice', title: 'Übung: Grundbegriffe', questionIds: ['s02-q001', 's02-q002', 's02-q003', 's02-q004', 's02-q005'], count: 4, difficulty: 1 },
        {
          type: 'summary',
          points: [
            'DSGVO gilt EU-weit seit 25.05.2018; das BDSG ergänzt sie in Deutschland.',
            'Personenbezogen = jede Information zu einer identifizierten oder identifizierbaren natürlichen Person (auch IP-Adresse, Personalnummer).',
            'Art. 9: besondere Kategorien (Gesundheit, Biometrie, Religion, Gewerkschaft …) – grundsätzlich verboten, nur mit Ausnahmen.',
            'Verarbeitung = jeder Umgang, auch Speichern und Löschen.',
            'Pseudonymisiert = weiterhin personenbezogen; nur anonymisierte Daten fallen nicht unter die DSGVO.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's02-l02',
      title: 'Grundsätze und Rechtmäßigkeit der Verarbeitung',
      minutes: 25,
      relevance: 'ap1',
      skills: ['sich.ds.grundsaetze'],
      simple: `Mit personenbezogenen Daten ist es wie mit einem geliehenen Schlüssel: Du darfst ihn nur mit gutem Grund benutzen, nur wofür er gedacht ist und nur so lange wie nötig.
Die DSGVO nennt das „Verbot mit Erlaubnisvorbehalt“: Erst einmal ist alles verboten – außer eine **Rechtsgrundlage** erlaubt es (z. B. Vertrag, Gesetz oder Einwilligung).
Dazu kommen Grundsätze wie **Zweckbindung** (nur für den genannten Zweck), **Datenminimierung** (nur so viel wie nötig) und **Speicherbegrenzung** (nur so lange wie nötig).
Eine Einwilligung zählt nur, wenn jemand aktiv und freiwillig zustimmt – ein vorangekreuztes Kästchen reicht nicht.

**Merke:** Ohne Rechtsgrundlage nach Art. 6 DSGVO keine Verarbeitung – und immer nur so viel, so lange und wofür es nötig ist.`,
      steps: [
        {
          type: 'explain',
          title: 'Die Grundsätze nach Art. 5 DSGVO',
          body: `Art. 5 DSGVO ist das „Grundgesetz“ jeder Datenverarbeitung:

| Grundsatz | Bedeutung | Beispiel aus der IT |
|---|---|---|
| **Rechtmäßigkeit, Treu und Glauben, Transparenz** | nur mit Rechtsgrundlage, fair und für die Betroffenen nachvollziehbar | Datenschutzhinweise im Webshop |
| **Zweckbindung** | nur für **festgelegte, eindeutige** Zwecke erheben – keine Zweckentfremdung | Lieferadresse nicht ungefragt für Werbung nutzen |
| **Datenminimierung** | nur so viele Daten wie **für den Zweck nötig** | Newsletter braucht die Mailadresse, nicht das Geburtsdatum |
| **Richtigkeit** | Daten sachlich richtig und aktuell halten | veraltete Adressen korrigieren |
| **Speicherbegrenzung** | nur so **lange** speichern wie nötig – danach löschen | Bewerbungsunterlagen einige Monate nach Absage löschen |
| **Integrität und Vertraulichkeit** | angemessene **Sicherheit** durch technische und organisatorische Maßnahmen | Verschlüsselung, Zugriffsrechte, Backup |

Dazu kommt Art. 5 Abs. 2: **Rechenschaftspflicht** – der Verantwortliche muss die Einhaltung **nachweisen** können (Dokumentation!).

**Verbot mit Erlaubnisvorbehalt:** Die Verarbeitung personenbezogener Daten ist **verboten, es sei denn**, eine Rechtsgrundlage erlaubt sie. Die wichtigsten stehen in **Art. 6 Abs. 1 DSGVO**:

| Buchst. | Rechtsgrundlage | Beispiel |
|---|---|---|
| **a** | **Einwilligung** der betroffenen Person | Newsletter-Anmeldung mit Häkchen (Double-Opt-in) |
| **b** | **Vertrag** oder vorvertragliche Maßnahmen | Lieferadresse für eine Bestellung, Gehaltsabrechnung für den Arbeitsvertrag |
| **c** | **rechtliche Verpflichtung** | Aufbewahrung von Rechnungen nach Handels- und Steuerrecht |
| **d** | lebenswichtige Interessen | Notfall: Daten an den Rettungsdienst |
| **e** | öffentliches Interesse / öffentliche Gewalt | Behörden |
| **f** | **berechtigtes Interesse** – sofern die Interessen der Betroffenen nicht überwiegen (Abwägung!) | Videoüberwachung des Lagers zum Diebstahlschutz (mit Hinweisschild) |`,
        },
        {
          type: 'explain',
          title: 'Die Einwilligung richtig gestalten (Art. 7)',
          body: `Eine wirksame **Einwilligung** muss
- **freiwillig** sein (kein Zwang, keine Kopplung an etwas Unnötiges),
- für einen **bestimmten Fall** und **informiert** erfolgen (Betroffene wissen, wozu),
- **unmissverständlich** durch eine eindeutige Handlung erteilt werden – **vorangekreuzte Kästchen** sind **keine** wirksame Einwilligung,
- **nachweisbar** sein (Protokoll, z. B. beim Double-Opt-in),
- **jederzeit widerrufbar** sein – und der Widerruf muss **so einfach** sein wie die Erteilung. Der Widerruf wirkt für die Zukunft.

Bei Kindern unter **16 Jahren** ist für Online-Dienste die Zustimmung der Eltern nötig (Art. 8; Deutschland nutzt keine niedrigere Grenze).

**Wichtig:** Ist die Verarbeitung für einen Vertrag nötig (Art. 6 Abs. 1 b), braucht man **keine** Einwilligung. Holt man trotzdem eine ein, kann das sogar schaden: Wird sie widerrufen, entsteht Verwirrung über die Rechtsgrundlage.`,
        },
        {
          type: 'example',
          title: 'Rechtsgrundlage für die Verarbeitung finden',
          problem: `Bestimme für jede Verarbeitung bei der Elektro Krämer GmbH die passende Rechtsgrundlage nach Art. 6 Abs. 1 DSGVO:
1. Der Webshop speichert die Lieferadresse eines Kunden.
2. Rechnungen werden nach Handels- und Steuerrecht aufbewahrt.
3. Kunden sollen einen monatlichen Newsletter erhalten.
4. Die Firewall protokolliert IP-Adressen, um Angriffe zu erkennen.`,
          steps: [
            { label: '1', body: 'Erforderlich zur Vertragserfüllung → **Art. 6 Abs. 1 b** (Vertrag).' },
            { label: '2', body: 'Gesetzliche Aufbewahrungspflicht → **Art. 6 Abs. 1 c** (rechtliche Verpflichtung).' },
            { label: '3', body: 'Werbung ohne Vertragsbezug → **Art. 6 Abs. 1 a** (Einwilligung, nachweisbar per Double-Opt-in).' },
            { label: '4', body: 'Schutz der IT-Systeme → **Art. 6 Abs. 1 f** (berechtigtes Interesse) – mit kurzer Speicherdauer und Zweckbindung (nur für Sicherheit, nicht zur Leistungskontrolle).' },
          ],
          result: '1 b (Vertrag) · 2 c (rechtliche Pflicht) · 3 a (Einwilligung) · 4 f (berechtigtes Interesse).',
        },
        {
          type: 'check',
          question: {
            id: 's02-c03', kind: 'match', skill: 'sich.ds.grundsaetze', difficulty: 2,
            prompt: 'Welcher Grundsatz aus Art. 5 DSGVO wird jeweils verletzt?',
            left: ['Für das Gewinnspiel werden Geburtsdatum, Religion und Gehalt abgefragt.', 'Die Lieferadressen aus dem Webshop werden ungefragt an ein Werbeunternehmen verkauft.', 'Bewerbungsunterlagen abgelehnter Bewerber liegen seit 6 Jahren auf dem Fileserver.', 'Personaldaten liegen auf einer Freigabe, auf die alle Mitarbeitenden Zugriff haben.'],
            right: ['Datenminimierung', 'Zweckbindung', 'Speicherbegrenzung', 'Integrität und Vertraulichkeit'],
            answer: [0, 1, 2, 3],
            explanation: 'Zu viele Daten → Datenminimierung; anderer Zweck → Zweckbindung; zu lange gespeichert → Speicherbegrenzung; ungeschützt → Integrität und Vertraulichkeit.',
          },
        },
        {
          type: 'check',
          question: {
            id: 's02-c04', kind: 'single', skill: 'sich.ds.grundsaetze', difficulty: 2,
            prompt: 'Im Bestellformular des Webshops ist das Kästchen „Ja, ich möchte den Newsletter erhalten“ bereits **vorangekreuzt**. Liegt eine wirksame Einwilligung vor?',
            options: ['Nein – eine Einwilligung erfordert eine eindeutige aktive Handlung; vorangekreuzte Kästchen genügen nicht.', 'Ja – der Kunde hätte das Häkchen ja entfernen können.', 'Ja, wenn der Kunde älter als 16 Jahre ist.', 'Eine Einwilligung ist für Newsletter nie nötig.'],
            answer: 0,
            distractors: {
              '1': { why: 'Schweigen oder Untätigkeit ist keine Einwilligung (Erwägungsgrund 32; EuGH „Planet49“).', error: 'einwilligung-unwirksam' },
              '2': { why: 'Das Alter ändert nichts daran, dass die Handlung aktiv und eindeutig sein muss.', error: 'einwilligung-unwirksam' },
              '3': { why: 'Werbe-Newsletter ohne bestehende Kundenbeziehung brauchen in der Regel eine Einwilligung (auch nach UWG).', error: 'einwilligung-unwirksam' },
            },
            explanation: 'Wirksame Einwilligung: freiwillig, informiert, eindeutig durch aktive Handlung, nachweisbar, jederzeit widerrufbar.',
          },
        },
        { type: 'practice', title: 'Übung: Grundsätze und Rechtsgrundlagen', questionIds: ['s02-q006', 's02-q007', 's02-q008', 's02-q009', 's02-q010', 's02-q011'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Art. 5: Rechtmäßigkeit/Transparenz, Zweckbindung, Datenminimierung, Richtigkeit, Speicherbegrenzung, Integrität & Vertraulichkeit + Rechenschaftspflicht.',
            'Verbot mit Erlaubnisvorbehalt: Ohne Rechtsgrundlage keine Verarbeitung.',
            'Art. 6 Abs. 1: a Einwilligung, b Vertrag, c rechtliche Pflicht, d lebenswichtig, e öffentlich, f berechtigtes Interesse.',
            'Einwilligung: freiwillig, informiert, aktiv, nachweisbar, jederzeit einfach widerrufbar – kein vorangekreuztes Kästchen.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's02-l03',
      title: 'Rechte der betroffenen Personen',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['sich.ds.rechte'],
      simple: `Jeder Mensch darf eine Firma fragen: „Was wisst ihr über mich?“ – wie ein Kontoauszug für die eigenen Daten (**Auskunft**).
Er darf falsche Daten korrigieren lassen (**Berichtigung**), nicht mehr benötigte löschen lassen (**Löschung**) und Werbung jederzeit widersprechen (**Widerspruch**).
Die Firma muss innerhalb **eines Monats** antworten und vorher prüfen, ob die Anfrage wirklich von dieser Person kommt.
Muss die Firma Daten gesetzlich aufbewahren (z. B. Rechnungen), werden sie gesperrt statt gelöscht.

**Merke:** Antwort innerhalb eines Monats (Verlängerung um zwei Monate nur mit Begründung) – gesetzliche Aufbewahrungspflichten gehen dem Löschen vor.`,
      steps: [
        {
          type: 'explain',
          title: 'Was Betroffene verlangen können',
          body: `Die DSGVO gibt jeder Person Rechte gegenüber dem Verantwortlichen:

| Artikel | Recht | Inhalt |
|---|---|---|
| Art. 13/14 | **Information** | Bei der Erhebung muss informiert werden: wer verarbeitet, wozu, auf welcher Rechtsgrundlage, wie lange, welche Rechte (→ Datenschutzerklärung) |
| **Art. 15** | **Auskunft** | Welche Daten sind gespeichert, wozu, woher, an wen weitergegeben, wie lange? Inkl. **Kopie** der Daten |
| **Art. 16** | **Berichtigung** | falsche Daten korrigieren, unvollständige vervollständigen |
| **Art. 17** | **Löschung** („Recht auf Vergessenwerden“) | z. B. wenn der Zweck entfallen ist oder die Einwilligung widerrufen wurde |
| **Art. 18** | **Einschränkung der Verarbeitung** | Daten werden „gesperrt“ statt gelöscht, z. B. während die Richtigkeit geprüft wird |
| **Art. 20** | **Datenübertragbarkeit** | Daten in einem **strukturierten, gängigen, maschinenlesbaren** Format erhalten (z. B. CSV, JSON) |
| **Art. 21** | **Widerspruch** | gegen Verarbeitung auf Basis berechtigter Interessen; gegen **Direktwerbung** immer und ohne Begründung |
| Art. 22 | keine rein **automatisierte Entscheidung** | z. B. Kreditablehnung allein durch einen Algorithmus nur mit Ausnahmen |
| Art. 77 | **Beschwerde** | bei der Datenschutz-Aufsichtsbehörde (in Hamburg: Hamburgischer Beauftragter für Datenschutz und Informationsfreiheit) |

**Fristen und Form (Art. 12):** Antwort **unverzüglich**, spätestens **innerhalb eines Monats** nach Eingang. Bei komplexen oder vielen Anträgen ist eine **Verlängerung um weitere zwei Monate** möglich – die betroffene Person muss aber innerhalb des ersten Monats darüber informiert werden. Die Auskunft ist grundsätzlich **kostenlos**. Vorher sollte man die **Identität** des Antragstellers prüfen – sonst gibt man Daten an den Falschen heraus (Datenpanne!).

**Grenzen des Löschrechts:** Gesetzliche **Aufbewahrungspflichten** gehen vor. Rechnungen eines Kunden dürfen nicht gelöscht werden, solange die handels- und steuerrechtliche Frist läuft (für Buchungsbelege seit 2025 in der Regel 8 Jahre). Dann werden die Daten **gesperrt** (Einschränkung) und nach Fristablauf gelöscht.`,
        },
        {
          type: 'example',
          title: 'Ein Löschantrag erreicht die IT',
          problem: 'Ein ehemaliger Kunde schreibt am 3. März: „Löschen Sie alle meine Daten!“ Im System gibt es: sein Kundenkonto im Webshop, Newsletter-Abo, drei Rechnungen aus 2025, ein Support-Ticket von 2024. Wie geht die Elektro Krämer GmbH vor?',
          steps: [
            { label: 'Identität prüfen', body: 'Stammt der Antrag wirklich vom Kunden? (z. B. Antwort an die hinterlegte Mailadresse, Rückfrage)' },
            { label: 'Frist notieren', body: 'Antwort spätestens **ein Monat** nach Eingang (bis 3. April).' },
            { label: 'Löschen', body: 'Kundenkonto, Newsletter-Abo und das erledigte Support-Ticket: kein Zweck, keine Pflicht → **löschen** (auch in Folgesystemen wie dem Newsletter-Tool).' },
            { label: 'Sperren', body: 'Rechnungen unterliegen der Aufbewahrungspflicht → **Einschränkung der Verarbeitung** (gesperrt, nur noch für Steuer/Buchhaltung), Löschung nach Fristablauf vormerken.' },
            { label: 'Backups', body: 'In Backups müssen Daten nicht sofort einzeln gelöscht werden, wenn das technisch unverhältnismäßig ist – sie dürfen aber bei einer Wiederherstellung nicht wieder genutzt werden und verschwinden mit dem Ablauf der Backup-Rotation.' },
            { label: 'Antwort', body: 'Dem Kunden mitteilen, was gelöscht wurde und was warum (gesetzliche Pflicht) noch gesperrt aufbewahrt wird.' },
          ],
          result: 'Löschen, wo kein Zweck mehr besteht; sperren, wo eine Aufbewahrungspflicht gilt; innerhalb eines Monats begründet antworten.',
        },
        {
          type: 'check',
          question: {
            id: 's02-c05', kind: 'number', skill: 'sich.ds.rechte', difficulty: 1,
            prompt: 'Innerhalb welcher Frist (in **Monaten**) muss ein Auskunftsersuchen nach Art. 15 DSGVO im Regelfall beantwortet werden?',
            answer: 1, unit: 'Monat',
            misconceptions: [{ answer: '3', error: 'frist-verwechselt', why: 'Drei Monate sind nur bei Verlängerung möglich (1 + 2 Monate) – und die Verlängerung muss innerhalb des ersten Monats mitgeteilt werden.' }],
            explanation: 'Art. 12 Abs. 3: unverzüglich, spätestens innerhalb **eines Monats**; Verlängerung um zwei Monate nur, wenn erforderlich und begründet.',
          },
        },
        {
          type: 'check',
          question: {
            id: 's02-c06', kind: 'text', skill: 'sich.ds.rechte', difficulty: 2,
            prompt: 'Eine Mitarbeiterin wechselt zu einem anderen Anbieter und verlangt ihre Daten in einem **maschinenlesbaren Format**, um sie dort importieren zu lassen. Wie heißt dieses Betroffenenrecht?',
            accept: ['Datenübertragbarkeit', 'Recht auf Datenübertragbarkeit', 'Datenportabilität', 'Art. 20', 'Datenuebertragbarkeit'],
            misconceptions: [{ answer: 'Auskunft', error: 'betroffenenrecht-verwechselt', why: 'Die Auskunft (Art. 15) informiert über die Daten. Das Mitnehmen in maschinenlesbarer Form ist die Datenübertragbarkeit (Art. 20).' }],
            explanation: '**Recht auf Datenübertragbarkeit** (Art. 20): strukturiert, gängig, maschinenlesbar – z. B. CSV oder JSON.',
          },
        },
        { type: 'practice', title: 'Übung: Betroffenenrechte', questionIds: ['s02-q012', 's02-q013', 's02-q014', 's02-q015', 's02-q016'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Rechte: Information, Auskunft (15), Berichtigung (16), Löschung (17), Einschränkung (18), Datenübertragbarkeit (20), Widerspruch (21), Beschwerde (77).',
            'Antwort spätestens innerhalb eines Monats, Verlängerung um zwei Monate nur begründet; grundsätzlich kostenlos.',
            'Identität des Antragstellers prüfen!',
            'Aufbewahrungspflichten gehen dem Löschrecht vor → sperren statt löschen.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's02-l04',
      title: 'Technische und organisatorische Maßnahmen (TOM)',
      minutes: 25,
      relevance: 'ap1',
      skills: ['sich.ds.tom'],
      simple: `**TOM** (technische und organisatorische Maßnahmen) sind die Schlösser und Hausregeln für Daten. Technisch heißt: durch Technik, z. B. Verschlüsselung. Organisatorisch heißt: durch Regeln, z. B. Schulung oder Besucherbuch.
Die drei „Z“ kannst du dir an einer Bank merken: **Zutritt** = in die Filiale hineingehen (Raum), **Zugang** = dich mit Karte und PIN am Automaten anmelden (System), **Zugriff** = nur dein eigenes Konto sehen (Daten).
Manche Bücher verwenden andere Namen (nach § 64 BDSG) – dort heißt der Schutz des Raums ausgerechnet „Zugangskontrolle“.

**Merke:** Zutritt = Raum, Zugang = System, Zugriff = Daten – und im Zweifel schreibst du in der Antwort dazu, was du meinst.`,
      steps: [
        {
          type: 'explain',
          title: 'Art. 32 DSGVO: Sicherheit der Verarbeitung',
          body: `Verantwortliche und Auftragsverarbeiter müssen **geeignete technische und organisatorische Maßnahmen (TOM)** treffen, um ein dem Risiko **angemessenes Schutzniveau** zu gewährleisten. Dabei werden Stand der Technik, Kosten, Art der Verarbeitung und das Risiko für die Betroffenen berücksichtigt. Art. 32 nennt beispielhaft:

- **Pseudonymisierung und Verschlüsselung** personenbezogener Daten
- dauerhafte Sicherstellung von **Vertraulichkeit, Integrität, Verfügbarkeit und Belastbarkeit** der Systeme
- rasche **Wiederherstellbarkeit** nach einem Zwischenfall (→ Backup, Notfallplan)
- ein Verfahren zur **regelmäßigen Überprüfung** der Wirksamkeit der Maßnahmen

**Technisch** = durch Technik umgesetzt (Firewall, Verschlüsselung, Backup-Software). **Organisatorisch** = durch Regeln, Abläufe, Verantwortlichkeiten (Richtlinien, Schulung, Vier-Augen-Prinzip, Besucherregelung).

Dazu fordert **Art. 25** **Datenschutz durch Technikgestaltung** (*Privacy by Design*) und **datenschutzfreundliche Voreinstellungen** (*Privacy by Default*): Systeme werden von Anfang an so gebaut und eingestellt, dass nur die nötigen Daten verarbeitet werden (z. B. Profil im Intranet standardmäßig nicht öffentlich, optionale Felder leer).`,
        },
        {
          type: 'explain',
          title: 'Die klassischen Kontrollarten zur Gliederung der TOM',
          body: `Viele Unternehmen und Lehrbücher gliedern ihre TOM bis heute nach den Kontrollarten aus dem früheren BDSG (Anlage zu § 9 BDSG a. F.). Sie sind praktisch, weil man jede Maßnahme sauber einordnen kann:

| Kontrolle | Ziel | Beispiele |
|---|---|---|
| **Zutrittskontrolle** | Unbefugten den **räumlichen** Zutritt zu Datenverarbeitungsanlagen verwehren | Schließsystem, Chipkarte, Videoüberwachung, Besucherbuch, verschlossener Serverraum |
| **Zugangskontrolle** | Verhindern, dass Unbefugte DV-**Systeme nutzen** können | Benutzerkonto + Passwort, MFA, Bildschirmsperre, BIOS-Passwort |
| **Zugriffskontrolle** | Berechtigte sehen nur die **Daten**, für die sie berechtigt sind | Rollen- und Rechtekonzept, NTFS-Freigaberechte, Verschlüsselung |
| **Weitergabekontrolle** | Daten bei **Übertragung/Transport** schützen | VPN, TLS, verschlüsselte USB-Sticks, E-Mail-Verschlüsselung |
| **Eingabekontrolle** | Nachvollziehen, **wer wann** Daten eingegeben/geändert/gelöscht hat | Protokollierung (Logs), Änderungshistorie |
| **Auftragskontrolle** | Auftragsverarbeitung nur **nach Weisung** | AV-Vertrag, Kontrolle des Dienstleisters |
| **Verfügbarkeitskontrolle** | Schutz gegen **Zerstörung oder Verlust** | Backup, USV, Brandschutz, Virenschutz, RAID |
| **Trennungsgebot** (Trennungskontrolle) | Daten unterschiedlicher **Zwecke getrennt** verarbeiten | getrennte Mandanten/Datenbanken, Test- und Produktivsystem trennen |

**Merkhilfe für die drei Z:**
- **Zutritt** = **Raum** (mit dem Körper hinein)
- **Zugang** = **System** (sich anmelden)
- **Zugriff** = **Daten** (Dateien/Datensätze öffnen)

**So unterscheidest du sie sicher:** Frag dich, **wo** die Maßnahme wirkt. Muss ein Mensch mit seinem Körper irgendwo hinein (Gebäude, Serverraum)? → Zutritt. Muss er sich an einem Gerät oder Programm **anmelden**? → Zugang. Ist er schon angemeldet und es geht darum, **welche Dateien oder Datensätze** er sehen oder ändern darf? → Zugriff.`,
        },
        {
          type: 'explain',
          title: 'Andere Bezeichnungen in manchen Büchern (§ 64 BDSG)',
          body: `Einige Lehrbücher arbeiten nicht mit den acht klassischen Kontrollen, sondern mit den **14 Anforderungen aus § 64 Abs. 3 BDSG**. Das Tückische: Dort bedeuten **gleiche Wörter etwas anderes**!

| Klassischer Begriff (diese App, viele Prüfungsaufgaben) | Bezeichnung nach § 64 BDSG | Worum geht es? |
|---|---|---|
| **Zutrittskontrolle** | **Zugangskontrolle** (Zugang zu Verarbeitungsanlagen) | Raum: Wer kommt an die Geräte heran? |
| **Zugangskontrolle** | **Benutzerkontrolle** | System: Wer kann es benutzen bzw. sich anmelden? |
| **Zugriffskontrolle** | **Zugriffskontrolle**, dazu **Speicherkontrolle** | Daten: nur die Daten, für die man berechtigt ist |
| **Weitergabekontrolle** | **Übertragungskontrolle** und **Transportkontrolle**, dazu **Datenträgerkontrolle** | Daten unterwegs – im Netz und auf Datenträgern |
| **Eingabekontrolle** | **Eingabekontrolle** | Wer hat was wann eingegeben oder geändert? |
| **Auftragskontrolle** | **Auftragskontrolle** | Dienstleister arbeitet nur nach Weisung |
| **Verfügbarkeitskontrolle** | **Verfügbarkeitskontrolle** und **Wiederherstellbarkeit** | Schutz vor Verlust, schnelle Wiederherstellung |
| **Trennungsgebot** (Trennungskontrolle) | **Trennbarkeit** | Daten verschiedener Zwecke getrennt verarbeiten |
| – | **Zuverlässigkeit** und **Datenintegrität** | Systemfunktionen stehen zur Verfügung, Fehlfunktionen werden gemeldet und beschädigen keine gespeicherten Daten |

*Die Zuordnung der Zusatzbegriffe (Speicher-, Datenträgerkontrolle) ist nicht ganz trennscharf – sie berühren mehrere klassische Kontrollen.*

**Hintergrund:** Die acht klassischen Kontrollen stammen aus dem alten BDSG (vor 2018). § 64 BDSG gehört zum Teil des BDSG, der für Polizei und Justiz gilt. Für Unternehmen gilt **Art. 32 DSGVO** – und der nennt gar keine Kontrollliste, sondern Ziele (Verschlüsselung, Pseudonymisierung, Vertraulichkeit, Integrität, Verfügbarkeit, Belastbarkeit, Wiederherstellbarkeit, regelmäßige Überprüfung). Beide Listen sind deshalb **Gliederungshilfen**.

**So gehst du in der Prüfung vor:** Benutze die Begriffe aus der Aufgabenstellung. Ist unklar, was gemeint ist, schreib es in Klammern dazu: „Zugangskontrolle (Anmeldung am System)“ oder „Zutrittskontrolle (Zugang zum Raum)“. Dann ist deine Antwort in jedem Fall eindeutig.`,
        },
        {
          type: 'visual',
          title: 'Zutritt – Zugang – Zugriff',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Zutrittskontrolle', text: 'Raum: Wer darf ins Gebäude, in den Serverraum? Schlüssel, Chipkarte, Besucherbuch.', icon: 'DoorClosed' },
                { title: 'Zugangskontrolle', text: 'System: Wer darf sich anmelden? Konto, Passwort, MFA, Bildschirmsperre.', icon: 'LogIn' },
                { title: 'Zugriffskontrolle', text: 'Daten: Wer darf welche Datei lesen/ändern? Rollen, NTFS-Rechte, Verschlüsselung.', icon: 'FolderLock' },
              ],
            },
          },
          caption: 'Von außen nach innen: Erst in den Raum, dann ins System, dann an die Daten.',
        },
        {
          type: 'example',
          title: 'TOM für den neuen Arbeitsplatz der Personalabteilung',
          problem: 'Du richtest für die Personalabteilung in Hamburg einen neuen PC ein. Ordne je Kontrollart eine konkrete Maßnahme zu (Zutritt, Zugang, Zugriff, Weitergabe, Eingabe, Verfügbarkeit).',
          steps: [
            { label: 'Zutritt', body: 'Büro der Personalabteilung abschließbar, Zutritt per Chipkarte nur für Personal.' },
            { label: 'Zugang', body: 'Persönliches Domänenkonto mit MFA, automatische Bildschirmsperre nach 5 Minuten, BIOS/UEFI-Passwort, Boot von USB gesperrt.' },
            { label: 'Zugriff', body: 'Freigabe „Personal“ nur für die AD-Gruppe GG_Personal (Least Privilege), Festplattenverschlüsselung mit BitLocker.' },
            { label: 'Weitergabe', body: 'Gehaltsdaten an den Steuerberater nur über verschlüsselte Übertragung (Portal mit TLS bzw. verschlüsselte Mail); USB-Massenspeicher gesperrt.' },
            { label: 'Eingabe', body: 'Personalsoftware protokolliert Änderungen (wer, wann, was).' },
            { label: 'Verfügbarkeit', body: 'Daten liegen auf dem Server mit täglichem Backup, nicht lokal; USV für den Server.' },
          ],
          result: 'Für jede Kontrollart mindestens eine technische oder organisatorische Maßnahme – genau so wird ein TOM-Konzept aufgebaut.',
        },
        {
          type: 'check',
          question: {
            id: 's02-c07', kind: 'match', skill: 'sich.ds.tom', difficulty: 2,
            prompt: 'Ordne jede Maßnahme der passenden Kontrollart zu.',
            left: ['Chipkartenleser an der Serverraumtür', 'Automatische Bildschirmsperre nach 5 Minuten', 'Nur die Gruppe „Buchhaltung“ darf den Ordner „FiBu“ öffnen', 'Gehaltsliste wird nur verschlüsselt per Mail verschickt', 'Die Warenwirtschaft protokolliert jede Preisänderung mit Benutzername'],
            right: ['Zutrittskontrolle', 'Zugangskontrolle', 'Zugriffskontrolle', 'Weitergabekontrolle', 'Eingabekontrolle'],
            answer: [0, 1, 2, 3, 4],
            explanation: 'Raum → Zutritt; System → Zugang; Daten → Zugriff; Übertragung → Weitergabe; Nachvollziehbarkeit von Änderungen → Eingabe.',
          },
        },
        {
          type: 'check',
          question: {
            id: 's02-c08', kind: 'single', skill: 'sich.ds.tom', difficulty: 1,
            prompt: 'Welche der folgenden Maßnahmen ist eine **organisatorische** (keine technische) Maßnahme?',
            options: ['Verpflichtung aller Mitarbeitenden auf die Vertraulichkeit und jährliche Datenschutzschulung', 'Festplattenverschlüsselung', 'Firewall', 'Automatisches Backup'],
            answer: 0,
            distractors: {
              '1': { why: 'Verschlüsselung wird durch Technik umgesetzt.', error: 'tom-technisch-organisatorisch' },
              '2': { why: 'Eine Firewall ist eine technische Maßnahme.', error: 'tom-technisch-organisatorisch' },
              '3': { why: 'Backup-Software ist technisch (der Backup-Plan selbst wäre organisatorisch).', error: 'tom-technisch-organisatorisch' },
            },
            explanation: 'Organisatorisch = Regeln, Abläufe, Schulung, Verantwortlichkeiten.',
          },
        },
        {
          type: 'check',
          question: {
            id: 's02-c12', kind: 'match', skill: 'sich.ds.tom', difficulty: 2,
            prompt: 'Dein Schulbuch verwendet die Begriffe aus **§ 64 BDSG**. Ordne jedem Buchbegriff den **klassischen** Begriff mit derselben Bedeutung zu.',
            left: ['Zugangskontrolle (§ 64: Zugang zu Verarbeitungsanlagen)', 'Benutzerkontrolle', 'Übertragungskontrolle', 'Trennbarkeit'],
            right: ['Zutrittskontrolle', 'Zugangskontrolle', 'Weitergabekontrolle', 'Trennungsgebot'],
            answer: [0, 1, 2, 3],
            hints: ['Bei § 64 meint „Zugang“ den Zugang zu den Geräten – also den Raum.'],
            explanation: '§ 64-Zugangskontrolle = klassische **Zutrittskontrolle** (Raum). Benutzerkontrolle = klassische **Zugangskontrolle** (System). Übertragungskontrolle = **Weitergabekontrolle**. Trennbarkeit = **Trennungsgebot**.\n\nHäufiger Fehler: „Zugangskontrolle“ in beiden Listen für dasselbe halten. Schreib in der Prüfung in Klammern dazu, was du meinst.',
          },
        },
        { type: 'practice', title: 'Übung: TOM', questionIds: ['s02-q017', 's02-q018', 's02-q019', 's02-q020', 's02-q021', 's02-q022', 's02-q033', 's02-q034'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Art. 32: angemessene TOM – u. a. Pseudonymisierung, Verschlüsselung, CIA + Belastbarkeit, Wiederherstellbarkeit, regelmäßige Überprüfung.',
            'Art. 25: Privacy by Design und by Default.',
            'Kontrollarten: Zutritt (Raum), Zugang (System), Zugriff (Daten), Weitergabe, Eingabe, Auftrag, Verfügbarkeit, Trennung.',
            'Bücher nach § 64 BDSG: dort „Zugangskontrolle“ = Raum (klassisch Zutritt), „Benutzerkontrolle“ = System (klassisch Zugang) – im Zweifel in Klammern erklären.',
            'Technisch = durch Technik, organisatorisch = durch Regeln und Abläufe.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's02-l05',
      title: 'Datenschutz im Unternehmen organisieren',
      minutes: 25,
      relevance: 'ap1-teilweise',
      skills: ['sich.ds.organisation'],
      simple: `Im Datenschutz gibt es feste Rollen wie in einem Fußballverein: Die **Geschäftsführung** ist verantwortlich (der Vorstand). Der **Datenschutzbeauftragte** (DSB) berät und kontrolliert – wie ein Schiedsrichter, der nicht mitspielt.
Ein DSB ist in Deutschland Pflicht, wenn in der Regel mindestens **20 Personen** ständig mit personenbezogenen Daten am Computer arbeiten.
Lässt die Firma Daten von einem Dienstleister verarbeiten (z. B. Cloud oder Lohnabrechnung), braucht sie einen **Vertrag zur Auftragsverarbeitung** nach Art. 28 DSGVO.
Bei einer **Datenpanne** (Daten verloren oder in falsche Hände geraten) muss die Aufsichtsbehörde möglichst innerhalb von **72 Stunden** informiert werden.

**Merke:** DSB ab 20 Personen (§ 38 BDSG), AV-Vertrag nach Art. 28 DSGVO, Panne binnen 72 Stunden melden – ältere Bücher mit „10 Personen“ sind überholt.`,
      steps: [
        {
          type: 'explain',
          title: 'Datenschutzbeauftragter, Verzeichnis, Auftragsverarbeitung',
          body: `**Datenschutzbeauftragter (DSB)** – Art. 37–39 DSGVO, § 38 BDSG:
- In Deutschland ist ein DSB zu benennen, wenn **in der Regel mindestens 20 Personen ständig mit der automatisierten Verarbeitung** personenbezogener Daten beschäftigt sind (§ 38 Abs. 1 BDSG) – unabhängig davon z. B. auch dann, wenn eine Datenschutz-Folgenabschätzung nötig ist.
- Die Elektro Krämer GmbH (120 Mitarbeitende, fast alle am PC) **muss** also einen DSB benennen.
- Er kann **intern** (eigener Mitarbeiter) oder **extern** (Dienstleister) sein, muss **fachkundig** sein, ist **weisungsfrei** in seiner Aufgabe, darf deswegen nicht benachteiligt werden und berichtet direkt der höchsten Leitungsebene.
- Interessenkonflikte sind zu vermeiden: Geschäftsführer oder IT-Leiter sollten nicht DSB sein (sie würden sich selbst kontrollieren).
- **Aufgaben** (Art. 39): unterrichten und beraten, die Einhaltung **überwachen**, Schulungen, Beratung zur Datenschutz-Folgenabschätzung, Zusammenarbeit mit der Aufsichtsbehörde, Anlaufstelle für Betroffene.
- **Wichtig:** Verantwortlich für den Datenschutz bleibt das **Unternehmen** (die Geschäftsführung) – der DSB berät und kontrolliert.
- **Achtung, ältere Bücher:** Manche Lehrbücher nennen noch „mindestens **zehn** Personen“. Diese Grenze galt bis November 2019. Seitdem sind es **20 Personen** (§ 38 Abs. 1 BDSG) – rechne in der Prüfung mit 20.

**Verzeichnis von Verarbeitungstätigkeiten (VVT)** – Art. 30: Dokumentation aller Verarbeitungen (Zweck, Kategorien von Daten und Betroffenen, Empfänger, Löschfristen, TOM). Grundlage der Rechenschaftspflicht.

**Auftragsverarbeitung (AV)** – Art. 28: Lässt die Firma personenbezogene Daten durch einen Dienstleister **nach Weisung** verarbeiten (Cloud-Speicher, externes Rechenzentrum, Lohnabrechnung, Fernwartung mit Datenzugriff, Aktenvernichtung), ist ein **Vertrag zur Auftragsverarbeitung (AVV)** nötig – auch „AV-Vereinbarung“ genannt. Der Auftraggeber bleibt **verantwortlich** und muss den Dienstleister sorgfältig auswählen.

**Was muss im AV-Vertrag stehen?** (Art. 28 Abs. 3 DSGVO)

| Inhalt | Beispiel Lohnabrechnung |
|---|---|
| **Gegenstand und Dauer** der Verarbeitung | Lohn- und Gehaltsabrechnung, Vertragslaufzeit |
| **Art und Zweck**, **Art der Daten**, **Kategorien betroffener Personen** | Stammdaten, Bankverbindung, Steuer-ID; Beschäftigte |
| Verarbeitung nur auf **dokumentierte Weisung** | keine eigene Nutzung der Daten durch den Dienstleister |
| **Vertraulichkeit** der eingesetzten Personen | schriftliche Verpflichtung der Mitarbeitenden |
| **TOM** nach Art. 32 | Verschlüsselung, Zutritts-/Zugangs-/Zugriffskontrolle, Backup |
| **Unterauftragsverarbeiter** nur mit Genehmigung | Rechenzentrum des Dienstleisters muss genannt und genehmigt sein |
| **Unterstützung** bei Betroffenenrechten und Datenpannen | Hilfe bei Auskunftsanfragen, Meldung von Pannen an den Auftraggeber |
| **Löschung oder Rückgabe** nach Vertragsende | Daten werden gelöscht, Löschung wird bestätigt |
| **Nachweise und Kontrollrechte** (Audits, Inspektionen) | Auftraggeber darf prüfen, Zertifikate vorlegen lassen |

Typische Fälle für einen AV-Vertrag: Cloud-Speicher, externes Rechenzentrum, Lohnabrechnung, **Fernwartung oder Helpdesk mit Zugriff auf personenbezogene Daten**, Aktenvernichtung.

**Achtung, Buchfehler:** Manche Lehrbücher verweisen für die Auftragsverarbeitung auf **§ 62 BDSG**. Diese Vorschrift gehört zum Teil des BDSG für Polizei und Justiz. Für Unternehmen gilt **Art. 28 DSGVO**.

**Datenschutz-Folgenabschätzung (DSFA)** – Art. 35: vorab bei Verarbeitungen mit **voraussichtlich hohem Risiko** (z. B. umfangreiche Verarbeitung von Gesundheitsdaten, systematische Überwachung).`,
        },
        {
          type: 'explain',
          title: 'Datenpanne und Bußgelder',
          body: `**Datenpanne** = Verletzung des Schutzes personenbezogener Daten: Verlust, unbefugte Offenlegung, Veränderung oder Vernichtung (z. B. verlorenes Notebook, Mail an falschen Verteiler, Ransomware).

| Wer? | Wann? | Vorschrift |
|---|---|---|
| Meldung an die **Aufsichtsbehörde** | **unverzüglich und möglichst binnen 72 Stunden**, nachdem die Panne bekannt wurde – außer sie führt **voraussichtlich nicht zu einem Risiko** für die Betroffenen. Eine verspätete Meldung ist zu begründen. | Art. 33 |
| Benachrichtigung der **Betroffenen** | unverzüglich, wenn **voraussichtlich ein hohes Risiko** besteht – entfällt z. B., wenn die Daten **wirksam verschlüsselt** waren | Art. 34 |
| **Dokumentation** | **jede** Panne intern dokumentieren – auch die nicht meldepflichtigen | Art. 33 Abs. 5 |

Die 72 Stunden laufen ab **Kenntnis** – auch am Wochenende! Deshalb braucht jedes Unternehmen einen klaren **Meldeweg**: Mitarbeiter → IT/DSB → Geschäftsführung → Aufsichtsbehörde.

**Bußgelder** (Art. 83) – zwei Stufen, jeweils der **höhere** Betrag ist die Obergrenze:

| Stufe | Beispiele | Höchstrahmen |
|---|---|---|
| **Abs. 4** | Pflichten des Verantwortlichen/Auftragsverarbeiters: fehlender AV-Vertrag (28), fehlendes VVT (30), mangelnde TOM (32), Meldepflicht verletzt (33), kein DSB (37) | **10 Mio. €** oder **2 %** des weltweiten Jahresumsatzes des Vorjahres |
| **Abs. 5** | Grundsätze (5), keine Rechtsgrundlage (6, 7), besondere Kategorien (9), Betroffenenrechte (12–22), unzulässige Drittlandübermittlung | **20 Mio. €** oder **4 %** des weltweiten Jahresumsatzes des Vorjahres |

Zusätzlich haben Betroffene Anspruch auf **Schadensersatz** – auch für immaterielle Schäden (Art. 82).`,
        },
        {
          type: 'example',
          title: 'Bußgeldrahmen berechnen',
          problem: 'Ein Konzern mit **750 Mio. €** weltweitem Jahresumsatz im Vorjahr hat Kundendaten ohne Rechtsgrundlage an Werbepartner verkauft. Wie hoch ist der maximal mögliche Bußgeldrahmen? Und wie wäre es bei der Elektro Krämer GmbH mit **28 Mio. €** Umsatz?',
          steps: [
            { label: 'Stufe', body: 'Keine Rechtsgrundlage (Art. 6) → **Art. 83 Abs. 5**: 20 Mio. € oder 4 %.' },
            { label: 'Konzern', body: '4 % von 750 Mio. € = **30 Mio. €** > 20 Mio. € → Obergrenze **30 Mio. €**.' },
            { label: 'Elektro Krämer', body: '4 % von 28 Mio. € = 1,12 Mio. € < 20 Mio. € → Obergrenze **20 Mio. €** (der höhere Wert gilt).' },
            { label: 'Einordnung', body: 'Das ist nur der Rahmen. Die tatsächliche Höhe richtet sich nach Art. 83 Abs. 2 (Schwere, Dauer, Vorsatz, Zusammenarbeit, Maßnahmen zur Schadensminderung …).' },
          ],
          result: 'Konzern: bis 30 Mio. €; Elektro Krämer GmbH: bis 20 Mio. € (Rahmen, nicht automatische Strafe).',
        },
        {
          type: 'check',
          question: {
            id: 's02-c09', kind: 'number', skill: 'sich.ds.organisation', difficulty: 1,
            prompt: 'Innerhalb wie vieler **Stunden** nach Bekanntwerden soll eine meldepflichtige Datenpanne der Aufsichtsbehörde gemeldet werden?',
            answer: 72, unit: 'h',
            misconceptions: [{ answer: '24', error: 'frist-verwechselt', why: 'Die DSGVO nennt 72 Stunden (Art. 33). Kürzere Fristen gibt es in anderen Regelwerken (z. B. NIS2-Frühwarnung 24 h).' }],
            explanation: 'Art. 33 Abs. 1: unverzüglich und möglichst binnen **72 Stunden**.',
          },
        },
        {
          type: 'check',
          question: {
            id: 's02-c10', kind: 'single', skill: 'sich.ds.organisation', difficulty: 2,
            prompt: 'Die Elektro Krämer GmbH lässt ihre Lohnabrechnung von einem externen Dienstleister nach ihren Vorgaben durchführen. Was ist datenschutzrechtlich erforderlich?',
            options: ['Ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO', 'Eine Einwilligung jedes Mitarbeitenden', 'Nichts, da der Dienstleister selbst verantwortlich ist', 'Eine Meldung an die Aufsichtsbehörde'],
            answer: 0,
            distractors: {
              '1': { why: 'Die Lohnabrechnung ist zur Erfüllung des Arbeitsvertrags erforderlich; die Weitergabe an einen weisungsgebundenen Auftragsverarbeiter braucht keine Einwilligung, aber einen AV-Vertrag.', error: 'av-missverstanden' },
              '2': { why: 'Bei Auftragsverarbeitung bleibt der Auftraggeber verantwortlich.', error: 'av-missverstanden' },
              '3': { why: 'Eine Meldepflicht besteht bei Datenpannen, nicht bei der Beauftragung eines Dienstleisters.', error: 'av-missverstanden' },
            },
            explanation: 'Weisungsgebundene Verarbeitung im Auftrag → **AV-Vertrag** (Art. 28) mit Regelungen zu Weisungen, TOM, Unterauftragnehmern, Kontrolle und Löschung.',
          },
        },
        { type: 'practice', title: 'Übung: Bußgeldrahmen berechnen', generator: 'sich.bussgeld', count: 3, difficulty: 2 },
        { type: 'practice', title: 'Übung: DSB und AV-Vertrag', questionIds: ['s02-q035', 's02-q036', 's02-q037'], count: 3, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'DSB-Pflicht in Deutschland ab i. d. R. 20 Personen, die ständig automatisiert personenbezogene Daten verarbeiten (§ 38 BDSG); intern oder extern, weisungsfrei, berät und überwacht.',
            'VVT (Art. 30) dokumentiert alle Verarbeitungen; DSFA (Art. 35) bei hohem Risiko.',
            'Dienstleister nach Weisung → AV-Vertrag (Art. 28 DSGVO, nicht § 62 BDSG): Gegenstand, Daten, Weisung, Vertraulichkeit, TOM, Unterauftragnehmer, Unterstützung, Löschung, Kontrollrechte; Verantwortung bleibt beim Auftraggeber.',
            'Datenpanne: Meldung an die Aufsicht unverzüglich, möglichst binnen 72 h (Art. 33); Betroffene bei hohem Risiko (Art. 34); immer dokumentieren.',
            'Bußgelder: Abs. 4 bis 10 Mio. €/2 %, Abs. 5 bis 20 Mio. €/4 % – der höhere Wert ist die Obergrenze.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's02-l06',
      title: 'Handlungssituation: Datenpanne richtig behandeln',
      minutes: 15,
      relevance: 'ap1',
      skills: ['sich.ds.organisation', 'sich.ds.tom'],
      simple: `Eine Datenpanne ist wie ein Wasserrohrbruch: Erst den Haupthahn zudrehen (Schaden begrenzen), dann den Hausverwalter anrufen (melden), dann aufschreiben, was passiert ist.
Wichtig ist, dass alle den **Meldeweg** kennen und sofort Bescheid geben – auch nachts oder am Wochenende.
Ob die Aufsichtsbehörde informiert werden muss, hängt vom Risiko für die betroffenen Menschen ab. Waren die Daten wirksam verschlüsselt, ist das Risiko meist so klein, dass keine Meldung nötig ist – aufgeschrieben (dokumentiert) wird trotzdem.

**Merke:** Sofort intern melden → Schaden begrenzen → Risiko bewerten → bei Risiko binnen 72 Stunden an die Aufsicht → immer dokumentieren.`,
      steps: [
        {
          type: 'explain',
          title: 'Schritt für Schritt bei einem Vorfall',
          body: `Wenn etwas passiert ist, zählt jede Stunde. Ein bewährtes Vorgehen:

1. **Sofort melden** – intern an IT und Datenschutzbeauftragten (Meldeweg kennen!). Nicht vertuschen, nicht selbst „herumprobieren“.
2. **Schaden begrenzen** – z. B. Gerät per MDM sperren/löschen, Passwörter zurücksetzen, betroffene Konten sperren, falsch versendete Mail zurückrufen bzw. Empfänger um Löschung bitten.
3. **Sachverhalt klären** – Welche Daten? Wie viele Betroffene? Welche Kategorien (Art. 9)? Waren die Daten verschlüsselt?
4. **Risiko bewerten** – kein Risiko / Risiko / hohes Risiko für die Betroffenen.
5. **Melden** – bei Risiko an die Aufsichtsbehörde binnen 72 h; bei hohem Risiko zusätzlich die Betroffenen benachrichtigen.
6. **Dokumentieren** – jede Panne, auch ohne Meldepflicht.
7. **Ursache beheben** – TOM verbessern (z. B. Verschlüsselung nachrüsten, Schulung).

Die Entscheidung über die Meldung trifft der **Verantwortliche** (Geschäftsführung), beraten vom DSB – nicht die IT allein.`,
        },
        {
          type: 'example',
          title: 'Notebook im Zug vergessen',
          problem: 'Herr Krüger (Vertrieb) meldet am Freitag um 18 Uhr: Sein Firmen-Notebook liegt im ICE nach München. Darauf: Angebote mit Namen und Kontaktdaten von ca. 300 Kunden. Das Notebook ist mit BitLocker (TPM + PIN) verschlüsselt, die PIN kennt nur er. Bewerte die Situation.',
          steps: [
            { label: 'Sofortmaßnahmen', body: 'Gerät im MDM als verloren markieren (Sperre/Fernlöschung bei nächster Verbindung), Kennwort des Benutzers zurücksetzen, aktive Sitzungen/Token widerrufen, Fundbüro der Bahn kontaktieren.' },
            { label: 'Daten', body: '300 Kunden, Namen und Kontaktdaten – keine besonderen Kategorien.' },
            { label: 'Verschlüsselung', body: 'Wirksame Festplattenverschlüsselung nach Stand der Technik, PIN nicht kompromittiert → Finder kann die Daten praktisch nicht lesen.' },
            { label: 'Risiko', body: 'Voraussichtlich **kein Risiko** für die Betroffenen → keine Meldung an die Aufsicht nötig (Art. 33 Abs. 1), keine Benachrichtigung (Art. 34 Abs. 3 a). **Aber:** intern dokumentieren (Art. 33 Abs. 5).' },
            { label: 'Gegenprobe', body: 'Wäre das Notebook **unverschlüsselt** gewesen: Risiko → Meldung an die Aufsichtsbehörde bis spätestens Montag 18 Uhr (72 h ab Kenntnis), ggf. Benachrichtigung der Kunden.' },
          ],
          result: 'Dank wirksamer Verschlüsselung keine Meldepflicht, aber Dokumentationspflicht – Verschlüsselung ist eine der wirksamsten TOM.',
        },
        {
          type: 'check',
          question: {
            id: 's02-c11', kind: 'order', skill: 'sich.ds.organisation', difficulty: 2,
            prompt: 'Ein Mitarbeiter hat eine Excel-Liste mit Gehältern versehentlich an einen externen Verteiler geschickt. Bringe die Schritte in eine sinnvolle Reihenfolge.',
            items: ['Vorfall sofort intern an IT und Datenschutzbeauftragten melden', 'Schaden begrenzen: Empfänger um Löschung bitten, Rückruf versuchen', 'Sachverhalt klären: welche Daten, wie viele Betroffene', 'Risiko für die Betroffenen bewerten', 'Bei Risiko innerhalb von 72 Stunden an die Aufsichtsbehörde melden', 'Vorfall dokumentieren und Ursache beheben (z. B. Schulung, Verschlüsselung)'],
            explanation: 'Melden → begrenzen → klären → bewerten → (extern) melden → dokumentieren und verbessern.',
          },
        },
        { type: 'practice', title: 'Übung: Organisation und Datenpannen', questionIds: ['s02-q023', 's02-q024', 's02-q025', 's02-q026', 's02-q027', 's02-q028', 's02-q029', 's02-q030', 's02-q031', 's02-q032'], count: 5, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Melden → begrenzen → klären → bewerten → melden (72 h) → dokumentieren → verbessern.',
            'Wirksam verschlüsselte Daten senken das Risiko so stark, dass Melde- und Benachrichtigungspflichten oft entfallen.',
            'Die 72 Stunden laufen ab Kenntnis – auch am Wochenende.',
            'Der Verantwortliche entscheidet, der DSB berät.',
          ],
        },
      ],
    },
  ],

  /* ================================================================== */
  questions: [
    {
      id: 's02-q001', kind: 'free', skill: 'sich.ds.begriffe', difficulty: 1,
      prompt: 'Definieren Sie den Begriff **personenbezogene Daten** nach DSGVO und nennen Sie drei Beispiele.',
      modelAnswer: 'Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen (Art. 4 Nr. 1 DSGVO). Identifizierbar ist eine Person, wenn sie direkt oder indirekt, etwa über eine Kennnummer oder mehrere Merkmale, bestimmt werden kann. Beispiele: Name, Anschrift, E-Mail-Adresse, Telefonnummer, Personalnummer, IP-Adresse, Foto.',
      keywords: ['natürliche Person', 'identifizierbar', 'Art. 4', 'Name', 'IP-Adresse'],
      explanation: 'Wichtig: natürliche Person (nicht Firma) und „identifizierbar“ (auch indirekt).',
    },
    {
      id: 's02-q002', kind: 'multi', skill: 'sich.ds.begriffe', difficulty: 2,
      prompt: 'Welche Daten gehören zu den **besonderen Kategorien** personenbezogener Daten nach Art. 9 DSGVO?',
      options: ['Krankmeldung mit Diagnose', 'Fingerabdruck für die Zeiterfassung', 'Mitgliedschaft in einer Gewerkschaft', 'Bankverbindung', 'Religionszugehörigkeit', 'Gehaltshöhe'],
      answer: [0, 1, 2, 4],
      explanation: 'Gesundheit, Biometrie zur Identifizierung, Gewerkschaft und Religion sind Art.-9-Daten. Bankverbindung und Gehalt sind sensibel, aber keine besonderen Kategorien im Sinne von Art. 9. (Hinweis: Die Konfession steht zwar für die Kirchensteuer auf der Lohnabrechnung, bleibt aber ein Art.-9-Datum.)',
    },
    {
      id: 's02-q003', kind: 'match', skill: 'sich.ds.begriffe', difficulty: 2,
      prompt: 'Ordne die Begriffe aus Art. 4 DSGVO zu.',
      left: ['Verantwortlicher', 'Auftragsverarbeiter', 'Betroffene Person', 'Pseudonymisierung'],
      right: ['entscheidet über Zwecke und Mittel der Verarbeitung', 'verarbeitet Daten im Auftrag und nach Weisung', 'die Person, auf die sich die Daten beziehen', 'Zuordnung zur Person nur mit gesondert aufbewahrtem Zusatzwissen möglich'],
      answer: [0, 1, 2, 3],
      explanation: 'Beispiel: Elektro Krämer (Verantwortlicher) beauftragt einen Cloud-Anbieter (Auftragsverarbeiter) mit der Speicherung von Kundendaten (Betroffene).',
    },
    {
      id: 's02-q004', kind: 'single', skill: 'sich.ds.begriffe', difficulty: 1,
      prompt: 'Welcher Vorgang ist **keine** „Verarbeitung“ im Sinne der DSGVO?',
      options: ['Es gibt keinen – Erheben, Speichern, Abfragen, Übermitteln und auch Löschen sind alles Verarbeitungen.', 'Das Löschen von Kundendaten', 'Das bloße Speichern einer Visitenkarte im CRM', 'Das Abfragen eines Datensatzes'],
      answer: 0,
      distractors: {
        '1': { why: 'Auch das Löschen und Vernichten zählt nach Art. 4 Nr. 2 zur Verarbeitung.', error: 'verarbeitung-begriff' },
        '2': { why: 'Speichern ist ausdrücklich eine Verarbeitung.', error: 'verarbeitung-begriff' },
        '3': { why: 'Abfragen ist ausdrücklich eine Verarbeitung.', error: 'verarbeitung-begriff' },
      },
      explanation: 'Art. 4 Nr. 2: „jeder Vorgang“ – vom Erheben bis zum Vernichten.',
    },
    {
      id: 's02-q005', kind: 'text', skill: 'sich.ds.begriffe', difficulty: 2,
      prompt: 'Wie nennt man es, wenn der Personenbezug von Daten **endgültig und unumkehrbar** entfernt wird, sodass die DSGVO nicht mehr anwendbar ist?',
      accept: ['Anonymisierung', 'anonymisieren', 'Anonymisieren'],
      misconceptions: [{ answer: 'Pseudonymisierung', error: 'pseudonym-anonym', why: 'Bei der Pseudonymisierung kann der Bezug mit Zusatzwissen wiederhergestellt werden – die DSGVO gilt weiter.' }],
      explanation: '**Anonymisierung**: Niemand kann die Person mehr bestimmen.',
    },
    {
      id: 's02-q006', kind: 'match', skill: 'sich.ds.grundsaetze', difficulty: 2,
      prompt: 'Ordne die Grundsätze aus Art. 5 DSGVO ihrer Kurzbeschreibung zu.',
      left: ['Zweckbindung', 'Datenminimierung', 'Speicherbegrenzung', 'Richtigkeit', 'Rechenschaftspflicht'],
      right: ['nur für festgelegte, eindeutige Zwecke', 'nur so viele Daten wie nötig', 'nur so lange wie nötig', 'sachlich richtig und aktuell', 'Einhaltung nachweisen können'],
      answer: [0, 1, 2, 3, 4],
      explanation: 'Zweck – Menge – Dauer – Qualität – Nachweis.',
    },
    {
      id: 's02-q007', kind: 'table', skill: 'sich.ds.grundsaetze', difficulty: 2,
      prompt: 'Trage zu jeder Verarbeitung den passenden **Buchstaben aus Art. 6 Abs. 1 DSGVO** ein (a = Einwilligung, b = Vertrag, c = rechtliche Verpflichtung, f = berechtigtes Interesse).',
      columns: [{ key: 'b', label: 'Buchstabe', type: 'text' }],
      rows: [
        { label: 'Bankverbindung eines Mitarbeiters für die Gehaltszahlung speichern', cells: { b: { answer: 'b' } } },
        { label: 'Lohndaten an das Finanzamt übermitteln (Lohnsteuer)', cells: { b: { answer: 'c' } } },
        { label: 'Foto eines Mitarbeiters auf der Firmenwebsite veröffentlichen', cells: { b: { answer: 'a' } } },
        { label: 'Firewall-Logs mit IP-Adressen 7 Tage speichern, um Angriffe zu erkennen', cells: { b: { answer: 'f' } } },
      ],
      hints: ['Ist es für den Vertrag nötig? Schreibt ein Gesetz es vor? Ist es freiwillig?'],
      explanation: 'Gehalt → Arbeitsvertrag (b). Lohnsteuer → Gesetz (c). Mitarbeiterfoto im Internet ist nicht zur Vertragserfüllung nötig → Einwilligung (a, im Arbeitsverhältnis schriftlich bzw. elektronisch und freiwillig). IT-Sicherheit → berechtigtes Interesse (f).',
    },
    {
      id: 's02-q008', kind: 'multi', skill: 'sich.ds.grundsaetze', difficulty: 2,
      prompt: 'Welche Anforderungen muss eine wirksame **Einwilligung** erfüllen?',
      options: ['freiwillig', 'informiert und für einen bestimmten Zweck', 'durch eindeutige aktive Handlung erteilt', 'jederzeit widerrufbar', 'nur mündlich erteilt', 'für immer gültig und nicht widerrufbar'],
      answer: [0, 1, 2, 3],
      explanation: 'Die Form ist frei, sie muss aber nachweisbar sein (schriftlich/elektronisch empfehlenswert). Ein Widerruf ist jederzeit möglich und muss so einfach sein wie die Erteilung.',
    },
    {
      id: 's02-q009', kind: 'free', skill: 'sich.ds.grundsaetze', difficulty: 2,
      prompt: 'Erläutern Sie den Grundsatz **„Verbot mit Erlaubnisvorbehalt“** im Datenschutz.',
      modelAnswer: 'Die Verarbeitung personenbezogener Daten ist grundsätzlich verboten. Sie ist nur erlaubt, wenn eine Rechtsgrundlage sie gestattet – nach Art. 6 Abs. 1 DSGVO z. B. eine Einwilligung, die Erfüllung eines Vertrags, eine rechtliche Verpflichtung oder ein berechtigtes Interesse. Wer Daten verarbeitet, muss also vorher prüfen und nachweisen können, auf welche Rechtsgrundlage er sich stützt.',
      keywords: ['grundsätzlich verboten', 'Rechtsgrundlage', 'Art. 6', 'Einwilligung', 'Vertrag'],
      explanation: 'Nicht „erlaubt, solange nicht verboten“, sondern umgekehrt.',
    },
    {
      id: 's02-q010', kind: 'single', skill: 'sich.ds.grundsaetze', difficulty: 2,
      prompt: 'Die Marketingabteilung möchte für jede Newsletter-Anmeldung zusätzlich Geburtsdatum, Familienstand und Hobbys als **Pflichtfelder** abfragen. Gegen welchen Grundsatz verstößt das vor allem?',
      options: ['Datenminimierung', 'Richtigkeit', 'Rechenschaftspflicht', 'Speicherbegrenzung'],
      answer: 0,
      distractors: {
        '1': { why: 'Richtigkeit betrifft die Korrektheit der Daten, nicht deren Menge.', error: 'grundsatz-verwechselt' },
        '2': { why: 'Rechenschaft = Nachweis der Einhaltung.', error: 'grundsatz-verwechselt' },
        '3': { why: 'Speicherbegrenzung betrifft die Dauer der Speicherung.', error: 'grundsatz-verwechselt' },
      },
      explanation: 'Für den Newsletter genügt die E-Mail-Adresse – alles andere als Pflichtfeld verstößt gegen die **Datenminimierung** (und widerspricht Privacy by Default).',
    },
    {
      id: 's02-q011', kind: 'free', skill: 'sich.ds.grundsaetze', difficulty: 3,
      prompt: 'Die Geschäftsführung möchte die Protokolle der Firewall (besuchte Webseiten je Benutzer) nutzen, um die Arbeitsleistung einzelner Mitarbeitender zu bewerten. Die Protokollierung wurde ausschließlich zur Abwehr von Angriffen eingeführt. Nehmen Sie aus Datenschutzsicht Stellung.',
      modelAnswer: 'Das ist unzulässig bzw. höchst problematisch. Die Daten wurden für den Zweck IT-Sicherheit erhoben (berechtigtes Interesse); eine Nutzung zur Leistungs- und Verhaltenskontrolle wäre eine Zweckänderung, die gegen den Grundsatz der Zweckbindung verstößt und eine eigene Rechtsgrundlage bräuchte. Eine personenbezogene Überwachung der Beschäftigten greift stark in deren Persönlichkeitsrechte ein; zudem hat ein Betriebsrat bei technischen Einrichtungen zur Leistungs- und Verhaltenskontrolle ein Mitbestimmungsrecht (§ 87 Abs. 1 Nr. 6 BetrVG). Empfehlung: Protokolle nur für Sicherheitszwecke, mit kurzer Speicherdauer und Zugriff nur für Administratoren; Auswertung zur Leistungskontrolle nicht durchführen, den Datenschutzbeauftragten einbeziehen.',
      keywords: ['Zweckbindung', 'Zweckänderung', 'Rechtsgrundlage', 'Betriebsrat', 'Datenschutzbeauftragter'],
      explanation: 'Kernargument: Zweckbindung (Art. 5 Abs. 1 b). Bonuspunkte für Beschäftigtendatenschutz/Mitbestimmung.',
    },
    {
      id: 's02-q012', kind: 'match', skill: 'sich.ds.rechte', difficulty: 1,
      prompt: 'Ordne die Anliegen den Betroffenenrechten zu.',
      left: ['„Welche Daten haben Sie über mich gespeichert?“', '„Meine Adresse ist falsch, bitte korrigieren.“', '„Bitte entfernen Sie alle meine Daten.“', '„Ich will keine Werbung mehr von Ihnen.“', '„Schicken Sie mir meine Daten als CSV für den neuen Anbieter.“'],
      right: ['Auskunft (Art. 15)', 'Berichtigung (Art. 16)', 'Löschung (Art. 17)', 'Widerspruch (Art. 21)', 'Datenübertragbarkeit (Art. 20)'],
      answer: [0, 1, 2, 3, 4],
      explanation: 'Siehe Tabelle der Betroffenenrechte.',
    },
    {
      id: 's02-q013', kind: 'free', skill: 'sich.ds.rechte', difficulty: 2,
      prompt: 'Ein Kunde verlangt die Löschung aller seiner Daten. Im System liegen auch Rechnungen aus dem Vorjahr. Erläutern Sie, wie mit den Rechnungen umzugehen ist.',
      modelAnswer: 'Rechnungen unterliegen gesetzlichen Aufbewahrungspflichten nach Handels- und Steuerrecht (HGB, AO; für Buchungsbelege seit 2025 in der Regel 8 Jahre). Diese rechtliche Verpflichtung geht dem Löschanspruch vor (Art. 17 Abs. 3 b DSGVO). Die Rechnungen dürfen daher nicht gelöscht werden; ihre Verarbeitung wird aber eingeschränkt (gesperrt), sodass sie nur noch für die gesetzlichen Zwecke (z. B. Betriebsprüfung) verwendet werden. Nach Ablauf der Frist werden sie gelöscht. Alle übrigen Daten ohne Aufbewahrungspflicht werden gelöscht, und der Kunde wird innerhalb eines Monats darüber informiert.',
      keywords: ['Aufbewahrungspflicht', 'Art. 17', 'sperren', 'Einschränkung', 'nach Fristablauf löschen'],
      explanation: 'Gesetzliche Pflicht schlägt Löschrecht – aber nur für die betroffenen Daten und nur bis Fristende.',
    },
    {
      id: 's02-q014', kind: 'number', skill: 'sich.ds.rechte', difficulty: 2,
      prompt: 'Ein besonders umfangreiches Auskunftsersuchen geht ein. Die Frist wird ordnungsgemäß verlängert. Wie viele **Monate** nach Eingang stehen insgesamt höchstens zur Verfügung?',
      answer: 3, unit: 'Monate',
      misconceptions: [{ answer: '2', error: 'frist-verwechselt', why: 'Die Verlängerung beträgt zwei **weitere** Monate – zusätzlich zum ersten Monat.' }],
      explanation: '1 Monat + Verlängerung um 2 weitere Monate = **3 Monate** (Art. 12 Abs. 3). Die Verlängerung muss innerhalb des ersten Monats begründet mitgeteilt werden.',
    },
    {
      id: 's02-q015', kind: 'single', skill: 'sich.ds.rechte', difficulty: 2,
      prompt: 'Ein Anrufer gibt an, Kunde Max Meier zu sein, und bittet am Telefon um Auskunft über alle gespeicherten Daten inkl. Bestellhistorie. Was ist richtig?',
      options: ['Zuerst die Identität zuverlässig prüfen (z. B. Antwort nur an die hinterlegte Adresse), dann innerhalb eines Monats Auskunft geben.', 'Sofort alle Daten am Telefon vorlesen, da Auskunft ein Recht ist.', 'Die Auskunft verweigern, weil Auskunftsrechte nur schriftlich gelten.', 'Eine Gebühr von 25 € verlangen.'],
      answer: 0,
      distractors: {
        '1': { why: 'Ohne Identitätsprüfung könnten Daten an einen Betrüger herausgegeben werden – das wäre selbst eine Datenpanne (Social Engineering!).', error: 'auskunft-identitaet' },
        '2': { why: 'Eine bestimmte Form ist nicht vorgeschrieben; der Antrag ist auch telefonisch möglich – aber die Identität muss geklärt werden.', error: 'auskunft-identitaet' },
        '3': { why: 'Die Auskunft ist grundsätzlich kostenlos (Art. 12 Abs. 5).', error: 'auskunft-identitaet' },
      },
      explanation: 'Recht auf Auskunft ja – aber nur an die richtige Person. Antwort an bekannte Kontaktdaten senden.',
    },
    {
      id: 's02-q016', kind: 'text', skill: 'sich.ds.rechte', difficulty: 1,
      prompt: 'Bei welcher staatlichen Stelle können sich Betroffene beschweren, wenn sie ihren Datenschutz verletzt sehen? (Oberbegriff)',
      accept: ['Aufsichtsbehörde', 'Datenschutzaufsichtsbehörde', 'Datenschutz-Aufsichtsbehörde', 'Datenschutzbehörde', 'Landesdatenschutzbeauftragter', 'Landesbeauftragter für Datenschutz'],
      explanation: 'Art. 77: Beschwerde bei einer **Aufsichtsbehörde** – in Deutschland meist die/der Landesbeauftragte für Datenschutz des jeweiligen Bundeslandes.',
    },
    {
      id: 's02-q017', kind: 'table', skill: 'sich.ds.tom', difficulty: 2,
      prompt: 'Trage die passende Kontrollart ein (Zutritt, Zugang, Zugriff, Weitergabe, Eingabe, Verfügbarkeit, Trennung).',
      columns: [{ key: 'k', label: 'Kontrollart', type: 'text' }],
      rows: [
        { label: 'Besucher müssen sich am Empfang anmelden und werden begleitet.', cells: { k: { answer: 'Zutritt', accept: ['Zutrittskontrolle'] } } },
        { label: 'Anmeldung am PC nur mit persönlichem Konto und Passwort.', cells: { k: { answer: 'Zugang', accept: ['Zugangskontrolle'] } } },
        { label: 'Testdatenbank und Produktivdatenbank laufen getrennt.', cells: { k: { answer: 'Trennung', accept: ['Trennungskontrolle', 'Trennungsgebot'] } } },
        { label: 'Tägliche Sicherung auf ein NAS im anderen Brandabschnitt.', cells: { k: { answer: 'Verfügbarkeit', accept: ['Verfügbarkeitskontrolle', 'Verfuegbarkeit'] } } },
        { label: 'Daten an den Steuerberater nur über ein TLS-verschlüsseltes Portal.', cells: { k: { answer: 'Weitergabe', accept: ['Weitergabekontrolle'] } } },
        { label: 'Die Personalsoftware speichert, wer welchen Datensatz geändert hat.', cells: { k: { answer: 'Eingabe', accept: ['Eingabekontrolle'] } } },
        { label: 'Lagermitarbeiter können den Ordner „Personal“ nicht öffnen.', cells: { k: { answer: 'Zugriff', accept: ['Zugriffskontrolle'] } } },
      ],
      explanation: 'Raum = Zutritt, System = Zugang, Daten = Zugriff, Transport = Weitergabe, Nachvollziehbarkeit = Eingabe, Verlustschutz = Verfügbarkeit, unterschiedliche Zwecke = Trennung.',
    },
    {
      id: 's02-q018', kind: 'free', skill: 'sich.ds.tom', difficulty: 2,
      prompt: 'Erläutern Sie den Unterschied zwischen **Zugangskontrolle** und **Zugriffskontrolle** an je einem Beispiel.',
      modelAnswer: 'Die Zugangskontrolle verhindert, dass Unbefugte ein Datenverarbeitungssystem überhaupt nutzen können – Beispiel: Anmeldung am PC mit persönlichem Benutzerkonto, Passwort und MFA sowie automatische Bildschirmsperre. Die Zugriffskontrolle stellt sicher, dass angemeldete, berechtigte Benutzer nur auf die Daten zugreifen können, für die sie berechtigt sind – Beispiel: Ein Mitarbeiter im Lager ist angemeldet, kann aber den Ordner „Personal“ nicht öffnen, weil die NTFS-Rechte nur der Personalabteilung Zugriff geben.',
      keywords: ['System', 'Anmeldung', 'Daten', 'Berechtigung', 'Rechte'],
      explanation: 'Zugang = ins System; Zugriff = auf die Daten im System.',
    },
    {
      id: 's02-q019', kind: 'multi', skill: 'sich.ds.tom', difficulty: 2,
      prompt: 'Welche Maßnahmen nennt **Art. 32 DSGVO** ausdrücklich als Beispiele für TOM?',
      options: ['Pseudonymisierung und Verschlüsselung', 'Fähigkeit, die Verfügbarkeit und den Zugang zu den Daten nach einem Zwischenfall rasch wiederherzustellen', 'Verfahren zur regelmäßigen Überprüfung der Wirksamkeit der Maßnahmen', 'Pflicht zum Einsatz eines bestimmten Virenschutzprodukts', 'Fähigkeit, Vertraulichkeit, Integrität, Verfügbarkeit und Belastbarkeit dauerhaft sicherzustellen'],
      answer: [0, 1, 2, 4],
      explanation: 'Die DSGVO ist technikneutral – sie schreibt keine Produkte vor, sondern ein „angemessenes Schutzniveau“.',
    },
    {
      id: 's02-q020', kind: 'single', skill: 'sich.ds.tom', difficulty: 2,
      prompt: 'Ein neues Intranet-Profil ist standardmäßig so eingestellt, dass Geburtstag und private Telefonnummer **nicht** sichtbar sind; Mitarbeitende können sie freiwillig freigeben. Welcher Grundsatz wird hier umgesetzt?',
      options: ['Privacy by Default (datenschutzfreundliche Voreinstellungen, Art. 25)', 'Recht auf Datenübertragbarkeit', 'Auftragsverarbeitung', 'Meldepflicht'],
      answer: 0,
      distractors: {
        '1': { why: 'Datenübertragbarkeit betrifft die Herausgabe in maschinenlesbarer Form.', error: 'privacy-by-default' },
        '2': { why: 'Auftragsverarbeitung betrifft Dienstleister.', error: 'privacy-by-default' },
        '3': { why: 'Die Meldepflicht betrifft Datenpannen.', error: 'privacy-by-default' },
      },
      explanation: 'Voreinstellung = möglichst wenig Daten → **Privacy by Default**.',
    },
    {
      id: 's02-q021', kind: 'free', skill: 'sich.ds.tom', difficulty: 3,
      prompt: 'Sie richten einen neuen Arbeitsplatz für die Lohnbuchhaltung ein. Nennen Sie je **zwei technische** und **zwei organisatorische** Maßnahmen zum Schutz der personenbezogenen Daten.',
      modelAnswer: 'Technisch: 1. Festplattenverschlüsselung (BitLocker mit TPM + PIN). 2. Persönliches Benutzerkonto mit MFA und automatischer Bildschirmsperre. Weitere: restriktive NTFS-Rechte auf den Lohnordner, Sperre von USB-Massenspeichern, verschlüsselte Übertragung (TLS/VPN), Protokollierung, Backup. Organisatorisch: 1. Verpflichtung auf Vertraulichkeit und regelmäßige Datenschutzschulung. 2. Clean-Desk- und Clear-Screen-Richtlinie, abschließbarer Raum und Aktenschrank. Weitere: Berechtigungskonzept mit Freigabeprozess, Vier-Augen-Prinzip bei Änderungen von Bankdaten, Vertretungsregelung, Löschkonzept.',
      keywords: ['Verschlüsselung', 'MFA', 'Bildschirmsperre', 'Schulung', 'Clean Desk', 'Berechtigungskonzept'],
      explanation: 'Wichtig: Klare Trennung zwischen technisch (Technik setzt um) und organisatorisch (Regeln/Abläufe).',
    },
    {
      id: 's02-q022', kind: 'match', skill: 'sich.ds.tom', difficulty: 1,
      prompt: 'Ordne die drei „Z“ ihrem Schutzobjekt zu.',
      left: ['Zutrittskontrolle', 'Zugangskontrolle', 'Zugriffskontrolle'],
      right: ['Räume und Gebäude', 'IT-Systeme (Anmeldung)', 'Daten und Dateien'],
      answer: [0, 1, 2],
      explanation: 'Zutritt = Raum, Zugang = System, Zugriff = Daten.',
    },
    {
      id: 's02-q023', kind: 'free', skill: 'sich.ds.organisation', difficulty: 2,
      prompt: 'Begründen Sie, ob die Elektro Krämer GmbH (120 Mitarbeitende, davon etwa 90 täglich am PC mit Kunden- oder Personaldaten) einen Datenschutzbeauftragten benennen muss, und nennen Sie zwei seiner Aufgaben.',
      modelAnswer: 'Ja. Nach § 38 Abs. 1 BDSG müssen Unternehmen einen Datenschutzbeauftragten benennen, wenn in der Regel mindestens 20 Personen ständig mit der automatisierten Verarbeitung personenbezogener Daten beschäftigt sind. Mit rund 90 solchen Beschäftigten ist die Schwelle deutlich überschritten. Aufgaben nach Art. 39 DSGVO: Geschäftsführung und Beschäftigte über ihre Pflichten unterrichten und beraten, die Einhaltung des Datenschutzes überwachen, Mitarbeitende schulen, bei der Datenschutz-Folgenabschätzung beraten, mit der Aufsichtsbehörde zusammenarbeiten und Anlaufstelle sein.',
      keywords: ['§ 38 BDSG', '20 Personen', 'ständig', 'automatisierte Verarbeitung', 'beraten', 'überwachen'],
      explanation: 'Schwelle 20 Personen (ständig, automatisiert). Der DSB kann intern oder extern sein.',
    },
    {
      id: 's02-q024', kind: 'number', skill: 'sich.ds.organisation', difficulty: 1,
      prompt: 'Ab wie vielen Personen, die in der Regel ständig mit der automatisierten Verarbeitung personenbezogener Daten beschäftigt sind, ist in Deutschland ein Datenschutzbeauftragter zu benennen (§ 38 BDSG)?',
      answer: 20, unit: 'Personen',
      misconceptions: [{ answer: '10', error: 'dsb-schwelle', why: 'Die Schwelle lag früher bei 10 – seit November 2019 sind es 20 Personen.' }],
      explanation: '**20 Personen** (seit der Änderung des BDSG 2019; vorher 10).',
    },
    {
      id: 's02-q025', kind: 'multi', skill: 'sich.ds.organisation', difficulty: 2,
      prompt: 'In welchen Fällen ist typischerweise ein **Vertrag zur Auftragsverarbeitung** (Art. 28) nötig?',
      options: ['Ein Cloud-Anbieter speichert die Kundendatenbank der Firma.', 'Ein IT-Dienstleister wartet per Fernzugriff den Personalserver.', 'Ein Aktenvernichtungsdienst holt Personalakten zur Vernichtung ab.', 'Ein Kunde bestellt im Webshop.', 'Ein externer Dienstleister erstellt die Lohnabrechnung nach Vorgaben der Firma.'],
      answer: [0, 1, 2, 4],
      explanation: 'Weisungsgebundene Verarbeitung (oder Zugriffsmöglichkeit) durch Dienstleister → AV-Vertrag. Der Kunde im Webshop ist Betroffener, kein Auftragsverarbeiter.',
    },
    {
      id: 's02-q026', kind: 'number', skill: 'sich.ds.organisation', difficulty: 2,
      prompt: 'Ein Unternehmen mit **1,2 Mrd. €** weltweitem Jahresumsatz im Vorjahr hat eine Datenpanne nicht gemeldet (Verstoß gegen Art. 33 → Art. 83 **Abs. 4**: 10 Mio. € oder 2 % des Umsatzes, der höhere Betrag). Wie hoch ist der Bußgeldrahmen höchstens in **Mio. €**?',
      answer: 24, unit: 'Mio. €', tolerance: 0.01,
      hints: ['1,2 Mrd. € = 1.200 Mio. €', '2 % davon mit 10 Mio. € vergleichen.'],
      misconceptions: [{ answer: '10', error: 'bussgeld-niedriger-wert', why: 'Es gilt der höhere Wert: 2 % von 1.200 Mio. € = 24 Mio. €.' }, { answer: '48', error: 'bussgeld-stufe', why: 'Eine verletzte Meldepflicht fällt unter Abs. 4 (2 %), nicht unter Abs. 5 (4 %).' }],
      explanation: '2 % × 1.200 Mio. € = **24 Mio. €** > 10 Mio. € → Obergrenze 24 Mio. €.',
    },
    {
      id: 's02-q027', kind: 'single', skill: 'sich.ds.organisation', difficulty: 2,
      prompt: 'Ein unverschlüsselter USB-Stick mit **Gesundheitsdaten** von 40 Beschäftigten ist verloren gegangen. Was gilt?',
      options: ['Meldung an die Aufsichtsbehörde binnen 72 Stunden und wegen des hohen Risikos auch Benachrichtigung der Betroffenen', 'Nur interne Dokumentation, da es weniger als 100 Betroffene sind', 'Keine Pflichten, da der Stick vielleicht nicht gefunden wird', 'Nur Benachrichtigung der Betroffenen, keine Meldung an die Behörde'],
      answer: 0,
      distractors: {
        '1': { why: 'Es gibt keine Mindestzahl von Betroffenen. Entscheidend ist das Risiko.', error: 'datenpanne-bewertung' },
        '2': { why: 'Der Finder kann die Daten ohne Hürde lesen – das Risiko besteht.', error: 'datenpanne-bewertung' },
        '3': { why: 'Wenn die Betroffenen benachrichtigt werden müssen (hohes Risiko), ist erst recht die Aufsichtsbehörde zu informieren.', error: 'datenpanne-bewertung' },
      },
      explanation: 'Art.-9-Daten, unverschlüsselt → hohes Risiko → Art. 33 (Behörde, 72 h) **und** Art. 34 (Betroffene). Lehre: USB-Sticks nur verschlüsselt bzw. sperren.',
    },
    {
      id: 's02-q028', kind: 'free', skill: 'sich.ds.organisation', difficulty: 3,
      prompt: 'Erläutern Sie, warum eine wirksame **Festplattenverschlüsselung** bei Notebooks auch aus Sicht der DSGVO-Meldepflichten sinnvoll ist.',
      modelAnswer: 'Geht ein Notebook verloren, liegt grundsätzlich eine Verletzung des Schutzes personenbezogener Daten vor. Sind die Daten jedoch nach dem Stand der Technik verschlüsselt und ist der Schlüssel (PIN/Passwort) nicht kompromittiert, kann ein Finder die Daten nicht lesen. Dann führt die Panne voraussichtlich nicht zu einem Risiko für die Betroffenen – eine Meldung an die Aufsichtsbehörde (Art. 33) kann entfallen, und die Benachrichtigung der Betroffenen entfällt nach Art. 34 Abs. 3 a ausdrücklich. Es bleibt nur die interne Dokumentationspflicht. Die Verschlüsselung ist zudem eine in Art. 32 ausdrücklich genannte TOM und senkt das Bußgeld- und Imagerisiko.',
      keywords: ['Verschlüsselung', 'kein Risiko', 'Art. 33', 'Art. 34', 'Dokumentation', 'Art. 32'],
      explanation: 'Verschlüsselung macht aus einem Datenschutzvorfall oft nur noch einen Sachschaden.',
    },
    {
      id: 's02-q029', kind: 'order', skill: 'sich.ds.organisation', difficulty: 1,
      prompt: 'Ordne die Bußgeldstufen und Grenzen: Bringe die Höchstrahmen aufsteigend in Reihenfolge.',
      items: ['Art. 83 Abs. 4: 10 Mio. € oder 2 % des Vorjahresumsatzes', 'Art. 83 Abs. 5: 20 Mio. € oder 4 % des Vorjahresumsatzes'],
      explanation: 'Abs. 4 (Pflichtverstöße) < Abs. 5 (Grundsätze, Rechtsgrundlage, Betroffenenrechte).',
    },
    {
      id: 's02-q030', kind: 'single', skill: 'sich.ds.organisation', difficulty: 2,
      prompt: 'Wer sollte aus Gründen der Unabhängigkeit **nicht** zum internen Datenschutzbeauftragten der Elektro Krämer GmbH benannt werden?',
      options: ['Der Leiter der IT-Abteilung', 'Eine fachkundige Mitarbeiterin aus der Qualitätssicherung', 'Ein externer, zertifizierter Datenschutzdienstleister (als externer DSB)', 'Ein geschulter Mitarbeiter aus der Rechtsabteilung ohne Leitungsfunktion für Datenverarbeitungen'],
      answer: 0,
      distractors: {
        '1': { why: 'Eine fachkundige Person ohne Interessenkonflikt ist geeignet.', error: 'dsb-interessenkonflikt' },
        '2': { why: 'Ein externer DSB ist ausdrücklich zulässig (Art. 37 Abs. 6).', error: 'dsb-interessenkonflikt' },
        '3': { why: 'Ohne Entscheidungsbefugnis über Datenverarbeitungen besteht kein typischer Interessenkonflikt.', error: 'dsb-interessenkonflikt' },
      },
      explanation: 'Der IT-Leiter entscheidet über Mittel der Verarbeitung – er müsste sich selbst kontrollieren (Interessenkonflikt, Art. 38 Abs. 6).',
    },
    {
      id: 's02-q031', kind: 'text', skill: 'sich.ds.organisation', difficulty: 1,
      prompt: 'Wie heißt die Dokumentation, in der ein Unternehmen nach Art. 30 DSGVO alle Verarbeitungen personenbezogener Daten mit Zweck, Datenkategorien, Empfängern und Löschfristen festhält? (Abkürzung oder Begriff)',
      accept: ['Verzeichnis von Verarbeitungstätigkeiten', 'VVT', 'Verarbeitungsverzeichnis', 'Verzeichnis der Verarbeitungstätigkeiten'],
      explanation: '**Verzeichnis von Verarbeitungstätigkeiten (VVT)** – Grundlage der Rechenschaftspflicht.',
    },
    {
      id: 's02-q032', kind: 'free', skill: 'sich.ds.begriffe', difficulty: 2,
      prompt: 'Erläutern Sie den Unterschied zwischen **Datenschutz** und **Datensicherheit** und zeigen Sie an einem Beispiel, wie beide zusammenhängen.',
      modelAnswer: 'Datenschutz schützt die Persönlichkeitsrechte von Menschen: Er regelt, ob und wie personenbezogene Daten verarbeitet werden dürfen (z. B. Rechtsgrundlage, Zweckbindung, Betroffenenrechte nach DSGVO). Datensicherheit schützt Daten jeder Art technisch und organisatorisch vor Verlust, Manipulation und unbefugtem Zugriff (Schutzziele Vertraulichkeit, Integrität, Verfügbarkeit). Zusammenhang: Die DSGVO verlangt in Art. 32 Datensicherheit als Mittel des Datenschutzes. Beispiel: Die Personaldatenbank darf nach Datenschutzrecht für die Gehaltsabrechnung genutzt werden; damit Unbefugte sie nicht lesen, sorgt die Datensicherheit mit Zugriffsrechten, Verschlüsselung und Backups für ihren Schutz.',
      keywords: ['Persönlichkeitsrecht', 'personenbezogen', 'Schutzziele', 'Art. 32', 'TOM'],
      explanation: 'Datenschutz = Ob/Wie der Verarbeitung (Menschen); Datensicherheit = Schutz der Daten (Technik/Organisation).',
    },
    {
      id: 's02-q033', kind: 'table', skill: 'sich.ds.tom', difficulty: 3,
      prompt: 'Dein Schulbuch nennt die Kontrollen nach **§ 64 BDSG**. Trage für jeden Buchbegriff den **klassischen** Begriff ein (Zutrittskontrolle, Zugangskontrolle, Zugriffskontrolle, Weitergabekontrolle, Eingabekontrolle, Auftragskontrolle, Verfügbarkeitskontrolle oder Trennungsgebot).',
      columns: [{ key: 'k', label: 'klassischer Begriff', type: 'text' }],
      rows: [
        { label: 'Zugangskontrolle (§ 64: Unbefugten den Zugang zu Verarbeitungsanlagen verwehren)', cells: { k: { answer: 'Zutrittskontrolle', accept: ['Zutritt'] } } },
        { label: 'Benutzerkontrolle (Nutzung der Systeme durch Unbefugte verhindern)', cells: { k: { answer: 'Zugangskontrolle', accept: ['Zugang'] } } },
        { label: 'Transportkontrolle (Daten bei Übermittlung und Transport von Datenträgern schützen)', cells: { k: { answer: 'Weitergabekontrolle', accept: ['Weitergabe'] } } },
        { label: 'Wiederherstellbarkeit (Systeme nach einer Störung wiederherstellen)', cells: { k: { answer: 'Verfügbarkeitskontrolle', accept: ['Verfügbarkeit', 'Verfuegbarkeitskontrolle'] } } },
        { label: 'Trennbarkeit (Daten verschiedener Zwecke getrennt verarbeiten)', cells: { k: { answer: 'Trennungsgebot', accept: ['Trennungskontrolle', 'Trennung'] } } },
      ],
      misconceptions: [{ cell: '0:k', answer: 'Zugangskontrolle', error: 'tom-zutritt-zugang', why: 'In § 64 BDSG meint „Zugangskontrolle“ den Zugang zu den **Geräten** (Raum) – das ist klassisch die **Zutrittskontrolle**.' }],
      hints: ['Achte auf die Beschreibung in Klammern, nicht nur auf das Wort.'],
      explanation: '§ 64-Zugangskontrolle → **Zutrittskontrolle** (Raum) · Benutzerkontrolle → **Zugangskontrolle** (System) · Transportkontrolle → **Weitergabekontrolle** · Wiederherstellbarkeit → **Verfügbarkeitskontrolle** · Trennbarkeit → **Trennungsgebot**.\n\nHäufiger Fehler: das Wort „Zugangskontrolle“ einfach übernehmen, obwohl die Beschreibung den Raum meint.',
    },
    {
      id: 's02-q034', kind: 'free', skill: 'sich.ds.tom', difficulty: 2,
      prompt: 'In einer Aufgabe heißt es: „Nennen Sie eine Maßnahme zur **Zugangskontrolle** für den Serverraum.“ Erläutern Sie, warum der Begriff hier missverständlich ist, und formulieren Sie eine eindeutige Antwort.',
      modelAnswer: 'Der Begriff ist doppeldeutig: Nach der klassischen Gliederung (altes BDSG) bedeutet Zugangskontrolle, dass Unbefugte ein IT-System nicht benutzen können (Anmeldung). Der räumliche Schutz heißt dort Zutrittskontrolle. Nach § 64 BDSG, den manche Bücher verwenden, ist mit Zugangskontrolle dagegen gerade der Zugang zu den Verarbeitungsanlagen, also der Raumschutz, gemeint. Da die Aufgabe den Serverraum nennt, ist der räumliche Schutz gemeint. Eindeutige Antwort: „Zutrittskontrolle (Raum): Der Serverraum wird mit einem elektronischen Schließsystem gesichert, Zutritt nur für Administratoren per Chipkarte mit Protokollierung.“',
      keywords: ['Zutrittskontrolle', 'Raum', 'Anmeldung', '§ 64', 'Chipkarte', 'eindeutig'],
      explanation: 'Wenn Begriffe doppeldeutig sind, nenne beide Lesarten kurz oder schreibe in Klammern dazu, was du meinst – so verlierst du keine Punkte.',
    },
    {
      id: 's02-q035', kind: 'free', skill: 'sich.ds.organisation', difficulty: 2,
      prompt: 'Die Elektro Krämer GmbH lagert die Lohnabrechnung an einen Dienstleister aus. Nennen Sie sechs Inhalte, die der **Vertrag zur Auftragsverarbeitung** enthalten muss, und die Rechtsgrundlage.',
      modelAnswer: 'Rechtsgrundlage: Art. 28 DSGVO (Abs. 3). Inhalte: 1. Gegenstand und Dauer der Verarbeitung. 2. Art und Zweck der Verarbeitung, Art der personenbezogenen Daten (z. B. Bankverbindung, Steuer-ID) und Kategorien betroffener Personen (Beschäftigte). 3. Verarbeitung nur auf dokumentierte Weisung des Auftraggebers. 4. Verpflichtung der eingesetzten Personen zur Vertraulichkeit. 5. Technische und organisatorische Maßnahmen nach Art. 32. 6. Einsatz von Unterauftragsverarbeitern nur mit Genehmigung. 7. Unterstützung bei Betroffenenrechten und bei Datenpannen. 8. Löschung oder Rückgabe aller Daten nach Vertragsende. 9. Nachweise und Kontrollrechte (Audits/Inspektionen) des Auftraggebers.',
      keywords: ['Art. 28', 'Weisung', 'Vertraulichkeit', 'TOM', 'Unterauftrag', 'Löschung', 'Kontrollrechte'],
      explanation: 'Sechs der neun Punkte genügen. Achtung: Manche Bücher nennen § 62 BDSG – für Unternehmen ist **Art. 28 DSGVO** richtig.',
    },
    {
      id: 's02-q036', kind: 'single', skill: 'sich.ds.organisation', difficulty: 2,
      prompt: 'Das IT-Systemhaus betreut per **Fernwartung** den Server einer Arztpraxis und kann dabei auf Patientendaten zugreifen. Was ist datenschutzrechtlich nötig?',
      options: [
        'Ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO mit Regeln zu Weisungen, TOM und Kontrollrechten',
        'Nichts, weil das Systemhaus die Daten nur sieht und nicht speichert',
        'Eine Einwilligung jeder Patientin und jedes Patienten in die Fernwartung',
        'Ein Vertrag nach § 62 BDSG',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Schon die Möglichkeit, auf personenbezogene Daten zuzugreifen, ist Verarbeitung im Auftrag – „nur ansehen“ ist ebenfalls Verarbeitung.', error: 'av-missverstanden' },
        '2': { why: 'Die Praxis setzt einen weisungsgebundenen Dienstleister ein – das regelt ein AV-Vertrag, keine Einwilligung der Patienten.', error: 'av-missverstanden' },
        '3': { why: '§ 62 BDSG betrifft Polizei und Justiz. Für Unternehmen und Praxen gilt Art. 28 DSGVO.', error: 'av-missverstanden' },
      },
      explanation: 'Fernwartung und Helpdesk mit Zugriff auf personenbezogene Daten sind klassische Fälle der **Auftragsverarbeitung** (Art. 28 DSGVO). Zusätzlich sinnvoll: Fernzugriff nur nach Freigabe durch die Praxis, protokolliert, verschlüsselt.',
    },
    {
      id: 's02-q037', kind: 'multi', skill: 'sich.ds.organisation', difficulty: 2,
      prompt: 'Welche Regelungen gehören nach Art. 28 Abs. 3 DSGVO **zwingend** in einen Vertrag zur Auftragsverarbeitung?',
      options: ['Verarbeitung nur auf dokumentierte Weisung', 'Unterauftragsverarbeiter nur mit Genehmigung des Auftraggebers', 'Löschung oder Rückgabe der Daten nach Vertragsende', 'Kontrollrechte des Auftraggebers (Inspektionen)', 'Höhe der Vergütung des Dienstleisters', 'Zahlungsziel und Skonto'],
      answer: [0, 1, 2, 3],
      explanation: 'Weisungsbindung, Unterauftragsverarbeiter, Löschung/Rückgabe und Kontrollrechte sind Pflichtinhalte nach Art. 28 Abs. 3. Vergütung und Zahlungsbedingungen stehen im Hauptvertrag (Dienstleistungsvertrag), nicht im AV-Vertrag.',
    },
  ],
};
