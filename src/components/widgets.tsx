/**
 * Interaktive Visualisierungen. Alle Werte werden mit dem Rechenkern (src/core) berechnet.
 */
import React, { useEffect, useMemo, useState } from 'react';
import type { SequenceData, TopologyData, WidgetSpec, NodeType } from '../content/types';
import {
  blockSize, formatIp, ipToBinary, networkAddress, octets, parseIpSafe, prefixToMaskNum, toBinary8, usableHosts, isValidPrefix,
} from '../core/ipv4';
import { compressIpv6, expandIpv6, parseIpv6, stripLeadingZeros, ipv6Type } from '../core/ipv6';
import { prefixForHosts } from '../core/ipv4';
import { Icon } from './common';

export function Widget({ spec }: { spec: WidgetSpec }) {
  switch (spec.kind) {
    case 'subnet-bar': return <SubnetBar {...spec.data} />;
    case 'ip-binary': return <IpBinary {...spec.data} />;
    case 'binary-octet': return <BinaryOctet {...spec.data} />;
    case 'vlsm-boxes': return <VlsmBoxes {...spec.data} />;
    case 'topology': return <Topology data={spec.data} />;
    case 'sequence': return <Sequence data={spec.data} />;
    case 'layers': return <Layers {...spec.data} />;
    case 'encapsulation': return <Encapsulation />;
    case 'ipv6-compress': return <Ipv6Compress address={spec.data.address} />;
    case 'mac-table': return <MacTableSim />;
    case 'cards': return <Cards {...spec.data} />;
    default: return <div className="dim">Unbekannte Visualisierung</div>;
  }
}

/* ------------------------------------------------------------------ */
/* Bitdarstellung einer IPv4-Adresse                                   */
/* ------------------------------------------------------------------ */

