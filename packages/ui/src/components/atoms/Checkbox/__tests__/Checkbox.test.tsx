import { Checkbox } from '@components';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

describe('Checkbox', () => {
  it('reflects the checked state', () => {
    render(<Checkbox checked onCheckedChange={vi.fn()} label="I accept the terms" />);
    expect(screen.getByRole('checkbox', { name: 'I accept the terms' })).toBeChecked();
  });

  it('calls onCheckedChange with the new value when toggled', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox checked onCheckedChange={onCheckedChange} label="I accept the terms" />);
    await user.click(screen.getByText('I accept the terms'));
    expect(onCheckedChange).toHaveBeenCalledWith(false);
  });

  it('toggles from the keyboard', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox checked={false} onCheckedChange={onCheckedChange} aria-label="Done" />);
    await user.tab();
    await user.keyboard(' ');
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('is disabled when disabled prop is set', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox checked={false} onCheckedChange={onCheckedChange} disabled label="Done" />);
    const checkbox = screen.getByRole('checkbox', { name: 'Done' });
    await user.click(checkbox);
    expect(checkbox).toBeDisabled();
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('renders no label text without a label', () => {
    const { container } = render(
      <Checkbox checked={false} onCheckedChange={vi.fn()} aria-label="Done" />,
    );
    expect(container.querySelector('label')).toHaveTextContent('');
  });

  it('applies a custom className to the box alongside its own classes', () => {
    const { container } = render(
      <Checkbox checked={false} onCheckedChange={vi.fn()} label="Done" className="custom-class" />,
    );
    expect(container.querySelector('[aria-hidden]')).toHaveClass('custom-class', 'rounded-sm');
  });
});
