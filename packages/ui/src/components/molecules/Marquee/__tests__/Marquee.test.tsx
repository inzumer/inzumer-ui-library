import { Marquee } from '@components';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const animation = { pause: vi.fn(), play: vi.fn(), cancel: vi.fn() };

const removeAnimate = () => {
  Reflect.deleteProperty(HTMLElement.prototype, 'animate');
};

beforeEach(() => {
  HTMLElement.prototype.animate = vi.fn().mockReturnValue(animation);
});

afterEach(() => {
  removeAnimate();
  vi.clearAllMocks();
});

const renderMarquee = (props: Partial<Parameters<typeof Marquee>[0]> = {}) =>
  render(
    <Marquee label="Tags" {...props}>
      <span>Bread</span>
    </Marquee>,
  );

describe('Marquee', () => {
  it('should render a named region with a hidden looped copy', () => {
    renderMarquee();

    expect(screen.getByRole('region', { name: 'Tags' })).toBeInTheDocument();
    expect(screen.getAllByText('Bread')).toHaveLength(2);
    expect(screen.getAllByText('Bread')[1]?.parentElement).toHaveAttribute('aria-hidden', 'true');
  });

  it('should pause and play from its button', () => {
    renderMarquee({ buttonId: 'tags-pause', pauseLabel: 'Pausar', playLabel: 'Reanudar' });

    const button = screen.getByRole('button', { name: 'Pausar' });

    expect(button).toHaveAttribute('id', 'tags-pause');
    fireEvent.click(button);
    expect(animation.pause).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Reanudar' })).toBeInTheDocument();
  });

  it('should pause on hover and play again on leave', () => {
    renderMarquee();

    const viewport = screen.getByRole('region').firstElementChild as HTMLElement;

    fireEvent.mouseEnter(viewport);
    expect(animation.pause).toHaveBeenCalled();
    fireEvent.mouseLeave(viewport);
    expect(animation.play).toHaveBeenCalledTimes(2);
  });

  it('should stay still and scroll by hand without animations', () => {
    removeAnimate();
    renderMarquee();

    expect(screen.getAllByText('Bread')).toHaveLength(1);
    expect(screen.getByRole('region').firstElementChild).toHaveClass('overflow-x-auto');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
