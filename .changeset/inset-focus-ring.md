---
'@inzumer/ui-library': patch
---

Form controls (`Input`, `Textarea`, `Select`, `Dropdown`) draw their focus ring inside the border, so scroll containers such as the `Modal` body no longer clip it on the sides; the `Modal` body also leaves room for the focus ring of other controls.
