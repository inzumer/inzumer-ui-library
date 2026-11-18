import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useDelayedUnmount } from '../useDelayedUnmount';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useDelayedUnmount', () => {
  it('stays mounted and visible while open from the start', () => {
    const { result } = renderHook(() => useDelayedUnmount(true, 200));
    expect(result.current.mounted).toBe(true);
  });

  it('is not mounted when never opened', () => {
    const { result } = renderHook(() => useDelayedUnmount(false, 200));
    expect(result.current.mounted).toBe(false);
    expect(result.current.visible).toBe(false);
  });

  it('waits two animation frames before becoming visible, so the closed state actually paints first', () => {
    const { result, rerender } = renderHook(({ open }) => useDelayedUnmount(open, 200), {
      initialProps: { open: false },
    });
    expect(result.current.mounted).toBe(false);

    rerender({ open: true });
    expect(result.current.mounted).toBe(true);
    expect(result.current.visible).toBe(false);

    act(() => {
      vi.runOnlyPendingTimers();
    });
    expect(result.current.visible).toBe(false);

    act(() => {
      vi.runOnlyPendingTimers();
    });
    expect(result.current.visible).toBe(true);
  });

  it('stays mounted during the exit transition, then unmounts', () => {
    const { result, rerender } = renderHook(({ open }) => useDelayedUnmount(open, 200), {
      initialProps: { open: true },
    });
    expect(result.current.mounted).toBe(true);

    rerender({ open: false });
    expect(result.current.mounted).toBe(true);
    expect(result.current.visible).toBe(false);

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current.mounted).toBe(false);
  });
});
