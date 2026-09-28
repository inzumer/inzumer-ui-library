import type { Meta, StoryObj } from '@storybook/react';
import { Image } from './Image';
import readme from './README.md?raw';

const meta = {
  title: 'Atoms/Image',
  component: Image,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
  argTypes: {
    fit: {
      control: 'select',
      options: ['cover', 'contain', 'fill'],
    },
    rounded: {
      control: 'select',
      options: ['none', 'md', 'full'],
    },
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

const src = 'https://placehold.co/320x200';

export const Default: Story = {
  args: {
    src,
    alt: 'Placeholder image',
    width: 320,
    height: 200,
  },
};

export const Rounded: Story = {
  args: {
    src: 'https://placehold.co/160x160',
    alt: 'Rounded placeholder image',
    width: 160,
    height: 160,
    rounded: 'full',
  },
};
