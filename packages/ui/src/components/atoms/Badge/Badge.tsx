import { cn, PILL_TONES, type PillTone } from '@utils';
import type { VariantProps } from 'class-variance-authority';
import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { badgeIconStyles, badgeStyles } from './Badge.styles';

export interface BadgeColors {
  background: string;
  text: string;
}

/** Inline style with the pill colors: custom `colors` win over the `tone` (shared by `Badge` and `Chip`). */
export const badgeColorStyle = (
  { colors, tone }: { colors?: BadgeColors | undefined; tone?: PillTone | undefined },
  style?: CSSProperties,
): CSSProperties | undefined => {
  const chosen = colors ?? (tone ? PILL_TONES[tone] : undefined);
  return chosen
    ? ({ '--badge-bg': chosen.background, '--badge-text': chosen.text, ...style } as CSSProperties)
    : style;
};

/** The decorative icon slot before a pill's label. */
export const BadgeIcon = ({ children }: { children: ReactNode }) => (
  <span aria-hidden className={badgeIconStyles}>
    {children}
  </span>
);

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeStyles> & {
    /** Decorative icon before the label, from the consuming project's own icon family. */
    icon?: ReactNode | undefined;
    /** Any CSS colors, ideally tokens (e.g. `var(--category-sweet-bg)`); neutral tokens when omitted. */
    /** Preset colors: `neutral` (default) or the Snackbar's `info`, `success`, `error`, `warning`. */
    tone?: PillTone | undefined;
    colors?: BadgeColors | undefined;
  };

/** A rounded label ("NEW", "FEATURED", a status) with an optional icon, a tone or custom colors, and optional uppercase. */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ size, radius, uppercase, icon, tone, colors, className, style, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeStyles({ size, radius, uppercase }), className)}
      style={badgeColorStyle({ colors, tone }, style)}
      {...props}
    >
      {icon && <BadgeIcon>{icon}</BadgeIcon>}
      {children}
    </span>
  ),
);

Badge.displayName = 'Badge';
