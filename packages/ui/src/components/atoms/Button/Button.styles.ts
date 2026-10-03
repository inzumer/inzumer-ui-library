import { cva } from 'class-variance-authority';

export const buttonStyles = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium text-sm leading-none',
    'rounded-md',
    'transition-colors duration-150 ease-in-out',
    'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-(--border-focus) focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'aria-busy:cursor-wait aria-busy:animate-pulse aria-busy:opacity-80 motion-reduce:aria-busy:animate-[pulse_2.4s_ease-in-out_infinite]',
    'select-none',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-(--btn-primary-bg) text-(--btn-primary-text)',
          'border border-(--btn-primary-border)',
          'hover:bg-(--btn-primary-bg-hover)',
          'active:bg-(--btn-primary-bg-active)',
        ],
        secondary: [
          'bg-(--btn-secondary-bg) text-(--btn-secondary-text)',
          'border border-(--btn-secondary-border)',
          'hover:bg-(--btn-secondary-bg-hover)',
          'active:bg-(--btn-secondary-bg-active)',
        ],
        ghost: [
          'bg-(--btn-ghost-bg) text-(--btn-ghost-text)',
          'border border-(--btn-ghost-border)',
          'hover:bg-(--btn-ghost-bg-hover)',
          'active:bg-(--btn-ghost-bg-active)',
        ],
        destructive: [
          'bg-(--btn-destructive-bg) text-(--btn-destructive-text)',
          'border border-(--btn-destructive-border)',
          'hover:bg-(--btn-destructive-bg-hover)',
          'active:bg-(--btn-destructive-bg-active)',
        ],
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);
