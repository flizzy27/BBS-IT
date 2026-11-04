/**
 * Aufgaben-Generatoren für den Fachbereich „Betriebssysteme, Software, Cloud & Qualität“ (area: 'systeme').
 * Alle Lösungen werden exakt (ganzzahlig bzw. mit genannter Rundungsregel) berechnet.
 */
import type { Difficulty, Question, TableQuestion } from '../../content/types';
import type { GeneratorMeta } from '../generators';
import { Rng } from '../rng';

let counter = 0;
const gid = (g: string) => `gen:${g}:${Date.now().toString(36)}${(counter++).toString(36)}`;
const fmtN = (n: number, digits = 0) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: digits });

/* ------------------------------------------------------------------ */
/* Linux-Rechte: oktal ↔ symbolisch                                    */
/* ------------------------------------------------------------------ */

const triple = (d: number) => (d & 4 ? 'r' : '-') + (d & 2 ? 'w' : '-') + (d & 1 ? 'x' : '-');
/** Fehlbild: r = 1, x = 4 vertauscht */
const tripleWrong = (d: number) => (d & 1 ? 'r' : '-') + (d & 2 ? 'w' : '-') + (d & 4 ? 'x' : '-');

/** mode = Sonderbits·512 + u·64 + g·8 + o */
export function modeToSymbolic(mode: number): string {
  const sp = (mode >> 9) & 7;
  const s = (triple((mode >> 6) & 7) + triple((mode >> 3) & 7) + triple(mode & 7)).split('');
  if (sp & 4) s[2] = s[2] === 'x' ? 's' : 'S';
  if (sp & 2) s[5] = s[5] === 'x' ? 's' : 'S';
  if (sp & 1) s[8] = s[8] === 'x' ? 't' : 'T';
  return s.join('');
}

export function modeToOctal(mode: number): string {
  const sp = (mode >> 9) & 7;
  const base = [(mode >> 6) & 7, (mode >> 3) & 7, mode & 7].join('');
  return sp ? `${sp}${base}` : base;
}

const CLASS_NAMES = ['Besitzer (user)', 'Gruppe (group)', 'Andere (others)'];
function words(d: number): string {
  const p: string[] = [];
  if (d & 4) p.push('lesen');
  if (d & 2) p.push('schreiben');
  if (d & 1) p.push('ausführen');
  return p.length ? p.join(', ') : 'keine Rechte';
}

function chmodTable(mode: number): string {
  const digits = [(mode >> 6) & 7, (mode >> 3) & 7, mode & 7];
  const rows = digits
    .map((d, i) => {
      const parts = [d & 4 ? 'r = 4' : null, d & 2 ? 'w = 2' : null, d & 1 ? 'x = 1' : null].filter(Boolean);
      return `| ${CLASS_NAMES[i]} | \`${triple(d)}\` | ${parts.length ? parts.join(' + ') : '–'} | **${d}** |`;
    })
    .join('\n');
  return `| Klasse | Symbolisch | Rechnung | Ziffer |\n|---|---|---|---|\n${rows}`;
}

function specialText(mode: number): string {
  const sp = (mode >> 9) & 7;
  if (!sp) return '';
  const parts: string[] = [];
  if (sp & 4) parts.push('**SUID (4)**: steht an der x-Stelle des Besitzers (`s`, bzw. `S`, wenn x dort nicht gesetzt ist)');
  if (sp & 2) parts.push('**SGID (2)**: steht an der x-Stelle der Gruppe (`s` bzw. `S`)');
  if (sp & 1) parts.push('**Sticky-Bit (1)**: steht an der x-Stelle der Anderen (`t` bzw. `T`)');
  return `\n\n**Sonderbits (vorangestellte 4. Ziffer ${sp}):**\n\n- ${parts.join('\n- ')}`;
}

const COMMON_MODES = [0o755, 0o644, 0o700, 0o600, 0o750, 0o640, 0o775, 0o664, 0o754, 0o744, 0o711, 0o660, 0o770, 0o640];
const SPECIAL_MODES = [0o4755, 0o2755, 0o1777, 0o2770, 0o1770, 0o4750, 0o2775, 0o4644, 0o3770];
const FILES = ['backup.sh', 'bericht.pdf', 'lager.csv', 'deploy.sh', 'config.yml', 'angebote', 'projekte', 'install.sh'];
const USERS = ['mkraemer', 'jschulz', 'admin', 'tbecker', 'lnowak'];
const GROUPS = ['vertrieb', 'it', 'buchhaltung', 'lager', 'azubis'];

const chmodGen: GeneratorMeta = {
  id: 'sys.chmod',
  title: 'Linux-Rechte oktal ↔ symbolisch',
  skill: 'rights.linux',
  module: 'b02',
  make(rng, d) {
    let mode: number;
    if (d === 1) mode = rng.pick(COMMON_MODES);
    else if (d === 2) mode = (rng.int(4, 7) << 6) | (rng.int(0, 7) << 3) | rng.int(0, 7);
    else mode = rng.bool(0.6) ? rng.pick(SPECIAL_MODES) : (rng.int(4, 7) << 6) | (rng.int(0, 7) << 3) | rng.int(0, 7);

    const kinds = d === 1 ? (['o2s', 'w2o'] as const) : d === 2 ? (['o2s', 's2o', 'w2o'] as const) : (['o2s', 's2o'] as const);
    const kind = rng.pick(kinds);
    const sym = modeToSymbolic(mode);
    const oct = modeToOctal(mode);
    const u = (mode >> 6) & 7, g = (mode >> 3) & 7, o = mode & 7;
    const isDir = rng.bool(0.25);
    const file = rng.pick(FILES);
    const user = rng.pick(USERS);
    const group = rng.pick(GROUPS);
    const explanation =
      `Jede Ziffer steht für eine Klasse (Besitzer · Gruppe · Andere), jedes Recht hat eine Wertigkeit: **r = 4, w = 2, x = 1**.\n\n${chmodTable(mode)}${specialText(mode)}\n\n` +
      `Ergebnis: **${oct}** ↔ \`${sym}\` – also z. B. \`chmod ${oct} ${file}\`.`;
    const hints = ['Wertigkeiten: r = 4, w = 2, x = 1 – pro Klasse addieren.', 'Reihenfolge der Klassen: Besitzer (u), Gruppe (g), Andere (o).'];

    if (kind === 'o2s') {
      const mis: Question['misconceptions'] = [];
      const wrongMap = tripleWrong(u) + tripleWrong(g) + tripleWrong(o);
      mis.push({ answer: wrongMap, error: 'chmod-wertigkeit', why: 'Du hast die Wertigkeiten vertauscht: **r = 4**, w = 2, **x = 1** (nicht r = 1, x = 4).' });
      const rev = modeToSymbolic(((mode >> 9) << 9) | (o << 6) | (g << 3) | u);
      mis.push({ answer: rev, error: 'chmod-reihenfolge', why: 'Die Ziffern gelten der Reihe nach für **Besitzer, Gruppe, Andere** (u, g, o) – du hast sie umgekehrt zugeordnet.' });
      if (mode >> 9) mis.push({ answer: modeToSymbolic(mode & 0o777), error: 'chmod-sonderbit', why: 'Die vorangestellte Ziffer ist ein Sonderbit (SUID/SGID/Sticky) und verändert die x-Stelle (`s`/`t`).' });
      return {
        id: gid('sys.chmod'), generated: true, kind: 'text', skill: 'rights.linux', difficulty: d,
        prompt: `Auf einem Linux-Server der Elektro Krämer GmbH wird \`chmod ${oct} ${file}\` ausgeführt. Gib die resultierenden Rechte in **symbolischer Schreibweise** an (9 Zeichen${mode >> 9 ? ' inkl. Sonderbits' : ''}, z. B. \`rwxr-x---\`).`,
        placeholder: 'z. B. rwxr-x---',
        accept: [sym, `-${sym}`, ...(isDir ? [`d${sym}`] : [])],
        hints,
        misconceptions: mis.filter((m) => m.answer !== sym),
        explanation,
      };
    }

    const mis: Question['misconceptions'] = [];
    const w = (dd: number) => ((dd & 4) ? 1 : 0) + (dd & 2) + ((dd & 1) ? 4 : 0);
    const wrongOct = `${mode >> 9 ? (mode >> 9) & 7 : ''}${w(u)}${w(g)}${w(o)}`;
    mis.push({ answer: wrongOct, error: 'chmod-wertigkeit', why: 'Wertigkeiten vertauscht: **r = 4**, w = 2, **x = 1**.' });
    if (mode >> 9) mis.push({ answer: modeToOctal(mode & 0o777), error: 'chmod-sonderbit', why: `\`s\`/\`S\` bzw. \`t\`/\`T\` zeigen ein gesetztes Sonderbit – es wird als **vorangestellte Ziffer** notiert (SUID = 4, SGID = 2, Sticky = 1).` });
    const accept = [oct, `0${oct}`];

    if (kind === 'w2o') {
      return {
        id: gid('sys.chmod'), generated: true, kind: 'text', skill: 'rights.linux', difficulty: d,
        prompt: `Für ${isDir ? 'das Verzeichnis' : 'die Datei'} \`${file}\` sollen folgende Rechte gelten:\n\n| Klasse | Rechte |\n|---|---|\n| Besitzer | ${words(u)} |\n| Gruppe | ${words(g)} |\n| Andere | ${words(o)} |\n\nGib die Rechte in **Oktalschreibweise** an (dreistellig, wie für \`chmod\`).`,
        placeholder: 'z. B. 750',
        accept,
        hints,
        misconceptions: mis.filter((m) => !accept.includes(m.answer)),
        explanation,
      };
    }

    const line = `${isDir ? 'd' : '-'}${sym} ${isDir ? 2 : 1} ${user} ${group} ${isDir ? 4096 : rng.int(200, 90000)} Nov  4 09:${String(rng.int(10, 59))} ${file}`;
    return {
      id: gid('sys.chmod'), generated: true, kind: 'text', skill: 'rights.linux', difficulty: d,
      prompt: `Die Ausgabe von \`ls -l\` zeigt:\n\n\`\`\`\n${line}\n\`\`\`\n\nGib die Rechte in **Oktalschreibweise** an${mode >> 9 ? ' (inkl. Sonderbits, also vierstellig)' : ' (dreistellig)'}, so wie du sie mit \`chmod\` setzen würdest.`,
      placeholder: mode >> 9 ? 'z. B. 2750' : 'z. B. 750',
      accept,
      hints: ['Das erste Zeichen (`-` oder `d`) ist der Dateityp und gehört nicht zu den Rechten.', ...hints],
      misconceptions: mis.filter((m) => !accept.includes(m.answer)),
      explanation: `Das erste Zeichen \`${isDir ? 'd' : '-'}\` ist der Dateityp (${isDir ? 'Verzeichnis' : 'normale Datei'}). Danach folgen je 3 Zeichen für Besitzer \`${user}\`, Gruppe \`${group}\` und Andere.\n\n` + explanation,
    };
  },
};

