import { cva } from 'class-variance-authority';

export const switchLabelStyles = 'inline-flex items-center gap-2';

export const switchLabelDisabledStyles = 'cursor-not-allowed';

export const switchTrackWrapperStyles = 'relative inline-flex h-6 w-11 shrink-0';

export const switchInputStyles = 'peer sr-only';

export const switchLabelTextStyles = 'text-sm text-(--text-primary)';

export const switchTrackStyles = cva(
  [
    'absolute inset-0 rounded-full transition-colors duration-150 ease-in-out',
    'peer-focus-visible:ring-2 peer-focus-visible:ring-(--border-focus) peer-focus-visible:ring-offset-2',
    'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
  ],
  {
    variants: {
      checked: {
        true: 'bg-(--btn-primary-bg)',
        false: 'bg-(--border-strong)',
      },
    },
    defaultVariants: {
      checked: false,
    },
  },
);

export const switchThumbStyles = cva(
  'absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-xs transition-transform duration-150 ease-in-out',
  {
    variants: {
      checked: {
        true: 'translate-x-5',
        false: '',
      },
    },
    defaultVariants: {
      checked: false,
    },
  },
);
