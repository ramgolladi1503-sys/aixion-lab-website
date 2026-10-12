import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialHeading, EditorialHero, ImageStory } from "@/components/editorial-content";
import { StateTag } from "@/components/ui";
import { researchNotes } from "@/lib/site-data";

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
  return researchNotes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const note = researchNotes.find((item) => item.slug === slug);
  return note ? { title: note.title, description: note.question } : {};
}

export default async function ResearchDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = researchNotes.find((item) => item.slug === slug);
  const detail = researchDetail[slug];
  if (!note || !detail) notFound();

  return (
    <>
      <EditorialHero
        eyebrow={`RESEARCH NOTE / ${note.domain}`}
        title={note.title}
        copy={note.question}
        image="/images/aixion-editorial/research-desk.jpg"
        imageAlt="A research chart and working notes on a desk."
        scrollTarget="page-content"
      >
        <div className="system-hero-meta"><StateTag state={note.state} /><Link className="button button--light" href="#result">Read the finding <span aria-hidden="true">↓</span></Link></div>
      </EditorialHero>

      <section id="page-content" className="editorial-section">
        <div className="page-width">
          <EditorialHeading eyebrow="QUESTION / METHOD / RESULT" title="Keep the reasoning attached to the result." copy="The note gives the reader enough context to understand why the work exists and where its conclusions stop." />
          <div className="research-answers">
            <article data-reveal><span className="eyebrow">WHY THIS MATTERS</span><h2>Why investigate it?</h2><p>{detail.why}</p></article>
            <article data-reveal><span className="eyebrow">OBSERVATION</span><h2>What was seen?</h2><p>{detail.observation}</p></article>
            <article data-reveal><span className="eyebrow">HYPOTHESIS</span><h2>What is being tested?</h2><p>{detail.hypothesis}</p></article>
            <article id="result" data-reveal><span className="eyebrow">RESULT / STATE</span><h2>Where it stands</h2><p>{detail.result}</p></article>
          </div>
        </div>
      </section>

      <section className="editorial-section editorial-section--cool">
        <div className="page-width research-method-layout">
          <div data-reveal>
            <EditorialHeading eyebrow="METHOD" title="How the study stays bounded" />
            <ol className="editorial-list">{detail.method.map((item) => <li key={item}>{item}</li>)}</ol>
          </div>
          <div data-reveal>
            <EditorialHeading eyebrow="BOUNDARIES" title="What this page will not claim" />
            <ul className="editorial-list editorial-list--quiet">{detail.boundaries.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="editorial-section editorial-section--compact">
        <ImageStory
          image="/images/aixion-editorial/planning-studio.jpg"
          imageAlt="A studio worktable with technical plans laid out for review."
          eyebrow="NEXT STEP"
          title={detail.next}
          reverse
          href="/research"
          action="Return to research archive"
        >
          <p>The current state stays attached to the evidence until the next gate is met.</p>
        </ImageStory>
      </section>
    </>
  );
}
