# Checkbox

A controlled boolean choice the user confirms as part of a form or a list, like accepting terms or
ticking off a task. For a setting that applies the moment it flips, use `Switch` instead.

## Usage

```tsx
import { Checkbox } from '@inzumer/ui-library';

const [accepted, setAccepted] = useState(false);

<Checkbox checked={accepted} onCheckedChange={setAccepted} label="I accept the terms" />;
```

## Variants

- `checked` / `onCheckedChange`: controlled only, same API as `Switch`
- `disabled`
- `label`: optional visible label next to the box; without it, pass your own `aria-label`

## Notes

- It is a real `<input type="checkbox">`, so it works with forms, the keyboard and screen readers.
- The label wraps the box, so the whole row is the touch target inside the apps.
- Copy comes from the consumer, so each project translates its own labels.
