import { cn } from '@utils';
import type { VariantProps } from 'class-variance-authority';
import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { Field, fieldAria } from '@components/atoms/Field';
import { inputStyles } from './Input.styles';

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputStyles> & {
    label?: string;
    hint?: string;
    error?: string;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, state, inputSize, label, hint, error, id: idProp, ...props }, ref) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;

    return (
      <Field id={id} label={label} hint={hint} error={error}>
        <input
          ref={ref}
          id={id}
          {...fieldAria(id, { hint, error })}
          className={cn(inputStyles({ state: error ? 'error' : state, inputSize }), className)}
          {...props}
        />
      </Field>
    );
  },
);

Input.displayName = 'Input';
