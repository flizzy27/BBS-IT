/**
 * KI-Tutor: Chat, der den aktuellen Lernkontext (Aufgabe, Antwort, Bewertung, Kenntnisstand) kennt.
 * Funktioniert nur mit konfiguriertem KI-Anbieter – ohne KI läuft der Lernbetrieb trotzdem vollständig.
 */
import React, { useEffect, useRef, useState } from 'react';
import { api, streamChat, type AiStatus } from '../lib/api';
import { useStore, navigate, type TutorContext } from '../lib/store';
import { describeSolution } from '../core/grading';
import { errorInfo } from '../core/errors';
import { knowledge, recurringErrors, STAGE_LABEL } from '../core/learning';
import { SKILL_MAP, skillTitle } from '../content';
import { Icon, Md } from './common';
import type { SkillState } from '../core/learning';

interface Msg { role: 'user' | 'assistant' | 'error'; content: string }

const QUICK = [
  'Stopp, das verstehe ich nicht.',
  'Erklär es mir anders – mit einem Beispiel aus einem Firmennetz.',
  'Zeig mir das binär.',
  'Gib mir einen Denkanstoß, aber nicht die Lösung.',
  'Kurzfassung bitte.',
  'Stell mir eine Verständnisfrage dazu.',
];

export function buildContext(ctx: TutorContext, skills: Record<string, SkillState>, selfReport: string): string {
  const now = Date.now();
  const lines: string[] = [`Ansicht: ${ctx.view}`];
  if (ctx.extra) lines.push(ctx.extra);
  const q = ctx.question;
  if (q) {
    lines.push(`\nAKTUELLE AUFGABE (${q.kind}, Thema: ${skillTitle(q.skill)}, Status: ${ctx.status ?? 'offen'}):\n${q.prompt}`);
    if ('options' in q && Array.isArray(q.options)) lines.push('Optionen: ' + q.options.map((o, i) => `[${i}] ${o}`).join(' | '));
    if (q.kind === 'match') lines.push(`Links: ${q.left.join(' | ')}\nRechts: ${q.right.join(' | ')}`);
    if (q.kind === 'order') lines.push(`Elemente (korrekte Reihenfolge, nur intern): ${q.items.join(' → ')}`);
    if (q.kind === 'vlsm') lines.push(`Ausgangsnetz ${q.base}, Bedarf: ${q.demands.map((d) => `${d.name}: ${d.kind === 'wan' ? 'WAN /' + q.wanPrefix : d.hosts + ' Hosts'}`).join('; ')}`);
    if (ctx.response !== undefined && ctx.response !== null && ctx.response !== '') lines.push(`Aktuelle Eingabe des Lernenden: ${JSON.stringify(ctx.response)}`);
    if (ctx.status === 'abgegeben' && ctx.result) {
      lines.push(`ALGORITHMISCHE BEWERTUNG: ${ctx.result.correct ? 'richtig' : `falsch (Teilpunkte ${Math.round(ctx.result.score * 100)} %)`}`);
      lines.push(`Korrekte Lösung (exakt berechnet): ${ctx.result.solution === 'siehe Tabelle' || ctx.result.solution.startsWith('siehe') ? describeTable(q) : ctx.result.solution}`);
      if (ctx.result.errorTags.length) lines.push('Erkannte Fehlerkategorien: ' + ctx.result.errorTags.map((t) => `${errorInfo(t).title}${errorInfo(t).cause ? ' (' + errorInfo(t).cause + ')' : ''}`).join('; '));
      lines.push(`Rückmeldung der App: ${ctx.result.feedback}`);
      lines.push(`Musterlösungsweg:\n${q.explanation}`);
    } else {
      lines.push('Die Aufgabe ist noch NICHT abgegeben – verrate die Lösung nicht, gib höchstens Denkanstöße.');
    }
  }
  // Kenntnisstand
  const known = Object.values(skills).filter((s) => s.attempts > 0 || s.lessonDone);
  if (known.length) {
    const weak = known.filter((s) => knowledge(s, now) < 0.5).slice(0, 8);
    const strong = known.filter((s) => knowledge(s, now) >= 0.75).slice(0, 8);
    lines.push(`\nKENNTNISSTAND: ${known.length} Themen begonnen.`);
    if (weak.length) lines.push('Schwach: ' + weak.map((s) => `${skillTitle(s.skill)} (${Math.round(knowledge(s, now) * 100)} %, ${STAGE_LABEL[s.stage]})`).join('; '));
    if (strong.length) lines.push('Sicher: ' + strong.map((s) => skillTitle(s.skill)).join('; '));
    const rec = known.flatMap((s) => recurringErrors(s).map((e) => `${errorInfo(e.tag).title} (${e.count}×)`)).slice(0, 6);
    if (rec.length) lines.push('Wiederkehrende Fehler: ' + rec.join('; '));
  }
  if (selfReport) lines.push(`\nSELBSTAUSKUNFT DES LERNENDEN: ${selfReport}`);
  return lines.join('\n');
}

function describeTable(q: TutorContext['question']): string {
  if (!q) return '';
  if (q.kind === 'table') return q.rows.map((r) => `${r.label ?? ''}: ${Object.entries(r.cells).map(([k, c]) => `${k}=${c.answer ?? c.given}`).join(', ')}`).join(' | ');
  return describeSolution(q);
}

