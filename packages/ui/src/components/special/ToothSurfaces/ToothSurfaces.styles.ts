import { cva } from 'class-variance-authority';

export const toothSurfacesStyles = 'h-40 w-40 touch-manipulation select-none';

export const surfaceStyles = cva('transition-colors duration-150 ease-in-out', {
  variants: {
    interactive: {
      true: 'cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)',
      false: '',
    },
  },
  defaultVariants: {
    interactive: false,
  },
});

export const surfaceShapeStyles = cva('', {
  variants: {
    selected: {
      true: 'stroke-(--border-focus) [stroke-width:3]',
      false: 'stroke-current [stroke-width:1.5]',
    },
    missing: {
      true: '[stroke-dasharray:4_3] opacity-60',
      false: '',
    },
  },
  defaultVariants: {
    selected: false,
    missing: false,
  },
});

export const surfaceCodeStyles =
  'pointer-events-none fill-(--text-primary) stroke-(--surface-primary) text-[9px] font-semibold [paint-order:stroke] [stroke-width:2.5] [text-anchor:middle] [dominant-baseline:central]';
