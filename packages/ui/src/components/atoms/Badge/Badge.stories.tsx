import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import readme from './README.md?raw';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
  args: { children: 'New' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Uppercase: Story = { args: { children: 'Featured', uppercase: true } };

/** The same modes as the Snackbar. */
export const Tones: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 8 }}>
      {(['neutral', 'info', 'success', 'warning', 'error'] as const).map((tone) => (
        <Badge key={tone} {...args} tone={tone} uppercase>
          {tone}
        </Badge>
      ))}
    </div>
  ),
};

export const WithColorsAndRadius: Story = {
  args: {
    size: 'md',
    radius: 'md',
    children: 'Sweet',
    colors: { background: 'rgb(var(--color-primary-100))', text: 'rgb(var(--color-primary-900))' },
  },
};
