import { Icon } from '@components';
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

/** Collapsible section on native `<details>`: accessible, find-in-page, no JS to toggle. */
export const Accordion = forwardRef<HTMLDetailsElement, AccordionProps>(
  ({ summary, summaryClassName, contentClassName, className, children, ...props }, ref) => (
    <details ref={ref} className={cn(accordionStyles, className)} {...props}>
      <summary className={cn(accordionSummaryStyles, summaryClassName)}>
        {summary}
        <Icon name="expand-more" className={accordionChevronStyles} />
      </summary>
      <div className={cn(accordionContentStyles, contentClassName)}>{children}</div>
    </details>
  ),
);

Accordion.displayName = 'Accordion';