/* ------------------------------------------------------------------ */
/* Effektive Rechte: NTFS + Freigabe                                  */
/* ------------------------------------------------------------------ */

const LEVELS = ['Kein Zugriff', 'Lesen', 'Ändern', 'Vollzugriff'] as const;
const LEVEL_ACCEPT: string[][] = [
  ['Kein Zugriff', 'kein', 'keiner', 'keine', 'keine rechte', 'kein recht', 'nichts', 'none', 'verweigert', 'kein zugriff'],
  ['Lesen', 'read', 'nur lesen', 'lesen'],
  ['Ändern', 'aendern', 'andern', 'change', 'modify', 'ändern'],
  ['Vollzugriff', 'voll', 'full control', 'vollzugriff'],
];

interface Ace { group: string; level: number; deny?: boolean }

function effective(aces: Ace[], member: Set<string>): number {
  const own = aces.filter((a) => member.has(a.group));
  if (own.some((a) => a.deny)) return 0;
  return own.reduce((m, a) => Math.max(m, a.level), 0);
}
function minWithinLayer(aces: Ace[], member: Set<string>): number {
  const own = aces.filter((a) => member.has(a.group) && !a.deny);
  return own.length ? Math.min(...own.map((a) => a.level)) : 0;
}

const DEPT_GROUPS = ['GG_Vertrieb', 'GG_Einkauf', 'GG_Buchhaltung', 'GG_Azubis', 'GG_Projekt-Nord', 'GG_Lager', 'GG_Leitung'];
const PERSONS = ['Jana Schulz', 'Tim Becker', 'Leyla Aksoy', 'Marek Nowak', 'Sophie Krämer', 'Ole Hansen'];
const SHARES = [
  { name: 'Vertrieb', path: 'D:\\Daten\\Vertrieb' },
  { name: 'Projekte', path: 'D:\\Daten\\Projekte' },
  { name: 'Angebote', path: 'E:\\Freigaben\\Angebote' },
  { name: 'Lagerlisten', path: 'D:\\Daten\\Lager' },
];

function aceTable(aces: Ace[]): string {
  return `| Gruppe | Berechtigung |\n|---|---|\n${aces.map((a) => `| ${a.group} | ${a.deny ? '**Verweigern:** Vollzugriff' : `Zulassen: ${LEVELS[a.level]}`} |`).join('\n')}`;
}

