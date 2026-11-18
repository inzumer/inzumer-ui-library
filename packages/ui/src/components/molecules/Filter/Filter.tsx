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
  icon?: ReactNode;
  id?: string;
  tone?: PillTone;
  colors?: BadgeColors;
}

export type FilterProps<T extends string = string> = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange'
> &
  Pick<ChipProps, 'radius'> & {
    label: string;
    options: FilterOption<T>[];
    value: T;
    onChange: (value: T) => void;
    previousLabel: string;
    nextLabel: string;
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
