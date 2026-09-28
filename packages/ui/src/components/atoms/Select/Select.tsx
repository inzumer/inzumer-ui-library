import { RichText } from '@components';
import { cn } from '@utils';
import type { VariantProps } from 'class-variance-authority';
import { forwardRef, useId, type SelectHTMLAttributes } from 'react';
import {
  inputErrorStyles,
  inputHintStyles,
  inputLabelStyles,
} from '@components/atoms/Input/Input.styles';
import { selectChevronStyles, selectStyles } from './Select.styles';

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> &
  VariantProps<typeof selectStyles> & {
    label?: string;
    hint?: string;
    error?: string;
  };

/**
 * A native `<select>` with the same label / hint / error contract and look as `Input`. Native on
 * purpose: it gets the platform picker on mobile, typeahead and full screen reader support for free.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, state, inputSize, label, hint, error, id: idProp, children, ...props }, ref) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const resolvedState = error ? 'error' : state;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id}>
            <RichText as="span" variant="p3" className={inputLabelStyles}>
              {label}
            </RichText>
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={id}
            aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
            aria-invalid={error ? 'true' : undefined}
            className={cn(selectStyles({ state: resolvedState, inputSize }), className)}
            {...props}
          >
            {children}
          </select>
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={selectChevronStyles}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
        {error && (
          <RichText
            as="p"
            id={`${id}-error`}
            role="alert"
            variant="p4"
            className={inputErrorStyles}
          >
            {error}
          </RichText>
        )}
        {!error && hint && (
          <RichText as="p" id={`${id}-hint`} variant="p4" className={inputHintStyles}>
            {hint}
          </RichText>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
