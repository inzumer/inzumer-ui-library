import type { Config } from 'tailwindcss';
import { DefaultPreset } from '@inzumer/tokens/tailwind';

const config: Config = {
  presets: [DefaultPreset],
  content: ['./packages/ui/src/**/*.{ts,tsx}', './apps/**/*.{ts,tsx}'],
  plugins: [],
};

export default config;
