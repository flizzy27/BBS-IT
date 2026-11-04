/**
 * Globaler App-Zustand: Skill-Zustände, Einstellungen, Lektionsfortschritt, Sitzungswiederherstellung,
 * Tutor-Kontext. Persistenz über die lokale Server-API.
 */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { Question } from '../content/types';
import { MODULE_MAP, SKILL_MAP } from '../content';
import { applyEvidence, knowledge, markLessonDone, newSkillState, type SkillState } from '../core/learning';
import type { GradeResult } from '../core/grading';
import { api, backendMode, localDay, type Attempt } from './api';

export interface Settings {
  theme: 'dark' | 'light';
  name: string;
  examDate?: string;
  /** Selbstauskunft des Lernenden (fließt in den Tutor-Kontext) */
  selfReport: string;
  onboarded: boolean;
  placementDone: boolean;
  dailyGoalMin: number;
}

export const DEFAULT_SETTINGS: Settings = {
  theme: 'dark',
  name: '',
  selfReport:
    'Subnetting begonnen. Verstanden: IPv4 = 32 Bit; /24 → 8 Hostbits, 256 Adressen; 1 ausgeliehenes Bit → zwei /25, 2 Bits → vier /26; Subnetze = 2^ausgeliehene Bits; Adressen = 2^Hostbits; 2 reservierte Adressen. Richtig gelöst: 48 Hosts → /26, 23 Hosts → /27, zweites /27-Subnetz von 192.168.1.0 beginnt bei .32, 192.168.10.192/27 endet bei .223. Unsicher: binäre Hintergründe, Funktionsweise der Masken, vollständige Netzplanung.',
  onboarded: false,
  placementDone: false,
  dailyGoalMin: 30,
};

export interface LessonProgress {
  [lessonId: string]: { step: number; done: boolean; updated: number };
}

export interface ResumeInfo {
  route: string;
  label: string;
  ts: number;
}

/** Was der Tutor gerade „sieht“. */
export interface TutorContext {
  view: string;
  question?: Question;
  status?: 'offen' | 'abgegeben';
  response?: unknown;
  result?: Pick<GradeResult, 'correct' | 'score' | 'errorTags' | 'feedback' | 'solution'>;
  extra?: string;
}

interface Ctx {
  loaded: boolean;
  error: string | null;
  skills: Record<string, SkillState>;
  settings: Settings;
  lessonProgress: LessonProgress;
  resume: ResumeInfo | null;
  studyTime: { day: string; seconds: number }[];
  updateSettings: (p: Partial<Settings>) => void;
  setLessonProgress: (lessonId: string, step: number, done?: boolean) => void;
  completeLesson: (lessonId: string, skills: string[]) => void;
  recordAttempt: (a: Omit<Attempt, 'ts' | 'module'> & { ts?: number; weight?: number }) => Promise<SkillState>;
  setResume: (r: Omit<ResumeInfo, 'ts'>) => void;
  tutorContext: TutorContext;
  setTutorContext: (c: TutorContext) => void;
  tutorOpen: boolean;
  setTutorOpen: (o: boolean) => void;
  /** Nachricht, die der Tutor-Bereich sofort senden soll (z. B. „Stopp, das verstehe ich nicht“) */
  tutorQueue: string | null;
  askTutor: (msg: string) => void;
  consumeTutorQueue: () => string | null;
  overallProgress: number;
  reload: () => Promise<void>;
  /** In-App-KI-Tutor eingerichtet (lokale Version mit Anbieter) */
  aiEnabled: boolean;
  staticMode: boolean;
  refreshAi: () => void;
}

