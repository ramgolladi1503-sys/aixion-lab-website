import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { ArrowRight, ChevronDown, Github, Menu, Volume2, VolumeX, X } from 'lucide-react';
import { useAmbientSound } from './useAmbientSound';
import { referenceWorldAssets } from './reference-world-assets';

type View = 'home' | 'why' | 'systems' | 'evidence' | 'principles' | 'founder' | 'contact';
type SceneName = 'overview' | 'why' | 'systems' | 'evidence' | 'principles' | 'founder' | 'contact';

const views: Array<{ label: string; view: Exclude<View, 'home'> }> = [
  { label: 'Why', view: 'why' },
  { label: 'Systems', view: 'systems' },
  { label: 'Evidence', view: 'evidence' },
  { label: 'Principles', view: 'principles' },
  { label: 'Founder', view: 'founder' },
  { label: 'Contact', view: 'contact' },
];

const systems = [
  ['Aixion Control Tower', 'FLAGSHIP BUILD', 'Controlled execution for AI-assisted software work.'],
  ['TradeBot Reliability Lab', 'APPLIED RESEARCH', 'Real-time systems research for failure, recovery, and operational truth.'],
  ['Research Directions', 'EARLY RESEARCH', 'Runtime boundaries, verification concepts, and evidence-aware engineering.'],
] as const;

const evidenceStages = ['Problem', 'Engineering response', 'Validation', 'Boundary'] as const;

const systemsMapLabels = [
  ['Control Tower', 'FLAGSHIP BUILD'],
  ['Verification', 'EVIDENCE DISCIPLINE'],
  ['Runtime Reliability', 'APPLIED RESEARCH'],
  ['Research', 'EARLY RESEARCH'],
  ['Governance', 'CONTROL BOUNDARIES'],
] as const;

const principles = [
  'Evidence before claims',
  'Unknown state fails closed',
  'Consequence deserves boundaries',
  'Failure becomes regression evidence',
  'Maturity stays evidence-bound',
] as const;

const journey = [
  'Software quality',
  'Automation',
  'Runtime reliability',
  'AI-assisted engineering',
  'Control & evidence',
  'AIXION LAB',
] as const;

function currentView(): View {
  const route = window.location.hash.replace('#/', '').replace('#', '');
  if (route === 'why' || route === 'systems' || route === 'evidence' || route === 'principles' || route === 'founder' || route === 'contact') return route;
  return 'home';
}

function Brand() {
  return (
    <span className="experience-brand ref-brand">
      <img src="/brand/aixion-lab-primary.png" alt="AIXION LAB — End is the new beginning" draggable="false" />
      <span aria-hidden="true">AIXION LAB</span>
    </span>
  );
}

function WorldPlate({ scene, children, className = '' }: { scene: SceneName; children?: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / Math.max(1, rect.width) - 0.5;
    const y = (event.clientY - rect.top) / Math.max(1, rect.height) - 0.5;
    ref.current.style.setProperty('--plate-x', x.toFixed(3));
    ref.current.style.setProperty('--plate-y', y.toFixed(3));
  };

  return (
    <div ref={ref} className={`reference-world reference-world--${scene} ${className}`} onPointerMove={onPointerMove} onPointerLeave={() => {
      ref.current?.style.setProperty('--plate-x', '0');
      ref.current?.style.setProperty('--plate-y', '0');
    }}>
      <div className="reference-world__glow" aria-hidden="true" />
      <img className="reference-world__image" src={referenceWorldAssets[scene]} alt="" aria-hidden="true" draggable="false" />
      <div className="reference-world__foreground" aria-hidden="true" />
      <div className="reference-world__haze" aria-hidden="true" />
      {children}
    </div>
  );
}

function ChapterRail() {
  return (
    <nav className="ref-chapter-rail" aria-label="Experience chapters">
      <span className="is-active"><i />01 <b>Overview</b></span>
      <a href="#systems-preview"><i />02 <b>Systems</b></a>
      <a href="#evidence-preview"><i />03 <b>Evidence</b></a>
      <a href="#principles-preview"><i />04 <b>Principles</b></a>
      <a href="#founder-preview"><i />05 <b>Founder</b></a>
      <a href="#contact-preview"><i />06 <b>Contact</b></a>
    </nav>
  );
}

