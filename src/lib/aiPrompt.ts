/**
 * Erzeugt Prompts zum Kopieren in eine beliebige KI (ChatGPT, Claude, Gemini, Copilot …).
 * Die exakt berechnete Lösung wird mitgegeben, damit die KI nicht selbst (falsch) rechnet.
 */
import type { Question } from '../content/types';
import type { GradeResult } from '../core/grading';
import { describeSolution } from '../core/grading';
import { errorInfo } from '../core/errors';
import { skillTitle, moduleOfSkill } from '../content';

export type PromptKind = 'erklaeren' | 'tipp' | 'fehler' | 'aehnlich' | 'abschnitt';

const ROLE = `Du bist ein geduldiger, fachlich sehr genauer IT-Ausbilder. Ich mache eine Ausbildung zum Fachinformatiker für Systemintegration (FISI) und bereite mich auf die IHK-Abschlussprüfung vor (AP1 „Einrichten eines IT-gestützten Arbeitsplatzes“, nur offene Aufgaben). Antworte auf Deutsch, duze mich, erkläre von Grund auf und verständlich, mit Beispielen aus einem Firmennetz/Firmenalltag. Nutze Tabellen und nummerierte Schritte, wo es hilft.`;

function questionText(q: Question): string {
  const lines: string[] = [q.prompt];
  if (q.kind === 'single' || q.kind === 'multi') lines.push('\nAntwortmöglichkeiten:\n' + q.options.map((o, i) => `${String.fromCharCode(65 + i)}) ${o}`).join('\n'));
  if (q.kind === 'match') lines.push(`\nZuordnen – links: ${q.left.join(' | ')}\nrechts: ${q.right.join(' | ')}`);
  if (q.kind === 'order') lines.push(`\nIn die richtige Reihenfolge bringen: ${[...q.items].sort().join(' | ')}`);
  if (q.kind === 'table') {
    const head = `| ${q.rows.some((r) => r.label) ? ' |' : ''} ${q.columns.map((c) => c.label).join(' | ')} |`;
    const sep = `|${q.rows.some((r) => r.label) ? '---|' : ''}${q.columns.map(() => '---').join('|')}|`;
    const rows = q.rows.map((r) => `| ${r.label ? r.label + ' |' : ''} ${q.columns.map((c) => r.cells[c.key]?.given ?? (r.cells[c.key]?.answer !== undefined ? '?' : '')).join(' | ')} |`);
    lines.push('\nTabelle (? = auszufüllen):\n' + [head, sep, ...rows].join('\n'));
  }
  if (q.kind === 'vlsm') lines.push(`\nAusgangsnetz ${q.base}; Bedarf: ${q.demands.map((d) => `${d.name}: ${d.kind === 'wan' ? `WAN /${q.wanPrefix}` : d.hosts + ' Hosts'}`).join('; ')}`);
  return lines.join('\n');
}

function responseText(q: Question, r: unknown): string {
  if (r === null || r === undefined || r === '') return '(keine Antwort)';
  if ((q.kind === 'single') && typeof r === 'number') return `${String.fromCharCode(65 + r)}) ${q.options[r]}`;
  if (q.kind === 'multi' && Array.isArray(r)) return (r as number[]).map((i) => q.options[i]).join(', ');
  if (q.kind === 'match' && Array.isArray(r)) return q.left.map((l, i) => `${l} → ${q.right[(r as number[])[i]] ?? '?'}`).join('; ');
  if (q.kind === 'order' && Array.isArray(r)) return (r as number[]).map((i) => q.items[i]).join(' → ');
  if (typeof r === 'object' && r && 'text' in (r as object)) return String((r as { text: string }).text);
  return typeof r === 'string' ? r : JSON.stringify(r);
}

function solutionText(q: Question): string {
  if (q.kind === 'table') return q.rows.map((r) => `${r.label ?? ''}: ${q.columns.map((c) => `${c.label} = ${r.cells[c.key]?.answer ?? r.cells[c.key]?.given ?? '–'}`).join(', ')}`).join('\n');
  return describeSolution(q);
}

