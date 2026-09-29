# Badge

A rounded label to highlight something: "NEW" or "FEATURED" in a menu, a status, a category. It
isn't interactive; for a clickable pill use `Chip`.

## Usage

```tsx
import { Badge } from '@inzumer/ui-library';

<Badge uppercase>New</Badge>;

<Badge
  size="md"
  radius="md"
  icon={<CupcakeIcon />}
  colors={{ background: 'var(--category-sweet-bg)', text: 'var(--category-sweet-text)' }}
>
  Sweet
</Badge>;
```

## Props

- `size` — `sm` (default, small label) or `md` (same size as a `Chip`)
- `radius` — `none`, `sm`, `md`, `lg` or `full` (default)
- `uppercase` — uppercase text with a little letter spacing; off by default
- `icon` — any node before the label, hidden from assistive tech. The library doesn't ship an icon
  family: each project passes its own
- `tone` — preset colors: `neutral` (default) or the Snackbar's `info`, `success`, `error` and
  `warning` (`STATUS_TONES` / `PILL_TONES` in `@utils`)
- `colors` — `{ background, text }` as CSS colors, ideally the project's tokens; they win over
  `tone`

## Notes

- `Chip` and `Showcase` draw their pill with the same styles (`badgeStyles`, `badgeColorStyle`).
- Pick token pairs with AA contrast in light and dark mode.
