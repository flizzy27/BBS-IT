/**
 * Algorithmische Aufgaben-Generatoren. Jede Aufgabe wird aus einem Seed erzeugt und
 * enthält die exakt berechnete Lösung, einen vollständigen Lösungsweg und typische
 * Fehlerbilder (misconceptions), damit Fehlerursachen erkannt werden können.
 */
import type { Difficulty, Question, TableQuestion, VlsmQuestion } from '../content/types';
import {
  blockSize,
  broadcastAddress,
  classifyAddress,
  formatIp,
  interestingOctet,
  ipToBinary,
  isPrivate,
  networkAddress,
  octets,
  parseCidr,
  placeValues,
  prefixForHosts,
  prefixToMask,
  prefixToMaskNum,
  sameSubnet,
  toBinary8,
  usableHosts,
} from './ipv4';
import { compressIpv6, expandIpv6, ipv6NthSubnet, ipv6Type, stripLeadingZeros } from './ipv6';
import { Rng } from './rng';
import { grade } from './grading';
import { GENERATORS_HARDWARE } from './gen/hardware';
import { allocateVlsm, requiredPrefix, totalRequired, type VlsmDemand } from './vlsm';

export interface GeneratorMeta {
  id: string;
  title: string;
  skill: string;
  module: string;
  make: (rng: Rng, difficulty: Difficulty) => Question;
}

const fmtN = (n: number) => n.toLocaleString('de-DE');
const ip = formatIp;

/* ---------- Hilfen: zufällige Netze ---------- */

function randomPrivateNet(rng: Rng, difficulty: Difficulty): { base: number; basePrefix: number } {
  if (difficulty === 1) return { base: (192 * 2 ** 24 + 168 * 2 ** 16 + rng.int(0, 254) * 256) >>> 0, basePrefix: 24 };
  if (difficulty === 2)
    return rng.bool(0.6)
      ? { base: (192 * 2 ** 24 + 168 * 2 ** 16 + rng.int(0, 254) * 256) >>> 0, basePrefix: 24 }
      : { base: (172 * 2 ** 24 + rng.int(16, 31) * 2 ** 16) >>> 0, basePrefix: 16 };
  return rng.pick([
    { base: (10 * 2 ** 24 + rng.int(0, 255) * 2 ** 16) >>> 0, basePrefix: 16 },
    { base: (172 * 2 ** 24 + rng.int(16, 31) * 2 ** 16) >>> 0, basePrefix: 16 },
    { base: (10 * 2 ** 24) >>> 0, basePrefix: 8 },
  ]);
}

/** Zufällige Host-IP + Präfix passend zur Schwierigkeit. */
function randomHostWithPrefix(rng: Rng, difficulty: Difficulty): { addr: number; prefix: number } {
  if (difficulty === 1) {
    const prefix = rng.int(25, 28);
    const base = (192 * 2 ** 24 + 168 * 2 ** 16 + rng.int(0, 254) * 256) >>> 0;
    return { addr: base + rng.int(1, 254), prefix };
  }
  if (difficulty === 2) {
    if (rng.bool(0.6)) {
      const prefix = rng.int(25, 30);
      const base = (192 * 2 ** 24 + 168 * 2 ** 16 + rng.int(0, 254) * 256) >>> 0;
      return { addr: base + rng.int(1, 254), prefix };
    }
    const prefix = rng.int(17, 23);
    const base = (172 * 2 ** 24 + rng.int(16, 31) * 2 ** 16) >>> 0;
    return { addr: base + rng.int(0, 255) * 256 + rng.int(1, 254), prefix };
  }
  const prefix = rng.pick([11, 12, 13, 14, 18, 19, 20, 21, 22, 27, 29]);
  const base = (10 * 2 ** 24) >>> 0;
  return { addr: base + rng.int(0, 255) * 2 ** 16 + rng.int(0, 255) * 256 + rng.int(1, 254), prefix };
}

/** Markdown-Lösungsweg für Netz/Broadcast. */
function subnetWalkthrough(addr: number, prefix: number): string {
  const net = networkAddress(addr, prefix);
  const bc = broadcastAddress(addr, prefix);
  const io = interestingOctet(prefix);
  const bs = blockSize(prefix);
  const lines: string[] = [];
  lines.push(`**1. Maske bestimmen:** /${prefix} = \`${prefixToMask(prefix)}\` → ${prefix} Netzbits, ${32 - prefix} Hostbits.`);
  if (io >= 0) {
    const octSize = 2 ** (8 - (prefix - io * 8));
    const ao = octets(addr)[io];
    const start = Math.floor(ao / octSize) * octSize;
    lines.push(
      `**2. Interessantes Oktett:** Die Netzgrenze liegt im ${io + 1}. Oktett. Schrittweite dort: 256 − ${octets(prefixToMaskNum(prefix))[io]} = **${octSize}**.`,
    );
    lines.push(
      `**3. Netz finden:** ${ao} liegt zwischen ${start} und ${start + octSize - 1} (Vielfache von ${octSize}: …, ${start}, ${start + octSize}, …). → Netzadresse **${ip(net)}**.`,
    );
  } else {
    lines.push(`**2. Grenze auf Oktettgrenze:** Bei /${prefix} wird ganz einfach jedes Hostoktett 0 (Netz) bzw. 255 (Broadcast).`);
  }
  lines.push(`**4. Broadcast:** Netzadresse + Blockgröße − 1 = ${ip(net)} + ${fmtN(bs)} − 1 = **${ip(bc)}** (alle Hostbits auf 1).`);
  lines.push(`**5. Hostbereich:** ${ip(net + 1)} – ${ip(bc - 1)} → ${fmtN(usableHosts(prefix))} nutzbare Adressen (2^${32 - prefix} − 2).`);
  lines.push('');
  lines.push('**Binär (UND-Verknüpfung):**');
  lines.push('```');
  lines.push(`IP     ${ipToBinary(addr)}`);
  lines.push(`Maske  ${ipToBinary(prefixToMaskNum(prefix))}`);
  lines.push(`Netz   ${ipToBinary(net)}   = ${ip(net)}`);
  lines.push(`Bcast  ${ipToBinary(bc)}   = ${ip(bc)}`);
  lines.push('```');
  return lines.join('\n\n');
}

let counter = 0;
const gid = (g: string) => `gen:${g}:${Date.now().toString(36)}${(counter++).toString(36)}`;

/* ------------------------------------------------------------------ */
/* Binär                                                               */
/* ------------------------------------------------------------------ */

const dec2bin: GeneratorMeta = {
  id: 'bin.dec2bin',
  title: 'Dezimal → Binär',
  skill: 'bin.dec2bin',
  module: 'm04',
  make(rng, d) {
    const n = d === 1 ? rng.pick([1, 2, 4, 8, 16, 32, 64, 128, 192, 224, 240, 255, 3, 5, 10]) : d === 2 ? rng.int(1, 255) : rng.pick([rng.int(129, 254), rng.int(17, 127)]);
    const b = toBinary8(n);
    const parts = placeValues(n);
    return {
      id: gid('bin.dec2bin'),
      generated: true,
      kind: 'text',
      skill: 'bin.dec2bin',
      difficulty: d,
      prompt: `Wandle die Dezimalzahl **${n}** in eine **8-stellige Binärzahl** (ein Oktett) um.`,
      placeholder: 'z. B. 01010101',
      accept: [b, String(Number(b))],
      hints: [
        'Schreibe die Stellenwerte 128 · 64 · 32 · 16 · 8 · 4 · 2 · 1 nebeneinander.',
        `Ziehe von ${n} jeweils den größten passenden Stellenwert ab und setze dort eine 1.`,
      ],
      misconceptions: [{ answer: b.split('').reverse().join(''), error: 'bin-reihenfolge', why: 'Die Bits stehen in umgekehrter Reihenfolge. Das höchstwertige Bit (128) steht **links**.' }],
      explanation:
        `**Stellenwertmethode:** ${n} = ${parts.join(' + ') || '0'}\n\n| 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |\n|---|---|---|---|---|---|---|---|\n| ${b.split('').join(' | ')} |\n\n` +
        `Ergebnis: **${b}**`,
    };
  },
};

