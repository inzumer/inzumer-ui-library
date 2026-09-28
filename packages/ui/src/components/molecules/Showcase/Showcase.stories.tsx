import { Button } from '@components';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import readme from './README.md?raw';
import { Showcase } from './Showcase';

/** A Wikimedia Commons photo served by its CDN (upload.wikimedia.org), 960px wide. */
const commons = (path: string) => {
  const name = path.split('/').pop() ?? '';
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${encodeURI(path)}/960px-${encodeURIComponent(name)}`;
};

/**
 * Story photos that match each card, from Wikimedia Commons. Credits and licenses are in the
 * README ("Photos in the stories"); shared with the Carousel stories.
 */
export const photos = {
  lemonLoaf: {
    src: commons('b/b9/Lemon_Drizzle_Slice_-_Café_W_2025-12-26.jpg'),
    alt: 'Slice of lemon drizzle cake on a plate',
  },
  carrotCake: {
    src: commons('2/25/Carrot_cake_-_Milfey_Patisserie_2026-04-04.jpg'),
    alt: 'Slice of carrot cake with cream cheese frosting',
  },
  scones: {
    src: commons('5/52/Scones_and_tea.jpg'),
    alt: 'Scones served with a cup of tea',
  },
  quiche: {
    src: commons('5/57/Slice_of_Quiche_(Unsplash).jpg'),
    alt: 'Slice of quiche on a plate',
  },
  focaccia: {
    src: commons('7/7b/Focaccia_al_rosmarino_with_dimples.png'),
    alt: 'Rosemary focaccia with its dimples',
  },
  mise: {
    src: commons('7/7d/Freshly_chopped_vegetables_on_a_wooden_cutting_board.jpg'),
    alt: 'Freshly chopped vegetables on a wooden cutting board',
  },
} as const;

const meta = {
  title: 'Molecules/Showcase',
  component: Showcase,
  tags: ['autodocs'],
  // photos is data shared with the Carousel stories, not a story.
  excludeStories: ['photos'],
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
} satisfies Meta<typeof Showcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...photos.lemonLoaf,
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
    ...photos.carrotCake,
    title: 'Carrot cake',
    subtitle: 'Sweet · 1 h 10 min',
    href: '#carrot-cake',
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
    ...photos.mise,
    title: 'Guide: costing a recipe',
    subtitle: 'Management · 6 min read',
    href: '#costing-guide',
    badge: 'Guide',
    aspect: 'landscape',
  },
};
