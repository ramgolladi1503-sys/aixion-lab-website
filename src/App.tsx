import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Github, Menu, Volume2, VolumeX, X } from 'lucide-react';
import ExperienceWorld from './ExperienceWorld';
import { useAmbientSound } from './useAmbientSound';

type View = 'home' | 'why' | 'systems' | 'evidence' | 'principles' | 'founder' | 'contact';

const views: Array<{ label: string; view: Exclude<View, 'home'> }> = [
  { label: 'Why', view: 'why' },
  { label: 'Systems', view: 'systems' },
  { label: 'Evidence', view: 'evidence' },
  { label: 'Principles', view: 'principles' },
  { label: 'Founder', view: 'founder' },
  { label: 'Contact', view: 'contact' },
];

const systems = [
  {
    name: 'Aixion Control Tower',
    status: 'FLAGSHIP BUILD',
    short: 'Controlled execution for AI-assisted software work.',
    bullets: ['Risk-aware review and approve / revise / reject flows', 'Validation checkpoints before consequential software changes', 'GitHub-oriented delivery and inspectable task state'],
  },
  {
    name: 'TradeBot Reliability Lab',
    status: 'APPLIED RESEARCH',
    short: 'Real-time systems research for failure, recovery, and operational truth.',
    bullets: ['Feed freshness and reconnect behavior', 'Fail-closed state handling and controlled recovery', 'Replay, evidence quality, and failure-oriented testing'],
  },
  {
    name: 'Research Directions',
    status: 'EARLY RESEARCH',
    short: 'Exploratory work on runtime boundaries and claim-to-evidence systems.',
    bullets: ['Runtime tool boundaries and sensitive-operation controls', 'Claim-to-evidence linking and engineering verification concepts', 'Research directions kept separate from product maturity'],
  },
] as const;

const evidenceCases = [
  ['Feed truth under disconnect and recovery', 'REAL-TIME RELIABILITY', 'What should a real-time system do when continuity or freshness can no longer be trusted?'],
  ['Approval-gated AI-assisted software work', 'CONTROL PLANE', 'Review, validation, and execution boundaries before consequential software changes become operational.'],
  ['Truth-first publication boundary', 'EVIDENCE GOVERNANCE', 'Public maturity language must not outrun the evidence that actually exists.'],
] as const;

const principles = [
  ['Evidence before claims', 'Published confidence stops where the supporting evidence stops.'],
  ['Unknown state fails closed', 'Missing or degraded truth is not silently converted into a healthy state.'],
  ['Consequence deserves boundaries', 'Actions that can change real systems should pass through explicit control points.'],
  ['Failure becomes regression evidence', 'Useful failures become reproducible engineering evidence.'],
  ['Maturity stays evidence-bound', 'Research, implementation, validation, and deployment remain separate claims.'],
] as const;

const journey = ['Software quality', 'Automation', 'Runtime reliability', 'AI-assisted engineering', 'Control & evidence', 'AIXION LAB'] as const;

function currentView(): View {
  const route = window.location.hash.replace('#/', '').replace('#', '');
  if (route === 'why' || route === 'systems' || route === 'evidence' || route === 'principles' || route === 'founder' || route === 'contact') return route;
  return 'home';
}

function Brand() {
  return (
    <span className="experience-brand">
      <img src="/brand/aixion-lab-primary.png" alt="AIXION LAB — End is the new beginning" draggable="false" />
      <span aria-hidden="true">AIXION LAB</span>
    </span>
  );
}

function ImmersiveHome() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / distance));
      section.style.setProperty('--experience-progress', (reduced ? 0.12 : progress).toFixed(4));
    };
    const request = () => { if (!raf) raf = window.requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
    };
  }, []);

  return (
    <main id="aixion-home-experience" ref={ref} className="experience-home">
      <div className="experience-home-sticky">
        <ExperienceWorld storyId="aixion-home-experience" />
        <div className="experience-atmosphere" aria-hidden="true" />
        <div className="experience-shell experience-home-content">
          <section className="experience-overview">
            <div className="experience-kicker">CONTROL • RELIABILITY • EVIDENCE</div>
            <h1>Intelligence<br />in Control.</h1>
            <p>AIXION LAB builds systems for controlled execution, runtime reliability, and evidence-backed software operations.</p>
            <a className="experience-cta" href="#systems-preview">Explore the system <ArrowRight size={17} /></a>
          </section>
          <nav className="experience-chapter-rail" aria-label="Experience chapters">
            <span className="is-active">01 <b>Overview</b></span>
            <a href="#systems-preview">02 <b>Systems</b></a>
            <a href="#evidence-preview">03 <b>Evidence</b></a>
            <a href="#principles-preview">04 <b>Principles</b></a>
            <a href="#founder-preview">05 <b>Founder</b></a>
            <a href="#contact-preview">06 <b>Contact</b></a>
          </nav>
          <div className="experience-scroll-cue" aria-hidden="true">Scroll to begin <ChevronDown size={14} /></div>
        </div>
      </div>
    </main>
  );
}