const effRightsGen: GeneratorMeta = {
  id: 'sys.effrechte',
  title: 'Effektive Rechte aus NTFS und Freigabe',
  skill: 'rights.share',
  module: 'b02',
  make(rng, d) {
    const person = rng.pick(PERSONS);
    const share = rng.pick(SHARES);
    const depts = rng.shuffle(DEPT_GROUPS);
    const myGroups = d === 1 ? depts.slice(0, 1) : depts.slice(0, 2);
    const foreign = depts.slice(2, 4);
    const member = new Set<string>([...myGroups, 'Domänen-Benutzer', 'Jeder']);

    let share_: Ace[];
    let ntfs: Ace[];
    let nE: number, sE: number;
    let guard = 0;
    do {
      share_ = [];
      ntfs = [];
      // Freigabeberechtigungen
      share_.push({ group: rng.pick(['Jeder', 'Domänen-Benutzer']), level: rng.int(1, 3) });
      share_.push({ group: myGroups[0], level: rng.int(1, 3) });
      if (d >= 2 && rng.bool(0.5)) share_.push({ group: foreign[0], level: 3 });
      // NTFS-Berechtigungen
      ntfs.push({ group: 'Administratoren', level: 3 });
      ntfs.push({ group: myGroups[0], level: rng.int(1, 3) });
      if (d >= 2) ntfs.push({ group: myGroups[1], level: rng.int(1, 3) });
      if (d >= 2) ntfs.push({ group: foreign[1], level: 3 });
      if (d === 3 && rng.bool(0.35)) {
        const target = rng.bool(0.5) ? myGroups[1] : foreign[0];
        (rng.bool(0.5) ? ntfs : share_).push({ group: target, level: 3, deny: true });
      }
      nE = effective(ntfs, member);
      sE = effective(share_, member);
      guard++;
    } while (guard < 20 && d < 3 && nE === sE && rng.bool(0.7));

    share_ = rng.shuffle(share_);
    ntfs = rng.shuffle(ntfs);
    const net = Math.min(nE, sE);
    const showLocal = d >= 2;

    const rows: TableQuestion['rows'] = [
      { label: 'NTFS-Berechtigung (alle zutreffenden Einträge zusammen)', cells: { r: { answer: LEVELS[nE], accept: LEVEL_ACCEPT[nE] } } },
      { label: 'Freigabeberechtigung (alle zutreffenden Einträge zusammen)', cells: { r: { answer: LEVELS[sE], accept: LEVEL_ACCEPT[sE] } } },
      { label: `Effektiv beim Zugriff über das Netzwerk (\\\\FS01\\${share.name})`, cells: { r: { answer: LEVELS[net], accept: LEVEL_ACCEPT[net] } } },
    ];
    if (showLocal) rows.push({ label: 'Effektiv bei lokaler Anmeldung direkt am Server FS01', cells: { r: { answer: LEVELS[nE], accept: LEVEL_ACCEPT[nE] } } });

    const mis: NonNullable<Question['misconceptions']> = [];
    const maxBoth = Math.max(nE, sE);
    if (maxBoth !== net) mis.push({ cell: '2:r', answer: LEVELS[maxBoth], error: 'rechte-maximum-statt-minimum', why: 'Freigabe- und NTFS-Rechte werden beim Netzwerkzugriff **beide** geprüft – es gilt die **restriktivere** (kleinere) der beiden.' });
    const nMin = minWithinLayer(ntfs, member);
    if (nMin !== nE && !ntfs.some((a) => a.deny && member.has(a.group))) mis.push({ cell: '0:r', answer: LEVELS[nMin], error: 'rechte-kumulieren', why: 'Innerhalb **einer** Ebene (nur NTFS) addieren sich die Rechte aller Gruppen – es gilt das **höchste** zugelassene Recht (außer bei Verweigern).' });
    const sMin = minWithinLayer(share_, member);
    if (sMin !== sE && !share_.some((a) => a.deny && member.has(a.group))) mis.push({ cell: '1:r', answer: LEVELS[sMin], error: 'rechte-kumulieren', why: 'Innerhalb der Freigabeberechtigungen addieren sich die Rechte aller Gruppen des Benutzers – es gilt das höchste.' });
    if (showLocal && net !== nE) mis.push({ cell: '3:r', answer: LEVELS[net], error: 'rechte-lokal-freigabe', why: 'Bei lokaler Anmeldung am Server greifen **nur die NTFS-Rechte** – Freigabeberechtigungen wirken nur beim Zugriff über das Netzwerk.' });
    const denyN = ntfs.find((a) => a.deny);
    const denyS = share_.find((a) => a.deny);
    const denyOwn = [denyN, denyS].some((a) => a && member.has(a.group));
    if (denyOwn) {
      if (denyN && member.has(denyN.group)) mis.push({ cell: '0:r', answer: LEVELS[ntfs.filter((a) => member.has(a.group) && !a.deny).reduce((m, a) => Math.max(m, a.level), 0)], error: 'rechte-verweigern', why: 'Ein **Verweigern**-Eintrag für eine Gruppe des Benutzers hat Vorrang vor allen Zulassen-Einträgen.' });
      if (denyS && member.has(denyS.group)) mis.push({ cell: '1:r', answer: LEVELS[share_.filter((a) => member.has(a.group) && !a.deny).reduce((m, a) => Math.max(m, a.level), 0)], error: 'rechte-verweigern', why: 'Ein **Verweigern**-Eintrag für eine Gruppe des Benutzers hat Vorrang vor allen Zulassen-Einträgen.' });
    }

    const explainLayer = (name: string, aces: Ace[], eff: number) => {
      const own = aces.filter((a) => member.has(a.group));
      const ign = aces.filter((a) => !member.has(a.group));
      const deny = own.some((a) => a.deny);
      return `**${name}:** zutreffend sind ${own.length ? own.map((a) => `${a.group} (${a.deny ? 'Verweigern' : LEVELS[a.level]})`).join(', ') : 'keine Einträge'}` +
        (ign.length ? `; nicht zutreffend (${person} ist kein Mitglied): ${ign.map((a) => a.group).join(', ')}` : '') +
        `. ${deny ? 'Ein Verweigern-Eintrag sticht alle Zulassen-Einträge →' : 'Die Rechte addieren sich, das höchste zählt →'} **${LEVELS[eff]}**.`;
    };

    return {
      id: gid('sys.effrechte'), generated: true, kind: 'table', skill: 'rights.share', difficulty: d,
      prompt:
        `Auf dem Dateiserver **FS01** der Elektro Krämer GmbH ist der Ordner \`${share.path}\` als **\\\\FS01\\${share.name}** freigegeben.\n\n` +
        `**${person}** ist Mitglied von: ${myGroups.join(', ')}, Domänen-Benutzer (und damit auch *Jeder*).\n\n` +
        `**Freigabeberechtigungen:**\n\n${aceTable(share_)}\n\n**NTFS-Berechtigungen (Sicherheit):**\n\n${aceTable(ntfs)}\n\n` +
        `Bestimme die Rechte von ${person}. Vereinfachtes Modell: Rangfolge **Kein Zugriff < Lesen < Ändern < Vollzugriff**. Antworte jeweils mit *Kein Zugriff*, *Lesen*, *Ändern* oder *Vollzugriff*.`,
      columns: [{ key: 'r', label: 'Berechtigung', type: 'text' }],
      rows,
      hints: [
        'Innerhalb einer Ebene (NTFS bzw. Freigabe) addieren sich die Rechte aller Gruppen – das höchste zählt. Ausnahme: Verweigern.',
        'Über das Netzwerk gilt die restriktivere der beiden Ebenen (Minimum).',
        ...(showLocal ? ['Lokal am Server gibt es keine Freigabe – nur NTFS zählt.'] : []),
      ],
      misconceptions: mis,
      explanation:
        `${explainLayer('NTFS', ntfs, nE)}\n\n${explainLayer('Freigabe', share_, sE)}\n\n` +
        `**Netzwerkzugriff:** Minimum aus NTFS (${LEVELS[nE]}) und Freigabe (${LEVELS[sE]}) → **${LEVELS[net]}**.` +
        (showLocal ? `\n\n**Lokal am Server:** Freigaberechte spielen keine Rolle → nur NTFS → **${LEVELS[nE]}**.` : '') +
        `\n\nPraxistipp: Viele Admins setzen die Freigabe großzügig (z. B. *Authentifizierte Benutzer: Ändern*) und steuern alles Feine über NTFS – dann muss man nur an einer Stelle nachsehen.`,
    };
  },
};

/* ------------------------------------------------------------------ */
/* Dateisystem-Grenzen (FAT32)                                         */
/* ------------------------------------------------------------------ */

const FAT32_MAX = 4294967295; // 2^32 − 1 Byte = 4 GiB − 1 Byte
const GIB = 1073741824;

interface SizeCase { text: string; bytes: number; calc: string }
function sizeCases(): SizeCase[] {
  return [
    { text: '3,9 GB', bytes: 3_900_000_000, calc: '3,9 GB = 3,9 · 10⁹ Byte = 3.900.000.000 Byte' },
    { text: '4,2 GB', bytes: 4_200_000_000, calc: '4,2 GB = 4,2 · 10⁹ Byte = 4.200.000.000 Byte' },
    { text: '4,29 GB', bytes: 4_290_000_000, calc: '4,29 GB = 4.290.000.000 Byte' },
    { text: '4,3 GB', bytes: 4_300_000_000, calc: '4,3 GB = 4.300.000.000 Byte' },
    { text: '4,7 GB', bytes: 4_700_000_000, calc: '4,7 GB = 4.700.000.000 Byte (typische DVD-Größe)' },
    { text: '5,8 GB', bytes: 5_800_000_000, calc: '5,8 GB = 5.800.000.000 Byte' },
    { text: '2,5 GB', bytes: 2_500_000_000, calc: '2,5 GB = 2.500.000.000 Byte' },
    { text: '4 GiB', bytes: 4 * GIB, calc: '4 GiB = 4 · 1.073.741.824 Byte = 4.294.967.296 Byte' },
    { text: '3,99 GiB', bytes: Math.round(3.99 * GIB), calc: `3,99 GiB = 3,99 · 1.073.741.824 Byte ≈ ${fmtN(Math.round(3.99 * GIB))} Byte` },
    { text: '4.096 MiB', bytes: 4096 * 1048576, calc: '4.096 MiB = 4.096 · 1.048.576 Byte = 4.294.967.296 Byte (= genau 4 GiB)' },
    { text: '4.095 MiB', bytes: 4095 * 1048576, calc: '4.095 MiB = 4.095 · 1.048.576 Byte = 4.293.918.720 Byte' },
    { text: '4.290 MB', bytes: 4_290_000_000, calc: '4.290 MB = 4.290 · 10⁶ Byte = 4.290.000.000 Byte' },
    { text: '4.400 MB', bytes: 4_400_000_000, calc: '4.400 MB = 4.400.000.000 Byte' },
    { text: '4.294.967.295 Byte', bytes: 4_294_967_295, calc: '4.294.967.295 Byte – genau die FAT32-Grenze' },
    { text: '4.294.967.296 Byte', bytes: 4_294_967_296, calc: '4.294.967.296 Byte – genau 1 Byte zu viel' },
  ];
}
const FILE_KINDS = ['ein ISO-Abbild der Windows-Installation', 'eine Videoaufzeichnung der Schulung', 'eine virtuelle Festplatte (VHDX)', 'ein Datenbank-Backup', 'ein Image des Musterrechners'];

