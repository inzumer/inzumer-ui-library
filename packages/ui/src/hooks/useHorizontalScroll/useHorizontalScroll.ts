import { useMediaQuery } from '@hooks/useMediaQuery';
import { useCallback, useEffect, useRef, useState } from 'react';

const EDGE_TOLERANCE_PX = 4;

/** Share of the visible width scrolled by each button press. */
const PAGE_RATIO = 0.9;

export interface ScrollEdges {
  start: boolean;
  end: boolean;
}

/**
 * A horizontal scroller's state: whether it sits at either edge, kept up to date on scroll and
 * resize, plus paging that respects reduced motion. `onUpdate` gets the track and its edges on every update.
 */
export const useHorizontalScroll = <T extends HTMLElement = HTMLDivElement>(
  onUpdate?: (track: T, edges: ScrollEdges) => void,
) => {
  const ref = useRef<T | null>(null);
  const onUpdateRef = useRef(onUpdate);
  onUpdateRef.current = onUpdate;
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const behavior: ScrollBehavior = reducedMotion ? 'auto' : 'smooth';
  const [edges, setEdges] = useState<ScrollEdges>({ start: true, end: true });

  const update = useCallback(() => {
    const track = ref.current;
    if (!track) {
      return;
    }
    const max = track.scrollWidth - track.clientWidth;
    const next = {
      start: track.scrollLeft <= EDGE_TOLERANCE_PX,
      end: track.scrollLeft >= max - EDGE_TOLERANCE_PX,
    };
    setEdges(next);
    onUpdateRef.current?.(track, next);
  }, []);

  useEffect(() => {
    update();
    const track = ref.current;
    if (!track || typeof ResizeObserver === 'undefined') {
      return undefined;
    }
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => observer.disconnect();
  }, [update]);

  const scrollByPage = (direction: 1 | -1) =>
    ref.current?.scrollBy({ left: direction * ref.current.clientWidth * PAGE_RATIO, behavior });

  const scrollToOffset = (left: number) => ref.current?.scrollTo({ left, behavior });

  return { ref, edges, update, scrollByPage, scrollToOffset };
};
