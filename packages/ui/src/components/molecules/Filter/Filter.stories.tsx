import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Filter, type FilterOption, type FilterProps } from './Filter';
import readme from './README.md?raw';

const circle = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
    <circle cx="12" cy="12" r="7" />
  </svg>
);

const tone = (scale: string) => ({
  background: `rgb(var(--color-${scale}-100))`,
  text: `rgb(var(--color-${scale}-900))`,
});

const options: FilterOption[] = [
  { value: 'all', label: 'All' },
  { value: 'sweet', label: 'Sweet', icon: circle, colors: tone('primary') },
  { value: 'savory', label: 'Savory', icon: circle, colors: tone('danger') },
  { value: 'bread', label: 'Bread', icon: circle, colors: tone('warning') },
  { value: 'drinks', label: 'Drinks', icon: circle, colors: tone('info') },
  { value: 'vegan', label: 'Vegan', icon: circle, colors: tone('success') },
];

/** Keeps the chosen option, like a real page would. */
const ControlledFilter = (args: FilterProps) => {
  const [value, setValue] = useState(args.value);

  return <Filter {...args} value={value} onChange={setValue} />;
};

const meta = {
  title: 'Molecules/Filter',
  component: Filter,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
  args: {
    label: 'Filter by category',
    previousLabel: 'Previous categories',
    nextLabel: 'Next categories',
    options,
    value: 'all',
    onChange: () => undefined,
  },
  render: (args) => <ControlledFilter {...args} />,
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** A narrow container: the row scrolls and fades with arrows. */
export const Overflowing: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export const WithoutColors: Story = {
  args: { options: options.map(({ colors: _colors, ...option }) => option) },
};
