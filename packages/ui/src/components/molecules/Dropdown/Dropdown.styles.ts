import { cva } from 'class-variance-authority';

export const dropdownTriggerStyles = 'items-center text-left';

export const dropdownValueStyles = 'truncate';

export const dropdownChevronStyles = 'transition-transform duration-150 ease-out';

export const dropdownListStyles = [
  'absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-y-auto p-1',
  'rounded-md border border-(--input-border) bg-(--input-bg) shadow-lg',
  'focus:outline-hidden',
].join(' ');

export const dropdownOptionStyles = cva(
  'flex min-h-10 cursor-pointer items-center justify-between gap-3 rounded px-3 text-(--input-text)',
  {
    variants: {
      active: {
        true: 'bg-(--btn-primary-bg) text-(--btn-primary-text)',
        false: '',
      },
      selected: {
        true: 'font-semibold',
        false: '',
      },
    },
    defaultVariants: {
      active: false,
      selected: false,
    },
  },
);

export const dropdownCheckStyles = 'size-4 shrink-0';
