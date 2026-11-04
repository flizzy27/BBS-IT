# FISI Academy – Lernplattform für die IHK-Prüfungen (Fachinformatiker Systemintegration)

Interaktive Lernsoftware für die Ausbildung **Fachinformatiker/-in Systemintegration**. Sie bereitet systematisch auf die **IHK-Abschlussprüfung Teil 1 (AP1)** vor – mit **allen Fachbereichen** – und wird schrittweise um AP2 erweitert.

**➡ Direkt im Browser nutzen (kostenlos, ohne Installation): https://flizzy27.github.io/BBS-IT/**
Der Lernstand wird im Browser gespeichert (Sicherung unter *Einstellungen → Export*).

| Fachbereich | Module |
|---|---|
| Netzwerktechnik | 16 (Grundlagen, OSI, Binär, IPv4, Subnetting, VLSM, IPv6, Switching/VLAN, Routing, Protokolle, Dienste, Verkabelung/WLAN, Diagnose, Sicherheit, Berechnungen, Prüfungspraxis) |
| IT-Systeme, Hardware & Energie | 5 |
| Betriebssysteme, Software, Cloud, Qualität & Service | 6 |
| IT-Sicherheit & Datenschutz | 5 |
| Programmierung & Softwareentwicklung | 5 |
| Kundenberatung, Wirtschaft & Recht | 5 |
| Datenbanken | 3 |

Insgesamt 45 Module, 284 Lektionen, rund 1.900 Fragen und 74 Aufgabengeneratoren für unbegrenzt viele Rechenaufgaben.

**Kernprinzip:** Alle Rechenaufgaben werden **algorithmisch exakt** erzeugt und bewertet. Die KI erklärt und unterstützt – sie entscheidet nie allein, ob eine Antwort richtig ist.

> Stand und offene Punkte: siehe [docs/ROADMAP.md](docs/ROADMAP.md).

## Funktionen

| Bereich | Was du bekommst |
|---|---|
| **Dashboard** | Kenntnisstand (aus nachgewiesenem Verständnis), Lernzeit gesamt/Woche, Lernserie, Wissenslücken, beherrschte Themen, fällige Wiederholungen, Entwicklung der Prüfungsleistung, empfohlene nächste Einheit, „Weitermachen“ |
| **Lernen** | 16 Module, ~100 Lektionen nach dem Muster *Erklären → Visualisieren → durchgerechnetes Beispiel → Verständnisfrage → Übung → Zusammenfassung*. Weiter geht es erst, wenn die Verständnisfrage beantwortet ist. |
| **Subnetting-Trainer** | Interaktiver Subnetz-Balken (/24 → /25 → /26 …), Bitansicht mit Netz-, Subnetz- und Hostbits, anklickbare Bits, reservierte Adressen, Hostbereiche |
| **VLSM-Trainer** | Automatisch generierte Mehrstandort-Aufgaben mit Netzwerkdiagramm, eigene Aufgaben, Aufgaben aus **hochgeladenen Bildern** (KI-Erkennung, vom Nutzer prüf- und korrigierbar). Jeder korrekte Plan wird akzeptiert. |
| **Üben** | Tipps, sofortige Auswertung, adaptive Schwierigkeit, immer neue Aufgabenvarianten |
| **Schwachstellen** | Spaced Repetition, Förderschleife bei wiederholten Fehlern (Wiederholung → neue Erklärung → leichte Übung → steigern) |
| **Prüfung & Tests** | Kurztests, Modultests, gemischte Tests, Schwachstellen-Test, Rechen-Marathon, **AP1-Simulation komplett** (wie die echte Prüfung: 4 Aufgaben à 25 Punkte zu je einer Handlungssituation, nur offene Aufgaben, 90 min, IHK-Notenschlüssel), Netzwerk-Simulation, Einstufungstest |
| **Antwortformate** | Einfach-/Mehrfachauswahl, Freitext, Zahl, IP-Adresse, CIDR, Tabellen, Zuordnung, Reihenfolge, VLSM-Pläne mit Diagramm |
| **Auswertung** | deine Antwort, korrekte Lösung, Begründung, vollständiger Lösungsweg, **Fehleranalyse** (z. B. „nächste Netzadresse statt Broadcast“), Wiederholungsempfehlung |
| **KI-Prompt kopieren** | An jeder Aufgabe, jedem Ergebnis und jedem Lernabschnitt: fertiger Prompt (inkl. exakter Lösung) für ChatGPT, Claude, Gemini, Copilot – „Nur Denkanstoß“, „Fehler analysieren“, „Ähnliche Aufgaben“, „Anders erklären“ |
| **KI-Tutor (lokal, optional)** | Chat direkt neben jeder Aufgabe; kennt Aufgabe, deine Antwort, die exakte Bewertung, deinen Kenntnisstand und typische Fehler; „Stopp, das verstehe ich nicht“ |
| **Werkzeuge** | Subnetzrechner, Maskentabelle, Binär/Hex, VLSM-Planer, IPv6-Werkzeug, Übertragungszeit & Einheiten, Energie/Kosten, Ports-Referenz |
| **Historie** | alle Aufgaben, Antworten, Lösungen, Bearbeitungszeit, Tipps, Fehlerkategorien, Tests, Chatverläufe – lokal gespeichert, mit Diagrammen |

