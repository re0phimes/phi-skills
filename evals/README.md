# Phi Skill A/B Eval Guide

Use these evals to compare a `phi-*` skill before and after a rewrite.

The comparison has three layers:

1. Text diff: compare the old and new `SKILL.md`.
2. Behavioral A/B: run the same task once without the target skill and once with it.
3. Scoring: grade stage control, routing visibility, process completeness, and outcome quality.

## Quick Comparison Commands

Compare the working copy against the current commit:

```powershell
git diff -- skills/phi/phi-brainstorming/SKILL.md
git diff -- skills/phi/phi-planning/SKILL.md
git diff -- skills/phi/phi-tdd/SKILL.md
git diff -- skills/phi/phi-verify/SKILL.md
```

Compare two commits directly:

```powershell
git diff <old-commit>..<new-commit> -- skills/phi
```

## How To Run A/B

For each case in `phi-first-batch-ab.json`:

1. Run the `without_skill_prompt` in a normal session.
2. Run the `with_skill_prompt` in a session where the target skill is available and explicitly invoked.
3. Save both outputs.
4. Grade only observable behavior.

Do not count "longer answer" as a win unless routing or control points clearly improved.

## What To Look For

- Stage identification: did the model recognize the right workflow stage?
- Routing visibility: did it name the next hop or owner?
- Process discipline: did it preserve required control points?
- Exit behavior: did it stop at the right boundary?

## Current Proven Examples

These were already observed in this repo's first batch:

- `phi-brainstorming`: stronger design-stage gating than baseline
- `phi-verify`: stronger evidence discipline than baseline

Those runs are documented in `docs/plans/2026-03-12-phi-skill-first-batch-evals.md`.
