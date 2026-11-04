# KI-Tutor – Anbindung, Kosten, Datenschutz

## Grundsatz

- Der Lernbetrieb und **jede Bewertung** funktionieren ohne KI. Rechenaufgaben werden algorithmisch geprüft.
- Die KI erklärt, gibt Denkanstöße, analysiert Fehler und bewertet auf Wunsch Freitexte (als „KI-Bewertung“ gekennzeichnet).
- Exakte Lösungen werden dem Tutor mitgegeben; er ist angewiesen, ihnen nicht zu widersprechen.

## Option 1: Anthropic-API (empfohlen)

Offiziell dafür vorgesehene Schnittstelle. Abrechnung nach Verbrauch, **separat** von einem Claude-Abo (Pro/Max beinhalten keinen API-Zugang).

1. Konto unter <https://console.anthropic.com> anlegen, Guthaben aufladen (Prepaid möglich, Ausgabelimit einstellbar).
2. *API Keys → Create Key*.
3. In der App: *Einstellungen → KI-Tutor → Anbieter „Anthropic-API“*, Schlüssel eintragen, „Verbindung testen“.
   Alternativ Umgebungsvariable `ANTHROPIC_API_KEY` setzen.

Der Schlüssel wird in `data/secrets.json` gespeichert (in `.gitignore`), nie im Quellcode und nie an den Browser zurückgegeben.

### Modelle und Preise (Stand der Implementierung, pro 1 Mio. Tokens)

| Modell | Eingabe | Ausgabe | Einsatz |
|---|---|---|---|
| Claude Opus 5.5 (Standard) | 4 $ | 20 $ | beste Erklärqualität |
| Claude Sonnet 5.5 | 2 $ | 10 $ | schneller, günstiger |
| Claude Haiku 5.5 | 0,10 $ | 0,50 $ | sehr günstig |

Eine Tutor-Antwort mit Lernkontext hat grob 3.000 Eingabe- und 800 Ausgabe-Tokens (plus Denk-Tokens). Mit Opus 5.5 sind das ca. 2–3 Cent, mit Haiku 5.5 deutlich unter 0,1 Cent. Der System-Prompt wird per Prompt-Caching wiederverwendet. Bei intensiver Nutzung (50 Nachrichten/Tag) mit Opus also grob 1–1,50 € pro Tag; mit Sonnet etwa die Hälfte.

Technisch: `server/ai.mjs` nutzt `@anthropic-ai/sdk` mit Streaming, adaptivem Denken (`thinking: {type: "adaptive"}`), einstellbarer Denktiefe (`output_config.effort`) und für Opus/Sonnet dem serverseitigen Fallback bei Ablehnungen. Freitextbewertung und Bildanalyse nutzen strukturierte Ausgaben (`output_config.format` mit JSON-Schema).

## Option 2: Claude-Code-CLI

Ist [Claude Code](https://claude.com/claude-code) installiert und angemeldet, ruft die App den offiziellen Headless-Modus auf:

```
claude -p --output-format stream-json --tools "" --system-prompt <Tutor-Prompt>
```

- Die Nutzung läuft über deinen Claude-Code-Zugang und zählt auf dessen Nutzungslimits.
- Anthropic erlaubt Drittanbietern nicht, das claude.ai-Login in eigene Produkte für andere einzubauen. Diese App ruft lediglich die von dir selbst installierte CLI lokal für deinen eigenen Gebrauch auf. Prüfe trotzdem die aktuellen Bedingungen deines Plans – im Zweifel ist Option 1 die eindeutig vorgesehene Schnittstelle.
- Bildanalyse über die CLI nutzt das Read-Werkzeug auf eine temporäre Bilddatei.

## Was wird übertragen?

Nur wenn ein Anbieter aktiv ist und du den Tutor benutzt: deine Nachricht, der aktuelle Gesprächsverlauf und – wenn „Lernkontext mitsenden“ aktiv ist – die aktuelle Aufgabe, deine Eingabe, die Bewertung, eine Zusammenfassung deines Kenntnisstands und deine Selbstauskunft. Bei der Bildanalyse das hochgeladene Bild. Keine weiteren Daten.

## Gehostete Web-Version

Auf GitHub Pages ist der Tutor deaktiviert, weil ein API-Schlüssel nicht in eine öffentliche Webseite gehört.
