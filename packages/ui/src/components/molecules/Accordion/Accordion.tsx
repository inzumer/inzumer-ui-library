import { cn } from '@utils';
import { forwardRef, type DetailsHTMLAttributes, type ReactNode } from 'react';
import {
  accordionChevronStyles,
  accordionContentStyles,
  accordionStyles,
  accordionSummaryStyles,
} from './Accordion.styles';

export type AccordionProps = Omit<DetailsHTMLAttributes<HTMLDetailsElement>, 'title'> & {
  /** Always-visible header that toggles the content. */
  summary: ReactNode;
  /** Extra classes for the summary row (e.g. to match a navigation link). */
  summaryClassName?: string;
  /** Extra classes for the content wrapper. */
  contentClassName?: string;
};

/**
 * A collapsible section built on native `<details>`/`<summary>`: keyboard and screen reader support,
 * find-in-page and no JavaScript needed to toggle. Stack several for an accordion list; pass
 * `open` to start expanded (e.g. the section that contains the current page).
 */
export const Accordion = forwardRef<HTMLDetailsElement, AccordionProps>(
  ({ summary, summaryClassName, contentClassName, className, children, ...props }, ref) => (
    <details ref={ref} className={cn(accordionStyles, className)} {...props}>
      <summary className={cn(accordionSummaryStyles, summaryClassName)}>
        {summary}
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={accordionChevronStyles}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <div className={cn(accordionContentStyles, contentClassName)}>{children}</div>
    </details>
  ),
);

Accordion.displayName = 'Accordion';
