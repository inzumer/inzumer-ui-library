export const accordionStyles = 'group';

export const accordionSummaryStyles = [
  'flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-lg px-3',
  'font-semibold text-(--text-primary) transition-colors hover:bg-(--surface-secondary)',
  'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-(--border-focus)',
  '[&::-webkit-details-marker]:hidden',
].join(' ');

export const accordionChevronStyles =
  'size-4 shrink-0 text-(--text-secondary) transition-transform duration-150 group-open:rotate-180';

export const accordionContentStyles = 'mt-1 px-3';
