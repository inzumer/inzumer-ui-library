import { cva } from 'class-variance-authority';

/** A pill; colors come from `--badge-bg` / `--badge-text` (the `colors` prop), neutral tokens otherwise. */
export const badgeStyles = cva(
  [
    'inline-flex items-center',
    'bg-(--badge-bg,var(--surface-secondary)) text-(--badge-text,var(--text-primary))',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'gap-1.5 px-2.5 py-1 text-xs font-bold',
        md: 'min-h-11 gap-2 px-4 text-sm font-semibold',
      },
      radius: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
      uppercase: {
        true: 'uppercase tracking-wide',
        false: '',
      },
    },
    defaultVariants: {
      size: 'sm',
      radius: 'full',
      uppercase: false,
    },
  },
);

export const badgeIconStyles = 'inline-flex size-[1.25em] shrink-0 items-center justify-center';
