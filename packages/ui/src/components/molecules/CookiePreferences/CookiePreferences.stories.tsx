import { Button } from '@components';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { CookiePreferences } from './CookiePreferences';
import readme from './README.md?raw';

const meta = {
  title: 'Molecules/CookiePreferences',
  component: CookiePreferences,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
} satisfies Meta<typeof CookiePreferences>;

export default meta;
type Story = StoryObj<typeof meta>;

const categories = [
  {
    id: 'necessary',
    title: 'Necessary',
    description: 'Settings saved on this device.',
    required: true,
  },
  { id: 'analytics', title: 'Analytics', description: 'Google Analytics, only with your consent.' },
];

export const Default: Story = {
  args: {
    open: false,
    onClose: () => {},
    title: 'Cookie preferences',
    description: 'Choose which cookies we can use.',
    categories,
    value: { analytics: false },
    onChange: () => {},
    onSave: () => {},
    saveLabel: 'Save',
    cancelLabel: 'Cancel',
    requiredLabel: 'Always on',
  },
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<Record<string, boolean>>({ analytics: false });
    return (
      <>
        <Button onClick={() => setOpen(true)}>Cookie preferences</Button>
        <CookiePreferences
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          value={value}
          onChange={(id, enabled) => setValue((current) => ({ ...current, [id]: enabled }))}
          onSave={() => setOpen(false)}
        />
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: 'Cookie preferences' }));
    const analytics = await canvas.findByRole('switch', { name: 'Analytics' });
    await userEvent.click(analytics);
    await expect(analytics).toBeChecked();
  },
};
