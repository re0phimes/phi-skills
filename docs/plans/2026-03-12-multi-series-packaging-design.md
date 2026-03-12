# Multi-Series Packaging Design

## Context

The repository currently exposes a single cross-host `phi` package rooted at the shared `skills/` directory. All host adapters point at the same skill tree, which means users install one package and receive the entire repository skill surface.

This is sufficient for the initial `phi-*` rollout, but it does not support separate installation of the FAQ workflow skills. It also leaves no clean place for future shared hooks, templates, or host-specific support components that should not themselves be treated as installable skill series.

## Decision

Adopt a single-repository, multi-series packaging model with:

- `phi` as one installable series
- `faq` as one installable series
- `shared` as a non-series support layer for hooks, components, templates, and scripts

Do not add a `project` series in this iteration.

## Approved Structure

```text
skills/
  phi/
    phi-backend/
    phi-brainstorming/
    phi-db/
    phi-debugging/
    phi-execute/
    phi-faq/
    phi-frontend/
    phi-java/
    phi-parallel/
    phi-planning/
    phi-python/
    phi-review/
    phi-tdd/
    phi-verify/
  faq/
    faq-generator/
    faq-grounded-review/
    faq-judge/

shared/
  hooks/
  components/
  templates/
  scripts/

packages/
  phi/
    .claude-plugin/
    .cursor-plugin/
    .opencode/
    .codex/
    README.md
  faq/
    .claude-plugin/
    .cursor-plugin/
    .opencode/
    .codex/
    README.md
```

## Series Boundaries

### `phi`

`phi` remains the orchestration entrypoint layer. It owns the `phi-*` namespace and keeps `phi-faq` as the domain-level routing entrypoint for FAQ work.

`phi` is installable on its own and should not force installation of the concrete FAQ production skills.

### `faq`

`faq` contains the concrete FAQ workflow skills:

- `faq-generator`
- `faq-grounded-review`
- `faq-judge`

This series is independently installable for users who want the FAQ toolchain without the full `phi` orchestration layer.

### `shared`

`shared` is not an installable skill series. It exists to hold reusable repository support assets:

- hooks and hook configuration
- shared plugin helpers
- scripts for install or packaging automation
- templates and reusable components

Future expansion should prefer `shared` first when the asset is infrastructure rather than a user-facing skill.

## Packaging Model

Each installable series gets its own host adapter package under `packages/<series>/`.

Each package points only at its own skill subtree:

- `packages/phi/*` -> `skills/phi`
- `packages/faq/*` -> `skills/faq`

This allows:

- separate installation on Codex by GitHub path
- separate plugin exposure for Claude-compatible hosts
- future addition of new series without restructuring the repository again

## Routing and Ownership Impact

The existing routing model remains valid with one adjustment: `phi-faq` becomes an orchestration bridge into the installable `faq` series rather than only referencing private local skills outside the repository.

`lib/skill-map.json`, `rules/routing-policy.md`, and `rules/stage-ownership.md` should continue to describe stage ownership the same way, but references to FAQ sources should be updated to point to repository-local FAQ skills.

## Rejected Alternatives

### Keep one shared `skills/` directory and group only in documentation

Rejected because host adapters would still expose the full repository skill set and users could not install `phi` and `faq` separately.

### Add a `project` series now

Rejected because there is no stable project-specific skill set in this repository yet. Adding the series now would create packaging overhead without a concrete installation target.

### Make hooks or components their own series

Rejected because hooks and components are support infrastructure, not user-facing skill catalogs. Treating them as series would blur installation boundaries and complicate packaging.

## Migration Rules

- Preserve the current `phi-*` skill names.
- Preserve `phi-faq` inside the `phi` series.
- Copy FAQ skills into this repository as repository-owned assets.
- Move host manifests away from a single repo-wide package and toward per-series packages.
- Keep shared hooks available, but do not force them into the FAQ package unless they are truly FAQ-specific.

## Success Criteria

The design is complete when:

- `phi` can be installed without installing FAQ concrete skills
- `faq` can be installed as a separate series
- host adapters no longer assume one global repo package
- shared support assets have a stable non-series home
- the repository layout leaves room for future series without another top-level reorganization
