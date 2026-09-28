import { RichText } from '@components';
import { useDialogLayer } from '@hooks';
import { cn } from '@utils';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
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
          {title && (
            <RichText as="h2" id={titleId} variant="s1" className={modalTitleStyles}>
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
