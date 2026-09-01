import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { researchNotes } from "@/lib/site-data";
import { SectionHeading, StateTag } from "@/components/ui";

const researchDetail: Record<string, {
  why: string;
  observation: string;
  hypothesis: string;
  method: string[];
  boundaries: string[];
  result: string;
  next: string;
}> = {
  "opening-session-market-structure": {
    why: "The first minutes of a session can contain sharp repricing, but a useful explanation needs to separate genuine structural diffusion from hindsight storytelling.",
    observation: "Early movement appears alongside changing constituent breadth, derivatives behavior and option microstructure. The public question is whether those interactions recur before the outcome is known.",
    hypothesis: "A measurable combination of cross-market structure may contain repeatable information during the opening window.",
    method: ["Define an outcome-blind observation window", "Freeze candidate mechanisms before reading the outcome", "Separate development and later evaluation", "Retain failed mechanisms", "Use live observation only after the research state is explicit"],
    boundaries: ["No proprietary signal parameters", "No profitability or expected-return claims", "No future-data leakage", "No live execution authority implied by a research result"],
    result: "Active validation. The public site reports methodology and state, not proprietary entry logic.",
    next: "Continue evidence-bound validation and publish only a sanitized conclusion when the study reaches a stable decision.",
  },
  "rec-md-structural-interaction": {
    why: "Pattern descriptions are easy to overfit after seeing what happened. The research question is whether the structure exists before outcome knowledge is allowed in.",
    observation: "Repeated market-state interactions can look compelling visually even when they do not survive a governed producer/evidence boundary.",
    hypothesis: "A frozen structural interaction may improve candidate quality if it survives exact producer authority, recurrence and holdout checks.",
    method: ["Freeze the mechanism", "Map exact producer authority", "Evaluate only admissible real-corpus candidates", "Reject unsupported producer assumptions", "Preserve the frozen hypothesis if authority is missing"],
    boundaries: ["No invented producer", "No backfilled authority", "No holdout access before the gate", "No claim that a frozen hypothesis is a validated edge"],
    result: "Hypothesis frozen. Work remains constrained by producer/evidence authority rather than being forced into a positive result.",
    next: "Resume only from a qualifying producer and preserve the original frozen mechanism for comparison.",
  },
  "mean-reversion-candidate": {
    why: "Mean reversion is visually intuitive and therefore easy to overstate. The useful test is whether the edge survives realistic assumptions and structural validation.",
    observation: "The candidate produced apparent opportunities before realistic validation and transaction assumptions were applied.",
    hypothesis: "The candidate would retain persistent structural edge after validation.",
    method: ["Freeze candidate definition", "Apply realistic assumptions", "Run structural validation", "Compare against controls", "Retain the negative result"],
    boundaries: ["No cherry-picked examples", "No presentation of gross moves as tradable PnL", "No deletion of the failed study from the research record"],
    result: "Rejected. The candidate did not demonstrate persistent structural edge under the defined validation assumptions.",
    next: "Archive the mechanism and keep the evidence available as a comparison point for future research.",
  },
  "evidence-bound-autonomy": {
    why: "Agent systems become harder to trust when planning, tools, evidence and authority collapse into one opaque action loop.",
    observation: "Autonomous capability improves quickly, while reliable boundaries around context, tool calls, evidence and approvals remain a separate engineering problem.",
    hypothesis: "Agents can remain useful while explicit policy, evidence and human/system authority boundaries are preserved as first-class state.",
    method: ["Model intent and context separately", "Expose planner/tool transitions", "Capture evidence before authority changes", "Keep policy evaluation explicit", "Design human approval as a system state rather than a UI afterthought"],
    boundaries: ["Demo traces are labelled demonstrations", "No fake production telemetry", "No hidden tool authority", "No unsupported autonomy claims"],
    result: "Active research supporting the Aixion Control Core MVP architecture.",
    next: "Turn the architecture into an inspectable end-to-end execution trace with explicit policy and evidence stages.",
  },
};

export function generateStaticParams() {
  return researchNotes.map(note => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const note = researchNotes.find(item => item.slug === slug);
  if (!note) return {};
  return { title: note.title, description: note.question };
}

export default async function ResearchDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = researchNotes.find(item => item.slug === slug);
  const detail = researchDetail[slug];
  if (!note || !detail) notFound();

  return (
    <>
      <section className="page-hero">
        <div className="shell page-hero-grid">
          <div>
            <p className="eyebrow">RESEARCH NOTE · {note.domain}</p>
            <h1>{note.title}</h1>
            <p className="lede">{note.question}</p>
            <StateTag state={note.state} />
          </div>
          <div className="panel meta-board">
            <div><span>Visibility</span><strong>Public summary</strong></div>
            <div><span>Method</span><strong>Evidence-gated</strong></div>
            <div><span>Related system</span><strong>{slug === 'evidence-bound-autonomy' ? 'Control Core' : 'TradeBot'}</strong></div>
            <div><span>Outcome authority</span><strong>Explicit</strong></div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell detail-grid">
          <article className="detail-card"><p className="eyebrow">WHY THIS MATTERS</p><h3>Why investigate it?</h3><p>{detail.why}</p></article>
          <article className="detail-card"><p className="eyebrow">OBSERVATION</p><h3>What was seen?</h3><p>{detail.observation}</p></article>
          <article className="detail-card"><p className="eyebrow">HYPOTHESIS</p><h3>What is being tested?</h3><p>{detail.hypothesis}</p></article>
          <article className="detail-card"><p className="eyebrow">RESULT / STATE</p><h3>Where it stands</h3><p>{detail.result}</p></article>
        </div>
      </section>

      <section className="section">
        <div className="shell detail-grid">
          <article className="panel panel-pad">
            <SectionHeading eyebrow="METHOD" title="How the study stays bounded" />
            <ol>{detail.method.map(item => <li key={item}>{item}</li>)}</ol>
          </article>
          <article className="panel panel-pad">
            <SectionHeading eyebrow="BOUNDARIES" title="What this page will not claim" />
            <ul>{detail.boundaries.map(item => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell panel panel-pad">
          <p className="eyebrow">NEXT STEP</p>
          <h2>{detail.next}</h2>
        </div>
      </section>
    </>
  );
}
