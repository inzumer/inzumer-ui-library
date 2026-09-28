# Drawer

A side panel that slides in from the left or right — use it for navigation menus, filters or
settings that belong to the whole page. For a centered dialog use `Modal`; for a bottom-anchored
one on mobile, `BottomSheet`.

## Usage

```tsx
import { Button, Drawer } from '@inzumer/ui-library';

const [open, setOpen] = useState(false);

<>
  <Button aria-expanded={open} onClick={() => setOpen(true)}>
    Menu
  </Button>
  <Drawer
    open={open}
    onClose={() => setOpen(false)}
    title="Menu"
    closeLabel="Close menu"
    footer={<p>Preferences</p>}
  >
    <nav aria-label="Main">…</nav>
  </Drawer>
</>;
```

## Props

- `open` / `onClose` — controlled
- `side`: `right` (default) | `left`
- `title` — `ReactNode` rendered as the dialog's labelled `<h2>`; `titleClassName` restyles it
- `closeLabel` — accessible name of the built-in close button (omit it to render your own)
- `footer` — pinned to the bottom of the panel
- `closeOnBackdropClick` — defaults to `true`; `Escape` always closes

## Notes

- Modal dialog semantics: focus moves inside and is trapped (`useFocusTrap`), returns to the trigger
  on close, and the page behind doesn't scroll (`useScrollLock`).
- Slides in/out over 200 ms (`useDelayedUnmount`) and closes on `Escape`/outside click
  (`useDismissableLayer`).
