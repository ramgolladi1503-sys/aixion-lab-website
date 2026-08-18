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
        <div className="hero-cloud hero-cloud-a" aria-hidden="true" />
        <div className="hero-cloud hero-cloud-b" aria-hidden="true" />
        <div className="hero-foreground-ridge" aria-hidden="true"><i /><i /><i /></div>
        <div className="experience-shell experience-home-content">
          <section className="experience-overview">
            <div className="experience-kicker">CONTROL • RELIABILITY • EVIDENCE</div>
            <h1>Intelligence<br />in Control.</h1>
            <p>AIXION LAB builds systems for controlled execution, runtime reliability, and evidence-backed software operations.</p>
            <a className="experience-cta" href="#systems-preview">Enter the world <ArrowRight size={17} /></a>
          </section>
          <nav className="experience-chapter-rail" aria-label="Experience chapters">
            <span className="is-active">01 <b>Overview</b></span>
            <a href="#systems-preview">02 <b>Systems</b></a>
            <a href="#evidence-preview">03 <b>Evidence</b></a>
            <a href="#principles-preview">04 <b>Principles</b></a>
            <a href="#founder-preview">05 <b>Founder</b></a>
            <a href="#contact-preview">06 <b>Contact</b></a>
          </nav>
          <div className="experience-scroll-cue" aria-hidden="true">Scroll to travel <ChevronDown size={14} /></div>
        </div>
      </div>
    </main>
  );
}

function DistrictArchitecture({ index }: { index: number }) {
  return (
    <div className={`district-architecture district-architecture-${index + 1}`} aria-hidden="true">
      <span className="district-plinth" />
      <span className="district-tower district-tower-a" />
      <span className="district-tower district-tower-b" />
      <span className="district-dome" />
      <span className="district-spire" />
      <span className="district-glass" />
    </div>
  );
}

