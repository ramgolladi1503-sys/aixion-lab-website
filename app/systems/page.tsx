import Link from "next/link";
import { systems } from "@/lib/site-data";
import { systemDetails } from "@/lib/system-detail-data";

const systemCardImages: Record<string, string> = {
  tradebot: "/textures/systems/premium-tradebot-card.svg",
  "control-core": "/textures/systems/premium-control-card.svg",
  analytics: "/textures/systems/premium-analytics-card.svg",
  automation: "/textures/systems/premium-automation-card.svg",
};

const publicHref = (slug: string) => slug === "control-core" ? "/systems/control-tower" : `/systems/${slug}`;

export default function SystemsPage() {
  const flagships = systems.filter(system => system.slug === "tradebot" || system.slug === "control-core");
  const experiments = systems.filter(system => system.slug === "analytics" || system.slug === "automation");

  return (
    <main className="mock-systems-page">
      <section className="mock-systems-intro">
        <div>
          <p className="mock-kicker">WORK</p>
          <h1>Systems built to earn trust.</h1>
        </div>
        <p>From live market systems to governed AI orchestration, Aixion builds systems that are testable, observable and honest about what remains unproven.</p>
      </section>

      <section className="mock-system-group" aria-labelledby="flagship-title">
        <div className="mock-group-title-row">
          <h2 id="flagship-title">Flagship Systems</h2>
          <p>Active engineering, explicit maturity, evidence behind the claims.</p>
        </div>
        <div className="mock-flagship-grid">
          {flagships.map(system => {
            const detail = systemDetails[system.slug];
            return (
              <Link key={system.id} href={publicHref(system.slug)} className="mock-project-card flagship">
                <div className="mock-project-copy">
                  <div>
                    <h3>{system.name}</h3>
                    <p>{system.descriptor}</p>
                  </div>
                  <span className={`public-state-badge state-${detail.publicState.toLowerCase()}`}><i className="public-state-dot" />{detail.publicState}</span>
                </div>
                <div className="mock-project-media"><img src={systemCardImages[system.slug]} alt={`${system.name} system visual`} /></div>
                <span className="mock-project-cta">Explore {system.name === "Aixion Control Tower" ? "Control Tower" : system.name} →</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mock-system-group exploratory" aria-labelledby="experimental-title">
        <div className="mock-group-title-row">
          <h2 id="experimental-title">Exploratory Work</h2>
          <p>Useful directions that stay experimental until the evidence supports a stronger claim.</p>
        </div>
        <div className="mock-experiment-grid">
          {experiments.map(system => {
            const detail = systemDetails[system.slug];
            return (
              <Link key={system.id} href={publicHref(system.slug)} className="mock-project-card experiment">
                <div className="mock-project-copy">
                  <div><h3>{system.name}</h3><p>{system.descriptor}</p></div>
                  <span className={`public-state-badge state-${detail.publicState.toLowerCase()}`}><i className="public-state-dot" />{detail.publicState}</span>
                </div>
                <div className="mock-project-media"><img src={systemCardImages[system.slug]} alt={`${system.name} system visual`} /></div>
                <span className="mock-project-cta">Explore →</span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
