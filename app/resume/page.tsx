import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Professional Profile",
  description: "A recruiter-focused summary of the engineering work behind Aixion Lab.",
};

const competencies = [
  ["Quality engineering", "Manual and automated QA, scenario design, regression thinking, failure analysis, release confidence."],
  ["Automation", "Workflow automation, test automation, repeatable execution, traceability and recovery behaviour."],
  ["Software systems", "Java, Python, APIs, service behaviour, integrations, state, observability and system architecture."],
  ["Data & applied AI", "Real-time data, ML experimentation, governed automation, evidence-aware decision systems."],
] as const;

export default function ResumePage() {
  return (
    <main className="profile-editorial-page">
      <section className="profile-hero">
        <p className="editorial-kicker">PROFESSIONAL PROFILE</p>
        <div className="profile-hero-grid">
          <div>
            <h1>Quality engineering evolved into systems engineering.</h1>
            <p className="profile-hero-body">A recruiter-facing translation of the work shown across Aixion Lab: reliability, automation, software systems, real-time data and applied AI — with evidence behind the claims.</p>
          </div>
          <dl className="profile-meta">
            <div><dt>Current direction</dt><dd>QA · Automation · Applied AI</dd></div>
            <div><dt>Flagship work</dt><dd>TradeBot · Aixion Control Tower</dd></div>
            <div><dt>Working style</dt><dd>Evidence-led systems</dd></div>
          </dl>
        </div>
      </section>

      <section className="profile-summary-grid">
        <article>
          <p className="editorial-kicker">PROFILE</p>
          <h2>Engineering quality into the architecture.</h2>
        </article>
        <article className="profile-body-copy">
          <p>Experience across manual and automated quality engineering expanded into APIs, software systems, real-time data, ML experimentation and governed AI-assisted workflows.</p>
          <p>The common thread is reliability: explicit state, testable contracts, visible failure modes and evidence behind consequential decisions.</p>
        </article>
      </section>

      <section className="profile-competencies">
        <div className="profile-section-heading">
          <p className="editorial-kicker">CORE COMPETENCIES</p>
          <h2>What the work demonstrates.</h2>
        </div>
        <div className="profile-competency-grid">
          {competencies.map(([title, body]) => (
            <article key={title}><h3>{title}</h3><p>{body}</p></article>
          ))}
        </div>
      </section>

      <section className="profile-work">
        <p className="editorial-kicker">FLAGSHIP WORK</p>
        <div className="profile-work-grid">
          <article>
            <h2>TradeBot</h2>
            <p>Real-time market-data integration, evidence-bound research, risk boundaries, live observation, failure recovery and human-controlled decision support.</p>
            <p><strong>Demonstrates:</strong> Python · WebSockets · APIs · testing · observability · ML research · system architecture.</p>
            <Link href="/systems/tradebot">Review TradeBot →</Link>
          </article>
          <article>
            <h2>Aixion Control Tower</h2>
            <p>Governed orchestration across intent, context, agents, tools, policy, evidence and explicit human/system authority.</p>
            <p><strong>Demonstrates:</strong> agent orchestration · APIs · policy architecture · tool integration · state management · human-in-the-loop design.</p>
            <Link href="/systems/control-tower">Review Control Tower →</Link>
          </article>
        </div>
      </section>

      <section className="profile-closing">
        <div>
          <p className="editorial-kicker">NEXT STEP</p>
          <h2>Use the system pages as evidence, not just project names.</h2>
        </div>
        <div>
          <p>The public profile stays concise; the system and research pages carry the technical depth. A role-specific résumé can then point back to evidence instead of relying on project-name claims alone.</p>
          <Link href="/collaborate">Discuss a role →</Link>
        </div>
      </section>
    </main>
  );
}
