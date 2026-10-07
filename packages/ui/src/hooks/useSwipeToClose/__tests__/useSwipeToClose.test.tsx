import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useSwipeToClose } from '../useSwipeToClose';

const Sheet = ({ onClose }: { onClose: () => void }) => {
  const { offset, dragProps } = useSwipeToClose({ onClose, threshold: 50 });

  return (
    <div data-testid="handle" data-offset={offset} {...dragProps}>
      handle
    </div>
  );
};

const drag = (handle: HTMLElement, from: number, to: number) => {
  fireEvent.pointerDown(handle, { clientY: from, pointerId: 1 });
  fireEvent.pointerMove(handle, { clientY: to, pointerId: 1 });
};

describe('useSwipeToClose', () => {
  it('should follow the finger down and close past the threshold', () => {
    const onClose = vi.fn();
    render(<Sheet onClose={onClose} />);
    const handle = screen.getByTestId('handle');

    drag(handle, 100, 180);
    expect(handle).toHaveAttribute('data-offset', '80');

    fireEvent.pointerUp(handle, { pointerId: 1 });
    expect(onClose).toHaveBeenCalledOnce();
    expect(handle).toHaveAttribute('data-offset', '0');
  });

  it('should spring back under the threshold', () => {
    const onClose = vi.fn();
    render(<Sheet onClose={onClose} />);
    const handle = screen.getByTestId('handle');

    drag(handle, 100, 120);
    fireEvent.pointerCancel(handle, { pointerId: 1 });

    expect(onClose).not.toHaveBeenCalled();
    expect(handle).toHaveAttribute('data-offset', '0');
  });

  it('should not move upwards nor without a press', () => {
    const onClose = vi.fn();
    render(<Sheet onClose={onClose} />);
    const handle = screen.getByTestId('handle');

    fireEvent.pointerMove(handle, { clientY: 300, pointerId: 1 });
    fireEvent.pointerUp(handle, { pointerId: 1 });
    expect(handle).toHaveAttribute('data-offset', '0');

    drag(handle, 200, 100);
    expect(handle).toHaveAttribute('data-offset', '0');
    expect(onClose).not.toHaveBeenCalled();
  });
});
