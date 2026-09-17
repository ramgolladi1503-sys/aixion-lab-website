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
    "TradeBot is an intraday market-intelligence and decision-support system built around a strict boundary: analysis may be automated, but execution authority remains with the human operator. It brings live market observation, data-quality checks, regime analysis, strategy research, risk controls, and governance into one traceable operating workflow.",
    "The system is deliberately broader than a signal generator. Before an idea can become actionable, TradeBot asks whether incoming data is healthy and fresh, whether current market conditions fit the assumptions behind the research, whether liquidity and operating constraints are satisfied, and whether the available evidence is strong enough to justify presenting a candidate decision at all.",
    "Research and live operation remain separate. Strategies can be tested, rejected, revised, and preserved as evidence without silently gaining trading authority. Historical performance is treated as research evidence rather than permission to trade; validation, walk-forward behaviour, costs, regime dependence, and live data quality remain independent questions.",
    "In live use, the objective is structured context rather than an opaque prediction: what the market appears to be doing, which regime is currently plausible, what would invalidate that interpretation, where risk sits, and whether the correct response is a candidate trade or no trade. The system is designed to make uncertainty visible instead of hiding it behind a confidence number.",
    "TradeBot also treats operational reliability as part of trading logic. Feed health, session state, stale information, missing option data, execution cut-offs, and governance failures can block a recommendation before strategy logic is allowed to matter. A technically valid signal is not considered useful when the surrounding system cannot support it safely.",
    "The long-term direction is a governed research-to-live pipeline in which hypotheses earn their way forward through evidence, live observation, and explicit authority boundaries. The machine can observe, classify, evaluate, reject, explain, and recommend; the final financial action remains a human decision.",
  ]},
  "control-core": { label: "SYSTEM CONTEXT", paragraphs: [
    "Aixion Control Tower is the control plane for AI-assisted systems that need more structure than a collection of prompts, agents, and tools. It coordinates context, services, policies, evidence, approvals, and execution state so increasingly capable workflows remain understandable while they operate.",
    "Its central concern is authority. A task enters with an objective and constraints; the system assembles the relevant context, determines which tools or agents are appropriate, applies policy before consequential actions, and preserves evidence of what was requested, what happened, and why a particular route was taken.",
    "The Control Tower separates orchestration from unrestricted autonomy. Components receive only the context and capabilities required for their role. Tool access can be bounded, actions can require approval, and consequential transitions can be stopped rather than allowing an agent to improvise around a policy boundary.",
    "Human escalation is therefore part of the architecture rather than an exception path. When a workflow reaches an approval boundary, the operator should be able to see the request, the relevant evidence, the proposed change, and enough context to approve or reject it without reconstructing the entire agent conversation.",
    "Evidence and state are equally important. A useful control plane needs to show what is running, what is blocked, what changed, which policy applied, and whether an execution path completed as intended. That trace becomes the basis for debugging, quality assurance, governance, and later improvement.",
    "The direction is a reusable governed layer for complex AI-assisted products: one place where context, routing, policy, approvals, execution, and evidence meet without collapsing into a black box. More capability should increase the need for visible control, not reduce it.",
  ]},
  automation: { label: "SYSTEM CONTEXT", paragraphs: [
    "Automation Systems explores how repeatable operational work can be automated without making failure invisible. The focus is not simply removing manual steps, but building workflows whose inputs, state, decisions, retries, approvals, and outcomes remain inspectable when normal execution breaks down.",
    "A workflow is treated as a system with explicit boundaries. Inputs are validated, important transitions are recorded, failure paths are designed deliberately, and recovery is controlled rather than improvised. That makes automation easier to test, maintain, and trust as it moves from a useful script toward a dependable service.",
    "The work draws directly from quality engineering: deterministic behaviour where possible, explicit evidence where uncertainty remains, repeatable tests around critical transitions, and enough observability for a human to understand both successful runs and the reason a run was stopped or rejected.",
    "Automation also needs authority boundaries. Some actions can safely proceed unattended; others should pause for confirmation or require stronger evidence. Designing those boundaries early prevents convenience automation from quietly becoming an uncontrolled execution system.",
    "Operational resilience is treated as product behaviour. Timeouts, partial completion, duplicate events, unavailable dependencies, stale state, and interrupted sessions need defined outcomes rather than hopeful retries. Recovery should leave evidence and should not create a second, less visible failure.",
    "The aim is practical automation that saves effort while remaining understandable to the people responsible for it: observable enough to debug, governed enough to constrain, and tested enough that repeated execution does not depend on luck.",
  ]},
  analytics: { label: "SYSTEM CONTEXT", paragraphs: [
    "Analytics Lab investigates the path from raw operational data to a decision that someone can actually defend. It starts before the dashboard: with data quality, definitions, lineage, missing information, and the operating question the analysis is supposed to answer.",
    "The lab turns those inputs into clearer metrics and views while keeping assumptions visible. Patterns, anomalies, and trends are useful only when the underlying information is reliable enough to support them, so validation and context are treated as part of the analytical product rather than hidden preparation work.",
    "Metric design is treated as an engineering decision. A number can be technically correct and still mislead when its denominator, time window, population, or operational meaning is unclear. The goal is to make those choices explicit before visualization makes them look authoritative.",
    "The same principle applies to anomalies and model-assisted analysis. Interesting behaviour should be traceable back to source data and operating context, with uncertainty preserved where the evidence is incomplete. The interface should help investigation rather than prematurely convert every deviation into a conclusion.",
    "Views are designed around decisions rather than chart density. The question is what a person needs to notice, compare, verify, or act on, and what supporting evidence should remain available when a metric changes unexpectedly.",
    "The goal is practical decision support, not more charts: analytics that improves understanding, exposes uncertainty, shortens investigation time, and gives operators a clearer basis for deciding what should happen next.",
  ]},
};

type Tab = "overview" | "architecture" | "evidence" | "state" | "next";
const tabs: Array<{ id: Tab; label: string }> = [
  { id: "overview", label: "Overview" }, { id: "architecture", label: "Architecture" }, { id: "evidence", label: "Evidence" }, { id: "state", label: "Current State" }, { id: "next", label: "What's Next" },
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

  return <article className={`system-showcase system-showcase-${data.slug}`}><section className="showcase-hero"><div className="showcase-hero-top"><div className="showcase-identity"><Link href="/systems" className="showcase-back">← Systems</Link><p className="showcase-kicker">{data.role === "Flagship" ? "FLAGSHIP SYSTEM" : "EXPERIMENTAL SYSTEM"}</p><h1>{data.name}</h1><p className="showcase-proposition">{data.hero.proposition}</p></div><div className="showcase-context"><p>{data.hero.summary}</p><span className={`public-state-badge state-${data.publicState.toLowerCase()}`}><i className="public-state-dot" /> {data.publicState}</span></div></div>{context && <div className="showcase-editorial-context"><p className="showcase-kicker">{context.label}</p><div className="showcase-editorial-columns">{context.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></div>}<div className="showcase-hero-media"><img src={heroImage} alt={data.hero.imageAlt} /></div><div className="showcase-capability-strip">{keyCapabilities.map(item => <article key={item.name}><h3>{item.name}</h3><p>{item.description}</p></article>)}</div></section><nav className="showcase-subnav" aria-label={`${data.name} sections`}>{tabs.map(tab => <button key={tab.id} type="button" className={active === tab.id ? "active" : ""} onClick={() => setActive(tab.id)}>{tab.label}</button>)}</nav><section className="showcase-active-panel" aria-live="polite">{activePanel}</section></article>;
}
