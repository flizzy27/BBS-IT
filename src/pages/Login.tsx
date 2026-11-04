/** Anmeldung für die Online-Version: Benutzername + Passwort, ohne E-Mail. */
import React, { useEffect, useState } from 'react';
import { Icon } from '../components/common';
import { authenticate, isCloud, openSession } from '../lib/cloud';

type Phase = { k: 'pruefen' } | { k: 'login' } | { k: 'bereit' } | { k: 'fehler'; msg: string };

/** Zeigt in der Online-Version erst die Anmeldung und lädt dann den Lernstand des Kontos; sonst direkt die App. */
export function AuthGate({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>({ k: 'pruefen' });
  const start = async () => {
    try {
      if (!(await isCloud())) return setPhase({ k: 'bereit' });
      setPhase((await openSession()) ? { k: 'bereit' } : { k: 'login' });
    } catch (e) {
      setPhase({ k: 'fehler', msg: (e as Error).message });
    }
  };
  useEffect(() => { void start(); }, []);
  if (phase.k === 'bereit') return <>{children}</>;
  if (phase.k === 'login') return <LoginPage onDone={start} />;
  if (phase.k === 'fehler') return <div className="page narrow"><div className="block result-bad"><b>Fehler:</b> {phase.msg}</div><button className="btn mt" onClick={start}>Erneut versuchen</button></div>;
  return <div className="page dim">Lade FISI Academy …</div>;
}

function LoginPage({ onDone }: { onDone: () => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    if (mode === 'register' && pw !== pw2) return setErr('Die beiden Passwörter sind nicht gleich.');
    setBusy(true);
    try {
      await authenticate(mode, name.trim(), pw);
      onDone();
    } catch (e2) {
      setErr((e2 as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="login-wrap">
      <form className="card login-card" onSubmit={submit}>
        <div className="brand" style={{ padding: 0, marginBottom: 6 }}>
          <div className="brand-logo"><Icon name="Network" size={20} /></div>
          <div>FISI Academy<small>Prüfungsvorbereitung AP1 & AP2</small></div>
        </div>
        <div className="tabs" role="tablist">
          <button type="button" role="tab" aria-selected={mode === 'login'} className={`tab ${mode === 'login' ? 'active' : ''}`} onClick={() => { setMode('login'); setErr(''); }}>Anmelden</button>
          <button type="button" role="tab" aria-selected={mode === 'register'} className={`tab ${mode === 'register' ? 'active' : ''}`} onClick={() => { setMode('register'); setErr(''); }}>Konto erstellen</button>
        </div>
        <label className="field">
          <span>Benutzername</span>
          <input className="input" autoFocus autoComplete="username" value={name} onChange={(e) => setName(e.target.value)} required minLength={3} maxLength={24} />
        </label>
        <label className="field">
          <span>Passwort</span>
          <input className="input" type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} value={pw} onChange={(e) => setPw(e.target.value)} required minLength={mode === 'register' ? 8 : 1} />
        </label>
        {mode === 'register' && (
          <label className="field">
            <span>Passwort wiederholen</span>
            <input className="input" type="password" autoComplete="new-password" value={pw2} onChange={(e) => setPw2(e.target.value)} required />
          </label>
        )}
        {err && <div className="small" style={{ color: 'var(--bad)' }} role="alert">{err}</div>}
        <button className="btn primary lg" disabled={busy}>{busy ? 'Bitte warten …' : mode === 'login' ? 'Anmelden' : 'Konto erstellen'}</button>
        <p className="tiny dim" style={{ margin: 0 }}>
          {mode === 'register'
            ? 'Keine E-Mail nötig. Merk dir dein Passwort gut – ohne E-Mail kann es nicht zurückgesetzt werden. Dein Lernstand, deine Tests und Fortschritte werden in deinem Konto gespeichert und sind auf jedem Gerät da.'
            : 'Dein Lernstand wird in deinem Konto gespeichert – auf jedem Gerät derselbe Stand.'}
        </p>
      </form>
    </div>
  );
}
