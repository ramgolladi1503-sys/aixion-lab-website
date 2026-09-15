import Link from "next/link";
import { SystemDetailData } from "@/lib/system-detail-data";

export function SystemHero({ data }: { data: SystemDetailData }) {
  const { hero, publicState } = data;

  return (
    <section className="system-hero-section" aria-label={`${data.name} Hero`}>
      <div className="system-hero-header">
        <div>
          <p className="system-hero-eyebrow">{hero.eyebrow}</p>
          <h1 className="system-hero-title">{hero.title}</h1>
          <p className="system-hero-proposition">{hero.proposition}</p>
          <p className="system-hero-summary">{hero.summary}</p>
          <div className="system-hero-actions">
            <Link href={hero.primaryCta.href} className="system-btn-primary">
              {hero.primaryCta.label}
            </Link>
            <Link href={hero.secondaryCta.href} className="system-btn-secondary">
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>

        <div>
          <span className={`public-state-badge state-${publicState.toLowerCase()}`}>
            <i className="public-state-dot" />
            {publicState}
          </span>
        </div>
      </div>

      <div className="system-hero-media-wrap">
        <img
          src={hero.image}
          alt={hero.imageAlt}
          className="system-hero-media"
          loading="eager"
        />
      </div>
    </section>
  );
}
