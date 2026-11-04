/**
 * Prüfungs- und Testmodus: Testgenerator, zeitbegrenzte Prüfung ohne Hilfen,
 * ausführliche Auswertung mit IHK-Notenschlüssel. Enthält auch den Einstufungstest.
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AREAS, MODULES, MODULE_MAP, QUESTIONS, SKILL_MAP, moduleArea, skillTitle } from '../content';
import type { Difficulty, Question } from '../content/types';
import { GENERATORS, generate } from '../core/generators';
import { grade, type GradeResult, type ResponseValue } from '../core/grading';
import { errorInfo } from '../core/errors';
import { Rng } from '../core/rng';
import { api, type TestRecord } from '../lib/api';
import { navigate, useStore } from '../lib/store';
import { practicableSkills, weakSkills } from '../lib/recommend';
import { Empty, Icon, Md, Progress, fmtDate, LineChart } from '../components/common';
import { QuestionView, ResultView, kindLabel } from '../components/QuestionView';

/* ---------------- IHK-Notenschlüssel (100-Punkte-Schlüssel) ---------------- */
export function ihkGrade(points: number): { note: number; label: string; color: string } {
  const p = Math.round(points);
  if (p >= 92) return { note: 1, label: 'sehr gut', color: 'var(--ok)' };
  if (p >= 81) return { note: 2, label: 'gut', color: 'var(--ok)' };
  if (p >= 67) return { note: 3, label: 'befriedigend', color: 'var(--info)' };
  if (p >= 50) return { note: 4, label: 'ausreichend', color: 'var(--warn)' };
  if (p >= 30) return { note: 5, label: 'mangelhaft', color: 'var(--bad)' };
  return { note: 6, label: 'ungenügend', color: 'var(--bad)' };
}

const BASE_POINTS: Record<Question['kind'], number> = { single: 3, multi: 4, match: 4, order: 4, text: 4, number: 5, ip: 5, cidr: 4, table: 8, free: 8, vlsm: 14 };
const OPEN_KINDS: Question['kind'][] = ['number', 'ip', 'cidr', 'text', 'table', 'free', 'vlsm'];

export type TestType = 'kurz' | 'modul' | 'gemischt' | 'schwaechen' | 'rechnen' | 'ap1' | 'ap1komplett' | 'einstufung';

interface TestConfig { type: TestType; module?: string; count: number; minutes: number | null; title: string }

const TYPES: { type: TestType; title: string; desc: string; icon: string; count: number; minutes: number | null }[] = [
  { type: 'kurz', title: 'Kurzer Wissenstest', desc: '8 gemischte Fragen zu bereits begonnenen Themen.', icon: 'Zap', count: 8, minutes: null },
  { type: 'modul', title: 'Thematischer Test', desc: 'Alle Aufgabenarten zu einem Modul.', icon: 'BookMarked', count: 12, minutes: 25 },
  { type: 'gemischt', title: 'Gemischter Netzwerktest', desc: '20 Aufgaben über alle Module.', icon: 'Shuffle', count: 20, minutes: 40 },
  { type: 'schwaechen', title: 'Schwachstellen-Test', desc: 'Gezielt deine unsichersten Themen.', icon: 'Target', count: 10, minutes: 20 },
  { type: 'rechnen', title: 'Rechen-Marathon', desc: 'Anspruchsvolle Subnetting-, VLSM-, IPv6- und Übertragungsrechnungen.', icon: 'Calculator', count: 10, minutes: 35 },
  { type: 'ap1komplett', title: 'AP1-Simulation komplett', desc: 'Wie die echte Prüfung: 4 Aufgaben à 25 Punkte aus allen Fachbereichen, nur offene Aufgaben, 90 Minuten, IHK-Notenschlüssel.', icon: 'Trophy', count: 20, minutes: 90 },
  { type: 'ap1', title: 'AP1-Simulation Netzwerk', desc: 'Prüfungsnah: 90 Minuten, offene Aufgaben ohne Hilfen, 100 Punkte, IHK-Notenschlüssel.', icon: 'GraduationCap', count: 22, minutes: 90 },
];

