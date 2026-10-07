import type { SVGProps } from 'react';

/** X, drawn in the Material Symbols style (outlined, 1.5 stroke). Takes the current text color. */
export const XIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M4.5 4h4.2l10.8 16h-4.2z" />
    <path d="M19.5 4l-6.6 7.3M4.5 20l6.6-7.3" />
  </svg>
);
