import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui";
import { ResearchIndex } from "@/components/research-index";
import { PageArtwork } from "@/components/page-artwork";

export const metadata: Metadata = {
  title: "Research Notes",
  description: "Questions, hypotheses, experiments and failures that move Aixion systems forward.",
};

export default function ResearchPage() {
  return (
    <>
      <section className="page-hero research-hero"><PageArtwork kind="research" />
        <div className="shell page-hero-grid">
          <div>
            <p className="eyebrow">AIXION LAB · RESEARCH</p>
            <h1>Research Notes</h1>
            <p className="lede">Questions, hypotheses, experiments and failures that move the systems forward. A rejected result is still useful when the method and boundary are clear.</p>
          </div>
          <div className="panel meta-board">
            <div><span>Lifecycle</span><strong>Question → Evidence</strong></div>
            <div><span>Promotion rule</span><strong>No silent authority</strong></div>
            <div><span>Negative results</span><strong>Retained</strong></div>
            <div><span>Private boundary</span><strong>Mechanics stay private</strong></div>
          </div>
        </div>
      </section>

      <section className="section-tight research-index-section">
        <div className="shell">
          <SectionHeading eyebrow="INDEX" title="Research is not a success gallery." copy="The public index keeps active, frozen and rejected work visible so the site reflects how engineering actually progresses." />
          <ResearchIndex />
        </div>
      </section>

      <section className="section-tight research-method-section">
        <div className="shell panel panel-pad research-method-panel">
          <SectionHeading eyebrow="METHOD" title="How a claim earns authority." copy="Every candidate moves through explicit gates. The lifecycle makes promotion, rejection and iteration inspectable without repeating the research index above." />
          <div className="architecture-flow research-method-flow" aria-label="Research validation lifecycle">
            {['Question','Observation','Hypothesis','Freeze','Test','Validation','Decision'].map((stage, index, stages) => (
              <div className="architecture-step" key={stage}><span>{stage}</span>{index < stages.length - 1 ? <b aria-hidden="true">→</b> : null}</div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
