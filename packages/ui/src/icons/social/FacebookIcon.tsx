import type { SVGProps } from 'react';

/** Facebook, drawn in the Material Symbols style (outlined, 1.5 stroke). Takes the current text color. */
export const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M15.5 7.5H14a2.5 2.5 0 0 0-2.5 2.5v11M9 13h5.5" />
  </svg>
);
