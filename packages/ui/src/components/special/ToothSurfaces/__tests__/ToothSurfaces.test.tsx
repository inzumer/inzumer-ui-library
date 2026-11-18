import { getSurfaceZone, ODONTOGRAM_LABELS, ToothSurfaces } from '@components';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

describe('ToothSurfaces', () => {
  it('draws the five surfaces as images without onSurfacePress', () => {
    render(<ToothSurfaces fdi="16" surfaces={{ O: 'treated' }} />);
    expect(screen.getByRole('group', { name: 'Surfaces of tooth 16' })).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(5);
    expect(screen.getByRole('img', { name: 'Occlusal, Treated' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Palatal, No records' })).toBeInTheDocument();
  });

  it('names the surfaces of front and lower teeth', () => {
    render(<ToothSurfaces fdi="42" labels={ODONTOGRAM_LABELS.es} surfaces={{ V: 'pending' }} />);
    expect(screen.getByRole('img', { name: 'Incisal, Sin registros' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Lingual, Sin registros' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Vestibular, Pendiente' })).toBeInTheDocument();
    expect(screen.getByText('V')).toBeInTheDocument();
  });

  it('places surfaces as seen from the front', () => {
    expect(getSurfaceZone('V', '16')).toBe('top');
    expect(getSurfaceZone('L', '16')).toBe('bottom');
    expect(getSurfaceZone('M', '16')).toBe('right');
    expect(getSurfaceZone('D', '16')).toBe('left');
    expect(getSurfaceZone('V', '36')).toBe('bottom');
    expect(getSurfaceZone('L', '36')).toBe('top');
    expect(getSurfaceZone('M', '36')).toBe('left');
    expect(getSurfaceZone('D', '36')).toBe('right');
    expect(getSurfaceZone('O', '36')).toBe('center');
  });

  it('presses surfaces by tap and keyboard and reflects the selection', async () => {
    const user = userEvent.setup();
    const onSurfacePress = vi.fn();
    render(<ToothSurfaces fdi="26" selected={['M']} onSurfacePress={onSurfacePress} />);
    expect(screen.getByRole('button', { name: 'Mesial, No records' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await user.click(screen.getByRole('button', { name: 'Occlusal, No records' }));
    expect(onSurfacePress).toHaveBeenCalledWith('O');

    await user.tab();
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    await user.keyboard('x');
    expect(onSurfacePress).toHaveBeenCalledTimes(3);
  });

  it('ignores presses in read-only mode', async () => {
    const user = userEvent.setup();
    const onSurfacePress = vi.fn();
    render(<ToothSurfaces fdi="11" readOnly onSurfacePress={onSurfacePress} />);
    expect(screen.queryAllByRole('button')).toHaveLength(0);
    await user.click(screen.getByRole('img', { name: 'Incisal, No records' }));
    expect(onSurfacePress).not.toHaveBeenCalled();
  });

  it('keeps a missing surface outlined and faded', () => {
    const { container } = render(<ToothSurfaces fdi="11" surfaces={{ D: 'missing' }} />);
    const polygon = container.querySelector('[data-state="missing"] polygon');

    expect(polygon).toHaveAttribute('fill', 'var(--surface-primary)');
    expect(polygon).toHaveClass('opacity-60');
  });

  it('forwards the ref and merges className', () => {
    const ref = createRef<SVGSVGElement>();
    render(<ToothSurfaces ref={ref} fdi="11" className="h-24 w-24" />);
    expect(ref.current).toHaveClass('h-24', 'w-24', 'touch-manipulation');
  });
});
