import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import readme from './README.md?raw';
import { Textarea } from './Textarea';

const meta = {
  title: 'Atoms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Prices', hint: 'One price per line.', rows: 5 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox', { name: 'Prices' });
    await userEvent.type(textarea, '4500{Enter}5200');
    await expect(textarea).toHaveValue('4500\n5200');
  },
};

export const WithError: Story = {
  args: { label: 'Prices', error: 'Add at least two prices.', rows: 5 },
};
