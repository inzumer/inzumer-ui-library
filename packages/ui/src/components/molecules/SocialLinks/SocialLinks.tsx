import { cn } from '@utils';
import type { VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { IconLink, type IconLinkProps } from '@components/atoms/IconLink';
import { socialLinksStyles } from './SocialLinks.styles';

export interface SocialLink {
  href: string;
  /** Network name: the accessible name of the button. */
  label: string;
  icon: ReactNode;
}

export interface SocialLinksProps
  extends Pick<IconLinkProps, 'size' | 'variant'>, VariantProps<typeof socialLinksStyles> {
  links: SocialLink[];
  /** Name of the list for screen readers. */
  label?: string;
  className?: string;
}

/** A row of icon buttons to the brand's networks, for footers; each opens in a new tab. */
export const SocialLinks = ({
  links,
  align,
  label = 'Social networks',
  size,
  variant,
  className,
}: SocialLinksProps) => (
  <ul aria-label={label} className={cn(socialLinksStyles({ align }), className)}>
    {links.map((link) => (
      <li key={link.href}>
        <IconLink {...link} size={size} variant={variant} external />
      </li>
    ))}
  </ul>
);
