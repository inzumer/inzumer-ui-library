import { useDelayedUnmount } from '@hooks';
import { cn, STATUS_TONES, type StatusTone } from '@utils';
import type { VariantProps } from 'class-variance-authority';
import {
  forwardRef,
  useEffect,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { snackbarStyles, snackbarWrapperStyles } from './Snackbar.styles';

const EXIT_DURATION_MS = 200;

export type SnackbarProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
  Omit<VariantProps<typeof snackbarStyles>, 'visible'> & {
    open: boolean;
    onClose: () => void;
    message: ReactNode;
    duration?: number;
    /** Colors from the shared status tones (also used by `Badge` and `Chip`). */
    status?: StatusTone | undefined;
  };

export const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(
  (
    { open, onClose, message, status = 'info', duration = 4000, className, style, ...props },
    ref,
  ) => {
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

    const tone = STATUS_TONES[status];

    return (
      <div className={snackbarWrapperStyles}>
        <div
          ref={ref}
          role={status === 'error' ? 'alert' : 'status'}
          className={cn(snackbarStyles({ visible }), className)}
          style={
            {
              '--snackbar-bg': tone.background,
              '--snackbar-text': tone.text,
              ...style,
            } as CSSProperties
          }
          {...props}
        >
          {message}
        </div>
      </div>
    );
  },
);

Snackbar.displayName = 'Snackbar';
