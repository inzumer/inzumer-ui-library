import { IconLink } from '@components';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('IconLink', () => {
  it('should be a link named by its label', () => {
    render(<IconLink href="/x" label="Instagram" icon={<svg aria-hidden />} />);

    expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute('href', '/x');
  });

  it('should open external links in a new tab with a safe rel', () => {
    render(<IconLink href="https://x.com" label="X" icon={<svg aria-hidden />} external />);
    const link = screen.getByRole('link', { name: 'X' });

    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
