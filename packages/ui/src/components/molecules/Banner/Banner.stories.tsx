import { Button, Image } from '@components';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { photos } from '../Showcase/Showcase.stories';
import { Banner } from './Banner';
import readme from './README.md?raw';

const meta = {
  title: 'Molecules/Banner',
  component: Banner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
  argTypes: {
    appearance: {
      control: 'select',
      options: ['subtle', 'inverse', 'gradient', 'aurora', 'image'],
    },
    align: { control: 'inline-radio', options: ['start', 'center'] },
  },
  args: {
    title: 'Bake something new this week',
    description: 'Seasonal recipes, step by step, with the timings that matter.',
    actions: (
      <>
        <Button id="banner-story-primary">Browse recipes</Button>
        <Button id="banner-story-secondary" variant="secondary">
          Learn more
        </Button>
      </>
    ),
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Subtle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole('region', { name: 'Bake something new this week' }),
    ).toBeVisible();
  },
};

export const Inverse: Story = { args: { appearance: 'inverse' } };

export const Gradient: Story = { args: { appearance: 'gradient' } };

export const Aurora: Story = { args: { appearance: 'aurora', align: 'center' } };

export const WithImage: Story = { args: { appearance: 'image', image: photos.focaccia.src } };

export const WithMedia: Story = {
  args: {
    appearance: 'gradient',
    media: <Image src={photos.scones.src} alt={photos.scones.alt} rounded="md" />,
  },
};
