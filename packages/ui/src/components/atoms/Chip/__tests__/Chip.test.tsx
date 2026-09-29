import { Chip } from '@components';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

describe('Chip', () => {
  it('renders a button that reports its toggle state', () => {
    render(<Chip pressed>Sweet</Chip>);
    const chip = screen.getByRole('button', { name: 'Sweet' });
    expect(chip).toHaveAttribute('type', 'button');
    expect(chip).toHaveAttribute('aria-pressed', 'true');
  });

  it('has no toggle state as a plain action chip', () => {
    render(<Chip>Share</Chip>);
    expect(screen.getByRole('button', { name: 'Share' })).not.toHaveAttribute('aria-pressed');
  });

  it('hides the icon from assistive tech and sets the colors as variables', () => {
    render(
      <Chip icon={<svg data-testid="icon" />} colors={{ background: 'red', text: 'white' }}>
        Sweet
      </Chip>,
    );
    const chip = screen.getByRole('button', { name: 'Sweet' });
    expect(screen.getByTestId('icon').parentElement).toHaveAttribute('aria-hidden', 'true');
    expect(chip.style.getPropertyValue('--badge-bg')).toBe('red');
    expect(chip.style.getPropertyValue('--badge-text')).toBe('white');
  });

  it('calls onClick', async () => {
    const onClick = vi.fn();
    render(<Chip onClick={onClick}>Sweet</Chip>);
    await userEvent.click(screen.getByRole('button', { name: 'Sweet' }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
