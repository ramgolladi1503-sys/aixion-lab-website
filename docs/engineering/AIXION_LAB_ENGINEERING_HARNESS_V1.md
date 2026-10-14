# Aixion Lab Engineering Harness v1

## Goal
Create one lightweight operating layer for all Aixion Lab projects. The harness must reduce repeated prompting, keep project context out of chat history, preserve decisions and failures, and let Claude Code/Codex/other agents work from small task packets.

This is not a TradeBot-only system. It covers the Lab as a portfolio.

## Portfolio scope
### Flagship systems
- TradeBot
- Aixion Control Tower

### Supporting / experimental systems
- MCP / MCP Shield work
- VeriForge
- Job Application Agent
- Axiom
- Tablock
- website and future prototypes

Do not promote an experimental repository to flagship status automatically.

## Design principles
1. Repository state is the source of truth; conversation history is not.
2. Load context on demand. Never inject the whole Lab into every task.
3. Use deterministic tooling before model reasoning.
4. Persist useful outputs as artifacts, not prose trapped in chat.
5. Record failures and rejected approaches so they are not rediscovered.
6. Every autonomous action must have an explicit scope and stop condition.
7. Expensive reasoning should be reserved for ambiguity, architecture, synthesis, or high-risk decisions.
8. Verification is a separate stage from generation.

## Core architecture

```
User / Operator
      |
      v
Aixion Task Router
      |
      +--> portfolio registry
      +--> project manifest
      +--> capability registry
      +--> evidence/failure memory
      |
      v
Task Packet Builder
      |
      +--> exact objective
      +--> allowed files/tools
      +--> constraints
      +--> acceptance tests
      +--> stop conditions
      |
      v
Worker
      |
      +--> deterministic checks first
      +--> model only when needed
      |
      v
Verifier
      |
      +--> tests / lint / visual diff / data checks
      |
      v
Artifact + Decision Record
```

## Shared data layer
Each project should expose these small files:

```
.aixion/
  project.yaml
  context.md
  decisions.jsonl
  failures.jsonl
  evidence.jsonl
  task-cache/
  reports/
```

### project.yaml
Contains only stable facts:
- project name
- status: flagship | active | experimental | parked
- repository
- stack
- commands
- test entrypoints
- deployment target
- allowed tools
- risk class
- owners

### context.md
Maximum ~2-4 KB. It should contain only current architecture, current objective, and important constraints.

### decisions.jsonl
Append-only architecture/product decisions. Do not make the model re-derive settled choices.

### failures.jsonl
Append-only rejected ideas, failed experiments, broken prompts, root causes, and conditions under which they could be reconsidered.

### evidence.jsonl
Pointers to proofs: commits, tests, benchmark files, screenshots, datasets, research reports, deployment checks.

## Shared capability set
Start with a small set. Avoid the giant-agent-tree mistake.

1. task-router
   - classifies request by project and task type
   - loads only required context

2. repo-explorer
   - cheap file/code discovery
   - no implementation unless explicitly delegated

3. planner
   - converts ambiguous work into bounded task packets
   - must cite repo evidence for architectural claims

4. implementer
   - edits only within declared scope
   - no opportunistic redesign

5. verifier
   - test/lint/build/visual/evidence checks
   - independent of implementer where practical

6. failure-miner
   - extracts reusable lessons from failed work
   - writes compact failure records

7. release-gate
   - checks acceptance criteria before merge/deploy

8. research-synthesizer
   - for market, AI, product, architecture, and technical research
   - persists source-backed conclusions and uncertainty

## Routing examples

### Example: website visual bug
Load:
- website project.yaml
- current design authority
- affected page/component
- Playwright/visual acceptance tests

Do not load:
- TradeBot strategy history
- market data notes
- MCP Shield internals

### Example: Control Tower approval workflow
Load:
- control tower project.yaml
- adapter contract
- approval event schema
- latest failures/decisions for remote control

Do not load:
- website styling
- trading research corpus

## Token-control rules
- hard cap initial task packet to ~8 KB unless explicitly raised
- search/fetch files first; never paste whole repositories
- prefer references to files/commits over copied content
- summarize completed work into state files before ending a session
- start new workers with task packets, not full parent conversation
- use cheap models for search, classification, formatting, simple edits
- use stronger models for architecture, debugging across systems, or synthesis
- batch hypotheses/tasks where possible instead of conversational ping-pong

## Verification patterns
### Engineering work
generate -> unit tests -> integration tests -> static checks -> review -> artifact

### UI work
generate -> run app -> screenshot -> compare to authority -> fix -> repeat

### Research work
question -> source collection -> evidence table -> hypothesis/claim -> test -> robustness -> verdict -> persist

### Agent/adapter work
contract -> simulation -> denied-path tests -> approval-path tests -> interruption tests -> audit-log verification

## Continuous learning
At session end, extract only durable information:
- new failure mode
- new proven fix
- new invariant
- new reusable command
- changed architecture decision

Do not save raw transcript or generic commentary.

## What to adopt from ECC-style systems
Adopt:
- subagent isolation
- selective context loading
- model routing
- stop/session-end learning hooks
- verification loops
- scoped rules
- parallel worktrees for independent work
- secrets/tool-use guards

Avoid:
- installing every agent/skill globally
- huge always-on rule files
- automatic memory of entire sessions
- parallel workers that edit overlapping files
- MCP sprawl
- recursive planning loops

## Rollout
Phase 1: manifests + compact context + failure/evidence logs.
Phase 2: task packet generator + verifier templates.
Phase 3: hooks for session-end extraction and pre-merge checks.
Phase 4: model routing and cross-project task router.
Phase 5: telemetry: tokens/task, retries/task, failure recurrence, verification pass rate.

## Success metrics
Track:
- median tokens per completed task
- prompts per completed task
- repeated-failure rate
- percent of tasks with deterministic verification
- percent of sessions that leave reusable artifacts
- cross-project context leakage incidents
- time from task start to verified completion

The system is successful only if these improve. More agents is not a success metric.
