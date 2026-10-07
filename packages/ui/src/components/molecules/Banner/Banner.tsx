import { RichText, type RichTextVariant } from '@components';
import { cn } from '@utils';
import type { VariantProps } from 'class-variance-authority';
import { forwardRef, useId, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import {
  BANNER_BACKGROUNDS,
  bannerActionsStyles,
  bannerContentStyles,
  bannerDescriptionStyles,
  bannerImageBackground,
  bannerMediaStyles,
  bannerStyles,
  bannerTextStyles,
} from './Banner.styles';

export type BannerAppearance = NonNullable<VariantProps<typeof bannerStyles>['appearance']>;

export type BannerProps = Omit<HTMLAttributes<HTMLElement>, 'title'> &
  VariantProps<typeof bannerStyles> & {
    title: ReactNode;
    description?: ReactNode;
    /** Calls to action (`Button`, `Link`…), each with its own tracking `id`. */
    actions?: ReactNode;
    /** Side content, such as an `Image`. */
    media?: ReactNode;
    /** Decorative photo behind the text, for `appearance="image"`. */
    image?: string;
    titleVariant?: RichTextVariant;
  };

const backgroundFor = (appearance: BannerAppearance, image?: string) => {
  if (appearance === 'image' && image) {
    return bannerImageBackground(image);
  }

  return appearance === 'gradient' || appearance === 'aurora'
    ? BANNER_BACKGROUNDS[appearance]
    : undefined;
};

export const Banner = forwardRef<HTMLElement, BannerProps>(
  (
    {
      title,
      description,
      actions,
      media,
      image,
      appearance = 'subtle',
      align = 'start',
      titleVariant = 'h2',
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const titleId = useId();
    const background = backgroundFor(appearance ?? 'subtle', image);

    return (
      <section
        ref={ref}
        aria-labelledby={titleId}
        className={cn(bannerStyles({ appearance, align }), className)}
        style={{ ...(background && { backgroundImage: background }), ...style } as CSSProperties}
        {...props}
      >
        <div className={bannerContentStyles({ align })}>
          <RichText id={titleId} variant={titleVariant} bold className={bannerTextStyles}>
            {title}
          </RichText>
          {description && (
            <RichText variant="p1" className={bannerDescriptionStyles}>
              {description}
            </RichText>
          )}
          {actions && <div className={bannerActionsStyles}>{actions}</div>}
        </div>
        {media && <div className={bannerMediaStyles}>{media}</div>}
      </section>
    );
  },
);

Banner.displayName = 'Banner';
