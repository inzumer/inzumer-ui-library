import { Snackbar } from '@components';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('Snackbar', () => {
  it('renders nothing when closed', () => {
    render(<Snackbar open={false} onClose={vi.fn()} message="Saved!" />);
    expect(screen.queryByText('Saved!')).not.toBeInTheDocument();
  });

  it('renders its message when open', () => {
    render(<Snackbar open onClose={vi.fn()} message="Saved!" duration={0} />);
    expect(screen.getByText('Saved!')).toBeInTheDocument();
  });

  it('uses role="alert" for error status', () => {
    render(<Snackbar open onClose={vi.fn()} message="Failed" status="error" duration={0} />);
    expect(screen.getByRole('alert')).toHaveTextContent('Failed');
  });

  it('uses role="status" for non-error statuses', () => {
    render(<Snackbar open onClose={vi.fn()} message="Saved!" status="success" duration={0} />);
    expect(screen.getByRole('status')).toHaveTextContent('Saved!');
  });

  it('auto-dismisses after the given duration', () => {
    const onClose = vi.fn();
    render(<Snackbar open onClose={onClose} message="Saved!" duration={3000} />);

    vi.advanceTimersByTime(2999);
    expect(onClose).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('does not auto-dismiss when duration is 0', () => {
    const onClose = vi.fn();
    render(<Snackbar open onClose={onClose} message="Saved!" duration={0} />);

    vi.advanceTimersByTime(10_000);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('applies a custom className alongside its own classes', () => {
    render(
      <Snackbar open onClose={vi.fn()} message="Saved!" duration={0} className="custom-class" />,
    );
    expect(screen.getByText('Saved!')).toHaveClass('custom-class', 'rounded-md');
  });

  it('renders no action button without an action', () => {
    render(<Snackbar open onClose={vi.fn()} message="Saved!" duration={0} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('runs the action and closes when the action is pressed', () => {
    const onClose = vi.fn();
    const onClick = vi.fn();
    render(
      <Snackbar
        open
        onClose={onClose}
        message="Study deleted"
        duration={0}
        action={{ label: 'Undo', onClick }}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
    expect(onClick).toHaveBeenCalledOnce();
    expect(onClose).toHaveBeenCalledOnce();
  });
});
