/** Base of every form control (input, textarea, select, dropdown trigger). */
export const fieldControlBase = [
  'flex w-full rounded-md',
  'text-[var(--input-text)] bg-[var(--input-bg)]',
  'border border-[var(--input-border)]',
  'transition-colors duration-150 ease-in-out',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-0',
  'focus-visible:border-[var(--input-border-focus)]',
  'disabled:cursor-not-allowed disabled:opacity-50',
];

/** Error state and sizes shared by the form controls. */
export const fieldControlVariants = {
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
} as const;

export const fieldStyles = 'flex flex-col gap-1.5';
export const fieldLabelStyles = 'text-sm font-medium text-[var(--text-primary)]';
export const fieldErrorStyles = 'text-xs text-[var(--border-error)]';
export const fieldHintStyles = 'text-xs text-[var(--text-secondary)]';
