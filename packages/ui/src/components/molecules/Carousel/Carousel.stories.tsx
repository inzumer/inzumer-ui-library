import { Showcase } from '@components';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { photos } from '../Showcase/Showcase.stories';
import { Carousel } from './Carousel';
import readme from './README.md?raw';

const recipes = [
  ['Lemon loaf', 'Sweet · 45 min', photos.lemonLoaf],
  ['Carrot cake', 'Sweet · 1 h 10 min', photos.carrotCake],
  ['Scones', 'Sweet · 35 min', photos.scones],
  ['Quiche', 'Savory · 50 min', photos.quiche],
  ['Focaccia', 'Savory · 3 h', photos.focaccia],
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
    indicatorsLabel: 'Choose a recipe',
    goToLabel: (index, total) => `Recipe ${index + 1} of ${total}`,
    header: <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Featured recipes</h2>,
    children: recipes.map(([title, subtitle, photo]) => (
      <Showcase
        key={title}
        src={photo.src}
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
    await expect(canvas.getByRole('button', { name: 'Recipe 1 of 5' })).toHaveAttribute(
      'aria-current',
      'true',
    );
    await userEvent.click(canvas.getByRole('button', { name: 'Next recipes' }));
  },
};
