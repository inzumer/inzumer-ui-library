import { Button } from '@components';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitForElementToBeRemoved, within } from '@storybook/test';
import { useState } from 'react';
import { photos } from '../Showcase/Showcase.stories';
import readme from './README.md?raw';
import { Stories, type StoriesProps } from './Stories';

const items: StoriesProps['items'] = [
  {
    id: 'stories-mise',
    src: photos.mise.src,
    alt: photos.mise.alt,
    title: 'Get everything ready',
    description: 'Wash, chop and measure before you turn the oven on.',
  },
  {
    id: 'stories-focaccia',
    src: photos.focaccia.src,
    alt: photos.focaccia.alt,
    title: 'Let the dough rest',
    description: 'Press the dimples with your fingers and drizzle the oil.',
  },
  {
    id: 'stories-quiche',
    src: photos.quiche.src,
    alt: photos.quiche.alt,
    title: 'Bake until golden',
    description: 'Long stories can stay on screen longer.',
    duration: 8000,
  },
  {
    id: 'stories-scones',
    src: photos.scones.src,
    alt: photos.scones.alt,
    title: 'Time for tea',
    description: 'The last story can end with an action.',
    action: <Button size="sm">Start cooking</Button>,
  },
];

/** Opens the stories from a button, as an app would. */
const Playground = (args: StoriesProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Watch stories</Button>
      <Stories {...args} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

const meta = {
  title: 'Molecules/Stories',
  component: Stories,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
  argTypes: {
    duration: { control: { type: 'number', min: 1000, step: 500 } },
    startIndex: { control: { type: 'number', min: 0, max: items.length - 1 } },
    autoplay: { control: 'boolean' },
  },
} satisfies Meta<typeof Stories>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: false,
    onClose: () => {},
    items,
    label: 'How to bake at home',
    labels: {
      close: 'Close',
      previous: 'Previous story',
      next: 'Next story',
      pause: 'Pause',
      play: 'Play',
      story: (index, total) => `Story ${index + 1} of ${total}`,
    },
    duration: 5000,
    startIndex: 0,
    autoplay: true,
    closeId: 'stories-close',
    buttonIds: { previous: 'stories-previous', next: 'stories-next', pause: 'stories-pause' },
  },
  render: function Render(args) {
    return <Playground {...args} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Watch stories' }));
    const dialog = await canvas.findByRole('dialog', { name: 'How to bake at home' });
    await expect(within(dialog).getByRole('group', { name: 'Story 1 of 4' })).toBeVisible();

    await userEvent.click(within(dialog).getByRole('button', { name: 'Pause' }));
    await expect(within(dialog).getByRole('button', { name: 'Play' })).toBeInTheDocument();

    await userEvent.click(within(dialog).getByRole('button', { name: 'Next story' }));
    await expect(within(dialog).getByRole('group', { name: 'Story 2 of 4' })).toBeVisible();

    await userEvent.keyboard('{ArrowLeft}');
    await expect(within(dialog).getByRole('group', { name: 'Story 1 of 4' })).toBeVisible();

    await userEvent.click(within(dialog).getByRole('button', { name: 'Close' }));
    await waitForElementToBeRemoved(() => canvas.queryByRole('dialog'));
  },
};

export const Manual: Story = {
  args: { ...Default.args, autoplay: false },
  render: function Render(args) {
    return <Playground {...args} />;
  },
};

export const FromTheMiddle: Story = {
  args: { ...Default.args, startIndex: 2 },
  render: function Render(args) {
    return <Playground {...args} />;
  },
};
