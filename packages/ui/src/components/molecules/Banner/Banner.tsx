import { RichText, type RichTextVariant } from '@components';
import { cn } from '@utils';
import type { VariantProps } from 'class-variance-authority';
import { forwardRef, useId, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import {
  BANNER_BACKGROUNDS,
  BANNER_IMAGE_ALIGN,
  BANNER_IMAGE_PLACEMENT,
  bannerActionsStyles,
  bannerContentStyles,
  bannerDescriptionStyles,
  bannerImageBackground,
  bannerImageContentStyles,
  bannerImageStyles,
  bannerImageTextStyles,
  bannerMediaStyles,
  bannerStyles,
  bannerTextStyles,
  type BannerOverlayColor,
  type BannerOverlayPosition,
} from './Banner.styles';

export type { BannerOverlayColor, BannerOverlayPosition } from './Banner.styles';

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
    /** Veil color over the photo: black, white or a token scale. */
    overlayColor?: BannerOverlayColor;
    /** Solid side of the veil, where the text sits. */
    overlayPosition?: BannerOverlayPosition;
    titleVariant?: RichTextVariant;
  };

const backgroundFor = (
  appearance: BannerAppearance,
  image: string | undefined,
  color: BannerOverlayColor,
  position: BannerOverlayPosition,
) => {
  if (appearance === 'image' && image) {
    return bannerImageBackground(image, color, position);
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
      overlayColor = 'black',
      overlayPosition = 'left',
      appearance = 'subtle',
      align,
      titleVariant = 'h2',
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const titleId = useId();
    const resolvedAppearance = appearance ?? 'subtle';
    const isImage = resolvedAppearance === 'image';
    const resolvedAlign = align ?? (isImage ? BANNER_IMAGE_ALIGN[overlayPosition] : 'start');
    const background = backgroundFor(resolvedAppearance, image, overlayColor, overlayPosition);

    return (
      <section
        ref={ref}
        aria-labelledby={titleId}
        className={cn(
          bannerStyles({ appearance, align: resolvedAlign }),
          isImage && [
            bannerImageStyles,
            BANNER_IMAGE_PLACEMENT[overlayPosition],
            bannerImageTextStyles(overlayColor),
          ],
          className,
        )}
        style={{ ...(background && { backgroundImage: background }), ...style } as CSSProperties}
        {...props}
      >
        <div
          className={cn(
            bannerContentStyles({ align: resolvedAlign }),
            isImage && bannerImageContentStyles,
          )}
        >
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
