import type { Metadata } from "next";
import { journey } from "@/lib/site-data";
import { SectionHeading } from "@/components/ui";
import { AixionSignal, SystemVisual } from "@/components/system-visuals";

export const metadata: Metadata = {
  title: "Journey",
  description: "From quality engineering to applied systems engineering.",
};

export default function JourneyPage() {
  return (
    <>
      <section className="page-hero journey-hero" data-reveal="journey-hero">
        <div className="shell page-hero-grid">
          <div>
            <p className="eyebrow">AIXION LAB · JOURNEY</p>
            <h1>The tools changed. The questions got stricter.</h1>
            <p className="lede">Quality engineering started with failure. Each step since then added a harder requirement: explain the state, trust the evidence, bound the authority.</p>
            <AixionSignal compact />
          </div>
          <SystemVisual kind="journey" />
        </div>
      </section>

      <section className="section-tight journey-timeline-section" data-reveal="journey-questions">
        <div className="shell">
          <SectionHeading eyebrow="SEVEN QUESTIONS" title="The questions that changed the way I build." copy="This is not a second résumé. Each stage records the engineering question that the previous stage made impossible to ignore." />
          <div className="journey-timeline">
            {journey.map(([number, title, question]) => (
              <article className="journey-step" key={number} data-reveal={`journey-${number}`}>
                <span className="number">{number}</span>
                <div>
                  <span className="journey-question-label">Question {number}</span>
                  <h3>{title}</h3>
                  <p className="journey-question">“{question}”</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight journey-principles-section" data-reveal="journey-principles">
        <div className="shell panel panel-pad">
          <SectionHeading eyebrow="ENGINEERING PHILOSOPHY" title="The common thread is state, evidence and failure." copy="Testing software, automating workflows, working with data and building AI systems are different disciplines. Reliable systems still need explicit state, controlled authority and evidence when things go wrong." />
          <div className="principles-grid">
            <div className="principle"><strong>Observable by design</strong><p>If a system cannot explain what state it is in, the interface is hiding an engineering problem.</p></div>
            <div className="principle"><strong>Failure is evidence</strong><p>A failed experiment or runtime path belongs in the learning system rather than being erased.</p></div>
            <div className="principle"><strong>Authority stays explicit</strong><p>Automation should not quietly gain the ability to act beyond the boundary it was designed to hold.</p></div>
            <div className="principle"><strong>Proof beats claims</strong><p>The site makes strong claims only when a public-safe proof path exists.</p></div>
          </div>
          <p className="system-principle">Aixion Lab is the current answer: intelligence can be useful without becoming opaque.</p>
        </div>
      </section>
    </>
  );
}
