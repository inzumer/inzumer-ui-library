import { Image, RichText } from '@components';
import { cn } from '@utils';
import { type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import {
  showcaseActionsStyles,
  showcaseBadgeStyles,
  showcaseContentStyles,
  showcaseImageStyles,
  showcaseLinkStyles,
  showcaseScrimStyles,
  showcaseStyles,
  showcaseSubtitleStyles,
  showcaseTitleStyles,
} from './Showcase.styles';

export type ShowcaseProps = Omit<HTMLAttributes<HTMLElement>, 'title'> &
  VariantProps<typeof showcaseStyles> & {
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
    /** Small label right above the title ("New", "Featured"). */
    badge?: ReactNode;
    /** Floating buttons on the top-right corner (save, share); they stay above the link. */
    actions?: ReactNode;
  };

/** Photo card with a bottom gradient for badge, title and subtitle, and floating actions. */
export const Showcase = forwardRef<HTMLElement, ShowcaseProps>(
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
      <article ref={ref} className={cn(showcaseStyles({ aspect }), className)} {...props}>
        {media ?? (src && <Image src={src} alt={alt} className={showcaseImageStyles} />)}
        <div aria-hidden="true" className={showcaseScrimStyles} />
        <div className={showcaseContentStyles}>
          {badge && <span className={showcaseBadgeStyles}>{badge}</span>}
          <RichText as={headingLevel} variant="s1" className={showcaseTitleStyles}>
            {href ? (
              <a id={linkId} href={href} className={showcaseLinkStyles}>
                {title}
              </a>
            ) : (
              title
            )}
          </RichText>
          {subtitle && (
            <RichText as="p" variant="p3" className={showcaseSubtitleStyles}>
              {subtitle}
            </RichText>
          )}
        </div>
        {actions && <div className={showcaseActionsStyles}>{actions}</div>}
      </article>
    );
  },
);

Showcase.displayName = 'Showcase';

/** @deprecated Renamed to `Showcase`; `MediaCard` will be removed in the next major version. */
export const MediaCard = Showcase;
/** @deprecated Renamed to `ShowcaseProps`. */
export type MediaCardProps = ShowcaseProps;
