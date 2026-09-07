import type { Metadata } from "next";
import { systems } from "@/lib/site-data";
import { SectionHeading } from "@/components/ui";
import { FlipCard } from "@/components/flip-card";

export const metadata: Metadata = {
  title: "Systems Registry",
  description: "The engineered systems, tools and platforms being built inside Aixion Lab.",
};

export default function SystemsPage() {
  return (
    <>
      <section className="page-hero systems-reference-hero">
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

      <section className="section-tight systems-registry-section">
        <div className="shell">
          <SectionHeading eyebrow="THE WORKING MAP" title="What is being built, and what is proven." copy="Each system carries its current state, evidence boundary and next gate. The registry is a live view of capability in progress, not a gallery of finished claims." />
          <div className="flip-card-deck systems-card-deck">
            {systems.map(system => (
              <FlipCard key={system.id} index={systems.indexOf(system)} eyebrow={system.domain} title={system.name} front={`${system.descriptor} Current gate: ${system.currentGate}.`} backLabel={system.state} back={system.domain} state={system.state} href={`/systems/${system.slug}`} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
