import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { CookiePreferences } from '@components';

const categories = [
  { id: 'necessary', title: 'Necessary', description: 'Keep the site working.', required: true },
  { id: 'analytics', title: 'Analytics', description: 'Measure how the site is used.' },
];

const Harness = ({ onSave = vi.fn(), onClose = vi.fn() }) => {
  const [value, setValue] = useState<Record<string, boolean>>({ analytics: false });
  return (
    <CookiePreferences
      open
      onClose={onClose}
      title="Cookie preferences"
      description="Choose what we can use."
      categories={categories}
      value={value}
      onChange={(id, enabled) => setValue((current) => ({ ...current, [id]: enabled }))}
      onSave={() => onSave(value)}
      saveLabel="Save"
      cancelLabel="Cancel"
      requiredLabel="Always on"
      idPrefix="cookies"
    />
  );
};

describe('CookiePreferences', () => {
  it('shows required categories as always on and optional ones as switches', () => {
    render(<Harness />);
    expect(screen.getByRole('dialog', { name: 'Cookie preferences' })).toBeInTheDocument();
    expect(screen.getByText('Choose what we can use.')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Necessary' })).toBeInTheDocument();
    expect(screen.getByText('Always on')).toBeInTheDocument();
    const analytics = screen.getByRole('switch', { name: 'Analytics' });
    expect(analytics).not.toBeChecked();
    expect(analytics).toHaveAccessibleDescription('Measure how the site is used.');
    expect(analytics).toHaveAttribute('id', 'cookies-analytics');
  });

  it('saves the chosen value and cancels without saving', async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    const onClose = vi.fn();
    render(<Harness onSave={onSave} onClose={onClose} />);

    await user.click(screen.getByRole('switch', { name: 'Analytics' }));
    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(onSave).toHaveBeenCalledWith({ analytics: true });
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('id', 'cookies-save');

    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('renders nothing while closed', () => {
    render(
      <CookiePreferences
        open={false}
        onClose={vi.fn()}
        title="Cookie preferences"
        categories={categories}
        value={{}}
        onChange={vi.fn()}
        onSave={vi.fn()}
        saveLabel="Save"
        cancelLabel="Cancel"
        requiredLabel="Always on"
      />,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
