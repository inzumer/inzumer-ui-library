import { Select } from '@components';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

const options = (
  <>
    <option value="ars">Pesos</option>
    <option value="usd">Dollars</option>
  </>
);

describe('Select', () => {
  it('associates the label with the select', () => {
    render(<Select label="Currency">{options}</Select>);
    expect(screen.getByRole('combobox', { name: 'Currency' })).toBeInTheDocument();
  });

  it('lets the user pick an option', async () => {
    const user = userEvent.setup();
    render(<Select label="Currency">{options}</Select>);
    const select = screen.getByRole('combobox', { name: 'Currency' });
    await user.selectOptions(select, 'usd');
    expect(select).toHaveValue('usd');
  });

  it('shows the error, sets aria-invalid and hides the hint', () => {
    render(
      <Select label="Currency" hint="Display only" error="Pick one">
        {options}
      </Select>,
    );
    const select = screen.getByRole('combobox', { name: 'Currency' });
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toHaveAccessibleDescription('Pick one');
    expect(screen.queryByText('Display only')).not.toBeInTheDocument();
  });

  it('describes the select with the hint', () => {
    render(
      <Select label="Currency" hint="Display only">
        {options}
      </Select>,
    );
    expect(screen.getByRole('combobox')).toHaveAccessibleDescription('Display only');
  });

  it('keeps a custom id and className', () => {
    render(
      <Select id="currency" className="custom-class">
        {options}
      </Select>,
    );
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('id', 'currency');
    expect(select).toHaveClass('custom-class', 'rounded-md');
  });
});
