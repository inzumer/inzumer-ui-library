# Navbar

Top navigation of a site: the brand on the start side, the links aligned to a side or centered, and
actions (language, account, theme) on the end side. The current page is marked with
`aria-current="page"`. On narrow screens the links scroll sideways instead of wrapping.

## Usage

```tsx
import { Navbar } from '@inzumer/ui-library';

<Navbar
  brand={<a href="/">Milimon</a>}
  align="end"
  links={[
    { href: '/es/learn', label: 'Aprender', current: true },
    { href: '/es/recipes', label: 'Recetas' },
    { href: '/es/blog', label: 'Blog' },
  ]}
  actions={<LanguageSwitcher />}
/>;
```

## Props

- `brand` — logo or name, on the start side
- `links` — `href`, `label` and `current`
- `align` — `start` (next to the brand), `center` or `end` (default)
- `actions` — nodes on the end side
- `label` — name of the navigation ("Main" by default)
