/**
 * Deterministische Bewertung aller Fragetypen.
 * Ergebnis enthält Fehlerkategorien (errorTags), die das Lernmodell auswertet.
 */
import type { Question, TableQuestion } from '../content/types';
import { normalizeIpInput, parseCidr, parseIpSafe, parsePrefixInput } from './ipv4';
import { ipv6Equal, parseIpv6 } from './ipv6';
import { validateVlsm, type VlsmEntryInput } from './vlsm';

export type ResponseValue =
  | number // single
  | number[] // multi, match, order
  | string // number/text/ip/cidr/free
  | Record<string, string>[] // table rows
  | Record<string, VlsmEntryInput> // vlsm
  | { selfScore: number; text: string } // free nach Selbst-/KI-Bewertung
  | null;

export interface GradeResult {
  correct: boolean;
  /** 0..1 – Teilpunkte */
  score: number;
  /** kurze Rückmeldung (Markdown) */
  feedback: string;
  /** erkannte Fehlerkategorien */
  errorTags: string[];
  /** Detailinfos für die Anzeige (z. B. Tabellenzellen, VLSM-Einträge) */
  details?: unknown;
  /** Freitext: braucht noch Selbst- oder KI-Bewertung */
  pending?: boolean;
  /** lesbare Darstellung der korrekten Lösung */
  solution: string;
}

