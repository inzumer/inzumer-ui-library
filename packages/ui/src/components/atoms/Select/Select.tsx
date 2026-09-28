import { cn } from '@utils';
import type { VariantProps } from 'class-variance-authority';
import { forwardRef, useId, type SelectHTMLAttributes } from 'react';
import { Chevron } from '@components/atoms/Chevron';
import { Field, fieldAria } from '@components/atoms/Field';
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

    return (
      <Field id={id} label={label} hint={hint} error={error}>
        <div className="relative">
          <select
            ref={ref}
            id={id}
            {...fieldAria(id, { hint, error })}
            className={cn(selectStyles({ state: error ? 'error' : state, inputSize }), className)}
            {...props}
          >
            {children}
          </select>
          <Chevron className={selectChevronStyles} />
        </div>
      </Field>
    );
  },
);

Select.displayName = 'Select';
