import { cn } from '@utils';
import type { VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { navbarLinkStyles, navbarListStyles, navbarStyles } from './Navbar.styles';

export interface NavbarLink {
  href: string;
  label: string;
  /** Marks the current page (`aria-current="page"`). */
  current?: boolean;
}

export interface NavbarProps extends VariantProps<typeof navbarListStyles> {
  /** Logo or brand name, on the start side. */
  brand?: ReactNode;
  links: NavbarLink[];
  /** Buttons or menus on the end side (language, account, theme). */
  actions?: ReactNode;
  /** Name of the navigation for screen readers. */
  label?: string;
  className?: string;
}

/** Top navigation: brand, links aligned to a side or centered, and actions. On narrow screens the links scroll sideways. */
export const Navbar = ({
  brand,
  links,
  align,
  actions,
  label = 'Main',
  className,
}: NavbarProps) => (
  <header className={cn(navbarStyles, className)}>
    {brand && <div className="shrink-0">{brand}</div>}
    <nav aria-label={label} className="min-w-0 flex-1">
      <ul className={navbarListStyles({ align })}>
        {links.map(({ href, label: text, current }) => (
          <li key={href}>
            <a href={href} aria-current={current ? 'page' : undefined} className={navbarLinkStyles}>
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
    {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
  </header>
);
