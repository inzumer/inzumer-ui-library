import { cva } from 'class-variance-authority';
import { overlayBackdropStyles } from '@styles/overlay';

export const loaderStyles = cva('inline-flex items-center gap-3 text-(--text-secondary)', {
  variants: {
    layout: {
      inline: 'flex-row',
      stacked: 'flex-col justify-center text-center',
    },
  },
  defaultVariants: { layout: 'inline' },
});

export const loaderMarkStyles = cva(
  'inline-flex shrink-0 items-center justify-center *:size-full [&>img]:object-contain',
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

export const loaderRingStyles =
  'block rounded-full border-[3px] border-(--border-default) border-t-(--btn-primary-bg)';

export const loaderMessageStyles = 'min-h-[3em] max-w-72 text-center text-(--text-secondary)';

export const loaderScreenStyles = `${overlayBackdropStyles} items-center backdrop-blur-md`;

export const loaderScreenPanelStyles = 'flex max-w-[90vw] flex-col items-center outline-hidden';

export const loaderScreenTextStyles =
  'text-white [&_span]:text-lg [&_span]:font-semibold [&_span]:text-white [&_span]:drop-shadow-md';
