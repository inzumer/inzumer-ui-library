import { cn } from '@utils';
import type { VariantProps } from 'class-variance-authority';
import { forwardRef, useId, type TextareaHTMLAttributes } from 'react';
import { Field, fieldAria } from '@components/atoms/Field';
import { textareaStyles } from './Textarea.styles';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof textareaStyles> & {
    label?: string;
    hint?: string;
    error?: string;
  };

/** Multi-line text entry with the same label / hint / error contract and look as `Input`. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, state, inputSize, resize, label, hint, error, id: idProp, ...props }, ref) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;

    return (
      <Field id={id} label={label} hint={hint} error={error}>
        <textarea
          ref={ref}
          id={id}
          {...fieldAria(id, { hint, error })}
          className={cn(
            textareaStyles({ state: error ? 'error' : state, inputSize, resize }),
            className,
          )}
          {...props}
        />
      </Field>
    );
  },
);

Textarea.displayName = 'Textarea';
