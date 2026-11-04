/**
 * VLSM-Trainer: generierte Mehrstandort-Aufgaben mit Netzwerkdiagramm, eigene Aufgaben
 * und Aufgaben aus hochgeladenen Bildern (KI-Erkennung, vom Nutzer prüf- und korrigierbar).
 */
import React, { useState } from 'react';
import type { Difficulty, VlsmQuestion } from '../content/types';
import { makeVlsmTask } from '../core/generators';
import { Rng } from '../core/rng';
import { parseCidr, networkAddress, formatIp, blockSize } from '../core/ipv4';
import { totalRequired } from '../core/vlsm';
import { api } from '../lib/api';
import { useStore } from '../lib/store';
import { Icon, Md } from '../components/common';
import { QuestionView } from '../components/QuestionView';

type Demand = { name: string; hosts: number; kind: 'lan' | 'wan' };

export function VlsmTrainer() {
  const { recordAttempt } = useStore();
  const [d, setD] = useState<Difficulty>(2);
  const [task, setTask] = useState<VlsmQuestion>(() => makeVlsmTask(new Rng(Date.now() >>> 0), 2));
  const [tab, setTab] = useState<'gen' | 'own' | 'image'>('gen');
  const [ordered, setOrdered] = useState(false);

  const newTask = (diff = d) => setTask(makeVlsmTask(new Rng((Math.random() * 2 ** 32) >>> 0), diff));

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>VLSM-Trainer</h1>
          <p>Plane Adressbereiche für mehrere Standorte. Jeder korrekte Plan wird akzeptiert – nicht nur die Musterlösung.</p>
        </div>
        <div className="tabs">
          <button className={`tab ${tab === 'gen' ? 'active' : ''}`} onClick={() => setTab('gen')}>Generierte Aufgabe</button>
          <button className={`tab ${tab === 'own' ? 'active' : ''}`} onClick={() => setTab('own')}>Eigene Aufgabe</button>
          <button className={`tab ${tab === 'image' ? 'active' : ''}`} onClick={() => setTab('image')}>Aus Bild</button>
        </div>
      </div>
      {tab === 'gen' && (
        <div className="row wrap mb">
          <span className="small muted">Schwierigkeit:</span>
          {([1, 2, 3] as Difficulty[]).map((x) => (
            <button key={x} className={`chip ${d === x ? 'active' : ''}`} onClick={() => { setD(x); newTask(x); }}>{['', 'Einstieg', 'Prüfungsniveau', 'Anspruchsvoll'][x]}</button>
          ))}
          <label className="row small muted" style={{ gap: 6, marginLeft: 12 }}>
            <input type="checkbox" checked={ordered} onChange={(e) => { setOrdered(e.target.checked); setTask((t) => ({ ...t, requireOrdered: e.target.checked })); }} />
            Streng: „größte zuerst, lückenlos“ verlangen
          </label>
          <span className="spacer" />
          <button className="btn" onClick={() => newTask()}><Icon name="RefreshCw" size={16} /> Neue Aufgabe</button>
        </div>
      )}
      {tab === 'own' && <OwnTask onCreate={(t) => { setTask(t); setTab('gen'); }} />}
      {tab === 'image' && <ImageTask onCreate={(t) => { setTask(t); setTab('gen'); }} />}
      {tab === 'gen' && (
        <QuestionView
          key={task.id + String(task.requireOrdered)}
          question={{ ...task, requireOrdered: ordered }}
          mode="ueben"
          onDone={(o) => recordAttempt({ questionId: task.id, skill: 'vlsm.plan', kind: 'vlsm', mode: 'ueben', difficulty: task.difficulty, question: task, response: o.response, correct: o.result.correct, score: o.result.score, errorTags: o.result.errorTags, hintsUsed: o.hintsUsed, durationMs: o.durationMs })}
        />
      )}
    </div>
  );
}

