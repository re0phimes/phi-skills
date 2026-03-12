---
name: phi-faq
description: Use when the task is FAQ generation, grounded review, QA judging, or knowledge extraction and phi should orchestrate the repository FAQ workflow.
---

# Phi FAQ

## Workflow Path

Default path:

1. `phi-brainstorming` when the workflow or output standard is still unclear
2. repository FAQ generation and review skills
3. `phi-verify`

## Primary Sources

- Domain owner: `faq-series:faq-generator`
- Review owner: `faq-series:faq-grounded-review`

## Secondary Sources

- `faq-series:faq-judge`
- repository-local document conventions
- `phi-verify` for final readiness checks

## Trigger Areas

- generating QA pairs from documents
- reviewing FAQ answers against sources
- judging FAQ quality
- building a reusable knowledge workflow

## Handoff

Always finish through `phi-verify` so the resulting FAQ output is checked for readiness and any explicit limitations are surfaced.

