import { Input } from '@components';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Input', () => {
  it('renders without label', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders with label and associates it correctly', () => {
    render(<Input label="Email" placeholder="email@example.com" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('shows error message and sets aria-invalid', () => {
    render(<Input label="Email" error="Invalid email" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid email');
  });

  it('shows hint when no error', () => {
    render(<Input label="Email" hint="We will never share your email" />);
    expect(screen.getByText('We will never share your email')).toBeInTheDocument();
  });

  it('hides hint when error is present', () => {
    render(<Input hint="A hint" error="An error" />);
    expect(screen.queryByText('A hint')).not.toBeInTheDocument();
    expect(screen.getByText('An error')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is set', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('applies a custom className alongside its own classes', () => {
    render(<Input className="custom-class" placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toHaveClass('custom-class', 'rounded-md');
  });
});
