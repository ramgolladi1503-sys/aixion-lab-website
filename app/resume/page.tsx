import type { Metadata } from "next";
import Link from "next/link";
import { PrintResumeButton } from "@/components/print-resume-button";

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
            <div className="button-row resume-actions">
              <PrintResumeButton />
              <a className="button-secondary" href="https://www.linkedin.com/in/ram-golladi" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a className="button-secondary" href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer">GitHub ↗</a>
            </div>
          </div>
          <div className="panel meta-board">
            <div><span>Current direction</span><strong>QA · Automation · Applied AI</strong></div>
            <div><span>Flagship work</span><strong>TradeBot · Control Core</strong></div>
            <div><span>Public case studies</span><strong>MCP Shield · Algotradify</strong></div>
            <div><span>Public résumé</span><strong>Live web version</strong></div>
            <div><span>Working style</span><strong>Evidence-led systems</strong></div>
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
              <div className="principle"><strong>Automation</strong><p>Test and workflow automation, policy-bound tool execution, failure-safe process design.</p></div>
              <div className="principle"><strong>Software systems</strong><p>Java, Python, APIs, service behavior, integration and architecture.</p></div>
              <div className="principle"><strong>Data & AI</strong><p>Real-time data, operational analytics, ML experimentation and evidence-bound autonomous systems.</p></div>
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
        <div className="shell">
          <p className="eyebrow">PUBLIC IMPLEMENTATION EVIDENCE</p>
          <div className="detail-grid">
            <article className="detail-card">
              <h3>MCP Shield</h3>
              <p>Local-first runtime security gateway for AI agents and MCP tools with deterministic policy decisions, interception, redacted audit trails, attack-corpus testing and rollback-safe configuration.</p>
              <a className="text-link" href="https://github.com/ramgolladi1503-sys/MCP" target="_blank" rel="noreferrer">Review public repository ↗</a>
            </article>
            <article className="detail-card">
              <h3>Algotradify</h3>
              <p>FastAPI and React operator system for candidate truth, readiness, lifecycle evidence, replay drilldowns, outcome analytics and execution-safety visibility.</p>
              <a className="text-link" href="https://github.com/ramgolladi1503-sys/algotradify" target="_blank" rel="noreferrer">Review public repository ↗</a>
            </article>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell panel panel-pad">
          <p className="eyebrow">RECRUITER HANDOFF</p>
          <h2>Review the evidence, then take a copy with you.</h2>
          <p className="lede">This page is the current public career snapshot. Use Print / Save PDF to export it from any modern browser; the system pages and public repositories remain the deeper evidence source behind the summary.</p>
          <div className="button-row resume-actions">
            <PrintResumeButton />
            <Link className="button" href="/systems">Review systems →</Link>
            <a className="button-secondary" href="https://www.linkedin.com/in/ram-golladi" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
        </div>
      </section>
    </>
  );
}
