import { cva } from 'class-variance-authority';

export const checkboxLabelStyles = 'inline-flex items-start gap-3';

export const checkboxLabelDisabledStyles = 'cursor-not-allowed';

export const checkboxBoxWrapperStyles =
  'relative inline-flex h-6 w-6 shrink-0 items-center justify-center';

export const checkboxInputStyles = 'peer sr-only';

export const checkboxLabelTextStyles = 'pt-0.5 text-sm text-(--text-primary)';

export const checkboxBoxStyles = cva(
  [
    'inline-flex h-5 w-5 items-center justify-center rounded-sm border-2 transition-colors duration-150 ease-in-out',
    'peer-focus-visible:ring-2 peer-focus-visible:ring-(--border-focus) peer-focus-visible:ring-offset-2',
    'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
  ],
  {
    variants: {
      checked: {
        true: 'border-(--btn-primary-bg) bg-(--btn-primary-bg) text-(--btn-primary-text)',
        false: 'border-(--border-strong) bg-transparent text-transparent',
      },
    },
    defaultVariants: {
      checked: false,
    },
  },
);

export const checkboxIconStyles = 'h-4 w-4';
