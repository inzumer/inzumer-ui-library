# Odontogram

An anatomical map of the permanent teeth in FDI notation, colored by the state of each tooth. It
only draws: the consumer computes each tooth's state from its own records and decides what a press
does (usually opening the tooth's detail with `ToothSurfaces`).

## Usage

```tsx
import { Odontogram, ODONTOGRAM_LABELS } from '@inzumer/ui-library/odontogram';

<Odontogram
  id="dental"
  teeth={{ 16: { state: 'treated' }, 26: { state: 'pending' }, 46: { state: 'missing' } }}
  selectedTooth={selected}
  onToothPress={setSelected}
  labels={ODONTOGRAM_LABELS.es}
/>;
```

## Variants

- `teeth`: state per FDI code (`default`, `treated`, `pending`, `inProgress`, `missing`,
  `implant`); a tooth that is not listed shows as `default`
- `onToothPress` / `selectedTooth`: without `onToothPress`, or with `readOnly`, the teeth are images
  with their accessible name instead of buttons
- `highlight`: dims every tooth that is not listed, e.g. for a filter
- `legend`: the list of states under the map, on by default
- `labels`: every text; `ODONTOGRAM_LABELS` ships English (default), Spanish and Italian

## Notes

- Each tooth has a full accessible name, also in read-only mode: "Tooth 16, upper right first molar,
  Treated".
- Color is never the only cue: pending is hatched, in progress dotted, an implant striped and a
  missing tooth dashed and faded. Colors come from the `info`, `danger`, `warning` and `neutral`
  scales of `@inzumer/tokens`, not from the brand, with lighter shades in dark mode.
- Tap and keyboard only, no hover. At phone width a tooth is smaller than a 44 px target, so use
  the map to look and open the tooth's detail to edit.
- With an `id`, each pressable tooth gets `<id>-tooth-<fdi>` as its id and `data-testid`.
- The FDI helpers (`PERMANENT_TEETH`, `getToothInfo`, `getSurfaceName`, `isPermanentTooth`) and
  `describeTooth` are exported for the consumer's own screens.
- The tooth outlines come from [react-odontogram](https://github.com/biomathcode/react-odontogram)
  (MIT); see `THIRD-PARTY-NOTICES.md` in the package.
