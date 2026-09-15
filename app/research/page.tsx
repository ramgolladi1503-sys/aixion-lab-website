"use client";

import { useRef, useState } from "react";

type ResearchCard = {
  id: string;
  number: string;
  title: string;
  summary: string;
  detailTitle: string;
  detailBody: string;
  practices: string[];
  outcome: string;
};

const researchCards: ResearchCard[] = [
  {
    id: "data-integrity",
    number: "01",
    title: "Data integrity under live conditions",
    summary: "How do we know the system is seeing the market or workflow as it actually exists?",
    detailTitle: "Reliable decisions start with reliable state.",
    detailBody:
      "Aixion treats freshness, completeness, source agreement, and state continuity as engineering questions in their own right. Before a model, strategy, or agent can be trusted, the system first has to prove that its inputs are coherent enough to support a decision.",
    practices: ["freshness checks", "source reconciliation", "missing-state detection", "observable data boundaries"],
    outcome: "This work changes when a system is allowed to make a claim at all.",
  },
  {
    id: "evidence-before-authority",
    number: "02",
    title: "Evidence before authority",
    summary: "How much proof should a system accumulate before its output is allowed to matter?",
    detailTitle: "Capability is not the same thing as authority.",
    detailBody:
      "Across market systems and AI-assisted workflows, Aixion separates what a system can calculate from what it is allowed to influence. Recommendations, actions, and automation paths earn authority only when the required evidence and operating conditions are present.",
    practices: ["explicit gates", "human approval", "policy checks", "reasoned escalation"],
    outcome: "The result is a clearer boundary between useful intelligence and consequential action.",
  },
  {
    id: "regime-dependence",
    number: "03",
    title: "Regime dependence and drift",
    summary: "What happens when yesterday's useful pattern meets a different operating environment?",
    detailTitle: "Strong historical performance can be conditional.",
    detailBody:
      "Aixion studies how apparently reliable behaviour changes across time, volatility, market structure, and operating regimes. The goal is not to rescue a result that stopped working, but to understand the conditions under which it was ever valid.",
    practices: ["time-sliced validation", "regime comparison", "drift detection", "failure attribution"],
    outcome: "This prevents temporary behaviour from being promoted as a permanent capability.",
  },
  {
    id: "execution-reality",
    number: "04",
    title: "Execution reality",
    summary: "Does an idea still make sense after latency, spreads, constraints, and imperfect fills enter the picture?",
    detailTitle: "A clean model is not a clean operating environment.",
    detailBody:
      "Research conclusions are stress-tested against the friction that production systems actually face. In market work that includes execution assumptions; in automation it includes tool latency, failure recovery, partial completion, and real permissions.",
    practices: ["cost realism", "latency awareness", "failure-path testing", "operational constraints"],
    outcome: "A result only becomes useful when it survives the environment that has to carry it.",
  },
  {
    id: "reproducibility",
    number: "05",
    title: "Reproducible research",
    summary: "Can the same evidence be reconstructed without relying on memory, interpretation, or a lucky run?",
    detailTitle: "A result should be repeatable before it is persuasive.",
    detailBody:
      "Aixion preserves assumptions, data boundaries, decision points, and validation stages so that a result can be reconstructed and challenged later. The research process is treated as part of the engineering system, not as disposable notebook work.",
    practices: ["frozen assumptions", "traceable inputs", "repeatable evaluation", "preserved decisions"],
    outcome: "Reproducibility turns research from a story into evidence that can be inspected.",
  },
  {
    id: "failure-preserving",
    number: "06",
    title: "Failure-preserving research",
    summary: "What can a rejected hypothesis teach us that a successful demo cannot?",
    detailTitle: "Rejected work is still information.",
    detailBody:
      "Aixion keeps important failed ideas visible when they reveal weak assumptions, unstable conditions, or better questions. The point is not to accumulate a library of failures; it is to avoid paying for the same lesson twice.",
    practices: ["explicit rejection", "root-cause analysis", "negative evidence", "search-space reduction"],
    outcome: "Failure becomes a mechanism for improving the next system decision.",
  },
  {
    id: "market-observation",
    number: "07",
    title: "Observation before prediction",
    summary: "What can be learned from structure before trying to turn it into a trading rule?",
    detailTitle: "Mechanism first, candidate second.",
    detailBody:
      "Aixion's market work increasingly begins with observation: how liquidity, dispersion, volatility, constituent behaviour, and timing interact before a hypothesis is promoted into a candidate. Strategy research exists inside this process, but it is not the identity of the research programme.",
    practices: ["structural observation", "hypothesis isolation", "candidate formation", "separate validation"],
    outcome: "The research becomes less about finding a backtest and more about understanding why a system might deserve one.",
  },
  {
    id: "validation-boundaries",
    number: "08",
    title: "Validation boundaries",
    summary: "How do we stop development evidence from quietly becoming proof?",
    detailTitle: "The data used to create an idea cannot be allowed to certify it.",
    detailBody:
      "Aixion separates exploration, formation, validation, confirmation, and live observation so that each stage answers a different question. The precise method changes by project, but the principle remains fixed: confidence must come from evidence the idea did not already consume.",
    practices: ["holdouts", "walk-forward evaluation", "protected validation", "stage-specific decisions"],
    outcome: "This keeps iteration from silently turning into self-confirmation.",
  },
  {
    id: "live-observation",
    number: "09",
    title: "Live observation and telemetry",
    summary: "How does a system behave when data is arriving, queues are moving, and things can actually fail?",
    detailTitle: "Production truth is different from offline truth.",
    detailBody:
      "Aixion uses live observation to reveal problems that offline evaluation cannot expose: freshness gaps, queue pressure, timing boundaries, state collisions, and operational failure modes. The purpose is not to rush into production; it is to learn what the real system does under real conditions.",
    practices: ["read-only observation", "telemetry", "failure-state capture", "operational RCA"],
    outcome: "Live evidence changes architecture decisions before authority is expanded.",
  },
  {
    id: "human-authority",
    number: "10",
    title: "Human authority in intelligent systems",
    summary: "Where should machine assistance stop and accountable human judgment begin?",
    detailTitle: "Human-in-the-loop should be a system boundary, not a slogan.",
    detailBody:
      "Aixion explores how systems can remain fast and useful without obscuring who owns consequential decisions. Approval, escalation, and visibility are designed as architecture rather than added later as interface controls.",
    practices: ["approval boundaries", "explainable context", "escalation paths", "auditable decisions"],
    outcome: "The system can become more capable without making responsibility harder to see.",
  },
  {
    id: "promotion-discipline",
    number: "11",
    title: "From experiment to system",
    summary: "What has to become true before an idea deserves a larger role in a product?",
    detailTitle: "Promotion is a research decision.",
    detailBody:
      "Aixion treats the movement from experiment to product capability as something that must be earned. Evidence, reproducibility, operational behaviour, limits, and failure modes all influence whether work remains exploratory, moves into validation, or becomes part of a flagship system.",
    practices: ["maturity criteria", "evidence review", "operational readiness", "bounded promotion"],
    outcome: "Research directly shapes what gets built, what stays experimental, and what is stopped.",
  },
];

