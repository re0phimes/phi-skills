# Phi Series for Codex

## Goal

Expose only the `phi` series from this repository to Codex.

## Recommended Setup

1. Clone the repository locally.
2. Create `~/.codex/skills` if it does not already exist.
3. Symlink only the skills under `skills/phi/`.

```bash
git clone https://github.com/re0phimes/phi-skills.git ~/phi-skills

mkdir -p ~/.codex/skills

for d in ~/phi-skills/skills/phi/*; do
  name="$(basename "$d")"
  rm -rf "$HOME/.codex/skills/$name"
  ln -s "$d" "$HOME/.codex/skills/$name"
done
```

## Entrypoint Rule

Use `phi-*` as the default entrypoint layer. Install the FAQ series separately if you want standalone `faq-*` skills alongside `phi-faq`.

## Update

After the initial install:

```bash
cd ~/phi-skills
git pull
```

The symlinks under `~/.codex/skills` keep pointing at the same repository checkout, so a pull updates the installed `phi` series in place.
