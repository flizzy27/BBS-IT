# Implementierungsstand & Roadmap

Stand: 04.11.2026 · AP1 des Hauptnutzers: Ende Februar 2027

## Fertig und getestet

| Bereich | Stand |
|---|---|
| Inhalte | **7 Fachbereiche, 45 Module, 284 Lektionen, ~1.500 Pool-Fragen + ~400 Verständnisfragen, 329 Kompetenzen** |
| Aufgabengeneratoren | **74 Generatoren** (Subnetting, VLSM, IPv6, Einheiten, Routing, Stromkosten, USV, Speicher, Nutzwertanalyse, Kalkulation, Leasing, AfA, Netzplan, SLA/Verfügbarkeit, Pareto, Backup, Risiko, Brute-Force, chmod, NTFS-Rechte, Dateisysteme, Lizenzen, VM-Sizing, Pseudocode-Schreibtischtests, Arrays, Logik, Testfälle, SQL-Aggregate/Joins …). Jeder Generator wird automatisch mit 120 Zufallsaufgaben geprüft. |
| Genauigkeit | 71 automatisierte Testfälle; `tests/content.test.ts` prüft **jede** Frage (Musterlösung wird als korrekt bewertet, Fehlbilder nie, alle Verweise gültig). Pseudocode-Aufgaben wurden mit einem Interpreter, SQL-Aufgaben mit SQLite nachgerechnet. |
| Lernen / Üben / Schwachstellen | geführte Lektionen, adaptive Schwierigkeit, Spaced Repetition, Förderschleife, Fehleranalyse |
| Prüfung | Kurz-, Modul-, gemischte, Schwachstellen-, Rechentests, **AP1-Simulation komplett** (4 × 25 Punkte, Handlungssituationen, 90 min, IHK-Notenschlüssel), Netzwerk-Simulation, Einstufungstest |
| KI | „KI-Prompt kopieren“ überall (ChatGPT/Claude/Gemini/Copilot); optional eingebauter Tutor (lokal, Anthropic-API oder Claude-Code-CLI) |
| Hosting | GitHub Pages: https://flizzy27.github.io/BBS-IT/ (automatisch bei jedem Push) |
| Lokal | `start.bat`, SQLite, Sicherungen, Export/Import |

## Bekannte Grenzen (ehrlich)

- Für einzelne AP1-Termine gibt es **keine öffentlichen Aufgaben** – die Simulation folgt Prüfungskatalog, Lernfeldern und Themenstatistiken, nicht Originalprüfungen. Kalibrierung mit echten Ergebnissen steht aus.
- Freitextaufgaben: Selbsteinschätzung oder KI-Bewertung, nicht algorithmisch.
- Inhalte wurden überwiegend KI-gestützt erstellt, automatisch auf Konsistenz und Rechenrichtigkeit geprüft und stichprobenartig gelesen. Unsichere Fakten (z. B. GWG-Grenzen 2027, BSI Grundschutz++, AI-Act-Fristen, Microsoft-Lizenzdetails) sind in den Lektionen gekennzeichnet. **Fachliches Gegenlesen durch Lehrkraft/Ausbilder empfohlen.**
- AP1-Relevanz von SQL/Datenbanken ist widersprüchlich belegt (IHK Hannover: AP2; Verlagsstatistik: AP1) → als „AP1 teilweise/Vertiefung“ markiert.
- Desktop-optimiert; Smartphone nur eingeschränkt.

## Nächste Schritte

1. **Material-Ordner** regelmäßig scannen (`.claude/agents/material-scanner.md`) und neue Inhalte übernehmen.
2. **Fehlerkatalog** um die neuen Fehlerkategorien der Fachbereiche ergänzen (z. B. `chmod-wertigkeit`, `rechte-maximum-statt-minimum`, `sla-prozent`) – aktuell werden sie generisch angezeigt.
3. Eigene Widgets für neue Bereiche (z. B. interaktiver Pseudocode-Schreibtischtest, Nutzwertanalyse-Tabelle, UML-Diagramme als SVG).
4. Kalibrierung der AP1-Simulation nach der Prüfung (Februar 2027) mit echten Ergebnissen der Klasse.
5. **AP2 FISI**: Fachbereiche „Konzeption & Administration von IT-Systemen“, „Analyse & Entwicklung von Netzwerken“ (u. a. RAID, Routingprotokolle, Monitoring), WiSo (MC-Format!), Projektarbeit & Fachgespräch.
6. Mobile Optimierung, PDF-Export von Testauswertungen.
