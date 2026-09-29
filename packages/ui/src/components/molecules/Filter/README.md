# Filter

A single-choice filter: a row of `Chip`s above a list or grid to narrow it down by category, type
or status. When the chips don't fit, the row scrolls sideways and the hidden side fades out with an
arrow button, like the `Carousel`.

## Usage

```tsx
import { Filter } from '@inzumer/ui-library';

<Filter
  label="Filter by category"
  previousLabel="Previous categories"
  nextLabel="Next categories"
  value={category}
  onChange={setCategory}
  options={[
    { value: 'all', label: 'All' },
    {
      value: 'sweet',
      label: 'Sweet',
      icon: <CupcakeIcon />,
      colors: { background: 'var(--category-sweet-bg)', text: 'var(--category-sweet-text)' },
    },
  ]}
/>;
```

## Props

- `label` — accessible name of the group (`role="group"`)
- `options` — `{ value, label, icon?, id?, tone?, colors? }` in order; `icon` comes from the
  project's own icon family, `tone` picks a preset and `colors` takes CSS colors (ideally tokens),
  as in `Chip`
- `value` / `onChange` — the selected option (controlled)
- `previousLabel` / `nextLabel` — names of the arrow buttons; `buttonIds` gives them stable ids
- `radius` — the chips' corner radius (`full` by default)

## Notes

- The fade uses `--filter-fade` (the page background, `--surface-primary`, by default): set it when
  the filter sits on another surface.
- Scrolling, edges and paging come from the `useHorizontalScroll` hook, shared with `Carousel`, so
  both respect reduced motion the same way.
