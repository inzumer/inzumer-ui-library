import { RichText } from '@components';
import { useDialogLayer, useSwipeToClose } from '@hooks';
import { cn } from '@utils';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import {
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
  closeOnBackdropClick?: boolean;
};

export const BottomSheet = forwardRef<HTMLDivElement, BottomSheetProps>(
  (
    {
      open,
      onClose,
      title,
      footer,
      closeOnBackdropClick = true,
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
          className={cn(bottomSheetPanelStyles({ visible }), className)}
          style={{ ...style, ...dragStyle }}
          {...props}
        >
          <div aria-hidden className={bottomSheetHandleAreaStyles} {...dragProps}>
            <div className={bottomSheetHandleStyles} />
          </div>
          {title && (
            <RichText as="h2" id={titleId} variant="s1" className={bottomSheetTitleStyles}>
              {title}
            </RichText>
          )}
          {children}
          {footer && <div className={bottomSheetFooterStyles}>{footer}</div>}
        </div>
      </div>
    );
  },
);

BottomSheet.displayName = 'BottomSheet';
