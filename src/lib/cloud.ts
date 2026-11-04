/**
 * Online-Version mit Benutzerkonto: Anmeldung (Name + Passwort) und Synchronisation des Lernstands.
 * Die App arbeitet wie gewohnt auf dem Browser-Speicher (schnell, auch kurz offline);
 * jede Änderung wird kurz danach als Ganzes beim Server gespeichert.
 */
import { cloudHooks, type LocalDb } from './localBackend';

/** Adresse des Online-Servers; leer = derselbe Server, der die Seite ausliefert */
export const CLOUD_BASE: string = import.meta.env.VITE_CLOUD_URL ?? '';
const TOKEN = 'fisi.cloud.token';
const PENDING = 'fisi.cloud.pending.'; // + Name → Server-Stand (rev), auf dem ungespeicherte Änderungen aufbauen

export type SyncStatus = 'gespeichert' | 'speichert' | 'offline' | 'konflikt';
let status: SyncStatus = 'gespeichert';
const listeners = new Set<(s: SyncStatus) => void>();
const setStatus = (s: SyncStatus) => { status = s; listeners.forEach((l) => l(s)); };
export const syncStatus = { get: () => status, subscribe: (l: (s: SyncStatus) => void) => { listeners.add(l); return () => { listeners.delete(l); }; } };

let user: string | null = null;
let rev = 0;
let timer: ReturnType<typeof setTimeout> | null = null;
let inFlight = false;

const token = () => { try { return localStorage.getItem(TOKEN); } catch { return null; } };
const ls = (k: string, v: string | null) => { try { if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch { /* ohne Speicher */ } };

async function call<T>(method: string, p: string, body?: unknown): Promise<{ status: number; body: T }> {
  const t = token();
  const r = await fetch(CLOUD_BASE + p, { method, headers: { 'Content-Type': 'application/json', ...(t ? { Authorization: 'Bearer ' + t } : {}) }, body: body === undefined ? undefined : JSON.stringify(body) });
  return { status: r.status, body: (await r.json().catch(() => ({}))) as T };
}

let cloudPromise: Promise<boolean> | null = null;
export function isCloud(): Promise<boolean> {
  return (cloudPromise ??= fetch(CLOUD_BASE + '/api/cloud/health')
    .then((r) => r.json())
    .then((d) => d?.cloud === true)
    .catch(() => false));
}

export const currentUser = () => user;

export async function authenticate(kind: 'login' | 'register', username: string, password: string): Promise<void> {
  const r = await call<{ token?: string; error?: string }>('POST', `/api/auth/${kind}`, { username, password });
  if (r.status !== 200 || !r.body.token) throw new Error(r.body.error ?? 'Anmeldung fehlgeschlagen');
  ls(TOKEN, r.body.token);
}

/** Lädt den Lernstand des angemeldeten Benutzers. null = nicht (mehr) angemeldet. */
export async function openSession(): Promise<string | null> {
  if (!token()) return null;
  let r: { status: number; body: { user?: { name: string }; rev?: number; data?: LocalDb | null } };
  try {
    r = await call('GET', '/api/cloud/doc');
  } catch {
    // Server nicht erreichbar: mit dem Zwischenspeicher weiterarbeiten, später synchronisieren
    const name = (() => { try { return localStorage.getItem('fisi.cloud.user'); } catch { return null; } })();
    if (!name) throw new Error('Der Server ist gerade nicht erreichbar. Bitte später erneut versuchen.');
    user = name;
    rev = Number(localStorage.getItem(PENDING + name.toLowerCase()) ?? 0);
    cloudHooks.useUser(name, null, schedule);
    setStatus('offline');
    return name;
  }
  if (r.status === 401) { ls(TOKEN, null); return null; }
  if (r.status !== 200 || !r.body.user) throw new Error('Der Lernstand konnte nicht geladen werden.');
  user = r.body.user.name;
  ls('fisi.cloud.user', user);
  rev = r.body.rev ?? 0;
  // Ungespeicherte Änderungen aus diesem Browser behalten, wenn sie auf dem aktuellen Server-Stand aufbauen
  const pending = localStorage.getItem(PENDING + user.toLowerCase());
  const local = pending !== null && Number(pending) === rev ? cloudHooks.peek(user) : null;
  cloudHooks.useUser(user, local ?? r.body.data ?? null, schedule);
  if (local) void push();
  return user;
}

function schedule() {
  if (!user) return;
  ls(PENDING + user.toLowerCase(), String(rev));
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => { timer = null; void push(); }, 1200);
  if (status !== 'offline') setStatus('speichert');
}

/** Sofort speichern (z. B. beim Verlassen der Seite) */
export function flush() {
  if (timer) { clearTimeout(timer); timer = null; void push(); }
}

async function push(): Promise<void> {
  if (!user) return;
  if (inFlight) { if (timer) clearTimeout(timer); timer = setTimeout(() => { timer = null; void push(); }, 500); return; }
  inFlight = true;
  const name = user;
  try {
    const r = await call<{ rev?: number; data?: LocalDb | null }>('PUT', '/api/cloud/doc', { rev, data: cloudHooks.localSnapshot() });
    if (r.status === 200) {
      rev = r.body.rev!;
      if (!timer) ls(PENDING + name.toLowerCase(), null);
      setStatus(timer ? 'speichert' : 'gespeichert');
    } else if (r.status === 409) {
      // shortcut: auf einem anderen Gerät wurde inzwischen gespeichert → dessen Stand gewinnt; ein Zusammenführen wäre aufwendig und ist in der Klasse selten nötig
      ls(PENDING + name.toLowerCase(), null);
      cloudHooks.useUser(name, r.body.data ?? null, () => {});
      setStatus('konflikt');
      alert('Dein Lernstand wurde inzwischen auf einem anderen Gerät geändert. Die Seite lädt jetzt den neuesten Stand.');
      location.reload();
    } else if (r.status === 401) {
      ls(TOKEN, null);
      location.reload();
    } else {
      throw new Error('HTTP ' + r.status);
    }
  } catch {
    setStatus('offline');
    if (!timer) timer = setTimeout(() => { timer = null; void push(); }, 15000);
  } finally {
    inFlight = false;
  }
}

export async function logout() {
  flush();
  await call('POST', '/api/auth/logout', {}).catch(() => {});
  ls(TOKEN, null);
  ls('fisi.cloud.user', null);
  location.hash = '#/';
  location.reload();
}

if (typeof window !== 'undefined') {
  window.addEventListener('pagehide', flush);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush(); });
}
