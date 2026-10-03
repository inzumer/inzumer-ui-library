import { Chevron, Field, fieldAria, RichText } from '@components';
import { useDismissableLayer } from '@hooks';
import { cn } from '@utils';
import type { VariantProps } from 'class-variance-authority';
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { selectChevronStyles, selectStyles } from '@components/atoms/Select/Select.styles';
import {
  dropdownCheckStyles,
  dropdownChevronStyles,
  dropdownListStyles,
  dropdownOptionStyles,
  dropdownTriggerStyles,
  dropdownValueStyles,
} from './Dropdown.styles';

export interface DropdownOption {
  value: string;
  label: string;
}

export type DropdownProps = VariantProps<typeof selectStyles> & {
  label: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  error?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
};

/** Themed select (WAI-ARIA select-only combobox) that behaves like a native select. */
export const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>(
  (
    {
      label,
      options,
      value,
      onChange,
      hint,
      error,
      disabled,
      id: idProp,
      name,
      inputSize,
      state,
      className,
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const labelId = `${id}-label`;
    const listId = `${id}-listbox`;
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const [open, setOpen] = useState(false);
    const selectedIndex = Math.max(
      0,
      options.findIndex((option) => option.value === value),
    );
    const [activeIndex, setActiveIndex] = useState(selectedIndex);
    const last = options.length - 1;
    const resolvedState = error ? 'error' : state;

    const close = useCallback(() => setOpen(false), []);
    useDismissableLayer(open, close, containerRef);

    useEffect(() => {
      if (open) {
        listRef.current?.children[activeIndex]?.scrollIntoView?.({ block: 'nearest' });
      }
    }, [open, activeIndex]);

    const openAt = (index: number) => {
      setActiveIndex(index);
      setOpen(true);
    };

    const choose = (index: number) => {
      const option = options[index];
      if (option && option.value !== value) {
        onChange(option.value);
      }

      setOpen(false);
    };

    const indexForLetter = (key: string) => {
      const start = (open ? activeIndex : selectedIndex) + 1;
      const ordered = [...options.slice(start), ...options.slice(0, start)];
      const match = ordered.find((option) =>
        option.label.toLowerCase().startsWith(key.toLowerCase()),
      );

      return match ? options.indexOf(match) : -1;
    };

    const openKeys: Record<string, () => void> = {
      ArrowDown: () => setActiveIndex((index) => Math.min(last, index + 1)),
      ArrowUp: () => setActiveIndex((index) => Math.max(0, index - 1)),
      Home: () => setActiveIndex(0),
      End: () => setActiveIndex(last),
      Enter: () => choose(activeIndex),
      ' ': () => choose(activeIndex),
      Escape: close,
    };

    const closedKeys: Record<string, () => void> = {
      ArrowDown: () => openAt(selectedIndex),
      ArrowUp: () => openAt(selectedIndex),
      Home: () => openAt(0),
      End: () => openAt(last),
      Enter: () => openAt(selectedIndex),
      ' ': () => openAt(selectedIndex),
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'Tab') {
        close();

        return;
      }

      const action = (open ? openKeys : closedKeys)[event.key];
      if (action) {
        event.preventDefault();
        action();

        return;
      }

      if (event.key.length === 1 && event.key.trim() !== '') {
        const index = indexForLetter(event.key);
        if (index >= 0 && open) {
          setActiveIndex(index);
        } else if (index >= 0) {
          choose(index);
        }
      }
    };

    return (
      <Field
        id={id}
        label={label}
        labelId={labelId}
        hint={hint}
        error={error}
        className={className}
      >
        <div ref={containerRef} className="relative">
          <button
            ref={ref}
            id={id}
            type="button"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={listId}
            aria-labelledby={`${labelId} ${id}`}
            aria-activedescendant={open ? `${id}-option-${activeIndex}` : undefined}
            {...fieldAria(id, { hint, error })}
            disabled={disabled}
            onClick={() => (open ? close() : openAt(selectedIndex))}
            onKeyDown={handleKeyDown}
            className={cn(selectStyles({ state: resolvedState, inputSize }), dropdownTriggerStyles)}
          >
            <RichText as="span" variant="s3" className={cn(dropdownValueStyles, 'text-inherit')}>
              {options[selectedIndex]?.label}
            </RichText>
          </button>
          <Chevron
            className={cn(selectChevronStyles, dropdownChevronStyles, open && 'rotate-180')}
          />
          {name && <input type="hidden" name={name} value={value} />}
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-labelledby={labelId}
            tabIndex={-1}
            hidden={!open}
            className={dropdownListStyles}
          >
            {options.map((option, index) => {
              const selected = index === selectedIndex;

              return (
                // Options never take focus (APG select-only combobox): the trigger handles the keys.
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                <li
                  key={option.value}
                  id={`${id}-option-${index}`}
                  role="option"
                  aria-selected={selected}
                  onPointerDown={(event) => event.preventDefault()}
                  onPointerEnter={() => setActiveIndex(index)}
                  onClick={() => choose(index)}
                  className={dropdownOptionStyles({ active: index === activeIndex, selected })}
                >
                  <RichText as="span" variant="s3" className="text-inherit">
                    {option.label}
                  </RichText>
                  {selected && (
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={dropdownCheckStyles}
                    >
                      <path d="M5 12l5 5 9-10" />
                    </svg>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Field>
    );
  },
);

Dropdown.displayName = 'Dropdown';
