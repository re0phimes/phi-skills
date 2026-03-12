---
name: phi-brainstorming
description: Use when starting new feature, UX, workflow, or behavior design work and phi should control discovery before planning or implementation begins.
---

# Phi Brainstorming

## Purpose

Use this as the required design-stage entrypoint in the phi system.

The goal is to make the current stage explicit, keep design discovery under one workflow owner, and prevent the model from jumping straight into planning or implementation.

## Entry Condition

Use this when:

- the user wants to add or change a feature, workflow, UX flow, or behavior
- the requirements are incomplete or still negotiable
- implementation should not begin yet

Do not use this when:

- a design is already approved and the task is now planning work
- the task is already clearly debugging, execution, or verification work

## Routing Contract

- Workflow owner: `superpowers/brainstorming`
- Domain support: select ECC guidance only after the task domain is clear
- Local support: `phi-local` may add product constraints after the design flow is established
- Next stage after approval: `phi-planning`

During this stage, phi owns the workflow. Domain skills may inform the design, but they do not replace the design process.

## Operating Steps

1. State that the task is in the design stage.
2. Inspect project context before proposing solutions.
3. Ask one clarifying question at a time until the scope and constraints are clear.
4. Present 2-3 approaches with a recommendation.
5. Validate the design section by section.
6. Stop at approval and hand off to `phi-planning`.

## Observable Outputs

A successful run should produce:

- an explicit signal that phi is handling design-stage work
- at least one clarifying turn when requirements are incomplete
- alternatives with trade-offs
- a recommended design direction
- a clear handoff to `phi-planning` after approval

## Exit Condition

This skill is complete only when one of these is true:

- the design is approved and handed off to `phi-planning`
- the task is reclassified as not actually being design-stage work

Do not continue into implementation from this skill.

## Failure Modes

- Do not start common design work by invoking `superpowers/brainstorming` directly
- Do not jump to implementation before approval
- Do not let ECC own the workflow stage
- Do not skip clarifying questions when requirements are still unclear
- Do not hand off to `phi-execute` before the planning stage exists

