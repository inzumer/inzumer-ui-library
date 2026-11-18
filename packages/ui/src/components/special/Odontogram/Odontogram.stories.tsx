import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { Odontogram, type OdontogramProps } from './Odontogram';
import readme from './README.md?raw';
import type { PermanentTooth, ToothView } from './utils/fdi';
import { ODONTOGRAM_LABELS } from './utils/labels';

const teeth: Partial<Record<PermanentTooth, ToothView>> = {
  11: { state: 'treated', surfaces: { V: 'treated' } },
  16: { state: 'treated', surfaces: { O: 'treated', M: 'treated' } },
  18: { state: 'missing' },
  26: { state: 'pending', surfaces: { O: 'pending' } },
  36: { state: 'inProgress', surfaces: { O: 'inProgress' } },
  37: { state: 'implant' },
  46: { state: 'missing' },
};

const meta = {
  title: 'Special/Odontogram',
  component: Odontogram,
  tags: ['autodocs'],
  args: {
    id: 'dental',
    teeth,
    readOnly: false,
    legend: true,
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
} satisfies Meta<typeof Odontogram>;

export default meta;
type Story = StoryObj<typeof meta>;

const SelectableOdontogram = (args: OdontogramProps) => {
  const [selectedTooth, setSelectedTooth] = useState(args.selectedTooth);

  return (
    <Odontogram
      {...args}
      selectedTooth={selectedTooth}
      onToothPress={(fdi) => {
        setSelectedTooth(fdi);
        args.onToothPress?.(fdi);
      }}
    />
  );
};

export const Default: Story = {
  render: SelectableOdontogram,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tooth = canvas.getByRole('button', { name: /^Tooth 16,/ });

    await expect(tooth).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(tooth);
    await expect(tooth).toHaveAttribute('aria-pressed', 'true');
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.queryAllByRole('button')).toHaveLength(0);
    await expect(
      canvas.getByRole('img', { name: 'Tooth 16, upper right first molar, Treated' }),
    ).toBeInTheDocument();
  },
};

export const Spanish: Story = {
  args: {
    labels: ODONTOGRAM_LABELS.es,
  },
  render: SelectableOdontogram,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole('button', { name: 'Diente 26, primer molar superior izquierdo, Pendiente' }),
    ).toBeInTheDocument();
  },
};

export const Italian: Story = {
  args: {
    labels: ODONTOGRAM_LABELS.it,
  },
  render: SelectableOdontogram,
};

export const Highlight: Story = {
  args: {
    highlight: ['16', '26', '36'],
  },
  render: SelectableOdontogram,
};

export const Empty: Story = {
  args: {
    teeth: {},
    legend: false,
  },
  render: SelectableOdontogram,
};