const bin2dec: GeneratorMeta = {
  id: 'bin.bin2dec',
  title: 'Binär → Dezimal',
  skill: 'bin.bin2dec',
  module: 'm04',
  make(rng, d) {
    if (d === 3) {
      const a = rng.int(0, 2 ** 32 - 1);
      const addr = ((192 * 2 ** 24) >>> 0) + (a % 2 ** 24);
      return {
        id: gid('bin.bin2dec'),
        generated: true,
        kind: 'ip',
        skill: 'bin.bin2dec',
        difficulty: d,
        prompt: `Wandle die binär dargestellte IPv4-Adresse in Punktnotation um:\n\n\`${ipToBinary(addr)}\``,
        answer: ip(addr),
        hints: ['Rechne jedes der vier Oktette einzeln um.', 'Stellenwerte: 128 64 32 16 8 4 2 1'],
        explanation: octets(addr)
          .map((o, i) => `- Oktett ${i + 1}: \`${toBinary8(o)}\` = ${placeValues(o).join(' + ') || '0'} = **${o}**`)
          .join('\n') + `\n\nErgebnis: **${ip(addr)}**`,
      };
    }
    const n = d === 1 ? rng.pick([128, 192, 224, 240, 248, 252, 254, 255, 1, 15, 64, 32]) : rng.int(1, 255);
    const b = toBinary8(n);
    const rev = parseInt(b.split('').reverse().join(''), 2);
    return {
      id: gid('bin.bin2dec'),
      generated: true,
      kind: 'number',
      skill: 'bin.bin2dec',
      difficulty: d,
      prompt: `Welche Dezimalzahl entspricht dem Binärwert **${b}**?`,
      answer: n,
      hints: ['Stellenwerte von links: 128, 64, 32, 16, 8, 4, 2, 1.', 'Addiere die Stellenwerte, an denen eine 1 steht.'],
      misconceptions: rev !== n ? [{ answer: String(rev), error: 'bin-reihenfolge', why: 'Du hast die Stellenwerte von rechts nach links gelesen. Das linke Bit hat den Wert 128.' }] : [],
      explanation: `| 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |\n|---|---|---|---|---|---|---|---|\n| ${b.split('').join(' | ')} |\n\n${placeValues(n).join(' + ')} = **${n}**`,
    };
  },
};

const hexConv: GeneratorMeta = {
  id: 'bin.hex',
  title: 'Hexadezimal umrechnen',
  skill: 'ipv6.hex',
  module: 'm07',
  make(rng, d) {
    const mode = rng.pick(['hex2dec', 'dec2hex', 'hex2bin'] as const);
    const n = d === 1 ? rng.int(10, 255) : d === 2 ? rng.int(256, 4095) : rng.int(4096, 65535);
    const hex = n.toString(16);
    const nibbles = hex.split('').map((c) => `${c.toUpperCase()} = ${parseInt(c, 16).toString(2).padStart(4, '0')}`);
    if (mode === 'hex2dec')
      return {
        id: gid('bin.hex'), generated: true, kind: 'number', skill: 'ipv6.hex', difficulty: d,
        prompt: `Rechne die Hexadezimalzahl **0x${hex.toUpperCase()}** in eine Dezimalzahl um.`,
        answer: n,
        hints: ['Stellenwerte im Hexadezimalsystem: … 4096 · 256 · 16 · 1', 'A=10, B=11, C=12, D=13, E=14, F=15'],
        explanation: hex.split('').map((c, i) => `${c.toUpperCase()}(${parseInt(c, 16)}) · 16^${hex.length - 1 - i}`).join(' + ') + ` = **${fmtN(n)}**`,
      };
    if (mode === 'dec2hex')
      return {
        id: gid('bin.hex'), generated: true, kind: 'text', skill: 'ipv6.hex', difficulty: d,
        prompt: `Rechne die Dezimalzahl **${n}** in eine Hexadezimalzahl um (ohne Präfix 0x).`,
        accept: [hex, '0x' + hex],
        hints: ['Teile wiederholt durch 16 und notiere die Reste.', 'Reste von unten nach oben gelesen ergeben die Hexzahl.'],
        explanation: `Restwertmethode: ${(() => { const st: string[] = []; let x = n; while (x > 0) { st.push(`${x} : 16 = ${Math.floor(x / 16)} Rest ${x % 16} (${(x % 16).toString(16).toUpperCase()})`); x = Math.floor(x / 16); } return st.join('\n\n'); })()}\n\nVon unten gelesen: **${hex.toUpperCase()}**`,
      };
    const bin = n.toString(2).padStart(hex.length * 4, '0');
    return {
      id: gid('bin.hex'), generated: true, kind: 'text', skill: 'ipv6.hex', difficulty: d,
      prompt: `Wandle **0x${hex.toUpperCase()}** in eine Binärzahl um (jede Hexziffer = 4 Bit, führende Nullen je Nibble beibehalten).`,
      accept: [bin, bin.replace(/(.{4})(?!$)/g, '$1 ')],
      hints: ['Jede Hexziffer entspricht genau 4 Bits (einem Nibble).'],
      explanation: nibbles.join('\n\n') + `\n\nZusammen: **${bin.replace(/(.{4})(?!$)/g, '$1 ')}**`,
    };
  },
};

/* ------------------------------------------------------------------ */
/* IPv4-Grundlagen                                                     */
/* ------------------------------------------------------------------ */

const mask2prefix: GeneratorMeta = {
  id: 'ipv4.mask2prefix',
  title: 'Maske → CIDR-Präfix',
  skill: 'ipv4.mask',
  module: 'm03',
  make(rng, d) {
    const p = d === 1 ? rng.pick([8, 16, 24, 25, 26]) : d === 2 ? rng.int(17, 30) : rng.int(9, 30);
    const mask = prefixToMask(p);
    const full = Math.floor(p / 8) * 8;
    return {
      id: gid('ipv4.mask2prefix'), generated: true, kind: 'cidr', skill: 'ipv4.mask', difficulty: d,
      prompt: `Gib die Subnetzmaske **${mask}** in CIDR-Notation an (z. B. /24).`,
      answer: `/${p}`,
      hints: ['Zähle die Einsen der Maske in Binärdarstellung.', 'Jedes 255-Oktett liefert 8 Einsen.'],
      misconceptions: p % 8 !== 0 ? [{ answer: `/${full}`, error: 'maske-teiloktett', why: `Du hast nur die vollen 255er-Oktette gezählt. Das Oktett ${octets(prefixToMaskNum(p))[Math.floor(p / 8)]} enthält zusätzlich ${p - full} Einsen (\`${toBinary8(octets(prefixToMaskNum(p))[Math.floor(p / 8)])}\`).` }] : [],
      explanation: `Binär: \`${ipToBinary(prefixToMaskNum(p))}\`\n\nAnzahl Einsen: **${p}** → **/${p}**`,
    };
  },
};

const prefix2mask: GeneratorMeta = {
  id: 'ipv4.prefix2mask',
  title: 'CIDR-Präfix → Maske',
  skill: 'ipv4.mask',
  module: 'm03',
  make(rng, d) {
    const p = d === 1 ? rng.pick([8, 16, 24, 25, 26, 27]) : d === 2 ? rng.int(17, 30) : rng.int(9, 30);
    const m = prefixToMaskNum(p);
    const io = Math.floor(p / 8);
    const bits = p % 8;
    return {
      id: gid('ipv4.prefix2mask'), generated: true, kind: 'ip', skill: 'ipv4.mask', difficulty: d,
      prompt: `Wie lautet die Subnetzmaske zu **/${p}** in Dezimalschreibweise?`,
      answer: ip(m),
      hints: [`/${p} bedeutet ${p} Einsen von links.`, `${Math.floor(p / 8)} volle Oktette = 255, danach ${bits} Einsen im nächsten Oktett.`],
      explanation:
        `\`${ipToBinary(m)}\`\n\n` +
        (bits ? `Im ${io + 1}. Oktett stehen ${bits} Einsen: ${[128, 64, 32, 16, 8, 4, 2, 1].slice(0, bits).join(' + ')} = **${octets(m)[io]}**.\n\n` : '') +
        `Maske: **${ip(m)}**`,
    };
  },
};

const networkGen: GeneratorMeta = {
  id: 'ipv4.network',
  title: 'Netzadresse bestimmen',
  skill: 'ipv4.network',
  module: 'm05',
  make(rng, d) {
    const { addr, prefix } = randomHostWithPrefix(rng, d);
    const net = networkAddress(addr, prefix);
    const bc = broadcastAddress(addr, prefix);
    const mcs = [
      { answer: ip(addr), error: 'netz-host-statt-netz', why: 'Das ist die gegebene Hostadresse selbst. Die Netzadresse entsteht, indem alle Hostbits auf 0 gesetzt werden (IP UND Maske).' },
      { answer: ip(bc), error: 'netz-broadcast-verwechselt', why: 'Das ist die Broadcastadresse (alle Hostbits = 1). Gesucht war die Netzadresse (alle Hostbits = 0).' },
    ];
    if (prefix > 24) mcs.push({ answer: ip(networkAddress(addr, 24)), error: 'netz-oktettgrenze', why: `Du hast das Netz wie bei /24 bestimmt. Bei /${prefix} ist das letzte Oktett in Blöcke zu ${blockSize(prefix)} aufgeteilt.` });
    return {
      id: gid('ipv4.network'), generated: true, kind: 'ip', skill: 'ipv4.network', difficulty: d,
      prompt: `Ein Host hat die Adresse **${ip(addr)}/${prefix}**. Wie lautet die **Netzadresse** seines Subnetzes?`,
      answer: ip(net),
      hints: ['Bestimme die Blockgröße im interessanten Oktett (256 − Maskenwert).', 'Suche das größte Vielfache der Blockgröße, das ≤ dem Oktettwert ist.'],
      misconceptions: mcs.filter((m) => m.answer !== ip(net)),
      explanation: subnetWalkthrough(addr, prefix),
    };
  },
};

