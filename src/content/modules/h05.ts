import type { Module } from '../types';

export const h05: Module = {
  id: 'h05',
  nr: 5,
  area: 'hardware',
  title: 'Ergonomie, Arbeitsschutz & Barrierefreiheit',
  short: `Bildschirmarbeitsplätze nach Arbeitsstättenverordnung (Anhang 6) einrichten: Sitzen, Monitor, Licht, Klima, Lärm – dazu Software-Ergonomie und barrierefreie IT.`,
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
  ],
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'h05-l01',
      title: 'Rechtsrahmen: Wer regelt den Bildschirmarbeitsplatz?',
      minutes: 15,
      relevance: 'ap1-teilweise',
      skills: ['hw.ergo.law'],
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
  ],
};
