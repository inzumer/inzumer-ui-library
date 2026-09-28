import { resolve } from 'path';
import type { StorybookConfig } from '@storybook/react-vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  stories: ['../packages/ui/src/**/*.stories.@(ts|tsx)', '../docs/**/*.mdx'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-actions',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    '@storybook/addon-toolbars',
  ],
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['./public'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: (config) => {
    // Resolved from process.cwd() (the repo root, where Storybook is always
    // invoked from) rather than __dirname/import.meta.url: this file gets
    // evaluated under different module contexts (CJS-ish for the static
    // config, real ESM when Vite later calls viteFinal), and neither
    // __dirname nor import.meta is safe in both.
    const root = process.cwd();
    config.plugins = config.plugins ?? [];
    config.plugins.push(
      tsconfigPaths({
        projects: [resolve(root, 'packages/ui/tsconfig.json')],
      }),
    );
    return config;
  },
};

export default config;
