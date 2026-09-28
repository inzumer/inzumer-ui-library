import { Chevron } from '@components';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Chevron', () => {
  it('draws a hidden chevron pointing the given way', () => {
    const { container } = render(<Chevron direction="left" className="size-4" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveClass('size-4');
    expect(container.querySelector('path')).toHaveAttribute('d', 'm15 18-6-6 6-6');
  });

  it('points down by default', () => {
    const { container } = render(<Chevron />);
    expect(container.querySelector('path')).toHaveAttribute('d', 'm6 9 6 6 6-6');
  });
});
