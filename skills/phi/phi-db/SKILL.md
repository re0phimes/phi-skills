---
name: phi-db
description: Use when the task is primarily schema design, query optimization, migrations, persistence modeling, or database debugging and phi should orchestrate the work.
---

# Phi DB

## Workflow Path

Default path:

1. `phi-brainstorming`
2. `phi-planning`
3. `phi-execute` or `phi-debugging`
4. `phi-verify`

## Primary Sources

- Workflow owner: `superpowers`
- Domain owner during implementation guidance: ECC database skills

## Secondary Sources

- ECC `postgres-patterns`
- ECC `clickhouse-io`
- ECC `jpa-patterns`
- `phi-local` data conventions

## Trigger Areas

- schema and migration design
- indexing and query tuning
- persistence model issues
- data correctness or performance problems

## Handoff

Route completion through `phi-verify` and include database-specific validation such as migrations, tests, or query checks.

