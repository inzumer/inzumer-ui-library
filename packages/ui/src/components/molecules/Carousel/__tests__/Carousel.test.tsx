import { Carousel } from '@components';
import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const setup = (props: Partial<Parameters<typeof Carousel>[0]> = {}) =>
  render(
    <Carousel label="Featured recipes" previousLabel="Previous" nextLabel="Next" {...props}>
      <p>Lemon loaf</p>
      <p>Carrot cake</p>
      <p>Scones</p>
    </Carousel>,
  );

/** jsdom has no layout: give the track a size and a scroll position. */
const layout = (track: HTMLElement, scrollLeft: number) => {
  Object.defineProperties(track, {
    scrollWidth: { configurable: true, value: 900 },
    clientWidth: { configurable: true, value: 300 },
    scrollLeft: { configurable: true, value: scrollLeft, writable: true },
  });
  track.scrollBy = vi.fn();
  fireEvent.scroll(track);
};

const getTrack = () => {
  const track = screen.getByRole('region').querySelector<HTMLElement>('[data-carousel-track]');
  if (!track) {
    throw new Error('Carousel track not found');
  }
  return track;
};

const mockMatchMedia = (reduced: boolean) => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: reduced && query.includes('reduce'),
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
};

describe('Carousel', () => {
  const original = window.matchMedia;
  beforeEach(() => mockMatchMedia(false));
  afterEach(() => {
    window.matchMedia = original;
  });

  it('renders a labelled carousel with one named slide per child', () => {
    setup();
    const carousel = screen.getByRole('region', { name: 'Featured recipes' });
    expect(carousel).toHaveAttribute('aria-roledescription', 'carousel');
    const slides = screen.getAllByRole('group', { name: /\/ 3$/ });
    expect(slides).toHaveLength(3);
    expect(slides[0]).toHaveAttribute('aria-roledescription', 'slide');
    expect(slides[0]).toHaveAccessibleName('1 / 3');
  });

  it('pages with the buttons and disables them at the edges', async () => {
    const user = userEvent.setup();
    setup({ buttonIds: { previous: 'carousel-previous', next: 'carousel-next' } });
    const track = getTrack();
    layout(track, 0);

    const previous = screen.getByRole('button', { name: 'Previous' });
    const next = screen.getByRole('button', { name: 'Next' });
    expect(previous).toBeDisabled();
    expect(next).toBeEnabled();
    expect(next).toHaveAttribute('id', 'carousel-next');

    await user.click(next);
    expect(track.scrollBy).toHaveBeenCalledWith({ left: 270, behavior: 'smooth' });

    layout(track, 600);
    expect(next).toBeDisabled();
    expect(previous).toBeEnabled();
    await user.click(previous);
    expect(track.scrollBy).toHaveBeenCalledWith({ left: -270, behavior: 'smooth' });
  });

  it('jumps without animation when reduced motion is preferred', async () => {
    mockMatchMedia(true);
    const user = userEvent.setup();
    setup({ slideLabel: (index, total) => `Recipe ${index + 1} of ${total}`, className: 'custom' });
    const track = getTrack();
    layout(track, 0);
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(track.scrollBy).toHaveBeenCalledWith({ left: 270, behavior: 'auto' });
    expect(screen.getByRole('group', { name: 'Recipe 2 of 3' })).toBeInTheDocument();
    expect(screen.getByRole('region')).toHaveClass('custom');
  });

  it('shows an optional header next to the buttons', () => {
    setup({ header: <h2>Recipes</h2> });
    expect(screen.getByRole('heading', { name: 'Recipes' })).toBeInTheDocument();
  });
});
