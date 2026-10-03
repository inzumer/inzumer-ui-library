import { ICONS, type IconName } from '@/icons/registry';
import { cn } from '@utils';
import type { VariantProps } from 'class-variance-authority';
import type { ComponentType, SVGProps } from 'react';
import { iconStyles } from './Icon.styles';

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'children' | 'name'> &
  VariantProps<typeof iconStyles> & {
    label?: string;
  } & (
    | { /** A library icon by its kebab-case id. */ name: IconName; icon?: never }
    | {
        /** Any SVG component (a project's own icon). */ icon: ComponentType<
          SVGProps<SVGSVGElement>
        >;
        name?: never;
      }
  );

export const Icon = ({ name, icon, size, className, label, ...props }: IconProps) => {
  const IconComponent = icon ?? ICONS[name as IconName];

  return (
    <IconComponent
      className={cn(iconStyles({ size }), className)}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...props}
    />
  );
};

Icon.displayName = 'Icon';
