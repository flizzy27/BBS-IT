// Network Academy – lokaler Server (nur an 127.0.0.1 gebunden).
// Liefert die gebaute Oberfläche aus und stellt die REST-API für Speicherung und KI-Tutor bereit.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { openDb, backupDb } from './db.mjs';
import { AiService } from './ai.mjs';
import { TUTOR_SYSTEM, GRADE_SYSTEM, GRADE_SCHEMA, VISION_SYSTEM, VISION_SCHEMA } from './tutor-prompt.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const DEV = process.argv.includes('--dev');
const PORT = Number(process.env.NA_PORT || 4317);
const DATA_DIR = path.resolve(process.env.NA_DATA_DIR || path.join(root, 'data'));
const DIST = path.join(root, 'dist');

const db = openDb(DATA_DIR);
backupDb(db, DATA_DIR);
const ai = new AiService(DATA_DIR);

/* ------------------------------ Hilfen ------------------------------ */

const kvGet = (key, fallback = null) => {
  const r = db.prepare('SELECT value FROM kv WHERE key = ?').get(key);
  return r ? JSON.parse(r.value) : fallback;
};
const kvSet = (key, value) =>
  db.prepare('INSERT INTO kv(key, value, updated) VALUES(?,?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated=excluded.updated').run(key, JSON.stringify(value), Date.now());

const aiConfig = () => kvGet('aiConfig', { provider: 'none', model: 'claude-opus-5-5', effort: 'medium' });

function send(res, status, body, headers = {}) {
  const data = typeof body === 'string' || Buffer.isBuffer(body) ? body : JSON.stringify(body);
  res.writeHead(status, { 'Content-Type': typeof body === 'object' && !Buffer.isBuffer(body) ? 'application/json; charset=utf-8' : 'text/plain; charset=utf-8', ...headers });
  res.end(data);
}

