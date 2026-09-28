# CookieBanner

The cookie consent bar pinned to the bottom of the page — accept, reject and (optionally)
customize. Presentational: you decide when to show it and where to store the answer.

## Usage

```tsx
import { CookieBanner, CookiePreferences } from '@inzumer/ui-library';

{
  consent === null && (
    <CookieBanner
      title="Cookies"
      description={
        <>
          We use analytics to improve the site. <a href="/privacy">Privacy policy</a>
        </>
      }
      acceptLabel="Accept"
      rejectLabel="Reject"
      customizeLabel="Customize"
      onAccept={() => save({ analytics: true })}
      onReject={() => save({ analytics: false })}
      onCustomize={() => setPreferencesOpen(true)}
    />
  );
}
```

## Props

- `title`, `description` — `ReactNode`s; end the description with a link to the privacy policy
- `acceptLabel` / `onAccept`, `rejectLabel` / `onReject` — both required, same visual weight
- `customizeLabel` / `onCustomize` — optional third button (pair it with `CookiePreferences`)
- `buttonIds` — stable ids for `accept`, `reject` and `customize` (analytics click triggers)

## Notes

- Rejecting must be as easy as accepting (GDPR / ePrivacy): that's why both buttons share size
  and prominence and there is no pre-selected choice.
- It's a labelled `region`, not a modal dialog: the page stays usable while it's shown.
- Load analytics (or any non-essential script) only after the person accepts.
