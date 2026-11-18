import { cva } from 'class-variance-authority';

export const odontogramStyles = 'flex w-full flex-col items-center gap-4';

export const odontogramSvgStyles = 'h-auto w-full max-w-sm touch-manipulation select-none';

export const toothStateStyles = cva('', {
  variants: {
    state: {
      default: 'text-(--text-secondary)',
      treated:
        'text-[rgb(var(--color-info-600))] [[data-color-scheme=dark]_&]:text-[rgb(var(--color-info-400))]',
      pending:
        'text-[rgb(var(--color-danger-600))] [[data-color-scheme=dark]_&]:text-[rgb(var(--color-danger-400))]',
      inProgress:
        'text-[rgb(var(--color-warning-600))] [[data-color-scheme=dark]_&]:text-[rgb(var(--color-warning-400))]',
      missing:
        'text-[rgb(var(--color-neutral-500))] [[data-color-scheme=dark]_&]:text-[rgb(var(--color-neutral-400))]',
      implant:
        'text-[rgb(var(--color-info-800))] [[data-color-scheme=dark]_&]:text-[rgb(var(--color-info-300))]',
    },
  },
  defaultVariants: {
    state: 'default',
  },
});

export const toothStyles = cva('transition-opacity duration-150 ease-in-out', {
  variants: {
    interactive: {
      true: 'cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)',
      false: '',
    },
    dimmed: {
      true: 'opacity-30',
      false: '',
    },
  },
  defaultVariants: {
    interactive: false,
    dimmed: false,
  },
});

export const toothOutlineStyles = cva('fill-(--surface-primary)', {
  variants: {
    selected: {
      true: 'stroke-(--border-focus) [stroke-width:6]',
      false: 'stroke-current [stroke-width:2]',
    },
    missing: {
      true: '[stroke-dasharray:6_5] opacity-60',
      false: '',
    },
  },
  defaultVariants: {
    selected: false,
    missing: false,
  },
});

export const toothDetailStyles = 'fill-none stroke-current';

export const odontogramLegendStyles =
  'grid w-full max-w-sm grid-cols-2 gap-x-4 gap-y-2 text-xs text-(--text-secondary) sm:grid-cols-3';

export const odontogramLegendItemStyles = 'flex items-center gap-2';

export const odontogramSwatchStyles = 'h-4 w-4 shrink-0';
