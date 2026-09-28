import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import readme from './README.md?raw';
import { Timeline } from './Timeline';

const meta = {
  title: 'Molecules/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        title: '2023 — Founded',
        description: ['The company was founded with a small team of three.'],
      },
      {
        title: '2024 — Series A',
        description: ['Raised a Series A round.', 'Expanded the team to 20 people.'],
      },
      {
        title: '2025 — Launch',
        description: ['Publicly launched the product.'],
      },
    ],
  },
};

/** Placeholder step photo (a warm gradient), so the story needs no external images. */
const stepPhoto = (from: string, to: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="400" height="300" fill="url(#g)"/><ellipse cx="200" cy="160" rx="120" ry="80" fill="#fdf7f1" opacity="0.85"/></svg>`,
  )}`;

/** Recipe steps: each entry with the photo of that step. */
export const RecipeSteps: Story = {
  args: {
    items: [
      {
        title: '1 · Mix the batter',
        description: ['Beat the butter with the sugar until pale.', 'Add the eggs one at a time.'],
        image: { src: stepPhoto('#fee4d6', '#c36430'), alt: 'Batter in a bowl' },
      },
      {
        title: '2 · Bake',
        description: ['40 minutes at 180 °C, until a skewer comes out clean.'],
        image: { src: stepPhoto('#f7b390', '#773b1d'), alt: 'Loaf in the oven' },
      },
      {
        title: '3 · Glaze',
        description: ['Mix icing sugar with lemon juice and pour it over the warm loaf.'],
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole('img')).toHaveLength(2);
    await expect(canvas.getByRole('img', { name: 'Batter in a bowl' })).toBeVisible();
  },
};
