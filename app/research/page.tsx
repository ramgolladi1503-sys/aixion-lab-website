"use client";

import { useEffect, useRef, useState } from "react";

type ResearchCard = {
  id: string;
  title: string;
  summary: string;
  detailTitle: string;
  detailBody: string;
  practices: string[];
  outcome: string;
  image: string;
};

const researchCards: ResearchCard[] = [
  { id: "data-integrity", title: "Data integrity under live conditions", summary: "Can the system trust the state it is seeing?", detailTitle: "Reliable decisions start with reliable state.", detailBody: "Aixion treats freshness, completeness, source agreement, and state continuity as engineering questions in their own right. Before a model, strategy, or agent can be trusted, the system first has to prove that its inputs are coherent enough to support a decision.", practices: ["freshness checks", "source reconciliation", "missing-state detection", "observable data boundaries"], outcome: "This work changes when a system is allowed to make a claim at all.", image: "/textures/data-integrity.webp" },
  { id: "evidence-before-authority", title: "Evidence before authority", summary: "Capability should not automatically become permission.", detailTitle: "Capability is not the same thing as authority.", detailBody: "Across market systems and AI-assisted workflows, Aixion separates what a system can calculate from what it is allowed to influence. Recommendations, actions, and automation paths earn authority only when the required evidence and operating conditions are present.", practices: ["explicit gates", "human approval", "policy checks", "reasoned escalation"], outcome: "The result is a clearer boundary between useful intelligence and consequential action.", image: "/textures/evidence-before-authority.webp" },
  { id: "regime-dependence", title: "Regime dependence and drift", summary: "When does useful behaviour stop being useful?", detailTitle: "Strong historical performance can be conditional.", detailBody: "Aixion studies how apparently reliable behaviour changes across time, volatility, market structure, and operating regimes. The goal is not to rescue a result that stopped working, but to understand the conditions under which it was ever valid.", practices: ["time-sliced validation", "regime comparison", "drift detection", "failure attribution"], outcome: "This prevents temporary behaviour from being promoted as a permanent capability.", image: "/textures/regime-dependence.webp" },
  { id: "execution-reality", title: "Execution reality", summary: "Does the idea survive the environment that must carry it?", detailTitle: "A clean model is not a clean operating environment.", detailBody: "Research conclusions are stress-tested against the friction that production systems actually face. In market work that includes execution assumptions; in automation it includes tool latency, failure recovery, partial completion, and real permissions.", practices: ["cost realism", "latency awareness", "failure-path testing", "operational constraints"], outcome: "A result only becomes useful when it survives the environment that has to carry it.", image: "/textures/execution-reality.webp" },
  { id: "failure-preserving", title: "Failure-preserving research", summary: "Rejected work should reduce uncertainty rather than disappear.", detailTitle: "Rejected work is still information.", detailBody: "Aixion keeps important failed ideas visible when they reveal weak assumptions, unstable conditions, or better questions. The point is not to accumulate a library of failures; it is to avoid paying for the same lesson twice.", practices: ["explicit rejection", "root-cause analysis", "negative evidence", "search-space reduction"], outcome: "Failure becomes a mechanism for improving the next system decision.", image: "/textures/failure-preserving.webp" },
  { id: "market-observation", title: "Observation before prediction", summary: "Mechanism first, candidate second.", detailTitle: "Mechanism first, candidate second.", detailBody: "Aixion's market work increasingly begins with observation: how liquidity, dispersion, volatility, constituent behaviour, and timing interact before a hypothesis is promoted into a candidate. Strategy research exists inside this process, but it is not the identity of the research programme.", practices: ["structural observation", "hypothesis isolation", "candidate formation", "separate validation"], outcome: "The research becomes less about finding a backtest and more about understanding why a system might deserve one.", image: "/textures/observation-before-prediction.webp" },
  { id: "validation-boundaries", title: "Validation boundaries", summary: "Development evidence cannot quietly become proof.", detailTitle: "The data used to create an idea cannot be allowed to certify it.", detailBody: "Aixion separates exploration, formation, validation, confirmation, and live observation so that each stage answers a different question. The precise method changes by project, but the principle remains fixed: confidence must come from evidence the idea did not already consume.", practices: ["holdouts", "walk-forward evaluation", "protected validation", "stage-specific decisions"], outcome: "This keeps iteration from silently turning into self-confirmation.", image: "/textures/validation-boundaries.webp" },
  { id: "live-observation", title: "Live system telemetry", summary: "Production truth is different from offline truth.", detailTitle: "Production truth is different from offline truth.", detailBody: "Aixion uses live observation to reveal problems that offline evaluation cannot expose: freshness gaps, queue pressure, timing boundaries, state collisions, and operational failure modes. The purpose is not to rush into production; it is to learn what the real system does under real conditions.", practices: ["read-only observation", "telemetry", "failure-state capture", "operational RCA"], outcome: "Live evidence changes architecture decisions before authority is expanded.", image: "/textures/live-system-telemetry.webp" },
  { id: "promotion-discipline", title: "From experiment to real system", summary: "What has to become true before an idea earns a larger role?", detailTitle: "Promotion is a research decision.", detailBody: "Aixion treats the movement from experiment to product capability as something that must be earned. Evidence, reproducibility, operational behaviour, limits, and failure modes all influence whether work remains exploratory, moves into validation, or becomes part of a flagship system.", practices: ["maturity criteria", "evidence review", "operational readiness", "bounded promotion"], outcome: "Research directly shapes what gets built, what stays experimental, and what is stopped.", image: "/textures/from-experiment-to-real-system.webp" },
  { id: "human-authority", title: "Human authority and oversight", summary: "Responsibility should remain visible as capability grows.", detailTitle: "Human-in-the-loop should be a system boundary, not a slogan.", detailBody: "Aixion explores how systems can remain fast and useful without obscuring who owns consequential decisions. Approval, escalation, and visibility are designed as architecture rather than added later as interface controls.", practices: ["approval boundaries", "explainable context", "escalation paths", "auditable decisions"], outcome: "The system can become more capable without making responsibility harder to see.", image: "/textures/human-authority.webp" },
  { id: "reproducibility", title: "Reproducible research", summary: "A result should be reconstructable before it is persuasive.", detailTitle: "A result should be repeatable before it is persuasive.", detailBody: "Aixion preserves assumptions, data boundaries, decision points, and validation stages so that a result can be reconstructed and challenged later. The research process is treated as part of the engineering system, not as disposable notebook work.", practices: ["frozen assumptions", "traceable inputs", "repeatable evaluation", "preserved decisions"], outcome: "Reproducibility turns research from a story into evidence that can be inspected.", image: "/textures/reproducible-research.webp" },
];

