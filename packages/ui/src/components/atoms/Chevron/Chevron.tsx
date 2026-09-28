import type { SVGProps } from 'react';

const PATHS = {
  down: 'm6 9 6 6 6-6',
  up: 'm18 15-6-6-6 6',
  left: 'm15 18-6-6 6-6',
  right: 'm9 18 6-6-6-6',
} as const;

export type ChevronProps = Omit<SVGProps<SVGSVGElement>, 'children'> & {
  direction?: keyof typeof PATHS;
};

/** Decorative chevron drawn with `currentColor` (selects, accordions, carousels). */
export const Chevron = ({ direction = 'down', ...props }: ChevronProps) => (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d={PATHS[direction]} />
  </svg>
);
