import { cn } from '@utils';
import type { VariantProps } from 'class-variance-authority';
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { iconLinkStyles } from './IconLink.styles';

export type IconLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> &
  VariantProps<typeof iconLinkStyles> & {
    href: string;
    /** Accessible name: the link only shows the icon. */
    label: string;
    /** An SVG; it takes half the button and the current text color. */
    icon: ReactNode;
    /** Opens in a new tab with a safe `rel`. */
    external?: boolean;
  };

/** A round link that only shows an icon (a social network, a shortcut), with a 44px touch target or more. */
export const IconLink = forwardRef<HTMLAnchorElement, IconLinkProps>(
  ({ label, icon, size, variant, external, className, target, rel, ...props }, ref) => (
    <a
      ref={ref}
      aria-label={label}
      title={label}
      target={external ? '_blank' : target}
      rel={external ? 'noopener noreferrer' : rel}
      className={cn(iconLinkStyles({ size, variant }), className)}
      {...props}
    >
      {icon}
    </a>
  ),
);

IconLink.displayName = 'IconLink';