const SCENARIOS = [
  {
    text: 'Ein USB-Stick soll Dateien bis 12 GB (Videoschnitt-Projekte) zwischen einem Windows-11-PC und einem MacBook austauschen. Beide Systeme sollen lesen **und** schreiben können.',
    answer: 1,
    why: 'exFAT hat keine praktische 4-GiB-Grenze und wird von Windows und macOS nativ gelesen und geschrieben.',
  },
  {
    text: 'Die Systempartition eines neuen Windows-11-Arbeitsplatzes soll formatiert werden. Benötigt werden Dateirechte (ACL), Journaling und BitLocker.',
    answer: 2,
    why: 'Windows wird auf NTFS installiert: Berechtigungen (ACL), Journaling, Komprimierung, EFS und volle BitLocker-Unterstützung.',
  },
  {
    text: 'Ein neuer Ubuntu-Server erhält eine Datenpartition für Logdateien. Es sollen die Standard-Linux-Rechte (rwx, Besitzer/Gruppe) gelten, Windows-Zugriff ist nicht nötig.',
    answer: 3,
    why: 'ext4 ist das verbreitete Standard-Dateisystem vieler Linux-Distributionen mit Journaling und Unix-Rechten.',
  },
  {
    text: 'Ein kleiner USB-Stick (16 GB) soll Firmware-Dateien (je ca. 50 MB) auf ein älteres Gerät (BIOS-Update-Tool, Netzwerkdrucker) übertragen, das laut Handbuch nur „FAT“ liest.',
    answer: 0,
    why: 'FAT32 ist das kompatibelste Format. Die Dateien sind klein, die 4-GiB-Grenze stört hier nicht.',
  },
];
const FS_OPTIONS = ['FAT32', 'exFAT', 'NTFS', 'ext4'];
const FS_DISTRACT: Record<number, { why: string; error: string }> = {
  0: { why: 'FAT32 erlaubt nur Dateien bis 4 GiB − 1 Byte und kennt keine Berechtigungen.', error: 'fs-fat32-grenze' },
  1: { why: 'exFAT ist für Wechseldatenträger gedacht – ohne Journaling und ohne Berechtigungen.', error: 'fs-auswahl' },
  2: { why: 'NTFS kann macOS standardmäßig nur lesen; viele Fremdgeräte und Linux-Server nutzen es nicht als Standard.', error: 'fs-auswahl' },
  3: { why: 'ext4 wird von Windows und macOS ohne Zusatzsoftware nicht unterstützt.', error: 'fs-auswahl' },
};

const fsGen: GeneratorMeta = {
  id: 'sys.fs',
  title: 'Dateisystem-Grenzen und -Auswahl',
  skill: 'os.filesystems',
  module: 'b01',
  make(rng, d) {
    const mode = d === 1 ? rng.pick(['fits', 'fits', 'choose'] as const) : d === 2 ? rng.pick(['fits', 'choose', 'table'] as const) : rng.pick(['fits', 'table'] as const);
    if (mode === 'choose') {
      const sc = rng.pick(SCENARIOS);
      const distractors: Record<string, { why: string; error: string }> = {};
      for (let i = 0; i < 4; i++) if (i !== sc.answer) distractors[String(i)] = FS_DISTRACT[i];
      return {
        id: gid('sys.fs'), generated: true, kind: 'single', skill: 'os.filesystems', difficulty: d,
        prompt: `${sc.text}\n\nWelches Dateisystem wählst du?`,
        options: FS_OPTIONS,
        answer: sc.answer,
        distractors,
        hints: ['FAT32: max. 4 GiB − 1 Byte pro Datei. exFAT: für große Dateien auf Wechselmedien. NTFS: Windows-intern. ext4: Linux.'],
        explanation: `**${FS_OPTIONS[sc.answer]}** – ${sc.why}\n\n| Dateisystem | max. Dateigröße | typischer Einsatz |\n|---|---|---|\n| FAT32 | 4 GiB − 1 Byte | ältere Geräte, kleine USB-Sticks, EFI-Systempartition |\n| exFAT | praktisch unbegrenzt | USB-Sticks/SD-Karten (SDXC), Austausch Windows ↔ macOS |\n| NTFS | praktisch unbegrenzt | Windows-System- und Datenpartitionen |\n| ext4 | 16 TiB (4-KiB-Blöcke) | Linux |`,
      };
    }
    const cases = sizeCases();
    const pool = d === 1 ? cases.filter((c) => /GB$/.test(c.text) && !c.text.includes('4,29')) : d === 2 ? cases.filter((c) => !c.text.includes('Byte')) : cases;
    if (mode === 'fits') {
      const c = rng.pick(pool);
      const fits = c.bytes <= FAT32_MAX;
      const what = rng.pick(FILE_KINDS);
      return {
        id: gid('sys.fs'), generated: true, kind: 'single', skill: 'os.filesystems', difficulty: d,
        prompt: `Ein Kollege möchte ${what} mit **${c.text}** auf einen USB-Stick kopieren, der mit **FAT32** formatiert ist (auf dem Stick ist genug Platz frei). Klappt das?`,
        options: ['Ja, die Datei kann gespeichert werden.', 'Nein, die Datei ist größer als die maximale Dateigröße von FAT32.'],
        answer: fits ? 0 : 1,
        distractors: fits
          ? { '1': { why: `Die Grenze liegt bei 4 GiB − 1 Byte = **4.294.967.295 Byte** (≈ 4,29 GB). ${c.calc} – das ist kleiner.`, error: 'einheit-gb-gib' } }
          : { '0': { why: `${c.calc} – das ist mehr als 4.294.967.295 Byte (4 GiB − 1 Byte). FAT32 speichert die Dateigröße in 32 Bit.`, error: 'fs-fat32-grenze' } },
        hints: ['FAT32 speichert die Dateigröße in einem 32-Bit-Feld: max. 2³² − 1 Byte.', 'Rechne beide Werte in Byte um: 1 GB = 10⁹ Byte, 1 GiB = 2³⁰ Byte.'],
        explanation:
          `**Grenze FAT32:** 2³² − 1 Byte = **4.294.967.295 Byte** (= 4 GiB − 1 Byte ≈ 4,29 GB).\n\n**Datei:** ${c.calc}.\n\n` +
          `${fmtN(c.bytes)} Byte ${fits ? '≤' : '>'} 4.294.967.295 Byte → **${fits ? 'passt' : 'passt nicht'}**.` +
          (fits ? '' : '\n\nLösung: Stick mit **exFAT** (oder NTFS) formatieren oder die Datei aufteilen.'),
      };
    }
    // table
    const chosen = rng.shuffle(pool).slice(0, 4);
    const rows: TableQuestion['rows'] = chosen.map((c) => ({
      label: c.text,
      cells: { fat: { answer: c.bytes <= FAT32_MAX ? 'ja' : 'nein', accept: c.bytes <= FAT32_MAX ? ['ja', 'j', 'yes', 'passt'] : ['nein', 'n', 'no', 'passt nicht'] }, ex: { answer: 'ja', accept: ['j', 'yes', 'passt'] } },
    }));
    return {
      id: gid('sys.fs'), generated: true, kind: 'table', skill: 'os.filesystems', difficulty: d,
      prompt: 'Für die Weitergabe an Außendienst-Mitarbeitende sollen folgende Dateien auf USB-Sticks kopiert werden. Trage ein, ob die Datei auf einem **FAT32**- bzw. **exFAT**-formatierten Stick gespeichert werden kann (**ja**/**nein**). Platz ist genug vorhanden.',
      columns: [{ key: 'fat', label: 'FAT32', type: 'text' }, { key: 'ex', label: 'exFAT', type: 'text' }],
      rows,
      hints: ['FAT32: max. 4.294.967.295 Byte pro Datei. GB = 10⁹ Byte, GiB = 2³⁰ Byte.', 'exFAT hat keine für USB-Sticks relevante Dateigrößengrenze.'],
      misconceptions: chosen.flatMap((c, i) => (c.bytes <= FAT32_MAX && c.bytes > 4e9 ? [{ cell: `${i}:fat`, answer: 'nein', error: 'einheit-gb-gib', why: `${c.text}: ${c.calc} – das ist kleiner als 4.294.967.295 Byte, passt also noch.` }] : [])),
      explanation:
        `FAT32-Grenze: **4.294.967.295 Byte** (4 GiB − 1 Byte).\n\n| Datei | in Byte | FAT32 | exFAT |\n|---|---|---|---|\n` +
        chosen.map((c) => `| ${c.text} | ${fmtN(c.bytes)} | ${c.bytes <= FAT32_MAX ? 'ja' : '**nein**'} | ja |`).join('\n') +
        '\n\nexFAT (theoretisch bis 16 EiB pro Datei) hat für USB-Sticks praktisch keine Grenze.',
    };
  },
};

