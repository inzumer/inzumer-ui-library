# Table

A data table that scrolls horizontally inside its own bordered container on small screens instead
of widening the page. Composed from parts so the markup stays real, accessible table markup.

## Usage

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@inzumer/ui-library';

<Table caption="Cost per ingredient" captionHidden>
  <TableHead>
    <TableRow>
      <TableHeaderCell>Ingredient</TableHeaderCell>
      <TableHeaderCell align="end">Cost</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableHeaderCell scope="row">Tenderloin</TableHeaderCell>
      <TableCell align="end">$ 25,714.29</TableCell>
    </TableRow>
  </TableBody>
</Table>;
```

## Parts and props

- `Table` — `caption` (names the table), `captionHidden` (screen readers only),
  `containerClassName` for the scroll container; other props go to `<table>`
- `TableHead`, `TableBody`, `TableRow` — styled `<thead>`, `<tbody>`, `<tr>`
- `TableHeaderCell` — `<th>` with `scope="col"` by default (`scope="row"` for row headers)
- `TableCell` — `<td>`
- `align` on cells: `start` (default) | `end` (numbers) | `center`

## Notes

- Always give a table a caption (visible or hidden): it's how screen reader users find and
  identify it.
- Numbers use tabular figures, so right-aligned amounts line up.
