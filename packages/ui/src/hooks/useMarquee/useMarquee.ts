import { useEffect, useState, type RefObject } from 'react';
import { useMediaQuery } from '../useMediaQuery';

export interface UseMarqueeOptions {
  /** Seconds for one full loop. */
  duration: number;
  direction: 'left' | 'right';
  paused: boolean;
}

const LOOP: Keyframe[] = [{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }];

/**
 * Loops a track holding its content twice, with the Web Animations API (no global CSS needed).
 * It stays still with `prefers-reduced-motion` or where `animate` doesn't exist.
 */
export const useMarquee = (
  trackRef: RefObject<HTMLElement | null>,
  { duration, direction, paused }: UseMarqueeOptions,
) => {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [animation, setAnimation] = useState<Animation | null>(null);

  useEffect(() => {
    const track = trackRef.current;

    if (reducedMotion || typeof track?.animate !== 'function') {
      setAnimation(null);

      return undefined;
    }

    const running = track.animate(LOOP, {
      duration: duration * 1000,
      iterations: Infinity,
      direction: direction === 'left' ? 'normal' : 'reverse',
    });

    setAnimation(running);

    return () => running.cancel();
  }, [trackRef, duration, direction, reducedMotion]);

  useEffect(() => {
    if (paused) {
      animation?.pause();

      return;
    }

    animation?.play();
  }, [animation, paused]);

  return { animated: animation !== null };
};
