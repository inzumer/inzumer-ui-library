import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CookieBanner } from '@components';

const props = {
  title: 'Cookies',
  description: 'We use analytics cookies.',
  acceptLabel: 'Accept',
  rejectLabel: 'Reject',
};

describe('CookieBanner', () => {
  it('renders a labelled region with accept and reject', async () => {
    const user = userEvent.setup();
    const onAccept = vi.fn();
    const onReject = vi.fn();
    render(<CookieBanner {...props} onAccept={onAccept} onReject={onReject} />);

    expect(screen.getByRole('region', { name: 'Cookies' })).toBeInTheDocument();
    expect(screen.getByText('We use analytics cookies.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Customize' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Accept' }));
    await user.click(screen.getByRole('button', { name: 'Reject' }));
    expect(onAccept).toHaveBeenCalledOnce();
    expect(onReject).toHaveBeenCalledOnce();
  });

  it('offers customizing when a handler is given, with stable button ids', async () => {
    const user = userEvent.setup();
    const onCustomize = vi.fn();
    render(
      <CookieBanner
        {...props}
        customizeLabel="Customize"
        onAccept={vi.fn()}
        onReject={vi.fn()}
        onCustomize={onCustomize}
        buttonIds={{
          accept: 'consent-accept',
          reject: 'consent-reject',
          customize: 'consent-customize',
        }}
        className="custom-class"
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Customize' }));
    expect(onCustomize).toHaveBeenCalledOnce();
    expect(screen.getByRole('button', { name: 'Accept' })).toHaveAttribute('id', 'consent-accept');
    expect(screen.getByRole('button', { name: 'Reject' })).toHaveAttribute('id', 'consent-reject');
    expect(screen.getByRole('button', { name: 'Customize' })).toHaveAttribute(
      'id',
      'consent-customize',
    );
    expect(screen.getByRole('region')).toHaveClass('custom-class', 'fixed');
  });
});
