import { cn, type PillTone } from '@utils';
import type { VariantProps } from 'class-variance-authority';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { badgeColorStyle, BadgeIcon, type BadgeColors } from '@components/atoms/Badge';
import { badgeStyles } from '@components/atoms/Badge/Badge.styles';
import { chipIdleStyles, chipPressedStyles, chipStyles } from './Chip.styles';

export type ChipProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> &
  Pick<VariantProps<typeof badgeStyles>, 'radius'> & {
    pressed?: boolean | undefined;
    icon?: ReactNode | undefined;
    tone?: PillTone | undefined;
    colors?: BadgeColors | undefined;
  };

/** A clickable `Badge`: a pill button with an optional icon, a tone or custom colors; toggles with `pressed`. */
export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ pressed, radius, icon, tone, colors, className, style, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-pressed={pressed}
      className={cn(
        badgeStyles({ size: 'md', radius }),
        chipStyles,
        pressed ? chipPressedStyles : chipIdleStyles,
        className,
      )}
      style={badgeColorStyle({ colors, tone }, style)}
      data-testid={props.id}
      {...props}
    >
      {icon && <BadgeIcon>{icon}</BadgeIcon>}
      {children}
    </button>
  ),
);

Chip.displayName = 'Chip';
