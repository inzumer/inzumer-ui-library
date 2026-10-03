import { useEffect, type RefObject } from 'react';

/** Closes an overlay (dialog, sheet, ...) on Escape or on pointerdown outside `panelRef`. */
export const useDismissableLayer = (
  open: boolean,
  onClose: () => void,
  panelRef: RefObject<HTMLElement | null>,
  closeOnBackdropClick = true,
) => {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      const clickedOutside = !panelRef.current || !panelRef.current.contains(event.target as Node);
      if (closeOnBackdropClick && clickedOutside) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [open, onClose, closeOnBackdropClick, panelRef]);
};
