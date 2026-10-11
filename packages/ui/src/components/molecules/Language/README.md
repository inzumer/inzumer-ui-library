# Language

A generic segmented option switch with a sliding indicator — despite the name, it isn't tied to
i18n or any specific language list. Use it for any small, mutually-exclusive set of options
(2–4ish) where every choice should stay visible at once, like a unit toggle or a view switcher —
not just language pickers.

## Usage

```tsx
import { Language } from '@inzumer/ui-library';

const options = [
  { value: 'es', label: 'ES' },
  { value: 'en', label: 'EN' },
];
const [value, setValue] = useState('es');

<Language options={options} value={value} onChange={setValue} />;
```

## Props

- `options` — `{ value, label }[]`
- `value` / `onChange` — controlled, same pattern as `Switch`
- No i18n library wiring included — call your i18n library's language-change function from
  `onChange` yourself
- `options[].id` — stable id (and `data-testid`) for each option, e.g. analytics click triggers

## Accessibility

- Follows the WAI-ARIA **radio group** pattern: `role="radiogroup"` with a `role="radio"` per
  option (`aria-checked`), a single Tab stop on the checked option, and **Arrow keys / Home / End**
  to move the selection.
- The group defaults to the English name "Language selector": pass a localized `aria-label` (or
  `aria-labelledby`) in non-English UIs.

## Notes

- The sliding indicator measures the selected option's DOM position in a `useLayoutEffect`, so it
  never flashes at the wrong spot on mount, and animates smoothly between options on change.
