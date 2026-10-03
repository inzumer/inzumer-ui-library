# Chip

A rounded pill button with an optional icon and its own colors. Use it as a toggle (`pressed`)
inside a `Filter`, or on its own for small actions and tags.

## Usage

```tsx
import { Chip } from '@inzumer/ui-library';

<Chip
  pressed={category === 'sweet'}
  icon={<CupcakeIcon />}
  colors={{ background: 'var(--category-sweet-bg)', text: 'var(--category-sweet-text)' }}
  onClick={() => setCategory('sweet')}
>
  Sweet
</Chip>;
```

## Props

- `pressed` — toggle state (`aria-pressed`); the pressed chip gets an inset ring in its text color.
  Leave it out for a plain action chip
- `icon` — any node before the label, hidden from assistive tech: a library icon
  (`<Icon name="…" />`, see Icons) or a project's own
- `tone` — preset colors, as in `Badge` (`neutral` by default, or `info`, `success`, `error`,
  `warning`)
- `colors` — `{ background, text }` as CSS colors, ideally the project's tokens; they win over
  `tone`
- Every other `<button>` prop (`id`, `onClick`, `disabled`…); `type` is always `button`

## Notes

- The focus ring is an outline, so it shows together with the pressed ring.
- Pick token pairs with AA contrast in light and dark mode.
