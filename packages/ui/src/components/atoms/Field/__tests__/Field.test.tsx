import { Field, fieldAria } from '@components';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Field', () => {
  it('labels the control and shows the hint', () => {
    render(
      <Field id="name" label="Name" hint="As on your ID">
        <input id="name" {...fieldAria('name', { hint: 'As on your ID' })} />
      </Field>,
    );
    const input = screen.getByLabelText('Name');
    expect(input).toHaveAttribute('aria-describedby', 'name-hint');
    expect(input).not.toHaveAttribute('aria-invalid');
    expect(screen.getByText('As on your ID')).toHaveAttribute('id', 'name-hint');
  });

  it('shows the error instead of the hint', () => {
    render(
      <Field id="name" label="Name" hint="Hint" error="Required">
        <input id="name" {...fieldAria('name', { hint: 'Hint', error: 'Required' })} />
      </Field>,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
    expect(screen.queryByText('Hint')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toHaveAttribute('aria-invalid', 'true');
  });

  it('can render the label as a span with an id', () => {
    render(
      <Field id="city" label="City" labelId="city-label">
        <button type="button" aria-labelledby="city-label">
          Madrid
        </button>
      </Field>,
    );
    expect(screen.getByRole('button', { name: 'City' })).toBeInTheDocument();
  });
});
