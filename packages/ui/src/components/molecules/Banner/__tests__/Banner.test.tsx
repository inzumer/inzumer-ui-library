import { Banner } from '@components';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Banner', () => {
  it('should render a region named by its title', () => {
    render(<Banner title="Spring sale" description="Up to 30% off" />);

    expect(screen.getByRole('region', { name: 'Spring sale' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Spring sale' })).toBeInTheDocument();
    expect(screen.getByText('Up to 30% off')).toBeInTheDocument();
  });

  it('should render its actions and media', () => {
    render(
      <Banner
        title="News"
        actions={<button type="button">Read</button>}
        media={<img alt="Cake" />}
      />,
    );

    expect(screen.getByRole('button', { name: 'Read' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Cake' })).toBeInTheDocument();
  });

  it('should paint the token gradients', () => {
    render(<Banner title="Gradient" appearance="aurora" />);

    expect(screen.getByRole('region').style.backgroundImage).toContain('radial-gradient');
  });

  it('should veil the background image', () => {
    render(<Banner title="Photo" appearance="image" image="https://example.com/a.jpg" />);

    const { backgroundImage } = screen.getByRole('region').style;

    expect(backgroundImage).toContain('linear-gradient');
    expect(backgroundImage).toContain('https://example.com/a.jpg');
  });

  it('should use the surface tokens without inline backgrounds by default', () => {
    render(<Banner title="Subtle" className="custom" />);

    const region = screen.getByRole('region');

    expect(region).toHaveClass('bg-(--surface-secondary)', 'custom');
    expect(region.style.backgroundImage).toBe('');
  });

  it('should take a heading variant', () => {
    render(<Banner title="Big" titleVariant="h1" />);

    expect(screen.getByRole('heading', { level: 1, name: 'Big' })).toBeInTheDocument();
  });
});
