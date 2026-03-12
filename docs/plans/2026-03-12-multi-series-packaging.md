# Multi-Series Packaging Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restructure this repository from one shared `phi` package into two installable series, `phi` and `faq`, while keeping hooks and future support assets in a shared non-series layer.

**Architecture:** Move repository-owned skills under series-specific subtrees, then create per-series host packages that point to only one skill subtree each. Keep routing metadata and support infrastructure repository-local, and update manifests and docs to describe the new installation model.

**Tech Stack:** Markdown docs, JSON plugin manifests, OpenCode plugin bootstrap JS, repository file layout, host packaging metadata

---

### Task 1: Create the new series directory skeleton

**Files:**
- Create: `skills/phi/`
- Create: `skills/faq/`
- Create: `shared/hooks/`
- Create: `shared/components/`
- Create: `shared/templates/`
- Create: `shared/scripts/`

**Step 1: Create the failing check**

Run: `Get-ChildItem skills/phi,skills/faq,shared -ErrorAction SilentlyContinue`
Expected: one or more paths missing

**Step 2: Create the minimal structure**

- Create the series directories under `skills/`
- Create the support directories under `shared/`

**Step 3: Run the check again**

Run: `Get-ChildItem skills/phi,skills/faq,shared`
Expected: all directories exist

**Step 4: Commit**

```bash
git add skills shared
git commit -m "refactor: add multi-series repository skeleton"
```

### Task 2: Move the existing `phi-*` skills into the `phi` series

**Files:**
- Modify: `skills/phi-backend/`
- Modify: `skills/phi-brainstorming/`
- Modify: `skills/phi-db/`
- Modify: `skills/phi-debugging/`
- Modify: `skills/phi-execute/`
- Modify: `skills/phi-faq/`
- Modify: `skills/phi-frontend/`
- Modify: `skills/phi-java/`
- Modify: `skills/phi-parallel/`
- Modify: `skills/phi-planning/`
- Modify: `skills/phi-python/`
- Modify: `skills/phi-review/`
- Modify: `skills/phi-tdd/`
- Modify: `skills/phi-verify/`
- Create: `skills/phi/<same directories above>/`

**Step 1: Write the safety check**

Run: `Get-ChildItem skills | Select-Object Name`
Expected: current `phi-*` directories still exist at the top level

**Step 2: Move the directories**

- Move every current `skills/phi-*` directory into `skills/phi/`
- Do not rename any skill directory

**Step 3: Verify the result**

Run: `Get-ChildItem skills/phi | Select-Object Name`
Expected: the same `phi-*` directories appear under `skills/phi`

**Step 4: Commit**

```bash
git add skills
git commit -m "refactor: move phi skills into series subtree"
```

### Task 3: Import the FAQ skills into the `faq` series

**Files:**
- Create: `skills/faq/faq-generator/SKILL.md`
- Create: `skills/faq/faq-grounded-review/SKILL.md`
- Create: `skills/faq/faq-grounded-review/examples/` if needed by source skill
- Create: `skills/faq/faq-judge/SKILL.md`

**Source material:**
- `C:/Users/re0ph/.codex/skills/faq-generator/`
- `C:/Users/re0ph/.codex/skills/faq-grounded-review/`
- `C:/Users/re0ph/.codex/skills/faq-judge/`

**Step 1: Verify source availability**

Run: `Get-ChildItem C:/Users/re0ph/.codex/skills/faq-generator,C:/Users/re0ph/.codex/skills/faq-grounded-review,C:/Users/re0ph/.codex/skills/faq-judge`
Expected: all three source directories exist

**Step 2: Copy the minimal repository-owned assets**

- Copy each FAQ skill directory into `skills/faq/`
- Keep bundled resources that are directly referenced by the skill

**Step 3: Verify the import**

Run: `Get-ChildItem skills/faq | Select-Object Name`
Expected: `faq-generator`, `faq-grounded-review`, and `faq-judge`

**Step 4: Commit**

```bash
git add skills/faq
git commit -m "feat: add faq skill series"
```

### Task 4: Add per-series package directories for every host

**Files:**
- Create: `packages/phi/.claude-plugin/`
- Create: `packages/phi/.cursor-plugin/`
- Create: `packages/phi/.opencode/plugins/`
- Create: `packages/phi/.codex/`
- Create: `packages/phi/README.md`
- Create: `packages/faq/.claude-plugin/`
- Create: `packages/faq/.cursor-plugin/`
- Create: `packages/faq/.opencode/plugins/`
- Create: `packages/faq/.codex/`
- Create: `packages/faq/README.md`

