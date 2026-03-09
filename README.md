# Phi

`phi` is a cross-host orchestration layer for agent skills and plugins.

Instead of choosing between `superpowers`, `everything-claude-code` (ECC), and local private skills on every task, users interact through a unified `phi-*` entrypoint model.

## Goals

- Provide one stable skill namespace across `Codex`, `Claude`, `Cursor`, and `OpenCode`
- Route workflow-stage control to `superpowers`
- Route domain specialization to `everything-claude-code`
- Preserve private workflows under the same `phi-*` mental model
- Reduce direct, isolated upstream invocation for common flows

## Operating Model

- `phi-*` is the preferred entrypoint layer
- `superpowers` is the workflow-discipline source
- `ECC` is the domain-expansion source
- `phi-local` is the private workflow source

Only one source owns a stage at a time.

## First Batch Entrypoints

### Workflow
- `phi-brainstorming`
- `phi-planning`
- `phi-debugging`
- `phi-tdd`
- `phi-verify`
- `phi-execute`
- `phi-parallel`
- `phi-review`

### Domain
- `phi-frontend`
- `phi-backend`
- `phi-python`
- `phi-java`
- `phi-db`
- `phi-faq`

## Repository Layout

- `skills/` user-facing `phi-*` skills
- `rules/` orchestration and ownership policy
- `lib/` routing metadata and host maps
- `.claude-plugin/` Claude packaging
- `.codex/` Codex packaging
- `.cursor-plugin/` Cursor packaging
- `.opencode/` OpenCode packaging

## Installation

### Codex (Recommended, especially on Linux)

For Codex, the simplest setup is to clone this repository and symlink each `phi-*` skill into `~/.codex/skills/`. This works well on Linux servers and headless machines.

```bash
git clone https://github.com/re0phimes/phi-skills.git ~/phi-skills

mkdir -p ~/.codex/skills

for d in ~/phi-skills/skills/*; do
  name="$(basename "$d")"
  rm -rf "$HOME/.codex/skills/$name"
  ln -s "$d" "$HOME/.codex/skills/$name"
done
```

Optional: mark the repository as trusted in `~/.codex/config.toml`:

```toml
[projects."/home/YOUR_USER/phi-skills"]
trust_level = "trusted"
```

To verify the installation:

```bash
ls -1 ~/.codex/skills | grep '^phi-'
```

To update later:

```bash
cd ~/phi-skills
git pull
```

### Claude Code

For Claude Code, use the plugin marketplace flow instead of manual skill linking.

Add this repository as a marketplace source, then enable the plugin:

```json
{
  "extraKnownMarketplaces": {
    "phi": {
      "source": {
        "source": "github",
        "repo": "re0phimes/phi-skills"
      }
    }
  },
  "enabledPlugins": {
    "phi@phi": true
  }
}
```

If you prefer the command flow in Claude Code, the equivalent idea is to add the marketplace source first and then install/enable `phi@phi`.

## Quickstart

1. Install `phi` through your host-specific flow.
2. Keep `superpowers` and ECC available as upstream sources.
3. Prefer `phi-*` for daily work instead of calling upstream skills directly.
4. Extend `phi` only when a workflow is stable and worth preserving locally.

## Current Status

This repository is a first implementation of the approved orchestration design saved in:

- `docs/plans/2026-03-09-phi-plugin-convergence-design.md`
- `docs/plans/2026-03-09-phi-plugin-convergence.md`

