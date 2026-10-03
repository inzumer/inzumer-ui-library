import { cn } from '@utils';
import type { VariantProps } from 'class-variance-authority';
import { forwardRef, type ButtonHTMLAttributes, type Ref } from 'react';
import { buttonStyles } from './Button.styles';
import { Slot } from './Slot';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles> & {
    /** Render the single child (e.g. an `<a>`) with the button styles instead of a `<button>`. */
    asChild?: boolean;
    /** Waiting for something (e.g. the API): disabled, `aria-busy` and pulsing. */
    loading?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, loading = false, ...props }, ref) => {
    const classes = cn(buttonStyles({ variant, size, fullWidth }), className);

    if (asChild) {
      // The ref points at whatever element the child renders (usually an <a>), not a <button>.
      const slotRef = ref as unknown as Ref<HTMLElement>;

      return <Slot ref={slotRef} className={classes} {...props} />;
    }

    return (
      <button
        ref={ref}
        className={classes}
        {...props}
        {...(loading && { disabled: true, 'aria-busy': true })}
      />
    );
  },
);

Button.displayName = 'Button';
