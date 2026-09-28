import { Switch } from '@components';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

describe('Switch', () => {
  it('reflects the checked state', () => {
    render(<Switch checked onCheckedChange={vi.fn()} label="Wifi" />);
    expect(screen.getByRole('switch', { name: 'Wifi' })).toBeChecked();
  });

  it('calls onCheckedChange with the new value when toggled', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch checked={false} onCheckedChange={onCheckedChange} label="Wifi" />);
    await user.click(screen.getByRole('switch', { name: 'Wifi' }));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('is disabled when disabled prop is set', () => {
    render(<Switch checked={false} onCheckedChange={vi.fn()} disabled label="Wifi" />);
    expect(screen.getByRole('switch', { name: 'Wifi' })).toBeDisabled();
  });

  it('applies a custom className to the track alongside its own classes', () => {
    const { container } = render(
      <Switch checked={false} onCheckedChange={vi.fn()} label="Wifi" className="custom-class" />,
    );
    const track = container.querySelector('[aria-hidden]');
    expect(track).toHaveClass('custom-class', 'rounded-full');
  });
});