export function BitRow({ value, prefix, basePrefix, onToggle }: { value: number; prefix?: number; basePrefix?: number; onToggle?: (bit: number) => void }) {
  const bits = ipToBinary(value, '');
  return (
    <div className="bits">
      {bits.split('').map((b, i) => {
        const cls = prefix === undefined ? 'plain' : i < (basePrefix ?? prefix) ? 'net' : i < prefix ? 'sub' : 'host';
        return (
          <React.Fragment key={i}>
            {i > 0 && i % 8 === 0 && <div className="octet-sep">.</div>}
            <div className={`bit ${cls} ${b === '1' ? 'one' : ''} ${onToggle ? 'click' : ''}`} onClick={onToggle ? () => onToggle(i) : undefined} title={`Bit ${i + 1} · Stellenwert ${2 ** (7 - (i % 8))}`}>
              {b}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export function Legend({ sub }: { sub?: boolean }) {
  return (
    <div className="legend">
      <span><i style={{ background: 'var(--net)' }} />Netzbits</span>
      {sub && <span><i style={{ background: 'var(--sub)' }} />ausgeliehene Subnetzbits</span>}
      <span><i style={{ background: 'var(--host)' }} />Hostbits</span>
    </div>
  );
}

export function IpBinary({ ip, prefix: p0, editable }: { ip: string; prefix?: number; editable?: boolean }) {
  const [ipStr, setIpStr] = useState(ip);
  const [prefix, setPrefix] = useState(p0 ?? 24);
  const val = parseIpSafe(ipStr);
  const hasPrefix = p0 !== undefined;
  const toggle = (i: number) => {
    if (val === null) return;
    const v = (val ^ 2 ** (31 - i)) >>> 0;
    setIpStr(formatIp(v));
  };
  const net = val !== null ? networkAddress(val, prefix) : 0;
  const bc = net + blockSize(prefix) - 1;
  return (
    <div className="col" style={{ gap: 14 }}>
      {editable && (
        <div className="row wrap">
          <input className={`input mono ${val === null ? 'bad' : ''}`} style={{ maxWidth: 200 }} value={ipStr} onChange={(e) => setIpStr(e.target.value)} aria-label="IP-Adresse" />
          {hasPrefix && (
            <>
              <span className="mono" style={{ fontWeight: 700, minWidth: 40 }}>/{prefix}</span>
              <input type="range" className="slider" min={0} max={32} value={prefix} onChange={(e) => setPrefix(+e.target.value)} style={{ maxWidth: 280 }} aria-label="Präfix" />
            </>
          )}
        </div>
      )}
      {val === null ? (
        <div className="dim">Bitte eine gültige IPv4-Adresse eingeben.</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="table" style={{ width: 'auto' }}>
            <tbody>
              <tr>
                <td className="dim small">IP</td>
                <td><BitRow value={val} prefix={hasPrefix ? prefix : undefined} onToggle={editable ? toggle : undefined} /></td>
                <td className="mono">{formatIp(val)}</td>
              </tr>
              {hasPrefix && (
                <>
                  <tr>
                    <td className="dim small">Maske</td>
                    <td><BitRow value={prefixToMaskNum(prefix)} prefix={prefix} /></td>
                    <td className="mono">{formatIp(prefixToMaskNum(prefix))}</td>
                  </tr>
                  <tr>
                    <td className="dim small">Netz</td>
                    <td><BitRow value={net} prefix={prefix} /></td>
                    <td className="mono" style={{ color: 'var(--net)', fontWeight: 600 }}>{formatIp(net)}</td>
                  </tr>
                  <tr>
                    <td className="dim small">Broadcast</td>
                    <td><BitRow value={bc} prefix={prefix} /></td>
                    <td className="mono" style={{ color: 'var(--host)', fontWeight: 600 }}>{formatIp(bc)}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      )}
      {hasPrefix && val !== null && (
        <div className="row wrap between">
          <Legend />
          <span className="small muted">
            {32 - prefix} Hostbits → 2^{32 - prefix} = {blockSize(prefix).toLocaleString('de-DE')} Adressen, {usableHosts(prefix).toLocaleString('de-DE')} nutzbar
          </span>
        </div>
      )}
    </div>
  );
}

export function BinaryOctet({ value, editable }: { value: number; editable?: boolean }) {
  const [v, setV] = useState(value);
  const weights = [128, 64, 32, 16, 8, 4, 2, 1];
  const bits = toBinary8(v).split('');
  return (
    <div className="col" style={{ gap: 12, alignItems: 'flex-start' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 48px)', gap: 6, textAlign: 'center' }}>
        {weights.map((w) => <div key={w} className="tiny dim mono">{w}</div>)}
        {bits.map((b, i) => (
          <button
            key={i}
            className={`bit ${b === '1' ? 'net one' : 'plain'} ${editable ? 'click' : ''}`}
            style={{ width: 48, height: 48, fontSize: '1.2rem', border: 'none' }}
            onClick={editable ? () => setV(v ^ weights[i]) : undefined}
            aria-label={`Bit mit Stellenwert ${weights[i]}`}
          >
            {b}
          </button>
        ))}
      </div>
      <div className="mono">
        = {bits.map((b, i) => (b === '1' ? weights[i] : null)).filter(Boolean).join(' + ') || '0'} = <b style={{ fontSize: '1.2rem' }}>{v}</b>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Subnetz-Balken                                                      */
/* ------------------------------------------------------------------ */

const SEG_COLORS = ['#4f8cff', '#7b6cff', '#3cc8e0', '#34c77b', '#f5b942', '#ff9f43', '#ff6b9a', '#a77bff'];

export function SubnetBar({ network, prefix: p0, minPrefix, maxPrefix, locked }: { network: string; prefix: number; minPrefix?: number; maxPrefix?: number; locked?: boolean }) {
  const base = parseIpSafe(network) ?? 0;
  const basePrefix = minPrefix ?? p0;
  const baseNet = networkAddress(base, basePrefix);
  const [prefix, setPrefix] = useState(p0);
  const [sel, setSel] = useState(0);
  const maxP = Math.min(32, maxPrefix ?? Math.min(basePrefix + 8, 30));
  const count = 2 ** (prefix - basePrefix);
  const size = blockSize(prefix);
  useEffect(() => setSel((s) => Math.min(s, count - 1)), [count]);
  const shown = Math.min(count, 64);
  const selNet = baseNet + sel * size;
  const borrowed = prefix - basePrefix;
  return (
    <div className="col" style={{ gap: 14 }}>
      <div className="row wrap between">
        <div className="mono" style={{ fontSize: '1.05rem' }}>
          {formatIp(baseNet)}/<b>{basePrefix}</b> → <b style={{ color: 'var(--sub)' }}>/{prefix}</b>
        </div>
        {!locked && (
          <div className="row" style={{ minWidth: 260 }}>
            <button className="btn sm" onClick={() => setPrefix(Math.max(basePrefix, prefix - 1))} disabled={prefix <= basePrefix}>−</button>
            <input type="range" className="slider" min={basePrefix} max={maxP} value={prefix} onChange={(e) => setPrefix(+e.target.value)} aria-label="Präfix" />
            <button className="btn sm" onClick={() => setPrefix(Math.min(maxP, prefix + 1))} disabled={prefix >= maxP}>+</button>
          </div>
        )}
      </div>
      <div className="grid grid-4" style={{ gap: 10 }}>
        <MiniStat label="Ausgeliehene Bits" value={`${borrowed}`} />
        <MiniStat label="Subnetze" value={`2^${borrowed} = ${count.toLocaleString('de-DE')}`} />
        <MiniStat label="Adressen / Subnetz" value={`2^${32 - prefix} = ${size.toLocaleString('de-DE')}`} />
        <MiniStat label="Nutzbare Hosts" value={usableHosts(prefix).toLocaleString('de-DE')} />
      </div>
      <div className={`sbar ${shown > 16 ? 'many' : ''}`}>
        {Array.from({ length: shown }, (_, i) => {
          const n = baseNet + i * size;
          const o = octets(n);
          return (
            <div key={i} className={`seg ${i === sel ? 'sel' : ''}`} style={{ background: SEG_COLORS[i % SEG_COLORS.length] + (i === sel ? '' : 'cc'), color: 'white' }} onClick={() => setSel(i)} title={`${formatIp(n)}/${prefix}`}>
              {shown <= 16 && <b>.{prefix >= 24 ? o[3] : `${o[2]}.${o[3]}`}</b>}
              {shown <= 8 && <span style={{ opacity: 0.85 }}>{size.toLocaleString('de-DE')}</span>}
            </div>
          );
        })}
      </div>
      {count > shown && <div className="tiny dim">Es werden die ersten {shown} von {count.toLocaleString('de-DE')} Subnetzen gezeigt.</div>}
      <div className="card" style={{ background: 'var(--surface-2)', padding: 16 }}>
        <div className="row wrap between" style={{ marginBottom: 10 }}>
          <b>Subnetz {sel + 1}: <span className="mono">{formatIp(selNet)}/{prefix}</span></b>
          <span className="small muted">Subnetz-ID (violette Bits) = {sel} = {borrowed ? sel.toString(2).padStart(borrowed, '0') : '–'}</span>
        </div>
        <div style={{ overflowX: 'auto' }}><BitRow value={selNet} prefix={prefix} basePrefix={basePrefix} /></div>
        <div className="grid grid-4 mt" style={{ gap: 10 }}>
          <MiniStat label="Netzadresse (reserviert)" value={formatIp(selNet)} mono tone="bad" />
          <MiniStat label="Erster Host" value={prefix >= 31 ? '–' : formatIp(selNet + 1)} mono tone="ok" />
          <MiniStat label="Letzter Host" value={prefix >= 31 ? '–' : formatIp(selNet + size - 2)} mono tone="ok" />
          <MiniStat label="Broadcast (reserviert)" value={formatIp(selNet + size - 1)} mono tone="bad" />
        </div>
        <div className="mt"><Legend sub /></div>
      </div>
    </div>
  );
}

function MiniStat({ label, value, mono, tone }: { label: string; value: string; mono?: boolean; tone?: 'ok' | 'bad' }) {
  return (
    <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 10, padding: '9px 12px' }}>
      <div className="tiny dim" style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{label}</div>
      <div className={mono ? 'mono' : ''} style={{ fontWeight: 650, color: tone === 'ok' ? 'var(--ok)' : tone === 'bad' ? 'var(--bad)' : undefined }}>{value}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* VLSM-Boxen                                                          */
/* ------------------------------------------------------------------ */

export function VlsmBoxes({ network, prefix, demands = [], plan }: { network: string; prefix: number; demands?: { name: string; hosts: number }[]; plan?: { name: string; network: number; prefix: number; ok?: boolean }[] }) {
  const base = networkAddress(parseIpSafe(network) ?? 0, prefix);
  const total = blockSize(prefix);
  const blocks = useMemo(() => {
    if (plan) return plan;
    const sorted = [...demands].map((d) => ({ ...d, p: d.hosts <= 2 ? 30 : prefixForHosts(d.hosts) })).sort((a, b) => a.p - b.p || b.hosts - a.hosts);
    let cur = base;
    const out: { name: string; network: number; prefix: number; ok?: boolean }[] = [];
    for (const d of sorted) {
      const s = blockSize(d.p);
      if (cur + s > base + total) break;
      out.push({ name: `${d.name} (${d.hosts})`, network: cur, prefix: d.p });
      cur += s;
    }
    return out;
  }, [plan, demands, base, total]);
  return (
    <div className="col">
      <div className="vbox">
        {blocks.map((b, i) => {
          const left = ((b.network - base) / total) * 100;
          const width = (blockSize(b.prefix) / total) * 100;
          if (left < 0 || left >= 100) return null;
          return (
            <div key={i} className="blk" style={{ left: `${left}%`, width: `${width}%`, background: b.ok === false ? 'var(--bad)' : SEG_COLORS[i % SEG_COLORS.length] }} title={`${b.name}: ${formatIp(b.network)}/${b.prefix} – Broadcast ${formatIp(b.network + blockSize(b.prefix) - 1)}`}>
              {width > 7 && <b>{b.name}</b>}
              {width > 7 && <span className="mono">.{octets(b.network)[3]}/{b.prefix}</span>}
            </div>
          );
        })}
      </div>
      <div className="row between tiny dim mono">
        <span>{formatIp(base)}</span>
        <span>{formatIp(base + total / 2)}</span>
        <span>{formatIp(base + total - 1)}</span>
      </div>
      {blocks.length > 0 && (
        <table className="table small">
          <thead><tr><th>Netz</th><th>Präfix</th><th>Netzadresse</th><th>Hostbereich</th><th>Broadcast</th></tr></thead>
          <tbody>
            {blocks.map((b, i) => (
              <tr key={i}>
                <td><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 3, background: SEG_COLORS[i % SEG_COLORS.length], marginRight: 8 }} />{b.name}</td>
                <td className="mono">/{b.prefix}</td>
                <td className="mono">{formatIp(b.network)}</td>
                <td className="mono">{b.prefix >= 31 ? '–' : `${formatIp(b.network + 1)} – ${formatIp(b.network + blockSize(b.prefix) - 2)}`}</td>
                <td className="mono">{formatIp(b.network + blockSize(b.prefix) - 1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Netzwerk-Topologie                                                  */
/* ------------------------------------------------------------------ */

const NODE_ICON: Record<NodeType, string> = {
  pc: 'Monitor', laptop: 'Laptop', server: 'Server', switch: 'Network', router: 'Router', firewall: 'ShieldCheck', ap: 'Wifi', cloud: 'Cloud',
  modem: 'Cable', phone: 'Smartphone', printer: 'Printer', nas: 'HardDrive', internet: 'Globe', hub: 'Share2', camera: 'Cctv',
};
const ZONE: Record<string, string> = { blue: 'var(--net)', green: 'var(--ok)', orange: 'var(--host)', purple: 'var(--sub)', red: 'var(--bad)', gray: 'var(--text-3)' };

export function Topology({ data, overlay }: { data: TopologyData; overlay?: React.ReactNode }) {
  const pos = new Map(data.nodes.map((n) => [n.id, n]));
  const maxY = Math.max(420, ...data.nodes.map((n) => n.y + 60));
  return (
    <div className="topo">
      <svg viewBox={`0 0 800 ${maxY}`}>
        {data.zones?.map((z, i) => (
          <g key={i}>
            <rect x={z.x} y={z.y} width={z.w} height={z.h} rx="14" fill={ZONE[z.color ?? 'gray']} fillOpacity="0.08" stroke={ZONE[z.color ?? 'gray']} strokeOpacity="0.5" strokeDasharray="6 5" />
            <text x={z.x + 12} y={z.y + 20} style={{ fill: ZONE[z.color ?? 'gray'], fontWeight: 600, fontSize: 12 }}>{z.label}</text>
          </g>
        ))}
        {data.links.map((l, i) => {
          const a = pos.get(l.from);
          const b = pos.get(l.to);
          if (!a || !b) return null;
          const style = l.style ?? 'lan';
          const color = style === 'wan' ? 'var(--host)' : style === 'trunk' ? 'var(--sub)' : style === 'vpn' ? 'var(--ok)' : style === 'fiber' ? 'var(--info)' : 'var(--text-3)';
          return (
            <g key={i}>
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={color} strokeWidth={style === 'trunk' ? 4 : 2.2} strokeDasharray={style === 'wifi' ? '3 6' : style === 'vpn' ? '10 6' : undefined} />
              {l.label && (
                <g>
                  <rect x={(a.x + b.x) / 2 - l.label.length * 3.4 - 6} y={(a.y + b.y) / 2 - 11} width={l.label.length * 6.8 + 12} height="20" rx="6" fill="var(--surface)" stroke="var(--border)" />
                  <text x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 + 4} textAnchor="middle" className="sub">{l.label}</text>
                </g>
              )}
            </g>
          );
        })}
        {data.nodes.map((n) => (
          <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
            <rect x="-24" y="-24" width="48" height="48" rx="13" fill="var(--surface-2)" stroke="var(--border-strong)" />
            <foreignObject x="-12" y="-12" width="24" height="24">
              <div style={{ color: 'var(--accent-2)', display: 'grid', placeItems: 'center' }}><Icon name={NODE_ICON[n.type] ?? 'Circle'} size={22} /></div>
            </foreignObject>
            <text y="42" textAnchor="middle" style={{ fontWeight: 600 }}>{n.label}</text>
            {n.sub && <text y="57" textAnchor="middle" className="sub">{n.sub}</text>}
          </g>
        ))}
        {overlay}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sequenzdiagramm                                                     */
/* ------------------------------------------------------------------ */

export function Sequence({ data }: { data: SequenceData }) {
  const [shown, setShown] = useState(data.messages.length);
  const w = 800;
  const colW = w / data.actors.length;
  const x = (i: number) => colW * i + colW / 2;
  const rowH = 46;
  const h = 70 + data.messages.length * rowH + 20;
  return (
    <div className="col">
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%' }}>
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
          </marker>
        </defs>
        {data.actors.map((a, i) => (
          <g key={i}>
            <rect x={x(i) - 70} y={8} width={140} height={34} rx={9} fill="var(--surface-2)" stroke="var(--border-strong)" />
            <text x={x(i)} y={30} textAnchor="middle" style={{ fill: 'var(--text)', fontWeight: 600, fontSize: 13 }}>{a}</text>
            <line x1={x(i)} x2={x(i)} y1={42} y2={h - 10} stroke="var(--border-strong)" strokeDasharray="4 5" />
          </g>
        ))}
        {data.messages.slice(0, shown).map((m, i) => {
          const y = 70 + i * rowH;
          const self = m.from === m.to;
          return (
            <g key={i} style={{ animation: 'fadeIn 0.3s ease' }}>
              {self ? (
                <path d={`M${x(m.from)},${y} h40 v18 h-38`} fill="none" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arr)" />
              ) : (
                <line x1={x(m.from)} x2={x(m.to) + (m.to > m.from ? -4 : 4)} y1={y + 10} y2={y + 10} stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arr)" />
              )}
              <text x={self ? x(m.from) + 48 : (x(m.from) + x(m.to)) / 2} y={y + 3} textAnchor={self ? 'start' : 'middle'} style={{ fill: 'var(--text)', fontSize: 12.5, fontWeight: 600 }}>{`${i + 1}. ${m.label}`}</text>
              {m.note && <text x={self ? x(m.from) + 48 : (x(m.from) + x(m.to)) / 2} y={y + 28} textAnchor={self ? 'start' : 'middle'} style={{ fill: 'var(--text-3)', fontSize: 11 }}>{m.note}</text>}
            </g>
          );
        })}
      </svg>
      <div className="row">
        <button className="btn sm" onClick={() => setShown(0)}>Von vorn</button>
        <button className="btn sm" onClick={() => setShown(Math.min(data.messages.length, shown + 1))} disabled={shown >= data.messages.length}>Nächster Schritt</button>
        <span className="tiny dim">{shown}/{data.messages.length}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* OSI / TCP-IP                                                        */
/* ------------------------------------------------------------------ */

const OSI = [
  { n: 7, name: 'Anwendung', en: 'Application', pdu: 'Daten', proto: 'HTTP, DNS, SMTP, FTP, SSH', dev: 'Gateway, Proxy' },
  { n: 6, name: 'Darstellung', en: 'Presentation', pdu: 'Daten', proto: 'TLS*, Kodierung, Kompression', dev: '' },
  { n: 5, name: 'Sitzung', en: 'Session', pdu: 'Daten', proto: 'RPC, NetBIOS', dev: '' },
  { n: 4, name: 'Transport', en: 'Transport', pdu: 'Segment / Datagramm', proto: 'TCP, UDP (Ports)', dev: 'Firewall (L4)' },
  { n: 3, name: 'Vermittlung', en: 'Network', pdu: 'Paket', proto: 'IP, ICMP', dev: 'Router, L3-Switch' },
  { n: 2, name: 'Sicherung', en: 'Data Link', pdu: 'Frame (Rahmen)', proto: 'Ethernet, WLAN 802.11 (MAC)', dev: 'Switch, Bridge, AP' },
  { n: 1, name: 'Bitübertragung', en: 'Physical', pdu: 'Bits', proto: 'Kabel, Funk, Stecker', dev: 'Hub, Repeater, Kabel' },
];
const TCPIP = [
  { name: 'Anwendung', osi: [7, 6, 5] },
  { name: 'Transport', osi: [4] },
  { name: 'Internet', osi: [3] },
  { name: 'Netzzugang', osi: [2, 1] },
];

export function Layers({ mode, highlight = [], showPdu = true, showProtocols = true }: { mode: 'osi' | 'tcpip' | 'compare'; highlight?: number[]; showPdu?: boolean; showProtocols?: boolean }) {
  const [hi, setHi] = useState<number | null>(null);
  const isHi = (n: number) => highlight.includes(n) || hi === n;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: mode === 'compare' ? '1fr 200px' : '1fr', gap: 10 }}>
      <div className="col" style={{ gap: 5 }}>
        {(mode === 'tcpip' ? [] : OSI).map((l) => (
          <div key={l.n} onMouseEnter={() => setHi(l.n)} onMouseLeave={() => setHi(null)} style={{ display: 'grid', gridTemplateColumns: '38px 1fr 1fr', gap: 10, alignItems: 'center', padding: '8px 12px', borderRadius: 10, background: isHi(l.n) ? 'var(--accent-soft)' : 'var(--surface-2)', border: `1px solid ${isHi(l.n) ? 'var(--accent)' : 'var(--border)'}`, transition: 'all 0.15s' }}>
            <b style={{ fontSize: '1.2rem', color: 'var(--accent-2)' }}>{l.n}</b>
            <div><b>{l.name}</b> <span className="tiny dim">({l.en})</span>{showPdu && <div className="tiny muted">PDU: {l.pdu}</div>}</div>
            {showProtocols && <div className="small muted">{l.proto}{l.dev && <div className="tiny dim">Geräte: {l.dev}</div>}</div>}
          </div>
        ))}
        {mode === 'tcpip' && TCPIP.map((t) => (
          <div key={t.name} style={{ padding: '14px', borderRadius: 10, background: 'var(--surface-2)', border: '1px solid var(--border)' }}><b>{t.name}</b> <span className="tiny dim">≙ OSI {t.osi.join(', ')}</span></div>
        ))}
      </div>
      {mode === 'compare' && (
        <div className="col" style={{ gap: 5 }}>
          {TCPIP.map((t) => (
            <div key={t.name} style={{ flex: t.osi.length, display: 'grid', placeItems: 'center', borderRadius: 10, background: t.osi.some(isHi) ? 'var(--sub-soft)' : 'var(--surface-2)', border: '1px solid var(--border)', fontWeight: 600, minHeight: 50 * t.osi.length }}>
              <div style={{ textAlign: 'center' }}>{t.name}<div className="tiny dim">TCP/IP</div></div>
            </div>
          ))}
        </div>
      )}
      {mode !== 'tcpip' && <div className="tiny dim">* TLS wird je nach Lehrbuch Schicht 4–6 zugeordnet.</div>}
    </div>
  );
}

export function Encapsulation() {
  const [step, setStep] = useState(0);
  const layers = [
    { label: 'Daten', who: 'Anwendung (7–5)', parts: [{ t: 'HTTP-Daten', c: 'var(--accent)' }] },
    { label: 'Segment', who: 'Transport (4)', parts: [{ t: 'TCP-Header (Ports)', c: 'var(--ok)' }, { t: 'Daten', c: 'var(--accent)' }] },
    { label: 'Paket', who: 'Vermittlung (3)', parts: [{ t: 'IP-Header (IP-Adressen)', c: 'var(--sub)' }, { t: 'TCP', c: 'var(--ok)' }, { t: 'Daten', c: 'var(--accent)' }] },
    { label: 'Frame', who: 'Sicherung (2)', parts: [{ t: 'Ethernet-Header (MAC)', c: 'var(--host)' }, { t: 'IP', c: 'var(--sub)' }, { t: 'TCP', c: 'var(--ok)' }, { t: 'Daten', c: 'var(--accent)' }, { t: 'FCS', c: 'var(--host)' }] },
    { label: 'Bits', who: 'Bitübertragung (1)', parts: [{ t: '0110 1001 0101 1100 … (Signal auf dem Medium)', c: 'var(--text-3)' }] },
  ];
  return (
    <div className="col">
      {layers.slice(0, step + 1).map((l, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '170px 1fr', gap: 12, alignItems: 'center', animation: 'fadeIn 0.3s' }}>
          <div><b>{l.label}</b><div className="tiny dim">{l.who}</div></div>
          <div style={{ display: 'flex', gap: 3 }}>
            {l.parts.map((p, j) => (
              <div key={j} style={{ flex: p.t === 'Daten' || p.t.startsWith('0') ? 3 : 1.4, background: p.c, color: 'white', padding: '8px 10px', borderRadius: 7, fontSize: '0.78rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.t}</div>
            ))}
          </div>
        </div>
      ))}
      <div className="row">
        <button className="btn sm" onClick={() => setStep(0)}>Von vorn</button>
        <button className="btn sm primary" onClick={() => setStep(Math.min(4, step + 1))} disabled={step >= 4}>Nächste Schicht kapseln ↓</button>
        <span className="tiny dim">Sender: Jede Schicht fügt ihren Header hinzu. Empfänger: umgekehrt (Entkapselung).</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* IPv6                                                                */
/* ------------------------------------------------------------------ */

export function Ipv6Compress({ address }: { address: string }) {
  const [a, setA] = useState(address);
  const g = parseIpv6(a);
  return (
    <div className="col">
      <input className={`input mono ${g ? '' : 'bad'}`} value={a} onChange={(e) => setA(e.target.value)} aria-label="IPv6-Adresse" />
      {g ? (
        <table className="table small">
          <tbody>
            <tr><td className="dim">Vollständig</td><td className="mono">{expandIpv6(g)}</td></tr>
            <tr><td className="dim">1. Führende Nullen weg</td><td className="mono">{stripLeadingZeros(expandIpv6(g))}</td></tr>
            <tr><td className="dim">2. Längste 0-Folge → ::</td><td className="mono" style={{ color: 'var(--ok)', fontWeight: 700 }}>{compressIpv6(g)}</td></tr>
            <tr><td className="dim">Adresstyp</td><td>{ipv6Type(g)}</td></tr>
          </tbody>
        </table>
      ) : (
        <div className="dim small">Keine gültige IPv6-Adresse.</div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MAC-Tabellen-Simulation                                             */
/* ------------------------------------------------------------------ */

export function MacTableSim() {
  const hosts = [
    { name: 'PC-A', mac: 'AA:AA:AA:00:00:01', port: 1 },
    { name: 'PC-B', mac: 'BB:BB:BB:00:00:02', port: 2 },
    { name: 'PC-C', mac: 'CC:CC:CC:00:00:03', port: 3 },
    { name: 'Server', mac: 'DD:DD:DD:00:00:04', port: 4 },
  ];
  const [table, setTable] = useState<{ mac: string; port: number }[]>([]);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(1);
  const [log, setLog] = useState<string[]>([]);
  const send = (bc: boolean) => {
    const s = hosts[from];
    const t = hosts[to];
    const learned = table.some((e) => e.mac === s.mac) ? table : [...table, { mac: s.mac, port: s.port }];
    const lines = [`Frame von ${s.name} (Port ${s.port}) an ${bc ? 'Broadcast FF:FF:FF:FF:FF:FF' : t.name}.`];
    if (learned !== table) lines.push(`Learning: ${s.mac} → Port ${s.port} in die Tabelle eingetragen.`);
    if (bc) lines.push(`Broadcast → Flooding an alle Ports außer Port ${s.port}.`);
    else {
      const e = learned.find((x) => x.mac === t.mac);
      if (e) lines.push(e.port === s.port ? 'Ziel am selben Port → Filtering (verworfen).' : `Ziel bekannt → Forwarding nur an Port ${e.port}.`);
      else lines.push(`Ziel-MAC unbekannt → Flooding an alle Ports außer Port ${s.port}.`);
    }
    setTable(learned);
    setLog((l) => [...lines, ...l].slice(0, 12));
  };
  return (
    <div className="grid grid-2">
      <div className="col">
        <div className="row wrap">
          <label className="field">Sender<select className="input" value={from} onChange={(e) => setFrom(+e.target.value)}>{hosts.map((h, i) => <option key={i} value={i}>{h.name}</option>)}</select></label>
          <label className="field">Empfänger<select className="input" value={to} onChange={(e) => setTo(+e.target.value)}>{hosts.map((h, i) => <option key={i} value={i}>{h.name}</option>)}</select></label>
        </div>
        <div className="row">
          <button className="btn primary sm" onClick={() => send(false)} disabled={from === to}>Unicast senden</button>
          <button className="btn sm" onClick={() => send(true)}>Broadcast senden</button>
          <button className="btn ghost sm" onClick={() => { setTable([]); setLog([]); }}>Zurücksetzen</button>
        </div>
        <div className="col small" style={{ gap: 4 }}>
          {log.map((l, i) => <div key={i} style={{ opacity: 1 - i * 0.06 }}>{l}</div>)}
        </div>
      </div>
      <div>
        <b className="small">MAC-Adresstabelle des Switches</b>
        <table className="table small mt">
          <thead><tr><th>MAC-Adresse</th><th>Port</th></tr></thead>
          <tbody>
            {table.length === 0 && <tr><td colSpan={2} className="dim">leer – der Switch hat noch nichts gelernt</td></tr>}
            {table.map((e) => <tr key={e.mac}><td className="mono">{e.mac}</td><td>{e.port}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Cards({ items, columns = 3 }: { items: { title: string; text: string; icon?: string }[]; columns?: number }) {
  return (
    <div className="grid" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${columns >= 4 ? 170 : 210}px, 1fr))` }}>
      {items.map((it, i) => (
        <div key={i} className="card" style={{ background: 'var(--surface-2)', padding: 16 }}>
          <div className="row" style={{ marginBottom: 6 }}>
            {it.icon && <div className="module-icon" style={{ width: 34, height: 34 }}><Icon name={it.icon} size={17} /></div>}
            <b>{it.title}</b>
          </div>
          <div className="small muted">{it.text}</div>
        </div>
      ))}
    </div>
  );
}

export { isValidPrefix };
