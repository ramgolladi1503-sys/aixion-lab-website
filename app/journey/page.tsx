import type { Metadata } from "next";
import Link from "next/link";
import { EditorialHeading, EditorialHero, ImageStory } from "@/components/editorial-content";
import { journey } from "@/lib/site-data";
import { JourneySpectrum } from "@/components/journey-spectrum";

export const metadata: Metadata = {
  title: "Journey",
  description: "The engineering path from quality and automation to software, data and governed autonomous systems.",
};

export default function JourneyPage() {
  return (
    <>
      <EditorialHero
        eyebrow="JOURNEY / ENGINEERING EVOLUTION"
        title="The tools changed. The standard stayed."
        copy="A path from quality engineering through software, data and applied AI—connected by a focus on observable state, failure handling and evidence."
        image="/images/aixion-editorial/planning-studio.jpg"
        imageAlt="An engineering planning studio with a long worktable and drawings."
      >
        <Link className="button button--light" href="#page-content">Explore the path <span aria-hidden="true">↓</span></Link>
      </EditorialHero>

      <section id="page-content" className="editorial-section">
        <div className="page-width">
          <EditorialHeading eyebrow="A CONNECTED PRACTICE" title="Each discipline added a new way to reason about systems." copy="The sequence below describes the engineering progression, not a dated employment history." />
          <JourneySpectrum items={journey} />
        </div>
      </section>

      <section className="editorial-section editorial-section--cool">
        <ImageStory
          image="/images/aixion-editorial/signal-room.jpg"
          imageAlt="A system planning studio with a network diagram on glass."
          eyebrow="THE THROUGH-LINE"
          title="A system should be able to explain its state."
          reverse
          number="07"
          href="/systems"
          action="Explore the systems"
        >
          <p>Quality engineering made failure and reproducibility visible. That discipline now informs automation, real-time systems and the boundaries around applied AI.</p>
        </ImageStory>
      </section>
    </>
  );
}
