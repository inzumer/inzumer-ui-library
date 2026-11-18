import { RichText } from '@components';
import { useFocusTrap, useRotatingMessage, useScrollLock } from '@hooks';
import { cn } from '@utils';
import type { VariantProps } from 'class-variance-authority';
import { forwardRef, useRef, type HTMLAttributes, type ReactNode } from 'react';
import {
  loaderMarkStyles,
  loaderMessageStyles,
  loaderRingStyles,
  loaderScreenPanelStyles,
  loaderScreenStyles,
  loaderScreenTextStyles,
  loaderStyles,
} from './Loader.styles';

const DEFAULT_MESSAGE_INTERVAL_MS = 3500;

export type LoaderProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> &
  VariantProps<typeof loaderStyles> &
  VariantProps<typeof loaderMarkStyles> & {
    label: string;
    showLabel?: boolean;
    mark?: ReactNode;
    messages?: readonly string[] | undefined;
    messageInterval?: number;
    screen?: boolean;
  };

/** Loading indicator: a spinning or pulsing mark (the brand's or a ring) with an accessible label. */
export const Loader = forwardRef<HTMLSpanElement, LoaderProps>(
  (
    {
      label,
      showLabel = false,
      mark,
      messages,
      messageInterval = DEFAULT_MESSAGE_INTERVAL_MS,
      screen = false,
      effect,
      size,
      speed,
      layout,
      className,
      ...props
    },
    ref,
  ) => {
    const panelRef = useRef<HTMLDivElement | null>(null);
    const message = useRotatingMessage(messages, messageInterval);
    useFocusTrap(screen, panelRef);
    useScrollLock(screen);

    const loader = (
      <span
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn(
          loaderStyles({ layout: screen ? 'stacked' : layout }),
          screen && loaderScreenTextStyles,
          className,
        )}
        {...props}
      >
        <span aria-hidden="true" className={loaderMarkStyles({ effect, size, speed })}>
          {mark ?? <span className={loaderRingStyles} />}
        </span>
        <RichText as="span" variant="p3" className={showLabel ? 'text-inherit' : 'sr-only'}>
          {label}
        </RichText>
        {message && (
          <RichText as="span" className={loaderMessageStyles}>
            {message}
          </RichText>
        )}
      </span>
    );

    if (!screen) {
      return loader;
    }

    return (
      <div className={loaderScreenStyles}>
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-busy="true"
          aria-label={label}
          tabIndex={-1}
          className={loaderScreenPanelStyles}
        >
          {loader}
        </div>
      </div>
    );
  },
);

Loader.displayName = 'Loader';