const broadcastGen: GeneratorMeta = {
  id: 'ipv4.broadcast',
  title: 'Broadcastadresse bestimmen',
  skill: 'ipv4.broadcast',
  module: 'm05',
  make(rng, d) {
    const { addr, prefix } = randomHostWithPrefix(rng, d);
    const net = networkAddress(addr, prefix);
    const bc = broadcastAddress(addr, prefix);
    const mcs = [
      { answer: ip((bc + 1) >>> 0), error: 'broadcast-naechstes-netz', why: `${ip(bc + 1)} ist bereits die Netzadresse des **nächsten** Subnetzes. Der Broadcast ist die letzte Adresse **davor**: nächstes Netz − 1.` },
      { answer: ip(bc - 1), error: 'broadcast-letzter-host', why: 'Das ist die letzte nutzbare Hostadresse. Der Broadcast ist eine Adresse höher (alle Hostbits = 1).' },
      { answer: ip(net), error: 'netz-broadcast-verwechselt', why: 'Das ist die Netzadresse (alle Hostbits 0). Beim Broadcast sind alle Hostbits 1.' },
    ];
    if (prefix > 24) mcs.push({ answer: ip(broadcastAddress(addr, 24)), error: 'netz-oktettgrenze', why: `Du hast den Broadcast wie bei /24 bestimmt. Bei /${prefix} endet das Subnetz schon nach ${blockSize(prefix)} Adressen.` });
    return {
      id: gid('ipv4.broadcast'), generated: true, kind: 'ip', skill: 'ipv4.broadcast', difficulty: d,
      prompt: `Bestimme die **Broadcastadresse** des Netzes, in dem sich **${ip(addr)}/${prefix}** befindet.`,
      answer: ip(bc),
      hints: ['Bestimme zuerst die Netzadresse.', `Broadcast = Netzadresse + Blockgröße − 1 (Blockgröße bei /${prefix}: ${fmtN(blockSize(prefix))}).`],
      misconceptions: mcs,
      explanation: subnetWalkthrough(addr, prefix),
    };
  },
};

const hostCountGen: GeneratorMeta = {
  id: 'ipv4.hostcount',
  title: 'Anzahl nutzbarer Hosts',
  skill: 'ipv4.hostcount',
  module: 'm05',
  make(rng, d) {
    const p = d === 1 ? rng.int(24, 29) : d === 2 ? rng.int(20, 30) : rng.int(12, 22);
    const h = 32 - p;
    return {
      id: gid('ipv4.hostcount'), generated: true, kind: 'number', skill: 'ipv4.hostcount', difficulty: d,
      prompt: `Wie viele **nutzbare Hostadressen** hat ein klassisches IPv4-Subnetz mit dem Präfix **/${p}**?`,
      answer: usableHosts(p),
      hints: [`Hostbits = 32 − ${p}.`, 'Adressen = 2^Hostbits. Zwei davon sind reserviert.'],
      misconceptions: [
        { answer: String(2 ** h), error: 'reservierte-vergessen', why: `2^${h} = ${fmtN(2 ** h)} ist die Gesamtzahl der Adressen. Netzadresse und Broadcast sind nicht für Hosts nutzbar → −2.` },
        { answer: String(2 ** h - 1), error: 'reservierte-vergessen', why: 'Es sind **zwei** reservierte Adressen (Netz- und Broadcastadresse), nicht eine.' },
        { answer: String(2 ** p - 2), error: 'netzbits-hostbits-verwechselt', why: `Du hast mit den Netzbits (${p}) statt mit den Hostbits (${h}) gerechnet.` },
      ],
      explanation: `Hostbits: 32 − ${p} = **${h}**\n\nAdressen: 2^${h} = ${fmtN(2 ** h)}\n\nNutzbar: ${fmtN(2 ** h)} − 2 (Netz + Broadcast) = **${fmtN(usableHosts(p))}**`,
    };
  },
};

const privateGen: GeneratorMeta = {
  id: 'ipv4.private',
  title: 'Private / öffentliche / spezielle Adressen',
  skill: 'ipv4.private',
  module: 'm03',
  make(rng, d) {
    const privates = [`10.${rng.int(0, 255)}.${rng.int(0, 255)}.${rng.int(1, 254)}`, `172.${rng.int(16, 31)}.${rng.int(0, 255)}.${rng.int(1, 254)}`, `192.168.${rng.int(0, 255)}.${rng.int(1, 254)}`];
    const traps = [`172.${rng.pick([15, 32, 33, 12])}.${rng.int(0, 255)}.${rng.int(1, 254)}`, `192.169.${rng.int(0, 255)}.${rng.int(1, 254)}`, `11.${rng.int(0, 255)}.${rng.int(0, 255)}.${rng.int(1, 254)}`, `169.254.${rng.int(1, 254)}.${rng.int(1, 254)}`, `100.${rng.int(64, 127)}.${rng.int(0, 255)}.${rng.int(1, 254)}`, `8.8.${rng.int(0, 8)}.${rng.int(1, 8)}`];
    const correctIp = rng.pick(privates);
    const wrong = rng.shuffle(traps).slice(0, 3);
    const options = rng.shuffle([correctIp, ...wrong]);
    const answer = options.indexOf(correctIp);
    const distractors: Record<string, { why: string; error: string }> = {};
    options.forEach((o, i) => {
      if (i !== answer) {
        const c = classifyAddress(parseCidr(o + '/32')!.ip);
        distractors[String(i)] = { why: `${o}: ${c.name}${c.cidr ? ` (${c.cidr})` : ''} – ${c.description}`, error: 'private-bereiche' };
      }
    });
    return {
      id: gid('ipv4.private'), generated: true, kind: 'single', skill: 'ipv4.private', difficulty: d,
      prompt: 'Welche der folgenden Adressen ist eine **private IPv4-Adresse nach RFC 1918**?',
      options, answer, distractors,
      hints: ['Die drei privaten Bereiche: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.', '172.16.0.0/12 reicht von 172.16.0.0 bis 172.31.255.255.'],
      explanation: `**${correctIp}** liegt in einem RFC-1918-Bereich.\n\n| Bereich | von – bis |\n|---|---|\n| 10.0.0.0/8 | 10.0.0.0 – 10.255.255.255 |\n| 172.16.0.0/12 | 172.16.0.0 – 172.31.255.255 |\n| 192.168.0.0/16 | 192.168.0.0 – 192.168.255.255 |\n\n169.254.0.0/16 (APIPA) und 100.64.0.0/10 (CGNAT) sind zwar nicht öffentlich routbar, gehören aber **nicht** zu RFC 1918.`,
    };
  },
};

const sameSubnetGen: GeneratorMeta = {
  id: 'ipv4.samesubnet',
  title: 'Gleiches Subnetz?',
  skill: 'ipv4.network',
  module: 'm05',
  make(rng, d) {
    const { addr, prefix } = randomHostWithPrefix(rng, d);
    const bs = blockSize(prefix);
    const same = rng.bool();
    let other: number;
    if (same) {
      const net = networkAddress(addr, prefix);
      other = net + rng.int(1, Math.max(1, bs - 2));
    } else {
      other = addr + rng.pick([bs, -bs]) + rng.int(-2, 2);
      if (sameSubnet(addr, other, prefix)) other = addr + bs;
    }
    other = other >>> 0;
    const isSame = sameSubnet(addr, other, prefix);
    return {
      id: gid('ipv4.samesubnet'), generated: true, kind: 'single', skill: 'ipv4.network', difficulty: d,
      prompt: `PC1 hat **${ip(addr)}/${prefix}**, PC2 hat **${ip(other)}/${prefix}**. Liegen beide im **selben Subnetz** (können sie ohne Router direkt kommunizieren)?`,
      options: ['Ja, gleiches Subnetz', 'Nein, unterschiedliche Subnetze'],
      answer: isSame ? 0 : 1,
      distractors: { [isSame ? '1' : '0']: { why: `Netz von PC1: ${ip(networkAddress(addr, prefix))}, Netz von PC2: ${ip(networkAddress(other, prefix))} → ${isSame ? 'identisch' : 'verschieden'}.`, error: 'subnetz-zugehoerigkeit' } },
      hints: ['Bestimme für beide Adressen die Netzadresse.', 'Gleiche Netzadresse ⇔ gleiches Subnetz.'],
      explanation: `Netz PC1: **${ip(networkAddress(addr, prefix))}/${prefix}**\n\nNetz PC2: **${ip(networkAddress(other, prefix))}/${prefix}**\n\n${isSame ? 'Identisch → gleiches Subnetz, direkte Kommunikation über den Switch möglich.' : 'Verschieden → Kommunikation nur über einen Router (Standardgateway).'}\n\n${subnetWalkthrough(addr, prefix)}`,
    };
  },
};

