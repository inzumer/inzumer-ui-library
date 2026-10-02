import { cn } from '@utils';
import {
  forwardRef,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
} from 'react';
import { languageIndicatorStyles, languageOptionStyles, languageStyles } from './Language.styles';

export interface LanguageOption {
  value: string;
  label: string;
}

export type LanguageProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  options: LanguageOption[];
  value: string;
  onChange: (value: string) => void;
};

type IndicatorRect = { left: number; top: number; width: number; height: number };

const NEXT_KEYS = new Set(['ArrowRight', 'ArrowDown']);
const PREVIOUS_KEYS = new Set(['ArrowLeft', 'ArrowUp']);

/** Segmented single choice (WAI-ARIA radio group); name it with `aria-label` or `aria-labelledby`. */
export const Language = forwardRef<HTMLDivElement, LanguageProps>(
  ({ options, value, onChange, className, ...props }, ref) => {
    const buttonRefs = useRef(new Map<string, HTMLButtonElement>());
    const [indicator, setIndicator] = useState<IndicatorRect | null>(null);
    const selectedIndex = options.findIndex((option) => option.value === value);
    const focusableIndex = selectedIndex === -1 ? 0 : selectedIndex;

    useLayoutEffect(() => {
      const activeButton = buttonRefs.current.get(value);
      if (!activeButton) {
        return;
      }

      setIndicator({
        left: activeButton.offsetLeft,
        top: activeButton.offsetTop,
        width: activeButton.offsetWidth,
        height: activeButton.offsetHeight,
      });
    }, [value, options]);

    const select = (index: number) => {
      const option = options[index];
      if (!option) {
        return;
      }

      buttonRefs.current.get(option.value)?.focus();
      if (option.value !== value) {
        onChange(option.value);
      }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
      const last = options.length - 1;
      let target: number | null = null;
      if (NEXT_KEYS.has(event.key)) {
        target = focusableIndex === last ? 0 : focusableIndex + 1;
      } else if (PREVIOUS_KEYS.has(event.key)) {
        target = focusableIndex === 0 ? last : focusableIndex - 1;
      } else if (event.key === 'Home') {
        target = 0;
      } else if (event.key === 'End') {
        target = last;
      }

      if (target !== null) {
        event.preventDefault();
        select(target);
      }
    };

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label="Language selector"
        className={cn(languageStyles, className)}
        {...props}
      >
        {indicator && (
          <span
            aria-hidden
            className={languageIndicatorStyles}
            style={{
              width: indicator.width,
              height: indicator.height,
              transform: `translate(${indicator.left}px, ${indicator.top}px)`,
            }}
          />
        )}
        {options.map((option, index) => {
          const selected = option.value === value;

          return (
            <button
              key={option.value}
              ref={(node) => {
                if (node) {
                  buttonRefs.current.set(option.value, node);
                } else {
                  buttonRefs.current.delete(option.value);
                }
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={index === focusableIndex ? 0 : -1}
              onClick={() => onChange(option.value)}
              onKeyDown={handleKeyDown}
              className={languageOptionStyles({ selected })}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    );
  },
);

Language.displayName = 'Language';
