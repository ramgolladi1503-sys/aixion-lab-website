export type SystemState = "RESEARCH" | "BUILDING" | "VALIDATING" | "OPERATING" | "ARCHIVED";

export type SystemRecord = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  descriptor: string;
  domain: string;
  state: SystemState;
  currentGate: string;
  currentFocus: string;
  nextGate: string;
  accent: "sage" | "blue" | "lavender" | "peach";
  competencies: string[];
};

export const systems: SystemRecord[] = [
  {
    id: "AX-SYS-001",
    slug: "tradebot",
    name: "TradeBot",
    shortName: "TradeBot",
    descriptor: "Governed market-intelligence infrastructure for intraday decision support.",
    domain: "Market intelligence · real-time systems · research",
    state: "VALIDATING",
    currentGate: "Live / evidence validation",
    currentFocus: "Evidence reconciliation, data integrity and candidate validation.",
    nextGate: "Public-safe operational evidence review.",
    accent: "blue",
    competencies: ["Python", "WebSockets", "APIs", "Real-time data", "Testing", "ML research", "Observability", "Governance"],
  },
  {
    id: "AX-SYS-002",
    slug: "control-core",
    name: "Aixion Control Core",
    shortName: "Control Core",
    descriptor: "A governed orchestration layer for context, agents, tools, policy, evidence and human authority.",
    domain: "Agent orchestration · governance · automation",
    state: "BUILDING",
    currentGate: "MVP runtime",
    currentFocus: "Orchestration, tool boundaries, policy and evidence capture.",
    nextGate: "Policy-bound execution trace.",
    accent: "lavender",
    competencies: ["Agent orchestration", "Tool integration", "Policy architecture", "Human-in-the-loop", "Evidence", "APIs", "State management"],
  },
  {
    id: "AX-SYS-003",
    slug: "automation",
    name: "Automation Systems",
    shortName: "Automation",
    descriptor: "Workflow, RPA and agent automation built around traceability, policy and failure handling.",
    domain: "Workflow · QA automation · agent safety",
    state: "BUILDING",
    currentGate: "Public implementation evidence",
    currentFocus: "MCP Shield: policy-bound tool execution, auditability and failure-safe automation.",
    nextGate: "Broaden real-world workflow validation without inventing ROI claims.",
    accent: "sage",
    competencies: ["Workflow design", "Test automation", "Policy engines", "Failure handling", "Auditability", "AI tool safety"],
  },
  {
    id: "AX-SYS-004",
    slug: "analytics",
    name: "Analytics Lab",
    shortName: "Analytics Lab",
    descriptor: "Decision-support systems that connect runtime state, replay and outcomes to operator decisions.",
    domain: "Data · operational analytics · visualization",
    state: "BUILDING",
    currentGate: "Public case-study evidence",
    currentFocus: "Algotradify: candidate truth, readiness, replay, outcomes and execution-safety views.",
    nextGate: "Deepen outcome analysis while preserving decision context and evidence boundaries.",
    accent: "peach",
    competencies: ["Data analysis", "FastAPI", "React", "Replay analytics", "Visualization", "Decision support"],
  },
];

export const researchNotes = [
  {
    slug: "opening-session-market-structure",
    title: "Opening-session market structure",
    domain: "Market microstructure",
    question: "Are early-session price movements preceded by measurable structural diffusion across constituents and derivatives?",
    state: "ACTIVE VALIDATION",
    accent: "sage",
  },
  {
    slug: "rec-md-structural-interaction",
    title: "REC-MD structural interaction",
    domain: "Market research",
    question: "Do structural interactions contain repeatable information before a candidate becomes eligible for validation?",
    state: "HYPOTHESIS FROZEN",
    accent: "lavender",
  },
  {
    slug: "mean-reversion-candidate",
    title: "Mean reversion candidate",
    domain: "Strategy research",
    question: "Does the candidate retain structural edge after realistic assumptions and holdout testing?",
    state: "REJECTED",
    accent: "peach",
  },
  {
    slug: "evidence-bound-autonomy",
    title: "Evidence-bound autonomy",
    domain: "Autonomous systems",
    question: "How can agent actions remain useful while preserving explicit policy, evidence and authority boundaries?",
    state: "ACTIVE",
    accent: "blue",
  },
];

export const journey = [
  ["01", "Quality Engineering", "Why did this fail — and can the system explain it?"],
  ["02", "Automation", "Can this failure be prevented consistently without hiding the recovery path?"],
  ["03", "Software Engineering", "What state is the system actually in, and which component owns that truth?"],
  ["04", "Data", "Can that state be measured, transformed and trusted well enough to support a decision?"],
  ["05", "ML Systems", "Can the system infer what happens next without hiding uncertainty behind a model score?"],
  ["06", "Autonomous Systems", "Can it act safely while evidence, policy and human authority remain explicit?"],
  ["07", "Aixion Lab", "Can intelligence operate while remaining observable, governed and accountable?"],
] as const;

export const nav = [
  ["Systems", "/systems"],
  ["Research", "/research"],
  ["Pulse", "/pulse"],
  ["Journey", "/journey"],
  ["About", "/about"],
] as const;
