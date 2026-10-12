import type { Metadata } from "next";
import Link from "next/link";
import { EditorialHeading, EditorialHero, EditorialLink, ImageStory } from "@/components/editorial-content";
import { StateTag } from "@/components/ui";
import { systems } from "@/lib/site-data";
import snapshot from "@/content/lab-state.json";

export const metadata: Metadata = {
  title: "Lab Pulse",
  description: "A dated, public-safe snapshot of each Aixion Lab system's recorded state, focus and next evidence gate.",
};

export default function PulsePage() {
  return (
    <>
      <EditorialHero
        eyebrow="PULSE / RECORDED STATE"
        title="A clear view of what is moving."
        copy="Lab Pulse reports a dated snapshot of project state, current focus and next gate. It is a published record, not a live telemetry feed."
        image="/images/aixion-editorial/signal-room.jpg"
        imageAlt="A planning studio with a systems map drawn across glass."
      >
        <Link className="button button--light" href="#page-content">View the snapshot <span aria-hidden="true">↓</span></Link>
      </EditorialHero>

      <section id="page-content" className="editorial-section">
        <div className="page-width">
          <EditorialHeading eyebrow="SYSTEM STATE" title="One lab. Different work at different stages." copy="The snapshot distinguishes research, building and validation work. No arbitrary completion percentages or simulated real-time status are shown." />
          <div className="pulse-snapshot" data-reveal>
            <strong>Last recorded snapshot</strong>
            <span>{snapshot.updated_at.replaceAll("-", " · ")}</span>
            <span>Public-safe summary</span>
          </div>
          <div className="pulse-list">
            {snapshot.systems.map((record) => {
              const system = systems.find((item) => item.slug === record.slug);
              if (!system) return null;
              return (
                <article className="pulse-card" key={record.slug} data-reveal>
                  <div className="pulse-card__state">
                    <span className="eyebrow">{record.id}</span>
                    <strong>{record.name}</strong>
                    <StateTag state={record.state} />
                    <EditorialLink href={`/systems/${record.slug}`}>Open system</EditorialLink>
                  </div>
                  <div className="pulse-card__details">
                    <div><span>Current focus</span><p>{record.current_focus}</p></div>
                    <div><span>Latest milestone</span><p>{record.latest_milestone}</p></div>
                    <div><span>Next gate</span><p>{record.next_gate}</p></div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="editorial-section editorial-section--cool">
        <ImageStory
          image="/images/aixion-editorial/research-desk.jpg"
          imageAlt="Research notes and a chart under review."
          eyebrow="HOW TO READ PULSE"
          title="A state is useful when its source and next gate are clear."
          reverse
        >
          <p>Each entry is a documented project snapshot. The timestamp above applies to the whole record; individual systems link to their underlying public summary.</p>
          <p>If a project’s evidence does not meet its next gate, the state remains unchanged.</p>
        </ImageStory>
      </section>

      <section className="editorial-section editorial-section--compact">
        <div className="page-width center-link"><EditorialLink href="/systems">Read the systems in detail</EditorialLink></div>
      </section>
    </>
  );
}
