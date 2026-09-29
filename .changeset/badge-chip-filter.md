---
'@inzumer/ui-library': minor
---

New `Badge` (a rounded label with optional icon, `size`, `radius`, optional `uppercase`, a `tone` and custom `colors`), `Chip` (a clickable badge that toggles with `pressed`) and `Filter` (a single-choice row of chips that scrolls sideways, fading at the edges with arrow buttons). Tones are the Snackbar's statuses (`info`, `success`, `error`, `warning`) plus `neutral`, soft for pills (light background, strong text; `PILL_TONES`) and solid for the Snackbar (`STATUS_TONES`); `colors` (any CSS color, ideally tokens) win over them. Icons come from each project's own family. `Snackbar` takes its colors from the shared tones (same look), `Showcase` draws its badge with `Badge`, and `Carousel` shares the new `useHorizontalScroll` hook with `Filter`. Entry points `./badge`, `./chip` and `./filter`.

`useMediaQuery` returns `false` where `matchMedia` doesn't exist (server, some test DOMs) instead of throwing.
