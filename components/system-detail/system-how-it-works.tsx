import { SystemDetailData } from "@/lib/system-detail-data";

export function SystemHowItWorks({ data }: { data: SystemDetailData }) {
  const { howItWorks } = data;

  return (
    <section className="system-section-shell" id="how-it-works" aria-label="How the System Works">
      <div style={{ marginBottom: "3rem" }}>
        <p className="system-section-label">HOW IT WORKS</p>
        <p style={{
          fontFamily: "var(--font-sans)",
          fontSize: "1.25rem",
          color: "var(--unseen-stone)",
          maxWidth: "720px",
          lineHeight: 1.5,
          margin: 0
        }}>
          {howItWorks.intro}
        </p>
      </div>

      <div className="system-how-grid">
        {/* Sticky Visual Diagram / Supporting Media */}
        <div className="system-how-sticky-col">
          <div className="system-how-media-wrap">
            <img
              src={howItWorks.supportingImage}
              alt={howItWorks.supportingImageAlt}
              className="system-how-media"
              loading="lazy"
            />
          </div>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            color: "var(--unseen-muted)",
            marginTop: "0.8rem",
            letterSpacing: "0.08em"
          }}>
            SUPPORTING EVIDENCE LAYER · VERIFIABLE EXECUTION MAP
          </p>
        </div>

        {/* Scroll-Linked Architectural Progression */}
        <div className="system-how-steps">
          {howItWorks.steps.map(step => (
            <div key={step.number} className="system-how-step">
              <div className="system-how-step-num">{step.number} / ARCHITECTURE STAGE</div>
              <h3 className="system-how-step-title">{step.title}</h3>
              <p className="system-how-step-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