**Step 1: Write the failing check**

Run: `Get-ChildItem packages -ErrorAction SilentlyContinue`
Expected: `packages` does not exist

**Step 2: Create the package skeleton**

- Create matching host adapter directories for `phi`
- Create matching host adapter directories for `faq`
- Add package-local READMEs

**Step 3: Verify**

Run: `Get-ChildItem -Recurse -Depth 3 packages`
Expected: both package trees exist

**Step 4: Commit**

```bash
git add packages
git commit -m "refactor: add per-series package skeletons"
```

### Task 5: Split the Claude and Cursor manifests by series

**Files:**
- Create: `packages/phi/.claude-plugin/plugin.json`
- Create: `packages/phi/.claude-plugin/marketplace.json`
- Create: `packages/phi/.cursor-plugin/plugin.json`
- Create: `packages/faq/.claude-plugin/plugin.json`
- Create: `packages/faq/.claude-plugin/marketplace.json`
- Create: `packages/faq/.cursor-plugin/plugin.json`
- Reference: `.claude-plugin/plugin.json`
- Reference: `.claude-plugin/marketplace.json`
- Reference: `.cursor-plugin/plugin.json`

**Step 1: Write the failing check**

Run: `Get-ChildItem packages/phi/.claude-plugin,packages/faq/.claude-plugin`
Expected: directories exist but manifests do not

**Step 2: Create the manifests**

- Base the `phi` manifests on the current root manifests
- Point `skills` to the `phi` package skill subtree
- Create FAQ manifests with package name `faq`
- Point FAQ manifests to the `faq` package skill subtree
- Adjust descriptions so each package advertises only its own scope

**Step 3: Validate JSON**

Run: `Get-Content packages/phi/.claude-plugin/plugin.json | ConvertFrom-Json | Out-Null; Get-Content packages/faq/.claude-plugin/plugin.json | ConvertFrom-Json | Out-Null; Get-Content packages/phi/.cursor-plugin/plugin.json | ConvertFrom-Json | Out-Null; Get-Content packages/faq/.cursor-plugin/plugin.json | ConvertFrom-Json | Out-Null`
Expected: no JSON parse errors

**Step 4: Commit**

```bash
git add packages
git commit -m "feat: split claude and cursor manifests by series"
```

### Task 6: Split the OpenCode adapters by series

**Files:**
- Create: `packages/phi/.opencode/opencode.json`
- Create: `packages/phi/.opencode/plugins/phi.js`
- Create: `packages/faq/.opencode/opencode.json`
- Create: `packages/faq/.opencode/plugins/faq.js`
- Reference: `.opencode/opencode.json`
- Reference: `.opencode/plugins/phi.js`

**Step 1: Write the failing check**

Run: `Get-ChildItem packages/phi/.opencode/plugins,packages/faq/.opencode/plugins`
Expected: plugin files do not exist

**Step 2: Create package-local adapters**

- Clone the current adapter shape for `phi`
- Point `skillsDir` to the package-local `phi` skill subtree
- Create an FAQ adapter with FAQ-specific instructions

**Step 3: Validate**

Run: `Get-Content packages/phi/.opencode/opencode.json | ConvertFrom-Json | Out-Null; Get-Content packages/faq/.opencode/opencode.json | ConvertFrom-Json | Out-Null`
Expected: no JSON parse errors

**Step 4: Commit**

```bash
git add packages
git commit -m "feat: split opencode adapters by series"
```

### Task 7: Add Codex installation docs for each series

**Files:**
- Create: `packages/phi/.codex/INSTALL.md`
- Create: `packages/faq/.codex/INSTALL.md`
- Reference: `.codex/INSTALL.md`

**Step 1: Write the failing check**

Run: `Get-ChildItem packages/phi/.codex,packages/faq/.codex`
Expected: directories exist and install docs are missing

**Step 2: Write install guidance**

- `phi` instructions should install only `skills/phi`
- `faq` instructions should install only `skills/faq`
- Include GitHub path-based installation guidance for Codex where appropriate

**Step 3: Verify**

Run: `Get-Content packages/phi/.codex/INSTALL.md,packages/faq/.codex/INSTALL.md`
Expected: both install documents exist and mention only one series each

