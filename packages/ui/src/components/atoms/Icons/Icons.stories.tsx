import { RichText } from '@components';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import readme from './README.md?raw';
import { ICON_NAMES, ICONS, type IconName } from './registry';
import * as social from './social';

interface IconStoryArgs {
  name: IconName;
  size: number;
  color: string;
}

const SOCIAL = new Set<unknown>(Object.values(social));

const GROUPS = [
  { title: 'Interface', names: ICON_NAMES.filter((name) => !SOCIAL.has(ICONS[name])) },
  { title: 'Networks', names: ICON_NAMES.filter((name) => SOCIAL.has(ICONS[name])) },
];

const meta = {
  title: 'Icons/All icons',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme.replace(/^#[^\n]*\n+/, ''),
      },
    },
  },
  args: { name: 'menu', size: 32, color: 'var(--text-primary)' },
  argTypes: {
    name: { control: 'select', options: ICON_NAMES },
    size: { control: { type: 'range', min: 16, max: 96, step: 4 } },
    color: { control: 'color' },
  },
} satisfies Meta<IconStoryArgs>;

export default meta;
type Story = StoryObj<IconStoryArgs>;

/** Every icon with the id to cite it by; size and color come from the controls. */
export const Gallery: Story = {
  render: ({ size, color }) => (
    <div className="flex flex-col gap-8">
      {GROUPS.map(({ title, names }) => (
        <section key={title} className="flex flex-col gap-3">
          <RichText variant="h3" bold>
            {title}
          </RichText>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] gap-3">
            {names.map((name) => {
              const Icon = ICONS[name];

              return (
                <li
                  key={name}
                  className="flex flex-col items-center gap-2 rounded-lg border border-(--border-default) p-4"
                >
                  <Icon width={size} height={size} style={{ color }} />
                  <RichText
                    as="code"
                    variant="s4"
                    className="whitespace-nowrap text-(--text-secondary)"
                  >
                    {name}
                  </RichText>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getAllByRole('listitem')).toHaveLength(ICON_NAMES.length);
  },
};

/** One icon at a time, to try sizes and colors. */
export const Playground: Story = {
  render: ({ name, size, color }) => {
    const Icon = ICONS[name];

    return <Icon width={size} height={size} style={{ color }} />;
  },
};
