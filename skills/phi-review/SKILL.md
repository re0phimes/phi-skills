---
name: phi-review
description: Use when phi-managed work needs review, review feedback processing, or final quality checks before integration.
---

# Phi Review

## Overview

Use this for both requesting and absorbing review feedback.

- Primary sources: `superpowers/requesting-code-review` and `superpowers/receiving-code-review`
- Secondary sources: ECC reviewer agents and domain-specific review skills
- Default rule: review enters through phi so feedback is interpreted consistently

## Routing

- `requesting-code-review` owns structured review requests
- `receiving-code-review` owns feedback evaluation before implementation changes
- ECC contributes specialized reviewers for frontend, backend, security, database, or language-specific quality checks

## Review Modes

- pre-merge review
- post-task review
- feedback triage
- domain-specialist review

## Do Not

- Do not accept feedback blindly
- Do not bypass phi for common review flows if orchestration is already established

