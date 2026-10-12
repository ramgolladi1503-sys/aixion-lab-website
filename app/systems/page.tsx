import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EditorialHeading, EditorialHero, EditorialLink } from "@/components/editorial-content";
import { StateTag } from "@/components/ui";
import { systems } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Systems",
  description: "Explore TradeBot, Aixion Control Core, automation and analytics work at their documented stages.",
};

const images: Record<string, { src: string; alt: string; eyebrow: string }> = {
  tradebot: { src: "/images/aixion-editorial/systems-workbench.jpg", alt: "A systems engineering workstation with an architecture diagram and notebook.", eyebrow: "MARKET INTELLIGENCE · AX-SYS-001" },
  "control-core": { src: "/images/aixion-editorial/hero-studio.jpg", alt: "An engineering studio with system diagrams on a glass wall.", eyebrow: "GOVERNED ORCHESTRATION · AX-SYS-002" },
  automation: { src: "/images/aixion-editorial/planning-studio.jpg", alt: "Planning drawings arranged across an engineering worktable.", eyebrow: "WORKFLOW · QUALITY AUTOMATION · AX-SYS-003" },
  analytics: { src: "/images/aixion-editorial/research-desk.jpg", alt: "Research notes and a chart on a desk.", eyebrow: "DATA · DECISION SUPPORT · AX-SYS-004" },
};

export default function SystemsPage() {
  return (
    <>
      <EditorialHero
        eyebrow="SYSTEMS / PROJECTS"
        title="Built around real constraints."
        copy="A portfolio of applied systems work, from market-data integrity to governed automation and decision support. Each project is shown at its documented stage."
        image="/images/aixion-editorial/systems-workbench.jpg"
        imageAlt="A systems engineering workstation with an architecture diagram, hardware and notebook."
      >
        <Link className="button button--light" href="/systems/tradebot">Explore TradeBot <span aria-hidden="true">↗</span></Link>
      </EditorialHero>

      <section id="page-content" className="editorial-section editorial-section--compact">
        <div className="page-width">
          <EditorialHeading eyebrow="SYSTEMS REGISTRY" title="Four directions. Different maturity, shared discipline." copy="Current state and next gates are explicit. The page avoids presenting research or prototypes as deployed products." />
          <div className="system-register">
            {systems.map((system, index) => {
              const image = images[system.slug];
              return (
                <article className="system-register__row" key={system.id} data-reveal>
                  <span className="system-register__index">0{index + 1}</span>
                  <Link className="system-register__image" href={`/systems/${system.slug}`} aria-label={`Open ${system.name}`}>
                    <Image src={image.src} alt={image.alt} fill sizes="(max-width: 700px) 100vw, 28vw" />
                  </Link>
                  <div className="system-register__copy">
                    <div className="story-card__meta"><span>{image.eyebrow}</span><StateTag state={system.state} /></div>
                    <h2>{system.name}</h2>
                    <p>{system.descriptor}</p>
                    <dl className="system-register__facts"><div><dt>Current focus</dt><dd>{system.currentFocus}</dd></div><div><dt>Next gate</dt><dd>{system.nextGate}</dd></div></dl>
                    <EditorialLink href={`/systems/${system.slug}`}>Explore system</EditorialLink>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="editorial-section editorial-section--dark">
        <div className="page-width">
          <EditorialHeading eyebrow="A SHARED ENGINEERING STANDARD" title="Research does not gain authority by looking finished." copy="State, validation and evidence stay visible from the first question to an operational decision." align="center" />
          <div className="center-link" data-reveal><EditorialLink href="/research">See the research lifecycle</EditorialLink></div>
        </div>
      </section>
    </>
  );
}
