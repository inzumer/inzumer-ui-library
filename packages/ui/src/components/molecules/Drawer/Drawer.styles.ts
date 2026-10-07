import { cva } from 'class-variance-authority';

export const drawerOverlayStyles = cva(
  'absolute inset-0 bg-surface-overlay transition-opacity duration-200 ease-out',
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

export const drawerPanelStyles = cva(
  [
    'absolute inset-y-0 flex w-full max-w-80 flex-col gap-6 overflow-y-auto overscroll-contain',
    // Clear of the notch and the home bar in apps (0 in browsers).
    'pt-[calc(1.5rem_+_env(safe-area-inset-top))] pb-[calc(1.5rem_+_env(safe-area-inset-bottom))]',
    'border-(--border-default) bg-(--surface-primary) p-6 shadow-xl',
    'transition-transform duration-200 ease-out focus:outline-hidden',
  ],
  {
    variants: {
      side: {
        left: 'left-0 border-r pl-[calc(1.5rem_+_env(safe-area-inset-left))]',
        right: 'right-0 border-l pr-[calc(1.5rem_+_env(safe-area-inset-right))]',
      },
      visible: {
        true: 'translate-x-0',
        false: '',
      },
    },
    compoundVariants: [
      { side: 'left', visible: false, className: '-translate-x-full' },
      { side: 'right', visible: false, className: 'translate-x-full' },
    ],
    defaultVariants: {
      side: 'right',
      visible: false,
    },
  },
);

export const drawerHeaderStyles = 'flex items-center justify-between gap-4';

export const drawerTitleStyles = 'text-lg font-semibold text-(--text-primary)';

export const drawerFooterStyles = 'mt-auto flex flex-col gap-4';
