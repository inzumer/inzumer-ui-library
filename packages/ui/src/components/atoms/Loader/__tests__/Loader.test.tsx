import { Loader } from '@components';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

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

  describe('messages', () => {
    afterEach(() => vi.useRealTimers());

    it('shows one of the messages and changes it every interval', () => {
      vi.useFakeTimers();
      render(<Loader label="Saving" messages={['Whisking', 'Tasting']} messageInterval={1000} />);
      const first = screen.getByText(/Whisking|Tasting/).textContent;
      act(() => vi.advanceTimersByTime(1000));
      expect(screen.getByText(/Whisking|Tasting/).textContent).not.toBe(first);
    });
  });

  describe('screen', () => {
    it('covers the page as a busy modal dialog named by the label', () => {
      render(<Loader screen label="Signing in" messages={['Preheating the oven']} />);
      const dialog = screen.getByRole('dialog', { name: 'Signing in' });
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-busy', 'true');
      expect(dialog.parentElement).toHaveClass('fixed', 'inset-0', 'items-center');
      expect(screen.getByRole('status')).toHaveClass('flex-col');
      expect(screen.getByText('Preheating the oven')).toBeInTheDocument();
    });

    it('keeps the focus inside and locks the page scroll', async () => {
      render(
        <>
          <button type="button">Behind</button>
          <Loader screen label="Saving" />
        </>,
      );
      expect(screen.getByRole('dialog')).toHaveFocus();
      await userEvent.tab();
      expect(screen.getByRole('button', { name: 'Behind' })).not.toHaveFocus();
      expect(document.body.style.overflow).toBe('hidden');
    });
  });
});
