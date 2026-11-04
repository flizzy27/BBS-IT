# Implementierungsstand & Roadmap

Stand: 04.11.2026

## Fertig und getestet

| Bereich | Stand |
|---|---|
| Rechenkern IPv4/Subnetting/VLSM/IPv6/Einheiten | vollständig, 90+ automatisierte Tests inkl. 2.000 Zufallsprüfungen und Validierung von VLSM-Plänen |
| Aufgabengeneratoren | 26 Generatoren (Binär, Masken, Netz/Broadcast, Hosts, Subnetze, n-tes Subnetz, Tabellen, VLSM, IPv6, Einheiten, Übertragungszeit, Routing/LPM); jeder Generator wird mit 120 Zufallsaufgaben gegen die eigene Musterlösung geprüft |
| Inhalte | 16 Module, ~105 Lektionen, ~700 Fragen; automatischer Test prüft IDs, Verweise, Antwortindizes und dass jede Musterlösung als korrekt bewertet wird |
| Lernmodus | geführte Lektionen, schrittweises Aufdecken von Beispielen, Verständnisfragen blockieren das Weiterklicken, Fortschritt & Fortsetzen |
| Üben / Schwachstellen | adaptive Schwierigkeit, Spaced Repetition, Förderschleife, Fehleranalyse mit Wiederholungslink |
| Prüfung | Kurz-, Modul-, gemischte, Schwachstellen-, Rechen- und AP1-Simulation (90 min, 100 Punkte, IHK-Notenschlüssel), Einstufungstest, Auswertung mit Lösungsweg |
| VLSM-Trainer | generierte Aufgaben mit Diagramm, eigene Aufgaben, Aufgaben aus Bild (KI, korrigierbar), alternative Lösungen werden akzeptiert |
| Werkzeuge | Subnetzrechner, Maskentabelle, Binär/Hex, VLSM-Planer, IPv6, Einheiten/Übertragung/Energie, Ports |
| KI-Tutor | Anthropic-API (Streaming, Caching, strukturierte Ausgaben) und Claude-Code-CLI; Kontext: Aufgabe, Antwort, exakte Bewertung, Kenntnisstand, Fehler; Freitextbewertung; Bildanalyse. CLI-Variante end-to-end getestet. |
| Datenhaltung | SQLite lokal, tägliche Sicherung, Export/Import, Zurücksetzen; statische Variante mit Browser-Speicher |
| Betrieb | `start.bat`/`stop.bat`/`update.bat`, GitHub-Actions für Tests und GitHub-Pages-Hosting |

## Bekannte Grenzen (ehrlich)

- **AP1-Simulation deckt nur den Netzwerkanteil ab.** Die echte AP1 enthält weitere Bereiche (Hardware/Software, IT-Sicherheit, Datenschutz, Wirtschaftlichkeit, Energie, Kundenkommunikation, Pseudocode …). Ein Bestehen der Netzwerk-Simulation ist deshalb **kein** Nachweis für das Bestehen der gesamten AP1.
- Für einzelne AP1-Termine sind **keine öffentlichen Themenlisten** auffindbar (Aufgaben werden nicht veröffentlicht, siehe `docs/AP1-PRUEFUNGSANALYSE.md`). Gewichtungen der Simulation sind daher aus dem Prüfungskatalog abgeleitet, nicht aus Originalprüfungen.
- Freitextaufgaben werden per Selbsteinschätzung oder als gekennzeichnete KI-Bewertung bewertet – nicht algorithmisch.
- Die Anthropic-API-Anbindung ist implementiert, aber ohne API-Schlüssel nicht live getestet (die CLI-Variante wurde live getestet).
- Inhalte der Module 1, 2, 7–15 wurden mit KI-Unterstützung erstellt, automatisch auf Konsistenz geprüft und stichprobenartig gelesen; unsichere Fakten sind in den Lektionen gekennzeichnet. Ein fachliches Review durch Ausbilder/Lehrkraft ist empfehlenswert.
- Die Oberfläche ist für Desktop optimiert; auf dem Smartphone nur eingeschränkt nutzbar.

## Nächste Schritte (empfohlen)

1. **Weitere AP1-Fachbereiche** als Module ergänzen, damit die Simulation die komplette AP1 abbildet:
   - IT-Sicherheit & Datenschutz (Schutzbedarf, BSI-Grundschutz, DSGVO, TOM)
   - Hardware & Arbeitsplatz (Komponenten, Schnittstellen, Energieeffizienz, USV)
   - Software, Betriebssysteme, Lizenzen, Cloud-Modelle
   - Wirtschaft (Angebotsvergleich, Nutzwertanalyse, Kalkulation, Kaufvertrag)
   - Programmierung/Pseudocode-Grundlagen, Qualitätssicherung, Kundenkommunikation
   Danach eine **„AP1 komplett“-Simulation** mit Gewichtung nach Prüfungskatalog.
2. Kalibrierung: eigene Ergebnisse aus Simulation und echter AP1 vergleichen und die Schwierigkeit anpassen.
3. AP2-Fachbereiche (FISI: Netzwerkanalyse und -entwicklung, Betrieb, WiSo).
4. Druck-/PDF-Export von Testauswertungen; Lernkarten-Export.
5. Mobile Optimierung.
