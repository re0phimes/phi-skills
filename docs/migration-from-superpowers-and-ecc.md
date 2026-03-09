# Migration from `superpowers` and ECC

## What Changes

Instead of deciding between upstream sources on every task, use `phi-*` as the main entrypoint layer.

## What Stays Upstream-Owned

- workflow discipline remains sourced from `superpowers`
- framework and language specialization remains sourced from ECC
- personal FAQ and product workflows remain private under `phi-local`

## Recommended Migration Order

1. Start using `phi-brainstorming`, `phi-planning`, `phi-debugging`, and `phi-verify`
2. Add domain entrypoints such as `phi-frontend` and `phi-faq`
3. Reduce direct upstream invocation for common tasks
4. Internalize only stable private workflows into `phi`

## Superseded Daily Entrypoints

These remain valid upstream concepts but are no longer the preferred daily entrypoints:

- `brainstorming`
- `writing-plans`
- `systematic-debugging`
- `test-driven-development`
- `verification-before-completion`
- `frontend-patterns`
- `backend-patterns`

