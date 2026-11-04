/**
 * Werkzeuge: Rechner und Nachschlagetabellen für die AP1-Vorbereitung.
 * Alle Berechnungen laufen über den Rechenkern (src/core) – hier wird nichts nachgebaut.
 */
import React, { useMemo, useState } from 'react';
import {
  addressClass, and32, blockSize, classifyAddress, formatIp, ipToBinary, isPrivate, maskToPrefix, networkAddress, nthSubnet,
  octets, parseCidr, parseIpSafe, parsePrefixInput, prefixForHosts, prefixToMaskNum, subnetInfo, toBinary8, usableHosts,
  wildcardMask,
} from '../core/ipv4';
import {
  bigIntToIpv6, compressIpv6, expandIpv6, ipv6Network, ipv6NthSubnet, ipv6SubnetCount, ipv6ToBigInt, ipv6Type, parseIpv6,
} from '../core/ipv6';
import { allocateVlsm, freeBlocks, requiredPrefix, totalRequired, type AllocatedNet, type VlsmDemand } from '../core/vlsm';
import {
  DATA_UNITS, RATE_UNITS, convertToAll, dataUnitInfo, energyCost, formatHms, formatInBase, formatNumber, groupDigits, hexBreakdown,
  parseDecimal, parseInBase, powerWatts, setBitWeights, transferTime, type Base, type BitWidth, type DataUnit, type OverheadMode,
  type RateUnit,
} from '../core/units';
import { Icon, Progress } from '../components/common';
import { BinaryOctet, BitRow, IpBinary, Ipv6Compress, Legend, VlsmBoxes } from '../components/widgets';

/* ------------------------------------------------------------------ */
/* Kleine Helfer                                                       */
/* ------------------------------------------------------------------ */

const de = (n: number) => n.toLocaleString('de-DE');
const fmtBig = (v: bigint) => v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const eur = (n: number) => n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });

function ErrorHint({ children }: { children: React.ReactNode }) {
  return (
    <div className="hint row" style={{ background: 'var(--bad-soft)', borderColor: 'var(--bad)', alignItems: 'flex-start' }}>
      <span style={{ color: 'var(--bad)', display: 'flex' }}><Icon name="TriangleAlert" size={17} /></span>
      <div>{children}</div>
    </div>
  );
}

function Card({ title, icon, sub, children }: { title: string; icon?: string; sub?: string; children: React.ReactNode }) {
  return (
    <div className="card">
      <div className="card-title">
        {icon && <Icon name={icon} />}
        {title}
        {sub && <span className="muted small">{sub}</span>}
      </div>
      {children}
    </div>
  );
}

