import { Button, Icon, Image, RichText } from '@components';
import { useDialogLayer, useMediaQuery } from '@hooks';
import { cn, idAttributes } from '@utils';
import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react';
import {
  storiesActionStyles,
  storiesBarFillStyles,
  storiesBarsStyles,
  storiesBarStyles,
  storiesContentStyles,
  storiesControlsStyles,
  storiesControlStyles,
  storiesDescriptionStyles,
  storiesHeaderStyles,
  storiesImageStyles,
  storiesNavButtonStyles,
  storiesNavStyles,
  storiesNextStyles,
  storiesOverlayStyles,
  storiesPanelStyles,
  storiesPreviousStyles,
  storiesScrimStyles,
  storiesSlideStyles,
  storiesTitleStyles,
} from './Stories.styles';

const EXIT_DURATION_MS = 200;

const HOLD_DELAY_MS = 250;

export type StoryItem = {
  id?: string;
  src: string;
  alt: string;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  duration?: number;
};

export type StoriesLabels = {
  close: string;
  previous: string;
  next: string;
  pause: string;
  play: string;
  story?: (index: number, total: number) => string;
};

export type StoriesProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  open: boolean;
  onClose: () => void;
  items: StoryItem[];
  label: string;
  labels: StoriesLabels;
  startIndex?: number;
  duration?: number;
  autoplay?: boolean;
  onIndexChange?: (index: number) => void;
  onComplete?: () => void;
  closeId?: string;
  buttonIds?: { previous?: string; next?: string; pause?: string };
};

/** Default name of each story, "2 / 5". */
const defaultStoryLabel = (index: number, total: number) => `${index + 1} / ${total}`;

/** Whether the browser can run Web Animations (not in some test DOMs). */
const canAnimate = (element: HTMLElement | null): element is HTMLElement =>
  typeof element?.animate === 'function';

