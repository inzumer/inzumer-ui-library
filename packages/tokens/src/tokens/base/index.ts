import type { BaseTokens } from '@theme-types/theme.js';
import { baseColors } from './colors.js';
import { baseRadius } from './radius.js';
import { baseSpacing } from './spacing.js';
import { baseTypography } from './typography.js';

export { baseColors } from './colors.js';
export { baseRadius } from './radius.js';
export { baseSpacing } from './spacing.js';
export { baseTypography } from './typography.js';

export const baseTokens: BaseTokens = {
  colors: baseColors,
  spacing: baseSpacing,
  radius: baseRadius,
  typography: baseTypography,
};
