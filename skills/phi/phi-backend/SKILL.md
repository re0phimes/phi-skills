---
name: phi-backend
description: Use when the task is primarily server-side architecture, API design, service logic, routing, or backend integration and phi should orchestrate the flow.
---

# Phi Backend

## Workflow Path

Default path:

1. `phi-brainstorming`
2. `phi-planning`
3. `phi-execute` or `phi-tdd`
4. `phi-verify`

## Primary Sources

- Workflow owner: `superpowers`
- Domain owner during implementation guidance: ECC `backend-patterns`

## Secondary Sources

- local `api-design`
- ECC `deployment-patterns` when relevant
- `phi-local` service conventions

## Trigger Areas

- API routes and handlers
- server-side business logic
- data access patterns
- auth or validation flows
- integration with external services

## Handoff

Use `phi-verify` before completion and include backend checks such as tests, build, and route validation.

