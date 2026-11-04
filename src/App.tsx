import React, { Suspense, lazy, useEffect, useState } from 'react';
import { StoreProvider, navigate, useRoute, useStore } from './lib/store';
import { Icon, Progress } from './components/common';
import { TutorChat } from './components/TutorPanel';
import { Dashboard } from './pages/Dashboard';
import { CurriculumPage, LessonPage, ModulePage } from './pages/Learn';
import { PracticeHome, PracticeSession, RemediationPage, WeaknessHome } from './pages/Practice';
import { ExamHome, ExamResult, ExamRun, type TestType } from './pages/Exam';
import { VlsmTrainer } from './pages/Vlsm';
import { HistoryPage, LabPage, SettingsPage, TutorPage } from './pages/Other';
import { isDue } from './core/learning';
import { CatalogHome, CatalogRound } from './pages/Catalog';
import type { RoundFilter } from './core/catalog';
import { ToolWindowLayer } from './components/ToolWindows';
import { TOOL_META, openTool, useToolWindows } from './lib/toolWindows';

const ToolsPage = lazy(() => import('./pages/Tools').then((m) => ({ default: m.ToolsPage })));

const NAV: { section?: string; route: string; label: string; icon: string; match?: string[] }[] = [
  { route: '/', label: 'Dashboard', icon: 'LayoutDashboard' },
  { section: 'Lernen', route: '/katalog', label: 'Fragenkatalog', icon: 'ListChecks', match: ['/katalog'] },
  { route: '/lehrplan', label: 'Lehrplan & Lernen', icon: 'BookOpen', match: ['/lehrplan', '/modul', '/lektion'] },
  { route: '/lektion/m05-l02', label: 'Subnetting lernen', icon: 'SplitSquareHorizontal' },
  { route: '/ueben', label: 'Üben', icon: 'Dumbbell', match: ['/ueben'] },
  { route: '/schwaechen', label: 'Schwachstellen', icon: 'Target', match: ['/schwaechen'] },
  { route: '/vlsm', label: 'VLSM-Trainer', icon: 'LayoutGrid' },
  { section: 'Prüfen', route: '/pruefung', label: 'Prüfung & Tests', icon: 'ClipboardCheck', match: ['/pruefung'] },
  { route: '/einstufung', label: 'Einstufungstest', icon: 'Gauge' },
  { section: 'Werkzeuge', route: '/labor', label: 'Experimentieren', icon: 'FlaskConical' },
  { route: '/werkzeuge', label: 'Werkzeuge', icon: 'Wrench' },
  { route: '/tutor', label: 'KI-Nachhilfe', icon: 'MessageCircle' },
  { route: '/historie', label: 'Historie & Statistik', icon: 'History' },
  { route: '/einstellungen', label: 'Einstellungen', icon: 'Settings' },
];

function Router({ route }: { route: string }) {
  const [path] = route.split('?');
  const p = path.split('/').filter(Boolean);
  switch (p[0]) {
    case undefined: return <Dashboard />;
    case 'katalog': return p[1] === 'runde' ? <CatalogRound filter={p[2] as RoundFilter} scope={p[3] ?? 'ap1'} key={route} /> : <CatalogHome />;
    case 'lehrplan': return <CurriculumPage />;
    case 'modul': return <ModulePage id={p[1]} key={p[1]} />;
    case 'lektion': return <LessonPage id={p[1]} key={p[1]} />;
    case 'ueben':
      if (!p[1]) return <PracticeHome />;
      if (p[1] === 'skill' || p[1] === 'modul') return <PracticeSession scope={`${p[1]}:${p[2]}`} key={path} />;
      return <PracticeSession scope={p[1]} key={path} />;
    case 'schwaechen': return p[1] ? <RemediationPage skill={p[1]} key={p[1]} /> : <WeaknessHome />;
    case 'vlsm': return <VlsmTrainer />;
    case 'pruefung':
      if (p[1] === 'start') return <ExamRun type={p[2] as TestType} module={p[3]} key={path} />;
      if (p[1] === 'ergebnis') return <ExamResult id={p[2]} key={p[2]} />;
      return <ExamHome />;
    case 'einstufung': return <PlacementIntro />;
    case 'labor': return <LabPage />;
    case 'werkzeuge': return <Suspense fallback={<div className="page dim">Lade …</div>}><ToolsPage /></Suspense>;
    case 'tutor': return <TutorPage />;
    case 'historie': return <HistoryPage />;
    case 'einstellungen': return <SettingsPage />;
    default: return <div className="page">Seite nicht gefunden. <button className="btn" onClick={() => navigate('/')}>Zum Dashboard</button></div>;
  }
}

function PlacementIntro() {
  const { settings, drafts } = useStore();
  const draft = drafts['exam:einstufung:'] as { responses: unknown[] } | undefined;
  return (
    <div className="page narrow">
      <h1>Einstufungstest</h1>
      <div className="block explain">
        <div className="block-label"><Icon name="Gauge" size={14} />So funktioniert es</div>
        <p>Rund 40 Aufgaben aus allen Fachbereichen – mit Schwerpunkt auf Binärsystem, IPv4, Subnetzmasken und Subnetting. Es gibt keine Hilfen und kein Zeitlimit. Lass Aufgaben, die du nicht kannst, ruhig <b>leer</b> – Raten verfälscht das Ergebnis.</p>
        <p>Danach kennt das System deinen echten Stand: Was du sicher kannst, wird nur noch gelegentlich wiederholt; Lücken werden gezielt aufgearbeitet.</p>
        {settings.placementDone && <p className="small muted">Du hast den Test schon einmal gemacht. Eine Wiederholung aktualisiert die Einschätzung.</p>}
        <button className="btn primary lg" onClick={() => navigate('/pruefung/start/einstufung')}>
          {draft ? `Test fortsetzen (${draft.responses.filter((r) => r !== null && r !== '').length}/${draft.responses.length} beantwortet)` : 'Test starten'}
        </button>
      </div>
    </div>
  );
}

