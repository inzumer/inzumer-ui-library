import { RichText } from '@components';
import { cn } from '@utils';
import type { VariantProps } from 'class-variance-authority';
import { forwardRef, useId, type TextareaHTMLAttributes } from 'react';
import {
  inputErrorStyles,
  inputHintStyles,
  inputLabelStyles,
} from '@components/atoms/Input/Input.styles';
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
        <textarea
          ref={ref}
          id={id}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          aria-invalid={error ? 'true' : undefined}
          className={cn(textareaStyles({ state: resolvedState, inputSize, resize }), className)}
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

Textarea.displayName = 'Textarea';
