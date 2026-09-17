import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Professional Profile",
  description: "A recruiter-focused summary of the engineering work behind Aixion Lab.",
};

const competencies = [
  ["Quality engineering", "Manual and automated QA, scenario design, regression thinking, failure analysis and release confidence."],
  ["Automation", "Workflow automation, test automation, repeatable execution, traceability and recovery behaviour."],
  ["Software systems", "Java, Python, APIs, service behaviour, integrations, state, observability and architecture."],
  ["Data & applied AI", "Real-time data, ML experimentation, governed automation and evidence-aware decision systems."],
] as const;

const experience = [
  ["IBM", "Quality engineering, automation and systems work"],
  ["BMO project", "Banking-domain quality and automation experience"],
  ["Earlier", "Manual QA, automation and engineering foundations"],
] as const;

export default function ResumePage() {
  return (
    <main className="mock-profile-page">
      <section className="mock-profile-hero">
        <div>
          <p className="mock-kicker">PROFESSIONAL PROFILE</p>
          <h1>Quality engineering evolved into systems engineering.</h1>
          <p className="mock-profile-lede">A recruiter-facing view of the work across quality, automation, software systems, real-time data and applied AI — with evidence behind the claims.</p>
        </div>
        <dl className="mock-profile-meta">
          <div><dt>Current direction</dt><dd>QA · Automation · Applied AI</dd></div>
          <div><dt>Flagship work</dt><dd>TradeBot · Aixion Control Tower</dd></div>
          <div><dt>Working style</dt><dd>Evidence-led systems</dd></div>
        </dl>
      </section>

      <section className="mock-profile-competencies">
        <div className="mock-section-title"><p className="mock-kicker">CORE COMPETENCIES</p><h2>What the work demonstrates.</h2></div>
        <div className="mock-competency-grid">
          {competencies.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}
        </div>
      </section>

      <section className="mock-profile-experience">
        <div className="mock-section-title"><p className="mock-kicker">EXPERIENCE HIGHLIGHTS</p><h2>Engineering context behind the lab.</h2></div>
        <div className="mock-experience-grid">
          {experience.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}
        </div>
      </section>

      <section className="mock-profile-work">
        <div className="mock-section-title"><p className="mock-kicker">FLAGSHIP WORK</p><h2>Where the capabilities become visible.</h2></div>
        <div className="mock-profile-work-grid">
          <article><h3>TradeBot</h3><p>Real-time market-data integration, evidence-bound research, risk boundaries, live observation, failure recovery and human-controlled decision support.</p><Link href="/systems/tradebot">Review TradeBot →</Link></article>
          <article><h3>Aixion Control Tower</h3><p>Governed orchestration across intent, context, agents, tools, policy, evidence and explicit human/system authority.</p><Link href="/systems/control-tower">Review Control Tower →</Link></article>
        </div>
      </section>

      <section className="mock-profile-next">
        <div><p className="mock-kicker">NEXT STEP</p><h2>Follow the evidence.</h2></div>
        <div><Link href="/systems/tradebot">TradeBot →</Link><Link href="/systems/control-tower">Control Tower →</Link><Link href="/research">Research →</Link><Link href="/collaborate">Discuss a role →</Link></div>
      </section>
    </main>
  );
}
