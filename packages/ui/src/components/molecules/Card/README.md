# Card

A compound container for grouping related content — use it any time you'd otherwise wrap a block
in a `<div>` with a border/background/shadow by hand (a list item, a summary panel, a settings
section).

## Usage

```tsx
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@inzumer/ui-library';

<Card>
  <CardHeader>
    <CardTitle>Card title</CardTitle>
    <CardDescription>A short description of the card content.</CardDescription>
  </CardHeader>
  <CardContent>This is the main content area of the card.</CardContent>
  <CardFooter>
    <Button size="sm">Action</Button>
  </CardFooter>
</Card>;
```

## Pieces

- `Card` — the outer container. `noPadding` removes the default padding when you want to lay out
  the sub-components (or your own content) manually.
- `CardHeader`, `CardContent`, `CardFooter` — plain layout sections with the right spacing baked in
- `CardTitle` — renders `<h3>` by default; override with `as` (`h1`–`h6`)
- `CardDescription` — secondary text under the title

## Notes

- You don't have to use every sub-component — `<Card>plain content</Card>` on its own is valid,
  the sub-components exist for the common header/body/footer shape.
- `CardTitle`/`CardDescription` are built on `RichText` internally, so they share the same type
  scale as the rest of the library.
