import type { Metadata } from "next";
import Link from "next/link";
import { systems } from "@/lib/site-data";
import { SectionHeading, StateTag } from "@/components/ui";

export const metadata: Metadata = {
  title: "Systems Registry",
  description: "The engineered systems, tools and platforms being built inside Aixion Lab.",
};

export default function SystemsPage() {
  return (
    <>
      <section className="page-hero systems-hero">
        <div className="shell page-hero-grid">
          <div>
            <p className="eyebrow">AIXION LAB · SYSTEMS</p>
            <h1>Systems Registry</h1>
            <p className="lede">The engineered systems, tools and platforms being built inside Aixion Lab. Maturity is shown explicitly; research is not dressed up as production.</p>
          </div>
          <div className="panel meta-board">
            <div><span>Authority</span><strong>Blueprint v1.0</strong></div>
            <div><span>State model</span><strong>Research → Operating</strong></div>
            <div><span>Public boundary</span><strong>Evidence-led summaries</strong></div>
            <div><span>Flagship</span><strong>TradeBot</strong></div>
          </div>
        </div>
      </section>

      <section className="section-tight registry-section">
        <div className="shell">
          <SectionHeading eyebrow="REGISTRY" title="Four systems. Explicit maturity." copy="Each entry carries a system ID, maturity, current gate and public-safe focus so project status is immediately scannable." />
          <div className="registry">
            {systems.map(system => (
              <article className="registry-row" key={system.id}>
                <span className="system-id">{system.id}</span>
                <div>
                  <h3>{system.name}</h3>
                  <p>{system.descriptor}</p>
                </div>
                <div className="registry-hide-mobile">
                  <span className="registry-label">Domain</span>
                  <p>{system.domain}</p>
                </div>
                <StateTag state={system.state} />
                <div className="registry-hide-tablet">
                  <span className="registry-label">Current gate</span>
                  <p>{system.currentGate}</p>
                </div>
                <Link className="text-link" href={`/systems/${system.slug}`}>View →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
