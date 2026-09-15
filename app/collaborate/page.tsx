import Link from "next/link";

const paths = [
  { title: "Build with Aixion", body: "For teams with a difficult workflow, automation problem, AI-assisted product idea, decision-support need, or validation challenge that deserves more than a quick prototype.", cta: "Discuss a project ↗", href: "mailto:ram@aixionlab.com?subject=Aixion%20Lab%20project", external: true },
  { title: "Work with Ram", body: "For engineering roles where quality, automation, applied AI, research systems, or forward-deployed problem solving are central to the work.", cta: "View professional profile →", href: "/resume", external: false },
  { title: "Research together", body: "For collaborators working with datasets, experiments, validation methods, system reliability, market structure, or applied engineering questions.", cta: "Discuss research ↗", href: "mailto:ram@aixionlab.com?subject=Aixion%20Lab%20research", external: true },
];

export default function CollaboratePage() {
  return (
    <main className="mock-collaborate-page">
      <section className="mock-collaborate-hero">
        <div><p className="mock-kicker">COLLABORATE</p><h1>Bring us the problem.<br />Not an AI requirement.</h1></div>
        <p>The better starting point is usually the problem itself: what is slow, unreliable, difficult to validate, dependent on too much manual judgment, or impossible to trust with the evidence you have today?</p>
      </section>

      <section className="mock-collab-paths" aria-label="Ways to collaborate">
        {paths.map(path => (
          <article key={path.title}>
            <h2>{path.title}</h2>
            <p>{path.body}</p>
            {path.external ? <a href={path.href} target="_blank" rel="noreferrer">{path.cta}</a> : <Link href={path.href}>{path.cta}</Link>}
          </article>
        ))}
      </section>

      <section className="mock-fit-section">
        <div className="mock-fit-intro"><p className="mock-kicker">GOOD PROBLEMS TO BRING</p><h2>A useful engagement starts with friction that can be observed.</h2></div>
        <div className="mock-fit-grid">
          <article><h3>Good fit</h3><ul><li>an unreliable workflow or manual process</li><li>a difficult technical or validation problem</li><li>weak observability or unclear failure behaviour</li><li>repeatable effort that should be reduced</li><li>an idea that needs evidence before larger investment</li></ul></article>
          <article><h3>Probably not the right fit</h3><ul><li>adding AI only because it is fashionable</li><li>generic marketing or content production</li><li>projects with no measurable operating problem</li><li>speed at the expense of reliability or understanding</li></ul></article>
        </div>
      </section>

      <section className="mock-collab-cta">
        <div><span aria-hidden="true">✉</span><strong>Start a conversation</strong></div>
        <a href="mailto:ram@aixionlab.com?subject=Start%20a%20conversation%20with%20Aixion%20Lab" target="_blank" rel="noreferrer">Describe the problem in plain language ↗</a>
      </section>
    </main>
  );
}
