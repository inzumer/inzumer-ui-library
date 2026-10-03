# Icon

A consistent-sizing, accessible wrapper for icons: the library ones by their kebab-case id
(`name="arrow-forward"`, see Icons) or any SVG component you bring (`icon`). Use it any time an icon
needs to sit at one of the standard sizes and follow the same accessibility rules.

## Usage

```tsx
import { Icon } from '@inzumer/ui-library';
import { CupcakeIcon } from './icons';

<Icon name="search" size="md" label="Search" />;
<Icon icon={CupcakeIcon} />;
```

## Variants

- `name`: a library icon by its kebab-case id (`menu`, `arrow-forward`, `pinterest`…)
- `icon`: instead of `name`, any component shaped like `(props: SVGProps<SVGSVGElement>) => JSX.Element` — a
  `lucide-react` icon, an SVGR-generated component, a hand-written `<svg>` wrapper, etc.
- `size`: `sm` | `md` | `lg`
- `label`: pass it for a _meaningful_ icon (renders `role="img"` + `aria-label`); omit it for a
  purely decorative icon next to visible text (renders `aria-hidden`)

## Notes

- `ICONS` and `ICON_NAMES` list the library icons by id.
