import { Button, Icon, RichText } from '@components';
import { useDialogLayer } from '@hooks';
import { cn } from '@utils';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { dialogCloseStyles, dialogTitleWithCloseStyles } from '@styles/overlay';
import {
  modalBodyStyles,
  modalFooterStyles,
  modalOverlayStyles,
  modalPanelStyles,
  modalTitleStyles,
} from './Modal.styles';

const EXIT_DURATION_MS = 200;

export type ModalProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
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

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
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

    if (!mounted) {
      return null;
    }

    return (
      <div className={modalOverlayStyles({ visible })}>
        <div
          {...dialogProps(Boolean(title))}
          className={cn(modalPanelStyles({ visible, maxHeight }), className)}
          {...props}
        >
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
              className={cn(modalTitleStyles, closeLabel && dialogTitleWithCloseStyles)}
            >
              {title}
            </RichText>
          )}
          <div className={modalBodyStyles}>{children}</div>
          {footer && <div className={modalFooterStyles}>{footer}</div>}
        </div>
      </div>
    );
  },
);

Modal.displayName = 'Modal';
