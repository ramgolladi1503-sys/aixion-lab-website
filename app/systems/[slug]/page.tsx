import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { systems } from "@/lib/site-data";
import { AbstractScene, ArchitectureFlow, CareerStrip, SectionHeading, StateTag } from "@/components/ui";

const detail: Record<string, {
  architecture: string[];
  problem: string;
  challenge: string;
  built: string;
  outcome: string;
  engineering: { title: string; body: string }[];
  evidence: { type: string; label: string; state: string }[];
}> = {
  tradebot: {
    architecture: ["Market Data", "Market State", "Signal / Research", "Risk", "Governance", "Human Authority"],
    problem: "Intraday market signals are noisy, while live data can fail in ways that a simple connected/disconnected flag cannot explain.",
    challenge: "Separate data truth, research output, risk and execution authority while preserving reproducible evidence.",
    built: "A governed market-intelligence and validation system spanning real-time data, research candidates, risk controls and read-only/live observation.",
    outcome: "A platform capable of structured research, evidence capture and bounded decision support without publishing proprietary signal logic.",
    engineering: [
      { title: "Live data integrity", body: "Connection state, freshness, subscription truth and evidence state are treated as different concerns rather than one green light." },
      { title: "Research authority", body: "Promising research does not silently become trading authority. Candidates remain isolated until explicit validation and governance gates pass." },
      { title: "Human authority", body: "Evidence and decision support can be automated while execution authority remains an explicit boundary." },
    ],
    evidence: [
      { type: "METHOD", label: "Frozen-hypothesis research and holdout separation", state: "PUBLIC SUMMARY" },
      { type: "LIVE", label: "Read-only live observation and failure-recovery work", state: "PUBLIC SUMMARY" },
      { type: "BOUNDARY", label: "Strategy parameters and proprietary edge remain private", state: "ENFORCED" },
    ],
  },
  "control-core": {
    architecture: ["Intent", "Context", "Planner", "Agents", "Tools", "Evidence", "Policy / Human"],
    problem: "Useful agent systems can still become unreliable when context, tools, policy and authority are implicit.",
    challenge: "Coordinate autonomous capabilities while keeping execution observable, policy-bound and reviewable.",
    built: "An orchestration architecture for intent routing, context assembly, planning, agents, tool execution, evidence capture and explicit approval boundaries.",
    outcome: "A major MVP path focused on controlled autonomy rather than a generic chat interface.",
    engineering: [
      { title: "Orchestration", body: "Intent is decomposed into explicit stages so the system can explain what it is doing and why." },
      { title: "Tool boundaries", body: "Tools are treated as governed capabilities rather than invisible side effects of an agent response." },
      { title: "Evidence before authority", body: "Execution traces, policy checks and evidence are first-class parts of the architecture." },
    ],
    evidence: [
      { type: "MVP", label: "Architecture and runtime implementation in active development", state: "BUILDING" },
      { type: "DEMO", label: "Public site will use clearly labelled architecture demonstrations", state: "PLANNED" },
      { type: "BOUNDARY", label: "Demo traces will never be presented as production telemetry", state: "ENFORCED" },
    ],
  },
  automation: {
    architecture: ["Trigger", "Capture", "Validate", "Process", "Act", "Report"],
    problem: "Operational workflows often repeat manual work while making failure handling and auditability hard to see.",
    challenge: "Automate repetitive work without turning failures, retries and state transitions into invisible behavior.",
    built: "Reusable workflow and RPA patterns shaped by quality-engineering principles: explicit inputs, validation, retries, evidence and reporting.",
    outcome: "A growing automation system family that can become public case studies as individual workflows mature.",
    engineering: [
      { title: "Observable workflow state", body: "Each stage should explain whether it is waiting, running, retrying, blocked or complete." },
      { title: "Failure handling", body: "Retries and recovery belong in the workflow design rather than being manual cleanup after the fact." },
      { title: "QA as architecture", body: "Validation is designed into automation paths instead of being added only after implementation." },
    ],
    evidence: [
      { type: "BUILD", label: "Workflow engine and RPA case-study structure", state: "BUILDING" },
      { type: "CASE STUDY", label: "Detailed public evidence added only after an end-to-end workflow is frozen", state: "GATED" },
      { type: "BOUNDARY", label: "No fabricated time-saving or ROI metrics", state: "ENFORCED" },
    ],
  },
  analytics: {
    architecture: ["Question", "Data", "Transform", "Model / Logic", "Visualize", "Insight", "Validate"],
    problem: "Dashboards become decoration when the underlying question, data quality and decision path are not explicit.",
    challenge: "Turn operational data into views that support a specific decision and can explain how each insight was produced.",
    built: "A research area for Tableau, data-quality and operational analytics work that will promote only complete, evidence-backed case studies.",
    outcome: "A place to show analytical reasoning without padding the portfolio with disconnected visualizations.",
    engineering: [
      { title: "Question first", body: "Every dashboard starts with the decision or question it needs to support." },
      { title: "Data quality", body: "Source assumptions, transformations and missing-data behavior are part of the story." },
      { title: "Explain the insight", body: "Visual polish is useful only when the visitor can understand what changed and why it matters." },
    ],
    evidence: [
      { type: "RESEARCH", label: "Analytics and Tableau experiments are being selected for complete case studies", state: "RESEARCH" },
      { type: "PROMOTION", label: "One experiment must pass completeness and evidence gates before becoming a flagship case study", state: "GATED" },
      { type: "BOUNDARY", label: "No decorative dashboard screenshots without context", state: "ENFORCED" },
    ],
  },
};

