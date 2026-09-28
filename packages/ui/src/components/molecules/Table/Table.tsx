import { cn } from '@utils';
import type { VariantProps } from 'class-variance-authority';
import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  type TableHTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from 'react';
import {
  tableCaptionStyles,
  tableCellStyles,
  tableContainerStyles,
  tableHeadStyles,
  tableRowStyles,
  tableStyles,
} from './Table.styles';

export type TableProps = TableHTMLAttributes<HTMLTableElement> & {
  /** Describes the table for everyone (or only for screen readers with `captionHidden`). */
  caption?: ReactNode;
  captionHidden?: boolean;
  /** Extra classes for the scroll container. */
  containerClassName?: string;
};

/**
 * A data table that scrolls horizontally inside its own bordered container on small screens,
 * instead of pushing the page wider. Compose it with the `Table*` parts below.
 */
export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ caption, captionHidden = false, containerClassName, className, children, ...props }, ref) => (
    <div className={cn(tableContainerStyles, containerClassName)}>
      <table ref={ref} className={cn(tableStyles, className)} {...props}>
        {caption && (
          <caption className={tableCaptionStyles({ hidden: captionHidden })}>{caption}</caption>
        )}
        {children}
      </table>
    </div>
  ),
);
Table.displayName = 'Table';

export const TableHead = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn(tableHeadStyles, className)} {...props} />
));
TableHead.displayName = 'TableHead';

export const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>((props, ref) => <tbody ref={ref} {...props} />);
TableBody.displayName = 'TableBody';

export const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} className={cn(tableRowStyles, className)} {...props} />
  ),
);
TableRow.displayName = 'TableRow';

type CellAlign = VariantProps<typeof tableCellStyles>;

// The native (deprecated) `align` attribute is replaced by the `align` variant.
export type TableHeaderCellProps = Omit<ThHTMLAttributes<HTMLTableCellElement>, 'align'> &
  CellAlign;

/** Header cell: `scope="col"` by default; pass `scope="row"` for the first cell of a body row. */
export const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  ({ align, scope = 'col', className, ...props }, ref) => (
    <th ref={ref} scope={scope} className={cn(tableCellStyles({ align }), className)} {...props} />
  ),
);
TableHeaderCell.displayName = 'TableHeaderCell';

export type TableCellProps = Omit<TdHTMLAttributes<HTMLTableCellElement>, 'align'> & CellAlign;

/** Data cell; use `align="end"` for numbers so they line up. */
export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ align, className, ...props }, ref) => (
    <td ref={ref} className={cn(tableCellStyles({ align }), className)} {...props} />
  ),
);
TableCell.displayName = 'TableCell';
