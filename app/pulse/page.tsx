import type { Metadata } from "next";
import { systems } from "@/lib/site-data";
import labState from "@/content/lab-state.json";
import labActivity from "@/content/lab-activity.json";
import { SectionHeading, StateTag } from "@/components/ui";
import { AixionSignal } from "@/components/system-visuals";

export const metadata: Metadata = {
  title: "Aixion Pulse",
  description: "What the lab is building, testing and learning right now.",
};

export default function PulsePage() {
  const currentCycle = systems.map(system => {
    const evidence = labState.systems.find(item => item.slug === system.slug);
    return {
      ...system,
      latestMilestone: evidence?.latest_milestone ?? "Public evidence summary pending the next curated update.",
    };
  });
  const recentChanges = labActivity.entries.slice(0, 5);
  const archivedCount = Math.max(0, labActivity.entries.length - recentChanges.length);

  return (
    <>
      <section className="page-hero">
        <div className="shell page-hero-grid">
          <div>
            <p className="eyebrow">AIXION LAB · PULSE</p>
            <h1>The operational pulse of the lab.</h1>
            <p className="lede">What is active now, what changed recently, what evidence is newly available and what gate comes next. Pulse is curated public engineering state—not a raw changelog.</p>
            <AixionSignal compact />
          </div>
          <div className="panel meta-board pulse-meta">
            <div><span>Source model</span><strong>Curated manifests</strong></div>
            <div><span>Worklog update</span><strong>{labActivity.updated_at}</strong></div>
            <div><span>Raw commits / chats</span><strong>Never published as progress</strong></div>
            <div><span>Completion %</span><strong>Not used</strong></div>
          </div>
        </div>
      </section>

      <section className="section-tight" data-reveal="working-now">
        <div className="shell">
          <SectionHeading eyebrow="WORKING NOW" title="What is actively moving" copy="Meaningful work is published with its current state, the evidence we can safely show, and the next gate. Private details stay outside the public feed." />
          <div className="worklog-grid">
            {labActivity.active.map(item => (
              <article className="detail-card worklog-card worklog-card--active" key={item.id}>
                <div className="worklog-card-head">
                  <span className="system-id">{item.id} · {item.date}</span>
                  <StateTag state={item.state} />
                </div>
                <p className="eyebrow">{item.area} · {item.type}</p>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <dl className="worklog-evidence">
                  <div><dt>Public evidence</dt><dd>{item.evidence}</dd></div>
                  <div><dt>Next gate</dt><dd>{item.next_gate}</dd></div>
                </dl>
              </article>
            ))}
          </div>
          <p className="worklog-principle">{labActivity.principle}</p>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell">
          <SectionHeading eyebrow="SYSTEM STATE" title="Current cycle" copy="One compact register carries the state, current focus, latest public-safe evidence and next gate. A second maturity visualization would only repeat the same information." />
          <div className="pulse-now-grid">
            {currentCycle.map(system => (
              <article className="pulse-system-card" key={system.id}>
                <div className="system-card-top"><span className="system-id">{system.id}</span><StateTag state={system.state} /></div>
                <h3>{system.name}</h3>
                <dl>
                  <div><dt>Current focus</dt><dd>{system.currentFocus}</dd></div>
                  <div><dt>Latest evidence</dt><dd>{system.latestMilestone}</dd></div>
                  <div><dt>Next gate</dt><dd>{system.nextGate}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight" data-reveal="worklog-history">
        <div className="shell pulse-history">
          <SectionHeading eyebrow="RECENT PUBLIC CHANGES" title="Only changes that matter outside the repository" copy="The latest meaningful capability, evidence and authority changes remain visible here. Older history is deliberately de-emphasized so Pulse stays useful to a public visitor." />
          <div className="worklog-list">
            {recentChanges.map(item => (
              <article className="worklog-row" key={item.id}>
                <div className="worklog-row-meta">
                  <span>{item.date}</span>
                  <span>{item.area}</span>
                  <span>{item.type}</span>
                </div>
                <div className="worklog-row-copy">
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <p className="worklog-next"><strong>Why it matters / next gate:</strong> {item.next_gate}</p>
                </div>
                <StateTag state={item.state} />
              </article>
            ))}
          </div>
          {archivedCount > 0 ? <p className="pulse-archive-note">{archivedCount} older public milestones remain preserved in the source manifest and repository history; they are not repeated here because recency and relevance outrank completeness.</p> : null}
        </div>
      </section>
    </>
  );
}
