# Phi Skills

`phi-skills` is a single repository that now publishes multiple installable skill series.

Instead of exposing one monolithic skill directory, the repository separates:

- the `phi` orchestration entrypoint series
- the `faq` workflow series
- a shared support layer for hooks, scripts, templates, and reusable host components

## Goals

- Provide stable installable skill series across `Codex`, `Claude`, `Cursor`, and `OpenCode`
- Route workflow-stage control to `superpowers`
- Route domain specialization to `everything-claude-code`
- Preserve repository-owned workflows under a clear installation model
- Leave room for future shared hooks and support components without turning them into fake skill series

## Series

### `phi`

- Orchestration entrypoints such as `phi-brainstorming`, `phi-planning`, `phi-debugging`, and `phi-verify`
- Domain entrypoints such as `phi-frontend`, `phi-backend`, `phi-python`, `phi-java`, `phi-db`, and `phi-faq`
- Skills live in `skills/phi/`
- Package manifests live in `packages/phi/`

### `faq`

- Concrete FAQ workflow skills: `faq-generator`, `faq-grounded-review`, `faq-judge`
- Skills live in `skills/faq/`
- Package manifests live in `packages/faq/`

### `shared`

- Non-series support layer for hooks, scripts, templates, and reusable components
- Support assets live in `shared/`

## Operating Model

- `phi-*` remains the preferred orchestration entrypoint layer
- `faq` contains the concrete FAQ production workflow skills
- `superpowers` remains the workflow-discipline source
- `everything-claude-code` (ECC) remains the domain-expansion source
- `shared/` holds support infrastructure rather than installable skills

Only one source owns a stage at a time.

## Repository Layout

- `skills/phi/` user-facing `phi-*` skills
- `skills/faq/` concrete FAQ workflow skills
- `packages/phi/` host packaging for the `phi` series
- `packages/faq/` host packaging for the `faq` series
- `shared/` hooks, templates, scripts, and reusable support assets
- `rules/` orchestration and ownership policy
- `lib/` routing metadata and host maps

## Installation

Install one series at a time.

- `phi` installation details: `packages/phi/`
- `faq` installation details: `packages/faq/`

Each package contains host-specific manifests or install notes for Codex, Claude-compatible hosts, Cursor, and OpenCode.

### Codex

1. Clone the repository locally.
2. Pick one series: `phi` or `faq`.
3. Follow the Codex instructions in:
   - `packages/phi/.codex/INSTALL.md`
   - `packages/faq/.codex/INSTALL.md`

Update:

1. `cd` into your local `phi-skills` clone.
2. Run `git pull`.
3. Restart Codex if it has already loaded the old skill set.

Because the Codex setup uses symlinks into the repository, a pull updates the installed series in place.

### Claude Code

Add this repository as a marketplace source, then enable the plugin for the series you want.

Example:

```json
{
  "extraKnownMarketplaces": {
    "phi-skills": {
      "source": {
        "source": "github",
        "repo": "re0phimes/phi-skills"
      }
    }
  },
  "enabledPlugins": {
    "phi@phi-skills": true,
    "faq@phi-skills": false
  }
}
```

Enable:

- `phi@phi-skills` for the `phi` series
- `faq@phi-skills` for the `faq` series

Update:

1. Push the latest repository changes to GitHub.
2. Restart Claude Code so it reloads marketplace metadata.
3. If the old plugin state is still cached, disable and re-enable the plugin.

## Quickstart

1. Choose the series you want to install.
2. Follow the host-specific instructions in `packages/<series>/`.
3. Keep `superpowers` and ECC available as upstream sources when using `phi`.
4. Prefer `phi-*` for orchestration work and install `faq` when you need the concrete FAQ toolchain.

## Validation

Run the repository layout check after packaging changes:

```powershell
powershell -ExecutionPolicy Bypass -File .\shared\scripts\validate-series-layout.ps1
```

## Reference

- Series boundaries: `docs/series.md`
- Machine-readable source metadata: `lib/source-manifest.json`
- Approved design: `docs/plans/2026-03-12-multi-series-packaging-design.md`
- Implementation plan: `docs/plans/2026-03-12-multi-series-packaging.md`

## Current Status

This repository contains the first multi-series packaging pass for the approved orchestration design saved in:

- `docs/plans/2026-03-09-phi-plugin-convergence-design.md`
- `docs/plans/2026-03-09-phi-plugin-convergence.md`

