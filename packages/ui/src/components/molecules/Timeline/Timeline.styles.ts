export const timelineStyles =
  "relative flex flex-col gap-8 pl-6 before:absolute before:bottom-0 before:left-0 before:top-1.5 before:border-l before:border-(--border-default) before:content-['']";

export const timelineItemStyles = 'relative';

export const timelineNodeStyles =
  'absolute -left-6 top-1.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-(--btn-primary-bg)';

export const timelineTitleStyles = 'text-base font-bold text-(--text-primary)';

export const timelineDescriptionListStyles = 'mt-1 flex flex-col gap-1';

export const timelineDescriptionStyles = 'text-sm text-(--text-secondary)';

/** Photo of a step (e.g. a recipe step): under the text, rounded, 4:3. */
export const timelineMediaStyles =
  'mt-3 w-full max-w-md overflow-hidden rounded-xl border border-(--border-default) bg-(--surface-secondary)';

export const timelineImageStyles = 'aspect-4/3 w-full';
