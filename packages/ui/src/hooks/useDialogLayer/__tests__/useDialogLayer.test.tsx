import { useDialogLayer } from '@hooks';
import { act, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

const Dialog = ({
  open,
  onClose,
  title,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
}) => {
  const ref = createRef<HTMLDivElement>();
  const { mounted, titleId, dialogProps } = useDialogLayer({
    open,
    onClose,
    ref,
    exitDurationMs: 100,
  });
  if (!mounted) {
    return null;
  }
  return (
    <div {...dialogProps(Boolean(title))}>
      {title && <h2 id={titleId}>{title}</h2>}
      <button type="button">Inside</button>
    </div>
  );
};

describe('useDialogLayer', () => {
  afterEach(() => {
    vi.useRealTimers();
    document.body.style.overflow = '';
  });

  it('renders a modal dialog labelled by its title, locking the page scroll', () => {
    render(<Dialog open onClose={() => undefined} title="Settings" />);
    expect(screen.getByRole('dialog', { name: 'Settings' })).toHaveAttribute('aria-modal', 'true');
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('closes on Escape', async () => {
    const onClose = vi.fn();
    render(<Dialog open onClose={onClose} />);
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
    expect(screen.getByRole('dialog')).not.toHaveAttribute('aria-labelledby');
  });

  it('unmounts after the exit animation', () => {
    vi.useFakeTimers();
    const { rerender } = render(<Dialog open onClose={() => undefined} />);
    rerender(<Dialog open={false} onClose={() => undefined} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
