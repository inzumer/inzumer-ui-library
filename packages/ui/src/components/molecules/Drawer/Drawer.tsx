import { Button, RichText } from '@components';
import {
  useDelayedUnmount,
  useDismissableLayer,
  useFocusTrap,
  useMergedRef,
  useScrollLock,
} from '@hooks';
import { cn } from '@utils';
import type { VariantProps } from 'class-variance-authority';
import { forwardRef, useId, useRef, type HTMLAttributes, type ReactNode } from 'react';
import {
  drawerFooterStyles,
  drawerHeaderStyles,
  drawerOverlayStyles,
  drawerPanelStyles,
  drawerTitleStyles,
} from './Drawer.styles';

const EXIT_DURATION_MS = 200;

export type DrawerProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> &
  Pick<VariantProps<typeof drawerPanelStyles>, 'side'> & {
    open: boolean;
    onClose: () => void;
    title?: ReactNode;
    /** Extra classes for the title (e.g. a display font). */
    titleClassName?: string;
    /** Accessible name of the close button; the button is only rendered when this is set. */
    closeLabel?: string;
    /** Pinned to the bottom of the panel (preferences, actions). */
    footer?: ReactNode;
    closeOnBackdropClick?: boolean;
  };

/**
 * A side panel (navigation menus, filters, settings) that slides in from the left or right.
 * Modal dialog semantics: focus moves inside and is trapped, Escape and backdrop clicks close it,
 * the page behind doesn't scroll, and focus returns to the trigger when it closes.
 */
export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      open,
      onClose,
      side,
      title,
      titleClassName,
      closeLabel,
      footer,
      closeOnBackdropClick = true,
      className,
      children,
      ...props
    },
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
      <div className="fixed inset-0 z-50">
        <div aria-hidden="true" className={drawerOverlayStyles({ visible })} />
        <div
          ref={setPanelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          tabIndex={-1}
          className={cn(drawerPanelStyles({ side, visible }), className)}
          {...props}
        >
          {(title || closeLabel) && (
            <div className={drawerHeaderStyles}>
              {title && (
                <RichText
                  as="h2"
                  id={titleId}
                  variant="s1"
                  className={cn(drawerTitleStyles, titleClassName)}
                >
                  {title}
                </RichText>
              )}
              {closeLabel && (
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={closeLabel}
                  onClick={onClose}
                  className="ml-auto size-11"
                >
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    className="size-6"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </Button>
              )}
            </div>
          )}
          {children}
          {footer && <div className={drawerFooterStyles}>{footer}</div>}
        </div>
      </div>
    );
  },
);

Drawer.displayName = 'Drawer';
