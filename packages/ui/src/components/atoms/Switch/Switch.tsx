import { RichText } from '@components';
import { cn } from '@utils';
import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import {
  switchInputStyles,
  switchLabelDisabledStyles,
  switchLabelStyles,
  switchLabelTextStyles,
  switchThumbStyles,
  switchTrackStyles,
  switchTrackWrapperStyles,
} from './Switch.styles';

export type SwitchProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size' | 'onChange' | 'checked'
> & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ checked, onCheckedChange, disabled, className, id: idProp, label, ...props }, ref) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;

    return (
      <label htmlFor={id} className={cn(switchLabelStyles, disabled && switchLabelDisabledStyles)}>
        <span className={switchTrackWrapperStyles}>
          <input
            ref={ref}
            id={id}
            type="checkbox"
            role="switch"
            checked={checked}
            disabled={disabled}
            onChange={(event) => onCheckedChange(event.target.checked)}
            className={switchInputStyles}
            {...props}
          />
          <span aria-hidden className={cn(switchTrackStyles({ checked }), className)}>
            <span className={switchThumbStyles({ checked })} />
          </span>
        </span>
        {label && (
          <RichText as="span" variant="p3" className={switchLabelTextStyles}>
            {label}
          </RichText>
        )}
      </label>
    );
  },
);

Switch.displayName = 'Switch';
