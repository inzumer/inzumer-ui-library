import { Odontogram, ODONTOGRAM_LABELS, PERMANENT_TEETH } from '@components';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

describe('Odontogram', () => {
  it('draws the 32 permanent teeth as images without onToothPress', () => {
    render(<Odontogram />);
    expect(screen.getAllByRole('img')).toHaveLength(PERMANENT_TEETH.length);
    expect(screen.queryAllByRole('button')).toHaveLength(0);
    expect(screen.getByRole('group', { name: 'Odontogram' })).toBeInTheDocument();
  });

  it('names each tooth with its number, type, quadrant and state', () => {
    render(<Odontogram teeth={{ 16: { state: 'treated' }, 31: { state: 'pending' } }} />);
    expect(
      screen.getByRole('img', { name: 'Tooth 16, upper right first molar, Treated' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Tooth 31, lower left central incisor, Pending' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Tooth 48, lower right third molar, No records' }),
    ).toBeInTheDocument();
  });

  it('translates every text with the shipped labels', () => {
    const { rerender } = render(
      <Odontogram teeth={{ 26: { state: 'missing' } }} labels={ODONTOGRAM_LABELS.es} />,
    );
    expect(
      screen.getByRole('img', { name: 'Diente 26, primer molar superior izquierdo, Ausente' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('list', { name: 'Referencias' })).toBeInTheDocument();

    rerender(<Odontogram teeth={{ 13: { state: 'implant' } }} labels={ODONTOGRAM_LABELS.it} />);
    expect(
      screen.getByRole('img', { name: 'Dente 13, canino superiore destro, Impianto' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Odontogramma' })).toBeInTheDocument();
  });

  it('fills each state differently so color is not the only cue', () => {
    const { container } = render(
      <Odontogram
        teeth={{
          11: { state: 'treated' },
          12: { state: 'pending' },
          13: { state: 'inProgress' },
          14: { state: 'missing' },
          15: { state: 'implant' },
        }}
      />,
    );
    const fill = (state: string) =>
      container.querySelector(`[data-state="${state}"] path:nth-of-type(2)`)?.getAttribute('fill');

    expect(fill('default')).toBe('var(--surface-secondary)');
    expect(fill('treated')).toBe('currentColor');
    expect(fill('pending')).toMatch(/^url\(#tooth-.+-pending\)$/);
    expect(fill('inProgress')).toMatch(/^url\(#tooth-.+-inProgress\)$/);
    expect(fill('missing')).toBe('none');
    expect(fill('implant')).toMatch(/^url\(#tooth-.+-implant\)$/);
    expect(container.querySelector('[data-state="missing"] path')).toHaveClass('opacity-60');
  });

  it('calls onToothPress with the FDI code on tap', async () => {
    const user = userEvent.setup();
    const onToothPress = vi.fn();
    render(<Odontogram onToothPress={onToothPress} />);
    await user.click(screen.getByRole('button', { name: /^Tooth 36,/ }));
    expect(onToothPress).toHaveBeenCalledWith('36');
  });

  it('presses a tooth from the keyboard with Enter and Space only', async () => {
    const user = userEvent.setup();
    const onToothPress = vi.fn();
    render(<Odontogram onToothPress={onToothPress} />);
    await user.tab();
    expect(screen.getByRole('button', { name: /^Tooth 11,/ })).toHaveFocus();
    expect(screen.getByRole('button', { name: /^Tooth 11,/ })).toHaveClass(
      'focus-visible:outline-solid',
    );
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    await user.keyboard('a');
    expect(onToothPress).toHaveBeenCalledTimes(2);
    expect(onToothPress).toHaveBeenCalledWith('11');
  });

  it('marks the selected tooth as pressed', () => {
    render(<Odontogram selectedTooth="21" onToothPress={vi.fn()} />);
    expect(screen.getByRole('button', { name: /^Tooth 21,/ })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: /^Tooth 22,/ })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('ignores presses in read-only mode', async () => {
    const user = userEvent.setup();
    const onToothPress = vi.fn();
    render(<Odontogram readOnly onToothPress={onToothPress} />);
    expect(screen.queryAllByRole('button')).toHaveLength(0);
    await user.click(screen.getByRole('img', { name: /^Tooth 11,/ }));
    expect(onToothPress).not.toHaveBeenCalled();
  });

  it('dims the teeth outside highlight', () => {
    render(<Odontogram highlight={['16']} />);
    expect(screen.getByRole('img', { name: /^Tooth 16,/ })).not.toHaveClass('opacity-30');
    expect(screen.getByRole('img', { name: /^Tooth 17,/ })).toHaveClass('opacity-30');
  });

  it('lists every state in the legend and hides it on demand', () => {
    const { rerender } = render(<Odontogram />);
    expect(screen.getAllByRole('listitem')).toHaveLength(6);
    expect(screen.getByText('In progress')).toBeInTheDocument();

    rerender(<Odontogram legend={false} />);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('forwards the ref and merges className', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Odontogram ref={ref} className="custom-class" />);
    expect(ref.current).toHaveClass('custom-class', 'flex');
  });
});
