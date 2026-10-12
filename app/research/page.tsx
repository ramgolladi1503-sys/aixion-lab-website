import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ResearchIndex } from "@/components/research-index";
import { EditorialHeading, EditorialHero, EditorialLink } from "@/components/editorial-content";
import { StateTag } from "@/components/ui";
import { researchNotes } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Research",
  description: "Applied research at Aixion Lab across intelligent systems, quantitative methods, data infrastructure and software reliability.",
};

export default function ResearchPage() {
  const featured = researchNotes.find((note) => note.slug === "evidence-bound-autonomy");

  return (
    <>
      <EditorialHero
        eyebrow="RESEARCH / APPLIED ENGINEERING"
        title="Engineering answers to difficult questions."
        copy="We investigate intelligent systems, quantitative methods, data infrastructure and software reliability. Our work asks not only whether a system can be built, but whether its behavior can be understood, reproduced and challenged."
        image="/images/aixion-editorial/research-desk.jpg"
        imageAlt="A research desk with annotated charts and notes."
      >
        <Link className="button button--light" href="#featured-research">Explore our research <span aria-hidden="true">↓</span></Link>
      </EditorialHero>

      <section id="page-content" className="editorial-section editorial-section--compact">
        <div className="page-width">
          {featured ? (
            <article id="featured-research" className="research-feature" data-reveal>
              <Link className="research-feature__media" href={`/research/${featured.slug}`} aria-label={`Read ${featured.title}`}>
                <Image src="/images/aixion-editorial/research-desk.jpg" alt="A printed chart and notes on a research desk." fill sizes="(max-width: 700px) 100vw, 55vw" />
              </Link>
              <div className="research-feature__copy">
                <p className="eyebrow">FEATURED RESEARCH / {featured.domain}</p>
                <StateTag state={featured.state} />
                <h2>{featured.title}</h2>
                <p>{featured.question}</p>
                <p>We investigate how agent workflows can expose context, tool boundaries, policy checks and evidence while keeping human and system authority explicit.</p>
                <p>The work is active research supporting the Control Core MVP architecture. It does not claim production autonomy or proven operational outcomes.</p>
                <EditorialLink href={`/research/${featured.slug}`}>Explore the research</EditorialLink>
              </div>
            </article>
          ) : null}
        </div>
      </section>

      <section className="editorial-section editorial-section--cool">
        <div className="page-width">
          <EditorialHeading eyebrow="RESEARCH ARCHIVE" title="Intelligence, systems and evidence." copy="Explore investigations across autonomous systems, quantitative research, data integrity and software reliability. Each note records its question, current state and the limits of what its evidence supports." />
          <ResearchIndex />
        </div>
      </section>

      <section className="editorial-section editorial-section--compact">
        <div className="page-width">
          <div className="research-boundary" data-reveal>
            <div><p className="eyebrow">RESEARCH INTEGRITY</p><h2>What the evidence supports. Nothing more.</h2></div>
            <p>Research records distinguish open questions, experiments and documented outcomes. A result does not by itself establish real-world reliability or grant execution authority.</p>
            <EditorialLink href="/systems/tradebot">See how the boundary is applied</EditorialLink>
          </div>
        </div>
      </section>
    </>
  );
}
