import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@components';
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

const renderTable = (captionHidden?: boolean) =>
  render(
    <Table caption="Cost per ingredient" {...(captionHidden ? { captionHidden } : {})}>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Ingredient</TableHeaderCell>
          <TableHeaderCell align="end">Cost</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableHeaderCell scope="row">Tenderloin</TableHeaderCell>
          <TableCell align="end">$ 25,714.29</TableCell>
        </TableRow>
      </TableBody>
    </Table>,
  );

describe('Table', () => {
  it('renders an accessible table named by its caption', () => {
    renderTable();
    const table = screen.getByRole('table', { name: 'Cost per ingredient' });
    expect(within(table).getByRole('columnheader', { name: 'Ingredient' })).toHaveAttribute(
      'scope',
      'col',
    );
    expect(within(table).getByRole('rowheader', { name: 'Tenderloin' })).toBeInTheDocument();
    expect(within(table).getByRole('cell', { name: '$ 25,714.29' })).toHaveClass('text-right');
  });

  it('can hide the caption visually but keep it for screen readers', () => {
    renderTable(true);
    expect(screen.getByText('Cost per ingredient')).toHaveClass('sr-only');
    expect(screen.getByRole('table', { name: 'Cost per ingredient' })).toBeInTheDocument();
  });

  it('wraps the table in a horizontal scroll container', () => {
    const { container } = render(
      <Table containerClassName="custom-container" className="custom-table">
        <TableBody>
          <TableRow className="custom-row">
            <TableCell>Only cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(container.firstElementChild).toHaveClass('overflow-x-auto', 'custom-container');
    expect(screen.getByRole('table')).toHaveClass('custom-table');
    expect(screen.getByRole('row')).toHaveClass('custom-row');
    expect(container.querySelector('caption')).toBeNull();
  });

  it('accepts classes on the head', () => {
    const { container } = render(
      <Table>
        <TableHead className="custom-head">
          <TableRow>
            <TableHeaderCell align="center">Share</TableHeaderCell>
          </TableRow>
        </TableHead>
      </Table>,
    );
    expect(container.querySelector('thead')).toHaveClass('custom-head');
    expect(screen.getByRole('columnheader')).toHaveClass('text-center');
  });
});