/* ------------------------------------------------------------------ */
/* Subnetting                                                          */
/* ------------------------------------------------------------------ */

const hosts2prefix: GeneratorMeta = {
  id: 'subnet.hosts2prefix',
  title: 'Hostbedarf → Präfix',
  skill: 'subnet.hosts2prefix',
  module: 'm05',
  make(rng, d) {
    const pool = d === 1 ? [10, 12, 20, 25, 28, 40, 50, 60, 100, 120] : d === 2 ? [6, 14, 30, 62, 126, 33, 65, 129, 254, 200, 500] : [1000, 2000, 1022, 1023, 4000, 300, 510, 511, 8190];
    const hosts = rng.pick(pool) + (d === 1 ? 0 : rng.pick([0, 0, 1, -1]));
    const p = prefixForHosts(Math.max(1, hosts));
    const h = 32 - p;
    const mcs: { answer: string; error: string; why: string }[] = [];
    // Fehler: +2 vergessen
    for (let pp = 30; pp >= 0; pp--) {
      if (2 ** (32 - pp) >= hosts) {
        if (pp !== p) mcs.push({ answer: `/${pp}`, error: 'reservierte-vergessen', why: `/${pp} hat zwar ${fmtN(2 ** (32 - pp))} Adressen, aber nur ${fmtN(2 ** (32 - pp) - 2)} nutzbare – Netz- und Broadcastadresse müssen abgezogen werden.` });
        break;
      }
    }
    if (p - 1 >= 0) mcs.push({ answer: `/${p - 1}`, error: 'praefix-zu-gross-netz', why: `/${p - 1} würde passen, ist aber doppelt so groß wie nötig. Gesucht ist das **kleinste** passende Netz.` });
    return {
      id: gid('subnet.hosts2prefix'), generated: true, kind: 'cidr', skill: 'subnet.hosts2prefix', difficulty: d,
      prompt: `Ein Subnetz soll **${fmtN(hosts)} Hosts** aufnehmen (inkl. Router-Schnittstelle). Welches ist das **kleinstmögliche** Präfix?`,
      answer: `/${p}`,
      hints: ['Gesucht: kleinstes h mit 2^h − 2 ≥ Hostanzahl.', 'Präfix = 32 − h.'],
      misconceptions: mcs,
      explanation: `Gesucht: kleinstes h mit 2^h − 2 ≥ ${fmtN(hosts)}.\n\n| h | 2^h − 2 |\n|---|---|\n${[h - 1, h].filter((x) => x > 0).map((x) => `| ${x} | ${fmtN(2 ** x - 2)} ${x === h ? '✔' : '✘'} |`).join('\n')}\n\n→ h = ${h} Hostbits → Präfix 32 − ${h} = **/${p}** (Maske ${prefixToMask(p)}).`,
    };
  },
};

const subnetCount: GeneratorMeta = {
  id: 'subnet.count',
  title: 'Anzahl Subnetze / ausgeliehene Bits',
  skill: 'subnet.count',
  module: 'm05',
  make(rng, d) {
    const variant = d === 1 ? 'count' : rng.pick(['count', 'need'] as const);
    if (variant === 'count') {
      const basePrefix = d === 3 ? rng.pick([16, 20, 22]) : 24;
      const newPrefix = basePrefix + rng.int(1, d === 1 ? 4 : 6);
      const bits = newPrefix - basePrefix;
      return {
        id: gid('subnet.count'), generated: true, kind: 'number', skill: 'subnet.count', difficulty: d,
        prompt: `Ein Netz /${basePrefix} wird in Subnetze mit **/${newPrefix}** aufgeteilt. Wie viele Subnetze entstehen?`,
        answer: 2 ** bits,
        hints: ['Ausgeliehene Bits = neues Präfix − altes Präfix.', 'Anzahl Subnetze = 2^ausgeliehene Bits.'],
        misconceptions: [
          { answer: String(2 ** bits - 2), error: 'subnetze-minus-zwei', why: 'Bei Subnetzen wird nichts abgezogen – das −2 gilt nur für Hostadressen innerhalb eines Subnetzes.' },
          { answer: String(bits), error: 'bits-statt-anzahl', why: `${bits} ist die Anzahl der ausgeliehenen Bits. Anzahl Subnetze = 2^${bits}.` },
        ],
        explanation: `Ausgeliehene Bits: ${newPrefix} − ${basePrefix} = **${bits}**\n\nJedes Bit kann 0 oder 1 sein → 2^${bits} = **${2 ** bits} Subnetze**, je ${fmtN(blockSize(newPrefix))} Adressen.`,
      };
    }
    const need = rng.int(3, d === 3 ? 60 : 20);
    const basePrefix = d === 3 ? rng.pick([16, 22]) : 24;
    let bits = 0;
    while (2 ** bits < need) bits++;
    const np = basePrefix + bits;
    return {
      id: gid('subnet.count'), generated: true, kind: 'cidr', skill: 'subnet.count', difficulty: d,
      prompt: `Das Netz 10.${rng.int(0, 200)}.0.0/${basePrefix} soll in **mindestens ${need} gleich große Subnetze** aufgeteilt werden. Welches Präfix haben die Subnetze (möglichst große Subnetze)?`,
      answer: `/${np}`,
      hints: ['Gesucht: kleinste Bitanzahl b mit 2^b ≥ benötigte Subnetze.', `Neues Präfix = ${basePrefix} + b.`],
      misconceptions: [{ answer: `/${np - 1}`, error: 'subnetze-bits', why: `/${np - 1} liefert nur 2^${bits - 1} = ${2 ** (bits - 1)} Subnetze – zu wenig für ${need}.` }],
      explanation: `2^${bits - 1} = ${2 ** (bits - 1)} < ${need} ≤ 2^${bits} = ${2 ** bits} → **${bits} Bits** ausleihen.\n\nNeues Präfix: ${basePrefix} + ${bits} = **/${np}** (${2 ** bits} Subnetze mit je ${fmtN(usableHosts(np))} nutzbaren Hosts).`,
    };
  },
};

const nthSubnetGen: GeneratorMeta = {
  id: 'subnet.nth',
  title: 'n-tes Subnetz bestimmen',
  skill: 'subnet.nth',
  module: 'm05',
  make(rng, d) {
    const { base, basePrefix } = randomPrivateNet(rng, d);
    const newPrefix = basePrefix + rng.int(2, d === 1 ? 3 : d === 2 ? 5 : 7);
    const count = 2 ** (newPrefix - basePrefix);
    const n = rng.int(2, Math.min(count, d === 1 ? 4 : 12));
    const bs = blockSize(newPrefix);
    const net = base + (n - 1) * bs;
    const what = rng.pick(['net', 'bc'] as const);
    const answer = what === 'net' ? ip(net) : ip(net + bs - 1);
    return {
      id: gid('subnet.nth'), generated: true, kind: 'ip', skill: 'subnet.nth', difficulty: d,
      prompt: `Das Netz **${ip(base)}/${basePrefix}** wird in /${newPrefix}-Subnetze aufgeteilt. Wie lautet die **${what === 'net' ? 'Netzadresse' : 'Broadcastadresse'} des ${n}. Subnetzes**? (Das 1. Subnetz beginnt bei ${ip(base)}.)`,
      answer,
      hints: [`Blockgröße bei /${newPrefix}: ${fmtN(bs)} Adressen.`, `Das ${n}. Subnetz beginnt bei Basis + (${n} − 1) · Blockgröße.`],
      misconceptions: [
        { answer: what === 'net' ? ip(base + n * bs) : ip(base + (n + 1) * bs - 1), error: 'subnetz-index', why: `Du hast mit n · Blockgröße gerechnet. Das 1. Subnetz hat den Offset 0, also hat das ${n}. Subnetz den Offset (${n} − 1) · ${fmtN(bs)}.` },
        ...(what === 'bc' ? [{ answer: ip(net + bs), error: 'broadcast-naechstes-netz', why: `${ip(net + bs)} ist schon die Netzadresse des ${n + 1}. Subnetzes. Der Broadcast liegt eine Adresse davor.` }] : []),
      ],
      explanation: `Blockgröße: 2^(32 − ${newPrefix}) = **${fmtN(bs)}**\n\n| Nr. | Netzadresse | Broadcast |\n|---|---|---|\n${Array.from({ length: Math.min(n + 1, count) }, (_, i) => `| ${i + 1} | ${ip(base + i * bs)} | ${ip(base + (i + 1) * bs - 1)} |`).join('\n')}\n\n→ ${n}. Subnetz: **${answer}**`,
    };
  },
};

