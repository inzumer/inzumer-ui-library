import { Navbar } from '@components';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

const links = [
  { href: '/learn', label: 'Aprender', current: true },
  { href: '/blog', label: 'Blog' },
];

describe('Navbar', () => {
  it('should name the navigation and mark the current page', () => {
    render(<Navbar brand="Milimon" links={links} />);

    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Aprender' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Blog' })).not.toHaveAttribute('aria-current');
  });

  it('should align the links and show the actions', () => {
    render(
      <Navbar
        links={links}
        align="start"
        label="Principal"
        actions={<button type="button">ES</button>}
      />,
    );

    expect(screen.getByRole('navigation', { name: 'Principal' }).querySelector('ul')).toHaveClass(
      'justify-start',
    );
    expect(screen.getByRole('button', { name: 'ES' })).toBeInTheDocument();
  });
});
