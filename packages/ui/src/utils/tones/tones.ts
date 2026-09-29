/** Solid status colors of the `Snackbar`, from the tokens. */
export const STATUS_TONES = {
  info: { background: 'var(--surface-inverse)', text: 'var(--text-inverse)' },
  success: { background: 'rgb(var(--color-success-600))', text: 'rgb(255 255 255)' },
  error: { background: 'rgb(var(--color-danger-600))', text: 'rgb(255 255 255)' },
  warning: { background: 'rgb(var(--color-warning-500))', text: 'rgb(var(--color-neutral-900))' },
} as const;

export type StatusTone = keyof typeof STATUS_TONES;

/** The same statuses for pills (`Badge`, `Chip`), soft: a light background and strong text. */
export const PILL_TONES = {
  neutral: { background: 'var(--surface-secondary)', text: 'var(--text-primary)' },
  info: { background: 'rgb(var(--color-info-100))', text: 'rgb(var(--color-info-800))' },
  success: { background: 'rgb(var(--color-success-100))', text: 'rgb(var(--color-success-800))' },
  error: { background: 'rgb(var(--color-danger-100))', text: 'rgb(var(--color-danger-800))' },
  warning: { background: 'rgb(var(--color-warning-100))', text: 'rgb(var(--color-warning-900))' },
} as const satisfies Record<StatusTone | 'neutral', { background: string; text: string }>;

export type PillTone = keyof typeof PILL_TONES;