const blockSizeGen: GeneratorMeta = {
  id: 'subnet.blocksize',
  title: 'Blockgröße / Schrittweite',
  skill: 'subnet.blocksize',
  module: 'm05',
  make(rng, d) {
    let p = d === 1 ? rng.int(25, 29) : d === 2 ? rng.int(17, 30) : rng.int(9, 23);
    if (p % 8 === 0) p += rng.int(1, 6);
    const io = interestingOctet(p);
    const step = io >= 0 ? 256 - octets(prefixToMaskNum(p))[io] : 1;
    return {
      id: gid('subnet.blocksize'), generated: true, kind: 'number', skill: 'subnet.blocksize', difficulty: d,
      prompt: `Bei einer Maske von **/${p}** (${prefixToMask(p)}): In welchen Schritten ändert sich die Netzadresse im **${io + 1}. Oktett** (Schrittweite)?`,
      answer: step,
      hints: ['Schrittweite = 256 − Maskenwert im interessanten Oktett.', `Alternativ: 2^(Hostbits in diesem Oktett).`],
      misconceptions: [{ answer: String(octets(prefixToMaskNum(p))[io]), error: 'blockgroesse', why: 'Das ist der Maskenwert selbst. Die Schrittweite ist 256 minus diesen Wert.' }],
      explanation: `Maskenwert im ${io + 1}. Oktett: ${octets(prefixToMaskNum(p))[io]} (\`${toBinary8(octets(prefixToMaskNum(p))[io])}\`)\n\nSchrittweite: 256 − ${octets(prefixToMaskNum(p))[io]} = **${step}** → Netze beginnen bei 0, ${step}, ${2 * step}, ${3 * step}, … im ${io + 1}. Oktett.`,
    };
  },
};

const subnetTable: GeneratorMeta = {
  id: 'subnet.table',
  title: 'Subnetz-Tabelle ausfüllen',
  skill: 'subnet.table',
  module: 'm05',
  make(rng, d) {
    const { addr, prefix } = randomHostWithPrefix(rng, d);
    const net = networkAddress(addr, prefix);
    const bc = broadcastAddress(addr, prefix);
    const q: TableQuestion = {
      id: gid('subnet.table'), generated: true, kind: 'table', skill: 'subnet.table', difficulty: d,
      prompt: `Für den Host **${ip(addr)}/${prefix}**: Fülle die Tabelle vollständig aus.`,
      columns: [
        { key: 'mask', label: 'Subnetzmaske', type: 'ip' },
        { key: 'net', label: 'Netzadresse', type: 'ip' },
        { key: 'first', label: 'Erster Host', type: 'ip' },
        { key: 'last', label: 'Letzter Host', type: 'ip' },
        { key: 'bc', label: 'Broadcast', type: 'ip' },
        { key: 'hosts', label: 'Nutzbare Hosts', type: 'number' },
      ],
      rows: [
        {
          label: `${ip(addr)}/${prefix}`,
          cells: {
            mask: { answer: prefixToMask(prefix) },
            net: { answer: ip(net) },
            first: { answer: ip(net + 1) },
            last: { answer: ip(bc - 1) },
            bc: { answer: ip(bc) },
            hosts: { answer: String(usableHosts(prefix)) },
          },
        },
      ],
      misconceptions: [
        { cell: 'bc', answer: ip(bc + 1), error: 'broadcast-naechstes-netz', why: `${ip(bc + 1)} ist die nächste Netzadresse – der Broadcast liegt eine Adresse davor.` },
        { cell: 'bc', answer: ip(bc - 1), error: 'broadcast-letzter-host', why: 'Das ist der letzte Host, nicht der Broadcast.' },
        { cell: 'last', answer: ip(bc), error: 'broadcast-letzter-host', why: 'Der Broadcast ist kein nutzbarer Host. Letzter Host = Broadcast − 1.' },
        { cell: 'first', answer: ip(net), error: 'erster-host-netz', why: 'Die Netzadresse ist nicht nutzbar. Erster Host = Netzadresse + 1.' },
        { cell: 'hosts', answer: String(blockSize(prefix)), error: 'reservierte-vergessen', why: 'Netz- und Broadcastadresse abziehen: 2^h − 2.' },
        { cell: 'net', answer: ip(addr), error: 'netz-host-statt-netz', why: 'Netzadresse = IP UND Maske (Hostbits auf 0).' },
      ],
      hints: ['Starte mit der Maske, dann Netzadresse über die Blockgröße.', 'Broadcast = nächste Netzadresse − 1.'],
      explanation: subnetWalkthrough(addr, prefix),
    };
    return q;
  },
};

const subnetSplit: GeneratorMeta = {
  id: 'subnet.split',
  title: 'Netz gleichmäßig aufteilen',
  skill: 'subnet.split',
  module: 'm05',
  make(rng, d) {
    const third = rng.int(0, 254);
    const base = (192 * 2 ** 24 + 168 * 2 ** 16 + third * 256) >>> 0;
    const bits = d === 1 ? rng.int(1, 2) : d === 2 ? rng.int(2, 3) : rng.int(3, 4);
    const np = 24 + bits;
    const bs = blockSize(np);
    const count = 2 ** bits;
    const shown = Math.min(count, 4);
    const rows = Array.from({ length: shown }, (_, i) => ({
      label: `Subnetz ${i + 1}`,
      cells: {
        net: { answer: ip(base + i * bs) },
        first: { answer: ip(base + i * bs + 1) },
        last: { answer: ip(base + (i + 1) * bs - 2) },
        bc: { answer: ip(base + (i + 1) * bs - 1) },
      },
    }));
    return {
      id: gid('subnet.split'), generated: true, kind: 'table', skill: 'subnet.split', difficulty: d,
      prompt: `Das Netz **${ip(base)}/24** wird in **${count} gleich große Subnetze** aufgeteilt (/${np}). Trage für die ${shown === count ? '' : 'ersten ' + shown + ' '}Subnetze Netzadresse, ersten und letzten Host sowie Broadcast ein.`,
      columns: [
        { key: 'net', label: 'Netzadresse', type: 'ip' },
        { key: 'first', label: 'Erster Host', type: 'ip' },
        { key: 'last', label: 'Letzter Host', type: 'ip' },
        { key: 'bc', label: 'Broadcast', type: 'ip' },
      ],
      rows,
      widget: { kind: 'subnet-bar', data: { network: `${ip(base)}`, prefix: 24, minPrefix: 24, maxPrefix: 24, locked: true } },
      hints: [`${count} Subnetze → ${bits} Bit(s) ausleihen → /${np}.`, `Blockgröße: 256 / ${count} = ${bs}.`],
      explanation: `${count} = 2^${bits} → **${bits} Bit(s)** ausleihen → /${np}, Blockgröße ${bs}.\n\n| Nr. | Netz | Hosts | Broadcast |\n|---|---|---|---|\n${Array.from({ length: count }, (_, i) => `| ${i + 1} | ${ip(base + i * bs)} | ${ip(base + i * bs + 1)} – ${ip(base + (i + 1) * bs - 2)} | ${ip(base + (i + 1) * bs - 1)} |`).join('\n')}`,
    };
  },
};

/* ------------------------------------------------------------------ */
/* VLSM                                                                */
/* ------------------------------------------------------------------ */

const SITE_NAMES = ['Hamburg', 'Berlin', 'München', 'Köln', 'Leipzig', 'Bremen', 'Hannover', 'Dresden', 'Kiel', 'Rostock', 'Fulda', 'Ulm'];
const LAN_KINDS = ['Verwaltung', 'Produktion', 'Vertrieb', 'Lager', 'Entwicklung', 'Gäste-WLAN', 'Server', 'VoIP'];

