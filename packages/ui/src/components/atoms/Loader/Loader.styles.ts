import { cva } from 'class-variance-authority';
import { overlayBackdropStyles } from '@styles/overlay';

export const loaderStyles = cva('inline-flex items-center gap-3 text-[var(--text-secondary)]', {
  variants: {
    layout: {
      inline: 'flex-row',
      stacked: 'flex-col justify-center text-center',
    },
  },
  defaultVariants: { layout: 'inline' },
});

/** The animated mark; with reduced motion a spin becomes a slow pulse. */
export const loaderMarkStyles = cva(
  'inline-flex shrink-0 items-center justify-center [&>*]:size-full [&>img]:object-contain',
  {
    variants: {
      effect: {
        spin: 'animate-spin motion-reduce:animate-[pulse_2.4s_ease-in-out_infinite]',
        pulse: 'animate-pulse motion-reduce:animate-[pulse_2.4s_ease-in-out_infinite]',
      },
      size: {
        sm: 'size-5',
        md: 'size-10',
        lg: 'size-16',
        xl: 'size-24',
      },
      speed: {
        normal: '',
        slow: '[animation-duration:2s]',
        fast: '[animation-duration:0.6s]',
      },
    },
    defaultVariants: { effect: 'spin', size: 'md', speed: 'normal' },
  },
);

/** Default mark: a ring with the primary color on top. */
export const loaderRingStyles =
  'block rounded-full border-[3px] border-[var(--border-default)] border-t-[var(--btn-primary-bg)]';

/** Rotating `messages`: always visible, with room for two lines so the layout doesn't jump. */
export const loaderMessageStyles = 'min-h-[3em] max-w-72 text-center text-[var(--text-secondary)]';

/** `screen`: the shared backdrop, centered and blurred so the mark and text stand out. */
export const loaderScreenStyles = `${overlayBackdropStyles} items-center backdrop-blur-md`;

/** `screen`: just the mark and the text in the middle of the backdrop. */
export const loaderScreenPanelStyles = 'flex max-w-[90vw] flex-col items-center outline-none';

/** `screen`: light text over the dark backdrop, readable in light and dark mode. */
export const loaderScreenTextStyles =
  'text-white [&_span]:text-lg [&_span]:font-semibold [&_span]:text-white [&_span]:drop-shadow-md';
