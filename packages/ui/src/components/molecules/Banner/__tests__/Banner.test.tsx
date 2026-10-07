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

  it('should tint the veil with a token and place the text on its solid side', () => {
    render(
      <Banner
        title="Bottom"
        appearance="image"
        image="https://example.com/a.jpg"
        overlayColor="primary"
        overlayPosition="bottom"
      />,
    );

    const region = screen.getByRole('region');

    expect(region.style.backgroundImage).toContain('0deg');
    expect(region).toHaveClass('justify-end', 'text-center', 'text-white');
  });

  it('should fade a radial veil around centered text', () => {
    render(<Banner title="Center" appearance="image" image="a.jpg" overlayPosition="center" />);

    expect(screen.getByRole('region').style.backgroundImage).toContain('radial-gradient');
  });

  it('should darken the text over a white veil and align it to the right side', () => {
    render(
      <Banner
        title="Right"
        appearance="image"
        image="a.jpg"
        overlayColor="white"
        overlayPosition="right"
      />,
    );

    const region = screen.getByRole('region');

    expect(region.style.backgroundImage).toContain('270deg');
    expect(region).toHaveClass('text-right', 'text-[rgb(var(--color-neutral-950))]');
  });

  it('should spread an even veil with full', () => {
    render(<Banner title="Full" appearance="image" image="a.jpg" overlayPosition="full" />);

    expect(screen.getByRole('region').style.backgroundImage).toMatch(/^linear-gradient\(rgb/);
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
