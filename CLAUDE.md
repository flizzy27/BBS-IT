# CLAUDE.md – Projektkontext für Claude Code

## Projekt
**FISI Academy** – Lernplattform zur Vorbereitung auf die IHK-Prüfungen der Fachinformatiker Systemintegration (FISI).
Repository: https://github.com/flizzy27/BBS-IT · Web-Version (GitHub Pages): https://flizzy27.github.io/BBS-IT/

## Nutzer & Ziele
- Nutzer: Marcel, FISI-Azubi im **2. Ausbildungsjahr**, IHK **Koblenz**, Berufsschule nur **mittwochs**. Kommunikation auf **Deutsch**.
- **AP1 („Einrichten eines IT-gestützten Arbeitsplatzes“) Ende Februar 2027** – danach AP2 FISI.
- Ziel 90–100 Punkte. Produkt soll an **Mitschüler** weitergegeben werden → GitHub Pages ist der Hauptweg (kostenlos, statisch, Lernstand im Browser).
- Es soll **alles** abgedeckt werden, was in AP1 (und später AP2) vorkommt – nicht nur Netzwerk.
- Wer die Simulation in der App besteht, soll auch die IHK-Prüfung bestehen (realistisch: 90 Min., nur offene Aufgaben, 100 Punkte, IHK-Notenschlüssel 92/81/67/50/30).
- In-App-KI-Tutor wird von Mitschülern kaum genutzt → wichtiger ist der Knopf **„KI-Prompt kopieren“** an jeder Aufgabe (Prompt mit Aufgabe, Antwort, exakter Lösung für ChatGPT/Claude/Gemini).
- UI soll sehr hochwertig aussehen.

## Arbeitsweise (vom Nutzer gewünscht)
- **Autonom arbeiten**, nicht nach Erlaubnis fragen; selbst recherchieren und neue Aufgaben/Lernziele finden.
- **Nach jeder Änderung committen und auf GitHub pushen** (`main`), ohne vorher auf Tests zu warten.
- **Lösungen müssen IMMER exakt stimmen**: Rechenaufgaben nur algorithmisch (src/core), jede Inhaltsänderung mit `npm test` absichern.
- Subagents: **Haiku** für Lese-/Rechercheaufgaben, **Opus** für Code und komplexe Inhalte (siehe `.claude/agents/`).
- Ordner `material/` (lokal, NICHT im Repo – urheberrechtlich geschützte Schulunterlagen): regelmäßig auf neue Dateien prüfen (`docs/MATERIAL-LOG.md` vergleichen), Sinnvolles als Themen/Lernziele/Aufgaben übernehmen (nur paraphrasieren, nichts kopieren), Auswertung in `docs/material/`.
- Original-IHK-Prüfungen sind urheberrechtlich geschützt: nur Themen/Aufgabentypen ableiten, keine Texte übernehmen.

## Technik
- React 18 + TypeScript + Vite, Hash-Router, Designsystem in `src/styles.css`, Icons lucide-react.
- `src/core/` Rechenkern + Generatoren + Bewertung + Lernmodell (getestet), `src/core/gen/<bereich>.ts` bereichsspezifische Generatoren.
- `src/content/` Inhalte als Daten: `types.ts` (Schema), `index.ts` (AREAS + MODULES registrieren), `modules/*.ts`.
- Datenschicht: `src/lib/api.ts` → lokaler Node-Server (`server/`, SQLite via node:sqlite) **oder** automatisch Browser-Speicher (`src/lib/localBackend.ts`) in der statischen Version.
- GitHub Actions: `ci.yml` (Tests, Typecheck, Build), `pages.yml` (baut mit `VITE_STATIC=1 vite build --base=./` und veröffentlicht nach Branch `gh-pages`).
- Windows-Hinweis: In Git-Bash keine absoluten `--base=/x/`-Pfade verwenden (werden in Windows-Pfade umgewandelt) → `--base=./`.

## Befehle
```bash
npm install
npm run dev        # Vite + API-Server
npm test           # Vitest: Rechenkern, Generatoren, alle Inhalte (Pflicht vor Abschluss)
npm run typecheck
npx vite build
```
Einzelne Inhaltsdatei prüfen: `npx tsc --noEmit --strict --skipLibCheck --ignoreConfig --moduleResolution bundler --module esnext --target es2022 --jsx react-jsx <datei>` (TypeScript 7 verlangt `--ignoreConfig` bei Einzeldateien).

## Inhalte erweitern
Siehe `docs/INHALTE-ERWEITERN.md` und den ausführlichen Agent-Brief `docs/CONTENT-BRIEF.md`.
Fachbereiche (AREAS): netzwerk (m01–m16), hardware (h*), systeme (b*), sicherheit (s*), programmierung (p*), wirtschaft (w*), daten (d*).

## Wichtige Dokumente
- `docs/ROADMAP.md` – Stand, Grenzen, nächste Schritte
- `docs/AP1-RELEVANZ.md`, `docs/AP1-PRUEFUNGSANALYSE.md`, `docs/AP-QUELLEN-UND-THEMEN.md` – Recherche zu Prüfung, Katalog, Lernfeldern
- `docs/material/MATERIAL-AUSWERTUNG.md`, `docs/MATERIAL-LOG.md` – Auswertung des Unterrichtsmaterials
- `docs/ARCHITEKTUR.md`, `docs/LERNMODELL.md`, `docs/KI-TUTOR.md`
