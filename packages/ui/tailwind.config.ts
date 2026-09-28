import type { Config } from 'tailwindcss';
import { DefaultPreset } from '@inzumer/tokens/tailwind';

const config: Config = {
  presets: [DefaultPreset],
  content: ['./src/**/*.{ts,tsx}'],
  plugins: [],
};

export default config;
