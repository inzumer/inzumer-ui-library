import { cn } from '@utils';
import type { VariantProps } from 'class-variance-authority';
import { forwardRef, type ElementType, type HTMLAttributes } from 'react';
import { richTextStyles } from './RichText.styles';

export type RichTextVariant = NonNullable<VariantProps<typeof richTextStyles>['variant']>;

export const elementByVariant: Record<RichTextVariant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  s1: 'span',
  s2: 'span',
  s3: 'span',
  s4: 'span',
  p1: 'p',
  p2: 'p',
  p3: 'p',
  p4: 'p',
};

export type RichTextProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof richTextStyles> & {
    as?: ElementType;
    bold?: boolean;
  };

export const RichText = forwardRef<HTMLElement, RichTextProps>(
  ({ as, variant, weight, bold, className, ...props }, ref) => {
    const resolvedVariant = variant ?? 'p2';
    const Element = as ?? elementByVariant[resolvedVariant];

    return (
      <Element
        ref={ref}
        className={cn(
          richTextStyles({ variant: resolvedVariant, weight: bold ? 'bold' : weight }),
          className,
        )}
        {...props}
      />
    );
  },
);

RichText.displayName = 'RichText';
