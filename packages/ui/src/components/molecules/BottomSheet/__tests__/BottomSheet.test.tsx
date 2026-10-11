import { BottomSheet } from '@components';
import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

describe('BottomSheet', () => {
  it('renders nothing when closed', () => {
    render(
      <BottomSheet open={false} onClose={vi.fn()}>
        Content
      </BottomSheet>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders the title and children when open', () => {
    render(
      <BottomSheet open onClose={vi.fn()} title="Filters">
        Content
      </BottomSheet>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('calls onClose when the Escape key is pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <BottomSheet open onClose={onClose}>
        Content
      </BottomSheet>,
    );
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when the backdrop is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <BottomSheet open onClose={onClose}>
        Content
      </BottomSheet>,
    );
    await user.click(screen.getByRole('dialog').parentElement as HTMLElement);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('does not close on backdrop click when closeOnBackdropClick is false', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <BottomSheet open onClose={onClose} closeOnBackdropClick={false}>
        Content
      </BottomSheet>,
    );
    await user.click(screen.getByRole('dialog').parentElement as HTMLElement);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('applies a custom className to the panel alongside its own classes', () => {
    render(
      <BottomSheet open onClose={vi.fn()} className="custom-class">
        Content
      </BottomSheet>,
    );
    expect(screen.getByRole('dialog')).toHaveClass('custom-class', 'rounded-t-xl');
  });

  it('takes up to 80% of the height and scrolls only its body', () => {
    render(
      <BottomSheet open onClose={vi.fn()} title="Filters">
        Long content
      </BottomSheet>,
    );
    expect(screen.getByRole('dialog')).toHaveClass('max-h-[80dvh]', 'overflow-hidden', 'flex-col');
    expect(screen.getByRole('dialog')).not.toHaveClass('overflow-y-auto');
    expect(screen.getByText('Long content')).toHaveClass('overflow-y-auto', 'flex-1', '-mx-6');
    expect(screen.getByRole('heading', { name: 'Filters' })).toHaveClass('shrink-0');
  });

  it('allows up to 90% of the height with maxHeight="tall"', () => {
    render(
      <BottomSheet open onClose={vi.fn()} maxHeight="tall">
        Content
      </BottomSheet>,
    );
    expect(screen.getByRole('dialog')).toHaveClass('max-h-[90dvh]');
  });

  it('closes from an optional button in the top end corner', async () => {
    const onClose = vi.fn();
    render(
      <BottomSheet open onClose={onClose} title="Filters" closeLabel="Close">
        Content
      </BottomSheet>,
    );
    expect(screen.getByRole('heading', { name: 'Filters' })).toHaveClass('pr-12');
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('should follow a swipe down on the handle and close past the threshold', () => {
    const onClose = vi.fn();
    render(
      <BottomSheet open onClose={onClose} title="Filters">
        Content
      </BottomSheet>,
    );
    const dialog = screen.getByRole('dialog');
    const handle = dialog.firstElementChild as HTMLElement;

    fireEvent.pointerDown(handle, { clientY: 100, pointerId: 1 });
    fireEvent.pointerMove(handle, { clientY: 150, pointerId: 1 });
    expect(dialog.style.transform).toBe('translateY(50px)');

    fireEvent.pointerMove(handle, { clientY: 200, pointerId: 1 });
    fireEvent.pointerUp(handle, { pointerId: 1 });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('gives the close button the id it is given', () => {
    render(
      <BottomSheet
        open
        onClose={vi.fn()}
        title="Details"
        closeLabel="Close"
        closeId="dialog-button-close"
      >
        Content
      </BottomSheet>,
    );
    expect(screen.getByRole('button', { name: 'Close' })).toHaveAttribute(
      'id',
      'dialog-button-close',
    );
  });
});
