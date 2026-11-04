# Online-Version mit Benutzerkonten

Für die Klasse läuft die App als Online-Version mit Anmeldung (Benutzername + Passwort, keine E-Mail).
Lernstand, Tests, angefangene Tests, Fragenkatalog-Status und Einstellungen liegen je Benutzer in einer SQLite-Datenbank auf dem Server.

## Aufbau
- `server/cloud.mjs` – Server ohne Zusatzpakete (node:http, node:sqlite, node:crypto). Liefert `dist/` aus und stellt bereit:
  - `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`
  - `GET /api/cloud/doc`, `PUT /api/cloud/doc` (Lernstand als ein Dokument je Benutzer, mit Revisionsnummer gegen Überschreiben von einem zweiten Gerät)
  - `GET /api/cloud/health` (daran erkennt die App die Online-Version)
- Passwörter: scrypt mit Salt; Sitzungen: zufälliges Token, in der DB nur als SHA-256-Hash; max. 10 Fehlversuche je IP in 15 Minuten.
- Client: `src/lib/cloud.ts` + `src/pages/Login.tsx`. Die App arbeitet weiter auf dem Browser-Speicher (`localBackend.ts`, je Benutzer eigener Schlüssel) und schickt jede Änderung nach ca. 1 s an den Server. Bei kurzem Verbindungsabbruch wird nachgeholt.
- Tests: `tests/cloud.test.mjs`.

## Betrieb auf Railway
1. `railway login`, Projekt anlegen, dieses Repo als Quelle verbinden.
2. Volume anlegen und unter `/data` einhängen, Variable `DATA_DIR=/data` setzen.
3. Build/Start kommen aus `railway.json` (`npx vite build --base=./`, `node server/cloud.mjs`, Node ≥ 22.13).
4. Domain erzeugen – das ist die Adresse für die Klasse.

Optional: Oberfläche weiter auf GitHub Pages und nur die Daten auf Railway → beim Pages-Build `VITE_CLOUD_URL=https://<railway-domain>` setzen und auf dem Server `ALLOWED_ORIGIN=https://flizzy27.github.io`.

## Lokal ausprobieren
```bash
npx vite build --base=./
PORT=8090 DATA_DIR=./data-cloud node server/cloud.mjs
```
