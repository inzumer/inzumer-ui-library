import { RichText } from '@components';
import { cn } from '@utils';
import type { ReactNode } from 'react';
import { fieldErrorStyles, fieldHintStyles, fieldLabelStyles, fieldStyles } from './Field.styles';

export interface FieldProps {
  /** Id of the control; the hint and error get `<id>-hint` and `<id>-error`. */
  id: string;
  label?: ReactNode | undefined;
  /** Render the label as a span with this id (for controls named by `aria-labelledby`). */
  labelId?: string | undefined;
  hint?: ReactNode | undefined;
  error?: ReactNode | undefined;
  className?: string | undefined;
  children: ReactNode;
}

/** ARIA props linking a control to its hint or error. */
export const fieldAria = (
  id: string,
  { hint, error }: { hint?: ReactNode; error?: ReactNode },
) => ({
  'aria-describedby': error ? `${id}-error` : hint ? `${id}-hint` : undefined,
  'aria-invalid': error ? ('true' as const) : undefined,
});

/** Label, control, and the error (or hint) under it: the shared layout of the form controls. */
export const Field = ({ id, label, labelId, hint, error, className, children }: FieldProps) => (
  <div className={cn(fieldStyles, className)}>
    {label &&
      (labelId ? (
        <RichText as="span" id={labelId} variant="p3" className={fieldLabelStyles}>
          {label}
        </RichText>
      ) : (
        <label htmlFor={id}>
          <RichText as="span" variant="p3" className={fieldLabelStyles}>
            {label}
          </RichText>
        </label>
      ))}
    {children}
    {error ? (
      <RichText as="p" id={`${id}-error`} role="alert" variant="p4" className={fieldErrorStyles}>
        {error}
      </RichText>
    ) : (
      hint && (
        <RichText as="p" id={`${id}-hint`} variant="p4" className={fieldHintStyles}>
          {hint}
        </RichText>
      )
    )}
  </div>
);
