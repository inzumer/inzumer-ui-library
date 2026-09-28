import { MediaCard } from '@components';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('MediaCard', () => {
  it('shows the photo, title and subtitle as a card', () => {
    render(
      <MediaCard
        src="/lemon-loaf.jpg"
        alt="Lemon loaf on a plate"
        title="Lemon loaf"
        subtitle="45 min · 8 servings"
      />,
    );
    expect(screen.getByRole('article')).toHaveClass('aspect-[3/4]');
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
      <MediaCard
        src="/scones.jpg"
        title="Scones"
        href="/recipes/scones"
        linkId="card-scones"
        headingLevel="h2"
        aspect="square"
        badge="New"
        actions={<button type="button">Save</button>}
        className="custom"
      />,
    );
    const link = screen.getByRole('link', { name: 'Scones' });
    expect(link).toHaveAttribute('href', '/recipes/scones');
    expect(link).toHaveAttribute('id', 'card-scones');
    expect(link).toHaveClass('after:absolute');
    expect(screen.getByRole('button', { name: 'Save' }).parentElement).toHaveClass('z-[2]');
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('article')).toHaveClass('aspect-square', 'custom');
  });

  it('accepts its own media element instead of a URL', () => {
    render(<MediaCard media={<picture data-testid="picture" />} title="Guide" />);
    expect(screen.getByTestId('picture')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
