# MediaCard

A vertical card with a **full-bleed photo** and a **dark gradient from the bottom** that keeps the
title and a short subtitle readable on any image. Optional **badge** (top-left) and **floating
actions** (top-right, e.g. save and share). Made for recipes, articles and guides; put several in a
`Carousel` for a row.

## Usage

```tsx
import { Button, MediaCard } from '@inzumer/ui-library';

<MediaCard
  src="/recipes/lemon-loaf.jpg"
  alt="Lemon loaf on a plate"
  title="Lemon loaf"
  subtitle="45 min · 8 servings"
  href="/recipes/lemon-loaf"
  badge="New"
  actions={
    <Button variant="secondary" size="icon" aria-label="Save">
      <HeartIcon aria-hidden="true" />
    </Button>
  }
/>;
```

## Props

- `src` + `alt`, or `media` — the photo (use `media` for your own optimized `<picture>` / `<img>`)
- `title`, `subtitle` — text over the gradient; `headingLevel` (`h3` by default) for the outline
- `href` / `linkId` — the whole card becomes one link, named by the title
- `badge` — short label ("New", "Featured"); `actions` — buttons that stay clickable above the link
- `aspect` — `portrait` (3:4, default), `square` or `landscape` (4:3)

## Notes

- Text over photos is always light on dark, whatever the theme. Tune it with
  `--media-card-scrim`, `--media-card-scrim-mid`, `--media-card-text`, `--media-card-badge-bg` and
  `--media-card-badge-text`.
- The link wraps the title and stretches over the whole card (not a wrapper), so the actions are
  separate buttons above it and there is no link inside a link.
- The photo zooms slightly on hover, except with reduced motion.
