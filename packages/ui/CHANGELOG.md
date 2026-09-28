# @inzumer/ui-library

## 2.2.0

### Minor Changes

- 7913f71: `Carousel`: new `buttons`, `buttonsPosition` and `indicatorsPosition` props (`start`, `center` or `end`). When buttons and indicators share a side they go together; otherwise each sits on its side of the same row. The buttons are now round, in the primary color, with the components' shadow and chevron icons, and the indicator dots use the primary color (the current one full, the rest faded).
- d54578f: New `Loader`: a spinning or pulsing mark (a ring by default, or your brand's logo in `mark`) with an accessible label, sizes, speeds and inline or stacked layout; with reduced motion it pulses slowly instead of spinning. `Button` gets a `loading` prop: disabled, `aria-busy` and pulsing while it waits. Entry point `./loader`.
- a14c96c: New building blocks, used by the existing components (no visual change): `Field` and `fieldAria` (label, hint and error of `Input`, `Textarea`, `Select` and `Dropdown`), `Chevron` (the arrow of `Select`, `Dropdown`, `Accordion` and `Carousel`) and the `useDialogLayer` hook (exit animation, Escape and backdrop, focus trap and scroll lock of `Modal`, `Drawer` and `BottomSheet`). Entry points `./field`, `./chevron` and `./use-dialog-layer`.

## 2.1.0

### Minor Changes

- e086781: `MediaCard` is renamed to `Showcase` (entry point `./showcase`), and its badge moves from the top-left corner to right above the title, in the text over the gradient. The CSS variables are now `--showcase-scrim`, `--showcase-scrim-mid`, `--showcase-text`, `--showcase-badge-bg` and `--showcase-badge-text`. `MediaCard`, `MediaCardProps` and `./media-card` stay as deprecated aliases until the next major version. The Storybook stories (and the Carousel's) use real photos from the Wikimedia Commons CDN.

### Patch Changes

- 6a5b58d: Package metadata points to the renamed `inzumer-ui-library` repository, and `@inzumer/tokens` is now a regular npm dependency (`^1.1.0`) released from its own `inzumer-tokens` repository. No change to the components.

## 2.0.1

### Patch Changes

- 690b9a6: Tooling only: tests run on Vitest 5 and jsdom 30, and the repo builds with Vite 6. No change to the published components.

## 2.0.0

### Major Changes

- 5e104ab: New `CookieConsent` organism: cookie consent in a single component with three modes — `banner` (bar at the bottom with accept, reject and customize, which opens the preferences), `modal` (only the preferences dialog, opened from outside) and `inline` (the categories with switches inside a page, saved on every change). Controlled with one `value` (`Record<string, boolean>` or `null` while unanswered) and one `onChange`; `getId` gives stable ids for analytics.

  BREAKING CHANGE: `CookieBanner` and `CookiePreferences` (and their `./cookie-banner` / `./cookie-preferences` entry points) are removed. Use `CookieConsent` with `mode="banner"` or `mode="modal"` (`./cookie-consent` entry point); `CookieCategory` is still exported.

### Minor Changes

- d5b9ee5: New `Carousel` (horizontal row with scroll snap and, under the cards, previous/next buttons around indicators that mark the current card and jump to any of them; theme tokens, no autoplay, reduced motion aware, WAI-ARIA carousel pattern) and `MediaCard` (full-bleed photo with a dark gradient for the title and subtitle, optional badge and floating actions, the whole card as a link). Entry points `./carousel` and `./media-card`.
- 914f1b2: `Modal` sizes are aligned: 90% of the viewport width up to 768px, as tall as the content up to 80% of the viewport height (new `maxHeight="tall"` allows 90%). Title and footer stay in place and the content scrolls inside; the footer wraps its buttons on narrow screens. `CookieConsent`'s preferences follow the same size.
- 4a9ff65: `Timeline` entries accept an optional photo (`image: { src, alt }`, lazy loaded, 4:3 and rounded, under the entry's text) or any `media` element, e.g. for the steps of a recipe.

## 1.5.0

### Minor Changes

- 0ce2dbc: Add `Dropdown`: a themed select (WAI-ARIA select-only combobox) whose option list follows the tokens on every device, with keyboard support, hint/error and form submission through a hidden input.

## 1.4.0

### Minor Changes

- 1ef1e81: Add `CookieBanner` (accept / reject / customize consent bar) and `CookiePreferences` (per-category
  choices in a `Modal`, with always-on required categories).

## 1.3.0

### Minor Changes

- 696efcb: Add the `Accordion` component (native `<details>`/`<summary>`) and the `Table` component family
  (`Table`, `TableHead`, `TableBody`, `TableRow`, `TableHeaderCell`, `TableCell`) with a horizontal
  scroll container for small screens.

## 1.2.0

### Minor Changes

- f79f613: Add `Select`, `Textarea` and `Drawer` components and the `useFocusTrap` and `useScrollLock` hooks.
  `Modal` and `BottomSheet` now trap focus while open (returning it to the trigger on close), lock the
  page scroll behind them and use a unique id for their title, so several can coexist on a page.

## 1.1.0

### Minor Changes

- da4060e: **Button**: implement `asChild` (it was typed but ignored). The single child element is rendered
  instead of a `<button>`, receiving the button classes, props and ref; click handlers from both run
  and `className`/`style` are merged. `buttonStyles` is now exported to style other elements.

  **Language**: follow the WAI-ARIA radio group pattern for accessibility. The group is now
  `role="radiogroup"` with `role="radio"` options (`aria-checked` instead of `aria-selected`), a single
  Tab stop, and Arrow keys / Home / End to move the selection. Tests or selectors that queried
  `listbox` / `option` must switch to `radiogroup` / `radio`. Pass a localized `aria-label` in
  non-English UIs.

## 1.0.2

### Patch Changes

- Updated dependencies [74d41a1]
  - @inzumer/tokens@1.1.0

## 1.0.1

### Patch Changes

- 774a94e: Fix `Timeline`'s connecting line being visibly offset from the node dots. The line is a `border-l` on the list, and the dots now center on it via `-translate-x-1/2` instead of a fixed offset that didn't account for the dot's own width.

## 1.0.0

### Major Changes

- First stable release of the rebuilt design system: atomic-design component
  library (14 components across atoms/molecules), public hooks and utils,
  the tokens package (base/semantic tokens, themes, Tailwind preset), and
  Storybook documentation. Replaces the old single-package scaffold
  previously published under these names — the package surface, build
  output, and exports are not compatible with the 0.1.x releases.

### Patch Changes

- Updated dependencies
  - @inzumer/tokens@1.0.0
