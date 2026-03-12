---
name: phi-tdd
description: Use when implementing a feature, bugfix, or behavior change and phi should enforce strict test-first development with domain-aware testing support.
---

# Phi TDD

## Purpose

Use this whenever production behavior will change.

The goal is to keep red-green-refactor explicit, prevent code-first shortcuts, and combine strict workflow discipline with stack-specific testing guidance.

## Entry Condition

Use this when:

- production behavior will change
- a bugfix requires behavior to be locked with tests
- the request calls for feature delivery through a test-first loop

Do not use this when:

- the task is still design or planning work
- the task is pure investigation with no behavior change yet

## Routing Contract

- Workflow owner: `superpowers/test-driven-development`
- Domain support: ECC testing skills such as `python-testing`, `golang-testing`, `springboot-tdd`, `django-tdd`, or `e2e-testing`
- Local support: `phi-local` may add business acceptance criteria or regression cases
- Typical next stage after successful cycle: continue implementation through the same loop, then finish with `phi-verify`

## Operating Steps

1. Write one failing test
2. Confirm the failure is correct
3. Write the minimum code to pass
4. Re-run tests
5. Refactor without changing behavior

## Observable Outputs

A successful run should produce:

- an explicit failing-test-first step
- evidence that the initial failure is meaningful
- minimum implementation rather than speculative refactors
- a passing test result before refactor
- a final handoff to `phi-verify` when the behavior change is complete

## Exit Condition

This skill is complete only when:

- the target behavior is protected by tests
- the tests pass after the implementation change
- the work is ready for verification

## Failure Modes

- Do not write production code first
- Do not call upstream testing skills directly for common phi-managed work unless phi delegates explicitly
- Do not claim that "small changes do not need tests"
- Do not collapse red, green, and refactor into one vague implementation step
- Do not move to completion without a verification handoff

