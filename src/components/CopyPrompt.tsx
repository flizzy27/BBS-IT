/**
 * „Prompt kopieren“: kopiert eine fertige Anfrage für eine beliebige KI in die Zwischenablage
 * und kann sie optional direkt in ChatGPT/Claude öffnen.
 */
import React, { useEffect, useRef, useState } from 'react';
import { AI_TARGETS } from '../lib/aiPrompt';
import { Icon } from './common';

async function copy(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}

export interface PromptOption {
  label: string;
  hint?: string;
  icon?: string;
  build: () => string;
}

export function CopyPromptButton({ options, label = 'KI-Prompt kopieren', small }: { options: PromptOption[]; label?: string; small?: boolean }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [lastPrompt, setLastPrompt] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const run = async (o: PromptOption) => {
    const p = o.build();
    const ok = await copy(p);
    setLastPrompt(p);
    setDone(ok ? 'Kopiert! Jetzt in eine KI einfügen (Strg+V).' : 'Kopieren nicht möglich – bitte manuell markieren.');
    setTimeout(() => setDone(null), 4000);
  };
  return (
    <div className="copy-prompt" ref={ref}>
      <button className={`btn ${small ? 'sm' : ''} ghost`} onClick={() => setOpen(!open)} title="Fertigen Prompt für ChatGPT, Claude, Gemini o. Ä. kopieren">
        <Icon name="ClipboardCopy" size={small ? 14 : 16} /> {label} <Icon name="ChevronDown" size={13} />
      </button>
      {open && (
        <div className="menu">
          <div className="tiny dim" style={{ padding: '6px 10px 4px' }}>Prompt in die Zwischenablage kopieren:</div>
          {options.map((o) => (
            <button key={o.label} className="menu-item" onClick={() => run(o)}>
              <Icon name={o.icon ?? 'Sparkles'} size={15} />
              <div><div>{o.label}</div>{o.hint && <div className="tiny dim">{o.hint}</div>}</div>
            </button>
          ))}
          {lastPrompt && (
            <>
              <div className="tiny dim" style={{ padding: '8px 10px 4px', borderTop: '1px solid var(--border)', marginTop: 4 }}>Direkt öffnen (Prompt ist bereits kopiert):</div>
              <div className="row wrap" style={{ padding: '0 8px 8px', gap: 6 }}>
                {AI_TARGETS.map((t) => (
                  <a key={t.id} className="chip" href={lastPrompt.length < 7000 ? t.url(lastPrompt) : t.url('')} target="_blank" rel="noreferrer noopener">{t.label} ↗</a>
                ))}
              </div>
            </>
          )}
          {done && <div className="tiny" style={{ padding: '6px 10px', color: 'var(--ok)' }}>{done}</div>}
        </div>
      )}
    </div>
  );
}
