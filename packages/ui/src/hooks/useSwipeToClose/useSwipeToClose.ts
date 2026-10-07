import { useRef, useState, type PointerEvent } from 'react';

export interface UseSwipeToCloseOptions {
  onClose: () => void;
  /** Pixels dragged down that close it; less springs back. */
  threshold?: number;
}

/** Drag down to dismiss (bottom sheets): returns the current offset and the drag area's handlers. */
export const useSwipeToClose = ({ onClose, threshold = 80 }: UseSwipeToCloseOptions) => {
  const startY = useRef<number | null>(null);
  const [offset, setOffset] = useState(0);

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    startY.current = event.clientY;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (startY.current === null) {
      return;
    }

    setOffset(Math.max(0, event.clientY - startY.current));
  };

  const finish = () => {
    if (startY.current === null) {
      return;
    }

    startY.current = null;

    if (offset >= threshold) {
      onClose();
    }

    setOffset(0);
  };

  return {
    offset,
    dragProps: { onPointerDown, onPointerMove, onPointerUp: finish, onPointerCancel: finish },
  };
};
