import type { Module } from '../types';

export const w04: Module = {
  id: 'w04',
  nr: 4,
  area: 'wirtschaft',
  title: 'Verträge & Recht',
  short: 'Kaufvertrag, Mängel und Verzug, Gewährleistung und Garantie, Werk- und Dienstvertrag, Softwarelizenzen und Service Level Agreements.',
  icon: 'Gavel',
  relevance: 'ap1-teilweise',
  prerequisites: ['w02'],
  generators: ['w.sla'],
  skills: [
    { id: 'w.kaufvertrag', module: 'w04', title: 'Kaufvertrag: Zustandekommen und Pflichten', requires: ['w.angebot'] },
    { id: 'w.maengel', module: 'w04', title: 'Mangelhafte Lieferung und Rechte des Käufers', requires: ['w.kaufvertrag'] },
    { id: 'w.verzug', module: 'w04', title: 'Lieferverzug, Annahmeverzug, Zahlungsverzug', requires: ['w.kaufvertrag'] },
    { id: 'w.garantie', module: 'w04', title: 'Gewährleistung, Garantie und Kulanz', requires: ['w.maengel'] },
    { id: 'w.vertragsarten', module: 'w04', title: 'Vertragsarten für IT-Leistungen (Werk-, Dienst-, Miet-, Leasingvertrag)' },
    { id: 'w.lizenzen', module: 'w04', title: 'Urheberrecht und Softwarelizenzen' },
    { id: 'w.sla', module: 'w04', title: 'Service Level Agreements (SLA)', requires: ['w.vertragsarten'] },
    { id: 'w.wareneingang', module: 'w04', title: 'Wareneingangsprüfung und Mängelrüge', requires: ['w.maengel'] },
    { id: 'w.avvertrag', module: 'w04', title: 'OLA/UC, Auftragsverarbeitungsvertrag und Vertragsstrafe', requires: ['w.sla'] },
  ],
  lessons: [
    /* ------------------------------------------------------------ */
    {
      id: 'w04-l01',
      title: 'Der Kaufvertrag: Zustandekommen und Pflichten',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['w.kaufvertrag'],
      simple: `Ein Kaufvertrag entsteht, wenn zwei Seiten dasselbe wollen und es sich sagen – wie beim Bäcker: Du sagst „Ein Brötchen bitte“, die Verkäuferin gibt es dir. Juristisch heißt das **Antrag** und **Annahme** (zwei passende Willenserklärungen, also Aussagen, mit denen man sich binden will). Danach hat jede Seite **Pflichten**: Der Verkäufer muss die Ware ohne Fehler übergeben und sie dir als Eigentum überlassen, du musst bezahlen und die Ware abnehmen. **Besitz** heißt, du hast die Sache gerade in der Hand; **Eigentum** heißt, sie gehört dir rechtlich.

**Merke:** Antrag + Annahme = Kaufvertrag; Verkäufer liefert mangelfrei und übereignet, Käufer zahlt und nimmt ab.`,
      steps: [
        {
          type: 'explain',
          title: 'Zwei übereinstimmende Willenserklärungen',
          body: `*Hinweis: Dieses Modul vermittelt Grundbegriffe für Ausbildung und Prüfung – es ist keine Rechtsberatung.*

Ein Vertrag entsteht durch **zwei übereinstimmende Willenserklärungen**: **Antrag** und **Annahme** (§§ 145 ff. BGB). Für den Kaufvertrag gibt es zwei typische Wege:

| Weg | 1. Willenserklärung (Antrag) | 2. Willenserklärung (Annahme) |
|---|---|---|
| A | verbindliches **Angebot** des Verkäufers | rechtzeitige, unveränderte **Bestellung** des Käufers |
| B | **Bestellung** des Käufers (ohne vorheriges oder nach freibleibendem Angebot, z. B. im Onlineshop) | **Auftragsbestätigung** oder **Lieferung** des Verkäufers |

Kaufverträge sind grundsätzlich **formfrei** (mündlich, telefonisch, per E-Mail, durch schlüssiges Handeln). Schriftform ist aber zur Beweissicherung sinnvoll.

**Geschäftsfähigkeit:** Kinder unter 7 Jahren sind geschäftsunfähig (§ 104 BGB). Minderjährige von 7 bis 17 Jahren sind **beschränkt geschäftsfähig** (§ 106): Ihre Verträge sind bis zur Genehmigung der Eltern **schwebend unwirksam** (§ 108) – außer bei rein rechtlichem Vorteil (§ 107) oder wenn sie mit ihrem Taschengeld bezahlen (§ 110, „Taschengeldparagraf“).

**Pflichten aus dem Kaufvertrag (§ 433 BGB):**

| Verkäufer | Käufer |
|---|---|
| Sache **übergeben** und **Eigentum verschaffen** | **Kaufpreis zahlen** |
| Sache **frei von Sach- und Rechtsmängeln** liefern | Sache **abnehmen** |

**Verpflichtungs- und Erfüllungsgeschäft:** Der Kaufvertrag begründet nur Pflichten (Verpflichtungsgeschäft). Erfüllt werden sie durch Übergabe und Einigung über den Eigentumsübergang (§ 929 BGB) bzw. durch Zahlung (Erfüllungsgeschäft).

**Besitz ≠ Eigentum:** Besitzer ist, wer die tatsächliche Herrschaft über eine Sache hat (z. B. Mieter eines Notebooks). Eigentümer ist, wem die Sache rechtlich gehört. Häufig in Lieferbedingungen: **Eigentumsvorbehalt** (§ 449 BGB) – die Ware bleibt bis zur vollständigen Bezahlung Eigentum des Verkäufers.`,
        },
        {
          type: 'visual',
          title: 'Zwei Wege zum Kaufvertrag',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['Käufer (Elektro Krämer GmbH)', 'Verkäufer (Systemhaus)'],
              messages: [
                { from: 0, to: 1, label: 'Anfrage', note: 'unverbindlich' },
                { from: 1, to: 0, label: 'Angebot (verbindlich) = Antrag' },
                { from: 0, to: 1, label: 'Bestellung = Annahme', note: '→ Kaufvertrag (Weg A)' },
                { from: 0, to: 1, label: 'Bestellung aus Onlineshop = Antrag' },
                { from: 1, to: 0, label: 'Auftragsbestätigung = Annahme', note: '→ Kaufvertrag (Weg B)' },
              ],
            },
          },
          caption: 'Entscheidend ist, welche Erklärung der verbindliche Antrag ist – die nächste passende Erklärung nimmt ihn an.',
        },
        {
          type: 'example',
          title: 'Ist ein Vertrag zustande gekommen?',
          problem: 'Die Elektro Krämer GmbH bestellt im Onlineshop eines Händlers 5 Dockingstations. Sie erhält sofort eine automatische E-Mail: „Vielen Dank für Ihre Bestellung. Wir prüfen die Verfügbarkeit.“ Zwei Tage später kommt eine „Auftragsbestätigung“. Wann ist der Kaufvertrag zustande gekommen?',
          steps: [
            { label: 'Onlineshop-Seite', body: 'Die Produktseite ist eine **Anpreisung**, kein Angebot.' },
            { label: 'Bestellung', body: 'Die Bestellung ist der **Antrag** des Käufers.' },
            { label: 'Automatische E-Mail', body: 'Sie bestätigt nur den **Eingang** der Bestellung („wir prüfen“) – das ist noch keine Annahme.' },
            { label: 'Auftragsbestätigung', body: 'Sie ist die **Annahme** → der Kaufvertrag entsteht mit ihrem Zugang.' },
          ],
          result: 'Der Kaufvertrag kommt mit der **Auftragsbestätigung** zustande, nicht schon mit der Eingangsbestätigung.',
        },
        {
          type: 'check',
          question: {
            id: 'w04-c01', kind: 'match', skill: 'w.kaufvertrag', difficulty: 1,
            prompt: 'Ordne die Pflichten aus dem Kaufvertrag (§ 433 BGB) zu.',
            left: ['Kaufpreis zahlen', 'Eigentum verschaffen', 'Ware abnehmen', 'Ware frei von Mängeln übergeben'],
            right: ['Käufer', 'Verkäufer'],
            answer: [0, 1, 0, 1],
            explanation: 'Verkäufer: übergeben, Eigentum verschaffen, mangelfrei liefern. Käufer: zahlen und abnehmen.',
          },
        },
        { type: 'practice', title: 'Übung: Kaufvertrag', questionIds: ['w04-q001', 'w04-q002', 'w04-q003', 'w04-q004'], count: 4, difficulty: 2 },
        { type: 'summary', points: ['Vertrag = Antrag + Annahme (zwei übereinstimmende Willenserklärungen).', 'Angebot + Bestellung oder Bestellung + Auftragsbestätigung.', 'Pflichten § 433 BGB: Verkäufer übergibt mangelfrei und verschafft Eigentum; Käufer zahlt und nimmt ab.', 'Besitz = tatsächliche Herrschaft; Eigentum = rechtliche Zugehörigkeit.', 'Minderjährige 7–17: beschränkt geschäftsfähig.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'w04-l02',
      title: 'Mangelhafte Lieferung: Rechte des Käufers',
      minutes: 30,
      relevance: 'ap1-teilweise',
      skills: ['w.maengel', 'w.wareneingang'],
      simple: `Wenn du online Schuhe bestellst und ein Schuh hat ein Loch, ist die Ware **mangelhaft** (fehlerhaft). Du darfst dann zuerst verlangen, dass der Händler den Fehler behebt oder dir ein neues Paar schickt – das heißt **Nacherfüllung**. Erst wenn das nicht klappt, kannst du dein Geld zurückverlangen (**Rücktritt**) oder weniger bezahlen (**Minderung**). Firmen müssen gelieferte Ware **sofort prüfen** – wie du beim Auspacken – und Fehler sofort schriftlich melden (**Mängelrüge**), sonst verlieren sie ihre Rechte.

**Merke:** Wareneingang sofort prüfen, Mangel sofort rügen, zuerst Nacherfüllung verlangen, erst danach Rücktritt oder Minderung.`,
      steps: [
        {
          type: 'explain',
          title: 'Wenn die Ware nicht in Ordnung ist',
          body: `**Sachmangel (§ 434 BGB, Fassung seit 2022):** Die Sache muss den **subjektiven Anforderungen** (vereinbarte Beschaffenheit – dazu zählen ausdrücklich Art, **Menge**, Qualität, Funktionalität, **Kompatibilität**, Interoperabilität), den **objektiven Anforderungen** (übliche Beschaffenheit, Eignung für die gewöhnliche Verwendung) und den **Montageanforderungen** entsprechen. Auch die Lieferung einer **anderen Sache** steht einem Sachmangel gleich.

| Mangelart | IT-Beispiel |
|---|---|
| Beschaffenheit / Qualität | Notebook-Display mit Pixelfehlern über der zugesicherten Toleranz, Akku hält 2 statt 8 Stunden |
| Falsche Ware | statt 32 GB RAM nur 16 GB geliefert; anderes Monitormodell |
| Mindermenge | 10 bestellt, 8 geliefert |
| Fehlende Kompatibilität | zugesagte Dockingstation funktioniert nicht mit dem Notebook |
| Montagefehler / mangelhafte Anleitung | Verkäufer montiert Serverschrank fehlerhaft; Montageanleitung unbrauchbar |
| **Rechtsmangel** (§ 435) | Software ohne gültige Lizenz, gestohlene Hardware |

**Nach Erkennbarkeit:** **offener** Mangel (sofort sichtbar), **versteckter** Mangel (zeigt sich später), **arglistig verschwiegener** Mangel (Verkäufer kannte ihn und verschwieg ihn).

**Fristen:**
- **Zweiseitiger Handelskauf** (beide Kaufleute, z. B. GmbH kauft beim Systemhaus): Ware **unverzüglich** untersuchen und Mängel **unverzüglich** rügen; versteckte Mängel unverzüglich nach Entdeckung (§ 377 HGB). Sonst gilt die Ware als genehmigt!
- **Verjährung** der Mängelansprüche: **2 Jahre ab Ablieferung** (§ 438 Abs. 1 Nr. 3 BGB); bei Arglist gilt die regelmäßige Verjährung von 3 Jahren (§ 438 Abs. 3, § 195).
- **Verbrauchsgüterkauf** (Unternehmer verkauft an Verbraucher): Zeigt sich ein Mangel **innerhalb eines Jahres** nach Übergabe, wird vermutet, dass er schon bei Übergabe vorlag (**Beweislastumkehr**, § 477 BGB).

**Rechte des Käufers (§ 437 BGB) – in dieser Reihenfolge:**

1. **Vorrangig: Nacherfüllung** (§ 439) – der **Käufer wählt** zwischen **Nachbesserung** (Reparatur) und **Ersatzlieferung** (neue Sache). Kosten (Transport, Arbeit, Material) trägt der Verkäufer. Er darf die gewählte Art nur bei unverhältnismäßigen Kosten verweigern.
2. **Nachrangig** – erst wenn eine angemessene **Frist zur Nacherfüllung** erfolglos abgelaufen ist, die Nacherfüllung verweigert wurde oder **fehlgeschlagen** ist (Nachbesserung gilt in der Regel nach dem **zweiten erfolglosen Versuch** als fehlgeschlagen, § 440):
   - **Rücktritt** vom Vertrag (Geld zurück gegen Rückgabe) – nicht bei unerheblichem Mangel (§ 323 Abs. 5),
   - **oder Minderung** des Kaufpreises (§ 441),
   - **zusätzlich**: **Schadensersatz** (setzt Verschulden des Verkäufers voraus, §§ 280 ff.) oder Ersatz vergeblicher Aufwendungen (§ 284).

*Verbraucher (§ 475d BGB):* Hier genügt es, dem Unternehmer den Mangel mitzuteilen; nach Ablauf einer angemessenen Frist sind Rücktritt bzw. Minderung auch ohne ausdrückliche Fristsetzung möglich.`,
        },
        {
          type: 'explain',
          title: 'Wareneingangsprüfung und Mängelrüge in der Praxis',
          body: `Damit die Rechte aus § 377 HGB nicht verloren gehen, braucht jedes Unternehmen einen festen Ablauf beim **Wareneingang**.

**1. Sofort bei Anlieferung (im Beisein des Fahrers)**
- Stimmen **Anschrift** und **Anzahl der Packstücke** mit dem Lieferschein überein?
- Sind **Verpackungen beschädigt** (eingedrückt, nass, Siegel geöffnet)?
- Beschädigungen auf dem Frachtbrief/Lieferschein **vermerken** und vom Fahrer **gegenzeichnen** lassen, Fotos machen. Bei schweren Schäden die Annahme verweigern.

**2. Unverzüglich danach (in der Regel am selben oder nächsten Arbeitstag)**
- **Lieferschein mit Bestellung vergleichen:** Artikel, Modell, Menge, Ausstattung.
- **Ware auspacken und prüfen:** Sichtprüfung, Funktionstest (Stichprobe bei großen Mengen), Seriennummern erfassen.
- Ergebnis im **Wareneingangsprotokoll** festhalten.

**Mangelarten beim Wareneingang**

| Mangelart | Beispiel |
|---|---|
| **Mangel in der Art** (Falschlieferung) | 24-Zoll- statt 27-Zoll-Monitore geliefert |
| **Mangel in der Menge** | 20 bestellt, 18 geliefert |
| **Mangel in der Güte/Qualität** (Beschaffenheit) | Display mit Streifen, Gehäuse zerkratzt, Akku defekt |

**Inhalt einer Mängelrüge (schriftlich, z. B. per E-Mail oder Brief)**
1. Bezug: Bestell-, Lieferschein- bzw. Rechnungsnummer und Lieferdatum
2. **genaue Beschreibung** des Mangels (welcher Artikel, welche Seriennummern, was genau ist defekt, wie viele Stück)
3. Nachweis, falls vorhanden (Fotos, Protokoll)
4. **gewünschtes Recht**: Nacherfüllung – Nachbesserung oder Ersatzlieferung
5. **angemessene Frist** (z. B. 10 Tage)
6. Hinweis, wie mit der mangelhaften Ware verfahren wird (Abholung, Rücksendung auf Kosten des Lieferanten)

Die Mängelrüge ist ein **Geschäftsbrief** – Form nach DIN 5008, sachlicher Ton (siehe Modul w01).`,
        },
        {
          type: 'visual',
          title: 'Stufenmodell der Mängelrechte',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: '1. Nacherfüllung', text: 'Käufer wählt: Reparatur oder neue Sache. Verkäufer trägt alle Kosten. Immer zuerst!', icon: 'Wrench' },
                { title: '2. Rücktritt oder Minderung', text: 'Erst nach erfolgloser Frist / Fehlschlagen (i. d. R. 2 Versuche). Rücktritt nicht bei Bagatellmangel.', icon: 'Undo2' },
                { title: '+ Schadensersatz', text: 'Zusätzlich möglich, wenn der Verkäufer den Mangel zu vertreten hat (Verschulden).', icon: 'Coins' },
              ],
            },
          },
          caption: 'Der Verkäufer bekommt immer zuerst eine „zweite Chance“.',
        },
        {
          type: 'example',
          title: 'Defekte Monitore in der Lieferung',
          problem: 'Die Elektro Krämer GmbH erhält am Montag 20 Monitore vom Systemhaus Nord. Bei der Eingangsprüfung am selben Tag zeigen zwei Monitore Streifen im Bild. Was ist zu tun, und welche Rechte bestehen?',
          steps: [
            { label: 'Art des Kaufs', body: 'Beide Parteien sind Kaufleute → **zweiseitiger Handelskauf** → § 377 HGB.' },
            { label: 'Rüge', body: 'Mangel **unverzüglich** schriftlich rügen (z. B. noch am selben Tag per E-Mail): Lieferschein-/Bestellnummer, betroffene Seriennummern, genaue Beschreibung („Streifen im Bild bei allen Eingängen“), Fotos.' },
            { label: 'Recht wählen', body: 'Vorrangig **Nacherfüllung** verlangen – sinnvoll ist hier **Ersatzlieferung** von zwei neuen Monitoren (Reparatur würde länger dauern). Frist setzen, z. B. 10 Tage.' },
            { label: 'Wenn das scheitert', body: 'Liefert der Verkäufer nicht innerhalb der Frist oder sind auch die Ersatzgeräte defekt: **Rücktritt** (für die zwei Monitore) oder **Minderung**; zusätzlich Schadensersatz, falls z. B. Ersatzgeräte teurer beschafft werden müssen und der Verkäufer den Mangel zu vertreten hat.' },
          ],
          result: 'Unverzüglich rügen, zuerst Nacherfüllung (hier Ersatzlieferung) mit Frist verlangen, danach Rücktritt/Minderung und ggf. Schadensersatz.',
        },
        {
          type: 'check',
          question: {
            id: 'w04-c02', kind: 'order', skill: 'w.maengel', difficulty: 2,
            prompt: 'Bringe das Vorgehen bei einer mangelhaften Lieferung (zweiseitiger Handelskauf) in die richtige Reihenfolge.',
            items: ['Ware unverzüglich untersuchen', 'Mangel unverzüglich rügen', 'Nacherfüllung verlangen und angemessene Frist setzen', 'Nach erfolglosem Fristablauf Rücktritt oder Minderung erklären'],
            explanation: 'Untersuchen und rügen (§ 377 HGB) → Nacherfüllung mit Frist (§ 439 BGB) → nachrangige Rechte.',
          },
        },
        {
          type: 'example',
          title: 'Belegaufgabe: Lieferschein gegen Bestellung prüfen',
          problem: `Die Elektro Krämer GmbH hat beim IT-Systemhaus Nord bestellt (Bestellung B-4471 vom 02.11.2026). Am 09.11.2026 trifft die Lieferung ein.

| Pos. | Bestellt | Menge bestellt | Geliefert laut Lieferschein L-9930 | Menge geliefert | Prüfergebnis |
|---|---|---|---|---|---|
| 1 | Notebook 14 Zoll, 16 GB RAM | 10 | Notebook 14 Zoll, 16 GB RAM | 10 | 1 Gerät: Tastatur ohne Funktion |
| 2 | Monitor 27 Zoll | 12 | Monitor 24 Zoll | 12 | Geräte unbeschädigt |
| 3 | Dockingstation USB-C | 10 | Dockingstation USB-C | 8 | unbeschädigt |

Ermittle die Mängel und formuliere die Kernpunkte der Mängelrüge.`,
          steps: [
            { label: 'Pos. 1', body: 'Ein Notebook mit defekter Tastatur → **Mangel in der Güte/Qualität**.' },
            { label: 'Pos. 2', body: '24 statt 27 Zoll → **Mangel in der Art** (Falschlieferung).' },
            { label: 'Pos. 3', body: '8 statt 10 Stück → **Mangel in der Menge** (2 Stück fehlen).' },
            { label: 'Mängelrüge (Kernpunkte)', body: 'Betreff: Mängelrüge zu Lieferschein L-9930 / Bestellung B-4471. Inhalt: Pos. 1 – Notebook Seriennummer … Tastatur ohne Funktion → Ersatzlieferung; Pos. 2 – 12 Monitore 24 statt 27 Zoll → Lieferung der bestellten 27-Zoll-Monitore, Abholung der Falschlieferung auf Ihre Kosten; Pos. 3 – 2 fehlende Dockingstations nachliefern. Frist: bis 19.11.2026. Versand noch am 09.11.2026.' },
          ],
          result: 'Drei Mängel: Qualität (Pos. 1), Art (Pos. 2), Menge (Pos. 3). Die Rüge geht **unverzüglich** raus, nennt Bezug, Mangel, gewünschte Nacherfüllung und eine Frist.',
        },
        {
          type: 'check',
          question: {
            id: 'w04-c08', kind: 'table', skill: 'w.wareneingang', difficulty: 2,
            prompt: 'Bestimme die **Mangelart**: **Art**, **Menge** oder **Qualität**.',
            columns: [{ key: 'm', label: 'Mangelart', type: 'text' }],
            rows: [
              { label: '50 Patchkabel bestellt, 40 geliefert', cells: { m: { answer: 'Menge', accept: ['mangel in der menge', 'mindermenge', 'quantität'] } } },
              { label: 'Statt Switches mit PoE wurden Switches ohne PoE geliefert', cells: { m: { answer: 'Art', accept: ['mangel in der art', 'falschlieferung', 'aliud'] } } },
              { label: 'Ein Access Point startet nicht', cells: { m: { answer: 'Qualität', accept: ['qualitaet', 'güte', 'guete', 'beschaffenheit', 'mangel in der güte', 'mangel in der qualität'] } } },
            ],
            explanation: 'Zu wenig → Menge; anderes Produkt → Art; richtiges Produkt, aber fehlerhaft → Qualität (Güte).\n\nHäufiger Fehler: Falschlieferung als Qualitätsmangel einordnen – das Gerät kann einwandfrei sein, es ist nur das falsche.',
          },
        },
        { type: 'practice', title: 'Übung: Mängelrechte', questionIds: ['w04-q005', 'w04-q006', 'w04-q007', 'w04-q008', 'w04-q009', 'w04-q010'], count: 5, difficulty: 2 },
        { type: 'practice', title: 'Übung: Wareneingang und Mängelrüge', questionIds: ['w04-q033', 'w04-q034', 'w04-q035', 'w04-q036'], count: 3, difficulty: 2 },
        { type: 'summary', points: ['Sachmangel: vereinbarte/übliche Beschaffenheit fehlt – auch Falschlieferung, Mindermenge, fehlende Kompatibilität, Montagefehler.', 'Rechtsmangel: Rechte Dritter (z. B. fehlende Lizenz).', 'Kaufleute: unverzüglich prüfen und rügen (§ 377 HGB).', 'Zuerst Nacherfüllung (Käufer wählt Reparatur oder Ersatz), dann Rücktritt oder Minderung, zusätzlich Schadensersatz bei Verschulden.', 'Verjährung 2 Jahre ab Ablieferung; Beweislastumkehr beim Verbraucher 1 Jahr.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'w04-l03',
      title: 'Lieferverzug, Annahmeverzug, Zahlungsverzug',
      minutes: 25,
      relevance: 'vertiefung',
      skills: ['w.verzug'],
      simple: `**Verzug** heißt: Jemand ist zu spät, obwohl er schon hätte liefern oder zahlen müssen. Das kennst du vom geliehenen Geld: Ein Freund wollte es dir bis Freitag zurückgeben und tut es nicht. Ist der **Verkäufer** zu spät, ist das **Lieferverzug**; nimmt der **Käufer** die Ware nicht an, **Annahmeverzug**; zahlt er nicht, **Zahlungsverzug**. Meist muss man den anderen erst erinnern (**Mahnung**) und ihm eine zweite Chance (**Nachfrist**) geben, bevor man vom Vertrag zurücktreten kann. Bei Zahlungsverzug kommen **Verzugszinsen** dazu – eine Art Strafe fürs Zuspätzahlen.

**Merke:** Fällig + gemahnt (oder fester Termin) = Verzug; erst Nachfrist, dann Rücktritt oder Schadensersatz; bei Zahlungsverzug Zinsen.`,
      steps: [
        {
          type: 'explain',
          title: 'Wenn jemand zu spät ist',
          body: `| | **Lieferverzug** (Verkäufer liefert nicht rechtzeitig) | **Annahmeverzug** (Käufer nimmt Ware nicht an) | **Zahlungsverzug** (Käufer zahlt nicht rechtzeitig) |
|---|---|---|---|
| Voraussetzungen | Fälligkeit, **Mahnung** (entbehrlich bei kalendermäßig bestimmtem Termin, z. B. „Lieferung am 15.05.“), **Verschulden** des Verkäufers (§ 286) | Ware wurde ordnungsgemäß (richtige Zeit, richtiger Ort, mangelfrei) angeboten und nicht angenommen – **ohne** Verschulden (§§ 293 ff.) | Fälligkeit und Mahnung – **oder** Termin kalendermäßig bestimmt – **oder automatisch 30 Tage** nach Fälligkeit und Zugang der Rechnung (§ 286 Abs. 3; bei Verbrauchern nur, wenn die Rechnung darauf hinweist) |
| Rechte | **Ohne Nachfrist:** auf Lieferung bestehen + Ersatz des Verzögerungsschadens. **Nach erfolgloser angemessener Nachfrist:** Rücktritt (verschuldensunabhängig, § 323) und/oder Schadensersatz statt der Leistung (§ 281). Beim **Fixkauf** ist die Nachfrist entbehrlich. | Ware auf Kosten des Käufers einlagern bzw. hinterlegen, **Selbsthilfeverkauf** nach Androhung (§ 383 BGB, § 373 HGB), auf Abnahme klagen, Mehraufwendungen ersetzt verlangen (§ 304); Verkäufer haftet nur noch für Vorsatz und grobe Fahrlässigkeit (§ 300) | Zahlung + **Verzugszinsen** (§ 288): **5 Prozentpunkte** über dem Basiszinssatz (Verbraucher beteiligt) bzw. **9 Prozentpunkte** (nur Unternehmen); im B2B zusätzlich **40 € Pauschale** (§ 288 Abs. 5); weiterer Schaden (z. B. Mahnkosten); nach Fristsetzung Rücktritt möglich |

**Verzugszinsen berechnen:** Zinsen = Betrag × Zinssatz × Tage ÷ 365. Der **Basiszinssatz** wird halbjährlich (1. Januar und 1. Juli) von der Deutschen Bundesbank veröffentlicht – in Aufgaben wird er immer angegeben.

**Mahnverfahren:** Zuerst **außergerichtlich** (Zahlungserinnerung, Mahnungen). Danach **gerichtliches Mahnverfahren**: Antrag auf **Mahnbescheid** beim zuständigen Amtsgericht (Mahngericht) → Schuldner kann innerhalb von 2 Wochen **Widerspruch** einlegen → sonst **Vollstreckungsbescheid** → Einspruch innerhalb von 2 Wochen möglich → sonst **Zwangsvollstreckung**.

**Für IT-Projekte wichtig:** Verzögert sich die Lieferung von Hardware, kann sich ein ganzes Rollout verschieben. Deshalb Liefertermine **kalendermäßig** vereinbaren („spätestens 15.05.“) – dann ist keine Mahnung nötig.`,
        },
        {
          type: 'example',
          title: 'Verzugszinsen im B2B-Geschäft',
          problem: 'Das IT-Systemhaus hat der Elektro Krämer GmbH eine Rechnung über **11.900,00 €** gestellt. Die Kundin gerät in Zahlungsverzug und zahlt **45 Tage** zu spät. Angenommener Basiszinssatz: **2,27 %**. Wie hoch sind die gesetzlichen Verzugszinsen? (365 Tage, auf Cent runden)',
          steps: [
            { label: 'Zinssatz', body: 'Beide sind Unternehmen → Basiszinssatz + **9 Prozentpunkte** = 2,27 % + 9 % = **11,27 %**' },
            { label: 'Zinsen', body: '11.900,00 € × 11,27 % × 45 ÷ 365 = 165,3448… ≈ **165,34 €**' },
            { label: 'Zusätzlich', body: 'Pauschale von **40 €** nach § 288 Abs. 5 BGB (wird auf einen späteren Schadensersatz für Rechtsverfolgungskosten angerechnet).' },
          ],
          result: 'Verzugszinsen **165,34 €**, zusätzlich 40 € Pauschale.',
        },
        {
          type: 'check',
          question: {
            id: 'w04-c03', kind: 'single', skill: 'w.verzug', difficulty: 2,
            prompt: 'Im Kaufvertrag steht „Lieferung **spätestens am 15.05.**“. Der Lieferant liefert am 15.05. nicht. Wann ist er (Verschulden vorausgesetzt) in Lieferverzug?',
            options: ['Erst nach einer Mahnung', 'Ab dem 16.05. ohne Mahnung, weil der Termin kalendermäßig bestimmt ist', 'Erst 30 Tage nach dem Termin', 'Nie – Lieferverzug gibt es nur bei Fixgeschäften'],
            answer: 1,
            distractors: {
              '0': { why: 'Bei einem kalendermäßig bestimmten Termin ist die Mahnung entbehrlich (§ 286 Abs. 2 Nr. 1 BGB).', error: 'w-verzug-mahnung' },
              '2': { why: 'Die 30-Tage-Regel gilt für Geldforderungen (Zahlungsverzug), nicht für die Lieferung.', error: 'w-verzug-30tage' },
              '3': { why: 'Lieferverzug ist bei jedem Kaufvertrag möglich; beim Fixgeschäft ist nur die Nachfrist für den Rücktritt entbehrlich.', error: 'w-verzug-fix' },
            },
            explanation: 'Kalendermäßig bestimmter Termin → Verzug ohne Mahnung ab dem Folgetag (Verschulden vorausgesetzt).',
          },
        },
        { type: 'practice', title: 'Übung: Verzugsarten', questionIds: ['w04-q011', 'w04-q012', 'w04-q013', 'w04-q014'], count: 4, difficulty: 2 },
        { type: 'summary', points: ['Lieferverzug: Fälligkeit + Mahnung (oder fester Termin) + Verschulden.', 'Rücktritt/Schadensersatz statt Leistung erst nach erfolgloser Nachfrist (außer Fixkauf).', 'Annahmeverzug: kein Verschulden nötig; Einlagerung, Selbsthilfeverkauf, Haftungserleichterung.', 'Zahlungsverzug: spätestens 30 Tage nach Fälligkeit und Rechnung; Zinsen 5 bzw. 9 Prozentpunkte über Basiszins, B2B + 40 €.', 'Gerichtliches Mahnverfahren: Mahnbescheid → Vollstreckungsbescheid → Zwangsvollstreckung.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'w04-l04',
      title: 'Gewährleistung, Garantie und Kulanz',
      minutes: 15,
      relevance: 'ap1-teilweise',
      skills: ['w.garantie'],
      simple: `Drei Wörter, die oft verwechselt werden: Die **Gewährleistung** ist Pflicht – das Gesetz verlangt, dass der Verkäufer 2 Jahre für Fehler geradesteht, die schon beim Kauf da waren. Eine **Garantie** ist ein freiwilliges Extra-Versprechen, meist vom Hersteller, z. B. „3 Jahre Vor-Ort-Service“ – was genau gilt, steht in den Garantiebedingungen. **Kulanz** ist reine Freundlichkeit: Der Händler hilft, obwohl er nicht muss, wie ein Café, das dir einen verschütteten Kaffee neu macht.

**Merke:** Gewährleistung = Gesetz (Verkäufer, 2 Jahre); Garantie = freiwillig (meist Hersteller); Kulanz = Entgegenkommen ohne Anspruch.`,
      steps: [
        {
          type: 'explain',
          title: 'Drei Begriffe, die oft verwechselt werden',
          body: `| | **Gewährleistung** (Mängelhaftung) | **Garantie** | **Kulanz** |
|---|---|---|---|
| Grundlage | **Gesetz** (§§ 434 ff. BGB) | **freiwilliger Vertrag** (§ 443 BGB) | freiwilliges Entgegenkommen ohne Rechtspflicht |
| Wer haftet? | der **Verkäufer** (Vertragspartner) | wer die Garantie gibt: **Hersteller** oder Händler | Händler/Hersteller nach eigenem Ermessen |
| Wofür? | Mängel, die **bei Übergabe** vorhanden waren | was in den **Garantiebedingungen** steht (z. B. Funktionsfähigkeit für 3 Jahre) | z. B. Reparatur kurz nach Ablauf der Gewährleistung |
| Dauer | 2 Jahre ab Ablieferung (bewegliche Sachen) | laut Garantiebedingungen | – |
| Ausschließbar? | gegenüber Verbrauchern nicht; im B2B per Vertrag eingeschränkt möglich | Bedingungen frei gestaltbar | – |

**Wichtig:** Eine Herstellergarantie tritt **neben** die gesetzliche Gewährleistung – sie ersetzt sie nicht. Der Kunde kann wählen, ob er sich an den Händler (Gewährleistung) oder an den Hersteller (Garantie) wendet.

**IT-Praxis:** Viele Business-Geräte haben z. B. „3 Jahre Vor-Ort-Service am nächsten Arbeitstag“ – das ist eine **Herstellergarantie** bzw. ein Serviceversprechen. Bei der Beschaffung lohnt sich ein Blick in die Bedingungen: Wird Vor-Ort repariert oder muss das Gerät eingeschickt werden („Bring-in“/„Pick-up & Return“)? Bleibt die defekte Festplatte beim Kunden („Keep your Drive“ – wichtig für den **Datenschutz**)?`,
        },
        {
          type: 'check',
          question: {
            id: 'w04-c04', kind: 'single', skill: 'w.garantie', difficulty: 1,
            prompt: 'Worauf beruht die **Gewährleistung**?',
            options: ['Auf dem Gesetz – der Verkäufer haftet für Mängel bei Übergabe', 'Auf einem freiwilligen Versprechen des Herstellers', 'Auf dem guten Willen des Händlers', 'Auf einem gesonderten Wartungsvertrag'],
            answer: 0,
            distractors: {
              '1': { why: 'Das beschreibt eine **Garantie**.', error: 'w-garantie-gewaehrleistung' },
              '2': { why: 'Das ist **Kulanz**.', error: 'w-garantie-gewaehrleistung' },
              '3': { why: 'Ein Wartungsvertrag ist ein eigener Vertrag über Serviceleistungen.', error: 'w-garantie-gewaehrleistung' },
            },
            explanation: 'Gewährleistung = gesetzliche Mängelhaftung des Verkäufers (§§ 434 ff. BGB).',
          },
        },
        { type: 'practice', title: 'Übung: Gewährleistung und Garantie', questionIds: ['w04-q015', 'w04-q016', 'w04-q017', 'w04-q018'], count: 4, difficulty: 2 },
        { type: 'summary', points: ['Gewährleistung: gesetzlich, Verkäufer, Mängel bei Übergabe, 2 Jahre.', 'Garantie: freiwillig, meist Hersteller, Bedingungen laut Garantieerklärung.', 'Kulanz: freiwilliges Entgegenkommen ohne Anspruch.', 'Garantie ersetzt die Gewährleistung nicht.', 'Bei IT-Garantien auf Vor-Ort-Service und „Keep your Drive“ achten.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'w04-l05',
      title: 'Vertragsarten für IT-Leistungen',
      minutes: 25,
      relevance: 'ap1-teilweise',
      skills: ['w.vertragsarten'],
      simple: `Ob du beim Friseur einen bestimmten Haarschnitt bestellst oder einen Nachhilfelehrer für eine Stunde bezahlst, ist ein großer Unterschied. Beim Haarschnitt zählt das **Ergebnis** – das ist ein **Werkvertrag** (in der IT z. B. „Netzwerk funktionsfähig einrichten“). Beim Nachhilfelehrer bezahlst du die **Zeit**, auch wenn du die Arbeit trotzdem verhaust – das ist ein **Dienstvertrag** (z. B. Beratung oder Schulung). Kaufst du etwas, ist es ein **Kaufvertrag**; nutzt du es nur auf Zeit gegen Geld, ist es **Miete**. Werden Geräte extra für dich zusammengebaut und geliefert, gilt Kaufrecht (**Werklieferungsvertrag**).

**Merke:** Werkvertrag = Erfolg und Abnahme; Dienstvertrag = Tätigkeit, kein Erfolg; Werklieferungsvertrag (§ 650 BGB) = Kaufrecht.`,
      steps: [
        {
          type: 'explain',
          title: 'Erfolg oder Tätigkeit?',
          body: `Ein IT-Systemhaus schließt viele verschiedene Verträge. Welche Vertragsart vorliegt, entscheidet über Pflichten, Haftung und Mängelrechte.

| Vertragsart | Gegenstand | IT-Beispiel |
|---|---|---|
| **Kaufvertrag** (§ 433 BGB) | Übereignung einer Sache gegen Geld | Kauf von 10 Notebooks |
| **Werkvertrag** (§ 631) | Herstellung/Veränderung eines **Erfolgs** gegen Vergütung | Netzwerk installieren und **funktionsfähig** übergeben, individuelle Software erstellen, Server reparieren |
| **Dienstvertrag** (§ 611) | Leistung einer **Tätigkeit** – ein Erfolg wird **nicht** geschuldet | IT-Beratung, Schulung, Hotline-Support nach Stunden, Administration auf Abruf |
| **Werklieferungsvertrag** (§ 650) | Lieferung herzustellender beweglicher Sachen → **Kaufrecht** | individuell konfigurierte und zusammengebaute PCs |
| **Mietvertrag** (§ 535) | Gebrauchsüberlassung auf Zeit gegen Miete | Miete von Druckern, Server im Rechenzentrum mieten |
| **Leasingvertrag** | gesetzlich nicht eigens geregelt (Rechtsprechung: im Wesentlichen Mietrecht) | Notebook-Leasing über 36 Monate |
| **Lizenzvertrag** | Einräumung von Nutzungsrechten an Software (§§ 31, 69a ff. UrhG) | Microsoft-365-Abonnement, Virenschutz-Lizenz |

**Werkvertrag – die Besonderheiten:**
- Der Unternehmer schuldet den **Erfolg** (z. B. „WLAN mit mindestens 200 Mbit/s in allen Büros“).
- Der Besteller muss das Werk **abnehmen** (§ 640) – meist mit **Abnahmeprotokoll**. Mit der Abnahme wird die **Vergütung fällig** (§ 641), die **Gefahr** geht über, die **Verjährung** der Mängelansprüche beginnt, und der Besteller muss nun Mängel beweisen.
- Mängelrechte (§ 634): Nacherfüllung – hier wählt der **Unternehmer**, ob er nachbessert oder neu herstellt (§ 635) –, **Selbstvornahme** auf Kosten des Unternehmers (§ 637), Rücktritt, Minderung, Schadensersatz.

**Dienstvertrag:** Die Vergütung ist für die geleistete Zeit geschuldet, auch wenn das Problem nicht gelöst wurde. Es gibt keine Abnahme und keine Mängelrechte wie beim Werkvertrag (aber Haftung bei Pflichtverletzung).

**Werklieferungsvertrag oder Werkvertrag?** Entscheidend ist, was am Ende übergeben wird:
- Wird eine **bewegliche Sache** hergestellt und **geliefert** (z. B. 15 nach Kundenwunsch zusammengebaute und vorinstallierte PCs), gilt nach **§ 650 BGB Kaufrecht** – also auch die Untersuchungs- und Rügepflicht nach § 377 HGB unter Kaufleuten, keine Abnahme.
- Steht dagegen die **Arbeitsleistung beim Kunden** im Vordergrund (Netzwerk im Gebäude installieren, Server konfigurieren, Software individuell erstellen), ist es ein **Werkvertrag** mit Abnahme.

*Achtung bei älteren Unterlagen:* Bis Ende 2017 stand der Werklieferungsvertrag in **§ 651 BGB**. Seit der Reform des Bauvertragsrechts (01.01.2018) ist es **§ 650 BGB** – manche Bücher und Prüfungsvorbereitungen nennen noch die alte Nummer. Inhaltlich hat sich nichts Wesentliches geändert.

**Mischformen:** Ein **Wartungsvertrag** kann je nach Ausgestaltung Werkvertrag (Störungen beseitigen = Erfolg) oder Dienstvertrag (Bereitschaft, Inspektion) sein – im Vertrag klar beschreiben, was geschuldet ist!`,
        },
        {
          type: 'visual',
          title: 'Werkvertrag vs. Dienstvertrag',
          widget: {
            kind: 'cards',
            data: {
              columns: 2,
              items: [
                { title: 'Werkvertrag (§ 631 BGB)', text: 'Erfolg geschuldet · Abnahme · Vergütung bei Abnahme fällig · Mängelrechte (Nacherfüllung, Selbstvornahme, Rücktritt, Minderung, Schadensersatz). Beispiel: Netzwerk funktionsfähig installieren.', icon: 'CheckCircle2' },
                { title: 'Dienstvertrag (§ 611 BGB)', text: 'Tätigkeit geschuldet, kein Erfolg · keine Abnahme · Vergütung nach Zeit/Aufwand · Beispiel: IT-Beratung, Schulung, Support nach Stunden.', icon: 'Clock' },
              ],
            },
          },
          caption: 'Prüffrage: Schuldet der Auftragnehmer ein bestimmtes Ergebnis – oder nur ein Bemühen?',
        },
        {
          type: 'example',
          title: 'Verträge des Systemhauses einordnen',
          problem: 'Ordne zu: (1) Das Systemhaus richtet für die Elektro Krämer GmbH ein VPN ein, das alle Außendienstler nutzen können sollen. (2) Ein IT-Berater analysiert 3 Tage lang die Netzwerkstruktur und gibt Empfehlungen. (3) Die Elektro Krämer GmbH kauft 20 Monitore. (4) Ein Rechenzentrum stellt einen Server für 24 Monate gegen monatliche Gebühr zur Verfügung.',
          steps: [
            { label: '(1) VPN einrichten', body: 'Ein funktionierendes VPN ist ein **Erfolg** → **Werkvertrag** (mit Abnahme).' },
            { label: '(2) Beratung', body: 'Geschuldet ist die Analyse und Beratung, kein bestimmtes Ergebnis → **Dienstvertrag**.' },
            { label: '(3) Monitore', body: 'Übereignung gegen Geld → **Kaufvertrag**.' },
            { label: '(4) Server auf Zeit', body: 'Gebrauchsüberlassung gegen Entgelt → **Mietvertrag**.' },
          ],
          result: 'Werkvertrag – Dienstvertrag – Kaufvertrag – Mietvertrag.',
        },
        {
          type: 'check',
          question: {
            id: 'w04-c05', kind: 'table', skill: 'w.vertragsarten', difficulty: 2,
            prompt: 'Welche Vertragsart liegt vor? Antworte mit **kauf**, **werk**, **dienst** oder **miete**.',
            columns: [{ key: 'a', label: 'Vertragsart', type: 'text' }],
            rows: [
              { label: 'Schulung „Sicher arbeiten mit Microsoft 365“, 2 Tage', cells: { a: { answer: 'dienst', accept: ['dienstvertrag'] } } },
              { label: 'Defekten Switch reparieren und funktionsfähig zurückgeben', cells: { a: { answer: 'werk', accept: ['werkvertrag'] } } },
              { label: 'Kauf von 30 Headsets', cells: { a: { answer: 'kauf', accept: ['kaufvertrag'] } } },
              { label: 'Beamer für eine Messe für 1 Woche gegen Entgelt überlassen', cells: { a: { answer: 'miete', accept: ['mietvertrag', 'miet'] } } },
            ],
            explanation: 'Schulung = Tätigkeit (Dienst); Reparatur mit Erfolg (Werk); Kauf; zeitweise Gebrauchsüberlassung gegen Entgelt (Miete).',
          },
        },
        { type: 'practice', title: 'Übung: Vertragsarten', questionIds: ['w04-q019', 'w04-q020', 'w04-q021', 'w04-q022', 'w04-q037', 'w04-q038'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Werkvertrag: Erfolg, Abnahme, Mängelrechte, Vergütung bei Abnahme.', 'Dienstvertrag: Tätigkeit, kein Erfolg, Vergütung nach Zeit.', 'Kauf: Übereignung; Miete/Leasing: Gebrauchsüberlassung auf Zeit.', 'Werklieferungsvertrag (herzustellende bewegliche Sachen) → Kaufrecht.', 'Leistungsbeschreibung im Vertrag entscheidet über die Einordnung.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'w04-l06',
      title: 'Urheberrecht und Softwarelizenzen',
      minutes: 25,
      relevance: 'ap1',
      skills: ['w.lizenzen'],
      simple: `Wenn du ein Computerspiel kaufst, gehört dir nicht das Spiel selbst, sondern nur das **Recht, es zu benutzen** – das ist eine **Lizenz**. Wie bei einer Kinokarte: Du darfst den Film sehen, aber nicht kopieren und verkaufen. Software ist durch das **Urheberrecht** geschützt (Schutz für geistige Werke). Lizenzen gibt es pro Gerät, pro Person, für eine bestimmte Zahl gleichzeitiger Nutzer oder als **Abo**. Wer mehr Geräte nutzt, als Lizenzen gekauft wurden, verstößt gegen das Gesetz.

**Merke:** Man kauft ein Nutzungsrecht, keine Software; Lizenzmodell passend wählen und Lizenzen genau zählen.`,
      steps: [
        {
          type: 'explain',
          title: 'Man kauft nicht die Software, sondern ein Nutzungsrecht',
          body: `**Computerprogramme sind urheberrechtlich geschützt** (§§ 69a ff. UrhG). Wer Software „kauft“, erwirbt in Wahrheit ein **Nutzungsrecht** (eine **Lizenz**) zu den Bedingungen des Lizenzvertrags (EULA).

**Wichtige Regeln aus dem Urheberrecht:**
- **§ 69c UrhG:** Vervielfältigen, Bearbeiten und Verbreiten sind dem Rechteinhaber vorbehalten.
- **§ 69d Abs. 2:** Eine **Sicherungskopie** darf der berechtigte Nutzer anfertigen, wenn sie für die Sicherung künftiger Benutzung erforderlich ist – das kann nicht vertraglich verboten werden.
- **§ 69b:** Programme, die ein **Arbeitnehmer** in Erfüllung seiner Aufgaben erstellt, darf der **Arbeitgeber** wirtschaftlich verwerten – auch Skripte, die du als Azubi im Betrieb schreibst.
- Schutzdauer: **70 Jahre** nach dem Tod des Urhebers (§ 64).
- **Unterlizenzierung** (mehr Installationen/Nutzer als Lizenzen) ist eine Urheberrechtsverletzung: Unterlassungs- und Schadensersatzansprüche (§ 97), im schlimmsten Fall strafbar (§ 106). Hersteller führen **Lizenzaudits** durch – deshalb ein **Lizenzmanagement** (Software Asset Management) führen!
- **Gebrauchte Software:** Nach dem EuGH-Urteil „UsedSoft“ (2012) darf eine **unbefristet** gegen Einmalzahlung erworbene Lizenz weiterverkauft werden, wenn der Verkäufer seine eigene Kopie unbrauchbar macht.

**Lizenzmodelle:**

| Modell | Abrechnung | Beispiel |
|---|---|---|
| **Einzelplatzlizenz** (pro Gerät) | 1 Lizenz = 1 Installation | Fachprogramm auf einem Messplatz |
| **Volumenlizenz** | viele Lizenzen zu Sonderkonditionen, zentrale Verwaltung | 120 Office-Lizenzen |
| **Named User** (pro benannter Person) | jede namentliche Person braucht eine Lizenz – egal auf wie vielen Geräten | Microsoft 365 (je nach Plan mehrere Geräte pro Nutzer) |
| **Concurrent User / Floating** | Anzahl **gleichzeitiger** Nutzer; ein Lizenzserver verwaltet die Lizenzen | CAD-Software: 120 Mitarbeitende, max. 15 gleichzeitig → 15 Lizenzen |
| **Device-CAL / User-CAL** | Zugriffslizenz pro Gerät bzw. pro Benutzer, der auf einen Server zugreift | Windows-Server-Zugriff |
| **Subscription (Abo)** | laufende Gebühr pro Monat/Jahr; endet die Zahlung, endet das Nutzungsrecht; Updates inklusive | SaaS, Microsoft 365, Adobe |
| **Unbefristete Lizenz** (perpetual) | einmalige Zahlung, dauerhaftes Nutzungsrecht (Updates ggf. extra) | ältere Office-Kaufversionen |
| **OEM-Lizenz** | an ein bestimmtes Gerät gebunden, mit der Hardware ausgeliefert | vorinstalliertes Windows |
| **Freeware / Shareware** | kostenlos bzw. kostenlos zum Testen; Quellcode meist nicht offen | |
| **Open Source** | Quellcode offen, Nutzung/Änderung/Weitergabe erlaubt – unter Lizenzbedingungen | Linux, LibreOffice, Firefox |

**Open-Source-Lizenzen:** **Copyleft** (z. B. **GPL**): Wer veränderte Software weitergibt, muss sie wieder unter der GPL samt Quellcode weitergeben. **Permissive** Lizenzen (z. B. **MIT**, **BSD**, **Apache 2.0**): erlauben auch die Verwendung in proprietärer Software, verlangen aber u. a. den Erhalt des Lizenz- und Copyright-Hinweises. „Open Source“ heißt also **nicht** „ohne Bedingungen“.`,
        },
        {
          type: 'visual',
          title: 'Lizenzmodelle im Überblick',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Pro Gerät', text: 'Einzelplatz, Device-CAL, OEM – die Lizenz hängt am Gerät.', icon: 'Monitor' },
                { title: 'Pro Person', text: 'Named User, User-CAL – die Lizenz hängt an der Person, egal welches Gerät.', icon: 'User' },
                { title: 'Gleichzeitig', text: 'Concurrent/Floating – gezählt wird die maximale Zahl gleichzeitiger Nutzer.', icon: 'Users' },
                { title: 'Abo', text: 'Subscription/SaaS – laufende Kosten, Updates inklusive, Nutzung endet mit dem Abo.', icon: 'RefreshCw' },
                { title: 'Unbefristet', text: 'Perpetual – einmal zahlen, dauerhaft nutzen; Wartung/Updates oft separat.', icon: 'Infinity' },
                { title: 'Open Source', text: 'Quellcode offen; GPL (Copyleft) oder permissiv (MIT, Apache). Bedingungen beachten!', icon: 'GitBranch' },
              ],
            },
          },
          caption: 'Das passende Modell hängt davon ab, wie viele Personen und Geräte die Software wie oft gleichzeitig nutzen.',
        },
        {
          type: 'example',
          title: 'Welches Lizenzmodell ist günstiger?',
          problem: 'In der Konstruktionsabteilung arbeiten **18 Personen**, von denen laut Lizenzserver-Auswertung **höchstens 7 gleichzeitig** ein CAD-Programm nutzen. Angebot: Named-User-Lizenz **1.200 € pro Jahr**, Concurrent-User-Lizenz **2.600 € pro Jahr**. Welches Modell ist günstiger?',
          steps: [
            { label: 'Named User', body: '18 Personen × 1.200 € = **21.600 € pro Jahr**' },
            { label: 'Concurrent User', body: '7 gleichzeitige Nutzer × 2.600 € = **18.200 € pro Jahr**' },
            { label: 'Vergleich', body: '21.600 € − 18.200 € = **3.400 €** Ersparnis mit Concurrent-Lizenzen. Risiko: Ein 8. Nutzer muss warten – Reserve einplanen oder Nutzung beobachten.' },
          ],
          result: 'Concurrent-User-Lizenzen sind um **3.400 € pro Jahr** günstiger.',
        },
        {
          type: 'check',
          question: {
            id: 'w04-c06', kind: 'number', skill: 'w.lizenzen', difficulty: 2,
            prompt: 'Auf einen Windows-Server greifen **40 Mitarbeitende** zu. Jeder nutzt **zwei Geräte** (PC und Notebook). Wie viele **User-CALs** werden benötigt?',
            answer: 40, unit: 'CALs',
            misconceptions: [{ answer: '80', error: 'w-lizenz-cal', why: 'Das wäre die Zahl der **Device**-CALs. Eine User-CAL lizenziert eine Person – egal mit wie vielen Geräten.' }],
            explanation: 'User-CALs werden pro Benutzer gezählt: **40**. (Device-CALs bräuchte man 80 – hier sind User-CALs also günstiger.)',
          },
        },
        { type: 'practice', title: 'Übung: Lizenzen', questionIds: ['w04-q023', 'w04-q024', 'w04-q025', 'w04-q026', 'w04-q027'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Software ist urheberrechtlich geschützt – man erwirbt ein Nutzungsrecht (Lizenz).', 'Sicherungskopie erlaubt (§ 69d); Arbeitnehmer-Programme gehören wirtschaftlich dem Arbeitgeber (§ 69b).', 'Modelle: pro Gerät, pro Person, gleichzeitig, Abo, unbefristet, OEM, Open Source.', 'GPL = Copyleft; MIT/BSD/Apache = permissiv.', 'Unterlizenzierung ist eine Rechtsverletzung – Lizenzmanagement führen.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'w04-l07',
      title: 'Service Level Agreements (SLA), OLA/UC und AV-Vertrag',
      minutes: 35,
      relevance: 'ap1-teilweise',
      skills: ['w.sla', 'w.avvertrag'],
      simple: `Ein **SLA** ist wie das Versprechen eines Pizzadienstes: „Lieferung in 30 Minuten, sonst ist die Pizza gratis.“ Es legt **messbar** fest, wie gut ein IT-Dienst sein muss, z. B. „Der Mailserver läuft 99,5 % der Zeit“ und „Bei Totalausfall melden wir uns in 30 Minuten“. Damit das klappt, braucht der Dienstleister selbst Absprachen: intern mit den eigenen Abteilungen (**OLA**) und mit Zulieferern wie dem Internetanbieter (**UC**). Verarbeitet der Dienstleister dabei personenbezogene Daten (Daten über Menschen) für dich, braucht ihr zusätzlich einen **Auftragsverarbeitungsvertrag** nach der DSGVO.

**Merke:** SLA (Kunde) – OLA (intern) – UC (Zulieferer); erlaubter Ausfall = Zeit × (100 % − Verfügbarkeit); Auftragsverarbeitung nur mit AV-Vertrag (Art. 28 DSGVO).`,
      steps: [
        {
          type: 'explain',
          title: 'Messbare Servicequalität vereinbaren',
          body: `Ein **Service Level Agreement (SLA)** ist eine Vereinbarung zwischen IT-Dienstleister und Kunde über **Art, Umfang und Qualität** einer Dienstleistung – mit **messbaren** Kennzahlen. Typische Inhalte:

| Bestandteil | Beispiel |
|---|---|
| Leistungsbeschreibung | Betrieb des E-Mail-Dienstes inkl. Virenschutz und Backup |
| **Servicezeit** | Mo–Fr 7–18 Uhr (oder 24/7) |
| **Verfügbarkeit** | 99,5 % pro Monat innerhalb der Servicezeit |
| **Reaktionszeit** | Zeit bis zur qualifizierten Rückmeldung / Beginn der Bearbeitung, z. B. 30 min bei Priorität 1 |
| **Wiederherstellungszeit** (Lösungszeit) | Zeit bis der Dienst wieder funktioniert (ggf. mit Workaround), z. B. 4 h bei Priorität 1 |
| Prioritäten / Störungsklassen | P1 = Totalausfall vieler Nutzer, P2 = Einschränkung, P3 = Einzelplatz, P4 = Anfrage |
| Wartungsfenster | geplante Wartung z. B. Sa 22–2 Uhr – zählt meist **nicht** als Ausfall |
| Eskalation, Ansprechpartner | 1st/2nd/3rd Level, Eskalation an Teamleitung nach 2 h |
| Reporting | monatlicher Bericht über erreichte Kennzahlen |
| Vertragsstrafen / Bonus-Malus | Gutschrift von 5 % der Monatsgebühr je angefangene 0,1 % Unterschreitung |

**Verfügbarkeit berechnen:**

> **Verfügbarkeit (%) = (vereinbarte Zeit − Ausfallzeit) ÷ vereinbarte Zeit × 100**
> **erlaubte Ausfallzeit = vereinbarte Zeit × (100 % − Verfügbarkeit)**

| Verfügbarkeit | max. Ausfall pro Jahr (24/7, 8.760 h) | pro Monat (30 Tage) |
|---|---|---|
| 99 % | 87,6 h | 7,2 h |
| 99,5 % | 43,8 h | 3,6 h |
| 99,9 % | 8,76 h | 43,2 min |
| 99,99 % | 52,56 min | 4,32 min |

**Achtung:** Bezieht sich die Verfügbarkeit nur auf die **Servicezeit** (z. B. 50 h pro Woche), ist die erlaubte Ausfallzeit viel kleiner als bei 24/7.

Im IT-Service-Management (ITIL) unterscheidet man außerdem das **SLA** (mit dem Kunden), das **OLA** (Operational Level Agreement, intern zwischen Abteilungen) und den **UC** (Underpinning Contract, mit externen Zulieferern, z. B. dem Internetprovider). Ein SLA kann nur halten, wenn OLAs und UCs dazu passen.`,
        },
        {
          type: 'explain',
          title: 'SLA, OLA und UC zusammenbringen – und den Datenschutz regeln',
          body: `**Die Vertragskette**

| Vereinbarung | zwischen | Beispiel (Systemhaus betreibt den Mailserver der Elektro Krämer GmbH) |
|---|---|---|
| **SLA** – Service Level Agreement | IT-Dienstleister ↔ **Kunde** | Mail-Dienst 99,5 % verfügbar, Reaktionszeit P1: 30 min, Wiederherstellung P1: 4 h |
| **OLA** – Operational Level Agreement | Abteilungen **innerhalb** des Dienstleisters | Netzwerkteam reagiert auf Meldungen des Serverteams innerhalb von 15 min |
| **UC** – Underpinning Contract | Dienstleister ↔ **externer Zulieferer** | Rechenzentrumsbetreiber garantiert Strom und Kühlung 99,98 %; Hardwarehersteller tauscht defekte Teile innerhalb von 4 h |

**Grundregel:** Die Zusagen in OLA und UC müssen **mindestens so gut** sein wie das, was im SLA versprochen wird. Sagt das Systemhaus dem Kunden 4 h Wiederherstellung zu, hat aber mit dem Hersteller nur „Teiletausch am nächsten Arbeitstag“ vereinbart, kann es das SLA bei einem Hardwaredefekt nicht halten.

**Vertragsstrafe (Konventionalstrafe, §§ 339 ff. BGB):** Ein vorher vereinbarter Geldbetrag, den der Schuldner zahlen muss, wenn er seine Pflicht nicht oder nicht richtig erfüllt – z. B. 500 € je Tag Verspätung bei der Übergabe oder eine Gutschrift bei Unterschreitung der SLA-Verfügbarkeit. Vorteil für den Gläubiger: Er muss keinen konkreten Schaden nachweisen. In AGB darf sie nicht unangemessen hoch sein.

**Auftragsverarbeitungsvertrag (AV-Vertrag, Art. 28 DSGVO)**

Verarbeitet ein Dienstleister **personenbezogene Daten im Auftrag und nach Weisung** eines Unternehmens, ist ein schriftlicher Vertrag (auch elektronisch) vorgeschrieben. Typische Fälle: Cloud-Speicher, gehosteter Mailserver, externer Backup-Dienst, Fernwartung mit Zugriff auf Kundendaten, Entsorgung von Datenträgern.

| Rolle | Wer? |
|---|---|
| **Verantwortlicher** | das Unternehmen, dem die Daten „gehören“ (Elektro Krämer GmbH) – entscheidet über Zweck und Mittel |
| **Auftragsverarbeiter** | der Dienstleister (Systemhaus, Cloud-Anbieter) – verarbeitet nur nach Weisung |

**Pflichtinhalte (Auswahl, Art. 28 Abs. 3 DSGVO):** Gegenstand, Dauer, Art und Zweck der Verarbeitung, Art der Daten und Kategorien betroffener Personen · Verarbeitung **nur auf dokumentierte Weisung** · **Vertraulichkeit** der eingesetzten Mitarbeitenden · **technische und organisatorische Maßnahmen** (TOM, Art. 32) · Einsatz von **Unterauftragnehmern** nur mit Genehmigung · Unterstützung bei Betroffenenrechten und Datenpannen · **Löschung oder Rückgabe** der Daten nach Vertragsende · **Kontroll- und Nachweisrechte** des Verantwortlichen.

*Abgrenzung:* Ein Steuerberater oder eine Bank verarbeitet Daten **eigenverantwortlich** – dort liegt keine Auftragsverarbeitung vor. Ausführlich zum Datenschutz: Modul s02.`,
        },
        {
          type: 'example',
          title: 'Wurde das SLA eingehalten?',
          problem: 'Vereinbart sind **99,5 % Verfügbarkeit** des Dateiservers in der Servicezeit **Mo–Fr 8–18 Uhr**. Im März gab es **22 Arbeitstage**. Der Server fiel an einem Dienstag von **9:10 bis 11:40 Uhr** aus. Wurde das SLA eingehalten?',
          steps: [
            { label: 'Vereinbarte Zeit', body: '22 Tage × 10 h = **220 h** = 13.200 min' },
            { label: 'Erlaubter Ausfall', body: '220 h × 0,5 % = **1,1 h = 66 min**' },
            { label: 'Tatsächlicher Ausfall', body: '9:10 bis 11:40 = **150 min**' },
            { label: 'Erreichte Verfügbarkeit', body: '(13.200 − 150) ÷ 13.200 × 100 = **98,86 %**' },
          ],
          result: 'Das SLA wurde **nicht** eingehalten (98,86 % < 99,5 %). Der Kunde hat ggf. Anspruch auf die vereinbarte Gutschrift.',
        },
        {
          type: 'check',
          question: {
            id: 'w04-c07', kind: 'number', skill: 'w.sla', difficulty: 2,
            prompt: 'Ein SLA garantiert **99,9 %** Verfügbarkeit bei Betrieb 24/7. Wie viele **Minuten** darf der Dienst in einem Monat mit **30 Tagen** höchstens ausfallen?',
            answer: 43.2, tolerance: 0.05, unit: 'min',
            misconceptions: [{ answer: '0.72', error: 'w-einheit-zeit', why: 'Das ist das Ergebnis in Stunden. In Minuten: × 60.' }, { answer: '525.6', error: 'w-sla-zeitraum', why: 'Das ist der Wert für ein ganzes Jahr – gefragt ist ein Monat mit 30 Tagen.' }],
            explanation: '30 × 24 × 60 = 43.200 min · × 0,1 % = **43,2 min**.',
          },
        },
        { type: 'practice', title: 'Übung: Verfügbarkeit berechnen', generator: 'w.sla', count: 3, difficulty: 2 },
        { type: 'practice', title: 'Prüfungsniveau: erreichte Verfügbarkeit', generator: 'w.sla', count: 2, difficulty: 3 },
        { type: 'practice', title: 'Übung: OLA/UC, AV-Vertrag, Vertragsstrafe', questionIds: ['w04-q039', 'w04-q040', 'w04-q041', 'w04-q042', 'w04-q043', 'w04-q044'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['SLA = messbare Vereinbarung über Servicequalität.', 'Kennzahlen: Servicezeit, Verfügbarkeit, Reaktionszeit, Wiederherstellungszeit.', 'Erlaubter Ausfall = Zeit × (100 % − Verfügbarkeit).', 'Wartungsfenster zählen meist nicht als Ausfall.', 'SLA (Kunde) – OLA (intern) – UC (Zulieferer); OLA und UC müssen das SLA tragen.', 'Vertragsstrafe (§ 339 BGB): vereinbarter Betrag ohne Schadensnachweis.', 'Auftragsverarbeitung personenbezogener Daten nur mit AV-Vertrag nach Art. 28 DSGVO (Weisung, TOM, Unterauftragnehmer, Löschung, Kontrollrechte).'] },
      ],
    },
  ],
  /* ================================================================ */
  questions: [
    { id: 'w04-q001', kind: 'free', skill: 'w.kaufvertrag', difficulty: 2, prompt: 'Erläutere, wie ein Kaufvertrag zustande kommt, und nenne **zwei typische Abläufe**.', modelAnswer: 'Ein Kaufvertrag entsteht durch zwei übereinstimmende Willenserklärungen: Antrag und Annahme. Ablauf 1: Der Verkäufer macht ein verbindliches Angebot (Antrag), der Käufer bestellt rechtzeitig und unverändert (Annahme). Ablauf 2: Der Käufer bestellt ohne vorheriges verbindliches Angebot, z. B. im Onlineshop (Antrag), der Verkäufer nimmt mit einer Auftragsbestätigung oder durch Lieferung an.', keywords: ['Willenserklärungen', 'Antrag', 'Annahme', 'Angebot', 'Bestellung', 'Auftragsbestätigung'], explanation: '§§ 145 ff. BGB.' },
    { id: 'w04-q002', kind: 'single', skill: 'w.kaufvertrag', difficulty: 2, prompt: 'Ein 16-jähriger Auszubildender kauft ohne Wissen seiner Eltern ein Notebook für 1.200 € auf Raten. Wie ist der Vertrag zu beurteilen?', options: ['Schwebend unwirksam bis zur Genehmigung durch die Eltern', 'Voll wirksam, weil er eine Ausbildungsvergütung bekommt', 'Nichtig, weil Minderjährige keine Verträge schließen dürfen', 'Wirksam nach dem Taschengeldparagrafen'], answer: 0, distractors: { '1': { why: 'Die Ausbildungsvergütung macht ihn nicht voll geschäftsfähig.', error: 'w-geschaeftsfaehigkeit' }, '2': { why: 'Minderjährige ab 7 Jahren sind beschränkt geschäftsfähig – der Vertrag ist nicht von vornherein nichtig.', error: 'w-geschaeftsfaehigkeit' }, '3': { why: 'Der Taschengeldparagraf (§ 110) gilt nur, wenn die Leistung mit eigenen Mitteln **vollständig bewirkt** wird – nicht bei Ratenkauf.', error: 'w-geschaeftsfaehigkeit' } }, explanation: 'Beschränkte Geschäftsfähigkeit (§ 106 BGB) → der Vertrag ist bis zur Genehmigung der Eltern schwebend unwirksam (§ 108).' },
    { id: 'w04-q003', kind: 'match', skill: 'w.kaufvertrag', difficulty: 2, prompt: 'Ordne die Begriffe zu.', left: ['Besitz', 'Eigentum', 'Eigentumsvorbehalt', 'Verpflichtungsgeschäft'], right: ['tatsächliche Herrschaft über eine Sache', 'rechtliche Herrschaft über eine Sache', 'Ware bleibt bis zur vollständigen Zahlung Eigentum des Verkäufers', 'Abschluss des Kaufvertrags (begründet Pflichten)'], answer: [0, 1, 2, 3], explanation: 'Ein Mieter ist Besitzer, aber nicht Eigentümer. Das Erfüllungsgeschäft (Übergabe/Einigung, Zahlung) erfüllt die Pflichten.' },
    { id: 'w04-q004', kind: 'text', skill: 'w.kaufvertrag', difficulty: 1, prompt: 'In welchem Paragrafen des BGB sind die Pflichten von Verkäufer und Käufer beim Kaufvertrag geregelt? (z. B. „§ 123“)', accept: ['§ 433', '§433', '433', '§ 433 bgb', '433 bgb', '§433 bgb'], explanation: '**§ 433 BGB** – vertragstypische Pflichten beim Kaufvertrag.' },
    { id: 'w04-q005', kind: 'table', skill: 'w.maengel', difficulty: 2, prompt: 'Liegt ein **Sachmangel** (sach) oder ein **Rechtsmangel** (recht) vor?', columns: [{ key: 'a', label: 'sach / recht', type: 'text' }], rows: [
      { label: 'Notebook-Akku hält nur 2 statt der vereinbarten 8 Stunden.', cells: { a: { answer: 'sach', accept: ['sachmangel'] } } },
      { label: 'Gelieferte Software ist eine Raubkopie ohne gültige Lizenz.', cells: { a: { answer: 'recht', accept: ['rechtsmangel'] } } },
      { label: 'Statt 10 Monitoren wurden 8 geliefert.', cells: { a: { answer: 'sach', accept: ['sachmangel'] } } },
      { label: 'Die zugesicherte Dockingstation funktioniert nicht mit dem Notebook.', cells: { a: { answer: 'sach', accept: ['sachmangel'] } } },
    ], explanation: 'Mindermenge und fehlende Kompatibilität gehören seit 2022 ausdrücklich zur vereinbarten Beschaffenheit (§ 434 Abs. 2 BGB). Ein Rechtsmangel liegt vor, wenn Dritte Rechte an der Sache geltend machen können (§ 435).' },
    { id: 'w04-q006', kind: 'single', skill: 'w.maengel', difficulty: 2, prompt: 'Ein neuer Server ist defekt. Welches Recht muss die Elektro Krämer GmbH **zuerst** geltend machen?', options: ['Nacherfüllung (Reparatur oder Ersatzlieferung)', 'Rücktritt vom Vertrag', 'Minderung des Kaufpreises', 'Schadensersatz statt der Leistung'], answer: 0, distractors: { '1': { why: 'Rücktritt ist ein nachrangiges Recht – erst nach erfolgloser Nacherfüllung.', error: 'w-maengel-reihenfolge' }, '2': { why: 'Minderung ist nachrangig.', error: 'w-maengel-reihenfolge' }, '3': { why: 'Schadensersatz statt der Leistung setzt grundsätzlich eine erfolglose Frist zur Nacherfüllung voraus.', error: 'w-maengel-reihenfolge' } }, explanation: 'Vorrang der **Nacherfüllung** (§§ 437, 439 BGB) – der Verkäufer bekommt eine zweite Chance.' },
    { id: 'w04-q007', kind: 'text', skill: 'w.maengel', difficulty: 2, prompt: 'Wer darf bei der **Nacherfüllung im Kaufrecht** wählen, ob repariert oder neu geliefert wird? (Käufer oder Verkäufer)', accept: ['käufer', 'kaeufer', 'der käufer', 'der kaeufer'], misconceptions: [{ answer: 'verkäufer', error: 'w-nacherfuellung-wahl', why: 'Im **Kaufrecht** wählt der Käufer (§ 439 Abs. 1). Im **Werkvertragsrecht** wählt dagegen der Unternehmer (§ 635).' }], explanation: 'Der **Käufer** (§ 439 Abs. 1 BGB). Der Verkäufer kann die gewählte Art nur bei unverhältnismäßigen Kosten verweigern.' },
    { id: 'w04-q008', kind: 'free', skill: 'w.maengel', difficulty: 3, prompt: 'Die Elektro Krämer GmbH (Kaufmann) hat beim Systemhaus (Kaufmann) 15 Notebooks gekauft. Erst **drei Wochen nach Lieferung** packt sie die Kartons aus und stellt fest, dass 3 Geräte Displaybrüche haben. Beurteile die Rechtslage.', modelAnswer: 'Es handelt sich um einen zweiseitigen Handelskauf. Nach § 377 HGB muss der Käufer die Ware unverzüglich nach Ablieferung untersuchen und offene Mängel unverzüglich rügen. Displaybrüche wären bei einer ordnungsgemäßen Untersuchung (Auspacken, Sichtprüfung) sofort erkennbar gewesen – es sind offene Mängel. Da erst nach drei Wochen untersucht wurde, ist die Rüge verspätet; die Ware gilt als genehmigt, und die Mängelrechte sind verloren. Möglich bleibt nur, auf Kulanz des Lieferanten zu hoffen. Konsequenz: Wareneingang immer sofort prüfen.', keywords: ['zweiseitiger Handelskauf', '§ 377 HGB', 'unverzüglich', 'offener Mangel', 'genehmigt', 'Kulanz'], explanation: 'Unter Kaufleuten ist die Rügepflicht streng – „unverzüglich“ heißt ohne schuldhaftes Zögern, also in der Regel innerhalb weniger Tage.' },
    { id: 'w04-q009', kind: 'text', skill: 'w.maengel', difficulty: 2, prompt: 'Ein Monitor wird am **15.03.2025** an einen Verbraucher geliefert. Bis zu welchem Datum verjähren die gesetzlichen Mängelansprüche (Regelfall)? (Format TT.MM.JJJJ)', accept: ['15.03.2027', '15.3.2027', '15.03.27'], misconceptions: [{ answer: '15.03.2026', error: 'w-verjaehrung', why: 'Die Verjährungsfrist für Mängelansprüche bei beweglichen Sachen beträgt **2 Jahre**, nicht 1 Jahr. (1 Jahr gilt für die Beweislastumkehr.)' }, { answer: '31.12.2027', error: 'w-verjaehrung', why: 'Die Mängelverjährung beginnt mit der **Ablieferung**, nicht zum Jahresende (das gilt für die regelmäßige Verjährung von 3 Jahren).' }], explanation: '2 Jahre ab Ablieferung (§ 438 Abs. 1 Nr. 3, Abs. 2 BGB) → Ablauf am **15.03.2027**.' },
    { id: 'w04-q010', kind: 'number', skill: 'w.maengel', difficulty: 1, prompt: 'Beim Verbrauchsgüterkauf wird vermutet, dass ein Mangel bereits bei Übergabe vorlag, wenn er sich innerhalb einer bestimmten Frist zeigt (Beweislastumkehr). Wie viele **Monate** beträgt diese Frist seit 2022?', answer: 12, unit: 'Monate', misconceptions: [{ answer: '6', error: 'w-beweislastumkehr', why: '6 Monate galten bis Ende 2021. Seit 2022 sind es 12 Monate (§ 477 BGB).' }, { answer: '24', error: 'w-beweislastumkehr', why: '24 Monate ist die Verjährungsfrist der Mängelansprüche, nicht die Frist der Beweislastumkehr.' }], explanation: '**12 Monate** (1 Jahr), § 477 BGB.' },
    { id: 'w04-q011', kind: 'table', skill: 'w.verzug', difficulty: 2, prompt: 'Um welche Vertragsstörung handelt es sich? Antworte mit **lieferverzug**, **annahmeverzug**, **zahlungsverzug** oder **mangel**.', columns: [{ key: 'a', label: 'Störung', type: 'text' }], rows: [
      { label: 'Die Notebooks sollten am 01.04. geliefert werden, kommen aber nicht.', cells: { a: { answer: 'lieferverzug' } } },
      { label: 'Der Kunde verweigert ohne Grund die Annahme des pünktlich gelieferten Servers.', cells: { a: { answer: 'annahmeverzug' } } },
      { label: 'Die Rechnung vom 02.05. ist am 15.06. noch nicht bezahlt.', cells: { a: { answer: 'zahlungsverzug' } } },
      { label: 'Der gelieferte Drucker druckt nur verschmiert.', cells: { a: { answer: 'mangel', accept: ['mangelhafte lieferung', 'sachmangel', 'schlechtleistung'] } } },
    ], explanation: 'Lieferverzug (Verkäufer zu spät), Annahmeverzug (Käufer nimmt nicht an), Zahlungsverzug (Käufer zahlt zu spät), mangelhafte Lieferung (Schlechtleistung).' },
    { id: 'w04-q012', kind: 'number', skill: 'w.verzug', difficulty: 3, prompt: 'Ein Verbraucher zahlt eine Rechnung über **1.499,00 €** für ein Notebook **60 Tage** zu spät. Angenommener Basiszinssatz: **2,27 %**. Wie hoch sind die gesetzlichen Verzugszinsen? (365 Tage, auf Cent runden)', answer: 17.91, tolerance: 0.01, unit: '€', misconceptions: [{ answer: '27.77', error: 'w-verzugszins-satz', why: 'Bei Beteiligung eines Verbrauchers gilt Basiszinssatz + **5** Prozentpunkte (7,27 %), nicht + 9.' }, { answer: '5.59', error: 'w-verzugszins-satz', why: 'Nicht nur den Basiszinssatz verwenden – es kommen 5 Prozentpunkte hinzu.' }], hints: ['Zinssatz = 2,27 % + 5 Prozentpunkte.', 'Zinsen = Betrag × Zinssatz × Tage ÷ 365.'], explanation: 'Zinssatz 2,27 % + 5 % = 7,27 % · 1.499,00 € × 7,27 % × 60 ÷ 365 = 17,914… ≈ **17,91 €**.' },
    { id: 'w04-q013', kind: 'number', skill: 'w.verzug', difficulty: 2, prompt: 'Eine Rechnung über **11.900,00 €** zwischen zwei Unternehmen wird **45 Tage** zu spät bezahlt. Angenommener Basiszinssatz **2,27 %**. Berechne die Verzugszinsen (365 Tage, auf Cent runden) – **ohne** die 40-€-Pauschale.', answer: 165.34, tolerance: 0.01, unit: '€', misconceptions: [{ answer: '106.66', error: 'w-verzugszins-satz', why: 'Zwischen Unternehmen gilt Basiszinssatz + **9** Prozentpunkte.' }, { answer: '205.34', error: 'w-verzugszins-pauschale', why: 'Laut Aufgabe ohne die 40-€-Pauschale.' }], explanation: '2,27 % + 9 % = 11,27 % · 11.900,00 € × 11,27 % × 45 ÷ 365 = **165,34 €**.' },
    { id: 'w04-q014', kind: 'free', skill: 'w.verzug', difficulty: 2, prompt: 'Der Lieferant der neuen Firewall ist mit der Lieferung in Verzug. Nenne die Rechte der Elektro Krämer GmbH **ohne** und **mit** Setzen einer Nachfrist.', modelAnswer: 'Ohne Nachfrist: auf der Lieferung bestehen und zusätzlich Ersatz des Verzögerungsschadens verlangen (z. B. Kosten einer Mietfirewall für die Übergangszeit), sofern der Lieferant den Verzug zu vertreten hat. Nach Ablauf einer angemessenen Nachfrist: vom Vertrag zurücktreten (auch ohne Verschulden) und/oder Schadensersatz statt der Leistung verlangen (z. B. Mehrkosten eines Deckungskaufs bei einem anderen Lieferanten; setzt Verschulden voraus). Beim Fixkauf ist die Nachfrist entbehrlich.', keywords: ['Lieferung verlangen', 'Verzögerungsschaden', 'Nachfrist', 'Rücktritt', 'Schadensersatz statt der Leistung', 'Deckungskauf'], explanation: '§§ 280, 281, 286, 323 BGB.' },
    { id: 'w04-q015', kind: 'table', skill: 'w.garantie', difficulty: 2, prompt: 'Gewährleistung (**gewähr**), Garantie (**garantie**) oder Kulanz (**kulanz**)?', columns: [{ key: 'a', label: 'Begriff', type: 'text' }], rows: [
      { label: 'Der Hersteller verspricht freiwillig 3 Jahre Vor-Ort-Service.', cells: { a: { answer: 'garantie' } } },
      { label: 'Der Händler haftet gesetzlich 2 Jahre für Mängel, die bei Übergabe vorlagen.', cells: { a: { answer: 'gewähr', accept: ['gewaehr', 'gewährleistung', 'gewaehrleistung'] } } },
      { label: 'Der Händler tauscht ein Netzteil 3 Monate nach Ende der Gewährleistung ohne Rechtspflicht kostenlos.', cells: { a: { answer: 'kulanz' } } },
    ], explanation: 'Gesetz = Gewährleistung, freiwilliger Vertrag = Garantie, freiwilliges Entgegenkommen ohne Anspruch = Kulanz.' },
    { id: 'w04-q016', kind: 'free', skill: 'w.garantie', difficulty: 2, prompt: 'Erläutere den Unterschied zwischen **Gewährleistung** und **Garantie**.', modelAnswer: 'Die Gewährleistung (Mängelhaftung) ist gesetzlich geregelt (§§ 434 ff. BGB). Der Verkäufer haftet für Mängel, die bei Übergabe vorhanden waren, in der Regel 2 Jahre ab Ablieferung. Die Garantie ist eine freiwillige vertragliche Zusage (§ 443 BGB), meist des Herstellers; Umfang, Dauer und Bedingungen legt der Garantiegeber fest (z. B. Haltbarkeit für 3 Jahre, Vor-Ort-Service). Die Garantie besteht zusätzlich zur Gewährleistung.', keywords: ['gesetzlich', 'Verkäufer', 'bei Übergabe', 'freiwillig', 'Hersteller', 'zusätzlich'], explanation: 'Gewährleistung richtet sich gegen den Vertragspartner, Garantie gegen den Garantiegeber.' },
    { id: 'w04-q017', kind: 'single', skill: 'w.garantie', difficulty: 2, prompt: 'Ein Notebook-Hersteller bietet „**Keep your Drive**“ an. Welchen Vorteil hat das für die Elektro Krämer GmbH?', options: ['Bei einem Festplattentausch bleibt die defekte Festplatte mit den Daten im Unternehmen – wichtig für den Datenschutz.', 'Die Festplatte wird kostenlos verdoppelt.', 'Die Garantie verlängert sich um ein Jahr.', 'Die Festplatte wird automatisch verschlüsselt.'], answer: 0, distractors: { '1': { why: 'Es geht nicht um mehr Speicher.', error: 'w-garantie-optionen' }, '2': { why: 'Die Laufzeit bleibt unverändert.', error: 'w-garantie-optionen' }, '3': { why: 'Verschlüsselung ist eine eigene Maßnahme (z. B. BitLocker).', error: 'w-garantie-optionen' } }, explanation: 'Mit „Keep your Drive“ muss das defekte Speichermedium nicht an den Hersteller zurückgeschickt werden – personenbezogene Daten verlassen das Unternehmen nicht (DSGVO).' },
    { id: 'w04-q018', kind: 'multi', skill: 'w.garantie', difficulty: 2, prompt: 'Welche Aussagen sind richtig?', options: ['Eine Herstellergarantie ersetzt die gesetzliche Gewährleistung des Händlers.', 'Gegenüber Verbrauchern kann die Gewährleistung für neue Sachen nicht ausgeschlossen werden.', 'Garantiebedingungen legt der Garantiegeber fest.', 'Kulanz ist ein gesetzlicher Anspruch.', 'Die Gewährleistung richtet sich gegen den Verkäufer.'], answer: [1, 2, 4], explanation: 'Die Garantie besteht **zusätzlich** zur Gewährleistung; Kulanz ist freiwillig.' },
    { id: 'w04-q019', kind: 'free', skill: 'w.vertragsarten', difficulty: 2, prompt: 'Erläutere den Unterschied zwischen **Werkvertrag** und **Dienstvertrag** an je einem IT-Beispiel.', modelAnswer: 'Beim Werkvertrag (§ 631 BGB) schuldet der Auftragnehmer einen Erfolg, z. B. ein funktionsfähig installiertes WLAN. Der Kunde nimmt das Werk ab; erst dann wird die Vergütung fällig, und bei Mängeln gibt es Mängelrechte (Nacherfüllung, Selbstvornahme, Rücktritt, Minderung, Schadensersatz). Beim Dienstvertrag (§ 611 BGB) schuldet der Auftragnehmer nur die Tätigkeit, nicht den Erfolg, z. B. eine IT-Schulung oder Support nach Stunden. Bezahlt wird die geleistete Zeit, auch wenn das gewünschte Ergebnis nicht eintritt; eine Abnahme gibt es nicht.', keywords: ['Erfolg', 'Tätigkeit', 'Abnahme', 'Mängelrechte', 'Vergütung', 'Beispiel'], explanation: 'Prüffrage: Wird ein Ergebnis oder ein Bemühen geschuldet?' },
    { id: 'w04-q020', kind: 'multi', skill: 'w.vertragsarten', difficulty: 2, prompt: 'Welche Folgen hat die **Abnahme** beim Werkvertrag?', options: ['Die Vergütung wird fällig.', 'Die Verjährung der Mängelansprüche beginnt.', 'Die Gefahr geht auf den Besteller über.', 'Der Unternehmer haftet nicht mehr für Mängel.', 'Der Besteller muss nun beweisen, dass ein Mangel vorliegt.'], answer: [0, 1, 2, 4], explanation: 'Nach der Abnahme bestehen die Mängelrechte weiter (bis zur Verjährung) – die Haftung endet also nicht.' },
    { id: 'w04-q021', kind: 'text', skill: 'w.vertragsarten', difficulty: 2, prompt: 'Wie heißt das Recht des Bestellers beim Werkvertrag, einen Mangel nach erfolgloser Frist **selbst** (oder durch einen Dritten) beseitigen zu lassen und die Kosten vom Unternehmer zu verlangen?', accept: ['selbstvornahme', 'die selbstvornahme', 'ersatzvornahme'], explanation: '**Selbstvornahme** (§ 637 BGB).' },
    { id: 'w04-q022', kind: 'single', skill: 'w.vertragsarten', difficulty: 2, prompt: 'Ein Systemhaus baut nach Kundenwunsch **individuell konfigurierte PCs** zusammen und liefert sie. Welches Recht ist anzuwenden?', options: ['Kaufrecht (Werklieferungsvertrag, § 650 BGB)', 'Dienstvertragsrecht', 'Mietrecht', 'Ausschließlich Werkvertragsrecht mit Abnahme'], answer: 0, distractors: { '1': { why: 'Es wird ein Gegenstand geliefert, nicht nur eine Tätigkeit erbracht.', error: 'w-vertragsart' }, '2': { why: 'Die PCs werden übereignet, nicht nur überlassen.', error: 'w-vertragsart' }, '3': { why: 'Für Verträge über herzustellende bewegliche Sachen verweist § 650 BGB auf das Kaufrecht.', error: 'w-vertragsart' } }, explanation: 'Werklieferungsvertrag: Lieferung herzustellender beweglicher Sachen → **Kaufrecht** (§ 650 BGB).' },
    { id: 'w04-q023', kind: 'match', skill: 'w.lizenzen', difficulty: 2, prompt: 'Ordne die Lizenzmodelle zu.', left: ['Named User', 'Concurrent User', 'OEM-Lizenz', 'Subscription'], right: ['Lizenz pro namentlich benannter Person', 'Anzahl gleichzeitiger Nutzer wird lizenziert', 'an das mitgelieferte Gerät gebunden', 'zeitlich begrenzt gegen laufende Gebühr'], answer: [0, 1, 2, 3], explanation: 'Das Modell bestimmt, was gezählt wird: Personen, gleichzeitige Nutzungen, Geräte oder Zeit.' },
    { id: 'w04-q024', kind: 'number', skill: 'w.lizenzen', difficulty: 2, prompt: 'Für **45 Mitarbeitende** wird ein Office-Abo zu **12,50 € pro Nutzer und Monat** (netto) abgeschlossen. Wie hoch sind die **jährlichen** Lizenzkosten netto?', answer: 6750, tolerance: 0.01, unit: '€', misconceptions: [{ answer: '562.5', error: 'w-laufzeit', why: 'Das sind die Kosten für einen Monat – mal 12.' }, { answer: '150', error: 'w-stueckzahl', why: 'Das sind die Kosten für eine Person pro Jahr – mal 45.' }], explanation: '45 × 12,50 € × 12 = **6.750,00 €**.' },
    { id: 'w04-q025', kind: 'single', skill: 'w.lizenzen', difficulty: 2, prompt: 'Ein Unternehmen verändert ein **GPL-lizenziertes** Programm und gibt es an Kunden weiter. Was muss es beachten?', options: ['Die veränderte Version muss ebenfalls unter der GPL mit Quellcode weitergegeben werden (Copyleft).', 'Nichts – Open Source ist frei von Bedingungen.', 'Es darf das Programm nicht verändern.', 'Es muss Lizenzgebühren an die Free Software Foundation zahlen.'], answer: 0, distractors: { '1': { why: 'Open-Source-Lizenzen haben Bedingungen – bei der GPL das Copyleft.', error: 'w-opensource' }, '2': { why: 'Verändern ist ausdrücklich erlaubt.', error: 'w-opensource' }, '3': { why: 'Die GPL verlangt keine Lizenzgebühren.', error: 'w-opensource' } }, explanation: 'Copyleft: Abgeleitete Werke, die weitergegeben werden, müssen unter denselben Bedingungen inkl. Quellcode verfügbar sein.' },
    { id: 'w04-q026', kind: 'free', skill: 'w.lizenzen', difficulty: 2, prompt: 'Bei einem Audit stellt sich heraus, dass eine Software auf **60 Rechnern** installiert ist, aber nur **45 Lizenzen** vorhanden sind. Nenne die möglichen **Folgen** und **zwei Maßnahmen**, um das künftig zu verhindern.', modelAnswer: 'Folgen: Urheberrechtsverletzung (Unterlizenzierung); der Rechteinhaber kann Unterlassung und Schadensersatz verlangen (§ 97 UrhG), Nachlizenzierung oft zu Listenpreisen plus Auditkosten, im Extremfall strafrechtliche Folgen (§ 106 UrhG) und Imageschaden. Maßnahmen: Lizenzmanagement/Software Asset Management mit Inventarisierung aller Installationen; Softwareverteilung nur zentral durch die IT (keine lokalen Adminrechte); regelmäßige Abgleiche Installationen vs. Lizenzen; Lizenzserver für Floating-Lizenzen.', keywords: ['Unterlizenzierung', 'Schadensersatz', 'Unterlassung', 'Lizenzmanagement', 'Inventarisierung', 'Adminrechte'], explanation: 'Es fehlen 15 Lizenzen – sie müssen sofort nachlizenziert oder die überzähligen Installationen entfernt werden.' },
    { id: 'w04-q027', kind: 'text', skill: 'w.lizenzen', difficulty: 2, prompt: 'Ein Azubi programmiert im Betrieb in seiner Arbeitszeit ein Skript zur Benutzeranlage. Wer darf es nach § 69b UrhG wirtschaftlich verwerten? (Arbeitgeber oder Azubi)', accept: ['arbeitgeber', 'der arbeitgeber', 'betrieb', 'der betrieb', 'ausbildungsbetrieb'], explanation: 'Der **Arbeitgeber** (§ 69b UrhG) – Programme, die in Erfüllung der Arbeitsaufgaben entstehen, darf er ausschließlich verwerten.' },
    { id: 'w04-q028', kind: 'number', skill: 'w.sla', difficulty: 2, prompt: 'Ein Rechenzentrum garantiert **99,9 %** Verfügbarkeit pro Jahr (365 Tage, 24/7). Wie viele **Stunden** Ausfall sind maximal erlaubt?', answer: 8.76, tolerance: 0.005, unit: 'h', misconceptions: [{ answer: '87.6', error: 'w-sla-prozent', why: '100 % − 99,9 % = **0,1 %**, nicht 1 %.' }, { answer: '8751.24', error: 'w-sla-ausfall-statt-verfuegbar', why: 'Das ist die verfügbare Zeit, nicht die Ausfallzeit.' }], explanation: '8.760 h × 0,1 % = **8,76 h** (≈ 8 h 46 min).' },
    { id: 'w04-q029', kind: 'number', skill: 'w.sla', difficulty: 3, prompt: 'Vereinbart sind **99,8 %** Verfügbarkeit in der Servicezeit **Mo–Fr 8–18 Uhr**. Ein Monat hat **21 Arbeitstage**. Wie viele **Minuten** Ausfall sind in diesem Monat erlaubt? (auf eine Nachkommastelle)', answer: 25.2, tolerance: 0.05, unit: 'min', misconceptions: [{ answer: '86.4', error: 'w-sla-servicezeit', why: 'Die Verfügbarkeit bezieht sich nur auf die Servicezeit (21 × 10 h), nicht auf 24/7 für 30 Tage.' }, { answer: '0.42', error: 'w-einheit-zeit', why: 'Das ist das Ergebnis in Stunden – in Minuten umrechnen (× 60).' }], explanation: 'Servicezeit: 21 × 10 h = 210 h = 12.600 min · × 0,2 % = **25,2 min**.' },
    { id: 'w04-q030', kind: 'match', skill: 'w.sla', difficulty: 2, prompt: 'Ordne die SLA-Kennzahlen zu.', left: ['Reaktionszeit', 'Wiederherstellungszeit', 'Servicezeit', 'Verfügbarkeit'], right: ['Zeit bis zur qualifizierten Rückmeldung bzw. Bearbeitungsbeginn', 'Zeit bis der Dienst wieder nutzbar ist', 'Zeitraum, in dem der Dienstleister die Leistung erbringt bzw. erreichbar ist', 'Anteil der Zeit, in dem der Dienst nutzbar ist'], answer: [0, 1, 2, 3], explanation: 'Reaktionszeit ≠ Lösungszeit: Ein schneller Rückruf löst das Problem noch nicht.' },
    { id: 'w04-q031', kind: 'free', skill: 'w.sla', difficulty: 2, prompt: 'Die Elektro Krämer GmbH lagert ihren Mailserver an einen Dienstleister aus. Nenne **fünf Inhalte**, die im SLA geregelt sein sollten.', modelAnswer: '1. Leistungsbeschreibung (Mailbetrieb, Spam-/Virenschutz, Backup). 2. Servicezeiten und Erreichbarkeit des Supports. 3. Verfügbarkeit in % und Messverfahren. 4. Reaktions- und Wiederherstellungszeiten je Priorität. 5. Wartungsfenster. 6. Eskalationsweg und Ansprechpartner. 7. Reporting. 8. Vertragsstrafen/Gutschriften bei Unterschreitung. 9. Datenschutz (Auftragsverarbeitungsvertrag, Serverstandort) und Datensicherung/Restore-Zeiten.', keywords: ['Verfügbarkeit', 'Reaktionszeit', 'Wiederherstellungszeit', 'Servicezeit', 'Wartungsfenster', 'Vertragsstrafe', 'Reporting'], explanation: 'Ein SLA muss messbare Werte enthalten – sonst lässt sich nicht prüfen, ob es eingehalten wurde.' },
    { id: 'w04-q032', kind: 'number', skill: 'w.sla', difficulty: 3, prompt: 'Im SLA sind **99,5 %** Verfügbarkeit in der Servicezeit Mo–Fr 8–18 Uhr vereinbart. Im Monat gab es **22 Arbeitstage**; der Dienst fiel insgesamt **150 Minuten** aus. Welche Verfügbarkeit wurde erreicht? (Prozent, zwei Nachkommastellen)', answer: 98.86, tolerance: 0.005, unit: '%', misconceptions: [{ answer: '99.65', error: 'w-sla-servicezeit', why: 'Die Verfügbarkeit bezieht sich auf die **Servicezeit** (22 × 10 h = 13.200 min), nicht auf 30 Tage 24/7.' }, { answer: '1.14', error: 'w-sla-ausfall-statt-verfuegbar', why: 'Das ist der Ausfallanteil. Verfügbarkeit = 100 % − Ausfallanteil.' }], explanation: 'Servicezeit: 22 × 10 h = 13.200 min · (13.200 − 150) ÷ 13.200 × 100 = 98,8636… ≈ **98,86 %** → SLA verfehlt.' },
    { id: 'w04-q033', kind: 'single', skill: 'w.wareneingang', difficulty: 1, prompt: 'Bestellt wurden **20 Monitore**, laut Lieferschein und Zählung kommen nur **18** an. Welche Mangelart liegt vor?', options: ['Mangel in der Menge', 'Mangel in der Art (Falschlieferung)', 'Mangel in der Güte/Qualität', 'Kein Mangel, nur Lieferverzug'], answer: 0, distractors: { '1': { why: 'Die richtigen Monitore wurden geliefert – nur zu wenige.', error: 'w-mangelart' }, '2': { why: 'An der Qualität der gelieferten Geräte ist nichts auszusetzen.', error: 'w-mangelart' }, '3': { why: 'Weniger als bestellt zu liefern ist ein Mangel in der Menge.', error: 'w-mangelart' } }, explanation: '18 statt 20 Stück → **Mangel in der Menge**.' },
    { id: 'w04-q034', kind: 'single', skill: 'w.wareneingang', difficulty: 1, prompt: 'Bestellt wurden **27-Zoll-Monitore**, geliefert werden **24-Zoll-Monitore** in der richtigen Stückzahl, alle funktionieren. Welche Mangelart liegt vor?', options: ['Mangel in der Art (Falschlieferung)', 'Mangel in der Menge', 'Mangel in der Güte/Qualität', 'Kein Mangel, weil die Geräte funktionieren'], answer: 0, distractors: { '1': { why: 'Die Stückzahl stimmt.', error: 'w-mangelart' }, '2': { why: 'Die Geräte sind nicht fehlerhaft – es ist das falsche Produkt.', error: 'w-mangelart' }, '3': { why: 'Wird etwas anderes geliefert als bestellt, ist das auch dann ein Mangel, wenn es funktioniert.', error: 'w-mangelart' } }, explanation: 'Anderes Produkt als bestellt → **Mangel in der Art** (Falschlieferung).' },
    { id: 'w04-q035', kind: 'multi', skill: 'w.wareneingang', difficulty: 2, prompt: 'Was gehört in eine **Mängelrüge**?', options: ['Bezug auf Bestellung bzw. Lieferschein (Nummer, Datum)', 'Genaue Beschreibung des Mangels (Artikel, Seriennummern, Anzahl)', 'Das gewünschte Recht, z. B. Ersatzlieferung', 'Eine angemessene Frist', 'Die sofortige Rücktrittserklärung ohne Frist', 'Eine Kopie der eigenen AGB'], answer: [0, 1, 2, 3], explanation: 'Zuerst wird **Nacherfüllung** mit Frist verlangt. Rücktritt kommt erst in Frage, wenn die Nacherfüllung scheitert.' },
    { id: 'w04-q036', kind: 'single', skill: 'w.wareneingang', difficulty: 2, prompt: 'Bei der Anlieferung ist ein Karton **sichtbar eingedrückt**. Der Fahrer wartet. Was tust du?', options: ['Den Schaden auf dem Lieferschein/Frachtbrief vermerken, vom Fahrer gegenzeichnen lassen und Fotos machen', 'Erst einmal annehmen und in ein paar Wochen auspacken', 'Ohne Vermerk unterschreiben, der Händler haftet ja sowieso', 'Den Karton öffnen und die Ware behalten, aber nichts melden'], answer: 0, distractors: { '1': { why: 'Die Ware muss unverzüglich geprüft werden, sonst können Rechte verloren gehen (§ 377 HGB).', error: 'w-ruegefrist' }, '2': { why: 'Ohne Vermerk ist später schwer zu beweisen, dass der Schaden schon bei Lieferung da war.', error: 'w-ruegefrist' }, '3': { why: 'Wer einen erkennbaren Mangel nicht meldet, verliert unter Kaufleuten seine Rechte.', error: 'w-ruegefrist' } }, explanation: 'Äußere Schäden **sofort** auf dem Lieferschein vermerken und gegenzeichnen lassen; bei schweren Schäden die Annahme verweigern.' },
    { id: 'w04-q037', kind: 'single', skill: 'w.vertragsarten', difficulty: 2, prompt: 'Ein Systemhaus soll im Gebäude des Kunden ein **Netzwerk installieren und einrichten**; geschuldet ist ein funktionierendes Netzwerk. Welche Vertragsart liegt vor?', options: ['Werkvertrag mit Abnahme', 'Dienstvertrag', 'Kaufvertrag', 'Mietvertrag'], answer: 0, distractors: { '1': { why: 'Geschuldet ist ein Erfolg (funktionierendes Netz), nicht nur die Tätigkeit.', error: 'w-vertragsart' }, '2': { why: 'Im Vordergrund steht die Arbeitsleistung beim Kunden, nicht die Lieferung einer Sache.', error: 'w-vertragsart' }, '3': { why: 'Es wird nichts auf Zeit überlassen.', error: 'w-vertragsart' } }, explanation: 'Erfolg wird geschuldet und die Arbeit beim Kunden steht im Vordergrund → **Werkvertrag** (§ 631 BGB) mit Abnahme.' },
    { id: 'w04-q038', kind: 'single', skill: 'w.vertragsarten', difficulty: 2, prompt: 'In einem älteren Lehrbuch steht der Werklieferungsvertrag in **§ 651 BGB**. Was gilt heute?', options: ['Er steht seit 2018 in § 650 BGB; inhaltlich gilt weiter Kaufrecht.', 'Der Werklieferungsvertrag wurde abgeschafft.', 'Heute gilt dafür Dienstvertragsrecht.', '§ 651 BGB ist weiterhin richtig.'], answer: 0, distractors: { '1': { why: 'Es gibt ihn weiterhin – nur die Nummer hat sich geändert.', error: 'w-vertragsart' }, '2': { why: 'Es gilt weiter Kaufrecht, nicht Dienstvertragsrecht.', error: 'w-vertragsart' }, '3': { why: 'Seit dem 01.01.2018 ist es § 650 BGB.', error: 'w-vertragsart' } }, explanation: 'Seit der Reform zum 01.01.2018: **§ 650 BGB**, Rechtsfolge Kaufrecht.' },
    { id: 'w04-q039', kind: 'single', skill: 'w.avvertrag', difficulty: 2, prompt: 'Innerhalb eines Systemhauses vereinbart das **Netzwerkteam mit dem Serverteam**, auf Störungsmeldungen innerhalb von 15 Minuten zu reagieren. Wie heißt diese Vereinbarung?', options: ['OLA (Operational Level Agreement)', 'SLA (Service Level Agreement)', 'UC (Underpinning Contract)', 'AV-Vertrag'], answer: 0, distractors: { '1': { why: 'Ein SLA wird mit dem Kunden geschlossen.', error: 'w-sla-ola-uc' }, '2': { why: 'Ein UC wird mit einem externen Zulieferer geschlossen.', error: 'w-sla-ola-uc' }, '3': { why: 'Der AV-Vertrag regelt Datenschutz bei Auftragsverarbeitung.', error: 'w-sla-ola-uc' } }, explanation: 'Interne Vereinbarung zwischen Abteilungen → **OLA**.' },
    { id: 'w04-q040', kind: 'single', skill: 'w.avvertrag', difficulty: 2, prompt: 'Ein Systemhaus schließt mit einem **Hardwarehersteller** einen Vertrag: defekte Serverteile werden innerhalb von 4 Stunden getauscht. Wie heißt dieser Vertrag in der SLA-Kette?', options: ['UC (Underpinning Contract)', 'OLA (Operational Level Agreement)', 'SLA (Service Level Agreement)', 'Garantie'], answer: 0, distractors: { '1': { why: 'Ein OLA gilt nur innerhalb des eigenen Unternehmens.', error: 'w-sla-ola-uc' }, '2': { why: 'Das SLA schließt das Systemhaus mit seinem Kunden.', error: 'w-sla-ola-uc' }, '3': { why: 'Eine Garantie ist ein freiwilliges Versprechen, kein vereinbarter Servicevertrag mit Reaktionszeiten.', error: 'w-sla-ola-uc' } }, explanation: 'Vertrag mit einem **externen Zulieferer**, der das SLA absichert → **UC**.' },
    { id: 'w04-q041', kind: 'single', skill: 'w.avvertrag', difficulty: 3, prompt: 'Das Systemhaus sagt dem Kunden im SLA **4 Stunden Wiederherstellung** zu. Mit dem Hersteller ist nur **Teiletausch am nächsten Arbeitstag** vereinbart. Wie bewertest du das?', options: ['Das SLA ist gefährdet: Der UC muss mindestens so gut sein wie die Zusage an den Kunden (oder es braucht Ersatzteile auf Lager).', 'Kein Problem, der Hersteller haftet gegenüber dem Kunden.', 'Kein Problem, das SLA gilt nur für Software.', 'Der Kunde muss sich direkt an den Hersteller wenden.'], answer: 0, distractors: { '1': { why: 'Der Kunde hat nur einen Vertrag mit dem Systemhaus, nicht mit dem Hersteller.', error: 'w-sla-ola-uc' }, '2': { why: 'Das SLA gilt für den vereinbarten Dienst, auch wenn Hardware ausfällt.', error: 'w-sla-ola-uc' }, '3': { why: 'Ansprechpartner des Kunden ist laut SLA das Systemhaus.', error: 'w-sla-ola-uc' } }, explanation: 'Grundregel: **OLA und UC müssen mindestens so gut sein wie das SLA.** Sonst kann das Systemhaus seine Zusage nicht einhalten.' },
    { id: 'w04-q042', kind: 'single', skill: 'w.avvertrag', difficulty: 2, prompt: 'Die Elektro Krämer GmbH lässt ihre E-Mails mit Kundendaten bei einem **Cloud-Anbieter** hosten. Welcher Vertrag ist nach DSGVO vorgeschrieben?', options: ['Ein Auftragsverarbeitungsvertrag (Art. 28 DSGVO)', 'Ein Werkvertrag', 'Ein Leasingvertrag', 'Keiner, die Daten bleiben ja im Unternehmen'], answer: 0, distractors: { '1': { why: 'Der Werkvertrag regelt einen Erfolg, nicht den Datenschutz.', error: 'w-avv' }, '2': { why: 'Leasing betrifft die Überlassung von Gütern.', error: 'w-avv' }, '3': { why: 'Die Daten liegen beim Cloud-Anbieter – er verarbeitet sie im Auftrag.', error: 'w-avv' } }, explanation: 'Wer personenbezogene Daten **im Auftrag und nach Weisung** verarbeitet, braucht einen **AV-Vertrag** nach Art. 28 DSGVO.' },
    { id: 'w04-q043', kind: 'single', skill: 'w.avvertrag', difficulty: 2, prompt: 'Im AV-Vertrag zwischen Elektro Krämer GmbH und dem Cloud-Anbieter: Wer ist der **Verantwortliche**?', options: ['Die Elektro Krämer GmbH – sie entscheidet über Zweck und Mittel der Verarbeitung', 'Der Cloud-Anbieter, weil die Server bei ihm stehen', 'Die Aufsichtsbehörde', 'Jeder Kunde, dessen Daten gespeichert sind'], answer: 0, distractors: { '1': { why: 'Der Cloud-Anbieter ist Auftragsverarbeiter und handelt nur nach Weisung.', error: 'w-avv' }, '2': { why: 'Die Aufsichtsbehörde kontrolliert, sie verarbeitet keine Daten.', error: 'w-avv' }, '3': { why: 'Die Kunden sind die betroffenen Personen.', error: 'w-avv' } }, explanation: '**Verantwortlicher** = Auftraggeber (Elektro Krämer). **Auftragsverarbeiter** = Cloud-Anbieter. **Betroffene** = Kunden.' },
    { id: 'w04-q044', kind: 'number', skill: 'w.avvertrag', difficulty: 2, prompt: 'Vereinbart ist eine **Vertragsstrafe von 500 € je Tag** verspäteter Übergabe, **höchstens 5 % des Auftragswerts**. Der Auftrag hat **40.000 €**, die Übergabe erfolgt **7 Tage** zu spät. Wie hoch ist die Vertragsstrafe?', answer: 2000, tolerance: 0.01, unit: '€', misconceptions: [{ answer: '3500', error: 'w-vertragsstrafe-obergrenze', why: '7 × 500 € = 3.500 € liegt über der Obergrenze von 5 % (2.000 €).' }, { answer: '500', error: 'w-stueckzahl', why: 'Das ist die Strafe für einen Tag.' }], explanation: '7 × 500 € = 3.500 €. Obergrenze: 5 % × 40.000 € = 2.000 €. Es gilt der kleinere Wert: **2.000 €**.' },
  ],
};
