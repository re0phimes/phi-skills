---
name: phi-parallel
description: Use when a phi-managed plan contains multiple independent tasks that can be split safely while preserving centralized routing and review rules.
---

# Phi Parallel

## Overview

Use this when work can be split into independent streams.

- Primary source: `superpowers/dispatching-parallel-agents`
- Secondary sources: ECC agents and domain skills assigned per parallel track
- Default rule: parallelization is coordinated by phi, not by ad-hoc direct upstream invocation

## Routing

- `superpowers/dispatching-parallel-agents` owns dependency-aware task splitting
- ECC contributes specialized reviewers or implementers for each independent domain track
- `phi-local` may define project constraints for safe task partitioning

## Safe Uses

- documentation and packaging in parallel
- independent frontend and backend tasks
- domain-specific validation tracks after implementation stabilizes

## Do Not

- Do not parallelize tasks with shared write hot spots unless coordination is explicit
- Do not dispatch raw upstream workstreams without phi ownership

