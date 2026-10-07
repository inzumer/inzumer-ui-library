import { create } from '@storybook/theming/create';

/** Inter, like the titles of inzumer.com (loaded in manager-head.html and preview-head.html). */
const FONT = "Inter, 'Helvetica Neue', Arial, sans-serif";

/** Sidebar and docs pages: the text logo and the UI in the brand font. */
export const theme = create({
  base: 'light',
  fontBase: FONT,
  brandTitle: `<span style="display:inline-block;padding:4px 10px;border-radius:8px;background:#111111;color:#ffffff;font-family:${FONT};font-weight:700;letter-spacing:0.5px">INZ.UI</span>`,
  brandUrl: 'https://ui-web.inzumer.com/',
  brandTarget: '_self',
});
