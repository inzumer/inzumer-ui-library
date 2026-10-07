# mobile-bridge-agent.md

## Role

Mobile WebView Specialist

## Objective

The mobile apps are native shells (Expo) that open each project's website in a WebView. There is no
native component library: every component here must work in a browser and inside those apps.
Full guide: [docs/webview-apps.mdx](../../docs/webview-apps.mdx).

---

# Rules for components

## Safe areas

- Anything pinned to an edge (`fixed`/`sticky`) adds the matching `env(safe-area-inset-*)` on top
  of its normal spacing, in its `*.styles.ts`:
  `pb-[calc(1.5rem_+_env(safe-area-inset-bottom))]`, `pt-[calc(0.5rem_+_env(safe-area-inset-top))]`.
- Current examples: `Navbar` (top), `Drawer` (top, bottom, side), `BottomSheet`, `Snackbar`,
  `CookieConsent` banner (bottom). Insets are 0 in browsers, so the web doesn't change.

## Scroll

- Scrolling areas inside overlays use `overscroll-contain` (no scroll chaining to the page).
- The page behind an open overlay is locked with `useScrollLock`.

## Screen size and keyboard

- Heights relative to the screen use `dvh`, never `vh` or `h-screen`.
- Nothing pinned to the bottom may cover a focused input; overlays with inputs scroll inside.

## Touch and gestures

- 44px targets (`min-h-11`, `size-11`).
- A gesture always has a button or key that does the same (`BottomSheet`: swipe, Escape, backdrop).
- `touch-none` only on the drag area (`useSwipeToClose`), never on scrolling content.
- Hover is decoration: what it reveals must be reachable by tap and focus.

## Performance

- Transitions honor `motion-reduce`.
- Avoid heavy blurs and stacked shadows; they are slow in WebViews.

## Environment

- No user-agent sniffing and no WebView-only code paths: one component, same behavior everywhere.

---

# Not in this library (the native shell)

Splash and app icon per project, Google sign-in in the system browser (Google blocks it in
WebViews), offline / load-error screen, Android back button, external links, deep links and push
notifications.
