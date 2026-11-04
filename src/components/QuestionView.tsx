/**
 * Darstellung und Bearbeitung einer Aufgabe in allen Antwortformaten, inkl. deterministischer
 * Auswertung, Fehleranalyse, Lösungsweg und Tutor-Anbindung.
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { Question, TableQuestion, VlsmQuestion } from '../content/types';
import { grade, type GradeResult, type ResponseValue } from '../core/grading';
import { errorInfo } from '../core/errors';
import { Rng } from '../core/rng';
import { LESSON_MAP, skillTitle } from '../content';
import { useStore, navigate } from '../lib/store';
import { api } from '../lib/api';
import { Icon, Md } from './common';
import { Widget, VlsmBoxes } from './widgets';
import type { VlsmValidation } from '../core/vlsm';
import { blockSize, parseIpSafe, parsePrefixInput } from '../core/ipv4';

export interface QuestionOutcome {
  result: GradeResult;
  response: ResponseValue;
  hintsUsed: number;
  durationMs: number;
}

interface Props {
  question: Question;
  /** 'ueben' = Tipps + direkte Auswertung; 'pruefung' = keine Tipps, keine sofortige Auswertung */
  mode: 'lernen' | 'ueben' | 'pruefung' | 'schwaechen' | 'einstufung';
  onDone?: (o: QuestionOutcome) => void;
  /** Im Prüfungsmodus: Antwort laufend melden */
  onChange?: (r: ResponseValue) => void;
  initialResponse?: ResponseValue;
  /** Ergebnis von außen anzeigen (Prüfungsauswertung) */
  reviewResult?: GradeResult;
  hideSubmit?: boolean;
  compact?: boolean;
}

