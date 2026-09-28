import { Image, RichText } from '@components';
import { cn } from '@utils';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import {
  timelineDescriptionListStyles,
  timelineDescriptionStyles,
  timelineImageStyles,
  timelineItemStyles,
  timelineMediaStyles,
  timelineNodeStyles,
  timelineStyles,
  timelineTitleStyles,
} from './Timeline.styles';

export interface TimelineItem {
  id?: string;
  title: ReactNode;
  description: ReactNode[];
  /** Optional photo of the entry, shown under its text (lazy loaded). */
  image?: { src: string; alt: string };
  /** Your own media element instead of `image` (e.g. an optimized `<picture>`). */
  media?: ReactNode;
}

export type TimelineProps = HTMLAttributes<HTMLUListElement> & {
  items: TimelineItem[];
};

export const Timeline = forwardRef<HTMLUListElement, TimelineProps>(
  ({ items, className, ...props }, ref) => (
    <ul ref={ref} className={cn(timelineStyles, className)} {...props}>
      {items.map((item, index) => (
        <li key={item.id ?? index} className={timelineItemStyles}>
          <span className={timelineNodeStyles} />
          <RichText as="p" variant="p2" className={timelineTitleStyles}>
            {item.title}
          </RichText>
          <div className={timelineDescriptionListStyles}>
            {item.description.map((description, descriptionIndex) => (
              <RichText
                key={descriptionIndex}
                as="p"
                variant="p3"
                className={timelineDescriptionStyles}
              >
                {description}
              </RichText>
            ))}
          </div>
          {(item.media ?? item.image) && (
            <div className={timelineMediaStyles}>
              {item.media ??
                (item.image && (
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    className={timelineImageStyles}
                  />
                ))}
            </div>
          )}
        </li>
      ))}
    </ul>
  ),
);

Timeline.displayName = 'Timeline';
