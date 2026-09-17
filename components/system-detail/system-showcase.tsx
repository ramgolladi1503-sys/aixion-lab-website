"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { SystemDetailData } from "@/lib/system-detail-data";

const premiumHeroImages: Record<string, string> = {
  tradebot: "/textures/systems/tradebot-detail-premium.png",
  "control-core": "/textures/systems/control-tower-detail-premium.png",
  analytics: "/textures/systems/analytics-detail-premium.png",
  automation: "/textures/systems/automation-detail-premium.png",
};

const editorialContext: Record<string, { label: string; paragraphs: string[] }> = {
  tradebot: {
    label: "SYSTEM CONTEXT",
    paragraphs: [
      "TradeBot is an intraday market-intelligence and decision-support system built around a simple boundary: analysis may be automated, but execution authority remains with the human operator. It brings live market observation, data-quality checks, regime analysis, strategy research, risk controls, and governance into one traceable workflow.",
      "The system is deliberately broader than a signal generator. Before an idea can become actionable, TradeBot asks whether the incoming data is healthy, whether current market conditions fit the research assumptions, whether liquidity and risk constraints are satisfied, and whether the available evidence is strong enough to justify presenting a candidate decision at all.",
      "Research and live operation are kept separate. Strategies can be tested, rejected, revised, and preserved as evidence without silently gaining trading authority. In live use, the objective is structured context: what the market appears to be doing, what invalidates the view, where risk sits, and when the correct decision is to do nothing.",
    ],
  },
  "control-core": {
    label: "SYSTEM CONTEXT",
    paragraphs: [
      "Aixion Control Tower is the control plane for AI-assisted systems that need more structure than a collection of prompts and tools. It coordinates context, agents, services, policies, evidence, and human approvals so that increasingly capable workflows remain understandable while they operate.",
      "Its purpose is to make authority explicit. A task enters with an objective and constraints; the system assembles the relevant context, determines which tools or agents are appropriate, applies policy before consequential actions, and preserves evidence of what was requested, what happened, and why.",
      "The Control Tower is being developed around controlled orchestration rather than unrestricted autonomy. Human escalation, bounded tool access, traceable state, and recoverable execution paths are treated as parts of the architecture, not safeguards added after the system becomes complex.",
    ],
  },
  automation: {
    label: "SYSTEM CONTEXT",
    paragraphs: [
      "Automation Systems explores how repeatable operational work can be automated without making failure invisible. The focus is not simply on removing manual steps, but on building workflows whose state, inputs, decisions, retries, and outcomes remain inspectable when normal execution breaks down.",
      "A workflow is treated as a system with boundaries: inputs are validated, important transitions are recorded, failure paths are designed deliberately, and recovery is controlled rather than improvised. That makes the automation easier to test, maintain, and trust as it moves from a useful script toward a dependable service.",
      "The work draws directly from quality engineering: deterministic behaviour where possible, explicit evidence where uncertainty remains, and enough observability for a human to understand both successful runs and the reasons a run was stopped or rejected.",
    ],
  },
  analytics: {
    label: "SYSTEM CONTEXT",
    paragraphs: [
      "Analytics Lab investigates the path from raw operational data to a decision that someone can actually defend. It starts before the dashboard: with data quality, definitions, lineage, missing information, and the operating question the analysis is supposed to answer.",
      "The lab turns those inputs into clearer metrics and views while keeping assumptions visible. Patterns, anomalies, and trends are useful only when the underlying information is reliable enough to support them, so validation and context are treated as part of the analytical product rather than hidden preparation work.",
      "The goal is practical decision support, not more charts. Each experiment asks whether the resulting view improves understanding, exposes uncertainty, and helps a person make a better operational choice with less ambiguity.",
    ],
  },
};

