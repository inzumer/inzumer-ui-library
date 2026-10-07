# Banner

A highlighted block with a title, an optional description, calls to action and optional side media.
Use it to announce something or open a section; for a short status message use `Snackbar`.

## Usage

```tsx
import { Banner, Button } from '@inzumer/ui-library';

<Banner
  appearance="aurora"
  title="Bake something new this week"
  description="Seasonal recipes, step by step."
  actions={<Button id="home-banner-recipes">Browse recipes</Button>}
/>;
```

## Props

- `appearance`:
  - `subtle` (default) and `inverse` use the surface tokens, so they follow light and dark.
  - `gradient` and `aurora` paint the brand scales with white text, the same in both themes.
  - `image` shows the `image` URL behind a veil (see below).
- `align`: `start` | `center` | `end`; over a photo it follows `overlayPosition` unless you set it
- `title`, `description`, `actions`, `media` — `actions` takes your own buttons or links, each with
  its tracking `id`
- `titleVariant` — the `RichText` variant of the title; `h2` by default

## Image veils

With `appearance="image"` a gradient veil keeps the text readable:

- `overlayColor`: `black` (default), `white` (the text turns dark) or a token scale: `primary`,
  `info`, `success`, `warning`, `danger`, `neutral` (its darkest step).
- `overlayPosition`: where the veil is solid and the text sits.
  - `left` (default) / `right`: from that side.
  - `top` / `bottom`: from that edge, with the content pushed there.
  - `center`: a radial veil around centered text.
  - `full`: an even veil over the whole photo.

```tsx
<Banner
  appearance="image"
  image="https://…/photo.jpg"
  overlayColor="primary"
  overlayPosition="bottom"
  title="Autumn recipes"
/>
```

## Notes

- It renders a `<section>` named by its title, so it shows up as a landmark.
- The background photo is decorative. Put meaningful images in `media`, with their `alt`.
