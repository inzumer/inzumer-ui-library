import { cva } from 'class-variance-authority';

export const showcaseStyles = cva(
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

export const showcaseImageStyles = [
  'absolute inset-0 -z-20 h-full w-full',
  'transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100',
].join(' ');

/** Bottom scrim so light text reads on any photo; tune it with --showcase-scrim and --showcase-text. */
export const showcaseScrimStyles = [
  'pointer-events-none absolute inset-0 -z-10',
  'bg-gradient-to-t from-[var(--showcase-scrim,rgb(0_0_0/0.8))] via-[var(--showcase-scrim-mid,rgb(0_0_0/0.3))] via-45% to-transparent to-75%',
].join(' ');

export const showcaseContentStyles =
  'flex flex-col items-start gap-1 p-4 text-[var(--showcase-text,#fff)]';

export const showcaseTitleStyles = 'text-lg font-bold leading-tight text-inherit';

export const showcaseSubtitleStyles = 'text-sm text-inherit opacity-90';

/** Stretched link: its ::after covers the whole card, so the card is one link named by the title. */
export const showcaseLinkStyles = [
  'text-inherit no-underline hover:text-inherit',
  'after:absolute after:inset-0 after:z-[1] after:rounded-2xl after:content-[""]',
  'focus-visible:outline-none focus-visible:after:ring-4 focus-visible:after:ring-inset focus-visible:after:ring-[var(--border-focus)]',
].join(' ');

/** Above the title, in the text flow over the gradient. */
export const showcaseBadgeStyles = 'mb-1 self-start';

/** Floating actions: round, above the card link, so they stay clickable. */
export const showcaseActionsStyles =
  'absolute right-3 top-3 z-[2] flex gap-2 [&>*]:rounded-full [&>*]:shadow-md';
