import Link from "next/link";
import { researchNotes, systems } from "@/lib/site-data";
import { RobotMind } from "@/components/robot-mind";

const metrics = [
  ["SYSTEMS", "04", "public engineering systems"],
  ["RESEARCH", "04", "public research notes"],
  ["AUTHORITY", "EXPLICIT", "human and system boundaries"],
  ["EVIDENCE", "VISIBLE", "state before claims"],
] as const;

const productivity = [
  ["01", "State before story", "Every system exposes what it is doing now before the page tells you what it might become.", "STATE / OBSERVABILITY"],
  ["02", "Evidence before confidence", "Research, implementation and validation are kept separate so a promising result cannot silently become a proven claim.", "EVIDENCE / VALIDATION"],
  ["03", "Authority before action", "Automation only acts inside explicit policy and human-authority boundaries. Capability does not imply permission.", "AUTHORITY / GOVERNANCE"],
] as const;

const propositions = [
  ["SYSTEMS", "Built as observable machinery", "TradeBot, Control Core, Automation and Analytics expose state, failure paths and current gates instead of presenting finished-demo theatre."],
  ["RESEARCH", "Rejected work remains visible", "A hypothesis can fail and still improve the lab. Negative evidence is part of the engineering record rather than something to hide."],
  ["OPERATIONS", "Runtime truth stays separate", "A passing test, historical result or synthetic replay does not become live evidence merely because it looks operationally similar."],
  ["GOVERNANCE", "Authority is a first-class state", "Agents, tools and automations are useful only when their permitted actions, evidence and human boundaries are explicit."],
  ["CAREER + COLLABORATION", "One public proof surface", "Recruiters and collaborators can inspect the same systems, research and operating principles without inflated claims or invented outcomes."],
] as const;

const opportunity = [
  ["01", "AI needs operational truth", "Models can generate answers. Useful systems must also expose state, provenance, failure and authority."],
  ["02", "Automation needs boundaries", "Reliable automation is not only about speed. It needs policy, recovery paths and evidence that operators can inspect."],
  ["03", "Quality becomes architecture", "Testing moves upstream when observability, validation and failure handling are designed into the system rather than bolted on later."],
  ["04", "Research needs memory", "A lab becomes more credible when failed hypotheses, blocked gates and unfinished work remain part of the visible record."],
] as const;

const faqs = [
  ["01", "What is Aixion Lab?", "An independent applied-engineering lab led by Ram. It is a public surface for systems, research, validation and selected collaboration—not a claim of a staffed consultancy."],
  ["02", "What can I inspect here?", "Public-safe system state, current gates, research notes, engineering decisions, career translation and collaboration scope."],
  ["03", "Does the site claim live production results?", "No. Historical evidence, implementation status, live evidence and economic claims are kept separate unless exact public evidence supports them."],
  ["04", "Can teams work with Aixion Lab?", "Yes, selectively, where the work fits quality engineering, automation, software, data, applied AI, agents, governance or evidence-led prototypes."],
  ["05", "Can recruiters evaluate Ram through the site?", "Yes. The Career view translates the systems into engineering competencies while preserving the same evidence boundaries."],
] as const;

