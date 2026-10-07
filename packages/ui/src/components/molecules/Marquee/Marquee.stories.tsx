import { Chip, RichText } from '@components';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { Marquee } from './Marquee';
import readme from './README.md?raw';

const tags = ['Bread', 'Cakes', 'Vegan', 'Gluten free', 'Quick dinners', 'Soups', 'Pastry'];

const meta = {
  title: 'Molecules/Marquee',
  component: Marquee,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
  argTypes: {
    direction: { control: 'inline-radio', options: ['left', 'right'] },
    duration: { control: { type: 'range', min: 5, max: 60, step: 5 } },
  },
  args: {
    label: 'Popular tags',
    duration: 25,
    buttonId: 'marquee-story-pause',
    children: tags.map((tag) => <Chip key={tag}>{tag}</Chip>),
  },
} satisfies Meta<typeof Marquee>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('region', { name: 'Popular tags' })).toBeVisible();
  },
};

export const Right: Story = { args: { direction: 'right' } };

export const News: Story = {
  args: {
    label: 'News',
    gap: '3rem',
    duration: 40,
    children: ['New sourdough guide', 'Autumn recipes are here', 'Free shipping this week'].map(
      (item) => (
        <RichText key={item} as="span" variant="s2" bold>
          {item}
        </RichText>
      ),
    ),
  },
};
