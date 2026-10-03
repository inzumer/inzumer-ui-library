import { cva } from 'class-variance-authority';

export const iconLinkStyles = cva(
  [
    'inline-flex shrink-0 items-center justify-center rounded-full transition-colors duration-150 motion-reduce:transition-none',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--border-focus)]',
    '[&>svg]:h-1/2 [&>svg]:w-1/2',
  ],
  {
    variants: {
      size: {
        md: 'h-11 w-11',
        lg: 'h-12 w-12',
      },
      variant: {
        ghost:
          'text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]',
        outline:
          'border border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-secondary)]',
        solid: 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:brightness-95',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'ghost',
    },
  },
);
