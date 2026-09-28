import { useDelayedUnmount } from '@hooks/useDelayedUnmount';
import { useDismissableLayer } from '@hooks/useDismissableLayer';
import { useFocusTrap } from '@hooks/useFocusTrap';
import { useMergedRef } from '@hooks/useMergedRef';
import { useScrollLock } from '@hooks/useScrollLock';
import { useId, useRef, type Ref } from 'react';

export interface DialogLayerOptions<T extends HTMLElement> {
  open: boolean;
  onClose: () => void;
  /** The component's forwarded ref, merged with the panel ref. */
  ref: Ref<T>;
  exitDurationMs: number;
  closeOnBackdropClick?: boolean;
}

/** Shared behavior of modal overlays: exit animation, Escape / backdrop, focus trap and scroll lock. */
export const useDialogLayer = <T extends HTMLElement>({
  open,
  onClose,
  ref,
  exitDurationMs,
  closeOnBackdropClick = true,
}: DialogLayerOptions<T>) => {
  const panelRef = useRef<T | null>(null);
  const setPanelRef = useMergedRef(ref, panelRef);
  const titleId = useId();
  const { mounted, visible } = useDelayedUnmount(open, exitDurationMs);

  useDismissableLayer(open, onClose, panelRef, closeOnBackdropClick);
  // The panel mounts one render after `open` flips, so the trap starts once it exists.
  useFocusTrap(open && mounted, panelRef);
  useScrollLock(open);

  /** ARIA props of the panel; labelled by the title when there is one. */
  const dialogProps = (hasTitle: boolean) => ({
    ref: setPanelRef,
    role: 'dialog' as const,
    'aria-modal': true as const,
    'aria-labelledby': hasTitle ? titleId : undefined,
    tabIndex: -1,
  });

  return { mounted, visible, titleId, dialogProps };
};
