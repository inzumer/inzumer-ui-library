import { cva } from 'class-variance-authority';

/** Below the notch / status bar in apps (safe-area inset; 0 in browsers). */
export const navbarStyles =
  'flex items-center gap-4 border-b border-(--border-default) bg-(--surface-primary) px-4 py-2 pt-[calc(0.5rem_+_env(safe-area-inset-top))]';

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
  'inline-flex min-h-11 items-center rounded-md px-3 text-(--text-secondary)',
  'transition-colors motion-reduce:transition-none',
  'hover:bg-(--surface-secondary) hover:text-(--text-primary)',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)',
  'aria-[current=page]:font-semibold aria-[current=page]:text-(--text-primary)',
].join(' ');
