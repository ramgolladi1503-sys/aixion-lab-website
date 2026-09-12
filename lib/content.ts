export const site = {
  name: "Aixion Lab",
  email: "ramgolladi1503@gmail.com",
  github: "https://github.com/ramgolladi1503-sys",
  linkedin: "https://www.linkedin.com/in/ram-golladi",
  motion: {
    enabled: process.env.NEXT_PUBLIC_MOTION_ENABLED !== "false",
    firstMs: 3500,
    repeatMs: 650,
  },
};
export const nav = [
  ["Home", "/"],
  ["Work", "/work"],
  ["Research", "/research"],
  ["Journey", "/journey"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;
const tb = `${site.github}/tradebot/blob/f2ca8c899424d404b3e607047b767929df012272/`;
const ct = `${site.github}/aixion-control-tower/blob/5a55b23e69c803ed465f5e053386bab416575552/`;
export type Evidence = {
  title: string;
  summary: string;
  detail: string;
  limitation: string;
  href: string;
  label: string;
};
export const evidence: Record<string, Evidence> = {
  tradebot: {
    title: "TradeBot architecture",
    summary: "From market data to a decision you can explain.",
    detail:
      "The public architecture connects feed validation, strategy, contract resolution, execution gates and reconciliation. The README also documents offline health checks and test categories.",
    limitation:
      "Source documentation describes the implementation. It is not a current live-runtime certificate or evidence of trading profitability.",
    href: tb + "README.md",
    label: "Read architecture & test strategy",
  },
  robustness: {
    title: "A negative result, kept in the record",
    summary: "Opening-range breakout did not earn promotion.",
    detail:
      "The published candle-research review records matching signal semantics, no supported signal edge, and an independently confirmed negative result. Strict option replay remained invalid due to data.",
    limitation:
      "Candle research and executable option-fill evidence are separate. This result does not generalize to every strategy or establish live performance.",
    href: tb + "docs/agent_reviews/ORB_CANDLE_NEGATIVE_RESULT.md",
    label: "Read the negative-result review",
  },
  regime: {
    title: "Market description has limits",
    summary: "A classification is not permission to execute.",
    detail:
      "The architecture review documents rejection of unvalidated EVENT/PANIC routing and claims of order authority. It also records input-normalization repairs and targeted test commands.",
    limitation:
      "The review is historical implementation evidence, not a fresh test run. It does not prove forecast accuracy, directional edge or execution viability.",
    href: tb + "docs/agent_reviews/pr897_regime_architecture_enforcement.md",
    label: "Read the architecture review",
  },
  tower: {
    title: "Human control, end to end",
    summary: "Scope → approval → validation → review.",
    detail:
      "The public Control Tower README describes mobile diff review, agent-task orchestration, MCP approval, authenticated connectors, isolated validation and pull requests for human review.",
    limitation:
      "Release-candidate / demo-ready. Release validation, deployment rehearsal, real-device testing and packaging remain. It is not a high-assurance sandbox or autonomous merge bot.",
    href: ct + "README.md",
    label: "Read capabilities & release limits",
  },
  rag: {
    title: "Answers with a source",
    summary: "Repository knowledge that can refuse to answer.",
    detail:
      "TradeBot Evidence RAG uses deterministic chunking, SQLite FTS5 retrieval and extractive synthesis. Results retain source paths, line ranges and hashes; unsupported questions are refused.",
    limitation:
      "The documented implementation does not use an LLM, embeddings or a vector database. Retrieval alone cannot establish that an underlying claim is true.",
    href: tb + "README.md#tradebot-evidence-rag",
    label: "Read the retrieval scope",
  },
};
export const capabilities = [
  [
    "Software Quality",
    "Automation, integration testing, backend validation, reproducibility and release confidence.",
  ],
  [
    "Reliable Systems",
    "Real-time data, failure recovery, observability and explicit safety checks.",
  ],
  [
    "Applied AI",
    "Agents, human review, AI-assisted engineering and controlled tool execution.",
  ],
  [
    "Research",
    "Hypothesis testing, robustness, failure investigation and evidence-based conclusions.",
  ],
];
export const processSteps = [
  ["Understand", "Find the actual problem."],
  ["Build", "Make the idea inspectable."],
  ["Test", "Exercise the failure paths."],
  ["Challenge", "Question the assumptions."],
  ["Investigate", "Explain what broke."],
  ["Improve", "Repair the mechanism."],
  ["Verify", "Test the change again."],
];
export const projects = [
  {
    slug: "tradebot",
    name: "TradeBot",
    subtitle: "Real-time fintech reliability and market-research system",
    state: "Portfolio / research system",
    intro:
      "It began with algorithmic trading. It became a larger question: how do you know whether a real-time financial system can actually be trusted?",
    nodes: [
      "Market data",
      "Validation",
      "Strategy",
      "Contract resolver",
      "Execution gate",
      "Reconciliation",
    ],
    evidence: "tradebot",
    chapters: [
      [
        "Problem",
        "The signal is only the beginning.",
        "A strategy can look convincing while its data is stale, its contract is unavailable or its execution state is unclear.",
      ],
      [
        "Why it was hard",
        "Failure crosses components.",
        "Feeds, broker sessions, persistent state and dashboards can disagree. Testing one component cannot explain the whole system.",
      ],
      [
        "System",
        "Make every decision explainable.",
        "Feed checks, contract resolution, risk controls, manual approval and reconciliation make blocked, queued and executable states visible.",
      ],
      [
        "Architecture",
        "A chain of explicit checks.",
        "Market data passes through validation, strategy and contract resolution before an execution gate. Logs connect decisions to reconciliation and reporting.",
      ],
      [
        "My role",
        "Follow the problem through the system.",
        "My work brings quality engineering into architecture, automation, failure investigation and research validation across this portfolio project.",
      ],
      [
        "Failure modes",
        "The happy path hides too much.",
        "Stale quotes, expired sessions, unresolved instruments, missing model inputs and mismatched fills all require distinct, testable outcomes.",
      ],
      [
        "What changed",
        "Failure became a first-class result.",
        "The documented design includes deterministic offline health checks, decision-state visibility, stale-feed tests and contract-resolution guards.",
      ],
      [
        "Proof",
        "Inspect the work behind the description.",
        "The public repository contains an architecture, test strategy, health-gate commands and research reviews. Open the source notes below.",
      ],
      [
        "Limitations",
        "A system is not proof of an edge.",
        "This is production-style portfolio and research work. Source code and offline checks do not certify a current live session, executable fills or profitable trading.",
      ],
      [
        "What I learned",
        "Reliability is a connected property.",
        "A correct model or service is only one part of the story. Data, decisions and recovery have to remain understandable together.",
      ],
    ],
  },
  {
    slug: "control-tower",
    name: "Aixion Control Tower",
    subtitle: "Human control for AI-assisted software execution",
    state: "Release candidate / demo-ready",
    intro:
      "A mobile-first control plane that routes AI-assisted work through scope, approval, validation and audit. The agent is replaceable. The control architecture is the product.",
    nodes: [
      "Agent request",
      "Scope / risk",
      "Human approval",
      "Isolated work",
      "Validation",
      "PR / audit",
    ],
    evidence: "tower",
    chapters: [
      [
        "Problem",
        "Useful agents need bounded authority.",
        "An agent can propose a useful change without being entitled to execute every tool call or merge the result.",
      ],
      [
        "Why it was hard",
        "Approval must mean a specific action.",
        "Requests cross mobile, backend, external connectors and GitHub. Scope and review must survive each handoff.",
      ],
      [
        "System",
        "Think, review and approve from mobile.",
        "The control plane connects work orders, diff review, approve/reject/revise decisions, worker orchestration and a retained audit trail.",
      ],
      [
        "Architecture",
        "Progress requires a deliberate handoff.",
        "A structured request passes scope and risk checks, mobile approval, isolated work and containerized validation before a pull request is opened.",
      ],
      [
        "My role",
        "Engineer the control around the agent.",
        "My focus is the approval model, integration behavior, failure handling and validation that make AI-assisted software work inspectable.",
      ],
      [
        "Failure modes",
        "A callback is not blanket permission.",
        "Unauthenticated connector input, replayed callbacks, out-of-scope work and failed validation need to stop before mutation or PR creation.",
      ],
      [
        "What changed",
        "Control became part of execution.",
        "The documented implementation adds HMAC callback hardening, scoped connector access, cancellation controls and a fail-closed validation runner.",
      ],
      [
        "Proof",
        "Read the flow and its release limits.",
        "The public README links the approval architecture, connector documentation, validation runner and release checklist.",
      ],
      [
        "Limitations",
        "A release candidate, with work remaining.",
        "Deployment rehearsal, release validation, real-device testing and packaging remain. This is not a high-assurance sandbox, enterprise credential vault or autonomous merge bot.",
      ],
      [
        "What I learned",
        "Autonomy needs an accountable interface.",
        "The model may change. The human decision, allowed scope, validation result and recovery path still need to be clear.",
      ],
    ],
  },
];
export const research = [
  {
    id: "strategy-robustness",
    title: "Strategy robustness",
    question: "Can historical promise survive changing market conditions?",
    initial: "An opening-range-breakout idea warranted investigation.",
    method:
      "Check signal semantics, timestamps, sample stability, null controls and statistical uncertainty.",
    challenge:
      "Separate a plausible historical pattern from support for a repeatable edge.",
    result:
      "The published candle review confirmed a negative result. Strict option replay remained data-blocked.",
    verdict: "Not Certified",
    why: "A rejected hypothesis is a useful result when the method and its limits remain inspectable.",
    source: "robustness",
  },
  {
    id: "regime-architecture",
    title: "Market regimes",
    question: "Should every market-state classification influence execution?",
    initial: "A descriptive state can be mistaken for a reliable trigger.",
    method:
      "Define allowed roles for regime outputs and test the routing contract.",
    challenge:
      "Reject unvalidated routing and claims of order authority, including fallback paths.",
    result:
      "The published review documents defensive routing enforcement and input repairs.",
    verdict: "Supported",
    why: "Support applies to the documented control design, not to prediction or trading performance.",
    source: "regime",
  },
  {
    id: "live-reliability",
    title: "Live reliability",
    question: "What happens when an offline system meets live data?",
    initial:
      "An offline check cannot reproduce every feed and session failure.",
    method:
      "Investigate freshness, gaps, persistence, authentication and reconciliation.",
    challenge:
      "Keep an apparently healthy interface from concealing stale or inconsistent inputs.",
    result:
      "The repository documents offline health checks and explicit failure states. A current live-runtime result is not claimed here.",
    verdict: "Active Research",
    why: "Live readiness must be established for the actual session being operated.",
    source: "tradebot",
  },
  {
    id: "human-controlled-ai",
    title: "Agent authority",
    question: "How much authority should an AI system receive?",
    initial:
      "Useful engineering work requires tools that can also change real systems.",
    method:
      "Structure requests, scope actions, require approval, validate and retain an audit trail.",
    challenge:
      "Preserve human control across connectors, mobile review and worker execution.",
    result:
      "Control Tower implements a release-candidate approval-to-PR flow. Broader release validation remains.",
    verdict: "Active Research",
    why: "Agent capability and permission to act should be evaluated separately.",
    source: "tower",
  },
  {
    id: "evidence-grounded-knowledge",
    title: "Engineering knowledge",
    question: "Can a repository explain itself without inventing answers?",
    initial:
      "Engineering decisions are distributed across source and documentation.",
    method:
      "Use deterministic retrieval with source locations, hashes and extractive answers.",
    challenge:
      "Refuse questions when the indexed material cannot support an answer.",
    result:
      "TradeBot documents a local SQLite FTS5 application with integrity checks and a refusal evaluation.",
    verdict: "Supported",
    why: "Supported here means a documented implementation, not an independently measured accuracy claim.",
    source: "rag",
  },
];
export const journey = [
  [
    "Finding failure",
    "Quality Engineering",
    "The first thing I learned was how to distrust the happy path.",
    "Unexpected states, integration failures and regression risk taught me to question incomplete assumptions.",
    "If the same failures need checking repeatedly, why should a human repeat the work?",
  ],
  [
    "Making validation executable",
    "Automation Engineering",
    "Testing became something I could engineer.",
    "Repeatable frameworks and API/UI pipelines turned recurring checks into faster, reusable feedback.",
    "What if the problem isn’t inside the test at all? What if the entire system is behaving incorrectly?",
  ],
  [
    "Following the whole system",
    "Systems & Reliability",
    "The test boundary became the system boundary.",
    "TradeBot connected the question across data, services, decisions, persistence and interfaces.",
    "Once a system can observe enough data, can it learn something useful from it?",
  ],
  [
    "Questioning the data",
    "Data, ML & Research",
    "Prediction created a harder problem: evidence.",
    "Feature engineering and model experiments led to a more demanding question: what would show that a historical result wasn’t accidental?",
    "If models become capable of taking actions, how much authority should they receive?",
  ],
  [
    "Engineering with AI",
    "Applied AI & Autonomous Systems",
    "AI changed the question from prediction to authority.",
    "Agents, MCP tools and external connectors made human review, controlled execution and audit part of the engineering problem.",
    "How do these disciplines become one way of working?",
  ],
  [
    "Convergence",
    "Aixion Lab",
    "I didn’t replace one discipline with another. I kept adding layers.",
    "Failure-awareness from QA. Repeatability from automation. A systems view of reliability. The skepticism of research. Modern AI tooling, with human control.",
    "The technology changed. The underlying question didn’t.",
  ],
];

export const aboutCapabilities = [
  ["Quality Engineering", "Failure paths, automation, integration behavior and release confidence."],
  ["System Thinking", "Following problems across components, interfaces and operational state."],
  ["Failure Investigation", "Turning ambiguous behavior into a reproducible explanation."],
  ["Automation", "Removing repetitive work while preserving visibility and human control."],
  ["Validation", "Questioning whether a result actually supports the claim being made."],
  ["AI-Assisted Engineering", "Using models and agents with review, tests and explicit execution limits."],
];