function HeroScene() {
  return (
    <main id="aixion-home-experience" className="ref-scene ref-scene--hero">
      <div className="ref-scene__ambient ref-scene__ambient--top" />
      <div className="ref-shell ref-hero-layout">
        <div className="ref-copy ref-copy--hero">
          <span className="ref-kicker">CONTROL • RELIABILITY • EVIDENCE</span>
          <h1>Intelligence<br />in Control.</h1>
          <p>AIXION LAB builds systems for controlled execution, runtime reliability, and evidence-backed software operations.</p>
          <a className="ref-cta" href="#systems-preview">Explore the system <ArrowRight size={17} /></a>
          <ChapterRail />
          <span className="ref-scroll-cue">Scroll to begin <ChevronDown size={14} /></span>
        </div>

        <WorldPlate scene="overview" className="ref-world--hero">
          <div className="ref-glass-card ref-glass-card--hero-a"><b>CONTROL BOUNDARIES</b><small>Human review before consequential change.</small></div>
          <div className="ref-glass-card ref-glass-card--hero-b"><b>RUNTIME RELIABILITY</b><small>Operational truth, recovery, and fail-closed behavior.</small></div>
          <div className="ref-glass-card ref-glass-card--hero-c"><b>EVIDENCE PATHS</b><small>Claims stop where supporting evidence stops.</small></div>
          <div className="ref-glass-card ref-glass-card--hero-d"><b>RESEARCH DIRECTIONS</b><small>Exploratory work remains visibly separated by maturity.</small></div>
        </WorldPlate>
      </div>
    </main>
  );
}

function SystemsScene({ detail = false }: { detail?: boolean }) {
  return (
    <section id={detail ? undefined : 'systems-preview'} className="ref-scene ref-scene--systems">
      <div className="ref-shell ref-section-layout">
        <div className="ref-copy">
          <span className="ref-kicker">02 / SYSTEMS</span>
          <h2>Systems that govern intelligence.</h2>
          <p>Three bodies of work are separated by purpose and maturity, while sharing one control, reliability, and evidence philosophy.</p>
          {!detail && <a className="ref-text-link" href="#/systems">Explore all systems <ArrowRight size={15} /></a>}
          {detail && <div className="ref-detail-list">{systems.map(([name, status, summary]) => <article key={name}><span>{status}</span><h3>{name}</h3><p>{summary}</p></article>)}</div>}
        </div>
        <WorldPlate scene="systems">
          {systemsMapLabels.map(([name, status], index) => (
            <div key={name} className={`ref-hotspot ref-hotspot--systems-${index + 1}`}>
              <span>0{index + 1}</span><b>{name}</b><small>{status}</small>
            </div>
          ))}
          <div className="ref-guide-dot ref-guide-dot--systems" aria-hidden="true" />
        </WorldPlate>
      </div>
    </section>
  );
}

function EvidenceScene({ detail = false }: { detail?: boolean }) {
  return (
    <section id={detail ? undefined : 'evidence-preview'} className="ref-scene ref-scene--evidence">
      <div className="ref-shell ref-section-layout">
        <div className="ref-copy">
          <span className="ref-kicker">03 / EVIDENCE</span>
          <h2>Evidence over assumption.</h2>
          <p>Problem, engineering response, validation, and boundary stay visibly separate. The point where evidence stops is part of the result.</p>
          {!detail && <a className="ref-text-link" href="#/evidence">Open the evidence cases <ArrowRight size={15} /></a>}
          {detail && <div className="ref-stage-list">{evidenceStages.map((stage, i) => <span key={stage}><b>0{i + 1}</b>{stage}</span>)}</div>}
        </div>
        <WorldPlate scene="evidence" className="ref-world--evidence">
          {evidenceStages.map((stage, i) => <div key={stage} className={`ref-evidence-label ref-evidence-label--${i + 1}`}><b>0{i + 1}</b><span>{stage}</span></div>)}
          <div className="ref-guide-dot ref-guide-dot--evidence" aria-hidden="true" />
        </WorldPlate>
      </div>
    </section>
  );
}

function PrinciplesScene({ detail = false }: { detail?: boolean }) {
  return (
    <section id={detail ? undefined : 'principles-preview'} className="ref-scene ref-scene--principles">
      <div className="ref-shell ref-section-layout">
        <div className="ref-copy">
          <span className="ref-kicker">04 / PRINCIPLES</span>
          <h2>Principles that shape every system.</h2>
          <p>Five constraints guide how capability is built, validated, bounded, and described.</p>
          {detail && <ol className="ref-principle-list">{principles.map((item, i) => <li key={item}><b>0{i + 1}</b>{item}</li>)}</ol>}
        </div>
        <WorldPlate scene="principles" className="ref-world--principles">
          {principles.map((item, i) => <div key={item} className={`ref-principle-tag ref-principle-tag--${i + 1}`}><span>0{i + 1}</span><b>{item}</b></div>)}
        </WorldPlate>
      </div>
    </section>
  );
}

