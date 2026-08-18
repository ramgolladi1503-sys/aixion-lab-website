import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Github,
  Menu,
  X,
} from 'lucide-react';

type View = 'home' | 'systems' | 'evidence' | 'journey' | 'contact';

const views: Array<{ label: string; view: View }> = [
  { label: 'Home', view: 'home' },
  { label: 'Systems', view: 'systems' },
  { label: 'Evidence', view: 'evidence' },
  { label: 'Journey', view: 'journey' },
  { label: 'Contact', view: 'contact' },
];

const systems = [
  {
    name: 'Aixion Control Tower',
    status: 'FLAGSHIP BUILD',
    line: 'A control-plane project for AI-assisted software work.',
    intro:
      'AIXION Control Tower is being built around explicit review, controlled execution boundaries, task visibility, and evidence-aware software workflows.',
    details: [
      ['Why it exists', 'AI-assisted work can move faster than the review, validation, and operational safeguards around it.'],
      ['Current focus', 'Mobile review, connector boundaries, validation checkpoints, and inspectable task state.'],
      ['Public evidence boundary', 'Architecture and engineering direction can be shown publicly; stronger deployment or certification claims remain withheld without supporting evidence.'],
      ['Not claimed', 'No claim of autonomous production infrastructure, enterprise certification, or broad commercial deployment.'],
    ],
  },
  {
    name: 'TradeBot Reliability Lab',
    status: 'APPLIED RESEARCH',
    line: 'Real-time systems research for feed truth, failure, and recovery.',
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
    line: 'Exploratory work on runtime boundaries and claim-to-evidence systems.',
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
    summary: 'A research thread focused on what the system should do when feed continuity or freshness can no longer be trusted.',
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
    summary: 'A system-design thread around review, validation, and execution boundaries before consequential software changes become operational.',
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
    summary: 'A public-site rule: published maturity language must not outrun the evidence that actually exists.',
    rows: [
      ['Problem', 'Generated websites can easily invent versions, metrics, files, customers, or maturity language.'],
      ['Engineering response', 'Keep product status, limitations, and research boundaries explicit.'],
      ['Validation approach', 'Review copy against repository-backed artifacts and remove unsupported claims.'],
      ['Boundary', 'A clean public claim is still not technical proof unless the underlying evidence supports it.'],
    ],
  },
] as const;

const journey = [
  ['Software quality', 'Testing taught the habit that claims about software should be constrained by observable behavior.'],
  ['Automation', 'Automation turned repeatable checks into engineering systems rather than one-off manual verification.'],
  ['AI-assisted engineering', 'AI increased the speed of generation, making review, validation, and control boundaries more important.'],
  ['Runtime reliability', 'Real-time systems work shifted attention toward freshness, recovery, and fail-closed operational truth.'],
  ['Control & evidence', 'The common thread became explicit boundaries: what may act, what must stop, and what can be demonstrated.'],
  ['AIXION LAB', 'The studio brings those threads together as product building, systems research, and evidence-aware engineering.'],
] as const;

function currentView(): View {
  const route = window.location.hash.replace('#/', '').replace('#', '');
  if (route === 'systems' || route === 'evidence' || route === 'journey' || route === 'contact') return route;
  return 'home';
}

function Brand() {
  return (
    <span className="v8-brand-lockup">
      <img src="/brand/aixion-lab-primary.png" alt="" aria-hidden="true" />
      <span>AIXION LAB</span>
    </span>
  );
}

function KineticHome() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      section.style.setProperty('--home-progress', '0.65');
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / distance));
      section.style.setProperty('--home-progress', progress.toFixed(4));
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
    <section ref={ref} className="v8-home-cinematic">
      <div className="v8-home-sticky">
        <div className="v8-shell v8-hero-grid">
          <div className="v8-hero-copy">
            <div className="v8-eyebrow">INDEPENDENT AI PRODUCT & SYSTEMS LAB</div>
            <h1>
              AI can act.
              <span>The system around it has to be stronger.</span>
            </h1>
            <p>
              AIXION LAB builds control planes, runtime reliability research, and evidence-driven engineering systems for AI-assisted software work.
            </p>
            <div className="v8-hero-actions">
              <a href="#/systems" className="v8-btn v8-btn-primary">Explore systems <ArrowRight size={16} /></a>
              <a href="#/evidence" className="v8-btn v8-btn-quiet">See the evidence</a>
            </div>
          </div>

          <div className="v8-kinetic" aria-hidden="true">
            <div className="v8-kinetic-axis" />
            <div className="v8-plane v8-plane-1"><span>01</span><strong>INTENT</strong><small>proposal</small></div>
            <div className="v8-plane v8-plane-2"><span>02</span><strong>BOUNDARY</strong><small>control</small></div>
            <div className="v8-plane v8-plane-3"><span>03</span><strong>VALIDATION</strong><small>verification</small></div>
            <div className="v8-plane v8-plane-4"><span>04</span><strong>EVIDENCE</strong><small>trace</small></div>
            <div className="v8-kinetic-copy">
              <span>FROM INTENT</span>
              <strong>TO CONSEQUENCE</strong>
            </div>
          </div>
        </div>

        <div className="v8-home-index v8-shell">
          <div><span>01</span><strong>CONTROL TOWER</strong><small>flagship build</small></div>
          <div><span>02</span><strong>RELIABILITY LAB</strong><small>applied research</small></div>
          <div><span>03</span><strong>RESEARCH DIRECTIONS</strong><small>early research</small></div>
        </div>
      </div>
    </section>
  );
}

