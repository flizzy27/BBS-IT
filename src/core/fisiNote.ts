/**
 * Gesamtergebnis der Abschlussprüfung Fachinformatiker/-in Systemintegration nach FIAusbV § 24, § 20 Abs. 4, § 25.
 * Alle Werte in Punkten 0–100.
 */
export interface FisiInput {
  ap1: number; // Einrichten eines IT-gestützten Arbeitsplatzes (Teil 1)
  projektarbeit: number; // Projektdokumentation
  praesentation: number; // Präsentation + Fachgespräch
  ka: number; // Konzeption und Administration von IT-Systemen
  nw: number; // Analyse und Entwicklung von Netzwerken
  wiso: number; // Wirtschafts- und Sozialkunde
}

export interface FisiResult {
  projekt: number;
  teil2: number;
  gesamt: number;
  bestanden: boolean;
  gruende: string[];
  /** Bereiche, in denen eine mündliche Ergänzungsprüfung (§ 25) möglich und sinnvoll wäre */
  ergaenzung: ('ka' | 'nw' | 'wiso')[];
}

const r1 = (x: number) => Math.round(x * 10) / 10;

export function fisiResult(i: FisiInput): FisiResult {
  const projekt = (i.projektarbeit + i.praesentation) / 2; // § 20 Abs. 4: je 50 %
  const teil2 = (0.5 * projekt + 0.1 * i.ka + 0.1 * i.nw + 0.1 * i.wiso) / 0.8;
  const gesamt = 0.2 * i.ap1 + 0.8 * teil2;
  const bereiche = [projekt, i.ka, i.nw, i.wiso];
  const gruende: string[] = [];
  if (Math.round(gesamt) < 50) gruende.push('Gesamtergebnis unter 50 Punkten');
  if (Math.round(teil2) < 50) gruende.push('Ergebnis von Teil 2 unter 50 Punkten');
  if (bereiche.filter((b) => Math.round(b) >= 50).length < 3) gruende.push('weniger als drei Prüfungsbereiche von Teil 2 mit mindestens 50 Punkten');
  if (bereiche.some((b) => Math.round(b) < 30)) gruende.push('ein Prüfungsbereich von Teil 2 ist „ungenügend“ (unter 30 Punkten)');
  const bestanden = gruende.length === 0;
  // Ergänzungsprüfung: nur ka/nw/wiso, Bereich unter 50, und ein Bestehen muss dadurch möglich sein (Verrechnung 2:1)
  const ergaenzung = !bestanden
    ? (['ka', 'nw', 'wiso'] as const).filter((k) => {
        if (Math.round(i[k]) >= 50) return false;
        const best = (2 * i[k] + 100) / 3;
        return fisiResult({ ...i, [k]: best }).bestanden;
      })
    : [];
  return { projekt: r1(projekt), teil2: r1(teil2), gesamt: r1(gesamt), bestanden, gruende, ergaenzung };
}
