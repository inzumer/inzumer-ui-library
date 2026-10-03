import { MediaCard, Showcase } from '@components';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Showcase', () => {
  it('shows the photo, title and subtitle as a card', () => {
    render(
      <Showcase
        src="/lemon-loaf.jpg"
        alt="Lemon loaf on a plate"
        title="Lemon loaf"
        subtitle="45 min · 8 servings"
      />,
    );
    expect(screen.getByRole('article')).toHaveClass('aspect-3/4');
    expect(screen.getByRole('img', { name: 'Lemon loaf on a plate' })).toHaveAttribute(
      'src',
      '/lemon-loaf.jpg',
    );
    expect(screen.getByRole('heading', { level: 3, name: 'Lemon loaf' })).toBeInTheDocument();
    expect(screen.getByText('45 min · 8 servings')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('links the whole card, named by its title, with the actions above it', () => {
    render(
      <Showcase
        src="/scones.jpg"
        title="Scones"
        href="/recipes/scones"
        linkId="card-scones"
        headingLevel="h2"
        aspect="square"
        actions={<button type="button">Save</button>}
        className="custom"
      />,
    );
    const link = screen.getByRole('link', { name: 'Scones' });
    expect(link).toHaveAttribute('href', '/recipes/scones');
    expect(link).toHaveAttribute('id', 'card-scones');
    expect(link).toHaveClass('after:absolute');
    expect(screen.getByRole('button', { name: 'Save' }).parentElement).toHaveClass('z-2');
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('article')).toHaveClass('aspect-square', 'custom');
  });

  it('shows the badge right above the title, outside the link name', () => {
    render(<Showcase title="Carrot cake" href="/recipes/carrot-cake" badge="New" />);
    const badge = screen.getByText('New');
    const heading = screen.getByRole('heading', { name: 'Carrot cake' });
    expect(badge.nextElementSibling).toBe(heading);
    expect(screen.getByRole('link', { name: 'Carrot cake' })).toBeInTheDocument();
  });

  it('accepts its own media element instead of a URL', () => {
    render(<Showcase media={<picture data-testid="picture" />} title="Guide" />);
    expect(screen.getByTestId('picture')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('keeps MediaCard as a deprecated alias', () => {
    expect(MediaCard).toBe(Showcase);
  });
});
