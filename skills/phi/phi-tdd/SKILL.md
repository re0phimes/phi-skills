---
name: phi-tdd
description: Use when implementing a feature, bugfix, or behavior change and phi should enforce test-first development with domain-aware testing support.
---

# Phi TDD

## Overview

Use this whenever production behavior will change.

- Primary source: `superpowers/test-driven-development`
- Secondary sources: ECC testing skills such as `python-testing`, `golang-testing`, `springboot-tdd`, `django-tdd`, or `e2e-testing`
- Default rule: write tests through phi so domain-specific testing advice augments strict TDD

## Routing

- `superpowers/test-driven-development` owns red-green-refactor
- ECC contributes framework-specific test strategy and tooling guidance
- `phi-local` may add business acceptance criteria or regression cases

## Common Flow

1. Write one failing test
2. Confirm the failure is correct
3. Write the minimum code to pass
4. Re-run tests
5. Refactor without changing behavior

## Do Not

- Do not write production code first
- Do not call upstream testing skills directly for common phi-managed work unless phi delegates explicitly

