import { Button } from '@components';
import { useMediaQuery } from '@hooks';
import { cn } from '@utils';
import {
  Children,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import {
  carouselControlsStyles,
  carouselHeaderStyles,
  carouselSlideStyles,
  carouselSlideWidthStyles,
  carouselStyles,
  carouselTrackStyles,
} from './Carousel.styles';

export type CarouselProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  /** Accessible name of the carousel, e.g. "Featured recipes". */
  label: string;
  /** One child per slide. */
  children: ReactNode;
  previousLabel: string;
  nextLabel: string;
  /** Accessible name of each slide; defaults to "1 / 6". */
  slideLabel?: (index: number, total: number) => string;
  /** Optional visible heading or link shown next to the buttons. */
  header?: ReactNode;
  /** Width classes for each slide (defaults: 80% mobile, 45% tablet, 31% desktop). */
  slideClassName?: string;
  /** Stable ids for the buttons, e.g. for analytics click triggers. */
  buttonIds?: { previous?: string; next?: string };
};

const EDGE_TOLERANCE_PX = 4;

/**
 * Horizontal carousel of cards: native scroll with snap (touch and trackpad drag work as usual),
 * previous/next buttons that scroll one page; tabbing to a card scrolls it into view. No autoplay;
 * the smooth scroll is turned off when the person prefers reduced motion.
 */
export const Carousel = forwardRef<HTMLElement, CarouselProps>(
  (
    {
      label,
      children,
      previousLabel,
      nextLabel,
      slideLabel = (index, total) => `${index + 1} / ${total}`,
      header,
      slideClassName,
      buttonIds = {},
      className,
      ...props
    },
    ref,
  ) => {
    const trackRef = useRef<HTMLDivElement | null>(null);
    const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
    const [edges, setEdges] = useState({ start: true, end: false });
    const slides = Children.toArray(children);

    const updateEdges = useCallback(() => {
      const track = trackRef.current;
      if (!track) {
        return;
      }
      const max = track.scrollWidth - track.clientWidth;
      setEdges({
        start: track.scrollLeft <= EDGE_TOLERANCE_PX,
        end: track.scrollLeft >= max - EDGE_TOLERANCE_PX,
      });
    }, []);

    useEffect(() => {
      updateEdges();
      const track = trackRef.current;
      if (!track || typeof ResizeObserver === 'undefined') {
        return undefined;
      }
      const observer = new ResizeObserver(updateEdges);
      observer.observe(track);
      return () => observer.disconnect();
    }, [updateEdges, slides.length]);

    const scrollByPage = (direction: 1 | -1) => {
      const track = trackRef.current;
      if (!track) {
        return;
      }
      track.scrollBy({
        left: direction * track.clientWidth * 0.9,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    };

    return (
      <section
        ref={ref}
        aria-roledescription="carousel"
        aria-label={label}
        className={cn(carouselStyles, className)}
        {...props}
      >
        <div className={carouselHeaderStyles}>
          {header}
          <div className={carouselControlsStyles}>
            <Button
              id={buttonIds.previous}
              type="button"
              variant="secondary"
              size="icon"
              aria-label={previousLabel}
              disabled={edges.start}
              onClick={() => scrollByPage(-1)}
            >
              <span aria-hidden="true">‹</span>
            </Button>
            <Button
              id={buttonIds.next}
              type="button"
              variant="secondary"
              size="icon"
              aria-label={nextLabel}
              disabled={edges.end}
              onClick={() => scrollByPage(1)}
            >
              <span aria-hidden="true">›</span>
            </Button>
          </div>
        </div>
        <div
          ref={trackRef}
          className={carouselTrackStyles}
          data-carousel-track=""
          onScroll={updateEdges}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              role="group"
              aria-roledescription="slide"
              aria-label={slideLabel(index, slides.length)}
              className={cn(carouselSlideStyles, carouselSlideWidthStyles, slideClassName)}
            >
              {slide}
            </div>
          ))}
        </div>
      </section>
    );
  },
);

Carousel.displayName = 'Carousel';
