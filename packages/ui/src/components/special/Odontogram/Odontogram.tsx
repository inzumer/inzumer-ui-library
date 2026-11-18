import { cn, idAttributes } from '@utils';
import { forwardRef, type HTMLAttributes, type KeyboardEvent } from 'react';
import { PERMANENT_TOOTH_SHAPES, type ToothPosition } from './data/toothShapes';
import {
  odontogramLegendItemStyles,
  odontogramLegendStyles,
  odontogramStyles,
  odontogramSvgStyles,
  odontogramSwatchStyles,
  toothDetailStyles,
  toothOutlineStyles,
  toothStyles,
} from './Odontogram.styles';
import { toothColor, toothFill, ToothPatterns, usePatternScope } from './ToothPatterns';
import { TOOTH_STATES, type PermanentTooth, type Quadrant, type ToothView } from './utils/fdi';
import { describeTooth, ODONTOGRAM_LABELS, type OdontogramLabels } from './utils/labels';

export type OdontogramProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  teeth?: Partial<Record<PermanentTooth, ToothView>>;
  selectedTooth?: PermanentTooth | undefined;
  highlight?: readonly PermanentTooth[];
  readOnly?: boolean;
  onToothPress?: (fdi: PermanentTooth) => void;
  labels?: OdontogramLabels;
  legend?: boolean;
};

type OdontogramToothProps = {
  fdi: PermanentTooth;
  position: ToothPosition;
  view: ToothView | undefined;
  scope: string;
  labels: OdontogramLabels;
  selected: boolean;
  dimmed: boolean;
  toothId: string | undefined;
  onPress: ((fdi: PermanentTooth) => void) | undefined;
};

const QUADRANTS: readonly { quadrant: Quadrant; transform?: string }[] = [
  { quadrant: 1 },
  { quadrant: 2, transform: 'matrix(-1 0 0 1 409 0)' },
  { quadrant: 4, transform: 'matrix(1 0 0 -1 0 694)' },
  { quadrant: 3, transform: 'matrix(-1 0 0 -1 409 694)' },
];

const POSITIONS: readonly ToothPosition[] = [1, 2, 3, 4, 5, 6, 7, 8];

/** One anatomical tooth: a button when it can be pressed, an image with its state otherwise. */
const OdontogramTooth = ({
  fdi,
  position,
  view,
  scope,
  labels,
  selected,
  dimmed,
  toothId,
  onPress,
}: OdontogramToothProps) => {
  const state = view?.state ?? 'default';
  const shape = PERMANENT_TOOTH_SHAPES[position];
  const interactive = onPress !== undefined;

  const handleKeyDown = (event: KeyboardEvent<SVGGElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    onPress?.(fdi);
  };

  return (
    <g
      {...idAttributes(interactive ? toothId : undefined)}
      role={interactive ? 'button' : 'img'}
      aria-label={describeTooth(fdi, view, labels)}
      aria-pressed={interactive ? selected : undefined}
      tabIndex={interactive ? 0 : undefined}
      data-state={state}
      onClick={interactive ? () => onPress(fdi) : undefined}
      onKeyDown={interactive ? handleKeyDown : undefined}
      className={cn(toothColor(state), toothStyles({ interactive, dimmed }))}
    >
      <path
        d={shape.outline}
        className={toothOutlineStyles({ selected, missing: state === 'missing' })}
      />
      <path d={shape.shadow} fill={toothFill(scope, state)} />
      {shape.details.map((detail) => (
        <path key={detail} d={detail} className={toothDetailStyles} />
      ))}
    </g>
  );
};

/**
 * Anatomical odontogram of the permanent dentition in FDI notation, colored by the state of each
 * tooth. It only draws: the consumer computes each tooth's state and handles the press.
 */
export const Odontogram = forwardRef<HTMLDivElement, OdontogramProps>(
  (
    {
      teeth = {},
      selectedTooth,
      highlight,
      readOnly = false,
      onToothPress,
      labels = ODONTOGRAM_LABELS.en,
      legend = true,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const scope = usePatternScope();
    const onPress = readOnly ? undefined : onToothPress;

    return (
      <div ref={ref} {...idAttributes(id)} className={cn(odontogramStyles, className)} {...props}>
        <svg
          viewBox="0 0 409 694"
          role="group"
          aria-label={labels.title}
          className={odontogramSvgStyles}
        >
          <ToothPatterns scope={scope} />
          {QUADRANTS.map(({ quadrant, transform }) => (
            <g key={quadrant} transform={transform}>
              {POSITIONS.map((position) => {
                const fdi = `${quadrant}${position}` as PermanentTooth;

                return (
                  <OdontogramTooth
                    key={fdi}
                    fdi={fdi}
                    position={position}
                    view={teeth[fdi]}
                    scope={scope}
                    labels={labels}
                    selected={selectedTooth === fdi}
                    dimmed={highlight !== undefined && !highlight.includes(fdi)}
                    toothId={id && `${id}-tooth-${fdi}`}
                    onPress={onPress}
                  />
                );
              })}
            </g>
          ))}
        </svg>
        {legend && (
          <ul aria-label={labels.legend} className={odontogramLegendStyles}>
            {TOOTH_STATES.map((state) => (
              <li key={state} className={odontogramLegendItemStyles}>
                <svg aria-hidden viewBox="0 0 16 16" className={odontogramSwatchStyles}>
                  <rect
                    x={1}
                    y={1}
                    width={14}
                    height={14}
                    rx={3}
                    className={toothColor(state)}
                    fill={toothFill(scope, state)}
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeDasharray={state === 'missing' ? '3 2' : undefined}
                  />
                </svg>
                {labels.states[state]}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);

Odontogram.displayName = 'Odontogram';