function PageIntro({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <header className="v8-page-intro">
      <div className="v8-eyebrow">{eyebrow}</div>
      <h1>{title}</h1>
      <p>{body}</p>
    </header>
  );
}

function SystemsPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <main className="v8-page v8-shell v8-page-enter">
      <PageIntro
        eyebrow="SYSTEMS"
        title="Built around consequence, failure, and proof."
        body="Three bodies of work, separated by what is being built now, what is being researched, and what is still only a direction."
      />
      <div className="v8-accordion-list">
        {systems.map((system, index) => {
          const expanded = open === index;
          return (
            <section key={system.name} className={`v8-accordion ${expanded ? 'is-open' : ''}`}>
              <button onClick={() => setOpen(expanded ? null : index)} aria-expanded={expanded}>
                <span className="v8-row-index">0{index + 1}</span>
                <span className="v8-row-main"><strong>{system.name}</strong><small>{system.line}</small></span>
                <span className="v8-status">{system.status}</span>
                {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              <div className="v8-accordion-body"><div>
                <p className="v8-accordion-intro">{system.intro}</p>
                <div className="v8-detail-grid">
                  {system.details.map(([label, copy]) => (
                    <div key={label}><span>{label}</span><p>{copy}</p></div>
                  ))}
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
    <main className="v8-page v8-shell v8-page-enter">
      <PageIntro
        eyebrow="EVIDENCE"
        title="Show the work. Keep the boundary."
        body="The useful unit is not a claim. It is a problem, an observed condition, an engineering response, a validation method, and the point where the evidence stops."
      />
      <div className="v8-case-list">
        {evidenceCases.map((item, index) => {
          const expanded = open === index;
          return (
            <article key={item.title} className={`v8-case ${expanded ? 'is-open' : ''}`}>
              <button onClick={() => setOpen(expanded ? null : index)} aria-expanded={expanded}>
                <span className="v8-row-index">0{index + 1}</span>
                <span className="v8-row-main"><span className="v8-case-tag">{item.tag}</span><strong>{item.title}</strong><small>{item.summary}</small></span>
                {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              <div className="v8-case-body"><div className="v8-case-grid">
                {item.rows.map(([label, copy]) => <div key={label}><span>{label}</span><p>{copy}</p></div>)}
              </div></div>
            </article>
          );
        })}
      </div>
    </main>
  );
}

function JourneyPage() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <main className="v8-page v8-shell v8-page-enter">
      <PageIntro
        eyebrow="JOURNEY"
        title="Quality became the architecture."
        body="The path from software testing to AIXION LAB is less about changing disciplines than carrying one rule forward: do not trust what you cannot inspect."
      />
      <div className="v8-journey-line">
        {journey.map(([title, body], index) => {
          const expanded = open === index;
          return (
            <button key={title} onClick={() => setOpen(expanded ? null : index)} className={expanded ? 'is-open' : ''}>
              <span className="v8-journey-dot" />
              <span className="v8-row-index">0{index + 1}</span>
              <strong>{title}</strong>
              <span className="v8-journey-copy">{body}</span>
            </button>
          );
        })}
      </div>
      <div className="v8-founder-note">
        <div><span>FOUNDER</span><strong>Ram Golladi</strong></div>
        <p>Software quality, automation, systems reliability, AI-assisted engineering, and evidence-aware product building.</p>
        <a href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
      </div>
    </main>
  );
}

function ContactPage() {
  return (
    <main className="v8-page v8-shell v8-page-enter v8-contact-page">
      <div className="v8-eyebrow">CONTACT</div>
      <h1>Start with the engineering question.</h1>
      <p>Product discussions, technical collaboration, research questions, or system-design conversations.</p>
      <div className="v8-contact-links">
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
    }, 210);
    window.setTimeout(() => setTransitioning(false), 620);
  };

  return (
    <div className="v8-site">
      <div className={`v8-transition ${transitioning ? 'is-active' : ''}`} aria-hidden="true"><span>AIXION LAB</span></div>
      <header className="v8-header">
        <div className="v8-shell v8-header-inner">
          <button className="v8-brand-button" onClick={() => navigate('home')} aria-label="AIXION LAB home"><Brand /></button>
          <nav className="v8-nav" aria-label="Primary navigation">
            {views.map((item) => <button key={item.view} className={view === item.view ? 'is-active' : ''} onClick={() => navigate(item.view)}>{item.label}</button>)}
          </nav>
          <button className="v8-header-contact" onClick={() => navigate('contact')}>Contact <ArrowRight size={14} /></button>
          <button className="v8-menu" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">{menu ? <X size={19} /> : <Menu size={19} />}</button>
        </div>
        {menu && <nav className="v8-mobile-nav">{views.map((item) => <button key={item.view} onClick={() => navigate(item.view)}>{item.label}</button>)}</nav>}
      </header>

      {view === 'home' && <KineticHome />}
      {view === 'systems' && <SystemsPage />}
      {view === 'evidence' && <EvidencePage />}
      {view === 'journey' && <JourneyPage />}
      {view === 'contact' && <ContactPage />}

      <footer className="v8-footer">
        <div className="v8-shell v8-footer-top">
          <div><strong>AIXION LAB</strong><span>END IS THE NEW BEGINNING</span><p>Independent AI product & systems lab.</p></div>
          <nav>{views.map((item) => <button key={item.view} onClick={() => navigate(item.view)}>{item.label}</button>)}<a href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer">GitHub</a></nav>
        </div>
        <div className="v8-shell v8-footer-bottom"><span>© 2026 AIXION LAB. All rights reserved.</span><span>Financial-systems research is research only, not investment advice.</span></div>
      </footer>
    </div>
  );
}
