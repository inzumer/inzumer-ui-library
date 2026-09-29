import { Badge } from '@components';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Badge', () => {
  it('renders its label as a rounded pill by default', () => {
    render(<Badge>New</Badge>);
    const badge = screen.getByText('New');
    expect(badge.tagName).toBe('SPAN');
    expect(badge).toHaveClass('rounded-full');
    expect(badge).not.toHaveClass('uppercase');
  });

  it('takes a radius and optional uppercase', () => {
    render(
      <Badge radius="md" uppercase>
        Featured
      </Badge>,
    );
    expect(screen.getByText('Featured')).toHaveClass('rounded-md', 'uppercase');
  });

  it('takes the shared status tones, and custom colors win over them', () => {
    render(
      <>
        <Badge tone="success">Saved</Badge>
        <Badge tone="error" colors={{ background: 'pink', text: 'black' }}>
          Custom
        </Badge>
      </>,
    );
    expect(screen.getByText('Saved').style.getPropertyValue('--badge-bg')).toBe(
      'rgb(var(--color-success-100))',
    );
    expect(screen.getByText('Custom').style.getPropertyValue('--badge-bg')).toBe('pink');
  });

  it('hides the icon from assistive tech and sets the colors as variables', () => {
    render(
      <Badge icon={<svg data-testid="icon" />} colors={{ background: 'red', text: 'white' }}>
        Sweet
      </Badge>,
    );
    const badge = screen.getByText('Sweet');
    expect(screen.getByTestId('icon').parentElement).toHaveAttribute('aria-hidden', 'true');
    expect(badge.style.getPropertyValue('--badge-bg')).toBe('red');
    expect(badge.style.getPropertyValue('--badge-text')).toBe('white');
  });
});
