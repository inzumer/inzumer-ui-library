/** On top of the `md` badge: button feedback and a focus outline that can sit next to the pressed ring. */
export const chipStyles = [
  'transition',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)',
  'disabled:cursor-not-allowed disabled:opacity-50',
].join(' ');

export const chipPressedStyles = 'ring-2 ring-inset ring-current';

export const chipIdleStyles = 'hover:brightness-95';
