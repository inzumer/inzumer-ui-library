---
'@inzumer/ui-library': minor
---

`Loader` gets `messages` (visible texts under the mark, one at random that changes every `messageInterval` ms) and `screen` (full screen over the Modal's backdrop, blocking clicks, scroll and keyboard while waiting). New `useRotatingMessage` hook and `pickRandom` util. Modal, BottomSheet and the screen Loader share one backdrop style. `BottomSheet` is now full width up to 768px, centered.