function pickQuestions(cfg: TestConfig, skills: Record<string, import('../core/learning').SkillState>): Question[] {
  const rng = new Rng((Math.random() * 2 ** 32) >>> 0);
  const out: Question[] = [];
  const used = new Set<string>();
  const add = (q: Question | null | undefined) => {
    if (q && !used.has(q.id)) {
      used.add(q.id);
      out.push(q);
    }
  };
  const fromSkill = (skill: string, d: Difficulty, preferOpen = false) => {
    const gens = GENERATORS.filter((g) => g.skill === skill);
    let pool = QUESTIONS.filter((q) => q.skill === skill && !used.has(q.id));
    if (preferOpen) {
      const open = pool.filter((q) => OPEN_KINDS.includes(q.kind));
      if (open.length) pool = open;
    }
    if (gens.length && (!pool.length || rng.bool(0.6))) return generate(rng.pick(gens).id, d, (rng.next() * 2 ** 32) >>> 0);
    const fit = pool.filter((q) => Math.abs(q.difficulty - d) <= 1);
    return pool.length ? rng.pick(fit.length ? fit : pool) : null;
  };

  if (cfg.type === 'modul' && cfg.module) {
    const ids = rng.shuffle(practicableSkills(cfg.module));
    for (let i = 0; out.length < cfg.count && i < cfg.count * 4; i++) add(fromSkill(ids[i % ids.length], (1 + (i % 3)) as Difficulty));
  } else if (cfg.type === 'schwaechen') {
    const ids = weakSkills(skills, Date.now(), 8);
    const list = ids.length ? ids : practicableSkills();
    for (let i = 0; out.length < cfg.count && i < cfg.count * 4; i++) add(fromSkill(list[i % list.length], 2));
  } else if (cfg.type === 'rechnen') {
    const ids = ['ipv4.network', 'ipv4.broadcast', 'subnet.table', 'subnet.nth', 'subnet.hosts2prefix', 'vlsm.plan', 'ipv6.compress', 'ipv6.subnets', 'calc.transfertime', 'subnet.split', 'routing.lpm', 'calc.units'];
    for (const id of rng.shuffle(ids).slice(0, cfg.count)) {
      const g = GENERATORS.find((x) => x.skill === id);
      if (g) add(generate(g.id, 3, (rng.next() * 2 ** 32) >>> 0));
    }
  } else if (cfg.type === 'kurz') {
    const started = practicableSkills().filter((id) => skills[id]);
    const list = rng.shuffle(started.length >= 3 ? started : practicableSkills());
    for (let i = 0; out.length < cfg.count && i < cfg.count * 4; i++) add(fromSkill(list[i % list.length], 2));
  } else if (cfg.type === 'ap1komplett') {
    for (const block of AP1_BLOCKS) {
      const mods = MODULES.filter((m) => block.areas.includes(moduleArea(m)) && m.relevance !== 'vertiefung');
      const ids = rng.shuffle(mods.flatMap((m) => practicableSkills(m.id)));
      let n = 0;
      for (let i = 0; n < 5 && i < ids.length * 2; i++) {
        const q = fromSkill(ids[i % ids.length], rng.bool(0.6) ? 2 : rng.bool(0.5) ? 3 : 1, true);
        if (!q || q.kind === 'vlsm' || out.some((x) => x.skill === q.skill)) continue;
        const before = out.length;
        add(q);
        if (out.length > before) {
          (q as Question & { block?: number }).block = AP1_BLOCKS.indexOf(block);
          n++;
        }
      }
    }
  } else if (cfg.type === 'einstufung') {
    // Einstufung: Grundlagen breit, Schwerpunkt Binär/IPv4/Subnetting (bekannte Lücke)
    const plan: [string, Difficulty][] = [
      ['basics.devices', 1], ['osi.layers', 1], ['bin.bin2dec', 1], ['bin.dec2bin', 2], ['bin.powers', 1], ['bin.and', 2],
      ['ipv4.structure', 1], ['ipv4.netvshost', 1], ['ipv4.mask', 1], ['ipv4.mask', 2], ['ipv4.hostrange', 1], ['ipv4.private', 2], ['ipv4.gateway', 2],
      ['ipv4.hostcount', 1], ['subnet.hosts2prefix', 1], ['subnet.count', 1], ['subnet.blocksize', 2], ['ipv4.network', 2], ['ipv4.broadcast', 2], ['subnet.nth', 2], ['subnet.table', 2],
      ['vlsm.sizing', 2], ['ipv6.compress', 1], ['calc.transfertime', 1], ['routing.lpm', 1],
    ];
    for (const [id, d] of plan) if (SKILL_MAP.has(id)) add(fromSkill(id, d));
    // dazu zwei Fragen je Fachbereich (außer Netzwerk) aus prüfungsrelevanten Modulen – hält den Test bei rund 40 Aufgaben
    for (const a of AREAS) {
      if (a.id === 'netzwerk') continue;
      const pool = MODULES.filter((m) => moduleArea(m) === a.id && m.relevance !== 'vertiefung').flatMap((m) => m.questions.filter((q) => q.difficulty <= 2 && q.kind !== 'free'));
      for (const q of rng.shuffle(pool).slice(0, 2)) add(q);
    }
  } else {
    // gemischt / ap1: über alle Module verteilt, AP1-relevante stärker gewichtet
    const weights = MODULES.flatMap((m) => {
      const w = cfg.type === 'ap1' ? (m.relevance === 'ap1' ? 3 : m.relevance === 'ap1-teilweise' ? 2 : 0) : 2;
      return practicableSkills(m.id).flatMap((id) => Array(w).fill(id) as string[]);
    });
    const preferOpen = cfg.type === 'ap1';
    for (let i = 0; out.length < cfg.count && i < cfg.count * 6; i++) {
      const id = rng.pick(weights);
      const d: Difficulty = cfg.type === 'ap1' ? (rng.bool(0.6) ? 2 : rng.bool(0.5) ? 3 : 1) : ((1 + (i % 3)) as Difficulty);
      const q = fromSkill(id, d, preferOpen);
      if (q && cfg.type === 'ap1' && q.kind === 'vlsm' && out.some((x) => x.kind === 'vlsm')) continue;
      if (q && out.filter((x) => x.skill === q.skill).length >= 2) continue;
      add(q);
    }
    if (cfg.type === 'ap1') {
      // Prüfungsnah: offene Formate zuerst, Rechenaufgaben garantiert
      for (const g of ['subnet.table', 'calc.transfertime', 'ipv6.compress']) if (!out.some((q) => q.skill === GENERATORS.find((x) => x.id === g)?.skill)) add(generate(g, 2));
    }
  }
  return out;
}

