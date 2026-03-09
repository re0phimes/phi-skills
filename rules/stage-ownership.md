# Phi Stage Ownership

## Stage Owners

- Clarification and design -> `superpowers`
- Planning and task decomposition -> `superpowers`
- Verification before completion -> `superpowers`
- Domain implementation guidance -> `everything-claude-code`
- Project-specific or personal workflow behavior -> `phi-local`

## Ownership Rule

Only one source may control a stage at a time.

Other sources may contribute supporting context, but they do not override the active stage owner.

## Examples

- `phi-frontend` uses `superpowers` for design/planning/verification and ECC for frontend implementation patterns
- `phi-faq` uses local FAQ skills as the primary domain layer and `phi-verify` as the completion gate

