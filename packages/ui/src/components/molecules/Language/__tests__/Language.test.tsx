import { Language } from '@components';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

const options = [
  { value: 'es', label: 'ES' },
  { value: 'en', label: 'EN' },
  { value: 'it', label: 'IT' },
];

const Controlled = ({ initial = 'es', onChange = vi.fn() }) => {
  const [value, setValue] = useState(initial);

  return (
    <Language
      aria-label="Idioma"
      options={options}
      value={value}
      onChange={(next) => {
        onChange(next);
        setValue(next);
      }}
    />
  );
};

describe('Language', () => {
  it('should render a radio group with a radio per option', () => {
    render(<Language options={options} value="es" onChange={vi.fn()} />);
    expect(screen.getByRole('radiogroup', { name: 'Language selector' })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('should accept a localized accessible name', () => {
    render(<Language aria-label="Idioma" options={options} value="es" onChange={vi.fn()} />);
    expect(screen.getByRole('radiogroup', { name: 'Idioma' })).toBeInTheDocument();
  });

  it('should mark the current value as checked', () => {
    render(<Language options={options} value="en" onChange={vi.fn()} />);
    expect(screen.getByRole('radio', { name: 'EN' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: 'ES' })).toHaveAttribute('aria-checked', 'false');
  });

  it('should call onChange with the clicked value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Language options={options} value="es" onChange={onChange} />);
    await user.click(screen.getByRole('radio', { name: 'EN' }));
    expect(onChange).toHaveBeenCalledWith('en');
  });

  it('should be a single Tab stop on the checked option', async () => {
    const user = userEvent.setup();
    render(<Language options={options} value="en" onChange={vi.fn()} />);
    await user.tab();
    expect(screen.getByRole('radio', { name: 'EN' })).toHaveFocus();
    expect(screen.getByRole('radio', { name: 'ES' })).toHaveAttribute('tabindex', '-1');
  });

  it('should make the first option focusable when no value matches', () => {
    render(<Language options={options} value="fr" onChange={vi.fn()} />);
    expect(screen.getByRole('radio', { name: 'ES' })).toHaveAttribute('tabindex', '0');
  });

  it('should move the selection with arrow keys, wrapping around', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Controlled onChange={onChange} />);
    await user.tab();

    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('radio', { name: 'EN' })).toHaveFocus();
    expect(screen.getByRole('radio', { name: 'EN' })).toHaveAttribute('aria-checked', 'true');

    await user.keyboard('{ArrowDown}{ArrowDown}');
    expect(screen.getByRole('radio', { name: 'ES' })).toHaveAttribute('aria-checked', 'true');

    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('radio', { name: 'IT' })).toHaveAttribute('aria-checked', 'true');

    await user.keyboard('{ArrowUp}');
    expect(screen.getByRole('radio', { name: 'EN' })).toHaveAttribute('aria-checked', 'true');
    expect(onChange).toHaveBeenLastCalledWith('en');
  });

  it('should jump to the first and last option with Home and End', async () => {
    const user = userEvent.setup();
    render(<Controlled initial="en" />);
    await user.tab();

    await user.keyboard('{End}');
    expect(screen.getByRole('radio', { name: 'IT' })).toHaveAttribute('aria-checked', 'true');
    await user.keyboard('{Home}');
    expect(screen.getByRole('radio', { name: 'ES' })).toHaveAttribute('aria-checked', 'true');
  });

  it('should ignore other keys and still call a custom onKeyDown', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onKeyDown = vi.fn();
    render(<Language options={options} value="es" onChange={onChange} onKeyDown={onKeyDown} />);
    await user.tab();
    await user.keyboard('a');
    expect(onKeyDown).toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should not call onChange when the key lands on the current value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Language options={options} value="es" onChange={onChange} />);
    await user.tab();
    await user.keyboard('{Home}');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should render a decorative sliding indicator behind the selected option', () => {
    const { container } = render(<Language options={options} value="es" onChange={vi.fn()} />);
    const indicator = container.querySelector('[aria-hidden="true"]');
    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveClass('transition-[transform,width,height]');
  });

  it('should apply a custom className alongside its own classes', () => {
    render(<Language options={options} value="es" onChange={vi.fn()} className="custom-class" />);
    expect(screen.getByRole('radiogroup')).toHaveClass('custom-class', 'relative');
  });
});
