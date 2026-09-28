# Field

The shared layout of the form controls: **label**, the control, and the **error** (or the
**hint**) under it. `Input`, `Textarea`, `Select` and `Dropdown` are built on it; use it to give
your own control the same look and accessibility.

## Usage

```tsx
import { Field, fieldAria } from '@inzumer/ui-library';

<Field id="slug" label="Address" hint="Lowercase, with dashes" error={error}>
  <MyControl id="slug" {...fieldAria('slug', { hint: 'Lowercase, with dashes', error })} />
</Field>;
```

## Props

- `id` — the control's id; the hint and the error get `<id>-hint` and `<id>-error`
- `label`, `hint`, `error` — the error replaces the hint and is announced (`role="alert"`)
- `labelId` — render the label as a `<span>` with this id, for controls named with
  `aria-labelledby` (a combobox button, for example)
- `fieldAria(id, { hint, error })` — the `aria-describedby` / `aria-invalid` for the control
