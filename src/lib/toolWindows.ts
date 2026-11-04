/**
 * Schwebende Werkzeug-Fenster: welche offen sind und wo sie liegen.
 * Lage und offene Fenster merkt sich der Browser (nur Komfort, kein Lernstand).
 */
import { useSyncExternalStore } from 'react';

export type ToolId = 'calc' | 'subnet' | 'masks' | 'binary' | 'vlsm' | 'ipv6' | 'units' | 'ports' | 'note';

export const TOOL_META: { id: ToolId; label: string; icon: string; width: number }[] = [
  { id: 'calc', label: 'Taschenrechner', icon: 'Calculator', width: 320 },
  { id: 'subnet', label: 'Subnetzrechner', icon: 'Network', width: 620 },
  { id: 'masks', label: 'Masken-Tabelle', icon: 'Table', width: 620 },
  { id: 'binary', label: 'Binär / Hex / Dez', icon: 'Binary', width: 560 },
  { id: 'vlsm', label: 'VLSM-Planer', icon: 'LayoutGrid', width: 680 },
  { id: 'ipv6', label: 'IPv6', icon: 'Globe', width: 600 },
  { id: 'units', label: 'Übertragung & Einheiten', icon: 'Gauge', width: 600 },
  { id: 'ports', label: 'Ports & Protokolle', icon: 'Plug', width: 600 },
  { id: 'note', label: 'Gesamtnote FISI', icon: 'GraduationCap', width: 560 },
];

export interface ToolWin { id: ToolId; x: number; y: number; z: number }

const KEY = 'fisi.toolWindows';
let wins: ToolWin[] = load();
const listeners = new Set<() => void>();

function load(): ToolWin[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    return Array.isArray(v) ? v.filter((w) => TOOL_META.some((m) => m.id === w.id)) : [];
  } catch {
    return [];
  }
}

function set(next: ToolWin[]) {
  wins = next;
  try { localStorage.setItem(KEY, JSON.stringify(wins)); } catch { /* privater Modus: nur ohne Merken */ }
  listeners.forEach((l) => l());
}

const topZ = () => Math.max(0, ...wins.map((w) => w.z));

export function openTool(id: ToolId) {
  const w = wins.find((x) => x.id === id);
  if (w) return focusTool(id);
  const meta = TOOL_META.find((m) => m.id === id)!;
  const n = wins.length;
  const x = Math.max(8, Math.min(window.innerWidth - meta.width - 24, window.innerWidth - meta.width - 40 - n * 28));
  set([...wins, { id, x, y: 72 + n * 28, z: topZ() + 1 }]);
}

export function closeTool(id: ToolId) {
  set(wins.filter((w) => w.id !== id));
}

export function focusTool(id: ToolId) {
  const w = wins.find((x) => x.id === id);
  if (!w || w.z === topZ()) return;
  set(wins.map((x) => (x.id === id ? { ...x, z: topZ() + 1 } : x)));
}

export function moveTool(id: ToolId, x: number, y: number) {
  set(wins.map((w) => (w.id === id ? { ...w, x, y } : w)));
}

export function useToolWindows(): ToolWin[] {
  return useSyncExternalStore(
    (l) => { listeners.add(l); return () => listeners.delete(l); },
    () => wins,
  );
}
