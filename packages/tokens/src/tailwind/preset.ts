import type { Config } from 'tailwindcss';
// Relative imports on purpose: this file is loaded via jiti by Tailwind's
// config resolution (see root tailwind.config.ts), which doesn't understand
// our tsconfig path aliases.
import { baseColors } from '../tokens/base/colors.js';
import { baseRadius } from '../tokens/base/radius.js';
import { baseSpacing } from '../tokens/base/spacing.js';
import { baseTypography } from '../tokens/base/typography.js';

type ColorScale = Record<string, string>;
type ColorMap = Record<string, ColorScale | string>;

function buildTailwindColors(): ColorMap {
  const result: ColorMap = {};

  for (const [colorName, scale] of Object.entries(baseColors)) {
    result[colorName] = {} as ColorScale;
    for (const step of Object.keys(scale as Record<string, string>)) {
      (result[colorName] as ColorScale)[step] =
        `rgb(var(--color-${colorName}-${step}) / <alpha-value>)`;
    }
  }

  result['surface'] = {
    primary: 'var(--surface-primary)',
    secondary: 'var(--surface-secondary)',
    tertiary: 'var(--surface-tertiary)',
    inverse: 'var(--surface-inverse)',
  };

  result['text-color'] = {
    primary: 'var(--text-primary)',
    secondary: 'var(--text-secondary)',
    tertiary: 'var(--text-tertiary)',
    disabled: 'var(--text-disabled)',
    inverse: 'var(--text-inverse)',
    link: 'var(--text-link)',
  };

  result['border-color'] = {
    DEFAULT: 'var(--border-default)',
    muted: 'var(--border-muted)',
    strong: 'var(--border-strong)',
    focus: 'var(--border-focus)',
    error: 'var(--border-error)',
  };

  return result;
}

const DefaultPreset: Config = {
  content: [],
  darkMode: ['selector', '[data-color-scheme="dark"]'],
  theme: {
    extend: {
      colors: buildTailwindColors(),
      fontFamily: {
        sans: baseTypography.fonts.sans.split(', '),
        mono: baseTypography.fonts.mono.split(', '),
        serif: baseTypography.fonts.serif.split(', '),
      },
      fontSize: baseTypography.sizes,
      fontWeight: baseTypography.weights,
      lineHeight: baseTypography.lineHeights,
      letterSpacing: baseTypography.letterSpacings,
      spacing: baseSpacing,
      borderRadius: baseRadius,
    },
  },
  plugins: [],
};

export { DefaultPreset };
