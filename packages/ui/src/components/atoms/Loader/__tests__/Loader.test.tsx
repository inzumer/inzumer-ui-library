import { Loader } from '@components';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Loader', () => {
  it('announces what is loading with a spinning ring by default', () => {
    render(<Loader label="Loading your account" />);
    const status = screen.getByRole('status');
    expect(status).toHaveTextContent('Loading your account');
    expect(screen.getByText('Loading your account')).toHaveClass('sr-only');
    const mark = status.querySelector('[aria-hidden="true"]');
    expect(mark).toHaveClass('animate-spin', 'size-10');
    expect(mark?.firstElementChild).toHaveClass('rounded-full');
  });

  it('pulses a custom mark and can show its label', () => {
    render(
      <Loader
        label="Loading"
        showLabel
        effect="pulse"
        size="xl"
        speed="slow"
        layout="stacked"
        mark={<img src="/logo.webp" alt="" />}
      />,
    );
    const mark = screen.getByRole('status').querySelector('[aria-hidden="true"]');
    expect(mark).toHaveClass('animate-pulse', 'size-24', '[animation-duration:2s]');
    expect(mark?.querySelector('img')).toHaveAttribute('src', '/logo.webp');
    expect(screen.getByText('Loading')).not.toHaveClass('sr-only');
    expect(screen.getByRole('status')).toHaveClass('flex-col');
  });
});
