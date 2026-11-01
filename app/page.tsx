import { InteractiveSentinelTelemetry } from "@/components/interactive-sentinel-telemetry";
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
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", margin: "16px 0" }}>
            <Link className="button" href="/about#contact">Discuss a Project <span aria-hidden="true">↗</span></Link>
            <a className="button-secondary" href="/Ram-Golladi-Resume.pdf" download="Ram-Golladi-Resume.pdf">Download Resume <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="home-business__services" aria-label="Core Engineering Services">
          <article>
            <span style={{ color: "var(--accent-deep)", fontWeight: 700 }}>01 / AUTONOMOUS AGENT PLATFORMS</span>
            <p>Production multi-agent systems (Hermes, GSD, Codex) with fail-closed security gates, policy enforcement, and zero-trust human sign-offs.</p>
          </article>
          <article>
            <span style={{ color: "var(--accent-deep)", fontWeight: 700 }}>02 / FULL-STACK APPS & COCKPITS</span>
            <p>Mobile and web operations command centers (React, Next.js, Flutter) featuring sub-100ms real-time WebSocket telemetry and live queues.</p>
          </article>
          <article>
            <span style={{ color: "var(--accent-deep)", fontWeight: 700 }}>03 / AUTOMATED QA & INTEGRITY AUDITING</span>
            <p>End-to-end regression engines, invariant testing, automated adversarial audit suites, and tamper-proof compliance logging.</p>
          </article>
        </div>
        <p className="home-business__note">These are starting points, not packaged products. Each project is scoped around your process and the tools you already use.</p>
      </section>

      <section className="editorial-section editorial-section--cool" id="home-sentinel" style={{ padding: "4rem 0" }}>
        <div className="page-width">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px", marginBottom: "2rem" }}>
            <div>
              <p className="eyebrow" style={{ color: "var(--accent-deep)", fontWeight: 700 }}>FLAGSHIP MARKET INFRASTRUCTURE</p>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(34px, 3.8vw, 50px)", margin: "8px 0", color: "var(--text)", letterSpacing: "-0.03em" }}>
                TradeBot Sentinel: Sub-Millisecond Microstructure Observability
              </h2>
              <p style={{ maxWidth: "780px", color: "var(--muted)", fontSize: "15px", lineHeight: 1.7, margin: 0 }}>
                High-throughput market data architecture processing Level-5 order book depth, in-memory tick freshness, Stoikov micro-price pressure, and automated invariant risk boundaries in real time.
              </p>
            </div>
            <Link className="button" href="/systems/tradebot#sentinel">
              Explore Full 4-Vector Architecture <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <InteractiveSentinelTelemetry />
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
