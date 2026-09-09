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
      <section className="page-hero research-reference-hero">
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

      <section className="section">
        <div className="shell panel panel-pad research-pipeline-shell">
          <SectionHeading
            eyebrow="SCIENTIFIC METHOD"
            title="A seven-stage empirical lifecycle."
            copy="Research moves forward through explicit, auditable gates. A candidate can be promoted, rejected, or iterated, but the lifecycle remains visible and reproducible."
          />
          <div className="research-pipeline-grid">
            {[
              { num: "01", name: "Question", desc: "Domain problem definition & inquiry scope", tag: "GATE 01" },
              { num: "02", name: "Observation", desc: "Empirical baseline & market data collection", tag: "GATE 02" },
              { num: "03", name: "Hypothesis", desc: "Formulated model & pre-registered assumptions", tag: "GATE 03" },
              { num: "04", name: "Freeze", desc: "Immutable candidate logic lock before evaluation", tag: "INVARIANT" },
              { num: "05", name: "Test", desc: "Stress regimes, holdouts & execution bounds", tag: "STRESS" },
              { num: "06", name: "Validation", desc: "Empirical significance & metric verification", tag: "VERIFIED" },
              { num: "07", name: "Decision", desc: "Promotion to system claim or retained failure evidence", tag: "AUTHORITY" },
            ].map((stage, idx) => (
              <div className="pipeline-node-card" key={stage.num}>
                <div className="pipeline-node-top">
                  <span className="pipeline-node-num">{stage.num}</span>
                  <span className="pipeline-node-tag">{stage.tag}</span>
                </div>
                <h4 className="pipeline-node-name">{stage.name}</h4>
                <p className="pipeline-node-desc">{stage.desc}</p>
                {idx < 6 && <div className="pipeline-node-connector" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
