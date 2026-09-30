# Loader

Loading indicator: a **spinning** or **pulsing** mark with an accessible label (`role="status"`).
The mark is a ring by default; pass the brand's logo (an image or an SVG) in `mark` to make it
yours.

## Usage

```tsx
import { Loader } from '@inzumer/ui-library';

<Loader label="Loading your account" />;

<Loader
  screen
  label="Signing in"
  effect="pulse"
  size="xl"
  mark={<img src={logo} alt="" />}
  messages={texts}
/>;

<Loader
  label="Loading the calculator"
  showLabel
  layout="stacked"
  effect="pulse"
  size="xl"
  mark={<img src={logo} alt="" />}
/>;
```

## Props

- `label` — what is loading; always read by screen readers, visible with `showLabel`
- `mark` — your own mark (image or SVG, it fills the box); a ring in the primary color by default
- `effect` — `spin` (default) or `pulse`; `speed` — `normal`, `slow` or `fast`
- `size` — `sm` (20px), `md` (40px, default), `lg` (64px), `xl` (96px)
- `layout` — `inline` (mark and label side by side, default) or `stacked` (label under the mark)
- `messages` — visible texts under the mark: one at random (`pickRandom`), changing every
  `messageInterval` ms (3500 by default) without repeating the last one; each project passes its own
- `screen` — full screen: the mark and the text (light, over the dark backdrop) in the middle, blocking clicks, scroll
  and keyboard (busy modal dialog, focus trapped and restored). Render it while waiting for an
  answer the person asked for, and remove it when it arrives

## Notes

- With `prefers-reduced-motion` the mark doesn't spin: it pulses slowly instead.
- For a button that waits, use `Button`'s `loading` prop: disabled, `aria-busy` and pulsing.
