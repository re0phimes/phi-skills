# Phi for Codex

## Goal

Expose the shared `phi` skills directory to Codex while keeping host-specific setup minimal.

## Recommended Setup

1. Make this repository available locally.
2. Point Codex skill discovery at the shared `skills/` directory.
3. Keep `superpowers`, ECC, and your private skills available as upstream sources.
4. Prefer `phi-*` entrypoints for common flows.

## Entrypoint Rule

Use `phi-*` first. Treat direct upstream invocation as an advanced escape hatch, not the default.

