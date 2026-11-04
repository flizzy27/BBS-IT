// Lokale Datenhaltung mit dem in Node.js eingebauten SQLite (node:sqlite) – keine nativen Zusatzpakete nötig.
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';

export function openDb(dataDir) {
  fs.mkdirSync(dataDir, { recursive: true });
  const file = path.join(dataDir, 'academy.db');
  const db = new DatabaseSync(file);
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;
    CREATE TABLE IF NOT EXISTS kv (key TEXT PRIMARY KEY, value TEXT NOT NULL, updated INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS skill_state (skill TEXT PRIMARY KEY, state TEXT NOT NULL, updated INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ts INTEGER NOT NULL,
      question_id TEXT NOT NULL,
      skill TEXT NOT NULL,
      module TEXT,
      kind TEXT NOT NULL,
      mode TEXT NOT NULL,
      difficulty INTEGER,
      question TEXT NOT NULL,
      response TEXT,
      correct INTEGER NOT NULL,
      score REAL NOT NULL,
      error_tags TEXT NOT NULL,
      hints_used INTEGER NOT NULL DEFAULT 0,
      duration_ms INTEGER NOT NULL DEFAULT 0,
      test_id TEXT,
      ai_graded INTEGER NOT NULL DEFAULT 0
    );
    CREATE INDEX IF NOT EXISTS idx_attempts_skill ON attempts(skill);
    CREATE INDEX IF NOT EXISTS idx_attempts_ts ON attempts(ts);
    CREATE TABLE IF NOT EXISTS tests (
      id TEXT PRIMARY KEY,
      ts_start INTEGER NOT NULL,
      ts_end INTEGER,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      score REAL,
      max_score REAL,
      data TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS threads (id TEXT PRIMARY KEY, title TEXT NOT NULL, created INTEGER NOT NULL, updated INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      thread_id TEXT NOT NULL,
      ts INTEGER NOT NULL,
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      context TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_messages_thread ON messages(thread_id);
    CREATE TABLE IF NOT EXISTS study_time (day TEXT PRIMARY KEY, seconds INTEGER NOT NULL);
  `);
  return db;
}

/** Tägliche Sicherung der Datenbank (max. 14 Stück). */
export function backupDb(db, dataDir) {
  try {
    const dir = path.join(dataDir, 'backups');
    fs.mkdirSync(dir, { recursive: true });
    const day = new Date().toISOString().slice(0, 10);
    const target = path.join(dir, `academy-${day}.db`);
    if (fs.existsSync(target)) return;
    db.exec(`VACUUM INTO '${target.replace(/'/g, "''")}'`);
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.db')).sort();
    while (files.length > 14) fs.unlinkSync(path.join(dir, files.shift()));
  } catch (e) {
    console.warn('[backup] fehlgeschlagen:', e.message);
  }
}
