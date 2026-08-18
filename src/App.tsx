import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Github, Menu, ShieldCheck, X } from 'lucide-react';

const products = [
  { name: 'Aixion Control Tower', status: 'FLAGSHIP BUILD', short: 'Human-in-the-loop control for AI-assisted software workflows.', problem: 'AI-assisted work can move faster than the human review and approval structures around it.', built: 'A control-plane direction for task review, explicit approval gates, validation checkpoints, audit-oriented records, and operator visibility.', evidence: 'Public architecture and governance principles are available; stronger readiness claims remain intentionally withheld until evidence supports them.', limitation: 'Not presented as autonomous production infrastructure or an enterprise deployment.' },
  { name: 'MCP Shield', status: 'AI SECURITY', short: 'Runtime security for AI agents and MCP tools.', problem: 'Agent-to-tool interactions can cross sensitive boundaries without enough inspection, policy context, or review.', built: 'A security-focused layer for inspecting tool interactions, applying policy checks, supporting approval/block decisions, and improving auditability.', evidence: 'The public story describes the security architecture and intended controls without claiming complete threat prevention.', limitation: 'No certification, zero-day protection, or universal security guarantee is claimed.' },
  { name: 'Veriforge', status: 'EVIDENCE SYSTEM', short: 'Connect claims to tests, decisions, failures, architecture, and reviewable evidence.', problem: 'AI-assisted engineering makes it easy for implementation speed to outrun proof and reviewability.', built: 'An evidence-system concept for making technical claims easier to inspect by linking them to validation context, decisions, failures, and artifacts.', evidence: 'The project philosophy is explicit: missing evidence stays missing instead of being converted into a stronger maturity claim.', limitation: 'Presented as an evolving evidence system, not as a completed enterprise platform.' },
  { name: 'Financial Systems Research Lab', status: 'RESEARCH', short: 'Financial-systems research focused on data quality, replay, reliability, risk controls, and evidence-driven analysis.', problem: 'Financial research is unusually vulnerable to bad data, leakage, selection bias, unrealistic execution assumptions, and overclaiming.', built: 'A research environment for data-quality work, real-time pipeline investigation, replay, market-microstructure experiments, reliability, and governed hypothesis testing.', evidence: 'Failed hypotheses are treated as evidence. Historical results are not promoted into live or tradable edge without stronger validation.', limitation: 'Not investment advice, a signal-selling product, or an automated customer trading service.' },
];

const principles = [
  ['Approval before action', 'Keep consequential AI-assisted actions reviewable.'],
  ['Audit is not optional', 'Important decisions should leave a trace that can be inspected later.'],
  ['Tests are contracts', 'Capability claims should be constrained by executable evidence.'],
  ['Security starts disabled', 'Grant sensitive capability deliberately instead of by default.'],
  ['Proof beats claims', 'Maturity labels should never outrun the available evidence.'],
  ['Failure is evidence', 'Negative findings and repairs should improve the next system decision.'],
];

function Brand() {
  return <img src="/brand/aixion-lab-primary.png" alt="AIXION LAB — End is the new beginning" className="brand-lockup" />;
}

function SectionHeading({ index, title, statement }: { index: string; title: string; statement?: string }) {
  return <div className="section-heading">
    <div className="section-index">{index}</div>
    <div>
      <h2 className="section-title">{title}</h2>
      {statement && <p className="section-statement">{statement}</p>}
    </div>
  </div>;
}

