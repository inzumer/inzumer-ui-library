import { useDelayedUnmount } from '@hooks';
import { cn, idAttributes, STATUS_TONES, type StatusTone } from '@utils';
import type { VariantProps } from 'class-variance-authority';
import {
  forwardRef,
  useEffect,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { snackbarActionStyles, snackbarStyles, snackbarWrapperStyles } from './Snackbar.styles';

const EXIT_DURATION_MS = 200;

export type SnackbarAction = {
  label: string;
  onClick: () => void;
  id?: string;
};

export type SnackbarProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
  Omit<VariantProps<typeof snackbarStyles>, 'visible'> & {
    open: boolean;
    onClose: () => void;
    message: ReactNode;
    duration?: number;
    status?: StatusTone | undefined;
    action?: SnackbarAction | undefined;
  };

export const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(
  (
    {
      open,
      onClose,
      message,
      status = 'info',
      duration = 4000,
      action,
      className,
      style,
      ...props
    },
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
          {action && (
            <button
              type="button"
              {...idAttributes(action.id)}
              className={snackbarActionStyles}
              onClick={() => {
                action.onClick();
                onClose();
              }}
            >
              {action.label}
            </button>
          )}
        </div>
      </div>
    );
  },
);

Snackbar.displayName = 'Snackbar';
