# Accordion

A collapsible section built on native `<details>`/`<summary>` — use it for long lists that group
into sections (menu groups, FAQs, "show more" details). Stack several for a classic accordion.

## Usage

```tsx
import { Accordion } from '@inzumer/ui-library';

<Accordion summary="Formulas" open={isCurrentSection}>
  <ul>…</ul>
</Accordion>;
```

## Props

- `summary` — the always-visible header (`ReactNode`)
- `open` — native attribute: start expanded
- `summaryClassName` / `contentClassName` — restyle the header row or the content wrapper
- Accepts every native `<details>` attribute (`onToggle`, `name` for exclusive groups…) and
  forwards its ref

## Notes

- Native on purpose: keyboard (`Enter`/`Space`), screen readers and find-in-page work without any
  JavaScript, so it also works in static, non-hydrated markup.
- Give several accordions the same `name` to make them exclusive (only one open at a time) in
  browsers that support it.
