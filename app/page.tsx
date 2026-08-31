import Link from "next/link";
import { systems, researchNotes } from "@/lib/site-data";
import { CareerStrip, ProgressLane, SectionHeading, StateTag, SystemCard } from "@/components/ui";
import { AixionSignal, LabFieldVisual, SystemVisual } from "@/components/system-visuals";

export default function HomePage() {
  const tradebot = systems[0];
  const controlCore = systems[1];

  return (
    <>
      <section className="hero signature-hero" data-reveal="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">AIXION LAB · APPLIED INTELLIGENCE · AUTOMATION · DECISION SYSTEMS</p>
            <h1>Systems should be able to explain their state.</h1>
            <p className="lede">A living engineering lab where applied intelligence becomes real systems through explicit validation, evidence and authority boundaries.</p>
            <p className="hero-philosophy">The work changes by domain. The engineering requirement does not: know the state, preserve the evidence, expose the boundary.</p>
            <div className="hero-attribution">
              <strong>Built by Ram</strong>
              <span>Quality Engineering · Automation · Software · Data · Applied AI</span>
            </div>
            <div className="button-row hero-actions-visible">
              <Link className="button" href="/systems">Explore systems →</Link>
              <Link className="button-secondary" href="/pulse">View Lab Pulse</Link>
            </div>
            <AixionSignal compact />
          </div>
          <LabFieldVisual />
        </div>

        <div className="shell panel pulse-preview" data-reveal="pulse-preview">
          <div className="pulse-head">
            <div>
              <p className="eyebrow">LAB PULSE</p>
              <h2>Current system state, evidence and next gates.</h2>
            </div>
            <p>Curated public-safe state · no arbitrary completion percentages</p>
          </div>
          <ProgressLane label="TradeBot" stage="VALIDATING" />
          <ProgressLane label="Control Core" stage="BUILDING" />
          <ProgressLane label="Automation" stage="BUILDING" />
          <ProgressLane label="Analytics Lab" stage="RESEARCH" />
          <Link className="text-link" href="/pulse">Open operational Pulse →</Link>
        </div>
      </section>

      <section className="section" data-reveal="systems-registry">
        <div className="shell">
          <SectionHeading eyebrow="SYSTEMS REGISTRY" title="Four systems. Different problems. One engineering discipline." copy="Each system exposes maturity, current gate, public-safe evidence and the next decision point." />
          <div className="system-grid">
            {systems.map(system => <SystemCard key={system.id} system={system} />)}
          </div>
        </div>
      </section>

      <section className="section-tight" data-reveal="tradebot-feature">
        <div className="shell feature-split">
          <article className="panel feature-copy">
            <p className="eyebrow">AX-SYS-001 · FLAGSHIP · VALIDATING</p>
            <h2>TradeBot</h2>
            <p className="system-principle">A market system should know whether its data is trustworthy before it makes a claim.</p>
            <p>{tradebot.descriptor}</p>
            <p>Market data, research output and automated analysis are deliberately separated from risk and human execution authority.</p>
            <div className="button-row"><StateTag state={tradebot.state} /><Link className="button-secondary" href="/systems/tradebot#evidence">Evidence →</Link></div>
            <CareerStrip skills={tradebot.competencies} />
            <Link className="text-link" href="/systems/tradebot">Explore the system →</Link>
          </article>
          <SystemVisual kind="tradebot" />
        </div>
      </section>

      <section className="section-tight" data-reveal="control-core-feature">
        <div className="shell feature-split">
          <SystemVisual kind="control-core" />
          <article className="panel feature-copy">
            <p className="eyebrow">AX-SYS-002 · SECOND FLAGSHIP · BUILDING</p>
            <h2>Aixion Control Core</h2>
            <p className="system-principle">An autonomous system should know what it is allowed to do before it acts.</p>
            <p>{controlCore.descriptor}</p>
            <p>The MVP focuses on inspectable orchestration: intent, context, tools, policy, evidence and human/system authority are explicit stages.</p>
            <StateTag state={controlCore.state} />
            <CareerStrip skills={controlCore.competencies} />
            <Link className="text-link" href="/systems/control-core">Explore Control Core →</Link>
          </article>
        </div>
      </section>

      <section className="section" data-reveal="research-proof">
        <div className="shell">
          <SectionHeading eyebrow="RESEARCH / PROOF" title="The lab keeps the questions, failures and evidence visible." copy="A rejected mechanism is still useful engineering evidence. Research is not silently promoted into a system claim." />
          <div className="research-list">
            {researchNotes.slice(0, 3).map(note => (
              <Link className="research-row" href={`/research/${note.slug}`} key={note.slug}>
                <div><h3>{note.title}</h3><p>{note.question}</p></div>
                <span className="research-domain">{note.domain}</span>
                <StateTag state={note.state} />
              </Link>
            ))}
          </div>
          <Link className="text-link" href="/research">View research index →</Link>
        </div>
      </section>

      <section className="section-tight" data-reveal="journey-feature">
        <div className="shell feature-split">
          <div className="panel feature-copy">
            <p className="eyebrow">JOURNEY</p>
            <h2>The tools changed. The questions got stricter.</h2>
            <p className="lede">Quality engineering started with “why did this fail?” The current frontier asks whether intelligent systems can act while remaining observable, governed and accountable.</p>
            <Link className="text-link" href="/journey">View the engineering journey →</Link>
          </div>
          <SystemVisual kind="journey" />
        </div>
      </section>

      <section className="section" data-reveal="contact">
        <div className="shell contact-panel">
          <div className="panel contact-copy">
            <p className="eyebrow">CONTACT</p>
            <h2>Build, test or discuss something difficult.</h2>
            <p className="lede">Engineering roles, applied-AI work, automation systems or a technical conversation about one of the systems.</p>
          </div>
          <div className="panel contact-copy">
            <p className="eyebrow">RECRUITER FAST PATH</p>
            <h3>Need the career translation?</h3>
            <p>Career view translates the same systems into competencies without changing the underlying evidence.</p>
            <div className="button-row">
              <Link className="button" href="/resume">Career snapshot →</Link>
              <Link className="button-secondary" href="/about#contact">Contact</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
