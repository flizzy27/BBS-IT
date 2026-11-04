/**
 * Lehrplan, Modulansicht und geführte Lerneinheit (Lernmodus).
 * Ablauf einer Lektion: Erklären → Visualisieren → Beispiel → Verständnisfrage → Übung → Zusammenfassung.
 * Weiter geht es erst, wenn Verständnisfragen beantwortet sind.
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AREAS, LESSON_MAP, MODULES, MODULE_MAP, QUESTION_MAP, moduleArea } from '../content';
import type { LessonStep, Question } from '../content/types';
import { generate } from '../core/generators';
import { knowledge, STAGE_LABEL } from '../core/learning';
import { navigate, useStore } from '../lib/store';
import { Icon, Md, Progress, RelevanceBadge } from '../components/common';
import { Widget } from '../components/widgets';
import { QuestionView, type QuestionOutcome } from '../components/QuestionView';
import { CopyPromptButton } from '../components/CopyPrompt';
import { buildSectionPrompt } from '../lib/aiPrompt';

export function CurriculumPage() {
  const { skills, lessonProgress } = useStore();
  const now = Date.now();
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Lehrplan</h1>
          <p>Systematisch von den Grundlagen bis zur Prüfungssimulation. Die Reihenfolge baut logisch aufeinander auf.</p>
        </div>
        <div className="row small muted"><RelevanceBadge r="ap1" /> <RelevanceBadge r="ap1-teilweise" /> <RelevanceBadge r="vertiefung" /></div>
      </div>
      {AREAS.map((area) => (
        <div key={area.id} className="mb" style={{ ['--area-c' as string]: area.color, ['--area' as string]: area.color } as React.CSSProperties}>
          <div className="section-title">
            <div className="module-icon"><Icon name={area.icon} /></div>
            <div><h2>{area.title}</h2><div className="small muted">{area.short}</div></div>
            <span className="line" />
            <span className="area-pill">{area.exams.join(' · ')}</span>
          </div>
          {MODULES.filter((m) => moduleArea(m) === area.id).length === 0 && <div className="card small muted">Inhalte für diesen Bereich sind in Arbeit.</div>}
          <div className="grid grid-3">
            {MODULES.filter((m) => moduleArea(m) === area.id).map((m) => {
              const done = m.lessons.filter((l) => lessonProgress[l.id]?.done).length;
              const k = m.skills.length ? m.skills.reduce((s, sk) => s + (skills[sk.id] ? knowledge(skills[sk.id], now) : 0), 0) / m.skills.length : 0;
              return (
                <div key={m.id} className="card module-card" onClick={() => navigate(`/modul/${m.id}`)}>
                  <div className="row">
                    <div className="module-icon"><Icon name={m.icon} /></div>
                    <div style={{ minWidth: 0 }}>
                      <div className="tiny dim">Modul {m.nr}</div>
                      <b>{m.title}</b>
                    </div>
                    <span className="spacer" />
                    <RelevanceBadge r={m.relevance} />
                  </div>
                  <div className="small muted" style={{ flex: 1 }}>{m.short}</div>
                  <div className="row tiny dim between">
                    <span>{done}/{m.lessons.length} Lektionen</span>
                    <span>Kenntnisstand {Math.round(k * 100)} %</span>
                  </div>
                  <Progress value={k} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <div className="card small muted mt">
        <Icon name="Info" size={14} /> Weitere Fachbereiche (z. B. IT-Sicherheit, Hardware, Wirtschaft, später AP2) lassen sich als Inhaltsmodule ergänzen – siehe <code>docs/INHALTE-ERWEITERN.md</code>.
      </div>
    </div>
  );
}

export function ModulePage({ id }: { id: string }) {
  const m = MODULE_MAP.get(id);
  const { skills, lessonProgress } = useStore();
  if (!m) return <div className="page">Modul nicht gefunden.</div>;
  const now = Date.now();
  return (
    <div className="page">
      <button className="btn ghost sm" onClick={() => navigate('/lehrplan')}><Icon name="ArrowLeft" size={14} /> Lehrplan</button>
      <div className="page-header mt">
        <div className="row">
          <div className="module-icon" style={{ width: 54, height: 54 }}><Icon name={m.icon} size={26} /></div>
          <div>
            <div className="dim small">Modul {m.nr}</div>
            <h1 style={{ margin: 0 }}>{m.title}</h1>
            <p>{m.short}</p>
          </div>
        </div>
        <div className="row">
          <RelevanceBadge r={m.relevance} />
          <button className="btn" onClick={() => navigate(`/ueben/modul/${m.id}`)}><Icon name="Dumbbell" size={16} /> Modul üben</button>
          <button className="btn" onClick={() => navigate(`/pruefung?modul=${m.id}`)}><Icon name="ClipboardCheck" size={16} /> Modultest</button>
        </div>
      </div>
      {m.prerequisites.length > 0 && (
        <div className="small muted mb">Voraussetzungen: {m.prerequisites.map((p) => MODULE_MAP.get(p)?.title ?? p).join(', ')}</div>
      )}
      <div className="grid" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
        <div className="card">
          <div className="card-title"><Icon name="BookOpen" size={18} />Lektionen</div>
          <table className="table">
            <tbody>
              {m.lessons.map((l, i) => {
                const p = lessonProgress[l.id];
                return (
                  <tr key={l.id} className="clickable" onClick={() => navigate(`/lektion/${l.id}`)}>
                    <td style={{ width: 36 }}>{p?.done ? <Icon name="CircleCheck" size={18} /> : <span className="step-num">{i + 1}</span>}</td>
                    <td><b>{l.title}</b><div className="tiny dim">{l.steps.length} Schritte · ca. {l.minutes} min</div></td>
                    <td><RelevanceBadge r={l.relevance} /></td>
                    <td className="small dim">{p?.done ? 'abgeschlossen' : p?.step ? `Schritt ${p.step + 1}` : ''}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="card">
          <div className="card-title"><Icon name="Target" size={18} />Kompetenzen</div>
          {m.skills.map((s) => {
            const st = skills[s.id];
            const k = st ? knowledge(st, now) : 0;
            return (
              <div key={s.id} className="skill-row" style={{ cursor: 'pointer' }} onClick={() => navigate(`/ueben/skill/${s.id}`)} title="Diese Kompetenz üben">
                <div><div>{s.title}</div><div className="tiny dim">{STAGE_LABEL[st?.stage ?? 'neu']}</div></div>
                <Progress value={k} />
                <span className="small mono">{Math.round(k * 100)}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function LessonPage({ id }: { id: string }) {
  const lesson = LESSON_MAP.get(id);
  const { lessonProgress, setLessonProgress, completeLesson, setResume, recordAttempt, setTutorContext, askTutor, aiEnabled } = useStore();
  const saved = lessonProgress[id];
  const [cur, setCur] = useState(() => (saved && !saved.done ? saved.step : 0));
  const [answered, setAnswered] = useState<Record<number, boolean>>({});
  const endRef = useRef<HTMLDivElement>(null);
  const module = lesson ? MODULE_MAP.get(lesson.module) : undefined;

  useEffect(() => {
    if (!lesson) return;
    setResume({ route: `/lektion/${id}`, label: `Lektion: ${lesson.title}` });
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!lesson) return;
    const step = lesson.steps[cur];
    if (step && step.type !== 'check' && step.type !== 'practice') {
      const text = step.type === 'explain' ? step.body : step.type === 'example' ? `${step.problem}\n${step.steps.map((s) => s.label + ': ' + s.body).join('\n')}\n${step.result}` : step.type === 'visual' ? step.caption ?? '' : step.type === 'summary' ? step.points.join('\n') : '';
      setTutorContext({ view: `Lektion „${lesson.title}“ – Schritt ${cur + 1}/${lesson.steps.length}: ${'title' in step ? step.title : step.type}`, extra: `Inhalt des aktuellen Lernschritts:\n${text.slice(0, 3000)}` });
    }
  }, [cur, lesson, setTutorContext]);

  if (!lesson || !module) return <div className="page">Lektion nicht gefunden.</div>;
  const steps = lesson.steps;
  const blocking = (i: number) => (steps[i].type === 'check' || steps[i].type === 'practice') && !answered[i];
  const atEnd = cur >= steps.length - 1;

  const next = () => {
    if (atEnd) {
      completeLesson(lesson.id, lesson.skills);
      const idx = module.lessons.findIndex((l) => l.id === lesson.id);
      const nl = module.lessons[idx + 1];
      navigate(nl ? `/lektion/${nl.id}` : `/modul/${module.id}`);
      return;
    }
    const n = cur + 1;
    setCur(n);
    setLessonProgress(lesson.id, n);
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  };

  const onCheckDone = (i: number, q: Question, o: QuestionOutcome) => {
    setAnswered((a) => ({ ...a, [i]: true }));
    recordAttempt({ questionId: q.id, skill: q.skill, kind: q.kind, mode: 'lernen', difficulty: q.difficulty, question: q, response: o.response, correct: o.result.correct, score: o.result.score, errorTags: o.result.errorTags, hintsUsed: o.hintsUsed, durationMs: o.durationMs });
  };

  return (
    <div className="page narrow">
      <div className="row between">
        <button className="btn ghost sm" onClick={() => navigate(`/modul/${module.id}`)}><Icon name="ArrowLeft" size={14} /> {module.title}</button>
        <RelevanceBadge r={lesson.relevance} />
      </div>
      <h1 className="mt">{lesson.title}</h1>
      <div className="stepper mb">
        {steps.map((_, i) => <div key={i} className={i < cur ? 'done' : i === cur ? 'cur' : ''} />)}
      </div>
      <div className="col" style={{ gap: 18 }}>
        {steps.slice(0, cur + 1).map((s, i) => (
          <div key={i} ref={i === cur ? endRef : undefined} style={{ scrollMarginTop: 20 }}>
            <StepView step={s} index={i} lessonId={lesson.id} onCheckDone={(q, o) => onCheckDone(i, q, o)} onPracticeDone={() => setAnswered((a) => ({ ...a, [i]: true }))} />
          </div>
        ))}
      </div>
      <div className="row mt-lg">
        {cur > 0 && <button className="btn ghost" onClick={() => setCur(cur - 1)}><Icon name="ChevronUp" size={16} /> Zurück</button>}
        <span className="spacer" />
        {aiEnabled ? (
          <button className="btn" onClick={() => askTutor('Stopp, das verstehe ich nicht. Erkläre mir den letzten Schritt bitte noch einmal anders.')}>Stopp, das verstehe ich nicht</button>
        ) : (
          (() => {
            const st = steps[cur];
            const txt = st.type === 'explain' ? st.body : st.type === 'example' ? `${st.problem}\n${st.steps.map((s) => s.label + ': ' + s.body).join('\n')}\n${st.result}` : st.type === 'summary' ? st.points.join('\n') : st.type === 'visual' ? st.caption ?? '' : '';
            return txt ? <CopyPromptButton label="Stopp, das verstehe ich nicht" options={[{ label: 'Prompt für eine KI kopieren', hint: 'erklärt den aktuellen Schritt anders', icon: 'MessageCircleQuestion', build: () => buildSectionPrompt('title' in st ? st.title : 'Zusammenfassung', txt, lesson.title) }]} /> : null;
          })()
        )}
        <button className="btn primary lg" onClick={next} disabled={blocking(cur)}>
          {atEnd ? <>Lektion abschließen <Icon name="Check" size={16} /></> : <>Weiter <Icon name="ChevronDown" size={16} /></>}
        </button>
      </div>
      {blocking(cur) && <div className="tiny dim mt" style={{ textAlign: 'right' }}>Beantworte zuerst die Frage – so prüfst du, ob die Grundlage sitzt.</div>}
    </div>
  );
}

function StepView({ step, index, lessonId, onCheckDone, onPracticeDone }: { step: LessonStep; index: number; lessonId: string; onCheckDone: (q: Question, o: QuestionOutcome) => void; onPracticeDone: () => void }) {
  switch (step.type) {
    case 'explain':
      return (
        <div className="block explain">
          <div className="row between">
            <div className="block-label"><Icon name="BookOpen" size={14} />Erklärung</div>
            <SectionPrompt title={step.title} content={step.body} lessonId={lessonId} />
          </div>
          <h3>{step.title}</h3>
          <Md>{step.body}</Md>
        </div>
      );
    case 'visual':
      return (
        <div className="block visual">
          <div className="block-label"><Icon name="Eye" size={14} />Visualisierung · interaktiv</div>
          <h3>{step.title}</h3>
          <Widget spec={step.widget} />
          {step.caption && <div className="small muted mt"><Md>{step.caption}</Md></div>}
        </div>
      );
    case 'example':
      return (
        <div className="block example">
          <div className="row between">
            <div className="block-label"><Icon name="ListOrdered" size={14} />Durchgerechnetes Beispiel</div>
            <SectionPrompt title={step.title} content={`${step.problem}\n\n${step.steps.map((s, i) => `${i + 1}. ${s.label}: ${s.body}`).join('\n')}\n\nErgebnis: ${step.result}`} lessonId={lessonId} />
          </div>
          <h3>{step.title}</h3>
          <Md>{step.problem}</Md>
          <ExampleSteps steps={step.steps} />
          <div className="mt" style={{ padding: '10px 14px', borderRadius: 10, background: 'var(--sub-soft)' }}><b>Ergebnis: </b><Md className="small">{step.result}</Md></div>
        </div>
      );
    case 'check':
      return (
        <div>
          <div className="block-label" style={{ color: 'var(--accent-2)' }}><Icon name="HelpCircle" size={14} />Verständnisfrage</div>
          <QuestionView question={step.question} mode="lernen" onDone={(o) => onCheckDone(step.question, o)} />
        </div>
      );
    case 'practice':
      return <PracticeStep step={step} lessonId={lessonId} index={index} onDone={onPracticeDone} />;
    case 'summary':
      return (
        <div className="block summary">
          <div className="block-label"><Icon name="ListChecks" size={14} />Zusammenfassung</div>
          <ul className="md">{step.points.map((p, i) => <li key={i}><Md>{p}</Md></li>)}</ul>
        </div>
      );
  }
}

function SectionPrompt({ title, content, lessonId }: { title: string; content: string; lessonId: string }) {
  const lesson = LESSON_MAP.get(lessonId);
  return (
    <CopyPromptButton
      small
      label="Anders erklären lassen"
      options={[{ label: 'Diesen Abschnitt von einer KI erklären lassen', hint: 'einfacher, mit Analogie und Kontrollfragen', icon: 'MessageCircleQuestion', build: () => buildSectionPrompt(title, content, lesson?.title ?? '') }]}
    />
  );
}

/** Beispiel-Schritte nacheinander aufdecken – erst selbst nachdenken. */
function ExampleSteps({ steps }: { steps: { label: string; body: string }[] }) {
  const [shown, setShown] = useState(1);
  return (
    <div className="mt">
      {steps.slice(0, shown).map((s, i) => (
        <div key={i} className="example-step">
          <span className="step-num">{i + 1}</span>
          <div><b>{s.label}</b><Md>{s.body}</Md></div>
        </div>
      ))}
      {shown < steps.length && (
        <div className="row mt">
          <button className="btn sm" onClick={() => setShown(shown + 1)}>Nächster Rechenschritt</button>
          <button className="btn sm ghost" onClick={() => setShown(steps.length)}>Alle zeigen</button>
          <span className="tiny dim">Überlege zuerst selbst, wie der nächste Schritt aussieht.</span>
        </div>
      )}
    </div>
  );
}

