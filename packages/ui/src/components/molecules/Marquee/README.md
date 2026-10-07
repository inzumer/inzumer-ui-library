# Marquee

A strip that scrolls its content in a loop: logos, tags, short news or offers. Every item stays
readable without the motion, so don't put anything in it that only lives there.

## Usage

```tsx
import { Chip, Marquee } from '@inzumer/ui-library';

<Marquee label="Popular tags" duration={25} buttonId="home-tags-pause">
  <Chip>Bread</Chip>
  <Chip>Cakes</Chip>
  <Chip>Vegan</Chip>
</Marquee>;
```

## Props

- `label` — names the region (required)
- `duration` — seconds per loop; `30` by default
- `direction`: `left` (default) | `right`
- `gap` — space between items, any CSS length; `2rem` by default
- `pauseLabel` / `playLabel` / `buttonId` — the pause button's names, translated by you, and its
  tracking id

## Accessibility

- It pauses on hover and on focus, and the pause button stops it for good (WCAG 2.2.2).
- The looped copy is `aria-hidden` and `inert`, so readers and the keyboard only see each item once.
- With `prefers-reduced-motion` it doesn't move: the content scrolls by hand and the button hides.
