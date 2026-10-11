import { Button } from '@components';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitForElementToBeRemoved, within } from '@storybook/test';
import { useState } from 'react';
import { BottomSheet } from './BottomSheet';
import readme from './README.md?raw';

const meta = {
  title: 'Molecules/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    maxHeight: { control: 'inline-radio', options: ['default', 'tall'] },
  },
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: false,
    onClose: () => {},
    title: 'Filter results',
    closeOnBackdropClick: true,
  },
  render: function Render(args) {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open bottom sheet</Button>
        <BottomSheet
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          footer={
            <>
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={() => setOpen(false)}>
                Apply
              </Button>
            </>
          }
        >
          <p className="text-sm text-(--text-secondary)">
            Pick the options that match what you are looking for.
          </p>
        </BottomSheet>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Open bottom sheet' }));
    await expect(await canvas.findByRole('dialog')).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: 'Cancel' }));
    await waitForElementToBeRemoved(() => canvas.queryByRole('dialog'));
  },
};

/** Long content and a close button: the title stays, the body scrolls on the panel's edge. */
export const LongWithClose: Story = {
  args: { ...Default.args, title: 'Project details', closeLabel: 'Close' },
  render: function Render(args) {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open long bottom sheet</Button>
        <BottomSheet {...args} open={open} onClose={() => setOpen(false)}>
          <div className="flex flex-col gap-4">
            {Array.from({ length: 12 }, (_, index) => (
              <p key={index} className="text-sm text-(--text-secondary)">
                Paragraph {index + 1}: enough text to make the body taller than the panel, so it
                scrolls while the title and the close button stay in place.
              </p>
            ))}
          </div>
        </BottomSheet>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Open long bottom sheet' }));
    await expect(await canvas.findByRole('dialog')).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: 'Close' }));
    await waitForElementToBeRemoved(() => canvas.queryByRole('dialog'));
  },
};
