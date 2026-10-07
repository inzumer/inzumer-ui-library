import type { ComponentType, SVGProps } from 'react';
import * as material from './material';
import * as social from './social';

/** Every icon by its kebab-case id, so it can be cited by name: `<Icon name="arrow-forward" />`. */
export const ICONS = {
  'arrow-forward': material.ArrowForwardIcon,
  bookmark: material.BookmarkIcon,
  'chevron-left': material.ChevronLeftIcon,
  'chevron-right': material.ChevronRightIcon,
  close: material.CloseIcon,
  'expand-more': material.ExpandMoreIcon,
  favorite: material.FavoriteIcon,
  language: material.LanguageIcon,
  mail: material.MailIcon,
  menu: material.MenuIcon,
  pause: material.PauseIcon,
  person: material.PersonIcon,
  'play-arrow': material.PlayArrowIcon,
  search: material.SearchIcon,
  share: material.ShareIcon,
  facebook: social.FacebookIcon,
  instagram: social.InstagramIcon,
  linkedin: social.LinkedInIcon,
  pinterest: social.PinterestIcon,
  tiktok: social.TikTokIcon,
  whatsapp: social.WhatsAppIcon,
  x: social.XIcon,
  youtube: social.YouTubeIcon,
} satisfies Record<string, ComponentType<SVGProps<SVGSVGElement>>>;

export type IconName = keyof typeof ICONS;

export const ICON_NAMES = Object.keys(ICONS) as IconName[];
