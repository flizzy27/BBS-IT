import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import * as Icons from 'lucide-react';
import type { Relevance } from '../content/types';

export function Md({ children, className = '' }: { children: string; className?: string }) {
  return (
    <div className={`md ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}

export function Icon({ name, size = 18, className }: { name: string; size?: number; className?: string }) {
  const C = (Icons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[name] ?? Icons.Circle;
  return <C size={size} className={className} />;
}

export function RelevanceBadge({ r }: { r: Relevance }) {
  if (r === 'ap1') return <span className="badge ap1" title="Direkt prüfungsrelevant für die AP1">AP1</span>;
  if (r === 'ap1-teilweise') return <span className="badge teil" title="Grundlagenwissen, das in AP1-Aufgaben vorausgesetzt oder gestreift wird">AP1 teilweise</span>;
  return <span className="badge vert" title="Weiterführendes FISI-Wissen (AP2/Praxis)">Vertiefung</span>;
}

export function Progress({ value, ok }: { value: number; ok?: boolean }) {
  return (
    <div className={`progress ${ok ? 'ok' : ''}`}>
      <div style={{ width: `${Math.round(Math.max(0, Math.min(1, value)) * 100)}%` }} />
    </div>
  );
}

export function Ring({ value, size = 132, label, sub }: { value: number; size?: number; label: string; sub?: string }) {
  const r = (size - 14) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id="ringgrad" x1="0" x2="1">
            <stop offset="0" stopColor="var(--accent)" />
            <stop offset="1" stopColor="var(--sub)" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--surface-3)" strokeWidth="11" fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke="url(#ringgrad)" strokeWidth="11" fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - Math.max(0, Math.min(1, value)))} style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
      </svg>
      <div className="center">
        <div>
          <div style={{ fontSize: size > 110 ? '1.8rem' : '1.2rem', fontWeight: 700 }}>{label}</div>
          {sub && <div className="tiny dim">{sub}</div>}
        </div>
      </div>
    </div>
  );
}

export function Empty({ icon = 'Inbox', children }: { icon?: string; children: React.ReactNode }) {
  return (
    <div className="empty">
      <Icon name={icon} size={30} />
      <div className="mt">{children}</div>
    </div>
  );
}

export function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export function fmtDuration(sec: number): string {
  if (sec < 60) return `${Math.round(sec)} s`;
  const m = Math.round(sec / 60);
  if (m < 60) return `${m} min`;
  return `${Math.floor(m / 60)} h ${m % 60} min`;
}

export function fmtDate(ts: number): string {
  return new Date(ts).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
}

/** Einfaches Liniendiagramm (SVG). */
export function LineChart({ points, height = 160, max = 100, unit = '%' }: { points: { label: string; value: number }[]; height?: number; max?: number; unit?: string }) {
  if (points.length === 0) return <Empty icon="LineChart">Noch keine Daten.</Empty>;
  const w = 600;
  const pad = 30;
  const xs = (i: number) => pad + (points.length === 1 ? (w - 2 * pad) / 2 : (i * (w - 2 * pad)) / (points.length - 1));
  const ys = (v: number) => height - 22 - (v / max) * (height - 40);
  const d = points.map((p, i) => `${i ? 'L' : 'M'}${xs(i)},${ys(p.value)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${height}`} style={{ width: '100%', height }}>
      {[0, 0.5, 1].map((f) => (
        <g key={f}>
          <line x1={pad} x2={w - pad} y1={ys(max * f)} y2={ys(max * f)} stroke="var(--border)" strokeDasharray="3 4" />
          <text x={4} y={ys(max * f) + 4} fontSize="10" fill="var(--text-3)">{Math.round(max * f)}{unit}</text>
        </g>
      ))}
      <path d={`${d} L${xs(points.length - 1)},${height - 22} L${xs(0)},${height - 22} Z`} fill="var(--accent-soft)" />
      <path d={d} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round" />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={xs(i)} cy={ys(p.value)} r="4" fill="var(--surface)" stroke="var(--accent)" strokeWidth="2">
            <title>{`${p.label}: ${Math.round(p.value)}${unit}`}</title>
          </circle>
          {(points.length < 12 || i % Math.ceil(points.length / 10) === 0) && (
            <text x={xs(i)} y={height - 6} fontSize="10" textAnchor="middle" fill="var(--text-3)">{p.label}</text>
          )}
        </g>
      ))}
    </svg>
  );
}

/** Balkendiagramm. */
export function BarChart({ bars, height = 150, unit = '' }: { bars: { label: string; value: number; color?: string }[]; height?: number; unit?: string }) {
  const max = Math.max(1, ...bars.map((b) => b.value));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height }}>
      {bars.map((b, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }} title={`${b.label}: ${b.value}${unit}`}>
          <div style={{ width: '100%', maxWidth: 34, height: `${(b.value / max) * (height - 24)}px`, minHeight: b.value ? 3 : 0, background: b.color ?? 'linear-gradient(180deg, var(--accent), var(--sub))', borderRadius: 6, transition: 'height 0.5s' }} />
          <span className="tiny dim">{b.label}</span>
        </div>
      ))}
    </div>
  );
}

export function Toast({ msg }: { msg: string | null }) {
  return msg ? <div className="toast">{msg}</div> : null;
}
