# Phi for Codex

## Goal

Expose the repository skill series to Codex while keeping setup minimal.

## Recommended Setup

1. Make this repository available locally.
2. Choose one series: `phi` or `faq`.
3. Symlink only the selected series into `~/.codex/skills`.
4. Keep `superpowers` and ECC available as upstream sources when using `phi`.

### `phi` series

```bash
for d in ~/phi-skills/skills/phi/*; do
  name="$(basename "$d")"
  rm -rf "$HOME/.codex/skills/$name"
  ln -s "$d" "$HOME/.codex/skills/$name"
done
```

### `faq` series

```bash
for d in ~/phi-skills/skills/faq/*; do
  name="$(basename "$d")"
  rm -rf "$HOME/.codex/skills/$name"
  ln -s "$d" "$HOME/.codex/skills/$name"
done
```

## Entrypoint Rule

Use `phi-*` first when the `phi` series is installed. Use `faq-*` directly when you install the standalone FAQ series.

