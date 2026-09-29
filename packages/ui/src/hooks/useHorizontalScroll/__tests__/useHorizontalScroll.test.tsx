import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useHorizontalScroll } from '../useHorizontalScroll';

const Scroller = ({ onUpdate }: { onUpdate?: () => void }) => {
  const { ref, edges, update, scrollByPage, scrollToOffset } = useHorizontalScroll(onUpdate);
  return (
    <>
      <div ref={ref} data-testid="track" onScroll={update} />
      <span>{`${edges.start}-${edges.end}`}</span>
      <button type="button" onClick={() => scrollByPage(-1)}>
        back
      </button>
      <button type="button" onClick={() => scrollToOffset(40)}>
        to
      </button>
    </>
  );
};

describe('useHorizontalScroll', () => {
  it('starts at both edges when everything fits', () => {
    render(<Scroller />);
    expect(screen.getByText('true-true')).toBeInTheDocument();
  });

  it('follows the scroll position and calls onUpdate', () => {
    const onUpdate = vi.fn();
    render(<Scroller onUpdate={onUpdate} />);
    const track = screen.getByTestId('track');
    Object.defineProperty(track, 'scrollWidth', { configurable: true, value: 500 });
    Object.defineProperty(track, 'clientWidth', { configurable: true, value: 200 });
    act(() => {
      track.scrollLeft = 100;
      fireEvent.scroll(track);
    });
    expect(screen.getByText('false-false')).toBeInTheDocument();
    expect(onUpdate).toHaveBeenLastCalledWith(track, { start: false, end: false });
  });

  it('pages back and scrolls to an offset', () => {
    render(<Scroller />);
    const track = screen.getByTestId('track');
    Object.defineProperty(track, 'clientWidth', { configurable: true, value: 200 });
    track.scrollBy = vi.fn();
    track.scrollTo = vi.fn();
    fireEvent.click(screen.getByText('back'));
    fireEvent.click(screen.getByText('to'));
    expect(track.scrollBy).toHaveBeenCalledWith(expect.objectContaining({ left: -180 }));
    expect(track.scrollTo).toHaveBeenCalledWith(expect.objectContaining({ left: 40 }));
  });
});
