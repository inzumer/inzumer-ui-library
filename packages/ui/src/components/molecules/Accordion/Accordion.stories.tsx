import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { Accordion } from './Accordion';
import readme from './README.md?raw';

const meta = {
  title: 'Molecules/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
  argTypes: {
    summary: { control: 'text' },
    open: { control: 'boolean' },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    summary: 'Formulas',
    children: (
      <ul className="flex flex-col gap-1">
        <li>Waste percentage</li>
        <li>Waste factor</li>
        <li>Cooking loss</li>
      </ul>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText('Formulas'));
    await expect(canvas.getByText('Waste factor')).toBeVisible();
  },
};

export const OpenByDefault: Story = {
  args: { ...Default.args, open: true },
};