function Kv({ rows }: { rows: [string, React.ReactNode][] }) {
  return (
    <table className="table">
      <tbody>
        {rows.map(([k, v]) => (
          <tr key={k}>
            <td className="dim small" style={{ width: '38%' }}>{k}</td>
            <td>{v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Parst eine IPv4-Maske oder ein Präfix und erklärt bei Fehlern, was falsch ist. */
function prefixError(text: string): string {
  const t = text.trim();
  if (!t) return 'Bitte ein Präfix (z. B. /26) oder eine Subnetzmaske (z. B. 255.255.255.192) angeben.';
  if (parseIpSafe(t.replace(/^\//, '')) !== null)
    return `„${t}“ ist keine gültige Subnetzmaske – die Einsen müssen von links lückenlos zusammenhängen (z. B. 255.255.255.192).`;
  return `„${t}“ ist kein gültiges Präfix. Erlaubt sind /0 bis /32 oder eine Maske in Punktnotation.`;
}

function ipError(text: string): string {
  if (!text.trim()) return 'Bitte eine IPv4-Adresse eingeben.';
  return `„${text.trim()}“ ist keine gültige IPv4-Adresse. Erwartet werden vier Oktette 0–255 ohne führende Nullen, z. B. 192.168.10.77.`;
}

type ParsedIp = { ok: true; ip: number; prefix: number } | { ok: false; error: string };

function parseIpAndPrefix(ipText: string, maskText: string): ParsedIp {
  const s = ipText.trim();
  if (s.includes('/')) {
    const i = s.indexOf('/');
    const a = s.slice(0, i);
    const b = s.slice(i + 1);
    const ip = parseIpSafe(a);
    if (ip === null) return { ok: false, error: ipError(a) };
    const p = parsePrefixInput(b);
    if (p === null) return { ok: false, error: prefixError(b) };
    return { ok: true, ip, prefix: p };
  }
  const ip = parseIpSafe(s);
  if (ip === null) return { ok: false, error: ipError(s) };
  const p = parsePrefixInput(maskText);
  if (p === null) return { ok: false, error: prefixError(maskText) };
  return { ok: true, ip, prefix: p };
}

/* ------------------------------------------------------------------ */
/* 1. Subnetzrechner                                                   */
/* ------------------------------------------------------------------ */

const CLASS_INFO: Record<string, string> = {
  A: 'Klasse A (1. Oktett 0–127, Standardmaske /8)',
  B: 'Klasse B (1. Oktett 128–191, Standardmaske /16)',
  C: 'Klasse C (1. Oktett 192–223, Standardmaske /24)',
  D: 'Klasse D (224–239, Multicast)',
  E: 'Klasse E (240–255, reserviert)',
};

function SubnetCalculator() {
  const [ipText, setIpText] = useState('192.168.10.77/26');
  const [maskText, setMaskText] = useState('');
  const [newPrefix, setNewPrefix] = useState(28);

  const parsed = useMemo(() => parseIpAndPrefix(ipText, maskText), [ipText, maskText]);
  const hasSlash = ipText.includes('/');

  const info = useMemo(() => {
    if (!parsed.ok) return null;
    const { ip, prefix } = parsed;
    const si = subnetInfo(ip, prefix);
    return { ip, prefix, si, cls: addressClass(ip), kind: classifyAddress(ip) };
  }, [parsed]);

  const list = useMemo(() => {
    if (!info) return null;
    const np = Math.max(info.prefix, Math.min(32, newPrefix));
    const count = 2 ** (np - info.prefix);
    const shown = Math.min(count, 256);
    const rows = Array.from({ length: shown }, (_, i) => subnetInfo(nthSubnet(info.ip, info.prefix, np, i), np));
    const own = (networkAddress(info.ip, np) - networkAddress(info.ip, info.prefix)) / blockSize(np);
    return { np, count, rows, own };
  }, [info, newPrefix]);

  return (
    <div className="col" style={{ gap: 16 }}>
      <Card title="Subnetzrechner" icon="Calculator" sub="IP-Adresse mit Präfix oder Maske">
        <div className="grid grid-2">
          <label className="field">
            IP-Adresse (optional mit /Präfix)
            <input className={`input mono ${parsed.ok ? '' : ipText.trim() ? 'bad' : ''}`} value={ipText} onChange={(e) => setIpText(e.target.value)} placeholder="192.168.10.77/26" spellCheck={false} />
          </label>
          <label className="field">
            Subnetzmaske oder Präfix {hasSlash && <span className="tiny dim">(wird ignoriert, da /Präfix angegeben)</span>}
            <input className="input mono" value={maskText} onChange={(e) => setMaskText(e.target.value)} placeholder="255.255.255.192 oder /26" disabled={hasSlash} spellCheck={false} />
          </label>
        </div>
        <div className="row wrap mt tiny">
          {['192.168.10.77/26', '10.20.30.40/255.255.240.0', '172.16.5.130/25', '100.70.1.1/10', '192.168.1.5/31'].map((ex) => (
            <button key={ex} className="chip" onClick={() => { setIpText(ex); setMaskText(''); }}>{ex}</button>
          ))}
        </div>
        {!parsed.ok && <div className="mt"><ErrorHint>{parsed.error}</ErrorHint></div>}
      </Card>

      {info && (
        <>
          <div className="grid grid-2">
            <Card title="Ergebnis" icon="ListChecks">
              <Kv
                rows={[
                  ['Eingabe', <span className="mono">{formatIp(info.ip)}/{info.prefix}</span>],
                  ['Netzadresse', <b className="mono" style={{ color: 'var(--net)' }}>{formatIp(info.si.network)}</b>],
                  ['Broadcast', <b className="mono" style={{ color: 'var(--host)' }}>{formatIp(info.si.broadcast)}</b>],
                  ['Erster Host', <span className="mono">{info.si.firstHost !== null ? formatIp(info.si.firstHost) : '–'}</span>],
                  ['Letzter Host', <span className="mono">{info.si.lastHost !== null ? formatIp(info.si.lastHost) : '–'}</span>],
                  ['Subnetzmaske', <span className="mono">{formatIp(info.si.mask)}</span>],
                  ['Maske binär', <span className="mono small">{ipToBinary(info.si.mask)}</span>],
                  ['Wildcard-Maske', <span className="mono">{wildcardMask(info.prefix)}</span>],
                  ['Präfix', <span className="mono">/{info.prefix}</span>],
                  ['Hostbits', <span>{32 - info.prefix}</span>],
                  ['Adressen', <span>2<sup>{32 - info.prefix}</sup> = {de(info.si.size)}</span>],
                  [
                    'Nutzbare Hosts',
                    <span>
                      {info.prefix <= 30 && <>{de(info.si.size)} − 2 = <b>{de(usableHosts(info.prefix))}</b></>}
                      {info.prefix === 31 && <><b>2</b> <span className="tiny dim">(nur Punkt-zu-Punkt nach RFC 3021, klassisch 0)</span></>}
                      {info.prefix === 32 && <><b>1</b> <span className="tiny dim">(Hostroute – eine einzelne Adresse)</span></>}
                    </span>,
                  ],
                  ['Adressklasse (historisch)', <span>{CLASS_INFO[info.cls]}</span>],
                  [
                    'Typ',
                    <span>
                      <span className={`badge ${isPrivate(info.ip) ? 'ok' : ''}`}>{info.kind.name}</span>
                      <div className="tiny dim" style={{ marginTop: 4 }}>{info.kind.description}{info.kind.cidr && ` (${info.kind.cidr})`}</div>
                    </span>,
                  ],
                ]}
              />
              {info.prefix <= 30 && info.ip === info.si.network && <div className="hint mt small">Die eingegebene Adresse ist die <b>Netzadresse</b> – sie kann keinem Host zugewiesen werden.</div>}
              {info.prefix <= 30 && info.ip === info.si.broadcast && <div className="hint mt small">Die eingegebene Adresse ist die <b>Broadcastadresse</b> – sie kann keinem Host zugewiesen werden.</div>}
            </Card>
            <div className="block visual">
              <div className="block-label"><Icon name="Binary" size={14} /> Bitdarstellung</div>
              <IpBinary key={`${info.ip}/${info.prefix}`} ip={formatIp(info.ip)} prefix={info.prefix} />
              <div className="small muted mt">
                Netzadresse = IP <b>UND</b> Maske (alle Hostbits 0). Broadcast = alle Hostbits 1. Erster Host = Netzadresse + 1, letzter Host = Broadcast − 1.
              </div>
            </div>
          </div>

          {list && (
            <Card title="Subnetze auflisten" icon="LayoutGrid" sub={`${formatIp(info.si.network)}/${info.prefix} aufteilen`}>
              <div className="row wrap">
                <label className="field" style={{ minWidth: 200 }}>
                  Neues Präfix
                  <select className="input mono" value={list.np} onChange={(e) => setNewPrefix(+e.target.value)}>
                    {Array.from({ length: 33 - info.prefix }, (_, i) => info.prefix + i).map((p) => (
                      <option key={p} value={p}>/{p} – {de(blockSize(p))} Adressen</option>
                    ))}
                  </select>
                </label>
                <div className="small muted" style={{ flex: 1, minWidth: 240 }}>
                  {list.np - info.prefix} geliehene Bits → 2<sup>{list.np - info.prefix}</sup> = <b>{de(list.count)}</b> Subnetze à {de(blockSize(list.np))} Adressen
                  ({list.np <= 30 ? `${de(usableHosts(list.np))} nutzbar` : list.np === 31 ? '2 nutzbar bei P2P' : '1 Adresse'}).
                  Deine Adresse liegt in Subnetz <b>Nr. {de(list.own + 1)}</b>.
                </div>
              </div>
              <div style={{ overflowX: 'auto', maxHeight: 460, overflowY: 'auto' }} className="mt">
                <table className="table small">
                  <thead><tr><th>Nr.</th><th>Netzadresse</th><th>Erster Host</th><th>Letzter Host</th><th>Broadcast</th></tr></thead>
                  <tbody>
                    {list.rows.map((r, i) => (
                      <tr key={r.network} style={i === list.own ? { background: 'var(--accent-soft)' } : undefined}>
                        <td>{i + 1}</td>
                        <td className="mono">{formatIp(r.network)}/{r.prefix}</td>
                        <td className="mono">{r.firstHost !== null ? formatIp(r.firstHost) : '–'}</td>
                        <td className="mono">{r.lastHost !== null ? formatIp(r.lastHost) : '–'}</td>
                        <td className="mono">{formatIp(r.broadcast)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {list.count > list.rows.length && (
                <div className="tiny dim mt">
                  Es werden die ersten {list.rows.length} von {de(list.count)} Subnetzen angezeigt.
                  {list.own >= list.rows.length && ` Dein Subnetz Nr. ${de(list.own + 1)}: ${formatIp(networkAddress(info.ip, list.np))}/${list.np}.`}
                </div>
              )}
              {list.np >= 31 && <div className="tiny dim mt">Bei /31 sind beide Adressen nutzbar (RFC 3021, Punkt-zu-Punkt), bei /32 ist Netz = Host.</div>}
            </Card>
          )}
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Masken-Tabelle                                                   */
/* ------------------------------------------------------------------ */

function MaskTable() {
  const [filter, setFilter] = useState('');
  const [hover, setHover] = useState<number | null>(null);

  const rows = useMemo(
    () =>
      Array.from({ length: 33 }, (_, p) => {
        const mask = prefixToMaskNum(p);
        const idx = p === 0 ? -1 : Math.floor((p - 1) / 8);
        const oct = idx >= 0 ? octets(mask)[idx] : 0;
        return {
          p,
          mask: formatIp(mask),
          idx,
          bin: idx >= 0 ? toBinary8(oct) : '',
          block: idx >= 0 ? 256 - oct : 0,
          size: blockSize(p),
          usable: usableHosts(p),
        };
      }),
    [],
  );

  const shown = useMemo(() => {
    const f = filter.trim().replace(',', '.');
    if (!f) return rows;
    const exact = /^\/(\d{1,2})$/.exec(f);
    if (exact) return rows.filter((r) => r.p === Number(exact[1]));
    const plain = f.replace(/\./g, '');
    return rows.filter(
      (r) =>
        r.mask.includes(f) ||
        `/${r.p}` === `/${f}` ||
        String(r.size).includes(plain) ||
        String(r.usable).includes(plain) ||
        de(r.size).includes(f),
    );
  }, [filter, rows]);

  return (
    <Card title="Masken-Tabelle /0 – /32" icon="Table">
      <div className="row wrap">
        <input className="input mono" style={{ maxWidth: 320 }} value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter: /27, 255.255.255.224, 62 …" aria-label="Filter" />
        <span className="tiny dim">Blockgröße = 256 − Wert des interessanten Oktetts. Nutzbare Hosts = 2<sup>Hostbits</sup> − 2.</span>
      </div>
      <div style={{ overflowX: 'auto' }} className="mt">
        <table className="table small">
          <thead>
            <tr><th>Präfix</th><th>Subnetzmaske</th><th>Interessantes Oktett (binär)</th><th>Blockgröße</th><th>Adressen</th><th>Nutzbare Hosts</th></tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr
                key={r.p}
                onMouseEnter={() => setHover(r.p)}
                onMouseLeave={() => setHover(null)}
                style={{ background: hover === r.p ? 'var(--accent-soft)' : r.p % 8 === 0 ? 'var(--surface-2)' : undefined, transition: 'background 0.1s' }}
              >
                <td className="mono"><b>/{r.p}</b></td>
                <td className="mono">{r.mask}</td>
                <td className="mono">{r.idx >= 0 ? <>{r.bin} <span className="tiny dim">({r.idx + 1}. Oktett)</span></> : '–'}</td>
                <td className="mono">{r.idx >= 0 ? <>{r.block} <span className="tiny dim">im {r.idx + 1}. Oktett</span></> : '–'}</td>
                <td className="mono">{de(r.size)}</td>
                <td className="mono">
                  {de(r.usable)}
                  {r.p === 31 && <span className="tiny dim"> (2 bei P2P, RFC 3021)</span>}
                  {r.p === 32 && <span className="tiny dim"> (Hostroute)</span>}
                </td>
              </tr>
            ))}
            {shown.length === 0 && <tr><td colSpan={6} className="dim">Kein Eintrag passt zum Filter.</td></tr>}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Binär / Hex / Dezimal                                            */
/* ------------------------------------------------------------------ */

const BASES: { base: Base; label: string; placeholder: string }[] = [
  { base: 10, label: 'Dezimal', placeholder: '200' },
  { base: 2, label: 'Binär', placeholder: '1100 1000' },
  { base: 16, label: 'Hexadezimal', placeholder: 'C8' },
];

function BaseConverter() {
  const [width, setWidth] = useState<BitWidth>(8);
  const [src, setSrc] = useState<Base>(10);
  const [text, setText] = useState('200');

  const parsed = useMemo(() => parseInBase(text, src, width), [text, src, width]);
  const value = 'value' in parsed ? parsed.value : null;

  const display = (b: Base) => {
    if (b === src) return text;
    if (value === null) return '';
    if (b === 2) return groupDigits(formatInBase(value, 2, width), 4);
    return formatInBase(value, b, width);
  };

  const toggleBit = (k: number) => {
    if (value === null) return;
    const w = 2 ** k;
    const nv = Math.floor(value / w) % 2 === 1 ? value - w : value + w;
    setSrc(2);
    setText(groupDigits(formatInBase(nv, 2, width), 4));
  };

  const bits = value !== null ? formatInBase(value, 2, width).split('') : [];
  const groups: number[][] = [];
  for (let g = 0; g < width / 8; g++) groups.push(Array.from({ length: 8 }, (_, i) => g * 8 + i));

  return (
    <Card title="Zahlensysteme umrechnen" icon="Binary">
      <div className="row wrap">
        <span className="small muted">Bitbreite:</span>
        <div className="tabs">
          {([8, 16, 32] as BitWidth[]).map((w) => (
            <button key={w} className={`tab ${width === w ? 'active' : ''}`} onClick={() => setWidth(w)}>{w} Bit</button>
          ))}
        </div>
        <span className="tiny dim">Wertebereich 0 – {de(2 ** width - 1)}</span>
      </div>
      <div className="grid grid-3 mt">
        {BASES.map((b) => (
          <label key={b.base} className="field">
            {b.label} {b.base === 10 && width === 32 && <span className="tiny dim">(auch 192.168.1.1)</span>}
            <input
              className={`input mono ${b.base === src && value === null ? 'bad' : ''}`}
              value={display(b.base)}
              onChange={(e) => { setSrc(b.base); setText(e.target.value); }}
              placeholder={b.placeholder}
              spellCheck={false}
            />
          </label>
        ))}
      </div>
      {'error' in parsed && <div className="mt"><ErrorHint>{parsed.error}</ErrorHint></div>}

      {value !== null && (
        <div className="col mt" style={{ gap: 14 }}>
          <div>
            <div className="small muted" style={{ marginBottom: 6 }}>Stellenwerte (Bit anklicken zum Umschalten)</div>
            <div className="row wrap" style={{ gap: 14, alignItems: 'flex-start' }}>
              {groups.map((g, gi) => (
                <div key={gi} style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 34px)', gap: 3, textAlign: 'center' }}>
                  {g.map((i) => {
                    const k = width - 1 - i;
                    return (
                      <div key={`w${i}`} className="tiny dim mono" title={`2^${k} = ${de(2 ** k)}`}>
                        {width === 8 ? 2 ** k : <>2<sup>{k}</sup></>}
                      </div>
                    );
                  })}
                  {g.map((i) => (
                    <div key={`b${i}`} className={`bit click ${bits[i] === '1' ? 'net one' : 'plain'}`} style={{ width: 34 }} onClick={() => toggleBit(width - 1 - i)} title={`Stellenwert ${de(2 ** (width - 1 - i))}`}>
                      {bits[i]}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="mono small">
            = {setBitWeights(value, width).map(de).join(' + ') || '0'} = <b>{de(value)}</b>
          </div>
          {width === 32 && <div className="small">Als IPv4-Adresse: <b className="mono">{formatIp(value)}</b></div>}
          <div style={{ overflowX: 'auto' }}>
            <table className="table small" style={{ width: 'auto' }}>
              <thead><tr><th>Hex-Ziffer</th><th>Wert</th><th>× Stellenwert</th><th>= Beitrag</th><th>Nibble (4 Bit)</th></tr></thead>
              <tbody>
                {hexBreakdown(value, width).map((h, i) => (
                  <tr key={i}>
                    <td className="mono"><b>{h.digit}</b></td>
                    <td className="mono">{h.digitValue}</td>
                    <td className="mono">16<sup>{h.power}</sup> = {de(h.weight)}</td>
                    <td className="mono">{de(h.digitValue * h.weight)}</td>
                    <td className="mono">{h.nibble}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="tiny dim">Merke: Eine Hex-Ziffer entspricht genau 4 Bit (einem Nibble), zwei Hex-Ziffern einem Byte.</div>
        </div>
      )}
    </Card>
  );
}

function parseIpOrMask(s: string): number | null {
  const ip = parseIpSafe(s);
  if (ip !== null) return ip;
  const p = parsePrefixInput(s);
  return p === null ? null : prefixToMaskNum(p);
}

function AndCalculator() {
  const [a, setA] = useState('192.168.10.77');
  const [b, setB] = useState('255.255.255.192');
  const res = useMemo(() => {
    const x = parseIpOrMask(a);
    const y = parseIpOrMask(b);
    if (x === null || y === null) return null;
    return { x, y, r: and32(x, y), maskPrefix: maskToPrefix(y) };
  }, [a, b]);
  return (
    <Card title="Bitweises UND (AND)" icon="Network" sub="z. B. IP-Adresse UND Subnetzmaske">
      <div className="grid grid-2">
        <label className="field">
          Wert A
          <input className={`input mono ${parseIpOrMask(a) === null ? 'bad' : ''}`} value={a} onChange={(e) => setA(e.target.value)} spellCheck={false} />
        </label>
        <label className="field">
          Wert B (Adresse, Maske oder /Präfix)
          <input className={`input mono ${parseIpOrMask(b) === null ? 'bad' : ''}`} value={b} onChange={(e) => setB(e.target.value)} spellCheck={false} />
        </label>
      </div>
      {!res ? (
        <div className="mt"><ErrorHint>Bitte zwei gültige Werte eingeben: IPv4-Adressen/Masken in Punktnotation (z. B. 255.255.255.0) oder ein Präfix wie /24.</ErrorHint></div>
      ) : (
        <div className="col mt" style={{ gap: 10 }}>
          <div style={{ overflowX: 'auto' }}>
            <table className="table" style={{ width: 'auto' }}>
              <tbody>
                <tr><td className="dim small">A</td><td><BitRow value={res.x} /></td><td className="mono">{formatIp(res.x)}</td></tr>
                <tr><td className="dim small">B</td><td><BitRow value={res.y} /></td><td className="mono">{formatIp(res.y)}</td></tr>
                <tr><td className="dim small"><b>A UND B</b></td><td><BitRow value={res.r} prefix={res.maskPrefix ?? undefined} /></td><td className="mono"><b>{formatIp(res.r)}</b></td></tr>
              </tbody>
            </table>
          </div>
          <div className="small muted">Regel: Nur wo <b>beide</b> Bits 1 sind, ist das Ergebnis 1 (1∧1 = 1, sonst 0).</div>
          {res.maskPrefix !== null && (
            <div className="row wrap between">
              <span className="small">B ist eine gültige Maske (/{res.maskPrefix}) → das Ergebnis ist die <b>Netzadresse</b> {formatIp(res.r)}/{res.maskPrefix}.</span>
              <Legend />
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

function BinaryTools() {
  return (
    <div className="col" style={{ gap: 16 }}>
      <BaseConverter />
      <div className="grid grid-2">
        <Card title="Oktett-Trainer" icon="ToggleLeft" sub="Bits anklicken">
          <BinaryOctet value={192} editable />
          <div className="tiny dim mt">Stellenwerte eines Oktetts: 128 · 64 · 32 · 16 · 8 · 4 · 2 · 1 (Summe 255).</div>
        </Card>
        <AndCalculator />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. VLSM-Planer                                                      */
/* ------------------------------------------------------------------ */

interface DemandRow { id: string; name: string; hosts: string; kind: 'lan' | 'wan' }

const VLSM_EXAMPLE: DemandRow[] = [
  { id: 'd1', name: 'Verwaltung', hosts: '50', kind: 'lan' },
  { id: 'd2', name: 'Vertrieb', hosts: '25', kind: 'lan' },
  { id: 'd3', name: 'Technik', hosts: '12', kind: 'lan' },
  { id: 'd4', name: 'WAN R1–R2', hosts: '2', kind: 'wan' },
];

const MAX_HOSTS = 2 ** 32 - 2;

function hostsError(r: DemandRow): string | null {
  if (r.kind === 'wan') return null;
  const t = r.hosts.trim();
  if (!/^\d+$/.test(t)) return 'Ganze Zahl ≥ 1 eingeben';
  const n = Number(t);
  if (n < 1) return 'Mindestens 1 Host';
  if (n > MAX_HOSTS) return 'Zu viele Hosts für IPv4';
  return null;
}

function VlsmPlanner() {
  const [base, setBase] = useState('192.168.10.0/24');
  const [wanPrefix, setWanPrefix] = useState<30 | 31>(30);
  const [rows, setRows] = useState<DemandRow[]>(VLSM_EXAMPLE);
  const [nextId, setNextId] = useState(5);

  const update = (id: string, patch: Partial<DemandRow>) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const add = () => { setRows((rs) => [...rs, { id: `d${nextId}`, name: `Netz ${rs.length + 1}`, hosts: '10', kind: 'lan' }]); setNextId((n) => n + 1); };
  const remove = (id: string) => setRows((rs) => rs.filter((r) => r.id !== id));

  const result = useMemo(() => {
    const b = parseCidr(base);
    if (!b) return { error: `„${base.trim()}“ ist kein gültiges Ausgangsnetz. Format: Netzadresse/Präfix, z. B. 192.168.10.0/24.` } as const;
    if (rows.length === 0) return { error: 'Füge mindestens ein Netz hinzu.' } as const;
    if (rows.some((r) => hostsError(r) !== null)) return { error: 'Bitte die rot markierten Hostzahlen korrigieren.' } as const;
    const net = networkAddress(b.ip, b.prefix);
    const baseStr = `${formatIp(net)}/${b.prefix}`;
    const opts = { wanPrefix };
    const demands: VlsmDemand[] = rows.map((r, i) => ({
      id: r.id,
      name: r.name.trim() || `Netz ${i + 1}`,
      hosts: r.kind === 'wan' ? 2 : Number(r.hosts.trim()),
      kind: r.kind,
    }));
    const needed = totalRequired(demands, opts);
    const available = blockSize(b.prefix);
    const tooBig = demands.filter((d) => requiredPrefix(d, opts) < b.prefix);
    const plan = allocateVlsm(baseStr, demands, opts);
    const free = plan ? freeBlocks(baseStr, plan) : [];
    return { b, net, baseStr, aligned: net === b.ip, demands, needed, available, tooBig, plan, free, opts } as const;
  }, [base, rows, wanPrefix]);

  const ok = !('error' in result);

  return (
    <div className="col" style={{ gap: 16 }}>
      <Card title="VLSM-Planer" icon="LayoutGrid" sub="größte Netze zuerst, lückenlos ab Netzanfang">
        <div className="grid grid-2">
          <label className="field">
            Ausgangsnetz
            <input className={`input mono ${parseCidr(base) ? '' : 'bad'}`} value={base} onChange={(e) => setBase(e.target.value)} placeholder="192.168.10.0/24" spellCheck={false} />
          </label>
          <label className="field">
            Präfix für WAN-/Punkt-zu-Punkt-Netze
            <select className="input" value={wanPrefix} onChange={(e) => setWanPrefix(+e.target.value === 31 ? 31 : 30)}>
              <option value={30}>/30 – 4 Adressen, 2 nutzbar (klassisch)</option>
              <option value={31}>/31 – 2 Adressen, beide nutzbar (RFC 3021)</option>
            </select>
          </label>
        </div>
        {ok && !result.aligned && (
          <div className="hint mt small">{base.trim()} ist keine Netzadresse – gerechnet wird mit <b className="mono">{result.baseStr}</b>.</div>
        )}
        <div style={{ overflowX: 'auto' }} className="mt">
          <table className="table small">
            <thead><tr><th>Name</th><th>Typ</th><th>Benötigte Hosts</th><th>Präfix</th><th></th></tr></thead>
            <tbody>
              {rows.map((r) => {
                const err = hostsError(r);
                let need = '–';
                if (!err) need = r.kind === 'wan' ? `/${wanPrefix}` : `/${prefixForHosts(Number(r.hosts.trim()))}`;
                return (
                  <tr key={r.id}>
                    <td><input className="input" value={r.name} onChange={(e) => update(r.id, { name: e.target.value })} aria-label="Name" /></td>
                    <td style={{ width: 120 }}>
                      <select className="input" value={r.kind} onChange={(e) => update(r.id, { kind: e.target.value === 'wan' ? 'wan' : 'lan' })} aria-label="Typ">
                        <option value="lan">LAN</option>
                        <option value="wan">WAN (P2P)</option>
                      </select>
                    </td>
                    <td style={{ width: 170 }}>
                      {r.kind === 'wan' ? (
                        <span className="dim">2 (Router-Schnittstellen)</span>
                      ) : (
                        <>
                          <input className={`input mono ${err ? 'bad' : ''}`} value={r.hosts} onChange={(e) => update(r.id, { hosts: e.target.value })} inputMode="numeric" aria-label="Hosts" />
                          {err && <div className="tiny" style={{ color: 'var(--bad)' }}>{err}</div>}
                        </>
                      )}
                    </td>
                    <td className="mono" style={{ width: 70 }}>{need}</td>
                    <td style={{ width: 50 }}>
                      <button className="btn ghost sm" onClick={() => remove(r.id)} title="Netz entfernen" aria-label="Netz entfernen"><Icon name="Trash2" size={15} /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="row wrap mt">
          <button className="btn sm primary" onClick={add}><Icon name="Plus" size={15} /> Netz hinzufügen</button>
          <button className="btn sm ghost" onClick={() => { setRows(VLSM_EXAMPLE); setBase('192.168.10.0/24'); setWanPrefix(30); }}><Icon name="RotateCcw" size={15} /> Beispiel laden</button>
          <button className="btn sm ghost" onClick={() => setRows([])}>Alle entfernen</button>
        </div>
        {'error' in result && <div className="mt"><ErrorHint>{result.error}</ErrorHint></div>}
      </Card>

      {ok && (
        <>
          <Card title="Machbarkeit" icon="Gauge">
            <div className="small">
              Benötigt: {result.demands.map((d) => de(blockSize(requiredPrefix(d, result.opts)))).join(' + ')} = <b>{de(result.needed)}</b> Adressen ·
              verfügbar in {result.baseStr}: <b>{de(result.available)}</b> Adressen ({formatNumber(Math.round((result.needed / result.available) * 1000) / 10)} %)
            </div>
            <div className="mt"><Progress value={result.needed / result.available} ok={!!result.plan} /></div>
            {result.plan ? (
              <div className="block summary mt small">Der Bedarf passt ins Ausgangsnetz. Es bleiben {de(result.available - result.needed)} Adressen frei.</div>
            ) : (
              <div className="mt">
                <ErrorHint>
                  {result.tooBig.length > 0
                    ? `Passt nicht: ${result.tooBig.map((d) => `„${d.name}“ braucht allein ein /${requiredPrefix(d, result.opts)}`).join(', ')} – das ist größer als das Ausgangsnetz /${result.b.prefix}.`
                    : `Passt nicht: Es werden ${de(result.needed)} Adressen benötigt, aber nur ${de(result.available)} sind verfügbar (${de(result.needed - result.available)} zu viel). Wähle ein größeres Ausgangsnetz oder reduziere den Bedarf.`}
                </ErrorHint>
              </div>
            )}
          </Card>

          {result.plan && (
            <>
              <Card title="Adressplan" icon="ListChecks">
                <div style={{ overflowX: 'auto' }}>
                  <table className="table small">
                    <thead>
                      <tr><th>Netz</th><th>Bedarf</th><th>Präfix / Maske</th><th>Netzadresse</th><th>Erster Host</th><th>Letzter Host</th><th>Broadcast</th><th>Nutzbar</th><th>Reserve</th></tr>
                    </thead>
                    <tbody>
                      {result.plan.map((n: AllocatedNet) => {
                        const si = subnetInfo(n.network, n.prefix);
                        const usable = n.kind === 'wan' ? 2 : usableHosts(n.prefix);
                        return (
                          <tr key={n.id}>
                            <td><b>{n.name}</b> <span className="tiny dim">{n.kind === 'wan' ? 'WAN' : 'LAN'}</span></td>
                            <td>{de(n.hosts)}</td>
                            <td className="mono">/{n.prefix} <span className="tiny dim">{formatIp(prefixToMaskNum(n.prefix))}</span></td>
                            <td className="mono">{formatIp(n.network)}</td>
                            <td className="mono">{si.firstHost !== null ? formatIp(si.firstHost) : '–'}</td>
                            <td className="mono">{si.lastHost !== null ? formatIp(si.lastHost) : '–'}</td>
                            <td className="mono">{formatIp(si.broadcast)}</td>
                            <td>{de(usable)}</td>
                            <td>{de(usable - n.hosts)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {result.opts.wanPrefix === 31 && result.plan.some((n) => n.kind === 'wan') && (
                  <div className="tiny dim mt">/31-WAN-Netze: Netz- und Broadcastadresse entfallen, beide Adressen sind Router-Schnittstellen (RFC 3021).</div>
                )}
                {result.free.length > 0 && (
                  <div className="small mt">
                    <b>Freie Bereiche:</b>{' '}
                    {result.free.map((f) => `${formatIp(f.start)} – ${formatIp(f.end - 1)} (${de(f.end - f.start)} Adressen)`).join(' · ')}
                  </div>
                )}
              </Card>
              <div className="block visual">
                <div className="block-label"><Icon name="LayoutGrid" size={14} /> Aufteilung des Ausgangsnetzes</div>
                <VlsmBoxes
                  network={formatIp(result.net)}
                  prefix={result.b.prefix}
                  plan={result.plan.map((n) => ({ name: n.kind === 'wan' ? `${n.name} (WAN)` : `${n.name} (${n.hosts})`, network: n.network, prefix: n.prefix }))}
                />
              </div>
              <div className="block explain">
                <div className="block-label">So rechnet der Planer</div>
                <div className="small">
                  1. Für jedes LAN das kleinste Präfix suchen, bei dem 2<sup>Hostbits</sup> − 2 ≥ Hosts gilt. WAN-Netze bekommen /{result.opts.wanPrefix}.
                  2. Netze nach Größe absteigend sortieren. 3. Ab der Netzadresse lückenlos vergeben – die nächste Netzadresse ist immer Broadcast + 1.
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5. IPv6                                                             */
/* ------------------------------------------------------------------ */

function Ipv6Tool() {
  const [input, setInput] = useState('2001:db8:abcd:12::1/48');
  const [targetText, setTargetText] = useState('64');
  const [indexText, setIndexText] = useState('5');

  const parsed = useMemo(() => {
    const s = input.trim();
    const i = s.indexOf('/');
    if (i < 0) return { error: 'Bitte Adresse mit Präfix angeben, z. B. 2001:db8:abcd::/48.' } as const;
    const g = parseIpv6(s.slice(0, i));
    if (!g) return { error: `„${s.slice(0, i)}“ ist keine gültige IPv6-Adresse.` } as const;
    const pt = s.slice(i + 1).trim();
    if (!/^\d{1,3}$/.test(pt) || Number(pt) > 128) return { error: `„/${pt}“ ist kein gültiges IPv6-Präfix (0–128).` } as const;
    const p = Number(pt);
    const net = ipv6Network(g, p);
    const hostBits = BigInt(128 - p);
    const last = bigIntToIpv6(ipv6ToBigInt(net) | ((1n << hostBits) - 1n));
    return { g, p, net, last, addresses: 1n << hostBits } as const;
  }, [input]);

  const nth = useMemo(() => {
    if ('error' in parsed) return null;
    const t = targetText.trim().replace(/^\//, '');
    if (!/^\d{1,3}$/.test(t)) return { error: 'Ziel-Präfix muss eine Zahl sein.' } as const;
    const tp = Number(t);
    if (tp < parsed.p || tp > 128) return { error: `Ziel-Präfix muss zwischen /${parsed.p} und /128 liegen.` } as const;
    const count = ipv6SubnetCount(parsed.p, tp);
    const it = indexText.trim();
    if (!/^\d+$/.test(it)) return { error: 'Index muss eine ganze Zahl ≥ 0 sein.' } as const;
    const idx = BigInt(it);
    if (idx >= count) return { error: `Index zu groß – es gibt nur ${fmtBig(count)} Subnetze (Index 0 bis ${fmtBig(count - 1n)}).` } as const;
    const first = [0n, 1n, 2n, 3n].filter((x) => x < count).map((x) => compressIpv6(ipv6NthSubnet(parsed.g, parsed.p, tp, x)));
    return { tp, count, idx, subnet: ipv6NthSubnet(parsed.g, parsed.p, tp, idx), first, lastSub: compressIpv6(ipv6NthSubnet(parsed.g, parsed.p, tp, count - 1n)) } as const;
  }, [parsed, targetText, indexText]);

  return (
    <div className="grid grid-2">
      <Card title="IPv6 kürzen & erweitern" icon="Globe">
        <Ipv6Compress address="2001:0db8:0000:0000:0000:ff00:0042:8329" />
        <div className="tiny dim mt">
          Regeln (RFC 5952): führende Nullen je Block weglassen; die längste Folge von Null-Blöcken (mind. 2) einmal durch :: ersetzen; Kleinbuchstaben.
        </div>
      </Card>
      <Card title="IPv6-Präfixrechner" icon="Network">
        <label className="field">
          Adresse/Präfix
          <input className={`input mono ${'error' in parsed ? 'bad' : ''}`} value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
        </label>
        <div className="row wrap mt tiny">
          {['2001:db8:abcd:12::1/48', '2001:db8:1234::/56', 'fd00:1:2:3::10/64', '2001:db8::/32'].map((ex) => (
            <button key={ex} className="chip" onClick={() => setInput(ex)}>{ex}</button>
          ))}
        </div>
        {'error' in parsed ? (
          <div className="mt"><ErrorHint>{parsed.error}</ErrorHint></div>
        ) : (
          <div className="mt">
            <Kv
              rows={[
                ['Netz (Präfix)', <b className="mono">{compressIpv6(parsed.net)}/{parsed.p}</b>],
                ['Netz vollständig', <span className="mono small">{expandIpv6(parsed.net)}</span>],
                ['Letzte Adresse', <span className="mono small">{compressIpv6(parsed.last)}</span>],
                ['Adresstyp', <span>{ipv6Type(parsed.g)}</span>],
                ['Adressen', <span>2<sup>{128 - parsed.p}</sup>{128 - parsed.p <= 64 && <> = {fmtBig(parsed.addresses)}</>}</span>],
                [
                  'Anzahl /64-Subnetze',
                  parsed.p <= 64 ? (
                    <span>2<sup>{64 - parsed.p}</sup> = <b>{fmtBig(ipv6SubnetCount(parsed.p, 64))}</b></span>
                  ) : (
                    <span className="dim">keins – das Präfix ist länger als /64</span>
                  ),
                ],
              ]}
            />
            <div className="small muted mt">Jede Hex-Ziffer = 4 Bit. Bei /48 bleiben die ersten 3 Blöcke fest, bei /64 die ersten 4.</div>
          </div>
        )}
      </Card>
      {!('error' in parsed) && (
        <div style={{ gridColumn: '1 / -1' }}>
          <Card title="n-tes Subnetz berechnen" icon="LayoutGrid">
            <div className="row wrap">
              <label className="field" style={{ width: 160 }}>
                Ziel-Präfix
                <input className="input mono" value={targetText} onChange={(e) => setTargetText(e.target.value)} placeholder="64" />
              </label>
              <label className="field" style={{ width: 220 }}>
                Index (0 = erstes Subnetz)
                <input className="input mono" value={indexText} onChange={(e) => setIndexText(e.target.value)} inputMode="numeric" />
              </label>
            </div>
            {nth && 'error' in nth && <div className="mt"><ErrorHint>{nth.error}</ErrorHint></div>}
            {nth && !('error' in nth) && (
              <div className="col mt">
                <div className="small">
                  /{parsed.p} → /{nth.tp}: {nth.tp - parsed.p} Subnetz-Bits → 2<sup>{nth.tp - parsed.p}</sup> = <b>{fmtBig(nth.count)}</b> Subnetze.
                </div>
                <div>
                  Subnetz mit Index {fmtBig(nth.idx)} (das {fmtBig(nth.idx + 1n)}. Subnetz):{' '}
                  <b className="mono" style={{ color: 'var(--ok)' }}>{compressIpv6(nth.subnet)}/{nth.tp}</b>
                </div>
                <div className="tiny dim">
                  Rechnung: Netzadresse + Index × 2<sup>{128 - nth.tp}</sup>. Index {fmtBig(nth.idx)} in Hex = {nth.idx.toString(16)}.
                </div>
                <div className="small">
                  <span className="dim">Erste Subnetze:</span>{' '}
                  {nth.first.map((f) => <span key={f} className="mono" style={{ marginRight: 12 }}>{f}/{nth.tp}</span>)}
                  {nth.count > 4n && <> … <span className="dim">letztes:</span> <span className="mono">{nth.lastSub}/{nth.tp}</span></>}
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Übertragung & Einheiten                                          */
/* ------------------------------------------------------------------ */

function DataConverter() {
  const [valText, setValText] = useState('1');
  const [unit, setUnit] = useState<DataUnit>('GB');
  const v = parseDecimal(valText);
  const rows = useMemo(() => (v !== null && v >= 0 ? convertToAll(v, unit) : null), [v, unit]);
  return (
    <Card title="Datenmengen umrechnen" icon="HardDrive">
      <div className="row wrap">
        <input className={`input mono ${rows ? '' : 'bad'}`} style={{ maxWidth: 200 }} value={valText} onChange={(e) => setValText(e.target.value)} inputMode="decimal" aria-label="Wert" />
        <select className="input" style={{ maxWidth: 200 }} value={unit} onChange={(e) => setUnit(e.target.value as DataUnit)} aria-label="Einheit">
          {DATA_UNITS.map((d) => <option key={d.unit} value={d.unit}>{d.label}</option>)}
        </select>
      </div>
      {!rows ? (
        <div className="mt"><ErrorHint>Bitte eine Zahl ≥ 0 eingeben (Komma oder Punkt als Dezimaltrenner).</ErrorHint></div>
      ) : (
        <table className="table small mt">
          <thead><tr><th>Einheit</th><th>Wert</th><th>Definition</th></tr></thead>
          <tbody>
            {rows.map((r) => {
              const info = dataUnitInfo(r.unit);
              return (
                <tr key={r.unit} style={r.unit === unit ? { background: 'var(--accent-soft)' } : undefined}>
                  <td>{info.label} {info.kind === 'binär' && <span className="badge">IEC</span>}</td>
                  <td className="mono"><b>{formatNumber(r.value, 9)}</b></td>
                  <td className="tiny dim">{info.factorText}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div className="tiny dim mt">Dezimal (SI): k = 1000, M = 1000², G = 1000³ · Binär (IEC): Ki = 1024, Mi = 1024², Gi = 1024³ · 1 Byte = 8 bit</div>
    </Card>
  );
}

function sizeToBitsText(v: number, unit: DataUnit): string {
  if (unit === 'bit') return `${formatNumber(v)} bit`;
  if (unit === 'B') return `${formatNumber(v)} × 8 bit`;
  return `${formatNumber(v)} × ${dataUnitInfo(unit).factorText.replace(' Byte', '')} × 8 bit`;
}

function TransferCalculator() {
  const [sizeText, setSizeText] = useState('2');
  const [sizeUnit, setSizeUnit] = useState<DataUnit>('GB');
  const [rateText, setRateText] = useState('100');
  const [rateUnit, setRateUnit] = useState<RateUnit>('Mbit/s');
  const [ohText, setOhText] = useState('0');
  const [mode, setMode] = useState<OverheadMode>('size');

  const calc = useMemo(() => {
    const size = parseDecimal(sizeText);
    const rate = parseDecimal(rateText);
    const oh = ohText.trim() === '' ? 0 : parseDecimal(ohText);
    if (size === null || size < 0) return { error: 'Datenmenge: bitte eine Zahl ≥ 0 eingeben.' } as const;
    if (rate === null || rate <= 0) return { error: 'Datenrate: bitte eine Zahl > 0 eingeben.' } as const;
    if (oh === null || oh < 0) return { error: 'Overhead: bitte eine Zahl ≥ 0 eingeben (in Prozent).' } as const;
    if (mode === 'rate' && oh >= 100) return { error: 'Bei 100 % Overhead bleibt keine Nutzdatenrate übrig – Wert muss unter 100 liegen.' } as const;
    try {
      return { size, rate, oh, r: transferTime(size, sizeUnit, rate, rateUnit, oh, mode) } as const;
    } catch {
      return { error: 'Die Eingaben ergeben keine gültige Berechnung.' } as const;
    }
  }, [sizeText, sizeUnit, rateText, rateUnit, ohText, mode]);

  const rateInfo = RATE_UNITS.find((r) => r.unit === rateUnit)!;

  return (
    <Card title="Übertragungszeit" icon="Clock" sub="t = Datenmenge / Datenrate">
      <div className="grid grid-2">
        <label className="field">
          Datenmenge
          <div className="row">
            <input className={`input mono ${parseDecimal(sizeText) === null ? 'bad' : ''}`} value={sizeText} onChange={(e) => setSizeText(e.target.value)} inputMode="decimal" />
            <select className="input" style={{ maxWidth: 110 }} value={sizeUnit} onChange={(e) => setSizeUnit(e.target.value as DataUnit)}>
              {DATA_UNITS.map((d) => <option key={d.unit} value={d.unit}>{d.unit === 'B' ? 'Byte' : d.unit}</option>)}
            </select>
          </div>
        </label>
        <label className="field">
          Datenrate
          <div className="row">
            <input className={`input mono ${parseDecimal(rateText) === null ? 'bad' : ''}`} value={rateText} onChange={(e) => setRateText(e.target.value)} inputMode="decimal" />
            <select className="input" style={{ maxWidth: 110 }} value={rateUnit} onChange={(e) => setRateUnit(e.target.value as RateUnit)}>
              {RATE_UNITS.map((r) => <option key={r.unit} value={r.unit}>{r.unit}</option>)}
            </select>
          </div>
        </label>
        <label className="field">
          Overhead in %
          <input className="input mono" value={ohText} onChange={(e) => setOhText(e.target.value)} inputMode="decimal" placeholder="0" />
        </label>
        <label className="field">
          Overhead wirkt auf …
          <select className="input" value={mode} onChange={(e) => setMode(e.target.value === 'rate' ? 'rate' : 'size')}>
            <option value="size">die Datenmenge (Daten × (1 + Overhead))</option>
            <option value="rate">die Datenrate (Rate × (1 − Overhead))</option>
          </select>
        </label>
      </div>
      {'error' in calc ? (
        <div className="mt"><ErrorHint>{calc.error}</ErrorHint></div>
      ) : (
        <div className="block example mt">
          <div className="block-label">Lösungsweg</div>
          <div className="example-step">
            <div className="step-num">1</div>
            <div className="small">
              Datenmenge in Bit umrechnen: {formatNumber(calc.size)} {sizeUnit === 'B' ? 'Byte' : sizeUnit} = {sizeToBitsText(calc.size, sizeUnit)} = <b className="mono">{formatNumber(calc.r.payloadBits)} bit</b>
            </div>
          </div>
          {calc.oh > 0 && mode === 'size' && (
            <div className="example-step">
              <div className="step-num">2</div>
              <div className="small">
                Overhead aufschlagen: {formatNumber(calc.r.payloadBits)} bit × (1 + {formatNumber(calc.oh)} %) = {formatNumber(calc.r.payloadBits)} × {formatNumber(1 + calc.oh / 100)} = <b className="mono">{formatNumber(calc.r.totalBits)} bit</b>
              </div>
            </div>
          )}
          <div className="example-step">
            <div className="step-num">{calc.oh > 0 && mode === 'size' ? 3 : 2}</div>
            <div className="small">
              Datenrate in bit/s (immer dezimal!): {formatNumber(calc.rate)} {rateUnit} = {formatNumber(calc.rate)} × {rateInfo.factorText} bit/s = <b className="mono">{formatNumber(calc.r.rateBps)} bit/s</b>
              {calc.oh > 0 && mode === 'rate' && (
                <> → abzüglich {formatNumber(calc.oh)} % Overhead: {formatNumber(calc.r.rateBps)} × {formatNumber(1 - calc.oh / 100)} = <b className="mono">{formatNumber(calc.r.effectiveBps)} bit/s</b></>
              )}
            </div>
          </div>
          <div className="example-step">
            <div className="step-num">{calc.oh > 0 && mode === 'size' ? 4 : 3}</div>
            <div className="small">
              t = Datenmenge / Datenrate = {formatNumber(calc.r.totalBits)} bit / {formatNumber(calc.r.effectiveBps)} bit/s = <b className="mono">{formatNumber(calc.r.seconds, 3)} s</b>
            </div>
          </div>
          <div className="example-step">
            <div className="step-num">{calc.oh > 0 && mode === 'size' ? 5 : 4}</div>
            <div className="small">
              Umrechnen: {formatNumber(calc.r.seconds, 3)} s / 60 = <b>{formatNumber(calc.r.seconds / 60, 3)} min</b> · / 3600 = <b>{formatNumber(calc.r.seconds / 3600, 4)} h</b>
              <div className="mt">Ergebnis: <b className="mono" style={{ color: 'var(--ok)', fontSize: '1.05rem' }}>{formatHms(calc.r.seconds)}</b></div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

function EnergyCalculator() {
  const [mode, setMode] = useState<'ui' | 'p'>('ui');
  const [uText, setUText] = useState('230');
  const [iText, setIText] = useState('0,5');
  const [pText, setPText] = useState('115');
  const [devText, setDevText] = useState('1');
  const [hText, setHText] = useState('24');
  const [dText, setDText] = useState('365');
  const [priceText, setPriceText] = useState('0,30');

  const calc = useMemo(() => {
    const num = (s: string) => parseDecimal(s);
    let watts: number;
    if (mode === 'ui') {
      const u = num(uText);
      const i = num(iText);
      if (u === null || u < 0 || i === null || i < 0) return { error: 'Spannung U und Stromstärke I: bitte Zahlen ≥ 0 eingeben.' } as const;
      watts = powerWatts(u, i);
    } else {
      const p = num(pText);
      if (p === null || p < 0) return { error: 'Leistung P: bitte eine Zahl ≥ 0 eingeben.' } as const;
      watts = p;
    }
    const dev = num(devText);
    const h = num(hText);
    const d = num(dText);
    const price = num(priceText);
    if (dev === null || dev < 0 || !Number.isInteger(dev)) return { error: 'Anzahl Geräte: bitte eine ganze Zahl ≥ 0 eingeben.' } as const;
    if (h === null || h < 0 || h > 24) return { error: 'Betriebsstunden pro Tag müssen zwischen 0 und 24 liegen.' } as const;
    if (d === null || d < 0) return { error: 'Anzahl Tage: bitte eine Zahl ≥ 0 eingeben.' } as const;
    if (price === null || price < 0) return { error: 'Strompreis: bitte eine Zahl ≥ 0 eingeben (€/kWh).' } as const;
    return { single: watts, dev, h, d, price, c: energyCost(watts, h, d, price, dev) } as const;
  }, [mode, uText, iText, pText, devText, hText, dText, priceText]);

  const field = (label: string, val: string, set: (s: string) => void, unit: string) => (
    <label className="field">
      {label}
      <div className="row">
        <input className={`input mono ${parseDecimal(val) === null ? 'bad' : ''}`} value={val} onChange={(e) => set(e.target.value)} inputMode="decimal" />
        <span className="small muted" style={{ minWidth: 44 }}>{unit}</span>
      </div>
    </label>
  );

  return (
    <Card title="Energie & Stromkosten" icon="Zap" sub="P = U · I · E = P · t">
      <div className="tabs">
        <button className={`tab ${mode === 'ui' ? 'active' : ''}`} onClick={() => setMode('ui')}>P aus U · I</button>
        <button className={`tab ${mode === 'p' ? 'active' : ''}`} onClick={() => setMode('p')}>Leistung direkt</button>
      </div>
      <div className="grid grid-3 mt">
        {mode === 'ui' ? (
          <>
            {field('Spannung U', uText, setUText, 'V')}
            {field('Stromstärke I', iText, setIText, 'A')}
          </>
        ) : (
          field('Leistung P', pText, setPText, 'W')
        )}
        {field('Anzahl Geräte', devText, setDevText, 'Stück')}
        {field('Betrieb pro Tag', hText, setHText, 'h')}
        {field('Zeitraum', dText, setDText, 'Tage')}
        {field('Strompreis', priceText, setPriceText, '€/kWh')}
      </div>
      {'error' in calc ? (
        <div className="mt"><ErrorHint>{calc.error}</ErrorHint></div>
      ) : (
        <div className="block example mt">
          <div className="block-label">Lösungsweg</div>
          <div className="example-step">
            <div className="step-num">1</div>
            <div className="small">
              {mode === 'ui'
                ? <>Leistung: P = U · I = {formatNumber(parseDecimal(uText) ?? 0)} V × {formatNumber(parseDecimal(iText) ?? 0)} A = <b>{formatNumber(calc.single)} W</b></>
                : <>Leistung: P = <b>{formatNumber(calc.single)} W</b></>}
              {calc.dev !== 1 && <> · {de(calc.dev)} Geräte → {formatNumber(calc.c.watts)} W</>}
            </div>
          </div>
          <div className="example-step">
            <div className="step-num">2</div>
            <div className="small">
              Betriebszeit: {formatNumber(calc.h)} h/Tag × {formatNumber(calc.d)} Tage = <b>{formatNumber(calc.c.hoursTotal)} h</b>
            </div>
          </div>
          <div className="example-step">
            <div className="step-num">3</div>
            <div className="small">
              Energie: E = P · t = {formatNumber(calc.c.watts)} W × {formatNumber(calc.c.hoursTotal)} h = {formatNumber(calc.c.watts * calc.c.hoursTotal)} Wh = <b>{formatNumber(calc.c.kWh, 3)} kWh</b> <span className="dim">(÷ 1000)</span>
            </div>
          </div>
          <div className="example-step">
            <div className="step-num">4</div>
            <div className="small">
              Kosten: {formatNumber(calc.c.kWh, 3)} kWh × {formatNumber(calc.price)} €/kWh = <b style={{ color: 'var(--ok)', fontSize: '1.05rem' }}>{eur(calc.c.cost)}</b>
              <div className="tiny dim">pro Tag: {formatNumber(calc.c.kWhPerDay, 3)} kWh = {eur(calc.c.costPerDay)}</div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

function UnitsTools() {
  return (
    <div className="col" style={{ gap: 16 }}>
      <div className="grid grid-2">
        <DataConverter />
        <TransferCalculator />
      </div>
      <EnergyCalculator />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Ports & Protokolle                                               */
/* ------------------------------------------------------------------ */

interface PortEntry { port: number; name: string; transport: 'TCP' | 'UDP' | 'TCP/UDP'; desc: string; secure?: boolean }

const PORTS: PortEntry[] = [
  { port: 20, name: 'FTP (Daten)', transport: 'TCP', desc: 'Datenkanal bei aktivem FTP. Unverschlüsselt.' },
  { port: 21, name: 'FTP (Steuerung)', transport: 'TCP', desc: 'Steuerkanal für Befehle und Anmeldung – Zugangsdaten im Klartext.' },
  { port: 22, name: 'SSH', transport: 'TCP', desc: 'Verschlüsselter Fernzugriff auf die Kommandozeile; auch SCP und SFTP.', secure: true },
  { port: 23, name: 'Telnet', transport: 'TCP', desc: 'Unverschlüsselter Fernzugriff – veraltet, durch SSH ersetzt.' },
  { port: 25, name: 'SMTP', transport: 'TCP', desc: 'E-Mail-Versand zwischen Mailservern.' },
  { port: 53, name: 'DNS', transport: 'TCP/UDP', desc: 'Namensauflösung; Anfragen meist über UDP, Zonentransfers und große Antworten über TCP.' },
  { port: 67, name: 'DHCP (Server)', transport: 'UDP', desc: 'Der DHCP-Server empfängt Anfragen (DISCOVER, REQUEST).' },
  { port: 68, name: 'DHCP (Client)', transport: 'UDP', desc: 'Der DHCP-Client empfängt Antworten (OFFER, ACK).' },
  { port: 69, name: 'TFTP', transport: 'UDP', desc: 'Einfache Dateiübertragung ohne Anmeldung, z. B. für Firmware-Updates oder PXE-Boot.' },
  { port: 80, name: 'HTTP', transport: 'TCP', desc: 'Webseiten unverschlüsselt.' },
  { port: 88, name: 'Kerberos', transport: 'TCP/UDP', desc: 'Authentifizierung mit Tickets, z. B. im Active Directory.' },
  { port: 110, name: 'POP3', transport: 'TCP', desc: 'E-Mails vom Server abholen (in der Regel herunterladen).' },
  { port: 123, name: 'NTP', transport: 'UDP', desc: 'Zeitsynchronisation.' },
  { port: 143, name: 'IMAP', transport: 'TCP', desc: 'E-Mails auf dem Server verwalten; Ordner bleiben zwischen mehreren Geräten synchron.' },
  { port: 161, name: 'SNMP', transport: 'UDP', desc: 'Netzwerkgeräte abfragen und überwachen (Manager fragt Agent).' },
  { port: 162, name: 'SNMP-Trap', transport: 'UDP', desc: 'Agent meldet Ereignisse unaufgefordert an den Manager.' },
  { port: 389, name: 'LDAP', transport: 'TCP', desc: 'Zugriff auf Verzeichnisdienste wie Active Directory, unverschlüsselt.' },
  { port: 443, name: 'HTTPS', transport: 'TCP/UDP', desc: 'Webseiten verschlüsselt mit TLS; HTTP/3 (QUIC) nutzt UDP.', secure: true },
  { port: 445, name: 'SMB', transport: 'TCP', desc: 'Datei- und Druckerfreigaben in Windows-Netzen.' },
  { port: 465, name: 'SMTPS', transport: 'TCP', desc: 'E-Mail-Einlieferung mit TLS von Anfang an (implizites TLS).', secure: true },
  { port: 587, name: 'Submission', transport: 'TCP', desc: 'E-Mail-Einlieferung vom Mailprogramm an den Server mit Anmeldung, verschlüsselt per STARTTLS.', secure: true },
  { port: 636, name: 'LDAPS', transport: 'TCP', desc: 'LDAP verschlüsselt über TLS.', secure: true },
  { port: 993, name: 'IMAPS', transport: 'TCP', desc: 'IMAP verschlüsselt über TLS.', secure: true },
  { port: 995, name: 'POP3S', transport: 'TCP', desc: 'POP3 verschlüsselt über TLS.', secure: true },
  { port: 1433, name: 'MS SQL Server', transport: 'TCP', desc: 'Datenbankserver von Microsoft.' },
  { port: 3306, name: 'MySQL / MariaDB', transport: 'TCP', desc: 'Datenbankserver MySQL bzw. MariaDB.' },
  { port: 3389, name: 'RDP', transport: 'TCP/UDP', desc: 'Remotedesktop: grafischer Fernzugriff auf Windows-Rechner.' },
  { port: 5060, name: 'SIP', transport: 'TCP/UDP', desc: 'Signalisierung für VoIP (Verbindungsauf- und -abbau), unverschlüsselt.' },
  { port: 5061, name: 'SIP über TLS', transport: 'TCP', desc: 'Verschlüsselte VoIP-Signalisierung.', secure: true },
];

function PortsTable() {
  const [q, setQ] = useState('');
  const [proto, setProto] = useState<'alle' | 'TCP' | 'UDP'>('alle');
  const [onlySecure, setOnlySecure] = useState(false);

  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return PORTS.filter((p) => {
      if (proto !== 'alle' && !p.transport.includes(proto)) return false;
      if (onlySecure && !p.secure) return false;
      if (!s) return true;
      if (/^\d+$/.test(s)) return String(p.port).startsWith(s);
      return p.name.toLowerCase().includes(s) || p.desc.toLowerCase().includes(s);
    });
  }, [q, proto, onlySecure]);

  return (
    <div className="col" style={{ gap: 16 }}>
      <Card title="Ports & Protokolle" icon="Plug" sub="Well-Known Ports für die Prüfung">
        <div className="row wrap">
          <input className="input" style={{ maxWidth: 320 }} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Suche: 443, DNS, Mail …" aria-label="Suche" />
          <div className="tabs">
            {(['alle', 'TCP', 'UDP'] as const).map((p) => (
              <button key={p} className={`tab ${proto === p ? 'active' : ''}`} onClick={() => setProto(p)}>{p === 'alle' ? 'Alle' : p}</button>
            ))}
          </div>
          <button className={`chip ${onlySecure ? 'active' : ''}`} onClick={() => setOnlySecure(!onlySecure)}>nur verschlüsselt</button>
          <span className="tiny dim">{shown.length} von {PORTS.length}</span>
        </div>
        <div style={{ overflowX: 'auto' }} className="mt">
          <table className="table small">
            <thead><tr><th>Port</th><th>Protokoll</th><th>Transport</th><th>Beschreibung</th></tr></thead>
            <tbody>
              {shown.map((p) => (
                <tr key={p.port}>
                  <td className="mono"><b>{p.port}</b></td>
                  <td><b>{p.name}</b> {p.secure && <span className="badge ok">verschlüsselt</span>}</td>
                  <td className="mono">{p.transport}</td>
                  <td className="muted">{p.desc}</td>
                </tr>
              ))}
              {shown.length === 0 && <tr><td colSpan={4} className="dim">Kein Eintrag gefunden.</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>
      <div className="grid grid-3">
        <div className="block summary">
          <div className="block-label">Well-Known Ports</div>
          <div className="small"><b className="mono">0 – 1023</b>: Standarddienste (von der IANA vergeben).</div>
        </div>
        <div className="block summary">
          <div className="block-label">Registered Ports</div>
          <div className="small"><b className="mono">1024 – 49151</b>: registrierte Anwendungen, z. B. 3306 MySQL, 3389 RDP.</div>
        </div>
        <div className="block summary">
          <div className="block-label">Dynamische Ports</div>
          <div className="small"><b className="mono">49152 – 65535</b>: private/kurzlebige Quellports der Clients.</div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Seite                                                               */
/* ------------------------------------------------------------------ */

type TabId = 'subnet' | 'masks' | 'binary' | 'vlsm' | 'ipv6' | 'units' | 'ports';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'subnet', label: 'Subnetzrechner', icon: 'Calculator' },
  { id: 'masks', label: 'Masken-Tabelle', icon: 'Table' },
  { id: 'binary', label: 'Binär / Hex / Dez', icon: 'Binary' },
  { id: 'vlsm', label: 'VLSM-Planer', icon: 'LayoutGrid' },
  { id: 'ipv6', label: 'IPv6', icon: 'Globe' },
  { id: 'units', label: 'Übertragung & Einheiten', icon: 'Gauge' },
  { id: 'ports', label: 'Ports & Protokolle', icon: 'Plug' },
];

export function ToolsPage() {
  const [tab, setTab] = useState<TabId>('subnet');
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 style={{ margin: '0 0 6px' }}>Werkzeuge</h1>
          <p>Rechner und Nachschlagetabellen – zum Nachrechnen deiner Lösungen und zum Verstehen der Rechenwege.</p>
        </div>
      </div>
      <div className="tabs" role="tablist" style={{ marginBottom: 20 }}>
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            className={`tab ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}
          >
            <Icon name={t.icon} size={15} />
            {t.label}
          </button>
        ))}
      </div>
      {/* Alle Werkzeuge bleiben gemountet, damit Eingaben beim Tab-Wechsel erhalten bleiben. */}
      <div style={{ display: tab === 'subnet' ? undefined : 'none' }}><SubnetCalculator /></div>
      <div style={{ display: tab === 'masks' ? undefined : 'none' }}><MaskTable /></div>
      <div style={{ display: tab === 'binary' ? undefined : 'none' }}><BinaryTools /></div>
      <div style={{ display: tab === 'vlsm' ? undefined : 'none' }}><VlsmPlanner /></div>
      <div style={{ display: tab === 'ipv6' ? undefined : 'none' }}><Ipv6Tool /></div>
      <div style={{ display: tab === 'units' ? undefined : 'none' }}><UnitsTools /></div>
      <div style={{ display: tab === 'ports' ? undefined : 'none' }}><PortsTable /></div>
    </div>
  );
}

export default ToolsPage;
