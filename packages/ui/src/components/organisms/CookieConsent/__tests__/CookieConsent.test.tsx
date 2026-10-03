import { CookieConsent, type CookieChoices, type CookieConsentProps } from '@components';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

const categories = [
  { id: 'necessary', title: 'Necessary', description: 'Settings on this device.', required: true },
  { id: 'analytics', title: 'Analytics', description: 'Visits, only with your consent.' },
  { id: 'ads', title: 'Advertising', description: 'Personalized ads.' },
];

const labels = {
  title: 'Cookies',
  description: 'We use analytics cookies.',
  accept: 'Accept',
  reject: 'Reject',
  customize: 'Customize',
  preferencesTitle: 'Cookie preferences',
  preferencesDescription: 'Choose which cookies we can use.',
  save: 'Save',
  cancel: 'Cancel',
  required: 'Always on',
};

const Controlled = (
  props: Partial<CookieConsentProps> & { onSaved?: (v: CookieChoices) => void },
) => {
  const [value, setValue] = useState<CookieChoices | null>(null);

  return (
    <CookieConsent
      mode="banner"
      categories={categories}
      labels={labels}
      value={value}
      onChange={(next) => {
        setValue(next);
        props.onSaved?.(next);
      }}
      {...props}
    />
  );
};

describe('CookieConsent', () => {
  it('shows the banner while unanswered and hides it after accepting', async () => {
    const user = userEvent.setup();
    const onSaved = vi.fn();
    render(<Controlled onSaved={onSaved} />);

    expect(screen.getByRole('region', { name: 'Cookies' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Accept' }));

    expect(onSaved).toHaveBeenCalledWith({ analytics: true, ads: true });
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });

  it('rejects every optional category', async () => {
    const user = userEvent.setup();
    const onSaved = vi.fn();
    render(<Controlled onSaved={onSaved} />);
    await user.click(screen.getByRole('button', { name: 'Reject' }));
    expect(onSaved).toHaveBeenCalledWith({ analytics: false, ads: false });
  });

  it('customizes from the banner and saves the chosen categories', async () => {
    const user = userEvent.setup();
    const onSaved = vi.fn();
    render(<Controlled onSaved={onSaved} />);

    await user.click(screen.getByRole('button', { name: 'Customize' }));
    const dialog = await screen.findByRole('dialog', { name: 'Cookie preferences' });
    expect(screen.queryByRole('region', { name: 'Cookies' })).not.toBeInTheDocument();
    expect(screen.getByText('Always on')).toBeInTheDocument();
    expect(screen.getByText('Choose which cookies we can use.')).toBeInTheDocument();

    await user.click(screen.getByRole('switch', { name: 'Analytics' }));
    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(onSaved).toHaveBeenCalledWith({ analytics: true, ads: false });
    await waitFor(() => expect(dialog).not.toBeInTheDocument());
  });

  it('brings the banner back when the preferences are cancelled', async () => {
    const user = userEvent.setup();
    render(<Controlled />);
    await user.click(screen.getByRole('button', { name: 'Customize' }));
    await user.click(await screen.findByRole('button', { name: 'Cancel' }));
    expect(await screen.findByRole('region', { name: 'Cookies' })).toBeInTheDocument();
  });

  it('opens the preferences from outside with the saved answer in modal mode', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <CookieConsent
        mode="modal"
        categories={categories}
        labels={labels}
        value={{ analytics: true, ads: false }}
        onChange={onChange}
        open={false}
        onOpenChange={onOpenChange}
      />,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByRole('region')).not.toBeInTheDocument();

    rerender(
      <CookieConsent
        mode="modal"
        categories={categories}
        labels={labels}
        value={{ analytics: true, ads: false }}
        onChange={onChange}
        open
        onOpenChange={onOpenChange}
      />,
    );
    expect(await screen.findByRole('switch', { name: 'Analytics' })).toBeChecked();
    expect(screen.getByRole('switch', { name: 'Advertising' })).not.toBeChecked();

    await user.click(screen.getByRole('switch', { name: 'Advertising' }));
    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(onChange).toHaveBeenCalledWith({ analytics: true, ads: true });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('saves every switch at once in inline mode, with stable ids', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <CookieConsent
        mode="inline"
        categories={categories}
        labels={labels}
        value={null}
        onChange={onChange}
        getId={(kind, name) => `consent-${kind}-${name}`}
        className="custom-class"
      />,
    );

    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    const analytics = screen.getByRole('switch', { name: 'Analytics' });
    expect(analytics).toHaveAttribute('id', 'consent-switch-analytics');
    expect(analytics).toHaveAccessibleDescription('Visits, only with your consent.');

    await user.click(analytics);
    expect(onChange).toHaveBeenCalledWith({ analytics: true, ads: false });
  });

  it('uses the given ids on the banner buttons', () => {
    render(
      <Controlled getId={(kind, name) => `consent-${kind}-${name}`} className="custom-class" />,
    );
    expect(screen.getByRole('button', { name: 'Accept' })).toHaveAttribute(
      'id',
      'consent-button-accept',
    );
    expect(screen.getByRole('region')).toHaveClass('custom-class', 'fixed');
  });
});