export function generateStaticParams() {
  return systems.map(system => ({ slug: system.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const system = systems.find(item => item.slug === slug);
  if (!system) return {};
  return { title: system.name, description: system.descriptor };
}

export default async function SystemDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const system = systems.find(item => item.slug === slug);
  const spec = detail[slug];
  if (!system || !spec) notFound();

  return (
    <>
      <section className="page-hero">
        <div className="shell page-hero-grid">
          <div>
            <p className="eyebrow">{system.id} · {system.domain}</p>
            <h1>{system.name}</h1>
            <p className="lede">{system.descriptor}</p>
            <div className="button-row">
              <StateTag state={system.state} />
              <Link className="button-secondary" href="#evidence">View evidence ↓</Link>
            </div>
            <CareerStrip skills={system.competencies} />
          </div>
          <AbstractScene variant={system.accent} />
        </div>
      </section>

      <section className="section-tight">
        <div className="shell panel panel-pad">
          <p className="eyebrow">PUBLIC ARCHITECTURE</p>
          <ArchitectureFlow nodes={spec.architecture} />
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading eyebrow="IMPACT FRAME" title="Problem → engineering challenge → build → outcome" copy="The point is not to lead with a technology stack. The page explains the engineering problem first, then shows what was built and what the current result actually supports." />
          <div className="detail-grid">
            <div className="detail-card"><p className="eyebrow">PROBLEM</p><h3>What makes this difficult?</h3><p>{spec.problem}</p></div>
            <div className="detail-card"><p className="eyebrow">ENGINEERING CHALLENGE</p><h3>What has to be controlled?</h3><p>{spec.challenge}</p></div>
            <div className="detail-card"><p className="eyebrow">WHAT I BUILT</p><h3>The system response</h3><p>{spec.built}</p></div>
            <div className="detail-card"><p className="eyebrow">OUTCOME</p><h3>What exists now</h3><p>{spec.outcome}</p></div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell">
          <SectionHeading eyebrow="ENGINEERING" title="The decisions underneath the interface" />
          <div className="system-grid">
            {spec.engineering.map(item => (
              <article className="detail-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="evidence">
        <div className="shell panel panel-pad">
          <SectionHeading eyebrow="EVIDENCE" title="Claims stay bounded by what can be shown." copy="The public site exposes methods, milestones and sanitized proof only. Private logic, credentials and sensitive operational evidence stay outside the website." />
          <div className="evidence-list">
            {spec.evidence.map(item => (
              <div className="evidence-row" key={item.label}>
                <span>{item.type}</span>
                <strong>{item.label}</strong>
                <StateTag state={item.state} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell detail-grid">
          <div className="detail-card">
            <p className="eyebrow">CURRENT FOCUS</p>
            <h3>{system.currentFocus}</h3>
          </div>
          <div className="detail-card">
            <p className="eyebrow">NEXT GATE</p>
            <h3>{system.nextGate}</h3>
          </div>
        </div>
      </section>
    </>
  );
}
