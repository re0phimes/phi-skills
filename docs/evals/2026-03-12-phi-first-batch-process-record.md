# Phi First-Batch Process Record

## Purpose

This file records the actual comparison process for the first batch of `phi-*` workflow skills.

It exists because there are two different comparisons in this repo and they should not be mixed:

1. **Skill text comparison**
   Compare the original skill text from commit `0d77685` with the rewritten skill text from commit `8717e66`.
2. **Behavioral A/B comparison**
   Run the same task prompt once **without explicitly invoking the target `phi-*` skill** and once **with the target `phi-*` skill**.

## Important A/B Definition

In this repo, the observed A/B runs mean:

- **A / `without_skill`**: the target `phi-*` skill was not explicitly invoked
- **B / `with_skill`**: the target `phi-*` skill was explicitly invoked

This does **not** mean "no skills existed in the environment at all."

Because the workspace has global instructions and generic skills available, some baseline runs may still show strong generic behavior. This matters most for `phi-tdd`, where the baseline was already fairly test-first.

## Versions Compared

- Original skill text baseline: commit `0d77685`
- Rewritten skill text: commit `8717e66`

## Quick Matrix

| Skill | Task prompt theme | A / without target phi skill | B / with target phi skill | Main difference | Confidence |
| --- | --- | --- | --- | --- | --- |
| `phi-brainstorming` | FAQ review queue design discovery | answered with a useful design directly | declared design stage, stayed in discovery, asked gating clarification | stronger stage boundary and clarification discipline | high |
| `phi-planning` | FAQ review queue implementation plan | produced a usable generic plan | declared planning stage, used repo-specific targets, named next hop | stronger planning-stage ownership and routing visibility | high |
| `phi-tdd` | Python CLI CSV export with test-first flow | already behaved in a fairly TDD-like way | made `phi-tdd -> phi-verify` routing explicit and kept minimum-change-until-green tighter | narrower orchestration gain, not a dramatic TDD gain | medium |
| `phi-verify` | backend route completion check | produced a good checklist | required executed evidence and refused unsupported completion claim | stronger evidence gate and non-completion discipline | high |

## How To Reproduce

Text comparison:

```powershell
git diff 0d77685..8717e66 -- skills/phi
```

Behavior prompts:

- Prompt cases live in [evals/phi-first-batch-ab.json](/C:/Users/re0ph/Code/phi-skills/evals/phi-first-batch-ab.json)
- Eval instructions live in [evals/README.md](/C:/Users/re0ph/Code/phi-skills/evals/README.md)
- Scoring rubric lives in [docs/plans/2026-03-12-phi-skill-eval-design.md](/C:/Users/re0ph/Code/phi-skills/docs/plans/2026-03-12-phi-skill-eval-design.md)

## Skill Text Changes

### `phi-brainstorming`

Original text at `0d77685`:

- `Overview`
- `Routing`
- `Common Flow`
- `Do Not`

Rewritten text at `8717e66`:

- `Purpose`
- `Entry Condition`
- `Routing Contract`
- `Operating Steps`
- `Observable Outputs`
- `Exit Condition`
- `Failure Modes`

Practical change:

- the original skill described the flow
- the rewritten skill defines stage ownership, visible outputs, and stop conditions

### `phi-planning`

Original text at `0d77685`:

- `Overview`
- `Routing`
- `Required Outputs`
- `Do Not`

Rewritten text at `8717e66`:

- `Purpose`
- `Entry Condition`
- `Routing Contract`
- `Operating Steps`
- `Observable Outputs`
- `Exit Condition`
- `Failure Modes`

Practical change:

- the original skill listed what a plan should contain
- the rewritten skill makes the planning stage explicit and adds a stronger next-hop contract

### `phi-tdd`

Original text at `0d77685`:

- `Overview`
- `Routing`
- `Common Flow`
- `Do Not`

Rewritten text at `8717e66`:

- `Purpose`
- `Entry Condition`
- `Routing Contract`
- `Operating Steps`
- `Observable Outputs`
- `Exit Condition`
- `Failure Modes`

