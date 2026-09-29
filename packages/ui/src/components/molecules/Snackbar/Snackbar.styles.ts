import { cva } from 'class-variance-authority';

export const snackbarWrapperStyles =
  'pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4';

/** Colors come from `--snackbar-bg` / `--snackbar-text`, set from the shared status tones. */
export const snackbarStyles = cva(
  [
    'pointer-events-auto rounded-md border border-transparent px-4 py-3 text-sm shadow-lg',
    'bg-[var(--snackbar-bg)] text-[var(--snackbar-text)]',
    'transition-all duration-200 ease-out',
  ],
  {
    variants: {
      visible: {
        true: 'translate-y-0 opacity-100',
        false: 'translate-y-2 opacity-0',
      },
    },
    defaultVariants: {
      visible: false,
    },
  },
);
