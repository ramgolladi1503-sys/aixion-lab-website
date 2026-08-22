import Link from "next/link";
import { systems, researchNotes } from "@/lib/site-data";
import { AbstractScene, ArchitectureFlow, CareerStrip, ProgressLane, SectionHeading, StateTag, SystemCard } from "@/components/ui";

export default function HomePage() {
  const tradebot = systems[0];
  const controlCore = systems[1];

  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">AIXION LAB · INDEPENDENT APPLIED ENGINEERING</p>
            <h1>Applied intelligence, automation and decision systems.</h1>
            <p className="lede">An independent engineering lab where ideas move through research, implementation, validation and real-world observation.</p>
            <div className="hero-attribution">
              <strong>Built by Ram</strong>
              <span>Quality Engineering · Automation · Software · Data · Applied AI</span>
            </div>
            <div className="button-row">
              <Link className="button" href="/systems">Explore systems →</Link>
              <Link className="button-secondary" href="/pulse">View Lab Pulse</Link>
            </div>
          </div>
          <AbstractScene variant="sage" />
        </div>

        <div className="shell panel pulse-preview">
          <div className="pulse-head">
            <div>
              <p className="eyebrow">LAB PULSE</p>
              <h2>What the lab is building, validating and learning now.</h2>
            </div>
            <p>Public-safe system state · Updated through curated evidence</p>
          </div>
          <ProgressLane label="TradeBot" stage="VALIDATING" />
          <ProgressLane label="Control Core" stage="BUILDING" />
          <ProgressLane label="Automation" stage="BUILDING" />
          <ProgressLane label="Analytics Lab" stage="RESEARCH" />
          <Link className="text-link" href="/pulse">Open full Pulse →</Link>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading eyebrow="SYSTEMS REGISTRY" title="Systems under development" copy="Four public-safe system views. Each one shows what exists, what is being tested, where the boundary sits and what comes next." />
          <div className="system-grid">
            {systems.map(system => <SystemCard key={system.id} system={system} />)}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell feature-split">
          <article className="panel feature-copy">
            <p className="eyebrow">AX-SYS-001 · VALIDATING</p>
            <h2>TradeBot</h2>
            <p>{tradebot.descriptor}</p>
            <p>TradeBot is built around a simple principle: market data, research output and automated decisions should never silently become execution authority.</p>
            <StateTag state={tradebot.state} />
            <CareerStrip skills={tradebot.competencies} />
            <Link className="text-link" href="/systems/tradebot">Explore TradeBot →</Link>
          </article>
          <div className="panel feature-visual">
            <p className="eyebrow">PUBLIC ARCHITECTURE</p>
            <ArchitectureFlow nodes={["Market Data", "Market State", "Signal / Research", "Risk", "Governance", "Human Authority"]} />
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell feature-split">
          <div className="panel feature-visual">
            <p className="eyebrow">ORCHESTRATION MODEL</p>
            <ArchitectureFlow nodes={["Intent", "Context", "Planner", "Agents", "Tools", "Evidence", "Policy / Human"]} />
          </div>
          <article className="panel feature-copy">
            <p className="eyebrow">AX-SYS-002 · BUILDING</p>
            <h2>Aixion Control Core</h2>
            <p>{controlCore.descriptor}</p>
            <p>Control Core explores how autonomous capabilities can be coordinated without losing observability, policy boundaries or explicit authority.</p>
            <StateTag state={controlCore.state} />
            <CareerStrip skills={controlCore.competencies} />
            <Link className="text-link" href="/systems/control-core">Explore Control Core →</Link>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading eyebrow="RESEARCH NOTES" title="Questions, hypotheses, experiments and failures." copy="Research is shown as work in motion. Rejected mechanisms stay visible when they teach something useful." />
          <div className="research-list">
            {researchNotes.slice(0, 3).map(note => (
              <Link className="research-row" href={`/research/${note.slug}`} key={note.slug}>
                <div>
                  <h3>{note.title}</h3>
                  <p>{note.question}</p>
                </div>
                <span className="research-domain">{note.domain}</span>
                <StateTag state={note.state} />
              </Link>
            ))}
          </div>
          <Link className="text-link" href="/research">View research index →</Link>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell panel panel-pad">
          <div className="feature-split">
            <div>
              <p className="eyebrow">JOURNEY</p>
              <h2>How the way I build evolved.</h2>
              <p className="lede">Quality engineering taught me to distrust systems that cannot explain their state. That principle now shapes how I build automation, data and AI systems.</p>
              <Link className="text-link" href="/journey">View the journey →</Link>
            </div>
            <AbstractScene variant="peach" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell contact-panel">
          <div className="panel contact-copy">
            <p className="eyebrow">CONTACT</p>
            <h2>Build, test or discuss something difficult.</h2>
            <p className="lede">Engineering roles, applied-AI work, automation systems or a technical conversation about what is being built inside Aixion.</p>
          </div>
          <div className="panel contact-copy">
            <p className="eyebrow">FAST PATH</p>
            <h3>Recruiter or engineering lead?</h3>
            <p>Switch to Career view to translate system work into competencies without changing the underlying evidence.</p>
            <div className="button-row">
              <Link className="button" href="/about">Career snapshot →</Link>
              <Link className="button-secondary" href="/resume">Résumé</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
