---
name: phi-verify
description: Use when work is nearly done and phi should run completion checks before claiming success, including stack-specific validation where relevant.
---

# Phi Verify

## Purpose

Use this before claiming a task is complete.

The goal is to replace assumption-based completion with evidence-based completion.

## Entry Condition

Use this when:

- implementation or debugging work is nearly done
- someone is about to claim success
- the task needs final proof, not just reasoning

Do not use this when:

- the task is still primarily planning
- the implementation work has not yet been attempted

## Routing Contract

- Workflow owner: `superpowers/verification-before-completion`
- Domain support: ECC verification, testing, security, or deployment skills relevant to the stack
- Local support: `phi-local` may add release gates or product-specific checks
- This is the final workflow gate before a completion claim

## Operating Steps

1. State that the task is in the final verification stage.
2. Identify which checks are relevant for this stack and request.
3. Confirm which checks have actually been run.
4. Compare the evidence against the original request.
5. Call out missing evidence or known limitations explicitly.
6. Only then allow a completion claim.

## Observable Outputs

A successful run should produce:

- relevant tests run
- build or static checks run where applicable
- behavior confirmed against the original request
- known limitations called out explicitly

It should be possible to tell from the output what evidence exists and what is still missing.

## Exit Condition

This skill is complete only when one of these is true:

- the task has enough executed evidence to support completion
- the response clearly says completion cannot yet be claimed

## Failure Modes

- Do not claim success from reasoning alone
- Do not skip domain-specific verification if ECC guidance exists
- Do not confuse "we should run tests" with "tests were run"
- Do not hide missing evidence behind a confident summary

