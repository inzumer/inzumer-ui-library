import { create } from '@storybook/theming/create';

/** Inter, like the titles of inzumer.com (loaded in manager-head.html and preview-head.html). */
const FONT = "Inter, 'Helvetica Neue', Arial, sans-serif";

/** Sidebar and docs pages: the uppercase wordmark of inzumer.com (#151515, Inter 700, no box). */
export const theme = create({
  base: 'light',
  fontBase: FONT,
  colorPrimary: '#151515',
  colorSecondary: '#151515',
  brandTitle: `<span style="font-family:${FONT};font-size:20px;font-weight:700;line-height:1;color:#151515;text-transform:uppercase">INZ.UI</span>`,
  brandUrl: 'https://ui-web.inzumer.com/',
  brandTarget: '_self',
});
