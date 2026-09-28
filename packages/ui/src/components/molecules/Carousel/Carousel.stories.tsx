import { MediaCard } from '@components';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { samplePhoto } from '../MediaCard/MediaCard.stories';
import { Carousel } from './Carousel';
import readme from './README.md?raw';

const recipes = [
  ['Lemon loaf', 'Sweet · 45 min', '#f09363', '#773b1d'],
  ['Carrot cake', 'Sweet · 1 h 10 min', '#fbcfb8', '#9b4e26'],
  ['Scones', 'Sweet · 35 min', '#f7b390', '#592b15'],
  ['Quiche', 'Savory · 50 min', '#e9793a', '#46210f'],
  ['Focaccia', 'Savory · 3 h', '#fee4d6', '#c36430'],
] as const;

const meta = {
  title: 'Molecules/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Recipes: Story = {
  args: {
    label: 'Featured recipes',
    previousLabel: 'Previous recipes',
    nextLabel: 'Next recipes',
    header: <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Featured recipes</h2>,
    children: recipes.map(([title, subtitle, from, to]) => (
      <MediaCard
        key={title}
        src={samplePhoto(from, to)}
        alt=""
        title={title}
        subtitle={subtitle}
        href={`#${title}`}
      />
    )),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Previous recipes' })).toBeDisabled();
    await expect(canvas.getAllByRole('group', { name: /\/ 5$/ })).toHaveLength(5);
    await userEvent.click(canvas.getByRole('button', { name: 'Next recipes' }));
  },
};
