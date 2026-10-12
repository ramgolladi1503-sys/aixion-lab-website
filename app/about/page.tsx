import type { Metadata } from "next";
import Link from "next/link";
import { EditorialHeading, EditorialHero, ImageStory } from "@/components/editorial-content";

export const metadata: Metadata = {
  title: "About Ram",
  description: "Meet Ram Golladi, the engineer behind Aixion Lab, and the principles that shape the work.",
};

const principles = [
  { title: "Make state visible", body: "Systems are easier to reason about when inputs, transitions and failures are explicit." },
  { title: "Test the assumption", body: "A clear hypothesis and a bounded method matter more than a polished story about the outcome." },
  { title: "Keep authority explicit", body: "Automation and AI can support decisions while human and system boundaries remain inspectable." },
];

export default function AboutPage() {
  return (
    <>
      <EditorialHero
        eyebrow="ABOUT / THE ENGINEER BEHIND THE WORK"
        title="Built by Ram Golladi."
        copy="Aixion Lab is an independent applied-engineering practice shaped by quality engineering, automation, software, data and applied AI."
        image="/images/aixion-editorial/hero-studio.jpg"
        imageAlt="An independent engineering studio at dusk, with system sketches on glass."
      >
        <Link className="button button--light" href="/resume">Career snapshot <span aria-hidden="true">↗</span></Link>
      </EditorialHero>

      <section id="page-content" className="editorial-section">
        <ImageStory
          image="/images/aixion-editorial/planning-studio.jpg"
          imageAlt="A worktable prepared for technical planning and review."
          eyebrow="THE PRACTICE"
          title="Quality engineering became a way to build."
          number="01"
        >
          <p>My work has moved from testing software behavior into designing systems, data flows and applied AI. The common thread is reliability: define state, expose failure, test assumptions and keep a record of what the evidence supports.</p>
          <p>Aixion Lab is where those disciplines meet in practical systems work.</p>
        </ImageStory>
      </section>

      <section className="editorial-section editorial-section--cool">
        <div className="page-width">
          <EditorialHeading eyebrow="ENGINEERING PRINCIPLES" title="What I carry from one system to the next." />
          <div className="principles-grid">
            {principles.map((principle, index) => (
              <article className="principle" key={principle.title} data-reveal>
                <span className="story-index">0{index + 1}</span>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="editorial-section editorial-section--compact">
        <div className="page-width contact-layout" data-reveal>
          <div className="contact-copy">
            <p className="eyebrow">CONTACT</p>
            <h2>Build, test or discuss something difficult.</h2>
            <p>For engineering roles, applied-AI work, automation systems or a technical conversation about one of the projects.</p>
          </div>
          <div className="contact-list">
            <a href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer"><span>GitHub / project work</span><span>↗</span></a>
            <Link href="/resume"><span>Career snapshot</span><span>↗</span></Link>
            <Link href="/systems"><span>Systems portfolio</span><span>↗</span></Link>
          </div>
        </div>
      </section>
    </>
  );
}
