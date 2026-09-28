import { cva } from 'class-variance-authority';

export const textareaStyles = cva(
  [
    'flex min-h-24 w-full rounded-md px-3 py-2',
    'text-[var(--input-text)] bg-[var(--input-bg)]',
    'border border-[var(--input-border)]',
    'placeholder:text-[var(--input-placeholder)]',
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
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
      resize: {
        vertical: 'resize-y',
        none: 'resize-none',
      },
    },
    defaultVariants: {
      state: 'default',
      inputSize: 'md',
      resize: 'vertical',
    },
  },
);
