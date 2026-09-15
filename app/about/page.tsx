import Link from "next/link";

const principles = [
  ["Evidence over confidence", "A convincing explanation is not a substitute for a convincing test."],
  ["Failure is information", "Rejected work is useful when it narrows uncertainty and improves the next decision."],
  ["Human authority matters", "Consequential systems should make responsibility visible rather than obscure it."],
  ["Complexity must be earned", "Use the simplest architecture that can solve the problem reliably, then add complexity only when evidence demands it."],
] as const;

export default function AboutPage() {
  return (
    <main className="about-editorial-page">
      <section className="about-hero">
        <p className="editorial-kicker">ABOUT</p>
        <div className="about-hero-grid">
          <h1>A small lab with a simple rule: claims should be earned.</h1>
          <div className="about-lede">
            <p>Aixion Lab is an independent applied-engineering lab working across AI, automation, decision systems, research infrastructure, and software reliability.</p>
            <p>The work is less interested in making technology look impressive than in understanding when a system is reliable enough to deserve trust.</p>
          </div>
        </div>
      </section>

      <section className="about-two-up">
        <article>
          <p className="editorial-kicker">WHY IT EXISTS</p>
          <h2>Software can be impressive long before it is dependable.</h2>
          <p>Modern tools make prototypes extraordinarily easy to produce. That is useful, but it also makes it easy to confuse something that works once with something that deserves confidence.</p>
          <p>Aixion focuses on the gap between those two states: validation, observability, failure behaviour, evidence, operating boundaries, and the decisions that determine whether an experiment should move closer to real use.</p>
        </article>

        <article>
          <p className="editorial-kicker">FOUNDER</p>
          <h2>Built by Ram.</h2>
          <p>Ram's background in software quality and automation shapes the lab's engineering instinct: do not ask only whether a system works. Ask how it fails, how we know, what evidence survives, and what should happen when the system is uncertain.</p>
          <p>Aixion brings that quality-engineering mindset into applied AI, research systems, automation, and product engineering.</p>
          <div className="about-inline-links"><Link href="/resume">Professional profile →</Link><a href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer">GitHub →</a></div>
        </article>
      </section>

      <section className="about-principles about-principles-stacked" aria-labelledby="principles-heading">
        <div className="about-principles-heading">
          <p className="editorial-kicker">PRINCIPLES</p>
          <h2 id="principles-heading">How the work is judged.</h2>
        </div>
        <div className="about-principle-grid">
          {principles.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}
        </div>
      </section>

      <section className="about-closing about-closing-wide">
        <p className="editorial-kicker">DIRECTION</p>
        <h2>The ambition can be large. The claims should remain precise.</h2>
        <div><Link href="/systems">Explore the work →</Link><Link href="/collaborate">Collaborate →</Link></div>
      </section>
    </main>
  );
}
