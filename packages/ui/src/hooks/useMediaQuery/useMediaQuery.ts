import { useEffect, useState } from 'react';

/** `matchMedia` when the environment has it (not on the server nor in some test DOMs). */
const mediaQueryList = (query: string): MediaQueryList | null =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia(query)
    : null;

/** Whether a media query matches, following its changes; `false` where `matchMedia` doesn't exist. */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(() => mediaQueryList(query)?.matches ?? false);

  useEffect(() => {
    const list = mediaQueryList(query);
    if (!list) {
      return undefined;
    }

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    setMatches(list.matches);
    list.addEventListener('change', handleChange);
    return () => list.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
};
