---
name: phi-python
description: Use when the task is primarily Python implementation, testing, automation, or service logic and phi should combine workflow discipline with Python-specific guidance.
---

# Phi Python

## Workflow Path

Default path:

1. `phi-brainstorming`
2. `phi-planning`
3. `phi-tdd` or `phi-execute`
4. `phi-verify`

## Primary Sources

- Workflow owner: `superpowers`
- Domain owner during implementation guidance: ECC `python-patterns`

## Secondary Sources

- ECC `python-testing`
- `phi-local` Python project conventions

## Trigger Areas

- Python application code
- scripts and CLI tools
- pytest-based testing
- automation and data processing

## Handoff

End with `phi-verify` so Python tests and any build or lint checks are confirmed before claiming success.