export function QuestionView({ question: q, mode, onDone, onChange, initialResponse, reviewResult, hideSubmit, compact }: Props) {
  const { setTutorContext, askTutor } = useStore();
  const [resp, setResp] = useState<ResponseValue>(initialResponse ?? defaultResponse(q));
  const [result, setResult] = useState<GradeResult | null>(reviewResult ?? null);
  const [hints, setHints] = useState(0);
  const [aiBusy, setAiBusy] = useState(false);
  const [aiNote, setAiNote] = useState<string | null>(null);
  const start = useRef(Date.now());
  const showHints = mode === 'ueben' || mode === 'lernen' || mode === 'schwaechen';

  useEffect(() => {
    setResp(initialResponse ?? defaultResponse(q));
    setResult(reviewResult ?? null);
    setHints(0);
    setAiNote(null);
    start.current = Date.now();
  }, [q.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (reviewResult) setResult(reviewResult);
  }, [reviewResult]);

  // Tutor-Kontext aktualisieren
  useEffect(() => {
    if (mode === 'pruefung' && !result) {
      setTutorContext({ view: 'Prüfung (ohne Hilfe)', extra: 'Der Lernende schreibt gerade eine Prüfung. Gib KEINE inhaltlichen Hilfen zur laufenden Aufgabe.' });
      return;
    }
    setTutorContext({
      view: modeLabel(mode),
      question: q,
      status: result ? 'abgegeben' : 'offen',
      response: resp,
      result: result ? { correct: result.correct, score: result.score, errorTags: result.errorTags, feedback: result.feedback, solution: result.solution } : undefined,
    });
  }, [q, resp, result, mode, setTutorContext]);

  const update = (r: ResponseValue) => {
    setResp(r);
    onChange?.(r);
  };

  const submit = async () => {
    const r = grade(q, resp);
    setResult(r);
    if (q.kind === 'free' && r.pending) return; // erst Selbst-/KI-Bewertung
    onDone?.({ result: r, response: resp, hintsUsed: hints, durationMs: Date.now() - start.current });
  };

  const finishFree = (score: number, ai = false, note?: string) => {
    const text = typeof resp === 'string' ? resp : '';
    const r = grade(q, { selfScore: score, text });
    if (ai && note) r.feedback = `**KI-Bewertung:** ${note}`;
    setResult(r);
    onDone?.({ result: r, response: { selfScore: score, text }, hintsUsed: hints, durationMs: Date.now() - start.current });
  };

  const aiGrade = async () => {
    if (q.kind !== 'free') return;
    setAiBusy(true);
    setAiNote(null);
    try {
      const r = await api.aiGrade({ prompt: q.prompt, modelAnswer: q.modelAnswer, keywords: q.keywords, answer: typeof resp === 'string' ? resp : '' });
      const missing = r.missing.length ? `\n\nFehlend/ungenau: ${r.missing.join('; ')}` : '';
      finishFree(Math.round(r.score * 4) / 4, true, `${r.feedback}${missing}`);
    } catch (e) {
      setAiNote((e as Error).message);
    } finally {
      setAiBusy(false);
    }
  };

  const locked = !!result && !(q.kind === 'free' && result.pending);
  const canSubmit = hasAnswer(q, resp);

  return (
    <div className="col" style={{ gap: 14 }}>
      <div className={`block task`}>
        <div className="row between">
          <div className="block-label"><Icon name="PenLine" size={14} />Aufgabe · {kindLabel(q.kind)}</div>
          <div className="row tiny dim">
            <span>{skillTitle(q.skill)}</span>
            <span className="badge">{'●'.repeat(q.difficulty)}{'○'.repeat(3 - q.difficulty)}</span>
            {q.generated && <span className="badge" title="Algorithmisch erzeugte Variante – exakt berechnet">generiert</span>}
          </div>
        </div>
        <Md>{q.prompt}</Md>
        {q.widget && <div className="mt"><Widget spec={q.widget} /></div>}
        <div className="mt">
          <AnswerInput q={q} resp={resp} setResp={update} locked={locked} result={result} />
        </div>
        {showHints && !locked && q.hints && q.hints.length > 0 && (
          <div className="col mt">
            {q.hints.slice(0, hints).map((h, i) => (
              <div key={i} className="hint"><b>Tipp {i + 1}:</b> {h}</div>
            ))}
          </div>
        )}
        {!hideSubmit && !locked && (
          <div className="row wrap mt">
            <button className="btn primary" onClick={submit} disabled={!canSubmit}>
              <Icon name="Check" size={16} /> {q.kind === 'free' ? 'Antwort abgeben' : 'Prüfen'}
            </button>
            {showHints && q.hints && hints < q.hints.length && (
              <button className="btn" onClick={() => setHints(hints + 1)}>
                <Icon name="Lightbulb" size={16} /> Tipp ({hints + 1}/{q.hints.length})
              </button>
            )}
            {mode !== 'pruefung' && mode !== 'einstufung' && (
              <button className="btn ghost" onClick={() => askTutor('Ich komme bei dieser Aufgabe nicht weiter. Gib mir bitte einen Denkanstoß, aber verrate noch nicht die Lösung.')}>
                <Icon name="MessageCircleQuestion" size={16} /> Denkanstoß vom Tutor
              </button>
            )}
          </div>
        )}
      </div>

      {q.kind === 'free' && result?.pending && (
        <div className="block ai">
          <div className="block-label"><Icon name="Scale" size={14} />Bewertung des Freitexts</div>
          <p className="small muted">Freitext lässt sich nicht exakt algorithmisch prüfen. Vergleiche deine Antwort mit der Musterlösung und bewerte dich ehrlich – oder lass den KI-Tutor bewerten (als KI-Bewertung gekennzeichnet).</p>
          <div className="block summary" style={{ marginBottom: 12 }}>
            <div className="block-label">Musterlösung</div>
            <Md>{q.modelAnswer}</Md>
            {q.keywords && <div className="tiny dim mt">Kernbegriffe: {q.keywords.join(' · ')}</div>}
          </div>
          <div className="row wrap">
            <span className="small">Selbsteinschätzung:</span>
            <button className="btn sm ok" onClick={() => finishFree(1)}>Vollständig richtig</button>
            <button className="btn sm" onClick={() => finishFree(0.5)}>Teilweise</button>
            <button className="btn sm danger" onClick={() => finishFree(0)}>Falsch</button>
            <span className="spacer" />
            <button className="btn sm" onClick={aiGrade} disabled={aiBusy}>
              <Icon name="Sparkles" size={14} /> {aiBusy ? 'KI bewertet …' : 'KI bewerten lassen'}
            </button>
          </div>
          {aiNote && <div className="small mt" style={{ color: 'var(--bad)' }}>{aiNote}</div>}
        </div>
      )}

      {result && !result.pending && mode !== 'pruefung' && mode !== 'einstufung' && <ResultView q={q} result={result} resp={resp} compact={compact} />}
      {result && !result.pending && (mode === 'pruefung' || mode === 'einstufung') && reviewResult && <ResultView q={q} result={result} resp={resp} compact={compact} />}
    </div>
  );
}

