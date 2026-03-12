# Phi Series Package

This package exposes the `phi` orchestration series from the repository.

## Scope

- workflow entrypoints such as `phi-brainstorming`, `phi-planning`, and `phi-verify`
- domain entrypoints such as `phi-frontend`, `phi-backend`, `phi-python`, `phi-java`, `phi-db`, and `phi-faq`

This package does not expose the standalone FAQ skill series.

## Skill Root

Host adapters in this package should point only at `skills/phi`.

## Host Files

- `.claude-plugin/` for Claude-compatible plugin manifests
- `.cursor-plugin/` for Cursor-compatible plugin manifests
- `.opencode/` for OpenCode bootstrap files
- `.codex/INSTALL.md` for Codex installation guidance

## Install

### Codex

Use `.codex/INSTALL.md`.

### Claude Code

Add the repository as a marketplace source and enable `phi@phi-skills`.

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
    "phi@phi-skills": true
  }
}
```

## Update

### Codex

- `cd ~/phi-skills`
- `git pull`
- restart Codex if needed

### Claude Code

- push the latest repository changes to GitHub
- restart Claude Code
- if needed, disable and re-enable `phi@phi-skills`
