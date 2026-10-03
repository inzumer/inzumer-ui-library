import type { SVGProps } from 'react';

/** YouTube, drawn in the Material Symbols style (outlined, 1.5 stroke). Takes the current text color. */
export const YouTubeIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <rect x="2.5" y="5" width="19" height="14" rx="4" />
    <path d="M10 9.25v5.5l4.75-2.75z" />
  </svg>
);
