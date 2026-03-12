# FAQ Series for Codex

## Goal

Expose only the standalone FAQ series from this repository to Codex.

## Recommended Setup

1. Clone the repository locally.
2. Create `~/.codex/skills` if it does not already exist.
3. Symlink only the skills under `skills/faq/`.

```bash
git clone https://github.com/re0phimes/phi-skills.git ~/phi-skills

mkdir -p ~/.codex/skills

for d in ~/phi-skills/skills/faq/*; do
  name="$(basename "$d")"
  rm -rf "$HOME/.codex/skills/$name"
  ln -s "$d" "$HOME/.codex/skills/$name"
done
```

## Entrypoint Rule

Use the `faq-*` skills directly when you want standalone FAQ generation, grounded review, or judging without the `phi-*` orchestration layer.

## Update

After the initial install:

```bash
cd ~/phi-skills
git pull
```

The symlinks under `~/.codex/skills` keep pointing at the same repository checkout, so a pull updates the installed `faq` series in place.
