import { cva } from 'class-variance-authority';

export const carouselStyles = 'relative flex flex-col gap-3';

export const carouselTrackStyles = [
  'flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-1 px-1 pb-2',
  '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
].join(' ');

export const carouselSlideStyles = 'shrink-0 snap-start';

/** Default slide widths: most of the screen on mobile, two on tablets, three on desktop. */
export const carouselSlideWidthStyles = 'w-[80%] sm:w-[45%] lg:w-[31%]';

/** Previous · indicators · next, centered under the cards. */
export const carouselControlsStyles = 'flex items-center justify-center gap-3';

export const carouselIndicatorsStyles = 'flex flex-wrap items-center justify-center gap-1';

/** 24px hit area around a small dot, so the indicators are easy to tap. */
export const carouselIndicatorStyles = [
  'flex h-6 min-w-6 items-center justify-center rounded-full',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]',
].join(' ');

export const carouselDotStyles = cva(
  'block h-2 rounded-full transition-all duration-200 motion-reduce:transition-none',
  {
    variants: {
      active: {
        true: 'w-6 bg-[var(--btn-primary-bg)]',
        false: 'w-2 bg-[var(--border-strong)] hover:bg-[var(--text-secondary)]',
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);
