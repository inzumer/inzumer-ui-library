import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

// Register jest-dom's matchers on this package's own Vitest. `@testing-library/jest-dom/vitest`
// imports `vitest` from wherever pnpm hoists it, which may be another version.
expect.extend(matchers);
