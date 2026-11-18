import { ODONTOGRAM_LABELS, type Surface } from '@components';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import readme from './README.md?raw';
import { ToothSurfaces, type ToothSurfacesProps } from './ToothSurfaces';

const meta = {
  title: 'Special/ToothSurfaces',
  component: ToothSurfaces,
  tags: ['autodocs'],
  args: {
    id: 'dental',
    fdi: '16',
    surfaces: { O: 'treated', M: 'pending', D: 'inProgress' },
    readOnly: false,
  },
  argTypes: {
    labels: {
      control: 'select',
      options: ['en', 'es', 'it'],
      mapping: ODONTOGRAM_LABELS,
    },
  },
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
} satisfies Meta<typeof ToothSurfaces>;

export default meta;
type Story = StoryObj<typeof meta>;

const SelectableSurfaces = (args: ToothSurfacesProps) => {
  const [selected, setSelected] = useState<readonly Surface[]>(args.selected ?? []);

  return (
    <ToothSurfaces
      {...args}
      selected={selected}
      onSurfacePress={(surface) => {
        setSelected((current) =>
          current.includes(surface)
            ? current.filter((item) => item !== surface)
            : [...current, surface],
        );
        args.onSurfacePress?.(surface);
      }}
    />
  );
};

export const Default: Story = {
  render: SelectableSurfaces,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const occlusal = canvas.getByRole('button', { name: 'Occlusal, Treated' });

    await userEvent.click(occlusal);
    await expect(occlusal).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(occlusal);
    await expect(occlusal).toHaveAttribute('aria-pressed', 'false');
  },
};

export const UpperIncisor: Story = {
  args: {
    fdi: '21',
    surfaces: { O: 'pending', V: 'treated' },
  },
  render: SelectableSurfaces,
};

export const LowerMolarReadOnly: Story = {
  args: {
    fdi: '36',
    readOnly: true,
    surfaces: { O: 'implant', L: 'treated', V: 'missing' },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.queryAllByRole('button')).toHaveLength(0);
    await expect(canvas.getByRole('img', { name: 'Lingual, Treated' })).toBeInTheDocument();
  },
};

export const Spanish: Story = {
  args: {
    labels: ODONTOGRAM_LABELS.es,
  },
  render: SelectableSurfaces,
};