function buildTask(base: string, demands: Demand[], wanPrefix: 30 | 31, source: string): VlsmQuestion | string {
  const c = parseCidr(base);
  if (!c) return 'Das Ausgangsnetz ist ungültig (Format z. B. 192.168.10.0/24).';
  const norm = `${formatIp(networkAddress(c.ip, c.prefix))}/${c.prefix}`;
  const ds = demands.filter((x) => x.name.trim() && x.hosts > 0).map((x, i) => ({ id: `${x.kind}${i + 1}`, name: x.name.trim(), hosts: x.kind === 'wan' ? 2 : Math.floor(x.hosts), kind: x.kind }));
  if (!ds.length) return 'Bitte mindestens ein Netz angeben.';
  const need = totalRequired(ds, { wanPrefix });
  if (need > blockSize(c.prefix)) return `Der Bedarf (${need} Adressen) passt nicht in ${norm} (${blockSize(c.prefix)} Adressen).`;
  return {
    id: `own:${Date.now().toString(36)}`, kind: 'vlsm', skill: 'vlsm.plan', difficulty: 2, generated: true,
    prompt: `Teile **${norm}** mit VLSM auf (${source}). Vergib für jedes Netz Netzadresse und kleinstmögliches Präfix; WAN-Verbindungen erhalten /${wanPrefix}.`,
    base: norm, demands: ds, wanPrefix,
    hints: ['Größte Netze zuerst.', 'Präfix: kleinstes h mit 2^h − 2 ≥ Hosts.'],
    explanation: 'Die Musterlösung ergibt sich durch Vergabe der größten Netze zuerst, lückenlos ab Netzanfang. Alternative korrekte Pläne werden ebenfalls akzeptiert.',
  };
}

