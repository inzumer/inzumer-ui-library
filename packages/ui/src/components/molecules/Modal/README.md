# Modal

A centered dialog overlay — use it for anything that needs the user's full attention before they
can go back to the page (confirmations, focused forms, detail views triggered from a list). For a
mobile-friendly, bottom-anchored alternative, use `BottomSheet` — same content shape, different
placement/animation.

## Usage

```tsx
import { Button, Modal } from '@inzumer/ui-library';

const [open, setOpen] = useState(false);

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm action"
  footer={
    <>
      <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button size="sm" onClick={handleConfirm}>
        Confirm
      </Button>
    </>
  }
>
  <p>Are you sure you want to continue? This action cannot be undone.</p>
</Modal>;
```

## Props

- `open` / `onClose` — controlled; you own the boolean and decide how it's triggered
- `title`, `footer` — optional `ReactNode`s
- `closeOnBackdropClick` — defaults to `true`; set `false` for a dialog the user must dismiss
  explicitly (via a button, not by clicking outside)
- Always closes on `Escape`, regardless of `closeOnBackdropClick`

## Notes

- Fades + scales in/out instead of snapping — it stays mounted for the exit transition
  (`useDelayedUnmount`) before actually unmounting, and closes on `Escape`/outside click via
  `useDismissableLayer`. See [Hooks](/docs/documentation-hooks--docs) if you're building something
  similar and want the same behavior.
- Accessible by default: focus moves into the panel and stays there while it's open
  (`useFocusTrap`), returns to whatever opened it on close, and the page behind doesn't scroll
  (`useScrollLock`). The title gets a unique id, so several can be on the same page.