export function makeVlsmTask(rng: Rng, d: Difficulty): VlsmQuestion {
  for (let attempt = 0; attempt < 50; attempt++) {
    const basePrefix = d === 3 ? rng.pick([22, 23, 24]) : 24;
    const base = basePrefix === 24
      ? `192.168.${rng.int(0, 254)}.0/24`
      : `172.${rng.int(16, 31)}.${rng.int(0, 63) * 4}.0/${basePrefix}`;
    const cidr = parseCidr(base)!;
    const baseNorm = `${ip(networkAddress(cidr.ip, cidr.prefix))}/${basePrefix}`;
    const lanCount = d === 1 ? rng.int(2, 3) : d === 2 ? rng.int(3, 4) : rng.int(4, 6);
    const wanCount = d === 1 ? rng.int(0, 1) : rng.int(1, 3);
    const sites = rng.shuffle(SITE_NAMES).slice(0, Math.max(lanCount, 2));
    const space = blockSize(basePrefix);
    const demands: VlsmDemand[] = [];
    for (let i = 0; i < lanCount; i++) {
      const maxHosts = Math.floor(space / (i === 0 ? 2.2 : 4 + i * 2));
      const hosts = rng.int(Math.max(3, Math.floor(maxHosts / 4)), Math.max(4, maxHosts));
      const name = d === 1 ? `${sites[i]}` : rng.bool(0.7) ? sites[i % sites.length] : `${sites[0]} ${rng.pick(LAN_KINDS)}`;
      demands.push({ id: `lan${i + 1}`, name: `LAN ${name}`, hosts, kind: 'lan' });
    }
    for (let i = 0; i < wanCount; i++) {
      demands.push({ id: `wan${i + 1}`, name: `WAN ${sites[i % sites.length]} – ${sites[(i + 1) % sites.length]}`, hosts: 2, kind: 'wan' });
    }
    // eindeutige Namen
    const seen = new Map<string, number>();
    for (const dm of demands) {
      const c = seen.get(dm.name) ?? 0;
      seen.set(dm.name, c + 1);
      if (c) dm.name += ` (${c + 1})`;
    }
    const opts = { wanPrefix: 30 as const };
    const total = totalRequired(demands, opts);
    if (total > space || total < space * (d === 3 ? 0.6 : 0.4)) continue;
    const ref = allocateVlsm(baseNorm, demands, opts)!;
    if (!ref) continue;
    return {
      id: gid('vlsm.plan'), generated: true, kind: 'vlsm', skill: 'vlsm.plan', difficulty: d,
      prompt: `Teile das Netz **${baseNorm}** mit VLSM auf. Vergib für jedes Netz eine Netzadresse und das **kleinstmögliche** Präfix. Punkt-zu-Punkt-WAN-Verbindungen erhalten **/30** (2 nutzbare Adressen). Die Hostangaben enthalten bereits die Router-Schnittstelle.`,
      base: baseNorm, demands, wanPrefix: 30,
      hints: ['Sortiere die Netze absteigend nach Größe.', 'Bestimme für jedes LAN das Präfix über 2^h − 2 ≥ Hosts.', 'Vergib die Netze lückenlos ab der Startadresse – das größte zuerst, dann stimmt die Ausrichtung automatisch.'],
      explanation:
        `**Vorgehen (größte zuerst):**\n\n| Netz | Hosts | Präfix | Blockgröße | Netzadresse | Broadcast |\n|---|---|---|---|---|---|\n` +
        ref.map((r) => `| ${r.name} | ${r.hosts} | /${r.prefix} | ${blockSize(r.prefix)} | ${ip(r.network)} | ${ip(r.network + blockSize(r.prefix) - 1)} |`).join('\n') +
        `\n\nBenötigt: ${fmtN(total)} von ${fmtN(space)} Adressen. Andere Anordnungen sind ebenfalls korrekt, solange jedes Netz auf seiner Blockgrenze beginnt, groß genug ist und sich nichts überschneidet.`,
    };
  }
  throw new Error('VLSM-Aufgabe konnte nicht erzeugt werden');
}

const vlsmGen: GeneratorMeta = { id: 'vlsm.plan', title: 'VLSM-Adressplan erstellen', skill: 'vlsm.plan', module: 'm06', make: makeVlsmTask };

const vlsmPrefixes: GeneratorMeta = {
  id: 'vlsm.prefixes',
  title: 'VLSM: Präfixe dimensionieren',
  skill: 'vlsm.sizing',
  module: 'm06',
  make(rng, d) {
    const task = makeVlsmTask(rng, d);
    return {
      id: gid('vlsm.prefixes'), generated: true, kind: 'table', skill: 'vlsm.sizing', difficulty: d,
      prompt: `Für das Netz **${task.base}** sollen folgende Netze geplant werden. Bestimme für jedes Netz das **kleinstmögliche Präfix** und die **Blockgröße** (WAN: /30).`,
      columns: [
        { key: 'prefix', label: 'Präfix', type: 'cidr' },
        { key: 'size', label: 'Blockgröße', type: 'number' },
      ],
      rows: task.demands.map((dm) => {
        const p = requiredPrefix(dm, { wanPrefix: 30 });
        return { label: `${dm.name} (${dm.hosts} Hosts)`, cells: { prefix: { answer: `/${p}` }, size: { answer: String(blockSize(p)) } } };
      }),
      hints: ['2^h − 2 ≥ Hosts → kleinstes h.', 'Blockgröße = 2^h.'],
      explanation: task.demands.map((dm) => { const p = requiredPrefix(dm, { wanPrefix: 30 }); return `- ${dm.name}: ${dm.hosts} Hosts → 2^${32 - p} − 2 = ${2 ** (32 - p) - 2} ≥ ${dm.hosts} → **/${p}**, Block ${blockSize(p)}`; }).join('\n'),
    };
  },
};

/* ------------------------------------------------------------------ */
/* IPv6                                                                */
/* ------------------------------------------------------------------ */

function randomIpv6(rng: Rng, d: Difficulty): number[] {
  const g: number[] = [0x2001, 0x0db8, rng.int(0, 0xffff), 0, 0, 0, 0, 0];
  if (rng.bool(0.3)) g[0] = rng.pick([0x2a00, 0x2003, 0xfe80, 0xfd00]);
  if (g[0] === 0xfe80) { g[1] = 0; g[2] = 0; g[3] = 0; }
  // Interface-ID mit Nullblöcken
  for (let i = 3; i < 8; i++) g[i] = rng.bool(d === 1 ? 0.5 : 0.4) ? 0 : rng.pick([rng.int(1, 0xf), rng.int(0x10, 0xff), rng.int(0x100, 0xfff), rng.int(0x1000, 0xffff)]);
  if (d >= 2 && rng.bool(0.5)) g[2] = 0;
  if (d === 3 && rng.bool(0.5)) g[1] = rng.pick([0, 0x00a0, 0x0db8]);
  return g;
}

const ipv6Compress: GeneratorMeta = {
  id: 'ipv6.compress',
  title: 'IPv6-Adresse kürzen',
  skill: 'ipv6.compress',
  module: 'm07',
  make(rng, d) {
    let g = randomIpv6(rng, d);
    for (let i = 0; i < 10 && compressIpv6(g) === stripLeadingZeros(expandIpv6(g)); i++) g = randomIpv6(rng, d);
    const full = expandIpv6(g);
    const canon = compressIpv6(g);
    const noLead = stripLeadingZeros(full);
    const mcs: { answer: string; error: string; why: string }[] = [
      { answer: noLead, error: 'ipv6-doppelpunkt-vergessen', why: 'Führende Nullen sind entfernt, aber die längste Folge von Null-Blöcken wurde nicht durch `::` ersetzt.' },
      { answer: full, error: 'ipv6-nicht-gekuerzt', why: 'Das ist die ungekürzte Form.' },
    ];
    return {
      id: gid('ipv6.compress'), generated: true, kind: 'text', skill: 'ipv6.compress', difficulty: d,
      prompt: `Kürze die IPv6-Adresse so weit wie möglich (RFC 5952):\n\n\`${full}\``,
      accept: [canon],
      placeholder: 'z. B. 2001:db8::1',
      widget: d === 1 ? { kind: 'ipv6-compress', data: { address: full } } : undefined,
      hints: ['Regel 1: Führende Nullen in jedem Block weglassen.', 'Regel 2: Die längste Folge aufeinanderfolgender 0-Blöcke (mind. 2) einmalig durch :: ersetzen – bei Gleichstand die erste.'],
      misconceptions: mcs,
      explanation: `1. Führende Nullen entfernen: \`${noLead}\`\n\n2. Längste Null-Block-Folge durch \`::\` ersetzen: **\`${canon}\`**\n\n\`::\` darf nur **einmal** vorkommen, sonst wäre unklar, wie viele Blöcke jeweils fehlen. Ein einzelner 0-Block wird nur zu \`0\`, nicht zu \`::\`.`,
    };
  },
};

const ipv6Expand: GeneratorMeta = {
  id: 'ipv6.expand',
  title: 'IPv6-Adresse vollständig ausschreiben',
  skill: 'ipv6.expand',
  module: 'm07',
  make(rng, d) {
    const g = randomIpv6(rng, d);
    const canon = compressIpv6(g);
    const full = expandIpv6(g);
    return {
      id: gid('ipv6.expand'), generated: true, kind: 'text', skill: 'ipv6.expand', difficulty: d,
      prompt: `Schreibe die IPv6-Adresse **vollständig** aus (8 Blöcke à 4 Hexziffern):\n\n\`${canon}\``,
      accept: [full],
      hints: ['Zähle die vorhandenen Blöcke. :: steht für so viele 0000-Blöcke, dass es insgesamt 8 sind.', 'Fülle jeden Block links mit Nullen auf 4 Stellen auf.'],
      explanation: `Vorhandene Blöcke: ${canon.split('::').map((p) => (p ? p.split(':').length : 0)).reduce((a, b) => a + b, 0)} → \`::\` ersetzt ${8 - canon.split('::').map((p) => (p ? p.split(':').length : 0)).reduce((a, b) => a + b, 0)} Block/Blöcke.\n\nErgebnis: **\`${full}\`**`,
    };
  },
};