/* ------------------------------------------------------------------ */
/* Partitionsstil MBR / GPT                                            */
/* ------------------------------------------------------------------ */

const MBR_MAX = 2 ** 32 * 512; // 2.199.023.255.552 Byte = 2 TiB (bei 512-Byte-Sektoren)

const partitionGen: GeneratorMeta = {
  id: 'sys.partition',
  title: 'MBR-Grenze und Partitionsstil',
  skill: 'os.partition',
  module: 'b01',
  make(rng, d) {
    const mode = d === 1 ? rng.pick(['fits', 'style'] as const) : d === 2 ? rng.pick(['fits', 'lost', 'style'] as const) : rng.pick(['fits', 'lost'] as const);
    if (mode === 'style') {
      const sc = rng.pick([
        { text: 'Ein neuer Arbeitsplatz-PC mit UEFI soll Windows 11 erhalten (Secure Boot aktiv).', answer: 1, why: 'Windows 11 setzt UEFI mit Secure-Boot-Fähigkeit voraus – UEFI bootet Windows von GPT-Datenträgern.' },
        { text: 'Ein Datenlaufwerk mit 8 TB soll komplett als eine Partition genutzt werden.', answer: 1, why: 'MBR adressiert bei 512-Byte-Sektoren nur 2 TiB (≈ 2,2 TB) – für 8 TB ist GPT nötig.' },
        { text: 'Auf einer Platte werden 6 Partitionen benötigt; zusätzlich sollen Partitionstabelle-Kopien die Ausfallsicherheit erhöhen.', answer: 1, why: 'GPT kennt (unter Windows) bis zu 128 Partitionen und speichert eine Sicherungskopie der Partitionstabelle am Ende des Datenträgers.' },
        { text: 'Ein sehr alter Rechner ohne UEFI (nur klassisches BIOS) soll für eine Messanwendung wieder von seiner internen 500-GB-Platte booten; Windows 11 wird nicht benötigt.', answer: 0, why: 'Ein reines BIOS-System bootet Windows nur von MBR-Datenträgern; 500 GB liegen unter der 2-TiB-Grenze.' },
      ]);
      return {
        id: gid('sys.partition'), generated: true, kind: 'single', skill: 'os.partition', difficulty: d,
        prompt: `${sc.text}\n\nWelchen Partitionsstil wählst du?`,
        options: ['MBR (Master Boot Record)', 'GPT (GUID-Partitionstabelle)'],
        answer: sc.answer,
        distractors: sc.answer === 1 ? { '0': { why: 'MBR: max. 4 primäre Partitionen, max. 2 TiB, kein Boot von Windows 11 im UEFI-Modus.', error: 'mbr-gpt' } } : { '1': { why: 'Ohne UEFI kann Windows nicht von GPT booten – hier bleibt nur MBR.', error: 'mbr-gpt' } },
        explanation: `**${sc.answer === 1 ? 'GPT' : 'MBR'}** – ${sc.why}\n\n| | MBR | GPT |\n|---|---|---|\n| max. Größe (512-Byte-Sektoren) | 2 TiB | 8 ZiB (praktisch unbegrenzt) |\n| Partitionen | 4 primäre (oder 3 + erweiterte) | 128 (Windows-Standard) |\n| Firmware zum Booten von Windows | BIOS/CSM | UEFI |\n| Redundanz | nein | Kopie am Datenträgerende, CRC-Prüfsumme |`,
      };
    }
    const sizes = [
      { tb: 1, text: '1 TB' }, { tb: 2, text: '2 TB' }, { tb: 2.2, text: '2,2 TB' }, { tb: 3, text: '3 TB' },
      { tb: 4, text: '4 TB' }, { tb: 6, text: '6 TB' }, { tb: 0.5, text: '500 GB' }, { tb: 8, text: '8 TB' },
    ];
    if (mode === 'fits') {
      const s = rng.pick(d === 1 ? sizes.filter((x) => x.tb !== 2.2) : sizes);
      const bytes = Math.round(s.tb * 1e12);
      const fits = bytes <= MBR_MAX;
      return {
        id: gid('sys.partition'), generated: true, kind: 'single', skill: 'os.partition', difficulty: d,
        prompt: `Eine Festplatte mit **${s.text}** (Herstellerangabe, logische Sektorgröße 512 Byte) soll mit dem Partitionsstil **MBR** initialisiert werden. Kann die gesamte Kapazität genutzt werden?`,
        options: ['Ja, die gesamte Kapazität ist nutzbar.', 'Nein, MBR kann nur einen Teil der Kapazität adressieren.'],
        answer: fits ? 0 : 1,
        distractors: fits
          ? { '1': { why: `MBR adressiert 2³² Sektoren · 512 Byte = 2.199.023.255.552 Byte ≈ 2,2 TB. ${s.text} = ${fmtN(bytes)} Byte liegen darunter.`, error: 'mbr-tib-tb' } }
          : { '0': { why: `MBR-Grenze: 2.199.023.255.552 Byte (2 TiB ≈ 2,2 TB). ${s.text} = ${fmtN(bytes)} Byte – das ist mehr.`, error: 'mbr-grenze' } },
        hints: ['MBR speichert Sektoradressen in 32 Bit: 2³² Sektoren.', '2³² · 512 Byte = 2 TiB = 2.199.023.255.552 Byte.'],
        explanation: `MBR-Grenze: 2³² Sektoren · 512 Byte = **2.199.023.255.552 Byte** (= 2 TiB ≈ 2,2 TB).\n\nDatenträger: ${s.text} = ${fmtN(bytes)} Byte (Hersteller rechnen dezimal: 1 TB = 10¹² Byte).\n\n→ **${fits ? 'passt vollständig' : 'nur teilweise nutzbar – GPT verwenden'}**.`,
      };
    }
    const s = rng.pick(sizes.filter((x) => x.tb >= 3));
    const bytes = Math.round(s.tb * 1e12);
    const lostGB = Math.round((bytes - MBR_MAX) / 1e9);
    return {
      id: gid('sys.partition'), generated: true, kind: 'number', skill: 'os.partition', difficulty: d,
      prompt: `Ein Kollege hat eine **${s.text}**-Festplatte (logische Sektorgröße 512 Byte) versehentlich mit **MBR** initialisiert. Wie viele **GB** (dezimal, 1 GB = 10⁹ Byte) bleiben ungenutzt? Runde auf ganze GB.`,
      answer: lostGB,
      unit: 'GB',
      hints: ['MBR-Grenze: 2³² · 512 Byte = 2.199.023.255.552 Byte.', `${s.text} = ${fmtN(bytes)} Byte.`],
      misconceptions: [
        { answer: String(Math.round(s.tb * 1000 - 2000)), error: 'mbr-tib-tb', why: 'Die MBR-Grenze ist 2 **TiB** (2.199.023.255.552 Byte ≈ 2.199 GB), nicht 2 TB.' },
        { answer: String(Math.round(s.tb * 1000 - 2048)), error: 'mbr-tib-tb', why: 'Gemischt gerechnet: 2 TiB sind nicht 2.048 GB, sondern 2.199,02 GB (1 GB = 10⁹ Byte).' },
      ],
      explanation: `Nutzbar mit MBR: 2³² · 512 Byte = 2.199.023.255.552 Byte.\n\nUngenutzt: ${fmtN(bytes)} − 2.199.023.255.552 = ${fmtN(bytes - MBR_MAX)} Byte ≈ **${fmtN(lostGB)} GB**.\n\nAbhilfe: Datenträger (nach Datensicherung) in **GPT** konvertieren.`,
    };
  },
};

