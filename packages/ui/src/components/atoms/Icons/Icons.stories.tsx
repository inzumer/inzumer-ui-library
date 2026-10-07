import type { Meta, StoryObj } from '@storybook/react';
import readme from './README.md?raw';
import { ICONS, type IconName } from './registry';

interface IconStoryArgs {
  name: IconName;
  size: number;
  color: string;
}

const meta = {
  title: 'Atoms/Icons',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
  args: { name: 'menu', size: 48, color: 'var(--text-primary)' },
  argTypes: {
    name: { control: 'select', options: Object.keys(ICONS) },
    size: { control: { type: 'range', min: 16, max: 96, step: 4 } },
    color: { control: 'color' },
  },
  render: ({ name, size, color }) => {
    const Icon = ICONS[name];

    return <Icon width={size} height={size} style={{ color }} />;
  },
} satisfies Meta<IconStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ArrowForward: Story = { name: 'arrow-forward', args: { name: 'arrow-forward' } };
export const Bookmark: Story = { name: 'bookmark', args: { name: 'bookmark' } };
export const ChevronRight: Story = { name: 'chevron-right', args: { name: 'chevron-right' } };
export const Close: Story = { name: 'close', args: { name: 'close' } };
export const ExpandMore: Story = { name: 'expand-more', args: { name: 'expand-more' } };
export const Favorite: Story = { name: 'favorite', args: { name: 'favorite' } };
export const Language: Story = { name: 'language', args: { name: 'language' } };
export const Mail: Story = { name: 'mail', args: { name: 'mail' } };
export const Menu: Story = { name: 'menu', args: { name: 'menu' } };
export const Person: Story = { name: 'person', args: { name: 'person' } };
export const Search: Story = { name: 'search', args: { name: 'search' } };
export const Share: Story = { name: 'share', args: { name: 'share' } };
export const Facebook: Story = { name: 'facebook', args: { name: 'facebook' } };
export const Instagram: Story = { name: 'instagram', args: { name: 'instagram' } };
export const Linkedin: Story = { name: 'linkedin', args: { name: 'linkedin' } };
export const Pinterest: Story = { name: 'pinterest', args: { name: 'pinterest' } };
export const Tiktok: Story = { name: 'tiktok', args: { name: 'tiktok' } };
export const Whatsapp: Story = { name: 'whatsapp', args: { name: 'whatsapp' } };
export const X: Story = { name: 'x', args: { name: 'x' } };
export const Youtube: Story = { name: 'youtube', args: { name: 'youtube' } };