const ipv6Subnets: GeneratorMeta = {
  id: 'ipv6.subnets',
  title: 'IPv6-Subnetzplanung',
  skill: 'ipv6.subnets',
  module: 'm07',
  make(rng, d) {
    const prefixes = d === 1 ? [[48, 64], [56, 64]] : d === 2 ? [[48, 64], [48, 56], [56, 64], [60, 64]] : [[48, 52], [44, 48], [48, 60]];
    const [from, to] = rng.pick(prefixes);
    if (d === 1 || rng.bool(0.5)) {
      return {
        id: gid('ipv6.subnets'), generated: true, kind: 'number', skill: 'ipv6.subnets', difficulty: d,
        prompt: `Ein Unternehmen erhält vom Provider das Präfix **/${from}**. Wie viele **/${to}-Subnetze** kann es daraus bilden?`,
        answer: 2 ** (to - from),
        hints: ['Subnetzbits = neues Präfix − altes Präfix.', 'Anzahl = 2^Subnetzbits.'],
        explanation: `${to} − ${from} = ${to - from} Subnetzbits → 2^${to - from} = **${fmtN(2 ** (to - from))}** Subnetze.`,
      };
    }
    const third = rng.int(0x1000, 0xfff0) & 0xfff0;
    const base = [0x2001, 0x0db8, third, 0, 0, 0, 0, 0];
    const n = rng.int(2, 20);
    const sub = ipv6NthSubnet(base, from, to, n - 1);
    const ans = `${compressIpv6(sub)}/${to}`;
    return {
      id: gid('ipv6.subnets'), generated: true, kind: 'text', skill: 'ipv6.subnets', difficulty: d,
      prompt: `Gegeben ist das Präfix **${compressIpv6(base)}/${from}**. Es wird in /${to}-Subnetze aufgeteilt. Wie lautet das **${n}. Subnetz** (gekürzt, mit Präfix)? Das 1. Subnetz ist ${compressIpv6(base)}/${to}.`,
      accept: [ans, compressIpv6(sub)],
      hints: [`Die Subnetz-ID steht in den Bits ${from + 1}–${to}.`, `Das ${n}. Subnetz hat die Subnetz-ID ${n - 1} (hexadezimal ${(n - 1).toString(16)}).`],
      explanation: `Subnetz-ID = ${n} − 1 = ${n - 1} = 0x${(n - 1).toString(16)}, eingesetzt an der Stelle der Bits ${from + 1}–${to}:\n\n**${ans}**`,
    };
  },
};

const ipv6TypeGen: GeneratorMeta = {
  id: 'ipv6.type',
  title: 'IPv6-Adresstyp erkennen',
  skill: 'ipv6.type',
  module: 'm07',
  make(rng, d) {
    const samples: [string, string][] = [
      [`fe80::${rng.int(1, 0xffff).toString(16)}:${rng.int(1, 0xff).toString(16)}ff:fe${rng.int(0x10, 0xff).toString(16)}:${rng.int(1, 0xffff).toString(16)}`, 'Link-Local'],
      [`2a0${rng.int(0, 9)}:${rng.int(0x100, 0xffff).toString(16)}:${rng.int(1, 0xffff).toString(16)}::${rng.int(1, 0xff).toString(16)}`, 'Global Unicast'],
      [`fd${rng.int(0x10, 0xff).toString(16)}:${rng.int(0x100, 0xffff).toString(16)}:${rng.int(1, 0xffff).toString(16)}::${rng.int(1, 0xff).toString(16)}`, 'Unique Local'],
      [`ff02::${rng.pick(['1', '2', '1:2', 'fb'])}`, 'Multicast'],
      ['::1', 'Loopback'],
    ];
    const [addr, type] = rng.pick(samples);
    const opts = ['Global Unicast', 'Link-Local', 'Unique Local', 'Multicast', 'Loopback'];
    const check = ipv6Type(addr);
    const answerType = check === 'Dokumentation' ? 'Global Unicast' : check;
    return {
      id: gid('ipv6.type'), generated: true, kind: 'single', skill: 'ipv6.type', difficulty: d,
      prompt: `Um welchen Adresstyp handelt es sich bei **\`${addr}\`**?`,
      options: opts,
      answer: opts.indexOf(answerType === type ? type : answerType),
      hints: ['Achte auf die ersten Hexziffern: 2/3 → Global, fe80 → Link-Local, fc/fd → ULA, ff → Multicast.'],
      explanation: `| Präfix | Typ |\n|---|---|\n| 2000::/3 | Global Unicast |\n| fe80::/10 | Link-Local |\n| fc00::/7 (praktisch fd00::/8) | Unique Local |\n| ff00::/8 | Multicast |\n| ::1/128 | Loopback |\n\n\`${addr}\` → **${answerType}**`,
    };
  },
};

/* ------------------------------------------------------------------ */
/* Netzwerkberechnungen                                                */
/* ------------------------------------------------------------------ */

const unitsGen: GeneratorMeta = {
  id: 'calc.units',
  title: 'Einheiten umrechnen',
  skill: 'calc.units',
  module: 'm15',
  make(rng, d) {
    const tasks = [
      () => { const v = rng.int(2, 64); return { p: `Wie viele **Bit** sind **${v} Byte**?`, a: v * 8, u: 'Bit', e: `1 Byte = 8 Bit → ${v} · 8 = **${v * 8} Bit**`, mc: [{ answer: String(v / 8), error: 'einheit-bit-byte', why: 'Umgekehrt: Bit sind mehr als Byte – mit 8 multiplizieren.' }] }; },
      () => { const v = rng.pick([100, 250, 500, 1000, 50]); return { p: `Wie viele **Megabit** sind **${v} MB** (Dezimalpräfixe)?`, a: v * 8, u: 'Mbit', e: `${v} MB · 8 = **${v * 8} Mbit**`, mc: [{ answer: String(v), error: 'einheit-bit-byte', why: 'MB (Byte) ≠ Mbit. Mit 8 multiplizieren.' }] }; },
      () => { const v = rng.int(2, 16); return { p: `Wie viele **MiB** sind **${v} GiB**?`, a: v * 1024, u: 'MiB', e: `1 GiB = 1024 MiB (Binärpräfix, 2^10) → ${v} · 1024 = **${fmtN(v * 1024)} MiB**`, mc: [{ answer: String(v * 1000), error: 'einheit-1000-1024', why: 'GiB/MiB sind Binärpräfixe: Faktor 1024, nicht 1000.' }] }; },
      () => { const v = rng.int(2, 9); return { p: `Wie viele **MB** sind **${v} GB** (Dezimalpräfixe nach SI)?`, a: v * 1000, u: 'MB', e: `1 GB = 1000 MB → **${fmtN(v * 1000)} MB**`, mc: [{ answer: String(v * 1024), error: 'einheit-1000-1024', why: 'GB/MB sind Dezimalpräfixe: Faktor 1000. 1024 gilt für GiB/MiB.' }] }; },
      () => { const v = rng.pick([1, 2, 4, 8]); return { p: `Wie viele **Byte** sind **${v} KiB**?`, a: v * 1024, u: 'Byte', e: `1 KiB = 1024 Byte → **${fmtN(v * 1024)} Byte**`, mc: [{ answer: String(v * 1000), error: 'einheit-1000-1024', why: 'KiB = 1024 Byte (Kibibyte).' }] }; },
    ];
    const t = rng.pick(d === 1 ? tasks.slice(0, 2) : tasks)();
    return {
      id: gid('calc.units'), generated: true, kind: 'number', skill: 'calc.units', difficulty: d,
      prompt: t.p, answer: t.a, unit: t.u, misconceptions: t.mc,
      hints: ['1 Byte = 8 Bit.', 'Dezimal (k, M, G): Faktor 1000. Binär (Ki, Mi, Gi): Faktor 1024.'],
      explanation: t.e,
    };
  },
};

