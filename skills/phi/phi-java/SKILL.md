---
name: phi-java
description: Use when the task is primarily Java or Spring Boot work and phi should orchestrate workflow control with Java-specific patterns and checks.
---

# Phi Java

## Workflow Path

Default path:

1. `phi-brainstorming`
2. `phi-planning`
3. `phi-tdd` or `phi-execute`
4. `phi-verify`

## Primary Sources

- Workflow owner: `superpowers`
- Domain owner during implementation guidance: ECC `java-coding-standards` and `springboot-patterns`

## Secondary Sources

- ECC `springboot-tdd`
- ECC `springboot-security`
- `phi-local` service conventions

## Trigger Areas

- Spring Boot services and controllers
- Java coding standards and refactors
- test strategy for Java backend work
- security-sensitive API changes

## Handoff

Use `phi-verify` with Java build, test, and security checks before completion.

