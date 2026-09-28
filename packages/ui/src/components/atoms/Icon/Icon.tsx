import { cn } from '@utils';
import type { VariantProps } from 'class-variance-authority';
import type { ComponentType, SVGProps } from 'react';
import { iconStyles } from './Icon.styles';

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'children'> &
  VariantProps<typeof iconStyles> & {
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    label?: string;
  };

export const Icon = ({ icon: IconComponent, size, className, label, ...props }: IconProps) => (
  <IconComponent
    className={cn(iconStyles({ size }), className)}
    role={label ? 'img' : undefined}
    aria-label={label}
    aria-hidden={label ? undefined : true}
    {...props}
  />
);

Icon.displayName = 'Icon';
