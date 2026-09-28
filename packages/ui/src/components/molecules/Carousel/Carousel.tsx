import { Button, Chevron } from '@components';
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
  carouselButtonStyles,
  carouselChevronStyles,
  carouselControlsStyles,
  carouselDotStyles,
  carouselIndicatorsStyles,
  carouselIndicatorStyles,
  carouselSlideStyles,
  carouselSlideWidthStyles,
  carouselSlotStyles,
  carouselStyles,
  carouselTrackStyles,
} from './Carousel.styles';

/** Where a control sits under the cards. */
export type CarouselControlPosition = 'start' | 'center' | 'end';

export type CarouselProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  /** Accessible name of the carousel, e.g. "Featured recipes". */
  label: string;
  /** One child per slide. */
  children: ReactNode;
  previousLabel: string;
  nextLabel: string;
  /** Accessible name of each slide; defaults to "1 / 6". */
  slideLabel?: (index: number, total: number) => string;
  /** Accessible name of each indicator; defaults to "Go to slide 3". */
  goToLabel?: (index: number, total: number) => string;
  /** Accessible name of the indicators group, e.g. "Choose a recipe". */
  indicatorsLabel?: string;
  /** Show the indicators (default `true`). */
  indicators?: boolean;
  /** Side of the indicators (default `center`); next to the buttons when both share a side. */
  indicatorsPosition?: CarouselControlPosition;
  /** Show the previous/next buttons (default `true`); scrolling and indicators still work without them. */
  buttons?: boolean;
  /** Side of the buttons (default `center`, around the indicators). */
  buttonsPosition?: CarouselControlPosition;
  /** Optional visible heading or "See all" link above the cards. */
  header?: ReactNode;
  /** Width classes for each slide (defaults: 80% mobile, 45% tablet, 31% desktop). */
  slideClassName?: string;
  /** Stable ids for the buttons, e.g. for analytics click triggers. */
  buttonIds?: { previous?: string; next?: string };
};

const EDGE_TOLERANCE_PX = 4;

/** Carousel of cards with native snap scroll; optional buttons and indicators on any side. */
export const Carousel = forwardRef<HTMLElement, CarouselProps>(
  (
    {
      label,
      children,
      previousLabel,
      nextLabel,
      slideLabel = (index, total) => `${index + 1} / ${total}`,
      goToLabel = (index) => `Go to slide ${index + 1}`,
      indicatorsLabel,
      indicators = true,
      indicatorsPosition = 'center',
      buttons = true,
      buttonsPosition = 'center',
      header,
      slideClassName,
      buttonIds = {},
      className,
      ...props
    },
    ref,
  ) => {
    const trackRef = useRef<HTMLDivElement | null>(null);
    const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
    const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
    const [edges, setEdges] = useState({ start: true, end: false });
    const [active, setActive] = useState(0);
    const slides = Children.toArray(children);
    const behavior = reducedMotion ? 'auto' : 'smooth';

    /** Offset of a slide from the start of the track's content. */
    const offsetOf = (index: number) =>
      (slideRefs.current[index]?.offsetLeft ?? 0) - (slideRefs.current[0]?.offsetLeft ?? 0);

    const update = useCallback(() => {
      const track = trackRef.current;
      if (!track) {
        return;
      }
      const max = track.scrollWidth - track.clientWidth;
      const atEnd = track.scrollLeft >= max - EDGE_TOLERANCE_PX;
      setEdges({ start: track.scrollLeft <= EDGE_TOLERANCE_PX, end: atEnd });
      const offsets = slideRefs.current.map((slide) =>
        slide ? slide.offsetLeft - (slideRefs.current[0]?.offsetLeft ?? 0) : 0,
      );
      const nearest = offsets.reduce(
        (best, offset, index) =>
          Math.abs(offset - track.scrollLeft) < Math.abs((offsets[best] ?? 0) - track.scrollLeft)
            ? index
            : best,
        0,
      );
      setActive(atEnd && max > 0 ? offsets.length - 1 : nearest);
    }, []);

    useEffect(() => {
      update();
      const track = trackRef.current;
      if (!track || typeof ResizeObserver === 'undefined') {
        return undefined;
      }
      const observer = new ResizeObserver(update);
      observer.observe(track);
      return () => observer.disconnect();
    }, [update, slides.length]);

    const scrollByPage = (direction: 1 | -1) => {
      trackRef.current?.scrollBy({
        left: direction * trackRef.current.clientWidth * 0.9,
        behavior,
      });
    };

    const goTo = (index: number) => {
      trackRef.current?.scrollTo({ left: offsetOf(index), behavior });
    };

    const showIndicators = indicators && slides.length > 1;
    const together = buttons && showIndicators && buttonsPosition === indicatorsPosition;

    const button = (direction: 1 | -1) => (
      <Button
        id={direction < 0 ? buttonIds.previous : buttonIds.next}
        type="button"
        variant="primary"
        size="icon"
        className={carouselButtonStyles}
        aria-label={direction < 0 ? previousLabel : nextLabel}
        disabled={direction < 0 ? edges.start : edges.end}
        onClick={() => scrollByPage(direction)}
      >
        <Chevron direction={direction < 0 ? 'left' : 'right'} className={carouselChevronStyles} />
      </Button>
    );

    const dots = (
      <div role="group" aria-label={indicatorsLabel} className={carouselIndicatorsStyles}>
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={goToLabel(index, slides.length)}
            aria-current={index === active ? 'true' : undefined}
            className={carouselIndicatorStyles}
            onClick={() => goTo(index)}
          >
            <span aria-hidden="true" className={carouselDotStyles({ active: index === active })} />
          </button>
        ))}
      </div>
    );

    return (
      <section
        ref={ref}
        aria-roledescription="carousel"
        aria-label={label}
        className={cn(carouselStyles, className)}
        {...props}
      >
        {header}
        <div
          ref={trackRef}
          className={carouselTrackStyles}
          data-carousel-track=""
          onScroll={update}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              ref={(node) => {
                slideRefs.current[index] = node;
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={slideLabel(index, slides.length)}
              className={cn(carouselSlideStyles, carouselSlideWidthStyles, slideClassName)}
            >
              {slide}
            </div>
          ))}
        </div>
        {(buttons || showIndicators) && (
          <div className={carouselControlsStyles}>
            {together ? (
              <div className={carouselSlotStyles({ position: buttonsPosition })}>
                {button(-1)}
                {dots}
                {button(1)}
              </div>
            ) : (
              <>
                {buttons && (
                  <div className={carouselSlotStyles({ position: buttonsPosition })}>
                    {button(-1)}
                    {button(1)}
                  </div>
                )}
                {showIndicators && (
                  <div className={carouselSlotStyles({ position: indicatorsPosition })}>{dots}</div>
                )}
              </>
            )}
          </div>
        )}
      </section>
    );
  },
);

Carousel.displayName = 'Carousel';
