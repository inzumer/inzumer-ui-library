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

const MESSAGES = ['Warming things up…', 'Almost there…', 'Checking the details…'];

export const WithMessages: Story = {
  args: { label: 'Saving', effect: 'pulse', size: 'lg', layout: 'stacked', messages: MESSAGES },
};

/** Full screen: the brand pulse over the Modal's backdrop, with rotating messages. */
export const Screen: Story = {
  args: {
    label: 'Signing in',
    screen: true,
    effect: 'pulse',
    size: 'xl',
    mark: brandMark,
    messages: MESSAGES,
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'grid', gap: 12 }}>
        <h2>A page behind the loader</h2>
        <p>Clicks, scroll and keyboard are blocked until the answer arrives.</p>
        <button type="button">Can&apos;t reach me</button>
        <Story />
      </div>
    ),
  ],
};
