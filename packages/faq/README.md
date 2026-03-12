# FAQ Series Package

This package exposes the standalone FAQ skill series from the repository.

## Scope

- `faq-generator`
- `faq-grounded-review`
- `faq-judge`

This package does not include the `phi-*` orchestration layer.

## Skill Root

Host adapters in this package should point only at `skills/faq`.

## Host Files

- `.claude-plugin/` for Claude-compatible plugin manifests
- `.cursor-plugin/` for Cursor-compatible plugin manifests
- `.opencode/` for OpenCode bootstrap files
- `.codex/INSTALL.md` for Codex installation guidance

## Install

### Codex

Use `.codex/INSTALL.md`.

### Claude Code

Add the repository as a marketplace source and enable `faq@phi-skills`.

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
    "faq@phi-skills": true
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
- if needed, disable and re-enable `faq@phi-skills`
