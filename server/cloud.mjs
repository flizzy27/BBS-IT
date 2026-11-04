// FISI Academy – Online-Server für die Klasse: Benutzerkonten (Name + Passwort) und Lernstand je Benutzer.
// Liefert die gebaute Oberfläche aus (dist/) und speichert pro Benutzer ein Dokument mit dem kompletten Lernstand
// (dasselbe Format wie der Browser-Speicher der App). Keine Zusatzpakete: node:http + node:sqlite + node:crypto.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';
import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

const here = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(here, '..', 'dist');
const MAX_DOC = 12 * 1024 * 1024;
const SESSION_DAYS = 180;

export function createCloudServer({ dataDir, allowedOrigin = '' }) {
  fs.mkdirSync(dataDir, { recursive: true });
  const db = new DatabaseSync(path.join(dataDir, 'cloud.db'));
  db.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE COLLATE NOCASE, salt TEXT NOT NULL, hash TEXT NOT NULL, created INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, user_id INTEGER NOT NULL, created INTEGER NOT NULL, last INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS docs (user_id INTEGER PRIMARY KEY, rev INTEGER NOT NULL, data TEXT NOT NULL, updated INTEGER NOT NULL);
  `);

  const sha = (s) => createHash('sha256').update(s).digest('hex');
  const hashPw = (pw, salt) => scryptSync(pw, salt, 64, { N: 16384, r: 8, p: 1 }).toString('hex');
  const newSession = (userId) => {
    const token = randomBytes(32).toString('hex');
    db.prepare('INSERT INTO sessions(token_hash, user_id, created, last) VALUES(?,?,?,?)').run(sha(token), userId, Date.now(), Date.now());
    return token;
  };
  const userFor = (req) => {
    const m = /^Bearer ([a-f0-9]{64})$/.exec(req.headers.authorization ?? '');
    if (!m) return null;
    const s = db.prepare('SELECT s.token_hash, s.last, u.id, u.name FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ?').get(sha(m[1]));
    if (!s || Date.now() - s.last > SESSION_DAYS * 864e5) return null;
    if (Date.now() - s.last > 36e5) db.prepare('UPDATE sessions SET last = ? WHERE token_hash = ?').run(Date.now(), s.token_hash);
    return { id: s.id, name: s.name, tokenHash: s.token_hash };
  };

  // Schutz gegen Passwort-Raten: höchstens 10 Fehlversuche je IP in 15 Minuten
  const fails = new Map();
  const limited = (ip) => (fails.get(ip) ?? []).filter((t) => Date.now() - t < 15 * 6e4).length >= 10;
  const fail = (ip) => fails.set(ip, [...(fails.get(ip) ?? []).filter((t) => Date.now() - t < 15 * 6e4), Date.now()]);

  const NAME = /^[A-Za-z0-9ÄÖÜäöüß_.-]{3,24}$/;

  async function api(req, res, url) {
    const ip = req.socket.remoteAddress ?? '';
    const send = (status, body) => {
      res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
      res.end(JSON.stringify(body));
    };
    const body = async () => {
      let size = 0;
      const chunks = [];
      for await (const c of req) {
        size += c.length;
        if (size > MAX_DOC) throw Object.assign(new Error('Der Lernstand ist zu groß.'), { status: 413 });
        chunks.push(c);
      }
      try { return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'); } catch { throw Object.assign(new Error('Ungültige Anfrage'), { status: 400 }); }
    };
    const p = url.pathname;

    if (p === '/api/cloud/health') return send(200, { cloud: true });

    if (req.method === 'POST' && (p === '/api/auth/register' || p === '/api/auth/login')) {
      if (limited(ip)) return send(429, { error: 'Zu viele Versuche. Bitte in 15 Minuten erneut probieren.' });
      const { username, password } = await body();
      const name = String(username ?? '').trim();
      const pw = String(password ?? '');
      if (p === '/api/auth/register') {
        if (!NAME.test(name)) return send(400, { error: 'Benutzername: 3–24 Zeichen, nur Buchstaben, Ziffern, Punkt, Minus, Unterstrich.' });
        if (pw.length < 8 || pw.length > 200) return send(400, { error: 'Das Passwort muss mindestens 8 Zeichen lang sein.' });
        if (db.prepare('SELECT 1 FROM users WHERE name = ?').get(name)) return send(409, { error: 'Diesen Benutzernamen gibt es schon.' });
        const salt = randomBytes(16).toString('hex');
        const r = db.prepare('INSERT INTO users(name, salt, hash, created) VALUES(?,?,?,?)').run(name, salt, hashPw(pw, salt), Date.now());
        return send(200, { token: newSession(Number(r.lastInsertRowid)), user: { name } });
      }
      const u = db.prepare('SELECT id, name, salt, hash FROM users WHERE name = ?').get(name);
      const ok = u && timingSafeEqual(Buffer.from(hashPw(pw, u.salt), 'hex'), Buffer.from(u.hash, 'hex'));
      if (!ok) {
        fail(ip);
        return send(401, { error: 'Benutzername oder Passwort ist falsch.' });
      }
      return send(200, { token: newSession(u.id), user: { name: u.name } });
    }

    const user = userFor(req);
    if (!user) return send(401, { error: 'Bitte anmelden.' });

    if (req.method === 'POST' && p === '/api/auth/logout') {
      db.prepare('DELETE FROM sessions WHERE token_hash = ?').run(user.tokenHash);
      return send(200, { ok: true });
    }
    if (req.method === 'GET' && p === '/api/cloud/doc') {
      const d = db.prepare('SELECT rev, data FROM docs WHERE user_id = ?').get(user.id);
      return send(200, { user: { name: user.name }, rev: d?.rev ?? 0, data: d ? JSON.parse(d.data) : null });
    }
    if (req.method === 'PUT' && p === '/api/cloud/doc') {
      const { rev, data } = await body();
      if (!data || typeof data !== 'object') return send(400, { error: 'Ungültiger Lernstand' });
      const cur = db.prepare('SELECT rev, data FROM docs WHERE user_id = ?').get(user.id);
      // Nur speichern, wenn der Stand auf dem neuesten Server-Stand aufbaut (sonst hat ein anderes Gerät inzwischen gespeichert)
      if ((cur?.rev ?? 0) !== rev) return send(409, { rev: cur?.rev ?? 0, data: cur ? JSON.parse(cur.data) : null });
      db.prepare('INSERT INTO docs(user_id, rev, data, updated) VALUES(?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET rev=excluded.rev, data=excluded.data, updated=excluded.updated')
        .run(user.id, rev + 1, JSON.stringify(data), Date.now());
      return send(200, { rev: rev + 1 });
    }
    return send(404, { error: 'Unbekannte Anfrage' });
  }

  const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.json': 'application/json', '.woff2': 'font/woff2' };
  function serveStatic(req, res, url) {
    let file = path.join(DIST, decodeURIComponent(url.pathname));
    if (!file.startsWith(DIST)) return res.writeHead(403).end();
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(DIST, 'index.html');
    if (!fs.existsSync(file)) return res.writeHead(503, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Oberfläche nicht gebaut (npx vite build --base=./).');
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream', 'Cache-Control': file.endsWith('index.html') ? 'no-cache' : 'max-age=31536000, immutable', 'X-Content-Type-Options': 'nosniff' });
    fs.createReadStream(file).pipe(res);
  }

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://x');
    // optional: Oberfläche liegt woanders (z. B. GitHub Pages) und ruft diesen Server auf
    if (allowedOrigin && req.headers.origin === allowedOrigin) {
      res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
      res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
      if (req.method === 'OPTIONS') return res.writeHead(204).end();
    }
    try {
      if (url.pathname.startsWith('/api/')) return await api(req, res, url);
      serveStatic(req, res, url);
    } catch (e) {
      if (!res.headersSent) res.writeHead(e.status ?? 500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: e.status ? e.message : 'Serverfehler' }));
      if (!e.status) console.error(e);
    }
  });
  return { server, db };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 8080);
  const { server } = createCloudServer({ dataDir: path.resolve(process.env.DATA_DIR || path.join(here, '..', 'data-cloud')), allowedOrigin: process.env.ALLOWED_ORIGIN || '' });
  server.listen(port, '0.0.0.0', () => console.log(`FISI Academy online auf Port ${port}`));
}
