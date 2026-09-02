import Link from "next/link";
import { systems } from "@/lib/site-data";
import labActivity from "@/content/lab-activity.json";
import { CareerStrip, ProgressLane, SectionHeading, StateTag, SystemCard } from "@/components/ui";
import { AixionSignal, SystemVisual } from "@/components/system-visuals";
import { ObservableStateField } from "@/components/observable-state-field";

export default function HomePage() {
  const tradebot = systems[0];
  const activeWork = labActivity.active[0];
  const latestActivity = labActivity.entries[0];

  return (
    <div className="observable-home">
      <section className="observable-hero" data-reveal="hero">
        <div className="observable-hero-grid shell">
          <div className="observable-copy">
            <p className="eyebrow">AIXION LAB · THE SYSTEM IS EXPLAINING ITSELF</p>
            <h1>Systems should be able to explain their state, their evidence and their limits.</h1>
            <p className="lede">A living engineering lab where applied intelligence becomes real systems through explicit validation, evidence and authority boundaries.</p>
            <p className="hero-philosophy">The visual field is public-state driven: work that is building remains incomplete, validation accumulates evidence, and rejected research remains visible instead of disappearing.</p>
            <div className="hero-attribution">
              <strong>Built by Ram</strong>
              <span>Quality Engineering · Automation · Software · Data · Applied AI</span>
              <Link className="hero-career-link" href="/resume">Hire Ram · Recruiter fast path →</Link>
            </div>
            <div className="button-row hero-actions-visible">
              <Link className="button" href="/systems">Explore systems →</Link>
              <Link className="button-secondary" href="/collaborate">Work with Aixion Lab</Link>
            </div>
            <AixionSignal compact />
          </div>
          <ObservableStateField />
        </div>

        <div className="panel pulse-preview shell" data-reveal="pulse-preview">
          <div className="pulse-head">
            <div>
              <p className="eyebrow">AIXION PULSE · PUBLIC STATE</p>
              <h2>Current system state, evidence and next gates.</h2>
            </div>
            <p>Curated public-safe state · no arbitrary completion percentages</p>
          </div>
          <ProgressLane label="TradeBot" stage="VALIDATING" />
          <ProgressLane label="Control Core" stage="BUILDING" />
          <ProgressLane label="Automation" stage="BUILDING" />
          <ProgressLane label="Analytics Lab" stage="BUILDING" />
          <div className="home-worklog-strip" aria-label="Latest Aixion Lab work">
            <div>
              <span className="system-id">WORKING NOW · {activeWork.date}</span>
              <strong>{activeWork.title}</strong>
              <p>{activeWork.summary}</p>
            </div>
            <StateTag state={activeWork.state} />
          </div>
          <div className="home-worklog-strip home-worklog-strip--latest">
            <div>
              <span className="system-id">LATEST VALIDATED ACTIVITY · {latestActivity.date}</span>
              <strong>{latestActivity.title}</strong>
              <p>{latestActivity.summary}</p>
            </div>
            <StateTag state={latestActivity.state} />
          </div>
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
            <p className="competency-bridge">Demonstrates: {tradebot.competencies.slice(0, 5).join(" · ")}</p>
            <div className="button-row"><StateTag state={tradebot.state} /><Link className="button-secondary" href="/systems/tradebot#evidence">Evidence →</Link></div>
            <CareerStrip skills={tradebot.competencies} />
            <Link className="text-link" href="/systems/tradebot">Explore the flagship system →</Link>
          </article>
          <SystemVisual kind="tradebot" />
        </div>
      </section>

      <section className="section-tight home-deeper" data-reveal="deeper-paths">
        <div className="shell">
          <SectionHeading eyebrow="GO DEEPER" title="The rest of the lab lives on dedicated pages." copy="Home stops here by design. The deeper evidence, research and engineering progression remain available without duplicating them into the landing page." />
          <nav className="home-deeper-rail" aria-label="Deeper Aixion Lab paths">
            <Link href="/systems/control-core"><span>CONTROL CORE</span><strong>Governed autonomy and explicit authority →</strong></Link>
            <Link href="/research"><span>RESEARCH</span><strong>Questions, frozen hypotheses and rejected work →</strong></Link>
            <Link href="/journey"><span>JOURNEY</span><strong>How quality engineering evolved into systems thinking →</strong></Link>
          </nav>
        </div>
      </section>

      <section className="section" data-reveal="contact">
        <div className="shell">
          <SectionHeading eyebrow="TWO WAYS TO WORK TOGETHER" title="Hire the engineer, or collaborate with the lab." copy="Aixion Lab is an independent engineering lab led by Ram—not a claim of a staffed agency. The same evidence supports two different opportunity paths." />
          <div className="contact-panel">
            <div className="panel contact-copy contact-copy--career">
              <p className="eyebrow">HIRE RAM</p>
              <h3>Looking for an engineer who can bridge quality, automation, software, data and applied AI?</h3>
              <p>The recruiter path translates the systems into competencies and career evidence without changing or inflating the underlying work.</p>
              <div className="button-row">
                <Link className="button" href="/resume">Career snapshot →</Link>
                <a className="button-secondary" href="https://www.linkedin.com/in/ram-golladi" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              </div>
            </div>
            <div className="panel contact-copy contact-copy--conversation">
              <p className="eyebrow">WORK WITH AIXION LAB</p>
              <h3>Have a bounded engineering problem worth building or validating properly?</h3>
              <p>Explore selective collaboration around QA architecture, workflow automation, AI / agent validation, data systems and evidence-led prototypes.</p>
              <div className="button-row">
                <Link className="button" href="/collaborate">Collaboration path →</Link>
                <Link className="button-secondary" href="/about#contact">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
