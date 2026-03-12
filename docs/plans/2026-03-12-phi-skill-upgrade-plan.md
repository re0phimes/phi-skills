# Phi Skill Upgrade Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade the `phi-*` skill family from a routing-oriented catalog into a verifiable orchestration layer that shows explicit stage ownership, observable routing behavior, and measurable improvement in `with_skill` versus `without_skill` runs.

**Architecture:** Strengthen the workflow skills first so they define a hard execution backbone, then upgrade domain skills so they make stage-to-skill routing explicit. Add evaluation artifacts that measure trigger accuracy, routing visibility, process completeness, and outcome quality, with special emphasis on whether `phi` visibly coordinates multiple upstream skills rather than acting as a thin alias.

**Tech Stack:** Markdown skill files, Markdown plan docs, JSON metadata, skill evaluation prompts/assertions, benchmark viewer workflow

---

### Task 1: Add a repository-level evaluation rubric for `phi` skills

**Files:**
- Create: `docs/plans/2026-03-12-phi-skill-eval-design.md`
- Reference: `skills/phi/`
- Reference: `lib/skill-map.json`
- Reference: `docs/usage-examples.md`

**Step 1: Write the failing review**

Review the current `phi-*` skills and note where they explain ownership but do not prove routing behavior.

Expected finding:
- many skills describe primary and secondary sources
- few skills define observable routing signals or stage outputs

**Step 2: Write the rubric**

The rubric must define how each `phi-*` skill will be judged in `with_skill` and `without_skill` runs:

- trigger accuracy
- routing visibility
- process completeness
- outcome quality
- cost and variance observations where relevant

**Step 3: Add explicit routing assertions**

Document how to tell whether a `phi` skill actually orchestrated multiple skills:

- stage owner identified correctly
- proper next hop selected
- domain guidance included when required
- completion routed through `phi-verify`

**Step 4: Commit**

```bash
git add docs/plans/2026-03-12-phi-skill-eval-design.md
git commit -m "docs: define phi skill evaluation rubric"
```

### Task 2: Upgrade the workflow backbone skills first

**Files:**
- Modify: `skills/phi/phi-brainstorming/SKILL.md`
- Modify: `skills/phi/phi-planning/SKILL.md`
- Modify: `skills/phi/phi-debugging/SKILL.md`
- Modify: `skills/phi/phi-tdd/SKILL.md`
- Modify: `skills/phi/phi-execute/SKILL.md`
- Modify: `skills/phi/phi-verify/SKILL.md`
- Modify: `docs/usage-examples.md`

**Step 1: Write the failing review**

Read each workflow skill and capture the same questions:

- what stage does it own
- what concrete output must it produce
- what skill does it hand off to next
- what anti-patterns must it forbid

Expected finding:
- stage ownership is present
- output contracts and observable routing signals are under-specified

**Step 2: Rewrite each skill around one fixed template**

Each workflow skill should explicitly include:

- purpose
- entry condition
- routing contract
- operating steps
- observable outputs
- exit condition
- failure modes

**Step 3: Strengthen anti-rationalization language where discipline matters**

Especially for:

- `phi-debugging`
- `phi-tdd`
- `phi-verify`

Add explicit counters for skipping evidence, skipping tests, or claiming completion from reasoning alone.

**Step 4: Add routing-visible usage examples**

Update `docs/usage-examples.md` so each workflow example shows stage-by-stage movement rather than only naming the final orchestration.

**Step 5: Commit**

```bash
git add skills/phi/phi-brainstorming/SKILL.md skills/phi/phi-planning/SKILL.md skills/phi/phi-debugging/SKILL.md skills/phi/phi-tdd/SKILL.md skills/phi/phi-execute/SKILL.md skills/phi/phi-verify/SKILL.md docs/usage-examples.md
git commit -m "feat: strengthen phi workflow skills for observable orchestration"
```

### Task 3: Build first-batch evals for the workflow backbone