/** Aufgabenblöcke der Komplett-Simulation: je 25 Punkte, Fachbereiche nach Prüfungskatalog/Themenstatistik. */
export const AP1_BLOCKS: { title: string; areas: string[]; scenario: string }[] = [
  { title: 'Netzwerk & IP-Konfiguration', areas: ['netzwerk'], scenario: 'Die Elektro Krämer GmbH richtet für neue Mitarbeitende Arbeitsplätze ein und bindet sie ins Firmennetz ein.' },
  { title: 'IT-Systeme, Hardware & Betrieb', areas: ['hardware', 'systeme'], scenario: 'Für die Abteilung Vertrieb werden neue Arbeitsplatzrechner ausgewählt, installiert und übergeben.' },
  { title: 'IT-Sicherheit & Datenschutz', areas: ['sicherheit', 'daten'], scenario: 'Die Geschäftsführung möchte die Sicherheit der neuen Arbeitsplätze und den Datenschutz verbessern.' },
  { title: 'Programmierung, Wirtschaft & Kundenberatung', areas: ['programmierung', 'wirtschaft'], scenario: 'Ein Kunde des Systemhauses benötigt eine Beratung, ein Angebot und ein kleines Hilfsprogramm.' },
];

export function pointsFor(qs: Question[], total = 100): number[] {
  const raw = qs.map((q) => BASE_POINTS[q.kind] * (q.difficulty === 3 ? 1.3 : q.difficulty === 1 ? 0.8 : 1));
  const sum = raw.reduce((a, b) => a + b, 0) || 1;
  const pts = raw.map((r) => Math.round((r / sum) * total * 2) / 2);
  // Rundungsdifferenz auf die größte Aufgabe
  const diff = total - pts.reduce((a, b) => a + b, 0);
  const maxI = pts.indexOf(Math.max(...pts));
  pts[maxI] = Math.round((pts[maxI] + diff) * 2) / 2;
  return pts;
}

/* ------------------------------------------------------------------ */

