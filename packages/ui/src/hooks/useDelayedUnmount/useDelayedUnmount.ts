import { useEffect, useState } from 'react';

/** Keeps a node mounted for `exitDurationMs` after closing, so its exit transition can play. */
export const useDelayedUnmount = (open: boolean, exitDurationMs: number) => {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);

      // Two rAFs: the closed styles must be painted before the open transition starts.
      let innerRafId = 0;
      const outerRafId = requestAnimationFrame(() => {
        innerRafId = requestAnimationFrame(() => setVisible(true));
      });

      return () => {
        cancelAnimationFrame(outerRafId);
        cancelAnimationFrame(innerRafId);
      };
    }

    setVisible(false);
    const timeoutId = setTimeout(() => setMounted(false), exitDurationMs);

    return () => clearTimeout(timeoutId);
  }, [open, exitDurationMs]);

  return { mounted, visible };
};
