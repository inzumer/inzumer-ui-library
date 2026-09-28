import { RichText } from '@components';
import { cn } from '@utils';
import { forwardRef, type ForwardedRef, type HTMLAttributes } from 'react';
import {
  cardContentStyles,
  cardDescriptionStyles,
  cardFooterStyles,
  cardHeaderStyles,
  cardStyles,
  cardTitleStyles,
} from './Card.styles';

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  noPadding?: boolean;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, noPadding = false, ...props }, ref) => (
    <div ref={ref} className={cn(cardStyles({ padding: !noPadding }), className)} {...props} />
  ),
);
Card.displayName = 'Card';

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(cardHeaderStyles, className)} {...props} />
  ),
);
CardHeader.displayName = 'CardHeader';

export type CardTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as = 'h3', ...props }, ref) => (
    <RichText
      ref={ref as ForwardedRef<HTMLElement>}
      as={as}
      variant="s1"
      className={cn(cardTitleStyles, className)}
      {...props}
    />
  ),
);
CardTitle.displayName = 'CardTitle';

export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <RichText
      ref={ref as ForwardedRef<HTMLElement>}
      as="p"
      variant="p3"
      className={cn(cardDescriptionStyles, className)}
      {...props}
    />
  ),
);
CardDescription.displayName = 'CardDescription';

export type CardContentProps = HTMLAttributes<HTMLDivElement>;

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(cardContentStyles, className)} {...props} />
  ),
);
CardContent.displayName = 'CardContent';

export type CardFooterProps = HTMLAttributes<HTMLDivElement>;

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(cardFooterStyles, className)} {...props} />
  ),
);
CardFooter.displayName = 'CardFooter';
