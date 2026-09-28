import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { Loader } from './Loader';
import readme from './README.md?raw';

const meta = {
  title: 'Atoms/Loader',
  component: Loader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
  argTypes: {
    effect: { control: 'inline-radio', options: ['spin', 'pulse'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] },
    speed: { control: 'inline-radio', options: ['normal', 'slow', 'fast'] },
    layout: { control: 'inline-radio', options: ['inline', 'stacked'] },
  },
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

const brandMark = <img src="android-chrome-192x192.png" alt="" />;

export const Default: Story = {
  args: { label: 'Loading your account' },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('status')).toHaveTextContent('Loading');
  },
};

export const BrandSpin: Story = {
  args: { label: 'Loading', mark: brandMark, size: 'lg', speed: 'slow' },
};

export const BrandPulse: Story = {
  args: {
    label: 'Loading the calculator…',
    showLabel: true,
    layout: 'stacked',
    effect: 'pulse',
    size: 'xl',
    mark: brandMark,
  },
};

export const WithLabel: Story = {
  args: { label: 'Saving…', showLabel: true, size: 'sm' },
};
