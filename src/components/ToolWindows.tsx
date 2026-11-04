/** Schwebende, verschiebbare Werkzeug-Fenster über der aktuellen Seite. */
import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Icon } from './common';
import { TOOL_META, closeTool, focusTool, moveTool, useToolWindows, type ToolWin } from '../lib/toolWindows';

const ToolBody = lazy(() => import('../pages/Tools').then((m) => ({ default: m.ToolById })));

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

function ToolWindow({ w, top }: { w: ToolWin; top: boolean }) {
  const meta = TOOL_META.find((m) => m.id === w.id)!;
  const [pos, setPos] = useState({ x: w.x, y: w.y });
  const drag = useRef<{ dx: number; dy: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => setPos({ x: w.x, y: w.y }), [w.x, w.y]);
  // nach Größenänderung des Browsers im sichtbaren Bereich halten
  useEffect(() => {
    const fit = () => setPos((p) => ({ x: clamp(p.x, 0, window.innerWidth - 120), y: clamp(p.y, 0, window.innerHeight - 48) }));
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  const onDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    drag.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    setPos({ x: clamp(e.clientX - drag.current.dx, 0, window.innerWidth - 120), y: clamp(e.clientY - drag.current.dy, 0, window.innerHeight - 48) });
  };
  const onUp = () => {
    if (!drag.current) return;
    drag.current = null;
    moveTool(w.id, pos.x, pos.y);
  };
  // Fenster auch per Tastatur verschieben: Alt + Pfeiltasten in der Titelleiste
  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 50 : 15;
    const d = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
    if (!d || !e.altKey) return;
    e.preventDefault();
    const n = { x: clamp(pos.x + d[0], 0, window.innerWidth - 120), y: clamp(pos.y + d[1], 0, window.innerHeight - 48) };
    setPos(n);
    moveTool(w.id, n.x, n.y);
  };

  return (
    <div
      ref={ref}
      className={`toolwin ${top ? 'top' : ''}`}
      role="dialog"
      aria-label={meta.label}
      style={{ left: pos.x, top: pos.y, width: meta.width, zIndex: 200 + w.z }}
      onPointerDownCapture={() => focusTool(w.id)}
      onKeyDown={(e) => { if (e.key === 'Escape' && w.id !== 'calc') closeTool(w.id); }}
    >
      <div className="toolwin-head" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onKeyDown={onKey} tabIndex={0} title="Ziehen zum Verschieben (Tastatur: Alt + Pfeiltasten)">
        <Icon name={meta.icon} size={15} />
        <b>{meta.label}</b>
        <span className="spacer" />
        <button className="btn ghost sm icon" aria-label={`${meta.label} schließen`} onClick={() => closeTool(w.id)}><Icon name="X" size={16} /></button>
      </div>
      <div className="toolwin-body">
        <Suspense fallback={<div className="dim small">Lade …</div>}>
          <ToolBody id={w.id} />
          <FocusFirst />
        </Suspense>
      </div>
    </div>
  );
}

/** Setzt den Fokus ins erste Eingabefeld, sobald das (nachgeladene) Werkzeug da ist – Tastatur geht sofort. */
function FocusFirst() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    ref.current?.closest('.toolwin-body')?.querySelector<HTMLElement>('[data-autofocus], input, select, textarea')?.focus();
  }, []);
  return <span ref={ref} hidden />;
}

export function ToolWindowLayer() {
  const wins = useToolWindows();
  const topZ = Math.max(0, ...wins.map((w) => w.z));
  return <>{wins.map((w) => <ToolWindow key={w.id} w={w} top={w.z === topZ} />)}</>;
}
