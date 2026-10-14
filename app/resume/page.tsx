import type { Metadata } from "next";
import Link from "next/link";
import { EditorialHeading, EditorialHero, EditorialLink, ImageStory } from "@/components/editorial-content";
import { systems } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Career snapshot",
  description: "A concise view of Ram Golladi's engineering focus and the systems behind Aixion Lab.",
};

const capabilities = [
  { title: "Quality engineering", body: "Manual and automated testing, scenario design, regression thinking and failure analysis." },
  { title: "Automation", body: "Workflow and RPA patterns designed around validation, retries, recovery and traceability." },
  { title: "Software systems", body: "APIs, services, integrations, state management and system architecture." },
  { title: "Data and applied AI", body: "Real-time data, ML experimentation and governance for autonomous systems." },
];

export default function ResumePage() {
  return (
    <>
      <EditorialHero
        eyebrow="CAREER / QUICK VIEW"
        title="Quality engineering, extended into systems engineering."
        copy="A recruiter-focused summary of the work behind Aixion Lab. The project pages provide the evidence and maturity boundaries behind each capability."
        image="/images/aixion-editorial/planning-studio.jpg"
        imageAlt="A planning desk in an engineering studio."
      >
        <Link className="button button--light" href="/about#contact">Contact Ram <span aria-hidden="true">↗</span></Link>
      </EditorialHero>

      <section id="page-content" className="editorial-section">
        <div className="page-width">
          <EditorialHeading eyebrow="PROFILE" title="Build reliable systems by making their behavior understandable." copy="Experience across quality engineering grew into automation, software systems, data and applied AI. The through-line is explicit state, testable contracts and evidence behind decisions." />
          <div className="principles-grid career-capabilities">
            {capabilities.map((item, index) => <article className="principle" key={item.title} data-reveal><span className="story-index">0{index + 1}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}
          </div>
        </div>
      </section>

      <section className="editorial-section editorial-section--cool">
        <ImageStory
          image="/images/aixion-editorial/systems-workbench.jpg"
          imageAlt="A system map and engineering notes beside a computer at a workbench."
          eyebrow="ENGINEERING IN PRACTICE"
          title="Turn quality thinking into system behavior."
          reverse
          number="02"
          href="/systems"
          action="Explore the portfolio"
        >
          <p>Quality practices carry into software and applied intelligence through observable inputs, explicit state transitions, failure recovery and evidence that supports the next decision.</p>
        </ImageStory>
      </section>

      <section className="editorial-section">
        <div className="page-width">
          <EditorialHeading eyebrow="PROJECT EVIDENCE" title="The work behind the capability list." copy="Each system page explains the problem, engineering choices, current status and public evidence boundary." />
          <div className="career-projects">
            {systems.slice(0, 2).map((system, index) => (
              <article className="career-project" key={system.id} data-reveal>
                <div><span className="story-index">0{index + 1}</span><h3>{system.name}</h3><p>{system.descriptor}</p><p className="career-project__skills"><strong>Relevant work:</strong> {system.competencies.join(" · ")}</p></div>
                <EditorialLink href={`/systems/${system.slug}`}>Review the system</EditorialLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section editorial-section--compact">
        <div className="page-width resume-note" data-reveal>
          <div><p className="eyebrow">PUBLICATION STATUS</p><h2>Career snapshot</h2><p>A downloadable résumé is not published here. This page intentionally avoids stale or mismatched résumé files.</p></div>
          <div className="resume-actions"><EditorialLink href="/about#contact">Contact</EditorialLink><Link className="button" href="/systems">Explore the portfolio <span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>
    </>
  );
}
