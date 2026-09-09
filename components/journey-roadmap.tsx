import { journey } from "@/lib/site-data";

const journeyMeta: Record<string, { role: string; focus: string; artifact: string }> = {
  "01": { role: "SDET / QA Core", focus: "Shift-left test harnesses & defect prevention", artifact: "Reproducibility harness" },
  "02": { role: "DevOps & SRE", focus: "Observable CI/CD pipelines & telemetry contracts", artifact: "Automated test gate" },
  "03": { role: "Software Architect", focus: "Deterministic API boundaries & service isolation", artifact: "Microservice contract" },
  "04": { role: "Data Engineering", focus: "Real-time state streaming, transformations & lakes", artifact: "Data quality pipeline" },
  "05": { role: "Applied ML Systems", focus: "Statistical validation, freeze & holdout rigor", artifact: "Frozen hypothesis model" },
  "06": { role: "Autonomous Systems", focus: "Policy enforcement, tool sandboxing & human control", artifact: "Authority boundary" },
  "07": { role: "Aixion Lab Founder", focus: "Full-stack synthesis of intelligence, governance & evidence", artifact: "Aixion public runtime" },
};

export function JourneyRoadmap() {
  return (
    <div className="roadmap-container" role="feed" aria-label="Engineering Journey Roadmap">
      <div className="roadmap-spine" aria-hidden="true" />
      <div className="roadmap-steps-list">
        {journey.map(([number, title, copy], index) => {
          const meta = journeyMeta[number] || {
            role: "Engineering Core",
            focus: "System development & observability",
            artifact: "Verified milestone",
          };
          const isEven = index % 2 === 1;

          return (
            <article
              className={`roadmap-step-row ${isEven ? "is-alt" : ""}`}
              key={number}
              aria-labelledby={`roadmap-title-${number}`}
            >
              <div className="roadmap-step-card">
                <div className="roadmap-card-glass-accent" aria-hidden="true" />
                <div className="roadmap-card-top">
                  <span className="roadmap-num-chip">{number}</span>
                  <span className="roadmap-role-tag">{meta.role}</span>
                </div>
                <h3 id={`roadmap-title-${number}`} className="roadmap-card-title">{title}</h3>
                <p className="roadmap-card-copy">{copy}</p>
                <div className="roadmap-card-footer">
                  <span className="roadmap-focus-label">FOCUS: <strong>{meta.focus}</strong></span>
                  <span className="roadmap-artifact-chip">{meta.artifact}</span>
                </div>
              </div>

              <div className="roadmap-node-hub" aria-hidden="true">
                <div className="roadmap-node-dot">
                  <div className="roadmap-node-inner" />
                </div>
                <div className="roadmap-node-branch" />
              </div>

              <div className="roadmap-step-spacer" aria-hidden="true" />
            </article>
          );
        })}
      </div>
    </div>
  );
}
