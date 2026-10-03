import { cva } from 'class-variance-authority';

export const navbarStyles =
  'flex items-center gap-4 border-b border-[var(--border-default)] bg-[var(--surface-primary)] px-4 py-2';

export const navbarListStyles = cva('flex gap-1 overflow-x-auto whitespace-nowrap', {
  variants: {
    align: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
    },
  },
  defaultVariants: {
    align: 'end',
  },
});

export const navbarLinkStyles = [
  'inline-flex min-h-11 items-center rounded-md px-3 text-[var(--text-secondary)]',
  'transition-colors motion-reduce:transition-none',
  'hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--border-focus)]',
  'aria-[current=page]:font-semibold aria-[current=page]:text-[var(--text-primary)]',
].join(' ');
