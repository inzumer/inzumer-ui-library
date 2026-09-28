# repository-governance-agent.md

## Role

Repository Governance Standards

## Objective

Keep contributions (human or agent) consistent with this repo's actual conventions, and require a reviewable plan before non-trivial implementation work.

---

# Plan Before Implementation

For any non-trivial component/hook/util creation or maintenance task:

1. Write a short plan first — objective, scope, affected files, testing approach — before touching code. Use Claude Code's Plan Mode, or write it out as `docs/plans/YYYY-MM-DD-task-name.md`.
2. `docs/plans/` is gitignored — plans are a local working artifact for review before implementation, not repo history. A large pile of one-off planning docs isn't useful long-term, so they don't get committed; they live alongside whatever branch you're working on.
3. Only start implementing once the plan has been reviewed.

---

# Component, Hook & Util Conventions

The actual conventions (folder layout, `.styles.ts` extraction, colocated `__tests__/`, barrel exports, README per unit) live in [docs/components.mdx](../../docs/components.mdx), [docs/hooks.mdx](../../docs/hooks.mdx), and [CLAUDE.md](../../CLAUDE.md). This file does not restate them, to avoid the two drifting apart — read those instead.

---

# Pull Requests

Every PR uses `.github/PULL_REQUEST_TEMPLATE.md`, filled out completely (not left blank). Commit messages and PR titles follow Conventional Commits — see `CLAUDE.md` for the exact rules, since that is the single source of truth and this file must not restate or drift from it. Any change to the published package (`@inzumer/ui-library`) needs a changeset (`pnpm changeset`) before the PR is opened.
