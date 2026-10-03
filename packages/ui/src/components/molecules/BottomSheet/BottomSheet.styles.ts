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
    'w-full max-w-[768px] rounded-t-xl border border-b-0 border-(--border-default)',
    'bg-(--surface-secondary) p-6 shadow-lg',
    'transition-transform duration-200 ease-out',
  ],
  {
    variants: {
      visible: {
        true: 'translate-y-0',
        false: 'translate-y-full',
      },
    },
    defaultVariants: {
      visible: false,
    },
  },
);

export const bottomSheetHandleStyles = 'mx-auto mb-4 h-1.5 w-10 rounded-full bg-(--border-strong)';

export const bottomSheetTitleStyles = 'mb-4 text-lg font-semibold text-(--text-primary)';

export const bottomSheetFooterStyles = 'mt-6 flex items-center justify-end gap-2';