function modeLabel(m: Props['mode']) {
  return { lernen: 'Lerneinheit', ueben: 'Üben', pruefung: 'Prüfung', schwaechen: 'Schwachstellen-Training', einstufung: 'Einstufungstest' }[m];
}

export function kindLabel(k: Question['kind']): string {
  return { single: 'Einfachauswahl', multi: 'Mehrfachauswahl', number: 'Zahl', text: 'Kurzantwort', ip: 'IP-Adresse', cidr: 'CIDR / Präfix', free: 'Freitext', match: 'Zuordnung', order: 'Reihenfolge', table: 'Tabelle', vlsm: 'VLSM-Planung' }[k];
}

function defaultResponse(q: Question): ResponseValue {
  switch (q.kind) {
    case 'multi': return [];
    case 'match': return q.left.map(() => -1);
    case 'order': return shuffledOrder(q.id, q.items.length);
    case 'table': return q.rows.map(() => ({}));
    case 'vlsm': return Object.fromEntries(q.demands.map((d) => [d.id, { network: '', prefix: '' }]));
    case 'single': return null;
    default: return '';
  }
}

function shuffledOrder(id: string, n: number): number[] {
  let seed = 0;
  for (const c of id) seed = (seed * 31 + c.charCodeAt(0)) >>> 0;
  const rng = new Rng(seed || 1);
  let arr = rng.shuffle(Array.from({ length: n }, (_, i) => i));
  if (arr.every((v, i) => v === i) && n > 1) arr = [...arr.slice(1), arr[0]];
  return arr;
}

function hasAnswer(q: Question, r: ResponseValue): boolean {
  switch (q.kind) {
    case 'single': return typeof r === 'number';
    case 'multi': return Array.isArray(r) && r.length > 0;
    case 'match': return Array.isArray(r) && (r as number[]).every((x) => x >= 0);
    case 'order': return true;
    case 'table': return Array.isArray(r) && (r as Record<string, string>[]).some((row) => Object.values(row).some((v) => v?.trim()));
    case 'vlsm': return !!r && Object.values(r as Record<string, { network: string }>).some((e) => e.network?.trim());
    default: return typeof r === 'string' && r.trim().length > 0;
  }
}

/* ------------------------------------------------------------------ */

