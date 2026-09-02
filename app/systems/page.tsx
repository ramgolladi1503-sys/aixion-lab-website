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
        <div className="shell systems-hero-copy">
          <p className="eyebrow">AIXION LAB · SYSTEMS</p>
          <h1>Systems Registry</h1>
          <p className="lede">Four engineered systems, each with an explicit maturity state, current gate and public-safe focus. Research is not dressed up as production.</p>
        </div>
      </section>

      <section className="section-tight registry-section">
        <div className="shell">
          <SectionHeading eyebrow="REGISTRY" title="Four systems. Explicit maturity." copy="The registry is the authority. Each row carries only the information needed to understand the system and decide whether to inspect it further." />
          <div className="registry">
            {systems.map(system => (
              <article className="registry-row" key={system.id}>
                <span className="system-id">{system.id}</span>
                <div>
                  <h3>{system.name}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.55 }}>{system.descriptor}</p>
                </div>
                <div className="registry-hide-mobile">
                  <span className="registry-label">Domain</span>
                  <p style={{ fontSize: 14, lineHeight: 1.55 }}>{system.domain}</p>
                </div>
                <StateTag state={system.state} />
                <div className="registry-hide-tablet">
                  <span className="registry-label">Current gate</span>
                  <p style={{ fontSize: 14, lineHeight: 1.55 }}>{system.currentGate}</p>
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
