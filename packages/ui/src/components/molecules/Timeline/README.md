# Timeline

A vertical timeline of dated/ordered entries — use it for history, changelogs, a step-by-step
process shown after the fact, anything that reads as "this happened, then this happened."

## Usage

```tsx
import { Timeline } from '@inzumer/ui-library';

<Timeline
  items={[
    {
      title: '2023 — Founded',
      description: ['The company was founded with a small team of three.'],
    },
    {
      title: '2024 — Series A',
      description: ['Raised a Series A round.', 'Expanded the team to 20 people.'],
    },
  ]}
/>;
```

## Props

- `items` — `{ title, description, id?, image?, media? }[]`; `title` is a single `ReactNode`,
  `description` is an array of `ReactNode`s rendered as separate lines under the title
- `image` — `{ src, alt }`: a photo under the entry's text (4:3, rounded, lazy loaded), e.g. each
  step of a recipe; `media` — your own element instead (an optimized `<picture>`, a video…)

## Notes

- No hardcoded content — every entry comes from `items`. If you're porting timeline content from
  another project, bring the data, not a copy of the component.
