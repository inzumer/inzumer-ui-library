import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { Checkbox, type CheckboxProps } from './Checkbox';
import readme from './README.md?raw';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledCheckbox = (args: CheckboxProps) => {
  const [checked, setChecked] = useState(args.checked);

  return <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />;
};

export const Default: Story = {
  args: {
    checked: false,
    onCheckedChange: () => {},
    label: 'I accept the terms and the privacy policy',
  },
  render: ControlledCheckbox,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox', {
      name: 'I accept the terms and the privacy policy',
    });

    await expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    onCheckedChange: () => {},
    label: 'Took my medication',
  },
  render: ControlledCheckbox,
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
    const checkbox = canvas.getByRole('checkbox', { name: 'Disabled' });

    await expect(checkbox).toBeDisabled();
    await userEvent.click(checkbox);
    await expect(checkbox).not.toBeChecked();
  },
};