/* ------------------------------------------------------------------ */
/* Windows-Server-Lizenzierung (Core-basiert)                          */
/* ------------------------------------------------------------------ */

export function coreLicenses(cpus: number, coresPerCpu: number): number {
  return Math.max(16, cpus * Math.max(8, coresPerCpu));
}

const serverLicGen: GeneratorMeta = {
  id: 'sys.serverlic',
  title: 'Windows Server: Core-Lizenzen berechnen',
  skill: 'lic.server',
  module: 'b03',
  make(rng, d) {
    const cpus = d === 1 ? rng.pick([1, 2]) : rng.pick([1, 2, 2]);
    const cores = d === 1 ? rng.pick([4, 6, 8, 12, 16]) : rng.pick([4, 6, 8, 10, 12, 16, 20, 24, 32]);
    const base = coreLicenses(cpus, cores);
    const physical = cpus * cores;
    const rule = '**Regeln (Windows Server Standard/Datacenter):** alle physischen Kerne lizenzieren, mindestens **8 Core-Lizenzen pro Prozessor** und **16 pro Server**; verkauft in **2-Core-Paketen**. *Standard* deckt mit allen Kernen **2 VMs** ab – für je 2 weitere VMs müssen alle Kerne erneut lizenziert werden. *Datacenter*: unbegrenzt viele VMs.';
    if (d === 1) {
      return {
        id: gid('sys.serverlic'), generated: true, kind: 'number', skill: 'lic.server', difficulty: d,
        prompt: `Ein Server erhält **Windows Server Standard** und betreibt höchstens 2 VMs. Er hat **${cpus} Prozessor${cpus > 1 ? 'en' : ''} mit je ${cores} Kernen**.\n\n${rule}\n\nWie viele **Core-Lizenzen** werden benötigt?`,
        answer: base,
        unit: 'Core-Lizenzen',
        hints: ['Pro Prozessor mindestens 8 Kerne zählen.', 'Pro Server mindestens 16.'],
        misconceptions: [
          ...(physical !== base ? [{ answer: String(physical), error: 'lizenz-mindestmenge', why: `Physisch sind es ${physical} Kerne – lizenziert werden aber mindestens 8 pro CPU und 16 pro Server.` }] : []),
          { answer: String(base / 2), error: 'lizenz-pakete', why: 'Das ist die Anzahl der **2-Core-Pakete**, gefragt sind Core-Lizenzen.' },
        ],
        explanation: `${rule}\n\n1. Pro CPU: max(8, ${cores}) = ${Math.max(8, cores)} → ${cpus} · ${Math.max(8, cores)} = ${cpus * Math.max(8, cores)}\n2. Pro Server mindestens 16: max(16, ${cpus * Math.max(8, cores)}) = **${base} Core-Lizenzen** (= ${base / 2} Zweierpakete).`,
      };
    }
    if (d === 3 && rng.bool(0.5)) {
      // Break-even Standard vs. Datacenter (fiktive Preise)
      const pStd = rng.pick([110, 120, 135, 150]);
      const pDc = rng.pick([780, 820, 850, 900]);
      // kleinste VM-Anzahl, ab der Datacenter günstiger ist (bei gerader VM-Zahl lizenziert)
      let v = 2;
      while (Math.ceil(v / 2) * pStd <= pDc) v += 2;
      const firstOdd = (Math.ceil(v / 2) - 1) * 2 + 1; // Standard-Stufe springt bei ungeraden Zahlen
      const answer = firstOdd;
      const steps = Math.ceil(answer / 2);
      return {
        id: gid('sys.serverlic'), generated: true, kind: 'number', skill: 'lic.server', difficulty: d,
        prompt: `Für einen Virtualisierungshost (${cpus} × ${cores} Kerne) liegt ein Angebot vor (fiktive Preise je **2-Core-Paket**):\n\n| Edition | Preis je 2-Core-Paket |\n|---|---|\n| Windows Server Standard | ${pStd} € |\n| Windows Server Datacenter | ${pDc} € |\n\n${rule}\n\nAb wie vielen VMs ist **Datacenter günstiger** als Standard?`,
        answer,
        unit: 'VMs',
        hints: ['Rechne mit Preis pro 2-Core-Paket: Die Kernzahl ist für beide Editionen gleich und kürzt sich heraus.', `Standard: Faktor ⌈VMs / 2⌉ · ${pStd} €; Datacenter: Faktor 1 · ${pDc} €.`],
        misconceptions: [{ answer: String(Math.ceil(pDc / pStd)), error: 'lizenz-vm-stufen', why: 'Standard wird nicht pro VM bezahlt, sondern in Stufen: **je 2 VMs** müssen alle Kerne erneut lizenziert werden.' }],
        explanation:
          `Die Anzahl der Pakete (${base / 2}) ist bei beiden Editionen gleich, daher genügt der Vergleich pro Paket.\n\n` +
          `Standard kostet je 2 VMs ${pStd} € pro Paket. Gesucht ist die kleinste Stufe k mit k · ${pStd} € > ${pDc} €: k = ${steps} (${steps} · ${pStd} = ${steps * pStd} €; ${steps - 1} · ${pStd} = ${(steps - 1) * pStd} € ≤ ${pDc} €).\n\n` +
          `Stufe ${steps} beginnt bei VM Nr. 2 · ${steps - 1} + 1 = **${answer}**. Ab **${answer} VMs** ist Datacenter günstiger.`,
      };
    }
    const vms = rng.pick([2, 3, 4, 5, 6, 8]);
    const factor = Math.ceil(vms / 2);
    const total = base * factor;
    const packs = total / 2;
    return {
      id: gid('sys.serverlic'), generated: true, kind: 'number', skill: 'lic.server', difficulty: d,
      prompt: `Ein Hyper-V-Host der Elektro Krämer GmbH hat **${cpus} Prozessor${cpus > 1 ? 'en' : ''} mit je ${cores} Kernen** und soll **${vms} VMs** mit Windows Server betreiben. Lizenziert wird **Windows Server Standard**.\n\n${rule}\n\nWie viele **2-Core-Pakete** müssen gekauft werden?`,
      answer: packs,
      unit: 'Pakete',
      hints: ['Erst die Core-Lizenzen für den Host bestimmen (Mindestmengen!).', `${vms} VMs → wie oft müssen alle Kerne lizenziert werden? (je 2 VMs einmal)`],
      misconceptions: [
        ...(factor > 1 ? [{ answer: String(base / 2), error: 'lizenz-vm-stufen', why: `Standard deckt nur 2 VMs ab – für ${vms} VMs müssen alle Kerne ${factor}-mal lizenziert werden.` }] : []),
        ...(physical !== base ? [{ answer: String((physical * factor) / 2), error: 'lizenz-mindestmenge', why: 'Mindestmengen vergessen: mindestens 8 Core-Lizenzen pro CPU und 16 pro Server.' }] : []),
        { answer: String(total), error: 'lizenz-pakete', why: 'Das sind Core-Lizenzen – gefragt sind 2-Core-Pakete (durch 2 teilen).' },
      ],
      explanation:
        `${rule}\n\n1. Core-Lizenzen Host: pro CPU max(8, ${cores}) = ${Math.max(8, cores)}; ${cpus} CPU → ${cpus * Math.max(8, cores)}; Mindestwert Server 16 → **${base}**.\n` +
        `2. ${vms} VMs mit Standard → ⌈${vms} / 2⌉ = ${factor}-fache Lizenzierung → ${base} · ${factor} = ${total} Core-Lizenzen.\n` +
        `3. 2-Core-Pakete: ${total} / 2 = **${packs}**.`,
    };
  },
};

