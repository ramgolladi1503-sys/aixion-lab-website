import Link from "next/link";
import { systems, researchNotes } from "@/lib/site-data";
import { CareerStrip, SectionHeading, StateTag } from "@/components/ui";
import { SystemVisual } from "@/components/system-visuals";
import { HeroCarousel } from "@/components/hero-carousel";
import { FlipCard } from "@/components/flip-card";

export default function HomePage() {
  const tradebot = systems[0];

  return (
    <>
      <section className="hero">
        <div className="shell"><HeroCarousel /></div>
      </section>

      <section className="section home-intro">
        <div className="shell home-intro-grid">
          <div className="home-intro-copy">
            <p className="eyebrow">WHO WE ARE</p>
            <h2>Engineering that makes its state visible.</h2>
            <p className="lede">Aixion is an independent applied engineering lab where research becomes inspectable systems. I work across quality engineering, automation, software, data and applied AI with one discipline: make the decision, evidence and authority boundary explicit.</p>
            <p>That means the work is not presented as a collection of demos. Each system has a purpose, a current gate, a failure surface and a next decision.</p>
            <Link className="text-link" href="/about">Read the lab story →</Link>
          </div>
          <SystemVisual kind="analytics" />
        </div>
      </section>

      <section className="section-tight">
        <div className="shell feature-split">
          <article className="panel feature-copy">
            <p className="eyebrow">FLAGSHIP SYSTEM · VALIDATING</p>
            <h2>TradeBot</h2>
            <p>{tradebot.descriptor}</p>
            <p>Market data, research output and automated analysis are deliberately separated from risk and human execution authority.</p>
            <div className="button-row"><StateTag state={tradebot.state} /><Link className="button-secondary" href="/systems/tradebot#evidence">Evidence →</Link></div>
            <CareerStrip skills={tradebot.competencies} />
            <Link className="text-link" href="/systems/tradebot">Explore the system →</Link>
          </article>
          <SystemVisual kind="tradebot" />
        </div>
      </section>

      <section className="section research-proof-section">
        <div className="shell">
          <SectionHeading eyebrow="RESEARCH / PROOF" title="The lab keeps the questions, failures and evidence visible." copy="A rejected mechanism is still useful engineering evidence. Research is not silently promoted into a system claim." />
          <div className="flip-card-deck research-card-deck">
            {researchNotes.slice(0, 3).map(note => (
              <FlipCard key={note.slug} index={researchNotes.indexOf(note)} eyebrow={note.domain} title={note.title} front={note.question} backLabel={note.state} back={note.question} state={note.state} href={`/research/${note.slug}`} />
            ))}
          </div>
          <Link className="text-link" href="/research">View research index →</Link>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell feature-split">
          <div className="panel feature-copy">
            <p className="eyebrow">JOURNEY</p>
            <h2>How the way I build evolved.</h2>
            <p className="lede">Quality engineering taught me to distrust systems that cannot explain their state. That principle now shapes automation, data and AI work.</p>
            <Link className="text-link" href="/journey">View the engineering journey →</Link>
          </div>
          <div className="flip-card-deck home-journey-deck">
            <FlipCard eyebrow="PRACTICE" title="How the way I build evolved." front="Quality engineering taught me to distrust systems that cannot explain their state." backLabel="NOT PERFORMANCE" back="Tools change. The requirement for observable state does not." href="/journey" />
            <FlipCard eyebrow="METHOD" title="Make the state visible." front="Every system carries a current state, a failure surface and a next decision." backLabel="WORKING PRINCIPLE" back="The interface should make the engineering legible." href="/journey" index={1} />
            <FlipCard eyebrow="JOURNEY" title="Read the working history." front="The path from quality engineering to governed applied systems." backLabel="CONTINUE" back="Follow the decisions that shaped the lab." href="/journey" index={2} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell contact-panel">
          <div className="panel contact-copy">
            <p className="eyebrow">CONTACT</p>
            <h2>Build, test or discuss something difficult.</h2>
            <p className="lede">Engineering roles, applied-AI work, automation systems or a technical conversation about one of the systems.</p>
          </div>
          <div className="panel contact-copy">
            <p className="eyebrow">RECRUITER FAST PATH</p>
            <h3>Need the career translation?</h3>
            <p>Career view translates the same systems into competencies without changing the underlying evidence.</p>
            <div className="button-row">
              <Link className="button" href="/resume">Career snapshot →</Link>
              <Link className="button-secondary" href="/contact">Contact</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