const featuredResearch = researchCards.slice(0, 4);
const researchArchive = researchCards.slice(4);

export default function ResearchPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const detailRef = useRef<HTMLElement | null>(null);
  const pageRef = useRef<HTMLElement | null>(null);
  const selected = researchCards.find(item => item.id === selectedId) ?? null;

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-motion]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    targets.forEach((target, index) => {
      const group = target.dataset.motionGroup;
      const order = Number(target.dataset.motionOrder ?? index);
      const step = group === "cards" ? 95 : 110;
      target.style.setProperty("--reveal-delay", `${Math.min(order * step, 380)}ms`);
      if (reduced) target.classList.add("is-revealed");
    });

    if (reduced) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const target = entry.target as HTMLElement;
          if (!entry.isIntersecting) return;
          target.classList.add("is-revealed");
          observer.unobserve(target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );

    targets.forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const reveal = (id: string) => {
    setSelectedId(id);
    requestAnimationFrame(() => setTimeout(() => detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 20));
  };

  return (
    <main ref={pageRef} className="mock-research-page">
      <section className="mock-research-intro">
        <div data-motion="headline" data-motion-group="intro" data-motion-order="0"><p className="mock-kicker">RESEARCH</p><h1>Research that changes what we build.</h1></div>
        <div data-motion="copy" data-motion-group="intro" data-motion-order="1">
          <p>These are recurring questions that have shaped what Aixion builds, rejects, validates and changes.</p>
          <p>The work is not a catalogue of strategies. It is the discipline used to make systems more reliable, more honest about uncertainty and more useful in the real world.</p>
        </div>
        <div data-motion="rail" data-motion-group="intro" data-motion-order="2" className="premium-context-rail" role="region" tabIndex={0} aria-label="Research focus areas">
          <span>Data Integrity</span><span>Validation</span><span>Execution Reality</span><span>Human Authority</span><span>Reproducibility</span>
        </div>
      </section>

      <section className="mock-research-grid" aria-label="Research themes">
        {featuredResearch.map((item, index) => (
          <button data-motion="card" data-motion-group="cards" data-motion-order={index % 3} type="button" key={item.id} className={`mock-research-card research-topic-trigger ${selectedId === item.id ? "selected" : ""}`} onClick={() => reveal(item.id)} aria-pressed={selectedId === item.id}>
            <strong>{item.title}</strong>
            <div className="mock-research-thumb"><img src={item.image} alt="" /></div>
            <span>{item.summary}</span>
          </button>
        ))}
      </section>

      <details className="mock-research-archive">
        <summary><span>Research archive</span><strong>{researchArchive.length} additional questions</strong></summary>
        <div className="mock-research-archive-grid">
          {researchArchive.map(item => (
            <button type="button" key={item.id} className={`research-topic-trigger ${selectedId === item.id ? "selected" : ""}`} onClick={() => reveal(item.id)} aria-pressed={selectedId === item.id}>
              <span>{item.title}</span>
              <small>{item.summary}</small>
              <i aria-hidden="true">View →</i>
            </button>
          ))}
        </div>
      </details>

      {selected && (
        <section ref={detailRef} className="mock-research-detail">
          <div className="mock-research-detail-media"><img src={selected.image} alt="" /></div>
          <div className="mock-research-detail-copy">
            <div className="mock-detail-head"><p className="mock-kicker">{selected.title}</p><button type="button" onClick={() => setSelectedId(null)}>Close ×</button></div>
            <h2>{selected.detailTitle}</h2>
            <p>{selected.detailBody}</p>
            <div className="mock-practice-row">{selected.practices.map(practice => <span key={practice}>{practice}</span>)}</div>
            <div className="mock-outcome"><span>WHAT THIS CHANGES</span><p>{selected.outcome}</p></div>
          </div>
        </section>
      )}

      <style jsx global>{`
        .mock-research-page [data-motion] {
          --reveal-delay: 0ms;
          will-change: transform;
        }
        .mock-research-page [data-motion="headline"] {
          opacity: 1;
          transform: translate3d(0, 34px, 0) scale(.985);
          transition: transform 720ms cubic-bezier(.16,1,.3,1) var(--reveal-delay);
        }
        .mock-research-page [data-motion="copy"] {
          opacity: 1;
          transform: translate3d(0, 24px, 0);
          transition: transform 650ms cubic-bezier(.16,1,.3,1) var(--reveal-delay);
        }
        .mock-research-page [data-motion="rail"] {
          opacity: 1;
          transform: translate3d(-12px,0,0);
          transition: transform 650ms cubic-bezier(.16,1,.3,1) var(--reveal-delay);
        }
        .mock-research-page [data-motion="card"] {
          opacity: 1;
          transform: translate3d(0, 42px, 0) scale(.975);
          transition: transform 760ms cubic-bezier(.16,1,.3,1) var(--reveal-delay);
        }
        .mock-research-page [data-motion="card"] .mock-research-thumb {
          overflow: hidden;
        }
        .mock-research-page [data-motion="card"] .mock-research-thumb img {
          transform: scale(1.055);
          transition: transform 1050ms cubic-bezier(.16,1,.3,1) calc(var(--reveal-delay) + 80ms);
        }
        .mock-research-page [data-motion].is-revealed {
          opacity: 1;
          transform: none;
          filter: none;
          clip-path: inset(0 0 0 0);
        }
        .mock-research-page [data-motion="card"].is-revealed .mock-research-thumb { clip-path: inset(0 0 0 0); }
        .mock-research-page [data-motion="card"].is-revealed .mock-research-thumb img { transform: scale(1); }
        .mock-research-card.is-revealed:hover .mock-research-thumb img { transform: scale(1.025); transition-duration: 420ms; }
        .mock-research-card.is-revealed:hover { transform: translate3d(0,-4px,0); transition-duration: 260ms; }
        @media (prefers-reduced-motion: reduce) {
          .mock-research-page [data-motion],
          .mock-research-page [data-motion] .mock-research-thumb,
          .mock-research-page [data-motion] .mock-research-thumb img {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
            clip-path: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </main>
  );
}
