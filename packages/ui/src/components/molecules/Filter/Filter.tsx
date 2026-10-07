import { Button, Chip, Icon, type BadgeColors, type ChipProps } from '@components';
import { useHorizontalScroll } from '@hooks';
import { cn, type PillTone } from '@utils';
import type { HTMLAttributes, ReactNode } from 'react';
import {
  filterButtonStyles,
  filterChevronStyles,
  filterChipStyles,
  filterEdgeStyles,
  filterStyles,
  filterTrackStyles,
} from './Filter.styles';

export interface FilterOption<T extends string = string> {
  value: T;
  label: ReactNode;
  /** Decorative icon before the label, from the consuming project's own icon family. */
  icon?: ReactNode;
  /** Stable id (e.g. for analytics). */
  id?: string;
  /** Preset colors (as in `Chip`); `colors` wins over it. */
  tone?: PillTone;
  /** Any CSS colors, ideally tokens; neutral tokens when omitted. */
  colors?: BadgeColors;
}

export type FilterProps<T extends string = string> = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange'
> &
  Pick<ChipProps, 'radius'> & {
    /** Accessible name of the group, e.g. "Filter by category". */
    label: string;
    options: FilterOption<T>[];
    value: T;
    onChange: (value: T) => void;
    /** Names of the arrows shown when the chips don't fit. */
    previousLabel: string;
    nextLabel: string;
    /** Stable ids for the arrows, e.g. for analytics click triggers. */
    buttonIds?: { previous?: string; next?: string };
  };

/** Single-choice filter: a row of chips that scrolls sideways, fading at the edges with arrows. */
export const Filter = <T extends string = string>({
  label,
  options,
  value,
  onChange,
  previousLabel,
  nextLabel,
  buttonIds = {},
  radius,
  className,
  ...props
}: FilterProps<T>) => {
  const { ref, edges, update, scrollByPage } = useHorizontalScroll();

  const edge = (direction: 1 | -1) => (
    <div className={filterEdgeStyles({ side: direction < 0 ? 'start' : 'end' })}>
      <Button
        id={direction < 0 ? buttonIds.previous : buttonIds.next}
        type="button"
        variant="secondary"
        size="icon"
        className={filterButtonStyles}
        aria-label={direction < 0 ? previousLabel : nextLabel}
        onClick={() => scrollByPage(direction)}
      >
        <Icon
          name={direction < 0 ? 'chevron-left' : 'chevron-right'}
          className={filterChevronStyles}
        />
      </Button>
    </div>
  );

  return (
    <div className={cn(filterStyles, className)} {...props}>
      <div
        ref={ref}
        role="group"
        aria-label={label}
        className={filterTrackStyles}
        onScroll={update}
      >
        {options.map((option) => (
          <Chip
            key={option.value}
            id={option.id}
            pressed={option.value === value}
            icon={option.icon}
            tone={option.tone}
            colors={option.colors}
            radius={radius}
            className={filterChipStyles}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </Chip>
        ))}
      </div>
      {!edges.start && edge(-1)}
      {!edges.end && edge(1)}
    </div>
  );
};
