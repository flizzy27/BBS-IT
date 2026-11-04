# Inhalte erweitern (neue Module, Fachbereiche, AP2)

Die App ist so gebaut, dass sie die gesamte Ausbildung begleiten kann. Inhalte sind **reine Daten** (`src/content/modules/*.ts`) nach dem Schema in `src/content/types.ts`.

## Neues Modul anlegen

1. Datei `src/content/modules/<id>.ts` anlegen:
   ```ts
   import type { Module } from '../types';
   export const sec01: Module = {
     id: 'sec01', nr: 1, area: 'sicherheit', title: 'Schutzziele', short: '…', icon: 'Shield',
     relevance: 'ap1', prerequisites: [],
     skills: [{ id: 'sec.cia', module: 'sec01', title: 'Schutzziele benennen' }],
     lessons: [/* explain → visual → example → check → practice → summary */],
     questions: [/* mind. 30 Fragen, gemischte Formate */],
   };
   ```
2. In `src/content/index.ts` importieren und in `MODULES` eintragen.
3. Für einen neuen Fachbereich zusätzlich einen Eintrag in `AREAS` (z. B. `{ id: 'sicherheit', title: 'IT-Sicherheit', exams: ['AP1','AP2'] }`).
4. `npm test` ausführen – `tests/content.test.ts` prüft automatisch IDs, Skill-Verweise, Antwortindizes und dass jede Musterlösung als korrekt bewertet wird.

## Regeln für gute Inhalte

- Fachlich korrekt; Unsicheres weglassen oder kennzeichnen. Herstellerspezifisches benennen.
- Lektion: ausführliche Erklärung, Visualisierung, vollständig durchgerechnetes Beispiel, mind. eine Verständnisfrage, Zusammenfassung.
- AP1 hat nur offene Aufgaben → viele `number`, `ip`, `table`, `text`, `free`-Fragen.
- Bei Einfachauswahl `distractors` mit Erklärung und `error`-Kategorie angeben – das speist die Fehleranalyse.
- Strings sind Template-Literale: Backticks im Text als `` \` `` maskieren.

## Neuer Aufgabengenerator

In `src/core/generators.ts` ein `GeneratorMeta` ergänzen und in `GENERATORS` eintragen. Pflicht: exakte Lösung aus dem Rechenkern, `explanation` mit Lösungsweg, `misconceptions` für typische Fehler. `tests/ipv6-grading-generators.test.ts` prüft jeden Generator automatisch mit 120 Zufallsaufgaben (Musterlösung muss korrekt bewertet werden, Fehlbilder dürfen nicht korrekt sein).

## Visualisierungen

Generische Widgets: `topology` (Netzpläne), `sequence` (Protokollabläufe), `layers` (OSI/TCP-IP), `cards`, sowie spezielle (`subnet-bar`, `ip-binary`, `vlsm-boxes`, `ipv6-compress`, `mac-table`, `encapsulation`). Neue Widgets: Typ in `WidgetSpec` ergänzen, Komponente in `src/components/widgets.tsx`.

## Neuer Fragetyp

Typ in `types.ts`, Bewertung in `src/core/grading.ts`, Eingabe in `src/components/QuestionView.tsx` (`AnswerInput`), Test in `tests/`.
