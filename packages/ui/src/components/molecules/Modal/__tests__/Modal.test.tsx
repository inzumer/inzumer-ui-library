import { Modal } from '@components';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

describe('Modal', () => {
  it('renders nothing when closed', () => {
    render(
      <Modal open={false} onClose={vi.fn()}>
        Content
      </Modal>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders the title and children when open', () => {
    render(
      <Modal open onClose={vi.fn()} title="Settings">
        Content
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('calls onClose when the Escape key is pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose}>
        Content
      </Modal>,
    );
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when the backdrop is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose}>
        Content
      </Modal>,
    );
    await user.click(screen.getByRole('dialog').parentElement as HTMLElement);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('does not close on backdrop click when closeOnBackdropClick is false', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} closeOnBackdropClick={false}>
        Content
      </Modal>,
    );
    await user.click(screen.getByRole('dialog').parentElement as HTMLElement);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('applies a custom className to the panel alongside its own classes', () => {
    render(
      <Modal open onClose={vi.fn()} className="custom-class">
        Content
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toHaveClass('custom-class', 'rounded-xl');
  });

  it('takes 90% of the width up to 768px and scrolls its body past 80% of the height', () => {
    render(
      <Modal open onClose={vi.fn()} title="Details" footer={<button type="button">OK</button>}>
        Long content
      </Modal>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('w-[90vw]', 'max-w-[768px]', 'max-h-[80dvh]', 'flex-col');
    expect(screen.getByText('Long content')).toHaveClass('overflow-y-auto', 'flex-1');
    expect(screen.getByRole('heading', { name: 'Details' })).toHaveClass('shrink-0');
    expect(screen.getByRole('button', { name: 'OK' }).parentElement).toHaveClass('shrink-0');
  });

  it('allows up to 90% of the height with maxHeight="tall"', () => {
    render(
      <Modal open onClose={vi.fn()} maxHeight="tall">
        Long recipe
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toHaveClass('max-h-[90dvh]');
  });
});