/* ------------------------------------------------------------------ */
/* Virtualisierungshost dimensionieren                                 */
/* ------------------------------------------------------------------ */

const vmHostGen: GeneratorMeta = {
  id: 'sys.vmhost',
  title: 'Virtualisierungshost dimensionieren',
  skill: 'virt.sizing',
  module: 'b04',
  make(rng, d) {
    if (d === 1 || (d === 2 && rng.bool(0.5))) {
      const host = rng.pick([64, 96, 128, 192, 256]);
      const reserve = rng.pick([4, 8, 16]);
      const vm = rng.pick([6, 8, 12, 16, 24]);
      const n = Math.floor((host - reserve) / vm);
      return {
        id: gid('sys.vmhost'), generated: true, kind: 'number', skill: 'virt.sizing', difficulty: d,
        prompt: `Ein Virtualisierungshost hat **${host} GB RAM**. Für den Hypervisor werden **${reserve} GB** reserviert. Jede VM erhält fest **${vm} GB RAM** (keine Überbuchung). Wie viele VMs passen maximal auf den Host?`,
        answer: n,
        unit: 'VMs',
        hints: ['Erst die Reserve abziehen.', 'Nur ganze VMs zählen – abrunden.'],
        misconceptions: [
          ...(Math.floor(host / vm) !== n ? [{ answer: String(Math.floor(host / vm)), error: 'vm-reserve-vergessen', why: `Der Hypervisor braucht selbst ${reserve} GB – die stehen den VMs nicht zur Verfügung.` }] : []),
          ...(Math.ceil((host - reserve) / vm) !== n ? [{ answer: String(Math.ceil((host - reserve) / vm)), error: 'vm-aufgerundet', why: 'Eine angefangene VM passt nicht – immer **abrunden**.' }] : []),
        ],
        explanation: `Verfügbar: ${host} GB − ${reserve} GB = ${host - reserve} GB.\n\n${host - reserve} GB / ${vm} GB = ${fmtN((host - reserve) / vm, 2)} → abrunden → **${n} VMs**.`,
      };
    }
    if (d === 2) {
      const n = rng.int(4, 12);
      const vm = rng.pick([8, 12, 16]);
      const reserve = rng.pick([8, 16]);
      const offers = [64, 96, 128, 192, 256, 384];
      const need = n * vm + reserve;
      const pick = offers.find((o) => o >= need) ?? 512;
      return {
        id: gid('sys.vmhost'), generated: true, kind: 'number', skill: 'virt.sizing', difficulty: d,
        prompt: `Auf einem neuen Host sollen **${n} VMs** mit je **${vm} GB RAM** laufen, zusätzlich braucht der Hypervisor **${reserve} GB**. Der Händler bietet Server mit **${offers.join(' / ')} GB** RAM an. Welche RAM-Ausstattung (in GB) wählst du mindestens?`,
        answer: pick,
        unit: 'GB',
        hints: ['Bedarf = Anzahl VMs · RAM je VM + Reserve.', 'Dann die kleinste Ausstattung wählen, die mindestens so groß ist.'],
        misconceptions: [
          ...(offers.find((o) => o >= n * vm) !== pick ? [{ answer: String(offers.find((o) => o >= n * vm)), error: 'vm-reserve-vergessen', why: 'Die Hypervisor-Reserve fehlt in deiner Rechnung.' }] : []),
          { answer: String(need), error: 'vm-angebot', why: `${need} GB ist der Bedarf – gefragt ist die passende **Angebotsgröße**.` },
        ],
        explanation: `Bedarf: ${n} · ${vm} GB + ${reserve} GB = **${need} GB**.\n\nKleinste angebotene Ausstattung ≥ ${need} GB: **${pick} GB**.`,
      };
    }
    const host = rng.pick([192, 256, 384, 512]);
    const reserve = 16;
    const cores = rng.pick([16, 24, 32, 48]);
    const ratio = rng.pick([2, 3, 4]);
    const vmRam = rng.pick([16, 24, 32]);
    const vmCpu = rng.pick([2, 4, 6, 8]);
    const byRam = Math.floor((host - reserve) / vmRam);
    const byCpu = Math.floor((cores * ratio) / vmCpu);
    const n = Math.min(byRam, byCpu);
    return {
      id: gid('sys.vmhost'), generated: true, kind: 'number', skill: 'virt.sizing', difficulty: d,
      prompt:
        `Datenblatt-Auszug Host: **${host} GB RAM**, **${cores} physische Kerne**. Betriebskonzept der Elektro Krämer GmbH:\n\n` +
        `- ${reserve} GB RAM bleiben für den Hypervisor reserviert, RAM wird nicht überbucht.\n- Höchstens **${ratio} vCPUs pro physischem Kern** (Überbuchung ${ratio}:1).\n\n` +
        `Jede VM erhält **${vmRam} GB RAM** und **${vmCpu} vCPUs**. Wie viele VMs kann der Host höchstens betreiben?`,
      answer: n,
      unit: 'VMs',
      hints: ['Rechne RAM- und CPU-Grenze getrennt aus.', 'Der kleinere Wert (Engpass) begrenzt.'],
      misconceptions: [
        ...(Math.max(byRam, byCpu) !== n ? [{ answer: String(Math.max(byRam, byCpu)), error: 'vm-engpass', why: 'Es gilt der **Engpass**: der kleinere der beiden Werte.' }] : []),
        ...(Math.floor(cores / vmCpu) !== n ? [{ answer: String(Math.floor(cores / vmCpu)), error: 'vm-ueberbuchung', why: `Die erlaubte Überbuchung (${ratio}:1) wurde nicht berücksichtigt.` }] : []),
      ],
      explanation:
        `**RAM-Grenze:** (${host} − ${reserve}) GB / ${vmRam} GB = ${fmtN((host - reserve) / vmRam, 2)} → **${byRam}** VMs\n\n` +
        `**CPU-Grenze:** ${cores} Kerne · ${ratio} = ${cores * ratio} vCPUs / ${vmCpu} = ${fmtN((cores * ratio) / vmCpu, 2)} → **${byCpu}** VMs\n\n` +
        `Engpass = Minimum → **${n} VMs** (begrenzt durch ${byRam <= byCpu ? 'RAM' : 'CPU'}).`,
    };
  },
};

/* ------------------------------------------------------------------ */
/* SLA / Verfügbarkeit                                                 */
/* ------------------------------------------------------------------ */

const PERIODS = [
  { name: 'Jahr (365 Tage, 24/7)', minutes: 525600, short: 'Jahr' },
  { name: 'Monat (30 Tage, 24/7)', minutes: 43200, short: 'Monat' },
  { name: 'Woche (7 Tage, 24/7)', minutes: 10080, short: 'Woche' },
];
const AVAIL = [99, 99.5, 99.8, 99.9, 99.95, 99.99, 98, 97.5];

