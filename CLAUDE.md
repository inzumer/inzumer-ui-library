# CLAUDE.md

Guidance for Claude Code (and any other AI coding agent) working in this repository.

## Project

`inzumer-ui-library` repository (pnpm workspaces + Turborepo) with one published package: `packages/ui` → `@inzumer/ui-library`. The design tokens (`@inzumer/tokens`, repo `inzumer-tokens`) and the shared configs (`@inzumer/eslint`, `@inzumer/prettier`, `@inzumer/tsconfig`) live in their own `inzumer-*` repositories; change them there, not here. See [README.md](./README.md) and [docs](./docs) for conventions on components, hooks, utils, and imports.

Key commands: `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm test:coverage` (90% gate), `pnpm build`, `pnpm build-storybook`.

## Commit messages & PR titles

This repo strictly follows [Conventional Commits v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) for every commit message and pull request title generated or suggested here.

Format: `<type>[optional scope]: <description>`

Allowed types:

| Type       | Use for                                  |
| ---------- | ---------------------------------------- |
| `feat`     | New functionality (semver minor)         |
| `fix`      | Bug fix (semver patch)                   |
| `chore`    | Maintenance, dependencies, routine tasks |
| `refactor` | Code change with no functional impact    |
| `docs`     | Documentation only                       |
| `test`     | Adding or fixing tests                   |
| `style`    | Formatting/whitespace, no logic change   |
| `perf`     | Performance improvements                 |
| `ci`       | CI configuration                         |
| `build`    | Build system / tooling                   |

Breaking changes: append `!` before the colon (e.g. `feat(api)!: ...`) and/or add a `BREAKING CHANGE:` footer explaining the break.

Scope is optional but encouraged when a change is package- or area-specific, e.g. `feat(ui): ...`, `fix(carousel): ...`, `docs(storybook): ...`.

## Pull requests

Every PR must use [.github/PULL_REQUEST_TEMPLATE.md](./.github/PULL_REQUEST_TEMPLATE.md) filled out in full, not left as the blank scaffold. When a task is executed end-to-end here (component/hook/util creation or maintenance, bug fixes, docs), the resulting PR description is where that work gets reviewed later, so:

- Describe what changed and why, not just what files moved.
- Check off the template's checklist items only once they're actually true (validation commands run, changeset added if a published package changed, stories/README/docs updated for component or hook changes).
- Leave a clear trail in "Notas adicionales" for any non-obvious decision — the same bar as an inline comment: only worth writing if it wouldn't be obvious from reading the diff.

## Releases

Versioning and publishing go through [Changesets](https://github.com/changesets/changesets). Any change to `@inzumer/ui-library` should come with a changeset: run `pnpm changeset` and describe the change. Token changes are released from `inzumer-tokens`; bump `@inzumer/tokens` here afterwards.

`.github/workflows/release.yml` runs on every push to `main`:

- If there are unreleased changesets, it opens/updates a "Version Packages" PR that bumps versions and updates CHANGELOGs (`changeset version`).
- When that PR is merged (no changesets left pending), the same workflow publishes the bumped packages to npm (`changeset publish`).

Publishing requires an `NPM_TOKEN` repo secret (an npm automation token) with publish rights for the `@inzumer` scope.
