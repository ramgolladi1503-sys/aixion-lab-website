# Aixion Task Packet Contract

Every autonomous task should be reduced to this contract before execution.

```yaml
task_id: <stable-id>
project: <registry-id>
objective: <one measurable outcome>
why_now: <one sentence>

inputs:
  required_files: []
  optional_files: []
  external_sources: []

scope:
  allowed_paths: []
  forbidden_paths: []
  allowed_tools: []
  network: false

constraints:
  - <hard invariant>

acceptance:
  - <machine-checkable condition where possible>
  - <human/visual condition only when necessary>

verification:
  commands: []
  artifacts: []

stop_conditions:
  - acceptance criteria pass
  - required evidence is unavailable
  - requested action would leave declared scope
  - destructive or irreversible action requires approval

output:
  summary_max_words: 250
  persist:
    - decisions
    - failures
    - evidence
```

## Rules
- The worker does not expand scope because it notices unrelated problems.
- Missing evidence is reported, not fabricated.
- Failed attempts are recorded once with cause and evidence.
- Repeated attempts must materially change the hypothesis or method.
- A planner may propose additional work but cannot silently add it to the active task.
- Verification must report what was actually run.
- No worker should need the full chat transcript to continue the task.

## Two examples

### Website
Objective: match the frozen Home-page visual reference at desktop width.
Allowed paths: `app/`, `components/`, related styles/tests.
Acceptance: visual comparison + Playwright pass.
Forbidden: changing project hierarchy or copy unless needed for layout.

### Control Tower
Objective: prove an adapter can receive an approval request, display a diff summary, accept/deny, and return a signed decision event.
Allowed paths: adapter and test packages only.
Acceptance: approval, denial, timeout, replay, and audit-log tests pass.
Forbidden: bypassing approval policy to make the happy path pass.
```
