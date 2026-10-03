# IconLink

A round link that only shows an icon: a social network, a shortcut. The `label` is its accessible
name (and tooltip). The library doesn't ship icons: each project passes its own SVG, which takes half
the button and the current text color.

## Usage

```tsx
import { IconLink } from '@inzumer/ui-library';

<IconLink href="https://www.instagram.com/…" label="Instagram" icon={<InstagramIcon />} external />;
```

## Props

- `href` and `label` — required
- `icon` — the SVG
- `size` — `sm` (36px), `md` (default, 44px) or `lg` (48px)
- `variant` — `ghost` (default), `outline` or `solid`
- `external` — opens in a new tab with `rel="noopener noreferrer"`
