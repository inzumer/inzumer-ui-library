import { Button } from '@components';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { MediaCard } from './MediaCard';
import readme from './README.md?raw';

/** Placeholder "photo": a warm gradient with a plate, so stories need no external images. */
export const samplePhoto = (from: string, to: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="300" height="400" fill="url(#g)"/><circle cx="150" cy="170" r="95" fill="#fdf7f1" opacity="0.9"/><circle cx="150" cy="170" r="62" fill="${to}" opacity="0.55"/></svg>`,
  )}`;

const meta = {
  title: 'Molecules/MediaCard',
  component: MediaCard,
  tags: ['autodocs'],
  // samplePhoto is a helper shared with the Carousel stories, not a story.
  excludeStories: ['samplePhoto'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
  argTypes: {
    aspect: { control: 'inline-radio', options: ['portrait', 'square', 'landscape'] },
    headingLevel: { control: 'inline-radio', options: ['h2', 'h3', 'h4'] },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '28rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MediaCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: samplePhoto('#f09363', '#773b1d'),
    alt: 'Lemon loaf on a plate',
    title: 'Lemon loaf',
    subtitle: '45 min · 8 servings · $1.20 per serving',
    href: '#lemon-loaf',
    aspect: 'portrait',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('link', { name: 'Lemon loaf' })).toHaveAttribute(
      'href',
      '#lemon-loaf',
    );
  },
};

export const WithBadgeAndActions: Story = {
  args: {
    ...Default.args,
    title: 'Carrot cake',
    subtitle: 'Sweet · 1 h 10 min',
    badge: 'New',
    actions: (
      <>
        <Button variant="secondary" size="icon" aria-label="Save">
          ♡
        </Button>
        <Button variant="secondary" size="icon" aria-label="Share">
          ↗
        </Button>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Save' })).toBeVisible();
    await expect(canvas.getByText('New')).toBeVisible();
  },
};

export const Landscape: Story = {
  args: {
    ...Default.args,
    src: samplePhoto('#fbcfb8', '#9b4e26'),
    title: 'Guide: costing a recipe',
    subtitle: 'Management · 6 min read',
    aspect: 'landscape',
  },
};
