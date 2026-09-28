# Select

A native `<select>` with the same label, hint and error contract (and look) as `Input` — use it to
pick one option from a short, known list (currency, country, sort order).

## Usage

```tsx
import { Select } from '@inzumer/ui-library';

<Select label="Currency" hint="Only changes how amounts are shown." defaultValue="ARS">
  <option value="ARS">ARS — Argentine peso</option>
  <option value="USD">USD — US dollar</option>
</Select>;
```

## Variants

- `state`: `default` | `error` — set automatically to `'error'` whenever `error` is passed
- `inputSize`: `sm` | `md` | `lg`
- `label`, `hint`, `error` are optional; `error` sets `aria-invalid` and replaces the hint
- Accepts every native `<select>` attribute (including `<optgroup>` children) and forwards its ref

## Notes

- Native on purpose: mobile gets the platform picker, and keyboard typeahead and screen reader
  support come for free. Reach for a custom listbox only when options need rich content.
