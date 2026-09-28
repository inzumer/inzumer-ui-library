import { Dropdown } from '@components';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

const options = [
  { value: 'ARS', label: 'ARS — Argentine peso' },
  { value: 'USD', label: 'USD — US dollar' },
  { value: 'EUR', label: 'EUR — Euro' },
];

const Harness = ({ onChange = vi.fn(), ...props }: Partial<Parameters<typeof Dropdown>[0]>) => {
  const [value, setValue] = useState('ARS');
  return (
    <Dropdown
      id="currency"
      label="Currency"
      options={options}
      value={value}
      onChange={(next) => {
        setValue(next);
        onChange(next);
      }}
      {...props}
    />
  );
};

const trigger = () => screen.getByRole('combobox', { name: /Currency/ });

describe('Dropdown', () => {
  it('shows the label and the selected option, closed', () => {
    render(<Harness />);
    expect(trigger()).toHaveTextContent('ARS — Argentine peso');
    expect(trigger()).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('opens with a click and picks an option', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Harness onChange={onChange} />);
    await user.click(trigger());
    expect(screen.getByRole('listbox', { name: 'Currency' })).toBeVisible();
    expect(screen.getByRole('option', { name: 'ARS — Argentine peso' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await user.click(screen.getByRole('option', { name: 'EUR — Euro' }));
    expect(onChange).toHaveBeenCalledWith('EUR');
    expect(trigger()).toHaveTextContent('EUR — Euro');
    expect(trigger()).toHaveAttribute('aria-expanded', 'false');
  });

  it('works with the keyboard like a native select', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Harness onChange={onChange} />);
    trigger().focus();

    await user.keyboard('{ArrowDown}');
    expect(trigger()).toHaveAttribute('aria-activedescendant', 'currency-option-0');
    await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}');
    expect(trigger()).toHaveAttribute('aria-activedescendant', 'currency-option-2');
    await user.keyboard('{ArrowUp}{Home}');
    expect(trigger()).toHaveAttribute('aria-activedescendant', 'currency-option-0');
    await user.keyboard('{End}{Enter}');
    expect(onChange).toHaveBeenLastCalledWith('EUR');

    await user.keyboard('{Home}');
    expect(trigger()).toHaveAttribute('aria-activedescendant', 'currency-option-0');
    await user.keyboard('{Escape}');
    expect(trigger()).toHaveAttribute('aria-expanded', 'false');
    expect(onChange).toHaveBeenCalledTimes(1);

    await user.keyboard('{End}');
    await user.keyboard(' ');
    expect(trigger()).toHaveAttribute('aria-expanded', 'false');
    await user.keyboard(' ');
    expect(trigger()).toHaveAttribute('aria-expanded', 'true');
    await user.keyboard('{Enter}');
    await user.keyboard('{ArrowUp}{Tab}');
    expect(trigger()).toHaveAttribute('aria-expanded', 'false');
  });

  it('jumps to an option by its first letter, open or closed', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Harness onChange={onChange} />);
    trigger().focus();

    await user.keyboard('u');
    expect(onChange).toHaveBeenLastCalledWith('USD');
    await user.keyboard('{Enter}e');
    expect(trigger()).toHaveAttribute('aria-activedescendant', 'currency-option-2');
    await user.keyboard('z');
    expect(trigger()).toHaveAttribute('aria-activedescendant', 'currency-option-2');
  });

  it('closes on an outside click and toggles with the trigger', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Harness />
        <button type="button">Outside</button>
      </>,
    );
    await user.click(trigger());
    await user.click(screen.getByRole('button', { name: 'Outside' }));
    expect(trigger()).toHaveAttribute('aria-expanded', 'false');
    await user.click(trigger());
    await user.click(trigger());
    expect(trigger()).toHaveAttribute('aria-expanded', 'false');
  });

  it('highlights the option under the pointer', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(trigger());
    await user.hover(screen.getByRole('option', { name: 'USD — US dollar' }));
    expect(trigger()).toHaveAttribute('aria-activedescendant', 'currency-option-1');
  });

  it('shows the hint or the error, and submits through a hidden input', () => {
    const { rerender, container } = render(<Harness hint="Display only" name="currency" />);
    expect(trigger()).toHaveAccessibleDescription('Display only');
    expect(container.querySelector('input[type="hidden"]')).toHaveAttribute('value', 'ARS');
    rerender(<Harness error="Pick one" />);
    expect(trigger()).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Pick one');
  });

  it('keeps the first option selected when the value is unknown, and can be disabled', () => {
    render(<Dropdown label="Currency" options={options} value="JPY" onChange={vi.fn()} disabled />);
    expect(trigger()).toHaveTextContent('ARS — Argentine peso');
    expect(trigger()).toBeDisabled();
  });
});
