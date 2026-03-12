# Phi Claude Plugin

This repository exposes multiple Claude-compatible plugin packages.

## Intent

- keep package manifests thin and series-scoped
- expose `phi` as the default compatibility plugin at the root
- expose `phi` and `faq` as separate installable packages under `packages/`

## Notes

- `skills/phi/` and `skills/faq/` are the series roots
- `.claude-plugin/marketplace.json` advertises both installable series
- shared hooks now live under `shared/hooks/`

