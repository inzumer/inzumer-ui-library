import { RichText } from '@components';
import { cn } from '@utils';
import type { VariantProps } from 'class-variance-authority';
import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { inputErrorStyles, inputHintStyles, inputLabelStyles, inputStyles } from './Input.styles';

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
        <input
          ref={ref}
          id={id}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          aria-invalid={error ? 'true' : undefined}
          className={cn(inputStyles({ state: resolvedState, inputSize }), className)}
          {...props}
        />
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

Input.displayName = 'Input';
