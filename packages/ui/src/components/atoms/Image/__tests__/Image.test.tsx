import { Image } from '@components';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Image', () => {
  it('renders with required alt text', () => {
    render(<Image src="/photo.jpg" alt="A photo" />);
    expect(screen.getByAltText('A photo')).toBeInTheDocument();
  });

  it('defaults to lazy loading', () => {
    render(<Image src="/photo.jpg" alt="A photo" />);
    expect(screen.getByAltText('A photo')).toHaveAttribute('loading', 'lazy');
  });

  it('allows eager loading via the lazy prop', () => {
    render(<Image src="/photo.jpg" alt="A photo" lazy={false} />);
    expect(screen.getByAltText('A photo')).toHaveAttribute('loading', 'eager');
  });

  it('applies the fit and rounded variant classes', () => {
    render(<Image src="/photo.jpg" alt="A photo" fit="contain" rounded="full" />);
    expect(screen.getByAltText('A photo')).toHaveClass('object-contain', 'rounded-full');
  });

  it('applies a custom className alongside its own classes', () => {
    render(<Image src="/photo.jpg" alt="A photo" className="custom-class" />);
    expect(screen.getByAltText('A photo')).toHaveClass('custom-class', 'block');
  });
});
