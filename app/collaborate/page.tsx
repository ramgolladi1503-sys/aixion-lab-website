import Link from "next/link";

const paths = [
  {
    title: "Build with Aixion",
    body: "For teams with a difficult workflow, automation problem, AI-assisted product idea, decision-support need, or validation challenge that deserves more than a quick prototype.",
    cta: "Discuss a project →",
    href: "mailto:ram@aixionlab.com?subject=Aixion%20Lab%20project",
  },
  {
    title: "Work with Ram",
    body: "For engineering roles where quality, automation, applied AI, research systems, or forward-deployed problem solving are central to the work.",
    cta: "View professional profile →",
    href: "/resume",
  },
  {
    title: "Research together",
    body: "For collaborators working with datasets, experiments, validation methods, system reliability, market structure, or applied engineering questions.",
    cta: "Discuss research →",
    href: "mailto:ram@aixionlab.com?subject=Aixion%20Lab%20research",
  },
];

export default function CollaboratePage() {
  return (
    <main className="collaborate-editorial-page">
      <section className="collaborate-hero">
        <p className="editorial-kicker">COLLABORATE</p>
        <div className="collaborate-hero-grid">
          <h1>Bring us the problem. Not an AI requirement.</h1>
          <p>
            The better starting point is usually the problem itself: what is slow, unreliable, difficult to validate, dependent on too much manual judgment, or impossible to trust with the evidence you have today?
          </p>
        </div>
      </section>

      <section className="collaborate-paths" aria-label="Ways to collaborate">
        {paths.map((path, index) => (
          <article key={path.title}>
            <span>0{index + 1}</span>
            <h2>{path.title}</h2>
            <p>{path.body}</p>
            {path.href.startsWith("/") ? (
              <Link href={path.href}>{path.cta}</Link>
            ) : (
              <a href={path.href}>{path.cta}</a>
            )}
          </article>
        ))}
      </section>

      <section className="collaborate-fit">
        <div>
          <p className="editorial-kicker">GOOD PROBLEMS TO BRING</p>
          <h2>A useful engagement starts with friction that can be observed.</h2>
        </div>
        <div className="collaborate-fit-grid">
          <article>
            <h3>Good fit</h3>
            <ul>
              <li>an unreliable workflow</li>
              <li>a difficult technical or validation problem</li>
              <li>weak observability or unclear failure behaviour</li>
              <li>high manual effort with repeatable structure</li>
              <li>an idea that needs evidence before larger investment</li>
            </ul>
          </article>
          <article>
            <h3>Probably not the right fit</h3>
            <ul>
              <li>adding AI only because it is fashionable</li>
              <li>generic marketing or content production</li>
              <li>projects with no measurable operating problem</li>
              <li>work where speed matters more than reliability or understanding</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="collaborate-cta">
        <div>
          <p className="editorial-kicker">START</p>
          <h2>Describe the problem in plain language.</h2>
        </div>
        <div>
          <p>You do not need a finished specification. A short description of the current process, the failure, and what a better outcome would look like is enough to start.</p>
          <a className="collaborate-primary-link" href="mailto:ram@aixionlab.com?subject=Start%20a%20conversation%20with%20Aixion%20Lab">Start a conversation →</a>
        </div>
      </section>
    </main>
  );
}
