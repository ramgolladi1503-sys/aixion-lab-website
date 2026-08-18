import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronUp,
  Github,
  Menu,
  ShieldCheck,
  X,
} from 'lucide-react';

const products = [
  {
    name: 'Aixion Control Tower',
    status: 'FLAGSHIP BUILD',
    short: 'Controlled execution for AI-assisted software work.',
    problem: 'AI-assisted work can move faster than review, validation, and operational safeguards around it.',
    built: 'A mobile-first control-plane direction for task review, explicit approval gates, validation checkpoints, audit-oriented records, and operator visibility.',
    evidence: 'The public site describes architecture, workflow direction, and governance boundaries. Stronger production-readiness claims remain withheld unless repository evidence supports them.',
    limitation: 'Not presented as autonomous production infrastructure, enterprise certification, or a broadly deployed commercial platform.',
  },
  {
    name: 'TradeBot Reliability Lab',
    status: 'APPLIED RESEARCH',
    short: 'Real-time systems research for failure, recovery, and operational truth.',
    problem: 'Real-time financial data systems can enter unsafe states when feed continuity, reconnection, freshness, or local truth becomes uncertain.',
    built: 'An applied research environment for data-quality work, feed-reliability investigation, deterministic replay, failure handling, and governed hypothesis testing.',
    evidence: 'Research findings, failed hypotheses, reliability incidents, and validation work are kept distinct from claims of live trading edge or profitability.',
    limitation: 'Research only: not investment advice, signal-selling, customer automated trading, or a claim of durable trading edge.',
  },
  {
    name: 'Research Directions',
    status: 'EARLY RESEARCH',
    short: 'Exploratory work on runtime boundaries and claim-to-evidence systems.',
    problem: 'Agent tool access and AI-assisted software generation create new questions around execution boundaries, inspectability, and proof.',
    built: 'Early architectural investigations into runtime tool boundary inspection and methods for connecting technical claims to reviewable tests and evidence.',
    evidence: 'These directions are intentionally presented as investigations rather than standalone mature products.',
    limitation: 'Concept and architecture work only. No security certification, universal protection, or completed enterprise platform is claimed.',
  },
] as const;

const principles = [
  ['Control before consequence', 'Consequential AI-assisted actions should pass through explicit boundaries before they become operational.'],
  ['Unknown is not healthy', 'When critical runtime truth cannot be established, the safer default is to fail closed.'],
  ['Tests constrain claims', 'Capability statements should remain bounded by reviewable and reproducible evidence.'],
  ['Evidence over speculation', 'Maturity labels should never outrun the artifacts and validation that actually exist.'],
  ['Failure becomes memory', 'Negative findings and repairs should improve the next system decision rather than disappear.'],
] as const;

const storyPhases = [
  ['INTENT', 'AI proposes an action.'],
  ['CONTROL', 'Consequential execution enters a governed boundary.'],
  ['VALIDATION', 'Work is checked before it becomes operational.'],
  ['EVIDENCE', 'What happened remains inspectable.'],
] as const;

function Brand() {
  return (
    <>
      <img
        src="/brand/aixion-lab-primary.png"
        alt=""
        aria-hidden="true"
        className="brand-lockup"
      />
      <span className="brand-name">AIXION LAB</span>
    </>
  );
}

function SectionHeading({
  index,
  title,
  statement,
}: {
  index: string;
  title: string;
  statement?: string;
}) {
  return (
    <div className="section-heading reveal">
      <div className="section-index">{index}</div>
      <div>
        <h2 className="section-title">{title}</h2>
        {statement && <p className="section-statement">{statement}</p>}
      </div>
    </div>
  );
}

function HeroControlObject() {
  return (
    <div className="hero-control-object" aria-hidden="true">
      <div className="control-object-halo" />
      <div className="control-object-frame">
        <div className="control-object-head">
          <span>AIXION CONTROL OBJECT</span>
          <span>01 / 04</span>
        </div>
        <div className="control-object-grid">
          {storyPhases.map(([label], index) => (
            <div key={label} className={`control-object-node node-${index + 1}`}>
              <span className="control-object-index">0{index + 1}</span>
              <span>{label}</span>
            </div>
          ))}
          <div className="control-object-core">
            <span>AI</span>
            <small>ACTION</small>
          </div>
        </div>
        <div className="control-object-foot">
          <span>intent → boundary → validation → evidence</span>
          <span className="control-object-live">CONTROLLED FLOW</span>
        </div>
      </div>
    </div>
  );
}

