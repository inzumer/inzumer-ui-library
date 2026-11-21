import { Stories, type StoriesProps } from '@components';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

type FakeAnimation = {
  play: ReturnType<typeof vi.fn>;
  pause: ReturnType<typeof vi.fn>;
  cancel: ReturnType<typeof vi.fn>;
  currentTime: number | null;
  onfinish: (() => void) | null;
};

let animations: FakeAnimation[] = [];

const latest = () => {
  const animation = animations.at(-1);
  if (!animation) {
    throw new Error('No animation started');
  }

  return animation;
};

const mockAnimate = () => {
  HTMLElement.prototype.animate = vi.fn().mockImplementation(() => {
    const animation: FakeAnimation = {
      play: vi.fn(),
      pause: vi.fn(),
      cancel: vi.fn(),
      currentTime: 1200,
      onfinish: null,
    };
    animations.push(animation);

    return animation;
  });
};

const mockMatchMedia = (reduced: boolean) => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: reduced && query.includes('reduce'),
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
};

const items: StoriesProps['items'] = [
  { id: 'story-lemon', src: 'lemon.jpg', alt: 'Lemon loaf', title: 'Lemon loaf' },
  {
    src: 'scones.jpg',
    alt: 'Scones',
    title: 'Scones',
    description: 'Served with tea',
    duration: 8000,
  },
  { src: 'focaccia.jpg', alt: 'Focaccia', action: <a href="#start">Start</a> },
];

const labels = { close: 'Close', previous: 'Previous', next: 'Next', pause: 'Pause', play: 'Play' };

const setup = (props: Partial<StoriesProps> = {}) => {
  const onClose = vi.fn();
  const view = render(
    <Stories open onClose={onClose} items={items} label="Recipes" labels={labels} {...props} />,
  );

  return { ...view, onClose };
};

const finish = () =>
  act(() => {
    latest().onfinish?.();
  });