function AnswerInput({ q, resp, setResp, locked, result }: { q: Question; resp: ResponseValue; setResp: (r: ResponseValue) => void; locked: boolean; result: GradeResult | null }) {
  switch (q.kind) {
    case 'single':
      return (
        <div className="col" style={{ gap: 8 }}>
          {q.options.map((o, i) => {
            const cls = locked ? (i === q.answer ? 'correct' : resp === i ? 'wrong' : '') : resp === i ? 'selected' : '';
            return (
              <button key={i} className={`option ${cls}`} disabled={locked} onClick={() => setResp(i)}>
                <span className="marker">{resp === i && !locked && <Icon name="Check" size={12} />}</span>
                <Md>{o}</Md>
              </button>
            );
          })}
        </div>
      );
    case 'multi': {
      const sel = new Set(resp as number[]);
      return (
        <div className="col" style={{ gap: 8 }}>
          <div className="tiny dim">Mehrere Antworten können richtig sein.</div>
          {q.options.map((o, i) => {
            const cls = locked ? (q.answer.includes(i) ? 'correct' : sel.has(i) ? 'wrong' : '') : sel.has(i) ? 'selected' : '';
            return (
              <button key={i} className={`option multi ${cls}`} disabled={locked} onClick={() => { const n = new Set(sel); n.has(i) ? n.delete(i) : n.add(i); setResp([...n].sort()); }}>
                <span className="marker">{sel.has(i) && !locked && <Icon name="Check" size={12} />}</span>
                <Md>{o}</Md>
              </button>
            );
          })}
        </div>
      );
    }
    case 'number':
    case 'text':
    case 'ip':
    case 'cidr': {
      const ok = result && !result.pending ? result.correct : null;
      const ph = q.kind === 'ip' ? 'z. B. 192.168.1.0' : q.kind === 'cidr' ? 'z. B. /26' : q.kind === 'number' ? 'Zahl' : (q as { placeholder?: string }).placeholder ?? 'Antwort';
      return (
        <div className="row">
          <input
            className={`input ${q.kind !== 'text' || /[.:]/.test(String(resp)) ? 'mono' : ''} ${ok === true ? 'ok' : ok === false ? 'bad' : ''}`}
            style={{ maxWidth: q.kind === 'text' ? 520 : 280 }}
            value={(resp as string) ?? ''}
            placeholder={ph}
            disabled={locked}
            onChange={(e) => setResp(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.repeat) { e.preventDefault(); (e.currentTarget.closest('.block')?.querySelector('.btn.primary') as HTMLButtonElement | null)?.click(); } }}
            autoFocus
            spellCheck={false}
          />
          {q.kind === 'number' && q.unit && <span className="muted">{q.unit}</span>}
        </div>
      );
    }
    case 'free':
      return <textarea className="input" rows={6} placeholder="Formuliere deine Antwort in ganzen Sätzen …" value={(resp as string) ?? ''} disabled={locked || !!result} onChange={(e) => setResp(e.target.value)} />;
    case 'match': {
      const r = resp as number[];
      const ok = (result?.details as boolean[] | undefined) ?? [];
      return (
        <div className="col" style={{ gap: 8 }}>
          {q.left.map((l, i) => (
            <div key={i} className="row" style={{ alignItems: 'stretch' }}>
              <div className="option" style={{ flex: 1, cursor: 'default' }}><Md>{l}</Md></div>
              <Icon name="ArrowRight" size={18} className="dim" />
              <select className={`input ${locked ? (ok[i] ? 'ok' : 'bad') : ''}`} style={{ flex: 1 }} value={r[i]} disabled={locked} onChange={(e) => { const n = [...r]; n[i] = +e.target.value; setResp(n); }}>
                <option value={-1}>– auswählen –</option>
                {q.right.map((x, j) => <option key={j} value={j}>{x}</option>)}
              </select>
            </div>
          ))}
        </div>
      );
    }
    case 'order': {
      const r = resp as number[];
      const ok = (result?.details as boolean[] | undefined) ?? [];
      const move = (i: number, d: number) => {
        const j = i + d;
        if (j < 0 || j >= r.length) return;
        const n = [...r];
        [n[i], n[j]] = [n[j], n[i]];
        setResp(n);
      };
      return (
        <div className="col" style={{ gap: 6 }}>
          {r.map((itemIdx, pos) => (
            <div key={itemIdx} className={`option ${locked ? (ok[pos] ? 'correct' : 'wrong') : ''}`} style={{ cursor: 'default' }}>
              <span className="step-num">{pos + 1}</span>
              <div style={{ flex: 1 }}><Md>{q.items[itemIdx]}</Md></div>
              {!locked && (
                <div className="row" style={{ gap: 2 }}>
                  <button className="btn ghost sm" onClick={() => move(pos, -1)} disabled={pos === 0} aria-label="nach oben"><Icon name="ChevronUp" size={16} /></button>
                  <button className="btn ghost sm" onClick={() => move(pos, 1)} disabled={pos === r.length - 1} aria-label="nach unten"><Icon name="ChevronDown" size={16} /></button>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }
    case 'table':
      return <TableInput q={q} resp={resp as Record<string, string>[]} setResp={setResp} locked={locked} cellOk={result?.details as Record<string, boolean>[] | undefined} />;
    case 'vlsm':
      return <VlsmInput q={q} resp={resp as Record<string, { network: string; prefix: string }>} setResp={setResp} locked={locked} validation={result?.details as VlsmValidation | undefined} />;
  }
}

function TableInput({ q, resp, setResp, locked, cellOk }: { q: TableQuestion; resp: Record<string, string>[]; setResp: (r: ResponseValue) => void; locked: boolean; cellOk?: Record<string, boolean>[] }) {
  const hasLabels = q.rows.some((r) => r.label);
  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="table">
        <thead>
          <tr>
            {hasLabels && <th />}
            {q.columns.map((c) => <th key={c.key}>{c.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {q.rows.map((row, ri) => (
            <tr key={ri}>
              {hasLabels && <td className="small" style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{row.label}</td>}
              {q.columns.map((c) => {
                const cell = row.cells[c.key];
                if (!cell) return <td key={c.key} />;
                if (cell.given !== undefined) return <td key={c.key} className="mono muted">{cell.given}</td>;
                const ok = cellOk?.[ri]?.[c.key];
                return (
                  <td key={c.key}>
                    <input
                      className={`input mono ${locked ? (ok ? 'ok' : 'bad') : ''}`}
                      style={{ minWidth: c.type === 'number' || c.type === 'cidr' ? 90 : 150, padding: '7px 10px' }}
                      value={resp?.[ri]?.[c.key] ?? ''}
                      disabled={locked}
                      spellCheck={false}
                      onChange={(e) => {
                        const n = resp.map((x) => ({ ...x }));
                        n[ri] = { ...(n[ri] ?? {}), [c.key]: e.target.value };
                        setResp(n);
                      }}
                    />
                    {locked && !ok && <div className="tiny mono" style={{ color: 'var(--ok)', marginTop: 3 }}>{cell.answer}</div>}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function VlsmInput({ q, resp, setResp, locked, validation }: { q: VlsmQuestion; resp: Record<string, { network: string; prefix: string; firstHost?: string; lastHost?: string; broadcast?: string }>; setResp: (r: ResponseValue) => void; locked: boolean; validation?: VlsmValidation }) {
  const [extended, setExtended] = useState(false);
  const plan = useMemo(() => {
    const out: { name: string; network: number; prefix: number; ok?: boolean }[] = [];
    for (const d of q.demands) {
      const e = resp[d.id];
      const ip = parseIpSafe(e?.network ?? '');
      const p = parsePrefixInput(e?.prefix ?? '');
      if (ip !== null && p !== null && p >= 8) {
        const v = validation?.entries.find((x) => x.id === d.id);
        out.push({ name: d.name, network: ip, prefix: p, ok: v ? v.ok : undefined });
      }
    }
    return out;
  }, [resp, q.demands, validation]);
  const set = (id: string, key: string, v: string) => setResp({ ...resp, [id]: { ...resp[id], [key]: v } });
  return (
    <div className="col">
      <VlsmDiagram q={q} resp={resp} validation={validation} />
      <div className="row between">
        <b className="small">Adressplan</b>
        <label className="row small muted" style={{ gap: 6 }}><input type="checkbox" checked={extended} onChange={(e) => setExtended(e.target.checked)} />Hostbereich & Broadcast mit eintragen</label>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="table">
          <thead>
            <tr><th>Netz</th><th>Bedarf</th><th>Netzadresse</th><th>Präfix</th>{extended && <><th>Erster Host</th><th>Letzter Host</th><th>Broadcast</th></>}<th /></tr>
          </thead>
          <tbody>
            {q.demands.map((d) => {
              const v = validation?.entries.find((e) => e.id === d.id);
              const cls = v ? (v.ok ? 'ok' : 'bad') : '';
              return (
                <React.Fragment key={d.id}>
                  <tr>
                    <td style={{ fontWeight: 600 }}>{d.name}</td>
                    <td className="small">{d.kind === 'wan' ? `P2P (/${q.wanPrefix})` : `${d.hosts} Hosts`}</td>
                    <td><input className={`input mono ${cls}`} style={{ minWidth: 150 }} value={resp[d.id]?.network ?? ''} disabled={locked} onChange={(e) => set(d.id, 'network', e.target.value)} placeholder="z. B. 192.168.10.0" spellCheck={false} /></td>
                    <td><input className={`input mono ${cls}`} style={{ width: 80 }} value={resp[d.id]?.prefix ?? ''} disabled={locked} onChange={(e) => set(d.id, 'prefix', e.target.value)} placeholder="/26" spellCheck={false} /></td>
                    {extended && (['firstHost', 'lastHost', 'broadcast'] as const).map((k) => (
                      <td key={k}><input className="input mono" style={{ minWidth: 140 }} value={resp[d.id]?.[k] ?? ''} disabled={locked} onChange={(e) => set(d.id, k, e.target.value)} spellCheck={false} /></td>
                    ))}
                    <td>{v && <Icon name={v.ok ? 'CircleCheck' : 'CircleX'} size={18} className={v.ok ? '' : ''} />}</td>
                  </tr>
                  {v && v.issues.length > 0 && (
                    <tr>
                      <td colSpan={extended ? 8 : 5} style={{ paddingTop: 0 }}>
                        {v.issues.map((i, k) => (
                          <div key={k} className="tiny" style={{ color: i.severity === 'error' ? 'var(--bad)' : 'var(--warn)' }}>• {i.message}</div>
                        ))}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      {plan.length > 0 && <VlsmBoxes network={q.base.split('/')[0]} prefix={Number(q.base.split('/')[1])} plan={plan} />}
    </div>
  );
}

/** Automatisch erzeugtes Netzwerkdiagramm einer VLSM-Aufgabe mit den eingetragenen Netzen. */
function VlsmDiagram({ q, resp, validation }: { q: VlsmQuestion; resp: Record<string, { network: string; prefix: string }>; validation?: VlsmValidation }) {
  const lans = q.demands.filter((d) => d.kind === 'lan');
  const wans = q.demands.filter((d) => d.kind === 'wan');
  const routerCount = Math.max(1, Math.min(lans.length, wans.length + 1));
  const W = 800;
  const routers = Array.from({ length: routerCount }, (_, i) => ({ x: (W / (routerCount + 1)) * (i + 1), y: 90 }));
  const lanPos = lans.map((_, i) => {
    const r = Math.min(i, routerCount - 1);
    const siblings = lans.filter((__, j) => Math.min(j, routerCount - 1) === r);
    const k = siblings.indexOf(lans[i]);
    const spread = 150;
    return { x: routers[r].x + (k - (siblings.length - 1) / 2) * spread, y: 270, r };
  });
  const label = (id: string) => {
    const e = resp[id];
    return e?.network ? `${e.network}${e.prefix ? (e.prefix.startsWith('/') ? e.prefix : '/' + e.prefix) : ''}` : '?';
  };
  const color = (id: string) => {
    const v = validation?.entries.find((x) => x.id === id);
    return v ? (v.ok ? 'var(--ok)' : 'var(--bad)') : 'var(--text-3)';
  };
  return (
    <div className="topo card" style={{ background: 'var(--surface-2)', padding: 10 }}>
      <div className="tiny dim" style={{ marginBottom: 4 }}>Ausgangsnetz <b className="mono">{q.base}</b> · {blockSize(Number(q.base.split('/')[1]))} Adressen</div>
      <svg viewBox={`0 0 ${W} 360`}>
        {wans.map((w, i) => {
          const a = routers[i % routerCount];
          const b = routers[(i + 1) % routerCount];
          if (routerCount === 1) return null;
          const mx = (a.x + b.x) / 2;
          const bend = i >= routerCount - 1 ? 40 : 0;
          return (
            <g key={w.id}>
              <path d={`M${a.x},${a.y} Q${mx},${a.y - bend - 10} ${b.x},${b.y}`} stroke="var(--host)" strokeWidth="2.5" fill="none" strokeDasharray="7 5" />
              <rect x={mx - 75} y={a.y - bend - 38} width="150" height="34" rx="7" fill="var(--surface)" stroke={color(w.id)} />
              <text x={mx} y={a.y - bend - 24} textAnchor="middle" style={{ fontSize: 10.5, fill: 'var(--text-3)' }}>{w.name}</text>
              <text x={mx} y={a.y - bend - 10} textAnchor="middle" className="sub" style={{ fill: color(w.id) }}>{label(w.id)}</text>
            </g>
          );
        })}
        {lans.map((l, i) => {
          const p = lanPos[i];
          const r = routers[p.r];
          return (
            <g key={l.id}>
              <line x1={r.x} y1={r.y} x2={p.x} y2={p.y} stroke="var(--text-3)" strokeWidth="2" />
              <rect x={p.x - 70} y={p.y - 26} width="140" height="74" rx="10" fill="var(--surface)" stroke={color(l.id)} strokeWidth="1.5" />
              <foreignObject x={p.x - 10} y={p.y - 20} width="20" height="20"><div style={{ color: 'var(--accent-2)' }}><Icon name="Network" size={18} /></div></foreignObject>
              <text x={p.x} y={p.y + 12} textAnchor="middle" style={{ fontSize: 12, fontWeight: 600 }}>{l.name.replace(/^LAN /, '')}</text>
              <text x={p.x} y={p.y + 26} textAnchor="middle" style={{ fontSize: 10.5, fill: 'var(--text-3)' }}>{l.hosts} Hosts</text>
              <text x={p.x} y={p.y + 41} textAnchor="middle" className="sub" style={{ fill: color(l.id) }}>{label(l.id)}</text>
            </g>
          );
        })}
        {routers.map((r, i) => (
          <g key={i} transform={`translate(${r.x},${r.y})`}>
            <circle r="24" fill="var(--surface)" stroke="var(--border-strong)" />
            <foreignObject x="-11" y="-11" width="22" height="22"><div style={{ color: 'var(--host)' }}><Icon name="Router" size={22} /></div></foreignObject>
            <text y="40" textAnchor="middle" style={{ fontSize: 11, fill: 'var(--text-3)' }}>R{i + 1}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function ResultView({ q, result, resp, compact }: { q: Question; result: GradeResult; resp: ResponseValue; compact?: boolean }) {
  const { askTutor, skills } = useStore();
  const tone = result.correct ? 'result-ok' : result.score > 0 ? 'result-part' : 'result-bad';
  const errors = [...new Set(result.errorTags)].filter((t) => t !== 'eingabeformat' && t !== 'keine-antwort');
  return (
    <div className={`block ${tone}`}>
      <div className="row between">
        <div className="block-label" style={{ color: result.correct ? 'var(--ok)' : result.score > 0 ? 'var(--warn)' : 'var(--bad)' }}>
          <Icon name={result.correct ? 'CircleCheck' : result.score > 0 ? 'CircleDot' : 'CircleX'} size={15} />
          {result.correct ? 'Richtig' : result.score > 0 ? `Teilweise richtig (${Math.round(result.score * 100)} %)` : 'Noch nicht richtig'}
        </div>
        <span className="badge" title="Diese Bewertung wurde algorithmisch berechnet, nicht von einer KI.">
          <Icon name="Calculator" size={12} />{result.feedback.startsWith('**KI-Bewertung') ? 'KI-Bewertung' : 'exakt geprüft'}
        </span>
      </div>
      <Md>{result.feedback}</Md>
      {!result.correct && !['table', 'vlsm', 'single', 'multi', 'match', 'order', 'free'].includes(q.kind) && (
        <div className="grid grid-2 mt" style={{ gap: 10 }}>
          <div><div className="tiny dim">Deine Antwort</div><div className="mono">{String(resp ?? '–') || '–'}</div></div>
          <div><div className="tiny dim">Korrekte Lösung</div><div className="mono" style={{ color: 'var(--ok)', fontWeight: 650 }}>{result.solution}</div></div>
        </div>
      )}
      {errors.length > 0 && (
        <div className="mt">
          <div className="tiny dim" style={{ textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>Fehleranalyse</div>
          {errors.map((t) => {
            const info = errorInfo(t);
            const lesson = info.lesson ? LESSON_MAP.get(info.lesson) : undefined;
            return (
              <div key={t} className="small" style={{ marginTop: 6 }}>
                <b>{info.title}</b>
                {info.cause && <> – <Md className="small">{info.cause}</Md></>}
                {lesson && <button className="btn sm ghost" onClick={() => navigate(`/lektion/${lesson.id}`)}><Icon name="RotateCcw" size={13} />Wiederholen: {lesson.title}</button>}
              </div>
            );
          })}
        </div>
      )}
      {!compact && (
        <details className="mt" open={!result.correct}>
          <summary style={{ cursor: 'pointer', fontWeight: 600 }}>Begründung & vollständiger Lösungsweg</summary>
          <div className="mt"><Md>{q.explanation}</Md></div>
        </details>
      )}
      {!result.correct && (
        <div className="row wrap mt">
          <button className="btn sm" onClick={() => askTutor('Ich habe diese Aufgabe falsch beantwortet. Analysiere bitte, welchen Denkfehler ich gemacht habe, und hilf mir, ihn zu verstehen.')}>
            <Icon name="MessageCircle" size={14} /> Fehler mit dem Tutor besprechen
          </button>
          <button className="btn sm ghost" onClick={() => askTutor('Stopp, das verstehe ich nicht. Erkläre mir den Lösungsweg bitte noch einmal anders und kleinschrittiger.')}>
            Stopp, das verstehe ich nicht
          </button>
        </div>
      )}
      {skills[q.skill] && <div className="tiny dim mt">Kenntnisstand „{skillTitle(q.skill)}“: {Math.round(skills[q.skill].mastery * 100)} %</div>}
    </div>
  );
}
