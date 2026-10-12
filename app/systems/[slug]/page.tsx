import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialHeading, EditorialHero, ImageStory, SignalLine } from "@/components/editorial-content";
import { EvidenceDrawer } from "@/components/evidence-drawer";
import { CareerStrip, StateTag } from "@/components/ui";
import { systems } from "@/lib/site-data";

type EvidenceRecord = { type: string; label: string; state: string };
type EngineeringRecord = { title: string; body: string };

const detail: Record<string, {
  problem: string;
  challenge: string;
  built: string;
  outcome: string;
  engineering: EngineeringRecord[];
  evidence: EvidenceRecord[];
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
    outcome: "An MVP path focused on controlled autonomy rather than a generic chat interface.",
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
      { type: "PROMOTION", label: "An experiment must pass completeness and evidence gates before becoming a flagship case study", state: "GATED" },
      { type: "BOUNDARY", label: "No decorative dashboard screenshots without context", state: "ENFORCED" },
    ],
  },
};

const images: Record<string, { src: string; alt: string; stages: string[] }> = {
  tradebot: {
    src: "/images/aixion-editorial/systems-workbench.jpg",
    alt: "A systems engineering workstation with a network diagram on screen.",
    stages: ["Feed", "State", "Research", "Risk", "Human authority"],
  },
  "control-core": {
    src: "/images/aixion-editorial/hero-studio.jpg",
    alt: "A studio with a system flow drawn on glass.",
    stages: ["Intent", "Context", "Planning", "Tools", "Evidence", "Policy", "Human review"],
  },
  automation: {
    src: "/images/aixion-editorial/planning-studio.jpg",
    alt: "Technical workflow planning papers on a long worktable.",
    stages: ["Input", "Validate", "Process", "Recover", "Evidence"],
  },
  analytics: {
    src: "/images/aixion-editorial/research-desk.jpg",
    alt: "A research chart and notes on a desk.",
    stages: ["Question", "Source", "Quality", "Analysis", "Decision"],
  },
};

const tabs: Record<string, [string, string][]> = {
  tradebot: [["Overview", "overview"], ["Architecture", "architecture"], ["Engineering", "engineering"], ["Research", "research"], ["Evidence", "evidence"], ["Timeline", "timeline"]],
  "control-core": [["Overview", "overview"], ["Architecture", "architecture"], ["Capabilities", "capabilities"], ["MVP", "mvp"], ["Evidence", "evidence"], ["Roadmap", "roadmap"]],
  automation: [["Overview", "overview"], ["Workflow", "architecture"], ["Engineering", "engineering"], ["Evidence", "evidence"], ["Next gate", "roadmap"]],
  analytics: [["Overview", "overview"], ["Decision model", "architecture"], ["Engineering", "engineering"], ["Evidence", "evidence"], ["Next gate", "roadmap"]],
};

const systemsBySlug = new Map(systems.map((system) => [system.slug, system]));

