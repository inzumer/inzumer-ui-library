import { cva } from 'class-variance-authority';

export const mediaCardStyles = cva(
  'group relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-[var(--surface-tertiary)] shadow-sm',
  {
    variants: {
      aspect: {
        portrait: 'aspect-[3/4]',
        square: 'aspect-square',
        landscape: 'aspect-[4/3]',
      },
    },
    defaultVariants: {
      aspect: 'portrait',
    },
  },
);

export const mediaCardImageStyles = [
  'absolute inset-0 -z-20 h-full w-full',
  'transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100',
].join(' ');

/**
 * Scrim from the bottom so the text reads on any photo. Text over photos is always light on dark,
 * whatever the theme; sites can tune it with --media-card-scrim and --media-card-text.
 */
export const mediaCardScrimStyles = [
  'pointer-events-none absolute inset-0 -z-10',
  'bg-gradient-to-t from-[var(--media-card-scrim,rgb(0_0_0/0.8))] via-[var(--media-card-scrim-mid,rgb(0_0_0/0.3))] via-45% to-transparent to-75%',
].join(' ');

export const mediaCardContentStyles = 'flex flex-col gap-1 p-4 text-[var(--media-card-text,#fff)]';

export const mediaCardTitleStyles = 'text-lg font-bold leading-tight text-inherit';

export const mediaCardSubtitleStyles = 'text-sm text-inherit opacity-90';

/** Stretched link: its ::after covers the whole card, so the card is one link named by the title. */
export const mediaCardLinkStyles = [
  'text-inherit no-underline hover:text-inherit',
  'after:absolute after:inset-0 after:z-[1] after:rounded-2xl after:content-[""]',
  'focus-visible:outline-none focus-visible:after:ring-4 focus-visible:after:ring-inset focus-visible:after:ring-[var(--border-focus)]',
].join(' ');

export const mediaCardBadgeStyles = [
  'absolute left-3 top-3 z-[2] rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide',
  'bg-[var(--media-card-badge-bg,rgb(255_255_255/0.92))] text-[var(--media-card-badge-text,rgb(31_31_31))]',
].join(' ');

/** Floating actions: round, above the card link, so they stay clickable. */
export const mediaCardActionsStyles =
  'absolute right-3 top-3 z-[2] flex gap-2 [&>*]:rounded-full [&>*]:shadow-md';
