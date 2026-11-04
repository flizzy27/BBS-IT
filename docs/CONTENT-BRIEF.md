# Brief für Inhalts-Agents (FISI Academy)

Projekt (dieses Repository) – React/TypeScript-Lernapp für die IHK-Prüfungen der Fachinformatiker Systemintegration (FISI). Wird von einer ganzen Berufsschulklasse genutzt (2. Ausbildungsjahr). Nächste Prüfung: **AP1 „Einrichten eines IT-gestützten Arbeitsplatzes“ Ende Februar 2027** (90 Min., 20 %, bundeseinheitlich, NUR offene Aufgaben – kein Multiple Choice – oft zu einer Handlungssituation mit Belegen wie Datenblättern, Angeboten, Tabellen). Ziel: Wer in der App besteht, soll auch die IHK-Prüfung bestehen.

## Pflichtlektüre zuerst
- `src/content/types.ts` – Datenmodell (Module, Lektionen, Schritte, Fragen, Widgets). Exakt einhalten.
- `src/content/modules/m03.ts` und `m16.ts` – Beispiele für Stil, Tiefe und Struktur.
- `docs/AP1-RELEVANZ.md` (Katalogstichworte Abschnitt 3) und, falls schon vorhanden, `docs/AP-QUELLEN-UND-THEMEN.md` und `docs/material/MATERIAL-AUSWERTUNG.md`.
- `src/core/generators.ts` – Aufbau eines Aufgabengenerators (`GeneratorMeta`, `Rng`, `misconceptions`, Lösungsweg in `explanation`).

## Was du lieferst
- Module als Dateien `src/content/modules/<id>.ts`, jeweils `export const <id>: Module = {...}` mit `import type { Module } from '../types';` und **`area: '<bereich-id>'`** (siehe dein Auftrag).
- Optional (sehr erwünscht bei Rechenthemen): Generatoren in **`src/core/gen/<bereich-id>.ts`** mit `export const GENERATORS_<BEREICH>: GeneratorMeta[] = [...]` (`import type { GeneratorMeta } from '../generators'; import { Rng } from '../rng';`). Generator-`id`s mit Bereichspräfix (z. B. `w.nutzwert`), `skill` muss ein Skill aus deinen Modulen sein, `module` die Modul-ID. Lösungen IMMER exakt berechnen (keine Rundungsfallen: Rundungsregel im Aufgabentext nennen, `tolerance` passend setzen), `misconceptions` für typische Fehler. Verweise auf Generatoren in `practice`-Schritten und im Feld `generators` des Moduls.
- Ändere KEINE anderen Dateien (insbesondere nicht `src/content/index.ts` oder `generators.ts` – das Einbinden übernimmt der Hauptentwickler). Andere Agents schreiben parallel andere Bereiche.

## Qualitätsanforderungen
- **Fachlich absolut korrekt**, Stand 2026 (z. B. DSGVO, BGB, HGB, BSI-IT-Grundschutz-Kompendium, aktuelle Schnittstellen-Standards). Unsicheres weglassen oder kennzeichnen. Bei Recht: keine Rechtsberatung, aber korrekte Grundbegriffe mit Paragraphen, wo sicher.
- `relevance` ehrlich: 'ap1' / 'ap1-teilweise' / 'vertiefung' (AP2/Praxis).
- Deutsch, du-Form, geduldiger IT-Ausbilder, von Grund auf erklärt, realistische Handlungssituationen in der fiktiven „Elektro Krämer GmbH“ (Standorte Hamburg/Berlin, ~120 Mitarbeitende) oder bei Kunden des IT-Systemhauses.
- Jede Lektion: Erklären (ausführlich, Tabellen) → Visualisieren (Widget `cards`, `topology`, `sequence`, `layers` …) → vollständig durchgerechnetes Beispiel (`example` mit Schritten) → 1–3 `check`-Fragen → `practice` (Generator oder questionIds) → `summary`. 4–7 Lektionen pro Modul.
- Fragenpool je Modul ≥ 30, **überwiegend offene Formate** wie in der AP1: `number` (mit `unit`, `tolerance`), `text` (mehrere `accept`-Varianten), `table`, `free` (prüfungsnah „Erläutern Sie …“, mit `modelAnswer` + `keywords`), `order`, `match`; dazu einige `single`/`multi` mit `distractors` (Erklärung + `error`-Slug). Jede Frage mit gutem `explanation` (Begründung + Lösungsweg), meist 1–3 `hints`. Schwierigkeit 1/2/3 gemischt. Mehrere Belege-Aufgaben (z. B. Angebotstabelle im Prompt als Markdown-Tabelle, Datenblatt-Auszug).
- IDs: Lektionen `<modul>-l01`…, Pool-Fragen `<modul>-q001`…, Check-Fragen `<modul>-c01`… – global eindeutig.
- Strings als Template-Literale; Backticks im Text als \` und `${` als \${ maskieren.
- Jede Rechenantwort mit node nachrechnen.

## Prüfen vor Abgabe
- Typprüfung je Datei: `npx tsc --noEmit --strict --skipLibCheck --ignoreConfig --moduleResolution bundler --module esnext --target es2022 --jsx react-jsx src/content/modules/<id>.ts` (bzw. Generator-Datei). Fehler beheben.
- Eigenes Prüfskript (in einem temporären Ordner außerhalb des Repos): IDs eindeutig, Skill-Verweise existieren, Antwortindizes gültig, practice-questionIds existieren, `grade()` aus `src/core/grading.ts` bewertet jede Musterlösung als korrekt (du kannst mit `npx vitest run` eine temporäre Testdatei im Ordner `tests/` anlegen und danach WIEDER LÖSCHEN, oder `npx tsx` nutzen).
- Generatoren: für 50 Seeds je Schwierigkeit prüfen, dass die Musterlösung korrekt bewertet wird und kein Fehlbild der richtigen Antwort entspricht.

Abschlussbericht (kurz): Dateien, Anzahl Lektionen/Fragen/Skills/Generatoren je Modul, unsichere Fakten.
