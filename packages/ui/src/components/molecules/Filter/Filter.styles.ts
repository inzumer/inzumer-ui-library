import { cva } from 'class-variance-authority';

export const filterStyles = 'relative';

/** One row that scrolls sideways, without a visible scrollbar. */
export const filterTrackStyles = [
  'flex gap-2 overflow-x-auto scroll-px-1 px-1 py-1',
  '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
].join(' ');

export const filterChipStyles = 'shrink-0';

/** Fades what doesn't fit into the page background (`--filter-fade`), with the arrow on top. */
export const filterEdgeStyles = cva(
  'pointer-events-none absolute inset-y-0 flex w-16 items-center from-[var(--filter-fade,var(--surface-primary))] to-transparent',
  {
    variants: {
      side: {
        start: 'left-0 justify-start bg-gradient-to-r',
        end: 'right-0 justify-end bg-gradient-to-l',
      },
    },
  },
);

export const filterButtonStyles = 'pointer-events-auto rounded-full shadow-md';

export const filterChevronStyles = 'h-5 w-5';
