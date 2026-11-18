# Snackbar

A temporary, self-dismissing toast — use it for low-emphasis feedback about something that just
happened ("Saved", "Link copied", "Something went wrong") that doesn't require the user to act on
it. If the user needs to make a decision or read something before moving on, use `Modal` instead.

## Usage

```tsx
import { Snackbar } from '@inzumer/ui-library';

const [open, setOpen] = useState(false);

<Snackbar
  open={open}
  onClose={() => setOpen(false)}
  status="success"
  message="Your changes have been saved."
/>;
```

## Props

- `open` / `onClose` — controlled, same shape as `Modal`. `onClose` fires both when the `duration`
  timer elapses and (if you add your own dismiss button) whenever you call it yourself
- `status`: `info` (default) | `success` | `error` | `warning`
- `duration` — ms before it auto-dismisses; defaults to `4000`, pass `0` to require manual dismissal
- `action` — optional `{ label, onClick, id }` rendered as a button after the message, for a quick
  follow-up like "Undo". Pressing it runs `onClick` and then `onClose`. Give it a longer `duration`
  (around `6000`) so there is time to reach it
- Uses `role="alert" for `status="error"`, `role="status"` otherwise

## Notes

- The action button is at least 44px tall, so it is easy to reach with a finger inside the apps.
  Its `id` also goes to `data-testid`, like every other interactive element.
- Copy comes from the consumer, so each project translates the message and the action label.
- Fixed-positioned at the bottom of the viewport by the component itself — you don't control
  placement via `className` on the message pill alone (that only styles the pill, not its
  position).
