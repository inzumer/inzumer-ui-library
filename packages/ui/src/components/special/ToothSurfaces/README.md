# ToothSurfaces

The five surfaces of one tooth as the classic square diagram, colored by the state of each surface.
It is the detail that goes with `Odontogram`: the map shows whole teeth, this one shows where on the
tooth something was done.

## Usage

```tsx
import { ToothSurfaces } from '@inzumer/ui-library/tooth-surfaces';

<ToothSurfaces
  id="dental"
  fdi="16"
  surfaces={{ O: 'treated', M: 'pending' }}
  selected={selected}
  onSurfacePress={toggleSurface}
/>;
```

## Variants

- `fdi`: the tooth; it decides the names (incisal on incisors and canines, palatal on the upper
  arch) and the layout, seen from the front like the odontogram (mesial toward the midline,
  vestibular toward the lips)
- `surfaces`: state per surface (`O`, `V`, `L`, `M`, `D`), same states as `Odontogram`
- `onSurfacePress` / `selected`: pressable surfaces with `aria-pressed`; without
  `onSurfacePress`, or with `readOnly`, they are images with their accessible name
- `labels`: shared with `Odontogram` (`ODONTOGRAM_LABELS.en`, `.es`, `.it`)

## Notes

- It is 160 px by default (`h-40 w-40`), so every surface stays at or above a 44 px touch target;
  resize it with `className`.
- With an `id`, each pressable surface gets `<id>-surface-<code>` as its id and `data-testid`.
