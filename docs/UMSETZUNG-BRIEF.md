# Umsetzungsauftrag: Inhalte aus dem Unterrichtsmaterial einarbeiten

Für Inhalts-Agents (ein Agent je Fachbereich). Zuerst lesen: `CLAUDE.md`, `docs/CONTENT-BRIEF.md` (Format, Qualität, Prüfschritte), `src/content/types.ts`, die Auswertungen in `docs/material/` (dein Auftrag nennt die wichtigsten) und deine Moduldateien.

## Wer die App nutzt – und was daraus folgt
FISI-Azubis im 2. Ausbildungsjahr, AP1 Ende Februar 2027. Der Hauptnutzer sagt über sich: **„Es muss einfach erklärt sein, sodass ich es auf jeden Fall verstehe.“** Die App funktioniert wie eine Fahrschul-App: Lernen (Lektionen) → Fragenkatalog beantworten, bis jede Frage zweimal richtig war → Prüfungssimulation. Daraus folgt:

1. **Jede Lektion bekommt das Feld `simple`** („Kurz & einfach“, steht oben in der Lektion und erscheint im Fragenkatalog nach einer falschen Antwort):
   - 3–6 kurze Sätze, du-Form, **ein Vergleich aus dem Alltag** (z. B. Subnetzmaske = Postleitzahl-Teil der Adresse; Firewall = Türsteher mit Gästeliste; Nutzwertanalyse = Testbericht mit Punkten, bei dem wichtige Kriterien mehr zählen).
   - Kein Fachwort ohne Erklärung in Klammern. Keine Schachtelsätze. Zahlen nur, wenn sie das Verständnis tragen.
   - Letzte Zeile: `**Merke:** …` (ein Satz, das Wichtigste für die Prüfung).
   - Fachlich korrekt bleiben – ein Vergleich darf vereinfachen, aber nichts Falsches behaupten.
2. **Bestehende Erklärungen verständlicher machen**, wo nötig: Fachbegriffe beim ersten Auftreten erklären, lange Sätze teilen, Rechenwege vollständig zeigen (jeden Zwischenschritt, Einheiten mitschreiben). Inhalt nicht kürzen, nur klarer machen.
3. **Fragen-`explanation` so schreiben, dass man den Fehler versteht**: erst das Ergebnis, dann der Weg in Schritten, bei typischen Fehlern ein Satz „Häufiger Fehler: …“.

## Was aus dem Material übernommen wird
- Die Lückenlisten (P1 vor P2; P3 = AP2, nur wenn ausdrücklich beauftragt) aus den Auswertungen in `docs/material/` umsetzen: neue Lektionen, Fragen (überwiegend **offene Formate** wie in der AP1: `number`, `text`, `table`, `free`, `order`, `match`), Generatoren für Rechenmuster.
- **AP1-Aufgabenmix laut Prüfungsbuch** (`docs/material/PV-AP1.md`): 45 % Erläutern/Beurteilen (Freitext), 18 % Zeichnen/Modellieren, 16 % Tabellen/Vergleiche, 11 % Rechnen, 7 % Englisch. Zeichenaufgaben (Netzplan, Gantt, UML, EPK/Aktivitätsdiagramm) als `order`/`match`/`table` plus `free` mit Prüfliste in der `modelAnswer` umsetzen.
- **Belegaufgaben**: Handlungssituation + Beleg als Markdown-Tabelle (Angebot, Datenblatt, Preisliste) – die Werte selbst ausdenken, nie aus dem Buch abschreiben.
- **Urheberrecht**: Nichts wörtlich aus Büchern oder fremden Websites übernehmen. Eigene Formulierungen, eigene Zahlen, eigene Szenarien (Elektro Krämer GmbH oder Kunden des IT-Systemhauses).
- **Widersprüche**, die eine Auswertung als App-Fehler markiert, beheben. Wo das Buch irrt (in den Auswertungen markiert), bleibt die App beim korrekten Stand – ggf. Hinweis „Manche Bücher schreiben …, korrekt ist …“, wenn Lernende das Buch kennen.
- **Nichts Unnötiges**: Was weder in AP1 noch in AP2 FISI geprüft wird, kommt nicht hinein. Struktogramm/PAP sind seit dem Prüfungskatalog 2025 aus der AP1 entfallen → nicht ausbauen; vorhandene Inhalte dazu als `vertiefung` kennzeichnen. SQL und RAID sind AP2.

## Dateien, Tests, Abschluss
- Nur die Dateien ändern, die dein Auftrag nennt (deine Module, deine Generatordatei `src/core/gen/<bereich>.ts`, neue Moduldateien). **Nicht** `src/content/index.ts` oder `src/core/generators.ts` ändern – neue Module/Generatordateien meldest du im Abschlussbericht, das Einbinden übernimmt der Hauptentwickler. Nicht committen.
- Neue Fehlerkategorien (`error`-Slugs in `misconceptions`/`distractors`) im Abschlussbericht auflisten (Slug + kurzer Titel + Ursache) – sie werden zentral in `src/core/errors.ts` ergänzt.
- Prüfen: `npx tsc --noEmit -p tsconfig.json` und `npx vitest run tests/content.test.ts`. Andere Agents arbeiten gleichzeitig an anderen Bereichen: Fehler in **fremden** Dateien ignorieren, eigene beheben. Neue, noch nicht registrierte Module prüfst du mit einer temporären Testdatei (siehe CONTENT-BRIEF) und löschst sie danach.
- Rechenlösungen mit node nachrechnen. Jede Musterlösung muss von `grade()` als korrekt bewertet werden, kein Fehlbild darf als korrekt gelten.
- Abschlussbericht (max. 30 Zeilen): geänderte/neue Dateien, je Modul Anzahl Lektionen/Fragen/Generatoren vorher → nachher, umgesetzte Lücken, bewusst weggelassene Punkte mit Grund, neue Fehler-Slugs, unsichere Fakten.
