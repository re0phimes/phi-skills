---
name: phi-brainstorming
description: Use when starting new feature, UX, workflow, or behavior design work and you want phi to coordinate structured discovery before implementation.
---

# Phi Brainstorming

## Overview

Use this as the default design-entry skill in the phi system.

- Primary source: `superpowers/brainstorming`
- Secondary sources: ECC domain skills chosen by task type
- Default rule: use `phi-brainstorming`, not direct upstream skills, for common flows

## Routing

- `superpowers/brainstorming` owns clarification, alternatives, design presentation, and approval
- ECC contributes domain guidance such as frontend, backend, database, or testing patterns
- `phi-local` may add product-specific constraints after the core design flow is established

## Common Flow

1. Explore current project context
2. Clarify one question at a time
3. Present 2-3 approaches with recommendation
4. Validate the design section by section
5. Handoff to `phi-planning`

## Do Not

- Do not start common design work by invoking `superpowers/brainstorming` directly
- Do not jump to implementation before approval
- Do not let ECC own the workflow stage

