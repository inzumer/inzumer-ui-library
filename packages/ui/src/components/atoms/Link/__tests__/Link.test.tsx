import { Link } from '@components';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Link', () => {
  it('renders an anchor with the given href', () => {
    render(<Link href="/about">About</Link>);
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
  });

  it('adds target and rel for explicit external links', () => {
    render(
      <Link href="https://example.com" external>
        External
      </Link>,
    );
    const link = screen.getByRole('link', { name: 'External' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('infers external behavior from target="_blank"', () => {
    render(
      <Link href="https://example.com" target="_blank">
        External
      </Link>,
    );
    expect(screen.getByRole('link', { name: 'External' })).toHaveAttribute(
      'rel',
      'noopener noreferrer',
    );
  });

  it('renders as a custom component when "as" is provided', () => {
    const CustomLink = ({ href, children }: { href?: string; children?: React.ReactNode }) => (
      <a href={href} data-testid="custom-link">
        {children}
      </a>
    );
    render(
      <Link as={CustomLink} href="/custom">
        Custom
      </Link>,
    );
    expect(screen.getByTestId('custom-link')).toHaveAttribute('href', '/custom');
  });

  it('applies a custom className alongside its own classes', () => {
    render(
      <Link href="/about" className="custom-class">
        About
      </Link>,
    );
    expect(screen.getByRole('link', { name: 'About' })).toHaveClass(
      'custom-class',
      'transition-colors',
    );
  });
});
