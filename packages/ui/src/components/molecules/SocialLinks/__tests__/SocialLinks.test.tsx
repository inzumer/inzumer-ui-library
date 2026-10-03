import { SocialLinks } from '@components';
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

const links = [
  { href: 'https://www.pinterest.com/m', label: 'Pinterest', icon: <svg aria-hidden /> },
  { href: 'https://www.linkedin.com/m', label: 'LinkedIn', icon: <svg aria-hidden /> },
];

describe('SocialLinks', () => {
  it('should list a named link per network, opening in a new tab', () => {
    render(<SocialLinks links={links} />);
    const list = screen.getByRole('list', { name: 'Social networks' });

    expect(within(list).getAllByRole('link')).toHaveLength(2);
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('target', '_blank');
  });

  it('should align the row and take a custom list name', () => {
    render(<SocialLinks links={links} align="end" label="Redes" />);

    expect(screen.getByRole('list', { name: 'Redes' })).toHaveClass('justify-end');
  });
});
