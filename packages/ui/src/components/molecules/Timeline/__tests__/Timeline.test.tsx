import { Timeline } from '@components';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Timeline', () => {
  const items = [
    { title: 'Founded', description: ['We started the company.'] },
    { title: 'Series A', description: ['Raised funding.', 'Grew the team.'] },
  ];

  it('renders a title for each item', () => {
    render(<Timeline items={items} />);
    expect(screen.getByText('Founded')).toBeInTheDocument();
    expect(screen.getByText('Series A')).toBeInTheDocument();
  });

  it('renders every description line for each item', () => {
    render(<Timeline items={items} />);
    expect(screen.getByText('Raised funding.')).toBeInTheDocument();
    expect(screen.getByText('Grew the team.')).toBeInTheDocument();
  });

  it('renders one list item per timeline entry', () => {
    render(<Timeline items={items} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(items.length);
  });

  it('applies a custom className alongside its own classes', () => {
    render(<Timeline items={items} className="custom-class" />);
    expect(screen.getByRole('list')).toHaveClass('custom-class', 'flex');
  });

  it('shows a lazy photo under an entry, or the given media element', () => {
    render(
      <Timeline
        items={[
          {
            title: 'Mix the batter',
            description: ['Beat the butter with the sugar.'],
            image: { src: '/steps/batter.jpg', alt: 'Batter in a bowl' },
          },
          {
            title: 'Bake',
            description: ['40 minutes at 180 °C.'],
            media: <picture data-testid="oven" />,
          },
          { title: 'Cool down', description: ['Wait 10 minutes.'] },
        ]}
      />,
    );
    const photo = screen.getByRole('img', { name: 'Batter in a bowl' });
    expect(photo).toHaveAttribute('src', '/steps/batter.jpg');
    expect(photo).toHaveAttribute('loading', 'lazy');
    expect(photo).toHaveClass('aspect-4/3');
    expect(photo.parentElement).toHaveClass('rounded-xl');
    expect(screen.getByTestId('oven')).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(1);
  });
});
