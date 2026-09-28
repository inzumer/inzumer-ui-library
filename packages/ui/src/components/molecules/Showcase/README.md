# Showcase

A vertical card that showcases a **full-bleed photo** with a **dark gradient from the bottom**
that keeps an optional **badge**, the title and a short subtitle readable on any image. Optional
**floating actions** (top-right, e.g. save and share). Made for recipes, articles and guides; put
several in a `Carousel` for a row.

## Usage

```tsx
import { Button, Showcase } from '@inzumer/ui-library';

<Showcase
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
- `badge` — short label ("New", "Featured") right above the title
- `actions` — buttons on the top-right corner that stay clickable above the link
- `aspect` — `portrait` (3:4, default), `square` or `landscape` (4:3)

## Notes

- Text over photos is always light on dark, whatever the theme. Tune it with
  `--showcase-scrim`, `--showcase-scrim-mid`, `--showcase-text`, `--showcase-badge-bg` and
  `--showcase-badge-text`.
- The link wraps the title and stretches over the whole card (not a wrapper), so the actions are
  separate buttons above it and there is no link inside a link. The badge sits outside the link,
  so it doesn't become part of the link's name.
- The photo zooms slightly on hover, except with reduced motion.
- `MediaCard` (and the `./media-card` entry point) is the old name, kept as a deprecated alias until
  the next major version.

## Photos in the stories

Served from the Wikimedia Commons CDN (`upload.wikimedia.org`):

| Photo                                                                                                                  | Author       | License      |
| ---------------------------------------------------------------------------------------------------------------------- | ------------ | ------------ |
| [Lemon drizzle slice](https://commons.wikimedia.org/wiki/File:Lemon_Drizzle_Slice_-_Caf%C3%A9_W_2025-12-26.jpg)        | Andy Li      | CC0          |
| [Carrot cake](https://commons.wikimedia.org/wiki/File:Carrot_cake_-_Milfey_Patisserie_2026-04-04.jpg)                  | Andy Li      | CC0          |
| [Scones and tea](https://commons.wikimedia.org/wiki/File:Scones_and_tea.jpg)                                           | AlphaLemur   | CC BY-SA 4.0 |
| [Slice of quiche](<https://commons.wikimedia.org/wiki/File:Slice_of_Quiche_(Unsplash).jpg>)                            | Timothy Muza | CC0          |
| [Rosemary focaccia](https://commons.wikimedia.org/wiki/File:Focaccia_al_rosmarino_with_dimples.png)                    | Klism        | CC0          |
| [Chopped vegetables](https://commons.wikimedia.org/wiki/File:Freshly_chopped_vegetables_on_a_wooden_cutting_board.jpg) | Shixart1985  | CC BY 2.0    |
