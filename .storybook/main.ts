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
    // process.cwd() (repo root): __dirname and import.meta differ between config and viteFinal.
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
