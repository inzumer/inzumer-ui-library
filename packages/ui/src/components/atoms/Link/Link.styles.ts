import { cva } from 'class-variance-authority';

export const linkStyles = cva(
  [
    'text-(--text-link) transition-colors duration-150 ease-in-out',
    'hover:text-(--text-link-hover)',
  ],
  {
    variants: {
      underline: {
        always: 'underline underline-offset-4',
        hover: 'underline-offset-4 hover:underline',
        none: 'no-underline',
      },
    },
    defaultVariants: {
      underline: 'hover',
    },
  },
);
