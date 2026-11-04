/**
 * Übungsmodus (Tipps + direkte Auswertung, adaptive Schwierigkeit) und
 * Schwachstellen-Training mit Förderschleife:
 * 1. kurze Wiederholung → 2. neue Erklärung → 3. leichte Übung → 4. schwieriger → 5. später erneut prüfen.
 */
import React, { useEffect, useMemo, useState } from 'react';
import { LESSONS, MODULES, MODULE_MAP, SKILL_MAP, lessonForSkill, skillTitle } from '../content';
import type { Difficulty, Question } from '../content/types';
import { knowledge, needsRemediation, nextDifficulty, recurringErrors, STAGE_LABEL } from '../core/learning';
import { errorInfo } from '../core/errors';
import { practicableSkills, questionForSkill, weakSkills } from '../lib/recommend';
import { navigate, useStore } from '../lib/store';
import { Empty, Icon, Md, Progress } from '../components/common';
import { QuestionView, type QuestionOutcome } from '../components/QuestionView';

export function PracticeHome() {
  const { skills } = useStore();
  const now = Date.now();
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Üben</h1>
          <p>Aufgaben mit Tipps und sofortiger Auswertung. Rechenaufgaben werden immer neu erzeugt – du lernst das Verfahren, nicht die Antworten.</p>
        </div>
        <button className="btn primary" onClick={() => navigate('/ueben/mix')}><Icon name="Shuffle" size={16} /> Gemischt üben</button>
      </div>
      <div className="grid grid-2">
        {MODULES.map((m) => {
          const ids = practicableSkills(m.id);
          if (!ids.length) return null;
          return (
            <div key={m.id} className="card">
              <div className="row between card-title">
                <span className="row"><Icon name={m.icon} size={18} />{m.title}</span>
                <button className="btn sm" onClick={() => navigate(`/ueben/modul/${m.id}`)}>Alles üben</button>
              </div>
              {ids.map((id) => {
                const st = skills[id];
                const k = st ? knowledge(st, now) : 0;
                return (
                  <div key={id} className="skill-row" style={{ cursor: 'pointer' }} onClick={() => navigate(`/ueben/skill/${id}`)}>
                    <div><div className="small">{skillTitle(id)}</div><div className="tiny dim">{STAGE_LABEL[st?.stage ?? 'neu']}</div></div>
                    <Progress value={k} />
                    <span className="small mono">{Math.round(k * 100)}%</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Laufende Übungssitzung. scope: skill:<id> | modul:<id> | mix | schwaechen */
export function PracticeSession({ scope, title }: { scope: string; title?: string }) {
  const { skills, recordAttempt, setResume } = useStore();
  const [seen] = useState(() => new Set<string>());
  const [count, setCount] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [q, setQ] = useState<Question | null>(null);
  const [answered, setAnswered] = useState(false);
  const [lastSkill, setLastSkill] = useState<string | null>(null);

  const pool = useMemo(() => {
    if (scope.startsWith('skill:')) return [scope.slice(6)];
    if (scope.startsWith('modul:')) return practicableSkills(scope.slice(6));
    if (scope === 'schwaechen') {
      const w = weakSkills(skills);
      return w.length ? w : [];
    }
    // gemischt: begonnene Lektionen bevorzugt, sonst alles
    const started = practicableSkills().filter((id) => skills[id]);
    return started.length >= 4 ? started : practicableSkills();
  }, [scope]); // eslint-disable-line react-hooks/exhaustive-deps

  const label = title ?? (scope.startsWith('skill:') ? skillTitle(scope.slice(6)) : scope.startsWith('modul:') ? MODULE_MAP.get(scope.slice(6))?.title : scope === 'schwaechen' ? 'Schwachstellen' : 'Gemischt');

  const nextQuestion = () => {
    if (!pool.length) return setQ(null);
    // Skill mit geringstem Kenntnisstand etwas bevorzugen, aber abwechseln
    const now = Date.now();
    const cand = pool.length > 1 ? pool.filter((p) => p !== lastSkill) : pool;
    const weighted = cand.map((id) => ({ id, w: 1.2 - (skills[id] ? knowledge(skills[id], now) : 0) + Math.random() * 0.6 })).sort((a, b) => b.w - a.w);
    for (const { id } of weighted) {
      const d = nextDifficulty(skills[id]) as Difficulty;
      const nq = questionForSkill(id, d, seen);
      if (nq) {
        seen.add(nq.id);
        setQ(nq);
        setLastSkill(id);
        setAnswered(false);
        return;
      }
    }
    setQ(null);
  };

  useEffect(() => {
    nextQuestion();
    setResume({ route: location.hash.slice(1), label: `Üben: ${label}` });
  }, [scope]); // eslint-disable-line react-hooks/exhaustive-deps

  const onDone = async (o: QuestionOutcome) => {
    if (!q) return;
    setAnswered(true);
    setCount((c) => c + 1);
    if (o.result.correct) setCorrect((c) => c + 1);
    await recordAttempt({ questionId: q.id, skill: q.skill, kind: q.kind, mode: scope === 'schwaechen' ? 'schwaechen' : 'ueben', difficulty: q.difficulty, question: q, response: o.response, correct: o.result.correct, score: o.result.score, errorTags: o.result.errorTags, hintsUsed: o.hintsUsed, durationMs: o.durationMs });
  };

  const st = q ? skills[q.skill] : undefined;
  const remediation = st && answered && needsRemediation(st) ? lessonForSkill(q!.skill) : undefined;

  return (
    <div className="page narrow">
      <div className="row between">
        <button className="btn ghost sm" onClick={() => navigate(scope === 'schwaechen' ? '/schwaechen' : '/ueben')}><Icon name="ArrowLeft" size={14} /> Zurück</button>
        <span className="small muted">{label} · {count} bearbeitet · {correct} richtig</span>
      </div>
      {!q ? (
        <Empty icon="Dumbbell">Für diese Auswahl gibt es noch keine Aufgaben. {scope === 'schwaechen' && 'Bearbeite zuerst ein paar Lektionen oder den Einstufungstest.'}</Empty>
      ) : (
        <div className="mt">
          <QuestionView key={q.id} question={q} mode={scope === 'schwaechen' ? 'schwaechen' : 'ueben'} onDone={onDone} />
          {answered && (
            <div className="col mt">
              {remediation && (
                <div className="block explain">
                  <div className="block-label"><Icon name="LifeBuoy" size={14} />Gezielte Unterstützung</div>
                  <p>Hier sind mehrere Fehler hintereinander passiert. Das ist normal – meist fehlt ein Baustein in der Grundlage. Vorschlag: kurz die Lektion <b>„{remediation.title}“</b> wiederholen, dann geht es mit leichteren Aufgaben weiter.</p>
                  <button className="btn sm" onClick={() => navigate(`/lektion/${remediation.id}`)}><Icon name="RotateCcw" size={14} />Zur Wiederholung</button>
                </div>
              )}
              <div className="row">
                <span className="small muted">Nächste Schwierigkeit: {'●'.repeat(nextDifficulty(skills[q.skill]))}{'○'.repeat(3 - nextDifficulty(skills[q.skill]))} (passt sich deinen Ergebnissen an)</span>
                <span className="spacer" />
                <button className="btn primary" onClick={nextQuestion} autoFocus>Nächste Aufgabe <Icon name="ArrowRight" size={16} /></button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function WeaknessHome() {
  const { skills } = useStore();
  const now = Date.now();
  const list = Object.values(skills).filter((s) => s.attempts > 0 && SKILL_MAP.has(s.skill)).sort((a, b) => knowledge(a, now) - knowledge(b, now));
  const remediate = list.filter(needsRemediation);
  const due = list.filter((s) => s.due <= now && !needsRemediation(s));
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Schwachstellen trainieren</h1>
          <p>Automatisch ausgewählte Themen, die du noch nicht sicher beherrschst oder die zur Wiederholung fällig sind (Spaced Repetition).</p>
        </div>
        <button className="btn primary lg" onClick={() => navigate('/ueben/schwaechen')} disabled={!list.length}><Icon name="Zap" size={16} /> Training starten</button>
      </div>
      {!list.length && <Empty icon="Target">Noch keine Daten. Starte mit dem Einstufungstest oder einer Lektion – danach erkennt das System deine Schwachstellen.</Empty>}
      {remediate.length > 0 && (
        <div className="card mb">
          <div className="card-title"><Icon name="LifeBuoy" size={18} />Förderschleife empfohlen</div>
          {remediate.map((s) => <WeakRow key={s.skill} id={s.skill} />)}
        </div>
      )}
      {due.length > 0 && (
        <div className="card mb">
          <div className="card-title"><Icon name="CalendarClock" size={18} />Fällige Wiederholungen</div>
          {due.map((s) => <WeakRow key={s.skill} id={s.skill} />)}
        </div>
      )}
      {list.length > 0 && (
        <div className="card">
          <div className="card-title"><Icon name="BarChart3" size={18} />Alle begonnenen Themen (schwächste zuerst)</div>
          {list.map((s) => <WeakRow key={s.skill} id={s.skill} />)}
        </div>
      )}
    </div>
  );
}

function WeakRow({ id }: { id: string }) {
  const { skills } = useStore();
  const s = skills[id];
  const now = Date.now();
  const rec = recurringErrors(s);
  return (
    <div className="skill-row" style={{ gridTemplateColumns: '1fr 120px 54px auto' }}>
      <div>
        <div>{skillTitle(id)}</div>
        <div className="tiny dim">
          {STAGE_LABEL[s.stage]} · {s.correct}/{s.attempts} richtig
          {s.due > now ? ` · nächste Wiederholung ${new Date(s.due).toLocaleDateString('de-DE')}` : ' · fällig'}
          {rec.length > 0 && ` · häufig: ${rec.map((r) => errorInfo(r.tag).title).join(', ')}`}
        </div>
      </div>
      <Progress value={knowledge(s, now)} />
      <span className="small mono">{Math.round(knowledge(s, now) * 100)}%</span>
      <SkillRemedy id={id} />
    </div>
  );
}

/** Förderschleife für einen Skill: Wiederholung → neue Erklärung → leicht üben. */
export function RemediationPage({ skill }: { skill: string }) {
  const { skills, askTutor } = useStore();
  const lesson = lessonForSkill(skill);
  const s = skills[skill];
  const rec = s ? recurringErrors(s) : [];
  const summary = lesson?.steps.find((x) => x.type === 'summary');
  const explain = lesson?.steps.find((x) => x.type === 'explain');
  const [stage, setStage] = useState(0);
  return (
    <div className="page narrow">
      <button className="btn ghost sm" onClick={() => navigate('/schwaechen')}><Icon name="ArrowLeft" size={14} /> Schwachstellen</button>
      <h1 className="mt">Förderschleife: {skillTitle(skill)}</h1>
      <div className="stepper mb">{[0, 1, 2].map((i) => <div key={i} className={i < stage ? 'done' : i === stage ? 'cur' : ''} />)}</div>
      {rec.length > 0 && (
        <div className="block result-part mb">
          <div className="block-label" style={{ color: 'var(--warn)' }}><Icon name="Search" size={14} />Erkannte Fehlermuster</div>
          {rec.map((r) => <div key={r.tag} className="small"><b>{errorInfo(r.tag).title}</b> ({r.count}×){errorInfo(r.tag).cause && <> – <Md className="small">{errorInfo(r.tag).cause}</Md></>}</div>)}
        </div>
      )}
      {stage === 0 && (
        <div className="col">
          <div className="block summary">
            <div className="block-label"><Icon name="RotateCcw" size={14} />1 · Kurze Wiederholung</div>
            {summary && summary.type === 'summary' ? <ul className="md">{summary.points.map((p, i) => <li key={i}><Md>{p}</Md></li>)}</ul> : <p>Zu diesem Thema gibt es keine Kurzfassung.</p>}
          </div>
          <div className="row"><span className="spacer" /><button className="btn primary" onClick={() => setStage(1)}>Weiter</button></div>
        </div>
      )}
      {stage === 1 && (
        <div className="col">
          <div className="block explain">
            <div className="block-label"><Icon name="BookOpen" size={14} />2 · Noch einmal erklärt</div>
            {explain && explain.type === 'explain' ? <><h3>{explain.title}</h3><Md>{explain.body}</Md></> : <p>Öffne die zugehörige Lektion.</p>}
          </div>
          <div className="row wrap">
            {lesson && <button className="btn" onClick={() => navigate(`/lektion/${lesson.id}`)}>Ganze Lektion öffnen</button>}
            <button className="btn" onClick={() => askTutor(`Ich mache bei „${skillTitle(skill)}“ immer wieder Fehler${rec.length ? ` (${rec.map((r) => errorInfo(r.tag).title).join(', ')})` : ''}. Erkläre mir das Thema bitte noch einmal anders, von Grund auf, und prüfe mit einer kleinen Frage, ob ich es verstanden habe.`)}>
              <Icon name="MessageCircle" size={14} />Vom Tutor neu erklären lassen
            </button>
            <span className="spacer" />
            <button className="btn primary" onClick={() => setStage(2)}>Weiter zu leichten Übungen</button>
          </div>
        </div>
      )}
      {stage === 2 && <PracticeSession scope={`skill:${skill}`} title={`${skillTitle(skill)} (Förderschleife)`} />}
    </div>
  );
}

function SkillRemedy({ id }: { id: string }) {
  return <button className="btn sm" onClick={() => navigate(`/schwaechen/${id}`)}>Fördern</button>;
}

export { LESSONS };