/** Full-screen stories: steps with progress bars, tap to go back or forward, hold or a button to pause. */
export const Stories = forwardRef<HTMLDivElement, StoriesProps>(
  (
    {
      open,
      onClose,
      items,
      label,
      labels,
      startIndex = 0,
      duration = 5000,
      autoplay = true,
      onIndexChange,
      onComplete,
      closeId,
      buttonIds = {},
      className,
      ...props
    },
    ref,
  ) => {
    const { mounted, visible, dialogProps } = useDialogLayer({
      open,
      onClose,
      ref,
      exitDurationMs: EXIT_DURATION_MS,
    });
    const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
    const [index, setIndex] = useState(startIndex);
    const [paused, setPaused] = useState(false);
    const [held, setHeld] = useState(false);
    const barRef = useRef<HTMLSpanElement | null>(null);
    const animationRef = useRef<Animation | null>(null);
    const playingRef = useRef(false);
    const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const wasHeld = useRef(false);
    const indexChange = useRef(onIndexChange);

    const total = items.length;
    const current = Math.min(index, total - 1);
    const item = items[current];
    const timed = autoplay && !reducedMotion;
    const playing = timed && !paused && !held;
    const storyLabel = labels.story ?? defaultStoryLabel;

    useEffect(() => {
      if (open) {
        setIndex(startIndex);
        setPaused(false);
      }
    }, [open, startIndex]);

    useEffect(() => {
      if (open && index >= total) {
        setIndex(total - 1);
        onComplete?.();
        onClose();
      }
    }, [open, index, total, onComplete, onClose]);

    useEffect(() => {
      indexChange.current = onIndexChange;
    }, [onIndexChange]);

    useEffect(() => {
      if (open) {
        indexChange.current?.(current);
      }
    }, [open, current]);

    useEffect(() => {
      playingRef.current = playing;
      if (playing) {
        animationRef.current?.play();
      } else {
        animationRef.current?.pause();
      }
    }, [playing]);

    useEffect(() => {
      const bar = barRef.current;
      if (!mounted || !timed || !canAnimate(bar)) {
        return undefined;
      }

      const animation = bar.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], {
        duration: item?.duration ?? duration,
        easing: 'linear',
        fill: 'forwards',
      });
      animation.onfinish = () => setIndex((value) => value + 1);
      if (!playingRef.current) {
        animation.pause();
      }

      animationRef.current = animation;

      return () => {
        animation.onfinish = null;
        animation.cancel();
        animationRef.current = null;
      };
    }, [mounted, timed, current, item?.duration, duration]);

    useEffect(() => {
      if (!open) {
        return undefined;
      }

      const handleKeyDown = (event: globalThis.KeyboardEvent) => {
        if (event.key === 'ArrowRight') {
          setIndex(current + 1);
        } else if (event.key === 'ArrowLeft' && current > 0) {
          setIndex(current - 1);
        } else if (event.key === 'ArrowLeft' && animationRef.current) {
          animationRef.current.currentTime = 0;
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, current]);

    useEffect(
      () => () => {
        if (holdTimer.current) {
          clearTimeout(holdTimer.current);
        }
      },
      [],
    );

    if (!mounted || !item) {
      return null;
    }

    const go = (step: 1 | -1) => {
      if (wasHeld.current) {
        wasHeld.current = false;

        return;
      }

      if (step < 0 && current === 0) {
        if (animationRef.current) {
          animationRef.current.currentTime = 0;
        }

        return;
      }

      setIndex(current + step);
    };

    const startHold = () => {
      wasHeld.current = false;
      holdTimer.current = setTimeout(() => {
        wasHeld.current = true;
        setHeld(true);
      }, HOLD_DELAY_MS);
    };

    const endHold = () => {
      if (holdTimer.current) {
        clearTimeout(holdTimer.current);
        holdTimer.current = null;
      }

      setHeld(false);
    };

    const holdProps = {
      onPointerDown: startHold,
      onPointerUp: endHold,
      onPointerLeave: endHold,
      onPointerCancel: endHold,
      onContextMenu: (event: MouseEvent) => event.preventDefault(),
    };

    const fill = (position: number) => {
      if (position < current) {
        return 'scaleX(1)';
      }

      if (position > current) {
        return 'scaleX(0)';
      }

      return timed ? 'scaleX(0)' : 'scaleX(1)';
    };

    const next = items[current + 1];

    return (
      <div className={storiesOverlayStyles({ visible })}>
        <div
          {...dialogProps(false)}
          aria-label={label}
          className={cn(storiesPanelStyles({ visible }), className)}
          {...props}
        >
          <div
            role="group"
            aria-roledescription="slide"
            aria-label={storyLabel(current, total)}
            {...idAttributes(item.id)}
            className={storiesSlideStyles}
          >
            <Image
              key={item.src}
              src={item.src}
              alt={item.alt}
              lazy={false}
              className={storiesImageStyles}
            />
            <div className={storiesScrimStyles} />
            <div className={storiesHeaderStyles}>
              <div aria-hidden="true" className={storiesBarsStyles}>
                {items.map((story, position) => (
                  <span key={story.id ?? position} className={storiesBarStyles}>
                    <span
                      ref={position === current ? barRef : undefined}
                      data-story-bar={position === current ? 'current' : undefined}
                      className={storiesBarFillStyles}
                      style={{ transform: fill(position) }}
                    />
                  </span>
                ))}
              </div>
              <div className={storiesControlsStyles}>
                {timed && (
                  <Button
                    id={buttonIds.pause}
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={paused ? labels.play : labels.pause}
                    className={storiesControlStyles}
                    onClick={() => setPaused((value) => !value)}
                  >
                    <Icon name={paused ? 'play-arrow' : 'pause'} />
                  </Button>
                )}
                <Button
                  id={closeId}
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={labels.close}
                  className={storiesControlStyles}
                  onClick={onClose}
                >
                  <Icon name="close" />
                </Button>
              </div>
            </div>
            <div className={storiesNavStyles}>
              <button
                {...idAttributes(buttonIds.previous)}
                type="button"
                aria-label={labels.previous}
                className={cn(storiesNavButtonStyles, storiesPreviousStyles)}
                onClick={() => go(-1)}
                {...holdProps}
              />
              <button
                {...idAttributes(buttonIds.next)}
                type="button"
                aria-label={labels.next}
                className={cn(storiesNavButtonStyles, storiesNextStyles)}
                onClick={() => go(1)}
                {...holdProps}
              />
            </div>
            <div className={storiesContentStyles} aria-live={playing ? 'off' : 'polite'}>
              <span className="sr-only">{storyLabel(current, total)}</span>
              {item.title && (
                <RichText as="h2" variant="h3" bold className={storiesTitleStyles}>
                  {item.title}
                </RichText>
              )}
              {item.description && (
                <RichText as="p" variant="p2" className={storiesDescriptionStyles}>
                  {item.description}
                </RichText>
              )}
              {item.action && <div className={storiesActionStyles}>{item.action}</div>}
            </div>
          </div>
          {next && <Image src={next.src} alt="" lazy={false} hidden />}
        </div>
      </div>
    );
  },
);

Stories.displayName = 'Stories';
