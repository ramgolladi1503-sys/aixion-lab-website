import Link from "next/link";
import type { ReactNode } from "react";
import type { SystemRecord } from "@/lib/site-data";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function SectionHeading({ eyebrow, title, copy }: { eyebrow?: string; title: string; copy?: string }) {
  return (
    <div className="section-heading">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  );
}

export function StateTag({ state }: { state: string }) {
  return <span className={`state-tag state-${state.toLowerCase().replaceAll(" ", "-")}`}>{state}</span>;
}

export function SystemCard({ system }: { system: SystemRecord }) {
  return (
    <article className="system-card">
      <div className="system-card-top">
        <span className="system-id">{system.id}</span>
        <StateTag state={system.state} />
      </div>
      <h3>{system.name}</h3>
      <p>{system.descriptor}</p>
      <dl className="mini-meta">
        <div><dt>Domain</dt><dd>{system.domain}</dd></div>
        <div><dt>Current gate</dt><dd>{system.currentGate}</dd></div>
      </dl>
      <Link className="text-link" href={`/systems/${system.slug}`}>View system →</Link>
    </article>
  );
}

export function ProgressLane({ label, stage }: { label: string; stage: "RESEARCH" | "BUILDING" | "VALIDATING" | "OPERATING" }) {
  const stages = ["RESEARCH", "BUILDING", "VALIDATING", "OPERATING"] as const;
  const activeIndex = stages.indexOf(stage);
  return (
    <div className="progress-lane-modern">
      <div className="progress-lane-label">
        <strong>{label}</strong>
        <span className={`lane-current-tag state-${stage.toLowerCase()}`}>{stage}</span>
      </div>
      <div className="lane-capsule-track" role="group" aria-label={`${label} maturity progress`}>
        {stages.map((item, index) => {
          const isReached = index <= activeIndex;
          const isCurrent = index === activeIndex;
          return (
            <div
              className={`lane-segment ${isReached ? "is-reached" : ""} ${isCurrent ? "is-current" : ""}`}
              key={item}
            >
              <div className="lane-segment-bar" />
              <span className="lane-segment-text">{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ArchitectureFlow({ nodes }: { nodes: string[] }) {
  return (
    <div className="architecture-flow" role="list" aria-label="System architecture flow">
      {nodes.map((node, index) => (
        <div className="architecture-step" role="listitem" key={node}>
          <span>{node}</span>
          {index < nodes.length - 1 ? <b aria-hidden="true">→</b> : null}
        </div>
      ))}
    </div>
  );
}

export function CareerStrip({ skills }: { skills: string[] }) {
  return (
    <div className="career-only career-strip">
      <span>Career translation</span>
      <div>{skills.map(skill => <i key={skill}>{skill}</i>)}</div>
    </div>
  );
}
