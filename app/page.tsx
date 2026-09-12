import Link from "next/link";
import { Arrival, ProgressScene } from "@/components/motion";
import {
  Capabilities,
  Material,
  SectionTitle,
  Architecture,
  Opportunity,
  Socials,
  Layers,
} from "@/components/compositions";
import { EvidenceStrip } from "@/components/evidence";
import { projects, processSteps, research } from "@/lib/content";
export default function Home() {
  return (
    <>
      <section className="hero shell">
        <Arrival />
        <div className="hero-copy">
          <p className="eyebrow">AIXION LAB</p>
          <h1>
            Building systems that have to survive more than the happy path.
          </h1>
          <p className="lead">
            I’m Ram, a quality and automation engineer. My work has expanded
            into real-time systems, reliability, applied AI and research.
          </p>
          <p className="hero-note">
            Aixion Lab is where I build, test, challenge and document those
            systems.
          </p>
          <div className="actions">
            <Link className="button" href="/work">
              Explore My Work <span aria-hidden="true">→</span>
            </Link>
            <Link className="text-link" href="/journey">
              See My Journey <span aria-hidden="true">→</span>
            </Link>
          </div>
          <Socials />
        </div>
        <div className="hero-art">
          <Material />
          <div className="art-caption">
            <span>
              Build. Question.
              <br />
              Understand.
            </span>
            <span aria-hidden="true">01 — ∞</span>
          </div>
        </div>
      </section>
      <section className="section shell">
        <SectionTitle
          label="What I work on"
          title="Different disciplines. One engineering instinct."
        />
        <Capabilities />
      </section>
      <section className="section selected shell">
        <SectionTitle
          label="Selected work"
          title="Real systems. Real problems."
        >
          <Link className="text-link" href="/work">
            View all work →
          </Link>
        </SectionTitle>
        {projects.map((p, i) => (
          <article
            className={`selected-project selected-${i}`}
            key={p.slug}
            data-reveal
          >
            <div className="selected-copy">
              <p className="eyebrow">
                0{i + 1} / {p.state}
              </p>
              <h3>{p.name}</h3>
              <p className="project-subtitle">{p.subtitle}</p>
              <p>{p.intro}</p>
              <Link className="text-link" href={`/work/${p.slug}`}>
                Explore {i ? "Control Tower" : "TradeBot"} →
              </Link>
            </div>
            <Architecture nodes={p.nodes} kind={p.slug} />
          </article>
        ))}
      </section>
      <section className="section process-section">
        <div className="shell">
          <SectionTitle
            label="How I work"
            title="The first implementation is a starting point."
          />
          <ProgressScene className="process-list">
            {processSteps.map(([title, copy], i) => (
              <article key={title} data-step data-reveal>
                <span className="eyebrow">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <span aria-hidden="true">↘</span>
              </article>
            ))}
          </ProgressScene>
        </div>
      </section>
      <section className="section shell">
        <SectionTitle label="Research preview" title="Questions worth testing.">
          <Link className="text-link" href="/research">
            Explore Research →
          </Link>
        </SectionTitle>
        <div className="research-preview">
          {[research[0], research[1], research[3]].map((r, i) => (
            <Link key={r.id} href={`/research#${r.id}`} data-reveal>
              <span className="eyebrow">
                0{i + 1} / {r.title}
              </span>
              <h3>{r.question}</h3>
              <span className="preview-line" aria-hidden="true" />
              <span className="text-link">Explore question →</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="section proof-section">
        <div className="shell">
          <SectionTitle
            label="Behind the claims"
            title="The work is open to inspection."
          />
          <p className="lead">
            Architecture, implementation and a hypothesis that didn’t survive.
            The limitations are part of the record.
          </p>
          <EvidenceStrip sources={["tradebot", "tower", "robustness"]} />
        </div>
      </section>
      <section className="section shell journey-preview">
        <div data-reveal>
          <p className="eyebrow">A continuing journey</p>
          <h2>
            The technology changed.
            <br />
            The question didn’t.
          </h2>
          <p className="lead">How do we know this actually works?</p>
          <Link className="text-link" href="/journey">
            Explore My Journey →
          </Link>
        </div>
        <Layers />
      </section>
      <Opportunity />
    </>
  );
}
