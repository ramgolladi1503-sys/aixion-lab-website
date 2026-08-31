import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { systems } from "@/lib/site-data";
import { EvidenceDrawer } from "@/components/evidence-drawer";
import { CareerStrip, SectionHeading, StateTag } from "@/components/ui";
import { AixionSignal, VisualForSystem } from "@/components/system-visuals";

const detail: Record<string, {
  problem: string;
  challenge: string;
  built: string;
  outcome: string;
  engineering: { title: string; body: string }[];
  evidence: { type: string; label: string; state: string }[];
}> = {
  tradebot: {
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
      { type: "DEMO", label: "Public site uses clearly labelled architecture demonstrations", state: "DEMO" },
      { type: "BOUNDARY", label: "Demo traces are never presented as production telemetry", state: "ENFORCED" },
    ],
  },
  automation: {
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

const tabs: Record<string, [string, string][]> = {
  tradebot: [["Overview", "overview"], ["Architecture", "architecture"], ["Engineering", "engineering"], ["Research", "research"], ["Evidence", "evidence"], ["Timeline", "timeline"]],
  "control-core": [["Overview", "overview"], ["Architecture", "architecture"], ["Capabilities", "capabilities"], ["MVP", "mvp"], ["Evidence", "evidence"], ["Roadmap", "roadmap"]],
  automation: [["Overview", "overview"], ["Workflow", "architecture"], ["Engineering", "engineering"], ["Evidence", "evidence"], ["Next gate", "roadmap"]],
  analytics: [["Overview", "overview"], ["Decision model", "architecture"], ["Engineering", "engineering"], ["Evidence", "evidence"], ["Next gate", "roadmap"]],
};

export function generateStaticParams() { return systems.map(system => ({ slug: system.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const system = systems.find(item => item.slug === slug);
  return system ? { title: system.name, description: system.descriptor } : {};
}

function SystemHeroSummary({ system }: { system: (typeof systems)[number] }) {
  return (
    <aside className={`system-hero-summary summary-${system.accent}`} aria-label={`${system.name} system snapshot`}>
      <div className="system-summary-head">
        <p className="eyebrow">SYSTEM SNAPSHOT · {system.id}</p>
        <StateTag state={system.state} />
      </div>
      <h2>{system.currentFocus}</h2>
      <dl className="system-summary-grid">
        <div><dt>Domain</dt><dd>{system.domain}</dd></div>
        <div><dt>Current gate</dt><dd>{system.currentGate}</dd></div>
        <div><dt>Next gate</dt><dd>{system.nextGate}</dd></div>
        <div><dt>Public boundary</dt><dd>Architecture, method and evidence summaries only.</dd></div>
      </dl>
      <div className="system-summary-skills" aria-label="Key competencies">
        {system.competencies.slice(0, 5).map(skill => <span key={skill}>{skill}</span>)}
      </div>
    </aside>
  );
}

function FlagshipSpecific({ slug }: { slug: string }) {
  if (slug === "tradebot") return (
    <>
      <section className="section-tight anchor-section" id="research">
        <div className="shell panel panel-pad">
          <SectionHeading eyebrow="RESEARCH" title="Research is a gated lifecycle, not a shortcut to authority." copy="The public page explains method without publishing proprietary strategy mechanics." />
          <AixionSignal />
          <div className="detail-grid">
            <div className="detail-card"><p className="eyebrow">METHOD</p><h3>Observe → hypothesize → freeze → test</h3><p>Candidate logic is frozen before evaluation so results cannot silently rewrite the question being tested.</p></div>
            <div className="detail-card"><p className="eyebrow">BOUNDARY</p><h3>Holdout and live observation stay separate</h3><p>Research evidence can support a decision to continue testing; it does not automatically grant execution authority.</p></div>
          </div>
        </div>
      </section>
      <section className="section-tight anchor-section" id="timeline">
        <div className="shell">
          <SectionHeading eyebrow="TIMELINE" title="Milestones that changed the system" copy="Milestones are engineering decisions and evidence changes, not raw commit activity." />
          <div className="evidence-list">
            <div className="evidence-row"><span>DATA</span><strong>Feed health split into connection, freshness and subscription truth</strong><StateTag state="ENGINEERED" /></div>
            <div className="evidence-row"><span>RESEARCH</span><strong>Research candidates isolated behind explicit validation gates</strong><StateTag state="GOVERNED" /></div>
            <div className="evidence-row"><span>LIVE</span><strong>Read-only observation used to expose failure paths before authority</strong><StateTag state="EVIDENCE" /></div>
          </div>
        </div>
      </section>
    </>
  );

  if (slug === "control-core") return (
    <>
      <section className="section-tight anchor-section" id="capabilities">
        <div className="shell">
          <SectionHeading eyebrow="CAPABILITIES" title="The control plane is built from explicit capabilities." />
          <div className="system-grid">
            {["Intent routing", "Context assembly", "Planning", "Agent coordination", "Tool execution", "Policy boundaries", "Evidence capture", "Human approval"].map(item => <div className="detail-card" key={item}><h3>{item}</h3><p>Designed as an inspectable stage rather than an invisible side effect.</p></div>)}
          </div>
        </div>
      </section>
      <section className="section-tight anchor-section" id="mvp">
        <div className="shell panel panel-pad">
          <SectionHeading eyebrow="INTERACTIVE ARCHITECTURE DEMO" title="A labelled execution trace, not fake production telemetry." />
          <div className="trace-preview trace-preview--page">
            <span>10:42:11</span><b>INTENT</b><em>research current condition</em>
            <span>10:42:14</span><b>PLANNER</b><em>tasks decomposed</em>
            <span>10:42:19</span><b>TOOL</b><em>approved source queried</em>
            <span>10:42:22</span><b>EVIDENCE</b><em>result captured</em>
            <span>10:42:24</span><b>POLICY</b><em>review required</em>
            <span>10:42:26</span><b>HUMAN</b><em>awaiting authority</em>
          </div>
        </div>
      </section>
    </>
  );

  return null;
}

export default async function SystemDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const system = systems.find(item => item.slug === slug);
  const spec = detail[slug];
  if (!system || !spec) notFound();

  return (
    <>
      <section className="page-hero anchor-section" id="overview">
        <div className="shell page-hero-grid">
          <div>
            <p className="eyebrow">{system.id} · {system.domain}</p>
            <h1>{system.name}</h1>
            <p className="lede">{system.descriptor}</p>
            <div className="button-row"><StateTag state={system.state} /><Link className="button-secondary" href="#evidence">View evidence ↓</Link></div>
            <CareerStrip skills={system.competencies} />
          </div>
          <SystemHeroSummary system={system} />
        </div>
      </section>

      <div className="system-subnav-wrap">
        <nav className="shell system-subnav" aria-label={`${system.name} page sections`}>
          {tabs[slug].map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}
        </nav>
      </div>

      <section className="section-tight anchor-section" id="architecture">
        <div className="shell feature-split">
          <div className="panel feature-copy">
            <p className="eyebrow">PUBLIC ARCHITECTURE</p>
            <h2>How the system makes state visible.</h2>
            <p>The visual model is system-specific: it exposes boundaries and information flow without publishing private implementation mechanics.</p>
            <p><strong>Current focus:</strong> {system.currentFocus}</p>
            <p><strong>Next gate:</strong> {system.nextGate}</p>
          </div>
          <VisualForSystem system={system} />
        </div>
      </section>

      <section className="section anchor-section" id="engineering">
        <div className="shell">
          <SectionHeading eyebrow="IMPACT FRAME" title="Problem → challenge → build → outcome" copy="Engineering pages lead with the problem and proof, not a technology-logo wall." />
          <div className="detail-grid">
            <div className="detail-card"><p className="eyebrow">PROBLEM</p><h3>What makes this difficult?</h3><p>{spec.problem}</p></div>
            <div className="detail-card"><p className="eyebrow">ENGINEERING CHALLENGE</p><h3>What must remain controlled?</h3><p>{spec.challenge}</p></div>
            <div className="detail-card"><p className="eyebrow">WHAT I BUILT</p><h3>The system response</h3><p>{spec.built}</p></div>
            <div className="detail-card"><p className="eyebrow">OUTCOME</p><h3>What exists now</h3><p>{spec.outcome}</p></div>
          </div>
          <div className="system-grid section-inline">
            {spec.engineering.map(item => <article className="detail-card" key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}
          </div>
        </div>
      </section>

      <FlagshipSpecific slug={slug} />

      <section className="section anchor-section" id="evidence">
        <div className="shell panel panel-pad">
          <SectionHeading eyebrow="EVIDENCE" title="Claims stay bounded by what can be shown." copy="Proof records are public-safe summaries. Sensitive logic and operational data stay outside the site." />
          <div className="evidence-list">
            {spec.evidence.map(item => (
              <div className="evidence-row" key={item.label}>
                <span>{item.type}</span><strong>{item.label}</strong>
                <div className="evidence-actions"><StateTag state={item.state} /><EvidenceDrawer title={`${system.name} / ${item.label}`} type={item.type} result={item.state} scope={item.label} authority={item.type === "BOUNDARY" ? "Public/private boundary" : "Public-safe evidence summary"} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight anchor-section" id="roadmap">
        <div className="shell detail-grid">
          <div className="detail-card"><p className="eyebrow">CURRENT FOCUS</p><h3>{system.currentFocus}</h3></div>
          <div className="detail-card"><p className="eyebrow">NEXT GATE</p><h3>{system.nextGate}</h3></div>
        </div>
      </section>
    </>
  );
}
