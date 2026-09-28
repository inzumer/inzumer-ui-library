import { cn } from '@utils';
import type { VariantProps } from 'class-variance-authority';
import { forwardRef, type AnchorHTMLAttributes, type ElementType } from 'react';
import { linkStyles } from './Link.styles';

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof linkStyles> & {
    as?: ElementType;
    external?: boolean;
  };

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ as: Component = 'a', external, underline, className, target, rel, ...props }, ref) => {
    const isExternal = external ?? target === '_blank';

    return (
      <Component
        ref={ref}
        target={isExternal ? '_blank' : target}
        rel={isExternal ? 'noopener noreferrer' : rel}
        className={cn(linkStyles({ underline }), className)}
        {...props}
      />
    );
  },
);

Link.displayName = 'Link';
