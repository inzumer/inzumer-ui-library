---
'@inzumer/ui-library': minor
---

`MediaCard` is renamed to `Showcase` (entry point `./showcase`), and its badge moves from the top-left corner to right above the title, in the text over the gradient. The CSS variables are now `--showcase-scrim`, `--showcase-scrim-mid`, `--showcase-text`, `--showcase-badge-bg` and `--showcase-badge-text`. `MediaCard`, `MediaCardProps` and `./media-card` stay as deprecated aliases until the next major version. The Storybook stories (and the Carousel's) use real photos from the Wikimedia Commons CDN.
