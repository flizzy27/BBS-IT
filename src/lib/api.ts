import type { Question } from '../content/types';
import type { SkillState } from '../core/learning';

async function j<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { ...init, headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error ?? `HTTP ${res.status}`);
  return data as T;
}

export interface Attempt {
  id?: number;
  ts: number;
  questionId: string;
  skill: string;
  module?: string;
  kind: string;
  mode: 'lernen' | 'ueben' | 'pruefung' | 'schwaechen' | 'einstufung' | 'vlsm';
  difficulty?: number;
  question: Question;
  response: unknown;
  correct: boolean;
  score: number;
  errorTags: string[];
  hintsUsed: number;
  durationMs: number;
  testId?: string;
  aiGraded?: boolean;
}

export interface TestRecord {
  id: string;
  tsStart: number;
  tsEnd?: number;
  type: string;
  title: string;
  score?: number;
  maxScore?: number;
  timeLimitMin?: number;
  items: { question: Question; response: unknown; correct: boolean; score: number; errorTags: string[]; feedback: string; points: number }[];
}

export interface AiStatus {
  provider: 'none' | 'anthropic' | 'claude-cli';
  model: string;
  effort: string;
  apiKeySet: boolean;
  apiKeySource: string | null;
  apiKeyMasked: string | null;
  cli: string | false;
  models: { id: string; label: string; input: number; output: number }[];
  cliModel?: string;
}

export const api = {
  state: () => j<{ skills: Record<string, SkillState>; kv: Record<string, unknown>; studyTime: { day: string; seconds: number }[] }>('/api/state'),
  setKv: (key: string, value: unknown) => j('/api/kv/' + encodeURIComponent(key), { method: 'PUT', body: JSON.stringify({ value }) }),
  addAttempt: (attempt: Attempt, skillState?: SkillState) => j<{ id: number }>('/api/attempts', { method: 'POST', body: JSON.stringify({ attempt, skillState }) }),
  putSkills: (states: SkillState[]) => j('/api/skills', { method: 'PUT', body: JSON.stringify({ states }) }),
  attempts: (limit = 500, skill?: string) => j<Attempt[]>(`/api/attempts?limit=${limit}${skill ? '&skill=' + encodeURIComponent(skill) : ''}`),
  saveTest: (test: TestRecord) => j('/api/tests', { method: 'POST', body: JSON.stringify({ test }) }),
  tests: () => j<TestRecord[]>('/api/tests'),
  addTime: (seconds: number) => j('/api/time', { method: 'POST', body: JSON.stringify({ seconds, day: localDay() }) }),
  aiStatus: () => j<AiStatus>('/api/ai/status'),
  aiConfig: (cfg: Partial<{ provider: string; model: string; effort: string; apiKey: string; cliModel: string }>) => j<AiStatus>('/api/ai/config', { method: 'PUT', body: JSON.stringify(cfg) }),
  aiTest: () => j<{ ok: boolean; text: string }>('/api/ai/test', { method: 'POST', body: '{}' }),
  aiGrade: (b: { prompt: string; modelAnswer: string; keywords?: string[]; answer: string }) => j<{ score: number; feedback: string; missing: string[] }>('/api/ai/grade', { method: 'POST', body: JSON.stringify(b) }),
  visionVlsm: (image: string) => j<{ base: string; wanPrefix: number; demands: { name: string; hosts: number; kind: 'lan' | 'wan' }[]; notes: string }>('/api/ai/vision-vlsm', { method: 'POST', body: JSON.stringify({ image }) }),
  threads: () => j<{ id: string; title: string; created: number; updated: number }[]>('/api/threads'),
  thread: (id: string) => j<{ thread: { id: string; title: string } | null; messages: { id: number; ts: number; role: 'user' | 'assistant'; content: string }[] }>('/api/threads/' + id),
  deleteThread: (id: string) => j('/api/threads/' + id, { method: 'DELETE' }),
  exportAll: () => j<unknown>('/api/export'),
  importAll: (data: unknown) => j('/api/import', { method: 'POST', body: JSON.stringify(data) }),
  reset: () => j('/api/reset', { method: 'POST', body: JSON.stringify({ confirm: 'ZURÜCKSETZEN' }) }),
};

export function localDay(t = Date.now()): string {
  const d = new Date(t);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Streamt eine Tutor-Antwort per SSE. */
export async function streamChat(
  body: { threadId?: string; message: string; context?: string; title?: string },
  on: { thread?: (id: string) => void; text: (t: string) => void; error: (m: string) => void; done: () => void },
  signal?: AbortSignal,
) {
  let res: Response;
  try {
    res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal });
  } catch (e) {
    on.error((e as Error).name === 'AbortError' ? 'Abgebrochen.' : 'Server nicht erreichbar.');
    return;
  }
  if (!res.body) return on.error('Keine Antwort vom Server.');
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = '';
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      let i;
      while ((i = buf.indexOf('\n\n')) >= 0) {
        const chunk = buf.slice(0, i);
        buf = buf.slice(i + 2);
        const ev = /event: (\w+)/.exec(chunk)?.[1];
        const data = JSON.parse(/data: (.*)/s.exec(chunk)?.[1] ?? '{}');
        if (ev === 'thread') on.thread?.(data.threadId);
        else if (ev === 'text') on.text(data.t);
        else if (ev === 'error') on.error(data.message);
        else if (ev === 'done') on.done();
      }
    }
  } catch (e) {
    on.error((e as Error).name === 'AbortError' ? 'Abgebrochen.' : String(e));
  }
}
