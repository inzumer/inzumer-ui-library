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

const getTrack = () => {
  const track = screen.getByRole('region').querySelector<HTMLElement>('[data-carousel-track]');
  if (!track) {
    throw new Error('Carousel track not found');
  }

  return track;
};

/** jsdom has no layout: 3 slides 300px apart in a 300px-wide track, scrolled to `scrollLeft`. */
const layout = (scrollLeft: number) => {
  const track = getTrack();
  Object.defineProperties(track, {
    scrollWidth: { configurable: true, value: 900 },
    clientWidth: { configurable: true, value: 300 },
    scrollLeft: { configurable: true, value: scrollLeft, writable: true },
  });
  screen.getAllByRole('group', { name: /\/ 3$/ }).forEach((slide, index) => {
    Object.defineProperty(slide, 'offsetLeft', { configurable: true, value: 4 + index * 300 });
  });
  track.scrollBy = vi.fn();
  track.scrollTo = vi.fn();
  fireEvent.scroll(track);

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

  it('pages with the buttons below the cards and disables them at the edges', async () => {
    const user = userEvent.setup();
    setup({ buttonIds: { previous: 'carousel-previous', next: 'carousel-next' } });
    const track = layout(0);

    const previous = screen.getByRole('button', { name: 'Previous' });
    const next = screen.getByRole('button', { name: 'Next' });
    expect(previous).toBeDisabled();
    expect(next).toBeEnabled();
    expect(next).toHaveAttribute('id', 'carousel-next');
    expect(track.compareDocumentPosition(next) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    await user.click(next);
    expect(track.scrollBy).toHaveBeenCalledWith({ left: 270, behavior: 'smooth' });

    layout(600);
    expect(next).toBeDisabled();
    await user.click(previous);
    expect(track.scrollBy).toHaveBeenLastCalledWith({ left: -270, behavior: 'smooth' });
  });

  it('marks the current card in the indicators and jumps to the chosen one', async () => {
    const user = userEvent.setup();
    setup({ indicatorsLabel: 'Choose a recipe', goToLabel: (index) => `Recipe ${index + 1}` });
    const track = layout(0);

    const group = screen.getByRole('group', { name: 'Choose a recipe' });
    expect(group).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Recipe 1' })).toHaveAttribute(
      'aria-current',
      'true',
    );

    await user.click(screen.getByRole('button', { name: 'Recipe 2' }));
    expect(track.scrollTo).toHaveBeenCalledWith({ left: 300, behavior: 'smooth' });

    layout(290);
    expect(screen.getByRole('button', { name: 'Recipe 2' })).toHaveAttribute(
      'aria-current',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Recipe 1' })).not.toHaveAttribute('aria-current');

    layout(600);
    expect(screen.getByRole('button', { name: 'Recipe 3' })).toHaveAttribute(
      'aria-current',
      'true',
    );
  });

  it('can hide the indicators', () => {
    setup({ indicators: false });
    expect(screen.queryByRole('button', { name: 'Go to slide 1' })).not.toBeInTheDocument();
  });

  it('jumps without animation when reduced motion is preferred', async () => {
    mockMatchMedia(true);
    const user = userEvent.setup();
    setup({ slideLabel: (index, total) => `Recipe ${index + 1} of ${total}`, className: 'custom' });
    const track = getTrack();
    track.scrollBy = vi.fn();
    track.scrollTo = vi.fn();
    Object.defineProperties(track, {
      scrollWidth: { configurable: true, value: 900 },
      clientWidth: { configurable: true, value: 300 },
    });
    fireEvent.scroll(track);
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(track.scrollBy).toHaveBeenCalledWith({ left: 270, behavior: 'auto' });
    await user.click(screen.getByRole('button', { name: 'Go to slide 3' }));
    expect(track.scrollTo).toHaveBeenCalledWith(expect.objectContaining({ behavior: 'auto' }));
    expect(screen.getByRole('group', { name: 'Recipe 2 of 3' })).toBeInTheDocument();
    expect(screen.getByRole('region')).toHaveClass('custom');
  });

  it('shows an optional header above the cards', () => {
    setup({ header: <h2>Recipes</h2> });
    expect(screen.getByRole('heading', { name: 'Recipes' })).toBeInTheDocument();
  });

  it('can hide the buttons and keep only the indicators', () => {
    setup({ buttons: false });
    expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go to slide 1' })).toBeInTheDocument();
  });

  it('groups buttons and indicators when they share a side', () => {
    setup({ buttonsPosition: 'end', indicatorsPosition: 'end' });
    const slot = screen.getByRole('button', { name: 'Next' }).parentElement;
    expect(slot).toHaveClass('col-start-3', 'justify-end');
    expect(slot).toContainElement(screen.getByRole('button', { name: 'Go to slide 2' }));
  });

  it('places buttons and indicators on different sides of the same row', () => {
    setup({ buttonsPosition: 'end', indicatorsPosition: 'start' });
    expect(screen.getByRole('button', { name: 'Previous' }).parentElement).toHaveClass(
      'col-start-3',
      'row-start-1',
    );
    expect(
      screen.getByRole('button', { name: 'Go to slide 1' }).closest('[class*="col-start"]'),
    ).toHaveClass('col-start-1', 'row-start-1');
  });

  it('renders no controls when both are off', () => {
    setup({ buttons: false, indicators: false });
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });
});
