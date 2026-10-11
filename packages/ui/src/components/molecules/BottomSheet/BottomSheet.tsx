import { Button, Icon, RichText } from '@components';
import { useDialogLayer, useSwipeToClose } from '@hooks';
import { cn } from '@utils';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { dialogCloseStyles, dialogTitleWithCloseStyles } from '@styles/overlay';
import {
  bottomSheetBodyStyles,
  bottomSheetFooterStyles,
  bottomSheetHandleAreaStyles,
  bottomSheetHandleStyles,
  bottomSheetOverlayStyles,
  bottomSheetPanelStyles,
  bottomSheetTitleStyles,
} from './BottomSheet.styles';

const EXIT_DURATION_MS = 200;

export type BottomSheetProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  footer?: ReactNode;
  /** Accessible name of a close button in the top end corner; none without it. */
  closeLabel?: string;
  /** Stable id for the close button, e.g. for analytics click triggers. */
  closeId?: string;
  closeOnBackdropClick?: boolean;
  /** Height limit before the body scrolls: 80% of the viewport (`default`) or 90% (`tall`). */
  maxHeight?: 'default' | 'tall';
};

export const BottomSheet = forwardRef<HTMLDivElement, BottomSheetProps>(
  (
    {
      open,
      onClose,
      title,
      footer,
      closeLabel,
      closeId,
      closeOnBackdropClick = true,
      maxHeight = 'default',
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const { mounted, visible, titleId, dialogProps } = useDialogLayer({
      open,
      onClose,
      ref,
      exitDurationMs: EXIT_DURATION_MS,
      closeOnBackdropClick,
    });
    const { offset, dragProps } = useSwipeToClose({ onClose });

    if (!mounted) {
      return null;
    }

    // While dragging, the panel follows the finger without the open/close transition.
    const dragStyle =
      offset > 0 ? { transform: `translateY(${offset}px)`, transition: 'none' } : {};

    return (
      <div className={bottomSheetOverlayStyles({ visible })}>
        <div
          {...dialogProps(Boolean(title))}
          className={cn(bottomSheetPanelStyles({ visible, maxHeight }), className)}
          style={{ ...style, ...dragStyle }}
          {...props}
        >
          <div aria-hidden className={bottomSheetHandleAreaStyles} {...dragProps}>
            <div className={bottomSheetHandleStyles} />
          </div>
          {closeLabel && (
            <Button
              variant="ghost"
              size="icon"
              id={closeId}
              aria-label={closeLabel}
              onClick={onClose}
              className={dialogCloseStyles}
            >
              <Icon name="close" />
            </Button>
          )}
          {title && (
            <RichText
              as="h2"
              id={titleId}
              variant="s1"
              className={cn(bottomSheetTitleStyles, closeLabel && dialogTitleWithCloseStyles)}
            >
              {title}
            </RichText>
          )}
          <div className={bottomSheetBodyStyles}>{children}</div>
          {footer && <div className={bottomSheetFooterStyles}>{footer}</div>}
        </div>
      </div>
    );
  },
);

BottomSheet.displayName = 'BottomSheet';
