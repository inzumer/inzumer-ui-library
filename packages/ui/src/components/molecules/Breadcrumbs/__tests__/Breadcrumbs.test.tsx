import { Breadcrumbs } from '@components';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Breadcrumbs', () => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
  ];

  it('renders a link for each item', () => {
    render(<Breadcrumbs items={items} current="UI Library" />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects');
  });

  it('renders the current page as plain text, not a link', () => {
    render(<Breadcrumbs items={items} current="UI Library" />);
    expect(screen.getByText('UI Library')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'UI Library' })).not.toBeInTheDocument();
  });

  it('uses the default separator when none is given', () => {
    render(<Breadcrumbs items={items} current="UI Library" />);
    expect(screen.getAllByText('/')).toHaveLength(items.length);
  });

  it('applies a custom className alongside its own classes', () => {
    render(<Breadcrumbs items={items} current="UI Library" className="custom-class" />);
    expect(screen.getByRole('navigation')).toHaveClass('custom-class', 'flex');
  });
});
