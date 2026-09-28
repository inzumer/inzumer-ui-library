import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import readme from './README.md?raw';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from './Table';

const meta = {
  title: 'Molecules/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
  argTypes: {
    caption: { control: 'text' },
    captionHidden: { control: 'boolean' },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const rows = [
  ['Tenderloin', '2.571 kg', '$ 25,714.29', '82.8 %'],
  ['Potatoes', '2.5 kg', '$ 3,750.00', '12.1 %'],
  ['Butter', '0.2 kg', '$ 1,600.00', '5.2 %'],
];

export const Default: Story = {
  args: {
    caption: 'Cost per ingredient',
    captionHidden: false,
    children: (
      <>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Ingredient</TableHeaderCell>
            <TableHeaderCell align="end">Gross quantity</TableHeaderCell>
            <TableHeaderCell align="end">Cost</TableHeaderCell>
            <TableHeaderCell align="end">Share</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(([name, ...values]) => (
            <TableRow key={name}>
              <TableHeaderCell scope="row">{name}</TableHeaderCell>
              {values.map((value) => (
                <TableCell key={value} align="end">
                  {value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('table', { name: 'Cost per ingredient' })).toBeInTheDocument();
  },
};
