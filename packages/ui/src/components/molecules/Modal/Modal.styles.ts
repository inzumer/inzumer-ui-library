import { cva } from 'class-variance-authority';

export const modalOverlayStyles = cva(
  [
    'fixed inset-0 z-50 flex items-center justify-center bg-[var(--surface-overlay)]',
    'transition-opacity duration-200 ease-out',
  ],
  {
    variants: {
      visible: {
        true: 'opacity-100',
        false: 'opacity-0',
      },
    },
    defaultVariants: {
      visible: false,
    },
  },
);

export const modalPanelStyles = cva(
  [
    // Every dialog: 90% of the viewport's width up to 768px, as tall as its content up to the
    // `maxHeight` limit; beyond that the body scrolls. Pixels, so a site's root font size can't shrink it.
    'flex w-[90vw] max-w-[768px] flex-col rounded-xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-6 shadow-lg',
    'transition-all duration-200 ease-out',
  ],
  {
    variants: {
      visible: {
        true: 'scale-100 opacity-100',
        false: 'scale-95 opacity-0',
      },
      maxHeight: {
        default: 'max-h-[80dvh]',
        tall: 'max-h-[90dvh]',
      },
    },
    defaultVariants: {
      visible: false,
      maxHeight: 'default',
    },
  },
);

export const modalTitleStyles = 'mb-4 shrink-0 text-lg font-semibold text-[var(--text-primary)]';

export const modalBodyStyles = 'min-h-0 flex-1 overflow-y-auto';

export const modalFooterStyles = 'mt-6 flex shrink-0 flex-wrap items-center justify-end gap-2';
