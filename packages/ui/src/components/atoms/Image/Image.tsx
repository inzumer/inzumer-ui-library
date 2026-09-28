import { cn } from '@utils';
import type { VariantProps } from 'class-variance-authority';
import { forwardRef, type ImgHTMLAttributes } from 'react';
import { imageStyles } from './Image.styles';

export type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt'> &
  VariantProps<typeof imageStyles> & {
    alt: string;
    lazy?: boolean;
  };

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ className, fit, rounded, lazy = true, loading, alt, ...props }, ref) => (
    <img
      ref={ref}
      alt={alt}
      loading={loading ?? (lazy ? 'lazy' : 'eager')}
      className={cn(imageStyles({ fit, rounded }), className)}
      {...props}
    />
  ),
);

Image.displayName = 'Image';
