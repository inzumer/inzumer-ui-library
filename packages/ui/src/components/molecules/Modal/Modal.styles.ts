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
    // Every dialog takes 90% of the viewport's width and at most 90% of its height; the body scrolls.
    'flex max-h-[90dvh] w-[90vw] flex-col rounded-xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-6 shadow-lg',
    'transition-all duration-200 ease-out',
  ],
  {
    variants: {
      visible: {
        true: 'scale-100 opacity-100',
        false: 'scale-95 opacity-0',
      },
    },
    defaultVariants: {
      visible: false,
    },
  },
);

export const modalTitleStyles = 'mb-4 shrink-0 text-lg font-semibold text-[var(--text-primary)]';

export const modalBodyStyles = 'min-h-0 flex-1 overflow-y-auto';

export const modalFooterStyles = 'mt-6 flex shrink-0 flex-wrap items-center justify-end gap-2';
