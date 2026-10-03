# Inzumer UI Library

Production-grade React component library monorepo for web applications and mobile WebViews. The published package is [`@inzumer/ui-library`](./packages/ui).

---

## Purpose

`@inzumer/ui-library` provides a unified, accessible, and performant design system for TypeScript React projects. It enforces consistent visual language, interaction patterns, and WCAG 2.1 AA accessibility standards across web and WebView platforms.

---

## Monorepo layout

| Package                                                | Description                                            |
| ------------------------------------------------------ | ------------------------------------------------------ |
| [`packages/ui`](./packages/ui) → `@inzumer/ui-library` | The published component library (Button, Input, Card). |

Managed with **pnpm workspaces** + **Turborepo**.

The design tokens and the shared tooling live in their own repositories, one per package
(`inzumer-<name>` → `@inzumer/<name>`):

| Repository                                                        | Package             | What it is                                              |
| ----------------------------------------------------------------- | ------------------- | ------------------------------------------------------- |
| [`inzumer-tokens`](https://github.com/inzumer/inzumer-tokens)     | `@inzumer/tokens`   | Design tokens, theming, CSS variables, Tailwind preset. |
| [`inzumer-eslint`](https://github.com/inzumer/inzumer-eslint)     | `@inzumer/eslint`   | Shared ESLint flat config.                              |
| [`inzumer-prettier`](https://github.com/inzumer/inzumer-prettier) | `@inzumer/prettier` | Shared Prettier config.                                 |
| [`inzumer-tsconfig`](https://github.com/inzumer/inzumer-tsconfig) | `@inzumer/tsconfig` | Shared TypeScript base configs.                         |
| [`inzumer-ci`](https://github.com/inzumer/inzumer-ci)             | —                   | Shared GitHub Actions workflows.                        |

All of them come from npm.

---

## Stack

| Tool                       | Purpose                                 |
| -------------------------- | --------------------------------------- |
| React 18/19                | Component model                         |
| TypeScript (strict)        | Type safety                             |
| tsup                       | Library build (ESM + type declarations) |
| Tailwind CSS 4             | Token-driven styling                    |
| class-variance-authority   | Variant management                      |
| Vitest + RTL               | Unit and accessibility testing          |
| Storybook 8 (Vite builder) | Component documentation                 |
| Changesets                 | Versioning and publishing               |
| ESLint + Prettier          | Code quality                            |

---

## Setup

### Prerequisites

- Node.js >=18
- pnpm >=9 (this repo pins `pnpm@9.15.9` via `packageManager`; run `corepack enable` if `pnpm` isn't on your PATH)

### Install dependencies

```bash
pnpm install
```

### Storybook

```bash
pnpm storybook
```

Opens Storybook at `http://localhost:6006`, rendering the components straight from `packages/ui/src`.

```bash
pnpm build-storybook
```

Builds a static Storybook into `storybook-static/`.

---

## Scripts

Run from the repo root; Turborepo fans these out to every package as needed.

| Command                             | Description                                                 |
| ----------------------------------- | ----------------------------------------------------------- |
| `pnpm storybook`                    | Start the Storybook dev server                              |
| `pnpm build-storybook`              | Build a static Storybook                                    |
| `pnpm dev`                          | Run every package's `dev` script in parallel (watch builds) |
| `pnpm build`                        | Build all packages for distribution                         |
| `pnpm test`                         | Run test suites across the workspace                        |
| `pnpm typecheck`                    | TypeScript type check (no emit) across the workspace        |
| `pnpm lint`                         | Lint source files across the workspace                      |
| `pnpm format` / `pnpm format:check` | Prettier write / check                                      |
| `pnpm changeset`                    | Record a changeset for pending changes                      |
| `pnpm changeset:version`            | Apply changesets and bump versions                          |
| `pnpm changeset:publish`            | Build and publish to npm                                    |

---

## Using the library

```bash
pnpm add @inzumer/ui-library
```

```tsx
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@inzumer/ui-library';

export function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello</CardTitle>
      </CardHeader>
      <CardContent>
        <Input label="Name" placeholder="Jane Doe" />
        <Button variant="primary" onClick={() => console.log('clicked')}>
          Submit
        </Button>
      </CardContent>
    </Card>
  );
}
```

Consumers also need the design tokens (Tailwind preset + base CSS variables) from `@inzumer/tokens` — see the [`inzumer-tokens` README](https://github.com/inzumer/inzumer-tokens#readme) for the Tailwind preset and CSS entry points.

### Publishing

This repo uses [Changesets](https://github.com/changesets/changesets):

1. `pnpm changeset` — describe the change and select which packages bump.
2. `pnpm changeset:version` — applies version bumps and updates changelogs.
3. `pnpm changeset:publish` — builds every package and runs `npm publish` (requires being logged in to npm with publish rights to the `@inzumer` scope).

### Testing a local build in another repo before publishing

```bash
# inside packages/ui
pnpm build
pnpm pack   # produces inzumer-ui-library-<version>.tgz

# inside the consumer repo
pnpm add /path/to/inzumer-ui-library-<version>.tgz
```

or use `pnpm link --global` from `packages/ui` and `pnpm link --global @inzumer/ui-library` from the consumer repo for live iteration.

---

## Contributing

### Architecture rules

All agents and architecture rules are defined in `.claude/agents/`. Read them before contributing.

### Planning requirement

All non-trivial changes require a planning document in `/docs/plans/` before implementation begins.
See `YYYY-MM-DD-task-name.md` format.

### Architectural decisions

Significant architecture changes require an ADR in `/docs/adr/`.

### Code standards

- Zero `any` — strict TypeScript throughout
- Semantic HTML first — no clickable `div`s
- Token-only Tailwind — no arbitrary values
- Every component must: be tested, be accessible, be Storybook-documented, be exported

### Commit convention

Conventional Commits format:

```
feat(button): add loading state
fix(button): correct focus ring on Firefox
docs: update README setup instructions
```

### Pull request checklist

- [ ] Planning document exists in `/docs/plans/` (for non-trivial changes)
- [ ] All tests pass (`pnpm test`)
- [ ] TypeScript passes (`pnpm typecheck`)
- [ ] Lint passes (`pnpm lint`)
- [ ] Storybook stories cover new states
- [ ] A changeset is included (`pnpm changeset`) for any published package change

---

## Accessibility commitment

This library targets **WCAG 2.1 AA** compliance for every component. Accessibility is checked in Storybook via `@storybook/addon-a11y` and should be verified for every new component.

If you find an accessibility issue, please open an issue with the label `a11y`.
