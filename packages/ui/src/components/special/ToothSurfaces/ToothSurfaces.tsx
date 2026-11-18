import {
  getSurfaceName,
  getToothInfo,
  ODONTOGRAM_LABELS,
  SURFACES,
  toothColor,
  toothFill,
  ToothPatterns,
  usePatternScope,
  type OdontogramLabels,
  type PermanentTooth,
  type Surface,
  type ToothState,
} from '@components';
import { cn, idAttributes } from '@utils';
import { forwardRef, type KeyboardEvent, type SVGAttributes } from 'react';
import {
  surfaceCodeStyles,
  surfaceShapeStyles,
  surfaceStyles,
  toothSurfacesStyles,
} from './ToothSurfaces.styles';

export type ToothSurfacesProps = Omit<SVGAttributes<SVGSVGElement>, 'children'> & {
  fdi: PermanentTooth;
  surfaces?: Partial<Record<Surface, ToothState>>;
  selected?: readonly Surface[];
  readOnly?: boolean;
  onSurfacePress?: (surface: Surface) => void;
  labels?: OdontogramLabels;
};

type Zone = 'top' | 'bottom' | 'left' | 'right' | 'center';

const ZONE_SHAPES: Record<Zone, { points: string; code: [number, number] }> = {
  top: { points: '2,2 98,2 68,32 32,32', code: [50, 16] },
  bottom: { points: '2,98 32,68 68,68 98,98', code: [50, 84] },
  left: { points: '2,2 32,32 32,68 2,98', code: [16, 50] },
  right: { points: '98,2 98,98 68,68 68,32', code: [84, 50] },
  center: { points: '32,32 68,32 68,68 32,68', code: [50, 50] },
};

/** Zone of the five-part diagram where a surface sits, seen from the front like the odontogram. */
export const getSurfaceZone = (surface: Surface, fdi: PermanentTooth): Zone => {
  const { arch, side } = getToothInfo(fdi);
  const zones: Record<Surface, Zone> = {
    O: 'center',
    V: arch === 'upper' ? 'top' : 'bottom',
    L: arch === 'upper' ? 'bottom' : 'top',
    M: side === 'right' ? 'right' : 'left',
    D: side === 'right' ? 'left' : 'right',
  };

  return zones[surface];
};

/**
 * The five surfaces of one tooth (occlusal or incisal, vestibular, lingual or palatal, mesial,
 * distal) as a square diagram, colored by the state of each surface and pressable one by one.
 */
export const ToothSurfaces = forwardRef<SVGSVGElement, ToothSurfacesProps>(
  (
    {
      fdi,
      surfaces = {},
      selected = [],
      readOnly = false,
      onSurfacePress,
      labels = ODONTOGRAM_LABELS.en,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const scope = usePatternScope();
    const onPress = readOnly ? undefined : onSurfacePress;
    const interactive = onPress !== undefined;

    const handleKeyDown = (surface: Surface) => (event: KeyboardEvent<SVGGElement>) => {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return;
      }

      event.preventDefault();
      onPress?.(surface);
    };

    return (
      <svg
        ref={ref}
        {...idAttributes(id)}
        viewBox="0 0 100 100"
        role="group"
        aria-label={`${labels.surfacesOf} ${fdi}`}
        className={cn(toothSurfacesStyles, className)}
        {...props}
      >
        <ToothPatterns scope={scope} size={6} />
        {SURFACES.map((surface) => {
          const state = surfaces[surface] ?? 'default';
          const name = getSurfaceName(surface, fdi);
          const zone = ZONE_SHAPES[getSurfaceZone(surface, fdi)];
          const isSelected = selected.includes(surface);
          const [x, y] = zone.code;

          return (
            <g
              key={surface}
              {...idAttributes(interactive && id ? `${id}-surface-${surface}` : undefined)}
              role={interactive ? 'button' : 'img'}
              aria-label={`${labels.surfaceNames[name]}, ${labels.states[state]}`}
              aria-pressed={interactive ? isSelected : undefined}
              tabIndex={interactive ? 0 : undefined}
              data-state={state}
              onClick={interactive ? () => onPress(surface) : undefined}
              onKeyDown={interactive ? handleKeyDown(surface) : undefined}
              className={cn(toothColor(state), surfaceStyles({ interactive }))}
            >
              <polygon
                points={zone.points}
                fill={state === 'missing' ? 'var(--surface-primary)' : toothFill(scope, state)}
                strokeLinejoin="round"
                className={surfaceShapeStyles({
                  selected: isSelected,
                  missing: state === 'missing',
                })}
              />
              <text x={x} y={y} aria-hidden className={surfaceCodeStyles}>
                {labels.surfaceCodes[name]}
              </text>
            </g>
          );
        })}
      </svg>
    );
  },
);

ToothSurfaces.displayName = 'ToothSurfaces';
