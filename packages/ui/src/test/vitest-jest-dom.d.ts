import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

/**
 * Types jest-dom's matchers (toBeInTheDocument, toHaveClass…) on Vitest 5's `expect`. Vitest 5's
 * `Assertion` takes two type parameters, so jest-dom's own augmentation (one parameter) no longer
 * merges; Vitest recommends extending `Matchers` instead (setup.ts registers them at runtime).
 * Drop this file once jest-dom ships it.
 */
declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- module augmentation
  interface Matchers<
    R extends void | Promise<void> = void | Promise<void>,
    T = unknown,
  > extends TestingLibraryMatchers<T, R> {}
}
