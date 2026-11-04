import type { Module } from '../types';

export const w03: Module = {
  id: 'w03',
  nr: 3,
  area: 'wirtschaft',
  title: 'Kalkulation & Wirtschaftlichkeit',
  short: 'Umsatzsteuer, Angebotspreise kalkulieren, IT-Dienstleistungen abrechnen, Kauf vs. Leasing vs. Miete, Amortisation, Abschreibung und Total Cost of Ownership.',
  icon: 'Calculator',
  relevance: 'ap1',
  prerequisites: ['w02'],
  generators: ['w.angebotspreis', 'w.dienstleistung', 'w.kaufleasing', 'w.amortisation', 'w.afa', 'w.kalkulation', 'w.handelsspanne', 'w.stundensatz', 'w.finanzierung', 'w.tarif', 'w.roi', 'w.veraenderung', 'w.makeorbuy', 'w.sollist'],
  skills: [
    { id: 'w.umsatzsteuer', module: 'w03', title: 'Umsatzsteuer: netto, brutto, Vorsteuer' },
    { id: 'w.handelskalkulation', module: 'w03', title: 'Verkaufspreis kalkulieren (Handelskalkulation)', requires: ['w.umsatzsteuer', 'w.bezugskalkulation'] },
    { id: 'w.dienstleistungsangebot', module: 'w03', title: 'IT-Dienstleistungen kalkulieren (Stundensatz, Pauschalen)', requires: ['w.umsatzsteuer'] },
    { id: 'w.kaufleasing', module: 'w03', title: 'Kauf, Miete und Leasing vergleichen' },
    { id: 'w.amortisation', module: 'w03', title: 'Amortisation und kritische Menge', requires: ['w.kaufleasing'] },
    { id: 'w.abschreibung', module: 'w03', title: 'Abschreibung (AfA) und geringwertige Wirtschaftsgüter' },
    { id: 'w.tco', module: 'w03', title: 'Total Cost of Ownership (Gesamtkosten)', requires: ['w.kaufleasing'] },
    { id: 'w.handelsspanne', module: 'w03', title: 'Kalkulationszuschlag, Handelsspanne und Kalkulationsfaktor', requires: ['w.handelskalkulation'] },
    { id: 'w.stundensatz', module: 'w03', title: 'Stundensatz und Minutensatz herleiten', requires: ['w.dienstleistungsangebot'] },
    { id: 'w.finanzierung', module: 'w03', title: 'Darlehen und Leasing vergleichen', requires: ['w.kaufleasing'] },
    { id: 'w.tarifvergleich', module: 'w03', title: 'Tarife vergleichen und Break-even bestimmen' },
    { id: 'w.roi', module: 'w03', title: 'ROI (Kapitalrendite) berechnen', requires: ['w.amortisation'] },
    { id: 'w.prozentvergleich', module: 'w03', title: 'Prozentuale Veränderung und Soll-Ist-Vergleich' },
  ],
  lessons: [
    /* ------------------------------------------------------------ */
    {
      id: 'w03-l01',
      title: 'Umsatzsteuer: netto, brutto und Vorsteuer',
      minutes: 15,
      relevance: 'ap1',
      skills: ['w.umsatzsteuer'],
      steps: [
        {
          type: 'explain',
          title: 'Drei Rechenwege, die du sicher können musst',
          body: `Unternehmen schlagen auf ihre Leistungen **Umsatzsteuer (USt)** auf. In Deutschland gilt der **Regelsteuersatz von 19 %** (z. B. Hardware, Software, IT-Dienstleistungen); der **ermäßigte Satz von 7 %** gilt u. a. für Bücher und viele Lebensmittel.

| Gesucht | Rechnung | Beispiel (19 %) |
|---|---|---|
| Bruttopreis aus Netto | Netto × 1,19 | 1.250,00 € × 1,19 = **1.487,50 €** |
| USt-Betrag aus Netto | Netto × 0,19 | 1.250,00 € × 0,19 = **237,50 €** |
| Nettopreis aus Brutto | Brutto ÷ 1,19 | 2.380,00 € ÷ 1,19 = **2.000,00 €** |
| USt-Betrag aus Brutto | Brutto × 19 ÷ 119 | 595,00 € × 19 ÷ 119 = **95,00 €** |

**Typischer Fehler:** Die USt aus einem Bruttobetrag mit „× 19 %“ berechnen. 595 € × 0,19 = 113,05 € ist **falsch**, denn die 19 % beziehen sich auf den **Nettobetrag** (100 %), und der Bruttobetrag entspricht 119 %.

**Vorsteuer und Zahllast:** Ein Unternehmen zahlt beim Einkauf USt an den Lieferanten – aus seiner Sicht ist das **Vorsteuer**. Beim Verkauf stellt es seinen Kunden USt in Rechnung. An das Finanzamt überweist es nur die Differenz, die **Zahllast**:

> Zahllast = Umsatzsteuer (aus Verkäufen) − Vorsteuer (aus Einkäufen)

*Beispiel:* Umsätze 50.000 € netto → 9.500 € USt; Einkäufe 30.000 € netto → 5.700 € Vorsteuer → Zahllast **3.800 €**.

Deshalb ist die USt für vorsteuerabzugsberechtigte Unternehmen **kein Kostenfaktor** – Kalkulationen und Angebotsvergleiche laufen mit **Nettopreisen**. Privatkunden (Endverbraucher) tragen die USt dagegen tatsächlich; ihnen zeigt man **Bruttopreise**.`,
        },
        {
          type: 'visual',
          title: 'Netto – USt – Brutto',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Netto = 100 %', text: 'Basis für die Umsatzsteuer. Brutto ÷ 1,19 = Netto.', icon: 'Square' },
                { title: 'USt = 19 %', text: 'Netto × 0,19 – oder aus Brutto: Brutto × 19 ÷ 119.', icon: 'Percent' },
                { title: 'Brutto = 119 %', text: 'Netto × 1,19. Diesen Betrag zahlt der Kunde.', icon: 'Wallet' },
              ],
            },
          },
          caption: 'Die 19 % beziehen sich immer auf den Nettobetrag.',
        },
        {
          type: 'example',
          title: 'Rechnungsbetrag zerlegen',
          problem: 'Ein Notebook kostet laut Rechnung **1.785,00 €** inklusive 19 % Umsatzsteuer. Wie hoch sind Nettopreis und Umsatzsteuer?',
          steps: [
            { label: 'Netto', body: '1.785,00 € ÷ 1,19 = **1.500,00 €**' },
            { label: 'USt', body: '1.785,00 € − 1.500,00 € = **285,00 €** (Kontrolle: 1.500,00 € × 0,19 = 285,00 €)' },
          ],
          result: 'Netto 1.500,00 €, Umsatzsteuer 285,00 €.',
        },
        {
          type: 'check',
          question: {
            id: 'w03-c01', kind: 'number', skill: 'w.umsatzsteuer', difficulty: 1,
            prompt: 'Ein Monitor kostet **595,00 € brutto** (19 % USt). Wie hoch ist der enthaltene **Umsatzsteuerbetrag**?',
            answer: 95, tolerance: 0.01, unit: '€',
            misconceptions: [{ answer: '113.05', error: 'w-ust-aus-brutto', why: '19 % beziehen sich auf den **Nettobetrag**. Aus dem Bruttobetrag: × 19 ÷ 119 (oder Brutto − Brutto ÷ 1,19).' }],
            explanation: '595,00 € ÷ 1,19 = 500,00 € netto → USt = 595,00 € − 500,00 € = **95,00 €**.',
          },
        },
        { type: 'practice', title: 'Übung: Umsatzsteuer', questionIds: ['w03-q001', 'w03-q002', 'w03-q003', 'w03-q004'], count: 4, difficulty: 1 },
        { type: 'summary', points: ['Regelsatz 19 %, ermäßigt 7 %.', 'Brutto = Netto × 1,19; Netto = Brutto ÷ 1,19.', 'USt aus Brutto: × 19 ÷ 119 – nicht × 19 %.', 'Zahllast = Umsatzsteuer − Vorsteuer.', 'Unternehmen kalkulieren netto.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'w03-l02',
      title: 'Den Verkaufspreis kalkulieren (Handelskalkulation)',
      minutes: 30,
      relevance: 'ap1',
      skills: ['w.handelskalkulation'],
      steps: [
        {
          type: 'explain',
          title: 'Vom Einkaufs- zum Angebotspreis',
          body: `Ein IT-Systemhaus kauft Hardware ein und verkauft sie an Kunden weiter. Der Verkaufspreis muss alle Kosten decken und Gewinn bringen. Die **Vorwärtskalkulation** baut auf der Bezugskalkulation auf:

| Schritt | Berechnung | Bedeutung |
|---|---|---|
| **Bezugspreis** | aus der Bezugskalkulation | Einkaufskosten der Ware |
| + Handlungskosten | % vom Bezugspreis (Handlungskostenzuschlag) | Gemeinkosten: Personal, Miete, Lager, Verwaltung … |
| **= Selbstkosten** | | Alle Kosten für dieses Produkt |
| + Gewinn | % von den Selbstkosten (Gewinnzuschlag) | |
| **= Barverkaufspreis** | | Was beim Unternehmen ankommen soll |
| + Kundenskonto | **im Hundert**: Barverkaufspreis ÷ (100 − s) × s | damit nach Skontoabzug der Barverkaufspreis bleibt |
| **= Zielverkaufspreis** | | |
| + Kundenrabatt | **im Hundert**: Zielverkaufspreis ÷ (100 − r) × r | |
| **= Listenverkaufspreis netto** | | Angebotspreis netto |
| + Umsatzsteuer 19 % | vom Netto | |
| **= Listenverkaufspreis brutto** | | |

**Warum „im Hundert“?** Der Kunde zieht Rabatt und Skonto vom **höheren** Preis ab. Damit am Ende genau der Barverkaufspreis übrig bleibt, entspricht dieser 100 % − Skontosatz. Beispiel: Barverkaufspreis 880 €, Kundenskonto 2 % → 880 € sind 98 % → Zielverkaufspreis = 880 ÷ 0,98 = 897,96 €. Probe: 897,96 € − 2 % (17,96 €) = 880,00 € ✔. Rechnest du stattdessen 880 € + 2 % = 897,60 €, fehlen nach Abzug des Skontos Geld.

**Gewinn ≠ Zuschläge addieren:** Der Gewinnzuschlag bezieht sich auf die Selbstkosten (Bezugspreis **plus** Handlungskosten). 25 % + 10 % einfach zu addieren (35 % vom Bezugspreis) ergibt einen zu niedrigen Preis.

**Weitere Kalkulationsarten:**
- **Rückwärtskalkulation:** Der Marktpreis ist vorgegeben → rückwärts rechnen, welcher Bezugspreis höchstens bezahlt werden darf (Rabatt/Skonto dann **vom Hundert** abziehen, Zuschläge durch Division herausrechnen).
- **Differenzkalkulation:** Bezugspreis und Verkaufspreis sind vorgegeben → ermitteln, wie viel Gewinn bleibt (Gewinn = Barverkaufspreis − Selbstkosten).`,
        },
        {
          type: 'visual',
          title: 'Kalkulationsarten',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Vorwärtskalkulation', text: 'Bezugspreis gegeben → Verkaufspreis berechnen. Zuschläge auf-, Skonto/Rabatt im Hundert.', icon: 'ArrowRight' },
                { title: 'Rückwärtskalkulation', text: 'Verkaufspreis (Markt) gegeben → maximaler Bezugspreis. Rabatt/Skonto vom Hundert abziehen.', icon: 'ArrowLeft' },
                { title: 'Differenzkalkulation', text: 'Beide Preise gegeben → Gewinn = Barverkaufspreis − Selbstkosten.', icon: 'ArrowLeftRight' },
              ],
            },
          },
          caption: 'In der AP1 am häufigsten: Netto- und Bruttoangebotspreis mit Gewinnzuschlag und Umsatzsteuer.',
        },
        {
          type: 'example',
          title: 'Angebotspreis für einen Thin Client',
          problem: 'Bezugspreis **640,00 €**, Handlungskostenzuschlag **25 %**, Gewinnzuschlag **10 %**, Kundenskonto **2 %**, Kundenrabatt **10 %**, USt 19 %. Berechne den Listenverkaufspreis netto und brutto (jeden Schritt auf Cent runden).',
          steps: [
            { label: 'Selbstkosten', body: '640,00 € + 25 % (160,00 €) = **800,00 €**' },
            { label: 'Barverkaufspreis', body: '800,00 € + 10 % (80,00 €) = **880,00 €**' },
            { label: 'Zielverkaufspreis (Skonto im Hundert)', body: '880,00 € ÷ 0,98 = 897,959… ≈ **897,96 €** (Skonto 17,96 €)' },
            { label: 'Listenverkaufspreis netto (Rabatt im Hundert)', body: '897,96 € ÷ 0,90 = 997,733… ≈ **997,73 €** (Rabatt 99,77 €)' },
            { label: 'Brutto', body: '997,73 € × 0,19 = 189,5687 ≈ 189,57 € USt → **1.187,30 €**' },
            { label: 'Probe', body: '997,73 € − 10 % (99,77 €) = 897,96 € − 2 % (17,96 €) = 880,00 € ✔' },
          ],
          result: 'Listenverkaufspreis netto **997,73 €**, brutto **1.187,30 €**.',
        },
        {
          type: 'check',
          question: {
            id: 'w03-c02', kind: 'number', skill: 'w.handelskalkulation', difficulty: 2,
            prompt: 'Bezugspreis **1.180,00 €**, Handlungskostenzuschlag **20 %**, Gewinnzuschlag **12,5 %**, kein Kundenskonto/-rabatt. Berechne den **Bruttoverkaufspreis** (19 % USt, auf Cent runden).',
            answer: 1895.67, tolerance: 0.01, unit: '€',
            misconceptions: [
              { answer: '1593', error: 'w-ust-vergessen', why: 'Das ist der Nettopreis – es fehlen 19 % USt.' },
              { answer: '1860.56', error: 'w-zuschlaege-addiert', why: 'Die Zuschläge dürfen nicht addiert werden: Der Gewinn bezieht sich auf die Selbstkosten (inkl. Handlungskosten).' },
            ],
            hints: ['Selbstkosten = Bezugspreis + 20 %.', 'Gewinn = 12,5 % der Selbstkosten.'],
            explanation: 'Selbstkosten: 1.180,00 € + 236,00 € = 1.416,00 € · Gewinn: 1.416,00 € × 12,5 % = 177,00 € → netto 1.593,00 € · USt 302,67 € → **1.895,67 €**.',
          },
        },
        { type: 'practice', title: 'Übung: Angebotspreise kalkulieren', generator: 'w.angebotspreis', count: 3, difficulty: 2 },
        { type: 'practice', title: 'Prüfungsniveau: mit Kundenskonto und -rabatt', generator: 'w.angebotspreis', count: 2, difficulty: 3 },
        { type: 'summary', points: ['Bezugspreis + Handlungskosten = Selbstkosten + Gewinn = Barverkaufspreis.', 'Kundenskonto und -rabatt im Hundert: ÷ (1 − Satz).', '+ 19 % USt = Bruttopreis.', 'Zuschläge nie addieren; jeder Zuschlag hat seine eigene Basis.', 'Rückwärts- und Differenzkalkulation für vorgegebene Marktpreise.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'w03-l03',
      title: 'IT-Dienstleistungen kalkulieren und abrechnen',
      minutes: 20,
      relevance: 'ap1',
      skills: ['w.dienstleistungsangebot'],
      steps: [
        {
          type: 'explain',
          title: 'Stundensatz, Material, Anfahrt',
          body: `Beim Einrichten von Arbeitsplätzen verkauft ein Systemhaus nicht nur Hardware, sondern auch **Arbeitszeit**. Ein Angebot für eine Dienstleistung besteht typischerweise aus:

| Position | Berechnung |
|---|---|
| Arbeitsleistung | Arbeitszeit in **Stunden** × Stundenverrechnungssatz |
| Material | Kabel, Kleinteile, Lizenzen (pauschal oder einzeln) |
| Anfahrt | Pauschale je Anfahrt oder km-Satz |
| ggf. Rabatt | nur auf die vereinbarten Positionen |
| **= Netto** | |
| + 19 % USt | |
| **= Brutto** | |

**Stundenverrechnungssatz:** Er ist deutlich höher als der Stundenlohn des Technikers, denn er muss Lohnnebenkosten (Sozialversicherung), nicht abrechenbare Zeiten (Urlaub, Krankheit, Fortbildung, Fahrzeiten), Gemeinkosten (Fahrzeug, Werkzeug, Büro, Verwaltung) **und** Gewinn decken.

*Vereinfachtes Beispiel:* Personalkosten 45,00 €/h + 60 % Gemeinkostenzuschlag (27,00 €) = 72,00 €/h Selbstkosten + 15 % Gewinn (10,80 €) = **82,80 €/h**.

**Minuten in Stunden umrechnen:** 75 min = 75 ÷ 60 = **1,25 h** (nicht 1,75 h!).
**Abrechnungstakt:** Häufig wird in angefangenen Takten abgerechnet, z. B. **je angefangene 15 Minuten**. Ein Einsatz von 1 h 50 min wird dann als 2 h (8 × 15 min) berechnet.

**Pauschal- oder Aufwandsabrechnung?** Ein **Festpreis** gibt dem Kunden Kostensicherheit, das Risiko von Mehraufwand trägt der Dienstleister. Bei **Abrechnung nach Aufwand** zahlt der Kunde die tatsächlich angefallene Zeit – Stundennachweise (Arbeitsbericht/Servicebericht) sind dann Pflicht.`,
        },
        {
          type: 'example',
          title: 'Angebot für die Einrichtung von 6 Arbeitsplätzen',
          problem: 'Für die Einrichtung von **6 Arbeitsplätzen** werden je **75 Minuten** kalkuliert. Stundenverrechnungssatz **95,00 €**, Material pauschal **180,00 €**, **2 Anfahrten** zu je **49,00 €**. Berechne den Angebotspreis brutto (auf Cent runden).',
          steps: [
            { label: 'Arbeitszeit', body: '6 × 75 min = 450 min = 450 ÷ 60 = **7,5 h**' },
            { label: 'Arbeitsleistung', body: '7,5 h × 95,00 € = **712,50 €**' },
            { label: 'Netto', body: '712,50 € + 180,00 € + 2 × 49,00 € = **990,50 €**' },
            { label: 'USt', body: '990,50 € × 0,19 = 188,195 ≈ **188,20 €**' },
            { label: 'Brutto', body: '990,50 € + 188,20 € = **1.178,70 €**' },
          ],
          result: 'Angebotspreis: 990,50 € netto, **1.178,70 € brutto**.',
        },
        {
          type: 'check',
          question: {
            id: 'w03-c03', kind: 'number', skill: 'w.dienstleistungsangebot', difficulty: 2,
            prompt: 'Ein Techniker war **1 Stunde 50 Minuten** beim Kunden. Abgerechnet wird **je angefangene 15 Minuten** zu einem Stundensatz von **95,00 €** netto, zuzüglich einer Anfahrtspauschale von **49,00 €** netto. Wie hoch ist der **Rechnungsbetrag brutto** (19 % USt)?',
            answer: 284.41, tolerance: 0.01, unit: '€',
            misconceptions: [
              { answer: '265.57', error: 'w-abrechnungstakt', why: 'Abgerechnet wird je **angefangene** 15 Minuten: 110 min → 8 Takte = 2 h, nicht 1,83 h.' },
              { answer: '239', error: 'w-ust-vergessen', why: 'Das ist der Nettobetrag – es fehlen 19 % USt.' },
            ],
            hints: ['110 Minuten ÷ 15 = 7,33 → 8 angefangene Takte.', '8 × 15 min = 2 h.'],
            explanation: '110 min → 8 angefangene 15-Minuten-Takte = 2 h × 95,00 € = 190,00 € + 49,00 € = 239,00 € netto · USt 45,41 € → **284,41 €**.',
          },
        },
        { type: 'practice', title: 'Übung: Dienstleistungsangebote', generator: 'w.dienstleistung', count: 3, difficulty: 2 },
        { type: 'summary', points: ['Angebot = Arbeitszeit × Stundensatz + Material + Anfahrt (+ USt).', 'Minuten ÷ 60 = Stunden (75 min = 1,25 h).', 'Angefangene Takte immer aufrunden.', 'Stundensatz deckt Lohn, Nebenkosten, Gemeinkosten und Gewinn.', 'Festpreis = Risiko beim Dienstleister; Aufwand = Stundennachweis nötig.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'w03-l04',
      title: 'Kaufen, mieten oder leasen?',
      minutes: 25,
      relevance: 'ap1',
      skills: ['w.kaufleasing'],
      steps: [
        {
          type: 'explain',
          title: 'Drei Wege zur Hardware',
          body: `| | **Kauf** | **Leasing** | **Miete** |
|---|---|---|---|
| Eigentum | geht auf das Unternehmen über | bleibt beim Leasinggeber | bleibt beim Vermieter |
| Zahlung | einmalig (Kaufpreis), ggf. Finanzierung | monatliche Leasingrate, evtl. Sonderzahlung | monatliche Miete |
| Laufzeit | unbegrenzt nutzbar | fest (meist 24–60 Monate), vorzeitig kaum kündbar | oft flexibel, kürzere Kündigungsfristen |
| Wartung/Service | selbst organisieren und bezahlen | meist **nicht** enthalten (optional Serviceleasing) | oft **enthalten** |
| Am Ende | Gerät weiter nutzen oder verkaufen | Rückgabe (oder Kauf/Verlängerung, je nach Vertrag) | Rückgabe |
| Liquidität | bindet sofort viel Kapital | schont Liquidität | schont Liquidität |
| Technik aktuell? | Gefahr veralteter Geräte | regelmäßiger Austausch möglich | flexibel |
| Bilanz/Steuer | Abschreibung (AfA) | Raten als Betriebsausgabe (bei üblichen Verträgen) | Miete als Betriebsausgabe |

**Rechnerischer Vergleich:** Rechne für jede Variante die **Gesamtkosten über dieselbe Laufzeit** – mit allen Kostenbestandteilen:
- **Kauf:** Kaufpreis + Wartung/Service über die Laufzeit (− Verkaufserlös am Ende, falls angegeben)
- **Leasing:** Sonderzahlung + Rate × Monate + Wartung, falls nicht enthalten
- **Miete:** Miete × Monate (+ Nebenkosten, falls nicht enthalten)

**Typische Prüfungsfallen:** Rate gilt **pro Gerät** oder **für alle**? Wartung **pro Jahr** oder **pro Monat**? Laufzeit in **Monaten** vs. Wartung in **Jahren**? Sind Verbrauchsmaterialien enthalten?

Die günstigste Variante ist nicht automatisch die beste: Liquidität, Flexibilität und Aktualität der Technik gehören in die Begründung.`,
        },
        {
          type: 'example',
          title: '10 Notebooks für 36 Monate',
          problem: `Die Elektro Krämer GmbH braucht **10 Notebooks für 36 Monate**. (alle Beträge netto)

| | Kauf | Leasing | Miete |
|---|---|---|---|
| Einmalig | 1.099,00 € je Gerät | – | – |
| Monatlich | – | 31,50 € je Gerät | 38,90 € je Gerät **inkl. Wartung** |
| Wartung | 80,00 € je Gerät und Jahr | 80,00 € je Gerät und Jahr | inklusive |

Vergleiche die Gesamtkosten.`,
          steps: [
            { label: 'Kauf', body: '10 × 1.099,00 € + 10 × 80,00 € × 3 Jahre = 10.990,00 € + 2.400,00 € = **13.390,00 €**' },
            { label: 'Leasing', body: '10 × 31,50 € × 36 Monate + 2.400,00 € Wartung = 11.340,00 € + 2.400,00 € = **13.740,00 €**' },
            { label: 'Miete', body: '10 × 38,90 € × 36 Monate = **14.004,00 €**' },
            { label: 'Bewertung', body: 'Kauf ist am günstigsten (350,00 € unter Leasing), bindet aber sofort 10.990,00 € Kapital. Leasing schont die Liquidität; die Miete ist am teuersten, enthält aber Wartung und ist flexibler.' },
          ],
          result: 'Rangfolge nach Kosten: Kauf (13.390 €) < Leasing (13.740 €) < Miete (14.004 €). Die Empfehlung hängt zusätzlich von Liquidität und Flexibilität ab.',
        },
        {
          type: 'check',
          question: {
            id: 'w03-c04', kind: 'number', skill: 'w.kaufleasing', difficulty: 2,
            prompt: 'Ein Multifunktionsdrucker wird **48 Monate** geleast: Sonderzahlung **600,00 €**, monatliche Rate **89,00 €**, Wartung **240,00 € pro Jahr** (nicht in der Rate enthalten). Wie hoch sind die **Gesamtkosten** der Leasingvariante?',
            answer: 5832, tolerance: 0.01, unit: '€',
            misconceptions: [
              { answer: '4872', error: 'w-kosten-unvollstaendig', why: 'Die Wartung (4 Jahre × 240 €) fehlt.' },
              { answer: '16392', error: 'w-laufzeit', why: 'Die Wartung gilt **pro Jahr** (4 Jahre), nicht pro Monat.' },
              { answer: '5232', error: 'w-kosten-unvollstaendig', why: 'Die Sonderzahlung fehlt.' },
            ],
            explanation: '600,00 € + 48 × 89,00 € + 4 × 240,00 € = 600,00 € + 4.272,00 € + 960,00 € = **5.832,00 €**.',
          },
        },
        { type: 'practice', title: 'Übung: Gesamtkosten vergleichen', generator: 'w.kaufleasing', count: 3, difficulty: 2 },
        { type: 'summary', points: ['Kauf: Eigentum, hoher Kapitalbedarf, Wartung selbst.', 'Leasing: feste Laufzeit, Rate, Liquidität geschont, Eigentum beim Leasinggeber.', 'Miete: flexibel, oft inkl. Service, meist am teuersten.', 'Immer gleiche Laufzeit und alle Kosten vergleichen (Einheiten: Monat/Jahr, pro Gerät/gesamt).'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'w03-l05',
      title: 'Amortisation und kritische Menge',
      minutes: 25,
      relevance: 'ap1',
      skills: ['w.amortisation'],
      steps: [
        {
          type: 'explain',
          title: 'Wann hat sich eine Investition bezahlt gemacht?',
          body: `Viele IT-Investitionen sollen **Kosten senken**: sparsamere Geräte, ein Dokumentenmanagementsystem statt Papier, VoIP statt teurer Telefonanlage. Die **Amortisationsrechnung** beantwortet: *Nach welcher Zeit haben die Einsparungen die Investition wieder eingespielt?*

> **Amortisationsdauer = Investition ÷ Einsparung pro Zeiteinheit**

Die Einheit des Ergebnisses entspricht der Einheit der Einsparung (Einsparung pro Monat → Monate, pro Jahr → Jahre).

**Einsparung aus Energie** (typische AP1-Verbindung zu P = U · I und W = P · t):
1. Leistungsdifferenz: (alt − neu) × Anzahl Geräte, in Watt
2. Energie: Watt × Betriebsstunden ÷ 1000 = kWh
3. Kosten: kWh × Strompreis

Weitere laufende Kosten und Einsparungen (Wartung, Lizenzen, Support) werden **mit eingerechnet**: Einsparung netto = Einsparungen − neue laufende Kosten.

**Bewertung:** Eine Investition ist wirtschaftlich sinnvoll, wenn die Amortisationsdauer **kürzer als die Nutzungsdauer** ist – je kürzer, desto geringer das Risiko.

**Kritische Menge (Break-even):** Zwei Alternativen haben unterschiedliche Fix- und variable Kosten, z. B. ein günstiger Drucker mit teuren Seiten und ein teurer Drucker mit günstigen Seiten. Ab welcher Menge lohnt sich der teurere?

> Fixkosten A + variable Kosten A · x = Fixkosten B + variable Kosten B · x
> **x = (Fixkosten B − Fixkosten A) ÷ (variable Kosten A − variable Kosten B)**

*Beispiel:* Drucker A: 400 € + 0,04 €/Seite; Drucker B: 1.000 € + 0,015 €/Seite → x = 600 ÷ 0,025 = **24.000 Seiten**. Wer mehr druckt, fährt mit B günstiger.`,
        },
        {
          type: 'visual',
          title: 'Bausteine der Wirtschaftlichkeitsrechnung',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Amortisationsdauer', text: 'Investition ÷ Einsparung pro Jahr (oder Monat). Kürzer als Nutzungsdauer = lohnend.', icon: 'Hourglass' },
                { title: 'Energieeinsparung', text: 'ΔP × Anzahl × Stunden ÷ 1000 = kWh; × Strompreis = Euro.', icon: 'Zap' },
                { title: 'Kritische Menge', text: 'Differenz Fixkosten ÷ Differenz variable Kosten = Break-even-Menge.', icon: 'GitCompare' },
              ],
            },
          },
          caption: 'Wirtschaftlichkeit = Kosten und Einsparungen über die Zeit vergleichen.',
        },
        {
          type: 'example',
          title: 'Thin Clients statt Desktop-PCs',
          problem: 'Die Elektro Krämer GmbH ersetzt **40 Desktop-PCs (85 W)** durch **Thin Clients (15 W)**. Betrieb **2.000 h pro Jahr**, Strompreis **0,32 €/kWh**. Außerdem sinken die Wartungskosten um **1.200 € pro Jahr**. Die Thin Clients kosten **300 € pro Stück**. Nach wie vielen Jahren amortisiert sich die Investition? (zwei Nachkommastellen)',
          steps: [
            { label: 'Leistungsdifferenz', body: '(85 W − 15 W) × 40 = **2.800 W**' },
            { label: 'Energie pro Jahr', body: '2.800 W × 2.000 h = 5.600.000 Wh = **5.600 kWh**' },
            { label: 'Stromkosten-Einsparung', body: '5.600 kWh × 0,32 €/kWh = **1.792,00 €**' },
            { label: 'Gesamteinsparung', body: '1.792,00 € + 1.200,00 € = **2.992,00 € pro Jahr**' },
            { label: 'Investition', body: '40 × 300,00 € = **12.000,00 €**' },
            { label: 'Amortisationsdauer', body: '12.000,00 € ÷ 2.992,00 € = 4,0107 ≈ **4,01 Jahre**' },
          ],
          result: 'Nach rund **4 Jahren** ist die Investition eingespielt – bei einer Nutzungsdauer von z. B. 5–6 Jahren lohnt sie sich.',
        },
        {
          type: 'check',
          question: {
            id: 'w03-c05', kind: 'number', skill: 'w.amortisation', difficulty: 1,
            prompt: 'Ein Ticketsystem kostet **9.000 €** und spart **375 € pro Monat** an Arbeitszeit. Nach wie vielen **Monaten** hat es sich amortisiert?',
            answer: 24, unit: 'Monate',
            misconceptions: [{ answer: '2', error: 'w-einheit-zeit', why: 'Das sind Jahre – gefragt sind Monate.' }],
            explanation: '9.000 € ÷ 375 €/Monat = **24 Monate** (2 Jahre).',
          },
        },
        { type: 'practice', title: 'Übung: Amortisationsdauer', generator: 'w.amortisation', count: 3, difficulty: 2 },
        { type: 'practice', title: 'Prüfungsniveau: mit Wartung und Lizenzen', generator: 'w.amortisation', count: 2, difficulty: 3 },
        { type: 'summary', points: ['Amortisationsdauer = Investition ÷ Einsparung pro Zeiteinheit.', 'Energie: ΔW × Anzahl × h ÷ 1000 = kWh × €/kWh.', 'Laufende Mehrkosten von der Einsparung abziehen.', 'Lohnend, wenn Amortisationsdauer < Nutzungsdauer.', 'Kritische Menge = ΔFixkosten ÷ Δvariable Kosten.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'w03-l06',
      title: 'Abschreibung (AfA) und geringwertige Wirtschaftsgüter',
      minutes: 25,
      relevance: 'ap1-teilweise',
      skills: ['w.abschreibung'],
      steps: [
        {
          type: 'explain',
          title: 'Den Wertverlust auf die Nutzungsjahre verteilen',
          body: `Kauft ein Unternehmen einen Server für 8.100 €, ist er nicht nach einem Jahr wertlos. Die Anschaffungskosten werden deshalb über die **betriebsgewöhnliche Nutzungsdauer** als Aufwand verteilt – das ist die **Abschreibung** (steuerlich: **AfA**, Absetzung für Abnutzung, § 7 EStG).

**Anschaffungskosten (AK)** = Kaufpreis netto − Anschaffungspreisminderungen (Rabatt, Skonto) + Anschaffungsnebenkosten (Lieferung, Installation, Montage). Die Umsatzsteuer gehört **nicht** dazu, wenn das Unternehmen vorsteuerabzugsberechtigt ist.

**Lineare Abschreibung:** gleiche Beträge in jedem Jahr.

> **AfA pro Jahr = Anschaffungskosten ÷ Nutzungsdauer**
> **Restbuchwert = Anschaffungskosten − Summe der bisherigen Abschreibungen**

**Im Anschaffungsjahr zeitanteilig (pro rata temporis):** Es wird nur für die Monate ab dem Anschaffungsmonat abgeschrieben; der Anschaffungsmonat zählt **voll** (§ 7 Abs. 1 Satz 4 EStG). Kauf im April → April bis Dezember = **9 Monate** → AfA = Jahres-AfA × 9/12.

**Geringwertige Wirtschaftsgüter (GWG)** – Sonderregeln für günstige, **selbstständig nutzbare**, bewegliche Wirtschaftsgüter (§ 6 Abs. 2 und 2a EStG, Stand 2026):

| Anschaffungskosten netto | Behandlung |
|---|---|
| bis 250 € | sofort als Betriebsausgabe |
| über 250 € bis **800 €** | **GWG**: Sofortabschreibung im Anschaffungsjahr möglich (Wahlrecht, Aufnahme in ein Verzeichnis) |
| über 250 € bis **1.000 €** | alternativ **Sammelposten**: gleichmäßig über **5 Jahre** (20 % pro Jahr) – das Wahlrecht gilt dann für alle Wirtschaftsgüter dieser Größenordnung eines Jahres einheitlich |
| darüber | normale Abschreibung über die Nutzungsdauer |

*„Selbstständig nutzbar“:* Ein Notebook ist allein nutzbar. Ein Drucker gilt nach BFH-Rechtsprechung (Urteil vom 19.02.2004, VI R 135/01) als **nicht** selbstständig nutzbar, weil er nur mit einem Computer funktioniert – ein Multifunktionsgerät mit Kopierfunktion dagegen schon.

**Hinweise zu IT (Stand 2026):** Laut BMF-Schreiben (zuletzt vom 22.02.2022) dürfen **Computerhardware und Software** steuerlich mit einer Nutzungsdauer von **1 Jahr** angesetzt werden (Wahlrecht). In Lehrbüchern und Prüfungsaufgaben wird meist eine Nutzungsdauer **vorgegeben** (z. B. 3 Jahre für PCs laut amtlicher AfA-Tabelle) – rechne immer mit der Angabe der Aufgabe. Die GWG-Grenze von 800 € gilt seit 2018 unverändert; für Anschaffungen ab 2027 wird eine Anhebung politisch diskutiert – vor der Prüfung kurz prüfen. *Keine Steuerberatung – im Betrieb entscheidet die Buchhaltung.*`,
        },
        {
          type: 'example',
          title: 'Server zeitanteilig abschreiben',
          problem: 'Ein Server kostet **7.800,00 €** netto, die Installation **300,00 €** netto. Er wird im **April** angeschafft und **linear über 5 Jahre** abgeschrieben. Berechne die AfA im Anschaffungsjahr und den Buchwert am 31.12.',
          steps: [
            { label: 'Anschaffungskosten', body: '7.800,00 € + 300,00 € = **8.100,00 €** (ohne USt)' },
            { label: 'Jahres-AfA', body: '8.100,00 € ÷ 5 = **1.620,00 €**' },
            { label: 'Monate im 1. Jahr', body: 'April bis Dezember = **9 Monate**' },
            { label: 'AfA 1. Jahr', body: '1.620,00 € × 9/12 = **1.215,00 €**' },
            { label: 'Buchwert 31.12.', body: '8.100,00 € − 1.215,00 € = **6.885,00 €**' },
          ],
          result: 'AfA im Anschaffungsjahr 1.215,00 €, Buchwert am 31.12. **6.885,00 €**. In den Folgejahren je 1.620,00 €, im 6. Kalenderjahr die restlichen 405,00 €.',
        },
        {
          type: 'check',
          question: {
            id: 'w03-c06', kind: 'single', skill: 'w.abschreibung', difficulty: 2,
            prompt: 'Ein Notebook kostet **699,00 € netto**. Wie kann es steuerlich behandelt werden (Stand 2026)?',
            options: ['Als GWG im Anschaffungsjahr voll abschreiben (Wahlrecht)', 'Es muss zwingend über 3 Jahre abgeschrieben werden', 'Es ist sofort als Betriebsausgabe zu buchen, weil es unter 1.000 € kostet', 'Es darf gar nicht abgeschrieben werden'],
            answer: 0,
            distractors: {
              '1': { why: 'Bis 800 € netto besteht das GWG-Wahlrecht zur Sofortabschreibung.', error: 'w-gwg-grenze' },
              '2': { why: 'Die Grenze für den Sofortabzug als GWG liegt bei 800 € netto; 1.000 € ist die Obergrenze des Sammelpostens (5 Jahre).', error: 'w-gwg-grenze' },
              '3': { why: 'Abnutzbare Wirtschaftsgüter werden abgeschrieben.', error: 'w-gwg-grenze' },
            },
            explanation: '699 € liegt zwischen 250 € und 800 € → **GWG**, Sofortabschreibung möglich (alternativ Sammelposten oder normale AfA).',
          },
        },
        { type: 'practice', title: 'Übung: lineare AfA', generator: 'w.afa', count: 3, difficulty: 2 },
        { type: 'practice', title: 'Prüfungsniveau: zeitanteilige AfA', generator: 'w.afa', count: 2, difficulty: 3 },
        { type: 'summary', points: ['AK = Netto-Kaufpreis − Rabatt/Skonto + Nebenkosten (ohne USt).', 'Lineare AfA = AK ÷ Nutzungsdauer.', 'Im Anschaffungsjahr monatsgenau, Anschaffungsmonat zählt voll.', 'GWG bis 800 € netto sofort abschreibbar; Sammelposten 250–1.000 € über 5 Jahre (Stand 2026).', 'Nutzungsdauer laut Aufgabe verwenden.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'w03-l07',
      title: 'Total Cost of Ownership (TCO)',
      minutes: 20,
      relevance: 'ap1',
      skills: ['w.tco'],
      steps: [
        {
          type: 'explain',
          title: 'Der Kaufpreis ist nur die Spitze des Eisbergs',
          body: `**Total Cost of Ownership (TCO)** bezeichnet die **Gesamtkosten** eines IT-Systems über seinen gesamten Lebenszyklus – nicht nur den Anschaffungspreis.

| Kostenblock | Beispiele |
|---|---|
| **Anschaffung** (direkt, einmalig) | Kaufpreis, Lieferung, Installation, Lizenzen, Einrichtung |
| **Betrieb** (laufend) | Strom, Verbrauchsmaterial (Toner, Papier), Wartung, Support, Lizenz-/Abo-Gebühren, Updates, Backup, Cloud-Speicher |
| **Indirekte Kosten** | Schulung, Ausfallzeiten der Mitarbeitenden, Administrationsaufwand, Selbsthilfe unter Kollegen |
| **Lebensende** | Datenlöschung (DSGVO-konform), Entsorgung, Migration auf das Nachfolgesystem |

**Warum TCO?** Ein günstiger Drucker mit teurem Toner oder ein billiger PC mit hohem Stromverbrauch kann über die Jahre deutlich teurer sein als ein Gerät mit höherem Kaufpreis. Der TCO-Vergleich ist ein starkes Argument im Kundengespräch („zu teuer?“).

**Vorgehen:**
1. Betrachtungszeitraum festlegen (z. B. Nutzungsdauer 4 Jahre).
2. Alle Kosten je Alternative für diesen Zeitraum ermitteln (Mengen × Preise).
3. Summieren und vergleichen; ggf. pro Jahr, pro Arbeitsplatz oder pro Seite darstellen.

**Hilfreiche Formeln:** Stromkosten = P (kW) × Betriebsstunden × Preis je kWh · Druckkosten = Seiten × Kosten je Seite.`,
        },
        {
          type: 'example',
          title: 'TCO zweier Drucker über 4 Jahre',
          problem: `Die Buchhaltung druckt **40.000 Seiten pro Jahr**. Vergleiche die TCO über **4 Jahre** (Strompreis 0,32 €/kWh, netto):

| | Drucker A | Drucker B |
|---|---|---|
| Kaufpreis | 350,00 € | 1.100,00 € |
| Kosten je Seite (Toner, Trommel) | 0,035 € | 0,012 € |
| Energieverbrauch | 60 kWh/Jahr | 45 kWh/Jahr |
| Wartungsvertrag | – | 80,00 €/Jahr |`,
          steps: [
            { label: 'Drucker A', body: 'Kauf 350,00 € + Seiten 4 × 40.000 × 0,035 € = 5.600,00 € + Strom 4 × 60 kWh × 0,32 € = 76,80 € → **6.026,80 €**' },
            { label: 'Drucker B', body: 'Kauf 1.100,00 € + Seiten 4 × 40.000 × 0,012 € = 1.920,00 € + Strom 4 × 45 × 0,32 € = 57,60 € + Wartung 4 × 80,00 € = 320,00 € → **3.397,60 €**' },
            { label: 'Vergleich', body: '6.026,80 € − 3.397,60 € = **2.629,20 €** zugunsten von Drucker B' },
          ],
          result: 'Obwohl Drucker B in der Anschaffung 750 € mehr kostet, ist er über 4 Jahre **2.629,20 € günstiger**.',
        },
        {
          type: 'check',
          question: {
            id: 'w03-c07', kind: 'multi', skill: 'w.tco', difficulty: 1,
            prompt: 'Welche Posten gehören zu den **laufenden Betriebskosten** eines Arbeitsplatzrechners?',
            options: ['Stromkosten', 'Wartung und Support', 'Abo-Gebühren für Software', 'Kaufpreis', 'Lieferkosten bei der Anschaffung'],
            answer: [0, 1, 2],
            explanation: 'Kaufpreis und Lieferung sind **einmalige Anschaffungskosten**. Strom, Support und Abos fallen laufend an.',
          },
        },
        { type: 'practice', title: 'Übung: TCO', questionIds: ['w03-q028', 'w03-q029', 'w03-q030', 'w03-q031'], count: 4, difficulty: 2 },
        { type: 'summary', points: ['TCO = Anschaffung + Betrieb + indirekte Kosten + Lebensende.', 'Gleichen Zeitraum für alle Alternativen ansetzen.', 'Strom: kW × h × €/kWh; Druck: Seiten × €/Seite.', 'TCO-Argumente helfen bei Einwänden gegen höhere Kaufpreise.'] },
      ],
    },
  ],
  /* ================================================================ */
  questions: [
    { id: 'w03-q001', kind: 'number', skill: 'w.umsatzsteuer', difficulty: 1, prompt: 'Ein Switch kostet **1.250,00 € netto**. Wie hoch ist der **Bruttopreis** (19 % USt)?', answer: 1487.5, tolerance: 0.01, unit: '€', misconceptions: [{ answer: '237.5', error: 'w-ust-statt-brutto', why: 'Das ist nur der USt-Betrag. Brutto = Netto + USt.' }], explanation: '1.250,00 € × 1,19 = **1.487,50 €** (USt 237,50 €).' },
    { id: 'w03-q002', kind: 'number', skill: 'w.umsatzsteuer', difficulty: 1, prompt: 'Eine Rechnung lautet über **2.380,00 € brutto** (19 % USt). Wie hoch ist der **Nettobetrag**?', answer: 2000, tolerance: 0.01, unit: '€', misconceptions: [{ answer: '1927.8', error: 'w-netto-aus-brutto', why: 'Vom Bruttobetrag nicht 19 % abziehen – Brutto entspricht 119 %: ÷ 1,19.' }], explanation: '2.380,00 € ÷ 1,19 = **2.000,00 €**.' },
    { id: 'w03-q003', kind: 'number', skill: 'w.umsatzsteuer', difficulty: 2, prompt: 'Ein IT-Fachbuch kostet **49,90 € brutto**. Für Bücher gilt der ermäßigte Steuersatz von **7 %**. Wie viel Umsatzsteuer ist enthalten? (auf Cent runden)', answer: 3.26, tolerance: 0.01, unit: '€', misconceptions: [{ answer: '3.49', error: 'w-ust-aus-brutto', why: '7 % beziehen sich auf den Nettobetrag: Brutto × 7 ÷ 107.' }, { answer: '7.97', error: 'w-ust-satz', why: 'Für Bücher gilt der ermäßigte Satz von 7 %, nicht 19 %.' }], explanation: '49,90 € × 7 ÷ 107 = 3,2645… ≈ **3,26 €** (netto 46,64 €).' },
    { id: 'w03-q004', kind: 'number', skill: 'w.umsatzsteuer', difficulty: 2, prompt: 'Das IT-Systemhaus hatte im Monat Umsätze von **50.000 € netto** und Einkäufe von **30.000 € netto** (jeweils 19 % USt). Wie hoch ist die **Zahllast** an das Finanzamt?', answer: 3800, tolerance: 0.01, unit: '€', misconceptions: [{ answer: '9500', error: 'w-zahllast', why: 'Von der Umsatzsteuer (9.500 €) darf die Vorsteuer (5.700 €) abgezogen werden.' }, { answer: '20000', error: 'w-zahllast', why: 'Die Zahllast ist eine Steuerdifferenz, nicht die Umsatzdifferenz.' }], explanation: 'USt: 50.000 € × 19 % = 9.500 € · Vorsteuer: 30.000 € × 19 % = 5.700 € · Zahllast = 9.500 € − 5.700 € = **3.800 €**.' },
    { id: 'w03-q005', kind: 'free', skill: 'w.umsatzsteuer', difficulty: 2, prompt: 'Erkläre, warum die Umsatzsteuer für ein vorsteuerabzugsberechtigtes Unternehmen **keine Kosten** verursacht, für einen Privatkunden aber schon.', modelAnswer: 'Das Unternehmen zahlt beim Einkauf Umsatzsteuer (Vorsteuer), kann diese aber mit der Umsatzsteuer aus seinen Verkäufen verrechnen bzw. vom Finanzamt erstattet bekommen. Es führt nur die Differenz (Zahllast) ab, die es von seinen Kunden eingenommen hat. Ein Privatkunde (Endverbraucher) kann keine Vorsteuer abziehen – er trägt die Umsatzsteuer endgültig.', keywords: ['Vorsteuer', 'verrechnen', 'Zahllast', 'Endverbraucher', 'trägt'], explanation: 'Die USt ist eine Verbrauchsteuer – wirtschaftlich trägt sie der Endverbraucher.' },
    { id: 'w03-q006', kind: 'table', skill: 'w.handelskalkulation', difficulty: 3, prompt: 'Kalkuliere den Angebotspreis für einen Monitor: Bezugspreis **450,00 €**, Handlungskostenzuschlag **30 %**, Gewinnzuschlag **15 %**, Kundenskonto **3 %**, Kundenrabatt **5 %** (beides im Hundert), USt 19 %. Jeden Schritt auf Cent runden.', columns: [{ key: 'v', label: 'Betrag (€)', type: 'number' }], rows: [
      { label: 'Bezugspreis', cells: { v: { given: '450,00' } } },
      { label: '+ Handlungskosten', cells: { v: { answer: '135' } } },
      { label: '= Selbstkosten', cells: { v: { answer: '585' } } },
      { label: '+ Gewinn', cells: { v: { answer: '87.75' } } },
      { label: '= Barverkaufspreis', cells: { v: { answer: '672.75' } } },
      { label: '+ Kundenskonto', cells: { v: { answer: '20.81' } } },
      { label: '= Zielverkaufspreis', cells: { v: { answer: '693.56' } } },
      { label: '+ Kundenrabatt', cells: { v: { answer: '36.5', accept: ['36.50'] } } },
      { label: '= Listenverkaufspreis netto', cells: { v: { answer: '730.06' } } },
      { label: '+ USt 19 %', cells: { v: { answer: '138.71' } } },
      { label: '= Listenverkaufspreis brutto', cells: { v: { answer: '868.77' } } },
    ], misconceptions: [{ cell: '5:v', answer: '20.18', error: 'w-im-hundert', why: 'Kundenskonto wird im Hundert gerechnet: 672,75 € ÷ 0,97 − 672,75 € = 20,81 €, nicht 3 % von 672,75 €.' }], explanation: '450,00 + 135,00 = 585,00 · + 87,75 = 672,75 · ÷ 0,97 = 693,56 (Skonto 20,81) · ÷ 0,95 = 730,06 (Rabatt 36,50) · USt 138,71 · **868,77 €**.' },
    { id: 'w03-q007', kind: 'number', skill: 'w.handelskalkulation', difficulty: 1, prompt: 'Die Selbstkosten eines Notebooks betragen **900,00 €**. Das Systemhaus kalkuliert **15 % Gewinn**. Wie hoch ist der **Nettoverkaufspreis**?', answer: 1035, tolerance: 0.01, unit: '€', misconceptions: [{ answer: '135', error: 'w-gewinn-statt-preis', why: 'Das ist nur der Gewinn. Der Preis = Selbstkosten + Gewinn.' }, { answer: '1231.65', error: 'w-brutto-statt-netto', why: 'Gefragt ist der Nettopreis – ohne USt.' }], explanation: '900,00 € + 15 % (135,00 €) = **1.035,00 €**.' },
    { id: 'w03-q008', kind: 'number', skill: 'w.handelskalkulation', difficulty: 2, prompt: '**Differenzkalkulation:** Ein Router wird am Markt für **595,00 € brutto** verkauft. Die Selbstkosten des Systemhauses betragen **430,00 €**. Wie viel **Prozent Gewinn** (bezogen auf die Selbstkosten) bleiben? (Kein Skonto/Rabatt, zwei Nachkommastellen)', answer: 16.28, tolerance: 0.01, unit: '%', misconceptions: [{ answer: '38.37', error: 'w-brutto-statt-netto', why: 'Erst die USt herausrechnen: 595 € ÷ 1,19 = 500 € netto.' }, { answer: '14', error: 'w-gewinn-basis', why: 'Der Gewinnzuschlag bezieht sich auf die **Selbstkosten** (430 €), nicht auf den Verkaufspreis.' }], explanation: 'Netto: 595,00 € ÷ 1,19 = 500,00 € · Gewinn: 500,00 € − 430,00 € = 70,00 € · 70 ÷ 430 × 100 = **16,28 %**.' },
    { id: 'w03-q009', kind: 'number', skill: 'w.handelskalkulation', difficulty: 3, prompt: '**Rückwärtskalkulation:** Ein Notebook soll zum marktüblichen Listenverkaufspreis von **899,00 € netto** angeboten werden. Kunden erhalten **10 % Rabatt** und **2 % Skonto**; das Systemhaus rechnet mit **10 % Gewinn** und **25 % Handlungskosten**. Welcher **Bezugspreis** darf höchstens bezahlt werden? (jeden Schritt auf Cent runden)', answer: 576.67, tolerance: 0.02, unit: '€', misconceptions: [{ answer: '535.22', error: 'w-rueckwaerts-prozent', why: 'Zuschläge rückwärts **herausrechnen** (÷ 1,10 bzw. ÷ 1,25), nicht 10 %/25 % abziehen.' }], hints: ['Rabatt und Skonto werden vom Hundert abgezogen.', 'Selbstkosten = Barverkaufspreis ÷ 1,10; Bezugspreis = Selbstkosten ÷ 1,25.'], explanation: 'Zielverkaufspreis: 899,00 € − 10 % = 809,10 € · Barverkaufspreis: 809,10 € − 2 % (16,18 €) = 792,92 € · Selbstkosten: 792,92 € ÷ 1,10 = 720,84 € · Bezugspreis: 720,84 € ÷ 1,25 = **576,67 €**.' },
    { id: 'w03-q010', kind: 'single', skill: 'w.handelskalkulation', difficulty: 2, prompt: 'Warum wird der **Kundenskonto** in der Vorwärtskalkulation „im Hundert“ berechnet?', options: ['Weil der Kunde den Skonto vom höheren Zielverkaufspreis abzieht und danach genau der Barverkaufspreis übrig bleiben soll', 'Weil das Finanzamt es so vorschreibt', 'Weil Skonto immer 100 € beträgt', 'Weil dadurch die Umsatzsteuer sinkt'], answer: 0, distractors: { '1': { why: 'Es ist eine rechnerische Notwendigkeit, keine Steuervorschrift.', error: 'w-im-hundert' }, '2': { why: 'Unsinn – Skonto ist ein Prozentsatz.', error: 'w-im-hundert' }, '3': { why: 'Mit der USt hat das nichts zu tun.', error: 'w-im-hundert' } }, explanation: 'Der Barverkaufspreis entspricht 100 % − Skontosatz des Zielverkaufspreises. Würde man vom Hundert aufschlagen, bliebe nach Abzug weniger als der Barverkaufspreis übrig.' },
    { id: 'w03-q011', kind: 'order', skill: 'w.handelskalkulation', difficulty: 1, prompt: 'Bringe das Schema der Vorwärtskalkulation in die richtige Reihenfolge.', items: ['Bezugspreis', '+ Handlungskosten', '= Selbstkosten', '+ Gewinn', '= Barverkaufspreis', '+ Kundenskonto', '= Zielverkaufspreis', '+ Kundenrabatt', '= Listenverkaufspreis netto', '+ Umsatzsteuer'], explanation: 'Kosten → Gewinn → Skonto → Rabatt → USt.' },
    { id: 'w03-q012', kind: 'number', skill: 'w.dienstleistungsangebot', difficulty: 2, prompt: 'Personalkosten eines Technikers: **45,00 € pro Stunde**. Das Systemhaus rechnet **60 % Gemeinkostenzuschlag** und **15 % Gewinnzuschlag** (auf die Selbstkosten). Wie hoch ist der **Stundenverrechnungssatz** netto?', answer: 82.8, tolerance: 0.01, unit: '€/h', misconceptions: [{ answer: '78.75', error: 'w-zuschlaege-addiert', why: 'Zuschläge nicht addieren: erst 60 % auf 45 € (= 72 €), dann 15 % auf 72 €.' }, { answer: '72', error: 'w-gewinn-vergessen', why: 'Das sind die Selbstkosten – der Gewinn fehlt.' }], explanation: '45,00 € + 60 % (27,00 €) = 72,00 € · + 15 % (10,80 €) = **82,80 €/h**.' },
    { id: 'w03-q013', kind: 'number', skill: 'w.dienstleistungsangebot', difficulty: 1, prompt: 'Wie viele **Stunden** sind **135 Minuten**? (als Dezimalzahl)', answer: 2.25, tolerance: 0.001, unit: 'h', misconceptions: [{ answer: '2.15', error: 'w-minuten-stunden', why: '135 min = 2 h 15 min. 15 min sind aber 0,25 h, nicht 0,15 h.' }, { answer: '1.35', error: 'w-minuten-stunden', why: 'Minuten durch 60 teilen: 135 ÷ 60 = 2,25.' }], explanation: '135 ÷ 60 = **2,25 h** (2 h 15 min).' },
    { id: 'w03-q014', kind: 'number', skill: 'w.dienstleistungsangebot', difficulty: 2, prompt: `Erstelle den Bruttobetrag für folgenden Arbeitsbericht (USt 19 %, auf Cent runden):

| Position | Menge | Einzelpreis netto |
|---|---|---|
| Arbeitszeit Techniker | 3 h 45 min | 92,00 €/h |
| Patchkabel Cat 6A | 12 Stück | 4,90 € |
| Anfahrtspauschale | 1 | 59,00 € |`, answer: 550.73, tolerance: 0.01, unit: '€', misconceptions: [{ answer: '462.8', error: 'w-ust-vergessen', why: 'Das ist der Nettobetrag – USt fehlt.' }, { answer: '517.89', error: 'w-minuten-stunden', why: '3 h 45 min = 3,75 h, nicht 3,45 h.' }], hints: ['3 h 45 min = 3,75 h.'], explanation: 'Arbeit: 3,75 h × 92,00 € = 345,00 € · Kabel: 12 × 4,90 € = 58,80 € · Anfahrt 59,00 € → netto 462,80 € · USt: 462,80 € × 0,19 = 87,932 ≈ 87,93 € → **550,73 €**.' },
    { id: 'w03-q015', kind: 'free', skill: 'w.dienstleistungsangebot', difficulty: 2, prompt: 'Nenne je **einen Vorteil** eines **Festpreisangebots** für den Kunden und für das Systemhaus sowie **ein Risiko** für das Systemhaus.', modelAnswer: 'Vorteil Kunde: Kostensicherheit – der Preis steht vorab fest. Vorteil Systemhaus: Arbeitet es effizienter als kalkuliert, steigt der Gewinn; einfache Abrechnung ohne Stundennachweise. Risiko Systemhaus: Dauert die Arbeit länger als kalkuliert (unvorhergesehene Probleme), trägt es die Mehrkosten selbst – deshalb muss der Leistungsumfang genau beschrieben sein.', keywords: ['Kostensicherheit', 'Mehraufwand', 'Risiko', 'Leistungsumfang'], explanation: 'Bei Abrechnung nach Aufwand liegt das Kostenrisiko dagegen beim Kunden.' },
    { id: 'w03-q016', kind: 'table', skill: 'w.kaufleasing', difficulty: 2, prompt: 'Ordne zu: Trifft die Aussage auf **Kauf**, **Leasing** oder **Miete** zu? (typischer Fall)', columns: [{ key: 'a', label: 'Kauf / Leasing / Miete', type: 'text' }], rows: [
      { label: 'Das Unternehmen wird Eigentümer der Geräte.', cells: { a: { answer: 'Kauf' } } },
      { label: 'Feste Vertragslaufzeit, z. B. 36 Monate, vorzeitig kaum kündbar; Wartung meist nicht enthalten.', cells: { a: { answer: 'Leasing' } } },
      { label: 'Kurzfristig kündbar, Service häufig inklusive, auf Dauer meist am teuersten.', cells: { a: { answer: 'Miete' } } },
      { label: 'Hoher Kapitalbedarf zu Beginn, Wertverlust wird abgeschrieben.', cells: { a: { answer: 'Kauf' } } },
    ], explanation: 'Kauf = Eigentum und Abschreibung; Leasing = feste Laufzeit, Rate; Miete = Flexibilität, oft mit Service.' },
    { id: 'w03-q017', kind: 'number', skill: 'w.kaufleasing', difficulty: 2, prompt: '15 Notebooks werden **36 Monate** gemietet. Die Miete beträgt **42,50 € pro Gerät und Monat** inklusive Service. Wie hoch sind die **Gesamtkosten**?', answer: 22950, tolerance: 0.01, unit: '€', misconceptions: [{ answer: '1530', error: 'w-stueckzahl', why: 'Das ist die Miete für **ein** Gerät über 36 Monate. Mal 15 Geräte!' }, { answer: '637.5', error: 'w-laufzeit', why: 'Das ist die Miete für einen Monat. Mal 36 Monate!' }], explanation: '15 × 42,50 € × 36 = **22.950,00 €**.' },
    { id: 'w03-q018', kind: 'free', skill: 'w.kaufleasing', difficulty: 3, prompt: 'Der Kauf von 20 Notebooks ist über 3 Jahre **800 € günstiger** als Leasing. Trotzdem empfiehlst du der Geschäftsführung Leasing. Begründe mit **drei Argumenten**.', modelAnswer: '1. Liquidität: Beim Kauf müssten sofort rund 20.000 € gezahlt werden; Leasing verteilt die Kosten auf monatliche Raten und hält Kapital für andere Investitionen frei. 2. Aktualität: Nach 36 Monaten werden die Geräte zurückgegeben und durch neue ersetzt – keine veralteten Geräte, kein Aufwand für Verkauf und Entsorgung. 3. Planbarkeit: feste, gut kalkulierbare monatliche Kosten; die Leasingraten sind (bei üblichen Verträgen) sofort als Betriebsausgabe absetzbar. Die Mehrkosten von 800 € (ca. 13 € pro Gerät und Jahr) sind gegenüber diesen Vorteilen gering.', keywords: ['Liquidität', 'Kapital', 'aktuelle Technik', 'Planbarkeit', 'Rückgabe', 'Entsorgung'], explanation: 'Eine Entscheidung berücksichtigt neben den Kosten auch Liquidität, Flexibilität und Aufwand.' },
    { id: 'w03-q019', kind: 'number', skill: 'w.kaufleasing', difficulty: 3, prompt: `Vergleiche die Gesamtkosten über **48 Monate** für einen Server (netto):
- **Kauf:** 9.600 €, Wartungsvertrag 720 € pro Jahr, Verkaufserlös nach 4 Jahren 800 €
- **Leasing:** monatliche Rate 245 € inkl. Wartung

Um wie viel Euro ist die **günstigere** Variante günstiger?`, answer: 80, tolerance: 0.01, unit: '€', misconceptions: [{ answer: '720', error: 'w-restwert-vergessen', why: 'Den Verkaufserlös (800 €) beim Kauf abziehen – dann ist Kauf günstiger.' }], explanation: 'Kauf: 9.600 € + 4 × 720 € − 800 € = **11.680 €** · Leasing: 48 × 245 € = **11.760 €** → Kauf ist um **80 €** günstiger. Bei so geringem Unterschied entscheiden Liquidität und Flexibilität.' },
    { id: 'w03-q020', kind: 'number', skill: 'w.amortisation', difficulty: 2, prompt: '25 alte Monitore (je **45 W**) werden durch neue (je **18 W**) ersetzt. Betrieb **2.200 h pro Jahr**, Strompreis **0,30 €/kWh**. Wie hoch ist die **jährliche Stromkostenersparnis**?', answer: 445.5, tolerance: 0.01, unit: '€', misconceptions: [{ answer: '445500', error: 'w-einheit-kwh', why: 'Wh in kWh umrechnen: ÷ 1000.' }, { answer: '742.5', error: 'w-differenz-vergessen', why: 'Nur die **Differenz** (45 W − 18 W) wird eingespart.' }], explanation: '(45 − 18) W × 25 = 675 W · × 2.200 h = 1.485.000 Wh = 1.485 kWh · × 0,30 € = **445,50 €**.' },
    { id: 'w03-q021', kind: 'number', skill: 'w.amortisation', difficulty: 2, prompt: 'Ein Dokumentenmanagementsystem kostet **14.400 €** (Lizenzen und Einführung). Es spart **6.000 € pro Jahr**, verursacht aber **1.200 € jährliche Wartungskosten**. Wie viele **Jahre** dauert die Amortisation?', answer: 3, tolerance: 0.001, unit: 'Jahre', misconceptions: [{ answer: '2.4', error: 'w-kosten-unvollstaendig', why: 'Die jährlichen Wartungskosten mindern die Einsparung: 6.000 € − 1.200 € = 4.800 €.' }], explanation: 'Netto-Einsparung: 6.000 € − 1.200 € = 4.800 €/Jahr · 14.400 € ÷ 4.800 € = **3 Jahre**.' },
    { id: 'w03-q022', kind: 'number', skill: 'w.amortisation', difficulty: 2, prompt: 'Drucker A kostet **400 €** und **0,04 € je Seite**, Drucker B **1.000 €** und **0,015 € je Seite**. Ab wie vielen **Seiten** ist Drucker B insgesamt günstiger? (kritische Menge)', answer: 24000, unit: 'Seiten', misconceptions: [{ answer: '10909', error: 'w-kritische-menge', why: 'Durch die **Differenz** der Seitenpreise teilen (0,04 − 0,015 = 0,025), nicht durch die Summe.' }], explanation: '400 + 0,04x = 1.000 + 0,015x → 0,025x = 600 → x = **24.000 Seiten**. Darüber ist B günstiger.' },
    { id: 'w03-q023', kind: 'free', skill: 'w.amortisation', difficulty: 2, prompt: 'Eine Investition amortisiert sich nach **6,5 Jahren**, die Geräte haben eine Nutzungsdauer von **5 Jahren**. Beurteile die Investition.', modelAnswer: 'Die Investition ist aus rein wirtschaftlicher Sicht nicht lohnend: Die Amortisationsdauer ist länger als die Nutzungsdauer, die Einsparungen spielen die Investition also nicht wieder ein, bevor die Geräte ersetzt werden müssen. Sie wäre nur sinnvoll, wenn andere Gründe überwiegen (z. B. Sicherheit, Supportende der Altgeräte, gesetzliche Vorgaben) oder weitere Einsparungen berücksichtigt werden.', keywords: ['länger', 'Nutzungsdauer', 'nicht lohnend', 'andere Gründe', 'Supportende'], explanation: 'Faustregel: Amortisationsdauer < Nutzungsdauer.' },
    { id: 'w03-q024', kind: 'number', skill: 'w.abschreibung', difficulty: 1, prompt: 'Eine Firewall-Appliance hat Anschaffungskosten von **4.500 €** und wird **linear über 3 Jahre** abgeschrieben. Wie hoch ist die jährliche AfA?', answer: 1500, tolerance: 0.01, unit: '€', explanation: '4.500 € ÷ 3 = **1.500 €** pro Jahr.' },
    { id: 'w03-q025', kind: 'number', skill: 'w.abschreibung', difficulty: 2, prompt: 'Ein Plotter wird für **5.950,00 € brutto** (inkl. 19 % USt) gekauft; die Lieferung kostet zusätzlich **119,00 € brutto**. Das Unternehmen ist vorsteuerabzugsberechtigt. Wie hoch sind die **Anschaffungskosten**?', answer: 5100, tolerance: 0.01, unit: '€', misconceptions: [{ answer: '6069', error: 'w-afa-brutto', why: 'Die USt gehört nicht zu den Anschaffungskosten (Vorsteuerabzug).' }, { answer: '5000', error: 'w-afa-nebenkosten', why: 'Die Lieferkosten sind Anschaffungsnebenkosten und gehören dazu.' }], explanation: '5.950,00 € ÷ 1,19 = 5.000,00 € · 119,00 € ÷ 1,19 = 100,00 € · AK = **5.100,00 €** netto.' },
    { id: 'w03-q026', kind: 'number', skill: 'w.abschreibung', difficulty: 3, prompt: 'Ein Storage-System (AK **12.000 €**, Nutzungsdauer **4 Jahre**, linear) wird am **15. September** angeschafft. Wie hoch ist der **Buchwert am 31.12.** des Anschaffungsjahres? (Anschaffungsmonat zählt voll)', answer: 11000, tolerance: 0.01, unit: '€', misconceptions: [{ answer: '9000', error: 'w-afa-zeitanteilig', why: 'Im Anschaffungsjahr nur zeitanteilig: September bis Dezember = 4 Monate.' }, { answer: '11250', error: 'w-afa-monate-zaehlen', why: 'Der Anschaffungsmonat September zählt voll: 4 Monate, nicht 3.' }], explanation: 'Jahres-AfA: 12.000 € ÷ 4 = 3.000 € · September–Dezember = 4 Monate → 3.000 € × 4/12 = 1.000 € · Buchwert: 12.000 € − 1.000 € = **11.000 €**.' },
    { id: 'w03-q027', kind: 'table', skill: 'w.abschreibung', difficulty: 2, prompt: 'Wie werden die Wirtschaftsgüter (Stand 2026, Anschaffungskosten netto, selbstständig nutzbar) behandelt? Antworte mit **sofort** (Betriebsausgabe bzw. GWG-Sofortabschreibung möglich) oder **afa** (Abschreibung über die Nutzungsdauer).', columns: [{ key: 'a', label: 'sofort / afa', type: 'text' }], rows: [
      { label: 'Tablet für 229 €', cells: { a: { answer: 'sofort' } } },
      { label: 'Notebook für 749 €', cells: { a: { answer: 'sofort' } } },
      { label: 'Notebook für 1.249 €', cells: { a: { answer: 'afa' } } },
      { label: 'Server für 6.400 €', cells: { a: { answer: 'afa' } } },
    ], explanation: 'Bis 250 € → Betriebsausgabe; bis 800 € → GWG mit Sofortabschreibung möglich; darüber → AfA über die Nutzungsdauer (beim Notebook für 1.249 € wäre ggf. auch die 1-Jahres-Nutzungsdauer für Computerhardware laut BMF-Schreiben möglich – in Prüfungsaufgaben gilt die vorgegebene Nutzungsdauer).' },
    { id: 'w03-q028', kind: 'number', skill: 'w.tco', difficulty: 2, prompt: 'Ein PC nimmt im Betrieb **60 W** auf und läuft **8 h** an **220 Tagen** im Jahr. Strompreis **0,32 €/kWh**. Wie hoch sind die **Stromkosten über 4 Jahre**? (auf Cent runden)', answer: 135.17, tolerance: 0.01, unit: '€', misconceptions: [{ answer: '33.79', error: 'w-laufzeit', why: 'Das sind die Kosten für **ein** Jahr – gefragt sind 4 Jahre.' }, { answer: '135168', error: 'w-einheit-kwh', why: 'Wh in kWh umrechnen: ÷ 1000.' }], explanation: '60 W × 8 h × 220 = 105.600 Wh = 105,6 kWh pro Jahr · × 0,32 € = 33,792 € · × 4 = 135,168 € ≈ **135,17 €**.' },
    { id: 'w03-q029', kind: 'free', skill: 'w.tco', difficulty: 2, prompt: 'Erkläre den Begriff **Total Cost of Ownership** und nenne je **zwei Beispiele** für direkte und indirekte Kosten eines Arbeitsplatzrechners.', modelAnswer: 'TCO sind die gesamten Kosten eines IT-Systems über seinen Lebenszyklus – von der Anschaffung über den Betrieb bis zur Entsorgung. Direkte Kosten: Kaufpreis, Lizenzen, Strom, Wartung/Support. Indirekte Kosten: Ausfallzeiten der Mitarbeitenden bei Störungen, Schulungs- und Einarbeitungszeit, gegenseitige Hilfe unter Kollegen, Administrationsaufwand.', keywords: ['Lebenszyklus', 'Anschaffung', 'Betrieb', 'Entsorgung', 'Ausfallzeit', 'Schulung'], explanation: 'Indirekte Kosten werden oft unterschätzt, machen aber einen großen Teil der TCO aus.' },
    { id: 'w03-q030', kind: 'number', skill: 'w.tco', difficulty: 3, prompt: `Vergleiche zwei Drucker über **3 Jahre** bei **25.000 Seiten pro Jahr** (netto):

| | Drucker A | Drucker B |
|---|---|---|
| Kaufpreis | 280 € | 890 € |
| Kosten je Seite | 0,032 € | 0,011 € |
| Wartung | – | 60 € pro Jahr |

Um wie viel Euro ist der **günstigere** Drucker über 3 Jahre günstiger?`, answer: 785, tolerance: 0.01, unit: '€', misconceptions: [{ answer: '610', error: 'w-tco-nur-kaufpreis', why: 'Nur die Kaufpreise verglichen – Seitenkosten und Wartung fehlen.' }, { answer: '965', error: 'w-kosten-unvollstaendig', why: 'Die Wartungskosten von Drucker B (3 × 60 €) fehlen.' }], explanation: 'A: 280 € + 3 × 25.000 × 0,032 € = 280 € + 2.400 € = 2.680 € · B: 890 € + 3 × 25.000 × 0,011 € + 3 × 60 € = 890 € + 825 € + 180 € = 1.895 € · Differenz: **785 €** zugunsten von B.' },
    { id: 'w03-q031', kind: 'single', skill: 'w.tco', difficulty: 1, prompt: 'Welcher Posten gehört **nicht** zu den TCO eines Notebooks?', options: ['Ausfallzeit des Mitarbeiters bei einem Defekt', 'Datenlöschung und Entsorgung am Ende', 'Kosten für Schulungen', 'Privatausgaben des Mitarbeiters für ein eigenes Smartphone'], answer: 3, distractors: { '0': { why: 'Ausfallzeiten sind indirekte Kosten.', error: 'w-tco-bestandteile' }, '1': { why: 'Lebensende-Kosten gehören zu den TCO.', error: 'w-tco-bestandteile' }, '2': { why: 'Schulungen sind indirekte Kosten.', error: 'w-tco-bestandteile' } }, explanation: 'Private Ausgaben haben mit den Kosten des betrieblichen Geräts nichts zu tun.' },
    { id: 'w03-q032', kind: 'number', skill: 'w.handelskalkulation', difficulty: 2, prompt: 'Ein Angebot über **12 Monitore** zu je **289,00 € netto** wird mit **5 % Rabatt** erstellt. Wie hoch ist der **Rechnungsbetrag brutto** (19 % USt, jeden Schritt auf Cent runden)?', answer: 3920.57, tolerance: 0.01, unit: '€', misconceptions: [{ answer: '3294.6', error: 'w-ust-vergessen', why: 'Das ist der Nettobetrag nach Rabatt – USt fehlt.' }, { answer: '4126.92', error: 'w-rabatt-vergessen', why: 'Der Rabatt von 5 % wurde nicht abgezogen.' }], explanation: '12 × 289,00 € = 3.468,00 € − 5 % (173,40 €) = 3.294,60 € · USt: 625,974 ≈ 625,97 € → **3.920,57 €**.' },
  ],
};
