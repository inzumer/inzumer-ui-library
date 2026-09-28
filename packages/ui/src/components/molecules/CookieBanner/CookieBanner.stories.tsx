import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { CookieBanner } from './CookieBanner';
import readme from './README.md?raw';

const meta = {
  title: 'Molecules/CookieBanner',
  component: CookieBanner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
} satisfies Meta<typeof CookieBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Help us improve?',
    description: 'We use analytics to learn which pages are used most. Privacy policy',
    acceptLabel: 'Accept',
    rejectLabel: 'Reject',
    customizeLabel: 'Customize',
    onAccept: () => {},
    onReject: () => {},
    onCustomize: () => {},
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('region', { name: 'Help us improve?' })).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: 'Accept' }));
  },
};

const { customizeLabel: _customizeLabel, onCustomize: _onCustomize, ...withoutCustomize } =
  Default.args;

export const WithoutCustomize: Story = {
  args: withoutCustomize,
};