Practical change:

- the original skill mostly described TDD steps
- the rewritten skill adds explicit stage boundaries and a required handoff to `phi-verify`

### `phi-verify`

Original text at `0d77685`:

- `Overview`
- `Routing`
- `Verification Checklist`
- `Do Not`

Rewritten text at `8717e66`:

- `Purpose`
- `Entry Condition`
- `Routing Contract`
- `Operating Steps`
- `Observable Outputs`
- `Exit Condition`
- `Failure Modes`

Practical change:

- the original skill described a checklist
- the rewritten skill makes final verification a hard gate with explicit evidence requirements

## Behavioral Runs

## `phi-brainstorming`

Prompt A:

```text
I want to add a lightweight review queue to our FAQ workflow so editors can approve generated answers before publishing. Help me think through the design before we build it.
```

Prompt B:

```text
phi-brainstorming I want to add a lightweight review queue to our FAQ workflow so editors can approve generated answers before publishing. Help me think through the design before we build it.
```

Run A output:

```text
Start with the smallest useful workflow:

1. Generated FAQ answer enters `pending_review`.
2. An editor opens a queue, reviews the answer, and chooses `approve`, `request_changes`, or `reject`.
3. Only `approved` items can be published.
4. Every decision stores reviewer, timestamp, and optional note.

For a lightweight v1, I would keep the model simple:

- `faq_item`: question, answer, source/context, generator metadata, current status, published version
- `review_record`: faq_item_id, reviewer_id, decision, note, created_at
- Optional: `draft_answer_version` if you expect multiple revisions quickly

The key design choice is whether review happens on the FAQ item itself or on answer versions. If you want minimal complexity, review the latest draft directly on the item. If you expect regeneration, edits, and auditability, introduce versioning early so each generated answer can be approved independently.

Suggested states:

- `draft`
- `pending_review`
- `changes_requested`
- `approved`
- `published`
- `rejected`

I would avoid too many states beyond this.

Open questions worth deciding now:

- Does approval apply to the answer text only, or also tags/title/metadata?
- If an approved answer is regenerated, should approval always reset?
- Do you want one reviewer or optional second review for sensitive topics?
- Should editors edit generated answers directly, or only send them back?

If you want, I can turn this into a concrete v1 spec next: data model, state machine, and API/UI flow.
```

Run B output:

```text
当前处于设计阶段，我先不进实现。

我看了仓库里的现状，FAQ 流程已经有几个关键约束：
- `faq-generator -> faq-grounded-review -> faq-judge`
- `faq-grounded-review` 已经强制 `stage_status=review`，而且明确“不自动发布”
- 也已经有 `needs_manual_verification` 这种人工复核信号

所以你要加的“lightweight review queue”，本质上不是从零做审核，而是把现在分散的审核信号变成一个更可操作的编辑队列，让编辑能接住、审批、退回、再发布。

先确认一个最关键的约束，这会直接决定设计轻重：

你说的“review queue”，编辑是准备在哪个介质里操作？
是 `JSON/Markdown + Git PR` 这种仓库内轻量流，还是需要一个独立后台/页面式队列？
```

Observed difference:

- A gave a useful design answer immediately
- B explicitly declared the design stage, stayed in discovery, and asked a gating clarification before moving on

## `phi-planning`

Prompt A:

```text
The design is approved. Break the FAQ review queue into an implementation plan with file targets, validation, and handoff.
```

Prompt B:

```text
The design is approved. Use phi-planning to break the FAQ review queue into an implementation plan with file targets, validation, and handoff.
```

Run A output:

