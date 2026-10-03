import { cn } from '@utils';
import type { ReactNode } from 'react';

export interface NavbarLink {
  href: string;
  label: string;
  /** Marks the current page (`aria-current="page"`). */
  current?: boolean;
}

export interface NavbarProps {
  /** Logo or brand name, on the start side. */
  brand?: ReactNode;
  links: NavbarLink[];
  /** Where the links sit: `start` (next to the brand), `center` or `end` (default). */
  align?: 'start' | 'center' | 'end';
  /** Buttons or menus on the end side (language, account, theme). */
  actions?: ReactNode;
  /** Name of the navigation for screen readers. */
  label?: string;
  className?: string;
}

const ALIGN = { start: 'justify-start', center: 'justify-center', end: 'justify-end' } as const;

/** Top navigation: brand, links aligned to a side or centered, and actions. On narrow screens the links scroll sideways. */
export const Navbar = ({
  brand,
  links,
  align = 'end',
  actions,
  label = 'Main',
  className,
}: NavbarProps) => (
  <header
    className={cn(
      'flex items-center gap-4 border-b border-[var(--border-default)] bg-[var(--surface-primary)] px-4 py-2',
      className,
    )}
  >
    {brand && <div className="shrink-0">{brand}</div>}
    <nav aria-label={label} className="min-w-0 flex-1">
      <ul className={cn('flex gap-1 overflow-x-auto whitespace-nowrap', ALIGN[align])}>
        {links.map(({ href, label: text, current }) => (
          <li key={href}>
            <a
              href={href}
              aria-current={current ? 'page' : undefined}
              className={cn(
                'inline-flex min-h-11 items-center rounded-md px-3 text-[var(--text-secondary)] transition-colors',
                'hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--border-focus)]',
                'aria-[current=page]:font-semibold aria-[current=page]:text-[var(--text-primary)]',
              )}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
    {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
  </header>
);
