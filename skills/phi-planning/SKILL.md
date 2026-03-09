---
name: phi-planning
description: Use when a design has been approved and phi should turn it into a concrete implementation plan with upstream workflow and domain guidance.
---

# Phi Planning

## Overview

Use this after `phi-brainstorming` or any approved design.

- Primary source: `superpowers/writing-plans`
- Secondary sources: ECC domain skills relevant to the stack
- Default rule: planning goes through phi so workflow and domain checks stay merged

## Routing

- `superpowers/writing-plans` owns task decomposition, sequencing, and verification planning
- ECC contributes domain-specific implementation and testing considerations
- `phi-local` may inject product-specific requirements and release conventions

## Required Outputs

- a bite-sized implementation plan
- explicit file targets where possible
- validation steps
- clear handoff to `phi-execute`, `phi-debugging`, or `phi-verify`

## Do Not

- Do not create a standalone upstream plan for common phi-managed work
- Do not omit domain-specific validation when ECC coverage exists

