---
name: phi-planning
description: Use when a design has been approved and phi should turn it into a concrete implementation plan before execution begins.
---

# Phi Planning

## Purpose

Use this after `phi-brainstorming` or any other approved design artifact.

The goal is to convert an approved direction into an executable plan with clear files, sequencing, validation, and handoff.

## Entry Condition

Use this when:

- the design has already been approved
- the next needed artifact is an implementation plan
- execution should still be deferred until the plan is explicit

Do not use this when:

- the task is still under discovery and needs more design clarification
- the task is already active debugging or verification work

## Routing Contract

- Workflow owner: `superpowers/writing-plans`
- Domain support: ECC domain skills relevant to the stack
- Local support: `phi-local` may inject project requirements and release conventions
- Next stage after planning: `phi-execute`, `phi-debugging`, or `phi-verify`, depending on the task state

Planning stays under phi so workflow decomposition and domain-specific checks remain in one artifact.

## Operating Steps

1. State that the task is now in the planning stage.
2. Restate the approved goal and the relevant design context.
3. Break the work into bite-sized, ordered tasks.
4. Include explicit file targets where possible.
5. Include validation steps and expected outputs per task.
6. End with a clear handoff to execution, debugging, or verification.

## Observable Outputs

A successful run should produce:

- an explicit implementation plan rather than more brainstorming
- ordered tasks rather than loose ideas
- validation or testing steps
- file targets where the request supports them
- a clear next-stage handoff

## Exit Condition

This skill is complete only when:

- an implementation plan exists that another agent could execute
- the next stage has been identified explicitly

Do not treat a narrative summary as a completed plan.

## Failure Modes

- Do not create a standalone upstream plan for common phi-managed work
- Do not omit domain-specific validation when ECC coverage exists
- Do not continue brainstorming once the design is approved
- Do not jump into implementation code from this skill

