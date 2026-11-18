import { cva } from 'class-variance-authority';
import { fieldControlBase, fieldControlVariants } from '@components/atoms/Field/Field.styles';

export const selectStyles = cva(
  [...fieldControlBase, 'appearance-none bg-no-repeat pr-10'],
  fieldControlVariants,
);

export const selectChevronStyles =
  'pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-(--text-secondary)';
