import { forwardRef, useId, type HTMLAttributes, type ReactNode } from 'react';
import { Button, RichText } from '@components';
import { cn } from '@utils';
import {
  cookieBannerActionsStyles,
  cookieBannerButtonStyles,
  cookieBannerContentStyles,
  cookieBannerDescriptionStyles,
  cookieBannerStyles,
  cookieBannerTitleStyles,
} from './CookieBanner.styles';

export type CookieBannerProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  title: ReactNode;
  /** What the cookies are for; usually ends with a link to the privacy policy. */
  description: ReactNode;
  acceptLabel: string;
  rejectLabel: string;
  /** Shown only when `onCustomize` is set (opens the preferences, e.g. `CookiePreferences`). */
  customizeLabel?: string;
  onAccept: () => void;
  onReject: () => void;
  onCustomize?: () => void;
  /** Stable ids for the buttons, e.g. for analytics click triggers. */
  buttonIds?: { accept?: string; reject?: string; customize?: string };
};

/**
 * Cookie consent bar pinned to the bottom of the page. Presentational: the consumer decides when
 * to show it and stores the answer. Accept and reject weigh the same visually, so rejecting is as
 * easy as accepting. Not modal: the page stays usable.
 */
export const CookieBanner = forwardRef<HTMLElement, CookieBannerProps>(
  (
    {
      title,
      description,
      acceptLabel,
      rejectLabel,
      customizeLabel,
      onAccept,
      onReject,
      onCustomize,
      buttonIds = {},
      className,
      ...props
    },
    ref,
  ) => {
    const titleId = useId();
    return (
      <section
        ref={ref}
        aria-labelledby={titleId}
        className={cn(cookieBannerStyles, className)}
        {...props}
      >
        <div className={cookieBannerContentStyles}>
          <RichText as="h2" id={titleId} variant="s1" className={cookieBannerTitleStyles}>
            {title}
          </RichText>
          <RichText as="p" variant="p3" className={cookieBannerDescriptionStyles}>
            {description}
          </RichText>
          <div className={cookieBannerActionsStyles}>
            <Button
              id={buttonIds.accept}
              type="button"
              className={cookieBannerButtonStyles}
              onClick={onAccept}
            >
              {acceptLabel}
            </Button>
            <Button
              id={buttonIds.reject}
              type="button"
              variant="secondary"
              className={cookieBannerButtonStyles}
              onClick={onReject}
            >
              {rejectLabel}
            </Button>
            {onCustomize && customizeLabel && (
              <Button
                id={buttonIds.customize}
                type="button"
                variant="ghost"
                className={cookieBannerButtonStyles}
                onClick={onCustomize}
              >
                {customizeLabel}
              </Button>
            )}
          </div>
        </div>
      </section>
    );
  },
);

CookieBanner.displayName = 'CookieBanner';
