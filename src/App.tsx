import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Github,
  Menu,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
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
    intro:
      'AIXION Control Tower is being built around explicit review, controlled execution boundaries, task visibility, and evidence-aware software workflows.',
    details: [
      ['Why it exists', 'AI-assisted work can move faster than the review, validation, and operational safeguards around it.'],
      ['Current focus', 'Mobile review, connector boundaries, validation checkpoints, and inspectable task state.'],
      ['Evidence boundary', 'Architecture and engineering direction can be shown publicly; stronger deployment or certification claims remain withheld without supporting evidence.'],
      ['Not claimed', 'No claim of autonomous production infrastructure, enterprise certification, or broad commercial deployment.'],
    ],
  },
  {
    name: 'TradeBot Reliability Lab',
    status: 'APPLIED RESEARCH',
    short: 'Real-time systems research for failure, recovery, and operational truth.',
    intro:
      'The reliability lab studies how real-time market-data systems behave when continuity, freshness, reconnection, or local state becomes uncertain.',
    details: [
      ['Research focus', 'Feed freshness, reconnect behavior, fail-closed state handling, deterministic replay, and evidence quality.'],
      ['Engineering question', 'How should a real-time system behave when it can no longer prove that its market view is trustworthy?'],
      ['Research boundary', 'Historical and replay evidence remain distinct from fresh live proof and from claims of execution viability.'],
      ['Not claimed', 'No investment advice, signal service, profitability claim, customer automated trading, or durable trading-edge claim.'],
    ],
  },
  {
    name: 'Research Directions',
    status: 'EARLY RESEARCH',
    short: 'Exploratory work on runtime boundaries and claim-to-evidence systems.',
    intro:
      'Early investigations examine how AI tool access can be constrained and how technical claims can remain connected to reviewable tests and evidence.',
    details: [
      ['Runtime boundaries', 'Exploring inspection and policy boundaries around tool calls and sensitive operations.'],
      ['Evidence systems', 'Exploring methods for linking software claims to tests, failures, decisions, and current limitations.'],
      ['Maturity', 'Concept and architecture work; these directions are intentionally not presented as mature standalone products.'],
      ['Not claimed', 'No security certification, universal protection, or completed enterprise platform.'],
    ],
  },
] as const;

const evidenceCases = [
  {
    title: 'Feed truth under disconnect and recovery',
    tag: 'REAL-TIME RELIABILITY',
    summary: 'What should a real-time system do when continuity or freshness can no longer be trusted?',
    rows: [
      ['Problem', 'Reconnects and stale local state can create a false impression that the system is healthy.'],
      ['Engineering response', 'Treat uncertain feed state as degraded and fail closed until truth is re-established.'],
      ['Validation approach', 'Use controlled replay and failure-oriented testing where the relevant evidence exists.'],
      ['Boundary', 'This does not establish profitability, trading edge, or full-day live stability.'],
    ],
  },
  {
    title: 'Approval-gated AI-assisted software work',
    tag: 'CONTROL PLANE',
    summary: 'Review, validation, and execution boundaries before consequential software changes become operational.',
    rows: [
      ['Problem', 'Generated work can move from proposal to mutation faster than a person can meaningfully inspect it.'],
      ['Engineering response', 'Separate proposal, review, validation, and execution into explicit system states.'],
      ['Validation approach', 'Treat workflow behavior and failure handling as testable contracts rather than interface promises.'],
      ['Boundary', 'Public architecture is not equivalent to production certification or enterprise deployment evidence.'],
    ],
  },
  {
    title: 'Truth-first publication boundary',
    tag: 'EVIDENCE GOVERNANCE',
    summary: 'Public maturity language must not outrun the evidence that actually exists.',
    rows: [
      ['Problem', 'Generated websites can easily invent versions, metrics, files, customers, or maturity language.'],
      ['Engineering response', 'Keep product status, limitations, and research boundaries explicit.'],
      ['Validation approach', 'Review copy against repository-backed artifacts and remove unsupported claims.'],
      ['Boundary', 'A clean public claim is still not technical proof unless the underlying evidence supports it.'],
    ],
  },
] as const;

