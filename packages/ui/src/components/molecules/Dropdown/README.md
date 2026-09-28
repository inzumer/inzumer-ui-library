# Dropdown

A select whose option list follows the theme. Use it instead of `Select` when the list has to look
the same on every device (a native `<select>` opens the platform picker, which ignores the theme).

## Usage

```tsx
import { Dropdown } from '@inzumer/ui-library';

<Dropdown
  id="settings-select-currency"
  label="Currency"
  options={[
    { value: 'ARS', label: 'ARS — Argentine peso' },
    { value: 'USD', label: 'USD — US dollar' },
  ]}
  value={currency}
  onChange={setCurrency}
/>;
```

## Props

- `label`, `options` (`{ value, label }[]`), `value` and `onChange(value)` — controlled
- `hint` / `error` — same contract as `Input` and `Select`; `error` wins
- `inputSize` (`sm` | `md` | `lg`), `disabled`
- `id` — the trigger's id (analytics); the list and options derive theirs from it
- `name` — submits the value with a surrounding `<form>` through a hidden input

## Notes

- WAI-ARIA "select-only combobox": focus stays on the trigger and the active option is announced
  with `aria-activedescendant`.
- Keyboard: arrows, Home/End, Enter/Space to open and pick, Escape or Tab to close, and a letter
  jumps to the next option starting with it.
- Short lists only (no search). For long lists or free text, compose an `Input` with suggestions.
