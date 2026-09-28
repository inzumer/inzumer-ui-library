import { Link, RichText } from '@components';
import { cn } from '@utils';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import {
  breadcrumbsCurrentStyles,
  breadcrumbsItemStyles,
  breadcrumbsLinkStyles,
  breadcrumbsListStyles,
  breadcrumbsSeparatorStyles,
  breadcrumbsStyles,
} from './Breadcrumbs.styles';

export interface BreadcrumbItem {
  id?: string;
  label: ReactNode;
  href: string;
}

export type BreadcrumbsProps = HTMLAttributes<HTMLElement> & {
  items: BreadcrumbItem[];
  current: ReactNode;
  separator?: ReactNode;
};

export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ items, current, separator = '/', className, ...props }, ref) => (
    <nav ref={ref} aria-label="Breadcrumb" className={cn(breadcrumbsStyles, className)} {...props}>
      <ol className={breadcrumbsListStyles}>
        {items.map((item, index) => (
          <li key={item.id ?? index} className={breadcrumbsItemStyles}>
            <Link href={item.href} underline="none" className={breadcrumbsLinkStyles}>
              <RichText as="span" variant="s3">
                {item.label}
              </RichText>
            </Link>
            <span aria-hidden className={breadcrumbsSeparatorStyles}>
              {separator}
            </span>
          </li>
        ))}
        <RichText as="li" aria-current="page" variant="s3" className={breadcrumbsCurrentStyles}>
          {current}
        </RichText>
      </ol>
    </nav>
  ),
);

Breadcrumbs.displayName = 'Breadcrumbs';
