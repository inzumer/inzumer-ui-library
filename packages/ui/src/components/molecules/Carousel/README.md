# Carousel

A horizontal row of cards (usually `MediaCard`) with **scroll snap** and, under the cards,
**previous/next buttons** around **indicators** that show the current card and jump to any of them.
Scrolling is native, so touch swipe and trackpad drag work as usual; tabbing to a card scrolls it
into view. No autoplay.

## Usage

```tsx
import { Carousel, MediaCard } from '@inzumer/ui-library';

<Carousel
  label="Featured recipes"
  previousLabel="Previous recipes"
  nextLabel="Next recipes"
  indicatorsLabel="Choose a recipe"
  goToLabel={(index, total) => `Recipe ${index + 1} of ${total}`}
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
- `indicators` — show the indicators (default `true`; hidden with a single slide)
- `indicatorsLabel`, `goToLabel(index, total)` — names of the indicators group and of each
  indicator (`"Go to slide 3"` by default: translate it)
- `slideLabel(index, total)` — name of each slide, `"1 / 5"` by default
- `header` — optional heading or "See all" link above the cards
- `slideClassName` — slide widths; defaults to 80% on mobile, 45% on tablets and 31% on desktop
- `buttonIds` — stable ids for `previous` and `next` (analytics click triggers)

## Notes

- Follows the WAI-ARIA carousel pattern: `aria-roledescription="carousel"` on the region and
  `"slide"` on each item; the current indicator has `aria-current`.
- Colors come from the theme tokens: the current indicator uses `--btn-primary-bg`, the rest
  `--border-strong`; focus rings use `--border-focus`.
- The buttons scroll one page (90% of the visible width) and are disabled at the edges; each
  indicator has a 24px hit area.
- With `prefers-reduced-motion`, pages jump instead of scrolling smoothly and the indicators don't
  animate.
