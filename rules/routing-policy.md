# Phi Routing Policy

## Purpose

`phi` provides a single user-facing namespace while routing tasks to the correct upstream source.

## Primary Routing

1. Workflow phase control routes to `superpowers`
2. Domain-specific implementation guidance routes to `everything-claude-code`
3. Private or product-specific workflow logic routes to `phi-local`

## Conflict Resolution Order

1. Resolve by stage first
2. Resolve by domain second
3. Resolve by host adapter third
4. Resolve by local override fourth

## Usage Rule

For common flows, prefer `phi-*` entrypoints instead of direct upstream invocation.

## Examples

- Feature ideation -> `phi-brainstorming`
- Implementation planning -> `phi-planning`
- Build or runtime issue -> `phi-debugging`
- Frontend change -> `phi-frontend`
- FAQ production workflow -> `phi-faq`

