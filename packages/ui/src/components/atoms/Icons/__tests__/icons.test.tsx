import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ICON_NAMES, ICONS } from '../registry';

describe('icons', () => {
  it('should draw every icon as a decorative SVG in the current color', () => {
    for (const name of ICON_NAMES) {
      const Icon = ICONS[name];
      const { container, unmount } = render(<Icon width={24} />);
      const svg = container.querySelector('svg');

      expect(svg).toHaveAttribute('aria-hidden', 'true');
      expect(svg).toHaveAttribute('width', '24');
      expect(svg?.outerHTML).toContain('currentColor');
      unmount();
    }
  });

  it('should cite every icon by a kebab-case id', () => {
    expect(ICON_NAMES).toEqual(expect.arrayContaining(['arrow-forward', 'pinterest', 'linkedin']));
    expect(ICON_NAMES.every((name) => /^[a-z]+(-[a-z]+)*$/.test(name))).toBe(true);
  });
});
