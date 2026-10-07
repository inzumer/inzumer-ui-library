import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useMarquee } from '../useMarquee';

const originalMatchMedia = window.matchMedia;

const mockReducedMotion = (matches: boolean) => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
};

const trackWithAnimation = () => {
  const animation = { pause: vi.fn(), play: vi.fn(), cancel: vi.fn() };
  const track = document.createElement('div');
  track.animate = vi.fn().mockReturnValue(animation);

  return { track, animation };
};

afterEach(() => {
  window.matchMedia = originalMatchMedia;
});

describe('useMarquee', () => {
  it('should loop the track and play it', () => {
    mockReducedMotion(false);
    const { track, animation } = trackWithAnimation();

    const { result } = renderHook(() =>
      useMarquee({ current: track }, { duration: 20, direction: 'right', paused: false }),
    );

    expect(result.current.animated).toBe(true);
    expect(track.animate).toHaveBeenCalledWith(expect.any(Array), {
      duration: 20_000,
      iterations: Infinity,
      direction: 'reverse',
    });
    expect(animation.play).toHaveBeenCalled();
  });

  it('should pause when asked and cancel on unmount', () => {
    mockReducedMotion(false);
    const { track, animation } = trackWithAnimation();

    const { unmount } = renderHook(() =>
      useMarquee({ current: track }, { duration: 20, direction: 'left', paused: true }),
    );

    expect(animation.pause).toHaveBeenCalled();
    unmount();
    expect(animation.cancel).toHaveBeenCalled();
  });

  it('should stay still with reduced motion', () => {
    mockReducedMotion(true);
    const { track } = trackWithAnimation();

    const { result } = renderHook(() =>
      useMarquee({ current: track }, { duration: 20, direction: 'left', paused: false }),
    );

    expect(result.current.animated).toBe(false);
    expect(track.animate).not.toHaveBeenCalled();
  });

  it('should stay still where animate does not exist', () => {
    const { result } = renderHook(() =>
      useMarquee({ current: null }, { duration: 20, direction: 'left', paused: false }),
    );

    expect(result.current.animated).toBe(false);
  });
});
