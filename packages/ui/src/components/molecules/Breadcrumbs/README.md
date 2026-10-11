# Breadcrumbs

A navigation trail showing where the current page sits in the hierarchy — use it on any page
that's more than one level deep and benefits from a quick way back up.

## Usage

```tsx
import { Breadcrumbs } from '@inzumer/ui-library';

<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
  ]}
  current="UI Library"
/>;
```

## Props

- `items` — ordered list of `{ label, href, id? }`, rendered as links, in order
- `current` — the current page's label, rendered last as plain text (`aria-current="page"`), not a
  link
- `separator` — defaults to `/`; pass any `ReactNode` (a string, an icon) to replace it
- `items[].id` — stable id (and `data-testid`) for each link, e.g. analytics click triggers

## Notes

- `items` links go through the `Link` atom, so external-link detection and router integration
  (`as`) work the same way they do everywhere else — but `Breadcrumbs` itself doesn't expose an
  `as` prop; if every link needs to go through your router's `Link`, that's a small wrapper around
  this component for now.
