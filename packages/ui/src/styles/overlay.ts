/** The dimmed full-screen backdrop of Modal, BottomSheet and the screen Loader (they add the alignment). */
export const overlayBackdropStyles =
  'fixed inset-0 z-50 flex justify-center bg-surface-overlay transition-opacity duration-200 ease-out';

/** Optional close button of Modal and BottomSheet: 44px, in the panel's top end corner. */
export const dialogCloseStyles = 'absolute top-3 right-3 z-10 size-11 rounded-full';

/** Room for that button, so a long title never runs under it. */
export const dialogTitleWithCloseStyles = 'pr-12';
