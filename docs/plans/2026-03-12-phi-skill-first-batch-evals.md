# Phi Skill First-Batch Eval Design

## Scope

This first batch evaluates the workflow backbone skills:

- `phi-brainstorming`
- `phi-planning`
- `phi-tdd`
- `phi-verify`

These four skills are the minimum set needed to prove that `phi` is acting like an orchestration layer rather than a loose naming wrapper.

## Evaluation Goal

The goal is not merely to show that `with_skill` produces more text. The goal is to show that `with_skill` produces:

- clearer stage recognition
- more explicit routing decisions
- fewer skipped control points
- stronger handoff discipline
- better completion evidence

## Comparison Design

For each prompt:

- run once **without** the target `phi-*` skill
- run once **with** the target `phi-*` skill

If results vary heavily, rerun 3 times and compare patterns rather than single samples.

## Core Rubric

### 1. Trigger Accuracy

Questions:

- Did the model treat the prompt as belonging to the right stage?
- Did it avoid triggering the wrong stage skill?

### 2. Routing Visibility

Questions:

- Did the model identify the current stage owner?
- Did it explicitly route to the correct next skill or stage?
- Did it show where domain guidance belongs?

This is the main `phi`-specific metric.

### 3. Process Completeness

Questions:

- Did it skip clarification, planning, tests, or verification?
- Did it preserve the stage order?

### 4. Outcome Quality

Questions:

- Did the answer produce the right artifact for the stage?
- Did it define the next action clearly?
- Did it avoid claiming completion too early?

## What Counts as a Routing Win

A result counts as a routing win only if it does at least one thing that the baseline often misses:

- explicitly identifies the right workflow stage
- explicitly names the proper next hop
- refuses to skip a mandatory control point
- adds stage-appropriate output expectations

Longer prose without better stage control is not a routing win.

## Skill-by-Skill Eval Design

### `phi-brainstorming`

**Should-trigger prompt 1**

`phi-brainstorming I want to add a lightweight review queue to our FAQ workflow so editors can approve generated answers before publishing. Help me think through the design before we build it.`

**Should-trigger prompt 2**

`We need to redesign the onboarding flow for a mobile-first dashboard. Use phi-brainstorming and figure out the design path before implementation.`

**Near-miss prompt**

`The review queue is already designed in docs/plans/review-queue.md. Turn it into an execution plan.`

**Expected routing signals**

- recognizes this as design-entry work
- does not jump to implementation
- asks clarifying questions or frames discovery
- proposes alternatives
- hands off to `phi-planning`

**Assertions**

- identified design/discovery as current stage
- did not begin implementation steps immediately
- included alternatives or design options
- named or implied handoff to planning

### `phi-planning`

**Should-trigger prompt 1**

`The design is approved. Use phi-planning to break the FAQ review queue into an implementation plan with file targets, validation, and handoff.`

**Should-trigger prompt 2**

`We already agreed on the backend auth redesign. I need a concrete execution plan, not more brainstorming.`

**Near-miss prompt**

`The tests are failing after the auth redesign. Investigate the regression.`

**Expected routing signals**

- recognizes planning stage
- produces a bite-sized implementation plan
- includes validation
- routes next to execute, debugging, or verify depending on context

**Assertions**

- identified planning as current stage
- produced actionable implementation steps
- included verification or testing steps
- named the correct next-phase handoff

### `phi-tdd`

**Should-trigger prompt 1**

`Use phi-tdd to add CSV export support to the Python CLI. I want a strict test-first flow.`

**Should-trigger prompt 2**

`This Java service needs a behavior change for 401 retry handling. Use phi-tdd, not code-first patching.`

**Near-miss prompt**

`Explain what TDD is and whether it makes sense for our team.`

**Expected routing signals**

- identifies behavior-change work
- starts with a failing test
- prevents code-first behavior
- keeps red-green-refactor explicit

**Assertions**

- identified test-first behavior as required
- stated failing test before implementation
- rejected or discouraged code-first flow
- included refactor after passing tests

### `phi-verify`

**Should-trigger prompt 1**

`The backend route change is done. Use phi-verify before we claim it is complete.`

**Should-trigger prompt 2**

`We finished the FAQ extraction pipeline. Run completion checks with phi-verify and tell me what evidence is still missing.`

**Near-miss prompt**

