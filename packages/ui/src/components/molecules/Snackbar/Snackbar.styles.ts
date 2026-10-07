import { cva } from 'class-variance-authority';

/** Above the home bar in apps (safe-area inset; 0 in browsers). */
export const snackbarWrapperStyles =
  'pointer-events-none fixed inset-x-0 bottom-[calc(1rem_+_env(safe-area-inset-bottom))] z-50 flex justify-center px-4';

/** Colors come from `--snackbar-bg` / `--snackbar-text`, set from the shared status tones. */
export const snackbarStyles = cva(
  [
    'pointer-events-auto rounded-md border border-transparent px-4 py-3 text-sm shadow-lg',
    'bg-(--snackbar-bg) text-(--snackbar-text)',
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