function SystemsScene({ detail = false }: { detail?: boolean }) {
  return (
    <section id={detail ? undefined : 'systems-preview'} className={`aixion-scene aixion-scene-systems world-chapter ${detail ? 'is-detail' : ''}`}>
      <div className="scene-cloud scene-cloud-left" aria-hidden="true" />
      <div className="scene-cloud scene-cloud-right" aria-hidden="true" />
      <div className="experience-shell aixion-scene-grid">
        <div className="aixion-scene-copy">
          <span>02 / SYSTEMS</span>
          <h2>Systems that govern intelligence.</h2>
          <p>Three bodies of work occupy one connected environment, separated by purpose and maturity rather than flattened into product cards.</p>
          {!detail && <a href="#/systems">Explore all systems <ArrowRight size={16} /></a>}
        </div>
        <div className="systems-landscape" aria-label="AIXION systems landscape">
          <div className="systems-horizon" aria-hidden="true"><i /><i /><i /></div>
          <div className="systems-water" aria-hidden="true"><i /><i /></div>
          <div className="systems-core-city" aria-hidden="true"><i /><b>AIXION</b><span>control • truth • evidence</span></div>
          <svg className="systems-route" viewBox="0 0 1000 700" aria-hidden="true">
            <path d="M500 380 C382 310 298 290 212 240 C300 168 424 180 500 380 C638 302 730 278 812 218 C744 390 650 484 500 380 C520 500 530 564 514 628" />
          </svg>
          {systems.map((system, index) => (
            <article className={`system-district system-district-${index + 1}`} key={system.name}>
              <DistrictArchitecture index={index} />
              <div className="district-label">
                <span>0{index + 1}</span>
                <small>{system.status}</small>
                <h3>{system.name}</h3>
                <p>{system.short}</p>
                {detail && <ul>{system.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
              </div>
            </article>
          ))}
          <div className="systems-moving-guide" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

function EvidenceScene({ detail = false }: { detail?: boolean }) {
  return (
    <section id={detail ? undefined : 'evidence-preview'} className={`aixion-scene aixion-scene-evidence world-chapter ${detail ? 'is-detail' : ''}`}>
      <div className="experience-shell aixion-scene-grid">
        <div className="aixion-scene-copy">
          <span>03 / EVIDENCE</span>
          <h2>Evidence over assumption.</h2>
          <p>Problem, engineering response, validation, and boundary are separate physical levels. The visitor can see where the evidence ends before reading the detail.</p>
          {!detail && <a href="#/evidence">Open the evidence cases <ArrowRight size={16} /></a>}
        </div>
        <div className="evidence-vault" aria-label="Layered evidence structure">
          <div className="evidence-vault-haze" aria-hidden="true" />
          <div className="evidence-vault-spine" aria-hidden="true"><i /><i /></div>
          {['Problem', 'Engineering response', 'Validation', 'Boundary'].map((label, index) => (
            <div className={`evidence-terrace evidence-terrace-${index + 1}`} key={label}>
              <div className="evidence-terrace-structure" aria-hidden="true"><i /><i /><i /></div>
              <b>0{index + 1}</b><span>{label}</span>
            </div>
          ))}
          <div className="evidence-signal" aria-hidden="true" />
        </div>
      </div>
      {detail && (
        <div className="experience-shell evidence-cases-grid evidence-cases-v5">
          {evidenceCases.map(([title, tag, summary]) => <article key={title}><span>{tag}</span><h3>{title}</h3><p>{summary}</p></article>)}
        </div>
      )}
    </section>
  );
}

function PrinciplesScene({ detail = false }: { detail?: boolean }) {
  return (
    <section id={detail ? undefined : 'principles-preview'} className={`aixion-scene aixion-scene-principles world-chapter ${detail ? 'is-detail' : ''}`}>
      <div className="principles-mountain" aria-hidden="true"><i /><i /><i /></div>
      <div className="experience-shell principles-layout">
        <div className="aixion-scene-copy aixion-scene-copy-wide">
          <span>04 / PRINCIPLES</span>
          <h2>Five monuments. Five constraints.</h2>
          <p>Each principle stands as an architectural anchor inside the same world, with distinct mass and silhouette rather than repeated corporate icons.</p>
        </div>
        <div className="principle-sanctuary">
          <svg className="principle-route" viewBox="0 0 1200 520" aria-hidden="true"><path d="M42 420 C230 318 322 388 478 274 C636 160 710 260 858 150 C972 65 1088 110 1160 52" /></svg>
          {principles.map(([title, body], index) => (
            <article key={title} className={`principle-monument monument-${index + 1}`}>
              <div className="monument-architecture" aria-hidden="true"><i /><i /><i /><i /></div>
              <span>0{index + 1}</span><h3>{title}</h3>{detail && <p>{body}</p>}
            </article>
          ))}
          <div className="principle-guide" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

function FounderScene({ detail = false }: { detail?: boolean }) {
  return (
    <section id={detail ? undefined : 'founder-preview'} className={`aixion-scene aixion-scene-founder world-chapter ${detail ? 'is-detail' : ''}`}>
      <div className="founder-mountain-range" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="experience-shell aixion-scene-grid">
        <div className="aixion-scene-copy">
          <span>05 / FOUNDER</span>
          <h2>A journey built from quality.</h2>
          <p><strong>Ram Golladi — Founder / AI Systems Builder.</strong> The path from software quality to automation, runtime reliability, AI-assisted engineering, and evidence-aware systems building is the origin of AIXION LAB.</p>
          {!detail && <a href="#/founder">Explore the journey <ArrowRight size={16} /></a>}
        </div>
        <div className="founder-climb" aria-label="Founder journey">
          <svg className="founder-route" viewBox="0 0 900 650" aria-hidden="true"><path d="M48 570 C142 474 232 520 300 416 C370 310 442 360 512 268 C584 174 660 216 728 128 C774 70 824 58 866 42" /></svg>
          {journey.map((stage, index) => (
            <div key={stage} className={`journey-station journey-station-${index + 1}`}>
              <div className="journey-architecture" aria-hidden="true"><i /><i /><i /></div>
              <b>0{index + 1}</b><span>{stage}</span>
            </div>
          ))}
          <div className="journey-runner" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

function ContactScene({ detail = false }: { detail?: boolean }) {
  return (
    <section id={detail ? undefined : 'contact-preview'} className={`aixion-scene aixion-scene-contact world-chapter ${detail ? 'is-detail' : ''}`}>
      <div className="contact-sky" aria-hidden="true"><i /><i /><i /></div>
      <div className="contact-city" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <div className="contact-water" aria-hidden="true" />
      <div className="contact-bridge" aria-hidden="true"><i /><i /><i /></div>
      <div className="contact-beacon" aria-hidden="true"><i /></div>
      <div className="experience-shell contact-content">
        <span>06 / CONTACT</span>
        <h2>Reach the horizon.</h2>
        <p>Product discussions, technical collaboration, research questions, or system-design conversations.</p>
        <a href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer"><Github size={18} /> GitHub <ArrowRight size={16} /></a>
      </div>
    </section>
  );
}

function WhyScene() {
  return (
    <section className="aixion-scene aixion-scene-why is-detail world-chapter">
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