const transferTime: GeneratorMeta = {
  id: 'calc.transfertime',
  title: 'Übertragungszeit berechnen',
  skill: 'calc.transfertime',
  module: 'm15',
  make(rng, d) {
    const sizeGB = d === 1 ? rng.pick([1, 2, 5, 10]) : rng.pick([0.5, 1.5, 2, 4, 8, 12, 25]);
    const rate = d === 1 ? rng.pick([100, 1000]) : rng.pick([16, 50, 100, 250, 500, 1000]);
    const overhead = d === 3 ? rng.pick([10, 20]) : 0;
    const eff = rate * (1 - overhead / 100);
    const bits = sizeGB * 1000 * 8; // Mbit
    const t = bits / eff;
    const tR = Math.round(t * 10) / 10;
    return {
      id: gid('calc.transfertime'), generated: true, kind: 'number', skill: 'calc.transfertime', difficulty: d,
      prompt: `Eine Datei mit **${String(sizeGB).replace('.', ',')} GB** soll über eine Leitung mit **${rate} Mbit/s** übertragen werden${overhead ? `. Durch Protokoll-Overhead stehen nur **${100 - overhead} %** der Bandbreite für Nutzdaten zur Verfügung` : ''}. Wie lange dauert die Übertragung in **Sekunden**? (Dezimalpräfixe: 1 GB = 1000 MB; auf eine Nachkommastelle runden)`,
      answer: tR, tolerance: Math.max(0.15, tR * 0.005), unit: 's',
      misconceptions: [
        { answer: String(Math.round((sizeGB * 1000) / eff * 10) / 10), error: 'einheit-bit-byte', why: 'Du hast vergessen, Byte in Bit umzurechnen (· 8). Datenraten werden in **Bit** pro Sekunde angegeben.' },
        { answer: String(Math.round(((sizeGB * 1024 * 8) / eff) * 10) / 10), error: 'einheit-1000-1024', why: 'Laut Aufgabenstellung gilt 1 GB = 1000 MB (Dezimalpräfix).' },
      ],
      hints: ['t = Datenmenge / Datenrate – beide in derselben Einheit (Mbit und Mbit/s).', `${String(sizeGB).replace('.', ',')} GB = ${fmtN(sizeGB * 1000)} MB = ${fmtN(bits)} Mbit.`],
      explanation: `Datenmenge: ${String(sizeGB).replace('.', ',')} GB · 1000 = ${fmtN(sizeGB * 1000)} MB · 8 = **${fmtN(bits)} Mbit**\n\n` +
        (overhead ? `Nutzbare Rate: ${rate} Mbit/s · ${(100 - overhead) / 100} = **${fmtN(eff)} Mbit/s**\n\n` : '') +
        `t = ${fmtN(bits)} Mbit / ${fmtN(eff)} Mbit/s = **${t.toLocaleString('de-DE', { maximumFractionDigits: 2 })} s** (≈ ${(t / 60).toLocaleString('de-DE', { maximumFractionDigits: 1 })} min)`,
    };
  },
};

const rateGen: GeneratorMeta = {
  id: 'calc.rate',
  title: 'Datenrate berechnen',
  skill: 'calc.rate',
  module: 'm15',
  make(rng, d) {
    const sizeMB = rng.pick([100, 200, 250, 500, 750, 1000, 1500]);
    const seconds = rng.pick([10, 20, 40, 50, 80, 100]);
    const rate = (sizeMB * 8) / seconds;
    return {
      id: gid('calc.rate'), generated: true, kind: 'number', skill: 'calc.rate', difficulty: d,
      prompt: `Eine Datei mit **${sizeMB} MB** wurde in **${seconds} Sekunden** übertragen. Wie hoch war die durchschnittliche Datenrate in **Mbit/s**? (1 MB = 1000 kB, auf zwei Nachkommastellen)`,
      answer: Math.round(rate * 100) / 100, tolerance: 0.01, unit: 'Mbit/s',
      misconceptions: [{ answer: String(Math.round((sizeMB / seconds) * 100) / 100), error: 'einheit-bit-byte', why: 'Das ist die Rate in MB/s. In Mbit/s muss noch mit 8 multipliziert werden.' }],
      hints: ['Datenrate = Datenmenge / Zeit.', 'MB → Mbit: · 8.'],
      explanation: `${sizeMB} MB · 8 = ${fmtN(sizeMB * 8)} Mbit\n\n${fmtN(sizeMB * 8)} Mbit / ${seconds} s = **${rate.toLocaleString('de-DE', { maximumFractionDigits: 2 })} Mbit/s**`,
    };
  },
};

/* ------------------------------------------------------------------ */
/* Routing                                                             */
/* ------------------------------------------------------------------ */

const lpmGen: GeneratorMeta = {
  id: 'routing.lpm',
  title: 'Routingentscheidung (Longest Prefix Match)',
  skill: 'routing.lpm',
  module: 'm09',
  make(rng, d) {
    const a = rng.int(1, 200);
    const b = rng.int(0, 200);
    const routes = [
      { dest: `10.${a}.0.0`, prefix: 16, hop: '192.168.100.2', iface: 'G0/1' },
      { dest: `10.${a}.${b}.0`, prefix: 24, hop: '192.168.100.6', iface: 'G0/2' },
      { dest: `10.${a}.${b}.${rng.pick([0, 64, 128])}`, prefix: 26, hop: '192.168.100.10', iface: 'G0/3' },
      { dest: '0.0.0.0', prefix: 0, hop: '203.0.113.1', iface: 'G0/0' },
    ];
    if (d === 3) routes.push({ dest: `10.${a}.${(b + 1) % 256}.0`, prefix: 23, hop: '192.168.100.14', iface: 'G0/4' });
    routes.forEach((r) => (r.dest = ip(networkAddress(parseCidr(`${r.dest}/32`)!.ip, r.prefix))));
    const targets = [
      parseCidr(`${routes[2].dest}/32`)!.ip + rng.int(1, 60),
      parseCidr(`10.${a}.${b}.${rng.int(1, 254)}/32`)!.ip,
      parseCidr(`10.${a}.${(b + 7) % 256}.${rng.int(1, 254)}/32`)!.ip,
      parseCidr(`${rng.pick([8, 151, 217])}.${rng.int(0, 255)}.${rng.int(0, 255)}.${rng.int(1, 254)}/32`)!.ip,
    ];
    const dst = rng.pick(targets);
    const matches = routes.filter((r) => networkAddress(dst, r.prefix) === parseCidr(`${r.dest}/32`)!.ip);
    const best = matches.sort((x, y) => y.prefix - x.prefix)[0];
    const options = routes.map((r) => `${r.hop} (${r.iface})`);
    return {
      id: gid('routing.lpm'), generated: true, kind: 'single', skill: 'routing.lpm', difficulty: d,
      prompt: `Ein Router hat folgende Routingtabelle. An welchen **Next Hop** leitet er ein Paket an **${ip(dst)}** weiter?\n\n| Zielnetz | Präfix | Next Hop | Interface |\n|---|---|---|---|\n${routes.map((r) => `| ${r.dest} | /${r.prefix} | ${r.hop} | ${r.iface} |`).join('\n')}`,
      options,
      answer: routes.indexOf(best),
      distractors: Object.fromEntries(
        routes.map((r, i) => [String(i), { why: matches.includes(r) ? `Der Eintrag ${r.dest}/${r.prefix} passt zwar, aber es gibt einen spezifischeren (längeren) Treffer: ${best.dest}/${best.prefix}.` : `${ip(dst)} liegt nicht in ${r.dest}/${r.prefix}.`, error: matches.includes(r) ? 'routing-nicht-laengster-praefix' : 'routing-netz-falsch' }]).filter(([i]) => Number(i) !== routes.indexOf(best)),
      ),
      hints: ['Prüfe für jeden Eintrag, ob die Zieladresse im Zielnetz liegt (Netzadresse mit dem Präfix bilden).', 'Von allen Treffern gewinnt der mit dem längsten Präfix. 0.0.0.0/0 passt immer (Default Route).'],
      explanation: `Treffer für ${ip(dst)}:\n\n${matches.map((r) => `- ${r.dest}/${r.prefix} ✔`).join('\n')}\n\nLängstes Präfix: **/${best.prefix}** → Next Hop **${best.hop}** über ${best.iface}.`,
    };
  },
};

/* ------------------------------------------------------------------ */

export const GENERATORS: GeneratorMeta[] = [
  dec2bin, bin2dec, hexConv,
  mask2prefix, prefix2mask, privateGen,
  networkGen, broadcastGen, hostCountGen, sameSubnetGen,
  hosts2prefix, subnetCount, nthSubnetGen, blockSizeGen, subnetTable, subnetSplit,
  vlsmGen, vlsmPrefixes,
  ipv6Compress, ipv6Expand, ipv6Subnets, ipv6TypeGen,
  unitsGen, transferTime, rateGen,
  lpmGen,
  ...GENERATORS_HARDWARE,
];

export const GENERATOR_MAP = new Map(GENERATORS.map((g) => [g.id, g]));

export function generate(id: string, difficulty: Difficulty, seed?: number): Question {
  const g = GENERATOR_MAP.get(id);
  if (!g) throw new Error(`Unbekannter Generator: ${id}`);
  const rng = new Rng(seed ?? (Math.random() * 2 ** 32) >>> 0);
  const q = g.make(rng, difficulty);
  // Sicherheitsnetz: Fehlbilder, die zufällig der richtigen Antwort entsprechen, entfernen
  if (q.misconceptions && q.kind !== 'table') {
    q.misconceptions = q.misconceptions.filter((m) => !grade(q, m.answer).correct);
  }
  return q;
}

/** Generatoren, die einen bestimmten Skill trainieren. */
export function generatorsForSkill(skill: string): GeneratorMeta[] {
  return GENERATORS.filter((g) => g.skill === skill);
}

export { isPrivate };