const principles = [
  ['Evidence before claims', 'Published confidence stops where the supporting evidence stops.'],
  ['Unknown state fails closed', 'Missing or degraded truth is not silently converted into a healthy state.'],
  ['Consequence deserves boundaries', 'Actions that can change real systems should pass through explicit control points.'],
  ['Failure becomes regression evidence', 'Useful failures become artifacts that can be reproduced, tested, and learned from.'],
  ['Maturity stays evidence-bound', 'Research, implementation, validation, and deployment are kept as separate claims.'],
] as const;

const journey = [
  ['Software quality', 'Testing built the habit that software claims should be constrained by observable behavior.'],
  ['Automation', 'Repeatable checks became engineering systems instead of one-off manual verification.'],
  ['AI-assisted engineering', 'AI increased the speed of generation, making review, validation, and control boundaries more important.'],
  ['Runtime reliability', 'Real-time systems work shifted attention toward freshness, recovery, and fail-closed operational truth.'],
  ['Control & evidence', 'The common thread became explicit boundaries: what may act, what must stop, and what can be demonstrated.'],
  ['AIXION LAB', 'The studio brings those threads together as product building, systems research, and evidence-aware engineering.'],
] as const;

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
    if (reduced) {
      section.style.setProperty('--experience-progress', '0.26');
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / distance));
      section.style.setProperty('--experience-progress', progress.toFixed(4));
    };
    const request = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
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
            <div className="experience-kicker">AIXION LAB</div>
            <h1>Intelligence<br />in Control.</h1>
            <p>AIXION LAB builds systems for controlled execution, runtime reliability, and evidence-backed software operations.</p>
            <a className="experience-cta" href="#/systems">Explore the system <ArrowRight size={17} /></a>
          </section>

          <section className="experience-systems-gateway" aria-label="Primary work">
            <span className="experience-gateway-kicker">02 / SYSTEMS</span>
            <h2>Integrated systems.<br />Verifiable outcomes.</h2>
            <div className="experience-system-links">
              {systems.map((system, index) => (
                <a href="#/systems" key={system.name}>
                  <span>0{index + 1}</span>
                  <strong>{system.name}</strong>
                  <small>{system.short}</small>
                  <ArrowRight size={16} />
                </a>
              ))}
            </div>
          </section>

          <div className="experience-glass-card card-verification" aria-hidden="true">
            <span>REAL-WORLD CHECKS</span>
            <small>Validation before stronger claims.</small>
          </div>
          <div className="experience-glass-card card-control" aria-hidden="true">
            <span>CONTROL BOUNDARIES</span>
            <small>Explicit limits around consequential action.</small>
          </div>
          <div className="experience-glass-card card-evidence" aria-hidden="true">
            <span>EVIDENCE</span>
            <small>What is known stays inspectable.</small>
          </div>

          <nav className="experience-chapter-rail" aria-label="Experience chapters">
            <span className="is-active">01 <b>Overview</b></span>
            <a href="#/systems">02 <b>Systems</b></a>
            <a href="#/evidence">03 <b>Evidence</b></a>
            <a href="#/principles">04 <b>Principles</b></a>
            <a href="#/founder">05 <b>Founder</b></a>
          </nav>

          <div className="experience-scroll-cue" aria-hidden="true">Scroll to explore <ChevronDown size={14} /></div>
          <div className="experience-world-note" aria-hidden="true"><span /> THE WORLD RESPONDS TO YOUR MOVEMENT</div>
        </div>
      </div>
    </main>
  );
}

function PageIntro({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <header className="experience-page-intro">
      <span>{eyebrow}</span>
      <h1>{title}</h1>
      <p>{body}</p>
    </header>
  );
}

