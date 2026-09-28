import { Button } from '@components';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitForElementToBeRemoved, within } from '@storybook/test';
import { useState } from 'react';
import { Modal } from './Modal';
import readme from './README.md?raw';

const meta = {
  title: 'Molecules/Modal',
  component: Modal,
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
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: false,
    onClose: () => {},
    title: 'Confirm action',
    closeOnBackdropClick: true,
  },
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          footer={
            <>
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={() => setOpen(false)}>
                Confirm
              </Button>
            </>
          }
        >
          <p className="text-sm text-[var(--text-secondary)]">
            Are you sure you want to continue? This action cannot be undone.
          </p>
        </Modal>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Open modal' }));
    await expect(await canvas.findByRole('dialog')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    await waitForElementToBeRemoved(() => canvas.queryByRole('dialog'));
  },
};
