"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { SystemDetailData } from "@/lib/system-detail-data";

const premiumHeroImages: Record<string, string> = {
  tradebot: "/textures/systems/tradebot-light.png",
  "control-core": "/textures/systems/control-tower-light.png",
  analytics: "/textures/systems/analytics-light.png",
  automation: "/textures/systems/automation-light.png",
};

const editorialContext: Record<string, { label: string; paragraphs: string[] }> = {
  tradebot: { label: "SYSTEM CONTEXT", paragraphs: [
    "TradeBot is an intraday market-intelligence and decision-support system built around a strict boundary: analysis may be automated, but execution authority remains with the human operator. It brings live market observation, data-quality checks, regime analysis, and risk controls into one traceable operating workflow.",
    "Research and live operation remain separate. Historical performance is treated as research evidence rather than permission to trade; validation, walk-forward behaviour, execution cut-offs, and governance failures can block a recommendation before strategy logic is allowed to matter.",
  ]},
  "control-core": { label: "SYSTEM CONTEXT", paragraphs: [
    "Aixion Control Tower coordinates context, services, policies, evidence, approvals, and execution state so increasingly capable AI workflows remain understandable and governable while they operate.",
    "The Control Tower separates orchestration from unrestricted autonomy. Components receive only the capabilities required for their role, tool access is bounded, and consequential actions require human escalation rather than allowing an agent to improvise.",
  ]},
  automation: { label: "SYSTEM CONTEXT", paragraphs: [
    "Automation Systems explores how repeatable operational work can be automated without making failure invisible. Workflows have explicit boundaries: inputs are validated, important transitions are recorded, and recovery is controlled rather than improvised.",
    "Deterministic behaviour is preferred where possible, with explicit evidence where uncertainty remains. Designing authority boundaries early prevents convenience automation from quietly becoming an uncontrolled execution system.",
  ]},
  analytics: { label: "SYSTEM CONTEXT", paragraphs: [
    "Analytics Lab investigates the path from raw operational data to decisions that can be defended. It focuses on data quality, definitions, lineage, and the operating questions the analysis is meant to answer.",
    "Metric design is treated as an engineering decision. The interface prioritizes decision clarity over chart density, exposing uncertainty and giving operators a reliable basis for deciding what happens next.",
  ]},
};

type Tab = "overview" | "architecture" | "evidence" | "state" | "next";
const tabs: Array<{ id: Tab; label: string }> = [
  { id: "overview", label: "Overview" }, { id: "architecture", label: "Architecture" }, { id: "evidence", label: "Evidence" }, { id: "state", label: "Current State" }, { id: "next", label: "What's Next" },
];

export function SystemShowcase({ data }: { data: SystemDetailData }) {
  const [active, setActive] = useState<Tab>("overview");
  const keyCapabilities = data.whatItDoes.capabilities.slice(0, 4);
  const context = editorialContext[data.slug];
  const activePanel = useMemo(() => {
    if (active === "architecture") return <div className="showcase-panel-grid"><div><p className="showcase-kicker">HOW IT WORKS</p><h2>{data.howItWorks.intro}</h2></div><div className="showcase-architecture-list">{data.howItWorks.steps.map(step => <article key={step.title}><h3>{step.title}</h3><p>{step.description}</p></article>)}</div></div>;
    if (active === "evidence") return <div className="showcase-panel-grid evidence-panel"><div><p className="showcase-kicker">EVIDENCE</p><h2>Claims stay bounded by what the system can actually demonstrate.</h2></div><div><p>{data.problem.supportingNote ?? data.problem.body}</p><p className="showcase-evidence-note">{data.whyItMatters.body}</p></div></div>;
    if (active === "state") return <div className="showcase-panel-grid"><div><p className="showcase-kicker">CURRENT STATE</p><h2>{data.currentState.headline}</h2></div><div><p>{data.currentState.body}</p>{data.closingPrinciple && <p className="showcase-evidence-note">{data.closingPrinciple.body}</p>}</div></div>;
    if (active === "next") return <div className="showcase-panel-grid"><div><p className="showcase-kicker">WHAT'S NEXT</p><h2>{data.closingPrinciple?.headline ?? "Keep the next claim smaller than the next piece of evidence."}</h2></div><div className="showcase-next-actions"><p>{data.currentState.body}</p><Link href={data.closingCtas.primary.href}>{data.closingCtas.primary.label}</Link><Link href={data.closingCtas.secondary.href}>{data.closingCtas.secondary.label}</Link></div></div>;
    return <div className="showcase-panel-grid"><div><p className="showcase-kicker">THE PROBLEM</p><h2>{data.problem.headline}</h2></div><div>{data.problem.body.split("\n\n").map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></div>;
  }, [active, data]);

  return <article className={`system-showcase system-showcase-${data.slug}`}><section className="showcase-hero"><div className="showcase-hero-top"><div className="showcase-identity"><Link href="/systems" className="showcase-back">← Systems</Link><p className="showcase-kicker">{data.role === "Flagship" ? "FLAGSHIP SYSTEM" : "EXPERIMENTAL SYSTEM"}</p><h1>{data.name}</h1><p className="showcase-proposition">{data.hero.proposition}</p></div><div className="showcase-context"><p>{data.hero.summary}</p><span className={`public-state-badge state-${data.publicState.toLowerCase()}`}><i className="public-state-dot" /> {data.publicState}</span></div></div>{context && <div className="showcase-editorial-context"><p className="showcase-kicker">{context.label}</p><div className="showcase-editorial-columns">{context.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></div>}<div className="showcase-capability-strip">{keyCapabilities.map(item => <article key={item.name}><h3>{item.name}</h3><p>{item.description}</p></article>)}</div></section><nav className="showcase-subnav" aria-label={`${data.name} sections`}>{tabs.map(tab => <button key={tab.id} type="button" className={active === tab.id ? "active" : ""} onClick={() => setActive(tab.id)}>{tab.label}</button>)}</nav><section className="showcase-active-panel" aria-live="polite">{activePanel}</section></article>;
}
