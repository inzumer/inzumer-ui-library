# Carousel

A horizontal row of cards (usually `MediaCard`) with **scroll snap** and **previous/next buttons**;
tabbing to a card scrolls it into view. Scrolling is native, so touch swipe and trackpad drag work as usual. No autoplay.

## Usage

```tsx
import { Carousel, MediaCard } from '@inzumer/ui-library';

<Carousel
  label="Featured recipes"
  previousLabel="Previous recipes"
  nextLabel="Next recipes"
  header={<h2>Featured recipes</h2>}
>
  {recipes.map((recipe) => (
    <MediaCard key={recipe.id} src={recipe.photo} alt="" title={recipe.title} href={recipe.url} />
  ))}
</Carousel>;
```

## Props

- `label` — accessible name of the carousel
- `previousLabel`, `nextLabel` — accessible names of the buttons
- `slideLabel(index, total)` — name of each slide, `"1 / 5"` by default
- `header` — optional heading or "See all" link, shown next to the buttons
- `slideClassName` — slide widths; defaults to 80% on mobile, 45% on tablets and 31% on desktop
- `buttonIds` — stable ids for `previous` and `next` (analytics click triggers)

## Notes

- Follows the WAI-ARIA carousel pattern: `aria-roledescription="carousel"` on the region and
  `"slide"` on each item.
- The buttons scroll one page (90% of the visible width) and are disabled at the edges.
- With `prefers-reduced-motion`, pages jump instead of scrolling smoothly.
