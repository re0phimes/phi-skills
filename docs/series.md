# Series Overview

This repository now separates installable skills from shared support assets.

## Installable Series

### `phi`

The orchestration entrypoint series.

Contents:

- workflow entrypoints such as `phi-brainstorming`, `phi-planning`, `phi-debugging`, `phi-tdd`, `phi-verify`, `phi-execute`, `phi-parallel`, and `phi-review`
- domain entrypoints such as `phi-frontend`, `phi-backend`, `phi-python`, `phi-java`, `phi-db`, and `phi-faq`

Location:

- skills: `skills/phi/`
- host packaging: `packages/phi/`

### `faq`

The concrete FAQ production workflow series.

Contents:

- `faq-generator`
- `faq-grounded-review`
- `faq-judge`

Location:

- skills: `skills/faq/`
- host packaging: `packages/faq/`

## Shared Support Layer

`shared/` holds repository support assets that are not installable skill series.

Use it for:

- hooks
- templates
- scripts
- reusable host support components

Do not create a new series for infrastructure-only assets.

## Source Metadata

`lib/source-manifest.json` is the repository-level manifest for tooling that needs to consume this repo as a source.

It defines:

- repository identity
- series names and skill roots
- package locations per series
- host-specific manifest or install document entrypoints
- shared support asset locations

This manifest is intentionally repository-centric rather than `cc switch`-specific.

## Expansion Rule

Add a new series only when all of the following are true:

1. It exposes user-facing skills.
2. It should be installable independently.
3. It has a stable scope that is not just a temporary project bucket.

If the asset is support infrastructure, place it under `shared/` instead.
