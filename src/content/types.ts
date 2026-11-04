/**
 * Datenmodell für Lerninhalte (Module, Lektionen, Fragen).
 *
 * Inhalte sind reine Daten (serialisierbar). Die Bewertung erfolgt deterministisch
 * in src/core/grading.ts – die KI entscheidet nie allein über Richtigkeit.
 */

/** AP1-Relevanz eines Inhalts. */
export type Relevance =
  | 'ap1' // direkt prüfungsrelevant in AP1
  | 'ap1-teilweise' // Grundlagenwissen, das in AP1-Aufgaben vorausgesetzt / gestreift wird
  | 'vertiefung'; // sinnvolle FISI-Inhalte (AP2/Praxis), für AP1 nicht zwingend

/** Schwierigkeit: 1 = Einstieg, 2 = Standard/Prüfungsniveau, 3 = anspruchsvoll. */
export type Difficulty = 1 | 2 | 3;

export interface Skill {
  /** global eindeutig, z. B. "subnet.broadcast" oder "osi.layers" */
  id: string;
  /** Modul-ID, zu dem der Skill gehört, z. B. "m05" */
  module: string;
  /** kurzer deutscher Titel, z. B. "Broadcastadresse berechnen" */
  title: string;
  /** Skills, die vorher sitzen sollten (für Grundlagen-Rückverweise) */
  requires?: string[];
}

export interface Module {
  id: string; // "m01" … "m17"
  nr: number;
  title: string;
  /** 1 Satz Kurzbeschreibung */
  short: string;
  /** Name eines lucide-react Icons, z. B. "Network", "Layers", "Binary", "Router" */
  icon: string;
  relevance: Relevance;
  /** Modul-IDs, die vorher bearbeitet werden sollten */
  prerequisites: string[];
  skills: Skill[];
  lessons: Lesson[];
  /** Fragenpool für Üben / Tests (zusätzlich zu Generatoren) */
  questions: Question[];
  /** IDs algorithmischer Aufgaben-Generatoren (src/core/generators), die zu diesem Modul gehören */
  generators?: string[];
}

export interface Lesson {
  id: string; // z. B. "m05-l03"
  title: string;
  /** geschätzte Dauer in Minuten */
  minutes: number;
  relevance: Relevance;
  /** Skills, die diese Lektion vermittelt */
  skills: string[];
  steps: LessonStep[];
}

/**
 * Schritte einer Lerneinheit. Ablauf: Erklären → Visualisieren → Beispiel → Verständnisfrage
 * → Übung → Zusammenfassung. Texte sind Markdown (GFM, Tabellen erlaubt). Inline-Code mit `…`.
 */
export type LessonStep =
  | { type: 'explain'; title: string; body: string }
  | {
      type: 'visual';
      title: string;
      widget: WidgetSpec;
      /** Erklärung unter der Grafik (Markdown) */
      caption?: string;
    }
  | {
      type: 'example';
      title: string;
      /** Aufgabenstellung (Markdown) */
      problem: string;
      /** vollständig durchgerechneter Lösungsweg */
      steps: { label: string; body: string }[];
      result: string;
    }
  | { type: 'check'; question: Question }
  | {
      type: 'practice';
      title: string;
      /** Generator-ID (algorithmisch) – ODER – questionIds aus dem Modulpool */
      generator?: string;
      questionIds?: string[];
      count: number;
      difficulty: Difficulty;
    }
  | { type: 'summary'; points: string[] };

/** Visualisierungen – generische Widgets, die mit Daten gefüttert werden. */
export type WidgetSpec =
  | { kind: 'topology'; data: TopologyData }
  | { kind: 'sequence'; data: SequenceData }
  | { kind: 'layers'; data: { mode: 'osi' | 'tcpip' | 'compare'; highlight?: number[]; showPdu?: boolean; showProtocols?: boolean } }
  | { kind: 'encapsulation'; data?: Record<string, never> }
  | { kind: 'subnet-bar'; data: { network: string; prefix: number; minPrefix?: number; maxPrefix?: number; locked?: boolean } }
  | { kind: 'ip-binary'; data: { ip: string; prefix?: number; editable?: boolean } }
  | { kind: 'binary-octet'; data: { value: number; editable?: boolean } }
  | { kind: 'vlsm-boxes'; data: { network: string; prefix: number; demands?: { name: string; hosts: number }[] } }
  | { kind: 'ipv6-compress'; data: { address: string } }
  | { kind: 'mac-table'; data?: Record<string, never> }
  | { kind: 'cards'; data: { items: { title: string; text: string; icon?: string }[]; columns?: 2 | 3 | 4 } };

export type NodeType =
  | 'pc' | 'laptop' | 'server' | 'switch' | 'router' | 'firewall' | 'ap' | 'cloud'
  | 'modem' | 'phone' | 'printer' | 'nas' | 'internet';

