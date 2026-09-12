import type { Metadata } from "next";
import Link from "next/link";
import { Opening } from "@/components/compositions";
import { PrintButton } from "@/components/shell";
import { capabilities, projects, site } from "@/lib/content";
export const metadata: Metadata = { title: "Résumé" };
export default function Resume() {
  return (
    <div className="resume">
      <Opening
        label="Résumé / public engineering profile"
        title="Ram Golladi"
        copy="Quality Engineering · Automation · Reliable Systems · Applied AI"
      />
      <section className="shell resume-body">
        <div className="actions">
          <PrintButton />
          <a className="text-link" href={site.linkedin}>
            Professional experience on LinkedIn ↗
          </a>
        </div>
        <p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        <h2>Profile</h2>
        <p>
          Quality and automation engineer whose work spans real-time systems,
          reliability, research infrastructure and human-controlled AI
          workflows. Aixion Lab brings this independent engineering work
          together.
        </p>
        <h2>Capabilities</h2>
        {capabilities.map(([title, copy]) => (
          <p key={title}>
            <strong>{title}.</strong> {copy}
          </p>
        ))}
        <h2>Selected engineering work</h2>
        {projects.map((p) => (
          <article key={p.slug}>
            <h3>{p.name}</h3>
            <p>
              {p.subtitle}. {p.state}.
            </p>
            <p>{p.intro}</p>
            <Link className="text-link" href={`/work/${p.slug}`}>
              Inspect the project →
            </Link>
          </article>
        ))}
        <h2>Opportunity interests</h2>
        <p>
          Senior SDET, QA automation, quality engineering, test architecture,
          reliability, AI testing and applied-AI roles with strong validation
          requirements.
        </p>
        <p className="caption">
          This printable public profile summarizes the work shown on this site.
          Employment history and dates are available through LinkedIn.
        </p>
      </section>
    </div>
  );
}