function DemandEditor({ demands, setDemands }: { demands: Demand[]; setDemands: (d: Demand[]) => void }) {
  const upd = (i: number, p: Partial<Demand>) => setDemands(demands.map((x, j) => (j === i ? { ...x, ...p } : x)));
  return (
    <table className="table">
      <thead><tr><th>Name</th><th>Hosts</th><th>Art</th><th /></tr></thead>
      <tbody>
        {demands.map((x, i) => (
          <tr key={i}>
            <td><input className="input" value={x.name} onChange={(e) => upd(i, { name: e.target.value })} /></td>
            <td><input className="input mono" style={{ width: 100 }} type="number" min={1} value={x.hosts} disabled={x.kind === 'wan'} onChange={(e) => upd(i, { hosts: +e.target.value })} /></td>
            <td><select className="input" value={x.kind} onChange={(e) => upd(i, { kind: e.target.value as 'lan' | 'wan', hosts: e.target.value === 'wan' ? 2 : x.hosts })}><option value="lan">LAN</option><option value="wan">WAN (P2P)</option></select></td>
            <td><button className="btn ghost sm" onClick={() => setDemands(demands.filter((_, j) => j !== i))}><Icon name="Trash2" size={14} /></button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function OwnTask({ onCreate }: { onCreate: (t: VlsmQuestion) => void }) {
  const [base, setBase] = useState('192.168.10.0/24');
  const [wan, setWan] = useState<30 | 31>(30);
  const [demands, setDemands] = useState<Demand[]>([
    { name: 'New York', hosts: 115, kind: 'lan' }, { name: 'San Jose', hosts: 48, kind: 'lan' }, { name: 'Fargo', hosts: 23, kind: 'lan' },
    { name: 'San Jose 2', hosts: 12, kind: 'lan' }, { name: 'WAN NY – SJ', hosts: 2, kind: 'wan' }, { name: 'WAN SJ – Fargo', hosts: 2, kind: 'wan' },
  ]);
  const [err, setErr] = useState<string | null>(null);
  return (
    <div className="card mb">
      <div className="card-title"><Icon name="PencilRuler" size={18} />Eigene Aufgabe (z. B. aus dem Unterricht) anlegen</div>
      <div className="row wrap">
        <label className="field">Ausgangsnetz<input className="input mono" value={base} onChange={(e) => setBase(e.target.value)} /></label>
        <label className="field">WAN-Konvention<select className="input" value={wan} onChange={(e) => setWan(+e.target.value as 30 | 31)}><option value={30}>/30 (2 nutzbar)</option><option value={31}>/31 (RFC 3021)</option></select></label>
      </div>
      <div className="mt"><DemandEditor demands={demands} setDemands={setDemands} /></div>
      <div className="row mt">
        <button className="btn sm" onClick={() => setDemands([...demands, { name: '', hosts: 10, kind: 'lan' }])}><Icon name="Plus" size={14} />Netz hinzufügen</button>
        <span className="spacer" />
        {err && <span className="small" style={{ color: 'var(--bad)' }}>{err}</span>}
        <button className="btn primary" onClick={() => { const t = buildTask(base, demands, wan, 'eigene Aufgabe'); typeof t === 'string' ? setErr(t) : onCreate(t); }}>Aufgabe erstellen</button>
      </div>
    </div>
  );
}

function ImageTask({ onCreate }: { onCreate: (t: VlsmQuestion) => void }) {
  const [img, setImg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [base, setBase] = useState('');
  const [wan, setWan] = useState<30 | 31>(30);
  const [demands, setDemands] = useState<Demand[] | null>(null);
  const onFile = (f: File) => {
    if (f.size > 8 * 1024 * 1024) return setErr('Bild ist zu groß (max. 8 MB).');
    const r = new FileReader();
    r.onload = () => { setImg(r.result as string); setDemands(null); setErr(null); };
    r.readAsDataURL(f);
  };
  const analyze = async () => {
    if (!img) return;
    setBusy(true);
    setErr(null);
    try {
      const res = await api.visionVlsm(img);
      setBase(res.base);
      setWan(res.wanPrefix === 31 ? 31 : 30);
      setDemands(res.demands.map((x) => ({ ...x, hosts: x.kind === 'wan' ? 2 : x.hosts })));
      setNotes(res.notes);
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="card mb">
      <div className="card-title"><Icon name="ImageUp" size={18} />Aufgabe aus Bild nachbauen <span className="badge ai">KI-Erkennung</span></div>
      <p className="small muted">Lade ein Foto oder einen Screenshot einer VLSM-Aufgabe hoch. Die KI liest Ausgangsnetz und Netzbedarf aus. <b>Bitte prüfe und korrigiere die erkannten Werte</b> – erst danach wird daraus eine Übung. Die Bewertung deiner Lösung erfolgt anschließend wieder exakt algorithmisch.</p>
      <div className="row wrap">
        <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
        <button className="btn primary" onClick={analyze} disabled={!img || busy}><Icon name="ScanText" size={16} />{busy ? 'Analysiere …' : 'Bild analysieren'}</button>
      </div>
      {err && <div className="small mt" style={{ color: 'var(--bad)' }}>{err}</div>}
      <div className="grid grid-2 mt">
        {img && <img src={img} alt="Hochgeladene Aufgabe" style={{ maxWidth: '100%', borderRadius: 10, border: '1px solid var(--border)' }} />}
        {demands && (
          <div className="col">
            <div className="hint small"><b>Erkannt – bitte prüfen:</b> {notes || 'keine Anmerkungen'}</div>
            <div className="row wrap">
              <label className="field">Ausgangsnetz<input className="input mono" value={base} onChange={(e) => setBase(e.target.value)} /></label>
              <label className="field">WAN<select className="input" value={wan} onChange={(e) => setWan(+e.target.value as 30 | 31)}><option value={30}>/30</option><option value={31}>/31</option></select></label>
            </div>
            <DemandEditor demands={demands} setDemands={setDemands} />
            <div className="row">
              <button className="btn sm" onClick={() => setDemands([...demands, { name: '', hosts: 10, kind: 'lan' }])}><Icon name="Plus" size={14} />Netz</button>
              <span className="spacer" />
              <button className="btn primary" onClick={() => { const t = buildTask(base, demands, wan, 'aus Bild übernommen'); typeof t === 'string' ? setErr(t) : onCreate(t); }}>Geprüft – als Übung starten</button>
            </div>
          </div>
        )}
      </div>
      <Md className="tiny dim mt">{'Hinweis: Die Bildanalyse benötigt den KI-Tutor (Anthropic-API oder Claude-Code-CLI). Das Bild wird dafür an den gewählten KI-Dienst gesendet.'}</Md>
    </div>
  );
}
