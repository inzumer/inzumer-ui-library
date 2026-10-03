import { cva } from 'class-variance-authority';

export const iconLinkStyles = cva(
  [
    'inline-flex shrink-0 items-center justify-center rounded-full transition-colors duration-150 motion-reduce:transition-none',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)',
    '[&>svg]:h-1/2 [&>svg]:w-1/2',
  ],
  {
    variants: {
      size: {
        md: 'h-11 w-11',
        lg: 'h-12 w-12',
      },
      variant: {
        ghost: 'text-(--text-secondary) hover:bg-(--surface-secondary) hover:text-(--text-primary)',
        outline:
          'border border-(--border-default) text-(--text-primary) hover:border-(--border-strong) hover:bg-(--surface-secondary)',
        solid: 'bg-(--btn-primary-bg) text-(--btn-primary-text) hover:brightness-95',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'ghost',
    },
  },
);