**Step 4: Commit**

```bash
git add packages
git commit -m "docs: add codex install docs for each series"
```

### Task 8: Relocate shared hooks and support assets

**Files:**
- Modify: `hooks/hooks.json`
- Create: `shared/hooks/hooks.json`
- Reference: `commands/.gitkeep`
- Reference: `agents/.gitkeep`

**Step 1: Write the failing check**

Run: `Get-Content hooks/hooks.json`
Expected: hooks still live at the repository root support area

**Step 2: Move or duplicate support assets intentionally**

- Move hook configuration to `shared/hooks/` if host adapters can reference it safely
- If host adapters still require stable root paths, leave a compatibility file or bridge in place
- Decide whether empty `commands/` and `agents/` stay repo-global or become series-specific later; do not over-design in this iteration

**Step 3: Verify**

Run: `Get-ChildItem shared/hooks`
Expected: hook configuration exists in the shared layer

**Step 4: Commit**

```bash
git add hooks shared
git commit -m "refactor: establish shared support layer"
```

### Task 9: Update routing metadata to reflect repository-local FAQ ownership

**Files:**
- Modify: `lib/host-map.json`
- Modify: `lib/skill-map.json`
- Modify: `rules/routing-policy.md`
- Modify: `rules/stage-ownership.md`

**Step 1: Write the failing check**

Run: `Select-String -Path lib/skill-map.json,rules/routing-policy.md,rules/stage-ownership.md -Pattern 'phi-local|skillsPath\": \"skills\"'`
Expected: references still assume one shared skill root or external FAQ ownership

**Step 2: Update metadata minimally**

- Replace single-root skill path assumptions with series-aware wording where required
- Change FAQ routing references from external private ownership to repository-local FAQ series ownership
- Preserve the stage-ownership model

**Step 3: Verify**

Run: `Get-Content lib/skill-map.json | ConvertFrom-Json | Out-Null`
Expected: valid JSON and updated FAQ routing

**Step 4: Commit**

```bash
git add lib rules
git commit -m "refactor: update routing metadata for multi-series packaging"
```

### Task 10: Rewrite the root README for the new installation model

**Files:**
- Modify: `README.md`
- Create: `docs/series.md`

**Step 1: Write the failing check**

Run: `Select-String -Path README.md -Pattern 'skills/|phi@phi|shared `skills/` directory'`
Expected: README still describes a single shared package

**Step 2: Update documentation**

- Explain the repository now contains multiple installable series
- Document `phi` and `faq`
- Explain `shared/` as internal support infrastructure
- Link to package-specific install docs
- Add `docs/series.md` as the concise overview of boundaries and expansion rules

**Step 3: Verify**

Run: `Get-Content README.md,docs/series.md`
Expected: docs describe two installable series and the shared support layer

**Step 4: Commit**

```bash
git add README.md docs/series.md
git commit -m "docs: describe multi-series repository layout"
```

### Task 11: Add repository validation commands

**Files:**
- Modify: `README.md`
- Optionally create: `shared/scripts/validate-series-layout.ps1`

**Step 1: Write the failing check**

Run: `Get-ChildItem shared/scripts`
Expected: no validation helper exists yet

**Step 2: Add minimal validation**

- Either document or script checks for:
  - required package manifests
  - expected skill directories for each series
  - valid JSON manifests
- Keep it simple and repository-local

**Step 3: Verify**

Run: `powershell -ExecutionPolicy Bypass -File shared/scripts/validate-series-layout.ps1`
Expected: success once the repository is fully migrated

**Step 4: Commit**

```bash
git add shared/scripts README.md
git commit -m "chore: add series layout validation"
```

### Task 12: Final verification pass

**Files:**
- Verify only

**Step 1: Validate repository shape**

Run: `Get-ChildItem skills,packages,shared`
Expected: `skills/phi`, `skills/faq`, `packages/phi`, `packages/faq`, and `shared/*` exist

**Step 2: Validate manifests**

Run: `Get-ChildItem -Recurse packages -Include *.json | ForEach-Object { Get-Content $_.FullName | ConvertFrom-Json | Out-Null }`
Expected: no parse errors

**Step 3: Validate docs**

Run: `Get-ChildItem docs/plans docs`
Expected: design and implementation docs exist, plus updated series docs

**Step 4: Commit**

```bash
git add .
git commit -m "chore: finalize multi-series packaging migration"
```
