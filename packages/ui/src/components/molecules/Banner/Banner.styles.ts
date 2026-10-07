import { cva } from 'class-variance-authority';

const rgb = (token: string, alpha = 1) => `rgb(var(${token}) / ${alpha})`;

/** Backgrounds built from the token scales; brand colors don't change with the theme. */
export const BANNER_BACKGROUNDS = {
  gradient: `linear-gradient(120deg, ${rgb('--color-primary-900')}, ${rgb('--color-primary-600')})`,
  aurora: [
    `radial-gradient(circle at 15% 20%, ${rgb('--color-info-500', 0.55)}, transparent 45%)`,
    `radial-gradient(circle at 85% 10%, ${rgb('--color-primary-400', 0.5)}, transparent 40%)`,
    `linear-gradient(135deg, ${rgb('--color-primary-950')}, ${rgb('--color-primary-800')})`,
  ].join(', '),
} as const;

/** Darkens a photo so white text keeps its contrast. */
export const bannerImageBackground = (src: string) =>
  `linear-gradient(90deg, rgb(0 0 0 / 0.75), rgb(0 0 0 / 0.25)), url("${src}")`;

export const bannerStyles = cva(
  'relative flex flex-col gap-6 overflow-hidden rounded-2xl bg-cover bg-center px-6 py-10 md:flex-row md:items-center md:px-12',
  {
    variants: {
      appearance: {
        subtle: 'bg-(--surface-secondary) text-(--text-primary)',
        inverse: 'bg-(--surface-inverse) text-(--text-inverse)',
        gradient: 'text-white',
        aurora: 'text-white',
        image: 'text-white',
      },
      align: {
        start: 'text-left',
        center: 'text-center md:flex-col',
      },
    },
    defaultVariants: {
      appearance: 'subtle',
      align: 'start',
    },
  },
);

export const bannerContentStyles = cva('flex flex-1 flex-col gap-3', {
  variants: {
    align: {
      start: 'items-start',
      center: 'items-center',
    },
  },
  defaultVariants: {
    align: 'start',
  },
});

export const bannerTextStyles = 'max-w-2xl text-inherit';

export const bannerDescriptionStyles = 'max-w-2xl text-inherit opacity-90';

export const bannerActionsStyles = 'mt-3 flex flex-wrap gap-3';

export const bannerMediaStyles = 'shrink-0 md:w-2/5';
