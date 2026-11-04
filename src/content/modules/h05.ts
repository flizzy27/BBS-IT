import type { Module } from '../types';

export const h05: Module = {
  id: 'h05',
  nr: 5,
  area: 'hardware',
  title: 'Ergonomie, Arbeitsschutz & Barrierefreiheit',
  short: `Bildschirmarbeitsplätze nach Arbeitsstättenverordnung (Anhang 6) einrichten: Sitzen, Monitor, Licht, Klima, Lärm – dazu Software-Ergonomie, barrierefreie IT, elektrische Sicherheit (Schutzklassen, DIN VDE 0100-410) und Arbeitssicherheit.`,
  icon: 'Armchair',
  relevance: 'ap1-teilweise',
  prerequisites: ['h03'],
  generators: [],
  skills: [
    { id: 'hw.ergo.law', module: 'h05', title: 'Rechtsgrundlagen: ArbSchG, ArbStättV Anhang 6, ASR, ArbMedVV' },
    { id: 'hw.ergo.setup', module: 'h05', title: 'Bildschirmarbeitsplatz ergonomisch einrichten', requires: ['hw.ergo.law'] },
    { id: 'hw.ergo.environment', module: 'h05', title: 'Arbeitsumgebung: Beleuchtung, Blendung, Klima, Lärm' },
    { id: 'hw.ergo.software', module: 'h05', title: 'Software-Ergonomie (DIN EN ISO 9241-110)' },
    { id: 'hw.ergo.access', module: 'h05', title: 'Barrierefreiheit und assistive Technologien' },
    { id: 'hw.safety.electric', module: 'h05', title: 'Elektrische Sicherheit: Körperstrom, Schutzmaßnahmen nach DIN VDE 0100-410, Schutzklassen, RCD' },
    { id: 'hw.safety.work', module: 'h05', title: 'Arbeitssicherheit: Laienregel, fünf Sicherheitsregeln, Sicherheitszeichen, Brandschutz', requires: ['hw.safety.electric'] },
  ],
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'h05-l01',
      title: 'Rechtsrahmen: Wer regelt den Bildschirmarbeitsplatz?',
      minutes: 15,
      relevance: 'ap1-teilweise',
      skills: ['hw.ergo.law'],
      simple: `Stell dir die Regeln wie eine Treppe vor: Ganz oben steht das **Gesetz** (Arbeitsschutzgesetz, ArbSchG), darunter die **Verordnung** (Arbeitsstättenverordnung, ArbStättV) und ganz unten die **Technischen Regeln** (ASR) mit konkreten Zahlen. Das Gesetz sagt „Der Arbeitgeber muss für sichere Arbeitsplätze sorgen“, die ASR sagt dann zum Beispiel „mindestens 500 Lux Licht“. Hält sich der Betrieb an die ASR, kann er davon ausgehen, dass er alles richtig macht (Vermutungswirkung). Am Anfang steht immer die **Gefährdungsbeurteilung** (eine Prüfung, welche Gefahren am Arbeitsplatz drohen).

**Merke:** Gesetz (ArbSchG) → Verordnung (ArbStättV Anhang 6) → Technische Regeln (ASR) mit konkreten Werten.`,
      steps: [
        {
          type: 'explain',
          title: 'Vom Gesetz bis zur Technischen Regel',
          body: `Wer einen IT-Arbeitsplatz einrichtet, muss auch an **Sicherheit und Gesundheit** denken. Die wichtigsten Regelungen bauen aufeinander auf:

| Ebene | Regelung | Inhalt für Bildschirmarbeit |
|---|---|---|
| Gesetz | **Arbeitsschutzgesetz (ArbSchG)** | Grundpflichten des Arbeitgebers; **§ 5 Gefährdungsbeurteilung** – ausdrücklich auch **psychische Belastungen** |
| Verordnung | **Arbeitsstättenverordnung (ArbStättV)**, **Anhang Nr. 6** „Maßnahmen zur Gestaltung von Bildschirmarbeitsplätzen“ | Anforderungen an Bildschirm, Tastatur, Arbeitstisch, Umgebung, Software; Unterbrechung der Bildschirmarbeit. Die frühere Bildschirmarbeitsverordnung ist seit 2016 hier integriert. |
| Verordnung | **Verordnung zur arbeitsmedizinischen Vorsorge (ArbMedVV)** | **Angebotsvorsorge** bei Bildschirmtätigkeit inkl. Augenuntersuchung; ggf. spezielle **Bildschirmarbeitsplatzbrille** auf Kosten des Arbeitgebers, wenn normale Sehhilfen nicht geeignet sind |
| Technische Regeln | **ASR** (Technische Regeln für Arbeitsstätten), z. B. A1.2 Raumabmessungen, A3.4 Beleuchtung, A3.5 Raumtemperatur, A3.7 Lärm, A6 Bildschirmarbeit | konkretisieren die Verordnung – wer sie einhält, kann davon ausgehen, die Anforderungen zu erfüllen („Vermutungswirkung“) |
| Unfallversicherung | **DGUV-Informationen**, z. B. DGUV Information 215-410 (Bildschirm- und Büroarbeitsplätze) | praxisnahe Leitfäden und Maße |
| Normen | z. B. DIN EN ISO 9241 (Ergonomie der Mensch-System-Interaktion) | Detailanforderungen, u. a. Software-Ergonomie |

**Wichtige Inhalte aus Anhang 6 ArbStättV (sinngemäß):**
- Bildschirmtätigkeit ist durch **andere Tätigkeiten oder regelmäßige Erholungszeiten zu unterbrechen** (Mischarbeit, Kurzpausen).
- Bildschirm: **scharfe, flimmerfreie** Darstellung, **Helligkeit und Kontrast einstellbar**, **frei dreh- und neigbar**, **reflexions- und blendfrei**.
- **Tastatur vom Bildschirm getrennt**, neigbar, reflexionsarm, gut lesbare Beschriftung.
- Ausreichend Platz für wechselnde Arbeitshaltungen.
- Tragbare Geräte (Notebooks) bei dauerhaftem Einsatz am festen Arbeitsplatz wie stationäre Geräte ausstatten (externer Monitor, Tastatur, Maus – z. B. per Dockingstation).
- Software muss der Aufgabe angemessen sein; **ohne Wissen der Beschäftigten keine Leistungs- oder Verhaltenskontrolle**.

**Telearbeit vs. mobiles Arbeiten:** Ein **Telearbeitsplatz** im Sinne der ArbStättV ist ein vom Arbeitgeber **fest eingerichteter** Bildschirmarbeitsplatz im Privatbereich (vereinbart, Ausstattung vom Arbeitgeber) – dafür gelten die Anforderungen der ArbStättV (eingeschränkt). **Mobiles Arbeiten** (unterwegs oder flexibel am Küchentisch) fällt nicht unter die ArbStättV; das ArbSchG (Gefährdungsbeurteilung, Unterweisung) gilt aber weiterhin.`,
        },
        {
          type: 'visual',
          title: 'Rangfolge der Regelungen',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'ArbSchG', text: 'Gesetz: Grundpflichten, Gefährdungsbeurteilung (§ 5).', icon: 'FileText' },
                { title: 'ArbStättV Anhang 6', text: 'Verordnung: Anforderungen an Bildschirmarbeitsplätze.', icon: 'Monitor' },
                { title: 'ASR', text: 'Technische Regeln: konkrete Werte (Licht, Klima, Lärm, Raum).', icon: 'Ruler' },
                { title: 'DGUV / DIN', text: 'Leitfäden und Normen für die Umsetzung.', icon: 'PersonStanding' },
              ],
            },
          },
        },
        {
          type: 'check',
          question: {
            id: 'h05-c01', kind: 'text', skill: 'hw.ergo.law', difficulty: 1,
            prompt: `In welcher Verordnung (Abkürzung) sind die Anforderungen an Bildschirmarbeitsplätze seit 2016 geregelt?`,
            accept: ['ArbStättV', 'Arbeitsstättenverordnung', 'ArbStaettV'],
            explanation: '**ArbStättV** (Arbeitsstättenverordnung), Anhang Nr. 6.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'h05-c02', kind: 'single', skill: 'hw.ergo.law', difficulty: 2,
            prompt: `Eine Mitarbeiterin arbeitet an zwei festen Tagen pro Woche an einem **vom Arbeitgeber eingerichteten und ausgestatteten** Arbeitsplatz in ihrer Wohnung. Wie heißt das im Sinne der ArbStättV?`,
            options: ['Mobiles Arbeiten', 'Telearbeitsplatz', 'Desk-Sharing', 'Außendienst'],
            answer: 1,
            distractors: {
              '0': { why: 'Mobiles Arbeiten ist ortsflexibel ohne fest eingerichteten Platz – das fällt nicht unter die ArbStättV.', error: 'telearbeit-mobil' },
              '2': { why: 'Desk-Sharing bezeichnet geteilte Schreibtische im Büro.', error: 'telearbeit-mobil' },
              '3': { why: 'Außendienst ist Tätigkeit beim Kunden/unterwegs.', error: 'telearbeit-mobil' },
            },
            explanation: 'Fest eingerichteter, vereinbarter Platz im Privatbereich mit Ausstattung durch den Arbeitgeber = **Telearbeitsplatz** (§ 2 ArbStättV).',
          },
        },
        { type: 'practice', title: 'Übung: Rechtsgrundlagen', questionIds: ['h05-q001', 'h05-q002', 'h05-q003', 'h05-q004'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'ArbSchG § 5: Gefährdungsbeurteilung (auch psychische Belastung).',
            'ArbStättV Anhang 6: Bildschirm, Tastatur, Umgebung, Software, Unterbrechungen.',
            'ArbMedVV: Angebotsvorsorge, ggf. Bildschirmarbeitsplatzbrille.',
            'ASR und DGUV-Informationen konkretisieren die Anforderungen.',
            'Telearbeitsplatz (fest eingerichtet) ≠ mobiles Arbeiten.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'h05-l02',
      title: 'Den Bildschirmarbeitsplatz richtig einrichten',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['hw.ergo.setup'],
      simple: `Einen Arbeitsplatz einzurichten ist wie ein Fahrrad einstellen: Erst den Sattel, dann den Lenker – sonst passt nichts zusammen. Du stellst also zuerst den **Stuhl** ein (Füße flach auf dem Boden), dann den **Tisch** (Unterarme liegen waagerecht auf), dann Tastatur und Maus und ganz zum Schluss den **Monitor**. Die oberste Bildschirmzeile liegt höchstens auf Augenhöhe, damit du leicht nach unten schaust. Der Abstand zum Bildschirm beträgt etwa eine Armlänge (mindestens ca. 50 cm).

**Merke:** Von unten nach oben einstellen – Stuhl, Tisch, Eingabegeräte, Monitor.`,
      steps: [
        {
          type: 'explain',
          title: 'Von den Füßen bis zum Bildschirmrand',
          body: `Beim Einrichten gehst du am besten **von unten nach oben** vor (Richtwerte aus DGUV-Informationen und gängiger Praxis):

**1. Stuhl** (Bürodrehstuhl, z. B. nach DIN EN 1335)
- Sitzhöhe so, dass die **Füße flach auf dem Boden** stehen und **Ober- und Unterschenkel etwa einen rechten Winkel** bilden (oder etwas mehr). Wenn das wegen eines festen Tisches nicht geht: Fußstütze.
- Rückenlehne mit Lendenbausch (Lordosenstütze), dynamisches Sitzen ermöglichen.
- **Fünf Rollen** (Kippsicherheit), Armlehnen höhenverstellbar.

**2. Tisch**
- Arbeitshöhe so, dass die **Oberarme locker herabhängen** und die **Unterarme etwa waagerecht** auf der Tischfläche liegen (Ellenbogenwinkel ≈ 90°).
- Ausreichend große Arbeitsfläche (DGUV-Empfehlung: mind. 160 × 80 cm), genügend Beinraum.
- **Sitz-Steh-Tische** ermöglichen Haltungswechsel – Wechsel ist wichtiger als „richtig sitzen“.

**3. Bildschirm**
- **Sehabstand mindestens ca. 50 cm**, bei größeren Bildschirmen entsprechend mehr (typisch 50–80 cm).
- **Oberste Textzeile höchstens auf Augenhöhe**, Blick leicht nach unten gesenkt; Bildschirm leicht nach hinten geneigt.
- **Direkt vor** dem Nutzer (nicht schräg), bei zwei Monitoren den Hauptmonitor mittig.
- Bei **Gleitsichtbrillen** Monitor tiefer stellen oder Bildschirmarbeitsplatzbrille.

**4. Tastatur und Maus**
- Tastatur **vom Bildschirm getrennt**, flach, vor dem Körper; 10–15 cm Handballenauflage-Raum vor der Tastatur.
- Maus nahe an der Tastatur, passend zur Hand (Links-/Rechtshänder, ggf. vertikale Maus).

**5. Notebook**
- Für längeres Arbeiten: **Dockingstation + externer Monitor + Tastatur + Maus**, sonst entsteht durch das niedrige Display eine starke Nackenbeugung.

**6. Arbeitsorganisation**
- **Mischarbeit** und regelmäßige **Kurzpausen** (mehrere kurze Unterbrechungen sind wirksamer als eine lange Pause).
- Haltung wechseln, aufstehen, Blick in die Ferne (entspannt die Augenmuskulatur).`,
        },
        {
          type: 'visual',
          title: 'Checkliste Sitzhaltung',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Beine', text: 'Füße flach auf dem Boden, Knie etwa 90° oder etwas offener.', icon: 'PersonStanding' },
                { title: 'Arme', text: 'Oberarme hängen locker, Unterarme waagerecht auf dem Tisch.', icon: 'Keyboard' },
                { title: 'Kopf & Augen', text: 'Oberste Zeile ≤ Augenhöhe, Sehabstand ≥ ca. 50 cm, leicht nach unten blicken.', icon: 'Eye' },
              ],
            },
          },
          caption: 'Die beste Haltung ist die nächste – regelmäßiger Haltungswechsel beugt Beschwerden vor.',
        },
        {
          type: 'example',
          title: 'Beispiel: Beschwerden eines Mitarbeiters analysieren',
          problem: `Ein Mitarbeiter der Buchhaltung klagt über **Nackenschmerzen** und **brennende Augen**. Bei der Begehung stellst du fest: Er arbeitet ganztägig am **Notebook-Display** auf dem Schreibtisch, der Platz steht **mit Blick zum Fenster**, Gleitsichtbrille, keine Pausen außer Mittag. Welche Maßnahmen schlägst du vor?`,
          steps: [
            { label: 'Nacken', body: 'Notebook-Display zu niedrig → **Dockingstation, externer höhenverstellbarer Monitor** (oberste Zeile ≤ Augenhöhe), externe Tastatur und Maus.' },
            { label: 'Augen/Blendung', body: 'Blick zum Fenster → Blendung durch hohen Helligkeitsunterschied. **Tisch drehen**: Blickrichtung **parallel** zur Fensterfront, Jalousien nutzen.' },
            { label: 'Brille', body: 'Gleitsichtbrille → Monitor tiefer stellen; **Angebotsvorsorge** (Augenuntersuchung) anbieten, ggf. Bildschirmarbeitsplatzbrille.' },
            { label: 'Organisation', body: 'Regelmäßige **Kurzpausen** bzw. Mischarbeit einplanen; Blick in die Ferne.' },
          ],
          result: 'Externer Monitor + Dockingstation, Platz parallel zum Fenster, Vorsorge/Brille, Kurzpausen.',
        },
        {
          type: 'check',
          question: {
            id: 'h05-c03', kind: 'multi', skill: 'hw.ergo.setup', difficulty: 1,
            prompt: `Welche Einstellungen entsprechen einem ergonomisch eingerichteten Bildschirmarbeitsplatz?`,
            options: ['Oberste Bildschirmzeile höchstens auf Augenhöhe', 'Sehabstand ca. 20–30 cm', 'Unterarme etwa waagerecht auf der Tischfläche', 'Füße flach auf dem Boden', 'Tastatur fest mit dem Bildschirm verbunden'],
            answer: [0, 2, 3],
            explanation: 'Sehabstand mindestens ca. 50 cm; die Tastatur muss vom Bildschirm getrennt sein (ArbStättV Anhang 6).',
          },
        },
        { type: 'practice', title: 'Übung: Arbeitsplatz einrichten', questionIds: ['h05-q006', 'h05-q007', 'h05-q008', 'h05-q009', 'h05-q010'], count: 5, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Von unten nach oben: Füße → Stuhl → Tisch → Tastatur → Bildschirm.',
            'Unterarme waagerecht, Füße flach, oberste Zeile ≤ Augenhöhe, Sehabstand ≥ ca. 50 cm.',
            'Notebook dauerhaft nur mit Dock, externem Monitor, Tastatur und Maus.',
            'Mischarbeit und Kurzpausen.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'h05-l03',
      title: 'Arbeitsumgebung: Beleuchtung, Blendung, Klima und Lärm',
      minutes: 15,
      relevance: 'ap1-teilweise',
      skills: ['hw.ergo.environment'],
      simple: `Ein Büro ist wie ein Aquarium: Licht, Temperatur und Ruhe müssen stimmen, damit sich alle darin wohlfühlen. Für Bildschirmarbeit brauchst du genug Licht (mindestens 500 Lux, Lux = Maß für die Helligkeit), ohne dass Fenster oder Lampen im Bildschirm spiegeln (Blendung). Deshalb schaust du am besten **parallel zum Fenster**. Die Raumtemperatur soll mindestens 20 °C betragen; über 26 °C soll der Arbeitgeber gegensteuern, über 30 °C muss er es. Bei konzentrierter Arbeit soll es möglichst nicht lauter als 55 dB(A) sein (dB(A) = Maß für die Lautstärke).

**Merke:** 500 Lux, Blick parallel zum Fenster, mindestens 20 °C, möglichst ≤ 55 dB(A).`,
      steps: [
        {
          type: 'explain',
          title: 'Licht, Luft und Lautstärke',
          body: `**Beleuchtung (ASR A3.4):**
- Mindestens **500 lx** (Lux, Wartungswert) im Bereich der Büro-/Bildschirmtätigkeit.
- Möglichst **Tageslicht** und Sichtverbindung nach außen; Leuchten blendfrei (keine Spiegelungen auf dem Bildschirm).
- **Monitor-Aufstellung:** Blickrichtung **parallel zur Fensterfront** (Bildschirm im rechten Winkel zum Fenster). **Nicht** mit dem Rücken zum Fenster (Spiegelungen im Bildschirm) und **nicht** mit Blick ins Fenster (Blendung durch Helligkeitsunterschied).
- **Sonnenschutz** (Jalousien, Lamellen) gegen direkte Sonneneinstrahlung.
- Matte (entspiegelte) Bildschirme und helle Darstellung mit dunkler Schrift (Positivdarstellung) reduzieren Spiegelungen.

**Raumklima (ASR A3.5):**
- Lufttemperatur bei überwiegend sitzender, leichter Tätigkeit (Büro): **mindestens 20 °C**.
- Über **26 °C** soll der Arbeitgeber Maßnahmen ergreifen (z. B. Jalousien, Lüften in den Morgenstunden, Lockerung der Kleiderordnung), über **30 °C** muss er wirksame Maßnahmen ergreifen; über 35 °C ist der Raum ohne besondere Maßnahmen nicht als Arbeitsraum geeignet.
- Zugluft vermeiden; IT-Geräte geben Wärme ab (jedes Watt elektrische Leistung wird zu Wärme) – sparsame Geräte verbessern auch das Raumklima.

**Lärm (ASR A3.7):**
- Für überwiegend **geistige Tätigkeiten** (hohe Konzentration, Sprachverständlichkeit) sollte der Beurteilungspegel **55 dB(A)** nicht überschreiten.
- Lärmquellen: Drucker/Kopierer (in separaten Raum), laute Lüfter von PCs/Servern (Server nie im Büro!), Telefonate im Großraumbüro → Akustikelemente, Headsets mit Geräuschunterdrückung, Ruhezonen.

**Raumgröße (ASR A1.2, Richtwert):** Für Büro- und Bildschirmarbeitsplätze wird eine Grundfläche von **8 bis 10 m² je Arbeitsplatz** einschließlich Möblierung angesetzt (in Großraumbüros mehr).

**Weitere Punkte:** Kabelmanagement (Stolperfallen), Brandschutz (Mehrfachsteckdosen nicht hintereinanderstecken), Prüfung ortsveränderlicher elektrischer Betriebsmittel (DGUV Vorschrift 3) – Geräte werden regelmäßig von einer Elektrofachkraft geprüft.`,
        },
        {
          type: 'visual',
          title: 'Richtwerte für die Umgebung',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Licht', text: 'mind. 500 lx; Blick parallel zum Fenster; blendfrei.', icon: 'Lightbulb' },
                { title: 'Temperatur', text: 'mind. 20 °C; ab 26 °C Maßnahmen; ab 30 °C Pflicht.', icon: 'Thermometer' },
                { title: 'Lärm', text: 'geistige Tätigkeit: möglichst ≤ 55 dB(A).', icon: 'Headphones' },
                { title: 'Fläche', text: 'Richtwert 8–10 m² je Büroarbeitsplatz.', icon: 'Ruler' },
              ],
            },
          },
        },
        {
          type: 'check',
          question: {
            id: 'h05-c04', kind: 'single', skill: 'hw.ergo.environment', difficulty: 1,
            prompt: `Wie sollte ein Bildschirmarbeitsplatz zum Fenster ausgerichtet sein?`,
            options: ['Mit Blick direkt ins Fenster', 'Mit dem Rücken zum Fenster', 'Blickrichtung parallel zur Fensterfront', 'Egal, solange der Monitor hell genug ist'],
            answer: 2,
            distractors: {
              '0': { why: 'Der Helligkeitsunterschied zwischen Fenster und Bildschirm blendet und ermüdet die Augen.', error: 'blendung-fenster' },
              '1': { why: 'Das Fenster spiegelt sich dann im Bildschirm.', error: 'blendung-fenster' },
              '3': { why: 'Höhere Helligkeit löst Spiegelungen und Blendung nicht.', error: 'blendung-fenster' },
            },
            explanation: 'Parallel zur Fensterfront = weder Blendung noch Spiegelung.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'h05-c05', kind: 'number', skill: 'hw.ergo.environment', difficulty: 1,
            prompt: `Welche **Beleuchtungsstärke in Lux** fordert die ASR A3.4 mindestens für Büro- und Bildschirmarbeitsplätze?`,
            answer: 500, unit: 'lx',
            explanation: '**500 lx** (Wartungswert) im Bereich der Sehaufgabe.',
          },
        },
        { type: 'practice', title: 'Übung: Arbeitsumgebung', questionIds: ['h05-q011', 'h05-q012', 'h05-q013', 'h05-q014', 'h05-q015'], count: 5, difficulty: 2 },
        {
          type: 'summary',
          points: [
            '500 lx, Tageslicht, Blick parallel zum Fenster, Sonnenschutz.',
            'Mind. 20 °C; ab 26 °C sollen, ab 30 °C müssen Maßnahmen erfolgen.',
            'Konzentrierte Tätigkeit: ≤ 55 dB(A); Drucker/Server raus aus dem Büro.',
            'Kabel, Mehrfachsteckdosen, Geräteprüfung (DGUV V3) beachten.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'h05-l04',
      title: 'Software-Ergonomie und Barrierefreiheit',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['hw.ergo.software', 'hw.ergo.access'],
      simple: `Gute Software ist wie ein gut beschilderter Bahnhof: Du weißt immer, wo du bist, wohin du gehst und wie du wieder zurückkommst. Die Norm DIN EN ISO 9241-110 beschreibt dafür sieben Grundsätze, zum Beispiel **Steuerbarkeit** (du kannst abbrechen und zurückgehen) und **Robustheit gegen Benutzungsfehler** (ein Fehler richtet keinen großen Schaden an). **Barrierefreiheit** heißt: Auch Menschen mit Einschränkungen können die Software nutzen – etwa mit einem **Screenreader** (Programm, das den Bildschirminhalt vorliest) oder nur mit der Tastatur.

**Merke:** Software passt sich dem Menschen an – nicht umgekehrt; barrierefrei heißt wahrnehmbar, bedienbar, verständlich, robust.`,
      steps: [
        {
          type: 'explain',
          title: 'Ergonomie hört nicht beim Stuhl auf',
          body: `**Software-Ergonomie – Grundsätze der Interaktion nach DIN EN ISO 9241-110 (2020):**

| Grundsatz | Bedeutung | Beispiel |
|---|---|---|
| **Aufgabenangemessenheit** | unterstützt die Aufgabe ohne unnötige Schritte | sinnvolle Standardwerte, nur benötigte Felder |
| **Selbstbeschreibungsfähigkeit** | man erkennt jederzeit, wo man ist und was möglich ist | klare Beschriftungen, Statusanzeige |
| **Erwartungskonformität** | verhält sich wie erwartet und einheitlich | Strg+S speichert, gleiche Symbole für gleiche Funktionen |
| **Erlernbarkeit** | leicht zu lernen | Tooltips, Assistenten, Hilfe |
| **Steuerbarkeit** | Nutzer bestimmt Ablauf und Tempo | Abbrechen, Zurück, Rückgängig |
| **Robustheit gegen Benutzungsfehler** | Fehler werden vermieden, erkannt und leicht korrigiert | Eingabeprüfung, verständliche Fehlermeldungen, Sicherheitsabfrage vor dem Löschen |
| **Benutzerbindung** | motivierend und angenehm zu nutzen | ansprechende, vertrauenswürdige Gestaltung |

**Barrierefreiheit** bedeutet, dass IT für **alle** Menschen nutzbar ist – auch mit Seh-, Hör-, motorischen oder kognitiven Einschränkungen.

**Rechtlicher Rahmen:**
- **BITV 2.0** – Barrierefreie-Informationstechnik-Verordnung für **öffentliche Stellen** des Bundes (Websites, Apps, Intranet).
- **Barrierefreiheitsstärkungsgesetz (BFSG)** – gilt seit **28. Juni 2025** für viele Produkte und Dienstleistungen der Privatwirtschaft (z. B. Computer, Smartphones, Selbstbedienungsterminals, Online-Shops, Bankdienstleistungen); Umsetzung des European Accessibility Act. Kleinstunternehmen, die Dienstleistungen anbieten, sind ausgenommen.
- Technische Grundlage: **WCAG** (Web Content Accessibility Guidelines) mit den vier Prinzipien **wahrnehmbar, bedienbar, verständlich, robust**; europäische Norm **EN 301 549**.
- Für Arbeitsplätze von Menschen mit Behinderung unterstützen die **Inklusionsämter** (früher Integrationsämter) die Ausstattung finanziell und beratend.

**Assistive Technologien:**

| Einschränkung | Hilfsmittel / Einstellungen |
|---|---|
| Blindheit | **Screenreader** (z. B. NVDA, JAWS, Windows-Sprachausgabe), **Braillezeile** |
| Sehbehinderung | **Bildschirmlupe**, Skalierung, **Hochkontrastmodus**, große Monitore |
| Hörbehinderung | **Untertitel**/Live-Transkription, visuelle Signale statt Töne |
| Motorische Einschränkung | **Spracherkennung/Diktat**, Einhand- oder Großfeldtastatur, Kopf-/Augensteuerung, Einrastfunktion, höhenverstellbare Tische |
| Kognitive Einschränkung | einfache Sprache, klare Strukturen, wenig Ablenkung |

Barrierefreie Gestaltung hilft allen: Untertitel im Großraumbüro, Tastaturbedienung für Power-User, gute Kontraste bei Sonnenlicht.`,
        },
        {
          type: 'visual',
          title: 'WCAG – vier Prinzipien',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Wahrnehmbar', text: 'Alternativtexte, Untertitel, ausreichender Kontrast.', icon: 'Eye' },
                { title: 'Bedienbar', text: 'Alles per Tastatur erreichbar, genug Zeit, keine Blitzeffekte.', icon: 'Keyboard' },
                { title: 'Verständlich', text: 'Klare Sprache, vorhersehbares Verhalten, Fehlerhilfe.', icon: 'Lightbulb' },
                { title: 'Robust', text: 'Kompatibel mit Browsern und assistiven Technologien.', icon: 'Accessibility' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Beispiel: Arbeitsplatz für einen sehbehinderten Kollegen',
          problem: `Ein neuer Kollege im Kundenservice der Elektro Krämer GmbH hat eine starke Sehbehinderung (Restsehvermögen, liest mit Vergrößerung). Welche Ausstattung und Einstellungen planst du?`,
          steps: [
            { label: 'Hardware', body: 'Großer Monitor (z. B. 32") auf Monitorarm (nah heranziehbar), ggf. zweiter Monitor; Tastatur mit großer, kontrastreicher Beschriftung.' },
            { label: 'Software', body: 'Bildschirmlupe mit Sprachausgabe (z. B. Windows-Lupe oder spezialisierte Software), Skalierung 150–200 %, Hochkontrastdesign, großer Mauszeiger.' },
            { label: 'Prüfung', body: 'Fachanwendungen (CRM) auf Barrierefreiheit testen: Tastaturbedienbarkeit, Kontraste, Kompatibilität mit Lupe/Screenreader.' },
            { label: 'Förderung', body: 'Beratung und Kostenbeteiligung über das Inklusionsamt / die Agentur für Arbeit anfragen.' },
          ],
          result: 'Großer Monitor + Lupe/Sprachausgabe + Kontrast/Skalierung + barrierefreie Fachsoftware + Förderung prüfen.',
        },
        {
          type: 'check',
          question: {
            id: 'h05-c06', kind: 'match', skill: 'hw.ergo.software', difficulty: 2,
            prompt: `Ordne die Beispiele dem Grundsatz nach DIN EN ISO 9241-110 zu.`,
            left: ['„Rückgängig“-Funktion und Abbrechen-Schaltfläche', 'Vor dem endgültigen Löschen erscheint eine Sicherheitsabfrage', 'Alle Programme der Firma nutzen Strg+S zum Speichern', 'Eine Statusleiste zeigt, in welchem Schritt des Assistenten man sich befindet'],
            right: ['Steuerbarkeit', 'Robustheit gegen Benutzungsfehler', 'Erwartungskonformität', 'Selbstbeschreibungsfähigkeit'],
            answer: [0, 1, 2, 3],
            explanation: 'Steuerbarkeit = Nutzer bestimmt den Ablauf; Robustheit = Fehler vermeiden/korrigieren; Erwartungskonformität = einheitlich und wie gewohnt; Selbstbeschreibung = man weiß, wo man ist.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'h05-c07', kind: 'text', skill: 'hw.ergo.access', difficulty: 1,
            prompt: `Wie heißt die Software, die blinden Menschen Bildschirminhalte per Sprachausgabe oder Braillezeile zugänglich macht?`,
            accept: ['Screenreader', 'Screen Reader', 'Bildschirmleser', 'Bildschirmleseprogramm'],
            explanation: '**Screenreader** (z. B. NVDA, JAWS, Windows-Sprachausgabe).',
          },
        },
        { type: 'practice', title: 'Übung: Software-Ergonomie und Barrierefreiheit', questionIds: ['h05-q018', 'h05-q019', 'h05-q020', 'h05-q021', 'h05-q022', 'h05-q023'], count: 5, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'ISO 9241-110: Aufgabenangemessenheit, Selbstbeschreibungsfähigkeit, Erwartungskonformität, Erlernbarkeit, Steuerbarkeit, Robustheit gegen Benutzungsfehler, Benutzerbindung.',
            'BITV 2.0 (öffentliche Stellen), BFSG seit 28.06.2025 (Privatwirtschaft), WCAG/EN 301 549.',
            'WCAG: wahrnehmbar, bedienbar, verständlich, robust.',
            'Hilfsmittel: Screenreader, Braillezeile, Lupe, Untertitel, Spracherkennung, Spezialtastaturen.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'h05-l05',
      title: 'Elektrische Sicherheit: Gefahren, Schutzklassen und Schutzmaßnahmen',
      minutes: 25,
      relevance: 'ap1-teilweise',
      skills: ['hw.safety.electric'],
      simple: `Strom ist gefährlich, weil er durch den Körper fließen kann – schon ein paar hundertstel Ampere können das Herz aus dem Takt bringen. Darum sind Geräte wie eine Zwiebel in Schichten geschützt. Die erste Schicht ist die **Isolierung** (Basisschutz: Man kommt gar nicht an Strom führende Teile). Die zweite Schicht greift, wenn trotzdem etwas kaputtgeht: Der **Schutzleiter** leitet den Fehlerstrom ab und die Sicherung schaltet ab (Fehlerschutz). Die dritte Schicht ist der **FI-Schutzschalter** (RCD), der bei schon 30 mA Fehlerstrom blitzschnell abschaltet (Zusatzschutz). Auf dem Typenschild zeigt die **Schutzklasse**, wie ein Gerät geschützt ist: I = mit Schutzleiter, II = doppelt isoliert, III = nur Kleinspannung.

**Merke:** Schutzklasse I = Schutzleiter (z. B. Desktop-PC), II = Schutzisolierung (Symbol: zwei Quadrate), III = Schutzkleinspannung (Symbol: III in einer Raute).`,
      steps: [
        {
          type: 'explain',
          title: 'Warum Strom gefährlich ist',
          body: `Gefährlich ist nicht die Spannung allein, sondern der **Strom, der durch den Körper fließt** (Körperstrom). Er hängt nach dem ohmschen Gesetz von der Berührungsspannung und vom Körperwiderstand ab: **I = U ÷ R**.

**Rechenbeispiel:** Der Körperwiderstand von Hand zu Hand liegt grob bei **1.000 Ω**. Berührt jemand 230 V: I = 230 V ÷ 1.000 Ω = 0,23 A = **230 mA** – das ist lebensgefährlich.

**Wirkung von Wechselstrom (50 Hz) auf den Menschen – grobe Richtwerte:**

| Körperstrom | Wirkung |
|---|---|
| ab ca. 0,5–1 mA | spürbares Kribbeln (Wahrnehmungsschwelle) |
| ab ca. 10 mA | Muskeln verkrampfen, man kann **nicht mehr loslassen** |
| ab ca. 30 mA | Atembeschwerden, Gefahr steigt mit der Einwirkdauer |
| ab ca. 50 mA (bei längerer Einwirkung) | **Herzkammerflimmern** möglich – lebensgefährlich |

Wie schlimm ein Stromunfall ist, hängt außerdem vom **Weg durch den Körper** (über das Herz?), von der **Dauer** und von der Feuchtigkeit der Haut ab. Als dauerhaft ungefährlich gelten Berührungsspannungen bis **50 V Wechselspannung** bzw. **120 V Gleichspannung** – daher kommt die Grenze der **Kleinspannung**.

**Nach einem Stromunfall:** Stromkreis unterbrechen (Stecker ziehen, ausschalten) – erst dann die Person berühren. Notruf 112. Auch ohne sichtbare Verletzung muss die Person zum Arzt (Herzrhythmusstörungen können später auftreten).`,
        },
        {
          type: 'explain',
          title: 'Schutzmaßnahmen nach DIN VDE 0100-410 und Schutzklassen',
          body: `Die Norm **DIN VDE 0100-410** („Schutz gegen elektrischen Schlag“) beschreibt, wie elektrische Anlagen Menschen schützen. Eine Schutzmaßnahme besteht immer aus **Basisschutz und Fehlerschutz**, oft ergänzt um einen **Zusatzschutz**. Manche Bücher schreiben „DIN VDE 100-410“ – korrekt ist **DIN VDE 0100-410**.

| Stufe | Wogegen? | Wie? |
|---|---|---|
| **Basisschutz** (früher: Schutz gegen direktes Berühren) | Berühren von Teilen, die im normalen Betrieb Spannung führen | **Isolierung** der Leiter, **Abdeckungen und Gehäuse**, Hindernisse, Abstand |
| **Fehlerschutz** (früher: Schutz bei indirektem Berühren) | Spannung am Gehäuse **im Fehlerfall** (z. B. Körperschluss: ein Leiter berührt das Metallgehäuse) | **Schutzleiter (PE)** plus **automatische Abschaltung** durch Sicherung (Leitungsschutzschalter) oder RCD – in Endstromkreisen bis 32 A innerhalb von 0,4 s; alternativ doppelte Isolierung oder Kleinspannung |
| **Zusatzschutz** | wenn Basis- und Fehlerschutz versagen oder jemand unvorsichtig ist | **Fehlerstrom-Schutzeinrichtung (RCD, „FI-Schalter“)** mit **höchstens 30 mA** Bemessungsfehlerstrom; in neuen Anlagen u. a. für Steckdosen bis 32 A vorgeschrieben, die von Laien benutzt werden |

**So arbeitet ein RCD:** Er vergleicht den Strom, der über den Außenleiter hinfließt, mit dem Strom, der über den Neutralleiter zurückkommt. Fließt ein Teil über einen anderen Weg ab (z. B. über einen Menschen zur Erde) und ist die Differenz größer als der Bemessungsfehlerstrom (30 mA), schaltet er in Bruchteilen einer Sekunde ab. **Grenzen:** Er schützt nicht vor Überlast und Kurzschluss (das macht der Leitungsschutzschalter) und nicht, wenn man isoliert stehend Außenleiter und Neutralleiter gleichzeitig berührt – dann fließt kein Strom „daneben“.

**Schutzklassen** – stehen als Symbol auf dem Typenschild:

| Schutzklasse | Prinzip | Symbol | Stecker | Beispiele |
|---|---|---|---|---|
| **I** | Basisisolierung + **Schutzleiter** am leitfähigen Gehäuse; im Fehlerfall fließt der Strom über den PE ab und die Sicherung bzw. der RCD schaltet ab | Erdungszeichen (Schutzleiteranschluss) | Schutzkontaktstecker (Schuko) bzw. Kaltgerätekabel mit PE | Desktop-PC, Server, Laserdrucker, Kopierer, viele Monitore |
| **II** | **Schutzisolierung:** doppelte oder verstärkte Isolierung, **kein** Schutzleiter | zwei ineinanderliegende Quadrate | meist flacher Eurostecker (ohne Schutzkontakt) | viele Notebook- und Steckernetzteile, Schreibtischleuchte, Bohrmaschine |
| **III** | Betrieb nur mit **Schutzkleinspannung (SELV)**: höchstens 50 V AC bzw. 120 V DC, sicher getrennt vom Netz | römische III in einer Raute | Kleinspannungsstecker, USB | USB-Maus, Smartphone, Webcam, Akkugeräte |

**Wichtig bei Schutzklasse III:** Das **Gerät** (z. B. Smartphone) ist Schutzklasse III. Das **Netzteil**, das an 230 V hängt, gehört nicht dazu – es ist selbst meist Schutzklasse II und erzeugt die Kleinspannung mit einem Sicherheitstransformator.

**Schutzklasse 0** (nur Basisisolierung, kein Schutzleiteranschluss) ist in Deutschland nicht zulässig.

**Für den IT-Arbeitsplatz heißt das:** Geräte der Schutzklasse I nur an Schutzkontakt-Steckdosen betreiben, Schutzleiter nie „wegadaptieren“ (keine Adapter ohne Schutzkontakt), beschädigte Kabel und Gehäuse sofort melden und das Gerät aus dem Verkehr ziehen.`,
        },
        {
          type: 'visual',
          title: 'Die drei Schutzklassen',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Schutzklasse I', text: 'Schutzleiter am Metallgehäuse; im Fehlerfall schaltet die Sicherung bzw. der RCD ab. Schuko-Stecker. Desktop-PC, Server, Laserdrucker.', icon: 'Plug' },
                { title: 'Schutzklasse II', text: 'Doppelte oder verstärkte Isolierung, kein Schutzleiter. Symbol: zwei Quadrate. Steckernetzteile, Schreibtischleuchte.', icon: 'Square' },
                { title: 'Schutzklasse III', text: 'Schutzkleinspannung (max. 50 V AC / 120 V DC). Symbol: III in einer Raute. USB-Geräte, Smartphone.', icon: 'BatteryCharging' },
              ],
            },
          },
          caption: 'Basisschutz (Isolierung) + Fehlerschutz (Schutzleiter und Abschaltung) + Zusatzschutz (RCD ≤ 30 mA) = mehrere Schutzschichten.',
        },
        {
          type: 'example',
          title: 'Beispiel: Geräte am neuen Arbeitsplatz einordnen',
          problem: `Du richtest in Hamburg einen Arbeitsplatz ein und liest die Typenschilder: (1) Desktop-PC mit Metallgehäuse und Kaltgerätekabel mit Schutzkontakt, (2) Notebook-Netzteil mit Symbol „zwei Quadrate“, (3) USB-Headset, (4) Laserdrucker mit Schutzleiteranschluss. Ordne die Schutzklassen zu und nenne, worauf du beim Anschluss achtest.`,
          steps: [
            { label: '(1) Desktop-PC', body: 'Schutzleiter am Metallgehäuse → **Schutzklasse I**. Nur an Schutzkontakt-Steckdose/-Leiste anschließen.' },
            { label: '(2) Notebook-Netzteil', body: 'Symbol zwei Quadrate → **Schutzklasse II** (schutzisoliert). Gehäuse und Kabel müssen unbeschädigt sein – die Isolierung ist hier der Schutz.' },
            { label: '(3) USB-Headset', body: 'Betrieb mit 5 V aus dem USB-Port → Schutzkleinspannung → **Schutzklasse III**.' },
            { label: '(4) Laserdrucker', body: 'Schutzleiteranschluss → **Schutzklasse I**. Wegen hoher Einschaltleistung nicht an eine überlastete Mehrfachsteckdose.' },
            { label: 'Prüfen', body: 'Vor dem Einschalten Sichtprüfung (Kabel, Stecker, Gehäuse). Steckdosenstromkreis mit RCD (30 mA) ist Standard in neuen Anlagen; Prüfplakette nach DGUV Vorschrift 3 beachten.' },
          ],
          result: 'PC und Laserdrucker = I, Notebook-Netzteil = II, USB-Headset = III.',
        },
        {
          type: 'check',
          question: {
            id: 'h05-c08', kind: 'match', skill: 'hw.safety.electric', difficulty: 1,
            prompt: `Ordne die Schutzklassen ihrem Schutzprinzip zu.`,
            left: ['Schutzklasse I', 'Schutzklasse II', 'Schutzklasse III'],
            right: ['Schutzleiter am leitfähigen Gehäuse', 'doppelte bzw. verstärkte Isolierung (Schutzisolierung)', 'Schutzkleinspannung (max. 50 V AC / 120 V DC)'],
            answer: [0, 1, 2],
            explanation: 'I = Schutzleiter, II = Schutzisolierung (Symbol zwei Quadrate), III = Schutzkleinspannung (Symbol III in Raute). Häufiger Fehler: die Zahl als „Qualitätsstufe“ lesen – sie beschreibt nur das Schutzprinzip.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'h05-c09', kind: 'number', skill: 'hw.safety.electric', difficulty: 2,
            prompt: `Ein Mensch berührt einen defekten Leiter mit **230 V**. Sein Körperwiderstand beträgt **1.000 Ω**. Welcher Strom fließt durch den Körper – in **mA**?`,
            answer: 230, unit: 'mA',
            misconceptions: [{ answer: '0.23', error: 'einheit-umrechnung', why: '0,23 A ist richtig gerechnet, gefragt sind aber Milliampere: 0,23 A · 1.000 = 230 mA.' }, { answer: '230000', error: 'ohm-formel', why: 'I = U ÷ R – nicht multiplizieren.' }],
            explanation: '**230 mA.** I = U ÷ R = 230 V ÷ 1.000 Ω = 0,23 A = **230 mA** – weit über der Grenze für Herzkammerflimmern (ca. 50 mA). Ein RCD mit 30 mA würde hier sofort abschalten.',
          },
        },
        { type: 'practice', title: 'Übung: Elektrische Sicherheit', questionIds: ['h05-q031', 'h05-q032', 'h05-q033', 'h05-q034', 'h05-q035', 'h05-q036', 'h05-q037', 'h05-q047'], count: 6, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Gefährlich ist der Körperstrom: I = U ÷ R; ab ca. 10 mA kein Loslassen, ab ca. 50 mA Herzkammerflimmern möglich.',
            'DIN VDE 0100-410: Basisschutz (Isolierung, Abdeckung) + Fehlerschutz (Schutzleiter + automatische Abschaltung) + Zusatzschutz (RCD ≤ 30 mA).',
            'RCD vergleicht hin- und rückfließenden Strom; schützt nicht vor Überlast und nicht bei Berührung von L und N.',
            'Schutzklasse I = Schutzleiter, II = Schutzisolierung (zwei Quadrate), III = Schutzkleinspannung (III in Raute).',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'h05-l06',
      title: 'Arbeitssicherheit: Wer darf was? Fünf Sicherheitsregeln und Sicherheitszeichen',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['hw.safety.work'],
      simple: `Als IT-Fachkraft bist du beim Strom ein **Laie** – wie ein Autofahrer, der tanken und Reifendruck prüfen darf, aber nicht am Motor schraubt. Du darfst Geräte einstecken, sie vorher ansehen und kaputte Geräte aus dem Verkehr ziehen. Steckdosen, Leitungen und Sicherungskästen sind Sache einer **Elektrofachkraft** (ausgebildete Elektrikerin oder Elektriker). Die arbeitet nach den **fünf Sicherheitsregeln**: freischalten, gegen Wiedereinschalten sichern, Spannungsfreiheit feststellen, erden und kurzschließen, benachbarte Teile abdecken. **Sicherheitszeichen** erkennst du an Form und Farbe: rund mit rotem Rand = Verbot, gelbes Dreieck = Warnung, blau rund = Gebot, grün = Rettung, rot eckig = Brandschutz.

**Merke:** Fünf Sicherheitsregeln in fester Reihenfolge – und an der Elektroinstallation arbeitet nur die Elektrofachkraft.`,
      steps: [
        {
          type: 'explain',
          title: 'Laie, unterwiesene Person, Elektrofachkraft',
          body: `Die Unfallversicherung (DGUV Vorschrift 3 „Elektrische Anlagen und Betriebsmittel“) unterscheidet drei Gruppen:

| Gruppe | Wer? | Darf zum Beispiel |
|---|---|---|
| **Elektrofachkraft (EFK)** | Ausbildung in der Elektrotechnik (z. B. Elektroniker/in), kann Gefahren selbst beurteilen | Anlagen errichten, ändern, instand setzen, prüfen |
| **Elektrotechnisch unterwiesene Person (EuP)** | von einer EFK für bestimmte Aufgaben unterwiesen | festgelegte Tätigkeiten unter Leitung und Aufsicht einer EFK, z. B. Prüfen von Geräten mit geeignetem Prüfgerät |
| **Elektrotechnischer Laie** | alle anderen – auch **IT-Fachkräfte ohne Zusatzqualifikation** | Geräte bestimmungsgemäß benutzen und anschließen (Stecker) |

**Das darfst du als IT-Fachkraft (Laie):** Geräte per Stecker anschließen und vom Netz trennen, **vor der Benutzung eine Sichtprüfung** machen (Kabel, Stecker, Gehäuse, Prüfplakette), defekte Geräte sofort aus dem Verkehr ziehen, kennzeichnen und melden, Kabel ordentlich verlegen (keine Stolperfallen, Steckdosenleisten nicht hintereinanderstecken).

**Das darfst du nicht:** Gehäuse von Netzteilen, Monitoren oder USVs öffnen und reparieren; Steckdosen, Leitungen oder Stecker montieren oder tauschen; an Verteilern und Sicherungskästen arbeiten; Schutzleiter überbrücken oder „wegadaptieren“.

**Prüfung ortsveränderlicher Geräte (DGUV Vorschrift 3):** PCs, Monitore, Steckdosenleisten und Netzteile werden regelmäßig von einer Elektrofachkraft (oder einer unterwiesenen Person unter ihrer Leitung) mit einem Prüfgerät gemessen; geprüfte Geräte bekommen eine **Prüfplakette**. Die Fristen legt der Arbeitgeber in der Gefährdungsbeurteilung fest – in Büros sind bei geringer Fehlerquote bis zu zwei Jahre üblich.

**Fünf Sicherheitsregeln (DIN VDE 0105-100)** – so macht eine Elektrofachkraft eine Anlage vor Arbeiten sicher, **immer in dieser Reihenfolge**:
1. **Freischalten** (allpolig vom Netz trennen)
2. **Gegen Wiedereinschalten sichern** (z. B. Schloss, Warnschild „Nicht einschalten“)
3. **Spannungsfreiheit feststellen** (allpolig messen, mit geeignetem Prüfgerät)
4. **Erden und kurzschließen**
5. **Benachbarte, unter Spannung stehende Teile abdecken oder abschranken**

Nach der Arbeit wird in umgekehrter Reihenfolge wieder eingeschaltet. **IT-Bezug:** Eine **USV** liefert auch dann noch Spannung, wenn die Unterverteilung abgeschaltet ist. Beim Freischalten müssen deshalb USV-Ausgänge und zweite Einspeisungen (A/B-Versorgung) mitbedacht werden.

**Sicherheitszeichen** (DIN EN ISO 7010, ASR A1.3) erkennst du an **Form und Farbe**:

| Zeichenart | Form | Farbe | Beispiel |
|---|---|---|---|
| **Verbotszeichen** | rund, roter Rand mit Querbalken | rot, weiß, schwarzes Symbol | „Zutritt für Unbefugte verboten“, „Rauchen verboten“ |
| **Warnzeichen** | Dreieck | gelb mit schwarzem Rand und Symbol | „Warnung vor elektrischer Spannung“ (Blitz) |
| **Gebotszeichen** | rund | blau, weißes Symbol | „Gehörschutz benutzen“, „Vor Arbeiten freischalten“ |
| **Rettungszeichen** | rechteckig oder quadratisch | grün, weißes Symbol | „Notausgang“, „Erste Hilfe“ |
| **Brandschutzzeichen** | rechteckig oder quadratisch | rot, weißes Symbol | „Feuerlöscher“, „Brandmeldetelefon“ |

**Verhalten im Brandfall:** Ruhe bewahren → **Brand melden** (Notruf 112 oder Brandmelder) → **in Sicherheit bringen** (Kollegen warnen, Fluchtweg nutzen, keinen Aufzug) → **Löschversuch** nur ohne Eigengefährdung. Für elektrische Geräte und Serverräume eignen sich **CO₂-Löscher** (rückstandsfrei, leiten nicht); in kleinen Räumen Erstickungsgefahr beachten.`,
        },
        {
          type: 'visual',
          title: 'Sicherheitszeichen an Form und Farbe erkennen',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Verbot', text: 'Rund, roter Rand mit Querbalken. Etwas ist untersagt.', icon: 'Ban' },
                { title: 'Warnung', text: 'Gelbes Dreieck mit schwarzem Rand. Hier droht eine Gefahr (z. B. Spannung).', icon: 'AlertTriangle' },
                { title: 'Gebot', text: 'Blau und rund. Etwas muss getan werden (z. B. Schutzausrüstung).', icon: 'Info' },
                { title: 'Rettung', text: 'Grün und eckig. Fluchtweg, Notausgang, Erste Hilfe.', icon: 'DoorOpen' },
                { title: 'Brandschutz', text: 'Rot und eckig. Feuerlöscher, Brandmelder, Löschschlauch.', icon: 'Flame' },
                { title: 'Fünf Regeln', text: 'Freischalten → sichern → Spannungsfreiheit feststellen → erden und kurzschließen → abdecken.', icon: 'ListOrdered' },
              ],
            },
          },
        },
        {
          type: 'check',
          question: {
            id: 'h05-c10', kind: 'order', skill: 'hw.safety.work', difficulty: 2,
            prompt: `Eine Elektrofachkraft soll im Serverraum an einer Unterverteilung arbeiten. Bringe die fünf Sicherheitsregeln in die richtige Reihenfolge.`,
            items: ['Freischalten', 'Gegen Wiedereinschalten sichern', 'Spannungsfreiheit feststellen', 'Erden und kurzschließen', 'Benachbarte, unter Spannung stehende Teile abdecken oder abschranken'],
            explanation: 'Freischalten → Sichern → Spannungsfreiheit feststellen → Erden und kurzschließen → Abdecken (DIN VDE 0105-100). Häufiger Fehler: erst messen, dann sichern – dann könnte jemand während der Arbeit wieder einschalten.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'h05-c11', kind: 'match', skill: 'hw.safety.work', difficulty: 1,
            prompt: `Ordne die Zeichenart ihrem Aussehen zu.`,
            left: ['Verbotszeichen', 'Warnzeichen', 'Gebotszeichen', 'Rettungszeichen', 'Brandschutzzeichen'],
            right: ['rund, roter Rand mit Querbalken', 'gelbes Dreieck mit schwarzem Rand', 'rund, blau mit weißem Symbol', 'eckig, grün mit weißem Symbol', 'eckig, rot mit weißem Symbol'],
            answer: [0, 1, 2, 3, 4],
            explanation: 'Verbot rot-rund mit Balken, Warnung gelbes Dreieck, Gebot blau-rund, Rettung grün-eckig, Brandschutz rot-eckig (DIN EN ISO 7010).',
          },
        },
        { type: 'practice', title: 'Übung: Arbeitssicherheit', questionIds: ['h05-q038', 'h05-q039', 'h05-q040', 'h05-q041', 'h05-q042', 'h05-q043', 'h05-q044', 'h05-q045', 'h05-q046'], count: 6, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'IT-Fachkräfte sind elektrotechnische Laien: anschließen, Sichtprüfung, Defektes aussortieren und melden – keine Arbeiten an Installation und Geräten.',
            'DGUV Vorschrift 3: regelmäßige Prüfung ortsveränderlicher Geräte durch eine Elektrofachkraft, Prüfplakette.',
            'Fünf Sicherheitsregeln: freischalten, sichern, Spannungsfreiheit feststellen, erden und kurzschließen, abdecken – USV-Ausgänge mitbedenken.',
            'Zeichen: Verbot rot-rund, Warnung gelbes Dreieck, Gebot blau-rund, Rettung grün, Brandschutz rot-eckig.',
            'Brandfall: melden → in Sicherheit bringen → löschen (CO₂ bei Elektrogeräten).',
          ],
        },
      ],
    },
  ],
  /* ==================================================================== */
  questions: [
    {
      id: 'h05-q001', kind: 'match', skill: 'hw.ergo.law', difficulty: 2,
      prompt: `Ordne die Regelungen ihrem Inhalt zu.`,
      left: ['ArbSchG', 'ArbStättV Anhang 6', 'ArbMedVV', 'ASR A3.4'],
      right: ['Grundpflichten, Gefährdungsbeurteilung', 'Anforderungen an Bildschirmarbeitsplätze', 'arbeitsmedizinische Vorsorge (Augenuntersuchung)', 'Technische Regel zur Beleuchtung'],
      answer: [0, 1, 2, 3],
      explanation: 'Gesetz → Verordnungen → Technische Regeln.',
    },
    {
      id: 'h05-q002', kind: 'free', skill: 'hw.ergo.law', difficulty: 2,
      prompt: `Erläutere, was eine **Gefährdungsbeurteilung** nach § 5 ArbSchG ist und nenne zwei Gefährdungen, die an einem Bildschirmarbeitsplatz betrachtet werden.`,
      modelAnswer: 'Die Gefährdungsbeurteilung ist die systematische Ermittlung und Bewertung der Gefährdungen, denen Beschäftigte bei ihrer Arbeit ausgesetzt sind, mit dem Ziel, geeignete Schutzmaßnahmen festzulegen, umzusetzen, auf Wirksamkeit zu prüfen und zu dokumentieren. Der Arbeitgeber ist dazu verpflichtet. Gefährdungen am Bildschirmarbeitsplatz: Belastungen des Muskel-Skelett-Systems durch ungünstige Haltung (Monitorhöhe, Stuhl, Tisch), Belastung der Augen durch Blendung/Spiegelungen oder schlechte Beleuchtung, psychische Belastungen (Zeitdruck, Unterbrechungen, schlecht bedienbare Software), Lärm, Raumklima, elektrische Gefährdungen/Stolperfallen durch Kabel.',
      keywords: ['systematisch', 'ermitteln', 'bewerten', 'Maßnahmen', 'dokumentieren', 'Haltung', 'Blendung', 'psychische Belastung'],
      explanation: 'Ermitteln → Bewerten → Maßnahmen → Wirksamkeit prüfen → Dokumentieren.',
    },
    {
      id: 'h05-q003', kind: 'single', skill: 'hw.ergo.law', difficulty: 2,
      prompt: `Eine Mitarbeiterin benötigt laut Augenarzt eine spezielle **Bildschirmarbeitsplatzbrille**, weil ihre normale Brille für den Bildschirmabstand nicht geeignet ist. Wer trägt die Kosten?`,
      options: ['Die Mitarbeiterin', 'Der Arbeitgeber (im Rahmen der arbeitsmedizinischen Vorsorge nach ArbMedVV)', 'Die Berufsschule', 'Immer die Krankenkasse'],
      answer: 1,
      distractors: {
        '0': { why: 'Spezielle Sehhilfen für die Bildschirmarbeit sind vom Arbeitgeber bereitzustellen, wenn normale Sehhilfen nicht geeignet sind.', error: 'arbmedvv-brille' },
        '2': { why: 'Die Berufsschule ist nicht zuständig.', error: 'arbmedvv-brille' },
        '3': { why: 'Die Brille dient der Arbeit – zuständig ist der Arbeitgeber.', error: 'arbmedvv-brille' },
      },
      explanation: 'ArbMedVV: Angebotsvorsorge bei Bildschirmarbeit; erforderliche spezielle Sehhilfen stellt der Arbeitgeber.',
    },
    {
      id: 'h05-q004', kind: 'multi', skill: 'hw.ergo.law', difficulty: 2,
      prompt: `Welche Anforderungen stellt die ArbStättV (Anhang 6) an **Bildschirme und Tastaturen**?`,
      options: ['Bildschirm flimmerfrei mit einstellbarer Helligkeit und einstellbarem Kontrast', 'Bildschirm frei dreh- und neigbar', 'Tastatur vom Bildschirm getrennt', 'Bildschirm muss mindestens 32 Zoll groß sein', 'Reflexions- und blendfreie Oberflächen'],
      answer: [0, 1, 2, 4],
      explanation: 'Eine feste Mindestgröße schreibt die Verordnung nicht vor – die Darstellung muss für die Aufgabe ausreichend groß und scharf sein.',
    },
    {
      id: 'h05-q005', kind: 'single', skill: 'hw.ergo.law', difficulty: 2,
      prompt: `Die Geschäftsleitung möchte eine Software einführen, die heimlich Tastenanschläge der Mitarbeitenden zählt, um ihre Leistung zu messen. Was sagt die ArbStättV (Anhang 6) dazu?`,
      options: ['Erlaubt, wenn die Software zertifiziert ist.', 'Ohne Wissen der Beschäftigten darf keine Vorrichtung zur qualitativen oder quantitativen Kontrolle verwendet werden.', 'Erlaubt, wenn der Betriebsrat nicht existiert.', 'Die ArbStättV regelt keine Software.'],
      answer: 1,
      distractors: {
        '0': { why: 'Eine Zertifizierung ändert nichts am Verbot heimlicher Kontrolle.', error: 'kontrolle-verbot' },
        '2': { why: 'Das Verbot gilt unabhängig vom Betriebsrat (wo es einen gibt, hat er zusätzlich Mitbestimmungsrechte, § 87 BetrVG).', error: 'kontrolle-verbot' },
        '3': { why: 'Anhang 6 enthält ausdrücklich Anforderungen an die Software.', error: 'kontrolle-verbot' },
      },
      explanation: 'Heimliche Leistungs-/Verhaltenskontrolle ist unzulässig – außerdem greifen Datenschutzrecht und Mitbestimmung.',
    },
    {
      id: 'h05-q006', kind: 'order', skill: 'hw.ergo.setup', difficulty: 2,
      prompt: `Bringe die Schritte beim Einstellen eines Bildschirmarbeitsplatzes in eine sinnvolle Reihenfolge (von unten nach oben).`,
      items: ['Sitzhöhe so einstellen, dass die Füße flach stehen und die Knie etwa 90° bilden', 'Rückenlehne und Lordosenstütze anpassen', 'Tischhöhe so einstellen, dass die Unterarme waagerecht aufliegen', 'Tastatur und Maus vor dem Körper positionieren', 'Monitor ausrichten: oberste Zeile höchstens auf Augenhöhe, Abstand ca. 50–80 cm'],
      explanation: 'Erst die Basis (Sitzen), dann Tisch, Eingabegeräte und zuletzt der Monitor.',
    },
    {
      id: 'h05-q007', kind: 'number', skill: 'hw.ergo.setup', difficulty: 1,
      prompt: `Welchen **Mindest-Sehabstand in cm** zum Bildschirm empfehlen die Leitfäden der Unfallversicherung für Büroarbeitsplätze ungefähr?`,
      answer: 50, tolerance: 0, unit: 'cm',
      explanation: 'Mindestens ca. **50 cm**; bei größeren Bildschirmen entsprechend mehr.',
    },
    {
      id: 'h05-q008', kind: 'free', skill: 'hw.ergo.setup', difficulty: 2,
      prompt: `Ein Vertriebsmitarbeiter arbeitet täglich 7 Stunden ausschließlich am Notebook auf dem Schreibtisch. Erläutere die ergonomischen Probleme und eine Lösung.`,
      modelAnswer: 'Beim Notebook sind Bildschirm und Tastatur fest verbunden. Steht die Tastatur ergonomisch richtig, ist das Display zu niedrig und zu nah – der Kopf wird stark nach vorn gebeugt (Nacken-/Schulterbeschwerden). Hebt man das Notebook an, liegen die Hände zu hoch. Außerdem ist das Display oft klein und spiegelnd. Lösung: Dockingstation mit externem, höhenverstellbarem Monitor (oberste Zeile ≤ Augenhöhe, Abstand ≥ 50 cm), externe Tastatur und Maus; alternativ Notebookständer plus externe Tastatur/Maus. Das entspricht auch der ArbStättV, die für dauerhaft ortsgebundene Nutzung tragbarer Geräte die Anforderungen an stationäre Arbeitsplätze vorsieht.',
      keywords: ['Tastatur und Display verbunden', 'Nacken', 'Dockingstation', 'externer Monitor', 'externe Tastatur', 'ArbStättV'],
      explanation: 'Notebook dauerhaft = Dock + externe Peripherie.',
    },
    {
      id: 'h05-q009', kind: 'single', skill: 'hw.ergo.setup', difficulty: 2,
      prompt: `Wie hoch sollte der Monitor bei einem Nutzer mit **Gleitsichtbrille** eingestellt werden?`,
      options: ['Deutlich über Augenhöhe', 'Eher niedriger als üblich und leicht nach hinten geneigt, damit durch den Nahbereich der Brille geschaut werden kann', 'Höhe ist egal', 'Auf dem Boden'],
      answer: 1,
      distractors: {
        '0': { why: 'Dann müsste der Kopf in den Nacken gelegt werden, um durch den unteren Nahbereich der Gleitsichtbrille zu schauen.', error: 'monitorhoehe' },
        '2': { why: 'Die Höhe beeinflusst stark die Kopfhaltung.', error: 'monitorhoehe' },
        '3': { why: 'Viel zu tief – starke Nackenbeugung.', error: 'monitorhoehe' },
      },
      explanation: 'Gleitsicht: Nahbereich unten im Glas → Monitor tiefer; besser: Bildschirmarbeitsplatzbrille.',
    },
    {
      id: 'h05-q010', kind: 'multi', skill: 'hw.ergo.setup', difficulty: 2,
      prompt: `Welche Merkmale sollte ein ergonomischer **Bürodrehstuhl** haben?`,
      options: ['Höhenverstellbarer Sitz', 'Rückenlehne mit Lendenbausch (Lordosenstütze)', 'Fünf Rollen bzw. Füße für Kippsicherheit', 'Feste, nicht verstellbare Rückenlehne', 'Höhenverstellbare Armlehnen'],
      answer: [0, 1, 2, 4],
      explanation: 'Verstellbarkeit, Lordosenstütze, Kippsicherheit durch fünf Rollen, verstellbare Armlehnen.',
    },
    {
      id: 'h05-q011', kind: 'table', skill: 'hw.ergo.environment', difficulty: 2,
      prompt: `Ergänze die Richtwerte für Büro-/Bildschirmarbeitsplätze.`,
      columns: [{ key: 'w', label: 'Wert', type: 'number' }],
      rows: [
        { label: 'Beleuchtungsstärke mindestens (lx)', cells: { w: { answer: '500' } } },
        { label: 'Raumtemperatur mindestens (°C)', cells: { w: { answer: '20' } } },
        { label: 'ab dieser Temperatur sollen Maßnahmen ergriffen werden (°C)', cells: { w: { answer: '26' } } },
        { label: 'Lärm bei konzentrierter geistiger Tätigkeit höchstens (dB(A))', cells: { w: { answer: '55' } } },
      ],
      explanation: 'ASR A3.4: 500 lx; ASR A3.5: mind. 20 °C, ab 26 °C sollen, ab 30 °C müssen Maßnahmen erfolgen; ASR A3.7: 55 dB(A).',
    },
    {
      id: 'h05-q012', kind: 'free', skill: 'hw.ergo.environment', difficulty: 2,
      prompt: `Ein Mitarbeiter sitzt mit dem **Rücken zum Fenster**. Beschreibe das Problem und zwei Abhilfemaßnahmen.`,
      modelAnswer: 'Das helle Fenster spiegelt sich im Bildschirm (Reflexblendung); Kontrast und Lesbarkeit sinken, die Augen ermüden, der Mitarbeiter nimmt oft eine ungünstige Haltung ein, um den Spiegelungen auszuweichen. Abhilfe: 1. Arbeitsplatz drehen, sodass die Blickrichtung parallel zur Fensterfront verläuft. 2. Sonnenschutz/Jalousien bzw. Lamellen nutzen. 3. Monitor mit entspiegelter (matter) Oberfläche einsetzen, Positivdarstellung (dunkle Schrift auf hellem Grund).',
      keywords: ['Spiegelung', 'Reflexion', 'parallel zum Fenster', 'Jalousie', 'matt', 'entspiegelt'],
      explanation: 'Rücken zum Fenster → Spiegelung; Blick ins Fenster → Blendung; richtig: parallel.',
    },
    {
      id: 'h05-q013', kind: 'single', skill: 'hw.ergo.environment', difficulty: 2,
      prompt: `Im Büro der Buchhaltung steht ein Abteilungs-Laserdrucker, außerdem läuft dort ein alter Tower-Server. Was empfiehlst du?`,
      options: ['Nichts – das ist üblich.', 'Drucker in einen separaten Raum/Kopierraum und den Server in den Serverraum verlagern (Lärm, Wärme, Emissionen, Sicherheit).', 'Den Mitarbeitenden Ohrstöpsel geben.', 'Die Raumtemperatur senken.'],
      answer: 1,
      distractors: {
        '0': { why: 'Lärm, Wärme, Feinstaub/Ozon und Zugriffsschutz sprechen gegen diesen Aufstellort.', error: 'arbeitsumgebung' },
        '2': { why: 'Technische und organisatorische Maßnahmen gehen persönlichen Schutzmaßnahmen vor (TOP-Prinzip).', error: 'arbeitsumgebung' },
        '3': { why: 'Das löst Lärm und Emissionen nicht.', error: 'arbeitsumgebung' },
      },
      explanation: 'Lärmquellen entfernen; Server gehören aus Sicherheitsgründen (Zutritt, Kühlung, USV) ohnehin in einen Serverraum.',
    },
    {
      id: 'h05-q014', kind: 'number', skill: 'hw.ergo.environment', difficulty: 2,
      prompt: `In einem Büro stehen 4 PCs mit je **80 W**, 4 Monitore mit je **25 W** und ein Drucker im Bereitschaftsbetrieb mit **20 W**. Welche Wärmeleistung in **W** geben die Geräte zusammen an den Raum ab? (Annahme: die gesamte elektrische Leistung wird zu Wärme)`,
      answer: 440, unit: 'W',
      misconceptions: [{ answer: '125', error: 'anzahl-vergessen', why: 'Die Anzahl der Geräte fehlt: 4 · 80 + 4 · 25 + 20.' }],
      explanation: '4 · 80 + 4 · 25 + 20 = 320 + 100 + 20 = **440 W** – das wirkt wie ein kleiner Heizlüfter; im Sommer relevant fürs Raumklima.',
    },
    {
      id: 'h05-q015', kind: 'multi', skill: 'hw.ergo.environment', difficulty: 2,
      prompt: `Welche Maßnahmen reduzieren die **Lärmbelastung** in einem Großraumbüro?`,
      options: ['Akustikelemente (Stellwände, Deckenabsorber)', 'Headsets mit Geräuschunterdrückung', 'Lautere Klingeltöne an allen Telefonen', 'Ruhe- und Besprechungsräume für Telefonate', 'Drucker in separaten Räumen'],
      answer: [0, 1, 3, 4],
      explanation: 'Lautere Klingeltöne erhöhen den Lärm. Alle anderen Maßnahmen verringern ihn.',
    },
    {
      id: 'h05-q016', kind: 'single', skill: 'hw.ergo.setup', difficulty: 1,
      prompt: `Was empfehlen Arbeitsschützer zur Gestaltung der Bildschirmarbeit über den Tag?`,
      options: ['Acht Stunden ohne Unterbrechung, dafür längere Mittagspause', 'Regelmäßige kurze Unterbrechungen bzw. Wechsel mit anderen Tätigkeiten (Mischarbeit)', 'Nur am Wochenende Pausen', 'Pausen nur bei Beschwerden'],
      answer: 1,
      distractors: {
        '0': { why: 'Mehrere kurze Unterbrechungen sind wirksamer als eine lange Pause.', error: 'pausen' },
        '2': { why: 'Erholung muss im Arbeitstag stattfinden.', error: 'pausen' },
        '3': { why: 'Vorbeugen statt warten, bis Beschwerden auftreten.', error: 'pausen' },
      },
      explanation: 'ArbStättV Anhang 6: Bildschirmarbeit durch andere Tätigkeiten oder regelmäßige Erholungszeiten unterbrechen.',
    },
    {
      id: 'h05-q017', kind: 'free', skill: 'hw.ergo.law', difficulty: 3,
      prompt: `Die Elektro Krämer GmbH erlaubt **mobiles Arbeiten** (flexibel von zu Hause) und richtet für einige Beschäftigte **Telearbeitsplätze** ein. Erläutere den Unterschied und welche Pflichten der Arbeitgeber jeweils hat.`,
      modelAnswer: 'Telearbeitsplätze sind nach § 2 ArbStättV vom Arbeitgeber fest eingerichtete Bildschirmarbeitsplätze im Privatbereich der Beschäftigten, mit vereinbarter Wochenarbeitszeit und Dauer; der Arbeitgeber stellt Möbel, Arbeitsmittel und Kommunikationseinrichtungen bereit und installiert sie. Für sie gelten die Anforderungen der ArbStättV (insbesondere Gefährdungsbeurteilung bei der erstmaligen Beurteilung, Unterweisung und Anhang 6 Bildschirmarbeit). Mobiles Arbeiten ist ortsflexibles Arbeiten ohne fest eingerichteten Arbeitsplatz (Küchentisch, Zug, Hotel); es fällt nicht unter die ArbStättV. Das ArbSchG gilt jedoch weiterhin: Der Arbeitgeber muss die Gefährdungen beurteilen, unterweisen (z. B. zu Ergonomie, Pausen, Datenschutz/Informationssicherheit) und geeignete Arbeitsmittel bereitstellen.',
      keywords: ['fest eingerichtet', '§ 2 ArbStättV', 'Ausstattung durch Arbeitgeber', 'mobiles Arbeiten', 'ArbSchG', 'Gefährdungsbeurteilung', 'Unterweisung'],
      explanation: 'Telearbeit = ArbStättV; mobiles Arbeiten = (nur) ArbSchG.',
    },
    {
      id: 'h05-q018', kind: 'order', skill: 'hw.ergo.software', difficulty: 3,
      prompt: `Bringe die Grundsätze der Interaktion nach **DIN EN ISO 9241-110:2020** in die Reihenfolge, in der sie in der Norm aufgeführt werden.`,
      items: ['Aufgabenangemessenheit', 'Selbstbeschreibungsfähigkeit', 'Erwartungskonformität', 'Erlernbarkeit', 'Steuerbarkeit', 'Robustheit gegen Benutzungsfehler', 'Benutzerbindung'],
      hints: ['Die Norm beginnt mit der Aufgabe und endet mit der Bindung des Nutzers.'],
      explanation: 'Reihenfolge der 2020er-Fassung: Aufgabenangemessenheit, Selbstbeschreibungsfähigkeit, Erwartungskonformität, Erlernbarkeit, Steuerbarkeit, Robustheit gegen Benutzungsfehler, Benutzerbindung.',
    },
    {
      id: 'h05-q019', kind: 'single', skill: 'hw.ergo.software', difficulty: 2,
      prompt: `Ein Formular verliert beim Absenden **alle Eingaben**, wenn ein Pflichtfeld fehlt, und zeigt nur „Fehler 0x80004005“. Welcher Grundsatz ist vor allem verletzt?`,
      options: ['Benutzerbindung', 'Robustheit gegen Benutzungsfehler', 'Aufgabenangemessenheit', 'Erlernbarkeit'],
      answer: 1,
      distractors: {
        '0': { why: 'Frust senkt zwar die Motivation, der Kern ist aber der Umgang mit dem Fehler.', error: 'iso9241-grundsatz' },
        '2': { why: 'Die Aufgabe an sich wird unterstützt – das Problem ist die Fehlerbehandlung.', error: 'iso9241-grundsatz' },
        '3': { why: 'Erlernbarkeit betrifft das Erlernen der Bedienung.', error: 'iso9241-grundsatz' },
      },
      explanation: 'Robust: Eingaben bleiben erhalten, das fehlende Feld wird markiert, die Meldung erklärt verständlich, was zu tun ist.',
    },
    {
      id: 'h05-q020', kind: 'match', skill: 'hw.ergo.access', difficulty: 1,
      prompt: `Ordne die Hilfsmittel der Einschränkung zu, für die sie vorrangig gedacht sind.`,
      left: ['Braillezeile', 'Untertitel/Live-Transkription', 'Spracherkennung zur Texteingabe', 'Bildschirmlupe'],
      right: ['Blindheit', 'Hörbehinderung', 'motorische Einschränkung der Hände', 'Sehbehinderung'],
      answer: [0, 1, 2, 3],
      explanation: 'Braillezeile → Blindheit; Untertitel → Hörbehinderung; Sprache → Motorik; Lupe → Sehbehinderung.',
    },
    {
      id: 'h05-q021', kind: 'text', skill: 'hw.ergo.access', difficulty: 2,
      prompt: `Wie heißt das Gesetz, das seit dem **28. Juni 2025** Barrierefreiheitsanforderungen für viele Produkte und Dienstleistungen der Privatwirtschaft (z. B. Online-Shops, Computer, Selbstbedienungsterminals) festlegt? (Abkürzung)`,
      accept: ['BFSG', 'Barrierefreiheitsstärkungsgesetz'],
      explanation: '**BFSG** – Barrierefreiheitsstärkungsgesetz (Umsetzung des European Accessibility Act).',
    },
    {
      id: 'h05-q022', kind: 'multi', skill: 'hw.ergo.access', difficulty: 2,
      prompt: `Welche Prinzipien bilden die Grundlage der **WCAG**?`,
      options: ['Wahrnehmbar', 'Bedienbar', 'Verständlich', 'Robust', 'Kostengünstig', 'Farbenfroh'],
      answer: [0, 1, 2, 3],
      explanation: 'Die vier WCAG-Prinzipien: wahrnehmbar, bedienbar, verständlich, robust (engl. POUR).',
    },
    {
      id: 'h05-q023', kind: 'free', skill: 'hw.ergo.access', difficulty: 2,
      prompt: `Das Intranet der Elektro Krämer GmbH soll barrierefreier werden. Nenne vier konkrete Maßnahmen.`,
      modelAnswer: '1. Alternativtexte für Bilder und Grafiken, damit Screenreader sie vorlesen können. 2. Ausreichende Farbkontraste und Informationen nicht nur über Farbe vermitteln. 3. Vollständige Bedienbarkeit per Tastatur mit sichtbarem Fokus. 4. Saubere Struktur mit echten Überschriften, Listen und beschrifteten Formularfeldern; verständliche Sprache. 5. Untertitel/Transkripte für Videos. 6. Skalierbarkeit (Zoom bis 200 % ohne Informationsverlust). 7. Test mit Screenreader und automatisierten Prüfwerkzeugen; Orientierung an WCAG/EN 301 549.',
      keywords: ['Alternativtext', 'Kontrast', 'Tastatur', 'Überschriften', 'Untertitel', 'Zoom', 'WCAG'],
      explanation: 'Konkrete WCAG-Maßnahmen nennen.',
    },
    {
      id: 'h05-q024', kind: 'single', skill: 'hw.ergo.access', difficulty: 2,
      prompt: `Für welche Stellen gilt die **BITV 2.0** in erster Linie?`,
      options: ['Für private Online-Shops', 'Für öffentliche Stellen (des Bundes), z. B. Websites, Apps und Intranets von Behörden', 'Für Hardwarehersteller', 'Für Berufsschüler'],
      answer: 1,
      distractors: {
        '0': { why: 'Für private Anbieter gilt seit 2025 vor allem das BFSG.', error: 'bitv-bfsg' },
        '2': { why: 'Produkte der Privatwirtschaft regelt das BFSG.', error: 'bitv-bfsg' },
        '3': { why: 'Die Verordnung richtet sich an Anbieter, nicht an Nutzer.', error: 'bitv-bfsg' },
      },
      explanation: 'BITV 2.0 → öffentliche Stellen; BFSG → Privatwirtschaft (bestimmte Produkte/Dienstleistungen).',
    },
    {
      id: 'h05-q025', kind: 'single', skill: 'hw.ergo.software', difficulty: 1,
      prompt: `In allen Programmen eines Unternehmens befindet sich die Schaltfläche „Speichern“ an derselben Stelle und hat dasselbe Symbol. Welcher Grundsatz wird damit erfüllt?`,
      options: ['Erwartungskonformität', 'Steuerbarkeit', 'Benutzerbindung', 'Aufgabenangemessenheit'],
      answer: 0,
      distractors: {
        '1': { why: 'Steuerbarkeit meint, dass Nutzer Ablauf und Tempo bestimmen.', error: 'iso9241-grundsatz' },
        '2': { why: 'Benutzerbindung zielt auf Motivation und angenehme Nutzung.', error: 'iso9241-grundsatz' },
        '3': { why: 'Aufgabenangemessenheit betrifft die Unterstützung der Arbeitsaufgabe.', error: 'iso9241-grundsatz' },
      },
      explanation: 'Einheitliche, gewohnte Bedienung = Erwartungskonformität.',
    },
    {
      id: 'h05-q026', kind: 'free', skill: 'hw.ergo.setup', difficulty: 2,
      prompt: `Begründe, warum ein **Sitz-Steh-Tisch** für einen Bildschirmarbeitsplatz sinnvoll ist, und wie er richtig genutzt wird.`,
      modelAnswer: 'Langes statisches Sitzen belastet Rücken, Nacken und Kreislauf. Ein Sitz-Steh-Tisch ermöglicht den regelmäßigen Wechsel zwischen Sitzen und Stehen (dynamisches Arbeiten), entlastet die Wirbelsäule und fördert die Durchblutung. Richtig genutzt wird er durch häufigen Wechsel (z. B. mehrmals pro Stunde bzw. Stunde – nicht stundenlanges Stehen), wobei in beiden Positionen die Tischhöhe angepasst wird: Unterarme etwa waagerecht, Monitorhöhe und Sehabstand nachstellen. Ergänzend: geeignetes Schuhwerk, ggf. Anti-Ermüdungsmatte.',
      keywords: ['Haltungswechsel', 'dynamisch', 'Rücken', 'Durchblutung', 'Höhe anpassen', 'Unterarme waagerecht'],
      explanation: 'Wechsel ist das Ziel – nicht Dauerstehen.',
    },
    {
      id: 'h05-q027', kind: 'number', skill: 'hw.ergo.environment', difficulty: 2,
      prompt: `Nach dem Richtwert von **8 m² Grundfläche je Büroarbeitsplatz**: Wie viele Arbeitsplätze lassen sich in einem Büro mit **5,5 m × 6 m** Grundfläche höchstens einrichten?`,
      answer: 4, unit: 'Arbeitsplätze',
      misconceptions: [{ answer: '5', error: 'runden-falsch', why: '33 m² / 8 m² = 4,125 → abrunden.' }],
      explanation: '5,5 · 6 = 33 m²; 33 / 8 = 4,125 → **4 Arbeitsplätze**.',
    },
    {
      id: 'h05-q028', kind: 'single', skill: 'hw.ergo.law', difficulty: 2,
      prompt: `Was bedeutet die „**Vermutungswirkung**“ der Technischen Regeln für Arbeitsstätten (ASR)?`,
      options: ['ASR sind Empfehlungen ohne jede Bedeutung.', 'Hält der Arbeitgeber die ASR ein, kann er davon ausgehen, dass die Anforderungen der ArbStättV erfüllt sind; andere Lösungen müssen mindestens gleich wirksam sein.', 'ASR gelten nur für Behörden.', 'ASR ersetzen das Arbeitsschutzgesetz.'],
      answer: 1,
      distractors: {
        '0': { why: 'ASR konkretisieren die Verordnung und haben rechtliche Bedeutung.', error: 'asr-vermutung' },
        '2': { why: 'Sie gelten für alle Arbeitgeber im Anwendungsbereich der ArbStättV.', error: 'asr-vermutung' },
        '3': { why: 'Sie stehen unter Gesetz und Verordnung und konkretisieren diese.', error: 'asr-vermutung' },
      },
      explanation: 'Einhaltung der ASR = Vermutung der Rechtskonformität; Abweichungen sind möglich, wenn gleichwertig.',
    },
    {
      id: 'h05-q029', kind: 'free', skill: 'hw.ergo.software', difficulty: 2,
      prompt: `Erläutere den Grundsatz **Steuerbarkeit** nach DIN EN ISO 9241-110 und nenne ein Beispiel aus einer Software, mit der du arbeitest.`,
      modelAnswer: 'Ein Dialog ist steuerbar, wenn der Benutzer den Ablauf (Richtung, Geschwindigkeit, Abfolge) bis zum Erreichen seines Ziels beeinflussen kann. Er kann Vorgänge unterbrechen, abbrechen, zurückgehen oder rückgängig machen und den Umfang der Anzeige selbst bestimmen. Beispiele: „Rückgängig“ (Strg+Z) in Office, „Zurück“ und „Abbrechen“ in einem Installationsassistenten, Pausieren eines Downloads, einstellbare Spalten in einer Ticket-Liste.',
      keywords: ['Ablauf beeinflussen', 'abbrechen', 'zurück', 'rückgängig', 'Beispiel'],
      explanation: 'Nutzer behält die Kontrolle.',
    },
    {
      id: 'h05-q030', kind: 'multi', skill: 'hw.ergo.access', difficulty: 2,
      prompt: `Welche Windows-Bordmittel unterstützen Menschen mit Einschränkungen (Barrierefreiheit/„Bedienungshilfen“)?`,
      options: ['Sprachausgabe (Screenreader)', 'Bildschirmlupe', 'Kontrastdesigns', 'Live-Untertitel', 'Defragmentierung', 'Einrastfunktion für Tastenkombinationen'],
      answer: [0, 1, 2, 3, 5],
      explanation: 'Sprachausgabe, Lupe, Kontrastdesigns, Live-Untertitel und Einrastfunktion sind Bedienungshilfen. Defragmentierung ist Datenträgerwartung.',
    },
    /* --------------------- Elektrische Sicherheit (l05) --------------------- */
    {
      id: 'h05-q031', kind: 'table', skill: 'hw.safety.electric', difficulty: 2,
      prompt: `Du liest an einem neuen Arbeitsplatz die Typenschilder. Trage die **Schutzklasse** (I, II oder III) ein.`,
      columns: [
        { key: 'geraet', label: 'Gerät / Typenschild', type: 'text' },
        { key: 'sk', label: 'Schutzklasse', type: 'text' },
      ],
      rows: [
        { cells: { geraet: { given: 'Desktop-PC, Metallgehäuse, Kaltgerätekabel mit Schutzkontakt' }, sk: { answer: 'I', accept: ['1', 'SK I', 'SK1', 'Schutzklasse I'] } } },
        { cells: { geraet: { given: 'Notebook-Netzteil, Symbol „zwei Quadrate“, Eurostecker' }, sk: { answer: 'II', accept: ['2', 'SK II', 'SK2', 'Schutzklasse II'] } } },
        { cells: { geraet: { given: 'Kabellose Maus mit 1,2-V-Akku' }, sk: { answer: 'III', accept: ['3', 'SK III', 'SK3', 'Schutzklasse III'] } } },
        { cells: { geraet: { given: 'Laserdrucker mit Schutzleiteranschluss' }, sk: { answer: 'I', accept: ['1', 'SK I', 'SK1', 'Schutzklasse I'] } } },
        { cells: { geraet: { given: 'USB-Webcam (5 V aus dem USB-Port)' }, sk: { answer: 'III', accept: ['3', 'SK III', 'SK3', 'Schutzklasse III'] } } },
      ],
      misconceptions: [{ answer: 'III', cell: '1:sk', error: 'schutzklasse-netzteil-iii', why: 'Das Netzteil hängt an 230 V und ist schutzisoliert (zwei Quadrate) → Schutzklasse II. Schutzklasse III hat erst das Gerät, das mit der Kleinspannung betrieben wird.' }],
      explanation: '**I, II, III, I, III.** Schutzleiter → I; zwei Quadrate → II; Betrieb nur mit Kleinspannung (Akku, USB) → III.\n\nHäufiger Fehler: das Netzteil selbst als Schutzklasse III einordnen – es erzeugt die Kleinspannung, hängt aber am 230-V-Netz.',
    },
    {
      id: 'h05-q032', kind: 'single', skill: 'hw.safety.electric', difficulty: 2,
      prompt: `Welche Maßnahme ist nach DIN VDE 0100-410 ein **Zusatzschutz**?`,
      options: ['Fehlerstrom-Schutzeinrichtung (RCD) mit einem Bemessungsfehlerstrom von höchstens 30 mA', 'Isolierung der Leiter', 'Schutzleiter mit automatischer Abschaltung durch den Leitungsschutzschalter', 'Abdeckung Strom führender Teile durch ein Gehäuse'],
      answer: 0,
      distractors: {
        '1': { why: 'Die Isolierung verhindert das Berühren aktiver Teile im Normalbetrieb – das ist **Basisschutz**.', error: 'schutzmassnahme-stufe' },
        '2': { why: 'Schutzleiter plus automatische Abschaltung wirkt im Fehlerfall (Körperschluss) – das ist **Fehlerschutz**.', error: 'schutzmassnahme-stufe' },
        '3': { why: 'Abdeckungen und Gehäuse gehören zum **Basisschutz**.', error: 'schutzmassnahme-stufe' },
      },
      explanation: '**RCD ≤ 30 mA.** Er greift, wenn Basis- und Fehlerschutz versagen oder bei Unvorsichtigkeit. Häufiger Fehler: Schutzleiter und RCD verwechseln – der Schutzleiter gehört zum Fehlerschutz.',
    },
    {
      id: 'h05-q033', kind: 'number', skill: 'hw.safety.electric', difficulty: 2,
      prompt: `Eine Person berührt ein defektes Gehäuse, an dem **230 V** anliegen, und steht barfuß auf feuchtem Boden. Der Widerstand auf dem Weg Hand–Fuß beträgt **1.150 Ω**.\n\nWelcher Strom fließt durch den Körper – in **mA**?`,
      answer: 200, unit: 'mA',
      misconceptions: [
        { answer: '0.2', error: 'einheit-umrechnung', why: '0,2 A ist richtig gerechnet, gefragt sind Milliampere: 0,2 A · 1.000 = 200 mA.' },
        { answer: '264500', error: 'ohm-formel', why: 'U und R multipliziert. Der Strom ist I = U ÷ R.' },
      ],
      explanation: '**200 mA.** I = U ÷ R = 230 V ÷ 1.150 Ω = 0,2 A = **200 mA**. Das liegt weit über der Grenze, ab der Herzkammerflimmern möglich ist (ca. 50 mA). Ein RCD mit 30 mA schaltet hier ab.\n\nHäufiger Fehler: in A antworten, obwohl mA gefragt ist.',
    },
    {
      id: 'h05-q034', kind: 'free', skill: 'hw.safety.electric', difficulty: 3,
      prompt: `Ein Kunde fragt, warum in seinem neuen Büro alle Steckdosenstromkreise über einen **RCD (FI-Schutzschalter) 30 mA** laufen. Erkläre ihm, **wie ein RCD arbeitet**, wovor er schützt und nenne **zwei Grenzen** des RCD.`,
      modelAnswer: 'Der RCD vergleicht ständig den Strom, der über den Außenleiter zum Gerät fließt, mit dem Strom, der über den Neutralleiter zurückfließt. Im Normalfall sind beide gleich. Fließt ein Teil über einen anderen Weg ab – zum Beispiel über einen Menschen oder den Schutzleiter zur Erde – entsteht eine Differenz. Überschreitet sie den Bemessungsfehlerstrom von 30 mA, schaltet der RCD in Bruchteilen einer Sekunde ab. Er dient damit als Zusatzschutz gegen gefährliche Körperströme und verringert die Brandgefahr durch Fehlerströme. Grenzen: Er schützt nicht vor Überlast und Kurzschluss (dafür ist der Leitungsschutzschalter da). Er schützt nicht, wenn jemand isoliert stehend Außenleiter und Neutralleiter gleichzeitig berührt, weil dann kein Differenzstrom entsteht. Er ersetzt weder Basis- noch Fehlerschutz und muss regelmäßig mit der Prüftaste getestet werden.',
      keywords: ['Differenz', 'Außenleiter', 'Neutralleiter', '30 mA', 'abschalten', 'Überlast', 'Kurzschluss', 'Zusatzschutz'],
      explanation: 'Kern: Differenzstrommessung zwischen hin- und rückfließendem Strom; Abschaltung über 30 mA; kein Schutz vor Überlast/Kurzschluss und nicht bei Berührung zwischen L und N.',
    },
    {
      id: 'h05-q035', kind: 'match', skill: 'hw.safety.electric', difficulty: 2,
      prompt: `Ordne die Maßnahmen der Schutzstufe nach DIN VDE 0100-410 zu.`,
      left: ['Isolierung der Leitungen und geschlossenes Gehäuse', 'Schutzleiter am Metallgehäuse und Abschaltung durch den Leitungsschutzschalter', 'RCD mit 30 mA vor den Steckdosen'],
      right: ['Basisschutz', 'Fehlerschutz', 'Zusatzschutz'],
      answer: [0, 1, 2],
      explanation: 'Basisschutz verhindert das Berühren aktiver Teile im Normalbetrieb. Fehlerschutz wirkt bei einem Defekt (Spannung am Gehäuse). Zusatzschutz greift, wenn beides versagt.',
    },
    {
      id: 'h05-q036', kind: 'free', skill: 'hw.safety.electric', difficulty: 2,
      prompt: `In einem Altbau gibt es im Lagerraum nur eine alte Steckdose **ohne Schutzkontakt**. Ein Kollege will den **Laserdrucker (Schutzklasse I)** mit einem Adapter vom Schuko-Stecker auf diese Steckdose anschließen. Bewerte das Vorhaben und schlage eine Lösung vor.`,
      modelAnswer: 'Das ist nicht zulässig. Ein Gerät der Schutzklasse I braucht den Schutzleiter: Bei einem Körperschluss leitet der Schutzleiter den Fehlerstrom ab und die Sicherung bzw. der RCD schaltet ab. Ohne Schutzkontakt fehlt dieser Fehlerschutz, das Metallgehäuse kann dann gefährliche Spannung führen. Lösung: Den Drucker an eine Schutzkontakt-Steckdose an einem anderen Ort anschließen oder eine Elektrofachkraft beauftragen, die Installation zu prüfen und eine Schutzkontakt-Steckdose (mit RCD) zu setzen. Als IT-Fachkraft (Laie) darf man die Steckdose nicht selbst tauschen.',
      keywords: ['Schutzklasse I', 'Schutzleiter', 'Fehlerschutz', 'nicht zulässig', 'Elektrofachkraft'],
      explanation: 'Schutzklasse I funktioniert nur mit Schutzleiter. Der Adapter hebelt den Fehlerschutz aus.',
    },
    {
      id: 'h05-q037', kind: 'single', skill: 'hw.safety.electric', difficulty: 2,
      prompt: `Ein Smartphone wird mit 5 V über USB-C geladen. Welche Schutzklasse hat **typischerweise das Steckernetzteil**, das in der 230-V-Steckdose steckt?`,
      options: ['Schutzklasse II', 'Schutzklasse III', 'Schutzklasse I', 'Schutzklasse 0'],
      answer: 0,
      distractors: {
        '1': { why: 'Schutzklasse III hat das **Smartphone**, das mit Kleinspannung arbeitet. Das Netzteil hängt am 230-V-Netz und ist schutzisoliert.', error: 'schutzklasse-netzteil-iii' },
        '2': { why: 'Das Netzteil hat keinen Schutzleiteranschluss (Eurostecker).', error: 'schutzklasse-netzteil-iii' },
        '3': { why: 'Schutzklasse 0 (nur Basisisolierung) ist in Deutschland nicht zulässig.' },
      },
      explanation: '**Schutzklasse II.** Das Netzteil ist doppelt isoliert (Symbol zwei Quadrate) und erzeugt die Schutzkleinspannung. Häufiger Fehler: Netzteil und Endgerät gleichsetzen.',
    },
    {
      id: 'h05-q047', kind: 'multi', skill: 'hw.safety.electric', difficulty: 1,
      prompt: `Wovon hängt ab, wie gefährlich ein Stromunfall für einen Menschen ist?`,
      options: ['Höhe des Körperstroms', 'Einwirkdauer', 'Weg des Stroms durch den Körper (z. B. über das Herz)', 'Feuchtigkeit der Haut und Standort (Körperwiderstand)', 'Farbe der Leitungsisolierung', 'Hersteller des Geräts'],
      answer: [0, 1, 2, 3],
      explanation: 'Entscheidend sind Stromstärke, Dauer, Stromweg und der Körperwiderstand (Haut, Feuchtigkeit, Standort). Farbe und Hersteller spielen keine Rolle.',
    },
    /* ----------------------- Arbeitssicherheit (l06) ----------------------- */
    {
      id: 'h05-q038', kind: 'order', skill: 'hw.safety.work', difficulty: 3,
      prompt: `Die Arbeiten an einer Unterverteilung sind fertig. Die Sicherheitsmaßnahmen werden **in umgekehrter Reihenfolge** wieder aufgehoben. Bringe die Schritte in die richtige Reihenfolge.`,
      items: ['Abdeckungen und Abschrankungen entfernen', 'Erdung und Kurzschließung aufheben', 'Sperre und Warnschild „Nicht einschalten“ entfernen', 'Wieder einschalten'],
      explanation: 'Umgekehrt zu den fünf Sicherheitsregeln: erst abdecken rückgängig machen, dann Erdung/Kurzschluss aufheben, dann die Sicherung gegen Wiedereinschalten entfernen, zuletzt einschalten. Vorher müssen alle Personen die Arbeitsstelle verlassen haben.',
    },
    {
      id: 'h05-q039', kind: 'multi', skill: 'hw.safety.work', difficulty: 2,
      prompt: `Du bist IT-Fachkraft ohne elektrotechnische Zusatzqualifikation (elektrotechnischer Laie). Was **darfst** du tun?`,
      options: ['Einen PC per Stecker an eine Steckdosenleiste anschließen', 'Vor der Benutzung Kabel, Stecker und Gehäuse auf Schäden ansehen', 'Ein defektes Gerät vom Netz trennen, kennzeichnen und melden', 'Eine Unterputz-Steckdose austauschen', 'Das Netzteil eines Servers öffnen und die Feinsicherung wechseln', 'Den Schutzkontakt eines Steckers abkleben, weil der RCD auslöst'],
      answer: [0, 1, 2],
      explanation: 'Laien dürfen Geräte bestimmungsgemäß benutzen, anschließen, sichtprüfen und Defekte melden. Arbeiten an der Installation und das Öffnen von Netzteilen sind Sache der Elektrofachkraft. Den Schutzleiter zu überbrücken ist lebensgefährlich.',
    },
    {
      id: 'h05-q040', kind: 'match', skill: 'hw.safety.work', difficulty: 1,
      prompt: `Ordne die Sicherheitszeichen ihrer Bedeutung zu.`,
      left: ['Gelbes Dreieck mit Blitz', 'Grünes Rechteck mit laufender Person und Tür', 'Rotes Quadrat mit Feuerlöscher', 'Blauer Kreis mit Stecker und Hinweis „Vor Arbeiten freischalten“', 'Roter Kreis mit Querbalken über einer Zigarette'],
      right: ['Warnung vor elektrischer Spannung', 'Notausgang / Rettungsweg', 'Standort eines Feuerlöschers', 'Gebot: vor Arbeiten freischalten', 'Verbot: Rauchen verboten'],
      answer: [0, 1, 2, 3, 4],
      explanation: 'Gelbes Dreieck = Warnung, grün = Rettung, rot eckig = Brandschutz, blau rund = Gebot, rot rund mit Balken = Verbot.',
    },
    {
      id: 'h05-q041', kind: 'single', skill: 'hw.safety.work', difficulty: 1,
      prompt: `An der Tür des Serverraums hängt ein **rundes, blaues** Schild mit weißem Symbol. Um welche Art von Sicherheitszeichen handelt es sich?`,
      options: ['Gebotszeichen', 'Warnzeichen', 'Verbotszeichen', 'Rettungszeichen'],
      answer: 0,
      distractors: {
        '1': { why: 'Warnzeichen sind gelbe Dreiecke mit schwarzem Rand.', error: 'zeichen-farbe' },
        '2': { why: 'Verbotszeichen sind rund mit rotem Rand und Querbalken.', error: 'zeichen-farbe' },
        '3': { why: 'Rettungszeichen sind grün und eckig.', error: 'zeichen-farbe' },
      },
      explanation: '**Gebotszeichen:** blau und rund – etwas **muss** getan werden, z. B. „Gehörschutz benutzen“ oder „Vor Arbeiten freischalten“.',
    },
    {
      id: 'h05-q042', kind: 'free', skill: 'hw.safety.work', difficulty: 3,
      prompt: `Im Serverraum soll eine Elektrofachkraft einen Unterverteiler erweitern. Die Server hängen an einer **USV** und haben zum Teil **zwei Netzteile (A/B-Versorgung)**. Was muss beim **Freischalten** zusätzlich beachtet werden, und was ist deine Aufgabe als IT-Fachkraft?`,
      modelAnswer: 'Die USV speist ihre Ausgänge aus dem Akku weiter, auch wenn die Zuleitung im Verteiler abgeschaltet ist. Hinter der USV liegt also weiter Spannung an. Bei der A/B-Versorgung kommt Spannung zusätzlich über den zweiten Strang. Die Elektrofachkraft muss deshalb alle Einspeisungen (Netz, USV-Ausgang, Bypass, zweiter Strang) freischalten, gegen Wiedereinschalten sichern und die Spannungsfreiheit allpolig feststellen. Meine Aufgabe als IT-Fachkraft: die Arbeiten mit der Elektrofachkraft abstimmen, eine Liste der Stromkreise und angeschlossenen Systeme liefern, ein Wartungsfenster planen, Nutzer informieren, Server gegebenenfalls kontrolliert herunterfahren oder auf den anderen Strang umlegen und nach den Arbeiten den Betrieb prüfen. Selbst an der Elektroinstallation arbeite ich nicht.',
      keywords: ['USV', 'weiter Spannung', 'A/B', 'alle Einspeisungen', 'Spannungsfreiheit', 'Wartungsfenster', 'herunterfahren', 'Elektrofachkraft'],
      explanation: 'Eine USV ist eine zweite Einspeisung. Wer nur den Verteiler abschaltet, hat die Anlage nicht freigeschaltet.',
    },
    {
      id: 'h05-q043', kind: 'text', skill: 'hw.safety.work', difficulty: 1,
      prompt: `Nach welcher **Unfallverhütungsvorschrift** werden ortsveränderliche elektrische Geräte wie PCs und Steckdosenleisten regelmäßig geprüft? (Kurzbezeichnung)`,
      accept: ['DGUV Vorschrift 3', 'DGUV V3', 'DGUV V 3', 'DGUV 3', 'DGUV-Vorschrift 3', 'BGV A3'],
      explanation: '**DGUV Vorschrift 3** „Elektrische Anlagen und Betriebsmittel“ (früher BGV A3). Geprüfte Geräte erhalten eine Prüfplakette.',
    },
    {
      id: 'h05-q044', kind: 'order', skill: 'hw.safety.work', difficulty: 1,
      prompt: `Im Druckerraum brennt ein Papierstapel neben einem Kopierer. Bringe die Schritte des Verhaltens im Brandfall in die richtige Reihenfolge.`,
      items: ['Brand melden (Notruf 112 oder Brandmelder)', 'In Sicherheit bringen (andere warnen, Fluchtweg nutzen, keinen Aufzug)', 'Löschversuch unternehmen, nur ohne Eigengefährdung'],
      explanation: 'Melden → in Sicherheit bringen → löschen. Menschenleben gehen vor Sachwerten.',
    },
    {
      id: 'h05-q045', kind: 'single', skill: 'hw.safety.work', difficulty: 2,
      prompt: `In einem Serverrack beginnt ein Netzteil zu brennen. Welcher Handfeuerlöscher eignet sich **am besten**?`,
      options: ['Kohlendioxid-Löscher (CO₂)', 'Wasserlöscher', 'Schaumlöscher', 'Pulverlöscher'],
      answer: 0,
      distractors: {
        '1': { why: 'Wasser leitet den Strom und zerstört die Elektronik.', error: 'loeschmittel-elektro' },
        '2': { why: 'Schaum enthält Wasser, ist leitfähig und hinterlässt Rückstände.', error: 'loeschmittel-elektro' },
        '3': { why: 'Pulver ist zwar an elektrischen Anlagen einsetzbar, verteilt sich aber überall und beschädigt die übrige Elektronik. CO₂ ist rückstandsfrei.', error: 'loeschmittel-elektro' },
      },
      explanation: '**CO₂-Löscher:** löscht durch Verdrängen des Sauerstoffs, leitet nicht und hinterlässt keine Rückstände. Achtung: In kleinen, geschlossenen Räumen besteht Erstickungsgefahr – nach dem Löschen den Raum verlassen und lüften.',
    },
    {
      id: 'h05-q046', kind: 'free', skill: 'hw.safety.work', difficulty: 2,
      prompt: `Bei einem Arbeitsplatzumzug bemerkst du, dass bei einer Steckdosenleiste die Isolierung des Kabels aufgescheuert ist und die inneren Adern sichtbar sind. Beschreibe, wie du als IT-Fachkraft vorgehst.`,
      modelAnswer: 'Die Leiste nicht mehr benutzen und das Kabel nicht anfassen. Ist sie noch eingesteckt, am Stecker (nicht am Kabel) ziehen oder den Stromkreis abschalten lassen; dabei die beschädigte Stelle nicht berühren. Danach die Leiste deutlich als defekt kennzeichnen („Defekt – nicht benutzen“), aus dem Verkehr ziehen und dem Vorgesetzten bzw. der zuständigen Elektrofachkraft melden. Nicht selbst mit Isolierband reparieren. Die angeschlossenen Geräte an eine geprüfte Leiste mit gültiger Prüfplakette anschließen. Zusätzlich prüfen, warum das Kabel beschädigt wurde (z. B. eingeklemmt unter dem Tisch), und die Kabelführung verbessern.',
      keywords: ['nicht benutzen', 'vom Netz trennen', 'kennzeichnen', 'melden', 'Elektrofachkraft', 'nicht selbst reparieren'],
      explanation: 'Laien trennen vom Netz, kennzeichnen, melden – reparieren darf nur die Elektrofachkraft.',
    },
  ],
};
