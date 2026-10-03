import { cva } from 'class-variance-authority';

export const carouselStyles = 'relative flex flex-col gap-3';

export const carouselTrackStyles = [
  'flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-1 px-1 pb-2',
  'scrollbar-none [&::-webkit-scrollbar]:hidden',
].join(' ');

export const carouselSlideStyles = 'shrink-0 snap-start';

/** Default slide widths: most of the screen on mobile, two on tablets, three on desktop. */
export const carouselSlideWidthStyles = 'w-[80%] sm:w-[45%] lg:w-[31%]';

/** Three slots (start · center · end) so buttons and indicators can sit on different sides. */
export const carouselControlsStyles = 'grid grid-cols-[1fr_auto_1fr] items-center gap-3';

export const carouselSlotStyles = cva('row-start-1 flex min-w-0 items-center gap-3', {
  variants: {
    position: {
      start: 'col-start-1 justify-start',
      center: 'col-start-2 justify-center',
      end: 'col-start-3 justify-end',
    },
  },
});

export const carouselIndicatorsStyles = 'flex flex-wrap items-center justify-center gap-1';

/** 24px hit area around a small dot, so the indicators are easy to tap. */
export const carouselIndicatorStyles = [
  'flex h-6 min-w-6 items-center justify-center rounded-full',
  'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-(--border-focus)',
].join(' ');

export const carouselDotStyles = cva(
  'block h-2 rounded-full bg-(--btn-primary-bg) transition-all duration-200 motion-reduce:transition-none',
  {
    variants: {
      active: {
        true: 'w-6',
        false: 'w-2 opacity-30 hover:opacity-60',
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

/** Round primary buttons with the components' shadow. */
export const carouselButtonStyles = 'rounded-full shadow-md disabled:shadow-none';

export const carouselChevronStyles = 'h-5 w-5';