const norm = (s: string) =>
  s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[„“"']/g, '');

/** Zahl aus deutscher oder englischer Schreibweise ("1.024,5" / "1024.5" / "1 024"). */
export function parseNumberInput(s: string): number | null {
  let t = s.trim().replace(/\s/g, '');
  if (!t) return null;
  // Einheit am Ende entfernen
  t = t.replace(/[a-zA-Zäöü/%]+$/, '');
  if (/^-?\d{1,3}(\.\d{3})+(,\d+)?$/.test(t)) t = t.replace(/\./g, '').replace(',', '.');
  else if (/^-?\d+,\d+$/.test(t)) t = t.replace(',', '.');
  if (!/^-?\d+(\.\d+)?(e-?\d+)?$/i.test(t)) return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}

/**
 * Alle sinnvollen Lesarten einer Zahleneingabe. "1.819" kann deutsch 1819 oder englisch 1,819 bedeuten –
 * beide werden geprüft, damit korrekte Antworten nie an der Schreibweise scheitern.
 */
export function parseNumberCandidates(s: string): number[] {
  const out = new Set<number>();
  const a = parseNumberInput(s);
  if (a !== null) out.add(a);
  const t = s.trim().replace(/\s/g, '').replace(/[a-zA-Zäöü/%€]+$/, '');
  if (/^-?\d+\.\d+$/.test(t)) out.add(Number(t));
  return [...out];
}

function findMisconception(q: Question, given: string, cell?: string) {
  if (!q.misconceptions) return undefined;
  const g = norm(given);
  return q.misconceptions.find((m) => (m.cell ?? undefined) === cell && norm(m.answer) === g);
}

function cellMatches(type: string, expected: string, accept: string[] | undefined, given: string): boolean {
  const g = given.trim();
  if (!g) return false;
  const all = [expected, ...(accept ?? [])].filter(Boolean);
  switch (type) {
    case 'ip':
    case 'mask': {
      const v = parseIpSafe(g);
      if (v === null && type === 'mask') {
        const p = parsePrefixInput(g);
        return p !== null && all.some((e) => parsePrefixInput(e) === p);
      }
      return v !== null && all.some((e) => parseIpSafe(e) === v);
    }
    case 'cidr':
      return all.some((e) => cidrEqual(e, g));
    case 'number': {
      const ns = parseNumberCandidates(g);
      return ns.length > 0 && all.some((e) => ns.includes(parseNumberInput(e) ?? NaN));
    }
    default:
      return all.some((e) => norm(e) === norm(g) || (parseIpv6(e) && ipv6Equal(e, g)));
  }
}

function cidrEqual(expected: string, given: string): boolean {
  const e = normalizeIpInput(expected);
  const g = normalizeIpInput(given);
  if (e.includes('.') && e.includes('/')) {
    const a = parseCidr(e);
    const b = parseCidr(g);
    return !!a && !!b && a.ip === b.ip && a.prefix === b.prefix;
  }
  const pe = parsePrefixInput(e);
  const pg = parsePrefixInput(g);
  return pe !== null && pe === pg;
}

export function describeSolution(q: Question): string {
  switch (q.kind) {
    case 'single':
      return q.options[q.answer];
    case 'multi':
      return q.answer.map((i) => q.options[i]).join(', ');
    case 'number':
      return `${q.answer.toLocaleString('de-DE')}${q.unit ? ' ' + q.unit : ''}`;
    case 'text':
      return q.accept[0];
    case 'ip':
      return q.answer;
    case 'cidr':
      return q.answer;
    case 'free':
      return q.modelAnswer;
    case 'match':
      return q.left.map((l, i) => `${l} → ${q.right[q.answer[i]]}`).join('; ');
    case 'order':
      return q.items.map((x, i) => `${i + 1}. ${x}`).join('  ');
    case 'table':
      return 'siehe Tabelle';
    case 'vlsm':
      return 'siehe Musterlösung (alternative korrekte Pläne werden akzeptiert)';
  }
}

export function grade(q: Question, response: ResponseValue): GradeResult {
  const solution = describeSolution(q);
  const base = { solution };
  switch (q.kind) {
    case 'single': {
      if (typeof response !== 'number') return { ...base, correct: false, score: 0, feedback: 'Keine Antwort ausgewählt.', errorTags: ['keine-antwort'] };
      if (response === q.answer) return { ...base, correct: true, score: 1, feedback: 'Richtig!', errorTags: [] };
      const d = q.distractors?.[String(response)];
      return {
        ...base,
        correct: false,
        score: 0,
        feedback: d?.why ?? `Nicht richtig. Korrekt ist: **${q.options[q.answer]}**.`,
        errorTags: [d?.error ?? `${q.skill}:falsch`],
      };
    }
    case 'multi': {
      const sel = new Set(Array.isArray(response) ? (response as number[]) : []);
      const ans = new Set(q.answer);
      let hits = 0;
      let wrong = 0;
      for (let i = 0; i < q.options.length; i++) {
        if (sel.has(i) && ans.has(i)) hits++;
        else if (sel.has(i) && !ans.has(i)) wrong++;
      }
      const correct = hits === ans.size && wrong === 0;
      const score = Math.max(0, (hits - wrong) / ans.size);
      const missed = q.answer.filter((i) => !sel.has(i)).map((i) => q.options[i]);
      const extra = [...sel].filter((i) => !ans.has(i)).map((i) => q.options[i]);
      let feedback = correct ? 'Alles richtig!' : '';
      if (!correct) {
        if (missed.length) feedback += `Nicht gewählt, obwohl richtig: ${missed.map((m) => `**${m}**`).join(', ')}. `;
        if (extra.length) feedback += `Fälschlich gewählt: ${extra.map((m) => `**${m}**`).join(', ')}.`;
      }
      return { ...base, correct, score, feedback, errorTags: correct ? [] : [`${q.skill}:unvollstaendig`] };
    }
    case 'number': {
      const cands = typeof response === 'string' ? parseNumberCandidates(response) : [];
      if (!cands.length) return { ...base, correct: false, score: 0, feedback: 'Bitte eine Zahl eingeben.', errorTags: ['eingabeformat'] };
      const tol = q.tolerance ?? 0;
      if (cands.some((c) => [q.answer, ...(q.accept ?? [])].some((a) => Math.abs(c - a) <= tol + 1e-9))) return { ...base, correct: true, score: 1, feedback: 'Richtig!', errorTags: [] };
      const n = cands[0];
      const mc = findMisconception(q, String(n)) ?? findMisconception(q, response as string);
      return {
        ...base,
        correct: false,
        score: 0,
        feedback: mc?.why ?? `Nicht richtig. Erwartet: **${solution}**.`,
        errorTags: [mc?.error ?? `${q.skill}:falsch`],
      };
    }
    case 'text': {
      const s = typeof response === 'string' ? response : '';
      const ok = q.accept.some((a) => norm(a) === norm(s));
      if (ok) return { ...base, correct: true, score: 1, feedback: 'Richtig!', errorTags: [] };
      const mc = findMisconception(q, s);
      return {
        ...base,
        correct: false,
        score: 0,
        feedback: mc?.why ?? `Nicht richtig. Erwartet: **${solution}**.`,
        errorTags: [mc?.error ?? `${q.skill}:falsch`],
      };
    }
    case 'ip': {
      const s = typeof response === 'string' ? response : '';
      const v = parseIpSafe(s);
      if (v === null) return { ...base, correct: false, score: 0, feedback: `„${s}“ ist keine gültige IPv4-Adresse (Format a.b.c.d, jedes Oktett 0–255).`, errorTags: ['eingabeformat'] };
      if (v === parseIpSafe(q.answer)) return { ...base, correct: true, score: 1, feedback: 'Richtig!', errorTags: [] };
      const mc = findMisconception(q, s);
      return { ...base, correct: false, score: 0, feedback: mc?.why ?? `Nicht richtig. Korrekt ist **${q.answer}**.`, errorTags: [mc?.error ?? `${q.skill}:falsch`] };
    }
    case 'cidr': {
      const s = typeof response === 'string' ? response : '';
      if (cidrEqual(q.answer, s)) return { ...base, correct: true, score: 1, feedback: 'Richtig!', errorTags: [] };
      const mc = findMisconception(q, s) ?? findMisconception(q, '/' + (parsePrefixInput(s) ?? ''));
      return { ...base, correct: false, score: 0, feedback: mc?.why ?? `Nicht richtig. Korrekt ist **${q.answer}**.`, errorTags: [mc?.error ?? `${q.skill}:falsch`] };
    }
    case 'free': {
      if (response && typeof response === 'object' && 'selfScore' in response) {
        const sc = Math.max(0, Math.min(1, Number((response as { selfScore: number }).selfScore)));
        return {
          ...base,
          correct: sc >= 0.75,
          score: sc,
          feedback: sc >= 0.75 ? 'Als richtig bewertet.' : sc > 0 ? 'Teilweise richtig bewertet.' : 'Als falsch bewertet.',
          errorTags: sc >= 0.75 ? [] : [`${q.skill}:freitext`],
        };
      }
      return {
        ...base,
        correct: false,
        score: 0,
        pending: true,
        feedback: 'Freitext – vergleiche mit der Musterlösung (oder lass den KI-Tutor bewerten).',
        errorTags: [],
      };
    }
    case 'match': {
      const r = Array.isArray(response) ? (response as number[]) : [];
      let hits = 0;
      const wrong: string[] = [];
      q.left.forEach((l, i) => {
        if (r[i] === q.answer[i]) hits++;
        else wrong.push(`${l} → richtig wäre **${q.right[q.answer[i]]}**`);
      });
      const correct = hits === q.left.length;
      return {
        ...base,
        correct,
        score: hits / q.left.length,
        feedback: correct ? 'Alle Zuordnungen richtig!' : `${hits}/${q.left.length} richtig. ${wrong.join('; ')}`,
        errorTags: correct ? [] : [`${q.skill}:zuordnung`],
        details: q.left.map((_, i) => r[i] === q.answer[i]),
      };
    }
    case 'order': {
      // response: Indizes der Original-Items in der vom Nutzer gewählten Reihenfolge
      const r = Array.isArray(response) ? (response as number[]) : [];
      const correctPos = q.items.map((_, i) => r[i] === i);
      const hits = correctPos.filter(Boolean).length;
      const correct = hits === q.items.length;
      return {
        ...base,
        correct,
        score: hits / q.items.length,
        feedback: correct ? 'Reihenfolge stimmt!' : `${hits}/${q.items.length} Positionen richtig.`,
        errorTags: correct ? [] : [`${q.skill}:reihenfolge`],
        details: correctPos,
      };
    }
    case 'table':
      return gradeTable(q, response as Record<string, string>[] | null);
    case 'vlsm': {
      const v = validateVlsm(q.base, q.demands, (response as Record<string, VlsmEntryInput>) ?? {}, {
        wanPrefix: q.wanPrefix,
        requireOrdered: q.requireOrdered,
      });
      const tags = new Set<string>();
      for (const e of v.entries) for (const i of e.issues) if (i.severity === 'error') tags.add(`vlsm-${i.code}`);
      return {
        ...base,
        correct: v.ok,
        score: v.score,
        feedback: v.ok ? 'Der Adressplan ist vollständig korrekt und konsistent!' : `${Math.round(v.score * 100)} % der Netze korrekt geplant.`,
        errorTags: [...tags],
        details: v,
      };
    }
  }
}

function gradeTable(q: TableQuestion, rows: Record<string, string>[] | null): GradeResult {
  let total = 0;
  let hits = 0;
  const tags = new Set<string>();
  const notes: string[] = [];
  const cellResults: Record<string, boolean>[] = q.rows.map((row, ri) => {
    const res: Record<string, boolean> = {};
    for (const col of q.columns) {
      const cell = row.cells[col.key];
      if (!cell || cell.given !== undefined || cell.answer === undefined) continue;
      total++;
      const given = rows?.[ri]?.[col.key] ?? '';
      const ok = cellMatches(col.type, cell.answer, cell.accept, given);
      res[col.key] = ok;
      if (ok) hits++;
      else {
        const mc = findMisconception(q, given, `${ri}:${col.key}`) ?? findMisconception(q, given, col.key);
        if (mc) {
          tags.add(mc.error);
          notes.push(`${row.label ?? `Zeile ${ri + 1}`} · ${col.label}: ${mc.why}`);
        } else tags.add(`${q.skill}:${col.key}`);
      }
    }
    return res;
  });
  const correct = total > 0 && hits === total;
  return {
    correct,
    score: total ? hits / total : 0,
    feedback: correct ? 'Alle Felder richtig!' : `${hits}/${total} Felder richtig.${notes.length ? '\n\n' + notes.map((n) => '- ' + n).join('\n') : ''}`,
    errorTags: correct ? [] : [...tags],
    details: cellResults,
    solution: 'siehe Tabelle',
  };
}
