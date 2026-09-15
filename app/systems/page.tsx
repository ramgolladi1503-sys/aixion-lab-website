import Link from "next/link";
import { systems } from "@/lib/site-data";
import { systemDetails } from "@/lib/system-detail-data";

const systemCardImages: Record<string, string> = {
  tradebot: "/textures/systems/premium-tradebot-card.svg",
  "control-core": "/textures/systems/premium-control-card.svg",
  analytics: "/textures/systems/premium-analytics-card.svg",
  automation: "/textures/systems/premium-automation-card.svg",
};

const publicHref = (slug: string) =>
  slug === "control-core" ? "/systems/control-tower" : `/systems/${slug}`;

export default function SystemsPage() {
  const flagships = systems.filter(
    system => system.slug === "tradebot" || system.slug === "control-core",
  );
  const experiments = systems.filter(
    system => system.slug === "analytics" || system.slug === "automation",
  );

  return (
    <div className="systems-page">
      <header className="systems-page-intro compact-intro">
        <p className="systems-page-eyebrow">WORK / SYSTEMS</p>
        <h1>Systems built to earn trust.</h1>
        <p className="systems-page-lede">
          TradeBot and Aixion Control Tower are the two flagship systems. They are moving through active engineering and validation while the remaining work stays deliberately experimental until it earns a stronger claim.
        </p>
      </header>

      <section className="systems-flagships" aria-labelledby="flagship-heading">
        <div className="systems-flagship-label-row">
          <p className="systems-page-eyebrow" id="flagship-heading">FLAGSHIP SYSTEMS</p>
          <p>Dedicated architecture, evidence, and explicit maturity.</p>
        </div>

        <div className="flagship-list">
          {flagships.map((system, index) => {
            const detail = systemDetails[system.slug];
            const reverse = index % 2 === 1;

            return (
              <Link
                key={system.id}
                href={publicHref(system.slug)}
                className={`flagship-feature-row ${reverse ? "reverse" : ""}`}
              >
                <div className="flagship-media-col">
                  <img src={systemCardImages[system.slug]} alt={`${system.name} visual`} />
                </div>

                <div className="flagship-info-col">
                  <div className="flagship-kicker-row">
                    <span className="flagship-index">FLAGSHIP 0{index + 1}</span>
                    <span className={`public-state-badge state-${detail.publicState.toLowerCase()}`}>
                      <i className="public-state-dot" />
                      {detail.publicState}
                    </span>
                  </div>
                  <h2 className="flagship-card-title">{system.name}</h2>
                  <p className="flagship-proposition">{detail.hero.proposition}</p>
                  <p className="flagship-card-desc">{system.descriptor}</p>
                  <span className="flagship-card-link">Explore system →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="systems-experiments" aria-labelledby="experimental-heading">
        <div className="systems-section-heading compact">
          <div>
            <p className="systems-page-eyebrow">EXPERIMENTAL / EARLY WORK</p>
            <h2 id="experimental-heading">Useful ideas, without inflated claims.</h2>
          </div>
          <p>These projects remain exploratory. They are shown as working directions, not as finished flagship products.</p>
        </div>

        <div className="experimental-grid">
          {experiments.map(system => {
            const detail = systemDetails[system.slug];
            return (
              <Link key={system.id} href={publicHref(system.slug)} className="experimental-card">
                <div className="unseen-card-image-wrap">
                  <img src={systemCardImages[system.slug]} alt={`${system.name} visual`} className="unseen-card-image" />
                </div>
                <div className="experimental-card-copy">
                  <div className="experimental-card-head">
                    <h3 className="experimental-card-title">{system.name}</h3>
                    <span className={`public-state-badge state-${detail.publicState.toLowerCase()}`}>
                      <i className="public-state-dot" />
                      {detail.publicState}
                    </span>
                  </div>
                  <p>{system.descriptor}</p>
                  <span className="experimental-card-link">Explore direction →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