export function buildPrompt(kind: PromptKind, q: Question, opts: { response?: unknown; result?: GradeResult | null } = {}): string {
  const topic = `${moduleOfSkill(q.skill)?.title ?? ''} – ${skillTitle(q.skill)}`;
  const parts: string[] = [ROLE, '', `**Thema:** ${topic}`, '', '**Aufgabe:**', questionText(q)];
  const answered = !!opts.result && !opts.result.pending;
  if (kind === 'tipp') {
    parts.push('', 'Ich arbeite gerade an dieser Aufgabe. **Verrate mir bitte NICHT die Lösung.** Gib mir einen kleinen Denkanstoß oder eine Gegenfrage, die mich auf den richtigen Weg bringt. Wenn mir Grundlagen fehlen, erkläre zuerst diese kurz.');
    if (opts.response !== undefined && opts.response !== null && opts.response !== '') parts.push(`Mein bisheriger Ansatz: ${responseText(q, opts.response)}`);
    return parts.join('\n');
  }
  parts.push('', `**Korrekte Lösung (von der Lern-App exakt berechnet – bitte nicht anzweifeln, sondern erklären):**`, solutionText(q));
  parts.push('', '**Musterlösungsweg der App:**', q.explanation);
  if (answered || opts.response !== undefined) {
    parts.push('', `**Meine Antwort:** ${responseText(q, opts.response)}`);
    if (opts.result) parts.push(`**Bewertung der App:** ${opts.result.correct ? 'richtig' : opts.result.score > 0 ? `teilweise richtig (${Math.round(opts.result.score * 100)} %)` : 'falsch'}`);
    const errs = opts.result?.errorTags.filter((t) => t !== 'eingabeformat') ?? [];
    if (errs.length) parts.push(`**Erkannter Denkfehler:** ${errs.map((t) => errorInfo(t).title).join(', ')}`);
  }
  if (kind === 'fehler') {
    parts.push('', 'Bitte:', '1. Analysiere, **welchen Denkfehler** ich wahrscheinlich gemacht habe und warum er naheliegt.', '2. Erkläre die dahinterliegende Grundlage noch einmal von Grund auf – anders als im Lösungsweg oben.', '3. Rechne/erkläre den richtigen Lösungsweg Schritt für Schritt.', '4. Stelle mir am Ende **eine ähnliche Übungsaufgabe** (ohne Lösung) und warte auf meine Antwort.');
  } else if (kind === 'aehnlich') {
    parts.push('', 'Erstelle mir bitte **5 ähnliche Übungsaufgaben** in IHK-Prüfungsstil (offene Aufgaben, steigende Schwierigkeit). Zeige die Lösungen erst, wenn ich dich darum bitte oder meine Antworten schicke. Prüfe Rechnungen sorgfältig.');
  } else {
    parts.push('', 'Bitte erkläre mir diese Aufgabe ausführlich:', '1. Welche Grundlagen braucht man dafür? (kurz und verständlich)', '2. Den Lösungsweg Schritt für Schritt – warum ist jeder Schritt so?', '3. Typische Fehler in der Prüfung und wie ich sie vermeide.', '4. Zum Schluss eine kurze Verständnisfrage an mich.');
  }
  return parts.join('\n');
}

export function buildSectionPrompt(title: string, content: string, lessonTitle: string): string {
  return [
    ROLE,
    '',
    `Ich lerne gerade die Lektion „${lessonTitle}“, Abschnitt „${title}“. Hier der Text aus meiner Lern-App:`,
    '',
    '"""',
    content.slice(0, 6000),
    '"""',
    '',
    'Bitte erkläre mir diesen Abschnitt noch einmal **anders und einfacher**: mit einer Alltagsanalogie, einem konkreten Beispiel und – wenn sinnvoll – einer kleinen Rechnung. Prüfe danach mit 2 kurzen Fragen, ob ich es verstanden habe, und warte auf meine Antworten.',
  ].join('\n');
}

/** Links, mit denen der Prompt direkt in einer KI geöffnet werden kann (Prompt steht dann im Eingabefeld). */
export const AI_TARGETS = [
  { id: 'chatgpt', label: 'ChatGPT', url: (p: string) => `https://chatgpt.com/?q=${encodeURIComponent(p)}` },
  { id: 'claude', label: 'Claude', url: (p: string) => `https://claude.ai/new?q=${encodeURIComponent(p)}` },
  { id: 'gemini', label: 'Gemini', url: () => 'https://gemini.google.com/app' },
  { id: 'copilot', label: 'Copilot', url: () => 'https://copilot.microsoft.com/' },
];
