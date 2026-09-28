import { cva } from 'class-variance-authority';

export const drawerOverlayStyles = cva(
  'absolute inset-0 bg-[var(--surface-overlay)] transition-opacity duration-200 ease-out',
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
    'absolute inset-y-0 flex w-full max-w-80 flex-col gap-6 overflow-y-auto',
    'border-[var(--border-default)] bg-[var(--surface-primary)] p-6 shadow-xl',
    'transition-transform duration-200 ease-out focus:outline-none',
  ],
  {
    variants: {
      side: {
        left: 'left-0 border-r',
        right: 'right-0 border-l',
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

export const drawerTitleStyles = 'text-lg font-semibold text-[var(--text-primary)]';

export const drawerFooterStyles = 'mt-auto flex flex-col gap-4';