function SystemsScene({ detail = false }: { detail?: boolean }) {
  return (
    <section id={detail ? undefined : 'systems-preview'} className={`aixion-scene aixion-scene-systems ${detail ? 'is-detail' : ''}`}>
      <div className="experience-shell aixion-scene-grid">
        <div className="aixion-scene-copy">
          <span>02 / SYSTEMS</span>
          <h2>Systems that govern intelligence.</h2>
          <p>Three bodies of work are separated by purpose and maturity: a flagship control-plane build, an applied reliability research environment, and early verification directions.</p>
          {!detail && <a href="#/systems">Explore all systems <ArrowRight size={16} /></a>}
        </div>
        <div className="systems-world" aria-label="AIXION systems map">
          <div className="systems-core"><i /><strong>AIXION</strong><small>control • truth • evidence</small></div>
          {systems.map((system, index) => (
            <article className={`systems-node systems-node-${index + 1}`} key={system.name}>
              <span>0{index + 1}</span>
              <small>{system.status}</small>
              <h3>{system.name}</h3>
              <p>{system.short}</p>
              {detail && <ul>{system.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
            </article>
          ))}
          <svg className="systems-links" viewBox="0 0 900 640" aria-hidden="true">
            <path d="M450 318 C355 267 286 225 220 184" />
            <path d="M450 318 C556 263 646 220 721 180" />
            <path d="M450 318 C455 424 456 495 456 560" />
          </svg>
          <div className="systems-moving-guide" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

function EvidenceScene({ detail = false }: { detail?: boolean }) {
  return (
    <section id={detail ? undefined : 'evidence-preview'} className={`aixion-scene aixion-scene-evidence ${detail ? 'is-detail' : ''}`}>
      <div className="experience-shell aixion-scene-grid">
        <div className="aixion-scene-copy">
          <span>03 / EVIDENCE</span>
          <h2>Evidence over assumption.</h2>
          <p>Problem, engineering response, validation, and limitation remain visibly separate. The point where evidence stops is part of the result.</p>
          {!detail && <a href="#/evidence">Open the evidence cases <ArrowRight size={16} /></a>}
        </div>
        <div className="evidence-stack-wrap">
          <div className="evidence-orbit" aria-hidden="true" />
          {['Problem', 'Engineering response', 'Validation', 'Boundary'].map((label, index) => (
            <div className={`evidence-layer evidence-layer-${index + 1}`} key={label}><b>0{index + 1}</b><span>{label}</span></div>
          ))}
          <div className="evidence-core" aria-hidden="true"><i /></div>
        </div>
      </div>
      {detail && (
        <div className="experience-shell evidence-cases-grid">
          {evidenceCases.map(([title, tag, summary]) => <article key={title}><span>{tag}</span><h3>{title}</h3><p>{summary}</p></article>)}
        </div>
      )}
    </section>
  );
}

function PrinciplesScene({ detail = false }: { detail?: boolean }) {
  return (
    <section id={detail ? undefined : 'principles-preview'} className={`aixion-scene aixion-scene-principles ${detail ? 'is-detail' : ''}`}>
      <div className="experience-shell">
        <div className="aixion-scene-copy aixion-scene-copy-wide">
          <span>04 / PRINCIPLES</span>
          <h2>Five monuments. Five constraints.</h2>
          <p>The principles are treated as physical anchors in the world rather than corporate-value cards.</p>
        </div>
        <div className="principle-monuments">
          {principles.map(([title, body], index) => (
            <article key={title} className={`principle-monument monument-${index + 1}`}>
              <div className="monument-object"><i /><i /><i /></div>
              <span>0{index + 1}</span><h3>{title}</h3>{detail && <p>{body}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FounderScene({ detail = false }: { detail?: boolean }) {
  return (
    <section id={detail ? undefined : 'founder-preview'} className={`aixion-scene aixion-scene-founder ${detail ? 'is-detail' : ''}`}>
      <div className="experience-shell aixion-scene-grid">
        <div className="aixion-scene-copy">
          <span>05 / FOUNDER</span>
          <h2>A journey built from quality.</h2>
          <p><strong>Ram Golladi — Founder / AI Systems Builder.</strong> The path from software quality to automation, runtime reliability, AI-assisted engineering, and evidence-aware systems building is the origin of AIXION LAB.</p>
          {!detail && <a href="#/founder">Explore the journey <ArrowRight size={16} /></a>}
        </div>
        <div className="founder-path">
          <svg viewBox="0 0 760 470" aria-hidden="true"><path d="M62 380 C146 294 208 344 282 252 C348 170 416 228 482 158 C545 90 623 120 696 55" /></svg>
          {journey.map((stage, index) => <div key={stage} className={`journey-marker journey-marker-${index + 1}`}><b>0{index + 1}</b><span>{stage}</span></div>)}
          <div className="journey-runner" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

function ContactScene({ detail = false }: { detail?: boolean }) {
  return (
    <section id={detail ? undefined : 'contact-preview'} className={`aixion-scene aixion-scene-contact ${detail ? 'is-detail' : ''}`}>
      <div className="contact-sun" aria-hidden="true"><i /><i /><i /></div>
      <div className="contact-road" aria-hidden="true"><i /><i /></div>
      <div className="experience-shell contact-content">
        <span>06 / CONTACT</span>
        <h2>Start a conversation.</h2>
        <p>Product discussions, technical collaboration, research questions, or system-design conversations.</p>
        <a href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer"><Github size={18} /> GitHub <ArrowRight size={16} /></a>
      </div>
    </section>
  );
}

function WhyScene() {
  return (
    <section className="aixion-scene aixion-scene-why is-detail">
      <div className="experience-shell why-layout">
        <div className="aixion-scene-copy"><span>01 / WHY</span><h2>Capability is only the beginning.</h2><p>AIXION LAB focuses on the systems around AI-assisted work: explicit execution boundaries, trustworthy runtime state, and evidence that stays connected to what actually happened.</p></div>
        <div className="why-orbits" aria-hidden="true"><i /><i /><i /><b>CONTROL</b></div>
      </div>
    </section>
  );
}

function HomeChapters() {
  return <div className="experience-home-chapters"><SystemsScene /><EvidenceScene /><PrinciplesScene /><FounderScene /><ContactScene /></div>;
}

export default function App() {
  const [view, setView] = useState<View>(() => currentView());
  const [menu, setMenu] = useState(false);
  const { enabled: soundEnabled, supported: soundSupported, toggle: toggleSound } = useAmbientSound();

  useEffect(() => {
    const sync = () => { setView(currentView()); window.scrollTo({ top: 0, behavior: 'auto' }); };
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const navigate = (next: View) => {
    setMenu(false);
    if (next === 'home') window.location.hash = '';
    else window.location.hash = `/${next}`;
    setView(next);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <div className="experience-site">
      <header className="experience-header">
        <div className="experience-shell experience-header-inner">
          <button className="experience-brand-button" onClick={() => navigate('home')} aria-label="AIXION LAB home"><Brand /></button>
          <nav className="experience-nav" aria-label="Primary navigation">
            {views.map((item) => <button key={item.view} className={view === item.view ? 'is-active' : ''} onClick={() => navigate(item.view)}>{item.label}</button>)}
          </nav>
          {soundSupported && <button className={`experience-sound ${soundEnabled ? 'is-on' : ''}`} onClick={toggleSound} aria-label={soundEnabled ? 'Mute ambient sound' : 'Enable ambient sound'}>{soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}<span>{soundEnabled ? 'Sound on' : 'Sound'}</span></button>}
          <button className="experience-menu" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">{menu ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
        {menu && <nav className="experience-mobile-nav">{views.map((item) => <button key={item.view} onClick={() => navigate(item.view)}>{item.label}</button>)}</nav>}
      </header>

      {view === 'home' && <><ImmersiveHome /><HomeChapters /></>}
      {view === 'why' && <WhyScene />}
      {view === 'systems' && <SystemsScene detail />}
      {view === 'evidence' && <EvidenceScene detail />}
      {view === 'principles' && <PrinciplesScene detail />}
      {view === 'founder' && <FounderScene detail />}
      {view === 'contact' && <ContactScene detail />}

      <footer className="experience-footer">
        <div className="experience-shell experience-footer-top"><div><strong>AIXION LAB</strong><span>END IS THE NEW BEGINNING</span></div><a className="experience-footer-github" href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a></div>
        <div className="experience-shell experience-footer-bottom"><span>© 2026 AIXION LAB. All rights reserved.</span><span>Financial-systems research is research only, not investment advice.</span></div>
      </footer>
    </div>
  );
}
