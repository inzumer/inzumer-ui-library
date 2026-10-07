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

/** Veil colors over a photo: black, white or the darkest step of a token scale. */
export const BANNER_OVERLAY_COLORS = {
  black: '0 0 0',
  white: '255 255 255',
  primary: 'var(--color-primary-900)',
  info: 'var(--color-info-900)',
  success: 'var(--color-success-900)',
  warning: 'var(--color-warning-900)',
  danger: 'var(--color-danger-900)',
  neutral: 'var(--color-neutral-950)',
} as const;

export type BannerOverlayColor = keyof typeof BANNER_OVERLAY_COLORS;

export type BannerOverlayPosition = 'left' | 'right' | 'top' | 'bottom' | 'center' | 'full';

/** The veil is solid where the text sits and fades towards the opposite side. */
const overlayGradient = (position: BannerOverlayPosition, color: string) => {
  const tint = (alpha: number) => `rgb(${color} / ${alpha})`;
  const fade = `${tint(0.92)}, ${tint(0.8)} 40%, ${tint(0)}`;
  const angles = { left: '90deg', right: '270deg', top: '180deg', bottom: '0deg' } as const;

  if (position === 'center') {
    return `radial-gradient(ellipse at center, ${tint(0.85)}, ${tint(0.7)} 45%, ${tint(0.2)})`;
  }

  if (position === 'full') {
    return `linear-gradient(${tint(0.7)}, ${tint(0.7)})`;
  }

  return `linear-gradient(${angles[position]}, ${fade})`;
};

export const bannerImageBackground = (
  src: string,
  color: BannerOverlayColor = 'black',
  position: BannerOverlayPosition = 'left',
) => `${overlayGradient(position, BANNER_OVERLAY_COLORS[color])}, url("${src}")`;

/** Where the content sits over the photo, matching the solid side of the veil. */
export const BANNER_IMAGE_PLACEMENT: Record<BannerOverlayPosition, string> = {
  left: 'justify-center',
  right: 'justify-center',
  top: 'justify-start',
  bottom: 'justify-end',
  center: 'justify-center',
  full: 'justify-center',
};

export const BANNER_IMAGE_ALIGN = {
  left: 'start',
  right: 'end',
  top: 'center',
  bottom: 'center',
  center: 'center',
  full: 'start',
} as const satisfies Record<BannerOverlayPosition, 'start' | 'center' | 'end'>;

export const bannerImageStyles = 'min-h-96 md:flex-col md:items-stretch';

/** Dark text over a white veil, white over every other. */
export const bannerImageTextStyles = (color: BannerOverlayColor) =>
  color === 'white' ? 'text-[rgb(var(--color-neutral-950))]' : 'text-white';

export const bannerStyles = cva(
  'relative flex flex-col gap-6 overflow-hidden rounded-2xl bg-cover bg-center px-6 py-10 md:flex-row md:items-center md:px-12',
  {
    variants: {
      appearance: {
        subtle: 'bg-(--surface-secondary) text-(--text-primary)',
        inverse: 'bg-(--surface-inverse) text-(--text-inverse)',
        gradient: 'text-white',
        aurora: 'text-white',
        image: '',
      },
      align: {
        start: 'text-left',
        center: 'text-center md:flex-col',
        end: 'text-right',
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
      end: 'items-end',
    },
  },
  defaultVariants: {
    align: 'start',
  },
});

/** Over a photo the content keeps its height, so the placement can push it up or down. */
export const bannerImageContentStyles = 'flex-none';

export const bannerTextStyles = 'max-w-2xl text-inherit';

export const bannerDescriptionStyles = 'max-w-2xl text-inherit opacity-90';

export const bannerActionsStyles = 'mt-3 flex flex-wrap gap-3';

export const bannerMediaStyles = 'shrink-0 md:w-2/5';
