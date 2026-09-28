import type { Meta, StoryObj } from '@storybook/react';
import type { SVGProps } from 'react';
import { Icon } from './Icon';
import readme from './README.md?raw';

const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: CheckIcon,
    label: 'Success',
  },
};

export const Sizes: Story = {
  args: {
    icon: CheckIcon,
  },
  render: () => (
    <div className="flex items-center gap-3 text-[var(--text-primary)]">
      <Icon icon={CheckIcon} size="sm" />
      <Icon icon={CheckIcon} size="md" />
      <Icon icon={CheckIcon} size="lg" />
    </div>
  ),
};

export const Decorative: Story = {
  args: {
    icon: CheckIcon,
  },
};
