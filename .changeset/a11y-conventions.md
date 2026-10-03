---
'@inzumer/ui-library': minor
---

`IconLink` drops the `sm` size (36px) so it never goes under the 44px touch target; `IconLink` and `Navbar` skip their transitions with reduced motion. `Navbar` and `SocialLinks` keep their styles in `*.styles.ts` like the other components.