function PracticeStep({ step, lessonId, index, onDone }: { step: Extract<LessonStep, { type: 'practice' }>; lessonId: string; index: number; onDone: () => void }) {
  const { recordAttempt } = useStore();
  const questions = useMemo<Question[]>(() => {
    if (step.generator) {
      return Array.from({ length: step.count }, (_, i) => {
        try { return generate(step.generator!, step.difficulty); } catch { return null; }
      }).filter(Boolean) as Question[];
    }
    return (step.questionIds ?? []).map((id) => QUESTION_MAP.get(id)).filter(Boolean).slice(0, step.count) as Question[];
  }, [lessonId, index]); // eslint-disable-line react-hooks/exhaustive-deps
  const [i, setI] = useState(0);
  const [doneCur, setDoneCur] = useState(false);
  const [score, setScore] = useState(0);
  if (!questions.length) return null;
  const q = questions[i];
  const finished = i >= questions.length - 1 && doneCur;
  return (
    <div className="col">
      <div className="row between">
        <div className="block-label" style={{ color: 'var(--accent-2)', margin: 0 }}><Icon name="Dumbbell" size={14} />Übung: {step.title}</div>
        <span className="small muted">Aufgabe {i + 1} von {questions.length} · {score} richtig</span>
      </div>
      <QuestionView
        key={q.id}
        question={q}
        mode="ueben"
        onDone={(o) => {
          setDoneCur(true);
          if (o.result.correct) setScore((s) => s + 1);
          recordAttempt({ questionId: q.id, skill: q.skill, kind: q.kind, mode: 'lernen', difficulty: q.difficulty, question: q, response: o.response, correct: o.result.correct, score: o.result.score, errorTags: o.result.errorTags, hintsUsed: o.hintsUsed, durationMs: o.durationMs });
          if (i >= questions.length - 1) onDone();
        }}
      />
      {doneCur && !finished && (
        <div className="row"><span className="spacer" /><button className="btn primary" onClick={() => { setI(i + 1); setDoneCur(false); }}>Nächste Übungsaufgabe <Icon name="ArrowRight" size={16} /></button></div>
      )}
      {finished && <div className="small muted">Übung abgeschlossen: {score}/{questions.length} richtig. {score < questions.length ? 'Fehler werden im Schwachstellen-Training gezielt wiederholt.' : 'Stark!'}</div>}
    </div>
  );
}
