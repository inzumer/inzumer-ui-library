import { Button } from '@components';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { CookieConsent, type CookieChoices, type CookieConsentProps } from './CookieConsent';
import readme from './README.md?raw';

const meta = {
  title: 'Organisms/CookieConsent',
  component: CookieConsent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
  argTypes: {
    mode: { control: 'inline-radio', options: ['banner', 'modal', 'inline'] },
  },
} satisfies Meta<typeof CookieConsent>;

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

const labels = {
  title: 'Cookies',
  description: (
    <>
      We use analytics to improve the site. <a href="#privacy">Privacy policy</a>
    </>
  ),
  accept: 'Accept',
  reject: 'Reject',
  customize: 'Customize',
  preferencesTitle: 'Cookie preferences',
  preferencesDescription: 'Choose which cookies we can use.',
  save: 'Save',
  cancel: 'Cancel',
  required: 'Always on',
};

const args: CookieConsentProps = {
  mode: 'banner',
  categories,
  labels,
  value: null,
  onChange: () => {},
};

/** A stateful host, as an app would use it: the answer lives outside the component. */
const Host = (props: CookieConsentProps) => {
  const [value, setValue] = useState<CookieChoices | null>(props.value);
  const [open, setOpen] = useState(false);

  return (
    <div style={{ minHeight: '24rem', padding: '1.6rem' }}>
      <p>Answer: {value === null ? 'none yet' : JSON.stringify(value)}</p>
      <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.8rem' }}>
        {props.mode !== 'inline' && (
          <Button onClick={() => setOpen(true)}>Cookie preferences</Button>
        )}
        <Button variant="secondary" onClick={() => setValue(null)}>
          Reset answer
        </Button>
      </div>
      <div style={{ marginTop: '1.6rem' }}>
        <CookieConsent
          {...props}
          value={value}
          onChange={setValue}
          open={open}
          onOpenChange={setOpen}
        />
      </div>
    </div>
  );
};

export const Banner: Story = {
  args,
  render: (storyArgs) => <Host {...args} {...storyArgs} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Reject' }));
    await expect(canvas.queryByRole('region', { name: 'Cookies' })).not.toBeInTheDocument();
    await expect(canvas.getByText(/"analytics":false/)).toBeInTheDocument();
  },
};

export const Customize: Story = {
  args,
  render: (storyArgs) => <Host {...args} {...storyArgs} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: 'Customize' }));
    await userEvent.click(await body.findByRole('switch', { name: 'Analytics' }));
    await userEvent.click(body.getByRole('button', { name: 'Save' }));
    await expect(await canvas.findByText(/"analytics":true/)).toBeInTheDocument();
  },
};

export const Modal: Story = {
  args: { ...args, mode: 'modal', value: { analytics: false } },
  render: (storyArgs) => <Host {...args} {...storyArgs} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await expect(canvas.queryByRole('region')).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: 'Cookie preferences' }));
    await expect(await body.findByRole('switch', { name: 'Analytics' })).not.toBeChecked();
  },
};

export const Inline: Story = {
  args: { ...args, mode: 'inline', value: { analytics: false } },
  render: (storyArgs) => <Host {...args} {...storyArgs} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('switch', { name: 'Analytics' }));
    await expect(canvas.getByText(/"analytics":true/)).toBeInTheDocument();
  },
};
