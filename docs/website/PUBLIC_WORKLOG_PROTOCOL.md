# Aixion Lab Public Worklog Protocol

## Purpose

Aixion Lab should show meaningful ongoing engineering work without becoming a raw activity feed.

The public website publishes curated state changes, evidence-backed milestones and next gates. It does not publish chat transcripts, raw commit volume, credentials, proprietary strategy logic, private operational data or unverified claims.

## Public surfaces

### Home

Shows the current active work item and latest validated activity so a visitor can see that the lab is alive without reading the full Pulse.

### Pulse

Shows:

1. Working now — active public-safe work with state, evidence and next gate.
2. System maturity — categorical system state.
3. Current cycle — current focus, latest evidence and next gate for each system.
4. Public worklog — meaningful historical changes to capability, evidence or authority.

## Publish an item when

Publish when work materially changes at least one of:

- capability
- architecture
- evidence
- validation state
- authority boundary
- production readiness
- public research conclusion
- operating state

Do not publish routine refactors, cosmetic commit volume, exploratory chatter or intermediate claims that have not survived the relevant validation gate.

## Required fields

Every work item must include:

- stable work ID
- date
- public area/system
- type
- categorical state
- title
- concise public-safe summary
- evidence that can be truthfully stated
- next gate

## State rules

Use existing Aixion state language where possible: RESEARCH, BUILDING, VALIDATING, OPERATING, ARCHIVED. Worklog-specific evidence states such as VALIDATED, LOCKED, ENFORCED or BOUNDARY may be used only when the entry itself supports that claim.

Never use arbitrary completion percentages.

## Privacy boundary

Never publish:

- credentials, tokens, account identifiers or private endpoints
- raw private logs or conversation transcripts
- proprietary TradeBot signal mechanics, parameters or execution rules
- private datasets or evidence that is not approved for public release
- personal/private contact details
- fabricated metrics, ROI, customers, users, performance or adoption

When in doubt, publish the engineering decision and boundary, not the private implementation detail.

## Ongoing workflow

When meaningful work is completed:

1. Decide whether the result is public-safe and material.
2. Update `content/lab-activity.json`.
3. If a system's maturity/focus changed, update the appropriate system state manifest too.
4. Run the production CI/browser suite.
5. Publish only after the relevant gates pass.
6. If work is still active, keep it under `active`; when validated/closed, move it into `entries` with the truthful resulting state.

This protocol is the publishing contract for future Aixion Lab activity.
