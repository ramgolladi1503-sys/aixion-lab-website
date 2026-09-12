import Link from "next/link";
import { capabilities, projects, site } from "@/lib/content";
import { EvidenceStrip } from "./evidence";
import { ProgressScene } from "./motion";
export function Opening({
  label,
  title,
  copy,
}: {
  label: string;
  title: string;
  copy?: string;
}) {
  return (
    <section className="opening shell" data-reveal>
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      {copy && <p className="lead">{copy}</p>}
    </section>
  );
}
export function SectionTitle({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-heading" data-reveal>
      <div>
        <p className="eyebrow">{label}</p>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}
export function Statement({ children }: { children: React.ReactNode }) {
  return (
    <section className="statement" data-reveal>
      <div className="shell">
        <span className="statement-mark" aria-hidden="true">
          ＋
        </span>
        <h2>{children}</h2>
        <p className="eyebrow">AIXION LAB / A WAY OF WORKING</p>
      </div>
    </section>
  );
}
export function Material({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`material ${compact ? "material-compact" : ""}`}
      aria-hidden="true"
    >
      <div className="material-light" />
      <div className="material-disc" />
      <div className="material-slab slab-back" />
      <div className="material-slab slab-mid" />
      <div className="material-slab slab-front" />
      <div className="material-line" />
    </div>
  );
}
export function Architecture({
  nodes,
  kind = "tradebot",
}: {
  nodes: string[];
  kind?: string;
}) {
  return (
    <figure className={`architecture ${kind}`}>
      <div className="visual-heading">
        <span>System architecture</span>
        <span aria-hidden="true">↗</span>
      </div>
      <ol>
        {nodes.map((node, i) => (
          <li key={node} data-layer={i}>
            <span className="node-index">0{i + 1}</span>
            <strong>{node}</strong>
            <span className="node-line" aria-hidden="true" />
          </li>
        ))}
      </ol>
      <figcaption>
        Simplified from the public repository. <br />A system diagram, not a
        live runtime display.
      </figcaption>
    </figure>
  );
}
export function Capabilities({ items = capabilities }: { items?: string[][] }) {
  return (
    <div className={`capabilities ${items.length === 6 ? "six" : ""}`}>
      {items.map(([title, copy], i) => (
        <article
          key={title}
          data-reveal
          style={{ "--delay": `${i * 85}ms` } as React.CSSProperties}
        >
          <span className="eyebrow">0{i + 1}</span>
          <h3>{title}</h3>
          <p>{copy}</p>
        </article>
      ))}
    </div>
  );
}
export function Flagship({
  project,
  index,
  detail = false,
}: {
  project: (typeof projects)[number];
  index: number;
  detail?: boolean;
}) {
  return (
    <section className="flagship shell" id={project.slug}>
      <div className="project-heading" data-reveal>
        <p className="eyebrow">0{index + 1} / FLAGSHIP SYSTEM</p>
        <h2>{project.name}</h2>
        <p className="lead">{project.subtitle}</p>
      </div>
      <ProgressScene className="flagship-grid">
        <aside className="project-sticky">
          <span className="status">
            <i />
            {project.state}
          </span>
          <Architecture nodes={project.nodes} kind={project.slug} />
          {!detail && (
            <Link className="text-link" href={`/work/${project.slug}`}>
              Explore {index === 0 ? "TradeBot" : "Control Tower"}{" "}
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </aside>
        <div className="project-narrative">
          {(detail
            ? project.chapters
            : [
                project.chapters[0],
                project.chapters[3],
                project.chapters[5],
                project.chapters[8],
              ]
          ).map(([label, title, copy], i) => (
            <article key={label} data-step data-reveal>
              <p className="eyebrow">
                {detail ? `${String(i + 1).padStart(2, "0")} / ` : ""}
                {label}
              </p>
              <h3>{title}</h3>
              <p>{copy}</p>
              {label === "Proof" && (
                <EvidenceStrip sources={[project.evidence]} />
              )}
            </article>
          ))}
        </div>
      </ProgressScene>
      <EvidenceStrip
        sources={index === 0 ? ["tradebot", "robustness", "regime"] : ["tower"]}
      />
    </section>
  );
}
export function Opportunity() {
  return (
    <section className="opportunity shell" data-reveal>
      <p className="eyebrow">Open to opportunities</p>
      <h2>
        Open to the next
        <br />
        engineering challenge.
      </h2>
      <p className="lead">
        I’m interested in roles where quality engineering and systems work
        reinforce each other: SDET, reliability, AI testing, test architecture,
        automation and applied-AI engineering.
      </p>
      <div className="actions">
        <Link className="button" href="/resume">
          View Résumé <span aria-hidden="true">↗</span>
        </Link>
        <Link className="text-link" href="/contact">
          Contact Me <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
export function Socials() {
  return (
    <div className="socials">
      <Link href="/resume">Résumé ↗</Link>
      <a href={site.github}>GitHub ↗</a>
      <a href={site.linkedin}>LinkedIn ↗</a>
    </div>
  );
}
export function Layers() {
  return (
    <div className="layers" aria-label="Accumulating capabilities">
      {[
        "Quality",
        "Automation",
        "Systems",
        "Research",
        "Applied AI",
        "Aixion Lab",
      ].map((label, i) => (
        <div
          key={label}
          data-layer={i}
          data-reveal
          className="layer"
          style={{ "--layer": i } as React.CSSProperties}
        >
          <span>0{i + 1}</span>
          <strong>{label}</strong>
          <span aria-hidden="true">＋</span>
        </div>
      ))}
    </div>
  );
}
