/** Status colors shared by `Snackbar`, `Badge` and `Chip`, from the tokens. */
export const STATUS_TONES = {
  info: { background: 'var(--surface-inverse)', text: 'var(--text-inverse)' },
  success: { background: 'rgb(var(--color-success-600))', text: 'rgb(255 255 255)' },
  error: { background: 'rgb(var(--color-danger-600))', text: 'rgb(255 255 255)' },
  warning: { background: 'rgb(var(--color-warning-500))', text: 'rgb(var(--color-neutral-900))' },
} as const;

export type StatusTone = keyof typeof STATUS_TONES;

/** Tones of a pill: the statuses plus a quiet `neutral` (the default). */
export const PILL_TONES = {
  neutral: { background: 'var(--surface-secondary)', text: 'var(--text-primary)' },
  ...STATUS_TONES,
} as const;

export type PillTone = keyof typeof PILL_TONES;
