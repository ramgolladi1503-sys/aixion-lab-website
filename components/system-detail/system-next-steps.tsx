import Link from "next/link";
import { SystemDetailData, systemDetails } from "@/lib/system-detail-data";

export function SystemNextSteps({ data }: { data: SystemDetailData }) {
  const { closingCtas, relatedSlug } = data;
  const relatedSystem = systemDetails[relatedSlug];

  return (
    <section className="system-next-section" aria-label="Next Steps and Related Work">
      <div>
        <p className="system-section-label">CONTINUE EXPLORING</p>
        <h2 className="system-next-heading">
          {relatedSystem ? `Next: ${relatedSystem.name}` : "Explore the Lab"}
        </h2>
        <p className="system-next-sub">
          {relatedSystem
            ? relatedSystem.hero.proposition
            : "Review active validation telemetry, research candidates, and open engineering notes."}
        </p>
      </div>

      <div className="system-next-actions">
        {relatedSystem && (
          <Link href={`/systems/${relatedSystem.slug}`} className="system-btn-primary">
            Explore {relatedSystem.name} →
          </Link>
        )}
        <Link href={closingCtas.secondary.href} className="system-btn-secondary">
          {closingCtas.secondary.label}
        </Link>
      </div>
    </section>
  );
}
