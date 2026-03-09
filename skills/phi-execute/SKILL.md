---
name: phi-execute
description: Use when an approved phi plan should be implemented in the current session with coordinated execution, review checkpoints, and domain-aware support.
---

# Phi Execute

## Overview

Use this to execute approved implementation plans.

- Primary source: `superpowers/subagent-driven-development`
- Secondary sources: ECC agents, commands, and domain skills as needed
- Default rule: execute through phi so workflow control stays centralized

## Routing

- `superpowers/subagent-driven-development` owns task-by-task execution order and review checkpoints
- ECC contributes domain specialists, reusable commands, and stack-specific implementation references
- `phi-local` may add project-specific review gates or delivery conventions

## Common Flow

1. Start from an approved plan
2. Execute one task at a time
3. Review for spec compliance
4. Review for code quality
5. Finish with `phi-verify`

## Do Not

- Do not bypass the phi execution entrypoint for common orchestrated work
- Do not let multiple upstreams act as co-equal controllers for the same stage

