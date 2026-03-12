# Usage Examples

## Frontend Feature Flow

Prompt:

`phi-frontend tighten the homepage header, preserve dark mode, and keep mobile behavior consistent`

Expected orchestration:

1. `phi-brainstorming` makes the task's design stage explicit and clarifies UI constraints before implementation
2. ECC `frontend-patterns` supports design and implementation choices once the domain is clear
3. `phi-planning` converts the approved UI direction into an execution plan with validation steps
4. `phi-execute` or `phi-tdd` handles implementation under the approved plan
5. `phi-verify` checks the resulting UI against the original behavior and completion evidence

## Debugging Flow

Prompt:

`phi-debugging investigate why the production build fails after the new API route change`

Expected orchestration:

1. `phi-debugging` makes the task's investigation stage explicit and gathers evidence before code changes
2. `superpowers` debugging discipline leads the root-cause process
3. ECC domain guidance is selected from the relevant stack only after the failure shape is understood
4. `phi-tdd` is used if the fix changes behavior and needs test-first coverage
5. `phi-verify` confirms the fix before handoff

## FAQ Flow

Prompt:

`phi-faq generate QA pairs from this markdown file and review the best candidates`

Expected orchestration:

1. `phi-faq` identifies the FAQ workflow stage and routes into the repository FAQ series
2. `faq-generator` performs structured QA generation
3. `faq-grounded-review` evaluates groundedness and answer quality
4. `faq-judge` is used when quality scoring or filtering is needed
5. `phi-verify` confirms the output is ready for use and any limitations are explicit