export interface TopologyData {
  /** Zeichenfläche: Koordinaten im Bereich 0..800 (x) und 0..420 (y) */
  nodes: { id: string; type: NodeType; label: string; sub?: string; x: number; y: number }[];
  links: {
    from: string;
    to: string;
    label?: string;
    style?: 'lan' | 'wan' | 'wifi' | 'trunk' | 'fiber' | 'vpn';
  }[];
  /** farbige Hintergrundbereiche, z. B. VLANs oder Standorte */
  zones?: { label: string; x: number; y: number; w: number; h: number; color?: 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'gray' }[];
}

export interface SequenceData {
  actors: string[];
  /** from/to = Index in actors */
  messages: { from: number; to: number; label: string; note?: string }[];
}

/* ------------------------------------------------------------------ */
/* Fragen                                                              */
/* ------------------------------------------------------------------ */

interface QuestionBase {
  /** global eindeutig, z. B. "m02-q07" */
  id: string;
  /** Skill-ID, die geprüft wird */
  skill: string;
  difficulty: Difficulty;
  /** Aufgabentext (Markdown) */
  prompt: string;
  /** Begründung / vollständiger Lösungsweg (Markdown) – wird nach der Abgabe gezeigt */
  explanation: string;
  /** optionale gestufte Tipps (Übungsmodus) */
  hints?: string[];
  /** optionale Grafik zur Aufgabe */
  widget?: WidgetSpec;
  /** true = Aufgabe stammt aus einem Generator (wird nicht im Pool gespeichert) */
  generated?: boolean;
  /**
   * Typische Falschantworten (für ip/number/cidr/text/table): Wird genau diese Antwort gegeben,
   * wird die Fehlerursache erkannt und erklärt. Wird von Generatoren automatisch befüllt.
   */
  misconceptions?: { answer: string; error: string; why: string; cell?: string }[];
}

/** Einfachauswahl. distractors: Erklärung + Fehlerkategorie je falscher Option (Index als String-Key). */
export interface SingleChoiceQuestion extends QuestionBase {
  kind: 'single';
  options: string[];
  answer: number;
  distractors?: Record<string, { why: string; error?: string }>;
}

/** Mehrfachauswahl (alle richtigen ankreuzen). */
export interface MultiChoiceQuestion extends QuestionBase {
  kind: 'multi';
  options: string[];
  answer: number[];
}

/** Zahlenfeld. */
export interface NumberQuestion extends QuestionBase {
  kind: 'number';
  answer: number;
  /** absolute Toleranz (Standard 0) */
  tolerance?: number;
  unit?: string;
}

/** Kurze Texteingabe mit exakt prüfbaren Antworten (Groß-/Kleinschreibung & Leerzeichen egal). */
export interface ShortTextQuestion extends QuestionBase {
  kind: 'text';
  accept: string[];
  placeholder?: string;
}

/** IPv4-Adresse als Antwort. */
export interface IpQuestion extends QuestionBase {
  kind: 'ip';
  answer: string;
}

/** CIDR-Präfix (/n) oder Netz in CIDR-Notation als Antwort. */
export interface CidrQuestion extends QuestionBase {
  kind: 'cidr';
  /** "/26" oder "192.168.1.64/26" */
  answer: string;
}

/** Freitext – KI-Bewertung, falls verfügbar, sonst Selbsteinschätzung anhand der Musterlösung. */
export interface FreeTextQuestion extends QuestionBase {
  kind: 'free';
  modelAnswer: string;
  /** Kernbegriffe, die in einer guten Antwort vorkommen sollten (nur Hinweis, keine alleinige Bewertung) */
  keywords?: string[];
}

/** Zuordnung: left[i] gehört zu right[answer[i]]. */
export interface MatchQuestion extends QuestionBase {
  kind: 'match';
  left: string[];
  right: string[];
  answer: number[];
}

/** Reihenfolge: items in KORREKTER Reihenfolge angeben – wird gemischt angezeigt. */
export interface OrderQuestion extends QuestionBase {
  kind: 'order';
  items: string[];
}

/** Tabelle zum Ausfüllen. Zellen mit `given` sind vorgegeben, Zellen mit `answer` auszufüllen. */
export interface TableQuestion extends QuestionBase {
  kind: 'table';
  columns: { key: string; label: string; type: 'ip' | 'number' | 'cidr' | 'text' | 'mask' }[];
  rows: { label?: string; cells: Record<string, { given?: string; answer?: string; accept?: string[] }> }[];
}

/** Vollständige VLSM-Planung (wird vom VLSM-Validator geprüft, alternative Lösungen erlaubt). */
export interface VlsmQuestion extends QuestionBase {
  kind: 'vlsm';
  base: string; // "192.168.10.0/24"
  demands: { id: string; name: string; hosts: number; kind: 'lan' | 'wan' }[];
  /** Konvention für P2P-Netze */
  wanPrefix: 30 | 31;
  /** größte Netze zuerst lückenlos ab Netzanfang vergeben (strenge Prüfungskonvention) */
  requireOrdered?: boolean;
}

export type Question =
  | SingleChoiceQuestion
  | MultiChoiceQuestion
  | NumberQuestion
  | ShortTextQuestion
  | IpQuestion
  | CidrQuestion
  | FreeTextQuestion
  | MatchQuestion
  | OrderQuestion
  | TableQuestion
  | VlsmQuestion;

export type QuestionKind = Question['kind'];
