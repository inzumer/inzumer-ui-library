import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useMediaQuery } from '../useMediaQuery';

type Listener = (event: MediaQueryListEvent) => void;

const createMatchMediaMock = (initialMatches: boolean) => {
  let matches = initialMatches;
  const listeners = new Set<Listener>();

  const mediaQueryList = {
    get matches() {
      return matches;
    },
    media: '',
    addEventListener: (_event: string, listener: Listener) => {
      listeners.add(listener);
    },
    removeEventListener: (_event: string, listener: Listener) => {
      listeners.delete(listener);
    },
  } as unknown as MediaQueryList;

  const trigger = (nextMatches: boolean) => {
    matches = nextMatches;
    listeners.forEach((listener) => listener({ matches } as MediaQueryListEvent));
  };

  return { mediaQueryList, trigger, listenerCount: () => listeners.size };
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('useMediaQuery', () => {
  it('returns the initial match state', () => {
    const { mediaQueryList } = createMatchMediaMock(true);
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue(mediaQueryList));

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(true);
  });

  it('updates when the media query match changes', () => {
    const { mediaQueryList, trigger } = createMatchMediaMock(false);
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue(mediaQueryList));

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(false);

    act(() => {
      trigger(true);
    });
    expect(result.current).toBe(true);
  });

  it('removes its change listener on unmount', () => {
    const { mediaQueryList, listenerCount } = createMatchMediaMock(false);
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue(mediaQueryList));

    const { unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(listenerCount()).toBe(1);

    unmount();
    expect(listenerCount()).toBe(0);
  });

  it('re-subscribes to the new query when the query string changes', () => {
    const narrow = createMatchMediaMock(false);
    const wide = createMatchMediaMock(true);
    const matchMediaMock = vi.fn((query: string) =>
      query === '(min-width: 1024px)' ? wide.mediaQueryList : narrow.mediaQueryList,
    );
    vi.stubGlobal('matchMedia', matchMediaMock);

    const { result, rerender } = renderHook(({ query }) => useMediaQuery(query), {
      initialProps: { query: '(min-width: 768px)' },
    });
    expect(result.current).toBe(false);

    rerender({ query: '(min-width: 1024px)' });
    expect(result.current).toBe(true);
  });

  it('returns false where matchMedia does not exist', () => {
    vi.stubGlobal('matchMedia', undefined);
    const { result } = renderHook(() => useMediaQuery('(prefers-reduced-motion: reduce)'));
    expect(result.current).toBe(false);
  });
});
