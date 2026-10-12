import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EditorialHeading, EditorialHero, EditorialLink, SignalLine } from "@/components/editorial-content";

export const metadata: Metadata = {
  title: "Collaborate",
  description: "Explore evidence-led collaboration across quality engineering, automation, data and applied AI.",
};

const focusAreas = [
  {
    index: "01",
    title: "Quality engineering",
    copy: "Test strategy, automation architecture and validation that make failure visible and results easier to trust.",
  },
  {
    index: "02",
    title: "Workflow automation",
    copy: "Operational workflows with explicit state, bounded retries, clear hand-offs and reviewable evidence.",
  },
  {
    index: "03",
    title: "Applied AI systems",
    copy: "Evaluation, tool boundaries and human oversight for systems that need to explain what they did and why.",
  },
  {
    index: "04",
    title: "Data and decision support",
    copy: "Data pipelines and operational views that surface provenance, validation and decision limits.",
  },
];

export default function CollaboratePage() {
  return (
    <>
      <EditorialHero
        eyebrow="AIXION LAB · COLLABORATION"
        title="Start with a difficult problem and make the work inspectable."
        copy="Aixion Lab is an independent engineering lab led by Ram Golladi. Collaboration is selective and grounded in a concrete problem, a bounded outcome and evidence that can be reviewed."
        image="/images/aixion-editorial/planning-studio.jpg"
        imageAlt="An engineering worktable arranged for collaborative planning."
        scrollTarget="collaboration-focus"
      >
        <Link className="button button--light" href="/about#contact">Discuss a project <span aria-hidden="true">↗</span></Link>
        <Link className="quiet-light-link" href="/systems">Explore the systems <span aria-hidden="true">↗</span></Link>
      </EditorialHero>

      <section id="collaboration-focus" className="editorial-section">
        <div className="page-width">
          <EditorialHeading
            eyebrow="AREAS OF FOCUS"
            title="Useful where reliability and clarity matter."
            copy="The work connects quality engineering, automation, software, data and applied AI. Each engagement begins with the actual constraints and current state."
          />
          <div className="collaboration-grid">
            {focusAreas.map((area) => (
              <article className="collaboration-card" data-reveal key={area.index}>
                <span className="story-index">{area.index}</span>
                <h3>{area.title}</h3>
                <p>{area.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section editorial-section--cool">
        <div className="page-width collaboration-process">
          <div>
            <EditorialHeading
              eyebrow="HOW THE WORK MOVES"
              title="A clear path from question to evidence."
              copy="Assumptions stay explicit, failure states stay visible and system maturity is described as it is."
            />
            <SignalLine stages={["Frame", "Build", "Validate", "Review"]} />
          </div>
          <figure className="collaboration-image" data-reveal>
            <Image src="/images/aixion-editorial/research-desk.jpg" alt="Research notes and a chart laid out for review." fill sizes="(max-width: 760px) 100vw, 42vw" />
          </figure>
        </div>
      </section>

      <section className="editorial-section editorial-section--dark">
        <div className="page-width collaboration-close" data-reveal>
          <div>
            <p className="eyebrow eyebrow--light">A BOUNDED FIRST STEP</p>
            <h2>Bring the problem, the constraints and the outcome that would help.</h2>
          </div>
          <div className="collaboration-close__actions">
            <EditorialLink href="/about#contact">Start a technical conversation</EditorialLink>
            <EditorialLink href="/resume">Looking to hire? View the career profile</EditorialLink>
          </div>
        </div>
      </section>
    </>
  );
}