const StoreCtx = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [skills, setSkills] = useState<Record<string, SkillState>>({});
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [lessonProgress, setLP] = useState<LessonProgress>({});
  const [resume, setResumeState] = useState<ResumeInfo | null>(null);
  const [studyTime, setStudyTime] = useState<{ day: string; seconds: number }[]>([]);
  const [tutorContext, setTutorContext] = useState<TutorContext>({ view: 'Dashboard' });
  const [tutorOpen, setTutorOpen] = useState(false);
  const [tutorQueue, setTutorQueue] = useState<string | null>(null);
  const [aiEnabled, setAiEnabled] = useState(false);
  const [staticMode, setStaticMode] = useState(false);
  const refreshAi = useCallback(() => {
    backendMode().then((m) => setStaticMode(m === 'static'));
    api.aiStatus().then((s) => setAiEnabled(!s.staticMode && s.provider !== 'none')).catch(() => setAiEnabled(false));
  }, []);
  useEffect(() => refreshAi(), [refreshAi]);
  const skillsRef = useRef(skills);
  skillsRef.current = skills;

  const reload = useCallback(async () => {
    try {
      const s = await api.state();
      setSkills(s.skills);
      setSettings({ ...DEFAULT_SETTINGS, ...((s.kv.settings as Partial<Settings>) ?? {}) });
      setLP((s.kv.lessonProgress as LessonProgress) ?? {});
      setResumeState((s.kv.resume as ResumeInfo) ?? null);
      setStudyTime(s.studyTime);
      setLoaded(true);
      setError(null);
    } catch (e) {
      setError('Der lokale Server ist nicht erreichbar. Bitte die Anwendung über start.bat starten.');
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  // Theme anwenden
  useEffect(() => {
    document.documentElement.dataset.theme = settings.theme;
  }, [settings.theme]);

  // Lernzeit: zählt Minuten, in denen das Fenster sichtbar ist und es in den letzten 3 Minuten Aktivität gab
  useEffect(() => {
    let last = Date.now();
    const act = () => (last = Date.now());
    window.addEventListener('pointerdown', act);
    window.addEventListener('keydown', act);
    window.addEventListener('scroll', act, true);
    const iv = setInterval(() => {
      if (document.visibilityState === 'visible' && Date.now() - last < 180_000) {
        api.addTime(60).catch(() => {});
        setStudyTime((st) => {
          const d = localDay();
          const i = st.findIndex((x) => x.day === d);
          if (i < 0) return [...st, { day: d, seconds: 60 }];
          const c = [...st];
          c[i] = { ...c[i], seconds: c[i].seconds + 60 };
          return c;
        });
      }
    }, 60_000);
    return () => {
      clearInterval(iv);
      window.removeEventListener('pointerdown', act);
      window.removeEventListener('keydown', act);
      window.removeEventListener('scroll', act, true);
    };
  }, []);

  const updateSettings = useCallback((p: Partial<Settings>) => {
    setSettings((s) => {
      const n = { ...s, ...p };
      api.setKv('settings', n).catch(() => {});
      return n;
    });
  }, []);

  const setLessonProgress = useCallback((lessonId: string, step: number, done?: boolean) => {
    setLP((lp) => {
      const prev = lp[lessonId];
      const n = { ...lp, [lessonId]: { step, done: done ?? prev?.done ?? false, updated: Date.now() } };
      api.setKv('lessonProgress', n).catch(() => {});
      return n;
    });
  }, []);

  const completeLesson = useCallback((lessonId: string, skillIds: string[]) => {
    setLessonProgress(lessonId, 0, true);
    const now = Date.now();
    const updated: SkillState[] = [];
    setSkills((cur) => {
      const n = { ...cur };
      for (const id of skillIds) {
        n[id] = markLessonDone(n[id] ?? newSkillState(id), now);
        updated.push(n[id]);
      }
      return n;
    });
    setTimeout(() => api.putSkills(updated).catch(() => {}), 0);
  }, [setLessonProgress]);

  const recordAttempt = useCallback<Ctx['recordAttempt']>(async (a) => {
    const ts = a.ts ?? Date.now();
    const prev = skillsRef.current[a.skill] ?? newSkillState(a.skill);
    const next = applyEvidence(prev, {
      correct: a.correct,
      score: a.score,
      hintsUsed: a.hintsUsed,
      difficulty: (a.difficulty ?? a.question.difficulty ?? 2) as 1 | 2 | 3,
      errorTags: a.errorTags,
      at: ts,
      weight: a.weight,
    });
    setSkills((s) => ({ ...s, [a.skill]: next }));
    const module = SKILL_MAP.get(a.skill)?.module ?? a.question.id.slice(0, 3);
    const { weight, ...rest } = a;
    await api.addAttempt({ ...rest, ts, module }, next).catch((e) => console.error(e));
    return next;
  }, []);

  const setResume = useCallback((r: Omit<ResumeInfo, 'ts'>) => {
    const v = { ...r, ts: Date.now() };
    setResumeState(v);
    api.setKv('resume', v).catch(() => {});
  }, []);

  const askTutor = useCallback((msg: string) => {
    setTutorQueue(msg);
    setTutorOpen(true);
  }, []);
  const consumeTutorQueue = useCallback(() => {
    setTutorQueue(null);
    return null;
  }, []);

  const overallProgress = useMemo(() => {
    // Durchschnittlicher Kenntnisstand über alle AP1-relevanten Skills (nachgewiesenes Verständnis)
    const now = Date.now();
    const ids = [...SKILL_MAP.values()].filter((s) => MODULE_MAP.get(s.module)?.relevance !== 'vertiefung').map((s) => s.id);
    if (!ids.length) return 0;
    return ids.reduce((sum, id) => sum + (skills[id] ? knowledge(skills[id], now) : 0), 0) / ids.length;
  }, [skills]);

  const value: Ctx = {
    loaded, error, skills, settings, lessonProgress, resume, studyTime, updateSettings, setLessonProgress, completeLesson, recordAttempt,
    setResume, tutorContext, setTutorContext, tutorOpen, setTutorOpen, tutorQueue, askTutor, consumeTutorQueue, overallProgress, reload, aiEnabled, staticMode, refreshAi,
  };
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore(): Ctx {
  const c = useContext(StoreCtx);
  if (!c) throw new Error('StoreProvider fehlt');
  return c;
}

/* ------------------------- Einfacher Hash-Router ------------------------- */

export function useRoute(): [string, (r: string) => void] {
  const [route, setRoute] = useState(() => location.hash.slice(1) || '/');
  useEffect(() => {
    const h = () => setRoute(location.hash.slice(1) || '/');
    window.addEventListener('hashchange', h);
    return () => window.removeEventListener('hashchange', h);
  }, []);
  const nav = useCallback((r: string) => {
    location.hash = r;
  }, []);
  return [route, nav];
}

export function navigate(r: string) {
  location.hash = r;
}
