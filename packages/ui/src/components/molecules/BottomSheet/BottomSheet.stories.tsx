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
          <p className="text-sm text-[var(--text-secondary)]">
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
