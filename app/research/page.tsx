"use client";

import Link from "next/link";
import { researchNotes } from "@/lib/site-data";

export default function ResearchPage() {
  return (
    <div className="unseen-projects-section" style={{ paddingTop: "8rem" }}>
      <header className="unseen-projects-header">
        <h1 className="unseen-projects-title">Research & Validation</h1>
        <p style={{ maxWidth: "600px", margin: "0 auto 2.5rem", color: "var(--unseen-muted)", fontSize: "1.05rem" }}>
          Visible hypotheses, stress testing, and rejected assumptions. In this lab, research is not dressed up as production.
        </p>
      </header>

      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gap: "1px", background: "var(--unseen-border)" }}>
        {researchNotes.map((note) => (
          <Link
            key={note.slug}
            href={`/research/${note.slug}`}
            style={{
              background: "var(--unseen-bg)",
              padding: "2.4rem 2rem",
              textDecoration: "none",
              color: "inherit",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "center",
              gap: "2rem",
              transition: "background 0.2s ease",
            }}
          >
            <div>
              <div style={{ display: "flex", gap: "0.8rem", alignItems: "center", marginBottom: "0.6rem" }}>
                <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", textTransform: "uppercase", opacity: 0.6 }}>
                  {note.domain}
                </span>
                <span style={{ 
                  fontSize: "0.68rem", 
                  fontFamily: "var(--font-mono)", 
                  padding: "0.2rem 0.6rem", 
                  borderRadius: "999px",
                  background: note.state === "REJECTED" ? "rgba(185, 130, 120, 0.2)" : "rgba(33, 33, 33, 0.08)"
                }}>
                  {note.state}
                </span>
              </div>
              <h2 style={{ fontSize: "1.6rem", fontWeight: 400, margin: "0 0 0.5rem", letterSpacing: "-0.02em" }}>
                {note.title}
              </h2>
              <p style={{ margin: 0, color: "var(--unseen-muted)", fontSize: "0.95rem" }}>
                {note.question}
              </p>
            </div>
            <div style={{ fontSize: "1.3rem" }}>↘</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
