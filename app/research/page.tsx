import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ResearchIndex } from "@/components/research-index";
import { EditorialHeading, EditorialHero, EditorialLink } from "@/components/editorial-content";
import { StateTag } from "@/components/ui";
import { researchNotes } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Research",
  description: "Questions, methods and outcomes from Aixion Lab research, including frozen and rejected hypotheses.",
};

export default function ResearchPage() {
  const featured = researchNotes.find((note) => note.slug === "mean-reversion-candidate");

  return (
    <>
      <EditorialHero
        eyebrow="RESEARCH / FIELD NOTES"
        title="Evidence before certainty."
        copy="Research pages keep the question, method, boundaries and outcome together. A hypothesis is not a result, and a result is not execution authority."
        image="/images/aixion-editorial/research-desk.jpg"
        imageAlt="A research desk with annotated charts and notes."
      >
        <Link className="button button--light" href="#featured-research">Start with a finding <span aria-hidden="true">↓</span></Link>
      </EditorialHero>

      <section id="page-content" className="editorial-section editorial-section--compact">
        <div className="page-width">
          {featured ? (
            <article id="featured-research" className="research-feature" data-reveal>
              <Link className="research-feature__media" href={`/research/${featured.slug}`} aria-label={`Read ${featured.title}`}>
                <Image src="/images/aixion-editorial/research-desk.jpg" alt="A printed chart and notes on a research desk." fill sizes="(max-width: 700px) 100vw, 55vw" />
              </Link>
              <div className="research-feature__copy">
                <p className="eyebrow">FEATURED FINDING / {featured.domain}</p>
                <StateTag state={featured.state} />
                <h2>{featured.title}</h2>
                <p>{featured.question}</p>
                <p>The candidate did not demonstrate persistent structural edge under the defined validation assumptions. Its rejected status remains part of the research record.</p>
                <EditorialLink href={`/research/${featured.slug}`}>Read the research note</EditorialLink>
              </div>
            </article>
          ) : null}
        </div>
      </section>

      <section className="editorial-section editorial-section--cool">
        <div className="page-width">
          <EditorialHeading eyebrow="RESEARCH ARCHIVE" title="Follow the question as its state changes." copy="Filter notes by state. Each record explains what is being tested and what the evidence is allowed to support." />
          <ResearchIndex />
        </div>
      </section>

      <section className="editorial-section editorial-section--compact">
        <div className="page-width">
          <div className="research-boundary" data-reveal>
            <div><p className="eyebrow">RESEARCH BOUNDARY</p><h2>Evidence can open the next gate. It cannot silently move it.</h2></div>
            <p>Proprietary strategy parameters, private data and unsupported performance claims stay outside the public site.</p>
            <EditorialLink href="/systems/tradebot">See how the boundary is applied</EditorialLink>
          </div>
        </div>
      </section>
    </>
  );
}
