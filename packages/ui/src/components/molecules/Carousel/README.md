# Carousel

A horizontal row of cards (usually `Showcase`) with **scroll snap** and, under the cards,
**previous/next buttons** and **indicators** that show the current card and jump to any of them. Both are optional and can sit on the left, center or right.
Scrolling is native, so touch swipe and trackpad drag work as usual; tabbing to a card scrolls it
into view. No autoplay.

## Usage

```tsx
import { Carousel, Showcase } from '@inzumer/ui-library';

<Carousel
  label="Featured recipes"
  previousLabel="Previous recipes"
  nextLabel="Next recipes"
  indicatorsLabel="Choose a recipe"
  goToLabel={(index, total) => `Recipe ${index + 1} of ${total}`}
  header={<h2>Featured recipes</h2>}
>
  {recipes.map((recipe) => (
    <Showcase key={recipe.id} src={recipe.photo} alt="" title={recipe.title} href={recipe.url} />
  ))}
</Carousel>;
```

## Props

- `label` — accessible name of the carousel
- `previousLabel`, `nextLabel` — accessible names of the buttons
- `indicators` — show the indicators (default `true`; hidden with a single slide)
- `indicatorsPosition`, `buttonsPosition` — `start`, `center` (default) or `end`; when both share a side they go together (previous · indicators · next), otherwise each sits on its side of the same row
- `buttons` — show the previous/next buttons (default `true`); without them people scroll or use the indicators
- `indicatorsLabel`, `goToLabel(index, total)` — names of the indicators group and of each
  indicator (`"Go to slide 3"` by default: translate it)
- `slideLabel(index, total)` — name of each slide, `"1 / 5"` by default
- `header` — optional heading or "See all" link above the cards
- `slideClassName` — slide widths; defaults to 80% on mobile, 45% on tablets and 31% on desktop
- `buttonIds` — stable ids for `previous` and `next` (analytics click triggers)

## Notes

- The buttons are round, in the primary color, with the components' shadow; the dots use the primary color too (the current one full, the rest faded).

- Follows the WAI-ARIA carousel pattern: `aria-roledescription="carousel"` on the region and
  `"slide"` on each item; the current indicator has `aria-current`.
- Colors come from the theme tokens: the current indicator uses `--btn-primary-bg`, the rest
  `--border-strong`; focus rings use `--border-focus`.
- The buttons scroll one page (90% of the visible width) and are disabled at the edges; each
  indicator has a 24px hit area.
- With `prefers-reduced-motion`, pages jump instead of scrolling smoothly and the indicators don't
  animate.
