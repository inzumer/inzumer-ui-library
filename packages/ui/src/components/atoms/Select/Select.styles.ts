import { cva } from 'class-variance-authority';

export const selectStyles = cva(
  [
    'flex w-full appearance-none rounded-md bg-no-repeat pr-10',
    'text-[var(--input-text)] bg-[var(--input-bg)]',
    'border border-[var(--input-border)]',
    'transition-colors duration-150 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-0',
    'focus-visible:border-[var(--input-border-focus)]',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      state: {
        default: '',
        error: 'border-[var(--input-border-error)] focus-visible:ring-[var(--border-error)]',
      },
      inputSize: {
        sm: 'h-8 px-2 text-xs',
        md: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
      },
    },
    defaultVariants: {
      state: 'default',
      inputSize: 'md',
    },
  },
);

/** Chevron drawn with `currentColor`, positioned over the right padding of the select. */
export const selectChevronStyles =
  'pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-secondary)]';
