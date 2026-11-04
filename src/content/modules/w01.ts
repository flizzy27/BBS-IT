import type { Module } from '../types';

export const w01: Module = {
  id: 'w01',
  nr: 1,
  area: 'wirtschaft',
  title: 'Kundenanforderungen & Beratung',
  short: 'Kundengespräche führen, Bedarf ermitteln, Anforderungen formulieren und im Lasten- und Pflichtenheft festhalten – zielgruppengerecht und barrierefrei.',
  icon: 'MessagesSquare',
  relevance: 'ap1',
  prerequisites: [],
  skills: [
    { id: 'w.gespraech', module: 'w01', title: 'Kundengespräch strukturiert führen' },
    { id: 'w.fragetechnik', module: 'w01', title: 'Fragetechniken & aktives Zuhören', requires: ['w.gespraech'] },
    { id: 'w.kommunikation', module: 'w01', title: 'Kommunikationsmodelle & Reklamationsgespräch' },
    { id: 'w.anforderungen', module: 'w01', title: 'Anforderungen ermitteln (funktional / nicht-funktional)', requires: ['w.fragetechnik'] },
    { id: 'w.lastenheft', module: 'w01', title: 'Lastenheft und Pflichtenheft', requires: ['w.anforderungen'] },
    { id: 'w.zielgruppe', module: 'w01', title: 'Zielgruppengerecht beraten & Barrierefreiheit' },
  ],
  lessons: [
    /* ------------------------------------------------------------ */
    {
      id: 'w01-l01',
      title: 'Das Kundengespräch: Ablauf und Fragetechniken',
      minutes: 25,
      relevance: 'ap1',
      skills: ['w.gespraech', 'w.fragetechnik'],
      steps: [
        {
          type: 'explain',
          title: 'Warum das Kundengespräch prüfungsrelevant ist',
          body: `Die AP1 heißt „Einrichten eines IT-gestützten Arbeitsplatzes“. Laut Ausbildungsverordnung (§ 9 FIAusbV) sollst du darin u. a. zeigen, dass du **Kundenbedarfe zielgruppengerecht ermitteln** kannst. Bevor du also Hardware auswählst oder ein Angebot schreibst, musst du herausfinden, **was der Kunde wirklich braucht**. Fast jede AP1-Handlungssituation beginnt deshalb mit einem Kunden: einer Abteilung, die neue Arbeitsplätze möchte, einem Kollegen mit Problemen oder einem externen Auftraggeber des IT-Systemhauses.

**Phasen eines Beratungsgesprächs**

| Phase | Was du tust | Beispiel |
|---|---|---|
| 1. Vorbereitung | Infos sammeln (Kundendaten, bisherige Ausstattung, Ziel des Termins), Unterlagen bereitlegen | Inventarliste der Buchhaltung ansehen |
| 2. Kontaktphase | Begrüßen, vorstellen, Rahmen klären (Zeit, Ziel) | „Wir haben 30 Minuten – heute geht es um Ihre neuen Arbeitsplätze.“ |
| 3. Bedarfsermittlung | Fragen stellen, **aktiv zuhören**, notieren | „Welche Programme nutzen Sie täglich?“ |
| 4. Lösungsvorschlag | Bedarf zusammenfassen, Lösung **in der Sprache des Kunden** vorstellen, Nutzen betonen | „Mit zwei Monitoren haben Sie Rechnung und Buchungsmaske gleichzeitig im Blick.“ |
| 5. Einwandbehandlung | Bedenken ernst nehmen, nachfragen, begründet antworten | „Zu teuer?“ → Gesamtkosten und Nutzen erklären |
| 6. Abschluss | Ergebnis und nächste Schritte vereinbaren | „Bis Freitag erhalten Sie das Angebot.“ |
| 7. Nachbereitung | **Gesprächsprotokoll** erstellen, Aufgaben verteilen, Termine eintragen | Protokoll an alle Teilnehmenden |

**Fragetechniken** – das wichtigste Werkzeug der Bedarfsermittlung:

| Frageart | Merkmal | Beispiel | Wann sinnvoll? |
|---|---|---|---|
| **Offene Frage** (W-Frage) | beginnt mit Wer/Was/Wie/Wo/Warum/Welche …; Antwort frei | „Wie läuft ein typischer Arbeitstag bei Ihnen ab?“ | am Anfang, um viel Information zu bekommen |
| **Geschlossene Frage** | Antwort nur Ja/Nein (oder eine konkrete Angabe) | „Arbeiten Sie auch im Homeoffice?“ | zum Präzisieren und Bestätigen |
| **Alternativfrage** | lässt zwischen vorgegebenen Möglichkeiten wählen | „Möchten Sie lieber ein Notebook mit Dockingstation oder einen Desktop-PC?“ | zur Entscheidung / zum Abschluss |
| **Kontrollfrage** | prüft, ob man richtig verstanden hat | „Habe ich Sie richtig verstanden, dass …?“ | nach längeren Erklärungen |
| **Suggestivfrage** | legt die Antwort in den Mund | „Sie wollen doch sicher das bessere Modell?“ | **vermeiden** – wirkt manipulativ |
| **Rhetorische Frage** | erwartet keine Antwort | „Wer möchte schon Daten verlieren?“ | sparsam, z. B. in Präsentationen |

**Aktives Zuhören** bedeutet: dem Kunden zugewandt sein (Blickkontakt, nicken), **nicht unterbrechen**, das Gehörte in eigenen Worten wiedergeben (**Paraphrasieren**: „Sie meinen also …“), bei Unklarem **nachfragen** und am Ende **zusammenfassen**. So vermeidest du Missverständnisse, die später teure Nacharbeiten verursachen.`,
        },
        {
          type: 'visual',
          title: 'Fragetechniken auf einen Blick',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Offene Frage', text: 'W-Fragen: Was, Wie, Welche, Warum … – liefern viele Informationen. Ideal zu Beginn der Bedarfsermittlung.', icon: 'MessageCircleQuestion' },
                { title: 'Geschlossene Frage', text: 'Antwort Ja/Nein oder ein konkreter Wert – präzisiert und bestätigt Details.', icon: 'CheckSquare' },
                { title: 'Alternativfrage', text: 'Zwei oder mehr Möglichkeiten zur Auswahl – führt zur Entscheidung.', icon: 'Split' },
                { title: 'Kontrollfrage', text: '„Habe ich richtig verstanden, dass …?“ – sichert das gemeinsame Verständnis.', icon: 'RefreshCcw' },
                { title: 'Suggestivfrage', text: '„Sie wollen doch sicher …?“ – manipulativ, im Beratungsgespräch vermeiden.', icon: 'AlertTriangle' },
                { title: 'Aktives Zuhören', text: 'Zuwenden, nicht unterbrechen, paraphrasieren, nachfragen, zusammenfassen.', icon: 'Ear' },
              ],
            },
          },
          caption: 'Ein gutes Bedarfsgespräch beginnt offen (viel erfahren) und wird dann geschlossener (Details festzurren).',
        },
        {
          type: 'example',
          title: 'Bedarfsgespräch mit der Buchhaltung',
          problem: `Frau Yilmaz, Leiterin der Buchhaltung der **Elektro Krämer GmbH** (Standort Hamburg), möchte für ihr Team (4 Personen) neue Arbeitsplätze. Du sollst den Bedarf ermitteln. Plane passende Fragen und ordne sie den Fragearten zu.`,
          steps: [
            { label: 'Einstieg mit offenen Fragen', body: '„Wie sieht ein typischer Arbeitstag in Ihrem Team aus?“ · „Mit welchen Programmen arbeiten Sie hauptsächlich?“ · „Was stört Sie an den jetzigen Arbeitsplätzen am meisten?“ → Ergebnis: DATEV und Excel, viele PDF-Rechnungen, ein kleiner Monitor, langsamer Start.' },
            { label: 'Details mit geschlossenen Fragen', body: '„Arbeiten Ihre Mitarbeitenden auch im Homeoffice?“ → Ja, 2 Tage pro Woche. · „Müssen Belege eingescannt werden?“ → Ja, täglich ca. 50 Seiten.' },
            { label: 'Kontrollfrage', body: '„Habe ich richtig verstanden: Sie brauchen mobile Geräte für das Homeoffice, zwei Monitore im Büro und einen Scanner für die Belege?“ → „Genau.“' },
            { label: 'Alternativfrage zum Abschluss', body: '„Sollen wir den Scanner pro Arbeitsplatz einplanen oder lieber ein zentrales Multifunktionsgerät mit Scan-to-Folder?“ → zentrales Gerät.' },
            { label: 'Nachbereitung', body: 'Gesprächsprotokoll mit Datum, Teilnehmenden, ermitteltem Bedarf (4 Notebooks mit Dockingstation, je 2 Monitore, zentrales MFP, VPN für Homeoffice), offenen Punkten und nächsten Schritten (Angebot bis Freitag).' },
          ],
          result: 'Offene Fragen liefern das Gesamtbild, geschlossene Fragen und Kontrollfragen präzisieren, Alternativfragen führen zur Entscheidung. Alles wird im Gesprächsprotokoll festgehalten.',
        },
        {
          type: 'check',
          question: {
            id: 'w01-c01', kind: 'single', skill: 'w.fragetechnik', difficulty: 1,
            prompt: 'Welche Frageart ist: **„Welche Anwendungen nutzen Sie im Homeoffice?“**',
            options: ['Geschlossene Frage', 'Offene Frage', 'Suggestivfrage', 'Alternativfrage'],
            answer: 1,
            distractors: {
              '0': { why: 'Eine geschlossene Frage lässt sich mit Ja/Nein beantworten. „Welche …“ verlangt eine freie Antwort.', error: 'w-frageart-verwechselt' },
              '2': { why: 'Eine Suggestivfrage legt dem Gegenüber eine Antwort nahe („Sie nutzen doch sicher …?“). Das ist hier nicht der Fall.', error: 'w-frageart-verwechselt' },
              '3': { why: 'Eine Alternativfrage gibt Möglichkeiten vor („A oder B?“).', error: 'w-frageart-verwechselt' },
            },
            explanation: 'W-Fragen („Welche …“) sind **offene Fragen** – die Antwort ist frei formuliert und liefert viele Informationen.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'w01-c02', kind: 'order', skill: 'w.gespraech', difficulty: 1,
            prompt: 'Bringe die Phasen eines Beratungsgesprächs in die richtige Reihenfolge.',
            items: ['Vorbereitung', 'Kontaktphase (Begrüßung)', 'Bedarfsermittlung', 'Lösungsvorschlag', 'Einwandbehandlung', 'Abschluss', 'Nachbereitung (Protokoll)'],
            explanation: 'Erst vorbereiten und Kontakt herstellen, dann Bedarf ermitteln, Lösung vorschlagen, Einwände behandeln, abschließen – und das Ergebnis im Protokoll festhalten.',
          },
        },
        { type: 'practice', title: 'Übung: Fragetechniken', questionIds: ['w01-q001', 'w01-q002', 'w01-q003', 'w01-q004'], count: 4, difficulty: 1 },
        { type: 'summary', points: ['Gespräch in Phasen: Vorbereitung → Kontakt → Bedarf → Lösung → Einwände → Abschluss → Nachbereitung.', 'Offene Fragen am Anfang, geschlossene und Kontrollfragen zum Präzisieren, Alternativfragen zur Entscheidung.', 'Suggestivfragen vermeiden.', 'Aktives Zuhören: zuwenden, nicht unterbrechen, paraphrasieren, zusammenfassen.', 'Ergebnis immer im Gesprächsprotokoll festhalten.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'w01-l02',
      title: 'Kommunikationsmodelle und schwierige Gespräche',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['w.kommunikation'],
      steps: [
        {
          type: 'explain',
          title: 'Warum Missverständnisse entstehen',
          body: `**Sender-Empfänger-Modell:** Ein Sender **codiert** einen Gedanken in eine Nachricht (Worte, Gestik, E-Mail), der Empfänger muss sie **decodieren**. Dazwischen gibt es **Störungen**: Lärm, Fachchinesisch, unterschiedliches Vorwissen, Stress. Rückmeldung (**Feedback**) zeigt, ob die Nachricht so angekommen ist wie gemeint.

**Vier-Seiten-Modell (Schulz von Thun):** Jede Nachricht hat vier Seiten – und der Empfänger hört mit „vier Ohren“:

| Seite | Frage | Beispiel: Kunde sagt „Der Drucker druckt schon wieder nicht!“ |
|---|---|---|
| **Sachinhalt** | Worüber informiere ich? | Der Drucker funktioniert nicht. |
| **Selbstkundgabe** (Selbstoffenbarung) | Was gebe ich von mir preis? | Ich bin genervt und unter Zeitdruck. |
| **Beziehung** | Was halte ich von dir / wie stehen wir zueinander? | Ihr von der IT bekommt das nie richtig hin. |
| **Appell** | Wozu will ich dich veranlassen? | Kümmern Sie sich sofort darum! |

Hört der IT-Mitarbeiter vor allem mit dem **Beziehungsohr**, fühlt er sich angegriffen und reagiert gereizt – das Gespräch eskaliert. Professionell ist: den **Sachinhalt** aufnehmen, die **Selbstkundgabe** anerkennen („Ich verstehe, dass das ärgerlich ist“) und auf den **Appell** reagieren („Ich schaue mir das jetzt an“).

**Watzlawick** formulierte u. a.: „Man kann nicht **nicht** kommunizieren.“ Auch Schweigen, Augenrollen oder eine verspätete Antwort senden eine Botschaft. Außerdem hat jede Kommunikation einen **Inhalts-** und einen **Beziehungsaspekt**.

**Reklamations- und Konfliktgespräche** – bewährter Ablauf:
1. **Ruhig bleiben und zuhören** – den Kunden ausreden lassen, nicht rechtfertigen.
2. **Verständnis zeigen** – „Ich verstehe, dass der Ausfall Ihre Arbeit blockiert.“ (Verständnis heißt nicht automatisch Schuldanerkenntnis.)
3. **Sachverhalt klären** – gezielte Fragen: Seit wann? Welche Meldung? Wer ist betroffen?
4. **Lösung anbieten** und verbindlich vereinbaren (wer, was, bis wann).
5. **Nachfassen** – prüfen, ob das Problem wirklich gelöst ist; dokumentieren (Ticket).

**Ich-Botschaften** statt Du-Botschaften: „Ich brauche die Fehlermeldung, um das Problem einzugrenzen“ statt „Sie haben mir ja nicht mal die Fehlermeldung geschickt“.`,
        },
        {
          type: 'visual',
          title: 'Die vier Seiten einer Nachricht',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Sachinhalt', text: 'Daten, Fakten, Sachverhalte: „Der Drucker druckt nicht.“', icon: 'FileText' },
                { title: 'Selbstkundgabe', text: 'Was der Sender über sich verrät: „Ich bin gestresst.“', icon: 'User' },
                { title: 'Beziehung', text: 'Wie der Sender zum Empfänger steht: „Die IT kriegt es nie hin.“', icon: 'Users' },
                { title: 'Appell', text: 'Wozu der Empfänger gebracht werden soll: „Beheben Sie das sofort!“', icon: 'Megaphone' },
              ],
            },
          },
          caption: 'Schulz von Thun: Jede Äußerung enthält alle vier Seiten – unterschiedlich stark ausgeprägt.',
        },
        {
          type: 'example',
          title: 'Eine Kundenäußerung analysieren',
          problem: 'Der Vertriebsleiter sagt zu dir am Telefon: **„Ich warte jetzt schon seit zwei Tagen auf mein neues Notebook.“** Analysiere die Äußerung nach dem Vier-Seiten-Modell und formuliere eine professionelle Antwort.',
          steps: [
            { label: 'Sachinhalt', body: 'Das Notebook ist seit zwei Tagen nicht geliefert/eingerichtet.' },
            { label: 'Selbstkundgabe', body: 'Ich bin ungeduldig/verärgert, mir fehlt ein Arbeitsmittel.' },
            { label: 'Beziehung', body: 'Ich fühle mich von der IT nicht ernst genommen.' },
            { label: 'Appell', body: 'Sorgen Sie dafür, dass ich das Notebook schnell bekomme – und informieren Sie mich!' },
            { label: 'Professionelle Antwort', body: '„Ich verstehe, dass Sie das Gerät dringend brauchen. Ich prüfe sofort den Stand: Das Gerät ist eingetroffen und wird heute eingerichtet. Ich bringe es Ihnen morgen um 9 Uhr vorbei und richte es mit Ihnen ein – passt Ihnen das?“' },
          ],
          result: 'Die Antwort greift Sachinhalt (Status), Selbstkundgabe (Verständnis) und Appell (konkreter Termin) auf und reagiert nicht gereizt auf die Beziehungsseite.',
        },
        {
          type: 'check',
          question: {
            id: 'w01-c03', kind: 'match', skill: 'w.kommunikation', difficulty: 2,
            prompt: 'Eine Kollegin sagt: **„Das VPN ist ja mal wieder super langsam.“** Ordne die Deutungen den vier Seiten zu.',
            left: ['Die VPN-Verbindung ist langsam.', 'Ich bin frustriert.', 'Ihr von der IT kümmert euch nicht richtig darum.', 'Macht das VPN schneller!'],
            right: ['Sachinhalt', 'Selbstkundgabe', 'Beziehung', 'Appell'],
            answer: [0, 1, 2, 3],
            explanation: 'Fakt = Sachinhalt; eigenes Gefühl = Selbstkundgabe; Haltung gegenüber dem Empfänger = Beziehung; Aufforderung = Appell. Das „mal wieder“ und die Ironie verstärken Beziehungs- und Selbstkundgabe-Seite.',
          },
        },
        { type: 'practice', title: 'Übung: Kommunikation', questionIds: ['w01-q007', 'w01-q008', 'w01-q009', 'w01-q010'], count: 4, difficulty: 2 },
        { type: 'summary', points: ['Sender codiert, Empfänger decodiert – Störungen sind normal, Feedback deckt sie auf.', 'Vier Seiten: Sachinhalt, Selbstkundgabe, Beziehung, Appell.', 'Watzlawick: Man kann nicht nicht kommunizieren.', 'Reklamation: zuhören, Verständnis zeigen, klären, Lösung vereinbaren, nachfassen.', 'Ich-Botschaften statt Vorwürfe.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'w01-l03',
      title: 'Bedarfsanalyse: Anforderungen ermitteln und formulieren',
      minutes: 25,
      relevance: 'ap1',
      skills: ['w.anforderungen'],
      steps: [
        {
          type: 'explain',
          title: 'Vom Wunsch zur prüfbaren Anforderung',
          body: `Die **Bedarfsanalyse** besteht meist aus zwei Teilen:

- **Ist-Analyse:** Was ist vorhanden? (Hardware, Software, Netz, Arbeitsabläufe, Probleme)
- **Soll-Konzept:** Was soll künftig erreicht werden? (Ziele, Anforderungen, Rahmenbedingungen wie Budget und Termin)

**Funktionale und nicht-funktionale Anforderungen**

| Art | Frage | Beispiele |
|---|---|---|
| **Funktional** | **Was** soll das System tun? | „Belege können per Scan-to-Folder in die Buchhaltungssoftware übernommen werden.“ · „Mitarbeitende können sich per VPN aus dem Homeoffice verbinden.“ |
| **Nicht-funktional** (Qualitätsanforderung) | **Wie gut / unter welchen Bedingungen** soll es das tun? | Leistung („Der PC startet in unter 30 s.“), Zuverlässigkeit/Verfügbarkeit, Sicherheit („Festplatte verschlüsselt“), Benutzbarkeit/Ergonomie, Kompatibilität, Wartbarkeit, Energieverbrauch, Lautstärke |

Dazu kommen **Rahmenbedingungen** (Randbedingungen): Budget, Termin, vorhandene Infrastruktur, gesetzliche Vorgaben (z. B. DSGVO), Unternehmensrichtlinien.

Als Orientierung für Qualitätsmerkmale dient die Norm **ISO/IEC 25010** (u. a. funktionale Eignung, Leistungseffizienz, Kompatibilität, Benutzbarkeit, Zuverlässigkeit, Sicherheit, Wartbarkeit, Übertragbarkeit).

**Anforderungen prüfbar formulieren (SMART)** – damit später bei der Abnahme klar ist, ob sie erfüllt sind:

| Buchstabe | Bedeutung | schlecht | gut |
|---|---|---|---|
| S | spezifisch | „Ein schneller PC“ | „PC für DATEV und Excel mit 2 Monitoren“ |
| M | messbar | „viel Speicher“ | „mind. 16 GB RAM, 512 GB SSD“ |
| A | akzeptiert/erreichbar | „kostenlos“ | „Budget max. 1.300 € netto je Arbeitsplatz“ |
| R | realistisch | „nie wieder Ausfälle“ | „Verfügbarkeit 99,5 % in der Kernarbeitszeit“ |
| T | terminiert | „bald“ | „einsatzbereit bis 15.03.“ |

**Priorisieren mit MoSCoW:** **M**ust have (zwingend), **S**hould have (wichtig), **C**ould have (wünschenswert), **W**on't have (diesmal nicht). Zwingende Anforderungen werden beim Angebotsvergleich oft zu **K.-o.-Kriterien**.`,
        },
        {
          type: 'visual',
          title: 'Anforderungsarten',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Funktional', text: 'WAS soll das System leisten? Funktionen, Abläufe, Schnittstellen.', icon: 'Cog' },
                { title: 'Nicht-funktional', text: 'WIE GUT? Leistung, Sicherheit, Verfügbarkeit, Ergonomie, Energie, Wartbarkeit.', icon: 'Gauge' },
                { title: 'Rahmenbedingungen', text: 'Budget, Termin, vorhandene Infrastruktur, Gesetze (DSGVO), Richtlinien.', icon: 'Frame' },
              ],
            },
          },
          caption: 'Alle drei gehören in das Lastenheft – und alle müssen so konkret sein, dass man sie bei der Abnahme prüfen kann.',
        },
        {
          type: 'example',
          title: 'Kundenwünsche in Anforderungen übersetzen',
          problem: 'Der Kunde (Vertrieb, Standort Berlin) sagt: „Wir brauchen **schnelle, sichere Laptops**, mit denen wir **beim Kunden präsentieren** können. **Leicht** sollen sie sein, und **bald** brauchen wir sie.“ Formuliere daraus prüfbare Anforderungen und ordne sie zu.',
          steps: [
            { label: 'Funktional', body: 'Präsentationen über HDMI oder USB-C an Beamern/Displays beim Kunden ausgeben. · Zugriff auf das CRM über VPN von unterwegs (auch über Mobilfunk/LTE/5G).' },
            { label: 'Nicht-funktional', body: '„schnell“ → mind. 16 GB RAM, SSD, Systemstart < 30 s. · „sicher“ → Festplattenverschlüsselung, Anmeldung mit Windows Hello/Smartcard, automatische Updates. · „leicht“ → Gewicht ≤ 1,4 kg. Zusätzlich: Akkulaufzeit ≥ 8 h im Praxisbetrieb.' },
            { label: 'Rahmenbedingung', body: '„bald“ → Auslieferung einsatzbereit bis 31.05.; Budget mit dem Kunden klären (offene Frage!).' },
          ],
          result: 'Aus vagen Wünschen werden messbare Anforderungen. Unklare Punkte (Budget, Stückzahl) werden mit offenen/geschlossenen Fragen nachgeklärt.',
        },
        {
          type: 'check',
          question: {
            id: 'w01-c04', kind: 'table', skill: 'w.anforderungen', difficulty: 2,
            prompt: 'Ordne jede Anforderung zu: **f** = funktional, **nf** = nicht-funktional.',
            columns: [{ key: 't', label: 'f / nf', type: 'text' }],
            rows: [
              { label: 'Der Drucker kann beidseitig drucken (Duplex).', cells: { t: { answer: 'f', accept: ['funktional'] } } },
              { label: 'Das Notebook wiegt höchstens 1,3 kg.', cells: { t: { answer: 'nf', accept: ['nicht-funktional', 'nicht funktional'] } } },
              { label: 'Der Server ist zu 99,9 % verfügbar.', cells: { t: { answer: 'nf', accept: ['nicht-funktional', 'nicht funktional'] } } },
              { label: 'Benutzer können ihr Passwort selbst zurücksetzen.', cells: { t: { answer: 'f', accept: ['funktional'] } } },
            ],
            explanation: 'Funktional = **was** das System kann (Duplexdruck, Passwort-Self-Service). Nicht-funktional = **wie gut / unter welchen Bedingungen** (Gewicht, Verfügbarkeit).',
          },
        },
        { type: 'practice', title: 'Übung: Anforderungen', questionIds: ['w01-q011', 'w01-q012', 'w01-q013', 'w01-q014', 'w01-q015'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Ist-Analyse (was ist da?) → Soll-Konzept (was soll erreicht werden?).', 'Funktional = WAS, nicht-funktional = WIE GUT, dazu Rahmenbedingungen.', 'Anforderungen SMART und messbar formulieren – sonst ist keine Abnahme möglich.', 'MoSCoW priorisiert; Muss-Anforderungen werden zu K.-o.-Kriterien.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'w01-l04',
      title: 'Lastenheft und Pflichtenheft',
      minutes: 20,
      relevance: 'ap1',
      skills: ['w.lastenheft'],
      steps: [
        {
          type: 'explain',
          title: 'Wer schreibt was?',
          body: `Bei größeren Aufträgen werden die Anforderungen schriftlich festgehalten. Die Begriffe sind in **DIN 69901-5** (Projektmanagement – Begriffe) definiert:

| | **Lastenheft** | **Pflichtenheft** |
|---|---|---|
| Wer erstellt es? | **Auftraggeber** (Kunde) | **Auftragnehmer** (z. B. IT-Systemhaus) |
| Inhalt | **Was** und **wofür** – alle Anforderungen und Rahmenbedingungen aus Kundensicht | **Wie** und **womit** – konkrete Realisierung der Anforderungen aus dem Lastenheft |
| Zeitpunkt | vor der Ausschreibung / Anfrage | nach Erhalt des Lastenhefts, oft mit dem Angebot oder nach Auftragserteilung |
| Beispiel | „4 Arbeitsplätze für die Buchhaltung, DATEV-tauglich, Homeoffice-fähig, Budget 6.000 € netto“ | „4 × Notebook Modell X (i5, 16 GB RAM, 512 GB SSD), Dockingstation, 2 × 24-Zoll-Monitor, Einrichtung VPN-Client, Inbetriebnahme am 15.03.“ |

**Typischer Inhalt eines Lastenhefts:** Ausgangssituation (Ist-Zustand), Zielsetzung, funktionale und nicht-funktionale Anforderungen, Rahmenbedingungen (Budget, Termine, Schnittstellen zu vorhandenen Systemen), Abnahmekriterien, Lieferumfang.

**Typischer Inhalt eines Pflichtenhefts:** alle Punkte des Lastenhefts **plus** die technische Lösung (konkrete Produkte, Konfiguration, Netzplan), Zeitplan, Verantwortlichkeiten, Testfälle für die Abnahme.

**Warum ist das wichtig?**
- Das Pflichtenheft wird – wenn der Kunde es bestätigt – **Vertragsgrundlage**.
- Bei der **Abnahme** wird geprüft, ob die Leistung dem Pflichtenheft entspricht (Soll-Ist-Vergleich).
- Es schützt beide Seiten vor Missverständnissen und nachträglichen Wünschen („Scope Creep“). Änderungen werden über ein **Änderungsverfahren** (Change Request) vereinbart – mit Auswirkung auf Kosten und Termine.

**Merksatz:** **L**astenheft = **L**eistungswunsch des Kunden („Was?“). **P**flichtenheft = **P**lan des Dienstleisters („Wie?“).`,
        },
        {
          type: 'visual',
          title: 'Ablauf vom Lastenheft zur Abnahme',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['Kunde (Auftraggeber)', 'IT-Systemhaus (Auftragnehmer)'],
              messages: [
                { from: 0, to: 1, label: 'Lastenheft + Anfrage', note: 'Was? Wofür?' },
                { from: 1, to: 0, label: 'Angebot + Pflichtenheft', note: 'Wie? Womit?' },
                { from: 0, to: 1, label: 'Auftrag / Bestätigung Pflichtenheft', note: 'Vertragsgrundlage' },
                { from: 1, to: 0, label: 'Umsetzung, Test, Einweisung' },
                { from: 0, to: 1, label: 'Abnahme (Soll-Ist-Vergleich mit Pflichtenheft)' },
              ],
            },
          },
          caption: 'Das Pflichtenheft beantwortet das Lastenheft – und ist später der Maßstab für die Abnahme.',
        },
        {
          type: 'example',
          title: 'Aussagen zuordnen',
          problem: 'Ordne zu, ob die Aussage ins **Lastenheft** (L) oder ins **Pflichtenheft** (P) gehört: (1) „Die Arbeitsplätze sollen DATEV-tauglich sein.“ (2) „Wir setzen Notebooks vom Typ X mit Intel Core i5, 16 GB RAM und 512 GB SSD ein.“ (3) „Budget: höchstens 6.000 € netto.“ (4) „Der VPN-Zugang wird per WireGuard-Client an der vorhandenen Firewall realisiert.“',
          steps: [
            { label: '(1) DATEV-tauglich', body: 'Anforderung aus Kundensicht (Was?) → **Lastenheft**.' },
            { label: '(2) konkretes Modell', body: 'Konkrete Lösung (Womit?) → **Pflichtenheft**.' },
            { label: '(3) Budget', body: 'Rahmenbedingung des Auftraggebers → **Lastenheft**.' },
            { label: '(4) WireGuard an der Firewall', body: 'Technische Umsetzung (Wie?) → **Pflichtenheft**.' },
          ],
          result: 'L, P, L, P – Anforderungen und Rahmenbedingungen gehören ins Lastenheft, die technische Realisierung ins Pflichtenheft.',
        },
        {
          type: 'check',
          question: {
            id: 'w01-c05', kind: 'single', skill: 'w.lastenheft', difficulty: 1,
            prompt: 'Wer erstellt das **Pflichtenheft**?',
            options: ['Der Auftraggeber (Kunde)', 'Der Auftragnehmer (z. B. IT-Systemhaus)', 'Die IHK', 'Der Hersteller der Hardware'],
            answer: 1,
            distractors: {
              '0': { why: 'Der Auftraggeber schreibt das **Lastenheft** (Was?). Das Pflichtenheft (Wie?) erstellt der Auftragnehmer.', error: 'w-lasten-pflichten-verwechselt' },
              '2': { why: 'Die IHK hat mit Kundenaufträgen nichts zu tun.', error: 'w-lastenheft-raten' },
              '3': { why: 'Der Hersteller liefert Datenblätter, aber nicht das Pflichtenheft des Projekts.', error: 'w-lastenheft-raten' },
            },
            explanation: 'Pflichtenheft = Umsetzungsplan des **Auftragnehmers** auf Basis des Lastenhefts (DIN 69901-5).',
          },
        },
        { type: 'practice', title: 'Übung: Lasten- und Pflichtenheft', questionIds: ['w01-q016', 'w01-q017', 'w01-q018', 'w01-q019', 'w01-q020'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Lastenheft: Auftraggeber, Was und Wofür.', 'Pflichtenheft: Auftragnehmer, Wie und Womit.', 'Bestätigtes Pflichtenheft = Vertragsgrundlage und Maßstab der Abnahme.', 'Änderungen über ein Änderungsverfahren (Change Request) mit Kosten- und Terminfolgen.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'w01-l05',
      title: 'Zielgruppengerecht beraten und Barrierefreiheit',
      minutes: 20,
      relevance: 'ap1',
      skills: ['w.zielgruppe'],
      steps: [
        {
          type: 'explain',
          title: 'Dieselbe Lösung – verschiedene Zuhörer',
          body: `„Zielgruppengerecht“ heißt: Inhalt, Sprache und Detailtiefe an die Person anpassen, mit der du sprichst.

| Zielgruppe | Interessiert sich für … | So kommunizierst du |
|---|---|---|
| **Geschäftsführung** | Kosten, Nutzen, Risiken, Termine | kurz, Zahlen (Gesamtkosten, Amortisation), Entscheidungsvorlage, wenig Technik |
| **Fachabteilung / Anwender** | Bedienung, Arbeitserleichterung | Alltagssprache, Beispiele aus ihrem Arbeitsablauf, Vorführung, Kurzanleitung |
| **IT-Fachleute** | Technik, Kompatibilität, Sicherheit | Fachbegriffe, Datenblätter, Konfigurationsdetails |
| **Einkauf** | Preise, Konditionen, Lieferzeit | Angebotsvergleich, Rabatte, Zahlungsbedingungen |

**Fachsprache übersetzen:** Statt „Die SSD hat eine höhere IOPS-Rate“ → „Programme und Dateien öffnen sich deutlich schneller“. Analogien helfen (Firewall = „Pförtner, der nur Berechtigte durchlässt“). Prüfe mit Kontrollfragen, ob es angekommen ist.

**Barrierefreiheit und Ergonomie** – Arbeitsplätze müssen für **alle** Mitarbeitenden nutzbar sein:

| Einschränkung | Mögliche Hilfen |
|---|---|
| Sehbehinderung / Blindheit | Bildschirmlupe, hoher Kontrast, große Monitore, **Screenreader** (z. B. NVDA, JAWS, Windows-Sprachausgabe), **Braillezeile** |
| Hörbehinderung | Untertitel, Chat statt Telefon, optische Signale, Headsets mit Hörgerätekopplung |
| motorische Einschränkung | ergonomische Tastatur/Maus, Trackball, Sprachsteuerung, Bildschirmtastatur, höhenverstellbarer Tisch |
| kognitive Einschränkung | einfache Sprache, klare Menüs, Schritt-für-Schritt-Anleitungen |

**Rechtlicher Rahmen (Überblick):** Für öffentliche Stellen gilt die **BITV 2.0**. Seit dem **28.06.2025** verpflichtet das **Barrierefreiheitsstärkungsgesetz (BFSG)** auch viele Unternehmen, bestimmte Produkte und Dienstleistungen für **Verbraucher** barrierefrei anzubieten (z. B. Computer, Smartphones, Onlineshops, Banking). Technischer Maßstab sind die **WCAG** (Web Content Accessibility Guidelines) bzw. die Norm **EN 301 549**. Für Bildschirmarbeitsplätze im Betrieb gelten die Vorgaben der **Arbeitsstättenverordnung** (Anhang Nr. 6: Bildschirmarbeit). *Hinweis: Das ist ein Überblick, keine Rechtsberatung.*`,
        },
        {
          type: 'visual',
          title: 'Zielgruppen im IT-Projekt',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Geschäftsführung', text: 'Kosten, Nutzen, Risiko, Termin – kurz und mit Zahlen.', icon: 'Briefcase' },
                { title: 'Anwender', text: 'Bedienung und Arbeitserleichterung – Alltagssprache, Vorführung.', icon: 'User' },
                { title: 'IT-Fachleute', text: 'Technische Details, Kompatibilität, Sicherheit – Fachbegriffe erlaubt.', icon: 'Server' },
                { title: 'Barrierefreiheit', text: 'Screenreader, Braillezeile, Kontrast, ergonomische Eingabegeräte, Sprachsteuerung.', icon: 'Accessibility' },
              ],
            },
          },
          caption: 'Die Technik bleibt gleich – die Darstellung passt du an dein Gegenüber an.',
        },
        {
          type: 'example',
          title: 'Eine Lösung für zwei Zielgruppen erklären',
          problem: 'Du hast für die Elektro Krämer GmbH vorgeschlagen, alle Notebooks mit **BitLocker-Festplattenverschlüsselung** auszustatten. Erkläre den Vorschlag (a) der Geschäftsführerin und (b) einem Außendienstmitarbeiter.',
          steps: [
            { label: '(a) Geschäftsführung', body: '„Geht ein Notebook verloren, kann niemand die Kunden- und Preisdaten auslesen. Damit vermeiden wir eine meldepflichtige Datenpanne nach DSGVO und Reputationsschäden. Zusatzkosten: keine Lizenzkosten (in Windows Pro enthalten), ca. 15 Minuten Einrichtung je Gerät.“' },
            { label: '(b) Außendienst', body: '„Für Sie ändert sich fast nichts: Sie melden sich wie gewohnt an. Falls das Notebook gestohlen wird, sind Ihre Daten trotzdem sicher. Wichtig: Den Wiederherstellungsschlüssel verwahrt die IT – bei einer Abfrage rufen Sie einfach die Hotline an.“' },
          ],
          result: 'Gleiche Maßnahme, unterschiedliche Schwerpunkte: Risiko/Kosten für die Führung, Bedienung/Alltag für Anwender.',
        },
        {
          type: 'check',
          question: {
            id: 'w01-c06', kind: 'multi', skill: 'w.zielgruppe', difficulty: 2,
            prompt: 'Ein Mitarbeiter ist **stark sehbehindert**. Welche Hilfsmittel sind für seinen Arbeitsplatz sinnvoll?',
            options: ['Screenreader', 'Braillezeile', 'Bildschirmlupe / hohe Kontrasteinstellungen', 'Trackball statt Maus', 'Untertitel für Videokonferenzen'],
            answer: [0, 1, 2],
            explanation: 'Screenreader, Braillezeile und Vergrößerung/Kontrast unterstützen bei Sehbehinderung. Trackball hilft bei motorischen Einschränkungen, Untertitel bei Hörbehinderung.',
          },
        },
        { type: 'practice', title: 'Übung: Zielgruppen & Barrierefreiheit', questionIds: ['w01-q021', 'w01-q022', 'w01-q023', 'w01-q024'], count: 4, difficulty: 2 },
        { type: 'summary', points: ['Sprache, Inhalt und Detailtiefe an die Zielgruppe anpassen.', 'Geschäftsführung: Kosten/Nutzen/Risiko; Anwender: Bedienung; IT: Technik.', 'Fachbegriffe übersetzen, Analogien nutzen, mit Kontrollfragen prüfen.', 'Barrierefreie Arbeitsplätze: Screenreader, Braillezeile, Kontrast, ergonomische Eingabegeräte.', 'BITV 2.0 (öffentliche Stellen), BFSG seit 28.06.2025 (Verbraucherprodukte), WCAG als Maßstab.'] },
      ],
    },
  ],
  /* ================================================================ */
  questions: [
    { id: 'w01-q001', kind: 'table', skill: 'w.fragetechnik', difficulty: 1, prompt: 'Bestimme die Frageart: **offen**, **geschlossen**, **alternativ**, **kontrolle** oder **suggestiv**.', columns: [{ key: 'a', label: 'Frageart', type: 'text' }], rows: [
      { label: '„Wie gehen Sie heute mit eingehenden Papierrechnungen um?“', cells: { a: { answer: 'offen', accept: ['offene frage', 'offene'] } } },
      { label: '„Nutzen Sie bereits Microsoft 365?“', cells: { a: { answer: 'geschlossen', accept: ['geschlossene frage', 'geschlossene'] } } },
      { label: '„Bevorzugen Sie 24- oder 27-Zoll-Monitore?“', cells: { a: { answer: 'alternativ', accept: ['alternativfrage', 'alternative'] } } },
      { label: '„Habe ich richtig verstanden, dass alle Geräte bis Monatsende geliefert sein müssen?“', cells: { a: { answer: 'kontrolle', accept: ['kontrollfrage', 'kontroll'] } } },
      { label: '„Sie möchten doch sicher nicht am falschen Ende sparen?“', cells: { a: { answer: 'suggestiv', accept: ['suggestivfrage', 'suggestive'] } } },
    ], explanation: 'W-Fragen sind offen; Ja/Nein-Fragen geschlossen; „A oder B?“ ist eine Alternativfrage; „Habe ich richtig verstanden …?“ eine Kontrollfrage; „Sie wollen doch sicher …?“ eine Suggestivfrage.', hints: ['Achte auf das erste Wort und auf die möglichen Antworten.'] },
    { id: 'w01-q002', kind: 'free', skill: 'w.fragetechnik', difficulty: 2, prompt: 'Formuliere **zwei offene** und **zwei geschlossene** Fragen, mit denen du den Bedarf für neue Arbeitsplätze im **Kundenservice** (Telefon-Hotline) der Elektro Krämer GmbH ermittelst.', modelAnswer: 'Offen: „Wie läuft ein typisches Kundengespräch bei Ihnen ab – welche Programme nutzen Sie dabei?“, „Welche Probleme haben Sie mit der aktuellen Ausstattung?“. Geschlossen: „Telefonieren Sie über ein Headset am PC (Softphone)?“, „Benötigen Sie zwei Monitore, um Ticketsystem und Warenwirtschaft gleichzeitig zu sehen?“ (oder: „Arbeiten Sie auch im Homeoffice?“).', keywords: ['offen', 'W-Frage', 'geschlossen', 'Ja/Nein', 'Headset', 'Programme'], explanation: 'Offene Fragen beginnen mit einem Fragewort und erlauben freie Antworten. Geschlossene Fragen lassen sich mit Ja/Nein bzw. einer kurzen Angabe beantworten. Inhaltlich passend für eine Hotline: Telefonie/Headset, Software, Monitore, Homeoffice, Lautstärke.', hints: ['Offen: Wie, Was, Welche …', 'Geschlossen: Ja/Nein-Antwort möglich.'] },
    { id: 'w01-q003', kind: 'single', skill: 'w.fragetechnik', difficulty: 1, prompt: 'Welche Frage solltest du in einem Beratungsgespräch **vermeiden**?', options: ['„Welche Programme nutzen Sie täglich?“', '„Sie wollen doch bestimmt das Premium-Modell, oder?“', '„Arbeiten Sie im Homeoffice?“', '„Habe ich Sie richtig verstanden, dass …?“'], answer: 1, distractors: { '0': { why: 'Offene Frage – ideal zur Bedarfsermittlung.', error: 'w-frageart-verwechselt' }, '2': { why: 'Geschlossene Frage – sinnvoll zum Präzisieren.', error: 'w-frageart-verwechselt' }, '3': { why: 'Kontrollfrage – sichert das Verständnis.', error: 'w-frageart-verwechselt' } }, explanation: 'Die **Suggestivfrage** drängt den Kunden zu einer Antwort und wirkt manipulativ. Sie beschädigt das Vertrauen.' },
    { id: 'w01-q004', kind: 'text', skill: 'w.fragetechnik', difficulty: 1, prompt: 'Wie nennt man die Technik des aktiven Zuhörens, bei der du das Gesagte **in eigenen Worten wiedergibst** („Sie meinen also …“)?', accept: ['paraphrasieren', 'paraphrase', 'paraphrasierung', 'spiegeln'], explanation: '**Paraphrasieren**: Das Gehörte mit eigenen Worten zusammenfassen – so merkt der Kunde, dass er verstanden wurde, und Missverständnisse fallen sofort auf.' },
    { id: 'w01-q005', kind: 'order', skill: 'w.gespraech', difficulty: 2, prompt: 'Bringe die Schritte der **Bedarfsermittlung** in eine sinnvolle Reihenfolge.', items: ['Offene Fragen zum Arbeitsablauf stellen', 'Mit geschlossenen Fragen Details klären', 'Mit einer Kontrollfrage das Verständnis absichern', 'Ergebnis zusammenfassen und nächste Schritte vereinbaren', 'Gesprächsprotokoll erstellen und versenden'], explanation: 'Erst breit (offen) fragen, dann präzisieren (geschlossen), Verständnis prüfen (Kontrollfrage), zusammenfassen/vereinbaren und schließlich dokumentieren.' },
    { id: 'w01-q006', kind: 'free', skill: 'w.gespraech', difficulty: 2, prompt: 'Nenne **fünf Inhalte**, die in ein **Gesprächsprotokoll** nach einem Kundentermin gehören.', modelAnswer: 'Datum, Uhrzeit und Ort; Teilnehmende; Anlass/Thema; ermittelter Bedarf bzw. besprochene Anforderungen; getroffene Vereinbarungen/Entscheidungen; offene Punkte; Aufgaben mit Verantwortlichen und Terminen (nächste Schritte); Verfasser.', keywords: ['Datum', 'Teilnehmer', 'Bedarf', 'Vereinbarungen', 'offene Punkte', 'Verantwortliche', 'Termine'], explanation: 'Das Protokoll macht Vereinbarungen nachprüfbar und ist Grundlage für Angebot und Lastenheft.' },
    { id: 'w01-q007', kind: 'match', skill: 'w.kommunikation', difficulty: 2, prompt: 'Ein Kunde sagt: **„Ihr Techniker war heute schon wieder zu spät.“** Ordne die Interpretationen den Seiten des Vier-Seiten-Modells zu.', left: ['Der Techniker kam nach dem vereinbarten Termin.', 'Ich ärgere mich.', 'Auf euch ist kein Verlass.', 'Sorgen Sie für Pünktlichkeit!'], right: ['Sachinhalt', 'Selbstkundgabe', 'Beziehung', 'Appell'], answer: [0, 1, 2, 3], explanation: 'Fakt → Sachinhalt; eigenes Gefühl → Selbstkundgabe; Einschätzung des anderen → Beziehung; Aufforderung → Appell.' },
    { id: 'w01-q008', kind: 'text', skill: 'w.kommunikation', difficulty: 1, prompt: 'Wer entwickelte das **Vier-Seiten-Modell** (Kommunikationsquadrat)? (Nachname)', accept: ['schulz von thun', 'friedemann schulz von thun', 'schulz-von-thun', 'von thun'], explanation: 'Das Modell stammt von **Friedemann Schulz von Thun**.' },
    { id: 'w01-q009', kind: 'order', skill: 'w.kommunikation', difficulty: 2, prompt: 'Ein verärgerter Kunde ruft wegen eines Serverausfalls an. Bringe die Schritte des **Reklamationsgesprächs** in die richtige Reihenfolge.', items: ['Kunden ausreden lassen und aktiv zuhören', 'Verständnis für die Situation zeigen', 'Sachverhalt mit gezielten Fragen klären', 'Lösung anbieten und verbindlich vereinbaren', 'Nachfassen und dokumentieren'], explanation: 'Zuerst muss der Kunde „Dampf ablassen“ können. Erst nach Verständnis und Klärung ist er offen für eine Lösung. Nachfassen sichert die Zufriedenheit.' },
    { id: 'w01-q010', kind: 'free', skill: 'w.kommunikation', difficulty: 3, prompt: 'Eine Anwenderin schreibt: „Sie haben mir schon wieder das falsche Programm installiert!“ Erläutere, wie du mithilfe des Vier-Seiten-Modells professionell reagierst, und formuliere eine Antwort mit einer **Ich-Botschaft**.', modelAnswer: 'Ich höre nicht nur mit dem Beziehungsohr (Vorwurf), sondern nehme den Sachinhalt auf (falsches Programm installiert), erkenne die Selbstkundgabe an (Ärger, Arbeit blockiert) und reagiere auf den Appell (richtiges Programm schnell installieren). Antwort: „Das tut mir leid, ich verstehe, dass Sie so nicht arbeiten können. Ich möchte das gleich korrigieren – dafür brauche ich kurz den genauen Namen und die Version des Programms, das Sie benötigen. Ich installiere es heute bis 14 Uhr.“', keywords: ['Sachinhalt', 'Beziehungsohr', 'Selbstkundgabe', 'Appell', 'Ich-Botschaft', 'Lösung'], explanation: 'Eine Reaktion auf der Beziehungsebene („Das stand so im Ticket!“) eskaliert. Ich-Botschaften beschreiben das eigene Anliegen ohne Vorwurf.' },
    { id: 'w01-q011', kind: 'table', skill: 'w.anforderungen', difficulty: 2, prompt: 'Ordne zu: **f** = funktionale Anforderung, **nf** = nicht-funktionale Anforderung, **r** = Rahmenbedingung.', columns: [{ key: 'a', label: 'f / nf / r', type: 'text' }], rows: [
      { label: 'Scans werden automatisch im Ordner der Buchhaltung abgelegt.', cells: { a: { answer: 'f', accept: ['funktional'] } } },
      { label: 'Die Geräuschentwicklung des PCs liegt unter 25 dB(A).', cells: { a: { answer: 'nf', accept: ['nicht-funktional', 'nicht funktional'] } } },
      { label: 'Das Projekt darf höchstens 20.000 € netto kosten.', cells: { a: { answer: 'r', accept: ['rahmenbedingung', 'rahmen'] } } },
      { label: 'Die Daten werden nach DSGVO verarbeitet.', cells: { a: { answer: 'r', accept: ['rahmenbedingung', 'rahmen'] } } },
      { label: 'Benutzer können Dateien über eine Weboberfläche freigeben.', cells: { a: { answer: 'f', accept: ['funktional'] } } },
      { label: 'Die Weboberfläche lädt in unter 2 Sekunden.', cells: { a: { answer: 'nf', accept: ['nicht-funktional', 'nicht funktional'] } } },
    ], explanation: 'Funktional = Was tut das System? Nicht-funktional = Wie gut (Lautstärke, Ladezeit)? Rahmenbedingungen = Budget, Gesetze, Termine, vorhandene Infrastruktur.', hints: ['Budget und Gesetze sind keine Eigenschaften des Systems selbst.'] },
    { id: 'w01-q012', kind: 'free', skill: 'w.anforderungen', difficulty: 2, prompt: 'Der Kunde wünscht sich „einen **leisen** und **schnellen** PC“. Formuliere daraus **zwei messbare** nicht-funktionale Anforderungen.', modelAnswer: '„Der PC erzeugt im Normalbetrieb (Office-Anwendungen) höchstens 25 dB(A).“ und „Der PC startet in höchstens 30 Sekunden bis zum Anmeldebildschirm; Office-Programme öffnen sich in unter 3 Sekunden.“ (alternativ: mind. 16 GB RAM, NVMe-SSD).', keywords: ['dB(A)', 'Sekunden', 'messbar', 'SSD', 'RAM'], explanation: 'Messbar heißt: Mit einer Zahl und Einheit überprüfbar. „Leise“ → Schalldruckpegel in dB(A); „schnell“ → Startzeit, Antwortzeit oder konkrete Hardwarewerte.' },
    { id: 'w01-q013', kind: 'match', skill: 'w.anforderungen', difficulty: 2, prompt: 'Ordne die MoSCoW-Kategorien ihrer Bedeutung zu.', left: ['Must have', 'Should have', 'Could have', "Won't have"], right: ['zwingend erforderlich – ohne diese Anforderung ist die Lösung unbrauchbar', 'wichtig, aber notfalls verschiebbar', 'wünschenswert, wenn Zeit/Budget reicht', 'wird in diesem Projekt bewusst nicht umgesetzt'], answer: [0, 1, 2, 3], explanation: 'MoSCoW priorisiert Anforderungen. Must-Anforderungen werden im Angebotsvergleich oft als K.-o.-Kriterien verwendet.' },
    { id: 'w01-q014', kind: 'single', skill: 'w.anforderungen', difficulty: 2, prompt: 'Welche Anforderung ist **SMART** formuliert?', options: ['„Das WLAN soll schnell sein.“', '„Im Besprechungsraum erreicht jedes Notebook eine Datenrate von mindestens 200 Mbit/s – ab 01.06.“', '„Das WLAN soll überall funktionieren.“', '„Das WLAN soll besser werden als bisher.“'], answer: 1, distractors: { '0': { why: '„Schnell“ ist nicht messbar.', error: 'w-anforderung-unmessbar' }, '2': { why: '„Überall“ ist weder spezifisch noch messbar.', error: 'w-anforderung-unmessbar' }, '3': { why: '„Besser“ ohne Maßstab und Termin ist nicht prüfbar.', error: 'w-anforderung-unmessbar' } }, explanation: 'Nur die zweite Anforderung ist spezifisch (Besprechungsraum), messbar (200 Mbit/s) und terminiert (01.06.).' },
    { id: 'w01-q015', kind: 'match', skill: 'w.anforderungen', difficulty: 1, prompt: 'Ordne die Begriffe der Bedarfsanalyse zu.', left: ['Ist-Analyse', 'Soll-Konzept', 'Rahmenbedingung', 'K.-o.-Kriterium'], right: ['Erfassung des aktuellen Zustands (Hardware, Abläufe, Probleme)', 'Beschreibung des angestrebten Zustands und der Ziele', 'Vorgabe wie Budget, Termin oder Gesetz', 'Muss-Anforderung – wer sie nicht erfüllt, scheidet aus'], answer: [0, 1, 2, 3], explanation: 'Ist → Soll → Anforderungen mit Rahmenbedingungen; K.-o.-Kriterien filtern Angebote vor der Bewertung.' },
    { id: 'w01-q016', kind: 'table', skill: 'w.lastenheft', difficulty: 2, prompt: 'Gehört die Aussage ins **Lastenheft** (L) oder ins **Pflichtenheft** (P)?', columns: [{ key: 'a', label: 'L / P', type: 'text' }], rows: [
      { label: 'Ziel: Die Vertriebsmitarbeiter sollen von unterwegs auf das CRM zugreifen.', cells: { a: { answer: 'L', accept: ['lastenheft'] } } },
      { label: 'Der Zugriff erfolgt per IPsec-VPN über die vorhandene Firewall, Clients erhalten Zertifikate.', cells: { a: { answer: 'P', accept: ['pflichtenheft'] } } },
      { label: 'Fertigstellung bis spätestens 30.09.', cells: { a: { answer: 'L', accept: ['lastenheft'] } } },
      { label: 'Zeitplan: KW 36 Firewall-Konfiguration, KW 37 Rollout der Clients.', cells: { a: { answer: 'P', accept: ['pflichtenheft'] } } },
      { label: 'Eingesetzt werden 12 Notebooks des Modells X mit LTE-Modul.', cells: { a: { answer: 'P', accept: ['pflichtenheft'] } } },
    ], explanation: 'Ziele, Anforderungen und Vorgaben des Kunden (Was? Bis wann?) → Lastenheft. Konkrete Technik, Produkte und detaillierte Umsetzungsplanung (Wie? Womit?) → Pflichtenheft.' },
    { id: 'w01-q017', kind: 'free', skill: 'w.lastenheft', difficulty: 2, prompt: 'Erläutere den Unterschied zwischen **Lastenheft** und **Pflichtenheft** (Ersteller und Inhalt).', modelAnswer: 'Das Lastenheft erstellt der Auftraggeber. Es beschreibt aus Kundensicht, WAS und WOFÜR etwas benötigt wird – alle Anforderungen und Rahmenbedingungen (Budget, Termine). Das Pflichtenheft erstellt der Auftragnehmer auf Grundlage des Lastenhefts. Es beschreibt, WIE und WOMIT die Anforderungen umgesetzt werden (konkrete Produkte, Konfiguration, Zeitplan). Nach Bestätigung durch den Kunden ist es Vertragsgrundlage und Maßstab für die Abnahme.', keywords: ['Auftraggeber', 'Auftragnehmer', 'Was', 'Wie', 'Vertragsgrundlage', 'Abnahme'], explanation: 'Definitionen nach DIN 69901-5.' },
    { id: 'w01-q018', kind: 'text', skill: 'w.lastenheft', difficulty: 1, prompt: 'Welches Dokument erstellt der **Auftraggeber**, um seine Anforderungen zu beschreiben?', accept: ['lastenheft', 'das lastenheft'], misconceptions: [{ answer: 'pflichtenheft', error: 'w-lasten-pflichten-verwechselt', why: 'Das Pflichtenheft schreibt der **Auftragnehmer** – es beschreibt die Umsetzung.' }], explanation: 'Das **Lastenheft** (Auftraggeber: Was und Wofür).' },
    { id: 'w01-q019', kind: 'multi', skill: 'w.lastenheft', difficulty: 2, prompt: 'Welche Inhalte gehören typischerweise in ein **Lastenheft**?', options: ['Ausgangssituation (Ist-Zustand)', 'Zielsetzung und Anforderungen', 'Budget- und Terminvorgaben', 'Konkrete Konfiguration der Switchports', 'Abnahmekriterien'], answer: [0, 1, 2, 4], explanation: 'Konkrete Konfigurationen sind Teil der technischen Umsetzung und gehören ins **Pflichtenheft**.' },
    { id: 'w01-q020', kind: 'free', skill: 'w.lastenheft', difficulty: 3, prompt: 'Während der Umsetzung wünscht der Kunde zusätzlich **zwei weitere Arbeitsplätze**, die nicht im Pflichtenheft stehen. Beschreibe, wie du vorgehst, und begründe.', modelAnswer: 'Der Wunsch ist eine Änderung des vereinbarten Leistungsumfangs. Ich nehme ihn auf und leite ein Änderungsverfahren (Change Request) ein: Aufwand, Mehrkosten und Auswirkungen auf den Termin ermitteln, dem Kunden ein Nachtragsangebot vorlegen und erst nach schriftlicher Freigabe umsetzen. Das Pflichtenheft wird entsprechend aktualisiert. So bleiben Kosten, Termine und Abnahmekriterien für beide Seiten nachvollziehbar.', keywords: ['Change Request', 'Änderungsverfahren', 'Mehrkosten', 'Termin', 'schriftlich', 'Pflichtenheft aktualisieren'], explanation: 'Ohne geregeltes Änderungsverfahren wächst der Umfang unkontrolliert („Scope Creep“) – mit Streit bei Abnahme und Rechnung.' },
    { id: 'w01-q021', kind: 'free', skill: 'w.zielgruppe', difficulty: 2, prompt: 'Du stellst einen neuen **Passwortmanager** vor. Erläutere, wie sich deine Präsentation für die **Geschäftsführung** und für die **Anwender** unterscheidet.', modelAnswer: 'Geschäftsführung: kurz, Fokus auf Nutzen und Risiko (weniger Passwortwiederverwendung, geringeres Risiko von Sicherheitsvorfällen und Datenpannen), Kosten (Lizenz pro Nutzer und Jahr, Einführungsaufwand), Zeitplan. Anwender: Fokus auf Bedienung und Arbeitserleichterung (nur noch ein Masterpasswort, automatisches Ausfüllen), Vorführung, Kurzanleitung, Ansprechpartner bei Problemen, kaum Fachbegriffe.', keywords: ['Kosten', 'Nutzen', 'Risiko', 'Bedienung', 'Vorführung', 'Fachbegriffe vermeiden'], explanation: 'Zielgruppengerecht = Inhalte, Sprache und Detailtiefe an Interessen und Vorwissen anpassen.' },
    { id: 'w01-q022', kind: 'match', skill: 'w.zielgruppe', difficulty: 1, prompt: 'Ordne die Hilfsmittel der Einschränkung zu, bei der sie vor allem helfen.', left: ['Braillezeile', 'Untertitel / Chat statt Telefon', 'Sprachsteuerung und Trackball', 'Einfache Sprache, klare Menüs'], right: ['Blindheit / Sehbehinderung', 'Hörbehinderung', 'Motorische Einschränkung', 'Kognitive Einschränkung'], answer: [0, 1, 2, 3], explanation: 'Barrierefreie Arbeitsplätze orientieren sich an der konkreten Einschränkung des Mitarbeitenden.' },
    { id: 'w01-q023', kind: 'single', skill: 'w.zielgruppe', difficulty: 2, prompt: 'Seit dem **28.06.2025** verpflichtet ein Gesetz viele Unternehmen, bestimmte Produkte und Dienstleistungen für Verbraucher (z. B. Onlineshops) barrierefrei anzubieten. Welches?', options: ['Barrierefreiheitsstärkungsgesetz (BFSG)', 'Bundesdatenschutzgesetz (BDSG)', 'Telekommunikationsgesetz (TKG)', 'Arbeitszeitgesetz (ArbZG)'], answer: 0, distractors: { '1': { why: 'Das BDSG regelt den Datenschutz.', error: 'w-gesetz-verwechselt' }, '2': { why: 'Das TKG regelt Telekommunikation, nicht allgemein Barrierefreiheit von Produkten.', error: 'w-gesetz-verwechselt' }, '3': { why: 'Das ArbZG regelt Arbeitszeiten.', error: 'w-gesetz-verwechselt' } }, explanation: 'Das **BFSG** setzt den European Accessibility Act in deutsches Recht um und gilt seit dem 28.06.2025.' },
    { id: 'w01-q024', kind: 'free', skill: 'w.zielgruppe', difficulty: 2, prompt: 'Erkläre einem Laien in **zwei bis drei Sätzen** ohne Fachbegriffe, wozu eine **Firewall** dient.', modelAnswer: 'Eine Firewall ist wie ein Pförtner am Eingang des Firmennetzes. Sie prüft jede Verbindung und lässt nur durch, was ausdrücklich erlaubt ist – zum Beispiel das Abrufen von Webseiten. Unerwünschte Zugriffe von außen, etwa durch Angreifer, werden abgewiesen.', keywords: ['Pförtner', 'erlaubt', 'abweisen', 'Analogie'], explanation: 'Analogien aus dem Alltag helfen Laien, ein technisches Prinzip zu verstehen.' },
    { id: 'w01-q025', kind: 'single', skill: 'w.gespraech', difficulty: 1, prompt: 'In welcher Gesprächsphase stellst du überwiegend **offene Fragen**?', options: ['Bedarfsermittlung', 'Abschluss', 'Nachbereitung', 'Einwandbehandlung'], answer: 0, distractors: { '1': { why: 'Im Abschluss helfen eher Alternativ- und Kontrollfragen, um zu einer Entscheidung zu kommen.', error: 'w-gespraechsphase' }, '2': { why: 'In der Nachbereitung wird dokumentiert, nicht befragt.', error: 'w-gespraechsphase' }, '3': { why: 'Auch hier sind Rückfragen möglich, aber der Schwerpunkt offener Fragen liegt in der Bedarfsermittlung.', error: 'w-gespraechsphase' } }, explanation: 'In der Bedarfsermittlung willst du möglichst viel erfahren – dafür sind offene Fragen ideal.' },
    { id: 'w01-q026', kind: 'multi', skill: 'w.fragetechnik', difficulty: 2, prompt: 'Welche Verhaltensweisen gehören zum **aktiven Zuhören**?', options: ['Blickkontakt halten und zugewandt sein', 'Den Kunden ausreden lassen', 'Das Gesagte in eigenen Worten wiedergeben', 'Sofort eine Lösung präsentieren, bevor der Kunde fertig ist', 'Bei Unklarheiten nachfragen'], answer: [0, 1, 2, 4], explanation: 'Wer den Kunden unterbricht, um schnell eine Lösung zu präsentieren, hört nicht aktiv zu – und löst oft das falsche Problem.' },
    { id: 'w01-q027', kind: 'free', skill: 'w.kommunikation', difficulty: 1, prompt: 'Erläutere die Aussage von Watzlawick „**Man kann nicht nicht kommunizieren**“ an einem Beispiel aus dem IT-Support.', modelAnswer: 'Jedes Verhalten hat eine Botschaft – auch Schweigen oder Nichtstun. Beispiel: Ein Supportmitarbeiter beantwortet ein Ticket tagelang nicht. Der Anwender deutet das als „Mein Problem ist euch egal“, obwohl nichts gesagt wurde.', keywords: ['Verhalten', 'Schweigen', 'Botschaft', 'Beispiel'], explanation: 'Auch Körpersprache, Reaktionszeiten und Tonfall senden Botschaften – das ist im Kundenkontakt besonders wichtig.' },
    { id: 'w01-q028', kind: 'text', skill: 'w.kommunikation', difficulty: 2, prompt: 'Wie heißt die Seite einer Nachricht nach Schulz von Thun, die ausdrückt, **wozu** der Sender den Empfänger veranlassen möchte?', accept: ['appell', 'appellseite', 'die appellseite', 'appell-seite'], explanation: 'Der **Appell** – z. B. „Kümmern Sie sich darum!“.' },
    { id: 'w01-q029', kind: 'free', skill: 'w.anforderungen', difficulty: 3, prompt: 'Die Geschäftsführung der Elektro Krämer GmbH möchte „ein neues WLAN für das Lager in Hamburg“. Nenne **sechs Fragen**, die du zur Bedarfsermittlung stellst, und gib an, welche Anforderungsart du damit klärst.', modelAnswer: '1. Welche Geräte sollen das WLAN nutzen (Handscanner, Tablets, Notebooks)? – funktional. 2. Welche Anwendungen laufen darüber (Lagerverwaltung, Sprachtelefonie)? – funktional. 3. Wie groß ist die Fläche, wie hoch sind die Regale, aus welchem Material? – Rahmenbedingung/Infrastruktur. 4. Wie viele Geräte sind gleichzeitig aktiv und welche Datenrate wird benötigt? – nicht-funktional (Leistung). 5. Müssen Gäste/Lieferanten getrennt ins Internet? Welche Sicherheitsanforderungen gelten (WPA3-Enterprise)? – nicht-funktional (Sicherheit). 6. Welches Budget und welcher Termin sind vorgesehen? – Rahmenbedingungen. (Weitere: Roaming zwischen Access Points, Stromversorgung/PoE vorhanden?)', keywords: ['Geräte', 'Anwendungen', 'Fläche', 'Datenrate', 'Sicherheit', 'Budget', 'Termin'], explanation: 'Gute Bedarfsermittlung deckt Funktionen, Qualität (Leistung, Sicherheit, Verfügbarkeit) und Rahmenbedingungen ab.' },
    { id: 'w01-q030', kind: 'single', skill: 'w.lastenheft', difficulty: 2, prompt: 'Wogegen wird bei der **Abnahme** eines IT-Projekts die erbrachte Leistung geprüft?', options: ['Gegen das bestätigte Pflichtenheft (bzw. die vertraglich vereinbarte Leistung)', 'Gegen das Gesprächsprotokoll des Erstkontakts', 'Gegen die Datenblätter aller Hersteller', 'Gegen die Erwartungen der Geschäftsführung am Tag der Abnahme'], answer: 0, distractors: { '1': { why: 'Das Protokoll ist ein frühes Dokument; verbindlich ist die vertraglich vereinbarte Leistung.', error: 'w-abnahme-massstab' }, '2': { why: 'Datenblätter beschreiben Produkte, nicht den vereinbarten Leistungsumfang.', error: 'w-abnahme-massstab' }, '3': { why: 'Spontane Erwartungen sind nicht vereinbart – genau dafür gibt es das Pflichtenheft.', error: 'w-abnahme-massstab' } }, explanation: 'Abnahme = Soll-Ist-Vergleich mit der vereinbarten Leistung, meist dem bestätigten Pflichtenheft samt Abnahmekriterien.' },
    { id: 'w01-q031', kind: 'order', skill: 'w.lastenheft', difficulty: 2, prompt: 'Bringe die Schritte in die richtige Reihenfolge.', items: ['Kunde erstellt das Lastenheft', 'Systemhaus erstellt Angebot und Pflichtenheft', 'Kunde erteilt den Auftrag und bestätigt das Pflichtenheft', 'Umsetzung, Test und Einweisung', 'Abnahme anhand des Pflichtenhefts'], explanation: 'Lastenheft → Pflichtenheft/Angebot → Auftrag → Umsetzung → Abnahme.' },
    { id: 'w01-q032', kind: 'free', skill: 'w.gespraech', difficulty: 2, prompt: 'Ein Kunde wendet ein: „Das Angebot ist mir **zu teuer**.“ Beschreibe, wie du auf diesen Einwand reagierst.', modelAnswer: 'Einwand ernst nehmen und nachfragen, worauf er sich bezieht („Im Vergleich wozu?“ / „Welchen Betrag hatten Sie eingeplant?“). Dann den Nutzen und die Gesamtkosten erläutern (z. B. geringere Ausfallzeiten, längere Garantie, niedrigerer Stromverbrauch – TCO statt nur Anschaffungspreis). Gegebenenfalls Alternativen anbieten (anderes Modell, Leasing, Verzicht auf Could-have-Anforderungen), ohne die Muss-Anforderungen zu gefährden.', keywords: ['nachfragen', 'Nutzen', 'Gesamtkosten', 'TCO', 'Alternative', 'Leasing'], explanation: 'Einwandbehandlung: verstehen, begründen, Alternativen anbieten – nicht sofort Rabatt geben und nicht diskutieren, wer recht hat.' },
  ],
};