export default function ResearchPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const detailRef = useRef<HTMLElement | null>(null);
  const selected = researchCards.find((item) => item.id === selectedId) ?? null;

  const reveal = (id: string) => {
    setSelectedId(id);
    window.requestAnimationFrame(() => {
      window.setTimeout(() => detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 20);
    });
  };

  return (
    <main className="research-editorial-page">
      <section className="research-editorial-intro">
        <p className="research-kicker">RESEARCH</p>
        <div className="research-intro-grid">
          <h1>Research that changes what we build.</h1>
          <div className="research-intro-copy">
            <p>
              Aixion Lab uses research to make systems more reliable, more honest about uncertainty, and harder to fool with convincing-looking results.
            </p>
            <p>
              The work spans data integrity, live behaviour, validation, human authority, failure analysis, and the conditions under which an experiment deserves to become part of a real system.
            </p>
          </div>
        </div>
      </section>

      <section className="research-card-section" aria-label="Research themes">
        <div className="research-card-grid">
          {researchCards.map((item) => (
            <button
              type="button"
              key={item.id}
              className={`research-topic-card ${selectedId === item.id ? "selected" : ""}`}
              onClick={() => reveal(item.id)}
              aria-pressed={selectedId === item.id}
            >
              <span className="research-topic-number">{item.number}</span>
              <strong>{item.title}</strong>
              <span className="research-topic-summary">{item.summary}</span>
              <span className="research-topic-action">Read focus ↘</span>
            </button>
          ))}
        </div>
      </section>

      {selected && (
        <section ref={detailRef} className="research-reveal" aria-live="polite">
          <div className="research-reveal-meta">
            <span>{selected.number}</span>
            <button type="button" onClick={() => setSelectedId(null)} aria-label="Close selected research focus">
              Close ×
            </button>
          </div>

          <div className="research-reveal-grid">
            <div>
              <p className="research-kicker">{selected.title}</p>
              <h2>{selected.detailTitle}</h2>
            </div>

            <div className="research-reveal-body">
              <p>{selected.detailBody}</p>
              <div className="research-practice-list">
                {selected.practices.map((practice) => (
                  <span key={practice}>{practice}</span>
                ))}
              </div>
              <div className="research-outcome">
                <span>WHAT THIS CHANGES</span>
                <p>{selected.outcome}</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
