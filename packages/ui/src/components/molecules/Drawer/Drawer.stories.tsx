import { Button } from '@components';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { Drawer } from './Drawer';
import readme from './README.md?raw';

const meta = {
  title: 'Molecules/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: false,
    onClose: () => {},
    title: 'Menu',
    closeLabel: 'Close menu',
    side: 'right',
  },
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open drawer</Button>
        <Drawer {...args} open={open} onClose={() => setOpen(false)} footer={<p>Preferences</p>}>
          <nav aria-label="Main">
            <ul className="flex flex-col gap-2">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#calculator">Calculator</a>
              </li>
            </ul>
          </nav>
        </Drawer>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: 'Open drawer' }));
    await expect(await canvas.findByRole('dialog', { name: 'Menu' })).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
  },
};

export const FromTheLeft: Story = {
  ...(Default.render ? { render: Default.render } : {}),
  args: { ...Default.args, side: 'left', title: 'Filters', closeLabel: 'Close filters' },
};