export default function App() {
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState<(typeof products)[number] | null>(null);
  const nav = [['Why', 'why'], ['Work', 'work'], ['Proof', 'proof'], ['Principles', 'principles'], ['Founder', 'founder'], ['Contact', 'contact']];
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  return <div className="min-h-screen bg-frosted-canvas text-[#d8d8d8]">
    <header className="site-header">
      <div className="site-header-inner">
        <button onClick={() => go('hero')} aria-label="AIXION LAB home" className="brand-button"><Brand /></button>
        <nav className="desktop-nav">{nav.map(([label,id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}</nav>
        <button onClick={() => setMenu(!menu)} className="mobile-menu-button" aria-label="Toggle navigation">{menu ? <X size={18}/> : <Menu size={18}/>}</button>
      </div>
      {menu && <div className="mobile-nav">{nav.map(([label,id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}</div>}
    </header>

    <main>
      <section id="hero" className="hero-section">
        <div className="hero-orbit" />
        <div className="page-shell hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker">AI AGENT GOVERNANCE · SOFTWARE QUALITY · RUNTIME SECURITY · APPLIED RESEARCH</div>
            <h1 className="hero-title">Human control for <span>AI systems</span> that can actually change things.</h1>
            <p className="hero-body">AIXION LAB is an independent AI product and research studio building controlled, testable, evidence-driven systems across agent governance, software quality, runtime security, automation, and applied research.</p>
            <div className="hero-actions">
              <button onClick={() => go('work')} className="primary-cta">Explore the work <ArrowRight size={16}/></button>
              <button onClick={() => go('proof')} className="secondary-cta">View evidence</button>
            </div>
          </div>

          <aside className="project-index">
            <div className="project-index-label">What we are building</div>
            <div className="project-list">{products.map((p, i) => <button key={p.name} onClick={() => setSelected(p)} className="project-row">
              <span className="project-number">0{i+1}</span>
              <span className="project-row-copy"><span className="project-row-title">{p.name}</span><span className="project-row-short">{p.short}</span></span>
              <span className="project-status">{p.status}</span>
              <ArrowRight size={16} className="project-arrow"/>
            </button>)}</div>
          </aside>
        </div>
      </section>

      <section id="why" className="editorial-section brighter-band">
        <div className="page-shell">
          <SectionHeading index="01 / PURPOSE" title="WHY AIXION LAB" statement="AI capability is moving faster than control, review, and proof." />
          <div className="editorial-two-col">
            <p>Models can now interact with code, tools, files, APIs, and operational workflows. The difficult question is no longer only whether AI can generate work. It is whether that work remains inside explicit boundaries.</p>
            <p>AIXION LAB explores the layer between human intent and AI-assisted execution: approval, security, testing, auditability, failure handling, and evidence.</p>
          </div>
        </div>
      </section>

      <section id="work" className="editorial-section">
        <div className="page-shell">
          <SectionHeading index="02 / SYSTEMS" title="WHAT WE'RE BUILDING" statement="Different problems. One operating principle: control must remain visible." />
          <p className="section-intro">Projects are shown according to their current role and maturity. Research stays research; stronger claims require stronger evidence.</p>
          <div className="work-list">{products.map((p, i) => <button key={p.name} onClick={() => setSelected(p)} className="work-row">
            <span className="work-number">0{i+1}</span>
            <span className="work-main"><span className="work-title">{p.name}</span><span className="work-description">{p.short}</span></span>
            <span className="work-status">{p.status}</span>
            <span className="work-action">View system <ArrowRight size={15}/></span>
          </button>)}</div>
        </div>
      </section>

      <section id="proof" className="editorial-section brighter-band">
        <div className="page-shell">
          <SectionHeading index="03 / PROOF" title="SHOW THE WORK" statement="A claim is only as strong as the evidence behind it." />
          <p className="section-intro">This site deliberately distinguishes product intent, implementation work, research, and evidence. Missing proof is not treated as zero, success, or readiness.</p>
          <div className="proof-grid">{[
            ['Architecture','Explain the system boundary and why it exists.'],
            ['Tests','Use validation results where they actually exist.'],
            ['Failures','Keep meaningful negative findings and repairs visible.'],
            ['Maturity','Do not promote a prototype or research result into a stronger claim.']
          ].map(([title,body], i) => <div key={title} className="proof-item"><span className="proof-number">0{i+1}</span><ShieldCheck size={18}/><h3>{title}</h3><p>{body}</p></div>)}</div>
          <div className="evidence-rule"><CheckCircle2 size={18}/><span>Unsupported customers, metrics, certifications, profitability, production-readiness, or security guarantees are not substituted with impressive-sounding language.</span></div>
        </div>
      </section>

      <section id="principles" className="editorial-section">
        <div className="page-shell">
          <SectionHeading index="04 / PRINCIPLES" title="HOW WE BUILD" statement="No blind automation. No fake certainty." />
          <div className="principles-list">{principles.map(([title,body], i) => <div key={title} className="principle-row"><span>0{i+1}</span><h3>{title}</h3><p>{body}</p></div>)}</div>
        </div>
      </section>

      <section id="founder" className="editorial-section brighter-band">
        <div className="page-shell">
          <SectionHeading index="05 / FOUNDER" title="RAM GOLLADI" statement="Founder / AI Systems Builder" />
          <div className="editorial-two-col founder-copy">
            <p>AIXION LAB grows out of a software-quality background: testing software, automating validation, and then moving deeper into AI-assisted systems where control and evidence become part of the architecture.</p>
            <div><p>The objective is not to hide AI-assisted development. It is to show how systems are directed, reviewed, tested, corrected, and governed — and where the evidence still stops.</p><a href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer" className="github-link"><Github size={16}/>View GitHub</a></div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="page-shell contact-inner">
          <SectionHeading index="06 / CONTACT" title="LET'S BUILD WITH CONTROL" />
          <h2 className="contact-question">Building something where AI needs stronger control, quality, or evidence?</h2>
          <p>AIXION LAB is being built in public through products, engineering case studies, research, failures, decisions, and proof of work.</p>
          <a href="mailto:contact@aixionlabs.com" className="contact-link">contact@aixionlabs.com <ArrowRight size={18}/></a>
        </div>
      </section>
    </main>

    <footer className="site-footer"><div className="page-shell footer-inner"><span>© 2026 AIXION LAB</span><span>END IS THE NEW BEGINNING</span><span>Financial Systems Research Lab: research only, not investment advice.</span></div></footer>

    {selected && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`${selected.name} details`}>
      <div className="system-dossier">
        <button onClick={() => setSelected(null)} className="modal-close" aria-label="Close"><X size={18}/></button>
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
    </div>}
  </div>;
}
