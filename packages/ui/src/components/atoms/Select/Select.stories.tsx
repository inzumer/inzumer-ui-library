import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import readme from './README.md?raw';
import { Select } from './Select';

const meta = {
  title: 'Atoms/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = (
  <>
    <option value="ARS">ARS — Argentine peso</option>
    <option value="USD">USD — US dollar</option>
    <option value="EUR">EUR — Euro</option>
  </>
);

export const Default: Story = {
  args: { label: 'Currency', hint: 'Only changes how amounts are shown.', children: options },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox', { name: 'Currency' });
    await userEvent.selectOptions(select, 'USD');
    await expect(select).toHaveValue('USD');
  },
};

export const WithError: Story = {
  args: { label: 'Currency', error: 'Pick a currency.', children: options },
};
