import {
  describeTooth,
  getSurfaceName,
  getToothInfo,
  isPermanentTooth,
  ODONTOGRAM_LABELS,
  PERMANENT_TEETH,
} from '@components';
import { describe, expect, it } from 'vitest';

describe('FDI helpers', () => {
  it('lists the 32 permanent teeth once each', () => {
    expect(PERMANENT_TEETH).toHaveLength(32);
    expect(new Set(PERMANENT_TEETH).size).toBe(32);
  });

  it('recognizes permanent teeth only', () => {
    expect(isPermanentTooth('11')).toBe(true);
    expect(isPermanentTooth('48')).toBe(true);
    expect(isPermanentTooth('19')).toBe(false);
    expect(isPermanentTooth('55')).toBe(false);
  });

  it('describes a tooth by quadrant, position, type, arch and side', () => {
    expect(getToothInfo('16')).toEqual({
      fdi: '16',
      quadrant: 1,
      position: 6,
      type: 'firstMolar',
      arch: 'upper',
      side: 'right',
    });
    expect(getToothInfo('23')).toMatchObject({ arch: 'upper', side: 'left', type: 'canine' });
    expect(getToothInfo('38')).toMatchObject({ arch: 'lower', side: 'left', type: 'thirdMolar' });
    expect(getToothInfo('41')).toMatchObject({
      arch: 'lower',
      side: 'right',
      type: 'centralIncisor',
    });
  });

  it('names surfaces by tooth: incisal in front, palatal on the upper arch', () => {
    expect(getSurfaceName('O', '13')).toBe('incisal');
    expect(getSurfaceName('O', '14')).toBe('occlusal');
    expect(getSurfaceName('L', '26')).toBe('palatal');
    expect(getSurfaceName('L', '36')).toBe('lingual');
    expect(getSurfaceName('V', '36')).toBe('vestibular');
    expect(getSurfaceName('M', '36')).toBe('mesial');
    expect(getSurfaceName('D', '36')).toBe('distal');
  });

  it('builds the accessible name of a tooth in every language', () => {
    expect(describeTooth('11', undefined, ODONTOGRAM_LABELS.en)).toBe(
      'Tooth 11, upper right central incisor, No records',
    );
    expect(describeTooth('42', { state: 'inProgress' }, ODONTOGRAM_LABELS.es)).toBe(
      'Diente 42, incisivo lateral inferior derecho, En curso',
    );
    expect(describeTooth('35', { state: 'treated' }, ODONTOGRAM_LABELS.it)).toBe(
      'Dente 35, secondo premolare inferiore sinistro, Trattato',
    );
  });

  it('ships the same keys in every language', () => {
    const keys = (labels: object) => JSON.stringify(Object.keys(labels));

    expect(keys(ODONTOGRAM_LABELS.es)).toBe(keys(ODONTOGRAM_LABELS.en));
    expect(keys(ODONTOGRAM_LABELS.it)).toBe(keys(ODONTOGRAM_LABELS.en));
  });
});