async function readBody(req, limit = 15 * 1024 * 1024) {
  const chunks = [];
  let size = 0;
  for await (const c of req) {
    size += c.length;
    if (size > limit) throw Object.assign(new Error('Anfrage zu groß'), { status: 413 });
    chunks.push(c);
  }
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.json': 'application/json', '.woff2': 'font/woff2' };

function serveStatic(req, res) {
  if (!fs.existsSync(DIST)) return send(res, 503, 'Die Oberfläche ist noch nicht gebaut. Bitte „npm run build“ ausführen oder start.bat verwenden.');
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = path.join(DIST, p);
  if (!file.startsWith(DIST)) return send(res, 403, 'Verboten');
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(DIST, 'index.html');
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream', 'Cache-Control': file.endsWith('index.html') ? 'no-cache' : 'max-age=31536000' });
  fs.createReadStream(file).pipe(res);
}

/* ------------------------------ Routen ------------------------------ */

const routes = [];
const route = (method, pattern, handler) => routes.push({ method, re: new RegExp('^' + pattern.replace(/:(\w+)/g, '(?<$1>[^/]+)') + '$'), handler });

route('GET', '/api/health', () => ({ ok: true, dataDir: DATA_DIR }));

// Gesamter Zustand zum Start der App (inkl. Wiederherstellung der letzten Sitzung)
route('GET', '/api/state', () => {
  const skills = Object.fromEntries(db.prepare('SELECT skill, state FROM skill_state').all().map((r) => [r.skill, JSON.parse(r.state)]));
  const kv = Object.fromEntries(db.prepare("SELECT key, value FROM kv WHERE key NOT IN ('aiConfig')").all().map((r) => [r.key, JSON.parse(r.value)]));
  const studyTime = db.prepare('SELECT day, seconds FROM study_time ORDER BY day').all();
  return { skills, kv, studyTime };
});

route('PUT', '/api/kv/:key', async ({ params, body }) => {
  kvSet(params.key, body.value);
  return { ok: true };
});

route('POST', '/api/attempts', async ({ body }) => {
  const a = body.attempt;
  const info = db
    .prepare(`INSERT INTO attempts(ts, question_id, skill, module, kind, mode, difficulty, question, response, correct, score, error_tags, hints_used, duration_ms, test_id, ai_graded)
              VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
    .run(a.ts, a.questionId, a.skill, a.module ?? null, a.kind, a.mode, a.difficulty ?? null, JSON.stringify(a.question), JSON.stringify(a.response ?? null), a.correct ? 1 : 0, a.score, JSON.stringify(a.errorTags ?? []), a.hintsUsed ?? 0, a.durationMs ?? 0, a.testId ?? null, a.aiGraded ? 1 : 0);
  if (body.skillState) {
    db.prepare('INSERT INTO skill_state(skill, state, updated) VALUES(?,?,?) ON CONFLICT(skill) DO UPDATE SET state=excluded.state, updated=excluded.updated').run(body.skillState.skill, JSON.stringify(body.skillState), Date.now());
  }
  return { id: Number(info.lastInsertRowid) };
});

route('PUT', '/api/skills', async ({ body }) => {
  const stmt = db.prepare('INSERT INTO skill_state(skill, state, updated) VALUES(?,?,?) ON CONFLICT(skill) DO UPDATE SET state=excluded.state, updated=excluded.updated');
  for (const s of body.states ?? []) stmt.run(s.skill, JSON.stringify(s), Date.now());
  return { ok: true };
});

const mapAttempt = (r) => ({
  id: r.id, ts: r.ts, questionId: r.question_id, skill: r.skill, module: r.module, kind: r.kind, mode: r.mode, difficulty: r.difficulty,
  question: JSON.parse(r.question), response: JSON.parse(r.response), correct: !!r.correct, score: r.score, errorTags: JSON.parse(r.error_tags),
  hintsUsed: r.hints_used, durationMs: r.duration_ms, testId: r.test_id, aiGraded: !!r.ai_graded,
});

route('GET', '/api/attempts', ({ query }) => {
  const limit = Math.min(Number(query.get('limit') || 200), 5000);
  const light = query.get('light') === '1';
  const skill = query.get('skill');
  const rows = skill
    ? db.prepare('SELECT * FROM attempts WHERE skill = ? ORDER BY ts DESC LIMIT ?').all(skill, limit)
    : db.prepare('SELECT * FROM attempts ORDER BY ts DESC LIMIT ?').all(limit);
  return rows.map((r) => {
    const a = mapAttempt(r);
    if (light) delete a.question.explanation;
    return a;
  });
});

route('POST', '/api/tests', async ({ body }) => {
  const t = body.test;
  db.prepare('INSERT INTO tests(id, ts_start, ts_end, type, title, score, max_score, data) VALUES(?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET ts_end=excluded.ts_end, score=excluded.score, max_score=excluded.max_score, data=excluded.data')
    .run(t.id, t.tsStart, t.tsEnd ?? null, t.type, t.title, t.score ?? null, t.maxScore ?? null, JSON.stringify(t));
  return { ok: true };
});

route('GET', '/api/tests', () => db.prepare('SELECT data FROM tests WHERE ts_end IS NOT NULL ORDER BY ts_start DESC LIMIT 200').all().map((r) => JSON.parse(r.data)));

route('POST', '/api/time', async ({ body }) => {
  const sec = Math.max(0, Math.min(600, Number(body.seconds) || 0));
  const day = body.day || new Date().toISOString().slice(0, 10);
  db.prepare('INSERT INTO study_time(day, seconds) VALUES(?,?) ON CONFLICT(day) DO UPDATE SET seconds = seconds + excluded.seconds').run(day, sec);
  return { ok: true };
});

/* ---- KI ---- */

route('GET', '/api/ai/status', () => ai.status(aiConfig()));

route('PUT', '/api/ai/config', async ({ body }) => {
  const cur = aiConfig();
  const next = { ...cur, ...(body.provider !== undefined && { provider: body.provider }), ...(body.model && { model: body.model }), ...(body.effort && { effort: body.effort }), ...(body.cliModel !== undefined && { cliModel: body.cliModel }) };
  kvSet('aiConfig', next);
  if (body.apiKey !== undefined) ai.setApiKey(body.apiKey);
  return ai.status(next);
});

route('POST', '/api/ai/test', async () => {
  const text = await ai.test(aiConfig());
  return { ok: true, text };
});

route('GET', '/api/threads', () => db.prepare('SELECT * FROM threads ORDER BY updated DESC LIMIT 100').all());
route('GET', '/api/threads/:id', ({ params }) => ({
  thread: db.prepare('SELECT * FROM threads WHERE id = ?').get(params.id) ?? null,
  messages: db.prepare('SELECT id, ts, role, content FROM messages WHERE thread_id = ? ORDER BY id').all(params.id),
}));
route('DELETE', '/api/threads/:id', ({ params }) => {
  db.prepare('DELETE FROM messages WHERE thread_id = ?').run(params.id);
  db.prepare('DELETE FROM threads WHERE id = ?').run(params.id);
  return { ok: true };
});

// Chat (Server-Sent Events)
async function handleChat(req, res) {
  const body = await readBody(req);
  const cfg = aiConfig();
  let threadId = body.threadId;
  const now = Date.now();
  if (!threadId || !db.prepare('SELECT 1 FROM threads WHERE id = ?').get(threadId)) {
    threadId = randomUUID();
    db.prepare('INSERT INTO threads(id, title, created, updated) VALUES(?,?,?,?)').run(threadId, (body.title || body.message).slice(0, 80), now, now);
  }
  const history = db.prepare('SELECT role, content FROM messages WHERE thread_id = ? ORDER BY id DESC LIMIT 40').all(threadId).reverse();
  const userContent = body.context ? `<lernkontext>\n${body.context}\n</lernkontext>\n\n${body.message}` : body.message;
  db.prepare('INSERT INTO messages(thread_id, ts, role, content, context) VALUES(?,?,?,?,?)').run(threadId, now, 'user', body.message, body.context ?? null);

  res.writeHead(200, { 'Content-Type': 'text/event-stream; charset=utf-8', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
  const sse = (event, data) => res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  sse('thread', { threadId });
  const ctrl = new AbortController();
  res.on('close', () => { if (!res.writableEnded) ctrl.abort(); });
  let answer = '';
  try {
    const messages = [...history.map((m) => ({ role: m.role, content: m.content })), { role: 'user', content: userContent }];
    const info = await ai.chat({ config: cfg, system: TUTOR_SYSTEM, messages, signal: ctrl.signal, onText: (t) => { answer += t; sse('text', { t }); } });
    db.prepare('INSERT INTO messages(thread_id, ts, role, content) VALUES(?,?,?,?)').run(threadId, Date.now(), 'assistant', answer);
    db.prepare('UPDATE threads SET updated = ? WHERE id = ?').run(Date.now(), threadId);
    sse('done', { usage: info?.usage ?? null });
  } catch (e) {
    if (answer) db.prepare('INSERT INTO messages(thread_id, ts, role, content) VALUES(?,?,?,?)').run(threadId, Date.now(), 'assistant', answer + '\n\n_(abgebrochen)_');
    sse('error', { message: friendlyError(e) });
  }
  res.end();
}

function friendlyError(e) {
  const s = e?.status;
  if (s === 401) return 'Der API-Schlüssel ist ungültig (401). Bitte in den Einstellungen prüfen.';
  if (s === 429) return 'Rate-Limit erreicht (429). Bitte kurz warten und erneut versuchen.';
  if (s === 400 && /credit|balance/i.test(e.message)) return 'Das API-Guthaben reicht nicht aus. Bitte im Anthropic-Konto Guthaben aufladen.';
  if (s >= 500) return `Der KI-Dienst ist gerade nicht erreichbar (${s}). Der Lernbetrieb funktioniert weiter ohne KI.`;
  if (e?.name === 'APIConnectionError' || /fetch failed|ENOTFOUND|ECONN/i.test(e?.message ?? '')) return 'Keine Verbindung zum KI-Dienst (Internet?). Der Lernbetrieb funktioniert weiter ohne KI.';
  return e?.message || String(e);
}

route('POST', '/api/ai/grade', async ({ body }) => {
  const content = `Frage:\n${body.prompt}\n\nMusterlösung:\n${body.modelAnswer}\n\nKernbegriffe: ${(body.keywords ?? []).join(', ')}\n\nAntwort des Lernenden:\n${body.answer}`;
  return ai.structured({ config: aiConfig(), system: GRADE_SYSTEM, content, schema: GRADE_SCHEMA });
});

route('POST', '/api/ai/vision-vlsm', async ({ body }) => {
  const m = /^data:(image\/(png|jpeg|webp|gif));base64,(.+)$/.exec(body.image ?? '');
  if (!m) throw Object.assign(new Error('Bitte ein Bild (PNG, JPG, WebP oder GIF) hochladen.'), { status: 400 });
  const content = [
    { type: 'image', source: { type: 'base64', media_type: m[1], data: m[3] } },
    { type: 'text', text: 'Extrahiere aus dieser Aufgabe: Ausgangsnetz, alle LANs mit Hostanzahl, alle WAN-/Punkt-zu-Punkt-Verbindungen und die WAN-Präfixkonvention.' },
  ];
  return ai.structured({ config: aiConfig(), system: VISION_SYSTEM, content, schema: VISION_SCHEMA });
});

/* ---- Datensicherung ---- */

route('GET', '/api/export', () => ({
  exported: new Date().toISOString(),
  kv: db.prepare("SELECT * FROM kv WHERE key != 'aiConfig'").all(),
  skill_state: db.prepare('SELECT * FROM skill_state').all(),
  attempts: db.prepare('SELECT * FROM attempts').all(),
  tests: db.prepare('SELECT * FROM tests').all(),
  threads: db.prepare('SELECT * FROM threads').all(),
  messages: db.prepare('SELECT * FROM messages').all(),
  study_time: db.prepare('SELECT * FROM study_time').all(),
}));

route('POST', '/api/import', async ({ body }) => {
  backupDb(db, DATA_DIR);
  const tables = ['kv', 'skill_state', 'attempts', 'tests', 'threads', 'messages', 'study_time'];
  db.exec('BEGIN');
  try {
    for (const t of tables) {
      if (!Array.isArray(body[t])) continue;
      db.exec(`DELETE FROM ${t}`);
      for (const row of body[t]) {
        const cols = Object.keys(row);
        db.prepare(`INSERT INTO ${t}(${cols.join(',')}) VALUES(${cols.map(() => '?').join(',')})`).run(...cols.map((c) => row[c]));
      }
    }
    db.exec('COMMIT');
  } catch (e) {
    db.exec('ROLLBACK');
    throw e;
  }
  return { ok: true };
});

route('POST', '/api/reset', async ({ body }) => {
  if (body.confirm !== 'ZURÜCKSETZEN') throw Object.assign(new Error('Bestätigung fehlt'), { status: 400 });
  backupDb(db, DATA_DIR);
  for (const t of ['skill_state', 'attempts', 'tests', 'threads', 'messages', 'study_time']) db.exec(`DELETE FROM ${t}`);
  db.exec("DELETE FROM kv WHERE key != 'aiConfig'");
  return { ok: true };
});

/* ------------------------------ Server ------------------------------ */

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  // Schutz vor Zugriffen fremder Webseiten auf die lokale API (DNS-Rebinding/CSRF)
  const host = (req.headers.host || '').split(':')[0];
  if (!['localhost', '127.0.0.1', '[::1]'].includes(host)) return send(res, 403, 'Nur lokaler Zugriff erlaubt.');
  if (url.pathname.startsWith('/api/')) {
    const origin = req.headers.origin;
    if (origin && !/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return send(res, 403, { error: 'Fremder Ursprung' });
    try {
      if (req.method === 'POST' && url.pathname === '/api/chat') return await handleChat(req, res);
      for (const r of routes) {
        const m = r.method === req.method && r.re.exec(url.pathname);
        if (!m) continue;
        const body = ['POST', 'PUT'].includes(req.method) ? await readBody(req) : undefined;
        const result = await r.handler({ params: m.groups ?? {}, query: url.searchParams, body, req });
        return send(res, 200, result ?? { ok: true });
      }
      return send(res, 404, { error: 'Unbekannter Endpunkt' });
    } catch (e) {
      console.error('[api]', req.method, url.pathname, e);
      return send(res, e.status || 500, { error: friendlyError(e) });
    }
  }
  if (DEV) return send(res, 404, 'Im Entwicklungsmodus läuft die Oberfläche über Vite (http://localhost:5173).');
  serveStatic(req, res);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`\n  Network Academy läuft auf  http://localhost:${PORT}`);
  console.log(`  Daten: ${DATA_DIR}\n  Beenden mit Strg+C.\n`);
});

process.on('SIGINT', () => {
  db.close();
  process.exit(0);
});
