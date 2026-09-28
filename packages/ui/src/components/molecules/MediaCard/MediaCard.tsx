import { Image, RichText } from '@components';
import { cn } from '@utils';
import { type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import {
  mediaCardActionsStyles,
  mediaCardBadgeStyles,
  mediaCardContentStyles,
  mediaCardImageStyles,
  mediaCardLinkStyles,
  mediaCardScrimStyles,
  mediaCardStyles,
  mediaCardSubtitleStyles,
  mediaCardTitleStyles,
} from './MediaCard.styles';

export type MediaCardProps = Omit<HTMLAttributes<HTMLElement>, 'title'> &
  VariantProps<typeof mediaCardStyles> & {
    /** Image URL; or pass your own element (e.g. an optimized `<picture>`) in `media`. */
    src?: string;
    /** Describes the photo; use `''` if it is only decorative. */
    alt?: string;
    media?: ReactNode;
    title: ReactNode;
    /** One short line under the title (time, category, cost per serving…). */
    subtitle?: ReactNode;
    /** Heading level of the title in the page outline. */
    headingLevel?: 'h2' | 'h3' | 'h4';
    /** Makes the whole card a link, named by the title. */
    href?: string;
    linkId?: string;
    /** Small label on the top-left corner ("New", "Featured"). */
    badge?: ReactNode;
    /** Floating buttons on the top-right corner (save, share); they stay above the link. */
    actions?: ReactNode;
  };

/**
 * Vertical card with a full-bleed photo, a dark gradient from the bottom for the title and
 * subtitle, an optional badge and floating actions. For recipes, articles and guides; pair it with
 * `Carousel` for rows of cards.
 */
export const MediaCard = forwardRef<HTMLElement, MediaCardProps>(
  (
    {
      src,
      alt = '',
      media,
      title,
      subtitle,
      headingLevel = 'h3',
      href,
      linkId,
      badge,
      actions,
      aspect,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <article ref={ref} className={cn(mediaCardStyles({ aspect }), className)} {...props}>
        {media ?? (src && <Image src={src} alt={alt} className={mediaCardImageStyles} />)}
        <div aria-hidden="true" className={mediaCardScrimStyles} />
        <div className={mediaCardContentStyles}>
          <RichText as={headingLevel} variant="s1" className={mediaCardTitleStyles}>
            {href ? (
              <a id={linkId} href={href} className={mediaCardLinkStyles}>
                {title}
              </a>
            ) : (
              title
            )}
          </RichText>
          {subtitle && (
            <RichText as="p" variant="p3" className={mediaCardSubtitleStyles}>
              {subtitle}
            </RichText>
          )}
        </div>
        {badge && <span className={mediaCardBadgeStyles}>{badge}</span>}
        {actions && <div className={mediaCardActionsStyles}>{actions}</div>}
      </article>
    );
  },
);

MediaCard.displayName = 'MediaCard';
