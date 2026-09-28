import { useDelayedUnmount } from '@hooks';
import { cn } from '@utils';
import type { VariantProps } from 'class-variance-authority';
import { forwardRef, useEffect, type HTMLAttributes, type ReactNode } from 'react';
import { snackbarStyles, snackbarWrapperStyles } from './Snackbar.styles';

const EXIT_DURATION_MS = 200;

export type SnackbarProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
  Omit<VariantProps<typeof snackbarStyles>, 'visible'> & {
    open: boolean;
    onClose: () => void;
    message: ReactNode;
    duration?: number;
  };

export const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(
  ({ open, onClose, message, status, duration = 4000, className, ...props }, ref) => {
    const { mounted, visible } = useDelayedUnmount(open, EXIT_DURATION_MS);

    useEffect(() => {
      if (!open || !duration) {
        return;
      }

      const timeoutId = setTimeout(onClose, duration);
      return () => clearTimeout(timeoutId);
    }, [open, duration, onClose]);

    if (!mounted) {
      return null;
    }

    return (
      <div className={snackbarWrapperStyles}>
        <div
          ref={ref}
          role={status === 'error' ? 'alert' : 'status'}
          className={cn(snackbarStyles({ status, visible }), className)}
          {...props}
        >
          {message}
        </div>
      </div>
    );
  },
);

Snackbar.displayName = 'Snackbar';
