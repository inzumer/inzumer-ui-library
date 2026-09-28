# BottomSheet

A dialog panel pinned to the bottom of the viewport, with a drag-handle affordance — the
mobile-friendly counterpart to `Modal`. Same content shape and controlled `open`/`onClose` API;
reach for this one when the trigger is likely to be used on small screens, or when a bottom sheet
just reads more natural for the content (a filter panel, an action list) than a centered dialog.

## Usage

```tsx
import { BottomSheet, Button } from '@inzumer/ui-library';

const [open, setOpen] = useState(false);

<BottomSheet
  open={open}
  onClose={() => setOpen(false)}
  title="Filter results"
  footer={
    <Button size="sm" onClick={() => setOpen(false)}>
      Apply
    </Button>
  }
>
  <p>Pick the options that match what you are looking for.</p>
</BottomSheet>;
```

## Props

Identical shape to `Modal`: `open`, `onClose`, `title`, `footer`, `children`,
`closeOnBackdropClick` (defaults to `true`). See `Modal`'s README for the full prop rundown — the
only difference is the panel slides up from the bottom instead of fading + scaling from the
center.

## Notes

- Shares `useDelayedUnmount`/`useDismissableLayer` with `Modal` for the same enter/exit-animation
  and dismissal behavior — see [Hooks](/docs/documentation-hooks--docs).
- Accessible by default: focus moves into the panel and stays there while it's open
  (`useFocusTrap`), returns to whatever opened it on close, and the page behind doesn't scroll
  (`useScrollLock`). The title gets a unique id, so several can be on the same page.
