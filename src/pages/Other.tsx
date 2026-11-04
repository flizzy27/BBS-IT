/**
 * Lernhistorie & Fehleranalyse, Einstellungen, Tutor-Seite, Experimentieren.
 */
import React, { useEffect, useMemo, useState } from 'react';
import { MODULES, SKILL_MAP, skillTitle } from '../content';
import { errorInfo } from '../core/errors';
import { knowledge, STAGE_LABEL } from '../core/learning';
import { api, localDay, type AiStatus, type Attempt, type TestRecord } from '../lib/api';
import { navigate, useStore } from '../lib/store';
import { BarChart, Empty, Icon, LineChart, Md, Modal, Progress, fmtDate, fmtDuration } from '../components/common';
import { QuestionView, kindLabel } from '../components/QuestionView';
import { grade } from '../core/grading';
import { TutorChat } from '../components/TutorPanel';
import { SubnetBar, IpBinary, VlsmBoxes, BinaryOctet, MacTableSim, Encapsulation, Layers } from '../components/widgets';

/* ------------------------------ Historie ------------------------------ */

export function HistoryPage() {
  const { skills } = useStore();
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [tests, setTests] = useState<TestRecord[]>([]);
  const [tab, setTab] = useState<'stats' | 'errors' | 'list' | 'skills'>('stats');
  const [filter, setFilter] = useState<'all' | 'wrong'>('all');
  const [detail, setDetail] = useState<Attempt | null>(null);
  useEffect(() => {
    api.attempts(3000).then(setAttempts).catch(() => {});
    api.tests().then(setTests).catch(() => {});
  }, []);
  const now = Date.now();

  const daily = useMemo(() => {
    const m = new Map<string, { n: number; ok: number }>();
    for (const a of attempts) {
      const d = localDay(a.ts);
      const e = m.get(d) ?? { n: 0, ok: 0 };
      e.n++;
      if (a.correct) e.ok++;
      m.set(d, e);
    }
    return [...m.entries()].sort().slice(-30).map(([d, e]) => ({ label: d.slice(8, 10) + '.' + d.slice(5, 7), value: (e.ok / e.n) * 100, n: e.n }));
  }, [attempts]);

  const errorStats = useMemo(() => {
    const m = new Map<string, { n: number; last: number; skills: Set<string> }>();
    for (const a of attempts) for (const t of a.errorTags) {
      const e = m.get(t) ?? { n: 0, last: 0, skills: new Set() };
      e.n++;
      e.last = Math.max(e.last, a.ts);
      e.skills.add(a.skill);
      m.set(t, e);
    }
    return [...m.entries()].sort((a, b) => b[1].n - a[1].n);
  }, [attempts]);

  const total = attempts.length;
  const ok = attempts.filter((a) => a.correct).length;
  const avgTime = total ? attempts.reduce((s, a) => s + a.durationMs, 0) / total / 1000 : 0;
  const hints = attempts.reduce((s, a) => s + a.hintsUsed, 0);

  return (
    <div className="page">
      <div className="page-header">
        <div><h1>Lernhistorie & Statistik</h1><p>Alle bearbeiteten Aufgaben, Fehler und deine Entwicklung – lokal gespeichert.</p></div>
        <div className="tabs">
          {([['stats', 'Statistik'], ['errors', 'Fehleranalyse'], ['skills', 'Kompetenzen'], ['list', 'Alle Aufgaben']] as const).map(([k, l]) => (
            <button key={k} className={`tab ${tab === k ? 'active' : ''}`} onClick={() => setTab(k)}>{l}</button>
          ))}
        </div>
      </div>
      {tab === 'stats' && (
        <>
          <div className="grid grid-4">
            <div className="card stat"><span className="label">Aufgaben</span><span className="value">{total}</span></div>
            <div className="card stat"><span className="label">Trefferquote</span><span className="value">{total ? Math.round((ok / total) * 100) : 0} %</span></div>
            <div className="card stat"><span className="label">Ø Bearbeitungszeit</span><span className="value">{fmtDuration(avgTime)}</span></div>
            <div className="card stat"><span className="label">Genutzte Tipps</span><span className="value">{hints}</span></div>
          </div>
          <div className="grid grid-2 mt">
            <div className="card"><div className="card-title"><Icon name="TrendingUp" size={18} />Trefferquote pro Tag</div><LineChart points={daily} /></div>
            <div className="card"><div className="card-title"><Icon name="BarChart3" size={18} />Aufgaben pro Tag</div><BarChart bars={daily.slice(-14).map((d) => ({ label: d.label.slice(0, 2), value: d.n }))} /></div>
            <div className="card"><div className="card-title"><Icon name="Award" size={18} />Testergebnisse</div>
              <LineChart points={[...tests].reverse().map((t) => ({ label: new Date(t.tsStart).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' }), value: t.maxScore ? ((t.score ?? 0) / t.maxScore) * 100 : 0 }))} />
            </div>
            <div className="card"><div className="card-title"><Icon name="PieChart" size={18} />Aufgaben nach Modul</div>
              <BarChart bars={MODULES.map((m) => ({ label: String(m.nr), value: attempts.filter((a) => a.module === m.id).length }))} />
            </div>
          </div>
        </>
      )}
      {tab === 'errors' && (
        <div className="card">
          {errorStats.length === 0 ? <Empty icon="SearchCheck">Noch keine Fehler gespeichert.</Empty> : (
            <table className="table">
              <thead><tr><th>Fehlerkategorie</th><th>Ursache</th><th>Häufigkeit</th><th>Zuletzt</th><th /></tr></thead>
              <tbody>
                {errorStats.map(([t, e]) => {
                  const info = errorInfo(t);
                  return (
                    <tr key={t}>
                      <td><b>{info.title}</b><div className="tiny dim">{[...e.skills].map(skillTitle).join(', ')}</div></td>
                      <td className="small" style={{ maxWidth: 380 }}><Md className="small">{info.cause || '–'}</Md></td>
                      <td><span className="badge bad">{e.n}×</span></td>
                      <td className="small dim">{fmtDate(e.last)}</td>
                      <td>{info.skill && <button className="btn sm" onClick={() => navigate(`/schwaechen/${info.skill}`)}>Fördern</button>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
      {tab === 'skills' && (
        <div className="card">
          <table className="table">
            <thead><tr><th>Kompetenz</th><th>Stufe</th><th>Kenntnisstand</th><th>Versuche</th><th>Nächste Wiederholung</th></tr></thead>
            <tbody>
              {[...SKILL_MAP.values()].filter((s) => skills[s.id]).map((s) => {
                const st = skills[s.id];
                return (
                  <tr key={s.id} className="clickable" onClick={() => navigate(`/ueben/skill/${s.id}`)}>
                    <td>{s.title}<div className="tiny dim">{MODULES.find((m) => m.id === s.module)?.title}</div></td>
                    <td className="small">{STAGE_LABEL[st.stage]}</td>
                    <td style={{ width: 160 }}><Progress value={knowledge(st, now)} /></td>
                    <td className="small">{st.correct}/{st.attempts}</td>
                    <td className="small dim">{st.attempts ? (st.due <= now ? 'fällig' : new Date(st.due).toLocaleDateString('de-DE')) : '–'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {!Object.keys(skills).length && <Empty>Noch keine Kompetenzen erfasst.</Empty>}
        </div>
      )}
      {tab === 'list' && (
        <div className="card">
          <div className="row mb">
            <button className={`chip ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Alle</button>
            <button className={`chip ${filter === 'wrong' ? 'active' : ''}`} onClick={() => setFilter('wrong')}>Nur falsche</button>
          </div>
          <table className="table small">
            <thead><tr><th /><th>Zeit</th><th>Thema</th><th>Format</th><th>Modus</th><th>Dauer</th><th>Tipps</th><th>Fehler</th></tr></thead>
            <tbody>
              {attempts.filter((a) => filter === 'all' || !a.correct).slice(0, 400).map((a) => (
                <tr key={a.id} className="clickable" onClick={() => setDetail(a)}>
                  <td><Icon name={a.correct ? 'CircleCheck' : a.score > 0 ? 'CircleDot' : 'CircleX'} size={16} /></td>
                  <td className="dim">{fmtDate(a.ts)}</td>
                  <td>{skillTitle(a.skill)}</td>
                  <td>{kindLabel(a.kind as never)}</td>
                  <td>{a.mode}</td>
                  <td>{fmtDuration(a.durationMs / 1000)}</td>
                  <td>{a.hintsUsed || ''}</td>
                  <td className="tiny">{a.errorTags.map((t) => errorInfo(t).title).join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!attempts.length && <Empty>Noch keine Aufgaben bearbeitet.</Empty>}
        </div>
      )}
      {detail && (
        <Modal onClose={() => setDetail(null)}>
          <div className="row between mb"><b>{fmtDate(detail.ts)} · {skillTitle(detail.skill)}</b><button className="btn ghost sm" onClick={() => setDetail(null)}><Icon name="X" size={16} /></button></div>
          <QuestionView question={detail.question} mode="pruefung" hideSubmit initialResponse={detail.response as never} reviewResult={{ ...grade(detail.question, detail.response as never), correct: detail.correct, score: detail.score }} compact />
        </Modal>
      )}
    </div>
  );
}

/* ------------------------------ Einstellungen ------------------------------ */

export function SettingsPage() {
  const { settings, updateSettings, reload } = useStore();
  const [ai, setAi] = useState<AiStatus | null>(null);
  const [key, setKey] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);
  useEffect(() => {
    api.aiStatus().then(setAi).catch(() => {});
  }, []);
  const save = async (p: Parameters<typeof api.aiConfig>[0]) => {
    try {
      setAi(await api.aiConfig(p));
      setMsg('Gespeichert.');
    } catch (e) {
      setMsg((e as Error).message);
    }
  };
  const doExport = async () => {
    const data = await api.exportAll();
    const blob = new Blob([JSON.stringify(data, null, 1)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `network-academy-sicherung-${localDay()}.json`;
    a.click();
  };
  const doImport = async (f: File) => {
    try {
      await api.importAll(JSON.parse(await f.text()));
      await reload();
      setMsg('Sicherung importiert.');
    } catch (e) {
      setMsg('Import fehlgeschlagen: ' + (e as Error).message);
    }
  };
  const model = ai?.models.find((m) => m.id === ai.model);
  return (
    <div className="page narrow">
      <h1>Einstellungen</h1>
      {msg && <div className="hint mb">{msg}</div>}
      <div className="card mb">
        <div className="card-title"><Icon name="User" size={18} />Profil</div>
        <div className="grid grid-2">
          <label className="field">Name (optional)<input className="input" value={settings.name} onChange={(e) => updateSettings({ name: e.target.value })} /></label>
          <label className="field">Prüfungstermin (optional)<input className="input" type="date" value={settings.examDate ?? ''} onChange={(e) => updateSettings({ examDate: e.target.value })} /></label>
          <label className="field">Tagesziel (Minuten)<input className="input" type="number" min={5} value={settings.dailyGoalMin} onChange={(e) => updateSettings({ dailyGoalMin: +e.target.value })} /></label>
          <label className="field">Darstellung<select className="input" value={settings.theme} onChange={(e) => updateSettings({ theme: e.target.value as 'dark' | 'light' })}><option value="dark">Dunkel</option><option value="light">Hell</option></select></label>
        </div>
        <label className="field mt">Mein Kenntnisstand (Selbstauskunft – der Tutor berücksichtigt das)<textarea className="input" rows={4} value={settings.selfReport} onChange={(e) => updateSettings({ selfReport: e.target.value })} /></label>
      </div>

      <div className="card mb">
        <div className="card-title"><Icon name="Sparkles" size={18} />KI-Tutor</div>
        {ai?.staticMode ? (
          <p className="small muted">Du nutzt die gehostete Web-Version. Der KI-Tutor ist nur in der lokal installierten Version verfügbar (siehe README).</p>
        ) : ai && (
          <div className="col">
            <label className="field">Anbieter
              <select className="input" value={ai.provider} onChange={(e) => save({ provider: e.target.value })}>
                <option value="none">Keiner – Lernen ohne KI (alle Aufgaben werden trotzdem exakt geprüft)</option>
                <option value="anthropic">Anthropic-API (empfohlen, eigener API-Schlüssel, nutzungsabhängige Kosten)</option>
                <option value="claude-cli" disabled={!ai.cli}>Claude-Code-CLI auf diesem PC {ai.cli ? `(${ai.cli})` : '(nicht gefunden)'}</option>
              </select>
            </label>
            {ai.provider === 'anthropic' && (
              <>
                <label className="field">Modell
                  <select className="input" value={ai.model} onChange={(e) => save({ model: e.target.value })}>
                    {ai.models.map((m) => <option key={m.id} value={m.id}>{m.label} – {m.input} $ / {m.output} $ pro 1 Mio. Tokens (Ein-/Ausgabe)</option>)}
                  </select>
                </label>
                <label className="field">Denktiefe (effort)
                  <select className="input" value={ai.effort} onChange={(e) => save({ effort: e.target.value })}>
                    <option value="low">niedrig – schnell & günstig</option><option value="medium">mittel (Standard)</option><option value="high">hoch – gründlicher, teurer</option>
                  </select>
                </label>
                <div className="row" style={{ alignItems: 'flex-end' }}>
                  <label className="field" style={{ flex: 1 }}>API-Schlüssel {ai.apiKeySet && <span className="badge ok">gesetzt: {ai.apiKeyMasked} ({ai.apiKeySource})</span>}
                    <input className="input mono" type="password" placeholder="sk-ant-…" value={key} onChange={(e) => setKey(e.target.value)} autoComplete="off" />
                  </label>
                  <button className="btn" onClick={() => { save({ apiKey: key }); setKey(''); }} disabled={!key}>Speichern</button>
                  {ai.apiKeySet && ai.apiKeySource !== 'Umgebungsvariable ANTHROPIC_API_KEY' && <button className="btn ghost" onClick={() => save({ apiKey: '' })}>Entfernen</button>}
                </div>
                <div className="small muted">
                  Der Schlüssel wird nur lokal in <code>data/secrets.json</code> gespeichert (nicht im Quellcode, nicht im Git-Repository, nie an den Browser zurückgegeben). Alternativ: Umgebungsvariable <code>ANTHROPIC_API_KEY</code>.
                  {model && <> Grobe Kosten: eine Tutor-Antwort mit Lernkontext ≈ 3.000 Eingabe- + 800 Ausgabe-Tokens ≈ {((3000 * model.input + 800 * model.output) / 1e6 * 100).toFixed(1)} Cent (zzgl. Denk-Tokens).</>}
                </div>
              </>
            )}
            {ai.provider === 'claude-cli' && (
              <div className="small muted">
                Nutzt die auf diesem PC installierte und angemeldete Claude-Code-CLI im offiziellen Headless-Modus (<code>claude -p</code>). Die Nutzung läuft über deinen Claude-Code-Zugang und zählt auf dessen Nutzungslimits. Prüfe selbst die aktuellen Nutzungsbedingungen deines Plans – im Zweifel ist die Anthropic-API die eindeutig dafür vorgesehene Schnittstelle. Details in <code>docs/KI-TUTOR.md</code>.
              </div>
            )}
            {ai.provider !== 'none' && (
              <div className="row"><button className="btn" disabled={testing} onClick={async () => { setTesting(true); try { const r = await api.aiTest(); setMsg('Verbindung OK: ' + r.text); } catch (e) { setMsg('Fehler: ' + (e as Error).message); } setTesting(false); }}>{testing ? 'Teste …' : 'Verbindung testen'}</button></div>
            )}
          </div>
        )}
      </div>

      <div className="card mb">
        <div className="card-title"><Icon name="Database" size={18} />Daten</div>
        <p className="small muted">Alle Lerndaten liegen lokal ({ai?.staticMode ? 'im Browser-Speicher' : 'im Ordner data/ – täglich automatisch gesichert in data/backups'}).</p>
        <div className="row wrap">
          <button className="btn" onClick={doExport}><Icon name="Download" size={16} />Sicherung exportieren</button>
          <label className="btn"><Icon name="Upload" size={16} />Sicherung importieren<input type="file" accept="application/json" hidden onChange={(e) => e.target.files?.[0] && doImport(e.target.files[0])} /></label>
          <span className="spacer" />
          <button className="btn danger" onClick={async () => { if (prompt('Alle Lerndaten löschen? Tippe ZURÜCKSETZEN zur Bestätigung.') === 'ZURÜCKSETZEN') { await api.reset(); await reload(); setMsg('Zurückgesetzt.'); } }}>Alles zurücksetzen</button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Tutor-Seite ------------------------------ */

export function TutorPage() {
  const [threads, setThreads] = useState<{ id: string; title: string; updated: number }[]>([]);
  const [sel, setSel] = useState<string | undefined>(undefined);
  const { setTutorContext } = useStore();
  useEffect(() => {
    setTutorContext({ view: 'Freie KI-Nachhilfe (keine konkrete Aufgabe)' });
    api.threads().then(setThreads).catch(() => {});
  }, [sel, setTutorContext]);
  return (
    <div className="page">
      <div className="page-header"><div><h1>KI-Nachhilfe</h1><p>Freies Gespräch mit deinem Tutor – er kennt deinen Lernstand und deine typischen Fehler.</p></div></div>
      <div className="grid" style={{ gridTemplateColumns: '260px 1fr' }}>
        <div className="card" style={{ padding: 10, maxHeight: 'calc(100vh - 170px)', overflowY: 'auto' }}>
          <button className="btn primary sm" style={{ width: '100%' }} onClick={() => setSel(undefined)}><Icon name="Plus" size={14} />Neues Gespräch</button>
          <div className="col mt" style={{ gap: 2 }}>
            {threads.map((t) => (
              <div key={t.id} className={`nav-item ${sel === t.id ? 'active' : ''}`} onClick={() => setSel(t.id)}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="small" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.title}</div>
                  <div className="tiny dim">{fmtDate(t.updated)}</div>
                </div>
                <button className="btn ghost sm" onClick={async (e) => { e.stopPropagation(); await api.deleteThread(t.id); setThreads(threads.filter((x) => x.id !== t.id)); if (sel === t.id) setSel(undefined); }}><Icon name="Trash2" size={13} /></button>
              </div>
            ))}
            {!threads.length && <div className="tiny dim" style={{ padding: 8 }}>Noch keine Gespräche.</div>}
          </div>
        </div>
        <TutorChat full threadId={sel} />
      </div>
    </div>
  );
}

/* ------------------------------ Experimentieren ------------------------------ */

export function LabPage() {
  const [tab, setTab] = useState<'subnet' | 'bits' | 'vlsm' | 'switch' | 'osi'>('subnet');
  const [net, setNet] = useState('192.168.10.0');
  const [base, setBase] = useState(24);
  const [vnet, setVnet] = useState('192.168.10.0/24');
  const [vd, setVd] = useState('New York:115, San Jose:48, Fargo:23, San Jose 2:12, WAN1:2, WAN2:2');
  const demands = vd.split(',').map((s) => s.split(':')).filter((p) => p.length === 2 && +p[1] > 0).map(([n, h]) => ({ name: n.trim(), hosts: +h }));
  return (
    <div className="page">
      <div className="page-header">
        <div><h1>Freies Experimentieren</h1><p>Verändere Adressen, Masken und Präfixe und beobachte sofort die Auswirkungen.</p></div>
        <div className="tabs">
          {([['subnet', 'Subnetz-Balken'], ['bits', 'Bits & Maske'], ['vlsm', 'VLSM-Boxen'], ['switch', 'Switch-Simulation'], ['osi', 'OSI & Kapselung']] as const).map(([k, l]) => (
            <button key={k} className={`tab ${tab === k ? 'active' : ''}`} onClick={() => setTab(k)}>{l}</button>
          ))}
        </div>
      </div>
      <div className="block visual">
        {tab === 'subnet' && (
          <div className="col">
            <div className="row wrap">
              <label className="field">Ausgangsnetz<input className="input mono" value={net} onChange={(e) => setNet(e.target.value)} /></label>
              <label className="field">Ausgangspräfix<select className="input" value={base} onChange={(e) => setBase(+e.target.value)}>{[8, 12, 16, 20, 22, 23, 24, 25, 26].map((p) => <option key={p} value={p}>/{p}</option>)}</select></label>
            </div>
            <SubnetBar key={net + base} network={net} prefix={Math.min(30, base + 1)} minPrefix={base} maxPrefix={Math.min(32, base + 8)} />
          </div>
        )}
        {tab === 'bits' && (
          <div className="col">
            <IpBinary ip="192.168.10.77" prefix={26} editable />
            <div className="mt"><b className="small">Ein Oktett zum Anklicken</b><div className="mt"><BinaryOctet value={0} editable /></div></div>
          </div>
        )}
        {tab === 'vlsm' && (
          <div className="col">
            <div className="row wrap">
              <label className="field">Ausgangsnetz<input className="input mono" value={vnet} onChange={(e) => setVnet(e.target.value)} /></label>
              <label className="field" style={{ flex: 1 }}>Netze (Name:Hosts, …)<input className="input" value={vd} onChange={(e) => setVd(e.target.value)} /></label>
            </div>
            {/^\d+\.\d+\.\d+\.\d+\/\d+$/.test(vnet) && <VlsmBoxes network={vnet.split('/')[0]} prefix={+vnet.split('/')[1]} demands={demands} />}
            <div className="tiny dim">Netze mit 2 Hosts werden als /30-WAN-Verbindungen geplant. Ein vollständiger Planer mit Prüfung steht unter „Werkzeuge“ und „VLSM-Trainer“.</div>
          </div>
        )}
        {tab === 'switch' && <MacTableSim />}
        {tab === 'osi' && <div className="col"><Layers mode="compare" /><div className="mt"><Encapsulation /></div></div>}
      </div>
    </div>
  );
}
