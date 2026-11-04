import type { Module } from '../types';

export const s01: Module = {
  id: 's01',
  nr: 1,
  area: 'sicherheit',
  title: 'Grundlagen der IT-Sicherheit',
  short: 'Schutzziele, Bedrohung und Risiko, Social Engineering und Schadsoftware, BSI IT-Grundschutz und Schutzbedarfsfeststellung.',
  icon: 'ShieldCheck',
  relevance: 'ap1',
  prerequisites: [],
  generators: ['sich.risiko', 'sich.maximum', 'sich.schutzbedarf.beleg'],
  skills: [
    { id: 'sich.grundbegriffe', module: 's01', title: 'Informationssicherheit, IT-Sicherheit, Datensicherheit und Datenschutz abgrenzen' },
    { id: 'sich.schutzziele', module: 's01', title: 'Schutzziele (CIA, Authentizität, Verbindlichkeit) anwenden', requires: ['sich.grundbegriffe'] },
    { id: 'sich.risiko', module: 's01', title: 'Bedrohung, Schwachstelle und Risiko bewerten', requires: ['sich.schutzziele'] },
    { id: 'sich.angriffe', module: 's01', title: 'Social Engineering und Schadsoftware erkennen' },
    { id: 'sich.grundschutz', module: 's01', title: 'Vorgehen nach BSI IT-Grundschutz erklären', requires: ['sich.schutzziele'] },
    { id: 'sich.schutzbedarf', module: 's01', title: 'Schutzbedarf feststellen (Kategorien, Maximumprinzip, Kumulation, Verteilung)', requires: ['sich.schutzziele', 'sich.grundschutz'] },
    { id: 'sich.prozess', module: 's01', title: 'Sicherheitsprozess, Leitlinie, Rollen, Informationsverbund, Governance und Compliance', requires: ['sich.grundschutz'] },
    { id: 'sich.schutzbedarf.beleg', module: 's01', title: 'Schutzbedarfstabelle mit Begründung erstellen (Grenzwerte, Räume, Verbindungen, Clients, Datenträger)', requires: ['sich.schutzbedarf'] },
  ],
  lessons: [
    /* ---------------------------------------------------------------- */
    {
      id: 's01-l01',
      title: 'Grundbegriffe und Schutzziele',
      minutes: 20,
      relevance: 'ap1',
      skills: ['sich.grundbegriffe', 'sich.schutzziele'],
      simple: `Stell dir dein Tagebuch vor. Lesen soll es nur, wer darf (**Vertraulichkeit**). Niemand soll heimlich etwas hineinschreiben oder Seiten herausreißen (**Integrität** = vollständig und unverändert). Und es soll da sein, wenn du es brauchst (**Verfügbarkeit**).
Dazu kommen zwei Extras: Ein Brief stammt wirklich von deiner Freundin und ist nicht gefälscht (**Authentizität** = Echtheit), und wer etwas unterschrieben hat, kann es später nicht abstreiten (**Verbindlichkeit**).
Datenschutz schützt dabei die **Menschen** hinter den Daten, Datensicherheit schützt die **Daten** selbst.

**Merke:** Die drei Grundwerte sind Vertraulichkeit, Integrität und Verfügbarkeit – ordne jede Maßnahme genau zu (Backup = Verfügbarkeit, Verschlüsselung = Vertraulichkeit).`,
      steps: [
        {
          type: 'explain',
          title: 'Vier Begriffe, die oft verwechselt werden',
          body: `In Prüfungen und im Alltag werden vier Begriffe gern durcheinandergeworfen. Sie haben aber unterschiedliche Schwerpunkte:

| Begriff | Was wird geschützt? | Beispiel |
|---|---|---|
| **Informationssicherheit** | **alle Informationen** – egal ob digital, auf Papier oder im Kopf | Auch ein ausgedruckter Gehaltszettel auf dem Drucker gehört dazu. |
| **IT-Sicherheit** | Informationen, die mit **IT-Systemen** verarbeitet werden, und die Systeme selbst | Server, Clients, Netzwerk, Software |
| **Datensicherheit** | **Daten** gegen Verlust, Manipulation und unbefugten Zugriff – technisch-organisatorisch | Backups, Zugriffsrechte, Verschlüsselung |
| **Datenschutz** | die **Person** hinter personenbezogenen Daten – ihr Recht auf informationelle Selbstbestimmung | DSGVO: Darf die Firma die Privatadresse eines Kunden für Werbung nutzen? |

**Merksatz:** *Datenschutz schützt Menschen, Datensicherheit schützt Daten.* Datensicherheit ist ein **Werkzeug** des Datenschutzes: Die DSGVO verlangt in Art. 32 ausdrücklich „technische und organisatorische Maßnahmen“ – also Datensicherheit –, um personenbezogene Daten zu schützen. Umgekehrt gilt Datensicherheit auch für Daten **ohne** Personenbezug (z. B. Konstruktionszeichnungen).

Informationssicherheit ist der **weiteste** Begriff. Das BSI spricht deshalb inzwischen meist von Informationssicherheit statt nur von IT-Sicherheit.`,
        },
        {
          type: 'explain',
          title: 'Die Schutzziele – was heißt eigentlich „sicher“?',
          body: `„Sicher“ ist zu ungenau. Man beschreibt Sicherheit deshalb über **Schutzziele** (das BSI sagt auch **Grundwerte**). Die drei klassischen kennst du vielleicht schon aus dem Modul Netzwerksicherheit – hier geht es um ihre Anwendung am Arbeitsplatz und im Betrieb:

| Schutzziel | Frage | Bedrohung | Typische Maßnahmen |
|---|---|---|---|
| **Vertraulichkeit** | Können nur **Berechtigte** die Information lesen? | Mitlesen, Diebstahl eines Notebooks, falscher E-Mail-Empfänger | Zugriffsrechte, Verschlüsselung (BitLocker, TLS), Clean Desk |
| **Integrität** | Ist die Information **vollständig und unverändert** – bzw. wird eine Änderung **erkannt**? | Manipulation, Übertragungsfehler, versehentliches Überschreiben | Rechtevergabe (nur Lesen), Hashwerte, Signaturen, Protokollierung, Versionierung |
| **Verfügbarkeit** | Sind Systeme und Daten **nutzbar, wenn sie gebraucht werden**? | Hardwareausfall, Ransomware, Stromausfall, DDoS | Backups, Redundanz, USV, Wartungsverträge, Notfallplan |

**Erweiterte Schutzziele:**

| Schutzziel | Bedeutung | Beispiel / Maßnahme |
|---|---|---|
| **Authentizität** | Echtheit: Ein Kommunikationspartner oder eine Information ist **wirklich** der/die, für den sie sich ausgibt. | Anmeldung mit MFA, Zertifikate, Rückruf bei ungewöhnlichen Zahlungsanweisungen |
| **Verbindlichkeit** (Nichtabstreitbarkeit) | Eine Handlung kann dem Urheber **nachgewiesen** werden – er kann sie später **nicht abstreiten**. | qualifizierte elektronische Signatur, revisionssichere Protokolle |
| **Zurechenbarkeit** | Eine Aktion lässt sich eindeutig einer Person zuordnen. | persönliche Konten statt Sammelkonto „buchhaltung“ |

**Authentizität – eigenes Schutzziel oder Teil der Integrität?** In vielen Lehrbüchern und Prüfungsaufgaben steht die Authentizität als **eigenes** Schutzziel. Das BSI zählt dagegen auch verfälschte Angaben zum Urheber einer Information zum **Integritätsverlust** – deshalb ordnen manche Bücher die Authentizität der **Integrität** zu. Beides ist vertretbar. So gehst du in der Prüfung vor:
- Fragt die Aufgabe nach den **drei Grundwerten**, nennst du Vertraulichkeit, Integrität und Verfügbarkeit.
- Geht es in einem Fall um die **Echtheit** eines Absenders oder einer Datei (falscher Anrufer, gefälschte Mail, manipulierter Download), nennst du **Authentizität** – gern mit dem Zusatz „(nach BSI ein Teilaspekt der Integrität)“.

**Wichtig für die Prüfung:** Ordne Maßnahmen **genau** zu. Ein Backup verbessert die **Verfügbarkeit**, aber nicht die Vertraulichkeit – im Gegenteil: Eine unverschlüsselte Sicherungskopie ist ein zusätzliches Risiko für die Vertraulichkeit! Verschlüsselung schützt die Vertraulichkeit, aber ein verlorener Schlüssel gefährdet die Verfügbarkeit.`,
        },
        {
          type: 'visual',
          title: 'Schutzziele am Arbeitsplatz',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Vertraulichkeit', text: 'Nur Berechtigte lesen: Rechte, Verschlüsselung, Bildschirmsperre, Clean Desk.', icon: 'Lock' },
                { title: 'Integrität', text: 'Unverändert oder Änderung erkennbar: Schreibrechte begrenzen, Hash, Signatur, Versionierung.', icon: 'FileCheck' },
                { title: 'Verfügbarkeit', text: 'Nutzbar, wenn gebraucht: Backup, Redundanz, USV, Wartung, Notfallplan.', icon: 'Activity' },
                { title: 'Authentizität', text: 'Echtheit von Personen und Daten: MFA, Zertifikate, Rückrufprinzip.', icon: 'BadgeCheck' },
                { title: 'Verbindlichkeit', text: 'Nicht abstreitbar: Signatur, revisionssichere Protokolle.', icon: 'Stamp' },
                { title: 'Zurechenbarkeit', text: 'Wer war es? Persönliche Konten, keine Sammelpasswörter.', icon: 'UserCheck' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Vorfälle in der Elektro Krämer GmbH einordnen',
          problem: `Ordne jedem Vorfall das **hauptsächlich verletzte** Schutzziel zu und nenne eine passende Maßnahme:
1. Die Personalakte eines Mitarbeiters liegt offen auf dem Multifunktionsdrucker im Flur.
2. Ein Azubi ändert versehentlich in der Preisliste (Excel auf dem Fileserver) alle Preise um eine Spalte verschoben.
3. Die Festplatte des einzigen Buchhaltungs-PCs fällt aus, ein Backup existiert nicht.
4. Ein Kunde bestreitet, eine Bestellung per Webshop aufgegeben zu haben – es gibt keinen Nachweis.`,
          steps: [
            { label: 'Fall 1', body: 'Unbefugte können Daten lesen → **Vertraulichkeit**. Maßnahme: Druck erst nach PIN/Karte am Gerät freigeben („Follow-me-Printing“), Clean-Desk-Regel.' },
            { label: 'Fall 2', body: 'Daten wurden (unbeabsichtigt) verfälscht → **Integrität**. Maßnahme: Schreibrechte nur für Vertrieb, Versionierung/Schattenkopien, Vier-Augen-Prinzip bei Preisänderungen.' },
            { label: 'Fall 3', body: 'Daten und System nicht nutzbar → **Verfügbarkeit**. Maßnahme: regelmäßiges Backup, Daten zentral auf dem Server statt lokal.' },
            { label: 'Fall 4', body: 'Handlung kann nicht nachgewiesen werden → **Verbindlichkeit**. Maßnahme: Kundenkonto mit Anmeldung, Bestellbestätigung per Mail, Protokollierung (Logs).' },
          ],
          result: '1 Vertraulichkeit · 2 Integrität · 3 Verfügbarkeit · 4 Verbindlichkeit – jeweils mit einer passenden technischen oder organisatorischen Maßnahme.',
        },
        {
          type: 'check',
          question: {
            id: 's01-c01', kind: 'single', skill: 'sich.grundbegriffe', difficulty: 1,
            prompt: 'Welche Aussage beschreibt den Unterschied zwischen **Datenschutz** und **Datensicherheit** richtig?',
            options: [
              'Datenschutz schützt die Persönlichkeitsrechte von Menschen; Datensicherheit schützt Daten technisch und organisatorisch vor Verlust, Manipulation und unbefugtem Zugriff.',
              'Beide Begriffe bedeuten dasselbe.',
              'Datenschutz betrifft nur Papierakten, Datensicherheit nur digitale Daten.',
              'Datensicherheit ist ein Teil des Datenschutzes und gilt nur für personenbezogene Daten.',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'Datenschutz schützt Menschen (Persönlichkeitsrecht), Datensicherheit schützt Daten – auch solche ohne Personenbezug.', error: 'datenschutz-datensicherheit' },
              '2': { why: 'Die DSGVO gilt auch für digitale Daten; Datensicherheit betrifft jede Form von Daten.', error: 'datenschutz-datensicherheit' },
              '3': { why: 'Datensicherheit gilt auch für Daten ohne Personenbezug, z. B. Konstruktionspläne. Sie ist ein Werkzeug des Datenschutzes, aber nicht auf ihn beschränkt.', error: 'datenschutz-datensicherheit' },
            },
            explanation: 'Merksatz: Datenschutz schützt Menschen, Datensicherheit schützt Daten. Art. 32 DSGVO verlangt Datensicherheit (TOM) als Mittel zum Datenschutz.',
          },
        },
        {
          type: 'check',
          question: {
            id: 's01-c02', kind: 'text', skill: 'sich.schutzziele', difficulty: 2,
            prompt: 'Ein Lieferant behauptet, eine digital signierte Auftragsbestätigung nie verschickt zu haben. Die Signatur beweist das Gegenteil. Welches **Schutzziel** wird durch die Signatur hier vor allem gewährleistet? (ein Begriff)',
            accept: ['Verbindlichkeit', 'Nichtabstreitbarkeit', 'Nicht-Abstreitbarkeit', 'Non-Repudiation'],
            hints: ['Es geht darum, dass jemand eine Handlung später nicht leugnen kann.'],
            misconceptions: [{ answer: 'Integrität', error: 'schutzziel-verwechselt', why: 'Die Signatur schützt zwar auch die Integrität – hier geht es aber darum, dass der Absender die Handlung **nicht abstreiten** kann: Verbindlichkeit.' }, { answer: 'Authentizität', error: 'schutzziel-verwechselt', why: 'Authentizität = Echtheit des Absenders. Der Kern der Situation ist aber das **Abstreiten** – also Verbindlichkeit.' }],
            explanation: '**Verbindlichkeit (Nichtabstreitbarkeit):** Eine digitale Signatur kann nur mit dem privaten Schlüssel des Absenders erzeugt werden – er kann die Handlung später nicht abstreiten.',
          },
        },
        { type: 'practice', title: 'Übung: Begriffe und Schutzziele', questionIds: ['s01-q001', 's01-q002', 's01-q003', 's01-q004', 's01-q005', 's01-q006', 's01-q051'], count: 4, difficulty: 1 },
        {
          type: 'summary',
          points: [
            'Informationssicherheit (alle Informationen) ⊃ IT-Sicherheit (IT-Systeme) – Datensicherheit schützt Daten, Datenschutz schützt Menschen.',
            'Grundwerte: Vertraulichkeit, Integrität, Verfügbarkeit (CIA).',
            'Erweitert: Authentizität (Echtheit), Verbindlichkeit (nicht abstreitbar), Zurechenbarkeit. Manche Bücher ordnen die Authentizität (wie das BSI) der Integrität zu – beides ist vertretbar.',
            'Maßnahmen immer dem richtigen Schutzziel zuordnen – Backup = Verfügbarkeit, Verschlüsselung = Vertraulichkeit.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's01-l02',
      title: 'Bedrohung, Schwachstelle, Risiko',
      minutes: 25,
      relevance: 'ap1',
      skills: ['sich.risiko'],
      simple: `Eine **Bedrohung** ist wie Regen: Er kann Schaden anrichten. Die **Schwachstelle** ist das Loch im Dach. Erst beides zusammen ergibt eine **Gefährdung** – es tropft auf deinen Laptop.
Das **Risiko** sagt, wie schlimm das im Durchschnitt ist: wie oft es passiert mal wie teuer es dann wird.
Danach entscheidest du: Dach flicken (**reduzieren**), den Laptop woanders hinstellen (**vermeiden**), eine Versicherung abschließen (**übertragen**) oder mit dem Rest leben (**akzeptieren**).

**Merke:** Risiko = Eintrittswahrscheinlichkeit × Schadenshöhe – und ein Risiko akzeptieren darf nur die Geschäftsführung.`,
      steps: [
        {
          type: 'explain',
          title: 'Von der Bedrohung zum Risiko',
          body: `Im Sicherheitsmanagement unterscheidet man (angelehnt an das BSI-Glossar):

| Begriff | Bedeutung | Beispiel |
|---|---|---|
| **Bedrohung** | ein Umstand oder Ereignis, der/das **Schaden verursachen kann** – ganz allgemein | Schadsoftware, Feuer, Diebstahl, Fehlbedienung |
| **Schwachstelle** | ein **sicherheitsrelevanter Fehler** bzw. eine Lücke in einem System, einem Prozess oder bei Menschen | ungepatchtes Windows, schwaches Passwort, Serverraum ohne Schloss |
| **Gefährdung** | eine Bedrohung, die **konkret über eine Schwachstelle** auf ein Objekt einwirkt | Ransomware trifft auf einen Server ohne aktuelle Updates |
| **Risiko** | Kombination aus **Eintrittswahrscheinlichkeit** (Häufigkeit) und **Schadenshöhe** (Auswirkung) | „ca. einmal in 4 Jahren, Schaden 20.000 €“ |

Ohne Schwachstelle keine Gefährdung: Ein Erdbeben ist in Hamburg zwar eine Bedrohung, aber kaum eine relevante Gefährdung. Ransomware ist eine Bedrohung – erst eine Schwachstelle (fehlende Updates, Makros erlaubt, keine Offline-Sicherung) macht daraus eine echte Gefährdung.

Das BSI fasst im IT-Grundschutz-Kompendium typische Gefahren als **elementare Gefährdungen** zusammen (z. B. *G 0.1 Feuer*, Wasser, Diebstahl, Schadprogramme, Social Engineering, Fehlplanung).

**Risiko quantitativ berechnen:**

> **Risiko = Eintrittswahrscheinlichkeit × Schadenshöhe**

Ergebnis ist ein **Erwartungswert** (z. B. „€ pro Jahr“). Beispiel: Wahrscheinlichkeit 25 % pro Jahr, Schaden 20.000 € → 0,25 × 20.000 € = **5.000 € pro Jahr**. Das hilft beim Vergleich von Risiken und bei der Frage, wie viel eine Schutzmaßnahme kosten darf.`,
        },
        {
          type: 'explain',
          title: 'Qualitative Risikomatrix und Risikobehandlung',
          body: `Oft kennt man keine genauen Prozentwerte. Dann arbeitet man **qualitativ** mit Stufen – so auch der BSI-Standard 200-3 (Risikoanalyse auf der Basis von IT-Grundschutz) mit vier Stufen je Achse:

| Häufigkeit ↓ / Auswirkung → | vernachlässigbar | begrenzt | beträchtlich | existenzbedrohend |
|---|---|---|---|---|
| **sehr häufig** | gering | mittel | hoch | sehr hoch |
| **häufig** | gering | mittel | hoch | sehr hoch |
| **mittel** | gering | gering | mittel | hoch |
| **selten** | gering | gering | mittel | hoch |

*(Beispielhafte Zuordnung – jede Organisation legt die Grenzen ihrer Matrix selbst fest.)*

Alternativ vergibt man Punkte (z. B. 1–4) und multipliziert: Wahrscheinlichkeit 3 × Schaden 4 = **12 Risikopunkte**.

**Was macht man mit einem Risiko?** Vier Strategien der **Risikobehandlung**:

| Strategie | Bedeutung | Beispiel |
|---|---|---|
| **Vermeiden** | die riskante Tätigkeit ganz unterlassen | Kein Fernzugriff auf die Personaldaten von privaten PCs |
| **Reduzieren** (vermindern) | Maßnahmen senken Wahrscheinlichkeit oder Schaden | Patchmanagement, Offline-Backup, MFA |
| **Übertragen** (transferieren) | finanzielle Folgen auf Dritte verlagern | Cyberversicherung, Wartungsvertrag mit Vor-Ort-Service |
| **Akzeptieren** (tragen) | Restrisiko bewusst in Kauf nehmen | Ausfall des Gästedruckers für einen Tag |

**Wichtig:** Ein Risiko **akzeptieren** darf nur die **Leitung** (Geschäftsführung) – bewusst, begründet und **dokumentiert**. Und auch ein übertragenes Risiko bleibt in der Verantwortung des Unternehmens: Die Versicherung zahlt Geld, stellt aber keine Daten wieder her.`,
        },
        {
          type: 'visual',
          title: 'Ablauf des Risikomanagements',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: '1. Identifizieren', text: 'Welche Bedrohungen und Schwachstellen gibt es für welche Werte?', icon: 'Search' },
                { title: '2. Bewerten', text: 'Eintrittswahrscheinlichkeit × Schadenshöhe → Risiko, Rangfolge bilden.', icon: 'Calculator' },
                { title: '3. Behandeln', text: 'Vermeiden, reduzieren, übertragen oder akzeptieren.', icon: 'Wrench' },
                { title: '4. Überwachen', text: 'Wirksamkeit prüfen, neu bewerten – ein Kreislauf.', icon: 'RefreshCw' },
              ],
            },
          },
        },
        {
          type: 'example',
          title: 'Drei Risiken vergleichen',
          problem: `Die Elektro Krämer GmbH bewertet drei Bedrohungen für den Standort Berlin:

| Bedrohung | Wahrscheinlichkeit pro Jahr | Schaden je Eintritt |
|---|---|---|
| Diebstahl eines Außendienst-Notebooks | 50 % | 4.000 € |
| Ransomware-Befall | 10 % | 80.000 € |
| Wasserschaden im Serverraum | 2 % | 120.000 € |

Berechne die Risiken, bilde eine Rangfolge und beurteile: Lohnt sich eine Offline-Backup-Lösung für 3.000 € pro Jahr, die den Ransomware-Schaden auf 20.000 € senkt?`,
          steps: [
            { label: 'Notebook', body: '0,5 × 4.000 € = **2.000 €/Jahr**' },
            { label: 'Ransomware', body: '0,10 × 80.000 € = **8.000 €/Jahr**' },
            { label: 'Wasserschaden', body: '0,02 × 120.000 € = **2.400 €/Jahr**' },
            { label: 'Rangfolge', body: '1. Ransomware (8.000 €) · 2. Wasserschaden (2.400 €) · 3. Notebook (2.000 €). Das seltene Ereignis Wasserschaden liegt vor dem häufigen Notebookdiebstahl!' },
            { label: 'Maßnahme bewerten', body: 'Neues Risiko Ransomware: 0,10 × 20.000 € = 2.000 €/Jahr → Reduktion um 6.000 €/Jahr. Kosten 3.000 €/Jahr → Nutzen übersteigt Kosten um **3.000 €/Jahr**. Die Maßnahme lohnt sich (und verbessert zusätzlich die Verfügbarkeit bei anderen Ausfällen).' },
          ],
          result: 'Ransomware hat mit 8.000 €/Jahr das höchste Risiko; die Backup-Lösung senkt es um 6.000 €/Jahr bei 3.000 € Kosten – wirtschaftlich sinnvoll.',
        },
        {
          type: 'check',
          question: {
            id: 's01-c03', kind: 'number', skill: 'sich.risiko', difficulty: 1,
            prompt: 'Ein Serverausfall tritt erfahrungsgemäß mit einer Wahrscheinlichkeit von **20 % pro Jahr** ein und verursacht jeweils **15.000 €** Schaden. Wie hoch ist das Risiko in **€ pro Jahr**?',
            answer: 3000, unit: '€',
            hints: ['20 % = 0,2'],
            misconceptions: [{ answer: '300000', error: 'risiko-prozent', why: 'Prozent zuerst durch 100 teilen: 20 % = 0,2.' }],
            explanation: '0,2 × 15.000 € = **3.000 € pro Jahr**.',
          },
        },
        {
          type: 'check',
          question: {
            id: 's01-c04', kind: 'match', skill: 'sich.risiko', difficulty: 2,
            prompt: 'Ordne jeder Maßnahme die passende Strategie der Risikobehandlung zu.',
            left: ['Abschluss einer Cyberversicherung', 'Einführung von MFA für alle Konten', 'Webshop-Zahlungsart „Rechnung“ wird abgeschafft, weil Betrugsfälle zu hoch sind', 'Geschäftsführung entscheidet dokumentiert, den Ausfall des Gäste-WLANs hinzunehmen'],
            right: ['Risiko übertragen', 'Risiko reduzieren', 'Risiko vermeiden', 'Risiko akzeptieren'],
            answer: [0, 1, 2, 3],
            explanation: 'Versicherung = übertragen; MFA senkt die Wahrscheinlichkeit = reduzieren; riskante Tätigkeit unterlassen = vermeiden; bewusst tragen = akzeptieren.',
          },
        },
        { type: 'practice', title: 'Übung: Risiken berechnen und priorisieren', generator: 'sich.risiko', count: 3, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Bedrohung (allgemein) + Schwachstelle (Lücke) → Gefährdung (konkret).',
            'Risiko = Eintrittswahrscheinlichkeit × Schadenshöhe (Erwartungswert, z. B. €/Jahr).',
            'Qualitativ: Stufen bzw. Punkte in einer Risikomatrix.',
            'Behandlung: vermeiden, reduzieren, übertragen, akzeptieren – akzeptieren nur durch die Leitung und dokumentiert.',
            'Eine Maßnahme lohnt sich, wenn die Risikoreduktion größer ist als ihre Kosten.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's01-l03',
      title: 'Social Engineering und Schadsoftware',
      minutes: 25,
      relevance: 'ap1',
      skills: ['sich.angriffe'],
      simple: `Angreifer knacken oft nicht die Technik, sondern den Menschen – wie ein Trickbetrüger am Telefon, der sich als Enkel ausgibt. Das nennt man **Social Engineering** (Menschen gezielt manipulieren).
Die Tricks sind immer ähnlich: Zeitdruck („sofort!“), Autorität („Hier spricht der Chef“), Hilfsbereitschaft oder Neugier.
**Schadsoftware** (Malware) ist der digitale Einbrecher: Ein Virus braucht eine Wirtsdatei, ein Wurm verbreitet sich allein über das Netz, ein Trojaner tarnt sich als nützliches Programm, Ransomware verschlüsselt Daten und fordert Lösegeld.

**Merke:** Bei Druck, ungewöhnlichen Bitten oder seltsamen Links: nicht klicken, über einen bekannten Weg nachfragen und der IT melden.`,
      steps: [
        {
          type: 'explain',
          title: 'Der Mensch als Angriffsziel',
          body: `**Social Engineering** heißt: Ein Angreifer manipuliert Menschen, damit sie Informationen preisgeben, Zugang gewähren oder etwas ausführen – statt Technik zu „hacken“. Er nutzt dabei menschliche Eigenschaften aus:

| Hebel | So klingt es |
|---|---|
| **Autorität** | „Hier spricht der Geschäftsführer …“, „IT-Abteilung, wir brauchen sofort …“ |
| **Zeitdruck / Angst** | „Ihr Konto wird in 24 Stunden gesperrt!“ |
| **Hilfsbereitschaft** | „Ich bin neu und komme nicht ins System, können Sie mir kurz Ihren Zugang …?“ |
| **Neugier / Gier** | „Gehaltsliste 2026.xlsx“, „Sie haben gewonnen!“ |
| **Vertrauen** | gefälschte Mail eines bekannten Lieferanten |

**Typische Methoden:**

| Methode | Beschreibung |
|---|---|
| **Phishing** | massenhaft versandte gefälschte Mails/Webseiten, um Zugangsdaten abzugreifen oder Schadsoftware zu verteilen |
| **Spear-Phishing** | gezieltes Phishing auf bestimmte Personen mit recherchierten Details |
| **CEO-Fraud** (Fake President) | angeblicher Chef fordert dringende, vertrauliche Überweisung |
| **Vishing / Smishing / Quishing** | Phishing per Telefon (Voice) / SMS / QR-Code |
| **Pretexting** | Angreifer erfindet eine glaubwürdige Rolle (Techniker, Prüfer, Lieferant) |
| **Baiting** | Köder, z. B. präparierter USB-Stick auf dem Parkplatz |
| **Tailgating / Piggybacking** | Unbefugter folgt einer berechtigten Person durch die gesicherte Tür |
| **Shoulder Surfing** | Mitlesen von Passwörtern/Bildschirminhalten über die Schulter |
| **Dumpster Diving** | Durchsuchen des Papiermülls nach Informationen |

**Gegenmaßnahmen** sind vor allem organisatorisch: **Sensibilisierung (Awareness-Schulungen)**, klare Regeln („Die IT fragt **nie** nach deinem Passwort“), **Rückrufprinzip** über bekannte Nummern bei Zahlungsanweisungen, **Vier-Augen-Prinzip**, Besucherregelung, Aktenvernichter – technisch unterstützt durch MFA, Mailfilter und gesperrte USB-Ports.`,
        },
        {
          type: 'explain',
          title: 'Arten von Schadsoftware (Malware)',
          body: `| Art | Merkmal | Verbreitung / Wirkung |
|---|---|---|
| **Virus** | hängt sich an eine **Wirtsdatei** oder ein Dokument (z. B. Makro) | verbreitet sich, wenn der Benutzer die infizierte Datei **ausführt/weitergibt** |
| **Wurm** | **eigenständiges** Programm | verbreitet sich **selbstständig über das Netzwerk** (z. B. über Sicherheitslücken) – ohne Zutun des Benutzers |
| **Trojaner** (Trojanisches Pferd) | tarnt sich als **nützliches Programm** | enthält versteckte Schadfunktion, z. B. eine **Backdoor** für Fernzugriff |
| **Ransomware** | **verschlüsselt** Daten und fordert **Lösegeld** | oft zusätzlich Datendiebstahl und Erpressung mit Veröffentlichung |
| **Spyware / Keylogger** | späht Daten aus bzw. zeichnet **Tastatureingaben** auf | Diebstahl von Passwörtern, Bankdaten |
| **Rootkit** | versteckt sich tief im System (Kernel), verschleiert andere Malware | schwer zu entdecken, oft Neuinstallation nötig |
| **Bot / Botnetz** | ferngesteuerter Rechner bzw. Netz vieler solcher Rechner | DDoS-Angriffe, Spam-Versand |
| **Adware / Scareware** | aufdringliche Werbung bzw. gefälschte Warnmeldungen („Ihr PC ist infiziert!“) | soll zu Käufen/Installationen verleiten |

**Infektionswege:** Mailanhänge (Office-Makros, Archive, Verknüpfungsdateien), präparierte Webseiten (*Drive-by-Download*), USB-Sticks, ungepatchte Sicherheitslücken (*Exploits*, bei unbekannten Lücken *Zero-Day-Exploits*), Raubkopien.

**Schutz** (Details im Modul „Sicherheit am Arbeitsplatz“): Updates, Virenschutz/EDR, Makros aus dem Internet blockieren, keine Administratorrechte im Alltag, Mailfilter (Anti-Spam), Backups – und Schulung.`,
        },
        {
          type: 'example',
          title: 'Beleg: Eine verdächtige Mail analysieren',
          problem: `Frau Yilmaz aus der Buchhaltung leitet dir diese Mail weiter:

> **Von:** Elektro Krämer IT-Service <it-service@kraemer-elektro-support.com>
> **Betreff:** DRINGEND: Ihr Postfach wird heute gesperrt
>
> Sehr geehrter Nutzer,
> Ihr Postfach hat das Speicherlimit überschritten. Bestätigen Sie innerhalb von 2 Stunden Ihr Kennwort, sonst werden alle E-Mails gelöscht:
> [Jetzt Konto bestätigen] → http://kraemer-login.web-verify.xyz/owa
>
> Ihr IT-Team

Nenne die Merkmale, an denen du Phishing erkennst, und was Frau Yilmaz tun soll.`,
          steps: [
            { label: 'Absender', body: 'Fremde Domain **kraemer-elektro-support.com** statt der echten Firmendomain – nur ähnlich klingend.' },
            { label: 'Anrede', body: 'Unpersönlich: „Sehr geehrter Nutzer“ – die eigene IT kennt den Namen.' },
            { label: 'Druck', body: '„DRINGEND“, „innerhalb von 2 Stunden“, Drohung mit Löschung → Zeitdruck/Angst.' },
            { label: 'Link', body: 'Ziel-URL **web-verify.xyz** hat nichts mit der Firma zu tun, zudem unverschlüsselt (http). Beim Überfahren mit der Maus prüfen, nicht klicken.' },
            { label: 'Aufforderung', body: 'Kennwort „bestätigen“ – die IT fragt niemals nach Passwörtern.' },
            { label: 'Richtiges Verhalten', body: 'Nicht klicken, nichts eingeben, Mail über den „Phishing melden“-Knopf bzw. an die IT melden, danach löschen. Falls schon Daten eingegeben: **sofort** Passwort ändern und IT informieren.' },
          ],
          result: 'Fremde Absenderdomain, unpersönliche Anrede, Zeitdruck, verdächtiger Link und Passwortabfrage → Phishing. Melden statt klicken.',
        },
        {
          type: 'check',
          question: {
            id: 's01-c05', kind: 'single', skill: 'sich.angriffe', difficulty: 1,
            prompt: 'Welche Schadsoftware verbreitet sich **selbstständig über das Netzwerk**, ohne dass ein Benutzer eine Datei öffnen muss?',
            options: ['Wurm', 'Virus', 'Trojaner', 'Adware'],
            answer: 0,
            distractors: {
              '1': { why: 'Ein Virus braucht eine Wirtsdatei und wird erst aktiv, wenn diese ausgeführt wird.', error: 'malware-verwechselt' },
              '2': { why: 'Ein Trojaner tarnt sich als nützliches Programm und muss vom Benutzer installiert werden.', error: 'malware-verwechselt' },
              '3': { why: 'Adware blendet Werbung ein und verbreitet sich nicht selbstständig.', error: 'malware-verwechselt' },
            },
            explanation: 'Würmer sind eigenständige Programme, die Sicherheitslücken ausnutzen, um sich von Rechner zu Rechner zu kopieren (Beispiel: WannaCry 2017 über SMBv1).',
          },
        },
        {
          type: 'check',
          question: {
            id: 's01-c06', kind: 'text', skill: 'sich.angriffe', difficulty: 1,
            prompt: 'Eine unbekannte Person mit Paketkarton folgt einem Mitarbeiter durch die per Chipkarte gesicherte Tür ins Lager. Wie heißt diese Social-Engineering-Methode? (englischer Fachbegriff)',
            accept: ['Tailgating', 'Piggybacking', 'Tail-gating', 'Piggy-backing'],
            hints: ['„Jemandem am Heck kleben“.'],
            explanation: '**Tailgating** (auch Piggybacking): Ausnutzen von Höflichkeit, um ohne eigene Berechtigung einen gesicherten Bereich zu betreten. Gegenmaßnahme: Vereinzelungsanlagen, Schulung („Tür hinter sich schließen, Unbekannte ansprechen“), Besucherausweise.',
          },
        },
        { type: 'practice', title: 'Übung: Angriffe erkennen', questionIds: ['s01-q013', 's01-q014', 's01-q015', 's01-q016', 's01-q017', 's01-q018', 's01-q019', 's01-q020'], count: 5, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Social Engineering nutzt Autorität, Zeitdruck, Hilfsbereitschaft, Neugier und Vertrauen aus.',
            'Methoden: Phishing (Spear, CEO-Fraud, Vishing, Smishing, Quishing), Pretexting, Baiting, Tailgating, Shoulder Surfing, Dumpster Diving.',
            'Virus = Wirtsdatei; Wurm = verbreitet sich selbst übers Netz; Trojaner = getarnt; Ransomware = verschlüsselt und erpresst.',
            'Gegenmaßnahmen: Awareness, Rückrufprinzip, Vier-Augen-Prinzip, MFA, Updates, Mailfilter, keine Adminrechte im Alltag.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's01-l04',
      title: 'BSI IT-Grundschutz: systematisch absichern',
      minutes: 25,
      relevance: 'ap1-teilweise',
      skills: ['sich.grundschutz', 'sich.prozess'],
      simple: `Informationssicherheit im Betrieb ist wie Brandschutz in einem Gebäude: Die Chefin muss ihn wollen und bezahlen, eine beauftragte Person plant ihn, und alle halten sich an die Regeln.
Das BSI (Bundesamt für Sicherheit in der Informationstechnik) liefert dafür ein kostenloses „Rezeptbuch“: den **IT-Grundschutz**.
Zuerst schreibt die Leitung in einer **Leitlinie** auf, warum Sicherheit wichtig ist und wer zuständig ist. Dann wird erfasst, was es überhaupt gibt (**Strukturanalyse**), wie schützenswert es ist (**Schutzbedarf**) und welche Maßnahmen noch fehlen.

**Merke:** Die Gesamtverantwortung trägt immer die Leitung – der Informationssicherheitsbeauftragte berät und koordiniert.`,
      steps: [
        {
          type: 'explain',
          title: 'Was ist der IT-Grundschutz?',
          body: `Das **Bundesamt für Sicherheit in der Informationstechnik (BSI)** stellt mit dem **IT-Grundschutz** eine kostenlose, bewährte Methode bereit, um Informationssicherheit **systematisch** aufzubauen. Er besteht aus zwei Teilen:

**1. Die BSI-Standards (das „Wie“):**

| Standard | Inhalt |
|---|---|
| **BSI-Standard 200-1** | Managementsysteme für Informationssicherheit (**ISMS**) – Aufbau, Verantwortlichkeiten, Leitlinie |
| **BSI-Standard 200-2** | **IT-Grundschutz-Methodik** – das Vorgehen: Strukturanalyse, Schutzbedarf, Modellierung, Check |
| **BSI-Standard 200-3** | **Risikoanalyse** auf der Basis von IT-Grundschutz – für hohen Schutzbedarf |
| **BSI-Standard 200-4** | **Business Continuity Management** (Notfallmanagement) |

**2. Das IT-Grundschutz-Kompendium (das „Was“):** Es enthält **Bausteine** für typische Themen, jeweils mit Gefährdungslage und **Anforderungen**. Die Bausteine sind in Schichten gegliedert:

| Prozess-Bausteine | System-Bausteine |
|---|---|
| **ISMS** – Sicherheitsmanagement | **APP** – Anwendungen (z. B. Office, Webbrowser) |
| **ORP** – Organisation und Personal (z. B. ORP.4 Identitäts- und Berechtigungsmanagement) | **SYS** – IT-Systeme (z. B. SYS.2.1 Allgemeiner Client) |
| **CON** – Konzepte und Vorgehensweisen (z. B. CON.3 Datensicherungskonzept) | **IND** – Industrielle IT |
| **OPS** – Betrieb (z. B. OPS.1.1.4 Schutz vor Schadprogrammen) | **NET** – Netze und Kommunikation |
| **DER** – Detektion und Reaktion (z. B. Behandlung von Sicherheitsvorfällen) | **INF** – Infrastruktur (z. B. Serverraum, Büroarbeitsplatz) |

**Anforderungen** sind mit Modalverben formuliert: **MUSS / DARF NICHT** (verbindlich), **SOLLTE / SOLLTE NICHT** (grundsätzlich umzusetzen, Abweichung nur begründet), **KANN** (optional). Sie sind gestuft in **Basis-Anforderungen** (vorrangig), **Standard-Anforderungen** und **Anforderungen bei erhöhtem Schutzbedarf**.

*Stand: Die Edition 2023 des Kompendiums ist die aktuelle Fassung; das BSI führt schrittweise den modernisierten „Grundschutz++“ ein. Die Grundprinzipien (Schutzbedarf, Bausteine/Anforderungen, Schutzziele) bleiben gleich.*`,
        },
        {
          type: 'explain',
          title: 'Drei Vorgehensweisen und der Ablauf',
          body: `Der BSI-Standard 200-2 bietet drei Einstiegswege:

| Vorgehensweise | Idee | Für wen? |
|---|---|---|
| **Basis-Absicherung** | **breit, aber flach**: nur die Basis-Anforderungen für alle Bereiche | Einstieg, kleine Unternehmen – schnell ein Grundniveau |
| **Kern-Absicherung** | **schmal, aber tief**: zuerst die „Kronjuwelen“ (besonders wichtige Prozesse und Werte) vollständig schützen | wenn wenige Bereiche existenziell wichtig sind |
| **Standard-Absicherung** | **breit und tief**: umfassender Schutz aller Bereiche | Ziel-Vorgehensweise; Basis für ein ISO-27001-Zertifikat auf Basis von IT-Grundschutz |

**Ablauf der Standard-Absicherung:**
1. **Initiierung:** Leitung übernimmt Verantwortung, Sicherheitsleitlinie, Geltungsbereich festlegen.
2. **Strukturanalyse:** Was gibt es? Geschäftsprozesse, Anwendungen, IT-Systeme, Räume, Kommunikationsverbindungen (Netzplan!).
3. **Schutzbedarfsfeststellung:** Wie schützenswert ist das alles? (nächste Lektion)
4. **Modellierung:** passende Bausteine den Zielobjekten zuordnen.
5. **IT-Grundschutz-Check:** Soll-Ist-Vergleich – welche Anforderungen sind erfüllt, teilweise, nicht?
6. **Risikoanalyse:** für Objekte mit hohem/sehr hohem Schutzbedarf oder ohne passenden Baustein (BSI-Standard 200-3).
7. **Umsetzungsplanung und Umsetzung** der fehlenden Maßnahmen.
8. **Aufrechterhaltung und kontinuierliche Verbesserung** (PDCA-Zyklus: Plan – Do – Check – Act).

Für dich als FISI ist vor allem wichtig: Du verstehst die Logik **„erst Struktur und Schutzbedarf, dann Maßnahmen“** und kannst einzelne Bausteine (z. B. für einen Client oder ein Datensicherungskonzept) als Checkliste nutzen.`,
        },
        {
          type: 'explain',
          title: 'Der Sicherheitsprozess: Phasen, Leitlinie, Rollen, Informationsverbund',
          body: `Bevor irgendein Schutzbedarf bestimmt wird, muss der **Sicherheitsprozess** organisiert sein. Viele Lehrbücher stellen ihn nach BSI in **sechs Phasen** dar. Die acht Schritte von oben stecken dabei vor allem in Phase 4:

| Phase | Was passiert? |
|---|---|
| 1. **Initiierung** | Die Leitung übernimmt die Verantwortung, stellt Geld und Personal bereit und legt den Geltungsbereich fest. |
| 2. **Leitlinie erstellen** | Die Leitung beschließt ein kurzes Grundsatzdokument: Warum ist Sicherheit wichtig, welche Ziele gelten, wer ist zuständig? |
| 3. **Organisation aufbauen** | Rollen besetzen (z. B. Informationssicherheitsbeauftragter), Zuständigkeiten und Meldewege festlegen. |
| 4. **Sicherheitskonzeption** | Strukturanalyse → Schutzbedarfsfeststellung → Modellierung → IT-Grundschutz-Check → ggf. Risikoanalyse. |
| 5. **Umsetzung** | Fehlende Maßnahmen planen und umsetzen, Beschäftigte schulen. |
| 6. **Aufrechterhaltung und Verbesserung** | Regelmäßig prüfen, ob alles wirkt, und nachbessern (PDCA-Zyklus). |

**Die Sicherheitsleitlinie** (Informationssicherheitsleitlinie) enthält typischerweise:
- den **Stellenwert** der Informationssicherheit für das Unternehmen,
- die **Sicherheitsziele** (z. B. „Kundendaten bleiben vertraulich, der Webshop ist hochverfügbar“),
- den **Geltungsbereich** (welche Standorte und Prozesse),
- die **Organisation und Verantwortlichkeiten**,
- die **Verpflichtung der Leitung**, die Ziele durchzusetzen und laufend zu verbessern.

Die Leitung **unterschreibt** sie, und alle Beschäftigten bekommen sie zu sehen. Verwechsle sie nicht mit dem Sicherheitskonzept: Die **Leitlinie** ist kurz und sagt **warum und wer**. Das **Sicherheitskonzept** ist ausführlich und sagt **was und wie** (Objekte, Schutzbedarf, Maßnahmen).

**Wer ist wofür zuständig?**

| Rolle | Aufgabe |
|---|---|
| **Leitung** (Geschäftsführung) | trägt die **Gesamtverantwortung**, setzt die Leitlinie in Kraft, stellt Ressourcen bereit, akzeptiert Restrisiken |
| **Informationssicherheitsbeauftragter (ISB)** | koordiniert den Sicherheitsprozess, erstellt das Sicherheitskonzept, berät die Leitung und berichtet ihr direkt, wertet Sicherheitsvorfälle aus |
| **Datenschutzbeauftragter (DSB)** | berät und überwacht beim **Datenschutz** (personenbezogene Daten); in Deutschland Pflicht ab in der Regel 20 Personen (§ 38 BDSG) |
| **IT-Betrieb** (Administration) | setzt die technischen Maßnahmen um: Updates, Backups, Rechte, Firewall |
| **alle Beschäftigten** | halten die Regeln ein und **melden** Vorfälle |

**Prüfungsfalle:** „Der ISB ist an oberster Stelle verantwortlich“ ist **falsch**. Verantwortlich bleibt die Leitung – der ISB berät und koordiniert.

**Informationsverbund:** So nennt das BSI den **Bereich, den man absichert**. Gemeint ist alles, was in diesem Bereich zusammenwirkt: Geschäftsprozesse, Anwendungen, IT-Systeme, Räume, Kommunikationsverbindungen – und auch die beteiligten Menschen und Regeln. Beispiel: „Standort Hamburg der Elektro Krämer GmbH mit Vertrieb, Buchhaltung und Serverraum“. Die **Strukturanalyse** erfasst genau diesen Informationsverbund (mit Netzplan). Gleichartige Objekte fasst man zu **Gruppen** zusammen, z. B. 40 gleich eingerichtete Büro-PCs als ein Objekt – das spart Arbeit.`,
        },
        {
          type: 'explain',
          title: 'Governance und Compliance',
          body: `Zwei Begriffe, die in Unterricht und Unternehmen oft fallen:

| Begriff | Bedeutung | Beispiel |
|---|---|---|
| **Governance** (IT-Governance) | der Rahmen aus **Regeln, Strukturen und Verantwortlichkeiten**, mit dem die Leitung die IT steuert und überwacht | Leitlinie, Rollen, Freigabeprozess für neue Software, monatlicher Sicherheitsbericht an die Geschäftsführung |
| **Compliance** | die **Einhaltung** von Gesetzen, Verträgen, Normen und internen Richtlinien – und der **Nachweis** darüber | DSGVO-Löschfristen einhalten, Lizenzbedingungen beachten, SLA erfüllen, AV-Verträge abschließen |
| **Risikomanagement** | Risiken erkennen, bewerten und behandeln (Lektion 2) | Risikoanalyse, Cyberversicherung |

Zusammen spricht man von **GRC** (Governance, Risk & Compliance).

**Merkhilfe:** Governance legt fest, **wer entscheidet und nach welchen Regeln**. Compliance prüft, **ob die Regeln eingehalten werden**. Ein Verstoß gegen Compliance kann Bußgelder, Schadensersatz und Imageschaden bringen – zum Beispiel ein fehlender AV-Vertrag mit einem Cloud-Anbieter.`,
        },
        {
          type: 'example',
          title: 'Welche Vorgehensweise passt?',
          problem: 'Die Elektro Krämer GmbH (120 Mitarbeitende, bisher kein Sicherheitskonzept) will „endlich etwas für die Sicherheit tun“. Die Geschäftsführung hat wenig Zeit und Budget, aber der Webshop und die Warenwirtschaft sind für das Geschäft lebenswichtig. Empfiehl ein Vorgehen.',
          steps: [
            { label: 'Ausgangslage', body: 'Kein ISMS vorhanden, begrenzte Ressourcen → ein schneller, breiter Einstieg ist sinnvoll.' },
            { label: 'Schritt 1', body: '**Basis-Absicherung**: Basis-Anforderungen in allen Bereichen umsetzen (z. B. Updates, Virenschutz, Backups, Rechtevergabe, Passwortregeln).' },
            { label: 'Schritt 2', body: 'Für Webshop und Warenwirtschaft zusätzlich eine **Kern-Absicherung** – diese Kronjuwelen werden vollständig abgesichert.' },
            { label: 'Ziel', body: 'Langfristig Ausbau zur **Standard-Absicherung** für das ganze Unternehmen.' },
          ],
          result: 'Basis-Absicherung als Einstieg, Kern-Absicherung für Webshop/ERP, langfristig Standard-Absicherung.',
        },
        {
          type: 'check',
          question: {
            id: 's01-c07', kind: 'order', skill: 'sich.grundschutz', difficulty: 2,
            prompt: 'Bringe die Schritte der IT-Grundschutz-Methodik (Standard-Absicherung) in die richtige Reihenfolge.',
            items: ['Strukturanalyse', 'Schutzbedarfsfeststellung', 'Modellierung (Bausteine zuordnen)', 'IT-Grundschutz-Check (Soll-Ist-Vergleich)', 'Risikoanalyse für hohen Schutzbedarf', 'Umsetzung der Maßnahmen'],
            hints: ['Erst muss klar sein, WAS es gibt, dann WIE schützenswert es ist.'],
            explanation: 'Struktur → Schutzbedarf → Modellierung → Check → Risikoanalyse → Umsetzung. Danach folgt die kontinuierliche Verbesserung.',
          },
        },
        {
          type: 'check',
          question: {
            id: 's01-c08', kind: 'single', skill: 'sich.grundschutz', difficulty: 2,
            prompt: 'Eine Anforderung im IT-Grundschutz-Kompendium ist mit **SOLLTE** formuliert. Was bedeutet das?',
            options: ['Die Anforderung ist grundsätzlich umzusetzen; eine Abweichung ist nur mit nachvollziehbarer Begründung zulässig.', 'Die Anforderung ist völlig optional.', 'Die Anforderung ist ausnahmslos verpflichtend.', 'Die Anforderung gilt nur für Behörden.'],
            answer: 0,
            distractors: {
              '1': { why: 'Optional ist „KANN“.', error: 'grundschutz-modalverb' },
              '2': { why: 'Ausnahmslos verbindlich ist „MUSS“.', error: 'grundschutz-modalverb' },
              '3': { why: 'Der IT-Grundschutz ist für Behörden und Unternehmen jeder Größe gedacht.', error: 'grundschutz-modalverb' },
            },
            explanation: 'MUSS = verbindlich, SOLLTE = grundsätzlich umsetzen (Abweichung begründen und dokumentieren), KANN = optional.',
          },
        },
        {
          type: 'check',
          question: {
            id: 's01-c12', kind: 'order', skill: 'sich.prozess', difficulty: 2,
            prompt: 'Bringe die sechs Phasen des Sicherheitsprozesses in die richtige Reihenfolge.',
            items: ['Initiierung: Leitung übernimmt Verantwortung', 'Sicherheitsleitlinie erstellen', 'Organisation aufbauen (Rollen, Zuständigkeiten)', 'Sicherheitskonzeption (Strukturanalyse, Schutzbedarf, Modellierung, Check)', 'Umsetzung der Maßnahmen', 'Aufrechterhaltung und kontinuierliche Verbesserung'],
            hints: ['Ohne die Leitung passiert gar nichts – sie steht am Anfang.', 'Erst Ziele und Rollen, dann das Konzept, dann die Umsetzung.'],
            explanation: 'Initiierung → Leitlinie → Organisation → Konzeption → Umsetzung → Aufrechterhaltung/Verbesserung. Häufiger Fehler: die Strukturanalyse an den Anfang setzen – sie gehört zur Konzeption, und dafür braucht es vorher Leitlinie und Zuständigkeiten.',
          },
        },
        { type: 'practice', title: 'Übung: IT-Grundschutz und Sicherheitsprozess', questionIds: ['s01-q021', 's01-q022', 's01-q023', 's01-q024', 's01-q025', 's01-q044', 's01-q045', 's01-q046', 's01-q047', 's01-q048', 's01-q049', 's01-q050', 's01-q052'], count: 6, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'BSI-Standards: 200-1 ISMS, 200-2 Methodik, 200-3 Risikoanalyse, 200-4 Notfallmanagement (BCM).',
            'Kompendium: Bausteine in Schichten (ISMS, ORP, CON, OPS, DER | APP, SYS, IND, NET, INF) mit Anforderungen.',
            'MUSS = verbindlich, SOLLTE = begründet abweichbar, KANN = optional; Basis- / Standard- / erhöhter Schutzbedarf.',
            'Vorgehen: Basis (breit, flach), Kern (schmal, tief), Standard (breit, tief).',
            'Ablauf: Struktur → Schutzbedarf → Modellierung → Check → Risikoanalyse → Umsetzung → Verbesserung.',
            'Sicherheitsprozess: Initiierung → Leitlinie → Organisation → Konzeption → Umsetzung → Aufrechterhaltung.',
            'Leitlinie (kurz: warum, wer) ≠ Sicherheitskonzept (ausführlich: was, wie). Gesamtverantwortung: Leitung, nicht ISB.',
            'Informationsverbund = der abgesicherte Bereich mit allen Prozessen, Anwendungen, Systemen, Räumen, Verbindungen und Menschen.',
            'Governance = Regeln und Verantwortlichkeiten; Compliance = Einhaltung und Nachweis.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's01-l05',
      title: 'Schutzbedarfsfeststellung: normal, hoch, sehr hoch',
      minutes: 35,
      relevance: 'ap1',
      skills: ['sich.schutzbedarf'],
      simple: `Nicht alles muss gleich gut geschützt werden: Dein Fahrrad schließt du ab, deinen Kugelschreiber nicht.
Die **Schutzbedarfsfeststellung** fragt für jedes Objekt: Wie schlimm wäre ein Schaden – getrennt für Vertraulichkeit, Integrität und Verfügbarkeit? Die Antwort ist immer **normal**, **hoch** oder **sehr hoch**.
Ein Server bekommt den höchsten Wert der Programme, die auf ihm laufen (**Maximumprinzip**) – so wie ein Tresor so gut sein muss wie das wertvollste Stück darin.
Liegt sehr viel an einer Stelle, kann der Bedarf steigen (**Kumulationseffekt**, „Anhäufung“). Ist etwas doppelt vorhanden oder liegt dort nur Unwichtiges, kann er sinken (**Verteilungseffekt**).

**Merke:** Je Grundwert getrennt einstufen, das Maximum vererben, Kumulation und Verteilung prüfen – und jede Einstufung begründen.`,
      steps: [
        {
          type: 'explain',
          title: 'Wie schützenswert ist etwas?',
          body: `Nicht alles braucht den gleichen Schutz: Der Druckserver ist weniger kritisch als die Personaldatenbank. Die **Schutzbedarfsfeststellung** bestimmt deshalb für jedes Objekt **je Grundwert** (Vertraulichkeit, Integrität, Verfügbarkeit), wie schlimm ein Schaden wäre. Das BSI (Standard 200-2) verwendet drei **Schutzbedarfskategorien**:

| Kategorie | Bedeutung |
|---|---|
| **normal** | Die Schadensauswirkungen sind **begrenzt und überschaubar**. |
| **hoch** | Die Schadensauswirkungen können **beträchtlich** sein. |
| **sehr hoch** | Die Schadensauswirkungen können ein **existenziell bedrohliches, katastrophales** Ausmaß erreichen. |

**Woran misst man den Schaden?** An typischen **Schadensszenarien**:
1. Verstoß gegen **Gesetze, Vorschriften oder Verträge**
2. Beeinträchtigung des **informationellen Selbstbestimmungsrechts** (Datenschutz)
3. Beeinträchtigung der **persönlichen Unversehrtheit**
4. Beeinträchtigung der **Aufgabenerfüllung**
5. **Negative Innen- oder Außenwirkung** (Image)
6. **Finanzielle Auswirkungen**

Jedes Unternehmen legt **selbst** fest, wo die Grenzen liegen. Beispiel Elektro Krämer GmbH:

| Szenario | normal | hoch | sehr hoch |
|---|---|---|---|
| Finanzieller Schaden | < 10.000 € | 10.000 – 250.000 € | > 250.000 € (existenzgefährdend) |
| Ausfallzeit, die tolerierbar ist | > 24 Stunden | 2 – 24 Stunden | < 2 Stunden |
| Personenbezogene Daten | ohne besondere Auswirkung | Ansehen/wirtschaftliche Lage Betroffener erheblich beeinträchtigt | Gefahr für Leib, Leben oder Existenz Betroffener |

**Reihenfolge:** Zuerst den Schutzbedarf der **Geschäftsprozesse und Anwendungen** bestimmen. Daraus „erben“ die **IT-Systeme**, auf denen sie laufen, dann die **Räume**, in denen die Systeme stehen, und die **Kommunikationsverbindungen**.`,
        },
        {
          type: 'explain',
          title: 'Vier Schadensstufen, drei Schutzbedarfskategorien',
          body: `Manche Lehrbücher teilen die möglichen **Schäden** in **vier** Kategorien ein: **gering, mittel, hoch, sehr hoch**. Der **Schutzbedarf** kennt aber nur **drei** Kategorien. Das ist kein Widerspruch – die beiden unteren Schadensstufen landen zusammen bei „normal“:

| Schadenskategorie (vierstufig) | Beispiel Elektro Krämer GmbH | Schutzbedarfskategorie |
|---|---|---|
| **gering** | Der Drucker im Flur fällt einen Tag aus. | **normal** |
| **mittel** | Eine Abteilung arbeitet einen halben Tag mit Umwegen weiter. | **normal** |
| **hoch** | beträchtlicher Schaden, z. B. 50.000 € Vertragsstrafe | **hoch** |
| **sehr hoch** | existenzbedrohend, z. B. wochenlanger Stillstand des Webshops | **sehr hoch** |

Warum? „Normal“ bedeutet laut BSI: Die Schäden sind **begrenzt und überschaubar** – das trifft auf geringe **und** mittlere Schäden zu.

**Achtung, Verwechslungsgefahr:** Im BSI-Standard 200-3 (Risikoanalyse) heißen die vier Stufen der **Auswirkung** vernachlässigbar, begrenzt, beträchtlich, existenzbedrohend. Dort sind „gering, mittel, hoch, sehr hoch“ die Stufen des **Risikos** – also das Ergebnis der Risikomatrix aus Lektion 2. Lies in der Prüfung genau, ob nach dem **Schaden**, dem **Risiko** oder dem **Schutzbedarf** gefragt ist.

Wo genau die Grenzen liegen, legt jedes Unternehmen in seiner **Grenzwerttabelle** fest (Beispiel oben). Die gängige Zuordnung lautet: gering und mittel → normal, hoch → hoch, sehr hoch → sehr hoch.`,
        },
        {
          type: 'explain',
          title: 'Maximumprinzip, Kumulationseffekt, Verteilungseffekt',
          body: `**Maximumprinzip:** Ein System übernimmt **je Grundwert den höchsten** Schutzbedarf aller Anwendungen, die darauf laufen. Logisch: Fällt der Server aus, sind **alle** Anwendungen betroffen – also auch die wichtigste.

| Anwendung auf SRV-HH-01 | V | I | A |
|---|---|---|---|
| Personalverwaltung | sehr hoch | hoch | normal |
| Intranet-Wiki | normal | normal | normal |
| Warenwirtschaft | hoch | hoch | sehr hoch |
| **→ SRV-HH-01** | **sehr hoch** | **hoch** | **sehr hoch** |

Achtung: Jeder Grundwert wird **getrennt** betrachtet!

Das Ergebnis wird anschließend auf zwei Effekte geprüft:

| Effekt | Wirkung | Beispiel Verfügbarkeit | Beispiel Vertraulichkeit |
|---|---|---|---|
| **Kumulationseffekt** (Anhäufung) | Viele einzelne kleine Schäden **summieren sich** zu einem größeren → Schutzbedarf **steigt** | Auf einem Virtualisierungshost laufen 15 Server mit je „normal“ – fällt der Host aus, sind alle 15 gleichzeitig weg → Verfügbarkeit „hoch“. | Auf einem Dateiserver liegen viele Datenbestände, die **einzeln** nur „normal“ vertraulich sind (Preislisten, Lieferantenverträge, Kundenadressen, Projektpläne). Wer den Server knackt, bekommt **alles auf einmal** – ein Gesamtbild des Unternehmens → Vertraulichkeit „hoch“. |
| **Verteilungseffekt** | Eine wichtige Anwendung ist auf **mehrere Systeme verteilt** (redundant), oder ein System trägt nur **unwichtige Teile** → Schutzbedarf des einzelnen Systems kann **sinken** | Der Webshop läuft auf zwei Servern im Cluster: Fällt einer aus, übernimmt der andere → Verfügbarkeit des einzelnen Servers nur „hoch“ statt „sehr hoch“. | Ein Auswerteserver erhält aus der Personaldatenbank nur **anonymisierte** Statistiken – die vertraulichen Einzeldaten liegen nicht darauf → Vertraulichkeit dort „normal“. |

Merke dir: Der Kumulationseffekt kann **bei jedem Grundwert** auftreten – nicht nur bei der Verfügbarkeit. Redundanz (doppelte Systeme) senkt dagegen nur den Schutzbedarf der **Verfügbarkeit**. Für die **Vertraulichkeit** hilft sie nicht: Eine Kopie vertraulicher Daten ist genauso vertraulich und vergrößert sogar die Angriffsfläche.

**Kommunikationsverbindungen:** Kritisch sind laut BSI insbesondere
- **Außenverbindungen** (Internet, Standortverbindung Hamburg–Berlin, Fernzugriff),
- Verbindungen, über die **hochschutzbedürftige** Informationen übertragen werden,
- Verbindungen, über die bestimmte Informationen **nicht** übertragen werden **dürfen** (z. B. Personaldaten ins Gäste-WLAN).

Jede Festlegung wird **schriftlich begründet** – nur so ist sie später nachvollziehbar.`,
        },
        {
          type: 'visual',
          title: 'Der Schutzbedarf wird vererbt',
          widget: {
            kind: 'topology',
            data: {
              nodes: [
                { id: 'app1', type: 'cloud', label: 'Personalverwaltung', sub: 'V: sehr hoch', x: 120, y: 60 },
                { id: 'app2', type: 'cloud', label: 'Warenwirtschaft', sub: 'A: sehr hoch', x: 400, y: 60 },
                { id: 'app3', type: 'cloud', label: 'Intranet', sub: 'normal', x: 680, y: 60 },
                { id: 'srv1', type: 'server', label: 'SRV-HH-01', sub: 'V sehr hoch · A sehr hoch', x: 260, y: 220 },
                { id: 'srv2', type: 'server', label: 'SRV-HH-02', sub: 'normal', x: 600, y: 220 },
                { id: 'fw', type: 'hub', label: 'Serverraum HH', sub: 'Maximum aller Server', x: 430, y: 370 },
              ],
              links: [
                { from: 'app1', to: 'srv1', label: 'läuft auf' },
                { from: 'app2', to: 'srv1', label: 'läuft auf' },
                { from: 'app3', to: 'srv2', label: 'läuft auf' },
                { from: 'srv1', to: 'fw', label: 'steht in' },
                { from: 'srv2', to: 'fw', label: 'steht in' },
              ],
              zones: [
                { label: 'Anwendungen', x: 20, y: 15, w: 760, h: 110, color: 'blue' },
                { label: 'IT-Systeme', x: 20, y: 170, w: 760, h: 110, color: 'green' },
                { label: 'Räume', x: 20, y: 320, w: 760, h: 95, color: 'orange' },
              ],
            },
          },
          caption: 'Anwendungen → IT-Systeme → Räume: Jede Ebene übernimmt nach dem Maximumprinzip den höchsten Schutzbedarf der darunterliegenden Objekte (je Grundwert getrennt).',
        },
        {
          type: 'example',
          title: 'Schutzbedarf des Notebooks der Personalleiterin',
          problem: `Auf dem Notebook von Frau Brandt (Personalleitung) werden genutzt: **Personalverwaltung** (V sehr hoch, I hoch, A normal), **E-Mail** (V hoch, I normal, A hoch) und **Office** (V normal, I normal, A normal). Bestimme den Schutzbedarf des Notebooks und begründe.`,
          steps: [
            { label: 'Vertraulichkeit', body: 'Maximum von sehr hoch, hoch, normal → **sehr hoch** (Gesundheits- und Gehaltsdaten; Verlust könnte Betroffene erheblich schädigen und hohe Bußgelder auslösen).' },
            { label: 'Integrität', body: 'Maximum von hoch, normal, normal → **hoch**.' },
            { label: 'Verfügbarkeit', body: 'Maximum von normal, hoch, normal → **hoch**. Prüfung Verteilungseffekt: Die E-Mail ist auch über andere Geräte erreichbar, die Daten liegen zentral auf dem Server → Ausfall des einzelnen Notebooks ist überbrückbar → begründet **normal**.' },
            { label: 'Folgerung', body: 'Wegen V = sehr hoch: Festplattenverschlüsselung (BitLocker mit TPM + PIN), MFA, Bildschirmsperre, Blickschutzfolie, keine lokale Datenablage.' },
          ],
          result: 'V sehr hoch, I hoch, A normal (nach Verteilungseffekt; ohne diesen hoch) – Maßnahmen richten sich vor allem auf die Vertraulichkeit.',
        },
        {
          type: 'check',
          question: {
            id: 's01-c09', kind: 'table', skill: 'sich.schutzbedarf', difficulty: 2,
            prompt: `Auf dem Server **SRV-BE-01** (Standort Berlin) laufen: Zeiterfassung (V hoch, I hoch, A normal), Druckserver (V normal, I normal, A normal) und Telefonanlage VoIP (V normal, I normal, A hoch). Bestimme den Schutzbedarf des Servers nach dem Maximumprinzip (**normal**, **hoch** oder **sehr hoch**).`,
            columns: [
              { key: 'v', label: 'Vertraulichkeit', type: 'text' },
              { key: 'i', label: 'Integrität', type: 'text' },
              { key: 'a', label: 'Verfügbarkeit', type: 'text' },
            ],
            rows: [{ label: 'SRV-BE-01', cells: { v: { answer: 'hoch' }, i: { answer: 'hoch' }, a: { answer: 'hoch' } } }],
            misconceptions: [{ cell: 'a', answer: 'normal', error: 'maximumprinzip', why: 'Die Telefonanlage hat bei der Verfügbarkeit „hoch“ – das Maximum zählt.' }],
            explanation: 'V: max(hoch, normal, normal) = hoch · I: max(hoch, normal, normal) = hoch · A: max(normal, normal, hoch) = hoch.',
          },
        },
        {
          type: 'check',
          question: {
            id: 's01-c10', kind: 'single', skill: 'sich.schutzbedarf', difficulty: 2,
            prompt: 'Auf einem Virtualisierungshost laufen 20 virtuelle Server, jeder einzeln mit Verfügbarkeit „normal“. Ein Ausfall des Hosts legt alle gleichzeitig lahm. Welcher Effekt ist zu berücksichtigen?',
            options: ['Kumulationseffekt – der Schutzbedarf des Hosts kann steigen', 'Verteilungseffekt – der Schutzbedarf sinkt', 'Maximumprinzip – der Host bleibt „normal“, weil alle VMs „normal“ sind, und weitere Effekte gibt es nicht', 'Kein Effekt, weil virtuelle Server keinen Schutzbedarf haben'],
            answer: 0,
            distractors: {
              '1': { why: 'Der Verteilungseffekt gilt, wenn eine Anwendung auf mehrere Systeme verteilt ist – hier ist es umgekehrt: Vieles hängt an einem System.', error: 'kumulation-verteilung' },
              '2': { why: 'Das Maximumprinzip ergibt zwar „normal“, muss aber auf den Kumulationseffekt geprüft werden.', error: 'kumulation-verteilung' },
              '3': { why: 'Auch virtuelle Systeme erben den Schutzbedarf ihrer Anwendungen.', error: 'kumulation-verteilung' },
            },
            explanation: 'Viele kleine Schäden gleichzeitig ergeben einen großen Schaden → **Kumulationseffekt** → Verfügbarkeit des Hosts z. B. „hoch“ (Begründung dokumentieren).',
          },
        },
        {
          type: 'check',
          question: {
            id: 's01-c13', kind: 'single', skill: 'sich.schutzbedarf', difficulty: 2,
            prompt: 'Auf dem Dateiserver **SRV-HH-03** liegen zwölf Datenbestände (Preislisten, Lieferantenverträge, Kundenadressen der Filialen, Projektpläne). **Jeder einzelne** hat bei der Vertraulichkeit den Schutzbedarf „normal“. Ein Angreifer, der den Server übernimmt, hätte aber alle zusammen. Was gilt für die Vertraulichkeit des Servers?',
            options: [
              'Wegen des Kumulationseffekts kann sie höher als „normal“ eingestuft werden – mit Begründung.',
              'Sie bleibt nach dem Maximumprinzip zwingend „normal“.',
              'Der Kumulationseffekt gilt nur für die Verfügbarkeit, deshalb „normal“.',
              'Wegen des Verteilungseffekts sinkt sie unter „normal“.',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'Das Maximumprinzip liefert nur den Startwert. Danach wird immer auf Kumulations- und Verteilungseffekt geprüft.', error: 'kumulation-verteilung' },
              '2': { why: 'Der Kumulationseffekt kann bei jedem Grundwert auftreten. Viele Daten an einer Stelle ergeben bei einem Angriff einen größeren Gesamtschaden.', error: 'kumulation-verteilung' },
              '3': { why: 'Unter „normal“ gibt es keine Kategorie, und verteilt ist hier nichts – im Gegenteil, alles liegt an einer Stelle.', error: 'kumulation-verteilung' },
            },
            explanation: '**Kumulationseffekt bei der Vertraulichkeit:** Viele einzeln unkritische Datenbestände ergeben zusammen ein Gesamtbild des Unternehmens. Wird der Server kompromittiert, ist der Schaden größer als bei jedem einzelnen Datenbestand → Vertraulichkeit z. B. „hoch“, Begründung dokumentieren.\n\nHäufiger Fehler: Kumulation nur mit dem Virtualisierungshost (Verfügbarkeit) verbinden.',
          },
        },
        { type: 'practice', title: 'Übung: Maximumprinzip anwenden', generator: 'sich.maximum', count: 3, difficulty: 2 },
        { type: 'practice', title: 'Übung: Kategorien und Effekte', questionIds: ['s01-q026', 's01-q027', 's01-q035', 's01-q036', 's01-q037', 's01-q038', 's01-q039'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Kategorien: normal (begrenzt, überschaubar), hoch (beträchtlich), sehr hoch (existenzbedrohend).',
            'Vierstufige Schadenseinteilung mancher Bücher: gering + mittel → normal, hoch → hoch, sehr hoch → sehr hoch.',
            'Sechs Schadensszenarien: Gesetze/Verträge, Selbstbestimmung, Unversehrtheit, Aufgabenerfüllung, Außenwirkung, Finanzen.',
            'Reihenfolge: Prozesse/Anwendungen → IT-Systeme → Räume → Kommunikationsverbindungen.',
            'Maximumprinzip: höchster Schutzbedarf je Grundwert wird vererbt.',
            'Kumulationseffekt erhöht (bei jedem Grundwert, auch Vertraulichkeit), Verteilungseffekt senkt (Redundanz nur bei Verfügbarkeit) – immer begründen.',
            'Kritische Verbindungen: Außenverbindungen, hochschutzbedürftige Daten, verbotene Übertragungswege.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's01-l07',
      title: 'Schutzbedarfstabelle mit Begründung: Räume, Verbindungen, Clients, Datenträger',
      minutes: 30,
      relevance: 'ap1',
      skills: ['sich.schutzbedarf.beleg', 'sich.schutzbedarf'],
      simple: `Stell dir einen Bewertungsbogen vor: Für jede Zeile (eine Anwendung, ein Raum, eine Leitung, ein Notebook, ein USB-Stick) und jede Spalte (Vertraulichkeit, Integrität, Verfügbarkeit) trägst du **normal**, **hoch** oder **sehr hoch** ein.
Damit das nicht nach Bauchgefühl geht, gibt die Firma eine **Grenzwerttabelle** vor – wie die Notentabelle bei einer Klassenarbeit, in der steht, ab wie vielen Punkten es welche Note gibt.
Du liest also ab: Wie teuer wäre der Schaden? Wie lange darf etwas ausfallen? Wie schlimm wäre es für die betroffenen Menschen?
In die Spalte **Begründung** schreibst du, welcher Fakt dich zu der Stufe gebracht hat.

**Merke:** „hoch“ allein bringt kaum Punkte – „hoch, weil …“ mit Bezug auf die Grenzwerttabelle bringt die volle Punktzahl.`,
      steps: [
        {
          type: 'explain',
          title: 'So sieht eine Schutzbedarfstabelle aus',
          body: `In der Prüfung und in der Praxis wird der Schutzbedarf in einer **Tabelle** dokumentiert. Typische Spalten (angelehnt an das BSI-Vorgehen):

| Spalte | Inhalt | Beispiel |
|---|---|---|
| **Kürzel** | eindeutige Nummer des Objekts | A1 (Anwendung), S1 (System), R1 (Raum), K1 (Kommunikationsverbindung) |
| **Bezeichnung** | Was ist es? | Notebook Außendienst Berlin |
| **Grundwert** | Vertraulichkeit, Integrität oder Verfügbarkeit – **je eine Zeile** | Vertraulichkeit |
| **Schutzbedarf** | normal, hoch oder sehr hoch | hoch |
| **Begründung** | Welches Schadensszenario, welcher Wert, welche Grenze, welcher Effekt? | Kundendaten und Konditionen; Abfluss ≈ 40.000 € → laut Grenzwerttabelle 10.000–250.000 € = hoch |

**Eine gute Begründung hat drei Teile:**
1. **Fakt** aus dem Beleg: „Die Fachabteilung kann höchstens 4 Stunden ohne das System arbeiten.“
2. **Bezug zur Grenze:** „Laut Grenzwerttabelle liegen 2 bis 24 Stunden im Bereich hoch.“
3. **Ergebnis**, ggf. mit Effekt: „→ hoch. Ein Ersatzgerät steht nicht bereit, deshalb kein Verteilungseffekt.“

Für die Verfügbarkeit gilt dabei immer: **Je kürzer die tolerierbare Ausfallzeit, desto höher der Schutzbedarf.** Das wird gern verdreht.

Gibt es für einen Grundwert **mehrere Schadensszenarien** (z. B. Vertraulichkeit: finanzieller Schaden **und** Datenschutz), zählt das **schwerste** – auch hier gilt das Maximumprinzip.`,
        },
        {
          type: 'explain',
          title: 'Besonderheiten je Objektart',
          body: `| Objektart | Worauf achten? | Typisches Ergebnis |
|---|---|---|
| **Räume** (Serverraum, Büro, Archiv) | Ein Raum erbt das **Maximum** aller IT-Systeme **und** Papierakten darin. Stehen viele wichtige Systeme in einem Raum, ist an den **Kumulationseffekt** zu denken (Brand trifft alle). | Serverraum: Verfügbarkeit oft sehr hoch |
| **Kommunikationsverbindungen** (LAN, WLAN, VPN, Internet) | Vertraulichkeit und Integrität richten sich nach den **übertragenen Daten**, die Verfügbarkeit nach den Anwendungen, die von der Leitung **abhängen**. Besonders kritisch: Außenverbindungen, Verbindungen mit hochschutzbedürftigen Daten und Verbindungen, über die bestimmte Daten **nicht** fließen dürfen. | Standortverbindung: oft hoch |
| **Clients und Notebooks** | Ein Client ist mindestens so schutzbedürftig wie die Daten und Programme, die darauf genutzt werden (Maximumprinzip). Notebooks unterwegs: Diebstahl und Verlust erhöhen das Risiko für die Vertraulichkeit. Ersatzgerät und zentrale Datenhaltung senken die Verfügbarkeit (Verteilungseffekt). | Außendienst-Notebook: V hoch, A normal |
| **Mobile Datenträger** (USB-Stick, externe Festplatte, Speicherkarte) | Die Vertraulichkeit richtet sich nach den Daten darauf – **Verlust** ist das Hauptproblem. Ist der Datenträger nur eine **Kopie** und liegt das Original zentral, ist die Verfügbarkeit meist normal. | USB-Stick mit Geheimnissen: V sehr hoch, A normal |

Aus dem Schutzbedarf folgen dann die Maßnahmen: Ein USB-Stick mit V „sehr hoch“ braucht z. B. Hardwareverschlüsselung mit PIN, eine Ausgabeliste (wer hat welchen Stick?) und eine Regel zur sofortigen Verlustmeldung.`,
        },
        {
          type: 'example',
          title: 'Belegaufgabe: Vier Objekte mit Begründung',
          problem: `Grenzwerttabelle der Elektro Krämer GmbH:

| Schadensszenario | normal | hoch | sehr hoch |
|---|---|---|---|
| finanzieller Schaden | unter 10.000 € | 10.000 € bis 250.000 € | über 250.000 € |
| tolerierbare Ausfallzeit | mehr als 24 Stunden | 2 bis 24 Stunden | weniger als 2 Stunden |

Bestimme den Schutzbedarf mit Begründung für:
- **R1 Serverraum Hamburg:** Darin stehen SRV-HH-01 (V sehr hoch, I hoch, A sehr hoch) und SRV-HH-02 (V, I, A normal).
- **K1 VPN-Verbindung Hamburg–Berlin:** Die 35 Beschäftigten in Berlin arbeiten darüber mit der Warenwirtschaft. Ein Abfluss der übertragenen Kunden- und Auftragsdaten kostet ca. 80.000 €, manipulierte Aufträge ca. 30.000 €. Das Berliner Lager kann höchstens 4 Stunden ohne Warenwirtschaft arbeiten.
- **C1 Notebook Außendienst:** Ein Bekanntwerden der Angebote und Kundendaten kostet ca. 40.000 €. Angebote werden vor dem Versand im ERP geprüft; Fehler auf dem Notebook kosten höchstens ca. 3.000 €. Ein Ersatzgerät steht am nächsten Tag bereit, alle Daten liegen zentral; 2 Tage Ausfall sind tragbar.
- **D1 USB-Stick für die Messe:** enthält Zeichnungen eines noch geheimen Produkts (Bekanntwerden ca. 400.000 € Schaden). Der Stick wird vor jeder Messe frisch vom Fileserver bespielt; ein Fehler fällt sofort auf (unter 1.000 € Schaden). Das Original bleibt auf dem Fileserver.`,
          steps: [
            { label: 'R1 Serverraum', body: '**V sehr hoch, I hoch, A sehr hoch** – Maximum der beiden Server. Begründung: Wer in den Raum gelangt, hat physischen Zugriff auf SRV-HH-01 (V sehr hoch); ein Brand oder Wasserschaden legt beide Server gleichzeitig lahm (A sehr hoch).' },
            { label: 'K1 VPN-Verbindung', body: '**V hoch** (80.000 € liegt zwischen 10.000 € und 250.000 €), **I hoch** (30.000 €), **A hoch** (4 Stunden liegen im Bereich 2 bis 24 Stunden). Zusätzlich: Außenverbindung über das Internet → kritische Verbindung.' },
            { label: 'C1 Notebook', body: '**V hoch** (40.000 € → hoch; zusätzlich Diebstahlrisiko unterwegs), **I normal** (höchstens 3.000 € → unter 10.000 €), **A normal** (2 Tage tragbar → mehr als 24 Stunden; Ersatzgerät und zentrale Daten = Verteilungseffekt).' },
            { label: 'D1 USB-Stick', body: '**V sehr hoch** (400.000 € → über 250.000 €), **I normal** (unter 1.000 €, Fehler fallen sofort auf), **A normal** (nur eine Kopie, das Original liegt auf dem Fileserver und kann jederzeit neu kopiert werden).' },
            { label: 'Maßnahmen ableiten', body: 'R1: Zutrittskontrolle, Brandmelder, USV. K1: VPN mit starker Verschlüsselung, zweite Leitung (Redundanz). C1: BitLocker mit PIN, VPN mit MFA. D1: hardwareverschlüsselter Stick mit PIN, Ausgabeliste, sofortige Verlustmeldung.' },
          ],
          result: 'R1: sehr hoch / hoch / sehr hoch · K1: hoch / hoch / hoch · C1: hoch / normal / normal · D1: sehr hoch / normal / normal – jeweils mit Fakt, Grenze und Ergebnis begründet.',
        },
        {
          type: 'check',
          question: {
            id: 's01-c14', kind: 'table', skill: 'sich.schutzbedarf.beleg', difficulty: 2,
            prompt: `Es gilt die Grenzwerttabelle der Elektro Krämer GmbH:

| Schadensszenario | normal | hoch | sehr hoch |
|---|---|---|---|
| finanzieller Schaden | unter 10.000 € | 10.000 € bis 250.000 € | über 250.000 € |
| tolerierbare Ausfallzeit | mehr als 24 Stunden | 2 bis 24 Stunden | weniger als 2 Stunden |

- **Druckernetz (VLAN 40):** Es transportiert nur Lieferscheine und Etiketten (Bekanntwerden: unter 2.000 € Schaden, Verfälschung: unter 2.000 €). Bei einem Ausfall wird 3 Tage lang über USB-Drucker gearbeitet.
- **Externe Backup-Festplatte (wöchentlich, im Tresor):** Sie enthält alle Firmendaten (Bekanntwerden: ca. 1.000.000 € Schaden). Eine unbemerkt beschädigte Sicherung würde im Ernstfall die Wiederherstellung verhindern (ca. 150.000 € Schaden). Zusätzlich gibt es die tägliche Sicherung auf dem NAS; die Festplatte darf bis zu einer Woche ausfallen.
- **Firewall am Internetanschluss:** Ihre Konfiguration enthält VPN-Zugangsdaten (Bekanntwerden ermöglicht einen Einbruch, ca. 300.000 € Schaden). Manipulierte Regeln verursachen ca. 120.000 € Schaden. Ohne Firewall ist der Webshop offline; tolerierbar ist höchstens 1 Stunde.

Trage den Schutzbedarf ein (**normal**, **hoch** oder **sehr hoch**).`,
            columns: [
              { key: 'v', label: 'Vertraulichkeit', type: 'text' },
              { key: 'i', label: 'Integrität', type: 'text' },
              { key: 'a', label: 'Verfügbarkeit', type: 'text' },
            ],
            rows: [
              { label: 'Druckernetz (VLAN 40)', cells: { v: { answer: 'normal' }, i: { answer: 'normal' }, a: { answer: 'normal' } } },
              { label: 'Externe Backup-Festplatte', cells: { v: { answer: 'sehr hoch', accept: ['sehr-hoch', 'sehrhoch'] }, i: { answer: 'hoch' }, a: { answer: 'normal' } } },
              { label: 'Firewall am Internetanschluss', cells: { v: { answer: 'sehr hoch', accept: ['sehr-hoch', 'sehrhoch'] }, i: { answer: 'hoch' }, a: { answer: 'sehr hoch', accept: ['sehr-hoch', 'sehrhoch'] } } },
            ],
            misconceptions: [
              { cell: '0:a', answer: 'sehr hoch', error: 'ausfallzeit-umgekehrt', why: 'Eine **lange** tolerierbare Ausfallzeit (3 Tage) bedeutet **niedrigen** Schutzbedarf: mehr als 24 Stunden = normal.' },
              { cell: '1:a', answer: 'sehr hoch', error: 'ausfallzeit-umgekehrt', why: 'Eine Woche Ausfall ist tragbar (es gibt die tägliche NAS-Sicherung) → mehr als 24 Stunden = normal.' },
              { cell: '2:a', answer: 'normal', error: 'ausfallzeit-umgekehrt', why: 'Nur 1 Stunde ist tolerierbar → weniger als 2 Stunden = **sehr hoch**.' },
            ],
            hints: ['Jede Zahl mit der passenden Zeile der Grenzwerttabelle vergleichen.', 'Verfügbarkeit: kurze tolerierbare Ausfallzeit = hoher Schutzbedarf.'],
            explanation: `| Objekt | V | I | A |
|---|---|---|---|
| Druckernetz | normal (unter 2.000 €) | normal (unter 2.000 €) | normal (3 Tage > 24 h) |
| Backup-Festplatte | **sehr hoch** (1 Mio. € > 250.000 €) | **hoch** (150.000 €) | normal (1 Woche tragbar, NAS-Sicherung vorhanden) |
| Firewall | **sehr hoch** (300.000 € > 250.000 €) | **hoch** (120.000 €) | **sehr hoch** (1 h < 2 h) |

Häufiger Fehler: Bei der Verfügbarkeit die Skala umdrehen. Merke: Je kürzer der tragbare Ausfall, desto höher der Schutzbedarf. Und: Ein Backup-Medium hat oft eine **sehr hohe Vertraulichkeit**, weil alle Daten darauf liegen – deshalb Backups verschlüsseln.`,
          },
        },
        {
          type: 'check',
          question: {
            id: 's01-c15', kind: 'free', skill: 'sich.schutzbedarf.beleg', difficulty: 2,
            prompt: 'Die VPN-Verbindung Hamburg–Berlin wurde bei der **Verfügbarkeit** mit „hoch“ eingestuft (das Berliner Lager kann höchstens 4 Stunden ohne Warenwirtschaft arbeiten; Grenzwerte: normal > 24 h, hoch 2–24 h, sehr hoch < 2 h). Formulieren Sie die Begründung so, wie sie in die Schutzbedarfstabelle gehört, und nennen Sie zwei passende Maßnahmen.',
            modelAnswer: 'Begründung: Über die VPN-Verbindung arbeiten die Beschäftigten in Berlin mit der Warenwirtschaft. Fällt sie aus, kann das Berliner Lager höchstens 4 Stunden weiterarbeiten. Laut Grenzwerttabelle liegen 2 bis 24 Stunden tolerierbare Ausfallzeit im Bereich „hoch“ → Schutzbedarf Verfügbarkeit hoch. Es gibt keine zweite Leitung, daher kein Verteilungseffekt. Maßnahmen: 1. Zweite, unabhängige Internetleitung (z. B. anderer Provider oder Mobilfunk-Backup) mit automatischem Umschalten des VPN. 2. Überwachung der Verbindung (Monitoring mit Alarm) und ein Wartungsvertrag mit kurzer Reaktionszeit beim Provider; zusätzlich Notfallplan für das Lager (z. B. Papier-Lieferscheine).',
            keywords: ['4 Stunden', '2 bis 24 Stunden', 'hoch', 'Grenzwerttabelle', 'zweite Leitung', 'Monitoring'],
            explanation: 'Eine vollständige Begründung nennt den **Fakt** (4 Stunden), die **Grenze** (2–24 h = hoch) und das **Ergebnis**. Maßnahmen passend zum Grundwert Verfügbarkeit: Redundanz, Überwachung, Wartungsvertrag, Notfallplan. Verschlüsselung wäre hier falsch zugeordnet – sie schützt die Vertraulichkeit.',
          },
        },
        { type: 'practice', title: 'Übung: Schutzbedarf aus der Grenzwerttabelle', generator: 'sich.schutzbedarf.beleg', count: 3, difficulty: 2 },
        { type: 'practice', title: 'Übung: Belegaufgaben mit Begründung', questionIds: ['s01-q040', 's01-q041', 's01-q042', 's01-q043'], count: 3, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Tabelle: Kürzel, Bezeichnung, Grundwert, Schutzbedarf, Begründung – je Grundwert eine Zeile.',
            'Begründung = Fakt aus dem Beleg + Bezug zur Grenzwerttabelle + Ergebnis (ggf. Effekt).',
            'Verfügbarkeit: je kürzer die tolerierbare Ausfallzeit, desto höher der Schutzbedarf.',
            'Mehrere Szenarien für einen Grundwert → das schwerste zählt.',
            'Räume erben das Maximum ihrer Systeme; Verbindungen richten sich nach den übertragenen Daten und abhängigen Anwendungen; mobile Datenträger: V nach Inhalt, A meist normal, wenn nur Kopie.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's01-l06',
      title: 'Handlungssituation: Vom Schutzbedarf zu Maßnahmen',
      minutes: 20,
      relevance: 'ap1',
      skills: ['sich.schutzbedarf', 'sich.schutzziele'],
      simple: `Einen Arbeitsplatz abzusichern ist wie eine Wohnung einbruchsicher zu machen: Erst schaust du, was drin ist und wie wertvoll es ist – dann wählst du passende Schlösser.
Für jedes Schutzziel gibt es **technische** Maßnahmen (durch Technik, z. B. Verschlüsselung oder Backup) und **organisatorische** Maßnahmen (durch Regeln, z. B. Clean Desk oder Vertretungsplan).
Was danach noch an Gefahr übrig bleibt, heißt **Restrisiko**. Das muss die Leitung bewusst bestätigen.

**Merke:** Schutzbedarf begründen → Maßnahmen je Schutzziel technisch **und** organisatorisch zuordnen → Restrisiko benennen.`,
      steps: [
        {
          type: 'explain',
          title: 'So gehst du in der Prüfung vor',
          body: `Eine typische AP1-Situation: *„Sie richten einen Arbeitsplatz für … ein. Führen Sie eine Schutzbedarfsanalyse durch und schlagen Sie Maßnahmen vor.“* Ein bewährtes Schema:

1. **Objekte erfassen:** Welche Anwendungen/Daten, welches Gerät, welcher Raum, welche Verbindungen (LAN, WLAN, VPN, Internet)?
2. **Schutzbedarf je Grundwert** bestimmen und mit einem **Schadensszenario begründen** („hoch, weil Gehaltsdaten nach DSGVO … und ein Abfluss Bußgelder und Imageschaden verursachen kann“).
3. **Maximumprinzip** auf Gerät, Raum und Verbindungen anwenden; Kumulations-/Verteilungseffekt prüfen.
4. **Maßnahmen** den Schutzzielen zuordnen – **technisch** und **organisatorisch**:

| Schutzziel | technische Maßnahmen | organisatorische Maßnahmen |
|---|---|---|
| Vertraulichkeit | Festplattenverschlüsselung, Zugriffsrechte, VPN/TLS, Bildschirmsperre | Clean-Desk-Regel, Schulung, Besucherregelung |
| Integrität | Schreibrechte begrenzen, Versionierung, Protokollierung, Signatur | Vier-Augen-Prinzip, Freigabeprozesse |
| Verfügbarkeit | Backup, USV, Redundanz, Ersatzgerät | Wartungsvertrag, Notfallplan, Vertretungsregelung |

5. **Restrisiko** benennen und von der Leitung bestätigen lassen.

**Tipp:** In offenen Aufgaben gibt es Punkte für **Begründungen**. „hoch“ allein bringt wenig – „hoch, weil …“ bringt die volle Punktzahl.`,
        },
        {
          type: 'example',
          title: 'Arbeitsplatz im Außendienst',
          problem: `Herr Krüger (Vertrieb Berlin) erhält ein neues Notebook. Er bearbeitet unterwegs Angebote mit Kundendaten (Namen, Kontaktdaten, Konditionen), nutzt E-Mail und greift über VPN auf die Warenwirtschaft zu. Bestimme den Schutzbedarf und nenne je Schutzziel zwei Maßnahmen.`,
          steps: [
            { label: 'Vertraulichkeit: hoch', body: 'Kundendaten (personenbezogen) und Konditionen (Geschäftsgeheimnis). Verlust → DSGVO-Meldepflicht, Wettbewerbsnachteil. Maßnahmen: **BitLocker-Verschlüsselung mit Pre-Boot-PIN**, **VPN** für alle Firmenzugriffe; Blickschutzfolie, Regel „Gerät nie unbeaufsichtigt im Auto“.' },
            { label: 'Integrität: hoch', body: 'Falsche Konditionen in Angeboten → finanzieller Schaden. Maßnahmen: Angebote nur in der Warenwirtschaft (zentral, protokolliert), Rechte nach Rolle; Vier-Augen-Freigabe für Sonderrabatte.' },
            { label: 'Verfügbarkeit: normal', body: 'Daten liegen zentral (Verteilungseffekt), Ausfall des Notebooks für 1–2 Tage ist überbrückbar. Maßnahmen: Ersatzgerät im Pool, Synchronisation der Dateien mit dem Server (OneDrive/Fileserver) – kein lokales Ablegen.' },
            { label: 'Verbindung', body: 'Fernzugriff über das Internet = **Außenverbindung** → kritisch → VPN mit MFA.' },
          ],
          result: 'V hoch, I hoch, A normal; Kernmaßnahmen: Verschlüsselung, VPN + MFA, zentrale Datenhaltung, Ersatzgerät, Schulung.',
        },
        {
          type: 'check',
          question: {
            id: 's01-c11', kind: 'free', skill: 'sich.schutzbedarf', difficulty: 2,
            prompt: 'Der Empfangs-PC der Elektro Krämer GmbH dient nur zum Anzeigen des Besucherplans und zum Ausdrucken von Besucherausweisen (Name, Firma des Besuchers). Bestimme den Schutzbedarf für **Vertraulichkeit** und **begründe** deine Einschätzung.',
            modelAnswer: 'Vertraulichkeit: normal. Begründung: Es werden nur wenige personenbezogene Daten (Name, Firma) verarbeitet, die keine besonderen Kategorien sind; ein Bekanntwerden hätte begrenzte, überschaubare Auswirkungen für Betroffene und Unternehmen. Trotzdem gelten Basismaßnahmen: Bildschirmsperre, Bildschirm nicht für Besucher einsehbar, Standardbenutzer ohne Adminrechte, kein Zugriff auf andere Firmendaten.',
            keywords: ['normal', 'begrenzt', 'personenbezogen', 'Begründung', 'Bildschirmsperre'],
            explanation: 'Wichtig ist die Begründung über ein Schadensszenario (hier: Datenschutz/Selbstbestimmung, begrenzte Auswirkung). Die Antwort „hoch“ wäre mit guter Begründung (z. B. Besucherliste verrät Geschäftspartner) ebenfalls vertretbar – entscheidend ist die nachvollziehbare Argumentation.',
          },
        },
        { type: 'practice', title: 'Übung: Schutzbedarf und Maßnahmen', questionIds: ['s01-q026', 's01-q027', 's01-q028', 's01-q029', 's01-q030', 's01-q031', 's01-q032', 's01-q033', 's01-q034'], count: 5, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Schema: Objekte erfassen → Schutzbedarf je Grundwert begründen → vererben → Maßnahmen zuordnen → Restrisiko.',
            'Jede Einstufung mit einem Schadensszenario begründen – das bringt die Punkte.',
            'Maßnahmen technisch UND organisatorisch, passend zum jeweiligen Schutzziel.',
            'Außenverbindungen (VPN, Internet) sind kritische Kommunikationsverbindungen.',
          ],
        },
      ],
    },
  ],

  /* ================================================================== */
  questions: [
    {
      id: 's01-q001', kind: 'match', skill: 'sich.grundbegriffe', difficulty: 1,
      prompt: 'Ordne die Begriffe ihrer Beschreibung zu.',
      left: ['Datenschutz', 'Datensicherheit', 'Informationssicherheit', 'IT-Sicherheit'],
      right: ['Schutz der Person und ihres Rechts auf informationelle Selbstbestimmung', 'Schutz von Daten vor Verlust, Manipulation und unbefugtem Zugriff', 'Schutz aller Informationen – auch auf Papier und im Gespräch', 'Schutz von Informationen in IT-Systemen und der Systeme selbst'],
      answer: [0, 1, 2, 3],
      explanation: 'Informationssicherheit ist der umfassendste Begriff; Datenschutz schützt Menschen, Datensicherheit schützt Daten.',
    },
    {
      id: 's01-q002', kind: 'single', skill: 'sich.grundbegriffe', difficulty: 1,
      prompt: 'Konstruktionszeichnungen ohne jeden Personenbezug werden auf einem Server gespeichert. Welche Aussage trifft zu?',
      options: ['Für sie ist Datensicherheit relevant, die DSGVO dagegen nicht.', 'Für sie gilt die DSGVO uneingeschränkt.', 'Sie müssen weder gesichert noch geschützt werden.', 'Datensicherheit gilt nur für personenbezogene Daten.'],
      answer: 0,
      distractors: {
        '1': { why: 'Die DSGVO gilt nur für personenbezogene Daten.', error: 'datenschutz-datensicherheit' },
        '2': { why: 'Konstruktionsdaten sind wertvolle Geschäftsgeheimnisse – Vertraulichkeit, Integrität und Verfügbarkeit sind wichtig.', error: 'datenschutz-datensicherheit' },
        '3': { why: 'Datensicherheit schützt alle Daten, nicht nur personenbezogene.', error: 'datenschutz-datensicherheit' },
      },
      explanation: 'Ohne Personenbezug kein Datenschutz im Sinne der DSGVO – aber selbstverständlich Datensicherheit (Backup, Zugriffsrechte, ggf. Verschlüsselung).',
    },
    {
      id: 's01-q003', kind: 'table', skill: 'sich.schutzziele', difficulty: 2,
      prompt: 'Trage für jeden Vorfall das **hauptsächlich verletzte Schutzziel** ein (Vertraulichkeit, Integrität, Verfügbarkeit, Authentizität oder Verbindlichkeit).',
      columns: [{ key: 'z', label: 'Schutzziel', type: 'text' }],
      rows: [
        { label: 'Ein USB-Stick mit unverschlüsselten Kundendaten geht in der S-Bahn verloren.', cells: { z: { answer: 'Vertraulichkeit' } } },
        { label: 'Wegen eines abgelaufenen Zertifikats ist der Webshop für Kunden nicht nutzbar.', cells: { z: { answer: 'Verfügbarkeit' } } },
        { label: 'Ein Angreifer ändert in einer Rechnung (PDF) die IBAN.', cells: { z: { answer: 'Integrität', accept: ['Integritaet'] } } },
        { label: 'Ein Betrüger ruft an und gibt sich als Mitarbeiter der Hausbank aus.', cells: { z: { answer: 'Authentizität', accept: ['Authentizitaet'] } } },
        { label: 'Ein Mitarbeiter bestreitet, eine Löschung im ERP ausgelöst zu haben; es gibt kein Protokoll.', cells: { z: { answer: 'Verbindlichkeit', accept: ['Nichtabstreitbarkeit', 'Zurechenbarkeit'] } } },
      ],
      hints: ['Frage dich: Wurde etwas gelesen, verändert, blockiert, vorgetäuscht oder abgestritten?'],
      explanation: 'Gelesen → Vertraulichkeit · nicht nutzbar → Verfügbarkeit · verändert → Integrität · vorgetäuschte Identität → Authentizität · abgestritten/nicht zuzuordnen → Verbindlichkeit (Zurechenbarkeit).',
    },
    {
      id: 's01-q004', kind: 'free', skill: 'sich.schutzziele', difficulty: 2,
      prompt: 'Erläutern Sie den Unterschied zwischen den Schutzzielen **Integrität** und **Authentizität** jeweils an einem Beispiel aus dem Büroalltag.',
      modelAnswer: 'Integrität bedeutet, dass Daten vollständig und unverändert sind bzw. Änderungen erkannt werden. Beispiel: Eine Preisliste darf nicht unbemerkt verfälscht werden – Schreibrechte nur für den Vertrieb und Versionierung sichern die Integrität. Authentizität bedeutet, dass ein Kommunikationspartner oder eine Information echt ist, also tatsächlich von dem angegebenen Absender stammt. Beispiel: Eine Mail „vom Chef“ mit Zahlungsanweisung muss wirklich vom Chef kommen – Rückruf über die bekannte Nummer oder signierte Mails sichern die Authentizität.',
      keywords: ['unverändert', 'Änderung erkennbar', 'echt', 'Absender', 'Beispiel'],
      explanation: 'Integrität = Unverfälschtheit des Inhalts; Authentizität = Echtheit der Herkunft/Identität. Eine digitale Signatur schützt beides.',
    },
    {
      id: 's01-q005', kind: 'multi', skill: 'sich.schutzziele', difficulty: 1,
      prompt: 'Welche Maßnahmen verbessern vor allem die **Verfügbarkeit**?',
      options: ['Unterbrechungsfreie Stromversorgung (USV) für den Server', 'Festplattenverschlüsselung mit BitLocker', 'Tägliches Backup mit getesteter Wiederherstellung', 'Wartungsvertrag mit 4-Stunden-Reaktionszeit', 'Bildschirmsperre nach 5 Minuten'],
      answer: [0, 2, 3],
      explanation: 'USV, Backup und Wartungsvertrag sorgen dafür, dass Systeme/Daten nutzbar bleiben bzw. schnell wieder nutzbar sind. Verschlüsselung und Bildschirmsperre schützen die Vertraulichkeit.',
    },
    {
      id: 's01-q006', kind: 'text', skill: 'sich.schutzziele', difficulty: 1,
      prompt: 'Welches Schutzziel wird **hauptsächlich** verletzt, wenn ein Kollege im Großraumbüro das Passwort eines anderen über die Schulter mitliest?',
      accept: ['Vertraulichkeit', 'Confidentiality'],
      misconceptions: [{ answer: 'Authentizität', error: 'schutzziel-verwechselt', why: 'Die Authentizität ist erst betroffen, wenn er sich mit dem Passwort als jemand anderes anmeldet. Das Mitlesen selbst verletzt die Vertraulichkeit.' }],
      explanation: 'Ein Unbefugter erhält Kenntnis von einer geheimen Information → **Vertraulichkeit** (Shoulder Surfing).',
    },
    {
      id: 's01-q007', kind: 'match', skill: 'sich.risiko', difficulty: 2,
      prompt: 'Ordne die Begriffe den Beispielen zu.',
      left: ['Bedrohung', 'Schwachstelle', 'Gefährdung', 'Risiko'],
      right: ['Schadsoftware, die per Mail verbreitet wird', 'Office erlaubt das Ausführen von Makros aus Internet-Dokumenten', 'Makro-Schadsoftware trifft auf PCs, die Makros ausführen', '10 % pro Jahr × 50.000 € Schaden = 5.000 € pro Jahr'],
      answer: [0, 1, 2, 3],
      explanation: 'Bedrohung (allgemein) + Schwachstelle (Lücke) = Gefährdung (konkret); Risiko = Wahrscheinlichkeit × Schaden.',
    },
    {
      id: 's01-q008', kind: 'number', skill: 'sich.risiko', difficulty: 2,
      prompt: 'Ein Notebook-Diebstahl tritt bei der Elektro Krämer GmbH im Durchschnitt **einmal in 4 Jahren** auf. Der Schaden (Gerät, Arbeitszeit, Datenschutzmeldung) beträgt **6.000 €**. Berechne das Risiko in **€ pro Jahr**.',
      answer: 1500, unit: '€',
      hints: ['Einmal in 4 Jahren = Wahrscheinlichkeit 1/4 = 0,25 pro Jahr.'],
      misconceptions: [{ answer: '24000', error: 'risiko-formel', why: 'Einmal in 4 Jahren heißt 1/4 pro Jahr – nicht mal 4.' }],
      explanation: '1/4 × 6.000 € = **1.500 € pro Jahr**.',
    },
    {
      id: 's01-q009', kind: 'order', skill: 'sich.risiko', difficulty: 1,
      prompt: 'Bringe die Phasen des Risikomanagements in die richtige Reihenfolge.',
      items: ['Risiken identifizieren', 'Risiken analysieren und bewerten', 'Risiken behandeln (Maßnahmen festlegen)', 'Risiken überwachen und erneut bewerten'],
      explanation: 'Identifizieren → Bewerten → Behandeln → Überwachen – danach beginnt der Kreislauf von vorn.',
    },
    {
      id: 's01-q010', kind: 'match', skill: 'sich.risiko', difficulty: 2,
      prompt: 'Ordne die Situationen der Risikostrategie zu.',
      left: ['Die Firma schließt mit dem Systemhaus einen Vertrag, der Ausfallkosten des Servers erstattet.', 'Das veraltete FTP-Protokoll wird komplett abgeschaltet, Dateien werden nur noch per SFTP übertragen.', 'Für alle Admin-Konten wird MFA eingeführt.', 'Der seltene Ausfall des Kantinen-Infoscreens wird bewusst hingenommen.'],
      right: ['übertragen', 'vermeiden', 'reduzieren', 'akzeptieren'],
      answer: [0, 1, 2, 3],
      explanation: 'Finanzielle Folgen auf Dritte → übertragen; riskante Technik ganz weglassen → vermeiden; Wahrscheinlichkeit senken → reduzieren; bewusst tragen → akzeptieren.',
    },
    {
      id: 's01-q011', kind: 'free', skill: 'sich.risiko', difficulty: 3,
      prompt: 'Erläutern Sie, warum die Entscheidung, ein Restrisiko zu **akzeptieren**, von der Geschäftsführung getroffen und dokumentiert werden muss.',
      modelAnswer: 'Die Geschäftsführung trägt die Gesamtverantwortung für das Unternehmen und haftet für Schäden; nur sie kann abwägen, ob die Kosten einer Maßnahme den möglichen Schaden rechtfertigen, und Budget freigeben. Die IT darf diese unternehmerische Entscheidung nicht allein treffen. Die Dokumentation macht nachvollziehbar, dass das Risiko bewusst und begründet getragen wurde (Nachweis gegenüber Prüfern, Versicherungen, Aufsichtsbehörden) und dass es regelmäßig neu bewertet wird.',
      keywords: ['Verantwortung', 'Haftung', 'Abwägung', 'Nachweis', 'Dokumentation'],
      explanation: 'Risikoakzeptanz ist eine Managemententscheidung, keine technische – und muss nachweisbar sein.',
    },
    {
      id: 's01-q012', kind: 'table', skill: 'sich.risiko', difficulty: 2,
      prompt: `Die IT bewertet Risiken mit Punkten: **Risikopunkte = Wahrscheinlichkeit (1–4) × Schadensausmaß (1–4)**. Trage die Risikopunkte und die Priorität ein (1 = zuerst behandeln).

| Bedrohung | Wahrscheinlichkeit | Schaden |
|---|---|---|
| Phishing mit Kontoübernahme | 4 | 3 |
| Brand im Serverraum | 1 | 4 |
| Ausfall eines Arbeitsplatzdruckers | 3 | 1 |`,
      columns: [
        { key: 'p', label: 'Risikopunkte', type: 'number' },
        { key: 'r', label: 'Priorität', type: 'number' },
      ],
      rows: [
        { label: 'Phishing mit Kontoübernahme', cells: { p: { answer: '12' }, r: { answer: '1' } } },
        { label: 'Brand im Serverraum', cells: { p: { answer: '4' }, r: { answer: '2' } } },
        { label: 'Ausfall eines Arbeitsplatzdruckers', cells: { p: { answer: '3' }, r: { answer: '3' } } },
      ],
      explanation: '4 × 3 = 12, 1 × 4 = 4, 3 × 1 = 3 → Priorität Phishing vor Brand vor Druckerausfall. Hinweis: Bei existenzbedrohenden Schäden (Brand) wird oft trotzdem gehandelt – die Punkte sind ein Hilfsmittel, keine Automatik.',
    },
    {
      id: 's01-q013', kind: 'match', skill: 'sich.angriffe', difficulty: 1,
      prompt: 'Ordne die Schadsoftware ihrer Beschreibung zu.',
      left: ['Ransomware', 'Trojaner', 'Keylogger', 'Rootkit', 'Wurm'],
      right: ['verschlüsselt Daten und fordert Lösegeld', 'tarnt sich als nützliches Programm und enthält eine versteckte Schadfunktion', 'zeichnet Tastatureingaben auf', 'versteckt sich tief im Betriebssystem und verschleiert andere Schadsoftware', 'verbreitet sich selbstständig über Netzwerke'],
      answer: [0, 1, 2, 3, 4],
      explanation: 'Siehe Tabelle „Arten von Schadsoftware“.',
    },
    {
      id: 's01-q014', kind: 'match', skill: 'sich.angriffe', difficulty: 2,
      prompt: 'Ordne die Social-Engineering-Methoden den Situationen zu.',
      left: ['Baiting', 'Vishing', 'Pretexting', 'Quishing', 'Dumpster Diving'],
      right: ['Auf dem Firmenparkplatz liegt ein USB-Stick mit der Aufschrift „Boni 2026“.', 'Ein Anrufer gibt sich als Bankmitarbeiter aus und fragt nach einer TAN.', 'Ein angeblicher Brandschutzprüfer verlangt Zutritt zum Serverraum.', 'Ein Aufkleber mit QR-Code am Parkautomaten führt auf eine gefälschte Bezahlseite.', 'Jemand durchsucht die Papiertonne nach ausgedruckten Kundenlisten.'],
      answer: [0, 1, 2, 3, 4],
      explanation: 'Köder → Baiting; Telefon → Vishing; erfundene Rolle → Pretexting; QR-Code → Quishing; Müll durchsuchen → Dumpster Diving.',
    },
    {
      id: 's01-q015', kind: 'multi', skill: 'sich.angriffe', difficulty: 2,
      prompt: 'Eine Mail fordert die Buchhaltung auf, „wegen einer vertraulichen Firmenübernahme“ **sofort** 48.500 € auf ein neues Konto zu überweisen – angeblich vom Geschäftsführer, der „gerade nicht erreichbar“ ist. Welche **psychologischen Hebel** werden genutzt?',
      options: ['Autorität', 'Zeitdruck', 'Geheimhaltung / Vertraulichkeit', 'Neugier auf ein Gewinnspiel', 'Mitleid'],
      answer: [0, 1, 2],
      explanation: 'Klassischer **CEO-Fraud**: Autorität (Chef), Zeitdruck (sofort), Geheimhaltung (niemandem davon erzählen, Chef nicht erreichbar). Gegenmaßnahme: Rückrufprinzip über bekannte Nummer, Vier-Augen-Prinzip bei Zahlungen.',
    },
    {
      id: 's01-q016', kind: 'free', skill: 'sich.angriffe', difficulty: 2,
      prompt: 'Nennen Sie vier Merkmale, an denen Mitarbeitende eine Phishing-Mail erkennen können.',
      modelAnswer: '1. Absenderadresse mit fremder oder leicht abgewandelter Domain. 2. Unpersönliche Anrede bzw. untypische Sprache/Rechtschreibfehler. 3. Erzeugter Zeitdruck oder Drohung (Kontosperrung, Löschung). 4. Links, deren tatsächliches Ziel (Mouse-over) nicht zur Firma passt. 5. Aufforderung zur Eingabe von Passwörtern/TANs oder zum Öffnen unerwarteter Anhänge (z. B. mit Makros).',
      keywords: ['Absender', 'Domain', 'Zeitdruck', 'Link', 'Passwort', 'Anhang'],
      explanation: 'Mindestens vier dieser Merkmale nennen. Ergänzend: Bei Verdacht nicht klicken, sondern melden.',
    },
    {
      id: 's01-q017', kind: 'single', skill: 'sich.angriffe', difficulty: 1,
      prompt: 'Worin unterscheidet sich ein **Virus** von einem **Wurm**?',
      options: ['Ein Virus benötigt eine Wirtsdatei und die Ausführung durch den Benutzer; ein Wurm verbreitet sich selbstständig über das Netzwerk.', 'Ein Wurm verschlüsselt Daten, ein Virus nicht.', 'Ein Virus befällt nur Smartphones.', 'Es gibt keinen Unterschied.'],
      answer: 0,
      distractors: {
        '1': { why: 'Das Verschlüsseln ist das Merkmal von Ransomware – unabhängig vom Verbreitungsweg.', error: 'malware-verwechselt' },
        '2': { why: 'Viren gibt es auf allen Plattformen.', error: 'malware-verwechselt' },
        '3': { why: 'Der Verbreitungsweg unterscheidet sie.', error: 'malware-verwechselt' },
      },
      explanation: 'Virus = parasitär (Wirtsdatei), Wurm = eigenständig und selbstverbreitend.',
    },
    {
      id: 's01-q018', kind: 'text', skill: 'sich.angriffe', difficulty: 2,
      prompt: 'Wie nennt man einen Angriff, der eine Sicherheitslücke ausnutzt, für die der Hersteller noch **keinen Patch** veröffentlicht hat (weil die Lücke noch unbekannt ist)?',
      accept: ['Zero-Day-Exploit', 'Zero-Day', 'Zero Day Exploit', '0-Day', 'Zero-Day-Angriff', 'Zero Day', 'Zeroday'],
      explanation: '**Zero-Day-Exploit**: Der Hersteller hatte „null Tage“ Zeit, die Lücke zu schließen. Schutz: Defense in Depth (Segmentierung, Least Privilege, EDR, Backups), schnelle Updates sobald verfügbar.',
    },
    {
      id: 's01-q019', kind: 'free', skill: 'sich.angriffe', difficulty: 2,
      prompt: 'Ein Kollege findet auf dem Firmenparkplatz einen USB-Stick mit der Aufschrift „Gehälter Geschäftsleitung“ und will „mal kurz nachsehen, wem er gehört“. Beschreiben Sie das richtige Vorgehen und begründen Sie es.',
      modelAnswer: 'Den Stick nicht an einen Firmen- oder Privatrechner anschließen, sondern ungeöffnet bei der IT-Abteilung bzw. dem Informationssicherheitsbeauftragten abgeben. Begründung: Es handelt sich wahrscheinlich um Baiting – der Stick kann Schadsoftware enthalten, die beim Anstecken automatisch oder beim Öffnen einer Datei ausgeführt wird, oder sich als Tastatur ausgeben (BadUSB) und Befehle eingeben. Die neugierig machende Aufschrift ist typisch für Social Engineering. Die IT kann den Stick ggf. isoliert untersuchen; zusätzlich kann eine Sperre für USB-Massenspeicher sinnvoll sein.',
      keywords: ['nicht anschließen', 'IT melden', 'Baiting', 'Schadsoftware', 'BadUSB'],
      explanation: 'Baiting nutzt Neugier aus. Fundstücke gehören ungeöffnet zur IT.',
    },
    {
      id: 's01-q020', kind: 'multi', skill: 'sich.angriffe', difficulty: 2,
      prompt: 'Welche Maßnahmen schützen wirksam vor **CEO-Fraud**?',
      options: ['Rückruf beim Auftraggeber über eine bekannte, intern hinterlegte Telefonnummer', 'Vier-Augen-Prinzip für Überweisungen ab einer festgelegten Summe', 'Schulung der Mitarbeitenden in Buchhaltung und Assistenz', 'Antwort auf die Mail mit der Bitte um Bestätigung', 'Größeres Postfach für die Buchhaltung'],
      answer: [0, 1, 2],
      explanation: 'Eine Antwort auf die Mail geht an den Betrüger – Rückruf nur über bekannte Nummern. Organisatorische Kontrollen und Schulung sind die wirksamsten Mittel.',
    },
    {
      id: 's01-q021', kind: 'match', skill: 'sich.grundschutz', difficulty: 2,
      prompt: 'Ordne die BSI-Standards ihrem Inhalt zu.',
      left: ['BSI-Standard 200-1', 'BSI-Standard 200-2', 'BSI-Standard 200-3', 'BSI-Standard 200-4'],
      right: ['Managementsysteme für Informationssicherheit (ISMS)', 'IT-Grundschutz-Methodik', 'Risikoanalyse auf der Basis von IT-Grundschutz', 'Business Continuity Management (Notfallmanagement)'],
      answer: [0, 1, 2, 3],
      explanation: '200-1 ISMS · 200-2 Methodik · 200-3 Risikoanalyse · 200-4 BCM.',
    },
    {
      id: 's01-q022', kind: 'match', skill: 'sich.grundschutz', difficulty: 2,
      prompt: 'Ordne die Vorgehensweisen der IT-Grundschutz-Methodik ihrer Beschreibung zu.',
      left: ['Basis-Absicherung', 'Kern-Absicherung', 'Standard-Absicherung'],
      right: ['breit, aber flach: nur die Basis-Anforderungen für alle Bereiche', 'schmal, aber tief: besonders kritische Werte zuerst vollständig absichern', 'breit und tief: umfassender Schutz aller Bereiche'],
      answer: [0, 1, 2],
      explanation: 'Basis = schneller Einstieg, Kern = Kronjuwelen, Standard = umfassend (Ziel).',
    },
    {
      id: 's01-q023', kind: 'single', skill: 'sich.grundschutz', difficulty: 2,
      prompt: 'Was ist das **IT-Grundschutz-Kompendium**?',
      options: ['Eine Sammlung von Bausteinen mit Gefährdungen und Sicherheitsanforderungen zu typischen Themen wie Clients, Servern, Netzen und Organisation', 'Ein Gesetz, das für alle Unternehmen verbindlich ist', 'Eine Virenschutzsoftware des BSI', 'Ein Verzeichnis aller Datenpannen in Deutschland'],
      answer: 0,
      distractors: {
        '1': { why: 'Der IT-Grundschutz ist eine Empfehlung/Methode, kein Gesetz (für Bundesbehörden und Zertifizierungen wird er allerdings verbindlich vorgegeben).', error: 'grundschutz-missverstanden' },
        '2': { why: 'Das BSI stellt Methoden und Empfehlungen bereit, keine Virenschutzsoftware.', error: 'grundschutz-missverstanden' },
        '3': { why: 'Datenpannen werden den Datenschutz-Aufsichtsbehörden gemeldet.', error: 'grundschutz-missverstanden' },
      },
      explanation: 'Das Kompendium ist der „Katalog“ (Bausteine + Anforderungen), die BSI-Standards beschreiben das Vorgehen.',
    },
    {
      id: 's01-q024', kind: 'order', skill: 'sich.grundschutz', difficulty: 3,
      prompt: 'Bringe die Schritte des Sicherheitsprozesses nach IT-Grundschutz in die richtige Reihenfolge.',
      items: ['Initiierung: Leitung übernimmt Verantwortung, Leitlinie, Geltungsbereich', 'Strukturanalyse', 'Schutzbedarfsfeststellung', 'Modellierung', 'IT-Grundschutz-Check', 'Umsetzung der Maßnahmen', 'Aufrechterhaltung und kontinuierliche Verbesserung'],
      explanation: 'Ohne Rückhalt der Leitung kein Sicherheitsprozess. Danach Struktur → Schutzbedarf → Modellierung → Check → (Risikoanalyse) → Umsetzung → PDCA-Verbesserung.',
    },
    {
      id: 's01-q025', kind: 'match', skill: 'sich.grundschutz', difficulty: 3,
      prompt: 'Ordne die Bausteinschichten des Kompendiums dem passenden Thema zu.',
      left: ['ORP', 'CON', 'OPS', 'INF', 'NET'],
      right: ['Organisation und Personal, z. B. Identitäts- und Berechtigungsmanagement', 'Konzepte und Vorgehensweisen, z. B. Datensicherungskonzept', 'Betrieb, z. B. Schutz vor Schadprogrammen', 'Infrastruktur, z. B. Serverraum, Büroarbeitsplatz', 'Netze und Kommunikation, z. B. WLAN-Betrieb'],
      answer: [0, 1, 2, 3, 4],
      explanation: 'Prozess-Bausteine: ISMS, ORP, CON, OPS, DER. System-Bausteine: APP, SYS, IND, NET, INF.',
    },
    {
      id: 's01-q026', kind: 'order', skill: 'sich.schutzbedarf', difficulty: 1,
      prompt: 'Ordne die Schutzbedarfskategorien nach dem BSI aufsteigend (geringster Schutzbedarf zuerst).',
      items: ['normal – Schadensauswirkungen begrenzt und überschaubar', 'hoch – Schadensauswirkungen können beträchtlich sein', 'sehr hoch – Schadensauswirkungen können existenziell bedrohlich sein'],
      explanation: 'normal < hoch < sehr hoch.',
    },
    {
      id: 's01-q027', kind: 'match', skill: 'sich.schutzbedarf', difficulty: 2,
      prompt: 'Ordne die Begriffe ihrer Bedeutung zu.',
      left: ['Maximumprinzip', 'Kumulationseffekt', 'Verteilungseffekt'],
      right: ['Ein System übernimmt je Grundwert den höchsten Schutzbedarf der Anwendungen, die darauf laufen.', 'Viele kleinere Schäden summieren sich, der Schutzbedarf kann steigen.', 'Eine Anwendung ist redundant auf mehrere Systeme verteilt, der Schutzbedarf eines einzelnen Systems kann sinken.'],
      answer: [0, 1, 2],
      explanation: 'Maximumprinzip = Grundregel; Kumulation = Erhöhung; Verteilung = Absenkung (meist Verfügbarkeit).',
    },
    {
      id: 's01-q028', kind: 'table', skill: 'sich.schutzbedarf', difficulty: 2,
      prompt: `Bestimme den Schutzbedarf der Systeme nach dem Maximumprinzip (normal / hoch / sehr hoch).

| Anwendung | V | I | A | läuft auf |
|---|---|---|---|---|
| Finanzbuchhaltung | hoch | sehr hoch | hoch | SRV-01 |
| Intranet | normal | normal | normal | SRV-01 |
| Webshop | hoch | hoch | sehr hoch | SRV-02 |
| E-Mail | hoch | normal | hoch | SRV-02 |`,
      columns: [
        { key: 'v', label: 'V', type: 'text' },
        { key: 'i', label: 'I', type: 'text' },
        { key: 'a', label: 'A', type: 'text' },
      ],
      rows: [
        { label: 'SRV-01', cells: { v: { answer: 'hoch' }, i: { answer: 'sehr hoch', accept: ['sehr-hoch', 'sehrhoch'] }, a: { answer: 'hoch' } } },
        { label: 'SRV-02', cells: { v: { answer: 'hoch' }, i: { answer: 'hoch' }, a: { answer: 'sehr hoch', accept: ['sehr-hoch', 'sehrhoch'] } } },
      ],
      misconceptions: [
        { cell: '0:i', answer: 'normal', error: 'maximumprinzip', why: 'Das höchste Niveau zählt: Die Finanzbuchhaltung hat bei Integrität „sehr hoch“.' },
        { cell: '1:i', answer: 'normal', error: 'maximumprinzip', why: 'Der Webshop hat bei Integrität „hoch“ – das Maximum zählt.' },
      ],
      explanation: 'SRV-01: V max(hoch, normal) = hoch, I max(sehr hoch, normal) = sehr hoch, A max(hoch, normal) = hoch. SRV-02: V hoch, I max(hoch, normal) = hoch, A max(sehr hoch, hoch) = sehr hoch.',
    },
    {
      id: 's01-q029', kind: 'free', skill: 'sich.schutzbedarf', difficulty: 3,
      prompt: 'Der Webshop der Elektro Krämer GmbH (Verfügbarkeit „sehr hoch“) läuft auf zwei Servern in einem Cluster an zwei Brandabschnitten. Ein Server allein kann die Last tragen. Erläutern Sie, welchen Verfügbarkeits-Schutzbedarf ein **einzelner** Clusterknoten erhält und warum.',
      modelAnswer: 'Nach dem Maximumprinzip hätte jeder Knoten zunächst „sehr hoch“. Wegen des Verteilungseffekts kann der Schutzbedarf eines einzelnen Knotens aber herabgesetzt werden, z. B. auf „hoch“: Fällt ein Knoten aus, übernimmt der andere die Last, der Webshop bleibt verfügbar. Der Schaden durch den Ausfall eines einzelnen Knotens ist daher begrenzter. Der Cluster als Ganzes behält „sehr hoch“. Die Entscheidung muss begründet und dokumentiert werden; außerdem dürfen beide Knoten keine gemeinsame Schwachstelle haben (gleicher Raum, gleiche Stromversorgung).',
      keywords: ['Verteilungseffekt', 'Maximumprinzip', 'Redundanz', 'hoch', 'Begründung'],
      explanation: 'Verteilungseffekt: Redundanz senkt den Schutzbedarf des einzelnen Systems (nur Verfügbarkeit!).',
    },
    {
      id: 's01-q030', kind: 'multi', skill: 'sich.schutzbedarf', difficulty: 2,
      prompt: 'Welche Kommunikationsverbindungen gelten bei der Schutzbedarfsfeststellung nach BSI als **kritisch**?',
      options: ['Die VPN-Verbindung zwischen den Standorten Hamburg und Berlin über das Internet', 'Die Verbindung des Lohnbuchhaltungs-PCs zum Personalserver', 'Das Gäste-WLAN, über das keine internen Personaldaten fließen dürfen', 'Das Patchkabel zwischen Monitor und Grafikkarte', 'Die Internetanbindung der Firewall'],
      answer: [0, 1, 2, 4],
      explanation: 'Kritisch: Außenverbindungen (VPN, Internet), Verbindungen mit hochschutzbedürftigen Daten (Personalserver) und Verbindungen, über die bestimmte Daten nicht übertragen werden dürfen (Gäste-WLAN). Das Monitorkabel ist keine Kommunikationsverbindung im Sinne des Netzplans.',
    },
    {
      id: 's01-q031', kind: 'multi', skill: 'sich.schutzbedarf', difficulty: 2,
      prompt: 'Welche der folgenden Punkte sind **Schadensszenarien** zur Bestimmung des Schutzbedarfs nach BSI-Standard 200-2?',
      options: ['Verstoß gegen Gesetze, Vorschriften oder Verträge', 'Beeinträchtigung des informationellen Selbstbestimmungsrechts', 'Negative Innen- oder Außenwirkung', 'Finanzielle Auswirkungen', 'Anzahl der Netzwerkports eines Switches'],
      answer: [0, 1, 2, 3],
      explanation: 'Die sechs Szenarien: Gesetze/Verträge, Selbstbestimmung, persönliche Unversehrtheit, Aufgabenerfüllung, Innen-/Außenwirkung, finanzielle Auswirkungen.',
    },
    {
      id: 's01-q032', kind: 'text', skill: 'sich.schutzbedarf', difficulty: 1,
      prompt: 'Wie heißt das Prinzip, nach dem ein Server den **höchsten** Schutzbedarf der auf ihm laufenden Anwendungen übernimmt?',
      accept: ['Maximumprinzip', 'Maximum-Prinzip', 'Maximalprinzip'],
      explanation: '**Maximumprinzip** (BSI-Standard 200-2).',
    },
    {
      id: 's01-q033', kind: 'free', skill: 'sich.schutzbedarf', difficulty: 3,
      prompt: 'Sie richten einen Arbeitsplatz für die **Lohnbuchhaltung** ein (Gehälter, Bankverbindungen, Krankmeldungen, Steuer-ID). Bestimmen Sie den Schutzbedarf für Vertraulichkeit, Integrität und Verfügbarkeit mit Begründung und nennen Sie je Schutzziel eine Maßnahme.',
      modelAnswer: 'Vertraulichkeit: sehr hoch – Gesundheitsdaten (Krankmeldungen) sind besondere Kategorien nach Art. 9 DSGVO; ein Abfluss kann Betroffene erheblich schädigen und hohe Bußgelder sowie Imageschaden verursachen. Maßnahme: Festplattenverschlüsselung, strenge Zugriffsrechte nur für Lohnbuchhaltung, Bildschirmsperre und Clean Desk. Integrität: hoch – falsche Gehälter oder Bankverbindungen führen zu finanziellen Schäden und Rechtsverstößen. Maßnahme: Vier-Augen-Prinzip bei Änderungen der Bankverbindung, Protokollierung. Verfügbarkeit: hoch (zum Abrechnungstermin) – verspätete Gehaltszahlung verstößt gegen Arbeitsverträge, außerhalb der Abrechnungstage ist ein kurzer Ausfall überbrückbar. Maßnahme: tägliche Datensicherung des Lohnsystems, Ersatzgerät und Vertretungsregelung.',
      keywords: ['sehr hoch', 'Art. 9', 'Gesundheitsdaten', 'Vier-Augen-Prinzip', 'Backup', 'Verschlüsselung'],
      explanation: 'Entscheidend ist die Begründung über Schadensszenarien. Andere gut begründete Einstufungen (z. B. Verfügbarkeit „normal“ außerhalb der Abrechnungsphase) sind vertretbar.',
    },
    {
      id: 's01-q034', kind: 'number', skill: 'sich.risiko', difficulty: 3,
      prompt: 'Das Risiko „Ransomware“ wird mit 15 % pro Jahr und 120.000 € Schaden bewertet. Eine Kombination aus EDR-Software und Offline-Backup kostet **9.000 € pro Jahr** und senkt die Wahrscheinlichkeit auf **5 %** und den Schaden auf **40.000 €**. Um wie viel Euro pro Jahr übersteigt die Risikoreduktion die Kosten der Maßnahme? (negativer Wert, falls sich die Maßnahme nicht lohnt)',
      answer: 7000, unit: '€',
      hints: ['Risiko vorher und nachher berechnen.', 'Reduktion − Kosten.'],
      misconceptions: [{ answer: '16000', error: 'risiko-kosten-vergessen', why: 'Das ist nur die Risikoreduktion – die Kosten der Maßnahme (9.000 €) müssen noch abgezogen werden.' }],
      explanation: 'Vorher: 0,15 × 120.000 € = 18.000 €/Jahr. Nachher: 0,05 × 40.000 € = 2.000 €/Jahr. Reduktion: 16.000 €/Jahr. Abzüglich Kosten 9.000 € → **7.000 €/Jahr** Nutzen. Die Maßnahme lohnt sich.',
    },
    {
      id: 's01-q035', kind: 'single', skill: 'sich.schutzbedarf', difficulty: 2,
      prompt: 'Für welchen Grundwert hilft der **Verteilungseffekt** (Daten liegen redundant auf zwei Servern) in der Regel **nicht**, den Schutzbedarf zu senken?',
      options: ['Vertraulichkeit', 'Verfügbarkeit', 'Bei beiden gleich', 'Bei keinem – Redundanz senkt nie den Schutzbedarf'],
      answer: 0,
      distractors: {
        '1': { why: 'Gerade für die Verfügbarkeit wirkt Redundanz: Fällt ein Server aus, übernimmt der andere.', error: 'kumulation-verteilung' },
        '2': { why: 'Eine Kopie vertraulicher Daten ist genauso vertraulich – sie verdoppelt eher die Angriffsfläche.', error: 'kumulation-verteilung' },
        '3': { why: 'Für die Verfügbarkeit kann Redundanz den Schutzbedarf eines Einzelsystems senken.', error: 'kumulation-verteilung' },
      },
      explanation: 'Redundanz verbessert die Verfügbarkeit, aber nicht die Vertraulichkeit – jede Kopie muss gleich gut geschützt werden.',
    },
    {
      id: 's01-q036', kind: 'table', skill: 'sich.schutzbedarf', difficulty: 1,
      prompt: 'Ein Lehrbuch teilt Schäden in **vier Schadenskategorien** ein. Ordne jeder Schadenskategorie die passende **Schutzbedarfskategorie** nach BSI zu (**normal**, **hoch** oder **sehr hoch**).',
      columns: [{ key: 'k', label: 'Schutzbedarfskategorie', type: 'text' }],
      rows: [
        { label: 'gering', cells: { k: { answer: 'normal' } } },
        { label: 'mittel', cells: { k: { answer: 'normal' } } },
        { label: 'hoch', cells: { k: { answer: 'hoch' } } },
        { label: 'sehr hoch', cells: { k: { answer: 'sehr hoch', accept: ['sehr-hoch', 'sehrhoch'] } } },
      ],
      misconceptions: [{ cell: '1:k', answer: 'hoch', error: 'schadenskategorie-schutzbedarf', why: 'Mittlere Schäden sind noch „begrenzt und überschaubar“ – das ist die Definition von **normal**. „Hoch“ beginnt erst bei beträchtlichen Schäden.' }],
      hints: ['Der Schutzbedarf hat nur drei Stufen – zwei Schadensstufen müssen sich eine teilen.', '„normal“ = begrenzt und überschaubar.'],
      explanation: '**gering → normal, mittel → normal, hoch → hoch, sehr hoch → sehr hoch.**\n\nDie beiden unteren Schadensstufen sind „begrenzt und überschaubar“ und gehören deshalb zusammen zur Kategorie normal. Häufiger Fehler: „mittel“ als „hoch“ einstufen.',
    },
    {
      id: 's01-q037', kind: 'free', skill: 'sich.schutzbedarf', difficulty: 2,
      prompt: 'Im Unterricht wurden **vier Schadenskategorien** (gering, mittel, hoch, sehr hoch) behandelt, die BSI-Schutzbedarfsfeststellung kennt aber nur **drei Schutzbedarfskategorien**. Erläutern Sie, wie beide Skalen zusammenhängen.',
      modelAnswer: 'Die Schadenskategorien beschreiben, wie groß ein möglicher Schaden ist. Die Schutzbedarfskategorien beschreiben, wie stark ein Objekt deshalb geschützt werden muss. Der BSI-Standard 200-2 kennt drei Schutzbedarfskategorien: normal (Schäden begrenzt und überschaubar), hoch (beträchtlich) und sehr hoch (existenzbedrohend, katastrophal). Geringe und mittlere Schäden sind beide begrenzt und überschaubar und werden deshalb gemeinsam der Kategorie normal zugeordnet; hohe Schäden entsprechen „hoch“, sehr hohe „sehr hoch“. Wo die Grenzen genau liegen (z. B. Euro-Beträge, tolerierbare Ausfallzeiten), legt jedes Unternehmen in einer Grenzwerttabelle fest.',
      keywords: ['begrenzt und überschaubar', 'gering und mittel', 'normal', 'beträchtlich', 'existenzbedrohend', 'Grenzwerttabelle'],
      explanation: 'Kernpunkt: gering + mittel → normal. Pluspunkt: Hinweis, dass das Unternehmen die Grenzen selbst festlegt und dass im BSI-Standard 200-3 „gering … sehr hoch“ die Stufen des **Risikos** sind.',
    },
    {
      id: 's01-q038', kind: 'free', skill: 'sich.schutzbedarf', difficulty: 3,
      prompt: 'Erläutern Sie den **Kumulationseffekt** am Beispiel der **Vertraulichkeit** und grenzen Sie ihn vom **Verteilungseffekt** ab.',
      modelAnswer: 'Kumulationseffekt: Liegen auf einem System viele Datenbestände, die einzeln nur einen normalen Schutzbedarf haben, kann der Gesamtschaden bei einer Verletzung deutlich größer sein. Beispiel: Auf einem Dateiserver liegen Preislisten, Lieferantenverträge, Kundenadressen und Projektpläne – jeweils Vertraulichkeit normal. Wer den Server übernimmt, erhält alles auf einmal und damit ein Gesamtbild des Unternehmens; der Schutzbedarf der Vertraulichkeit des Servers wird deshalb z. B. auf hoch angehoben. Verteilungseffekt: Ist eine Anwendung auf mehrere Systeme verteilt (Redundanz) oder liegen auf einem System nur unwichtige Teile, kann der Schutzbedarf des einzelnen Systems sinken. Bei der Vertraulichkeit hilft Redundanz dagegen nicht, weil jede Kopie gleich vertraulich ist. Beide Effekte werden nach dem Maximumprinzip geprüft und schriftlich begründet.',
      keywords: ['viele Datenbestände', 'Gesamtschaden', 'steigt', 'Verteilungseffekt', 'sinkt', 'Begründung'],
      explanation: 'Wichtig: Der Kumulationseffekt gilt für **jeden** Grundwert. Viele kennen nur das Beispiel Virtualisierungshost (Verfügbarkeit).',
    },
    {
      id: 's01-q039', kind: 'single', skill: 'sich.schutzbedarf', difficulty: 2,
      prompt: 'Welche Aussage zum **Kumulationseffekt** ist richtig?',
      options: [
        'Er kann bei jedem Grundwert auftreten, z. B. auch bei der Vertraulichkeit, wenn viele Datenbestände auf einem System liegen.',
        'Er gilt ausschließlich für die Verfügbarkeit.',
        'Er senkt den Schutzbedarf, weil Risiken auf mehrere Systeme verteilt werden.',
        'Er ersetzt das Maximumprinzip.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Die Verfügbarkeit ist nur das bekannteste Beispiel (Virtualisierungshost). Auch viele vertrauliche Datenbestände an einer Stelle erhöhen den möglichen Schaden.', error: 'kumulation-verteilung' },
        '2': { why: 'Das beschreibt den Verteilungseffekt. Kumulation erhöht den Schutzbedarf.', error: 'kumulation-verteilung' },
        '3': { why: 'Erst wird das Maximumprinzip angewendet, danach wird auf Kumulation und Verteilung geprüft.', error: 'kumulation-verteilung' },
      },
      explanation: 'Kumulation = Anhäufung: Viele kleine Schäden zusammen ergeben einen großen. Das kann bei Vertraulichkeit, Integrität und Verfügbarkeit passieren.',
    },
    {
      id: 's01-q040', kind: 'table', skill: 'sich.schutzbedarf.beleg', difficulty: 2,
      prompt: `Das IT-Systemhaus führt für die **Steuerkanzlei Albers** eine Schutzbedarfsfeststellung durch. Die Kanzlei hat diese Grenzwerte festgelegt:

| Schadensszenario | normal | hoch | sehr hoch |
|---|---|---|---|
| finanzieller Schaden | unter 5.000 € | 5.000 € bis 100.000 € | über 100.000 € |
| tolerierbare Ausfallzeit | mehr als 3 Tage | 8 Stunden bis 3 Tage | weniger als 8 Stunden |

- **Archivraum mit Mandantenakten (Papier):** Bekanntwerden ca. 150.000 € Schaden, Verfälschung ca. 20.000 €. Die Akten werden selten gebraucht; eine Woche ohne Zugang ist tragbar.
- **Gäste-WLAN im Besprechungsraum:** nur Internetzugang für Besucher, keine Kanzleidaten (Bekanntwerden und Verfälschung jeweils unter 1.000 €). Eine Woche Ausfall ist tragbar.
- **PC der Lohnbuchhaltung:** Bekanntwerden der Lohndaten ca. 60.000 €; falsch überwiesene Löhne ca. 120.000 €. Zum Monatsende darf er höchstens 4 Stunden ausfallen.

Trage den Schutzbedarf ein (**normal**, **hoch** oder **sehr hoch**).`,
      columns: [
        { key: 'v', label: 'Vertraulichkeit', type: 'text' },
        { key: 'i', label: 'Integrität', type: 'text' },
        { key: 'a', label: 'Verfügbarkeit', type: 'text' },
      ],
      rows: [
        { label: 'Archivraum Mandantenakten', cells: { v: { answer: 'sehr hoch', accept: ['sehr-hoch', 'sehrhoch'] }, i: { answer: 'hoch' }, a: { answer: 'normal' } } },
        { label: 'Gäste-WLAN', cells: { v: { answer: 'normal' }, i: { answer: 'normal' }, a: { answer: 'normal' } } },
        { label: 'PC der Lohnbuchhaltung', cells: { v: { answer: 'hoch' }, i: { answer: 'sehr hoch', accept: ['sehr-hoch', 'sehrhoch'] }, a: { answer: 'sehr hoch', accept: ['sehr-hoch', 'sehrhoch'] } } },
      ],
      misconceptions: [
        { cell: '0:a', answer: 'sehr hoch', error: 'ausfallzeit-umgekehrt', why: 'Eine Woche Ausfall ist tragbar – das ist mehr als 3 Tage, also **normal**.' },
        { cell: '2:a', answer: 'normal', error: 'ausfallzeit-umgekehrt', why: 'Nur 4 Stunden sind tragbar → weniger als 8 Stunden = **sehr hoch**.' },
      ],
      hints: ['Achtung: Die Kanzlei hat andere Grenzwerte als die Elektro Krämer GmbH.', 'Verfügbarkeit: kurze tolerierbare Ausfallzeit = hoher Schutzbedarf.'],
      explanation: `| Objekt | V | I | A |
|---|---|---|---|
| Archivraum | **sehr hoch** (150.000 € > 100.000 €) | **hoch** (20.000 €) | normal (1 Woche > 3 Tage) |
| Gäste-WLAN | normal (< 1.000 €) | normal (< 1.000 €) | normal (1 Woche) |
| PC Lohnbuchhaltung | **hoch** (60.000 €) | **sehr hoch** (120.000 € > 100.000 €) | **sehr hoch** (4 h < 8 h) |

Beachte: Auch ein **Raum mit Papierakten** hat einen Schutzbedarf. Und die Grenzwerte gelten immer für das Unternehmen, um das es in der Aufgabe geht – nicht auswendig gelernte Zahlen verwenden.`,
    },
    {
      id: 's01-q041', kind: 'free', skill: 'sich.schutzbedarf.beleg', difficulty: 3,
      prompt: `Ein Kunde des IT-Systemhauses, die **Heizungsbau Kessler GmbH**, stattet ihre Monteure mit Tablets aus. Auf jedem Tablet sind gespeichert: Kundenadressen, **Schlüssel- und Alarmanlagencodes** der Kunden für Wartungen sowie die Arbeitsberichte, aus denen später Rechnungen erstellt werden. Im Büro liegt ein vorbereitetes Ersatz-Tablet, alle Daten werden laufend in den Firmenserver synchronisiert.

Grenzwerte der Firma: finanzieller Schaden normal unter 10.000 €, hoch bis 250.000 €, sehr hoch darüber; tolerierbare Ausfallzeit normal über 24 Stunden, hoch 2–24 Stunden, sehr hoch unter 2 Stunden. Bekannt ist: Werden die Alarmcodes bekannt, drohen Einbrüche bei Kunden mit Schäden über 300.000 €. Falsche Arbeitsberichte führen zu Fehlrechnungen von ca. 15.000 €. Ein Monteur kann einen Tag lang mit Papierformularen arbeiten.

Erstellen Sie die Schutzbedarfstabelle für ein Tablet (Grundwert, Schutzbedarf, Begründung) und nennen Sie je Grundwert eine Maßnahme.`,
      modelAnswer: `| Grundwert | Schutzbedarf | Begründung |
|---|---|---|
| Vertraulichkeit | sehr hoch | Alarm- und Schlüsselcodes; Bekanntwerden ermöglicht Einbrüche mit über 300.000 € Schaden → laut Grenzwerten über 250.000 € = sehr hoch; Tablets werden unterwegs leicht gestohlen oder vergessen. |
| Integrität | hoch | Verfälschte Arbeitsberichte führen zu Fehlrechnungen von ca. 15.000 € → 10.000–250.000 € = hoch. |
| Verfügbarkeit | normal | Ein Tag mit Papierformularen ist tragbar (über 24 Stunden), Ersatz-Tablet vorhanden, Daten auf dem Server synchronisiert (Verteilungseffekt) → normal. |

Maßnahmen: Vertraulichkeit – Geräteverschlüsselung mit starker PIN, Verwaltung per MDM mit Fernlöschung, Codes nur in einer verschlüsselten App, sofortige Verlustmeldung. Integrität – Arbeitsberichte vom Kunden digital unterschreiben lassen und im Büro vor der Rechnungsstellung prüfen (Vier-Augen-Prinzip). Verfügbarkeit – Ersatz-Tablet und Synchronisation beibehalten, Papierformulare als Notfallverfahren.`,
      keywords: ['sehr hoch', 'Alarmcodes', '300.000', 'hoch', '15.000', 'normal', 'Ersatz-Tablet', 'MDM', 'Verschlüsselung'],
      explanation: 'Punkte gibt es für jede Zeile mit **Fakt + Grenze + Ergebnis** und für passend zugeordnete Maßnahmen. Häufiger Fehler: Die Verfügbarkeit wegen der wichtigen Daten hoch einstufen – maßgeblich ist aber die tragbare Ausfallzeit (ein Tag) und das Ersatzgerät.',
    },
    {
      id: 's01-q042', kind: 'table', skill: 'sich.schutzbedarf.beleg', difficulty: 3,
      prompt: `Grenzwerttabelle der Elektro Krämer GmbH:

| Schadensszenario | normal | hoch | sehr hoch |
|---|---|---|---|
| finanzieller Schaden | unter 10.000 € | 10.000 € bis 250.000 € | über 250.000 € |
| tolerierbare Ausfallzeit | mehr als 24 Stunden | 2 bis 24 Stunden | weniger als 2 Stunden |
| informationelle Selbstbestimmung | keine besonderen Auswirkungen | gesellschaftliche Stellung oder wirtschaftliche Lage erheblich beeinträchtigt | Gefahr für Leib, Leben oder Existenz |

Bestimme den Schutzbedarf dieser **mobilen Datenträger**:
- **USB-Stick mit Kalkulationen für einen Kundentermin:** Bekanntwerden ca. 30.000 €; Fehler werden vor dem Termin geprüft (höchstens 2.000 €). Das Original liegt auf dem Fileserver, der Stick kann jederzeit neu bespielt werden; eine Woche Ausfall ist tragbar.
- **Externe Festplatte mit Schulungsvideos:** Die Videos sind auch öffentlich im Internet abrufbar (kein Schaden bei Bekanntwerden); Verfälschung höchstens 1.000 €; eine Woche Ausfall ist tragbar.
- **Speicherkarte der Lagerkamera:** Bekanntwerden der Aufnahmen kostet das Unternehmen ca. 5.000 €; laut Datenschutzbeauftragtem würden die gefilmten Beschäftigten aber in ihrer gesellschaftlichen Stellung **erheblich beeinträchtigt**. Verfälschte Aufnahmen wären als Beweis wertlos (ca. 15.000 €). Fehlt die Karte länger als 12 Stunden, fehlen Aufnahmen – das ist nicht tragbar.`,
      columns: [
        { key: 'v', label: 'Vertraulichkeit', type: 'text' },
        { key: 'i', label: 'Integrität', type: 'text' },
        { key: 'a', label: 'Verfügbarkeit', type: 'text' },
      ],
      rows: [
        { label: 'USB-Stick Kalkulationen', cells: { v: { answer: 'hoch' }, i: { answer: 'normal' }, a: { answer: 'normal' } } },
        { label: 'Festplatte Schulungsvideos', cells: { v: { answer: 'normal' }, i: { answer: 'normal' }, a: { answer: 'normal' } } },
        { label: 'Speicherkarte Lagerkamera', cells: { v: { answer: 'hoch' }, i: { answer: 'hoch' }, a: { answer: 'hoch' } } },
      ],
      misconceptions: [
        { cell: '2:v', answer: 'normal', error: 'maximumprinzip', why: 'Finanziell wären es nur 5.000 € (normal), aber das Datenschutz-Szenario ergibt **hoch**. Je Grundwert zählt das schwerste Szenario.' },
        { cell: '0:a', answer: 'hoch', error: 'ausfallzeit-umgekehrt', why: 'Der Stick ist nur eine Kopie, eine Woche Ausfall ist tragbar → normal.' },
      ],
      hints: ['Bei der Kamerakarte gibt es für die Vertraulichkeit zwei Szenarien – das schwerere zählt.', '„Länger als 12 Stunden nicht tragbar“ heißt: tolerierbar sind höchstens 12 Stunden.'],
      explanation: `| Datenträger | V | I | A |
|---|---|---|---|
| USB-Stick | **hoch** (30.000 €) | normal (≤ 2.000 €) | normal (nur Kopie, 1 Woche tragbar) |
| Festplatte Videos | normal (öffentlich) | normal (≤ 1.000 €) | normal |
| Speicherkarte Kamera | **hoch** (finanziell normal, Datenschutz hoch → Maximum) | **hoch** (15.000 €) | **hoch** (12 h liegt zwischen 2 und 24 h) |

Bei mobilen Datenträgern ist meist die **Vertraulichkeit** das Problem (Verlust, Diebstahl). Die Verfügbarkeit ist niedrig, solange es nur eine Kopie ist.`,
    },
    {
      id: 's01-q043', kind: 'free', skill: 'sich.schutzbedarf.beleg', difficulty: 2,
      prompt: 'Erläutern Sie, wie der Schutzbedarf eines **Raumes** (z. B. des Serverraums) bestimmt wird, und nennen Sie zwei Maßnahmen, die aus einer Verfügbarkeit „sehr hoch“ für den Serverraum folgen.',
      modelAnswer: 'Ein Raum erbt nach dem Maximumprinzip je Grundwert den höchsten Schutzbedarf der IT-Systeme und Datenträger bzw. Papierakten, die sich darin befinden – denn ein Schaden am Raum (Brand, Wasser, Einbruch) trifft alles darin gleichzeitig. Stehen viele wichtige Systeme in einem Raum, ist zusätzlich der Kumulationseffekt zu prüfen. Die Einstufung wird schriftlich begründet. Maßnahmen bei Verfügbarkeit sehr hoch: Brandmeldeanlage bzw. Brandfrüherkennung und geeignete Löschtechnik, USV und ggf. Netzersatzanlage, Klimatisierung mit Überwachung, Zutrittskontrolle, keine Wasserleitungen über den Racks, zweiter Serverraum/Brandabschnitt für redundante Systeme.',
      keywords: ['Maximumprinzip', 'Systeme im Raum', 'Kumulationseffekt', 'Brandschutz', 'USV', 'Klimatisierung'],
      explanation: 'Raum = Maximum der Objekte darin (+ Kumulation prüfen). Maßnahmen müssen zum Grundwert **Verfügbarkeit** passen.',
    },
    {
      id: 's01-q044', kind: 'match', skill: 'sich.prozess', difficulty: 2,
      prompt: 'Ordne jede Tätigkeit der passenden Phase des Sicherheitsprozesses zu.',
      left: ['Die Geschäftsführung beschließt, ein Sicherheitsmanagement aufzubauen, und stellt Budget bereit.', 'Die Leitung unterschreibt ein Dokument mit Sicherheitszielen und Geltungsbereich.', 'Ein Informationssicherheitsbeauftragter wird benannt, Meldewege werden festgelegt.', 'Netzplan erstellen, Schutzbedarf feststellen, Bausteine zuordnen.', 'Festplattenverschlüsselung wird ausgerollt, alle Beschäftigten werden geschult.', 'Jährliches internes Audit und Nachbesserung der Maßnahmen'],
      right: ['Initiierung', 'Leitlinie erstellen', 'Organisation aufbauen', 'Sicherheitskonzeption', 'Umsetzung', 'Aufrechterhaltung und Verbesserung'],
      answer: [0, 1, 2, 3, 4, 5],
      explanation: 'Initiierung (Leitung entscheidet) → Leitlinie (Ziele, Geltungsbereich) → Organisation (Rollen) → Konzeption (Strukturanalyse, Schutzbedarf, Modellierung, Check) → Umsetzung → Aufrechterhaltung (prüfen und verbessern).',
    },
    {
      id: 's01-q045', kind: 'match', skill: 'sich.prozess', difficulty: 3,
      prompt: 'Ordne die Teilaufgaben der passenden Hauptaufgabe zu.',
      left: ['Sicherheitsziele und Stellenwert der Informationssicherheit formulieren', 'Anwendungen, IT-Systeme, Räume und Verbindungen erfassen; gleichartige Clients zu Gruppen zusammenfassen', 'Je Anwendung Vertraulichkeit, Integrität und Verfügbarkeit einstufen und begründen', 'Den Zielobjekten passende Bausteine zuordnen und einen Soll-Ist-Vergleich durchführen'],
      right: ['Leitlinie', 'Strukturanalyse', 'Schutzbedarfsfeststellung', 'Modellierung und IT-Grundschutz-Check'],
      answer: [0, 1, 2, 3],
      explanation: 'Leitlinie = Ziele und Grundsätze; Strukturanalyse = Bestandsaufnahme des Informationsverbunds (mit Gruppenbildung); Schutzbedarfsfeststellung = Einstufung mit Begründung; Modellierung/Check = Bausteine zuordnen und prüfen, was fehlt.',
    },
    {
      id: 's01-q046', kind: 'single', skill: 'sich.prozess', difficulty: 1,
      prompt: 'Wer trägt in einem Unternehmen die **Gesamtverantwortung** für die Informationssicherheit?',
      options: ['Die Leitung (Geschäftsführung)', 'Der Informationssicherheitsbeauftragte', 'Der Datenschutzbeauftragte', 'Der IT-Leiter'],
      answer: 0,
      distractors: {
        '1': { why: 'Der ISB koordiniert und berät – die Verantwortung bleibt bei der Leitung. Die Aussage „Der ISB ist an oberster Stelle verantwortlich“ ist eine bekannte Prüfungsfalle.', error: 'verantwortung-leitung' },
        '2': { why: 'Der DSB berät und überwacht nur beim Datenschutz. Er ist weisungsfrei, aber nicht verantwortlich.', error: 'verantwortung-leitung' },
        '3': { why: 'Die IT-Leitung setzt Maßnahmen um. Informationssicherheit betrifft aber das ganze Unternehmen, auch Papier und Prozesse – die Verantwortung liegt bei der Leitung.', error: 'verantwortung-leitung' },
      },
      explanation: 'Die **Leitung** trägt die Gesamtverantwortung: Sie setzt die Leitlinie in Kraft, stellt Ressourcen bereit und entscheidet über Restrisiken. Aufgaben kann sie delegieren, die Verantwortung nicht.',
    },
    {
      id: 's01-q047', kind: 'text', skill: 'sich.prozess', difficulty: 1,
      prompt: 'Wie nennt das BSI die Gesamtheit aller Geschäftsprozesse, Anwendungen, IT-Systeme, Räume, Kommunikationsverbindungen und beteiligten Personen in dem Bereich, der abgesichert werden soll? (ein Begriff)',
      accept: ['Informationsverbund', 'Informations-Verbund', 'IT-Verbund', 'Informationsverbünde'],
      hints: ['Das Wort setzt sich aus „Information“ und „Verbund“ zusammen.'],
      misconceptions: [{ answer: 'Strukturanalyse', error: 'informationsverbund', why: 'Die Strukturanalyse ist der **Schritt**, in dem der Informationsverbund erfasst wird – nicht der Bereich selbst.' }],
      explanation: '**Informationsverbund** (früher auch IT-Verbund): der festgelegte Geltungsbereich, z. B. „Standort Hamburg mit Vertrieb, Buchhaltung und Serverraum“. Die Strukturanalyse erfasst ihn.',
    },
    {
      id: 's01-q048', kind: 'free', skill: 'sich.prozess', difficulty: 2,
      prompt: 'Die Geschäftsführung der Elektro Krämer GmbH will eine **Sicherheitsleitlinie** verabschieden. Nennen Sie fünf Inhalte, die darin stehen sollten.',
      modelAnswer: '1. Stellenwert der Informationssicherheit für das Unternehmen (warum ist sie wichtig, z. B. Abhängigkeit von Webshop und Warenwirtschaft). 2. Sicherheitsziele, z. B. Vertraulichkeit der Kunden- und Personaldaten, hohe Verfügbarkeit des Webshops. 3. Geltungsbereich (Standorte Hamburg und Berlin, alle Geschäftsprozesse). 4. Organisation und Verantwortlichkeiten: Gesamtverantwortung der Leitung, Benennung eines Informationssicherheitsbeauftragten, Pflichten aller Beschäftigten. 5. Verpflichtung der Leitung zur Durchsetzung und kontinuierlichen Verbesserung (regelmäßige Überprüfung). Zusätzlich: Unterschrift der Leitung und Bekanntgabe an alle Beschäftigten.',
      keywords: ['Stellenwert', 'Sicherheitsziele', 'Geltungsbereich', 'Verantwortlichkeiten', 'Verbesserung', 'Unterschrift'],
      explanation: 'Die Leitlinie ist **kurz und strategisch** (warum, wer). Technische Details (welche Firewall, welche Backup-Software) gehören ins Sicherheitskonzept.',
    },
    {
      id: 's01-q049', kind: 'match', skill: 'sich.prozess', difficulty: 2,
      prompt: 'Ordne die Beispiele dem passenden Begriff zu.',
      left: ['Die Geschäftsführung legt fest, dass neue Software nur nach Freigabe durch die IT-Leitung eingeführt werden darf.', 'Ein Audit prüft, ob die gesetzlichen Löschfristen für Bewerberdaten eingehalten werden.', 'Die IT bewertet, wie wahrscheinlich ein Ransomware-Angriff ist und wie hoch der Schaden wäre.'],
      right: ['Governance', 'Compliance', 'Risikomanagement'],
      answer: [0, 1, 2],
      explanation: '**Governance** = Regeln und Verantwortlichkeiten zur Steuerung der IT. **Compliance** = Einhaltung von Gesetzen, Verträgen und Richtlinien und deren Nachweis. **Risikomanagement** = Risiken erkennen, bewerten, behandeln. Zusammen: GRC.',
    },
    {
      id: 's01-q050', kind: 'match', skill: 'sich.prozess', difficulty: 2,
      prompt: 'Ordne jede Aufgabe der Rolle zu, die dafür zuständig ist.',
      left: ['Entscheidet dokumentiert, ein Restrisiko zu akzeptieren', 'Koordiniert den Sicherheitsprozess und erstellt das Sicherheitskonzept', 'Überwacht die Einhaltung der DSGVO und berät bei der Datenschutz-Folgenabschätzung', 'Meldet eine verdächtige Mail über den Phishing-Knopf'],
      right: ['Leitung (Geschäftsführung)', 'Informationssicherheitsbeauftragter (ISB)', 'Datenschutzbeauftragter (DSB)', 'jede/r Beschäftigte'],
      answer: [0, 1, 2, 3],
      explanation: 'Leitung = Verantwortung und Entscheidungen; ISB = Koordination der Informationssicherheit; DSB = Datenschutz (beraten, überwachen); alle Beschäftigten = Regeln einhalten und Vorfälle melden.',
    },
    {
      id: 's01-q051', kind: 'single', skill: 'sich.schutzziele', difficulty: 2,
      prompt: 'Dein Schulbuch ordnet die **Authentizität** als Teilziel der **Integrität** ein, die App führt sie als eigenes Schutzziel. Was stimmt?',
      options: [
        'Beides ist vertretbar: Das BSI zählt verfälschte Urheberangaben zum Integritätsverlust, viele Lehrbücher führen Authentizität separat.',
        'Nur die Einordnung als eigenes Schutzziel ist richtig.',
        'Authentizität gehört zur Vertraulichkeit.',
        'Authentizität ist kein Schutzziel, sondern ein Verschlüsselungsverfahren.',
      ],
      answer: 0,
      distractors: {
        '1': { why: 'Die Einordnung als Teil der Integrität ist ebenfalls vertretbar – das BSI-Glossar zählt verfälschte Angaben zum Autor zum Integritätsverlust.', error: 'schutzziel-verwechselt' },
        '2': { why: 'Vertraulichkeit betrifft, **wer lesen darf**. Authentizität betrifft die **Echtheit** von Absender oder Information.', error: 'schutzziel-verwechselt' },
        '3': { why: 'Authentizität ist ein Schutzziel (Echtheit). Verfahren wie digitale Signaturen oder Zertifikate **sichern** sie.', error: 'schutzziel-verwechselt' },
      },
      explanation: 'Fragt die Prüfung nach den **drei Grundwerten**: Vertraulichkeit, Integrität, Verfügbarkeit. Geht es um die **Echtheit** eines Absenders oder einer Datei: Authentizität nennen, ggf. mit dem Zusatz „Teilaspekt der Integrität“.',
    },
    {
      id: 's01-q052', kind: 'free', skill: 'sich.prozess', difficulty: 2,
      prompt: 'Erläutern Sie den Unterschied zwischen einer **Sicherheitsleitlinie** und einem **Sicherheitskonzept**.',
      modelAnswer: 'Die Sicherheitsleitlinie ist ein kurzes, strategisches Grundsatzdokument der Leitung. Sie beschreibt, warum Informationssicherheit wichtig ist, welche Ziele gelten, für welchen Bereich sie gilt und wer verantwortlich ist; die Leitung unterschreibt sie, und sie wird allen Beschäftigten bekannt gemacht. Das Sicherheitskonzept ist ein ausführliches, fachliches Dokument (meist vom Informationssicherheitsbeauftragten erstellt). Es enthält die Strukturanalyse, die Schutzbedarfsfeststellung, die ausgewählten Maßnahmen und den Umsetzungsplan, also was konkret wie geschützt wird. Die Leitlinie gibt den Rahmen vor, das Konzept setzt ihn um.',
      keywords: ['kurz', 'Leitung', 'Ziele', 'Verantwortung', 'ausführlich', 'Maßnahmen', 'Schutzbedarf'],
      explanation: 'Merkhilfe: Leitlinie = **warum und wer**, Sicherheitskonzept = **was und wie**.',
    },
  ],
};
