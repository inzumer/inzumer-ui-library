import type { SVGProps } from 'react';

/** TikTok, drawn in the Material Symbols style (outlined, 1.5 stroke). Takes the current text color. */
export const TikTokIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M14 3.5v11a3.5 3.5 0 1 1-3.5-3.5" />
    <path d="M14 3.5a4.5 4.5 0 0 0 4.5 4.5" />
  </svg>
);
