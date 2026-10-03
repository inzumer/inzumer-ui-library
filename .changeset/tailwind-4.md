---
'@inzumer/ui-library': major
---

Tailwind CSS 4. The classes use the v4 syntax (`bg-(--surface-primary)`, `outline-hidden`…), so apps need Tailwind 4 (load the tokens preset with `@config` and scan the library with `@source`) and `tailwind-merge` 3 (peer `>=3.0.0`). No vulnerabilities left in the dependencies: Changesets CLI 3, and overrides for the patched versions of `brace-expansion`, `js-yaml`, `nanoid`, `postcss`, `ws`, `uuid` and `esbuild`.
