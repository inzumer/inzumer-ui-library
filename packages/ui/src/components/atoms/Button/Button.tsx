import { cn } from '@utils';
import type { VariantProps } from 'class-variance-authority';
import { forwardRef, type ButtonHTMLAttributes, type Ref } from 'react';
import { buttonStyles } from './Button.styles';
import { Slot } from './Slot';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles> & {
    asChild?: boolean;
    loading?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, loading = false, ...props }, ref) => {
    const classes = cn(buttonStyles({ variant, size, fullWidth }), className);

    if (asChild) {
      const slotRef = ref as unknown as Ref<HTMLElement>;

      return <Slot ref={slotRef} className={classes} data-testid={props.id} {...props} />;
    }

    return (
      <button
        ref={ref}
        className={classes}
        data-testid={props.id}
        {...props}
        {...(loading && { disabled: true, 'aria-busy': true })}
      />
    );
  },
);

Button.displayName = 'Button';
