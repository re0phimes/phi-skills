---
name: phi-verify
description: Use when work is nearly done and phi should run completion checks before claiming success, including stack-specific validation where relevant.
---

# Phi Verify

## Overview

Use this before claiming a task is complete.

- Primary source: `superpowers/verification-before-completion`
- Secondary sources: ECC verification, testing, security, or deployment skills relevant to the stack
- Default rule: completion claims go through phi verification

## Routing

- `superpowers/verification-before-completion` owns the final proof step
- ECC contributes domain-specific checks such as E2E, security, framework verification, or build validation
- `phi-local` may add product release gates

## Verification Checklist

- relevant tests run
- build or static checks run where applicable
- behavior confirmed against the original request
- known limitations called out explicitly

## Do Not

- Do not claim success from reasoning alone
- Do not skip domain-specific verification if ECC guidance exists

