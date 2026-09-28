export const carouselStyles = 'relative flex flex-col gap-3';

export const carouselHeaderStyles = 'flex items-center justify-between gap-3';

export const carouselControlsStyles = 'ml-auto flex gap-2';

export const carouselTrackStyles = [
  'flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-1 px-1 pb-2',
  '[scrollbar-width:thin]',
].join(' ');

export const carouselSlideStyles = 'shrink-0 snap-start';

/** Default slide widths: most of the screen on mobile, two on tablets, three on desktop. */
export const carouselSlideWidthStyles = 'w-[80%] sm:w-[45%] lg:w-[31%]';
