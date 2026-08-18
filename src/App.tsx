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
    highlights: ['Risk-aware review and approve / revise / reject flows', 'Validation checkpoints before consequential software changes', 'GitHub-oriented delivery and inspectable task state'],
    details: [
      ['Why it exists', 'AI-assisted work can move faster than the review, validation, and operational safeguards around it.'],
      ['Current focus', 'Mobile review, connector boundaries, validation checkpoints, GitHub delivery paths, and inspectable task state.'],
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
    highlights: ['Feed freshness and reconnect behavior', 'Fail-closed state handling and controlled recovery', 'Replay, evidence quality, and failure-oriented testing'],
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
    highlights: ['Runtime tool boundaries and sensitive-operation controls', 'Claim-to-evidence linking and engineering verification concepts', 'Research directions kept separate from product maturity'],
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
  ['Runtime reliability', 'Real-time systems work shifted attention toward freshness, recovery, and fail-closed operational truth.'],
  ['AI-assisted engineering', 'AI increased the speed of generation, making review, validation, and control boundaries more important.'],
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
            <div className="experience-kicker">CONTROL • RELIABILITY • EVIDENCE</div>
            <h1>Intelligence<br />in Control.</h1>
            <p>AIXION LAB builds systems for controlled execution, runtime reliability, and evidence-backed software operations — designed for the point where AI-assisted work begins to affect real systems.</p>
            <a className="experience-cta" href="#/systems">Explore the system <ArrowRight size={17} /></a>
          </section>

          <section className="experience-systems-gateway" aria-label="Primary work">
            <span className="experience-gateway-kicker">02 / SYSTEMS</span>
            <h2>Integrated systems.<br />Verifiable outcomes.</h2>
            <p className="experience-gateway-copy">Three bodies of work explore execution control, operational truth, and evidence quality at different maturity levels.</p>
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
            <span>REAL-WORLD VERIFICATION</span>
            <small>Test what can be tested. Keep stronger claims bounded by evidence.</small>
          </div>
          <div className="experience-glass-card card-control" aria-hidden="true">
            <span>CONTROL BOUNDARIES</span>
            <small>Explicit limits around consequential software execution.</small>
          </div>
          <div className="experience-glass-card card-evidence" aria-hidden="true">
            <span>EVIDENCE & TRACEABILITY</span>
            <small>Failures, validation, and limitations remain inspectable.</small>
          </div>

          <nav className="experience-chapter-rail" aria-label="Experience chapters">
            <span className="is-active">01 <b>Overview</b></span>
            <a href="#systems-preview">02 <b>Systems</b></a>
            <a href="#evidence-preview">03 <b>Evidence</b></a>
            <a href="#principles-preview">04 <b>Principles</b></a>
            <a href="#founder-preview">05 <b>Founder</b></a>
            <a href="#contact-preview">06 <b>Contact</b></a>
          </nav>

          <div className="experience-scroll-cue" aria-hidden="true">Scroll to begin <ChevronDown size={14} /></div>
          <div className="experience-world-note" aria-hidden="true"><span /> A METAPHORICAL WORLD — NOT LIVE TELEMETRY</div>
        </div>
      </div>
    </main>
  );
}

