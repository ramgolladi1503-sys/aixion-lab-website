# Aixion Lab Website — Agent instructions

Central policy: https://github.com/ramgolladi1503-sys/aixion-agent-os

This project uses Aixion Agent OS for task classification, agent selection,
requirements, implementation and independent QA. Follow existing project
instructions and CI. Preserve website behavior, accessibility, and the existing
deployment process.

## Task lifecycle

Track every project task durably through these explicit states, in order:

`BACKLOG → REQUIREMENT_READY → DESIGN_READY → IN_DEVELOPMENT → DEV_VERIFIED → QA_VERIFIED → UAT_APPROVED → RELEASE_READY → MERGED`

Persist task state in the configured durable task system. Attach specific,
reviewable evidence for every transition in `.aixion/evidence`; do not advance
on missing, unsupported, or stale evidence. Keep implementer-recorded developer
verification separate from independent QA performed and recorded by a reviewer
other than the implementer.

Transitions requiring protected approval require authenticated human approval
recorded in the configured approval mechanism. Never infer approval from a
message, test result, or agent action. If state storage, evidence, independent
QA, approval, or transition interfaces are unavailable, fail closed and report
the task as blocked at its current state.

## Interfaces and release controls

Report only Codex or Antigravity interfaces, adapters, lifecycle actions, and
evidence capabilities that are actually available and used. If an interface is
unavailable or unverified, say so; do not imply that it ran.

Do not merge, deploy, or publish without explicit human authorization. Do not
bypass review or CI. Preserve accessibility behavior and validate relevant
routes, viewports, and accessibility requirements before proposing release.

The repository's onboarding governance workflow validates configuration
metadata only. It does not run agents, operate native development apps, execute
the task lifecycle, or certify release approval.