type Tab = "overview" | "architecture" | "evidence" | "state" | "next";
const tabs: Array<{ id: Tab; label: string }> = [
  { id: "overview", label: "Overview" }, { id: "architecture", label: "Architecture" },
  { id: "evidence", label: "Evidence" }, { id: "state", label: "Current State" }, { id: "next", label: "What's Next" },
];

export function SystemShowcase({ data }: { data: SystemDetailData }) {
  const [active, setActive] = useState<Tab>("overview");
  const heroImage = premiumHeroImages[data.slug] ?? data.hero.image;
  const keyCapabilities = data.whatItDoes.capabilities.slice(0, 4);
  const context = editorialContext[data.slug];

  const activePanel = useMemo(() => {
    if (active === "architecture") return <div className="showcase-panel-grid"><div><p className="showcase-kicker">HOW IT WORKS</p><h2>{data.howItWorks.intro}</h2></div><div className="showcase-architecture-list">{data.howItWorks.steps.map(step => <article key={step.title}><h3>{step.title}</h3><p>{step.description}</p></article>)}</div></div>;
    if (active === "evidence") return <div className="showcase-panel-grid evidence-panel"><div><p className="showcase-kicker">EVIDENCE</p><h2>Claims stay bounded by what the system can actually demonstrate.</h2></div><div><p>{data.problem.supportingNote ?? data.problem.body}</p><p className="showcase-evidence-note">{data.whyItMatters.body}</p></div></div>;
    if (active === "state") return <div className="showcase-panel-grid"><div><p className="showcase-kicker">CURRENT STATE</p><h2>{data.currentState.headline}</h2></div><div><p>{data.currentState.body}</p>{data.closingPrinciple && <p className="showcase-evidence-note">{data.closingPrinciple.body}</p>}</div></div>;
    if (active === "next") return <div className="showcase-panel-grid"><div><p className="showcase-kicker">WHAT'S NEXT</p><h2>{data.closingPrinciple?.headline ?? "Keep the next claim smaller than the next piece of evidence."}</h2></div><div className="showcase-next-actions"><p>{data.currentState.body}</p><Link href={data.closingCtas.primary.href}>{data.closingCtas.primary.label}</Link><Link href={data.closingCtas.secondary.href}>{data.closingCtas.secondary.label}</Link></div></div>;
    return <div className="showcase-panel-grid"><div><p className="showcase-kicker">THE PROBLEM</p><h2>{data.problem.headline}</h2></div><div>{data.problem.body.split("\n\n").map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></div>;
  }, [active, data]);

  return (
    <article className={`system-showcase system-showcase-${data.slug}`}>
      <section className="showcase-hero">
        <div className="showcase-hero-top">
          <div className="showcase-identity"><Link href="/systems" className="showcase-back">← Systems</Link><p className="showcase-kicker">{data.role === "Flagship" ? "FLAGSHIP SYSTEM" : "EXPERIMENTAL SYSTEM"}</p><h1>{data.name}</h1><p className="showcase-proposition">{data.hero.proposition}</p></div>
          <div className="showcase-context"><p>{data.hero.summary}</p><span className={`public-state-badge state-${data.publicState.toLowerCase()}`}><i className="public-state-dot" /> {data.publicState}</span></div>
        </div>
        {context && <div className="showcase-editorial-context"><p className="showcase-kicker">{context.label}</p><div className="showcase-editorial-columns">{context.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></div>}
        <div className="showcase-hero-media"><img src={heroImage} alt={data.hero.imageAlt} /></div>
        <div className="showcase-capability-strip">{keyCapabilities.map(item => <article key={item.name}><h3>{item.name}</h3><p>{item.description}</p></article>)}</div>
      </section>
      <nav className="showcase-subnav" aria-label={`${data.name} sections`}>{tabs.map(tab => <button key={tab.id} type="button" className={active === tab.id ? "active" : ""} onClick={() => setActive(tab.id)}>{tab.label}</button>)}</nav>
      <section className="showcase-active-panel" aria-live="polite">{activePanel}</section>
    </article>
  );
}
