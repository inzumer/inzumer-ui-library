# SocialLinks

A row of icon buttons (`IconLink`) to the brand's social networks, for footers. Each one opens in a
new tab and is named by the network. The library doesn't ship network icons: each project passes its
own SVGs.

## Usage

```tsx
import { SocialLinks } from '@inzumer/ui-library';

<SocialLinks
  align="center"
  links={[
    { href: 'https://www.pinterest.com/…', label: 'Pinterest', icon: <PinterestIcon /> },
    { href: 'https://www.instagram.com/…', label: 'Instagram', icon: <InstagramIcon /> },
    { href: 'https://www.linkedin.com/…', label: 'LinkedIn', icon: <LinkedInIcon /> },
  ]}
/>;
```

## Props

- `links` — `href`, `label` (network name) and `icon`
- `align` — `start` (default), `center` or `end`
- `size` and `variant` — as in `IconLink`
- `label` — name of the list for screen readers ("Social networks" by default)
