import { InstagramIcon, LinkedInIcon, PinterestIcon } from '@/icons';
import type { Meta, StoryObj } from '@storybook/react';
import readme from './README.md?raw';
import { SocialLinks } from './SocialLinks';

const meta = {
  title: 'Molecules/SocialLinks',
  component: SocialLinks,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
  args: {
    links: [
      { href: 'https://www.pinterest.com', label: 'Pinterest', icon: <PinterestIcon /> },
      { href: 'https://www.instagram.com', label: 'Instagram', icon: <InstagramIcon /> },
      { href: 'https://www.linkedin.com', label: 'LinkedIn', icon: <LinkedInIcon /> },
    ],
  },
} satisfies Meta<typeof SocialLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Centered: Story = { args: { align: 'center', variant: 'outline' } };

export const End: Story = { args: { align: 'end', variant: 'solid' } };
