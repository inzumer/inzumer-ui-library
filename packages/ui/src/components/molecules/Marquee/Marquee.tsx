import { Button, Icon } from '@components';
import { useMarquee } from '@hooks';
import { cn } from '@utils';
import { forwardRef, useRef, useState, type CSSProperties, type HTMLAttributes } from 'react';
import {
  marqueeButtonStyles,
  marqueeGroupStyles,
  marqueeStyles,
  marqueeTrackStyles,
  marqueeViewportStyles,
} from './Marquee.styles';

export type MarqueeProps = HTMLAttributes<HTMLDivElement> & {
  /** Names the region for assistive tech. */
  label: string;
  /** Seconds for one full loop. */
  duration?: number;
  direction?: 'left' | 'right';
  /** Space between items, as any CSS length. */
  gap?: string;
  pauseLabel?: string;
  playLabel?: string;
  /** Tracking id of the pause button. */
  buttonId?: string;
};

export const Marquee = forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      label,
      duration = 30,
      direction = 'left',
      gap = '2rem',
      pauseLabel = 'Pause',
      playLabel = 'Play',
      buttonId,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [stopped, setStopped] = useState(false);
    const [hovered, setHovered] = useState(false);
    const { animated } = useMarquee(trackRef, {
      duration,
      direction,
      paused: stopped || hovered,
    });

    return (
      <div
        ref={ref}
        role="region"
        aria-label={label}
        className={cn(marqueeStyles, className)}
        style={{ '--marquee-gap': gap, ...style } as CSSProperties}
        {...props}
      >
        <div
          className={marqueeViewportStyles(animated)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
        >
          <div ref={trackRef} className={marqueeTrackStyles}>
            <div className={marqueeGroupStyles}>{children}</div>
            {animated && (
              <div aria-hidden inert className={marqueeGroupStyles}>
                {children}
              </div>
            )}
          </div>
        </div>
        {animated && (
          <Button
            id={buttonId}
            type="button"
            variant="ghost"
            size="icon"
            className={marqueeButtonStyles}
            aria-label={stopped ? playLabel : pauseLabel}
            onClick={() => setStopped((value) => !value)}
          >
            <Icon name={stopped ? 'play-arrow' : 'pause'} />
          </Button>
        )}
      </div>
    );
  },
);

Marquee.displayName = 'Marquee';
