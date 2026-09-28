import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { Dropdown } from './Dropdown';
import readme from './README.md?raw';

const options = [
  { value: 'ARS', label: 'ARS — Argentine peso' },
  { value: 'USD', label: 'USD — US dollar' },
  { value: 'EUR', label: 'EUR — Euro' },
];

const meta = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
  argTypes: {
    inputSize: { control: 'select', options: ['sm', 'md', 'lg'] },
    state: { control: 'select', options: ['default', 'error'] },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Currency',
    options,
    value: 'ARS',
    onChange: () => {},
    inputSize: 'lg',
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return (
      <div className="h-64 max-w-xs">
        <Dropdown {...args} value={value} onChange={setValue} />
      </div>
    );
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('combobox'));
    await userEvent.click(canvas.getByRole('option', { name: 'EUR — Euro' }));
    await expect(canvas.getByRole('combobox')).toHaveTextContent('EUR — Euro');
  },
};

export const WithHint: Story = {
  args: { hint: 'Display only: amounts are not converted.' },
};

export const WithError: Story = {
  args: { error: 'Pick a currency.' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
