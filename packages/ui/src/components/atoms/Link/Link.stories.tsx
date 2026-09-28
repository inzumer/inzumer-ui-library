import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';
import readme from './README.md?raw';

const meta = {
  title: 'Atoms/Link',
  component: Link,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
  argTypes: {
    underline: {
      control: 'select',
      options: ['always', 'hover', 'none'],
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '#',
    children: 'Visit the docs',
  },
};

export const AlwaysUnderlined: Story = {
  args: {
    href: '#',
    underline: 'always',
    children: 'Always underlined',
  },
};

export const External: Story = {
  args: {
    href: 'https://example.com',
    external: true,
    children: 'Opens in a new tab',
  },
};