export function generateStaticParams() {
  return systems.map((system) => ({ slug: system.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const system = systemsBySlug.get(slug);
  return system ? { title: system.name, description: system.descriptor } : {};
}

function SystemSpecificSection({ slug }: { slug: string }) {
  if (slug === "tradebot") {
    return (
      <section id="research" className="editorial-section editorial-section--compact">
        <div className="page-width">
          <EditorialHeading eyebrow="RESEARCH BOUNDARY" title="Research is a gated lifecycle, not a shortcut to authority." copy="The public page explains method without publishing proprietary strategy mechanics." />
          <div className="detail-grid">
            <article className="detail-card" data-reveal><p className="eyebrow">METHOD</p><h3>Observe → hypothesize → freeze → test</h3><p>Candidate logic is frozen before evaluation so results cannot silently rewrite the question being tested.</p></article>
            <article className="detail-card" data-reveal><p className="eyebrow">BOUNDARY</p><h3>Holdout and live observation stay separate</h3><p>Research evidence can support a decision to continue testing; it does not automatically grant execution authority.</p></article>
          </div>
          <div id="timeline" className="system-timeline" data-reveal>
            <div><span>DATA</span><strong>Feed health split into connection, freshness and subscription truth</strong></div>
            <div><span>RESEARCH</span><strong>Research candidates isolated behind explicit validation gates</strong></div>
            <div><span>LIVE</span><strong>Read-only observation used to expose failure paths before authority</strong></div>
          </div>
        </div>
      </section>
    );
  }

  if (slug === "control-core") {
    const capabilities = ["Intent routing", "Context assembly", "Planning", "Agent coordination", "Tool execution", "Policy boundaries", "Evidence capture", "Human approval"];
    return (
      <section id="capabilities" className="editorial-section editorial-section--cool">
        <div className="page-width">
          <EditorialHeading eyebrow="CONTROL CORE CAPABILITIES" title="The control plane is built from explicit capabilities." />
          <div className="content-grid">
            {capabilities.map((item, index) => <article className="content-card" key={item} data-reveal><span className="story-index">0{index + 1}</span><h3>{item}</h3><p>Designed as an inspectable stage rather than an invisible side effect.</p></article>)}
          </div>
          <div id="mvp" className="detail-card control-core-demo" data-reveal>
            <p className="eyebrow">ILLUSTRATIVE ARCHITECTURE TRACE</p>
            <h3>Intent → planner → approved tool → evidence → policy → human review</h3>
            <p>This sequence explains the proposed runtime model. It is a labelled architecture illustration, not production telemetry.</p>
          </div>
        </div>
      </section>
    );
  }

  return null;
}

export default async function SystemDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const system = systemsBySlug.get(slug);
  const spec = detail[slug];
  const visual = images[slug];
  if (!system || !spec || !visual) notFound();

  return (
    <>
      <section id="overview">
        <EditorialHero
          eyebrow={`${system.id} / ${system.domain}`}
          title={system.name}
          copy={system.descriptor}
          image={visual.src}
          imageAlt={visual.alt}
          scrollTarget="system-current-state"
        >
          <div className="system-hero-meta"><StateTag state={system.state} /><Link className="button button--light" href="#evidence">Review evidence <span aria-hidden="true">↓</span></Link></div>
        </EditorialHero>
      </section>

      <div className="system-subnav-wrap">
        <nav className="page-width system-subnav" aria-label={`${system.name} page sections`}>
          {tabs[slug].map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}
        </nav>
      </div>

      <section id="page-content" className="editorial-section editorial-section--compact">
        <div className="page-width">
          <dl id="system-current-state" className="system-facts" data-reveal>
            <div><dt>Current gate</dt><dd>{system.currentGate}</dd></div>
            <div><dt>Current focus</dt><dd>{system.currentFocus}</dd></div>
            <div><dt>Next gate</dt><dd>{system.nextGate}</dd></div>
          </dl>
          <div className="career-only"><CareerStrip skills={system.competencies} /></div>
        </div>
      </section>

      <section id="architecture" className="editorial-section">
        <ImageStory
          image={visual.src}
          imageAlt={visual.alt}
          eyebrow="PUBLIC ARCHITECTURE"
          title="How this system makes the difficult parts visible."
          href="#engineering"
          action="Read the engineering approach"
          className={slug === "tradebot" ? "visual-tradebot" : slug === "control-core" ? "visual-core" : `visual-${slug}`}
        >
          <p>{spec.challenge}</p>
          <p>{spec.built}</p>
        </ImageStory>
        <div className="page-width architecture-wrap" data-reveal>
          <p className="eyebrow">SYSTEM FLOW / PUBLIC MODEL</p>
          <SignalLine stages={visual.stages} />
        </div>
      </section>

      <section id="engineering" className="editorial-section editorial-section--cool">
        <div className="page-width">
          <EditorialHeading eyebrow="ENGINEERING STORY" title="Problem → challenge → build → outcome" copy="The work is explained through its constraints and evidence, not a technology-logo wall." />
          <div className="detail-grid impact-grid">
            <article className="detail-card" data-reveal><p className="eyebrow">PROBLEM</p><h3>What makes this difficult?</h3><p>{spec.problem}</p></article>
            <article className="detail-card" data-reveal><p className="eyebrow">CHALLENGE</p><h3>What must remain controlled?</h3><p>{spec.challenge}</p></article>
            <article className="detail-card" data-reveal><p className="eyebrow">WHAT EXISTS</p><h3>The system response</h3><p>{spec.built}</p></article>
            <article className="detail-card" data-reveal><p className="eyebrow">OUTCOME</p><h3>What this enables</h3><p>{spec.outcome}</p></article>
          </div>
          <div className="detail-grid engineering-grid">
            {spec.engineering.map((item, index) => <article className="detail-card" key={item.title} data-reveal><span className="story-index">0{index + 1}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}
          </div>
        </div>
      </section>

      <SystemSpecificSection slug={slug} />

      <section id="evidence" className="editorial-section editorial-section--compact">
        <div className="page-width">
          <EditorialHeading eyebrow="EVIDENCE / PUBLIC BOUNDARY" title="Claims stay bounded by what can be shown." copy="Proof records are public-safe summaries. Sensitive logic and operational data stay outside the site." />
          <div className="evidence-list">
            {spec.evidence.map((item) => (
              <div className="evidence-row" key={item.label} data-reveal>
                <span>{item.type}</span><strong>{item.label}</strong>
                <div className="evidence-actions"><StateTag state={item.state} /><EvidenceDrawer title={`${system.name} / ${item.label}`} type={item.type} result={item.state} scope={item.label} authority={item.type === "BOUNDARY" ? "Public/private boundary" : "Public-safe evidence summary"} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="roadmap" className="editorial-section editorial-section--dark">
        <div className="page-width next-gate" data-reveal>
          <div><p className="eyebrow eyebrow--light">NEXT GATE</p><h2>{system.nextGate}</h2><p>{system.currentFocus}</p></div>
          <Link href="/systems" className="button button--light">All systems <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </>
  );
}
