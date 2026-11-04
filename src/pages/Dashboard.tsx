import React, { useEffect, useMemo, useState } from 'react';
import { AREAS, MODULES, SKILL_MAP, moduleArea, skillTitle } from '../content';
import { knowledge, STAGE_LABEL, STAGE_ORDER, type Stage } from '../core/learning';
import { errorInfo } from '../core/errors';
import { api, localDay, type TestRecord } from '../lib/api';
import { navigate, useStore } from '../lib/store';
import { recommend } from '../lib/recommend';
import { BarChart, Icon, LineChart, Progress, Ring, fmtDuration } from '../components/common';
import { ihkGrade } from './Exam';
import { countStatus, readiness } from '../core/catalog';

export function Dashboard() {
  const { skills, overallProgress, studyTime, lessonProgress, settings, resume, updateSettings, qstat } = useStore();
  const ap1Ids = useMemo(() => MODULES.filter((m) => m.relevance !== 'vertiefung').flatMap((m) => m.questions.map((q) => q.id)), []);
  const cat = countStatus(ap1Ids, qstat);
  const ready = readiness(ap1Ids.length ? cat.sicher / ap1Ids.length : 0);
  const [tests, setTests] = useState<TestRecord[]>([]);
  useEffect(() => {
    api.tests().then(setTests).catch(() => {});
  }, []);
  const now = Date.now();
  const recs = recommend(skills, lessonProgress, settings.placementDone, now);

  const totalSec = studyTime.reduce((s, d) => s + d.seconds, 0);
  const week = useMemo(() => {
    const days: { label: string; value: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = localDay(now - i * 86400000);
      days.push({ label: new Date(now - i * 86400000).toLocaleDateString('de-DE', { weekday: 'short' }), value: Math.round((studyTime.find((x) => x.day === d)?.seconds ?? 0) / 60) });
    }
    return days;
  }, [studyTime]); // eslint-disable-line react-hooks/exhaustive-deps
  const weekMin = week.reduce((s, d) => s + d.value, 0);
  const streak = useMemo(() => {
    let n = 0;
    for (let i = 0; i < 400; i++) {
      const d = localDay(now - i * 86400000);
      const has = (studyTime.find((x) => x.day === d)?.seconds ?? 0) >= 60;
      if (has) n++;
      else if (i > 0) break;
    }
    return n;
  }, [studyTime]); // eslint-disable-line react-hooks/exhaustive-deps

  const allSkills = [...SKILL_MAP.values()];
  const stageCounts = STAGE_ORDER.map((st) => ({ st, n: allSkills.filter((s) => (skills[s.id]?.stage ?? 'neu') === st).length }));
  const mastered = Object.values(skills).filter((s) => s.stage === 'beherrscht' || s.stage === 'ohne-hilfe');
  const gaps = Object.values(skills).filter((s) => s.attempts > 0 && knowledge(s, now) < 0.5).sort((a, b) => knowledge(a, now) - knowledge(b, now));
  const due = Object.values(skills).filter((s) => s.attempts > 0 && s.due <= now);
  const ap1Tests = tests.filter((t) => t.type === 'ap1' || t.type === 'gemischt').reverse();
  const lastAp1 = tests.find((t) => t.type === 'ap1');

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>{settings.name ? `Hallo ${settings.name}!` : 'Willkommen bei FISI Academy'}</h1>
          <p>Dein Lernstand basiert auf nachgewiesenem Verständnis – nicht auf angeklickten Lektionen.</p>
        </div>
        {resume && (
          <button className="btn primary lg" onClick={() => navigate(resume.route)}><Icon name="Play" size={16} /> Weitermachen: {resume.label}</button>
        )}
      </div>

      {!settings.onboarded && (
        <div className="block explain mb">
          <div className="block-label"><Icon name="Sparkles" size={14} />Erste Schritte</div>
          <p>Ich habe deine Angaben zum bisherigen Stand übernommen (Subnetting begonnen, Grundformeln bekannt, binäre Hintergründe und Masken noch unsicher). Damit dein Lernpfad wirklich passt, machst du am besten zuerst den <b>Einstufungstest</b>. Danach empfiehlt dir das Dashboard immer die sinnvollste nächste Einheit.</p>
          <div className="row">
            <button className="btn primary" onClick={() => { updateSettings({ onboarded: true }); navigate('/einstufung'); }}>Einstufungstest starten</button>
            <button className="btn" onClick={() => { updateSettings({ onboarded: true }); navigate('/lektion/m03-l02b'); }}>Direkt mit „Was ist eine Subnetzmaske?“ beginnen</button>
            <button className="btn ghost" onClick={() => updateSettings({ onboarded: true })}>Später</button>
          </div>
        </div>
      )}

      <div className="hero">
        <div className="card pad-lg hero-card">
          <div className="row" style={{ gap: 28, alignItems: 'center' }}>
            <Ring value={overallProgress} label={`${Math.round(overallProgress * 100)} %`} sub="Kenntnisstand AP1" />
            <div className="col" style={{ flex: 1 }}>
              <div className="card-title" style={{ margin: 0 }}><Icon name="Compass" size={18} />Empfohlen als Nächstes</div>
              {recs.slice(0, 3).map((r, i) => (
                <button key={i} className="option" onClick={() => navigate(r.route)} style={{ padding: '10px 12px' }}>
                  <Icon name={{ remediation: 'LifeBuoy', review: 'CalendarClock', lesson: 'BookOpen', practice: 'Dumbbell', placement: 'ClipboardCheck' }[r.kind]} size={18} />
                  <div style={{ flex: 1 }}>
                    <b>{r.title}</b>
                    <div className="tiny dim">{r.reason}</div>
                  </div>
                  <Icon name="ChevronRight" size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-2">
          <Stat icon="Clock" label="Lernzeit gesamt" value={fmtDuration(totalSec)} />
          
          <Stat icon="Flame" label="Lernserie" value={`${streak} Tag${streak === 1 ? '' : 'e'}`} />
          <Countdown date={settings.examDate} />
          <Stat icon="Award" label="Letzte AP1-Simulation" value={lastAp1 ? `${Math.round(lastAp1.score ?? 0)} P. (${ihkGrade(lastAp1.score ?? 0).note})` : '–'} />
        </div>
      </div>

      <div className="card mt row wrap" style={{ gap: 18, cursor: 'pointer' }} onClick={() => navigate('/katalog')}>
        <div className="stat-icon" style={{ background: { rot: 'var(--bad-soft)', gelb: 'var(--warn-soft)', gruen: 'var(--ok-soft)' }[ready.level], color: { rot: 'var(--bad)', gelb: 'var(--warn)', gruen: 'var(--ok)' }[ready.level] }}><Icon name="ListChecks" size={18} /></div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <b>Prüfungsreife (Fragenkatalog): {cat.sicher} von {ap1Ids.length} AP1-Fragen sicher</b>
          <div className="small muted">{ready.text}</div>
        </div>
        <button className="btn primary" onClick={(e) => { e.stopPropagation(); navigate('/katalog/runde/offen/ap1'); }}><Icon name="Play" size={16} />Weiterlernen</button>
      </div>

      <div className="grid grid-3 mt">
        <div className="card">
          <div className="card-title"><Icon name="BarChart3" size={18} />Lernzeit (7 Tage, Minuten)</div>
          <BarChart bars={week} unit=" min" />
          <div className="tiny dim mt">Tagesziel: {settings.dailyGoalMin} min</div>
        </div>
        <div className="card">
          <div className="card-title"><Icon name="Layers" size={18} />Kompetenzstufen</div>
          {stageCounts.map(({ st, n }) => (
            <div key={st} className="row between small" style={{ padding: '3px 0' }}>
              <span>{STAGE_LABEL[st as Stage]}</span>
              <span className="badge" style={stageStyle(st as Stage)}>{n}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card-title"><Icon name="TrendingUp" size={18} />Prüfungsleistung</div>
          <LineChart points={ap1Tests.map((t) => ({ label: new Date(t.tsStart).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' }), value: t.score ?? 0 }))} height={140} />
        </div>
      </div>

      <div className="grid grid-2 mt">
        <div className="card">
          <div className="card-title"><Icon name="Map" size={18} />Kenntnisstand je Fachbereich</div>
          {AREAS.map((a) => {
            const mods = MODULES.filter((m) => moduleArea(m) === a.id);
            const sk = mods.flatMap((m) => m.skills);
            const k = sk.length ? sk.reduce((s, x) => s + (skills[x.id] ? knowledge(skills[x.id], now) : 0), 0) / sk.length : 0;
            return (
              <div key={a.id} style={{ ['--area-c' as string]: a.color, padding: '9px 0', borderBottom: '1px solid var(--border)', cursor: 'pointer' } as React.CSSProperties} onClick={() => navigate('/lehrplan')}>
                <div className="row between">
                  <span className="row small"><span className="module-icon" style={{ width: 28, height: 28, borderRadius: 8 }}><Icon name={a.icon} size={15} /></span><b>{a.title}</b></span>
                  <span className="small mono">{mods.length ? `${Math.round(k * 100)} %` : 'in Arbeit'}</span>
                </div>
                <div style={{ marginTop: 6 }}><div className="progress"><div style={{ width: `${Math.round(k * 100)}%`, background: a.color }} /></div></div>
              </div>
            );
          })}
        </div>
        <div className="col" style={{ gap: 16 }}>
          <div className="card">
            <div className="card-title"><Icon name="AlertTriangle" size={18} />Wissenslücken <span className="muted small">({gaps.length})</span></div>
            {gaps.length === 0 ? <div className="small muted">Noch keine Lücken erkannt.</div> : gaps.slice(0, 6).map((s) => (
              <div key={s.skill} className="skill-row" style={{ cursor: 'pointer' }} onClick={() => navigate(`/schwaechen/${s.skill}`)}>
                <div><div className="small">{skillTitle(s.skill)}</div>{s.recentErrors.length > 0 && <div className="tiny dim">zuletzt: {errorInfo(s.recentErrors[s.recentErrors.length - 1]).title}</div>}</div>
                <Progress value={knowledge(s, now)} />
                <span className="small mono">{Math.round(knowledge(s, now) * 100)}%</span>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="card-title"><Icon name="CalendarClock" size={18} />Zu wiederholen <span className="muted small">({due.length})</span></div>
            {due.length === 0 ? <div className="small muted">Aktuell nichts fällig.</div> : (
              <>
                <div className="small">{due.slice(0, 8).map((s) => skillTitle(s.skill)).join(' · ')}</div>
                <button className="btn sm primary mt" onClick={() => navigate('/ueben/schwaechen')}>Wiederholung starten</button>
              </>
            )}
          </div>
          <div className="card">
            <div className="card-title"><Icon name="Trophy" size={18} />Beherrschte Themen <span className="muted small">({mastered.length})</span></div>
            <div className="small muted">{mastered.length ? mastered.map((s) => skillTitle(s.skill)).join(' · ') : 'Noch keine – das kommt!'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Countdown({ date }: { date?: string }) {
  if (!date) {
    return (
      <div className="card row" style={{ gap: 14, cursor: 'pointer' }} onClick={() => navigate('/einstellungen')}>
        <div className="stat-icon"><Icon name="CalendarClock" size={18} /></div>
        <div className="stat"><span className="label">Prüfungstermin</span><span className="small muted">Termin eintragen →</span></div>
      </div>
    );
  }
  const days = Math.max(0, Math.ceil((new Date(date).getTime() - Date.now()) / 86400000));
  const weeks = Math.floor(days / 7);
  return (
    <div className="card row" style={{ gap: 14 }}>
      <div className="stat-icon" style={{ background: 'var(--warn-soft)', color: 'var(--warn)' }}><Icon name="CalendarClock" size={18} /></div>
      <div className="stat"><span className="label">Bis zur Prüfung</span><span className="value" style={{ fontSize: '1.3rem' }}>{days} Tage</span><span className="tiny dim">≈ {weeks} Wochen · {weeks} Berufsschul-Mittwoche</span></div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="card row" style={{ gap: 14 }}>
      <div className="stat-icon"><Icon name={icon} size={18} /></div>
      <div className="stat"><span className="label">{label}</span><span className="value" style={{ fontSize: '1.3rem' }}>{value}</span></div>
    </div>
  );
}

function stageStyle(st: Stage): React.CSSProperties {
  const c = { neu: 'var(--text-3)', vergessen: 'var(--bad)', eingefuehrt: 'var(--info)', 'mit-hilfe': 'var(--warn)', 'ohne-hilfe': 'var(--accent)', beherrscht: 'var(--ok)' }[st];
  return { color: c, background: 'var(--surface-3)' };
}
