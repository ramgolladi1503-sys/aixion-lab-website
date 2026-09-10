"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="unseen-projects-section" style={{ paddingTop: "8rem" }}>
      <header className="unseen-projects-header">
        <h1 className="unseen-projects-title">About Aixion Lab</h1>
        <p style={{ maxWidth: "620px", margin: "0 auto 2.5rem", color: "var(--unseen-muted)", fontSize: "1.05rem" }}>
          Built by Ram. An independent engineering practice exploring high-assurance autonomy, real-time data, and governed intelligence.
        </p>
      </header>

      <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gap: "3.5rem" }}>
        <div style={{ 
          background: "#ffffff", 
          padding: "3.5rem", 
          borderRadius: "20px",
          border: "1px solid rgba(33, 33, 33, 0.08)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.03)"
        }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 400, margin: "0 0 1.2rem" }}>Engineering Philosophy</h2>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.6, color: "#444" }}>
            Real software systems must be verifiable, auditable, and resilient. In an era where AI is frequently packaged as black-box demos, Aixion Lab focuses on the missing bridges: formal validation, policy guards, inspectable traces, and human-in-the-loop authority.
          </p>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr", 
            gap: "2rem", 
            marginTop: "2.5rem", 
            paddingTop: "2rem",
            borderTop: "1px solid rgba(33, 33, 33, 0.08)"
          }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 500, margin: "0 0 0.5rem" }}>Direct Contact</h3>
              <p style={{ margin: 0, color: "var(--unseen-muted)", fontSize: "0.95rem" }}>
                ram@aixionlab.com
              </p>
              <p style={{ margin: "0.4rem 0 0", color: "var(--unseen-muted)", fontSize: "0.95rem" }}>
                github.com/ramgolladi1503-sys
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 500, margin: "0 0 0.5rem" }}>Recruiter Fast Path</h3>
              <p style={{ margin: 0, color: "var(--unseen-muted)", fontSize: "0.95rem", lineHeight: 1.4 }}>
                Review technical competencies, track record, and verified system evidence on the résumé page.
              </p>
              <div style={{ marginTop: "1rem" }}>
                <Link 
                  href="/resume"
                  style={{ 
                    textDecoration: "none", 
                    color: "var(--unseen-stone)", 
                    fontSize: "0.85rem", 
                    fontWeight: 500,
                    borderBottom: "1px solid var(--unseen-stone)",
                    paddingBottom: "0.2rem"
                  }}
                >
                  Open Résumé ↘
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
