# Phi Claude Plugin

This adapter exposes the shared `phi` skill set to Claude-compatible environments.

## Intent

- surface `phi-*` as the preferred user entrypoints
- keep orchestration logic in the shared repository
- avoid duplicating business logic inside the adapter layer

## Notes

- `skills/` remains the shared source of truth
- `commands/` and `hooks/` are placeholders for future expansion

