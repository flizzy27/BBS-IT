/**
 * Fragenkatalog nach dem Fahrschul-Prinzip: Lernen → alle Fragen beantworten, bis jede „sicher“ ist → Prüfung.
 */
import React, { useEffect, useMemo, useState } from 'react';
import { AREAS, MODULES, MODULE_MAP, QUESTION_MAP, moduleArea } from '../content';
import type { Module } from '../content/types';
import { countStatus, readiness, roundQuestions, statusOf, type QStatus, type RoundFilter } from '../core/catalog';
import { navigate, useStore } from '../lib/store';
import { Empty, Icon, RelevanceBadge, Ring } from '../components/common';
import { QuestionView, type QuestionOutcome } from '../components/QuestionView';

const ROUND_SIZE = 20;
const COLORS: Record<QStatus, string> = { sicher: 'var(--ok)', einmal: '#8fd6a8', falsch: 'var(--bad)', neu: 'var(--surface-3)' };
const ORDER: QStatus[] = ['sicher', 'einmal', 'falsch', 'neu'];
const SHORT: Record<QStatus, string> = { sicher: 'sicher', einmal: '1× richtig', falsch: 'falsch', neu: 'neu' };

const isAp1 = (m: Module) => m.relevance !== 'vertiefung';

/** Fragen-IDs eines Bereichs: ap1 | alle | area:<id> | modul:<id> */
function scopeIds(scope: string): string[] {
  const mods = scope === 'alle' ? MODULES
    : scope === 'ap1' ? MODULES.filter(isAp1)
    : scope.startsWith('area:') ? MODULES.filter((m) => moduleArea(m) === scope.slice(5))
    : scope.startsWith('modul:') ? MODULES.filter((m) => m.id === scope.slice(6))
    : [];
  return mods.flatMap((m) => m.questions.map((q) => q.id));
}

function scopeLabel(scope: string): string {
  if (scope === 'ap1') return 'Alle AP1-Themen';
  if (scope === 'alle') return 'Gesamter Katalog';
  if (scope.startsWith('area:')) return AREAS.find((a) => a.id === scope.slice(5))?.title ?? scope;
  if (scope.startsWith('modul:')) return MODULE_MAP.get(scope.slice(6))?.title ?? scope;
  return scope;
}

function SegBar({ c, height = 10 }: { c: Record<QStatus, number>; height?: number }) {
  const total = ORDER.reduce((s, k) => s + c[k], 0) || 1;
  return (
    <div className="segbar" style={{ height }} title={ORDER.map((k) => `${SHORT[k]}: ${c[k]}`).join(' · ')}>
      {ORDER.map((k) => c[k] > 0 && <div key={k} style={{ width: `${(c[k] / total) * 100}%`, background: COLORS[k] }} />)}
    </div>
  );
}

function Legend({ c }: { c: Record<QStatus, number> }) {
  return (
    <div className="row wrap small" style={{ gap: 14 }}>
      {ORDER.map((k) => (
        <span key={k} className="row" style={{ gap: 6 }}><span className="dot" style={{ background: COLORS[k] }} />{SHORT[k]} <b>{c[k]}</b></span>
      ))}
    </div>
  );
}