**Files:**
- Create: `docs/plans/2026-03-12-phi-skill-first-batch-evals.md`
- Optionally create later: `evals/phi-workflow-first-batch.json`
- Reference: `skills/phi/phi-brainstorming/SKILL.md`
- Reference: `skills/phi/phi-planning/SKILL.md`
- Reference: `skills/phi/phi-tdd/SKILL.md`
- Reference: `skills/phi/phi-verify/SKILL.md`

**Step 1: Define first-batch scope**

The first batch covers:

- `phi-brainstorming`
- `phi-planning`
- `phi-tdd`
- `phi-verify`

These are the minimum backbone skills needed before testing domain routing.

**Step 2: Write `with_skill` and `without_skill` prompts**

For each selected skill, create:

- at least 2 should-trigger prompts
- at least 1 near-miss prompt
- explicit expected routing signals

**Step 3: Write assertions**

For each prompt, define assertions such as:

- the model identified the right stage
- the model followed the right next-step order
- the model mentioned required outputs
- the model did not skip required control points

**Step 4: Describe grading and benchmark interpretation**

The doc must explain what counts as a routing win versus a prose-only win.

**Step 5: Commit**

```bash
git add docs/plans/2026-03-12-phi-skill-first-batch-evals.md
git commit -m "docs: add first-batch phi workflow eval design"
```

### Task 4: Upgrade the execution-control specialists

**Files:**
- Modify: `skills/phi/phi-parallel/SKILL.md`
- Modify: `skills/phi/phi-review/SKILL.md`

**Step 1: Write the failing review**

Capture what is ambiguous today:

- when `phi-parallel` should be used instead of `phi-execute`
- when `phi-review` is requesting review versus processing review feedback

**Step 2: Make mode selection explicit**

For `phi-parallel`:

- define safe split conditions
- define shared-write red flags
- define merge-back requirements

For `phi-review`:

- define request-review mode
- define receive-feedback mode
- define output per mode

**Step 3: Add completion rules**

Both skills must end with an explicit next step or handoff.

**Step 4: Commit**

```bash
git add skills/phi/phi-parallel/SKILL.md skills/phi/phi-review/SKILL.md
git commit -m "feat: clarify phi review and parallel orchestration modes"
```

### Task 5: Upgrade the domain skills to expose real routing behavior

**Files:**
- Modify: `skills/phi/phi-frontend/SKILL.md`
- Modify: `skills/phi/phi-backend/SKILL.md`
- Modify: `skills/phi/phi-python/SKILL.md`
- Modify: `skills/phi/phi-java/SKILL.md`
- Modify: `skills/phi/phi-db/SKILL.md`
- Modify: `skills/phi/phi-faq/SKILL.md`
- Modify: `lib/skill-map.json`

**Step 1: Write the failing review**

For each domain skill, answer:

- what workflow path is mandatory
- what domain skill(s) should appear during implementation guidance
- what domain-specific verification must appear before completion

Expected finding:
- current skills identify the path
- they do not strongly require routing-visible domain behavior

**Step 2: Rewrite each domain skill using a domain routing template**

Each domain skill should include:

- entry condition
- default stage path
- domain owner by stage
- required domain concerns
- observable domain outputs
- verify requirements

**Step 3: Make `phi-faq` the model for cross-series orchestration**

`phi-faq` must explicitly demonstrate:

- when to invoke `faq-generator`
- when to invoke `faq-grounded-review`
- when to invoke `faq-judge`
- when `phi-verify` closes the loop

**Step 4: Align `lib/skill-map.json`**

Update trigger areas or descriptions if the rewritten skill contracts expose clearer routing semantics.

**Step 5: Commit**

```bash
git add skills/phi/phi-frontend/SKILL.md skills/phi/phi-backend/SKILL.md skills/phi/phi-python/SKILL.md skills/phi/phi-java/SKILL.md skills/phi/phi-db/SKILL.md skills/phi/phi-faq/SKILL.md lib/skill-map.json
git commit -m "feat: make phi domain skills expose explicit routing behavior"
```

### Task 6: Build second-batch evals for domain routing

