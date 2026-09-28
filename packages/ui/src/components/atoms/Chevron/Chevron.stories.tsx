import type { Meta, StoryObj } from '@storybook/react';
import { Chevron } from './Chevron';
import readme from './README.md?raw';

const meta = {
  title: 'Atoms/Chevron',
  component: Chevron,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
  argTypes: {
    direction: { control: 'inline-radio', options: ['down', 'up', 'left', 'right'] },
  },
} satisfies Meta<typeof Chevron>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { direction: 'down', className: 'size-6 text-[var(--text-primary)]' },
};