function CinematicStory() {
  const storyRef = useRef<HTMLElement | null>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const element = storyRef.current;
    if (!element) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      element.style.setProperty('--story-progress', '1');
      setActive(3);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const scrollable = Math.max(1, element.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      element.style.setProperty('--story-progress', progress.toFixed(4));
      const nextActive = Math.min(3, Math.floor(progress * 4));
      if (nextActive !== activeRef.current) {
        activeRef.current = nextActive;
        setActive(nextActive);
      }
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <section id="why" ref={storyRef} className="motion-story" aria-label="AIXION control narrative">
      <div className="motion-story-sticky">
        <div className="page-shell motion-story-grid">
          <div className="motion-story-copy">
            <div className="story-eyebrow">01 / WHY AIXION</div>
            <h2>The difficult part starts after intelligence becomes action.</h2>
            <p className="story-intro">
              The system between intent and execution determines whether AI-assisted work remains controlled,
              testable, recoverable, and inspectable.
            </p>
            <div className="story-phases">
              {storyPhases.map(([label, body], index) => (
                <div key={label} className={`story-phase ${active === index ? 'is-active' : ''}`}>
                  <span className="story-phase-index">0{index + 1}</span>
                  <div>
                    <strong>{label}</strong>
                    <p>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="story-stage" aria-hidden="true">
            <div className="story-stage-orbit orbit-a" />
            <div className="story-stage-orbit orbit-b" />
            <div className="story-stage-crosshair horizontal" />
            <div className="story-stage-crosshair vertical" />
            <div className={`story-stage-core phase-${active + 1}`}>
              <div className="story-stage-ring ring-1" />
              <div className="story-stage-ring ring-2" />
              <div className="story-stage-center">
                <span>{storyPhases[active][0]}</span>
                <small>0{active + 1} / 04</small>
              </div>
              {storyPhases.map(([label], index) => (
                <div key={label} className={`story-satellite sat-${index + 1} ${active >= index ? 'is-reached' : ''}`}>
                  {label}
                </div>
              ))}
            </div>
            <div className="story-stage-caption">
              <span>CONTROL IS INFRASTRUCTURE</span>
              <span>{storyPhases[active][1]}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState<(typeof products)[number] | null>(null);
  const nav = [
    ['Home', 'hero'],
    ['Systems', 'work'],
    ['Evidence', 'proof'],
    ['Journey', 'founder'],
    ['Contact', 'contact'],
  ] as const;

  const go = (id: string) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-frosted-canvas text-[#d8d8d8]">
      <header className="site-header">
        <div className="site-header-inner">
          <button onClick={() => go('hero')} aria-label="AIXION LAB home" className="brand-button">
            <Brand />
          </button>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {nav.map(([label, id]) => (
              <button key={id} onClick={() => go(id)}>{label}</button>
            ))}
          </nav>
          <button onClick={() => go('contact')} className="header-contact">Contact <ArrowRight size={14} /></button>
          <button onClick={() => setMenu(!menu)} className="mobile-menu-button" aria-label="Toggle navigation">
            {menu ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {menu && (
          <div className="mobile-nav">
            {nav.map(([label, id]) => (
              <button key={id} onClick={() => go(id)}>{label}</button>
            ))}
          </div>
        )}
      </header>

      <main>
        <section id="hero" className="hero-section cinematic-hero">
          <div className="hero-orbit" />
          <div className="page-shell hero-grid">
            <div className="hero-copy hero-enter">
              <div className="hero-kicker">INDEPENDENT AI PRODUCT & SYSTEMS LAB</div>
              <h1 className="hero-title">The control layer for <span>AI that can act.</span></h1>
              <p className="hero-body">
                AIXION LAB builds systems for controlled execution, runtime reliability, failure containment,
                and evidence-backed software operations.
              </p>
              <p className="hero-thought">When intelligence becomes action, control becomes infrastructure.</p>
              <div className="hero-actions">
                <button onClick={() => go('work')} className="primary-cta">Explore systems <ArrowRight size={16} /></button>
                <button onClick={() => go('proof')} className="secondary-cta">See the evidence</button>
              </div>
            </div>
            <HeroControlObject />
          </div>
          <div className="hero-scroll-cue" aria-hidden="true"><span>SCROLL TO ENTER THE SYSTEM</span><i /></div>
        </section>

        <CinematicStory />

        <section id="work" className="editorial-section systems-section">
          <div className="page-shell">
            <SectionHeading
              index="02 / SYSTEMS"
              title="WHAT WE'RE BUILDING"
              statement="Systems and research shown according to what the evidence actually supports."
            />
            <div className="work-list reveal">
              {products.map((product, index) => (
                <button key={product.name} onClick={() => setSelected(product)} className="work-row">
                  <span className="work-number">0{index + 1}</span>
                  <span className="work-main">
                    <span className="work-title">{product.name}</span>
                    <span className="work-description">{product.short}</span>
                  </span>
                  <span className="work-status">{product.status}</span>
                  <span className="work-action">Explore <ArrowRight size={15} /></span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="proof" className="editorial-section brighter-band">
          <div className="page-shell">
            <SectionHeading
              index="03 / EVIDENCE"
              title="SHOW THE WORK."
              statement="Architecture, failures, repairs, validation, and current limitations."
            />
            <div className="proof-grid reveal">
              {[
                ['Architecture', 'Explain the boundary and why it exists.'],
                ['Failure', 'Preserve meaningful failure modes instead of hiding them.'],
                ['Validation', 'Use tests and replay where they actually exist.'],
                ['Limit', 'State clearly where the evidence stops.'],
              ].map(([title, body], index) => (
                <div key={title} className="proof-item">
                  <span className="proof-number">0{index + 1}</span>
                  <ShieldCheck size={18} />
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
            <div className="evidence-rule reveal">
              <CheckCircle2 size={18} />
              <span>
                Missing evidence is not converted into readiness, profitability, security guarantees, or stronger maturity language.
              </span>
            </div>
          </div>
        </section>

        <section id="principles" className="editorial-section principles-section">
          <div className="page-shell">
            <SectionHeading
              index="04 / PRINCIPLES"
              title="ENGINEERING PRINCIPLES"
              statement="A small set of rules for controlled AI-assisted systems."
            />
            <div className="principles-list reveal">
              {principles.map(([title, body], index) => (
                <div key={title} className="principle-row">
                  <span>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="founder" className="editorial-section brighter-band journey-section">
          <div className="page-shell">
            <SectionHeading
              index="05 / JOURNEY"
              title="FROM SOFTWARE QUALITY TO AI SYSTEMS."
              statement="AIXION LAB grew from testing software into building systems where control and evidence are part of the architecture."
            />
            <div className="journey-path reveal" aria-label="Founder journey">
              {['Software Quality', 'Automation', 'Runtime Reliability', 'AI-Assisted Engineering', 'Control & Evidence', 'AIXION LAB'].map((item, index) => (
                <div className="journey-step" key={item}>
                  <span>0{index + 1}</span>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
            <div className="editorial-two-col founder-copy reveal">
              <p>
                Ram Golladi's background is rooted in software quality, automated testing, and systems reliability.
                That same quality mindset now shapes work on AI-assisted execution, runtime boundaries, and evidence.
              </p>
              <div>
                <p>
                  The objective is not to hide AI-assisted development. It is to make direction, validation, failures,
                  and current limits inspectable.
                </p>
                <a href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer" className="github-link">
                  <Github size={16} /> View GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="page-shell contact-inner">
            <SectionHeading index="06 / CONTACT" title="START A CONVERSATION." />
            <h2 className="contact-question reveal">Product discussions, technical collaboration, research questions, or engineering conversations.</h2>
            <p className="reveal">Reach AIXION LAB through the public founder channel or email.</p>
            <div className="contact-actions reveal">
              <a href="mailto:contact@aixionlabs.com" className="contact-link">contact@aixionlabs.com <ArrowRight size={18} /></a>
              <a href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer" className="contact-link secondary-contact"><Github size={17} /> GitHub</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-shell footer-primary">
          <div className="footer-brand">
            <strong>AIXION LAB</strong>
            <span>END IS THE NEW BEGINNING</span>
            <p>Independent AI product & systems lab.</p>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            {nav.map(([label, id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}
            <a href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer">GitHub</a>
          </nav>
        </div>
        <div className="page-shell footer-secondary">
          <span>© 2026 AIXION LAB. All rights reserved.</span>
          <span>Financial-systems research is research only, not investment advice.</span>
          <button onClick={() => go('hero')} aria-label="Back to top"><ChevronUp size={17} /></button>
        </div>
      </footer>

      {selected && (
        <div className="modal-backdrop dossier-enter" role="dialog" aria-modal="true" aria-label={`${selected.name} details`}>
          <div className="system-dossier">
            <button onClick={() => setSelected(null)} className="modal-close" aria-label="Close"><X size={18} /></button>
            <div className="dossier-index">{selected.status}</div>
            <h2>{selected.name}</h2>
            <p className="dossier-lead">{selected.short}</p>
            <div className="dossier-rule" />
            <div className="dossier-grid">
              <section><span>THE PROBLEM</span><p>{selected.problem}</p></section>
              <section><span>SYSTEM DIRECTION</span><p>{selected.built}</p></section>
              <section><span>EVIDENCE BOUNDARY</span><p>{selected.evidence}</p></section>
              <section><span>CURRENT LIMITATION</span><p>{selected.limitation}</p></section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