export function ExamHome() {
  const [tests, setTests] = useState<TestRecord[]>([]);
  const [module, setModule] = useState(() => new URLSearchParams(location.hash.split('?')[1] ?? '').get('modul') ?? 'm05');
  useEffect(() => {
    api.tests().then(setTests).catch(() => {});
  }, []);
  const ap1 = tests.filter((t) => t.type === 'ap1' || t.type === 'ap1komplett').reverse();
  const { drafts, saveDraft } = useStore();
  const open = Object.entries(drafts).filter(([k]) => k.startsWith('exam:')) as [string, ExamDraft][];
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Prüfung & Tests</h1>
          <p>Ohne Hilfestellungen. Die Auswertung kommt erst nach der Abgabe – mit Lösungsweg, Fehleranalyse und Empfehlungen.</p>
        </div>
      </div>
      {open.length > 0 && (
        <div className="card mb">
          <div className="card-title"><Icon name="PlayCircle" size={18} />Angefangene Tests</div>
          {open.map(([k, d]) => {
            const [, t, m] = k.split(':');
            const title = t === 'modul' ? `Modultest: ${MODULE_MAP.get(m)?.title ?? m}` : t === 'einstufung' ? 'Einstufungstest' : TYPES.find((x) => x.type === t)?.title ?? t;
            const n = d.responses.filter((r) => r !== null && r !== '').length;
            return (
              <div key={k} className="row between wrap" style={{ padding: '6px 0' }}>
                <div><b>{title}</b> <span className="small muted">· {n}/{d.responses.length} beantwortet · gespeichert {fmtDate(d.saved)}</span></div>
                <div className="row">
                  <button className="btn sm ghost" onClick={() => { if (window.confirm('Diesen angefangenen Test verwerfen?')) saveDraft(k, null); }}>Verwerfen</button>
                  <button className="btn sm primary" onClick={() => navigate(`/pruefung/start/${t}${m ? '/' + m : ''}`)}>Fortsetzen</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="grid grid-3">
        {TYPES.map((t) => (
          <div key={t.type} className="card module-card" style={t.type === 'ap1' || t.type === 'ap1komplett' ? { borderColor: 'var(--accent)', background: 'radial-gradient(500px 120px at 0 0, var(--accent-soft), transparent), var(--surface)' } : undefined}
            onClick={() => navigate(`/pruefung/start/${t.type}${t.type === 'modul' ? '/' + module : ''}`)}>
            <div className="row"><div className="module-icon"><Icon name={t.icon} /></div><b>{t.title}</b></div>
            <div className="small muted" style={{ flex: 1 }}>{t.desc}</div>
            <div className="row tiny dim between"><span>{t.count} Aufgaben</span><span>{t.minutes ? `${t.minutes} min` : 'ohne Zeitlimit'}</span></div>
            {t.type === 'modul' && (
              <select className="input" value={module} onClick={(e) => e.stopPropagation()} onChange={(e) => setModule(e.target.value)}>
                {MODULES.map((m) => <option key={m.id} value={m.id}>{m.nr}. {m.title}</option>)}
              </select>
            )}
          </div>
        ))}
      </div>
      <div className="block explain mt">
        <div className="block-label"><Icon name="Info" size={14} />Wie realistisch ist die AP1-Simulation?</div>
        <Md>{`Die Simulation bildet das **Format** der AP1 nach (90 Minuten, offene Aufgaben, 100 Punkte, IHK-Notenschlüssel: 92 / 81 / 67 / 50 / 30 Punkte) und deckt den **Netzwerkanteil** ab. Die echte AP1 enthält zusätzlich weitere Bereiche (z. B. Hardware, IT-Sicherheit, Datenschutz, Wirtschaftlichkeit). Ein Bestehen hier ist ein starkes Signal für den Netzwerkteil – aber keine Garantie für die gesamte Prüfung. Weitere Fachbereiche sind in der Roadmap vorgesehen (\`docs/ROADMAP.md\`).`}</Md>
      </div>
      <div className="grid grid-2 mt">
        <div className="card">
          <div className="card-title"><Icon name="TrendingUp" size={18} />Entwicklung AP1-Simulation</div>
          <LineChart points={ap1.map((t) => ({ label: new Date(t.tsStart).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' }), value: t.score ?? 0 }))} />
        </div>
        <div className="card">
          <div className="card-title"><Icon name="History" size={18} />Letzte Tests</div>
          {tests.length === 0 ? <Empty icon="ClipboardList">Noch keine Tests abgeschlossen.</Empty> : (
            <table className="table small">
              <tbody>
                {tests.slice(0, 10).map((t) => {
                  const pct = t.maxScore ? (t.score ?? 0) / t.maxScore : 0;
                  return (
                    <tr key={t.id} className="clickable" onClick={() => navigate(`/pruefung/ergebnis/${t.id}`)}>
                      <td>{t.title}</td>
                      <td className="dim">{fmtDate(t.tsStart)}</td>
                      <td style={{ width: 100 }}><Progress value={pct} ok={pct >= 0.5} /></td>
                      <td className="mono">{Math.round(pct * 100)} %</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

interface ExamDraft {
  questions: Question[];
  points: number[];
  responses: ResponseValue[];
  cur: number;
  elapsedMs: number;
  testId: string;
  qTime: number[];
  saved: number;
}

export const draftKey = (type: TestType, module?: string) => `exam:${type}:${module ?? ''}`;

/** Hält den Zwischenstand; „Neu beginnen“ verwirft ihn und startet frisch. */
export function ExamRun({ type, module }: { type: TestType; module?: string }) {
  const { drafts, saveDraft } = useStore();
  const key = draftKey(type, module);
  const [state, setState] = useState(() => ({ n: 0, draft: drafts[key] as ExamDraft | undefined }));
  const restart = () => {
    saveDraft(key, null);
    setState((s) => ({ n: s.n + 1, draft: undefined }));
  };
  return <ExamRunInner key={key + state.n} type={type} module={module} draft={state.draft} onRestart={restart} />;
}

function ExamRunInner({ type, module, draft, onRestart }: { type: TestType; module?: string; draft?: ExamDraft; onRestart: () => void }) {
  const { skills, recordAttempt, updateSettings, setResume, saveDraft } = useStore();
  const key = draftKey(type, module);
  const meta = TYPES.find((t) => t.type === type);
  const cfg: TestConfig = useMemo(() => {
    if (type === 'einstufung') return { type, count: 30, minutes: null, title: 'Einstufungstest' };
    return { type, module, count: meta?.count ?? 10, minutes: meta?.minutes ?? null, title: type === 'modul' ? `Modultest: ${MODULE_MAP.get(module ?? '')?.title}` : meta?.title ?? 'Test' };
  }, [type, module]); // eslint-disable-line react-hooks/exhaustive-deps

  const [questions] = useState(() => draft?.questions ?? pickQuestions(cfg, skills));
  const [points] = useState(() => {
    if (draft?.points) return draft.points;
    const blocks = questions.map((q) => (q as Question & { block?: number }).block);
    if (type !== 'ap1komplett' || blocks.some((b) => b === undefined)) return pointsFor(questions);
    const pts = questions.map(() => 0);
    const used = [...new Set(blocks as number[])];
    for (const b of used) {
      const idx = questions.map((_, i) => i).filter((i) => blocks[i] === b);
      const p = pointsFor(idx.map((i) => questions[i]), 100 / used.length);
      idx.forEach((i, k) => (pts[i] = p[k]));
    }
    return pts;
  });
  const [responses, setResponses] = useState<ResponseValue[]>(() => draft?.responses ?? questions.map(() => null));
  const [cur, setCur] = useState(() => draft?.cur ?? 0);
  // Zeit läuft nur, solange der Test offen ist: beim Fortsetzen zählt die bisher verbrauchte Zeit weiter
  const [started] = useState(() => Date.now() - (draft?.elapsedMs ?? 0));
  const [left, setLeft] = useState(cfg.minutes ? cfg.minutes * 60 - Math.floor((draft?.elapsedMs ?? 0) / 1000) : 0);
  const [submitted, setSubmitted] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const testId = useRef(draft?.testId ?? `t-${Date.now().toString(36)}`);
  const qStart = useRef<number[]>(questions.map(() => 0));
  const qTime = useRef<number[]>(draft?.qTime ?? questions.map(() => 0));

  useEffect(() => {
    setResume({ route: location.hash.slice(1) || '/pruefung', label: cfg.title });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Zwischenstand bei jeder Änderung (und jede Minute wegen der Zeit) sichern
  const minute = Math.floor((Date.now() - started) / 60000);
  useEffect(() => {
    if (submitted) return;
    const d: ExamDraft = { questions, points, responses, cur, elapsedMs: Date.now() - started, testId: testId.current, qTime: qTime.current, saved: Date.now() };
    saveDraft(key, d);
  }, [responses, cur, minute, submitted]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    qStart.current[cur] = Date.now();
    return () => {
      qTime.current[cur] += Date.now() - qStart.current[cur];
    };
  }, [cur]);

  useEffect(() => {
    if (!cfg.minutes || submitted) return;
    const iv = setInterval(() => {
      const l = cfg.minutes! * 60 - Math.floor((Date.now() - started) / 1000);
      setLeft(l);
      if (l <= 0) submit();
    }, 1000);
    return () => clearInterval(iv);
  }); // eslint-disable-line react-hooks/exhaustive-deps

  const submit = async () => {
    if (submitted) return;
    setSubmitted(true);
    saveDraft(key, null);
    const items = questions.map((q, i) => {
      const r = grade(q, responses[i] ?? null);
      return { question: q, response: responses[i], correct: r.correct, score: r.pending ? 0 : r.score, errorTags: r.errorTags, feedback: r.feedback, points: points[i], pending: !!r.pending };
    });
    const score = items.reduce((s, it) => s + it.score * it.points, 0);
    const test: TestRecord = { id: testId.current, tsStart: started, tsEnd: Date.now(), type, title: cfg.title, score, maxScore: 100, timeLimitMin: cfg.minutes ?? undefined, items };
    await api.saveTest(test);
    for (const [i, it] of items.entries()) {
      if (it.pending) continue;
      await recordAttempt({ questionId: it.question.id, skill: it.question.skill, kind: it.question.kind, mode: type === 'einstufung' ? 'einstufung' : 'pruefung', difficulty: it.question.difficulty, question: it.question, response: it.response, correct: it.correct, score: it.score, errorTags: it.errorTags, hintsUsed: 0, durationMs: qTime.current[i], testId: testId.current, weight: type === 'einstufung' ? 1.5 : 1.2 });
    }
    if (type === 'einstufung') updateSettings({ placementDone: true });
    navigate(`/pruefung/ergebnis/${testId.current}`);
  };

  if (!questions.length) return <div className="page"><Empty>Für diese Auswahl konnten keine Aufgaben erzeugt werden.</Empty></div>;
  const answeredCount = responses.filter((r) => r !== null && r !== '' && !(Array.isArray(r) && r.length === 0)).length;
  const mm = Math.floor(Math.max(0, left) / 60);
  const ss = Math.max(0, left) % 60;

  return (
    <div className="page narrow">
      <div className="row between">
        <div>
          <h2 style={{ margin: 0 }}>{cfg.title}</h2>
          <div className="small muted">{type === 'einstufung' ? 'Beantworte ehrlich – raten verfälscht deine Einstufung. „Weiß ich nicht“ ist erlaubt (einfach leer lassen).' : 'Keine Hilfen, keine Rückmeldung bis zur Abgabe.'}</div>
          <div className="tiny dim mt-xs">
            <Icon name="Save" size={12} /> {draft ? 'Fortgesetzt – ' : ''}Dein Stand wird automatisch gespeichert. Du kannst die Seite jederzeit verlassen.
            {' '}<button className="linkbtn" onClick={() => { if (confirmRestart()) onRestart(); }}>Neu beginnen</button>
          </div>
        </div>
        {cfg.minutes && <div className={`timer ${left < 300 ? 'low' : ''}`}><Icon name="Timer" size={16} /> {String(mm).padStart(2, '0')}:{String(ss).padStart(2, '0')}</div>}
      </div>
      <div className="row wrap mt" style={{ gap: 5 }}>
        {questions.map((q, i) => {
          const done = responses[i] !== null && responses[i] !== '';
          return (
            <button key={i} className={`btn sm ${i === cur ? 'primary' : ''}`} style={{ minWidth: 38, opacity: done || i === cur ? 1 : 0.6 }} onClick={() => setCur(i)} title={`${kindLabel(q.kind)} · ${points[i]} P.`}>
              {i + 1}{done && i !== cur && <Icon name="Check" size={11} />}
            </button>
          );
        })}
      </div>
      {type === 'ap1komplett' && (questions[cur] as Question & { block?: number }).block !== undefined && (() => {
        const b = (questions[cur] as Question & { block?: number }).block!;
        const idx = questions.filter((q) => (q as Question & { block?: number }).block === b);
        const sub = idx.indexOf(questions[cur]);
        return (
          <div className="block explain mt" style={{ padding: '12px 16px' }}>
            <b>Aufgabe {b + 1}: {AP1_BLOCKS[b].title}</b> <span className="small muted">· Teilaufgabe {String.fromCharCode(97 + sub)})</span>
            <div className="small muted">{AP1_BLOCKS[b].scenario}</div>
          </div>
        );
      })()}
      <div className="row small muted mt"><span>Aufgabe {cur + 1}/{questions.length}</span><span>·</span><b>{points[cur]} Punkte</b><span>·</span><span>{answeredCount} beantwortet</span></div>
      <div className="mt">
        <QuestionView
          key={questions[cur].id + cur}
          question={questions[cur]}
          mode={type === 'einstufung' ? 'einstufung' : 'pruefung'}
          hideSubmit
          initialResponse={responses[cur] ?? undefined}
          onChange={(r) => setResponses((rs) => { const n = [...rs]; n[cur] = r; return n; })}
        />
      </div>
      <div className="row mt">
        <button className="btn" onClick={() => setCur(Math.max(0, cur - 1))} disabled={cur === 0}><Icon name="ArrowLeft" size={16} /> Zurück</button>
        <span className="spacer" />
        {cur < questions.length - 1 ? (
          <>
            <button className="btn sm ghost" onClick={() => setConfirm(true)} title="Den ganzen Test jetzt beenden und auswerten"><Icon name="Flag" size={14} /> Test abgeben</button>
            <button className="btn primary" onClick={() => setCur(cur + 1)}>Weiter <Icon name="ArrowRight" size={16} /></button>
          </>
        ) : (
          <button className="btn primary" onClick={() => setConfirm(true)}><Icon name="Flag" size={16} /> Test abgeben</button>
        )}
      </div>
      {confirm && (
        <div className="modal-back" onClick={() => setConfirm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Test abgeben?</h2>
            <p className="muted">{answeredCount} von {questions.length} Aufgaben beantwortet.{answeredCount < questions.length && ' Unbeantwortete Aufgaben werden mit 0 Punkten bewertet.'}</p>
            <div className="row"><span className="spacer" /><button className="btn" onClick={() => setConfirm(false)}>Weiter bearbeiten</button><button className="btn primary" onClick={submit}>Jetzt abgeben</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

const confirmRestart = () => window.confirm('Test neu beginnen? Dein bisheriger Stand in diesem Test wird verworfen.');

/* ------------------------------------------------------------------ */

/** Selbstdiagnose: Warum wurden Punkte verloren? (Prüfungsverhalten statt nur Fachwissen) */
const REASONS: { id: string; label: string; tip: string }[] = [
  { id: 'wissen', label: 'Wusste es nicht', tip: 'Thema im Fragenkatalog lernen – erst die Lektion („Kurz & einfach“), dann die Fragen, bis sie sicher sitzen.' },
  { id: 'operator', label: 'Aufgabe falsch gelesen', tip: 'Operator unterstreichen: „nennen“ = Stichworte, „erläutern“ = mit Begründung/Beispiel, „beurteilen“ = Entscheidung + Begründung. Auf Anzahl achten („zwei Vorteile“).' },
  { id: 'beleg', label: 'Beleg nicht genutzt', tip: 'Vor dem Antworten den Beleg (Tabelle, Datenblatt, Angebot) markieren: Welche Werte braucht die Aufgabe? Antworten immer auf die Handlungssituation beziehen.' },
  { id: 'rechenweg', label: 'Rechenweg/Einheit', tip: 'Formel hinschreiben, Werte mit Einheit einsetzen, Zwischenergebnisse notieren – auch bei falschem Ergebnis gibt es Teilpunkte für den Weg.' },
  { id: 'fluechtig', label: 'Flüchtigkeitsfehler', tip: 'Am Ende 5 Minuten zum Kontrollieren einplanen: Einheiten, Kommastellen, Rundungsvorgabe.' },
  { id: 'zeit', label: 'Zeit hat nicht gereicht', tip: 'Zeitplan: ca. 20 Minuten je 25-Punkte-Aufgabe. Erst alles bearbeiten, was du sicher kannst, dann den Rest.' },
];

export function ExamResult({ id }: { id: string }) {
  const [test, setTest] = useState<TestRecord | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const { recordAttempt } = useStore();
  useEffect(() => {
    api.tests().then((ts) => setTest(ts.find((t) => t.id === id) ?? null)).catch(() => {});
  }, [id]);
  if (!test) return <div className="page"><Empty icon="Loader">Lade Ergebnis …</Empty></div>;
  const pending = test.items.filter((it) => (it as { pending?: boolean }).pending);
  const score = test.score ?? 0;
  const g = ihkGrade(score);
  const bySkill = new Map<string, { got: number; max: number }>();
  for (const it of test.items) {
    const e = bySkill.get(it.question.skill) ?? { got: 0, max: 0 };
    e.got += it.score * it.points;
    e.max += it.points;
    bySkill.set(it.question.skill, e);
  }
  const errs = new Map<string, number>();
  for (const it of test.items) for (const t of it.errorTags) errs.set(t, (errs.get(t) ?? 0) + 1);
  const dur = test.tsEnd ? Math.round((test.tsEnd - test.tsStart) / 60000) : 0;
  const lost = test.items.map((it, i) => ({ it, i })).filter(({ it }) => !(it as { pending?: boolean }).pending && it.score < 1);
  const reasonCount = REASONS.map((r) => ({ ...r, n: lost.filter(({ it }) => it.reason === r.id).length })).filter((r) => r.n > 0).sort((a, b) => b.n - a.n);
  const setReason = async (i: number, reason: string) => {
    const t2 = { ...test, items: test.items.map((it, j) => (j === i ? { ...it, reason } : it)) };
    setTest(t2);
    await api.saveTest(t2);
  };

  const rateFree = async (i: number, s: number) => {
    const items = test.items.map((it, j) => (j === i ? { ...it, score: s, correct: s >= 0.75, pending: false } : it));
    const sc = items.reduce((a, it) => a + it.score * it.points, 0);
    const t2 = { ...test, items, score: sc };
    setTest(t2);
    await api.saveTest(t2);
    const it = items[i];
    await recordAttempt({ questionId: it.question.id, skill: it.question.skill, kind: 'free', mode: test.type === 'einstufung' ? 'einstufung' : 'pruefung', difficulty: it.question.difficulty, question: it.question, response: it.response, correct: s >= 0.75, score: s, errorTags: s >= 0.75 ? [] : [`${it.question.skill}:freitext`], hintsUsed: 0, durationMs: 0, testId: test.id });
  };

  return (
    <div className="page">
      <button className="btn ghost sm" onClick={() => navigate('/pruefung')}><Icon name="ArrowLeft" size={14} /> Prüfung & Tests</button>
      <div className="hero mt">
        <div className="card pad-lg hero-card">
          <div className="dim small">{test.title} · {fmtDate(test.tsStart)} · {dur} min</div>
          <div className="row mt" style={{ gap: 30, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1 }}>{Math.round(score * 10) / 10}<span className="dim" style={{ fontSize: '1.2rem' }}> / 100 Punkte</span></div>
              <div className="mt" style={{ fontSize: '1.3rem', fontWeight: 700, color: g.color }}>Note {g.note} – {g.label}</div>
              <div className="small muted">IHK-Notenschlüssel · {score >= 50 ? 'Bestehensgrenze (50 Punkte) erreicht' : `noch ${Math.ceil(50 - score)} Punkte bis zur Bestehensgrenze`}</div>
            </div>
          </div>
          {pending.length > 0 && <div className="hint mt">{pending.length} Freitext-Aufgabe(n) noch nicht bewertet – unten selbst bewerten, dann wird die Punktzahl aktualisiert.</div>}
        </div>
        <div className="card">
          <div className="card-title"><Icon name="AlertTriangle" size={18} />Häufigste Fehler</div>
          {errs.size === 0 ? <div className="small muted">Keine Fehler erkannt.</div> : [...errs.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([t, c]) => (
            <div key={t} className="row small between" style={{ padding: '4px 0' }}><span>{errorInfo(t).title}</span><span className="badge bad">{c}×</span></div>
          ))}
          <button className="btn sm mt" onClick={() => navigate('/schwaechen')}><Icon name="Target" size={14} />Schwachstellen trainieren</button>
        </div>
      </div>
      <div className="card mt">
        <div className="card-title"><Icon name="LayoutList" size={18} />Ergebnis nach Themen & Empfehlungen</div>
        {[...bySkill.entries()].sort((a, b) => a[1].got / a[1].max - b[1].got / b[1].max).map(([sk, v]) => (
          <div key={sk} className="skill-row" style={{ gridTemplateColumns: '1fr 120px 80px auto' }}>
            <span>{skillTitle(sk)}</span>
            <Progress value={v.got / v.max} ok={v.got / v.max >= 0.8} />
            <span className="small mono">{Math.round(v.got * 10) / 10}/{v.max}</span>
            {v.got / v.max < 0.8 ? <button className="btn sm" onClick={() => navigate(`/ueben/skill/${sk}`)}>Üben</button> : <span />}
          </div>
        ))}
      </div>
      {lost.length > 0 && test.type !== 'einstufung' && (
        <div className="card mt">
          <div className="card-title"><Icon name="Stethoscope" size={18} />Selbstdiagnose: Woran lag es?</div>
          <p className="small muted" style={{ marginTop: 0 }}>Wähle bei jeder Aufgabe mit Punktverlust den Hauptgrund. In der echten Prüfung gehen viele Punkte nicht durch fehlendes Wissen verloren, sondern durch falsch gelesene Aufgaben oder fehlende Rechenwege.</p>
          {lost.map(({ it, i }) => (
            <div key={i} className="row wrap small" style={{ padding: '6px 0', borderBottom: '1px solid var(--border)', gap: 6 }}>
              <b style={{ minWidth: 90 }}>Aufgabe {i + 1}</b>
              <span className="muted" style={{ flex: 1, minWidth: 140 }}>{skillTitle(it.question.skill)} · {Math.round(it.score * it.points * 10) / 10}/{it.points} P.</span>
              {REASONS.map((r) => (
                <button key={r.id} className={`btn sm ${it.reason === r.id ? 'primary' : 'ghost'}`} onClick={() => setReason(i, r.id)}>{r.label}</button>
              ))}
            </div>
          ))}
          {reasonCount.length > 0 && (
            <div className="col mt">
              {reasonCount.map((r) => (
                <div key={r.id} className="block explain" style={{ padding: '12px 16px' }}><b>{r.label} ({r.n}×):</b> {r.tip}</div>
              ))}
            </div>
          )}
        </div>
      )}
      <h2 className="mt-lg">Alle Aufgaben</h2>
      <div className="col">
        {test.items.map((it, i) => {
          const isPending = (it as { pending?: boolean }).pending;
          const r: GradeResult = { ...grade(it.question, it.response as ResponseValue), correct: it.correct, score: it.score };
          return (
            <div key={i} className="card" style={{ padding: 0 }}>
              <div className="row" style={{ padding: '12px 16px', cursor: 'pointer' }} onClick={() => setOpen(open === i ? null : i)}>
                <Icon name={isPending ? 'CircleHelp' : it.correct ? 'CircleCheck' : it.score > 0 ? 'CircleDot' : 'CircleX'} size={18} />
                <b>Aufgabe {i + 1}</b>
                <span className="small muted" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{skillTitle(it.question.skill)} · {kindLabel(it.question.kind)}</span>
                <span className="mono small">{Math.round(it.score * it.points * 10) / 10}/{it.points} P.</span>
                <Icon name={open === i ? 'ChevronUp' : 'ChevronDown'} size={16} />
              </div>
              {(open === i || isPending) && (
                <div style={{ padding: '0 16px 16px' }}>
                  {isPending && it.question.kind === 'free' ? (
                    <div className="col">
                      <Md>{it.question.prompt}</Md>
                      <div className="card" style={{ background: 'var(--surface-2)' }}><div className="tiny dim">Deine Antwort</div><div>{String(it.response ?? '–')}</div></div>
                      <div className="block summary"><div className="block-label">Musterlösung</div><Md>{it.question.modelAnswer}</Md></div>
                      <div className="row"><span className="small">Selbstbewertung:</span><button className="btn sm ok" onClick={() => rateFree(i, 1)}>richtig</button><button className="btn sm" onClick={() => rateFree(i, 0.5)}>teilweise</button><button className="btn sm danger" onClick={() => rateFree(i, 0)}>falsch</button></div>
                    </div>
                  ) : (
                    <>
                      <QuestionView question={it.question} mode="pruefung" hideSubmit initialResponse={it.response as ResponseValue} reviewResult={r} />
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {test.type === 'einstufung' && (
        <div className="row mt-lg"><span className="spacer" /><button className="btn primary lg" onClick={() => navigate('/')}>Zum Dashboard mit persönlichem Lernpfad <Icon name="ArrowRight" size={16} /></button></div>
      )}
    </div>
  );
}

export { ResultView };