function HomeChapters() {
  return (
    <div className="experience-home-chapters">
      <section id="systems-preview" className="experience-chapter experience-shell">
        <div className="experience-chapter-heading">
          <span>02 / SYSTEMS</span>
          <h2>Integrated systems.<br />Verifiable outcomes.</h2>
          <p>AIXION LAB is not presenting a single generic AI product. The work is separated by purpose and maturity: a flagship control-plane build, an applied reliability research environment, and early verification directions.</p>
          <a className="experience-text-link" href="#/systems">Explore all systems <ArrowRight size={16} /></a>
        </div>
        <div className="experience-preview-grid experience-preview-grid-systems">
          {systems.map((system, index) => (
            <article className="experience-preview-card" key={system.name}>
              <span className="experience-preview-index">0{index + 1}</span>
              <span className="experience-status">{system.status}</span>
              <h3>{system.name}</h3>
              <p>{system.intro}</p>
              <ul>{system.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
              <a href="#/systems">Explore <ArrowRight size={15} /></a>
            </article>
          ))}
        </div>
      </section>

      <section id="evidence-preview" className="experience-chapter experience-chapter-evidence">
        <div className="experience-shell experience-evidence-layout">
          <div className="experience-chapter-heading">
            <span>03 / EVIDENCE</span>
            <h2>Evidence over assumption.</h2>
            <p>We separate the problem, the observed condition, the engineering response, the validation method, and the point where the evidence stops. That boundary matters as much as the result.</p>
            <a className="experience-text-link" href="#/evidence">View engineering cases <ArrowRight size={16} /></a>
          </div>
          <div className="experience-evidence-preview-list">
            {evidenceCases.slice(0, 2).map((item, index) => (
              <article key={item.title}>
                <span>0{index + 1} / {item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <div className="experience-proof-flow"><b>Problem</b><i /><b>Response</b><i /><b>Validation</b><i /><b>Boundary</b></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="principles-preview" className="experience-chapter experience-shell">
        <div className="experience-chapter-heading experience-chapter-heading-wide">
          <span>04 / PRINCIPLES</span>
          <h2>Principles over complexity.</h2>
          <p>Five rules keep the work grounded when capability, certainty, and operational state are incomplete.</p>
        </div>
        <div className="experience-principle-preview-grid">
          {principles.map(([title, body], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="founder-preview" className="experience-chapter experience-chapter-founder">
        <div className="experience-shell experience-founder-preview-layout">
          <div className="experience-chapter-heading">
            <span>05 / FOUNDER</span>
            <h2>Built from a quality mindset.</h2>
            <p>Ram Golladi — Founder / AI Systems Builder. The progression from software quality to automation, runtime reliability, AI-assisted engineering, and evidence-aware systems building is the origin of AIXION LAB.</p>
            <a className="experience-text-link" href="#/founder">Explore the journey <ArrowRight size={16} /></a>
          </div>
          <div className="experience-journey-preview">
            {journey.map(([title], index) => <span key={title}><b>0{index + 1}</b>{title}</span>)}
          </div>
        </div>
      </section>

      <section id="contact-preview" className="experience-chapter experience-chapter-contact">
        <div className="experience-shell experience-contact-preview-layout">
          <div>
            <span>06 / CONTACT</span>
            <h2>Start with the engineering question.</h2>
            <p>Product discussions, technical collaboration, research questions, or system-design conversations.</p>
          </div>
          <div className="experience-contact-preview-links">
            <a href="mailto:contact@aixionlabs.com">contact@aixionlabs.com <ArrowRight size={18} /></a>
            <a href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer"><Github size={18} /> GitHub</a>
          </div>
        </div>
      </section>
    </div>
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
        body="AI-assisted software can move faster than review, validation, and operational safeguards. AIXION LAB focuses on the systems around that capability: explicit control boundaries, trustworthy runtime state, and evidence that remains connected to what actually happened."
      />
      <div className="experience-thesis-grid">
        <article><span>01</span><h2>Know the boundary.</h2><p>Capability and permission are different things. Consequential actions need explicit limits before execution becomes routine.</p></article>
        <article><span>02</span><h2>Know the state.</h2><p>When the system cannot establish trustworthy state, it should not silently behave as if everything is healthy.</p></article>
        <article><span>03</span><h2>Know the evidence.</h2><p>Architecture, testing, historical results, live evidence, and deployment maturity remain separate claims rather than being blended into one confidence label.</p></article>
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
        body="Three bodies of work, separated by what is being built now, what is being researched, and what remains an early direction. Open a system to inspect the engineering context, current focus, maturity boundary, and what is deliberately not claimed."
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
                <ul className="experience-system-highlight-list">{system.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
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
        body="The useful unit is not a claim. It is a problem, an observed condition, an engineering response, a validation method, and the point where the evidence stops. Expand a case to inspect that chain without turning a test result into a larger maturity claim."
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
        body="These are engineering rules, not decorative values. They define how the work should behave when certainty, evidence, or operational state is incomplete and keep the public story connected to the actual work."
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
        body="Ram Golladi — Founder / AI Systems Builder. The path from software quality through automation, runtime reliability, AI-assisted engineering, and evidence-aware systems carries one discipline forward: claims should remain inspectable."
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
            <button className={`experience-sound ${soundEnabled ? 'is-on' : ''}`} onClick={toggleSound} aria-label={soundEnabled ? 'Mute ambient sound' : 'Enable ambient sound'} title={soundEnabled ? 'Mute ambient sound' : 'Enable ambient sound'}>
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              <span>{soundEnabled ? 'Sound on' : 'Sound'}</span>
            </button>
          )}
          <button className="experience-menu" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">{menu ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
        {menu && <nav className="experience-mobile-nav">{views.map((item) => <button key={item.view} onClick={() => navigate(item.view)}>{item.label}</button>)}</nav>}
      </header>

      {view === 'home' && <><ImmersiveHome /><HomeChapters /></>}
      {view === 'why' && <WhyPage />}
      {view === 'systems' && <SystemsPage />}
      {view === 'evidence' && <EvidencePage />}
      {view === 'principles' && <PrinciplesPage />}
      {view === 'founder' && <FounderPage />}
      {view === 'contact' && <ContactPage />}

      <footer className="experience-footer">
        <div className="experience-shell experience-footer-top">
          <div><strong>AIXION LAB</strong><span>END IS THE NEW BEGINNING</span><p>Independent AI product & systems lab.</p></div>
          <a className="experience-footer-github" href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>
        </div>
        <div className="experience-shell experience-footer-bottom"><span>© 2026 AIXION LAB. All rights reserved.</span><span>Financial-systems research is research only, not investment advice.</span></div>
      </footer>
    </div>
  );
}
