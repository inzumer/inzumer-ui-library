import { RichText } from '@components';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('RichText', () => {
  it('renders children', () => {
    render(<RichText variant="p2">Hello world</RichText>);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('maps heading variants to the matching heading element', () => {
    render(<RichText variant="h1">Title</RichText>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Title');
  });

  it('renders span variants as <span>', () => {
    render(<RichText variant="s1">Label</RichText>);
    expect(screen.getByText('Label').tagName).toBe('SPAN');
  });

  it('renders paragraph variants as <p>', () => {
    render(<RichText variant="p1">Body</RichText>);
    expect(screen.getByText('Body').tagName).toBe('P');
  });

  it('allows overriding the rendered element via "as"', () => {
    render(
      <RichText variant="p2" as="h3">
        Overridden
      </RichText>,
    );
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Overridden');
  });

  it('applies bold weight when the bold shorthand is set', () => {
    render(
      <RichText variant="p2" bold>
        Bold text
      </RichText>,
    );
    expect(screen.getByText('Bold text')).toHaveClass('font-bold');
  });

  it('applies a custom className alongside its own classes', () => {
    render(
      <RichText variant="p2" className="custom-class">
        Text
      </RichText>,
    );
    expect(screen.getByText('Text')).toHaveClass('custom-class', 'text-[var(--text-primary)]');
  });
});
