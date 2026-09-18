export type PublicSystemState = "Exploration" | "Development" | "Validation" | "Operational";

export interface CapabilityItem {
  id: string;
  number: string;
  name: string;
  description: string;
}

export interface ArchitectureStep {
  number: string;
  title: string;
  description: string;
}

export interface SystemDetailData {
  slug: string;
  name: string;
  role: "Flagship" | "Experimental";
  publicState: PublicSystemState;
  hero: {
    eyebrow: string;
    title: string;
    proposition: string;
    summary: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    image: string;
    imageAlt: string;
  };
  problem: {
    label: string;
    headline: string;
    body: string;
    supportingNote?: string;
  };
  whatItDoes: {
    sectionHeadline: string;
    capabilities: CapabilityItem[];
  };
  howItWorks: {
    intro: string;
    steps: ArchitectureStep[];
    supportingImage: string;
    supportingImageAlt: string;
  };
  whyItMatters: {
    headline: string;
    body: string;
  };
  currentState: {
    headline: string;
    body: string;
  };
  closingPrinciple?: {
    headline: string;
    body: string;
  };
  closingCtas: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
  relatedSlug: string;
}

export const systemDetails: Record<string, SystemDetailData> = {
  tradebot: {
    slug: "tradebot",
    name: "TradeBot",
    role: "Flagship",
    publicState: "Validation",
    hero: {
      eyebrow: "MARKET INTELLIGENCE",
      title: "TradeBot",
      proposition: "Decision support without surrendering execution authority.",
      summary: "TradeBot combines live market data, research, regime analysis, and risk controls to support intraday decisions while keeping execution authority with the human operator.",
      primaryCta: { label: "Explore research →", href: "/research" },
      secondaryCta: { label: "Back to systems →", href: "/systems" },
      image: "/textures/systems/tradebot-hero.svg",
      imageAlt: "TradeBot market intelligence multi-screen environment and real-time topology workspace",
    },
    problem: {
      label: "THE PROBLEM",
      headline: "Markets move faster than certainty.",
      body: "Intraday decisions happen under noisy data, changing regimes, execution friction, and limited time.\n\nA useful system must do more than generate a signal. It must expose uncertainty, enforce risk boundaries, and help the operator decide when not to act.",
      supportingNote: "Connection health, data freshness, and regime stability are treated as separate verification gates before any candidate insight reaches the operator.",
    },
    whatItDoes: {
      sectionHeadline: "From observation to governed decision support.",
      capabilities: [
        {
          id: "cap-1",
          number: "01",
          name: "Observe",
          description: "Collect and validate real-time market information.",
        },
        {
          id: "cap-2",
          number: "02",
          name: "Classify",
          description: "Estimate the current regime and relevant market condition.",
        },
        {
          id: "cap-3",
          number: "03",
          name: "Evaluate",
          description: "Score candidate opportunities against strategy logic and current conditions.",
        },
        {
          id: "cap-4",
          number: "04",
          name: "Govern",
          description: "Reject decisions that violate risk or operating constraints.",
        },
        {
          id: "cap-5",
          number: "05",
          name: "Support",
          description: "Present the operator with structured context rather than an opaque prediction.",
        },
        {
          id: "cap-6",
          number: "06",
          name: "Preserve Authority",
          description: "Keep final execution authority with the human operator.",
        },
      ],
    },
    howItWorks: {
      intro: "TradeBot separates responsibilities that are easy to blur in a trading system.",
      steps: [
        {
          number: "01",
          title: "Market Data",
          description: "Collect, normalize, and validate live information.",
        },
        {
          number: "02",
          title: "Regime Analysis",
          description: "Estimate whether current conditions resemble trend, range, volatility expansion, or another relevant state.",
        },
        {
          number: "03",
          title: "Research Layer",
          description: "Evaluate strategy hypotheses independently from live authority.",
        },
        {
          number: "04",
          title: "Risk Layer",
          description: "Reject decisions that violate defined risk constraints.",
        },
        {
          number: "05",
          title: "Decision Governance",
          description: "Determine whether the system has enough evidence and authority to produce a recommendation.",
        },
        {
          number: "06",
          title: "Human Approval",
          description: "The operator decides whether any trade is executed.",
        },
      ],
      supportingImage: "/textures/systems/tradebot-inner.svg",
      supportingImageAlt: "TradeBot architecture flow and read-only verification evidence pipeline",
    },
    whyItMatters: {
      headline: "A strategy is not enough.",
      body: "A good-looking signal is useless if the data is weak, the market regime has shifted, or the system cannot control risk. TradeBot is designed around the full decision process, not just the prediction.",
    },
    currentState: {
      headline: "Validation before expansion.",
      body: "Current work focuses on live observation, data reliability, signal quality, and evidence-backed decision support. Capabilities are expanded only when the evidence justifies doing so.",
    },
    closingPrinciple: {
      headline: "The system can advise. The human decides.",
      body: "That boundary is deliberate. It keeps machine analysis separate from financial authority.",
    },
    closingCtas: {
      primary: { label: "Explore TradeBot research →", href: "/research" },
      secondary: { label: "Return to systems →", href: "/systems" },
    },
    relatedSlug: "control-core",
  },

  "control-core": {
    slug: "control-core",
    name: "Aixion Control Tower",
    role: "Flagship",
    publicState: "Development",
    hero: {
      eyebrow: "ORCHESTRATION & CONTROL",
      title: "Aixion Control Tower",
      proposition: "A control plane for complex AI-assisted systems.",
      summary: "Aixion Control Tower coordinates context, tools, agents, policy, evidence, and human oversight so that intelligent workflows remain understandable and governable as they become more capable.",
      primaryCta: { label: "Explore architecture →", href: "#how-it-works" },
      secondaryCta: { label: "Back to systems →", href: "/systems" },
      image: "/textures/systems/control-hero.svg",
      imageAlt: "Aixion Control Tower command plane and layered orchestration environment",
    },
    problem: {
      label: "THE PROBLEM",
      headline: "Capability grows faster than control.",
      body: "As intelligent systems gain more tools, context, agents, and automation paths, they become harder to supervise.\n\nWithout a control layer, context fragments, policy becomes inconsistent, and responsibility becomes harder to see.",
      supportingNote: "Without explicit policy and routing boundaries, multi-agent coordination risks uncontrolled tool invocations and unverifiable execution loops.",
    },
    whatItDoes: {
      sectionHeadline: "Coordinate intelligence without losing authority.",
      capabilities: [
        {
          id: "ctl-1",
          number: "01",
          name: "Assemble Context",
          description: "Bring together the information, state, and constraints required for the current task.",
        },
        {
          id: "ctl-2",
          number: "02",
          name: "Route Work",
          description: "Direct requests to the correct service, agent, tool, or workflow.",
        },
        {
          id: "ctl-3",
          number: "03",
          name: "Apply Policy",
          description: "Check whether an intended action is allowed in the current context.",
        },
        {
          id: "ctl-4",
          number: "04",
          name: "Coordinate Tools",
          description: "Manage access to capabilities without giving every component unrestricted authority.",
        },
        {
          id: "ctl-5",
          number: "05",
          name: "Capture Evidence",
          description: "Preserve what happened, what was requested, and why the system acted.",
        },
        {
          id: "ctl-6",
          number: "06",
          name: "Escalate",
          description: "Route consequential decisions to a human when the system should not decide alone.",
        },
      ],
    },
    howItWorks: {
      intro: "The Control Tower sits between intent and execution.",
      steps: [
        {
          number: "01",
          title: "Task Intake",
          description: "Receive the request, objective, or event.",
        },
        {
          number: "02",
          title: "Context Layer",
          description: "Assemble relevant state, history, constraints, and available evidence.",
        },
        {
          number: "03",
          title: "Policy Layer",
          description: "Determine what actions are allowed.",
        },
        {
          number: "04",
          title: "Routing Layer",
          description: "Select the correct agent, service, or tool.",
        },
        {
          number: "05",
          title: "Execution Layer",
          description: "Perform only the actions that have passed the required checks.",
        },
        {
          number: "06",
          title: "Evidence Layer",
          description: "Record meaningful decisions and outcomes.",
        },
        {
          number: "07",
          title: "Human Authority",
          description: "Escalate decisions that require explicit approval.",
        },
      ],
      supportingImage: "/textures/systems/control-inner.svg",
      supportingImageAlt: "Aixion Control Tower orchestration map, policy gates, and execution trace",
    },
    whyItMatters: {
      headline: "AI systems need a control plane.",
      body: "The goal is not to make intelligence feel magical. The goal is to make capable systems composable, inspectable, and governable as complexity increases.",
    },
    currentState: {
      headline: "Building the control layer.",
      body: "Current work focuses on orchestration structure, policy logic, evidence handling, context management, and controlled execution paths.",
    },
    closingPrinciple: {
      headline: "More capability should not mean less clarity.",
      body: "The stronger the system becomes, the more important it is to preserve visible boundaries around context, tools, policy, and human authority.",
    },
    closingCtas: {
      primary: { label: "Explore related work →", href: "/research" },
      secondary: { label: "Return to systems →", href: "/systems" },
    },
    relatedSlug: "tradebot",
  },

  analytics: {
    slug: "analytics",
    name: "Analytics Lab",
    role: "Experimental",
    publicState: "Exploration",
    hero: {
      eyebrow: "ANALYTICS EXPERIMENTS",
      title: "Analytics Lab",
      proposition: "Make operational data easier to trust and act on.",
      summary: "Analytics Lab explores how messy operational data can be transformed into clearer metrics, better visibility, and more useful decision support.",
      primaryCta: { label: "Explore experiments →", href: "#how-it-works" },
      secondaryCta: { label: "Back to systems →", href: "/systems" },
      image: "/textures/systems/analytics-hero.svg",
      imageAlt: "Analytics Lab operational visibility and data integrity workspace",
    },
    problem: {
      label: "THE PROBLEM",
      headline: "Data is easy to collect. Harder to trust.",
      body: "Dashboards can look finished long before the underlying data, definitions, and assumptions are reliable.\n\nGood analytics begins with data quality, operational context, and a clear question.",
      supportingNote: "Visual polish without documented data lineage and outlier quarantine creates misleading confidence in operations.",
    },
    whatItDoes: {
      sectionHeadline: "Turn messy data into clearer decisions.",
      capabilities: [
        {
          id: "an-1",
          number: "01",
          name: "Validate Data",
          description: "Identify missing, inconsistent, or unreliable inputs.",
        },
        {
          id: "an-2",
          number: "02",
          name: "Shape Metrics",
          description: "Define measures that reflect the actual operating question.",
        },
        {
          id: "an-3",
          number: "03",
          name: "Surface Patterns",
          description: "Reveal useful trends, anomalies, and relationships.",
        },
        {
          id: "an-4",
          number: "04",
          name: "Build Views",
          description: "Create interfaces that make the important information easier to understand.",
        },
        {
          id: "an-5",
          number: "05",
          name: "Support Decisions",
          description: "Connect analysis to a real operational choice.",
        },
      ],
    },
    howItWorks: {
      intro: "Analytics Lab models operational problems from raw ingestion to verified visual decisions.",
      steps: [
        {
          number: "01",
          title: "Collect",
          description: "Bring together the relevant operational data.",
        },
        {
          number: "02",
          title: "Validate",
          description: "Check quality, completeness, and consistency.",
        },
        {
          number: "03",
          title: "Model",
          description: "Structure the information around the decision that matters.",
        },
        {
          number: "04",
          title: "Visualize",
          description: "Present the result with minimal unnecessary complexity.",
        },
        {
          number: "05",
          title: "Review",
          description: "Test whether the view actually improves understanding.",
        },
        {
          number: "06",
          title: "Refine",
          description: "Change metrics, assumptions, or presentation based on evidence.",
        },
      ],
      supportingImage: "/textures/systems/analytics-inner.svg",
      supportingImageAlt: "Analytics Lab data quality pipeline and batch audit evidence",
    },
    whyItMatters: {
      headline: "Better visibility improves judgment.",
      body: "Analytics Lab is not about producing more charts. It is about making operational questions easier to answer with confidence.",
    },
    currentState: {
      headline: "Exploration.",
      body: "Selected prototypes and analytics experiments are being shaped into clearer decision-support workflows.",
    },
    closingCtas: {
      primary: { label: "Explore related experiments →", href: "/research" },
      secondary: { label: "Return to systems →", href: "/systems" },
    },
    relatedSlug: "automation",
  },

  automation: {
    slug: "automation",
    name: "Automation Systems",
    role: "Experimental",
    publicState: "Exploration",
    hero: {
      eyebrow: "AUTOMATION",
      title: "Automation Systems",
      proposition: "Automation that remains visible when things go wrong.",
      summary: "Automation Systems explores workflow, quality, and operational automation with an emphasis on traceability, validation, observability, and controlled recovery.",
      primaryCta: { label: "Explore related work →", href: "#how-it-works" },
      secondaryCta: { label: "Back to systems →", href: "/systems" },
      image: "/textures/systems/automation-hero.svg",
      imageAlt: "Automation Systems reversible workflow engine and failure handling rig",
    },
    problem: {
      label: "THE PROBLEM",
      headline: "Automation fails at the edges.",
      body: "Most automation looks reliable on the happy path.\n\nThe real test comes when inputs change, systems respond unexpectedly, or a workflow only partially succeeds.\n\nReliable automation must make failure visible and recovery possible.",
      supportingNote: "Silent retry loops and brittle headless scrapers amplify operational failures instead of isolating them.",
    },
    whatItDoes: {
      sectionHeadline: "Reduce repetitive work without hiding errors.",
      capabilities: [
        {
          id: "au-1",
          number: "01",
          name: "Trigger",
          description: "Start work from a defined event, request, or schedule.",
        },
        {
          id: "au-2",
          number: "02",
          name: "Execute",
          description: "Perform repeatable tasks consistently.",
        },
        {
          id: "au-3",
          number: "03",
          name: "Validate",
          description: "Check whether the expected outcome actually occurred.",
        },
        {
          id: "au-4",
          number: "04",
          name: "Record",
          description: "Preserve execution details and important failures.",
        },
        {
          id: "au-5",
          number: "05",
          name: "Recover",
          description: "Retry or adapt safely when conditions permit.",
        },
        {
          id: "au-6",
          number: "06",
          name: "Escalate",
          description: "Pass unresolved cases to a human instead of silently continuing.",
        },
      ],
    },
    howItWorks: {
      intro: "Observable workflows treat failure, retry budgets, and state transitions as explicit architecture.",
      steps: [
        {
          number: "01",
          title: "Trigger",
          description: "Receive the event or request.",
        },
        {
          number: "02",
          title: "Execute",
          description: "Perform the intended workflow.",
        },
        {
          number: "03",
          title: "Check",
          description: "Validate the resulting state.",
        },
        {
          number: "04",
          title: "Record",
          description: "Capture the outcome and relevant evidence.",
        },
        {
          number: "05",
          title: "Recover",
          description: "Retry or correct when safe.",
        },
        {
          number: "06",
          title: "Escalate",
          description: "Hand off when the system should not continue alone.",
        },
      ],
      supportingImage: "/textures/systems/automation-inner.svg",
      supportingImageAlt: "Automation Systems observable workflow architecture and recovery protocol",
    },
    whyItMatters: {
      headline: "Useful automation is observable automation.",
      body: "The goal is not simply to remove manual work. It is to reduce friction without hiding failures or creating fragile dependencies.",
    },
    currentState: {
      headline: "Exploration.",
      body: "Current work is shaping workflow automation, QA patterns, and traceable task pipelines into a more coherent system direction.",
    },
    closingCtas: {
      primary: { label: "Explore related work →", href: "/research" },
      secondary: { label: "Return to systems →", href: "/systems" },
    },
    relatedSlug: "analytics",
  },
};
