import { useId } from 'react';
import { toothStateStyles } from './Odontogram.styles';
import type { ToothState } from './utils/fdi';

export type ToothPatternsProps = {
  scope: string;
  size?: number;
};

/** Unique, url-safe scope for the pattern ids of one SVG. */
export const usePatternScope = () => `tooth-${useId().replace(/[^\w-]/g, '')}`;

/** Text color class of a state, so `currentColor` paints its stroke, fill and pattern. */
export const toothColor = (state: ToothState) => toothStateStyles({ state });

/** Fill of a tooth or a surface for its state: solid, a pattern, or the neutral surface. */
export const toothFill = (scope: string, state: ToothState) => {
  const fills: Record<ToothState, string> = {
    default: 'var(--surface-secondary)',
    treated: 'currentColor',
    pending: `url(#${scope}-pending)`,
    inProgress: `url(#${scope}-inProgress)`,
    missing: 'none',
    implant: `url(#${scope}-implant)`,
  };

  return fills[state];
};

/** Hatch, dots and stripes that tell pending, in progress and implant apart without color. */
export const ToothPatterns = ({ scope, size = 8 }: ToothPatternsProps) => (
  <defs>
    <pattern
      id={`${scope}-pending`}
      className={toothColor('pending')}
      patternUnits="userSpaceOnUse"
      width={size}
      height={size}
      patternTransform="rotate(45)"
    >
      <rect width={size} height={size} fill="currentColor" opacity={0.15} />
      <line x1={0} y1={0} x2={0} y2={size} stroke="currentColor" strokeWidth={size / 2.5} />
    </pattern>
    <pattern
      id={`${scope}-inProgress`}
      className={toothColor('inProgress')}
      patternUnits="userSpaceOnUse"
      width={size}
      height={size}
    >
      <rect width={size} height={size} fill="currentColor" opacity={0.15} />
      <circle cx={size / 2} cy={size / 2} r={size / 4} fill="currentColor" />
    </pattern>
    <pattern
      id={`${scope}-implant`}
      className={toothColor('implant')}
      patternUnits="userSpaceOnUse"
      width={size}
      height={size}
    >
      <rect width={size} height={size} fill="currentColor" />
      <line
        x1={0}
        y1={size / 2}
        x2={size}
        y2={size / 2}
        stroke="var(--surface-primary)"
        strokeWidth={size / 4}
      />
    </pattern>
  </defs>
);
