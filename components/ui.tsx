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
    <article className={`system-card accent-${system.accent}`}>
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
    <div className="progress-lane">
      <strong>{label}</strong>
      <div className="lane-track">
        {stages.map((item, index) => (
          <div className={`lane-stage ${index <= activeIndex ? "reached" : ""} ${index === activeIndex ? "current" : ""}`} key={item}>
            <i aria-hidden="true" />
            <span>{item}</span>
          </div>
        ))}
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

export function AbstractScene({ variant = "sage" }: { variant?: "sage" | "blue" | "lavender" | "peach" }) {
  return (
    <div className={`abstract-scene scene-${variant}`} aria-hidden="true">
      <span className="scene-platform platform-a" />
      <span className="scene-platform platform-b" />
      <span className="scene-platform platform-c" />
      <span className="scene-orb" />
      <span className="scene-grid" />
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
