# Icons

One family of SVG icons in the Google **Material Symbols** style (outlined, weight 400): the interface
ones come from Material Symbols (Apache 2.0) and the networks are drawn in the same style, since
Material Symbols has no brand logos. They take the current text color, so you color them with CSS,
and are hidden from assistive tech: name the control that holds them.

Cite them by their **kebab-case id** with `Icon`, or import the component:

| Interface | `arrow-forward`, `bookmark`, `chevron-left`, `chevron-right`, `close`, `expand-more`, `favorite`, `language`, `mail`, `menu`, `pause`, `person`, `play-arrow`, `search`, `share` |
| Networks | `facebook`, `instagram`, `linkedin`, `pinterest`, `tiktok`, `whatsapp`, `x`, `youtube` |

## Usage

```tsx
import { Icon, IconLink, InstagramIcon } from '@inzumer/ui-library';

<Icon name="arrow-forward" size="lg" />;

<IconLink href="https://www.instagram.com/…" label="Instagram" icon={<InstagramIcon />} external />;
```

Chevrons are icons too: `chevron-left` / `chevron-right` for sideways, `expand-more` for down (rotate it
180° for up, as `Accordion` and `Dropdown` do).

In Storybook they live in their own **Icons** section, at the end: **Gallery** shows them all with
their ids and **Playground** tries one at a time.

`ICONS` maps every id to its component and `ICON_NAMES` lists them. Any SVG prop works
(`width`, `height`, `className`, `style`).
