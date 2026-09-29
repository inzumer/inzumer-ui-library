import { useMergedRef } from '@hooks';
import { cn } from '@utils';
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
} from 'react';

type AnyProps = Record<string, unknown>;

export type SlotProps = HTMLAttributes<HTMLElement> & { children?: ReactNode };

const isHandler = (key: string, value: unknown): value is (...args: unknown[]) => void =>
  /^on[A-Z]/.test(key) && typeof value === 'function';

/** Slot props first, child props override — except handlers (both run) and className/style (merged). */
const mergeProps = (slotProps: AnyProps, childProps: AnyProps): AnyProps => {
  const merged: AnyProps = { ...slotProps, ...childProps };
  for (const [key, slotValue] of Object.entries(slotProps)) {
    const childValue = childProps[key];
    if (isHandler(key, slotValue) && isHandler(key, childValue)) {
      merged[key] = (...args: unknown[]) => {
        childValue(...args);
        slotValue(...args);
      };
    }
  }
  merged['className'] = cn(slotProps['className'] as string, childProps['className'] as string);
  merged['style'] = {
    ...(slotProps['style'] as CSSProperties),
    ...(childProps['style'] as CSSProperties),
  };
  return merged;
};

/** Renders its single child with merged props (Radix-style `asChild`), e.g. a link as a button. */
export const Slot = forwardRef<HTMLElement, SlotProps>(
  ({ children, ...slotProps }, forwardedRef) => {
    // Text or several children can't receive props: render nothing rather than throwing.
    const child = Children.count(children) === 1 ? Children.toArray(children)[0] : null;
    const childProps = isValidElement<AnyProps>(child) ? child.props : {};
    // React 19 exposes `ref` as a prop; React 18 keeps it on the element.
    const childRef = (childProps['ref'] ??
      (child as unknown as { ref?: Ref<HTMLElement> } | null)?.ref) as Ref<HTMLElement> | undefined;
    const ref = useMergedRef(forwardedRef, childRef);

    if (!isValidElement<AnyProps>(child)) {
      return null;
    }
    return cloneElement(child, { ...mergeProps(slotProps as AnyProps, childProps), ref });
  },
);

Slot.displayName = 'Slot';
