# Phi

`phi` is a cross-host orchestration layer for agent skills and plugins.

Instead of choosing between `superpowers`, `everything-claude-code` (ECC), and local private skills on every task, users interact through a unified `phi-*` entrypoint model.

## Goals

- Provide one stable skill namespace across `Codex`, `Claude`, `Cursor`, and `OpenCode`
- Route workflow-stage control to `superpowers`
- Route domain specialization to `everything-claude-code`
- Preserve private workflows under the same `phi-*` mental model
- Reduce direct, isolated upstream invocation for common flows

## Operating Model

- `phi-*` is the preferred entrypoint layer
- `superpowers` is the workflow-discipline source
- `ECC` is the domain-expansion source
- `phi-local` is the private workflow source

Only one source owns a stage at a time.

## First Batch Entrypoints

### Workflow
- `phi-brainstorming`
- `phi-planning`
- `phi-debugging`
- `phi-tdd`
- `phi-verify`
- `phi-execute`
- `phi-parallel`
- `phi-review`

### Domain
- `phi-frontend`
- `phi-backend`
- `phi-python`
- `phi-java`
- `phi-db`
- `phi-faq`

## Repository Layout

- `skills/` user-facing `phi-*` skills
- `rules/` orchestration and ownership policy
- `lib/` routing metadata and host maps
- `.claude-plugin/` Claude packaging
- `.codex/` Codex packaging
- `.cursor-plugin/` Cursor packaging
- `.opencode/` OpenCode packaging

## Quickstart

1. Install or point your host to this repository's shared `skills/` directory.
2. Keep `superpowers` and ECC available as upstream sources.
3. Prefer `phi-*` for daily work instead of calling upstream skills directly.
4. Extend `phi` only when a workflow is stable and worth preserving locally.

## Current Status

This repository is a first implementation of the approved orchestration design saved in:

- `docs/plans/2026-03-09-phi-plugin-convergence-design.md`
- `docs/plans/2026-03-09-phi-plugin-convergence.md`

