import { cva } from 'class-variance-authority';
import { fieldControlBase, fieldControlVariants } from '@components/atoms/Field/Field.styles';

export const inputStyles = cva(
  [
    ...fieldControlBase,
    'px-3 py-2 text-sm',
    'placeholder:text-(--input-placeholder)',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
  ],
  fieldControlVariants,
);