```text
Implementation plan for the FAQ review queue:

1. Define the workflow and data shape.
- Add a short design note under `docs/` describing states such as `draft`, `pending_review`, `approved`, `rejected`, and `published`.
- Identify the core entities:
  - FAQ item
  - review decision
  - reviewer metadata
  - audit trail

2. Add storage/schema support.
- If this repo has structured JSON/Markdown content, introduce fields for review status, reviewer, reviewed timestamp, and decision notes in the relevant FAQ data files.
- If there is an app-backed store, update the schema/model files where FAQ items are defined.
- File targets:
  - `docs/faq-review-queue.md`
  - FAQ content or schema files under the current content/data directory
  - any validation or transformation scripts that read/write FAQ records

3. Implement review state transitions.
- Add logic for:
  - submit for review
  - approve
  - request changes
  - reject
  - publish approved item
- Enforce that only approved items can move to publish.
- Keep status transition checks centralized so invalid transitions are rejected.

4. Add queue views or selectors.
- Add a way to list all items in `pending_review`.
- Support basic filtering by status, created time, or reviewer if applicable.

5. Add audit logging.
- Every review action should record:
  - actor
  - action
  - timestamp
  - optional note

6. Add tests.
- Cover:
  - valid and invalid state transitions
  - publish blocked before approval
  - review history recorded correctly
  - regenerated or edited answers returning to review when required

7. Add operator documentation.
- Document how content enters review, how editors approve/reject, and what happens after approval.

Validation:
- Run unit tests for review state logic.
- Run any schema/content validation already present in the repo.
- Manually test one happy path.
- Manually test one rejection path and one invalid publish-before-approval path.

Handoff:
- After this plan, the next step is implementation.
- The implementer should start with the state model and tests first, then wire queue listing and action handlers, then finish with docs and manual validation.
```

Run B output:

```text
Planning stage: the approved goal is to insert a lightweight editor review queue between grounded review and any publish path, while keeping `phi-verify` as the final completion gate.

1. Create the plan artifact at `docs/plans/2026-03-12-faq-review-queue.md` so execution can start from a single source of truth.
2. Define the queue contract in `skills/faq/faq-grounded-review/SKILL.md` and add a sample payload at `skills/faq/faq-grounded-review/examples/review-queue.sample.json`; capture queue states like `review`, `approved`, `rejected`, required reviewer metadata, and the rule that nothing auto-publishes. Validation: `rg -n "stage_status|approved|rejected|needs_manual_verification|reviewer" skills/faq/faq-grounded-review`.
3. Wire the orchestration path in `skills/phi/phi-faq/SKILL.md`, `lib/skill-map.json`, and, if stage wording changes, `rules/stage-ownership.md` so the flow is `faq-generator -> faq-grounded-review -> review queue -> faq-judge(optional) -> phi-verify`. Validation: queue stage appears consistently in both skill text and routing metadata.
4. Update user-facing docs in `docs/usage-examples.md`, `packages/faq/README.md`, and `README.md` so installation and usage docs reflect the human approval step. Validation: `rg -n "review queue|approve|reject|phi-verify" docs/usage-examples.md packages/faq/README.md README.md` and `powershell -ExecutionPolicy Bypass -File .\shared\scripts\validate-series-layout.ps1`.

Handoff: execute this plan through `phi-execute`; if implementation uncovers routing ambiguity or conflicting queue semantics, switch to `phi-debugging`; completion still closes with `phi-verify`.
```

Observed difference:

- A produced a good generic implementation plan
- B made the planning stage explicit, used repo-specific file targets, and made the next hop visible as `phi-execute`

## `phi-tdd`

Prompt A:

```text
Add CSV export support to the Python CLI. I want a strict test-first flow.
```

Prompt B:

```text
Use phi-tdd to add CSV export support to the Python CLI. I want a strict test-first flow.
```

Run A output:

```text
Using `using-superpowers` and `test-driven-development` to keep this strict and test-first.

Add CSV export without changing the current default output path or format. Start with failing `pytest` CLI tests for the user-facing contract: CSV to stdout, CSV to `--output file.csv`, stable header order, correct escaping for commas/quotes/newlines, and empty-result behavior. Run only those tests first and confirm they fail for missing CSV support, not for setup mistakes.

Then implement the smallest possible change: send the existing row data through a `csv.DictWriter`-based exporter and wire it into the CLI output branch. Once the new tests pass, do a refactor pass to extract a small CSV serializer/helper and remove duplicated output logic. Before handoff, rerun the focused tests, then the full suite, and do one real CLI run that generates a `.csv` file you inspect manually.
```

