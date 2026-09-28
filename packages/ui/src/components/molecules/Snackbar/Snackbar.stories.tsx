import { Button } from '@components';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import readme from './README.md?raw';
import { Snackbar } from './Snackbar';

const meta = {
  title: 'Molecules/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['info', 'success', 'error', 'warning'],
    },
  },
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
    message: 'Your changes have been saved.',
    status: 'success',
  },
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Show snackbar</Button>
        <Snackbar {...args} open={open} onClose={() => setOpen(false)} />
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Show snackbar' }));
    await expect(await canvas.findByText('Your changes have been saved.')).toBeInTheDocument();
  },
};

const statuses = ['info', 'success', 'error', 'warning'] as const;

export const Statuses: Story = {
  args: {
    open: true,
    onClose: () => {},
    message: 'Message',
  },
  render: function Render() {
    const [active, setActive] = useState<(typeof statuses)[number] | null>(null);
    return (
      <>
        <div className="flex gap-2">
          {statuses.map((status) => (
            <Button key={status} size="sm" onClick={() => setActive(status)}>
              {status}
            </Button>
          ))}
        </div>
        {statuses.map((status) => (
          <Snackbar
            key={status}
            open={active === status}
            onClose={() => setActive(null)}
            status={status}
            message={`This is a ${status} message.`}
          />
        ))}
      </>
    );
  },
};
