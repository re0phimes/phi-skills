# Phi Skill Evaluation Design

## Purpose

This document defines how the `phi-*` skill family should be evaluated using the logic implied by `skill-creator`.

The core question is not "does the skill sound more organized?" but:

- does it trigger in the right situations
- does it make stage ownership visible
- does it route to the right next skill or domain guidance
- does it improve process discipline over baseline
- does it improve the final stage output in a measurable way

## Evaluation Principle

`phi` is an orchestration layer, so its success cannot be judged by final answer quality alone.

A valid evaluation must measure both:

1. **behavioral control** — whether the model follows the intended stage flow
2. **outcome quality** — whether the resulting artifact is more correct, complete, and verifiable

## Comparison Modes

### `without_skill`

Run the task without the target `phi-*` skill.

Expected failure patterns:

- stage confusion
- skipped control points
- weaker handoffs
- domain guidance invoked inconsistently
- completion claims made too early

### `with_skill`

Run the same task with the target `phi-*` skill.

Expected improvements:

- stronger stage recognition
- explicit routing behavior
- better preservation of workflow order
- stronger next-hop clarity
- more evidence-backed completion behavior

## Scoring Dimensions

### 1. Trigger Accuracy

Does the skill engage when the task belongs to its stage or domain?

Checks:

- should-trigger prompts
- near-miss prompts
- wrong-stage prompts

### 2. Routing Visibility

Can an evaluator tell, from the output alone, that `phi` coordinated the right stage and guidance layers?

Checks:

- current stage identified
- next stage identified
- proper owner named or clearly implied
- domain-specific guidance introduced at the right point

### 3. Process Completeness

Did the output preserve the intended control points?

Checks:

- brainstorming before planning where required
- planning before execution where required
- failing test before implementation where required
- verification before claiming success

### 4. Outcome Quality

Did the stage produce the right artifact?

Checks:

- design artifact for brainstorming
- executable plan for planning
- strict red-green-refactor flow for TDD
- completion evidence for verify

### 5. Cost and Variance

If `with_skill` becomes much longer or more expensive, determine whether the extra behavior actually improved routing or quality.

Longer output alone is not a success signal.

## Failure Taxonomy

### Thin Alias Failure

The output mentions the `phi` skill name but behaves just like baseline.

### Stage Collapse Failure

The output merges multiple stages into one response and loses orchestration boundaries.

### Empty Routing Failure

The output states ownership in abstract terms without changing what the model actually does next.

### Verification Leakage

The output claims work is complete without executed evidence.

### Domain Bleed

The output uses the wrong domain guidance or never introduces domain-specific concerns.

## Evidence Requirements

Every evaluation should capture:

- the prompt
- whether the run was `with_skill` or `without_skill`
- the output artifact
- the assertions
- grading evidence tied to specific behavior
- timing and token cost when available

## Batch Structure

### Batch 1

Workflow backbone:

- `phi-brainstorming`
- `phi-planning`
- `phi-tdd`
- `phi-verify`

### Batch 2

Execution control:

- `phi-debugging`
- `phi-execute`
- `phi-review`
- `phi-parallel`

### Batch 3

Domain routing:

- `phi-frontend`
- `phi-backend`
- `phi-python`
- `phi-java`
- `phi-db`
- `phi-faq`

## Relation to First-Batch Eval Design

`docs/plans/2026-03-12-phi-skill-first-batch-evals.md` contains the concrete prompts and assertions for Batch 1.

This file is the umbrella rubric.
