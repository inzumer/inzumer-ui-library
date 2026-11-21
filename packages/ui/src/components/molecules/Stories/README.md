# Stories

Full-screen **stories** to tell how something works, one step at a time: a photo with a title, a
short text and, optionally, an action. Progress bars at the top show where you are; each story moves
on by itself when its bar fills.

- **Tap** the right side (two thirds) to go forward, the left third to go back; going back on the
  first story starts it again.
- **Hold** anywhere to pause and release to go on, or use the pause button.
- **Close** with the button or Escape. After the last story it calls `onComplete` and `onClose`.
- **Keyboard**: Tab reaches every control, arrows move between stories.

## Usage

```tsx
import { Stories } from '@inzumer/ui-library';

<Stories
  open={open}
  onClose={() => setOpen(false)}
  label="How to bake at home"
  labels={{
    close: 'Close',
    previous: 'Previous story',
    next: 'Next story',
    pause: 'Pause',
    play: 'Play',
    story: (index, total) => `Story ${index + 1} of ${total}`,
  }}
  items={[
    { src: '/mise.jpg', alt: 'Chopped vegetables', title: 'Get everything ready' },
    {
      src: '/scones.jpg',
      alt: 'Scones and tea',
      title: 'Time for tea',
      action: <Button>Start</Button>,
    },
  ]}
/>;
```

## Props

- `items` — the stories: `src`, `alt`, `title`, `description`, `action`, `duration` and an `id`
  (it goes on the story, also as `data-testid`)
- `label` — accessible name of the dialog
- `labels` — copy for the buttons and `story(index, total)`, the name of each story (`"2 / 5"` by
  default: translate it)
- `duration` — milliseconds per story (default `5000`); an item's `duration` wins
- `autoplay` — move on by itself (default `true`); with `false` the bars only show the position
- `startIndex` — first story each time it opens
- `onIndexChange(index)`, `onComplete` — to measure which story people reach and who sees them all
- `closeId`, `buttonIds` — ids (and test ids) for `previous`, `next` and `pause`

## Notes

- With `prefers-reduced-motion` it never moves on by itself and the pause button hides: people go
  forward when they want (WCAG 2.2.2).
- Screen readers hear the story number and its text when it changes while paused or manual; while
  playing the region stays quiet.
- The progress uses the Web Animations API, so it pauses without timers or re-renders; where it is
  not available it behaves as `autoplay={false}`.
- Full screen on phones (`dvh` and safe-area insets for the WebView apps), a 9:16 frame from `sm`.
- Text sits on a dark scrim over the photo. Colors can be themed with `--stories-surface`,
  `--stories-text`, `--stories-track`, `--stories-scrim` and `--stories-scrim-top`.
- The next photo is preloaded so steps don't flash.
