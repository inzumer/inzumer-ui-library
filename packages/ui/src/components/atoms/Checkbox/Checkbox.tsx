import { CheckIcon, RichText } from '@components';
import { cn } from '@utils';
import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import {
  checkboxBoxStyles,
  checkboxBoxWrapperStyles,
  checkboxIconStyles,
  checkboxInputStyles,
  checkboxLabelDisabledStyles,
  checkboxLabelStyles,
  checkboxLabelTextStyles,
} from './Checkbox.styles';

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size' | 'onChange' | 'checked'
> & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked, onCheckedChange, disabled, className, id: idProp, label, ...props }, ref) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;

    return (
      <label
        htmlFor={id}
        className={cn(checkboxLabelStyles, disabled && checkboxLabelDisabledStyles)}
      >
        <span className={checkboxBoxWrapperStyles}>
          <input
            ref={ref}
            id={id}
            data-testid={idProp}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={(event) => onCheckedChange(event.target.checked)}
            className={checkboxInputStyles}
            {...props}
          />
          <span aria-hidden className={cn(checkboxBoxStyles({ checked }), className)}>
            <CheckIcon className={checkboxIconStyles} />
          </span>
        </span>
        {label && (
          <RichText as="span" variant="p3" className={checkboxLabelTextStyles}>
            {label}
          </RichText>
        )}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