export function TutorChat({ full = false, threadId: initialThread }: { full?: boolean; threadId?: string }) {
  const { tutorContext, skills, settings, tutorQueue, consumeTutorQueue, setTutorOpen } = useStore();
  const [status, setStatus] = useState<AiStatus | null>(null);
  const [threadId, setThreadId] = useState<string | undefined>(initialThread);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [useCtx, setUseCtx] = useState(true);
  const abortRef = useRef<AbortController | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.aiStatus().then(setStatus).catch(() => setStatus(null));
  }, []);

  useEffect(() => {
    setThreadId(initialThread);
    if (initialThread) api.thread(initialThread).then((t) => setMsgs(t.messages.map((m) => ({ role: m.role, content: m.content })))).catch(() => {});
    else setMsgs([]);
  }, [initialThread]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [msgs]);

  const send = async (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    setInput('');
    setBusy(true);
    setMsgs((m) => [...m, { role: 'user', content: t }, { role: 'assistant', content: '' }]);
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    await streamChat(
      { threadId, message: t, context: useCtx ? buildContext(tutorContext, skills, settings.selfReport) : undefined, title: tutorContext.question ? `${tutorContext.view}: ${t}` : t },
      {
        thread: (id) => setThreadId(id),
        text: (d) => setMsgs((m) => { const c = [...m]; c[c.length - 1] = { ...c[c.length - 1], content: c[c.length - 1].content + d }; return c; }),
        error: (e) => setMsgs((m) => { const c = [...m]; if (c[c.length - 1]?.role === 'assistant' && !c[c.length - 1].content) c.pop(); return [...c, { role: 'error', content: e }]; }),
        done: () => {},
      },
      ctrl.signal,
    );
    setBusy(false);
  };

  // Nachrichten aus „Tutor fragen“-Buttons
  useEffect(() => {
    if (tutorQueue && status && status.provider !== 'none') {
      const q = tutorQueue;
      consumeTutorQueue();
      send(q);
    }
  }, [tutorQueue, status]); // eslint-disable-line react-hooks/exhaustive-deps

  const noAi = status && status.provider === 'none';

  return (
    <div className={full ? 'card' : 'tutor'} style={full ? { display: 'flex', flexDirection: 'column', height: 'calc(100vh - 170px)', padding: 0 } : undefined}>
      <div className="tutor-head">
        <div className="module-icon" style={{ width: 34, height: 34, background: 'linear-gradient(135deg, var(--accent), var(--sub))', color: 'white' }}><Icon name="GraduationCap" size={18} /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <b>KI-Tutor</b>
          <div className="tiny dim" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {status?.staticMode ? 'nur in der lokalen Version' : noAi ? 'nicht eingerichtet' : status ? `${status.provider === 'anthropic' ? status.model : 'Claude Code CLI'} · sieht: ${tutorContext.view}` : '…'}
          </div>
        </div>
        <button className="btn ghost sm" title="Neues Gespräch" onClick={() => { setThreadId(undefined); setMsgs([]); }}><Icon name="SquarePen" size={16} /></button>
        {!full && <button className="btn ghost sm" title="Schließen" onClick={() => setTutorOpen(false)}><Icon name="X" size={16} /></button>}
      </div>
      <div className="tutor-body" ref={bodyRef}>
        {noAi && (
          <div className="block ai small">
            <b>Der KI-Tutor ist noch nicht eingerichtet.</b>
            <p className="muted">{status?.staticMode ? 'In der gehosteten Web-Version steht der Tutor nicht zur Verfügung, weil kein API-Schlüssel in eine öffentliche Seite gehört. Alle Aufgaben werden trotzdem exakt geprüft.' : 'Alle Aufgaben und Bewertungen funktionieren auch ohne KI. Für den Tutor wähle in den Einstellungen die Anthropic-API (eigener API-Schlüssel, nutzungsabhängige Kosten) oder die lokal installierte Claude-Code-CLI.'}</p>
            {!status?.staticMode && <button className="btn sm primary" onClick={() => navigate('/einstellungen')}>Zu den Einstellungen</button>}
          </div>
        )}
        {msgs.length === 0 && !noAi && (
          <div className="col small muted">
            <p>Ich bin dein persönlicher Ausbilder. Ich sehe, woran du gerade arbeitest, deine Antworten und wo du dich noch schwer tust. Frag mich alles – oder sag einfach „Stopp, das verstehe ich nicht“.</p>
          </div>
        )}
        {msgs.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            {m.role === 'assistant' && !m.content ? <div className="typing"><span /><span /><span /></div> : <Md>{m.content}</Md>}
          </div>
        ))}
      </div>
      <div className="tutor-input">
        <div className="row" style={{ gap: 6, overflowX: 'auto', paddingBottom: 2 }}>
          {QUICK.map((q) => <button key={q} className="chip" onClick={() => send(q)} disabled={busy || !!noAi}>{q}</button>)}
        </div>
        <div className="row" style={{ alignItems: 'flex-end' }}>
          <textarea
            className="input"
            rows={2}
            style={{ minHeight: 46 }}
            placeholder={noAi ? 'KI-Tutor nicht eingerichtet' : 'Frag den Tutor … (Enter senden, Shift+Enter neue Zeile)'}
            value={input}
            disabled={!!noAi}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
          />
          {busy ? (
            <button className="btn" onClick={() => abortRef.current?.abort()} title="Abbrechen"><Icon name="Square" size={16} /></button>
          ) : (
            <button className="btn primary" onClick={() => send(input)} disabled={!input.trim() || !!noAi} title="Senden"><Icon name="Send" size={16} /></button>
          )}
        </div>
        <label className="row tiny dim" style={{ gap: 6 }}>
          <input type="checkbox" checked={useCtx} onChange={(e) => setUseCtx(e.target.checked)} />
          Lernkontext mitsenden (aktuelle Aufgabe, Kenntnisstand, Fehler)
        </label>
      </div>
    </div>
  );
}

export { SKILL_MAP };