describe('Stories', () => {
  const original = window.matchMedia;

  beforeEach(() => {
    animations = [];
    mockMatchMedia(false);
    mockAnimate();
  });

  afterEach(() => {
    window.matchMedia = original;
    Reflect.deleteProperty(HTMLElement.prototype, 'animate');
    vi.useRealTimers();
  });

  it('renders a named dialog with the first story', () => {
    setup();

    expect(screen.getByRole('dialog', { name: 'Recipes' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: '1 / 3' })).toHaveAttribute('id', 'story-lemon');
    expect(screen.getByRole('heading', { name: 'Lemon loaf' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Lemon loaf' })).toHaveAttribute('src', 'lemon.jpg');
    expect(document.querySelector('img[hidden]')).toHaveAttribute('src', 'scones.jpg');
  });

  it('renders nothing while closed or without items', () => {
    const { container, rerender } = setup({ open: false });
    expect(container).toBeEmptyDOMElement();

    rerender(<Stories open onClose={vi.fn()} items={[]} label="Recipes" labels={labels} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('animates the current bar for the story duration and moves on when it ends', () => {
    const onIndexChange = vi.fn();
    setup({ onIndexChange, duration: 4000 });

    expect(HTMLElement.prototype.animate).toHaveBeenLastCalledWith(
      [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }],
      { duration: 4000, easing: 'linear', fill: 'forwards' },
    );
    expect(onIndexChange).toHaveBeenLastCalledWith(0);

    finish();

    expect(screen.getByRole('group', { name: '2 / 3' })).toBeInTheDocument();
    expect(screen.getByText('Served with tea')).toBeInTheDocument();
    expect(HTMLElement.prototype.animate).toHaveBeenLastCalledWith(
      expect.any(Array),
      expect.objectContaining({ duration: 8000 }),
    );
    expect(animations[0]?.cancel).toHaveBeenCalled();
    expect(onIndexChange).toHaveBeenLastCalledWith(1);
  });

  it('fills the bars of the stories already seen', () => {
    setup({ startIndex: 1 });

    const bars = document.querySelectorAll<HTMLElement>('[aria-hidden="true"] > span > span');
    expect(bars[0]).toHaveStyle({ transform: 'scaleX(1)' });
    expect(bars[1]).toHaveAttribute('data-story-bar', 'current');
    expect(bars[2]).toHaveStyle({ transform: 'scaleX(0)' });
  });

  it('completes and closes after the last story', () => {
    const onComplete = vi.fn();
    const { onClose } = setup({ startIndex: 2, onComplete });

    finish();

    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('group', { name: '3 / 3' })).toBeInTheDocument();
  });

  it('goes forward and back with the tap areas and restarts the first story', () => {
    const { onClose } = setup({ buttonIds: { previous: 'stories-prev', next: 'stories-next' } });

    fireEvent.click(screen.getByTestId('stories-next'));
    expect(screen.getByRole('group', { name: '2 / 3' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(screen.getByRole('group', { name: '1 / 3' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(latest().currentTime).toBe(0);

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('moves with the arrow keys and restarts the first story', () => {
    setup();
    const dialog = screen.getByRole('dialog');

    fireEvent.keyDown(dialog, { key: 'ArrowRight' });
    expect(screen.getByRole('group', { name: '2 / 3' })).toBeInTheDocument();

    fireEvent.keyDown(dialog, { key: 'ArrowLeft' });
    expect(screen.getByRole('group', { name: '1 / 3' })).toBeInTheDocument();

    fireEvent.keyDown(dialog, { key: 'ArrowLeft' });
    expect(latest().currentTime).toBe(0);

    fireEvent.keyDown(dialog, { key: 'Enter' });
    expect(screen.getByRole('group', { name: '1 / 3' })).toBeInTheDocument();
  });

  it('ignores the arrow keys while closing and without animations', () => {
    Reflect.deleteProperty(HTMLElement.prototype, 'animate');
    const { rerender } = setup();

    fireEvent.keyDown(document, { key: 'ArrowLeft' });
    expect(screen.getByRole('group', { name: '1 / 3' })).toBeInTheDocument();

    rerender(
      <Stories open={false} onClose={vi.fn()} items={items} label="Recipes" labels={labels} />,
    );
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(screen.getByRole('group', { name: '1 / 3' })).toBeInTheDocument();
  });

  it('pauses and plays from its button and announces the story while paused', () => {
    setup({ buttonIds: { pause: 'stories-pause' } });
    const live = screen.getByText('1 / 3').parentElement;
    expect(live).toHaveAttribute('aria-live', 'off');

    fireEvent.click(screen.getByTestId('stories-pause'));
    expect(latest().pause).toHaveBeenCalled();
    expect(live).toHaveAttribute('aria-live', 'polite');

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(latest().pause).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    expect(latest().play).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
  });

  it('pauses while held and does not move when released', () => {
    vi.useFakeTimers();
    setup();
    const next = screen.getByRole('button', { name: 'Next' });

    fireEvent.pointerDown(next);
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(latest().pause).toHaveBeenCalled();

    fireEvent.pointerUp(next);
    fireEvent.click(next);
    expect(latest().play).toHaveBeenCalled();
    expect(screen.getByRole('group', { name: '1 / 3' })).toBeInTheDocument();

    fireEvent.pointerDown(next);
    fireEvent.pointerLeave(next);
    fireEvent.click(next);
    expect(screen.getByRole('group', { name: '2 / 3' })).toBeInTheDocument();
  });

  it('blocks the long-press menu on the tap areas', () => {
    setup();
    const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });

    screen.getByRole('button', { name: 'Next' }).dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
  });

  it('closes from its button', () => {
    const { onClose } = setup({ closeId: 'stories-close' });

    fireEvent.click(screen.getByTestId('stories-close'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('starts again from the start index when reopened', () => {
    const { rerender } = setup();
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));

    rerender(
      <Stories open={false} onClose={vi.fn()} items={items} label="Recipes" labels={labels} />,
    );
    rerender(<Stories open onClose={vi.fn()} items={items} label="Recipes" labels={labels} />);

    expect(screen.getByRole('group', { name: '1 / 3' })).toBeInTheDocument();
  });

  it('does not run on its own with reduced motion', () => {
    mockMatchMedia(true);
    setup({ labels: { ...labels, story: (index, total) => `Story ${index + 1} of ${total}` } });

    expect(HTMLElement.prototype.animate).not.toHaveBeenCalled();
    expect(screen.queryByRole('button', { name: 'Pause' })).toBeNull();
    expect(document.querySelector('[data-story-bar="current"]')).toHaveStyle({
      transform: 'scaleX(1)',
    });
    expect(screen.getByRole('group', { name: 'Story 1 of 3' })).toBeInTheDocument();
  });

  it('stays on each story without autoplay or Web Animations', () => {
    Reflect.deleteProperty(HTMLElement.prototype, 'animate');
    const { rerender } = setup();
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();

    rerender(
      <Stories
        open
        onClose={vi.fn()}
        items={items}
        label="Recipes"
        labels={labels}
        autoplay={false}
      />,
    );
    expect(screen.queryByRole('button', { name: 'Pause' })).toBeNull();
  });

  it('clears a pending hold when unmounted', () => {
    vi.useFakeTimers();
    const { unmount } = setup();
    const baseline = vi.getTimerCount();

    fireEvent.pointerDown(screen.getByRole('button', { name: 'Next' }));
    expect(vi.getTimerCount()).toBe(baseline + 1);
    unmount();

    expect(vi.getTimerCount()).toBeLessThanOrEqual(baseline);
  });
});
