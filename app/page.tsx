import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HomepageChapters } from "@/components/homepage-chapters";
import { EditorialLink } from "@/components/editorial-content";
import { StateTag } from "@/components/ui";
import { researchNotes, systems } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Software & automation for business operations — Aixion Lab",
  description: "Aixion Lab helps businesses simplify operations, automate repetitive work and build reliable software around their existing workflows.",
};

export default function HomePage() {
  const tradebot = systems.find((system) => system.slug === "tradebot");
  const controlCore = systems.find((system) => system.slug === "control-core");
  const rejected = researchNotes.find((note) => note.slug === "mean-reversion-candidate");

  return (
    <>
      <HomepageChapters />

      <section className="home-work home-business" id="home-intro" aria-labelledby="home-business-title">
        <div className="home-work__image" data-reveal>
          <Image src="/images/aixion-editorial/planning-studio.jpg" alt="Plans and tools arranged across a bright worktable." fill sizes="(max-width: 760px) 100vw, 58vw" />
          <span className="home-work__index">00 / BUSINESS OPERATIONS</span>
        </div>
        <div className="home-work__copy" data-reveal>
          <p className="eyebrow">SOFTWARE & AUTOMATION FOR BUSINESSES</p>
          <h2 id="home-business-title">Make everyday operations easier to run.</h2>
          <p>We help businesses simplify operations, automate repetitive work and build reliable software around how their teams actually work.</p>
          <EditorialLink href="/about#contact">Tell us about a workflow</EditorialLink>
        </div>
        <div className="home-business__services" aria-label="Examples of business workflows Aixion Lab can help with">
          <article><span>01 / CUSTOMER REQUESTS</span><p>Keep incoming enquiries, follow-ups and next steps visible in one workflow.</p></article>
          <article><span>02 / ORDERS & HANDOFFS</span><p>Make order status, ownership and missing information easier to track.</p></article>
          <article><span>03 / REPEATED ADMIN</span><p>Connect existing tools to reduce duplicate entry and simplify routine reporting.</p></article>
        </div>
        <p className="home-business__note">These are starting points, not packaged products. Each project is scoped around your process and the tools you already use.</p>
      </section>

      <section className="home-work home-work--tradebot" aria-labelledby="home-tradebot-title">
        <div className="home-work__image" data-reveal>
          <Image src="/images/aixion-editorial/systems-workbench.jpg" alt="An engineering workspace with a system diagram, notebook and computer." fill sizes="(max-width: 760px) 100vw, 58vw" />
          <span className="home-work__index">01 / MARKET INTELLIGENCE</span>
        </div>
        <div className="home-work__copy" data-reveal>
          <p className="eyebrow">A SYSTEM UNDER VALIDATION</p>
          <h2 id="home-tradebot-title">When the inputs move, the evidence has to keep up.</h2>
          <p>{tradebot?.descriptor} The work focuses on data integrity, research boundaries and validation; it does not imply a live trading edge or financial performance.</p>
          {tradebot ? <StateTag state={tradebot.state} /> : null}
          <EditorialLink href="/systems/tradebot">Explore TradeBot</EditorialLink>
        </div>
      </section>

      <section className="home-work home-work--core" aria-labelledby="home-core-title">
        <div className="home-work__image" data-reveal>
          <Image src="/images/aixion-editorial/hero-studio.jpg" alt="A quiet engineering studio with a system map on glass." fill sizes="(max-width: 760px) 100vw, 58vw" />
          <span className="home-work__index">02 / ORCHESTRATION</span>
        </div>
        <div className="home-work__copy" data-reveal>
          <p className="eyebrow">A PLATFORM TAKING SHAPE</p>
          <h2 id="home-core-title">Useful automation needs a clear boundary around action.</h2>
          <p>{controlCore?.descriptor} Control Core is in development, with current work on orchestration, tool boundaries, policy and evidence capture.</p>
          {controlCore ? <StateTag state={controlCore.state} /> : null}
          <EditorialLink href="/systems/control-core">Explore Control Core</EditorialLink>
        </div>
      </section>

      <section className="home-finding" aria-labelledby="home-finding-title">
        <div className="home-finding__media" data-reveal>
          <Image src="/images/aixion-editorial/research-desk.jpg" alt="Annotated research notes and a chart on a desk." fill sizes="(max-width: 760px) 100vw, 48vw" />
        </div>
        <div className="home-finding__copy" data-reveal>
          <p className="eyebrow">A RESEARCH DECISION, KEPT IN THE RECORD</p>
          <h2 id="home-finding-title">Some of the most useful results are the ones that stop a claim.</h2>
          <p>The mean-reversion candidate did not retain sufficient support after its validation boundary. It remains marked rejected, so a weak result is not quietly recast as a success.</p>
          {rejected ? <p className="home-finding__state"><StateTag state={rejected.state} /><span>{rejected.title}</span></p> : null}
          <EditorialLink href={rejected ? `/research/${rejected.slug}` : "/research"}>Read the research note</EditorialLink>
        </div>
      </section>

      <section className="home-practice" aria-labelledby="home-practice-title">
        <div className="page-width">
          <div className="home-practice__intro" data-reveal>
            <p className="eyebrow eyebrow--light">HOW THE WORK IS DONE</p>
            <h2 id="home-practice-title">Make the important parts visible.</h2>
          </div>
          <div className="home-practice__lines">
            <article data-reveal><span>01</span><h3>State</h3><p>Show what is operating, being built, under validation or still a question.</p></article>
            <article data-reveal><span>02</span><h3>Evidence</h3><p>Keep the reasoning and result close enough to inspect, including when a hypothesis fails.</p></article>
            <article data-reveal><span>03</span><h3>Authority</h3><p>Keep policy and human decisions explicit where software can affect important outcomes.</p></article>
          </div>
          <Link href="/journey" className="home-practice__link">Read the engineering approach <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="last-call home-close">
        <Image className="last-call__image" src="/images/aixion-editorial/signal-room.jpg" alt="" width={1672} height={941} sizes="100vw" />
        <div className="page-width last-call__content" data-reveal>
          <p className="eyebrow eyebrow--light">AIXION LAB</p>
          <h2>Have a system that deserves a closer look?</h2>
          <Link href="/about#contact" className="button button--light">Start a conversation <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </>
  );
}
