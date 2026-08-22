import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui";
import { ResearchIndex } from "@/components/research-index";

export const metadata: Metadata = {
  title: "Research Notes",
  description: "Questions, hypotheses, experiments and failures that move Aixion systems forward.",
};

export default function ResearchPage() {
  return (
    <>
      <section className="page-hero">
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

      <section className="section-tight">
        <div className="shell">
          <SectionHeading eyebrow="INDEX" title="Research is not a success gallery." copy="The public index keeps active, frozen and rejected work visible so the site reflects how engineering actually progresses." />
          <ResearchIndex />
        </div>
      </section>

      <section className="section">
        <div className="shell panel panel-pad">
          <SectionHeading eyebrow="METHOD" title="Question → Observation → Hypothesis → Freeze → Test → Validation → Decision" copy="Research moves forward through explicit gates. A candidate can be promoted, rejected or iterated, but the lifecycle remains visible." />
          <div className="architecture-flow">
            {['Question','Observation','Hypothesis','Freeze','Test','Validation','Decision'].map((stage, index, stages) => (
              <div className="architecture-step" key={stage}><span>{stage}</span>{index < stages.length - 1 ? <b aria-hidden="true">→</b> : null}</div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
