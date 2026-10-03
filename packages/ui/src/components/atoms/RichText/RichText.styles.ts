import { cva } from 'class-variance-authority';

export const richTextStyles = cva('text-(--text-primary)', {
  variants: {
    variant: {
      h1: 'text-4xl leading-tight',
      h2: 'text-3xl leading-tight',
      h3: 'text-2xl leading-snug',
      h4: 'text-xl leading-snug',
      h5: 'text-lg leading-normal',
      h6: 'text-base leading-normal',
      s1: 'text-lg leading-normal',
      s2: 'text-base leading-normal',
      s3: 'text-sm leading-normal',
      s4: 'text-xs leading-normal',
      p1: 'text-lg leading-relaxed',
      p2: 'text-base leading-relaxed',
      p3: 'text-sm leading-relaxed',
      p4: 'text-xs leading-relaxed',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    variant: 'p2',
    weight: 'normal',
  },
});