export default function HomePage() {
  return (
    <div className="sharp-home sharp-home-v2">
      <section className="sharp-hero sharp-hero-v2" data-reveal="hero">
        <div className="sharp-hero-inner sharp-hero-inner-v2">
          <div className="sharp-hero-copy sharp-hero-copy-v2">
            <p className="sharp-kicker">AIXION LAB · APPLIED INTELLIGENCE</p>
            <h1><span>Intelligence</span><em>with evidence.</em></h1>
            <p className="sharp-hero-lede">Aixion Lab builds automation, decision systems and applied AI that can explain their state, their evidence and their limits.</p>
            <div className="sharp-hero-actions">
              <Link className="sharp-pill-link sharp-pill-link--solid" href="/systems">Explore systems ↗</Link>
              <Link className="sharp-pill-link" href="/research">Review research</Link>
            </div>
          </div>
          <RobotMind />
          <div className="sharp-hero-rail sharp-hero-rail--left"><span>PUBLIC STATE / 2026</span></div>
          <div className="sharp-hero-rail sharp-hero-rail--right"><span>STATE · EVIDENCE · AUTHORITY</span></div>
          <div className="sharp-hero-bottomline">
            <span>INDEPENDENT APPLIED-ENGINEERING LAB</span>
            <span>BUILT BY RAM</span>
            <span>QUALITY → AUTOMATION → SYSTEMS → AI</span>
          </div>
        </div>
      </section>

      <section className="sharp-ticker" aria-label="Aixion public-state summary">
        <div className="sharp-ticker-lead"><span>PUBLIC STATE</span><strong>Observable by design</strong></div>
        <div className="sharp-ticker-grid">
          {metrics.map(([label, value, detail]) => (
            <article key={label}><span>{label}</span><strong>{value}</strong><small>{detail}</small></article>
          ))}
        </div>
        <Link href="/pulse" className="sharp-ticker-link">OPEN PULSE ↗</Link>
      </section>

      <section className="sharp-productivity" data-reveal="productivity">
        <div className="sharp-shell sharp-productivity-intro">
          <p className="sharp-section-index">PIONEERING RELIABILITY</p>
          <div>
            <h2>Engineering intelligence that can survive scrutiny.</h2>
            <p>Aixion is organized around a simple constraint: useful intelligence must remain observable from research through operation.</p>
          </div>
        </div>
        <div className="sharp-productivity-stack">
          {productivity.map(([number, title, copy, axis], index) => (
            <article className="sharp-productivity-row" key={number}>
              <div className="sharp-productivity-number">{number}</div>
              <div className="sharp-productivity-copy"><span>{axis}</span><h3>{title}</h3><p>{copy}</p></div>
              <div className={`sharp-productivity-visual sharp-productivity-visual--${index + 1}`} aria-hidden="true">
                <div className="sharp-visual-grid" />
                <div className="sharp-visual-orbit" />
                <div className="sharp-visual-core"><i /><i /><i /></div>
                <div className="sharp-visual-scan" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sharp-propositions sharp-propositions-v2" data-reveal="propositions">
        <div className="sharp-shell sharp-propositions-head sharp-propositions-head-v2">
          <p className="sharp-section-index">PROPOSITIONS</p>
          <h2>The stack for governed intelligence.</h2>
        </div>
        <div className="sharp-proposition-list">
          {propositions.map(([label, title, copy], index) => (
            <article className="sharp-proposition-item" key={label}>
              <span className="sharp-proposition-index">0{index + 1}</span>
              <span className="sharp-proposition-label">{label}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
              <i aria-hidden="true">↗</i>
            </article>
          ))}
        </div>
      </section>

      <section className="sharp-systems-showcase" data-reveal="systems-showcase">
        <div className="sharp-shell sharp-systems-title">
          <p className="sharp-section-index">SYSTEMS</p>
          <h2>Four public systems. Four different engineering problems.</h2>
        </div>
        <div className="sharp-system-panels">
          {systems.map((system, index) => (
            <Link href={`/systems/${system.slug}`} className="sharp-system-panel" key={system.id}>
              <span>0{index + 1}</span>
              <small>{system.state}</small>
              <h3>{system.shortName}</h3>
              <p>{system.descriptor}</p>
              <b>EXPLORE SYSTEM ↗</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="sharp-generation" data-reveal="opportunity">
        <div className="sharp-generation-hero">
          <div className="sharp-shell">
            <p className="sharp-section-index">THE OPPORTUNITY</p>
            <h2>Intelligent systems are becoming operational infrastructure.</h2>
            <p>That makes reliability, observability, evidence and authority more important—not less.</p>
            <Link className="sharp-pill-link sharp-pill-link--solid" href="/about">WHY AIXION ↗</Link>
          </div>
        </div>
        <div className="sharp-opportunity-points">
          {opportunity.map(([number, title, copy]) => (
            <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><i aria-hidden="true" /></article>
          ))}
        </div>
      </section>

      <section className="sharp-news" data-reveal="research-news">
        <div className="sharp-shell sharp-news-head">
          <div><p className="sharp-section-index">INSIGHTS FROM THE LAB</p><h2>Latest research.</h2></div>
          <Link href="/research">VISIT RESEARCH ↗</Link>
        </div>
        <div className="sharp-news-grid">
          {researchNotes.slice(0, 3).map((note, index) => (
            <Link href={`/research/${note.slug}`} className="sharp-news-card" key={note.slug}>
              <div className={`sharp-news-art sharp-news-art--${index + 1}`} aria-hidden="true"><i /><i /><i /><i /></div>
              <span>{note.domain}</span>
              <small>{note.state}</small>
              <h3>{note.title}</h3>
              <p>{note.question}</p>
              <b>READ NOTE ↗</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="sharp-faq" data-reveal="faq">
        <div className="sharp-shell sharp-faq-grid">
          <div className="sharp-faq-heading"><p className="sharp-section-index">FAQ</p><h2>Got more questions?</h2><Link href="/about#contact">REACH OUT ↗</Link></div>
          <div className="sharp-faq-list">
            {faqs.map(([number, question, answer]) => (
              <details key={number} className="sharp-faq-item">
                <summary><span>{number}</span><strong>{question}</strong><i>+</i></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="sharp-opportunity sharp-opportunity-v2" data-reveal="career-opportunity">
        <div className="sharp-shell sharp-opportunity-grid">
          <div><p className="sharp-section-index">WORK / CAREER</p><h2>Build what can survive scrutiny.</h2></div>
          <div className="sharp-opportunity-copy">
            <p>Recruiters can review the engineer behind the systems. Teams with a bounded technical problem can collaborate with Aixion Lab. Both paths point back to the same public evidence.</p>
            <div className="sharp-opportunity-links">
              <Link className="sharp-pill-link sharp-pill-link--solid" href="/resume">Hire Ram ↗</Link>
              <Link className="sharp-pill-link" href="/collaborate">Work with Aixion Lab ↗</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sharp-closing sharp-closing-v2" data-reveal="sharp-closing">
        <div className="sharp-closing-orbit" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="sharp-closing-inner">
          <p className="sharp-section-index">AIXION LAB</p>
          <h2>Observe.<span>Explain.</span>Operate.</h2>
          <p>Applied intelligence becomes useful when state, evidence, failure and authority remain visible all the way from experiment to operation.</p>
          <Link href="/systems" className="sharp-closing-link">ENTER THE LAB ↗</Link>
        </div>
      </section>
    </div>
  );
}
