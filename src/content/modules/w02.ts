import type { Module } from '../types';

export const w02: Module = {
  id: 'w02',
  nr: 2,
  area: 'wirtschaft',
  title: 'Angebote vergleichen & beschaffen',
  short: 'Beschaffungsprozess, Anfrage und Angebot, Bezugskalkulation, Nutzwertanalyse und eine begründete Kaufentscheidung.',
  icon: 'Scale',
  relevance: 'ap1',
  prerequisites: ['w01'],
  generators: ['w.bezugspreis', 'w.nutzwert'],
  skills: [
    { id: 'w.beschaffung', module: 'w02', title: 'Beschaffungsprozess & Bezugsquellen' },
    { id: 'w.angebot', module: 'w02', title: 'Anfrage und Angebot (Inhalt, Bindung)', requires: ['w.beschaffung'] },
    { id: 'w.bezugskalkulation', module: 'w02', title: 'Bezugskalkulation (quantitativer Angebotsvergleich)', requires: ['w.angebot'] },
    { id: 'w.nutzwertanalyse', module: 'w02', title: 'Qualitativer Vergleich & Nutzwertanalyse', requires: ['w.anforderungen'] },
    { id: 'w.entscheidung', module: 'w02', title: 'Entscheidung begründen, Skonto nutzen, bestellen', requires: ['w.bezugskalkulation', 'w.nutzwertanalyse'] },
  ],
  lessons: [
    /* ------------------------------------------------------------ */
    {
      id: 'w02-l01',
      title: 'Der Beschaffungsprozess und Bezugsquellen',
      minutes: 15,
      relevance: 'ap1',
      skills: ['w.beschaffung'],
      steps: [
        {
          type: 'explain',
          title: 'Vom Bedarf bis zur Zahlung',
          body: `In der AP1 sollst du Hard- und Software **auswählen und ihre Beschaffung einleiten**. Dazu musst du den Ablauf einer Beschaffung kennen:

| Schritt | Inhalt | Ergebnis |
|---|---|---|
| 1. Bedarfsermittlung | Was wird benötigt? Menge, Qualität, Termin (→ Bedarfsanalyse, Lastenheft) | Bedarfsmeldung / Bestellanforderung |
| 2. Bezugsquellenermittlung | Wer kann liefern? | Liste möglicher Lieferanten |
| 3. Anfrage | Lieferanten um Angebote bitten | Angebote |
| 4. Angebotsvergleich | quantitativ (Preis) **und** qualitativ (Lieferzeit, Service …) | Entscheidung |
| 5. Bestellung | verbindlicher Auftrag an den Lieferanten | Kaufvertrag (ggf. Auftragsbestätigung) |
| 6. Wareneingang | Lieferung prüfen: Menge, Art, Schäden, Lieferschein | Wareneingangsprotokoll |
| 7. Rechnungsprüfung und Zahlung | Rechnung mit Bestellung und Lieferschein abgleichen, Skonto nutzen | Zahlung |

**Bezugsquellen** für IT-Produkte:

| intern (eigene Unterlagen) | extern |
|---|---|
| Lieferantendatei im ERP-System, frühere Bestellungen, Rahmenverträge, Erfahrungen von Kollegen | Hersteller-Websites, Distributoren und Systemhäuser, B2B-Onlineshops, Preisvergleichsportale, Fachmessen, Fachzeitschriften, Vertreterbesuche, Ausschreibungsplattformen |

**Interne Quellen** sind schnell und es gibt Erfahrungswerte (Zuverlässigkeit, Qualität). **Externe Quellen** helfen, neue (günstigere oder bessere) Lieferanten zu finden.

**Rahmenvertrag:** Für regelmäßig benötigte Produkte (z. B. Notebooks, Toner) vereinbaren Unternehmen oft feste Konditionen für einen Zeitraum – einzelne Bestellungen („Abrufe“) gehen dann schneller.`,
        },
        {
          type: 'visual',
          title: 'Beschaffung als Ablauf',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['Fachabteilung', 'IT / Einkauf', 'Lieferant'],
              messages: [
                { from: 0, to: 1, label: 'Bedarfsmeldung', note: 'Was, wie viel, bis wann?' },
                { from: 1, to: 2, label: 'Anfrage' },
                { from: 2, to: 1, label: 'Angebot' },
                { from: 1, to: 1, label: 'Angebotsvergleich' },
                { from: 1, to: 2, label: 'Bestellung' },
                { from: 2, to: 1, label: 'Auftragsbestätigung, Lieferung + Lieferschein' },
                { from: 1, to: 0, label: 'Einrichtung und Übergabe' },
                { from: 2, to: 1, label: 'Rechnung → Prüfung → Zahlung' },
              ],
            },
          },
          caption: 'Anfrage, Angebot, Bestellung – die Rechnung wird immer gegen Bestellung und Lieferschein geprüft.',
        },
        {
          type: 'check',
          question: {
            id: 'w02-c01', kind: 'order', skill: 'w.beschaffung', difficulty: 1,
            prompt: 'Bringe die Schritte des Beschaffungsprozesses in die richtige Reihenfolge.',
            items: ['Bedarfsermittlung', 'Bezugsquellenermittlung', 'Anfrage', 'Angebotsvergleich', 'Bestellung', 'Wareneingangsprüfung', 'Rechnungsprüfung und Zahlung'],
            explanation: 'Erst Bedarf und Lieferanten klären, dann anfragen, vergleichen, bestellen, Ware prüfen und zum Schluss die Rechnung prüfen und bezahlen.',
          },
        },
        { type: 'practice', title: 'Übung: Beschaffung', questionIds: ['w02-q001', 'w02-q002', 'w02-q003'], count: 3, difficulty: 1 },
        { type: 'summary', points: ['Bedarf → Bezugsquellen → Anfrage → Angebotsvergleich → Bestellung → Wareneingang → Rechnungsprüfung/Zahlung.', 'Interne Bezugsquellen: Lieferantendatei, frühere Bestellungen, Rahmenverträge.', 'Externe Bezugsquellen: Hersteller, Distributoren, B2B-Shops, Messen, Portale.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'w02-l02',
      title: 'Anfrage und Angebot: Inhalte und Bindung',
      minutes: 20,
      relevance: 'ap1',
      skills: ['w.angebot'],
      steps: [
        {
          type: 'explain',
          title: 'Was ist verbindlich?',
          body: `**Anfrage:** Bitte an einen Lieferanten, ein Angebot abzugeben. Sie ist **rechtlich unverbindlich** – man darf bei vielen Lieferanten anfragen. Eine *allgemeine* Anfrage bittet um Katalog/Preisliste, eine *bestimmte* Anfrage nennt konkrete Produkte, Mengen und Termine.

**Angebot:** Eine an eine **bestimmte Person** gerichtete Willenserklärung, zu bestimmten Bedingungen zu liefern. Juristisch ist es ein **Antrag** (§ 145 BGB) – der Anbieter ist daran **gebunden**:

| Situation | Bindung |
|---|---|
| unter Anwesenden / am Telefon | nur solange das Gespräch dauert (§ 147 Abs. 1 BGB) |
| unter Abwesenden (Brief, E-Mail) ohne Frist | bis zu dem Zeitpunkt, zu dem eine Antwort unter regelmäßigen Umständen zu erwarten ist (§ 147 Abs. 2 BGB) |
| mit Frist („gültig bis 30.11.“) | bis zum Ende der Frist (§ 148 BGB) |

**Freizeichnungsklauseln** schränken die Bindung ein: „**freibleibend**“ / „**unverbindlich**“ (ganz unverbindlich), „**solange Vorrat reicht**“ (Menge unverbindlich), „**Preis freibleibend**“ (Preis unverbindlich).

**Kein Angebot** im rechtlichen Sinn sind **Anpreisungen** an die Allgemeinheit: Werbung, Kataloge, Onlineshop-Seiten, Schaufenster. Sie sind nur eine Aufforderung, selbst ein Angebot abzugeben.

**Das Angebot erlischt**, wenn es abgelehnt wird, die Bindungsfrist abläuft oder der Kunde es **verspätet** bzw. **mit Änderungen** annimmt – das gilt dann als **neues Angebot** (§ 150 BGB).

**Inhalte eines Angebots** (fehlt etwas, gelten gesetzliche Regelungen):

| Inhalt | Beispiel | Gesetzliche Regelung, wenn nichts vereinbart ist |
|---|---|---|
| Art, Beschaffenheit, Güte | „Notebook Modell X, i5, 16 GB RAM, 512 GB SSD“ | mittlere Art und Güte bei Gattungsware |
| Menge, Preis | 10 Stück à 949,00 € netto | – |
| Preisnachlässe | 10 % Rabatt, 2 % Skonto bei Zahlung in 10 Tagen | keine |
| Lieferbedingungen | „ab Werk“ (Käufer zahlt Versand) oder „frei Haus“ (Verkäufer zahlt Versand) | Versendungskosten trägt der Käufer (§ 448 BGB) |
| Lieferzeit | „innerhalb von 5 Werktagen“ | sofort (§ 271 BGB) |
| Zahlungsbedingungen | „30 Tage netto“, Vorkasse, Lastschrift | sofort bei Lieferung |
| Erfüllungsort, Gerichtsstand | Sitz des Verkäufers | Wohn-/Geschäftssitz des jeweiligen Schuldners (§ 269 BGB) |

**Rabatt** = Preisnachlass (z. B. Mengenrabatt, Treuerabatt). **Skonto** = Preisnachlass für Zahlung **innerhalb einer kurzen Frist**. **Bonus** = nachträglicher Nachlass bei Erreichen eines Umsatzes.`,
        },
        {
          type: 'visual',
          title: 'Verbindlich oder nicht?',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Anfrage', text: 'Unverbindlich. Man darf bei beliebig vielen Lieferanten anfragen.', icon: 'Mail' },
                { title: 'Angebot', text: 'Verbindlich (Antrag, § 145 BGB) – außer bei Freizeichnung wie „freibleibend“.', icon: 'FileSignature' },
                { title: 'Anpreisung', text: 'Werbung, Katalog, Onlineshop – kein Angebot, nur Aufforderung zur Bestellung.', icon: 'Megaphone' },
              ],
            },
          },
          caption: 'Nur das Angebot an eine bestimmte Person bindet den Anbieter.',
        },
        {
          type: 'example',
          title: 'Ein Angebot lesen',
          problem: `Die Elektro Krämer GmbH erhält per E-Mail folgendes Angebot:

> *„Wir bieten Ihnen 10 Notebooks Modell X zum Stückpreis von 949,00 € netto an. Rabatt 10 %. Zahlung innerhalb von 10 Tagen mit 2 % Skonto, sonst 30 Tage netto. Lieferung ab Werk, Versandpauschale 49,90 €. Lieferzeit 5 Werktage. Dieses Angebot gilt bis 30.11.“*

Beantworte: Ist das Angebot verbindlich? Wer trägt die Versandkosten? Was passiert, wenn die Elektro Krämer GmbH am 03.12. bestellt?`,
          steps: [
            { label: 'Verbindlichkeit', body: 'Ja – es richtet sich an einen bestimmten Kunden, enthält keine Freizeichnungsklausel und ist bis 30.11. befristet (§ 148 BGB).' },
            { label: 'Versandkosten', body: '„Ab Werk“ → der Käufer trägt die Versandkosten (hier die Pauschale von 49,90 €).' },
            { label: 'Bestellung am 03.12.', body: 'Die Frist ist abgelaufen, das Angebot ist erloschen. Die verspätete Bestellung gilt als **neues Angebot** des Käufers (§ 150 Abs. 1 BGB). Ein Kaufvertrag entsteht erst, wenn der Lieferant es annimmt (z. B. durch Auftragsbestätigung oder Lieferung).' },
          ],
          result: 'Verbindlich bis 30.11., Versandkosten trägt der Käufer, eine spätere Bestellung ist ein neuer Antrag.',
        },
        {
          type: 'check',
          question: {
            id: 'w02-c02', kind: 'single', skill: 'w.angebot', difficulty: 2,
            prompt: 'Ein Lieferant schreibt in sein Angebot „**solange Vorrat reicht**“. Was bedeutet das?',
            options: ['Das gesamte Angebot ist unverbindlich.', 'Der Preis ist unverbindlich.', 'Die Liefermenge ist unverbindlich.', 'Das Angebot gilt nur am Tag der Abgabe.'],
            answer: 2,
            distractors: {
              '0': { why: 'Ganz unverbindlich wäre „freibleibend“ oder „unverbindlich“.', error: 'w-freizeichnung' },
              '1': { why: 'Den Preis schränkt „Preis freibleibend“ ein.', error: 'w-freizeichnung' },
              '3': { why: 'Die Klausel sagt nichts über eine Frist.', error: 'w-freizeichnung' },
            },
            explanation: '„Solange Vorrat reicht“ = Freizeichnung für die **Menge**. Preis und übrige Bedingungen bleiben verbindlich.',
          },
        },
        { type: 'practice', title: 'Übung: Anfrage und Angebot', questionIds: ['w02-q004', 'w02-q005', 'w02-q006', 'w02-q007', 'w02-q008'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Anfrage: unverbindlich. Angebot: verbindlicher Antrag (§ 145 BGB).', 'Bindung: unter Anwesenden sofort, unter Abwesenden angemessene Zeit, sonst bis Fristende.', 'Freizeichnung: „freibleibend“, „solange Vorrat reicht“, „Preis freibleibend“.', 'Werbung/Onlineshop = Anpreisung, kein Angebot.', 'Ohne Vereinbarung: Versendungskosten trägt der Käufer, Lieferung und Zahlung sofort.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'w02-l03',
      title: 'Quantitativer Vergleich: die Bezugskalkulation',
      minutes: 25,
      relevance: 'ap1',
      skills: ['w.bezugskalkulation'],
      steps: [
        {
          type: 'explain',
          title: 'Was kostet die Ware wirklich?',
          body: `Der günstigste **Listenpreis** ist nicht automatisch das günstigste Angebot. Entscheidend ist, was die Ware **bis sie bei dir ist** kostet – der **Bezugspreis** (auch Einstandspreis). Ihn berechnest du mit dem Schema der **Bezugskalkulation**:

| Schritt | Erklärung |
|---|---|
| **Listeneinkaufspreis** (LEP) | Menge × Listenpreis (netto) |
| − Liefererrabatt | % vom Listeneinkaufspreis |
| **= Zieleinkaufspreis** (ZEP) | Betrag, den du nach Ablauf des Zahlungsziels zahlen würdest |
| − Liefererskonto | % vom **Zieleinkaufspreis** (nur wenn du innerhalb der Skontofrist zahlst) |
| **= Bareinkaufspreis** (BEP) | |
| + Bezugskosten | Fracht, Versandpauschale, Porto, Verpackung, Transportversicherung, Zoll |
| **= Bezugspreis / Einstandspreis** | Vergleichsgröße für Angebote |

**Wichtig:**
- Rechne mit **Nettopreisen**. Ein vorsteuerabzugsberechtigtes Unternehmen bekommt die Umsatzsteuer vom Finanzamt zurück – sie ist für den Vergleich ohne Bedeutung.
- Der Skonto wird vom Betrag **nach Rabatt** berechnet, nicht vom Listenpreis.
- Bezugskosten werden **nach** dem Skonto addiert (Skonto gibt es auf den Warenwert).
- Bei Angeboten „**frei Haus**“ sind die Bezugskosten 0 €.
- Runde Zwischenergebnisse kaufmännisch **auf Cent** (bei Prüfungen: Rundungsregel der Aufgabe beachten).

Für den Vergleich verschiedener Mengen oder Packungsgrößen rechnest du den **Bezugspreis je Stück** (Bezugspreis ÷ Menge).`,
        },
        {
          type: 'visual',
          title: 'Das Schema als Treppe',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: '1. Listeneinkaufspreis', text: 'Menge × Listenpreis netto', icon: 'List' },
                { title: '2. − Rabatt', text: '% vom Listeneinkaufspreis → Zieleinkaufspreis', icon: 'Percent' },
                { title: '3. − Skonto', text: '% vom Zieleinkaufspreis → Bareinkaufspreis', icon: 'Timer' },
                { title: '4. + Bezugskosten', text: 'Fracht, Versand, Verpackung → Bezugspreis', icon: 'Truck' },
              ],
            },
          },
          caption: 'Merke: Rabatt vom Listenpreis, Skonto vom Zieleinkaufspreis, Bezugskosten zum Schluss.',
        },
        {
          type: 'example',
          title: 'Zwei Notebook-Angebote vergleichen',
          problem: `Die Elektro Krämer GmbH braucht **10 Notebooks**. Zwei Angebote (netto):

| | Angebot A – Systemhaus Nord | Angebot B – IT-Direkt24 |
|---|---|---|
| Listenpreis je Stück | 949,00 € | 979,00 € |
| Rabatt | 10 % | 12 % |
| Skonto | 2 % (10 Tage) | 3 % (14 Tage) |
| Lieferung | ab Werk, Versandpauschale 49,90 € | frei Haus |

Welches Angebot ist günstiger? Runde jedes Zwischenergebnis auf Cent; Skonto wird genutzt.`,
          steps: [
            { label: 'Listeneinkaufspreis', body: 'A: 10 × 949,00 € = **9.490,00 €** · B: 10 × 979,00 € = **9.790,00 €**' },
            { label: '− Rabatt', body: 'A: 9.490,00 € × 10 % = 949,00 € → ZEP **8.541,00 €** · B: 9.790,00 € × 12 % = 1.174,80 € → ZEP **8.615,20 €**' },
            { label: '− Skonto (vom Zieleinkaufspreis)', body: 'A: 8.541,00 € × 2 % = 170,82 € → BEP **8.370,18 €** · B: 8.615,20 € × 3 % = 258,456 € ≈ 258,46 € → BEP **8.356,74 €**' },
            { label: '+ Bezugskosten', body: 'A: 8.370,18 € + 49,90 € = **8.420,08 €** · B: frei Haus → **8.356,74 €**' },
            { label: 'Vergleich', body: '8.420,08 € − 8.356,74 € = **63,34 €** → Angebot B ist günstiger, obwohl sein Listenpreis höher ist.' },
          ],
          result: 'Bezugspreis A = 8.420,08 €, B = 8.356,74 €. Rein rechnerisch ist **Angebot B um 63,34 € günstiger**.',
        },
        {
          type: 'check',
          question: {
            id: 'w02-c03', kind: 'number', skill: 'w.bezugskalkulation', difficulty: 2,
            prompt: '12 Monitore kosten laut Liste je **239,00 €** netto. Der Lieferer gewährt **15 % Rabatt** und **2 % Skonto**; die Fracht beträgt **35,00 €**. Berechne den **Bezugspreis** der Lieferung (Skonto wird genutzt, jedes Zwischenergebnis auf Cent runden).',
            answer: 2424.04, tolerance: 0.01, unit: '€',
            hints: ['Listeneinkaufspreis = 12 × 239,00 €.', 'Skonto vom Zieleinkaufspreis berechnen.'],
            misconceptions: [
              { answer: '2389.04', error: 'w-bezugskosten-vergessen', why: 'Die Fracht (35,00 €) muss zum Bareinkaufspreis addiert werden.' },
              { answer: '2415.44', error: 'w-skonto-basis', why: 'Skonto wird vom Zieleinkaufspreis (nach Rabatt) berechnet, nicht vom Listeneinkaufspreis.' },
            ],
            explanation: 'LEP 12 × 239,00 € = 2.868,00 € − 15 % Rabatt (430,20 €) = ZEP 2.437,80 € − 2 % Skonto (48,756 ≈ 48,76 €) = BEP 2.389,04 € + Fracht 35,00 € = **2.424,04 €**.',
          },
        },
        { type: 'practice', title: 'Übung: Bezugspreise berechnen', generator: 'w.bezugspreis', count: 3, difficulty: 2 },
        { type: 'practice', title: 'Prüfungsniveau: zwei Angebote vollständig kalkulieren', generator: 'w.bezugspreis', count: 2, difficulty: 3 },
        { type: 'summary', points: ['Listeneinkaufspreis − Rabatt = Zieleinkaufspreis − Skonto = Bareinkaufspreis + Bezugskosten = Bezugspreis.', 'Skonto immer vom Zieleinkaufspreis, Bezugskosten zum Schluss.', 'Mit Nettopreisen vergleichen (Vorsteuerabzug).', 'Niedrigster Listenpreis ≠ niedrigster Bezugspreis.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'w02-l04',
      title: 'Qualitativer Vergleich und Nutzwertanalyse',
      minutes: 25,
      relevance: 'ap1',
      skills: ['w.nutzwertanalyse'],
      steps: [
        {
          type: 'explain',
          title: 'Mehr als nur der Preis',
          body: `Der **quantitative** Vergleich betrachtet Zahlen (Bezugspreis). Der **qualitative** Vergleich bewertet Eigenschaften, die sich nicht direkt in Euro ausdrücken lassen:

| Kriterium | Beispiel |
|---|---|
| Leistung / technische Eignung | CPU, RAM, Anschlüsse, Kompatibilität mit vorhandener Infrastruktur |
| Lieferzeit und Liefertreue | „sofort lieferbar“ vs. „6 Wochen“ |
| Garantie und Service | 3 Jahre Vor-Ort-Service am nächsten Werktag vs. 1 Jahr Bring-in |
| Zuverlässigkeit des Lieferanten | Erfahrungen, Referenzen, Standort, Erreichbarkeit |
| Energieeffizienz / Umwelt | Leistungsaufnahme, Umweltzeichen (z. B. Blauer Engel, TCO Certified, Energy Star) |
| Ergonomie | Gewicht, Display, Lautstärke |
| Datenschutz | Serverstandort in der EU, Auftragsverarbeitungsvertrag bei Cloud-Diensten |

Um beides **objektiv** zusammenzubringen, nutzt man die **Nutzwertanalyse** (auch Entscheidungsbewertungstabelle):

1. **K.-o.-Kriterien** prüfen: Angebote, die eine Muss-Anforderung nicht erfüllen, scheiden **vor** der Bewertung aus.
2. **Kriterien festlegen** (aus den Anforderungen, z. B. Preis, Leistung, Service, Lieferzeit).
3. **Gewichten:** Jedes Kriterium erhält ein Gewicht; die Summe ist **100 %** (bzw. 1,0).
4. **Punkte vergeben:** je Angebot und Kriterium nach einer festen Skala (z. B. 1–10). Auch der **Preis** wird in Punkte übersetzt (günstigstes Angebot = meiste Punkte).
5. **Teilnutzwerte berechnen:** Gewicht × Punkte.
6. **Nutzwert** = Summe der Teilnutzwerte je Angebot.
7. **Rangfolge bilden:** Das Angebot mit dem **höchsten** Nutzwert wird empfohlen.

**Vorteile:** nachvollziehbar, bezieht qualitative Kriterien ein, Entscheidung lässt sich begründen und dokumentieren.
**Nachteile:** Gewichte und Punkte sind **subjektiv**; kleine Änderungen können das Ergebnis drehen. Deshalb Kriterien und Gewichte **vor** dem Ansehen der Angebote festlegen und mit dem Kunden abstimmen.

**Zwei Schreibweisen – beide richtig:** Du kannst das Gewicht als Dezimalfaktor (40 % = 0,40) einsetzen, dann liegt der Nutzwert auf derselben Skala wie die Punkte (z. B. 7,25). Oder du rechnest mit der ganzen Prozentzahl (40), wie in vielen Prüfungsbüchern – dann ist das Ergebnis 100-mal so groß (725). Die **Rangfolge ist in beiden Fällen gleich**. Die App akzeptiert beide. Steht in einer Prüfungsaufgabe eine Vorgabe, halte dich daran.`,
        },
        {
          type: 'visual',
          title: 'Schritte der Nutzwertanalyse',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: '1. K.-o.-Prüfung', text: 'Muss-Kriterien nicht erfüllt → Angebot scheidet aus.', icon: 'Ban' },
                { title: '2. Gewichten', text: 'Kriterien gewichten, Summe = 100 %.', icon: 'Scale' },
                { title: '3. Punkte', text: 'Je Kriterium und Angebot Punkte vergeben (z. B. 1–10).', icon: 'Star' },
                { title: '4. Auswerten', text: 'Gewicht × Punkte, summieren, höchster Nutzwert gewinnt.', icon: 'Trophy' },
              ],
            },
          },
          caption: 'Die Nutzwertanalyse macht eine Entscheidung nachvollziehbar – sie ist aber nur so objektiv wie die Gewichte.',
        },
        {
          type: 'example',
          title: 'Nutzwertanalyse für Arbeitsplatzrechner',
          problem: `Drei Angebote für PCs erfüllen alle K.-o.-Kriterien. Bewertung (Punkte 1–10):

| Kriterium | Gewicht | A | B | C |
|---|---|---|---|---|
| Preis | 40 % | 8 | 6 | 9 |
| Leistung | 25 % | 6 | 9 | 5 |
| Garantie & Service | 20 % | 7 | 8 | 4 |
| Lieferzeit | 15 % | 9 | 5 | 8 |

Berechne die Nutzwerte und bilde die Rangfolge.`,
          steps: [
            { label: 'Angebot A', body: '0,40 · 8 + 0,25 · 6 + 0,20 · 7 + 0,15 · 9 = 3,20 + 1,50 + 1,40 + 1,35 = **7,45**' },
            { label: 'Angebot B', body: '0,40 · 6 + 0,25 · 9 + 0,20 · 8 + 0,15 · 5 = 2,40 + 2,25 + 1,60 + 0,75 = **7,00**' },
            { label: 'Angebot C', body: '0,40 · 9 + 0,25 · 5 + 0,20 · 4 + 0,15 · 8 = 3,60 + 1,25 + 0,80 + 1,20 = **6,85**' },
            { label: 'Rangfolge', body: '1. A (7,45) · 2. B (7,00) · 3. C (6,85). Würde man nur den Preis betrachten, läge C vorn (9 Punkte) – die Nutzwertanalyse berücksichtigt aber auch Leistung, Service und Lieferzeit, und dort schneidet C schwach ab.' },
          ],
          result: '**Angebot A** hat mit 7,45 den höchsten Nutzwert und wird empfohlen.',
        },
        {
          type: 'check',
          question: {
            id: 'w02-c04', kind: 'number', skill: 'w.nutzwertanalyse', difficulty: 2,
            prompt: `Berechne den Nutzwert von **Angebot B**.

| Kriterium | Gewicht | Angebot B |
|---|---|---|
| Preis | 35 % | 9 |
| Leistung | 30 % | 6 |
| Service | 20 % | 7 |
| Lieferzeit | 15 % | 5 |`,
            answer: 7.1, tolerance: 0.005, accept: [710],
            misconceptions: [
              { answer: '27', error: 'w-nutzwert-ungewichtet', why: 'Nur Punkte addiert – jede Punktzahl muss mit dem Gewicht multipliziert werden.' },
            ],
            hints: ['Teilnutzwert = Gewicht · Punkte.'],
            explanation: '0,35 · 9 + 0,30 · 6 + 0,20 · 7 + 0,15 · 5 = 3,15 + 1,80 + 1,40 + 0,75 = **7,10**',
          },
        },
        { type: 'practice', title: 'Übung: Nutzwertanalysen auswerten', generator: 'w.nutzwert', count: 3, difficulty: 2 },
        { type: 'practice', title: 'Prüfungsniveau: vollständige Bewertungstabelle', generator: 'w.nutzwert', count: 2, difficulty: 3 },
        { type: 'summary', points: ['Qualitative Kriterien: Leistung, Lieferzeit, Service, Garantie, Zuverlässigkeit, Energie, Datenschutz.', 'Erst K.-o.-Kriterien prüfen, dann bewerten.', 'Gewichte summieren sich zu 100 %; Teilnutzwert = Gewicht × Punkte.', 'Höchster Nutzwert = Empfehlung.', 'Nachteil: Gewichte und Punkte sind subjektiv.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'w02-l05',
      title: 'Entscheidung begründen, Skonto nutzen, bestellen',
      minutes: 20,
      relevance: 'ap1',
      skills: ['w.entscheidung'],
      steps: [
        {
          type: 'explain',
          title: 'Von der Rechnung zur Empfehlung',
          body: `In der Prüfung reicht ein Ergebnis wie „Angebot B“ selten aus. Du sollst die Entscheidung **begründen** – mit Zahlen **und** qualitativen Argumenten:

> *„Wir empfehlen Angebot B. Es ist mit einem Bezugspreis von 8.356,74 € um 63,34 € günstiger als Angebot A und bietet zusätzlich 3 Jahre Vor-Ort-Service. Nachteil ist die längere Lieferzeit von 10 Werktagen; sie liegt aber innerhalb des geplanten Projektzeitraums.“*

**Aufbau einer Begründung:** Empfehlung → wichtigste Zahl(en) → entscheidende qualitative Vorteile → Nachteile/Risiken und warum sie akzeptabel sind.

**Lohnt sich Skonto?** Skonto ist eine Belohnung dafür, früher zu zahlen. Wer das Zahlungsziel ausnutzt, „leiht“ sich das Geld beim Lieferanten – zu einem sehr hohen Zinssatz. Faustformel für den Jahreszinssatz des Lieferantenkredits:

**Zinssatz ≈ Skontosatz × 360 ÷ (Zahlungsziel − Skontofrist)**

Beispiel: 2 % Skonto bei Zahlung in 10 Tagen, sonst 30 Tage netto → 2 × 360 ÷ 20 = **36 % pro Jahr**. Ein Kontokorrentkredit der Bank kostet meist deutlich weniger. **Fazit:** Skonto fast immer nutzen – notfalls sogar mit einem Bankkredit finanzieren.

**Bestellung:** Nimmt die Bestellung ein verbindliches Angebot **rechtzeitig und unverändert** an, ist der **Kaufvertrag** geschlossen. Gab es kein verbindliches Angebot (z. B. Bestellung aus dem Onlineshop), ist die Bestellung selbst der Antrag – der Vertrag entsteht erst mit der **Auftragsbestätigung** oder Lieferung. Die Bestellung sollte die Angebotsdaten wiederholen (Angebotsnummer, Artikel, Menge, Preis, Konditionen, Liefertermin, Lieferanschrift).

**Nach der Lieferung:** Ware sofort prüfen (Menge, Typ, äußere Schäden, Lieferschein). Unter Kaufleuten gilt die **unverzügliche Untersuchungs- und Rügepflicht** (§ 377 HGB) – Details im Modul „Verträge & Recht“.`,
        },
        {
          type: 'example',
          title: 'Skonto mit Bankkredit finanzieren?',
          problem: 'Die Elektro Krämer GmbH erhält eine Rechnung über **11.900,00 €**. Bedingungen: **2 % Skonto** bei Zahlung innerhalb von 10 Tagen, sonst 30 Tage netto. Das Geschäftskonto weist kein Guthaben auf; der Kontokorrentkredit kostet **12 % p. a.** Lohnt es sich, das Skonto mit dem Kredit zu finanzieren? (Bankjahr 360 Tage, auf Cent runden)',
          steps: [
            { label: 'Skontobetrag', body: '11.900,00 € × 2 % = **238,00 €** → Zahlbetrag 11.662,00 €' },
            { label: 'Kreditdauer', body: 'Ohne Skonto müsste erst am 30. Tag gezahlt werden. Mit Skonto am 10. Tag → der Kredit läuft **20 Tage** (30 − 10).' },
            { label: 'Kreditzinsen', body: '11.662,00 € × 12 % × 20 / 360 = 77,7467 € ≈ **77,75 €**' },
            { label: 'Vergleich', body: '238,00 € Skonto − 77,75 € Zinsen = **160,25 € Ersparnis**' },
            { label: 'Kontrolle mit Faustformel', body: 'Lieferantenkredit ≈ 2 × 360 ÷ 20 = 36 % > 12 % Bankkredit → Skonto nutzen.' },
          ],
          result: 'Ja – trotz Kreditzinsen spart das Unternehmen **160,25 €**.',
        },
        {
          type: 'check',
          question: {
            id: 'w02-c05', kind: 'number', skill: 'w.entscheidung', difficulty: 2,
            prompt: 'Zahlungsbedingung: **3 % Skonto** innerhalb von 14 Tagen, Zahlungsziel **44 Tage**. Welchem Jahreszinssatz entspricht der Lieferantenkredit ungefähr? (Faustformel, 360 Tage, in Prozent)',
            answer: 36, tolerance: 0.01, unit: '%',
            misconceptions: [{ answer: '24.55', error: 'w-skonto-zins', why: 'Durch die Differenz aus Zahlungsziel und Skontofrist teilen (44 − 14 = 30 Tage), nicht durch das Zahlungsziel allein: 3 × 360 ÷ 30.' }, { answer: '77.14', error: 'w-skonto-zins', why: 'Durch die Differenz aus Zahlungsziel und Skontofrist teilen (30 Tage), nicht durch die Skontofrist.' }],
            hints: ['Zinssatz ≈ Skontosatz × 360 ÷ (Zahlungsziel − Skontofrist)'],
            explanation: '3 × 360 ÷ (44 − 14) = 1.080 ÷ 30 = **36 %**. Skonto lohnt sich also fast immer.',
          },
        },
        { type: 'practice', title: 'Übung: Entscheidung und Skonto', questionIds: ['w02-q024', 'w02-q025', 'w02-q026', 'w02-q027', 'w02-q028'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Empfehlung = Zahl + qualitative Argumente + Nachteile/Risiken abwägen.', 'Lieferantenkredit ≈ Skontosatz × 360 ÷ (Ziel − Skontofrist) – meist über 30 % p. a.', 'Skonto fast immer nutzen.', 'Bestellung auf verbindliches Angebot (rechtzeitig, unverändert) = Kaufvertrag.', 'Ware sofort prüfen (Kaufleute: § 377 HGB).'] },
      ],
    },
  ],
  /* ================================================================ */
  questions: [
    { id: 'w02-q001', kind: 'table', skill: 'w.beschaffung', difficulty: 1, prompt: 'Handelt es sich um eine **interne** oder **externe** Bezugsquelle?', columns: [{ key: 'a', label: 'intern / extern', type: 'text' }], rows: [
      { label: 'Lieferantendatei im ERP-System', cells: { a: { answer: 'intern' } } },
      { label: 'Fachmesse (z. B. für IT-Sicherheit)', cells: { a: { answer: 'extern' } } },
      { label: 'Frühere Bestellungen', cells: { a: { answer: 'intern' } } },
      { label: 'Preisvergleichsportal im Internet', cells: { a: { answer: 'extern' } } },
      { label: 'Website eines Distributors', cells: { a: { answer: 'extern' } } },
    ], explanation: 'Interne Quellen sind eigene Unterlagen und Erfahrungen des Unternehmens; externe Quellen liegen außerhalb (Internet, Messen, Kataloge, Vertreter).' },
    { id: 'w02-q002', kind: 'free', skill: 'w.beschaffung', difficulty: 2, prompt: 'Nenne **zwei Vorteile** interner Bezugsquellen und **einen Vorteil** externer Bezugsquellen.', modelAnswer: 'Intern: schnell verfügbar; Erfahrungen mit Zuverlässigkeit, Qualität und Lieferzeit liegen vor; oft bestehen bereits vereinbarte Konditionen (Rahmenvertrag). Extern: Man findet neue Lieferanten mit günstigeren Preisen, besseren Produkten oder kürzeren Lieferzeiten und erhält einen Marktüberblick.', keywords: ['schnell', 'Erfahrungen', 'Konditionen', 'neue Lieferanten', 'Marktüberblick'], explanation: 'Am besten kombiniert man beide: bewährte Lieferanten plus regelmäßiger Marktvergleich.' },
    { id: 'w02-q003', kind: 'match', skill: 'w.beschaffung', difficulty: 1, prompt: 'Ordne den Beschaffungsschritten die passenden Dokumente zu.', left: ['Anfrage', 'Bestellung', 'Lieferung', 'Abschluss der Beschaffung'], right: ['Bitte um ein Angebot', 'verbindlicher Auftrag an den Lieferanten', 'Lieferschein', 'Rechnung'], answer: [0, 1, 2, 3], explanation: 'Die Rechnung wird gegen Bestellung und Lieferschein geprüft (Rechnungsprüfung), bevor gezahlt wird.' },
    { id: 'w02-q004', kind: 'single', skill: 'w.angebot', difficulty: 1, prompt: 'Welche Aussage über die **Anfrage** ist richtig?', options: ['Sie ist rechtlich unverbindlich.', 'Sie verpflichtet zur Bestellung, wenn das Angebot passt.', 'Sie muss schriftlich erfolgen.', 'Man darf nur bei einem Lieferanten anfragen.'], answer: 0, distractors: { '1': { why: 'Eine Anfrage verpflichtet zu nichts.', error: 'w-anfrage-bindung' }, '2': { why: 'Die Anfrage ist formfrei (auch telefonisch).', error: 'w-anfrage-bindung' }, '3': { why: 'Gerade für den Vergleich fragt man bei mehreren Lieferanten an.', error: 'w-anfrage-bindung' } }, explanation: 'Die Anfrage ist unverbindlich und formfrei.' },
    { id: 'w02-q005', kind: 'table', skill: 'w.angebot', difficulty: 2, prompt: 'Ist der Anbieter **gebunden**? Antworte mit **ja** oder **nein**.', columns: [{ key: 'a', label: 'gebunden?', type: 'text' }], rows: [
      { label: 'Schriftliches Angebot an die Elektro Krämer GmbH, „gültig bis 15.12.“, Bestellung am 10.12.', cells: { a: { answer: 'ja' } } },
      { label: 'Produktseite in einem Onlineshop', cells: { a: { answer: 'nein' } } },
      { label: 'Angebot mit dem Zusatz „freibleibend“', cells: { a: { answer: 'nein' } } },
      { label: 'Telefonisches Angebot; der Kunde ruft zwei Tage später an und nimmt an', cells: { a: { answer: 'nein' } } },
      { label: 'Werbeprospekt mit Preisen', cells: { a: { answer: 'nein' } } },
    ], explanation: 'Zeile 1: innerhalb der Frist (§ 148 BGB). Zeile 2 und 5: Anpreisungen an die Allgemeinheit. Zeile 3: Freizeichnung. Zeile 4: telefonische Angebote müssen sofort angenommen werden (§ 147 Abs. 1 BGB).' },
    { id: 'w02-q006', kind: 'match', skill: 'w.angebot', difficulty: 2, prompt: 'Ordne die Freizeichnungsklauseln ihrer Wirkung zu.', left: ['„freibleibend“', '„solange Vorrat reicht“', '„Preis freibleibend“'], right: ['ganzes Angebot unverbindlich', 'Menge unverbindlich', 'Preis unverbindlich'], answer: [0, 1, 2], explanation: 'Freizeichnungsklauseln schränken die Bindung des Anbieters ganz oder teilweise ein.' },
    { id: 'w02-q007', kind: 'free', skill: 'w.angebot', difficulty: 2, prompt: 'Ein Lieferant hat ein Angebot über 10 Monitore zu je 239 € abgegeben. Die Elektro Krämer GmbH bestellt rechtzeitig, aber **12 Monitore zu je 225 €**. Ist ein Kaufvertrag zustande gekommen? Begründe.', modelAnswer: 'Nein. Die Bestellung weicht von Menge und Preis des Angebots ab. Eine Annahme mit Änderungen gilt als Ablehnung des Angebots verbunden mit einem neuen Antrag (§ 150 Abs. 2 BGB). Ein Kaufvertrag entsteht erst, wenn der Lieferant diesen neuen Antrag annimmt, z. B. durch Auftragsbestätigung oder Lieferung.', keywords: ['Abweichung', 'neuer Antrag', '§ 150', 'Auftragsbestätigung', 'kein Kaufvertrag'], explanation: 'Ein Vertrag braucht zwei übereinstimmende Willenserklärungen.' },
    { id: 'w02-q008', kind: 'table', skill: 'w.angebot', difficulty: 2, prompt: 'Im Angebot fehlen Angaben. Was gilt dann laut Gesetz? Antworte jeweils mit einem Stichwort: **sofort**, **käufer** oder **verkäufer**.', columns: [{ key: 'a', label: 'gesetzliche Regelung', type: 'text' }], rows: [
      { label: 'Lieferzeit', cells: { a: { answer: 'sofort' } } },
      { label: 'Zahlungszeitpunkt', cells: { a: { answer: 'sofort', accept: ['sofort bei lieferung', 'bei lieferung'] } } },
      { label: 'Wer trägt die Versendungskosten?', cells: { a: { answer: 'käufer', accept: ['kaeufer', 'der käufer'] } } },
    ], explanation: 'Ohne Vereinbarung: Lieferung sofort (§ 271 BGB), Zahlung sofort/Zug um Zug, Versendungskosten trägt der Käufer (§ 448 BGB).' },
    { id: 'w02-q009', kind: 'number', skill: 'w.bezugskalkulation', difficulty: 2, prompt: '**25 Dockingstations** kosten je **189,90 €** netto. Rabatt **8 %**, Skonto **3 %**, Versandkosten **29,90 €**. Berechne den **Bezugspreis je Stück** (Skonto wird genutzt; Zwischenergebnisse auf Cent runden, Endergebnis auf Cent).', answer: 170.66, tolerance: 0.01, unit: '€', misconceptions: [{ answer: '4266.57', error: 'w-stueckpreis', why: 'Das ist der Bezugspreis der **gesamten** Lieferung. Gefragt ist der Preis je Stück: ÷ 25.' }, { answer: '169.47', error: 'w-bezugskosten-vergessen', why: 'Die Versandkosten fehlen – sie werden auf alle Stücke verteilt.' }], hints: ['Erst den Bezugspreis der gesamten Lieferung berechnen, dann durch 25 teilen.'], explanation: 'LEP 25 × 189,90 € = 4.747,50 € − 8 % Rabatt (379,80 €) = ZEP 4.367,70 € − 3 % Skonto (131,031 ≈ 131,03 €) = BEP 4.236,67 € + 29,90 € = Bezugspreis 4.266,57 € ÷ 25 = 170,6628 € ≈ **170,66 €** je Stück.' },
    { id: 'w02-q010', kind: 'table', skill: 'w.bezugskalkulation', difficulty: 2, prompt: '**6 Workstations** kosten je **1.299,00 €** netto. Rabatt **5 %**, Skonto **2,5 %**, Versandpauschale **59,00 €**. Vervollständige die Bezugskalkulation (auf Cent runden, Abzüge als positive Beträge).', columns: [{ key: 'v', label: 'Betrag (€)', type: 'number' }], rows: [
      { label: 'Listeneinkaufspreis', cells: { v: { answer: '7794' } } },
      { label: '− Liefererrabatt', cells: { v: { answer: '389.70' } } },
      { label: '= Zieleinkaufspreis', cells: { v: { answer: '7404.30' } } },
      { label: '− Liefererskonto', cells: { v: { answer: '185.11' } } },
      { label: '= Bareinkaufspreis', cells: { v: { answer: '7219.19' } } },
      { label: '+ Bezugskosten', cells: { v: { given: '59,00' } } },
      { label: '= Bezugspreis', cells: { v: { answer: '7278.19' } } },
    ], misconceptions: [{ cell: '3:v', answer: '194.85', error: 'w-skonto-basis', why: 'Skonto vom Zieleinkaufspreis (7.404,30 €), nicht vom Listeneinkaufspreis.' }], explanation: '6 × 1.299,00 € = 7.794,00 € · 5 % = 389,70 € → 7.404,30 € · 2,5 % = 185,1075 ≈ 185,11 € → 7.219,19 € + 59,00 € = **7.278,19 €**.' },
    { id: 'w02-q011', kind: 'table', skill: 'w.bezugskalkulation', difficulty: 3, prompt: `Für **20 Thin Clients** liegen zwei Angebote vor (netto):

| | Angebot A | Angebot B |
|---|---|---|
| Listenpreis je Stück | 429,00 € | 449,00 € |
| Rabatt | 10 % | 15 % |
| Skonto | 2 % | 2 % |
| Lieferung | Fracht 75,00 € | frei Haus |

Berechne beide Bezugspreise (Skonto wird genutzt, auf Cent runden) und gib das günstigere Angebot (**A** oder **B**) an.`, columns: [{ key: 'v', label: 'Wert', type: 'text' }], rows: [
      { label: 'Bezugspreis A (€)', cells: { v: { answer: '7642,56', accept: ['7642.56', '7.642,56', '7642,56 €', '7.642,56 €'] } } },
      { label: 'Bezugspreis B (€)', cells: { v: { answer: '7480,34', accept: ['7480.34', '7.480,34', '7480,34 €', '7.480,34 €'] } } },
      { label: 'günstigeres Angebot', cells: { v: { answer: 'B', accept: ['angebot b'] } } },
    ], explanation: 'A: 8.580,00 € − 858,00 € = 7.722,00 € − 154,44 € = 7.567,56 € + 75,00 € = **7.642,56 €**. B: 8.980,00 € − 1.347,00 € = 7.633,00 € − 152,66 € = **7.480,34 €** (frei Haus). **B** ist um 162,22 € günstiger.' },
    { id: 'w02-q012', kind: 'order', skill: 'w.bezugskalkulation', difficulty: 1, prompt: 'Bringe das Schema der Bezugskalkulation in die richtige Reihenfolge.', items: ['Listeneinkaufspreis', '− Liefererrabatt', '= Zieleinkaufspreis', '− Liefererskonto', '= Bareinkaufspreis', '+ Bezugskosten', '= Bezugspreis'], explanation: 'Rabatt → Skonto → Bezugskosten.' },
    { id: 'w02-q013', kind: 'single', skill: 'w.bezugskalkulation', difficulty: 2, prompt: 'Wovon wird der **Liefererskonto** berechnet?', options: ['vom Listeneinkaufspreis', 'vom Zieleinkaufspreis', 'vom Bezugspreis', 'vom Bruttopreis inkl. Versand'], answer: 1, distractors: { '0': { why: 'Vom Listeneinkaufspreis wird nur der Rabatt berechnet.', error: 'w-skonto-basis' }, '2': { why: 'Der Bezugspreis enthält Bezugskosten – darauf gibt es keinen Skonto.', error: 'w-skonto-auf-bezugskosten' }, '3': { why: 'Im Vergleich wird netto gerechnet, und auf Versandkosten gibt es keinen Skonto.', error: 'w-skonto-auf-bezugskosten' } }, explanation: 'Skonto bezieht sich auf den Zieleinkaufspreis (Listenpreis nach Rabatt).' },
    { id: 'w02-q014', kind: 'free', skill: 'w.bezugskalkulation', difficulty: 2, prompt: 'Warum vergleicht ein vorsteuerabzugsberechtigtes Unternehmen Angebote anhand der **Nettopreise**?', modelAnswer: 'Die beim Einkauf gezahlte Umsatzsteuer ist für das Unternehmen Vorsteuer und wird mit der eigenen Umsatzsteuerschuld verrechnet bzw. vom Finanzamt erstattet. Sie ist damit kein Kostenbestandteil. Kosten sind nur die Nettobeträge.', keywords: ['Vorsteuer', 'Finanzamt', 'verrechnet', 'kein Kostenbestandteil'], explanation: 'Für Privatkunden (nicht vorsteuerabzugsberechtigt) zählt dagegen der Bruttopreis.' },
    { id: 'w02-q015', kind: 'number', skill: 'w.bezugskalkulation', difficulty: 1, prompt: 'Ein Switch kostet laut Liste **460,00 €** netto. Der Lieferer gewährt **10 % Rabatt**, die Lieferung ist frei Haus, Skonto wird nicht gewährt. Wie hoch ist der Bezugspreis?', answer: 414, tolerance: 0.01, unit: '€', misconceptions: [{ answer: '460', error: 'w-rabatt-vergessen', why: 'Der Rabatt muss abgezogen werden.' }, { answer: '46', error: 'w-rabatt-statt-preis', why: 'Das ist nur der Rabattbetrag.' }], explanation: '460,00 € − 10 % (46,00 €) = **414,00 €**; frei Haus → keine Bezugskosten.' },
    { id: 'w02-q016', kind: 'number', skill: 'w.nutzwertanalyse', difficulty: 2, prompt: `Berechne den Nutzwert von **Angebot A** (zwei Nachkommastellen).

| Kriterium | Gewicht | A |
|---|---|---|
| Preis | 50 % | 6 |
| Leistung | 30 % | 8 |
| Service | 20 % | 9 |`, answer: 7.2, tolerance: 0.005, accept: [720], misconceptions: [{ answer: '23', error: 'w-nutzwert-ungewichtet', why: 'Nur die Punkte addiert – Gewichtung fehlt.' }], explanation: '0,50 · 6 + 0,30 · 8 + 0,20 · 9 = 3,00 + 2,40 + 1,80 = **7,20**' },
    { id: 'w02-q017', kind: 'table', skill: 'w.nutzwertanalyse', difficulty: 2, prompt: `Werte die Nutzwertanalyse aus (zwei Nachkommastellen).

| Kriterium | Gewicht | A | B | C |
|---|---|---|---|---|
| Preis | 35 % | 7 | 9 | 6 |
| Leistung | 30 % | 8 | 6 | 9 |
| Service | 20 % | 6 | 7 | 9 |
| Lieferzeit | 15 % | 9 | 5 | 7 |

Trage Nutzwert und Rang ein.`, columns: [{ key: 'nw', label: 'Nutzwert', type: 'number' }, { key: 'r', label: 'Rang', type: 'number' }], rows: [
      { label: 'Angebot A', cells: { nw: { answer: '7.4', accept: ['740'] }, r: { answer: '2' } } },
      { label: 'Angebot B', cells: { nw: { answer: '7.1', accept: ['710'] }, r: { answer: '3' } } },
      { label: 'Angebot C', cells: { nw: { answer: '7.65', accept: ['765'] }, r: { answer: '1' } } },
    ], misconceptions: [{ cell: '0:nw', answer: '30', error: 'w-nutzwert-ungewichtet', why: 'Ungewichtete Punktsumme – Gewichte fehlen.' }, { cell: '2:nw', answer: '31', error: 'w-nutzwert-ungewichtet', why: 'Ungewichtete Punktsumme – Gewichte fehlen.' }], explanation: 'A: 2,45 + 2,40 + 1,20 + 1,35 = **7,40** · B: 3,15 + 1,80 + 1,40 + 0,75 = **7,10** · C: 2,10 + 2,70 + 1,80 + 1,05 = **7,65** → Rang 1: C, 2: A, 3: B.' },
    { id: 'w02-q018', kind: 'order', skill: 'w.nutzwertanalyse', difficulty: 1, prompt: 'Bringe die Schritte der Nutzwertanalyse in die richtige Reihenfolge.', items: ['K.-o.-Kriterien prüfen', 'Bewertungskriterien festlegen', 'Kriterien gewichten (Summe 100 %)', 'Punkte je Angebot und Kriterium vergeben', 'Teilnutzwerte berechnen (Gewicht × Punkte)', 'Nutzwerte summieren und Rangfolge bilden'], explanation: 'Kriterien und Gewichte werden festgelegt, **bevor** bewertet wird – sonst besteht die Gefahr, das Ergebnis „passend“ zu machen.' },
    { id: 'w02-q019', kind: 'free', skill: 'w.nutzwertanalyse', difficulty: 2, prompt: 'Nenne **zwei Vorteile** und **zwei Nachteile** der Nutzwertanalyse.', modelAnswer: 'Vorteile: Qualitative Kriterien werden berücksichtigt und in eine Zahl übersetzt; die Entscheidung wird nachvollziehbar, dokumentiert und lässt sich begründen; mehrere Kriterien und Angebote lassen sich systematisch vergleichen. Nachteile: Gewichtung und Punktvergabe sind subjektiv; das Ergebnis kann durch kleine Änderungen der Gewichte kippen; Aufwand für Kriterienfindung; Scheingenauigkeit durch Zahlen.', keywords: ['nachvollziehbar', 'qualitativ', 'subjektiv', 'Gewichtung', 'Scheingenauigkeit'], explanation: 'Abhilfe: Gewichte vorab mit dem Kunden festlegen, ggf. mehrere Personen bewerten lassen.' },
    { id: 'w02-q020', kind: 'free', skill: 'w.nutzwertanalyse', difficulty: 3, prompt: 'Angebot C hat in einer Nutzwertanalyse den **höchsten Nutzwert**, erfüllt aber das K.-o.-Kriterium „Lieferung innerhalb von 2 Wochen“ nicht (Lieferzeit 6 Wochen). Wie entscheidest du? Begründe.', modelAnswer: 'Angebot C scheidet aus. K.-o.-Kriterien sind Muss-Anforderungen und werden vor der Nutzwertberechnung geprüft. Ein Angebot, das eine Muss-Anforderung nicht erfüllt, kann unabhängig vom Nutzwert nicht gewählt werden. Empfohlen wird das Angebot mit dem höchsten Nutzwert unter den verbleibenden Angeboten (oder man verhandelt mit Lieferant C über eine kürzere Lieferzeit).', keywords: ['K.-o.-Kriterium', 'scheidet aus', 'Muss-Anforderung', 'vor der Bewertung', 'nächstbestes Angebot'], explanation: 'Ein hoher Nutzwert kann eine nicht erfüllte Muss-Anforderung nicht ausgleichen.' },
    { id: 'w02-q021', kind: 'multi', skill: 'w.nutzwertanalyse', difficulty: 1, prompt: 'Welche Kriterien sind **qualitative** Kriterien eines Angebotsvergleichs?', options: ['Garantie und Vor-Ort-Service', 'Bezugspreis', 'Zuverlässigkeit des Lieferanten', 'Ergonomie (z. B. Gewicht, Display)', 'Rabatt in Euro'], answer: [0, 2, 3], explanation: 'Bezugspreis und Rabatt sind quantitative (in Euro messbare) Größen.' },
    { id: 'w02-q022', kind: 'number', skill: 'w.nutzwertanalyse', difficulty: 3, prompt: `Bei einer Nutzwertanalyse fehlt das Gewicht für das Kriterium „Service“. Die Gewichte müssen sich zu 100 % ergänzen.

| Kriterium | Gewicht | Angebot A |
|---|---|---|
| Preis | 40 % | 7 |
| Leistung | 35 % | 8 |
| Service | ? | 4 |

Berechne den Nutzwert von Angebot A.`, answer: 6.6, tolerance: 0.005, accept: [660], misconceptions: [{ answer: '5.6', error: 'w-nutzwert-gewicht-fehlt', why: 'Das Kriterium Service wurde nicht berücksichtigt. Sein Gewicht beträgt 100 % − 40 % − 35 % = 25 %.' }], hints: ['Service-Gewicht = 100 % − 40 % − 35 %.'], explanation: 'Service-Gewicht: 100 % − 40 % − 35 % = 25 %. Nutzwert: 0,40 · 7 + 0,35 · 8 + 0,25 · 4 = 2,80 + 2,80 + 1,00 = **6,60**.' },
    { id: 'w02-q023', kind: 'free', skill: 'w.nutzwertanalyse', difficulty: 2, prompt: 'Wie kann man den **Preis** in einer Nutzwertanalyse in Punkte übersetzen? Beschreibe ein Verfahren.', modelAnswer: 'Das günstigste Angebot erhält die Höchstpunktzahl (z. B. 10 Punkte). Die übrigen Angebote erhalten Punkte im Verhältnis: Punkte = 10 × günstigster Preis ÷ eigener Preis (gerundet). Alternativ werden Preisklassen festgelegt (z. B. bis 900 € = 10 Punkte, bis 1.000 € = 8 Punkte usw.). Wichtig ist, dass die Regel vorher festgelegt und für alle Angebote gleich angewendet wird.', keywords: ['günstigstes', 'Höchstpunktzahl', 'Verhältnis', 'Preisklassen', 'vorher festlegen'], explanation: 'Der Preis ist meist das wichtigste Kriterium – die Umrechnung in Punkte muss nachvollziehbar sein.' },
    { id: 'w02-q024', kind: 'number', skill: 'w.entscheidung', difficulty: 1, prompt: 'Eine Rechnung über **4.760,00 €** wird innerhalb der Skontofrist mit **2 % Skonto** bezahlt. Wie hoch ist der **Skontobetrag**?', answer: 95.2, tolerance: 0.01, unit: '€', misconceptions: [{ answer: '4664.8', error: 'w-skonto-zahlbetrag', why: 'Das ist der Zahlbetrag. Gefragt ist nur der Skontobetrag.' }], explanation: '4.760,00 € × 2 % = **95,20 €** (Zahlbetrag 4.664,80 €).' },
    { id: 'w02-q025', kind: 'number', skill: 'w.entscheidung', difficulty: 2, prompt: 'Zahlungsbedingung: **2 % Skonto** bei Zahlung innerhalb von **8 Tagen**, sonst **30 Tage netto**. Welchem Jahreszinssatz entspricht der Lieferantenkredit ungefähr? (Faustformel, 360 Tage, auf zwei Nachkommastellen in Prozent)', answer: 32.73, tolerance: 0.01, unit: '%', misconceptions: [{ answer: '24', error: 'w-skonto-zins', why: 'Durch die **Differenz** (30 − 8 = 22 Tage) teilen, nicht durch 30.' }, { answer: '90', error: 'w-skonto-zins', why: 'Durch die Differenz aus Zahlungsziel und Skontofrist (22 Tage) teilen, nicht durch die Skontofrist.' }], explanation: '2 × 360 ÷ (30 − 8) = 720 ÷ 22 = 32,727… ≈ **32,73 %**.' },
    { id: 'w02-q026', kind: 'number', skill: 'w.entscheidung', difficulty: 3, prompt: 'Rechnung **8.330,00 €**, Bedingung **3 % Skonto** innerhalb 10 Tagen, sonst 40 Tage netto. Zur Skontozahlung wird ein Kontokorrentkredit zu **11 % p. a.** benötigt. Wie hoch ist die **Ersparnis** durch die Skontonutzung? (Bankjahr 360 Tage; Zinsen und Ergebnis auf Cent runden)', answer: 175.83, tolerance: 0.01, unit: '€', misconceptions: [{ answer: '249.9', error: 'w-skonto-kreditkosten', why: 'Das ist der Skontobetrag. Davon müssen noch die Kreditzinsen abgezogen werden.' }, { answer: '151.14', error: 'w-skonto-kreditdauer', why: 'Der Kredit wird nur für 30 Tage (40 − 10) benötigt, nicht für 40 Tage.' }], hints: ['Kredit läuft vom 10. bis zum 40. Tag.', 'Zinsen = Zahlbetrag × 11 % × 30 / 360.'], explanation: 'Skonto: 8.330,00 € × 3 % = 249,90 € → Zahlbetrag 8.080,10 €. Kreditdauer 40 − 10 = 30 Tage. Zinsen: 8.080,10 € × 11 % × 30 / 360 = 74,0676 ≈ 74,07 €. Ersparnis: 249,90 € − 74,07 € = **175,83 €**.' },
    { id: 'w02-q027', kind: 'free', skill: 'w.entscheidung', difficulty: 2, prompt: `Formuliere eine **begründete Empfehlung** (3–4 Sätze) auf Basis folgender Ergebnisse:

| | Angebot A | Angebot B |
|---|---|---|
| Bezugspreis | 7.642,56 € | 7.480,34 € |
| Nutzwert | 7,8 | 7,2 |
| Lieferzeit | 3 Tage | 15 Tage |
| Service | 3 Jahre Vor-Ort | 1 Jahr Bring-in |

Die Geräte werden in 10 Tagen benötigt.`, modelAnswer: 'Wir empfehlen Angebot A. Es ist zwar um 162,22 € teurer als Angebot B, erreicht aber den höheren Nutzwert (7,8 gegenüber 7,2). Entscheidend ist, dass nur A den Termin einhält – B liefert erst nach 15 Tagen, die Geräte werden aber in 10 Tagen benötigt. Zusätzlich bietet A drei Jahre Vor-Ort-Service, was Ausfallzeiten reduziert.', keywords: ['Angebot A', '162,22', 'Nutzwert', 'Lieferzeit', 'Termin', 'Vor-Ort-Service'], explanation: 'Eine gute Begründung nennt die Empfehlung, die Zahlen (Preisdifferenz, Nutzwert) und die entscheidenden qualitativen Argumente (Termin, Service).' },
    { id: 'w02-q028', kind: 'single', skill: 'w.entscheidung', difficulty: 2, prompt: 'Die Elektro Krämer GmbH nimmt ein **verbindliches, befristetes** Angebot innerhalb der Frist **unverändert** an. Was gilt?', options: ['Der Kaufvertrag ist mit der Bestellung zustande gekommen.', 'Der Vertrag entsteht erst mit der Auftragsbestätigung.', 'Der Vertrag entsteht erst mit der Lieferung.', 'Es entsteht kein Vertrag, weil die Bestellung ein neues Angebot ist.'], answer: 0, distractors: { '1': { why: 'Eine Auftragsbestätigung ist hier nicht nötig – das Angebot (Antrag) wurde rechtzeitig und unverändert angenommen.', error: 'w-vertrag-zustandekommen' }, '2': { why: 'Die Lieferung ist schon die Erfüllung eines bestehenden Vertrags.', error: 'w-vertrag-zustandekommen' }, '3': { why: 'Ein neues Angebot liegt nur bei verspäteter oder geänderter Annahme vor.', error: 'w-vertrag-zustandekommen' } }, explanation: 'Antrag (Angebot) + Annahme (Bestellung) = Kaufvertrag.' },
    { id: 'w02-q029', kind: 'text', skill: 'w.angebot', difficulty: 1, prompt: 'Wie heißt der Preisnachlass, den ein Lieferant für eine **Zahlung innerhalb einer kurzen Frist** gewährt?', accept: ['skonto', 'der skonto', 'das skonto'], misconceptions: [{ answer: 'rabatt', error: 'w-rabatt-skonto-verwechselt', why: 'Rabatt ist ein Nachlass z. B. für Menge oder Treue – für schnelle Zahlung gibt es Skonto.' }], explanation: '**Skonto** – z. B. „2 % Skonto bei Zahlung innerhalb von 10 Tagen“.' },
    { id: 'w02-q030', kind: 'match', skill: 'w.angebot', difficulty: 2, prompt: 'Ordne die Lieferbedingungen zu: Wer trägt die Transportkosten?', left: ['„ab Werk“', '„frei Haus“', 'keine Vereinbarung (gesetzliche Regelung)'], right: ['Käufer trägt alle Transportkosten', 'Verkäufer trägt alle Transportkosten', 'Käufer trägt die Versendungskosten (§ 448 BGB)'], answer: [0, 1, 2], explanation: '„Frei Haus“ ist für den Käufer am günstigsten; bei „ab Werk“ und ohne Vereinbarung muss er den Versand bezahlen.' },
    { id: 'w02-q031', kind: 'free', skill: 'w.beschaffung', difficulty: 2, prompt: 'Die gelieferten Notebooks kommen mit Lieferschein an. Nenne **vier Prüfungen**, die du beim **Wareneingang** durchführst.', modelAnswer: '1. Stimmt die Lieferanschrift / sind wir der richtige Empfänger? 2. Stimmt die Anzahl der Packstücke mit dem Lieferschein überein? 3. Sind Verpackungen äußerlich beschädigt? (Schäden sofort auf dem Lieferschein vermerken und vom Fahrer bestätigen lassen) 4. Stimmen Artikel, Modell und Menge mit Lieferschein und Bestellung überein? Danach zeitnah Inhalt und Funktion prüfen (Seriennummern, Ausstattung, Funktionstest).', keywords: ['Lieferschein', 'Menge', 'Beschädigung', 'Bestellung', 'Funktionstest', 'unverzüglich'], explanation: 'Unter Kaufleuten müssen Mängel unverzüglich gerügt werden (§ 377 HGB) – deshalb sofort prüfen.' },
    { id: 'w02-q032', kind: 'number', skill: 'w.bezugskalkulation', difficulty: 3, prompt: 'Für 8 Notebooks stehen höchstens **7.000,00 €** (Bezugspreis, netto) zur Verfügung. Der Lieferer gewährt **10 % Rabatt**, kein Skonto; die Lieferung ist frei Haus. Welcher **Listenpreis je Stück** darf höchstens verlangt werden? (auf Cent abrunden)', answer: 972.22, tolerance: 0.01, unit: '€', misconceptions: [{ answer: '962.5', error: 'w-rueckwaerts-prozent', why: 'Beim Rückwärtsrechnen nicht 10 % aufschlagen: Der Zieleinkaufspreis entspricht 90 % des Listenpreises → ÷ 0,90.' }, { answer: '875', error: 'w-rabatt-vergessen', why: 'Der Rabatt wurde nicht berücksichtigt.' }], hints: ['Rückwärts rechnen: 7.000 € entsprechen 90 % des Listeneinkaufspreises.'], explanation: 'Listeneinkaufspreis = 7.000,00 € ÷ 0,90 = 7.777,78 € (für 8 Stück). Je Stück: 7.777,78 € ÷ 8 = 972,222… → höchstens **972,22 €** (abrunden, damit das Budget nicht überschritten wird). Probe: 8 × 972,22 € = 7.777,76 € − 10 % = 6.999,98 € ≤ 7.000 €.' },
  ],
};