## Lokale Installation unter Windows 11 (optional, z. B. für den eingebauten KI-Tutor)

1. **Node.js LTS** (Version 22 oder neuer) installieren: <https://nodejs.org/de>
2. Repository herunterladen (grüner Button „Code → Download ZIP“ entpacken) **oder** mit Git:
   ```bash
   git clone https://github.com/flizzy27/BBS-IT.git
   ```
3. Im Ordner **`start.bat`** doppelklicken.
   Beim ersten Start werden die Pakete installiert und die Oberfläche gebaut (ca. 1–2 Minuten). Danach öffnet sich die App als eigenes Fenster (Microsoft Edge im App-Modus) unter <http://localhost:4317>.

- Beenden: Fenster „Network Academy Server“ schließen oder `stop.bat`.
- Aktualisieren: `update.bat` (holt die neueste Version von GitHub und baut neu).
- Deine Lerndaten liegen in `data/` (SQLite, tägliche Sicherung in `data/backups/`). Export/Import unter **Einstellungen**.
- Die letzte Lernsitzung wird beim Start automatisch zum Fortsetzen angeboten.

## KI-Tutor einrichten (optional)

Der komplette Lernbetrieb funktioniert **ohne KI**. Für den Tutor gibt es zwei Wege (Details, Kosten und Nutzungsbedingungen: [docs/KI-TUTOR.md](docs/KI-TUTOR.md)):

1. **Anthropic-API (empfohlen):** API-Schlüssel unter <https://console.anthropic.com> erstellen, Guthaben aufladen, Schlüssel in der App unter *Einstellungen → KI-Tutor* eintragen. Kosten nach Verbrauch (Größenordnung 1–3 Cent pro Tutor-Antwort mit Claude Opus 5.5, deutlich weniger mit Haiku 5.5).
2. **Claude-Code-CLI:** Ist `claude` auf dem PC installiert und angemeldet, kann die App den offiziellen Headless-Modus (`claude -p`) nutzen. Läuft über deinen Claude-Code-Zugang; bitte die Nutzungsbedingungen deines Plans beachten.

Ein Claude-Abo (Pro/Max) beinhaltet **keinen** API-Zugang – die API wird separat abgerechnet.

## Web-Version (GitHub Pages)

Bei jedem Push auf `main` baut `.github/workflows/pages.yml` die statische Version und veröffentlicht sie im Branch `gh-pages` → https://flizzy27.github.io/BBS-IT/ (kostenlos für öffentliche Repositories). Lernstände liegen im Browser; der eingebaute KI-Tutor ist dort deaktiviert (kein API-Schlüssel in öffentlichen Seiten) – stattdessen gibt es überall „KI-Prompt kopieren“.

## Weiterarbeiten auf einem anderen PC

```bash
git clone https://github.com/flizzy27/BBS-IT.git
cd BBS-IT
npm install
npm test
```
Claude Code liest beim Start automatisch `CLAUDE.md` (Projektkontext, Ziele, Arbeitsweise) und findet die Agent-Definitionen in `.claude/agents/`. Den lokalen Ordner `material/` (Schulunterlagen, urheberrechtlich geschützt, **nicht** im Repository) separat kopieren.

## Entwicklung

```bash
npm install
npm run dev        # Vite (http://localhost:5173) + API-Server mit Neuladen
npm test           # automatisierte Tests (Rechenkern, Generatoren, alle Inhalte)
npm run typecheck
npm run build && npm start
```

| Dokument | Inhalt |
|---|---|
| [docs/ARCHITEKTUR.md](docs/ARCHITEKTUR.md) | Technikentscheidung, Aufbau, Datenmodell, Datenfluss |
| [docs/LERNMODELL.md](docs/LERNMODELL.md) | Kompetenzstufen, Spaced Repetition, Fehlerkategorien |
| [docs/INHALTE-ERWEITERN.md](docs/INHALTE-ERWEITERN.md) | Neue Module, Fachbereiche (z. B. für AP2), Generatoren |
| [docs/KI-TUTOR.md](docs/KI-TUTOR.md) | Claude-Anbindung, Kosten, Datenschutz |
| [docs/AP1-RELEVANZ.md](docs/AP1-RELEVANZ.md) | Recherche: offizielle AP1-Anforderungen, Modul-Relevanz |
| [docs/AP1-PRUEFUNGSANALYSE.md](docs/AP1-PRUEFUNGSANALYSE.md) | Recherche: Termine, Notenschlüssel, Themen, IHK Koblenz |
| [docs/ROADMAP.md](docs/ROADMAP.md) | Implementierungsstand, offene Funktionen, nächste Schritte |
| [docs/AP-QUELLEN-UND-THEMEN.md](docs/AP-QUELLEN-UND-THEMEN.md) | Lernfelder 1–12, Quellen, AP1-/AP2-Themenübersicht |
| [docs/CONTENT-BRIEF.md](docs/CONTENT-BRIEF.md) | Vorgaben für neue Inhalte (auch für KI-Agents) |
| [CLAUDE.md](CLAUDE.md) | Projektkontext für Claude Code |

## Lizenz / Hinweise

Private Lernsoftware. Prüfungsaufgaben der IHK sind urheberrechtlich geschützt und **nicht** enthalten; alle Aufgaben sind eigenständig erstellt oder algorithmisch erzeugt.
