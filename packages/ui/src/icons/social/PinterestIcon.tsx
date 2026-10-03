import type { SVGProps } from 'react';

/** Pinterest, drawn in the Material Symbols style (outlined, 1.5 stroke). Takes the current text color. */
export const PinterestIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M11 20.5l1.6-6.5" />
    <path d="M8.2 13.6A4.6 4.6 0 0 1 7.5 11a4.5 4.5 0 0 1 9 0c0 2.7-1.6 4.5-3.6 4.5-1.2 0-2-.8-1.9-1.9l.8-3.1" />
  </svg>
);
