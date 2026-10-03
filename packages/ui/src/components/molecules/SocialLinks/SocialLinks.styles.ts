import { cva } from 'class-variance-authority';

export const socialLinksStyles = cva('flex flex-wrap gap-2', {
  variants: {
    align: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
    },
  },
  defaultVariants: {
    align: 'start',
  },
});
