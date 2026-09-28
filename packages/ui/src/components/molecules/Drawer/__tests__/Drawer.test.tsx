import { Drawer } from '@components';
import { act, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

const Harness = ({ onClose = vi.fn() }: { onClose?: () => void }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open menu
      </button>
      <Drawer
        open={open}
        onClose={() => {
          onClose();
          setOpen(false);
        }}
        title="Menu"
        closeLabel="Close menu"
        footer={<p>Preferences</p>}
      >
        <a href="/home">Home</a>
      </Drawer>
    </>
  );
};

describe('Drawer', () => {
  it('renders nothing when closed', () => {
    render(
      <Drawer open={false} onClose={vi.fn()}>
        Content
      </Drawer>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens as a labelled modal dialog with its footer and moves focus inside', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    const dialog = await screen.findByRole('dialog', { name: 'Menu' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByText('Preferences')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveFocus();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('keeps Tab inside the panel', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    await screen.findByRole('dialog');
    await user.tab();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveFocus();
  });

  it('closes with the close button or Escape and returns focus to the trigger', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);
    const trigger = screen.getByRole('button', { name: 'Open menu' });

    await user.click(trigger);
    await user.click(await screen.findByRole('button', { name: 'Close menu' }));
    await user.click(trigger);
    await screen.findByRole('dialog');
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(2);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 250));
    });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    expect(document.body.style.overflow).toBe('');
  });

  it('slides in from the chosen side and accepts custom classes', () => {
    render(
      <Drawer
        open
        onClose={vi.fn()}
        side="left"
        className="custom-panel"
        title="Filters"
        titleClassName="custom-title"
      >
        Content
      </Drawer>,
    );
    expect(screen.getByRole('dialog')).toHaveClass('left-0', 'custom-panel');
    expect(screen.getByRole('heading', { name: 'Filters' })).toHaveClass('custom-title');
  });

  it('has no header when there is neither a title nor a close label', () => {
    render(
      <Drawer open onClose={vi.fn()} aria-label="Plain">
        Content
      </Drawer>,
    );
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.getByRole('dialog', { name: 'Plain' })).toBeInTheDocument();
  });
});
