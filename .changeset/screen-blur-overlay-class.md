---
'@inzumer/ui-library': minor
---

The screen `Loader` blurs the page behind it so the mark and the messages stand out in light mode. Overlays (Modal, BottomSheet, Drawer, screen Loader) use the preset's `bg-surface-overlay` class instead of an arbitrary value: projects that build the library's classes with the `@inzumer/tokens` Tailwind preset need `@inzumer/tokens` 1.2.0 or later.