const slaGen: GeneratorMeta = {
  id: 'sys.sla',
  title: 'SLA: Verfügbarkeit und Ausfallzeit',
  skill: 'itsm.sla',
  module: 'b05',
  make(rng, d) {
    const variant = d === 1 ? 'down-min' : d === 2 ? rng.pick(['down-min', 'down-h'] as const) : rng.pick(['service', 'avail'] as const);
    if (variant === 'service' || variant === 'avail') {
      const weeks = 4;
      const hoursPerDay = rng.pick([8, 10, 12]);
      const serviceMin = weeks * 5 * hoursPerDay * 60;
      if (variant === 'service') {
        const a = rng.pick([99, 99.5, 98, 97.5, 99.8]);
        const a100 = Math.round(a * 100);
        const num = serviceMin * (10000 - a100); // /10000 = Minuten
        const exact = num / 10000;
        const ans = Math.round(exact * 100) / 100;
        return {
          id: gid('sys.sla'), generated: true, kind: 'number', skill: 'itsm.sla', difficulty: d,
          prompt: `Im SLA mit dem Systemhaus ist für das Warenwirtschaftssystem eine Verfügbarkeit von **${fmtN(a, 2)} %** innerhalb der **Servicezeit Mo–Fr, ${hoursPerDay} Stunden pro Tag** vereinbart. Abgerechnet wird über **4 Wochen**. Wie viele **Minuten** Ausfall sind in diesem Zeitraum höchstens erlaubt? (auf 2 Nachkommastellen runden)`,
          answer: ans,
          tolerance: 0.01,
          unit: 'min',
          hints: ['Nur die Servicezeit zählt: 4 Wochen · 5 Tage · Stunden pro Tag.', 'Erlaubter Ausfall = Servicezeit · (100 % − Verfügbarkeit).'],
          misconceptions: [
            { answer: String(Math.round(40320 * (10000 - a100)) / 10000), error: 'sla-servicezeit', why: 'Du hast rund um die Uhr (4 · 7 · 24 h) gerechnet – vereinbart ist nur die Servicezeit Mo–Fr.' },
            { answer: String(Math.round((serviceMin * a100) / 100) / 100), error: 'sla-verfuegbar-statt-ausfall', why: 'Das ist die **verfügbare** Zeit – gefragt ist die erlaubte Ausfallzeit.' },
          ],
          explanation: `Servicezeit: 4 · 5 · ${hoursPerDay} h = ${4 * 5 * hoursPerDay} h = ${fmtN(serviceMin)} min.\n\nErlaubter Ausfall: ${fmtN(serviceMin)} min · (100 − ${fmtN(a, 2)}) % = ${fmtN(serviceMin)} · ${fmtN((10000 - a100) / 10000, 4)} = **${fmtN(ans, 2)} min**.`,
        };
      }
      const downMin = rng.pick([30, 45, 60, 90, 120, 150, 200]);
      const avail = ((serviceMin - downMin) / serviceMin) * 100;
      const ans = Math.round(avail * 100) / 100;
      return {
        id: gid('sys.sla'), generated: true, kind: 'number', skill: 'itsm.sla', difficulty: d,
        prompt: `Servicezeit des E-Mail-Dienstes: **Mo–Fr, ${hoursPerDay} h/Tag**. Im Abrechnungszeitraum von **4 Wochen** fiel der Dienst insgesamt **${downMin} Minuten** aus. Welche Verfügbarkeit in Prozent wurde erreicht? (auf 2 Nachkommastellen runden)`,
        answer: ans,
        tolerance: 0.01,
        unit: '%',
        hints: ['Verfügbarkeit = (Servicezeit − Ausfallzeit) / Servicezeit · 100 %.', 'Beide Zeiten in Minuten angeben.'],
        misconceptions: [{ answer: String(Math.round((downMin / serviceMin) * 10000) / 100), error: 'sla-verfuegbar-statt-ausfall', why: 'Das ist der Anteil der **Ausfallzeit** – gefragt ist die Verfügbarkeit.' }],
        explanation: `Servicezeit: 4 · 5 · ${hoursPerDay} h = ${4 * 5 * hoursPerDay} h = ${fmtN(serviceMin)} min.\n\nVerfügbarkeit = (${fmtN(serviceMin)} − ${downMin}) / ${fmtN(serviceMin)} · 100 % = ${fmtN(avail, 4)} % ≈ **${fmtN(ans, 2)} %**.`,
      };
    }
    const p = d === 1 ? rng.pick([PERIODS[0], PERIODS[1]]) : rng.pick(PERIODS);
    const a = d === 1 ? rng.pick([99, 99.9, 99.5]) : rng.pick(AVAIL);
    const a100 = Math.round(a * 100);
    const exactMin = (p.minutes * (10000 - a100)) / 10000;
    if (variant === 'down-h') {
      const ans = Math.round((exactMin / 60) * 100) / 100;
      return {
        id: gid('sys.sla'), generated: true, kind: 'number', skill: 'itsm.sla', difficulty: d,
        prompt: `Ein Cloud-Anbieter garantiert für seinen Dienst eine Verfügbarkeit von **${fmtN(a, 2)} %** bezogen auf ein **${p.name}**. Wie viele **Stunden** Ausfall sind damit maximal erlaubt? (auf 2 Nachkommastellen runden)`,
        answer: ans,
        tolerance: 0.01,
        unit: 'h',
        hints: [`Zeitraum in Stunden: ${fmtN(p.minutes / 60)} h.`, 'Ausfall = Zeitraum · (100 % − Verfügbarkeit).'],
        misconceptions: [
          { answer: String(Math.round(exactMin * 100) / 100), error: 'sla-einheit', why: 'Das ist das Ergebnis in **Minuten** – gefragt sind Stunden.' },
          { answer: String(Math.round((p.minutes / 60) * (100 - a) * 100) / 100), error: 'sla-prozent', why: 'Prozent nicht durch 100 geteilt: (100 − A) % ist ein Anteil, z. B. 0,1 % = 0,001.' },
        ],
        explanation: `Zeitraum: ${fmtN(p.minutes / 60)} h.\n\nErlaubter Ausfall: ${fmtN(p.minutes / 60)} h · ${fmtN((10000 - a100) / 100, 2)} % = ${fmtN(p.minutes / 60)} · ${fmtN((10000 - a100) / 10000, 4)} = **${fmtN(ans, 2)} h** (= ${fmtN(exactMin, 2)} min).`,
      };
    }
    const ans = Math.round(exactMin * 100) / 100;
    return {
      id: gid('sys.sla'), generated: true, kind: 'number', skill: 'itsm.sla', difficulty: d,
      prompt: `Im Service Level Agreement für den Dateiserver ist eine Verfügbarkeit von **${fmtN(a, 2)} %** pro **${p.name}** vereinbart. Wie viele **Minuten** darf der Dienst in diesem Zeitraum höchstens ausfallen? (auf 2 Nachkommastellen runden)`,
      answer: ans,
      tolerance: 0.01,
      unit: 'min',
      hints: [`Zeitraum in Minuten: ${fmtN(p.minutes)} min.`, 'Erlaubter Ausfall = Zeitraum · (100 % − Verfügbarkeit).'],
      misconceptions: [
        { answer: String(Math.round(p.minutes * (100 - a) * 100) / 100), error: 'sla-prozent', why: 'Prozent nicht durch 100 geteilt: (100 − A) % ist ein Anteil, z. B. 0,1 % = 0,001.' },
        { answer: String(Math.round((exactMin / 60) * 100) / 100), error: 'sla-einheit', why: 'Das ist das Ergebnis in **Stunden** – gefragt sind Minuten.' },
        { answer: String(Math.round(((p.minutes * a100) / 10000) * 100) / 100), error: 'sla-verfuegbar-statt-ausfall', why: 'Das ist die **verfügbare** Zeit, nicht die erlaubte Ausfallzeit.' },
      ],
      explanation: `Zeitraum: ${p.name} = ${fmtN(p.minutes)} min.\n\nErlaubter Ausfall: ${fmtN(p.minutes)} min · (100 − ${fmtN(a, 2)}) % = ${fmtN(p.minutes)} · ${fmtN((10000 - a100) / 10000, 4)} = **${fmtN(ans, 2)} min**${ans >= 60 ? ` (≈ ${fmtN(ans / 60, 2)} h)` : ''}.`,
    };
  },
};

export const GENERATORS_SYSTEME: GeneratorMeta[] = [chmodGen, effRightsGen, fsGen, partitionGen, serverLicGen, vmHostGen, slaGen];

/** nur für Tests/Debugging */
export const _internal = { FAT32_MAX, MBR_MAX, Rng: Rng as typeof Rng, d: (x: number) => x as Difficulty };
