import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import readme from './README.md?raw';
import { Switch } from './Switch';

const meta = {
  title: 'Atoms/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
    onCheckedChange: () => {},
    label: 'Enable notifications',
  },
  render: function Render(args) {
    const [checked, setChecked] = useState(false);

    return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('switch', { name: 'Enable notifications' });

    await expect(toggle).not.toBeChecked();
    await userEvent.click(toggle);
    await expect(toggle).toBeChecked();
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    label: 'Disabled',
    onCheckedChange: () => {},
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('switch', { name: 'Disabled' });

    await expect(toggle).toBeDisabled();
    await userEvent.click(toggle);
    await expect(toggle).not.toBeChecked();
  },
};
