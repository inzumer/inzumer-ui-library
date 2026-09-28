import { Button } from '@components';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card';
import readme from './README.md?raw';

const meta = {
  title: 'Molecules/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    noPadding: false,
  },
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>A short description of the card content.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[var(--text-secondary)]">
          This is the main content area of the card.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const NoPadding: Story = {
  render: () => (
    <Card noPadding className="w-80">
      <CardHeader>
        <CardTitle>Custom layout</CardTitle>
        <CardDescription>Compose sections manually without default padding.</CardDescription>
      </CardHeader>
    </Card>
  ),
};
