---
name: phi-debugging
description: Use when behavior is broken, tests fail, builds regress, or runtime issues need a structured phi debugging flow with stack-aware guidance.
---

# Phi Debugging

## Overview

Use this as the default debugging entrypoint.

- Primary source: `superpowers/systematic-debugging`
- Secondary sources: ECC stack-specific skills such as frontend, backend, database, language, or deployment patterns
- Default rule: debug through phi so process discipline and domain expertise stay aligned

## Routing

- `superpowers/systematic-debugging` owns problem isolation, hypothesis testing, and root-cause discipline
- ECC contributes stack-specific failure patterns and diagnostics
- `phi-local` may supply product-specific observability or workflow context

## Common Flow

1. Reproduce or restate the failure
2. Gather evidence before changing code
3. Narrow the cause
4. Fix through `phi-tdd` when behavior changes
5. Finish with `phi-verify`

## Do Not

- Do not mix ad-hoc fixes with debugging
- Do not let ECC override the debugging process itself