function WhyPage() {
  return (
    <main className="experience-page experience-shell experience-page-enter">
      <PageIntro
        eyebrow="01 / WHY"
        title="Why controlled intelligence matters."
        body="AI-assisted software can move faster than review, validation, and operational safeguards. AIXION LAB is built around making those boundaries explicit."
      />
      <div className="experience-thesis-grid">
        <article><span>01</span><h2>Know the boundary.</h2><p>Capability and permission are different things. Consequential actions need explicit limits.</p></article>
        <article><span>02</span><h2>Know the state.</h2><p>When the system cannot establish trustworthy state, it should not silently behave as if everything is healthy.</p></article>
        <article><span>03</span><h2>Know the evidence.</h2><p>Architecture, testing, historical results, live evidence, and deployment maturity remain separate claims.</p></article>
      </div>
    </main>
  );
}

function SystemsPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <main className="experience-page experience-shell experience-page-enter">
      <PageIntro
        eyebrow="02 / SYSTEMS"
        title="Systems that govern consequence."
        body="Three bodies of work, separated by what is being built now, what is being researched, and what is still only a direction."
      />
      <div className="experience-accordion-list">
        {systems.map((system, index) => {
          const expanded = open === index;
          return (
            <section key={system.name} className={`experience-accordion ${expanded ? 'is-open' : ''}`}>
              <button onClick={() => setOpen(expanded ? null : index)} aria-expanded={expanded}>
                <span className="experience-row-index">0{index + 1}</span>
                <span className="experience-row-main"><strong>{system.name}</strong><small>{system.short}</small></span>
                <span className="experience-status">{system.status}</span>
                {expanded ? <ChevronUp size={19} /> : <ChevronDown size={19} />}
              </button>
              <div className="experience-accordion-body"><div>
                <p className="experience-accordion-intro">{system.intro}</p>
                <div className="experience-detail-grid">
                  {system.details.map(([label, copy]) => <div key={label}><span>{label}</span><p>{copy}</p></div>)}
                </div>
              </div></div>
            </section>
          );
        })}
      </div>
    </main>
  );
}

function EvidencePage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <main className="experience-page experience-shell experience-page-enter">
      <PageIntro
        eyebrow="03 / EVIDENCE"
        title="Evidence over assumption."
        body="The useful unit is not a claim. It is a problem, an observed condition, an engineering response, a validation method, and the point where the evidence stops."
      />
      <div className="experience-case-list">
        {evidenceCases.map((item, index) => {
          const expanded = open === index;
          return (
            <article key={item.title} className={`experience-case ${expanded ? 'is-open' : ''}`}>
              <button onClick={() => setOpen(expanded ? null : index)} aria-expanded={expanded}>
                <span className="experience-row-index">0{index + 1}</span>
                <span className="experience-row-main"><span className="experience-case-tag">{item.tag}</span><strong>{item.title}</strong><small>{item.summary}</small></span>
                {expanded ? <ChevronUp size={19} /> : <ChevronDown size={19} />}
              </button>
              <div className="experience-case-body"><div className="experience-case-grid">
                {item.rows.map(([label, copy]) => <div key={label}><span>{label}</span><p>{copy}</p></div>)}
              </div></div>
            </article>
          );
        })}
      </div>
    </main>
  );
}

function PrinciplesPage() {
  return (
    <main className="experience-page experience-shell experience-page-enter">
      <PageIntro
        eyebrow="04 / PRINCIPLES"
        title="Principles that shape every system."
        body="These are engineering rules, not decorative values. They define how the work should behave when certainty, evidence, or operational state is incomplete."
      />
      <div className="experience-principles">
        {principles.map(([title, body], index) => <article key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{body}</p></article>)}
      </div>
    </main>
  );
}

