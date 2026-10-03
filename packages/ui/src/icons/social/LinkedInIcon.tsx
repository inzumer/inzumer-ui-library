import type { SVGProps } from 'react';

/** LinkedIn, drawn in the Material Symbols style (outlined, 1.5 stroke). Takes the current text color. */
export const LinkedInIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
    <path d="M8 10.5V17M12 17v-6.5M12 13.5a3 3 0 0 1 6 0V17" />
    <circle cx="8" cy="7.5" r="0.75" fill="currentColor" stroke="none" />
  </svg>
);
