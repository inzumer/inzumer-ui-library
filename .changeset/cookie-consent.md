---
'@inzumer/ui-library': major
---

New `CookieConsent` organism: cookie consent in a single component with three modes — `banner` (bar at the bottom with accept, reject and customize, which opens the preferences), `modal` (only the preferences dialog, opened from outside) and `inline` (the categories with switches inside a page, saved on every change). Controlled with one `value` (`Record<string, boolean>` or `null` while unanswered) and one `onChange`; `getId` gives stable ids for analytics.

BREAKING CHANGE: `CookieBanner` and `CookiePreferences` (and their `./cookie-banner` / `./cookie-preferences` entry points) are removed. Use `CookieConsent` with `mode="banner"` or `mode="modal"` (`./cookie-consent` entry point); `CookieCategory` is still exported.
