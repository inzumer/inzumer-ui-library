export const marqueeStyles = 'flex items-center gap-2';

/** Without motion the content scrolls by hand instead. */
export const marqueeViewportStyles = (animated: boolean) =>
  animated ? 'min-w-0 flex-1 overflow-hidden' : 'min-w-0 flex-1 overflow-x-auto';

export const marqueeTrackStyles = 'flex w-max';

/** The trailing padding equals the gap, so both copies join seamlessly. */
export const marqueeGroupStyles =
  'flex shrink-0 items-center gap-(--marquee-gap) pr-(--marquee-gap)';

export const marqueeButtonStyles = 'shrink-0';
