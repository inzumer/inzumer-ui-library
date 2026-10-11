import { cva } from 'class-variance-authority';
import { overlayBackdropStyles } from '@styles/overlay';

export const bottomSheetOverlayStyles = cva([overlayBackdropStyles, 'items-end'], {
  variants: {
    visible: {
      true: 'opacity-100',
      false: 'opacity-0',
    },
  },
  defaultVariants: {
    visible: false,
  },
});

export const bottomSheetPanelStyles = cva(
  [
    // Full width up to 768px (pixels, like Modal), centered.
    'relative flex w-full max-w-[768px] flex-col overflow-hidden rounded-t-xl border border-b-0 border-(--border-default)',
    'bg-(--surface-secondary) p-6 shadow-lg',
    // Clear of the home bar in apps; only the body scrolls (see below).
    'pb-[calc(1.5rem_+_env(safe-area-inset-bottom))]',
    'transition-transform duration-200 ease-out motion-reduce:transition-none',
  ],
  {
    variants: {
      visible: {
        true: 'translate-y-0',
        false: 'translate-y-full',
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

/** 44px drag area at the top: swiping it down closes the sheet. */
export const bottomSheetHandleAreaStyles =
  '-mx-6 -mt-6 mb-2 flex h-11 shrink-0 cursor-grab touch-none items-center justify-center active:cursor-grabbing';

export const bottomSheetHandleStyles = 'h-1.5 w-10 rounded-full bg-(--border-strong)';

export const bottomSheetTitleStyles = 'mb-4 shrink-0 text-lg font-semibold text-(--text-primary)';

/** Scrolls on the panel's edge below the handle and the title, without moving the page behind. */
export const bottomSheetBodyStyles =
  'min-h-0 flex-1 overflow-y-auto overscroll-contain -mx-6 px-6 py-1';

export const bottomSheetFooterStyles = 'mt-6 flex shrink-0 items-center justify-end gap-2';
