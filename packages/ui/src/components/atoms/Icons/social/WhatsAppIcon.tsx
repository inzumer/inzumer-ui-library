import type { SVGProps } from 'react';

/** WhatsApp, drawn in the Material Symbols style (outlined, 1.5 stroke). Takes the current text color. */
export const WhatsAppIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M4 20l1.3-3.7A8.5 8.5 0 1 1 8.4 19.3z" />
    <path d="M9 8.5c0 3.6 2.9 6.5 6.5 6.5l.8-1.6-2-1-1 .9a4.6 4.6 0 0 1-2.6-2.6l.9-1-1-2z" />
  </svg>
);
