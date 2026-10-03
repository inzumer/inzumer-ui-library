import { cn } from '@utils';
import type { ReactNode } from 'react';
import { IconLink, type IconLinkProps } from '@components/atoms/IconLink';

export interface SocialLink {
  href: string;
  /** Network name: the accessible name of the button. */
  label: string;
  icon: ReactNode;
}

export interface SocialLinksProps extends Pick<IconLinkProps, 'size' | 'variant'> {
  links: SocialLink[];
  /** Where the row sits: `start` (default), `center` or `end`. */
  align?: 'start' | 'center' | 'end';
  /** Name of the list for screen readers. */
  label?: string;
  className?: string;
}

const ALIGN = { start: 'justify-start', center: 'justify-center', end: 'justify-end' } as const;

/** A row of icon buttons to the brand's networks, for footers; each opens in a new tab. */
export const SocialLinks = ({
  links,
  align = 'start',
  label = 'Social networks',
  size,
  variant,
  className,
}: SocialLinksProps) => (
  <ul aria-label={label} className={cn('flex flex-wrap gap-2', ALIGN[align], className)}>
    {links.map((link) => (
      <li key={link.href}>
        <IconLink {...link} size={size} variant={variant} external />
      </li>
    ))}
  </ul>
);