**Files:**
- Modify: `docs/plans/2026-03-12-phi-skill-first-batch-evals.md`
- Create later if needed: `evals/phi-domain-routing.json`

**Step 1: Add domain-specific eval prompts**

Create prompts that force clear domain routing decisions, such as:

- frontend UI change
- backend route change
- Python automation task
- DB migration issue
- FAQ generation and review workflow

**Step 2: Add routing assertions**

Assertions must check not only outcome quality but whether the proper domain guidance appeared in the right phase.

**Step 3: Add confusing edge cases**

Examples:

- frontend bug that is actually backend
- review request that is actually verify
- FAQ extraction that should route through `phi-faq`, not generic writing

**Step 4: Commit**

```bash
git add docs/plans/2026-03-12-phi-skill-first-batch-evals.md
git commit -m "docs: extend phi eval design for domain routing cases"
```

### Task 7: Run `with_skill` versus `without_skill` experiments

**Files:**
- Create: `evals/` artifacts as needed
- Create: per-skill workspace folders under a sibling evaluation workspace
- Reference: `skills/phi/`
- Reference: `docs/plans/2026-03-12-phi-skill-eval-design.md`
- Reference: `docs/plans/2026-03-12-phi-skill-first-batch-evals.md`

**Step 1: Run baseline**

For each selected eval prompt:

- run without the `phi-*` skill
- save outputs
- capture timing

**Step 2: Run with skill**

Use the corresponding `phi-*` skill path and save outputs separately.

**Step 3: Grade**

Grade assertions and aggregate results.

**Step 4: Analyze**

Specifically analyze:

- did the skill improve stage discipline
- did the skill improve domain routing visibility
- did the skill merely add words without changing behavior

**Step 5: Commit evaluation assets if appropriate**

Only commit durable evaluation artifacts that should live in the repository. Keep bulky transient outputs out unless there is a clear reason.

### Task 8: Tighten the skills based on measured failures

**Files:**
- Modify: the individual `skills/phi/*.md` files that failed evals
- Modify: `docs/usage-examples.md`
- Modify: `lib/skill-map.json` if trigger issues appear

**Step 1: Group failures**

Group by root cause:

- trigger miss
- routing ambiguity
- missing output contract
- missing anti-pattern guard
- missing domain check

**Step 2: Rewrite minimally**

Fix the cause shown by the evals. Avoid adding generic verbosity.

**Step 3: Re-run the same eval set**

Do not change the prompts before proving improvement on the original failures.

**Step 4: Commit**

```bash
git add skills/phi docs/usage-examples.md lib/skill-map.json
git commit -m "refactor: tighten phi skills based on routing eval results"
```

### Task 9: Finalize the orchestration source metadata

**Files:**
- Modify: `lib/source-manifest.json`
- Modify: `README.md`
- Modify: `docs/series.md`

**Step 1: Review metadata after skill rewrites**

Confirm the repository manifest still matches:

- series boundaries
- package paths
- compatibility paths
- host-facing install docs

**Step 2: Document routing claims carefully**

Do not claim benchmark success in docs until the `with_skill` versus `without_skill` comparisons have been run.

**Step 3: Commit**

```bash
git add lib/source-manifest.json README.md docs/series.md
git commit -m "docs: finalize phi source metadata after skill upgrade"
```

### Task 10: Final verification pass

**Files:**
- Verify only

**Step 1: Validate repository layout**

Run: `powershell -ExecutionPolicy Bypass -File .\shared\scripts\validate-series-layout.ps1`
Expected: `Series layout validation passed.`

**Step 2: Validate JSON**

Run: `Get-ChildItem -Recurse -Include *.json lib packages shared | ForEach-Object { Get-Content $_.FullName | ConvertFrom-Json | Out-Null }`
Expected: no parse errors

**Step 3: Validate skill integrity**

Review every changed `phi-*` skill and confirm:

- clear purpose
- clear operating steps
- clear exit condition
- observable routing behavior

**Step 4: Confirm evaluation evidence exists**

Before claiming success, confirm at least one real `with_skill` versus `without_skill` cycle has been completed for the first batch.

