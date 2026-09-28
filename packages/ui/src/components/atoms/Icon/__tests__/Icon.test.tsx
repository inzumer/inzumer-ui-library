import { Icon } from '@components';
import { render, screen } from '@testing-library/react';
import type { SVGProps } from 'react';
import { describe, expect, it } from 'vitest';

const DotIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg data-testid="dot-icon" {...props}>
    <circle cx="5" cy="5" r="5" />
  </svg>
);

describe('Icon', () => {
  it('renders the provided icon component', () => {
    render(<Icon icon={DotIcon} />);
    expect(screen.getByTestId('dot-icon')).toBeInTheDocument();
  });

  it('marks decorative icons as aria-hidden when no label is given', () => {
    render(<Icon icon={DotIcon} />);
    expect(screen.getByTestId('dot-icon')).toHaveAttribute('aria-hidden', 'true');
  });

  it('exposes an accessible name when a label is given', () => {
    render(<Icon icon={DotIcon} label="Loading" />);
    expect(screen.getByRole('img', { name: 'Loading' })).toBeInTheDocument();
  });

  it('applies the size variant class', () => {
    render(<Icon icon={DotIcon} size="lg" />);
    expect(screen.getByTestId('dot-icon')).toHaveClass('h-6', 'w-6');
  });

  it('applies a custom className alongside its own classes', () => {
    render(<Icon icon={DotIcon} className="custom-class" />);
    expect(screen.getByTestId('dot-icon')).toHaveClass('custom-class', 'inline-block');
  });
});
