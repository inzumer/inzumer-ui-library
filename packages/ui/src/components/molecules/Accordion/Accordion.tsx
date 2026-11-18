import { Icon } from '@components';
import { cn, idAttributes } from '@utils';
import { forwardRef, type DetailsHTMLAttributes, type ReactNode } from 'react';
import {
  accordionChevronStyles,
  accordionContentStyles,
  accordionStyles,
  accordionSummaryStyles,
} from './Accordion.styles';

export type AccordionProps = Omit<DetailsHTMLAttributes<HTMLDetailsElement>, 'title'> & {
  summary: ReactNode;
  summaryId?: string;
  summaryClassName?: string;
  contentClassName?: string;
};

/** Collapsible section on native `<details>`: accessible, find-in-page, no JS to toggle. */
export const Accordion = forwardRef<HTMLDetailsElement, AccordionProps>(
  (
    { summary, summaryId, summaryClassName, contentClassName, className, children, ...props },
    ref,
  ) => (
    <details ref={ref} className={cn(accordionStyles, className)} {...props}>
      <summary
        {...idAttributes(summaryId)}
        className={cn(accordionSummaryStyles, summaryClassName)}
      >
        {summary}
        <Icon name="expand-more" className={accordionChevronStyles} />
      </summary>
      <div className={cn(accordionContentStyles, contentClassName)}>{children}</div>
    </details>
  ),
);

Accordion.displayName = 'Accordion';
