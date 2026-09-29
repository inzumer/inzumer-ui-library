import { Filter } from '@components';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

const options = [
  { value: 'all', label: 'All', id: 'filter-all' },
  { value: 'sweet', label: 'Sweet', colors: { background: 'red', text: 'white' } },
  { value: 'drinks', label: 'Drinks' },
];

const renderFilter = (onChange = vi.fn()) =>
  render(
    <Filter
      label="Filter by category"
      options={options}
      value="all"
      onChange={onChange}
      previousLabel="Previous"
      nextLabel="Next"
    />,
  );

/** jsdom has no layout: give the track a size and a scroll position. */
const layout = (track: HTMLElement, scrollLeft: number) => {
  Object.defineProperty(track, 'scrollWidth', { configurable: true, value: 600 });
  Object.defineProperty(track, 'clientWidth', { configurable: true, value: 300 });
  track.scrollLeft = scrollLeft;
  track.scrollBy = vi.fn();
  fireEvent.scroll(track);
};

describe('Filter', () => {
  it('renders a named group of toggle chips', () => {
    renderFilter();
    expect(screen.getByRole('group', { name: 'Filter by category' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('id', 'filter-all');
    expect(screen.getByRole('button', { name: 'Sweet' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('calls onChange with the chosen value', async () => {
    const onChange = vi.fn();
    renderFilter(onChange);
    await userEvent.click(screen.getByRole('button', { name: 'Drinks' }));
    expect(onChange).toHaveBeenCalledWith('drinks');
  });

  it('shows no arrows when every chip fits', () => {
    renderFilter();
    expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Previous' })).not.toBeInTheDocument();
  });

  it('shows the arrow of each side with hidden chips and scrolls a page', async () => {
    renderFilter();
    const track = screen.getByRole('group', { name: 'Filter by category' });
    act(() => layout(track, 0));
    expect(screen.queryByRole('button', { name: 'Previous' })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(track.scrollBy).toHaveBeenCalledWith(expect.objectContaining({ left: 270 }));

    act(() => layout(track, 150));
    expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  });
});
