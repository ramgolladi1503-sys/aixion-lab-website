import { SystemDetailData } from "@/lib/system-detail-data";

export function SystemProblem({ data }: { data: SystemDetailData }) {
  const { problem } = data;

  return (
    <section className="system-section-shell" aria-label="Problem Context">
      <div className="system-problem-grid">
        <div>
          <p className="system-section-label">{problem.label}</p>
          <h2 className="system-problem-headline">{problem.headline}</h2>
          <div className="system-problem-body">{problem.body}</div>
        </div>

        {problem.supportingNote && (
          <aside className="system-problem-aside">
            <p className="system-section-label" style={{ marginBottom: "0.5rem", fontSize: "0.7rem" }}>
              OPERATIONAL CONTEXT
            </p>
            <p>{problem.supportingNote}</p>
          </aside>
        )}
      </div>
    </section>
  );
}
