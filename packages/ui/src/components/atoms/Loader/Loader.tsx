import { RichText } from '@components';
import { cn } from '@utils';
import type { VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { loaderMarkStyles, loaderRingStyles, loaderStyles } from './Loader.styles';

export type LoaderProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> &
  VariantProps<typeof loaderStyles> &
  VariantProps<typeof loaderMarkStyles> & {
    /** What is loading; read by screen readers, and shown with `showLabel`. */
    label: string;
    showLabel?: boolean;
    /** Your own mark (a brand logo image or SVG); a ring by default. */
    mark?: ReactNode;
  };

/** Loading indicator: a spinning or pulsing mark (the brand's or a ring) with an accessible label. */
export const Loader = forwardRef<HTMLSpanElement, LoaderProps>(
  ({ label, showLabel = false, mark, effect, size, speed, layout, className, ...props }, ref) => (
    <span
      ref={ref}
      role="status"
      aria-live="polite"
      className={cn(loaderStyles({ layout }), className)}
      {...props}
    >
      <span aria-hidden="true" className={loaderMarkStyles({ effect, size, speed })}>
        {mark ?? <span className={loaderRingStyles} />}
      </span>
      <RichText as="span" variant="p3" className={showLabel ? 'text-inherit' : 'sr-only'}>
        {label}
      </RichText>
    </span>
  ),
);

Loader.displayName = 'Loader';
