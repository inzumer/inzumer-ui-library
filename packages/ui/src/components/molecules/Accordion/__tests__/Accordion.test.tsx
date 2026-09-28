import { Accordion } from '@components';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

describe('Accordion', () => {
  it('starts collapsed and toggles from the summary', async () => {
    const user = userEvent.setup();
    const { container } = render(<Accordion summary="Formulas">Waste factor</Accordion>);
    const details = container.querySelector('details');
    expect(details).not.toHaveAttribute('open');

    await user.click(screen.getByText('Formulas'));
    expect(details).toHaveAttribute('open');
    expect(screen.getByText('Waste factor')).toBeVisible();
  });

  it('can start expanded and collapses from the summary', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Accordion summary="Formulas" open>
        Waste factor
      </Accordion>,
    );
    const details = container.querySelector('details');
    expect(details).toHaveAttribute('open');

    await user.click(screen.getByText('Formulas'));
    expect(details).not.toHaveAttribute('open');
  });

  it('accepts classes for the root, summary and content', () => {
    const { container } = render(
      <Accordion
        summary="Formulas"
        className="custom-root"
        summaryClassName="custom-summary"
        contentClassName="custom-content"
      >
        Waste factor
      </Accordion>,
    );
    expect(container.querySelector('details')).toHaveClass('group', 'custom-root');
    expect(container.querySelector('summary')).toHaveClass('custom-summary', 'cursor-pointer');
    expect(screen.getByText('Waste factor')).toHaveClass('custom-content');
  });
});
