import { cva } from 'class-variance-authority';
import { fieldControlBase, fieldControlVariants } from '@components/atoms/Field/Field.styles';

export const textareaStyles = cva(
  [...fieldControlBase, 'min-h-24 px-3 py-2', 'placeholder:text-(--input-placeholder)'],
  {
    variants: {
      state: fieldControlVariants.variants.state,
      inputSize: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
      resize: {
        vertical: 'resize-y',
        none: 'resize-none',
      },
    },
    defaultVariants: {
      state: 'default',
      inputSize: 'md',
      resize: 'vertical',
    },
  },
);