export function CatalogHome() {
  const { qstat } = useStore();
  const ap1 = useMemo(() => scopeIds('ap1'), []);
  const c = countStatus(ap1, qstat);
  const share = ap1.length ? c.sicher / ap1.length : 0;
  const r = readiness(share);
  const ampel = { rot: 'var(--bad)', gelb: 'var(--warn)', gruen: 'var(--ok)' }[r.level];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Fragenkatalog</h1>
          <p>Wie in der Fahrschul-App: Thema lernen, dann alle Fragen beantworten, bis jede sicher sitzt. Eine Frage ist <b>sicher</b>, wenn du sie <b>zweimal hintereinander</b> richtig beantwortet hast.</p>
        </div>
      </div>

      <div className="card pad-lg mb">
        <div className="row wrap" style={{ gap: 28, alignItems: 'center' }}>
          <Ring value={share} label={`${Math.round(share * 100)} %`} sub="AP1-Fragen sicher" />
          <div className="col" style={{ flex: 1, minWidth: 260 }}>
            <div className="row" style={{ gap: 10 }}>
              <span className="dot" style={{ background: ampel, width: 14, height: 14 }} />
              <b>{r.text}</b>
            </div>
            <SegBar c={c} height={14} />
            <Legend c={c} />
            <div className="row wrap mt">
              <button className="btn primary lg" disabled={c.sicher === ap1.length} onClick={() => navigate('/katalog/runde/offen/ap1')}><Icon name="Play" size={16} />Weiterlernen ({ROUND_SIZE} Fragen)</button>
              <button className="btn" disabled={!c.falsch} onClick={() => navigate('/katalog/runde/falsch/ap1')}><Icon name="RotateCcw" size={16} />Falsche wiederholen ({c.falsch})</button>
              <button className="btn" onClick={() => navigate('/pruefung')}><Icon name="ClipboardCheck" size={16} />Prüfung simulieren</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-3 mb">
        {[
          { icon: 'BookOpen', t: '1 · Lernen', d: 'Öffne ein Thema und lies die Lektionen. Alles wird Schritt für Schritt mit Beispielen erklärt.' },
          { icon: 'ListChecks', t: '2 · Fragen beantworten', d: 'Beantworte die Fragen des Themas. Falsche kommen automatisch wieder, bis du sie zweimal richtig hast.' },
          { icon: 'ClipboardCheck', t: '3 · Prüfung', d: 'Wenn die Ampel grün ist: AP1-Simulation unter Prüfungsbedingungen (90 Minuten, 100 Punkte).' },
        ].map((s) => (
          <div key={s.t} className="card">
            <div className="card-title"><Icon name={s.icon} size={18} />{s.t}</div>
            <div className="small muted">{s.d}</div>
          </div>
        ))}
      </div>

      {AREAS.map((a) => {
        const mods = MODULES.filter((m) => moduleArea(m) === a.id);
        if (!mods.length) return null;
        const ac = countStatus(scopeIds('area:' + a.id), qstat);
        return (
          <div key={a.id} className="card mb" style={{ ['--area-c' as string]: a.color } as React.CSSProperties}>
            <div className="row between card-title wrap">
              <span className="row"><span className="module-icon" style={{ width: 30, height: 30, borderRadius: 8 }}><Icon name={a.icon} size={16} /></span>{a.title}</span>
              <span className="row small muted">{ac.sicher}/{ORDER.reduce((s, k) => s + ac[k], 0)} sicher
                <button className="btn sm" onClick={() => navigate(`/katalog/runde/offen/area:${a.id}`)}>Bereich üben</button>
              </span>
            </div>
            <SegBar c={ac} />
            <div className="mt">
              {mods.map((m) => {
                const ids = m.questions.map((q) => q.id);
                const mc = countStatus(ids, qstat);
                return (
                  <div key={m.id} className="catalog-row">
                    <div style={{ minWidth: 0 }}>
                      <div className="row small" style={{ gap: 8 }}><b className="ellipsis">{m.title}</b><RelevanceBadge r={m.relevance} /></div>
                      <div className="tiny dim">{mc.sicher} von {ids.length} sicher{mc.falsch ? ` · ${mc.falsch} falsch` : ''}{m.generators?.length ? ` · + Rechenaufgaben` : ''}</div>
                    </div>
                    <SegBar c={mc} />
                    <div className="row" style={{ gap: 6 }}>
                      <button className="btn sm ghost" title="Lektionen lesen" onClick={() => navigate(`/modul/${m.id}`)}><Icon name="BookOpen" size={14} />Lernen</button>
                      <button className="btn sm" title="Fragen beantworten" onClick={() => navigate(`/katalog/runde/offen/modul:${m.id}`)} disabled={!ids.length || mc.sicher === ids.length}><Icon name="ListChecks" size={14} />Fragen</button>
                      <button className="btn sm ghost" title="Modultest unter Prüfungsbedingungen" onClick={() => navigate(`/pruefung/start/modul/${m.id}`)}><Icon name="ClipboardCheck" size={14} />Test</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <p className="tiny dim">Module mit „Vertiefung“ zählen nicht zur AP1-Prüfungsreife (AP2/Praxis). Rechenaufgaben werden zusätzlich unter „Üben“ immer neu erzeugt.</p>
    </div>
  );
}

/** Lernrunde: bis zu 20 Fragen, falsche zuerst. */
export function CatalogRound({ filter, scope }: { filter: RoundFilter; scope: string }) {
  const { qstat, recordAttempt, setResume } = useStore();
  const [ids] = useState(() => roundQuestions(scopeIds(scope), qstat, filter, ROUND_SIZE));
  const [i, setI] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  useEffect(() => setResume({ route: `/katalog/runde/${filter}/${scope}`, label: `Fragenkatalog: ${scopeLabel(scope)}` }), []); // eslint-disable-line react-hooks/exhaustive-deps

  const q = ids[i] ? QUESTION_MAP.get(ids[i]) : undefined;
  const back = <button className="btn ghost sm" onClick={() => navigate('/katalog')}><Icon name="ArrowLeft" size={14} /> Katalog</button>;

  if (!ids.length) {
    return <div className="page narrow">{back}<Empty icon="Trophy">Hier ist nichts mehr offen – alle Fragen in „{scopeLabel(scope)}“ sitzen sicher. Super!</Empty></div>;
  }

  if (i >= ids.length) {
    const ok = results.filter(Boolean).length;
    const left = countStatus(scopeIds(scope), qstat);
    return (
      <div className="page narrow">
        {back}
        <div className="card pad-lg mt">
          <h2 style={{ marginTop: 0 }}>Runde geschafft: {ok} von {ids.length} richtig</h2>
          <p className="muted">{ok === ids.length ? 'Alles richtig – stark!' : 'Die falschen Fragen kommen in der nächsten Runde zuerst wieder dran. So lernst du sie sicher.'}</p>
          <SegBar c={left} height={14} />
          <div className="mt"><Legend c={left} /></div>
          <div className="row wrap mt">
            <button className="btn primary" onClick={() => { location.hash = `/katalog/runde/offen/${scope}?r=${Date.now()}`; }}><Icon name="Play" size={16} />Nächste Runde</button>
            <button className="btn" onClick={() => navigate('/katalog')}>Zum Katalog</button>
          </div>
        </div>
      </div>
    );
  }

  const onDone = async (o: QuestionOutcome) => {
    if (!q) return;
    setAnswered(true);
    setResults((r) => [...r, o.result.correct]);
    await recordAttempt({ questionId: q.id, skill: q.skill, kind: q.kind, mode: 'ueben', difficulty: q.difficulty, question: q, response: o.response, correct: o.result.correct, score: o.result.score, errorTags: o.result.errorTags, hintsUsed: o.hintsUsed, durationMs: o.durationMs });
  };
  const st = statusOf(qstat[ids[i]]);

  return (
    <div className="page narrow">
      <div className="row between">
        {back}
        <span className="small muted">{scopeLabel(scope)} · Frage {i + 1} von {ids.length}</span>
      </div>
      <div className="stepper mt">{ids.map((_, k) => <div key={k} className={k < i ? 'done' : k === i ? 'cur' : ''} />)}</div>
      <div className="tiny dim mt">Status dieser Frage: <span className="dot" style={{ background: COLORS[st] }} /> {SHORT[st]}</div>
      {q && <div className="mt"><QuestionView key={q.id} question={q} mode="ueben" onDone={onDone} /></div>}
      {answered && (
        <div className="row mt">
          <span className="spacer" />
          <button className="btn primary" onClick={() => { setI(i + 1); setAnswered(false); }}>{i + 1 < ids.length ? 'Nächste Frage' : 'Auswertung'} <Icon name="ArrowRight" size={16} /></button>
        </div>
      )}
    </div>
  );
}
