import type { Module } from '../types';

export const w06: Module = {
  id: 'w06',
  nr: 6,
  area: 'wirtschaft',
  title: 'Unternehmen, Markt & Wirtschaftlichkeit',
  short: 'Unternehmensziele und Zielkonflikte, Wirtschaftlichkeit, Produktivität und Rentabilität, Marktformen, Preisbildung und Marktanteil sowie die ABC-Analyse.',
  icon: 'TrendingUp',
  relevance: 'ap1-teilweise',
  prerequisites: ['w03'],
  generators: ['w.kennzahlen', 'w.gleichgewicht', 'w.marktanteil', 'w.abc'],
  skills: [
    { id: 'w.unternehmensziele', module: 'w06', title: 'Unternehmensziele und Zielbeziehungen' },
    { id: 'w.kennzahlen', module: 'w06', title: 'Wirtschaftlichkeit, Produktivität und Rentabilität', requires: ['w.unternehmensziele'] },
    { id: 'w.marktformen', module: 'w06', title: 'Marktarten und Marktformen' },
    { id: 'w.preisbildung', module: 'w06', title: 'Preisbildung: Gleichgewichtspreis, Käufer- und Verkäufermarkt', requires: ['w.marktformen'] },
    { id: 'w.marktanteil', module: 'w06', title: 'Marktvolumen, Marktpotenzial und Marktanteil', requires: ['w.marktformen'] },
    { id: 'w.abc', module: 'w06', title: 'ABC-Analyse (Artikel und Kunden)' },
  ],
  lessons: [
    /* ------------------------------------------------------------ */
    {
      id: 'w06-l01',
      title: 'Unternehmensziele und Zielkonflikte',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['w.unternehmensziele'],
      simple: `Ein Unternehmen hat Ziele wie du beim Sparen auf ein Auto: Du willst Geld zurücklegen, aber auch mal ins Kino. Beides gleichzeitig geht nur begrenzt – das ist ein **Zielkonflikt** (zwei Ziele stören sich gegenseitig). Firmen haben **ökonomische** Ziele (Geld: Gewinn, Umsatz), **ökologische** Ziele (Umwelt: weniger Strom, weniger Müll) und **soziale** Ziele (Menschen: sichere Arbeitsplätze, Weiterbildung). Manche Ziele helfen sich gegenseitig (**komplementär**), z. B. sparsame Geräte senken Stromkosten **und** schonen die Umwelt.

**Merke:** Ökonomisch – ökologisch – sozial; Ziele können sich ergänzen (komplementär), stören (konkurrierend) oder nichts miteinander zu tun haben (indifferent).`,
      steps: [
        {
          type: 'explain',
          title: 'Wozu ein Unternehmen Ziele braucht',
          body: `Jedes Unternehmen – auch das IT-Systemhaus oder die Elektro Krämer GmbH – richtet sein Handeln an **Zielen** aus. Ganz oben steht meist ein **Leitbild** (Wer sind wir, wofür stehen wir?). Daraus werden **strategische** Ziele (langfristig, z. B. „In fünf Jahren der führende IT-Dienstleister für Handwerksbetriebe in Norddeutschland“) und **operative** Ziele (kurzfristig, z. B. „Bis Ende des Quartals alle Tickets der Priorität 1 innerhalb von 4 Stunden lösen“) abgeleitet.

**Sachziele und Formalziele**

| Zielart | Frage | Beispiel IT-Systemhaus |
|---|---|---|
| **Sachziel** (Leistungsziel) | **Was** wollen wir herstellen oder anbieten? | Managed Services für 50 Kunden anbieten, 300 Arbeitsplätze pro Jahr einrichten |
| **Formalziel** (Erfolgsziel) | **Wie erfolgreich** wollen wir dabei sein? | Gewinn, Umsatz, Wirtschaftlichkeit, Rentabilität, Liquidität (Zahlungsfähigkeit) |

**Die drei Zielbereiche (Nachhaltigkeit)**

| Bereich | Bedeutung | Beispiele |
|---|---|---|
| **ökonomisch** | wirtschaftlicher Erfolg | Gewinn steigern, Kosten senken, Marktanteil ausbauen, zahlungsfähig bleiben |
| **ökologisch** | Umwelt schonen | Energieverbrauch der Server senken, Geräte reparieren und wiederverwenden (Refurbishing), papierloses Büro, Elektroschrott fachgerecht entsorgen |
| **sozial** | Verantwortung für Menschen | sichere Arbeitsplätze, faire Bezahlung, Weiterbildung, Gesundheitsschutz, Barrierefreiheit |

**Zielbeziehungen**

| Beziehung | Bedeutung | IT-Beispiel |
|---|---|---|
| **komplementär** (Zielharmonie) | Ziel A fördert Ziel B | Energieeffiziente Server senken die **Stromkosten** (ökonomisch) **und** den CO₂-Ausstoß (ökologisch) |
| **konkurrierend** (Zielkonflikt) | Ziel A behindert Ziel B | **Kosten senken** vs. **mehr Weiterbildung** für die Techniker; **schnell liefern** (Express-Versand) vs. **Umwelt schonen** |
| **indifferent** (neutral) | Ziele beeinflussen sich nicht | Neues Firmenlogo und Verkürzung der Ticket-Reaktionszeit |

**Zielkonflikte lösen:** Ziele **gewichten** und Prioritäten festlegen (Was ist uns wichtiger?), Kompromisse suchen (z. B. Weiterbildung online statt mit Reise), langfristig denken (teurere, aber sparsame Hardware kann über die Nutzungsdauer günstiger sein – siehe TCO in Modul w03).

**Ziele formulieren:** Wie Anforderungen werden auch Unternehmensziele **SMART** formuliert (spezifisch, messbar, akzeptiert, realistisch, terminiert) – sonst kann niemand prüfen, ob sie erreicht wurden.

**Ökonomisches Prinzip** – Grundregel wirtschaftlichen Handelns:
- **Maximalprinzip:** Mit **gegebenen** Mitteln einen **möglichst großen** Erfolg erzielen. *Mit dem Budget von 50.000 € so viele Arbeitsplätze wie möglich modernisieren.*
- **Minimalprinzip:** Ein **vorgegebenes** Ziel mit **möglichst geringen** Mitteln erreichen. *40 Arbeitsplätze nach Pflichtenheft so günstig wie möglich einrichten.*`,
        },
        {
          type: 'visual',
          title: 'Drei Zielbereiche',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Ökonomisch', text: 'Gewinn, Umsatz, Kosten senken, Marktanteil, Liquidität.', icon: 'Euro' },
                { title: 'Ökologisch', text: 'Energie sparen, Geräte länger nutzen, recyceln, papierlos arbeiten.', icon: 'Leaf' },
                { title: 'Sozial', text: 'Sichere Arbeitsplätze, Weiterbildung, Gesundheit, faire Bezahlung.', icon: 'Users' },
              ],
            },
          },
          caption: 'Nachhaltig handelt ein Unternehmen, wenn es alle drei Bereiche im Blick behält.',
        },
        {
          type: 'example',
          title: 'Zielbeziehungen bei der Hardware-Beschaffung',
          problem: 'Die Elektro Krämer GmbH tauscht 40 PCs aus. Die Geschäftsführung nennt drei Ziele: (1) Anschaffungskosten möglichst gering halten, (2) Stromverbrauch der IT um 20 % senken, (3) Altgeräte nicht verschrotten, sondern aufbereitet an eine Schule spenden. Untersuche die Zielbeziehungen.',
          steps: [
            { label: 'Ziele einordnen', body: '(1) ökonomisch, (2) ökologisch **und** ökonomisch (weniger Stromkosten), (3) ökologisch und sozial.' },
            { label: '(1) und (2)', body: 'Sparsame Geräte (z. B. mit effizientem Netzteil) sind oft **teurer** in der Anschaffung → **konkurrierend** bei den Anschaffungskosten. Über die Nutzungsdauer sparen sie aber Strom – betrachtet man die **Gesamtkosten (TCO)**, können die Ziele **komplementär** werden.' },
            { label: '(1) und (3)', body: 'Aufbereiten und Datenlöschung kosten Arbeitszeit → leicht **konkurrierend**. Dafür entfallen Entsorgungskosten und das Unternehmen gewinnt Ansehen.' },
            { label: 'Lösung', body: 'Ziele gewichten und mit **Gesamtkosten** statt nur mit dem Kaufpreis rechnen. Konkretes, messbares Ziel formulieren: „Bis 31.12. Stromverbrauch der Arbeitsplätze um 20 % gegenüber dem Vorjahr senken.“' },
          ],
          result: 'Ob Ziele konkurrieren oder sich ergänzen, hängt oft vom betrachteten Zeitraum ab: kurzfristig Zielkonflikt, langfristig Zielharmonie.',
        },
        {
          type: 'check',
          question: {
            id: 'w06-c01', kind: 'table', skill: 'w.unternehmensziele', difficulty: 1,
            prompt: 'Ordne jedes Ziel einem Bereich zu: **ökonomisch**, **ökologisch** oder **sozial**.',
            columns: [{ key: 'b', label: 'Bereich', type: 'text' }],
            rows: [
              { label: 'Den Gewinn im nächsten Jahr um 5 % steigern', cells: { b: { answer: 'ökonomisch', accept: ['oekonomisch'] } } },
              { label: 'Jeder Techniker erhält jährlich zwei Schulungstage', cells: { b: { answer: 'sozial' } } },
              { label: 'Server mit 80-PLUS-Titanium-Netzteilen einsetzen, um Energie zu sparen', cells: { b: { answer: 'ökologisch', accept: ['oekologisch'] } } },
              { label: 'Ausbildungsplätze erhalten, auch in schwachen Jahren', cells: { b: { answer: 'sozial' } } },
            ],
            explanation: 'Geld/Erfolg → ökonomisch; Umwelt/Energie → ökologisch; Menschen/Mitarbeitende → sozial. Das Energiesparen ist zusätzlich auch ökonomisch (weniger Stromkosten) – gefragt ist hier der Hauptzweck.',
          },
        },
        { type: 'practice', title: 'Übung: Unternehmensziele', questionIds: ['w06-q001', 'w06-q002', 'w06-q003', 'w06-q004', 'w06-q005', 'w06-q006'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Leitbild → strategische (langfristige) → operative (kurzfristige) Ziele.', 'Sachziel = Was bieten wir an? Formalziel = Wie erfolgreich (Gewinn, Rentabilität, Liquidität)?', 'Zielbereiche: ökonomisch, ökologisch, sozial.', 'Zielbeziehungen: komplementär, konkurrierend, indifferent.', 'Ökonomisches Prinzip: Maximalprinzip (gegebene Mittel, max. Erfolg) oder Minimalprinzip (gegebenes Ziel, min. Mittel).'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'w06-l02',
      title: 'Wirtschaftlichkeit, Produktivität und Rentabilität',
      minutes: 25,
      relevance: 'ap1-teilweise',
      skills: ['w.kennzahlen'],
      simple: `Diese drei Kennzahlen sind wie drei Fragen an ein Café. **Produktivität:** Wie viele Kaffees schafft ein Mitarbeiter pro Stunde? (nur Mengen, kein Geld). **Wirtschaftlichkeit:** Bringt das Café mehr Geld ein, als es kostet? (Erträge geteilt durch Aufwendungen – über 1 ist gut). **Rentabilität:** Wie viel Gewinn bringt das Geld, das der Besitzer hineingesteckt hat, in Prozent? (wie ein Zinssatz).

**Merke:** Produktivität = Menge ÷ Menge · Wirtschaftlichkeit = Erträge ÷ Aufwendungen (> 1 = wirtschaftlich) · Rentabilität = Gewinn ÷ Kapital × 100.`,
      steps: [
        {
          type: 'explain',
          title: 'Drei Kennzahlen – drei Fragen',
          body: `„Wirtschaftlich“ wird im Alltag oft für „billig“ verwendet. In der Prüfung ist **Wirtschaftlichkeit** aber eine genau definierte Kennzahl. Zusammen mit Produktivität und Rentabilität beschreibt sie den Erfolg eines Unternehmens oder einer Investition.

| Kennzahl | Formel | Frage | Ergebnis |
|---|---|---|---|
| **Produktivität** | Ausbringungsmenge ÷ Einsatzmenge | Wie viel **Menge** schaffen wir mit dem Einsatz? | Mengenverhältnis, z. B. Arbeitsplätze pro Stunde |
| **Wirtschaftlichkeit** | Erträge ÷ Aufwendungen (bzw. Leistungen ÷ Kosten) | Bringen wir mehr ein, als wir verbrauchen? | > 1 wirtschaftlich, = 1 Kostendeckung, < 1 unwirtschaftlich |
| **Eigenkapitalrentabilität** | Gewinn ÷ Eigenkapital × 100 | Wie verzinst sich das Geld der Eigentümer? | Prozent |
| **Gesamtkapitalrentabilität** | (Gewinn + Fremdkapitalzinsen) ÷ Gesamtkapital × 100 | Wie verzinst sich das gesamte eingesetzte Kapital? | Prozent |
| **Umsatzrentabilität** | Gewinn ÷ Umsatz × 100 | Wie viel Gewinn bleibt von jedem Euro Umsatz? | Prozent |

Begriffe dazu:
- **Gewinn** = Erträge − Aufwendungen (in €).
- **Eigenkapital** = Geld der Eigentümer; **Fremdkapital** = geliehenes Geld (z. B. Bankdarlehen); **Gesamtkapital** = Eigenkapital + Fremdkapital.
- Bei der Gesamtkapitalrentabilität werden die **Fremdkapitalzinsen** zum Gewinn addiert, weil sie der „Ertrag“ der Geldgeber für das geliehene Kapital sind.

**Warum mehrere Kennzahlen?** Ein Techniker kann sehr **produktiv** sein (viele Arbeitsplätze pro Tag), und trotzdem ist der Auftrag **unwirtschaftlich**, wenn der Preis zu niedrig kalkuliert wurde. Und ein Unternehmen kann **wirtschaftlich** arbeiten (Wert knapp über 1), aber eine **geringe Rentabilität** haben – dann hätten die Eigentümer ihr Geld besser anders angelegt.

**Wirtschaftlichkeit von IT-Systemen beurteilen** (Themenkreis der AP1): Hier geht es meist darum, Alternativen zu vergleichen – nicht nur über den Kaufpreis, sondern über **Anschaffungs- und Folgekosten** (Energie, Wartung, Lizenzen, Schulung, Ausfallzeiten), **Restwert** und qualitative Kriterien (Service, Garantie, Lieferzeit). Die Werkzeuge dafür kennst du aus w02 und w03: Bezugskalkulation, Nutzwertanalyse, TCO, Amortisation.

*Achtung Rundung:* Runde erst das Endergebnis und nur so genau, wie die Aufgabe es verlangt.`,
        },
        {
          type: 'visual',
          title: 'Kennzahlen auf einen Blick',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Produktivität', text: 'Output ÷ Input als Mengen. Beispiel: 48 Arbeitsplätze ÷ 96 h = 0,5 Arbeitsplätze pro Stunde.', icon: 'Gauge' },
                { title: 'Wirtschaftlichkeit', text: 'Erträge ÷ Aufwendungen. Über 1 = wirtschaftlich. Beispiel: 1.250.000 € ÷ 1.150.000 € ≈ 1,09.', icon: 'Scale' },
                { title: 'Rentabilität', text: 'Gewinn ÷ Kapital × 100. Beispiel: 100.000 € ÷ 500.000 € × 100 = 20 % Eigenkapitalrentabilität.', icon: 'Percent' },
              ],
            },
          },
          caption: 'Produktivität misst Mengen, Wirtschaftlichkeit Geldströme, Rentabilität die Verzinsung des Kapitals.',
        },
        {
          type: 'example',
          title: 'Kennzahlen des IT-Systemhauses',
          problem: `Das IT-Systemhaus Nord hat im letzten Jahr folgende Werte:

| Position | Wert |
|---|---|
| Erträge (= Umsatz) | 1.250.000 € |
| Aufwendungen | 1.150.000 € |
| Eigenkapital | 500.000 € |
| Fremdkapital | 300.000 € |
| Zinsen für das Fremdkapital | 15.000 € |
| Rollout-Team: eingerichtete Arbeitsplätze / Arbeitsstunden | 48 / 96 h |

Berechne Gewinn, Wirtschaftlichkeit, Eigenkapital-, Gesamtkapital- und Umsatzrentabilität sowie die Arbeitsproduktivität des Rollout-Teams.`,
          steps: [
            { label: 'Gewinn', body: '1.250.000 € − 1.150.000 € = **100.000 €**' },
            { label: 'Wirtschaftlichkeit', body: '1.250.000 € ÷ 1.150.000 € = 1,0869… ≈ **1,09** → größer als 1 → wirtschaftlich.' },
            { label: 'Eigenkapitalrentabilität', body: '100.000 € ÷ 500.000 € × 100 = **20,0 %**' },
            { label: 'Gesamtkapitalrentabilität', body: 'Gesamtkapital = 500.000 € + 300.000 € = 800.000 €. (100.000 € + 15.000 €) ÷ 800.000 € × 100 = 14,375 % ≈ **14,4 %**' },
            { label: 'Umsatzrentabilität', body: '100.000 € ÷ 1.250.000 € × 100 = **8,0 %** → von jedem Euro Umsatz bleiben 8 Cent Gewinn.' },
            { label: 'Produktivität', body: '48 Arbeitsplätze ÷ 96 h = **0,5 Arbeitsplätze pro Stunde** (also 2 Stunden je Arbeitsplatz).' },
          ],
          result: 'Das Systemhaus arbeitet wirtschaftlich (1,09). Das Eigenkapital verzinst sich mit 20 %, das Gesamtkapital mit 14,4 %, die Umsatzrendite beträgt 8 %.',
        },
        {
          type: 'check',
          question: {
            id: 'w06-c02', kind: 'number', skill: 'w.kennzahlen', difficulty: 2,
            prompt: 'Ein Projekt brachte **84.000 €** Erträge bei **96.000 €** Aufwendungen. Berechne die **Wirtschaftlichkeit** (zwei Nachkommastellen).',
            answer: 0.88, tolerance: 0.005,
            misconceptions: [
              { answer: '1.14', error: 'w-kennzahl-kehrwert', why: 'Du hast Aufwendungen ÷ Erträge gerechnet. Wirtschaftlichkeit = **Erträge ÷ Aufwendungen**.' },
              { answer: '-12000', error: 'w-kennzahl-gewinn', why: 'Das ist der Verlust in €. Gefragt ist das **Verhältnis** Erträge ÷ Aufwendungen.' },
            ],
            explanation: '**Ergebnis: 0,88**\n\n84.000 € ÷ 96.000 € = 0,875 → auf zwei Stellen gerundet **0,88**. Der Wert ist **kleiner als 1** → das Projekt war **unwirtschaftlich** (12.000 € Verlust).\n\nHäufiger Fehler: Zähler und Nenner vertauschen (ergibt 1,14 und täuscht Wirtschaftlichkeit vor).',
          },
        },
        { type: 'practice', title: 'Übung: Kennzahlen berechnen', generator: 'w.kennzahlen', count: 3, difficulty: 1 },
        { type: 'practice', title: 'Übung: Rentabilität', generator: 'w.kennzahlen', count: 3, difficulty: 2 },
        { type: 'practice', title: 'Prüfungsniveau: Gesamtkapitalrentabilität', generator: 'w.kennzahlen', count: 2, difficulty: 3 },
        { type: 'practice', title: 'Übung: Begriffe und Beurteilung', questionIds: ['w06-q007', 'w06-q008', 'w06-q009', 'w06-q010', 'w06-q011', 'w06-q012'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Produktivität = Ausbringungsmenge ÷ Einsatzmenge (reine Mengen).', 'Wirtschaftlichkeit = Erträge ÷ Aufwendungen; > 1 wirtschaftlich.', 'EK-Rentabilität = Gewinn ÷ EK × 100; GK-Rentabilität = (Gewinn + FK-Zinsen) ÷ (EK + FK) × 100; Umsatzrentabilität = Gewinn ÷ Umsatz × 100.', 'Produktiv heißt nicht automatisch wirtschaftlich – und wirtschaftlich nicht automatisch rentabel.', 'IT-Systeme beurteilt man über Gesamtkosten, nicht nur über den Kaufpreis.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'w06-l03',
      title: 'Märkte und Marktformen',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['w.marktformen'],
      simple: `Ein **Markt** ist jeder Ort, an dem sich Anbieter (Verkäufer) und Nachfrager (Käufer) treffen – wie ein Wochenmarkt, nur auch online. Die **Marktform** sagt, wie viele auf jeder Seite sind. Gibt es nur **einen** Anbieter, ist das ein **Monopol** (wie der einzige Kiosk auf einer Insel – er kann den Preis fast allein bestimmen). **Wenige** Anbieter heißt **Oligopol** (z. B. wenige große Mobilfunknetze). **Viele** Anbieter heißt **Polypol** (z. B. viele Händler für USB-Kabel) – hier bestimmt der Wettbewerb den Preis.

**Merke:** Einer = Monopol, wenige = Oligopol, viele = Polypol – je weniger Anbieter, desto mehr Macht über den Preis.`,
      steps: [
        {
          type: 'explain',
          title: 'Wer trifft sich auf dem Markt?',
          body: `Ein **Markt** ist das Zusammentreffen von **Angebot** und **Nachfrage** – egal ob auf dem Wochenmarkt, in einem Onlineshop oder über eine Ausschreibung.

**Marktarten (Auswahl)**

| Unterscheidung | Arten | IT-Beispiel |
|---|---|---|
| nach dem Gut | **Gütermarkt** (Waren und Dienstleistungen), **Faktormarkt** (Arbeit, Kapital, Boden) | Notebook-Markt (Gütermarkt) · Arbeitsmarkt für Fachinformatiker (Faktormarkt) |
| nach den Beteiligten | **B2B** (Unternehmen an Unternehmen), **B2C** (Unternehmen an Verbraucher) | Systemhaus verkauft Server an die Elektro Krämer GmbH (B2B) · Elektronikmarkt verkauft an Privatleute (B2C) |
| nach dem Zugang | **offener** Markt (jeder darf anbieten) · **geschlossener** Markt (Zugang beschränkt, z. B. durch Lizenz oder Gesetz) | |

**Vollkommener und unvollkommener Markt**

Ein **vollkommener Markt** ist ein Denkmodell. Er setzt voraus:
1. **gleichartige (homogene) Güter** – kein Unterschied zwischen den Angeboten,
2. **vollständige Markttransparenz** – alle kennen alle Preise und Angebote,
3. **keine Vorlieben (Präferenzen)** – weder für eine Person, einen Ort, eine Zeit noch eine Marke,
4. **Punktmarkt** – alle treffen sich zur selben Zeit am selben Ort,
5. **sofortige Reaktion** aller Beteiligten auf Preisänderungen.

In der Wirklichkeit sind Märkte fast immer **unvollkommen**: Kunden bleiben beim gewohnten Systemhaus (persönliche Präferenz), bevorzugen eine Marke oder kennen nicht alle Angebote. Deshalb gibt es für dasselbe Notebook unterschiedliche Preise.

**Marktformen – wie viele Anbieter und Nachfrager?**

| Anbieter → / Nachfrager ↓ | **viele** Anbieter | **wenige** Anbieter | **ein** Anbieter |
|---|---|---|---|
| **viele** Nachfrager | **Polypol** (vollständige Konkurrenz) | **Angebotsoligopol** | **Angebotsmonopol** |
| **wenige** Nachfrager | Nachfrageoligopol | zweiseitiges Oligopol | beschränktes Angebotsmonopol |
| **ein** Nachfrager | **Nachfragemonopol** | beschränktes Nachfragemonopol | zweiseitiges Monopol |

**IT-Beispiele**
- **Polypol:** Zubehör wie Patchkabel, Mäuse oder USB-Sticks; IT-Dienstleister in einer Großstadt.
- **Angebotsoligopol:** wenige Hersteller von x86-Prozessoren für PCs; wenige Betreiber eigener Mobilfunknetze in Deutschland; wenige große Anbieter von Desktop-Betriebssystemen.
- **Angebotsmonopol:** Ein Softwarehersteller ist der einzige, der Updates für seine eigene Spezialsoftware liefern darf; das Schienennetz in Deutschland.
- **Nachfragemonopol:** Ein einziger großer Arbeitgeber in einer abgelegenen Region auf dem Arbeitsmarkt.

**Folgen für den Preis:** Im **Polypol** kann ein einzelner Anbieter den Preis kaum beeinflussen – er muss den Marktpreis nehmen. Ein **Monopolist** kann den Preis weitgehend selbst festlegen (aber: Ist der Preis zu hoch, kaufen weniger Kunden). Im **Oligopol** beobachten sich die wenigen Anbieter genau – senkt einer die Preise, ziehen die anderen oft nach.

**Wettbewerbsschutz:** Das **Gesetz gegen Wettbewerbsbeschränkungen (GWB)** verbietet Preisabsprachen (Kartelle) und den Missbrauch von Marktmacht. Nach **§ 18 Abs. 4 GWB** wird vermutet, dass ein Unternehmen **marktbeherrschend** ist, wenn es mindestens **40 % Marktanteil** hat. Die Aufsicht führt das **Bundeskartellamt**.`,
        },
        {
          type: 'visual',
          title: 'Die drei Grundformen auf der Angebotsseite',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Polypol', text: 'Viele Anbieter, viele Nachfrager. Starker Wettbewerb, Anbieter sind „Preisnehmer“. Beispiel: Patchkabel.', icon: 'Users' },
                { title: 'Oligopol', text: 'Wenige große Anbieter. Sie beobachten sich gegenseitig, Preise oft ähnlich. Beispiel: Mobilfunknetze, PC-Prozessoren.', icon: 'Building2' },
                { title: 'Monopol', text: 'Ein Anbieter. Kann den Preis weitgehend bestimmen; Kartellrecht schützt die Kunden. Beispiel: Updates einer Spezialsoftware.', icon: 'Crown' },
              ],
            },
          },
          caption: 'Je weniger Anbieter, desto größer ihre Macht über Preis und Bedingungen.',
        },
        {
          type: 'example',
          title: 'Marktform bestimmen und begründen',
          problem: 'Die Elektro Krämer GmbH sucht (a) einen Lieferanten für 200 Patchkabel, (b) einen Mobilfunkvertrag mit eigenem Netz für 60 Außendienstler und (c) ein Update für ihre speziell programmierte Lagersoftware, deren Quellcode nur der Hersteller besitzt. Bestimme jeweils die Marktform auf der Angebotsseite.',
          steps: [
            { label: '(a) Patchkabel', body: 'Sehr viele Händler bieten gleichartige Kabel an, sehr viele Kunden kaufen → **Polypol**. Folge: Preise vergleichen lohnt, Verhandlungsspielraum über die Menge.' },
            { label: '(b) Mobilfunk mit eigenem Netz', body: 'Nur wenige Netzbetreiber, sehr viele Kunden → **Angebotsoligopol**. Folge: ähnliche Tarife, Verhandlung eher über Rahmenvertrag und Stückzahl.' },
            { label: '(c) Update der Spezialsoftware', body: 'Nur der Hersteller kann es liefern → **Angebotsmonopol** (für dieses Gut). Folge: Abhängigkeit (Lock-in) – deshalb schon beim Kauf Wartungsvertrag und Preise für Updates festlegen.' },
          ],
          result: 'Polypol – Angebotsoligopol – Angebotsmonopol. Die Marktform zeigt, wie viel Verhandlungsmacht der Käufer hat.',
        },
        {
          type: 'check',
          question: {
            id: 'w06-c03', kind: 'match', skill: 'w.marktformen', difficulty: 1,
            prompt: 'Ordne die Marktform zu (Angebotsseite, viele Nachfrager).',
            left: ['Ein einziger Anbieter', 'Wenige große Anbieter', 'Sehr viele kleine Anbieter'],
            right: ['Angebotsmonopol', 'Angebotsoligopol', 'Polypol'],
            answer: [0, 1, 2],
            explanation: 'Mono = einer, Oligo = wenige, Poly = viele (aus dem Griechischen).',
          },
        },
        { type: 'practice', title: 'Übung: Marktformen', questionIds: ['w06-q013', 'w06-q014', 'w06-q015', 'w06-q016', 'w06-q017', 'w06-q018'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Markt = Zusammentreffen von Angebot und Nachfrage (Güter- oder Faktormarkt, B2B oder B2C).', 'Vollkommener Markt: homogene Güter, Transparenz, keine Präferenzen, Punktmarkt, sofortige Reaktion – in der Praxis selten.', 'Marktformen: Polypol (viele), Oligopol (wenige), Monopol (einer) – jeweils auf Angebots- oder Nachfrageseite.', 'Weniger Anbieter = mehr Preismacht.', '§ 18 GWB: ab 40 % Marktanteil wird Marktbeherrschung vermutet; Kartelle sind verboten.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'w06-l04',
      title: 'Preisbildung und Marktanteil',
      minutes: 30,
      relevance: 'ap1-teilweise',
      skills: ['w.preisbildung', 'w.marktanteil'],
      simple: `Stell dir einen Flohmarkt vor: Ist ein Spielzeug sehr billig, wollen es viele kaufen, aber kaum jemand will es dafür hergeben. Ist es sehr teuer, wollen viele verkaufen, aber niemand kaufen. Irgendwo dazwischen gibt es einen Preis, bei dem **genau so viel verkauft wie gekauft** werden soll – den **Gleichgewichtspreis**. Gibt es mehr Ware als Käufer, haben die Käufer die Macht (**Käufermarkt**, Preise sinken). Ist die Ware knapp, haben die Verkäufer die Macht (**Verkäufermarkt**, Preise steigen) – so war es z. B. beim Chipmangel 2021. Der **Marktanteil** sagt, welches Stück vom Kuchen eine Firma hat: eigener Absatz geteilt durch den Absatz aller × 100.

**Merke:** Angebot = Nachfrage → Gleichgewichtspreis; zu viel Ware → Käufermarkt; zu wenig Ware → Verkäufermarkt.`,
      steps: [
        {
          type: 'explain',
          title: 'Wie der Preis entsteht',
          body: `**Nachfrage:** Je **höher** der Preis, desto **weniger** wollen die Käufer kaufen (die Nachfragekurve fällt).
**Angebot:** Je **höher** der Preis, desto **mehr** wollen die Anbieter verkaufen (die Angebotskurve steigt).

Im Schnittpunkt beider Kurven liegt der **Gleichgewichtspreis**: Hier ist die angebotene Menge **gleich** der nachgefragten Menge. Alle, die zu diesem Preis kaufen oder verkaufen wollen, kommen zum Zug – der Markt wird „geräumt“. Bei jedem anderen Preis wird nur die **kleinere** der beiden Mengen gehandelt.

| Preis liegt … | Situation | Name des Marktes | Wer hat die Macht? | Was passiert? |
|---|---|---|---|---|
| **über** dem Gleichgewichtspreis | Angebot > Nachfrage → **Angebotsüberhang** | **Käufermarkt** | Käufer | Anbieter senken die Preise, um ihre Ware loszuwerden |
| **unter** dem Gleichgewichtspreis | Nachfrage > Angebot → **Nachfrageüberhang** | **Verkäufermarkt** | Verkäufer | Ware ist knapp, Preise steigen |
| **gleich** dem Gleichgewichtspreis | Angebot = Nachfrage | Gleichgewicht | ausgeglichen | Preis bleibt stabil |

*Eselsbrücke:* Der Markt heißt nach der Seite, die **im Vorteil** ist. Gibt es zu viel Ware, können sich die **Käufer** die besten Angebote aussuchen → **Käufer**markt.

**Verschiebung der Kurven – was passiert, wenn sich etwas ändert?**

| Ereignis | Wirkung | Folge für Preis und Menge |
|---|---|---|
| Nachfrage **steigt** (z. B. Homeoffice-Welle: alle brauchen Webcams und Headsets) | Nachfragekurve nach **rechts** | Preis ↑, Menge ↑ |
| Nachfrage **sinkt** (z. B. ältere Technik wird unmodern) | Nachfragekurve nach **links** | Preis ↓, Menge ↓ |
| Angebot **sinkt** (z. B. Chipmangel, Lieferkettenprobleme) | Angebotskurve nach **links** | Preis ↑, Menge ↓ |
| Angebot **steigt** (z. B. neue Fabriken, mehr Wettbewerber) | Angebotskurve nach **rechts** | Preis ↓, Menge ↑ |

**Marktgrößen**

| Begriff | Bedeutung | Beispiel (Business-Notebooks, Raum Hamburg, 1 Jahr) |
|---|---|---|
| **Marktpotenzial** | höchstmögliche Absatzmenge, wenn alle möglichen Kunden kaufen würden | 60.000 Stück |
| **Marktvolumen** | tatsächlich von **allen** Anbietern verkaufte Menge | 40.000 Stück |
| **Absatzvolumen** | vom **eigenen** Unternehmen verkaufte Menge | 3.000 Stück |
| **Marktanteil** | Absatzvolumen ÷ Marktvolumen × 100 | 3.000 ÷ 40.000 × 100 = **7,5 %** |
| **Sättigungsgrad** | Marktvolumen ÷ Marktpotenzial × 100 | 40.000 ÷ 60.000 × 100 ≈ 66,7 % |

**Prozent oder Prozentpunkte?** Steigt der Marktanteil von 10 % auf 12 %, ist das ein Plus von **2 Prozentpunkten** – aber eine relative Steigerung um **20 %** (2 ÷ 10 × 100). In der Prüfung genau lesen, was gefragt ist!`,
        },
        {
          type: 'example',
          title: 'Gleichgewichtspreis aus einer Tabelle bestimmen',
          problem: `Für 24-Zoll-Monitore ergeben sich auf einem regionalen Markt (pro Monat):

| Preis | Nachfrage | Angebot |
|---|---|---|
| 180 € | 1.200 | 400 |
| 200 € | 1.000 | 600 |
| 220 € | 800 | 800 |
| 240 € | 650 | 950 |
| 260 € | 500 | 1.100 |

Bestimme den Gleichgewichtspreis und beschreibe die Lage bei 180 € und bei 260 €.`,
          steps: [
            { label: 'Gleichgewicht', body: 'Bei **220 €** sind Nachfrage und Angebot gleich (je 800 Stück) → **Gleichgewichtspreis 220 €**, Gleichgewichtsmenge 800 Stück.' },
            { label: 'Preis 180 €', body: 'Nachfrage 1.200 > Angebot 400 → **Nachfrageüberhang** von 1.200 − 400 = **800 Stück** → **Verkäufermarkt**. Verkauft werden nur 400 Stück; die Preise steigen.' },
            { label: 'Preis 260 €', body: 'Angebot 1.100 > Nachfrage 500 → **Angebotsüberhang** von 1.100 − 500 = **600 Stück** → **Käufermarkt**. Verkauft werden nur 500 Stück; die Händler senken die Preise.' },
            { label: 'Umsatz im Gleichgewicht', body: '800 Stück × 220 € = **176.000 €** Marktumsatz pro Monat.' },
          ],
          result: 'Gleichgewichtspreis 220 € (800 Stück). Darunter Nachfrageüberhang (Verkäufermarkt), darüber Angebotsüberhang (Käufermarkt).',
        },
        {
          type: 'check',
          question: {
            id: 'w06-c04', kind: 'single', skill: 'w.preisbildung', difficulty: 2,
            prompt: 'Durch einen Brand in einer Chipfabrik werden weltweit weniger Grafikkarten produziert, die Nachfrage bleibt gleich. Was passiert nach dem Marktmodell?',
            options: ['Die Angebotskurve verschiebt sich nach links: Preis steigt, gehandelte Menge sinkt.', 'Die Nachfragekurve verschiebt sich nach rechts: Preis und Menge steigen.', 'Die Angebotskurve verschiebt sich nach rechts: Preis sinkt, Menge steigt.', 'Nichts – der Preis wird vom Hersteller festgelegt.'],
            answer: 0,
            distractors: {
              '1': { why: 'Die Nachfrage bleibt laut Aufgabe gleich – verändert hat sich das **Angebot**.', error: 'w-kurve-verwechselt' },
              '2': { why: 'Weniger Produktion bedeutet **weniger** Angebot (Verschiebung nach links), nicht mehr.', error: 'w-kurve-richtung' },
              '3': { why: 'Auch Hersteller müssen auf Knappheit reagieren; im Modell steigt der Preis bei sinkendem Angebot.', error: 'w-kurve-verwechselt' },
            },
            explanation: '**Angebot sinkt → Angebotskurve nach links → neuer Schnittpunkt bei höherem Preis und kleinerer Menge.** Genau das war beim Chipmangel 2020–2022 zu beobachten: Grafikkarten wurden knapp und teuer (Verkäufermarkt).\n\nHäufiger Fehler: Angebots- und Nachfrageänderung verwechseln. Frage dich immer zuerst: Hat sich das Verhalten der **Käufer** oder der **Anbieter** geändert?',
          },
        },
        { type: 'practice', title: 'Übung: Gleichgewichtspreis', generator: 'w.gleichgewicht', count: 2, difficulty: 1 },
        { type: 'practice', title: 'Übung: Überhang und Marktlage', generator: 'w.gleichgewicht', count: 2, difficulty: 2 },
        { type: 'practice', title: 'Übung: Marktanteil', generator: 'w.marktanteil', count: 2, difficulty: 1 },
        { type: 'practice', title: 'Prüfungsniveau: Marktanteil und Prozentpunkte', generator: 'w.marktanteil', count: 2, difficulty: 3 },
        { type: 'practice', title: 'Übung: Preisbildung verstehen', questionIds: ['w06-q019', 'w06-q020', 'w06-q021', 'w06-q022', 'w06-q023', 'w06-q024', 'w06-q025', 'w06-q026', 'w06-q034'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Nachfrage fällt mit steigendem Preis, Angebot steigt mit steigendem Preis.', 'Gleichgewichtspreis: Angebot = Nachfrage; gehandelt wird sonst nur die kleinere Menge.', 'Angebotsüberhang → Käufermarkt (Preise sinken); Nachfrageüberhang → Verkäufermarkt (Preise steigen).', 'Nachfrage ↑ → Preis ↑, Menge ↑; Angebot ↓ → Preis ↑, Menge ↓.', 'Marktanteil = Absatzvolumen ÷ Marktvolumen × 100; Prozentpunkte ≠ Prozent.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'w06-l05',
      title: 'ABC-Analyse: Wichtiges von Unwichtigem trennen',
      minutes: 25,
      relevance: 'ap1-teilweise',
      skills: ['w.abc'],
      simple: `Stell dir deinen Kleiderschrank vor: Wenige teure Sachen (Winterjacke, Schuhe) machen den größten Teil des Geldes aus, das du für Kleidung ausgibst. Viele billige Socken zählen kaum. Die **ABC-Analyse** macht genau das mit Artikeln oder Kunden: Sie sortiert nach dem **Wert** (Menge × Preis). **A** sind die wenigen Wichtigen mit dem meisten Wert, **C** die vielen Kleinen mit wenig Wert. Bei A-Artikeln lohnt sich genaues Verhandeln, bei C-Artikeln bestellt man einfach und unkompliziert.

**Merke:** Nach **Wert** sortieren (nicht nach Stückzahl), Anteile aufaddieren, dann in A, B und C einteilen.`,
      steps: [
        {
          type: 'explain',
          title: 'Wo lohnt sich der Aufwand?',
          body: `Die **ABC-Analyse** teilt Artikel (oder Kunden) nach ihrer wirtschaftlichen Bedeutung in drei Klassen ein. Sie beruht auf der Beobachtung, dass oft **wenige Positionen den größten Teil des Werts** ausmachen (**Pareto-Prinzip**, „80/20-Regel“).

**Vorgehen in 5 Schritten**
1. Für jeden Artikel den **Verbrauchswert** berechnen: **Jahresmenge × Preis je Stück**.
2. Artikel nach dem Verbrauchswert **absteigend sortieren** (Rang 1 = höchster Wert).
3. **Wertanteil** jedes Artikels in % berechnen: Verbrauchswert ÷ Gesamtwert × 100.
4. Die Wertanteile **kumulieren** (von oben nach unten aufaddieren).
5. Mit festen Grenzen einteilen, z. B. **A bis 80 %**, **B bis 95 %**, **C der Rest**. (Die Grenzen schwanken je nach Lehrbuch und Unternehmen – in der Prüfung gilt die Vorgabe der Aufgabe.)

**Typisches Ergebnis und Folgen**

| Klasse | Anteil an der Artikelzahl (ungefähr) | Anteil am Wert (ungefähr) | Beschaffung |
|---|---|---|---|
| **A** | 10–20 % | 75–80 % | genaue Bedarfsplanung, mehrere Angebote, Preisverhandlung, enge Bestandskontrolle, Lieferung möglichst nach Bedarf |
| **B** | 20–30 % | 15–20 % | mittlerer Aufwand |
| **C** | 50–70 % | 5–10 % | vereinfachte Bestellung: Rahmenvertrag, Sammelbestellung, Bestellung über einen Onlinekatalog (E-Procurement), größere Mengen auf Vorrat |

**ABC-Analyse der Kunden:** Dieselbe Methode mit dem **Umsatz je Kunde**. A-Kunden (wenige Kunden mit viel Umsatz) erhalten besondere Betreuung, z. B. einen festen Ansprechpartner (Key Account), bevorzugte Termine und individuelle Angebote. C-Kunden werden standardisiert betreut (Webshop, Hotline).

**Häufige Fehler:** nach **Stückzahl** statt nach **Wert** sortieren · den **Einzelanteil** statt des **kumulierten** Anteils mit der Grenze vergleichen · Artikel nicht sortieren, bevor kumuliert wird.`,
        },
        {
          type: 'example',
          title: 'ABC-Analyse für das IT-Material',
          problem: `Jahresverbrauch der IT-Abteilung (Grenzen: A bis einschließlich 80 %, B bis einschließlich 95 %, C darüber):

| Artikel | Menge | Preis |
|---|---|---|
| Patchkabel | 300 | 3 € |
| Notebook | 28 | 1.000 € |
| Headset | 35 | 60 € |
| Dockingstation | 25 | 200 € |
| Maus | 120 | 15 € |
| 27-Zoll-Monitor | 40 | 180 € |`,
          steps: [
            { label: '1. Verbrauchswerte', body: 'Patchkabel 900 € · Notebook 28.000 € · Headset 2.100 € · Dockingstation 5.000 € · Maus 1.800 € · Monitor 7.200 € → **Gesamtwert 45.000 €**' },
            { label: '2./3. Sortieren und Anteile', body: '1. Notebook 28.000 € = 62,2 % · 2. Monitor 7.200 € = 16,0 % · 3. Dockingstation 5.000 € = 11,1 % · 4. Headset 2.100 € = 4,7 % · 5. Maus 1.800 € = 4,0 % · 6. Patchkabel 900 € = 2,0 %' },
            { label: '4. Kumulieren', body: '62,2 % → 78,2 % → 89,3 % → 94,0 % → 98,0 % → 100 %' },
            { label: '5. Klassen', body: '**A:** Notebook, Monitor (bis 78,2 %) · **B:** Dockingstation, Headset (bis 94,0 %) · **C:** Maus, Patchkabel' },
            { label: 'Auswertung', body: 'Die A-Artikel sind nur 68 von 548 Stück (12,4 % der Menge), machen aber 78,2 % des Werts aus. Die C-Artikel sind 420 Stück (76,6 % der Menge), aber nur 6,0 % des Werts. → Bei Notebooks und Monitoren lohnen Angebotsvergleich und Verhandlung; Mäuse und Kabel bestellt man per Rahmenvertrag.' },
          ],
          result: 'A: Notebook, Monitor · B: Dockingstation, Headset · C: Maus, Patchkabel. Wenige teure Artikel bestimmen den Großteil der Kosten.',
        },
        {
          type: 'check',
          question: {
            id: 'w06-c05', kind: 'single', skill: 'w.abc', difficulty: 1,
            prompt: 'Wonach werden die Artikel bei der ABC-Analyse sortiert?',
            options: ['Nach dem Verbrauchswert (Menge × Preis), absteigend', 'Nach der Stückzahl, absteigend', 'Nach dem Stückpreis, absteigend', 'Alphabetisch nach Artikelnamen'],
            answer: 0,
            distractors: {
              '1': { why: 'Die Stückzahl allein sagt nichts über die wirtschaftliche Bedeutung – 300 Patchkabel sind weniger wert als ein Server.', error: 'w-abc-menge-statt-wert' },
              '2': { why: 'Ein teurer Artikel, der nur einmal gekauft wird, kann trotzdem unbedeutend sein. Entscheidend ist **Menge × Preis**.', error: 'w-abc-menge-statt-wert' },
              '3': { why: 'Die alphabetische Reihenfolge hat keine wirtschaftliche Aussage.', error: 'w-abc-menge-statt-wert' },
            },
            explanation: 'Sortiert wird nach dem **Verbrauchswert** = Jahresmenge × Preis. Erst dann werden die Anteile kumuliert und die Klassen gebildet.',
          },
        },
        { type: 'practice', title: 'Übung: Wertanteil berechnen', generator: 'w.abc', count: 2, difficulty: 1 },
        { type: 'practice', title: 'Übung: Klassen bilden', generator: 'w.abc', count: 2, difficulty: 2 },
        { type: 'practice', title: 'Prüfungsniveau: vollständige ABC-Analyse', generator: 'w.abc', count: 1, difficulty: 3 },
        { type: 'practice', title: 'Übung: ABC-Analyse auswerten', questionIds: ['w06-q027', 'w06-q028', 'w06-q029', 'w06-q030', 'w06-q031', 'w06-q032', 'w06-q033'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Verbrauchswert = Menge × Preis; nach Wert absteigend sortieren.', 'Anteile berechnen und kumulieren; Grenzen laut Aufgabe (z. B. 80 % / 95 %).', 'A = wenige Artikel, viel Wert → intensiv beschaffen; C = viele Artikel, wenig Wert → vereinfacht beschaffen.', 'Auch Kunden lassen sich nach Umsatz in A, B, C einteilen (A-Kunden: besondere Betreuung).'] },
      ],
    },
  ],
  /* ================================================================ */
  questions: [
    { id: 'w06-q001', kind: 'table', skill: 'w.unternehmensziele', difficulty: 2, prompt: 'Bestimme die **Zielbeziehung**: **komplementär**, **konkurrierend** oder **indifferent**.', columns: [{ key: 'z', label: 'Zielbeziehung', type: 'text' }], rows: [
      { label: 'Virtualisierung der Server senkt Hardwarekosten und Energieverbrauch.', cells: { z: { answer: 'komplementär', accept: ['komplementaer', 'zielharmonie'] } } },
      { label: 'Personalkosten senken und gleichzeitig mehr Schulungen anbieten.', cells: { z: { answer: 'konkurrierend', accept: ['zielkonflikt'] } } },
      { label: 'Neues Firmenlogo einführen und die Backup-Laufzeit verkürzen.', cells: { z: { answer: 'indifferent', accept: ['neutral'] } } },
      { label: 'Expressversand für schnellere Lieferung und CO₂-Ausstoß senken.', cells: { z: { answer: 'konkurrierend', accept: ['zielkonflikt'] } } },
    ], explanation: 'Fördern sich die Ziele → komplementär; behindern sie sich → konkurrierend; haben sie nichts miteinander zu tun → indifferent.\n\nHäufiger Fehler: Indifferent mit konkurrierend verwechseln – „indifferent“ heißt, die Ziele beeinflussen sich **gar nicht**.', hints: ['Frage dich: Hilft die Erreichung des einen Ziels dem anderen, schadet sie ihm, oder ist sie egal?'] },
    { id: 'w06-q002', kind: 'single', skill: 'w.unternehmensziele', difficulty: 1, prompt: 'Welches ist ein **Formalziel** (Erfolgsziel)?', options: ['Die Eigenkapitalrentabilität auf 12 % steigern', 'Managed Services für Arztpraxen anbieten', 'Pro Jahr 300 Arbeitsplätze einrichten', 'Einen Ticketservice mit Hotline betreiben'], answer: 0, distractors: { '1': { why: 'Das beschreibt, **was** angeboten wird – ein Sachziel.', error: 'w-sach-formalziel' }, '2': { why: 'Eine Leistungsmenge ist ein Sachziel (Was und wie viel?).', error: 'w-sach-formalziel' }, '3': { why: 'Das ist eine Leistung, die angeboten wird – Sachziel.', error: 'w-sach-formalziel' } }, explanation: 'Formalziele messen den **Erfolg** (Gewinn, Rentabilität, Wirtschaftlichkeit, Liquidität). Sachziele beschreiben die **Leistung** (Produkte, Dienstleistungen, Mengen).' },
    { id: 'w06-q003', kind: 'match', skill: 'w.unternehmensziele', difficulty: 1, prompt: 'Ordne die Ziele der IT-Abteilung dem Zielbereich zu.', left: ['Druckkosten pro Seite um 10 % senken', 'Altgeräte aufbereiten statt verschrotten', 'Ergonomische Arbeitsplätze für alle Mitarbeitenden', 'Lieferanten mit günstigeren Konditionen auswählen'], right: ['ökonomisch', 'ökologisch', 'sozial'], answer: [0, 1, 2, 0], explanation: 'Kosten und Konditionen → ökonomisch; Ressourcen schonen → ökologisch; Gesundheit der Menschen → sozial.' },
    { id: 'w06-q004', kind: 'free', skill: 'w.unternehmensziele', difficulty: 2, prompt: 'Die Geschäftsführung der Elektro Krämer GmbH möchte „die IT-Kosten senken“ und „nachhaltiger werden“. Erläutere an einem Beispiel, warum diese Ziele **konkurrieren** können, und zeige einen Weg, wie sie **komplementär** werden.', modelAnswer: 'Konkurrierend: Energieeffiziente Hardware (z. B. Geräte mit Umweltsiegel, effiziente Netzteile) oder die fachgerechte Aufbereitung von Altgeräten kostet zunächst mehr Geld bzw. Arbeitszeit als der Kauf des billigsten Geräts – das widerspricht kurzfristig dem Ziel, Kosten zu senken. Komplementär werden die Ziele, wenn man die Gesamtkosten über die Nutzungsdauer betrachtet (TCO): Sparsame Geräte senken die Stromkosten, längere Nutzung und Reparatur sparen Neuanschaffungen, Virtualisierung spart Hardware und Energie. Dann senkt dieselbe Maßnahme Kosten und Umweltbelastung.', keywords: ['Anschaffungskosten', 'Energie', 'Gesamtkosten', 'TCO', 'Nutzungsdauer', 'Virtualisierung', 'kurzfristig', 'langfristig'], explanation: 'Ob Ziele konkurrieren, hängt oft vom Zeitraum ab: kurzfristig Zielkonflikt (Kaufpreis), langfristig Zielharmonie (Betriebskosten).' },
    { id: 'w06-q005', kind: 'table', skill: 'w.unternehmensziele', difficulty: 2, prompt: 'Welches Prinzip wird angewendet? **max** = Maximalprinzip, **min** = Minimalprinzip.', columns: [{ key: 'p', label: 'max / min', type: 'text' }], rows: [
      { label: 'Mit einem Budget von 30.000 € sollen möglichst viele Arbeitsplätze modernisiert werden.', cells: { p: { answer: 'max', accept: ['maximalprinzip', 'maximal'] } } },
      { label: '25 Notebooks laut Pflichtenheft sollen so günstig wie möglich beschafft werden.', cells: { p: { answer: 'min', accept: ['minimalprinzip', 'minimal'] } } },
      { label: 'Mit zwei Technikern sollen in einer Woche so viele Tickets wie möglich gelöst werden.', cells: { p: { answer: 'max', accept: ['maximalprinzip', 'maximal'] } } },
      { label: 'Der neue Server soll mit möglichst wenig Arbeitsstunden betriebsbereit gemacht werden.', cells: { p: { answer: 'min', accept: ['minimalprinzip', 'minimal'] } } },
    ], explanation: 'Mittel fest, Ergebnis möglichst groß → **Maximalprinzip**. Ergebnis fest, Mittel möglichst klein → **Minimalprinzip**.\n\nHäufiger Fehler: „möglichst günstig“ automatisch als Maximalprinzip deuten – entscheidend ist, **was vorgegeben** ist.', hints: ['Was ist vorgegeben – das Budget (Mittel) oder das Ergebnis?'] },
    { id: 'w06-q006', kind: 'text', skill: 'w.unternehmensziele', difficulty: 1, prompt: 'Wie nennt man eine Zielbeziehung, bei der die Erreichung des einen Ziels die Erreichung eines anderen Ziels **behindert**?', accept: ['zielkonflikt', 'konkurrierend', 'konkurrierende ziele', 'konkurrierende zielbeziehung', 'zielkonkurrenz'], explanation: 'Ein **Zielkonflikt** (konkurrierende Ziele), z. B. „Kosten senken“ gegen „mehr Weiterbildung“.' },
    { id: 'w06-q007', kind: 'match', skill: 'w.kennzahlen', difficulty: 1, prompt: 'Ordne die Formeln den Kennzahlen zu.', left: ['Produktivität', 'Wirtschaftlichkeit', 'Eigenkapitalrentabilität', 'Umsatzrentabilität'], right: ['Ausbringungsmenge ÷ Einsatzmenge', 'Erträge ÷ Aufwendungen', 'Gewinn ÷ Eigenkapital × 100', 'Gewinn ÷ Umsatz × 100'], answer: [0, 1, 2, 3], explanation: 'Produktivität rechnet mit **Mengen**, Wirtschaftlichkeit mit **Erträgen und Aufwendungen**, Rentabilitäten setzen den **Gewinn** ins Verhältnis zu Kapital oder Umsatz.' },
    { id: 'w06-q008', kind: 'number', skill: 'w.kennzahlen', difficulty: 2, prompt: 'Ein IT-Dienstleister erzielt einen Gewinn von **72.000 €** bei einem Eigenkapital von **480.000 €**. Berechne die **Eigenkapitalrentabilität** in Prozent.', answer: 15, tolerance: 0.05, unit: '%', misconceptions: [{ answer: '0.15', error: 'w-prozent-faktor', why: 'Mit 100 multiplizieren: 0,15 × 100 = 15 %.' }, { answer: '6.67', error: 'w-kennzahl-kehrwert', why: 'Zähler und Nenner vertauscht. Gewinn ÷ Eigenkapital.' }], explanation: '**Ergebnis: 15 %**\n\n72.000 € ÷ 480.000 € × 100 = **15 %**. Das Eigenkapital hat sich mit 15 % „verzinst“.\n\nHäufiger Fehler: das ×100 vergessen.' },
    { id: 'w06-q009', kind: 'number', skill: 'w.kennzahlen', difficulty: 2, prompt: 'Im Monat März hat das Rollout-Team **36 Arbeitsplätze** in **90 Arbeitsstunden** eingerichtet, im April **40 Arbeitsplätze** in **80 Arbeitsstunden**. Um wie viel **Prozent** ist die Arbeitsproduktivität (Arbeitsplätze je Stunde) von März auf April gestiegen?', answer: 25, tolerance: 0.05, unit: '%', misconceptions: [{ answer: '0.1', error: 'w-prozent-absolut', why: '0,1 Arbeitsplätze/h ist die absolute Differenz (0,5 − 0,4). Gefragt ist die prozentuale Veränderung: 0,1 ÷ 0,4 × 100.' }, { answer: '20', error: 'w-prozent-basis', why: 'Bezugsgröße ist der **Ausgangswert** (März: 0,4), nicht der neue Wert (0,5).' }, { answer: '11.11', error: 'w-kennzahl-produktivitaet', why: 'Du hast nur die Arbeitsplätze verglichen (40 statt 36). Die Produktivität setzt die Menge ins Verhältnis zu den **Stunden**.' }], hints: ['Berechne zuerst die Produktivität für jeden Monat.', 'Veränderung in % = (neu − alt) ÷ alt × 100.'], explanation: '**Ergebnis: 25 %**\n\n1. März: 36 ÷ 90 h = 0,4 Arbeitsplätze/h\n2. April: 40 ÷ 80 h = 0,5 Arbeitsplätze/h\n3. Veränderung: (0,5 − 0,4) ÷ 0,4 × 100 = **25 %**\n\nHäufiger Fehler: als Bezugsgröße den neuen Wert nehmen (ergäbe 20 %).' },
    { id: 'w06-q010', kind: 'free', skill: 'w.kennzahlen', difficulty: 2, prompt: 'Erkläre den Begriff **Wirtschaftlichkeit** und nenne **fünf Kriterien**, nach denen du die Wirtschaftlichkeit von drei Händlerangeboten für 35 PCs und 3 Abteilungsdrucker beurteilst.', modelAnswer: 'Wirtschaftlichkeit ist das Verhältnis von Ertrag (bzw. Leistung/Nutzen) zu Aufwand (bzw. Kosten). Wirtschaftlich handelt, wer ein Ziel mit möglichst geringen Mitteln oder mit gegebenen Mitteln einen möglichst großen Nutzen erreicht; als Kennzahl: Erträge ÷ Aufwendungen > 1. Kriterien für den Angebotsvergleich: 1. Bezugspreis nach Rabatt, Skonto und Bezugskosten (netto). 2. Folgekosten: Energieverbrauch, Verbrauchsmaterial der Drucker (Kosten je Seite), Wartung. 3. Garantie und Service (Vor-Ort-Service, Reaktionszeit). 4. Lieferzeit und Termintreue. 5. Restwert bzw. Nutzungsdauer. Weitere: Kompatibilität mit vorhandener Infrastruktur, Lizenzkosten, Einrichtungs- und Schulungsaufwand.', keywords: ['Verhältnis', 'Ertrag', 'Aufwand', 'Bezugspreis', 'Folgekosten', 'Energie', 'Garantie', 'Lieferzeit', 'Restwert'], explanation: 'Wirtschaftlich ist nicht automatisch das billigste Angebot – die Gesamtkosten über die Nutzungsdauer und die Qualität entscheiden.' },
    { id: 'w06-q011', kind: 'single', skill: 'w.kennzahlen', difficulty: 2, prompt: 'Ein Projekt hat eine Wirtschaftlichkeit von **0,95**. Was bedeutet das?', options: ['Die Aufwendungen sind höher als die Erträge – das Projekt ist unwirtschaftlich.', 'Das Projekt hat 95 % Gewinn erzielt.', 'Das Projekt ist wirtschaftlich, weil der Wert fast 1 ist.', 'Die Mitarbeitenden waren zu 95 % ausgelastet.'], answer: 0, distractors: { '1': { why: 'Die Wirtschaftlichkeit ist kein Gewinnprozentsatz, sondern das Verhältnis Erträge ÷ Aufwendungen.', error: 'w-kennzahl-deutung' }, '2': { why: 'Erst ab einem Wert **über 1** ist ein Vorhaben wirtschaftlich.', error: 'w-kennzahl-deutung' }, '3': { why: 'Auslastung ist eine andere Kennzahl.', error: 'w-kennzahl-deutung' } }, explanation: '0,95 < 1 → Für jeden Euro Aufwand kamen nur 95 Cent Ertrag zurück → **Verlust**, unwirtschaftlich.' },
    { id: 'w06-q012', kind: 'number', skill: 'w.kennzahlen', difficulty: 3, prompt: `Bilanz- und Erfolgszahlen eines Systemhauses:

| Position | Betrag |
|---|---|
| Gewinn | 90.000 € |
| Eigenkapital | 600.000 € |
| Fremdkapital | 400.000 € |
| Fremdkapitalzinsen | 20.000 € |

Berechne die **Gesamtkapitalrentabilität** in Prozent (eine Nachkommastelle).`, answer: 11, tolerance: 0.05, unit: '%', misconceptions: [{ answer: '9', error: 'w-rentabilitaet-zinsen', why: 'Die Fremdkapitalzinsen gehören in den Zähler: (90.000 + 20.000) ÷ 1.000.000.' }, { answer: '15', error: 'w-rentabilitaet-basis', why: 'Das ist die Eigenkapitalrentabilität (90.000 ÷ 600.000).' }, { answer: '18.3', error: 'w-rentabilitaet-basis', why: 'Im Nenner steht das Gesamtkapital (1.000.000 €), nicht nur das Eigenkapital.' }], hints: ['Gesamtkapital = 600.000 € + 400.000 €.', 'Zähler = Gewinn + Fremdkapitalzinsen.'], explanation: '**Ergebnis: 11,0 %**\n\n1. Gesamtkapital = 600.000 € + 400.000 € = 1.000.000 €\n2. Gewinn + FK-Zinsen = 90.000 € + 20.000 € = 110.000 €\n3. 110.000 € ÷ 1.000.000 € × 100 = **11,0 %**\n\nHäufiger Fehler: die Zinsen vergessen (ergäbe 9 %).' },
    { id: 'w06-q013', kind: 'table', skill: 'w.marktformen', difficulty: 2, prompt: 'Bestimme die Marktform auf der **Angebotsseite** (viele Nachfrager): **polypol**, **oligopol** oder **monopol**.', columns: [{ key: 'm', label: 'Marktform', type: 'text' }], rows: [
      { label: 'Patchkabel und Computermäuse im Onlinehandel', cells: { m: { answer: 'polypol' } } },
      { label: 'Mobilfunknetze mit eigener Infrastruktur in Deutschland', cells: { m: { answer: 'oligopol', accept: ['angebotsoligopol'] } } },
      { label: 'Updates für eine individuell programmierte Lagersoftware (Quellcode nur beim Hersteller)', cells: { m: { answer: 'monopol', accept: ['angebotsmonopol'] } } },
      { label: 'Prozessoren mit x86-Architektur für PCs', cells: { m: { answer: 'oligopol', accept: ['angebotsoligopol', 'duopol'] } } },
      { label: 'IT-Dienstleister für kleine Firmen in einer Großstadt', cells: { m: { answer: 'polypol' } } },
    ], explanation: 'Viele Anbieter → Polypol; wenige große → Oligopol (bei genau zwei spricht man auch vom Duopol); einer → Monopol.\n\nHäufiger Fehler: Große Bekanntheit eines Anbieters mit Monopol verwechseln – ein Monopol liegt nur vor, wenn es **keinen** anderen Anbieter für dieses Gut gibt.' },
    { id: 'w06-q014', kind: 'multi', skill: 'w.marktformen', difficulty: 2, prompt: 'Welche Voraussetzungen gehören zum Modell des **vollkommenen Marktes**?', options: ['Gleichartige (homogene) Güter', 'Vollständige Markttransparenz', 'Keine persönlichen, räumlichen oder zeitlichen Vorlieben', 'Ein einziger Anbieter', 'Unterschiedliche Preise für dasselbe Gut'], answer: [0, 1, 2], explanation: 'Dazu kommen Punktmarkt und sofortige Reaktion. Ein einziger Anbieter wäre ein Monopol; unterschiedliche Preise sind gerade ein Zeichen für einen **unvollkommenen** Markt.' },
    { id: 'w06-q015', kind: 'free', skill: 'w.marktformen', difficulty: 2, prompt: 'Der Markt für Business-Notebooks ist ein **unvollkommener Markt**. Erläutere, woran man das erkennt, mit zwei Beispielen.', modelAnswer: 'Auf einem unvollkommenen Markt ist mindestens eine Bedingung des vollkommenen Marktes nicht erfüllt. Beispiele: 1. Keine homogenen Güter – Notebooks unterscheiden sich in Ausstattung, Marke, Garantie und Design. 2. Präferenzen – Kunden kaufen aus Gewohnheit beim bekannten Systemhaus (persönliche Präferenz) oder bevorzugen eine Marke. 3. Fehlende Markttransparenz – nicht jeder Käufer kennt alle Preise aller Händler. 4. Kein Punktmarkt – Angebote gibt es zu verschiedenen Zeiten an verschiedenen Orten. Folge: Für dasselbe Modell existieren unterschiedliche Preise.', keywords: ['nicht homogen', 'Präferenzen', 'Markttransparenz', 'Marke', 'unterschiedliche Preise'], explanation: 'Fast alle realen Märkte sind unvollkommen – das vollkommene Modell dient nur als Vergleichsmaßstab.' },
    { id: 'w06-q016', kind: 'number', skill: 'w.marktformen', difficulty: 1, prompt: 'Ab welchem **Marktanteil** (in %) wird nach § 18 GWB vermutet, dass ein einzelnes Unternehmen marktbeherrschend ist?', answer: 40, unit: '%', misconceptions: [{ answer: '33', error: 'w-gwb-schwelle', why: 'Ein Drittel galt bis 2017. Seit der 9. GWB-Novelle liegt die Vermutungsschwelle bei **40 %**.' }, { answer: '50', error: 'w-gwb-schwelle', why: '50 % ist nicht die Schwelle für ein einzelnes Unternehmen (sie kommt nur bei der Oligopolvermutung für drei oder weniger Unternehmen vor).' }], explanation: '**40 %** (§ 18 Abs. 4 GWB). Das ist eine Vermutung – das Bundeskartellamt prüft den Einzelfall.' },
    { id: 'w06-q017', kind: 'single', skill: 'w.marktformen', difficulty: 2, prompt: 'Welche Aussage über ein **Polypol** ist richtig?', options: ['Ein einzelner Anbieter kann den Marktpreis kaum beeinflussen und muss ihn weitgehend hinnehmen.', 'Der einzige Anbieter legt den Preis allein fest.', 'Wenige Anbieter beobachten sich gegenseitig genau.', 'Es gibt nur einen Nachfrager.'], answer: 0, distractors: { '1': { why: 'Das beschreibt ein **Monopol**.', error: 'w-marktform-verwechselt' }, '2': { why: 'Das beschreibt ein **Oligopol**.', error: 'w-marktform-verwechselt' }, '3': { why: 'Ein einziger Nachfrager wäre ein **Nachfragemonopol**.', error: 'w-marktform-verwechselt' } }, explanation: 'Im Polypol herrscht starker Wettbewerb; jeder Anbieter ist zu klein, um den Preis zu bestimmen („Mengenanpasser“).' },
    { id: 'w06-q018', kind: 'match', skill: 'w.marktformen', difficulty: 2, prompt: 'Ordne die Beispiele der Marktart zu.', left: ['Ein Systemhaus verkauft 20 Server an einen Industriebetrieb', 'Ein Elektronikmarkt verkauft ein Notebook an eine Studentin', 'Ein Unternehmen sucht Fachinformatiker über eine Stellenanzeige', 'Ein Unternehmen nimmt einen Kredit bei der Bank auf'], right: ['B2B-Gütermarkt', 'B2C-Gütermarkt', 'Arbeitsmarkt (Faktormarkt)', 'Kapitalmarkt (Faktormarkt)'], answer: [0, 1, 2, 3], explanation: 'Gütermärkte handeln Waren und Dienstleistungen (B2B zwischen Unternehmen, B2C mit Verbrauchern). Faktormärkte handeln Produktionsfaktoren wie Arbeit und Kapital.' },
    { id: 'w06-q019', kind: 'table', skill: 'w.preisbildung', difficulty: 2, prompt: 'Wie verändern sich **Preis** und gehandelte **Menge**? Antworte jeweils mit **steigt** oder **sinkt**.', columns: [{ key: 'p', label: 'Preis', type: 'text' }, { key: 'm', label: 'Menge', type: 'text' }], rows: [
      { label: 'Wegen der Homeoffice-Pflicht wollen viel mehr Firmen Webcams kaufen.', cells: { p: { answer: 'steigt' }, m: { answer: 'steigt' } } },
      { label: 'Eine wichtige Speicherchip-Fabrik fällt monatelang aus.', cells: { p: { answer: 'steigt' }, m: { answer: 'sinkt' } } },
      { label: 'Drei neue Hersteller bringen günstige WLAN-Router auf den Markt.', cells: { p: { answer: 'sinkt' }, m: { answer: 'steigt' } } },
      { label: 'Ein Betriebssystem läuft aus, die Nachfrage nach passenden Upgrade-Lizenzen bricht ein.', cells: { p: { answer: 'sinkt' }, m: { answer: 'sinkt' } } },
    ], explanation: 'Nachfrage ↑ → Preis ↑, Menge ↑. Angebot ↓ → Preis ↑, Menge ↓. Angebot ↑ → Preis ↓, Menge ↑. Nachfrage ↓ → Preis ↓, Menge ↓.\n\nHäufiger Fehler: bei sinkendem Angebot auch eine steigende Menge erwarten – es wird aber weniger gehandelt, weil weniger da ist.', hints: ['Ändert sich zuerst die Käuferseite (Nachfrage) oder die Anbieterseite (Angebot)?'] },
    { id: 'w06-q020', kind: 'single', skill: 'w.preisbildung', difficulty: 1, prompt: 'Der Preis liegt **über** dem Gleichgewichtspreis. Welche Situation entsteht?', options: ['Angebotsüberhang – Käufermarkt', 'Nachfrageüberhang – Verkäufermarkt', 'Angebotsüberhang – Verkäufermarkt', 'Gleichgewicht'], answer: 0, distractors: { '1': { why: 'Ein Nachfrageüberhang entsteht bei einem Preis **unter** dem Gleichgewichtspreis.', error: 'w-ueberhang-verwechselt' }, '2': { why: 'Bei zu viel Ware haben die **Käufer** die stärkere Position → Käufermarkt.', error: 'w-kaeufer-verkaeufermarkt' }, '3': { why: 'Gleichgewicht herrscht nur beim Gleichgewichtspreis selbst.', error: 'w-ueberhang-verwechselt' } }, explanation: 'Hoher Preis → Anbieter wollen viel verkaufen, Käufer wenig kaufen → **Angebotsüberhang** → die Käufer sind im Vorteil (**Käufermarkt**), die Preise sinken.' },
    { id: 'w06-q021', kind: 'number', skill: 'w.preisbildung', difficulty: 2, prompt: `Markt für Dockingstations (pro Monat):

| Preis | Nachfrage | Angebot |
|---|---|---|
| 120 € | 2.400 | 900 |
| 140 € | 2.000 | 1.300 |
| 160 € | 1.700 | 1.700 |
| 180 € | 1.300 | 2.100 |

Wie viele Stück werden bei einem Preis von **140 €** tatsächlich **verkauft**?`, answer: 1300, unit: 'Stück', misconceptions: [{ answer: '2000', error: 'w-abgesetzte-menge', why: 'So viele würden die Käufer gern kaufen – angeboten werden aber nur 1.300. Gehandelt wird die **kleinere** Menge.' }, { answer: '700', error: 'w-abgesetzte-menge', why: '700 ist der Nachfrageüberhang, nicht die verkaufte Menge.' }, { answer: '1700', error: 'w-abgesetzte-menge', why: '1.700 ist die Gleichgewichtsmenge bei 160 €.' }], explanation: '**Ergebnis: 1.300 Stück**\n\nBei 140 € wollen die Käufer 2.000 Stück, die Anbieter liefern nur 1.300. Mehr als angeboten wird, kann nicht verkauft werden → **1.300 Stück**. Es bleibt ein Nachfrageüberhang von 700 Stück (Verkäufermarkt).\n\nHäufiger Fehler: die Nachfragemenge als Absatz nehmen.' },
    { id: 'w06-q022', kind: 'free', skill: 'w.preisbildung', difficulty: 2, prompt: 'Erläutere die Begriffe **Käufermarkt** und **Verkäufermarkt** und nenne jeweils die Folge für die Beschaffung von IT-Hardware durch die Elektro Krämer GmbH.', modelAnswer: 'Käufermarkt: Das Angebot ist größer als die Nachfrage (Angebotsüberhang). Die Käufer sind in der stärkeren Position, Anbieter konkurrieren um sie, die Preise sinken. Folge für die Beschaffung: gute Verhandlungsposition – mehrere Angebote einholen, Rabatte, bessere Garantie- und Lieferbedingungen aushandeln. Verkäufermarkt: Die Nachfrage ist größer als das Angebot (Nachfrageüberhang), Ware ist knapp, die Verkäufer sind im Vorteil, die Preise steigen. Folge: frühzeitig bestellen, längere Lieferzeiten einplanen, Alternativen (andere Modelle/Hersteller) prüfen, ggf. Rahmenverträge oder Lagerbestand zur Absicherung, im Projektplan Puffer für die Lieferung vorsehen.', keywords: ['Angebotsüberhang', 'Nachfrageüberhang', 'Preise sinken', 'Preise steigen', 'Verhandlungsposition', 'Lieferzeit', 'früh bestellen'], explanation: 'Der Markt ist nach der Seite benannt, die im Vorteil ist.' },
    { id: 'w06-q023', kind: 'number', skill: 'w.marktanteil', difficulty: 1, prompt: 'Im letzten Jahr wurden in Berlin **48.000** Firewall-Lizenzen an Unternehmen verkauft. Das IT-Systemhaus Nord hat **3.600** davon verkauft. Wie hoch ist sein **Marktanteil** in Prozent?', answer: 7.5, tolerance: 0.05, unit: '%', misconceptions: [{ answer: '0.075', error: 'w-prozent-faktor', why: 'Mit 100 multiplizieren.' }, { answer: '1333.33', error: 'w-kennzahl-kehrwert', why: 'Zähler und Nenner vertauscht.' }], explanation: '**Ergebnis: 7,5 %**\n\n3.600 ÷ 48.000 × 100 = **7,5 %**.' },
    { id: 'w06-q024', kind: 'match', skill: 'w.marktanteil', difficulty: 2, prompt: 'Ordne die Begriffe zu.', left: ['Marktpotenzial', 'Marktvolumen', 'Absatzvolumen', 'Marktanteil'], right: ['höchstmögliche Absatzmenge, wenn alle möglichen Kunden kaufen würden', 'tatsächlich von allen Anbietern abgesetzte Menge', 'vom eigenen Unternehmen abgesetzte Menge', 'eigener Absatz im Verhältnis zum Marktvolumen in %'], answer: [0, 1, 2, 3], explanation: 'Potenzial ≥ Volumen ≥ eigener Absatz. Der Marktanteil bezieht den eigenen Absatz auf das **Marktvolumen** (nicht auf das Potenzial).' },
    { id: 'w06-q025', kind: 'number', skill: 'w.marktanteil', difficulty: 2, prompt: 'Der Marktanteil eines Systemhauses steigt von **12 %** auf **15 %**. Um wie viele **Prozentpunkte** ist er gestiegen?', answer: 3, unit: 'Prozentpunkte', misconceptions: [{ answer: '25', error: 'w-prozentpunkte', why: '25 % ist die **relative** Steigerung (3 ÷ 12 × 100). Gefragt sind **Prozentpunkte** = einfache Differenz.' }], explanation: '**Ergebnis: 3 Prozentpunkte**\n\n15 % − 12 % = **3 Prozentpunkte**. Relativ ist der Marktanteil um 25 % gewachsen (3 ÷ 12 × 100) – das ist eine andere Aussage.\n\nHäufiger Fehler: Prozent und Prozentpunkte verwechseln.' },
    { id: 'w06-q026', kind: 'order', skill: 'w.preisbildung', difficulty: 3, prompt: 'Ein Händler verlangt für Grafikkarten einen Preis **unter** dem Gleichgewichtspreis. Bringe die Wirkungskette in die richtige Reihenfolge.', items: ['Die Nachfragemenge ist größer als die Angebotsmenge.', 'Es entsteht ein Nachfrageüberhang (Verkäufermarkt).', 'Nicht alle Käufer bekommen Ware; viele sind bereit, mehr zu zahlen.', 'Die Anbieter erhöhen die Preise.', 'Die Nachfrage sinkt und das Angebot steigt, bis Gleichgewicht herrscht.'], explanation: 'Zu niedriger Preis → Knappheit → Preis steigt → Nachfragemenge sinkt, Angebotsmenge steigt → Gleichgewicht. So „räumt“ der Preismechanismus den Markt.' },
    { id: 'w06-q027', kind: 'table', skill: 'w.abc', difficulty: 2, prompt: `Ein Systemhaus analysiert den Jahresumsatz seiner Kunden (Grenzen: **A** bis einschließlich 70 % kumuliert, **B** bis einschließlich 95 %, **C** darüber).

| Kunde | Umsatz |
|---|---|
| Elektro Krämer GmbH | 180.000 € |
| Praxis Dr. Schulz | 12.000 € |
| Stadtwerke Nord | 95.000 € |
| Bäckerei Hansen | 18.000 € |
| Logistik Weber KG | 60.000 € |
| Kanzlei Berg | 35.000 € |

Ordne jedem Kunden seine Klasse zu.`, columns: [{ key: 'k', label: 'Klasse', type: 'text' }], rows: [
      { label: 'Elektro Krämer GmbH', cells: { k: { answer: 'A' } } },
      { label: 'Praxis Dr. Schulz', cells: { k: { answer: 'C' } } },
      { label: 'Stadtwerke Nord', cells: { k: { answer: 'A' } } },
      { label: 'Bäckerei Hansen', cells: { k: { answer: 'C' } } },
      { label: 'Logistik Weber KG', cells: { k: { answer: 'B' } } },
      { label: 'Kanzlei Berg', cells: { k: { answer: 'B' } } },
    ], hints: ['Gesamtumsatz bilden, nach Umsatz sortieren, Anteile kumulieren.'], explanation: `**Lösung:** A = Krämer, Stadtwerke · B = Weber, Berg · C = Hansen, Schulz

Gesamtumsatz 400.000 €.

| Rang | Kunde | Umsatz | Anteil | kumuliert | Klasse |
|---|---|---|---|---|---|
| 1 | Elektro Krämer GmbH | 180.000 € | 45,00 % | 45,00 % | A |
| 2 | Stadtwerke Nord | 95.000 € | 23,75 % | 68,75 % | A |
| 3 | Logistik Weber KG | 60.000 € | 15,00 % | 83,75 % | B |
| 4 | Kanzlei Berg | 35.000 € | 8,75 % | 92,50 % | B |
| 5 | Bäckerei Hansen | 18.000 € | 4,50 % | 97,00 % | C |
| 6 | Praxis Dr. Schulz | 12.000 € | 3,00 % | 100,00 % | C |

Häufiger Fehler: den Einzelanteil statt des kumulierten Anteils mit der Grenze vergleichen – dann wäre jeder Kunde unter 70 % ein A-Kunde.` },
    { id: 'w06-q028', kind: 'number', skill: 'w.abc', difficulty: 1, prompt: 'Die IT-Abteilung hat im Jahr Material für insgesamt **52.000 €** verbraucht. Davon entfallen **2 Server zu je 6.500 €**. Wie viel **Prozent** des Gesamtwerts machen die Server aus?', answer: 25, tolerance: 0.05, unit: '%', misconceptions: [{ answer: '12.5', error: 'w-abc-menge-statt-wert', why: 'Du hast nur den Preis eines Servers gerechnet. Verbrauchswert = Menge × Preis = 2 × 6.500 € = 13.000 €.' }, { answer: '0.25', error: 'w-prozent-faktor', why: 'Mit 100 multiplizieren.' }], explanation: '**Ergebnis: 25 %**\n\n1. Verbrauchswert = 2 × 6.500 € = 13.000 €\n2. 13.000 € ÷ 52.000 € × 100 = **25 %**\n\nHäufiger Fehler: die Menge vergessen und nur den Stückpreis nehmen.' },
    { id: 'w06-q029', kind: 'multi', skill: 'w.abc', difficulty: 2, prompt: 'Welche Maßnahmen sind für **C-Artikel** (z. B. Patchkabel, Mäuse, Tonerkartuschen) sinnvoll?', options: ['Sammelbestellungen und Rahmenverträge', 'Bestellung über einen Onlinekatalog (E-Procurement)', 'Größere Mengen auf Vorrat halten', 'Für jede Bestellung drei schriftliche Angebote einholen', 'Tägliche Bestandskontrolle mit genauer Bedarfsplanung'], answer: [0, 1, 2], explanation: 'C-Artikel haben wenig Wert – der Bestellaufwand soll klein sein. Aufwendige Angebotsvergleiche und enge Kontrolle lohnen sich nur bei **A-Artikeln**.\n\nHäufiger Fehler: bei allen Artikeln denselben Aufwand treiben – die Bestellkosten können dann höher sein als der Warenwert.' },
    { id: 'w06-q030', kind: 'free', skill: 'w.abc', difficulty: 2, prompt: 'Das IT-Systemhaus hat seine Kunden per ABC-Analyse nach Umsatz eingeteilt. Nenne **je zwei Maßnahmen** für A-Kunden und für C-Kunden und begründe kurz.', modelAnswer: 'A-Kunden (wenige Kunden, großer Umsatzanteil): 1. Fester persönlicher Ansprechpartner (Key-Account-Manager), weil der Verlust eines A-Kunden den Umsatz stark senkt. 2. Bevorzugte Reaktionszeiten bzw. individuelles SLA, regelmäßige Servicegespräche, individuelle Angebote und Rabatte zur Kundenbindung. C-Kunden (viele Kunden, kleiner Umsatzanteil): 1. Standardisierte Betreuung über Hotline, Ticketsystem und Self-Service-Portal, weil individuelle Betreuung zu teuer wäre. 2. Standardangebote und Pakete, Webshop; prüfen, ob sich C-Kunden durch gezielte Angebote zu B-Kunden entwickeln lassen.', keywords: ['Ansprechpartner', 'Key Account', 'Kundenbindung', 'SLA', 'standardisiert', 'Hotline', 'Webshop', 'Kosten'], explanation: 'Der Betreuungsaufwand richtet sich nach der wirtschaftlichen Bedeutung des Kunden.' },
    { id: 'w06-q031', kind: 'order', skill: 'w.abc', difficulty: 1, prompt: 'Bringe die Schritte der ABC-Analyse in die richtige Reihenfolge.', items: ['Verbrauchswert je Artikel berechnen (Menge × Preis)', 'Artikel nach Verbrauchswert absteigend sortieren', 'Wertanteil jedes Artikels in % berechnen', 'Wertanteile kumulieren', 'Artikel anhand der Grenzen in A, B und C einteilen'], explanation: 'Wert → sortieren → Anteil → kumulieren → einteilen. Ohne Sortierung ergibt die Kumulation keinen Sinn.' },
    { id: 'w06-q032', kind: 'single', skill: 'w.abc', difficulty: 2, prompt: 'Grenzen: A bis 80 %, B bis 95 %. Ein Artikel steht auf Rang 2, hat einen **Einzelanteil von 12 %** und einen **kumulierten Anteil von 83 %**. In welche Klasse gehört er?', options: ['B', 'A', 'C', 'Das lässt sich ohne Stückzahl nicht sagen'], answer: 0, distractors: { '1': { why: 'Verglichen wird der **kumulierte** Anteil (83 %), nicht der Einzelanteil (12 %). 83 % liegt über der A-Grenze.', error: 'w-abc-einzel-statt-kumuliert' }, '2': { why: '83 % liegt unter der B-Grenze von 95 % – also B, nicht C.', error: 'w-abc-einzel-statt-kumuliert' }, '3': { why: 'Die Stückzahl spielt für die Einteilung keine Rolle mehr, wenn der kumulierte Wertanteil bekannt ist.', error: 'w-abc-menge-statt-wert' } }, explanation: '83 % kumuliert liegt über 80 % und höchstens bei 95 % → **B**.' },
    { id: 'w06-q033', kind: 'table', skill: 'w.abc', difficulty: 2, prompt: `Ergänze die Spalten **Anteil** und **kumuliert** (in %). Die Artikel sind bereits nach Verbrauchswert sortiert, der Gesamtwert beträgt 20.000 €.

| Rang | Artikel | Verbrauchswert |
|---|---|---|
| 1 | Notebooks | 12.000 € |
| 2 | Monitore | 6.000 € |
| 3 | Headsets | 1.500 € |
| 4 | Kabel | 500 € |`, columns: [{ key: 'a', label: 'Anteil in %', type: 'number' }, { key: 'k', label: 'kumuliert in %', type: 'number' }], rows: [
      { label: 'Notebooks', cells: { a: { answer: '60' }, k: { answer: '60' } } },
      { label: 'Monitore', cells: { a: { answer: '30' }, k: { answer: '90' } } },
      { label: 'Headsets', cells: { a: { answer: '7.5', accept: ['7,5', '7,50'] }, k: { answer: '97.5', accept: ['97,5', '97,50'] } } },
      { label: 'Kabel', cells: { a: { answer: '2.5', accept: ['2,5', '2,50'] }, k: { answer: '100' } } },
    ], explanation: '**Lösung:** Anteile 60 / 30 / 7,5 / 2,5 % – kumuliert 60 / 90 / 97,5 / 100 %.\n\nAnteil = Verbrauchswert ÷ 20.000 € × 100; kumuliert = Summe aller Anteile bis zu dieser Zeile. Die letzte Zeile muss immer 100 % ergeben – gute Selbstkontrolle.\n\nHäufiger Fehler: in der kumulierten Spalte den Einzelanteil wiederholen.' },
    { id: 'w06-q034', kind: 'number', skill: 'w.marktanteil', difficulty: 2, prompt: 'Das **Marktpotenzial** für Firewall-Appliances bei Handwerksbetrieben in Hamburg wird auf **50.000** Stück geschätzt, das **Marktvolumen** beträgt **40.000** Stück. Berechne den **Sättigungsgrad** des Marktes in Prozent.', answer: 80, tolerance: 0.05, unit: '%', misconceptions: [{ answer: '125', error: 'w-kennzahl-kehrwert', why: 'Zähler und Nenner vertauscht: Sättigungsgrad = Marktvolumen ÷ Marktpotenzial × 100.' }, { answer: '20', error: 'w-saettigung-rest', why: '20 % ist der noch **nicht** ausgeschöpfte Teil des Marktes. Gefragt ist der Sättigungsgrad.' }], explanation: '**Ergebnis: 80 %**\n\n40.000 ÷ 50.000 × 100 = **80 %**. Der Markt ist zu 80 % ausgeschöpft; Wachstum ist vor allem durch Verdrängung von Wettbewerbern möglich.\n\nHäufiger Fehler: Marktpotenzial und Marktvolumen vertauschen.' },
  ],
};
