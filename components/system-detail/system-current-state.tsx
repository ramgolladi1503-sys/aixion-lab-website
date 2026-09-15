import { SystemDetailData } from "@/lib/system-detail-data";

export function SystemCurrentState({ data }: { data: SystemDetailData }) {
  const { currentState, closingPrinciple } = data;

  return (
    <section className="system-section-shell" aria-label="Current State and Operating Principles">
      <div className="system-current-grid">
        <div className="system-current-block">
          <p className="system-section-label">CURRENT STATE</p>
          <h3>{currentState.headline}</h3>
          <p>{currentState.body}</p>
        </div>

        {closingPrinciple ? (
          <div className="system-current-block">
            <p className="system-section-label">GOVERNING PRINCIPLE</p>
            <h3>{closingPrinciple.headline}</h3>
            <p>{closingPrinciple.body}</p>
          </div>
        ) : (
          <div className="system-current-block">
            <p className="system-section-label">DISCIPLINE</p>
            <h3>Traceability before scale.</h3>
            <p>
              Each experiment must pass evidence verification and validation gates before it can be integrated into production-grade systems.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
