import type { SVGProps } from 'react';

/** Instagram, drawn in the Material Symbols style (outlined, 1.5 stroke). Takes the current text color. */
export const InstagramIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.25" cy="6.75" r="0.75" fill="currentColor" stroke="none" />
  </svg>
);
