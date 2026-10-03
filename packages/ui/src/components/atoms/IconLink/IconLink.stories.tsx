import type { Meta, StoryObj } from '@storybook/react';
import { sampleSocialIcons } from '../../molecules/SocialLinks/SocialLinks.fixtures';
import { IconLink } from './IconLink';
import readme from './README.md?raw';

const meta = {
  title: 'Atoms/IconLink',
  component: IconLink,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
  args: {
    href: 'https://www.instagram.com',
    label: 'Instagram',
    icon: sampleSocialIcons.instagram,
    external: true,
  },
} satisfies Meta<typeof IconLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ghost: Story = {};

export const Outline: Story = { args: { variant: 'outline' } };

export const Solid: Story = { args: { variant: 'solid' } };

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <IconLink key={size} {...args} size={size} variant="outline" />
      ))}
    </div>
  ),
};
