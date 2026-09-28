# CookieConsent

Cookie consent in one component, with three modes: the **banner** at the bottom of the page, the
**preferences dialog** and the **inline** settings for a privacy or settings page. Controlled: you
store the answer and load non-essential scripts only after the person allows them.

## Usage

```tsx
import { CookieConsent, type CookieChoices } from '@inzumer/ui-library';

const categories = [
  { id: 'necessary', title: 'Necessary', description: 'Settings on this device.', required: true },
  { id: 'analytics', title: 'Analytics', description: 'Google Analytics, only with your consent.' },
];

// Every page: banner until there is an answer; "Customize" opens the preferences.
// `open` / `onOpenChange` also let a footer link reopen them later.
<CookieConsent
  mode="banner"
  categories={categories}
  value={consent} // CookieChoices | null
  onChange={saveConsent}
  open={preferencesOpen}
  onOpenChange={setPreferencesOpen}
  labels={labels}
/>;

// Privacy page: the same categories with switches, saved on every change.
<CookieConsent
  mode="inline"
  categories={categories}
  value={consent}
  onChange={saveConsent}
  labels={labels}
/>;
```

## Modes

| Mode     | Shows                                                                         | `onChange` gets                            |
| -------- | ----------------------------------------------------------------------------- | ------------------------------------------ |
| `banner` | The bar while `value === null`, plus the dialog when customizing or `open`    | All on (accept), all off (reject) or saved |
| `modal`  | Only the dialog, controlled with `open` / `onOpenChange`                      | The saved preferences                      |
| `inline` | The category list with switches (no buttons, no heading: the page gives them) | The answer after each switch               |

## Props

- `categories` — `{ id, title, description, required? }`; required ones show `labels.required`
  instead of a switch and never appear in the answer
- `value` — `Record<string, boolean>` of the optional categories, or `null` while unanswered
- `labels` — `title`, `description` (banner), `accept`, `reject`, `customize`,
  `preferencesTitle`, `preferencesDescription?`, `save`, `cancel`, `required`
- `getId(kind, name)` — stable ids for buttons (`accept`, `reject`, `customize`, `save`,
  `cancel`) and switches (category id), e.g. analytics click triggers

## Notes

- Rejecting is as easy as accepting (GDPR / ePrivacy): same size and prominence, nothing
  pre-selected; customizing starts with every optional category off.
- The banner is a labelled `region`, not a modal: the page stays usable while it's shown.
- The dialog is the library `Modal` (focus trapped, Escape closes). It starts from the saved
  answer every time it opens; cancelling discards the changes.
- Replaces `CookieBanner` and `CookiePreferences` (removed in 2.0.0).
