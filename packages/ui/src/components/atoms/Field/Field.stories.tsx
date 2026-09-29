import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { inputStyles } from '@components/atoms/Input/Input.styles';
import { Field, fieldAria } from './Field';
import readme from './README.md?raw';

const meta = {
  title: 'Atoms/Field',
  component: Field,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderField: Story['render'] = (args) => (
  <Field {...args}>
    <input
      id={args.id}
      {...fieldAria(args.id, args)}
      className={inputStyles({ state: args.error ? 'error' : 'default' })}
    />
  </Field>
);

export const WithHint: Story = {
  args: {
    id: 'slug',
    label: 'Address',
    hint: 'Lowercase, with dashes (e.g. lemon-loaf)',
    children: null,
  },
  render: renderField,
};

export const WithError: Story = {
  args: { ...WithHint.args, error: 'The address is already taken' },
  render: renderField,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('alert')).toHaveTextContent('already taken');
  },
};
