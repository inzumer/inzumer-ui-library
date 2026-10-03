import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';
import readme from './README.md?raw';

const meta = {
  title: 'Organisms/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
  args: {
    brand: <strong style={{ fontSize: 20 }}>Milimon</strong>,
    links: [
      { href: '#learn', label: 'Aprender', current: true },
      { href: '#calculator', label: 'Calculadora' },
      { href: '#recipes', label: 'Recetas' },
      { href: '#blog', label: 'Blog' },
    ],
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AlignEnd: Story = {};

export const AlignStart: Story = { args: { align: 'start' } };

export const Centered: Story = { args: { align: 'center' } };

export const WithActions: Story = {
  args: { actions: <button type="button">ES</button> },
};