function FounderPage() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <main className="experience-page experience-shell experience-page-enter">
      <PageIntro
        eyebrow="05 / FOUNDER"
        title="The builder behind the system."
        body="Ram Golladi — Founder / AI Systems Builder. The path from software quality to AIXION LAB carries one discipline forward: do not trust what you cannot inspect."
      />
      <div className="experience-journey-line">
        {journey.map(([title, body], index) => {
          const expanded = open === index;
          return (
            <button key={title} onClick={() => setOpen(expanded ? null : index)} className={expanded ? 'is-open' : ''}>
              <span className="experience-journey-dot" />
              <span className="experience-row-index">0{index + 1}</span>
              <strong>{title}</strong>
              <span className="experience-journey-copy">{body}</span>
            </button>
          );
        })}
      </div>
      <a className="experience-founder-github" href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>
    </main>
  );
}

function ContactPage() {
  return (
    <main className="experience-page experience-shell experience-page-enter experience-contact-page">
      <span className="experience-contact-kicker">06 / CONTACT</span>
      <h1>Start with the engineering question.</h1>
      <p>Product discussions, technical collaboration, research questions, or system-design conversations.</p>
      <div className="experience-contact-links">
        <a href="mailto:contact@aixionlabs.com">contact@aixionlabs.com <ArrowRight size={18} /></a>
        <a href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer"><Github size={18} /> GitHub</a>
      </div>
      <small>The website opens your mail client; it does not claim an on-site message-delivery backend.</small>
    </main>
  );
}

export default function App() {
  const [view, setView] = useState<View>(() => currentView());
  const [menu, setMenu] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const { enabled: soundEnabled, supported: soundSupported, toggle: toggleSound } = useAmbientSound();

  useEffect(() => {
    const onHash = () => {
      setView(currentView());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = (next: View) => {
    setMenu(false);
    if (next === view) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setTransitioning(true);
    window.setTimeout(() => {
      window.location.hash = next === 'home' ? '#/home' : `#/${next}`;
    }, 250);
    window.setTimeout(() => setTransitioning(false), 760);
  };

  return (
    <div className="experience-site">
      <div className={`experience-transition ${transitioning ? 'is-active' : ''}`} aria-hidden="true"><span>AIXION LAB</span></div>

      <header className="experience-header">
        <div className="experience-shell experience-header-inner">
          <button className="experience-brand-button" onClick={() => navigate('home')} aria-label="AIXION LAB home"><Brand /></button>
          <nav className="experience-nav" aria-label="Primary navigation">
            {views.map((item) => <button key={item.view} className={view === item.view ? 'is-active' : ''} onClick={() => navigate(item.view)}>{item.label}</button>)}
          </nav>
          {soundSupported && (
            <button className={`experience-sound ${soundEnabled ? 'is-on' : ''}`} onClick={toggleSound} aria-label={soundEnabled ? 'Mute ambient sound' : 'Enable ambient sound'} title={soundEnabled ? 'Mute sound' : 'Enable sound'}>
              {soundEnabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
            </button>
          )}
          <button className="experience-menu" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">{menu ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
        {menu && <nav className="experience-mobile-nav">{views.map((item) => <button key={item.view} onClick={() => navigate(item.view)}>{item.label}</button>)}</nav>}
      </header>

      {view === 'home' && <ImmersiveHome />}
      {view === 'why' && <WhyPage />}
      {view === 'systems' && <SystemsPage />}
      {view === 'evidence' && <EvidencePage />}
      {view === 'principles' && <PrinciplesPage />}
      {view === 'founder' && <FounderPage />}
      {view === 'contact' && <ContactPage />}

      {view !== 'home' && (
        <footer className="experience-footer">
          <div className="experience-shell experience-footer-top">
            <div><strong>AIXION LAB</strong><span>END IS THE NEW BEGINNING</span><p>Independent AI product & systems lab.</p></div>
            <nav>{views.map((item) => <button key={item.view} onClick={() => navigate(item.view)}>{item.label}</button>)}<a href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer">GitHub</a></nav>
          </div>
          <div className="experience-shell experience-footer-bottom"><span>© 2026 AIXION LAB. All rights reserved.</span><span>Financial-systems research is research only, not investment advice.</span></div>
        </footer>
      )}
    </div>
  );
}
