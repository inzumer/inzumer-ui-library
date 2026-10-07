export const cookieBannerStyles = [
  'fixed inset-x-0 bottom-0 z-40 border-t border-(--border-default)',
  'bg-(--surface-primary) shadow-lg',
  // Clear of the home bar and the side notches in apps (0 in browsers).
  'pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]',
].join(' ');

export const cookieBannerContentStyles = 'mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-4';

export const cookieBannerTitleStyles = 'text-lg font-semibold text-(--text-primary)';

export const cookieTextStyles = 'text-sm text-(--text-secondary)';

export const cookieBannerActionsStyles = 'flex flex-wrap gap-2';

export const cookieBannerButtonStyles = 'min-h-11 flex-1';

export const cookiePreferencesIntroStyles = 'mb-4 text-sm text-(--text-secondary)';

export const cookieCategoryListStyles = 'flex flex-col gap-4';

export const cookieCategoryStyles =
  'flex flex-col gap-2 rounded-lg border border-(--border-default) p-4';

export const cookieCategoryHeaderStyles = 'flex items-center justify-between gap-4';

export const cookieCategoryTitleStyles = 'font-semibold text-(--text-primary)';

export const cookieCategoryRequiredStyles = 'text-xs font-semibold text-(--text-secondary)';
