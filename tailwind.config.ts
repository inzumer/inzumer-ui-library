import type { Config } from 'tailwindcss';
// By file path on purpose: Tailwind loads this config through jiti (require), and
// @inzumer/tokens 1.1.0 only exports its entry points under the `import` condition. Switch to
// '@inzumer/tokens/tailwind' once a version with a `default` condition is published.
import { DefaultPreset } from './node_modules/@inzumer/tokens/dist/tailwind/preset.js';

const config: Config = {
  presets: [DefaultPreset],
  content: ['./packages/ui/src/**/*.{ts,tsx}', './apps/**/*.{ts,tsx}'],
  plugins: [],
};

export default config;
