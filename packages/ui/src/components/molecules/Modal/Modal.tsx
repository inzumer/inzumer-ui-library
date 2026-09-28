import { RichText } from '@components';
import {
  useDelayedUnmount,
  useDismissableLayer,
  useFocusTrap,
  useMergedRef,
  useScrollLock,
} from '@hooks';
import { cn } from '@utils';
import {
  forwardRef,
  forwardRef,
  useId,
  useRef,
  useRef,
  type HTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
  type ReactNode,
} from 'react';
import {
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
};

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    { open, onClose, title, footer, closeOnBackdropClick = true, className, children, ...props },
    ref,
  ) => {
    const panelRef = useRef<HTMLDivElement | null>(null);
    const setPanelRef = useMergedRef(ref, panelRef);
    const titleId = useId();
    const { mounted, visible } = useDelayedUnmount(open, EXIT_DURATION_MS);

    useDismissableLayer(open, onClose, panelRef, closeOnBackdropClick);
    // The panel mounts one render after `open` flips, so the trap starts once it exists.
    useFocusTrap(open && mounted, panelRef);
    useScrollLock(open);

    if (!mounted) {
      return null;
    }

    return (
      <div className={modalOverlayStyles({ visible })}>
        <div
          ref={setPanelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          tabIndex={-1}
          className={cn(modalPanelStyles({ visible }), className)}
          {...props}
        >
          {title && (
            <RichText as="h2" id={titleId} variant="s1" className={modalTitleStyles}>
              {title}
            </RichText>
          )}
          {children}
          {footer && <div className={modalFooterStyles}>{footer}</div>}
        </div>
      </div>
    );
  },
);

Modal.displayName = 'Modal';
