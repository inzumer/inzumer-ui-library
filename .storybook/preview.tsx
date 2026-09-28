import type { Decorator, Preview } from '@storybook/react';
import '../packages/ui/src/styles/globals.css';
import './brand-themes.css';

const withThemeWrapper: Decorator = (Story, context) => {
  if (context.viewMode === 'docs') {
    return <Story />;
  }
  const { colorScheme, brandTheme } = context.globals;
  return (
    <div
      data-color-scheme={colorScheme}
      data-brand-theme={brandTheme}
      style={{
        minHeight: '100vh',
        padding: '2rem',
        backgroundColor: 'var(--surface-primary)',
        color: 'var(--text-primary)',
      }}
    >
      <Story />
    </div>
  );
};

const preview: Preview = {
  globalTypes: {
    colorScheme: {
      name: 'Color scheme',
      description: 'Light or dark mode',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
    brandTheme: {
      name: 'Brand theme',
      description: 'Preview components with a consumer repo palette',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'default', title: 'Default (Inzumer UI)' },
          { value: 'inzumer', title: 'Inzumer' },
          { value: 'zamuner', title: 'Zamuner' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    colorScheme: 'light',
    brandTheme: 'default',
  },
  decorators: [withThemeWrapper],
  parameters: {
    docs: {
      toc: true,
    },
    options: {
      storySort: {
        order: [
          'Documentation',
          [
            'Introduction',
            'Installation',
            'Tech Stack',
            'Components',
            'Hooks',
            'Design Tokens',
            'Theming',
            'Overriding Styles',
            'Import Aliases',
            'Testing And Coverage',
            'Consuming The Library',
            'Claude Agents',
          ],
          'Atoms',
          'Molecules',
          'Organisms',
          'Templates',
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      sort: 'requiredFirst',
    },
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '812px' } },
        mobileLg: { name: 'Mobile LG', styles: { width: '430px', height: '932px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1280px', height: '800px' } },
      },
    },
  },
};

export default preview;
