import Image from "next/image";
import Link from "next/link";
import { EditorialLink } from "@/components/editorial-content";
import { StateTag } from "@/components/ui";
import { systems } from "@/lib/site-data";

const featured = [
  {
    slug: "tradebot",
    number: "01",
    field: "MARKET INTELLIGENCE · REAL-TIME SYSTEMS",
    image: "/images/aixion-editorial/systems-workbench.jpg",
    alt: "An engineering workspace with a system diagram, notebook and computer.",
    title: "Market systems need to show what they know—and what they do not.",
    note: "TradeBot brings market-data integrity, research and validation into a governed decision-support system. No live trading performance or edge is claimed.",
  },
  {
    slug: "control-core",
    number: "02",
    field: "ORCHESTRATION · POLICY · HUMAN AUTHORITY",
    image: "/images/aixion-editorial/hero-studio.jpg",
    alt: "A quiet engineering studio with a system map on glass.",
    title: "Give every automated action a context and a boundary.",
    note: "Aixion Control Core is being built to coordinate context, agents, tools, policy, evidence and human authority. Its current work is on the MVP runtime and policy-bound traces.",
  },
] as const;

const supportImages: Record<string, { src: string; alt: string; field: string }> = {
  automation: {
    src: "/images/aixion-editorial/planning-studio.jpg",
    alt: "Technical drawings and working notes on a planning table.",
    field: "WORKFLOW · QUALITY AUTOMATION",
  },
  analytics: {
    src: "/images/aixion-editorial/research-desk.jpg",
    alt: "Research notes and a chart on a desk.",
    field: "DATA · DECISION SUPPORT",
  },
};

export function WorkPage() {
  return (
    <>
      <section className="work-opening">
        <div className="page-width work-opening__grid" data-reveal>
          <p className="eyebrow">SELECTED WORK / AIXION LAB</p>
          <h1>Built around hard questions.</h1>
          <p className="work-opening__copy">Selected work in market intelligence, governed automation and decision support. Each project is shown at its actual stage, with evidence and limits in view.</p>
        </div>
        <div className="work-opening__image" data-reveal>
          <Image src="/images/aixion-editorial/planning-studio.jpg" alt="An engineering studio prepared for a design review." fill priority sizes="100vw" />
          <span>ENGINEERING / RESEARCH / DECISION SUPPORT</span>
        </div>
      </section>

      {featured.map((story, index) => {
        const system = systems.find((item) => item.slug === story.slug);
        if (!system) return null;
        return (
          <article className={`work-story${index === 1 ? " work-story--reverse" : ""}`} key={story.slug}>
            <div className="work-story__image" data-reveal>
              <Image src={story.image} alt={story.alt} fill sizes="(max-width: 760px) 100vw, 58vw" />
              <span>{story.number} / {story.field}</span>
            </div>
            <div className="work-story__copy" data-reveal>
              <p className="eyebrow">{system.name} / {system.id}</p>
              <h2>{story.title}</h2>
              <p>{story.note}</p>
              <div className="work-story__state"><StateTag state={system.state} /><span>{system.currentGate}</span></div>
              <dl><div><dt>Current focus</dt><dd>{system.currentFocus}</dd></div><div><dt>Next gate</dt><dd>{system.nextGate}</dd></div></dl>
              <EditorialLink href={`/systems/${system.slug}`}>Open the case study</EditorialLink>
            </div>
          </article>
        );
      })}

      <section className="work-support">
        <div className="page-width">
          <div className="work-support__heading" data-reveal>
            <p className="eyebrow">OTHER DIRECTIONS</p>
            <h2>Useful work continues beyond the flagship systems.</h2>
          </div>
          <div className="work-support__list">
            {systems.slice(2).map((system, index) => {
              const visual = supportImages[system.slug];
              if (!visual) return null;
              return (
                <article className="work-support__item" key={system.id} data-reveal>
                  <Link className="work-support__image" href={`/systems/${system.slug}`} aria-label={`Read about ${system.name}`}>
                    <Image src={visual.src} alt={visual.alt} fill sizes="(max-width: 700px) 100vw, 32vw" />
                    <span>0{index + 3}</span>
                  </Link>
                  <div className="work-support__copy">
                    <p className="eyebrow">{visual.field}</p>
                    <div className="work-support__title"><h3>{system.name}</h3><StateTag state={system.state} /></div>
                    <p>{system.descriptor}</p>
                    <EditorialLink href={`/systems/${system.slug}`}>Explore this work</EditorialLink>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="work-end">
        <div className="page-width work-end__inner" data-reveal>
          <p className="eyebrow eyebrow--light">THE COMMON THREAD</p>
          <h2>A system earns confidence through what it can show.</h2>
          <Link href="/research" className="button button--light">Read the research <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </>
  );
}
