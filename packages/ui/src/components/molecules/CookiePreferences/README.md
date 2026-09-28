# CookiePreferences

Per-category cookie choices in a `Modal` — the "Customize" step of `CookieBanner`, and what a
"Cookie preferences" link in the footer should reopen.

## Usage

```tsx
import { CookiePreferences } from '@inzumer/ui-library';

<CookiePreferences
  open={open}
  onClose={() => setOpen(false)}
  title="Cookie preferences"
  categories={[
    {
      id: 'necessary',
      title: 'Necessary',
      description: 'Settings saved on this device.',
      required: true,
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'Google Analytics, only with your consent.',
    },
  ]}
  value={draft}
  onChange={(id, enabled) => setDraft({ ...draft, [id]: enabled })}
  onSave={() => save(draft)}
  saveLabel="Save"
  cancelLabel="Cancel"
  requiredLabel="Always on"
/>;
```

## Props

- `categories` — `{ id, title, description, required? }`; required ones show `requiredLabel`
  instead of a switch
- `value` / `onChange` — controlled state of the optional categories
- `onSave`, `onClose` — save the choices / dismiss without saving
- `idPrefix` — stable ids: `<prefix>-<category id>` for switches, `<prefix>-save` and
  `<prefix>-cancel` for the buttons

## Notes

- Built on `Modal`: focus is trapped while open and returns to the trigger on close.
- Optional categories start off unless the person already chose them.