function Shell() {
  const { loaded, error, tutorOpen, setTutorOpen, overallProgress, skills, settings, aiEnabled, staticMode } = useStore();
  const [route] = useRoute();
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const wins = useToolWindows();
  useEffect(() => {
    document.querySelector('.main')?.scrollTo({ top: 0 });
    setMenuOpen(false);
  }, [route]);
  if (error) return <div className="page"><div className="block result-bad"><b>Fehler:</b> {error}</div></div>;
  if (!loaded) return <div className="page dim">Lade FISI Academy …</div>;
  const dueCount = Object.values(skills).filter((s) => isDue(s, Date.now())).length;
  const active = (n: (typeof NAV)[number]) => (n.route === '/' ? route === '/' : (n.match ?? [n.route]).some((m) => route === m || route.startsWith(m + '/') || route.startsWith(m + '?')) && !(n.route === '/lehrplan' && route === '/lektion/m05-l02'));
  return (
    <div className={`app ${tutorOpen && aiEnabled ? 'tutor-open' : ''}`}>
      <div className="mobile-bar">
        <button className="btn ghost sm" aria-label="Menü öffnen" onClick={() => setMenuOpen(true)}><Icon name="Menu" size={20} /></button>
        FISI Academy
        <span className="spacer" />
        <span className="tiny dim">{Math.round(overallProgress * 100)} %</span>
      </div>
      {menuOpen && <div className="sidebar-backdrop" onClick={() => setMenuOpen(false)} />}
      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="brand">
          <div className="brand-logo"><Icon name="Network" size={20} /></div>
          <div>FISI Academy<small>Prüfungsvorbereitung AP1 & AP2</small></div>
        </div>
        {NAV.filter((n) => !(staticMode && n.route === '/tutor')).map((n) => (
          <React.Fragment key={n.route + n.label}>
            {n.section && <div className="nav-section">{n.section}</div>}
            {n.route === '/werkzeuge' ? (
              <>
                <button className={`nav-item ${active(n) ? 'active' : ''}`} aria-expanded={toolsOpen} onClick={() => setToolsOpen(!toolsOpen)}>
                  <Icon name={n.icon} size={18} />{n.label}
                  {wins.length > 0 && <span className="badge">{wins.length}</span>}
                  <span style={{ marginLeft: wins.length ? 6 : 'auto', display: 'flex' }}><Icon name={toolsOpen ? 'ChevronUp' : 'ChevronDown'} size={15} /></span>
                </button>
                {toolsOpen && (
                  <div className="nav-sub">
                    {TOOL_META.map((t) => (
                      <button key={t.id} className={`nav-item sub ${wins.some((w) => w.id === t.id) ? 'on' : ''}`} onClick={() => { openTool(t.id); setMenuOpen(false); }}>
                        <Icon name={t.icon} size={15} />{t.label}
                      </button>
                    ))}
                    <button className="nav-item sub dim" onClick={() => navigate('/werkzeuge')}><Icon name="LayoutPanelTop" size={15} />Alle als Seite</button>
                  </div>
                )}
              </>
            ) : (
              <button className={`nav-item ${active(n) ? 'active' : ''}`} onClick={() => navigate(n.route)}>
                <Icon name={n.icon} size={18} />{n.label}
                {n.route === '/schwaechen' && dueCount > 0 && <span className="badge warn">{dueCount}</span>}
              </button>
            )}
          </React.Fragment>
        ))}
        <div className="sidebar-footer">
          <div className="card" style={{ padding: 12 }}>
            <div className="row between tiny dim"><span>Kenntnisstand AP1</span><b>{Math.round(overallProgress * 100)} %</b></div>
            <div className="mt" style={{ marginTop: 8 }}><Progress value={overallProgress} /></div>
          </div>
          {aiEnabled && (
            <button className="nav-item mt" onClick={() => setTutorOpen(!tutorOpen)} style={{ background: tutorOpen ? 'var(--accent-soft)' : undefined }}>
              <Icon name="GraduationCap" size={18} />KI-Tutor {tutorOpen ? 'ausblenden' : 'einblenden'}
            </button>
          )}
          {settings.examDate && <div className="tiny dim" style={{ padding: '6px 12px' }}>Prüfung in {Math.max(0, Math.ceil((new Date(settings.examDate).getTime() - Date.now()) / 86400000))} Tagen</div>}
        </div>
      </aside>
      <main className="main">
        <Router route={route} />
      </main>
      <ToolWindowLayer />
      {tutorOpen && aiEnabled && <TutorChat />}
      {!tutorOpen && aiEnabled && (
        <button className="btn primary" style={{ position: 'fixed', right: 22, bottom: 22, borderRadius: 99, padding: '12px 18px', boxShadow: 'var(--shadow)' }} onClick={() => setTutorOpen(true)}>
          <Icon name="GraduationCap" size={18} /> Tutor fragen
        </button>
      )}
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
