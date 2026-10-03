import { cva } from 'class-variance-authority';

export const tableContainerStyles =
  'overflow-x-auto rounded-lg border border-(--border-default) bg-(--surface-primary)';

export const tableStyles = 'w-full min-w-80 text-left tabular-nums';

export const tableCaptionStyles = cva('p-3 text-left text-sm text-(--text-secondary)', {
  variants: {
    hidden: {
      true: 'sr-only',
      false: '',
    },
  },
  defaultVariants: {
    hidden: false,
  },
});

export const tableHeadStyles = 'border-b border-(--border-default) text-sm text-(--text-secondary)';

export const tableRowStyles = 'border-b border-(--border-muted) last:border-0';

export const tableCellStyles = cva('p-3', {
  variants: {
    align: {
      start: 'text-left',
      end: 'text-right',
      center: 'text-center',
    },
  },
  defaultVariants: {
    align: 'start',
  },
});
