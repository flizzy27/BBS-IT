/**
 * Browser-Speicher als Ersatz für den lokalen Server – für die statisch gehostete Variante
 * (z. B. GitHub Pages). Alle Lernfunktionen laufen damit vollständig im Browser.
 * Der KI-Tutor ist in dieser Variante nicht verfügbar (der API-Schlüssel darf nicht in eine
 * öffentliche Webseite gelangen).
 */
import type { SkillState } from '../core/learning';
import type { Attempt, TestRecord } from './api';

const BASE_KEY = 'network-academy-db-v1';
let KEY = BASE_KEY;

export interface LocalDb {
  kv: Record<string, unknown>;
  skills: Record<string, SkillState>;
  attempts: Attempt[];
  tests: TestRecord[];
  studyTime: Record<string, number>;
}

function load(): LocalDb {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* leer */
  }
  return { kv: {}, skills: {}, attempts: [], tests: [], studyTime: {} };
}

let cache: LocalDb | null = null;
const db = () => (cache ??= load());
let onSaved: (() => void) | null = null;

/** Online-Version: eigener Zwischenspeicher je Benutzer, Stand vom Server übernehmen, nach jedem Speichern synchronisieren. */
export const cloudHooks = {
  useUser(name: string, data: LocalDb | null, sync: () => void) {
    KEY = `${BASE_KEY}:user:${name.toLowerCase()}`;
    cache = data ? { ...empty(), ...data } : load();
    onSaved = sync;
    save();
  },
  localSnapshot: (): LocalDb => db(),
  /** Stand aus dem Zwischenspeicher dieses Browsers (ohne ihn zu aktivieren) */
  peek(name: string): LocalDb | null {
    try {
      const raw = localStorage.getItem(`${BASE_KEY}:user:${name.toLowerCase()}`);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
};
const empty = (): LocalDb => ({ kv: {}, skills: {}, attempts: [], tests: [], studyTime: {} });
/** Speichert; ist der Browser-Speicher (~5 MB) voll, werden die ältesten Verlaufseinträge gekürzt,
 *  damit Kenntnisstand, Fragenstatus und Einstellungen nie verloren gehen. */
export function save(store: Pick<Storage, 'setItem'> = localStorage) {
  const d = db();
  for (;;) {
    try {
      store.setItem(KEY, JSON.stringify(d));
      onSaved?.();
      return;
    } catch (e) {
      if (d.attempts.length > 50) d.attempts.splice(0, Math.ceil(d.attempts.length / 4));
      else if (d.tests.length > 3) d.tests.splice(0, Math.ceil(d.tests.length / 4));
      else {
        onSaved?.(); // Server bekommt den Stand trotzdem
        return console.error('Speichern im Browser fehlgeschlagen', e);
      }
    }
  }
}

const NO_AI = 'Der KI-Tutor ist nur in der lokal installierten Version (start.bat) verfügbar. Alle Lern- und Prüfungsfunktionen arbeiten trotzdem vollständig.';

export const localBackend = {
  async state() {
    const d = db();
    return { skills: d.skills, kv: d.kv, studyTime: Object.entries(d.studyTime).map(([day, seconds]) => ({ day, seconds })) };
  },
  async setKv(key: string, value: unknown) {
    db().kv[key] = value;
    save();
    return { ok: true };
  },
  async addAttempt(a: Attempt, s?: SkillState) {
    const d = db();
    const id = (d.attempts[d.attempts.length - 1]?.id ?? 0) + 1;
    d.attempts.push({ ...a, id });
    if (d.attempts.length > 5000) d.attempts.splice(0, d.attempts.length - 5000);
    if (s) d.skills[s.skill] = s;
    save();
    return { id };
  },
  async putSkills(states: SkillState[]) {
    for (const s of states) db().skills[s.skill] = s;
    save();
    return { ok: true };
  },
  async attempts(limit = 500, skill?: string) {
    return db().attempts.filter((a) => !skill || a.skill === skill).slice(-limit).reverse();
  },
  async saveTest(t: TestRecord) {
    const d = db();
    const i = d.tests.findIndex((x) => x.id === t.id);
    if (i >= 0) d.tests[i] = t;
    else d.tests.push(t);
    save();
    return { ok: true };
  },
  async tests() {
    return db().tests.filter((t) => t.tsEnd).sort((a, b) => b.tsStart - a.tsStart);
  },
  async addTime(seconds: number, day: string) {
    const d = db();
    d.studyTime[day] = (d.studyTime[day] ?? 0) + seconds;
    save();
    return { ok: true };
  },
  async exportAll() {
    return { exported: new Date().toISOString(), format: 'browser', ...db() };
  },
  async importAll(data: unknown) {
    const d = data as Partial<LocalDb> & { format?: string };
    if (d.format !== 'browser') throw new Error('Diese Sicherung stammt aus der Server-Version und kann nur dort importiert werden.');
    cache = { kv: d.kv ?? {}, skills: d.skills ?? {}, attempts: d.attempts ?? [], tests: d.tests ?? [], studyTime: d.studyTime ?? {} };
    save();
    return { ok: true };
  },
  async reset() {
    const ai = db().kv;
    cache = { kv: {}, skills: {}, attempts: [], tests: [], studyTime: {} };
    void ai;
    save();
    return { ok: true };
  },
  noAi(): never {
    throw new Error(NO_AI);
  },
  NO_AI,
};
