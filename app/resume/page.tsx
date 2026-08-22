import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Career Snapshot",
  description: "A recruiter-focused summary of the engineering work behind Aixion Lab.",
};

export default function ResumePage() {
  return (
    <>
      <section className="page-hero">
        <div className="shell page-hero-grid">
          <div>
            <p className="eyebrow">AIXION LAB · CAREER SNAPSHOT</p>
            <h1>Quality engineering evolved into systems engineering.</h1>
            <p className="lede">A concise recruiter-facing translation of the work shown across Aixion Lab. The project evidence stays the same; this page makes the competencies easier to scan.</p>
          </div>
          <div className="panel meta-board">
            <div><span>Current direction</span><strong>QA · Automation · Applied AI</strong></div>
            <div><span>Flagship work</span><strong>TradeBot · Control Core</strong></div>
            <div><span>Working style</span><strong>Evidence-led systems</strong></div>
            <div><span>Full résumé PDF</span><strong>Publication pending</strong></div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell detail-grid">
          <article className="panel panel-pad">
            <p className="eyebrow">PROFILE</p>
            <h2>Engineering quality into the architecture.</h2>
            <p className="lede">Experience across manual and automated quality engineering expanded into APIs, software systems, real-time data, ML experimentation and autonomous-system governance.</p>
            <p>The common thread is reliability: explicit state, testable contracts, visible failure modes and evidence behind decisions.</p>
          </article>
          <article className="panel panel-pad">
            <p className="eyebrow">CORE COMPETENCIES</p>
            <div className="principles-grid">
              <div className="principle"><strong>Quality engineering</strong><p>Manual/automation QA, scenario design, regression thinking, failure analysis.</p></div>
              <div className="principle"><strong>Automation</strong><p>Selenium/Appium-style automation, workflow/RPA thinking, process reliability.</p></div>
              <div className="principle"><strong>Software systems</strong><p>Java, Python, APIs, service behavior, integration and architecture.</p></div>
              <div className="principle"><strong>Data & AI</strong><p>Real-time data, ML experimentation, evidence-bound autonomous systems.</p></div>
            </div>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <p className="eyebrow">FLAGSHIP WORK</p>
          <div className="detail-grid">
            <article className="detail-card">
              <h3>TradeBot</h3>
              <p>Real-time market-data integration, evidence-bound research, risk/governance boundaries, live observation and failure recovery.</p>
              <p><strong>Competencies:</strong> Python · WebSockets · APIs · testing · observability · ML research · system architecture.</p>
              <Link className="text-link" href="/systems/tradebot">Review TradeBot →</Link>
            </article>
            <article className="detail-card">
              <h3>Aixion Control Core</h3>
              <p>Governed orchestration across intent, context, agents, tools, policy, evidence and explicit human/system authority.</p>
              <p><strong>Competencies:</strong> agent orchestration · APIs · policy architecture · tool integration · state management · human-in-the-loop design.</p>
              <Link className="text-link" href="/systems/control-core">Review Control Core →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell panel panel-pad">
          <p className="eyebrow">NEXT STEP</p>
          <h2>Use the system pages as evidence, not just project names.</h2>
          <p className="lede">A downloadable role-specific résumé will be added once the final public version and exact contact links are frozen. Until then, this page intentionally avoids publishing stale or mismatched résumé files.</p>
        </div>
      </section>
    </>
  );
}