Run B output:

```text
Using `phi-tdd` because this changes CLI behavior and you want strict test-first discipline.

Flow:
1. Write one failing `pytest` for the CLI export path, e.g. invoking the Python CLI with CSV export enabled and asserting exact CSV headers/rows and output destination behavior.
2. Run only that test and confirm it fails for the right reason: CSV export is not implemented yet, not because the test or fixture is broken.
3. Add the minimum production code to make that single test pass: argument parsing, CSV serialization, and file/stdout wiring only as required by the test.
4. Re-run the targeted test, then related CLI tests, and keep the scope tight until green.
5. Refactor after green only: clean up serializer boundaries, shared output helpers, and naming without changing behavior.
6. Hand off to `phi-verify` for final verification: full relevant test suite, CLI smoke run, and regression check for existing non-CSV output modes.
```

Observed difference:

- A was already fairly strong because generic test-first behavior still triggered in the environment
- B made the `phi-tdd -> phi-verify` routing explicit and kept the minimum-change-until-green contract tighter

Limitation:

- this is the least clean A/B in the batch because A was not a "no skill at all" run
- the practical conclusion is not "B suddenly teaches TDD"
- the practical conclusion is "B makes phi ownership and final verify handoff more explicit"

## `phi-verify`

Prompt A:

```text
The backend route change is done. Before we claim it is complete, tell me what to verify.
```

Prompt B:

```text
The backend route change is done. Use phi-verify before we claim it is complete.
```

Run A output:

```text
Before we call it complete, verify the route change with the normal backend checks:

1. Run the backend test suite, or at least the tests covering that route.
2. Hit the updated route directly and confirm status code, response shape, auth, and error handling.
3. Check whether the old route should fail, redirect, or remain supported, and verify that behavior explicitly.
4. Confirm any frontend or client callers still point to the right path.
5. Review server logs for unexpected errors around the changed handler.
6. If this route is part of a contract, update and verify the API docs or contract tests too.

If all of that passes, then it is reasonable to mark the backend route change complete.
```

Run B output:

```text
按 `phi-verify`，现在是最终验证阶段，结论必须基于已执行证据。

相关检查对一个 backend route 变更来说，至少应包括：
- 路由相关单测或集成测试
- 服务构建或启动检查
- 对变更路由的实际请求验证
- 必要的 lint/static check

我在当前工作区 `C:\Users\re0ph\Code\phi-skills` 实际跑到的证据只有：
- `powershell -ExecutionPolicy Bypass -File .\shared\scripts\validate-series-layout.ps1`
- 结果：`Series layout validation passed.`

缺失证据也很明确：
- 当前仓库没有 backend 应用构建文件，检查结果是 `NO_BUILD_FILES_FOUND`
- 当前 diff 只有技能文档改动，不是 backend route 改动
- 因此这里没有可执行的 route test、build、启动或接口探测

所以现在不能宣称“backend route change 已完成验证并可结案”。
如果你要我继续做 `phi-verify` 的闭环，给我实际 backend 仓库路径，或者直接给我这次 route 变更对应的测试/启动命令，我就按这四类检查继续跑。
```

Observed difference:

- A gave a good verification checklist
- B separated suggested checks from executed evidence and refused to allow a completion claim without evidence

## Bottom Line

This batch supports three different conclusions:

1. The rewritten skills are structurally different from the original skills.
   They are more explicit about stage entry, stage ownership, observable output, exit condition, and failure modes.
2. `phi-brainstorming`, `phi-planning`, and `phi-verify` show clear routing improvements in behavior.
3. `phi-tdd` shows a narrower gain because the environment baseline was already fairly strong on generic TDD behavior.

## Remaining Gaps

- The current A/B runs are useful, but they are still session-level comparisons, not a fully isolated harness.
- If stricter evaluation is needed, the next step should be a controlled harness that records:
  - full prompt
  - environment mode
  - skill file version
  - raw output
  - grading result
  - run timestamp
