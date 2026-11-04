# Lernmodell

Der Fortschritt basiert auf **nachgewiesenem Verständnis** (Antworten), nicht auf abgeschlossenen Lektionen. Umsetzung: `src/core/learning.ts`.

## Kompetenzen (Skills)

Jedes Modul definiert fein granulare Skills (z. B. `ipv4.broadcast`, `subnet.hosts2prefix`). Jede Aufgabe prüft genau einen Skill. Skills können Voraussetzungen haben (`requires`), damit der Tutor fehlende Grundlagen erkennt.

## Zustand je Skill

| Feld | Bedeutung |
|---|---|
| `mastery` 0..1 | Beherrschungsgrad (gleitender Mittelwert der Belege) |
| `intervalDays`, `due`, `ease` | Wiederholungsplanung (angelehnt an SM-2) |
| `streak` | richtige Antworten ohne Tipps in Folge |
| `successDays` | Tage mit richtiger Lösung ohne Hilfe |
| `recentErrors` | Fehlerkategorien der letzten Versuche |
| `stage` | Kompetenzstufe (s. u.) |

## Aktualisierung pro Antwort

| Ergebnis | Beherrschung | Intervall | Leichtigkeit |
|---|---|---|---|
| richtig ohne Tipp | Richtung 1,0 (Gewicht 0,25 + 0,05 × Schwierigkeit) | 1 → 3 → Intervall × Leichtigkeit | +0,1 (max 3,0) |
| richtig mit Tipp | Richtung 0,6 (Gewicht 0,15) | max. 2 Tage | −0,05 |
| falsch | Richtung (Teilpunkte × 0,5) (Gewicht 0,3) | 0 → in 10 Min. erneut | −0,2 (min 1,3) |

Prüfungen zählen mit Gewicht 1,2, der Einstufungstest mit 1,5.

**Abrufwahrscheinlichkeit:** Ist eine Wiederholung überfällig, sinkt der geschätzte Kenntnisstand: `R = 0,5 ^ (Tage überfällig / Intervall)`. Angezeigter Kenntnisstand = `mastery × R`.

## Kompetenzstufen

| Stufe | Bedingung |
|---|---|
| Noch nie gelernt | keine Versuche, Lektion nicht abgeschlossen |
| Gerade verstanden | Lektion abgeschlossen bzw. erste Versuche |
| Löst mit Hilfestellung | richtige Antworten vorhanden, Beherrschung ≥ 0,3 |
| Löst ohne Hilfe | ≥ 2 richtige ohne Tipp in Folge, Beherrschung ≥ 0,6 |
| Sicher beherrscht | Beherrschung ≥ 0,85, Erfolge an ≥ 2 Tagen, Intervall ≥ 6 Tage |
| Wieder vergessen | war beherrscht, aber Abruf < 50 % oder Rückfall |

## Förderschleife

Sind 2 der letzten 4 Versuche falsch, schlägt das System eine Förderschleife vor:
1. kurze Wiederholung (Zusammenfassung der Lektion)
2. neue Erklärung (Lektionstext oder Tutor mit anderer Herangehensweise)
3. leichte Übungen (Schwierigkeit 1)
4. Steigerung, sobald die Grundlage sitzt (`nextDifficulty`)
5. spätere Überprüfung über das Wiederholungsintervall

## Variierte Aufgaben

Rechenaufgaben stammen bevorzugt aus Generatoren (`src/core/generators.ts`) – jede Aufgabe ist eine neue Variante mit exakt berechneter Lösung, Lösungsweg und typischen Fehlbildern. So wird das Verfahren gelernt, nicht die Antwort.

## Fehlerkategorien

`src/core/errors.ts` beschreibt bekannte Denkfehler (z. B. `broadcast-naechstes-netz`, `reservierte-vergessen`, `vlsm-not-aligned`) mit Ursache und passender Wiederholungslektion. Generatoren hinterlegen pro Aufgabe die konkreten falschen Antworten, die zu einem Denkfehler gehören – so wird z. B. erkannt, dass `.224` statt `.223` die nächste Netzadresse statt des Broadcasts ist.
