import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useRotatingMessage } from '../useRotatingMessage';

describe('useRotatingMessage', () => {
  afterEach(() => vi.useRealTimers());

  it('returns nothing without messages', () => {
    const { result } = renderHook(() => useRotatingMessage(undefined, 1000));
    expect(result.current).toBeUndefined();
  });

  it('keeps a single message', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useRotatingMessage(['Only'], 1000));
    act(() => vi.advanceTimersByTime(3000));
    expect(result.current).toBe('Only');
  });

  it('switches to another message every interval', () => {
    vi.useFakeTimers();
    const messages = ['A', 'B', 'C'];
    const { result } = renderHook(() => useRotatingMessage(messages, 1000));
    let previous = result.current;
    for (let i = 0; i < 3; i += 1) {
      act(() => vi.advanceTimersByTime(1000));
      expect(result.current).not.toBe(previous);
      previous = result.current;
    }
  });
});
