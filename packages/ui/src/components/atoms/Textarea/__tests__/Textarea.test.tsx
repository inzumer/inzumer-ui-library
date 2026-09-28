import { Textarea } from '@components';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

describe('Textarea', () => {
  it('associates the label and accepts multi-line text', async () => {
    const user = userEvent.setup();
    render(<Textarea label="Prices" />);
    const textarea = screen.getByRole('textbox', { name: 'Prices' });
    await user.type(textarea, '40{Enter}50');
    expect(textarea).toHaveValue('40\n50');
  });

  it('shows the error, sets aria-invalid and hides the hint', () => {
    render(<Textarea label="Prices" hint="One per line" error="Add two prices" />);
    const textarea = screen.getByRole('textbox', { name: 'Prices' });
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveAccessibleDescription('Add two prices');
    expect(screen.queryByText('One per line')).not.toBeInTheDocument();
  });

  it('describes the textarea with the hint', () => {
    render(<Textarea label="Prices" hint="One per line" />);
    expect(screen.getByRole('textbox')).toHaveAccessibleDescription('One per line');
  });

  it('applies the resize variant and a custom className', () => {
    render(<Textarea resize="none" className="custom-class" />);
    expect(screen.getByRole('textbox')).toHaveClass('resize-none', 'custom-class');
  });
});