function FounderScene({ detail = false }: { detail?: boolean }) {
  return (
    <section id={detail ? undefined : 'founder-preview'} className="ref-scene ref-scene--founder">
      <div className="ref-shell ref-section-layout">
        <div className="ref-copy">
          <span className="ref-kicker">05 / FOUNDER</span>
          <h2>The builder behind the system.</h2>
          <p><strong>Ram Golladi — Founder / AI Systems Builder.</strong> A journey from software quality through automation, runtime reliability, AI-assisted engineering, and evidence-aware systems building.</p>
          {!detail && <a className="ref-text-link" href="#/founder">Explore the journey <ArrowRight size={15} /></a>}
          {detail && <div className="ref-journey-list">{journey.map((item, i) => <span key={item}><b>0{i + 1}</b>{item}</span>)}</div>}
        </div>
        <WorldPlate scene="founder" className="ref-world--founder">
          <div className="ref-founder-card ref-founder-card--1"><span>01</span><b>Software quality</b><small>Testing discipline and engineering rigor.</small></div>
          <div className="ref-founder-card ref-founder-card--2"><span>03</span><b>Runtime reliability</b><small>Recovery truth and fail-closed state handling.</small></div>
          <div className="ref-founder-card ref-founder-card--3"><span>04</span><b>AI-assisted engineering</b><small>Human-directed workflows with explicit control.</small></div>
          <div className="ref-founder-card ref-founder-card--4"><span>05</span><b>Control & evidence</b><small>Reviewable boundaries and evidence-aware systems.</small></div>
          <div className="ref-guide-dot ref-guide-dot--founder" aria-hidden="true" />
          <div className="ref-summit-label"><span>06</span><b>AIXION LAB</b><small>Control • reliability • evidence</small></div>
        </WorldPlate>
      </div>
    </section>
  );
}

function ContactScene({ detail = false }: { detail?: boolean }) {
  return (
    <section id={detail ? undefined : 'contact-preview'} className="ref-scene ref-scene--contact">
      <WorldPlate scene="contact" className="ref-world--contact" />
      <div className="ref-shell ref-contact-copy">
        <span className="ref-kicker">06 / CONTACT</span>
        <h2>Let&apos;s build the future, responsibly.</h2>
        <p>Product discussions, technical collaboration, research questions, or system-design conversations.</p>
        <a className="ref-cta" href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ArrowRight size={16} /></a>
      </div>
    </section>
  );
}

function WhyScene() {
  return (
    <section className="ref-scene ref-scene--why">
      <div className="ref-shell ref-section-layout">
        <div className="ref-copy">
          <span className="ref-kicker">01 / WHY</span>
          <h2>Capability is only the beginning.</h2>
          <p>AIXION LAB focuses on the systems around AI-assisted work: explicit execution boundaries, trustworthy runtime state, and evidence that stays connected to what actually happened.</p>
        </div>
        <WorldPlate scene="why" />
      </div>
    </section>
  );
}

function HomeChapters() {
  return <><SystemsScene /><EvidenceScene /><PrinciplesScene /><FounderScene /><ContactScene /></>;
}

export default function App() {
  const [view, setView] = useState<View>(() => currentView());
  const [menu, setMenu] = useState(false);
  const { enabled: soundEnabled, supported: soundSupported, toggle: toggleSound } = useAmbientSound();

  useEffect(() => {
    const sync = () => {
      setView(currentView());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const navigate = (next: View) => {
    setMenu(false);
    window.location.hash = next === 'home' ? '' : `/${next}`;
    setView(next);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <div className="experience-site ref-site">
      <header className="experience-header ref-header">
        <div className="ref-shell ref-header-inner">
          <button className="experience-brand-button" onClick={() => navigate('home')} aria-label="AIXION LAB home"><Brand /></button>
          <nav className="experience-nav ref-nav" aria-label="Primary navigation">
            {views.map((item) => <button key={item.view} className={view === item.view ? 'is-active' : ''} onClick={() => navigate(item.view)}>{item.label}</button>)}
          </nav>
          <div className="ref-header-actions">
            {soundSupported && <button className={`ref-utility ${soundEnabled ? 'is-on' : ''}`} onClick={toggleSound} aria-label={soundEnabled ? 'Mute ambient sound' : 'Enable ambient sound'}>{soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}<span>Sound</span></button>}
            <button className="ref-menu" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">{menu ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
        </div>
        {menu && <nav className="ref-mobile-nav">{views.map((item) => <button key={item.view} onClick={() => navigate(item.view)}>{item.label}</button>)}</nav>}
      </header>

      {view === 'home' && <><HeroScene /><HomeChapters /></>}
      {view === 'why' && <WhyScene />}
      {view === 'systems' && <SystemsScene detail />}
      {view === 'evidence' && <EvidenceScene detail />}
      {view === 'principles' && <PrinciplesScene detail />}
      {view === 'founder' && <FounderScene detail />}
      {view === 'contact' && <ContactScene detail />}

      <footer className="ref-footer">
        <div className="ref-shell ref-footer-inner">
          <div><strong>AIXION LAB</strong><span>END IS THE NEW BEGINNING</span></div>
          <span>© 2026 AIXION LAB. All rights reserved.</span>
          <a href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a>
        </div>
        <div className="ref-shell ref-footer-note">Financial-systems work shown publicly is research and systems-reliability work only, not investment advice.</div>
      </footer>

    </div>
  );
}
