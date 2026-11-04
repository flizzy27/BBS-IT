# Architektur

## Technikentscheidung

| Anforderung | Entscheidung | Begründung |
|---|---|---|
| Windows 11, einfache Installation | **Lokale Web-App**: Node.js-Server + React-Oberfläche, Start per `start.bat`, Anzeige als Edge-App-Fenster | Keine nativen Build-Tools nötig (anders als Electron/Tauri), läuft in Sekunden, gleiches Projekt auch als Webseite hostbar |
| Moderne, schnelle UI | React 18 + TypeScript + Vite, eigenes Designsystem (`src/styles.css`), Icons: lucide-react | schnell, typsicher, wartbar |
| Lokale Speicherung | SQLite über das in Node eingebaute `node:sqlite` | keine nativen Zusatzpakete, robuste Transaktionen, tägliche Sicherung |
| Hosting (GitHub Pages) | Gleicher Code; ohne Server fällt die Datenschicht automatisch auf Browser-Speicher zurück (`src/lib/localBackend.ts`) | ein Codebestand für beide Varianten |
| Exakte Bewertung | Rechenkern in reinem TypeScript (`src/core`), vollständig getestet | KI entscheidet nie über Richtigkeit |
| KI-Tutor | Offizielles Anthropic-SDK serverseitig; alternativ Claude-Code-CLI (`claude -p`) | Schlüssel bleibt auf dem Server, nie im Browser/Code |

## Verzeichnisstruktur

```
server/              Node-Server (nur 127.0.0.1)
  index.mjs          REST-API + Auslieferung der gebauten Oberfläche
  db.mjs             SQLite-Schema, Sicherungen
  ai.mjs             KI-Anbieter (Anthropic-API / Claude-Code-CLI)
  tutor-prompt.mjs   System-Prompts, JSON-Schemata
src/
  core/              Rechenkern (ohne UI, vollständig getestet)
    ipv4.ts          Adressen, Masken, Netz/Broadcast, Klassifizierung, Binär
    vlsm.ts          Musterlösung + Validierung beliebiger Adresspläne
    ipv6.ts          Kürzen (RFC 5952), Expandieren, Typen, Subnetze
    grading.ts       Bewertung aller Fragetypen + Fehlerdiagnose
    generators.ts    26 Aufgabengeneratoren (Seed-basiert, mit Lösungsweg)
    learning.ts      Lernmodell (Kompetenzstufen, Spaced Repetition)
    errors.ts        Fehlerkatalog mit Ursachen und Wiederholungsempfehlung
    units.ts         Einheiten/Übertragungszeit (Werkzeuge)
  content/
    types.ts         Datenmodell für Module, Lektionen, Fragen, Widgets
    index.ts         Registrierung aller Fachbereiche und Module
    modules/m01…m16  Lerninhalte als Daten
  components/        QuestionView, TutorPanel, Widgets (Visualisierungen)
  pages/             Dashboard, Lernen, Üben, Prüfung, VLSM, Werkzeuge, …
  lib/               API-Client, globaler Zustand, Empfehlungslogik
tests/               Vitest: Rechenkern, Generatoren, alle Inhalte
docs/                Dokumentation & Recherche
```

## Datenfluss

1. Die Oberfläche lädt beim Start `/api/state` (Kompetenzen, Einstellungen, Lektionsfortschritt, letzte Sitzung).
2. Eine Aufgabe wird aus dem Fragenpool oder einem Generator erzeugt.
3. `grade()` bewertet **im Browser** deterministisch und liefert Fehlerkategorien.
4. `applyEvidence()` aktualisiert den Kompetenzzustand; Versuch + Zustand werden per `POST /api/attempts` gespeichert.
5. Der Tutor erhält auf Wunsch den Lernkontext (Aufgabe, Antwort, exakte Bewertung, Kenntnisstand) und streamt die Antwort per Server-Sent Events.

## Datenbank (data/academy.db)

| Tabelle | Inhalt |
|---|---|
| `attempts` | jede bearbeitete Aufgabe: Frage (vollständig), Antwort, richtig/Teilpunkte, Fehlerkategorien, Tipps, Dauer, Modus, Test-ID |
| `skill_state` | Kompetenzzustand je Skill (JSON, siehe LERNMODELL.md) |
| `tests` | abgeschlossene Tests inkl. aller Aufgaben und Punkte |
| `threads`, `messages` | Tutor-Gespräche inkl. mitgesendetem Kontext |
| `study_time` | Lernzeit pro Tag |
| `kv` | Einstellungen, Lektionsfortschritt, letzte Sitzung, KI-Konfiguration |

API-Schlüssel liegen getrennt in `data/secrets.json` (oder Umgebungsvariable) und werden nie an den Browser zurückgegeben.

## Sicherheit

- Server lauscht nur auf `127.0.0.1`; Anfragen mit fremdem `Host`-/`Origin`-Header werden abgewiesen (Schutz vor DNS-Rebinding/CSRF).
- `data/`, `.env` sind in `.gitignore`.
