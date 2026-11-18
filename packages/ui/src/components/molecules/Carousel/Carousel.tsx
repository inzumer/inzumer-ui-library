import { Button, Icon, RichText } from '@components';
import { useHorizontalScroll } from '@hooks';
import { cn, idAttributes } from '@utils';
import { Children, forwardRef, useRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import {
  carouselButtonStyles,
  carouselChevronStyles,
  carouselControlsStyles,
  carouselCounterCurrentStyles,
  carouselCounterStyles,
  carouselDotStyles,
  carouselIndicatorsStyles,
  carouselIndicatorStyles,
  carouselSlideStyles,
  carouselSlideWidthStyles,
  carouselSlotStyles,
  carouselStyles,
  carouselTrackStyles,
} from './Carousel.styles';

export type CarouselControlPosition = 'start' | 'center' | 'end';

export type CarouselIndicatorStyle = 'dots' | 'counter';

export type CarouselProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  label: string;
  children: ReactNode;
  previousLabel: string;
  nextLabel: string;
  slideLabel?: (index: number, total: number) => string;
  goToLabel?: (index: number, total: number) => string;
  indicatorsLabel?: string;
  indicators?: boolean;
  indicatorStyle?: CarouselIndicatorStyle;
  indicatorsPosition?: CarouselControlPosition;
  buttons?: boolean;
  buttonsPosition?: CarouselControlPosition;
  header?: ReactNode;
  slideClassName?: string;
  buttonIds?: { previous?: string; next?: string; indicator?: (index: number) => string };
};

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
      indicatorStyle = 'dots',
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
    const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
    const [active, setActive] = useState(0);
    const slides = Children.toArray(children);

    const offsetOf = (index: number) =>
      (slideRefs.current[index]?.offsetLeft ?? 0) - (slideRefs.current[0]?.offsetLeft ?? 0);

    const {
      ref: trackRef,
      edges,
      update,
      scrollByPage,
      scrollToOffset,
    } = useHorizontalScroll((track, { end: atEnd }) => {
      const max = track.scrollWidth - track.clientWidth;
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
    });

    const goTo = (index: number) => scrollToOffset(offsetOf(index));

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
        <Icon
          name={direction < 0 ? 'chevron-left' : 'chevron-right'}
          className={carouselChevronStyles}
        />
      </Button>
    );

    const pad = (value: number) => String(value).padStart(2, '0');

    const counter = (
      <RichText as="p" variant="s4" aria-live="polite" className={carouselCounterStyles}>
        <span aria-hidden="true">
          <span className={carouselCounterCurrentStyles}>{pad(active + 1)}</span> /{' '}
          {pad(slides.length)}
        </span>
        <span className="sr-only">{slideLabel(active, slides.length)}</span>
      </RichText>
    );

    const dots =
      indicatorStyle === 'counter' ? (
        counter
      ) : (
        <div role="group" aria-label={indicatorsLabel} className={carouselIndicatorsStyles}>
          {slides.map((_, index) => (
            <button
              key={index}
              {...idAttributes(buttonIds.indicator?.(index))}
              type="button"
              aria-label={goToLabel(index, slides.length)}
              aria-current={index === active ? 'true' : undefined}
              className={carouselIndicatorStyles}
              onClick={() => goTo(index)}
            >
              <span
                aria-hidden="true"
                className={carouselDotStyles({ active: index === active })}
              />
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
