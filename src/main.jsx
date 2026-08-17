import React from 'react';
import { createRoot } from 'react-dom/client';
import { ShieldCheck, FileCheck2, Activity, Workflow, ArrowRight } from 'lucide-react';
import './styles.css';

const BRAND_LOCKUP = 'https://raw.githubusercontent.com/ramgolladi1503-sys/axiom/website/aixion-brand-ai-studio-v1/frontend/public/brand/aixion-lab-brand-lockup.webp';

const systems = [
  ['AI Agent Control', 'Approval-first workflows for AI agents, coding tools, MCP servers and automated execution systems.'],
  ['Runtime Security', 'Guardrails that observe, explain, approve, audit or block risky tool calls before execution.'],
  ['Quality Intelligence', 'Evidence-driven QA systems that turn tests, failures, decisions and releases into traceable proof.'],
  ['Real-Time Reliability', 'Decision infrastructure for environments where stale data, weak gates or bad timing can cause damage.'],
];

const work = [
  ['Aixion Control Tower', 'FLAGSHIP BUILD', 'Human-in-the-loop control plane for AI-assisted software work, approvals, validation, audit and execution oversight.'],
  ['MCP Shield', 'AI SECURITY', 'Runtime security gateway for AI agents and MCP tools with policy, approval, blocking, audit and rollback-oriented controls.'],
  ['Veriforge', 'EVIDENCE SYSTEM', 'Living proof system mapping claims to projects, tests, failures, architecture, decisions, demos and reviewable evidence.'],
  ['Financial Systems Research Lab', 'RESEARCH', 'Experimental financial-systems environment for data quality, replay, market microstructure, risk controls and reliability research. Not an advisory or automated trading service.'],
];

function Brand({ className = '' }) {
  return <img className={`brand-lockup ${className}`} src={BRAND_LOCKUP} alt="AIXION LAB — End is the new beginning" />;
}

function App() {
  return (
    <div className="page-shell">
      <header className="site-header">
        <a href="#top" className="brand-link"><Brand className="header-brand" /></a>
        <nav>
          <a href="#systems">Systems</a>
          <a href="#work">Work</a>
          <a href="#proof">Proof</a>
          <a href="#founder">Founder</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section id="top" className="hero section-wrap">
          <div className="hero-copy">
            <Brand className="hero-brand" />
            <p className="eyebrow">AI SYSTEMS · QA AUTOMATION · RUNTIME SECURITY · APPLIED RESEARCH</p>
            <h1>Human control for AI systems that can actually change things.</h1>
            <p className="lede">AIXION LAB builds controlled, testable and evidence-driven systems across agent governance, software quality, runtime security, automation and real-world decision infrastructure.</p>
            <div className="actions">
              <a className="button primary" href="#work">Explore the work <ArrowRight size={16} /></a>
              <a className="button" href="#proof">View proof</a>
            </div>
          </div>

          <div className="control-card">
            <div className="control-head"><span>EXECUTION CONTROL</span><span className="status-dot">●</span></div>
            <div className="orb"><div className="orb-core" /></div>
            <div className="control-list">
              <div><span>Agent task</span><strong>Waiting</strong></div>
              <div><span>Risk score</span><strong>Review</strong></div>
              <div><span>MCP call</span><strong>Blocked</strong></div>
              <div><span>Audit trail</span><strong>Saved</strong></div>
            </div>
          </div>
        </section>

        <section className="statement section-wrap">
          <p className="eyebrow">THE GAP</p>
          <h2>AI tools are getting powerful. Control, proof and accountability are lagging.</h2>
          <p>Generating work is no longer the hard part. The hard part is proving what happened, why it happened, what was allowed, who approved it, and whether execution stayed inside its intended boundary.</p>
        </section>

        <section id="systems" className="section-wrap">
          <div className="section-head"><p className="eyebrow">SYSTEMS</p><h2>Built around control, evidence and execution discipline.</h2></div>
          <div className="grid four">
            {systems.map(([title, body], i) => <article className="card" key={title}><span className="num">0{i+1}</span><h3>{title}</h3><p>{body}</p></article>)}
          </div>
        </section>

        <section id="work" className="section-wrap">
          <div className="section-head"><p className="eyebrow">CURRENT WORK</p><h2>Products and research with proof behind them.</h2></div>
          <div className="work-list">
            {work.map(([name, status, body]) => <article className="work-row" key={name}><div><span className="badge">{status}</span><h3>{name}</h3></div><p>{body}</p></article>)}
          </div>
        </section>

        <section id="proof" className="section-wrap proof-panel">
          <div><p className="eyebrow">PROOF</p><h2>Claims should survive review.</h2><p>Architecture, tests, release evidence, failures, decisions and demonstrations are part of the product story—not hidden afterthoughts.</p></div>
          <div className="proof-grid">
            <div><ShieldCheck /><span>Approval before action</span></div>
            <div><FileCheck2 /><span>Tests are contracts</span></div>
            <div><Workflow /><span>Audit is not optional</span></div>
            <div><Activity /><span>Failure is evidence</span></div>
          </div>
        </section>

        <section id="founder" className="section-wrap founder">
          <div><p className="eyebrow">FOUNDER</p><h2>Built from software quality into AI systems engineering.</h2></div>
          <div><h3>Ram Golladi</h3><p>AIXION LAB is being built as an independent AI product studio and technical body of work around agent governance, QA, automation, security and applied research. AI-assisted development is used openly; the emphasis is on directing, reviewing, testing, correcting and governing the work.</p></div>
        </section>

        <section id="contact" className="section-wrap contact">
          <Brand className="contact-brand" />
          <p className="eyebrow">CONTACT</p>
          <h2>Building something where AI needs stronger control, quality or evidence?</h2>
          <a className="button primary" href="mailto:contact@aixionlabs.com">contact@aixionlabs.com</a>
        </section>
      </main>

      <footer><span>© 2026 AIXION LAB</span><span>END IS THE NEW BEGINNING</span></footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