`Plan the verification strategy for a feature that has not been implemented yet.`

**Expected routing signals**

- recognizes final-proof stage
- asks for executed checks rather than only reasoning
- demands evidence from tests or builds where relevant
- calls out limitations if verification is incomplete

**Assertions**

- identified completion-check stage correctly
- requested or referenced executed verification steps
- did not claim success from reasoning alone
- surfaced missing evidence or limitations when present

## Grading Notes

Each assertion should be marked as:

- passed
- failed
- unclear

When grading `phi` skills, write evidence in terms of observable behavior, not vibe:

- what stage language appeared
- what next-step routing was shown
- what control point was skipped or preserved

## Failure Patterns to Watch

### False Routing

The model names the right skill but behaves like baseline.

Example:

- says "we should use phi-planning"
- then immediately writes implementation code or a loose summary instead of a structured plan

### Empty Verbosity

The model adds more orchestration words but no stronger stage control.

### Domain Bleed

The model mixes design, planning, implementation, and verification in a single answer with no clear owner.

### Weak Exit Condition

The model does useful work but fails to state the proper next stage.

## Success Threshold for Batch 1

Batch 1 is successful only if `with_skill` shows a clear advantage over `without_skill` in at least these ways:

- stage identification improves
- required control points are skipped less often
- next-hop routing becomes more explicit
- completion claims become more evidence-based

If the outputs only become longer, Batch 1 fails even if they sound more organized.

## Observed Runs

### `phi-brainstorming`

Prompt used:

`I want to add a lightweight review queue to our FAQ workflow so editors can approve generated answers before publishing. Help me think through the design before we build it.`

Observed baseline pattern:

- answered directly with a fairly detailed design
- did not clearly identify the current stage
- did not preserve a strict design-only boundary
- did not clearly hand off to planning

Observed `with_skill` pattern:

- explicitly identified the current work as design-stage work
- did not jump into implementation
- asked a clarifying question before committing to a solution
- preserved the handoff boundary to `phi-planning`

Result:

- `with_skill` showed a routing win through stronger stage control

### `phi-planning`

Prompt used:

`The design is approved. Break the FAQ review queue into an implementation plan with file targets, validation, and handoff.`

Observed baseline pattern:

- produced a usable implementation plan
- included validation and a next-step handoff
- did not explicitly identify planning as the current stage
- gave a softer handoff that did not make phi stage ownership very visible

Observed `with_skill` pattern:

- explicitly identified the work as planning-stage work
- restated the approved goal before decomposing the work
- produced ordered steps with concrete file targets and validation commands
- named `phi-execute` as the next owner, with `phi-debugging` and `phi-verify` as boundary conditions

Result:

- `with_skill` showed a routing win through clearer stage declaration and stronger next-hop visibility

### `phi-tdd`

Prompt used:

`Add CSV export support to the Python CLI. I want a strict test-first flow.`

Observed baseline pattern:

- already started with failing tests
- kept red-green-refactor reasonably explicit
- included a verification-oriented handoff at the end
- did not make phi ownership or `phi-verify` routing explicit

Observed `with_skill` pattern:

- explicitly framed the task as `phi-tdd` behavior-change work
- started with one failing test and confirmed the failure reason
- preserved a tighter minimum-change-until-green flow
- handed off explicitly to `phi-verify` for final completion checks

Result:

- `with_skill` showed a narrower routing win
- the main improvement was phi-specific routing visibility, not a large improvement in raw TDD discipline
- this case suggests generic TDD behavior may already be strong even without phi, so future phi-tdd upgrades should optimize for orchestration clarity rather than more TDD prose

### `phi-verify`

Prompt used:

`The backend route change is done. Use phi-verify before we claim it is complete.`

Observed baseline pattern:

- produced a reasonable checklist
- did not clearly separate executed evidence from suggested checks
- was weaker on completion-gate discipline

Observed `with_skill` pattern:

- explicitly identified final verification as the current stage
- required executed evidence rather than reasoning alone
- used actual local evidence from this repo
- refused to claim completion because backend-route evidence was missing

Executed evidence seen during the run:

- `powershell -ExecutionPolicy Bypass -File .\shared\scripts\validate-series-layout.ps1`
- result: `Series layout validation passed.`

Result:

- `with_skill` showed a routing win through stronger evidence discipline
