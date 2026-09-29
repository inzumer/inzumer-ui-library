import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';
import readme from './README.md?raw';

const leaf = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
    <path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14zM5 19l7-7" />
  </svg>
);

const meta = {
  title: 'Atoms/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
  args: { children: 'Savory', icon: leaf },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Pressed: Story = { args: { pressed: true } };

export const WithColors: Story = {
  args: {
    pressed: true,
    colors: { background: 'rgb(var(--color-primary-100))', text: 'rgb(var(--color-primary-900))' },
  },
};
