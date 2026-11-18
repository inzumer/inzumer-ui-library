import { cva } from 'class-variance-authority';

export const snackbarWrapperStyles =
  'pointer-events-none fixed inset-x-0 bottom-[calc(1rem_+_env(safe-area-inset-bottom))] z-50 flex justify-center px-4';

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
