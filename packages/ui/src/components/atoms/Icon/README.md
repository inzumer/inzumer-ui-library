# Icon

A consistent-sizing, accessible wrapper for whatever SVG icon set you bring — this library ships
no icons of its own. Use it any time an icon needs to sit at one of the standard sizes and follow
the same accessibility rules as every other icon in the app.

## Usage

```tsx
import { CheckIcon } from 'your-icon-library';
import { Icon } from '@inzumer/ui-library';

<Icon icon={CheckIcon} size="md" label="Success" />;
```

## Variants

- `icon`: any component shaped like `(props: SVGProps<SVGSVGElement>) => JSX.Element` — a
  `lucide-react` icon, an SVGR-generated component, a hand-written `<svg>` wrapper, etc.
- `size`: `sm` | `md` | `lg`
- `label`: pass it for a _meaningful_ icon (renders `role="img"` + `aria-label`); omit it for a
  purely decorative icon next to visible text (renders `aria-hidden`)

## Notes

- `Icon` doesn't fetch, bundle, or register icons — it only standardizes sizing/accessibility
  around whichever icon component you pass in via the `icon` prop.
