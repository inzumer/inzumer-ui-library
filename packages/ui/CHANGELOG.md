# @inzumer/ui-library

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
