import { cva } from 'class-variance-authority';
import { overlayBackdropStyles } from '@styles/overlay';

export const storiesOverlayStyles = cva([overlayBackdropStyles, 'items-center'], {
  variants: {
    visible: {
      true: 'opacity-100',
      false: 'opacity-0',
    },
  },
  defaultVariants: {
    visible: false,
  },
});

export const storiesPanelStyles = cva(
  [
    'relative flex h-dvh w-full flex-col overflow-hidden overscroll-contain bg-(--stories-surface,#000) text-(--stories-text,#fff)',
    'sm:h-[min(90dvh,54rem)] sm:w-auto sm:aspect-9/16 sm:rounded-2xl sm:shadow-lg',
    'transition-all duration-200 ease-out motion-reduce:transition-none',
    'focus-visible:outline-hidden',
  ],
  {
    variants: {
      visible: {
        true: 'scale-100 opacity-100',
        false: 'scale-95 opacity-0',
      },
    },
    defaultVariants: {
      visible: false,
    },
  },
);

export const storiesSlideStyles = 'absolute inset-0 isolate flex flex-col';

export const storiesImageStyles = 'absolute inset-0 -z-20 h-full w-full';

export const storiesScrimStyles = [
  'pointer-events-none absolute inset-0 -z-10',
  'bg-[linear-gradient(to_bottom,var(--stories-scrim-top,rgb(0_0_0/0.55)),transparent_22%,transparent_50%,var(--stories-scrim,rgb(0_0_0/0.8)))]',
].join(' ');

export const storiesHeaderStyles = [
  'relative z-20 flex flex-col gap-2 px-3 pt-[calc(0.75rem_+_env(safe-area-inset-top))]',
  'pl-[calc(0.75rem_+_env(safe-area-inset-left))] pr-[calc(0.75rem_+_env(safe-area-inset-right))]',
].join(' ');

export const storiesBarsStyles = 'flex gap-1';

export const storiesBarStyles =
  'h-1 flex-1 overflow-hidden rounded-full bg-(--stories-track,rgb(255_255_255/0.4))';

export const storiesBarFillStyles = 'block h-full w-full origin-left bg-current';

export const storiesControlsStyles = 'flex items-center justify-end gap-1';

export const storiesControlStyles = [
  'size-11 rounded-full text-inherit hover:bg-(--stories-hover,rgb(255_255_255/0.15)) hover:text-inherit',
  'focus-visible:ring-(--stories-text,#fff)',
].join(' ');

export const storiesNavStyles = 'absolute inset-0 z-0 flex';

export const storiesNavButtonStyles = [
  'h-full cursor-pointer touch-manipulation select-none bg-transparent',
  'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--stories-text,#fff)',
].join(' ');

export const storiesPreviousStyles = 'w-1/3';

export const storiesNextStyles = 'w-2/3';

export const storiesContentStyles = [
  'pointer-events-none relative z-10 mt-auto flex flex-col items-start gap-2 px-5',
  'pb-[calc(1.5rem_+_env(safe-area-inset-bottom))] pl-[calc(1.25rem_+_env(safe-area-inset-left))] pr-[calc(1.25rem_+_env(safe-area-inset-right))]',
].join(' ');

export const storiesTitleStyles = 'text-inherit';

export const storiesDescriptionStyles = 'text-inherit opacity-90';

export const storiesActionStyles = 'pointer-events-auto mt-2';
